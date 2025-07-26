# Select Component

A powerful, accessible, and highly customizable select component with search, grouping, keyboard navigation, and multiple variants for modern Angular applications.

## Overview

The Select component is built with Angular 20+ signals and provides a comprehensive dropdown solution with advanced features like real-time search, option grouping, keyboard navigation, and full accessibility support. It's designed to work seamlessly with Angular reactive forms and offers extensive customization options.

## Features

- ✅ **Fully Accessible** - WCAG 2.1 compliant with complete keyboard navigation and screen reader support
- ✅ **High Performance** - Optimized with Angular signals and OnPush change detection
- ✅ **Searchable** - Real-time filtering with customizable search functionality
- ✅ **Grouped Options** - Organize options into logical categories
- ✅ **Multiple Variants** - Default, success, warning, and destructive styles
- ✅ **Responsive Design** - Works perfectly on all screen sizes
- ✅ **Dark Mode Support** - Seamless light and dark theme integration
- ✅ **Form Integration** - Full support for Angular reactive forms
- ✅ **Keyboard Navigation** - Complete keyboard support with Tab cycling
- ✅ **Custom Styling** - Extensive customization options
- ✅ **Animations** - Smooth transitions with Angular Animations

## Installation

```bash
npx ngsui-cli add select
```

## Basic Usage

```typescript
import { Component, signal } from '@angular/core';
import { SelectComponent, SelectOption } from '@angular-superui/lib';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [SelectComponent],
  template: `
    <SelectComponent
      [options]="options()"
      placeholder="Choose an option..."
      (valueChange)="onValueChange($event)"
    />
  `
})
export class ExampleComponent {
  readonly options = signal<SelectOption[]>([
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' }
  ]);

  onValueChange(value: string | null) {
    console.log('Selected:', value);
  }
}
```

## Examples

### Searchable Select

```typescript
@Component({
  template: `
    <SelectComponent
      [options]="countryOptions()"
      placeholder="Search countries..."
      searchable="true"
      (valueChange)="onCountryChange($event)"
    />
  `
})
export class SearchableExample {
  readonly countryOptions = signal<SelectOption[]>([
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    // ... more options
  ]);
}
```

### Grouped Options

```typescript
@Component({
  template: `
    <SelectComponent
      [options]="techOptions()"
      placeholder="Choose technology..."
      searchable="true"
      (valueChange)="onTechChange($event)"
    />
  `
})
export class GroupedExample {
  readonly techOptions = signal<SelectOption[]>([
    { value: 'js', label: 'JavaScript', group: 'Frontend' },
    { value: 'react', label: 'React', group: 'Frontend' },
    { value: 'node', label: 'Node.js', group: 'Backend' },
    { value: 'python', label: 'Python', group: 'Backend' },
    { value: 'mysql', label: 'MySQL', group: 'Database' },
    // ... more options
  ]);
}
```

### Options with Descriptions

```typescript
@Component({
  template: `
    <SelectComponent
      [options]="planOptions()"
      placeholder="Choose your plan..."
      size="lg"
      (valueChange)="onPlanChange($event)"
    />
  `
})
export class PlanExample {
  readonly planOptions = signal<SelectOption[]>([
    {
      value: 'free',
      label: 'Free Plan',
      description: 'Perfect for getting started with basic features'
    },
    {
      value: 'pro',
      label: 'Pro Plan',
      description: 'Enhanced features for growing teams'
    },
    {
      value: 'enterprise',
      label: 'Enterprise Plan',
      description: 'Advanced features with dedicated support'
    }
  ]);
}
```

### With Icons

```typescript
@Component({
  template: `
    <SelectComponent
      [options]="statusOptions()"
      placeholder="Select status..."
      (valueChange)="onStatusChange($event)"
    />
  `
})
export class IconExample {
  readonly statusOptions = signal<SelectOption[]>([
    {
      value: 'active',
      label: 'Active',
      icon: '<svg class="w-4 h-4 text-green-500">...</svg>'
    },
    {
      value: 'pending',
      label: 'Pending',
      icon: '<svg class="w-4 h-4 text-yellow-500">...</svg>'
    },
    {
      value: 'inactive',
      label: 'Inactive',
      icon: '<svg class="w-4 h-4 text-gray-500">...</svg>'
    }
  ]);
}
```

