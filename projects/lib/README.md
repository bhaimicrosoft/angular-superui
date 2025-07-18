# Angular SuperUI v1.0.3 🚀

[![npm version](https://badge.fury.io/js/angular-superui.svg)](https://www.npmjs.com/package/angular-superui)
[![CLI version](https://badge.fury.io/js/ngsui-cli.svg)](https://badge.fury.io/js/ngsui-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-18%2B-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/)

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support%20This%20Project-orange?style=flat&logo=buy-me-a-coffee)](https://buymeacoffee.com/bhaikaju)

A modern, beautiful, and accessible Angular UI component library built with **Tailwind CSS** and **TypeScript**. Angular SuperUI provides a comprehensive set of **15 essential UI components** with **multiple variants**, **CLI-based installation**, and **TypeScript-first development**.

## 🚀 **[📖 Complete Documentation →](../../docs/)**
> 🚀 **Step-by-step guides** for all 15 components with **practical examples**, **usage instructions**, and **styling tips**!

## 🛠️ **v1.0.3: Production Release**

### 🚀 **CLI Tool (Recommended)**
Install components directly in your project with our enhanced CLI:

```bash
# Install CLI globally
npm install -g ngsui-cli@1.0.3

# Initialize project (sets up Tailwind CSS and TypeScript configs)
ngsui-cli init

# Add specific components
ngsui-cli add button card badge alert checkbox theme-switcher

# List all available components
ngsui-cli list
```

### 📦 **NPM Package Installation**
Install the complete component library:

```bash
# Using Angular schematics (recommended)
ng add angular-superui@1.0.3

# Or using npm directly
npm install angular-superui@1.0.3
```

### 🌟 **Key Features in v1.0.3**
- **15 Essential Components** - Production-ready UI components including new Collapsible
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
- 🎨 **14 Essential Components** - Production-ready UI component library  
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
ngsui-cli init

# Add specific components
ngsui-cli add button card badge alert checkbox

# List all available components
ngsui-cli list
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

2. Configure your `styles.css` for Tailwind CSS v4:

```css
@import "tailwindcss";

@layer base {
  :root {
    --border: hsl(214.3 31.8% 91.4%);
    --input: hsl(214.3 31.8% 91.4%);
    --ring: hsl(222.2 84% 4.9%);
    --background: hsl(0 0% 100%);
    --foreground: hsl(222.2 84% 4.9%);
    --primary: hsl(222.2 47.4% 11.2%);
    --primary-foreground: hsl(210 40% 98%);
    --secondary: hsl(210 40% 96.1%);
    --secondary-foreground: hsl(222.2 47.4% 11.2%);
    --destructive: hsl(0 84.2% 60.2%);
    --destructive-foreground: hsl(210 40% 98%);
    --muted: hsl(210 40% 96.1%);
    --muted-foreground: hsl(215.4 16.3% 46.9%);
    --accent: hsl(210 40% 96.1%);
    --accent-foreground: hsl(222.2 47.4% 11.2%);
    --card: hsl(0 0% 100%);
    --card-foreground: hsl(222.2 84% 4.9%);
    --popover: hsl(0 0% 100%);
    --popover-foreground: hsl(222.2 84% 4.9%);
    --radius: 0.5rem;
  }

  .dark {
    --border: hsl(217.2 32.6% 17.5%);
    --input: hsl(217.2 32.6% 17.5%);
    --ring: hsl(212.7 26.8% 83.9%);
    --background: hsl(222.2 84% 4.9%);
    --foreground: hsl(210 40% 98%);
    --primary: hsl(210 40% 98%);
    --primary-foreground: hsl(222.2 47.4% 11.2%);
    --secondary: hsl(217.2 32.6% 17.5%);
    --secondary-foreground: hsl(210 40% 98%);
    --destructive: hsl(0 62.8% 30.6%);
    --destructive-foreground: hsl(210 40% 98%);
    --muted: hsl(217.2 32.6% 17.5%);
    --muted-foreground: hsl(215 20.2% 65.1%);
    --accent: hsl(217.2 32.6% 17.5%);
    --accent-foreground: hsl(210 40% 98%);
    --card: hsl(222.2 84% 4.9%);
    --card-foreground: hsl(210 40% 98%);
    --popover: hsl(222.2 84% 4.9%);
    --popover-foreground: hsl(210 40% 98%);
  }

  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
  }
}
```

3. Import components in your Angular app:

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
  CardContent,
  Checkbox,
  ThemeSwitcher 
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
    CardContent,
    Checkbox,
    ThemeSwitcher
  ],
  template: `
    <div class="p-6 space-y-6">
      <!-- Theme Switcher -->
      <lib-theme-switcher></lib-theme-switcher>
      
      <!-- Welcome Card -->
      <Card class="w-96">
        <CardHeader>
          <CardTitle>Welcome to Angular SuperUI</CardTitle>
        </CardHeader>
        <CardContent>
          <!-- Avatar Component -->
          <Avatar 
            size="lg" 
            [src]="'https://github.com/shadcn.png'"
            [alt]="'User Avatar'"
            class="mb-4">
          </Avatar>

          <!-- Alert Component -->
          <Alert variant="default" class="mb-4">
            <h4 class="font-medium">Success!</h4>
            <p class="text-sm">Your component library is ready to use.</p>
          </Alert>

          <!-- Button Components -->
          <div class="flex gap-2 mb-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>

          <!-- Badge Components -->
          <div class="flex gap-2 mb-4">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Important</Badge>
          </div>

          <!-- Checkbox Components -->
          <div class="flex flex-col gap-2">
            <div class="flex items-center space-x-2">
              <Checkbox [(ngModel)]="isChecked" />
              <label class="text-sm">Accept terms and conditions</label>
            </div>
            <div class="flex items-center space-x-2">
              <Checkbox variant="success" [(ngModel)]="isSubscribed" />
              <label class="text-sm">Subscribe to newsletter</label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  `
})
export class ExampleComponent {
  // Component logic here
  isChecked = false;
  isSubscribed = false;
}
```

## 🎨 Component Variants

### Theme Switcher
A dark/light theme switcher with system preference detection:

```html
<lib-theme-switcher></lib-theme-switcher>
```

### Button Variants
Each button component supports multiple styling options:

```typescript
// Basic variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

