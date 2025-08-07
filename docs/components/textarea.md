# Textarea Component

A powerful, fully-featured textarea component built with Angular signals for optimal performance. The TextareaComponent provides multi-line text input with auto-resize functionality, validation, character counting, and complete accessibility support.

## Features

- ✅ **Auto-resize functionality** - Intelligently adjusts height based on content
- ✅ **Character counting** - Optional character counter with limit enforcement
- ✅ **Multiple variants** - Default, filled, flushed, and unstyled options
- ✅ **Size variants** - Small, medium, large, and extra-large sizes
- ✅ **State management** - Success, error, warning, and default states
- ✅ **Validation support** - Built-in and custom validation with real-time feedback
- ✅ **Form integration** - Full reactive forms support with ControlValueAccessor
- ✅ **Accessibility** - WCAG 2.1 compliant with ARIA support
- ✅ **Responsive design** - Mobile-first approach with touch-friendly interactions
- ✅ **Animation support** - Smooth transitions and visual feedback
- ✅ **TypeScript support** - Full type safety with Angular signals
- ✅ **Customizable** - Extensive styling options with Tailwind CSS integration

## Installation

### Using ngsui (Recommended)

```bash
npx ngsui add textarea
```

### Manual Installation

```bash
npm install angular-superui
```

## CLI Usage

The `ngsui` provides convenient commands for working with components:

```bash
# Add textarea component to your project
npx ngsui add textarea

# List all available components
npx ngsui list

# Initialize SuperUI in a new project
npx ngsui init

# Get help for any command
npx ngsui --help
```

## Basic Usage

### Simple Textarea

```typescript
import { TextareaComponent } from 'angular-superui';

@Component({
  template: `
    <TextareaComponent
      placeholder="Type your message here..."
      label="Message"
      [value]="messageValue()"
      (valueChange)="messageValue.set($event)"
    />
  `
})
export class MyComponent {
  readonly messageValue = signal('');
}
```

### With Character Counting

```typescript
@Component({
  template: `
    <TextareaComponent
      [value]="tweetValue()"
      (valueChange)="tweetValue.set($event)"
      placeholder="What's happening?"
      [maxLength]="280"
      [showCharacterCount]="true"
      helpText="Share your thoughts in 280 characters or less"
    />
  `
})
export class MyComponent {
  readonly tweetValue = signal('');
}
```

### Auto-Resizing Textarea

```typescript
@Component({
  template: `
    <TextareaComponent
      [value]="autoResizeValue()"
      (valueChange)="autoResizeValue.set($event)"
      placeholder="Start typing... This textarea will grow as you add content!"
      [autoResize]="true"
      [minRows]="3"
      [maxRows]="10"
      helpText="Automatically resizes between 3-10 rows based on content"
    />
  `
})
export class MyComponent {
  readonly autoResizeValue = signal('Try typing multiple lines of text here...');
}
```

## Variants

### Default Variant

```typescript
<TextareaComponent
  placeholder="Standard textarea with border"
  variant="default"
  label="Default Textarea"
/>
```

### Filled Variant

```typescript
<TextareaComponent
  placeholder="Textarea with background fill"
  variant="filled"
  label="Filled Textarea"
/>
```

### Flushed Variant

```typescript
<TextareaComponent
  placeholder="Minimal design with bottom border only"
  variant="flushed"
  label="Flushed Textarea"
/>
```

### Unstyled Variant

```typescript
<TextareaComponent
  placeholder="Completely unstyled for custom design"
  variant="unstyled"
  label="Custom Textarea"
  className="border-2 border-dashed border-gray-300 rounded-lg p-3 bg-gray-50"
/>
```

## Size Variants

```typescript
<!-- Small -->
<TextareaComponent size="sm" placeholder="Compact textarea" />

<!-- Medium (Default) -->
<TextareaComponent size="md" placeholder="Standard textarea" />

<!-- Large -->
<TextareaComponent size="lg" placeholder="Spacious textarea" />

<!-- Extra Large -->
<TextareaComponent size="xl" placeholder="Extra large textarea" />
```

## State Variants

### Success State

```typescript
<TextareaComponent
  state="success"
  [value]="successValue()"
  (valueChange)="successValue.set($event)"
  placeholder="Success textarea"
/>
```

### Error State

```typescript
<TextareaComponent
  state="error"
  [value]="errorValue()"
  (valueChange)="errorValue.set($event)"
  placeholder="Error textarea"
  errorMessage="This field is required"
/>
```

### Warning State

```typescript
<TextareaComponent
  state="warning"
  [value]="warningValue()"
  (valueChange)="warningValue.set($event)"
  placeholder="Warning textarea"
/>
```

## Resize Options

### No Resize

```typescript
<TextareaComponent
  resize="none"
  placeholder="Fixed size textarea"
  helpText="Users cannot resize this textarea"
/>
```

### Vertical Resize (Default)

```typescript
<TextareaComponent
  resize="vertical"
  placeholder="Vertically resizable"
  helpText="Users can resize vertically (grab bottom edge)"
/>
```

