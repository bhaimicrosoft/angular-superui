# Header Block Component

A comprehensive, enterprise-ready header component that provides complete navigation solutions for modern Angular applications. This is a UI Block component that combines multiple elements into ready-to-use header layouts.

## Features

- **Complete Navigation Solutions** - Pre-built header layouts with logo, navigation, search, and user menus
- **Mobile-First Design** - Responsive layouts with hamburger menu and touch-friendly interactions
- **Multiple Variants** - Default, ghost, solid, and floating header styles
- **Flexible Content Slots** - Customizable logo, navigation, search, and actions areas
- **Accessibility Built-in** - ARIA labels, keyboard navigation, and screen reader support
- **User Management** - Built-in user avatar, dropdown menu, and authentication actions
- **Search Integration** - Optional search bar with customizable placeholder and events
- **Dropdown Navigation** - Support for nested menu items with smooth animations
- **Theme Support** - Works seamlessly with light/dark themes

## Installation

```bash
ng add @bhairignesh/angular-superui
```

Or install manually:

```bash
npm install @bhairignesh/angular-superui
```

## Basic Usage

### Simple Header

```typescript
import { Component } from '@angular/core';
import { Header, HeaderNavItem, HeaderUser } from '@bhairignesh/angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Header],
  template: `
    <app-header
      [logo]="logo"
      [navigation]="navItems"
      variant="default"
      size="default">
    </app-header>
  `
})
export class ExampleComponent {
  logo = {
    text: 'MyApp',
    href: '/',
    icon: '<svg>...</svg>' // Optional logo icon
  };

  navItems: HeaderNavItem[] = [
    { label: 'Home', routerLink: '/' },
    { label: 'About', routerLink: '/about' },
    { label: 'Contact', routerLink: '/contact' }
  ];
}
```

### Header with Search and User Menu

```typescript
@Component({
  template: `
    <app-header
      [logo]="logo"
      [navigation]="navItems"
      [user]="currentUser"
      [showSearch]="true"
      [userMenuActions]="userActions"
      searchPlaceholder="Search documentation..."
      (searchChange)="onSearch($event)"
      (searchSubmit)="onSearchSubmit($event)"
      (userMenuAction)="onUserAction($event)">
      
      <!-- Custom actions slot -->
      <ng-container slot="actions">
        <button class="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Sign In
        </button>
      </ng-container>
    </app-header>
  `
})
export class HeaderWithUserComponent {
  logo = {
    text: 'Enterprise App',
    image: '/assets/logo.svg',
    routerLink: '/dashboard'
  };

  currentUser: HeaderUser = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/assets/avatar.jpg'
  };

  userActions = [
    { label: 'Profile', icon: '<svg>...</svg>', action: 'profile' },
    { label: 'Settings', icon: '<svg>...</svg>', action: 'settings' },
    { divider: true, label: '', action: '' },
    { label: 'Sign Out', icon: '<svg>...</svg>', action: 'signout' }
  ];

  onSearch(query: string) {
    // Handle search input
    console.log('Search:', query);
  }

  onSearchSubmit(query: string) {
    // Handle search submission
    this.performSearch(query);
  }

  onUserAction(event: { action: string; user: HeaderUser }) {
    switch (event.action) {
      case 'profile':
        this.router.navigate(['/profile']);
        break;
      case 'settings':
        this.router.navigate(['/settings']);
        break;
      case 'signout':
        this.authService.signOut();
        break;
    }
  }
}
```

### Header with Dropdown Navigation

