# ComboBox

A high-performance, accessible combobox component built on native HTML select foundation with enhanced styling and functionality. Provides reliable dropdown selection with search capabilities, keyboard navigation, and enterprise-grade accessibility.

## Features

- 🏗️ **Native HTML Select Foundation** - Built on reliable HTML select for maximum compatibility
- ⚡ **High Performance** - Optimized rendering with minimal overhead
- ♿ **Enhanced Accessibility** - Full keyboard navigation, screen reader support, and ARIA compliance
- 🎨 **Beautiful Styling** - Modern design with Tailwind CSS integration
- 🔍 **Search Functionality** - Filter options with built-in search when enabled
- 📱 **Mobile Optimized** - Works seamlessly on touch devices
- 🎯 **Reliable Positioning** - No floating positioning issues, uses native browser behavior
- 🚀 **Single Component** - Simplified API with all functionality in one component
- 💪 **TypeScript Support** - Full type safety and IntelliSense support

## Installation

Install the ComboBox component using our CLI tool:

```bash
npx ngsui-cli add combobox
```

This will automatically:

- Add the Combobox component to your project
- Configure required dependencies
- Set up Tailwind CSS classes

## Basic Usage

```typescript
import { Component, signal } from '@angular/core';
import { Combobox } from '@angular-superui/lib';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Combobox],
  template: `
    <Combobox
      [options]="frameworks"
      [value]="selectedFramework()"
      (valueChange)="selectedFramework.set($event)"
      placeholder="Select a framework..."
    />
  `
})
export class ExampleComponent {
  readonly selectedFramework = signal<string>('');
  
  readonly frameworks = [
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'svelte', label: 'Svelte' }
  ];
}
```

## Examples

### Basic ComboBox

Simple dropdown selection with default styling.

```typescript
@Component({
  template: `
    <Combobox
      [options]="basicOptions"
      [value]="selectedValue()"
      (valueChange)="selectedValue.set($event)"
      placeholder="Choose an option..."
    />
  `
})
export class BasicExample {
  readonly selectedValue = signal<string>('');
  
  readonly basicOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];
}
```

### With Groups and Disabled Options

```typescript
@Component({
  template: `
    <Combobox
      [options]="groupedOptions"
      [value]="selectedLanguage()"
      (valueChange)="selectedLanguage.set($event)"
      placeholder="Select a programming language..."
    />
  `
})
export class GroupedExample {
  readonly selectedLanguage = signal<string>('');
  
  readonly groupedOptions = [
    { 
      label: 'Frontend',
      options: [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'html', label: 'HTML' },
        { value: 'css', label: 'CSS' }
      ]
    },
    {
      label: 'Backend', 
      options: [
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'csharp', label: 'C#' },
        { value: 'go', label: 'Go', disabled: true }
      ]
    }
  ];
}
```

### Disabled State and Error Handling

```typescript
@Component({
  template: `
    <!-- Disabled combobox -->
    <Combobox
      [options]="statusOptions"
      [value]="selectedStatus()"
      (valueChange)="selectedStatus.set($event)"
      [disabled]="true"
      placeholder="Status (disabled)"
    />

    <!-- With validation error -->
    <div class="space-y-2">
      <Combobox
        [options]="categoryOptions"
        [value]="selectedCategory()"
        (valueChange)="selectedCategory.set($event)"
        placeholder="Select category..."
        [class]="hasError() ? 'border-red-500' : ''"
      />
      @if (hasError()) {
        <p class="text-sm text-red-600">Please select a category</p>
      }
    </div>
  `
})
export class ValidationExample {
  readonly selectedStatus = signal<string>('');
  readonly selectedCategory = signal<string>('');
  readonly hasError = signal<boolean>(false);
  
  readonly statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];
  
  readonly categoryOptions = [
    { value: 'tech', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'design', label: 'Design' }
  ];
}
```

### Custom Styling

