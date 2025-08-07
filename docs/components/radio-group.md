# RadioGroup

A comprehensive radio group component with full accessibility support, multiple variants, and form integration. 

## Features

- **Multiple Variants**: Default, destructive, success, warning, and secondary styles with variant-specific focus rings
- **Flexible Sizing**: Small, default, large, and extra-large options with proportional dot sizing
- **Layout Options**: Vertical (default) and horizontal orientations
- **Form Integration**: Full support for Angular reactive forms with validation
- **Accessibility**: Complete keyboard navigation, screen reader support, and ARIA compliance
- **Focus Management**: Variant-specific focus ring colors (blue, red, green, yellow, secondary)
- **Customizable**: Extensive styling options and configuration
- **TypeScript**: Full type safety with TypeScript support

## Installation

The RadioGroup component is part of the Angular SuperUI library:

```bash
npx ngsui add radio-group
```

## Basic Usage

### Simple Radio Group

```typescript
import { Component } from '@angular/core';
import { RadioGroup, RadioOption } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [RadioGroup],
  template: `
    <RadioGroup
      [options]="frameworks"
      [(value)]="selectedFramework"
      [accessibility]="{ ariaLabel: 'Choose your preferred framework' }"
    />
  `
})
export class ExampleComponent {
  selectedFramework: string | null = null;
  
  frameworks: RadioOption[] = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' }
  ];
}
```

### With Descriptions

```typescript
subscriptionPlans: RadioOption[] = [
  {
    value: 'free',
    label: 'Free',
    description: 'Perfect for personal projects and learning'
  },
  {
    value: 'pro',
    label: 'Pro',
    description: 'Best for growing teams and businesses'
  },
  {
    value: 'enterprise',
    label: 'Enterprise',
    description: 'Advanced features for large organizations'
  }
];
```

```html
<RadioGroup
  [options]="subscriptionPlans"
  [(value)]="selectedPlan"
  [accessibility]="{ ariaLabel: 'Choose your subscription plan' }"
/>
```

### Horizontal Layout

```html
<RadioGroup
  [options]="options"
  [(value)]="selectedValue"
  orientation="horizontal"
/>
```

## Variants

The RadioGroup component supports multiple visual variants, each with its own focus ring color for optimal accessibility and visual feedback.

### Default

```html
<RadioGroup [options]="options" variant="default" />
```

*Focus ring: Blue (`focus-visible:ring-primary`)*

### Destructive

```html
<RadioGroup [options]="options" variant="destructive" />
```

*Focus ring: Red (`focus-visible:ring-destructive`)*

### Success

```html
<RadioGroup [options]="options" variant="success" />
```

*Focus ring: Green (`focus-visible:ring-green-500`)*

### Warning

```html
<RadioGroup [options]="options" variant="warning" />
```

*Focus ring: Yellow (`focus-visible:ring-yellow-500`)*

### Secondary

```html
<RadioGroup [options]="options" variant="secondary" />
```

*Focus ring: Secondary (`focus-visible:ring-secondary`)*

## Visual Design

### Dot Sizing

The inner dots are sized proportionally to create proper padding:

- **Small (sm)**: `4px × 4px` dot in `12px × 12px` radio button
- **Default**: `6px × 6px` dot in `16px × 16px` radio button  
- **Large (lg)**: `8px × 8px` dot in `20px × 20px` radio button
- **Extra Large (xl)**: `10px × 10px` dot in `24px × 24px` radio button

## Sizes

### Small
```html
<RadioGroup [options]="options" size="sm" />
```

### Default
```html
<RadioGroup [options]="options" size="default" />
```

### Large
```html
<RadioGroup [options]="options" size="lg" />
```

### Extra Large
```html
<RadioGroup [options]="options" size="xl" />
```

## Form Integration