### Badge Variants
Status and labeling options:

```typescript
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Important</Badge>
<Badge variant="outline">Outline</Badge>
```

### Alert Variants
Contextual feedback styling:

```typescript
<Alert variant="default">Default message</Alert>
<Alert variant="destructive">Error message</Alert>
```

### Checkbox Variants
Boolean input controls with multiple states:

```typescript
<Checkbox [(ngModel)]="isChecked">Default checkbox</Checkbox>
<Checkbox variant="success" [(ngModel)]="isSuccess">Success checkbox</Checkbox>
<Checkbox variant="warning" [(ngModel)]="isWarning">Warning checkbox</Checkbox>
<Checkbox variant="destructive" [(ngModel)]="isError">Error checkbox</Checkbox>

<!-- Different sizes -->
<Checkbox size="sm" [(ngModel)]="isSmall">Small checkbox</Checkbox>
<Checkbox size="default" [(ngModel)]="isDefault">Default checkbox</Checkbox>
<Checkbox size="lg" [(ngModel)]="isLarge">Large checkbox</Checkbox>
<Checkbox size="xl" [(ngModel)]="isXLarge">Extra large checkbox</Checkbox>

<!-- Different states -->
<Checkbox [(ngModel)]="isChecked">Checked state</Checkbox>
<Checkbox [indeterminate]="true">Indeterminate state</Checkbox>
<Checkbox [disabled]="true" [(ngModel)]="isDisabled">Disabled state</Checkbox>
```

## 🧩 Available Components (14)

### 🎨 **Core UI Components**

1. **🔲 Button** - Versatile button component with multiple variants
   - Solid, outline, ghost, and link variants
   - Different sizes: sm, default, lg, icon
   - Loading states and disabled support

