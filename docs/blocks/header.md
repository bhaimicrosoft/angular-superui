# Header Block 🎯

A comprehensive header component with navigation, search, user menu, and mobile support. Perfect for modern web applications requiring responsive navigation and user management.

## Features

- 🎯 **4 Variants** - Default, Ghost, Solid, Floating
- 📏 **3 Sizes** - Small, Default, Large
- 📱 **Mobile First** - Responsive design with hamburger menu and touch-friendly navigation
- 🔍 **Smart Search** - Built-in search functionality with keyboard shortcuts
- 👤 **User Management** - Complete user menu with avatar, dropdown, and customizable actions
- 🎨 **CDK Overlay** - Proper z-index layering for all dropdowns and mobile menu
- ♿ **Accessibility** - ARIA compliant with keyboard navigation and screen reader support
- 🎭 **Customizable** - Slot-based customization for actions and content
- 🔧 **TypeScript** - Full type safety with interfaces and computed properties

## Installation

Initialize Angular SuperUI in your project:

```bash
npx ngsui init
```

Add the Header Block component:

```bash
npx ngsui add block header
```

## Usage

Import the Header component in your Angular component:

```typescript
import { Component, signal } from '@angular/core';
import { Header, HeaderNavItem, HeaderUser } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Header],
  template: `
    <app-header
      [logo]="logoConfig"
      [navigation]="navItems()"
      [user]="currentUser()"
      [showSearch]="true"
      variant="default"
      size="default"
      (searchChange)="onSearch($event)"
      (userMenuAction)="onUserAction($event)">
      
      <ng-container slot="actions">
        <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
          Sign In
        </button>
      </ng-container>
    </app-header>
  `
})
export class ExampleComponent {
  logoConfig = {
    text: 'MyApp',
    icon: '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>',
    href: '/'
  };

  navItems = signal<HeaderNavItem[]>([
    { label: 'Home', routerLink: '/' },
    { label: 'About', routerLink: '/about' },
    { label: 'Contact', routerLink: '/contact' }
  ]);

  currentUser = signal<HeaderUser | null>({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://example.com/avatar.jpg'
  });

  onSearch(query: string) {
    console.log('Search:', query);
  }

  onUserAction(event: { action: string; user: HeaderUser }) {
    console.log('User action:', event.action, event.user);
  }
}
```

## Examples

### Default Header

The standard header configuration with navigation, search, and user menu.

```typescript
@Component({
  template: `
    <app-header
      [logo]="defaultLogo"
      [navigation]="navigationItems()"
      [user]="currentUser()"
      [showSearch]="true"
      variant="default"
      size="default"
      (searchChange)="onSearchChange($event)"
      (searchSubmit)="onSearchSubmit($event)"
      (userMenuAction)="onUserMenuAction($event)">
      
      <ng-container slot="actions">
        <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
          Sign In
        </button>
      </ng-container>
    </app-header>
  `
})
export class DefaultHeaderExample {
  defaultLogo = {
    text: 'SuperUI',
    icon: '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    href: '/'
  };

  navigationItems = signal<HeaderNavItem[]>([
    {
      label: 'Components',
      children: [
        { 
          label: 'Button', 
          routerLink: '/components/button', 
          icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2z"/></svg>' 
        },
        { 
          label: 'Input', 
          routerLink: '/components/input', 
          icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"/></svg>' 
        },
        { divider: true, label: '', routerLink: '', icon: '' },
        { 
          label: 'View All', 
          routerLink: '/', 
          icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>' 
        }
      ]
    },
    { label: 'Documentation', routerLink: '/docs' },
    {
      label: 'GitHub',
      href: 'https://github.com/your-org/project',
      external: true,
      target: '_blank',
      icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>'
    }
  ]);

  currentUser = signal<HeaderUser | null>({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facepad&facepad=2&w=256&h=256&q=80'
  });

  onSearchChange(value: string) {
    console.log('Search changed:', value);
  }

  onSearchSubmit(value: string) {
    console.log('Search submitted:', value);
  }

  onUserMenuAction(event: { action: string; user: HeaderUser }) {
    console.log('User action:', event.action, 'by', event.user.name);
  }
}
```

### Ghost Header

Transparent header perfect for hero sections and gradient backgrounds.

```typescript
@Component({
  template: `
    <div class="bg-gradient-to-r from-blue-500 to-purple-600">
      <app-header
        [logo]="ghostLogo"
        [navigation]="navigationItems()"
        [user]="currentUser()"
        [showSearch]="true"
        variant="ghost"
        size="default"
        (searchChange)="onSearchChange($event)"
        (userMenuAction)="onUserMenuAction($event)">
        
        <ng-container slot="actions">
          <button class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-md text-sm font-medium transition-colors backdrop-blur-sm">
            Get Started
          </button>
        </ng-container>
      </app-header>
    </div>
  `
})
export class GhostHeaderExample {
  ghostLogo = {
    text: 'SuperUI',
    icon: '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>',
    href: '/'
  };
  // ... rest of the configuration
}
```

