# Hero Section Block 🚀

Eye-catching landing page heroes with multiple layouts, CTAs, and background options. Perfect for capturing attention, making a great first impression, and driving conversions.

## Features

- 🎨 **4 Variants** - Default, Gradient, Minimal, Dark
- 📏 **4 Sizes** - Small, Default, Large, Extra Large
- 🎭 **3 Alignments** - Left, Center, Right text alignment
- 🖼️ **Background Types** - Gradient, Image, Video, Pattern
- 🔘 **Action Buttons** - Multiple CTA buttons with variants and external links
- 📊 **Statistics** - Showcase key metrics and achievements
- 🎪 **Decorations** - Animated background elements and floating shapes
- 📱 **Fully Responsive** - Mobile-first design with adaptive layouts
- ♿ **Accessibility** - ARIA compliant with keyboard navigation support
- 🔧 **TypeScript** - Full type safety with comprehensive interfaces

## Installation

Initialize Angular SuperUI in your project:

```bash
npx ngsui-cli init
```

Add the Hero Section Block component:

```bash
npx ngsui-cli add block hero-section
```

## Usage

Import the Hero Section Block component in your Angular component:

```typescript
import { Component, signal } from '@angular/core';
import { HeroSectionBlockComponent, HeroButton } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [HeroSectionBlockComponent],
  template: `
    <hero-section-block
      title="Build Amazing Angular Apps"
      subtitle="Create stunning user interfaces with our modern component library"
      description="Pre-built components, TypeScript support, and seamless integration with your existing Angular projects."
      badge="✨ Now Available"
      [buttons]="buttons()"
      variant="gradient"
      size="default"
      alignment="center"
      [showDecorations]="true"
      (onButtonClick)="handleButtonClick($event)"
    />
  `
})
export class ExampleComponent {
  buttons = signal<HeroButton[]>([
    {
      text: 'Get Started',
      variant: 'primary',
      size: 'lg',
      href: '/getting-started'
    },
    {
      text: 'View Demo',
      variant: 'outline',
      size: 'lg',
      href: '/demo',
      external: true
    }
  ]);

  handleButtonClick(button: HeroButton) {
    console.log('Button clicked:', button);
  }
}
```

## Examples

### Default Gradient Hero

Clean gradient background with animated decorations - perfect for modern landing pages.

```typescript
@Component({
  template: `
    <hero-section-block
      title="Build Amazing Angular Apps"
      subtitle="Create stunning user interfaces with our modern component library"
      description="Pre-built components, TypeScript support, and seamless integration with your existing Angular projects."
      badge="✨ Now Available"
      [buttons]="defaultButtons()"
      [stats]="defaultStats()"
      variant="gradient"
      size="default"
      alignment="center"
      [showDecorations]="true"
      (onButtonClick)="onButtonClick($event)"
    />
  `
})
export class DefaultHeroExample {
  defaultButtons = signal<HeroButton[]>([
    {
      text: 'Get Started Free',
      variant: 'primary',
      size: 'lg',
      href: '/signup'
    },
    {
      text: 'Watch Demo',
      variant: 'secondary',
      size: 'lg',
      href: '/demo'
    }
  ]);

  defaultStats = signal([
    { label: 'Active Users', value: '10K+' },
    { label: 'Components', value: '50+' },
    { label: 'GitHub Stars', value: '2.3K' },
    { label: 'Success Rate', value: '99.9%' }
  ]);

  onButtonClick(button: HeroButton) {
    console.log('Button clicked:', button);
    if (button.href) {
      // Handle navigation
    }
  }
}
```

### Minimal Clean Hero

Clean, minimal styling focused on content - ideal for professional and corporate websites.

```typescript
@Component({
  template: `
    <hero-section-block
      title="Professional Business Solutions"
      subtitle="Streamline your workflow with enterprise-grade tools"
      description="Designed for teams that demand reliability, security, and performance at scale."
      [buttons]="minimalButtons()"
      variant="minimal"
      size="lg"
      alignment="center"
      [showDecorations]="false"
      (onButtonClick)="onButtonClick($event)"
    />
  `
})
export class MinimalHeroExample {
  minimalButtons = signal<HeroButton[]>([
    {
      text: 'Schedule Demo',
      variant: 'primary',
      size: 'lg',
      action: () => this.scheduleDemo()
    },
    {
      text: 'Learn More',
      variant: 'outline',
      size: 'lg',
      href: '/enterprise'
    }
  ]);

  onButtonClick(button: HeroButton) {
    if (button.action) {
      button.action();
    }
  }

  scheduleDemo() {
    console.log('Opening demo scheduler');
    // Handle demo scheduling
  }
}
```

### Background Image Hero

