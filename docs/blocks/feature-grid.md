# Feature Grid Block 🎯

Responsive feature showcase grids with flexible layouts and Font Awesome icon integration. Create stunning feature sections that highlight your product's key capabilities with beautiful icons and professional styling.

## Features

- 🎯 **Responsive Grid** - 1-6 columns with mobile-first responsive design
- � **Beautiful Icons** - Font Awesome integration through Icon component
- � **Mobile Optimized** - Stacks beautifully on small screens
- 🔧 **Easy Customization** - Tailwind CSS classes for styling
- ♿ **Accessible** - ARIA compliant with semantic markup
- 🎭 **Flexible Layout** - Custom grid arrangements and spacing
- � **Icon Colors** - Colored icon containers with hover effects
- ⚡ **Performance** - Optimized rendering with standalone components

## Installation

Add the Feature Grid Block component:

```bash
npx ngsui-cli add block feature-grid
```

## Usage

Import the Icon component for feature icons:

```typescript
import { Component } from '@angular/core';
import { Icon } from '@lib/components/icon';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [FeatureGrid],
  template: `
    <FeatureGrid variant="gradient" [columns]="3">
      <!-- Header Section -->
      <div slot="header" class="text-center space-y-4 mb-16">
        <h2 class="text-3xl font-bold">Amazing Features</h2>
        <p class="text-lg text-muted-foreground">Everything you need to succeed</p>
      </div>
      
      <!-- Feature Cards -->
      <div slot="feature" class="p-6 rounded-lg bg-card hover:shadow-lg transition-shadow">
        <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-primary"><!-- icon --></svg>
        </div>
        <h3 class="text-lg font-semibold mb-2">Fast Performance</h3>
        <p class="text-muted-foreground">Lightning-fast loading and responsive design.</p>
      </div>
      
      <div slot="feature" class="p-6 rounded-lg bg-card hover:shadow-lg transition-shadow">
        <!-- More features... -->
      </div>
    </FeatureGrid>
  `
})
export class ExampleComponent {}
```

## Examples

### Basic Feature Grid

```typescript
@Component({
  template: `
    <FeatureGrid [columns]="3" variant="default">
      <h2 slot="title" class="text-3xl font-bold text-center mb-8">Core Features</h2>
      
      <div slot="feature" class="text-center space-y-4">
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          ⚡
        </div>
        <h3 class="text-xl font-semibold">Fast Performance</h3>
        <p class="text-gray-600">Optimized for speed and efficiency</p>
      </div>
      
      <div slot="feature" class="text-center space-y-4">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          🔒
        </div>
        <h3 class="text-xl font-semibold">Secure</h3>
        <p class="text-gray-600">Enterprise-grade security built-in</p>
      </div>
      
      <div slot="feature" class="text-center space-y-4">
        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
          �
        </div>
        <h3 class="text-xl font-semibold">Responsive</h3>
        <p class="text-gray-600">Works perfectly on all devices</p>
      </div>
    </FeatureGrid>
  `
})
```

### Advanced Layout with Background

```typescript
@Component({
  template: `
    <FeatureGrid variant="glass" [columns]="2" class="relative">
      <!-- Background -->
      <div slot="background" class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
      
      <!-- Header with Badge -->
      <div slot="header" class="text-center space-y-6 mb-20">
        <div slot="badge" class="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
          <span class="text-sm font-medium text-primary">✨ New Features</span>
        </div>
        <h2 class="text-4xl font-bold">Next Generation Tools</h2>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover powerful capabilities that transform how you work
        </p>
      </div>
      
      <!-- Feature Cards with Rich Content -->
      <div slot="feature" class="relative p-8 bg-white/80 backdrop-blur-sm rounded-xl border">
        <div class="flex items-start space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <h3 class="text-xl font-semibold">AI-Powered Analytics</h3>
              <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Live</span>
            </div>
            <p class="text-gray-600">
              Get intelligent insights powered by machine learning algorithms that adapt to your data patterns.
            </p>
            <div class="flex items-center space-x-4 text-sm text-gray-500">
              <span>📊 Real-time data</span>
              <span>🤖 ML powered</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer with CTA -->
      <div slot="footer" class="text-center mt-16">
        <button class="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          Explore All Features
        </button>
      </div>
    </FeatureGrid>
  `
})
```

### Grid with Custom Styling

```typescript
@Component({
  template: `
    <FeatureGrid 
      variant="custom"
      [columns]="4"
      class="py-24 bg-gradient-to-br from-slate-900 to-slate-800"
      containerClass="max-w-6xl"
      gridClass="gap-8"
    >
      <div slot="header" class="text-center text-white mb-20">
        <h2 class="text-5xl font-bold mb-6">Why Choose Us?</h2>
        <p class="text-xl text-slate-300">Four pillars of excellence</p>
      </div>
      
      <!-- Compact Feature Cards -->
      <div slot="feature" class="text-center text-white group">
        <div class="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors">
          <span class="text-3xl">🚀</span>
        </div>
        <h3 class="text-lg font-semibold mb-3">Performance</h3>
        <p class="text-slate-400 text-sm">Blazing fast execution</p>
      </div>
      
      <div slot="feature" class="text-center text-white group">
        <div class="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors">
          <span class="text-3xl">🛡️</span>
        </div>
        <h3 class="text-lg font-semibold mb-3">Security</h3>
        <p class="text-slate-400 text-sm">Bank-level protection</p>
      </div>
      
      <div slot="feature" class="text-center text-white group">
        <div class="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors">
          <span class="text-3xl">⚙️</span>
        </div>
        <h3 class="text-lg font-semibold mb-3">Flexibility</h3>
        <p class="text-slate-400 text-sm">Adapt to any workflow</p>
      </div>
      
      <div slot="feature" class="text-center text-white group">
        <div class="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors">
          <span class="text-3xl">🎯</span>
        </div>
        <h3 class="text-lg font-semibold mb-3">Precision</h3>
        <p class="text-slate-400 text-sm">Accurate results every time</p>
      </div>
    </FeatureGrid>
  `
})
```

