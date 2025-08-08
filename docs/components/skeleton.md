# Skeleton Component

Beautiful loading placeholders for Angular applications with smooth animations, multiple variants, and accessibility-first design.

## Overview

The Skeleton component provides an elegant loading experience by showing placeholder content while actual data is being fetched. It includes multiple variants, animation types, and size options to match your design requirements perfectly.

## Features

- 🎭 **Smooth Animations** - Pulse, shimmer, and more animation types
- 🎨 **Flexible Variants** - Text, avatars, and custom shapes
- ♿ **Accessible** - Screen reader friendly with ARIA labels
- ⚡ **Lightweight** - Minimal bundle impact
- 🔧 **Customizable** - Easy theming and configuration
- 📱 **Responsive** - Works perfectly on all screen sizes

## Installation

Install the skeleton component using the Angular SuperUI CLI:

```bash
npx ngsui-cli add skeleton
```

## Quick Start

### Import the Component

```typescript
import { Component } from '@angular/core';
import { 
  SkeletonComponent,
  SkeletonText,
  SkeletonAvatar,
  SkeletonItem,
  SkeletonGroup,
  SkeletonService 
} from '@lib/skeleton';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    SkeletonComponent,
    SkeletonText,
    SkeletonAvatar,
    SkeletonItem,
    SkeletonGroup
  ],
  providers: [SkeletonService],
  template: `
    <SkeletonText width="full" height="20px" />
    <SkeletonText width="4/5" height="16px" />
    <SkeletonAvatar size="lg" />
  `
})
export class ExampleComponent {}
```

### Basic Usage

```html
<!-- Simple text skeleton -->
<SkeletonText width="full" height="20px" />
<SkeletonText width="4/5" height="16px" />

<!-- Avatar skeleton -->
<SkeletonAvatar size="lg" />

<!-- Custom shape skeleton -->
<SkeletonComponent width="full" height="200px" rounded="lg" />
```

## Components

### SkeletonText

Used for text content placeholders with customizable width and height.

#### SkeletonText Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| 'full' \| 'auto' \| '1/4' \| '1/3' \| '1/2' \| '2/3' \| '3/4' \| '4/5' \| '5/6'` | `'full'` | Width of the skeleton |
| `height` | `string` | `'16px'` | Height of the skeleton |
| `animation` | `'pulse' \| 'none'` | `'pulse'` | Animation type |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Border radius |

#### SkeletonText Examples

```html
<!-- Different widths -->
<SkeletonText width="full" height="20px" />
<SkeletonText width="4/5" height="16px" />
<SkeletonText width="1/2" height="16px" />
<SkeletonText width="5/6" height="16px" />

<!-- Different heights -->
<SkeletonText width="5/6" height="12px" />
<SkeletonText width="4/5" height="14px" />
<SkeletonText width="4/5" height="16px" />
<SkeletonText width="3/4" height="20px" />
<SkeletonText width="2/3" height="24px" />

<!-- With animations -->
<SkeletonText width="full" height="20px" animation="pulse" />
<SkeletonText width="4/5" height="16px" animation="none" />
```

### SkeletonAvatar

Circular or rounded avatar placeholders for user profile images.

#### SkeletonAvatar Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Size of the avatar |
| `animation` | `'pulse' \| 'none'` | `'pulse'` | Animation type |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'full'` | Border radius |

#### SkeletonAvatar Examples

```html
<!-- Different sizes -->
<SkeletonAvatar size="xs" />
<SkeletonAvatar size="sm" />
<SkeletonAvatar size="default" />
<SkeletonAvatar size="lg" />
<SkeletonAvatar size="xl" />

<!-- Avatar with text combination -->
<div class="flex items-center space-x-4">
  <SkeletonAvatar size="lg" />
  <div class="flex-1 flex flex-col gap-2">
    <SkeletonText width="1/3" height="16px" />
    <SkeletonText width="1/2" height="14px" />
  </div>
</div>
```

### SkeletonComponent

Generic skeleton component for custom shapes and layouts.

#### SkeletonComponent Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| 'full' \| 'auto' \| '1/4' \| '1/3' \| '1/2' \| '2/3' \| '3/4' \| '4/5' \| '5/6'` | `'full'` | Width of the skeleton |
| `height` | `string` | `'auto'` | Height of the skeleton |
| `animation` | `'pulse' \| 'none'` | `'pulse'` | Animation type |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Border radius |

#### SkeletonComponent Examples

```html
<!-- Image placeholder -->
<SkeletonComponent width="full" height="200px" rounded="lg" />

<!-- Circle shape -->
<SkeletonComponent width="md" height="60px" rounded="full" />

<!-- Button placeholder -->
<SkeletonComponent width="full" height="40px" rounded="md" />

<!-- Custom dimensions -->
<SkeletonComponent width="full" height="120px" rounded="lg" />
```