Hero with custom background image and overlay - perfect for visual storytelling.

```typescript
@Component({
  template: `
    <hero-section-block
      title="Transform Your Digital Experience"
      subtitle="Where innovation meets exceptional design"
      description="Join thousands of companies worldwide who trust our platform to deliver outstanding user experiences."
      [buttons]="imageButtons()"
      [background]="heroBackground()"
      variant="dark"
      size="xl"
      alignment="center"
      [showDecorations]="true"
      (onButtonClick)="onButtonClick($event)"
    />
  `
})
export class ImageHeroExample {
  imageButtons = signal<HeroButton[]>([
    {
      text: 'Start Your Journey',
      variant: 'primary',
      size: 'lg',
      href: '/onboarding'
    },
    {
      text: 'Explore Features',
      variant: 'ghost',
      size: 'lg',
      href: '/features'
    }
  ]);

  heroBackground = signal({
    type: 'image' as const,
    value: '/assets/hero-bg.jpg',
    overlay: true,
    opacity: 0.7
  });

  onButtonClick(button: HeroButton) {
    console.log('Button clicked:', button);
  }
}
```

### Statistics Showcase Hero

Hero featuring key metrics and achievements - great for building credibility and trust.

```typescript
@Component({
  template: `
    <hero-section-block
      title="Trusted by Industry Leaders"
      subtitle="The platform of choice for forward-thinking companies"
      description="Our proven track record speaks for itself. Join the growing community of successful businesses."
      badge="🏆 Award Winning"
      [buttons]="statsButtons()"
      [stats]="impressiveStats()"
      variant="default"
      size="default"
      alignment="center"
      [showDecorations]="true"
      (onButtonClick)="onButtonClick($event)"
    />
  `
})
export class StatsHeroExample {
  statsButtons = signal<HeroButton[]>([
    {
      text: 'Join Today',
      variant: 'primary',
      size: 'lg',
      href: '/signup'
    },
    {
      text: 'View Case Studies',
      variant: 'outline',
      size: 'lg',
      href: '/case-studies'
    }
  ]);

  impressiveStats = signal([
    { label: 'Companies Served', value: '500+' },
    { label: 'Revenue Generated', value: '$2.4B' },
    { label: 'Customer Satisfaction', value: '98%' },
    { label: 'Global Reach', value: '50+ Countries' }
  ]);

  onButtonClick(button: HeroButton) {
    console.log('Button clicked:', button);
  }
}
```

### Left-Aligned Hero with Video

Asymmetric layout with video background - perfect for creative and media-focused websites.

```typescript
@Component({
  template: `
    <hero-section-block
      title="Create. Inspire. Transform."
      subtitle="Where creativity meets cutting-edge technology"
      description="Unleash your creative potential with our comprehensive suite of design tools and collaborative features."
      [buttons]="creativeButtons()"
      [background]="videoBackground()"
      variant="dark"
      size="lg"
      alignment="left"
      [showDecorations]="false"
      (onButtonClick)="onButtonClick($event)"
    />
  `
})
export class VideoHeroExample {
  creativeButtons = signal<HeroButton[]>([
    {
      text: 'Start Creating',
      variant: 'primary',
      size: 'lg',
      href: '/studio'
    },
    {
      text: 'View Gallery',
      variant: 'ghost',
      size: 'lg',
      href: '/gallery',
      external: true
    }
  ]);

  videoBackground = signal({
    type: 'video' as const,
    value: '/assets/hero-video.mp4',
    overlay: true,
    opacity: 0.6
  });

  onButtonClick(button: HeroButton) {
    console.log('Button clicked:', button);
  }
}
```

## Variants

### Section Variants

