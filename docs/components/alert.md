# Alert Component

A customizable alert component for displaying important messages with various severity levels.

## Installation

```bash
npx @angular-superui/cli add alert
```

## Import

```typescript
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@angular-superui/lib';
```

## Usage

### Basic Alert

```html
<Alert>
  <AlertIcon>
    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </AlertIcon>
  <div class="flex-1">
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components and dependencies to your app using the cli.
    </AlertDescription>
  </div>
</Alert>
```

### Alert Variants

#### Default Alert
```html
<Alert>
  <AlertIcon>
    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </AlertIcon>
  <div class="flex-1">
    <AlertTitle>Information</AlertTitle>
    <AlertDescription>
      This is a default alert for general information.
    </AlertDescription>
  </div>
</Alert>
```

#### Destructive Alert
```html
<Alert variant="destructive">
  <AlertIcon>
    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  </AlertIcon>
  <div class="flex-1">
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Your session has expired. Please log in again.
    </AlertDescription>
  </div>
</Alert>
```

#### Warning Alert
```html
<Alert variant="warning">
  <AlertIcon>
    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  </AlertIcon>
  <div class="flex-1">
    <AlertTitle>Warning</AlertTitle>
    <AlertDescription>
      This action cannot be undone. Please proceed with caution.
    </AlertDescription>
  </div>
</Alert>
```

#### Success Alert
```html
<Alert variant="success">
  <AlertIcon>
    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </AlertIcon>
  <div class="flex-1">
    <AlertTitle>Success</AlertTitle>
    <AlertDescription>
      Your changes have been saved successfully.
    </AlertDescription>
  </div>
</Alert>
```

#### Info Alert
```html
<Alert variant="info">
  <AlertIcon>
    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </AlertIcon>
  <div class="flex-1">
    <AlertTitle>Information</AlertTitle>
    <AlertDescription>
      You have 3 unread messages in your inbox.
    </AlertDescription>
  </div>
</Alert>
```

### Simple Alert (Without Icon)

```html
<Alert variant="success">
  <div class="flex-1">
    <AlertTitle>Success!</AlertTitle>
    <AlertDescription>
      Operation completed successfully.
    </AlertDescription>
  </div>
</Alert>
```

### Alert with Custom Content

```html
<Alert variant="warning">
  <AlertIcon>
    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  </AlertIcon>
  <div class="flex-1">
    <AlertTitle>Update Available</AlertTitle>
    <AlertDescription>
      A new version of the application is available. 
      <a href="#" class="font-medium underline">Update now</a> or 
      <button class="font-medium underline">remind me later</button>.
    </AlertDescription>
  </div>
</Alert>
```

## Component API

### Alert

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'warning' \| 'success' \| 'info'` | `'default'` | The visual style variant |
| `className` | `string` | `undefined` | Additional CSS classes |

### AlertIcon

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes |

### AlertTitle

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes |

### AlertDescription

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes |

## TypeScript Support

All components are fully typed with TypeScript:

```typescript
import { Component } from '@angular/core';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@angular-superui/lib';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Alert, AlertIcon, AlertTitle, AlertDescription],
  template: `
    <Alert variant="success" className="mb-4">
      <AlertIcon>
        <!-- Your icon here -->
      </AlertIcon>
      <div class="flex-1">
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your action completed successfully.
        </AlertDescription>
      </div>
    </Alert>
  `
})
export class ExampleComponent {}
```

## Accessibility

- Uses semantic HTML with proper ARIA attributes
- Supports keyboard navigation
- Screen reader friendly with proper labeling
- Live regions for dynamic alerts (automatically announced)
- Color-blind friendly design with multiple visual indicators

## Styling

The Alert component uses Tailwind CSS classes and can be customized:

```html
<Alert className="border-2 shadow-lg" variant="info">
  <!-- Alert content -->
</Alert>
```

## Common Patterns

### Dismissible Alert

```html
<Alert variant="warning" className="relative">
  <AlertIcon>
    <!-- Warning icon -->
  </AlertIcon>
  <div class="flex-1">
    <AlertTitle>Warning</AlertTitle>
    <AlertDescription>
      This is a dismissible warning alert.
    </AlertDescription>
  </div>
  <button class="absolute top-2 right-2 p-1 hover:bg-slate-100 rounded">
    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</Alert>
```

### Loading Alert

```html
<Alert variant="info">
  <AlertIcon>
    <div class="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
  </AlertIcon>
  <div class="flex-1">
    <AlertTitle>Loading...</AlertTitle>
    <AlertDescription>
      Please wait while we process your request.
    </AlertDescription>
  </div>
</Alert>
```
