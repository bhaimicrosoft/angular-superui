import { Component, Input, signal, computed, HostBinding, HostListener, ElementRef, inject, OnInit, OnDestroy, afterNextRender, effect, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/**
 * Drawer component variants using Class Variance Authority (CVA)
 */
const drawerVariants = cva(
  // Base styles
  [
    'fixed inset-0 z-50 flex',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:duration-300 data-[state=open]:duration-500',
  ],
  {
    variants: {
      direction: {
        top: [
          'items-start justify-center',
          'data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top'
        ],
        bottom: [
          'items-end justify-center',
          'data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom'
        ],
        left: [
          'items-center justify-start',
          'data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left'
        ],
        right: [
          'items-center justify-end',
          'data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right'
        ]
      }
    },
    defaultVariants: {
      direction: 'bottom'
    }
  }
);

const drawerOverlayVariants = cva(
  // Base styles
  [
    'fixed inset-0 z-50 bg-black/80',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:duration-300 data-[state=open]:duration-500'
  ]
);

const drawerContentVariants = cva(
  // Base styles
  [
    'relative z-50 gap-4 bg-background border border-border shadow-lg',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:duration-300 data-[state=open]:duration-500',
    'focus-visible:outline-none'
  ],
  {
    variants: {
      direction: {
        top: [
          'w-full max-w-lg mx-auto rounded-b-lg',
          'data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top'
        ],
        bottom: [
          'w-full max-w-lg mx-auto rounded-t-lg',
          'data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom'
        ],
        left: [
          'h-full max-w-sm rounded-r-lg',
          'data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left'
        ],
        right: [
          'h-full max-w-sm rounded-l-lg',
          'data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right'
        ]
      },
      size: {
        sm: '',
        default: '',
        lg: '',
        xl: '',
        full: ''
      }
    },
    compoundVariants: [
      // Size variants for different directions
      {
        direction: ['left', 'right'],
        size: 'sm',
        class: 'max-w-xs'
      },
      {
        direction: ['left', 'right'],
        size: 'default',
        class: 'max-w-sm'
      },
      {
        direction: ['left', 'right'],
        size: 'lg',
        class: 'max-w-md'
      },
      {
        direction: ['left', 'right'],
        size: 'xl',
        class: 'max-w-lg'
      },
      {
        direction: ['left', 'right'],
        size: 'full',
        class: 'max-w-full w-full'
      },
      {
        direction: ['top', 'bottom'],
        size: 'sm',
        class: 'max-w-sm'
      },
      {
        direction: ['top', 'bottom'],
        size: 'default',
        class: 'max-w-lg'
      },
      {
        direction: ['top', 'bottom'],
        size: 'lg',
        class: 'max-w-xl'
      },
      {
        direction: ['top', 'bottom'],
        size: 'xl',
        class: 'max-w-2xl'
      },
      {
        direction: ['top', 'bottom'],
        size: 'full',
        class: 'max-w-full w-full'
      }
    ],
    defaultVariants: {
      direction: 'bottom',
      size: 'default'
    }
  }
);

const drawerHeaderVariants = cva(
  // Base styles
  [
    'flex flex-col space-y-1.5 p-6',
    'border-b border-border'
  ]
);

const drawerFooterVariants = cva(
  // Base styles
  [
    'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6',
    'border-t border-border'
  ]
);

const drawerTitleVariants = cva(
  // Base styles
  [
    'text-lg font-semibold text-foreground'
  ]
);

const drawerDescriptionVariants = cva(
  // Base styles
  [
    'text-sm text-muted-foreground'
  ]
);

export type DrawerVariant = VariantProps<typeof drawerVariants>;

/**
 * Drawer Component
 *
 * A slide-out panel that can appear from any side of the screen.
 * Perfect for navigation menus, settings panels, shopping carts, and detailed content views.
 * 
 * Features:
 * - Four directional slides: top, bottom, left, right
 * - Backdrop click to close (when dismissible is true)
 * - Keyboard accessibility (ESC key to close)
 * - Custom animations and transitions
 * - Flexible sizing options
 * - Signal-based reactivity
 */
@Component({
  selector: 'Drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen()) {
      <!-- Overlay -->
      <div 
        [class]="overlayClasses()"
        [attr.data-state]="isOpen() ? 'open' : 'closed'"
        (click)="onOverlayClick()"
        role="presentation"
        aria-hidden="true">
      </div>

      <!-- Content -->
      <div
        [class]="contentClasses()"
        [attr.data-state]="isOpen() ? 'open' : 'closed'"
        [attr.aria-labelledby]="titleId()"
        [attr.aria-describedby]="descriptionId()"
        role="dialog"
        aria-modal="true"
        tabindex="-1">
        <ng-content></ng-content>
      </div>
    }
  `
})
export class Drawer implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);

  /**
   * Whether the drawer is open
   */
  open = input(false);

  /**
   * Direction from which the drawer slides in
   */
  direction = input<VariantProps<typeof drawerVariants>['direction']>('bottom');

  /**
   * Size of the drawer
   */
  size = input<VariantProps<typeof drawerContentVariants>['size']>('default');

  /**
   * Whether clicking the overlay should close the drawer
   */
  dismissible = input(true);

  /**
   * Additional CSS classes for the drawer container
   */
  class = input('');

  /**
   * Additional CSS classes for the overlay
   */
  overlayClass = input('');

  /**
   * Additional CSS classes for the content
   */
  contentClass = input('');

  /**
   * Event emitted when the drawer is closed
   */
  openChange = output<boolean>();

  // Internal signals for IDs and state management
  protected _titleId = signal('');
  protected _descriptionId = signal('');
  protected _internalOpen = signal(false);

  // Host Bindings with computed signals
  @HostBinding('class') 
  get hostClasses() {
    // Only apply drawer classes when the drawer is open to prevent overlay blocking
    return this.isOpen() ? this.drawerClasses() : '';
  }

  @HostBinding('attr.data-state') 
  get hostDataState() {
    return this.isOpen() ? 'open' : 'closed';
  }

  // Host Listeners
  @HostListener('keydown.escape') onEscapeKey(): void {
    if (this.dismissible() && this.isOpen()) {
      this.close();
    }
  }

  /**
   * Computed signal for the actual open state (combines input and internal state)
   */
  isOpen = computed(() => this.open() || this._internalOpen());

  /**
   * Computed CSS classes for the drawer container
   */
  drawerClasses = computed(() => {
    return cn(
      drawerVariants({
        direction: this.direction()
      }),
      this.class()
    );
  });

  /**
   * Computed CSS classes for the overlay
   */
  overlayClasses = computed(() => {
    return cn(
      drawerOverlayVariants(),
      this.overlayClass()
    );
  });

  /**
   * Computed CSS classes for the content
   */
  contentClasses = computed(() => {
    return cn(
      drawerContentVariants({
        direction: this.direction(),
        size: this.size()
      }),
      this.contentClass()
    );
  });

  /**
   * Title ID for accessibility
   */
  titleId = computed(() => this._titleId());

  /**
   * Description ID for accessibility
   */
  descriptionId = computed(() => this._descriptionId());

  constructor() {
    // Generate unique IDs for accessibility
    afterNextRender(() => {
      const uniqueId = Math.random().toString(36).substr(2, 9);
      this._titleId.set(`drawer-title-${uniqueId}`);
      this._descriptionId.set(`drawer-description-${uniqueId}`);
    });

    // Effect to handle body scroll when drawer state changes
    effect(() => {
      if (this.isOpen()) {
        this.disableBodyScroll();
      } else {
        this.enableBodyScroll();
      }
    });
  }

  ngOnInit(): void {
    // Initial body scroll handling is now handled by the effect
  }

  ngOnDestroy(): void {
    this.enableBodyScroll();
  }

  /**
   * Handle overlay click
   */
  onOverlayClick(): void {
    if (this.dismissible()) {
      this.close();
    }
  }

  /**
   * Close the drawer
   */
  close(): void {
    this._internalOpen.set(false);
    this.openChange.emit(false);
  }

  /**
   * Open the drawer
   */
  openDrawer(): void {
    this._internalOpen.set(true);
    this.openChange.emit(true);
  }

  /**
   * Toggle the drawer open/closed state
   */
  toggle(): void {
    const newState = !this._internalOpen();
    this._internalOpen.set(newState);
    this.openChange.emit(newState);
  }

  /**
   * Disable body scroll when drawer is open
   */
  private disableBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  /**
   * Enable body scroll when drawer is closed
   */
  private enableBodyScroll(): void {
    document.body.style.overflow = '';
  }

  /**
   * Set the title ID for accessibility
   */
  setTitleId(id: string): void {
    this._titleId.set(id);
  }

  /**
   * Set the description ID for accessibility
   */
  setDescriptionId(id: string): void {
    this._descriptionId.set(id);
  }
}

/**
 * Drawer Header Component
 *
 * Container for drawer title and description.
 */
@Component({
  selector: 'DrawerHeader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="headerClasses()">
      <ng-content></ng-content>
    </div>
  `
})
export class DrawerHeader {
  /**
   * Additional CSS classes
   */
  class = input('');

