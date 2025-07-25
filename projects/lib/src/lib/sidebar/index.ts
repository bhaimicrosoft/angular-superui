import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  NgZone,
  OnDestroy,
  OnInit,
  output,
  PLATFORM_ID,
  Renderer2,
  signal,
  ViewChild
} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {RouterLink} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {A11yModule} from '@angular/cdk/a11y';
import {OverlayModule} from '@angular/cdk/overlay';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {cva} from 'class-variance-authority';
import {cn} from '../utils/cn';

/**
 * Sidebar width mappings
 */
const SIDEBAR_WIDTHS = {
  sm: '16rem',     // 256px
  md: '20rem',     // 320px
  lg: '24rem',     // 384px
  xl: '28rem',     // 448px
  icon: '4rem',    // 64px - icon only mode
  collapsed: '0rem' // 0px - collapsed
} as const;

/**
 * Angular animations for smooth sidebar transitions
 */
const sidebarAnimations = [
  // Main sidebar width animation for push mode
  trigger('sidebarWidth', [
    state('collapsed', style({ width: '0px', minWidth: '0px', opacity: '0' })),
    state('sm', style({ width: '16rem', minWidth: '16rem', opacity: '1' })),
    state('md', style({ width: '20rem', minWidth: '20rem', opacity: '1' })),
    state('lg', style({ width: '24rem', minWidth: '24rem', opacity: '1' })),
    state('xl', style({ width: '28rem', minWidth: '28rem', opacity: '1' })),
    state('icon', style({ width: '4rem', minWidth: '4rem', opacity: '1' })),
    transition('* => *', [
      animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
    ])
  ]),
  
  // Overlay positioning animation
  trigger('overlaySlide', [
    state('hiddenLeft', style({ transform: 'translateX(-100%)', opacity: '0' })),
    state('hiddenRight', style({ transform: 'translateX(100%)', opacity: '0' })),
    state('visible', style({ transform: 'translateX(0)', opacity: '1' })),
    transition('* => *', [
      animate('350ms cubic-bezier(0.25, 0.8, 0.25, 1)')
    ])
  ]),
  
  // Backdrop fade animation
  trigger('backdropFade', [
    state('hidden', style({ opacity: '0', pointerEvents: 'none' })),
    state('visible', style({ opacity: '1', pointerEvents: 'auto' })),
    transition('* => *', [
      animate('300ms ease-in-out')
    ])
  ]),
  
  // Content animation for smooth transitions
  trigger('contentSlide', [
    transition('* => *', [
      animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
    ])
  ])
];

/**
 * Individual Sidebar component variants using CVA
 */
