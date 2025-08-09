# Feature Card Block 🎯

Showcase features, products, or services with beautiful card layouts. Fully configurable with content projection for unlimited customization and flexible layouts that adapt to your content needs.

## Features

- 🎨 **Multiple Variants** - Default, minimal, glass, gradient, outlined, and filled styles
- 📱 **Responsive Design** - Mobile-first approach with flexible grid layouts
- 🔧 **Content Projection** - Unlimited customization through slot-based architecture
- ⚡ **Interactive States** - Hover effects, click handling, and focus management
- 🎯 **Flexible Sizing** - From compact cards to large feature showcases
- ♿ **Accessibility** - ARIA compliant with keyboard navigation support
- 🎭 **Theme Aware** - Automatic dark mode support with Tailwind CSS
- 🚀 **Performance** - Optimized rendering with Angular signals

## Installation

Add the Feature Card Block component:

```bash
npx ngsui-cli add block feature-card
```

## Usage

Create feature cards with custom content using slot-based architecture:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCardBlock } from '@lib/blocks/feature-card';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, FeatureCardBlock],
  template: `
    <!-- Basic Feature Card -->
    <FeatureCardBlock variant="default" size="default" spacing="default">
      <div slot="icon" class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      </div>
      <h3 slot="title" class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
      <p slot="description" class="text-gray-600 dark:text-gray-300">Optimized performance with modern Angular features and lazy loading.</p>
      <button slot="cta" class="mt-4 text-blue-600 hover:text-blue-700 font-medium">Learn More →</button>
    </FeatureCardBlock>
  `
})
export class ExampleComponent {}
```

## Examples

### Default Style Cards

```typescript
@Component({
  imports: [CommonModule, FeatureCardBlock],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <FeatureCardBlock variant="default" size="default" spacing="default">
        <div slot="icon" class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 slot="title" class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
        <p slot="description" class="text-gray-600 dark:text-gray-300">Optimized performance with modern Angular features and lazy loading.</p>
        <button slot="cta" class="mt-4 text-blue-600 hover:text-blue-700 font-medium">Learn More →</button>
      </FeatureCardBlock>

      <FeatureCardBlock variant="default" size="default" spacing="default">
        <div slot="icon" class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 slot="title" class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Type Safe</h3>
        <p slot="description" class="text-gray-600 dark:text-gray-300">Built with TypeScript for better developer experience and fewer runtime errors.</p>
        <button slot="cta" class="mt-4 text-green-600 hover:text-green-700 font-medium">Explore →</button>
      </FeatureCardBlock>

      <FeatureCardBlock variant="default" size="default" spacing="default">
        <div slot="icon" class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
          </svg>
        </div>
        <h3 slot="title" class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Customizable</h3>
        <p slot="description" class="text-gray-600 dark:text-gray-300">Unlimited customization with content projection and Tailwind CSS classes.</p>
        <button slot="cta" class="mt-4 text-purple-600 hover:text-purple-700 font-medium">Customize →</button>
      </FeatureCardBlock>
    </div>
  `
})
```

### Gradient Style with Enhanced Content

```typescript
@Component({
  imports: [CommonModule, FeatureCardBlock],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FeatureCardBlock variant="gradient" size="lg" spacing="relaxed">
        <div slot="badge" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mb-4">
          Popular
        </div>
        <div slot="icon" class="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
        </div>
        <h3 slot="title" class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Premium Features</h3>
        <p slot="description" class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          Access advanced components, premium themes, and priority support for your projects.
        </p>
        <div slot="stats" class="flex items-center gap-6 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="text-center">
            <div class="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
            <div class="text-sm text-gray-500">Components</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-gray-900 dark:text-white">10+</div>
            <div class="text-sm text-gray-500">Themes</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
            <div class="text-sm text-gray-500">Support</div>
          </div>
        </div>
      </FeatureCardBlock>

      <FeatureCardBlock variant="gradient" size="lg" spacing="relaxed">
        <div slot="icon" class="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
        </div>
        <h3 slot="title" class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Smart Analytics</h3>
        <p slot="description" class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          Get insights into your application performance with built-in analytics and monitoring.
        </p>
        <div slot="actions" class="flex gap-3 mt-6">
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </button>
          <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Learn More
          </button>
        </div>
      </FeatureCardBlock>
    </div>
  `
})
```

### Glass Effect Style

```typescript
@Component({
  imports: [CommonModule, FeatureCardBlock],
  template: `
    <div class="relative p-8 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCardBlock variant="glass" size="default" spacing="default">
          <div slot="icon" class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h3 slot="title" class="text-lg font-semibold text-white mb-2">Secure</h3>
          <p slot="description" class="text-white/80">Enterprise-grade security with encryption and authentication.</p>
        </FeatureCardBlock>

        <FeatureCardBlock variant="glass" size="default" spacing="default">
          <div slot="icon" class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 slot="title" class="text-lg font-semibold text-white mb-2">Fast</h3>
          <p slot="description" class="text-white/80">Optimized for performance with lazy loading and caching.</p>
        </FeatureCardBlock>

        <FeatureCardBlock variant="glass" size="default" spacing="default">
          <div slot="icon" class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h3 slot="title" class="text-lg font-semibold text-white mb-2">Loved</h3>
          <p slot="description" class="text-white/80">Trusted by thousands of developers worldwide.</p>
        </FeatureCardBlock>
      </div>
    </div>
  `
})
```

### Minimal Style with Icon Component

```typescript
import { Icon } from '@lib/components/icon';

