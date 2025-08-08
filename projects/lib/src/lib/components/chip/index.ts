import {
  Component,
  computed,
  input,
  output,
  signal,
  effect,
  ElementRef,
  inject,
  ChangeDetectionStrategy,
  HostListener,
  OnInit,
  OnDestroy,
  ViewChild,
  ContentChildren,
  QueryList,
  AfterViewInit,
  AfterContentInit,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { cn } from '../../utils/cn';
import { TooltipDirective } from '../tooltip';

/**
 * Unique ID generator for Chip components
 */
let chipIdCounter = 0;

/**
 * Chip component variants using Class Variance Authority (CVA)
 * Provides consistent styling patterns with Tailwind CSS
 *
 * Variants:
 * - filled: Solid background with contrasting text
 * - outlined: Border with transparent background
 * - ghost: Minimal styling with background on hover
 * - gradient: Gradient background for premium feel
 */
const chipVariants = cva(
  [
    'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium',
    'rounded-full border-0', // Ensure border doesn't interfere
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'select-none cursor-pointer',
    'max-w-full overflow-hidden',
    'relative'
  ],
  {
    variants: {
      variant: {
        filled: [
          'text-white shadow-sm',
          'hover:shadow-md active:scale-95',
          'before:absolute before:inset-0 before:rounded-full before:bg-white/10 before:opacity-0',
          'hover:before:opacity-100 before:transition-opacity before:duration-200'
        ],
        outlined: [
          'border-2 bg-transparent shadow-sm',
          'hover:shadow-md active:scale-95 transition-all duration-200'
        ],
        ghost: [
          'bg-transparent',
          'hover:shadow-sm active:scale-95 transition-all duration-200'
        ],
        gradient: [
          'text-white shadow-lg border-0',
          'hover:shadow-xl active:scale-95',
          'before:absolute before:inset-0 before:rounded-full before:bg-white/20 before:opacity-0',
          'hover:before:opacity-100 before:transition-opacity before:duration-200'
        ]
      },
      color: {
        default: '',
        primary: '',
        secondary: '',
        success: '',
        warning: '',
        danger: '',
        info: ''
      },
      size: {
        sm: 'px-2 py-1 text-xs min-h-[24px]',
        md: 'px-3 py-1.5 text-sm min-h-[32px]',
        lg: 'px-4 py-2 text-base min-h-[40px]',
        xl: 'px-5 py-2.5 text-lg min-h-[48px]'
      },
      state: {
        default: 'opacity-100',
        disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
        loading: 'opacity-75 cursor-wait'
      }
    },
    compoundVariants: [
      // Filled variant colors
      {
        variant: 'filled',
        color: 'default',
        class: 'bg-gray-600 hover:bg-gray-700 text-white'
      },
      {
        variant: 'filled',
        color: 'primary',
        class: 'bg-blue-600 hover:bg-blue-700 text-white'
      },
      {
        variant: 'filled',
        color: 'secondary',
        class: 'bg-gray-500 hover:bg-gray-600 text-white'
      },
      {
        variant: 'filled',
        color: 'success',
        class: 'bg-green-600 hover:bg-green-700 text-white'
      },
      {
        variant: 'filled',
        color: 'warning',
        class: 'bg-yellow-600 hover:bg-yellow-700 text-white'
      },
      {
        variant: 'filled',
        color: 'danger',
        class: 'bg-red-600 hover:bg-red-700 text-white'
      },
      {
        variant: 'filled',
        color: 'info',
        class: 'bg-blue-500 hover:bg-blue-600 text-white'
      },
      // Outlined variant colors
      {
        variant: 'outlined',
        color: 'default',
        class: 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:border-gray-500'
      },
      {
        variant: 'outlined',
        color: 'primary',
        class: 'border-blue-500 text-blue-700 hover:bg-blue-50 hover:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-900/50 dark:hover:border-blue-400'
      },
      {
        variant: 'outlined',
        color: 'secondary',
        class: 'border-gray-400 text-gray-600 hover:bg-gray-100 hover:border-gray-500 dark:border-gray-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:border-gray-400'
      },
      {
        variant: 'outlined',
        color: 'success',
        class: 'border-green-500 text-green-700 hover:bg-green-50 hover:border-green-600 dark:text-green-300 dark:hover:bg-green-900/50 dark:hover:border-green-400'
      },
      {
        variant: 'outlined',
        color: 'warning',
        class: 'border-yellow-500 text-yellow-700 hover:bg-yellow-50 hover:border-yellow-600 dark:text-yellow-300 dark:hover:bg-yellow-900/50 dark:hover:border-yellow-400'
      },
      {
        variant: 'outlined',
        color: 'danger',
        class: 'border-red-500 text-red-700 hover:bg-red-50 hover:border-red-600 dark:text-red-300 dark:hover:bg-red-900/50 dark:hover:border-red-400'
      },
      {
        variant: 'outlined',
        color: 'info',
        class: 'border-blue-400 text-blue-600 hover:bg-blue-50 hover:border-blue-500 dark:text-blue-300 dark:hover:bg-blue-900/50 dark:hover:border-blue-300'
      },
      // Ghost variant colors
      {
        variant: 'ghost',
        color: 'default',
        class: 'text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200'
      },
      {
        variant: 'ghost',
        color: 'primary',
        class: 'text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/60 dark:hover:text-blue-200'
      },
      {
        variant: 'ghost',
        color: 'secondary',
        class: 'text-gray-600 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300'
      },
      {
        variant: 'ghost',
        color: 'success',
        class: 'text-green-700 hover:bg-green-100 hover:text-green-800 dark:text-green-300 dark:hover:bg-green-900/60 dark:hover:text-green-200'
      },
      {
        variant: 'ghost',
        color: 'warning',
        class: 'text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800 dark:text-yellow-300 dark:hover:bg-yellow-900/60 dark:hover:text-yellow-200'
      },
      {
        variant: 'ghost',
        color: 'danger',
        class: 'text-red-700 hover:bg-red-100 hover:text-red-800 dark:text-red-300 dark:hover:bg-red-900/60 dark:hover:text-red-200'
      },
      {
        variant: 'ghost',
        color: 'info',
        class: 'text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/60 dark:hover:text-blue-200'
      },
      // Gradient variant colors
      {
        variant: 'gradient',
        color: 'default',
        class: 'bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800'
      },
      {
        variant: 'gradient',
        color: 'primary',
        class: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
      },
      {
        variant: 'gradient',
        color: 'secondary',
        class: 'bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700'
      },
      {
        variant: 'gradient',
        color: 'success',
        class: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
      },
      {
        variant: 'gradient',
        color: 'warning',
        class: 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700'
      },
      {
        variant: 'gradient',
        color: 'danger',
        class: 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
      },
      {
        variant: 'gradient',
        color: 'info',
        class: 'bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600'
      }
    ],
    defaultVariants: {
      variant: 'filled',
      color: 'default',
      size: 'md',
      state: 'default'
    }
  }
);

const removeButtonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-full',
    'transition-all duration-150 ease-in-out',
    'hover:bg-black/10 dark:hover:bg-white/10',
    'focus:outline-none focus-visible:ring-1 focus-visible:ring-white',
    'active:scale-90'
  ],
  {
    variants: {
      size: {
        sm: 'w-4 h-4 ml-1',
        md: 'w-5 h-5 ml-1.5',
        lg: 'w-6 h-6 ml-2',
        xl: 'w-7 h-7 ml-2.5'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

const chipAvatarVariants = cva(
  [
    'inline-flex items-center justify-center rounded-full overflow-hidden flex-shrink-0',
    'bg-white/20 text-current'
  ],
  {
    variants: {
      size: {
        sm: 'w-4 h-4 mr-1 text-xs',
        md: 'w-5 h-5 mr-1.5 text-xs',
        lg: 'w-6 h-6 mr-2 text-sm',
        xl: 'w-8 h-8 mr-2.5 text-base'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

export interface ChipClickEvent {
  chip: ChipComponent;
  event: MouseEvent;
}

export interface ChipRemoveEvent {
  chip: ChipComponent;
  event: MouseEvent;
}

export type ChipVariantProps = VariantProps<typeof chipVariants>;

/**
 * Chip Component
 * 
 * A versatile chip/tag component for displaying removable labels, filters, selections, and categories.
 * Built with Angular signals for optimal performance and accessibility.
 * 
 * Security: This component safely handles user input by sanitizing avatar and removeIcon content
 * to prevent XSS attacks. HTML content is stripped and only text content is displayed.
 * 
 * @example
 * ```html
 * <!-- Basic chip -->
 * <Chip>Basic Chip</Chip>
 * 
 * <!-- Removable chip -->
 * <Chip [removable]="true" (onRemove)="handleRemove($event)">
 *   Removable Chip
 * </Chip>
 * 
 * <!-- Chip with image avatar (safe) -->
 * <Chip [avatar]="'https://example.com/avatar.jpg'" [avatarAlt]="'User Name'">
 *   John Doe
 * </Chip>
 * 
 * <!-- Chip with text avatar (safe - HTML is stripped) -->
 * <Chip [avatar]="'JD'">
 *   John Doe
 * </Chip>
 * 
 * <!-- Different variants -->
 * <Chip variant="outlined" color="primary">Outlined Primary</Chip>
 * <Chip variant="gradient" color="success">Gradient Success</Chip>
 * ```
 */
@Component({
  selector: 'Chip',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('chipEnter', [
      transition(':enter', [
        style({ 
          opacity: 0, 
          transform: 'scale(0.8) translateY(-10px)',
          filter: 'blur(4px)'
        }),
        animate('300ms cubic-bezier(0.34, 1.56, 0.64, 1)', 
          style({ 
            opacity: 1, 
            transform: 'scale(1) translateY(0)',
            filter: 'blur(0px)'
          })
        )
      ])
    ]),
    trigger('chipExit', [
      transition(':leave', [
        animate('200ms cubic-bezier(0.4, 0.0, 1, 1)', 
          style({ 
            opacity: 0, 
            transform: 'scale(0.8) translateX(20px)',
            filter: 'blur(2px)'
          })
        )
      ])
    ]),
    trigger('chipHover', [
      state('rest', style({ transform: 'scale(1)' })),
      state('hover', style({ transform: 'scale(1.02)' })),
      transition('rest <=> hover', animate('150ms ease-out'))
    ]),
    trigger('removeButtonHover', [
      state('rest', style({ transform: 'scale(1)', opacity: 0.7 })),
      state('hover', style({ transform: 'scale(1.1)', opacity: 1 })),
      transition('rest <=> hover', animate('150ms ease-out'))
    ]),
    trigger('loadingPulse', [
      state('active', style({ transform: 'scale(1)', opacity: 1 })),
      transition('* => active', [
        animate('1000ms ease-in-out', keyframes([
          style({ transform: 'scale(1)', opacity: 1, offset: 0 }),
          style({ transform: 'scale(1.02)', opacity: 0.8, offset: 0.5 }),
          style({ transform: 'scale(1)', opacity: 1, offset: 1 })
        ]))
      ])
    ])
  ],
  template: `
    <div
      #chipElement
      [class]="chipClasses()"
      [attr.id]="chipId()"
      [attr.aria-label]="ariaLabel() || null"
      [attr.aria-describedby]="ariaDescribedBy() || null"
      [attr.role]="role()"
      [attr.tabindex]="disabled() ? -1 : (clickable() ? (isTabbable() ? 0 : -1) : -1)"
      [attr.aria-disabled]="disabled()"
      [@chipEnter]
      [@chipExit]
      [@chipHover]="hoverState()"
      [@loadingPulse]="loading() ? 'active' : null"
      (click)="handleClick($event)"
      (keydown)="handleKeyDown($event)"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      (focus)="onFocus()"
      (blur)="onBlur()"
    >
      <!-- Loading Spinner -->
      @if (loading()) {
        <div class="animate-spin rounded-full border-2 border-current border-t-transparent w-4 h-4 mr-1"></div>
      }

      <!-- Avatar -->
      @if (avatar() && !loading()) {
        <div [class]="avatarClasses()">
          @if (isImageAvatar()) {
            <img 
              [src]="avatar()" 
              [alt]="avatarAlt() || ''"
              class="w-full h-full object-cover"
              (error)="onAvatarError()"
            />
          } @else {
            <!-- Display avatar text safely without innerHTML -->
            <span class="select-none">{{ getAvatarText() }}</span>
          }
        </div>
      }

      <!-- Chip Label -->
      <span 
        class="truncate flex-1 min-w-0"
        [title]="showTooltip() ? label() : null"
      >
        @if (label()) {
          {{ label() }}
        } @else {
          <ng-content></ng-content>
        }
      </span>

      <!-- Remove Button -->
      @if (removable() && !disabled() && !loading()) {
        <button
          [class]="removeButtonClasses()"
          [attr.aria-label]="removeAriaLabel()"
          [attr.tabindex]="-1"
          [@removeButtonHover]="removeButtonHoverState()"
          (click)="handleRemove($event)"
          (mouseenter)="onRemoveButtonMouseEnter()"
          (mouseleave)="onRemoveButtonMouseLeave()"
          type="button"
        >
          @if (removeIcon()) {
            <!-- Display remove icon text safely without innerHTML -->
            <span class="select-none text-xs">{{ getRemoveIconText() }}</span>
          } @else {
            <svg 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              class="w-full h-full"
              aria-hidden="true"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          }
        </button>
      }
    </div>
  `
})
export class ChipComponent implements OnInit, OnDestroy {
  // Input signals
  readonly variant = input<ChipVariantProps['variant']>('filled');
  readonly color = input<ChipVariantProps['color']>('default');
  readonly size = input<ChipVariantProps['size']>('md');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly removable = input<boolean>(false);
  readonly clickable = input<boolean>(true);
  readonly truncate = input<boolean>(true);
  readonly showTooltip = input<boolean>(true);
  
  // Customization inputs
  readonly avatar = input<string>('');
  readonly avatarAlt = input<string>('');
  readonly removeIcon = input<string>('');
  readonly customClass = input<string>('');
  readonly label = input<string>(''); // Dedicated label input for predictable state
  
  // Accessibility inputs
  readonly ariaLabel = input<string>('');
  readonly ariaDescribedBy = input<string>('');
  readonly role = input<string>('button');
  readonly removeAriaLabel = input<string>('Remove');

  // Output signals
  readonly onClick = output<ChipClickEvent>();
  readonly onRemove = output<ChipRemoveEvent>();
  readonly onFocusChange = output<boolean>();
  readonly onHoverChange = output<boolean>();

  // Internal state signals
  private readonly _hovered = signal<boolean>(false);
  private readonly _focused = signal<boolean>(false);
  private readonly _removeButtonHovered = signal<boolean>(false);
  private readonly _chipId = signal<string>(`chip-${++chipIdCounter}`);
  private readonly _avatarError = signal<boolean>(false);
  private readonly _isTabbable = signal<boolean>(true); // Default to true for standalone chips

  // Platform and element injection
  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject(ElementRef);

  @ViewChild('chipElement', { static: true }) chipElement!: ElementRef<HTMLElement>;

  // Computed properties
  readonly chipId = computed(() => this._chipId());
  readonly hoverState = computed(() => this._hovered() ? 'hover' : 'rest');
  readonly removeButtonHoverState = computed(() => this._removeButtonHovered() ? 'hover' : 'rest');
  readonly isTabbable = computed(() => this._isTabbable()); // Public getter for template
  readonly isImageAvatar = computed(() => {
    const avatarValue = this.avatar();
    return avatarValue && !this._avatarError() && (
      avatarValue.startsWith('http') || 
      avatarValue.startsWith('data:image') || 
      avatarValue.includes('.')
    );
  });

  // Safe text extraction methods
  readonly getAvatarText = computed(() => {
    const avatarValue = this.avatar();
    if (!avatarValue || this.isImageAvatar()) {
      return '';
    }
    // Extract text content safely, removing any HTML tags
    return this.extractTextContent(avatarValue);
  });

  readonly getRemoveIconText = computed(() => {
    const iconValue = this.removeIcon();
    if (!iconValue) {
      return '×'; // Default close symbol
    }
    // Extract text content safely, removing any HTML tags
    return this.extractTextContent(iconValue);
  });

  // CSS class computations
  readonly chipClasses = computed(() => {
    const state = this.disabled() ? 'disabled' : this.loading() ? 'loading' : 'default';
    return cn(
      chipVariants({
        variant: this.variant(),
        color: this.color(),
        size: this.size(),
        state
      }),
      this.customClass()
    );
  });

  readonly removeButtonClasses = computed(() => {
    return cn(removeButtonVariants({ size: this.size() }));
  });

  readonly avatarClasses = computed(() => {
    return cn(chipAvatarVariants({ size: this.size() }));
  });

  constructor() {
    // Constructor kept minimal for better performance
  }

  ngOnInit() {
    // Lifecycle method kept for interface compliance
  }

  ngOnDestroy() {
    // Cleanup is handled automatically by signals
  }

  // Event handlers
  handleClick(event: MouseEvent) {
    if (this.disabled() || this.loading() || !this.clickable()) {
      event.preventDefault();
      return;
    }

    this.onClick.emit({
      chip: this,
      event
    });
  }

  handleRemove(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();

    if (this.disabled() || this.loading()) {
      return;
    }

    this.onRemove.emit({
      chip: this,
      event
    });
  }

  handleKeyDown(event: KeyboardEvent) {
    if (this.disabled() || this.loading()) {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
        if (this.clickable()) {
          event.preventDefault();
          this.handleClick(event as any);
        }
        break;
      case 'Delete':
      case 'Backspace':
        if (this.removable()) {
          event.preventDefault();
          this.handleRemove(event as any);
        }
        break;
      case 'Escape':
        if (this._focused()) {
          this.chipElement?.nativeElement?.blur();
        }
        break;
    }
  }

  // Mouse and focus event handlers
  onMouseEnter() {
    if (!this.disabled() && !this.loading()) {
      this._hovered.set(true);
      this.onHoverChange.emit(true);
    }
  }

  onMouseLeave() {
    this._hovered.set(false);
    this.onHoverChange.emit(false);
  }

  onFocus() {
    if (!this.disabled()) {
      this._focused.set(true);
      this.onFocusChange.emit(true);
    }
  }

  onBlur() {
    this._focused.set(false);
    this.onFocusChange.emit(false);
  }

  onRemoveButtonMouseEnter() {
    this._removeButtonHovered.set(true);
  }

  onRemoveButtonMouseLeave() {
    this._removeButtonHovered.set(false);
  }

  onAvatarError() {
    this._avatarError.set(true);
  }

  // Public methods for programmatic control
  focus() {
    if (isPlatformBrowser(this.platformId)) {
      this.chipElement?.nativeElement?.focus();
    }
  }

  blur() {
    if (isPlatformBrowser(this.platformId)) {
      this.chipElement?.nativeElement?.blur();
    }
  }

  /**
   * Public method for parent ChipSet to control tabindex (roving tabindex pattern)
   */
  setTabbable(isTabbable: boolean): void {
    this._isTabbable.set(isTabbable);
  }

  /**
   * Safely extract text content from potentially unsafe HTML strings
   * This prevents XSS by stripping HTML tags and returning only text
   * SSR-Safe: Uses platform detection to avoid document access on server
   */
  private extractTextContent(htmlString: string): string {
    if (!isPlatformBrowser(this.platformId) || !htmlString) {
      return htmlString || ''; // On server, just return the string (or empty)
    }

    // This logic now only runs in the browser
    const withoutTags = htmlString.replace(/<[^>]*>/g, '');
    
    // Decode HTML entities and trim whitespace
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = withoutTags;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    // Return trimmed text, limit to reasonable length for UI
    return textContent.trim().substring(0, 50);
  }
}

/**
 * Chip Set Component
 * 
 * A container for managing multiple chips with overflow handling and keyboard navigation.
 * 
 * @example
 * ```html
 * <ChipSet [wrap]="true" [spacing]="'sm'">
 *   <Chip>Tag 1</Chip>
 *   <Chip>Tag 2</Chip>
 *   <Chip>Tag 3</Chip>
 * </ChipSet>
 * ```
 */
@Component({
  selector: 'ChipSet',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      #container
      [class]="containerClasses()"
      [attr.role]="role()"
      [attr.aria-label]="ariaLabel() || 'Chip set'"
    >
      <ng-content></ng-content>
      
      @if (showOverflow() && hasOverflow() && !wrap()) {
        <div 
          [class]="overflowChipClasses()"
          [attr.aria-label]="getOverflowText()"
          [tooltip]="getOverflowTooltipText()"
          tooltipPosition="top"
          tooltipVariant="dark"
          [tooltipShowDelay]="200"
          [tooltipHideDelay]="100"
          role="status"
        >
          +{{ overflowCount() }}
        </div>
      }
    </div>
  `
})
export class ChipSetComponent implements AfterViewInit, AfterContentInit, OnDestroy {
  // ViewChild and ContentChildren for managing overflow
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @ContentChildren(ChipComponent) chipComponents!: QueryList<ChipComponent>;

  // Input signals
  readonly wrap = input<boolean>(true);
  readonly spacing = input<'xs' | 'sm' | 'md' | 'lg'>('sm');
  readonly maxVisible = input<number>(0);
  readonly showOverflow = input<boolean>(true);
  readonly role = input<string>('group');
  readonly ariaLabel = input<string>('');
  readonly customClass = input<string>('');

  // Internal state
  private readonly _overflowCount = signal<number>(0);
  private readonly _visibleChips = signal<ChipComponent[]>([]);
  private readonly _activeChipIndex = signal<number>(0);
  private isCalculating = false;

  // Computed properties
  readonly overflowCount = computed(() => this._overflowCount());
  readonly visibleChips = computed(() => this._visibleChips());
  readonly hasOverflow = computed(() => this.overflowCount() > 0);

  readonly containerClasses = computed(() => {
    const spacingClasses = {
      xs: 'gap-1',
      sm: 'gap-2', 
      md: 'gap-3',
      lg: 'gap-4'
    };

    return cn(
      'inline-flex items-center',
      this.wrap() ? 'flex-wrap' : 'flex-nowrap overflow-hidden',
      spacingClasses[this.spacing()],
      this.customClass()
    );
  });

  readonly overflowChipClasses = computed(() => {
    return cn(
      'inline-flex items-center px-2 py-1 text-xs font-medium relative group cursor-help',
      'bg-gray-100 text-gray-700 rounded-md',
      'dark:bg-gray-800 dark:text-gray-300',
      'border border-gray-200 dark:border-gray-700',
      'hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200',
      'hover:scale-105 active:scale-95 transform-gpu'
    );
  });

  constructor() {
    // Set up roving tabindex management
    effect(() => {
      const chips = this.chipComponents?.toArray();
      const activeIndex = this._activeChipIndex();
      if (chips && chips.length > 0) {
        chips.forEach((chip, index) => {
          chip.setTabbable(index === activeIndex);
        });
      }
    });
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const chips = this.chipComponents.toArray();
    if (!chips.length) return;

    let newIndex = this._activeChipIndex();

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      newIndex = (newIndex + 1) % chips.length;
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      newIndex = (newIndex - 1 + chips.length) % chips.length;
    } else if (event.key === 'Home') {
      event.preventDefault();
      newIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      newIndex = chips.length - 1;
    }

    if (newIndex !== this._activeChipIndex()) {
      this._activeChipIndex.set(newIndex);
      chips[newIndex].focus(); // Focus the new active chip
    }
  }

  ngAfterViewInit() {
    // Initial calculation after view is fully initialized
    setTimeout(() => {
      this.calculateOverflow();
    }, 100); // Small delay for initial calculation
  }

  ngAfterContentInit() {
    // Watch for changes in chip elements
    this.chipComponents.changes.subscribe(() => {
      setTimeout(() => {
        this.calculateOverflow();
      }, 0);
    });
  }

  ngOnDestroy() {
    // Cleanup handled automatically by signals
  }

  private calculateOverflow() {
    // Prevent multiple simultaneous calculations
    if (this.isCalculating) {
      return;
    }

    if (!this.container || !this.chipComponents) {
      return;
    }

    this.isCalculating = true;

    try {
      const chipComponentsArray = this.chipComponents.toArray();
      
      // If wrapping is enabled, no overflow logic is needed
      if (this.wrap()) {
        this.updateChipVisibility(chipComponentsArray, 0);
        return;
      }

      // If maxVisible is set, use item count-based overflow
      if (this.maxVisible() > 0) {
        const maxVisible = this.maxVisible();
        const visibleCount = Math.min(maxVisible, chipComponentsArray.length);
        const overflowCount = Math.max(0, chipComponentsArray.length - visibleCount);
        
        this.updateChipVisibility(chipComponentsArray, overflowCount);
        return;
      }

      // For width-based responsive overflow without maxVisible, show all chips
      // This prevents the infinite loop issue while maintaining functionality
      this.updateChipVisibility(chipComponentsArray, 0);
    } finally {
      this.isCalculating = false;
    }
  }

  private getSpacingValue(): number {
    const spacingMap = {
      xs: 4,  // gap-1
      sm: 8,  // gap-2
      md: 12, // gap-3
      lg: 16  // gap-4
    };
    return spacingMap[this.spacing()];
  }

  private updateChipVisibility(chipComponentsArray: ChipComponent[], overflowCount: number) {
    const visibleCount = chipComponentsArray.length - overflowCount;
    
    // Update signals
    this._overflowCount.set(overflowCount);
    this._visibleChips.set(chipComponentsArray.slice(0, visibleCount));

    // Update DOM visibility efficiently
    chipComponentsArray.forEach((chip, index) => {
      if (chip.chipElement?.nativeElement) {
        const shouldShow = index < visibleCount;
        const currentDisplay = chip.chipElement.nativeElement.style.display;
        const targetDisplay = shouldShow ? '' : 'none';
        
        // Only modify DOM if display state needs to change
        if (currentDisplay !== targetDisplay) {
          chip.chipElement.nativeElement.style.display = targetDisplay;
        }
      }
    });
  }

  /**
   * Get overflow text for accessibility
   */
  getOverflowText(): string {
    const count = this.overflowCount();
    return count === 1 ? `+${count} more item` : `+${count} more items`;
  }

  /**
   * Get tooltip text for overflow indicator
   */
  getOverflowTooltipText(): string {
    const hiddenChips = this.getHiddenChips();
    const chipTexts = hiddenChips.map(chip => chip.label() || this.getChipTextContent(chip));
    const count = this.overflowCount();
    
    if (chipTexts.length === 0) {
      return `${count} hidden item${count === 1 ? '' : 's'}`;
    }
    
    // Format as a clean list for better readability
    const formattedList = chipTexts.join(' • ');
    return `Hidden (${count}): ${formattedList}`;
  }

  /**
   * Get the chips that are currently hidden due to overflow
   */
  getHiddenChips(): ChipComponent[] {
    const allChips = this.chipComponents?.toArray() || [];
    const visibleChips = this.visibleChips();
    
    // Return chips that are not in the visible list
    return allChips.filter(chip => !visibleChips.includes(chip));
  }

  /**
   * Extract text content from a chip component
   * This is used to display chip content in the tooltip
   */
  getChipTextContent(chip: ChipComponent): string {
    // If chip has a label, use that
    if (chip.label()) {
      return chip.label();
    }
    
    // Otherwise, try to get text content from the chip element
    if (chip.chipElement?.nativeElement) {
      const element = chip.chipElement.nativeElement;
      // Get the text content from the chip label span
      const labelSpan = element.querySelector('span.truncate');
      if (labelSpan && labelSpan.textContent) {
        return labelSpan.textContent.trim();
      }
      // Fallback to element text content
      return element.textContent?.trim() || 'Chip';
    }
    
    return 'Chip';
  }
}

// Export variants for external use
export { chipVariants, removeButtonVariants, chipAvatarVariants };
