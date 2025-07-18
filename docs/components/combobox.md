# ComboBox

A customizable dropdown component that allows users to select from a list of options with search functionality, multi-select support, and loading states.

## Installation

The ComboBox component is available as part of Angular SuperUI. If you haven't initialized Angular SuperUI in your project yet, run:

```bash
ngsui-cli init
```

Then add the ComboBox component to your project:

```bash
ngsui-cli add combobox
```

## Usage

Import the ComboBox components in your Angular component:

```typescript
import { Component } from '@angular/core';
import { Combobox, ComboboxTrigger, ComboboxContent, ComboboxOption } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Combobox, ComboboxTrigger, ComboboxContent],
  template: `
    <Combobox [options]="options" [(ngModel)]="selectedValue" placeholder="Select an option...">
      <ComboboxTrigger></ComboboxTrigger>
      <ComboboxContent></ComboboxContent>
    </Combobox>
  `
})
export class ExampleComponent {
  options: ComboboxOption[] = [
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue.js' }
  ];
  
  selectedValue: string | null = null;
}
```

## Examples

### Basic ComboBox

Simple dropdown selection without search functionality.

```html
<Combobox [options]="comboboxOptions" [(ngModel)]="selectedOptionValue" placeholder="Select a framework..." (valueChange)="onFrameworkChange($event)">
  <ComboboxTrigger></ComboboxTrigger>
  <ComboboxContent [searchable]="false"></ComboboxContent>
</Combobox>
```

```typescript
export class ExampleComponent {
  comboboxOptions: ComboboxOption[] = [
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt.js' },
    { value: 'solid', label: 'SolidJS' },
    { value: 'qwik', label: 'Qwik' },
    { value: 'astro', label: 'Astro' },
    { value: 'remix', label: 'Remix', disabled: true }
  ];
  
  selectedOptionValue: string | null = null;
  
  onFrameworkChange(value: string | string[] | null) {
    const frameworkValue = Array.isArray(value) ? value[0] || null : value;
    this.selectedOptionValue = frameworkValue;
  }
}
```

### Searchable ComboBox

Dropdown with search functionality to filter options.

```html
<Combobox [options]="languageOptions" [(ngModel)]="selectedLanguageValue" placeholder="Select a language..." (valueChange)="onLanguageChange($event)">
  <ComboboxTrigger></ComboboxTrigger>
  <ComboboxContent [searchable]="true" searchPlaceholder="Search languages..."></ComboboxContent>
</Combobox>
```

```typescript
export class ExampleComponent {
  languageOptions: ComboboxOption[] = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'rust', label: 'Rust' },
    { value: 'go', label: 'Go' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'dart', label: 'Dart' },
    { value: 'scala', label: 'Scala' },
    { value: 'haskell', label: 'Haskell', disabled: true }
  ];
  
  selectedLanguageValue: string | null = null;
  
  onLanguageChange(value: string | string[] | null) {
    const languageValue = Array.isArray(value) ? value[0] || null : value;
    this.selectedLanguageValue = languageValue;
  }
}
```

### Multi-Select ComboBox

Select multiple options with chips display and individual removal.

```html
<Combobox [options]="skillOptions" [multiple]="true" [(ngModel)]="selectedSkillsValue" placeholder="Select skills..." (valueChange)="onSkillsChange($event)">
  <ComboboxTrigger [multiple]="true"></ComboboxTrigger>
  <ComboboxContent [multiple]="true" searchPlaceholder="Search skills..."></ComboboxContent>
</Combobox>
```

```typescript
export class ExampleComponent {
  skillOptions: ComboboxOption[] = [
    { value: 'frontend', label: 'Frontend Development', description: 'HTML, CSS, JavaScript, React, Angular' },
    { value: 'backend', label: 'Backend Development', description: 'Node.js, Python, Java, C#' },
    { value: 'mobile', label: 'Mobile Development', description: 'iOS, Android, React Native, Flutter' },
    { value: 'devops', label: 'DevOps', description: 'Docker, Kubernetes, AWS, Azure' },
    { value: 'database', label: 'Database Design', description: 'SQL, NoSQL, MongoDB, PostgreSQL' },
    { value: 'testing', label: 'Testing', description: 'Unit testing, Integration testing, E2E testing' },
    { value: 'security', label: 'Security', description: 'Authentication, Authorization, OWASP' },
    { value: 'ui-ux', label: 'UI/UX Design', description: 'Figma, Adobe XD, Sketch, Prototyping' }
  ];
  
  selectedSkillsValue: string[] = [];
  
  onSkillsChange(value: string | string[] | null) {
    const skillsArray = Array.isArray(value) ? value : (value ? [value] : []);
    this.selectedSkillsValue = skillsArray;
  }
}
```

### Grouped Options

Options organized by categories with group labels.

```html
<Combobox [options]="groupedTechOptions" [(ngModel)]="selectedTechValue" placeholder="Select technology..." (valueChange)="onTechChange($event)">
  <ComboboxTrigger></ComboboxTrigger>
  <ComboboxContent [showGroupLabels]="true" searchPlaceholder="Search technologies..."></ComboboxContent>
</Combobox>
```

```typescript
export class ExampleComponent {
  groupedTechOptions: ComboboxOption[] = [
    // Frontend
    { value: 'react', label: 'React', group: 'Frontend', description: 'JavaScript library for building user interfaces' },
    { value: 'angular', label: 'Angular', group: 'Frontend', description: 'TypeScript-based web application framework' },
    { value: 'vue', label: 'Vue.js', group: 'Frontend', description: 'Progressive JavaScript framework' },
    { value: 'svelte', label: 'Svelte', group: 'Frontend', description: 'Compile-time framework' },
    
    // Backend
    { value: 'nodejs', label: 'Node.js', group: 'Backend', description: 'JavaScript runtime built on Chrome\'s V8 engine' },
    { value: 'python', label: 'Python', group: 'Backend', description: 'High-level programming language' },
    { value: 'java', label: 'Java', group: 'Backend', description: 'Object-oriented programming language' },
    { value: 'csharp', label: 'C#', group: 'Backend', description: 'Microsoft\'s object-oriented programming language' },
    
    // Database
    { value: 'postgres', label: 'PostgreSQL', group: 'Database', description: 'Open source relational database' },
    { value: 'mongodb', label: 'MongoDB', group: 'Database', description: 'NoSQL document database' },
    { value: 'mysql', label: 'MySQL', group: 'Database', description: 'Open source relational database' },
    { value: 'redis', label: 'Redis', group: 'Database', description: 'In-memory data structure store' },
    
    // Cloud
    { value: 'aws', label: 'AWS', group: 'Cloud', description: 'Amazon Web Services' },
    { value: 'azure', label: 'Azure', group: 'Cloud', description: 'Microsoft Azure' },
    { value: 'gcp', label: 'Google Cloud', group: 'Cloud', description: 'Google Cloud Platform' }
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
