# ContextMenu

A customizable context menu component that appears on right-click with full keyboard navigation and accessibility support.

## Installation

```bash
npx ngsui-cli add context-menu
```

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { ContextMenuComponent } from '@lib/context-menu';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ContextMenuComponent],
  template: `
    <ContextMenu [menuOptions]="menuOptions"></ContextMenu>
    <span>Right Click Anywhere</span>
    </div>
  `
})
export class ExampleComponent {
  menuOptions = ['Option 1', 'Option 2', 'Option 3'];
}
```


## API Reference

### ContextMenuComponent

The main context menu component that handles right-click interactions and displays menu options.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `menuOptions` | `string[]` | `[]` | Array of menu options to display |

### Events

The component automatically handles menu item selection and logs the selected option to the console. The component can be extended to emit custom events by adding `@Output()` decorators.

## Accessibility

The ContextMenu component includes comprehensive accessibility features:

- **ARIA Support**: Proper `role="menu"` and `aria-labelledby` attributes
- **Keyboard Navigation**:
  - `↑/↓` Arrow keys to navigate between options
  - `Enter` to select an option
  - `Escape` to close the menu
- **Focus Management**: Automatic focus handling for menu items with visual focus indicators
- **Screen Reader Support**: Proper semantic structure with `role="menuitem"` for each option

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Right Click` | Open context menu |
| `↑` | Navigate to previous option |
| `↓` | Navigate to next option |
| `Enter` | Select current option |
| `Escape` | Close context menu |
| `Click outside` | Close context menu |

## Features

- **Smart Positioning**: Automatically repositions to stay within viewport boundaries
- **Right-click Trigger**: Opens on right-click anywhere on the page
- **Keyboard Navigation**: Full keyboard support with arrow keys
- **Accessibility Compliant**: WCAG guidelines compliance
- **Auto-close**: Closes when clicking outside or pressing Escape
- **Focus Management**: Proper focus handling with visual indicators
- **Customizable Options**: Dynamic menu option configuration
- **Viewport Awareness**: Prevents menu from appearing outside screen bounds

## Browser Support

The ContextMenu component works in all modern browsers that support:
- ES6+ features
- Angular 17+
- CSS Grid and Flexbox
- Modern event handling
