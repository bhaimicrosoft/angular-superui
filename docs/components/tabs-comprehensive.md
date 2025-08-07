# Tabs Component - Comprehensive Documentation

## Overview

The Angular SuperUI Tabs component is a highly customizable, accessible, and beautifully animated tabbed interface component built with Angular signals, TypeScript, and Tailwind CSS. It provides smooth animations, multiple visual variants, keyboard navigation, and comprehensive form integration capabilities.

## Key Features

### 🎨 Visual Variants

- **Default**: Clean tabs with border bottom indicators
- **Pills**: Rounded pill-style tabs with background highlights
- **Underline**: Minimal underline-only tabs
- **Buttons**: Button-style tabs with border and background states
- **Segmented**: Segmented control style with rounded containers

### ⚡ Performance & Animations

- **Ultra-smooth transitions** with physics-based easing functions
- **Hardware-accelerated animations** using `will-change` properties
- **RequestAnimationFrame optimization** for 60fps smooth tab switching
- **Configurable animation timing** with cubic-bezier curves
- **Staggered animations** for multiple tabs entrance
- **Optimized hover effects** with scale and transform animations

### 🎯 WCAG Compliance

- **WCAG 2.1 AAA compliant** with full keyboard navigation
- **Screen reader support** with proper ARIA attributes
- **Focus management** with visual focus indicators
- **Keyboard shortcuts** (Arrow keys, Home, End, Delete)
- **High contrast mode** support

### 📱 Responsive Design

- **Mobile-first approach** with touch-optimized targets
- **Flexible sizing** (small, default, large)
- **Orientation support** (horizontal, vertical)
- **Breakpoint-aware** responsive behaviors

## Installation

```bash
ngsui add tabs
```

## Basic Usage

### Import the Component

```typescript
import { Tabs, TabItem } from 'angular-superui';

@Component({
  imports: [Tabs],
  // ...
})
export class MyComponent {
  tabs: TabItem[] = [
    { value: 'tab1', label: 'First Tab' },
    { value: 'tab2', label: 'Second Tab' },
    { value: 'tab3', label: 'Third Tab' }
  ];
  
  activeTab = signal('tab1');
}
```

### Template Usage

```html
<Tabs 
  [tabs]="tabs" 
  [(activeTab)]="activeTab"
  variant="default"
  size="default"
  (change)="onTabChange($event)">
  
  <!-- Tab content goes here -->
  <div data-tab="tab1">Content for first tab</div>
  <div data-tab="tab2">Content for second tab</div>
  <div data-tab="tab3">Content for third tab</div>
</Tabs>
```

## API Reference

### Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `tabs` | `TabItem[]` | `[]` | Array of tab configuration objects |
| `variant` | `TabVariant` | `'default'` | Visual style variant |
| `size` | `TabSize` | `'default'` | Size variant (sm, default, lg) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Tab layout orientation |
| `defaultValue` | `string` | `''` | Initial active tab value |
| `disabled` | `boolean` | `false` | Disable all tabs |
| `closableTabs` | `boolean` | `false` | Enable tab closing functionality |
| `addable` | `boolean` | `false` | Show add new tab button |
| `lazy` | `boolean` | `false` | Enable lazy loading of tab content |
| `keepAlive` | `boolean` | `false` | Keep inactive tabs mounted in DOM |
| `showEmptyState` | `boolean` | `true` | Show empty state when no tabs |
| `helperText` | `string` | `''` | Helper text below tabs |
| `error` | `string` | `''` | Error message to display |
| `ariaLabel` | `string` | `''` | Accessibility label for tab list |

### Two-way Binding

| Property | Type | Description |
|----------|------|-------------|
| `activeTab` | `string` | Currently active tab value |

### Output Events

| Event | Type | Description |
|-------|------|-------------|
| `change` | `TabChangeEvent` | Emitted when active tab changes |
| `tabClose` | `{value: string, index: number}` | Emitted when a tab is closed |
| `tabAdd` | `void` | Emitted when add tab button is clicked |
| `tabLoad` | `string` | Emitted when a tab is lazy loaded |

### TabItem Interface

```typescript
interface TabItem {
  value: string;           // Unique identifier
  label: string;           // Display text
  content?: TemplateRef<any>; // Custom content template
  disabled?: boolean;      // Disable this tab
  icon?: string;          // HTML icon string
  badge?: string | number; // Badge content
  closable?: boolean;     // Can be closed
}
```

### TabChangeEvent Interface

```typescript
interface TabChangeEvent {
  value: string;           // New active tab value
  index: number;           // New active tab index
  previousValue?: string;  // Previous active tab value
  previousIndex?: number;  // Previous active tab index
}
```

