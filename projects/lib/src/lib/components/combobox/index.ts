import { Component, Input, Output, EventEmitter, signal, computed, Injectable, inject, forwardRef, ViewChild, ElementRef, HostListener, OnInit, OnChanges, SimpleChanges, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../../utils/cn';

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  group?: string;
}

// ComboBox Service for managing state and options
@Injectable()
export class ComboboxService {
  private _isOpen = signal(false);
  private _selectedValue = signal<string | null>(null);
  private _selectedValues = signal<string[]>([]);
  private _selectedLabel = signal<string>('');
  private _searchQuery = signal<string>('');
  private _highlightedIndex = signal<number>(-1);
  private _options = signal<ComboboxOption[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string>('');
  private _multiple = signal<boolean>(false);

  // Computed values
  isOpen = this._isOpen.asReadonly();
  selectedValue = this._selectedValue.asReadonly();
  selectedValues = this._selectedValues.asReadonly();
  selectedLabel = this._selectedLabel.asReadonly();
  searchQuery = this._searchQuery.asReadonly();
  highlightedIndex = this._highlightedIndex.asReadonly();
  options = this._options.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();
  multiple = this._multiple.asReadonly();

  filteredOptions = computed(() => {
    const query = this._searchQuery().toLowerCase();
    if (!query) return this._options();
    
    return this._options().filter(option => 
      option.label.toLowerCase().includes(query) ||
      option.description?.toLowerCase().includes(query) ||
      option.value.toLowerCase().includes(query)
    );
  });

  groupedOptions = computed(() => {
    const filtered = this.filteredOptions();
    const grouped = new Map<string, ComboboxOption[]>();
    
    filtered.forEach(option => {
      const group = option.group || 'default';
      if (!grouped.has(group)) {
        grouped.set(group, []);
      }
      grouped.get(group)!.push(option);
    });
    
    return grouped;
  });

  // State management methods
  setOptions(options: ComboboxOption[]) {
    this._options.set(options);
  }

  setMultiple(multiple: boolean) {
    this._multiple.set(multiple);
  }

  setLoading(loading: boolean) {
    this._loading.set(loading);
  }

  setError(error: string) {
    this._error.set(error);
  }

  setSearchQuery(query: string) {
    this._searchQuery.set(query);
    this._highlightedIndex.set(-1);
  }

  open() {
    this._isOpen.set(true);
  }

  close() {
    this._isOpen.set(false);
    this._searchQuery.set('');
    this._highlightedIndex.set(-1);
  }

  toggle() {
    if (this._isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  selectByValue(value: string) {
    const option = this._options().find(opt => opt.value === value);
    if (option && !option.disabled) {
      if (this._multiple()) {
        const currentValues = this._selectedValues();
        if (!currentValues.includes(value)) {
          this._selectedValues.set([...currentValues, value]);
        }
      } else {
        this._selectedValue.set(value);
        this._selectedLabel.set(option.label);
        this.close();
      }
      this.onValueChangeCallback?.(this._multiple() ? this._selectedValues() : value);
    }
  }

  setMultipleValues(values: string[]) {
    this._selectedValues.set(values);
    const labels = values.map(value => 
      this._options().find(opt => opt.value === value)?.label || value
    );
    this._selectedLabel.set(labels.join(', '));
  }

  removeFromSelection(value: string) {
    if (this._multiple()) {
      const currentValues = this._selectedValues();
      const newValues = currentValues.filter(v => v !== value);
      this._selectedValues.set(newValues);
      this.onValueChangeCallback?.(newValues);
    }
  }

  clearSelection() {
    this._selectedValue.set(null);
    this._selectedValues.set([]);
    this._selectedLabel.set('');
    this.onValueChangeCallback?.(this._multiple() ? [] : null);
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
    const index = this._highlightedIndex();
    const option = this.filteredOptions()[index];
    if (option) {
      this.selectByValue(option.value);
    }
  }
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
    <div class="relative w-full" [class]="cn('combobox', className)">
      <!-- Custom Styled Select Container -->
      <div class="relative">
        <!-- Hidden Native Select for Accessibility -->
        <select
          #nativeSelect
          [multiple]="multiple"
          [disabled]="disabled"
          [attr.aria-label]="ariaLabel"
          [attr.aria-labelledby]="ariaLabelledBy"
          [attr.aria-describedby]="ariaDescribedBy"
          [attr.required]="required"
          class="sr-only"
          (change)="handleNativeSelectChange($event)"
          (focus)="handleNativeSelectFocus()"
          (blur)="handleNativeSelectBlur()"
        >
          <option *ngIf="!multiple" value="" [selected]="!comboboxService.selectedValue()">
            {{ placeholder }}
          </option>
          <optgroup *ngFor="let group of comboboxService.groupedOptions() | keyvalue" [label]="group.key === 'default' ? '' : group.key">
            <option
              *ngFor="let option of group.value"
              [value]="option.value"
              [disabled]="option.disabled"
              [selected]="isOptionSelected(option.value)"
            >
              {{ option.label }}
            </option>
          </optgroup>
        </select>

        <!-- Custom Trigger Button -->
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
          [disabled]="disabled"
          [class]="cn(
            'flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            !getDisplayText() && 'text-muted-foreground',
            className
          )"
          (click)="handleTriggerClick()"
          (keydown)="handleTriggerKeydown($event)"
        >
          <!-- Multiple Selection Display -->
          <div *ngIf="multiple && comboboxService.selectedValues().length > 0" class="flex flex-wrap gap-1 flex-1 mr-2">
            <span
              *ngFor="let value of comboboxService.selectedValues(); trackBy: trackByValue"
              class="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
            >
              {{ getOptionLabel(value) }}
              <button
                type="button"
                class="inline-flex items-center justify-center w-3 h-3 text-secondary-foreground hover:text-foreground"
                (click)="removeChip($event, value)"
                [attr.aria-label]="'Remove ' + getOptionLabel(value)"
              >
                <svg class="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </span>
          </div>

          <!-- Single Selection or Placeholder Display -->
          <span
            *ngIf="!multiple || comboboxService.selectedValues().length === 0"
            class="truncate flex-1"
            [class.text-muted-foreground]="!getDisplayText()"
          >
            {{ getDisplayText() || placeholder }}
          </span>

          <!-- Dropdown Arrow -->
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
      </div>

      <!-- Dropdown Content -->
      <div
        *ngIf="comboboxService.isOpen()"
        [id]="contentId"
        role="listbox"
        [attr.aria-labelledby]="triggerId"
        class="absolute z-50 w-full mt-1 max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
        (keydown)="handleContentKeydown($event)"
      >
        <!-- Search Input -->
        <div *ngIf="searchable" class="flex items-center border-b px-3 py-2">
          <svg class="mr-2 h-4 w-4 shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            #searchInput
            type="text"
            role="searchbox"
            [attr.aria-label]="'Search ' + searchPlaceholder"
            class="flex h-8 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            [placeholder]="searchPlaceholder"
            [value]="comboboxService.searchQuery()"
            (input)="handleSearchInput($event)"
            (keydown)="handleSearchKeydown($event)"
          />
        </div>

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

        <!-- Options List -->
        <div *ngIf="!comboboxService.loading() && !comboboxService.error()" class="p-1">
          <!-- Grouped Options -->
          <div *ngIf="showGroupLabels && comboboxService.groupedOptions().size > 1">
            <div *ngFor="let group of comboboxService.groupedOptions() | keyvalue" class="mb-2">
              <div *ngIf="group.key !== 'default'" class="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {{ group.key }}
              </div>
              <div
                *ngFor="let option of group.value; let i = index"
                role="option"
                [attr.aria-selected]="isOptionSelected(option.value)"
                [attr.aria-disabled]="option.disabled"
                [class]="cn(
                  'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus:bg-accent focus:text-accent-foreground',
                  isOptionSelected(option.value) && 'bg-accent text-accent-foreground',
                  option.disabled && 'pointer-events-none opacity-50'
                )"
                (click)="selectOption(option)"
                (mouseenter)="highlightOption(option, i)"
              >
                <svg
                  *ngIf="isOptionSelected(option.value)"
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
          <div *ngIf="!showGroupLabels || comboboxService.groupedOptions().size <= 1">
            <div
              *ngFor="let option of comboboxService.filteredOptions(); let i = index"
              role="option"
              [attr.aria-selected]="isOptionSelected(option.value)"
              [attr.aria-disabled]="option.disabled"
              [class]="cn(
                'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
                'hover:bg-accent hover:text-accent-foreground',
                'focus:bg-accent focus:text-accent-foreground',
                isOptionSelected(option.value) && 'bg-accent text-accent-foreground',
                comboboxService.highlightedIndex() === i && 'bg-accent text-accent-foreground',
                option.disabled && 'pointer-events-none opacity-50'
              )"
              (click)="selectOption(option)"
              (mouseenter)="comboboxService.highlightOption(i)"
            >
              <svg
                *ngIf="isOptionSelected(option.value)"
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
            *ngIf="comboboxService.filteredOptions().length === 0"
            class="py-6 text-center text-sm text-muted-foreground"
          >
            {{ emptyMessage }}
          </div>
        </div>
      </div>
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
  @Input() multiple: boolean = false;
  @Input() maxSelections?: number;
  @Input() loadingState: boolean = false;
  @Input() loadingMessage: string = 'Loading options...';
  @Input() error: string = '';
  @Input() searchable: boolean = true;
  @Input() showGroupLabels: boolean = true;
  @Input() contentId: string = 'combobox-content-' + Math.random().toString(36).substr(2, 9);
  @Input() triggerId: string = 'combobox-trigger-' + Math.random().toString(36).substr(2, 9);

