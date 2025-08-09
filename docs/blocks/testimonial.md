# Testimonial Block 💬

Showcase customer testimonials and reviews with beautiful layouts. Build trust and credibility with social proof that converts visitors into customers.

## Features

- 🎨 **Multiple Variants** - Default, minimal, glass, gradient, quote, and card styles
- 📱 **Responsive Layouts** - Vertical, horizontal, and centered arrangements
- ⭐ **Rating Support** - Star ratings and review scores integration
- 👤 **Author Information** - Names, titles, companies, and avatars
- 🎯 **Quote Emphasis** - Optional quote marks and text highlighting
- ♿ **Accessibility** - Screen reader friendly with proper semantic markup
- 🎭 **Theme Aware** - Automatic dark mode support
- 🚀 **Performance** - Optimized rendering with Angular signals

## Installation

Add the Testimonial Block component:

```bash
npx ngsui-cli add block testimonial
```

## Usage

Create testimonials with custom content using slot-based architecture:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialBlock } from '@lib/blocks/testimonial';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, TestimonialBlock],
  template: `
    <!-- Basic Testimonial -->
    <TestimonialBlock variant="default" layout="vertical">
      <blockquote slot="quote" class="text-gray-700 dark:text-gray-300 mb-4">
        "Angular SuperUI has completely transformed how we build user interfaces. 
        The components are incredibly well-designed and easy to customize."
      </blockquote>
      <img slot="avatar" src="path/to/avatar.jpg" alt="John Smith" class="w-12 h-12 rounded-full">
      <div slot="author" class="font-semibold text-gray-900 dark:text-white">John Smith</div>
      <div slot="title" class="text-sm text-gray-500">Frontend Developer</div>
      <div slot="company" class="text-sm text-primary">TechCorp Inc.</div>
    </TestimonialBlock>
  `
})
export class ExampleComponent {}
```

## Examples

### Default Style Testimonials

```typescript
@Component({
  imports: [CommonModule, TestimonialBlock],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TestimonialBlock variant="default" size="default" layout="vertical">
        <blockquote slot="quote" class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          "Angular SuperUI has completely transformed how we build user interfaces. 
          The components are incredibly well-designed and easy to customize."
        </blockquote>
        <div slot="rating" class="flex items-center mb-4">
          <!-- Star rating icons -->
          <i class="fas fa-star text-yellow-400"></i>
          <i class="fas fa-star text-yellow-400"></i>
          <i class="fas fa-star text-yellow-400"></i>
          <i class="fas fa-star text-yellow-400"></i>
          <i class="fas fa-star text-yellow-400"></i>
        </div>
        <img slot="avatar" 
             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" 
             alt="John Smith" 
             class="w-12 h-12 rounded-full object-cover">
        <div slot="author" class="font-semibold text-gray-900 dark:text-white">John Smith</div>
        <div slot="title" class="text-sm text-gray-500 dark:text-gray-400">Frontend Developer</div>
        <div slot="company" class="text-sm text-gray-500 dark:text-gray-400">TechCorp Inc.</div>
      </TestimonialBlock>

      <TestimonialBlock variant="default" size="default" layout="vertical">
        <blockquote slot="quote" class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          "The documentation is excellent and the components work flawlessly. 
          Our development speed has increased by 40%."
        </blockquote>
        <div slot="rating" class="flex items-center mb-4">
          <i class="fas fa-star text-yellow-400"></i>
          <i class="fas fa-star text-yellow-400"></i>
          <i class="fas fa-star text-yellow-400"></i>
          <i class="fas fa-star text-yellow-400"></i>
          <i class="fas fa-star text-yellow-400"></i>
        </div>
        <img slot="avatar" 
             src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=64&h=64&fit=crop&crop=face" 
             alt="Sarah Johnson" 
             class="w-12 h-12 rounded-full object-cover">
        <div slot="author" class="font-semibold text-gray-900 dark:text-white">Sarah Johnson</div>
        <div slot="title" class="text-sm text-gray-500 dark:text-gray-400">UI/UX Designer</div>
        <div slot="company" class="text-sm text-gray-500 dark:text-gray-400">Design Studio</div>
      </TestimonialBlock>
    </div>
  `
})
```

### Quote Style with Emphasis

```typescript
@Component({
  imports: [CommonModule, TestimonialBlock],
  template: `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <TestimonialBlock variant="quote" size="lg" layout="vertical" [showQuote]="true">
        <blockquote slot="quote" class="text-xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed mb-6">
          The level of customization and attention to detail in Angular SuperUI is remarkable. 
          It's saved us countless hours of development time and our users love the polished interface.
        </blockquote>
        <img slot="avatar" 
             src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face" 
             alt="David Park" 
             class="w-14 h-14 rounded-full object-cover">
        <div slot="author" class="font-bold text-gray-900 dark:text-white text-lg">David Park</div>
        <div slot="title" class="text-gray-500 dark:text-gray-400">CTO</div>
        <div slot="company" class="text-primary font-medium">InnovateLab</div>
      </TestimonialBlock>
    </div>
  `
})
```

### Horizontal Layout for Featured Testimonials

```typescript
@Component({
  imports: [CommonModule, TestimonialBlock],
  template: `
    <div class="space-y-8">
      <TestimonialBlock variant="card" size="lg" layout="horizontal">
        <blockquote slot="quote" class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          "Angular SuperUI has revolutionized our development workflow. The components are intuitive, 
          well-documented, and incredibly flexible. Our team productivity has increased significantly."
        </blockquote>
        <div slot="rating" class="flex items-center mb-4">
          <i class="fas fa-star text-yellow-400 text-lg mr-1"></i>
          <i class="fas fa-star text-yellow-400 text-lg mr-1"></i>
          <i class="fas fa-star text-yellow-400 text-lg mr-1"></i>
          <i class="fas fa-star text-yellow-400 text-lg mr-1"></i>
          <i class="fas fa-star text-yellow-400 text-lg mr-1"></i>
          <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">(5.0)</span>
        </div>
        <img slot="avatar" 
             src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face" 
             alt="Alex Thompson" 
             class="w-16 h-16 rounded-full object-cover">
        <div slot="author" class="font-bold text-gray-900 dark:text-white text-lg">Alex Thompson</div>
        <div slot="title" class="text-gray-500 dark:text-gray-400">Lead Developer</div>
        <div slot="company" class="text-primary font-medium">WebFlow Solutions</div>
      </TestimonialBlock>
    </div>
  `
})
```

### Centered Layout for Hero Sections

```typescript
@Component({
  imports: [CommonModule, TestimonialBlock],
  template: `
    <div class="max-w-4xl mx-auto">
      <TestimonialBlock variant="minimal" size="xl" layout="centered" [showQuote]="true">
        <blockquote slot="quote" class="text-2xl text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-8 max-w-3xl">
          Angular SuperUI is hands down the best UI component library I've used for Angular. 
          The developer experience is phenomenal, and the end results are always beautiful and performant.
        </blockquote>
        <div slot="rating" class="flex items-center justify-center mb-6">
          <i class="fas fa-star text-yellow-400 text-2xl mx-1"></i>
          <i class="fas fa-star text-yellow-400 text-2xl mx-1"></i>
          <i class="fas fa-star text-yellow-400 text-2xl mx-1"></i>
          <i class="fas fa-star text-yellow-400 text-2xl mx-1"></i>
          <i class="fas fa-star text-yellow-400 text-2xl mx-1"></i>
        </div>
        <img slot="avatar" 
             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" 
             alt="Ryan Mitchell" 
             class="w-20 h-20 rounded-full object-cover">
        <div slot="author" class="font-bold text-gray-900 dark:text-white text-xl">Ryan Mitchell</div>
        <div slot="title" class="text-gray-500 dark:text-gray-400 text-lg">Founder & CEO</div>
        <div slot="company" class="text-primary font-semibold text-lg">TechStartup Inc.</div>
      </TestimonialBlock>
    </div>
  `
})
```

### Interactive Testimonials with Events

```typescript
@Component({
  imports: [CommonModule, TestimonialBlock],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TestimonialBlock 
        variant="card" 
        size="default"
        [interactive]="true"
        (testimonialClick)="onTestimonialClick('john-smith')"
        (authorClick)="onAuthorClick('john-smith')"
      >
        <blockquote slot="quote" class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          "Outstanding component library with excellent TypeScript support and documentation."
        </blockquote>
        <img slot="avatar" src="..." alt="John Smith" class="w-12 h-12 rounded-full">
        <div slot="author" class="font-semibold text-gray-900 dark:text-white">John Smith</div>
        <div slot="title" class="text-sm text-gray-500">Senior Developer</div>
      </TestimonialBlock>
    </div>
  `
})
export class InteractiveTestimonialsComponent {
  onTestimonialClick(id: string) {
    console.log('Testimonial clicked:', id);
  }

