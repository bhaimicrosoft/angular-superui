# AspectRatio Component 🎨

A powerful and flexible aspect ratio component that maintains consistent proportions for responsive content containers across all screen sizes. Experience the art of perfect proportions with Tailwind's aspect-ratio utilities.

## Overview

The AspectRatio component provides a robust solution for maintaining consistent proportions in responsive layouts. Whether you're building image galleries, video players, or card layouts, this component ensures your content maintains perfect aspect ratios across all devices and screen sizes. Built with Tailwind CSS v4 aspect-ratio utilities for zero runtime overhead.

## Features

- **🎯 Predefined Ratios** - Common ratios like 16:9, 4:3, square, stories (9:16), and more
- **🎨 Custom Ratios** - Support for any custom aspect ratio including Golden Ratio (1.618:1)
- **📱 Responsive Design** - Maintains proportions across all screen sizes
- **♿ Accessibility First** - ARIA compliant with proper semantic roles and labels
- **🔧 Content Agnostic** - Works with images, videos, iframes, and any content
- **⚡ Zero Runtime Overhead** - Pure CSS-based implementation using Tailwind's aspect-ratio classes
- **📦 TypeScript Support** - Full type safety and IntelliSense support
- **🎨 CVA Integration** - Type-safe styling variants using class-variance-authority
- **🌗 Theme Support** - Works seamlessly with light and dark themes

## Installation

```bash
# Using Angular SuperUI CLI (recommended)
npx ngsui add aspect-ratio

```

## Quick Start

```typescript
import { Component } from '@angular/core';
import { AspectRatio } from '@lib/aspect-ratio';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [AspectRatio],
  template: `
    <!-- Cinematic Video (16:9) -->
    <AspectRatio [ratio]="'video'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl'">
      <img 
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop&crop=center"
        alt="Cinematic landscape in perfect 16:9 ratio"
        class="w-full h-full object-cover"
      />
    </AspectRatio>

    <!-- Perfect Square (1:1) -->
    <AspectRatio [ratio]="'square'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl'">
      <img 
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&h=700&fit=crop&crop=center"
        alt="Perfect square composition"
        class="w-full h-full object-cover"
      />
    </AspectRatio>

    <!-- Golden Ratio (φ 1.618:1) -->
    <AspectRatio [customRatio]="'1.618'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl'">
      <img 
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&h=433&fit=crop&crop=center"
        alt="Nature following the golden ratio"
        class="w-full h-full object-cover"
      />
    </AspectRatio>
  `
})
export class ExampleComponent {}
```

## Live Demo Examples

### Renaissance Gallery - Complete Implementation

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AspectRatio } from '@lib/aspect-ratio';
import {
  LucideAngularModule,
  PlayIcon,
  SquareIcon,
  CameraIcon,
  MonitorIcon,
  SmartphoneIcon
} from 'lucide-angular';