## Styling Variants

### Default Tabs

Clean and professional with bottom border indicators.

```html
<Tabs variant="default" [tabs]="tabs" [(activeTab)]="activeTab">
  <!-- Content -->
</Tabs>
```

### Pills Tabs

Modern rounded pill design with background highlights.

```html
<Tabs variant="pills" [tabs]="tabs" [(activeTab)]="activeTab">
  <!-- Content -->
</Tabs>
```



### Underline Tabs

Minimal design with subtle underline indicators.

```html
<Tabs variant="underline" [tabs]="tabs" [(activeTab)]="activeTab">
  <!-- Content -->
</Tabs>
```

### Button Tabs

Button-style tabs with borders and backgrounds.

```html
<Tabs variant="buttons" [tabs]="tabs" [(activeTab)]="activeTab">
  <!-- Content -->
</Tabs>
```

### Segmented Control

iOS-style segmented control design.

```html
<Tabs variant="segmented" [tabs]="tabs" [(activeTab)]="activeTab">
  <!-- Content -->
</Tabs>
```

## Advanced Features

### Tabs with Icons and Badges

```typescript
tabs: TabItem[] = [
  {
    value: 'dashboard',
    label: 'Dashboard',
    icon: '<svg>...</svg>', // SVG icon
    badge: 5
  },
  {
    value: 'settings',
    label: 'Settings',
    icon: '<svg>...</svg>',
    badge: 'New'
  }
];
```

### Closable Tabs

```html
<Tabs 
  [tabs]="tabs" 
  [(activeTab)]="activeTab"
  [closableTabs]="true"
  (tabClose)="onTabClose($event)">
</Tabs>
```

```typescript
onTabClose(event: {value: string, index: number}) {
  this.tabs = this.tabs.filter(tab => tab.value !== event.value);
  
  // Handle active tab if the closed tab was active
  if (this.activeTab() === event.value && this.tabs.length > 0) {
    this.activeTab.set(this.tabs[0].value);
  }
}
```

### Dynamic Tab Addition

```html
<Tabs 
  [tabs]="tabs" 
  [(activeTab)]="activeTab"
  [addable]="true"
  addButtonLabel="Add New Tab"
  (tabAdd)="addNewTab()">
</Tabs>
```

```typescript
addNewTab() {
  const newTab: TabItem = {
    value: `tab-${Date.now()}`,
    label: `Tab ${this.tabs.length + 1}`,
    closable: true
  };
  
  this.tabs = [...this.tabs, newTab];
  this.activeTab.set(newTab.value);
}
```

### Lazy Loading

Enable lazy loading to improve performance for tabs with heavy content:

```html
<Tabs 
  [tabs]="tabs" 
  [(activeTab)]="activeTab"
  [lazy]="true"
  (tabLoad)="onTabLoad($event)">
</Tabs>
```

```typescript
onTabLoad(tabValue: string) {
  // Load content for the tab
  this.loadTabContent(tabValue);
}
```

### Custom Content Templates

```html
<Tabs [tabs]="tabsWithTemplates" [(activeTab)]="activeTab">
  <ng-template #customTemplate>
    <div class="custom-content">
      <!-- Custom tab content -->
    </div>
  </ng-template>
</Tabs>
```

```typescript
@ViewChild('customTemplate') customTemplate!: TemplateRef<any>;

ngAfterViewInit() {
  this.tabsWithTemplates = [
    {
      value: 'custom',
      label: 'Custom Tab',
      content: this.customTemplate
    }
  ];
}
```

## Responsive Design

### Size Variants

```html
<!-- Small tabs for compact layouts -->
<Tabs size="sm" [tabs]="tabs" [(activeTab)]="activeTab"></Tabs>

<!-- Default size -->
<Tabs size="default" [tabs]="tabs" [(activeTab)]="activeTab"></Tabs>

<!-- Large tabs for prominent navigation -->
<Tabs size="lg" [tabs]="tabs" [(activeTab)]="activeTab"></Tabs>
```

### Vertical Orientation

Perfect for sidebar navigation:

```html
<div class="flex gap-6">
  <!-- Sidebar with vertical tabs -->
  <div class="w-64">
    <Tabs 
      orientation="vertical" 
      variant="pills"
      [tabs]="sidebarTabs" 
      [(activeTab)]="activeTab">
    </Tabs>
  </div>
  
  <!-- Main content area -->
  <div class="flex-1">
    <div [ngSwitch]="activeTab()">
      <div *ngSwitchCase="'dashboard'">
        <h2>Dashboard</h2>
        <p>Main dashboard content appears here...</p>
      </div>
      <div *ngSwitchCase="'analytics'">
        <h2>Analytics</h2>
        <p>Analytics content appears here...</p>
      </div>
      <div *ngSwitchCase="'settings'">
        <h2>Settings</h2>
        <p>Settings content appears here...</p>
      </div>
    </div>
  </div>
</div>
```

```typescript
sidebarTabs: TabItem[] = [
  { value: 'dashboard', label: 'Dashboard', icon: '📊' },
  { value: 'analytics', label: 'Analytics', icon: '📈' },
  { value: 'settings', label: 'Settings', icon: '⚙️' }
];
```

### Responsive Breakpoints

The component automatically adapts to different screen sizes:

- **Mobile (< 640px)**: Optimized touch targets, compact spacing
- **Tablet (640px - 1024px)**: Balanced spacing, medium touch targets
- **Desktop (> 1024px)**: Full spacing, standard interaction areas

## Animation Customization

### Built-in Animations

The component includes several performance-optimized animations:

1. **Smooth Content Transitions**: Ultra-smooth sliding with physics-based easing
2. **Tab Indicator Slide**: Fluid indicator movement with 280ms timing
3. **Fade In/Out**: Optimized opacity transitions with `will-change` optimization
4. **Hover Effects**: Subtle scale and transform animations
5. **Stagger Animations**: Progressive tab entrance with 80ms stagger

### Animation Configuration

All animations use optimized cubic-bezier curves:

- **Enter animations**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` - Smooth ease-out
- **Exit animations**: `cubic-bezier(0.55, 0.055, 0.675, 0.19)` - Quick ease-in
- **Transform animations**: `cubic-bezier(0.4, 0, 0.2, 1)` - Material Design easing

### Performance Optimizations

- `will-change` properties for hardware acceleration
- `requestAnimationFrame` for smooth 60fps transitions
- Optimized transform calculations
- Minimal reflows and repaints

## Accessibility

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `ArrowLeft/ArrowUp` | Navigate to previous tab |
| `ArrowRight/ArrowDown` | Navigate to next tab |
| `Home` | Navigate to first tab |
| `End` | Navigate to last tab |
| `Delete` | Close current tab (if closable) |
| `Tab` | Move focus to tab content |

### ARIA Attributes

The component automatically manages ARIA attributes:

- `role="tablist"` on the tab container
- `role="tab"` on each tab button
- `role="tabpanel"` on each content panel
- `aria-selected` for active state
- `aria-controls` linking tabs to panels
- `aria-labelledby` linking panels to tabs

### Screen Reader Support

- Proper focus management
- Descriptive labels and help text
- Status announcements for tab changes
- Error message associations

## Form Integration

### Basic Form Example

```typescript
@Component({
  template: `
    <Tabs [tabs]="formTabs" [(activeTab)]="activeFormTab">
      <div data-tab="personal">
        <form [formGroup]="personalForm">
          <input type="text" formControlName="firstName" placeholder="First Name">
          <input type="text" formControlName="lastName" placeholder="Last Name">
        </form>
      </div>
      
      <div data-tab="contact">
        <form [formGroup]="contactForm">
          <input type="email" formControlName="email" placeholder="Email">
          <input type="tel" formControlName="phone" placeholder="Phone">
        </form>
      </div>
    </Tabs>
  `
})
export class FormTabsComponent {
  personalForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required)
  });
  
  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required)
  });
  
  formTabs: TabItem[] = [
    { value: 'personal', label: 'Personal Info' },
    { value: 'contact', label: 'Contact Info' }
  ];
  
  activeFormTab = signal('personal');
}
```

### Form Validation with Tab Indicators

```typescript
formTabs = computed(() => [
  {
    value: 'personal',
    label: 'Personal Info',
    badge: this.personalForm.invalid ? '!' : undefined,
    icon: this.personalForm.valid ? '<svg>checkmark</svg>' : undefined
  },
  {
    value: 'contact',
    label: 'Contact Info',
    badge: this.contactForm.invalid ? '!' : undefined,
    icon: this.contactForm.valid ? '<svg>checkmark</svg>' : undefined
  }
]);
```

## Theming

### CSS Custom Properties

The component respects CSS custom properties for theming:

```css
:root {
  --tabs-border-color: theme('colors.border');
  --tabs-text-color: theme('colors.foreground');
  --tabs-muted-color: theme('colors.muted.foreground');
  --tabs-primary-color: theme('colors.primary.DEFAULT');
  --tabs-background-color: theme('colors.background');
}

