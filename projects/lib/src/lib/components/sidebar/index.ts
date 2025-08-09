import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  Injectable,
  InjectionToken,
  input,
  NgZone,
  OnDestroy,
  OnInit,
  AfterViewInit,
  output,
  PLATFORM_ID,
  Renderer2,
  signal,
  ViewChild,
  WritableSignal,
  Type,
  TemplateRef,
  ViewContainerRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injector,
  runInInjectionContext
} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {RouterLink} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {A11yModule} from '@angular/cdk/a11y';
import {OverlayModule, ConnectedPosition} from '@angular/cdk/overlay';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {cva} from 'class-variance-authority';
import { cn, lucideToSvg } from '@lib/utils/cn';
import { LucideIconData } from 'lucide-angular';

/**
 * Service to manage sidebar instances and enable triggers to find them by ID
 */
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarInstances = new Map<string, Sidebar>();

  registerSidebar(id: string, sidebar: Sidebar) {
    if (id) {
      this.sidebarInstances.set(id, sidebar);
    }
  }

  unregisterSidebar(id: string) {
    if (id) {
      this.sidebarInstances.delete(id);
    }
  }

  getSidebar(id: string): Sidebar | undefined {
    return this.sidebarInstances.get(id);
  }

  toggleSidebar(id: string): boolean {
    const sidebar = this.getSidebar(id);
    if (sidebar) {
      sidebar.toggleExpanded();
      return true;
    }
    return false;
  }

  cycleSidebarState(id: string): boolean {
    const sidebar = this.getSidebar(id);
    if (sidebar) {
      sidebar.cycleSidebarState();
      return true;
    }
    return false;
  }

  setIconOnly(id: string): boolean {
    const sidebar = this.getSidebar(id);
    if (sidebar) {
      sidebar.setIconOnly();
      return true;
    }
    return false;
  }

  getAllSidebars(): Sidebar[] {
    return Array.from(this.sidebarInstances.values());
  }
}

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
 * Angular animations for buttery smooth sidebar transitions
 * Optimized for GPU acceleration and consistent timing
 */
const sidebarAnimations = [
  // Main sidebar width animation for push mode
  trigger('sidebarWidth', [
    state('collapsed', style({
      width: '0px',
      minWidth: '0px',
      opacity: '0',
      willChange: 'width, min-width, opacity'
    })),
    state('sm', style({
      width: '16rem',
      minWidth: '16rem',
      opacity: '1',
      willChange: 'auto'
    })),
    state('md', style({
      width: '20rem',
      minWidth: '20rem',
      opacity: '1',
      willChange: 'auto'
    })),
    state('lg', style({
      width: '24rem',
      minWidth: '24rem',
      opacity: '1',
      willChange: 'auto'
    })),
    state('xl', style({
      width: '28rem',
      minWidth: '28rem',
      opacity: '1',
      willChange: 'auto'
    })),
    state('icon', style({
      width: '4rem',
      minWidth: '4rem',
      opacity: '1',
      willChange: 'auto'
    })),
    transition('* => *', [
      animate('320ms cubic-bezier(0.4, 0.0, 0.2, 1)')
    ])
  ]),

  // Overlay positioning animation - GPU accelerated
  trigger('overlaySlide', [
    state('hiddenLeft', style({
      transform: 'translateX(-100%) translateZ(0)',
      opacity: '0',
      willChange: 'transform, opacity'
    })),
    state('hiddenRight', style({
      transform: 'translateX(100%) translateZ(0)',
      opacity: '0',
      willChange: 'transform, opacity'
    })),
    state('visible', style({
      transform: 'translateX(0) translateZ(0)',
      opacity: '1',
      willChange: 'auto'
    })),
    transition('* => *', [
      animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
    ])
  ]),

  // Backdrop fade animation - optimized for smooth fade
  trigger('backdropFade', [
    state('hidden', style({
      opacity: '0',
      pointerEvents: 'none',
      willChange: 'opacity'
    })),
    state('visible', style({
      opacity: '1',
      pointerEvents: 'auto',
      willChange: 'auto'
    })),
    transition('* => *', [
      animate('250ms cubic-bezier(0.4, 0.0, 0.2, 1)')
    ])
  ]),

  // Content animation for smooth transitions
  trigger('contentSlide', [
    transition('* => *', [
      animate('320ms cubic-bezier(0.4, 0.0, 0.2, 1)')
    ])
  ])
];

/**
 * Individual Sidebar component variants using CVA
 * Optimized for smooth Angular animations
 */
const sidebarVariants = cva(
  [
    'group flex flex-col bg-background border-border h-full',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
    'relative z-10',
    'shadow-sm',
    'dark:bg-background dark:border-border',
    // Optimize for GPU acceleration and smooth animations
    'transform-gpu will-change-auto',
    // Prevent layout shifts during animations
    'backface-visibility-hidden',
  ],
  {
    variants: {
      side: {
        left: 'border-r',
        right: 'border-l',
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
      // Push mode - no special positioning needed, flexbox handles it
      // Overlay mode positioning (overlays the content)
      {
        mode: 'overlay',
        class: 'absolute inset-y-0 z-50',
      },
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
  // Optimize for smooth animations
  'transform-gpu will-change-auto',
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
      'h-screen bg-background',
      'transition-all duration-300 ease-in-out',
      this.customClass()
    );
  });
}

