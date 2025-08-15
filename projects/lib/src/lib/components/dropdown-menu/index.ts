import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DOCUMENT,
  effect,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnDestroy,
  Output,
  signal,
  ViewChild,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '../../utils/cn';
import {
  Overlay,
  OverlayRef,
  OverlayPositionBuilder,
  ConnectedPosition
} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';

// Position mapping for CDK overlay - properly handles viewport boundaries
const DROPDOWN_POSITION_MAP: Record<string, ConnectedPosition[]> = {
  bottom: [
    // Primary bottom positions
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 4
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 4
    },
    // Fallback to top if bottom doesn't fit
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -4
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: -4
    }
  ],
  top: [
    // Primary top positions
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -4
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: -4
    },
    // Fallback to bottom if top doesn't fit
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 4
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 4
    }
  ],
  left: [
    // Primary left positions
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -4
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top',
      offsetX: -4
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetX: -4
    },
    // Fallback to right if left doesn't fit
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: 4
    }
  ],
  right: [
    // Primary right positions
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: 4
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
      offsetX: 4
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetX: 4
    },
    // Fallback to left if right doesn't fit
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -4
    }
  ]
};

// Dropdown Menu variants - Enhanced design inspired by Button and Card components
const dropdownMenuVariants = cva(
  [
    'min-w-48 max-w-[calc(100vw-2rem)] sm:min-w-56 overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-xl',
    'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
    'data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-2',
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2',
    'data-[side=top]:slide-in-from-bottom-2',
    'will-change-transform transform-gpu',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-popover border-border shadow-lg',
          'ring-1 ring-black/5 dark:ring-white/10'
        ],
        glass: [
          'bg-white/90 dark:bg-gray-900/90 border-white/20 dark:border-gray-700/20',
          'backdrop-blur-md shadow-2xl ring-1 ring-black/5 dark:ring-white/10'
        ],
        elevated: [
          'bg-popover border-border shadow-2xl',
          'ring-1 ring-black/10 dark:ring-white/20'
        ],
        minimal: [
          'bg-popover border-border/50 shadow-md',
          'ring-0'
        ],
        blur: [
          'bg-white/80 dark:bg-gray-900/80 border-white/30 dark:border-gray-700/30',
          'backdrop-blur-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10'
        ],
        floating: [
          'bg-gradient-to-b from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80',
          'border-white/40 dark:border-gray-700/40 shadow-2xl ring-1 ring-black/5 dark:ring-white/10'
        ],
        neon: [
          'bg-gradient-to-br from-blue-50/95 via-purple-50/95 to-pink-50/95',
          'dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30',
          'border-purple-200/50 dark:border-purple-700/50',
          'shadow-2xl shadow-purple-500/20 ring-1 ring-purple-500/10'
        ]
      },
      size: {
        sm: 'min-w-32 max-w-[calc(100vw-2rem)] sm:min-w-40 p-1 text-xs',
        default: 'min-w-48 max-w-[calc(100vw-2rem)] sm:min-w-56 p-1.5 text-sm',
        lg: 'min-w-56 max-w-[calc(100vw-2rem)] sm:min-w-64 p-2 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const dropdownMenuItemVariants = cva(
  [
    'group relative flex w-full cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm',
    'outline-none transition-all duration-200 ease-out',
    'focus:bg-accent focus:text-accent-foreground focus:shadow-sm',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    'hover:scale-[1.02] active:scale-[0.98] transform-gpu',
    'before:absolute before:inset-0 before:rounded-lg before:transition-all before:duration-200',
    'overflow-hidden'
  ],
  {
    variants: {
      variant: {
        default: [
          'text-foreground hover:bg-accent/80 hover:text-accent-foreground',
          'before:bg-gradient-to-r before:from-transparent before:via-accent/20 before:to-transparent',
          'before:opacity-0 hover:before:opacity-100',
          'focus:bg-accent focus:text-accent-foreground'
        ],
        destructive: [
          'text-destructive hover:bg-destructive/10 hover:text-destructive',
          'focus:bg-destructive/10 focus:text-destructive',
          'before:bg-gradient-to-r before:from-red-500/10 before:to-pink-500/10',
          'before:opacity-0 hover:before:opacity-100'
        ]
      },
      inset: {
        true: 'pl-8',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      inset: false
    }
  }
);

const dropdownMenuTriggerVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium',
    'transition-all duration-200 ease-out cursor-pointer select-none transform-gpu',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'hover:scale-[1.02] active:scale-[0.98]',
    'relative overflow-hidden',
    'before:absolute before:inset-0 before:rounded-lg before:transition-all before:duration-200'
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-primary text-primary-foreground shadow-md hover:bg-primary/90',
          'hover:shadow-lg before:bg-white/10 before:opacity-0 hover:before:opacity-100'
        ],
        destructive: [
          'bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90',
          'hover:shadow-lg before:bg-white/10 before:opacity-0 hover:before:opacity-100'
        ],
        outline: [
          'border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground',
          'shadow-sm hover:shadow-md before:bg-accent/20 before:opacity-0 hover:before:opacity-100'
        ],
        secondary: [
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          'shadow-sm hover:shadow-md before:bg-primary/10 before:opacity-0 hover:before:opacity-100'
        ],
        ghost: [
          'hover:bg-accent hover:text-accent-foreground',
          'before:bg-accent/30 before:opacity-0 hover:before:opacity-100'
        ],
        link: [
          'text-primary underline-offset-4 hover:underline',
          'before:bg-primary/10 before:opacity-0 hover:before:opacity-100'
        ],
        gradient: [
          'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white shadow-lg',
          'hover:shadow-xl hover:from-blue-500 hover:via-purple-500 hover:to-blue-500',
          'before:bg-white/20 before:opacity-0 hover:before:opacity-100'
        ],
        glass: [
          'bg-white/80 dark:bg-gray-900/80 border border-white/20 dark:border-gray-700/20',
          'backdrop-blur-md text-foreground shadow-lg hover:bg-white/90 dark:hover:bg-gray-900/90',
          'before:bg-gradient-to-r before:from-blue-500/10 before:to-purple-500/10 before:opacity-0 hover:before:opacity-100'
        ],
        neon: [
          'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white shadow-lg',
          'hover:shadow-xl hover:shadow-blue-500/25',
          'before:bg-white/20 before:opacity-0 hover:before:opacity-100'
        ],
        rainbow: [
          'bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-green-500 to-yellow-500 text-white shadow-lg',
          'hover:shadow-xl hover:shadow-purple-500/25 animate-pulse',
          'before:bg-white/20 before:opacity-0 hover:before:opacity-100'
        ]
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 py-3 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export type DropdownMenuVariant = VariantProps<typeof dropdownMenuVariants>;
export type DropdownMenuItemVariant = VariantProps<typeof dropdownMenuItemVariants>;
export type DropdownMenuTriggerVariant = VariantProps<typeof dropdownMenuTriggerVariants>;

