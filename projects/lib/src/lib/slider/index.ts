import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  Input,
  signal,
  ViewChild,
  WritableSignal,
  effect,
  output,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../utils/cn';

export interface SliderProps {
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
  /** The orientation of the slider */
  orientation?: 'horizontal' | 'vertical';
  /** Size variant */
  size?: 'sm' | 'default' | 'lg';
  /** Color variant */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive';
  /** Additional CSS classes */
  class?: string;
  /** Whether to invert the slider direction */
  inverted?: boolean;
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
      [class]="getSliderContainerClasses()"
      [attr.data-orientation]="orientation"
      [attr.data-disabled]="disabled"
      [attr.aria-orientation]="orientation"
      role="group"
      [attr.aria-label]="ariaLabel"
      #sliderContainer>

      <!-- Track -->
      <div
        [class]="getTrackClasses()"
        #track
        (mousedown)="handleTrackClick($event)"
        (touchstart)="handleTrackTouch($event)">

      <!-- Range fill -->
      <div
        [class]="getRangeClasses()"
        [style.left.%]="orientation === 'horizontal' ? rangeStart() : null"
        [style.width.%]="orientation === 'horizontal' ? rangeWidth() : null"
        [style.bottom.%]="orientation === 'vertical' ? 0 : null"
        [style.height.%]="orientation === 'vertical' ? rangeWidth() : null">
      </div>        <!-- Tick marks -->
        <div *ngIf="showTicks" [class]="getTicksContainerClasses()">
          <div
            *ngFor="let tick of computedTicks()"
            [class]="getTickClasses()"
            [style.left.%]="orientation === 'horizontal' ? tick.position : 50"
            [style.bottom.%]="orientation === 'vertical' ? tick.position : null"
            [style.top.%]="orientation === 'horizontal' ? 50 : null"
            [attr.data-value]="tick.value"
            [attr.data-orientation]="orientation">
            <span *ngIf="showLabels" [class]="getTickLabelClasses()">
              {{ tick.value }}
            </span>
          </div>
        </div>
      </div>

      <!-- Thumbs -->
      <div
        *ngFor="let thumb of thumbs(); let i = index"
        [class]="getThumbClasses(i)"
        [style.left.%]="orientation === 'horizontal' ? thumb.position : null"
        [style.bottom.%]="orientation === 'vertical' ? thumb.position : null"
        [tabindex]="disabled ? -1 : 0"
        role="slider"
        [attr.aria-valuemin]="min"
        [attr.aria-valuemax]="max"
        [attr.aria-valuenow]="thumb.value"
        [attr.aria-valuetext]="getAriaValueText(thumb.value)"
        [attr.aria-orientation]="orientation"
        [attr.aria-disabled]="disabled"
        [attr.aria-label]="getThumbAriaLabel(i)"
        [attr.aria-describedby]="'slider-instructions-' + i"
        [attr.data-thumb-index]="i"
        [attr.data-orientation]="orientation"
        (mousedown)="handleThumbMouseDown($event, i)"
        (touchstart)="handleThumbTouchStart($event, i)"
        (keydown)="handleThumbKeyDown($event, i)"
        (focus)="handleThumbFocus(i)"
        (blur)="handleThumbBlur(i)"
        #thumb>

        <!-- Thumb indicator -->
        <div [class]="getThumbIndicatorClasses(i)"></div>

        <!-- Value tooltip -->
        <div
          *ngIf="activeThumb() === i && showTooltip()"
          [class]="getTooltipClasses()">
          {{ formatValue(thumb.value) }}
        </div>