```typescript
@Component({
  template: `
    <app-header
      [logo]="logo"
      [navigation]="complexNavItems"
      variant="solid"
      size="lg">
    </app-header>
  `
})
export class ComplexHeaderComponent {
  complexNavItems: HeaderNavItem[] = [
    { label: 'Home', routerLink: '/' },
    {
      label: 'Products',
      children: [
        { label: 'Web Apps', routerLink: '/products/web' },
        { label: 'Mobile Apps', routerLink: '/products/mobile' },
        { label: 'Desktop Apps', routerLink: '/products/desktop' }
      ]
    },
    {
      label: 'Resources',
      children: [
        { label: 'Documentation', href: '/docs', external: true },
        { label: 'Blog', routerLink: '/blog' },
        { label: 'Support', href: 'mailto:support@example.com', external: true }
      ]
    },
    { label: 'Pricing', routerLink: '/pricing' }
  ];
}
```

## API Reference

### Header Component

#### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `logo` | `HeaderLogo` | `undefined` | Logo configuration with text, image, or icon |
| `navigation` | `HeaderNavItem[]` | `[]` | Array of navigation items |
| `user` | `HeaderUser \| null` | `null` | Current user information |
| `variant` | `'default' \| 'ghost' \| 'solid' \| 'floating'` | `'default'` | Header visual variant |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Header size |
| `showSearch` | `boolean` | `false` | Whether to show search bar |
| `searchPlaceholder` | `string` | `'Search...'` | Search input placeholder text |
| `searchValue` | `string` | `''` | Current search value |
| `userMenuActions` | `HeaderUserAction[]` | Default actions | User menu action items |

#### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `searchChange` | `string` | Emitted when search input changes |
| `searchSubmit` | `string` | Emitted when search is submitted |
| `userMenuAction` | `{ action: string; user: HeaderUser }` | Emitted when user menu item is clicked |
| `navigationClick` | `{ item: HeaderNavItem; event: Event }` | Emitted when navigation item is clicked |

### Interfaces

#### HeaderLogo

```typescript
interface HeaderLogo {
  text?: string;           // Logo text
  image?: string;          // Logo image URL
  icon?: string;           // Logo icon SVG string
  href?: string;           // Logo link URL
  routerLink?: string | string[]; // Angular router link
}
```

#### HeaderNavItem

```typescript
interface HeaderNavItem {
  label: string;           // Navigation item label
  href?: string;           // External URL
  routerLink?: string | string[]; // Angular router link
  icon?: string;           // Item icon SVG string
  children?: HeaderNavItem[]; // Nested navigation items
  disabled?: boolean;      // Whether item is disabled
  external?: boolean;      // Whether link is external
  target?: '_blank' | '_self' | '_parent' | '_top'; // Link target
}
```

#### HeaderUser

```typescript
interface HeaderUser {
  name: string;            // User's full name
  email?: string;          // User's email address
  avatar?: string;         // Avatar image URL
  initials?: string;       // Custom initials (auto-generated if not provided)
}
```

#### HeaderUserAction

```typescript
interface HeaderUserAction {
  label: string;           // Action label
  icon?: string;           // Action icon SVG string
  action: string;          // Action identifier
  disabled?: boolean;      // Whether action is disabled
  divider?: boolean;       // Whether to show divider after this item
}
```

## Styling & Customization

### CSS Variables

The header component uses CSS custom properties for theming:

```css
.header {
  --header-bg: theme(colors.background);
  --header-border: theme(colors.border);
  --header-text: theme(colors.foreground);
  --header-hover: theme(colors.accent);
}
```

### Custom Classes

Add custom styles by targeting the component classes:

```css
/* Custom header styling */
.custom-header app-header {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

/* Custom navigation item styling */
.custom-header .nav-item {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Custom user avatar styling */
.custom-header .user-avatar {
  border: 2px solid theme(colors.primary);
}
```

### Variants

#### Default
```html
<app-header variant="default">
```
Standard header with border and backdrop blur.

#### Ghost
```html
<app-header variant="ghost">
```
Transparent header with no border or background.

#### Solid
```html
<app-header variant="solid">
```
Header with solid background and shadow.

#### Floating
```html
<app-header variant="floating">
```
Floating header with rounded corners and shadow.

### Sizes

