# Angular SuperUI Color System 🎨

A comprehensive color palette system with **15+ beautiful color variants** for all components that support the `variant` property.

## 🌈 Available Color Variants

### Core Colors
- **Default** - Primary brand color (slate/gray)
- **Secondary** - Secondary brand color (light gray)
- **Destructive** - Error/danger states (red)

### Semantic Colors
- **Success** - Success states, confirmations (green)
- **Warning** - Caution, important notices (yellow/amber)
- **Info** - Informational content (blue)

### Extended Palette
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

## 🧩 Components Supporting Color Variants

### Button Component
```typescript
// Solid variants
<button variant="success">Success</button>
<button variant="warning">Warning</button>
<button variant="info">Info</button>
<button variant="purple">Purple</button>
<button variant="pink">Pink</button>
<button variant="orange">Orange</button>
<button variant="teal">Teal</button>
<button variant="indigo">Indigo</button>
<button variant="cyan">Cyan</button>
<button variant="rose">Rose</button>
<button variant="emerald">Emerald</button>
<button variant="amber">Amber</button>
<button variant="lime">Lime</button>
<button variant="violet">Violet</button>
<button variant="sky">Sky</button>

// Outline variants
<button variant="outline-success">Success</button>
<button variant="outline-warning">Warning</button>
<button variant="outline-info">Info</button>
// ... all colors available as outline variants
```

### Badge Component
```typescript
// Solid variants
<badge variant="success">Success</badge>
<badge variant="warning">Warning</badge>
<badge variant="info">Info</badge>
<badge variant="purple">Purple</badge>
<badge variant="pink">Pink</badge>
// ... all 15+ colors available

// Outline variants
<badge variant="outline-success">Success</badge>
<badge variant="outline-warning">Warning</badge>
// ... all colors available as outline variants
```

### Alert Component
```typescript
<alert variant="success">
  <h4>Success Alert</h4>
  <p>Operation completed successfully.</p>
</alert>

<alert variant="warning">
  <h4>Warning Alert</h4>
  <p>Please review your input.</p>
</alert>

<alert variant="info">
  <h4>Info Alert</h4>
  <p>Here's some helpful information.</p>
</alert>

<alert variant="purple">
  <h4>Purple Alert</h4>
  <p>Creative messaging with purple theme.</p>
</alert>

// Available for all 15+ colors
```

### Progress Component
```typescript
<progress [value]="75" variant="success"></progress>
<progress [value]="60" variant="warning"></progress>
<progress [value]="45" variant="info"></progress>
<progress [value]="80" variant="purple"></progress>
<progress [value]="90" variant="emerald"></progress>

// Available for all 15+ colors
```

## 🎨 CSS Custom Properties

All colors are defined using CSS custom properties for maximum flexibility:

```css
:root {
  /* Core Colors */
  --primary: hsl(222.2, 47.4%, 11.2%);
  --primary-foreground: hsl(210, 40%, 98%);
  --secondary: hsl(210, 40%, 96.1%);
  --secondary-foreground: hsl(222.2, 47.4%, 11.2%);
  --destructive: hsl(0, 84.2%, 60.2%);
  --destructive-foreground: hsl(210, 40%, 98%);

  /* Semantic Colors */
  --success: hsl(142, 76%, 36%);
  --success-foreground: hsl(355, 7%, 97%);
  --warning: hsl(43, 89%, 38%);
  --warning-foreground: hsl(355, 7%, 97%);
  --info: hsl(217, 91%, 60%);
  --info-foreground: hsl(355, 7%, 97%);

  /* Extended Palette */
  --purple: hsl(262, 83%, 58%);
  --purple-foreground: hsl(355, 7%, 97%);
  --pink: hsl(336, 84%, 57%);
  --pink-foreground: hsl(355, 7%, 97%);
  --orange: hsl(25, 95%, 53%);
  --orange-foreground: hsl(355, 7%, 97%);
  --teal: hsl(173, 58%, 39%);
  --teal-foreground: hsl(355, 7%, 97%);
  --indigo: hsl(234, 89%, 74%);
  --indigo-foreground: hsl(355, 7%, 97%);
  --cyan: hsl(188, 94%, 43%);
  --cyan-foreground: hsl(355, 7%, 97%);
  --rose: hsl(351, 83%, 61%);
  --rose-foreground: hsl(355, 7%, 97%);
  --emerald: hsl(160, 84%, 39%);
  --emerald-foreground: hsl(355, 7%, 97%);
  --amber: hsl(43, 96%, 56%);
  --amber-foreground: hsl(26, 83%, 14%);
  --lime: hsl(84, 81%, 44%);
  --lime-foreground: hsl(20, 14%, 4%);
  --violet: hsl(258, 90%, 66%);
  --violet-foreground: hsl(355, 7%, 97%);
  --sky: hsl(199, 89%, 48%);
  --sky-foreground: hsl(355, 7%, 97%);
}
```