### Floating Header

Elevated header with rounded corners and shadow for modern applications.

```typescript
@Component({
  template: `
    <div class="bg-gray-100 dark:bg-gray-800 p-8">
      <app-header
        [logo]="defaultLogo"
        [navigation]="simpleNavigation()"
        [user]="currentUser()"
        [showSearch]="false"
        variant="floating"
        size="lg"
        (userMenuAction)="onUserMenuAction($event)">
        
        <ng-container slot="actions">
          <button class="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg text-sm font-medium transition-all">
            Upgrade Pro
          </button>
        </ng-container>
      </app-header>
    </div>
  `
})
export class FloatingHeaderExample {
  simpleNavigation = signal<HeaderNavItem[]>([
    { label: 'Home', routerLink: '/' },
    { label: 'About', routerLink: '/about' },
    { label: 'Contact', routerLink: '/contact' }
  ]);
  // ... rest of the configuration
}
```

### Compact Header

Smaller header variant perfect for dashboards and admin interfaces.

```typescript
@Component({
  template: `
    <app-header
      [logo]="compactLogo"
      [navigation]="compactNavigation()"
      [user]="null"
      [showSearch]="true"
      variant="solid"
      size="sm"
      searchPlaceholder="Quick search..."
      (searchChange)="onSearchChange($event)">
      
      <ng-container slot="actions">
        <button class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm font-medium transition-colors">
          Login
        </button>
        <button class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors">
          Sign Up
        </button>
      </ng-container>
    </app-header>
  `
})
export class CompactHeaderExample {
  compactLogo = {
    text: 'UI',
    icon: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>',
    href: '/'
  };

  compactNavigation = signal<HeaderNavItem[]>([
    { label: 'Docs', routerLink: '/docs' },
    { label: 'API', routerLink: '/api' }
  ]);

  onSearchChange(value: string) {
    console.log('Quick search:', value);
  }
}
```

## Variants

### default

Standard header with border and subtle background blur.

### ghost

Transparent header perfect for overlay on images or gradients.

### solid

Solid background header with shadow for clear separation.

### floating

Elevated header with rounded corners, margins, and shadow.

## Sizes

### sm

Compact header (h-12 sm:h-14) ideal for dashboards.

### default-size

Standard header height (h-14 sm:h-16) for most applications.

### lg

Large header (h-16 sm:h-20) for prominent branding.

## API Reference

### Header Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `LogoConfig` | `undefined` | Logo configuration with text, icon, image, and links |
| `navigation` | `HeaderNavItem[]` | `[]` | Navigation menu items with support for dropdowns |
| `user` | `HeaderUser \| null` | `null` | Current user information for user menu |
| `variant` | `'default' \| 'ghost' \| 'solid' \| 'floating'` | `'default'` | Header style variant |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Header size |
| `showSearch` | `boolean` | `false` | Enable/disable search functionality |
| `searchPlaceholder` | `string` | `'Search...'` | Placeholder text for search input |
| `searchValue` | `string` | `''` | Initial search value |
| `userMenuActions` | `UserMenuAction[]` | Default actions | Customizable user menu actions |

### Header Events

| Event | Type | Description |
|-------|------|-------------|
| `searchChange` | `string` | Emitted when search input changes |
| `searchSubmit` | `string` | Emitted when search is submitted (Enter key) |
| `userMenuAction` | `{ action: string; user: HeaderUser }` | Emitted when user menu action is clicked |
| `navigationClick` | `{ item: HeaderNavItem; event: Event }` | Emitted when navigation item is clicked |

### Interfaces

#### `LogoConfig`

```typescript
interface LogoConfig {
  text?: string;           // Logo text
  image?: string;          // Logo image URL
  icon?: string;           // Logo icon (SVG string)
  href?: string;           // Logo link URL
  routerLink?: string | string[]; // Angular router link
}
```

#### `HeaderNavItem`

```typescript
interface HeaderNavItem {
  label: string;                    // Display text
  href?: string;                    // External link URL
  routerLink?: string | string[];   // Angular router link
  icon?: string;                    // Icon (SVG string)
  children?: HeaderNavItem[];       // Dropdown items
  disabled?: boolean;               // Disable the item
  external?: boolean;               // Show external link icon
  target?: '_blank' | '_self' | '_parent' | '_top'; // Link target
  divider?: boolean;                // Show as divider
}
```