/**
 * Context for sharing sidebar configuration between container and content components
 */
export interface SidebarContainerContext {
  side: 'left' | 'right';
  mode: 'push' | 'overlay';
}

/**
 * Context for sharing sidebar state between parent and child components
 */
export interface SidebarStateContext {
  isIconOnly: boolean;
  isExpanded: boolean;
  mode: 'push' | 'overlay';
}

/**
 * Injection token for sidebar container context
 */
export const SIDEBAR_CONTAINER_CONTEXT = new InjectionToken<WritableSignal<SidebarContainerContext>>('SIDEBAR_CONTAINER_CONTEXT');

/**
 * Injection token for sidebar state context
 */
export const SIDEBAR_STATE_CONTEXT = new InjectionToken<WritableSignal<SidebarStateContext>>('SIDEBAR_STATE_CONTEXT');

/**
 * Sidebar Container Component - Main wrapper that handles flexbox layout and positioning
 *
 * Usage:
 * <SidebarContainer>
 *   <Sidebar>
 *     <SidebarHeader>Header content</SidebarHeader>
 *     <SidebarContent>
 *       <SidebarNavGroup>
 *         <SidebarNavItem>Item 1</SidebarNavItem>
 *         <SidebarNavItem>Item 2</SidebarNavItem>
 *       </SidebarNavGroup>
 *     </SidebarContent>
 *     <SidebarFooter>Footer content</SidebarFooter>
 *   </Sidebar>
 *   <div class="flex-1 overflow-auto">
 *     <!-- Your main content here -->
 *   </div>
 * </SidebarContainer>
 */
@Component({
  selector: 'SidebarContainer',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SIDEBAR_CONTAINER_CONTEXT,
      useFactory: () => signal<SidebarContainerContext>({ side: 'left', mode: 'push' })
    }
  ],
  template: `
    <div [class]="containerClasses()" [attr.data-sidebar-container]="'true'">
      <ng-content></ng-content>
    </div>
  `,
})
export class SidebarContainer {
  readonly customClass = input<string>('');
  readonly height = input<string>('h-screen');

  // Inject the context signal
  readonly sidebarContext = inject(SIDEBAR_CONTAINER_CONTEXT);

  readonly containerClasses = computed(() => {
    const context = this.sidebarContext();

    return cn(
      // Use flexbox for simple and reliable positioning
      'flex bg-background w-full',
      this.height(),
      // Ensure proper flex container behavior
      'overflow-hidden',
      // Direction controls the order: row = left sidebar first, row-reverse = right sidebar first
      {
        // Left sidebar: normal flex direction (sidebar, content)
        'flex-row': context.mode === 'push' && context.side === 'left' || context.mode === 'overlay',
        // Right sidebar: reverse flex direction (sidebar, content) -> (content, sidebar visually)
        'flex-row-reverse': context.mode === 'push' && context.side === 'right',
      },
      this.customClass()
    );
  });

