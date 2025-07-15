# Card

A flexible container component for displaying content in a structured layout.

## Import

```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'angular-superui';
```

## Usage

### Basic Card

```html
<lib-card>
  <lib-card-header>
    <lib-card-title>Card Title</lib-card-title>
    <lib-card-description>Card description goes here</lib-card-description>
  </lib-card-header>
  <lib-card-content>
    <p>Card content goes here.</p>
  </lib-card-content>
  <lib-card-footer>
    <lib-button>Action</lib-button>
  </lib-card-footer>
</lib-card>
```

### Card Variants

```html
<!-- Default card -->
<lib-card>Content</lib-card>

<!-- Outlined card -->
<lib-card variant="outlined">Content</lib-card>

<!-- Elevated card -->
<lib-card variant="elevated">Content</lib-card>

<!-- Filled card -->
<lib-card variant="filled">Content</lib-card>
```

## API Reference

### Card

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'outlined' \| 'elevated' \| 'filled'` | `'default'` | Visual variant of the card |
| `class` | `string` | `''` | Additional CSS classes |

### CardHeader

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `class` | `string` | `''` | Additional CSS classes |

### CardTitle

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `class` | `string` | `''` | Additional CSS classes |

### CardDescription

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `class` | `string` | `''` | Additional CSS classes |

### CardContent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `class` | `string` | `''` | Additional CSS classes |

### CardFooter

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `class` | `string` | `''` | Additional CSS classes |

## Examples

### Simple Profile Card

```html
<lib-card class="w-[350px]">
  <lib-card-header>
    <lib-card-title>John Doe</lib-card-title>
    <lib-card-description>Software Developer</lib-card-description>
  </lib-card-header>
  <lib-card-content>
    <p>Passionate about creating amazing user experiences with modern technologies.</p>
  </lib-card-content>
  <lib-card-footer>
    <lib-button>View Profile</lib-button>
    <lib-button variant="outline">Contact</lib-button>
  </lib-card-footer>
</lib-card>
```

### Stats Card

```html
<lib-card variant="elevated">
  <lib-card-header>
    <lib-card-title>Total Sales</lib-card-title>
  </lib-card-header>
  <lib-card-content>
    <div class="text-2xl font-bold">$45,231.89</div>
    <p class="text-xs text-muted-foreground">+20.1% from last month</p>
  </lib-card-content>
</lib-card>
```

## Accessibility

- Cards include proper semantic structure
- All interactive elements are keyboard accessible
- Screen reader friendly with proper heading hierarchy
