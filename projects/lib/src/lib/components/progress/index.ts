import { Component, computed, input, ChangeDetectionStrategy, signal, effect, OnDestroy, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes, AnimationEvent } from '@angular/animations';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * Progress component variants with Shadcn-style design
 * Enhanced with animations, accessibility, and customization options
 */
const progressVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-secondary transition-all duration-300',
  {
    variants: {
      size: {
        xs: 'h-1',
        sm: 'h-2',
        default: 'h-4',
        lg: 'h-6',
        xl: 'h-8',
        '2xl': 'h-10',
      },
      variant: {
        default: 'bg-secondary/80',
        primary: 'bg-blue-800/80',
        secondary: 'bg-secondary',
        success: 'bg-green-500/10',
        warning: 'bg-yellow-500/10',
        destructive: 'bg-red-500/10',
        info: 'bg-blue-500/10',
        bordered: 'bg-secondary border border-border',
        outlined: 'bg-transparent border-2 border-secondary',
        elevated: 'bg-secondary shadow-sm',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

const progressIndicatorVariants = cva(
  'h-full transition-all duration-500 ease-out rounded-full relative',
  {
    variants: {
      variant: {
        default: 'bg-foreground/80',
        primary: 'bg-primary',
        secondary: 'bg-secondary-foreground',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        destructive: 'bg-red-500',
        info: 'bg-blue-500',
        purple: 'bg-purple-500',
        pink: 'bg-pink-500',
        gradient: 'bg-gradient-to-r from-blue-500 to-purple-600',
        'gradient-success': 'bg-gradient-to-r from-green-400 to-emerald-600',
        'gradient-warning': 'bg-gradient-to-r from-yellow-400 to-orange-500',
        'gradient-danger': 'bg-gradient-to-r from-red-400 to-pink-600',
      },
      animated: {
        true: 'animate-pulse',
        false: '',
        shimmer: 'relative overflow-hidden',
        pulse: 'animate-pulse',
        bounce: 'animate-bounce',
      },
      striped: {
        true: 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:20px_20px] animate-[progress-stripes_1s_linear_infinite]',
        false: '',
      },
      glow: {
        true: 'shadow-lg shadow-current/50',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      animated: false,
      striped: false,
      glow: false,
    },
  }
);

const progressTextVariants = cva(
  'text-sm font-medium transition-colors duration-200',
  {
    variants: {
      position: {
        top: 'mb-2',
        bottom: 'mt-2',
        inside: 'absolute inset-0 flex items-center justify-center text-white text-xs font-bold',
        overlay: 'absolute inset-0 flex items-center justify-center text-primary-foreground text-xs font-bold bg-black/20 rounded-full',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      position: 'bottom',
      align: 'center',
    },
  }
);

export type ProgressVariant = VariantProps<typeof progressVariants>;
export type ProgressIndicatorVariant = VariantProps<typeof progressIndicatorVariants>;
export type ProgressTextVariant = VariantProps<typeof progressTextVariants>;

export interface ProgressAccessibility {
  /** Custom aria-label for the progress bar */
  ariaLabel?: string;
  /** Element ID that labels this progress bar */
  ariaLabelledBy?: string;
  /** Element ID that describes this progress bar */
  ariaDescribedBy?: string;
  /** Announce progress changes to screen readers */
  announceChanges?: boolean;
  /** Custom format for progress announcements */
  announceFormat?: (value: number, max: number) => string;
  /** Minimum change threshold to trigger announcements */
  announceThreshold?: number;
  /** ARIA live region politeness level */
  liveRegionPoliteness?: 'polite' | 'assertive';
  /** Whether to use atomic announcements (announce complete message) */
  atomicAnnouncements?: boolean;
  /** Custom ID for the live region (useful for multiple progress bars) */
  liveRegionId?: string;
}

export interface ProgressAnimationConfig {
  /** Enable smooth animations */
  smooth?: boolean;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Animation easing function */
  easing?: string;
  /** Enable entrance animation */
  entrance?: boolean;
  /** Enable value change animations */
  valueAnimation?: boolean;
}

@Component({
  selector: 'ProgressComponent',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('indeterminateAnimation', [
      state('false', style({ opacity: 1 })),
      state('true', style({ opacity: 1 })),
      transition('false => true', []),
      transition('true => false', [])
    ])
  ],
  styles: [`
    .progress-indeterminate {
      overflow: hidden;
      position: relative;
    }

    .progress-indeterminate::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      will-change: left, right;
      background-color: inherit;
      animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    .progress-indeterminate::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      will-change: left, right;
      background-color: inherit;
      animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
      animation-delay: 1.15s;
    }

    @keyframes indeterminate {
      0% {
        left: -35%;
        right: 100%;
      }
      60% {
        left: 100%;
        right: -90%;
      }
      100% {
        left: 100%;
        right: -90%;
      }
    }

    @keyframes indeterminate-short {
      0% {
        left: -200%;
        right: 100%;
      }
      60% {
        left: 107%;
        right: -8%;
      }
      100% {
        left: 107%;
        right: -8%;
      }
    }

    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: 200px 0; }
    }
  `],
  template: `
    <div class="w-full">
      <!-- Progress text (top) -->
      @if (showText() && textPosition() === 'top') {
        <div [class]="textClasses()">
          {{ computedText() }}
        </div>
      }
    </div>

    <!-- Progress container -->
    <div
      [class]="containerClasses()"
      role="progressbar"
      [attr.aria-valuenow]="indeterminate() ? null : value()"
      [attr.aria-valuemax]="max()"
      [attr.aria-valuemin]="0"
      [attr.aria-label]="computedAriaLabel()"
      [attr.aria-labelledby]="accessibility().ariaLabelledBy"
      [attr.aria-describedby]="accessibility().ariaDescribedBy"
      [attr.data-value]="value()"
      [attr.data-percentage]="percentage()"
      [attr.data-state]="progressState()"
    >
      <!-- Indeterminate mode with CSS animations -->
      @if (indeterminate()) {
        <div class="h-full w-full bg-primary rounded-full progress-indeterminate"></div>
      } @else {
        <!-- Regular progress indicator -->
        <div
          [class]="indicatorClasses()"
          [style.width.%]="displayPercentage()"
          [attr.data-variant]="variant()"
        >
          <!-- Shimmer effect overlay -->
          @if (animated() === 'shimmer') {
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200px_100%] animate-[shimmer_2s_infinite] rounded-full"></div>
          }

          <!-- Inside text -->
          @if (showText() && textPosition() === 'inside') {
            <div [class]="textClasses()">
              {{ computedText() }}
            </div>
          }
        </div>
      }

      <!-- Overlay text -->
      @if (showText() && textPosition() === 'overlay') {
        <div [class]="textClasses()">
          {{ computedText() }}
        </div>
      }
    </div>

    <!-- Progress text (bottom) -->
    @if (showText() && textPosition() === 'bottom') {
      <div [class]="textClasses()">
        {{ computedText() }}
      </div>
    }

    <!-- Additional info -->
    @if (showAdditionalInfo()) {
      <div class="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>{{ additionalInfoLeft() }}</span>
        <span>{{ additionalInfoRight() }}</span>
      </div>
    }
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent implements OnDestroy {
  // Core inputs
  readonly value = input<number>(0);
  readonly max = input<number>(100);
  readonly min = input<number>(0);

  // Styling inputs
  readonly size = input<ProgressVariant['size']>('default');
  readonly variant = input<ProgressIndicatorVariant['variant']>('default');
  readonly containerVariant = input<ProgressVariant['variant']>('default');
  readonly animated = input<ProgressIndicatorVariant['animated']>(false);
  readonly striped = input<ProgressIndicatorVariant['striped']>(false);
  readonly glow = input<ProgressIndicatorVariant['glow']>(false);
  readonly className = input<string>('');

  // Text configuration
  readonly showText = input<boolean>(false);
  readonly textPosition = input<ProgressTextVariant['position']>('bottom');
  readonly textAlign = input<ProgressTextVariant['align']>('center');
  readonly textFormat = input<((value: number, max: number) => string) | undefined>(undefined);
  readonly customText = input<string>('');

  // Additional features
  readonly showAdditionalInfo = input<boolean>(false);
  readonly additionalInfoLeft = input<string>('');
  readonly additionalInfoRight = input<string>('');
  readonly indeterminate = input<boolean>(false);
  readonly reversed = input<boolean>(false);

  // Accessibility
  readonly accessibility = input<ProgressAccessibility>({});
  readonly ariaLabel = input<string>('');

  // Animation configuration
  readonly animationConfig = input<ProgressAnimationConfig>({
    smooth: true,
    duration: 500,
    easing: 'ease-out',
    entrance: false,
    valueAnimation: true,
  });

  // Internal state
  private readonly previousValue = signal<number>(0);
  private readonly isInitialized = signal<boolean>(false);

  // Computed properties
  readonly containerClasses = computed(() =>
    cn(
      progressVariants({
        size: this.size(),
        variant: this.containerVariant(),
      }),
      this.className()
    )
  );

  readonly indicatorClasses = computed(() =>
    cn(
      progressIndicatorVariants({
        variant: this.variant(),
        animated: this.animated(),
        striped: this.striped(),
        glow: this.glow(),
      }),
      this.reversed() && 'origin-right scale-x-[-1]'
    )
  );

  readonly textClasses = computed(() =>
    progressTextVariants({
      position: this.textPosition(),
      align: this.textAlign(),
    })
  );

  readonly percentage = computed(() => {
    if (this.indeterminate()) return 100;
    const val = Math.max(this.min(), Math.min(this.value(), this.max()));
    const range = this.max() - this.min();
    return range > 0 ? ((val - this.min()) / range) * 100 : 0;
  });

  readonly displayPercentage = computed(() => {
    const config = this.animationConfig();
    if (!config.valueAnimation || !this.isInitialized()) {
      return this.percentage();
    }
    return this.percentage();
  });

  readonly progressState = computed(() => {
    const percent = this.percentage();
    if (this.indeterminate()) return 'indeterminate';
    if (percent === 0) return 'empty';
    if (percent === 100) return 'complete';
    if (percent < 25) return 'low';
    if (percent < 75) return 'medium';
    return 'high';
  });

  readonly computedText = computed(() => {
    if (this.customText()) return this.customText();

    const formatter = this.textFormat();
    if (formatter) {
      return formatter(this.value(), this.max());
    }

    if (this.indeterminate()) {
      return 'Loading...';
    }

    const percentage = Math.round(this.percentage());
    const state = this.progressState();

    switch (state) {
      case 'complete':
        return 'Complete!';
      case 'empty':
        return 'Not started';
      default:
        return `${percentage}%`;
    }
  });

  readonly computedAriaLabel = computed(() => {
    if (this.ariaLabel()) return this.ariaLabel();

    const accessibility = this.accessibility();
    if (accessibility.ariaLabel) return accessibility.ariaLabel;

    if (this.indeterminate()) {
      return 'Loading, please wait';
    }

    const percentage = Math.round(this.percentage());
    const state = this.progressState();

    return `Progress: ${percentage}% ${state}`;
  });

  // Effects for accessibility announcements
  constructor() {
    effect(() => {
      const currentValue = this.value();
      const previousValue = this.previousValue();
      const accessibility = this.accessibility();

      if (accessibility.announceChanges && this.isInitialized()) {
        const threshold = accessibility.announceThreshold || 10;
        const change = Math.abs(currentValue - previousValue);

        if (change >= threshold) {
          this.announceProgress();
        }
      }

      this.previousValue.set(currentValue);
    });

    // Initialize after first render
    effect(
      () => {
        this.isInitialized.set(true);
      },
      { allowSignalWrites: true }
    );
  }
  private announceProgress(): void {
    const accessibility = this.accessibility();
    const formatter = accessibility.announceFormat;

    let announcement: string;
    if (formatter) {
      announcement = formatter(this.value(), this.max());
    } else {
      const percentage = Math.round(this.percentage());
      announcement = `Progress updated: ${percentage}% complete`;
    }

    // Create and dispatch custom event for any external listeners
    const event = new CustomEvent('progress-announcement', {
      detail: { message: announcement }
    });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(event);
    }

    // Primary accessibility: Use ARIA live region for screen readers
    this.announceToScreenReader(announcement);
  }

  private announceToScreenReader(message: string): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const accessibility = this.accessibility();
    const liveRegionId = accessibility.liveRegionId || 'progress-announcements';
    const politeness = accessibility.liveRegionPoliteness || 'polite';
    const atomic = accessibility.atomicAnnouncements !== false; // default to true

    // Create or find existing live region
    let liveRegion = document.getElementById(liveRegionId);

    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = liveRegionId;
      liveRegion.setAttribute('aria-live', politeness);
      liveRegion.setAttribute('aria-atomic', atomic.toString());
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('class', 'sr-only');
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-10000px';
      liveRegion.style.width = '1px';
      liveRegion.style.height = '1px';
      liveRegion.style.overflow = 'hidden';

      document.body.appendChild(liveRegion);
    }

    // Set the message
    liveRegion.textContent = message;
  }

  ngOnDestroy(): void {
    // Clean up any timers or subscriptions if needed
  }
}

// Utility functions
export function createProgressAccessibility(
  options: Partial<ProgressAccessibility> = {}
): ProgressAccessibility {
  return {
    announceChanges: true,
    announceThreshold: 10,
    liveRegionPoliteness: 'polite',
    atomicAnnouncements: true,
    liveRegionId: 'progress-announcements',
    announceFormat: (value: number, max: number) => {
      const percentage = max > 0 ? Math.round((value / max) * 100) : 0;
      return `Progress: ${percentage}% complete`;
    },
    ...options,
  };
}

export function createAnimationConfig(
  options: Partial<ProgressAnimationConfig> = {}
): ProgressAnimationConfig {
  return {
    smooth: true,
    duration: 500,
    easing: 'ease-out',
    entrance: false,
    valueAnimation: true,
    ...options,
  };
}

export function formatProgressText(
  value: number,
  max: number,
  format: 'percentage' | 'fraction' | 'bytes' | 'time' | 'custom' = 'percentage',
  customFormatter?: (value: number, max: number) => string
): string {
  switch (format) {
    case 'percentage':
      const percentage = max > 0 ? Math.round((value / max) * 100) : 0;
      return `${percentage}%`;
    case 'fraction':
      return `${value} / ${max}`;
    case 'bytes':
      const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
      };
      return `${formatBytes(value)} / ${formatBytes(max)}`;
    case 'time':
      const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        if (hours > 0) return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
      };
      return `${formatTime(value)} / ${formatTime(max)}`;
    case 'custom':
      return customFormatter ? customFormatter(value, max) : `${value}`;
    default:
      return `${value}`;
  }
}

// Export variants for external use
export { progressVariants, progressIndicatorVariants, progressTextVariants };