  // Public method to update context when sidebar configuration changes
  updateSidebarContext(side: 'left' | 'right', mode: 'push' | 'overlay') {
    this.sidebarContext.set({ side, mode });
  }
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
  providers: [
    {
      provide: SIDEBAR_STATE_CONTEXT,
      useFactory: () => signal<SidebarStateContext>({ 
        isIconOnly: false, 
        isExpanded: true, 
        mode: 'push' 
      })
    }
  ],
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
        @if (!isIconOnly()) {
          <ng-content select="[slot=sidebar-footer]"></ng-content>
        } @else {
          <!-- In icon mode, only show icons if any are provided -->
          <div class="flex justify-center">
            <ng-content select="[slot=sidebar-footer] [data-icon-only]"></ng-content>
          </div>
        }
      </div>
    </aside>
  `,
})
export class Sidebar implements OnInit, OnDestroy {
  @ViewChild('sidebarRef', {static: true}) sidebarRef!: ElementRef;
  // Input signals
  readonly id = input<string>(''); // Unique identifier for this sidebar
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
  readonly mediumBreakpoint = input<number>(1024); // Add medium screen breakpoint
  readonly ariaLabel = input<string>('Navigation sidebar');
  readonly customClass = input<string>('');
  readonly headerCustomClass = input<string>('');
  readonly contentCustomClass = input<string>('');
  readonly footerCustomClass = input<string>('');
  // Output signals
  readonly onExpandedChange = output<boolean>();
  readonly onStateChange = output<SidebarState>();
  readonly currentState = computed(() => {
    // If not expanded and not in icon-only mode, it's collapsed
    if (!this.isExpandedComputed() && !this.isIconOnly()) return 'collapsed';
    // If in icon-only mode, regardless of expansion state, show iconOnly
    if (this.isIconOnly()) return 'iconOnly';
    // If expanded and not icon-only, it's expanded
    return 'expanded';
  });
  readonly currentSize = computed(() => {
    return this.isIconOnly() ? 'icon' : this.size();
  });
  // Mobile responsive computed properties
  readonly effectiveMode = computed(() => {
    // Force overlay mode on mobile and medium screens (up to 1024px)
    return this.isMobile() || this.isMediumScreen() ? 'overlay' : this.mode();
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
    // Disable icon-only mode on mobile and medium screens
    return this.allowIconOnly() && !this.isMobile() && !this.isMediumScreen();
  });

  // Animation state computations
  readonly widthAnimationState = computed(() => {
    // If collapsed (not expanded and not icon-only), return collapsed
    if (!this.isExpandedComputed() && !this.isIconOnly()) return 'collapsed';
    // If in icon-only mode, return icon size
    if (this.isIconOnly()) return 'icon';
    // Otherwise return the current size (expanded state)
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
    const baseClasses = cn(sidebarVariants({
      side: this.side(),
      mode: this.effectiveMode(),
      state: this.currentState(),
      size: this.currentSize(),
    }), this.customClass());

    // In icon mode, check if we need wider sidebar for submenus
    if (this.isIconOnly()) {
      // Check if any nav items have children (this would need to be passed from parent)
      // For now, use a wider icon mode to accommodate vertical submenus
      return cn(baseClasses, 'w-20 min-w-20'); // Slightly wider than default w-16
    }

    return baseClasses;
  });
  readonly headerClasses = computed(() => {
    return cn(
      // Make header sticky and non-shrinking
      'flex-shrink-0 sticky top-0 z-10',
      // Background and borders
      'bg-background border-b border-border/50',
      // Backdrop blur effect
      'backdrop-blur supports-[backdrop-filter]:bg-background/95',
      // Dark mode
      'dark:border-border dark:bg-background',
      this.headerCustomClass()
    );
  });
  readonly contentClasses = computed(() => {
    return cn(
      // Main scrollable area - takes remaining space
      'flex-1 overflow-y-auto min-h-0',
      // Allow horizontal overflow in icon mode for submenus, but hide it otherwise
      this.isIconOnly() ? 'overflow-x-visible' : 'overflow-x-hidden',
      // Custom scrollbar styling
      'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border',
      'dark:scrollbar-thumb-border',
      this.contentCustomClass()
    );
  });
  readonly footerClasses = computed(() => {
    return cn(
      // Make footer sticky and non-growing
      'flex-shrink-0 sticky bottom-0 z-10',
      // Background and borders
      'bg-background border-t border-border/50',
      // Backdrop blur effect
      'backdrop-blur supports-[backdrop-filter]:bg-background/95',
      // Dark mode
      'dark:bg-background dark:border-border',
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
  private sidebarService = inject(SidebarService);

  // Optional container context for updating parent layout
  private containerContext = inject(SIDEBAR_CONTAINER_CONTEXT, { optional: true });
  
  // State context for sharing with child components
  private stateContext = inject(SIDEBAR_STATE_CONTEXT);

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
  private readonly _isMediumScreen = signal<boolean>(false);
  readonly isMediumScreen = computed(() => this._isMediumScreen());
  // Media query listener
  private mediaQueryList?: MediaQueryList;
  private mediumScreenQueryList?: MediaQueryList;
  private resizeHandler?: () => void;
  private mediumResizeHandler?: () => void;

  constructor() {
    // Immediate mobile detection for proper initial state
    if (isPlatformBrowser(this.platformId)) {
      const mobileQuery = `(max-width: ${this.mobileBreakpoint()}px)`;
      const mediumQuery = `(max-width: ${this.mediumBreakpoint()}px)`;
      const mobileMatches = window.matchMedia(mobileQuery).matches;
      const mediumMatches = window.matchMedia(mediumQuery).matches;

      this._isMobile.set(mobileMatches);
      this._isMediumScreen.set(mediumMatches && !mobileMatches);
    }

    // Update container context when sidebar configuration changes
    effect(() => {
      if (this.containerContext) {
        this.containerContext.set({
          side: this.side(),
          mode: this.effectiveMode()
        });
      }
    });

    // Update state context for child components
    effect(() => {
      this.stateContext.set({
        isIconOnly: this.isIconOnly(),
        isExpanded: this.isExpandedComputed() ?? false,
        mode: this.effectiveMode()
      });
    });

    // Initialize default state
    effect(() => {
      if (this.isExpanded() !== undefined) {
        this._isExpanded.set(this.isExpanded()!);
      } else {
        // On smaller screens, always start collapsed for better UX
        // On larger screens, use the defaultExpanded setting
        const shouldStartCollapsed = this.isMobile() || this.isMediumScreen();
        this._isExpanded.set(shouldStartCollapsed ? false : this.defaultExpanded());
      }
    });

    // Handle mobile/medium screen state changes
    effect(() => {
      if (this.isMobile() || this.isMediumScreen()) {
        // On mobile/medium screens, disable icon-only mode
        this._isIconOnly.set(false);

        // Don't auto-collapse - let overlay mode handle positioning
        // User controls when to open/close the sidebar
      }
    });

    // Body scroll lock for overlay mode
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const shouldLockScroll = this.preventBodyScroll() &&
          this.effectiveMode() === 'overlay' &&
          this.isExpandedComputed() &&
          !this.isIconOnly() &&
          (this.isMobile() || this.isMediumScreen()); // Only lock scroll on smaller screens

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
    // Register with sidebar service if ID is provided
    if (this.id()) {
      this.sidebarService.registerSidebar(this.id(), this);
    }
  }

  ngOnDestroy() {
    // Unregister from sidebar service
    if (this.id()) {
      this.sidebarService.unregisterSidebar(this.id());
    }
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
    if (this.isIconOnly()) {
      // In icon-only mode, toggle between icon-only and fully expanded
      this.expand();
    } else if (this.isExpandedComputed()) {
      // If fully expanded, check if icon-only is allowed
      if (this.canUseIconOnly()) {
        this.setIconOnly();
      } else {
        this.collapse();
      }
    } else {
      // If collapsed, expand to full width
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

  // New method for three-state cycling: expanded → icon-only → collapsed → expanded
  cycleSidebarState() {
    if (this.isExpandedComputed() && !this.isIconOnly()) {
      // Currently fully expanded, go to icon-only mode if available
      if (this.canUseIconOnly()) {
        this.setIconOnly();
      } else {
        this.collapse();
      }
    } else if (this.isIconOnly()) {
      // Currently in icon-only mode, go to collapsed
      this.collapse();
    } else {
      // Currently collapsed, go to fully expanded
      this.expand();
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
    // Mobile breakpoint
    const mobileQuery = `(max-width: ${this.mobileBreakpoint()}px)`;
    this.mediaQueryList = window.matchMedia(mobileQuery);

    // Medium screen breakpoint
    const mediumQuery = `(max-width: ${this.mediumBreakpoint()}px)`;
    this.mediumScreenQueryList = window.matchMedia(mediumQuery);

    // Set initial states
    this._isMobile.set(this.mediaQueryList.matches);
    this._isMediumScreen.set(this.mediumScreenQueryList.matches && !this.mediaQueryList.matches);

    // Listen for mobile changes
    const mobileListener = (e: MediaQueryListEvent) => {
      this.ngZone.run(() => {
        this._isMobile.set(e.matches);
        // Update medium screen state when mobile changes
        this._isMediumScreen.set(this.mediumScreenQueryList!.matches && !e.matches);
      });
    };

    // Listen for medium screen changes
    const mediumListener = (e: MediaQueryListEvent) => {
      this.ngZone.run(() => {
        // Medium screen is true only if medium query matches but mobile doesn't
        this._isMediumScreen.set(e.matches && !this.mediaQueryList!.matches);
      });
    };

    this.mediaQueryList.addEventListener('change', mobileListener);
    this.mediumScreenQueryList.addEventListener('change', mediumListener);
    this.resizeHandler = mobileListener as any;
    this.mediumResizeHandler = mediumListener as any;
  }

  private cleanup() {
    if (this.mediaQueryList && this.resizeHandler) {
      this.mediaQueryList.removeEventListener('change', this.resizeHandler);
    }

    if (this.mediumScreenQueryList && this.mediumResizeHandler) {
      this.mediumScreenQueryList.removeEventListener('change', this.mediumResizeHandler);
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
      // Removed redundant border and background - parent handles sticky positioning
      'p-4',
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
  
  // Inject sidebar state context
  private stateContext = inject(SIDEBAR_STATE_CONTEXT, { optional: true });
  
  // Computed properties using context
  readonly isIconOnly = computed(() => this.stateContext?.()?.isIconOnly ?? false);

  readonly contentClasses = computed(() => {
    return cn(
      // Conditional padding and spacing based on icon mode
      this.isIconOnly() ? 'p-1 space-y-0.5' : 'p-4 space-y-2',
      // Scrollbar styling
      'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border/30',
      'hover:scrollbar-thumb-border/50',
      'dark:scrollbar-thumb-border/30 dark:hover:scrollbar-thumb-border/50',
      'transition-all duration-200',
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
      // Simple padding - parent handles sticky positioning and background
      'p-3',
      'transition-colors duration-200',
      this.customClass()
    );
  });
}

/**
 * Sidebar Navigation Item Component with Universal Icon Support
 */
@Component({
  selector: 'SidebarNavItem',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  hostDirectives: [
    {
      directive: RouterLink,
      inputs: ['routerLink: routerLink']
    }
  ],
  animations: [
    trigger('labelSlide', [
      state('visible', style({
        opacity: 1,
        width: '*',
        overflow: 'visible',
        willChange: 'auto'
      })),
      state('hidden', style({
        opacity: 0,
        width: '0px',
        overflow: 'hidden',
        willChange: 'opacity, width'
      })),
      transition('visible <=> hidden', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ]),
    trigger('childrenSlide', [
      state('expanded', style({
        height: '*',
        opacity: 1,
        willChange: 'auto'
      })),
      state('collapsed', style({
        height: '0px',
        opacity: 0,
        willChange: 'height, opacity'
      })),
      transition('expanded <=> collapsed', [
        animate('280ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ])
  ],
  template: `
    <div [class]="containerClasses()">
      <a
        #triggerElement
        [class]="itemClasses()"
        [attr.aria-current]="isActive() ? 'page' : null"
        [attr.aria-expanded]="hasChildren() ? isExpanded() : null"
        [attr.aria-label]="getAriaLabel()"
        role="menuitem"
        tabindex="0"
        (click)="onItemClick($event)"
        (keydown.enter)="onItemClick($event)"
        (keydown.space)="onItemClick($event)"
        (keydown)="onKeyDown($event)"
        (mouseenter)="onMouseEnter()"
        (mouseleave)="onMouseLeave()"
        cdkOverlayOrigin
        #trigger="cdkOverlayOrigin"
      >
        @if (icon()) {
          <div class="relative flex-shrink-0 flex items-center gap-2 justify-center w-6 h-6">
            <!-- Dynamic Icon Container -->
            <div #iconContainer class="flex items-center justify-center w-full h-full">
              <!-- Fallback content if dynamic loading fails -->
              @if (iconType() === 'html' && sanitizedIcon()) {
                <span [innerHTML]="sanitizedIcon()" aria-hidden="true" class="flex items-center justify-center"></span>
              }
              @if (iconType() === 'class') {
                <i [class]="iconValue()" aria-hidden="true"></i>
              }
            </div>

            <!-- Small chevron indicator for submenu in icon mode -->
            @if (hasChildren() && isIconOnly()) {
              <svg
                class="absolute bottom-1 -right-2.5 w-3 h-3 text-foreground bg-background rounded-full p-0.5 border border-foreground/90 shadow-sm"
                [class.rotate-180]="isExpanded()"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/>
              </svg>
            }
          </div>
        }

