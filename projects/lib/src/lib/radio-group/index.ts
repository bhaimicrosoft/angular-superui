import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const radioVariants = cva(
  'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'RadioGroup',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroup),
      multi: true,
    },
  ],
  template: `
    <div class="grid gap-2" [class]="class">
      <div
        *ngFor="let option of options"
        class="flex items-center space-x-2">
        <button
          type="button"
          [class]="radioClass"
          [disabled]="option.disabled || disabled"
          [attr.data-state]="value === option.value ? 'checked' : 'unchecked'"
          (click)="selectOption(option.value)">
          <span
            *ngIf="value === option.value"
            class="flex items-center justify-center">
            <svg class="h-2.5 w-2.5 fill-current text-current">
              <circle cx="5" cy="5" r="3"></circle>
            </svg>
          </span>
        </button>
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          [class.opacity-50]="option.disabled"
          (click)="selectOption(option.value)">
          {{ option.label }}
        </label>
      </div>
    </div>
  `
})
export class RadioGroup implements ControlValueAccessor {
  @Input() options: RadioOption[] = [];
  @Input() disabled = false;
  @Input() class = '';
  @Input() variant: VariantProps<typeof radioVariants>['variant'] = 'default';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  private onChange = (value: string) => {};
  private onTouched = () => {};

  public get radioClass(): string {
    return cn(radioVariants({ variant: this.variant }));
  }

  selectOption(optionValue: string) {
    const option = this.options.find(opt => opt.value === optionValue);
    if (!option?.disabled && !this.disabled) {
      this.value = optionValue;
      this.valueChange.emit(this.value);
      this.onChange(this.value);
      this.onTouched();
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

@Component({
  selector: 'RadioGroupItem',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [class]="radioClass"
      [disabled]="disabled"
      [attr.data-state]="checked ? 'checked' : 'unchecked'"
      (click)="onClick()">
      <span
        *ngIf="checked"
        class="flex items-center justify-center">
        <svg class="h-2.5 w-2.5 fill-current text-current">
          <circle cx="5" cy="5" r="3"></circle>
        </svg>
      </span>
    </button>
  `
})
export class RadioGroupItem {
  @Input() value = '';
  @Input() disabled = false;
  @Input() checked = false;
  @Input() class = '';
  @Input() variant: VariantProps<typeof radioVariants>['variant'] = 'default';
  @Output() itemClick = new EventEmitter<string>();

  public get radioClass(): string {
    return cn(radioVariants({ variant: this.variant }), this.class);
  }

  onClick() {
    if (!this.disabled) {
      this.itemClick.emit(this.value);
    }
  }
}
