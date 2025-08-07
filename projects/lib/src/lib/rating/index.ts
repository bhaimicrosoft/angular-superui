import {
  Component,
  computed,
  input,
  output,
  signal,
  forwardRef,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
  inject,
  effect,
  OnInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { cn } from '../utils/cn';

/**
 * Unique ID generator for Rating components
 */
let ratingIdCounter = 0;

/**
 * Interface for star objects in the rating component
 */
export interface Star {
  index: number;
  value: number;
  filled: boolean;
  half: boolean;
  hovered: boolean;
  focused: boolean;
  animationState: 'filled' | 'empty';
}

/**
 * Rating component variants using Class Variance Authority (CVA)
 * Provides consistent styling patterns with Tailwind CSS
 */
const ratingVariants = cva(
  [
    'inline-flex items-center gap-1',
    'focus-within:outline-none',
    'rounded-md'
  ],
  {
    variants: {
      variant: {
        default: 'text-amber-400',
        destructive: 'text-red-500',
        success: 'text-green-500',
        warning: 'text-yellow-500',
        info: 'text-blue-500',
        muted: 'text-muted-foreground',
      },
      size: {
        sm: 'text-sm',
        default: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const starVariants = cva(
  [
    'transition-all duration-200 ease-in-out cursor-pointer',
    'hover:scale-110 focus:outline-none border-0 bg-transparent',
    'select-none'
  ],
  {
    variants: {
      state: {
        empty: 'text-gray-300 dark:text-gray-600',
        filled: 'text-current',
        half: 'text-current',
        hover: 'text-current scale-110',
      },
      size: {
        sm: 'w-4 h-4',
        default: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8',
      },
      interactive: {
        true: 'hover:scale-110 active:scale-95',
        false: 'cursor-default',
      },
    },
    defaultVariants: {
      state: 'empty',
      size: 'default',
      interactive: true,
    },
  }
);

export interface RatingChangeEvent {
  value: number;
  previousValue: number;
}

export type RatingVariantProps = VariantProps<typeof ratingVariants>;

@Component({
  selector: 'Rating',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Rating),
      multi: true,
    },
  ],
  styles: [`
    /* Using custom SVG icons with proper fill control */
  `],
  animations: [
    trigger('starFill', [
      transition('empty => filled', [
        animate('200ms ease-out', keyframes([
          style({ transform: 'scale(1)', opacity: 0.8, offset: 0 }),
          style({ transform: 'scale(1.2)', opacity: 1, offset: 0.5 }),
          style({ transform: 'scale(1)', opacity: 1, offset: 1 }),
        ])),
      ]),
    ]),
    trigger('starHover', [
      state('inactive', style({ transform: 'scale(1)' })),
      state('active', style({ transform: 'scale(1.1)' })),
      transition('inactive <=> active', animate('150ms ease-out')),
    ]),
    trigger('glow', [
      state('inactive', style({ 
        filter: 'drop-shadow(0 0 0 transparent)'
      })),
      state('active', style({ 
        filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))'
      })),
      transition('inactive <=> active', animate('200ms ease-out')),
    ]),
  ],
  template: `
    <div
      [class]="ratingClasses()"
      [attr.role]="readonly() ? 'img' : 'radiogroup'"
      [attr.aria-label]="ariaLabel() || 'Rating'"
      [attr.aria-labelledby]="ariaLabelledBy() || null"
      [attr.aria-describedby]="describedByIds()"
      [attr.aria-valuenow]="value()"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="max()"
      [attr.aria-valuetext]="ariaValueText()"
      [attr.aria-readonly]="readonly()"
      [attr.aria-disabled]="isDisabled()"
      [attr.data-testid]="'rating-' + id()"
      [attr.tabindex]="isDisabled() ? -1 : 0"
      (keydown)="handleKeyDown($event)"
      (mouseenter)="handleMouseEnter()"
      (mouseleave)="handleMouseLeave()"
      (focusin)="handleFocusIn()"
      (focusout)="handleFocusOut()"
    >
      @for (star of stars(); track star.index) {
        <button
          type="button"
          [class]="getStarClasses(star)"
          [attr.aria-label]="getStarAriaLabel(star)"
          [attr.aria-pressed]="star.filled"
          [attr.tabindex]="getStarTabIndex(star)"
          [attr.data-value]="star.value"
          [disabled]="isDisabled() || readonly()"
          [@starHover]="star.hovered ? 'active' : 'inactive'"
          [@glow]="star.filled && showGlow() ? 'active' : 'inactive'"
          (click)="handleStarClick(star.value, $event)"
          (mouseenter)="handleStarHover(star.value, $event)"
          (mousemove)="handleStarHover(star.value, $event)"
          (focus)="handleStarFocus(star.value)"
          (keydown)="handleStarKeyDown($event, star.value)"
        >
          <!-- Star Icon with custom SVG paths -->
          @if (customIcon()) {
            <span 
              class="w-full h-full flex items-center justify-center" 
              [innerHTML]="customIcon()">
            </span>
          } @else if (star.filled) {
            <!-- Full star -->
            <svg
              viewBox="0 0 24 24"
              [class]="getStarIconClasses(star)"
              [@starFill]="star.animationState"
            >
              <polygon 
                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          } @else if (star.half && allowHalf()) {
            <!-- Half star -->
            <svg
              viewBox="0 0 24 24"
              [class]="getStarIconClasses(star)"
              [@starFill]="star.animationState"
            >
              <path 
                d="M12 17.8L5.8 21 7 14.1l-5-4.9 6.9-1L12 2v15.8z"
                fill="currentColor"
                stroke="none"
              />
              <path 
                d="M12 2v15.8l6.2 3.2-1.2-6.9 5-4.9-6.9-1L12 2z" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="1" 
                opacity="0.3"
              />
            </svg>
          } @else {
            <!-- Empty star -->
            <svg
              viewBox="0 0 24 24"
              [class]="getStarIconClasses(star)"
              [@starFill]="star.animationState"
            >
              <polygon 
                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
              />
            </svg>
          }
        </button>
      }

      <!-- Value display -->
      @if (showValue()) {
        <span 
          class="ml-2 text-sm font-medium text-muted-foreground"
          [attr.aria-hidden]="true"
        >
          {{ displayValue() }}
        </span>
      }
    </div>

    <!-- Description/Helper text -->
    @if (description()) {
      <p 
        [id]="id() + '-description'"
        class="mt-1 text-xs text-muted-foreground"
        [attr.aria-live]="readonly() ? 'off' : 'polite'"
      >
        {{ description() }}
      </p>
    }

    <!-- Error message -->
    @if (error()) {
      <p 
        [id]="id() + '-error'"
        class="mt-1 text-xs text-destructive"
        role="alert"
        aria-live="polite"
      >
        {{ error() }}
      </p>
    }
  `,
})
export class Rating implements ControlValueAccessor, OnInit, OnDestroy {
  private elementRef = inject(ElementRef);

