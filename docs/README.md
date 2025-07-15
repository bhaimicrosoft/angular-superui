# Angular SuperUI Documentation

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support%20This%20Project-orange?style=flat&logo=buy-me-a-coffee)](https://buymeacoffee.com/bhaikaju)

A comprehensive Angular UI component library built with Tailwind CSS and TypeScript. Featuring **25+ beautiful components** that follow modern design principles and accessibility best practices.

## 🚀 Features

- 🎨 **Beautiful Components** - 25+ carefully crafted components with attention to detail
- ⚡ **Easy Installation** - Get started with `ng add angular-superui`
- 🌙 **Dark Mode** - Built-in support for light and dark themes
- 📱 **Responsive** - Mobile-first design approach
- 🎭 **Customizable** - Powered by Tailwind CSS and CVA (Class Variance Authority)
- 🔧 **TypeScript** - Full type safety and IntelliSense support
- ♿ **Accessible** - ARIA-compliant components following WCAG guidelines
- 🔄 **Form Integration** - Full Angular Forms support with ControlValueAccessor
- 📦 **Tree Shakable** - Import only what you need for optimal bundle size

## 📦 Quick Start

### Installation

```bash
npm install angular-superui
```

Or use our automatic setup (recommended):

```bash
ng add angular-superui
```

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { 
  Alert, Button, Input, Card, CardHeader, 
  CardTitle, CardContent, Dialog, ToastService 
} from 'angular-superui';

@Component({
  standalone: true,
  imports: [Alert, Button, Input, Card, CardHeader, CardTitle, CardContent, Dialog],
  template: `
    <lib-card class="max-w-md">
      <lib-card-header>
        <lib-card-title>Welcome to Angular SuperUI</lib-card-title>
      </lib-card-header>
      <lib-card-content>
        <lib-alert variant="success" class="mb-4">
          <h5>Success!</h5>
          <div>Your component library is ready to use!</div>
        </lib-alert>
        
        <div class="space-y-4">
          <lib-input placeholder="Enter your name" [(value)]="name"></lib-input>
          <lib-button (click)="showToast()" class="w-full">
            Show Toast Notification
          </lib-button>
        </div>
      </lib-card-content>
    </lib-card>
  `
})
export class MyComponent {
  name = '';
  
  constructor(private toastService: ToastService) {}
  
  showToast() {
    this.toastService.success('Hello!', `Welcome ${this.name || 'User'}!`);
  }
}
```

## 🧩 Component Categories

### 📝 Form Components
- [Button](./components/button.md) - Interactive buttons with multiple variants and sizes
- [Input](./components/input.md) - Text input fields with validation support
- [Textarea](./components/textarea.md) - Multi-line text input with auto-resize
- [Label](./components/label.md) - Accessible form labels
- [Checkbox](./components/checkbox.md) - Toggle checkboxes with custom styling
- [Switch](./components/switch.md) - Toggle switches for boolean values
- [Select](./components/select.md) - Dropdown selection with search capabilities
- [Radio Group](./components/radio-group.md) - Single selection from multiple options
- [Toggle](./components/toggle.md) - Toggle buttons with pressed states
- [Slider](./components/slider.md) - Range input with customizable min/max values

### 🏗️ Layout Components
- [Card](./components/card.md) - Flexible content containers with header, content, footer
- [Separator](./components/separator.md) - Visual dividers for content sections
- [Tabs](./components/tabs.md) - Tabbed navigation with content panels
- [Accordion](./components/accordion.md) - Collapsible content sections
- [Table](./components/table.md) - Data tables with comprehensive structure

### 🎭 Overlay Components
- [Dialog](./components/dialog.md) - Modal dialogs with backdrop and focus management
- [Tooltip](./components/tooltip.md) - Contextual information popups
- [Toast](./components/toast.md) - Notification messages with service integration

### 💬 Feedback Components
- [Alert](./components/alert.md) - Contextual feedback messages
- [Badge](./components/badge.md) - Small status and labeling components
- [Progress](./components/progress.md) - Progress indicators and loading bars
- [Skeleton](./components/skeleton.md) - Loading placeholders

### 🖼️ Display Components
- [Avatar](./components/avatar.md) - User profile pictures with fallbacks

## 📚 Advanced Examples

### Complete Form Example

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { 
  Card, CardHeader, CardTitle, CardContent,
  Input, Label, Select, RadioGroup, Checkbox, 
  Switch, Slider, Button, Alert 
} from 'angular-superui';

@Component({
  imports: [
    ReactiveFormsModule, Card, CardHeader, CardTitle, CardContent,
    Input, Label, Select, RadioGroup, Checkbox, Switch, Slider, Button, Alert
  ],
  template: `
    <lib-card class="max-w-lg">
      <lib-card-header>
        <lib-card-title>Complete Form Example</lib-card-title>
      </lib-card-header>
      <lib-card-content>
        <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Text Input -->
          <div class="space-y-2">
            <lib-label for="name">Full Name *</lib-label>
            <lib-input 
              id="name"
              formControlName="name"
              placeholder="Enter your full name">
            </lib-input>
          </div>

          <!-- Select Dropdown -->
          <div class="space-y-2">
            <lib-label for="country">Country</lib-label>
            <lib-select 
              id="country"
              formControlName="country"
              [options]="countries">
            </lib-select>
          </div>

          <!-- Radio Group -->
          <div class="space-y-2">
            <lib-label>Preferred Theme</lib-label>
            <lib-radio-group 
              formControlName="theme"
              [options]="themeOptions">
            </lib-radio-group>
          </div>

          <!-- Checkboxes -->
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <lib-checkbox id="newsletter" formControlName="newsletter"></lib-checkbox>
              <lib-label for="newsletter">Subscribe to newsletter</lib-label>
            </div>
            
            <div class="flex items-center space-x-2">
              <lib-switch id="notifications" formControlName="notifications"></lib-switch>
              <lib-label for="notifications">Enable push notifications</lib-label>
            </div>
          </div>

          <!-- Slider -->
          <div class="space-y-2">
            <lib-label>Volume: {{userForm.get('volume')?.value}}%</lib-label>
            <lib-slider 
              formControlName="volume"
              [min]="0" 
              [max]="100" 
              [step]="5">
            </lib-slider>
          </div>

          <!-- Success Message -->
          <lib-alert *ngIf="submitted" variant="success">
            <h5>Form Submitted!</h5>
            <div>Your preferences have been saved successfully.</div>
          </lib-alert>

          <!-- Submit Button -->
          <lib-button 
            type="submit" 
            [disabled]="userForm.invalid"
            class="w-full">
            Save Preferences
          </lib-button>
        </form>
      </lib-card-content>
    </lib-card>
  `
})
export class CompleteFormComponent {
  userForm: FormGroup;
  submitted = false;

  countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' }
  ];

  themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'System' }
  ];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      country: [''],
      theme: ['light'],
      newsletter: [false],
      notifications: [true],
      volume: [50]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);
      this.submitted = true;
      
      // Reset submitted flag after 3 seconds
      setTimeout(() => this.submitted = false, 3000);
    }
  }
}
```

### Interactive Components Showcase

```typescript
import { Component } from '@angular/core';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Tooltip, ToastService, Button, Badge 
} from 'angular-superui';

@Component({
  imports: [
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
    Tabs, TabsList, TabsTrigger, TabsContent, Accordion, AccordionItem, 
    AccordionTrigger, AccordionContent, Tooltip, Button, Badge
  ],
  template: `
    <div class="space-y-8 p-6">
      <!-- Tabs Example -->
      <section>
        <h3 class="text-lg font-semibold mb-4">Tabs Navigation</h3>
        <lib-tabs value="overview">
          <lib-tabs-list class="grid w-full grid-cols-3">
            <lib-tabs-trigger value="overview">Overview</lib-tabs-trigger>
            <lib-tabs-trigger value="analytics">Analytics</lib-tabs-trigger>
            <lib-tabs-trigger value="settings">Settings</lib-tabs-trigger>
          </lib-tabs-list>
          
          <lib-tabs-content value="overview" class="mt-4">
            <div class="rounded-lg border p-4">
              <h4 class="font-medium">Overview Content</h4>
              <p class="text-sm text-muted-foreground mt-1">
                View your dashboard overview and key metrics.
              </p>
            </div>
          </lib-tabs-content>
          
          <lib-tabs-content value="analytics" class="mt-4">
            <div class="rounded-lg border p-4">
              <h4 class="font-medium">Analytics Content</h4>
              <p class="text-sm text-muted-foreground mt-1">
                Detailed analytics and performance metrics.
              </p>
            </div>
          </lib-tabs-content>
          
          <lib-tabs-content value="settings" class="mt-4">
            <div class="rounded-lg border p-4">
              <h4 class="font-medium">Settings Content</h4>
              <p class="text-sm text-muted-foreground mt-1">
                Configure your application settings.
              </p>
            </div>
          </lib-tabs-content>
        </lib-tabs>
      </section>

      <!-- Accordion Example -->
      <section>
        <h3 class="text-lg font-semibold mb-4">Accordion</h3>
        <lib-accordion type="single" collapsible>
          <lib-accordion-item value="faq-1">
            <lib-accordion-trigger>What is Angular SuperUI?</lib-accordion-trigger>
            <lib-accordion-content>
              Angular SuperUI is a comprehensive UI component library built with Angular 20+, 
              TypeScript, and Tailwind CSS. It provides 25+ beautiful, accessible components.
            </lib-accordion-content>
          </lib-accordion-item>
          
          <lib-accordion-item value="faq-2">
            <lib-accordion-trigger>How do I install it?</lib-accordion-trigger>
            <lib-accordion-content>
              You can install Angular SuperUI using npm or the Angular CLI. 
              Run `ng add angular-superui` for automatic setup.
            </lib-accordion-content>
          </lib-accordion-item>
          
          <lib-accordion-item value="faq-3">
            <lib-accordion-trigger>Is it accessible?</lib-accordion-trigger>
            <lib-accordion-content>
              Yes! All components follow WCAG guidelines and include proper ARIA attributes 
              for screen reader compatibility.
            </lib-accordion-content>
          </lib-accordion-item>
        </lib-accordion>
      </section>

      <!-- Interactive Buttons -->
      <section>
        <h3 class="text-lg font-semibold mb-4">Interactive Elements</h3>
        <div class="flex flex-wrap gap-4">
          <!-- Dialog Trigger -->
          <lib-button (click)="showDialog = true" variant="outline">
            Open Dialog
          </lib-button>
          
          <!-- Toast Triggers -->
          <lib-tooltip content="Show success message" placement="top">
            <lib-button (click)="showSuccessToast()" variant="default">
              Success Toast
            </lib-button>
          </lib-tooltip>
          
          <lib-tooltip content="Show error message" placement="top">
            <lib-button (click)="showErrorToast()" variant="destructive">
              Error Toast
            </lib-button>
          </lib-tooltip>
          
          <lib-tooltip content="Show info message" placement="top">
            <lib-button (click)="showInfoToast()" variant="secondary">
              Info Toast
            </lib-button>
          </lib-tooltip>
        </div>
      </section>

      <!-- Status Badges -->
      <section>
        <h3 class="text-lg font-semibold mb-4">Status Indicators</h3>
        <div class="flex flex-wrap gap-2">
          <lib-badge variant="default">Active</lib-badge>
          <lib-badge variant="secondary">Pending</lib-badge>
          <lib-badge variant="destructive">Error</lib-badge>
          <lib-badge variant="outline">Draft</lib-badge>
        </div>
      </section>
    </div>

    <!-- Dialog -->
    <lib-dialog [open]="showDialog" (openChange)="showDialog = $event">
      <lib-dialog-content>
        <lib-dialog-header>
          <lib-dialog-title>Confirm Action</lib-dialog-title>
          <lib-dialog-description>
            Are you sure you want to proceed? This action cannot be undone.
          </lib-dialog-description>
        </lib-dialog-header>
        <lib-dialog-footer>
          <lib-button variant="outline" (click)="showDialog = false">
            Cancel
          </lib-button>
          <lib-button (click)="confirmAction()">
            Continue
          </lib-button>
        </lib-dialog-footer>
      </lib-dialog-content>
    </lib-dialog>
  `
})
export class InteractiveShowcaseComponent {
  showDialog = false;

  constructor(private toastService: ToastService) {}

  confirmAction() {
    this.showDialog = false;
    this.toastService.success('Confirmed!', 'Your action has been completed.');
  }

  showSuccessToast() {
    this.toastService.success('Success!', 'Operation completed successfully.');
  }

  showErrorToast() {
    this.toastService.error('Error!', 'Something went wrong. Please try again.');
  }

  showInfoToast() {
    this.toastService.info('Information', 'Here is some helpful information.');
  }
}
```

## 🎨 Theming Guide

See our [Theming Guide](./theming.md) for detailed information on customizing the appearance of components.

## 🛠️ Installation Guide

See our [Installation Guide](./installation.md) for step-by-step setup instructions.

## 📖 Individual Component Docs

Each component has detailed documentation with examples and API references. Visit the component-specific documentation for more information.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](../CONTRIBUTING.md) for details on how to get started.