@Component({
  imports: [CommonModule, FeatureCardBlock, Icon],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <FeatureCardBlock variant="minimal" size="default" spacing="compact">
        <div slot="icon" class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mb-3">
          <Icon icon="fas fa-bolt" size="sm" variant="default" class="text-white" ariaLabel="Performance icon" />
        </div>
        <h3 slot="title" class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Performance</h3>
        <p slot="description" class="text-gray-600 dark:text-gray-300 text-sm">Optimized for speed</p>
      </FeatureCardBlock>

      <FeatureCardBlock variant="minimal" size="default" spacing="compact">
        <div slot="icon" class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-3">
          <Icon icon="fas fa-shield-alt" size="sm" variant="default" class="text-white" ariaLabel="Security icon" />
        </div>
        <h3 slot="title" class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Security</h3>
        <p slot="description" class="text-gray-600 dark:text-gray-300 text-sm">Enterprise-grade protection</p>
      </FeatureCardBlock>

      <FeatureCardBlock variant="minimal" size="default" spacing="compact">
        <div slot="icon" class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mb-3">
          <Icon icon="fas fa-expand-arrows-alt" size="sm" variant="default" class="text-white" ariaLabel="Scalability icon" />
        </div>
        <h3 slot="title" class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Scalability</h3>
        <p slot="description" class="text-gray-600 dark:text-gray-300 text-sm">Grows with your needs</p>
      </FeatureCardBlock>

      <FeatureCardBlock variant="minimal" size="default" spacing="compact">
        <div slot="icon" class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mb-3">
          <Icon icon="fas fa-headset" size="sm" variant="default" class="text-white" ariaLabel="Support icon" />
        </div>
        <h3 slot="title" class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Support</h3>
        <p slot="description" class="text-gray-600 dark:text-gray-300 text-sm">24/7 expert assistance</p>
      </FeatureCardBlock>
    </div>
  `
})
```

### Interactive Cards with Events

```typescript
@Component({
  imports: [CommonModule, FeatureCardBlock],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FeatureCardBlock 
        variant="outlined" 
        size="lg" 
        [interactive]="true"
        (cardClick)="onCardClick('premium')"
        (cardHover)="onCardHover('premium')"
      >
        <div slot="badge" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-4">
          Recommended
        </div>
        <h3 slot="title" class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Premium Plan</h3>
        <p slot="description" class="text-gray-600 dark:text-gray-300 mb-4">
          Everything you need to build professional applications with advanced features.
        </p>
        <div slot="actions" class="flex items-center justify-between">
          <span class="text-2xl font-bold text-gray-900 dark:text-white">$29/mo</span>
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Choose Plan
          </button>
        </div>
      </FeatureCardBlock>

      <FeatureCardBlock 
        variant="filled" 
        size="lg" 
        [highlighted]="true"
        [interactive]="true"
        (cardClick)="onCardClick('enterprise')"
      >
        <h3 slot="title" class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Enterprise</h3>
        <p slot="description" class="text-gray-600 dark:text-gray-300 mb-4">
          Custom solutions for large teams with dedicated support and advanced security.
        </p>
        <div slot="actions" class="flex items-center justify-between">
          <span class="text-lg text-gray-600 dark:text-gray-400">Custom pricing</span>
          <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Contact Sales
          </button>
        </div>
      </FeatureCardBlock>
    </div>
  `
})
export class InteractiveCardsComponent {
  onCardClick(plan: string) {
    console.log('Card clicked:', plan);
  }