### Reactive Forms

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class FormExampleComponent {
  demoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.demoForm = this.fb.group({
      language: ['', Validators.required],
      experience: ['intermediate']
    });
  }

  onSubmit() {
    if (this.demoForm.valid) {
      console.log('Form values:', this.demoForm.value);
    }
  }
}
```

```html
<form [formGroup]="demoForm" (ngSubmit)="onSubmit()">
  <RadioGroup
    formControlName="language"
    [options]="languageOptions"
    [required]="true"
    [accessibility]="{
      ariaLabel: 'Choose your primary programming language',
      ariaRequired: true
    }"
  />
  
  <div *ngIf="demoForm.get('language')?.invalid && demoForm.get('language')?.touched">
    Please select a programming language
  </div>
  
  <button type="submit" [disabled]="demoForm.invalid">Submit</button>
</form>
```

### Template-driven Forms

```html
<RadioGroup
  [(ngModel)]="selectedValue"
  [options]="options"
  name="selection"
  required
/>
```

## Disabled States

### Individual Options
```typescript
options: RadioOption[] = [
  { value: 'enabled1', label: 'Enabled Option 1' },
  { value: 'disabled1', label: 'Disabled Option 1', disabled: true },
  { value: 'enabled2', label: 'Enabled Option 2' }
];
```

### Entire Group
```html
<RadioGroup
  [options]="options"
  [disabled]="true"
/>
```

## Events

```html
<RadioGroup
  [options]="options"
  [(value)]="selectedValue"
  (valueChange)="onValueChange($event)"
  (selectionChange)="onSelectionChange($event)"
/>
```

```typescript
onValueChange(value: string | null): void {
  console.log('Value changed:', value);
}

onSelectionChange(option: RadioOption | null): void {
  console.log('Selection changed:', option);
}
```

## Accessibility

The RadioGroup component provides comprehensive accessibility features:

### Keyboard Navigation
- **Arrow Keys**: Navigate between options
- **Home/End**: Jump to first/last option
- **Space/Enter**: Select the focused option

### Screen Reader Support
- Proper ARIA attributes (role, aria-checked, aria-labelledby, etc.)
- Live region announcements for selection changes
- Support for descriptions and validation states

### Configuration
```typescript
import { createRadioGroupAccessibility } from 'angular-superui';

// Create accessibility configuration
const accessibility = createRadioGroupAccessibility({
  ariaLabel: 'Choose your preference',
  ariaRequired: true,
  ariaInvalid: false,
  ariaLive: 'polite'
});
```

```html
<RadioGroup
  [options]="options"
  [accessibility]="accessibility"
/>
```

## Custom Styling

### CSS Classes
```html
<RadioGroup
  [options]="options"
  className="p-4 bg-muted rounded-lg"
/>
```

### Individual Option Styling
```typescript
styledOptions: RadioOption[] = [
  {
    value: 'option1',
    label: 'Styled Option 1',
    className: 'text-blue-600 dark:text-blue-400'
  },
  {
    value: 'option2',
    label: 'Styled Option 2',
    className: 'text-green-600 dark:text-green-400'
  }
];
```

## API Reference

### RadioGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| null` | `null` | Currently selected value |
| `options` | `RadioOption[]` | `[]` | Array of radio options |
| `disabled` | `boolean` | `false` | Whether the entire group is disabled |
| `required` | `boolean` | `false` | Whether selection is required |
| `name` | `string` | `undefined` | Form control name |
| `variant` | `'default' \| 'destructive' \| 'success' \| 'warning' \| 'secondary'` | `'default'` | Visual variant with specific focus ring colors |
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Size variant affecting radio button and dot dimensions |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout orientation |
| `className` | `string` | `undefined` | Additional CSS classes |
| `accessibility` | `RadioGroupAccessibility` | `{}` | Accessibility configuration |

### RadioGroup Events

| Event | Type | Description |
|-------|------|-------------|
| `valueChange` | `EventEmitter<string \| null>` | Emitted when value changes |
| `selectionChange` | `EventEmitter<RadioOption \| null>` | Emitted when selection changes |

### RadioOption Interface

```typescript
interface RadioOption {
  value: string;           // Unique value for the option
  label: string;           // Display label
  description?: string;    // Optional description text
  disabled?: boolean;      // Whether option is disabled
  className?: string;      // Additional CSS classes for styling individual options
}
```

### RadioGroupAccessibility Interface

