import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  inject,
  Input,
  signal,
  ViewChild,
  WritableSignal,
  effect,
  output,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/**
 * Slider container variants using Class Variance Authority (CVA)
 */
const sliderVariants = cva(
  [
    'relative flex items-center w-full touch-none select-none',
    'data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none',
  ],
  {
    variants: {
      size: {
        sm: [
          'h-5',
        ],
        default: [
          'h-6',
        ],
        lg: [
          'h-8',
        ],
      },
      variant: {
        default: '',
        primary: '',
        secondary: '',
        success: '',
        warning: '',
        destructive: '',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

/**
 * Slider track variants
 */
const sliderTrackVariants = cva(
  [
    'absolute bg-gray-200 dark:bg-gray-700 rounded-full z-0',
    'w-full top-1/2 -translate-y-1/2',
  ],
  {
    variants: {
      size: {
        sm: [
          'h-1',
        ],
        default: [
          'h-1.5',
        ],
        lg: [
          'h-2',
        ],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

/**
 * Slider range fill variants
 */
const sliderRangeVariants = cva(
  [
    'absolute rounded-full z-5',
    'h-full',
  ],
  {
    variants: {
      variant: {
        default: 'bg-gray-700 dark:bg-gray-300',
        primary: 'bg-blue-600',
        secondary: 'bg-gray-600 dark:bg-gray-400',
        success: 'bg-green-600',
        warning: 'bg-yellow-600',
        destructive: 'bg-red-600',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

/**
 * Slider input variants
 */
const sliderInputVariants = cva(
  [
    'absolute appearance-none bg-transparent border-none outline-none cursor-pointer z-10',
    'focus:outline-none focus:ring-0',
    // Reset all native styling
    '[&::-webkit-slider-track]:appearance-none [&::-webkit-slider-track]:bg-transparent [&::-webkit-slider-track]:border-none [&::-webkit-slider-track]:outline-none',
    '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:z-20',
    '[&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:ease-in-out',
    '[&::-webkit-slider-thumb]:hover:shadow-lg [&::-webkit-slider-thumb]:hover:scale-105',
    '[&::-webkit-slider-thumb]:focus:ring-2 [&::-webkit-slider-thumb]:focus:ring-offset-2 [&::-webkit-slider-thumb]:focus:scale-110',
    // Firefox
    '[&::-moz-range-track]:bg-transparent [&::-moz-range-track]:border-none [&::-moz-range-track]:outline-none',
    '[&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:z-20',
    '[&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150 [&::-moz-range-thumb]:ease-in-out',
    '[&::-moz-range-thumb]:hover:shadow-lg [&::-moz-range-thumb]:hover:scale-105',
    '[&::-moz-range-thumb]:focus:ring-2 [&::-moz-range-thumb]:focus:ring-offset-2 [&::-moz-range-thumb]:focus:scale-110',
    // Additional resets
    '[&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:bg-transparent',
    '[&::-moz-range-progress]:bg-transparent',
  ],
  {
    variants: {
      size: {
        sm: [
          'w-full h-5',
          '[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4',
          '[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4',
        ],
        default: [
          'w-full h-6',
          '[&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5',
          '[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5',
        ],
        lg: [
          'w-full h-8',
          '[&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6',
          '[&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6',
        ],
      },
      variant: {
        default: [
          '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-300',
          '[&::-webkit-slider-thumb]:focus:ring-gray-500',
          '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gray-300',
          '[&::-moz-range-thumb]:focus:ring-gray-500',
        ],
        primary: [
          '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600',
          '[&::-webkit-slider-thumb]:focus:ring-blue-500',
          '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-600',
          '[&::-moz-range-thumb]:focus:ring-blue-500',
        ],
        secondary: [
          '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-600',
          '[&::-webkit-slider-thumb]:focus:ring-gray-500',
          '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gray-600',
          '[&::-moz-range-thumb]:focus:ring-gray-500',
        ],
        success: [
          '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-green-600',
          '[&::-webkit-slider-thumb]:focus:ring-green-500',
          '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-green-600',
          '[&::-moz-range-thumb]:focus:ring-green-500',
        ],
        warning: [
          '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-yellow-600',
          '[&::-webkit-slider-thumb]:focus:ring-yellow-500',
          '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-yellow-600',
          '[&::-moz-range-thumb]:focus:ring-yellow-500',
        ],
        destructive: [
          '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-red-600',
          '[&::-webkit-slider-thumb]:focus:ring-red-500',
          '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-red-600',
          '[&::-moz-range-thumb]:focus:ring-red-500',
        ],
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

/**
 * Slider tick variants
 */
const sliderTickVariants = cva(
  [
    'absolute bg-gray-400 dark:bg-gray-500 rounded-full z-6',
    'w-0.5 h-2 top-1/2 -translate-y-1/2 -translate-x-1/2',
  ],
  {
    variants: {
      size: {
        sm: 'h-1.5',
        default: 'h-2',
        lg: 'h-2.5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface SliderProps extends VariantProps<typeof sliderVariants> {
  /** The current value(s) of the slider */
  defaultValue?: number | number[];
  /** The minimum value */
  min?: number;
  /** The maximum value */
  max?: number;
  /** The step increment */
  step?: number;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Whether to show range (dual handles) */
  range?: boolean;
  /** Whether to show value labels */
  showLabels?: boolean;
  /** Whether to show tick marks */
  showTicks?: boolean;
  /** Custom tick marks positions */
  ticks?: number[];
  /** Size variant */
  size?: 'sm' | 'default' | 'lg';
  /** Color variant */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive';
  /** Additional CSS classes for the container */
  class?: string;
  /** Custom CSS classes for the track element */
  trackClass?: string;
  /** Custom CSS classes for the thumb element */
  thumbClass?: string;
  /** Custom CSS classes for the range fill element */
  rangeClass?: string;
  /** Custom CSS classes for the input element */
  inputClass?: string;
  /** Custom CSS classes for the tick marks */
  tickClass?: string;
  /** Custom CSS classes for the labels */
  labelClass?: string;
  /** Whether to invert the slider direction */
  inverted?: boolean;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

@Component({
  selector: 'Slider',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Slider),
      multi: true
    }
  ],
  template: `
    <div
      [class]="getContainerClasses()"
      [attr.data-disabled]="disabled"
      role="group"
      [attr.aria-label]="ariaLabel"
      #sliderContainer>

      <!-- Track -->
      <div
        [class]="getTrackClasses()"
        #track>

        <!-- Range fill -->
        <div
          [class]="getRangeClasses()"
          [style]="getRangeStyles()"
          #rangeElement>
        </div>

        <!-- Tick marks -->
        <div *ngIf="showTicks" class="absolute inset-0">
          <div
            *ngFor="let tick of computedTicks()"
            [class]="getTickClasses()"
            [style]="getTickStyles(tick.position)"
            [attr.data-value]="tick.value">
            <span
              *ngIf="showLabels"
              [class]="getLabelClasses()">
              {{ formatValue(tick.value) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Single Range Input -->
      <input
        *ngIf="!range"
        type="range"
        [class]="getInputClasses()"
        [min]="min"
        [max]="max"
        [step]="step"
        [disabled]="disabled"
        [value]="singleValue()"
        [attr.aria-label]="ariaLabel || 'Slider'"
        [attr.aria-valuemin]="min"
        [attr.aria-valuemax]="max"
        [attr.aria-valuenow]="singleValue()"
        (input)="handleSingleInput($event)"
        (change)="handleSingleChange($event)"
        #singleInput />

      <!-- Dual Range Inputs for Range Mode -->
      <ng-container *ngIf="range">
        <!-- Min Range Input -->
        <input
          type="range"
          [class]="getInputClasses() + ' ' + getRangeInputClasses('min')"
          [min]="min"
          [max]="max"
          [step]="step"
          [disabled]="disabled"
          [value]="rangeValues()[0]"
          [attr.aria-label]="'Minimum value'"
          [attr.aria-valuemin]="min"
          [attr.aria-valuemax]="max"
          [attr.aria-valuenow]="rangeValues()[0]"
          (input)="handleRangeInput($event, 0)"
          (change)="handleRangeChange($event, 0)"
          (mousedown)="handleRangeMouseDown($event, 0)"
          (focus)="handleRangeFocus($event, 0)"
          #minInput />

        <!-- Max Range Input -->
        <input
          type="range"
          [class]="getInputClasses() + ' ' + getRangeInputClasses('max')"
          [min]="min"
          [max]="max"
          [step]="step"
          [disabled]="disabled"
          [value]="rangeValues()[1]"
          [attr.aria-label]="'Maximum value'"
          [attr.aria-valuemin]="min"
          [attr.aria-valuemax]="max"
          [attr.aria-valuenow]="rangeValues()[1]"
          (input)="handleRangeInput($event, 1)"
          (change)="handleRangeChange($event, 1)"
          (mousedown)="handleRangeMouseDown($event, 1)"
          (focus)="handleRangeFocus($event, 1)"
          #maxInput />
      </ng-container>

      <!-- Value display -->
      <div *ngIf="showLabels && !showTicks" [class]="getValueDisplayClasses()">
        <span *ngIf="!range">{{ formatValue(singleValue()) }}</span>
        <span *ngIf="range">{{ formatValue(rangeValues()[0]) }} - {{ formatValue(rangeValues()[1]) }}</span>
      </div>

      <!-- Screen reader live region for announcements -->
      <div
        id="slider-live-region"
        aria-live="polite"
        aria-atomic="true"
        class="sr-only">
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Slider implements ControlValueAccessor, OnDestroy, AfterViewInit {
  @ViewChild('sliderContainer', { static: true }) sliderContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('track', { static: true }) track!: ElementRef<HTMLDivElement>;
  @ViewChild('rangeElement', { static: true }) rangeElement!: ElementRef<HTMLDivElement>;
  @ViewChild('singleInput') singleInput?: ElementRef<HTMLInputElement>;
  @ViewChild('minInput') minInput?: ElementRef<HTMLInputElement>;
  @ViewChild('maxInput') maxInput?: ElementRef<HTMLInputElement>;

  // Input properties
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() disabled = false;
  @Input() range = false;
  @Input() showLabels = false;
  @Input() showTicks = false;
  @Input() ticks: number[] = [];
  @Input() size: 'sm' | 'default' | 'lg' = 'default';
  @Input() variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' = 'default';
  @Input() class = '';
  @Input() trackClass = '';
  @Input() thumbClass = '';
  @Input() rangeClass = '';
  @Input() inputClass = '';
  @Input() tickClass = '';
  @Input() labelClass = '';
  @Input() inverted = false;
  @Input() ariaLabel = '';

  @Input() set value(val: number | number[] | undefined) {
    if (val !== undefined && val !== null) {
      this._value.set(val);
    }
  }

  get value(): number | number[] {
    return this._value();
  }

  // Output events
  valueChange = output<number | number[]>();

  // Internal state
  private _value: WritableSignal<number | number[]> = signal(this.range ? [0, 100] : 0);
  private announceTimeout: any = null;

  // Form control
  private onChange = (value: number | number[]) => {};
  private onTouched = () => {};

  constructor() {
    // Initialize value based on range mode
    effect(() => {
      if (this.range && !Array.isArray(this._value())) {
        this._value.set([this.min, this.max]);
      } else if (!this.range && Array.isArray(this._value())) {
        this._value.set(this.min);
      }
    });
  }

  ngAfterViewInit(): void {
    // Set up initial z-index for range inputs
    if (this.range) {
      setTimeout(() => this.updateInputZIndex(), 0);
    }
  }

  ngOnDestroy(): void {
    if (this.announceTimeout) {
      clearTimeout(this.announceTimeout);
    }
  }

  // Computed properties
  singleValue = computed(() => {
    const value = this._value();
    return Array.isArray(value) ? value[0] : value;
  });

  rangeValues = computed(() => {
    const value = this._value();
    return Array.isArray(value) ? value : [this.min, value];
  });

  rangeStart = computed(() => {
    if (!this.range) {
      return 0;
    }
    const values = this.rangeValues();
    return this.valueToPercentage(Math.min(values[0], values[1]));
  });

  rangeWidth = computed(() => {
    if (!this.range) {
      return this.valueToPercentage(this.singleValue());
    }
    const values = this.rangeValues();
    return this.valueToPercentage(Math.max(values[0], values[1])) - this.valueToPercentage(Math.min(values[0], values[1]));
  });

  computedTicks = computed(() => {
    if (!this.showTicks) return [];

    const tickValues = this.ticks.length > 0 ? this.ticks : this.generateDefaultTicks();

    return tickValues.map(value => ({
      value,
      position: this.valueToPercentage(value)
    }));
  });

  // Event handlers
  handleSingleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    this.updateValue(value);
  }

  handleSingleChange(event: Event): void {
    this.onTouched();
  }

  handleRangeInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    const currentValues = this.rangeValues();
    const newValues = [...currentValues];

    // Prevent thumbs from crossing each other
    if (index === 0) {
      // Min thumb - cannot exceed max thumb
      newValues[0] = Math.min(value, currentValues[1]);
    } else {
      // Max thumb - cannot go below min thumb
      newValues[1] = Math.max(value, currentValues[0]);
    }

    // Update z-index to ensure the active input is on top
    this.bringInputToFront(index);

    // Sync the constrained value back to the input
    input.value = newValues[index].toString();

    this.updateValue(newValues);
  }

  handleRangeChange(event: Event, index: number): void {
    this.onTouched();
  }

  handleRangeMouseDown(event: MouseEvent, index: number): void {
    // Bring the clicked input to the front
    this.bringInputToFront(index);
  }

  handleRangeFocus(event: FocusEvent, index: number): void {
    // Bring the focused input to the front
    this.bringInputToFront(index);
  }

  private bringInputToFront(index: number): void {
    if (!this.range || !this.minInput || !this.maxInput) return;

    const minElement = this.minInput.nativeElement;
    const maxElement = this.maxInput.nativeElement;

    if (index === 0) {
      // Bring min input to front
      minElement.style.zIndex = '15';
      maxElement.style.zIndex = '14';
    } else {
      // Bring max input to front
      minElement.style.zIndex = '14';
      maxElement.style.zIndex = '15';
    }
  }

  // Helper methods
  private updateInputZIndex(): void {
    if (!this.range || !this.minInput || !this.maxInput) return;

    const values = this.rangeValues();
    const minElement = this.minInput.nativeElement;
    const maxElement = this.maxInput.nativeElement;

    // Calculate the percentage positions
    const minPos = this.valueToPercentage(values[0]);
    const maxPos = this.valueToPercentage(values[1]);

    // If thumbs are close together, prioritize the last moved one
    if (Math.abs(minPos - maxPos) < 5) {
      // Keep current z-index arrangement
      return;
    }

    // Default z-index arrangement
    minElement.style.zIndex = '14';
    maxElement.style.zIndex = '15';
  }

  private updateValue(value: number | number[]): void {
    this._value.set(value);
    this.onChange(value);
    this.valueChange.emit(value);
    this.announceValueChange(value);
  }

  private announceValueChange(value: number | number[]): void {
    const announcement = Array.isArray(value)
      ? `Range: ${this.formatValue(value[0])} to ${this.formatValue(value[1])}`
      : `Value: ${this.formatValue(value)}`;

    const liveRegion = document.getElementById('slider-live-region');
    if (liveRegion) {
      liveRegion.textContent = announcement;

      setTimeout(() => {
        if (liveRegion) {
          liveRegion.textContent = '';
        }
      }, 1000);
    }
  }

  private valueToPercentage(value: number): number {
    return ((value - this.min) / (this.max - this.min)) * 100;
  }

  private generateDefaultTicks(): number[] {
    const tickCount = Math.min(10, Math.max(2, Math.floor((this.max - this.min) / this.step) + 1));
    const stepSize = (this.max - this.min) / (tickCount - 1);

    return Array.from({ length: tickCount }, (_, i) => {
      const value = this.min + i * stepSize;
      // Round to nearest step to avoid floating point issues
      return Math.round(value / this.step) * this.step;
    });
  }

  // ControlValueAccessor implementation
  writeValue(value: number | number[]): void {
    if (value !== null && value !== undefined) {
      this._value.set(value);

      // Update native input values
      setTimeout(() => {
        if (!this.range && this.singleInput) {
          this.singleInput.nativeElement.value = this.singleValue().toString();
        } else if (this.range) {
          const values = this.rangeValues();
          if (this.minInput) {
            this.minInput.nativeElement.value = values[0].toString();
          }
          if (this.maxInput) {
            this.maxInput.nativeElement.value = values[1].toString();
          }
        }
      });
    }
  }

  registerOnChange(fn: (value: number | number[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // CSS class generators
  getContainerClasses(): string {
    return cn(
      sliderVariants({
        size: this.size,
        variant: this.variant,
      }),
      this.class
    );
  }

  getTrackClasses(): string {
    return cn(
      sliderTrackVariants({
        size: this.size,
      }),
      this.trackClass
    );
  }

  getRangeClasses(): string {
    return cn(
      sliderRangeVariants({
        variant: this.variant,
      }),
      this.rangeClass
    );
  }

  getInputClasses(): string {
    return cn(
      sliderInputVariants({
        size: this.size,
        variant: this.variant,
      }),
      this.inputClass
    );
  }

  getRangeInputClasses(type: 'min' | 'max'): string {
    return cn(
      'pointer-events-none z-10',
      '[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:z-20',
      '[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:z-20',
      // Better z-index management for range sliders
      type === 'min' ? 'z-[11]' : 'z-[12]',
      this.thumbClass
    );
  }

  getTickClasses(): string {
    return cn(
      sliderTickVariants({
        size: this.size,
      }),
      this.tickClass
    );
  }

  getLabelClasses(): string {
    return cn(
      'absolute text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap',
      'top-full left-1/2 -translate-x-1/2 mt-1',
      this.labelClass
    );
  }

  getValueDisplayClasses(): string {
    return cn(
      'absolute text-sm font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-sm border',
      '-top-8 left-1/2 -translate-x-1/2',
      this.labelClass
    );
  }

  // Style generators
  getRangeStyles(): string {
    return `left: ${this.rangeStart()}%; width: ${this.rangeWidth()}%;`;
  }

  getTickStyles(position: number): string {
    return `left: ${position}%;`;
  }

  // Formatting methods
  formatValue(value: number): string {
    // Handle edge cases and ensure clean number formatting
    if (value === null || value === undefined || isNaN(value)) {
      return '0';
    }

    // Round to avoid floating point precision issues
    const rounded = Math.round(value * 100) / 100;

    // Format based on the value range
    if (rounded >= 1000) {
      return `${Math.round(rounded / 100) / 10}k`;
    } else if (rounded % 1 === 0) {
      return rounded.toString();
    } else {
      return rounded.toFixed(1);
    }
  }
}

// Export CVA variant types for external use
export type SliderVariants = VariantProps<typeof sliderVariants>;
export type SliderInputVariants = VariantProps<typeof sliderInputVariants>;
export type SliderTrackVariants = VariantProps<typeof sliderTrackVariants>;
export type SliderRangeVariants = VariantProps<typeof sliderRangeVariants>;
export type SliderTickVariants = VariantProps<typeof sliderTickVariants>;

// Export CVA variant functions for advanced customization
export { sliderVariants, sliderInputVariants, sliderTrackVariants, sliderRangeVariants, sliderTickVariants };
