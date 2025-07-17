import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const selectVariants = cva(
  'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
  selector: 'Select',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
  template: `
    <select
      [class]="cn(selectVariants({ variant }), className)"
      [disabled]="disabled"
      [value]="value"
      (change)="onSelectionChange($event)"
      (blur)="onTouched()"
    >
      <option value="" disabled selected *ngIf="placeholder">{{placeholder}}</option>
      <option *ngFor="let option of options" [value]="option.value">
        {{option.label}}
      </option>
    </select>
  `
})
export class Select implements ControlValueAccessor {
  @Input() variant: VariantProps<typeof selectVariants>['variant'] = 'default';
  @Input() className?: string;
  @Input() placeholder?: string;
  @Input() disabled = false;
  @Input() options: Array<{value: string, label: string}> = [];
  @Output() valueChange = new EventEmitter<string>();

  value = '';
  onChange = (value: string) => {};
  onTouched = () => {};

  cn = cn;
  selectVariants = selectVariants;

  onSelectionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

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