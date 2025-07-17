import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
  selector: 'TextareaComponent',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  template: `
    <textarea
      [class]="cn(textareaVariants({ variant }), className)"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [readonly]="readonly"
      [rows]="rows"
      [cols]="cols"
      [value]="value"
      (input)="onInput($event)"
      (blur)="onTouched()"
      (focus)="onFocus.emit($event)"
    ></textarea>
  `
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() variant: VariantProps<typeof textareaVariants>['variant'] = 'default';
  @Input() className?: string;
  @Input() placeholder?: string;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() rows?: number;
  @Input() cols?: number;
  @Output() valueChange = new EventEmitter<string>();
  @Output() onFocus = new EventEmitter<FocusEvent>();

  value = '';
  onChange = (value: string) => {};
  onTouched = () => {};

  cn = cn;
  textareaVariants = textareaVariants;

  onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  writeValue(value: string): void {
    this.value = value || '';
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