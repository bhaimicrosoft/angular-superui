import { 
  Component, 
  input, 
  output, 
  computed, 
  signal, 
  Injectable, 
  inject,
  effect,
  HostListener,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnDestroy,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Directive,
  TemplateRef,
  ViewContainerRef,
  ComponentRef,
  ApplicationRef,
  Injector,
  createComponent
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  Overlay, 
  OverlayRef, 
  OverlayPositionBuilder, 
  ConnectedPosition,
  FlexibleConnectedPositionStrategy
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { cva, type VariantProps } from 'class-variance-authority';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type TooltipPosition = 
  | 'top' 
  | 'top-start' 
  | 'top-end'
  | 'bottom' 
  | 'bottom-start' 
  | 'bottom-end'
  | 'left' 
  | 'left-start' 
  | 'left-end'
  | 'right' 
  | 'right-start' 
  | 'right-end';

export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';

export type TooltipVariant = 'default' | 'dark' | 'light' | 'success' | 'warning' | 'error' | 'info';

export type TooltipSize = 'sm' | 'md' | 'lg';

export interface TooltipConfig {
  position?: TooltipPosition;
  trigger?: TooltipTrigger;
  variant?: TooltipVariant;
  size?: TooltipSize;
  content?: string | TemplateRef<any>;
  showDelay?: number;
  hideDelay?: number;
  showArrow?: boolean;
  disabled?: boolean;
  interactive?: boolean;
  maxWidth?: string;
  animation?: boolean;
  offset?: number;
  customClass?: string;
}

export interface TooltipState {
  id: string;
  isVisible: boolean;
  triggerElement: HTMLElement;
  config: Required<TooltipConfig>;
  overlayRef?: OverlayRef;
  actualPosition: TooltipPosition;
}

// Position mapping for CDK overlay
const POSITION_MAP: Record<TooltipPosition, ConnectedPosition> = {
  top: {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -8
  },
  'top-start': {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: -8
  },
  'top-end': {
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
    offsetY: -8
  },
  bottom: {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: 8
  },
  'bottom-start': {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: 8
  },
  'bottom-end': {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
    offsetY: 8
  },
  left: {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
    offsetX: -8
  },
  'left-start': {
    originX: 'start',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'top',
    offsetX: -8
  },
  'left-end': {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'bottom',
    offsetX: -8
  },
  right: {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: 8
  },
  'right-start': {
    originX: 'end',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'top',
    offsetX: 8
  },
  'right-end': {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetX: 8
  }
};

// ============================================================================
// CVA STYLING
// ============================================================================

const tooltipVariants = cva(
  [
    'relative px-3 py-2 text-sm font-medium rounded-lg shadow-lg',
    'transition-all duration-200 ease-in-out transform-gpu',
    'pointer-events-auto backdrop-blur-sm',
    'border border-solid',
    'max-w-xs break-words',
    'whitespace-normal'
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-gray-900/90 text-white border-gray-700',
          'dark:bg-gray-800/90 dark:border-gray-600'
        ],
        dark: [
          'bg-gray-900/95 text-white border-gray-700'
        ],
        light: [
          'bg-white/95 text-gray-900 border-gray-200 shadow-xl',
          'dark:bg-gray-100/95 dark:text-gray-900 dark:border-gray-300'
        ],
        success: [
          'bg-green-600/90 text-white border-green-500',
          'dark:bg-green-700/90 dark:border-green-600'
        ],
        warning: [
          'bg-yellow-600/90 text-white border-yellow-500',
          'dark:bg-yellow-700/90 dark:border-yellow-600'
        ],
        error: [
          'bg-red-600/90 text-white border-red-500',
          'dark:bg-red-700/90 dark:border-red-600'
        ],
        info: [
          'bg-blue-600/90 text-white border-blue-500',
          'dark:bg-blue-700/90 dark:border-blue-600'
        ]
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-2 text-sm',
        lg: 'px-4 py-3 text-base'
      },
      state: {
        hidden: 'opacity-0 scale-95 pointer-events-none',
        visible: 'opacity-100 scale-100 pointer-events-auto'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'hidden'
    }
  }
);

