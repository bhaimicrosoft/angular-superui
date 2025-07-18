# Checkbox

A control that allows the user to toggle between checked and not checked. Supports three states: checked, unchecked, and indeterminate.

## Installation

The Checkbox component is available as part of Angular SuperUI. If you haven't initialized Angular SuperUI in your project yet, run:

```bash
ngsui-cli init
```

Then add the Checkbox component to your project:

```bash
ngsui-cli add checkbox
```

## Usage

Import the Checkbox component in your Angular component:

```typescript
import { Component } from '@angular/core';
import { CheckboxComponent } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CheckboxComponent],
  template: `
    <div class="flex items-center space-x-2">
      <Checkbox [(ngModel)]="isChecked" />
      <label class="text-sm font-medium">Accept terms and conditions</label>
    </div>
  `
})
export class ExampleComponent {
  isChecked = false;
}
```

## Examples

### Basic Checkbox

```html
<div class="flex items-center space-x-2">
  <Checkbox [(ngModel)]="isChecked" />
  <label class="text-sm font-medium">Accept terms and conditions</label>
</div>
```

### Checkbox Sizes

```html
<div class="space-y-3">
  <div class="flex items-center space-x-2">
    <Checkbox size="sm" [(ngModel)]="smallCheckbox" />
    <label class="text-sm">Small checkbox</label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox size="default" [(ngModel)]="defaultCheckbox" />
    <label class="text-sm">Default checkbox</label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox size="lg" [(ngModel)]="largeCheckbox" />
    <label class="text-sm">Large checkbox</label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox size="xl" [(ngModel)]="extraLargeCheckbox" />
    <label class="text-sm">Extra large checkbox</label>
  </div>
</div>
```

### Checkbox Variants

```html
<div class="space-y-3">
  <div class="flex items-center space-x-2">
    <Checkbox variant="default" [(ngModel)]="defaultVariant" />
    <label class="text-sm">Default variant</label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox variant="destructive" [(ngModel)]="destructiveVariant" />
    <label class="text-sm">Destructive variant</label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox variant="success" [(ngModel)]="successVariant" />
    <label class="text-sm">Success variant</label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox variant="warning" [(ngModel)]="warningVariant" />
    <label class="text-sm">Warning variant</label>
  </div>
</div>
```

### Checkbox States

```html
<div class="space-y-3">
  <div class="flex items-center space-x-2">
    <Checkbox [(ngModel)]="uncheckedState" />
    <label class="text-sm">Unchecked state</label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox [(ngModel)]="checkedState" />
    <label class="text-sm">Checked state</label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox [indeterminate]="true" />
    <label class="text-sm">Indeterminate state</label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox [disabled]="true" [(ngModel)]="disabledUnchecked" />
    <label class="text-sm text-gray-500">Disabled unchecked</label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox [disabled]="true" [(ngModel)]="disabledChecked" />
    <label class="text-sm text-gray-500">Disabled checked</label>
  </div>
</div>
```

### Checkbox with Accessibility

```html
<div class="flex items-center space-x-2">
  <Checkbox 
    [(ngModel)]="newsletterSubscription" 
    [accessibility]="{
      ariaLabel: 'Subscribe to newsletter',
      ariaDescription: 'You can unsubscribe at any time',
      ariaRequired: true
    }" />
  <label class="text-sm">Subscribe to newsletter (required)</label>
</div>
```

### Checkbox with Form Validation

```html
<form [formGroup]="checkboxForm">
  <div class="flex items-center space-x-2">
    <Checkbox 
      formControlName="termsAccepted"
      [accessibility]="{
        ariaRequired: true,
        ariaInvalid: checkboxForm.get('termsAccepted')?.invalid && checkboxForm.get('termsAccepted')?.touched
      }" />
    <label class="text-sm">I accept the terms and conditions *</label>
  </div>
  <div class="text-sm text-red-600 mt-1" *ngIf="checkboxForm.get('termsAccepted')?.invalid && checkboxForm.get('termsAccepted')?.touched">
    Please accept the terms and conditions
  </div>
</form>
```

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ExampleComponent {
  checkboxForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.checkboxForm = this.fb.group({
      termsAccepted: [false, Validators.requiredTrue]
    });
  }
}
```

### Checkbox with Custom Events

```html
<div class="flex items-center space-x-2">
  <Checkbox 
    [(ngModel)]="customCheckbox"
    (checkedChange)="onCheckedChange($event)"
    (stateChange)="onStateChange($event)"
    (focused)="onFocus()"
    (blurred)="onBlur()" />
  <label class="text-sm">Custom event handling</label>
</div>
```

```typescript
export class ExampleComponent {
  customCheckbox = false;

  onCheckedChange(checked: boolean) {
    console.log('Checkbox checked:', checked);
  }

  onStateChange(state: 'checked' | 'unchecked' | 'indeterminate') {
    console.log('Checkbox state:', state);
  }

  onFocus() {
    console.log('Checkbox focused');
  }

