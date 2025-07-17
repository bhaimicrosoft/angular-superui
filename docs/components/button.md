# Button

Displays a button or a component that looks like a button.

## Installation

The Button component is available as part of Angular SuperUI. If you haven't initialized Angular SuperUI in your project yet, run:

```bash
ngsui-cli init
```

Then add the Button component to your project:

```bash
ngsui-cli add button
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