# Button Component 🔘

Interactive button component with multiple variants, sizes, loading states, and accessibility features.

## Features

- 🎯 **9 Variants** - Default, Secondary, Destructive, Outline, Ghost, Link, and more
- 📏 **4 Sizes** - Small, Default, Large, Icon
- ⏳ **Loading States** - Built-in spinner and disabled states
- ♿ **Accessibility** - ARIA compliant with keyboard navigation
- 🎨 **Customizable** - Easy styling with Tailwind CSS
- 🔧 **TypeScript** - Full type safety with CVA variants

## Installation

Initialize Angular SuperUI in your project:

```bash
ngsui init
```

Add the Button component:

```bash
ngsui add button
```

## Usage

Import the Button component in your Angular component:

```typescript
import { Component } from '@angular/core';
import { ButtonComponent } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <Button>Click me</Button>
  `
})
export class ExampleComponent {}
```

## Examples

### Default

```typescript
@Component({
  template: `
    <Button>Button</Button>
  `
})
```

### Secondary

```typescript
@Component({
  template: `
    <Button variant="secondary">Secondary</Button>
  `
})
```

### Destructive

```typescript
@Component({
  template: `
    <Button variant="destructive">Destructive</Button>
  `
})
```

### Outline

```typescript
@Component({
  template: `
    <Button variant="outline">Outline</Button>
  `
})
```

### Ghost

```typescript
@Component({
  template: `
    <Button variant="ghost">Ghost</Button>
  `
})
```

### Link

```typescript
@Component({
  template: `
    <Button variant="link">Link</Button>
  `
})
```

### Success

```typescript
@Component({
  template: `
    <Button variant="success">Success</Button>
  `
})
```

### Warning

```typescript
@Component({
  template: `
    <Button variant="warning">Warning</Button>
  `
})
```

### Info

```typescript
@Component({
  template: `
    <Button variant="info">Info</Button>
  `
})
```

### Icon

```typescript
@Component({
  template: `
    <Button variant="outline" size="icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    </Button>
  `
})
```

### With Icon

```typescript
@Component({
  template: `
    <Button>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="mr-2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7,10 12,15 17,10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Download
    </Button>
  `
})
```

### Loading

```typescript
@Component({
  template: `
    <Button [loadingState]="true">Loading...</Button>
    <Button [loadingState]="{ loading: true, loadingText: 'Please wait...' }">
      Custom Loading
    </Button>
  `
})
```

### Disabled

```typescript
@Component({
  template: `
    <Button [disabled]="true">Disabled</Button>
  `
})
```

### Sizes

```typescript
@Component({
  template: `
    <Button size="sm">Small</Button>
    <Button size="default">Default</Button>
    <Button size="lg">Large</Button>
    <Button size="xl">Extra Large</Button>
  `
})
```

### Event Handling

```typescript
@Component({
  template: `
    <Button (buttonClick)="handleClick($event)">
      Click Handler
    </Button>
    <Button (buttonKeydown)="handleKeydown($event)">
      Keyboard Handler
    </Button>
  `
})
export class ExampleComponent {
  handleClick(event: MouseEvent) {
    console.log('Button clicked:', event);
  }

  handleKeydown(event: KeyboardEvent) {
    console.log('Key pressed:', event.key);
  }
}
```

### Accessibility Features

```typescript
@Component({
  template: `
    <Button 
      [accessibility]="{
        ariaLabel: 'Save document',
        ariaDescription: 'Saves the current document to your account',
        ariaLive: 'polite'
      }"
      [loadingState]="isLoading"
      (buttonClick)="saveDocument()"
    >
      Save
    </Button>
  `
})
export class AccessibleButtonExample {
  isLoading = false;

