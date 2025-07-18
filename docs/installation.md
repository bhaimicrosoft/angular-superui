# Installation Guide (v1.0.1)

Complete guide to installing and setting up Angular SuperUI in your project.

## 📚 **[🎨 Complete Component Demos & Examples →](./demo.md)**
> 🚀 **Step-by-step guides** for all 10 production-ready components with **practical examples** and **usage instructions**!

## 🚀 **Recommended: CLI Installation (Local Components)**

The recommended way to get started with Angular SuperUI v1.0.1 is using our CLI for local component installation:

```bash
# Install CLI globally
npm install -g ngsui-cli@1.0.1

# Initialize in your Angular project
ngsui-cli init

# Add specific components locally
ngsui-cli add accordion alert card aspect-ratio
```

**Benefits of CLI Installation:**
- ✅ **Zero NPM Dependencies** - No angular-superui package required
- ✅ **Local Components** - Installed directly in `./src/lib/components/`
- ✅ **50%+ Smaller Bundle** - Only the components you use
- ✅ **Full Control** - Modify components freely
- ✅ **TypeScript Path Aliases** - Automatic @lib/* setup
- ✅ **Simplified Component Names** - Clean PascalCase selectors!

## 📦 **Alternative: NPM Package Installation**

You can also install the complete package via NPM:

### Automatic Installation

```bash
ng add angular-superui@1.0.1
```

### Manual Installation

```bash
npm install angular-superui@1.0.1
```

## CLI Installation Details

### What `ngsui-cli init` does:

1. **Creates Local Structure**:
   - `./src/lib/components/` - Component installation directory
   - `./src/lib/utils/` - Utility functions (cn, etc.)

2. **Installs Dependencies**:
   - `class-variance-authority`
   - `clsx` 
   - `tailwind-merge`
   - `tailwindcss` (if not present)

3. **Configures TypeScript**:
   - Adds path aliases: `@lib/*`, `@utils/*`
   - Updates `tsconfig.json` automatically

4. **Sets Up Tailwind**:
   - Configures `styles.css` with required CSS variables

## Available Components (v1.0.1)

Angular SuperUI v1.0.1 includes **10 production-ready components**:

### 🎯 Core Components
- **🪗 [Accordion](./components/accordion.md)** - Collapsible content sections with single or multiple modes
- **🚨 [Alert](./components/alert.md)** - Contextual feedback messages with 5 variants
- **🚨 [AlertDialog](./components/alert-dialog.md)** - Modal dialogs with accessibility and focus management
- **👤 [Avatar](./components/avatar.md)** - User profile images with automatic fallback support
- **🏷️ [Badge](./components/badge.md)** - Status indicators and labels with 4 variants
- **🔘 [Button](./components/button.md)** - Interactive buttons with 9 variants and loading states

### 🧭 Navigation & Layout
- **🍞 [Breadcrumb](./components/breadcrumb.md)** - Navigation breadcrumbs with accessibility
- **🃏 [Card](./components/card.md)** - Flexible content containers with header, content, and footer
- **📐 [AspectRatio](./components/aspect-ratio.md)** - Maintains consistent proportions for responsive content

### 📅 Advanced Components
- **📅 [Calendar](./components/calendar.md)** - Date picker with month/year navigation and time selection

### CLI Commands

```bash
# Add single component
ngsui-cli add accordion

# Add multiple components
ngsui-cli add accordion alert avatar badge

# Add all components
ngsui-cli add --all

# List available components
ngsui-cli list
```

## NPM Package Installation (Alternative)

You can also install the complete component library as an NPM package:

### Step 1: Install the Package

```bash
npm install angular-superui@1.0.1
```

### Step 2: Install Peer Dependencies

```bash
npm install class-variance-authority clsx tailwind-merge
```

### Step 3: Install Tailwind CSS (if not already installed)

```bash
npm install -D @tailwindcss/postcss autoprefixer
```

### Step 4: Configure PostCSS

Create a `postcss.config.js` file in your project root:

```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

### Step 5: Update Base Styles

Replace the content of your `src/styles.css` with:

```css
@import "tailwindcss";

@layer base {
  :root {
    /* Base Theme Variables */
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

    /* Extended Color Palette */
    --success: hsl(142 76% 36%);
    --success-foreground: hsl(355 7% 97%);
    --warning: hsl(43 89% 38%);
    --warning-foreground: hsl(355 7% 97%);
    --info: hsl(217 91% 60%);
    --info-foreground: hsl(355 7% 97%);
    --purple: hsl(262 83% 58%);
    --purple-foreground: hsl(355 7% 97%);
    --pink: hsl(336 84% 57%);
    --pink-foreground: hsl(355 7% 97%);
    --orange: hsl(25 95% 53%);
    --orange-foreground: hsl(355 7% 97%);
    --teal: hsl(173 58% 39%);
    --teal-foreground: hsl(355 7% 97%);
    --indigo: hsl(234 89% 74%);
    --indigo-foreground: hsl(355 7% 97%);
    --cyan: hsl(188 94% 43%);
    --cyan-foreground: hsl(355 7% 97%);
    --rose: hsl(351 83% 61%);
    --rose-foreground: hsl(355 7% 97%);
    --emerald: hsl(160 84% 39%);
    --emerald-foreground: hsl(355 7% 97%);
    --amber: hsl(43 96% 56%);
    --amber-foreground: hsl(26 83% 14%);
    --lime: hsl(84 81% 44%);
    --lime-foreground: hsl(20 14% 4%);
    --violet: hsl(258 90% 66%);
    --violet-foreground: hsl(355 7% 97%);
    --sky: hsl(199 89% 48%);
    --sky-foreground: hsl(355 7% 97%);
  }

  .dark {
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

    /* Dark Mode Extended Colors */
    --success: hsl(142 69% 58%);
    --success-foreground: hsl(144 61% 20%);
    --warning: hsl(43 89% 70%);
    --warning-foreground: hsl(43 100% 11%);
    --info: hsl(217 91% 60%);
    --info-foreground: hsl(215 25% 27%);
    --purple: hsl(262 83% 70%);
    --purple-foreground: hsl(263 69% 12%);
    --pink: hsl(336 84% 70%);
    --pink-foreground: hsl(336 69% 14%);
    --orange: hsl(25 95% 65%);
    --orange-foreground: hsl(25 100% 6%);
    --teal: hsl(173 58% 55%);
    --teal-foreground: hsl(173 100% 11%);
    --indigo: hsl(234 89% 74%);
    --indigo-foreground: hsl(234 100% 9%);
    --cyan: hsl(188 94% 60%);
    --cyan-foreground: hsl(188 100% 9%);
    --rose: hsl(351 83% 70%);
    --rose-foreground: hsl(351 100% 14%);
    --emerald: hsl(160 84% 55%);
    --emerald-foreground: hsl(160 100% 9%);
    --amber: hsl(43 96% 70%);
    --amber-foreground: hsl(43 100% 11%);
    --lime: hsl(84 81% 60%);
    --lime-foreground: hsl(84 100% 10%);
    --violet: hsl(258 90% 75%);
    --violet-foreground: hsl(258 100% 10%);
    --sky: hsl(199 89% 65%);
    --sky-foreground: hsl(199 100% 6%);
  }

  /* Theme Color Classes */
  .theme-blue {
    --primary: hsl(217 91% 60%);
    --primary-foreground: hsl(355 7% 97%);
  }

  .theme-green {
    --primary: hsl(142 76% 36%);
    --primary-foreground: hsl(355 7% 97%);
  }

  .theme-purple {
    --primary: hsl(262 83% 58%);
    --primary-foreground: hsl(355 7% 97%);
  }

  .theme-pink {
    --primary: hsl(336 84% 57%);
    --primary-foreground: hsl(355 7% 97%);
  }

  .theme-orange {
    --primary: hsl(25 95% 53%);
    --primary-foreground: hsl(355 7% 97%);
  }

  .theme-teal {
    --primary: hsl(173 58% 39%);
    --primary-foreground: hsl(355 7% 97%);
  }

  .theme-red {
    --primary: hsl(0 84% 60%);
    --primary-foreground: hsl(355 7% 97%);
  }

  .theme-yellow {
    --primary: hsl(43 96% 56%);
    --primary-foreground: hsl(26 83% 14%);
  }

  .theme-indigo {
    --primary: hsl(234 89% 74%);
    --primary-foreground: hsl(355 7% 97%);
  }

  .theme-cyan {
    --primary: hsl(188 94% 43%);
    --primary-foreground: hsl(355 7% 97%);
  }
}

