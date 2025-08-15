import {
  Component,
  computed,
  input,
  output,
  signal,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  effect,
  inject,
  PLATFORM_ID,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  Overlay,
  OverlayRef,
  ConnectedPosition,
  FlexibleConnectedPositionStrategy
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

/**
 * Popover styling variants using Class Variance Authority
 */
const popoverVariants = cva(
  [
    'z-50 w-72 rounded-lg border shadow-lg outline-none',
    'animate-in fade-in-0 zoom-in-95 duration-200'
  ],
  {
    variants: {
      size: {
        sm: 'w-64 p-3 text-sm',
        default: 'w-72 p-4 text-sm',
        lg: 'w-80 p-6 text-base',
        xl: 'w-96 p-8 text-base'
      },
      variant: {
        default: [
          'bg-white dark:bg-gray-800',
          'border-gray-200 dark:border-gray-600',
          'text-gray-900 dark:text-gray-50',
          'shadow-xl shadow-gray-500/20 dark:shadow-black/40'
        ],
        success: [
          'bg-emerald-50 dark:bg-emerald-800',
          'border-emerald-300 dark:border-emerald-500',
          'text-emerald-900 dark:text-emerald-50',
          'shadow-xl shadow-emerald-500/25 dark:shadow-emerald-900/50'
        ],
        warning: [
          'bg-amber-50 dark:bg-amber-800',
          'border-amber-300 dark:border-amber-500',
          'text-amber-900 dark:text-amber-50',
          'shadow-xl shadow-amber-500/25 dark:shadow-amber-900/50'
        ],
        error: [
          'bg-red-50 dark:bg-red-800',
          'border-red-300 dark:border-red-500',
          'text-red-900 dark:text-red-50',
          'shadow-xl shadow-red-500/25 dark:shadow-red-900/50'
        ],
        info: [
          'bg-blue-50 dark:bg-blue-800',
          'border-blue-300 dark:border-blue-500',
          'text-blue-900 dark:text-blue-50',
          'shadow-xl shadow-blue-500/25 dark:shadow-blue-900/50'
        ]
      }
    },
    defaultVariants: {
      size: 'default',
      variant: 'default'
    }
  }
);

/**
 * Arrow component for popover
 */
const popoverArrowVariants = cva(
  'absolute w-2.5 h-2.5 transform rotate-45 shadow-sm',
  {
    variants: {
      side: {
        top: '-bottom-1.5',
        bottom: '-top-1.5',
        left: '-right-1.5',
        right: '-left-1.5'
      },
      align: {
        start: '',
        center: '',
        end: ''
      },
      variant: {
        default: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 border-b border-r',
        success: 'bg-emerald-50 dark:bg-emerald-800 border-emerald-200 dark:border-emerald-500 border-b border-r',
        warning: 'bg-amber-50 dark:bg-amber-800 border-amber-200 dark:border-amber-500 border-b border-r',
        error: 'bg-red-50 dark:bg-red-800 border-red-200 dark:border-red-500 border-b border-r',
        info: 'bg-blue-50 dark:bg-blue-800 border-blue-200 dark:border-blue-500 border-b border-r'
      }
    },
    compoundVariants: [
      { side: 'top', align: 'start', class: 'left-3' },
      { side: 'top', align: 'center', class: 'left-1/2 -translate-x-1/2' },
      { side: 'top', align: 'end', class: 'right-3' },
      { side: 'bottom', align: 'start', class: 'left-3' },
      { side: 'bottom', align: 'center', class: 'left-1/2 -translate-x-1/2' },
      { side: 'bottom', align: 'end', class: 'right-3' },
      { side: 'left', align: 'start', class: 'top-3' },
      { side: 'left', align: 'center', class: 'top-1/2 -translate-y-1/2' },
      { side: 'left', align: 'end', class: 'bottom-3' },
      { side: 'right', align: 'start', class: 'top-3' },
      { side: 'right', align: 'center', class: 'top-1/2 -translate-y-1/2' },
      { side: 'right', align: 'end', class: 'bottom-3' },
      // Side-specific border adjustments
      { side: 'top', class: 'border-b border-r' },
      { side: 'bottom', class: 'border-t border-l' },
      { side: 'left', class: 'border-t border-r' },
      { side: 'right', class: 'border-b border-l' }
    ],
    defaultVariants: {
      side: 'bottom',
      align: 'center',
      variant: 'default'
    }
  }
);

// Types
export type PopoverSide = 'top' | 'right' | 'bottom' | 'left';
export type PopoverAlign = 'start' | 'center' | 'end';
export type PopoverSize = 'sm' | 'default' | 'lg' | 'xl';
export type PopoverVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface PopoverProps extends VariantProps<typeof popoverVariants> {
  side?: PopoverSide;
  align?: PopoverAlign;
  offset?: number;
  showArrow?: boolean;
  showCloseButton?: boolean;
  modal?: boolean;
  showBackdrop?: boolean;
  avoidCollisions?: boolean;
  hideOnTriggerOutOfView?: boolean;
  class?: string;
}

/**
 * Enterprise-grade Popover Component with CDK Portal
 *
 * A floating content container with intelligent positioning using Angular CDK.
 * Perfect for tooltips, dropdowns, and contextual information.
 *
 * Features:
 * - Intelligent positioning with collision detection
 * - Automatic repositioning during scroll
 * - Auto-hide when trigger scrolls out of view
 * - Portal-based rendering for z-index management
 * - Accessibility support with ARIA attributes
 * - Multiple variants and sizes
 *
 * @example
 * ```html
 * <button #trigger (click)="isOpen.set(!isOpen())">Open Popover</button>
 * <Popover
 *   [isOpen]="isOpen()"
 *   [triggerElement]="trigger"
 *   [hideOnTriggerOutOfView]="true"
 *   (openChange)="isOpen.set($event)"
 * >
 *   <div>Popover content</div>
 * </Popover>
 * ```
 */
@Component({
  selector: 'Popover',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-template #popoverTemplate>
      <div
        #popoverElement
        [class]="popoverClasses()"
        [attr.data-state]="isOpen() ? 'open' : 'closed'"
        [attr.data-side]="actualSide()"
        [attr.data-align]="actualAlign()"
        role="dialog"
        [attr.aria-modal]="modal()"
        [attr.aria-labelledby]="ariaLabelledby()"
        [attr.aria-describedby]="ariaDescribedby()"
        tabindex="-1"
        style="position: relative; direction: ltr;"
      >
        <!-- Close Button -->
        @if (showCloseButton()) {
          <button
            type="button"
            (click)="close()"
            class="absolute top-2 right-2 p-1.5 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 transition-all text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white shadow-sm z-50"
            aria-label="Close"
            style="position: absolute; top: 8px; right: 8px;"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        }

        <!-- Content -->
        <div class="relative text-gray-900 dark:text-white" #contentContainer>
          <!-- Content will be dynamically inserted here -->
        </div>

        <!-- Arrow -->
        @if (showArrow()) {
          <div
            class="popover-arrow"
            [class]="arrowClasses()"
          ></div>
        }
      </div>
    </ng-template>

    <!-- Hidden content capture -->
    <div #contentCapture style="display: none;">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }

    .popover-arrow {
      z-index: -1;
    }

    :host ::ng-deep .cdk-overlay-dark-backdrop {
      background: rgba(0, 0, 0, 0.5);
    }

    :host ::ng-deep .cdk-overlay-transparent-backdrop {
      background: transparent;
    }

    :host ::ng-deep .popover-panel {
      pointer-events: auto;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Popover implements AfterViewInit, OnDestroy {
  // CDK Overlay dependencies
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private platformId = inject(PLATFORM_ID);

  // Template reference
  @ViewChild('popoverTemplate', { static: true })
  private popoverTemplate!: TemplateRef<any>;

  @ViewChild('popoverElement')
  private popoverElement?: ElementRef<HTMLElement>;

  @ViewChild('contentCapture', { static: true })
  private contentCapture!: ElementRef<HTMLElement>;

  @ViewChild('contentContainer')
  private contentContainer?: ElementRef<HTMLElement>;

  // Overlay reference
  private overlayRef?: OverlayRef;
  private portal?: TemplatePortal;
  private positionStrategy?: FlexibleConnectedPositionStrategy;
  private scrollHandler?: () => void;
  private intersectionObserver?: IntersectionObserver;
  private resizeObserver?: ResizeObserver;

  // Actual positioning (may differ from preferred due to collision detection)
  readonly actualSide = signal<PopoverSide>('bottom');
  readonly actualAlign = signal<PopoverAlign>('center');

  // Input signals
  readonly isOpen = input<boolean>(false);
  readonly triggerElement = input.required<ElementRef<HTMLElement> | HTMLElement>();
  readonly side = input<PopoverSide>('bottom');
  readonly align = input<PopoverAlign>('center');
  readonly offset = input<number>(8);
  readonly size = input<PopoverSize>('default');
  readonly variant = input<PopoverVariant>('default');
  readonly showArrow = input<boolean>(false);
  readonly showCloseButton = input<boolean>(false);
  readonly modal = input<boolean>(false);
  readonly showBackdrop = input<boolean>(false);
  readonly avoidCollisions = input<boolean>(true);
  readonly hideOnTriggerOutOfView = input<boolean>(true);
  readonly class = input<string>('');
  readonly ariaLabelledby = input<string>('');
  readonly ariaDescribedby = input<string>('');

  // Output signals
  readonly openChange = output<boolean>();

  // Computed styles
  readonly popoverClasses = computed(() => cn(
    popoverVariants({
      size: this.size(),
      variant: this.variant()
    }),
    this.class()
  ));

  readonly arrowClasses = computed(() => cn(
    popoverArrowVariants({
      side: this.actualSide(),
      align: this.actualAlign(),
      variant: this.variant()
    })
  ));

  constructor() {
    // Effect to handle open/close state
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      if (this.isOpen()) {
        this.openPopover();
      } else {
        this.closePopover();
      }
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Create portal
    this.portal = new TemplatePortal(
      this.popoverTemplate,
      this.viewContainerRef
    );
  }

  ngOnDestroy(): void {
    this.closePopover();
    this.removeScrollListener();
    this.removeIntersectionObserver();
    this.overlayRef?.dispose();
  }

  private openPopover(): void {
    if (this.overlayRef?.hasAttached()) return;

    // Create overlay if it doesn't exist
    if (!this.overlayRef) {
      this.createOverlay();
    }

    // Attach portal to overlay
    if (this.portal && this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.portal);

      // Handle backdrop clicks
      if (this.showBackdrop() || this.modal()) {
        this.overlayRef.backdropClick().subscribe(() => {
          this.close();
        });
      }

      // Handle escape key
      this.overlayRef.keydownEvents().subscribe((event) => {
        if (event.key === 'Escape' && !this.modal()) {
          this.close();
        }
      });

      // Handle position changes for collision detection
      if (this.positionStrategy) {
        this.positionStrategy.positionChanges.subscribe((change) => {
          if (change.connectionPair) {
            this.updateActualPosition(change.connectionPair);
          }
        });
      }

      // Focus the popover after a brief delay
      setTimeout(() => {
        this.popoverElement?.nativeElement.focus();
        this.moveContentToPopover();
      }, 100);
    }
  }

  private closePopover(): void {
    if (this.overlayRef?.hasAttached()) {
      this.moveContentBack();
      this.overlayRef.detach();
      this.removeScrollListener();
      this.removeIntersectionObserver();
    }
  }

  private createOverlay(): void {
    const triggerEl = this.getTriggerElement();
    if (!triggerEl) return;

    // Position strategy with better edge case handling and improved centering
    this.positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(triggerEl)
      .withPositions(this.getPositions())
      .withPush(this.avoidCollisions())
      .withFlexibleDimensions(true)
      .withViewportMargin(16)
      .withGrowAfterOpen(true)
      .withDefaultOffsetX(0)
      .withDefaultOffsetY(0)
      .withLockedPosition(false)
      .withTransformOriginOn('.popover-panel');

    // Subscribe to position changes to update the actual position
    this.positionStrategy.positionChanges.subscribe((change) => {
      // Update actual position based on the applied position
      const appliedPosition = change.connectionPair;
      if (appliedPosition) {
        // Determine actual side based on overlay position
        if (appliedPosition.overlayY === 'bottom') {
          this.actualSide.set('top');
        } else if (appliedPosition.overlayY === 'top') {
          this.actualSide.set('bottom');
        } else if (appliedPosition.overlayX === 'start') {
          this.actualSide.set('right');
        } else if (appliedPosition.overlayX === 'end') {
          this.actualSide.set('left');
        }

        // Determine actual alignment
        if (appliedPosition.overlayX === 'start') {
          this.actualAlign.set('start');
        } else if (appliedPosition.overlayX === 'end') {
          this.actualAlign.set('end');
        } else if (appliedPosition.overlayX === 'center') {
          this.actualAlign.set('center');
        }
      }
    });

    // Improved scroll strategy with immediate repositioning and no throttling
    const scrollStrategy = this.overlay.scrollStrategies.reposition({
      scrollThrottle: 0, // Remove throttling for immediate repositioning
      autoClose: false
    });

    // Create overlay with improved configuration
    this.overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy,
      scrollStrategy,
      hasBackdrop: this.showBackdrop() || this.modal(),
      backdropClass: this.showBackdrop() || this.modal() ? 'cdk-overlay-dark-backdrop' : '',
      panelClass: ['popover-panel', 'popover-overlay-panel'],
      disposeOnNavigation: true,
      width: 'auto',
      height: 'auto',
      minWidth: 0,
      minHeight: 0,
      maxWidth: '90vw',
      maxHeight: '90vh'
    });

    // Add manual scroll listener for better responsiveness
    this.addScrollListener();
    
    // Add intersection observer for reliable visibility detection
    this.addIntersectionObserver();
  }

  private addScrollListener(): void {
    if (!isPlatformBrowser(this.platformId) || !this.overlayRef) return;

    // Enhanced scroll handler with viewport visibility check
    const scrollHandler = () => {
      if (this.overlayRef?.hasAttached() && this.positionStrategy) {
        // Just reposition the popover - visibility is handled by intersection observer
        this.positionStrategy.reapplyLastPosition();
        
        // Backup check using manual detection if intersection observer failed
        if (this.hideOnTriggerOutOfView()) {
          const triggerEl = this.getTriggerElement();
          if (triggerEl) {
            const isVisible = this.isElementInViewport(triggerEl);
            if (!isVisible) {
              console.log('Backup visibility check: Hiding popover - trigger out of view');
              this.close();
              return;
            }
          }
        }
      }
    };

    // Listen to scroll events on window and all scrollable parents
    window.addEventListener('scroll', scrollHandler, { passive: true });
    document.addEventListener('scroll', scrollHandler, { passive: true });
    document.body.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Also listen to scroll events on any scrollable parent elements
    const triggerEl = this.getTriggerElement();
    if (triggerEl) {
      let parent = triggerEl.parentElement;
      while (parent && parent !== document.documentElement) {
        const computedStyle = window.getComputedStyle(parent);
        const isScrollable = computedStyle.overflow === 'auto' || 
                           computedStyle.overflow === 'scroll' ||
                           computedStyle.overflowY === 'auto' ||
                           computedStyle.overflowY === 'scroll' ||
                           computedStyle.overflowX === 'auto' ||
                           computedStyle.overflowX === 'scroll';
        
        if (isScrollable) {
          parent.addEventListener('scroll', scrollHandler, { passive: true });
          console.log('Added scroll listener to:', parent.tagName, parent.className);
        }
        parent = parent.parentElement;
      }
    }
    
    // Store the handler for cleanup
    this.scrollHandler = scrollHandler;
  }

  private addIntersectionObserver(): void {
    if (!isPlatformBrowser(this.platformId) || !this.hideOnTriggerOutOfView()) return;
    
    const triggerEl = this.getTriggerElement();
    if (!triggerEl) return;

    // Create intersection observer to detect when trigger goes out of view
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting && this.overlayRef?.hasAttached()) {
          console.log('Intersection Observer: Trigger out of view, closing popover');
          this.close();
        }
      },
      {
        threshold: 0.5, // Trigger when less than 50% visible
        rootMargin: '0px'
      }
    );

    this.intersectionObserver.observe(triggerEl);
  }

  private removeIntersectionObserver(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = undefined;
    }
  }

  private removeScrollListener(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
      document.removeEventListener('scroll', this.scrollHandler);
      document.body.removeEventListener('scroll', this.scrollHandler);
      
      // Remove listeners from scrollable parents
      const triggerEl = this.getTriggerElement();
      if (triggerEl) {
        let parent = triggerEl.parentElement;
        while (parent && parent !== document.documentElement) {
          const computedStyle = window.getComputedStyle(parent);
          const isScrollable = computedStyle.overflow === 'auto' || 
                             computedStyle.overflow === 'scroll' ||
                             computedStyle.overflowY === 'auto' ||
                             computedStyle.overflowY === 'scroll' ||
                             computedStyle.overflowX === 'auto' ||
                             computedStyle.overflowX === 'scroll';
          
          if (isScrollable) {
            parent.removeEventListener('scroll', this.scrollHandler);
          }
          parent = parent.parentElement;
        }
      }
      
      this.scrollHandler = undefined;
    }
  }

  /**
   * Forces the popover to recalculate and update its position
   * Useful for manual repositioning when content changes
   */
  public updatePosition(): void {
    if (this.overlayRef && this.positionStrategy) {
      this.positionStrategy.reapplyLastPosition();
    }
  }

  /**
   * Checks if an element is visible in the viewport
   * Uses a stricter approach - element must be at least 50% visible
   */
  private isElementInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    // Check if element is completely out of viewport
    if (rect.bottom < 0 || rect.top > windowHeight || rect.right < 0 || rect.left > windowWidth) {
      return false;
    }
    
    // Calculate visible area
    const visibleTop = Math.max(rect.top, 0);
    const visibleBottom = Math.min(rect.bottom, windowHeight);
    const visibleLeft = Math.max(rect.left, 0);
    const visibleRight = Math.min(rect.right, windowWidth);
    
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    const visibleWidth = Math.max(0, visibleRight - visibleLeft);
    const visibleArea = visibleHeight * visibleWidth;
    
    const totalArea = rect.height * rect.width;
    
    // Require at least 50% of the element to be visible
    const visibilityRatio = totalArea > 0 ? visibleArea / totalArea : 0;
    return visibilityRatio >= 0.5;
  }

  private getTriggerElement(): HTMLElement {
    const trigger = this.triggerElement();
    return trigger instanceof ElementRef ? trigger.nativeElement : trigger;
  }

  private getPositions(): ConnectedPosition[] {
    const offset = this.offset();
    const side = this.side();
    const align = this.align();

    const positions: ConnectedPosition[] = [];

    // Primary position based on side and align with improved centering
    switch (side) {
      case 'top':
        positions.push({
          originX: align === 'start' ? 'start' : align === 'end' ? 'end' : 'center',
          originY: 'top',
          overlayX: align === 'start' ? 'start' : align === 'end' ? 'end' : 'center',
          overlayY: 'bottom',
          offsetY: -offset,
          offsetX: 0
        });
        break;
      case 'bottom':
        positions.push({
          originX: align === 'start' ? 'start' : align === 'end' ? 'end' : 'center',
          originY: 'bottom',
          overlayX: align === 'start' ? 'start' : align === 'end' ? 'end' : 'center',
          overlayY: 'top',
          offsetY: offset,
          offsetX: 0
        });
        break;
      case 'left':
        positions.push({
          originX: 'start',
          originY: align === 'start' ? 'top' : align === 'end' ? 'bottom' : 'center',
          overlayX: 'end',
          overlayY: align === 'start' ? 'top' : align === 'end' ? 'bottom' : 'center',
          offsetX: -offset,
          offsetY: 0
        });
        break;
      case 'right':
        positions.push({
          originX: 'end',
          originY: align === 'start' ? 'top' : align === 'end' ? 'bottom' : 'center',
          overlayX: 'start',
          overlayY: align === 'start' ? 'top' : align === 'end' ? 'bottom' : 'center',
          offsetX: offset,
          offsetY: 0
        });
        break;
    }

    // Enhanced fallback positions for better edge case handling
    if (this.avoidCollisions()) {
      // Add opposite side with same alignment (only if not left/right)
      if (side === 'top' || side === 'bottom') {
        const oppositeSide = this.getOppositeSide(side);
        this.addPositionForSide(positions, oppositeSide, align, offset);
      }

      // For left/right, be more conservative with fallbacks
      if (side === 'left' || side === 'right') {
        // Only add the opposite side as fallback
        const oppositeSide = this.getOppositeSide(side);
        this.addPositionForSide(positions, oppositeSide, align, offset);
        
        // Add top/bottom only if there's really no space
        this.addPositionForSide(positions, 'bottom', 'center', offset);
        this.addPositionForSide(positions, 'top', 'center', offset);
      } else {
        // For top/bottom, add left/right as fallbacks
        this.addPositionForSide(positions, 'left', align, offset);
        this.addPositionForSide(positions, 'right', align, offset);
        
        // Add alternative alignments for the primary side
        const alternativeAligns: PopoverAlign[] = align === 'start' ? ['center', 'end'] :
                                                  align === 'end' ? ['center', 'start'] :
                                                  ['start', 'end'];

        for (const altAlign of alternativeAligns) {
          this.addPositionForSide(positions, side, altAlign, offset);
        }
      }

      // Add corner-specific positions for edge cases (only for top/bottom)
      if (side === 'top' || side === 'bottom') {
        this.addCornerPositions(positions, offset);
      }
    }

    return positions;
  }

  private addPositionForSide(positions: ConnectedPosition[], side: PopoverSide, align: PopoverAlign, offset: number): void {
    switch (side) {
      case 'top':
        positions.push({
          originX: align === 'start' ? 'start' : align === 'end' ? 'end' : 'center',
          originY: 'top',
          overlayX: align === 'start' ? 'start' : align === 'end' ? 'end' : 'center',
          overlayY: 'bottom',
          offsetY: -offset,
          offsetX: 0
        });
        break;
      case 'bottom':
        positions.push({
          originX: align === 'start' ? 'start' : align === 'end' ? 'end' : 'center',
          originY: 'bottom',
          overlayX: align === 'start' ? 'start' : align === 'end' ? 'end' : 'center',
          overlayY: 'top',
          offsetY: offset,
          offsetX: 0
        });
        break;
      case 'left':
        positions.push({
          originX: 'start',
          originY: align === 'start' ? 'top' : align === 'end' ? 'bottom' : 'center',
          overlayX: 'end',
          overlayY: align === 'start' ? 'top' : align === 'end' ? 'bottom' : 'center',
          offsetX: -offset,
          offsetY: 0
        });
        break;
      case 'right':
        positions.push({
          originX: 'end',
          originY: align === 'start' ? 'top' : align === 'end' ? 'bottom' : 'center',
          overlayX: 'start',
          overlayY: align === 'start' ? 'top' : align === 'end' ? 'bottom' : 'center',
          offsetX: offset,
          offsetY: 0
        });
        break;
    }
  }

  private addCornerPositions(positions: ConnectedPosition[], offset: number): void {
    // Top-left corner optimization
    positions.push({
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: offset
    });

    // Top-right corner optimization
    positions.push({
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: offset
    });

    // Bottom-left corner optimization
    positions.push({
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -offset
    });

    // Bottom-right corner optimization
    positions.push({
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: -offset
    });

    // Left edge optimization
    positions.push({
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: offset
    });

    // Right edge optimization
    positions.push({
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -offset
    });
  }

  private updateActualPosition(connectionPair: ConnectedPosition): void {
    // Determine actual side and align from the connection pair
    let actualSide: PopoverSide = 'bottom';
    let actualAlign: PopoverAlign = 'center';

    // Determine side
    if (connectionPair.overlayY === 'bottom') {
      actualSide = 'top';
    } else if (connectionPair.overlayY === 'top') {
      actualSide = 'bottom';
    } else if (connectionPair.overlayX === 'end') {
      actualSide = 'left';
    } else if (connectionPair.overlayX === 'start') {
      actualSide = 'right';
    }

    // Determine align
    if (actualSide === 'top' || actualSide === 'bottom') {
      if (connectionPair.overlayX === 'start') {
        actualAlign = 'start';
      } else if (connectionPair.overlayX === 'end') {
        actualAlign = 'end';
      } else {
        actualAlign = 'center';
      }
    } else {
      if (connectionPair.overlayY === 'top') {
        actualAlign = 'start';
      } else if (connectionPair.overlayY === 'bottom') {
        actualAlign = 'end';
      } else {
        actualAlign = 'center';
      }
    }

    this.actualSide.set(actualSide);
    this.actualAlign.set(actualAlign);
  }

  private getOppositeSide(side: PopoverSide): PopoverSide {
    const opposites: Record<PopoverSide, PopoverSide> = {
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left'
    };
    return opposites[side];
  }

  private moveContentToPopover(): void {
    if (this.contentContainer && this.contentCapture) {
      const captureElement = this.contentCapture.nativeElement;
      const containerElement = this.contentContainer.nativeElement;

      // Move all child nodes from capture to container
      while (captureElement.firstChild) {
        containerElement.appendChild(captureElement.firstChild);
      }
    }
  }

  private moveContentBack(): void {
    if (this.contentContainer && this.contentCapture) {
      const captureElement = this.contentCapture.nativeElement;
      const containerElement = this.contentContainer.nativeElement;

      // Move all child nodes back from container to capture
      while (containerElement.firstChild) {
        captureElement.appendChild(containerElement.firstChild);
      }
    }
  }

  close(): void {
    this.openChange.emit(false);
  }
}