        <!-- Screen reader instructions -->
        <div
          [id]="'slider-instructions-' + i"
          class="sr-only"
          aria-hidden="false">
          Use Tab or Shift+Tab to set focus on the slider. 
          Use {{ orientation === 'horizontal' ? 'left and right' : 'up and down' }} arrow keys to adjust value. 
          Use Page Up and Page Down for larger increments. 
          Use Home and End to jump to minimum and maximum values.
          Use Escape to release focus.
        </div>
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
  styles: [`
    :host {
      display: block;
      touch-action: none;
      user-select: none;
    }

    .slider-container {
      position: relative;
      display: flex;
      align-items: center;
      cursor: ew-resize;
      width: 100%;
    }

    .slider-container[data-orientation="vertical"] {
      height: 200px;
      min-height: 200px;
      width: 32px;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      cursor: ns-resize;
    }
    
    .slider-container[data-orientation="vertical"].h-32 {
      height: 8rem; /* 128px */
    }
    
    .slider-container[data-orientation="vertical"].h-40 {
      height: 10rem; /* 160px */
    }
    
    .slider-container[data-orientation="vertical"].h-48 {
      height: 12rem; /* 192px */
    }

    .slider-container[data-disabled="true"] {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .slider-track {
      position: relative;
      background: var(--slider-track-bg, rgb(226 232 240));
      border-radius: 9999px;
      transition: background-color 0.2s ease;
      flex-shrink: 0;
      /* Ensure minimum visibility */
      min-width: 2px;
      min-height: 2px;
    }

    .slider-track:hover {
      background: var(--slider-track-hover-bg, rgb(203 213 225));
    }

    .dark .slider-track {
      background: var(--slider-track-bg, rgb(71 85 105));
    }

    .dark .slider-track:hover {
      background: var(--slider-track-hover-bg, rgb(51 65 85));
    }

    .slider-range {
      position: absolute;
      border-radius: inherit;
      /* Remove transition to fix lag */
    }

    .slider-thumb {
      position: absolute;
      z-index: 10;
      border-radius: 50%;
      border: 2px solid white;
      background: white;
      cursor: grab;
      transition: all 0.15s ease;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
      margin-left: -10px; /* Half of default thumb width */
      margin-top: -10px; /* Half of default thumb height */
    }

    .slider-thumb:active {
      cursor: grabbing;
    }

    /* Horizontal orientation positioning */
    .slider-container[data-orientation="horizontal"] .slider-thumb {
      top: 50%;
      cursor: ew-resize;
    }

    .slider-container[data-orientation="horizontal"] .slider-range {
      top: 0;
      bottom: 0;
    }

    .slider-container[data-orientation="horizontal"] .slider-track {
      cursor: ew-resize;
    }

    .slider-container[data-orientation="horizontal"] .slider-thumb:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      cursor: ew-resize;
    }

    .slider-container[data-orientation="horizontal"] .slider-thumb:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgb(59 130 246 / 0.5);
      transform: scale(1.1);
      cursor: ew-resize;
    }

    .slider-container[data-orientation="horizontal"] .slider-thumb:active {
      cursor: ew-resize;
      transform: scale(1.05);
    }

    /* Vertical orientation positioning */
    .slider-container[data-orientation="vertical"] .slider-thumb {
      left: 50%;
      cursor: ns-resize;
    }

    .slider-container[data-orientation="vertical"] .slider-range {
      left: 0;
      right: 0;
      width: 100%;
      bottom: 0;
    }

    .slider-container[data-orientation="vertical"] .slider-track {
      width: 6px !important;
      height: 100% !important;
      background: var(--slider-track-bg, rgb(226 232 240)) !important;
      cursor: ns-resize;
    }

    .slider-container[data-orientation="vertical"] .slider-thumb:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      cursor: ns-resize;
    }

    .slider-container[data-orientation="vertical"] .slider-thumb:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgb(59 130 246 / 0.5);
      transform: scale(1.1);
      cursor: ns-resize;
    }

    .slider-container[data-orientation="vertical"] .slider-thumb:active {
      cursor: ns-resize;
      transform: scale(1.05);
    }

    .slider-tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 8px;
      padding: 4px 8px;
      background: rgb(17 24 39);
      color: white;
      font-size: 0.75rem;
      border-radius: 4px;
      white-space: nowrap;
      pointer-events: none;
    }

    .slider-tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 4px solid transparent;
      border-top-color: rgb(17 24 39);
    }

    .slider-ticks {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .slider-tick {
      position: absolute;
      background: rgb(148 163 184);
      border-radius: 50%;
    }

    /* Horizontal orientation tick positioning */
    .slider-container[data-orientation="horizontal"] .slider-tick {
      top: 50%;
      transform: translate(-50%, -50%);
    }

    /* Vertical orientation tick positioning */
    .slider-container[data-orientation="vertical"] .slider-tick {
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .slider-tick-label {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 4px;
      font-size: 0.75rem;
      color: rgb(100 116 139);
      white-space: nowrap;
    }

    .dark .slider-tick-label {
      color: rgb(148 163 184);
    }

    /* Size variants */
    .slider-sm .slider-track {
      height: 4px;
    }

    .slider-sm .slider-container[data-orientation="vertical"] {
      width: 20px;
      height: 150px;
    }

    .slider-sm .slider-track[data-orientation="vertical"] {
      width: 4px !important;
      height: 100% !important;
    }

    .slider-sm .slider-thumb {
      width: 16px;
      height: 16px;
      margin-left: -8px;
      margin-top: -8px;
    }

    .slider-sm .slider-tick {
      width: 2px;
      height: 2px;
    }

    .slider-default .slider-track {
      height: 6px;
    }

    .slider-default .slider-container[data-orientation="vertical"] {
      width: 32px;
      height: 200px;
    }

    .slider-default .slider-track[data-orientation="vertical"] {
      width: 6px !important;
      height: 100% !important;
    }

    .slider-default .slider-thumb {
      width: 20px;
      height: 20px;
      margin-left: -10px;
      margin-top: -10px;
    }

    .slider-default .slider-tick {
      width: 3px;
      height: 3px;
    }

    .slider-lg .slider-track {
      height: 8px;
    }

    .slider-lg .slider-container[data-orientation="vertical"] {
      width: 40px;
      height: 250px;
    }

    .slider-lg .slider-track[data-orientation="vertical"] {
      width: 8px !important;
      height: 100% !important;
    }

    .slider-lg .slider-thumb {
      width: 24px;
      height: 24px;
      margin-left: -12px;
      margin-top: -12px;
    }

    .slider-lg .slider-tick {
      width: 4px;
      height: 4px;
    }

    /* Animation classes */
    @media (prefers-reduced-motion: no-preference) {
      .slider-thumb {
        transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .slider-track {
        transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }

    /* Screen reader only content */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* Focus indicators for better accessibility */
    .slider-thumb:focus-visible {
      outline: 2px solid rgb(59 130 246);
      outline-offset: 2px;
      box-shadow: 0 0 0 4px rgb(59 130 246 / 0.2);
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .slider-track {
        border: 2px solid ButtonText;
      }
      
      .slider-thumb {
        border: 3px solid ButtonText;
        background: ButtonFace;
      }
      
      .slider-range {
        background: Highlight;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Slider implements ControlValueAccessor, OnDestroy {
  @ViewChild('sliderContainer', { static: true }) sliderContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('track', { static: true }) track!: ElementRef<HTMLDivElement>;

  // Input properties
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() disabled = false;
  @Input() range = false;
  @Input() showLabels = false;
  @Input() showTicks = false;
  @Input() ticks: number[] = [];
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() size: 'sm' | 'default' | 'lg' = 'default';
  @Input() variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' = 'default';
  @Input() class = '';
  @Input() inverted = false;
  @Input() ariaLabel = 'Slider';
  
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
  thumbFocus = output<{ index: number; value: number }>();
  thumbBlur = output<{ index: number; value: number }>();

  // Internal state
  private _value: WritableSignal<number | number[]> = signal(this.range ? [0, 100] : 0);
  protected activeThumb = signal<number | null>(null);
  private isDragging = signal(false);
  private dragStartPosition = { x: 0, y: 0 };
  protected showTooltip = signal(false);
  private announceTimeout: any = null;
  private isKeyboardInteracting = false;
  private keyRepeatTimer: any = null;
  private lastBlurReason: 'tab' | 'outside' | 'keyboard' | null = null;

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

  ngOnDestroy(): void {
    if (this.announceTimeout) {
      clearTimeout(this.announceTimeout);
      this.announceTimeout = null;
    }
    if (this.keyRepeatTimer) {
      clearTimeout(this.keyRepeatTimer);
      this.keyRepeatTimer = null;
    }
    
    // Clean up state
    this.lastBlurReason = null;
  }

  // Computed properties
  currentValue = computed(() => this._value());

  thumbs = computed(() => {
    const currentValue = this._value();
    const values = Array.isArray(currentValue) ? currentValue : [currentValue];

    return values.map(value => ({
      value: this.clampValue(value),
      position: this.valueToPercentage(this.clampValue(value))
    }));
  });

  rangeStart = computed(() => {
    const values = this.thumbs();
    if (values.length === 1) {
      // For single value sliders, always start from 0
      return 0;
    }
    // For range sliders, start from the minimum value
    return Math.min(values[0].position, values[1].position);
  });

  rangeWidth = computed(() => {
    const values = this.thumbs();
    if (values.length === 1) {
      // For single value sliders, fill from 0 to current value
      return values[0].position;
    }
    // For range sliders, fill between the two values
    return Math.abs(values[1].position - values[0].position);
  });

  computedTicks = computed(() => {
    if (!this.showTicks) return [];

    const tickValues = this.ticks.length > 0 ? this.ticks : this.generateDefaultTicks();

    return tickValues.map(value => ({
      value,
      position: this.valueToPercentage(value)
    }));
  });

  // ControlValueAccessor implementation
  writeValue(value: number | number[]): void {
    if (value !== null && value !== undefined) {
      this._value.set(value);
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

  // Event handlers
  handleTrackClick(event: MouseEvent): void {
    if (this.disabled) return;

    event.preventDefault();
    const trackRect = this.track.nativeElement.getBoundingClientRect();
    const percentage = this.getPercentageFromEvent(event, trackRect);
    const value = this.percentageToValue(percentage);

    this.updateNearestThumb(value);
    this.onTouched();
  }

  handleTrackTouch(event: TouchEvent): void {
    if (this.disabled) return;

    event.preventDefault();
    const touch = event.touches[0];
    const trackRect = this.track.nativeElement.getBoundingClientRect();
    const percentage = this.getPercentageFromTouch(touch, trackRect);
    const value = this.percentageToValue(percentage);

    this.updateNearestThumb(value);
    this.onTouched();
  }

  handleThumbMouseDown(event: MouseEvent, index: number): void {
    if (this.disabled) return;

    event.preventDefault();
    this.startDrag(index, { x: event.clientX, y: event.clientY });
  }

  handleThumbTouchStart(event: TouchEvent, index: number): void {
    if (this.disabled) return;

    event.preventDefault();
    const touch = event.touches[0];
    this.startDrag(index, { x: touch.clientX, y: touch.clientY });
  }

  handleThumbKeyDown(event: KeyboardEvent, index: number): void {
    if (this.disabled) return;

    let valueChange = 0;
    const currentValue = this.thumbs()[index].value;
    let shouldPreventDefault = true;
    let isNavigationKey = false;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        valueChange = this.step;
        isNavigationKey = true;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        valueChange = -this.step;
        isNavigationKey = true;
        break;
      case 'PageUp':
        valueChange = (this.max - this.min) * 0.1;
        isNavigationKey = true;
        break;
      case 'PageDown':
        valueChange = -(this.max - this.min) * 0.1;
        isNavigationKey = true;
        break;
      case 'Home':
        valueChange = this.min - currentValue;
        isNavigationKey = true;
        break;
      case 'End':
        valueChange = this.max - currentValue;
        isNavigationKey = true;
        break;
      case 'Tab':
      case 'Escape':
        // Allow normal tab behavior and escape
        if (event.key === 'Escape') {
          this.isKeyboardInteracting = false;
          this.lastBlurReason = 'keyboard';
          const thumbElement = event.target as HTMLElement;
          if (thumbElement && thumbElement.blur) {
            thumbElement.blur();
          }
        } else if (event.key === 'Tab') {
          // Mark that blur is caused by Tab navigation
          this.lastBlurReason = 'tab';
          this.isKeyboardInteracting = false;
        }
        shouldPreventDefault = false;
        return;
      default:
        shouldPreventDefault = false;
        return;
    }

    if (shouldPreventDefault) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (isNavigationKey) {
      // Mark that we're in keyboard interaction mode
      this.isKeyboardInteracting = true;
      
      // Clear any existing timer
      if (this.keyRepeatTimer) {
        clearTimeout(this.keyRepeatTimer);
      }
      
      // Set a longer timeout to ensure continuous key presses are detected
      this.keyRepeatTimer = setTimeout(() => {
        this.isKeyboardInteracting = false;
      }, 300);

      const newValue = this.clampValue(currentValue + valueChange);
      this.updateThumbValue(index, newValue);
      this.onTouched();

      // Ensure the thumb maintains focus after value update
      setTimeout(() => {
        const thumbElement = event.target as HTMLElement;
        if (thumbElement && document.activeElement !== thumbElement) {
          thumbElement.focus();
        }
      }, 0);
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleDocumentKeyDown(event: KeyboardEvent): void {
    // If we have an active thumb and a navigation key is pressed, extend keyboard interaction mode
    if (this.activeThumb() !== null && 
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End'].includes(event.key)) {
      this.isKeyboardInteracting = true;
      
      // Clear and reset the timer
      if (this.keyRepeatTimer) {
        clearTimeout(this.keyRepeatTimer);
      }
      
      this.keyRepeatTimer = setTimeout(() => {
        this.isKeyboardInteracting = false;
      }, 300);
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent): void {
    // Reset keyboard interaction mode when keys are released
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End'].includes(event.key)) {
      // Clear existing timer
      if (this.keyRepeatTimer) {
        clearTimeout(this.keyRepeatTimer);
      }
      
      // Set a longer delay before resetting to allow for quick key repeats
      this.keyRepeatTimer = setTimeout(() => {
        this.isKeyboardInteracting = false;
      }, 200);
    }
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent): void {
    // Check if click is outside the slider component
    const sliderElement = this.sliderContainer?.nativeElement;
    if (sliderElement && !sliderElement.contains(event.target as Node)) {
      this.lastBlurReason = 'outside';
    }
  }

  handleThumbFocus(index: number): void {
    this.activeThumb.set(index);
    this.showTooltip.set(true);
    this.thumbFocus.emit({ index, value: this.thumbs()[index].value });
    
    // Only announce on initial focus, not during keyboard navigation
    // The value changes will be announced through updateThumbValue
  }

  handleThumbBlur(index: number): void {
    // Allow blur for Tab navigation and outside clicks
    if (this.lastBlurReason === 'tab' || this.lastBlurReason === 'outside' || this.lastBlurReason === 'keyboard') {
      this.lastBlurReason = null; // Reset the reason
      
      // Clear active state for these legitimate blur reasons
      setTimeout(() => {
        const activeElement = document.activeElement;
        const isSliderFocused = activeElement && 
          (activeElement.getAttribute('data-thumb-index') !== null ||
           activeElement.closest('[role="group"]') === this.sliderContainer.nativeElement);
        
        if (!isSliderFocused && this.activeThumb() === index) {
          this.activeThumb.set(null);
          this.showTooltip.set(false);
        }
      }, 10);
      
      this.thumbBlur.emit({ index, value: this.thumbs()[index].value });
      return;
    }

    // Only prevent blur during active keyboard interaction with arrow keys
    if (this.isKeyboardInteracting) {
      // Refocus the element to prevent blur during continuous navigation
      setTimeout(() => {
        const thumbElements = this.sliderContainer.nativeElement.querySelectorAll('[data-thumb-index="' + index + '"]');
        if (thumbElements.length > 0) {
          (thumbElements[0] as HTMLElement).focus();
        }
      }, 0);
      return;
    }

    // Default blur behavior - only clear if focus is truly leaving the component
    setTimeout(() => {
      const activeElement = document.activeElement;
      const isSliderFocused = activeElement && 
        (activeElement.getAttribute('data-thumb-index') !== null ||
         activeElement.closest('[role="group"]') === this.sliderContainer.nativeElement);
      
      if (!isSliderFocused && this.activeThumb() === index) {
        this.activeThumb.set(null);
        this.showTooltip.set(false);
      }
    }, 50);
    
    this.thumbBlur.emit({ index, value: this.thumbs()[index].value });
  }

  @HostListener('document:mousemove', ['$event'])
  handleMouseMove(event: MouseEvent): void {
    if (!this.isDragging() || this.activeThumb() === null) return;

    this.updateThumbFromDrag(event.clientX, event.clientY);
  }

  @HostListener('document:touchmove', ['$event'])
  handleTouchMove(event: TouchEvent): void {
    if (!this.isDragging() || this.activeThumb() === null) return;

    event.preventDefault();
    const touch = event.touches[0];
    this.updateThumbFromDrag(touch.clientX, touch.clientY);
  }

  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  handleDragEnd(): void {
    if (this.isDragging()) {
      this.isDragging.set(false);
      this.activeThumb.set(null);
      this.showTooltip.set(false);
    }
  }

  // Helper methods
  private startDrag(index: number, position: { x: number; y: number }): void {
    this.activeThumb.set(index);
    this.isDragging.set(true);
    this.showTooltip.set(true);
    this.dragStartPosition = position;
  }

  private announceValueChange(value: number, index: number): void {
    // Create an announcement for screen readers
    const announcement = this.range 
      ? `${index === 0 ? 'Minimum' : 'Maximum'} value: ${this.formatValue(value)}`
      : `Value: ${this.formatValue(value)}`;
    
    // Use the live region in the template
    const liveRegion = document.getElementById('slider-live-region');
    if (liveRegion) {
      liveRegion.textContent = announcement;
      
      // Clear the announcement after a short delay to allow screen readers to pick it up
      setTimeout(() => {
        if (liveRegion) {
          liveRegion.textContent = '';
        }
      }, 1000);
    }
  }

  private updateThumbFromDrag(clientX: number, clientY: number): void {
    if (this.activeThumb() === null) return;

    const trackRect = this.track.nativeElement.getBoundingClientRect();
    const percentage = this.orientation === 'horizontal'
      ? this.getPercentageFromPosition(clientX, trackRect.left, trackRect.width)
      : this.getPercentageFromPosition(clientY, trackRect.top, trackRect.height);

    const value = this.percentageToValue(percentage);
    this.updateThumbValue(this.activeThumb()!, value);
  }

  private updateNearestThumb(value: number): void {
    const thumbs = this.thumbs();
    if (thumbs.length === 1) {
      this.updateThumbValue(0, value);
      return;
    }

    // Find the nearest thumb
    const distances = thumbs.map(thumb => Math.abs(thumb.value - value));
    const nearestIndex = distances.indexOf(Math.min(...distances));
    this.updateThumbValue(nearestIndex, value);
  }

  private updateThumbValue(index: number, value: number): void {
    const clampedValue = this.clampValue(value);
    const currentValue = this._value();

    if (Array.isArray(currentValue)) {
      const newValue = [...currentValue];
      newValue[index] = clampedValue;

      // Ensure thumbs don't cross over
      if (newValue.length === 2) {
        if (index === 0 && newValue[0] > newValue[1]) {
          newValue[1] = newValue[0];
        } else if (index === 1 && newValue[1] < newValue[0]) {
          newValue[0] = newValue[1];
        }
      }

      this._value.set(newValue);
      this.onChange(newValue);
      this.valueChange.emit(newValue);
    } else {
      this._value.set(clampedValue);
      this.onChange(clampedValue);
      this.valueChange.emit(clampedValue);
    }

    // Throttle announcements during rapid keyboard navigation
    if (this.announceTimeout) {
      clearTimeout(this.announceTimeout);
    }
    this.announceTimeout = setTimeout(() => {
      this.announceValueChange(clampedValue, index);
      this.announceTimeout = null;
    }, 150);
  }

  private clampValue(value: number): number {
    const steppedValue = Math.round((value - this.min) / this.step) * this.step + this.min;
    return Math.max(this.min, Math.min(this.max, steppedValue));
  }

  private valueToPercentage(value: number): number {
    return ((value - this.min) / (this.max - this.min)) * 100;
  }

  private percentageToValue(percentage: number): number {
    return this.min + (percentage / 100) * (this.max - this.min);
  }

  private getPercentageFromEvent(event: MouseEvent, trackRect: DOMRect): number {
    return this.orientation === 'horizontal'
      ? this.getPercentageFromPosition(event.clientX, trackRect.left, trackRect.width)
      : this.getPercentageFromPosition(event.clientY, trackRect.top, trackRect.height);
  }

  private getPercentageFromTouch(touch: Touch, trackRect: DOMRect): number {
    return this.orientation === 'horizontal'
      ? this.getPercentageFromPosition(touch.clientX, trackRect.left, trackRect.width)
      : this.getPercentageFromPosition(touch.clientY, trackRect.top, trackRect.height);
  }

  private getPercentageFromPosition(position: number, trackStart: number, trackSize: number): number {
    const relative = position - trackStart;
    let percentage = (relative / trackSize) * 100;

    // For vertical sliders, we want 0% at bottom, 100% at top
    // Since we're using bottom positioning now, we don't need to invert
    if (this.orientation === 'vertical') {
      percentage = 100 - percentage; // Keep this inversion for mouse coordinate conversion
    }

    if (this.inverted) {
      percentage = 100 - percentage;
    }

    return Math.max(0, Math.min(100, percentage));
  }

  private generateDefaultTicks(): number[] {
    const tickCount = Math.min(10, Math.max(2, Math.floor((this.max - this.min) / this.step) + 1));
    const stepSize = (this.max - this.min) / (tickCount - 1);

    return Array.from({ length: tickCount }, (_, i) =>
      this.min + i * stepSize
    );
  }

  // CSS class generators
  getSliderContainerClasses(): string {
    return cn(
      'slider-container',
      `slider-${this.size}`,
      this.orientation === 'vertical' && 'flex-col',
      this.disabled && 'opacity-50 cursor-not-allowed',
      this.class
    );
  }

  getTrackClasses(): string {
    const baseClasses = [
      'slider-track',
      'relative bg-gray-200 dark:bg-gray-700 rounded-full transition-colors',
    ];

    // Ensure tracks are visible in both orientations
    if (this.orientation === 'horizontal') {
      baseClasses.push('w-full');
    } else {
      baseClasses.push('h-full');
    }

    return cn(baseClasses);
  }

  getRangeClasses(): string {
    const variantClasses = {
      default: 'bg-gray-900 dark:bg-gray-100',
      primary: 'bg-blue-500 dark:bg-blue-400',
      secondary: 'bg-gray-600 dark:bg-gray-400',
      success: 'bg-green-500 dark:bg-green-400',
      warning: 'bg-yellow-500 dark:bg-yellow-400',
      destructive: 'bg-red-500 dark:bg-red-400'
    };

    return cn(
      'slider-range',
      'absolute rounded-full',
      variantClasses[this.variant]
    );
  }

  getThumbClasses(index: number): string {
    const variantClasses = {
      default: 'border-gray-900 dark:border-gray-100',
      primary: 'border-blue-500 dark:border-blue-400',
      secondary: 'border-gray-600 dark:border-gray-400',
      success: 'border-green-500 dark:border-green-400',
      warning: 'border-yellow-500 dark:border-yellow-400',
      destructive: 'border-red-500 dark:border-red-400'
    };

    return cn(
      'slider-thumb',
      'absolute bg-white border-2 rounded-full cursor-grab',
      'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
      'transition-all duration-150 ease-out',
      'shadow-md hover:shadow-lg',
      variantClasses[this.variant],
      this.disabled && 'cursor-not-allowed',
      this.activeThumb() === index && 'z-20 cursor-grabbing'
    );
  }

  getThumbIndicatorClasses(index: number): string {
    const variantClasses = {
      default: 'bg-gray-900 dark:bg-gray-100',
      primary: 'bg-blue-500 dark:bg-blue-400',
      secondary: 'bg-gray-600 dark:bg-gray-400',
      success: 'bg-green-500 dark:bg-green-400',
      warning: 'bg-yellow-500 dark:bg-yellow-400',
      destructive: 'bg-red-500 dark:bg-red-400'
    };

    return cn(
      'w-2 h-2 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
      variantClasses[this.variant]
    );
  }

  getTicksContainerClasses(): string {
    return cn('slider-ticks', 'absolute inset-0 pointer-events-none');
  }

  getTickClasses(): string {
    return cn(
      'slider-tick',
      'absolute bg-gray-400 dark:bg-gray-500 rounded-full',
      'transform -translate-x-1/2 -translate-y-1/2'
    );
  }

  getTickLabelClasses(): string {
    return cn(
      'slider-tick-label',
      'absolute text-xs text-gray-500 dark:text-gray-400',
      'transform -translate-x-1/2',
      this.orientation === 'horizontal' ? 'top-full mt-1' : 'left-full ml-1'
    );
  }

  getTooltipClasses(): string {
    return cn(
      'slider-tooltip',
      'absolute bg-gray-900 text-white text-xs px-2 py-1 rounded',
      'pointer-events-none whitespace-nowrap',
      this.orientation === 'horizontal'
        ? 'bottom-full mb-2 left-1/2 transform -translate-x-1/2'
        : 'right-full mr-2 top-1/2 transform -translate-y-1/2'
    );
  }

  // Formatting methods
  formatValue(value: number): string {
    return value.toString();
  }

  getAriaValueText(value: number): string {
    return `${value} of ${this.max}`;
  }

  getThumbAriaLabel(index: number): string {
    if (this.range) {
      return index === 0 ? 'Minimum value thumb' : 'Maximum value thumb';
    }
    return 'Slider thumb';
  }
}
