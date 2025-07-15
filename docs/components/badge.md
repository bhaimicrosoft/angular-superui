# Badge

Display small pieces of information or status indicators.

## Import

```typescript
import { Badge } from 'angular-superui';
```

## Usage

### Basic Badge

```html
<lib-badge>New</lib-badge>
```

### Badge Variants

```html
<lib-badge variant="default">Default</lib-badge>
<lib-badge variant="secondary">Secondary</lib-badge>
<lib-badge variant="destructive">Error</lib-badge>
<lib-badge variant="outline">Outline</lib-badge>
<lib-badge variant="success">Success</lib-badge>
<lib-badge variant="warning">Warning</lib-badge>
```

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'success' \| 'warning'` | `'default'` | Visual variant of the badge |
| `class` | `string` | `''` | Additional CSS classes |

## Examples

### Status Badges

```html
<div class="flex gap-2">
  <lib-badge variant="success">Active</lib-badge>
  <lib-badge variant="warning">Pending</lib-badge>
  <lib-badge variant="destructive">Inactive</lib-badge>
</div>
```

### Notification Badge

```html
<div class="relative inline-flex">
  <lib-button variant="outline">Messages</lib-button>
  <lib-badge class="absolute -top-2 -right-2 px-2 py-1 text-xs">3</lib-badge>
</div>
```

### Category Tags

```html
<div class="flex flex-wrap gap-2">
  <lib-badge variant="outline">React</lib-badge>
  <lib-badge variant="outline">TypeScript</lib-badge>
  <lib-badge variant="outline">Angular</lib-badge>
</div>
```
