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
        ghost: 'border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

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
    <div class="relative">
      <button
        type="button"
        [class]="selectClass"
        [disabled]="disabled"
        (click)="toggleDropdown()"
        (blur)="onBlur()">
        <span class="truncate">{{ selectedLabel || placeholder }}</span>
        <svg
          class="h-4 w-4 opacity-50 transition-transform"
          [class.rotate-180]="isOpen"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      <div
        *ngIf="isOpen"
        class="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 top-full mt-1 w-full">
        <div
          *ngFor="let option of options"
          class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          [class.opacity-50]="option.disabled"
          (click)="selectOption(option)">
          <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <svg
              *ngIf="value === option.value"
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </span>
          {{ option.label }}
        </div>
      </div>
    </div>
  `
})
export class Select implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() placeholder = 'Select an option...';
  @Input() disabled = false;
  @Input() class = '';
  @Input() variant: VariantProps<typeof selectVariants>['variant'] = 'default';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  isOpen = false;
  
  private onChange = (value: string) => {};
  private onTouched = () => {};

  public get selectClass(): string {
    return cn(selectVariants({ variant: this.variant }), this.class);
  }

  public get selectedLabel(): string {
    const selected = this.options.find(option => option.value === this.value);
    return selected ? selected.label : '';
  }

  toggleDropdown() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  selectOption(option: SelectOption) {
    if (!option.disabled) {
      this.value = option.value;
      this.valueChange.emit(this.value);
      this.onChange(this.value);
      this.isOpen = false;
    }
  }

  onBlur() {
    this.onTouched();
    setTimeout(() => {
      this.isOpen = false;
    }, 200);
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