const sidebarVariants = cva(
  [
    'group flex flex-col bg-background border-border h-full',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
    'relative z-10',
    'shadow-sm',
    'dark:bg-background dark:border-border',
  ],
  {
    variants: {
      side: {
        left: 'border-r order-1',
        right: 'border-l order-3',
      },
      mode: {
        push: 'h-full',
        overlay: 'fixed inset-y-0 z-50 h-screen shadow-xl border-0',
      },
      state: {
        expanded: '',
        collapsed: 'w-0 min-w-0 border-0 overflow-hidden opacity-0',
        iconOnly: '',
      },
      size: {
        sm: 'w-64',
        md: 'w-80',
        lg: 'w-96',
        xl: 'w-[28rem]',
        icon: 'w-16',
      },
    },
    compoundVariants: [
      // Push mode - collapsed state (width overrides)
      {
        mode: 'push',
        state: 'collapsed',
        class: 'w-0 min-w-0 border-0 overflow-hidden opacity-0',
      },
      // Push mode - expanded state (restore normal width based on size)
      {
        mode: 'push',
        state: 'expanded',
        size: 'sm',
        class: 'w-64',
      },
      {
        mode: 'push',
        state: 'expanded',
        size: 'md',
        class: 'w-80',
      },
      {
        mode: 'push',
        state: 'expanded',
        size: 'lg',
        class: 'w-96',
      },
      {
        mode: 'push',
        state: 'expanded',
        size: 'xl',
        class: 'w-[28rem]',
      },
      // Push mode - icon only state
      {
        mode: 'push',
        state: 'iconOnly',
        class: 'w-16',
      },
      // Overlay mode - all sizes with proper width
      {
        mode: 'overlay',
        size: 'sm',
        class: 'w-64',
      },
      {
        mode: 'overlay',
        size: 'md',
        class: 'w-80',
      },
      {
        mode: 'overlay',
        size: 'lg',
        class: 'w-96',
      },
      {
        mode: 'overlay',
        size: 'xl',
        class: 'w-[28rem]',
      },
      {
        mode: 'overlay',
        size: 'icon',
        class: 'w-16',
      },
      // Overlay mode positioning for collapsed state
      {
        mode: 'overlay',
        side: 'left',
        state: 'collapsed',
        class: 'left-0 -translate-x-full opacity-0 pointer-events-none',
      },
      {
        mode: 'overlay',
        side: 'right',
        state: 'collapsed',
        class: 'right-0 translate-x-full opacity-0 pointer-events-none',
      },
      // Overlay mode positioning for expanded/iconOnly
      {
        mode: 'overlay',
        side: 'left',
        state: 'expanded',
        class: 'left-0 translate-x-0 opacity-100',
      },
      {
        mode: 'overlay',
        side: 'left',
        state: 'iconOnly',
        class: 'left-0 translate-x-0 opacity-100',
      },
      {
        mode: 'overlay',
        side: 'right',
        state: 'expanded',
        class: 'right-0 translate-x-0 opacity-100',
      },
      {
        mode: 'overlay',
        side: 'right',
        state: 'iconOnly',
        class: 'right-0 translate-x-0 opacity-100',
      },
    ],
    defaultVariants: {
      side: 'left',
      mode: 'push',
      state: 'expanded',
      size: 'md',
    },
  }
);

const backdropVariants = cva([
  'fixed inset-0 bg-black/50 backdrop-blur-sm z-40',
  'dark:bg-black/70',
]);

/**
 * Sidebar state interface
 */
export interface SidebarState {
  isExpanded: boolean;
  isIconOnly: boolean;
  isMobile: boolean;
  mode: 'push' | 'overlay';
  side: 'left' | 'right';
  size: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Sidebar Layout Component - Main container that manages sidebar positioning and main content
 */
@Component({
  selector: 'SidebarLayout',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="layoutClasses()" [attr.data-layout]="'sidebar-layout'">
      <ng-content></ng-content>
    </div>
  `,
})
export class SidebarLayout {
  readonly customClass = input<string>('');

  readonly layoutClasses = computed(() => {
    return cn(
      'flex h-screen bg-background',
      'transition-all duration-300 ease-in-out',
      this.customClass()
    );
  });
}

/**
 * Sidebar Main Content Component - Auto-adjusting content area
 */
@Component({
  selector: 'SidebarMainContent',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main [class]="contentClasses()" role="main">
      <ng-content></ng-content>
    </main>
  `,
})
export class SidebarMainContent {
  readonly customClass = input<string>('');

