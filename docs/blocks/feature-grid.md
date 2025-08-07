# Feature Grid Block 🎯

Showcase your product features with icons, descriptions, and compelling layouts. Perfect for highlighting key benefits, capabilities, and product features in an organized grid format.

## Features

- 🎯 **4 Section Variants** - Default, Gradient, Dark, Minimal
- 🎨 **4 Card Variants** - Default, Minimal, Glass, Gradient
- 📏 **Flexible Columns** - 2, 3, 4, or 6 column layouts
- 🎭 **3 Alignments** - Left, Center, Right text alignment
- 🖼️ **Rich Content** - Icons (SVG, Emoji, Image), badges, stats, and CTAs
- 📱 **Fully Responsive** - Mobile-first design with adaptive layouts
- ♿ **Accessibility** - ARIA compliant with keyboard navigation support
- 🎨 **Customizable** - Extensive styling options and theme support
- 🔧 **TypeScript** - Full type safety with comprehensive interfaces

## Installation

Initialize Angular SuperUI in your project:

```bash
npx ngsui init
```

Add the Feature Grid Block component:

```bash
npx ngsui add block feature-grid
```

## Usage

Import the Feature Grid Block component in your Angular component:

```typescript
import { Component, signal } from '@angular/core';
import { FeatureGridBlockComponent, Feature } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [FeatureGridBlockComponent],
  template: `
    <feature-grid-block
      title="Our Amazing Features"
      subtitle="Everything you need to build incredible applications"
      [features]="features()"
      [columns]="3"
      variant="default"
      alignment="center"
      (onFeatureClick)="handleFeatureClick($event)"
    />
  `
})
export class ExampleComponent {
  features = signal<Feature[]>([
    {
      id: 'fast',
      title: 'Lightning Fast',
      description: 'Optimized for performance with minimal bundle size.',
      icon: {
        type: 'emoji',
        value: '⚡',
        color: 'yellow'
      }
    },
    {
      id: 'secure',
      title: 'Highly Secure',
      description: 'Built with security best practices and encryption.',
      icon: {
        type: 'emoji',
        value: '🔒',
        color: 'green'
      }
    },
    {
      id: 'scalable',
      title: 'Infinitely Scalable',
      description: 'Grows with your business needs and requirements.',
      icon: {
        type: 'emoji',
        value: '📈',
        color: 'blue'
      }
    }
  ]);

  handleFeatureClick(feature: Feature) {
    console.log('Feature clicked:', feature);
  }
}
```

## Examples

### 3-Column Feature Grid

Classic layout with icons and descriptions - perfect for showcasing core platform benefits.

```typescript
@Component({
  template: `
    <feature-grid-block
      title="Why Choose Our Platform"
      subtitle="Everything you need to build amazing applications"
      [features]="threeColumnFeatures()"
      [columns]="3"
      variant="default"
      alignment="center"
      (onFeatureClick)="onFeatureClick($event)"
    />
  `
})
export class ThreeColumnExample {
  threeColumnFeatures = signal<Feature[]>([
    {
      id: 'typescript',
      title: 'TypeScript First',
      description: 'Built with TypeScript for better development experience and type safety.',
      icon: {
        type: 'emoji',
        value: '⚡',
        color: 'blue'
      },
      cta: {
        text: 'Learn More',
        href: '/docs/typescript'
      }
    },
    {
      id: 'responsive',
      title: 'Fully Responsive',
      description: 'All components work perfectly on desktop, tablet, and mobile devices.',
      icon: {
        type: 'emoji',
        value: '📱',
        color: 'green'
      },
      cta: {
        text: 'View Examples',
        href: '/docs/responsive'
      }
    },
    {
      id: 'accessible',
      title: 'Accessibility First',
      description: 'WCAG 2.1 compliant components with full keyboard navigation support.',
      icon: {
        type: 'emoji',
        value: '♿',
        color: 'purple'
      },
      cta: {
        text: 'Accessibility Guide',
        href: '/docs/accessibility'
      }
    }
  ]);

  onFeatureClick(feature: Feature) {
    console.log('Feature clicked:', feature);
    if (feature.cta?.href) {
      // Handle navigation
    }
  }
}
```

### 4-Column Compact Grid

Compact layout for multiple features - ideal for technical specifications and capabilities.