        @if (showLabel()) {
          <span
            class="flex-1 truncate text-sm font-medium"
            [@labelSlide]="showLabel() ? 'visible' : 'hidden'"
          >{{ label() }}</span>
        }

        @if (showBadge()) {
          <span
            [class]="badgeClasses()"
            [attr.aria-label]="'Badge: ' + badge()"
            [@labelSlide]="showLabel() ? 'visible' : 'hidden'"
          >{{ badge() }}</span>
        }

        @if (showChevron()) {
          <svg
            class="w-4 h-4 flex-shrink-0 transform-gpu transition-transform duration-150 ease-out"
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

      <!-- CDK Overlay Tooltip for Icon Mode -->
      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOrigin]="trigger"
        [cdkConnectedOverlayOpen]="showTooltip() && isHovered()"
        [cdkConnectedOverlayPositions]="tooltipPositions"
        [cdkConnectedOverlayHasBackdrop]="false"
        [cdkConnectedOverlayPanelClass]="'tooltip-panel'"
      >
        <div class="px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-lg whitespace-nowrap pointer-events-none z-[9999]">
          {{ label() }}
        </div>
      </ng-template>

      @if (hasChildren()) {
        <div
          [class]="childrenClasses()"
          role="menu"
          [attr.aria-label]="label() + ' submenu'"
          [@childrenSlide]="isExpanded() ? 'expanded' : 'collapsed'"
        >
          <ng-content></ng-content>
        </div>
      }
    </div>
  `,
})
export class SidebarNavItem implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('iconContainer', { read: ViewContainerRef }) iconContainer!: ViewContainerRef;



  // Input signals - Universal icon support
  readonly routerLink = input<string | any[] | null>(null);
  readonly label = input<string>('');
  readonly icon = input<string | Type<any> | TemplateRef<any> | LucideIconData>(''); // Accept string, Angular component, template, or LucideIconData
  readonly badge = input<string>('');
  readonly isActive = input<boolean>(false);
  readonly hasChildren = input<boolean>(false);
  readonly isSubmenuItem = input<boolean>(false);
  readonly customClass = input<string>('');
  readonly badgeCustomClass = input<string>('');

  // Output signals
  readonly onClick = output<Event>();
  
  // Inject sidebar state context
  private stateContext = inject(SIDEBAR_STATE_CONTEXT, { optional: true });
  
  // Computed properties using context
  readonly isIconOnly = computed(() => this.stateContext?.()?.isIconOnly ?? false);
  readonly showLabel = computed(() => !this.isIconOnly());
  readonly showTooltip = computed(() => this.isIconOnly() && !!this.label());
  readonly showBadge = computed(() => !!this.badge() && this.showLabel());
  readonly showChevron = computed(() => this.hasChildren() && this.showLabel());

  // Injected dependencies
  private sanitizer = inject(DomSanitizer);
  private viewContainerRef = inject(ViewContainerRef);
  private environmentInjector = inject(EnvironmentInjector);
  private injector = inject(Injector);

  // Dynamic component reference
  private componentRef: ComponentRef<any> | null = null;

  // Icon type detection and processing
  readonly iconType = computed(() => {
    const iconValue = this.icon();
    if (!iconValue) return 'none';

    if (typeof iconValue === 'string') {
      // Check if it's HTML/SVG content
      if (iconValue.trim().startsWith('<') || iconValue.includes('svg')) {
        return 'html';
      }
      // Otherwise treat as CSS class
      return 'class';
    }

    if (typeof iconValue === 'function') {
      return 'component';
    }

    if (iconValue instanceof TemplateRef) {
      return 'template';
    }

    // Check if it's LucideIconData (array structure)
    if (Array.isArray(iconValue)) {
      return 'lucide';
    }

    return 'unknown';
  });

  readonly iconValue = computed(() => {
    const iconVal = this.icon();
    return typeof iconVal === 'string' ? iconVal : '';
  });

  // Sanitized HTML for HTML/SVG icons
  readonly sanitizedIcon = computed(() => {
    const iconVal = this.iconValue();
    const iconType = this.iconType();


    if (iconType === 'html' && iconVal) {
      return this.sanitizer.bypassSecurityTrustHtml(iconVal);
    }

    if (iconType === 'lucide') {
      // Convert LucideIconData to SVG string
      const lucideData = this.icon() as LucideIconData;
      const svgString = lucideToSvg(lucideData);
      return this.sanitizer.bypassSecurityTrustHtml(svgString);
    }

    return null;
  });

  // CSS classes
  readonly containerClasses = computed(() =>
    cn(
      'relative w-full',
      {
        'group': this.hasChildren() && this.isIconOnly(),
        'flex flex-col': this.isIconOnly() && this.hasChildren(),
      }
    )
  );

  readonly itemClasses = computed(() =>
    cn(
      'group flex items-center gap-3 px-3 py-2 rounded-lg',
      'hover:bg-accent hover:text-accent-foreground transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1',
      'focus-visible:bg-primary/10 focus-visible:text-primary focus-visible:shadow-sm',
      'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
      'focus:bg-primary/10 focus:text-primary focus:shadow-sm',
      'text-muted-foreground hover:text-foreground',
      'dark:hover:bg-accent/80 dark:hover:text-accent-foreground',
      'dark:focus-visible:bg-primary/20 dark:focus:bg-primary/20',
      'active:scale-[0.98] transform-gpu transition-transform duration-150',
      {
        'bg-accent text-accent-foreground dark:bg-accent/80': this.isActive(),
        'justify-center px-2 w-12 h-12 mx-auto': this.isIconOnly(),
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

  readonly childrenClasses = computed(() =>
    cn(
      this.isIconOnly() ? 'space-y-0' : 'space-y-1',
      'overflow-visible',
      {
        'mt-2 bg-accent/20 border border-border/50 rounded-lg px-1 py-1 w-full': this.isIconOnly(),
        'ml-6 mt-1 overflow-hidden': !this.isIconOnly(),
        'opacity-0 invisible pointer-events-none max-h-0 transition-all duration-200': this.isIconOnly(),
        'group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:max-h-96': this.isIconOnly(),
        'opacity-100 visible pointer-events-auto max-h-96': this.isIconOnly() && this.isExpanded(),
      }
    )
  );

  // Internal state
  private readonly _isExpanded = signal<boolean>(false);
  readonly isExpanded = computed(() => this._isExpanded());

  private readonly _isHovered = signal<boolean>(false);
  readonly isHovered = computed(() => this._isHovered());

  // Tooltip positioning
  readonly tooltipPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: 8,
    },
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -8,
    },
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: 8,
    },
  ];

  constructor() {
    // Don't render icons in constructor - wait for view to be ready
  }

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    // Now that the view is initialized, set up icon rendering
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.renderDynamicIcon();
      });
    });

    // Initial render
    this.renderDynamicIcon();
  }

  ngOnDestroy() {
    this.destroyDynamicIcon();
  }

  private renderDynamicIcon() {
    // Clear any existing dynamic content
    this.destroyDynamicIcon();

    const iconValue = this.icon();
    const iconType = this.iconType();

    console.log('renderDynamicIcon called:', { iconValue, iconType, hasContainer: !!this.iconContainer }); // Debug

    if (!iconValue || !this.iconContainer) return;

    try {
      switch (iconType) {
        case 'component':
          console.log('Rendering component icon'); // Debug
          this.renderComponent(iconValue as Type<any>);
          break;
        case 'template':
          console.log('Rendering template icon'); // Debug
          this.renderTemplate(iconValue as TemplateRef<any>);
          break;
        case 'lucide':
          console.log('Rendering lucide icon'); // Debug
          this.renderLucideIcon(iconValue as LucideIconData);
          break;
        case 'class':
          console.log('Rendering class icon:', iconValue); // Debug
          this.renderClassIcon(iconValue as string);
          break;
        case 'html':
          console.log('Rendering HTML icon:', iconValue); // Debug
          this.renderHtmlIcon(iconValue as string);
          break;
        // Note: 'html' and 'class' types are also handled directly in the template as fallback
      }
    } catch (error) {
      console.warn('Failed to render dynamic icon:', error);
    }
  }

  private renderComponent(component: Type<any>) {
    if (!this.iconContainer) return;

    try {
      // Clear the container first
      this.iconContainer.element.nativeElement.innerHTML = '';

      this.componentRef = createComponent(component, {
        environmentInjector: this.environmentInjector,
        hostElement: this.iconContainer.element.nativeElement
      });

      // Set common properties if the component supports them
      const instance = this.componentRef.instance;
      if (instance) {
        // Try to set size if the component supports it (for Lucide icons)
        if ('size' in instance) {
          instance.size = 16;
        }
        if ('width' in instance) {
          instance.width = 16;
        }
        if ('height' in instance) {
          instance.height = 16;
        }
        // Try to set color if supported
        if ('color' in instance) {
          instance.color = 'currentColor';
        }
        if ('strokeWidth' in instance) {
          instance.strokeWidth = 2;
        }
      }

      // Trigger change detection
      this.componentRef.changeDetectorRef.detectChanges();
    } catch (error) {
      console.warn('Failed to create component:', error);

      // Fallback: Try to render as SVG if it's a Lucide component
      this.tryLucideFallback(component);
    }
  }

  private renderTemplate(template: TemplateRef<any>) {
    if (!this.iconContainer) return;

    try {
      this.iconContainer.createEmbeddedView(template);
    } catch (error) {
      console.warn('Failed to render template:', error);
    }
  }

  private renderLucideIcon(lucideData: LucideIconData) {
    if (!this.iconContainer) return;

    try {
      const svgString = lucideToSvg(lucideData);

      // Create a wrapper element to hold the SVG
      const wrapperElement = document.createElement('span');
      wrapperElement.innerHTML = svgString;
      wrapperElement.className = 'flex items-center justify-center';
      wrapperElement.setAttribute('aria-hidden', 'true');

      // Clear container and append the wrapper
      this.iconContainer.element.nativeElement.innerHTML = '';
      this.iconContainer.element.nativeElement.appendChild(wrapperElement);
    } catch (error) {
      console.warn('Failed to render Lucide icon:', error);
    }
  }

  private tryLucideFallback(component: Type<any>) {
    try {
      // For Lucide Angular components, try to access their icon data
      // This is a fallback approach - check if the component has iconData
      if (component && 'iconData' in component) {
        this.renderLucideIcon((component as any).iconData);
        return;
      }

      // Alternative approach: Create a simple SVG fallback
      const fallbackSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
        </svg>
      `;

