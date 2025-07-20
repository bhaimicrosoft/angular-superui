import { Component, Input, Output, EventEmitter, signal, computed, Injectable, inject, forwardRef, ViewChild, ElementRef, HostListener, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../utils/cn';

// ComboBox Service for managing state and options
@Injectable()
export class ComboboxService {
  private _isOpen = signal(false);
  private _selectedValue = signal<string | null>(null);
  private _selectedLabel = signal<string>('');
  private _searchQuery = signal<string>('');
  private _highlightedIndex = signal<number>(-1);
  private _options = signal<ComboboxOption[]>([]);
  private _loading = signal(false);
  private _error = signal<string>('');
  private _selectedValues = signal<string[]>([]);  // For multi-select

  // Public signals
  readonly isOpen = this._isOpen.asReadonly();
  readonly selectedValue = this._selectedValue.asReadonly();
  readonly selectedLabel = this._selectedLabel.asReadonly();
  readonly searchQuery = this._searchQuery.asReadonly();
  readonly highlightedIndex = this._highlightedIndex.asReadonly();
  readonly options = this._options.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly selectedValues = this._selectedValues.asReadonly();

  // Computed filtered options
  readonly filteredOptions = computed(() => {
    const query = this._searchQuery().toLowerCase();
    if (!query) return this._options();
    return this._options().filter(option =>
      option.label.toLowerCase().includes(query) ||
      option.value.toLowerCase().includes(query) ||
      (option.description && option.description.toLowerCase().includes(query))
    );
  });

  // Computed selected options for multi-select display
  readonly selectedOptions = computed(() => {
    const selectedValues = this._selectedValues();
    const options = this._options();
    return selectedValues.map(value =>
      options.find(opt => opt.value === value)
    ).filter(Boolean) as ComboboxOption[];
  });

  // Computed grouped options
  readonly groupedOptions = computed(() => {
    const options = this.filteredOptions();
    const grouped = new Map<string, ComboboxOption[]>();

    options.forEach(option => {
      const group = option.group || 'default';
      if (!grouped.has(group)) {
        grouped.set(group, []);
      }
      grouped.get(group)!.push(option);
    });

    return grouped;
  });

  // Methods
  setOptions(options: ComboboxOption[]) {
    this._options.set(options);
  }

  setLoading(loading: boolean) {
    this._loading.set(loading);
  }

  setError(error: string) {
    this._error.set(error);
  }

  clearError() {
    this._error.set('');
  }

  open() {
    this._isOpen.set(true);
    this._highlightedIndex.set(-1);
  }

  close() {
    this._isOpen.set(false);
    this._highlightedIndex.set(-1);
  }

  toggle() {
    this._isOpen() ? this.close() : this.open();
  }

  setSearchQuery(query: string) {
    this._searchQuery.set(query);
    this._highlightedIndex.set(-1);
  }

  selectOption(option: ComboboxOption, isMultiple: boolean = false) {
    if (isMultiple) {
      const currentValues = this._selectedValues();
      const valueExists = currentValues.includes(option.value);

      if (valueExists) {
        // Remove from selection
        const newValues = currentValues.filter(v => v !== option.value);
        this._selectedValues.set(newValues);
        this.onValueChangeCallback?.(newValues);
      } else {
        // Add to selection
        const newValues = [...currentValues, option.value];
        this._selectedValues.set(newValues);
        this.onValueChangeCallback?.(newValues);
      }
    } else {
      this._selectedValue.set(option.value);
      this._selectedLabel.set(option.label);
      this._searchQuery.set('');
      this.close();

      // Notify value change
      this.onValueChangeCallback?.(option.value);
    }
  }

  selectByValue(value: string) {
    const option = this._options().find(opt => opt.value === value);
    if (option) {
      this.selectOption(option);
    }
  }

  setMultipleValues(values: string[]) {
    this._selectedValues.set(values);
    // Set the display to show count for multiple values
    if (values.length > 0) {
      this._selectedLabel.set(`${values.length} selected`);
    } else {
      this._selectedLabel.set('');
    }
  }

  removeFromSelection(value: string) {
    const currentValues = this._selectedValues();
    const newValues = currentValues.filter(v => v !== value);
    this._selectedValues.set(newValues);

    // Update display label
    if (newValues.length > 0) {
      this._selectedLabel.set(`${newValues.length} selected`);
    } else {
      this._selectedLabel.set('');
    }

    // Notify value change
    this.onValueChangeCallback?.(newValues);
  }

  clearSelection() {
    this._selectedValue.set(null);
    this._selectedLabel.set('');
    this._searchQuery.set('');

    // Notify value change
    this.onValueChangeCallback?.(null);
  }

  // Callback for value changes
  private onValueChangeCallback?: (value: string | string[] | null) => void;

  setValueChangeCallback(callback: (value: string | string[] | null) => void) {
    this.onValueChangeCallback = callback;
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
    const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    this._highlightedIndex.set(nextIndex);
  }

  highlightPrevious() {
    const currentIndex = this._highlightedIndex();
    const maxIndex = this.filteredOptions().length - 1;
    const prevIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    this._highlightedIndex.set(prevIndex);
  }

  selectHighlighted() {
    const highlightedIndex = this._highlightedIndex();
    const filteredOptions = this.filteredOptions();
    if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
      this.selectOption(filteredOptions[highlightedIndex]);
    }
  }
}

