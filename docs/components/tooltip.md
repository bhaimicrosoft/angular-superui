# Tooltip Component

An intelligent tooltip system for Angular applications with CDK overlay-powered positioning, multiple trigger types, customizable variants, and comprehensive accessibility support.

## Overview

The Tooltip component provides a sophisticated overlay system built on Angular CDK that's perfect for displaying contextual information, help text, and interactive content. Built with modern Angular signals and Angular CDK's intelligent positioning system, it offers excellent performance, enterprise-grade positioning, and superior user experience.

## ✨ Key Features

- **🧠 CDK Overlay Positioning**: Angular CDK's FlexibleConnectedPositionStrategy with automatic collision detection
- **🎯 Smart Fallbacks**: 12 position options with intelligent fallback positioning
- **🔄 Multiple Triggers**: Hover, click, focus, and manual trigger modes
- **🎨 Rich Variants**: 7 beautiful color variants for different use cases
- **📏 Size Options**: Small, medium, and large sizes for different contexts
- **⚡ Signal-Based**: Built with Angular signals for optimal performance
- **🖱️ Interactive Mode**: Tooltips that stay open when hovered for interactive content
- **⏱️ Configurable Delays**: Customizable show and hide delays for better UX
- **🎭 Smooth Animations**: Elegant fade and scale animations with proper timing
- **♿ Fully Accessible**: WCAG compliant with proper ARIA support and keyboard navigation
- **🎨 Customizable**: Custom styling, arrow control, and template support
- **📱 Responsive**: Mobile-friendly with touch interaction support
- **🔧 Developer Friendly**: Simple directive-based API with programmatic control
- **🏢 Enterprise-Ready**: Built on Angular CDK for production applications

## 📦 Installation

The Tooltip component is part of the Angular SuperUI library. Install it using the CLI:

```bash
npx ngsui-cli add tooltip
```

### Dependencies

The tooltip component requires Angular CDK for overlay functionality:

```bash
# CDK is automatically installed with Angular SuperUI
npm install @angular/cdk

# Or install manually if needed
ng add @angular/cdk
```

### Required Imports

```typescript
// The CLI automatically adds these imports
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  imports: [
    OverlayModule,
    PortalModule,
    // ... other imports
  ]
})
export class AppModule {}
```

## 🚀 Basic Usage

### 1. Import and Setup

```typescript
import { TooltipDirective } from '@lib/tooltip';

@Component({
  standalone: true,
  imports: [TooltipDirective],
  template: `
    <!-- Use tooltip directive on any element -->
    <button tooltip="This is a helpful tooltip!">
      Hover me
    </button>
  `
})
export class MyComponent {}
```

### 2. Simple Integration

No global container needed! The tooltip system uses Angular CDK overlays for automatic positioning:

```html
<!-- Simple text tooltip -->
<button tooltip="Save your changes">
  Save
</button>

<!-- Tooltip with custom position -->
<button 
  tooltip="This appears below the button"
  tooltipPosition="bottom">
  Click me
</button>

<!-- Tooltip with click trigger -->
<button 
  tooltip="Click again to hide"
  tooltipTrigger="click">
  Toggle tooltip
</button>
```

## �️ Architecture & CDK Integration

### Angular CDK Overlay System

The tooltip component leverages Angular CDK's powerful overlay system for enterprise-grade positioning:

```typescript
// CDK features used internally:
- FlexibleConnectedPositionStrategy: Smart positioning with fallbacks
- ComponentPortal: Dynamic tooltip component creation
- OverlayRef: Lifecycle management and DOM attachment
- ConnectedPosition: Precise position calculations
- Viewport collision detection: Automatic repositioning
```

### Position Strategy

The tooltip automatically handles complex positioning scenarios:

```typescript
// Position fallback order example for 'top' position:
const positions = [
  { position: 'top', primary: true },      // Preferred
  { position: 'bottom', fallback: true }, // If no space above
  { position: 'left', fallback: true },   // If no space above/below
  { position: 'right', fallback: true }   // Last resort
];
```

### No Global Container Required

Unlike traditional tooltip implementations, this CDK-based system:

- ✅ **No global container needed** - CDK overlays are managed automatically
- ✅ **Automatic z-index management** - CDK handles layering
- ✅ **Viewport collision detection** - Smart repositioning
- ✅ **Scroll strategy handling** - Repositions on scroll
- ✅ **Focus trap support** - For interactive tooltips
- ✅ **Portal-based rendering** - Clean DOM structure