[data-theme="dark"] {
  --tabs-border-color: theme('colors.border');
  --tabs-text-color: theme('colors.foreground');
  --tabs-muted-color: theme('colors.muted.foreground');
}
```

### Custom Styling

Override component styles using CSS classes:

```css
.custom-tabs {
  .tab-trigger {
    @apply font-semibold tracking-wide;
  }
  
  .tab-content {
    @apply bg-gradient-to-r from-background to-muted/20;
  }
}
```

## Error Handling

### Error States

Display error messages below the tabs:

```html
<Tabs 
  [tabs]="tabs" 
  [(activeTab)]="activeTab"
  [error]="errorMessage">
</Tabs>
```

### Validation Integration

```typescript
errorMessage = computed(() => {
  const activeTab = this.activeTab();
  if (activeTab === 'personal' && this.personalForm.invalid) {
    return 'Please fill in all required personal information fields.';
  }
  if (activeTab === 'contact' && this.contactForm.invalid) {
    return 'Please provide valid contact information.';
  }
  return '';
});
```

## Best Practices

### Performance

1. **Use lazy loading** for tabs with heavy content
2. **Enable keepAlive** sparingly - only for tabs that are expensive to recreate
3. **Optimize tab content** - avoid heavy computations in tab templates
4. **Use trackBy functions** when tabs are dynamic

### Accessibility Best Practices

1. **Provide meaningful labels** for all tabs
2. **Use helper text** to explain complex tab functionality
3. **Test with keyboard navigation** and screen readers
4. **Ensure sufficient color contrast** for all states

### User Experience

1. **Keep tab labels concise** - aim for 1-3 words
2. **Use consistent tab ordering** - don't frequently reorder tabs
3. **Provide visual feedback** - use badges and icons appropriately
4. **Handle empty states** gracefully

### Code Organization

1. **Separate tab configuration** from component logic
2. **Use computed signals** for dynamic tab properties
3. **Handle tab events** appropriately for user actions
4. **Implement proper cleanup** for dynamic tabs

## Troubleshooting

### Common Issues

#### Tabs Not Switching Smoothly

**Problem**: Jerky or laggy tab transitions
**Solution**: Ensure the component has proper CSS transforms and animations enabled

```css
/* Add to your global styles if needed */
.tab-content {
  transform: translateZ(0); /* Force hardware acceleration */
  will-change: opacity, transform;
}
```

#### Content Not Loading

**Problem**: Tab content doesn't appear
**Solution**: Check that content elements have the correct `data-tab` attribute

```html
<!-- Correct -->
<div data-tab="tab1">Content for tab1</div>

<!-- Incorrect -->
<div>Content for tab1</div>
```

#### Accessibility Issues

**Problem**: Screen readers not announcing tab changes
**Solution**: Ensure proper ARIA labels and helper text

```html
<Tabs 
  [tabs]="tabs" 
  [(activeTab)]="activeTab"
  ariaLabel="Main navigation tabs"
  helperText="Use arrow keys to navigate between tabs">
</Tabs>
```

#### Performance Issues

**Problem**: Slow tab switching with many tabs
**Solution**: Enable lazy loading and optimize content

```html
<Tabs 
  [tabs]="tabs" 
  [(activeTab)]="activeTab"
  [lazy]="true"
  [keepAlive]="false">
</Tabs>
```

## Examples

### Complete Working Example

```typescript
import { Component, signal, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tabs, TabItem, TabChangeEvent } from 'angular-superui';