#### Default
```html
## Variants

### Default

```html
<hero-section variant="default">
```

Clean hero section with subtle background and standard styling.

### Gradient

```html
<hero-section variant="gradient">
```

Eye-catching gradient background for modern, vibrant designs.

### Minimal

```html
<hero-section variant="minimal">
```

Clean, minimal design with subtle background for professional layouts.

### Dark

```html
<hero-section variant="dark">
```

Dark theme with high contrast for modern, tech-focused websites.

## Sizes

### Small

```html
<hero-section size="sm">
```

Compact hero section (py-12) perfect for landing pages and focused content.

### Medium

```html
<hero-section size="default">
```

Standard hero section height (py-20) suitable for most applications.

### Large

```html
<hero-section size="lg">
```

Spacious hero section (py-32) ideal for marketing pages and impact.

### Extra Large

```html
<hero-section size="xl">
```

Maximum impact hero section (py-40) for full-screen experiences.

## Alignment Options

### Left Alignment

```html
<hero-section alignment="left">
```

Left-aligned content perfect for text-heavy heroes and professional layouts.

### Center Alignment (Default)

```html
<hero-section alignment="center">
```

Centered content for balanced, impactful presentation.

### Right Alignment

```html
<hero-section alignment="right">
```

Right-aligned content for unique layouts and visual variety.

## Background Types

### Gradient Background

```typescript
background: {
  type: 'gradient',
  gradient: 'from-blue-600 via-purple-600 to-indigo-600'
}
```

### Image Background

```typescript
background: {
  type: 'image',
  imageUrl: '/assets/hero-bg.jpg',
  overlay: 'dark' // Optional overlay
}
```

### Video Background

```typescript
background: {
  type: 'video',
  videoUrl: '/assets/hero-video.mp4',
  posterUrl: '/assets/hero-poster.jpg'
}
```

### Pattern Background

```typescript
background: {
  type: 'pattern',
  pattern: 'dots' // 'dots', 'grid', 'diagonal'
}
```
Clean gradient background from slate to white with subtle styling.

#### Gradient
```html
<hero-section-block variant="gradient">
```
Beautiful multi-color gradient background for visual impact.

#### Minimal
```html
<hero-section-block variant="minimal">
```
Clean background with focus on content and typography.

#### Dark
```html
<hero-section-block variant="dark">
```
Dark theme variant perfect for dramatic presentations.

## Sizes

### Small
```html
<hero-section-block size="sm">
```
Compact hero (py-16 md:py-20) for secondary pages.

### Default
```html
<hero-section-block size="default">
```
Standard hero height (py-20 md:py-32) for most landing pages.

### Large
```html
<hero-section-block size="lg">
```
Large hero (py-32 md:py-40) for premium presentations.

### Extra Large
```html
<hero-section-block size="xl">
```
Maximum impact hero (py-40 md:py-48) for flagship pages.

## Alignment Options

### Left Alignment
```html
<hero-section-block alignment="left">
```
Left-aligned content for asymmetric layouts and creative designs.

### Center Alignment (Default)
```html
<hero-section-block alignment="center">
```
Centered content for balanced, traditional layouts.

### Right Alignment
```html
<hero-section-block alignment="right">
```
Right-aligned content for unique layouts and RTL support.

## Background Types

### Gradient Background
```typescript
background: {
  type: 'gradient',
  value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
}
```

### Image Background
```typescript
background: {
  type: 'image',
  value: '/path/to/image.jpg',
  overlay: true,
  opacity: 0.7
}
```

### Video Background
```typescript
background: {
  type: 'video',
  value: '/path/to/video.mp4',
  overlay: true,
  opacity: 0.6
}
```

### Pattern Background
```typescript
background: {
  type: 'pattern',
  value: 'dots', // or 'grid', 'waves'
  opacity: 0.1
}
```

## API Reference

### Component Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'gradient' \| 'minimal' \| 'dark'` | `'default'` | Hero section styling variant |
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Hero section height |
| `alignment` | `'left' \| 'center' \| 'right'` | `'center'` | Content text alignment |
| `title` | `string` | `undefined` | Main heading text |
| `subtitle` | `string` | `undefined` | Secondary heading text |
| `description` | `string` | `undefined` | Hero description paragraph |
| `badge` | `string` | `undefined` | Badge text displayed above title |
| `buttons` | `HeroButton[]` | `[]` | Array of action buttons |
| `stats` | `{label: string; value: string}[]` | `[]` | Statistics to display |
| `background` | `HeroBackground` | `undefined` | Background configuration |
| `showDecorations` | `boolean` | `false` | Show animated background decorations |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onButtonClick` | `EventEmitter<HeroButton>` | Emitted when an action button is clicked |

### HeroButton Interface

```typescript
export interface HeroButton {
  text: string;                    // Button text
  href?: string;                   // Link URL
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; // Button style
  size?: 'sm' | 'default' | 'lg';  // Button size
  disabled?: boolean;              // Disabled state
  external?: boolean;              // Open in new tab
  action?: () => void;             // Click handler function
}
```

### HeroBackground Interface

```typescript
export interface HeroBackground {
  type: 'gradient' | 'image' | 'video' | 'pattern'; // Background type
  value?: string;                  // Background URL or CSS value
  overlay?: boolean;               // Show dark overlay
  opacity?: number;                // Background opacity (0-1)
}
```

## Responsive Behavior

The Hero Section Block is fully responsive and adapts to different screen sizes:

- **Mobile (< 768px)**: Stacked layout with smaller text and simplified buttons
- **Tablet (768px - 1024px)**: Balanced layout with medium text sizes
- **Desktop (> 1024px)**: Full layout with large text and side-by-side elements

### Responsive Features

- **Adaptive Typography**: Text sizes scale appropriately for each breakpoint
- **Button Stacking**: Buttons stack vertically on mobile for better usability
- **Image Optimization**: Background images adjust for mobile viewports
- **Touch-Friendly**: Larger touch targets on mobile devices

## Accessibility

The Hero Section Block includes comprehensive accessibility features:

- **Semantic HTML**: Proper heading hierarchy and section structure
- **ARIA Labels**: Descriptive labels for screen readers
- **Keyboard Navigation**: Full keyboard support for interactive elements
- **Focus Management**: Visible focus indicators and logical tab order
- **Screen Reader Support**: Optimized for assistive technologies
- **High Contrast**: Compatible with high contrast mode
- **Reduced Motion**: Respects user's motion preferences for animations

### Accessibility Best Practices

```typescript
// Ensure proper heading hierarchy
<hero-section-block
  title="Main Page Heading"        // This becomes an h1
  subtitle="Supporting headline"   // This becomes an h2
  description="Detailed description"