## Content Slots

The FeatureGrid component supports multiple content projection slots for maximum flexibility:

| Slot | Purpose | Usage |
|------|---------|-------|
| `slot="background"` | Background elements, overlays | `<div slot="background">...</div>` |
| `slot="header"` | Complete header section | `<div slot="header">...</div>` |
| `slot="badge"` | Header badge/announcement | `<span slot="badge">...</span>` |
| `slot="title"` | Main title/heading | `<h2 slot="title">...</h2>` |
| `slot="subtitle"` | Subtitle/description | `<p slot="subtitle">...</p>` |
| `slot="description"` | Additional description | `<p slot="description">...</p>` |
| `slot="feature"` | Individual feature items | `<div slot="feature">...</div>` |
| `slot="item"` | Alternative feature items | `<div slot="item">...</div>` |
| `slot="footer"` | Footer section | `<div slot="footer">...</div>` |
| `slot="cta"` | Call-to-action elements | `<button slot="cta">...</button>` |
| `slot="actions"` | Action buttons | `<div slot="actions">...</div>` |
| `slot="decorative"` | Decorative elements | `<div slot="decorative">...</div>` |
| `slot="overlay"` | Overlay elements | `<div slot="overlay">...</div>` |

## API Reference

### FeatureGrid Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'gradient' \| 'dark' \| 'minimal' \| 'glass' \| 'custom'` | `'default'` | Visual style variant |
| `spacing` | `'none' \| 'sm' \| 'default' \| 'lg' \| 'custom'` | `'default'` | Container spacing |
| `size` | `'xs' \| 'sm' \| 'default' \| 'lg' \| 'xl' \| 'auto'` | `'default'` | Section size/padding |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| 'none' \| 'custom'` | `'xl'` | Container max width |
| `container` | `boolean \| 'custom'` | `true` | Use container classes |
| `columns` | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 'auto' \| 'custom'` | `3` | Grid columns |
| `gap` | `'none' \| 'sm' \| 'default' \| 'lg' \| 'xl' \| 'custom'` | `'default'` | Grid gap spacing |
| `headerAlignment` | `'left' \| 'center' \| 'right' \| 'custom'` | `'center'` | Header text alignment |
| `showHeader` | `boolean` | `true` | Show auto header section |
| `class` | `string` | `''` | Additional CSS classes for section |
| `containerClass` | `string` | `''` | Additional CSS classes for container |
| `gridClass` | `string` | `''` | Additional CSS classes for grid |
| `headerClass` | `string` | `''` | Additional CSS classes for header |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `sectionClick` | `EventEmitter<MouseEvent>` | Emitted when section is clicked |
| `featureClick` | `EventEmitter<{index: number; event: MouseEvent}>` | Emitted when feature is clicked |

## Styling

### Custom Classes

```typescript
@Component({
  template: `
    <FeatureGrid 
      class="min-h-screen bg-custom"
      containerClass="max-w-4xl mx-auto"
      gridClass="gap-12 lg:gap-16"
      headerClass="mb-24"
    >
      <!-- content -->
    </FeatureGrid>
  `
})
```

### CSS Variables

```css
:root {
  --feature-grid-background: rgb(255 255 255);
  --feature-grid-text: rgb(15 23 42);
  --feature-grid-accent: rgb(59 130 246);
}

.dark {
  --feature-grid-background: rgb(15 23 42);
  --feature-grid-text: rgb(248 250 252);
  --feature-grid-accent: rgb(96 165 250);
}
```

## Best Practices

### Content Organization
- Use semantic HTML elements (`h2`, `h3`, `p`) for better SEO
- Provide meaningful `alt` text for images and icons
- Group related features logically

### Responsive Design
- Test different column counts on various screen sizes
- Use appropriate spacing for mobile devices
- Consider content hierarchy on smaller screens

### Performance
- Optimize images and icons for web
- Use lazy loading for non-critical content
- Minimize custom CSS when possible

### Accessibility
- Include proper ARIA labels
- Ensure sufficient color contrast
- Test with keyboard navigation
- Use semantic markup for screen readers

## Troubleshooting

### Content not appearing
```typescript
// Ensure proper slot attribute
<div slot="feature">Content</div> // ✅ Correct
<div class="feature">Content</div> // ❌ Wrong
```

### Grid not responsive
```typescript
// Use responsive column values
[columns]="3" // ✅ Auto-responsive
gridClass="grid-cols-1 md:grid-cols-3" // ✅ Custom responsive
```

### Styling conflicts
```typescript
// Use variant="custom" for complete control
<FeatureGrid variant="custom" class="your-custom-styles">
```
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
