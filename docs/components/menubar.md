# Menubar Component 🧭

Enterprise‑grade application menu with nested submenus, keyboard navigation, and collision‑aware positioning powered by Angular CDK overlays.

## Overview

The Menubar is built with Angular 20+ standalone components and Signals. It supports horizontal/vertical layouts, nested submenus of any depth, smooth animations, and full accessibility. Positioning is handled by Angular CDK's FlexibleConnectedPositionStrategy for reliable behavior across viewports.

## ✨ Features

- ♿ Fully accessible: proper roles/ARIA, roving tabindex, keyboard support
- 🧭 Horizontal and vertical orientations
- 🪄 Nested submenus with smart overlay positioning and collision handling
- ⚡ Signals‑only API (input/output functions) and OnPush change detection
- 🎨 Tailwind v4 styling with Class Variance Authority (CVA) size variants
- 🧩 Icon, disabled, shortcuts, actions, and href support per item
- 🧱 Works great in headers, sidebars, and app shells

## 📦 Installation

Install the component with the Angular SuperUI CLI:

```bash
npx ngsui-cli add menubar
```

The CLI wires up imports and any CDK dependencies for you.

## 🚀 Quick Start

```typescript
import { Component, signal } from '@angular/core';
import { Menubar, type MenubarItemData } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Menubar],
  template: `
    <Menubar [items]="menu()" (itemSelect)="onSelect($event)" />
  `,
})
export class ExampleComponent {
  last = signal<string | null>(null);
  menu = signal<MenubarItemData[]>([
    { label: 'File', submenu: [
      { label: 'New File', shortcut: 'Ctrl+N', action: () => this.last.set('New File') },
      { label: 'Open...', shortcut: 'Ctrl+O', action: () => this.last.set('Open') },
      { label: 'Save', shortcut: 'Ctrl+S', action: () => this.last.set('Save') },
      { label: 'Export', submenu: [
        { label: 'PDF', action: () => this.last.set('Export PDF') },
        { label: 'PNG', action: () => this.last.set('Export PNG') },
        { label: 'SVG', action: () => this.last.set('Export SVG') },
      ]},
      { label: 'Exit', action: () => this.last.set('Exit') },
    ]},
    { label: 'Edit', submenu: [
      { label: 'Undo', shortcut: 'Ctrl+Z', action: () => this.last.set('Undo') },
      { label: 'Redo', shortcut: 'Ctrl+Y', action: () => this.last.set('Redo') },
      { label: 'Preferences', submenu: [
        { label: 'Appearance', action: () => this.last.set('Appearance') },
        { label: 'Shortcuts', action: () => this.last.set('Shortcuts') },
      ]},
    ]},
    { label: 'View', submenu: [
      { label: 'Zoom In', shortcut: 'Ctrl+=', action: () => this.last.set('Zoom In') },
      { label: 'Zoom Out', shortcut: 'Ctrl+-', action: () => this.last.set('Zoom Out') },
      { label: 'Toggle Sidebar', action: () => this.last.set('Toggle Sidebar') },
    ]},
    { label: 'Help', submenu: [
      { label: 'Documentation', href: 'https://angular-superui.vercel.app' },
      { label: 'Report Issue', href: 'https://github.com/bhaimicrosoft/angular-superui/issues' },
      { label: 'About', action: () => this.last.set('About') },
    ]},
  ]);

  onSelect(item: MenubarItemData) {
    this.last.set(item.label);
  }
}
```

## 🔧 Examples

### Horizontal (app shell style)

```html
<Menubar [items]="menu()" orientation="horizontal" />
```

### Vertical (sidebar style)

```html
<Menubar [items]="menu()" orientation="vertical" />
```

### Selection feedback

```html
<Menubar [items]="menu()" (itemSelect)="onSelect($event)" />
<p class="text-sm text-muted-foreground">Last action: {{ last() }}</p>
```

## 📚 API Reference

### Component

```ts
selector: 'Menubar'
standalone: true
```

#### Inputs

- items: Signal<MenubarItemData[]> — Menu model used to render items and submenus.
- orientation: 'horizontal' | 'vertical' = 'horizontal' — Layout of the menubar.
- size: 'sm' | 'md' | 'lg' = 'md' — Visual size that controls paddings and typography.

#### Outputs

- itemSelect: `Event<MenubarItemData>` — Fires when a leaf item is activated.
- openChange: `Event<boolean>` — Emits when any submenu opens or when all close.

### Menu item type

```ts
export interface MenubarItemData {
  label: string;
  icon?: string;        // SVG/HTML string (rendered with [innerHTML])
  disabled?: boolean;   // disables the item
  shortcut?: string;    // e.g. Ctrl+S
  href?: string;        // navigates on click
  action?: () => void;  // callback on select
  submenu?: MenubarItemData[]; // nested children
  ariaLabel?: string;   // optional accessible label
}
```

Notes:

- If both `href` and `action` are provided, `href` navigation takes precedence.
- Submenus open on hover and via keyboard (Enter/Space/ArrowRight/ArrowDown).

## 🎛️ Styling & Theming

- Tailwind v4 utility classes with CVA-based size variants.
- Works with your design tokens (foreground/background/border/accent).
- Animations use Angular Animations and Tailwind keyframes for smooth open/close.

Tip: Wrap the menubar in a bordered/rounded container for a toolbar look.

## ⌨️ Keyboard Support

Top-level:

- ArrowLeft / ArrowRight → move focus between top items
- Enter / Space / ArrowDown → open submenu for the focused item
- Escape → close all menus

Submenus:

- ArrowUp / ArrowDown → move between items
- ArrowRight → open nested submenu (if available)
- ArrowLeft → close current submenu and focus parent
- Enter / Space → activate focused item

## 🧠 Behavior & Accessibility

- `role="menubar"`, `role="menu"`, and `role="menuitem"` semantics with ARIA attributes (`aria-haspopup`, `aria-expanded`, `aria-controls`).
- Roving tabindex for top-level items; focus management on open/close.
- Click‑outside closes all menus; hover retains panels while moving between them.
- Only a single branch is kept open—opening another branch closes others.

## 🏗️ CDK Overlay Positioning

- Uses Angular CDK overlays with `FlexibleConnectedPositionStrategy`.
- Smart fallbacks and viewport margin ensure panels remain on screen.
- Submenus are positioned to the bottom (horizontal) or right (vertical) with automatic collision handling.

## ✅ Best Practices

- Keep labels concise; add keyboard `shortcut` where useful.
- Use `ariaLabel` when the visual label is not descriptive enough.
- Prefer `action` for app commands and `href` for navigation.

## 🧪 Testing tips

- Verify keyboard flows (open, navigate, close) using unit/integration tests.
- Assert `itemSelect` events for critical commands.
- Snapshot top/overlay DOM if you test positioning logic.

## 🔗 Related

- Dropdown Menu — contextual actions
- Tooltip — CDK overlay tips with triggers

---

Built with Angular SuperUI. If something’s missing, open an issue or a PR!
