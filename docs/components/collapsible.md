# Collapsible Component

The Collapsible component provides a way to show and hide content with smooth animations. It consists of three main parts: the root `Collapsible` component, `CollapsibleTrigger` for the clickable button, and `CollapsibleContent` for the content that can be expanded or collapsed.

## Features

- **Signal-based state management** for reactive updates
- **Smooth animations** with CSS transitions
- **Keyboard accessibility** with proper ARIA attributes
- **Clean, minimal design** that fits well with Tailwind CSS
- **Composable architecture** with three separate components

## Installation

The easiest way to add the collapsible component to your project is using the Angular SuperUI CLI:

```bash
ngsui-cli add collapsible
```

This command will:

- Add the collapsible component files to your project
- Update your imports and dependencies
- Ensure all required utilities are available

After installation, import the components in your Angular component:

```typescript
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@lib/collapsible';
```

## Components

### Collapsible
The root component that provides the collapsible context and state management.

### CollapsibleTrigger
The clickable button that toggles the collapsible state. Includes:
- Animated chevron icon that rotates when expanded
- Proper ARIA attributes for accessibility
- Hover and focus states

### CollapsibleContent
The content area that shows/hides based on the collapsible state. Features:
- Smooth fade and slide animations
- Conditional rendering with `*ngIf`
- Styled container with border and background

## Usage

### Basic Example

```html
<Collapsible>
  <CollapsibleTrigger>
    Toggle Content
  </CollapsibleTrigger>

  <CollapsibleContent>
    <p class="text-sm text-gray-700">
      This content will collapse and expand with animation.
    </p>
  </CollapsibleContent>
</Collapsible>
```

### In Your Component

```typescript
import { Component } from '@angular/core';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@lib/collapsible';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Collapsible, CollapsibleTrigger, CollapsibleContent],
  template: `
    <Collapsible>
      <CollapsibleTrigger>
        Click to expand
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div class="space-y-2">
          <p>This is the collapsible content.</p>
          <p>It can contain any HTML elements.</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  `
})
export class ExampleComponent {}
```

## API Reference

### CollapsibleService

The service manages the collapsible state and provides methods for controlling it:

#### Properties
- `isOpen: WritableSignal<boolean>` - The current open/closed state

#### Methods
- `toggle()` - Toggles the current state
- `open()` - Opens the collapsible
- `close()` - Closes the collapsible

### Collapsible

The root component that provides the collapsible context.

#### Template
```html
<div class="w-full max-w-md mx-auto mt-10">
  <ng-content></ng-content>
</div>
```

### CollapsibleTrigger

The trigger button component.

#### Features
- Responsive button styling with hover effects
- Animated chevron icon
- Proper ARIA attributes (`aria-expanded`)
- Click handling to toggle state

#### Template Structure
```html
<button
  (click)="service.toggle()"
  class="flex items-center justify-between w-full px-4 py-2 text-left text-sm font-medium text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
  [attr.aria-expanded]="service.isOpen()"
>
  <span><ng-content></ng-content></span>
  <!-- Animated chevron icon -->
</button>
```

### CollapsibleContent

The content area that shows/hides based on state.

#### Features
- Conditional rendering with `*ngIf`
- Smooth animations with CSS transitions
- Styled container with padding and border
- Proper content projection with `<ng-content>`

#### Template Structure
```html
<div
  *ngIf="isOpen()"
  class="overflow-hidden mt-2 px-4 py-2 ease-in-out rounded-md border border-gray-200 bg-white animate-accordion-up"
>
  <ng-content></ng-content>
</div>
```

## Styling

The component uses Tailwind CSS classes for styling:

- **Trigger**: Gray background with hover effects, rounded corners
- **Content**: White background with gray border, padding, and rounded corners
- **Animations**: CSS transitions for smooth expand/collapse effects

### Customization

You can customize the styling by:

1. **Overriding CSS classes** in your component
2. **Using Tailwind utilities** in your template
3. **Modifying the component source** for different default styles

## Accessibility

The component includes proper accessibility features:

- **ARIA attributes**: `aria-expanded` on the trigger button
- **Keyboard navigation**: Standard button keyboard interactions
- **Focus management**: Proper focus indicators
- **Semantic HTML**: Uses appropriate HTML elements

## Examples

### Multiple Collapsibles

```html
<div class="space-y-4">
  <Collapsible>
    <CollapsibleTrigger>
      Section 1
    </CollapsibleTrigger>
    <CollapsibleContent>
      <p>Content for section 1</p>
    </CollapsibleContent>
  </Collapsible>

  <Collapsible>
    <CollapsibleTrigger>
      Section 2
    </CollapsibleTrigger>
    <CollapsibleContent>
      <p>Content for section 2</p>
    </CollapsibleContent>
  </Collapsible>
</div>
```

### Complex Content

```html
<Collapsible>
  <CollapsibleTrigger>
    Settings
  </CollapsibleTrigger>
  
  <CollapsibleContent>
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <span>Enable notifications</span>
        <input type="checkbox" />
      </div>
      <div class="flex items-center justify-between">
        <span>Dark mode</span>
        <input type="checkbox" />
      </div>
      <button class="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Save Settings
      </button>
    </div>
  </CollapsibleContent>
</Collapsible>
```

## Notes

- The component uses Angular signals for reactive state management
- Each collapsible instance has its own independent state
- The service is provided at the `Collapsible` component level
- Content is conditionally rendered for better performance
- Animations are handled with CSS transitions for smooth effects