## 📄 License

Angular SuperUI is open source software licensed under the MIT License.
- [Input](./components/input.md) - Text input field with validation support
- [Textarea](./components/textarea.md) - Multi-line text input
- [Label](./components/label.md) - Accessible form labels
- [Checkbox](./components/checkbox.md) - Boolean input control
- [Switch](./components/switch.md) - Toggle switch component

### Layout Components
- [Card](./components/card.md) - Flexible container for content
- [Separator](./components/separator.md) - Visual divider component

### Feedback Components
- [Alert](./components/alert.md) - Display contextual feedback messages
- [Badge](./components/badge.md) - Small status and label indicators
- [Progress](./components/progress.md) - Progress indicator with variants
- [Skeleton](./components/skeleton.md) - Loading placeholder

### Display Components
- [Avatar](./components/avatar.md) - User profile pictures and fallbacks
- [Input](./components/input.md) - Form input with built-in styling

## Installation Guide

### Prerequisites

- Angular 20+
- Node.js 18+
- Tailwind CSS (automatically configured with `ng add`)

### Manual Installation

1. **Install the package:**
   ```bash
   npm install angular-superui
   ```

2. **Install peer dependencies:**
   ```bash
   npm install class-variance-authority clsx tailwind-merge
   ```

3. **Configure Tailwind CSS:**
   
   Add to your `tailwind.config.js`:
   ```javascript
   module.exports = {
     content: [
       "./src/**/*.{html,ts}",
       "./node_modules/angular-superui/**/*.{html,js}"
     ],
     // ... rest of your config
   }
   ```

