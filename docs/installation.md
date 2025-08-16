<div align="center">

# 🚀 Installation Guide - Angular SuperUI v2.0.3

✨ 43 Production-Ready Components + 15 UI Blocks • TailwindCSS v4 • TypeScript • Zero Dependencies ✨**

[![🎯 Live Demo](https://img.shields.io/badge/🎯-Live%20Demo-FF6B6B?style=for-the-badge&logo=vercel&logoColor=white&labelColor=000000)](https://angular-superui.vercel.app/)
[![⚡ Get Started](https://img.shields.io/badge/⚡-Get%20Started-4ECDC4?style=for-the-badge&logo=angular&logoColor=white&labelColor=000000)](https://angular-superui.vercel.app/)

</div>

---

## 📚 **[🎨 Complete Component Demos & Examples →](./README.md)**

> 🚀 **Step-by-step examples** for all 43 components + 15 blocks with **interactive showcases**, **code snippets**, and **best practices**!

---

## ✨ **Why Choose Angular SuperUI?**

- 🎯 **Zero NPM Dependencies** - No angular-superui package required, components are installed locally
- 🛠️ **Selective Installation** - Install only what you need with our CLI tool
- 🎨 **TailwindCSS v4** - Latest Tailwind features with @import syntax
- 📦 **Local-First** - Full control over component code and customization
- ⚡ **TypeScript Native** - Built with TypeScript from the ground up
- ♿ **Accessibility First** - WCAG AA compliant components
- 🔧 **Angular 18+** - Modern Angular features and standalone components

---
## ✨ **What does the SuperUI CLI do?**

- ✅ **Installs Dependencies**: `tailwindcss@^4.1.11`, `class-variance-authority`, `clsx`, `tailwind-merge@^3.3.1`
- ✅ **Configures TailwindCSS v4**: Modern @import syntax and PostCSS setup
- ✅ **Updates Styles**: Adds CSS variables and theme configuration
- ✅ **TypeScript Paths**: Sets up @components/* and @utils/* aliases
- ✅ **Ready to Use**: Instantly ready for component installation


---

## 🚀 **Quick Start (Recommended)**

### Step 1: Install CLI Tool

```bash
# Install globally for easy access
npm install -g ngsui-cli

# Or use with npx (no installation)
npx ngsui-cli --help
```

### Step 2: Initialize Your Project

```bash
# Navigate to your Angular project root
cd your-angular-project

npx ngsui-cli init

### Step 3: Add Components

# Add individual components
npx ngsui-cli add button
npx ngsui-cli add button card badge alert

# Add all components at once
npx ngsui-cli add --all

# List available components
npx ngsui-cli list
```

---

## 🧩 **Available Components (43 Total)**

### 🎯 **Core Components**

- **🔘 [Button](./components/button.md)** - Interactive buttons with 9 variants and loading states
- **🏷️ [Badge](./components/badge.md)** - Status indicators and labels with 4 variants  
- **🚨 [Alert](./components/alert.md)** - Contextual feedback messages with 5 variants
- **👤 [Avatar](./components/avatar.md)** - User profile images with automatic fallback support
- **🪗 [Accordion](./components/accordion.md)** - Collapsible content sections with single or multiple modes
- **🃏 [Card](./components/card.md)** - Flexible content containers with header, content, and footer
- **☑️ [Checkbox](./components/checkbox.md)** - Boolean input control with multiple states and form integration
- **🔽 [ComboBox](./components/combobox.md)** - Advanced dropdown with search, multi-select, and loading states
- **🎭 [Chip](./components/chip.md)** - Interactive chip component with dismissible and clickable variants
- **📝 [Input](./components/input.md)** - Flexible input component with validation states and accessibility
- **🔢 [InputOTP](./components/input-otp.md)** - One-time password input with multiple slots and validation
- **🔘 [RadioGroup](./components/radio-group.md)** - Radio button group with accessible selection and validation
- **📊 [Progress](./components/progress.md)** - Progress indicator with customizable appearance and animation
- **⭐ [Rating](./components/rating.md)** - Interactive star rating component with hover effects and customizable appearance
- **🔽 [Select](./components/select.md)** - A flexible select dropdown component with search and multi-select capabilities
- **🎚️ [Slider](./components/slider.md)** - Interactive slider component for single values and ranges with accessibility support
- **� [Toggle](./components/toggle.md)** - Toggle switch component with multiple states and accessibility
- **�📄 [Textarea](./components/textarea.md)** - Multi-line text input component with auto-resize and validation states

### 🧭 **Navigation & Layout**

- **🍞 [Breadcrumb](./components/breadcrumb.md)** - Navigation breadcrumbs with accessibility and custom separators
- **📐 [AspectRatio](./components/aspect-ratio.md)** - Maintains consistent proportions for responsive content
- **🎯 [Icon](./components/icon.md)** - Versatile icon component supporting multiple icon libraries and sizes
- **🍔 [Menubar](./components/menubar.md)** - Application menubar with nested submenus and keyboard navigation
- **📄 [Pagination](./components/pagination.md)** - Pagination controls with customizable page size and navigation
- **🏠 [Sidebar](./components/sidebar.md)** - Responsive navigation sidebar with animations, keyboard navigation, and flexible content
- **📋 [Stepper](./components/stepper.md)** - Multi-step navigation component with progress tracking and validation support
- **📑 [Tabs](./components/tabs.md)** - Tabbed interface component with keyboard navigation and accessibility support
- **🛠️ [Toolbar](./components/toolbar.md)** - Group actions and inputs in a compact, responsive bar

### 💫 **Overlay & Dialog Components**

- **🚨 [AlertDialog](./components/alert-dialog.md)** - Modal dialogs with accessibility and focus management
- **🖱️ [ContextMenu](./components/context-menu.md)** - Right-click context menus with keyboard shortcuts
- **🪟 [Dialog](./components/dialog.md)** - Modal dialog windows with accessibility features
- **📄 [Drawer](./components/drawer.md)** - Flexible drawer component that slides in from any side
- **⬇️ [DropdownMenu](./components/dropdown-menu.md)** - Beautiful dropdown menus with multiple variants
- **💬 [Popover](./components/popover.md)** - Floating overlay that displays content relative to a trigger
- **📢 [Toast](./components/toast.md)** - Toast notification component with multiple variants and auto-dismiss functionality
- **💡 [Tooltip](./components/tooltip.md)** - Tooltip component with configurable positioning and hover/focus triggers

### 🎨 **Media & Display**

- **🎠 [Carousel](./components/carousel.md)** - Content slider with auto-play, navigation, and pagination
- **🗃️ [Collapsible](./components/collapsible.md)** - Expandable content sections with smooth animations
- **💀 [Skeleton](./components/skeleton.md)** - Loading placeholder components with customizable shapes and animations
- **⏳ [Spinner](./components/spinner.md)** - Loading spinner component with multiple variants and animations

### 📊 **Data & Tables**

- **📊 [DataTable](./components/data-table.md)** - Enterprise-grade data table with sorting, filtering, and pagination

### 📁 **File Management**

- **📁 [FileUpload](./components/file-upload.md)** - Advanced file upload component with drag-and-drop, progress tracking, and validation

### 📅 **Featured Components**

- **📅 [Calendar](./components/calendar.md)** - Advanced calendar with date range selection and time picker

### ⚙️ **Utility Components**

- **🌓 [ThemeSwitcher](./components/theme-switcher.md)** - Toggle between light, dark, and system themes

---

## 🧱 **UI Blocks (10 Total)**

Pre-built, customizable UI sections perfect for rapid prototyping and production apps.

### 🏠 **Landing Page Blocks**

- **🦸 [Hero Section](./blocks/hero-section.md)** - Stunning hero sections with CTAs, images, and animations
- **📊 [Stats Counter](./blocks/stats-counter.md)** - Animated statistics display with countup effects
- **💎 [Feature Grid](./blocks/feature-grid.md)** - Feature showcase with icons, descriptions, and layouts
- **🃏 [Feature Card](./blocks/feature-card.md)** - Individual feature cards with icons and descriptions
- **💬 [Testimonial](./blocks/testimonial.md)** - Customer testimonials with avatars and ratings

### 🏢 **Business Blocks**

- **💰 [Pricing Cards](./blocks/pricing-cards.md)** - Pricing tables with features, CTAs, and highlighting
- **👥 [Team Grid](./blocks/team-grid.md)** - Team member showcase with social links and roles

### 🔐 **Authentication Blocks**

- **🔑 [Auth Forms](./blocks/auth-forms.md)** - Login, register, and password reset forms

### 🏗️ **Layout Blocks**

- **🎯 [Header](./blocks/header.md)** - Navigation headers with menus, logos, and mobile support
- **🦶 [Footer](./blocks/footer.md)** - Footer sections with links, social icons, and company info

---

## 📋 **Prerequisites**

| Tool | Version | Status | Notes |
|------|---------|--------|-------|
| **Node.js** | 18+ | ✅ Required | LTS version recommended |
| **Angular CLI** | 17+ | ✅ Required | `npm install -g @angular/cli` |
| **Angular** | 17+ | ✅ Required | Standalone components support |
| **TypeScript** | 5.0+ | ✅ Required | Included with Angular |

---

## 🛠️ **Alternative Installation Methods**

### Method 2: NPM Package (Full Library)

```bash
# Install complete library with all components
npm install angular-superui@2.0.3

# Install peer dependencies
npm install class-variance-authority clsx tailwind-merge
```

### Method 3: Manual Setup

For maximum control over your setup:

#### 1. Install Dependencies

```bash
npm install class-variance-authority clsx tailwind-merge tailwindcss@^4.1.11
```

#### 2. Configure TailwindCSS v4

Create or update your `styles.css`:

```css
@import "tailwindcss";

@layer base {
  :root {
    /* Light Theme Variables */
    --background: hsl(0 0% 100%);
    --foreground: hsl(222.2 84% 4.9%);
    --card: hsl(0 0% 100%);
    --card-foreground: hsl(222.2 84% 4.9%);
    --popover: hsl(0 0% 100%);
    --popover-foreground: hsl(222.2 84% 4.9%);
    --primary: hsl(222.2 47.4% 11.2%);
    --primary-foreground: hsl(210 40% 98%);
    --secondary: hsl(210 40% 96.1%);
    --secondary-foreground: hsl(222.2 47.4% 11.2%);
    --muted: hsl(210 40% 96.1%);
    --muted-foreground: hsl(215.4 16.3% 46.9%);
    --accent: hsl(210 40% 96.1%);
    --accent-foreground: hsl(222.2 47.4% 11.2%);
    --destructive: hsl(0 84.2% 60.2%);
    --destructive-foreground: hsl(210 40% 98%);
    --border: hsl(214.3 31.8% 91.4%);
    --input: hsl(214.3 31.8% 91.4%);
    --ring: hsl(222.2 84% 4.9%);
    --radius: 0.5rem;
  }

  .dark {
    /* Dark Theme Variables */
    --background: hsl(222.2 84% 4.9%);
    --foreground: hsl(210 40% 98%);
    --card: hsl(222.2 84% 4.9%);
    --card-foreground: hsl(210 40% 98%);
    --popover: hsl(222.2 84% 4.9%);
    --popover-foreground: hsl(210 40% 98%);
    --primary: hsl(210 40% 98%);
    --primary-foreground: hsl(222.2 47.4% 11.2%);
    --secondary: hsl(217.2 32.6% 17.5%);
    --secondary-foreground: hsl(210 40% 98%);
    --muted: hsl(217.2 32.6% 17.5%);
    --muted-foreground: hsl(215 20.2% 65.1%);
    --accent: hsl(217.2 32.6% 17.5%);
    --accent-foreground: hsl(210 40% 98%);
    --destructive: hsl(0 62.8% 30.6%);
    --destructive-foreground: hsl(210 40% 98%);
    --border: hsl(217.2 32.6% 17.5%);
    --input: hsl(217.2 32.6% 17.5%);
    --ring: hsl(212.7 26.8% 83.9%);
  }

  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
  }
}
```

#### 3. Create PostCSS Config

Create `.postcssrc.json`:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

#### 4. Update TypeScript Paths

Add to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@components/*": ["lib/components/*"],
      "@utils/*": ["lib/utils/*"]
    }
  }
}
```

---

## 🎯 **Usage Examples**

### Basic Component Usage

```typescript
import { Component } from '@angular/core';
import { Button } from '@components/button';
import { Card, CardHeader, CardTitle, CardContent } from '@components/card';
import { Badge } from '@components/badge';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Button, Card, CardHeader, CardTitle, CardContent, Badge],
  template: `
    <Card class="w-96">
      <CardHeader>
        <CardTitle>Welcome to Angular SuperUI</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <Badge variant="default">v2.0.3</Badge>
          <Button variant="default" (click)="handleClick()">
            Get Started
          </Button>
        </div>
      </CardContent>
    </Card>
  `
})
export class ExampleComponent {
  handleClick() {
    console.log('Button clicked!');
  }
}
```

### Advanced Dashboard Example

```typescript
import { Component } from '@angular/core';
import { Button } from '@components/button';
import { Card, CardHeader, CardTitle, CardContent } from '@components/card';
import { Badge } from '@components/badge';
import { Avatar } from '@components/avatar';
import { Alert } from '@components/alert';
import { ThemeSwitcher } from '@components/theme-switcher';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    Button, Card, CardHeader, CardTitle, CardContent, 
    Badge, Avatar, Alert, ThemeSwitcher
  ],
  template: `
    <div class="p-6 space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <div class="flex items-center gap-4">
          <ThemeSwitcher />
          <Avatar 
            size="default" 
            [src]="'https://github.com/shadcn.png'"
            [alt]="'User Avatar'" />
        </div>
      </div>

      <!-- Alert -->
      <Alert variant="default">
        <h4 class="font-medium">Welcome back!</h4>
        <p class="text-sm">You have 3 new notifications.</p>
      </Alert>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
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

      <!-- Actions -->
      <div class="flex gap-2">
        <Button variant="default">Create New</Button>
        <Button variant="secondary">Export Data</Button>
        <Button variant="outline">Settings</Button>
      </div>
    </div>
  `
})
export class DashboardComponent {}
```

---

## 🔧 **CLI Commands Reference**

### Basic Commands

```bash
# Initialize project
ngsui-cli init

# Add single component
ngsui-cli add button

# Add multiple components
ngsui-cli add button card badge alert

# Add all components
ngsui-cli add --all

# List available components
ngsui-cli list

# Get help
ngsui-cli --help
```

### Advanced Options

```bash
# Force overwrite existing components
ngsui-cli add button --force

# Use with npx (no global installation)
npx ngsui-cli init
npx ngsui-cli add button
```

---

## 🌍 **Framework Compatibility**

| Framework | Version | Status | Notes |
|-----------|---------|--------|-------|
| **Angular** | 18+ | ✅ Fully Supported | Standalone components |
| **Angular** | 17 | ✅ Supported | Standalone components |
| **Angular** | 16 | ⚠️ Limited | May require adjustments |
| **Angular** | 15 | ❌ Not Supported | Standalone components required |

---

## ❓ **Troubleshooting**

### Common Issues

#### **TailwindCSS Not Working**
```bash
# Ensure TailwindCSS v4 is installed
npm install tailwindcss@^4.1.11 @tailwindcss/postcss

# Check .postcssrc.json exists
cat .postcssrc.json

# Restart development server
ng serve
```

#### **Components Not Found**
```bash
# Ensure path aliases are configured in tsconfig.json
# Check components were installed in src/lib/components/
ls src/lib/components/

# Re-run init if needed
ngsui-cli init
```

#### **TypeScript Errors**
```bash
# Ensure all dependencies are installed
npm install class-variance-authority clsx tailwind-merge

# Check TypeScript version
npx tsc --version  # Should be 5.0+
```

#### **CSS Variables Not Applied**

- ✅ Ensure styles.css has the @import "tailwindcss" at the top
- ✅ Check that CSS variables are defined in :root and .dark
- ✅ Restart your development server after changes

---

## 🚀 **Next Steps**

1. **📖 Explore Components**: Visit our [Component Documentation](./README.md)
2. **🎮 Try Live Demo**: See all components in action at [angular-superui.vercel.app](https://angular-superui.vercel.app/)
3. **💡 Get Inspired**: Check out our [Examples Gallery](./examples.md)
4. **🤝 Contribute**: Join our [GitHub Community](https://github.com/bhaimicrosoft/angular-superui)

---

## 📧 **Support & Community**

- 🐙 **GitHub**: [bhaimicrosoft/angular-superui](https://github.com/bhaimicrosoft/angular-superui)
- 📧 **Email**: [bhaikaju@gmail.com](mailto:bhaikaju@gmail.com)
- 💬 **Issues**: [Report bugs or request features](https://github.com/bhaimicrosoft/angular-superui/issues)

---

<div align="center">

### 🌟 **Star us on GitHub if Angular SuperUI helped you!** 🌟

[![GitHub Stars](https://img.shields.io/github/stars/bhaimicrosoft/angular-superui?style=for-the-badge&logo=github&color=FFD700)](https://github.com/bhaimicrosoft/angular-superui)

</div>

---

*Built with ❤️ by the Angular SuperUI Team*

## Usage

### Import Components

```typescript
import { Component } from '@angular/core';
import { Alert, Button, Input } from 'angular-superui';

@Component({
  standalone: true,
  imports: [Alert, Button, Input],
  template: `
    <div class="p-6 space-y-4">
      <button variant="primary">Primary Button</button>
      
      <alert variant="success">
        <h5>Success!</h5>
        <div>Your setup is complete!</div>
      </alert>
      
      <input type="text" placeholder="Try typing here..."></input>
    </div>
  `
})
export class AppComponent {}
```

### Module-based Projects

If you're using NgModules instead of standalone components:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Alert, Button, Input } from 'angular-superui';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Alert,
    Button,
    Input
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Framework Compatibility

| Framework | Version | Supported |
|-----------|---------|-----------|
| Angular | 18+ | ✅ |
| Angular | 17 | ✅ |
| Angular | 16 | ⚠️ Limited |
| Angular | 15 and below | ❌ |

## TypeScript Configuration

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "node"
  }
}
```

## Troubleshooting

### Common Issues

**1. Styles not applying:**

- Ensure Tailwind CSS is properly configured
- Check that Angular SuperUI is included in your Tailwind content paths
- Verify CSS variables are defined in your styles.css

**2. Components not found:**

- Make sure you've imported the components in your module/component
- Check that the package is properly installed with `npm list angular-superui`

**3. Build errors:**

- Ensure peer dependencies are installed
- Check TypeScript configuration compatibility

### Getting Help

If you encounter issues:

1. Check our [Troubleshooting Guide](./troubleshooting.md)
2. Search [existing issues](https://github.com/bhaimicrosoft/angular-superui/issues)
3. Create a [new issue](https://github.com/bhaimicrosoft/angular-superui/issues/new)

## Next Steps

- Explore our [Component Documentation](./components/)
- Learn about [Theming](./theming.md)
- Check out [Examples](./examples.md)
- Read the [Migration Guide](./migration.md) if upgrading