### SkeletonService

Service for managing global skeleton states and configurations.

#### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `setLoading(loading: boolean)` | `loading: boolean` | Set global loading state |
| `isLoading()` | - | Get current loading state |
| `setDefaultAnimation(animation: string)` | `animation: string` | Set default animation type |

#### Usage

```typescript
import { inject } from '@angular/core';
import { SkeletonService } from '@lib/skeleton';

export class MyComponent {
  private skeletonService = inject(SkeletonService);

  startLoading() {
    this.skeletonService.setLoading(true);
  }

  stopLoading() {
    this.skeletonService.setLoading(false);
  }

  checkLoadingState() {
    return this.skeletonService.isLoading();
  }
}
```

## Real-world Examples

### Article Card Layout

```html
<div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
  <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
    Article Card
  </h3>
  <div class="flex flex-col gap-4">
    <!-- Image placeholder -->
    <SkeletonComponent width="full" height="200px" rounded="lg" />

    <!-- Content -->
    <div class="flex flex-col gap-3">
      <SkeletonText width="5/6" height="24px" />
      <SkeletonText width="full" height="16px" />
      <SkeletonText width="4/5" height="16px" />
      <SkeletonText width="2/3" height="16px" />
    </div>

    <!-- Author info -->
    <div class="flex items-center space-x-3 pt-4">
      <SkeletonAvatar size="sm" />
      <div class="flex-1 flex flex-col gap-1">
        <SkeletonText width="1/3" height="14px" />
        <SkeletonText width="1/4" height="12px" />
      </div>
    </div>
  </div>
</div>
```

### User List Layout

```html
<div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
  <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
    User List
  </h3>
  <div class="flex flex-col gap-6">
    <div *ngFor="let item of Array(4).fill(0); let i = index"
         class="flex items-center space-x-4">
      <SkeletonAvatar [size]="i === 0 ? 'lg' : 'default'" />
      <div class="flex-1 flex flex-col gap-2">
        <SkeletonText [width]="getWidthForIndex(i, 60, 5)" height="16px" />
        <SkeletonText [width]="getWidthForIndex(i, 40, 3)" height="14px" />
        <SkeletonText *ngIf="i === 0" width="1/2" height="12px" />
      </div>
      <SkeletonComponent width="xl" height="32px" rounded="md" />
    </div>
  </div>
</div>
```

### Component with Dynamic Width Helper

```typescript
export class SkeletonDemoComponent {
  // Helper function to map dynamic width values to allowed types
  getWidthForIndex(index: number, baseWidth: number, decrement: number): 'full' | '5/6' | '4/5' | '3/4' | '2/3' | '1/2' | '1/3' | '1/4' {
    const calculatedWidth = baseWidth - (index * decrement);

    if (calculatedWidth >= 90) return 'full';
    if (calculatedWidth >= 75) return '5/6';
    if (calculatedWidth >= 65) return '4/5';
    if (calculatedWidth >= 55) return '3/4';
    if (calculatedWidth >= 45) return '2/3';
    if (calculatedWidth >= 35) return '1/2';
    if (calculatedWidth >= 25) return '1/3';
    return '1/4';
  }
}
```

## Animation Types

### Pulse Animation (Default)

The pulse animation creates a subtle breathing effect that draws attention without being distracting.

```html
<SkeletonText width="full" height="20px" animation="pulse" />
<SkeletonText width="4/5" height="16px" animation="pulse" />
<SkeletonText width="1/2" height="16px" animation="pulse" />
```

### Static (No Animation)

For cases where you want static placeholders without animation.

```html
<SkeletonText width="full" height="20px" animation="none" />
<SkeletonText width="4/5" height="16px" animation="none" />
<SkeletonText width="1/2" height="16px" animation="none" />
```

## Size Variants

### Width Options

The skeleton components support the following width values:

