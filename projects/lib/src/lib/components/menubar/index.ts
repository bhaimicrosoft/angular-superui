import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { trigger, transition, style, animate } from '@angular/animations';
import { cn } from '../../utils/cn';
import { Overlay, OverlayRef, ConnectedPosition, FlexibleConnectedPositionStrategy, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

// Types
export interface MenubarItemData {
  label: string;
  icon?: string; // Optional SVG/HTML string for an icon
  disabled?: boolean;
  shortcut?: string;
  href?: string;
  action?: () => void;
  submenu?: MenubarItemData[];
  ariaLabel?: string;
}

export interface MenubarConfig {
  orientation?: 'horizontal' | 'vertical';
}

// Styling with CVA (Tailwind v4)
const menubarRootVariants = cva(
  [
    'inline-flex w-full sm:w-auto items-center gap-1 rounded-md border border-input bg-background text-foreground shadow-sm',
    'p-1',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    // Mobile friendliness
    'overflow-x-auto scrollbar-hide'
  ],
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col min-w-[12rem]'
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base'
      }
    },
    defaultVariants: {
      orientation: 'horizontal',
      size: 'md'
    }
  }
);

const menubarButtonVariants = cva(
  [
    'relative inline-flex items-center gap-2 rounded-md px-3 py-2 select-none',
    'transition-colors duration-150 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'hover:bg-accent hover:text-accent-foreground',
    'aria-expanded:bg-accent aria-expanded:text-accent-foreground',
    'disabled:opacity-50 disabled:pointer-events-none',
  ],
  {
    variants: {
      active: {
        true: 'bg-accent text-accent-foreground',
        false: ''
      },
      size: {
        sm: 'h-8',
        md: 'h-9',
        lg: 'h-10'
      }
    },
    defaultVariants: {
      active: false,
      size: 'md'
    }
  }
);

const menuPanelVariants = cva(
  [
    'z-50 min-w-40 max-w-[calc(100vw-2rem)] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md',
    'animate-in fade-in-0 zoom-in-95 duration-200 transform-gpu',
    'focus-visible:outline-none',
  ],
  {
    variants: {
      side: {
  bottom: '',
  right: '',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base'
      }
    },
    defaultVariants: {
      side: 'bottom',
      size: 'md'
    }
  }
);

const menuItemVariants = cva(
  [
    'group relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none',
    'transition-colors duration-150',
    'hover:bg-accent hover:text-accent-foreground',
    'focus:bg-accent focus:text-accent-foreground',
    'data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
  ],
  {
    variants: {
      inset: {
        true: 'pl-8',
        false: ''
      },
      size: {
        sm: 'text-xs py-1.5',
        md: 'text-sm py-2',
        lg: 'text-base py-2.5'
      }
    },
    defaultVariants: {
      inset: false,
      size: 'md'
    }
  }
);

export type MenubarRootVariant = VariantProps<typeof menubarRootVariants>;