#### Small
```html
<app-header size="sm">
```
Compact header (height: 48px).

#### Default
```html
<app-header size="default">
```
Standard header (height: 64px).

#### Large
```html
<app-header size="lg">
```
Large header (height: 80px).

## Advanced Examples

### Multi-Brand Header

```typescript
@Component({
  template: `
    <app-header
      [logo]="currentBrand.logo"
      [navigation]="currentBrand.navigation"
      [user]="user"
      [showSearch]="true"
      variant="solid">
      
      <ng-container slot="actions">
        <select 
          [(ngModel)]="selectedBrand" 
          (change)="switchBrand($event)"
          class="px-3 py-1 border rounded-md">
          <option value="brand1">Brand 1</option>
          <option value="brand2">Brand 2</option>
        </select>
      </ng-container>
    </app-header>
  `
})
export class MultiBrandHeaderComponent {
  selectedBrand = 'brand1';
  
  brands = {
    brand1: {
      logo: { text: 'Brand One', image: '/assets/brand1-logo.svg' },
      navigation: [
        { label: 'Products', routerLink: '/brand1/products' },
        { label: 'Services', routerLink: '/brand1/services' }
      ]
    },
    brand2: {
      logo: { text: 'Brand Two', image: '/assets/brand2-logo.svg' },
      navigation: [
        { label: 'Solutions', routerLink: '/brand2/solutions' },
        { label: 'Support', routerLink: '/brand2/support' }
      ]
    }
  };

  get currentBrand() {
    return this.brands[this.selectedBrand as keyof typeof this.brands];
  }

  switchBrand(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedBrand = target.value;
    // Update routing, theme, etc.
  }
}
```

### Internationalized Header

```typescript
@Component({
  template: `
    <app-header
      [logo]="logo"
      [navigation]="translatedNavigation"
      [user]="user"
      [searchPlaceholder]="searchPlaceholder"
      [showSearch]="true">
      
      <ng-container slot="actions">
        <select 
          [(ngModel)]="currentLanguage"
          (change)="changeLanguage($event)"
          class="px-3 py-1 border rounded-md">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </ng-container>
    </app-header>
  `
})
export class I18nHeaderComponent {
  currentLanguage = 'en';

  translations = {
    en: {
      nav: [
        { label: 'Home', routerLink: '/' },
        { label: 'About', routerLink: '/about' },
        { label: 'Contact', routerLink: '/contact' }
      ],
      searchPlaceholder: 'Search...'
    },
    es: {
      nav: [
        { label: 'Inicio', routerLink: '/' },
        { label: 'Acerca', routerLink: '/about' },
        { label: 'Contacto', routerLink: '/contact' }
      ],
      searchPlaceholder: 'Buscar...'
    },
    fr: {
      nav: [
        { label: 'Accueil', routerLink: '/' },
        { label: 'À propos', routerLink: '/about' },
        { label: 'Contact', routerLink: '/contact' }
      ],
      searchPlaceholder: 'Rechercher...'
    }
  };

  get translatedNavigation() {
    return this.translations[this.currentLanguage as keyof typeof this.translations].nav;
  }

  get searchPlaceholder() {
    return this.translations[this.currentLanguage as keyof typeof this.translations].searchPlaceholder;
  }

  changeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.currentLanguage = target.value;
    // Update app language, reload translations, etc.
  }
}
```

### Progressive Web App Header

