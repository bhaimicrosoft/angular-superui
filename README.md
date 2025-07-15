# Angular SuperUI v0.4.2 🚀

[![npm version](https://badge.fury.io/js/angular-superui.svg)](https://www.npmjs.com/package/angular-superui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-20%2B-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8%2B-blue.svg)](https://www.typescriptlang.org/)

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support%20This%20Project-orange?style=flat&logo=buy-me-a-coffee)](https://buymeacoffee.com/bhaikaju)

A modern, beautiful, and accessible Angular UI component library built with **Tailwind CSS** and **TypeScript**. Angular SuperUI provides a comprehensive set of **30+ reusable components** with **15+ color variants**, **CLI tool for selective installation**, and **enhanced dark mode support** that follow modern design principles and accessibility best practices.

## 🛠️ **NEW v0.4.2: CLI Tool & Enhanced Features**

### 🎯 **NEW: CLI Tool - Like shadcn/ui**
```bash
# Install CLI globally for selective component installation
npm install -g angular-superui-cli

# Initialize new project
npx angular-superui init

# Add specific components (reduces bundle size by 40%+)
npx angular-superui add button card badge

# Interactive component selection
npx angular-superui add

# List all available components
npx angular-superui list
```

### 🌙 **Enhanced Dark Mode System**
- **System Theme Detection**: Automatic light/dark mode based on OS preference
- **Theme Persistence**: Remembers user choice across browser sessions
- **Instant Toggle**: Switch themes without page reload
- **All Components**: Complete dark mode support across 30+ components
- **Theme Persistence**: Remembers user's theme choice across sessions
- **Enhanced ThemeSelector**: Now includes light/dark/system mode switching
- **11+ Predefined Themes**: Beautiful color combinations ready to use

### 📊 **Previous v0.2.1 Features**
- **🌈 15+ Color Variants**: Extended palette with success, warning, info, purple, pink, orange, teal, indigo, cyan, rose, emerald, amber, lime, violet, and sky
- **🎯 Enhanced Avatar Component**: Full image support with automatic fallbacks and error handling
- **🎭 11 Theme Options**: Dynamic theme switching with beautiful color combinations
- **🔧 30+ Button Variants**: Solid and outline variants for every color
- **📊 Complete Component Coverage**: All components now support the extended color system
- **♿ WCAG AA Compliant**: All color combinations meet accessibility standards

## ✨ Features

- 🎨 **Beautiful Design** - Modern, clean components with Tailwind CSS
- 🌈 **15+ Color Variants** - Extended color palette for all component variants
- 🎭 **11 Theme Options** - Dynamic theme switching with ThemeSelector component
- 🌙 **Enhanced Dark Mode** - System detection, persistent storage, and seamless switching
- �️ **CLI Tool** - Selective component installation like shadcn/ui (`angular-superui-cli`)
- �🔧 **TypeScript First** - Full type safety with Class Variance Authority
- ♿ **Accessible** - Built with accessibility in mind (ARIA compliant, WCAG AA)
- 🎯 **Tree Shakable** - Import only what you need (especially with CLI)
- 🚀 **Angular 20+** - Built for the latest Angular features
- 📱 **Responsive** - Mobile-first design approach
- 🖼️ **Enhanced Avatar** - Image support with automatic fallbacks and error handling
- 📦 **Zero Dependencies** - No external UI dependencies
- 🔄 **Form Integration** - Full Angular Forms support with ControlValueAccessor
- 🎯 **Command Palette** - VS Code-style command interface
- 📅 **Date Picker** - Full calendar integration with form support
- 📱 **Responsive Panels** - Sheet/drawer components for mobile-first design
- ✅ **Fixed Tailwind Classes** - All color variants now use proper numeric values (e.g., `bg-lime-500`)

## 📦 Installation

### 🚀 Using CLI (Recommended - New!)

Install the CLI for selective component installation:

```bash
npm install -g angular-superui-cli
```

Initialize in your Angular project:

```bash
angular-superui init
```

Add specific components:

```bash
# Add individual components
angular-superui add button
angular-superui add calendar
angular-superui add dialog

# List all available components
angular-superui list
```

### Using npm (Full Library)

```bash
npm install angular-superui
```

### Using Angular CLI

```bash
ng add angular-superui
```

### Manual Setup

1. Install the package:

```bash
npm install angular-superui class-variance-authority clsx tailwind-merge --legacy-peer-deps
```

2. Install Tailwind CSS 3.x:

```bash
npm install -D tailwindcss@3 --legacy-peer-deps
npx tailwindcss init -p
```

3. Configure your `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{html,ts}",
    "./projects/**/*.{html,ts}",
    "./node_modules/angular-superui/**/*.{js,ts}"
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
```

4. Add complete CSS setup to your `styles.scss` or `styles.css`:

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

5. Create utility function in `src/lib/utils/cn.ts`:

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: hsl(0 0% 100%);
    --foreground: hsl(222.2 47.4% 11.2%);
    --primary: hsl(222.2 47.4% 11.2%);
    --primary-foreground: hsl(210 40% 98%);
    /* ... other CSS variables */
  }
  
  .dark {
    --background: hsl(224 71% 4%);
    --foreground: hsl(213 31% 91%);
    --primary: hsl(210 40% 98%);
    --primary-foreground: hsl(222.2 47.4% 1.2%);
    /* ... dark mode CSS variables */
  }
}
```

### 🌙 Dark Mode Setup

Enable dark mode in your `tailwind.config.js`:

```javascript
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/angular-superui/**/*.{js,ts}"
  ],
  // ... rest of config
}
```

Add dark mode toggle to your app:

```typescript
// In your component
toggleDarkMode() {
  const html = document.documentElement;
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
}
```

## 🎯 Quick Start

Import components in your Angular component:

```typescript
import { Component } from '@angular/core';
import { 
  Button, 
  Alert, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  ThemeSelector,
  Calendar,
  DatePicker,
  Command,
  Breadcrumb
} from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    Button, 
    Alert, 
    Card, 
    CardHeader, 
    CardTitle, 
    CardContent,
    ThemeSelector,
    Calendar,
    DatePicker,
    Command,
    Breadcrumb
  ],
  template: `
    <!-- Theme Selector -->
    <lib-theme-selector class="fixed top-4 right-4" />
    
    <!-- Breadcrumb Navigation -->
    <lib-breadcrumb 
      [items]="breadcrumbItems" 
      class="mb-6"
      maxItems="3">
    </lib-breadcrumb>
    
    <!-- Main Content Card -->
    <lib-card class="w-96">
      <lib-card-header>
        <lib-card-title>Welcome to Angular SuperUI v0.3.0</lib-card-title>
      </lib-card-header>
      <lib-card-content>
        <lib-alert variant="success" class="mb-4">
          <h4 class="font-medium">New Features Added!</h4>
          <p class="text-sm">Calendar, Command Palette, Sheet, Popover, and Breadcrumb components.</p>
        </lib-alert>
        
        <!-- Date Picker -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Select Date:</label>
          <lib-date-picker [(ngModel)]="selectedDate" />
        </div>
        
        <lib-button variant="default" size="lg">
          Get Started
        </lib-button>
      </lib-card-content>
    </lib-card>
  `
})
export class ExampleComponent {
  selectedDate = new Date();
  breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Getting Started' }
  ];
}
```

## 🎨 Color System & Theming (FIXED!)

Angular SuperUI now provides **proper Tailwind CSS classes** for all color variants:

### ✅ **Fixed Color Variants**
All components now use correct Tailwind CSS classes with numeric values:
- **Buttons**: `bg-lime-500 text-white hover:bg-lime-600`
- **Badges**: `bg-purple-500 text-white hover:bg-purple-600` 
- **Alerts**: `border-green-200 bg-green-50 text-green-800`
- **Progress**: `bg-blue-500`, `bg-teal-500`, etc.

### 🎯 **15+ Color Variants Available**
```html
<!-- Solid Button Variants -->
<lib-button variant="success">Success</lib-button>
<lib-button variant="warning">Warning</lib-button>
<lib-button variant="info">Info</lib-button>
<lib-button variant="purple">Purple</lib-button>
<lib-button variant="pink">Pink</lib-button>
<lib-button variant="orange">Orange</lib-button>
<lib-button variant="teal">Teal</lib-button>
<lib-button variant="indigo">Indigo</lib-button>
<lib-button variant="cyan">Cyan</lib-button>
<lib-button variant="rose">Rose</lib-button>
<lib-button variant="emerald">Emerald</lib-button>
<lib-button variant="amber">Amber</lib-button>
<lib-button variant="lime">Lime</lib-button>
<lib-button variant="violet">Violet</lib-button>
<lib-button variant="sky">Sky</lib-button>

