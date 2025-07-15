# Alert

Display contextual feedback messages to users with different variants for different situations.

## Import

```typescript
import { Alert } from 'angular-superui';
```

## Usage

### Basic Alert

```html
<lib-alert>
  <h5 class="mb-1 font-medium leading-none tracking-tight">Heads up!</h5>
  <div class="text-sm [&_p]:leading-relaxed">
    You can add components to your app using the CLI.
  </div>
</lib-alert>
```

### Success Alert

```html
<lib-alert variant="success">
  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
  <h5 class="mb-1 font-medium leading-none tracking-tight">Success!</h5>
  <div class="text-sm [&_p]:leading-relaxed">
    Your changes have been saved successfully.
  </div>
</lib-alert>
```

### Warning Alert

```html
<lib-alert variant="warning">
  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </svg>
  <h5 class="mb-1 font-medium leading-none tracking-tight">Warning</h5>
  <div class="text-sm [&_p]:leading-relaxed">
    Please review your settings before proceeding.
  </div>
</lib-alert>
```

### Error Alert

```html
<lib-alert variant="destructive">
  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
  <h5 class="mb-1 font-medium leading-none tracking-tight">Error</h5>
  <div class="text-sm [&_p]:leading-relaxed">
    Your session has expired. Please log in again.
  </div>
</lib-alert>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'success' \| 'warning' \| 'destructive'` | `'default'` | The variant of the alert |
| `class` | `string` | `''` | Additional CSS classes |

### Content

| Slot | Description |
|------|-------------|
| Default | The content of the alert - supports any HTML content including text, icons, and other elements |

## Examples

### Alert with Icon

Icons are positioned on the right side of the alert automatically when included:

```html
<lib-alert variant="success">
  <!-- Icon will be positioned on the right -->
  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
  
  <!-- Content will have appropriate spacing -->
  <div>
    <h5 class="font-medium">Success!</h5>
    <p class="text-sm text-muted-foreground">
      Your operation completed successfully.
    </p>
  </div>
</lib-alert>
```

### Alert without Icon

```html
<lib-alert variant="default">
  <div>
    <h5 class="font-medium">Note</h5>
    <p class="text-sm text-muted-foreground">
      This is a simple alert without an icon.
    </p>
  </div>
</lib-alert>
```

### Custom Styling

You can add custom classes for additional styling:

```html
<lib-alert variant="default" class="border-l-4 border-blue-500">
  <div>
    <h5 class="font-medium text-blue-900">Custom Alert</h5>
    <p class="text-sm text-blue-700">
      This alert has custom border styling.
    </p>
  </div>
</lib-alert>
```

## Accessibility

- The alert uses `role="alert"` for screen readers
- Colors meet WCAG contrast requirements
- Semantic HTML structure for better accessibility

## Styling

The alert component uses CSS custom properties that can be customized through your Tailwind configuration:

```css
:root {
  --border: 214.3 31.8% 91.4%;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
}
```
