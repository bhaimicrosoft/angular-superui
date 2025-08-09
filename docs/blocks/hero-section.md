# Hero Section Block 🦸

Stunning landing page hero sections with flexible layouts and powerful call-to-action designs. Create compelling first impressions that engage visitors and drive conversions.

## Features

- 🎨 **Flexible Layouts** - Centered, split, and custom layout options
- 📱 **Mobile Optimized** - Responsive design that works on all devices
- � **Call-to-Action** - Prominent buttons and conversion-focused design
- � **Multiple Variants** - Different styles for various use cases
- 🖼️ **Media Support** - Images, videos, and background options
- � **Easy Customization** - Tailwind CSS classes for styling
- ♿ **Accessible** - ARIA compliant with semantic markup
- ⚡ **Performance** - Optimized rendering and fast loading

## Installation

Add the Hero Section Block component:

```bash
npx ngsui-cli add block hero-section
```

## Usage

Create hero sections with custom layouts:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div class="text-center max-w-4xl mx-auto">
          <!-- Badge -->
          <div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
            <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            New Release Available
          </div>

          <!-- Main Headline -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Build Amazing Apps with 
            <span class="text-blue-600">Angular SuperUI</span>
          </h1>

          <!-- Description -->
          <p class="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            The ultimate Angular component library for creating beautiful, accessible, 
            and performant user interfaces. Get started in minutes, not hours.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button class="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-lg hover:shadow-xl">
              Get Started Free
            </button>
            <button class="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg">
              View Documentation
            </button>
          </div>

          <!-- Social Proof -->
          <div class="text-sm text-gray-500">
            Trusted by 10,000+ developers worldwide
          </div>
        </div>
      </div>

      <!-- Background Decorations -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-20"></div>
      </div>
    </section>
  `
})
export class ExampleComponent {}
```

## Examples

### Centered Hero with Gradient Background

```typescript
@Component({
  imports: [CommonModule],
  template: `
    <section class="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div class="container mx-auto px-4 py-20 lg:py-32">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-5xl lg:text-6xl font-bold mb-6">
            Welcome to the Future
          </h1>
          <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Discover innovative solutions that transform the way you work and live.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-gray-100 font-medium">
              Get Started
            </button>
            <button class="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-purple-600 font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