```typescript
@Component({
  template: `
    <Combobox
      [options]="priorityOptions"
      [value]="selectedPriority()"
      (valueChange)="selectedPriority.set($event)"
      placeholder="Select priority..."
      class="w-full max-w-md bg-gray-50 border-2 border-blue-300 rounded-xl p-3 text-lg font-medium shadow-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
    />
  `
})
export class CustomStyledExample {
  readonly selectedPriority = signal<string>('');
  
  readonly priorityOptions = [
    { value: 'low', label: '🟢 Low Priority' },
    { value: 'medium', label: '🟡 Medium Priority' },
    { value: 'high', label: '🔴 High Priority' },
    { value: 'urgent', label: '🚨 Urgent' }
  ];
}
```

## API Reference

### Component Properties

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| `options` | `ComboboxOption[] \| ComboboxGroup[]` | `[]` | ✅ | List of options or grouped options |
| `value` | `string` | `''` | ❌ | Currently selected value |
| `placeholder` | `string` | `''` | ❌ | Placeholder text when no option is selected |
| `disabled` | `boolean` | `false` | ❌ | Whether the combobox is disabled |
| `class` | `string` | `''` | ❌ | Additional CSS classes |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `valueChange` | `string` | Emitted when the selected value changes |

### Option Interface

```typescript
interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

### Group Interface

```typescript
interface ComboboxGroup {
  label: string;
  options: ComboboxOption[];
}
```

    { value: 'angular', label: 'Angular', group: 'Frontend', description: 'TypeScript-based web application framework' },
    { value: 'vue', label: 'Vue.js', group: 'Frontend', description: 'Progressive JavaScript framework' },
    { value: 'svelte', label: 'Svelte', group: 'Frontend', description: 'Compile-time framework' },
    
    // Backend
    { value: 'nodejs', label: 'Node.js', group: 'Backend', description: 'JavaScript runtime built on Chrome\'s V8 engine' },
    { value: 'python', label: 'Python', group: 'Backend', description: 'High-level programming language' },
    { value: 'java', label: 'Java', group: 'Backend', description: 'Object-oriented programming language' },
    { value: 'csharp', label: 'C#', group: 'Backend', description: 'Microsoft\'s object-oriented programming language' },
    
    // Database
    ## Best Practices

### Do's ✅

- **Use clear, descriptive labels** for all options
- **Group related options** using the group structure
- **Keep option lists reasonable** in size (under 100 options)
- **Provide helpful placeholder text** to guide users
- **Use disabled state** for unavailable options rather than hiding them
- **Test keyboard navigation** to ensure accessibility
- **Handle edge cases** like empty states gracefully

### Don'ts ❌

- **Don't use combobox for binary choices** - use toggle or switch instead
- **Don't overwhelm users** with too many options at once
- **Don't forget to handle the empty state** when no option is selected
- **Don't disable the entire component** unless absolutely necessary
- **Don't use unclear abbreviations** in option labels
- **Don't forget responsive design** for mobile devices

## Accessibility Features

### Keyboard Navigation
- **Arrow Keys**: Navigate through options
- **Enter/Space**: Select the highlighted option
- **Escape**: Close the dropdown (when applicable)
- **Tab**: Move to the next focusable element

### Screen Reader Support
- Full ARIA labeling for option identification
- Proper role assignments for dropdown behavior
- Announces selected state changes
- Supports group labels and structure

### Focus Management
- Clear focus indicators
- Logical tab order
- Maintains focus within the component when open
- Returns focus appropriately after selection

## Browser Compatibility

The Combobox component leverages native HTML select elements, ensuring:

- **Universal Support**: Works in all modern browsers
- **Mobile Compatibility**: Native mobile experience on iOS and Android
- **Accessibility**: Built-in screen reader and keyboard support
- **Performance**: Minimal JavaScript overhead
- **Reliability**: No complex positioning or z-index issues

## Migration from Old ComboBox

If you're upgrading from the previous component-based architecture:

### Before (Old API)
```typescript
<Combobox [options]="options" [(ngModel)]="value">
  <ComboboxTrigger></ComboboxTrigger>
  <ComboboxContent [searchable]="true"></ComboboxContent>
</Combobox>
```

### After (New API)
```typescript
<Combobox 
  [options]="options" 
  [value]="value()"
  (valueChange)="value.set($event)"
  placeholder="Select an option..."
