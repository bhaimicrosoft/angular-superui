# Pagination Component 📄

A beautiful, responsive, and highly accessible pagination component built with Angular signals, featuring mobile-first design, enterprise-grade features, and security-focused architecture.

## Features

- 🚀 **Enterprise-Grade** - Production-ready with advanced features
- 📱 **Mobile-First** - Responsive design with smart scrollbars and adaptive page visibility
- ♿ **Fully Accessible** - WCAG 2.1 AA compliant with comprehensive ARIA support
- 🔐 **Security-Focused** - No innerHTML usage, XSS protection, static SVG templates
- 🎯 **Smart Navigation** - Intelligent ellipsis handling and responsive page logic
- 📏 **3 Sizes** - Small, Default, Large variants
- 🎨 **Customizable** - CVA-based styling with Tailwind CSS
- 🔧 **TypeScript** - Full type safety with Angular signals architecture
- 🌙 **Dark Mode** - Built-in dark mode support with smooth transitions
- 📊 **Data Integration** - Perfect for data tables and search results

## Installation

Initialize Angular SuperUI in your project:

```bash
ngsui-cli init
```

Add the Pagination component:

```bash
ngsui-cli add pagination
```

## Basic Usage

Import the Pagination component in your Angular component:

```typescript
import { Component, signal } from '@angular/core';
import { Pagination } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Pagination],
  template: `
    <Pagination
      [totalItems]="1000"
      [itemsPerPage]="10"
      [currentPage]="currentPage()"
      (pageChange)="currentPage.set($event)"
    />
  `
})
export class ExampleComponent {
  currentPage = signal(1);
}
```

## Examples

### Default Pagination

```typescript
@Component({
  template: `
    <Pagination
      [totalItems]="1000"
      [itemsPerPage]="10"
      [currentPage]="currentPage()"
      [showFirstLast]="true"
      [showInfo]="true"
      (pageChange)="currentPage.set($event)"
    />
  `
})
export class DefaultExample {
  currentPage = signal(1);
}
```

### Small Size (Compact)

```typescript
@Component({
  template: `
    <Pagination
      [totalItems]="500"
      [itemsPerPage]="20"
      [currentPage]="currentPage()"
      [size]="'sm'"
      [showFirstLast]="true"
      (pageChange)="currentPage.set($event)"
    />
  `
})
export class SmallExample {
  currentPage = signal(1);
}
```

### Large Size (Enhanced Visibility)

```typescript
@Component({
  template: `
    <Pagination
      [totalItems]="2000"
      [itemsPerPage]="25"
      [currentPage]="currentPage()"
      [size]="'lg'"
      [showFirstLast]="true"
      [showInfo]="true"
      (pageChange)="currentPage.set($event)"
    />
  `
})
export class LargeExample {
  currentPage = signal(1);
}
```

### Data Table Integration

```typescript
@Component({
  template: `
    <!-- Table Container -->
    <div class="overflow-x-auto">
      <table class="w-full" role="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          @for (item of getCurrentPageData(); track item.id) {
            <tr>
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.status }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <Pagination
      [totalItems]="allData.length"
      [itemsPerPage]="itemsPerPage()"
      [currentPage]="currentPage()"
      [maxVisiblePages]="7"
      [showFirstLast]="true"
      [showInfo]="true"
      (pageChange)="onPageChange($event)"
    />
  `
})
export class DataTableExample {
  currentPage = signal(1);
  itemsPerPage = signal(10);
  
  allData = [/* your data array */];
  
  getCurrentPageData() {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this.allData.slice(start, end);
  }
  
  onPageChange(page: number) {
    this.currentPage.set(page);
    // Optional: Update URL, fetch new data, etc.
  }
}
```

### Few Pages (No Ellipsis)

```typescript
@Component({
  template: `
    <Pagination
      [totalItems]="50"
      [itemsPerPage]="10"
      [currentPage]="currentPage()"
      [showFirstLast]="false"
      (pageChange)="currentPage.set($event)"
    />
  `
})
export class FewPagesExample {
  currentPage = signal(2);
}
```

### Many Pages (Smart Ellipsis)

```typescript
@Component({
  template: `
    <Pagination
      [totalItems]="10000"
      [itemsPerPage]="10"
      [currentPage]="currentPage()"
      [maxVisiblePages]="5"
      [showFirstLast]="true"
      (pageChange)="currentPage.set($event)"
    />
  `
})
export class ManyPagesExample {
  currentPage = signal(451);
}
```

### With Result Info

```typescript
@Component({
  template: `
    <Pagination
      [totalItems]="1234"
      [itemsPerPage]="10"
      [currentPage]="currentPage()"
      [showInfo]="true"
      [showFirstLast]="true"
      (pageChange)="currentPage.set($event)"
    />
  `
})
export class WithInfoExample {
  currentPage = signal(5);
}
```

### Compact Mode (Icons Only)