// ComboBox Option interface
export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string; // For enhanced accessibility
  group?: string; // For option grouping
}

// Main ComboBox Component
@Component({
  selector: 'Combobox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    ComboboxService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Combobox),
      multi: true
    }
  ],
  template: `
    <div
      class="relative w-full"
      [class]="cn('combobox', className)"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class Combobox implements ControlValueAccessor, OnInit, OnChanges {
  @Input() className: string = '';
  @Input() placeholder: string = 'Select an option...';
  @Input() searchPlaceholder: string = 'Search...';
  @Input() disabled: boolean = false;
  @Input() options: ComboboxOption[] = [];
  @Input() emptyMessage: string = 'No options found.';
  @Input() clearable: boolean = true;
  @Input() ariaLabel: string = '';
  @Input() ariaLabelledBy: string = '';
  @Input() ariaDescribedBy: string = '';
  @Input() required: boolean = false;

  // Phase 1: Core improvements
  @Input() multiple: boolean = false;
  @Input() maxSelections?: number;
  @Input() loadingState: boolean = false;
  @Input() loadingMessage: string = 'Loading options...';
  @Input() error: string = '';
  @Input() validationState: 'valid' | 'invalid' | 'pending' = 'valid';

  // Phase 2: Advanced features
  @Input() groupBy?: string;
  @Input() showGroupLabels: boolean = true;
  @Input() autoComplete: boolean = false;
  @Input() debounceTime: number = 300;

  @Output() valueChange = new EventEmitter<string | string[] | null>();
  @Output() openChange = new EventEmitter<boolean>();
  @Output() searchChange = new EventEmitter<string>();

  protected comboboxService = inject(ComboboxService);
  protected cn = cn;

  // Form control methods
  private onChange = (value: string | string[] | null) => {};
  private onTouched = () => {};

  ngOnInit() {
    this.comboboxService.setOptions(this.options);
    this.comboboxService.setLoading(this.loadingState);
    this.comboboxService.setError(this.error);

    // Set up value change callback
    this.comboboxService.setValueChangeCallback((value: string | string[] | null) => {
      this.onValueChange(value);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] && !changes['options'].firstChange) {
      this.comboboxService.setOptions(this.options);
    }
    if (changes['loadingState'] && !changes['loadingState'].firstChange) {
      this.comboboxService.setLoading(this.loadingState);
    }
    if (changes['error'] && !changes['error'].firstChange) {
      this.comboboxService.setError(this.error);
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: string | string[] | null): void {
    if (value) {
      if (Array.isArray(value)) {
        this.comboboxService.setMultipleValues(value);
      } else {
        this.comboboxService.selectByValue(value);
      }
    } else {
      this.comboboxService.clearSelection();
    }
  }

  registerOnChange(fn: (value: string | string[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Public methods for child components
  get service() {
    return this.comboboxService;
  }

  onValueChange(value: string | string[] | null) {
    this.onChange(value);
    this.valueChange.emit(value);
  }

  onOpenChange(isOpen: boolean) {
    this.openChange.emit(isOpen);
  }

  onSearchChange(query: string) {
    this.searchChange.emit(query);
  }
}

// ComboBox Trigger Component
@Component({
  selector: 'ComboboxTrigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      #triggerButton
      type="button"
      role="combobox"
      [attr.aria-expanded]="comboboxService.isOpen()"
      [attr.aria-haspopup]="'listbox'"
      [attr.aria-controls]="contentId"
      [attr.aria-label]="ariaLabel"
      [attr.aria-labelledby]="ariaLabelledBy"
      [attr.aria-describedby]="ariaDescribedBy"
      [attr.aria-required]="required"
      [attr.aria-invalid]="false"
      [disabled]="disabled"
      [class]="cn(
        'flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        !comboboxService.selectedLabel() && 'text-muted-foreground',
        multiple && comboboxService.selectedOptions().length > 0 && 'h-auto py-1',
        className
      )"
      (click)="handleClick()"
      (keydown)="handleKeydown($event)"
    >
      <!-- Multi-select chips display -->
      <div
        *ngIf="multiple && comboboxService.selectedOptions().length > 0"
        class="flex flex-wrap gap-1 items-center flex-1 mr-2"
      >
        <div
          *ngFor="let option of comboboxService.selectedOptions(); trackBy: trackByValue"
          class="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
        >
          <span>{{ option.label }}</span>
          <button
            type="button"
            class="ml-1 h-3 w-3 inline-flex items-center justify-center rounded-full hover:bg-secondary-foreground/20 focus:outline-none focus:ring-1 focus:ring-ring"
            [attr.aria-label]="'Remove ' + option.label"
            (click)="removeChip($event, option.value)"
          >
            <svg class="h-2 w-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <!-- Show placeholder when no chips -->
        <span
          *ngIf="comboboxService.selectedOptions().length === 0"
          class="truncate text-muted-foreground"
        >
          {{ placeholder }}
        </span>
      </div>

      <!-- Single select display -->
      <span
        *ngIf="!multiple"
        class="truncate flex-1"
      >
        {{ comboboxService.selectedLabel() || placeholder }}
      </span>

      <!-- Placeholder for multi-select when no selections -->
      <span
        *ngIf="multiple && comboboxService.selectedOptions().length === 0"
        class="truncate flex-1 text-muted-foreground"
      >
        {{ placeholder }}
      </span>

      <svg
        class="ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200"
        [class.rotate-180]="comboboxService.isOpen()"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
  `
})
export class ComboboxTrigger {
  @Input() className: string = '';
  @Input() placeholder: string = 'Select an option...';
  @Input() disabled: boolean = false;
  @Input() contentId: string = 'combobox-content';
  @Input() ariaLabel: string = '';
  @Input() ariaLabelledBy: string = '';
  @Input() ariaDescribedBy: string = '';
  @Input() required: boolean = false;
  @Input() multiple: boolean = false;

