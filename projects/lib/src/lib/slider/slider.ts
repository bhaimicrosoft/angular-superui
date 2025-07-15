import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const sliderVariants = cva(
  'relative flex w-full touch-none select-none items-center',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Component({
  selector: 'lib-slider',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Slider),
      multi: true,
    },
  ],
  template: `
    <div [class]="sliderClass">
      <div class="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <div 
          class="absolute h-full bg-primary transition-all"
          [style.width.%]="percentage">
        </div>
      </div>
      <div 
        class="absolute h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
        [style.left.%]="percentage"
        [style.transform]="'translateX(-50%)'"
        #thumb
        (mousedown)="onMouseDown($event)"
        (touchstart)="onTouchStart($event)">
      </div>
      <input
        type="range"
        class="absolute h-2 w-full cursor-pointer opacity-0"
        [min]="min"
        [max]="max"
        [step]="step"
        [value]="value"
        [disabled]="disabled"
        (input)="onInput($event)"
        (change)="onChange($event)">
    </div>
  `
})
export class Slider implements ControlValueAccessor {
  @ViewChild('thumb', { static: false }) thumb!: ElementRef;
  
  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() disabled = false;
  @Input() class = '';
  @Input() variant: VariantProps<typeof sliderVariants>['variant'] = 'default';
  @Output() valueChange = new EventEmitter<number>();

  private onChangeCallback = (value: number) => {};
  private onTouchedCallback = () => {};

  public get sliderClass(): string {
    return cn(sliderVariants({ variant: this.variant }), this.class);
  }

  public get percentage(): number {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const newValue = Number(target.value);
    this.value = newValue;
    this.valueChange.emit(this.value);
    this.onChangeCallback(this.value);
  }

  onChange(event: Event) {
    this.onTouchedCallback();
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    if (!this.disabled) {
      this.onTouchedCallback();
    }
  }

  onTouchStart(event: TouchEvent) {
    event.preventDefault();
    if (!this.disabled) {
      this.onTouchedCallback();
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