```typescript
@Component({
  template: `
    <feature-grid-block
      title="Core Features"
      [features]="fourColumnFeatures()"
      [columns]="4"
      variant="minimal"
      alignment="center"
      (onFeatureClick)="onFeatureClick($event)"
    />
  `
})
export class FourColumnExample {
  fourColumnFeatures = signal<Feature[]>([
    {
      id: 'fast',
      title: 'Lightning Fast',
      description: 'Optimized for performance with minimal bundle size.',
      icon: {
        type: 'emoji',
        value: '⚡',
        color: 'yellow'
      }
    },
    {
      id: 'customizable',
      title: 'Highly Customizable',
      description: 'Extensive theming options and CSS variables.',
      icon: {
        type: 'emoji',
        value: '🎨',
        color: 'pink'
      }
    },
    {
      id: 'testing',
      title: 'Testing Ready',
      description: 'Built-in testing utilities and best practices.',
      icon: {
        type: 'emoji',
        value: '🧪',
        color: 'green'
      }
    },
    {
      id: 'docs',
      title: 'Great Documentation',
      description: 'Comprehensive guides and API references.',
      icon: {
        type: 'emoji',
        value: '📚',
        color: 'blue'
      }
    }
  ]);

  onFeatureClick(feature: Feature) {
    console.log('Feature clicked:', feature);
  }
}
```

### Card Style Features with Badges

Card-based layout with shadows, borders, badges, and CTAs - perfect for premium features or plans.

```typescript
@Component({
  template: `
    <feature-grid-block
      title="Advanced Capabilities"
      subtitle="Powerful features that make a difference"
      [features]="cardStyleFeatures()"
      [columns]="2"
      cardVariant="gradient"
      alignment="center"
      (onFeatureClick)="onFeatureClick($event)"
    />
  `
})
export class CardStyleExample {
  cardStyleFeatures = signal<Feature[]>([
    {
      id: 'enterprise',
      title: 'Enterprise Ready',
      description: 'Production-tested components used by leading companies worldwide. Built to handle scale and complexity.',
      icon: {
        type: 'emoji',
        value: '🏢',
        color: 'purple'
      },
      badge: 'Popular',
      cta: {
        text: 'Enterprise Plans',
        href: '/enterprise'
      }
    },
    {
      id: 'support',
      title: 'Premium Support',
      description: 'Get help from our expert team with priority support, custom implementations, and dedicated assistance.',
      icon: {
        type: 'emoji',
        value: '🛟',
        color: 'blue'
      },
      badge: 'Pro',
      cta: {
        text: 'Get Support',
        href: '/support'
      }
    }
  ]);

  onFeatureClick(feature: Feature) {
    console.log('Feature clicked:', feature);
    if (feature.cta?.href) {
      // Handle navigation to feature details
    }
  }
}
```

### Features with Statistics

Showcase features with numerical stats and achievements.

```typescript
@Component({
  template: `
    <feature-grid-block
      title="Proven Results"
      subtitle="Numbers that speak for themselves"
      [features]="statsFeatures()"
      [columns]="3"
      variant="gradient"
      alignment="center"
    />
  `
})
export class StatsExample {
  statsFeatures = signal<Feature[]>([
    {
      id: 'performance',
      title: 'Blazing Fast Performance',
      description: 'Optimized bundle size and runtime performance for modern applications.',
      icon: {
        type: 'emoji',
        value: '🚀',
        color: 'orange'
      },
      stats: {
        value: '99.9%',
        label: 'Uptime'
      }
    },
    {
      id: 'adoption',
      title: 'Wide Adoption',
      description: 'Trusted by developers and companies worldwide for production applications.',
      icon: {
        type: 'emoji',
        value: '🌍',
        color: 'green'
      },
      stats: {
        value: '10K+',
        label: 'Downloads'
      }
    },
    {
      id: 'satisfaction',
      title: 'Developer Experience',
      description: 'Intuitive APIs and comprehensive documentation for smooth development.',
      icon: {
        type: 'emoji',
        value: '⭐',
        color: 'gold'
      },
      stats: {
        value: '4.9/5',
        label: 'Rating'
      }
    }
  ]);
}
```

### SVG Icons and Custom Styling

Using custom SVG icons with advanced styling options.

