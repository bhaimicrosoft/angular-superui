# Card Component 🃏

A flexible card component with multiple variants and sizes for displaying content in contained sections.

## Features

- **Multiple Variants** - Default, outline, ghost, elevated, and filled styles
- **Flexible Sizes** - Small, default, and large sizing options
- **Modular Structure** - Separate components for header, content, and footer
- **Typography Components** - Built-in title and description components
- **Accessibility First** - Semantic HTML structure with proper roles
- **TypeScript Support** - Full type safety and IntelliSense

## Installation

```bash
# Using CLI (recommended)
ngsui-cli add card

# Manual installation
npm install angular-superui
```

## Basic Usage

```typescript
import { Component } from '@angular/core';
import { 
  CardComponent, 
  CardHeaderComponent, 
  CardTitleComponent, 
  CardDescriptionComponent,
  CardContentComponent,
  CardFooterComponent 
} from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    CardFooterComponent
  ],
  template: `
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <button class="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Action
        </button>
      </CardFooter>
    </Card>
  `
})
export class ExampleComponent {}
```

## Examples

### Card Variants

Showcase different visual styles for various use cases:

```typescript
@Component({
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Default Card -->
      <Card variant="default">
        <CardHeader>
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-3">
            <span class="text-white text-xl">🏠</span>
          </div>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Standard card with subtle border and shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">
            Perfect for general content display with clean, minimal styling.
          </p>
        </CardContent>
        <CardFooter>
          <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Default</span>
        </CardFooter>
      </Card>

      <!-- Outline Card -->
      <Card variant="outline">
        <CardHeader>
          <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mb-3">
            <span class="text-white text-xl">📋</span>
          </div>
          <CardTitle>Outline Card</CardTitle>
          <CardDescription>Emphasized border for important content</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">
            Great for highlighting key information or call-to-action sections.
          </p>
        </CardContent>
        <CardFooter>
          <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Outline</span>
        </CardFooter>
      </Card>

      <!-- Elevated Card -->
      <Card variant="elevated">
        <CardHeader>
          <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-3">
            <span class="text-white text-xl">⭐</span>
          </div>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>Enhanced shadow for premium content</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">
            Ideal for featured content, testimonials, or premium offerings.
          </p>
        </CardContent>
        <CardFooter>
          <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Elevated</span>
        </CardFooter>
      </Card>
    </div>
  `
})
export class CardVariantsExample {}
```

### Product Cards

Perfect for e-commerce and product showcases:

```typescript
@Component({
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Product Card 1 -->
      <Card variant="default" class="overflow-hidden hover:shadow-lg transition-shadow">
        <div class="aspect-video bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
          <div class="text-center text-white">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              💻
            </div>
            <p class="text-sm font-medium">Product Image</p>
          </div>
        </div>
        <CardHeader>
          <CardTitle class="text-lg">Premium Laptop</CardTitle>
          <CardDescription>High-performance laptop for professionals</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">Processor:</span>
              <span>Intel i7</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">RAM:</span>
              <span>16GB</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">Storage:</span>
              <span>512GB SSD</span>
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex justify-between items-center">
          <span class="text-2xl font-bold text-primary">$1,299</span>
          <button class="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90">
            Add to Cart
          </button>
        </CardFooter>
      </Card>

      <!-- Product Card 2 -->
      <Card variant="outline" class="overflow-hidden hover:shadow-lg transition-shadow">
        <div class="aspect-video bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
          <div class="text-center text-white">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              📱
            </div>
            <p class="text-sm font-medium">Product Image</p>
          </div>
        </div>
        <CardHeader>
          <CardTitle class="text-lg">Smart Phone</CardTitle>
          <CardDescription>Latest smartphone with advanced features</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">Display:</span>
              <span>6.7" OLED</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">Camera:</span>
              <span>108MP Triple</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">Battery:</span>
              <span>5000mAh</span>
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex justify-between items-center">
          <span class="text-2xl font-bold text-primary">$899</span>
          <button class="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90">
            Add to Cart
          </button>
        </CardFooter>
      </Card>

      <!-- Product Card 3 -->
      <Card variant="elevated" class="overflow-hidden hover:shadow-xl transition-shadow">
        <div class="aspect-video bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center relative">
          <div class="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
            🔥 Hot
          </div>
          <div class="text-center text-white">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              🎧
            </div>
            <p class="text-sm font-medium">Product Image</p>
          </div>
        </div>
        <CardHeader>
          <CardTitle class="text-lg">Wireless Headphones</CardTitle>
          <CardDescription>Premium noise-canceling headphones</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">Battery:</span>
              <span>30h Playback</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">Connectivity:</span>
              <span>Bluetooth 5.0</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">Features:</span>
              <span>ANC, Touch</span>
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex justify-between items-center">
          <span class="text-2xl font-bold text-primary">$349</span>
          <button class="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90">
            Add to Cart
          </button>
        </CardFooter>
      </Card>
    </div>
  `
})
export class ProductCardsExample {}
```

### Profile Cards

Great for team members, user profiles, and testimonials:

```typescript
@Component({
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Team Member Card -->
      <Card variant="default" class="text-center">
        <CardHeader class="pb-2">
          <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-white text-2xl">👨‍💻</span>
          </div>
          <CardTitle class="text-xl">John Doe</CardTitle>
          <CardDescription>Senior Frontend Developer</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground mb-4">
            Passionate about creating beautiful and functional user interfaces with modern technologies.
          </p>
          <div class="flex justify-center space-x-2">
            <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">React</span>
            <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Angular</span>
            <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">TypeScript</span>
          </div>
        </CardContent>
        <CardFooter class="justify-center">
          <div class="flex space-x-2">
            <button class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-600">
              in
            </button>
            <button class="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm hover:bg-gray-900">
              @
            </button>
          </div>
        </CardFooter>
      </Card>

      <!-- Customer Testimonial -->
      <Card variant="outline" class="relative">
        <div class="absolute top-4 right-4 text-4xl opacity-20">"</div>
        <CardHeader>
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
              <span class="text-white">👩‍💼</span>
            </div>
            <div>
              <CardTitle class="text-lg">Sarah Johnson</CardTitle>
              <CardDescription>Product Manager at TechCorp</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground italic">
            "This component library has significantly improved our development speed. The quality and consistency are outstanding!"
          </p>
        </CardContent>
        <CardFooter>
          <div class="flex items-center space-x-1">
            <span class="text-yellow-400">⭐⭐⭐⭐⭐</span>
            <span class="text-xs text-muted-foreground ml-2">5.0 rating</span>
          </div>
        </CardFooter>
      </Card>

      <!-- Achievement Card -->
      <Card variant="filled" class="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <span class="text-white text-2xl">🏆</span>
          </div>
          <CardTitle class="text-xl text-yellow-800">Achievement Unlocked!</CardTitle>
          <CardDescription class="text-yellow-700">Milestone Reached</CardDescription>
        </CardHeader>
        <CardContent class="text-center">
          <p class="text-sm text-yellow-700 mb-3">
            Congratulations! You've successfully completed 100 projects.
          </p>
          <div class="bg-yellow-200 rounded-full h-2 mb-2">
            <div class="bg-yellow-500 h-2 rounded-full w-full"></div>
          </div>
          <span class="text-xs text-yellow-600">100/100 Projects Complete</span>
        </CardContent>
        <CardFooter class="justify-center">
          <button class="px-4 py-2 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600">
            View Details
          </button>
        </CardFooter>
      </Card>
    </div>
  `
})
export class ProfileCardsExample {}
```

### Dashboard Cards

Ideal for analytics, metrics, and data visualization:

```typescript
@Component({
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Metric Card 1 -->
      <Card variant="default" class="hover:shadow-md transition-shadow">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Total Users</p>
              <p class="text-2xl font-bold">12,345</p>
              <p class="text-xs text-green-600 flex items-center mt-1">
                <span class="mr-1">📈</span>
                +12% from last month
              </p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span class="text-blue-600 text-xl">👥</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Metric Card 2 -->
      <Card variant="default" class="hover:shadow-md transition-shadow">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Revenue</p>
              <p class="text-2xl font-bold">$89,432</p>
              <p class="text-xs text-green-600 flex items-center mt-1">
                <span class="mr-1">💰</span>
                +8% from last month
              </p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span class="text-green-600 text-xl">💵</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Metric Card 3 -->
      <Card variant="default" class="hover:shadow-md transition-shadow">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Orders</p>
              <p class="text-2xl font-bold">1,234</p>
              <p class="text-xs text-red-600 flex items-center mt-1">
                <span class="mr-1">📉</span>
                -3% from last month
              </p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span class="text-purple-600 text-xl">🛍️</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Metric Card 4 -->
      <Card variant="default" class="hover:shadow-md transition-shadow">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Conversion</p>
              <p class="text-2xl font-bold">3.4%</p>
              <p class="text-xs text-green-600 flex items-center mt-1">
                <span class="mr-1">🎯</span>
                +0.8% from last month
              </p>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span class="text-orange-600 text-xl">📊</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  `
})
export class DashboardCardsExample {}
```

## API Reference

### Card

The main card container component.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'outline' \| 'ghost' \| 'elevated' \| 'filled'` | `'default'` | Visual style variant of the card |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size variant affecting padding |
| `class` | `string` | `''` | Additional CSS classes |

### CardHeader

Container for card header content including title and description.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size variant affecting padding |
| `class` | `string` | `''` | Additional CSS classes |

### CardTitle

Typography component for card titles.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `class` | `string` | `''` | Additional CSS classes |

### CardDescription

Typography component for card descriptions.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `class` | `string` | `''` | Additional CSS classes |

### CardContent

Container for the main card content.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size variant affecting padding |
| `class` | `string` | `''` | Additional CSS classes |

### CardFooter

Container for card footer content like actions or metadata.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size variant affecting padding |
| `class` | `string` | `''` | Additional CSS classes |

### Available Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `default` | Standard card with subtle border and shadow | General content display |
| `outline` | Emphasized border with thicker stroke | Important or highlighted content |
| `ghost` | No border or shadow, transparent background | Minimal or nested content |
| `elevated` | Enhanced shadow for depth | Featured or premium content |
| `filled` | Muted background color | Secondary or background content |

### Available Sizes

| Size | Description | Padding |
|------|-------------|---------|
| `sm` | Compact size for dense layouts | 16px (1rem) |
| `default` | Standard size for most use cases | 24px (1.5rem) |
| `lg` | Large size for prominent content | 32px (2rem) |

## Accessibility

The Card component family is built with accessibility in mind:

### Accessibility Features

- **Semantic Structure**: Uses proper HTML hierarchy and landmarks
- **Keyboard Navigation**: Maintains tab order for interactive elements
- **Screen Reader Support**: Proper heading levels and content structure
- **Focus Management**: Preserves focus within card interactions
- **Color Contrast**: Meets WCAG guidelines for text contrast

### Best Practices

1. **Use proper heading hierarchy** with CardTitle components
2. **Include descriptive text** in CardDescription for context
3. **Ensure interactive elements** are keyboard accessible
4. **Provide sufficient color contrast** for custom styling
5. **Use semantic HTML** within card content areas
6. **Test with screen readers** to verify proper navigation

## Styling

The component uses Tailwind CSS classes and CVA for styling:

```typescript
const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: 'border-border',
        outline: 'border-2 border-border',
        ghost: 'border-transparent shadow-none',
        elevated: 'border-border shadow-lg',
        filled: 'bg-muted border-muted'
      },
      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);
```

## Common Use Cases

### 1. Product Showcases

Display products with images, descriptions, pricing, and actions.

### 2. User Profiles

Show team members, customer testimonials, or user information.

### 3. Dashboard Metrics

Present key performance indicators and analytics data.

### 4. Content Cards

Blog posts, articles, or media content with structured layout.

### 5. Feature Highlights

Showcase application features or service offerings.

### 6. Settings Panels

Configuration options grouped in logical sections.

## Usage Guidelines

1. **Choose appropriate variants** based on content importance and context
2. **Maintain consistent sizing** within the same layout or section
3. **Use proper typography hierarchy** with title and description components
4. **Consider mobile responsiveness** when designing card layouts
5. **Group related actions** in the footer section
6. **Provide loading states** for dynamic content
7. **Test different content lengths** to ensure proper layout
8. **Use hover effects sparingly** to enhance user experience

## Browser Support

The component works across all modern browsers:

- **Chrome**: Full support
- **Firefox**: Full support  
- **Safari**: Full support
- **Edge**: Full support
- **IE11**: Not supported (requires CSS Grid and Flexbox)
