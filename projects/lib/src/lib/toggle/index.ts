import {
  Component,
  input,
  output,
  signal,
  computed,
  effect,
  model,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  inject,
  PLATFORM_ID,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/**
 * Toggle component variants using Class Variance Authority (CVA)
 * Provides consistent styling patterns with Tailwind CSS
 *
 * Variants:
 * - default: Standard toggle switch
 * - outline: Border-only styling
 * - ghost: Minimal styling with background on hover
 * - destructive: Red/danger styling
 * - success: Green/success styling
 * - warning: Yellow/warning styling
 * - info: Blue/info styling
 */
const toggleVariants = cva(
  [
    'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent',
    'transition-colors duration-200 ease-in-out focus:outline-none',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'items-center'
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-input data-[state=checked]:bg-primary',
          'border-border data-[state=checked]:border-primary'
        ],
        outline: [
          'bg-background border-border data-[state=checked]:bg-primary',
          'data-[state=checked]:border-primary'
        ],
        ghost: [
          'bg-transparent hover:bg-muted data-[state=checked]:bg-primary',
          'border-transparent data-[state=checked]:border-primary'
        ],
        destructive: [
          'bg-input data-[state=checked]:bg-destructive',
          'border-border data-[state=checked]:border-destructive'
        ],
        success: [
          'bg-input data-[state=checked]:bg-green-500',
          'border-border data-[state=checked]:border-green-500'
        ],
        warning: [
          'bg-input data-[state=checked]:bg-yellow-500',
          'border-border data-[state=checked]:border-yellow-500'
        ],
        info: [
          'bg-input data-[state=checked]:bg-blue-500',
          'border-border data-[state=checked]:border-blue-500'
        ],
      },
      size: {
        sm: 'h-5 w-9 p-0.5',
        default: 'h-6 w-11 p-0.5',
        lg: 'h-7 w-12 p-0.5',
        xl: 'h-8 w-14 p-0.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const toggleThumbVariants = cva(
  [
    'pointer-events-none block rounded-full bg-background shadow-lg ring-0',
    'transition-transform duration-200 ease-in-out'
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-4 data-[state=checked]:translate-x-4',
        default: 'h-5 w-5 data-[state=checked]:translate-x-5',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-5',
        xl: 'h-7 w-7 data-[state=checked]:translate-x-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface ToggleChangeEvent {
  checked: boolean;
  value?: any;
  target: HTMLElement;
}

export type ToggleVariantProps = VariantProps<typeof toggleVariants>;

@Component({
  selector: 'Toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Toggle),
      multi: true,
    },
  ],
  animations: [
    trigger('thumbMove', [
      state('unchecked', style({ transform: 'translateX(0)' })),
      state('checked', style({ transform: 'translateX({{ distance }}px)' }), { params: { distance: 20 } }),
      transition('unchecked <=> checked', [
        animate('200ms ease-in-out')
      ]),
    ]),
    trigger('backgroundChange', [
      state('unchecked', style({ backgroundColor: 'var(--input)' })),
      state('checked', style({ backgroundColor: 'var(--primary)' })),
      transition('unchecked <=> checked', [
        animate('200ms ease-in-out')
      ]),
    ]),
    trigger('scale', [
      transition(':enter', [
        style({ transform: 'scale(0.95)', opacity: 0 }),
        animate('150ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
    ]),
    trigger('glow', [
      state('inactive', style({ 
        boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)'
      })),
      state('active', style({ 
        boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.3)'
      })),
      transition('inactive <=> active', [
        animate('200ms ease-in-out')
      ]),
    ]),
    trigger('pulse', [
      transition('false => true', [
        animate('300ms ease-out', keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scale(1.05)', offset: 0.5 }),
          style({ transform: 'scale(1)', offset: 1 }),
        ])),
      ]),
    ]),
  ],
  template: `
    <div class="flex items-center space-x-3">
      <!-- Leading Label -->
      @if (labelPosition() === 'left' && label()) {
        <label 
          [for]="id()" 
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          [class]="labelClasses()"
        >
          {{ label() }}
        </label>
      }

      <!-- Toggle Container -->
      <div class="relative inline-flex items-center">
        <!-- Hidden Checkbox -->
        <input
          #inputElement
          type="checkbox"
          [id]="id()"
          [name]="name()"
          [value]="value()"
          [checked]="checked()"
          [disabled]="disabled()"
          [required]="required()"
          [attr.aria-label]="ariaLabel()"
          [attr.aria-labelledby]="ariaLabelledBy()"
          [attr.aria-describedby]="ariaDescribedBy()"
          [attr.aria-checked]="checked()"
          class="sr-only peer"
          (change)="onToggle($event)"
          (focus)="onFocus()"
          (blur)="onBlur()"
          (keydown)="onKeyDown($event)"
        />

        <!-- Toggle Switch -->
        <div
          [class]="toggleClasses()"
          [attr.data-state]="checked() ? 'checked' : 'unchecked'"
          [@scale]
          [@glow]="isFocused() ? 'active' : 'inactive'"
          [@pulse]="checked()"
          (click)="onToggleClick($event)"
          role="switch"
          [attr.aria-checked]="checked()"
          [attr.tabindex]="-1"
        >
          <!-- Toggle Thumb -->
          <span
            [class]="thumbClasses()"
            [attr.data-state]="checked() ? 'checked' : 'unchecked'"
            [@thumbMove]="{ value: checked() ? 'checked' : 'unchecked', params: { distance: thumbDistance() } }"
          >
            <!-- Thumb Icon -->
            @if (showIcons()) {
              <div class="flex items-center justify-center w-full h-full">
                @if (checked()) {
                  <!-- Checked Icon -->
                  @if (checkedIcon()) {
                    <span [innerHTML]="checkedIcon()"></span>
                  } @else {
                    <svg class="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  }
                } @else {
                  <!-- Unchecked Icon -->
                  @if (uncheckedIcon()) {
                    <span [innerHTML]="uncheckedIcon()"></span>
                  } @else {
                    <svg class="w-3 h-3 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  }
                }
              </div>
            }
          </span>
        </div>
      </div>

      <!-- Trailing Label -->
      @if (labelPosition() === 'right' && label()) {
        <label 
          [for]="id()" 
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          [class]="labelClasses()"
        >
          {{ label() }}
        </label>
      }

      <!-- Description -->
      @if (description()) {
        <p 
          [id]="id() + '-description'"
          class="text-xs text-muted-foreground mt-1"
        >
          {{ description() }}
        </p>
      }
    </div>

    <!-- Helper Text -->
    @if (helperText()) {
      <div class="mt-1 text-xs text-muted-foreground">
        {{ helperText() }}
      </div>
    }

    <!-- Error Message -->
    @if (error()) {
      <div class="mt-1 text-xs text-destructive" role="alert">
        {{ error() }}
      </div>
    }
  `,
})
export class Toggle implements OnInit, OnDestroy, ControlValueAccessor {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  // Input signals
  readonly variant = input<ToggleVariantProps['variant']>('default');
  readonly size = input<ToggleVariantProps['size']>('default');
  readonly label = input<string>('');
  readonly labelPosition = input<'left' | 'right'>('right');
  readonly description = input<string>('');
  readonly helperText = input<string>('');
  readonly error = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly name = input<string>('');
  readonly value = input<any>(true);
  readonly id = input<string>(`toggle-${Math.random().toString(36).substr(2, 9)}`);
  readonly showIcons = input<boolean>(false);
  readonly checkedIcon = input<string>('');
  readonly uncheckedIcon = input<string>('');
  readonly ariaLabel = input<string>('');
  readonly ariaLabelledBy = input<string>('');
  readonly ariaDescribedBy = input<string>('');

