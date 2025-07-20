# DataTable Component

A powerful, feature-rich data table component built for Angular applications. The DataTable provides comprehensive functionality for displaying, sorting, filtering, editing, and managing large datasets with a beautiful, responsive interface.

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [API Reference](#api-reference)
- [Configuration Options](#configuration-options)
- [Column Configuration](#column-configuration)
- [Events & Event Handling](#events--event-handling)
- [Examples](#examples)
- [Advanced Features](#advanced-features)
- [Theming](#theming)
- [Best Practices](#best-practices)

## Installation

```bash
npx ngsui-cli add data-table
```

## Basic Usage

```typescript
import { Component, signal } from '@angular/core';
import { DataTable, DataTableColumn } from '@angular-superui/data-table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [DataTable],
  template: `
    <DataTable
      [data]="users()"
      [columns]="columns()"
      [initialPageSize]="10"
      [pageSizeOptions]="[5, 10, 25, 50]"
      (selectionChange)="onSelectionChange($event)"
      (cellEdit)="onCellEdit($event)"
    />
  `
})
export class ExampleComponent {
  users = signal<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      active: true,
      createdAt: new Date('2023-01-15')
    },
    // ... more data
  ]);

  columns = signal<DataTableColumn<User>[]>([
    {
      key: 'id',
      label: 'ID',
      type: 'number',
      sortable: true,
      width: '80px'
    },
    {
      key: 'name',
      label: 'Name',
      type: 'string',
      sortable: true,
      filterable: true,
      editable: true
    },
    {
      key: 'email',
      label: 'Email',
      type: 'email',
      sortable: true,
      filterable: true,
      editable: true
    },
    {
      key: 'role',
      label: 'Role',
      type: 'string',
      sortable: true,
      filterable: true
    },
    {
      key: 'active',
      label: 'Status',
      type: 'boolean',
      sortable: true,
      filterable: true,
      formatter: (value: boolean) => value ? 'Active' : 'Inactive'
    },
    {
      key: 'createdAt',
      label: 'Created',
      type: 'date',
      sortable: true,
      filterable: true,
      formatter: (value: Date) => value.toLocaleDateString()
    }
  ]);

  onSelectionChange(selectedRows: User[]) {
    console.log('Selected rows:', selectedRows);
  }

  onCellEdit(event: { row: User; column: string; oldValue: any; newValue: any }) {
    console.log('Cell edited:', event);
  }
}
```

## API Reference

### Component Selector

```html
<DataTable />
```

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `data` | `T[]` | `[]` | Array of data objects to display |
| `columns` | `DataTableColumn<T>[]` | `[]` | Column configuration array |
| `variant` | `'default' \| 'bordered' \| 'minimal' \| 'elevated'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size of the table and text |
| `density` | `'compact' \| 'default' \| 'comfortable'` | `'default'` | Row height density |
| `config` | `Partial<DataTableConfig>` | See below | Feature configuration object |
| `maxHeight` | `string` | `'600px'` | Maximum height of the table container |
| `initialPageSize` | `number` | `5` | Initial number of rows per page |
| `pageSizeOptions` | `number[]` | `[5, 10, 20, 50, 100]` | Available page size options |
| `showFirstLast` | `boolean` | `true` | Show first/last page buttons |
| `showPageInfo` | `boolean` | `true` | Show page information text |
| `showPageSizeSelector` | `boolean` | `true` | Show page size selector dropdown |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `dataChange` | `EventEmitter<T[]>` | Emitted when data changes |
| `selectionChange` | `EventEmitter<T[]>` | Emitted when row selection changes |
| `sortChange` | `EventEmitter<DataTableSort>` | Emitted when sorting changes |
| `filterChange` | `EventEmitter<DataTableFilter[]>` | Emitted when filters change |
| `pageChange` | `EventEmitter<number>` | Emitted when page changes |
| `cellEdit` | `EventEmitter<CellEditEvent>` | Emitted when a cell is edited |
| `rowEdit` | `EventEmitter<RowEditEvent>` | Emitted when row edit is triggered |
| `rowDelete` | `EventEmitter<RowDeleteEvent>` | Emitted when row delete is triggered |
| `refreshRequested` | `EventEmitter<boolean>` | Emitted when refresh is requested |
| `export` | `EventEmitter<string>` | Emitted when export is triggered |

### Events & Event Handling

The DataTable component emits various events that allow you to handle user interactions:

```typescript
// Handle selection changes
onSelectionChange(selectedRows: User[]) {
  console.log('Selected:', selectedRows);
  this.selectedUsers.set(selectedRows);
}

// Handle cell editing
onCellEdit(event: CellEditEvent<User>) {
  const { row, column, oldValue, newValue } = event;
  
  // Validate the new value
  if (this.validateCellValue(column, newValue)) {
    // Update your data source
    this.updateUserData(row.id, column, newValue);
  } else {
    // Revert the change
    console.error('Invalid value:', newValue);
  }
}

// Handle sorting
onSortChange(sort: DataTableSort) {
  if (sort.direction) {
    // Apply sorting to your data
    this.sortData(sort.column, sort.direction);
  }
}

// Handle filtering
onFilterChange(filters: DataTableFilter[]) {
  // Apply filters to your data source
  this.applyFilters(filters);
}

// Handle pagination
onPageChange(page: number) {
  this.currentPage.set(page);
  // Load data for the new page if using server-side pagination
  this.loadPageData(page);
}

// Handle export requests
onExport(format: string) {
  switch (format) {
    case 'csv':
      this.exportService.exportToCsv(this.data(), 'users.csv');
      break;
    case 'json':
      this.exportService.exportToJson(this.data(), 'users.json');
      break;
  }
}
```

### Event Types

```typescript
interface CellEditEvent<T = any> {
  row: T;
  column: string;
  oldValue: any;
  newValue: any;
}

interface RowEditEvent<T = any> {
  row: T;
  index: number;
}

interface RowDeleteEvent<T = any> {
  row: T;
  index: number;
}
```

## Configuration Options

### DataTableConfig Interface

```typescript
interface DataTableConfig {
  sortable: boolean;          // Enable column sorting
  filterable: boolean;        // Enable column filters
  searchable: boolean;        // Enable global search
  paginated: boolean;         // Enable pagination
  selectable: boolean;        // Enable row selection
  editable: boolean;          // Enable inline editing
  resizable: boolean;         // Enable column resizing
  reorderable: boolean;       // Enable column reordering
  exportable: boolean;        // Enable data export
  virtualScrolling: boolean;  // Enable virtual scrolling for large datasets
  lazyLoading: boolean;       // Enable lazy loading
  stickyHeader: boolean;      // Make header sticky on scroll
  showToolbar: boolean;       // Show toolbar with search and actions
  showFooter: boolean;        // Show footer with pagination
  striped: boolean;           // Alternate row colors
  bordered: boolean;          // Show borders around cells
  hoverable: boolean;         // Highlight rows on hover
  compact: boolean;           // Use compact layout
  elevated: boolean;          // Apply elevation shadow
}
```

### Default Configuration

```typescript
const defaultConfig: DataTableConfig = {
  sortable: true,
  filterable: true,
  searchable: true,
  paginated: true,
  selectable: true,
  editable: true,
  resizable: false,
  reorderable: false,
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
  elevated: false
};
```

## Column Configuration

### DataTableColumn Interface

```typescript
interface DataTableColumn<T = any> {
  key: string;                    // Property key in data object
  label: string;                  // Display label for column header
  sortable?: boolean;             // Enable sorting for this column
  filterable?: boolean;           // Enable filtering for this column
  searchable?: boolean;           // Include in global search
  editable?: boolean;             // Enable inline editing
  width?: string;                 // Fixed width (e.g., '100px', '20%')
  minWidth?: string;              // Minimum width
  maxWidth?: string;              // Maximum width
  type?: ColumnType;              // Data type for formatting and validation
  formatter?: (value: any) => string;  // Custom display formatter
  validator?: (value: any) => boolean | string;  // Validation function
  cellTemplate?: any;             // Custom cell template
  headerTemplate?: any;           // Custom header template
  cssClass?: string;              // Custom CSS classes
  align?: 'left' | 'center' | 'right';  // Text alignment
  sticky?: boolean;               // Make column sticky
  resizable?: boolean;            // Allow column resizing
  hidden?: boolean;               // Hide column
}
```

### Column Types

```typescript
type ColumnType = 'string' | 'number' | 'date' | 'boolean' | 'email' | 'url';
```

## Examples

### Example 1: Basic Table

```typescript
@Component({
  template: `
    <DataTable
      [data]="products()"
      [columns]="productColumns()"
    />
  `
})
export class BasicTableExample {
  products = signal([
    { id: 1, name: 'Product A', price: 29.99, category: 'Electronics' },
    { id: 2, name: 'Product B', price: 19.99, category: 'Books' },
  ]);

  productColumns = signal<DataTableColumn[]>([
    { key: 'id', label: 'ID', type: 'number', width: '80px' },
    { key: 'name', label: 'Product Name', type: 'string' },
    { key: 'price', label: 'Price', type: 'number', formatter: (value) => `$${value.toFixed(2)}` },
    { key: 'category', label: 'Category', type: 'string' }
  ]);
}
```

### Example 2: Editable Table

```typescript
@Component({
  template: `
    <DataTable
      [data]="users()"
      [columns]="userColumns()"
      [config]="editableConfig()"
      (cellEdit)="onCellEdit($event)"
      (rowEdit)="onRowEdit($event)"
      (rowDelete)="onRowDelete($event)"
    />
  `
})
export class EditableTableExample {
  users = signal<User[]>([...]);

  userColumns = signal<DataTableColumn<User>[]>([
    { key: 'name', label: 'Name', editable: true, validator: (value) => value.length > 0 },
    { key: 'email', label: 'Email', type: 'email', editable: true },
    { key: 'role', label: 'Role', editable: true }
  ]);

  editableConfig = signal({
    editable: true,
    selectable: true
  });

  onCellEdit(event: CellEditEvent<User>) {
    console.log('Cell edited:', event);
    // Update your data source
  }

  onRowEdit(event: RowEditEvent<User>) {
    console.log('Row edit triggered:', event);
    // Open edit dialog or inline edit mode
  }

  onRowDelete(event: RowDeleteEvent<User>) {
    console.log('Row delete triggered:', event);
    // Confirm and delete row
  }
}
```

### Example 3: Advanced Filtering and Sorting

```typescript
@Component({
  template: `
    <DataTable
      [data]="orders()"
      [columns]="orderColumns()"
      [config]="advancedConfig()"
      (sortChange)="onSortChange($event)"
      (filterChange)="onFilterChange($event)"
    />
  `
})
export class AdvancedTableExample {
  orders = signal<Order[]>([...]);

  orderColumns = signal<DataTableColumn<Order>[]>([
    {
      key: 'orderNumber',
      label: 'Order #',
      sortable: true,
      filterable: true,
      width: '120px'
    },
    {
      key: 'customer',
      label: 'Customer',
      sortable: true,
      filterable: true,
      editable: true
    },
    {
      key: 'total',
      label: 'Total',
      type: 'number',
      sortable: true,
      filterable: true,
      formatter: (value) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value)
    },
    {
      key: 'status',
      label: 'Status',
      filterable: true,
      formatter: (value) => value.toUpperCase(),
      cssClass: 'font-semibold'
    },
    {
      key: 'orderDate',
      label: 'Order Date',
      type: 'date',
      sortable: true,
      filterable: true,
      formatter: (value) => new Date(value).toLocaleDateString()
    }
  ]);

  advancedConfig = signal({
    sortable: true,
    filterable: true,
    searchable: true,
    exportable: true,
    stickyHeader: true
  });

  onSortChange(sort: DataTableSort) {
    console.log('Sort changed:', sort);
    // Implement server-side sorting if needed
  }

  onFilterChange(filters: DataTableFilter[]) {
    console.log('Filters changed:', filters);
    // Implement server-side filtering if needed
  }
}
```

### Example 4: Custom Cell Templates

```typescript
@Component({
  template: `
    <DataTable
      [data]="employees()"
      [columns]="employeeColumns()"
    />
    
    <!-- Custom templates -->
    <ng-template #avatarTemplate let-value="value" let-row="row">
      <div class="flex items-center gap-2">
        <img [src]="row.avatar" [alt]="value" class="w-8 h-8 rounded-full">
        <span>{{ value }}</span>
      </div>
    </ng-template>
    
    <ng-template #statusTemplate let-value="value">
      <span 
        class="px-2 py-1 rounded-full text-xs font-medium"
        [ngClass]="{
          'bg-green-100 text-green-800': value === 'active',
          'bg-red-100 text-red-800': value === 'inactive',
          'bg-yellow-100 text-yellow-800': value === 'pending'
        }"
      >
        {{ value | titlecase }}
      </span>
    </ng-template>
    
    <ng-template #actionsTemplate let-row="row" let-index="index">
      <div class="flex gap-1">
        <button 
          class="px-2 py-1 text-blue-600 hover:bg-blue-100 rounded text-sm"
          (click)="editEmployee(row)"
        >
          Edit
        </button>
        <button 
          class="px-2 py-1 text-red-600 hover:bg-red-100 rounded text-sm"
          (click)="deleteEmployee(row, index)"
        >
          Delete
        </button>
      </div>
    </ng-template>
  `
})
export class CustomTemplateExample {
  @ViewChild('avatarTemplate') avatarTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild('actionsTemplate') actionsTemplate!: TemplateRef<any>;

  employees = signal<Employee[]>([...]);

  employeeColumns = computed(() => [
    {
      key: 'name',
      label: 'Employee',
      cellTemplate: this.avatarTemplate
    },
    {
      key: 'department',
      label: 'Department',
      sortable: true,
      filterable: true
    },
    {
      key: 'salary',
      label: 'Salary',
      type: 'number',
      formatter: (value) => `$${value.toLocaleString()}`
    },
    {
      key: 'status',
      label: 'Status',
      cellTemplate: this.statusTemplate,
      filterable: true
    },
    {
      key: 'actions',
      label: 'Actions',
      cellTemplate: this.actionsTemplate,
      width: '120px',
      sortable: false
    }
  ]);

  editEmployee(employee: Employee) {
    // Handle edit
  }

  deleteEmployee(employee: Employee, index: number) {
    // Handle delete
  }
}
```

### Example 5: Responsive Configuration

```typescript
@Component({
  template: `
    <DataTable
      [data]="data()"
      [columns]="responsiveColumns()"
      [config]="responsiveConfig()"
      [initialPageSize]="pageSize()"
      [pageSizeOptions]="pageSizeOptions()"
      variant="default"
      size="default"
      density="default"
      class="w-full"
    />
  `
})
export class ResponsiveTableExample {
  // Responsive page sizes based on screen size
  pageSize = computed(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 5 : 10;
    }
    return 10;
  });

  pageSizeOptions = signal([5, 10, 20, 50]);

  responsiveColumns = signal<DataTableColumn[]>([
    { key: 'id', label: 'ID', width: '60px', sticky: true },
    { key: 'name', label: 'Name', minWidth: '150px' },
    { key: 'email', label: 'Email', minWidth: '200px', hidden: false },
    { 
      key: 'phone', 
      label: 'Phone', 
      minWidth: '150px',
      // Hide on mobile
      cssClass: 'hidden sm:table-cell'
    },
    { 
      key: 'department', 
      label: 'Department',
      // Hide on small screens
      cssClass: 'hidden md:table-cell'
    }
  ]);

  responsiveConfig = signal({
    sortable: true,
    filterable: true,
    searchable: true,
    paginated: true,
    stickyHeader: true,
    showToolbar: true,
    showFooter: true,
    striped: true,
    hoverable: true
  });
}
```

## Quick Start

### CLI Installation

```bash
npx ngsui-cli add data-table
```

### Documentation

📖 **[View Complete Documentation](https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/data-table.md)** - Comprehensive guide with API reference, examples, and best practices.

## Advanced Features

### Virtual Scrolling

For large datasets, enable virtual scrolling:

```typescript
@Component({
  template: `
    <DataTable
      [data]="largeDataset()"
      [columns]="columns()"
      [config]="virtualConfig()"
      maxHeight="400px"
    />
  `
})
export class VirtualScrollExample {
  virtualConfig = signal({
    virtualScrolling: true,
    paginated: false,  // Disable pagination with virtual scrolling
    stickyHeader: true
  });
}
```

### Export Functionality

```typescript
@Component({
  template: `
    <DataTable
      [data]="data()"
      [columns]="columns()"
      [config]="exportConfig()"
      (export)="onExport($event)"
    />
  `
})
export class ExportExample {
  exportConfig = signal({
    exportable: true
  });

  onExport(format: string) {
    switch (format) {
      case 'csv':
        this.exportToCsv();
        break;
      case 'json':
        this.exportToJson();
        break;
    }
  }

  private exportToCsv() {
    // Implement CSV export
  }

  private exportToJson() {
    // Implement JSON export
  }
}
```

### Server-Side Operations

```typescript
@Component({
  template: `
    <DataTable
      [data]="serverData()"
      [columns]="columns()"
      [config]="serverConfig()"
      (sortChange)="onServerSort($event)"
      (filterChange)="onServerFilter($event)"
      (pageChange)="onServerPage($event)"
    />
  `
})
export class ServerSideExample {
  serverData = signal<any[]>([]);
  loading = signal(false);

  serverConfig = signal({
    lazyLoading: true,
    paginated: true
  });

  async onServerSort(sort: DataTableSort) {
    this.loading.set(true);
    try {
      const data = await this.apiService.getData({
        sort: sort.column,
        direction: sort.direction
      });
      this.serverData.set(data);
    } finally {
      this.loading.set(false);
    }
  }

  async onServerFilter(filters: DataTableFilter[]) {
    this.loading.set(true);
    try {
      const data = await this.apiService.getData({ filters });
      this.serverData.set(data);
    } finally {
      this.loading.set(false);
    }
  }

  async onServerPage(page: number) {
    this.loading.set(true);
    try {
      const data = await this.apiService.getData({ page });
      this.serverData.set(data);
    } finally {
      this.loading.set(false);
    }
  }
}
```

## Theming

### CSS Custom Properties

The DataTable component supports theming through CSS custom properties:

```css
:root {
  --datatable-bg: #ffffff;
  --datatable-text: #1f2937;
  --datatable-border: #e5e7eb;
  --datatable-header-bg: #f9fafb;
  --datatable-row-hover: #f3f4f6;
  --datatable-selected: #dbeafe;
  --datatable-primary: #3b82f6;
}

[data-theme="dark"] {
  --datatable-bg: #111827;
  --datatable-text: #f9fafb;
  --datatable-border: #374151;
  --datatable-header-bg: #1f2937;
  --datatable-row-hover: #374151;
  --datatable-selected: #1e40af;
  --datatable-primary: #60a5fa;
}
```

### Variant Classes

```css
/* Custom variant styles */
.datatable--minimal {
  @apply border-0 shadow-none;
}

.datatable--elevated {
  @apply shadow-xl border-0;
}

.datatable--bordered {
  @apply border-2 border-gray-300;
}
```

## Best Practices

### 1. Performance Optimization

```typescript
// Use OnPush change detection
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})

// Use trackBy functions for large datasets
trackByFn(index: number, item: any) {
  return item.id;
}

// Enable virtual scrolling for large datasets
config = signal({
  virtualScrolling: true
});
```

### 2. Accessibility

```typescript
// Provide meaningful column labels
columns = signal([
  {
    key: 'status',
    label: 'Account Status',
    formatter: (value) => value ? 'Active' : 'Inactive'
  }
]);

// Use semantic HTML in custom templates
// ✅ Good
template: `
  <button aria-label="Edit user">Edit</button>
`

// ❌ Avoid
template: `
  <div (click)="edit()">Edit</div>
`
```

### 3. Data Management

```typescript
// Use signals for reactive data
data = signal<User[]>([]);

// Implement proper error handling
async loadData() {
  try {
    const users = await this.userService.getUsers();
    this.data.set(users);
  } catch (error) {
    console.error('Failed to load data:', error);
    // Show error message to user
  }
}

// Validate data before setting
setData(newData: User[]) {
  if (Array.isArray(newData)) {
    this.data.set(newData);
  }
}
```

### 4. Column Configuration

```typescript
// Use type-safe column definitions
interface User {
  id: number;
  name: string;
  email: string;
}

columns = signal<DataTableColumn<User>[]>([
  {
    key: 'name', // TypeScript will ensure this is a valid key
    label: 'Full Name',
    sortable: true
  }
]);

// Provide validators for editable columns
{
  key: 'email',
  label: 'Email',
  editable: true,
  validator: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || 'Invalid email format';
  }
}
```

### 5. Responsive Design

```typescript
// Use responsive column configuration
columns = computed(() => {
  const baseColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ];

  // Add optional columns on larger screens
  if (this.screenWidth() > 768) {
    baseColumns.push(
      { key: 'phone', label: 'Phone' },
      { key: 'department', label: 'Department' }
    );
  }

  return baseColumns;
});
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](../../LICENSE) file for details.