  /**
   * Computed CSS classes
   */
  headerClasses = computed(() => {
    return cn(
      drawerHeaderVariants(),
      this.class()
    );
  });
}

/**
 * Drawer Footer Component
 *
 * Container for drawer actions and buttons.
 */
@Component({
  selector: 'DrawerFooter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="footerClasses()">
      <ng-content></ng-content>
    </div>
  `
})
export class DrawerFooter {
  /**
   * Additional CSS classes
   */
  class = input('');

  /**
   * Computed CSS classes
   */
  footerClasses = computed(() => {
    return cn(
      drawerFooterVariants(),
      this.class()
    );
  });
}

/**
 * Drawer Title Component
 *
 * Accessible title for the drawer.
 */
@Component({
  selector: 'DrawerTitle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 [class]="titleClasses()" [id]="titleId()">
      <ng-content></ng-content>
    </h2>
  `
})
export class DrawerTitle implements OnInit {
  private drawer?: Drawer;
  private elementRef = inject(ElementRef);

  /**
   * Additional CSS classes
   */
  class = input('');

  /**
   * Title ID for accessibility
   */
  protected _titleId = signal('');

  /**
   * Computed CSS classes
   */
  titleClasses = computed(() => {
    return cn(
      drawerTitleVariants(),
      this.class()
    );
  });

