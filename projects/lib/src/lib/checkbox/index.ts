import { Component, Input, Output, EventEmitter, computed, signal, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/**
 * Checkbox component variants using Class Variance Authority (CVA)
 * Provides consistent styling patterns with Tailwind CSS
 */
const checkboxVariants = cva(
  // Base styles - consistent across all variants
  [
    'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-colors duration-200 ease-in-out',
    'checked:bg-primary checked:text-primary-foreground',
    'indeterminate:bg-primary indeterminate:text-primary-foreground',
    'cursor-pointer',
    'accent-primary',
  ],
  {
    variants: {
      variant: {
        default: '',
        destructive: [
          'border-destructive',
          'checked:bg-destructive checked:text-destructive-foreground',
          'indeterminate:bg-destructive indeterminate:text-destructive-foreground',
          'accent-destructive',
        ],
        success: [
          'border-success',
          'checked:bg-success checked:text-success-foreground',
          'indeterminate:bg-success indeterminate:text-success-foreground',
          'accent-success',
        ],
        warning: [
          'border-warning',
          'checked:bg-warning checked:text-warning-foreground',
          'indeterminate:bg-warning indeterminate:text-warning-foreground',
          'accent-warning',
        ],
      },
      size: {
        default: 'h-4 w-4',
        sm: 'h-3 w-3',
        lg: 'h-5 w-5',
        xl: 'h-6 w-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type CheckboxVariant = VariantProps<typeof checkboxVariants>;

/**
 * Checkbox states
 */
export type CheckboxState = 'checked' | 'unchecked' | 'indeterminate';

/**
 * Accessibility interface for checkbox component
 */
export interface CheckboxAccessibility {
  /** ARIA label for screen readers */
  ariaLabel?: string;
  /** ARIA description for additional context */
  ariaDescription?: string;
  /** Element ID that labels this checkbox */
  ariaLabelledBy?: string;
  /** Element ID that describes this checkbox */
  ariaDescribedBy?: string;
  /** Indicates if the checkbox is required */
  ariaRequired?: boolean;
  /** Indicates if the checkbox is invalid */
  ariaInvalid?: boolean;
}

/**
 * Checkbox Component
 *
 * A control that allows the user to toggle between checked and not checked.
 * Supports three states: checked, unchecked, and indeterminate.
 *
 * @example
 * ```html
 * <Checkbox
 *   [(ngModel)]="isChecked"
 *   [disabled]="false"
 *   [indeterminate]="false"
 *   variant="default"
 *   size="default">
 * </Checkbox>
 * ```
 */
@Component({
  selector: 'Checkbox',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Checkbox),
      multi: true,
    },
  ],
  template: `
    <div class="relative inline-flex items-center">
      <input
        type="checkbox"
        [id]="checkboxId()"
        [class]="checkboxClasses()"
        [checked]="isChecked()"
        [indeterminate]="isIndeterminate()"
        [disabled]="isDisabled()"
        [attr.aria-label]="accessibilityConfig().ariaLabel"
        [attr.aria-description]="accessibilityConfig().ariaDescription"
        [attr.aria-labelledby]="accessibilityConfig().ariaLabelledBy"
        [attr.aria-describedby]="accessibilityConfig().ariaDescribedBy"
        [attr.aria-required]="accessibilityConfig().ariaRequired"
        [attr.aria-invalid]="accessibilityConfig().ariaInvalid"
        (change)="onInputChange($event)"
        (focus)="onFocus()"
        (blur)="onBlur()"
      />
      
      <!-- Custom checkbox overlay for better styling -->
      <div 
        class="absolute inset-0 pointer-events-none flex items-center justify-center"
        [class.opacity-0]="!isChecked() && !isIndeterminate()"
        [class.opacity-100]="isChecked() || isIndeterminate()">
        
        <!-- Check Icon -->
        @if (isChecked() && !isIndeterminate()) {
          <svg
            class="h-3 w-3 fill-current text-primary-foreground"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true">
            <path
              d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
          </svg>
        }

        <!-- Indeterminate Icon -->
        @if (isIndeterminate()) {
          <svg
            class="h-3 w-3 fill-current text-primary-foreground"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true">
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
          </svg>
        }
      </div>
    </div>
  `,
})
export class Checkbox implements ControlValueAccessor {
  /**
   * Whether the checkbox is checked
   */
  @Input()
  set checked(value: boolean | string) {
    this._checked.set(!!value);
  }
  get checked() {
    return this._checked();
  }

  /**
   * Visual variant of the checkbox
   */
  @Input()
  set variant(value: CheckboxVariant['variant']) {
    this._variant.set(value);
  }
  get variant() {
    return this._variant();
  }
  private _variant = signal<CheckboxVariant['variant']>('default');

  /**
   * Size variant of the checkbox
   */
  @Input()
  set size(value: CheckboxVariant['size']) {
    this._size.set(value);
  }
  get size() {
    return this._size();
  }
  private _size = signal<CheckboxVariant['size']>('default');

  /**
   * Whether the checkbox is disabled
   */
  @Input()
  set disabled(value: boolean | string) {
    this._disabled.set(!!value);
  }
  get disabled() {
    return this._disabled();
  }
  private _disabled = signal(false);

  /**
   * Whether the checkbox is in indeterminate state
   */
  @Input()
  set indeterminate(value: boolean | string) {
    this._indeterminate.set(!!value);
  }
  get indeterminate() {
    return this._indeterminate();
  }
  private _indeterminate = signal(false);

  /**
   * Unique ID for the checkbox input
   */
  @Input()
  set id(value: string) {
    this._id.set(value);
  }
  get id() {
    return this._id();
  }
  private _id = signal(`checkbox-${Math.random().toString(36).substr(2, 9)}`);

  /**
   * Accessibility configuration
   */
  @Input()
  set accessibility(value: CheckboxAccessibility) {
    this._accessibility.set(value);
  }
  get accessibility() {
    return this._accessibility();
  }
  private _accessibility = signal<CheckboxAccessibility>({});

  /**
   * CSS classes to apply to the checkbox
   */
  @Input()
  set class(value: string) {
    this._class.set(value);
  }
  get class() {
    return this._class();
  }
  private _class = signal('');

  /**
   * Event emitted when the checkbox state changes
   */
  @Output() checkedChange = new EventEmitter<boolean>();

  /**
   * Event emitted when the checkbox state changes (including indeterminate)
   */
  @Output() stateChange = new EventEmitter<CheckboxState>();

  /**
   * Event emitted when the checkbox is focused
   */
  @Output() focused = new EventEmitter<void>();

  /**
   * Event emitted when the checkbox loses focus
   */
  @Output() blurred = new EventEmitter<void>();

  /**
   * Internal checked state
   */
  private _checked = signal(false);

  /**
   * Internal focus state
   */
  private _focused = signal(false);

  /**
   * ControlValueAccessor callbacks as signals
   */
  private _onChange = signal<(value: boolean) => void>(() => {});
  private _onTouched = signal<() => void>(() => {});

  /**
   * Computed checkbox state
   */
  state = computed<CheckboxState>(() => {
    if (this._indeterminate()) return 'indeterminate';
    return this._checked() ? 'checked' : 'unchecked';
  });

  /**
   * Computed checkbox ID for template
   */
  checkboxId = computed(() => this._id());

  /**
   * Computed checked state for template
   */
  isChecked = computed(() => this._checked());

  /**
   * Computed indeterminate state for template
   */
  isIndeterminate = computed(() => this._indeterminate());

  /**
   * Computed CSS classes
   */
  checkboxClasses = computed(() => {
    return cn(
      checkboxVariants({
        variant: this._variant(),
        size: this._size(),
      }),
      this._class()
    );
  });

  /**
   * Computed disabled state for template
   */
  isDisabled = computed(() => this._disabled());

  /**
   * Computed accessibility for template
   */
  accessibilityConfig = computed(() => this._accessibility());

  /**
   * Get the current checked state
   */
  getChecked(): boolean {
    return this._checked();
  }

  /**
   * Set the checked state
   */
  setChecked(checked: boolean): void {
    if (this._disabled()) return;

    this._checked.set(checked);
    this._indeterminate.set(false);

    this.checkedChange.emit(checked);
    this.stateChange.emit(this.state());
    this._onChange()(checked);
  }

  /**
   * Handle input change events
   */
  onInputChange(event: Event): void {
    if (this._disabled()) return;

    const target = event.target as HTMLInputElement;
    this.setChecked(target.checked);
  }

  /**
   * Toggle the checkbox state
   */
  toggle(): void {
    if (this._disabled()) return;

    if (this._indeterminate()) {
      this.setChecked(true);
    } else {
      this.setChecked(!this._checked());
    }
  }

  /**
   * Set the indeterminate state
   */
  setIndeterminate(indeterminate: boolean): void {
    if (this._disabled()) return;

    this._indeterminate.set(indeterminate);
    this.stateChange.emit(this.state());
  }

  /**
   * Handle focus events
   */
  onFocus(): void {
    if (this._disabled()) return;

    this._focused.set(true);
    this.focused.emit();
  }

  /**
   * Handle blur events
   */
  onBlur(): void {
    this._focused.set(false);
    this._onTouched()();
    this.blurred.emit();
  }

  /**
   * ControlValueAccessor implementation
   */
  writeValue(value: boolean): void {
    this._checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this._onChange.set(fn);
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched.set(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }
}

/**
 * Export the checkbox component for easier importing
 */