### Performance Benefits

```typescript
// CDK overlay advantages:
- Component reuse: Tooltip components are recycled
- Efficient positioning: Native browser APIs used
- Memory management: Automatic cleanup on destroy
- Event optimization: Minimal DOM listeners
- Change detection: OnPush strategy supported
```

## �🎛️ Advanced Configuration

### Position Options

```html
<!-- Top positions -->
<button tooltip="Top start" tooltipPosition="top-start">Top Start</button>
<button tooltip="Top center" tooltipPosition="top">Top</button>
<button tooltip="Top end" tooltipPosition="top-end">Top End</button>

<!-- Bottom positions -->
<button tooltip="Bottom start" tooltipPosition="bottom-start">Bottom Start</button>
<button tooltip="Bottom center" tooltipPosition="bottom">Bottom</button>
<button tooltip="Bottom end" tooltipPosition="bottom-end">Bottom End</button>

<!-- Left positions -->
<button tooltip="Left start" tooltipPosition="left-start">Left Start</button>
<button tooltip="Left center" tooltipPosition="left">Left</button>
<button tooltip="Left end" tooltipPosition="left-end">Left End</button>

<!-- Right positions -->
<button tooltip="Right start" tooltipPosition="right-start">Right Start</button>
<button tooltip="Right center" tooltipPosition="right">Right</button>
<button tooltip="Right end" tooltipPosition="right-end">Right End</button>
```

### Trigger Types

```html
<!-- Hover trigger (default) -->
<button tooltip="Appears on hover" tooltipTrigger="hover">
  Hover me
</button>

<!-- Click trigger -->
<button tooltip="Toggle on click" tooltipTrigger="click">
  Click me
</button>

<!-- Focus trigger (great for inputs) -->
<input 
  type="text" 
  tooltip="Help text for this field"
  tooltipTrigger="focus"
  placeholder="Focus me">

<!-- Manual control -->
<button #manualTarget (click)="toggleTooltip(manualTarget)">
  Manual control
</button>
```

### Variants and Styling

```html
<!-- Color variants -->
<button tooltip="Default variant" tooltipVariant="default">Default</button>
<button tooltip="Light variant" tooltipVariant="light">Light</button>
<button tooltip="Success message" tooltipVariant="success">Success</button>
<button tooltip="Warning notice" tooltipVariant="warning">Warning</button>
<button tooltip="Error message" tooltipVariant="error">Error</button>
<button tooltip="Information" tooltipVariant="info">Info</button>
<button tooltip="Dark variant" tooltipVariant="dark">Dark</button>

<!-- Size options -->
<button tooltip="Small tooltip" tooltipSize="sm">Small</button>
<button tooltip="Medium tooltip" tooltipSize="md">Medium</button>
<button tooltip="Large tooltip" tooltipSize="lg">Large</button>
```

### Timing and Delays

```html
<!-- Custom delays -->
<button 
  tooltip="Quick tooltip"
  [tooltipShowDelay]="100"
  [tooltipHideDelay]="50">
  Quick response
</button>

<!-- Slow tooltip for careful interactions -->
<button 
  tooltip="Deliberate tooltip"
  [tooltipShowDelay]="800"
  [tooltipHideDelay]="300">
  Slow and steady
</button>
```

### Interactive Tooltips

```html
<!-- Interactive tooltip that stays open when hovered -->
<button 
  tooltip="This tooltip stays open when you hover over it! You can interact with the tooltip content."
  [tooltipInteractive]="true"
  tooltipTrigger="hover"
  [tooltipHideDelay]="300">
  Interactive tooltip
</button>
```

### Custom Styling

```html
<!-- Custom CSS classes -->
<button 
  tooltip="Custom styled tooltip"
  tooltipClass="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none shadow-xl"
  [tooltipShowArrow]="false">
  Custom style
</button>

<!-- Disabled state -->
<button 
  tooltip="This won't show"
  [tooltipDisabled]="true">
  Disabled tooltip
</button>

<!-- Without arrow -->
<button 
  tooltip="Clean tooltip without arrow"
  [tooltipShowArrow]="false">
  No arrow
</button>
```