@theme {
  /* Base Colors */
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  /* Semantic Colors */
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);

  /* Extended Color Palette */
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --color-purple: var(--purple);
  --color-purple-foreground: var(--purple-foreground);
  --color-pink: var(--pink);
  --color-pink-foreground: var(--pink-foreground);
  --color-orange: var(--orange);
  --color-orange-foreground: var(--orange-foreground);
  --color-teal: var(--teal);
  --color-teal-foreground: var(--teal-foreground);
  --color-indigo: var(--indigo);
  --color-indigo-foreground: var(--indigo-foreground);
  --color-cyan: var(--cyan);
  --color-cyan-foreground: var(--cyan-foreground);
  --color-rose: var(--rose);
  --color-rose-foreground: var(--rose-foreground);
  --color-emerald: var(--emerald);
  --color-emerald-foreground: var(--emerald-foreground);
  --color-amber: var(--amber);
  --color-amber-foreground: var(--amber-foreground);
  --color-lime: var(--lime);
  --color-lime-foreground: var(--lime-foreground);
  --color-violet: var(--violet);
  --color-violet-foreground: var(--violet-foreground);
  --color-sky: var(--sky);
  --color-sky-foreground: var(--sky-foreground);

  /* Border Radius */
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);

  /* Animations */
  --animate-accordion-down: accordion-down 0.2s ease-out;
  --animate-accordion-up: accordion-up 0.2s ease-out;
  --animate-fade-in: fade-in 0.2s ease-out;
  --animate-fade-out: fade-out 0.2s ease-in;
  --animate-slide-in-from-top: slide-in-from-top 0.2s ease-out;
  --animate-slide-out-to-top: slide-out-to-top 0.2s ease-in;
  --animate-slide-in-from-bottom: slide-in-from-bottom 0.2s ease-out;
  --animate-slide-out-to-bottom: slide-out-to-bottom 0.2s ease-in;
  --animate-slide-in-from-left: slide-in-from-left 0.2s ease-out;
  --animate-slide-out-to-left: slide-out-to-left 0.2s ease-in;
  --animate-slide-in-from-right: slide-in-from-right 0.2s ease-out;
  --animate-slide-out-to-right: slide-out-to-right 0.2s ease-in;
  --animate-caret-blink: caret-blink 1.25s ease-out infinite;
  --animate-shimmer: shimmer 2s linear infinite;

  /* Box Shadows */
  --shadow-elegant: 0 4px 20px rgba(0, 0, 0, 0.08);
  --shadow-elegant-lg: 0 10px 40px rgba(0, 0, 0, 0.1);
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slide-in-from-top {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out-to-top {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

@keyframes slide-in-from-bottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out-to-bottom {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}

@keyframes slide-in-from-left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-out-to-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes slide-in-from-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-out-to-right {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

@keyframes caret-blink {
  0%, 70%, 100% {
    opacity: 1;
  }
  20%, 50% {
    opacity: 0;
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* Modal Popover Styles */
.cdk-overlay-dark-backdrop {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
}

.modal-popover-panel {
  z-index: 1000;
}
```

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