  onBlur() {
    console.log('Checkbox blurred');
  }
}
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'success' \| 'warning'` | `'default'` | Visual variant of the checkbox |
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Size variant of the checkbox |
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled |
| `indeterminate` | `boolean` | `false` | Whether the checkbox is in indeterminate state |
| `accessibility` | `CheckboxAccessibility` | `{}` | Accessibility configuration object |
| `class` | `string` | `''` | Additional CSS classes to apply |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `checkedChange` | `EventEmitter<boolean>` | Emitted when the checkbox state changes |
| `stateChange` | `EventEmitter<CheckboxState>` | Emitted when the checkbox state changes (including indeterminate) |
| `focused` | `EventEmitter<void>` | Emitted when the checkbox is focused |
| `blurred` | `EventEmitter<void>` | Emitted when the checkbox loses focus |

### Types

#### CheckboxAccessibility

```typescript
interface CheckboxAccessibility {
  ariaLabel?: string;           // ARIA label for screen readers
  ariaDescription?: string;     // ARIA description for additional context
  ariaLabelledBy?: string;      // Element ID that labels this checkbox
  ariaDescribedBy?: string;     // Element ID that describes this checkbox
  ariaRequired?: boolean;       // Indicates if the checkbox is required
  ariaInvalid?: boolean;        // Indicates if the checkbox is invalid
}
```

#### CheckboxState

```typescript
type CheckboxState = 'checked' | 'unchecked' | 'indeterminate';
```

### Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `setChecked` | `checked: boolean` | `void` | Programmatically set the checked state |
| `toggle` | - | `void` | Toggle the checkbox state |
| `setIndeterminate` | `indeterminate: boolean` | `void` | Set the indeterminate state |
| `checked` | - | `boolean` | Get the current checked state |

## Styling

The Checkbox component uses Tailwind CSS classes and CSS custom properties for styling. You can customize the appearance by:

### Using Variants

```html
<Checkbox variant="success" [(ngModel)]="value" />
<Checkbox variant="destructive" [(ngModel)]="value" />
<Checkbox variant="warning" [(ngModel)]="value" />
```

### Using Custom Classes

```html
<Checkbox class="ring-2 ring-blue-500" [(ngModel)]="value" />
```

### CSS Custom Properties

The component respects the following CSS custom properties:

- `--primary`: Primary color for default state
- `--primary-foreground`: Foreground color for primary state
- `--destructive`: Color for destructive variant
- `--destructive-foreground`: Foreground color for destructive variant
- `--success`: Color for success variant
- `--success-foreground`: Foreground color for success variant
- `--warning`: Color for warning variant
- `--warning-foreground`: Foreground color for warning variant
- `--ring`: Focus ring color
- `--border`: Border color

## Accessibility

The Checkbox component is fully accessible and follows WAI-ARIA guidelines:

### Screen Reader Support

- Uses proper `role="checkbox"` attribute
- Provides `aria-checked` with appropriate values (`true`, `false`, `mixed`)
- Supports `aria-label`, `aria-labelledby`, and `aria-describedby`
- Indicates required and invalid states with `aria-required` and `aria-invalid`

### Keyboard Navigation

- **Space/Enter**: Toggle the checkbox state
- **Tab**: Navigate to/from the checkbox
- **Shift+Tab**: Navigate backwards

### Focus Management

- Visible focus indicator with customizable focus ring
- Proper focus/blur event handling
- Disabled state removes from tab order

### Best Practices

1. **Always provide labels**: Use either visible labels or `aria-label`
2. **Use proper form associations**: Associate checkboxes with labels using `for` attribute or wrapping
3. **Indicate required fields**: Use `aria-required` and visual indicators
4. **Provide error messages**: Use `aria-invalid` and `aria-describedby` for validation errors
5. **Use indeterminate state appropriately**: For parent checkboxes controlling multiple child checkboxes

## Form Integration

The Checkbox component implements Angular's `ControlValueAccessor` interface, making it fully compatible with Angular Forms:

### Template-driven Forms

```html
<form #form="ngForm">
  <div class="flex items-center space-x-2">
    <Checkbox [(ngModel)]="agreeToTerms" name="agreeToTerms" required />
    <label class="text-sm">I agree to the terms and conditions</label>
  </div>
</form>
```

### Reactive Forms

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ExampleComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      agreeToTerms: [false, Validators.requiredTrue],
      newsletter: [false],
      updates: [false]
    });
  }
}
```

```html
<form [formGroup]="form">
  <div class="space-y-3">
    <div class="flex items-center space-x-2">
      <Checkbox formControlName="agreeToTerms" />
      <label class="text-sm">I agree to the terms and conditions</label>
    </div>
    <div class="flex items-center space-x-2">
      <Checkbox formControlName="newsletter" />
      <label class="text-sm">Subscribe to newsletter</label>
    </div>
    <div class="flex items-center space-x-2">
      <Checkbox formControlName="updates" />
      <label class="text-sm">Receive product updates</label>
    </div>
  </div>
</form>
```

## Design System Integration

The Checkbox component integrates seamlessly with design systems:

### Tailwind CSS

Uses Tailwind utility classes for consistent spacing, colors, and typography.

### CSS Custom Properties

Respects CSS custom properties for theme customization.

### Design Tokens

Follows design token conventions for colors, spacing, and typography.

## Performance

The Checkbox component is optimized for performance:

- **Signal-based architecture**: Uses Angular 20 signals for fine-grained reactivity
- **Computed properties**: Reactive updates only when dependencies change
- **Minimal re-renders**: Efficient change detection with signals
- **Tree-shakeable**: Only includes necessary code in your bundle

## Browser Support

The Checkbox component supports all modern browsers:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

Found a bug or want to contribute? Please see our [Contributing Guide](../../CONTRIBUTING.md).

## License

This component is part of Angular SuperUI and is licensed under the MIT License.