## 🎨 Component API

### TooltipDirective Inputs

```typescript
interface TooltipDirectiveInputs {
  // Content
  tooltip: string | TemplateRef<any>;          // Tooltip content
  
  // Positioning
  tooltipPosition: TooltipPosition;             // Where to show tooltip
  tooltipOffset: number;                        // Distance from target (default: 8)
  
  // Triggers
  tooltipTrigger: TooltipTrigger;              // How to trigger tooltip
  tooltipShowDelay: number;                     // Delay before showing (default: 300)
  tooltipHideDelay: number;                     // Delay before hiding (default: 100)
  
  // Appearance
  tooltipVariant: TooltipVariant;              // Color variant
  tooltipSize: TooltipSize;                    // Size variant
  tooltipShowArrow: boolean;                   // Show/hide arrow (default: true)
  
  // Behavior
  tooltipDisabled: boolean;                    // Disable tooltip (default: false)
  tooltipInteractive: boolean;                 // Keep open when hovered (default: false)
  tooltipMaxWidth: string;                     // Max width (default: '320px')
  tooltipAnimation: boolean;                   // Enable animations (default: true)
  
  // Styling
  tooltipClass: string;                        // Custom CSS classes
}
```

### Type Definitions

```typescript
type TooltipPosition = 
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'  
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';

type TooltipVariant = 'default' | 'dark' | 'light' | 'success' | 'warning' | 'error' | 'info';

type TooltipSize = 'sm' | 'md' | 'lg';
```

### TooltipDirective Outputs

```typescript
interface TooltipDirectiveOutputs {
  tooltipShow: EventEmitter<string>;          // Emitted when tooltip shows
  tooltipHide: EventEmitter<string>;          // Emitted when tooltip hides
}
```

### TooltipDirective Methods

```typescript
class TooltipDirective {
  show(): void;                               // Show tooltip manually
  hide(): void;                               // Hide tooltip manually
  toggle(): void;                             // Toggle tooltip visibility
  updateContent(content: string | TemplateRef<any>): void; // Update content
}
```

## 🔧 Programmatic Control

### Using TooltipService

```typescript
import { TooltipService } from '@lib/tooltip';

@Component({
  // ...
})
export class MyComponent {
  private tooltipService = inject(TooltipService);
  
  showCustomTooltip(element: HTMLElement) {
    const tooltipId = this.tooltipService.show(element, {
      content: 'Programmatically created tooltip',
      position: 'top',
      variant: 'success',
      trigger: 'manual'
    });
    
    // Hide after 3 seconds
    setTimeout(() => {
      this.tooltipService.hide(tooltipId);
    }, 3000);
  }
  
  hideAllTooltips() {
    this.tooltipService.hideAll();
  }
  
  updateTooltipContent(tooltipId: string) {
    this.tooltipService.updateContent(tooltipId, 'Updated content!');
  }
  
  // CDK overlay gives you access to active tooltip states
  getActiveTooltipCount() {
    return this.tooltipService.getActiveTooltips().size;
  }
}
```

### TooltipService API

```typescript
interface TooltipService {
  // Show tooltip with CDK overlay
  show(element: HTMLElement, config: Partial<TooltipConfig>): string;
  
  // Hide specific tooltip
  hide(id: string): void;
  
  // Hide all active tooltips
  hideAll(): void;
  
  // Update content dynamically
  updateContent(id: string, content: string | TemplateRef<any>): void;
  
  // Check visibility state
  isVisible(id: string): boolean;
  
  // Get active tooltip registry (CDK overlay refs included)
  getActiveTooltips(): Map<string, TooltipState>;
}

interface TooltipState {
  id: string;
  isVisible: boolean;
  triggerElement: HTMLElement;
  config: Required<TooltipConfig>;
  overlayRef?: OverlayRef;        // CDK overlay reference
  actualPosition: TooltipPosition; // Final calculated position
}
```

## 🎭 Advanced Examples

### Form Field Help

```html
<div class="form-field">
  <label for="email">Email Address</label>
  <input 
    id="email"
    type="email"
    tooltip="Enter a valid email address. We'll never share your email with anyone."
    tooltipTrigger="focus"
    tooltipPosition="bottom"
    tooltipVariant="info"
    class="form-input">
</div>
```

### Interactive Rich Content

