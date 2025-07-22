import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input, // Still needed for some cases like direct component inputs
  Output,
  ViewChild,
  ViewContainerRef,
  computed,
  effect,
  inject,
  signal,
  input, // Preferred for component inputs
  DestroyRef,
  Injectable,
  TemplateRef,
  forwardRef,
  OnInit,
  OnDestroy,
  HostBinding // <-- New Import
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayModule, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FocusMonitor } from '@angular/cdk/a11y';
import { cn } from '../utils/cn'; // Assuming this utility is available

// Dropdown Menu Service for global state management
@Injectable({
  providedIn: 'root'
})
export class DropdownMenuService {
  private currentOverlayRef: OverlayRef | null = null;
  private currentDropdownComponent: DropdownMenu | null = null;

  // Global state signals
  private isMenuOpen = signal(false);
  private menuPosition = signal<{ x: number; y: number } | null>(null);
  private activeComponent = signal<DropdownMenu | null>(null);
  private openDirection = signal<'down' | 'up' | 'left' | 'right'>('down');

  private readonly destroyRef = inject(DestroyRef);
  private readonly overlay = inject(Overlay);
  private readonly focusMonitor = inject(FocusMonitor);

  // Public readonly signals
  readonly isOpen = this.isMenuOpen.asReadonly();
  readonly position = this.menuPosition.asReadonly();
  readonly direction = this.openDirection.asReadonly();
  readonly activeDropdown = this.activeComponent.asReadonly();

  // Check if a specific dropdown is open
  isDropdownOpen(dropdown: DropdownMenu): boolean {
    return this.isMenuOpen() && this.activeComponent() === dropdown;
  }

  constructor() {
    // Global click listener to close dropdowns
    document.addEventListener('click', (event) => {
      if (this.isMenuOpen()) {
        const target = event.target as HTMLElement;
        // Don't close if clicking on a trigger or menu content
        if (!target.closest('.dropdown-menu-trigger') && !target.closest('.dropdown-menu-panel')) {
          this.closeCurrentMenu();
        }
      }
    });

    // Global keyboard listener
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isMenuOpen()) {
        this.closeCurrentMenu();
      }
    });

    // Effect to handle menu state changes
    effect(() => {
      const isOpen = this.isMenuOpen();
      const position = this.menuPosition();
      const component = this.activeComponent();
      const direction = this.openDirection();

      if (isOpen && position && component) {
        this.actuallyOpenMenu(component, position.x, position.y, direction);
      } else if (!isOpen) {
        this.actuallyCloseMenu();
      }
    });
  }

  openDropdownMenu(
    menuComponent: DropdownMenu,
    triggerElement: HTMLElement,
    direction: 'down' | 'up' | 'left' | 'right' = 'down'
  ): void {
    // Close any existing menu first
    if (this.isMenuOpen()) {
      this.closeCurrentMenu();
    }

    const rect = triggerElement.getBoundingClientRect();
    let x = rect.left;
    let y = rect.bottom;

    // Calculate position based on direction
    switch (direction) {
      case 'up':
        y = rect.top;
        break;
      case 'left':
        x = rect.left;
        y = rect.top;
        break;
      case 'right':
        x = rect.right;
        y = rect.top;
        break;
      case 'down':
      default:
        // Already set above
        break;
    }

    // Update signals to trigger menu opening
    this.activeComponent.set(menuComponent);
    this.menuPosition.set({ x, y });
    this.openDirection.set(direction);
    this.isMenuOpen.set(true);
  }

  closeCurrentMenu(): void {
    this.isMenuOpen.set(false);
  }

  private actuallyOpenMenu(
    menuComponent: DropdownMenu,
    x: number,
    y: number,
    direction: 'down' | 'up' | 'left' | 'right'
  ): void {
    // Close any existing menu
    if (this.currentOverlayRef) {
      this.actuallyCloseMenu();
    }

    const { template, viewContainerRef } = menuComponent.getMenuData();

    // Create position strategy based on direction
    let positionStrategy: PositionStrategy;

    switch (direction) {
      case 'up':
        positionStrategy = this.overlay.position()
          .global()
          .left(`${x}px`)
          .bottom(`${window.innerHeight - y}px`);
        break;
      case 'left':
        positionStrategy = this.overlay.position()
          .global()
          .right(`${window.innerWidth - x}px`)
          .top(`${y}px`);
        break;
      case 'right':
        positionStrategy = this.overlay.position()
          .global()
          .left(`${x}px`)
          .top(`${y}px`);
        break;
      case 'down':
      default:
        positionStrategy = this.overlay.position()
          .global()
          .left(`${x}px`)
          .top(`${y}px`);
        break;
    }

    this.currentOverlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      panelClass: 'dropdown-menu-panel'
    });

    // Attach the template portal
    const portal = new TemplatePortal(template, viewContainerRef);
    this.currentOverlayRef.attach(portal);

    this.currentDropdownComponent = menuComponent;

    // Handle backdrop clicks
    this.currentOverlayRef.backdropClick()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.closeCurrentMenu();
      });

    // Handle keyboard events
    this.currentOverlayRef.keydownEvents()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        if (event.key === 'Escape') {
          this.closeCurrentMenu();
        }
        // Handle arrow key navigation
        this.handleKeyboardNavigation(event);
      });
  }

  private actuallyCloseMenu(): void {
    if (this.currentOverlayRef) {
      this.currentOverlayRef.dispose();
      this.currentOverlayRef = null;
    }
    this.currentDropdownComponent = null;
    this.activeComponent.set(null);
    this.menuPosition.set(null);
  }

  private handleKeyboardNavigation(event: KeyboardEvent): void {
    if (!this.currentDropdownComponent) return;

    const items = this.currentDropdownComponent.getNavigableItems();
    const currentIndex = this.currentDropdownComponent.getFocusedIndex();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.currentDropdownComponent.focusNextItem();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.currentDropdownComponent.focusPreviousItem();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.currentDropdownComponent.activateCurrentItem();
        break;
      case 'Home':
        event.preventDefault();
        this.currentDropdownComponent.focusFirstItem();
        break;
      case 'End':
        event.preventDefault();
        this.currentDropdownComponent.focusLastItem();
        break;
    }
  }
}

