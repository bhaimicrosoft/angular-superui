# Badge

Display small pieces of information or status indicators.

## Import

```typescript
import { Badge } from 'angular-superui';
```

## Usage

### Basic Badge

```html
<badge>New</badge>
```

### Badge Variants

```html
<badge variant="default">Default</badge>
<badge variant="secondary">Secondary</badge>
<badge variant="destructive">Error</badge>
<badge variant="outline">Outline</badge>
<badge variant="success">Success</badge>
<badge variant="warning">Warning</badge>
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
  <badge variant="success">Active</badge>
  <badge variant="warning">Pending</badge>
  <badge variant="destructive">Inactive</badge>
</div>
```

### Notification Badge

```html
<div class="relative inline-flex">
  <button variant="outline">Messages</button>
  <badge class="absolute -top-2 -right-2 px-2 py-1 text-xs">3</badge>
</div>
```

### Category Tags

```html
<div class="flex flex-wrap gap-2">
  <badge variant="outline">React</badge>
  <badge variant="outline">TypeScript</badge>
  <badge variant="outline">Angular</badge>
</div>
```