```typescript
@Component({
  template: `
    <button 
      [tooltip]="richContentTemplate"
      tooltipTrigger="click"
      [tooltipInteractive]="true"
      tooltipPosition="bottom"
      tooltipClass="p-0 bg-transparent border-none shadow-2xl">
      Show rich content
    </button>
    
    <ng-template #richContentTemplate>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-xl border">
        <h3 class="font-semibold mb-2">Rich Tooltip Content</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
          This tooltip contains interactive content!
        </p>
        <button class="px-3 py-1 bg-blue-500 text-white rounded text-sm">
          Click me
        </button>
      </div>
    </ng-template>
  `
})
export class RichTooltipComponent {}
```

### Conditional Tooltips

```typescript
@Component({
  template: `
    <button 
      [tooltip]="getTooltipText()"
      [tooltipDisabled]="!showHelp"
      [tooltipVariant]="getTooltipVariant()">
      {{ buttonText }}
    </button>
  `
})
export class ConditionalTooltipComponent {
  @Input() showHelp = true;
  @Input() status: 'success' | 'error' | 'warning' = 'success';
  
  get buttonText() {
    return this.status === 'success' ? 'Save' : 'Fix Errors';
  }
  
  getTooltipText() {
    switch (this.status) {
      case 'success': return 'Save your changes';
      case 'error': return 'Please fix errors before saving';
      case 'warning': return 'Review warnings before proceeding';
      default: return '';
    }
  }
  
  getTooltipVariant(): TooltipVariant {
    return this.status;
  }
}
```

### Tooltip with Loading States

```typescript
@Component({
  template: `
    <button 
      [tooltip]="isLoading ? 'Loading...' : 'Click to refresh'"
      [tooltipVariant]="isLoading ? 'info' : 'default'"
      [tooltipDisabled]="isLoading"
      (click)="refresh()">
      {{ isLoading ? 'Loading...' : 'Refresh' }}
    </button>
  `
})
export class LoadingTooltipComponent {
  isLoading = false;
  
  async refresh() {
    this.isLoading = true;
    try {
      await this.dataService.refresh();
    } finally {
      this.isLoading = false;
    }
  }
}
```

## ♿ Accessibility Features

The Tooltip component is built with accessibility in mind:

- **ARIA Support**: Proper `aria-describedby` and `role` attributes
- **Keyboard Navigation**: Full keyboard support for all trigger types
- **Screen Reader Support**: Announced properly to assistive technologies
- **Focus Management**: Proper focus handling for interactive tooltips
- **High Contrast**: Compatible with high contrast modes
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

### ARIA Implementation

```html
<!-- Generated tooltip markup -->
<div 
  role="tooltip"
  id="tooltip-123"
  aria-live="polite"
  class="tooltip">
  Tooltip content
</div>

<!-- Target element with proper ARIA -->
<button aria-describedby="tooltip-123">
  Button with tooltip
</button>
```

### Keyboard Accessibility

- **Tab**: Navigate to focusable elements with focus-triggered tooltips
- **Escape**: Hide currently visible tooltip
- **Space/Enter**: Activate click-triggered tooltips on buttons
- **Focus**: Show tooltip on inputs and form elements

## 🎯 Best Practices

### 1. Content Guidelines

```html
<!-- Good: Clear, concise, helpful -->
<button tooltip="Save your changes to the draft">Save Draft</button>

<!-- Avoid: Redundant or obvious information -->
<button tooltip="Click this button">Click Here</button>
```

### 2. Position Strategy

```html
<!-- Good: Consider layout and user flow -->
<div class="toolbar">
  <button tooltip="Bold text" tooltipPosition="bottom">B</button>
  <button tooltip="Italic text" tooltipPosition="bottom">I</button>
</div>

<!-- Avoid: Inconsistent positioning -->
<button tooltip="Save" tooltipPosition="top">Save</button>
<button tooltip="Cancel" tooltipPosition="left">Cancel</button>
```

### 3. Trigger Selection

```html
<!-- Good: Hover for quick help -->
<span tooltip="Your current balance" tooltipTrigger="hover">$1,234.56</span>

<!-- Good: Focus for form help -->
<input tooltip="Enter your full legal name" tooltipTrigger="focus">

<!-- Good: Click for detailed info -->
<button tooltip="Advanced search options available" tooltipTrigger="click">
  Search Options
</button>
```

