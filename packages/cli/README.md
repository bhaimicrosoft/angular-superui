# Angular SuperUI CLI

A CLI tool for selective Angular SuperUI component installation, inspired by shadcn/ui.

## Installation

```bash
npm install -g angular-superui-cli
```

## Usage

### Initialize Angular SuperUI in your project

```bash
angular-superui init
```

This will:
- Install required dependencies
- Set up the utility functions
- Create the components directory structure

### Add specific components

```bash
# Add a single component
angular-superui add button

# Add multiple components
angular-superui add button card alert

# Force overwrite existing components
angular-superui add button --force
```

### List available components

```bash
angular-superui list
```

## Available Components

### Core Components
- `button` - Displays a button or a component that looks like a button
- `badge` - Displays a badge or a component that looks like a badge
- `alert` - Displays a callout for user attention
- `card` - Displays a card with header, content, and footer
- `input` - Displays a form input field
- `progress` - Displays an indicator showing completion progress

### Form Components
- `checkbox` - A control that allows the user to toggle between checked and not checked
- `switch` - A control that allows the user to toggle between checked and not checked
- `textarea` - Displays a form textarea field
- `select` - Displays a list of options for the user to pick from
- `radio-group` - A set of checkable buttons—known as radio buttons
- `slider` - An input where the user selects a value from within a given range

### Navigation Components
- `breadcrumb` - Displays the path to the current resource using a hierarchy of links
- `tabs` - A set of layered sections of content—known as tab panels

### Layout Components
- `separator` - Visually or semantically separates content
- `skeleton` - Use to show a placeholder while content is loading

### Overlay Components
- `dialog` - A window overlaid on either the primary window or another dialog window
- `tooltip` - A popup that displays information related to an element
- `popover` - Displays rich content in a portal, triggered by a button
- `sheet` - Extends the Dialog component to display content that complements the main content

### New Components (v0.3.0)
- `calendar` - A date field component that allows users to enter and edit date
- `command` - Fast, composable, unstyled command menu for Angular

### Display Components
- `avatar` - An image element with a fallback for representing the user
- `table` - A responsive table component

### Utility Components
- `theme-selector` - A component for switching between different themes
- `toast` - A succinct message that is displayed temporarily
- `toggle` - A two-state button that can be either on or off
- `accordion` - A vertically stacked set of interactive headings
- `label` - Renders an accessible label associated with controls

## Color Variants

Most components support these color variants:
- **Semantic**: success, warning, info, destructive
- **Purple Family**: purple, pink, violet, indigo
- **Warm Colors**: orange, amber, lime, yellow
- **Cool Colors**: blue, cyan, sky, teal
- **Nature Colors**: rose, red, emerald, green

## Examples

```typescript
// After adding button component
import { Button } from './lib/components/button/button';

@Component({
  standalone: true,
  imports: [Button],
  template: `
    <lib-button variant="success">Success Button</lib-button>
    <lib-button variant="outline-purple">Purple Outline</lib-button>
  `
})
export class MyComponent {}
```

## Why Use This CLI?

- **Selective Installation**: Only add the components you need
- **Tree Shaking**: Smaller bundle sizes
- **Up to Date**: Always get the latest component versions
- **Customizable**: Easy to modify components after installation
- **shadcn/ui Style**: Familiar workflow for shadcn/ui users

## License

MIT