#### `HeaderUser`

```typescript
interface HeaderUser {
  name: string;        // User's display name
  email?: string;      // User's email address
  avatar?: string;     // Avatar image URL
  initials?: string;   // Custom initials (auto-generated if not provided)
}
```

#### `UserMenuAction`

```typescript
interface UserMenuAction {
  label: string;       // Action display text
  icon?: string;       // Action icon (SVG string)
  action: string;      // Action identifier
  disabled?: boolean;  // Disable the action
  divider?: boolean;   // Show as divider
}
```

## Slots

### actions

Custom content slot for additional actions in the header (buttons, links, etc.).

```html
<ng-container slot="actions">
  <button class="btn btn-primary">Custom Action</button>
  <app-theme-toggle />
  <app-notifications />
</ng-container>
```

## Responsive Behavior

The Header Block is designed with mobile-first responsive principles:

- **Mobile (< lg)**:
  - Shows hamburger menu for navigation
  - Hides user avatar (user actions available in mobile menu)
  - Search can be shown/hidden based on design needs
  - Touch-friendly button sizes and spacing

- **Desktop (≥ lg)**:
  - Shows full horizontal navigation
  - Displays user avatar and dropdown
  - Search input visible if enabled
  - Hover states and interactions

## Accessibility

- **Keyboard Navigation**: Full support for Tab, Enter, Space, and Escape keys
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Visible focus indicators and logical tab order
- **Screen Reader Support**: Descriptive text and state announcements
- **Touch Targets**: Minimum 44px touch targets for mobile devices

## Mobile Menu Features

- **CDK Overlay**: Proper z-index layering above all content
- **Backdrop Click**: Close menu by clicking outside
- **Keyboard Support**: Close with Escape key
- **Smooth Animations**: Slide-down animation with easing
- **User Actions**: Include user menu actions in mobile menu when user is logged in
- **Nested Navigation**: Support for dropdown items within mobile menu

## Customization

### Custom User Menu Actions

```typescript
const customUserActions: UserMenuAction[] = [
  { 
    label: 'Dashboard', 
    icon: '<svg>...</svg>', 
    action: 'dashboard' 
  },
  { 
    label: 'Settings', 
    icon: '<svg>...</svg>', 
    action: 'settings' 
  },
  { divider: true, label: '', action: '' },
  { 
    label: 'Logout', 
    icon: '<svg>...</svg>', 
    action: 'logout' 
  }
];
```

### Custom Styling

The Header Block uses Tailwind CSS classes and can be customized using CSS custom properties or by extending the component's styling:

```css
/* Custom header styles */
.custom-header {
  --header-bg: theme('colors.blue.600');
  --header-text: theme('colors.white');
  --header-border: theme('colors.blue.700');
}
```

## Best Practices

1. **Logo Configuration**: Always provide either text or icon for accessibility
2. **Navigation Structure**: Keep navigation items to 5-7 main items for optimal UX
3. **User Management**: Handle user menu actions appropriately (logout, profile navigation)
4. **Search Implementation**: Provide feedback for search actions and handle empty states
5. **Mobile Optimization**: Test touch interactions and ensure proper spacing
6. **Accessibility**: Use semantic HTML and provide proper ARIA labels
7. **Performance**: Use OnPush change detection and Angular signals for optimal performance

## Troubleshooting

### Mobile Menu Not Appearing Above Content

Ensure the CDK Overlay is properly imported and the component has access to ViewContainerRef:

```typescript
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  imports: [OverlayModule, Header]
  // ...
})
```

### Navigation Dropdowns Not Working

Check that navigation items with children are properly structured:

```typescript
const navItem: HeaderNavItem = {
  label: 'Components',
  children: [
    { label: 'Button', routerLink: '/button' },
    { label: 'Input', routerLink: '/input' }
  ]
};
```

### Search Not Emitting Events

Ensure you're handling both `searchChange` and `searchSubmit` events:

```html
<app-header
  [showSearch]="true"
  (searchChange)="onSearchChange($event)"
  (searchSubmit)="onSearchSubmit($event)">
</app-header>
```

## Related Components

- [Button Component](../components/button.md) - For custom action buttons
- [Input Component](../components/input.md) - For advanced search implementations
- [Avatar Component](../components/avatar.md) - For user profile customization
- [Dropdown Component](../components/dropdown-menu.md) - For custom dropdown menus

## Contributing

Found a bug or want to contribute? Check out our [Contributing Guidelines](../../CONTRIBUTING.md) and submit a pull request on [GitHub](https://github.com/bhaimicrosoft/angular-superui).