@Component({
  selector: 'app-renaissance-gallery',
  standalone: true,
  imports: [CommonModule, AspectRatio, LucideAngularModule],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
      
      <!-- Cinematic Vision (16:9) -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
            <lucide-angular [img]="PlayIcon" class="w-6 h-6 text-white"></lucide-angular>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Cinematic Vision</h3>
            <p class="text-indigo-600 dark:text-indigo-400 font-medium">16:9 • Video Format</p>
          </div>
        </div>

        <AspectRatio [ratio]="'video'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl transition-all duration-500'">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop&crop=center"
            alt="Cinematic landscape in perfect 16:9 ratio"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <div class="text-white">
              <p class="font-bold text-lg mb-1">Perfect for Cinema</p>
              <p class="text-sm opacity-90">Widescreen excellence</p>
            </div>
          </div>
        </AspectRatio>
      </div>

      <!-- Perfect Square (1:1) -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
            <lucide-angular [img]="SquareIcon" class="w-6 h-6 text-white"></lucide-angular>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Perfect Balance</h3>
            <p class="text-emerald-600 dark:text-emerald-400 font-medium">1:1 • Square Harmony</p>
          </div>
        </div>

        <AspectRatio [ratio]="'square'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl transition-all duration-500'">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&h=700&fit=crop&crop=center"
            alt="Perfect square composition"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div class="text-white text-center bg-black/40 backdrop-blur-sm rounded-2xl p-4">
              <p class="font-bold text-lg mb-1">Instagram Perfect</p>
              <p class="text-sm opacity-90">1:1 Symmetry</p>
            </div>
          </div>
        </AspectRatio>
      </div>

      <!-- Golden Ratio (φ 1.618:1) -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
            <span class="text-white font-bold text-xl">φ</span>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Divine Proportion</h3>
            <p class="text-amber-600 dark:text-amber-400 font-medium">1.618:1 • Golden Ratio</p>
          </div>
        </div>

        <AspectRatio [customRatio]="'1.618'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl transition-all duration-500'">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&h=433&fit=crop&crop=center"
            alt="Nature following the golden ratio"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-tr from-amber-500/30 via-transparent to-yellow-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div class="text-white text-center bg-black/40 backdrop-blur-sm rounded-2xl p-6">
              <div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span class="text-white font-bold text-2xl">φ</span>
              </div>
              <p class="font-bold text-lg mb-1">Mathematical Beauty</p>
              <p class="text-sm opacity-90">Nature's Perfect Ratio</p>
            </div>
          </div>
        </AspectRatio>
      </div>

      <!-- Classic Photography (4:3) -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
            <lucide-angular [img]="CameraIcon" class="w-6 h-6 text-white"></lucide-angular>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Classic Photography</h3>
            <p class="text-blue-600 dark:text-blue-400 font-medium">4:3 • Traditional Format</p>
          </div>
        </div>

        <AspectRatio [ratio]="'photo'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl transition-all duration-500'">
          <img
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=450&fit=crop&crop=center"
            alt="Classic 4:3 photography composition"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-bl from-blue-500/20 via-transparent to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <div class="text-white">
              <p class="font-bold text-lg mb-1">Timeless Standard</p>
              <p class="text-sm opacity-90">4:3 Classic</p>
            </div>
          </div>
        </AspectRatio>
      </div>

      <!-- Ultra-wide Cinema (21:9) -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
            <lucide-angular [img]="MonitorIcon" class="w-6 h-6 text-white"></lucide-angular>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Cinematic Ultra-wide</h3>
            <p class="text-purple-600 dark:text-purple-400 font-medium">21:9 • Epic Format</p>
          </div>
        </div>

        <AspectRatio [ratio]="'wide'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl transition-all duration-500'">
          <img
            src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=900&h=386&fit=crop&crop=center"
            alt="Ultra-wide cinematic landscape"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-transparent to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div class="text-white text-center bg-black/40 backdrop-blur-sm rounded-2xl p-6">
              <p class="font-bold text-xl mb-2">Epic Proportions</p>
              <p class="text-sm opacity-90">21:9 Ultra-wide Excellence</p>
            </div>
          </div>
        </AspectRatio>
      </div>

      <!-- Mobile Stories (9:16) -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
            <lucide-angular [img]="SmartphoneIcon" class="w-6 h-6 text-white"></lucide-angular>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Mobile Stories</h3>
            <p class="text-rose-600 dark:text-rose-400 font-medium">9:16 • Vertical Stories</p>
          </div>
        </div>

        <div class="w-full max-w-xs mx-auto">
          <AspectRatio [ratio]="'stories'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl transition-all duration-500'">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=450&h=800&fit=crop&crop=center"
              alt="Vertical mobile story format"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-rose-500/40 via-transparent to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div class="text-white text-center bg-black/40 backdrop-blur-sm rounded-2xl p-4">
                <p class="font-bold text-lg mb-1">Stories Perfect</p>
                <p class="text-sm opacity-90">9:16 Mobile</p>
              </div>
            </div>
          </AspectRatio>
        </div>
      </div>

    </div>
  `
})
export class RenaissanceGalleryComponent {
  readonly PlayIcon = PlayIcon;
  readonly SquareIcon = SquareIcon;
  readonly CameraIcon = CameraIcon;
  readonly MonitorIcon = MonitorIcon;
  readonly SmartphoneIcon = SmartphoneIcon;
}
```

### Key Implementation Notes

1. **Clean Structure**: Each ratio example uses a simple `div` wrapper with `flex flex-col gap-4`
2. **Direct AspectRatio Usage**: No nested containers that interfere with the aspect ratio calculations
3. **Proper Image Sizing**: Always use `w-full h-full object-cover` for images within AspectRatio
4. **Hover Effects**: Overlays use `absolute` positioning and opacity transitions
5. **Real Images**: All examples use actual Unsplash images with proper dimensions

## Component Implementation

### Tailwind v4 CSS Classes

The AspectRatio component uses Tailwind's native aspect-ratio utilities:

```typescript
const aspectRatioVariants = cva(
  'relative w-full overflow-hidden',
  {
    variants: {
      ratio: {
        square: 'aspect-square',      // 1:1
        video: 'aspect-video',        // 16:9 
        photo: 'aspect-[4/3]',        // 4:3
        wide: 'aspect-[21/9]',        // 21:9 Ultra-wide
        stories: 'aspect-[9/16]',     // 9:16 Mobile Stories
        portrait: 'aspect-[3/4]',     // 3:4 Portrait
        '4/3': 'aspect-[4/3]',        // 4:3 Alternative
        '3/2': 'aspect-[3/2]',        // 3:2 Classic Film
        '16/9': 'aspect-[16/9]',      // 16:9 Alternative
        '21/9': 'aspect-[21/9]',      // 21:9 Alternative
        '1/1': 'aspect-[1/1]',        // 1:1 Alternative
        '3/4': 'aspect-[3/4]',        // 3:4 Alternative
        '2/3': 'aspect-[2/3]',        // 2:3 Tall Portrait
        '9/16': 'aspect-[9/16]'       // 9:16 Alternative
      }
    },
    defaultVariants: {
      ratio: 'video'
    }
  }
);
```

### Generated CSS Output

When you use the component, it generates the following CSS classes:

```css
/* Predefined ratios */
.aspect-video { aspect-ratio: 16 / 9; }
.aspect-square { aspect-ratio: 1 / 1; }
.aspect-[4/3] { aspect-ratio: 4 / 3; }
.aspect-[1.618] { aspect-ratio: 1.618 / 1; }
.aspect-[21/9] { aspect-ratio: 21 / 9; }
.aspect-[9/16] { aspect-ratio: 9 / 16; }

/* Always applied base classes */
.relative { position: relative; }
.w-full { width: 100%; }
.overflow-hidden { overflow: hidden; }
```

### Custom Ratio Implementation

For custom ratios, the component dynamically applies the aspect-ratio style:

```typescript
// Example: Golden Ratio (φ = 1.618)
<AspectRatio [customRatio]="'1.618'">
  <!-- Content -->
</AspectRatio>

// Generates: style="aspect-ratio: 1.618 / 1"
```

## Predefined Aspect Ratios

### Common Video & Media Ratios

```typescript
// 16:9 Video (YouTube, Netflix)
<AspectRatio ratio="video" ariaLabel="Video content">
  <video controls class="w-full h-full">
    <source src="video.mp4" type="video/mp4">
  </video>
</AspectRatio>

// Ultra-wide Cinema (21:9)
<AspectRatio ratio="21/9" ariaLabel="Cinematic banner">
  <div class="bg-gradient-to-r from-purple-500 to-pink-500 w-full h-full">
    <!-- Hero content -->
  </div>
</AspectRatio>
```

### Social Media Ratios

```typescript
// Instagram Square (1:1)
<AspectRatio ratio="square" ariaLabel="Instagram post">
  <img src="post.jpg" alt="Instagram post" class="w-full h-full object-cover" />
</AspectRatio>

// Instagram Stories (9:16)
<AspectRatio ratio="9/16" ariaLabel="Story content">
  <div class="bg-gradient-to-b from-blue-400 to-purple-600 w-full h-full">
    <!-- Story content -->
  </div>
</AspectRatio>
```

### Traditional Photo Ratios

```typescript
// Classic Film (4:3)
<AspectRatio ratio="4/3" ariaLabel="Classic photo">
  <img src="classic-photo.jpg" alt="Classic photograph" class="w-full h-full object-cover" />
</AspectRatio>

// 35mm Film (3:2)
<AspectRatio ratio="3/2" ariaLabel="Landscape photo">
  <img src="landscape.jpg" alt="Landscape photograph" class="w-full h-full object-cover" />
</AspectRatio>

// Portrait (3:4)
<AspectRatio ratio="3/4" ariaLabel="Portrait photo">
  <img src="portrait.jpg" alt="Portrait photograph" class="w-full h-full object-cover" />
</AspectRatio>
```

## Custom Aspect Ratios

### Using Custom Numeric Ratios

```typescript
// Golden Ratio (1.618:1)
<AspectRatio customRatio="1.618" ariaLabel="Golden ratio content">
  <div class="bg-amber-100 w-full h-full flex items-center justify-center">
    <span class="text-2xl font-bold text-amber-800">φ Golden Ratio</span>
  </div>
</AspectRatio>

// Ultra-wide Monitor (32:9)
<AspectRatio customRatio="3.56" ariaLabel="Ultra-wide display">
  <div class="bg-gray-900 w-full h-full p-4">
    <!-- Ultra-wide content -->
  </div>
</AspectRatio>

// Custom Brand Ratio
<AspectRatio customRatio="2.35" ariaLabel="Brand banner">
  <div class="bg-brand-gradient w-full h-full">
    <!-- Brand content -->
  </div>
</AspectRatio>
```

## Advanced Usage

### TypeScript Integration

```typescript
import { Component, signal } from '@angular/core';
import { AspectRatio, type AspectRatioProps } from '@lib/aspect-ratio';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [AspectRatio],
  template: `
    <!-- Interactive ratio selector -->
    <div class="space-y-4">
      <select (change)="selectedRatio.set($event.target.value)" 
              class="px-4 py-2 border rounded-lg">
        <option *ngFor="let ratio of availableRatios" [value]="ratio.value">
          {{ ratio.label }}
        </option>
      </select>

      <AspectRatio 
        [ratio]="selectedRatio()" 
        ariaLabel="Dynamic aspect ratio demo"
        class="border-2 border-dashed border-gray-300">
        <div class="w-full h-full flex items-center justify-center text-gray-500">
          {{ getCurrentRatioLabel() }}
        </div>
      </AspectRatio>
    </div>
  `
})
export class GalleryComponent {
  selectedRatio = signal<AspectRatioProps['ratio']>('video');
  
  availableRatios: Array<{ value: AspectRatioProps['ratio']; label: string }> = [
    { value: 'square', label: '1:1 Square' },
    { value: 'video', label: '16:9 Video' },
    { value: '4/3', label: '4:3 Classic' },
    { value: '3/2', label: '3:2 Photo' },
    { value: '21/9', label: '21:9 Ultra-wide' },
    { value: '3/4', label: '3:4 Portrait' },
    { value: '9/16', label: '9:16 Stories' }
  ];

  getCurrentRatioLabel(): string {
    const ratio = this.availableRatios.find(r => r.value === this.selectedRatio());
    return ratio?.label || String(this.selectedRatio()) || 'Unknown';
  }
}
```

### Advanced Styling and Effects

```typescript
// Hover effects with aspect ratio
<AspectRatio 
  ratio="video" 
  class="group overflow-hidden rounded-xl shadow-lg"
  ariaLabel="Interactive video card">
  
  <img 
    src="thumbnail.jpg" 
    alt="Video thumbnail"
    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
    
  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
              transition-opacity duration-300 flex items-center justify-center">
    <button class="bg-white/20 backdrop-blur-sm rounded-full p-4 
                   hover:bg-white/30 transition-colors">
      <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
      </svg>
    </button>
  </div>
</AspectRatio>

// Loading states
<AspectRatio ratio="video" ariaLabel="Loading video">
  <div class="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
    <div class="w-16 h-16 bg-gray-300 rounded-full animate-spin"></div>
  </div>
</AspectRatio>

// Gradient overlays
<AspectRatio ratio="21/9" ariaLabel="Hero banner">
  <div class="w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
              relative overflow-hidden">
    <div class="absolute inset-0 bg-black/20"></div>
    <div class="relative z-10 h-full flex items-center justify-center text-white">
      <h1 class="text-4xl font-bold text-center">Hero Content</h1>
    </div>
  </div>
</AspectRatio>
```

## API Reference

### AspectRatio Component

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ratio` | `'square' \| 'video' \| 'photo' \| 'wide' \| 'stories' \| 'portrait' \| '4/3' \| '3/2' \| '16/9' \| '21/9' \| '1/1' \| '3/4' \| '2/3' \| '9/16'` | `'video'` | Predefined aspect ratio |
| `customRatio` | `string` | `undefined` | Custom numeric aspect ratio (e.g., "1.618") |
| `customClasses` | `string` | `undefined` | Additional CSS classes to apply |

### Predefined Ratios Reference

| Ratio Key | CSS Value | Common Use Cases | Visual Example |
|-----------|-----------|------------------|----------------|
| `square` | `1:1` | Profile pictures, Instagram posts, thumbnails | □ |
| `video` | `16:9` | YouTube, Netflix, modern video content | ▬ |
| `photo` | `4:3` | Traditional photography, presentations | ▬ |
| `wide` | `21:9` | Ultra-wide monitors, cinematic content | ═══ |
| `stories` | `9:16` | Instagram Stories, TikTok, mobile video | ▌|
| `portrait` | `3:4` | Portrait photos, mobile app screens | ▌|
| `4/3` | `4:3` | Alternative syntax for photo ratio | ▬ |
| `3/2` | `3:2` | 35mm film, DSLR photography | ▬ |
| `16/9` | `16:9` | Alternative syntax for video ratio | ▬ |
| `21/9` | `21:9` | Alternative syntax for wide ratio | ═══ |
| `1/1` | `1:1` | Alternative syntax for square ratio | □ |
| `3/4` | `3:4` | Alternative syntax for portrait ratio | ▌|
| `2/3` | `2:3` | Tall portrait format | ▌|
| `9/16` | `9:16` | Alternative syntax for stories ratio | ▌|

### Custom Ratio Examples

```typescript
// Golden Ratio (φ = 1.618)
<AspectRatio [customRatio]="'1.618'">
  <div class="bg-gradient-to-br from-amber-400 to-yellow-500 w-full h-full flex items-center justify-center">
    <span class="text-white font-bold text-2xl">φ</span>
  </div>
</AspectRatio>

// Ultra-wide 32:9 (Super Ultrawide Monitor)
<AspectRatio [customRatio]="'3.56'">
  <div class="bg-gray-900 w-full h-full flex items-center justify-center text-white">
    32:9 Ultra-wide Display
  </div>
</AspectRatio>

// Custom brand ratio
<AspectRatio [customRatio]="'2.35'">
  <div class="bg-brand-gradient w-full h-full">
    <!-- Brand content -->
  </div>
</AspectRatio>
```

## Accessibility

### ARIA Support

```typescript
// Proper ARIA labeling
<AspectRatio ratio="video" ariaLabel="Product demonstration video">
  <video controls aria-describedby="video-description">
    <source src="demo.mp4" type="video/mp4">
    <track kind="captions" src="captions.vtt" srclang="en" label="English">
  </video>
</AspectRatio>

<p id="video-description" class="sr-only">
  A 5-minute demonstration of the product's key features
</p>

// Image with proper alt text
<AspectRatio ratio="square" ariaLabel="Team member profile">
  <img 
    src="team-member.jpg" 
    alt="Sarah Johnson, Senior Developer, smiling professional headshot" 
    class="w-full h-full object-cover" />
</AspectRatio>
```

### Screen Reader Support

The component automatically provides:
- `role="img"` for media containers
- Support for custom `aria-label` attributes
- Proper semantic structure for screen readers
- Keyboard navigation compatibility

## Performance Optimization

### Image Optimization

```typescript
// Responsive images with aspect ratio
<AspectRatio ratio="video" ariaLabel="Responsive hero image">
  <picture>
    <source 
      media="(min-width: 768px)" 
      srcset="hero-desktop.webp 1200w, hero-desktop-2x.webp 2400w"
      sizes="(min-width: 768px) 1200px, 100vw" />
    <source 
      srcset="hero-mobile.webp 600w, hero-mobile-2x.webp 1200w"
      sizes="100vw" />
    <img 
      src="hero-fallback.jpg" 
      alt="Hero image description"
      class="w-full h-full object-cover"
      loading="lazy" />
  </picture>
</AspectRatio>

// Lazy loading with intersection observer
<AspectRatio ratio="square" ariaLabel="Gallery image">
  <img 
    [src]="isIntersecting ? imageUrl : placeholderUrl"
    [alt]="imageAlt"
    class="w-full h-full object-cover transition-opacity duration-300"
    [class.opacity-50]="!isIntersecting"
    loading="lazy" />
</AspectRatio>
```

### CSS Performance

```css
/* Optimize for better performance */
.aspect-ratio-container {
  /* Use transform3d for hardware acceleration */
  transform: translate3d(0, 0, 0);
  
  /* Optimize repaints */
  will-change: auto;
  
  /* Improve text rendering */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Efficient hover effects */
.aspect-ratio-image {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.aspect-ratio-container:hover .aspect-ratio-image {
  transform: scale(1.05) translate3d(0, 0, 0);
}
```

## Common Use Cases

### 1. Image Galleries

```typescript
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <AspectRatio 
    *ngFor="let image of galleryImages" 
    ratio="square"
    [ariaLabel]="image.alt"
    class="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <img 
      [src]="image.url" 
      [alt]="image.alt"
      class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
  </AspectRatio>
</div>
```

### 2. Video Players

```typescript
<AspectRatio ratio="video" ariaLabel="Course video player">
  <iframe 
    [src]="videoUrl | safe"
    [title]="videoTitle"
    class="w-full h-full border-none"
    allowfullscreen>
  </iframe>
</AspectRatio>
```

### 3. Card Layouts

```typescript
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div *ngFor="let card of cards" 
       class="bg-white rounded-lg shadow-md overflow-hidden">
    <AspectRatio ratio="video" [ariaLabel]="card.title + ' thumbnail'">
      <img 
        [src]="card.thumbnail" 
        [alt]="card.title"
        class="w-full h-full object-cover" />
    </AspectRatio>
    <div class="p-6">
      <h3 class="text-xl font-semibold mb-2">{{ card.title }}</h3>
      <p class="text-gray-600">{{ card.description }}</p>
    </div>
  </div>
</div>
```

### 4. Loading States

```typescript
<AspectRatio ratio="video" ariaLabel="Loading content">
  <div class="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 
              animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite]">
  </div>
</AspectRatio>

<!-- CSS for shimmer effect -->
<style>
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>
```

### 5. Social Media Embeds

```typescript
<!-- Instagram-style square posts -->
<AspectRatio ratio="square" ariaLabel="Social media post">
  <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
    <img src="post-image.jpg" alt="Post content" class="w-full h-full object-cover" />
  </div>
</AspectRatio>

<!-- Twitter-style media cards -->
<AspectRatio ratio="16/9" ariaLabel="Media preview">
  <div class="bg-gray-100 border border-gray-300 rounded-lg p-4">
    <h4 class="font-semibold">Article Title</h4>
    <p class="text-sm text-gray-600">Article description...</p>
  </div>
</AspectRatio>
```

## Best Practices

### ✅ Do's

- **Use semantic ratios** for common use cases (`video`, `square`, `photo`) rather than numeric equivalents
- **Apply proper image classes** always use `w-full h-full object-cover` for images
- **Use clean container structure** wrap AspectRatio in simple flex containers without extra styling
- **Optimize images** for the display size to improve performance
- **Consider mobile viewports** when selecting aspect ratios
- **Use hover effects properly** with absolute positioning and opacity transitions
- **Test responsive behavior** across different screen sizes

### ❌ Don'ts

- **Don't wrap in complex containers** that could interfere with aspect ratio calculations
- **Don't use without object-cover** for images (will cause distortion)
- **Don't nest AspectRatio components** - use a single container
- **Don't use extreme ratios** that could cause layout issues on mobile
- **Don't forget to test** the actual visual ratios match the intended proportions
- **Avoid hardcoded dimensions** - let the component handle sizing

### Correct Implementation Pattern

```typescript
// ✅ CORRECT: Clean structure from the demo
<div class="flex flex-col gap-4">
  <!-- Header outside AspectRatio -->
  <div class="flex items-center">
    <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
      <lucide-angular [img]="PlayIcon" class="w-6 h-6 text-white"></lucide-angular>
    </div>
    <div>
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Cinematic Vision</h3>
      <p class="text-indigo-600 dark:text-indigo-400 font-medium">16:9 • Video Format</p>
    </div>
  </div>

  <!-- Direct AspectRatio usage -->
  <AspectRatio [ratio]="'video'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl'">
    <img
      src="image.jpg"
      alt="Description"
      class="w-full h-full object-cover"
    />
    <!-- Optional overlay -->
    <div class="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity">
      <!-- Overlay content -->
    </div>
  </AspectRatio>
</div>
```

```typescript
// ❌ INCORRECT: Wrapped in styling containers
<div class="bg-white rounded-3xl p-6 border-2 shadow-2xl">
  <div class="flex items-center mb-6">
    <!-- Header -->
  </div>
  
  <AspectRatio [ratio]="'video'"> <!-- Ratio may not work correctly -->
    <img src="image.jpg" class="w-full h-full" /> <!-- Missing object-cover -->
  </AspectRatio>
  
  <div class="mt-6">
    <!-- Footer content -->
  </div>
</div>
```

## Styling Guide

### Custom CSS Classes

```css
/* Custom aspect ratio container styling */
.custom-aspect-ratio {
  @apply relative overflow-hidden rounded-xl shadow-lg;
  
  /* Custom hover effects */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.custom-aspect-ratio:hover {
  @apply shadow-2xl;
  transform: translateY(-2px);
}

/* Content styling within aspect ratio */
.aspect-ratio-content {
  @apply w-full h-full flex items-center justify-center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Responsive aspect ratio adjustments */
@media (max-width: 768px) {
  .mobile-aspect-adjust {
    /* Switch to square on mobile for better UX */
    aspect-ratio: 1 / 1 !important;
  }
}
```

### Gradient Overlays

```typescript
<AspectRatio ratio="21/9" class="relative group">
  <img src="hero-bg.jpg" alt="Background" class="w-full h-full object-cover" />
  
  <!-- Gradient overlay -->
  <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
  
  <!-- Content overlay -->
  <div class="absolute inset-0 flex items-center justify-center text-white z-10">
    <div class="text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-4">Hero Title</h1>
      <p class="text-xl md:text-2xl opacity-90">Compelling subtitle</p>
    </div>
  </div>
</AspectRatio>
```

## Technical Implementation

### Component Architecture

The AspectRatio component is built with:

- **CVA (Class Variance Authority)** for type-safe styling variants
- **OnPush Change Detection** for optimal performance
- **Pure CSS implementation** with zero runtime overhead
- **Host binding** for seamless class and style application
- **Semantic HTML structure** for accessibility compliance

### Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge | IE11 |
|---------|--------|---------|--------|------|------|
| CSS aspect-ratio | ✅ 88+ | ✅ 89+ | ✅ 15+ | ✅ 88+ | ❌ |
| Fallback support | ✅ All | ✅ All | ✅ All | ✅ All | ❌ |
| Full functionality | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ❌ |

### Performance Characteristics

- **Zero JavaScript overhead** - Pure CSS implementation
- **Optimized change detection** - OnPush strategy
- **No resize listeners** - Native CSS responsive behavior
- **Efficient rendering** - Minimal DOM manipulation
- **Memory efficient** - No event listeners or timers

## Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details on how to submit improvements, bug fixes, or new features.

## License

This component is part of Angular SuperUI and is licensed under the MIT License. See [LICENSE](../../LICENSE) for details.