  onCardHover(plan: string) {
    console.log('Card hovered:', plan);
  }
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'minimal' \| 'glass' \| 'gradient' \| 'outlined' \| 'filled' \| 'custom'` | `'default'` | Card visual style variant |
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl' \| 'custom'` | `'default'` | Card padding and size |
| `spacing` | `'compact' \| 'default' \| 'relaxed' \| 'custom'` | `'default'` | Internal content spacing |
| `highlighted` | `boolean` | `false` | Adds highlight ring to card |
| `disabled` | `boolean` | `false` | Disables interactions and adds opacity |
| `interactive` | `boolean` | `true` | Enables hover effects and cursor pointer |
| `class` | `string` | `''` | Additional CSS classes for the card |
| `contentClass` | `string` | `''` | Additional CSS classes for content area |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `cardClick` | `EventEmitter<MouseEvent>` | Emitted when card is clicked |
| `cardHover` | `EventEmitter<MouseEvent>` | Emitted when card is hovered |
| `cardFocus` | `EventEmitter<FocusEvent>` | Emitted when card receives focus |

### Content Slots

| Slot | Description | Usage |
|------|-------------|-------|
| `slot="icon"` | Icon or media area | Icons, images, or custom graphics |
| `slot="media"` | Alternative media slot | Images, videos, or complex media |
| `slot="image"` | Image-specific slot | Product images, avatars, etc. |
| `slot="badge"` | Badge or label area | Status badges, labels, or tags |
| `slot="title"` | Main heading | Card title or name |
| `slot="description"` | Description text | Card description or details |
| `slot="stats"` | Statistics area | Numbers, metrics, or data points |
| `slot="metrics"` | Alternative metrics slot | Performance indicators, ratings |
| `slot="actions"` | Action buttons area | CTAs, buttons, or links |
| `slot="cta"` | Call-to-action slot | Primary action buttons |
| `slot="footer"` | Footer content | Additional information or links |
| `slot="overlay"` | Overlay content | Decorative overlays or badges |
| `slot="decorative"` | Decorative elements | Background patterns, gradients |

### Variant Styles

| Variant | Description | Use Case |
|---------|-------------|----------|
| `default` | Standard card with shadow and border | General purpose feature cards |
| `minimal` | Clean design without borders/shadows | Simple content presentation |
| `glass` | Glassmorphism effect with backdrop blur | Modern, overlay-style cards |
| `gradient` | Subtle gradient background | Premium or highlighted content |
| `outlined` | Prominent border styling | Interactive or selectable cards |
| `filled` | Colored background with subtle styling | Grouped or categorized content |
| `custom` | No default styling | Complete customization control |

## Styling

### Custom Styling

```typescript
@Component({
  template: `
    <FeatureCardBlock 
      variant="custom"
      class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl shadow-2xl"
      contentClass="space-y-6"
    >
      <div slot="icon" class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
        <Icon icon="fas fa-rocket" size="lg" class="text-white" />
      </div>
      <h3 slot="title" class="text-2xl font-bold">Custom Styled Card</h3>
      <p slot="description" class="text-white/90">
        Complete control over styling with custom variant.
      </p>
    </FeatureCardBlock>
  `
})
```

### Responsive Design

```typescript
@Component({
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      <FeatureCardBlock 
        variant="default" 
        size="default"
        class="lg:col-span-2"
      >
        <!-- Featured card spanning 2 columns on large screens -->
      </FeatureCardBlock>
      
      <FeatureCardBlock variant="minimal" size="sm" class="sm:size-default">
        <!-- Adaptive sizing based on screen size -->
      </FeatureCardBlock>
    </div>
  `
})
```

### Dark Mode Support

```typescript
@Component({
  template: `
    <FeatureCardBlock 
      variant="default"
      class="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    >
      <h3 slot="title" class="text-gray-900 dark:text-white">Dark Mode Ready</h3>
      <p slot="description" class="text-gray-600 dark:text-gray-300">
        Automatic dark mode support with Tailwind CSS classes.
      </p>
    </FeatureCardBlock>
  `
})
```

## Best Practices

### Content Organization

- Use clear, descriptive titles that communicate the main benefit
- Keep descriptions concise but informative (1-2 sentences)
- Place primary actions prominently with clear CTAs
- Use icons that are immediately recognizable and relevant

### Layout Guidelines

- Maintain consistent card heights within the same row
- Use appropriate grid layouts for different screen sizes
- Ensure adequate spacing between cards for readability
- Consider card aspect ratios for visual balance

### Accessibility

- Provide meaningful alt text for icons and images
- Use semantic HTML within content slots
- Ensure sufficient color contrast for text content
- Test keyboard navigation and screen reader compatibility

### Performance

- Optimize images and icons for web delivery
- Use lazy loading for cards below the fold
- Consider virtualization for large lists of cards
- Minimize complex animations that impact performance

### Interactive Design

- Use hover effects to indicate interactivity
- Provide clear visual feedback for user actions
- Implement loading states for async operations
- Consider mobile touch interactions and gestures

### Content Strategy

- Focus on benefits rather than features in descriptions
- Use action-oriented language for CTAs
- Group related cards logically with consistent styling
- Test different layouts and content variations for effectiveness

## Examples in Production

### Feature Showcase

Perfect for highlighting product features, service offerings, or key benefits on landing pages.

### Pricing Plans

Ideal for presenting different subscription tiers or service packages with clear comparisons.

### Team Members

Great for showcasing team members with photos, roles, and brief descriptions.

### Portfolio Items

Excellent for displaying work samples, case studies, or project highlights.

### Service Offerings

Suitable for presenting different services with icons, descriptions, and booking links.

### Product Cards

Perfect for e-commerce product listings with images, descriptions, and purchase options.