// Dropdown Menu Trigger Component
@Component({
  selector: 'DropdownMenuTrigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `
})
export class DropdownMenuTrigger {
  @ViewChild('triggerElement', { static: false }) triggerElement!: ElementRef<HTMLElement>; // Changed to static: false as it's not a direct element in template

  // Signal inputs
  readonly disabled = input<boolean>(false);
  readonly direction = input<'down' | 'up' | 'left' | 'right'>('down');

  // Output events
  @Output() readonly openChange = new EventEmitter<boolean>();

  // Internal state
  readonly triggerId = signal(`dropdown-trigger-${Math.random().toString(36).substring(2, 9)}`);
  readonly menuId = signal(`dropdown-menu-${Math.random().toString(36).substring(2, 9)}`);

  private readonly dropdownMenuService = inject(DropdownMenuService);
  private readonly parentDropdown = inject(DropdownMenu, { optional: true });
  private readonly hostElementRef = inject(ElementRef); // Inject ElementRef to get the host element

  // Computed state
  readonly isOpen = computed(() => {
    if (!this.parentDropdown) return false;
    return this.dropdownMenuService.isDropdownOpen(this.parentDropdown);
  });

  // Host Bindings
  @HostBinding('attr.aria-haspopup') readonly ariaHasPopup = true;
  @HostBinding('attr.aria-expanded') get ariaExpanded() { return this.isOpen(); }
  @HostBinding('attr.aria-controls') get ariaControls() { return this.isOpen() ? this.menuId() : null; }
  @HostBinding('attr.id') get id() { return this.triggerId(); }
  @HostBinding('attr.role') readonly role = 'button';
  @HostBinding('attr.tabindex') readonly tabindex = 0;
  @HostBinding('class') readonly hostClass = 'dropdown-menu-trigger';

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    this.toggle(event);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        event.preventDefault();
        this.open();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.open();
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
    }
  }

  toggle(event?: Event): void {
    if (this.disabled()) return;

    if (event) {
      event.stopPropagation();
    }

    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    if (this.disabled() || !this.parentDropdown) return;

    this.dropdownMenuService.openDropdownMenu(
      this.parentDropdown,
      this.hostElementRef.nativeElement, // Use the injected ElementRef
      this.direction()
    );
    this.openChange.emit(true);
  }

  close(): void {
    this.dropdownMenuService.closeCurrentMenu();
    this.openChange.emit(false);
  }
}