### Form Integration

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-example',
  standalone: true,
  imports: [ReactiveFormsModule, SelectComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <SelectComponent
        [options]="options()"
        placeholder="Choose an option..."
        formControlName="selectedOption"
      />
      <button type="submit">Submit</button>
    </form>
  `
})
export class FormExample {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedOption: ['']
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
```

### Custom Styling

```typescript
@Component({
  template: `
    <SelectComponent
      [options]="options()"
      placeholder="Custom styled select..."
      [customClasses]="{
        trigger: 'border-purple-300 focus:border-purple-500',
        content: 'border-purple-200',
        item: 'hover:bg-purple-50'
      }"
    />
  `
})
export class CustomStyledExample {
  // Component implementation
}
```

## API Reference

### SelectComponent

#### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `options` | `SelectOption[]` | `[]` | **Required.** Array of options to display |
| `variant` | `'default' \| 'destructive' \| 'success' \| 'warning'` | `'default'` | Visual variant of the select |
| `size` | `'xs' \| 'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Size of the select component |
| `disabled` | `boolean` | `false` | Whether the select is disabled |
| `placeholder` | `string` | `'Select an option...'` | Placeholder text when no option is selected |
| `searchable` | `boolean` | `false` | Enable search functionality |
| `selectId` | `string` | `'select'` | Unique identifier for the select |
| `allowClear` | `boolean` | `false` | Show clear button when option is selected |
| `clearText` | `string` | `'Clear selection'` | Text for clear option |
| `value` | `string \| null` | `null` | Currently selected value |
| `customClasses` | `SelectCustomClasses` | `{}` | Custom CSS classes for different parts |
| `triggerClass` | `string` | `''` | **Deprecated.** Custom CSS class for trigger |
| `contentClass` | `string` | `''` | **Deprecated.** Custom CSS class for content |
| `ariaLabel` | `string` | `''` | ARIA label for accessibility |
| `srOnlyLabel` | `string` | `''` | Screen reader only label |
| `errorMessage` | `string` | `''` | Error message for validation |
| `helpText` | `string` | `''` | Help text description |
| `config` | `SelectConfig` | `{}` | Advanced configuration options |

#### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `valueChange` | `string \| null` | Emitted when selected value changes |
| `optionSelect` | `SelectOption` | Emitted when an option is selected |
| `openChange` | `boolean` | Emitted when dropdown open state changes |
| `focus` | `void` | Emitted when select receives focus |
| `blur` | `void` | Emitted when select loses focus |
| `clear` | `void` | Emitted when selection is cleared |

#### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `open()` | - | `void` | Open the dropdown |
| `close()` | - | `void` | Close the dropdown |
| `toggle()` | - | `void` | Toggle dropdown open state |
| `focusTrigger()` | - | `void` | Focus the trigger element |
| `blurTrigger()` | - | `void` | Blur the trigger element |

### Interfaces

#### SelectOption

```typescript
interface SelectOption {
  value: string;           // Unique value for the option
  label: string;           // Display text for the option
  disabled?: boolean;      // Whether option is disabled
  description?: string;    // Optional description text
  group?: string;          // Group name for grouping options
  icon?: string;           // HTML string for custom icon
}
```

#### SelectConfig

```typescript
interface SelectConfig {
  allowClear?: boolean;          // Enable clear functionality
  placeholder?: string;          // Placeholder text
  searchPlaceholder?: string;    // Placeholder for search input
  noOptionsText?: string;        // Text when no options found
  clearText?: string;            // Text for clear option
  maxHeight?: string;            // Maximum height of dropdown
  placement?: 'bottom' | 'top' | 'auto';  // Dropdown placement
  customClasses?: SelectCustomClasses;    // Custom CSS classes
}
```

#### SelectCustomClasses

```typescript
interface SelectCustomClasses {
  trigger?: string;      // CSS classes for trigger button
  content?: string;      // CSS classes for dropdown content
  item?: string;         // CSS classes for option items
  searchInput?: string;  // CSS classes for search input
}
```

## Keyboard Navigation

The Select component provides comprehensive keyboard support:

| Key | Action |
|-----|--------|
| `Space` / `Enter` | Open dropdown or select highlighted option |
| `Arrow Down` | Navigate to next option or open dropdown |
| `Arrow Up` | Navigate to previous option or open dropdown |
| `Tab` | Cycle through options when dropdown is open |
| `Shift + Tab` | Cycle through options in reverse |
| `Escape` | Close dropdown |
| `Home` | Navigate to first option |
| `End` | Navigate to last option |
| `A-Z` | Type to search (when searchable) |

## Accessibility

The Select component is built with accessibility as a priority:

- **ARIA Support**: Complete ARIA attributes including `aria-expanded`, `aria-haspopup`, `aria-labelledby`
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Proper announcements and descriptions
- **Focus Management**: Logical focus flow and visual indicators
- **High Contrast**: Works with high contrast mode
- **Reduced Motion**: Respects user's motion preferences

## Styling

### CSS Custom Properties

You can customize the component using CSS custom properties:

```css
.select-component {
  --select-border-radius: 0.375rem;
  --select-border-width: 1px;
  --select-transition-duration: 150ms;
  --select-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
```

### Tailwind Classes

The component uses Tailwind CSS classes by default. You can override them using the `customClasses` input:

```typescript
<SelectComponent
  [customClasses]="{
    trigger: 'border-2 border-blue-300 rounded-xl',
    content: 'shadow-2xl border-blue-200',
    item: 'py-3 px-4 hover:bg-blue-50'
  }"
