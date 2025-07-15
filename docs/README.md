# Angular SuperUI

A modern Angular UI component library built with Tailwind CSS and TypeScript.

## Features

- 🎨 **Beautiful Components** - Carefully crafted with attention to detail
- ⚡ **Easy Installation** - Get started with `ng add angular-superui`
- 🌙 **Dark Mode** - Built-in support for light and dark themes
- 📱 **Responsive** - Mobile-first design approach
- 🎭 **Customizable** - Powered by Tailwind CSS and CVA
- 🔧 **TypeScript** - Full type safety and IntelliSense support

## Quick Start

### Installation

```bash
npm install angular-superui
```

Or use our automatic setup:

```bash
ng add angular-superui
```

### Usage

```typescript
import { Alert, Button, Input } from 'angular-superui';

@Component({
  standalone: true,
  imports: [Alert, Button, Input],
  template: `
    <lib-button variant="primary">Click me</lib-button>
    <lib-alert variant="success">
      <h5>Success!</h5>
      <div>Your operation completed successfully.</div>
    </lib-alert>
  `
})
export class MyComponent {}
```

## Components

### Form Components
- [Button](./components/button.md) - Interactive button with multiple variants and sizes
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