const arrowVariants = cva(
  [
    'absolute w-2 h-2 transform rotate-45 border-solid'
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-gray-900/90 border-gray-700',
          'dark:bg-gray-800/90 dark:border-gray-600'
        ],
        dark: [
          'bg-gray-900/95 border-gray-700'
        ],
        light: [
          'bg-white/95 border-gray-200',
          'dark:bg-gray-100/95 dark:border-gray-300'
        ],
        success: [
          'bg-green-600/90 border-green-500',
          'dark:bg-green-700/90 dark:border-green-600'
        ],
        warning: [
          'bg-yellow-600/90 border-yellow-500',
          'dark:bg-yellow-700/90 dark:border-yellow-600'
        ],
        error: [
          'bg-red-600/90 border-red-500',
          'dark:bg-red-700/90 dark:border-red-600'
        ],
        info: [
          'bg-blue-600/90 border-blue-500',
          'dark:bg-blue-700/90 dark:border-blue-600'
        ]
      },
      position: {
        'top': '-bottom-1 left-1/2 -translate-x-1/2 border-t border-l',
        'top-start': '-bottom-1 left-3 border-t border-l',
        'top-end': '-bottom-1 right-3 border-t border-l',
        'bottom': '-top-1 left-1/2 -translate-x-1/2 border-b border-r',
        'bottom-start': '-top-1 left-3 border-b border-r',
        'bottom-end': '-top-1 right-3 border-b border-r',
        'left': '-right-1 top-1/2 -translate-y-1/2 border-l border-b',
        'left-start': '-right-1 top-3 border-l border-b',
        'left-end': '-right-1 bottom-3 border-l border-b',
        'right': '-left-1 top-1/2 -translate-y-1/2 border-r border-t',
        'right-start': '-left-1 top-3 border-r border-t',
        'right-end': '-left-1 bottom-3 border-r border-t'
      }
    },
    defaultVariants: {
      variant: 'default',
      position: 'top'
    }
  }
);

// ============================================================================
// TOOLTIP SERVICE
// ============================================================================

@Injectable({
  providedIn: 'root'
})
export class TooltipService implements OnDestroy {
  private overlay = inject(Overlay);
  private positionBuilder = inject(OverlayPositionBuilder);
  
  // Active tooltips registry
  private activeTooltips = signal<Map<string, TooltipState>>(new Map());
  
  // Default configuration
  private defaultConfig: Required<TooltipConfig> = {
    position: 'top',
    trigger: 'hover',
    variant: 'default',
    size: 'md',
    content: '',
    showDelay: 300,
    hideDelay: 100,
    showArrow: true,
    disabled: false,
    interactive: false,
    maxWidth: '320px',
    animation: true,
    offset: 8,
    customClass: ''
  };

  // Timer management for delayed show/hide
  private timers = new Map<string, { show?: any; hide?: any }>();

  // Global click listener for click-outside behavior
  private documentClickListener?: (event: Event) => void;

  constructor() {
    // Setup global listeners
    this.setupGlobalListeners();
  }

  ngOnDestroy(): void {
    this.hideAll();
    this.clearAllTimers();
    this.removeGlobalListeners();
  }

  /**
   * Show tooltip with given configuration
   */
  show(triggerElement: HTMLElement, config: Partial<TooltipConfig>): string {
    const id = this.generateId();
    const fullConfig = { ...this.defaultConfig, ...config };
    
    if (fullConfig.disabled) {
      return id;
    }

    // Clear any existing timer for this element
    this.clearTimer(id);

    // Handle delay
    if (fullConfig.showDelay > 0) {
      const timer = setTimeout(() => {
        this.showImmediate(id, triggerElement, fullConfig);
      }, fullConfig.showDelay);
      
      this.timers.set(id, { show: timer });
    } else {
      this.showImmediate(id, triggerElement, fullConfig);
    }

    return id;
  }

  /**
   * Hide tooltip by ID
   */
  hide(id: string): void {
    const tooltip = this.activeTooltips().get(id);
    if (!tooltip) return;

    this.clearTimer(id);

    if (tooltip.config.hideDelay > 0) {
      const timer = setTimeout(() => {
        this.hideImmediate(id);
      }, tooltip.config.hideDelay);
      
      const existingTimers = this.timers.get(id) || {};
      this.timers.set(id, { ...existingTimers, hide: timer });
    } else {
      this.hideImmediate(id);
    }
  }