  onAuthorClick(id: string) {
    console.log('Author clicked:', id);
  }
}
```

### Glass Effect Style

```typescript
@Component({
  imports: [CommonModule, TestimonialBlock],
  template: `
    <div class="relative p-8 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TestimonialBlock variant="glass" size="default" layout="vertical">
          <blockquote slot="quote" class="text-white/90 leading-relaxed mb-4">
            "Incredible design system with perfect attention to detail."
          </blockquote>
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <span class="text-white font-bold">JS</span>
          </div>
          <div slot="author" class="font-semibold text-white">Jane Smith</div>
          <div slot="title" class="text-white/80 text-sm">Product Designer</div>
        </TestimonialBlock>
      </div>
    </div>
  `
})
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'minimal' \| 'glass' \| 'gradient' \| 'outlined' \| 'filled' \| 'quote' \| 'card' \| 'custom'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl' \| 'custom'` | `'default'` | Component size and padding |
| `layout` | `'vertical' \| 'horizontal' \| 'centered' \| 'custom'` | `'vertical'` | Content arrangement |
| `showQuote` | `boolean` | `false` | Display decorative quote marks |
| `highlighted` | `boolean` | `false` | Add highlight ring effect |
| `interactive` | `boolean` | `false` | Enable hover effects and click events |
| `class` | `string` | `''` | Additional CSS classes |
| `contentClass` | `string` | `''` | CSS classes for content area |
| `authorClass` | `string` | `''` | CSS classes for author section |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `testimonialClick` | `EventEmitter<MouseEvent>` | Emitted when testimonial is clicked |
| `authorClick` | `EventEmitter<MouseEvent>` | Emitted when author section is clicked |