```typescript
@Component({
  template: `
    <feature-grid-block
      title="Technical Features"
      subtitle="Built for developers, by developers"
      [features]="technicalFeatures()"
      [columns]="3"
      variant="dark"
      cardVariant="glass"
      alignment="center"
    />
  `
})
export class TechnicalExample {
  technicalFeatures = signal<Feature[]>([
    {
      id: 'api',
      title: 'RESTful APIs',
      description: 'Clean, documented APIs that follow REST principles and industry standards.',
      icon: {
        type: 'svg',
        value: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>`,
        color: 'blue'
      },
      highlighted: true
    },
    {
      id: 'security',
      title: 'Enterprise Security',
      description: 'Advanced security features including encryption, authentication, and authorization.',
      icon: {
        type: 'svg',
        value: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>`,
        color: 'green'
      }
    },
    {
      id: 'monitoring',
      title: 'Real-time Monitoring',
      description: 'Comprehensive monitoring and analytics for performance optimization.',
      icon: {
        type: 'svg',
        value: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 3v18h18"/>
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
        </svg>`,
        color: 'purple'
      }
    }
  ]);
}
```

## Variants

### Section Variants

#### Default
```html
<feature-grid-block variant="default">
```
Standard variant with clean background and subtle styling.

#### Gradient
```html
<feature-grid-block variant="gradient">
```
Beautiful gradient background for visual impact.

#### Dark
```html
<feature-grid-block variant="dark">
```
Dark theme variant perfect for dark mode applications.

#### Minimal
```html
<feature-grid-block variant="minimal">
```
Clean, minimal styling with focus on content.

### Card Variants

#### Default Cards
```html
<feature-grid-block cardVariant="default">
```
Standard cards with borders and subtle shadows.

#### Minimal Cards
```html
<feature-grid-block cardVariant="minimal">
```
Clean cards with minimal styling.

#### Glass Cards
```html
<feature-grid-block cardVariant="glass">
```
Modern glass morphism effect with backdrop blur.

#### Gradient Cards
```html
<feature-grid-block cardVariant="gradient">
```
Cards with gradient backgrounds and enhanced visual appeal.

## Column Layouts

### 2 Columns
```html
<feature-grid-block [columns]="2">
```
Perfect for detailed feature descriptions and comparison layouts.

### 3 Columns (Default)
```html
<feature-grid-block [columns]="3">
```
Balanced layout ideal for most feature showcases.

### 4 Columns
```html
<feature-grid-block [columns]="4">
```
Compact layout for multiple features and technical specifications.

### 6 Columns
```html
<feature-grid-block [columns]="6">
```
Dense layout for icons, logos, or simple feature lists.

## Alignment Options

### Left Alignment
```html
<feature-grid-block alignment="left">
```
Left-aligned text for formal or documentation-style presentations.

### Center Alignment (Default)
```html
<feature-grid-block alignment="center">
```
Centered text for marketing and promotional content.

### Right Alignment
```html
<feature-grid-block alignment="right">
```
Right-aligned text for unique layouts and creative presentations.

## API Reference

### Component Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'gradient' \| 'dark' \| 'minimal'` | `'default'` | Section background variant |
| `cardVariant` | `'default' \| 'minimal' \| 'glass' \| 'gradient'` | `'default'` | Individual card styling variant |
| `columns` | `2 \| 3 \| 4 \| 6` | `3` | Number of columns in the grid |
| `alignment` | `'left' \| 'center' \| 'right'` | `'center'` | Text alignment for title and subtitle |
| `title` | `string` | `undefined` | Main heading text |
| `subtitle` | `string` | `undefined` | Subheading description text |
| `badge` | `string` | `undefined` | Badge text displayed above title |
| `features` | `Feature[]` | `required` | Array of feature objects to display |
| `bottomCta` | `{text: string; href?: string; action?: () => void}` | `undefined` | Call-to-action button at bottom |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onFeatureClick` | `EventEmitter<Feature>` | Emitted when a feature card is clicked |
| `onBottomCtaClick` | `EventEmitter<void>` | Emitted when bottom CTA button is clicked |

### Feature Interface

```typescript
export interface Feature {
  id: string;                    // Unique identifier
  title: string;                 // Feature title
  description: string;           // Feature description
  icon?: {                       // Optional icon configuration
    type: 'svg' | 'emoji' | 'image';
    value: string;               // SVG string, emoji, or image URL
    color?: string;              // Icon color theme
  };
  badge?: string;                // Optional badge text
  stats?: {                      // Optional statistics
    value: string;               // Stat value (e.g., "99.9%")
    label: string;               // Stat label (e.g., "Uptime")
  };
  cta?: {                        // Optional call-to-action
    text: string;                // Button text
    href?: string;               // Link URL
    action?: () => void;         // Click handler
  };
  highlighted?: boolean;         // Special highlighting
}
```

## Responsive Behavior

The Feature Grid Block is fully responsive and adapts to different screen sizes:

- **Mobile (< 768px)**: Single column layout
- **Tablet (768px - 1024px)**: 2 columns for 3+ column layouts
- **Desktop (> 1024px)**: Full column count as specified

### Responsive Column Behavior

| Specified Columns | Mobile | Tablet | Desktop |
|-------------------|--------|--------|---------|
| 2 | 1 | 2 | 2 |
| 3 | 1 | 2 | 3 |
| 4 | 1 | 2 | 4 |
| 6 | 2 | 3 | 6 |

## Accessibility

The Feature Grid Block includes comprehensive accessibility features:

- **Semantic HTML**: Proper heading hierarchy and section structure
- **ARIA Labels**: Descriptive labels for screen readers
- **Keyboard Navigation**: Full keyboard support for interactive elements
- **Focus Management**: Visible focus indicators and logical tab order
- **Screen Reader Support**: Optimized for assistive technologies
- **High Contrast**: Compatible with high contrast mode
- **Reduced Motion**: Respects user's motion preferences

### Accessibility Best Practices

```typescript
// Ensure proper heading hierarchy
<feature-grid-block
  title="Main Features"           // This becomes an h2
  subtitle="Supporting text"      // This becomes a p tag
  [features]="features()"