<!-- Outline Button Variants -->
<lib-button variant="outline-success">Outline Success</lib-button>
<lib-button variant="outline-purple">Outline Purple</lib-button>
<lib-button variant="outline-lime">Outline Lime</lib-button>
```

### 🌈 **Badge Color Examples**
```html
<lib-badge variant="success">Success Badge</lib-badge>
<lib-badge variant="purple">Purple Badge</lib-badge>
<lib-badge variant="outline-lime">Outline Lime</lib-badge>
```

### 📢 **Alert Color Examples**  
```html
<lib-alert variant="success">Success message with proper green colors!</lib-alert>
<lib-alert variant="purple">Purple alert with proper colors!</lib-alert>
<lib-alert variant="lime">Lime alert - now properly styled!</lib-alert>
```

### 📊 **Progress Color Examples**
```html
<lib-progress [value]="75" variant="success" />
<lib-progress [value]="60" variant="purple" />
<lib-progress [value]="90" variant="lime" />
```

### 🌈 15+ Beautiful Color Variants

Angular SuperUI now includes a comprehensive color system with **15+ gorgeous color variants** available across all components:

#### Core Colors
- **Default** - Primary brand color (slate/gray)
- **Secondary** - Secondary brand color  
- **Destructive** - Error/danger states (red)

#### Semantic Colors
- **Success** - Success states, confirmations (green)
- **Warning** - Caution, important notices (yellow/amber)
- **Info** - Informational content (blue)

#### Extended Creative Palette
- **Purple** - Creative, premium features
- **Pink** - Playful, feminine designs
- **Orange** - Energetic, call-to-action
- **Teal** - Professional, calm
- **Indigo** - Deep, sophisticated
- **Cyan** - Fresh, modern
- **Rose** - Romantic, gentle
- **Emerald** - Natural, growth
- **Amber** - Warm, inviting
- **Lime** - Fresh, vibrant
- **Violet** - Luxurious, artistic
- **Sky** - Open, peaceful

### 🎭 Dynamic Theme Switching

Use the new `ThemeSelector` component for beautiful theme switching:

```typescript
import { ThemeSelector } from 'angular-superui';