### Horizontal Resize

```typescript
<TextareaComponent
  resize="horizontal"
  placeholder="Horizontally resizable"
  helpText="Users can resize horizontally (grab right edge)"
/>
```

### Both Directions

```typescript
<TextareaComponent
  resize="both"
  placeholder="Fully resizable"
  helpText="Users can resize in both directions (grab corner)"
/>
```

## Form Integration

### Reactive Forms

```typescript
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
      <TextareaComponent
        formControlName="subject"
        placeholder="Brief subject line"
        [rows]="2"
        [maxLength]="100"
        [showCharacterCount]="true"
        size="sm"
      />

      <TextareaComponent
        formControlName="message"
        placeholder="Your detailed message here..."
        [autoResize]="true"
        [minRows]="4"
        [maxRows]="10"
        [maxLength]="1000"
        [showCharacterCount]="true"
        helpText="Please provide as much detail as possible"
      />

      <button type="submit" [disabled]="!contactForm.valid">
        Submit Form
      </button>
    </form>
  `
})
export class ContactComponent {
  contactForm = this.fb.group({
    subject: ['', [Validators.required, Validators.maxLength(100)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
    }
  }
}
```

### FormControl Disabled State

The component properly handles both input-based and FormControl-based disabled states:

```typescript
@Component({
  template: `
    <TextareaComponent
      formControlName="disableTest"
      placeholder="This demonstrates FormControl.disable() integration"
      helpText="This textarea can be disabled via FormControl.disable()"
    />
    
    <button (click)="toggleDisabled()">
      {{ isDisabled ? 'Enable' : 'Disable' }} Control
    </button>
  `
})
export class DisableExampleComponent {
  form = this.fb.group({
    disableTest: ['Test content']
  });

  get isDisabled() {
    return this.form.get('disableTest')?.disabled ?? false;
  }

  toggleDisabled(): void {
    const control = this.form.get('disableTest');
    if (control?.disabled) {
      control.enable();
    } else {
      control?.disable();
    }
  }
}
```

## Custom Validation

```typescript
@Component({
  template: `
    <TextareaComponent
      [value]="customValidationValue()"
      (valueChange)="customValidationValue.set($event)"
      placeholder="Type 'hello' to see success state"
      [customValidator]="customValidator"
      [validateOnChange]="true"
      helpText="Custom validation: must contain 'hello'"
    />
  `
})
export class CustomValidationComponent {
  readonly customValidationValue = signal('');

  customValidator = (value: string): string | null => {
    if (!value) return null;
    if (!value.toLowerCase().includes('hello')) {
      return 'Value must contain "hello"';
    }
    return null;
  };
}
```

## Advanced Features

### Auto-Resize with Constraints

```typescript
<TextareaComponent
  [value]="autoResizeValue()"
  (valueChange)="autoResizeValue.set($event)"
  [autoResize]="true"
  [minRows]="3"
  [maxRows]="15"
  placeholder="Constrained auto-resize between 3-15 rows"
/>
```

### Read-only Mode

```typescript
<TextareaComponent
  value="This is a read-only textarea. You cannot edit this content, but you can select and copy it."
  [readonly]="true"
  helpText="Content is read-only but selectable"
/>
```

### Word Wrap Control

```typescript
<TextareaComponent
  [value]="wordWrapValue()"
  (valueChange)="wordWrapValue.set($event)"
  placeholder="Type a very long line to see how word wrapping behaves..."
  wrap="hard"
  [cols]="40"
  helpText="Hard wrap - line breaks are preserved when submitting"
/>
```

### Required Field

```typescript
<TextareaComponent
  [value]="requiredValue()"
  (valueChange)="requiredValue.set($event)"
  placeholder="This field is required"
  [required]="true"
  label="Required Textarea"
  helpText="This field must be filled out"
/>
```

## API Reference

### Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'filled' \| 'flushed' \| 'unstyled'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the textarea |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Visual state |
| `resize` | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Resize behavior |
| `placeholder` | `string` | `''` | Placeholder text |
| `disabled` | `boolean` | `false` | Whether the textarea is disabled |
| `readonly` | `boolean` | `false` | Whether the textarea is read-only |
| `required` | `boolean` | `false` | Whether the textarea is required |
| `rows` | `number` | `4` | Number of visible text lines |
| `cols` | `number \| undefined` | `undefined` | Number of visible character widths |
| `minLength` | `number \| undefined` | `undefined` | Minimum character length |
| `maxLength` | `number \| undefined` | `undefined` | Maximum character length |
| `wrap` | `'hard' \| 'soft' \| 'off'` | `'soft'` | Text wrapping behavior |
| `className` | `string` | `''` | Additional CSS classes |
| `id` | `string` | `''` | Element ID (auto-generated if not provided) |
| `name` | `string` | `''` | Form control name |
| `label` | `string` | `''` | Label text |
| `ariaLabel` | `string` | `''` | ARIA label for accessibility |
| `ariaLabelledBy` | `string` | `''` | ARIA labelledby attribute |
| `ariaDescribedBy` | `string` | `''` | ARIA describedby attribute |
| `errorMessage` | `string` | `''` | Error message to display |
| `helpText` | `string` | `''` | Help text to display |
| `autoResize` | `boolean` | `false` | Enable auto-resize functionality |
| `maxRows` | `number` | `10` | Maximum rows for auto-resize |
| `minRows` | `number` | `2` | Minimum rows for auto-resize |
| `showCharacterCount` | `boolean` | `false` | Show character counter |
| `validateOnChange` | `boolean` | `false` | Validate on value change |
| `validateOnBlur` | `boolean` | `true` | Validate on blur |
| `customValidator` | `(value: string) => string \| null` | `undefined` | Custom validation function |

### Output Events

| Event | Type | Description |
|-------|------|-------------|
| `valueChange` | `string` | Emitted when the value changes |
| `textareaBlur` | `FocusEvent` | Emitted when the textarea loses focus |
| `textareaFocus` | `FocusEvent` | Emitted when the textarea gains focus |
| `keyDown` | `KeyboardEvent` | Emitted on keydown events |
| `keyUp` | `KeyboardEvent` | Emitted on keyup events |
| `validationChange` | `boolean` | Emitted when validation state changes |

### Two-way Binding

```typescript
// Using model() signal for two-way binding
<TextareaComponent [(value)]="myValue" />

// Using separate input and output
<TextareaComponent
  [value]="myValue()"
  (valueChange)="myValue.set($event)"
/>
```

### Public Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `focus()` | none | Focus the textarea |
| `blur()` | none | Blur the textarea |
| `select()` | none | Select all text |
| `setSelectionRange()` | `start: number, end: number` | Set text selection range |

## Accessibility Features

The TextareaComponent is fully accessible and WCAG 2.1 compliant:

- **Keyboard Navigation**: Full keyboard support with proper tab order
- **Screen Reader Support**: Comprehensive ARIA attributes and announcements
- **Focus Management**: Clear focus indicators and logical focus flow
- **Error Handling**: Proper error announcements and validation feedback
- **Auto-resize Announcements**: Screen reader notifications for auto-resize behavior

### ARIA Attributes

The component automatically manages these ARIA attributes:

- `aria-label` - Accessible name
- `aria-labelledby` - References to labeling elements
- `aria-describedby` - References to describing elements (help text, errors)
- `aria-invalid` - Validation state
- `aria-required` - Required field indication
- `role="alert"` - Error message announcements

## Styling and Customization

### Custom Classes

```typescript
<TextareaComponent
  className="my-custom-class border-2 border-blue-500 focus:border-blue-700"
  placeholder="Custom styled textarea"
/>
```

### CSS Variables

The component uses CSS custom properties that can be overridden:

```css
.my-textarea {
  --input: theme('colors.gray.300');
  --ring: theme('colors.blue.500');
  --destructive: theme('colors.red.500');
  --success: theme('colors.green.500');
  --warning: theme('colors.yellow.500');
}
```

### Tailwind CSS Integration

The component is built with Tailwind CSS and supports all utility classes:

```typescript
<TextareaComponent
  className="
    bg-gradient-to-r from-blue-50 to-purple-50
    border-2 border-blue-200
    focus:border-blue-500 focus:ring-blue-500
    rounded-xl shadow-lg
    transition-all duration-300
  "
/>
```

## Performance Considerations

The TextareaComponent is optimized for performance:

- **Signal-based Architecture**: Uses Angular signals for optimal change detection
- **OnPush Change Detection**: Minimal re-renders with OnPush strategy
- **Computed Properties**: Efficient reactive calculations
- **Debounced Validation**: Optional debouncing for expensive validation operations
- **Memory Management**: Proper cleanup of observers and event listeners

## Browser Support

- Chrome 91+
- Firefox 90+
- Safari 14+
- Edge 91+

## Migration Guide

### From Angular Material TextArea

```typescript
// Before (Angular Material)
<mat-form-field>
  <mat-label>Message</mat-label>
  <textarea matInput [(ngModel)]="message" placeholder="Type here..."></textarea>
  <mat-hint>Enter your message</mat-hint>
  <mat-error *ngIf="hasError">This field is required</mat-error>
</mat-form-field>

// After (Angular SuperUI)
<TextareaComponent
  [(value)]="message"
  label="Message"
  placeholder="Type here..."
  helpText="Enter your message"
  [errorMessage]="hasError ? 'This field is required' : ''"
/>
```

### From Native Textarea

```typescript
// Before (Native)
<label for="message">Message</label>
<textarea
  id="message"
  [(ngModel)]="message"
  placeholder="Type here..."
  class="form-control"
></textarea>

// After (Angular SuperUI)
<TextareaComponent
  [(value)]="message"
  label="Message"
  placeholder="Type here..."
/>
```

## Examples and Demos

For more examples and interactive demos, visit our [Textarea Demo Page](/components/textarea).

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
