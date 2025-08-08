# Popover Component

An enterprise-grade floating content container with intelligent positioning using Angular CDK Portal. Perfect for tooltips, dropdowns, contextual information, and interactive overlays.

## Features

- 🎯 **Intelligent Positioning** - Enhanced collision detection with 30+ fallback positions for edge cases
- ⚡ **CDK Portal Architecture** - Professional positioning that escapes stacking contexts with improved viewport handling
- 🎨 **Multiple Variants** - Default, Success, Warning, Error, and Info styles
- 📏 **Flexible Sizing** - Small, Default, Large, and Extra Large options
- 🧭 **Directional Control** - Top, Right, Bottom, Left positioning with Start/Center/End alignment
- ♿ **Accessibility Ready** - ARIA attributes, keyboard navigation, and focus management
- 🎭 **Modal Support** - Optional modal behavior with backdrop
- ✨ **Beautiful Animations** - Smooth fade-in and zoom effects
- 🏹 **Arrow Indicators** - Optional arrow pointing to trigger element
- ⚙️ **Highly Configurable** - Extensive customization options
- 🔄 **Enhanced Edge Case Handling** - Improved corner positioning and viewport margin optimization

## Installation

Install the component using our CLI tool:

```bash
npx ngsui-cli add popover
```

This will automatically:
- Add the Popover component to your project
- Update your `app.config.ts` with required providers
- Install necessary dependencies
- Configure Tailwind CSS classes

## Basic Usage

```typescript
import { Component, signal, ElementRef, ViewChild } from '@angular/core';
import { Popover } from '@angular-superui/lib';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Popover],
  template: `
    <button 
      #trigger
      (click)="isOpen.set(!isOpen())"
      class="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      {{ isOpen() ? 'Close' : 'Open' }} Popover
    </button>

    <Popover
      [isOpen]="isOpen()"
      [triggerElement]="trigger"
      (openChange)="isOpen.set($event)"
    >
      <div>
        <h3 class="font-semibold mb-2">Welcome!</h3>
        <p class="text-sm">This is a basic popover with default settings.</p>
      </div>
    </Popover>
  `
})
export class ExampleComponent {
  readonly isOpen = signal(false);
}
```

## Advanced Examples

### Positioning and Alignment

```typescript
@Component({
  template: `
    <!-- Top positioned -->
    <Popover
      [isOpen]="topOpen()"
      [triggerElement]="topTrigger"
      side="top"
      align="center"
    >
      <div>Top popover content</div>
    </Popover>

    <!-- Right positioned with start alignment -->
    <Popover
      [isOpen]="rightOpen()"
      [triggerElement]="rightTrigger"
      side="right"
      align="start"
    >
      <div>Right aligned to start</div>
    </Popover>
  `
})
export class PositioningExample {}
```

### Visual Variants

```typescript
@Component({
  template: `
    <!-- Success variant -->
    <Popover
      [isOpen]="successOpen()"
      [triggerElement]="successTrigger"
      variant="success"
    >
      <div>
        <h3>Success!</h3>
        <p>Operation completed successfully.</p>
      </div>
    </Popover>

    <!-- Error variant -->
    <Popover
      [isOpen]="errorOpen()"
      [triggerElement]="errorTrigger"
      variant="error"
    >
      <div>
        <h3>Error</h3>
        <p>Something went wrong.</p>
      </div>
    </Popover>
  `
})
export class VariantsExample {}
```

### Different Sizes

```typescript
@Component({
  template: `
    <!-- Small popover -->
    <Popover
      [isOpen]="smallOpen()"
      [triggerElement]="smallTrigger"
      size="sm"
    >
      <div>Small popover content</div>
    </Popover>

    <!-- Large popover -->
    <Popover
      [isOpen]="largeOpen()"
      [triggerElement]="largeTrigger"
      size="lg"
    >
      <div>
        <h3>Large Popover</h3>
        <p>More space for detailed content.</p>
      </div>
    </Popover>
  `
})
export class SizesExample {}
```

### Modal Behavior with Backdrop

```typescript
@Component({
  template: `
    <Popover
      [isOpen]="modalOpen()"
      [triggerElement]="modalTrigger"
      [modal]="true"
      [showBackdrop]="true"
      [showCloseButton]="true"
    >
      <div>
        <h3>Modal Popover</h3>
        <p>This popover behaves like a modal with backdrop.</p>
      </div>
    </Popover>
  `
})
export class ModalExample {}
```

### Form in Popover