/>

// Provide descriptive alt text for images
{
  icon: {
    type: 'image',
    value: '/icon.png',
    alt: 'Security shield icon'   // Add alt text for images
  }
}

// Use semantic CTA actions
{
  cta: {
    text: 'Learn more about TypeScript features',  // Descriptive text
    href: '/docs/typescript'
  }
}
```

## Customization

### CSS Variables

The Feature Grid Block uses CSS custom properties for theming:

```css
.feature-grid-block {
  --grid-bg: theme(colors.background);
  --grid-text: theme(colors.foreground);
  --grid-muted: theme(colors.muted.foreground);
  --grid-border: theme(colors.border);
  --grid-card-bg: theme(colors.card);
  --grid-primary: theme(colors.primary);
}
```

### Custom Styling

Add custom styles by targeting the component classes:

```css
/* Custom section styling */
.custom-features feature-grid-block {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Custom card styling */
.custom-features .feature-card {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Custom icon styling */
.custom-features .feature-icon {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

.custom-features .feature-card:hover .feature-icon {
  transform: scale(1.2);
}
```

### Tailwind CSS Customization

Extend the component with Tailwind classes:

```html
<feature-grid-block
  class="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
  title="Custom Styled Features"
  [features]="features()"
/>
```

## Performance Considerations

- **Lazy Loading**: Consider lazy loading images in feature icons
- **Change Detection**: Component uses OnPush strategy for optimal performance
- **Bundle Size**: Tree-shakeable exports reduce bundle size
- **Memory Management**: Proper cleanup of event listeners and subscriptions

```typescript
// Optimize image loading
{
  icon: {
    type: 'image',
    value: '/icons/feature.png',
    loading: 'lazy'  // Add lazy loading for images
  }
}

// Use OnPush strategy in parent components
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Common Issues

#### Icons Not Displaying
```typescript
// ❌ Wrong: Invalid SVG syntax
{
  icon: {
    type: 'svg',
    value: '<svg><path></svg>'  // Missing closing path tag
  }
}

// ✅ Correct: Valid SVG
{
  icon: {
    type: 'svg',
    value: '<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>'
  }
}
```

#### Layout Issues on Mobile
```css
/* Ensure proper responsive behavior */
.feature-grid-block {
  min-width: 0; /* Prevent overflow */
  overflow-x: hidden;
}
```

#### Performance Issues with Many Features
```typescript
// Use trackBy function for large lists
<feature-grid-block
  [features]="features()"
  [trackByFn]="trackByFeatureId"
/>

trackByFeatureId(index: number, feature: Feature): string {
  return feature.id;
}
```

## Related Components

- [Button Component](../components/button.md) - For custom CTA buttons
- [Card Component](../components/card.md) - For alternative card layouts
- [Hero Section Block](./hero-section.md) - For complementary hero sections
- [Testimonials Block](./testimonials.md) - For social proof sections

## Contributing

Found a bug or want to contribute? Check out our [Contributing Guidelines](../../CONTRIBUTING.md) and submit a pull request on [GitHub](https://github.com/bhaimicrosoft/angular-superui).

## Changelog

### v0.1.0
- Initial release of Feature Grid Block component
- Support for multiple variants and column layouts
- Comprehensive icon support (SVG, emoji, image)
- Responsive design with mobile-first approach
- Full accessibility implementation
- TypeScript interfaces and type safety

---

*For more examples and advanced usage, check out our [Storybook](https://storybook.angular-superui.com) or visit the [live demo](https://angular-superui.com/blocks/feature-grid).*