/>

// Provide meaningful button text
{
  text: 'Get started with our free trial', // Descriptive text
  href: '/signup',
  variant: 'primary'
}

// Use external link indicators
{
  text: 'View documentation',
  href: 'https://docs.example.com',
  external: true                   // Adds external link indicators
}
```

## Customization

### CSS Variables

The Hero Section Block uses CSS custom properties for theming:

```css
.hero-section-block {
  --hero-bg: theme(colors.background);
  --hero-text: theme(colors.foreground);
  --hero-muted: theme(colors.muted.foreground);
  --hero-primary: theme(colors.primary);
  --hero-overlay: rgba(0, 0, 0, 0.4);
}
```

### Custom Styling

Add custom styles by targeting the component classes:

```css
/* Custom hero styling */
.custom-hero hero-section-block {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Custom button styling */
.custom-hero .hero-button {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Custom decoration styling */
.custom-hero .hero-decoration {
  animation: customFloat 6s ease-in-out infinite;
}

@keyframes customFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}
```

### Tailwind CSS Customization

Extend the component with Tailwind classes:

```html
<hero-section-block
  class="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
  title="Custom Styled Hero"
  [buttons]="buttons()"
/>
```

## Performance Considerations

- **Lazy Loading**: Background images and videos are optimized for loading
- **Change Detection**: Component uses OnPush strategy for optimal performance
- **Bundle Size**: Tree-shakeable exports reduce bundle size
- **Video Optimization**: Videos are automatically muted and optimized

```typescript
// Optimize background loading
background: {
  type: 'image',
  value: '/hero-bg.webp',        // Use WebP format
  loading: 'eager'               // For above-the-fold images
}

// Optimize video backgrounds
background: {
  type: 'video',
  value: '/hero-video.mp4',
  preload: 'metadata'            // Preload only metadata
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Common Issues

#### Background Images Not Loading
```typescript
// ❌ Wrong: Relative path without proper asset handling
background: {
  type: 'image',
  value: './assets/hero.jpg'
}

// ✅ Correct: Absolute path or proper asset URL
background: {
  type: 'image',
  value: '/assets/hero.jpg'
}
```

#### Video Not Playing
```typescript
// ❌ Wrong: Missing required video attributes
background: {
  type: 'video',
  value: '/video.mp4'
}

// ✅ Correct: Proper video configuration
background: {
  type: 'video',
  value: '/video.mp4',
  autoplay: true,
  muted: true,
  loop: true
}
```

#### Buttons Not Responding
```typescript
// Ensure proper event handling
onButtonClick(button: HeroButton) {
  if (button.href) {
    // Handle navigation
    this.router.navigate([button.href]);
  } else if (button.action) {
    // Handle custom action
    button.action();
  }
}
```

## Related Components

- [Button Component](../components/button.md) - For custom CTA buttons
- [Badge Component](../components/badge.md) - For hero badges and indicators
- [Feature Grid Block](./feature-grid.md) - For complementary feature sections
- [Pricing Cards Block](./pricing-cards.md) - For pricing sections

## Contributing

Found a bug or want to contribute? Check out our [Contributing Guidelines](../../CONTRIBUTING.md) and submit a pull request on [GitHub](https://github.com/bhaimicrosoft/angular-superui).

## Changelog

### v0.1.0
- Initial release of Hero Section Block component
- Support for multiple variants and sizes
- Background image, video, and pattern support
- Responsive design with mobile-first approach
- Full accessibility implementation
- TypeScript interfaces and type safety

---

*For more examples and advanced usage, check out our [Storybook](https://storybook.angular-superui.com) or visit the [live demo](https://angular-superui.com/blocks/hero-section).*
