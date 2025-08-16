# Sidebar Component

The Sidebar component is a powerful, flexible navigation component built with Angular signals for optimal performance. It provides responsive behavior, keyboard navigation, multiple display modes, sticky header/footer, and extensive customization options.

## Table of Contents

- [Features](#features)
- [Basic Usage](#basic-usage)
- [Installation](#installation)
- [Component Architecture](#component-architecture)
- [API Reference](#api-reference)
- [Advanced Examples](#advanced-examples)
- [Keyboard Navigation](#keyboard-navigation)
- [Responsive Behavior](#responsive-behavior)
- [Customization](#customization)
- [Accessibility](#accessibility)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Features

- 🚀 **Signal-based**: Built with Angular signals for optimal performance
- ⌨️ **Full keyboard navigation**: Arrow keys, Enter, Space, Home, End support
- 📱 **Responsive design**: Automatically adapts to different screen sizes with mobile overlay mode
- 🎯 **Target-based triggers**: Control sidebars by ID without ViewChild references
- 🔄 **Multiple modes**: Push (content shifts) and overlay (content covered) display modes
- 📐 **Flexible sizing**: 5 different width sizes (sm, md, lg, xl, icon)
- 🎨 **Icon mode**: Compact icon-only mode with tooltips and dropdowns
- 🌳 **Nested navigation**: Multi-level navigation with expandable groups
- 📌 **Sticky layout**: Header and footer stick to top/bottom with scrollable content
- 🎭 **Flexible positioning**: Left or right sidebar positioning with flexbox layout
- ♿ **Accessibility**: Full ARIA support and screen reader friendly
- 🔧 **Service integration**: SidebarService for programmatic control across components

## Basic Usage

### Simple Sidebar Structure

The sidebar follows a specific hierarchy where users provide their own main content element:

```typescript
import { Component } from '@angular/core';
import { 
  Sidebar, 
  SidebarContainer, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarNavGroup, 
  SidebarNavItem, 
  SidebarTrigger 
} from '@lib/sidebar';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    Sidebar,
    SidebarContainer,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
    SidebarNavGroup,
    SidebarNavItem,
    SidebarTrigger
  ],
  template: `
    <!-- Trigger button (optional - can be anywhere) -->
    <SidebarTrigger target="my-sidebar" [showLabel]="true" label="Toggle Sidebar" />
    
    <!-- Main sidebar container -->
    <SidebarContainer>
      <!-- Sidebar component -->
      <Sidebar 
        id="my-sidebar" 
        side="left" 
        mode="push" 
        size="md"
        [defaultExpanded]="true"
        ariaLabel="Main navigation"
      >
        <!-- Sticky header -->
        <SidebarHeader slot="sidebar-header">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-blue-600 rounded-lg"></div>
            <h2 class="text-lg font-semibold">My App</h2>
          </div>
        </SidebarHeader>
        
        <!-- Scrollable content -->
        <SidebarContent slot="sidebar-content">
          <SidebarNavGroup title="Main Navigation">
            <SidebarNavItem 
              routerLink="/dashboard" 
              label="Dashboard" 
              icon="<svg>...</svg>" 
            />
            <SidebarNavItem 
              routerLink="/users" 
              label="Users" 
              icon="<svg>...</svg>"
              badge="12" 
            />
            <SidebarNavItem 
              [hasChildren]="true"
              label="Analytics"
              icon="<svg>...</svg>"
            >
              <SidebarNavItem 
                [isSubmenuItem]="true"
                routerLink="/analytics/reports" 
                label="Reports" 
              />
              <SidebarNavItem 
                [isSubmenuItem]="true"
                routerLink="/analytics/insights" 
                label="Insights" 
              />
            </SidebarNavItem>
          </SidebarNavGroup>
        </SidebarContent>
        
        <!-- Sticky footer -->
        <SidebarFooter slot="sidebar-footer">
          <div class="text-sm text-muted-foreground">
            v2.0.3 • © 2025 SuperUI
          </div>
        </SidebarFooter>
      </Sidebar>
      
      <!-- User's main content - use any HTML element -->
      <div class="flex-1 overflow-auto">
        <main class="p-6">
          <h1>Main Content Area</h1>
          <p>Your application content goes here...</p>
        </main>
      </div>
    </SidebarContainer>
  `
})
export class ExampleComponent {}
```

## Installation

1. **Install the package** (if using npm package):
```bash
npx ngsui-cli add sidebar
```

2. **Import the components** in your module or standalone component:
```typescript
import { 
  Sidebar, 
  SidebarContainer, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarNavGroup, 
  SidebarNavItem, 
  SidebarTrigger,
  SidebarService  // For programmatic control
} from '@lib/sidebar';
```

3. **Add required styles** (usually automatically included with the component).

## Component Architecture

The sidebar follows a hierarchical structure:

```
SidebarContainer (flexbox container)
├── Sidebar (main sidebar component)
│   ├── SidebarHeader (sticky header)
│   ├── SidebarContent (scrollable content)
│   │   └── SidebarNavGroup
│   │       └── SidebarNavItem (can be nested)
│   └── SidebarFooter (sticky footer)
└── div/main/section (user's main content with flex-1 class)
```

### Key Points:
- **SidebarContainer**: Manages flexbox layout and positioning
- **Sidebar**: Contains all navigation with sticky header/footer
- **User Content**: Any HTML element with `flex-1` class takes remaining space
- **No SidebarMainContent**: Users write their own main content structure

## API Reference

### SidebarContainer

The root container component that manages flexbox layout and provides context to child components.

#### SidebarContainer Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `customClass` | `string` | `''` | Additional CSS classes for the container |
| `height` | `string` | `'h-screen'` | Height class for the container |

#### SidebarContainer Usage

```typescript
<SidebarContainer>
  <Sidebar>...</Sidebar>
  <div class="flex-1 overflow-auto">...</div>
</SidebarContainer>
```

### Sidebar

The main sidebar component that contains navigation and controls display behavior.

#### Sidebar Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | `''` | Unique identifier for the sidebar (used by triggers) |
| `side` | `'left' \| 'right'` | `'left'` | Which side of the screen to display the sidebar |
| `mode` | `'push' \| 'overlay'` | `'push'` | How the sidebar affects the main content |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Width of the sidebar |
| `defaultExpanded` | `boolean` | `true` | Default expanded state on initialization |
| `isExpanded` | `boolean \| undefined` | `undefined` | External control of expanded state |
| `allowCollapse` | `boolean` | `true` | Whether the sidebar can be collapsed |
| `allowIconOnly` | `boolean` | `true` | Whether the sidebar can use icon-only mode |
| `showBackdropInOverlay` | `boolean` | `true` | Whether to show backdrop in overlay mode |
| `closeOnBackdropClick` | `boolean` | `true` | Whether to close sidebar when backdrop is clicked |
| `closeOnEscape` | `boolean` | `true` | Whether to close sidebar when Escape is pressed |
| `preventBodyScroll` | `boolean` | `true` | Whether to prevent body scroll in overlay mode |
| `mobileBreakpoint` | `number` | `768` | Pixel width for mobile breakpoint |
| `mediumBreakpoint` | `number` | `1024` | Pixel width for medium screen breakpoint |
| `ariaLabel` | `string` | `'Navigation sidebar'` | Accessibility label for the sidebar |
| `customClass` | `string` | `''` | Additional CSS classes for the sidebar |
| `headerCustomClass` | `string` | `''` | Additional CSS classes for the header area |
| `contentCustomClass` | `string` | `''` | Additional CSS classes for the content area |
| `footerCustomClass` | `string` | `''` | Additional CSS classes for the footer area |

#### Sidebar Events

| Event | Type | Description |
|-------|------|-------------|
| `onExpandedChange` | `EventEmitter<boolean>` | Emitted when expanded state changes |
| `onStateChange` | `EventEmitter<SidebarState>` | Emitted when sidebar state changes |

#### Sidebar Methods

| Method | Description |
|--------|-------------|
| `expand()` | Expand the sidebar and exit icon mode |
| `collapse()` | Collapse the sidebar |
| `toggleExpanded()` | Toggle between expanded and collapsed states |
| `setIconOnly()` | Set the sidebar to icon-only mode |
| `toggleIconOnly()` | Toggle between icon-only and expanded modes |

#### Sidebar Computed Properties

| Property | Type | Description |
|----------|------|-------------|
| `isExpandedComputed()` | `boolean` | Current expanded state (respects external control) |
| `isIconOnly()` | `boolean` | Whether sidebar is in icon-only mode |
| `isMobile()` | `boolean` | Whether current screen is mobile size |
| `isMediumScreen()` | `boolean` | Whether current screen is medium size |
| `effectiveMode()` | `'push' \| 'overlay'` | Actual mode (forces overlay on mobile) |
| `currentState()` | `'collapsed' \| 'expanded' \| 'iconOnly'` | Current visual state |
| `currentSize()` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'icon'` | Current size (icon when in icon mode) |

#### Sidebar Slots

The sidebar uses Angular's content projection with slots:

- `sidebar-header`: Content for the sticky header area
- `sidebar-content`: Main scrollable content area  
- `sidebar-footer`: Content for the sticky footer area

#### Sidebar Size Options

| Size | Width | Description |
|------|-------|-------------|
| `sm` | 256px (16rem) | Compact sidebar for minimal interfaces |
| `md` | 320px (20rem) | Standard width for most applications (default) |
| `lg` | 384px (24rem) | Larger sidebar for content-heavy navigation |
| `xl` | 448px (28rem) | Maximum width for complex navigation structures |
| `icon` | 64px (4rem) | Icon-only mode for minimal space usage |

### SidebarHeader

Container for sidebar header content with sticky positioning.

#### SidebarHeader Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `customClass` | `string` | `''` | Additional CSS classes |

### SidebarContent

Scrollable content area of the sidebar.

#### SidebarContent Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `customClass` | `string` | `''` | Additional CSS classes |
| `isIconOnly` | `boolean` | `false` | Whether in icon-only mode (affects styling) |

### SidebarFooter

Container for sidebar footer content with sticky positioning.

#### SidebarFooter Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `customClass` | `string` | `''` | Additional CSS classes |

### SidebarNavGroup

Groups related navigation items with an optional title.

#### SidebarNavGroup Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | `''` | Optional group title |
| `isIconOnly` | `boolean` | `false` | Whether in icon-only mode (hides title) |
| `customClass` | `string` | `''` | Additional CSS classes |
| `titleCustomClass` | `string` | `''` | Additional CSS classes for the title |

### SidebarNavItem

Individual navigation item with support for icons, badges, and nesting.

#### SidebarNavItem Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `routerLink` | `string \| any[] \| null` | `null` | Angular router link |
| `label` | `string` | `''` | Display text for the item |
| `icon` | `string \| Type<any> \| TemplateRef<any> \| LucideIconData` | `''` | Universal icon support: SVG markup, Angular component, template, or Lucide icon data |
| `badge` | `string` | `''` | Badge text or number |
| `isActive` | `boolean` | `false` | Whether the item is currently active |
| `hasChildren` | `boolean` | `false` | Whether this item has submenu items |
| `isIconOnly` | `boolean` | `false` | Whether in icon-only mode |
| `isSubmenuItem` | `boolean` | `false` | Whether this is a submenu item |
| `customClass` | `string` | `''` | Additional CSS classes |
| `badgeCustomClass` | `string` | `''` | Additional CSS classes for the badge |

#### SidebarNavItem Events

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | `EventEmitter<Event>` | Emitted when item is clicked |

#### SidebarNavItem Computed Properties

| Property | Type | Description |
|----------|------|-------------|
| `isExpanded()` | `boolean` | Whether submenu is expanded |
| `isHovered()` | `boolean` | Whether item is being hovered (for tooltips) |
| `showLabel()` | `boolean` | Whether to show the label text |
| `showTooltip()` | `boolean` | Whether to show tooltip in icon mode |

#### SidebarNavItem Methods

| Method | Description |
|--------|-------------|
| `onItemClick(event: Event)` | Handle item click (toggles submenu if has children) |
| `onKeyDown(event: KeyboardEvent)` | Handle keyboard navigation |
| `onMouseEnter()` | Handle mouse enter for tooltip |
| `onMouseLeave()` | Handle mouse leave for tooltip |
| `getAriaLabel()` | Get accessible label for screen readers |

### SidebarTrigger

Button component to toggle sidebar visibility.

#### SidebarTrigger Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `target` | `string` | `''` | ID of the sidebar to control |
| `label` | `string` | `''` | Button label text |
| `showIcon` | `boolean` | `true` | Whether to show the hamburger icon |
| `showLabel` | `boolean` | `false` | Whether to show text label |
| `isExpanded` | `boolean` | `false` | Fallback expanded state if no target |
| `variant` | `'default' \| 'outline' \| 'ghost'` | `'outline'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `customClass` | `string` | `''` | Additional CSS classes |

#### SidebarTrigger Events

| Event | Type | Description |
|-------|------|-------------|
| `onTrigger` | `EventEmitter<void>` | Emitted when trigger is activated |

#### SidebarTrigger Methods

| Method | Description |
|--------|-------------|
| `onTriggerClick()` | Handle trigger button click |
| `getTargetExpandedState()` | Get expanded state from target sidebar |
| `getAriaLabel()` | Get accessible label for the button |

### SidebarService

Injectable service for programmatic sidebar control.

#### SidebarService Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `registerSidebar(id, sidebar)` | `id: string`, `sidebar: Sidebar` | `void` | Register a sidebar instance |
| `unregisterSidebar(id)` | `id: string` | `void` | Unregister a sidebar instance |
| `getSidebar(id)` | `id: string` | `Sidebar \| undefined` | Get sidebar instance by ID |
| `toggleSidebar(id)` | `id: string` | `boolean` | Toggle sidebar by ID |
| `getAllSidebars()` | - | `Sidebar[]` | Get all registered sidebar instances |

#### SidebarService Usage

```typescript
import { Component, inject } from '@angular/core';
import { SidebarService } from '@lib/sidebar';

@Component({
  template: `
    <button (click)="toggleSidebar()">Toggle Sidebar</button>
  `
})
export class MyComponent {
  private sidebarService = inject(SidebarService);
  
  toggleSidebar() {
    this.sidebarService.toggle('my-sidebar');
  }
}
```

### Migration Note

**SidebarMainContent has been removed** in the current implementation for greater flexibility. Users should provide their own main content element with the `flex-1 overflow-auto` CSS classes.

#### Before (old implementation)

```html
<SidebarContainer>
  <Sidebar>...</Sidebar>
  <SidebarMainContent>
    <!-- Your content here -->
  </SidebarMainContent>
</SidebarContainer>
```

#### After (current implementation)

```html
<SidebarContainer>
  <Sidebar>...</Sidebar>
  <div class="flex-1 overflow-auto">
    <!-- Your content here -->
  </div>
</SidebarContainer>
```

## Advanced Examples

### Nested Navigation

```typescript
<SidebarNavGroup title="Analytics">
  <SidebarNavItem 
    label="Reports" 
    icon="<svg>...</svg>" 
    [hasChildren]="true"
  >
    <!-- Level 2 -->
    <SidebarNavItem 
      routerLink="/reports/sales" 
      label="Sales Reports" 
      [isSubmenuItem]="true"
      [customClass]="isIconOnly ? '' : 'ml-4'"
    />
    <SidebarNavItem 
      label="User Reports" 
      [hasChildren]="true" 
      [isSubmenuItem]="true"
      [customClass]="isIconOnly ? '' : 'ml-4'"
    >
      <!-- Level 3 -->
      <SidebarNavItem 
        routerLink="/reports/users/active" 
        label="Active Users" 
        [isSubmenuItem]="true"
        [customClass]="isIconOnly ? '' : 'ml-8'"
      />
    </SidebarNavItem>
  </SidebarNavItem>
</SidebarNavGroup>
```

### Responsive Sidebar

```typescript
@Component({
  template: `
    <SidebarContainer>
      <Sidebar 
        id="responsive-sidebar"
        [side]="sidebarSide()"
        [mode]="sidebarMode()"
        [size]="sidebarSize()"
        [defaultExpanded]="!isMobile()"
      >
        <!-- Sidebar content -->
      </Sidebar>
      
      <div class="flex-1">
        <!-- Main content -->
      </div>
    </SidebarContainer>
  `
})
export class ResponsiveExample {
  // Responsive behavior
  readonly isMobile = computed(() => window.innerWidth <= 768);
  readonly sidebarMode = computed(() => this.isMobile() ? 'overlay' : 'push');
  readonly sidebarSide = computed(() => 'left');
  readonly sidebarSize = computed(() => this.isMobile() ? 'sm' : 'md');
}
```

### Custom Styling

```typescript
<Sidebar 
  id="custom-sidebar"
  [customClass]="'bg-gradient-to-b from-blue-900 to-purple-900 text-white'"
  [headerCustomClass]="'bg-blue-800 border-b border-blue-700'"
>
  <SidebarHeader slot="sidebar-header">
    <div class="text-white font-bold">Custom Sidebar</div>
  </SidebarHeader>
  
  <SidebarContent slot="sidebar-content">
    <SidebarNavGroup 
      title="Navigation" 
      [titleCustomClass]="'text-blue-200'"
    >
      <SidebarNavItem 
        label="Dashboard" 
        [customClass]="'text-white hover:bg-blue-800'"
        [badgeCustomClass]="'bg-yellow-500 text-yellow-900'"
        badge="3"
      />
    </SidebarNavGroup>
  </SidebarContent>
</Sidebar>
```

### Icon Mode with Tooltips

```typescript
@Component({
  template: `
    <Sidebar 
      id="icon-sidebar"
      #sidebar
      [defaultExpanded]="false"
    >
      <SidebarContent slot="sidebar-content" [isIconOnly]="sidebar.isIconOnly()">
        <SidebarNavGroup [isIconOnly]="sidebar.isIconOnly()">
          <SidebarNavItem 
            routerLink="/dashboard"
            label="Dashboard"
            icon="<svg>...</svg>"
            [isIconOnly]="sidebar.isIconOnly()"
          />
          <!-- In icon mode, tooltips automatically appear on hover -->
        </SidebarNavGroup>
      </SidebarContent>
    </Sidebar>
  `
})
export class IconModeExample {}
```

### Multiple Sidebars

```typescript
<SidebarContainer>
  <!-- Left sidebar -->
  <Sidebar 
    id="left-sidebar" 
    side="left" 
    mode="push"
    ariaLabel="Main navigation"
  >
    <!-- Navigation content -->
  </Sidebar>
  
  <!-- Main content -->
  <div class="flex-1">
    <main>Content</main>
  </div>
  
  <!-- Right sidebar -->
  <Sidebar 
    id="right-sidebar" 
    side="right" 
    mode="overlay"
    ariaLabel="Tools and settings"
  >
    <!-- Tools content -->
  </Sidebar>
</SidebarContainer>

<!-- Triggers -->
<SidebarTrigger target="left-sidebar" label="Menu" />
<SidebarTrigger target="right-sidebar" label="Tools" />
```

## Keyboard Navigation

The sidebar provides comprehensive keyboard navigation support:

### Navigation Keys

| Key | Action |
|-----|--------|
| `↑` / `↓` | Navigate between menu items |
| `←` / `→` | Collapse/expand submenus |
| `Enter` / `Space` | Activate item or toggle submenu |
| `Home` | Jump to first item |
| `End` | Jump to last item |
| `Tab` | Navigate between sidebar groups |
| `Escape` | Close sidebar (when in overlay mode) |

### Focus Management

- Focus is automatically managed when navigating with arrow keys
- When a submenu is expanded, focus moves to the first submenu item
- Focus is trapped within the sidebar when using overlay mode
- Proper focus indicators are provided for keyboard users

### Example: Programmatic Focus

```typescript
@Component({
  template: `
    <Sidebar #sidebar id="my-sidebar">
      <SidebarContent slot="sidebar-content">
        <SidebarNavItem 
          #firstItem
          routerLink="/dashboard" 
          label="Dashboard" 
        />
      </SidebarContent>
    </Sidebar>
  `
})
export class FocusExample {
  @ViewChild('firstItem') firstItem!: SidebarNavItem;
  
  focusFirstItem() {
    // Focus first item programmatically
    this.firstItem.focus();
  }
}
```

## Responsive Behavior

### Automatic Responsive Mode

The sidebar automatically adapts to different screen sizes:

- **Desktop (>1024px)**: Push mode by default, full size
- **Tablet (768-1024px)**: Push mode, potentially smaller size
- **Mobile (<768px)**: Overlay mode, compact size

### Manual Responsive Control

```typescript
@Component({
  template: `
    <Sidebar 
      [mode]="responsiveMode()"
      [size]="responsiveSize()"
      [defaultExpanded]="!isMobileDevice()"
    >
      <!-- Content -->
    </Sidebar>
  `
})
export class ResponsiveControl {
  private readonly breakpoint = inject(BreakpointObserver);
  
  readonly isMobileDevice = computed(() => 
    this.breakpoint.isMatched('(max-width: 768px)')
  );
  
  readonly responsiveMode = computed(() => 
    this.isMobileDevice() ? 'overlay' : 'push'
  );
  
  readonly responsiveSize = computed(() => 
    this.isMobileDevice() ? 'sm' : 'md'
  );
}
```

### Responsive Navigation Items

```typescript
<!-- Show different content based on screen size -->
<SidebarNavItem 
  [label]="isMobile() ? 'Dash' : 'Dashboard'"
  [icon]="dashboardIcon"
  routerLink="/dashboard"
/>

<!-- Hide items on mobile -->
<SidebarNavItem 
  *ngIf="!isMobile()"
  label="Advanced Settings"
  routerLink="/settings/advanced"
/>
```

## Accessibility

The sidebar component is built with accessibility in mind:

### ARIA Support

- Proper ARIA roles (`navigation`, `menu`, `menuitem`)
- ARIA labels and descriptions
- ARIA expanded state for submenus
- ARIA current for active items

### Screen Reader Support

- Descriptive labels for all interactive elements
- Status announcements for state changes
- Proper heading hierarchy
- Alternative text for icons

### Example: Enhanced Accessibility

```typescript
<Sidebar 
  id="accessible-sidebar"
  ariaLabel="Main navigation menu"
  role="navigation"
>
  <SidebarContent slot="sidebar-content">
    <SidebarNavGroup 
      title="Primary Navigation"
      role="group"
      [attr.aria-labelledby]="groupId"
    >
      <SidebarNavItem 
        routerLink="/dashboard"
        label="Dashboard"
        [attr.aria-current]="isCurrentPage('/dashboard') ? 'page' : null"
        [attr.aria-describedby]="'dashboard-desc'"
      />
      <div id="dashboard-desc" class="sr-only">
        Main dashboard with overview of all metrics
      </div>
    </SidebarNavGroup>
  </SidebarContent>
</Sidebar>
```

## Best Practices

### Performance

1. **Use OnPush Change Detection**:
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
```

2. **Lazy Load Navigation Data**:
```typescript
readonly navigationItems = computed(() => {
  return this.authService.user()?.role === 'admin' 
    ? this.adminNavItems() 
    : this.userNavItems();
});
```

3. **Optimize Icon Rendering**:
```typescript
// Pre-sanitize icons for better performance
readonly sanitizedIcon = computed(() => 
  this.sanitizer.bypassSecurityTrustHtml(this.icon())
);
```

### UX Guidelines

1. **Consistent Navigation**: Keep navigation structure consistent across your application
2. **Clear Labels**: Use descriptive labels that clearly indicate the destination
3. **Visual Hierarchy**: Use grouping and indentation to show relationships
4. **State Indicators**: Show active states and loading indicators appropriately

### Code Organization

1. **Separate Navigation Logic**:
```typescript
@Injectable()
export class NavigationService {
  getNavigationItems(userRole: string) {
    // Return navigation items based on user role
  }
}
```

2. **Use TypeScript Interfaces**:
```typescript
interface NavigationItem {
  label: string;
  route: string;
  icon: string;
  badge?: string;
  children?: NavigationItem[];
}
```

3. **Component Composition**:
```typescript
@Component({
  template: `
    <SidebarNavGroup title="Analytics">
      <app-analytics-nav-items />
    </SidebarNavGroup>
  `
})
export class AnalyticsNavComponent {}
```

## Troubleshooting

### Common Issues

#### Sidebar Not Responding to Trigger

**Problem**: Sidebar trigger button doesn't open/close the sidebar.

**Solution**: Ensure the trigger `target` matches the sidebar `id`:
```typescript
<SidebarTrigger target="my-sidebar" />
<Sidebar id="my-sidebar"> <!-- Must match --> 
```

#### SidebarMainContent Not Found Error

**Problem**: Error about `SidebarMainContent` component not being found.

**Solution**: `SidebarMainContent` has been removed. Replace it with your own element:
```typescript
<!-- OLD - Will cause errors -->
<SidebarContainer>
  <Sidebar>...</Sidebar>
  <SidebarMainContent>Content</SidebarMainContent>
</SidebarContainer>

<!-- NEW - Use regular HTML elements -->
<SidebarContainer>
  <Sidebar>...</Sidebar>
  <div class="flex-1 overflow-auto">
    <main class="p-6">Content</main>
  </div>
</SidebarContainer>
```

#### Main Content Not Taking Full Width

**Problem**: Content area doesn't expand to fill remaining space.

**Solution**: Ensure your main content element has `flex-1` class:
```typescript
<SidebarContainer>
  <Sidebar>...</Sidebar>
  <div class="flex-1 overflow-auto"> <!-- Required classes -->
    <!-- Your content -->
  </div>
</SidebarContainer>
```

#### Sidebar Positioning Issues

**Problem**: Sidebar appears in wrong position or overlaps content.

**Solution**: Verify proper component structure and CSS classes:
```typescript
<!-- Correct structure -->
<SidebarContainer> <!-- Manages flexbox layout -->
  <Sidebar side="left">...</Sidebar> <!-- Positioned first for left -->
  <div class="flex-1 overflow-auto">...</div> <!-- Takes remaining space -->
</SidebarContainer>

<!-- For right sidebar -->
<SidebarContainer>
  <div class="flex-1 overflow-auto">...</div> <!-- Content first -->
  <Sidebar side="right">...</Sidebar> <!-- Sidebar second for right -->
</SidebarContainer>
```

#### Icons Not Displaying

**Problem**: SVG icons don't appear in navigation items.

**Solution**: Ensure SVG strings are properly formatted:
```typescript
readonly dashboardIcon = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
  </svg>
`;
```

#### Header/Footer Not Sticky

**Problem**: Header and footer scroll with content instead of staying fixed.

**Solution**: Ensure proper slot usage and CSS structure:
```typescript
<Sidebar>
  <SidebarHeader slot="sidebar-header">...</SidebarHeader>
  <SidebarContent slot="sidebar-content">...</SidebarContent>
  <SidebarFooter slot="sidebar-footer">...</SidebarFooter>
</Sidebar>
```

#### Keyboard Navigation Not Working

**Problem**: Arrow keys don't navigate between items.

**Solution**: Ensure items have proper tabindex and role attributes:
```typescript
<SidebarNavItem 
  role="menuitem"
  tabindex="0"
  label="Dashboard"
/>
```

#### Submenu Not Expanding

**Problem**: Nested items don't show when parent is clicked.

**Solution**: Set `hasChildren` to true and use proper nesting:
```typescript
<SidebarNavItem 
  [hasChildren]="true"
  label="Analytics"
>
  <SidebarNavItem 
    [isSubmenuItem]="true"
    label="Reports"
  />
</SidebarNavItem>
```

#### Responsive Issues

**Problem**: Sidebar doesn't adapt to mobile screens.

**Solution**: Use responsive mode and size:
```typescript
<Sidebar 
  [mode]="isMobile() ? 'overlay' : 'push'"
  [size]="isMobile() ? 'sm' : 'md'"
  [breakpoint]="'md'"
/>
```

### Migration from Previous Versions

If upgrading from an older version:

1. **Remove SidebarMainContent imports**:
```typescript
// Remove this import
import { SidebarMainContent } from '@lib/sidebar';

// Keep these imports
import { 
  Sidebar, 
  SidebarContainer, 
  SidebarContent,
  // ... other components
} from '@lib/sidebar';
```

2. **Update template structure**:
```typescript
<!-- Replace SidebarMainContent with regular elements -->
<div class="flex-1 overflow-auto">
  <!-- Your content here -->
</div>
```

3. **Update CSS classes**:
- Replace `customClass` with `className`
- Ensure flexbox layout with `flex-1` on main content

### Debugging Tips

1. **Check Console Errors**: Look for any JavaScript errors that might prevent functionality
2. **Inspect Element**: Use browser dev tools to verify proper HTML structure and CSS classes
3. **Test Keyboard Navigation**: Use Tab and arrow keys to test navigation flow
4. **Verify ARIA Attributes**: Check that accessibility attributes are properly set
5. **Check Component Structure**: Ensure proper nesting of sidebar components
6. **Validate CSS Classes**: Confirm flexbox classes are applied correctly

### Performance Issues

If you experience performance issues:

1. **Minimize Re-renders**: Use `OnPush` change detection
2. **Optimize Icons**: Pre-process SVG icons instead of generating them dynamically
3. **Lazy Load**: Load navigation items only when needed
4. **Use TrackBy**: For dynamic navigation lists, use trackBy functions
5. **Signal Optimization**: Use computed signals for derived state

### Development Environment Issues

- **Hot Reload**: Changes might require a full page refresh
- **Build Errors**: Ensure all imports are correctly updated after migration
- **TypeScript Errors**: Check component property names match current API

---

## Contributing

If you find any issues or have suggestions for improvements, please:

1. Check existing issues on GitHub
2. Create a new issue with detailed description
3. Consider submitting a pull request

## License

This component is part of the Angular SuperUI library and follows the same license terms.
