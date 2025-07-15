# Angular SuperUI 🚀

[![npm version](https://badge.fury.io/js/angular-superui.svg)](https://www.npmjs.com/package/angular-superui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-20%2B-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8%2B-blue.svg)](https://www.typescriptlang.org/)

A modern, beautiful, and accessible Angular UI component library built with **Tailwind CSS** and **TypeScript**. Angular SuperUI provides a comprehensive set of **25+ reusable components** that follow modern design principles and accessibility best practices.

## ✨ Features

- 🎨 **Beautiful Design** - Modern, clean components with Tailwind CSS
- 🔧 **TypeScript First** - Full type safety with Class Variance Authority
- ♿ **Accessible** - Built with accessibility in mind (ARIA compliant)
- 🎯 **Tree Shakable** - Import only what you need
- 🚀 **Angular 20+** - Built for the latest Angular features
- 📱 **Responsive** - Mobile-first design approach
- 🎭 **Customizable** - Easy theming with CSS custom properties
- 📦 **Zero Dependencies** - No external UI dependencies
- 🔄 **Form Integration** - Full Angular Forms support with ControlValueAccessor

## 📦 Installation

### Using npm

```bash
npm install angular-superui
```

### Using Angular CLI (Recommended)

```bash
ng add angular-superui
```

### Manual Setup

1. Install the package:

```bash
npm install angular-superui class-variance-authority clsx tailwind-merge
```

2. Install Tailwind CSS if not already installed:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. Configure your `tailwind.config.js`:

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
        // ... other theme colors
      },
    },
  },
  plugins: [],
}
```

4. Add Tailwind directives to your `styles.css`:

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
}
```

## 🎯 Quick Start

Import components in your Angular component:

```typescript
import { Component } from '@angular/core';
import { Button, Alert, Card, CardHeader, CardTitle, CardContent } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Button, Alert, Card, CardHeader, CardTitle, CardContent],
  template: `
    <lib-card class="w-96">
      <lib-card-header>
        <lib-card-title>Welcome to Angular SuperUI</lib-card-title>
      </lib-card-header>
      <lib-card-content>
        <lib-alert variant="success" class="mb-4">
          <h4 class="font-medium">Success!</h4>
          <p class="text-sm">Your component library is ready to use.</p>
        </lib-alert>
        <lib-button variant="default" size="lg">
          Get Started
        </lib-button>
      </lib-card-content>
    </lib-card>
  `
})
export class ExampleComponent {}
```

## 🧩 Available Components (25+)

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

### Feedback Components

- **Alert** - Contextual feedback messages
- **Badge** - Small status and labeling components
- **Progress** - Progress indicators and loading bars
- **Skeleton** - Loading placeholders

### Display Components

- **Avatar** - User profile pictures with fallbacks
  - AvatarImage, AvatarFallback

## 📚 Component Examples

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