@Component({
  imports: [ThemeSelector],
  template: `
    <lib-theme-selector 
      [currentTheme]="currentTheme" 
      (themeChange)="onThemeChange($event)">
    </lib-theme-selector>
  `
})
export class MyComponent {
  currentTheme = 'default';

  onThemeChange(theme: string) {
    this.currentTheme = theme;
    document.body.className = theme;
  }
}
```

**Available Themes**: Default, Blue, Green, Purple, Pink, Orange, Teal, Red, Yellow, Indigo, Cyan

### 🖼️ Enhanced Avatar Component

The Avatar component now supports image sources with automatic fallback:

```typescript
import { Avatar } from 'angular-superui';

@Component({
  imports: [Avatar],
  template: `
    <!-- With image source -->
    <lib-avatar 
      size="lg" 
      [src]="'https://github.com/shadcn.png'"
      [alt]="'User Avatar'">
    </lib-avatar>
    
    <!-- With fallback text -->
    <lib-avatar size="default" [fallback]="'JD'"></lib-avatar>
    
    <!-- Auto-generated initials -->
    <lib-avatar [alt]="'John Doe'"></lib-avatar>
  `
})
```

### 🔧 30+ Button Variants

```typescript
// Solid color variants (15+ colors)
<lib-button variant="success">Success</lib-button>
<lib-button variant="purple">Purple</lib-button>
<lib-button variant="emerald">Emerald</lib-button>

