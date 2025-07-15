# Button

A clickable button component with multiple variants, sizes, and states.

## Import

```typescript
import { Button } from 'angular-superui';
```

## Usage

### Basic Button

```html
<lib-button>Click me</lib-button>
```

### Button Variants

```html
<!-- Primary button (default) -->
<lib-button variant="default">Default</lib-button>

<!-- Secondary button -->
<lib-button variant="secondary">Secondary</lib-button>

<!-- Destructive button -->
<lib-button variant="destructive">Destructive</lib-button>

<!-- Outline button -->
<lib-button variant="outline">Outline</lib-button>

<!-- Ghost button -->
<lib-button variant="ghost">Ghost</lib-button>

<!-- Link button -->
<lib-button variant="link">Link</lib-button>
```

### Button Sizes

```html
<!-- Small button -->
<lib-button size="sm">Small</lib-button>

<!-- Default size -->
<lib-button>Default</lib-button>

<!-- Large button -->
<lib-button size="lg">Large</lib-button>

<!-- Icon button -->
<lib-button size="icon">
  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M5 12h14M12 5v14"/>
  </svg>
</lib-button>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'ghost' \| 'link'` | `'default'` | The variant of the button |
| `size` | `'sm' \| 'default' \| 'lg' \| 'icon'` | `'default'` | The size of the button |
| `class` | `string` | `''` | Additional CSS classes |

### Content

| Slot | Description |
|------|-------------|
| Default | The content of the button - supports text, icons, and other elements |

**Note:** Events like `click` are handled through standard Angular event binding on the `<lib-button>` element. Use `(click)="yourHandler()"` to handle button clicks.

## Examples

### Button with Icon

```html
<lib-button>
  <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
  </svg>
  Download
</lib-button>
```

### Simple Button with Event Handling

```html
<lib-button (click)="handleClick()">
  Click me
</lib-button>
```

```typescript
handleClick() {
  console.log('Button clicked!');
}
```

### Button Group

```html
<div class="flex gap-2">
  <lib-button variant="outline">Previous</lib-button>
  <lib-button>Next</lib-button>
</div>
```

### Responsive Button

```html
<lib-button class="w-full sm:w-auto">
  Responsive Button
</lib-button>
```

## Styling Variants

### Default
Primary button with solid background.

### Secondary
Subtle button with secondary styling.

### Destructive
For dangerous actions like delete operations.

### Outline
Button with border and transparent background.

### Ghost
Minimal button with transparent background.

### Link
Button styled to look like a text link.

## Accessibility

- Uses semantic `<button>` element
- Supports keyboard navigation (Enter and Space)
- Proper focus management
- ARIA attributes for disabled states
- Color contrast meets WCAG guidelines

## Custom Styling

You can extend the button with custom classes:

```html
<lib-button class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
  Gradient Button
</lib-button>
```

## TypeScript Usage

```typescript
import { Component } from '@angular/core';
import { Button } from 'angular-superui';

@Component({
  standalone: true,
  imports: [Button],
  template: `
    <lib-button 
      variant="primary" 
      size="lg"
      [disabled]="isSubmitting"
      (click)="handleSubmit()">
      {{ isSubmitting ? 'Submitting...' : 'Submit' }}
    </lib-button>
  `
})
export class MyComponent {
  isSubmitting = false;

  handleSubmit() {
    this.isSubmitting = true;
    // Handle form submission
    setTimeout(() => {
      this.isSubmitting = false;
    }, 2000);
  }
}
```