  // Internal disabled state signal (managed by both input and form control)
  private readonly internalDisabled = signal<boolean>(false);

  // Input signals
  readonly variant = input<RatingVariantProps['variant']>('default');
  readonly size = input<RatingVariantProps['size']>('default');
  readonly max = input<number>(5);
  readonly precision = input<number>(1); // 1 = whole numbers, 0.5 = half stars, 0.1 = decimal
  readonly allowHalf = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly customIcon = input<string>('');
  readonly showValue = input<boolean>(false);
  readonly showGlow = input<boolean>(true);
  readonly allowClear = input<boolean>(false);
  readonly clearOnReclick = input<boolean>(true);
  readonly highlightSelectedOnly = input<boolean>(false);
  readonly reverseDirection = input<boolean>(false);
  readonly animateOnChange = input<boolean>(true);
  readonly name = input<string>('');
  readonly id = input<string>(`rating-${++ratingIdCounter}`);
  readonly ariaLabel = input<string>('');
  readonly ariaLabelledBy = input<string>('');
  readonly ariaDescribedBy = input<string>('');
  readonly description = input<string>('');
  readonly error = input<string>('');
  readonly customClass = input<string>('');

  // Two-way binding for value
  readonly value = input<number>(0);

  // Output events
  readonly valueChange = output<number>();
  readonly change = output<RatingChangeEvent>();
  readonly hover = output<number>();
  readonly focus = output<number>();
  readonly blur = output<void>();
  readonly clear = output<void>();

  // Internal state signals
  readonly currentValue = signal<number>(0);
  readonly hoverValue = signal<number>(0);
  readonly focusedValue = signal<number>(0);
  readonly isHovered = signal<boolean>(false);
  readonly isFocused = signal<boolean>(false);
  readonly isAnimating = signal<boolean>(false);

  // Computed signal for effective disabled state (combines input and form control state)
  readonly isDisabled = computed(() => this.disabled() || this.internalDisabled());

  // Computed signals
  readonly ratingClasses = computed(() =>
    cn(
      ratingVariants({
        variant: this.variant(),
        size: this.size(),
      }),
      this.isDisabled() && 'opacity-50 cursor-not-allowed',
      this.readonly() && 'cursor-default',
      this.customClass()
    )
  );

  readonly displayValue = computed(() => {
    const val = this.currentValue();
    if (this.allowHalf() || this.precision() !== 1) {
      return val.toFixed(1);
    }
    return val.toString();
  });

  readonly ariaValueText = computed(() => {
    const val = this.currentValue();
    const max = this.max();
    return `${val} out of ${max} stars`;
  });