// Dropdown Menu Content Component
@Component({
  selector: 'DropdownMenuContent',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `
})
export class DropdownMenuContent {
  // Signal inputs
  readonly className = input<string>('');
  readonly sideOffset = input<number>(4);
  readonly align = input<'start' | 'center' | 'end'>('start');

  // Internal properties
  readonly menuId = signal(`dropdown-content-${Math.random().toString(36).substring(2, 9)}`);
  readonly triggerId = inject(DropdownMenuTrigger, { optional: true })?.triggerId;

  private readonly parentDropdown = inject(DropdownMenu, { optional: true });
  private readonly dropdownService = inject(DropdownMenuService);

  // Computed classes
  readonly computedClasses = computed(() => cn(
    'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    this.className()
  ));

  // Host Bindings
  @HostBinding('attr.id') get id() { return this.menuId(); }
  @HostBinding('attr.aria-labelledby') get ariaLabelledBy() { return this.triggerId?.(); }
  @HostBinding('attr.role') readonly role = 'menu';
  @HostBinding('class') get classes() { return this.computedClasses(); }
  // Bind data-state based on service's active dropdown state
  @HostBinding('attr.data-state') get dataState() {
    return this.dropdownService.isDropdownOpen(this.parentDropdown!) ? 'open' : 'closed';
  }
  // Bind data-side based on service's open direction
  @HostBinding('attr.data-side') get dataSide() {
    return this.dropdownService.direction();
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.stopPropagation();
  }
}

// Dropdown Menu Item Component
@Component({
  selector: 'DropdownMenuItem',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (itemHref()) {
      <a
        [href]="itemHref()"
        [target]="itemTarget()"
        [class]="linkClasses()"
        [attr.rel]="itemTarget() === '_blank' ? 'noopener noreferrer' : null"
      >
        @if (itemIcon()) {
          <span [innerHTML]="itemIcon()" class="mr-2 h-4 w-4"></span>
        }
        <span>{{ itemLabel() }}</span>
        @if (itemShortcut()) {
          <span class="ml-auto text-xs tracking-widest opacity-60">
            {{ itemShortcut() }}
          </span>
        }
      </a>
    } @else {
      @if (itemIcon()) {
        <span [innerHTML]="itemIcon()" class="mr-2 h-4 w-4"></span>
      }
      <span>{{ itemLabel() }}</span>
      @if (itemShortcut()) {
        <span class="ml-auto text-xs tracking-widest opacity-60">
          {{ itemShortcut() }}
        </span>
      }
    }
  `
})
export class DropdownMenuItem implements OnInit, OnDestroy {
  private readonly hostElementRef = inject(ElementRef);

  // Signal inputs with unique names
  readonly itemLabel = input.required<string>();
  readonly itemValue = input<string>('');
  readonly itemIcon = input<string>('');
  readonly itemShortcut = input<string>('');
  readonly itemDisabled = input<boolean>(false);
  readonly itemDanger = input<boolean>(false);
  readonly itemHref = input<string>('');
  readonly itemTarget = input<'_blank' | '_self' | '_parent' | '_top'>('_self');
  readonly itemClassName = input<string>('');

  // Output events
  @Output() readonly select = new EventEmitter<DropdownMenuItem>();

  // Internal state
  private readonly isFocused = signal(false);
  private readonly parentDropdown = inject(DropdownMenu, { optional: true });
  private readonly dropdownMenuService = inject(DropdownMenuService);

  // Computed classes
  readonly computedItemClasses = computed(() => cn(
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
    'focus:bg-accent focus:text-accent-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    this.itemDanger() && 'text-destructive focus:bg-destructive focus:text-destructive-foreground',
    this.itemClassName()
  ));

  readonly linkClasses = computed(() => cn(
    'flex items-center w-full',
    this.itemDanger() && 'text-destructive'
  ));

  // Host Bindings
  @HostBinding('attr.role') get role() { return this.itemHref() ? null : 'menuitem'; }
  @HostBinding('attr.tabindex') readonly tabindex = -1;
  @HostBinding('attr.data-disabled') get dataDisabled() { return this.itemDisabled() || null; }
  @HostBinding('attr.data-danger') get dataDanger() { return this.itemDanger() || null; }
  @HostBinding('class') get classes() { return this.computedItemClasses(); }

  @HostListener('click', ['$event'])
  handleClick(event: Event): void {
    if (this.itemDisabled()) {
      event.preventDefault();
      return;
    }

    if (!this.itemHref()) {
      event.preventDefault();
      this.select.emit(this);
      this.dropdownMenuService.closeCurrentMenu();
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (this.itemDisabled()) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.handleClick(event);
        break;
    }
  }

  @HostListener('focus')
  onFocus(): void {
    this.isFocused.set(true);
    this.parentDropdown?.setFocusedItem(this);
  }

  @HostListener('blur')
  onBlur(): void {
    this.isFocused.set(false);
  }

  focus(): void {
    this.hostElementRef.nativeElement.focus();
  }

  getValue(): string {
    return this.itemValue() || this.itemLabel();
  }

  ngOnInit(): void {
    if (this.parentDropdown) {
      this.parentDropdown.registerMenuItem(this);
    }
  }

  ngOnDestroy(): void {
    if (this.parentDropdown) {
      this.parentDropdown.unregisterMenuItem(this);
    }
  }
}