  saveDocument() {
    this.isLoading = true;
    // Simulate save operation
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
```

### Interactive Button Groups

#### Text Formatting Toolbar

```typescript
@Component({
  selector: 'app-text-formatting-example',
  template: `
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Text Formatting</h3>
      <div class="flex gap-1 p-2 border rounded-lg">
        <Button
          variant="outline"
          size="sm"
          [class]="boldButtonClasses()"
          (buttonClick)="toggleBold()"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
            <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
          </svg>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          [class]="italicButtonClasses()"
          (buttonClick)="toggleItalic()"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 4h-9M14 20H5M15 4L9 20"/>
          </svg>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          [class]="underlineButtonClasses()"
          (buttonClick)="toggleUnderline()"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 4v6a6 6 0 0 0 12 0V4"/>
            <line x1="4" y1="20" x2="20" y2="20"/>
          </svg>
        </Button>
      </div>
      
      <div class="text-sm text-muted-foreground">
        Selected: {{ getSelectedFormats() }}
      </div>
    </div>
  `
})
export class TextFormattingExample {
  // State signals
  private isBold = signal(false);
  private isItalic = signal(false);
  private isUnderline = signal(false);

  // Computed classes for reactive styling
  boldButtonClasses = computed(() => 
    this.isBold() 
      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500 shadow-md' 
      : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100'
  );

  italicButtonClasses = computed(() => 
    this.isItalic() 
      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500 shadow-md' 
      : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100'
  );

  underlineButtonClasses = computed(() => 
    this.isUnderline() 
      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500 shadow-md' 
      : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100'
  );

  // Toggle methods
  toggleBold() {
    this.isBold.set(!this.isBold());
  }

  toggleItalic() {
    this.isItalic.set(!this.isItalic());
  }

  toggleUnderline() {
    this.isUnderline.set(!this.isUnderline());
  }

  getSelectedFormats(): string {
    const formats = [];
    if (this.isBold()) formats.push('Bold');
    if (this.isItalic()) formats.push('Italic');
    if (this.isUnderline()) formats.push('Underline');
    return formats.length > 0 ? formats.join(', ') : 'None';
  }
}
```

#### Filter Button Group

```typescript
@Component({
  selector: 'app-filter-example',
  template: `
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Task Filter</h3>
      <div class="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          [class]="filterAllClasses()"
          (buttonClick)="setFilter('all')"
        >
          All Tasks ({{ taskCounts.all }})
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          [class]="filterActiveClasses()"
          (buttonClick)="setFilter('active')"
        >
          Active ({{ taskCounts.active }})
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          [class]="filterPendingClasses()"
          (buttonClick)="setFilter('pending')"
        >
          Pending ({{ taskCounts.pending }})
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          [class]="filterCompletedClasses()"
          (buttonClick)="setFilter('completed')"
        >
          Completed ({{ taskCounts.completed }})
        </Button>
      </div>
      
      <div class="text-sm text-muted-foreground">
        Current filter: <span class="font-medium">{{ currentFilter() }}</span>
      </div>
    </div>
  `
})
export class FilterExample {
  // Filter state
  currentFilter = signal<'all' | 'active' | 'pending' | 'completed'>('all');

  // Sample data
  taskCounts = {
    all: 12,
    active: 5,
    pending: 3,
    completed: 4
  };

  // Computed classes for each filter button
  filterAllClasses = computed(() => 
    this.getFilterClasses('all')
  );

  filterActiveClasses = computed(() => 
    this.getFilterClasses('active')
  );

  filterPendingClasses = computed(() => 
    this.getFilterClasses('pending')
  );

  filterCompletedClasses = computed(() => 
    this.getFilterClasses('completed')
  );

  private getFilterClasses(filter: string): string {
    const isActive = this.currentFilter() === filter;
    return isActive 
      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-500 shadow-md' 
      : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100';
  }

  setFilter(filter: 'all' | 'active' | 'pending' | 'completed') {
    this.currentFilter.set(filter);
  }
}
```

#### Pagination Controls

```typescript
@Component({
  selector: 'app-pagination-example',
  template: `
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Pagination</h3>
      <div class="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          [class]="previousButtonClasses()"
          (buttonClick)="goToPrevious()"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-1">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
          Previous
        </Button>

        <div class="flex gap-1">
          @for (page of visiblePages(); track page) {
            <Button
              variant="outline"
              size="sm"
              [class]="getPageClasses(page)"
              (buttonClick)="goToPage(page)"
            >
              {{ page }}
            </Button>
          }
        </div>

        <Button
          variant="outline"
          size="sm"
          [class]="nextButtonClasses()"
          (buttonClick)="goToNext()"
        >
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ml-1">
            <polyline points="9,18 15,12 9,6"/>
          </svg>
        </Button>
      </div>
      
      <div class="text-sm text-muted-foreground">
        Page {{ currentPage() }} of {{ totalPages }}
      </div>
    </div>
  `
})
export class PaginationExample {
  // Pagination state
  currentPage = signal(1);
  totalPages = 10;

  // Computed properties for disabled states
  isPreviousDisabled = computed(() => this.currentPage() === 1);
  isNextDisabled = computed(() => this.currentPage() === this.totalPages);

  // Computed classes for navigation buttons
  previousButtonClasses = computed(() => {
    const disabled = this.isPreviousDisabled();
    if (disabled) {
      return 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200';
    }
    return 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:border-blue-300';
  });

  nextButtonClasses = computed(() => {
    const disabled = this.isNextDisabled();
    if (disabled) {
      return 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200';
    }
    return 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:border-blue-300';
  });

  // Visible pages calculation
  visiblePages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages;
    const pages = [];

    // Show pages around current page
    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  });

  // Navigation methods
  goToPrevious() {
    if (!this.isPreviousDisabled()) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }

  goToNext() {
    if (!this.isNextDisabled()) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  goToPage(page: number) {
    this.currentPage.set(page);
  }

  getPageClasses(page: number): string {
    const isActive = this.currentPage() === page;
    return isActive 
      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500 shadow-md' 
      : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100';
  }
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link' \| 'success' \| 'warning' \| 'info'` | `'default'` | The visual style variant of the button |
| `size` | `'default' \| 'sm' \| 'lg' \| 'xl' \| 'icon' \| 'icon-sm' \| 'icon-lg' \| 'icon-xl'` | `'default'` | The size of the button |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | The button's type attribute |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `class` | `string` | `''` | Additional CSS classes to apply |
| `accessibility` | `ButtonAccessibility` | `{}` | Accessibility configuration object |
| `loadingState` | `boolean \| ButtonLoadingState` | `false` | Loading state configuration |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `buttonClick` | `EventEmitter<MouseEvent>` | Emitted when the button is clicked |
| `buttonKeydown` | `EventEmitter<KeyboardEvent>` | Emitted when a key is pressed while the button is focused |
| `buttonFocus` | `EventEmitter<FocusEvent>` | Emitted when the button receives focus |
| `buttonBlur` | `EventEmitter<FocusEvent>` | Emitted when the button loses focus |

### ButtonAccessibility Interface

```typescript
interface ButtonAccessibility {
  /** ARIA label for screen readers when button text is not descriptive */
  ariaLabel?: string;
  /** ARIA description for additional context */
  ariaDescription?: string;
  /** Element ID that labels this button */
  ariaLabelledBy?: string;
  /** Element ID that describes this button */
  ariaDescribedBy?: string;
  /** Indicates if the button controls a popup/menu */
  ariaHasPopup?: 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  /** Indicates if the controlled element is expanded */
  ariaExpanded?: 'true' | 'false';
  /** Indicates if the button is pressed (for toggle buttons) */
  ariaPressed?: 'true' | 'false' | 'mixed';
  /** Live region announcements for dynamic content */
  ariaLive?: 'off' | 'polite' | 'assertive';
  /** Tab index for keyboard navigation control */
  tabIndex?: number;
}
```

### ButtonLoadingState Interface

```typescript
interface ButtonLoadingState {
  /** Show loading spinner */
  loading?: boolean;
  /** Custom loading text */
  loadingText?: string | null;
  /** Disable button during loading */
  disableOnLoading?: boolean;
}
```

### Public Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `setLoading` | `loading: boolean \| ButtonLoadingState` | Programmatically set the loading state |
| `focus` | `void` | Focus the button element |
| `blur` | `void` | Remove focus from the button element |

## Styling

The Button component uses Tailwind CSS classes and CSS custom properties. You can customize the appearance by:

### Custom Classes

```typescript
@Component({
  template: `
    <Button class="w-full justify-start">
      Custom Button
    </Button>
  `
})
```

### CSS Custom Properties

The button respects the following CSS custom properties:

- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--destructive` / `--destructive-foreground`
- `--success` / `--success-foreground`
- `--warning` / `--warning-foreground`
- `--info` / `--info-foreground`
- `--accent` / `--accent-foreground`
- `--background` / `--foreground`
- `--border` / `--input`
- `--ring`

## Accessibility

The Button component is built with accessibility in mind:

- **Keyboard Navigation**: Supports Space and Enter key activation
- **ARIA Support**: Full ARIA attribute support for screen readers
- **Focus Management**: Proper focus indication and management
- **Loading States**: Announces loading states to screen readers
- **Disabled States**: Properly handles disabled interactions
- **Live Regions**: Supports ARIA live regions for dynamic announcements

### Best Practices

1. **Use descriptive button text**: Button content should clearly describe the action
2. **Provide ARIA labels**: Use `ariaLabel` when button text isn't descriptive enough
3. **Handle loading states**: Always provide feedback during asynchronous operations
4. **Use appropriate variants**: Choose variants that match the action's importance
5. **Test with screen readers**: Verify the button works well with assistive technology

## Examples in Real Applications

### Form Submission

```typescript
@Component({
  template: `
    <form (ngSubmit)="onSubmit()">
      <input type="email" placeholder="Email" />
      <Button 
        type="submit"
        [loadingState]="isSubmitting"
        [accessibility]="{
          ariaLabel: 'Submit registration form',
          ariaLive: 'polite'
        }"
      >
        {{ isSubmitting ? 'Creating Account...' : 'Sign Up' }}
      </Button>
    </form>
  `
})
```

### Dialog Actions

```typescript
@Component({
  template: `
    <div class="flex gap-2">
      <Button variant="outline" (buttonClick)="cancel()">
        Cancel
      </Button>
      <Button 
        variant="destructive"
        [accessibility]="{
          ariaLabel: 'Confirm deletion of selected items'
        }"
        (buttonClick)="confirmDelete()"
      >
        Delete
      </Button>
    </div>
  `
})
```

### Navigation

```typescript
@Component({
  template: `
    <Button 
      variant="ghost" 
      size="sm"
      [accessibility]="{
        ariaLabel: 'Go to previous page'
      }"
      (buttonClick)="goBack()"
    >
      <svg class="w-4 h-4 mr-2"><!-- back icon --></svg>
      Back
    </Button>
  `
})
```