  /**
   * Hide all tooltips immediately
   */
  hideAll(): void {
    const tooltips = this.activeTooltips();
    tooltips.forEach((_, id) => {
      this.hideImmediate(id);
    });
  }

  /**
   * Update tooltip content
   */
  updateContent(id: string, content: string | TemplateRef<any>): void {
    const tooltips = this.activeTooltips();
    const tooltip = tooltips.get(id);
    
    if (tooltip) {
      tooltip.config.content = content;
      this.activeTooltips.set(new Map(tooltips.set(id, tooltip)));
    }
  }

  /**
   * Check if tooltip is visible
   */
  isVisible(id: string): boolean {
    return this.activeTooltips().get(id)?.isVisible ?? false;
  }

  /**
   * Get all active tooltips (for debugging)
   */
  getActiveTooltips() {
    return this.activeTooltips();
  }

  // ============================================================================
  // PRIVATE METHODS
  // ============================================================================

  private showImmediate(id: string, triggerElement: HTMLElement, config: Required<TooltipConfig>): void {
    // Create overlay
    const overlayRef = this.createOverlay(triggerElement, config);
    
    // Create tooltip portal and attach
    const tooltipPortal = new ComponentPortal(TooltipComponent);
    const tooltipRef = overlayRef.attach(tooltipPortal);
    
    // Configure tooltip component
    tooltipRef.instance.tooltipId.set(id);
    tooltipRef.instance.config.set(config);
    
    const tooltipState: TooltipState = {
      id,
      isVisible: true,
      triggerElement,
      config,
      overlayRef,
      actualPosition: config.position
    };

    // Update state
    const tooltips = new Map(this.activeTooltips());
    tooltips.set(id, tooltipState);
    this.activeTooltips.set(tooltips);

    // Clear show timer
    const timers = this.timers.get(id);
    if (timers?.show) {
      clearTimeout(timers.show);
    }
  }

  private hideImmediate(id: string): void {
    const tooltips = new Map(this.activeTooltips());
    const tooltip = tooltips.get(id);
    
    if (tooltip?.overlayRef) {
      tooltip.overlayRef.dispose();
    }
    
    tooltips.delete(id);
    this.activeTooltips.set(tooltips);
    
    this.clearTimer(id);
  }

  private createOverlay(triggerElement: HTMLElement, config: Required<TooltipConfig>): OverlayRef {
    // Get the preferred position and fallbacks
    const positions = this.getPositions(config.position, config.offset);
    
    // Create position strategy
    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(triggerElement)
      .withPositions(positions)
      .withViewportMargin(8)
      .withPush(true);

    // Create overlay configuration
    const overlayConfig = {
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false,
      panelClass: ['tooltip-overlay-panel']
    };

    return this.overlay.create(overlayConfig);
  }

  private getPositions(position: TooltipPosition, offset: number): ConnectedPosition[] {
    // Get primary position
    const primaryPosition = { ...POSITION_MAP[position] };
    
    // Apply custom offset
    if (primaryPosition.offsetX !== undefined) {
      primaryPosition.offsetX = primaryPosition.offsetX > 0 ? offset : -offset;
    }
    if (primaryPosition.offsetY !== undefined) {
      primaryPosition.offsetY = primaryPosition.offsetY > 0 ? offset : -offset;
    }

    // Define fallback positions for better collision handling
    const fallbackPositions: ConnectedPosition[] = [];
    
    if (position.startsWith('top')) {
      fallbackPositions.push(
        { ...POSITION_MAP.bottom, offsetY: offset },
        { ...POSITION_MAP.left, offsetX: -offset },
        { ...POSITION_MAP.right, offsetX: offset }
      );
    } else if (position.startsWith('bottom')) {
      fallbackPositions.push(
        { ...POSITION_MAP.top, offsetY: -offset },
        { ...POSITION_MAP.left, offsetX: -offset },
        { ...POSITION_MAP.right, offsetX: offset }
      );
    } else if (position.startsWith('left')) {
      fallbackPositions.push(
        { ...POSITION_MAP.right, offsetX: offset },
        { ...POSITION_MAP.top, offsetY: -offset },
        { ...POSITION_MAP.bottom, offsetY: offset }
      );
    } else if (position.startsWith('right')) {
      fallbackPositions.push(
        { ...POSITION_MAP.left, offsetX: -offset },
        { ...POSITION_MAP.top, offsetY: -offset },
        { ...POSITION_MAP.bottom, offsetY: offset }
      );
    }

    return [primaryPosition, ...fallbackPositions];
  }

