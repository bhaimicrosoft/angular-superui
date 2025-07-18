# Carousel

An accessible and responsive image carousel component with auto-play functionality, navigation controls, and pagination indicators.

## Features

- **Auto-play**: Automatic slide progression with configurable intervals
- **Navigation**: Previous/Next buttons for manual control
- **Pagination**: Dot indicators for direct slide access
- **Responsive**: Configurable width and height
- **Accessible**: ARIA labels and keyboard navigation support
- **Smooth Transitions**: CSS transitions for smooth slide changes
- **Touch-friendly**: Works on mobile devices

## Import

```typescript
import { Carousel } from '@lib/carousel';
```

## Usage

### Basic Example

```html
<Carousel
  [images]="[
    'https://via.assets.so/game.png?id=1&q=95&w=800&h=300&fit=fill',
    'https://via.assets.so/game.png?id=2&q=95&w=800&h=300&fit=fill',
    'https://via.assets.so/game.png?id=3&q=95&w=800&h=300&fit=fill'
  ]"
  [width]="800"
  [height]="400"
  [interval]="5000"
/>
```

### Custom Dimensions

```html
<Carousel
  [images]="imageUrls"
  [width]="600"
  [height]="300"
  [interval]="3000"
/>
```

### Component Definition

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <Carousel
      [images]="carouselImages"
      [width]="800"
      [height]="400"
      [interval]="4000"
    />
  `
})
export class ExampleComponent {
  carouselImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ];
}
```

## API Reference

### Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `images` | `string[]` | Required | Array of image URLs to display in the carousel |
| `width` | `number` | `800` | Width of the carousel in pixels |
| `height` | `number` | `300` | Height of the carousel in pixels |
| `interval` | `number` | `4000` | Auto-play interval in milliseconds |

### Signals

| Signal | Type | Description |
|--------|------|-------------|
| `current` | `signal<number>` | Index of the currently displayed slide |
| `count` | `computed<number>` | Total number of slides |

### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `next()` | None | Navigate to the next slide |
| `prev()` | None | Navigate to the previous slide |
| `goTo(index)` | `index: number` | Navigate to a specific slide by index |

## Accessibility Features

### ARIA Support
- **Previous Button**: `aria-label="Previous Slide"`
- **Next Button**: `aria-label="Next Slide"`
- **Images**: Automatic `alt` attributes with slide numbers

### Keyboard Navigation
- **Arrow Keys**: Navigate between slides (when focused)
- **Tab Navigation**: Focus on navigation buttons and pagination dots

### Screen Reader Support
- Descriptive ARIA labels for all interactive elements
- Semantic HTML structure for proper content hierarchy

## Examples

### Basic Image Carousel

```html
<div class="carousel-container">
  <Carousel
    [images]="[
      'https://via.assets.so/game.png?id=2&q=95&w=800&h=300&fit=fill',
      'https://via.assets.so/game.png?id=1&q=95&w=800&h=300&fit=fill',
      'https://via.assets.so/game.png?id=3&q=95&w=800&h=300&fit=fill'
    ]"
    [width]="800"
    [height]="400"
    [interval]="5000"
  />
</div>
```

### Responsive Carousel

```html
<!-- Small carousel for mobile -->
<div class="block md:hidden">
  <Carousel
    [images]="mobileImages"
    [width]="350"
    [height]="200"
    [interval]="3000"
  />
</div>

<!-- Large carousel for desktop -->
<div class="hidden md:block">
  <Carousel
    [images]="desktopImages"
    [width]="1000"
    [height]="500"
    [interval]="6000"
  />
</div>
```

### Dynamic Content

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dynamic-carousel',
  template: `
    <div class="space-y-4">
      <button 
        (click)="addImage()" 
        class="px-4 py-2 bg-blue-500 text-white rounded">
        Add Image
      </button>
      
      <Carousel
        [images]="carouselImages()"
        [width]="800"
        [height]="400"
        [interval]="4000"
      />
      
      <p class="text-sm text-gray-600">
        Total images: {{ carouselImages().length }}
      </p>
    </div>
  `
})
export class DynamicCarouselComponent {
  carouselImages = signal<string[]>([
    'https://via.assets.so/game.png?id=1&q=95&w=800&h=400&fit=fill',
    'https://via.assets.so/game.png?id=2&q=95&w=800&h=400&fit=fill',
  ]);

  addImage() {
    const newId = Math.floor(Math.random() * 100);
    const newImage = `https://via.assets.so/game.png?id=${newId}&q=95&w=800&h=400&fit=fill`;
    this.carouselImages.update(images => [...images, newImage]);
  }
}
```

## Styling

The carousel uses Tailwind CSS classes for styling. You can customize the appearance by modifying the component's template or adding custom CSS.

### Default Styles

```css
/* Container */
.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

/* Navigation Buttons */
.carousel-nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.carousel-nav-button:hover {
  background: rgba(0, 0, 0, 0.7);
}

/* Pagination Dots */
.carousel-pagination {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.carousel-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.carousel-dot.active {
  background: white;
}
```

## Best Practices

### Performance
- **Optimize Images**: Use appropriately sized images for better performance
- **Lazy Loading**: Consider implementing lazy loading for large image sets
- **Preload**: Preload the next image for smoother transitions

### Accessibility
- **Alt Text**: Provide meaningful alt text for images when possible
- **Reduced Motion**: Consider users with motion sensitivity
- **Focus Management**: Ensure keyboard navigation works properly

### UX Guidelines
- **Auto-play Control**: Allow users to pause auto-play
- **Visual Indicators**: Always show current slide position
- **Touch Support**: Ensure touch gestures work on mobile devices

### Example Implementation

```typescript
import { Component, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-accessible-carousel',
  template: `
    <div class="carousel-wrapper" role="region" aria-label="Image carousel">
      <Carousel
        [images]="accessibleImages()"
        [width]="800"
        [height]="400"
        [interval]="5000"
      />
      
      <!-- Additional accessibility info -->
      <div class="sr-only" aria-live="polite">
        Slide {{ currentSlideIndex() + 1 }} of {{ totalSlides() }}
      </div>
    </div>
  `
})
export class AccessibleCarouselComponent implements OnDestroy {
  accessibleImages = signal([
    'https://example.com/product1.jpg',
    'https://example.com/product2.jpg',
    'https://example.com/product3.jpg',
  ]);

  currentSlideIndex = signal(0);
  totalSlides = signal(this.accessibleImages().length);

  ngOnDestroy() {
    // Cleanup if needed
  }
}
```

## Browser Support

The carousel component works in all modern browsers that support:
- CSS Flexbox
- CSS Transforms
- ES6+ JavaScript features
- Angular 17+ signals
