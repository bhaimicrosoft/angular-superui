import {
  Component,
  computed,
  input,
  output,
  signal,
  effect,
  forwardRef,
  ViewChild,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy,
  Injectable,
  inject,
  ViewContainerRef,
  TemplateRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {
  Overlay,
  OverlayRef,
  OverlayPositionBuilder,
  ConnectedPosition,
  FlexibleConnectedPositionStrategy
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { cn } from '../../utils/cn';

/**
 * Select option interface
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
  group?: string;
  icon?: string; // For custom icons
}

/**
 * Select configuration interface for enhanced customization
 */
export interface SelectConfig {
  allowClear?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  noOptionsText?: string;
  clearText?: string;
  maxHeight?: string;
  placement?: 'bottom' | 'top' | 'auto';
  customClasses?: {
    trigger?: string;
    content?: string;
    item?: string;
    searchInput?: string;
  };
}

/**
 * Select component variants using Class Variance Authority
 */
const selectVariants = cva(
  [
    'flex w-full items-center justify-between rounded-md border border-input bg-background text-sm',
    'ring-offset-background placeholder:text-muted-foreground',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-all duration-200 ease-in-out cursor-pointer',
    'hover:border-ring/30 data-[open=true]:ring-2 data-[open=true]:ring-ring data-[open=true]:ring-offset-2',
    // Responsive improvements
    'min-w-0 max-w-full',
    // Touch-friendly on mobile
    'touch-manipulation select-none'
  ],
  {
    variants: {
      variant: {
        default: '',
        destructive: [
          'border-destructive/50 text-destructive',
          'focus:ring-destructive focus:border-destructive',
          'hover:border-destructive/70'
        ],
        success: [
          'border-success/50 text-success',
          'focus:ring-success focus:border-success',
          'hover:border-success/70'
        ],
        warning: [
          'border-warning/50 text-warning',
          'focus:ring-warning focus:border-warning',
          'hover:border-warning/70'
        ]
      },
      size: {
        xs: 'h-7 px-2 py-1 text-xs',
        sm: 'h-8 px-2.5 py-1.5 text-xs',
        default: 'h-10 px-3 py-2',
        lg: 'h-11 px-4 py-3 text-base',
        xl: 'h-12 px-5 py-3.5 text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const selectContentVariants = cva(
  [
    'z-50 min-w-[8rem] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
    'opacity-100 scale-100 transform-gpu',
    'animate-in fade-in-0 zoom-in-95 duration-200',
    // Responsive improvements
    'max-w-[calc(100vw-2rem)] max-h-[50vh] sm:max-h-96',
    // Better mobile experience
    'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2'
  ],
  {
    variants: {
      variant: {
        default: '',
        destructive: [
          'border-destructive/20'
        ],
        success: [
          'border-success/20'
        ],
        warning: [
          'border-warning/20'
        ]
      },
      size: {
        xs: 'text-xs',
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const selectItemVariants = cva(
  [
    'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
    'focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    'hover:bg-accent hover:text-accent-foreground transition-colors duration-150',
    // Better accessibility
    'aria-selected:bg-accent aria-selected:text-accent-foreground',
    // Touch-friendly
    'touch-manipulation min-h-[2.25rem] sm:min-h-[1.75rem]',
    // Responsive text
    'text-sm sm:text-xs md:text-sm'
  ],
  {
    variants: {
      highlighted: {
        true: 'bg-accent text-accent-foreground ring-2 ring-ring ring-opacity-50',
        false: ''
      },
      size: {
        xs: 'py-1 text-xs min-h-[1.5rem]',
        sm: 'py-1.5 text-xs min-h-[1.75rem]',
        default: 'py-1.5 text-sm min-h-[2rem]',
        lg: 'py-2 text-base min-h-[2.5rem]',
        xl: 'py-2.5 text-lg min-h-[3rem]'
      }
    },
    defaultVariants: {
      highlighted: false,
      size: 'default'
    }
  }
);

export type SelectVariant = VariantProps<typeof selectVariants>;
export type SelectSize = SelectVariant['size'];

/**
 * Select Service for managing dropdown state
 */
@Injectable()
export class SelectService {
  private _isOpen = signal(false);
  private _selectedValue = signal<string | null>(null);
  private _selectedOption = signal<SelectOption | null>(null);
  private _highlightedIndex = signal(-1);
  private _options = signal<SelectOption[]>([]);
  private _searchQuery = signal('');
  private _allowClear = signal(false);
  private _clearOption = signal<SelectOption | null>(null);

  // Public readonly signals
  readonly isOpen = this._isOpen.asReadonly();
  readonly selectedValue = this._selectedValue.asReadonly();
  readonly selectedOption = this._selectedOption.asReadonly();
  readonly highlightedIndex = this._highlightedIndex.asReadonly();
  readonly options = this._options.asReadonly();
  readonly searchQuery = this._searchQuery.asReadonly();
  readonly allowClear = this._allowClear.asReadonly();
  readonly clearOption = this._clearOption.asReadonly();

  // Computed filtered options with clear option
  readonly filteredOptions = computed(() => {
    const query = this._searchQuery().toLowerCase();
    let options = this._options();

    // Filter by search query
    if (query) {
      options = options.filter(option =>
        option.label.toLowerCase().includes(query) ||
        option.value.toLowerCase().includes(query) ||
        (option.description && option.description.toLowerCase().includes(query))
      );
    }

    const resultOptions: SelectOption[] = [];

    // Add clear option if enabled and not searching
    if (this._allowClear() && !query && this._clearOption()) {
      resultOptions.push(this._clearOption()!);
    }

    // Add regular options
    resultOptions.push(...options);

    return resultOptions;
  });

  // Computed grouped options
  readonly groupedOptions = computed(() => {
    const options = this.filteredOptions();
    const grouped = new Map<string, SelectOption[]>();

    options.forEach(option => {
      const group = option.group || 'default';
      if (!grouped.has(group)) {
        grouped.set(group, []);
      }
      grouped.get(group)!.push(option);
    });

    return grouped;
  });

  private onValueChangeCallback?: (value: string | null) => void;

  setOptions(options: SelectOption[]) {
    this._options.set(options);
  }

  setClearOption(enabled: boolean, clearText: string = 'Clear selection') {
    this._allowClear.set(enabled);
    if (enabled) {
      this._clearOption.set({
        value: '',
        label: clearText,
        description: 'Remove current selection'
      });
    } else {
      this._clearOption.set(null);
    }
  }

  open() {
    this._isOpen.set(true);
    this._highlightedIndex.set(-1);
  }

  close() {
    this._isOpen.set(false);
    this._highlightedIndex.set(-1);
    this._searchQuery.set('');
  }

  toggle() {
    this._isOpen() ? this.close() : this.open();
  }

  selectOption(option: SelectOption) {
    if (option.disabled) return;

    // Handle clear option selection (empty value)
    if (option.value === '' && this._allowClear() && option === this._clearOption()) {
      // Clear the selection
      this._selectedValue.set(null);
      this._selectedOption.set(null);
      this.close();
      this.onValueChangeCallback?.(null);
    } else {
      // Normal option selection
      this._selectedValue.set(option.value);
      this._selectedOption.set(option);
      this.close();
      this.onValueChangeCallback?.(option.value);
    }
  }

  selectByValue(value: string) {
    const option = this._options().find(opt => opt.value === value);
    if (option) {
      this._selectedValue.set(value);
      this._selectedOption.set(option);
    }
  }

  clearSelection() {
    this._selectedValue.set(null);
    this._selectedOption.set(null);
    this.onValueChangeCallback?.(null);
  }

  setSearchQuery(query: string) {
    this._searchQuery.set(query);
    this._highlightedIndex.set(-1);
  }

  highlightOption(index: number) {
    const maxIndex = this.filteredOptions().length - 1;
    if (index >= 0 && index <= maxIndex) {
      this._highlightedIndex.set(index);
    }
  }

  highlightNext() {
    const currentIndex = this._highlightedIndex();
    const maxIndex = this.filteredOptions().length - 1;

    if (maxIndex < 0) return; // No options available

    let nextIndex: number;
    if (currentIndex === -1) {
      // No current highlight, start with first option
      nextIndex = 0;
    } else {
      nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    }
    this._highlightedIndex.set(nextIndex);
  }

  highlightPrevious() {
    const currentIndex = this._highlightedIndex();
    const maxIndex = this.filteredOptions().length - 1;

    if (maxIndex < 0) return; // No options available

    let prevIndex: number;
    if (currentIndex === -1) {
      // No current highlight, start with last option
      prevIndex = maxIndex;
    } else {
      prevIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    }
    this._highlightedIndex.set(prevIndex);
  }

  selectHighlighted() {
    const highlightedIndex = this._highlightedIndex();
    const filteredOptions = this.filteredOptions();
    if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
      this.selectOption(filteredOptions[highlightedIndex]);
    }
  }

  setValueChangeCallback(callback: (value: string | null) => void) {
    this.onValueChangeCallback = callback;
  }

  // Missing methods for keyboard navigation and search
  handleKeyNavigation(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.highlightNext();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.highlightPrevious();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectHighlighted();
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'Home':
        event.preventDefault();
        this.highlightOption(0);
        break;
      case 'End':
        event.preventDefault();
        this.highlightOption(this.filteredOptions().length - 1);
        break;
    }
  }

  updateSearch(query: string) {
    this.setSearchQuery(query);
    // Reset highlighting when search changes
    if (this.filteredOptions().length > 0) {
      this.highlightOption(0);
    } else {
      this.highlightOption(-1);
    }
  }
}

/**
 * Select Item Component
 * Individual option in the dropdown
 */
@Component({
  selector: 'SelectItem',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      role="option"
      [attr.aria-selected]="isSelected()"
      [attr.aria-disabled]="option().disabled"
      [attr.data-disabled]="option().disabled"
      [attr.data-highlighted]="highlighted()"
      [attr.data-value]="option().value"
      [id]="itemId()"
      [class]="itemClasses()"
      (click)="handleSelect()"
      (mouseenter)="handleMouseEnter()"
      (mouseleave)="handleMouseLeave()">

      <!-- Check Icon (for selected item) -->
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center" aria-hidden="true">
        @if (isSelected()) {
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        }
      </span>

      <!-- Custom Icon (if provided) -->
      @if (option().icon && !isSelected()) {
        <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center" aria-hidden="true">
          <span [innerHTML]="option().icon"></span>
        </span>
      }

      <!-- Option Content -->
      <div class="flex flex-col min-w-0 flex-1">
        <span class="font-medium truncate" [attr.aria-label]="option().label">
          {{ option().label }}
        </span>
        @if (option().description) {
          <span class="text-xs text-muted-foreground truncate" [attr.aria-label]="option().description">
            {{ option().description }}
          </span>
        }
      </div>

      <!-- Clear option special styling -->
      @if (option().value === '' && selectService && selectService.clearOption() && option() === selectService.clearOption()) {
        <span class="ml-2 text-xs text-muted-foreground" aria-hidden="true">⌫</span>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectItem {
  // Inject SelectService - this will be provided by the parent SelectComponent
  readonly selectService = inject(SelectService, { optional: true });

  // Inputs
  readonly option = input.required<SelectOption>();
  readonly highlighted = input<boolean>(false);
  readonly customClass = input<string>('');
  readonly itemId = input<string>('');
  readonly size = input<SelectSize>('default');

  // Outputs
  readonly select = output<SelectOption>();
  readonly highlight = output<void>();

  // Computed properties
  readonly isSelected = computed(() => {
    if (!this.selectService) return false;
    return this.selectService.selectedValue() === this.option().value;
  });

  readonly itemClasses = computed(() => {
    const baseClasses = selectItemVariants({
      highlighted: this.highlighted(),
      size: this.size()
    });

    const customClasses = this.customClass();
    const disabledClasses = this.option().disabled ? 'opacity-50 cursor-not-allowed' : '';

    // Check if this is a clear option
    const clearOptionClasses = (this.option().value === '' && this.selectService &&
      this.selectService.clearOption() && this.option() === this.selectService.clearOption())
      ? 'border-t border-border mt-1 pt-2' : '';

    return cn(baseClasses, disabledClasses, clearOptionClasses, customClasses);
  });

  handleSelect() {
    if (!this.option().disabled) {
      this.select.emit(this.option());
    }
  }

  handleMouseEnter() {
    if (!this.option().disabled) {
      this.highlight.emit();
    }
  }

  handleMouseLeave() {
    // Optional: Could emit unhighlight event if needed
  }
}

/**
 * Select Trigger Component
 * The clickable element that opens the select dropdown
 */
@Component({
  selector: 'SelectTrigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      role="combobox"
      [attr.aria-expanded]="selectService ? selectService.isOpen() : false"
      [attr.aria-haspopup]="'listbox'"
      [attr.aria-controls]="triggerId() + '-content'"
      [attr.aria-describedby]="describedBy()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-invalid]="ariaInvalid()"
      [id]="triggerId()"
      [class]="triggerClasses()"
      [disabled]="disabled()"
      [attr.data-open]="selectService ? selectService.isOpen() : false"
      [attr.data-placeholder]="!selectService || !selectService.selectedOption()"
      (click)="selectService && selectService.toggle()"
      (keydown)="onKeyDown($event)"
      (focus)="onFocus()"
      (blur)="onBlur()">

      <span class="flex-1 text-left truncate min-w-0" [attr.aria-live]="'polite'">
        {{ displayText() }}
      </span>

      <!-- Clear button (if clearable and has value) -->
      @if (clearable() && selectService && selectService.selectedValue()) {
        <button
          type="button"
          class="flex items-center justify-center ml-1 p-1 rounded hover:bg-accent transition-colors"
          [attr.aria-label]="'Clear selection'"
          (click)="handleClear($event)"
          (keydown)="onClearKeyDown($event)">
          <svg
            class="h-3 w-3 opacity-50 hover:opacity-100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      }

      <!-- Dropdown Icon -->
      <div class="flex items-center justify-center ml-2 flex-shrink-0" aria-hidden="true">
        <svg
          class="h-4 w-4 opacity-50 transition-transform duration-200"
          [class.rotate-180]="selectService ? selectService.isOpen() : false"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectTrigger {
  // Inject SelectService - this will be provided by the parent SelectComponent
  readonly selectService = inject(SelectService, { optional: true });

  // Inputs
  readonly variant = input<SelectVariant['variant']>('default');
  readonly size = input<SelectVariant['size']>('default');
  readonly disabled = input<boolean>(false);
  readonly placeholder = input<string>('Select an option...');
  readonly customClass = input<string>('');
  readonly triggerId = input<string>('select-trigger');
  readonly clearable = input<boolean>(false);
  readonly ariaLabel = input<string>('');
  readonly ariaInvalid = input<boolean>(false);
  readonly describedBy = input<string>('');

  // Outputs
  readonly focus = output<void>();
  readonly blur = output<void>();
  readonly clear = output<void>();

  // Computed classes with custom class override support
  readonly triggerClasses = computed(() => {
    const baseClasses = selectVariants({
      variant: this.variant(),
      size: this.size()
    });

    const customClasses = this.customClass();

    // Custom classes take precedence over base classes
    return customClasses ? cn(baseClasses, customClasses) : baseClasses;
  });

  // Computed display text
  readonly displayText = computed(() => {
    if (!this.selectService) return this.placeholder();
    const selectedOption = this.selectService.selectedOption();
    return selectedOption ? selectedOption.label : this.placeholder();
  });

  onKeyDown(event: KeyboardEvent) {
    if (!this.selectService) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.selectService.isOpen()) {
          // If dropdown is open, select highlighted option
          this.selectService.selectHighlighted();
        } else {
          // If dropdown is closed, open it
          this.selectService.toggle();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.selectService.isOpen()) {
          this.selectService.open();
          // Initialize highlighting to first option
          setTimeout(() => {
            this.selectService!.highlightOption(0);
          }, 50);
        } else {
          this.selectService.highlightNext();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.selectService.isOpen()) {
          this.selectService.open();
          // Initialize highlighting to last option
          setTimeout(() => {
            const lastIndex = this.selectService!.filteredOptions().length - 1;
            this.selectService!.highlightOption(lastIndex);
          }, 50);
        } else {
          this.selectService.highlightPrevious();
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.selectService.close();
        break;
      case 'Home':
        if (this.selectService.isOpen()) {
          event.preventDefault();
          this.selectService.highlightOption(0);
        }
        break;
      case 'End':
        if (this.selectService.isOpen()) {
          event.preventDefault();
          const lastIndex = this.selectService.filteredOptions().length - 1;
          this.selectService.highlightOption(lastIndex);
        }
        break;
      case 'Tab':
        // When dropdown is open, prevent default tab behavior to enable option cycling
        if (this.selectService.isOpen()) {
          event.preventDefault();
          // Focus the dropdown content to enable Tab cycling through options
          // The SelectContent will handle the actual Tab cycling logic
          const contentElement = document.querySelector(`[id="${this.triggerId()}-content"]`) as HTMLElement;
          if (contentElement) {
            contentElement.focus();
            // If no option is highlighted, start with first option
            if (this.selectService.highlightedIndex() === -1 && this.selectService.filteredOptions().length > 0) {
              this.selectService.highlightOption(0);
            }
          }
        } else {
          // Normal tab navigation when dropdown is closed
          // Don't prevent default - allow tab to move to next focusable element
        }
        break;
    }
  }

  onFocus() {
    this.focus.emit();
  }

  onBlur() {
    this.blur.emit();
  }

  handleClear(event: Event) {
    if (!this.selectService) return;

    event.stopPropagation();
    this.selectService.clearSelection();
    this.clear.emit();
  }

  onClearKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      this.handleClear(event);
    }
  }
}

/**
 * Select Content Component
 * The dropdown container that holds the options
 */
@Component({
  selector: 'SelectContent',
  standalone: true,
  imports: [CommonModule, SelectItem],
  animations: [
    trigger('dropdownState', [
      state('closed', style({
        opacity: 0,
        transform: 'scale(0.95) translateY(-10px)',
        visibility: 'hidden'
      })),
      state('open', style({
        opacity: 1,
        transform: 'scale(1) translateY(0)',
        visibility: 'visible'
      })),
      transition('closed => open', [
        animate('150ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ]),
      transition('open => closed', [
        animate('100ms cubic-bezier(0.4, 0.0, 1, 1)')
      ])
    ])
  ],
  template: `
    <ng-template #dropdownTemplate>
      <div
        [id]="contentId() + '-content'"
        role="listbox"
        [attr.aria-labelledby]="contentId()"
        [attr.aria-multiselectable]="false"
        [attr.aria-orientation]="'vertical'"
        [class]="contentClasses()"
        [attr.data-state]="selectService ? (selectService.isOpen() ? 'open' : 'closed') : 'closed'"
        [attr.data-size]="size()"
        [@dropdownState]="selectService ? (selectService.isOpen() ? 'open' : 'closed') : 'closed'"
        class="w-full focus:outline-none"
        tabindex="0"
        #dropdownContent
        (keydown)="onKeyDown($event)"
        (focus)="onContentFocus()">

        <!-- Search Input (if enabled) -->
        @if (searchable()) {
          <div class="p-2 border-b border-border/50">
            <input
              #searchInput
              type="text"
              [class]="getSearchInputClasses()"
              [placeholder]="config().searchPlaceholder || 'Search options...'"
              [attr.aria-label]="'Search options'"
              [attr.aria-describedby]="contentId() + '-search-help'"
              [value]="selectService && selectService.searchQuery() || ''"
              (input)="onSearchInput($event)"
              (keydown)="onSearchKeyDown($event)">

            <!-- Screen reader help for search -->
            <div
              [id]="contentId() + '-search-help'"
              class="sr-only">
              Type to filter options. Use arrow keys to navigate.
            </div>
          </div>
        }

        <!-- Options List -->
        <div
          class="overflow-auto p-1"
          [style.max-height]="config().maxHeight || '15rem'"
          role="group"
          [attr.aria-label]="'Options'">

          @if (selectService && selectService.groupedOptions().size > 1) {
            <!-- Grouped Options -->
            @for (entry of selectService.groupedOptions() | keyvalue; track entry.key) {
              @if (entry.key !== 'default') {
                <div
                  class="px-2 py-1.5 text-sm font-semibold text-muted-foreground"
                  role="group"
                  [attr.aria-label]="entry.key">
                  {{ entry.key }}
                </div>
              }
              @for (option of entry.value; track option.value; let i = $index) {
                <SelectItem
                  [option]="option"
                  [highlighted]="isHighlighted(option)"
                  [size]="size()"
                  [itemId]="contentId() + '-option-' + i"
                  [customClass]="getItemCustomClass()"
                  (select)="selectService && selectService.selectOption(option)"
                  (highlight)="selectService && selectService.highlightOption(getOptionIndex(option))"
                />
              }
            }
          } @else {
            <!-- Simple Options List -->
            @for (option of selectService ? selectService.filteredOptions() : []; track option.value; let i = $index) {
              <SelectItem
                [option]="option"
                [highlighted]="selectService ? selectService.highlightedIndex() === i : false"
                [size]="size()"
                [itemId]="contentId() + '-option-' + i"
                [customClass]="getItemCustomClass()"
                (select)="selectService && selectService.selectOption(option)"
                (highlight)="selectService && selectService.highlightOption(i)"
              />
            }
          }

          <!-- No Options Found -->
          @if (selectService && selectService.filteredOptions().length === 0) {
            <div
              class="py-6 text-center text-sm text-muted-foreground"
              role="status"
              [attr.aria-live]="'polite'">
              {{ config().noOptionsText || 'No options found.' }}
            </div>
          }
        </div>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectContent implements AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInputRef?: ElementRef<HTMLInputElement>;
  @ViewChild('dropdownTemplate', { static: true }) dropdownTemplate!: TemplateRef<any>;
  @ViewChild('dropdownContent') dropdownContentRef?: ElementRef<HTMLDivElement>;

  // Inject SelectService - this will be provided by the parent SelectComponent
  readonly selectService = inject(SelectService, { optional: true });
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  // Inputs
  readonly searchable = input<boolean>(false);
  readonly customClass = input<string>('');
  readonly contentId = input<string>('select-content');
  readonly triggerElement = input<ElementRef | null>(null);
  readonly variant = input<SelectVariant['variant']>('default');
  readonly size = input<SelectVariant['size']>('default');
  readonly config = input<SelectConfig>({});

  // Overlay state
  private overlayRef?: OverlayRef;
  private portal?: TemplatePortal;

  // Computed classes with custom class override support
  readonly contentClasses = computed(() => {
    const baseClasses = selectContentVariants({
      variant: this.variant(),
      size: this.size()
    });

    const customClasses = this.customClass();
    const configMaxHeight = this.config().maxHeight;

    const heightClasses = configMaxHeight ? `max-h-[${configMaxHeight}]` : '';

    // Custom classes take precedence over base classes
    return customClasses ?
      cn(baseClasses, heightClasses, customClasses) :
      cn(baseClasses, heightClasses);
  });

  // Method to check if element is within this dropdown
  isWithinDropdown(element: Element): boolean {
    if (!this.overlayRef?.hasAttached()) return false;

    const overlayElement = this.overlayRef.overlayElement;
    return overlayElement ? overlayElement.contains(element) : false;
  }

  constructor() {
    // Effect to handle opening/closing
    effect(() => {
      if (!this.selectService) return;

      const isOpen = this.selectService.isOpen();
      if (isOpen) {
        this.openDropdown();
      } else {
        this.closeDropdown();
      }
    });

    // Effect to focus search input when content opens
    effect(() => {
      if (!this.selectService) return;

      if (this.selectService.isOpen() && this.searchable() && this.searchInputRef) {
        setTimeout(() => {
          this.searchInputRef?.nativeElement.focus();
        }, 100);
      } else if (this.selectService.isOpen() && !this.searchable() && this.dropdownContentRef) {
        // Focus the dropdown content if not searchable
        setTimeout(() => {
          this.dropdownContentRef?.nativeElement.focus();
        }, 100);
      }
    });
  }

  ngAfterViewInit() {
    this.portal = new TemplatePortal(this.dropdownTemplate, this.viewContainerRef);
  }

  ngOnDestroy() {
    this.closeDropdown();
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

  private openDropdown() {
    if (this.overlayRef?.hasAttached() || !this.portal) return;

    const triggerEl = this.triggerElement();

    if (!triggerEl) {
      return;
    }

    // Always create a fresh overlay to ensure proper positioning
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
    this.createOverlay(triggerEl);

    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.portal);
    }
  }

  private closeDropdown() {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    }
    // Don't dispose here to avoid recreating constantly
  }

  private createOverlay(triggerElement: ElementRef) {
    const positions: ConnectedPosition[] = [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetY: 4,
      },
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetY: -4,
      }
    ];

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(triggerElement)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false)
      .withDefaultOffsetY(4);

    // Get trigger width before creating overlay
    const triggerWidth = triggerElement.nativeElement.offsetWidth;

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      width: triggerWidth,
      minWidth: triggerWidth,
      maxHeight: 256,
      panelClass: 'select-overlay-panel'
    });

    // Close on backdrop click
    this.overlayRef.backdropClick().subscribe(() => {
      if (this.selectService) {
        this.selectService.close();
      }
    });
  }

  onSearchInput(event: Event) {
    if (!this.selectService) return;

    const target = event.target as HTMLInputElement;
    this.selectService.updateSearch(target.value);
  }

  onSearchKeyDown(event: KeyboardEvent) {
    if (!this.selectService) return;

    // Handle search input specific navigation
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.dropdownContentRef?.nativeElement.focus();
      this.selectService.handleKeyNavigation(event);
    } else if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift+Tab from search input should close dropdown and allow normal navigation
        this.selectService.close();
        // Don't prevent default to allow focus to move to previous element
      } else {
        // Tab from search input should move to dropdown content for option cycling
        event.preventDefault();
        this.dropdownContentRef?.nativeElement.focus();
        // Start highlighting from first option if nothing is highlighted
        if (this.selectService.highlightedIndex() === -1 && this.selectService.filteredOptions().length > 0) {
          this.selectService.highlightOption(0);
        }
      }
    } else if (event.key === 'Enter') {
      // Enter in search should select highlighted option if any
      event.preventDefault();
      if (this.selectService.highlightedIndex() >= 0) {
        this.selectService.selectHighlighted();
      }
    } else if (event.key === 'Escape') {
      // Escape should close the dropdown
      event.preventDefault();
      this.selectService.close();
    } else {
      // Handle other keys through service for consistency
      this.selectService.handleKeyNavigation(event);
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (!this.selectService) return;

    // Handle dropdown content navigation
    if (event.key === 'Tab') {
      // Always prevent default for Tab when we have focus on dropdown content
      event.preventDefault();

      const currentIndex = this.selectService.highlightedIndex();
      const maxIndex = this.selectService.filteredOptions().length - 1;

      // If no options available, close dropdown
      if (maxIndex < 0) {
        this.selectService.close();
        return;
      }

      if (event.shiftKey) {
        // Shift+Tab - go to previous option or close if at first
        if (currentIndex <= 0) {
          // At first option, close dropdown and allow normal tab navigation
          this.selectService.close();
          // Return focus to trigger and allow normal tab navigation
          setTimeout(() => {
            const triggerElement = this.triggerElement()?.nativeElement;
            if (triggerElement) {
              triggerElement.focus();
              // Simulate tab navigation to previous element
              const focusableElements = this.getFocusableElements();
              const currentTriggerIndex = focusableElements.indexOf(triggerElement);
              if (currentTriggerIndex > 0) {
                focusableElements[currentTriggerIndex - 1].focus();
              }
            }
          }, 0);
        } else {
          // Cycle to previous option
          this.selectService.highlightPrevious();
          this.scrollToHighlighted();
        }
      } else {
        // Tab - go to next option or close if at last
        if (currentIndex >= maxIndex) {
          // At last option, close dropdown and allow normal tab navigation
          this.selectService.close();
          // Return focus to trigger and allow normal tab navigation
          setTimeout(() => {
            const triggerElement = this.triggerElement()?.nativeElement;
            if (triggerElement) {
              triggerElement.focus();
              // Simulate tab navigation to next element
              const focusableElements = this.getFocusableElements();
              const currentTriggerIndex = focusableElements.indexOf(triggerElement);
              if (currentTriggerIndex < focusableElements.length - 1) {
                focusableElements[currentTriggerIndex + 1].focus();
              }
            }
          }, 0);
        } else {
          // If no option is highlighted, start with first option
          if (currentIndex === -1) {
            this.selectService.highlightOption(0);
          } else {
            // Cycle to next option
            this.selectService.highlightNext();
          }
          this.scrollToHighlighted();
        }
      }
    } else {
      // Handle other keys through service
      this.selectService.handleKeyNavigation(event);
      this.scrollToHighlighted();
    }
  }

  onContentFocus() {
    if (!this.selectService) return;

    // When dropdown content gets focus, ensure we have a highlighted option
    if (this.selectService.highlightedIndex() === -1 && this.selectService.filteredOptions().length > 0) {
      this.selectService.highlightOption(0);
    }
  }

  getSearchInputClasses(): string {
    const baseClasses = 'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring';
    const customClass = this.config().customClasses?.['searchInput'] || '';
    return `${baseClasses} ${customClass}`.trim();
  }

  getItemCustomClass(): string {
    return this.config().customClasses?.['item'] || '';
  }

  isHighlighted(option: SelectOption): boolean {
    if (!this.selectService) return false;

    const highlightedIndex = this.selectService.highlightedIndex();
    const optionIndex = this.getOptionIndex(option);
    return highlightedIndex === optionIndex;
  }

  getOptionIndex(option: SelectOption): number {
    if (!this.selectService) return -1;

    return this.selectService.filteredOptions().findIndex(opt => opt.value === option.value);
  }

  private scrollToHighlighted() {
    if (!this.selectService) return;

    const highlightedIndex = this.selectService.highlightedIndex();
    if (highlightedIndex === -1) return;

    // Find the highlighted option element
    setTimeout(() => {
      const optionElements = this.overlayRef?.overlayElement?.querySelectorAll('[role="option"]');
      if (optionElements && optionElements[highlightedIndex]) {
        optionElements[highlightedIndex].scrollIntoView({
          block: 'nearest',
          inline: 'nearest'
        });
      }
    }, 0);
  }

  private getFocusableElements(): HTMLElement[] {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    return Array.from(document.querySelectorAll(focusableSelectors)) as HTMLElement[];
  }
}

/**
 * Main Select Component
 * A form control for selecting a value from a set of options
 */
@Component({
  selector: 'SelectComponent',
  standalone: true,
  imports: [CommonModule, SelectTrigger, SelectContent],
  providers: [
    SelectService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  template: `
    <div
      class="relative w-full min-w-0"
      #selectContainer
      [attr.data-select-container]="selectId()">

      <!-- Hidden label for screen readers -->
      @if (srOnlyLabel()) {
        <label [for]="selectId()" class="sr-only">{{ srOnlyLabel() }}</label>
      }

      <!-- Error message (hidden but accessible) -->
      @if (errorMessage()) {
        <div
          [id]="selectId() + '-error'"
          class="sr-only"
          role="alert"
          aria-live="polite">
          {{ errorMessage() }}
        </div>
      }

      <!-- Help text (hidden but accessible) -->
      @if (helpText()) {
        <div
          [id]="selectId() + '-help'"
          class="sr-only">
          {{ helpText() }}
        </div>
      }

      <SelectTrigger
        #selectTrigger
        [variant]="variant()"
        [size]="size()"
        [disabled]="disabled()"
        [placeholder]="placeholder()"
        [customClass]="customClasses().trigger || triggerClass()"
        [triggerId]="selectId()"
        [clearable]="allowClear()"
        [ariaLabel]="ariaLabel()"
        [ariaInvalid]="!!errorMessage()"
        [describedBy]="getDescribedBy()"
        (focus)="onTriggerFocus()"
        (blur)="onTriggerBlur()"
        (clear)="onClearSelection()"
      />

      <SelectContent
        [searchable]="searchable()"
        [customClass]="customClasses().content || contentClass()"
        [contentId]="selectId()"
        [triggerElement]="selectTriggerRef()"
        [variant]="variant()"
        [size]="size()"
        [config]="config()"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('selectContainer') selectContainer?: ElementRef;
  @ViewChild('selectTrigger', { read: ElementRef }) selectTriggerElement?: ElementRef;
  @ViewChild(SelectContent) selectContent?: SelectContent;

  readonly selectService = inject(SelectService);

  // Core Inputs
  readonly options = input.required<SelectOption[]>();
  readonly variant = input<SelectVariant['variant']>('default');
  readonly size = input<SelectVariant['size']>('default');
  readonly disabled = input<boolean>(false);
  readonly placeholder = input<string>('Select an option...');
  readonly searchable = input<boolean>(false);
  readonly selectId = input<string>('select');

  // Customization Inputs
  readonly customClasses = input<{
    trigger?: string;
    content?: string;
    item?: string;
    searchInput?: string;
  }>({});
  readonly triggerClass = input<string>(''); // Deprecated: use customClasses.trigger
  readonly contentClass = input<string>(''); // Deprecated: use customClasses.content

  // Accessibility Inputs
  readonly ariaLabel = input<string>('');
  readonly srOnlyLabel = input<string>('');
  readonly errorMessage = input<string>('');
  readonly helpText = input<string>('');

  // Configuration Inputs
  readonly allowClear = input<boolean>(true); // Enable clear option by default
  readonly clearText = input<string>('Clear selection');
  readonly config = input<SelectConfig>({
    allowClear: false,
    placeholder: 'Select an option...',
    searchPlaceholder: 'Search options...',
    noOptionsText: 'No options found',
    clearText: 'Clear selection',
    maxHeight: '50vh',
    placement: 'auto'
  });

  // Outputs
  readonly valueChange = output<string | null>();
  readonly optionSelect = output<SelectOption>();
  readonly openChange = output<boolean>();
  readonly focus = output<void>();
  readonly blur = output<void>();
  readonly clear = output<void>();

  // Internal state
  private readonly _value = signal<string | null>(null);
  readonly selectTriggerRef = signal<ElementRef | null>(null);

  // ControlValueAccessor implementation
  private onChange = (value: string | null) => {};
  private onTouched = () => {};

  // Computed helper for describedBy
  readonly getDescribedBy = computed(() => {
    const parts: string[] = [];
    if (this.helpText()) parts.push(this.selectId() + '-help');
    if (this.errorMessage()) parts.push(this.selectId() + '-error');
    return parts.join(' ') || '';
  });

  constructor() {
    // Set up options when they change
    effect(() => {
      this.selectService.setOptions(this.options());
    });

    // Set up clear option when allowClear changes
    effect(() => {
      this.selectService.setClearOption(this.allowClear(), this.clearText());
    });

    // Set up value change callback
    effect(() => {
      this.selectService.setValueChangeCallback((value) => {
        this._value.set(value);
        this.onChange(value);
        this.onTouched();
        this.valueChange.emit(value);

        const selectedOption = this.selectService.selectedOption();
        if (selectedOption) {
          this.optionSelect.emit(selectedOption);
        }
      });
    });

    // Track open state changes
    effect(() => {
      const isOpen = this.selectService.isOpen();
      this.openChange.emit(isOpen);
    });

    // Update selected value when value changes
    effect(() => {
      const value = this._value();
      if (value !== null) {
        this.selectService.selectByValue(value);
      }
    });

    // Handle document click for better accessibility
    effect(() => {
      const isOpen = this.selectService.isOpen();
      if (isOpen) {
        const handleDocumentClick = (event: Event) => {
          const target = event.target as Element;
          const container = this.selectContainer?.nativeElement;
          const overlay = this.selectContent?.isWithinDropdown(target);

          if (!container?.contains(target) && !overlay) {
            this.selectService.close();
          }
        };

        document.addEventListener('click', handleDocumentClick);
        return () => document.removeEventListener('click', handleDocumentClick);
      }
      return () => {};
    });
  }

  ngAfterViewInit() {
    this.selectTriggerRef.set(this.selectTriggerElement || null);
  }

  // Event handlers
  onTriggerFocus() {
    this.focus.emit();
  }

  onTriggerBlur() {
    this.blur.emit();
  }

  onClearSelection() {
    this.clear.emit();
  }

  // ControlValueAccessor implementation
  writeValue(value: string | null): void {
    this._value.set(value);
    if (value) {
      this.selectService.selectByValue(value);
    } else {
      this.selectService.clearSelection();
    }
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handle disabled state if needed
  }

  // Public API methods
  open() {
    if (!this.disabled()) {
      this.selectService.open();
    }
  }

  close() {
    this.selectService.close();
  }

  toggle() {
    if (!this.disabled()) {
      this.selectService.toggle();
    }
  }

  focusTrigger() {
    this.selectTriggerElement?.nativeElement?.focus();
  }

  blurTrigger() {
    this.selectTriggerElement?.nativeElement?.blur();
  }
}

// Default export for easier importing
export default SelectComponent;
