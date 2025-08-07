import {
  Component,
  ViewChild,
  ElementRef,
  computed,
  effect,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  inject,
  signal,
  input,
  output,
  Injectable,
  InjectionToken,
  Injector
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { cn } from '../../utils/cn';

/**
 * Toast configuration interface
 */
export interface ToastConfig {
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number; // in milliseconds, 0 for persistent
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  showClose?: boolean;
  showIcon?: boolean;
  pauseOnHover?: boolean;
  onClick?: () => void;
  onClose?: () => void;
  id?: string;
  className?: string;
}

/**
 * Internal toast item interface
 */
export interface ToastItem extends Required<ToastConfig> {
  id: string;
  createdAt: number;
  isVisible: boolean;
  isPaused: boolean;
  progress: number;
  remainingDuration: number; // Tracks remaining time in milliseconds
}

/**
 * Toast component variants using Class Variance Authority (CVA)
 * Provides consistent styling patterns with Tailwind CSS
 *
 * Variants:
 * - default: Standard toast with neutral styling
 * - success: Green toast for success messages
 * - error: Red toast for error messages
 * - warning: Yellow toast for warning messages
 * - info: Blue toast for informational messages
 */
const toastVariants = cva(
  [
    'relative flex items-start gap-3 p-4 rounded-lg shadow-lg border',
    'backdrop-blur-sm transition-all duration-200 ease-in-out',
    'min-w-[300px] max-w-[500px] overflow-hidden',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-background/95 border-border text-foreground',
          'focus:ring-ring',
        ],
        success: [
          'bg-green-50/95 dark:bg-green-900/95 border-green-200 dark:border-green-800',
          'text-green-900 dark:text-green-100',
          'focus:ring-green-500',
        ],
        error: [
          'bg-red-50/95 dark:bg-red-900/95 border-red-200 dark:border-red-800',
          'text-red-900 dark:text-red-100',
          'focus:ring-red-500',
        ],
        warning: [
          'bg-yellow-50/95 dark:bg-yellow-900/95 border-yellow-200 dark:border-yellow-800',
          'text-yellow-900 dark:text-yellow-100',
          'focus:ring-yellow-500',
        ],
        info: [
          'bg-blue-50/95 dark:bg-blue-900/95 border-blue-200 dark:border-blue-800',
          'text-blue-900 dark:text-blue-100',
          'focus:ring-blue-500',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Toast container variants for positioning
 */
const toastContainerVariants = cva(
  [
    'fixed z-50 flex flex-col gap-2 p-4 pointer-events-none',
    'max-h-screen overflow-hidden',
  ],
  {
    variants: {
      position: {
        'top-left': 'top-0 left-0',
        'top-center': 'top-0 left-1/2 -translate-x-1/2',
        'top-right': 'top-0 right-0',
        'bottom-left': 'bottom-0 left-0',
        'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
        'bottom-right': 'bottom-0 right-0',
      },
    },
    defaultVariants: {
      position: 'top-right',
    },
  }
);

export type ToastVariantProps = VariantProps<typeof toastVariants>;
export type ToastContainerVariantProps = VariantProps<typeof toastContainerVariants>;

/**
 * Toast Service for managing toast notifications globally
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService implements OnDestroy {
  private readonly toasts = signal<ToastItem[]>([]);
  private readonly defaultDuration = 5000; // 5 seconds
  private idCounter = 0;
  private timerInterval?: number;
  private readonly timerFrequency = 50; // Update every 50ms for smooth progress

  // Public readonly signal for components to subscribe to
  readonly toastList = this.toasts.asReadonly();

  constructor() {
    this.startGlobalTimer();
  }

  /**
   * Start the global timer that manages all toast lifecycles
   */
  private startGlobalTimer(): void {
    this.timerInterval = window.setInterval(() => {
      this.updateAllToasts();
    }, this.timerFrequency);
  }

  /**
   * Update all active toasts - progress and auto-dismiss
   */
  private updateAllToasts(): void {
    const currentTime = Date.now();

    this.toasts.update(toasts => {
      return toasts.map(toast => {
        // Skip paused toasts
        if (toast.isPaused || toast.duration <= 0) {
          return toast;
        }

        // Calculate new remaining duration
        const newRemainingDuration = Math.max(0, toast.remainingDuration - this.timerFrequency);

        // Calculate progress percentage
        const progress = toast.duration > 0
          ? Math.min(100, ((toast.duration - newRemainingDuration) / toast.duration) * 100)
          : 0;

        // Check if toast should be dismissed
        if (newRemainingDuration <= 0 && toast.duration > 0) {
          // Schedule dismissal on next tick to avoid state mutation during update
          setTimeout(() => {
            this.dismiss(toast.id);
            toast.onClose();
          }, 0);
        }

        return {
          ...toast,
          remainingDuration: newRemainingDuration,
          progress: progress
        };
      });
    });
  }

  /**
   * Show a toast notification
   */
  show(config: ToastConfig): string {
    const id = config.id || `toast-${++this.idCounter}`;

    const toast: ToastItem = {
      id,
      title: config.title || '',
      description: config.description || '',
      variant: config.variant || 'default',
      duration: config.duration ?? this.defaultDuration,
      position: config.position || 'top-right',
      showClose: config.showClose ?? true,
      showIcon: config.showIcon ?? true,
      pauseOnHover: config.pauseOnHover ?? true,
      onClick: config.onClick || (() => {}),
      onClose: config.onClose || (() => {}),
      className: config.className || '',
      createdAt: Date.now(),
      isVisible: true,
      isPaused: false,
      progress: 0,
      remainingDuration: config.duration ?? this.defaultDuration,
    };

    this.toasts.update(toasts => [...toasts, toast]);

    return id;
  }

  /**
   * Show a success toast
   */
  success(title: string, description?: string, config?: Partial<ToastConfig>): string {
    return this.show({
      title,
      description,
      variant: 'success',
      ...config,
    });
  }

  /**
   * Show an error toast
   */
  error(title: string, description?: string, config?: Partial<ToastConfig>): string {
    return this.show({
      title,
      description,
      variant: 'error',
      duration: 0, // Error toasts persist by default
      ...config,
    });
  }

  /**
   * Show a warning toast
   */
  warning(title: string, description?: string, config?: Partial<ToastConfig>): string {
    return this.show({
      title,
      description,
      variant: 'warning',
      ...config,
    });
  }

  /**
   * Show an info toast
   */
  info(title: string, description?: string, config?: Partial<ToastConfig>): string {
    return this.show({
      title,
      description,
      variant: 'info',
      ...config,
    });
  }

  /**
   * Dismiss a specific toast
   */
  dismiss(id: string): void {
    this.toasts.update(toasts =>
      toasts.map(toast =>
        toast.id === id
          ? { ...toast, isVisible: false }
          : toast
      )
    );

    // Remove from DOM after animation
    setTimeout(() => {
      this.toasts.update(toasts => toasts.filter(toast => toast.id !== id));
    }, 200);
  }

  /**
   * Dismiss all toasts
   */
  dismissAll(): void {
    this.toasts.update(toasts =>
      toasts.map(toast => ({ ...toast, isVisible: false }))
    );

    // Remove all from DOM after animation
    setTimeout(() => {
      this.toasts.set([]);
    }, 200);
  }

  /**
   * Pause toast auto-dismiss
   */
  pause(id: string): void {
    this.toasts.update(toasts =>
      toasts.map(toast =>
        toast.id === id
          ? { ...toast, isPaused: true }
          : toast
      )
    );
  }

  /**
   * Resume toast auto-dismiss
   */
  resume(id: string): void {
    this.toasts.update(toasts =>
      toasts.map(toast =>
        toast.id === id
          ? { ...toast, isPaused: false }
          : toast
      )
    );
  }

  /**
   * Update toast progress (for progress indicators)
   */
  updateProgress(id: string, progress: number): void {
    this.toasts.update(toasts =>
      toasts.map(toast =>
        toast.id === id
          ? { ...toast, progress: Math.max(0, Math.min(100, progress)) }
          : toast
      )
    );
  }

  /**
   * Get toasts by position for rendering
   */
  getToastsByPosition(position: ToastItem['position']): ToastItem[] {
    return this.toasts().filter(toast => toast.position === position);
  }

  /**
   * Clean up resources
   */
  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}

/**
 * Individual Toast Component
 */
@Component({
  selector: 'Toast',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({
          transform: 'translateX(100%)',
          opacity: 0,
          scale: 0.95
        }),
        animate('200ms ease-out', style({
          transform: 'translateX(0)',
          opacity: 1,
          scale: 1
        })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({
          transform: 'translateX(100%)',
          opacity: 0,
          scale: 0.95
        })),
      ]),
    ]),
  ],
  template: `
    <div
      #toastElement
      [attr.id]="toast().id"
      [attr.role]="'alert'"
      [attr.aria-live]="toast().variant === 'error' ? 'assertive' : 'polite'"
      [attr.aria-labelledby]="toast().title ? toast().id + '-title' : null"
      [attr.aria-describedby]="toast().description ? toast().id + '-description' : null"
      [class]="computedClasses()"
      [@slideIn]="toast().isVisible"
      (click)="handleClick()"
      (mouseenter)="handleMouseEnter()"
      (mouseleave)="handleMouseLeave()"
      (keydown)="handleKeyDown($event)"
      [attr.tabindex]="isClickable() ? '0' : null"
      style="pointer-events: auto;"
    >
      <!-- Icon -->
      @if (toast().showIcon) {
        <div class="flex-shrink-0">
          <div [class]="iconContainerClasses()">
            @switch (toast().variant) {
              @case ('success') {
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              }
              @case ('error') {
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              }
              @case ('warning') {
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              }
              @case ('info') {
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              }
              @default {
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              }
            }
          </div>
        </div>
      }

      <!-- Content -->
      <div class="flex-1 min-w-0">
        @if (toast().title) {
          <h4
            [id]="toast().id + '-title'"
            class="font-semibold text-sm mb-1"
          >
            {{ toast().title }}
          </h4>
        }

        @if (toast().description) {
          <p
            [id]="toast().id + '-description'"
            class="text-sm opacity-90"
          >
            {{ toast().description }}
          </p>
        }
      </div>

      <!-- Close Button -->
      @if (toast().showClose) {
        <button
          type="button"
          (click)="handleClose($event)"
          class="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current"
          [attr.aria-label]="'Close notification'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      }

      <!-- Progress Bar -->
      @if (toast().duration > 0 && showProgress()) {
        <div class="absolute bottom-0 left-0 right-0 h-1 bg-black/10 dark:bg-white/10 overflow-hidden">
          <div
            class="h-full bg-current transition-all duration-100 ease-linear"
            [style.width.%]="progressWidth()"
          ></div>
        </div>
      }
    </div>
  `,
})
export class ToastComponent {
  @ViewChild('toastElement') toastElement!: ElementRef<HTMLDivElement>;