### Content Slots

| Slot | Description | Usage |
|------|-------------|-------|
| `slot="quote"` | Main testimonial text | Testimonial content, reviews |
| `slot="content"` | Alternative content slot | Additional testimonial content |
| `slot="rating"` | Star rating or score | Rating stars, numerical scores |
| `slot="avatar"` | Author profile image | Photos, avatars, placeholders |
| `slot="image"` | Alternative image slot | Author photos, company logos |
| `slot="author"` | Author name | Customer name, reviewer name |
| `slot="name"` | Alternative name slot | Author identification |
| `slot="title"` | Author job title | Position, role, designation |
| `slot="position"` | Alternative title slot | Job position, role |
| `slot="company"` | Company or organization | Business name, organization |
| `slot="organization"` | Alternative company slot | Institutional affiliation |
| `slot="logo"` | Company logo | Brand logos, company marks |
| `slot="badge"` | Status badge | Featured, verified, premium |
| `slot="footer"` | Additional footer content | Links, dates, additional info |
| `slot="quote-mark"` | Custom quote mark | Decorative quote symbols |
| `slot="decorative"` | Decorative elements | Background patterns, accents |

### Variant Styles

| Variant | Description | Use Case |
|---------|-------------|----------|
| `default` | Standard card with border and shadow | General testimonials, reviews |
| `minimal` | Clean design without styling | Simple content presentation |
| `glass` | Glassmorphism effect with backdrop blur | Modern overlay testimonials |
| `gradient` | Subtle gradient background | Premium or featured content |
| `outlined` | Prominent border styling | Interactive testimonials |
| `filled` | Colored background | Grouped or categorized content |
| `quote` | Emphasis on quote with left border | Quote-focused testimonials |
| `card` | Enhanced card with hover effects | Featured testimonials |
| `custom` | No default styling | Complete customization control |