```

### Split Layout with Image

```typescript
@Component({
  imports: [CommonModule],
  template: `
    <section class="py-20 lg:py-32">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Content -->
          <div>
            <div class="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mb-6">
              <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Eco-Friendly Solution
            </div>
            
            <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Sustainable Technology for a Better Tomorrow
            </h1>
            
            <p class="text-lg text-gray-600 mb-8">
              Join the movement towards sustainable technology. Our innovative solutions 
              help reduce environmental impact while increasing efficiency.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4">
              <button class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Start Your Journey
              </button>
              <button class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Watch Demo
              </button>
            </div>
          </div>

          <!-- Image -->
          <div class="relative">
            <img 
              src="/api/placeholder/600/400" 
              alt="Sustainable Technology"
              class="rounded-2xl shadow-2xl w-full"
            />
            <div class="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  `
})
```

### Minimal Clean Hero

```typescript
@Component({
  imports: [CommonModule],
  template: `
    <section class="py-24 lg:py-32 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl lg:text-5xl font-light text-gray-900 mb-8 leading-tight">
            Simple. Elegant. <span class="font-bold">Powerful.</span>
          </h1>
          
          <p class="text-xl text-gray-600 mb-10 leading-relaxed">
            Experience the perfect balance of simplicity and functionality 
            in our modern design system.
          </p>
          
          <button class="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            Explore Now
          </button>
        </div>
      </div>
    </section>
  `
})
```

### Hero with Statistics

```typescript
@Component({
  imports: [CommonModule],
  template: `
    <section class="bg-gray-50 py-20 lg:py-32">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Industry Leaders
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Join thousands of companies that rely on our platform for their success.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button class="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Start Free Trial
            </button>
            <button class="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-white">
              Schedule Demo
            </button>
          </div>
        </div>

        <!-- Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-600 mb-2">10K+</div>
            <div class="text-gray-600">Happy Customers</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-green-600 mb-2">99.9%</div>
            <div class="text-gray-600">Uptime</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-purple-600 mb-2">24/7</div>
            <div class="text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </section>
  `
})
```
          🎉 Launch Week Special
        </div>
        
        <h1 slot="headline" class="text-6xl font-bold leading-tight">
          Transform Your
          <span class="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Digital Experience
          </span>
        </h1>
        
        <p slot="description" class="text-xl text-gray-600 leading-relaxed">
          Build modern applications with our comprehensive suite of tools, 
          components, and services designed for the next generation of web development.
        </p>
        
        <div slot="actions" class="flex flex-col sm:flex-row gap-4">
          <button class="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            Start Free Trial
          </button>
          <button class="px-8 py-4 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
            Schedule Demo
          </button>
        </div>
        
        <div slot="social-proof" class="flex items-center space-x-6 text-sm text-gray-500">
          <span>Trusted by 50,000+ developers</span>
          <div class="flex -space-x-2">
            <img class="w-8 h-8 rounded-full border-2 border-white" src="/avatar1.jpg" alt="User 1">
            <img class="w-8 h-8 rounded-full border-2 border-white" src="/avatar2.jpg" alt="User 2">
            <img class="w-8 h-8 rounded-full border-2 border-white" src="/avatar3.jpg" alt="User 3">
          </div>
        </div>
      </div>
      
      <!-- Side Content -->
      <div slot="side-content" class="relative">
        <div class="relative bg-white rounded-xl shadow-2xl overflow-hidden">
          <img src="/dashboard-preview.jpg" alt="Dashboard Preview" class="w-full h-auto">
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <!-- Floating elements -->
        <div class="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
          <span class="text-2xl">⚡</span>
        </div>
      </div>
    </HeroSection>
  `
})
```

### Video Background Hero

```typescript
@Component({
  template: `
    <HeroSection variant="video" size="full" class="relative">
      <!-- Background Video -->
      <video slot="video" autoplay muted loop class="absolute inset-0 w-full h-full object-cover">
        <source src="/hero-video.mp4" type="video/mp4">
      </video>
      
      <!-- Overlay -->
      <div slot="overlay" class="absolute inset-0 bg-black/50"></div>
      
      <!-- Content -->
      <div class="relative z-10 text-white text-center space-y-8">
        <h1 slot="headline" class="text-7xl font-bold leading-tight">
          Experience the
          <br>
          <span class="text-yellow-400">Future</span>
        </h1>
        
        <p slot="description" class="text-2xl font-light max-w-3xl mx-auto">
          Immerse yourself in next-generation technology that redefines possibilities
        </p>
        
        <div slot="actions" class="space-y-4">
          <button class="px-12 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
            Watch Demo
          </button>
          <p class="text-sm text-white/80">No signup required • 2 min demo</p>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div slot="scroll-indicator" class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </HeroSection>
  `
})
```

## Content Slots

The HeroSection component supports multiple content projection slots:

| Slot | Purpose | Usage |
|------|---------|-------|
| `slot="background"` | Background elements | `<div slot="background">...</div>` |
| `slot="video"` | Background video | `<video slot="video">...</video>` |
| `slot="image"` | Background image | `<img slot="image">...</img>` |
| `slot="overlay"` | Background overlay | `<div slot="overlay">...</div>` |
| `slot="badge"` | Announcement badge | `<span slot="badge">...</span>` |
| `slot="announcement"` | Alternative badge | `<div slot="announcement">...</div>` |
| `slot="headline"` | Main headline | `<h1 slot="headline">...</h1>` |
| `slot="title"` | Alternative title | `<h2 slot="title">...</h2>` |
| `slot="description"` | Main description | `<p slot="description">...</p>` |
| `slot="subtitle"` | Alternative description | `<p slot="subtitle">...</p>` |
| `slot="actions"` | Action buttons | `<div slot="actions">...</div>` |
| `slot="cta"` | Call-to-action | `<button slot="cta">...</button>` |
| `slot="buttons"` | Button group | `<div slot="buttons">...</div>` |
| `slot="social-proof"` | Social proof elements | `<div slot="social-proof">...</div>` |
| `slot="testimonial"` | Testimonial content | `<div slot="testimonial">...</div>` |
| `slot="logos"` | Company/partner logos | `<div slot="logos">...</div>` |
| `slot="side-content"` | Side content (split layout) | `<div slot="side-content">...</div>` |
| `slot="image-content"` | Image content | `<div slot="image-content">...</div>` |
| `slot="form"` | Form elements | `<form slot="form">...</form>` |
| `slot="demo"` | Demo content | `<div slot="demo">...</div>` |
| `slot="bottom"` | Bottom section | `<div slot="bottom">...</div>` |
| `slot="scroll-indicator"` | Scroll indicator | `<div slot="scroll-indicator">...</div>` |
| `slot="decorative"` | Decorative elements | `<div slot="decorative">...</div>` |
| `slot="particles"` | Particle effects | `<div slot="particles">...</div>` |

## API Reference

### HeroSection Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'gradient' \| 'dark' \| 'image' \| 'video' \| 'glass' \| 'minimal' \| 'custom'` | `'default'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'default' \| 'lg' \| 'xl' \| 'full' \| 'auto'` | `'default'` | Section size/height |
| `spacing` | `'none' \| 'sm' \| 'default' \| 'lg' \| 'custom'` | `'default'` | Container spacing |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| 'none' \| 'custom'` | `'xl'` | Container max width |
| `container` | `boolean \| 'custom'` | `true` | Use container classes |
| `alignment` | `'left' \| 'center' \| 'right' \| 'custom'` | `'center'` | Content alignment |
| `layout` | `'single' \| 'split' \| 'custom'` | `'single'` | Layout type |
| `class` | `string` | `''` | Additional CSS classes for section |
| `containerClass` | `string` | `''` | Additional CSS classes for container |
| `contentClass` | `string` | `''` | Additional CSS classes for content |
| `backgroundImage` | `string` | `''` | Background image URL |
| `backgroundVideo` | `string` | `''` | Background video URL |
| `overlayOpacity` | `number` | `0.5` | Background overlay opacity |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `sectionClick` | `EventEmitter<MouseEvent>` | Emitted when section is clicked |
| `ctaClick` | `EventEmitter<MouseEvent>` | Emitted when CTA is clicked |

## Styling

### Custom Classes

```typescript
@Component({
  template: `
    <HeroSection 
      class="min-h-screen bg-custom"
      containerClass="max-w-4xl"
      contentClass="items-start text-left"
    >
      <!-- content -->
    </HeroSection>
  `
})
```

### Responsive Design

```typescript
@Component({
  template: `
    <HeroSection size="lg" class="py-12 md:py-24 lg:py-32">
      <h1 slot="headline" class="text-3xl md:text-5xl lg:text-7xl font-bold">
        Responsive Headline
      </h1>
    </HeroSection>
  `
})
```

## Best Practices

### Performance

- Optimize background images/videos for web
- Use appropriate image formats (WebP, AVIF)
- Implement lazy loading for non-critical content

### Accessibility

- Provide alt text for background images
- Ensure sufficient color contrast
- Use semantic HTML elements
- Test with screen readers

### SEO

- Use proper heading hierarchy (h1, h2, etc.)
- Include descriptive meta tags
- Optimize content for search engines

### Mobile Experience

- Test on various device sizes
- Ensure touch targets are appropriately sized
- Consider mobile-specific interactions