  // Two-way binding for checked state
  readonly checked = model<boolean>(false);

  // Output events
  readonly change = output<ToggleChangeEvent>();
  readonly focusEvent = output<FocusEvent>();
  readonly blurEvent = output<FocusEvent>();

  // Internal state signals
  readonly isFocused = signal<boolean>(false);

  // Computed signals
  readonly toggleClasses = computed(() => 
    cn(toggleVariants({
      variant: this.variant(),
      size: this.size(),
    }))
  );

  readonly thumbClasses = computed(() =>
    cn(toggleThumbVariants({
      size: this.size(),
    }))
  );

  readonly labelClasses = computed(() => {
    const baseClasses = 'select-none cursor-pointer';
    if (this.error()) {
      return `${baseClasses} text-destructive`;
    }
    if (this.disabled()) {
      return `${baseClasses} text-muted-foreground`;
    }
    return baseClasses;
  });

  readonly thumbDistance = computed(() => {
    const sizeMap: Record<string, number> = {
      sm: 16,   // w-9 - w-4 - padding = 36px - 16px - 4px = 16px
      default: 20, // w-11 - w-5 - padding = 44px - 20px - 4px = 20px  
      lg: 20,   // w-12 - w-6 - padding = 48px - 24px - 4px = 20px
      xl: 24,   // w-14 - w-7 - padding = 56px - 28px - 4px = 24px
    };
    const size = this.size() || 'default';
    return sizeMap[size] || 20;
  });