```typescript
@Component({
  template: `
    <Popover
      [isOpen]="formOpen()"
      [triggerElement]="formTrigger"
      size="lg"
      [showCloseButton]="true"
    >
      <form (ngSubmit)="handleSubmit()">
        <h3 class="font-semibold mb-4">Contact Form</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Name</label>
            <input 
              type="text" 
              class="w-full px-3 py-2 border rounded-lg"
              placeholder="Your name"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              class="w-full px-3 py-2 border rounded-lg"
              placeholder="your@email.com"
            >
          </div>
          
          <div class="flex gap-2">
            <button 
              type="submit"
              class="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg"
            >
              Send
            </button>
            <button 
              type="button"
              (click)="formOpen.set(false)"
              class="px-3 py-2 border rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </Popover>
  `
})
export class FormExample {
  readonly formOpen = signal(false);
  
  handleSubmit() {
    // Handle form submission
    this.formOpen.set(false);
  }
}
```

### Custom Styling

```typescript
@Component({
  template: `
    <Popover
      [isOpen]="customOpen()"
      [triggerElement]="customTrigger"
      customClass="border-2 border-purple-500 shadow-2xl"
      [showArrow]="false"
    >
      <div class="text-center">
        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <h3 class="font-semibold text-purple-900">Premium Feature</h3>
        <p class="text-sm text-purple-700">Unlock advanced capabilities</p>
      </div>
    </Popover>
  `
})
export class CustomStylingExample {}
```

## Configuration Options

Here's a comprehensive overview of all configuration options for the Popover component, organized by complexity and use case:

### Essential Configuration (Beginner-Friendly)

| Option | Type | Default | Difficulty | Description | Example |
|--------|------|---------|------------|-------------|---------|
| `isOpen` | `boolean` | `false` | 🟢 Easy | Controls popover visibility | `[isOpen]="showPopover()"` |
| `triggerElement` | `ElementRef \| HTMLElement` | Required | 🟢 Easy | Element that triggers the popover | `[triggerElement]="buttonRef"` |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | 🟢 Easy | Preferred placement side | `side="top"` |
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | 🟢 Easy | Popover size variant | `size="lg"` |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | 🟢 Easy | Color theme variant | `variant="success"` |

### Positioning Configuration (Intermediate)

| Option | Type | Default | Difficulty | Description | Example |
|--------|------|---------|------------|-------------|---------|
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | 🟡 Medium | Alignment along the chosen side | `align="start"` |
| `offset` | `number` | `8` | 🟡 Medium | Distance from trigger in pixels | `[offset]="12"` |
| `avoidCollisions` | `boolean` | `true` | 🟡 Medium | Enable intelligent repositioning | `[avoidCollisions]="false"` |

### Visual Enhancement (Intermediate)

| Option | Type | Default | Difficulty | Description | Example |
|--------|------|---------|------------|-------------|---------|
| `showArrow` | `boolean` | `true` | 🟡 Medium | Display pointing arrow | `[showArrow]="false"` |
| `showCloseButton` | `boolean` | `false` | 🟡 Medium | Add close button in corner | `[showCloseButton]="true"` |
| `class` | `string` | `''` | 🟡 Medium | Custom CSS classes | `class="custom-popover"` |

### Modal & Backdrop Behavior (Advanced)

| Option | Type | Default | Difficulty | Description | Example |
|--------|------|---------|------------|-------------|---------|
| `modal` | `boolean` | `false` | 🔴 Advanced | Modal behavior with backdrop | `[modal]="true"` |
| `showBackdrop` | `boolean` | `false` | 🔴 Advanced | Show backdrop without modal | `[showBackdrop]="true"` |

### Accessibility Configuration (Advanced)

| Option | Type | Default | Difficulty | Description | Example |
|--------|------|---------|------------|-------------|---------|
| `ariaLabelledby` | `string` | `''` | 🔴 Advanced | ARIA labelledby attribute | `ariaLabelledby="heading-id"` |
| `ariaDescribedby` | `string` | `''` | 🔴 Advanced | ARIA describedby attribute | `ariaDescribedby="desc-id"` |

### Event Handling

| Event | Type | Difficulty | Description | Example |
|-------|------|------------|-------------|---------|
| `openChange` | `boolean` | 🟢 Easy | Emitted when open state changes | `(openChange)="handleChange($event)"` |

### Configuration Difficulty Legend

- 🟢 **Easy**: Simple properties that work out of the box
- 🟡 **Medium**: Requires understanding of positioning/styling concepts
- 🔴 **Advanced**: Requires knowledge of accessibility, modal patterns, or complex interactions

### Common Configuration Patterns