### 4. Performance Optimization

```typescript
// Good: Reuse tooltip configurations
const FORM_TOOLTIP_CONFIG = {
  trigger: 'focus' as const,
  position: 'bottom' as const,
  variant: 'info' as const,
  showDelay: 200
};

// Good: Conditionally enable tooltips
<button 
  [tooltip]="showHelpText ? helpText : ''"
  [tooltipDisabled]="!showHelpText">
  Action
</button>
```

## 🎨 Styling and Theming

### CSS Custom Properties

```css
.tooltip {
  --tooltip-bg: theme('colors.gray.900');
  --tooltip-text: theme('colors.white');
  --tooltip-border: theme('colors.gray.700');
  --tooltip-shadow: theme('boxShadow.lg');
  --tooltip-border-radius: theme('borderRadius.lg');
  --tooltip-padding: theme('spacing.3');
  --tooltip-font-size: theme('fontSize.sm');
  --tooltip-max-width: 320px;
  --tooltip-z-index: 9999;
  
  /* Animation properties */
  --tooltip-transition-duration: 200ms;
  --tooltip-transition-timing: ease-in-out;
}

/* Dark mode */
.dark .tooltip {
  --tooltip-bg: theme('colors.gray.800');
  --tooltip-border: theme('colors.gray.600');
}
```

### Custom Variant

```css
/* Custom tooltip variant */
.tooltip-custom {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.tooltip-custom::before {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}
```

### Responsive Styling

```css
/* Mobile-specific tooltip styles */
@media (max-width: 768px) {
  .tooltip {
    --tooltip-max-width: 250px;
    --tooltip-font-size: theme('fontSize.xs');
    --tooltip-padding: theme('spacing.2');
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .tooltip {
    --tooltip-border-width: 2px;
    border: var(--tooltip-border-width) solid currentColor;
  }
}
```

## 🔍 Troubleshooting

### Common Issues

1. **Tooltip not appearing**

   ```html
   <!-- Check if tooltip content is provided -->
   <button tooltip="Text" [tooltipDisabled]="false">Button</button>
   
   <!-- Verify CDK overlay dependencies are installed -->
   <!-- npm install @angular/cdk -->
   ```

2. **Position issues**

   ```css
   /* CDK overlays use proper z-index automatically */
   /* No manual z-index configuration needed */
   .cdk-overlay-container {
     z-index: 1000; /* Default CDK z-index */
   }
   ```

3. **Animation problems**

   ```html
   <!-- Check if animations are enabled -->
   <button [tooltipAnimation]="true" tooltip="Text">Button</button>
   ```

4. **Interactive tooltip closing too quickly**

   ```html
   <!-- Increase hide delay for interactive tooltips -->
   <button 
     tooltip="Interactive content"
     [tooltipInteractive]="true"
     [tooltipHideDelay]="300">
     Button
   </button>
   ```

5. **CDK Overlay positioning issues**

   ```typescript
   // Ensure proper viewport margins for collision detection
   // This is handled automatically by the tooltip service
   // But you can adjust offset if needed
   <button 
     tooltip="Content"
     [tooltipOffset]="12">
     Button
   </button>
   ```

## 🚀 Performance Tips

1. **Limit simultaneous tooltips**
   ```typescript
   // Hide other tooltips when showing new ones
   hideAllTooltips() {
     this.tooltipService.hideAll();
   }
   ```

2. **Use appropriate delays**
   ```html
   <!-- Quick interactions -->
   <button tooltip="Quick tip" [tooltipShowDelay]="100">Fast</button>
   
   <!-- Deliberate interactions -->
   <button tooltip="Important info" [tooltipShowDelay]="500">Careful</button>
   ```

3. **Optimize content**
   ```html
   <!-- Good: Concise content -->
   <button tooltip="Save draft">Save</button>
   
   <!-- Avoid: Very long content -->
   <button tooltip="This is a very long tooltip with lots of text that might cause performance issues">
     Button
   </button>
   ```

4. **Conditional tooltips**
   ```typescript
   // Only enable tooltips when needed
   showTooltips = computed(() => this.helpMode() || this.isNewUser());
   ```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](../CONTRIBUTING.md) for details.

## 📝 License

This component is part of Angular SuperUI and is licensed under the MIT License.