  readonly contentClasses = computed(() => {
    return cn(
      'flex-1 overflow-auto',
      'transition-all duration-300 ease-in-out',
      'min-w-0', // Prevents flex item from growing beyond container
      this.customClass()
    );
  });
}

/**
 * Sidebar Container Component - Main wrapper that handles flex layout and positioning
 * This is the primary component users should use to create sidebar layouts
 */
@Component({
  selector: 'SidebarContainer',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClasses()" [attr.data-sidebar-container]="'true'">
      <ng-content></ng-content>
    </div>
  `,
})
export class SidebarContainer {
  readonly customClass = input<string>('');
  readonly height = input<string>('h-screen');

  readonly containerClasses = computed(() => {
    return cn(
      'flex bg-background',
      this.height(),
      'transition-all duration-300 ease-in-out',
      this.customClass()
    );
  });
}

/**
 * Individual Sidebar Component
 * A standalone sidebar that can be positioned and configured independently
 */
@Component({
  selector: 'Sidebar',
  standalone: true,
  imports: [CommonModule, A11yModule, OverlayModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: sidebarAnimations,
  template: `
    <!-- Backdrop for overlay mode -->
    @if (effectiveMode() === 'overlay') {
      <div
        [class]="backdropClasses()"
        [@backdropFade]="backdropAnimationState()"
        (click)="onBackdropClick()"
        [attr.aria-hidden]="true"
        role="presentation"
      ></div>
    }

    <!-- Sidebar -->
    <aside
      #sidebarRef
      [class]="sidebarClasses()"
      [@sidebarWidth]="effectiveMode() === 'push' ? widthAnimationState() : null"
      [@overlaySlide]="effectiveMode() === 'overlay' ? overlayAnimationState() : null"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-expanded]="isExpandedComputed()"
      [attr.data-state]="currentState()"
      [attr.data-side]="side()"
      [attr.data-mode]="effectiveMode()"
      [attr.data-size]="currentSize()"
      role="complementary"
      tabindex="-1"
      cdkTrapFocus
      [cdkTrapFocusAutoCapture]="shouldTrapFocus()"
    >
      <!-- Sidebar Header (Sticky) -->
      <div [class]="headerClasses()" role="banner">
        <ng-content select="[slot=sidebar-header]"></ng-content>
      </div>

      <!-- Sidebar Content (Scrollable) -->
      <nav [class]="contentClasses()" role="navigation" [attr.aria-label]="ariaLabel() + ' navigation'">
        <ng-content select="[slot=sidebar-content]"></ng-content>
      </nav>

      <!-- Sidebar Footer (Sticky) -->
      <div [class]="footerClasses()" role="contentinfo">
        <ng-content select="[slot=sidebar-footer]"></ng-content>
      </div>
    </aside>
  `,
})
export class Sidebar implements OnInit, OnDestroy {
  @ViewChild('sidebarRef', {static: true}) sidebarRef!: ElementRef;
  // Input signals
  readonly side = input<'left' | 'right'>('left');
  readonly mode = input<'push' | 'overlay'>('push');
  readonly size = input<'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly defaultExpanded = input<boolean>(true);
  readonly isExpanded = input<boolean | undefined>(undefined); // External control
  readonly allowCollapse = input<boolean>(true);
  readonly allowIconOnly = input<boolean>(true);
  readonly showBackdropInOverlay = input<boolean>(true);
  readonly closeOnBackdropClick = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);
  readonly preventBodyScroll = input<boolean>(true);
  readonly mobileBreakpoint = input<number>(768);
  readonly ariaLabel = input<string>('Navigation sidebar');
  readonly customClass = input<string>('');
  readonly headerCustomClass = input<string>('');
  readonly contentCustomClass = input<string>('');
  readonly footerCustomClass = input<string>('');
  // Output signals
  readonly onExpandedChange = output<boolean>();
  readonly onStateChange = output<SidebarState>();
  readonly currentState = computed(() => {
    if (!this.isExpandedComputed() && !this.isIconOnly()) return 'collapsed';
    if (this.isIconOnly()) return 'iconOnly';
    return 'expanded';
  });
  readonly currentSize = computed(() => {
    return this.isIconOnly() ? 'icon' : this.size();
  });
  // Mobile responsive computed properties
  readonly effectiveMode = computed(() => {
    // Force overlay mode on mobile
    return this.isMobile() ? 'overlay' : this.mode();
  });
  readonly showBackdrop = computed(() => {
    return this.showBackdropInOverlay() &&
      this.effectiveMode() === 'overlay' &&
      this.isExpandedComputed();
  });
  readonly shouldTrapFocus = computed(() => {
    return this.effectiveMode() === 'overlay' && this.isExpandedComputed();
  });
  readonly canUseIconOnly = computed(() => {
    // Disable icon-only mode on mobile
    return this.allowIconOnly() && !this.isMobile();
  });

  // Animation state computations
  readonly widthAnimationState = computed(() => {
    if (!this.isExpandedComputed() && !this.isIconOnly()) return 'collapsed';
    return this.currentSize();
  });

  readonly overlayAnimationState = computed(() => {
    if (this.effectiveMode() !== 'overlay') return 'visible';
    
    if (!this.isExpandedComputed() && !this.isIconOnly()) {
      return this.side() === 'left' ? 'hiddenLeft' : 'hiddenRight';
    }
    return 'visible';
  });

  readonly backdropAnimationState = computed(() => {
    return this.showBackdrop() ? 'visible' : 'hidden';
  });

  // CSS class computations
  readonly sidebarClasses = computed(() => {
    return cn(sidebarVariants({
      side: this.side(),
      mode: this.effectiveMode(),
      state: this.currentState(),
      size: this.currentSize(),
    }), this.customClass());
  });
  readonly headerClasses = computed(() => {
    return cn(
      'flex-shrink-0 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
      'dark:border-border dark:bg-background',
      'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
      this.headerCustomClass()
    );
  });
  readonly contentClasses = computed(() => {
    return cn(
      'flex-1 overflow-y-auto overflow-x-hidden',
      'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border',
      'dark:scrollbar-thumb-border',
      'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
      this.contentCustomClass()
    );
  });
  readonly footerClasses = computed(() => {
    return cn(
      'flex-shrink-0 border-t border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
      'dark:border-border dark:bg-background',
      'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
      this.footerCustomClass()
    );
  });
  readonly backdropClasses = computed(() => {
    return cn(backdropVariants());
  });
  private platformId = inject(PLATFORM_ID);
  private renderer = inject(Renderer2);
  private ngZone = inject(NgZone);
  private elementRef = inject(ElementRef);
  // Internal state signals
  private readonly _isExpanded = signal<boolean>(true);
  // Computed state
  readonly isExpandedComputed = computed(() => {
    // External control takes precedence over internal state
    return this.isExpanded() !== undefined ? this.isExpanded() : this._isExpanded();
  });
  private readonly _isIconOnly = signal<boolean>(false);
  readonly isIconOnly = computed(() => this._isIconOnly());
  private readonly _isMobile = signal<boolean>(false);
  readonly isMobile = computed(() => this._isMobile());
  // Media query listener
  private mediaQueryList?: MediaQueryList;
  private resizeHandler?: () => void;

  constructor() {
    // Initialize default state
    effect(() => {
      if (this.isExpanded() !== undefined) {
        this._isExpanded.set(this.isExpanded()!);
      } else {
        this._isExpanded.set(this.defaultExpanded());
      }
    });

    // Handle mobile state changes
    effect(() => {
      if (this.isMobile()) {
        // On mobile, disable icon-only mode and collapse if in overlay mode
        this._isIconOnly.set(false);
        if (this.effectiveMode() === 'overlay' && this.isExpandedComputed()) {
          // Auto-collapse on mobile overlay mode for better UX
          this.collapse();
        }
      }
    });

    // Body scroll lock for overlay mode
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const shouldLockScroll = this.preventBodyScroll() &&
          this.effectiveMode() === 'overlay' &&
          this.isExpandedComputed() &&
          !this.isIconOnly();

        if (shouldLockScroll) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      });
    }

    // Emit state changes
    effect(() => {
      const state: SidebarState = {
        isExpanded: this.isExpandedComputed() ?? false,
        isIconOnly: this.isIconOnly(),
        isMobile: this.isMobile(),
        mode: this.mode(),
        side: this.side(),
        size: this.size(),
      };
      this.onStateChange.emit(state);
    });

    // Setup after render
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        this.setupMediaQuery();
      });
    }
  }

  ngOnInit() {
    // Initialization handled in constructor
  }

  ngOnDestroy() {
    this.cleanup();
  }

  // Public API methods
  expand() {
    this._isExpanded.set(true);
    this._isIconOnly.set(false);
    this.onExpandedChange.emit(true);
  }

  collapse() {
    this._isExpanded.set(false);
    this._isIconOnly.set(false);
    this.onExpandedChange.emit(false);
  }

  toggleExpanded() {
    if (this.isExpandedComputed()) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  setIconOnly() {
    if (!this.canUseIconOnly()) return;

    this._isExpanded.set(true);
    this._isIconOnly.set(true);
    this.onExpandedChange.emit(true);
  }

  toggleIconOnly() {
    if (this.isIconOnly()) {
      this.expand();
    } else {
      this.setIconOnly();
    }
  }

  // Event handlers
  onBackdropClick() {
    if (this.closeOnBackdropClick()) {
      this.collapse();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (this.closeOnEscape() && this.effectiveMode() === 'overlay' && this.isExpandedComputed()) {
      keyboardEvent.preventDefault();
      this.collapse();
    }
  }

  // Private methods
  private setupMediaQuery() {
    const mediaQuery = `(max-width: ${this.mobileBreakpoint()}px)`;
    this.mediaQueryList = window.matchMedia(mediaQuery);

    // Set initial state
    this._isMobile.set(this.mediaQueryList.matches);

    // Listen for changes
    const listener = (e: MediaQueryListEvent) => {
      this.ngZone.run(() => {
        this._isMobile.set(e.matches);

        // Auto-collapse on mobile if overlay mode
        if (e.matches && this.effectiveMode() === 'overlay' && this.isExpandedComputed()) {
          this.collapse();
        }
      });
    };

    this.mediaQueryList.addEventListener('change', listener);
    this.resizeHandler = listener as any;
  }

  private cleanup() {
    if (this.mediaQueryList && this.resizeHandler) {
      this.mediaQueryList.removeEventListener('change', this.resizeHandler);
    }

    // Restore body scroll
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }
}

/**
 * Sidebar Header Component
 */
@Component({
  selector: 'SidebarHeader',
  standalone: true,
  imports: [CommonModule],
  host: {
    'slot': 'sidebar-header'
  },
  template: `
    <div [class]="headerClasses()">
      <ng-content></ng-content>
    </div>
  `,
})
export class SidebarHeader {
  readonly customClass = input<string>('');

  readonly headerClasses = computed(() => {
    return cn(
      'p-4',
      'border-b border-border/50',
      'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
      'dark:border-border dark:bg-background',
      'transition-colors duration-200',
      this.customClass()
    );
  });
}

/**
 * Sidebar Content Component
 */
@Component({
  selector: 'SidebarContent',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="contentClasses()" slot="sidebar-content">
      <ng-content></ng-content>
    </div>
  `,
})
export class SidebarContent {
  readonly customClass = input<string>('');

