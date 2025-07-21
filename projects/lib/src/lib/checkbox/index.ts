import { Component, Input, Output, EventEmitter, computed, signal, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { Button } from '../button';

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
    'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
    'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
    'relative overflow-hidden',
    'cursor-pointer select-none',
  ],
  {
    variants: {
      variant: {
        default: '',
        destructive: [
          'border-destructive',
          'data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground',
          'data-[state=indeterminate]:bg-destructive data-[state=indeterminate]:text-destructive-foreground',
        ],
        success: [
          'border-success',
          'data-[state=checked]:bg-success data-[state=checked]:text-success-foreground',
          'data-[state=indeterminate]:bg-success data-[state=indeterminate]:text-success-foreground',
        ],
        warning: [
          'border-warning',
          'data-[state=checked]:bg-warning data-[state=checked]:text-warning-foreground',
          'data-[state=indeterminate]:bg-warning data-[state=indeterminate]:text-warning-foreground',
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
  imports: [Button],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Checkbox),
      multi: true,
    },
  ],
  template: `
    <Button
      type="button"
      variant="ghost"
      size="icon"
      [customClasses]="checkboxClasses()"
      [disabled]="isDisabled()"
      [accessibility]="{
        ariaLabel: accessibilityConfig().ariaLabel,
        ariaDescription: accessibilityConfig().ariaDescription,
        ariaLabelledBy: accessibilityConfig().ariaLabelledBy,
        ariaDescribedBy: accessibilityConfig().ariaDescribedBy
      }"
      [attr.role]="'checkbox'"
      [attr.aria-checked]="ariaChecked()"
      [attr.aria-required]="accessibilityConfig().ariaRequired"
      [attr.aria-invalid]="accessibilityConfig().ariaInvalid"
      [attr.data-state]="dataState()"
      [attr.data-disabled]="isDisabled() ? '' : null"
      [attr.tabindex]="isDisabled() ? -1 : 0"
      (click)="toggle()"
      (keydown)="onKeyDown($event)"
    >

      <!-- Check Icon -->
      @if (state() === 'checked') {
        <svg
          class="h-3 w-3 fill-current pointer-events-none"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true">
          <path
            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
        </svg>
      }

      <!-- Indeterminate Icon -->
      @if (state() === 'indeterminate') {
        <svg
          class="h-3 w-3 fill-current pointer-events-none"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true">
          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
        </svg>
      }
    </Button>
  `,
})
export class Checkbox implements ControlValueAccessor {
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
   * Computed data-state attribute
   */
  dataState = computed(() => {
    return this.state();
  });

  /**
   * Computed aria-checked attribute
   */
  ariaChecked = computed(() => {
    const state = this.state();
    if (state === 'indeterminate') return 'mixed';
    return state === 'checked' ? 'true' : 'false';
  });

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
  checked(): boolean {
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
   * Handle keyboard events
   */
  onKeyDown(event: KeyboardEvent): void {
    if (this._disabled()) return;

    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        this.toggle();
        break;
    }
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