2. **📐 AspectRatio** - Maintains consistent proportions for responsive content
   - Predefined ratios: square, video, 4/3, 16/9, and more
   - Custom ratio support with CSS aspect-ratio
   - Perfect for images, videos, and content containers

3. **🃏 Card** - Flexible content container
   - CardHeader, CardTitle, CardContent, CardFooter
   - Perfect for organizing content sections
   - Responsive design with customizable padding

4. **🏷️ Badge** - Labels and status indicators
   - Multiple color variants
   - Different sizes and styles
   - Perfect for status, tags, and labels

5. **⚠️ Alert** - Contextual feedback messages
   - Success, warning, error, and info variants
   - Dismissible alerts with close buttons
   - Icon support for better visual communication

6. **🚪 Alert Dialog** - Modal confirmation dialogs
   - Accessible modal implementation
   - Customizable trigger, content, and actions
   - Escape key and overlay click handling

7. **👤 Avatar** - User profile pictures and initials
   - Image support with fallback handling
   - Automatic initials generation
   - Multiple sizes: sm, default, lg, xl

8. **🗂️ Accordion** - Collapsible content panels
   - Single or multiple panel expansion
   - Smooth animations and transitions
   - Keyboard navigation support

9. **🧭 Breadcrumb** - Navigation path indicators
   - Hierarchical navigation support
   - Customizable separators and styling
   - Link and page elements with accessibility

10. **📅 Calendar** - Date picker and calendar widget
    - Month and year navigation
    - Date selection functionality
    - Customizable date formatting

11. **☑️ Checkbox** - Boolean input control with multiple states
    - Checked, unchecked, and indeterminate states
    - Multiple variants: default, destructive, success, warning
    - Different sizes: sm, default, lg, xl
    - Full form integration with ControlValueAccessor
    - Accessibility compliant with ARIA attributes

12. **🎠 Carousel** - Content slider and carousel component
    - Smooth sliding animations
    - Navigation controls and indicators
    - Responsive design with touch support

13. **🌓 Theme Switcher** - Toggle between light, dark, and system themes
    - Automatic system theme detection
    - localStorage persistence across sessions
    - Three variants: default, outline, ghost
    - Multiple sizes: sm, default, lg, xl
    - Toggle or cycle modes for theme switching

## 🖼️ Enhanced Avatar Component

The Avatar component now supports full image functionality:

```typescript
// Image source with automatic fallback
<Avatar 
  size="lg" 
  [src]="'https://github.com/shadcn.png'"
  [alt]="'User Avatar'">
</Avatar>

// Custom fallback text
<Avatar [fallback]="'JD'"></Avatar>

// Auto-generated initials from alt text
<Avatar [alt]="'John Doe'"></Avatar>

// Multiple sizes
<Avatar size="sm"></Avatar>    <!-- 32px -->
<Avatar size="default"></Avatar> <!-- 40px -->
<Avatar size="lg"></Avatar>    <!-- 48px -->
<Avatar size="xl"></Avatar>    <!-- 64px -->
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
        <Avatar 
          size="default" 
          [src]="'https://github.com/shadcn.png'"
          [alt]="'User Avatar'">
        </Avatar>
      </div>

      <!-- Alert Notification -->
      <Alert variant="default">
        <h4 class="font-medium">Welcome back!</h4>
        <p class="text-sm">You have 3 new notifications.</p>
      </Alert>

      <!-- Action Buttons -->
      <div class="flex gap-2">
        <Button variant="default">Create</Button>
        <Button variant="secondary">Save Draft</Button>
        <Button variant="destructive">Delete</Button>
      </div>

      <!-- Status Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">$12,345</div>
            <Badge variant="default" class="mt-2">+12%</Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">1,234</div>
            <Badge variant="secondary" class="mt-2">+8%</Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">5,678</div>
            <Badge variant="destructive" class="mt-2">-3%</Badge>
          </CardContent>
        </Card>
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
<Button [variant]="buttonVariant">Typed Button</Button>
<Avatar [size]="avatarSize">Typed Avatar</Avatar>
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
