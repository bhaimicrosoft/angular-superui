# Angular SuperUI v0.6.0 🚀

[![npm version](https://badge.fury.io/js/angular-superui.svg)](https://www.npmjs.com/package/angular-superui)
[![CLI version](https://badge.fury.io/js/@ngsui/cli.svg)](https://badge.fury.io/js/@ngsui/cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-20%2B-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8%2B-blue.svg)](https://www.typescriptlang.org/)

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support%20This%20Project-orange?style=flat&logo=buy-me-a-coffee)](https://buymeacoffee.com/bhaikaju)

A modern, beautiful, and accessible Angular UI component library built with **Tailwind CSS** and **TypeScript**. Angular SuperUI provides a comprehensive set of **30+ reusable components** with **15+ color variants**, **local-first CLI installation**, and **enhanced dark mode support**.

## � **[🎨 Complete Component Demos & Examples →](../../docs/demo.md)**
> 🚀 **Step-by-step guides** for all 30+ components with **practical examples**, **usage instructions**, and **styling tips**!

## 🛠️ **v0.6.0: Simplified & Enhanced**

### 🚀 **NEW: Zero NPM Dependencies (CLI Recommended)**
Install components directly in your project with no package dependency:

```bash
# Install CLI globally
npm install -g angular-superui-cli@0.6.0

# Initialize project (creates local structure)
@ngsui/cli init

# Add components locally (reduces bundle size by 50%+)
@ngsui/cli add button card badge
```

### 📦 **Deprecated: NPM Package Installation**
> ⚠️ **Note**: NPM package installation is deprecated in v0.6.0. Use CLI for better performance.

```bash
npm install angular-superui@0.6.0
```

### 🌟 **Local-First Benefits**
- **Zero External Dependencies** - No npm package required with CLI
- **Full Control** - Modify components freely in your project
- **Better Performance** - 50%+ smaller bundle sizes
- **Version Control Friendly** - Components versioned with your code

### � **Enhanced Dark Mode System**
- **System theme detection** - Automatically follows OS preference
- **Theme persistence** - Remembers user choice across sessions  
- **Instant toggle** - Switch themes without page reload
- **All components** - Complete dark mode support across 30+ components

### ✅ **Fixed Color Variants**
All Tailwind CSS color variants now work correctly:
- **15+ color variants** with proper numeric classes (`bg-lime-500`)
- **Semantic colors** (success, warning, destructive, info)
- **Creative palette** (purple, pink, violet, indigo, lime, orange)

## 📚 **Quick Links**
- 🎨 **[Complete Component Demos →](../../docs/demo.md)** - Step-by-step examples for all components
- 📖 **[Installation Guide →](../../docs/installation.md)** - Detailed setup instructions  
- 🔧 **[GitHub Repository →](https://github.com/bhaimicrosoft/angular-superui)** - Source code and issues

## ✨ Features

- 🛠️ **CLI Tool** - Selective component installation like shadcn/ui
- 🎨 **30+ Components** - Comprehensive UI component library  
- 🌈 **15+ Color Variants** - Extended color palette for all components
- � **Enhanced Dark Mode** - System detection + theme persistence
- 🔧 **TypeScript First** - Full type safety with Class Variance Authority
- ♿ **Accessible** - Built with accessibility in mind (ARIA compliant, WCAG AA)
- 🎯 **Tree Shakable** - Import only what you need
- 🚀 **Angular 20+** - Built for the latest Angular features
- 📱 **Responsive** - Mobile-first design approach
- 📦 **Zero Dependencies** - No external UI dependencies (except Tailwind CSS)
- 🔄 **Form Integration** - Full Angular Forms support with ControlValueAccessor

## 📦 Installation

### Option 1: CLI Tool - Selective Installation (Recommended)
Perfect for new projects or when you want to reduce bundle size:

```bash
# Install CLI globally
npm install -g @ngsui/cli

# Initialize your Angular project
@ngsui/cli init

# Add specific components
@ngsui/cli add button card badge alert

# Add multiple components at once (New in v0.6.0!)
@ngsui/cli add button alert card dialog

# Install ALL components at once (New in v0.6.0!)
@ngsui/cli add --all

# Interactive component selection
@ngsui/cli add
```

### Option 2: Full Library Installation
Install the complete library:

```bash
# Using Angular CLI (recommended)
ng add angular-superui

# Or using npm
npm install angular-superui
```

### Using npm

```bash
npm install angular-superui
```

### Manual Setup

1. Install the package and peer dependencies:

```bash
npm install angular-superui class-variance-authority clsx tailwind-merge
```

2. Configure your `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/angular-superui/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        // Extended Color Palette
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
        },
        info: {
          DEFAULT: "var(--info)",
          foreground: "var(--info-foreground)",
        },
        purple: {
          DEFAULT: "var(--purple)",
          foreground: "var(--purple-foreground)",
        },
        // ... add all 15+ colors
      },
    },
  },
  plugins: [],
}
```

3. Add CSS variables to your `styles.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: hsl(0 0% 100%);
    --foreground: hsl(222.2 84% 4.9%);
    --primary: hsl(222.2 47.4% 11.2%);
    --primary-foreground: hsl(210 40% 98%);
    /* Extended Color Palette */
    --success: hsl(142 76% 36%);
    --success-foreground: hsl(355 7% 97%);
    --purple: hsl(262 83% 58%);
    --purple-foreground: hsl(355 7% 97%);
    /* ... all color variables */
  }
}
```

## 🎯 Quick Start

Import components in your Angular component:

```typescript
import { Component } from '@angular/core';
import { 
  Button, Avatar, ThemeSelector, Alert, Badge, 
  Card, CardHeader, CardTitle, CardContent 
} from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Button, Avatar, ThemeSelector, Alert, Badge, Card, CardHeader, CardTitle, CardContent],
  template: `
    <!-- Theme Selector -->
    <theme-selector 
      [currentTheme]="currentTheme" 
      (themeChange)="onThemeChange($event)">
    </theme-selector>

    <card class="w-96">
      <card-header>
        <card-title>Welcome to Angular SuperUI</card-title>
      </card-header>
      <card-content>
        <!-- Enhanced Avatar -->
        <avatar 
          size="lg" 
          [src]="'https://github.com/shadcn.png'"
          [alt]="'User Avatar'"
          class="mb-4">
        </avatar>

        <!-- Colorful Alerts -->
        <alert variant="success" class="mb-4">
          <h4 class="font-medium">Success!</h4>
          <p class="text-sm">Your component library is ready to use.</p>
        </alert>

        <!-- Colorful Buttons -->
        <div class="flex gap-2">
          <button variant="success">Success</button>
          <button variant="purple">Purple</button>
          <button variant="outline-info">Info Outline</button>
        </div>

        <!-- Colorful Badges -->
        <div class="flex gap-2 mt-4">
          <badge variant="emerald">Active</badge>
          <badge variant="amber">Pending</badge>
          <badge variant="outline-rose">Featured</badge>
        </div>
      </card-content>
    </card>
  `
})
export class ExampleComponent {
  currentTheme = 'default';

  onThemeChange(theme: string) {
    this.currentTheme = theme;
    document.body.className = theme;
  }
}
```

## 🌈 Color System

### 15+ Beautiful Color Variants

Available across Button, Badge, Alert, and Progress components:

**Core Colors**: Default, Secondary, Destructive
**Semantic Colors**: Success, Warning, Info  
**Creative Palette**: Purple, Pink, Orange, Teal, Indigo, Cyan, Rose, Emerald, Amber, Lime, Violet, Sky

```typescript
// Button variants (30+ total)
<button variant="success">Success</button>
<button variant="purple">Purple</button>
<button variant="outline-emerald">Emerald Outline</button>

// Badge variants (30+ total)
<badge variant="info">Info</badge>
<badge variant="outline-pink">Pink Outline</badge>

// Alert variants (15+ total)
<alert variant="warning">Warning Alert</alert>
<alert variant="purple">Purple Alert</alert>

// Progress variants (15+ total)
<progress [value]="75" variant="success"></progress>
<progress [value]="60" variant="purple"></progress>
```

### 🎭 Theme Switching

11 beautiful themes with the ThemeSelector component:

```typescript
<theme-selector 
  [currentTheme]="currentTheme" 
  (themeChange)="onThemeChange($event)">
</theme-selector>
```

**Available Themes**: Default, Blue, Green, Purple, Pink, Orange, Teal, Red, Yellow, Indigo, Cyan

## 🧩 Available Components (25+)

### Form Components (10)
- **Button** - 30+ variants (solid + outline for each color)
- **Input** - Text input fields with validation support
- **Textarea** - Multi-line text input with auto-resize
- **Label** - Accessible form labels
- **Checkbox** - Toggle checkboxes with custom styling
- **Switch** - Toggle switches for boolean values
- **Select** - Dropdown selection with search capabilities
- **Radio Group** - Single selection from multiple options
- **Toggle** - Toggle buttons with pressed states
- **Slider** - Range input with customizable min/max values

### Layout Components (5)
- **Card Suite** - Flexible content containers (Header, Title, Description, Content, Footer)
- **Separator** - Visual dividers for content sections
- **Tabs Suite** - Tabbed navigation (List, Trigger, Content)
- **Accordion Suite** - Collapsible content (Item, Trigger, Content)
- **Table Suite** - Data tables (Header, Body, Row, Head, Cell, Caption)

### Overlay Components (3)
- **Dialog Suite** - Modal dialogs (Header, Title, Description, Content, Footer)
- **Tooltip** - Contextual information popups
- **Toast Suite** - Notification system with service integration

### Feedback Components (4)
- **Alert** - 15+ color variants for contextual feedback
- **Badge** - 30+ variants for status and labeling
- **Progress** - 15+ color variants for progress indicators
- **Skeleton** - Loading placeholders

### Display Components (1)
- **Avatar** - Enhanced with image source support, automatic fallbacks, error handling

### Utility Components (2)
- **ThemeSelector** - Dynamic theme switching with 11 themes
- **Separator** - Visual content dividers

## 🖼️ Enhanced Avatar Component

The Avatar component now supports full image functionality:

```typescript
// Image source with automatic fallback
<avatar 
  size="lg" 
  [src]="'https://github.com/shadcn.png'"
  [alt]="'User Avatar'">
</avatar>

// Custom fallback text
<avatar [fallback]="'JD'"></avatar>

// Auto-generated initials from alt text
<avatar [alt]="'John Doe'"></avatar>

// Multiple sizes
<avatar size="sm"></avatar>    <!-- 32px -->
<avatar size="default"></avatar> <!-- 40px -->
<avatar size="lg"></avatar>    <!-- 48px -->
<avatar size="xl"></avatar>    <!-- 64px -->
```

**Features**:
- `src` property for image URLs
- `alt` property for accessibility and initials generation
- `fallback` property for custom fallback text
- Automatic error handling for failed image loads
- Intelligent initials generation from names
- Modern Angular 18+ control flow syntax

## 📚 Advanced Examples

### Multi-Color Dashboard

```typescript
@Component({
  template: `
    <div class="p-6 space-y-6">
      <!-- Theme Selector -->
      <theme-selector 
        [currentTheme]="currentTheme" 
        (themeChange)="onThemeChange($event)">
      </theme-selector>

      <!-- Action Buttons -->
      <div class="flex gap-2">
        <button variant="success">Save</button>
        <button variant="info">Preview</button>
        <button variant="warning">Draft</button>
        <button variant="destructive">Delete</button>
      </div>

      <!-- Status Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <card>
          <card-header>
            <card-title>Sales</card-title>
          </card-header>
          <card-content>
            <progress [value]="85" variant="success"></progress>
            <badge variant="success" class="mt-2">+12%</badge>
          </card-content>
        </card>
        
        <card>
          <card-header>
            <card-title>Traffic</card-title>
          </card-header>
          <card-content>
            <progress [value]="65" variant="info"></progress>
            <badge variant="info" class="mt-2">+8%</badge>
          </card-content>
        </card>
        
        <card>
          <card-header>
            <card-title>Conversion</card-title>
          </card-header>
          <card-content>
            <progress [value]="42" variant="warning"></progress>
            <badge variant="warning" class="mt-2">-3%</badge>
          </card-content>
        </card>
      </div>

      <!-- Enhanced Avatars -->
      <div class="flex gap-4">
        <avatar 
          size="sm" 
          [src]="'https://github.com/shadcn.png'">
        </avatar>
        <avatar 
          size="default" 
          [alt]="'John Doe'">
        </avatar>
        <avatar 
          size="lg" 
          [fallback]="'AD'">
        </avatar>
      </div>
    </div>
  `
})
export class DashboardComponent {
  currentTheme = 'default';

  onThemeChange(theme: string) {
    this.currentTheme = theme;
    document.body.className = theme;
  }
}
```

## 🔧 TypeScript Support

Full TypeScript support with intelligent IntelliSense:

```typescript
import type { ButtonVariant, AvatarSize, ThemeOption } from 'angular-superui';

// Type-safe variant usage
const buttonVariant: ButtonVariant = 'success';
const avatarSize: AvatarSize = 'lg';
```

## ♿ Accessibility

- **WCAG AA Compliant**: All color combinations meet 4.5:1 contrast ratio
- **ARIA Support**: Proper ARIA attributes and roles
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Semantic HTML and proper labeling
- **Focus Management**: Visible focus indicators

## 🌙 Dark Mode

Automatic dark mode support with proper contrast ratios:

```css
.dark {
  --success: hsl(142, 69%, 58%);
  --success-foreground: hsl(144, 61%, 20%);
  /* All colors automatically adapt */
}
```

## 📄 License

MIT License - see [LICENSE](https://github.com/bhaimicrosoft/angular-superui/blob/main/LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](https://github.com/bhaimicrosoft/angular-superui/blob/main/CONTRIBUTING.md) for details.

## 📧 Support

- 📦 **npm**: [angular-superui](https://www.npmjs.com/package/angular-superui)
- 🐙 **GitHub**: [bhaimicrosoft/angular-superui](https://github.com/bhaimicrosoft/angular-superui)
- 📧 **Email**: bhaikaju@gmail.com

---

**Built with ❤️ by the Angular SuperUI Team**