@Component({
  selector: 'Menubar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('menuAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.98)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('120ms ease-in', style({ opacity: 0, transform: 'scale(0.98)' })),
      ]),
    ]),
  ],
  template: `
    <div class="relative inline-block">
      <nav
        #root
        [attr.role]="'menubar'"
        [attr.aria-orientation]="orientation()"
        [class]="rootClasses()"
        (keydown)="onMenubarKeydown($event)"
        (mouseleave)="onMenubarMouseLeave()"
      >
        @for (item of items(); track item; let i = $index) {
          <div class="relative">
            <button
              type="button"
              [id]="idFor([i])"
              [attr.role]="'menuitem'"
              [attr.aria-haspopup]="item.submenu?.length ? 'true' : 'false'"
              [attr.aria-expanded]="isPathOpen([i]) ? 'true' : 'false'"
              [attr.aria-controls]="item.submenu?.length ? idFor([i,'panel']) : null"
              [attr.tabindex]="topLevelTabIndex(i)"
              [attr.aria-label]="item.ariaLabel || null"
              [disabled]="item.disabled || null"
              [class]="buttonClasses(isPathOpen([i]))"
              (click)="onTopItemClick(i, item)"
              (mouseenter)="onTopItemHover(i, item)"
            >
              @if (item.icon) {
                <span class="h-4 w-4" [innerHTML]="item.icon" aria-hidden="true"></span>
              }
              <span class="truncate">{{ item.label }}</span>
              @if (item.submenu?.length) {
                <svg class="h-3.5 w-3.5 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clip-rule="evenodd" />
                </svg>
              }
            </button>
          </div>
        }
      </nav>

      <!-- Overlay-driven panel template -->
      <ng-template #panelTpl let-items="items" let-parentPath="parentPath">
        <div
          [id]="buildPanelIdFor(parentPath)"
          [class]="panelClasses('bottom')"
          role="menu"
          aria-orientation="vertical"
          [@menuAnim]
        >
          @for (child of items; track child; let j = $index) {
            <button
              type="button"
              [id]="idFor(parentPath.concat([j]))"
              role="menuitem"
              [attr.aria-haspopup]="child.submenu?.length ? 'true' : 'false'"
              [attr.aria-expanded]="isPathOpen(parentPath.concat([j])) ? 'true' : 'false'"
              [attr.aria-controls]="child.submenu?.length ? buildPanelIdFor(parentPath.concat([j])) : null"
              [disabled]="child.disabled || null"
              [class]="menuItemClasses()"
              (click)="onSubItemClick(parentPath, j, child)"
              (mouseenter)="onSubItemHover(parentPath, j, child, $event)"
              (keydown)="onSubItemKeydown($event, parentPath, j, child)"
            >
              <div class="flex items-center gap-2 w-full">
                @if (child.icon) {
                  <span class="h-4 w-4" [innerHTML]="child.icon" aria-hidden="true"></span>
                }
                <span class="flex-1 text-left truncate">{{ child.label }}</span>
                @if (child.shortcut) {
                  <span class="text-[10px] text-muted-foreground/80 font-mono">{{ child.shortcut }}</span>
                }
                @if (child.submenu?.length) {
                  <svg class="h-3.5 w-3.5 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L10.94 10 7.23 6.29a.75.75 0 111.06-1.06l4.24 4.24a.75.75 0 010 1.06l-4.24 4.24a.75.75 0 01-1.08 0z" clip-rule="evenodd" />
                  </svg>
                }
              </div>
            </button>
          }
        </div>
      </ng-template>
    </div>
  `,
})
export class Menubar implements OnDestroy {
  // Inputs
  items = input<MenubarItemData[]>([]);
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  size = input<'sm' | 'md' | 'lg'>('md');

  // Outputs
  itemSelect = output<MenubarItemData>();
  openChange = output<boolean>();

  // Internal state
  private baseId = `menubar-${Math.random().toString(36).slice(2, 9)}`;
  focusedTopIndex = signal(0);
  // Active path indicates which submenu chain is open, e.g., [0,2]
  activePath = signal<number[] | null>(null);
  private hoverWithinPanel = signal(false);
  private closeTimer: any;

  @ViewChild('root', { static: true }) rootRef!: ElementRef<HTMLElement>;
  @ViewChild('panelTpl', { static: true }) panelTpl!: TemplateRef<any>;

