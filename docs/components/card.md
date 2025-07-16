# Card

A flexible container component for displaying content in a structured layout.

## Import

```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'angular-superui';
```

## Usage

### Basic Card

```html
<card>
  <card-header>
    <card-title>Card Title</card-title>
    <card-description>Card description goes here</lib-card-description>
  </card-header>
  <card-content>
    <p>Card content goes here.</p>
  </card-content>
  <card-footer>
    <button>Action</button>
  </card-footer>
</card>
```

### Card Variants

```html
<!-- Default card -->
<card>Content</card>

<!-- Outlined card -->
<card variant="outlined">Content</card>

<!-- Elevated card -->
<card variant="elevated">Content</card>

<!-- Filled card -->
<card variant="filled">Content</card>
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
<card class="w-[350px]">
  <card-header>
    <card-title>John Doe</card-title>
    <card-description>Software Developer</lib-card-description>
  </card-header>
  <card-content>
    <p>Passionate about creating amazing user experiences with modern technologies.</p>
  </card-content>
  <card-footer>
    <button>View Profile</button>
    <button variant="outline">Contact</button>
  </card-footer>
</card>
```

### Stats Card

```html
<card variant="elevated">
  <card-header>
    <card-title>Total Sales</card-title>
  </card-header>
  <card-content>
    <div class="text-2xl font-bold">$45,231.89</div>
    <p class="text-xs text-muted-foreground">+20.1% from last month</p>
  </card-content>
</card>
```

## Accessibility

- Cards include proper semantic structure
- All interactive elements are keyboard accessible
- Screen reader friendly with proper heading hierarchy
