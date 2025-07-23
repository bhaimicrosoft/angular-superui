import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  effect,
  OnInit,
  OnDestroy,
  HostBinding,
  HostListener,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ChangeDetectionStrategy,
  inject,
  forwardRef,
  ContentChildren,
  input
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/**
 * Input OTP component variants using Class Variance Authority (CVA)
 * Provides consistent styling patterns with Tailwind CSS
 */
const inputOTPVariants = cva(
  [
    'flex items-center gap-1 sm:gap-2 has-[:disabled]:opacity-50'
  ],
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

const inputOTPSlotVariants = cva(
  [
    'relative flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center border text-xs sm:text-sm transition-all',
    'rounded-md mx-0.5 sm:mx-1',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500',
    // Fallback styles to ensure visibility
    'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800',
    'text-gray-900 dark:text-gray-100 font-medium'
  ],
  {
    variants: {
      isActive: {
        true: 'z-10 ring-2 ring-blue-500 border-blue-500 bg-blue-50 dark:bg-blue-950',
        false: 'hover:border-gray-400 dark:hover:border-gray-500',
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

const inputOTPSeparatorVariants = cva(
  [
    'flex items-center justify-center w-4 sm:w-5 md:w-6 h-4',
    'text-gray-400 dark:text-gray-500 text-sm sm:text-base md:text-lg font-bold'
  ]
);

/**
 * Input OTP Slot interface for better type safety
 */
interface InputOTPSlotProps {
  index: number;
  char?: string;
  isActive?: boolean;
  hasFakeCaret?: boolean;
}

/**
 * Input OTP Context for sharing state between components
 */
interface InputOTPContext {
  slots: InputOTPSlotProps[];
  activeSlot: number;
}

/**
 * InputOTPSlot Component
 * Individual slot for OTP input
 */
@Component({
  selector: 'InputOTPSlot',
  standalone: true,
  template: `
    <div
      [class]="slotClasses()"
      [attr.data-slot]="index"
      [attr.data-active]="isActive()"
    >
      @if (char()) {
        <span>{{ char() }}</span>
      }
      @if (isActive() && hasFakeCaret()) {
        <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div class="h-4 w-px animate-caret-blink bg-gray-900 dark:bg-gray-100 duration-1000"></div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOTPSlot {
  @Input({ required: true }) index!: number;

  // Signals for reactive state
  private _char = signal<string>('');
  private _isActive = signal<boolean>(false);
  private _hasFakeCaret = signal<boolean>(false);

  // Computed properties
  char = computed(() => this._char());
  isActive = computed(() => this._isActive());
  hasFakeCaret = computed(() => this._hasFakeCaret());

  slotClasses = computed(() =>
    inputOTPSlotVariants({
      isActive: this.isActive(),
    })
  );

  // Methods to update state (called by parent)
  updateChar(char: string) {
    this._char.set(char);
  }

  updateActive(active: boolean) {
    this._isActive.set(active);
  }

  updateFakeCaret(fakeCaret: boolean) {
    this._hasFakeCaret.set(fakeCaret);
  }
}

/**
 * InputOTPGroup Component
 * Groups multiple OTP slots together
 */
@Component({
  selector: 'InputOTPGroup',
  standalone: true,
  template: `
    <div class="flex items-center gap-1 sm:gap-2">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOTPGroup {
  @ContentChildren(InputOTPSlot) slots!: QueryList<InputOTPSlot>;
}

/**
 * InputOTPSeparator Component
 * Visual separator between OTP groups
 */
@Component({
  selector: 'InputOTPSeparator',
  standalone: true,
  template: `
    <div [class]="separatorClasses()">
      <span>•</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOTPSeparator {
  separatorClasses = computed(() => inputOTPSeparatorVariants());
}

/**
 * Main InputOTP Component
 * Accessible one-time password input with copy-paste functionality
 */
@Component({
  selector: 'InputOTP',
  standalone: true,
  template: `
    <div
      [class]="containerClasses()"
      [attr.data-input-otp]="true"
      [attr.data-disabled]="disabled()"
    >
      <!-- Hidden native input for accessibility and form integration -->
      <input
        #nativeInput
        type="text"
        [value]="value()"
        [attr.maxlength]="maxLength()"
        [disabled]="disabled()"
        [attr.pattern]="pattern() || null"
        [autocomplete]="autocomplete()"
        [attr.inputmode]="inputMode()"
        class="sr-only absolute -left-full -top-full opacity-0"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-describedby]="ariaDescribedBy() || null"
        [attr.aria-invalid]="ariaInvalid() || null"
        [attr.aria-valuetext]="'OTP input with ' + value().length + ' of ' + maxLength() + ' characters entered'"
        [attr.data-allow-copy-paste]="allowCopyPaste()"
        (input)="handleNativeInput($event)"
        (keydown)="handleKeyDown($event)"
        (focus)="handleFocus()"
        (blur)="handleBlur()"
        (paste)="handlePaste($event)"
        (copy)="handleCopy($event)"
        (cut)="handleCut($event)"
      />

      <!-- Visual OTP slots -->
      <div class="flex items-center gap-1 sm:gap-2" (click)="focusInput()">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputOTP),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOTP implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @ViewChild('nativeInput') nativeInput!: ElementRef<HTMLInputElement>;
  @ContentChildren(InputOTPSlot, { descendants: true }) allSlots!: QueryList<InputOTPSlot>;

  // Input properties using input() signals
  maxLength = input<number>(6);
  pattern = input<string>('');
  disabled = input<boolean>(false);
  autocomplete = input<string>('one-time-code');
  inputMode = input<string>('numeric');
  ariaLabel = input<string>('One-time password input');
  ariaDescribedBy = input<string>('');
  ariaInvalid = input<string>('');
  customClass = input<string>('');
  allowCopyPaste = input<boolean>(true);

  // Output events
  @Output() valueChange = new EventEmitter<string>();
  @Output() complete = new EventEmitter<string>();
  @Output() otpFocus = new EventEmitter<void>();
  @Output() otpBlur = new EventEmitter<void>();

  // Internal state
  private _value = signal<string>('');
  private _activeIndex = signal<number>(0);
  private _isFocused = signal<boolean>(false);

  // Form control integration
  private onChange = (_: string) => {};
  private onTouched = () => {};

  constructor() {
    // Set up the effect in constructor where injection context is available
    effect(() => {
      const slotsData = this.slots();
      if (this.allSlots) {
        this.allSlots.forEach((slot, index) => {
          const slotData = slotsData[index];
          if (slotData) {
            slot.updateChar(slotData.char);
            slot.updateActive(slotData.isActive);
            slot.updateFakeCaret(slotData.hasFakeCaret);
          }
        });
      }
    });

    // Effect to monitor copy-paste setting changes
    effect(() => {
      const copyPasteEnabled = this.allowCopyPaste();

      // Update the native input attributes when copy-paste setting changes
      if (this.nativeInput?.nativeElement) {
        this.nativeInput.nativeElement.setAttribute('data-allow-copy-paste', copyPasteEnabled.toString());
      }
    });
  }

  // Computed properties
  value = computed(() => this._value());
  activeIndex = computed(() => this._activeIndex());
  isFocused = computed(() => this._isFocused());

  containerClasses = computed(() =>
    cn(
      inputOTPVariants(),
      this.customClass()
    )
  );

  // Reactive slots array
  slots = computed(() => {
    const val = this.value();
    const maxLen = this.maxLength();
    const activeIdx = this.activeIndex();
    const focused = this.isFocused();

    return Array.from({ length: maxLen }, (_, index) => ({
      index,
      char: val[index] || '',
      isActive: focused && index === activeIdx,
      hasFakeCaret: focused && index === activeIdx && !val[index]
    }));
  });

  ngOnInit() {
    // Initialize with empty value if not set
    if (!this.value()) {
      this._value.set('');
    }
  }

  ngAfterViewInit() {
    // Ensure the native input is properly configured for copy-paste
    if (this.nativeInput?.nativeElement) {
      const input = this.nativeInput.nativeElement;

      // Ensure the input can receive events
      input.setAttribute('data-allow-copy-paste', this.allowCopyPaste().toString());

      // Remove any conflicting styles that might prevent interaction
      input.style.pointerEvents = 'auto';
      input.style.userSelect = 'text';

      // Make sure the input is focusable and can receive paste events
      input.tabIndex = -1; // Programmatically focusable but not in tab order
    }
  }

  ngOnDestroy() {
    // Cleanup is handled automatically by Angular signals
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    if (value !== this.value()) {
      this._value.set(value || '');
      this.updateActiveIndex();
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // For input() signals, we can't set the value directly
    // The disabled state will be handled through the input binding
  }

  // Event handlers
  handleNativeInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    let newValue = target.value;

    // Apply pattern validation if specified
    if (this.pattern()) {
      newValue = this.validateValue(newValue);
    }

    // Limit to maxLength
    newValue = newValue.slice(0, this.maxLength());

    // Update the native input value to match validated value
    if (target.value !== newValue) {
      target.value = newValue;
    }

    this.updateValue(newValue);
  }

  handleKeyDown(event: KeyboardEvent): void {
    const currentValue = this.value();
    const currentIndex = this.activeIndex();

    // Don't interfere with modifier key combinations (Ctrl+V, Ctrl+A, etc.)
    if (event.ctrlKey || event.metaKey || event.altKey) {
      // Allow Ctrl+V for paste, Ctrl+A for select all, etc.
      return;
    }

    switch (event.key) {
      case 'Backspace':
        event.preventDefault();
        if (currentValue[currentIndex]) {
          // Delete current character
          const newValue = currentValue.slice(0, currentIndex) + currentValue.slice(currentIndex + 1);
          this.updateValue(newValue);
        } else if (currentIndex > 0) {
          // Move to previous slot and delete
          const newIndex = currentIndex - 1;
          const newValue = currentValue.slice(0, newIndex) + currentValue.slice(newIndex + 1);
          this.updateValue(newValue);
          this._activeIndex.set(newIndex);
        }
        break;

      case 'Delete':
        event.preventDefault();
        if (currentValue[currentIndex]) {
          const newValue = currentValue.slice(0, currentIndex) + currentValue.slice(currentIndex + 1);
          this.updateValue(newValue);
        }
        break;

      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > 0) {
          this._activeIndex.set(currentIndex - 1);
        }
        break;

      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex < this.maxLength() - 1) {
          this._activeIndex.set(currentIndex + 1);
        }
        break;

      case 'Home':
        event.preventDefault();
        this._activeIndex.set(0);
        break;

      case 'End':
        event.preventDefault();
        this._activeIndex.set(Math.min(currentValue.length, this.maxLength() - 1));
        break;

      case 'Tab':
        // Allow tab to move focus naturally
        break;

      case 'Escape':
        event.preventDefault();
        this.clear();
        break;

      default:
        // Handle character input only for single characters without modifiers
        if (this.isValidCharacter(event.key) && event.key.length === 1) {
          event.preventDefault();
          const newValue = this.insertCharacterAt(currentValue, event.key, currentIndex);
          this.updateValue(newValue);

          // Move to next slot if not at end
          if (currentIndex < this.maxLength() - 1) {
            this._activeIndex.set(currentIndex + 1);
          }
        }
        break;
    }
  }

  handlePaste(event: ClipboardEvent): void {
    // Check if copy-paste is allowed
    if (!this.allowCopyPaste()) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';

    if (!pastedText) return;

    // Clean and validate the pasted text
    const validChars = this.extractValidCharacters(pastedText);

    if (validChars) {
      // Limit to maxLength and update value
      const newValue = validChars.slice(0, this.maxLength());
      this.updateValue(newValue);

      // Move focus to the next empty slot or last slot
      const nextIndex = Math.min(newValue.length, this.maxLength() - 1);
      this._activeIndex.set(nextIndex);

      // Update the native input value to match
      if (this.nativeInput) {
        this.nativeInput.nativeElement.value = newValue;
      }

      // Keep focus on the hidden input
      setTimeout(() => {
        this.focusInput();
      }, 0);
    }
  }

  handleCopy(event: ClipboardEvent): void {
    // Check if copy-paste is allowed
    if (!this.allowCopyPaste()) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    const currentValue = this.value();
    if (currentValue && event.clipboardData) {
      event.clipboardData.setData('text/plain', currentValue);
    }
  }

  handleCut(event: ClipboardEvent): void {
    // Check if copy-paste is allowed
    if (!this.allowCopyPaste()) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    const currentValue = this.value();
    if (currentValue && event.clipboardData) {
      event.clipboardData.setData('text/plain', currentValue);
      this.clear();
    }
  }

  handleFocus(): void {
    this._isFocused.set(true);
    this.otpFocus.emit();
  }

  handleBlur(): void {
    this._isFocused.set(false);
    this.onTouched();
    this.otpBlur.emit();
  }

  // Public methods
  focusInput(): void {
    if (this.nativeInput?.nativeElement) {
      this.nativeInput.nativeElement.focus();
      // Ensure the input is selectable for copy-paste operations
      this.nativeInput.nativeElement.select();
    }
  }

  clear(): void {
    this.updateValue('');
    this._activeIndex.set(0);
  }

  // Private methods
  private updateValue(newValue: string): void {
    const validValue = this.validateValue(newValue);
    this._value.set(validValue);
    this.onChange(validValue);
    this.valueChange.emit(validValue);

    // Emit complete event if all slots are filled
    if (validValue.length === this.maxLength()) {
      this.complete.emit(validValue);
    }

    this.updateActiveIndex();
  }

  private updateActiveIndex(): void {
    const currentValue = this.value();
    const newIndex = Math.min(currentValue.length, this.maxLength() - 1);
    this._activeIndex.set(newIndex);
  }

  private validateValue(value: string): string {
    const pattern = this.pattern();
    if (pattern) {
      const regex = new RegExp(pattern);
      return value.split('').filter(char => regex.test(char)).join('');
    }
    return value;
  }

  private isValidCharacter(char: string): boolean {
    // Reject empty strings, multi-character strings, or control characters
    if (!char || char.length !== 1 || char.charCodeAt(0) < 32) return false;

    const pattern = this.pattern();
    if (pattern) {
      const regex = new RegExp(pattern);
      return regex.test(char);
    }

    // Default to alphanumeric if no pattern specified
    return /^[a-zA-Z0-9]$/.test(char);
  }

  private extractValidCharacters(text: string): string {
    const pattern = this.pattern();
    if (pattern) {
      const regex = new RegExp(pattern, 'g');
      return (text.match(regex) || []).join('');
    }

    // Default to alphanumeric if no pattern specified
    return text.replace(/[^a-zA-Z0-9]/g, '');
  }

  private insertCharacterAt(value: string, char: string, index: number): string {
    if (index >= this.maxLength()) return value;

    const before = value.slice(0, index);
    const after = value.slice(index + 1);
    const newValue = before + char + after;

    return newValue.slice(0, this.maxLength());
  }

  // Host bindings for better UX
  @HostBinding('attr.role') role = 'group';
  @HostBinding('attr.aria-label') get ariaLabelHost() {
    return this.ariaLabel();
  }

  @HostListener('click', ['$event'])
  onHostClick(event: Event): void {
    // Focus the hidden input when clicking anywhere on the component
    event.preventDefault();
    this.focusInput();
  }
}

// Export types
export type { InputOTPSlotProps, InputOTPContext };

// Common patterns for OTP validation
export const REGEXP_ONLY_DIGITS = /^[0-9]$/;
export const REGEXP_ONLY_CHARS = /^[a-zA-Z]$/;
export const REGEXP_ONLY_DIGITS_AND_CHARS = /^[a-zA-Z0-9]$/;
