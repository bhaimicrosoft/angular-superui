import {
  Component,
  ViewChild,
  ElementRef,
  forwardRef,
  computed,
  effect,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  inject,
  Injector,
  signal,
  input,
  output,
  model
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { cn } from '../../utils/cn';

/**
 * Textarea component variants using Class Variance Authority (CVA)
 * Provides consistent styling patterns with Tailwind CSS
 *
 * Variants:
 * - default: Standard textarea with border
 * - filled: Textarea with background fill
 * - flushed: Borderless textarea with bottom border only
 * - unstyled: No styling for complete customization
 */
const textareaVariants = cva(
  [
    'flex min-h-[80px] w-full rounded-md px-3 py-2 text-sm transition-colors',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'resize-none',
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
          'border-0 border-b border-input bg-transparent px-0 rounded-none',
          'focus-visible:border-ring',
        ],
        unstyled: [
          'border-0 bg-transparent p-0',
          'focus-visible:ring-0 focus-visible:ring-offset-0',
        ],
      },
      size: {
        sm: 'min-h-[60px] px-2 py-1 text-xs',
        md: 'min-h-[80px] px-3 py-2 text-sm',
        lg: 'min-h-[100px] px-4 py-3 text-base',
        xl: 'min-h-[120px] px-4 py-4 text-lg',
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
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
      resize: 'vertical',
    },
  }
);

export type TextareaVariantProps = VariantProps<typeof textareaVariants>;

export interface TextareaProps extends TextareaVariantProps {
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  rows?: number;
  cols?: number;
  minLength?: number;
  maxLength?: number;
  wrap?: 'hard' | 'soft' | 'off';
  className?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  errorMessage?: string;
  helpText?: string;
  autoResize?: boolean;
  maxRows?: number;
  minRows?: number;
}

