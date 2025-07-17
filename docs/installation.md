# Installation Guide (v0.6.0)

Complete guide to installing and setting up Angular SuperUI in your project.

## 📚 **[🎨 Complete Component Demos & Examples →](./demo.md)**
> 🚀 **Step-by-step guides** for all 30+ components with **practical examples** and **usage instructions**!

## 🚀 **Recommended: CLI Installation (Local Components)**

The recommended way to get started with Angular SuperUI v0.6.0 is using our CLI for local component installation:

```bash
# Install CLI globally
npm install -g ngsui-cli@0.1.0

# Initialize in your Angular project
ngsui-cli init

# Add specific components locally
ngsui-cli add button card alert
```

**Benefits of CLI Installation:**
- ✅ **Zero NPM Dependencies** - No angular-superui package required
- ✅ **Local Components** - Installed directly in `./src/lib/components/`
- ✅ **50%+ Smaller Bundle** - Only the components you use
- ✅ **Full Control** - Modify components freely
- ✅ **TypeScript Path Aliases** - Automatic @components/* setup
- ✅ **Simplified Component Names** - No more `lib-` prefixes!

## 📦 **Alternative: NPM Package (Deprecated)**

> ⚠️ **Note**: NPM package installation is deprecated in v0.6.0. Use CLI for better performance and control.

### Automatic Installation (Deprecated)

```bash
ng add angular-superui@0.6.0
```

### Manual Installation (Deprecated)

```bash
npm install angular-superui@0.6.0
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
   - Adds path aliases: `@components/*`, `@utils/*`
   - Updates `tsconfig.json` automatically

4. **Sets Up Tailwind**:
   - Configures `tailwind.config.js`
   - Adds required CSS variables

## Manual Setup (Deprecated - NPM Package)

> ⚠️ **Note**: This method is deprecated. Use the CLI for better performance.

### Step 1: Install the Package (Deprecated)

```bash
npm install angular-superui@0.6.0
```

### Step 2: Install Peer Dependencies

```bash
npm install class-variance-authority clsx tailwind-merge
```

### Step 3: Install Tailwind CSS (if not already installed)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 4: Configure Tailwind CSS (Deprecated Method)

Update your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/angular-superui/**/*.{html,js}"
  ],
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
}
```

### Step 5: Add Base Styles

Add the following to your `src/styles.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

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
  --primary-foreground: 222.2 84% 4.9%;
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
| Angular | 20+ | ✅ |
| Angular | 19 | ✅ |
| Angular | 18 | ✅ |
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