  /**
   * Title ID getter
   */
  titleId = computed(() => this._titleId());

  constructor() {
    afterNextRender(() => {
      const uniqueId = Math.random().toString(36).substr(2, 9);
      this._titleId.set(`drawer-title-${uniqueId}`);
    });
  }

  ngOnInit(): void {
    // Try to find the parent drawer and set the title ID
    const element = this.elementRef.nativeElement;
    const drawerElement = element.closest('Drawer');
    if (drawerElement) {
      // Access the component instance if available
      const drawerComponent = (drawerElement as any)?.componentInstance;
      if (drawerComponent && drawerComponent.setTitleId) {
        drawerComponent.setTitleId(this.titleId());
      }
    }
  }
}

/**
 * Drawer Description Component
 *
 * Accessible description for the drawer.
 */
@Component({
  selector: 'DrawerDescription',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p [class]="descriptionClasses()" [id]="descriptionId()">
      <ng-content></ng-content>
    </p>
  `
})
export class DrawerDescription implements OnInit {
  private drawer?: Drawer;
  private elementRef = inject(ElementRef);

  /**
   * Additional CSS classes
   */
  class = input('');

  /**
   * Description ID for accessibility
   */
  protected _descriptionId = signal('');

  /**
   * Computed CSS classes
   */
  descriptionClasses = computed(() => {
    return cn(
      drawerDescriptionVariants(),
      this.class()
    );
  });

  /**
   * Description ID getter
   */
  descriptionId = computed(() => this._descriptionId());

  constructor() {
    afterNextRender(() => {
      const uniqueId = Math.random().toString(36).substr(2, 9);
      this._descriptionId.set(`drawer-description-${uniqueId}`);
    });
  }

  ngOnInit(): void {
    // Try to find the parent drawer and set the description ID
    const element = this.elementRef.nativeElement;
    const drawerElement = element.closest('Drawer');
    if (drawerElement) {
      // Access the component instance if available
      const drawerComponent = (drawerElement as any)?.componentInstance;
      if (drawerComponent && drawerComponent.setDescriptionId) {
        drawerComponent.setDescriptionId(this.descriptionId());
      }
    }
  }
}
