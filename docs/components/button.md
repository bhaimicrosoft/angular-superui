# Button

A clickable button component with multiple variants, sizes, and states.

## Import

```typescript
import { Button } from 'angular-superui';
```

## Usage

### Basic Button

```html
<button>Click me</button>
```

### Button Variants

```html
<!-- Primary button (default) -->
<button variant="default">Default</button>

<!-- Secondary button -->
<button variant="secondary">Secondary</button>

<!-- Destructive button -->
<button variant="destructive">Destructive</button>

<!-- Outline button -->
<button variant="outline">Outline</button>

<!-- Ghost button -->
<button variant="ghost">Ghost</button>

<!-- Link button -->
<button variant="link">Link</button>
```

### Button Sizes

```html
<!-- Small button -->
<button size="sm">Small</button>

<!-- Default size -->
<button>Default</button>

<!-- Large button -->
<button size="lg">Large</button>

<!-- Icon button -->
<button size="icon">
  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M5 12h14M12 5v14"/>
  </svg>
</button>
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

**Note:** Events like `click` are handled through standard Angular event binding on the `<button>` element. Use `(click)="yourHandler()"` to handle button clicks.

## Examples

### Button with Icon

```html
<button>
  <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
  </svg>
  Download
</button>
```

### Simple Button with Event Handling

```html
<button (click)="handleClick()">
  Click me
</button>
```

```typescript
handleClick() {
  console.log('Button clicked!');
}
```

### Button Group

```html
<div class="flex gap-2">
  <button variant="outline">Previous</button>
  <button>Next</button>
</div>
```

### Responsive Button

```html
<button class="w-full sm:w-auto">
  Responsive Button
</button>
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
<button class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
  Gradient Button
</button>
```

## TypeScript Usage

```typescript
import { Component } from '@angular/core';
import { Button } from 'angular-superui';

@Component({
  standalone: true,
  imports: [Button],
  template: `
    <button 
      variant="primary" 
      size="lg"
      [disabled]="isSubmitting"
      (click)="handleSubmit()">
      {{ isSubmitting ? 'Submitting...' : 'Submit' }}
    </button>
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
