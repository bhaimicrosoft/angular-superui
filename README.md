# Angular SuperUI 🚀

[![npm version](https://badge.fury.io/js/angular-superui.svg)](https://www.npmjs.com/package/angular-superui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-20%2B-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8%2B-blue.svg)](https://www.typescriptlang.org/)

A modern, beautiful, and accessible Angular UI component library built with **Tailwind CSS** and **TypeScript**. Angular SuperUI provides a comprehensive set of reusable components that follow modern design principles and accessibility best practices.

## ✨ Features

- 🎨 **Beautiful Design** - Modern, clean components with Tailwind CSS
- 🔧 **TypeScript First** - Full type safety with Class Variance Authority
- ♿ **Accessible** - Built with accessibility in mind (ARIA compliant)
- 🎯 **Tree Shakable** - Import only what you need
- 🚀 **Angular 20+** - Built for the latest Angular features
- 📱 **Responsive** - Mobile-first design approach
- 🎭 **Customizable** - Easy theming with CSS custom properties
- 📦 **Zero Dependencies** - No external UI dependencies

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

## 🧩 Available Components

### Form Components
- **Button** - Customizable buttons with multiple variants
- **Input** - Text input fields with validation support
- **Textarea** - Multi-line text input
- **Label** - Accessible form labels
- **Checkbox** - Toggle checkboxes with custom styling
- **Switch** - Toggle switches for boolean values

### Layout Components
- **Card** - Flexible content containers
  - CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Separator** - Visual dividers for content sections

### Feedback Components
- **Alert** - Contextual feedback messages
- **Badge** - Small status and labeling components
- **Progress** - Progress indicators and loading bars
- **Skeleton** - Loading placeholders

### Display Components
- **Avatar** - User profile pictures with fallbacks
  - AvatarImage, AvatarFallback

## 📚 Component Examples

### Button Component

```typescript
import { Button } from 'angular-superui';

@Component({
  imports: [Button],
  template: `
    <!-- Variants -->
    <lib-button variant="default">Default</lib-button>
    <lib-button variant="destructive">Destructive</lib-button>
    <lib-button variant="outline">Outline</lib-button>
    <lib-button variant="secondary">Secondary</lib-button>
    <lib-button variant="ghost">Ghost</lib-button>
    <lib-button variant="link">Link</lib-button>

    <!-- Sizes -->
    <lib-button size="sm">Small</lib-button>
    <lib-button size="default">Default</lib-button>
    <lib-button size="lg">Large</lib-button>
    <lib-button size="icon">🚀</lib-button>
  `
})
```

### Alert Component

```typescript
import { Alert } from 'angular-superui';

@Component({
  imports: [Alert],
  template: `
    <lib-alert variant="default">
      <h4 class="font-medium">Default Alert</h4>
      <p class="text-sm">This is a default alert message.</p>
    </lib-alert>

    <lib-alert variant="destructive">
      <h4 class="font-medium">Error</h4>
      <p class="text-sm">Something went wrong!</p>
    </lib-alert>
  `
})
```

### Form Example

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Input, Label, Checkbox, Switch, Button } from 'angular-superui';

@Component({
  imports: [FormsModule, Input, Label, Checkbox, Switch, Button],
  template: `
    <form class="space-y-4">
      <div class="space-y-2">
        <lib-label htmlFor="email">Email</lib-label>
        <lib-input 
          id="email"
          type="email" 
          placeholder="Enter your email"
          [(value)]="email">
        </lib-input>
      </div>

      <div class="flex items-center space-x-2">
        <lib-checkbox id="terms" [(checked)]="acceptTerms"></lib-checkbox>
        <lib-label htmlFor="terms">Accept terms and conditions</lib-label>
      </div>

      <div class="flex items-center space-x-2">
        <lib-switch id="notifications" [(checked)]="notifications"></lib-switch>
        <lib-label htmlFor="notifications">Enable notifications</lib-label>
      </div>

      <lib-button type="submit">Submit</lib-button>
    </form>
  `
})
export class FormExampleComponent {
  email = '';
  acceptTerms = false;
  notifications = true;
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

- 📧 Email: bhaikaju@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/bhaimicrosoft/angular-superui/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/bhaimicrosoft/angular-superui/discussions)

---

Made with ❤️ by [Indranil Mukherjee](https://github.com/bhaimicrosoft)
