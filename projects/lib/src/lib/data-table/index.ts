import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  effect,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  HostBinding,
  HostListener,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertDialog, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '../alert-dialog';

// Types and Interfaces
export interface DataTableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  editable?: boolean;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  type?: 'string' | 'number' | 'date' | 'boolean' | 'email' | 'url';
  formatter?: (value: any) => string;
  validator?: (value: any) => boolean | string;
  cellTemplate?: any;
  headerTemplate?: any;
  cssClass?: string;
  align?: 'left' | 'center' | 'right';
  sticky?: boolean;
  resizable?: boolean;
  hidden?: boolean;
  reorderable?: boolean;
  pinned?: 'left' | 'right' | null;
  groupable?: boolean;
  cellRenderer?: (value: any, row: T, column: DataTableColumn<T>) => string;
  filterOptions?: any[];
  multiSelectFilter?: boolean;
}

export interface DataTableSort {
  column: string;
  direction: 'asc' | 'desc' | null;
}

export interface DataTableMultiSort {
  sorts: DataTableSort[];
}

export interface DataTableFilter {
  column: string;
  value: any;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'gte' | 'lt' | 'lte' | 'between' | 'in';
}

export interface DataTableAdvancedFilter extends DataTableFilter {
  values?: any[]; // For multi-select filters
  logic?: 'and' | 'or'; // For combining multiple filters on same column
}

export interface DataTablePagination {
  page: number;
  pageSize: number;
  total: number;
  pageSizeOptions: number[];
  showFirstLast: boolean;
  showPageInfo: boolean;
  showPageSizeSelector: boolean;
}

export interface DataTableSelection<T = any> {
  mode: 'none' | 'single' | 'multiple';
  selectedRows: T[];
  selectAll: boolean;
}

export interface DataTableColumnReorderEvent<T = any> {
  fromIndex: number;
  toIndex: number;
  column: DataTableColumn<T>;
  columns: DataTableColumn<T>[];
}

export interface DataTableGrouping<T = any> {
  enabled: boolean;
  column?: string;
  groups?: DataTableGroup<T>[];
  expanded?: { [key: string]: boolean };
}

export interface DataTableGroup<T = any> {
  key: string;
  value: any;
  label: string;
  count: number;
  items: T[];
  expanded: boolean;
}

export interface DataTableVirtualScrolling {
  enabled: boolean;
  itemHeight: number;
  bufferSize: number;
  scrollContainer?: HTMLElement;
}

export interface DataTableConfig {
  sortable: boolean;
  filterable: boolean;
  searchable: boolean;
  paginated: boolean;
  selectable: boolean;
  editable: boolean;
  resizable: boolean;
  reorderable: boolean;
  exportable: boolean;
  virtualScrolling: boolean;
  lazyLoading: boolean;
  stickyHeader: boolean;
  showToolbar: boolean;
  showFooter: boolean;
  striped: boolean;
  bordered: boolean;
  hoverable: boolean;
  compact: boolean;
  elevated: boolean;
  multiSort: boolean;
  grouping: boolean;
  pinColumns: boolean;
  customRenderers: boolean;
  advancedFiltering: boolean;
}

