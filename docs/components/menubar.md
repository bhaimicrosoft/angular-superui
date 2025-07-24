# MenuBar Component Documentation

## Overview

The MenuBar component is a professional, fully accessible navigation component built for Angular applications. It provides a complete menu system with keyboard navigation, submenus, shortcuts, and WCAG 2.1 AA compliance.

## ✨ Key Features

### 🎯 Accessibility First
- **WCAG 2.1 AA Compliant**: Full compliance with web accessibility guidelines
- **Screen Reader Compatible**: Complete ARIA support with proper roles and labels
- **Keyboard Navigation**: Full keyboard support with arrow keys, Enter, Space, Escape
- **Focus Management**: Intelligent focus handling and visual indicators
- **High Contrast Support**: Works with high contrast mode and reduced motion

### 📱 Mobile-First Design
- **Responsive Layout**: Scales perfectly from mobile to desktop
- **Touch-Friendly**: 44px minimum touch targets for mobile accessibility
- **Adaptive Positioning**: Smart menu positioning that adjusts to screen boundaries
- **Swipe-Friendly**: Optimized animations for touch interactions

### 🚀 Advanced Features
- **Multi-Level Submenus**: Unlimited nesting with proper navigation
- **Keyboard Shortcuts**: Display and handle keyboard shortcuts
- **Disabled States**: Support for disabled menu items
- **Visual Separators**: Clean organization with separators
- **Auto-Close**: Smart closing behavior on outside clicks and actions

### ⚡ Performance Optimized
- **Signal-Based**: Uses Angular signals for optimal reactivity
- **Lazy Animations**: Optimized animation loading
- **Minimal DOM**: Efficient DOM manipulation
- **Event Debouncing**: Optimized event handling
            <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem (itemClick)="handleAction('Undo')">
            Undo
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem (itemClick)="handleAction('Redo')">
            Redo
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  `
})
export class ExampleComponent {
  handleAction(action: string) {
    console.log('Action:', action);
  }
}
```

## Examples

### With Icons

```html
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Tools</MenubarTrigger>
    <MenubarContent>
      <MenubarItem [inset]="true">
        <span slot="icon">🎨</span>
        Theme Editor
      </MenubarItem>
      <MenubarItem [inset]="true">
        <span slot="icon">⚙️</span>
        Settings
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

### Different Variants

```html
<!-- Default variant -->
<Menubar variant="default">
  <!-- ... -->
</Menubar>

<!-- Glass variant -->
<Menubar variant="glass">
  <!-- ... -->
</Menubar>

<!-- Elevated variant -->
<Menubar variant="elevated">
  <!-- ... -->
</Menubar>

<!-- Minimal variant -->
<Menubar variant="minimal">
  <!-- ... -->
</Menubar>
```

### Different Sizes

```html
<!-- Small size -->
<Menubar size="sm">
  <!-- ... -->
</Menubar>

<!-- Default size -->
<Menubar size="default">
  <!-- ... -->
</Menubar>

<!-- Large size -->
<Menubar size="lg">
  <!-- ... -->
</Menubar>
```

## API Reference

### Menubar

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'glass' \| 'elevated' \| 'minimal'` | `'default'` | The visual variant of the menubar |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | The size of the menubar |
| `customClass` | `string` | `''` | Additional CSS classes |

### MenubarMenu

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `customClass` | `string` | `''` | Additional CSS classes |

### MenubarTrigger

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default'` | `'default'` | The visual variant of the trigger |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | The size of the trigger |
| `disabled` | `boolean` | `false` | Whether the trigger is disabled |
| `customClass` | `string` | `''` | Additional CSS classes |

#### Events

| Event | Type | Description |
|-------|------|-------------|
| `openChange` | `EventEmitter<boolean>` | Emitted when the menu open state changes |

### MenubarContent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'glass' \| 'elevated'` | `'default'` | The visual variant of the content |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | The size of the content |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | The preferred side to render the content |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | The alignment of the content |
| `sideOffset` | `number` | `4` | The offset from the trigger |
| `alignOffset` | `number` | `0` | The alignment offset |
| `minWidth` | `number` | `160` | The minimum width of the content |
| `customClass` | `string` | `''` | Additional CSS classes |

### MenubarItem

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'destructive'` | `'default'` | The visual variant of the item |
| `inset` | `boolean` | `false` | Whether to inset the item (for icons) |
| `disabled` | `boolean` | `false` | Whether the item is disabled |
| `shortcut` | `string` | `''` | Keyboard shortcut to display |
| `customClass` | `string` | `''` | Additional CSS classes |

#### Events

| Event | Type | Description |
|-------|------|-------------|
| `itemClick` | `EventEmitter<void>` | Emitted when the item is clicked |

### MenubarSeparator

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `customClass` | `string` | `''` | Additional CSS classes |

### MenubarShortcut

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `customClass` | `string` | `''` | Additional CSS classes |

## Accessibility

The Menubar component is built with accessibility in mind:

- **Keyboard Navigation**: Full arrow key navigation between triggers and menu items
- **ARIA Support**: Proper ARIA attributes for screen readers
- **Focus Management**: Automatic focus management for keyboard users
- **Semantic HTML**: Uses appropriate semantic elements

### Keyboard Shortcuts

- `Enter` / `Space` / `ArrowDown`: Open menu
- `Escape`: Close menu
- `ArrowLeft` / `ArrowRight`: Navigate between triggers
- `ArrowUp` / `ArrowDown`: Navigate between menu items

## Styling

The component uses Tailwind CSS classes and CSS variables for theming. You can customize the appearance by:

1. **Using variants**: Choose from predefined variants
2. **Custom classes**: Add your own classes via the `customClass` prop
3. **CSS variables**: Override the component's CSS variables
4. **Tailwind config**: Extend the default Tailwind configuration

## Notes

- Menu content is positioned absolutely and will not interfere with other page elements
- Multiple menus can be open simultaneously if needed
- The component is mobile-responsive and touch-friendly
- Icons can be added using the `slot="icon"` attribute within menu items with `inset` enabled