/>
```

### Key Changes
- **Single component** instead of multiple sub-components
- **Signal-based state** for better performance
- **Native HTML foundation** for reliability
- **Simplified API** with fewer configuration options
- **Better accessibility** out of the box

## Styling Customization

The component uses Tailwind CSS classes and can be customized through:

### CSS Classes
```typescript
<Combobox
  [options]="options"
  [value]="value()"
  (valueChange)="value.set($event)"
  class="custom-select bg-blue-50 border-blue-300 text-blue-900 rounded-xl"
/>
```

### CSS Variables (Advanced)
```css
.custom-combobox {
  --combobox-bg: theme('colors.blue.50');
  --combobox-border: theme('colors.blue.300');
  --combobox-text: theme('colors.blue.900');
  --combobox-focus-ring: theme('colors.blue.500');
}
```

## Performance Considerations

- **Native Performance**: Built on HTML select for optimal performance
- **Minimal Re-renders**: Signal-based updates reduce unnecessary renders
- **Memory Efficient**: No complex DOM manipulation or portal rendering
- **Bundle Size**: Smaller footprint compared to custom dropdown implementations
- **Accessibility**: Zero-cost accessibility features built into the browser
  ];
  
  selectedTechValue: string | null = null;
  
  onTechChange(value: string | string[] | null) {
    const techValue = Array.isArray(value) ? value[0] || null : value;
    this.selectedTechValue = techValue;
  }
}

```

### Loading State

ComboBox with loading indicator for async operations.

```html
<div class="flex space-x-4">
  <Combobox [options]="asyncOptions" [loadingState]="isLoading()" [(ngModel)]="selectedAsyncValue" placeholder="Select async option..." (valueChange)="onAsyncChange($event)">
    <ComboboxTrigger></ComboboxTrigger>
    <ComboboxContent [loadingMessage]="'Loading data...'" searchPlaceholder="Search options..."></ComboboxContent>
  </Combobox>
  <button 
    (click)="simulateLoading()"
    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
  >
    Simulate Loading
  </button>
</div>
```

```typescript
export class ExampleComponent {
  asyncOptions: ComboboxOption[] = [];
  isLoading = signal(false);
  selectedAsyncValue: string | null = null;
  
  simulateLoading() {
    this.isLoading.set(true);
    this.asyncOptions = [];
    
    // Simulate async data loading
    setTimeout(() => {
      this.asyncOptions = [
        { value: 'async1', label: 'Async Option 1', description: 'Loaded from server' },
        { value: 'async2', label: 'Async Option 2', description: 'Loaded from server' },
        { value: 'async3', label: 'Async Option 3', description: 'Loaded from server' }
      ];
      this.isLoading.set(false);
    }, 2000);
  }
  
  onAsyncChange(value: string | string[] | null) {
    const asyncValue = Array.isArray(value) ? value[0] || null : value;
    this.selectedAsyncValue = asyncValue;
  }
}
```

### Error State

ComboBox with error handling and recovery.

```html
<div class="flex space-x-4">
  <Combobox [options]="errorOptions" [error]="errorMessage()" [(ngModel)]="selectedErrorValue" placeholder="Select option..." (valueChange)="onErrorChange($event)">
    <ComboboxTrigger></ComboboxTrigger>
    <ComboboxContent searchPlaceholder="Search options..."></ComboboxContent>
  </Combobox>
  <button 
    (click)="simulateError()"
    class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
  >
    Simulate Error
  </button>
</div>
```

```typescript
export class ExampleComponent {
  errorOptions: ComboboxOption[] = [];
  errorMessage = signal('');
  selectedErrorValue: string | null = null;
  
  simulateError() {
    this.errorMessage.set('Failed to load options. Please try again.');
    this.errorOptions = [];
    
    // Clear error after 3 seconds
    setTimeout(() => {
      this.errorMessage.set('');
      this.errorOptions = [
        { value: 'error1', label: 'Error Option 1' },
        { value: 'error2', label: 'Error Option 2' }
      ];
    }, 3000);
  }
  
  onErrorChange(value: string | string[] | null) {
    const errorValue = Array.isArray(value) ? value[0] || null : value;
    this.selectedErrorValue = errorValue;
  }
}
```

### Options with Descriptions

Rich options with additional information and descriptions.