  // Input properties
  readonly toast = input.required<ToastItem>();
  readonly showProgress = input<boolean>(true);

  // Output events
  readonly dismiss = output<string>();
  readonly click = output<string>();
  readonly pause = output<string>();
  readonly resume = output<string>();

  // Computed properties
  readonly computedClasses = computed(() =>
    cn(
      toastVariants({
        variant: this.toast().variant,
      }),
      this.toast().className
    )
  );

  readonly iconContainerClasses = computed(() => {
    const variant = this.toast().variant;
    const baseClasses = 'w-6 h-6 rounded-full flex items-center justify-center';

    switch (variant) {
      case 'success':
        return `${baseClasses} bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300`;
      case 'error':
        return `${baseClasses} bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300`;
      case 'warning':
        return `${baseClasses} bg-yellow-100 dark:bg-yellow-800 text-yellow-600 dark:text-yellow-300`;
      case 'info':
        return `${baseClasses} bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300`;
      default:
        return `${baseClasses} bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300`;
    }
  });

  readonly progressWidth = computed(() => {
    return this.toast().progress;
  });

  readonly isClickable = computed(() => {
    const onClick = this.toast().onClick;
    return onClick && onClick.toString() !== '() => {}';
  });

  // Event handlers
  handleClick(): void {
    if (this.toast().onClick) {
      this.toast().onClick();
      this.click.emit(this.toast().id);
    }
  }

