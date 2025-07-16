# ngsui-cli v0.6.2 🛠️

[![npm version](https://badge.fury.io/js/ngsui-cli.svg)](https://badge.fury.io/js/ngsui-cli)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support%20This%20Project-orange?style=flat&logo=buy-me-a-coffee)](https://buymeacoffee.com/bhaikaju)

A CLI tool for local Angular SuperUI component installation, inspired by shadcn/ui.

**🎯 New in v0.6.2: CLI Naming Consistency + Documentation Improvements!**

## 📚 **[📖 Complete Component Demos & Examples →](../../docs/demo.md)**
> 🎨 **Step-by-step guides** for all 30+ components with **practical examples** and **usage instructions**!

## 🚀 Features

- **🎨 Simplified Component Names**: No more `lib-` prefixes! Use `<button>`, `<card>`, `<dialog>`
- **🏠 Local-First Installation**: Components installed directly in your project
- **📦 Zero External Dependencies**: No angular-superui package required
- **⚡ 50%+ Smaller Bundle Size**: Only the components you use
- **🔧 Full Control**: Modify components freely after installation
- **🎯 Selective Installation**: Add only the components you need
- **💾 Persistent Storage**: Components stay in your project, versioned with your code
- **🚀 TypeScript Support**: Full type safety and IntelliSense
- **� Enhanced CLI Graphics**: Beautiful interface with emojis and improved UX

## Installation

```bash
npm install -g ngsui-cli@0.6.2
```

## Usage

### Initialize Angular SuperUI in your project

```bash
ngsui-cli init
```

This will:
- Create local component directory structure in `./src/lib/components/`
- Set up utility functions in `./src/lib/utils/`
- Install only required dependencies (TailwindCSS + utilities)
- Configure TypeScript path aliases (@components/*, @utils/*)
- **No angular-superui npm package installation required!**

### Add specific components locally

```bash
# Add a single component (installed in ./src/lib/components/)
ngsui-cli add button

# Add multiple components at once
ngsui-cli add button card alert
ngsui-cli add dialog tooltip popover sheet

# Install ALL components at once
ngsui-cli add --all

# Force overwrite existing components
ngsui-cli add button --force
ngsui-cli add --all --force
```

### List available components

```bash
ngsui-cli list
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

### New Components (v0.6.2)
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
// After adding button component (v0.6.2 - Local Installation)
import { Button } from '@components/button';
// Or using relative path: import { Button } from './lib/components/button';

@Component({
  standalone: true,
  imports: [Button],
  template: `
    <button variant="success">Success Button</button>
    <button variant="outline-purple">Purple Outline</button>
  `
})
export class MyComponent {}
```

**Benefits of Local Installation:**
- ✅ No external package dependency
- ✅ Full control over component code
- ✅ Better tree shaking and performance
- ✅ Components versioned with your project
- ✅ TypeScript path aliases for clean imports
- ✅ Simplified component names (no lib- prefix!)

## 📚 **Quick Links**
- 🎨 **[Complete Component Demos →](../../docs/demo.md)** - Step-by-step examples for all components
- 📖 **[Installation Guide →](../../docs/installation.md)** - Detailed setup instructions
- 🔧 **[GitHub Repository →](https://github.com/bhaimicrosoft/angular-superui)** - Source code and issues

## Why Use This CLI?

- **🏠 Local-First Architecture**: Components are installed directly in your project, no npm package dependency
- **📦 Zero External Dependencies**: No need to install the angular-superui package
- **⚡ Superior Performance**: 50%+ smaller bundle sizes with local components
- **🔧 Full Control**: Modify components freely - they're yours!
- **💾 Version Control Friendly**: Components are versioned with your code
- **🚀 Always Up-to-Date**: Fetch the latest component versions on demand
- **🎯 Tree Shaking**: Perfect tree shaking with local installation
- **🌟 shadcn/ui Style**: Familiar workflow for shadcn/ui users
- **🔧 TypeScript Path Aliases**: Automatic @components/* and @utils/* setup

## License

MIT