      this.iconContainer.element.nativeElement.innerHTML = fallbackSvg;
    } catch (error) {
      console.warn('Lucide fallback failed:', error);
    }
  }

  private destroyDynamicIcon() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    if (this.iconContainer) {
      this.iconContainer.clear();
    }
  }

  private renderClassIcon(cssClass: string) {
    if (!this.iconContainer) return;

    try {
      // Create an i element with the CSS class
      const iconElement = document.createElement('i');
      iconElement.className = cssClass;
      iconElement.setAttribute('aria-hidden', 'true');
      iconElement.style.fontSize = '16px';
      iconElement.style.lineHeight = '1';

      // Clear container and append the icon
      this.iconContainer.element.nativeElement.innerHTML = '';
      this.iconContainer.element.nativeElement.appendChild(iconElement);
    } catch (error) {
      console.warn('Failed to render CSS class icon:', error);
    }
  }

  private renderHtmlIcon(htmlString: string) {
    if (!this.iconContainer) return;

    try {
      // Create a wrapper element to hold the HTML
      const wrapperElement = document.createElement('span');
      wrapperElement.innerHTML = htmlString;
      wrapperElement.className = 'flex items-center justify-center';
      wrapperElement.setAttribute('aria-hidden', 'true');

      // Clear container and append the wrapper
      this.iconContainer.element.nativeElement.innerHTML = '';
      this.iconContainer.element.nativeElement.appendChild(wrapperElement);
    } catch (error) {
      console.warn('Failed to render HTML icon:', error);
    }
  }


  // Event handlers
  onMouseEnter() {
    if (this.isIconOnly()) {
      this._isHovered.set(true);
    }
  }

  onMouseLeave() {
    this._isHovered.set(false);
  }

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
      event.preventDefault();
    }
    this.onClick.emit(event);
  }

  onKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusNextVisibleItem(target);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPreviousVisibleItem(target);
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (this.hasChildren() && !this.isExpanded()) {
          this._isExpanded.set(true);
        } else {
          this.focusNextVisibleItem(target);
        }
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (this.hasChildren() && this.isExpanded()) {
          this._isExpanded.set(false);
        } else {
          this.focusPreviousVisibleItem(target);
        }
        break;
      case 'Home':
        event.preventDefault();
        this.focusFirstItem();
        break;
      case 'End':
        event.preventDefault();
        this.focusLastItem();
        break;
    }
  }

  private focusNextVisibleItem(currentElement: HTMLElement) {
    const sidebarContent = currentElement.closest('[role="navigation"]');
    if (!sidebarContent) return;

    const allItems = Array.from(sidebarContent.querySelectorAll('[role="menuitem"]')) as HTMLElement[];
    const visibleItems = allItems.filter(item => {
      const rect = item.getBoundingClientRect();
      return rect.height > 0 && getComputedStyle(item).visibility !== 'hidden';
    });

    const currentIndex = visibleItems.indexOf(currentElement);
    if (currentIndex >= 0 && currentIndex < visibleItems.length - 1) {
      visibleItems[currentIndex + 1].focus();
    }
  }

  private focusPreviousVisibleItem(currentElement: HTMLElement) {
    const sidebarContent = currentElement.closest('[role="navigation"]');
    if (!sidebarContent) return;

    const allItems = Array.from(sidebarContent.querySelectorAll('[role="menuitem"]')) as HTMLElement[];
    const visibleItems = allItems.filter(item => {
      const rect = item.getBoundingClientRect();
      return rect.height > 0 && getComputedStyle(item).visibility !== 'hidden';
    });

    const currentIndex = visibleItems.indexOf(currentElement);
    if (currentIndex > 0) {
      visibleItems[currentIndex - 1].focus();
    }
  }

  private focusFirstItem() {
    const sidebarContent = document.querySelector('[role="navigation"]');
    if (!sidebarContent) return;

    const firstItem = sidebarContent.querySelector('[role="menuitem"]') as HTMLElement;
    if (firstItem) {
      firstItem.focus();
    }
  }

  private focusLastItem() {
    const sidebarContent = document.querySelector('[role="navigation"]');
    if (!sidebarContent) return;

    const allItems = sidebarContent.querySelectorAll('[role="menuitem"]');
    const lastItem = allItems[allItems.length - 1] as HTMLElement;
    if (lastItem) {
      lastItem.focus();
    }
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
  readonly customClass = input<string>('');
  readonly titleCustomClass = input<string>('');

  // Inject sidebar state context
  private stateContext = inject(SIDEBAR_STATE_CONTEXT, { optional: true });
  
  // Computed properties using context
  readonly isIconOnly = computed(() => this.stateContext?.()?.isIconOnly ?? false);

  readonly groupId = `sidebar-group-${Math.random().toString(36).substr(2, 9)}`;

  readonly groupClasses = computed(() => {
    return cn(
      'space-y-0.5',
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
 * Supports automatic target discovery by sidebar ID and custom templates
 */
@Component({
  selector: 'SidebarTrigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Check if custom template is provided -->
    <ng-content select="[slot=custom-trigger]"></ng-content>

    <!-- Default trigger button (shown only if no custom template) -->
    @if (!hasCustomTrigger()) {
      <button
        type="button"
        [class]="triggerClasses()"
        (click)="onTriggerClick()"
        [attr.aria-label]="getAriaLabel()"
        [attr.aria-expanded]="getTargetExpandedState()"
        [attr.title]="getAriaLabel()"
      >
        @if (showIcon()) {
          <svg
            class="w-5 h-5 transition-transform duration-200"
            [class.rotate-180]="getTargetExpandedState()"
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
    }
  `,
})
export class SidebarTrigger implements OnInit {
  // Input signals
  readonly target = input<string>(''); // ID of the sidebar to control
  readonly label = input<string>('');
  readonly showIcon = input<boolean>(true);
  readonly showLabel = input<boolean>(false);
  readonly isExpanded = input<boolean>(false); // Fallback if no target is specified
  readonly variant = input<'default' | 'outline' | 'ghost'>('outline');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly customClass = input<string>('');

  // Output signals
  readonly onTrigger = output<void>();

  // Injected dependencies
  private sidebarService = inject(SidebarService);
  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  // Internal state for custom trigger detection
  private readonly _hasCustomTrigger = signal<boolean>(false);
  readonly hasCustomTrigger = computed(() => this._hasCustomTrigger());

  ngOnInit() {
    // Check for custom trigger template only in browser
    if (isPlatformBrowser(this.platformId)) {
      const customSlot = this.elementRef.nativeElement.querySelector('[slot="custom-trigger"]');
      this._hasCustomTrigger.set(customSlot !== null);

      // Set up click handler for custom trigger template
      if (customSlot) {
        customSlot.addEventListener('click', () => this.onTriggerClick());
      }
    }
  }

  // Get the expanded state from the target sidebar if available
  getTargetExpandedState(): boolean {
    if (this.target()) {
      const targetSidebar = this.sidebarService.getSidebar(this.target());
      if (targetSidebar) {
        return targetSidebar.isExpandedComputed() ?? false;
      }
    }
    return this.isExpanded();
  }

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
    // First try to toggle the target sidebar
    if (this.target()) {
      const success = this.sidebarService.toggleSidebar(this.target());
      if (success) {
        this.onTrigger.emit();
        return;
      }
      // If target sidebar not found, log a warning
      console.warn(`SidebarTrigger: Target sidebar with ID "${this.target()}" not found.`);
    }

    // Fallback to emitting the trigger event for manual handling
    this.onTrigger.emit();
  }

  getAriaLabel(): string {
    if (this.label()) {
      return this.label();
    }
    const isExpanded = this.getTargetExpandedState();
    return isExpanded ? 'Close sidebar' : 'Open sidebar';
  }
}

// Export main components
export { Sidebar as default };
