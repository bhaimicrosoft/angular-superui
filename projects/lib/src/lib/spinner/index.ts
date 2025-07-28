import { Component, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/**
 * Spinner variants using CVA for consistent styling
 */
const spinnerVariants = cva(
  'inline-flex items-center justify-center',
  {
    variants: {
      size: {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        default: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-10 h-10',
        '2xl': 'w-12 h-12',
        '3xl': 'w-16 h-16',
      },
      variant: {
        default: 'text-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary',
        success: 'text-green-500',
        warning: 'text-yellow-500',
        destructive: 'text-red-500',
        info: 'text-blue-500',
        purple: 'text-purple-500',
        pink: 'text-pink-500',
        orange: 'text-orange-500',
        teal: 'text-teal-500',
        gradient: 'bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text',
      },
      speed: {
        slow: '[animation-duration:2s]',
        default: '[animation-duration:1s]',
        fast: '[animation-duration:0.5s]',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      speed: 'default',
    },
  }
);

export type SpinnerVariant = VariantProps<typeof spinnerVariants>;
export type SpinnerType = 
  | 'spinner' 
  | 'dots' 
  | 'pulse' 
  | 'bounce' 
  | 'bars';

@Component({
  selector: 'Spinner',
  standalone: true,
  template: `
    <div 
      [class]="containerClasses()"
      [attr.aria-label]="ariaLabel() || 'Loading'"
      [attr.aria-describedby]="ariaDescribedBy()"
      [attr.aria-live]="ariaLive()"
      role="status"
    >
      @if (shouldShowAnimation()) {
        @if (shouldRenderAnimated()) {
          @switch (type()) {
            <!-- Classic Spinner -->
            @case ('spinner') {
              <div [class]="spinnerClasses()"></div>
            }

            <!-- Dots Animation -->
            @case ('dots') {
              <div [class]="dotsContainerClasses()">
                @for (dot of dotsArray; track $index) {
                  <div [class]="dotClasses()" [style.animation-delay]="getDotDelay($index)"></div>
                }
              </div>
            }

            <!-- Pulse Animation -->
            @case ('pulse') {
              <div [class]="pulseClasses()"></div>
            }

            <!-- Bounce Animation -->
            @case ('bounce') {
              <div [class]="bounceContainerClasses()">
                @for (ball of bounceArray; track $index) {
                  <div [class]="bounceItemClasses()" [style.animation-delay]="getBounceDelay($index)"></div>
                }
              </div>
            }

            <!-- Bars Animation -->
            @case ('bars') {
              <div [class]="barsContainerClasses()">
                @for (bar of barsArray; track $index) {
                  <div [class]="barClasses()" [style.animation-delay]="getBarDelay($index)"></div>
                }
              </div>
            }
          }
        } @else {
          <!-- Static fallback when reduced motion is enabled -->
          @switch (type()) {
            @case ('spinner') {
              <div [class]="staticSpinnerClasses()"></div>
            }
            @case ('dots') {
              <div [class]="staticDotsClasses()">
                @for (dot of dotsArray; track $index) {
                  <div [class]="staticDotClasses()"></div>
                }
              </div>
            }
            @case ('pulse') {
              <div [class]="staticPulseClasses()"></div>
            }
            @case ('bounce') {
              <div [class]="staticBounceClasses()">
                @for (ball of bounceArray; track $index) {
                  <div [class]="staticBounceItemClasses()"></div>
                }
              </div>
            }
            @case ('bars') {
              <div [class]="staticBarsContainerClasses()">
                @for (bar of barsArray; track $index) {
                  <div [class]="staticBarClasses()"></div>
                }
              </div>
            }
          }
        }
      }
      
      @if (shouldShowText()) {
        <span [class]="textClasses()">{{ displayText() }}</span>
      }
    </div>
  `,
  styles: `
    /* Enhanced classic animations with smooth transitions */
    
    /* Bounce animation for dots - vertical bounce */
    @keyframes enhanced-bounce {
      0%, 80%, 100% { 
        transform: scale(0.8) translateY(0); 
        opacity: 0.7;
      }
      40% { 
        transform: scale(1.2) translateY(-10px); 
        opacity: 1;
      }
    }

    /* Scale animation for bounce - bouncing ball effect */
    @keyframes enhanced-scale {
      0%, 20%, 50%, 80%, 100% { 
        transform: translateY(0); 
        opacity: 1;
      }
      40% { 
        transform: translateY(-15px); 
        opacity: 0.8;
      }
      60% { 
        transform: translateY(-8px); 
        opacity: 0.9;
      }
    }

    /* Smooth pulse animation */
    @keyframes enhanced-pulse {
      0% { 
        transform: scale(0.8); 
        opacity: 0.8; 
      }
      50% { 
        transform: scale(1.2); 
        opacity: 0.4; 
      }
      100% { 
        transform: scale(0.8); 
        opacity: 0.8; 
      }
    }

    /* Wave effect for bars */
    @keyframes enhanced-bars {
      0%, 80%, 100% { 
        transform: scaleY(0.4); 
        opacity: 0.7;
      }
      40% { 
        transform: scaleY(1); 
        opacity: 1;
      }
    }

    .animate-enhanced-bounce {
      animation: enhanced-bounce 1.4s ease-in-out infinite;
    }

    .animate-enhanced-scale {
      animation: enhanced-scale 1.2s ease-in-out infinite;
    }

    .animate-enhanced-pulse {
      animation: enhanced-pulse 2s ease-in-out infinite;
    }

    .animate-enhanced-bars {
      animation: enhanced-bars 1.2s ease-in-out infinite;
    }

    /* Reduced Motion Support */
    
    /* Respect system preference only when explicitly configured */
    @media (prefers-reduced-motion: reduce) {
      :host(.respect-system-preference) * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    /* Force animations off when reduced motion is enabled */
    :host(.force-reduced-motion) * {
      animation: none !important;
      transition: none !important;
    }
    
    /* Override with static display when animations are disabled */
    :host(.force-reduced-motion) .animate-spin,
    :host(.force-reduced-motion) .animate-enhanced-bounce,
    :host(.force-reduced-motion) .animate-enhanced-scale,
    :host(.force-reduced-motion) .animate-enhanced-pulse,
    :host(.force-reduced-motion) .animate-enhanced-bars {
      animation: none !important;
    }
  `,
})
export class Spinner {
  // Input signals
  type = input<SpinnerType>('spinner');
  size = input<SpinnerVariant['size']>('default');
  variant = input<SpinnerVariant['variant']>('default');
  speed = input<SpinnerVariant['speed']>('default');
  text = input<string>('');
  className = input<string>('');
  reducedMotion = input<boolean>(false);
  
  // Demo-specific properties
  showAnimation = input<boolean>(true);
  showText = input<boolean>(false);
  loadingText = input<string>('Loading...');
  forceReducedMotion = input<boolean>(false);
  
  // Accessibility inputs
  ariaLabel = input<string>('');
  ariaDescribedBy = input<string>('');
  ariaLive = input<'polite' | 'assertive' | 'off'>('polite');

  // Arrays for multiple elements
  readonly dotsArray = Array(3).fill(0);
  readonly bounceArray = Array(3).fill(0);
  readonly barsArray = Array(5).fill(0);

  // Check if reduced motion should be applied
  readonly shouldUseReducedMotion = computed(() => {
    return this.forceReducedMotion() || this.reducedMotion();
  });

  // Computed classes
  readonly containerClasses = computed(() =>
    cn(
      'inline-flex items-center gap-2',
      this.shouldUseReducedMotion() && 'force-reduced-motion',
      this.className()
    )
  );

  // Check if animation should be shown (separate from reduced motion)
  readonly shouldShowAnimation = computed(() => {
    // If animations are explicitly disabled, don't show them
    if (!this.showAnimation()) {
      return false;
    }
    // If reduced motion is enabled, show static version instead
    return true;
  });

  // Check if we should render animated version (considering reduced motion)
  readonly shouldRenderAnimated = computed(() => {
    return this.shouldShowAnimation() && !this.shouldUseReducedMotion();
  });
  
  // Check if text should be shown
  readonly shouldShowText = computed(() => this.showText() && (this.text() || this.loadingText()));
  
  // Get the display text
  readonly displayText = computed(() => {
    return this.showText() ? (this.text() || this.loadingText()) : '';
  });

  readonly textClasses = computed(() =>
    cn(
      'text-sm ml-2',
      this.variant() === 'default' && 'text-muted-foreground',
      this.variant() === 'primary' && 'text-primary',
      this.variant() === 'secondary' && 'text-secondary',
      this.variant() === 'destructive' && 'text-destructive',
      this.variant() === 'success' && 'text-green-600',
      this.variant() === 'warning' && 'text-yellow-600',
      this.variant() === 'info' && 'text-blue-600',
      this.variant() === 'purple' && 'text-purple-600',
      this.variant() === 'pink' && 'text-pink-600',
      this.variant() === 'orange' && 'text-orange-600',
      this.variant() === 'teal' && 'text-teal-600'
    )
  );

  // Classic spinner (border spinner) - Enhanced
  readonly spinnerClasses = computed(() =>
    cn(
      'animate-spin rounded-full border-2 border-current border-t-transparent transition-all duration-200 ease-in-out',
      spinnerVariants({
        size: this.size(),
        variant: this.variant(),
        speed: this.speed(),
      })
    )
  );

  // Dots animation - Enhanced with better bounce
  readonly dotsContainerClasses = computed(() =>
    cn(
      'flex gap-2 items-center',
      this.getBaseSizeClasses()
    )
  );

  readonly dotClasses = computed(() =>
    cn(
      'animate-enhanced-bounce rounded-full bg-current transition-all duration-200',
      this.getDotSizeClasses(),
      this.getVariantClasses()
    )
  );

  // Pulse animation - Enhanced with smoother scaling
  readonly pulseClasses = computed(() =>
    cn(
      'animate-enhanced-pulse rounded-full bg-current transition-all duration-200',
      spinnerVariants({
        size: this.size(),
        variant: this.variant(),
        speed: this.speed(),
      })
    )
  );

  // Bounce animation - Enhanced with bouncing ball effect
  readonly bounceContainerClasses = computed(() =>
    cn(
      'flex gap-1 items-end',
      this.getBaseSizeClasses()
    )
  );

  readonly bounceItemClasses = computed(() =>
    cn(
      'animate-enhanced-scale rounded-full bg-current',
      this.getDotSizeClasses(),
      this.getVariantClasses()
    )
  );

  // Bars animation - Enhanced with wave effect
  readonly barsContainerClasses = computed(() =>
    cn(
      'flex items-end gap-1 justify-center',
      this.getBaseSizeClasses()
    )
  );

  readonly barClasses = computed(() =>
    cn(
      'animate-enhanced-bars bg-current rounded-sm transition-all duration-200',
      this.getBarSizeClasses(),
      this.getVariantClasses()
    )
  );

  // Helper methods for size classes
  private getBaseSizeClasses(): string {
    return spinnerVariants({ size: this.size() });
  }

  private getDotSizeClasses(): string {
    switch (this.size()) {
      case 'xs': return 'w-1.5 h-1.5';
      case 'sm': return 'w-2 h-2';
      case 'default': return 'w-3 h-3';
      case 'lg': return 'w-4 h-4';
      case 'xl': return 'w-5 h-5';
      case '2xl': return 'w-6 h-6';
      case '3xl': return 'w-8 h-8';
      default: return 'w-3 h-3';
    }
  }

  private getBarSizeClasses(): string {
    switch (this.size()) {
      case 'xs': return 'w-1 h-3';
      case 'sm': return 'w-1 h-4';
      case 'default': return 'w-1.5 h-6';
      case 'lg': return 'w-2 h-8';
      case 'xl': return 'w-2.5 h-10';
      case '2xl': return 'w-3 h-12';
      case '3xl': return 'w-4 h-16';
      default: return 'w-1.5 h-6';
    }
  }

  private getVariantClasses(): string {
    switch (this.variant()) {
      case 'primary': return 'text-primary';
      case 'secondary': return 'text-secondary';
      case 'success': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'destructive': return 'text-red-500';
      case 'info': return 'text-blue-500';
      case 'purple': return 'text-purple-500';
      case 'pink': return 'text-pink-500';
      case 'orange': return 'text-orange-500';
      case 'teal': return 'text-teal-500';
      case 'gradient': return 'bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text';
      default: return 'text-foreground';
    }
  }

  // Enhanced animation delay methods for classic animations
  getDotDelay(index: number): string {
    const delays = ['0ms', '200ms', '400ms'];
    return delays[index] || '0ms';
  }

  getBounceDelay(index: number): string {
    const delays = ['0ms', '150ms', '300ms'];
    return delays[index] || '0ms';
  }

  getBarDelay(index: number): string {
    const delays = ['0ms', '100ms', '200ms', '300ms', '400ms'];
    return delays[index] || '0ms';
  }

  // Static classes for reduced motion
  readonly staticSpinnerClasses = computed(() =>
    cn(
      'rounded-full border-2 border-current border-t-transparent opacity-60',
      spinnerVariants({
        size: this.size(),
        variant: this.variant(),
      })
    )
  );

  readonly staticDotsClasses = computed(() =>
    cn(
      'flex gap-2 items-center opacity-60',
      this.getBaseSizeClasses()
    )
  );

  readonly staticDotClasses = computed(() =>
    cn(
      'rounded-full bg-current opacity-60',
      this.getDotSizeClasses(),
      this.getVariantClasses()
    )
  );

  readonly staticPulseClasses = computed(() =>
    cn(
      'rounded-full bg-current opacity-60',
      spinnerVariants({
        size: this.size(),
        variant: this.variant(),
      })
    )
  );

  readonly staticBounceClasses = computed(() =>
    cn(
      'flex gap-1 items-center opacity-60',
      this.getBaseSizeClasses()
    )
  );

  readonly staticBounceItemClasses = computed(() =>
    cn(
      'rounded-full bg-current opacity-60',
      this.getDotSizeClasses(),
      this.getVariantClasses()
    )
  );

  readonly staticBarsContainerClasses = computed(() =>
    cn(
      'flex items-end gap-1 justify-center opacity-60',
      this.getBaseSizeClasses()
    )
  );

  readonly staticBarClasses = computed(() =>
    cn(
      'bg-current rounded-sm opacity-60',
      this.getBarSizeClasses(),
      this.getVariantClasses()
    )
  );
}