@Component({
  selector: 'app-comprehensive-tabs',
  standalone: true,
  imports: [Tabs, ReactiveFormsModule],
  template: `
    <div class="max-w-4xl mx-auto p-8">
      <h1 class="text-3xl font-bold mb-8">Comprehensive Tabs Example</h1>
      
      <Tabs 
        [tabs]="dynamicTabs()" 
        [(activeTab)]="activeTab"
        variant="pills"
        size="default"
        [closableTabs]="true"
        [addable]="true"
        addButtonLabel="Add New Tab"
        helperText="Use keyboard arrows to navigate between tabs"
        [error]="errorMessage()"
        (change)="onTabChange($event)"
        (tabClose)="onTabClose($event)"
        (tabAdd)="addNewTab()">
        
        <!-- Dashboard Tab -->
        <div data-tab="dashboard" class="space-y-6">
          <h2 class="text-2xl font-semibold">Dashboard</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-card p-4 rounded-lg border">
              <h3 class="font-medium mb-2">Total Users</h3>
              <p class="text-3xl font-bold text-primary">1,234</p>
            </div>
            <div class="bg-card p-4 rounded-lg border">
              <h3 class="font-medium mb-2">Revenue</h3>
              <p class="text-3xl font-bold text-green-600">$12,345</p>
            </div>
            <div class="bg-card p-4 rounded-lg border">
              <h3 class="font-medium mb-2">Growth</h3>
              <p class="text-3xl font-bold text-blue-600">+23%</p>
            </div>
          </div>
        </div>
        
        <!-- Profile Tab -->
        <div data-tab="profile" class="space-y-6">
          <h2 class="text-2xl font-semibold">Profile Settings</h2>
          <form [formGroup]="profileForm" class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">First Name</label>
              <input 
                type="text" 
                formControlName="firstName"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your first name">
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Last Name</label>
              <input 
                type="text" 
                formControlName="lastName"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your last name">
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                formControlName="email"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email">
            </div>
            <button 
              type="submit"
              class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Save Changes
            </button>
          </form>
        </div>
        
        <!-- Settings Tab -->
        <div data-tab="settings" class="space-y-6">
          <h2 class="text-2xl font-semibold">Application Settings</h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium">Dark Mode</label>
              <input type="checkbox" class="rounded">
            </div>
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium">Notifications</label>
              <input type="checkbox" class="rounded" checked>
            </div>
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium">Auto Save</label>
              <input type="checkbox" class="rounded" checked>
            </div>
          </div>
        </div>
        
        <!-- Dynamic tabs content will be rendered here -->
        @for (tab of customTabs(); track tab.value) {
          <div [attr.data-tab]="tab.value" class="space-y-4">
            <h2 class="text-2xl font-semibold">{{ tab.label }}</h2>
            <p class="text-muted-foreground">
              This is dynamically generated content for {{ tab.label }}.
              Created at {{ tab.createdAt | date:'medium' }}.
            </p>
            <button 
              class="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90"
              (click)="removeTab(tab.value)">
              Remove This Tab
            </button>
          </div>
        }
      </Tabs>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, rgb(240 249 255) 0%, rgb(219 234 254) 100%);
    }
    
    .bg-card {
      background: white;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
    }
  `]
})
export class ComprehensiveTabsComponent {
  // Form setup
  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  
  // Active tab state
  activeTab = signal('dashboard');
  
  // Custom tabs for dynamic addition
  customTabs = signal<Array<TabItem & { createdAt: Date }>>([]);
  
  // Base tabs configuration
  baseTabs: TabItem[] = [
    {
      value: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      badge: '3'
    },
    {
      value: 'profile',
      label: 'Profile',
      icon: '👤'
    },
    {
      value: 'settings',
      label: 'Settings',
      icon: '⚙️'
    }
  ];
  
  // Dynamic tabs computation
  dynamicTabs = computed(() => [
    ...this.baseTabs,
    ...this.customTabs().map(tab => ({
      value: tab.value,
      label: tab.label,
      icon: '📄',
      closable: true
    }))
  ]);
  
  // Error message computation
  errorMessage = computed(() => {
    const activeTab = this.activeTab();
    if (activeTab === 'profile' && this.profileForm.invalid) {
      return 'Please fill in all required profile fields correctly.';
    }
    return '';
  });
  
  // Event handlers
  onTabChange(event: TabChangeEvent) {
    console.log('Tab changed:', event);
  }
  
  onTabClose(event: { value: string; index: number }) {
    console.log('Tab closed:', event);
    
    // Remove from custom tabs
    this.customTabs.update(tabs => 
      tabs.filter(tab => tab.value !== event.value)
    );
    
    // Handle active tab if the closed tab was active
    if (this.activeTab() === event.value) {
      this.activeTab.set('dashboard');
    }
  }
  
  addNewTab() {
    const newTab = {
      value: `custom-${Date.now()}`,
      label: `Custom Tab ${this.customTabs().length + 1}`,
      createdAt: new Date()
    };
    
    this.customTabs.update(tabs => [...tabs, newTab]);
    this.activeTab.set(newTab.value);
  }
  
  removeTab(tabValue: string) {
    this.customTabs.update(tabs => 
      tabs.filter(tab => tab.value !== tabValue)
    );
    
    if (this.activeTab() === tabValue) {
      this.activeTab.set('dashboard');
    }
  }
}
```

This comprehensive documentation covers all aspects of the enhanced tabs component, including the smooth animations, responsive design, accessibility features, and practical implementation examples. The component is now fully documented with clear API references, best practices, and troubleshooting guides.