  readonly describedByIds = computed(() => {
    const ids = [];
    // If the user provides their own IDs, include them
    if (this.ariaDescribedBy()) {
      ids.push(this.ariaDescribedBy());
    }
    // If a description exists, add its ID
    if (this.description()) {
      ids.push(this.id() + '-description');
    }
    // If an error exists, add its ID
    if (this.error()) {
      ids.push(this.id() + '-error');
    }
    // Join them into a space-separated string or return null
    return ids.length > 0 ? ids.join(' ') : null;
  });

  readonly stars = computed((): Star[] => {
    const max = this.max();
    const currentVal = this.currentValue();
    const hoverVal = this.hoverValue();
    const focusedVal = this.focusedValue();
    
    // Priority: hover (if hovering) > current value
    // Only use focused value for keyboard navigation, not for display after clicking
    let displayVal = currentVal;
    if (this.isHovered() && !this.readonly()) {
      displayVal = hoverVal;
    }
    // Remove focused value from display logic to prevent clicked stars from appearing filled
    
    return Array.from({ length: max }, (_, index): Star => {
      const starValue = index + 1; // Star 1, 2, 3, 4, 5
      
      let isFilled = false;
      let isHalf = false;
      
      // Clearer logic for star states
      if (displayVal >= starValue) {
        // Full star: displayVal meets or exceeds this star's value
        isFilled = true;
        isHalf = false;
      } else if (this.allowHalf() && displayVal >= (starValue - 0.5)) {
        // Half star: displayVal is at least half of this star's value
        isFilled = false;
        isHalf = true;
      } else {
        // Empty star: displayVal doesn't reach this star
        isFilled = false;
        isHalf = false;
      }
      
      const isHovered = this.isHovered() && hoverVal >= starValue - (this.allowHalf() ? 0.5 : 0);
      const isFocused = this.isFocused() && focusedVal >= starValue - (this.allowHalf() ? 0.5 : 0);
      
      return {
        index,
        value: starValue,
        filled: isFilled,
        half: isHalf,
        hovered: isHovered,
        focused: isFocused,
        animationState: this.isAnimating() && (isFilled || isHalf) ? 'filled' : 'empty'
      };
    });
  });

  // Form control integration
  private onChange = (value: number) => {};
  private onTouched = () => {};

  constructor() {
    // Sync value input with internal signal only when not using form controls
    effect(() => {
      const inputValue = this.value();
      // Only sync input value if it's different and we're not using a form control
      // (form controls use writeValue instead)
      if (inputValue !== this.currentValue() && inputValue !== 0) {
        this.currentValue.set(inputValue);
      }
    });
    
    // Sync internal disabled state with input
    effect(() => {
      const disabledInput = this.disabled();
      if (disabledInput !== this.internalDisabled()) {
        // Only update if the input disabled state changes, don't override form control state
        if (!this.internalDisabled()) {
          // If form control hasn't set disabled state, use input
          this.internalDisabled.set(disabledInput);
        }
      }
    });
  }

  ngOnInit() {
    // Initialize with input value if no form control value exists
    if (this.currentValue() === 0 && this.value() !== 0) {
      this.currentValue.set(this.value());
    }
  }

  ngOnDestroy() {
    // Cleanup handled automatically by Angular signals
  }

  // ControlValueAccessor implementation
  writeValue(value: number): void {
    // Handle null/undefined values from form controls
    const normalizedValue = value == null ? 0 : value;
    const clampedValue = this.clampValue(normalizedValue);
    
    // Always update the current value when writeValue is called (form control update)
    this.currentValue.set(clampedValue);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.internalDisabled.set(isDisabled);
  }

  // Event handlers
  handleStarClick(value: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isDisabled() || this.readonly()) return;

    const currentVal = this.currentValue();
    let newValue = value;

    // Enhanced half-star detection with precise click position calculation
    if (this.allowHalf() && event instanceof MouseEvent) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const starWidth = rect.width;
      
      // Use 50% threshold to match hover behavior
      const halfThreshold = starWidth * 0.5;
      