  @ViewChild('triggerButton', { read: ElementRef }) triggerElement?: ElementRef;

  protected comboboxService = inject(ComboboxService);
  private combobox = inject(Combobox);
  protected cn = cn;

  trackByValue(index: number, option: ComboboxOption): string {
    return option.value;
  }

  removeChip(event: Event, value: string) {
    event.stopPropagation(); // Prevent triggering the main button click
    this.comboboxService.removeFromSelection(value);
  }

  handleClick() {
    if (this.disabled) return;

    this.comboboxService.toggle();
    this.combobox.onOpenChange(this.comboboxService.isOpen());
  }

  handleKeydown(event: KeyboardEvent) {
    if (this.disabled) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.comboboxService.isOpen()) {
          this.comboboxService.open();
          this.combobox.onOpenChange(true);
        } else {
          this.comboboxService.highlightNext();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.comboboxService.isOpen()) {
          this.comboboxService.highlightPrevious();
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.comboboxService.isOpen()) {
          this.comboboxService.selectHighlighted();
          // The service will handle the value change callback
        } else {
          this.comboboxService.open();
          this.combobox.onOpenChange(true);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.comboboxService.close();
        this.combobox.onOpenChange(false);
        break;
    }
  }

  focus() {
    this.triggerElement?.nativeElement.focus();
  }
}