  private clearTimer(id: string): void {
    const timers = this.timers.get(id);
    if (timers) {
      if (timers.show) clearTimeout(timers.show);
      if (timers.hide) clearTimeout(timers.hide);
      this.timers.delete(id);
    }
  }

  private clearAllTimers(): void {
    this.timers.forEach((timers) => {
      if (timers.show) clearTimeout(timers.show);
      if (timers.hide) clearTimeout(timers.hide);
    });
    this.timers.clear();
  }

  private generateId(): string {
    return `tooltip-${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupGlobalListeners(): void {
    this.documentClickListener = (event: Event) => {
      const tooltips = this.activeTooltips();
      tooltips.forEach((tooltip, id) => {
        if (tooltip.config.trigger === 'click' && 
            !tooltip.triggerElement.contains(event.target as Node)) {
          this.hide(id);
        }
      });
    };
    
    document.addEventListener('click', this.documentClickListener);
  }

  private removeGlobalListeners(): void {
    if (this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener);
    }
  }
}

// ============================================================================
// TOOLTIP COMPONENT
// ============================================================================

@Component({
  selector: 'Tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Content -->
    <div 
      [class]="tooltipClasses()"
      [style.max-width]="maxWidth()"
      (mouseenter)="onTooltipMouseEnter()"
      (mouseleave)="onTooltipMouseLeave()"
    >
      <div class="relative z-10">
        @if (isTemplateContent()) {
          <ng-container *ngTemplateOutlet="getTemplate()"></ng-container>
        } @else {
          {{ getStringContent() }}
        }
      </div>
      
      <!-- Arrow -->
      @if (showArrow()) {
        <div [class]="arrowClasses()"></div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TooltipComponent implements OnInit, OnDestroy {
  // Inputs - these will be set by the service
  tooltipId = signal<string>('');
  config = signal<Required<TooltipConfig> | undefined>(undefined);
  
  // Internal signals
  private tooltipService = inject(TooltipService);
  
  // Computed properties
  tooltipState = computed(() => {
    const id = this.tooltipId();
    return this.tooltipService.getActiveTooltips().get(id);
  });
  
  isVisible = computed(() => this.tooltipState()?.isVisible ?? false);
  actualPosition = computed(() => this.tooltipState()?.actualPosition ?? 'top');
  
  showArrow = computed(() => this.config()?.showArrow ?? true);
  maxWidth = computed(() => this.config()?.maxWidth ?? '320px');
  
  // Styling
  tooltipClasses = computed(() => {
    const config = this.config();
    if (!config) return '';
    
    return tooltipVariants({
      variant: config.variant,
      size: config.size,
      state: this.isVisible() ? 'visible' : 'hidden'
    }) + (config.customClass ? ` ${config.customClass}` : '');
  });
  
  arrowClasses = computed(() => {
    const config = this.config();
    if (!config) return '';
    
    return arrowVariants({
      variant: config.variant,
      position: this.actualPosition()
    });
  });

  ngOnInit(): void {
    // Component initialization
  }

  ngOnDestroy(): void {
    // Cleanup handled by service
  }

  // Content helpers
  isTemplateContent(): boolean {
    const content = this.config()?.content;
    return content instanceof TemplateRef;
  }

  getTemplate(): TemplateRef<any> | null {
    const content = this.config()?.content;
    return content instanceof TemplateRef ? content : null;
  }

  getStringContent(): string {
    const content = this.config()?.content;
    return typeof content === 'string' ? content : '';
  }

  // Event handlers
  onTooltipMouseEnter(): void {
    const config = this.config();
    if (config?.interactive && config?.trigger === 'hover') {
      // Keep tooltip visible when hovering over it
    }
  }

  onTooltipMouseLeave(): void {
    const config = this.config();
    if (config?.interactive && config?.trigger === 'hover') {
      this.tooltipService.hide(this.tooltipId());
    }
  }
}

// ============================================================================
// TOOLTIP DIRECTIVE
// ============================================================================

@Directive({
  selector: '[tooltip]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(click)': 'onClick()',
    '(focusin)': 'onFocusIn()',
    '(focusout)': 'onFocusOut()'
  }
})
export class TooltipDirective implements OnDestroy {
  private tooltipService = inject(TooltipService);
  private elementRef = inject(ElementRef);
  
  // Inputs
  @Input() tooltip: string | TemplateRef<any> = '';
  @Input() tooltipPosition: TooltipPosition = 'top';
  @Input() tooltipTrigger: TooltipTrigger = 'hover';
  @Input() tooltipVariant: TooltipVariant = 'default';
  @Input() tooltipSize: TooltipSize = 'md';
  @Input() tooltipShowDelay: number = 300;
  @Input() tooltipHideDelay: number = 100;
  @Input() tooltipShowArrow: boolean = true;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipInteractive: boolean = false;
  @Input() tooltipMaxWidth: string = '320px';
  @Input() tooltipAnimation: boolean = true;
  @Input() tooltipOffset: number = 8;
  @Input() tooltipClass: string = '';

  // Outputs
  @Output() tooltipShow = new EventEmitter<string>();
  @Output() tooltipHide = new EventEmitter<string>();

  private currentTooltipId?: string;

  ngOnDestroy(): void {
    if (this.currentTooltipId) {
      this.tooltipService.hide(this.currentTooltipId);
    }
  }

  // Event handlers
  onMouseEnter(): void {
    if (this.tooltipTrigger === 'hover') {
      this.showTooltip();
    }
  }

  onMouseLeave(): void {
    if (this.tooltipTrigger === 'hover' && !this.tooltipInteractive) {
      this.hideTooltip();
    }
  }

  onClick(): void {
    if (this.tooltipTrigger === 'click') {
      if (this.currentTooltipId && this.tooltipService.isVisible(this.currentTooltipId)) {
        this.hideTooltip();
      } else {
        this.showTooltip();
      }
    }
  }

  onFocusIn(): void {
    if (this.tooltipTrigger === 'focus') {
      this.showTooltip();
    }
  }

  onFocusOut(): void {
    if (this.tooltipTrigger === 'focus') {
      this.hideTooltip();
    }
  }

  // Public methods
  show(): void {
    this.showTooltip();
  }

  hide(): void {
    this.hideTooltip();
  }

  toggle(): void {
    if (this.currentTooltipId && this.tooltipService.isVisible(this.currentTooltipId)) {
      this.hideTooltip();
    } else {
      this.showTooltip();
    }
  }

  updateContent(content: string | TemplateRef<any>): void {
    this.tooltip = content;
    if (this.currentTooltipId) {
      this.tooltipService.updateContent(this.currentTooltipId, content);
    }
  }

  // Private methods
  private showTooltip(): void {
    if (this.tooltipDisabled || !this.tooltip) return;

    const config: TooltipConfig = {
      position: this.tooltipPosition,
      trigger: this.tooltipTrigger,
      variant: this.tooltipVariant,
      size: this.tooltipSize,
      content: this.tooltip,
      showDelay: this.tooltipShowDelay,
      hideDelay: this.tooltipHideDelay,
      showArrow: this.tooltipShowArrow,
      disabled: this.tooltipDisabled,
      interactive: this.tooltipInteractive,
      maxWidth: this.tooltipMaxWidth,
      animation: this.tooltipAnimation,
      offset: this.tooltipOffset,
      customClass: this.tooltipClass
    };

    this.currentTooltipId = this.tooltipService.show(this.elementRef.nativeElement, config);
    this.tooltipShow.emit(this.currentTooltipId);
  }

  private hideTooltip(): void {
    if (this.currentTooltipId) {
      this.tooltipService.hide(this.currentTooltipId);
      this.tooltipHide.emit(this.currentTooltipId);
    }
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  tooltipVariants,
  arrowVariants,
  type VariantProps
};