// Outline variants (15+ colors)  
<lib-button variant="outline-info">Info Outline</lib-button>
<lib-button variant="outline-pink">Pink Outline</lib-button>
<lib-button variant="outline-teal">Teal Outline</lib-button>
```

All Badge, Alert, and Progress components support the same 15+ color variants!

## 🧩 Available Components (30+)

### Form Components

- **Button** - Customizable buttons with multiple variants
- **Input** - Text input fields with validation support
- **Textarea** - Multi-line text input with auto-resize
- **Label** - Accessible form labels
- **Checkbox** - Toggle checkboxes with custom styling
- **Switch** - Toggle switches for boolean values
- **Select** - Dropdown selection with search capabilities
- **Radio Group** - Single selection from multiple options
- **Toggle** - Toggle buttons with pressed states
- **Slider** - Range input with customizable min/max values

### Layout Components

- **Card** - Flexible content containers
  - CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Separator** - Visual dividers for content sections
- **Tabs** - Tabbed navigation with content panels
  - TabsList, TabsTrigger, TabsContent
- **Accordion** - Collapsible content sections
  - AccordionItem, AccordionTrigger, AccordionContent
- **Table** - Data tables with sorting and filtering
  - TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption

### Overlay Components

- **Dialog** - Modal dialogs with backdrop
  - DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter
- **Tooltip** - Contextual information popups
- **Toast** - Notification messages with service integration
  - ToastContainer, ToastService
- **Popover** - Contextual content overlay with flexible positioning
  - PopoverTrigger, PopoverContent, PopoverSimple
- **Sheet/Drawer** - Slide-out panels for mobile-responsive designs
  - SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger, SheetClose

### Feedback Components

- **Alert** - Contextual feedback messages
- **Badge** - Small status and labeling components
- **Progress** - Progress indicators and loading bars
- **Skeleton** - Loading placeholders

### Display Components

- **Avatar** - Enhanced user profile pictures with image source support, automatic fallbacks, and error handling
  - Full image URL support with `src` property
  - Automatic initials generation from `alt` text
  - Custom fallback text with `fallback` property
  - Error handling for failed image loads
  - Multiple size variants: sm, default, lg, xl
- **Calendar & Date Picker** - Full calendar with date selection and form integration
  - Calendar component with month navigation
  - DatePicker with popover integration
  - Form support with ControlValueAccessor

### Navigation Components

- **Breadcrumb** - Navigation breadcrumbs with ellipsis support
  - BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis
- **Command Palette** - VS Code-style command/search interface
  - CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut, CommandDialog

### Utility Components

- **ThemeSelector** - Enhanced theme switching with light/dark/system modes and persistence
- **Separator** - Visual dividers for content sections

## �️ CLI Usage

After installation, you can use the CLI to manage components:

### Initialize a new project
```bash
npx angular-superui init
```

### Add specific components
```bash
# Add a single component
npx angular-superui add button

# Add multiple components
npx angular-superui add button card badge

# Interactive selection
npx angular-superui add
```

### List available components
```bash
npx angular-superui list
```

## �📚 Component Examples

### Advanced Form Example

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  Card, CardHeader, CardTitle, CardContent,
  Input, Label, Select, RadioGroup, Checkbox, 
  Switch, Slider, Button 
} from 'angular-superui';

@Component({
  imports: [FormsModule, Card, CardHeader, CardTitle, CardContent, Input, Label, Select, RadioGroup, Checkbox, Switch, Slider, Button],
  template: `
    <lib-card class="max-w-md">
      <lib-card-header>
        <lib-card-title>User Preferences</lib-card-title>
      </lib-card-header>
      <lib-card-content class="space-y-6">
        <!-- Text Input -->
        <div class="space-y-2">
          <lib-label>Full Name</lib-label>
          <lib-input 
            placeholder="Enter your name"
            [(ngModel)]="formData.name">
          </lib-input>
        </div>

        <!-- Select Dropdown -->
        <div class="space-y-2">
          <lib-label>Country</lib-label>
          <lib-select 
            [options]="countries"
            [(ngModel)]="formData.country">
          </lib-select>
        </div>

        <!-- Radio Group -->
        <div class="space-y-2">
          <lib-label>Theme Preference</lib-label>
          <lib-radio-group 
            [options]="themes"
            [(ngModel)]="formData.theme">
          </lib-radio-group>
        </div>

        <!-- Checkboxes -->
        <div class="space-y-2">
          <lib-checkbox 
            [(ngModel)]="formData.newsletter">
          </lib-checkbox>
          <lib-label>Subscribe to newsletter</lib-label>
        </div>

        <!-- Switch -->
        <div class="flex items-center space-x-2">
          <lib-switch [(ngModel)]="formData.notifications"></lib-switch>
          <lib-label>Enable notifications</lib-label>
        </div>

        <!-- Slider -->
        <div class="space-y-2">
          <lib-label>Volume: {{formData.volume}}%</lib-label>
          <lib-slider 
            [min]="0" 
            [max]="100" 
            [(ngModel)]="formData.volume">
          </lib-slider>
        </div>

        <lib-button class="w-full">Save Preferences</lib-button>
      </lib-card-content>
    </lib-card>
  `
})
export class AdvancedFormComponent {
  formData = {
    name: '',
    country: '',
    theme: 'light',
    newsletter: false,
    notifications: true,
    volume: 50
  };

  countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' }
  ];

  themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto' }
  ];
}
```

