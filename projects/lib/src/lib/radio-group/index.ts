import { Component, Input, Output, EventEmitter, computed, signal, forwardRef, OnInit, AfterContentInit, AfterViewInit, ContentChildren, ViewChildren, QueryList, ChangeDetectionStrategy, ViewChild, ElementRef, HostListener, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn'; // Assuming 'cn' utility is available

/**
 * Radio Group Item component variants using Class Variance Authority (CVA)
 * Provides consistent styling patterns with Tailwind CSS
 */
const radioVariants = cva(
  [
    'aspect-square rounded-full border-2 bg-background text-primary shadow-sm',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-all duration-200 ease-in-out',
    'cursor-pointer relative flex items-center justify-center', // Keep relative for inner dot positioning
    'hover:border-primary/80',
    'active:scale-95',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-input',
          'hover:border-primary',
          'focus-visible:ring-primary',
          // FIXED: Fill background and set border color on check
          'data-[checked=true]:border-primary',
        ],
        destructive: [
          'border-input',
          'hover:border-destructive',
          'focus-visible:ring-destructive',
          // FIXED: Fill background and set border color on check
          'data-[checked=true]:border-destructive',
        ],
        success: [
          'border-input',
          'hover:border-green-500',
          'focus-visible:ring-green-500',
           // FIXED: Fill background and set border color on check
          ' data-[checked=true]:border-green-800',
        ],
        warning: [
          'border-input',
          'hover:border-yellow-500',
          'focus-visible:ring-yellow-500',
           // FIXED: Fill background and set border color on check
          'data-[checked=true]:border-yellow-800',
        ],
        secondary: [
          'border-input',
          'hover:border-secondary',
          'focus-visible:ring-secondary',
           // FIXED: Fill background and set border color on check
          'data-[checked=true]:border-secondary',
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

const radioGroupVariants = cva(
  'grid gap-2',
  {
    variants: {
      orientation: {
        vertical: 'grid-cols-1',
        horizontal: 'grid-flow-col auto-cols-max gap-6',
      },
      size: {
        default: 'gap-2',
        sm: 'gap-1.5',
        lg: 'gap-3',
        xl: 'gap-4',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
      size: 'default',
    },
  }
);

export type RadioVariant = VariantProps<typeof radioVariants>;
export type RadioGroupVariant = VariantProps<typeof radioGroupVariants>;

export interface RadioGroupAccessibility {
  /** ARIA label for the radio group */
  ariaLabel?: string;
  /** Element ID that labels the radio group */
  ariaLabelledBy?: string;
  /** Element ID that describes the radio group */
  ariaDescribedBy?: string;
  /** Whether the radio group is required */
  ariaRequired?: boolean;
  /** Whether the radio group has validation errors */
  ariaInvalid?: boolean;
  /** Live region for announcing selection changes */
  ariaLive?: 'off' | 'polite' | 'assertive';
}

export interface RadioOption {
  /** Unique value for the radio option */
  value: string;
  /** Display label for the radio option */
  label: string;
  /** Optional description text */
  description?: string;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Individual Radio Item Component
 * Used within RadioGroup to create individual radio options
 */
@Component({
  selector: 'RadioGroupItem',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center space-x-2">
      <button
        type="button"
        role="radio"
        [id]="itemId"
        [value]="value"
        [disabled]="disabled"
        [attr.aria-checked]="checked()"
        [attr.data-checked]="checked()"
        [class]="radioClasses()"
        (click)="handleClick()"
        (keydown)="handleKeydown($event)"
        (focus)="handleFocus()"
        (blur)="handleBlur()"
        #radioButton
      >
        <!-- make the container relative and dot absolute inside -->
        <div class="relative inset-0 flex items-center justify-center w-full h-full">
          <span class="{{getDotClasses()}}"></span>
        </div>
      </button>

      <div class="space-y-1 leading-none">
        <label [for]="itemId" class="text-sm font-medium cursor-pointer select-none">
          {{ label }}
        </label>
        <p *ngIf="description" class="text-xs text-gray-400">
          {{ description }}
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupItem {
  @Input() value!: string;
  @Input() label!: string;
  @Input() description?: string;
  @Input() disabled: boolean = false;
  @Input() variant: RadioVariant['variant'] = 'default';
  @Input() size: RadioVariant['size'] = 'default';
  @Input() className?: string;
  @Input() containerClassName?: string;
  @Input() labelClasses?: string;
  @Input() descriptionClasses?: string;

  @Output() select = new EventEmitter<string>();
  @Output() itemFocus = new EventEmitter<string>();
  @Output() itemBlur = new EventEmitter<string>();

  // Internal state
  checked = signal(false);
  focused = signal(false);

  // Unique IDs for accessibility
  readonly itemId = `radio-item-${Math.random().toString(36).substr(2, 9)}`;
  readonly labelId = `radio-label-${this.itemId}`;
  readonly descriptionId = `radio-description-${this.itemId}`;

  @ViewChild('radioButton', { static: true }) radioButton!: ElementRef<HTMLButtonElement>;

  // Computed styles for the outer radio button element
  readonly radioClasses = computed(() =>
    cn(
      radioVariants({ variant: this.variant, size: this.size }),
      this.className
    )
  );

  // FIXED: This method now generates classes for a high-contrast inner dot
  // that appears on top of the newly filled background.
  getDotClasses(): string {
    const isChecked = this.checked();
    const currentSize = this.size || 'default';

    const dotSizes: Record<string, string> = {
      sm: 'h-1.5 w-1.5',
      default: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
      xl: 'h-3 w-3'
    };

    return cn(
      'absolute rounded-full transition-transform duration-200 ease-out',
      dotSizes[currentSize],
      isChecked ? 'scale-100 bg-zinc-300 ' : 'scale-0'
    );
  }



  setChecked(checked: boolean): void {
    this.checked.set(checked);
  }

  handleClick(): void {
    if (!this.disabled) {
      this.select.emit(this.value);
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.handleClick();
    }
  }

  handleFocus(): void {
    this.focused.set(true);
    this.itemFocus.emit(this.value);
  }

  handleBlur(): void {
    this.focused.set(false);
    this.itemBlur.emit(this.value);
  }

  focusElement(): void {
    this.radioButton.nativeElement.focus();
  }
}

/**
 * Radio Group Component
 * A comprehensive radio group implementation with full accessibility support
 */
@Component({
  selector: 'RadioGroup',
  standalone: true,
  imports: [CommonModule, RadioGroupItem],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroup),
      multi: true,
    },
  ],
  template: `
    <div
      role="radiogroup"
      [attr.aria-label]="accessibility.ariaLabel"
      [attr.aria-labelledby]="accessibility.ariaLabelledBy"
      [attr.aria-describedby]="accessibility.ariaDescribedBy"
      [attr.aria-required]="accessibility.ariaRequired"
      [attr.aria-invalid]="accessibility.ariaInvalid"
      [attr.aria-orientation]="orientation"
      [class]="groupClasses()"
      (keydown)="handleKeydown($event)"
    >
      <RadioGroupItem
        *ngFor="let option of options; trackBy: trackByValue"
        [value]="option.value"
        [label]="option.label"
        [description]="option.description"
        [disabled]="option.disabled || disabled"
        [variant]="variant"
        [size]="size"
        [className]="option.className"
        (select)="selectOption($event)"
        (itemFocus)="handleItemFocus($event)"
        (itemBlur)="handleItemBlur($event)"
        #radioItem
      ></RadioGroupItem>

      <ng-content></ng-content>
    </div>

    <div
      class="sr-only"
      [attr.aria-live]="accessibility.ariaLive || 'polite'"
      aria-atomic="true"
    >
      {{ announcementText() }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroup implements ControlValueAccessor, OnInit, AfterViewInit {
  // Core inputs
  @Input() value: string | null = null;
  @Input() options: RadioOption[] = [];
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() name?: string;

  // Styling inputs
  @Input() variant: RadioVariant['variant'] = 'default';
  @Input() size: RadioVariant['size'] = 'default';
  @Input() orientation: RadioGroupVariant['orientation'] = 'vertical';
  @Input() className?: string;

  // Accessibility
  @Input() accessibility: RadioGroupAccessibility = {};

  // Output events
  @Output() valueChange = new EventEmitter<string | null>();
  @Output() selectionChange = new EventEmitter<RadioOption | null>();

  // Internal state
  readonly selectedValue = signal<string | null>(null);
  readonly focusedValue = signal<string | null>(null);
  readonly announcementText = signal<string>('');

  // Get child radio items
  @ViewChildren(RadioGroupItem) radioItems!: QueryList<RadioGroupItem>;

  // Element reference for keyboard navigation
  private elementRef = inject(ElementRef);

  // ControlValueAccessor implementation
  private onChange = (value: string | null) => {};
  private onTouched = () => {};

  // Computed properties
  readonly groupClasses = computed(() =>
    cn(
      radioGroupVariants({
        orientation: this.orientation,
        size: this.size
      }),
      this.className
    )
  );

  readonly selectedOption = computed(() => {
    const value = this.selectedValue();
    return this.options.find(option => option.value === value) || null;
  });

  ngOnInit(): void {
    // Set initial value if provided
    if (this.value !== null) {
      this.selectedValue.set(this.value);
    }
  }

  ngAfterViewInit(): void {
    // Update radio items when selection changes
    // Use .changes.subscribe for dynamically added items (e.g., via *ngFor)
    this.radioItems.changes.subscribe(() => {
      this.updateRadioItems();
    });
    // Initial update after view is initialized
    this.updateRadioItems();
  }

  private updateRadioItems(): void {
    if (!this.radioItems) {
      console.log('=== updateRadioItems Debug ===');
      console.log('No radio items found - returning early');
      console.log('==============================');
      return;
    }

    const selectedValue = this.selectedValue();
    console.log('=== updateRadioItems Debug ===');
    console.log('Selected value:', selectedValue);
    console.log('Radio items count:', this.radioItems.length);

    this.radioItems.forEach((item, index) => {
      const isChecked = item.value === selectedValue;
      console.log(`Item ${index}: value="${item.value}", shouldBeChecked=${isChecked}`);
      item.setChecked(isChecked);
    });
    console.log('==============================');
  }

  selectOption(value: string): void {
    console.log('=== RadioGroup selectOption Debug ===');
    console.log('Selected value:', value);
    console.log('Current selected value:', this.selectedValue());
    console.log('Available options:', this.options.map(opt => opt.value));

    const option = this.options.find(opt => opt.value === value);
    console.log('Found option:', option);
    console.log('Option disabled:', option?.disabled);
    console.log('Group disabled:', this.disabled);

    if (option && !option.disabled && !this.disabled) {
      console.log('Setting new selected value:', value);
      this.selectedValue.set(value);

      console.log('Updating radio items...');
      this.updateRadioItems(); // Ensure all items re-evaluate their checked state

      // Emit events
      this.valueChange.emit(value);
      this.selectionChange.emit(option);

      // Form control integration
      this.onChange(value);
      this.onTouched();

      // Accessibility announcement
      this.announceSelection(option);
      console.log('Selection completed');
    } else {
      console.log('Selection blocked - option not found or disabled');
    }
    console.log('=====================================');
  }

  private announceSelection(option: RadioOption): void {
    const announcement = `Selected ${option.label}${option.description ? ': ' + option.description : ''}`;
    this.announcementText.set(announcement);

    // Clear announcement after it's been read to allow re-announcement on same selection
    setTimeout(() => {
      this.announcementText.set('');
    }, 1000);
  }

  handleItemFocus(value: string): void {
    this.focusedValue.set(value);
  }

  handleItemBlur(value: string): void {
    if (this.focusedValue() === value) {
      this.focusedValue.set(null);
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    const enabledOptions = this.options.filter(opt => !opt.disabled);
    const currentIndex = enabledOptions.findIndex(opt => opt.value === this.focusedValue());

    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        nextIndex = (currentIndex + 1) % enabledOptions.length;
        break;

      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        nextIndex = currentIndex <= 0 ? enabledOptions.length - 1 : currentIndex - 1;
        break;

      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;

      case 'End':
        event.preventDefault();
        nextIndex = enabledOptions.length - 1;
        break;

      case ' ':
      case 'Enter':
        event.preventDefault();
        if (this.focusedValue()) {
          this.selectOption(this.focusedValue()!);
        }
        break;
    }

    if (nextIndex !== currentIndex && enabledOptions[nextIndex]) {
      const targetValue = enabledOptions[nextIndex].value;
      this.focusRadioItem(targetValue);
    }
  }

  private focusRadioItem(value: string): void {
    const radioItem = this.radioItems.find(item => item.value === value);
    if (radioItem) {
      radioItem.focusElement();
    }
  }

  // Track by function for ngFor
  trackByValue(index: number, option: RadioOption): string {
    return option.value;
  }

  // ControlValueAccessor implementation
  writeValue(value: string | null): void {
    this.value = value;
    this.selectedValue.set(value);
    this.updateRadioItems(); // Important: Update items when programmatically setting value
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

// Utility function to create accessibility configuration
export function createRadioGroupAccessibility(
  options: Partial<RadioGroupAccessibility> = {}
): RadioGroupAccessibility {
  return {
    ariaLive: 'polite',
    ariaRequired: false,
    ariaInvalid: false,
    ...options,
  };
}

// Export variants for external use
export { radioVariants, radioGroupVariants };
