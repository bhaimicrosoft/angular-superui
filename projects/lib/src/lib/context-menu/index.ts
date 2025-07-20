import { Component, Input, signal, HostListener, ViewChild, TemplateRef, effect, DestroyRef, inject, ViewContainerRef, Injectable, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FocusMonitor } from '@angular/cdk/a11y'; // For better focus management, optional but good

// Renamed interface: IContextMenuItem
export interface IContextMenuItem {
  label: string;
  action?: (item: IContextMenuItem) => void;
  shortcut?: string;
  separator?: boolean;
  disabled?: boolean;
}

// Global service to manage context menu state
@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  private currentOverlayRef: OverlayRef | null = null;
  private currentContextMenuComponent: ContextMenu | null = null;

  // Signals for state management
  private isMenuOpen = signal(false);
  private menuPosition = signal<{ x: number; y: number } | null>(null);
  private activeComponent = signal<ContextMenu | null>(null);

  private readonly destroyRef = inject(DestroyRef);

  constructor(private overlay: Overlay) {
    // Global document click listener to close any open context menu
    document.addEventListener('click', (event) => {
      if (this.isMenuOpen()) {
        console.log('Service: Global click detected, closing current menu.');
        this.closeCurrentMenu();
      }
    });

    // Global contextmenu listener to prevent browser context menu everywhere
    document.addEventListener('contextmenu', (event) => {
      // Always prevent the browser context menu
      event.preventDefault();
      console.log('Service: Browser context menu prevented globally.');
    }, false);

    // Effect to handle menu state changes
    effect(() => {
      const isOpen = this.isMenuOpen();
      const position = this.menuPosition();
      const component = this.activeComponent();

      console.log('Service: Menu state changed', { isOpen, position, component });

      if (isOpen && position && component) {
        console.log('Service: Effect detected open request - calling actuallyOpenMenu');
        // Open menu
        this.actuallyOpenMenu(component, position.x, position.y);
      } else if (!isOpen) {
        console.log('Service: Effect detected close request - calling actuallyCloseMenu');
        // Close menu
        this.actuallyCloseMenu();
      }
    });
  }

  /**
   * Opens a context menu at the specified coordinates.
   * This method now uses signals for better state management.
   * @param menuComponent The ContextMenu component instance that wants to open.
   * @param x The X-coordinate for the menu.
   * @param y The Y-coordinate for the menu.
   */
  openContextMenu(menuComponent: ContextMenu, x: number, y: number): void {
    console.log('Service: Request to open context menu received.', { menuComponent, x, y });

    // First close any existing menu by setting isMenuOpen to false
    if (this.isMenuOpen()) {
      console.log('Service: Closing existing menu before opening new one.');
      this.isMenuOpen.set(false);
    }

    // Use setTimeout to ensure the close operation completes before opening new menu
    setTimeout(() => {
      // Update signals to trigger the effect for opening new menu
      this.activeComponent.set(menuComponent);
      this.menuPosition.set({ x, y });
      this.isMenuOpen.set(true);
      console.log('Service: Signals updated for new menu', { 
        isOpen: this.isMenuOpen(), 
        position: this.menuPosition(), 
        component: this.activeComponent() 
      });
    }, 0);
  }

  private actuallyOpenMenu(menuComponent: ContextMenu, x: number, y: number): void {
    console.log('Service: Actually opening menu at coordinates', { x, y, menuComponent });

    // Close any existing menu first
    if (this.currentOverlayRef) {
      this.actuallyCloseMenu();
    }

    const { template, viewContainerRef, onActionCallback } = menuComponent.getMenuData();

    const positionStrategy = this.overlay.position()
      .global()
      .left(`${x}px`)
      .top(`${y}px`);

    this.currentOverlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.close(),
      panelClass: 'context-menu-panel'
    });

    // Attach the portal to the overlay
    const portal = new TemplatePortal(template, viewContainerRef);
    this.currentOverlayRef.attach(portal);

    // Store the component reference for later interaction
    this.currentContextMenuComponent = menuComponent;

    console.log('Service: Context menu opened successfully at', { x, y });

    // Subscribe to backdrop clicks to close the menu
    this.currentOverlayRef.backdropClick()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        console.log('Service: Backdrop clicked. Closing current menu.');
        this.closeCurrentMenu();
      });

    // Handle ESC key to close the menu
    this.currentOverlayRef.keydownEvents()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        if (event.key === 'Escape') {
          console.log('Service: Escape key pressed. Closing current menu.');
          this.closeCurrentMenu();
        }
      });
  }

  private actuallyCloseMenu(): void {
    if (this.currentOverlayRef) {
      console.log('Service: Actually disposing current overlayRef.');
      try {
        this.currentOverlayRef.dispose();
      } catch (error) {
        console.warn('Service: Error disposing overlay:', error);
      }
      this.currentOverlayRef = null;
    }
    this.currentContextMenuComponent = null;
    
    // Reset signals to ensure clean state
    this.menuPosition.set(null);
    this.activeComponent.set(null);
    console.log('Service: Menu closed and signals reset.');
  }

  /**
   * Closes the currently open context menu using signals.
   */
  closeCurrentMenu(): void {
    console.log('Service: Request to close current menu.');
    this.isMenuOpen.set(false);
    this.menuPosition.set(null);
    this.activeComponent.set(null);
  }
}