### Interactive Components Example

```typescript
import { Component } from '@angular/core';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Tooltip, ToastService, Button 
} from 'angular-superui';

@Component({
  imports: [Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Tabs, TabsList, TabsTrigger, TabsContent, Accordion, AccordionItem, AccordionTrigger, AccordionContent, Tooltip, Button],
  template: `
    <!-- Tabs -->
    <lib-tabs value="profile">
      <lib-tabs-list>
        <lib-tabs-trigger value="profile">Profile</lib-tabs-trigger>
        <lib-tabs-trigger value="account">Account</lib-tabs-trigger>
        <lib-tabs-trigger value="settings">Settings</lib-tabs-trigger>
      </lib-tabs-list>
      
      <lib-tabs-content value="profile">
        <p>Manage your profile information here.</p>
      </lib-tabs-content>
    </lib-tabs>

    <!-- Accordion -->
    <lib-accordion type="single" collapsible>
      <lib-accordion-item value="item-1">
        <lib-accordion-trigger>Is it accessible?</lib-accordion-trigger>
        <lib-accordion-content>
          Yes. It adheres to the WAI-ARIA design pattern.
        </lib-accordion-content>
      </lib-accordion-item>
    </lib-accordion>

    <!-- Dialog -->
    <lib-button (click)="showDialog = true">Open Dialog</lib-button>
    <lib-dialog [open]="showDialog" (openChange)="showDialog = $event">
      <lib-dialog-content>
        <lib-dialog-header>
          <lib-dialog-title>Are you sure?</lib-dialog-title>
          <lib-dialog-description>
            This action cannot be undone.
          </lib-dialog-description>
        </lib-dialog-header>
        <lib-dialog-footer>
          <lib-button variant="outline" (click)="showDialog = false">
            Cancel
          </lib-button>
          <lib-button (click)="confirmAction()">Continue</lib-button>
        </lib-dialog-footer>
      </lib-dialog-content>
    </lib-dialog>

    <!-- Tooltip -->
    <lib-tooltip content="This is a helpful tooltip" placement="top">
      <lib-button variant="outline">Hover me</lib-button>
    </lib-tooltip>

    <!-- Toast Triggers -->
    <div class="space-x-2">
      <lib-button (click)="showSuccessToast()">Success</lib-button>
      <lib-button (click)="showErrorToast()" variant="destructive">Error</lib-button>
    </div>
  `
})
export class InteractiveComponent {
  showDialog = false;

  constructor(private toastService: ToastService) {}

  confirmAction() {
    this.showDialog = false;
    this.toastService.success('Confirmed!', 'Action completed successfully.');
  }

  showSuccessToast() {
    this.toastService.success('Success!', 'Operation completed.');
  }

  showErrorToast() {
    this.toastService.error('Error!', 'Something went wrong.');
  }
}
```

### Data Table Example