### Layout Options

| Layout | Description | Use Case |
|--------|-------------|----------|
| `vertical` | Stacked content arrangement | Standard testimonial cards |
| `horizontal` | Side-by-side on larger screens | Featured testimonials |
| `centered` | Center-aligned content | Hero sections, single testimonials |
| `custom` | No layout constraints | Complete layout control |

## Styling

### Custom Styling

```typescript
@Component({
  template: `
    <TestimonialBlock 
      variant="custom"
      class="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-2xl"
      contentClass="space-y-6"
      authorClass="border-t border-white/20 pt-4"
    >
      <blockquote slot="quote" class="text-xl italic">
        "Completely customized testimonial design with full control."
      </blockquote>
      <div slot="author" class="font-bold text-lg">Custom Author</div>
    </TestimonialBlock>
  `
})
```

### Responsive Design

```typescript
@Component({
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      <TestimonialBlock 
        variant="default" 
        size="default"
        layout="vertical"
        class="lg:col-span-2"
      >
        <!-- Featured testimonial spanning 2 columns on large screens -->
      </TestimonialBlock>
      
      <TestimonialBlock 
        variant="minimal" 
        size="sm" 
        class="sm:size-default"
        layout="vertical"
      >
        <!-- Adaptive sizing based on screen size -->
      </TestimonialBlock>
    </div>
  `
})
```

### Dark Mode Support

```typescript
@Component({
  template: `
    <TestimonialBlock 
      variant="default"
      class="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    >
      <blockquote slot="quote" class="text-gray-700 dark:text-gray-300">
        Automatic dark mode support with Tailwind CSS classes.
      </blockquote>
      <div slot="author" class="text-gray-900 dark:text-white">Author Name</div>
      <div slot="title" class="text-gray-500 dark:text-gray-400">Job Title</div>
    </TestimonialBlock>
  `
})
```

## Best Practices

### Content Guidelines

- Keep testimonials authentic and specific
- Include relevant details like names, titles, and companies
- Use actual customer photos when possible
- Vary testimonial lengths for visual interest

### Design Principles

- Maintain consistent styling within the same section
- Use appropriate sizing for content hierarchy
- Consider visual balance when mixing layouts
- Ensure sufficient contrast for readability

### Accessibility

- Provide meaningful alt text for author images
- Use semantic HTML elements like `<blockquote>`
- Ensure sufficient color contrast ratios
- Test with screen readers and keyboard navigation

### Performance

- Optimize author images for web delivery
- Use lazy loading for testimonials below the fold
- Consider virtualization for large testimonial lists
- Minimize complex animations on mobile devices

### Content Strategy

- Lead with your strongest testimonials
- Include diverse perspectives and use cases
- Update testimonials regularly to maintain relevance
- A/B test different layouts and content arrangements

### Trust Building

- Include verifiable details (names, companies, photos)
- Use recent testimonials to show current satisfaction
- Add rating systems when appropriate
- Consider adding verification badges for authenticity

## Examples in Production

### Landing Pages

Perfect for building trust and credibility on marketing pages and product showcases.

### E-commerce

Ideal for product reviews and customer feedback on shopping websites.

### SaaS Applications

Great for showcasing user satisfaction and success stories on software platforms.

### Service Businesses

Excellent for displaying client testimonials and case study highlights.

### Portfolio Sites

Suitable for client recommendations and project feedback display.

### Corporate Websites

Perfect for customer success stories and partnership testimonials.