```typescript
@Component({
  template: `
    <Pagination
      [totalItems]="500"
      [itemsPerPage]="25"
      [currentPage]="currentPage()"
      [showLabels]="false"
      [showFirstLast]="true"
      [size]="'sm'"
      (pageChange)="currentPage.set($event)"
    />
  `
})
export class CompactExample {
  currentPage = signal(8);
}
```

## API Reference

### Input Properties

#### Required Inputs

| Property | Type | Description |
|----------|------|-------------|
| `totalItems` | `number` | Total number of items to paginate |
| `currentPage` | `number` | Current active page number (1-indexed) |

#### Optional Configuration Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `itemsPerPage` | `number` | `10` | Number of items per page |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Visual size variant |
| `maxVisiblePages` | `number` | `7` | Maximum page buttons to show (responsive) |
| `showLabels` | `boolean` | `true` | Show text labels on navigation buttons |
| `showInfo` | `boolean` | `false` | Display result information |
| `showFirstLast` | `boolean` | `false` | Show First and Last navigation buttons |
| `ariaLabel` | `string` | `'Pagination Navigation'` | ARIA label for accessibility |
| `customClass` | `string` | `''` | Additional CSS classes |

### Output Events

| Event | Type | Description |
|-------|------|-------------|
| `pageChange` | `OutputEmitterRef<number>` | Emitted when page changes |

### Public Methods

| Method | Description |
|--------|-------------|
| `goToPage(page: number)` | Navigate to specific page |
| `goToPrevious()` | Navigate to previous page |
| `goToNext()` | Navigate to next page |
| `goToFirst()` | Navigate to first page |
| `goToLast()` | Navigate to last page |
| `getStartItem()` | Get starting item number for current page |
| `getEndItem()` | Get ending item number for current page |

### Computed Properties

| Property | Type | Description |
|----------|------|-------------|
| `totalPages` | `Signal<number>` | Total number of pages |
| `isPreviousDisabled` | `Signal<boolean>` | Whether Previous button is disabled |
| `isNextDisabled` | `Signal<boolean>` | Whether Next button is disabled |
| `isFirstDisabled` | `Signal<boolean>` | Whether First button is disabled |
| `isLastDisabled` | `Signal<boolean>` | Whether Last button is disabled |
| `visiblePages` | `Signal<PageItem[]>` | Array of visible page items |

## Responsive Features

### Mobile-First Design

- **Smart Page Reduction**: Automatically reduces visible pages on smaller screens
- **Touch-Friendly**: Optimized button sizes and spacing for mobile devices
- **Responsive Text**: Labels hide on small screens when space is limited

### Adaptive Scrollbars

- **Mobile/Tablet**: Horizontal scrollbars appear when content overflows
- **Desktop**: Scrollbars are hidden by default, appear on hover
- **Cross-Browser**: Consistent styling across Chrome, Safari, Firefox, and Edge

### Responsive Page Logic

```typescript
// Mobile (< 640px): Maximum 3 pages to ensure navigation buttons are visible
// Tablet (640px - 1024px): Up to 5 pages with smart ellipsis
// Desktop (> 1024px): Full maxVisiblePages with complete ellipsis logic
```

## Accessibility Features

### ARIA Support

- **Navigation Role**: Proper semantic structure with `role="navigation"`
- **Current Page**: `aria-current="page"` for active page
- **Button Labels**: Descriptive `aria-label` for all navigation buttons
- **Live Region**: Screen reader announcements for page changes

### Keyboard Navigation

- **Tab Order**: Logical tab sequence through all interactive elements
- **Enter/Space**: Activate buttons and navigation
- **Focus Indicators**: Clear visual focus states with ring styling

### Screen Reader Support

- **Semantic HTML**: Proper button and navigation elements
- **Descriptive Text**: Clear button labels and status information
- **State Changes**: Announced page transitions and loading states

## Security Features

### XSS Protection

- **No innerHTML**: Static SVG templates only, no HTML injection risks
- **Sanitized Inputs**: All user inputs are properly validated
- **Static Templates**: Security-first architecture prevents code injection

### Input Validation

- **Range Checking**: Page numbers validated against valid ranges
- **Type Safety**: TypeScript ensures correct data types
- **Boundary Protection**: Prevents navigation beyond valid pages

## Styling and Theming

### CSS Variables

The component uses CSS custom properties for easy theming:

```css
.pagination-component {
  --pagination-bg: theme('colors.white');
  --pagination-text: theme('colors.slate.700');
  --pagination-border: theme('colors.slate.200');
  --pagination-hover: theme('colors.slate.50');
  --pagination-active: theme('colors.blue.600');
}

.dark .pagination-component {
  --pagination-bg: theme('colors.slate.800');
  --pagination-text: theme('colors.slate.300');
  --pagination-border: theme('colors.slate.700');
  --pagination-hover: theme('colors.slate.700');
  --pagination-active: theme('colors.blue.500');
}
```

### Custom Styling

Override default styles with custom classes:

```typescript
@Component({
  template: `
    <Pagination
      [totalItems]="1000"
      [currentPage]="currentPage()"
      [customClass]="'my-custom-pagination'"
      (pageChange)="currentPage.set($event)"
    />
  `,
  styles: [`
    .my-custom-pagination button {
      @apply rounded-full;
    }
    
    .my-custom-pagination .active {
      @apply bg-gradient-to-r from-purple-500 to-pink-500;
    }
  `]
})
```

## Performance Optimizations

### Signal-Based Architecture

- **OnPush Strategy**: Optimized change detection
- **Computed Values**: Efficient reactive updates
- **Minimal Re-renders**: Only updates when necessary

### Debounced Interactions

- **Click Protection**: Prevents rapid successive page changes
- **Loading States**: Visual feedback during navigation
- **State Management**: Consistent UI state during transitions

## Advanced Usage

### URL Synchronization

```typescript
@Component({
  template: `
    <Pagination
      [totalItems]="totalItems()"
      [currentPage]="currentPage()"
      (pageChange)="onPageChange($event)"
    />
  `
})
export class UrlSyncExample {
  currentPage = signal(1);
  
  constructor(private router: Router, private route: ActivatedRoute) {
    // Initialize from URL query params
    this.route.queryParams.subscribe(params => {
      const page = Number(params['page']) || 1;
      this.currentPage.set(page);
    });
  }
  
  onPageChange(page: number) {
    this.currentPage.set(page);
    
    // Update URL without page reload
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge'
    });
  }
}
```

### Server-Side Pagination

```typescript
@Component({
  template: `
    <Pagination
      [totalItems]="totalItems()"
      [currentPage]="currentPage()"
      [itemsPerPage]="itemsPerPage()"
      (pageChange)="onPageChange($event)"
    />
  `
})
export class ServerPaginationExample {
  currentPage = signal(1);
  itemsPerPage = signal(10);
  totalItems = signal(0);
  data = signal([]);
  
  constructor(private dataService: DataService) {
    effect(() => {
      this.loadData();
    });
  }
  
  onPageChange(page: number) {
    this.currentPage.set(page);
  }
  
  private async loadData() {
    const result = await this.dataService.getData({
      page: this.currentPage(),
      limit: this.itemsPerPage()
    });
    
    this.data.set(result.data);
    this.totalItems.set(result.total);
  }
}
```

### Custom Page Size Selector

```typescript
@Component({
  template: `
    <div class="flex items-center gap-4 mb-4">
      <label for="pageSize">Items per page:</label>
      <select
        id="pageSize"
        [value]="itemsPerPage()"
        (change)="onPageSizeChange($event)"
        class="border rounded px-2 py-1"
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    
    <Pagination
      [totalItems]="totalItems()"
      [currentPage]="currentPage()"
      [itemsPerPage]="itemsPerPage()"
      (pageChange)="onPageChange($event)"
    />
  `
})
export class CustomPageSizeExample {
  currentPage = signal(1);
  itemsPerPage = signal(10);
  totalItems = signal(500);
  
  onPageSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage.set(Number(target.value));
    this.currentPage.set(1); // Reset to first page
  }
  
  onPageChange(page: number) {
    this.currentPage.set(page);
  }
}
```

## TypeScript Types

```typescript
// Component props type
type PaginationProps = {
  size?: 'sm' | 'default' | 'lg';
}

// Button variant type
type PaginationButtonProps = {
  variant?: 'default' | 'active' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

// Page item interface
interface PageItem {
  type: 'page' | 'ellipsis';
  page?: number;
  id: string;
}
```

## Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile Safari** 14+
- **Chrome Mobile** 90+

## Best Practices

### Performance

- Use signals for reactive state management
- Implement virtual scrolling for very large datasets
- Consider server-side pagination for optimal performance

### Accessibility

- Always provide meaningful `ariaLabel`
- Test with screen readers
- Ensure keyboard navigation works properly
- Use semantic HTML structure

### UX Design

- Show loading states during page transitions
- Provide clear visual feedback for current page
- Consider infinite scroll for mobile experiences
- Display total results when helpful

### Mobile Optimization

- Test on various device sizes
- Ensure touch targets are at least 44px
- Use responsive maxVisiblePages settings
- Consider mobile-specific navigation patterns

## Troubleshooting

### Common Issues

**Q: Pagination not updating when data changes**

A: Ensure you're using signals and the `totalItems` input is reactive:

```typescript
// ✅ Correct
totalItems = signal(data.length);

// ❌ Incorrect
totalItems = data.length;
```

**Q: Page numbers not visible on mobile**

A: The component automatically reduces visible pages on mobile. This is intentional for better UX.

**Q: Custom styles not applying**

A: Use the `customClass` input and ensure your styles have proper specificity:

```typescript
[customClass]="'my-pagination'"
```

**Q: Scrollbars not appearing**

A: Check that the container has proper responsive classes and the component has enough page buttons to overflow.

## Contributing

Found a bug or want to contribute? Check out our [GitHub repository](https://github.com/bhaimicrosoft/angular-superui) and feel free to submit issues or pull requests.

## License

MIT License - feel free to use this component in your projects!
