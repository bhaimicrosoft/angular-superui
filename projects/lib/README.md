# Angular SuperUI v0.4.1 🚀

[![npm version](https://badge.fury.io/js/angular-superui.svg)](https://www.npmjs.com/package/angular-superui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-20%2B-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8%2B-blue.svg)](https://www.typescriptlang.org/)

A modern, beautiful, and accessible Angular UI component library built with **Tailwind CSS** and **TypeScript**. Angular SuperUI provides a comprehensive set of **30+ reusable components** with **15+ color variants**, **CLI tool for selective installation**, and **enhanced dark mode support**.

## 🛠️ **v0.4.1: CLI Tool & Enhanced Features**

### 🎯 **NEW: CLI Tool - Like shadcn/ui**
Install only the components you need with our new CLI tool:

```bash
# Install CLI globally
npm install -g angular-superui-cli

# Initialize project  
npx angular-superui init

# Add specific components (reduces bundle size by 40%+)
npx angular-superui add button card badge
```

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
npm install -g angular-superui-cli

# Initialize your Angular project
npx angular-superui init

# Add specific components
npx angular-superui add button card badge alert

# Interactive component selection
npx angular-superui add
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
    <lib-theme-selector 
      [currentTheme]="currentTheme" 
      (themeChange)="onThemeChange($event)">
    </lib-theme-selector>

    <lib-card class="w-96">
      <lib-card-header>
        <lib-card-title>Welcome to Angular SuperUI</lib-card-title>
      </lib-card-header>
      <lib-card-content>
        <!-- Enhanced Avatar -->
        <lib-avatar 
          size="lg" 
          [src]="'https://github.com/shadcn.png'"
          [alt]="'User Avatar'"
          class="mb-4">
        </lib-avatar>

        <!-- Colorful Alerts -->
        <lib-alert variant="success" class="mb-4">
          <h4 class="font-medium">Success!</h4>
          <p class="text-sm">Your component library is ready to use.</p>
        </lib-alert>

        <!-- Colorful Buttons -->
        <div class="flex gap-2">
          <lib-button variant="success">Success</lib-button>
          <lib-button variant="purple">Purple</lib-button>
          <lib-button variant="outline-info">Info Outline</lib-button>
        </div>

        <!-- Colorful Badges -->
        <div class="flex gap-2 mt-4">
          <lib-badge variant="emerald">Active</lib-badge>
          <lib-badge variant="amber">Pending</lib-badge>
          <lib-badge variant="outline-rose">Featured</lib-badge>
        </div>
      </lib-card-content>
    </lib-card>
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
<lib-button variant="success">Success</lib-button>
<lib-button variant="purple">Purple</lib-button>
<lib-button variant="outline-emerald">Emerald Outline</lib-button>

// Badge variants (30+ total)
<lib-badge variant="info">Info</lib-badge>
<lib-badge variant="outline-pink">Pink Outline</lib-badge>

// Alert variants (15+ total)
<lib-alert variant="warning">Warning Alert</lib-alert>
<lib-alert variant="purple">Purple Alert</lib-alert>

// Progress variants (15+ total)
<lib-progress [value]="75" variant="success"></lib-progress>
<lib-progress [value]="60" variant="purple"></lib-progress>
```

### 🎭 Theme Switching

11 beautiful themes with the ThemeSelector component:

```typescript
<lib-theme-selector 
  [currentTheme]="currentTheme" 
  (themeChange)="onThemeChange($event)">
</lib-theme-selector>
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
<lib-avatar 
  size="lg" 
  [src]="'https://github.com/shadcn.png'"
  [alt]="'User Avatar'">
</lib-avatar>

// Custom fallback text
<lib-avatar [fallback]="'JD'"></lib-avatar>

// Auto-generated initials from alt text
<lib-avatar [alt]="'John Doe'"></lib-avatar>

// Multiple sizes
<lib-avatar size="sm"></lib-avatar>    <!-- 32px -->
<lib-avatar size="default"></lib-avatar> <!-- 40px -->
<lib-avatar size="lg"></lib-avatar>    <!-- 48px -->
<lib-avatar size="xl"></lib-avatar>    <!-- 64px -->
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
      <lib-theme-selector 
        [currentTheme]="currentTheme" 
        (themeChange)="onThemeChange($event)">
      </lib-theme-selector>

      <!-- Action Buttons -->
      <div class="flex gap-2">
        <lib-button variant="success">Save</lib-button>
        <lib-button variant="info">Preview</lib-button>
        <lib-button variant="warning">Draft</lib-button>
        <lib-button variant="destructive">Delete</lib-button>
      </div>

      <!-- Status Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <lib-card>
          <lib-card-header>
            <lib-card-title>Sales</lib-card-title>
          </lib-card-header>
          <lib-card-content>
            <lib-progress [value]="85" variant="success"></lib-progress>
            <lib-badge variant="success" class="mt-2">+12%</lib-badge>
          </lib-card-content>
        </lib-card>
        
        <lib-card>
          <lib-card-header>
            <lib-card-title>Traffic</lib-card-title>
          </lib-card-header>
          <lib-card-content>
            <lib-progress [value]="65" variant="info"></lib-progress>
            <lib-badge variant="info" class="mt-2">+8%</lib-badge>
          </lib-card-content>
        </lib-card>
        
        <lib-card>
          <lib-card-header>
            <lib-card-title>Conversion</lib-card-title>
          </lib-card-header>
          <lib-card-content>
            <lib-progress [value]="42" variant="warning"></lib-progress>
            <lib-badge variant="warning" class="mt-2">-3%</lib-badge>
          </lib-card-content>
        </lib-card>
      </div>

      <!-- Enhanced Avatars -->
      <div class="flex gap-4">
        <lib-avatar 
          size="sm" 
          [src]="'https://github.com/shadcn.png'">
        </lib-avatar>
        <lib-avatar 
          size="default" 
          [alt]="'John Doe'">
        </lib-avatar>
        <lib-avatar 
          size="lg" 
          [fallback]="'AD'">
        </lib-avatar>
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