export interface DropdownMenuItemData {
  label?: string;
  value?: string;
  icon?: string;
  disabled?: boolean;
  variant?: 'default' | 'destructive';
  separator?: boolean;
  shortcut?: string;
  description?: string;
  badge?: string;
  action?: () => void;
}

export interface DropdownMenuGroupData {
  label?: string;
  items: DropdownMenuItemData[];
}

// Main Dropdown Menu Component
@Component({
  selector: 'DropdownMenu',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="relative inline-block text-left"
      [attr.data-testid]="'dropdown-menu-container'"
    >
      <!-- Trigger -->
      <button
        #trigger
        type="button"
        [class]="triggerClasses()"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="'menu'"
        [attr.aria-controls]="menuId"
        [attr.aria-describedby]="menuId + '-description'"
        [attr.aria-label]="triggerText + (isOpen() ? ' (expanded)' : ' (collapsed)')"
        [disabled]="disabled"
        (click)="toggle()"
        (keydown)="onTriggerKeydown($event)"
        (focus)="onTriggerFocus()"
        (blur)="onTriggerBlur()"
      >
        <span class="sr-only" [id]="menuId + '-description'">
          Press Enter or Space to {{ isOpen() ? 'close' : 'open' }} menu
        </span>
        <ng-content select="[slot=trigger]">
          {{ triggerText }}
        </ng-content>
        @if (!hideChevron) {
          <svg
            class="ml-2 h-4 w-4 transition-all duration-300 ease-out transform"
            [class.rotate-180]="isOpen()"
            [class.scale-110]="isOpen()"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
              class="drop-shadow-sm"
            />
          </svg>
        }
      </button>

      <!-- Enhanced Menu with Stunning Design (No Backdrop) -->
      @if (isOpen()) {
        <!-- Menu is now rendered via CDK overlay -->
      }
    </div>

    <!-- Menu Template (rendered in CDK overlay) -->
    <ng-template #menuTemplate>
      <div
        #menu
        [id]="menuId"
        role="menu"
        [attr.aria-labelledby]="triggerElement?.nativeElement?.id"
        [attr.aria-orientation]="'vertical'"
        [attr.aria-activedescendant]="getActiveDescendant()"
        [class]="menuClasses()"
        [attr.data-state]="isOpen() ? 'open' : 'closed'"
        [attr.data-side]="placement"
        [attr.data-testid]="'dropdown-menu'"
        (keydown)="onMenuKeydown($event)"
        (focusout)="onMenuFocusOut($event)"
      >
        @if (groups().length > 0) {
          @for (group of groups(); track group.label || $index; let groupIndex = $index) {
            @if (group.label) {
              <div
                class="px-3 py-2 text-xs font-semibold text-muted-foreground/80 bg-gradient-to-r from-muted/10 to-transparent border-b border-border/5 animate-in slide-in-from-top-1 duration-200"
                [style.animation-delay]="(groupIndex * 50) + 'ms'"
                role="group"
                [attr.aria-label]="group.label"
              >
                {{ group.label }}
              </div>
            }
            @for (item of group.items; track item.value || item.label; let itemIndex = $index) {
              @if (item.separator) {
                <div
                  class="my-1 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent animate-in fade-in-0 duration-300"
                  role="separator"
                  [style.animation-delay]="((groupIndex * group.items.length + itemIndex) * 30) + 'ms'"
                  [attr.aria-hidden]="'true'"
                ></div>
              } @else {
                <button
                  type="button"
                  role="menuitem"
                  [class]="getItemClasses(item)"
                  [attr.data-disabled]="item.disabled || null"
                  [attr.data-focused]="focusedIndex() === getItemGlobalIndex(groupIndex, itemIndex) || null"
                  [attr.id]="menuId + '-item-' + getItemGlobalIndex(groupIndex, itemIndex)"
                  [disabled]="item.disabled"
                  [attr.tabindex]="item.disabled ? -1 : 0"
                  [attr.aria-describedby]="item.description ? menuId + '-item-' + getItemGlobalIndex(groupIndex, itemIndex) + '-desc' : null"
                  [style.animation-delay]="((groupIndex * group.items.length + itemIndex) * 30) + 'ms'"
                  class="animate-in slide-in-from-top-1 duration-200"
                  (click)="selectItem(item)"
                  (keydown)="onItemKeydown($event, item)"
                  (focus)="setFocusedIndex(getItemGlobalIndex(groupIndex, itemIndex))"
                  (mouseenter)="setFocusedIndex(getItemGlobalIndex(groupIndex, itemIndex))"
                  (mouseleave)="clearFocusedIndex()"
                >
                  <div class="flex items-center gap-2 sm:gap-3 w-full">
                    @if (item.icon) {
                      <span
                        class="flex-shrink-0 h-4 w-4 transition-transform duration-200 group-hover:scale-110"
                        [innerHTML]="item.icon"
                        aria-hidden="true"
                      ></span>
                    }
                    <div class="flex-1 flex flex-col items-start text-left min-w-0">
                      <span class="font-medium text-sm truncate w-full">{{ item.label }}</span>
                      @if (item.description) {
                        <span
                          class="text-xs text-muted-foreground/70 truncate w-full hidden sm:block"
                          [id]="menuId + '-item-' + getItemGlobalIndex(groupIndex, itemIndex) + '-desc'"
                        >
                          {{ item.description }}
                        </span>
                      }
                    </div>
                    <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                      @if (item.shortcut) {
                        <span
                          class="text-xs tracking-widest text-muted-foreground/70 bg-muted/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md font-mono transition-all duration-200 group-hover:bg-muted/50 group-hover:scale-105 hidden sm:inline-block"
                          [attr.aria-label]="'Keyboard shortcut: ' + item.shortcut"
                        >
                          {{ item.shortcut }}
                        </span>
                      }
                      @if (item.badge) {
                        <span
                          class="inline-flex items-center rounded-full bg-gradient-to-r from-primary/10 to-primary/20 px-1.5 sm:px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 animate-pulse"
                          [attr.aria-label]="'Badge: ' + item.badge"
                        >
                          {{ item.badge }}
                        </span>
                      }
                    </div>
                  </div>
                </button>
              }
            }
            @if (!$last && group.items.length > 0) {
              <div
                class="my-1 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent animate-in fade-in-0 duration-300"
                role="separator"
                [attr.aria-hidden]="'true'"
              ></div>
            }
          }
        } @else {
          <div class="animate-in slide-in-from-top-2 duration-300">
            <ng-content></ng-content>
          </div>
        }
      </div>
    </ng-template>
  `,
})
export class DropdownMenu implements AfterViewInit, OnDestroy {
  @ViewChild('menu', {static: false}) menuElement?: ElementRef<HTMLElement>;
  @ViewChild('trigger', {static: false}) triggerElement?: ElementRef<HTMLElement>;
  @ViewChild('menuTemplate', {static: true}) menuTemplate!: TemplateRef<any>;
  
  // CDK overlay services
  private overlay = inject(Overlay);
  private positionBuilder = inject(OverlayPositionBuilder);
  private viewContainerRef = inject(ViewContainerRef);
  private overlayRef?: OverlayRef;
  private portal?: TemplatePortal;
  @Input() variant: DropdownMenuVariant['variant'] = 'default';
  @Input() size: DropdownMenuVariant['size'] = 'default';
  @Input() triggerVariant: DropdownMenuTriggerVariant['variant'] = 'default';
  @Input() triggerSize: DropdownMenuTriggerVariant['size'] = 'default';
  @Input() triggerText = 'Open menu';
  @Input() hideChevron = false;
  @Input() disabled = false;
  @Input() placement: 'bottom' | 'top' | 'left' | 'right' = 'bottom';
  @Input() closeOnSelect = true;
  // Outputs
  @Output() openChange = new EventEmitter<boolean>();
  @Output() itemSelect = new EventEmitter<DropdownMenuItemData>();
  isOpen = signal(false);
  focusedIndex = signal(-1);
  menuId = `dropdown-menu-${Math.random().toString(36).substr(2, 9)}`;
  allItems = computed(() => {
    return this.groups().flatMap(group => group.items.filter(item => !item.separator));
  });
  triggerClasses = computed(() =>
    cn(dropdownMenuTriggerVariants({
      variant: this.triggerVariant,
      size: this.triggerSize
    }))
  );
  menuClasses = computed(() => {
    // CDK overlay handles positioning, so we only need styling classes
    return cn(
      dropdownMenuVariants({
        variant: this.variant,
        size: this.size
      }),
      // Remove absolute positioning classes since CDK handles it
      'max-h-[60vh] overflow-y-auto',
      'min-w-[200px] max-w-[calc(100vw-1rem)]'
    );
  });
  private document = inject(DOCUMENT);
  private elementRef = inject(ElementRef);
  private _groups = signal<DropdownMenuGroupData[]>([]);

  constructor() {
    // Close on outside click
    effect(() => {
      if (this.isOpen()) {
        this.addOutsideClickListener();
      } else {
        this.removeOutsideClickListener();
      }
    });
  }

  @Input() set menuGroups(value: DropdownMenuGroupData[]) {
    this._groups.set(value || []);
  }

  // Internal state
  private _items = signal<DropdownMenuItemData[]>([]);

  // Inputs
  @Input() set items(value: DropdownMenuItemData[]) {
    this._items.set(value || []);
  }

  // Computed properties
  groups = computed(() => {
    const groups = this._groups();
    if (groups.length > 0) {
      return groups;
    }
    const items = this._items();
    if (items.length > 0) {
      return [{items}];
    }
    return [];
  });

  ngAfterViewInit() {
    // Set trigger ID for accessibility
    if (this.triggerElement) {
      this.triggerElement.nativeElement.id = `${this.menuId}-trigger`;
    }
  }

  ngOnDestroy() {
    this.removeOutsideClickListener();
    
    // Clean up CDK overlay
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen()) {
      this.close();
    }
  }

  toggle() {
    if (this.disabled) return;

    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (this.disabled) return;
    
    if (this.overlayRef?.hasAttached()) {
      return; // Already open
    }

    // Create overlay if it doesn't exist
    if (!this.overlayRef) {
      this.createOverlay();
    }

    // Create portal and attach to overlay
    if (!this.portal) {
      this.portal = new TemplatePortal(this.menuTemplate, this.viewContainerRef);
    }

    this.overlayRef!.attach(this.portal);
    this.isOpen.set(true);
    this.focusedIndex.set(-1);
    this.openChange.emit(true);

    // Focus first item after menu opens
    setTimeout(() => {
      this.focusFirstItem();
    }, 50); // Slight delay to ensure overlay is rendered
  }

  close() {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    }
    
    this.isOpen.set(false);
    this.focusedIndex.set(-1);
    this.openChange.emit(false);

    // Return focus to trigger
    if (this.triggerElement) {
      this.triggerElement.nativeElement.focus();
    }
  }

  private createOverlay() {
    if (!this.triggerElement) return;

    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.triggerElement)
      .withPositions(DROPDOWN_POSITION_MAP[this.placement])
      .withViewportMargin(8)
      .withPush(false);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false, // We handle clicks outside differently
      disposeOnNavigation: true
    });

    // Close on backdrop click (outside click)
    this.overlayRef.outsidePointerEvents().subscribe((event) => {
      if (!this.triggerElement?.nativeElement.contains(event.target as Node)) {
        this.close();
      }
    });
  }

  selectItem(item: DropdownMenuItemData) {
    if (item.disabled) return;

    this.itemSelect.emit(item);

    if (item.action) {
      item.action();
    }

    if (this.closeOnSelect) {
      this.close();
    }
  }

  getItemClasses(item: DropdownMenuItemData): string {
    return cn(dropdownMenuItemVariants({
      variant: item.variant || 'default',
      inset: false
    }));
  }

  onTriggerKeydown(event: KeyboardEvent) {
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
        setTimeout(() => this.focusLastItem(), 0);
        break;
    }
  }

  onMenuKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusNextItem();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPreviousItem();
        break;
      case 'Home':
        event.preventDefault();
        this.focusFirstItem();
        break;
      case 'End':
        event.preventDefault();
        this.focusLastItem();
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'Tab':
        this.close();
        break;
    }
  }

  onItemKeydown(event: KeyboardEvent, item: DropdownMenuItemData) {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectItem(item);
        break;
    }
  }

  private focusFirstItem() {
    const items = this.allItems();
    if (items.length > 0) {
      this.focusedIndex.set(0);
      this.focusItemAtIndex(0);
    }
  }

  private focusLastItem() {
    const items = this.allItems();
    if (items.length > 0) {
      const lastIndex = items.length - 1;
      this.focusedIndex.set(lastIndex);
      this.focusItemAtIndex(lastIndex);
    }
  }

  private focusNextItem() {
    const items = this.allItems();
    const currentIndex = this.focusedIndex();
    const nextIndex = (currentIndex + 1) % items.length;
    this.focusedIndex.set(nextIndex);
    this.focusItemAtIndex(nextIndex);
  }

  private focusPreviousItem() {
    const items = this.allItems();
    const currentIndex = this.focusedIndex();
    const previousIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
    this.focusedIndex.set(previousIndex);
    this.focusItemAtIndex(previousIndex);
  }

  private focusItemAtIndex(index: number) {
    if (!this.menuElement) return;

    const menuItems = this.menuElement.nativeElement.querySelectorAll('[role="menuitem"]');
    const item = menuItems[index] as HTMLElement;
    if (item) {
      item.focus();
    }
  }

  private outsideClickListener = (event: Event) => {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  };

  private addOutsideClickListener() {
    this.document.addEventListener('click', this.outsideClickListener);
  }

  private removeOutsideClickListener() {
    this.document.removeEventListener('click', this.outsideClickListener);
  }

  // Additional helper methods for enhanced accessibility
  getItemGlobalIndex(groupIndex: number, itemIndex: number): number {
    let globalIndex = 0;
    for (let i = 0; i < groupIndex; i++) {
      globalIndex += this.groups()[i].items.filter(item => !item.separator).length;
    }
    return globalIndex + this.groups()[groupIndex].items.slice(0, itemIndex).filter(item => !item.separator).length;
  }

  getActiveDescendant(): string | null {
    const focusIndex = this.focusedIndex();
    return focusIndex >= 0 ? `${this.menuId}-item-${focusIndex}` : null;
  }

  setFocusedIndex(index: number) {
    this.focusedIndex.set(index);
  }

  clearFocusedIndex() {
    this.focusedIndex.set(-1);
  }

  onTriggerFocus() {
    // Enhanced accessibility: announce focus state
  }

  onTriggerBlur() {
    // Enhanced accessibility: manage focus state
  }

  onMenuFocusOut(event: FocusEvent) {
    // Close menu if focus moves outside the menu
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (!this.menuElement?.nativeElement.contains(relatedTarget) &&
        !this.triggerElement?.nativeElement.contains(relatedTarget)) {
      this.close();
    }
  }
}