// Dropdown Menu Separator Component
@Component({
  selector: 'DropdownMenuSeparator',
  standalone: true,
  template: ` ` // No internal template content needed
})
export class DropdownMenuSeparator {
  readonly className = input<string>('');

  readonly computedSeparatorClasses = computed(() => cn(
    '-mx-1 my-1 h-px bg-muted',
    this.className()
  ));

  // Host Bindings
  @HostBinding('attr.role') readonly role = 'separator';
  @HostBinding('class') get classes() { return this.computedSeparatorClasses(); }
}

// Dropdown Menu Label Component
@Component({
  selector: 'DropdownMenuLabel',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `
})
export class DropdownMenuLabel {
  readonly className = input<string>('');

  readonly computedLabelClasses = computed(() => cn(
    'px-2 py-1.5 text-sm font-semibold',
    this.className()
  ));

  // Host Bindings
  @HostBinding('class') get classes() { return this.computedLabelClasses(); }
}

// Main Dropdown Menu Component
@Component({
  selector: 'DropdownMenu',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  template: `
    <ng-content select="DropdownMenuTrigger"></ng-content>
    
    <ng-template #menuTemplate>
      <ng-content select="DropdownMenuContent"></ng-content>
    </ng-template>
  `
})
export class DropdownMenu {
  @ViewChild('menuTemplate', { static: true }) menuTemplate!: TemplateRef<any>;

  // Signal inputs
  readonly open = input<boolean>(false);
  readonly modal = input<boolean>(true);

  // Output events
  @Output() readonly openChange = new EventEmitter<boolean>();

  // Internal state
  private readonly focusedItemIndex = signal<number>(-1);
  private readonly menuItems = signal<DropdownMenuItem[]>([]);

  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly dropdownMenuService = inject(DropdownMenuService);

  constructor() {
    effect(() => {
      const isOpen = this.open();
      // This effect syncs external 'open' input with internal service state.
      // If external 'open' is true, and service isn't open for *this* dropdown,
      // it might imply an external desire to open. However, the trigger component
      // handles the actual opening via `openDropdownMenu`.
      // The current logic in `DropdownMenuService` ensures only one dropdown is open.
      // So, if an external `open` is true, it might be more about *listening*
      // to the service state rather than forcing it open from here,
      // as the trigger is the primary opener.
      // If `open` becomes false, ensure the menu is closed.
      if (!isOpen && this.dropdownMenuService.isDropdownOpen(this)) {
        this.dropdownMenuService.closeCurrentMenu();
      }
    });
  }

  // Host Binding for the wrapper class, if desired, but current template has a div wrapper.
  // @HostBinding('class') readonly wrapperClass = 'dropdown-menu-wrapper';

  getMenuData() {
    return {
      template: this.menuTemplate,
      viewContainerRef: this.viewContainerRef
    };
  }

  getNavigableItems(): DropdownMenuItem[] {
    return this.menuItems().filter(item => !item.itemDisabled());
  }

  getFocusedIndex(): number {
    return this.focusedItemIndex();
  }

  setFocusedItem(item: DropdownMenuItem): void {
    const items = this.getNavigableItems();
    const index = items.indexOf(item);
    this.focusedItemIndex.set(index);
  }

  focusNextItem(): void {
    const items = this.getNavigableItems();
    if (items.length === 0) return;

    const currentIndex = this.focusedItemIndex();
    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    this.focusedItemIndex.set(nextIndex);
    items[nextIndex].focus();
  }

  focusPreviousItem(): void {
    const items = this.getNavigableItems();
    if (items.length === 0) return;

    const currentIndex = this.focusedItemIndex();
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    this.focusedItemIndex.set(prevIndex);
    items[prevIndex].focus();
  }

  focusFirstItem(): void {
    const items = this.getNavigableItems();
    if (items.length === 0) return;

    this.focusedItemIndex.set(0);
    items[0].focus();
  }

  focusLastItem(): void {
    const items = this.getNavigableItems();
    if (items.length === 0) return;

    const lastIndex = items.length - 1;
    this.focusedItemIndex.set(lastIndex);
    items[lastIndex].focus();
  }

  activateCurrentItem(): void {
    const items = this.getNavigableItems();
    const currentIndex = this.focusedItemIndex();
    
    if (currentIndex >= 0 && currentIndex < items.length) {
      const currentItem = items[currentIndex];
      currentItem.handleClick(new Event('click')); // Simulate click for activation
    }
  }

  registerMenuItem(item: DropdownMenuItem): void {
    this.menuItems.update(items => [...items, item]);
  }

  unregisterMenuItem(item: DropdownMenuItem): void {
    this.menuItems.update(items => items.filter(i => i !== item));
  }
}