```typescript
interface RadioGroupAccessibility {
  ariaLabel?: string;           // ARIA label for the group
  ariaLabelledBy?: string;      // Element ID that labels the group
  ariaDescribedBy?: string;     // Element ID that describes the group
  ariaRequired?: boolean;       // Whether selection is required
  ariaInvalid?: boolean;        // Whether group has validation errors
  ariaLive?: 'off' | 'polite' | 'assertive'; // Live region behavior for announcements
}
```

### Focus Ring Colors by Variant

| Variant | Focus Ring Color | CSS Class |
|---------|------------------|-----------|
| `default` | Blue | `focus-visible:ring-primary` |
| `destructive` | Red | `focus-visible:ring-destructive` |
| `success` | Green | `focus-visible:ring-green-500` |
| `warning` | Yellow | `focus-visible:ring-yellow-500` |
| `secondary` | Secondary | `focus-visible:ring-secondary` |

## Best Practices

### Accessibility
- Always provide meaningful labels using `ariaLabel` or `ariaLabelledBy`
- Use descriptions for complex options
- Set `ariaRequired` for required fields
- Update `ariaInvalid` based on validation state

### User Experience
- Use horizontal layout for short lists (3-4 options)
- Use vertical layout for longer lists or when options have descriptions
- Group related options logically
- Provide clear, concise labels

### Performance
- Use `trackBy` functions for dynamic option lists
- Avoid frequent option array recreation
- Consider virtual scrolling for very large option lists

### Styling
- Maintain consistent variant usage across your application
- Use appropriate sizes based on context
- Ensure sufficient color contrast for all variants
- Test with different themes and accessibility settings

## Examples

### Complete Form Example

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RadioGroup, RadioOption, createRadioGroupAccessibility } from 'angular-superui';

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [RadioGroup, ReactiveFormsModule],
  template: `
    <form [formGroup]="surveyForm" (ngSubmit)="onSubmit()">
      <div class="space-y-6">
        <!-- Experience Level -->
        <div class="space-y-2">
          <label class="text-sm font-medium">
            Experience Level <span class="text-red-500">*</span>
          </label>
          <RadioGroup
            formControlName="experience"
            [options]="experienceOptions"
            [required]="true"
            [accessibility]="experienceAccessibility"
            orientation="horizontal"
          />
        </div>

        <!-- Preferred Technology -->
        <div class="space-y-2">
          <label class="text-sm font-medium">Preferred Technology</label>
          <RadioGroup
            formControlName="technology"
            [options]="technologyOptions"
            [accessibility]="technologyAccessibility"
          />
        </div>

        <!-- Submit Button -->
        <button 
          type="submit" 
          [disabled]="surveyForm.invalid"
          class="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          Submit Survey
        </button>
      </div>
    </form>
  `
})
export class SurveyFormComponent {
  surveyForm: FormGroup;

  experienceOptions: RadioOption[] = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  technologyOptions: RadioOption[] = [
    {
      value: 'frontend',
      label: 'Frontend Development',
      description: 'React, Vue, Angular, etc.'
    },
    {
      value: 'backend',
      label: 'Backend Development',
      description: 'Node.js, Python, Java, etc.'
    },
    {
      value: 'fullstack',
      label: 'Full Stack Development',
      description: 'Both frontend and backend'
    },
    {
      value: 'mobile',
      label: 'Mobile Development',
      description: 'iOS, Android, React Native, etc.'
    }
  ];

  experienceAccessibility = createRadioGroupAccessibility({
    ariaLabel: 'Select your programming experience level',
    ariaRequired: true
  });

  technologyAccessibility = createRadioGroupAccessibility({
    ariaLabel: 'Select your preferred technology area'
  });

  constructor(private fb: FormBuilder) {
    this.surveyForm = this.fb.group({
      experience: ['', Validators.required],
      technology: ['frontend']
    });
  }

  onSubmit(): void {
    if (this.surveyForm.valid) {
      console.log('Survey submitted:', this.surveyForm.value);
    }
  }
}
```

This RadioGroup component provides a robust, accessible, and highly customizable solution for radio button groups in Angular applications.
