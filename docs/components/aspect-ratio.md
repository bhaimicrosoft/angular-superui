# Aspect Ratio Component 📐

A versatile aspect ratio component that maintains consistent proportions for responsive content containers.

## Features

- **Predefined Ratios** - Common aspect ratios like 16:9, 4:3, square, and more
- **Custom Ratios** - Support for any custom aspect ratio using CSS aspect-ratio property
- **Responsive Design** - Maintains proportions across different screen sizes
- **Accessibility First** - ARIA compliant with proper semantic roles
- **Content Agnostic** - Works with images, videos, iframes, and any content
- **TypeScript Support** - Full type safety and IntelliSense

## Installation

```bash
# Using CLI (recommended)
ngsui-cli add aspect-ratio

# Manual installation
npm install angular-superui
```

## Basic Usage

```typescript
import { Component } from '@angular/core';
import { AspectRatioComponent } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [AspectRatioComponent],
  template: `
    <AspectRatio ratio="video" [ariaLabel]="'Video container'">
      <img 
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd" 
        alt="Photo by Drew Beamer"
        class="h-full w-full rounded-md object-cover"
      />
    </AspectRatio>
  `
})
export class ExampleComponent {}
```

## Examples

### Predefined Ratios

Perfect for common use cases like profile images and video content:

```typescript
@Component({
  template: `
    <div class="grid grid-cols-2 gap-4">
      <!-- Square ratio - ideal for profile images -->
      <div>
        <p class="text-sm text-gray-600 mb-2">Square (1:1)</p>
        <AspectRatio 
          ratio="square" 
          class="bg-gradient-to-br from-pink-400 to-red-600 rounded-lg border shadow-md" 
          [ariaLabel]="'Square ratio example'">
          <div class="flex flex-col items-center justify-center h-full text-white font-medium p-4">
            <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-2">
              📸
            </div>
            <span class="text-sm">Profile Image</span>
            <span class="text-xs opacity-80">1:1 Ratio</span>
          </div>
        </AspectRatio>
      </div>
      
      <!-- Video ratio - perfect for video content -->
      <div>
        <p class="text-sm text-gray-600 mb-2">Video (16:9)</p>
        <AspectRatio 
          ratio="video" 
          class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg border shadow-md" 
          [ariaLabel]="'Video ratio example'">
          <div class="flex flex-col items-center justify-center h-full text-white font-medium p-4">
            <div class="w-10 h-6 bg-white/20 rounded flex items-center justify-center mb-2">
              ▶️
            </div>
            <span class="text-sm">Video Player</span>
            <span class="text-xs opacity-80">16:9 Ratio</span>
          </div>
        </AspectRatio>
      </div>
    </div>
  `
})
export class PredefinedRatiosExample {}
```

### Banner Images

Great for hero sections and featured content:

```typescript
@Component({
  template: `
    <AspectRatio 
      ratio="16/9" 
      class="bg-muted rounded-lg overflow-hidden shadow-md" 
      [ariaLabel]="'Banner image example'">
      <div class="relative h-full w-full bg-gradient-to-br from-green-400 to-blue-500">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center text-white">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              🖼️
            </div>
            <h4 class="font-semibold mb-1">Banner Image</h4>
            <p class="text-sm opacity-90">Perfect for hero sections</p>
            <span class="text-xs bg-white/20 px-2 py-1 rounded mt-2 inline-block">16:9</span>
          </div>
        </div>
      </div>
    </AspectRatio>
  `
})
export class BannerImageExample {}
```

### Custom Ratios

Use custom aspect ratios for unique layouts:

```typescript
@Component({
  template: `
    <AspectRatio 
      [customRatio]="'2 / 1'" 
      class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-md" 
      [ariaLabel]="'Custom ratio example'">
      <div class="flex items-center justify-center h-full text-white font-medium p-4">
        <div class="text-center">
          <div class="w-12 h-8 bg-white/20 rounded mb-3 mx-auto flex items-center justify-center">
            📏
          </div>
          <div class="font-semibold">Custom Banner</div>
          <div class="text-sm opacity-90 mt-1">2:1 Ultra-wide Ratio</div>
          <div class="text-xs bg-white/20 px-2 py-1 rounded mt-2 inline-block">Perfect for headers</div>
        </div>
      </div>
    </AspectRatio>
  `
})
export class CustomRatioExample {}
```

### Gallery Layout

Multiple aspect ratios in a responsive grid:

```typescript
@Component({
  template: `
    <div class="grid grid-cols-3 gap-3">
      <!-- Photo ratio 4:3 -->
      <AspectRatio 
        ratio="4/3" 
        class="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-md shadow-sm" 
        [ariaLabel]="'Photo ratio example'">
        <div class="flex flex-col items-center justify-center h-full text-white text-xs font-medium">
          <span>📷</span>
          <span class="mt-1">Photo</span>
          <span class="text-xs opacity-80">4:3</span>
        </div>
      </AspectRatio>
      
      <!-- Portrait ratio 3:4 -->
      <AspectRatio 
        ratio="3/4" 
        class="bg-gradient-to-br from-teal-400 to-green-500 rounded-md shadow-sm" 
        [ariaLabel]="'Portrait ratio example'">
        <div class="flex flex-col items-center justify-center h-full text-white text-xs font-medium">
          <span>🖼️</span>
          <span class="mt-1">Portrait</span>
          <span class="text-xs opacity-80">3:4</span>
        </div>
      </AspectRatio>
      
      <!-- Social media ratio 1:1 -->
      <AspectRatio 
        ratio="1/1" 
        class="bg-gradient-to-br from-violet-400 to-purple-500 rounded-md shadow-sm" 
        [ariaLabel]="'Social media ratio example'">
        <div class="flex flex-col items-center justify-center h-full text-white text-xs font-medium">
          <span>📱</span>
          <span class="mt-1">Social</span>
          <span class="text-xs opacity-80">1:1</span>
        </div>
      </AspectRatio>
    </div>
  `
})
export class GalleryLayoutExample {}
```

### Real-world Image Example

Perfect for product images or content thumbnails:

```typescript
@Component({
  template: `
    <AspectRatio 
      ratio="video" 
      class="rounded-lg overflow-hidden shadow-md">
      <img 
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&h=450&fit=crop" 
        alt="Beautiful landscape"
        class="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </AspectRatio>
  `
})
export class ImageExample {}
```

## API Reference

### AspectRatio

The main component for maintaining aspect ratios.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ratio` | `'square' \| 'video' \| '4/3' \| '3/2' \| '16/9' \| '21/9' \| '1/1' \| '3/4' \| '2/3' \| '9/16'` | `'video'` | Predefined aspect ratio |
| `customRatio` | `string` | `undefined` | Custom aspect ratio (e.g., '1.618 / 1') |
| `class` | `string` | `''` | Additional CSS classes |
| `ariaLabel` | `string` | `undefined` | Accessibility label for screen readers |

### Available Ratios

| Ratio | CSS Value | Use Case |
|-------|-----------|----------|
| `square` | `1:1` | Profile pictures, thumbnails |
| `video` | `16:9` | Videos, widescreen content |
| `4/3` | `4:3` | Traditional photos, presentations |
| `3/2` | `3:2` | Classic photography format |
| `16/9` | `16:9` | Modern video, widescreen displays |
| `21/9` | `21:9` | Ultrawide content |
| `1/1` | `1:1` | Square format (same as square) |
| `3/4` | `3:4` | Portrait orientation |
| `2/3` | `2:3` | Tall portrait format |
| `9/16` | `9:16` | Mobile video, stories |

## Accessibility

The AspectRatio component is built with accessibility in mind:

### Accessibility Features

- **Semantic Role**: Uses `role="img"` when containing images
- **Screen Reader Support**: Proper ARIA labels for context
- **Keyboard Navigation**: Inherits keyboard behavior from child elements
- **Focus Management**: Maintains focus on interactive child elements
- **Alt Text Support**: Works with image alt attributes

### ARIA Attributes

- `aria-label`: Describes the purpose of the aspect ratio container
- `role="img"`: Indicates the container holds visual content

### Best Practices

1. **Always provide `ariaLabel`** for screen reader users
2. **Include alt text** on images within the container
3. **Use semantic HTML** for interactive elements
4. **Maintain focus** on keyboard-navigable content

## Styling

The component uses Tailwind CSS classes and CVA for styling:

```typescript
const aspectRatioVariants = cva(
  'relative w-full overflow-hidden',
  {
    variants: {
      ratio: {
        square: 'aspect-square',
        video: 'aspect-video',
        '4/3': 'aspect-[4/3]',
        '3/2': 'aspect-[3/2]',
        '16/9': 'aspect-[16/9]',
        '21/9': 'aspect-[21/9]',
        '1/1': 'aspect-[1/1]',
        '3/4': 'aspect-[3/4]',
        '2/3': 'aspect-[2/3]',
        '9/16': 'aspect-[9/16]'
      }
    },
    defaultVariants: {
      ratio: 'video'
    }
  }
);
```

## Common Use Cases

### 1. Image Galleries

Maintain consistent sizing across varying image dimensions.

### 2. Video Players

Responsive video containers that maintain proper proportions.

### 3. Card Layouts

Consistent card heights in grid layouts regardless of content.

### 4. Placeholder Content

Loading states and empty states with proper dimensions.

### 5. Responsive Design

Content that scales proportionally across different screen sizes.

## Usage Guidelines

1. **Choose appropriate ratios** based on content type and design requirements
2. **Use `object-cover`** for images to maintain aspect ratio without distortion
3. **Consider mobile viewports** when selecting aspect ratios
4. **Provide fallback content** for loading or error states
5. **Test accessibility** with screen readers and keyboard navigation
6. **Optimize images** for the display size to improve performance

## Browser Support

The component uses the CSS `aspect-ratio` property with fallback support:

- **Modern Browsers**: Native CSS aspect-ratio support
- **Legacy Browsers**: Fallback using padding-based ratio maintenance
- **IE11**: Not supported (requires CSS aspect-ratio or custom polyfill)