- **Fractional**: `1/4`, `1/3`, `1/2`, `2/3`, `3/4`, `4/5`, `5/6`
- **Fixed sizes**: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`
- **Special**: `full`, `auto`

### Height Options

Height can be specified as any valid CSS height value:

- **Pixels**: `12px`, `14px`, `16px`, `20px`, `24px`, etc.
- **Relative units**: `1rem`, `1.5rem`, `2rem`, etc.
- **Special**: `auto`

## Styling & Theming

### CSS Custom Properties

The skeleton components use CSS custom properties for easy theming:

```css
:root {
  --skeleton-base-color: #f3f4f6;
  --skeleton-shimmer-color: #e5e7eb;
  --skeleton-dark-base-color: #374151;
  --skeleton-dark-shimmer-color: #4b5563;
}
```

### Dark Mode Support

The component automatically adapts to dark mode using Tailwind CSS dark mode classes:

```html
<!-- Automatically switches between light and dark modes -->
<SkeletonText width="full" height="20px" />
```

### Custom Animation

You can add custom animations by extending the CSS:

```css
@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.skeleton-pulse {
  animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

## Accessibility

### Screen Reader Support

The skeleton components include proper ARIA labels and roles for screen reader compatibility:

```html
<SkeletonText 
  width="full" 
  height="20px" 
  aria-label="Loading content" 
  role="progressbar" 
/>
```

### Reduced Motion

The component respects the user's preference for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .skeleton-component {
    animation: none;
  }
}
```

## Performance

### Bundle Size

The skeleton component library is designed to be lightweight:

- **Gzipped**: ~2KB
- **Minified**: ~5KB
- **Tree-shakable**: Import only what you need

### Rendering Performance

- Uses CSS animations for optimal performance
- No JavaScript animations
- Minimal DOM manipulation
- Efficient re-rendering with OnPush change detection

## Best Practices

### 1. Match Content Structure

Design skeleton layouts that closely match your actual content structure:

```html
<!-- Good: Matches the actual content layout -->
<div class="flex items-center space-x-4">
  <SkeletonAvatar size="lg" />
  <div class="flex-1 flex flex-col gap-2">
    <SkeletonText width="1/3" height="16px" />
    <SkeletonText width="1/2" height="14px" />
  </div>
</div>

<!-- Avoid: Generic placeholders that don't match content -->
<SkeletonText width="full" height="100px" />
```

### 2. Use Appropriate Timing

Show skeletons for loading states that take longer than 200ms:

```typescript
export class DataComponent {
  isLoading = signal(true);

  loadData() {
    this.isLoading.set(true);
    
    this.dataService.getData().subscribe(data => {
      // Add small delay to prevent flashing for fast requests
      setTimeout(() => {
        this.isLoading.set(false);
      }, 200);
    });
  }
}
```

### 3. Progressive Loading

Show different skeleton states for progressive loading:

```html
<div *ngIf="isLoading()">
  <SkeletonText width="full" height="24px" />
  <SkeletonText width="4/5" height="16px" />
</div>

<div *ngIf="!isLoading() && !hasError()">
  <!-- Actual content -->
</div>

<div *ngIf="hasError()">
  <!-- Error state -->
</div>
```

### 4. Responsive Design

Ensure skeletons work well on all screen sizes:

```html
<div class="grid gap-8 lg:grid-cols-2">
  <div class="flex flex-col gap-4">
    <SkeletonComponent width="full" height="200px" rounded="lg" />
    <SkeletonText width="5/6" height="24px" />
    <SkeletonText width="full" height="16px" />
  </div>
</div>
```

## Troubleshooting

### Common Issues

#### 1. TypeScript Errors with Width Values

**Problem**: Getting type errors when using percentage or pixel values for width.

**Solution**: Use the predefined width types instead:

```typescript
// ❌ Wrong
<SkeletonText width="80%" height="16px" />
<SkeletonText width="200px" height="16px" />

// ✅ Correct
<SkeletonText width="4/5" height="16px" />
<SkeletonText width="xl" height="16px" />
```

#### 2. Animations Not Working

**Problem**: Skeleton animations are not visible.

**Solution**: Check for conflicting CSS or reduced motion preferences:

```css
/* Ensure animations are enabled */
.skeleton-component {
  animation: skeleton-pulse 2s ease-in-out infinite;
}

/* Check for reduced motion override */
@media (prefers-reduced-motion: reduce) {
  .skeleton-component {
    animation: none;
  }
}
```

#### 3. Layout Shifts

**Problem**: Content jumps when skeleton is replaced with actual content.

**Solution**: Ensure skeleton dimensions match actual content:

```html
<!-- Match the exact dimensions of your content -->
<SkeletonComponent width="full" height="200px" rounded="lg" />
<!-- Should match -->
<img class="w-full h-[200px] rounded-lg" src="actual-image.jpg" />
```

## API Reference

### Complete Type Definitions

```typescript
export interface SkeletonTextProps {
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full' | 'auto' | '1/4' | '1/3' | '1/2' | '2/3' | '3/4' | '4/5' | '5/6';
  height?: string;
  animation?: 'pulse' | 'none';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface SkeletonAvatarProps {
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  animation?: 'pulse' | 'none';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface SkeletonComponentProps {
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full' | 'auto' | '1/4' | '1/3' | '1/2' | '2/3' | '3/4' | '4/5' | '5/6';
  height?: string;
  animation?: 'pulse' | 'none';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

This component is part of Angular SuperUI and is licensed under the MIT License. See [LICENSE](../../LICENSE) for details.