## 🌙 Dark Mode Support

All colors automatically adapt to dark mode with adjusted brightness and contrast:

```css
.dark {
  --success: hsl(142, 69%, 58%);
  --success-foreground: hsl(144, 61%, 20%);
  --warning: hsl(43, 89%, 70%);
  --warning-foreground: hsl(43, 100%, 11%);
  --purple: hsl(262, 83%, 70%);
  --purple-foreground: hsl(263, 69%, 12%);
  /* ... all colors have dark mode variants */
}
```

## 🎯 Theme Switching

Use the `ThemeSelector` component for dynamic theme switching:

```typescript
import { ThemeSelector } from 'angular-superui';

@Component({
  imports: [ThemeSelector],
  template: `
    <theme-selector 
      [currentTheme]="currentTheme" 
      (themeChange)="onThemeChange($event)">
    </theme-selector>
  `
})
export class MyComponent {
  currentTheme = 'default';

  onThemeChange(theme: string) {
    this.currentTheme = theme;
    // Apply theme globally
    document.body.className = theme;
  }
}
```

## 🔧 Customization

### Custom Color Properties
Override any color by setting CSS custom properties:

```css
:root {
  --success: hsl(120, 100%, 50%); /* Custom green */
  --warning: hsl(30, 100%, 50%);  /* Custom orange */
}
```

### Tailwind Config
Colors are automatically integrated with Tailwind CSS:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
        },
        // ... all colors available
      }
    }
  }
}
```

## 📱 Best Practices

### Semantic Usage
- **Success**: Confirmations, completed actions, positive feedback
- **Warning**: Cautions, important notices, required attention
- **Info**: Additional information, neutral content
- **Destructive**: Errors, dangerous actions, negative feedback

### Extended Palette Usage
- **Purple**: Premium features, creative content
- **Pink**: Playful interfaces, feminine products
- **Orange**: Call-to-action buttons, energetic content
- **Teal**: Professional interfaces, calm interactions
- **Emerald**: Growth metrics, environmental content
- **Sky**: Open interfaces, peaceful interactions

### Accessibility
All color combinations meet WCAG AA contrast requirements:
- Light backgrounds with dark text
- Dark backgrounds with light text
- Sufficient contrast ratios (4.5:1 minimum)

## 🚀 Examples

### Multi-Color Button Group
```typescript
@Component({
  template: `
    <div class="flex flex-wrap gap-2">
      <button variant="success">Save</button>
      <button variant="warning">Draft</button>
      <button variant="info">Preview</button>
      <button variant="destructive">Delete</button>
    </div>
  `
})
```

### Status Badge System
```typescript
@Component({
  template: `
    <div class="space-y-2">
      <badge variant="success">Active</badge>
      <badge variant="warning">Pending</badge>
      <badge variant="info">Processing</badge>
      <badge variant="purple">Premium</badge>
      <badge variant="destructive">Inactive</badge>
    </div>
  `
})
```

### Progress Indicators
```typescript
@Component({
  template: `
    <div class="space-y-4">
      <div>
        <label>Health: 85%</label>
        <progress [value]="85" variant="success"></progress>
      </div>
      <div>
        <label>Loading: 45%</label>
        <progress [value]="45" variant="info"></progress>
      </div>
      <div>
        <label>Warning: 25%</label>
        <progress [value]="25" variant="warning"></progress>
      </div>
    </div>
  `
})
```

---

**🎨 With 15+ beautiful color variants, Angular SuperUI provides the flexibility to create visually stunning and semantically meaningful interfaces!**
