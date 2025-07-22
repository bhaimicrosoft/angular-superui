import { Component, Input, Output, EventEmitter, signal, ViewChild, ElementRef, forwardRef, computed, effect, ChangeDetectionStrategy, OnDestroy, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/**
 * Input component variants using Class Variance Authority (CVA)
 * Provides consistent styling patterns with Tailwind CSS
 *
 * Variants:
 * - default: Standard input with border
 * - filled: Input with background fill
 * - flushed: Borderless input with bottom border only
 * - unstyled: No styling for complete customization
 */
const inputVariants = cva(
  [
    'flex h-9 w-full px-3 py-1 text-sm transition-colors',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
    // Enhanced focus styles for better accessibility
    'focus:ring-2 focus:ring-offset-2 focus:ring-ring',
  ],
  {
    variants: {
      variant: {
        default: [
          'border border-input bg-background',
          'rounded-md',
          'focus-visible:ring-offset-2',
        ],
        filled: [
          'border border-transparent bg-muted',
          'rounded-md',
          'focus-visible:bg-background focus-visible:border-input',
        ],
        flushed: [
          'border-0 border-b border-input bg-transparent px-0',
          'rounded-none',
          'focus-visible:border-ring',
        ],
        unstyled: [
          'border-0 bg-transparent p-0',
          'focus-visible:ring-0 focus-visible:ring-offset-0',
        ],
      },
      size: { // Changed from inputSize to size for consistency
        sm: 'h-8 px-2 py-1 text-xs',
        md: 'h-9 px-3 py-1 text-sm',
        lg: 'h-10 px-4 py-2 text-base',
        xl: 'h-12 px-4 py-3 text-lg',
      },
      state: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive focus:ring-destructive',
        success: 'border-success focus-visible:ring-success focus:ring-success',
        warning: 'border-warning focus-visible:ring-warning focus:ring-warning',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  }
);

export interface InputProps extends VariantProps<typeof inputVariants> {
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  type?: string;
  id?: string;
  name?: string;
  value?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  step?: string | number;
  min?: string | number;
  max?: string | number;
  className?: string;
  // Enhanced accessibility props
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  errorMessage?: string;
  helpText?: string;
  // Mobile optimization
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  // Performance optimization
  debounceTime?: number;
}

@Component({
  selector: 'InputComponent',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative">
      <input
        #inputElement
        [type]="type || 'text'"
        [id]="computedId()"
        [name]="name"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [readonly]="readonly"
        [required]="required"
        [value]="currentValue()"
        [autocomplete]="autoComplete || 'off'"
        [autofocus]="autoFocus"
        [attr.inputmode]="inputMode"
        [attr.maxlength]="maxLength"
        [attr.minlength]="minLength"
        [pattern]="pattern"
        [step]="step"
        [min]="min"
        [max]="max"
        [attr.aria-invalid]="computedAriaInvalid()"
        [attr.aria-required]="required || null"
        [attr.aria-label]="ariaLabel"
        [attr.aria-labelledby]="ariaLabelledBy"
        [attr.aria-describedby]="computedAriaDescribedBy()"
        [class]="computedClasses()"
        (input)="onInput($event)"
        (blur)="onBlur($event)"
        (focus)="onFocus($event)"
        (keydown)="onKeyDown($event)"
        (keyup)="onKeyUp($event)"
        (paste)="onPaste($event)"
      />
      
      <!-- Loading indicator -->
      @if (isValidating()) {
        <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div class="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      }
    </div>
    
    <!-- Help text -->
    @if (helpText && !errorMessage) {
      <p [id]="helpTextId()" class="mt-1 text-xs text-muted-foreground">
        {{ helpText }}
      </p>
    }
    
    <!-- Error message with proper ARIA live region -->
    @if (showErrorMessage()) {
      <p 
        [id]="errorMessageId()" 
        class="mt-1 text-xs text-destructive"
        role="alert"
        aria-live="polite"
      >
        {{ computedErrorMessage() }}
      </p>
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, InputProps, OnDestroy {
  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  // Inject NgControl for better form integration
  private ngControl = inject(NgControl, { optional: true });

  // Input properties
  @Input() variant: InputProps['variant'] = 'default';
  @Input() size: InputProps['size'] = 'md'; // Renamed from inputSize for consistency
  @Input() state: InputProps['state'] = 'default';
  @Input() placeholder?: string;
  @Input() disabled?: boolean;
  @Input() readonly?: boolean;
  @Input() required?: boolean;
  @Input() type?: string;
  @Input() id?: string;
  @Input() name?: string;
  @Input() value?: string;
  @Input() autoComplete?: string;
  @Input() autoFocus?: boolean;
  @Input() maxLength?: number;
  @Input() minLength?: number;
  @Input() pattern?: string;
  @Input() step?: string | number;
  @Input() min?: string | number;
  @Input() max?: string | number;
  @Input() className?: string;
  
  // Enhanced accessibility props
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
  @Input() ariaDescribedBy?: string;
  @Input() errorMessage?: string;
  @Input() helpText?: string;
  
  // Mobile optimization
  @Input() inputMode?: InputProps['inputMode'];
  
  // Performance optimization
  @Input() debounceTime?: number = 0;

  // Enhanced events with proper types
  @Output() inputChange = new EventEmitter<string>();
  @Output() inputBlur = new EventEmitter<FocusEvent>();
  @Output() inputFocus = new EventEmitter<FocusEvent>();
  @Output() keyDown = new EventEmitter<KeyboardEvent>();
  @Output() keyUp = new EventEmitter<KeyboardEvent>();
  @Output() paste = new EventEmitter<ClipboardEvent>();
  @Output() validationChange = new EventEmitter<boolean>();

  // Internal state signals
  currentValue = signal<string>('');
  isValidating = signal<boolean>(false);
  isTouched = signal<boolean>(false);
  isFocused = signal<boolean>(false);
  
  // Private properties
  private debounceTimer?: number;
  private uniqueId = `input-${Math.random().toString(36).substring(2, 9)}`;

  constructor() {
    // Handle external value changes with improved synchronization
    effect(() => {
      const newValue = this.value ?? '';
      if (newValue !== this.currentValue()) {
        this.currentValue.set(newValue);
      }
    });

    // Auto-detect validation state from form control
    effect(() => {
      if (this.ngControl?.control) {
        const control = this.ngControl.control;
        const hasErrors = control.invalid && (control.dirty || control.touched);
        const isValid = control.valid && (control.dirty || control.touched);
        
        if (hasErrors && this.state === 'default') {
          this.state = 'error';
        } else if (isValid && this.state === 'default') {
          this.state = 'success';
        }
        
        this.validationChange.emit(!hasErrors);
      }
    });
  }
  
  // ControlValueAccessor implementation
  private onChange = (value: string) => {};
  private onTouched = () => {};

  // Computed properties for better performance
  computedClasses = computed(() => {
    return cn(
      inputVariants({
        variant: this.variant,
        size: this.size, // Use 'size' instead of 'inputSize'
        state: this.state,
      }),
      this.className
    );
  });

  computedId = computed(() => this.id || this.uniqueId);
  
  computedAriaInvalid = computed(() => {
    if (this.ngControl?.control) {
      return this.ngControl.control.invalid && this.ngControl.control.touched ? 'true' : null;
    }
    return this.state === 'error' ? 'true' : null;
  });

  computedAriaDescribedBy = computed(() => {
    const describedBy: string[] = [];
    if (this.ariaDescribedBy) describedBy.push(this.ariaDescribedBy);
    if (this.helpText) describedBy.push(this.helpTextId());
    if (this.showErrorMessage()) describedBy.push(this.errorMessageId());
    return describedBy.length > 0 ? describedBy.join(' ') : null;
  });

  helpTextId = computed(() => `${this.computedId()}-help`);
  errorMessageId = computed(() => `${this.computedId()}-error`);

  showErrorMessage = computed(() => {
    if (this.errorMessage) return true;
    if (this.ngControl?.control) {
      return this.ngControl.control.invalid && this.ngControl.control.touched;
    }
    return false;
  });

  computedErrorMessage = computed(() => {
    if (this.errorMessage) return this.errorMessage;
    if (this.ngControl?.control?.errors) {
      const errors = this.ngControl.control.errors;
      if (errors['required']) return 'This field is required';
      if (errors['email']) return 'Please enter a valid email address';
      if (errors['minlength']) return `Minimum length is ${errors['minlength'].requiredLength} characters`;
      if (errors['maxlength']) return `Maximum length is ${errors['maxlength'].requiredLength} characters`;
      if (errors['pattern']) return 'Please enter a valid format';
      if (errors['min']) return `Minimum value is ${errors['min'].min}`;
      if (errors['max']) return `Maximum value is ${errors['max'].max}`;
    }
    return '';
  });

  // Lifecycle
  ngOnDestroy(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }

  // Enhanced input handlers with debouncing and better event handling
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.currentValue.set(value);
    
    // Clear existing timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    
    // Debounce the onChange and inputChange events
    if (this.debounceTime && this.debounceTime > 0) {
      this.debounceTimer = window.setTimeout(() => {
        this.onChange(value);
        this.inputChange.emit(value);
      }, this.debounceTime);
    } else {
      this.onChange(value);
      this.inputChange.emit(value);
    }
  }

  onBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.isTouched.set(true);
    this.onTouched();
    this.inputBlur.emit(event);
  }

  onFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    this.inputFocus.emit(event);
  }

  onKeyDown(event: KeyboardEvent): void {
    this.keyDown.emit(event);
    
    // Enhanced keyboard navigation
    if (event.key === 'Escape') {
      this.inputElement?.nativeElement?.blur();
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    this.keyUp.emit(event);
  }

  onPaste(event: ClipboardEvent): void {
    this.paste.emit(event);
    
    // Handle paste event with sanitization
    const pastedData = event.clipboardData?.getData('text') || '';
    if (this.maxLength && pastedData.length > this.maxLength) {
      event.preventDefault();
      const truncatedData = pastedData.substring(0, this.maxLength);
      this.currentValue.set(truncatedData);
      this.onChange(truncatedData);
      this.inputChange.emit(truncatedData);
    }
  }

  // Enhanced ControlValueAccessor methods
  writeValue(value: string | null): void {
    const normalizedValue = value ?? '';
    if (normalizedValue !== this.currentValue()) {
      this.currentValue.set(normalizedValue);
    }
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

  // Enhanced public methods
  focus(): void {
    this.inputElement?.nativeElement?.focus();
  }

  blur(): void {
    this.inputElement?.nativeElement?.blur();
  }

  select(): void {
    this.inputElement?.nativeElement?.select();
  }

  clear(): void {
    this.currentValue.set('');
    this.onChange('');
    this.inputChange.emit('');
    // Announce to screen readers
    this.announceToScreenReader('Input cleared');
  }

  // Validation methods
  validate(): boolean {
    if (this.ngControl?.control) {
      this.ngControl.control.markAsTouched();
      this.ngControl.control.updateValueAndValidity();
      return this.ngControl.control.valid;
    }
    return true;
  }

  // Accessibility helper
  private announceToScreenReader(message: string): void {
    // Create temporary live region for announcements
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

// Export variants for external use
export { inputVariants };