@Component({
  selector: 'ContextMenu',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  template: `
    <ng-content></ng-content>

    <ng-template #menuContent>
      <div
        class="min-w-[8rem] overflow-hidden rounded-md border bg-white dark:bg-slate-800 p-1 text-slate-950 dark:text-slate-50 shadow-md z-50"
        (click)="$event.stopPropagation()"
        (contextmenu)="$event.preventDefault(); $event.stopPropagation()"
        role="menu"
      >
        @for (item of items; track item.label) {
          @if (!item.separator) {
            <div
              role="menuitem"
              [attr.aria-disabled]="item.disabled ? 'true' : null"
              class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 focus:bg-slate-100 dark:focus:bg-slate-700 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              [class.cursor-not-allowed]="item.disabled"
              [class.opacity-50]="item.disabled"
              (click)="!item.disabled && onAction(item)"
              (contextmenu)="$event.preventDefault(); $event.stopPropagation()"
              tabindex="0"
            >
              <span>{{ item.label }}</span>
              @if (item.shortcut) {
                <span class="ml-auto text-xs tracking-widest opacity-60">{{ item.shortcut }}</span>
              }
            </div>
          } @else {
            <div class="my-1 h-px bg-slate-200 dark:bg-slate-600"></div>
          }
        }
      </div>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
      cursor: context-menu;
    }
  `],
})
export class ContextMenu {
  @Input() items: IContextMenuItem[] = [];

  @ViewChild('menuContent') menuContent!: TemplateRef<any>;

  private viewContainerRef = inject(ViewContainerRef);
  private contextMenuService = inject(ContextMenuService);

  // Expose necessary data for the service to open the overlay
  getMenuData() {
    return {
      template: this.menuContent,
      viewContainerRef: this.viewContainerRef,
      onActionCallback: (item: IContextMenuItem) => this.onAction(item) // Pass a reference to the action handler
    };
  }

  @HostListener('contextmenu', ['$event'])
  onHostContextMenu(event: MouseEvent): void {
    console.log('ContextMenu Component: onHostContextMenu fired.', {
      target: event.target,
      clientX: event.clientX,
      clientY: event.clientY,
      component: this
    });

    event.preventDefault(); // Prevent default browser context menu
    event.stopPropagation(); // Stop event bubbling

    // Always request the service to open THIS menu instance at the event's coordinates
    // The service will handle closing any existing menu (including from this same component)
    this.contextMenuService.openContextMenu(this, event.clientX, event.clientY);
  }

  // Action handler, called when an item is clicked
  onAction(item: IContextMenuItem): void {
    console.log('ContextMenu Component: Action clicked:', item.label);
    if (item.action) {
      item.action(item);
    }
    // The service handles closing the menu globally
    this.contextMenuService.closeCurrentMenu();
  }
}