/>
```

## Performance Considerations

- **OnPush Change Detection**: The component uses OnPush strategy for optimal performance
- **Signal-Based**: Built with Angular signals for efficient reactivity
- **Virtual Scrolling**: For large datasets, consider implementing virtual scrolling
- **Debounced Search**: Search input is debounced to prevent excessive filtering

## Best Practices

1. **Option Limits**: For better UX, consider pagination or virtualization for > 100 options
2. **Search Thresholds**: Enable search for lists with > 10 options
3. **Grouping**: Use groups to organize related options logically
4. **Descriptions**: Add descriptions for complex options to improve clarity
5. **Loading States**: Show loading indicators for async option loading
6. **Error Handling**: Provide clear error messages for validation failures

## Common Patterns

### Async Options Loading

```typescript
@Component({
  template: `
    <SelectComponent
      [options]="options()"
      [disabled]="loading()"
      placeholder="Loading..."
      searchable="true"
    />
  `
})
export class AsyncExample {
  readonly loading = signal(false);
  readonly options = signal<SelectOption[]>([]);

  async loadOptions() {
    this.loading.set(true);
    try {
      const data = await this.apiService.getOptions();
      this.options.set(data);
    } finally {
      this.loading.set(false);
    }
  }
}
```

### Dependent Selects

```typescript
@Component({
  template: `
    <SelectComponent
      [options]="countries()"
      placeholder="Select country..."
      (valueChange)="onCountryChange($event)"
    />
    
    <SelectComponent
      [options]="cities()"
      [disabled]="!selectedCountry()"
      placeholder="Select city..."
    />
  `
})
export class DependentExample {
  readonly selectedCountry = signal<string | null>(null);
  readonly countries = signal<SelectOption[]>([]);
  readonly cities = signal<SelectOption[]>([]);

  onCountryChange(countryId: string | null) {
    this.selectedCountry.set(countryId);
    if (countryId) {
      this.loadCities(countryId);
    } else {
      this.cities.set([]);
    }
  }
}
```

## Troubleshooting

### Common Issues

1. **Options not displaying**: Ensure options array is properly structured
2. **Form not updating**: Check FormControl binding and change detection
3. **Styling issues**: Verify Tailwind CSS classes are available
4. **Accessibility warnings**: Check for proper ARIA labels and descriptions

### Debug Mode

Enable debug mode to log component state:

```typescript
// In development mode
if (!environment.production) {
  console.log('Select state:', selectComponent.selectService.isOpen());
}
```

## Migration Guide

### From v1 to v2

- `triggerClass` and `contentClass` are deprecated, use `customClasses` instead
- Signal-based API replaces observables for better performance
- New keyboard navigation behavior with Tab cycling

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

To contribute to the Select component:

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

## License

MIT License - see LICENSE file for details.