#### 1. Simple Tooltip (Easiest)
```typescript
<Popover 
  [isOpen]="tooltipOpen()" 
  [triggerElement]="trigger"
  size="sm"
>
  <p>Simple tooltip content</p>
</Popover>
```

#### 2. Dropdown Menu (Easy)
```typescript
<Popover 
  [isOpen]="menuOpen()" 
  [triggerElement]="trigger"
  side="bottom"
  align="start"
  size="default"
>
  <div>Menu items here</div>
</Popover>
```

#### 3. Modal Dialog (Medium)
```typescript
<Popover 
  [isOpen]="dialogOpen()" 
  [triggerElement]="trigger"
  [modal]="true"
  [showCloseButton]="true"
  size="lg"
>
  <div>Modal content</div>
</Popover>
```

#### 4. Form Validation Popover (Medium)
```typescript
<Popover 
  [isOpen]="hasError()" 
  [triggerElement]="inputRef"
  variant="error"
  side="bottom"
  align="start"
  [showArrow]="true"
>
  <p>{{ errorMessage() }}</p>
</Popover>
```

#### 5. Complex Interactive Content (Advanced)
```typescript
<Popover 
  [isOpen]="advancedOpen()" 
  [triggerElement]="trigger"
  side="right"
  size="xl"
  [modal]="true"
  [showCloseButton]="true"
  [avoidCollisions]="true"
  ariaLabelledby="popover-title"
  ariaDescribedby="popover-desc"
  class="custom-advanced-popover"
>
  <div>
    <h3 id="popover-title">Advanced Content</h3>
    <p id="popover-desc">Complex interactive content here</p>
  </div>
</Popover>
```

## API Reference

### Popover Component

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Controls the open/closed state of the popover |
| `triggerElement` | `ElementRef<HTMLElement> \| HTMLElement` | **Required** | The element that triggers the popover |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Preferred side for popover placement |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment along the chosen side |
| `offset` | `number` | `8` | Distance in pixels from the trigger element |
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Size variant of the popover |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Color variant of the popover |
| `showArrow` | `boolean` | `true` | Whether to show the arrow pointing to trigger |
| `showCloseButton` | `boolean` | `false` | Whether to show a close button in top-right corner |
| `modal` | `boolean` | `false` | Whether popover behaves as a modal with backdrop |
| `showBackdrop` | `boolean` | `false` | Whether to show a backdrop (auto-enabled for modal) |
| `avoidCollisions` | `boolean` | `true` | Whether to use intelligent collision detection |
| `class` | `string` | `''` | Additional CSS classes for the popover |
| `ariaLabelledby` | `string` | `''` | ARIA labelledby attribute for accessibility |
| `ariaDescribedby` | `string` | `''` | ARIA describedby attribute for accessibility |

#### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `openChange` | `boolean` | Emitted when the popover open state changes |

### Types

```typescript
type PopoverSide = 'top' | 'right' | 'bottom' | 'left';
type PopoverAlign = 'start' | 'center' | 'end';

interface PopoverPosition {
  x: number;
  y: number;
  side: PopoverSide;
  align: PopoverAlign;
}
```

## Styling Guide

### CSS Custom Properties

The component uses Tailwind CSS classes and CSS custom properties for theming:

```css
/* Light mode colors */
--popover-background: theme('colors.white');
--popover-border: theme('colors.gray.200');
--popover-text: theme('colors.gray.900');

/* Dark mode colors */
.dark {
  --popover-background: theme('colors.gray.800');
  --popover-border: theme('colors.gray.700');
  --popover-text: theme('colors.gray.100');
}
```

### Size Variants

| Size | Min Width | Max Width | Padding | Use Case |
|------|-----------|-----------|---------|----------|
| `sm` | 200px | 250px | 8px | Brief messages, tooltips |
| `default` | 250px | 320px | 16px | Standard content |
| `lg` | 300px | 400px | 24px | Detailed content, forms |
| `xl` | 350px | 500px | 32px | Complex layouts, rich content |

### Animation Classes

The component includes CSS animations for smooth transitions:

- **Fade animations**: `fade-in-0`, `fade-out-0`
- **Scale animations**: `zoom-in-95`, `zoom-out-95`
- **Slide animations**: Based on positioning side

## Accessibility

### ARIA Support

