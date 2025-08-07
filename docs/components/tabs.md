# Tabs Component - Quick Reference

## Overview

A highly customizable, accessible tabs component with smooth animations and multiple visual variants.

## Quick Start

```bash
ngsui add tabs
```

```typescript
import { Tabs, TabItem } from 'angular-superui';

@Component({
  imports: [Tabs],
  template: `
    <Tabs [tabs]="tabs" [(activeTab)]="activeTab">
      <div data-tab="tab1">Content 1</div>
      <div data-tab="tab2">Content 2</div>
    </Tabs>
  `
})
export class MyComponent {
  tabs: TabItem[] = [
    { value: 'tab1', label: 'First Tab' },
    { value: 'tab2', label: 'Second Tab' }
  ];
  
  activeTab = signal('tab1');
}
```

## Variants

| Variant | Description | Preview |
|---------|-------------|---------|
| `default` | Clean with border bottom | Standard professional look |
| `pills` | Rounded with background | Modern pill design |
| `underline` | Minimal underline only | Clean and subtle |
| `buttons` | Button style | Bold and prominent |
| `segmented` | Segmented control | iOS-style interface |

## Key Properties

### Essential Props

```typescript
interface TabsProps {
  tabs: TabItem[];              // Tab configuration
  activeTab: string;            // Two-way binding for active tab
  variant?: TabVariant;         // Visual style
  size?: 'sm' | 'default' | 'lg'; // Size variant
  orientation?: 'horizontal' | 'vertical'; // Layout
}
```

### TabItem Structure

```typescript
interface TabItem {
  value: string;        // Unique identifier
  label: string;        // Display text
  icon?: string;        // HTML icon
  badge?: string | number; // Badge content
  disabled?: boolean;   // Disable state
  closable?: boolean;   // Can be closed
}
```

## Advanced Features

### Icons and Badges

```typescript
tabs: TabItem[] = [
  {
    value: 'dashboard',
    label: 'Dashboard',
    icon: '<svg>...</svg>',
    badge: 5
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

### Dynamic Tab Addition

```html
<Tabs 
  [tabs]="tabs" 
  [(activeTab)]="activeTab"
  [addable]="true"
  (tabAdd)="addNewTab()">
</Tabs>
```

### Lazy Loading

```html
<Tabs 
  [tabs]="tabs" 
  [(activeTab)]="activeTab"
  [lazy]="true"
  (tabLoad)="onTabLoad($event)">
</Tabs>
```

## Events

| Event | Type | Description |
|-------|------|-------------|
| `change` | `TabChangeEvent` | Tab selection changed |
| `tabClose` | `{value: string, index: number}` | Tab was closed |
| `tabAdd` | `void` | Add button clicked |
| `tabLoad` | `string` | Tab content lazy loaded |

## Animations

The component includes optimized animations:

- **Smooth transitions**: 280ms cubic-bezier easing
- **Hardware acceleration**: `will-change` properties
- **60fps performance**: `requestAnimationFrame` optimization
- **Stagger effects**: Progressive tab entrance

## Accessibility

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `←/→` | Navigate tabs |
| `Home/End` | First/last tab |
| `Delete` | Close tab (if closable) |

### ARIA Support

- Full ARIA labeling
- Screen reader announcements
- Focus management
- High contrast support

## Form Integration

```typescript
@Component({
  template: `
    <Tabs [tabs]="formTabs" [(activeTab)]="activeTab">
      <div data-tab="step1">
        <form [formGroup]="form1">
          <!-- Form fields -->
        </form>
      </div>
      <div data-tab="step2">
        <form [formGroup]="form2">
          <!-- Form fields -->
        </form>
      </div>
    </Tabs>
  `
})
export class MultiStepFormComponent {
  form1 = new FormGroup({...});
  form2 = new FormGroup({...});
  
  formTabs: TabItem[] = [
    { 
      value: 'step1', 
      label: 'Step 1',
      badge: this.form1.invalid ? '!' : undefined 
    },
    { 
      value: 'step2', 
      label: 'Step 2',
      badge: this.form2.invalid ? '!' : undefined 
    }
  ];
}
```

## Responsive Design

```html
<!-- Responsive sizing -->
<Tabs size="sm" class="md:size-default lg:size-lg">
  <!-- Content -->
</Tabs>

<!-- Vertical tabs for sidebar navigation -->
<div class="flex">
  <div class="w-64">
    <Tabs 
      orientation="vertical" 
      [tabs]="sidebarTabs"
      [(activeTab)]="activeTab">
    </Tabs>
  </div>
  <div class="flex-1 p-6">
    <!-- Content appears on the right -->
    <div [ngSwitch]="activeTab()">
      <div *ngSwitchCase="'dashboard'">Dashboard content</div>
      <div *ngSwitchCase="'settings'">Settings content</div>
    </div>
  </div>
</div>
```

## Styling

### CSS Custom Properties

```css
:root {
  --tabs-border-color: theme('colors.border');
  --tabs-primary-color: theme('colors.primary.DEFAULT');
  --tabs-text-color: theme('colors.foreground');
}
```

### Custom Classes

```css
.custom-tabs {
  .tab-trigger {
    @apply font-semibold tracking-wide;
  }
  
  .tab-content {
    @apply rounded-lg shadow-sm;
  }
}
```

## Best Practices

### Performance

- Use lazy loading for heavy content
- Enable `keepAlive` sparingly
- Optimize tab content rendering

### UX Guidelines

- Keep tab labels concise (1-3 words)
- Use consistent tab ordering
- Provide visual feedback with badges/icons
- Handle empty states gracefully

### UX Guidelines

- Keep tab labels concise (1-3 words)
- Use consistent tab ordering
- Provide visual feedback with badges/icons
- Handle empty states gracefully

### Accessibility Guidelines

- Provide meaningful labels
- Use helper text for complex functionality
- Test keyboard navigation
- Ensure color contrast compliance

## Common Patterns

### Dashboard Tabs

```typescript
dashboardTabs: TabItem[] = [
  { value: 'overview', label: 'Overview', icon: '📊' },
  { value: 'analytics', label: 'Analytics', icon: '📈', badge: 'New' },
  { value: 'reports', label: 'Reports', icon: '📋' }
];
```

### Settings Tabs

```typescript
settingsTabs: TabItem[] = [
  { value: 'general', label: 'General' },
  { value: 'security', label: 'Security', badge: 2 },
  { value: 'billing', label: 'Billing' },
  { value: 'team', label: 'Team' }
];
```

### Wizard Steps

```typescript
wizardTabs: TabItem[] = [
  { value: 'step1', label: 'Basic Info', icon: '✓' },
  { value: 'step2', label: 'Details', disabled: !step1Complete },
  { value: 'step3', label: 'Review', disabled: !step2Complete }
];
```

## Troubleshooting

### Tabs not switching smoothly

- Ensure CSS transforms are enabled
- Check for conflicting animations

### Content not appearing

- Verify `data-tab` attributes match tab values
- Check if lazy loading is properly configured

### Accessibility warnings

- Add `ariaLabel` and `helperText`
- Ensure proper heading structure

### Performance issues

- Enable lazy loading for heavy content
- Use `trackBy` functions for dynamic tabs

For complete documentation, see [tabs-comprehensive.md](./tabs-comprehensive.md).
