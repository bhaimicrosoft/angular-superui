# ContextMenu

A customizable context menu component that appears on right-click with full keyboard navigation and accessibility support. Built with Angular Signals and CDK Overlay for optimal performance and reliability.

## Installation

```bash
npx ngsui-cli add context-menu
```

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { ContextMenu, IContextMenuItem } from '@lib/context-menu';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ContextMenu],
  template: `
    <div class="p-6">
      <ContextMenu [items]="basicMenuItems">
        <div class="p-4 border border-dashed border-gray-300 rounded-lg text-center">
          Right-click me for a basic context menu
        </div>
      </ContextMenu>
    </div>
  `
})
export class ExampleComponent {
  basicMenuItems: IContextMenuItem[] = [
    {
      label: 'Copy',
      action: (item) => console.log('Copy action triggered'),
      shortcut: 'Ctrl+C'
    },
    {
      label: 'Paste',
      action: (item) => console.log('Paste action triggered'),
      shortcut: 'Ctrl+V'
    },
    { separator: true },
    {
      label: 'Delete',
      action: (item) => console.log('Delete action triggered'),
      shortcut: 'Del'
    }
  ];
}
```

### Advanced Example with Text Selection

```typescript
import { Component } from '@angular/core';
import { ContextMenu, IContextMenuItem } from '@lib/context-menu';

@Component({
  selector: 'app-advanced-example',
  standalone: true,
  imports: [ContextMenu],
  template: `
    <div class="space-y-6 p-6">
      <!-- Text Selection Context Menu -->
      <ContextMenu [items]="textMenuItems">
        <div class="p-4 bg-blue-50 rounded-lg">
          <p>Select this text and right-click to see text-specific options.</p>
          <p>This context menu shows different options for text manipulation.</p>
        </div>
      </ContextMenu>

      <!-- File Operations Context Menu -->
      <ContextMenu [items]="fileMenuItems">
        <div class="p-4 bg-green-50 rounded-lg">
          <p>Right-click here for file operations</p>
          <p>This area simulates a file browser context menu.</p>
        </div>
      </ContextMenu>
    </div>
  `
})
export class AdvancedExampleComponent {
  textMenuItems: IContextMenuItem[] = [
    {
      label: 'Cut',
      action: (item) => this.cutText(),
      shortcut: 'Ctrl+X'
    },
    {
      label: 'Copy',
      action: (item) => this.copyText(),
      shortcut: 'Ctrl+C'
    },
    {
      label: 'Paste',
      action: (item) => this.pasteText(),
      shortcut: 'Ctrl+V'
    },
    { separator: true },
    {
      label: 'Select All',
      action: (item) => this.selectAll(),
      shortcut: 'Ctrl+A'
    },
    {
      label: 'Find',
      action: (item) => this.openFind(),
      shortcut: 'Ctrl+F'
    }
  ];

  fileMenuItems: IContextMenuItem[] = [
    {
      label: 'New File',
      action: (item) => this.createNewFile()
    },
    {
      label: 'New Folder',
      action: (item) => this.createNewFolder()
    },
    { separator: true },
    {
      label: 'Refresh',
      action: (item) => this.refresh(),
      shortcut: 'F5'
    },
    { separator: true },
    {
      label: 'Properties',
      action: (item) => this.showProperties()
    }
  ];

  private cutText() {
    console.log('Cut text action');
  }

  private copyText() {
    console.log('Copy text action');
  }

  private pasteText() {
    console.log('Paste text action');
  }

  private selectAll() {
    console.log('Select all action');
  }

  private openFind() {
    console.log('Open find dialog');
  }

  private createNewFile() {
    console.log('Create new file');
  }

  private createNewFolder() {
    console.log('Create new folder');
  }

  private refresh() {
    console.log('Refresh view');
  }

  private showProperties() {
    console.log('Show properties dialog');
  }
}
```

### Disabled Items Example

```typescript
import { Component } from '@angular/core';
import { ContextMenu, IContextMenuItem } from '@lib/context-menu';