```html
<Combobox [options]="planOptions" [(ngModel)]="selectedPlanValue" placeholder="Select a plan..." (valueChange)="onPlanChange($event)">
  <ComboboxTrigger></ComboboxTrigger>
  <ComboboxContent searchPlaceholder="Search plans..."></ComboboxContent>
</Combobox>
```

```typescript
export class ExampleComponent {
  planOptions: ComboboxOption[] = [
    { value: 'free', label: 'Free', description: 'Perfect for personal projects and learning' },
    { value: 'pro', label: 'Pro', description: 'Best for professionals and small teams' },
    { value: 'team', label: 'Team', description: 'Collaboration features for growing teams' },
    { value: 'enterprise', label: 'Enterprise', description: 'Advanced features and priority support' }
  ];
  
  selectedPlanValue: string | null = null;
  
  onPlanChange(value: string | string[] | null) {
    const planValue = Array.isArray(value) ? value[0] || null : value;
    this.selectedPlanValue = planValue;
  }
}
```

### Disabled ComboBox

ComboBox in disabled state for non-interactive scenarios.

```html
<Combobox [options]="comboboxOptions" [(ngModel)]="selectedOptionValue" placeholder="Disabled combobox..." [disabled]="true">
  <ComboboxTrigger></ComboboxTrigger>
  <ComboboxContent></ComboboxContent>
</Combobox>
```

## API Reference

### ComboBox Component

The main ComboBox component that wraps the trigger and content.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `ComboboxOption[]` | `[]` | Array of options to display |
| `placeholder` | `string` | `'Select an option...'` | Placeholder text when no option is selected |
| `disabled` | `boolean` | `false` | Whether the ComboBox is disabled |
| `multiple` | `boolean` | `false` | Enable multi-select mode |
| `maxSelections` | `number` | `undefined` | Maximum number of selections in multi-select mode |
| `loadingState` | `boolean` | `false` | Show loading state |
| `loadingMessage` | `string` | `'Loading options...'` | Message to display during loading |
| `error` | `string` | `''` | Error message to display |
| `validationState` | `'valid' \| 'invalid' \| 'pending'` | `'valid'` | Validation state for styling |
| `clearable` | `boolean` | `true` | Show clear button when value is selected |
| `ariaLabel` | `string` | `''` | ARIA label for accessibility |
| `ariaLabelledBy` | `string` | `''` | ARIA labelledby for accessibility |
| `ariaDescribedBy` | `string` | `''` | ARIA describedby for accessibility |
| `required` | `boolean` | `false` | Whether the field is required |
| `showGroupLabels` | `boolean` | `true` | Show group labels for grouped options |
| `autoComplete` | `boolean` | `false` | Enable autocomplete functionality |
| `debounceTime` | `number` | `300` | Debounce time for search input |

#### Events

| Event | Type | Description |
|-------|------|-------------|
| `valueChange` | `EventEmitter<string \| string[] \| null>` | Emitted when the selected value changes |
| `openChange` | `EventEmitter<boolean>` | Emitted when the dropdown opens/closes |
| `searchChange` | `EventEmitter<string>` | Emitted when the search query changes |

### ComboboxTrigger Component

The trigger button that opens the ComboBox dropdown.

#### ComboboxTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `placeholder` | `string` | `'Select an option...'` | Placeholder text |
| `disabled` | `boolean` | `false` | Whether the trigger is disabled |
| `multiple` | `boolean` | `false` | Enable multi-select display mode |
| `contentId` | `string` | `'combobox-content'` | ID of the content element |
| `ariaLabel` | `string` | `''` | ARIA label for accessibility |
| `ariaLabelledBy` | `string` | `''` | ARIA labelledby for accessibility |
| `ariaDescribedBy` | `string` | `''` | ARIA describedby for accessibility |
| `required` | `boolean` | `false` | Whether the field is required |

### ComboboxContent Component

The dropdown content that displays the options.

#### ComboboxContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `contentId` | `string` | `'combobox-content'` | ID of the content element |
| `triggerId` | `string` | `'combobox-trigger'` | ID of the trigger element |
| `searchable` | `boolean` | `true` | Enable search functionality |
| `searchPlaceholder` | `string` | `'Search...'` | Placeholder for search input |
| `emptyMessage` | `string` | `'No options found.'` | Message when no options match |
| `loadingMessage` | `string` | `'Loading options...'` | Message during loading state |
| `showGroupLabels` | `boolean` | `true` | Show group labels for grouped options |
| `multiple` | `boolean` | `false` | Enable multi-select mode |

