# Dropdown Menu Component ⬇️

A beautiful, accessible dropdown menu for Angular, featuring multiple variants, advanced animations, mobile-first design, and full keyboard support.

---

## ✨ Features

- 🎨 **7+ Variants**: Glass, Gradient, Neon, Minimal, Floating, Elevated, and more
- 📱 **Mobile-First**: Smart positioning, touch-friendly, responsive layouts
- ♿ **Accessibility**: ARIA support, keyboard navigation, focus management
- ⚡ **Performance**: Built with Angular signals for optimal reactivity
- 🛠️ **Customizable**: Easily style with Tailwind CSS and CVA
- 🧩 **Group & Icon Support**: Menu groups, icons, badges, and descriptions
- 🔗 **No External Dependencies**: Pure Angular + Tailwind

---

## 🚀 Installation

Initialize Angular SuperUI in your project:

```bash
ngsui init
```

Add the Dropdown Menu component:

```bash
ngsui add dropdown-menu
```

---

## 🧑‍💻 Usage

Import the DropdownMenu component in your Angular component:

```typescript
import { Component } from '@angular/core';
import { DropdownMenu } from 'angular-superui';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [DropdownMenu],
  template: `
    <DropdownMenu [items]="menuItems" [triggerText]="'Menu'"></DropdownMenu>
  `
})
export class DemoComponent {
  menuItems = [
    { label: 'Profile', value: 'profile' },
    { label: 'Settings', value: 'settings' },
    { separator: true },
    { label: 'Sign Out', value: 'signout', variant: 'destructive' }
  ];
}
```

---

## 🌈 Examples

### Premium Glass Variant

```typescript
<DropdownMenu
  [items]="premiumMenuItems"
  [triggerText]="'Premium Menu'"
  triggerVariant="gradient"
  triggerSize="lg"
  variant="glass"
  size="lg"
  (itemSelect)="onItemSelect($event)"
></DropdownMenu>
```

### Developer Tools Variant

```typescript
<DropdownMenu
  [items]="developerMenuItems"
  [triggerText]="'Dev Tools'"
  triggerVariant="neon"
  triggerSize="default"
  variant="blur"
  size="default"
  (itemSelect)="onItemSelect($event)"
></DropdownMenu>
```

### User Profile Grouped Menu

```typescript
<DropdownMenu
  [menuGroups]="userProfileGroups"
  [triggerText]="'John Doe'"
  triggerVariant="glass"
  triggerSize="lg"
  variant="floating"
  size="lg"
  (itemSelect)="onItemSelect($event)"
></DropdownMenu>
```

### Minimal Clean Variant

```typescript
<DropdownMenu
  [items]="minimalMenuItems"
  [triggerText]="'Options'"
  triggerVariant="outline"
  triggerSize="sm"
  variant="minimal"
  size="sm"
  (itemSelect)="onItemSelect($event)"
></DropdownMenu>
```

---

## ⚙️ API Reference

### Inputs

| Input           | Type                                      | Default     | Description                                 |
|-----------------|-------------------------------------------|-------------|---------------------------------------------|
| `items`         | `DropdownMenuItemData[]`                  | `[]`        | Array of menu items                         |
| `menuGroups`    | `DropdownMenuGroupData[]`                 | `[]`        | Array of grouped menu items                 |
| `triggerText`   | `string`                                  | `''`        | Text for the trigger button                 |
| `triggerVariant`| `'default'\|'gradient'\|'glass'\|'neon'\|'outline'\|'secondary'\|'ghost'\|'destructive'` | `'default'` | Style variant for the trigger button        |
| `triggerSize`   | `'sm'\|'default'\|'lg'`                   | `'default'` | Size of the trigger button                  |
| `variant`       | `'glass'\|'gradient'\|'neon'\|'minimal'\|'floating'\|'elevated'` | `'glass'`   | Style variant for the dropdown menu         |
| `size`          | `'sm'\|'default'\|'lg'`                   | `'default'` | Size of the dropdown menu                   |
| `hideChevron`   | `boolean`                                 | `false`     | Hide the chevron icon in the trigger        |
| `className`     | `string`                                  | `''`        | Additional CSS classes                      |

### Outputs

| Output         | Type                        | Description                                 |
|----------------|-----------------------------|---------------------------------------------|
| `itemSelect`   | `DropdownMenuItemData`      | Emitted when a menu item is selected        |

### Item Data Interface

```typescript
interface DropdownMenuItemData {
  label: string;
  value?: string;
  icon?: string;
  description?: string;
  badge?: string;
  shortcut?: string;
  variant?: 'default' | 'destructive';
  separator?: boolean;
}
```

### Group Data Interface

```typescript
interface DropdownMenuGroupData {
  label?: string;
  items: DropdownMenuItemData[];
}
```

---

## 🛡️ Accessibility

- Full keyboard navigation (Tab, Arrow keys, Enter, Escape)
- ARIA roles and attributes for menu and items
- Focus management and visible focus ring
- Screen reader support for all menu actions

---

## 🎨 Styling & Customization

- Built with Tailwind CSS utility classes
- Easily override styles with `className` input
- Supports dark mode out of the box
- Customizable menu width, border, shadow, and more

---

## 💡 Best Practices

- Use clear, descriptive labels for menu items
- Group related actions using `menuGroups`
- Use icons and badges for visual clarity
- Test keyboard and screen reader navigation

---

## 📚 More Examples

See the full interactive demo and advanced usage in the [Dropdown Menu Demo](/dropdown-menu-demo).

---

## 📝 License

MIT © Angular SuperUI