  readonly contentClasses = computed(() => {
    return cn(
      'p-4 space-y-2',
      'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border/30',
      'hover:scrollbar-thumb-border/50',
      'dark:scrollbar-thumb-border/30 dark:hover:scrollbar-thumb-border/50',
      'transition-colors duration-200',
      this.customClass()
    );
  });
}

/**
 * Sidebar Footer Component
 */
@Component({
  selector: 'SidebarFooter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="footerClasses()" slot="sidebar-footer">
      <ng-content></ng-content>
    </div>
  `,
})
export class SidebarFooter {
  readonly customClass = input<string>('');

  readonly footerClasses = computed(() => {
    return cn(
      'p-4',
      'border-t border-border/50',
      'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
      'dark:border-border dark:bg-background',
      'transition-colors duration-200',
      this.customClass()
    );
  });
}

/**
 * Sidebar Navigation Item Component
 */
@Component({
  selector: 'SidebarNavItem',
  standalone: true,
  imports: [CommonModule],
  hostDirectives: [
    {
      directive: RouterLink,
      inputs: ['routerLink: routerLink']
    }
  ],
  animations: [
    trigger('labelSlide', [
      state('visible', style({ opacity: 1, width: '*', overflow: 'visible' })),
      state('hidden', style({ opacity: 0, width: '0px', overflow: 'hidden' })),
      transition('visible <=> hidden', [
        animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)')
      ])
    ]),
    trigger('childrenSlide', [
      state('expanded', style({ height: '*', opacity: 1 })),
      state('collapsed', style({ height: '0px', opacity: 0 })),
      transition('expanded <=> collapsed', [
        animate('250ms ease-in-out')
      ])
    ])
  ],
  template: `
    <a
      [class]="itemClasses()"
      [attr.aria-current]="isActive() ? 'page' : null"
      [attr.aria-expanded]="hasChildren() ? isExpanded() : null"
      [attr.aria-label]="getAriaLabel()"
      [attr.title]="showTooltip() ? label() : null"
      role="menuitem"
      tabindex="0"
      (click)="onItemClick($event)"
      (keydown.enter)="onItemClick($event)"
      (keydown.space)="onItemClick($event)"
    >
      @if (icon()) {
        <span
          class="flex-shrink-0 flex items-center justify-center w-5 h-5"
          [innerHTML]="sanitizedIcon()"
          aria-hidden="true">
        </span>
      }

      @if (showLabel()) {
        <span 
          class="flex-1 truncate text-sm font-medium"
          [@labelSlide]="showLabel() ? 'visible' : 'hidden'"
        >{{ label() }}</span>
      }

      @if (badge() && showLabel()) {
        <span 
          [class]="badgeClasses()" 
          [attr.aria-label]="'Badge: ' + badge()"
          [@labelSlide]="showLabel() ? 'visible' : 'hidden'"
        >{{ badge() }}</span>
      }

      @if (hasChildren() && showLabel()) {
        <svg
          class="w-4 h-4 flex-shrink-0 transition-transform duration-200"
          [class.rotate-90]="isExpanded()"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          [@labelSlide]="showLabel() ? 'visible' : 'hidden'"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      }
    </a>

    @if (hasChildren() && showLabel()) {
      <div 
        class="ml-6 mt-1 space-y-1 overflow-hidden" 
        role="menu" 
        [attr.aria-label]="label() + ' submenu'"
        [@childrenSlide]="isExpanded() ? 'expanded' : 'collapsed'"
      >
        <ng-content></ng-content>
      </div>
    }
  `,
})
export class SidebarNavItem {
  // Input signals
  readonly routerLink = input<string | any[] | null>(null);
  readonly label = input<string>('');
  readonly icon = input<string>('');
  readonly badge = input<string>('');
  readonly isActive = input<boolean>(false);
  readonly hasChildren = input<boolean>(false);
  readonly isIconOnly = input<boolean>(false);
  readonly customClass = input<string>('');
  readonly badgeCustomClass = input<string>('');
  // Output signals
  readonly onClick = output<Event>();
  readonly showLabel = computed(() => !this.isIconOnly());
  readonly showTooltip = computed(() => this.isIconOnly() && this.label());
  // CSS classes
  readonly itemClasses = computed(() =>
    cn(
      'group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
      'text-muted-foreground hover:text-foreground',
      'dark:hover:bg-accent/80 dark:hover:text-accent-foreground',
      'active:scale-[0.98] transform transition-transform',
      {
        'bg-accent text-accent-foreground dark:bg-accent/80': this.isActive(),
        'justify-center px-2': this.isIconOnly(),
        'cursor-pointer': !this.routerLink() || this.hasChildren(),
      },
      this.customClass()
    )
  );
  readonly badgeClasses = computed(() =>
    cn(
      'inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full',
      'bg-primary text-primary-foreground min-w-[1.25rem] h-5',
      'dark:bg-primary/90 dark:text-primary-foreground',
      'shadow-sm',
      this.badgeCustomClass()
    )
  );
  private sanitizer = inject(DomSanitizer);
  // Sanitized icon HTML
  readonly sanitizedIcon = computed(() => {
    const iconHtml = this.icon();
    return iconHtml ? this.sanitizer.bypassSecurityTrustHtml(iconHtml) : '';
  });
  // Internal state
  private readonly _isExpanded = signal<boolean>(false);
  readonly isExpanded = computed(() => this._isExpanded());

  // Methods
  getAriaLabel(): string {
    let label = this.label();
    if (this.isActive()) {
      label += ' (current page)';
    }
    if (this.hasChildren()) {
      label += this.isExpanded() ? ' (expanded)' : ' (collapsed)';
    }
    if (this.badge()) {
      label += ` (${this.badge()} items)`;
    }
    return label;
  }

  onItemClick(event: Event) {
    if (this.hasChildren()) {
      event.preventDefault();
      this._isExpanded.update(expanded => !expanded);
    } else if (!this.routerLink()) {
      // If no routerLink is provided, prevent default navigation
      event.preventDefault();
    }
    this.onClick.emit(event);
  }
}

/**
 * Sidebar Navigation Group Component
 */
@Component({
  selector: 'SidebarNavGroup',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('titleFade', [
      state('visible', style({ opacity: 1, height: '*', marginBottom: '*' })),
      state('hidden', style({ opacity: 0, height: '0px', marginBottom: '0px' })),
      transition('visible <=> hidden', [
        animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)')
      ])
    ])
  ],
  template: `
    <div [class]="groupClasses()" role="group" [attr.aria-labelledby]="groupId">
      @if (title() && !isIconOnly()) {
        <h3
          [id]="groupId"
          [class]="titleClasses()"
          role="heading"
          aria-level="3"
          [@titleFade]="title() && !isIconOnly() ? 'visible' : 'hidden'"
        >
          {{ title() }}
        </h3>
      }
      <div class="space-y-1" role="menu" [attr.aria-label]="title() || 'Navigation group'">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class SidebarNavGroup {
  readonly title = input<string>('');
  readonly isIconOnly = input<boolean>(false);
  readonly customClass = input<string>('');
  readonly titleCustomClass = input<string>('');

  readonly groupId = `sidebar-group-${Math.random().toString(36).substr(2, 9)}`;

  readonly groupClasses = computed(() => {
    return cn(
      'space-y-1',
      'transition-all duration-200',
      this.customClass()
    );
  });

  readonly titleClasses = computed(() => {
    return cn(
      'px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider',
      'dark:text-muted-foreground',
      'select-none',
      this.titleCustomClass()
    );
  });
}

/**
 * Sidebar Trigger Component (External Button)
 */
@Component({
  selector: 'SidebarTrigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [class]="triggerClasses()"
      (click)="onTriggerClick()"
      [attr.aria-label]="getAriaLabel()"
      [attr.aria-expanded]="isExpanded()"
      [attr.title]="getAriaLabel()"
    >
      @if (showIcon()) {
        <svg
          class="w-5 h-5 transition-transform duration-200"
          [class.rotate-180]="isExpanded()"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      }

      @if (showLabel()) {
        <span class="ml-2 text-sm font-medium">{{ label() }}</span>
      }
    </button>
  `,
})
export class SidebarTrigger {
  // Input signals
  readonly label = input<string>('');
  readonly showIcon = input<boolean>(true);
  readonly showLabel = input<boolean>(false);
  readonly isExpanded = input<boolean>(false);
  readonly variant = input<'default' | 'outline' | 'ghost'>('outline');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly customClass = input<string>('');

  // Output signals
  readonly onTrigger = output<void>();

  // CSS classes
  readonly triggerClasses = computed(() => {
    const baseClasses = [
      'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
      'disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
      'active:scale-95 transform',
    ];

    const variantClasses = {
      default: [
        'bg-primary text-primary-foreground shadow-sm',
        'hover:bg-primary/90',
        'dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90'
      ],
      outline: [
        'border border-input bg-background shadow-sm',
        'hover:bg-accent hover:text-accent-foreground',
        'dark:border-input dark:bg-background dark:hover:bg-accent/80'
      ],
      ghost: [
        'hover:bg-accent hover:text-accent-foreground',
        'dark:hover:bg-accent/80 dark:hover:text-accent-foreground'
      ],
    };

    const sizeClasses = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-9 px-4 py-2',
      lg: 'h-10 px-8',
    };

    return cn(
      baseClasses,
      variantClasses[this.variant()],
      sizeClasses[this.size()],
      this.customClass()
    );
  });

  // Methods
  onTriggerClick() {
    this.onTrigger.emit();
  }

  getAriaLabel(): string {
    if (this.label()) {
      return this.label();
    }
    return this.isExpanded() ? 'Close sidebar' : 'Open sidebar';
  }
}

// Export main components  
export { Sidebar as default };
