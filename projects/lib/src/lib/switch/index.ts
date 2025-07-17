import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const switchVariants = cva(
  'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
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
  selector: 'Switch',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Switch),
      multi: true,
    },
  ],
  template: `
    <button
      type="button"
      role="switch"
      [class]="cn(switchVariants({ variant }), className)"
      [attr.aria-checked]="checked"
      [attr.data-state]="checked ? 'checked' : 'unchecked'"
      [disabled]="disabled"
      (click)="toggle()"
    >
      <span
        class="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        [attr.data-state]="checked ? 'checked' : 'unchecked'"
      ></span>
    </button>
  `
})
export class Switch implements ControlValueAccessor {
  @Input() variant: VariantProps<typeof switchVariants>['variant'] = 'default';
  @Input() className?: string;
  @Input() disabled = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  checked = false;
  onChange = (value: boolean) => {};
  onTouched = () => {};

  cn = cn;
  switchVariants = switchVariants;

  toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onChange(this.checked);
      this.checkedChange.emit(this.checked);
      this.onTouched();
    }
  }

  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}