```typescript
import { Component } from '@angular/core';
import { 
  Table, TableHeader, TableBody, TableRow, 
  TableHead, TableCell, TableCaption,
  Badge, Button 
} from 'angular-superui';

@Component({
  imports: [Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption, Badge, Button],
  template: `
    <lib-table>
      <lib-table-caption>Recent transactions</lib-table-caption>
      <lib-table-header>
        <lib-table-row>
          <lib-table-head>ID</lib-table-head>
          <lib-table-head>Description</lib-table-head>
          <lib-table-head>Status</lib-table-head>
          <lib-table-head class="text-right">Amount</lib-table-head>
          <lib-table-head>Actions</lib-table-head>
        </lib-table-row>
      </lib-table-header>
      <lib-table-body>
        <lib-table-row *ngFor="let transaction of transactions">
          <lib-table-cell>{{transaction.id}}</lib-table-cell>
          <lib-table-cell>{{transaction.description}}</lib-table-cell>
          <lib-table-cell>
            <lib-badge [variant]="getBadgeVariant(transaction.status)">
              {{transaction.status}}
            </lib-badge>
          </lib-table-cell>
          <lib-table-cell class="text-right">
            {{transaction.amount | currency}}
          </lib-table-cell>
          <lib-table-cell>
            <lib-button size="sm" variant="outline">View</lib-button>
          </lib-table-cell>
        </lib-table-row>
      </lib-table-body>
    </lib-table>
  `
})
export class DataTableComponent {
  transactions = [
    { id: 'TXN001', description: 'Payment received', status: 'completed', amount: 250.00 },
    { id: 'TXN002', description: 'Subscription fee', status: 'pending', amount: -15.00 },
    { id: 'TXN003', description: 'Refund processed', status: 'failed', amount: 75.00 },
  ];

  getBadgeVariant(status: string) {
    switch (status) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  }
}
```

## 🎨 Theming

Angular SuperUI uses CSS custom properties for theming. You can customize the appearance by overriding these variables:

```css
:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(222.2 47.4% 11.2%);
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
  --background: hsl(222.2 84% 4.9%);
  --foreground: hsl(210 40% 98%);
  /* ... dark theme variables */
}
```

## 🔧 Services

### ToastService

The ToastService provides a simple way to show notifications:

```typescript
import { ToastService } from 'angular-superui';

constructor(private toastService: ToastService) {}

// Show different types of toasts
showSuccess() {
  this.toastService.success('Success!', 'Operation completed successfully.');
}

showError() {
  this.toastService.error('Error!', 'Something went wrong.');
}

showWarning() {
  this.toastService.warning('Warning!', 'Please review your input.');
}

showInfo() {
  this.toastService.info('Info', 'Here is some information.');
}

// Custom toast with duration
showCustom() {
  this.toastService.show({
    title: 'Custom Toast',
    description: 'This will disappear in 10 seconds',
    variant: 'default',
    duration: 10000
  });
}
```

Don't forget to add the ToastContainer to your app:

```typescript
import { ToastContainer } from 'angular-superui';

@Component({
  imports: [ToastContainer],
  template: `
    <!-- Your app content -->
    <lib-toast-container></lib-toast-container>
  `
})
export class AppComponent {}
```

## 🚀 Development

### Project Setup

```bash
# Clone the repository
git clone https://github.com/bhaimicrosoft/angular-superui.git
cd angular-superui

# Install dependencies
npm install

# Build the library
npm run build:lib

# Start the showcase application
npm start
```

### Build Commands

```bash
# Build the library
npm run build:lib

# Build in watch mode
npm run build:lib:watch

# Start showcase application
npm start

# Run tests
npm test

# Pack the library
npm run pack:lib
```

## 📄 Documentation

For detailed documentation and examples, visit our [documentation site](docs/README.md).

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes.

## 📋 Requirements

- Angular 20.0+
- TypeScript 5.8+
- Tailwind CSS 3.0+

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [shadcn/ui](https://ui.shadcn.com/)
- Built with [Angular](https://angular.io/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Type-safe variants with [Class Variance Authority](https://cva.style/)

## 📞 Support

- 📧 Email: <bhaikaju@gmail.com>
- 🐛 Issues: [GitHub Issues](https://github.com/bhaimicrosoft/angular-superui/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/bhaimicrosoft/angular-superui/discussions)

---

Made with ❤️ by [Indranil Mukherjee](https://github.com/bhaimicrosoft)