  constructor(private viewContainerRef: ViewContainerRef, private overlay: Overlay, private positionBuilder: OverlayPositionBuilder) {
    // Close panels when orientation changes
    effect(() => {
      this.orientation();
      this.closeAll();
    });
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  // Classes
  rootClasses = computed(() => cn(menubarRootVariants({
    orientation: this.orientation(),
    size: this.size()
  })));

  buttonClasses = (active: boolean) => cn(menubarButtonVariants({ active, size: this.size() }));
  menuItemClasses = () => cn(menuItemVariants({ size: this.size() }));
  panelClasses = (side: 'bottom' | 'right') => cn(menuPanelVariants({ side, size: this.size() }));

  // A11y helpers
  idFor(path: (number | string)[]): string {
    return [this.baseId, ...path].join('-');
  }

  isPathOpen(path: number[]): boolean {
    const active = this.activePath();
    if (!active) return false;
    // path is considered open if it matches the prefix of activePath
    return path.every((v, idx) => active[idx] === v);
  }

  topLevelTabIndex(i: number): number {
    return this.focusedTopIndex() === i ? 0 : -1;
  }

  // Interaction handlers
  onTopItemClick(index: number, item: MenubarItemData) {
    if (item.disabled) return;
    if (item.submenu?.length) {
      const isOpen = this.isPathOpen([index]);
      if (isOpen) {
        this.closeFrom([index]);
      } else {
        const anchor = this.rootRef.nativeElement.querySelector(`#${this.idFor([index])}`) as HTMLElement | null;
        if (anchor) this.openPanel([index], anchor, item.submenu!, this.orientation() === 'vertical' ? 'right' : 'bottom');
      }
    } else {
      this.activateItem(item);
    }
    this.focusedTopIndex.set(index);
  }

  onTopItemHover(index: number, item: MenubarItemData) {
    if (!item.submenu?.length) return;
    const anchor = this.rootRef.nativeElement.querySelector(`#${this.idFor([index])}`) as HTMLElement | null;
    if (anchor) this.openPanel([index], anchor, item.submenu!, this.orientation() === 'vertical' ? 'right' : 'bottom');
  }

  onSubItemClick(parentPath: number[], childIndex: number, item: MenubarItemData) {
    if (item.disabled) return;
    if (item.submenu?.length) {
      const path = parentPath.concat([childIndex]);
      const isOpen = this.isPathOpen(path);
      if (isOpen) {
        this.closeFrom(path);
      } else {
        const anchor = document.getElementById(this.idFor(path));
        if (anchor) this.openPanel(path, anchor, item.submenu!, 'right');
      }
    } else {
      this.activateItem(item);
    }
  }

  onSubItemHover(parentPath: number[], childIndex: number, item: MenubarItemData, event: MouseEvent) {
    if (!item.submenu?.length) return;
    const anchor = event.currentTarget as HTMLElement;
    const path = parentPath.concat([childIndex]);
    this.openPanel(path, anchor, item.submenu!, 'right');
  }

  onPanelMouseEnter() {
    this.hoverWithinPanel.set(true);
    this.clearTimers();
  }

  onMenubarMouseLeave() {
    this.hoverWithinPanel.set(false);
    this.scheduleClose();
  }

  // Keyboard handling for top-level
  onMenubarKeydown(event: KeyboardEvent) {
    const items = this.items();
    const count = items.length;
    if (count === 0) return;

    switch (event.key) {
      case 'ArrowRight': {
        event.preventDefault();
        const next = (this.focusedTopIndex() + 1) % count;
        this.focusedTopIndex.set(next);
        this.focusTop(next);
        if (this.activePath()) this.activePath.set([next]);
        break;
      }
      case 'ArrowLeft': {
        event.preventDefault();
        const prev = (this.focusedTopIndex() - 1 + count) % count;
        this.focusedTopIndex.set(prev);
        this.focusTop(prev);
        if (this.activePath()) this.activePath.set([prev]);
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
        const i = this.focusedTopIndex();
        const item = items[i];
        if (item?.submenu?.length) {
          const anchor = this.rootRef.nativeElement.querySelector(`#${this.idFor([i])}`) as HTMLElement | null;
          if (anchor) {
            this.openPanel([i], anchor, item.submenu!, this.orientation() === 'vertical' ? 'right' : 'bottom');
            this.focusFirstInPanel([i]);
          }
        }
        break;
      }
      case 'Enter':
      case ' ': {
        event.preventDefault();
        const i = this.focusedTopIndex();
        const item = items[i];
        if (!item) return;
        if (item.submenu?.length) {
          const open = this.isPathOpen([i]);
          const anchor = this.rootRef.nativeElement.querySelector(`#${this.idFor([i])}`) as HTMLElement | null;
          if (!open && anchor) {
            this.openPanel([i], anchor, item.submenu!, this.orientation() === 'vertical' ? 'right' : 'bottom');
            this.focusFirstInPanel([i]);
          } else {
            this.closeFrom([i]);
          }
        } else {
          this.activateItem(item);
        }
        break;
      }
      case 'Escape': {
        event.preventDefault();
        this.closeAll();
        break;
      }
    }
  }

  // Keyboard handling for submenu items
  onSubItemKeydown(event: KeyboardEvent, parentPath: number[], index: number, item: MenubarItemData) {
    switch (event.key) {
      case 'ArrowRight': {
        // Open nested submenu if available
        if (item.submenu?.length) {
          event.preventDefault();
          const path = parentPath.concat([index]);
          const anchor = document.getElementById(this.idFor(path));
          if (anchor) {
            this.openPanel(path, anchor, item.submenu!, 'right');
            this.focusFirstInPanel(path);
          }
        }
        break;
      }
      case 'ArrowLeft': {
        event.preventDefault();
        // Close current submenu level
        const up = parentPath.slice(0, -1);
        this.closeFrom(parentPath);
        this.activePath.set(up.length ? up : this.activePath()?.length ? [this.activePath()![0]] : null);
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
        this.moveFocusWithinPanel(parentPath, index, +1);
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        this.moveFocusWithinPanel(parentPath, index, -1);
        break;
      }
      case 'Enter':
      case ' ': {
        event.preventDefault();
        this.onSubItemClick(parentPath, index, item);
        break;
      }
      case 'Escape': {
        event.preventDefault();
        const top = this.activePath()?.[0] ?? 0;
        this.closeAll();
        this.focusTop(top);
        break;
      }
    }
  }

  // Helpers
  private focusTop(i: number) {
    const el = this.rootRef.nativeElement.querySelector(`#${this.idFor([i])}`) as HTMLElement | null;
    el?.focus();
  }

  private focusFirstInPanel(path: number[]) {
    const panelId = this.idFor([...path, 'panel']);
    const panel = document.getElementById(panelId) as HTMLElement | null;
    const first = panel?.querySelector('[role="menuitem"]') as HTMLElement | null;
    first?.focus();
  }

  private moveFocusWithinPanel(parentPath: number[], currentIndex: number, delta: number) {
    const panelId = this.idFor([...parentPath, 'panel']);
    const panel = this.rootRef.nativeElement.querySelector(`#${panelId}`) as HTMLElement | null;
    const items = panel ? Array.from(panel.querySelectorAll('[role="menuitem"]')) as HTMLElement[] : [];
    if (!items.length) return;
    const next = (currentIndex + delta + items.length) % items.length;
    items[next]?.focus();
  }

  // Template helpers (avoid spread in template expressions)
  buildChildPath(parentPath: number[], index: number): number[] {
    return [...parentPath, index];
  }

  buildPanelIdFor(path: number[]): string {
    return this.idFor([...path, 'panel']);
  }

  private activateItem(item: MenubarItemData) {
    if (item.href) {
      window.location.assign(item.href);
      return;
    }
    if (item.action) {
      item.action();
    }
    this.itemSelect.emit(item);
    this.closeAll();
  }

  private scheduleClose() {
    this.clearTimers();
    this.closeTimer = setTimeout(() => {
      if (!this.hoverWithinPanel()) {
        this.closeAll();
      }
    }, 150);
  }

  private clearTimers() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  private closeAll() {
    for (const [, ref] of this.panels) {
      ref.dispose();
    }
    this.panels.clear();
    this.activePath.set(null);
    this.openChange.emit(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as Node;
    if (this.rootRef?.nativeElement.contains(target)) return;
    for (const [, ref] of this.panels) {
      if (ref.overlayElement.contains(target as Node)) return;
    }
    this.closeAll();
  }

  // Overlay management
  private panels = new Map<string, OverlayRef>();

  private openPanel(path: number[], anchor: HTMLElement, items: MenubarItemData[], side: 'bottom' | 'right') {
    // Keep only ancestors of this path open; close others and siblings
    this.closePanelsNotLeadingTo(path);

    const key = this.keyFromPath(path);
    let overlayRef = this.panels.get(key);
    const positions = this.getPositions(side);

    if (!overlayRef) {
      const positionStrategy = this.positionBuilder
        .flexibleConnectedTo(anchor)
        .withPositions(positions)
        .withPush(true)
        .withViewportMargin(8);

      overlayRef = this.overlay.create({
        positionStrategy,
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        hasBackdrop: false,
        panelClass: ['menubar-overlay-panel'],
      });

      overlayRef.overlayElement.addEventListener('mouseenter', () => {
        this.hoverWithinPanel.set(true);
        this.clearTimers();
      });
      overlayRef.overlayElement.addEventListener('mouseleave', () => {
        this.hoverWithinPanel.set(false);
        this.scheduleClose();
      });

      this.panels.set(key, overlayRef);
    } else {
      const strategy = overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
      strategy.setOrigin(anchor);
    }

    const portal = new TemplatePortal(this.panelTpl, this.viewContainerRef, {
      items,
      parentPath: path,
    });
    overlayRef.detach();
    overlayRef.attach(portal);

    this.activePath.set(path);
    this.openChange.emit(true);
  }

  private getPositions(side: 'bottom' | 'right'): ConnectedPosition[] {
    if (side === 'right') {
      return [
        { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 8 },
        { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom', offsetX: 8 },
      ];
    }
    return [
      { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 8 },
      { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 8 },
    ];
  }

  private keyFromPath(path: number[]): string { return path.join('-'); }

  private parseKey(key: string): number[] { return key ? key.split('-').map(n => +n) : []; }

  private isKeyPrefixOfPath(key: string, path: number[]): boolean {
    const arr = this.parseKey(key);
    if (arr.length > path.length) return false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== path[i]) return false;
    }
    return true;
  }

  private closePanelsNotLeadingTo(path: number[]) {
    for (const [key, ref] of Array.from(this.panels.entries())) {
      if (!this.isKeyPrefixOfPath(key, path)) {
        ref.dispose();
        this.panels.delete(key);
      }
    }
  }

  private closeFrom(path: number[]) {
    const prefix = this.keyFromPath(path);
    for (const [key, ref] of Array.from(this.panels.entries())) {
      if (key === prefix || key.startsWith(prefix)) {
        ref.dispose();
        this.panels.delete(key);
      }
    }
    const parent = path.slice(0, -1);
    this.activePath.set(parent.length ? parent : null);
    if (!this.activePath()) this.openChange.emit(false);
  }
}
