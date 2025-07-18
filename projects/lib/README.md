# Angular SuperUI v1.0.1 🚀

[![npm version](https://badge.fury.io/js/angular-superui.svg)](https://www.npmjs.com/package/angular-superui)
[![CLI version](https://badge.fury.io/js/ngsui-cli.svg)](https://badge.fury.io/js/ngsui-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-18%2B-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/)

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support%20This%20Project-orange?style=flat&logo=buy-me-a-coffee)](https://buymeacoffee.com/bhaikaju)

A modern, beautiful, and accessible Angular UI component library built with **Tailwind CSS** and **TypeScript**. Angular SuperUI provides a comprehensive set of **8 essential UI components** with **multiple variants**, **CLI-based installation**, and **TypeScript-first development**.

## 🚀 **[📖 Complete Documentation →](../../docs/)**
> 🚀 **Step-by-step guides** for all 8 components with **practical examples**, **usage instructions**, and **styling tips**!

## 🛠️ **v1.0.1: Production Release**

### 🚀 **CLI Tool (Recommended)**
Install components directly in your project with our enhanced CLI:

```bash
# Install CLI globally
npm install -g ngsui-cli@1.0.1

# Initialize project (sets up Tailwind CSS and TypeScript configs)
ngsui init

# Add specific components
ngsui add button card badge alert

# List all available components
ngsui list
```

### 📦 **NPM Package Installation**
Install the complete component library:

```bash
# Using Angular schematics (recommended)
ng add angular-superui@1.0.1

# Or using npm directly
npm install angular-superui@1.0.1
```

### 🌟 **Key Features in v1.0.1**
- **8 Essential Components** - Production-ready UI components
- **Enhanced CLI** - Improved component selection and installation
- **TypeScript First** - Full type safety and IntelliSense support
- **Tailwind CSS Integration** - Utility-first styling approach
- **Angular 18+ Support** - Built for modern Angular applications

## 📚 **Quick Links**
- 📚 **[Component Examples →](../../docs/examples.md)** - Real-world usage examples
- 📖 **[Installation Guide →](../../docs/installation.md)** - Detailed setup instructions  
- 🔧 **[GitHub Repository →](https://github.com/bhaimicrosoft/angular-superui)** - Source code and issues

## ✨ Features

- 🛠️ **CLI Tool** - Selective component installation with ngsui-cli
- 🎨 **8 Essential Components** - Production-ready UI component library  
- 🌈 **Multiple Variants** - Customizable styling options for all components
- 🔧 **TypeScript First** - Full type safety and excellent IntelliSense support
- ♿ **Accessible** - Built with accessibility in mind (ARIA compliant)
- 🎯 **Tree Shakable** - Import only what you need
- 🚀 **Angular 18+** - Built for modern Angular features and standalone components
- 📱 **Responsive** - Mobile-first design approach
- 📦 **Tailwind CSS** - Utility-first CSS framework integration
- 🔄 **Form Integration** - Full Angular Forms support with ControlValueAccessor

## 📦 Installation

### Option 1: CLI Tool - Selective Installation (Recommended)
Perfect for new projects or when you want to reduce bundle size:

```bash
# Install CLI globally
npm install -g ngsui-cli

# Initialize your Angular project
ngsui init

# Add specific components
ngsui add button card badge alert

# List all available components
ngsui list
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
  Button, 
  Avatar, 
  Alert, 
  Badge, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    Button, 
    Avatar, 
    Alert, 
    Badge, 
    Card, 
    CardHeader, 
    CardTitle, 
    CardContent
  ],
  template: `
    <div class="p-6 space-y-6">
      <!-- Welcome Card -->
      <card class="w-96">
        <card-header>
          <card-title>Welcome to Angular SuperUI</card-title>
        </card-header>
        <card-content>
          <!-- Avatar Component -->
          <avatar 
            size="lg" 
            [src]="'https://github.com/shadcn.png'"
            [alt]="'User Avatar'"
            class="mb-4">
          </avatar>

          <!-- Alert Component -->
          <alert variant="default" class="mb-4">
            <h4 class="font-medium">Success!</h4>
            <p class="text-sm">Your component library is ready to use.</p>
          </alert>

          <!-- Button Components -->
          <div class="flex gap-2 mb-4">
            <button variant="default">Default</button>
            <button variant="secondary">Secondary</button>
            <button variant="outline">Outline</button>
          </div>

          <!-- Badge Components -->
          <div class="flex gap-2">
            <badge variant="default">Default</badge>
            <badge variant="secondary">Secondary</badge>
            <badge variant="destructive">Important</badge>
          </div>
        </card-content>
      </card>
    </div>
  `
})
export class ExampleComponent {
  // Component logic here
}
```

## � Component Variants

### Button Variants
Each button component supports multiple styling options:

```typescript
// Basic variants
<button variant="default">Default</button>
<button variant="secondary">Secondary</button>
<button variant="destructive">Destructive</button>
<button variant="outline">Outline</button>
<button variant="ghost">Ghost</button>
<button variant="link">Link</button>

// Sizes
<button size="sm">Small</button>
<button size="default">Default</button>
<button size="lg">Large</button>
<button size="icon">Icon</button>
```

### Badge Variants
Status and labeling options:

```typescript
<badge variant="default">Default</badge>
<badge variant="secondary">Secondary</badge>
<badge variant="destructive">Important</badge>
<badge variant="outline">Outline</badge>
```

### Alert Variants
Contextual feedback styling:

```typescript
<alert variant="default">Default message</alert>
<alert variant="destructive">Error message</alert>
```

## 🧩 Available Components (8)

### 🎨 **Core UI Components**

1. **🔲 Button** - Versatile button component with multiple variants
   - Solid, outline, ghost, and link variants
   - Different sizes: sm, default, lg, icon
   - Loading states and disabled support

2. **🃏 Card** - Flexible content container
   - CardHeader, CardTitle, CardContent, CardFooter
   - Perfect for organizing content sections
   - Responsive design with customizable padding

3. **🏷️ Badge** - Labels and status indicators
   - Multiple color variants
   - Different sizes and styles
   - Perfect for status, tags, and labels

4. **⚠️ Alert** - Contextual feedback messages
   - Success, warning, error, and info variants
   - Dismissible alerts with close buttons
   - Icon support for better visual communication

5. **🚪 Alert Dialog** - Modal confirmation dialogs
   - Accessible modal implementation
   - Customizable trigger, content, and actions
   - Escape key and overlay click handling

6. **👤 Avatar** - User profile pictures and initials
   - Image support with fallback handling
   - Automatic initials generation
   - Multiple sizes: sm, default, lg, xl

7. **🗂️ Accordion** - Collapsible content panels
   - Single or multiple panel expansion
   - Smooth animations and transitions
   - Keyboard navigation support

8. **📅 Calendar** - Date picker and calendar widget
   - Month and year navigation
   - Date selection functionality
   - Customizable date formatting

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

### Simple Dashboard Layout

```typescript
@Component({
  template: `
    <div class="p-6 space-y-6">
      <!-- Header with Avatar -->
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <avatar 
          size="default" 
          [src]="'https://github.com/shadcn.png'"
          [alt]="'User Avatar'">
        </avatar>
      </div>

      <!-- Alert Notification -->
      <alert variant="default">
        <h4 class="font-medium">Welcome back!</h4>
        <p class="text-sm">You have 3 new notifications.</p>
      </alert>

      <!-- Action Buttons -->
      <div class="flex gap-2">
        <button variant="default">Create</button>
        <button variant="secondary">Save Draft</button>
        <button variant="destructive">Delete</button>
      </div>

      <!-- Status Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <card>
          <card-header>
            <card-title>Sales</card-title>
          </card-header>
          <card-content>
            <div class="text-2xl font-bold">$12,345</div>
            <badge variant="default" class="mt-2">+12%</badge>
          </card-content>
        </card>
        
        <card>
          <card-header>
            <card-title>Orders</card-title>
          </card-header>
          <card-content>
            <div class="text-2xl font-bold">1,234</div>
            <badge variant="secondary" class="mt-2">+8%</badge>
          </card-content>
        </card>
        
        <card>
          <card-header>
            <card-title>Users</card-title>
          </card-header>
          <card-content>
            <div class="text-2xl font-bold">5,678</div>
            <badge variant="destructive" class="mt-2">-3%</badge>
          </card-content>
        </card>
      </div>
    </div>
  `
})
export class DashboardComponent {
  // Component logic here
}
```

## 🔧 TypeScript Support

Full TypeScript support with intelligent IntelliSense:

```typescript
import type { ButtonVariant, AvatarSize } from 'angular-superui';

// Type-safe component usage
const buttonVariant: ButtonVariant = 'default';
const avatarSize: AvatarSize = 'lg';

// All components are fully typed
<button [variant]="buttonVariant">Typed Button</button>
<avatar [size]="avatarSize">Typed Avatar</avatar>
```

## ♿ Accessibility

Angular SuperUI components are built with accessibility in mind:

- **ARIA Attributes**: Proper ARIA attributes and roles for screen readers
- **Keyboard Navigation**: Full keyboard accessibility support
- **Semantic HTML**: Uses appropriate HTML elements for better accessibility
- **Focus Management**: Visible focus indicators and logical focus flow
- **High Contrast**: Components work well in high contrast mode

## 🌙 Dark Mode

Components automatically adapt to your theme preferences:

```css
/* Dark mode support through CSS variables */
.dark {
  --background: hsl(222.2 84% 4.9%);
  --foreground: hsl(210 40% 98%);
  /* Components automatically use these variables */
}
```

## 📄 License

MIT License - see [LICENSE](https://github.com/bhaimicrosoft/angular-superui/blob/main/LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](https://github.com/bhaimicrosoft/angular-superui/blob/main/CONTRIBUTING.md) for details.

## 📧 Support

- 📦 **npm**: [angular-superui](https://www.npmjs.com/package/angular-superui)
- 🐙 **GitHub**: [bhaimicrosoft/angular-superui](https://github.com/bhaimicrosoft/angular-superui)
- 📧 **Email**: [bhaikaju@gmail.com](mailto:bhaikaju@gmail.com)

---

Built with ❤️ by the Angular SuperUI Team