// Component variant styles
const dataTableVariants = cva(
  "w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
  {
    variants: {
      variant: {
        default: "border border-gray-200 dark:border-gray-700 rounded-lg",
        bordered: "border-2 border-gray-300 dark:border-gray-600 rounded-lg",
        minimal: "border-0",
        elevated: "border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg",
      },
      size: {
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
      },
      density: {
        compact: "[&_td]:py-1 [&_th]:py-2",
        default: "[&_td]:py-2 [&_th]:py-3",
        comfortable: "[&_td]:py-3 [&_th]:py-4",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      density: "default",
    },
  }
);

const cellVariants = cva(
  "border-b border-gray-200 dark:border-gray-700",
  {
    variants: {
      type: {
        header: "font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50",
        data: "text-gray-900 dark:text-gray-100",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      sticky: {
        true: "sticky bg-white dark:bg-gray-900 z-10",
        false: "",
      }
    },
    defaultVariants: {
      type: "data",
      align: "left",
      sticky: false,
    },
  }
);

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

@Component({
  selector: 'DataTable',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertDialog, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClasses()">
      <!-- Toolbar -->
      <div *ngIf="config().showToolbar" class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <!-- Search -->
        <div *ngIf="config().searchable" class="w-full sm:flex-1 sm:max-w-md">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"/>
            </svg>
            <input
              #searchInput
              type="text"
              placeholder="Search..."
              [value]="searchTerm()"
              (input)="onSearch($event)"
              class="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
            />
            <button
              *ngIf="searchTerm()"
              type="button"
              (click)="clearSearch()"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap items-center gap-2">
          <!-- Filters Toggle -->
          <button
            *ngIf="config().filterable"
            type="button"
            (click)="toggleFilters()"
            [class.bg-blue-600]="showFilters()"
            [class.text-white]="showFilters()"
            class="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"/>
            </svg>
            Filters
            <span *ngIf="activeFilters().length > 0" class="ml-1 px-1.5 py-0.5 text-xs bg-primary/20 rounded">
              {{ activeFilters().length }}
            </span>
          </button>

          <!-- Export -->
          <div *ngIf="config().exportable" class="relative inline-block export-dropdown">
            <button
              type="button"
              (click)="toggleExportMenu()"
              class="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span class="hidden sm:inline">Export</span>
              <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Export Dropdown Menu -->
            <div
              *ngIf="showExportMenu()"
              class="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50"
            >
              <button
                type="button"
                (click)="exportData('csv')"
                class="w-full px-3 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-t-md transition-colors"
              >
                Export CSV
              </button>
              <button
                type="button"
                (click)="exportData('json')"
                class="w-full px-3 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-b-md transition-colors"
              >
                Export JSON
              </button>
            </div>
          </div>

          <!-- Refresh -->
          <button
            type="button"
            (click)="refresh()"
            [disabled]="loading()"
            class="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            <svg
              class="h-3 w-3 sm:h-4 sm:w-4"
              [class.animate-spin]="loading()"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <span class="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      <!-- Filters Panel -->
      <div *ngIf="showFilters() && config().filterable" class="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/30 border-b border-gray-200 dark:border-gray-700">
        <div class="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div *ngFor="let column of filterableColumns(); trackBy: trackByColumn" class="space-y-1.5 sm:space-y-2">
            <label class="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
              {{ column.label }}
            </label>

            <!-- Text Filter -->
            <div *ngIf="column.type === 'string' || column.type === 'email' || !column.type" class="space-y-1.5 sm:space-y-2">
              <select
                [value]="getFilterOperator(column.key)"
                (change)="setFilterOperator(column.key, $event)"
                class="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="contains">Contains</option>
                <option value="equals">Equals</option>
                <option value="startsWith">Starts with</option>
                <option value="endsWith">Ends with</option>
              </select>
              <input
                [type]="column.type === 'email' ? 'email' : 'text'"
                [placeholder]="'Filter ' + column.label.toLowerCase()"
                [value]="getFilterValue(column.key)"
                (input)="onFilter(column.key, $event)"
                class="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <!-- Number Filter -->
            <div *ngIf="column.type === 'number'" class="space-y-2">
              <select
                [value]="getFilterOperator(column.key)"
                (change)="setFilterOperator(column.key, $event)"
                class="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="equals">Equals</option>
                <option value="gt">Greater than</option>
                <option value="gte">Greater than or equal</option>
                <option value="lt">Less than</option>
                <option value="lte">Less than or equal</option>
              </select>
              <input
                type="number"
                [placeholder]="'Filter ' + column.label.toLowerCase()"
                [value]="getFilterValue(column.key)"
                (input)="onFilter(column.key, $event)"
                class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <!-- Date Filter -->
            <div *ngIf="column.type === 'date'" class="space-y-2">
              <select
                [value]="getFilterOperator(column.key)"
                (change)="setFilterOperator(column.key, $event)"
                class="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="equals">On date</option>
                <option value="gt">After</option>
                <option value="gte">After or on</option>
                <option value="lt">Before</option>
                <option value="lte">Before or on</option>
              </select>
              <input
                type="date"
                [value]="getFilterValue(column.key)"
                (input)="onFilter(column.key, $event)"
                class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <!-- Boolean Filter -->
            <select
              *ngIf="column.type === 'boolean'"
              [value]="getFilterValue(column.key)"
              (change)="onFilter(column.key, $event)"
              class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            <!-- Advanced Multi-Select Filter -->
            <div *ngIf="config().advancedFiltering && column.multiSelectFilter" class="space-y-2">
              <div class="text-xs text-gray-500 dark:text-gray-400">Multi-select filter</div>
              <div class="max-h-32 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800">
                <label
                  *ngFor="let option of getColumnFilterOptions(column.key); trackBy: trackByFilterOption"
                  class="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    [value]="option"
                    [checked]="isFilterOptionSelected(column.key, option)"
                    (change)="toggleFilterOption(column.key, option, $event)"
                    class="h-3 w-3 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300 truncate">{{ option }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Grouping Controls -->
        <div *ngIf="config().grouping" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Grouping</h4>
            <div class="flex items-center gap-2">
              <button
                *ngIf="grouping().enabled"
                type="button"
                (click)="expandAllGroups()"
                class="px-2 py-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Expand All
              </button>
              <button
                *ngIf="grouping().enabled"
                type="button"
                (click)="collapseAllGroups()"
                class="px-2 py-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Collapse All
              </button>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <select
              [value]="grouping().column || ''"
              (change)="onGroupingChange($event)"
              class="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">No grouping</option>
              <option *ngFor="let column of groupableColumns(); trackBy: trackByColumn" [value]="column.key">
                Group by {{ column.label }}
              </option>
            </select>
            <button
              *ngIf="grouping().enabled"
              type="button"
              (click)="toggleGrouping()"
              class="px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 border border-red-300 dark:border-red-600 rounded"
            >
              Clear
            </button>
          </div>
        </div>

        <!-- Multi-Sort Controls -->
        <div *ngIf="config().multiSort && multiSort().sorts.length > 0" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Active Sorts</h4>
            <button
              type="button"
              (click)="clearMultiSort()"
              class="px-2 py-1 text-xs text-red-600 dark:text-red-400 hover:underline"
            >
              Clear All
            </button>
          </div>
          <div class="space-y-1">
            <div
              *ngFor="let sortItem of multiSort().sorts; let i = index"
              class="flex items-center gap-2 text-sm"
            >
              <span class="w-4 h-4 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs flex items-center justify-center">
                {{ i + 1 }}
              </span>
              <span class="text-gray-700 dark:text-gray-300">{{ getColumnLabel(sortItem.column) }}</span>
              <span class="text-gray-500 dark:text-gray-400">{{ sortItem.direction === 'asc' ? '↑' : '↓' }}</span>
              <button
                type="button"
                (click)="removeSort(sortItem.column)"
                class="ml-auto text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <!-- Filter Actions -->
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            (click)="clearAllFilters()"
            [disabled]="activeFilters().length === 0"
            class="px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 disabled:opacity-50"
          >
            Clear All Filters
          </button>
          <span class="text-xs text-gray-500 dark:text-gray-400">
            {{ activeFilters().length }} filter(s) active
          </span>
        </div>
      </div>

      <!-- Selection Info -->
      <div *ngIf="selection().selectedRows.length > 0" class="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button
              type="button"
              (click)="confirmBulkDelete()"
              class="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors cursor-pointer"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              Delete All
            </button>
            <span class="text-sm text-blue-700 dark:text-blue-300 font-medium">
              {{ selection().selectedRows.length }} row(s) selected
            </span>
          </div>
          <button
            type="button"
            (click)="clearSelection()"
            class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-yellow-700 dark:text-yellow-300 border border-yellow-400 dark:border-yellow-500 bg-transparent hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-md transition-colors cursor-pointer"
          >
            Clear selection
          </button>
        </div>
      </div>

      <!-- Table Container -->
      <div
        class="relative overflow-auto"
        [style.max-height]="maxHeight()"
        (scroll)="config().virtualScrolling && virtualScrolling().enabled ? onVirtualScroll($event) : null"
      >
        <table [class]="tableClasses()" [style.min-width]="config().resizable ? '100%' : null">
          <!-- Header -->
          <thead [class.sticky]="config().stickyHeader" [class.top-0]="config().stickyHeader" [class.z-10]="config().stickyHeader" class="bg-white dark:bg-gray-900">
            <tr>
              <!-- Selection column -->
              <th
                *ngIf="config().selectable && selection().mode === 'multiple'"
                [class]="headerCellClasses()"
                class="w-12"
              >
                <input
                  type="checkbox"
                  [checked]="isAllSelected()"
                  [indeterminate]="isIndeterminate()"
                  (change)="toggleSelectAll()"
                  class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                />
              </th>

              <!-- Data columns -->
              <th
                *ngFor="let column of visibleColumns(); trackBy: trackByColumn; let columnIndex = index"
                [class]="headerCellClasses(column, columnIndex)"
                [style.width]="column.width"
                [style.min-width]="column.minWidth"
                [style.max-width]="column.maxWidth"
                [style.text-align]="column.align || 'left'"
                [draggable]="column.reorderable !== false && config().reorderable"
                (click)="column.sortable && config().sortable && !isDragging() ? onSort(column.key, $event) : null"
                (dragstart)="onColumnDragStart($event, columnIndex)"
                (dragover)="onColumnDragOver($event, columnIndex)"
                (dragenter)="onColumnDragEnter($event, columnIndex)"
                (dragleave)="onColumnDragLeave($event, columnIndex)"
                (drop)="onColumnDrop($event, columnIndex)"
                (dragend)="onColumnDragEnd($event)"
                [class.cursor-pointer]="(column.sortable && config().sortable && !isDragging()) || (column.reorderable !== false && config().reorderable)"
                [class.select-none]="column.sortable && config().sortable"
                [attr.title]="getColumnTooltip(column)"
              >
                <div class="flex items-center justify-between gap-2 relative">
                  <!-- Left side: Drag handle and Sort indicators -->
                  <div class="flex items-center gap-1">
                    <!-- Drag handle indicator -->
                    <svg
                      *ngIf="column.reorderable !== false && config().reorderable"
                      class="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9h8M8 15h8"/>
                    </svg>

                    <!-- Single sort indicator -->
                    <div *ngIf="!config().multiSort && column.sortable && config().sortable" class="flex flex-col flex-shrink-0">
                      <svg
                        class="h-3 w-3 text-gray-400 dark:text-gray-500"
                        [class.text-blue-600]="getSortDirection(column.key) === 'asc'"
                        [class.dark:text-blue-400]="getSortDirection(column.key) === 'asc'"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 14l3-3 3 3"/>
                      </svg>
                      <svg
                        class="h-3 w-3 -mt-1 text-gray-400 dark:text-gray-500"
                        [class.text-blue-600]="getSortDirection(column.key) === 'desc'"
                        [class.dark:text-blue-400]="getSortDirection(column.key) === 'desc'"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 10l3 3 3-3"/>
                      </svg>
                    </div>

                    <!-- Multi-sort indicator -->
                    <div *ngIf="config().multiSort && getSortIndex(column.key) >= 0"
                         class="flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1 py-0.5 rounded">
                      <span>{{ getSortIndex(column.key) + 1 }}</span>
                      <svg
                        class="h-3 w-3"
                        [class.rotate-180]="getSortDirection(column.key) === 'desc'"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 14l3-3 3 3"/>
                      </svg>
                    </div>
                  </div>

                  <!-- Center: Column label -->
                  <span class="truncate text-center flex-1">{{ column.label }}</span>

                  <!-- Right side: Filter indicator and Grouping button -->
                  <div class="flex items-center gap-1">
                    <!-- Filter indicator -->
                    <div
                      *ngIf="hasFilter(column.key)"
                      class="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full flex-shrink-0"
                      [title]="'Filtered'"
                    ></div>

                    <!-- Grouping toggle -->
                    <button
                      *ngIf="column.groupable !== false && config().grouping"
                      type="button"
                      (click)="toggleGrouping(column.key); $event.stopPropagation()"
                      [class.text-blue-600]="grouping().enabled && grouping().column === column.key"
                      [class.dark:text-blue-400]="grouping().enabled && grouping().column === column.key"
                      class="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500"
                      title="Group by this column"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h4V4a1 1 0 011-1h6a1 1 0 011 1v4h4l-8 8-8-8z"/>
                      </svg>
                    </button>
                  </div>

                  <!-- Column resizer -->
                  <div
                    *ngIf="column.resizable !== false && config().resizable"
                    class="absolute -right-1 top-0 bottom-0 w-3 cursor-col-resize bg-transparent hover:bg-blue-500/10 active:bg-blue-500/20 transition-colors group flex items-center justify-center"
                    (mousedown)="onColumnResizeStart($event, column)"
                    title="Resize column"
                  >
                    <div class="w-0.5 h-4 bg-gray-300 dark:bg-gray-600 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 group-hover:w-1 transition-all duration-150 rounded-full"></div>
                  </div>
                </div>
              </th>

              <!-- Actions column -->
              <th
                *ngIf="config().editable"
                [class]="headerCellClasses()"
                class="w-24 text-center"
              >
                Actions
              </th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody>
            <!-- Loading state -->
            <tr *ngIf="loading()">
              <td
                [attr.colspan]="totalColumns()"
                class="px-4 py-8 text-center text-gray-600 dark:text-gray-400"
              >
                <div class="flex items-center justify-center gap-2">
                  <div class="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 border-t-blue-600 rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </div>
              </td>
            </tr>

            <!-- Grouped Data Display -->
            <ng-container *ngIf="config().grouping && grouping().enabled && groupedData() && !loading()">
              <ng-container *ngFor="let group of groupedData(); trackBy: trackByGroup">
                <!-- Group Header -->
                <tr class="bg-gray-100 dark:bg-gray-800 border-t-2 border-gray-300 dark:border-gray-600">
                  <td [attr.colspan]="totalColumns()" class="px-4 py-3">
                    <div class="flex items-center gap-2">
                      <button
                        type="button"
                        (click)="toggleGroupExpansion(group.key)"
                        class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <svg
                          class="w-4 h-4 transition-transform"
                          [class.rotate-90]="group.expanded"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>
                      <span class="font-semibold text-gray-900 dark:text-gray-100">
                        {{ group.label }} ({{ group.count }} items)
                      </span>
                    </div>
                  </td>
                </tr>

                <!-- Group Items -->
                <ng-container *ngIf="group.expanded">
                  <tr
                    *ngFor="let row of group.items; let i = index; trackBy: trackByRow"
                    [class]="rowClasses(row, i)"
                    (click)="onRowClick(row, i)"
                  >
                    <!-- Selection column -->
                    <td
                      *ngIf="config().selectable && selection().mode === 'multiple'"
                      [class]="dataCellClasses()"
                      class="w-12"
                    >
                      <input
                        type="checkbox"
                        [checked]="isRowSelected(row)"
                        (change)="toggleRowSelection(row)"
                        (click)="$event.stopPropagation()"
                        class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                      />
                    </td>

                    <!-- Data columns -->
                    <td
                      *ngFor="let column of visibleColumns(); trackBy: trackByColumn"
                      [class]="dataCellClasses(column)"
                      [style.width]="column.width"
                      [style.min-width]="column.minWidth"
                      [style.max-width]="column.maxWidth"
                      [style.text-align]="column.align || 'center'"
                      [style.left]="column.pinned === 'left' ? getColumnPinnedOffset(column, 'left') : null"
                      [style.right]="column.pinned === 'right' ? getColumnPinnedOffset(column, 'right') : null"
                      [class.sticky]="column.pinned"
                      [class.z-10]="column.pinned"
                      [class.bg-white]="column.pinned"
                      [class.dark:bg-gray-900]="column.pinned"
                      [class.border-r-2]="column.pinned === 'left'"
                      [class.border-l-2]="column.pinned === 'right'"
                      [class.border-gray-300]="column.pinned"
                      [class.dark:border-gray-600]="column.pinned"
                      (dblclick)="startEdit(i, column.key)"
                    >
                      <!-- Edit mode -->
                      <div *ngIf="isEditing(i, column.key)" class="w-full">
                        <input
                          #editInput
                          [type]="getInputType(column)"
                          [value]="getCellValue(row, column)"
                          (blur)="saveEdit(i, column.key, $event)"
                          (keydown.enter)="saveEdit(i, column.key, $event)"
                          (keydown.escape)="cancelEdit()"
                          class="w-full px-2 py-1 text-sm border border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded focus:outline-none"
                        />
                      </div>

                      <!-- Display mode -->
                      <div *ngIf="!isEditing(i, column.key)" class="truncate">
                        {{ renderCellValue(row, column) }}
                      </div>
                    </td>

                    <!-- Actions column -->
                    <td
                      *ngIf="config().editable"
                      [class]="dataCellClasses()"
                      class="w-24"
                    >
                      <div class="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          (click)="confirmDeleteRow(i); $event.stopPropagation()"
                          class="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded transition-colors cursor-pointer"
                          title="Delete row"
                        >
                          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </ng-container>
              </ng-container>
            </ng-container>

            <!-- Regular Data Display (Non-grouped) -->
            <ng-container *ngIf="!config().grouping || !grouping().enabled">
              <!-- Virtual Scrolling Container -->
              <tr
                *ngIf="config().virtualScrolling && virtualScrolling().enabled"
                [style.height.px]="virtualScrollHeight()"
                class="relative"
              >
                <td [attr.colspan]="totalColumns()" class="p-0">
                  <div class="relative w-full h-full">
                    <!-- Virtual rows -->
                    <div
                      *ngFor="let row of virtualDisplayedData(); let i = index; trackBy: trackByRow"
                      [style.transform]="getVirtualRowTransform(i)"
                      [style.height.px]="virtualScrolling().itemHeight"
                      class="absolute w-full flex"
                      [class]="rowClasses(row, visibleStartIndex() + i)"
                      (click)="onRowClick(row, visibleStartIndex() + i)"
                    >
                      <!-- Virtual row content -->
                      <div
                        *ngIf="config().selectable && selection().mode === 'multiple'"
                        [class]="dataCellClasses()"
                        class="w-12 flex items-center px-4"
                      >
                        <input
                          type="checkbox"
                          [checked]="isRowSelected(row)"
                          (change)="toggleRowSelection(row)"
                          (click)="$event.stopPropagation()"
                          class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                        />
                      </div>

                      <div
                        *ngFor="let column of visibleColumns(); trackBy: trackByColumn"
                        [class]="dataCellClasses(column)"
                        [style.width]="column.width"
                        [style.min-width]="column.minWidth"
                        [style.max-width]="column.maxWidth"
                        [style.text-align]="column.align || 'center'"
                        class="flex items-center px-4"
                        (dblclick)="startEdit(visibleStartIndex() + i, column.key)"
                      >
                        <div class="truncate w-full">
                          {{ renderCellValue(row, column) }}
                        </div>
                      </div>

                      <div
                        *ngIf="config().editable"
                        [class]="dataCellClasses()"
                        class="w-24 flex items-center justify-center"
                      >
                        <button
                          type="button"
                          (click)="confirmDeleteRow(visibleStartIndex() + i); $event.stopPropagation()"
                          class="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded transition-colors cursor-pointer"
                          title="Delete row"
                        >
                          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Regular Data rows (Non-virtual) -->
              <tr
                *ngFor="let row of displayedData(); let i = index; trackBy: trackByRow"
                [class]="rowClasses(row, i)"
                (click)="onRowClick(row, i)"
                [hidden]="config().virtualScrolling && virtualScrolling().enabled"
              >
                <!-- Selection column -->
                <td
                  *ngIf="config().selectable && selection().mode === 'multiple'"
                  [class]="dataCellClasses()"
                  class="w-12"
                >
                  <input
                    type="checkbox"
                    [checked]="isRowSelected(row)"
                    (change)="toggleRowSelection(row)"
                    (click)="$event.stopPropagation()"
                    class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                  />
                </td>

                <!-- Data columns -->
                <td
                  *ngFor="let column of visibleColumns(); trackBy: trackByColumn"
                  [class]="dataCellClasses(column)"
                  [style.width]="column.width"
                  [style.min-width]="column.minWidth"
                  [style.max-width]="column.maxWidth"
                  [style.text-align]="column.align || 'center'"
                  [style.left]="column.pinned === 'left' ? getColumnPinnedOffset(column, 'left') : null"
                  [style.right]="column.pinned === 'right' ? getColumnPinnedOffset(column, 'right') : null"
                  [class.sticky]="column.pinned"
                  [class.z-10]="column.pinned"
                  [class.bg-white]="column.pinned"
                  [class.dark:bg-gray-900]="column.pinned"
                  [class.border-r-2]="column.pinned === 'left'"
                  [class.border-l-2]="column.pinned === 'right'"
                  [class.border-gray-300]="column.pinned"
                  [class.dark:border-gray-600]="column.pinned"
                  (dblclick)="startEdit(i, column.key)"
                >
                  <!-- Edit mode -->
                  <div *ngIf="isEditing(i, column.key)" class="w-full">
                    <input
                      #editInput
                      [type]="getInputType(column)"
                      [value]="getCellValue(row, column)"
                      (blur)="saveEdit(i, column.key, $event)"
                      (keydown.enter)="saveEdit(i, column.key, $event)"
                      (keydown.escape)="cancelEdit()"
                      class="w-full px-2 py-1 text-sm border border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded focus:outline-none"
                    />
                  </div>

                  <!-- Display mode -->
                  <div *ngIf="!isEditing(i, column.key)" class="truncate">
                    {{ renderCellValue(row, column) }}
                  </div>
                </td>

                <!-- Actions column -->
                <td
                  *ngIf="config().editable"
                  [class]="dataCellClasses()"
                  class="w-24"
                >
                  <div class="flex items-center justify-center gap-1">
                    <button
                      type="button"
                      (click)="confirmDeleteRow(i); $event.stopPropagation()"
                      class="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded transition-colors cursor-pointer"
                      title="Delete row"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </ng-container>

            <!-- Empty state -->
            <tr *ngIf="displayedData().length === 0 && !loading()">
              <td
                [attr.colspan]="totalColumns()"
                class="px-4 py-12 text-center text-gray-600 dark:text-gray-400"
              >
                <div class="flex flex-col items-center gap-4">
                  <div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <svg class="h-8 w-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h2m0-13v13m0 0h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m0 13v-4a2 2 0 012-2h2a2 2 0 012-2V7"/>
                    </svg>
                  </div>
                  <div class="text-center">
                    <p class="text-lg font-medium mb-1 text-gray-900 dark:text-gray-100">No data available</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ searchTerm() || activeFilters().length > 0 ? 'No results match your search or filters.' : 'Add some data to get started.' }}
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        *ngIf="config().paginated && (pagination().total > 0 || dataLength() > 0)"
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 px-3 sm:px-4 py-3 border-t border-gray-200 dark:border-gray-700"
      >
        <!-- Page info -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div *ngIf="pagination().showPageInfo" class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Showing {{ getPageStart() + 1 }} to {{ getPageEnd() }} of {{ pagination().total }} entries
          </div>

          <!-- Page size selector -->
          <div *ngIf="pagination().showPageSizeSelector" class="flex items-center gap-1 sm:gap-2">
            <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Show</span>
            <select
              [value]="pagination().pageSize"
              (change)="onPageSizeChange($event)"
              class="px-1.5 sm:px-2 py-1 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option *ngFor="let size of pageSizeOptionsForTemplate()" [value]="size">
                {{ size }}
              </option>
            </select>
            <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">entries</span>
          </div>
        </div>

        <!-- Pagination controls -->
        <div class="flex items-center gap-0.5 sm:gap-1 overflow-x-auto">
          <!-- First page -->
          <button
            *ngIf="pagination().showFirstLast"
            type="button"
            [disabled]="pagination().page === 0"
            (click)="goToPage(0)"
            class="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-l-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <span class="hidden sm:inline">First</span>
            <span class="sm:hidden">‹‹</span>
          </button>

          <!-- Previous page -->
          <button
            type="button"
            [disabled]="pagination().page === 0"
            (click)="goToPage(pagination().page - 1)"
            class="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            [class.rounded-l-md]="!pagination().showFirstLast"
          >
            <span class="hidden sm:inline">Previous</span>
            <span class="sm:hidden">‹</span>
          </button>

          <!-- Page numbers -->
          <button
            *ngFor="let page of getVisiblePages()"
            type="button"
            [disabled]="page === '...'"
            (click)="page !== '...' ? goToPage(+page - 1) : null"
            class="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:cursor-default whitespace-nowrap"
            [class.bg-blue-600]="page === (pagination().page + 1).toString()"
            [class.dark:bg-blue-600]="page === (pagination().page + 1).toString()"
            [class.text-white]="page === (pagination().page + 1).toString()"
          >
            {{ page }}
          </button>

          <!-- Next page -->
          <button
            type="button"
            [disabled]="pagination().page >= mathUtil.ceil(pagination().total / pagination().pageSize) - 1"
            (click)="goToPage(pagination().page + 1)"
            class="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            [class.rounded-r-md]="!pagination().showFirstLast"
          >
            <span class="hidden sm:inline">Next</span>
            <span class="sm:hidden">›</span>
          </button>

          <!-- Last page -->
          <button
            *ngIf="pagination().showFirstLast"
            type="button"
            [disabled]="pagination().page >= mathUtil.ceil(pagination().total / pagination().pageSize) - 1"
            (click)="goToPage(mathUtil.ceil(pagination().total / pagination().pageSize) - 1)"
            class="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-r-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <span class="hidden sm:inline">Last</span>
            <span class="sm:hidden">››</span>
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div *ngIf="config().showFooter" class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
        <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div>
            Total: {{ dataLength() }} rows
            <span *ngIf="filteredData().length !== dataLength()">
              ({{ filteredData().length }} filtered)
            </span>
          </div>
          <div *ngIf="selection().selectedRows.length > 0">
            {{ selection().selectedRows.length }} selected
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Dialog -->
      <AlertDialog [isOpen]="showDeleteConfirm()">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this record? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel (click)="cancelDelete()">Cancel</AlertDialogCancel>
          <AlertDialogAction (click)="confirmDelete()" variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialog>

      <!-- Bulk Delete Confirmation Dialog -->
      <AlertDialog [isOpen]="showBulkDeleteConfirm()">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Bulk Delete</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {{ selection().selectedRows.length }} selected record(s)? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel (click)="cancelBulkDelete()">Cancel</AlertDialogCancel>
          <AlertDialogAction (click)="executeBulkDelete()" variant="destructive">Delete All</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialog>
    </div>
  `,
})
export class DataTable<T = any> implements AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  // Inputs
  private _data = signal<T[]>([]);
  private _columns = signal<DataTableColumn<T>[]>([]);

  @Input()
  set data(value: T[]) {
    this._data.set(value);
  }
  get data() {
    return this._data();
  }

  @Input()
  set columns(value: DataTableColumn<T>[]) {
    this._columns.set(value);
  }
  get columns() {
    return this._columns();
  }

   variant = input<VariantProps<typeof dataTableVariants>['variant']>('default');
   size = input<VariantProps<typeof dataTableVariants>['size']>('default');
  density = input<VariantProps<typeof dataTableVariants>['density']>('default');

  // Internal config signal
  private _configInput = signal<Partial<DataTableConfig>>({});

  // Computed config with defaults
  config = computed(() => ({
    sortable: true,
    filterable: true,
    searchable: true,
    paginated: true,
    selectable: true,
    editable: true,
    resizable: false,
    reorderable: true,
    exportable: true,
    virtualScrolling: false,
    lazyLoading: false,
    stickyHeader: true,
    showToolbar: true,
    showFooter: true,
    striped: true,
    bordered: false,
    hoverable: true,
    compact: false,
    elevated: false,
    multiSort: false,
    grouping: false,
    pinColumns: false,
    customRenderers: false,
    advancedFiltering: false,
    ...this._configInput(),
  }));

  @Input()
  set configInput(value: Partial<DataTableConfig>) {
    this._configInput.set(value);
  }

  maxHeight = input<string>('600px');

  // Pagination configuration inputs as signals for reactivity
  private _initialPageSize = signal<number>(5);
  private _pageSizeOptions = signal<number[]>([5, 10, 20, 50, 100]);
  private _showFirstLast = signal<boolean>(true);
  private _showPageInfo = signal<boolean>(true);
  private _showPageSizeSelector = signal<boolean>(true);

  @Input()
  set initialPageSize(value: number) {
    this._initialPageSize.set(value);
  }
  get initialPageSize() {
    return this._initialPageSize();
  }

  @Input()
  set pageSizeOptions(value: number[]) {
    this._pageSizeOptions.set(value);
  }
  get pageSizeOptions() {
    return this._pageSizeOptions();
  }

  @Input()
  set showFirstLast(value: boolean) {
    this._showFirstLast.set(value);
  }
  get showFirstLast() {
    return this._showFirstLast();
  }

  @Input()
  set showPageInfo(value: boolean) {
    this._showPageInfo.set(value);
  }
  get showPageInfo() {
    return this._showPageInfo();
  }

  @Input()
  set showPageSizeSelector(value: boolean) {
    this._showPageSizeSelector.set(value);
  }
  get showPageSizeSelector() {
    return this._showPageSizeSelector();
  }

  // Outputs
  @Output() dataChange = new EventEmitter<T[]>();
  @Output() selectionChange = new EventEmitter<T[]>();
  @Output() sortChange = new EventEmitter<DataTableSort>();
  @Output() multiSortChange = new EventEmitter<DataTableMultiSort>();
  @Output() filterChange = new EventEmitter<DataTableFilter[]>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() cellEdit = new EventEmitter<{ row: T; column: string; oldValue: any; newValue: any }>();
  @Output() rowEdit = new EventEmitter<{ row: T; index: number }>();
  @Output() rowDelete = new EventEmitter<{ row: T; index: number }>();
  @Output() refreshRequested = new EventEmitter<boolean>();
  @Output() export = new EventEmitter<string>();
  @Output() columnReorder = new EventEmitter<DataTableColumnReorderEvent<T>>();
  @Output() columnResize = new EventEmitter<{ column: DataTableColumn<T>; width: string }>();
  @Output() groupChange = new EventEmitter<DataTableGrouping<T>>();

  // Internal state
  searchTerm = signal<string>('');
  sort = signal<DataTableSort>({ column: '', direction: null });
  multiSort = signal<DataTableMultiSort>({ sorts: [] });
  filters = signal<DataTableFilter[]>([]);
  advancedFilters = signal<DataTableAdvancedFilter[]>([]);

  // Column reordering state
  draggedColumnIndex = signal<number>(-1);
  dragOverColumnIndex = signal<number>(-1);
  isDragging = signal<boolean>(false);

  // Column resizing state
  resizingColumn = signal<{ column: DataTableColumn<T>; startX: number; startWidth: number } | null>(null);
  isResizing = signal<boolean>(false);

  // Grouping state
  grouping = signal<DataTableGrouping<T>>({
    enabled: false,
    column: undefined,
    groups: [],
    expanded: {}
  });

  // Virtual scrolling state
  virtualScrolling = signal<DataTableVirtualScrolling>({
    enabled: false,
    itemHeight: 40,
    bufferSize: 10,
    scrollContainer: undefined
  });

  // Virtual scroll viewport
  virtualScrollTop = signal<number>(0);
  virtualScrollHeight = signal<number>(0);
  visibleStartIndex = signal<number>(0);
  visibleEndIndex = signal<number>(0);

  pagination = signal<DataTablePagination>({
    page: 0,
    pageSize: 5, // Will be updated by effect
    total: 0,
    pageSizeOptions: [5, 10, 20, 50, 100], // Will be updated by effect
    showFirstLast: true, // Will be updated by effect
    showPageInfo: true, // Will be updated by effect
    showPageSizeSelector: true, // Will be updated by effect
  });

  selection = signal<DataTableSelection<T>>({
    mode: 'multiple',
    selectedRows: [],
    selectAll: false,
  });

  showFilters = signal<boolean>(false);
  showExportMenu = signal<boolean>(false);
  showDeleteConfirm = signal<boolean>(false);
  showBulkDeleteConfirm = signal<boolean>(false);
  pendingDeleteIndex = signal<number>(-1);
  loading = signal<boolean>(false);

  // Editing state
  editingCell = signal<{ row: number; column: string } | null>(null);

  // Computed values
  visibleColumns = computed(() =>
    this._columns().filter(col => !col.hidden)
  );

  // Pinned columns computed properties
  leftPinnedColumns = computed(() =>
    this.visibleColumns().filter(col => col.pinned === 'left')
  );

  rightPinnedColumns = computed(() =>
    this.visibleColumns().filter(col => col.pinned === 'right')
  );

  unpinnedColumns = computed(() =>
    this.visibleColumns().filter(col => !col.pinned)
  );

  // Groupable columns
  groupableColumns = computed(() =>
    this.visibleColumns().filter(col => col.groupable !== false && this.config().grouping)
  );

  // Resizable columns
  resizableColumns = computed(() =>
    this.visibleColumns().filter(col => col.resizable !== false && this.config().resizable)
  );

  // Public computed properties for template access
  dataLength = computed(() => this._data().length);
  columnsValue = computed(() => this._columns());
  dataValue = computed(() => this._data());

  // Computed properties for pagination inputs (for template access)
  pageSizeOptionsForTemplate = computed(() => this._pageSizeOptions());

  filterableColumns = computed(() =>
    this.visibleColumns().filter(col => col.filterable !== false && this.config().filterable)
  );

  sortableColumns = computed(() =>
    this.visibleColumns().filter(col => col.sortable !== false && this.config().sortable)
  );

  searchableColumns = computed(() =>
    this.visibleColumns().filter(col => col.searchable !== false && this.config().searchable)
  );

  filteredData = computed(() => {
    let data = this._data();

    // Apply search
    if (this.searchTerm() && this.config().searchable) {
      const searchLower = this.searchTerm().toLowerCase();
      data = data.filter(row =>
        this.searchableColumns().some(col => {
          const value = this.getCellValue(row, col);
          return value?.toString().toLowerCase().includes(searchLower);
        })
      );
    }

    // Apply regular filters
    if (this.config().filterable) {
      this.filters().forEach(filter => {
        data = data.filter(row => {
          const column = this._columns().find(col => col.key === filter.column);
          if (!column) return true;

          const value = this.getCellValue(row, column);
          return this.applyFilter(value, filter);
        });
      });
    }

    // Apply advanced filters (multi-select filters)
    if (this.config().advancedFiltering) {
      this.advancedFilters().forEach(filter => {
        data = data.filter(row => {
          const column = this._columns().find(col => col.key === filter.column);
          if (!column) return true;

          const value = this.getCellValue(row, column);

          // Convert advanced filter to regular filter format for processing
          const regularFilter: DataTableFilter = {
            column: filter.column,
            value: filter.values || [filter.value],
            operator: filter.operator
          };

          return this.applyFilter(value, regularFilter);
        });
      });
    }

    return data;
  });

  sortedData = computed(() => {
    const data = [...this.filteredData()];

    // Multi-sort support
    if (this.config().multiSort && this.multiSort().sorts.length > 0) {
      return data.sort((a, b) => {
        for (const sortConfig of this.multiSort().sorts) {
          if (!sortConfig.column || !sortConfig.direction) continue;

          const column = this._columns().find(col => col.key === sortConfig.column);
          if (!column) continue;

          const aVal = this.getCellValue(a, column);
          const bVal = this.getCellValue(b, column);

          let result = 0;

          if (column.type === 'number') {
            result = (Number(aVal) || 0) - (Number(bVal) || 0);
          } else if (column.type === 'date') {
            result = new Date(aVal).getTime() - new Date(bVal).getTime();
          } else if (column.type === 'boolean') {
            result = (aVal === bVal) ? 0 : aVal ? 1 : -1;
          } else {
            result = String(aVal || '').localeCompare(String(bVal || ''));
          }

          if (result !== 0) {
            return sortConfig.direction === 'desc' ? -result : result;
          }
        }
        return 0;
      });
    }

    // Single sort (fallback)
    const sortConfig = this.sort();
    if (!sortConfig.column || !sortConfig.direction || !this.config().sortable) {
      return data;
    }

    const column = this._columns().find(col => col.key === sortConfig.column);
    if (!column) return data;

    return data.sort((a, b) => {
      const aVal = this.getCellValue(a, column);
      const bVal = this.getCellValue(b, column);

      let result = 0;

      if (column.type === 'number') {
        result = (Number(aVal) || 0) - (Number(bVal) || 0);
      } else if (column.type === 'date') {
        result = new Date(aVal).getTime() - new Date(bVal).getTime();
      } else if (column.type === 'boolean') {
        result = (aVal === bVal) ? 0 : aVal ? 1 : -1;
      } else {
        result = String(aVal || '').localeCompare(String(bVal || ''));
      }

      return sortConfig.direction === 'desc' ? -result : result;
    });
  });

  groupedData = computed(() => {
    if (!this.config().grouping || !this.grouping().enabled || !this.grouping().column) {
      return null;
    }

    const data = this.sortedData();
    const groupColumn = this.grouping().column!;
    const column = this._columns().find(col => col.key === groupColumn);
    if (!column) return null;

    const groups = new Map<any, T[]>();

    data.forEach(row => {
      const value = this.getCellValue(row, column);
      const key = value?.toString() || 'null';
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(row);
    });

    const groupArray: DataTableGroup<T>[] = Array.from(groups.entries()).map(([key, items]) => ({
      key,
      value: key,
      label: key === 'null' ? '(No value)' : key,
      count: items.length,
      items,
      expanded: this.grouping().expanded?.[key] ?? true
    }));

    // Don't update signals in computed - return the data
    return groupArray;
  });

  virtualDisplayedData = computed(() => {
    if (!this.config().virtualScrolling || !this.virtualScrolling().enabled) {
      return this.displayedData();
    }

    const data = this.displayedData();
    const startIndex = this.visibleStartIndex();
    const endIndex = this.visibleEndIndex();

    return data.slice(startIndex, endIndex);
  });

  displayedData = computed(() => {
    // If grouping is enabled, return flattened grouped data
    if (this.config().grouping && this.grouping().enabled && this.groupedData()) {
      const flatData: T[] = [];
      this.groupedData()!.forEach(group => {
        if (group.expanded) {
          flatData.push(...group.items);
        }
      });

      if (!this.config().paginated) {
        return flatData;
      }

      const { page, pageSize } = this.pagination();
      const start = page * pageSize;
      const end = start + pageSize;

      return flatData.slice(start, end);
    }

    const data = this.sortedData();

    if (!this.config().paginated) {
      return data;
    }

    const { page, pageSize } = this.pagination();
    const start = page * pageSize;
    const end = start + pageSize;

    return data.slice(start, end);
  });

  activeFilters = computed(() => [...this.filters(), ...this.advancedFilters()]);

  totalColumns = computed(() => {
    let count = this.visibleColumns().length;
    if (this.config().selectable && this.selection().mode === 'multiple') count++;
    if (this.config().editable) count++;
    return count;
  });

  // Math utility for template access
  protected readonly mathUtil = Math;

  // Constructor
  constructor() {
    // Update pagination total when filtered data changes
    effect(() => {
      this.pagination.update(p => ({
        ...p,
        total: this.filteredData().length
      }));
    });

    // Update pagination settings when inputs change
    effect(() => {
      this.pagination.update(p => ({
        ...p,
        pageSize: this._initialPageSize(),
        pageSizeOptions: this._pageSizeOptions(),
        showFirstLast: this._showFirstLast(),
        showPageInfo: this._showPageInfo(),
        showPageSizeSelector: this._showPageSizeSelector(),
      }));
    });

    // Reset to first page when page size changes
    effect(() => {
      const pageSize = this._initialPageSize();
      // Reset to page 0 when page size changes
      this.pagination.update(p => ({
        ...p,
        page: 0
      }));
    });
  }

  ngAfterViewInit() {
    // Initialize any view-related functionality
  }

  ngOnDestroy() {
    // Cleanup
  }

  // Styling methods
  @HostBinding('class') get hostClasses() {
    return cn(
      'data-table',
      this.config().compact && 'compact',
      this.config().bordered && 'bordered'
    );
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.export-dropdown')) {
      this.showExportMenu.set(false);
    }
  }

  containerClasses = computed(() => cn(
    'data-table-container',
    'border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow-sm overflow-hidden',
    this.config().bordered && 'border-2',
    this.config().elevated && 'shadow-lg'
  ));

  tableClasses = computed(() => cn(
    dataTableVariants({
      variant: this.variant(),
      size: this.size(),
      density: this.density(),
    }),
    // Use table-fixed for better column width control when resizing is enabled
    this.config().resizable ? 'table-auto' : 'table-auto'
  ));

  headerCellClasses = (column?: DataTableColumn<T>, columnIndex?: number) => cn(
    cellVariants({
      type: 'header',
      align: column?.align,
      sticky: column?.sticky,
    }),
    'px-4 py-3 font-semibold text-left transition-all duration-200 relative',
    // Add extra padding-right for resizable columns
    column?.resizable !== false && this.config().resizable && 'pr-6',
    column?.cssClass,
    // Reordering styles
    column?.reorderable !== false && this.config().reorderable && 'cursor-move select-none',
    this.isDragging() && columnIndex === this.draggedColumnIndex() && 'opacity-50 scale-95 z-10',
    this.isDragging() && columnIndex === this.dragOverColumnIndex() && 'bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500',
    this.isDragging() && 'transition-all duration-200'
  );

  dataCellClasses = (column?: DataTableColumn<T>) => cn(
    cellVariants({
      type: 'data',
      align: column?.align,
      sticky: column?.sticky,
    }),
    'px-4 py-2',
    column?.cssClass
  );

  rowClasses = (row: T, index: number) => cn(
    'group transition-colors',
    this.config().hoverable && 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
    this.config().striped && index % 2 === 1 && 'bg-gray-50 dark:bg-gray-800/30',
    this.isRowSelected(row) && 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    this.config().selectable && this.selection().mode === 'single' && 'cursor-pointer'
  );

  // Event handlers
  onSort(columnKey: string | keyof T, event?: Event) {
    if (!this.config().sortable) return;

    // Check for multi-sort (Ctrl/Cmd key held)
    const isMultiSort = this.config().multiSort && event && (event as KeyboardEvent | MouseEvent).ctrlKey;

    if (isMultiSort) {
      this.onMultiSort(columnKey);
      return;
    }

    const currentSort = this.sort();
    let direction: 'asc' | 'desc' | null = 'asc';

    if (currentSort.column === columnKey) {
      direction = currentSort.direction === 'asc' ? 'desc' : currentSort.direction === 'desc' ? null : 'asc';
    }

    const newSort = { column: String(columnKey), direction };
    this.sort.set(newSort);
    this.sortChange.emit(newSort);

    // Clear multi-sort when single sort is used
    if (this.config().multiSort) {
      this.multiSort.set({ sorts: direction ? [newSort] : [] });
      this.multiSortChange.emit(this.multiSort());
    }
  }

  onMultiSort(columnKey: string | keyof T) {
    if (!this.config().multiSort) return;

    const column = String(columnKey);
    const currentSorts = [...this.multiSort().sorts];
    const existingIndex = currentSorts.findIndex(s => s.column === column);

    if (existingIndex >= 0) {
      // Update existing sort
      const currentDirection = currentSorts[existingIndex].direction;
      const newDirection: 'asc' | 'desc' | null =
        currentDirection === 'asc' ? 'desc' :
        currentDirection === 'desc' ? null : 'asc';

      if (newDirection) {
        currentSorts[existingIndex] = { column, direction: newDirection };
      } else {
        currentSorts.splice(existingIndex, 1);
      }
    } else {
      // Add new sort
      currentSorts.push({ column, direction: 'asc' });
    }

    const newMultiSort = { sorts: currentSorts };
    this.multiSort.set(newMultiSort);
    this.multiSortChange.emit(newMultiSort);

    // Update single sort to match primary sort
    if (currentSorts.length > 0) {
      this.sort.set(currentSorts[0]);
      this.sortChange.emit(currentSorts[0]);
    } else {
      this.sort.set({ column: '', direction: null });
      this.sortChange.emit({ column: '', direction: null });
    }
  }

  getSortIndex(columnKey: string): number {
    if (!this.config().multiSort) return -1;
    return this.multiSort().sorts.findIndex(s => s.column === columnKey);
  }

  getSortDirection(columnKey: string): 'asc' | 'desc' | null {
    if (this.config().multiSort) {
      const sort = this.multiSort().sorts.find(s => s.column === columnKey);
      return sort?.direction || null;
    }
    const sort = this.sort();
    return sort.column === columnKey ? sort.direction : null;
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
    this.goToPage(0); // Reset to first page when searching
  }

  clearSearch() {
    this.searchTerm.set('');
    this.goToPage(0);
  }

  onFilter(columnKey: string | keyof T, event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const value = target.value;
    const column = String(columnKey);

    if (!value) {
      // Remove filter if value is empty
      this.filters.update(filters => filters.filter(f => f.column !== column));
    } else {
      // Add or update filter
      const operator = this.getFilterOperator(column);
      const existingFilterIndex = this.filters().findIndex(f => f.column === column);

      const newFilter: DataTableFilter = { column, value, operator };

      if (existingFilterIndex >= 0) {
        this.filters.update(filters => {
          const updated = [...filters];
          updated[existingFilterIndex] = newFilter;
          return updated;
        });
      } else {
        this.filters.update(filters => [...filters, newFilter]);
      }
    }

    this.goToPage(0); // Reset to first page when filtering
    this.filterChange.emit(this.filters());
  }

  getFilterOperator(columnKey: string): DataTableFilter['operator'] {
    const filter = this.filters().find(f => f.column === columnKey);
    const column = this._columns().find(c => c.key === columnKey);

    if (filter) return filter.operator;

    // Default operators based on column type
    switch (column?.type) {
      case 'number': return 'equals';
      case 'date': return 'equals';
      case 'boolean': return 'equals';
      default: return 'contains';
    }
  }

  setFilterOperator(columnKey: string, event: Event) {
    const target = event.target as HTMLSelectElement;
    const operator = target.value as DataTableFilter['operator'];

    this.filters.update(filters => {
      const filterIndex = filters.findIndex(f => f.column === columnKey);
      if (filterIndex >= 0) {
        const updated = [...filters];
        updated[filterIndex] = { ...updated[filterIndex], operator };
        return updated;
      }
      return filters;
    });
  }

  getFilterValue(columnKey: string): string {
    const filter = this.filters().find(f => f.column === columnKey);
    return filter?.value || '';
  }

  hasFilter(columnKey: string): boolean {
    return this.filters().some(f => f.column === columnKey) ||
           this.advancedFilters().some(f => f.column === columnKey);
  }

  toggleFilters() {
    this.showFilters.update(show => !show);
  }

  toggleExportMenu() {
    this.showExportMenu.update(show => !show);
  }

  clearAllFilters() {
    this.filters.set([]);
    this.advancedFilters.set([]);
    this.filterChange.emit([]);
    this.goToPage(0);
  }

  applyFilter(value: any, filter: DataTableFilter): boolean {
    const filterValue = filter.value;

    if (filterValue === null || filterValue === undefined || filterValue === '') {
      return true;
    }

    const column = this._columns().find(c => c.key === filter.column);

    switch (filter.operator) {
      case 'equals':
        if (column?.type === 'boolean') {
          return Boolean(value) === (filterValue === 'true');
        }
        return String(value).toLowerCase() === String(filterValue).toLowerCase();

      case 'contains':
        return String(value).toLowerCase().includes(String(filterValue).toLowerCase());

      case 'startsWith':
        return String(value).toLowerCase().startsWith(String(filterValue).toLowerCase());

      case 'endsWith':
        return String(value).toLowerCase().endsWith(String(filterValue).toLowerCase());

      case 'gt':
        if (column?.type === 'number') {
          return Number(value) > Number(filterValue);
        }
        if (column?.type === 'date') {
          return new Date(value) > new Date(filterValue);
        }
        return String(value) > String(filterValue);

      case 'gte':
        if (column?.type === 'number') {
          return Number(value) >= Number(filterValue);
        }
        if (column?.type === 'date') {
          return new Date(value) >= new Date(filterValue);
        }
        return String(value) >= String(filterValue);

      case 'lt':
        if (column?.type === 'number') {
          return Number(value) < Number(filterValue);
        }
        if (column?.type === 'date') {
          return new Date(value) < new Date(filterValue);
        }
        return String(value) < String(filterValue);

      case 'lte':
        if (column?.type === 'number') {
          return Number(value) <= Number(filterValue);
        }
        if (column?.type === 'date') {
          return new Date(value) <= new Date(filterValue);
        }
        return String(value) <= String(filterValue);

      case 'in':
        // Handle multi-select filter (array of values)
        if (Array.isArray(filterValue)) {
          return filterValue.some(fv =>
            String(value).toLowerCase() === String(fv).toLowerCase()
          );
        }
        return String(value).toLowerCase() === String(filterValue).toLowerCase();

      default:
        return true;
    }
  }

  // Column resizing methods
  onColumnResizeStart(event: MouseEvent, column: DataTableColumn<T>) {
    if (!this.config().resizable || column.resizable === false) return;

    event.preventDefault();
    event.stopPropagation();

    const startX = event.clientX;
    const headerElement = (event.target as HTMLElement).closest('th');
    const startWidth = headerElement?.offsetWidth || 0;

    this.resizingColumn.set({ column, startX, startWidth });
    this.isResizing.set(true);

    // Add a visual indicator during resize
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    // Find the column index more reliably
    const columnIndex = this.visibleColumns().findIndex(col => col === column);
    const table = headerElement?.closest('table');

    const onMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const newWidth = Math.max(50, startWidth + deltaX); // Minimum width of 50px
      const newWidthPx = `${newWidth}px`;

      // Update the header cell width immediately
      if (headerElement) {
        headerElement.style.width = newWidthPx;
        headerElement.style.minWidth = newWidthPx;
        headerElement.style.maxWidth = newWidthPx;
      }

      // Update all data cells in the same column
      if (table && columnIndex >= 0) {
        // Calculate the actual column position accounting for selection column
        const actualColumnIndex = columnIndex + (this.config().selectable && this.selection().mode === 'multiple' ? 1 : 0);

        // Update all rows' cells in this column
        const rows = table.querySelectorAll('tbody tr:not([hidden])');
        rows.forEach((row) => {
          const cells = row.querySelectorAll('td');
          const targetCell = cells[actualColumnIndex] as HTMLElement;
          if (targetCell) {
            targetCell.style.width = newWidthPx;
            targetCell.style.minWidth = newWidthPx;
            targetCell.style.maxWidth = newWidthPx;
          }
        });
      }
    };

    const onMouseUp = () => {
      // Reset cursor and selection
      document.body.style.cursor = '';
      document.body.style.userSelect = '';

      this.isResizing.set(false);
      const resizing = this.resizingColumn();

      if (resizing && headerElement) {
        const finalWidth = headerElement.offsetWidth;
        const finalWidthPx = `${finalWidth}px`;

        // Update the column object and trigger signal update
        const updatedColumns = this._columns().map(col => {
          if (col === resizing.column) {
            return { ...col, width: finalWidthPx };
          }
          return col;
        });

        // Update the columns signal to trigger change detection
        this._columns.set(updatedColumns);

        // Emit the resize event
        this.columnResize.emit({ column: resizing.column, width: finalWidthPx });
      }

      this.resizingColumn.set(null);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  // Grouping methods
  toggleGrouping(columnKey?: string | keyof T) {
    if (!this.config().grouping) return;

    const column = columnKey ? String(columnKey) : undefined;
    const currentGrouping = this.grouping();

    if (currentGrouping.enabled && currentGrouping.column === column) {
      // Disable grouping
      this.grouping.set({
        enabled: false,
        column: undefined,
        groups: [],
        expanded: {}
      });
    } else {
      // Enable grouping with new column
      this.grouping.set({
        enabled: true,
        column,
        groups: [],
        expanded: {}
      });
    }

    this.groupChange.emit(this.grouping());
  }

  toggleGroupExpansion(groupKey: string) {
    if (!this.config().grouping || !this.grouping().enabled) return;

    this.grouping.update(g => ({
      ...g,
      expanded: {
        ...g.expanded,
        [groupKey]: !g.expanded?.[groupKey]
      }
    }));

    this.groupChange.emit(this.grouping());
  }

  expandAllGroups() {
    if (!this.config().grouping || !this.grouping().enabled) return;

    const expanded: { [key: string]: boolean } = {};
    this.groupedData()?.forEach(group => {
      expanded[group.key] = true;
    });

    this.grouping.update(g => ({ ...g, expanded }));
    this.groupChange.emit(this.grouping());
  }

  collapseAllGroups() {
    if (!this.config().grouping || !this.grouping().enabled) return;

    const expanded: { [key: string]: boolean } = {};
    this.groupedData()?.forEach(group => {
      expanded[group.key] = false;
    });

    this.grouping.update(g => ({ ...g, expanded }));
    this.groupChange.emit(this.grouping());
  }

  // Virtual scrolling methods
  onVirtualScroll(event: Event) {
    if (!this.config().virtualScrolling || !this.virtualScrolling().enabled) return;

    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;
    this.virtualScrollTop.set(scrollTop);

    const { itemHeight, bufferSize } = this.virtualScrolling();
    const containerHeight = target.clientHeight;
    const totalItems = this.displayedData().length;

    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferSize);
    const visibleCount = Math.ceil(containerHeight / itemHeight) + (2 * bufferSize);
    const endIndex = Math.min(totalItems, startIndex + visibleCount);

    this.visibleStartIndex.set(startIndex);
    this.visibleEndIndex.set(endIndex);
    this.virtualScrollHeight.set(totalItems * itemHeight);
  }

  getVirtualRowTransform(index: number): string {
    if (!this.config().virtualScrolling || !this.virtualScrolling().enabled) return '';

    const { itemHeight } = this.virtualScrolling();
    const actualIndex = this.visibleStartIndex() + index;
    return `translateY(${actualIndex * itemHeight}px)`;
  }

  // Advanced filtering methods
  onAdvancedFilter(columnKey: string | keyof T, values: any[], operator: DataTableAdvancedFilter['operator'] = 'in') {
    if (!this.config().advancedFiltering) return;

    const column = String(columnKey);

    if (!values || values.length === 0) {
      // Remove filter if no values selected
      this.advancedFilters.update(filters => filters.filter(f => f.column !== column));
    } else {
      // Add or update advanced filter
      const existingFilterIndex = this.advancedFilters().findIndex(f => f.column === column);

      const newFilter: DataTableAdvancedFilter = {
        column,
        value: values.length === 1 ? values[0] : values,
        values,
        operator,
        logic: 'or'
      };

      if (existingFilterIndex >= 0) {
        this.advancedFilters.update(filters => {
          const updated = [...filters];
          updated[existingFilterIndex] = newFilter;
          return updated;
        });
      } else {
        this.advancedFilters.update(filters => [...filters, newFilter]);
      }
    }

    this.goToPage(0); // Reset to first page when filtering
    this.filterChange.emit([...this.filters(), ...this.advancedFilters()]);
  }

  getColumnFilterOptions(columnKey: string): any[] {
    const column = this._columns().find(col => col.key === columnKey);
    if (!column || !column.filterOptions) {
      // Generate unique values from data
      const uniqueValues = new Set();
      this._data().forEach(row => {
        const value = this.getCellValue(row, column!);
        if (value !== null && value !== undefined) {
          uniqueValues.add(value);
        }
      });
      return Array.from(uniqueValues).sort();
    }
    return column.filterOptions;
  }

  // Custom cell renderer method
  renderCellValue(row: T, column: DataTableColumn<T>): string {
    if (this.config().customRenderers && column.cellRenderer) {
      return column.cellRenderer(this.getCellValue(row, column), row, column);
    }
    return this.formatCellValue(row, column);
  }

  // Advanced filtering methods
  isFilterOptionSelected(columnKey: string, option: any): boolean {
    const filter = this.advancedFilters().find(f => f.column === columnKey);
    return filter?.values?.includes(option) || false;
  }

  toggleFilterOption(columnKey: string, option: any, event: Event) {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;

    this.advancedFilters.update(filters => {
      const existingIndex = filters.findIndex(f => f.column === columnKey);

      if (existingIndex >= 0) {
        const existing = filters[existingIndex];
        const values = existing.values || [];

        const newValues = isChecked
          ? [...values, option]
          : values.filter(v => v !== option);

        if (newValues.length === 0) {
          // Remove filter if no values selected
          return filters.filter((_, i) => i !== existingIndex);
        } else {
          // Update filter with new values
          const updated = [...filters];
          updated[existingIndex] = {
            ...existing,
            values: newValues,
            value: newValues.length === 1 ? newValues[0] : newValues
          };
          return updated;
        }
      } else if (isChecked) {
        // Add new filter
        return [...filters, {
          column: columnKey,
          value: option,
          values: [option],
          operator: 'in' as const,
          logic: 'or' as const
        }];
      }

      return filters;
    });

    this.goToPage(0);
    this.filterChange.emit([...this.filters(), ...this.advancedFilters()]);
  }

  trackByFilterOption = (index: number, option: any) => option;

  // Grouping control methods
  onGroupingChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const columnKey = target.value;

    if (columnKey) {
      this.toggleGrouping(columnKey);
    } else {
      this.toggleGrouping();
    }
  }

  // Multi-sort control methods
  clearMultiSort() {
    this.multiSort.set({ sorts: [] });
    this.sort.set({ column: '', direction: null });
    this.multiSortChange.emit({ sorts: [] });
    this.sortChange.emit({ column: '', direction: null });
  }

  removeSort(columnKey: string) {
    const currentSorts = this.multiSort().sorts.filter(s => s.column !== columnKey);
    this.multiSort.set({ sorts: currentSorts });
    this.multiSortChange.emit({ sorts: currentSorts });

    if (currentSorts.length > 0) {
      this.sort.set(currentSorts[0]);
      this.sortChange.emit(currentSorts[0]);
    } else {
      this.sort.set({ column: '', direction: null });
      this.sortChange.emit({ column: '', direction: null });
    }
  }

  getColumnLabel(columnKey: string): string {
    const column = this._columns().find(c => c.key === columnKey);
    return column?.label || columnKey;
  }

  // Selection methods
  onRowClick(row: T, index: number) {
    if (this.config().selectable && this.selection().mode === 'single') {
      this.selection.update(s => ({
        ...s,
        selectedRows: [row],
        selectAll: false
      }));
      this.selectionChange.emit([row]);
    }
  }

  isRowSelected(row: T): boolean {
    return this.selection().selectedRows.includes(row);
  }

  isAllSelected(): boolean {
    const displayed = this.displayedData();
    return displayed.length > 0 && displayed.every(row => this.isRowSelected(row));
  }

  isIndeterminate(): boolean {
    const displayed = this.displayedData();
    const selected = displayed.filter(row => this.isRowSelected(row));
    return selected.length > 0 && selected.length < displayed.length;
  }

  toggleRowSelection(row: T) {
    this.selection.update(s => {
      const isSelected = s.selectedRows.includes(row);
      const newSelectedRows = isSelected
        ? s.selectedRows.filter(r => r !== row)
        : [...s.selectedRows, row];

      return {
        ...s,
        selectedRows: newSelectedRows,
        selectAll: newSelectedRows.length === this.displayedData().length
      };
    });

    this.selectionChange.emit(this.selection().selectedRows);
  }

  toggleSelectAll() {
    const allSelected = this.isAllSelected();
    const displayed = this.displayedData();

    this.selection.update(s => {
      if (allSelected) {
        // Deselect all displayed rows
        const newSelectedRows = s.selectedRows.filter(row => !displayed.includes(row));
        return {
          ...s,
          selectedRows: newSelectedRows,
          selectAll: false
        };
      } else {
        // Select all displayed rows
        const newSelectedRows = [...s.selectedRows];
        displayed.forEach(row => {
          if (!newSelectedRows.includes(row)) {
            newSelectedRows.push(row);
          }
        });
        return {
          ...s,
          selectedRows: newSelectedRows,
          selectAll: true
        };
      }
    });

    this.selectionChange.emit(this.selection().selectedRows);
  }

  clearSelection() {
    this.selection.update(s => ({
      ...s,
      selectedRows: [],
      selectAll: false
    }));
    this.selectionChange.emit([]);
  }

  // Pagination methods
  goToPage(page: number) {
    const maxPage = Math.ceil(this.pagination().total / this.pagination().pageSize) - 1;
    const validPage = Math.max(0, Math.min(page, maxPage));

    this.pagination.update(p => ({ ...p, page: validPage }));
    this.pageChange.emit(validPage);
  }

  onPageSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const pageSize = Number(target.value);

    this.pagination.update(p => ({ ...p, pageSize, page: 0 }));
    this.pageChange.emit(0);
  }

  getPageStart(): number {
    return this.pagination().page * this.pagination().pageSize;
  }

  getPageEnd(): number {
    const { page, pageSize, total } = this.pagination();
    return Math.min((page + 1) * pageSize, total);
  }

  getVisiblePages(): (string | number)[] {
    const { page, total, pageSize } = this.pagination();
    const totalPages = Math.ceil(total / pageSize);
    const current = page + 1;
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (string | number)[] = [];

    if (current <= 4) {
      pages.push(...Array.from({ length: 5 }, (_, i) => i + 1));
      pages.push('...');
      pages.push(totalPages);
    } else if (current >= totalPages - 3) {
      pages.push(1);
      pages.push('...');
      pages.push(...Array.from({ length: 5 }, (_, i) => totalPages - 4 + i));
    } else {
      pages.push(1);
      pages.push('...');
      pages.push(current - 1, current, current + 1);
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  }

  // Editing methods
  isEditing(rowIndex: number, columnKey: string | keyof T): boolean {
    const editing = this.editingCell();
    return editing?.row === rowIndex && editing?.column === String(columnKey);
  }

  startEdit(rowIndex: number, columnKey: string | keyof T) {
    if (!this.config().editable) return;

    const column = this._columns().find(c => c.key === columnKey);
    if (column?.editable === false) return;

    this.editingCell.set({ row: rowIndex, column: String(columnKey) });
  }

  saveEdit(rowIndex: number, columnKey: string | keyof T, event: Event) {
    const target = event.target as HTMLInputElement;
    const newValue = this.parseValue(target.value, columnKey);

    const actualIndex = this.getActualRowIndex(rowIndex);
    const oldRow = this._data()[actualIndex];
    const oldValue = this.getCellValue(oldRow, { key: columnKey } as DataTableColumn<T>);

    // Validate if validator exists
    const column = this._columns().find(c => c.key === columnKey);
    if (column?.validator && !column.validator(newValue)) {
      // Reset to old value and exit
      target.value = String(oldValue);
      return;
    }

    // Update data
    this._data.update(data => {
      const updated = [...data];
      updated[actualIndex] = { ...updated[actualIndex], [columnKey]: newValue };
      return updated;
    });

    this.cellEdit.emit({ row: oldRow, column: String(columnKey), oldValue, newValue });
    this.dataChange.emit(this._data());
    this.cancelEdit();
  }

  cancelEdit() {
    this.editingCell.set(null);
  }

  // Delete confirmation methods
  confirmDeleteRow(rowIndex: number) {
    this.pendingDeleteIndex.set(rowIndex);
    this.showDeleteConfirm.set(true);
  }

  cancelDelete() {
    this.showDeleteConfirm.set(false);
    this.pendingDeleteIndex.set(-1);
  }

  confirmDelete() {
    const rowIndex = this.pendingDeleteIndex();
    if (rowIndex >= 0) {
      this.deleteRow(rowIndex);
    }
    this.cancelDelete();
  }

  deleteRow(rowIndex: number) {
    const actualIndex = this.getActualRowIndex(rowIndex);
    const row = this._data()[actualIndex];

    this._data.update(data => data.filter((_, i) => i !== actualIndex));
    this.rowDelete.emit({ row, index: actualIndex });
    this.dataChange.emit(this._data());
  }

  // Bulk delete confirmation methods
  confirmBulkDelete() {
    this.showBulkDeleteConfirm.set(true);
  }

  cancelBulkDelete() {
    this.showBulkDeleteConfirm.set(false);
  }

  executeBulkDelete() {
    const selectedRows = this.selection().selectedRows;
    const deletedRows: T[] = [...selectedRows];

    // Remove selected rows from data
    this._data.update(data => {
      return data.filter(item => !selectedRows.includes(item));
    });

    // Clear selection
    this.clearSelection();

    // Emit events for each deleted row
    deletedRows.forEach(row => {
      this.rowDelete.emit({ row, index: -1 }); // Index not available in bulk delete
    });
    this.dataChange.emit(this._data());

    // Close dialog
    this.cancelBulkDelete();
  }

  // Utility methods
  getCellValue(row: T, column: DataTableColumn<T>): any {
    const keys = String(column.key).split('.');
    let value: any = row;

    for (const key of keys) {
      value = value?.[key as keyof typeof value];
    }

    return value;
  }

  getColumnTooltip(column: DataTableColumn<T>): string {
    const tips: string[] = [];

    if (column.reorderable !== false && this.config().reorderable) {
      tips.push('Drag to reorder');
    }
    if (column.sortable !== false && this.config().sortable) {
      if (this.config().multiSort) {
        tips.push('Click to sort, Ctrl+Click for multi-sort');
      } else {
        tips.push('Click to sort');
      }
    }
    if (column.resizable !== false && this.config().resizable) {
      tips.push('Drag right edge to resize');
    }
    if (column.groupable !== false && this.config().grouping) {
      tips.push('Click group icon to group by this column');
    }

    return tips.join(', ') || column.label;
  }

  formatCellValue(row: T, column: DataTableColumn<T>): string {
    const value = this.getCellValue(row, column);

    if (value == null) return '';

    if (column.formatter) {
      return column.formatter(value);
    }

    switch (column.type) {
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'boolean':
        return value ? 'Yes' : 'No';
      case 'number':
        return Number(value).toLocaleString();
      default:
        return String(value);
    }
  }

  getInputType(column: DataTableColumn<T>): string {
    switch (column.type) {
      case 'number': return 'number';
      case 'date': return 'date';
      case 'email': return 'email';
      case 'url': return 'url';
      case 'boolean': return 'checkbox';
      default: return 'text';
    }
  }

  parseValue(value: string, columnKey: string | keyof T): any {
    const column = this._columns().find(c => c.key === columnKey);

    switch (column?.type) {
      case 'number':
        return Number(value) || 0;
      case 'boolean':
        return value === 'true' || value === 'on';
      case 'date':
        return new Date(value);
      default:
        return value;
    }
  }

  getActualRowIndex(displayIndex: number): number {
    const { page, pageSize } = this.pagination();
    return this.config().paginated ? (page * pageSize) + displayIndex : displayIndex;
  }

  // Action methods
  exportData(format: 'csv' | 'json' = 'csv') {
    this.showExportMenu.set(false); // Close the menu
    const data = this.filteredData();

    if (format === 'json') {
      const json = this.convertToJSON(data);
      this.downloadJSON(json, 'data-export.json');
    } else {
      const csv = this.convertToCSV(data);
      this.downloadCSV(csv, 'data-export.csv');
    }

    this.export.emit(format);
  }

  convertToCSV(data: T[]): string {
    if (data.length === 0) return '';

    const headers = this.visibleColumns().map(col => col.label);
    const rows = data.map(row =>
      this.visibleColumns().map(col => {
        const value = this.getCellValue(row, col);
        return `"${String(value || '').replace(/"/g, '""')}"`;
      })
    );

    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  }

  convertToJSON(data: T[]): string {
    const exportData = data.map(row => {
      const exportRow: any = {};
      this.visibleColumns().forEach(col => {
        exportRow[col.label] = this.getCellValue(row, col);
      });
      return exportRow;
    });
    return JSON.stringify(exportData, null, 2);
  }

  downloadCSV(csv: string, filename: string) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  downloadJSON(json: string, filename: string) {
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  refresh() {
    this.loading.set(true);
    this.refreshRequested.emit(true);

    // Simulate loading delay
    setTimeout(() => {
      this.loading.set(false);
    }, 1000);
  }

  // Column reordering methods
  onColumnDragStart(event: DragEvent, columnIndex: number) {
    if (!this.config().reorderable) return;

    const column = this.visibleColumns()[columnIndex];
    if (column?.reorderable === false) {
      event.preventDefault();
      return;
    }

    this.draggedColumnIndex.set(columnIndex);
    this.isDragging.set(true);

    // Set drag data
    event.dataTransfer!.effectAllowed = 'move';
    event.dataTransfer!.setData('text/plain', columnIndex.toString());

    // Add a slight delay to ensure proper visual feedback
    setTimeout(() => {
      const target = event.target as HTMLElement;
      target.style.opacity = '0.5';
    }, 0);
  }

  onColumnDragOver(event: DragEvent, columnIndex: number) {
    if (!this.config().reorderable || !this.isDragging()) return;

    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';

    if (columnIndex !== this.draggedColumnIndex()) {
      this.dragOverColumnIndex.set(columnIndex);
    }
  }

  onColumnDragEnter(event: DragEvent, columnIndex: number) {
    if (!this.config().reorderable || !this.isDragging()) return;

    event.preventDefault();
    this.dragOverColumnIndex.set(columnIndex);
  }

  onColumnDragLeave(event: DragEvent, columnIndex: number) {
    if (!this.config().reorderable || !this.isDragging()) return;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;

    // Only clear if we're actually leaving the element
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      if (this.dragOverColumnIndex() === columnIndex) {
        this.dragOverColumnIndex.set(-1);
      }
    }
  }

  onColumnDrop(event: DragEvent, targetColumnIndex: number) {
    if (!this.config().reorderable || !this.isDragging()) return;

    event.preventDefault();

    const fromIndex = this.draggedColumnIndex();
    const toIndex = targetColumnIndex;

    if (fromIndex !== -1 && fromIndex !== toIndex) {
      // Create new column array with reordered columns
      const currentColumns = [...this._columns()];
      const visibleColumns = [...this.visibleColumns()];

      // Get the column being moved
      const movedColumn = visibleColumns[fromIndex];

      // Remove from old position and insert at new position
      const reorderedVisible = [...visibleColumns];
      reorderedVisible.splice(fromIndex, 1);
      reorderedVisible.splice(toIndex, 0, movedColumn);

      // Rebuild the full columns array maintaining hidden columns in their positions
      const newColumns = [...currentColumns];
      let visibleIndex = 0;

      for (let i = 0; i < newColumns.length; i++) {
        if (!newColumns[i].hidden) {
          newColumns[i] = reorderedVisible[visibleIndex];
          visibleIndex++;
        }
      }

      // Update the columns
      this._columns.set(newColumns);

      // Emit the reorder event
      const reorderEvent: DataTableColumnReorderEvent<T> = {
        fromIndex,
        toIndex,
        column: movedColumn,
        columns: newColumns
      };

      this.columnReorder.emit(reorderEvent);
    }

    // Reset drag state
    this.resetDragState();
  }

  onColumnDragEnd(event: DragEvent) {
    // Reset visual state
    const target = event.target as HTMLElement;
    target.style.opacity = '';

    this.resetDragState();
  }

  private resetDragState() {
    this.draggedColumnIndex.set(-1);
    this.dragOverColumnIndex.set(-1);
    this.isDragging.set(false);
  }

  // Column pinning methods
  getColumnPinnedOffset(column: DataTableColumn<T>, side: 'left' | 'right'): string {
    if (!this.config().pinColumns || !column.pinned) return '0px';

    const columns = this.visibleColumns();
    let offset = 0;

    if (side === 'left' && column.pinned === 'left') {
      const leftColumns = columns.filter(col => col.pinned === 'left');
      const currentIndex = leftColumns.findIndex(col => col.key === column.key);

      for (let i = 0; i < currentIndex; i++) {
        const width = leftColumns[i].width || '150px';
        offset += parseInt(width.replace('px', '')) || 150;
      }
    } else if (side === 'right' && column.pinned === 'right') {
      const rightColumns = columns.filter(col => col.pinned === 'right');
      const currentIndex = rightColumns.findIndex(col => col.key === column.key);

      for (let i = rightColumns.length - 1; i > currentIndex; i--) {
        const width = rightColumns[i].width || '150px';
        offset += parseInt(width.replace('px', '')) || 150;
      }
    }

    return `${offset}px`;
  }

  // Track by functions
  trackByColumn = (index: number, column: DataTableColumn<T>) => column.key;
  trackByRow = (index: number, row: T) => index;
  trackByGroup = (index: number, group: DataTableGroup<T>) => group.key;
}