  // ControlValueAccessor implementation
  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // The disabled state is handled by the disabled input signal
  }

  constructor() {
    // Effect to emit change events
    effect(() => {
      this.onChange(this.checked());
    });

    // Effect to update aria-describedby
    effect(() => {
      const describedBy = [];
      if (this.description()) {
        describedBy.push(this.id() + '-description');
      }
      if (this.error()) {
        describedBy.push(this.id() + '-error');
      }
      if (this.ariaDescribedBy()) {
        describedBy.push(this.ariaDescribedBy());
      }
      // Update aria-describedby if needed
    });
  }

  ngOnInit(): void {
    // Initialize any platform-specific features
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  onToggle(event: Event): void {
    if (this.disabled()) return;

    const target = event.target as HTMLInputElement;
    const newChecked = target.checked;
    
    this.checked.set(newChecked);
    this.onTouched();

    const changeEvent: ToggleChangeEvent = {
      checked: newChecked,
      value: newChecked ? this.value() : undefined,
      target: target,
    };

    this.change.emit(changeEvent);
  }

  onToggleClick(event: Event): void {
    if (this.disabled()) return;
    
    // Prevent the click from propagating to parent elements
    event.preventDefault();
    event.stopPropagation();
    
    // Toggle the checkbox programmatically
    if (this.inputElement?.nativeElement) {
      this.inputElement.nativeElement.click();
    }
  }

  onFocus(): void {
    this.isFocused.set(true);
    
    if (this.inputElement?.nativeElement) {
      const focusEvent = new FocusEvent('focus');
      this.focusEvent.emit(focusEvent);
    }
  }

  onBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
    
    if (this.inputElement?.nativeElement) {
      const blurEvent = new FocusEvent('blur');
      this.blurEvent.emit(blurEvent);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    // Handle keyboard navigation
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (!this.disabled()) {
        this.toggle();
      }
    }
  }

  // Public methods
  toggle(): void {
    if (this.disabled()) return;
    
    this.checked.set(!this.checked());
    this.onTouched();

    const changeEvent: ToggleChangeEvent = {
      checked: this.checked(),
      value: this.checked() ? this.value() : undefined,
      target: this.inputElement?.nativeElement || ({} as HTMLElement),
    };

    this.change.emit(changeEvent);
  }

  focusInput(): void {
    if (this.inputElement?.nativeElement) {
      this.inputElement.nativeElement.focus();
    }
  }

  blurInput(): void {
    if (this.inputElement?.nativeElement) {
      this.inputElement.nativeElement.blur();
    }
  }
}
