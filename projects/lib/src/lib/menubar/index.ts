import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Injectable,
  input,
  OnDestroy,
  Output,
  signal,
  ViewChild
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenubarService {
  private activeMenu = signal<MenubarMenu | null>(null);

  setActiveMenu(menu: MenubarMenu | null) {
    const current = this.activeMenu();
    if (current && current !== menu) {
      if (current.isOpen()) {
        current.close();
      }
    }
    this.activeMenu.set(menu);
  }

  closeAllMenus() {
    const current = this.activeMenu();
    if (current && current.isOpen()) {
      current.close();
    }
    this.activeMenu.set(null);
  }
}

@Component({
  selector: 'MenubarShortcut',
  standalone: true,
  template: '<span class="ml-auto text-xs tracking-widest opacity-60"><ng-content /></span>',
})
export class MenubarShortcut {
}

@Component({
  selector: 'MenubarSeparator',
  standalone: true,
  template: '<div class="-mx-1 my-1 h-px bg-slate-200 dark:bg-slate-700"></div>',
})
export class MenubarSeparator {
}

@Component({
  selector: 'MenubarItem',
  standalone: true,
  template: `
    <div
      class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 focus:bg-slate-100 dark:focus:bg-slate-700 focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 focus:ring-offset-1 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      role="menuitem"
      [attr.data-disabled]="disabled() ? 'true' : null"
      [attr.aria-disabled]="disabled()"
      [attr.tabindex]="disabled() ? -1 : 0"
    >
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarItem {
  disabled = input(false);
  private readonly menubarService = inject(MenubarService);

  @Output() itemClick = new EventEmitter<void>();

  @HostListener('click')
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  onClick(event?: Event) {
    if (event?.type === 'keydown') {
      const keyboardEvent = event as KeyboardEvent;
      keyboardEvent.preventDefault();
    }
    if (!this.disabled()) {
      this.itemClick.emit();
      this.menubarService.closeAllMenus();
    }
  }
}

@Component({
  selector: 'MenubarSubContent',
  standalone: true,
  template: `
    <div
      class="absolute left-full top-0 min-w-48 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1 shadow-lg animate-in fade-in-0 zoom-in-95 duration-150"
      role="menu"
      (keydown.arrowdown)="focusNextItem($event)"
      (keydown.arrowup)="focusPreviousItem($event)"
      (keydown.arrowleft)="closeAndFocusTrigger($event)"
      (keydown.escape)="closeAndFocusTrigger($event)"
    >
      <ng-content/>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarSubContent {
  private readonly elementRef = inject(ElementRef);

  focusNextItem(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    keyboardEvent.stopPropagation();

    const items = this.getFocusableItems();
    const currentIndex = this.getCurrentItemIndex(items);
    const nextIndex = (currentIndex + 1) % items.length;
    items[nextIndex]?.focus();
  }

  focusPreviousItem(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    keyboardEvent.stopPropagation();

    const items = this.getFocusableItems();
    const currentIndex = this.getCurrentItemIndex(items);
    const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    items[prevIndex]?.focus();
  }

  closeAndFocusTrigger(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    keyboardEvent.stopPropagation();

    const sub = this.elementRef.nativeElement.closest('MenubarSub');
    if (sub) {
      const subComponent = this.getSubComponent(sub);
      if (subComponent) {
        subComponent.close();
        setTimeout(() => {
          const trigger = sub.querySelector('MenubarSubTrigger div[tabindex="0"]');
          if (trigger) {
            (trigger as HTMLElement).focus();
          }
        }, 0);
      }
    }
  }

  private getFocusableItems(): HTMLElement[] {
    return Array.from(this.elementRef.nativeElement.querySelectorAll('div[role="menuitem"][tabindex="0"]'));
  }

  private getCurrentItemIndex(items: HTMLElement[]): number {
    return items.indexOf(document.activeElement as HTMLElement);
  }

  private getSubComponent(subElement: Element): any {
    const ngContext = (subElement as any).__ngContext__;
    if (ngContext) {
      for (let i = 0; i < ngContext.length; i++) {
        if (ngContext[i] && ngContext[i].constructor && ngContext[i].constructor.name === 'MenubarSub') {
          return ngContext[i];
        }
      }
    }
    return null;
  }
}

@Component({
  selector: 'MenubarSubTrigger',
  standalone: true,
  template: `
    <div
      class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 focus:bg-slate-100 dark:focus:bg-slate-700 focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 focus:ring-offset-1"
      role="menuitem"
      [attr.aria-expanded]="isExpanded()"
      [attr.aria-haspopup]="true"
      tabindex="0"
      (keydown.arrowright)="onArrowRight($event)"
      (keydown.enter)="onActivate($event)"
      (keydown.space)="onActivate($event)"
    >
      <ng-content/>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 ml-auto">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarSubTrigger {
  isExpanded = input(false);
  private readonly elementRef = inject(ElementRef);

  onArrowRight(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();

    const sub = this.elementRef.nativeElement.closest('MenubarSub');
    if (sub) {
      const subComponent = this.getSubComponent(sub);
      if (subComponent) {
        subComponent.open();
        setTimeout(() => {
          const content = sub.querySelector('MenubarSubContent');
          const firstItem = content?.querySelector('div[role="menuitem"][tabindex="0"]');
          if (firstItem) {
            (firstItem as HTMLElement).focus();
          }
        }, 100);
      }
    }
  }

  onActivate(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    keyboardEvent.stopPropagation();
    this.onArrowRight(event);
  }

  private getSubComponent(subElement: Element): any {
    const ngContext = (subElement as any).__ngContext__;
    if (ngContext) {
      for (let i = 0; i < ngContext.length; i++) {
        if (ngContext[i] && ngContext[i].constructor && ngContext[i].constructor.name === 'MenubarSub') {
          return ngContext[i];
        }
      }
    }
    return null;
  }
}

@Component({
  selector: 'MenubarSub',
  standalone: true,
  template: `
    <div class="relative" (mouseenter)="open()" (mouseleave)="close()">
      <ng-content select="MenubarSubTrigger"/>
      @if (isOpen()) {
        <ng-content select="MenubarSubContent"/>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarSub {
  readonly isOpen = signal(false);
  private readonly elementRef = inject(ElementRef);

  open() {
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }
}

@Component({
  selector: 'MenubarContent',
  standalone: true,
  template: `
    <div
      class="absolute left-0 top-full min-w-48 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1 shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150"
      role="menu"
      [attr.id]="getContentId()"
      [attr.aria-labelledby]="getTriggerId()"
      tabindex="-1"
      (keydown.arrowdown)="focusNextItem($event)"
      (keydown.arrowup)="focusPreviousItem($event)"
      (keydown.escape)="onEscape($event)"
      (keydown.home)="focusFirstItem($event)"
      (keydown.end)="focusLastItem($event)"
    >
      <ng-content/>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarContent {
  private readonly elementRef = inject(ElementRef);

  getContentId(): string {
    const menu = this.getMenuComponent();
    return menu?.getContentId() || '';
  }

  getTriggerId(): string {
    const contentId = this.getContentId();
    return contentId.replace('content', 'trigger');
  }

  focusNextItem(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    keyboardEvent.stopPropagation();

    const items = this.getFocusableItems();
    const currentIndex = this.getCurrentItemIndex(items);
    const nextIndex = (currentIndex + 1) % items.length;
    items[nextIndex]?.focus();
  }

  focusPreviousItem(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    keyboardEvent.stopPropagation();

    const items = this.getFocusableItems();
    const currentIndex = this.getCurrentItemIndex(items);
    const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    items[prevIndex]?.focus();
  }

  focusFirstItem(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    keyboardEvent.stopPropagation();

    const items = this.getFocusableItems();
    items[0]?.focus();
  }

  focusLastItem(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    keyboardEvent.stopPropagation();

    const items = this.getFocusableItems();
    items[items.length - 1]?.focus();
  }

  onEscape(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    keyboardEvent.stopPropagation();

    const menu = this.getMenuComponent();
    if (menu) {
      menu.close();
      setTimeout(() => {
        const trigger = this.elementRef.nativeElement.closest('MenubarMenu')?.querySelector('MenubarTrigger button');
        if (trigger) {
          (trigger as HTMLElement).focus();
        }
      }, 0);
    }
  }

  private getFocusableItems(): HTMLElement[] {
    return Array.from(this.elementRef.nativeElement.querySelectorAll('div[role="menuitem"][tabindex="0"]'));
  }

  private getCurrentItemIndex(items: HTMLElement[]): number {
    return items.indexOf(document.activeElement as HTMLElement);
  }

  private getMenuComponent(): any {
    const menuElement = this.elementRef.nativeElement.closest('MenubarMenu');
    if (menuElement) {
      const ngContext = (menuElement as any).__ngContext__;
      if (ngContext) {
        for (let i = 0; i < ngContext.length; i++) {
          if (ngContext[i] && ngContext[i].constructor && ngContext[i].constructor.name === 'MenubarMenu') {
            return ngContext[i];
          }
        }
      }
    }
    return null;
  }
}

@Component({
  selector: 'MenubarTrigger',
  standalone: true,
  template: `
    <button
      type="button"
      [attr.aria-expanded]="menubarMenu?.isOpen() || false"
      [attr.aria-haspopup]="true"
      [attr.aria-controls]="menubarMenu?.isOpen() ? 'menubar-content-' + triggerId : null"
      [id]="'menubar-trigger-' + triggerId"
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 h-10 px-4 py-2"
      (click)="onClick()"
      (keydown.enter)="onClick($event)"
      (keydown.space)="onClick($event)"
      (keydown.arrowdown)="onArrowDown($event)"
      (keydown.arrowright)="onArrowRight($event)"
      (keydown.arrowleft)="onArrowLeft($event)"
    >
      <ng-content />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarTrigger {
  readonly triggerId = Math.random().toString(36).substr(2, 9);
  menubarMenu: MenubarMenu | null = null; // Made public for parent access
  private readonly elementRef = inject(ElementRef);

  // Simple method for parent to register itself
  setMenubarMenu(menu: MenubarMenu) {
    this.menubarMenu = menu;
    menu.setContentId('menubar-content-' + this.triggerId);
  }

  constructor() {
    // Fallback registration check
    setTimeout(() => {
      if (!this.menubarMenu) {
        const parentElement = this.elementRef.nativeElement.closest('MenubarMenu');
        if (parentElement && (parentElement as any).__menubarMenuComponent__) {
          this.setMenubarMenu((parentElement as any).__menubarMenuComponent__);
        }
      }
    }, 100);
  }

  onClick(event?: Event) {
    if (event?.type === 'keydown') {
      const keyboardEvent = event as KeyboardEvent;
      keyboardEvent.preventDefault();
    }
    if (this.menubarMenu) {
      this.menubarMenu.toggle();
    }
  }

  onArrowDown(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    keyboardEvent.stopPropagation();

    if (this.menubarMenu && !this.menubarMenu.isOpen()) {
      this.menubarMenu.open();
    }

    setTimeout(() => {
      const content = this.elementRef.nativeElement.closest('MenubarMenu')?.querySelector('MenubarContent');
      const firstItem = content?.querySelector('div[role="menuitem"][tabindex="0"]');
      if (firstItem) {
        (firstItem as HTMLElement).focus();
      }
    }, 150);
  }

  onArrowRight(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    this.focusNextTrigger();
  }

  onArrowLeft(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    this.focusPreviousTrigger();
  }

  private focusNextTrigger() {
    const menubar = this.elementRef.nativeElement.closest('Menubar');
    const triggers = Array.from(menubar?.querySelectorAll('MenubarTrigger button') || []);
    const currentIndex = triggers.indexOf(this.elementRef.nativeElement.querySelector('button'));
    const nextIndex = (currentIndex + 1) % triggers.length;
    (triggers[nextIndex] as HTMLElement)?.focus();
  }

  private focusPreviousTrigger() {
    const menubar = this.elementRef.nativeElement.closest('Menubar');
    const triggers = Array.from(menubar?.querySelectorAll('MenubarTrigger button') || []);
    const currentIndex = triggers.indexOf(this.elementRef.nativeElement.querySelector('button'));
    const prevIndex = currentIndex === 0 ? triggers.length - 1 : currentIndex - 1;
    (triggers[prevIndex] as HTMLElement)?.focus();
  }
}

@Component({
  selector: 'MenubarMenu',
  standalone: true,
  template: `
    <div class="relative">
      <ng-content select="MenubarTrigger"/>
      @if (isOpen()) {
        <ng-content select="MenubarContent"/>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarMenu implements OnDestroy {
  readonly isOpen = signal(false);
  private readonly elementRef = inject(ElementRef);
  private readonly menubarService = inject(MenubarService);
  private contentId = '';

  constructor() {
    // Register with trigger after view init
    setTimeout(() => {
      const triggerElement = this.elementRef.nativeElement.querySelector('MenubarTrigger');
      
      if (triggerElement) {
        // Try to get the trigger component instance
        const ngContext = (triggerElement as any).__ngContext__;
        
        let triggerComponent = null;
        
        // Try different methods to get component instance
        if ((triggerElement as any).__ngComponent__) {
          triggerComponent = (triggerElement as any).__ngComponent__;
        } else if (Array.isArray(ngContext)) {
          for (let i = 0; i < ngContext.length; i++) {
            if (ngContext[i] && ngContext[i].constructor && ngContext[i].constructor.name === 'MenubarTrigger') {
              triggerComponent = ngContext[i];
              break;
            }
          }
        } else if (ngContext && typeof ngContext === 'object' && ngContext.constructor && ngContext.constructor.name === 'MenubarTrigger') {
          triggerComponent = ngContext;
        }
        
        if (triggerComponent && triggerComponent.setMenubarMenu) {
          triggerComponent.setMenubarMenu(this);
        } else {
          // Alternative: set a property on the element that the trigger can access
          (this.elementRef.nativeElement as any).__menubarMenuComponent__ = this;
        }
      }
    }, 50);
  }

  setContentId(id: string) {
    this.contentId = id;
  }

  getContentId(): string {
    return this.contentId;
  }

  @HostListener('menubar-trigger-click', ['$event'])
  onTriggerClick(event: Event) {
    event.stopPropagation();
    this.toggle();
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.menubarService.setActiveMenu(this);
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }

  ngOnDestroy() {
    if (this.menubarService['activeMenu']() === this) {
      this.menubarService['activeMenu'].set(null);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isOpen() && !this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  @HostListener('keydown.escape', ['$event'])
  onEscape(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (this.isOpen()) {
      keyboardEvent.preventDefault();
      this.close();
      const trigger = this.elementRef.nativeElement.querySelector('MenubarTrigger button');
      if (trigger) {
        (trigger as HTMLElement).focus();
      }
    }
  }
}

@Component({
  selector: 'Menubar',
  standalone: true,
  template: `
    <div
      class="flex h-10 items-center space-x-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1"
      role="menubar"
      [attr.aria-label]="ariaLabel || 'Main navigation'"
    >
      <ng-content/>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menubar {
  ariaLabel = input<string>();
  private readonly menubarService = inject(MenubarService);

  @HostListener('keydown', ['$event'])
  onKeydown(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Escape') {
      this.menubarService.closeAllMenus();
      keyboardEvent.preventDefault();
    }
  }
}
