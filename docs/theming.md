# Theming

Customize Angular SuperUI to match your brand and design requirements.

## Overview

Angular SuperUI uses CSS custom properties (variables) for theming, making it easy to customize colors, spacing, and other design tokens. The design system is inspired by modern design principles and supports both light and dark modes out of the box.

## Default Theme

The default theme provides a clean, modern aesthetic suitable for most applications:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}
```

## Dark Mode

Enable dark mode by adding the `dark` class to your html element or using Angular's built-in theme switching:

```css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 84% 4.9%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}
```

### Implementing Dark Mode

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button 
      (click)="toggleTheme()"
      class="p-2 rounded-md border border-border">
      {{ isDark ? 'Light' : 'Dark' }} Mode
    </button>
  `
})
export class ThemeToggleComponent {
  isDark = false;

  toggleTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
```

## Custom Themes

### Creating a Custom Theme

You can create custom themes by overriding the CSS variables:

```css
/* Blue Theme */
.theme-blue {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
}

/* Green Theme */
.theme-green {
  --primary: 142.1 76.2% 36.3%;
  --primary-foreground: 355.7 100% 97.3%;
  --secondary: 138.5 76.2% 96.7%;
  --secondary-foreground: 142.1 84.2% 4.9%;
  --accent: 138.5 76.2% 96.7%;
  --accent-foreground: 142.1 84.2% 4.9%;
}

/* Purple Theme */
.theme-purple {
  --primary: 262.1 83.3% 57.8%;
  --primary-foreground: 210 40% 98%;
  --secondary: 270 5.2% 96.1%;
  --secondary-foreground: 262.1 84% 4.9%;
  --accent: 270 5.2% 96.1%;
  --accent-foreground: 262.1 84% 4.9%;
}
```

### Applying Custom Themes

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-picker',
  template: `
    <div class="flex gap-2">
      <button 
        *ngFor="let theme of themes"
        (click)="setTheme(theme.class)"
        [class]="'p-2 rounded-md border ' + (currentTheme === theme.class ? 'border-primary' : 'border-border')">
        {{ theme.name }}
      </button>
    </div>
  `
})
export class ThemePickerComponent {
  currentTheme = '';
  
  themes = [
    { name: 'Default', class: '' },
    { name: 'Blue', class: 'theme-blue' },
    { name: 'Green', class: 'theme-green' },
    { name: 'Purple', class: 'theme-purple' }
  ];

  setTheme(themeClass: string) {
    // Remove existing theme classes
    this.themes.forEach(theme => {
      if (theme.class) {
        document.documentElement.classList.remove(theme.class);
      }
    });
    
    // Add new theme class
    if (themeClass) {
      document.documentElement.classList.add(themeClass);
    }
    
    this.currentTheme = themeClass;
  }
}
```

## Color System

### Understanding HSL Values

Angular SuperUI uses HSL (Hue, Saturation, Lightness) color values:

- **Hue (0-360)**: The color wheel position
- **Saturation (0-100%)**: Color intensity
- **Lightness (0-100%)**: How light or dark the color is

Example:
```css
--primary: 221.2 83.2% 53.3%;
/* Translates to: hsl(221.2, 83.2%, 53.3%) */
```

### Color Tokens

| Token | Purpose | Example |
|-------|---------|---------|
| `background` | Page background | `#ffffff` |
| `foreground` | Primary text | `#0f172a` |
| `primary` | Primary actions | `#2563eb` |
| `secondary` | Secondary actions | `#f1f5f9` |
| `destructive` | Error/danger | `#ef4444` |
| `muted` | Subtle backgrounds | `#f8fafc` |
| `accent` | Highlight elements | `#f1f5f9` |
| `border` | Element borders | `#e2e8f0` |

## Typography

### Font Configuration

Configure fonts in your Tailwind config:

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
}
```

### Text Hierarchy

Use consistent text sizing:

```css
:root {
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
}
```

## Spacing

### Border Radius

Customize component roundness:

```css
:root {
  --radius: 0.5rem; /* Default */
  /* OR */
  --radius: 0.25rem; /* Sharp */
  --radius: 0.75rem; /* Rounded */
  --radius: 1rem; /* Very rounded */
}
```

### Component Spacing

Override component-specific spacing:

```css
/* Button padding */
.lib-button {
  --button-padding-x: 1rem;
  --button-padding-y: 0.5rem;
}

/* Input spacing */
.lib-input {
  --input-padding-x: 0.75rem;
  --input-padding-y: 0.5rem;
}
```

## Animation and Motion

### Transition Configuration

```css
:root {
  --transition-duration: 150ms;
  --transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Apply to components */
.lib-button {
  transition: all var(--transition-duration) var(--transition-timing);
}
```

### Motion Preferences

Respect user motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Advanced Theming

### Dynamic Theme Switching

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themes = {
    light: {
      'background': '0 0% 100%',
      'foreground': '222.2 84% 4.9%',
      'primary': '222.2 47.4% 11.2%',
      // ... more colors
    },
    dark: {
      'background': '222.2 84% 4.9%',
      'foreground': '210 40% 98%',
      'primary': '210 40% 98%',
      // ... more colors
    }
  };

  setTheme(themeName: keyof typeof this.themes) {
    const theme = this.themes[themeName];
    const root = document.documentElement;
    
    Object.entries(theme).forEach(([property, value]) => {
      root.style.setProperty(`--${property}`, value);
    });
  }
}
```

### CSS-in-JS Theming

For dynamic theming in components:

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'themed-button',
  template: `
    <button [style]="buttonStyles" class="px-4 py-2 rounded">
      <ng-content></ng-content>
    </button>
  `
})
export class ThemedButtonComponent {
  @Input() primaryColor = '#2563eb';
  
  get buttonStyles() {
    return {
      backgroundColor: this.primaryColor,
      color: this.getContrastColor(this.primaryColor)
    };
  }
  
  private getContrastColor(hex: string): string {
    // Simple contrast calculation
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  }
}
```

## Best Practices

1. **Consistency**: Use the design tokens consistently across your application
2. **Accessibility**: Ensure sufficient color contrast (4.5:1 for normal text)
3. **Performance**: Prefer CSS custom properties over runtime style calculations
4. **Testing**: Test your themes in different lighting conditions
5. **Documentation**: Document your custom theme tokens for team members

## Theme Examples

### Corporate Theme

```css
.theme-corporate {
  --primary: 214 100% 27%;
  --primary-foreground: 0 0% 98%;
  --secondary: 214 32% 91%;
  --accent: 214 100% 27%;
  --border: 214 32% 91%;
  --radius: 0.25rem;
}
```

### Playful Theme

```css
.theme-playful {
  --primary: 280 100% 70%;
  --primary-foreground: 0 0% 98%;
  --secondary: 280 100% 95%;
  --accent: 45 100% 70%;
  --border: 280 100% 95%;
  --radius: 1rem;
}
```