// ComboBox Content Component
@Component({
  selector: 'ComboboxContent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      *ngIf="comboboxService.isOpen()"
      [id]="contentId"
      role="listbox"
      [attr.aria-labelledby]="triggerId"
      [class]="cn(
        'absolute z-50 top-full mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95',
        className
      )"
      (keydown)="handleKeydown($event)"
    >
      <!-- Search Input -->
      <div class="flex items-center border-b px-3" *ngIf="searchable">
        <svg class="mr-2 h-4 w-4 shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          #searchInput
          type="text"
          role="searchbox"
          [attr.aria-label]="'Search ' + searchPlaceholder"
          [attr.aria-activedescendant]="getActiveDescendant()"
          class="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          [placeholder]="searchPlaceholder"
          [value]="comboboxService.searchQuery()"
          (input)="handleSearchInput($event)"
          (keydown)="handleSearchKeydown($event)"
        />
      </div>

      <!-- Options List -->
      <div class="max-h-60 overflow-auto p-1">
        <!-- Loading State -->
        <div *ngIf="comboboxService.loading()" class="flex items-center justify-center py-6">
          <div class="flex items-center space-x-2">
            <div class="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            <span class="text-sm text-muted-foreground">{{ loadingMessage }}</span>
          </div>
        </div>

        <!-- Error State -->
        <div *ngIf="comboboxService.error()" class="py-6 px-3">
          <div class="flex items-center space-x-2 text-red-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <span class="text-sm">{{ comboboxService.error() }}</span>
          </div>
        </div>

        <!-- Grouped Options -->
        <div *ngIf="!comboboxService.loading() && !comboboxService.error() && showGroupLabels && comboboxService.groupedOptions().size > 1">
          <div *ngFor="let group of comboboxService.groupedOptions() | keyvalue" class="mb-2">
            <div *ngIf="group.key !== 'default'" class="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {{ group.key }}
            </div>
            <div
              *ngFor="let option of group.value; let i = index"
              role="option"
              [id]="'option-' + getOptionIndex(option)"
              [attr.aria-selected]="isSelected(option)"
              [attr.aria-disabled]="option.disabled"
              [class]="cn(
                'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
                'hover:bg-accent hover:text-accent-foreground',
                'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                isSelected(option) && 'bg-accent text-accent-foreground',
                isHighlighted(option) && 'bg-accent text-accent-foreground',
                option.disabled && 'pointer-events-none opacity-50'
              )"
              (click)="selectOption(option)"
              (mouseenter)="highlightOption(option)"
            >
              <svg
                *ngIf="isSelected(option)"
                class="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div class="flex-1">
                <span class="truncate">{{ option.label }}</span>
                <div *ngIf="option.description" class="text-xs text-muted-foreground mt-1">
                  {{ option.description }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Simple Options (No Grouping) -->
        <div *ngIf="!comboboxService.loading() && !comboboxService.error() && (!showGroupLabels || comboboxService.groupedOptions().size <= 1)">
          <div
            *ngFor="let option of comboboxService.filteredOptions(); let i = index"
            role="option"
            [id]="'option-' + i"
            [attr.aria-selected]="isSelected(option)"
            [attr.aria-disabled]="option.disabled"
            [class]="cn(
              'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
              isSelected(option) && 'bg-accent text-accent-foreground',
              comboboxService.highlightedIndex() === i && 'bg-accent text-accent-foreground',
              option.disabled && 'pointer-events-none opacity-50'
            )"
            (click)="selectOption(option)"
            (mouseenter)="comboboxService.highlightOption(i)"
          >
            <svg
              *ngIf="isSelected(option)"
              class="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <div class="flex-1">
              <span class="truncate">{{ option.label }}</span>
              <div *ngIf="option.description" class="text-xs text-muted-foreground mt-1">
                {{ option.description }}
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          *ngIf="!comboboxService.loading() && !comboboxService.error() && comboboxService.filteredOptions().length === 0"
          class="py-6 text-center text-sm text-muted-foreground"
        >
          {{ emptyMessage }}
        </div>
      </div>
    </div>
  `
})
export class ComboboxContent implements OnInit {
  @Input() className: string = '';
  @Input() contentId: string = 'combobox-content';
  @Input() triggerId: string = 'combobox-trigger';
  @Input() searchable: boolean = true;
  @Input() searchPlaceholder: string = 'Search...';
  @Input() emptyMessage: string = 'No options found.';
  @Input() loadingMessage: string = 'Loading options...';
  @Input() showGroupLabels: boolean = true;
  @Input() multiple: boolean = false;

  @ViewChild('searchInput', { read: ElementRef }) searchInput?: ElementRef;

  protected comboboxService = inject(ComboboxService);
  private combobox = inject(Combobox);
  protected cn = cn;

  ngOnInit() {
    // Focus search input when content opens
    if (this.searchable) {
      setTimeout(() => {
        this.searchInput?.nativeElement.focus();
      });
    }
  }

  handleSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.comboboxService.setSearchQuery(target.value);
    this.combobox.onSearchChange(target.value);
  }

  handleSearchKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.comboboxService.highlightNext();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.comboboxService.highlightPrevious();
        break;
      case 'Enter':
        event.preventDefault();
        this.comboboxService.selectHighlighted();
        // The service will handle the value change callback
        break;
      case 'Escape':
        event.preventDefault();
        this.comboboxService.close();
        this.combobox.onOpenChange(false);
        break;
    }
  }

  handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.comboboxService.close();
        this.combobox.onOpenChange(false);
        break;
    }
  }

  selectOption(option: ComboboxOption) {
    if (option.disabled) return;

    this.comboboxService.selectOption(option, this.multiple);
    // The service will handle the value change callback
  }

  getActiveDescendant(): string {
    const highlightedIndex = this.comboboxService.highlightedIndex();
    return highlightedIndex >= 0 ? `option-${highlightedIndex}` : '';
  }

  isSelected(option: ComboboxOption): boolean {
    if (this.multiple) {
      return this.comboboxService.selectedValues().includes(option.value);
    } else {
      return this.comboboxService.selectedValue() === option.value;
    }
  }

  isHighlighted(option: ComboboxOption): boolean {
    const highlightedIndex = this.comboboxService.highlightedIndex();
    const filteredOptions = this.comboboxService.filteredOptions();
    return filteredOptions[highlightedIndex] === option;
  }

  highlightOption(option: ComboboxOption): void {
    const filteredOptions = this.comboboxService.filteredOptions();
    const index = filteredOptions.indexOf(option);
    if (index >= 0) {
      this.comboboxService.highlightOption(index);
    }
  }

  getOptionIndex(option: ComboboxOption): number {
    return this.comboboxService.filteredOptions().indexOf(option);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('Combobox')) {
      this.comboboxService.close();
      this.combobox.onOpenChange(false);
    }
  }
}

// ComboBox Empty Component
@Component({
  selector: 'ComboboxEmpty',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="py-6 text-center text-sm"
      [class]="cn('text-muted-foreground', className)"
    >
      <ng-content>{{ defaultMessage }}</ng-content>
    </div>
  `
})
export class ComboboxEmpty {
  @Input() className: string = '';
  @Input() defaultMessage: string = 'No options found.';

  protected cn = cn;
}