```typescript
@Component({
  template: `
    <app-header
      [logo]="logo"
      [navigation]="navigation"
      [user]="user"
      [showSearch]="true"
      variant="solid">
      
      <ng-container slot="actions">
        @if (showInstallPrompt) {
          <button 
            (click)="installPWA()"
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Install App</span>
          </button>
        }
        
        @if (isOffline) {
          <div class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm">
            Offline
          </div>
        }
      </ng-container>
    </app-header>
  `
})
export class PWAHeaderComponent implements OnInit {
  showInstallPrompt = false;
  isOffline = false;
  private deferredPrompt: any;

  ngOnInit() {
    // Listen for PWA install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallPrompt = true;
    });

    // Listen for offline/online status
    window.addEventListener('online', () => this.isOffline = false);
    window.addEventListener('offline', () => this.isOffline = true);
    this.isOffline = !navigator.onLine;
  }

  async installPWA() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        this.showInstallPrompt = false;
      }
      
      this.deferredPrompt = null;
    }
  }
}
```

## Best Practices

### Navigation Structure

```typescript
// Good: Clear hierarchy and logical grouping
const navigation: HeaderNavItem[] = [
  { label: 'Dashboard', routerLink: '/dashboard' },
  {
    label: 'Projects',
    children: [
      { label: 'All Projects', routerLink: '/projects' },
      { label: 'My Projects', routerLink: '/projects/mine' },
      { label: 'Shared', routerLink: '/projects/shared' }
    ]
  },
  {
    label: 'Resources',
    children: [
      { label: 'Documentation', href: '/docs', external: true },
      { label: 'API Reference', href: '/api', external: true },
      { label: 'Community', href: 'https://community.example.com', external: true }
    ]
  }
];
```

### Search Implementation

```typescript
// Implement search with debouncing and loading states
@Component({
  template: `
    <app-header
      [searchValue]="searchQuery"
      (searchChange)="onSearchChange($event)"
      (searchSubmit)="onSearchSubmit($event)">
    </app-header>
  `
})
export class SearchHeaderComponent {
  searchQuery = '';
  private searchSubject = new Subject<string>();

  constructor() {
    // Debounce search input
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.searchService.search(query))
    ).subscribe(results => {
      this.searchResults = results;
    });
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
    this.searchSubject.next(query);
  }

  onSearchSubmit(query: string) {
    this.router.navigate(['/search'], { 
      queryParams: { q: query } 
    });
  }
}
```

### User Management Integration

```typescript
// Integrate with authentication service
@Component({})
export class AuthenticatedHeaderComponent implements OnInit {
  user$ = this.authService.user$;
  
  userActions: HeaderUserAction[] = [
    { label: 'Profile', action: 'profile', icon: '...' },
    { label: 'Settings', action: 'settings', icon: '...' },
    { label: 'Billing', action: 'billing', icon: '...' },
    { divider: true, label: '', action: '' },
    { label: 'Sign Out', action: 'signout', icon: '...' }
  ];

  onUserAction(event: { action: string; user: HeaderUser }) {
    switch (event.action) {
      case 'profile':
        this.router.navigate(['/profile']);
        break;
      case 'settings':
        this.router.navigate(['/settings']);
        break;
      case 'billing':
        this.router.navigate(['/billing']);
        break;
      case 'signout':
        this.authService.signOut().then(() => {
          this.router.navigate(['/login']);
        });
        break;
    }
  }
}
```

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support with tab, enter, and escape keys
- **Screen Reader Support**: Proper ARIA labels and roles
- **Focus Management**: Visible focus indicators and logical tab order
- **High Contrast**: Compatible with high contrast mode
- **Reduced Motion**: Respects user's motion preferences

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- [Sidebar](./sidebar.md) - Vertical navigation component
- [Breadcrumb](./breadcrumb.md) - Hierarchical navigation
- [Dropdown Menu](./dropdown-menu.md) - Contextual menus
- [Button](./button.md) - Interactive buttons for actions

## Changelog

### v0.6.0
- Initial release of Header Block component
- Support for multiple variants and sizes
- Mobile-responsive design with hamburger menu
- User menu and search functionality
- Accessibility improvements

---

## Contributing

Found an issue or want to contribute? Please read our [contributing guidelines](../../CONTRIBUTING.md) and submit a pull request.

## License

This component is part of Angular SuperUI and is licensed under the MIT License.