@Component({
  selector: 'app-disabled-example',
  standalone: true,
  imports: [ContextMenu],
  template: `
    <ContextMenu [items]="menuWithDisabledItems">
      <div class="p-4 border border-gray-300 rounded-lg">
        Right-click to see a menu with some disabled options
      </div>
    </ContextMenu>
  `
})
export class DisabledExampleComponent {
  menuWithDisabledItems: IContextMenuItem[] = [
    {
      label: 'Available Action',
      action: (item) => console.log('Available action triggered')
    },
    {
      label: 'Disabled Action',
      action: (item) => console.log('This should not execute'),
      disabled: true
    },
    { separator: true },
    {
      label: 'Another Available Action',
      action: (item) => console.log('Another action triggered')
    },
    {
      label: 'Another Disabled Action',
      disabled: true
    }
  ];
}
```

## API Reference

### ContextMenu Component

The main context menu component that wraps content and provides right-click context menu functionality.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `IContextMenuItem[]` | `[]` | Array of menu items to display in the context menu |

### IContextMenuItem Interface

Defines the structure for context menu items.

```typescript
export interface IContextMenuItem {
  label: string;                              // Display text for the menu item
  action?: (item: IContextMenuItem) => void;  // Function to execute when item is clicked
  shortcut?: string;                          // Keyboard shortcut display (e.g., 'Ctrl+C')
  separator?: boolean;                        // If true, renders as a separator line
  disabled?: boolean;                         // If true, disables the menu item
}
```

### ContextMenuService

Global service that manages context menu state across the application. Automatically injected and managed - no manual interaction required.

## Behavior

### Opening and Closing
- **Right-click**: Opens the context menu at cursor position
- **Left-click anywhere**: Closes any open context menu
- **Escape key**: Closes the context menu
- **Backdrop click**: Closes the context menu
- **Menu item click**: Executes action and closes the menu

### Positioning
- Automatically positions at cursor location
- Uses Angular CDK Overlay for optimal positioning
- Prevents menu from appearing outside viewport boundaries

### Multiple Context Menus
- Only one context menu can be open at a time
- Right-clicking a different area automatically closes the previous menu
- Seamless switching between different context menu areas

## Accessibility

The ContextMenu component includes comprehensive accessibility features:

- **ARIA Support**: Proper `role="menu"` and `role="menuitem"` attributes
- **Keyboard Navigation**:
  - `Escape` to close the menu
  - `Tab` navigation support
  - Focus management for menu items
- **Disabled State**: Proper `aria-disabled` attributes for disabled items
- **Screen Reader Support**: Semantic structure with proper ARIA roles

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Right Click` | Open context menu at cursor position |
| `Escape` | Close context menu |
| `Click outside` | Close context menu |
| `Enter` on menu item | Execute menu item action |

## Features

- **Signal-Based State Management**: Built with Angular Signals for optimal performance
- **CDK Overlay Integration**: Robust positioning and backdrop management
- **Global Service**: Centralized menu management across the application
- **Smart Positioning**: Automatically positions at cursor location
- **Auto-close Behavior**: Intelligent closing on outside clicks and key presses
- **Accessibility Compliant**: Full WCAG guidelines compliance
- **Disabled Items Support**: Visual and functional disabled state handling
- **Keyboard Shortcuts Display**: Optional shortcut text display
- **Separator Support**: Visual grouping with separator lines
- **Multiple Menu Support**: Seamless switching between different context areas
- **Browser Context Menu Prevention**: Automatically prevents browser context menu

## Architecture

The ContextMenu component uses a modern architecture with:

- **Angular Signals**: Reactive state management for optimal performance
- **CDK Overlay**: Professional overlay positioning and management
- **Global Service**: Centralized state management across components
- **Template Portal**: Efficient template rendering in overlay
- **Event Coordination**: Proper event handling and cleanup

## Browser Support

The ContextMenu component works in all modern browsers that support:
- ES6+ features
- Angular 17+
- Angular CDK
- CSS Grid and Flexbox
- Modern event handling

## Dependencies

- `@angular/cdk/overlay`
- `@angular/cdk/portal`
- `@angular/core` (signals support)