      // If clicked on left half, set to half value
      if (clickX <= halfThreshold) {
        newValue = value - 0.5;
      }
      // If clicked on right half, set to full value
      else {
        newValue = value;
      }
    }

    // Handle clear on re-click
    if (this.clearOnReclick() && currentVal === newValue) {
      newValue = this.allowClear() ? 0 : newValue;
    }

    this.updateValue(newValue);
    this.onTouched();
    
    // Remove focus from the clicked star to prevent display issues
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.blur();
    }
    
    // Reset focus state
    this.focusedValue.set(0);
    this.isFocused.set(false);
  }

  handleStarHover(value: number, event?: MouseEvent): void {
    if (this.isDisabled() || this.readonly()) return;
    
    let hoverValue = value;
    
    // Enhanced half-star hover detection with better precision
    if (this.allowHalf() && event) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const hoverX = event.clientX - rect.left;
      const starWidth = rect.width;
      
      // Use 50% threshold for more intuitive behavior
      const halfThreshold = starWidth * 0.5;
      
      // If hovering on left half, show half value
      if (hoverX <= halfThreshold) {
        hoverValue = value - 0.5;
      }
      // If hovering on right half, show full value
      else {
        hoverValue = value;
      }
    }
    
    this.hoverValue.set(hoverValue);
    this.isHovered.set(true);
    this.hover.emit(hoverValue);
  }

  handleStarFocus(value: number): void {
    if (this.isDisabled()) return;
    
    // Only set focused value for keyboard navigation, not when clicking
    if (!this.isHovered()) {
      this.focusedValue.set(value);
      this.isFocused.set(true);
    }
    this.focus.emit(value);
  }

  handleStarKeyDown(event: KeyboardEvent, value: number): void {
    if (this.isDisabled() || this.readonly()) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.updateValue(value);
        this.onTouched();
        break;
      case 'Delete':
      case 'Backspace':
        event.preventDefault();
        if (this.allowClear() || this.currentValue() > 0) {
          this.updateValue(0);
          this.onTouched();
        }
        break;
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled() || this.readonly()) return;

    const currentVal = this.currentValue();
    const focusedVal = this.focusedValue();
    const max = this.max();
    const step = this.allowHalf() ? 0.5 : 1;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        const nextVal = Math.min((focusedVal || currentVal) + step, max);
        this.focusedValue.set(nextVal);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        const prevVal = Math.max((focusedVal || currentVal) - step, 0);
        this.focusedValue.set(prevVal);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        const valueToSet = focusedVal || currentVal;
        this.updateValue(valueToSet);
        this.onTouched();
        break;
      case 'Delete':
      case 'Backspace':
        event.preventDefault();
        if (this.allowClear() || currentVal > 0) {
          this.updateValue(0);
          this.onTouched();
        }
        break;
      case 'Home':
        event.preventDefault();
        this.focusedValue.set(this.allowClear() ? 0 : 1);
        break;
      case 'End':
        event.preventDefault();
        this.focusedValue.set(max);
        break;
    }
  }

  handleMouseEnter(): void {
    if (!this.isDisabled() && !this.readonly()) {
      this.isHovered.set(true);
    }
  }

  handleMouseLeave(): void {
    this.isHovered.set(false);
    this.hoverValue.set(0);
    
    // Also reset focus state when mouse leaves the rating component
    if (!this.readonly()) {
      this.focusedValue.set(0);
      this.isFocused.set(false);
    }
  }

  handleFocusIn(): void {
    if (!this.isDisabled()) {
      this.isFocused.set(true);
    }
  }

  handleFocusOut(): void {
    this.isFocused.set(false);
    this.focusedValue.set(0);
    this.blur.emit();
  }

  // Helper methods
  private updateValue(newValue: number): void {
    const clampedValue = this.clampValue(newValue);
    const previousValue = this.currentValue();
    
    if (clampedValue !== previousValue) {
      this.currentValue.set(clampedValue);
      
      if (this.animateOnChange()) {
        this.isAnimating.set(true);
        setTimeout(() => this.isAnimating.set(false), 300);
      }
      
      // Update form control first, then emit events
      this.onChange(clampedValue);
      this.valueChange.emit(clampedValue);
      this.change.emit({ value: clampedValue, previousValue });
      
      if (clampedValue === 0 && this.allowClear()) {
        this.clear.emit();
      }
    }
  }

  private clampValue(value: number): number {
    const precision = this.allowHalf() ? 0.5 : this.precision();
    const rounded = Math.round(value / precision) * precision;
    return Math.max(0, Math.min(rounded, this.max()));
  }

  getStarClasses(star: Star): string {
    const state = star.filled ? 'filled' : (star.half ? 'half' : 'empty');
    return cn(
      starVariants({
        state: star.hovered ? 'hover' : state,
        size: this.size(),
        interactive: !this.isDisabled() && !this.readonly(),
      })
    );
  }

  getStarIconClasses(star: Star): string {
    return cn(
      'w-full h-full',
      star.filled && 'drop-shadow-sm',
      this.isAnimating() && (star.filled || star.half) && 'animate-pulse'
    );
  }

  getStarAriaLabel(star: Star): string {
    return `${star.value} star${star.value !== 1 ? 's' : ''}`;
  }

  getStarTabIndex(star: Star): number {
    if (this.isDisabled() || this.readonly()) return -1;
    return star.value === 1 ? 0 : -1; // Only first star is tabbable for accessibility
  }
}