  @Output() valueChange = new EventEmitter<string | string[] | null>();
  @Output() openChange = new EventEmitter<boolean>();
  @Output() searchChange = new EventEmitter<string>();

  @ViewChild('nativeSelect') nativeSelect?: ElementRef<HTMLSelectElement>;
  @ViewChild('triggerButton') triggerButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  protected comboboxService = inject(ComboboxService);
  protected cn = cn;

  // Form control methods
  private onChange = (value: string | string[] | null) => {};
  private onTouched = () => {};

  constructor() {
    // Focus search input when dropdown opens
    effect(() => {
      if (this.comboboxService.isOpen() && this.searchable && this.searchInput) {
        setTimeout(() => {
          this.searchInput?.nativeElement.focus();
        }, 100);
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const element = this.triggerButton?.nativeElement;
    if (element && !element.contains(target) && !target.closest(`#${this.contentId}`)) {
      this.comboboxService.close();
      this.openChange.emit(false);
    }
  }

  ngOnInit() {
    this.comboboxService.setOptions(this.options);
    this.comboboxService.setMultiple(this.multiple);
    this.comboboxService.setLoading(this.loadingState);
    this.comboboxService.setError(this.error);

    // Set up value change callback
    this.comboboxService.setValueChangeCallback((value: string | string[] | null) => {
      this.onChange(value);
      this.valueChange.emit(value);
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
    if (changes['multiple'] && !changes['multiple'].firstChange) {
      this.comboboxService.setMultiple(this.multiple);
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

  // Event handlers
  handleTriggerClick() {
    if (this.disabled) return;
    this.comboboxService.toggle();
    this.openChange.emit(this.comboboxService.isOpen());
  }

  handleTriggerKeydown(event: KeyboardEvent) {
    if (this.disabled) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.comboboxService.isOpen()) {
          this.comboboxService.open();
          this.openChange.emit(true);
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
        } else {
          this.comboboxService.open();
          this.openChange.emit(true);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.comboboxService.close();
        this.openChange.emit(false);
        break;
    }
  }

  handleContentKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.comboboxService.close();
        this.openChange.emit(false);
        this.triggerButton?.nativeElement.focus();
        break;
    }
  }

  handleSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.comboboxService.setSearchQuery(target.value);
    this.searchChange.emit(target.value);
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
        break;
      case 'Escape':
        event.preventDefault();
        this.comboboxService.close();
        this.openChange.emit(false);
        break;
    }
  }

  handleNativeSelectChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    if (this.multiple) {
      const values = Array.from(select.selectedOptions).map(option => option.value);
      this.comboboxService.setMultipleValues(values);
      this.onChange(values);
      this.valueChange.emit(values);
    } else {
      this.comboboxService.selectByValue(select.value);
      this.onChange(select.value || null);
      this.valueChange.emit(select.value || null);
    }
  }

  handleNativeSelectFocus() {
    this.comboboxService.open();
    this.openChange.emit(true);
  }

  handleNativeSelectBlur() {
    this.onTouched();
  }

  // Helper methods
  selectOption(option: ComboboxOption) {
    if (option.disabled) return;
    this.comboboxService.selectByValue(option.value);
  }

  removeChip(event: Event, value: string) {
    event.stopPropagation();
    this.comboboxService.removeFromSelection(value);
  }

  highlightOption(option: ComboboxOption, index: number) {
    this.comboboxService.highlightOption(index);
  }

  isOptionSelected(value: string): boolean {
    if (this.multiple) {
      return this.comboboxService.selectedValues().includes(value);
    }
    return this.comboboxService.selectedValue() === value;
  }

  getOptionLabel(value: string): string {
    return this.options.find(opt => opt.value === value)?.label || value;
  }

  getDisplayText(): string {
    if (this.multiple) {
      const count = this.comboboxService.selectedValues().length;
      return count > 0 ? `${count} selected` : '';
    }
    return this.comboboxService.selectedLabel();
  }

  trackByValue(index: number, value: string): string {
    return value;
  }
}

// For backward compatibility, export aliases
export const ComboboxTrigger = Combobox;
export const ComboboxContent = Combobox;