  handleClose(event: Event): void {
    event.stopPropagation();
    this.dismiss.emit(this.toast().id);
  }

  handleMouseEnter(): void {
    if (this.toast().pauseOnHover) {
      this.pause.emit(this.toast().id);
    }
  }

  handleMouseLeave(): void {
    if (this.toast().pauseOnHover) {
      this.resume.emit(this.toast().id);
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.handleClose(event);
    }
  }
}

/**
 * Toast Container Component for positioning toasts
 */
@Component({
  selector: 'ToastContainer',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (position of positions; track position) {
      @if (getToastsByPosition(position).length > 0) {
        <div [class]="getContainerClasses(position)">
          @for (toast of getToastsByPosition(position); track toast.id) {
            <Toast
              [toast]="toast"
              [showProgress]="showProgress()"
              (dismiss)="handleDismiss($event)"
              (click)="handleClick($event)"
              (pause)="handlePause($event)"
              (resume)="handleResume($event)"
            />
          }
        </div>
      }
    }
  `,
})
export class ToastContainer {
  private toastService = inject(ToastService);

  // Input properties
  readonly showProgress = input<boolean>(true);
  readonly maxToasts = input<number>(5);

  // All possible positions
  readonly positions: ToastItem['position'][] = [
    'top-left', 'top-center', 'top-right',
    'bottom-left', 'bottom-center', 'bottom-right'
  ];

  // Get toasts by position
  getToastsByPosition(position: ToastItem['position']): ToastItem[] {
    return this.toastService.getToastsByPosition(position)
      .filter(toast => toast.isVisible)
      .slice(0, this.maxToasts());
  }

  // Get container classes for position
  getContainerClasses(position: ToastItem['position']): string {
    return cn(toastContainerVariants({ position }));
  }

  // Event handlers
  handleDismiss(id: string): void {
    this.toastService.dismiss(id);
  }

  handleClick(id: string): void {
    // Handle click if needed
  }

  handlePause(id: string): void {
    this.toastService.pause(id);
  }

  handleResume(id: string): void {
    this.toastService.resume(id);
  }
}