4. **Add base styles:**
   
   Add to your `src/styles.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   
   @layer base {
     :root {
       --background: 0 0% 100%;
       --foreground: 222.2 84% 4.9%;
       --primary: 222.2 47.4% 11.2%;
       --primary-foreground: 210 40% 98%;
       --secondary: 210 40% 96%;
       --secondary-foreground: 222.2 84% 4.9%;
       --destructive: 0 84.2% 60.2%;
       --destructive-foreground: 210 40% 98%;
       /* ... more CSS variables */
     }
   }
   ```

## Examples

### Basic Button Usage

```html
<lib-button>Default Button</lib-button>
<lib-button variant="secondary">Secondary</lib-button>
<lib-button variant="destructive">Destructive</lib-button>
<lib-button variant="outline">Outline</lib-button>
<lib-button variant="ghost">Ghost</lib-button>
<lib-button variant="link">Link</lib-button>
```

### Alert Variants

```html
<lib-alert variant="default">
  <h5>Default Alert</h5>
  <div>This is a default alert message.</div>
</lib-alert>

<lib-alert variant="success">
  <svg><!-- success icon --></svg>
  <h5>Success!</h5>
  <div>Your action was completed successfully.</div>
</lib-alert>

<lib-alert variant="warning">
  <svg><!-- warning icon --></svg>
  <h5>Warning</h5>
  <div>Please review your settings.</div>
</lib-alert>

<lib-alert variant="destructive">
  <svg><!-- error icon --></svg>
  <h5>Error</h5>
  <div>Something went wrong. Please try again.</div>
</lib-alert>
```

### Form Inputs

```html
<lib-input type="text" placeholder="Enter your name"></lib-input>
<lib-input type="email" placeholder="Enter your email"></lib-input>
<lib-input type="password" placeholder="Enter your password"></lib-input>
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](../LICENSE) file for details.

## Support

- 📚 [Documentation](./README.md)
- 🐛 [Issues](https://github.com/bhaimicrosoft/angular-superui/issues)
- 💬 [Discussions](https://github.com/bhaimicrosoft/angular-superui/discussions)

---

Built with ❤️ by [Indranil Mukherjee](https://github.com/bhaimicrosoft)
