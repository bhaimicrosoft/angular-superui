# Theme Switcher

A component that allows users to switch between light, dark, and system themes. Automatically persists the user's preference in localStorage and listens for system theme changes.

## Features

- **Multiple Display Modes**: Choose between toggle button, cycle button, or 3-button slider
- **Multiple Theme Support**: Switch between light, dark, and system themes
- **System Theme Detection**: Automatically detects and responds to system theme changes
- **Local Storage Persistence**: Remembers user's theme preference across sessions
- **Accessibility**: Full keyboard navigation and screen reader support
- **Customizable**: Multiple variants, sizes, and styling options
- **Zero Dependencies**: No external dependencies required

## Display Modes

The ThemeSwitcher component supports three different display modes:

1. **Toggle Mode** (`mode="toggle"`): Classic single button that toggles between light and dark
2. **Cycle Mode** (`mode="cycle"`): Single button that cycles through light → dark → system
3. **Slider Mode** (`mode="slider"`): Three separate buttons for light, dark, and system themes

## Installation

```bash
ngsui-cli add theme-switcher
```

This will add the `ThemeSwitcher` component to your project.

**Note:**  
To enable custom class-based dark mode variants in Tailwind v4, add the following line to your `styles.css` **immediately after the Tailwind import**:

```css
@import "tailwindcss";

/*To enable class based dark mode for the application*/
@custom-variant dark (&:where(.dark, .dark *));

```
This allows you to target dark mode using the `.dark` class more flexibly in your styles.

## Usage

### Basic Usage

```html
<!-- Simple theme switcher -->
<ThemeSwitcher />

<!-- With custom variant -->
<ThemeSwitcher variant="outline" />

<!-- With custom size -->
<ThemeSwitcher size="lg" />

<!-- Show current theme label -->
<ThemeSwitcher [showLabel]="true" />
```

### Theme Switching Modes

```html
<!-- Toggle mode (default): switches between light and dark -->
<ThemeSwitcher mode="toggle" />

<!-- Cycle mode: cycles through light, dark, and system -->
<ThemeSwitcher mode="cycle" />

<!-- Slider mode: three separate buttons for each theme -->
<ThemeSwitcher mode="slider" />
```

### Customization

```html
<!-- Custom styling -->
<ThemeSwitcher 
  variant="ghost" 
  size="sm" 
  class="border-2 border-dashed border-primary" />

<!-- Custom event handling -->
<ThemeSwitcher 
  (themeChanged)="onThemeChange($event)"
  (clicked)="onThemeClick()" />
```

## Component API

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'outline' \| 'ghost'` | `'default'` | Visual variant of the theme switcher |
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Size of the theme switcher |
| `mode` | `'toggle' \| 'cycle' \| 'slider'` | `'toggle'` | Switching behavior mode |
| `showLabel` | `boolean` | `false` | Whether to show the current theme label |
| `disabled` | `boolean` | `false` | Whether the theme switcher is disabled |
| `class` | `string` | `''` | Additional CSS classes to apply |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `themeChanged` | `EventEmitter<Theme>` | Emitted when the theme changes |
| `clicked` | `EventEmitter<void>` | Emitted when the theme switcher is clicked |
| `focused` | `EventEmitter<void>` | Emitted when the theme switcher receives focus |
| `blurred` | `EventEmitter<void>` | Emitted when the theme switcher loses focus |

### Theme Service

The theme switcher uses a built-in theme service that manages the application's theme state:

```typescript
import { ThemeServiceImpl } from '@lib/theme-switcher';

// Available themes
type Theme = 'light' | 'dark' | 'system';

// Service methods
themeService.setTheme(theme: Theme);
themeService.toggleTheme();
themeService.cycleTheme();

// Service signals
themeService.currentTheme(); // Current theme
themeService.systemTheme(); // System theme (light/dark)
themeService.isDarkMode(); // Whether dark mode is active
```

## Variants

### Default
The standard theme switcher with a subtle border and background.

```html
<ThemeSwitcher variant="default" />
```

### Outline
A theme switcher with a visible border and transparent background.

```html
<ThemeSwitcher variant="outline" />
```

### Ghost

A minimal theme switcher with no border, only showing on hover.

```html
<ThemeSwitcher variant="ghost" />
```

## Sizes

### Small
```html
<ThemeSwitcher size="sm" />
```

### Default
```html
<ThemeSwitcher size="default" />
```

### Large
```html
<ThemeSwitcher size="lg" />
```

### Extra Large
```html
<ThemeSwitcher size="xl" />
```

## Examples

### Theme Switcher in Navigation

```html
<nav class="flex items-center justify-between p-4">
  <h1 class="text-xl font-bold">My App</h1>
  <ThemeSwitcher variant="ghost" />
</nav>
```

### Theme Switcher with Label

```html
<div class="flex items-center gap-2">
  <span class="text-sm font-medium">Theme:</span>
  <ThemeSwitcher [showLabel]="true" mode="cycle" />
</div>
```

### Programmatic Theme Control

```typescript
import { Component, inject } from '@angular/core';
import { ThemeServiceImpl } from '@lib/theme-switcher';

@Component({
  template: `
    <ThemeSwitcher (themeChanged)="onThemeChange($event)" />
    <p>Current theme: {{ themeService.currentTheme() }}</p>
    <p>Dark mode: {{ themeService.isDarkMode() }}</p>
  `
})
export class MyComponent {
  themeService = inject(ThemeServiceImpl);

  onThemeChange(theme: Theme) {
    console.log('Theme changed to:', theme);
  }
}
```

## Accessibility

The theme switcher component includes comprehensive accessibility features:

- **Keyboard Navigation**: Full keyboard support with Tab and Enter/Space keys
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators and proper focus handling
- **State Announcement**: Screen readers announce theme changes
- **High Contrast**: Works well with high contrast mode

## Styling

The theme switcher uses Tailwind CSS classes and can be customized with CSS custom properties:

```css
/* Custom theme switcher styles */
.custom-theme-switcher {
  --theme-switcher-bg: theme(colors.blue.500);
  --theme-switcher-hover: theme(colors.blue.600);
  --theme-switcher-text: theme(colors.white);
}
```

## Browser Support

The theme switcher component works in all modern browsers:

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Notes

- The theme switcher automatically applies the selected theme to the document root
- System theme detection uses the `prefers-color-scheme` media query
- Theme preferences are stored in localStorage and persist across sessions
- The component is fully reactive and updates immediately when the theme changes