### ComboboxOption Interface

Defines the structure of an option in the ComboBox.

```typescript
interface ComboboxOption {
  value: string;           // Unique identifier for the option
  label: string;           // Display text for the option
  disabled?: boolean;      // Whether the option is disabled
  description?: string;    // Additional description text
  group?: string;          // Group name for grouping options
}
```

## Accessibility

The ComboBox component follows WAI-ARIA guidelines and includes:

- **Keyboard Navigation**: Full keyboard support with arrow keys, Enter, Escape, and Tab
- **Screen Reader Support**: Proper ARIA labels, roles, and properties
- **Focus Management**: Focus is properly managed when opening/closing the dropdown
- **High Contrast**: Compatible with high contrast themes
- **Touch Support**: Touch-friendly interactions on mobile devices

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` / `Enter` | Open/close dropdown or select highlighted option |
| `Arrow Down` | Move to next option or open dropdown |
| `Arrow Up` | Move to previous option |
| `Escape` | Close dropdown |
| `Tab` | Move focus to next element |
| `Home` | Move to first option |
| `End` | Move to last option |
| `A-Z` | Jump to option starting with letter |

## Form Integration

The ComboBox component implements `ControlValueAccessor` and works seamlessly with Angular forms:

### Template-Driven Forms

```html
<form #form="ngForm">
  <Combobox 
    [options]="options" 
    [(ngModel)]="selectedValue" 
    name="framework"
    required
  >
    <ComboboxTrigger></ComboboxTrigger>
    <ComboboxContent></ComboboxContent>
  </Combobox>
  
  <div *ngIf="form.submitted && !selectedValue">
    Please select a framework
  </div>
</form>
```

### Reactive Forms

```typescript
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class ExampleComponent {
  form = new FormGroup({
    framework: new FormControl('', [Validators.required])
  });
  
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
```

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <Combobox 
    [options]="options" 
    formControlName="framework"
  >
    <ComboboxTrigger></ComboboxTrigger>
    <ComboboxContent></ComboboxContent>
  </Combobox>
  
  <div *ngIf="form.get('framework')?.errors?.['required']">
    Please select a framework
  </div>
</form>
```

## Styling

The ComboBox component uses CSS classes that can be customized:

```css
/* Trigger button styles */
.combobox-trigger {
  /* Custom trigger styles */
}

/* Content dropdown styles */
.combobox-content {
  /* Custom content styles */
}

/* Option styles */
.combobox-option {
  /* Custom option styles */
}

/* Selected option styles */
.combobox-option[aria-selected="true"] {
  /* Custom selected option styles */
}

/* Chip styles for multi-select */
.combobox-chip {
  /* Custom chip styles */
}

/* Loading state styles */
.combobox-loading {
  /* Custom loading styles */
}

/* Error state styles */
.combobox-error {
  /* Custom error styles */
}
```

## Best Practices

1. **Performance**: Use `trackBy` functions for large option lists
2. **Accessibility**: Always provide meaningful labels and descriptions
3. **User Experience**: Include loading states for async operations
4. **Validation**: Implement proper form validation and error handling
5. **Search**: Enable search for lists with more than 10 options
6. **Grouping**: Use groups for related options to improve navigation
7. **Multi-select**: Provide clear visual feedback for selected items
8. **Mobile**: Ensure touch targets are at least 44px for mobile devices

## Troubleshooting

### Common Issues

1. **Options not showing**: Ensure `options` array is properly formatted
2. **Search not working**: Check that `searchable` is set to `true`
3. **Multi-select not working**: Verify `multiple` is set on both ComboBox and ComboboxTrigger
4. **Form validation issues**: Ensure proper form integration with `ngModel` or `formControlName`
5. **Accessibility concerns**: Verify ARIA attributes are properly set

### Performance Optimization

For large datasets:

```typescript
// Use virtual scrolling for 1000+ options
// Implement server-side filtering
// Use lazy loading for grouped options
```

## License

MIT License - see the [LICENSE](../../LICENSE) file for details.