@Component({
  selector: 'TextareaComponent',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('validation', [
      state('default', style({ borderColor: 'var(--input)' })),
      state('success', style({ borderColor: 'var(--success)' })),
      state('error', style({ borderColor: 'var(--destructive)' })),
      state('warning', style({ borderColor: 'var(--warning)' })),
      transition('* => *', [
        animate('200ms ease-in-out'),
      ]),
    ]),
  ],
  template: `
    <div class="w-full">
      <!-- Label -->
      @if (label()) {
        <label
          [for]="computedId()"
          class="block text-sm font-medium mb-2"
          [class]="labelClasses()"
        >
          {{ label() }}
          @if (required()) {
            <span class="text-destructive ml-1">*</span>
          }
        </label>
      }

      <div class="relative">
        <!-- Textarea Element -->
        <textarea
          #textareaElement
          [id]="computedId()"
          [name]="name()"
          [placeholder]="computedPlaceholder()"
          [disabled]="disabled()"
          [readonly]="readonly()"
          [required]="required()"
          [rows]="computedRows()"
          [cols]="cols()"
          [attr.minlength]="minLength()"
          [attr.maxlength]="maxLength()"
          [wrap]="wrap()"
          [value]="currentValue()"
          [attr.aria-invalid]="computedAriaInvalid()"
          [attr.aria-required]="required() || null"
          [attr.aria-label]="ariaLabel()"
          [attr.aria-labelledby]="ariaLabelledBy()"
          [attr.aria-describedby]="computedAriaDescribedBy()"
          [class]="computedClasses()"
          [@validation]="state()"
          (input)="onInput($event)"
          (blur)="onBlur($event)"
          (focus)="onFocus($event)"
          (keydown)="onKeyDown($event)"
          (keyup)="onKeyUp($event)"
        ></textarea>

        <!-- Character Count -->
        @if (showCharacterCount()) {
          <div
            class="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-1 rounded"
            [@fadeIn]
          >
            {{ currentValue().length }}@if (maxLength()) {/{{ maxLength() }}}
          </div>
        }

        <!-- Loading indicator -->
        @if (isValidating()) {
          <div class="absolute top-2 right-2">
            <svg class="animate-spin h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        }
      </div>

      <!-- Help text -->
      @if (helpText()) {
        <p [id]="helpTextId()" class="mt-1 text-xs text-muted-foreground">
          {{ helpText() }}
        </p>
      }

      <!-- Error message with proper ARIA live region -->
      @if (showErrorMessage()) {
        <p
          [id]="errorMessageId()"
          class="mt-1 text-xs text-destructive"
          role="alert"
          aria-live="polite"
          [@fadeIn]
        >
          {{ computedErrorMessage() }}
        </p>
      }

      <!-- Auto-resize information for screen readers -->
      @if (autoResize()) {
        <div class="sr-only" aria-live="polite">
          Textarea will automatically resize as you type
        </div>
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @ViewChild('textareaElement') textareaElement!: ElementRef<HTMLTextAreaElement>;

  // NgControl will be injected later to avoid circular dependency
  private ngControl?: NgControl;

  // Input signals
  readonly variant = input<TextareaVariantProps['variant']>('default');
  readonly size = input<TextareaVariantProps['size']>('md');
  readonly state = input<TextareaVariantProps['state']>('default');
  readonly resize = input<TextareaVariantProps['resize']>('vertical');
  readonly placeholder = input<string>('');
  readonly disabledInput = input<boolean>(false, { alias: 'disabled' });
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly rows = input<number>(4);
  readonly cols = input<number | undefined>(undefined);
  readonly minLength = input<number | undefined>(undefined);
  readonly maxLength = input<number | undefined>(undefined);
  readonly wrap = input<'hard' | 'soft' | 'off'>('soft');
  readonly className = input<string>('');
  readonly id = input<string>('');
  readonly name = input<string>('');
  readonly label = input<string>('');
  readonly ariaLabel = input<string>('');
  readonly ariaLabelledBy = input<string>('');
  readonly ariaDescribedBy = input<string>('');
  readonly errorMessage = input<string>('');
  readonly helpText = input<string>('');
  readonly autoResize = input<boolean>(false);
  readonly maxRows = input<number>(10);
  readonly minRows = input<number>(2);
  readonly showCharacterCount = input<boolean>(false);
  readonly validateOnChange = input<boolean>(false);
  readonly validateOnBlur = input<boolean>(true);
  readonly customValidator = input<((value: string) => string | null) | undefined>(undefined);

  // Two-way binding for value
  readonly value = model<string>('');

  // Output events
  readonly valueChange = output<string>();
  readonly textareaBlur = output<FocusEvent>();
  readonly textareaFocus = output<FocusEvent>();
  readonly keyDown = output<KeyboardEvent>();
  readonly keyUp = output<KeyboardEvent>();
  readonly validationChange = output<boolean>();

  // Internal state signals
  readonly currentValue = signal<string>('');
  readonly isValidating = signal<boolean>(false);
  readonly isTouched = signal<boolean>(false);
  readonly isFocused = signal<boolean>(false);
  readonly validationError = signal<string>('');
  readonly disabledFromControl = signal<boolean>(false);

  // Private properties
  private uniqueId = `textarea-${Math.random().toString(36).substring(2, 9)}`;
  private resizeObserver?: ResizeObserver;

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
      const newValue = this.value() ?? '';
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

        // Real-time validation state updates
        if (hasErrors && this.state() === 'default') {
          // We can't directly set input signals, but we can use the validation error signal
          this.validationError.set('Validation failed');
        } else if (isValid && this.state() === 'default') {
          this.validationError.set('');
        }

        this.validationChange.emit(!hasErrors);
      }
    });

    // Auto-resize effect
    effect(() => {
      if (this.autoResize() && this.textareaElement?.nativeElement) {
        this.adjustHeight();
      }
    });
  }

  ngOnInit(): void {
    // Initialize auto-resize
    if (this.autoResize()) {
      this.setupAutoResize();
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  // Computed properties
  readonly computedId = computed(() => this.id() || this.uniqueId);

  /**
   * Computed disabled state that combines both input-based and FormControl-based disabled states.
   * This ensures the component is disabled if either the [disabled] input is true
   * or its associated FormControl is programmatically disabled via myFormControl.disable().
   */
  readonly disabled = computed(() => this.disabledInput() || this.disabledFromControl());

  readonly computedPlaceholder = computed(() => {
    if (this.disabled()) return '';
    return this.placeholder();
  });

  readonly computedRows = computed(() => {
    if (this.autoResize()) {
      return Math.max(this.minRows(), Math.min(this.maxRows(), this.rows()));
    }
    return this.rows();
  });

  readonly computedClasses = computed(() =>
    cn(
      textareaVariants({
        variant: this.variant(),
        size: this.size(),
        state: this.computedState(),
        resize: this.resize(),
      }),
      this.className()
    )
  );

  readonly computedState = computed(() => {
    if (this.validationError()) return 'error';
    if (this.ngControl?.control) {
      const control = this.ngControl.control;
      if (control.invalid && (control.dirty || control.touched)) return 'error';
      if (control.valid && (control.dirty || control.touched)) return 'success';
    }
    return this.state();
  });

  readonly labelClasses = computed(() => {
    const baseClasses = 'text-foreground';
    if (this.computedState() === 'error') {
      return `${baseClasses} text-destructive`;
    }
    if (this.disabled()) {
      return `${baseClasses} text-muted-foreground`;
    }
    return baseClasses;
  });

  readonly computedAriaInvalid = computed(() => {
    const state = this.computedState();
    return state === 'error' ? 'true' : 'false';
  });

  readonly helpTextId = computed(() => `${this.computedId()}-help`);
  readonly errorMessageId = computed(() => `${this.computedId()}-error`);

  readonly computedAriaDescribedBy = computed(() => {
    const parts: string[] = [];

    if (this.ariaDescribedBy()) {
      parts.push(this.ariaDescribedBy());
    }

    if (this.helpText()) {
      parts.push(this.helpTextId());
    }

    if (this.showErrorMessage()) {
      parts.push(this.errorMessageId());
    }

    return parts.length > 0 ? parts.join(' ') : undefined;
  });

  readonly showErrorMessage = computed(() => {
    return !!(this.computedErrorMessage() && (this.isTouched() || this.computedState() === 'error'));
  });

  readonly computedErrorMessage = computed(() => {
    if (this.validationError()) return this.validationError();
    if (this.errorMessage()) return this.errorMessage();
    if (this.ngControl?.control?.errors) {
      const errors = this.ngControl.control.errors;
      if (errors['required']) return 'This field is required';
      if (errors['minlength']) return `Minimum length is ${errors['minlength'].requiredLength}`;
      if (errors['maxlength']) return `Maximum length is ${errors['maxlength'].requiredLength}`;
      if (errors['pattern']) return 'Invalid format';
    }
    return '';
  });

  // Event handlers
  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    const newValue = target.value;

    this.currentValue.set(newValue);
    this.value.set(newValue);
    this.valueChange.emit(newValue);

    // Trigger form control update
    this.onChange(newValue);

    // Custom validation
    if (this.validateOnChange() && this.customValidator()) {
      this.performCustomValidation(newValue);
    }

    // Auto-resize
    if (this.autoResize()) {
      this.adjustHeight();
    }
  }

  onFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    this.textareaFocus.emit(event);
  }

  onBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.isTouched.set(true);
    this.onTouched();
    this.textareaBlur.emit(event);

    // Custom validation on blur
    if (this.validateOnBlur() && this.customValidator()) {
      this.performCustomValidation(this.currentValue());
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    this.keyDown.emit(event);

    // Handle Ctrl+A for select all
    if (event.ctrlKey && event.key === 'a') {
      // Allow default behavior
      return;
    }

    // Handle Tab for better accessibility
    if (event.key === 'Tab' && !event.shiftKey && !event.ctrlKey) {
      // Allow default behavior for tab navigation
      return;
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    this.keyUp.emit(event);
  }

  // Custom validation
  private performCustomValidation(value: string): void {
    const validator = this.customValidator();
    if (validator) {
      this.isValidating.set(true);

      const result = validator(value);

      // Simulate async validation
      setTimeout(() => {
        this.validationError.set(result || '');
        this.isValidating.set(false);
        this.validationChange.emit(!result);
      }, 100);
    }
  }

  // Auto-resize functionality
  private setupAutoResize(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.adjustHeight();
      });

      if (this.textareaElement?.nativeElement) {
        this.resizeObserver.observe(this.textareaElement.nativeElement);
      }
    }
  }

  private adjustHeight(): void {
    const textarea = this.textareaElement?.nativeElement;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';

    const minHeight = this.minRows() * 1.5; // Approximate line height in rem
    const maxHeight = this.maxRows() * 1.5;
    const scrollHeight = textarea.scrollHeight;

    // Convert px to appropriate units and constrain between min and max
    const newHeight = Math.max(minHeight * 16, Math.min(maxHeight * 16, scrollHeight));

    textarea.style.height = `${newHeight}px`;
  }

  // Public methods
  focus(): void {
    this.textareaElement?.nativeElement?.focus();
  }

  blur(): void {
    this.textareaElement?.nativeElement?.blur();
  }

  select(): void {
    this.textareaElement?.nativeElement?.select();
  }

  setSelectionRange(start: number, end: number): void {
    this.textareaElement?.nativeElement?.setSelectionRange(start, end);
  }

  // ControlValueAccessor implementation
  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    if (value !== this.currentValue()) {
      this.currentValue.set(value || '');
      this.value.set(value || '');
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromControl.set(isDisabled);
  }
}