- **Roles**: `dialog`, `tooltip`, or custom role
- **Labels**: `aria-labelledby`, `aria-describedby`
- **States**: `aria-modal` for modal behavior
- **Hidden**: `aria-hidden` for decorative elements

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Escape` | Closes the popover (if enabled) |
| `Tab` | Moves focus within popover content |
| `Shift + Tab` | Moves focus backward within popover |

### Screen Reader Support

- Announces when popover opens/closes
- Provides clear content structure
- Supports navigation landmarks
- Includes descriptive labels for interactive elements

## Best Practices

### Do's ✅

- **Use appropriate variants** for different message types
- **Provide clear trigger elements** with descriptive labels
- **Keep content concise** and scannable
- **Test with screen readers** to ensure accessibility
- **Use consistent positioning** throughout your application
- **Handle edge cases** like viewport boundaries
- **Provide fallback content** for important information

### Don'ts ❌

- **Don't overuse popovers** - they can be disruptive
- **Don't nest popovers** - it creates poor UX
- **Don't put critical actions** in dismissible popovers
- **Don't make content too wide** on mobile devices
- **Don't forget keyboard navigation** support
- **Don't use without proper trigger elements**
- **Don't disable dismissal** without good reason

### Performance Tips

1. **Lazy load content** for complex popovers
2. **Use signals** for reactive state management
3. **Debounce position updates** for scroll events
4. **Clean up event listeners** properly
5. **Minimize DOM manipulations** during animations

## Mobile Considerations

### Touch Interactions

- **Larger touch targets** (minimum 44px)
- **Touch-friendly spacing** between interactive elements
- **Swipe gestures** for dismissal (when appropriate)
- **Responsive positioning** that adapts to screen size

### Responsive Behavior

- **Full-width on small screens** for better readability
- **Adjusted positioning** to prevent overflow
- **Backdrop support** for modal behavior on mobile
- **Accessible close buttons** for touch interfaces

## Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Safari**: 14+
- **Chrome Mobile**: 90+

## Troubleshooting

### Common Issues

#### Edge case positioning problems (Fixed in v2.0.1)

The component now includes enhanced edge case handling with improved viewport margin optimization and corner-specific positioning strategies. If you're experiencing positioning issues:

```typescript
// Enhanced collision avoidance is now enabled by default
<Popover
  [avoidCollisions]="true" // Default: true
  [triggerElement]="cornerTrigger"
  side="bottom"
  align="start"
>
  <div>Content automatically repositions near edges</div>
</Popover>
```

**What's improved:**
- 30+ fallback positions for comprehensive edge case coverage
- Enhanced viewport margin handling (16px default)
- Corner-specific optimization for top-left, top-right, bottom-left, bottom-right
- Better collision detection for small viewports
- Flexible dimensions and growth after open

#### Popover doesn't position correctly
```typescript
// Ensure trigger element exists and has proper dimensions
@Component({
  template: `
    <button 
      #trigger
      class="px-4 py-2" // Ensure proper dimensions
    >
      Trigger
    </button>
  `
})
```

#### Content gets cut off
```typescript
// Use appropriate size variant or custom classes
<Popover
  size="lg" // Use larger size
  customClass="max-w-sm" // Or custom max-width
>
```

#### Accessibility issues
```typescript
// Provide proper ARIA labels
<Popover
  role="dialog"
  ariaLabelledBy="popover-title"
  ariaDescribedBy="popover-description"
>
  <div>
    <h3 id="popover-title">Title</h3>
    <p id="popover-description">Description</p>
  </div>
</Popover>
```

#### Animation performance
```css
/* Optimize animations for better performance */
.popover-content {
  will-change: transform, opacity;
  transform: translateZ(0); /* Force hardware acceleration */
}
```

### Debug Mode

Enable debug mode to see positioning calculations:

```typescript
@Component({
  template: `
    <Popover
      [isOpen]="isOpen()"
      [triggerElement]="trigger"
      (positionChange)="logPosition($event)"
    >
      <div>Debug content</div>
    </Popover>
  `
})
export class DebugExample {
  logPosition(position: PopoverPosition) {
    console.log('Popover position:', position);
  }
}
```

## Changelog

### Version 1.0.0
- ✨ Initial release with core functionality
- 🎯 Intelligent positioning system
- ♿ Comprehensive accessibility support
- 🎨 Visual variants and sizing options
- 📱 Mobile optimization
- 🌙 Dark mode support

---

## Related Components

- **[Tooltip](./tooltip.md)** - Simple text overlays
- **[Dialog](./dialog.md)** - Modal dialogs and overlays
- **[Dropdown Menu](./dropdown-menu.md)** - Action menus
- **[Context Menu](./context-menu.md)** - Right-click menus

For more information and live examples, visit our [documentation site](https://angular-superui.com).
