import { Component, Input, Output, EventEmitter, signal, ViewChild, ElementRef, forwardRef, computed, effect, ChangeDetectionStrategy, OnDestroy, inject, Injector } from '@angular/core';
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
        error: [
          'border-destructive focus-visible:ring-destructive focus:ring-destructive',
          'bg-destructive/5 dark:bg-destructive/10',
          'transition-all duration-200',
          'shadow-sm shadow-destructive/20'
        ],
        success: [
          'border-success focus-visible:ring-success focus:ring-success',
          'bg-success/5 dark:bg-success/10', 
          'transition-all duration-200',
          'shadow-sm shadow-success/20'
        ],
        warning: [
          'border-warning focus-visible:ring-warning focus:ring-warning',
          'bg-warning/5 dark:bg-warning/10',
          'transition-all duration-200', 
          'shadow-sm shadow-warning/20'
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  }
);

// Input masking types
export type MaskType = 
  | 'phone' 
  | 'creditCard' 
  | 'ssn' 
  | 'date' 
  | 'time' 
  | 'currency' 
  | 'postalCode' 
  | 'custom';

export interface MaskConfig {
  type: MaskType;
  pattern?: string;
  placeholder?: string;
  stripMask?: boolean;
}

// Sanitization options
export interface SanitizationConfig {
  allowHTML?: boolean;
  allowScripts?: boolean;
  customSanitizer?: (value: string) => string;
  maxLength?: number;
  allowedCharacters?: RegExp;
  blockedCharacters?: RegExp;
}

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
  // Enhanced security and validation
  sanitization?: SanitizationConfig;
  mask?: MaskConfig;
  // Custom validation
  customValidator?: (value: string) => string | null;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
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
        [placeholder]="computedPlaceholder()"
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
      
      <!-- Validation state icons -->
      @if (!isValidating() && (state === 'error' || state === 'success' || state === 'warning')) {
        <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
          @if (state === 'error') {
            <svg class="w-4 h-4 text-destructive" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          }
          @if (state === 'success') {
            <svg class="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          }
          @if (state === 'warning') {
            <svg class="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          }
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

  // NgControl will be injected later to avoid circular dependency
  private ngControl?: NgControl;

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
  
  // Enhanced security and validation
  @Input() sanitization?: SanitizationConfig;
  @Input() mask?: MaskConfig;
  @Input() customValidator?: (value: string) => string | null;
  @Input() validateOnChange?: boolean = false;
  @Input() validateOnBlur?: boolean = true;

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
    // Inject NgControl synchronously to avoid timing issues
    const injector = inject(Injector);
    try {
      this.ngControl = injector.get(NgControl, null) || undefined;
      // Set the value accessor reference immediately if available
      if (this.ngControl) {
        this.ngControl.valueAccessor = this;
      }
    } catch (error) {
      // NgControl not available, component will work standalone
      this.ngControl = undefined;
    }

    // Handle external value changes with improved synchronization
    effect(() => {
      const newValue = this.value ?? '';
      if (newValue !== this.currentValue()) {
        this.currentValue.set(newValue);
      }
    });

    // Auto-detect validation state from form control with real-time updates
    effect(() => {
      if (this.ngControl?.control) {
        const control = this.ngControl.control;
        const hasErrors = control.invalid && (control.dirty || control.touched);
        const isValid = control.valid && (control.dirty || control.touched);
        
        // Real-time validation state updates
        if (hasErrors) {
          this.state = 'error';
        } else if (isValid) {
          this.state = 'success';
        } else if (control.pristine && control.untouched) {
          this.state = 'default';
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

  computedPlaceholder = computed(() => {
    if (this.mask?.placeholder) return this.mask.placeholder;
    if (this.placeholder) return this.placeholder;
    
    // Auto-generate placeholder based on mask type
    switch (this.mask?.type) {
      case 'phone': return '(123) 456-7890';
      case 'creditCard': return '1234 5678 9012 3456';
      case 'ssn': return '123-45-6789';
      case 'date': return 'MM/DD/YYYY';
      case 'time': return 'HH:MM';
      case 'currency': return '$0.00';
      case 'postalCode': return '12345-6789';
      default: return this.placeholder;
    }
  });

  // Lifecycle
  ngOnDestroy(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }

  // Input masking utilities
  private applyMask(value: string): string {
    if (!this.mask) return value;

    switch (this.mask.type) {
      case 'phone':
        return this.maskPhone(value);
      case 'creditCard':
        return this.maskCreditCard(value);
      case 'ssn':
        return this.maskSSN(value);
      case 'date':
        return this.maskDate(value);
      case 'time':
        return this.maskTime(value);
      case 'currency':
        return this.maskCurrency(value);
      case 'postalCode':
        return this.maskPostalCode(value);
      case 'custom':
        return this.maskCustom(value);
      default:
        return value;
    }
  }

  private maskPhone(value: string): string {
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length === 0) return '';
    if (cleaned.length <= 3) return `(${cleaned}`;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }

  private maskCreditCard(value: string): string {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 0) return '';
    
    // Add spaces every 4 digits, max 16 digits
    const groups = [];
    for (let i = 0; i < cleaned.length && i < 16; i += 4) {
      groups.push(cleaned.slice(i, i + 4));
    }
    return groups.join(' ');
  }

  private maskSSN(value: string): string {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,2})(\d{0,4})$/);
    if (!match) return value;
    
    const [, area, group, serial] = match;
    if (serial) return `${area}-${group}-${serial}`;
    if (group) return `${area}-${group}`;
    return area;
  }

  private maskDate(value: string): string {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);
    if (!match) return value;
    
    const [, month, day, year] = match;
    if (year) return `${month}/${day}/${year}`;
    if (day) return `${month}/${day}`;
    return month;
  }

  private maskTime(value: string): string {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,2})$/);
    if (!match) return value;
    
    const [, hours, minutes] = match;
    if (minutes) return `${hours}:${minutes}`;
    return hours;
  }

  private maskCurrency(value: string): string {
    // Remove everything except digits and decimal point
    let cleaned = value.replace(/[^\d.]/g, '');
    
    // Handle multiple decimal points - keep only the first one
    const decimalIndex = cleaned.indexOf('.');
    if (decimalIndex !== -1) {
      cleaned = cleaned.substring(0, decimalIndex + 1) + cleaned.substring(decimalIndex + 1).replace(/\./g, '');
    }
    
    // Split into integer and decimal parts
    const parts = cleaned.split('.');
    
    // Add commas to integer part
    if (parts[0]) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    // Limit decimal places to 2
    if (parts[1] && parts[1].length > 2) {
      parts[1] = parts[1].substring(0, 2);
    }
    
    // Construct the final value
    let result = '$' + (parts[0] || '0');
    if (cleaned.includes('.')) {
      result += '.' + (parts[1] || '');
    }
    
    return result;
  }

  private maskPostalCode(value: string): string {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 5) return cleaned;
    return `${cleaned.substring(0, 5)}-${cleaned.substring(5, 9)}`;
  }

  private maskCustom(value: string): string {
    if (!this.mask?.pattern) return value;
    
    let masked = '';
    let valueIndex = 0;
    
    for (let i = 0; i < this.mask.pattern.length && valueIndex < value.length; i++) {
      const patternChar = this.mask.pattern[i];
      const valueChar = value[valueIndex];
      
      if (patternChar === '0' && /\d/.test(valueChar)) {
        masked += valueChar;
        valueIndex++;
      } else if (patternChar === 'A' && /[A-Za-z]/.test(valueChar)) {
        masked += valueChar;
        valueIndex++;
      } else if (patternChar === '*') {
        masked += valueChar;
        valueIndex++;
      } else if (patternChar === valueChar) {
        masked += patternChar;
        valueIndex++;
      } else if (/[^0A*]/.test(patternChar)) {
        masked += patternChar;
      } else {
        break;
      }
    }
    
    return masked;
  }

  private removeMask(value: string): string {
    if (!this.mask || !this.mask.stripMask) return value;
    
    switch (this.mask.type) {
      case 'phone':
      case 'ssn':
      case 'creditCard':
      case 'postalCode':
        return value.replace(/\D/g, '');
      case 'currency':
        return value.replace(/[^\d.]/g, '');
      case 'date':
      case 'time':
        return value.replace(/\D/g, '');
      default:
        return value;
    }
  }

  // Input sanitization utilities
  private sanitizeInput(value: string): string {
    if (!this.sanitization) return value;

    let sanitized = value;

    // Apply custom sanitizer first
    if (this.sanitization.customSanitizer) {
      sanitized = this.sanitization.customSanitizer(sanitized);
    }

    // Remove HTML if not allowed
    if (!this.sanitization.allowHTML) {
      sanitized = sanitized.replace(/<[^>]*>/g, '');
    }

    // Remove scripts if not allowed
    if (!this.sanitization.allowScripts) {
      sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      sanitized = sanitized.replace(/javascript:/gi, '');
      sanitized = sanitized.replace(/on\w+\s*=/gi, '');
    }

    // Apply character restrictions
    if (this.sanitization.allowedCharacters) {
      sanitized = sanitized.replace(
        new RegExp(`[^${this.sanitization.allowedCharacters.source}]`, 'g'),
        ''
      );
    }

    if (this.sanitization.blockedCharacters) {
      sanitized = sanitized.replace(this.sanitization.blockedCharacters, '');
    }

    // Apply max length from sanitization config
    if (this.sanitization.maxLength && sanitized.length > this.sanitization.maxLength) {
      sanitized = sanitized.substring(0, this.sanitization.maxLength);
    }

    return sanitized;
  }

  // Custom validation
  private performCustomValidation(value: string): string | null {
    if (this.customValidator) {
      return this.customValidator(value);
    }
    return null;
  }

  // Enhanced input handlers with debouncing and better event handling
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    let value = target.value;
    
    // Apply sanitization
    value = this.sanitizeInput(value);
    
    // Apply masking
    const maskedValue = this.applyMask(value);
    const rawValue = this.removeMask(maskedValue);
    
    // Update signal immediately for reactive updates
    this.currentValue.set(maskedValue);
    
    // Only update DOM element if masking actually changed the value
    // This prevents interference with normal typing
    if (this.mask && maskedValue !== target.value) {
      const cursorPosition = target.selectionStart || 0;
      
      // Calculate where the cursor should be after masking
      let newCursorPosition = cursorPosition;
      
      // If the masked value is longer, the cursor should move forward
      if (maskedValue.length > target.value.length) {
        newCursorPosition = cursorPosition + (maskedValue.length - target.value.length);
      }
      
      // Update the DOM value
      target.value = maskedValue;
      
      // Restore cursor position asynchronously to prevent conflicts
      setTimeout(() => {
        if (target === document.activeElement) {
          target.setSelectionRange(newCursorPosition, newCursorPosition);
        }
      }, 0);
    }
    
    // Perform custom validation if enabled
    if (this.validateOnChange) {
      const validationError = this.performCustomValidation(rawValue);
      if (validationError) {
        this.errorMessage = validationError;
        this.state = 'error';
      } else {
        // Only set to success if there are no form control errors
        if (!this.ngControl?.control?.errors) {
          this.state = 'success';
        }
      }
    }
    
    // Debounce the onChange and inputChange events
    // Use raw value for form controls, masked value for display
    const emitValue = this.mask?.stripMask ? rawValue : maskedValue;
    
    // Clear existing timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    
    if (this.debounceTime && this.debounceTime > 0) {
      this.debounceTimer = window.setTimeout(() => {
        this.onChange(emitValue);
        this.inputChange.emit(emitValue);
        // Mark as dirty and trigger validation
        if (this.ngControl?.control) {
          this.ngControl.control.markAsDirty();
          this.ngControl.control.updateValueAndValidity();
        }
      }, this.debounceTime);
    } else {
      this.onChange(emitValue);
      this.inputChange.emit(emitValue);
      // Mark as dirty and trigger validation
      if (this.ngControl?.control) {
        this.ngControl.control.markAsDirty();
        this.ngControl.control.updateValueAndValidity();
      }
    }
  }

  onBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.isTouched.set(true);
    this.onTouched();
    
    // Mark as touched for form validation
    if (this.ngControl?.control) {
      this.ngControl.control.markAsTouched();
      this.ngControl.control.updateValueAndValidity();
    }
    
    // Perform validation on blur if enabled
    if (this.validateOnBlur) {
      const target = event.target as HTMLInputElement;
      const rawValue = this.mask?.stripMask ? this.removeMask(target.value) : target.value;
      const validationError = this.performCustomValidation(rawValue);
      if (validationError) {
        this.errorMessage = validationError;
        this.state = 'error';
      } else {
        // Only set to success if there are no form control errors
        if (!this.ngControl?.control?.errors) {
          this.state = 'success';
        }
      }
    }
    
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
    
    // Handle paste event with sanitization and masking
    const pastedData = event.clipboardData?.getData('text') || '';
    let processedData = this.sanitizeInput(pastedData);
    
    if (this.maxLength && processedData.length > this.maxLength) {
      event.preventDefault();
      processedData = processedData.substring(0, this.maxLength);
    }
    
    // Apply masking to pasted data
    const maskedData = this.applyMask(processedData);
    const rawData = this.removeMask(maskedData);
    
    if (maskedData !== pastedData) {
      event.preventDefault();
      this.currentValue.set(maskedData);
      const emitValue = this.mask?.stripMask ? rawData : maskedData;
      this.onChange(emitValue);
      this.inputChange.emit(emitValue);
      
      // Update input element
      const target = event.target as HTMLInputElement;
      target.value = maskedData;
    }
  }

  // Enhanced ControlValueAccessor methods
  writeValue(value: string | null): void {
    const normalizedValue = value ?? '';
    this.currentValue.set(normalizedValue);
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
    const emptyValue = '';
    
    // Update component state
    this.currentValue.set(emptyValue);
    this.state = 'default';
    this.errorMessage = undefined;
    this.isTouched.set(false);
    
    // Update form control if available
    if (this.ngControl?.control) {
      this.ngControl.control.setValue(emptyValue);
      this.ngControl.control.markAsPristine();
      this.ngControl.control.markAsUntouched();
      this.ngControl.control.updateValueAndValidity();
    }
    
    // Update input element directly
    if (this.inputElement?.nativeElement) {
      this.inputElement.nativeElement.value = emptyValue;
    }
    
    // Emit changes
    this.onChange(emptyValue);
    this.inputChange.emit(emptyValue);
    
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
