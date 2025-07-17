# Badge Component

A modern, accessible badge component for displaying status, labels, and notifications.

## Features

- 🎯 **4 Variants** - Default, Secondary, Destructive, Outline
- ♿ **Accessibility First** - ARIA compliant with semantic roles
- 📱 **Responsive Design** - Consistent sizing across all screen sizes
- 🎨 **Customizable** - Easy to style with Tailwind CSS classes
- 🔧 **TypeScript** - Full type safety with CVA variants

## Installation

```bash
ngsui-cli add badge
```

## Usage

### Basic Badge

```typescript
import { Component } from '@angular/core';
import { Badge } from '@components/badge';

@Component({
  standalone: true,
  imports: [Badge],
  template: `
    <Badge variant="default">New</Badge>
  `
})
export class MyComponent {}
```

### All Variants

```typescript
@Component({
  template: `
    <div class="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  `
})
```

### With Numbers

```typescript
@Component({
  template: `
    <div class="flex items-center gap-2">
      <span>Notifications</span>
      <Badge variant="destructive">99+</Badge>
    </div>
  `
})
```

### Custom Styling

```typescript
@Component({
  template: `
    <Badge 
      variant="outline" 
      className="border-green-500 text-green-700 dark:text-green-400"
    >
      Custom
    </Badge>
  `
})
```

## API Reference

### Badge

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline'` | `'default'` | Visual style variant |
| `className` | `string` | `undefined` | Additional CSS classes |
| `ariaLabel` | `string` | `undefined` | Accessible label for screen readers |
| `ariaDescribedby` | `string` | `undefined` | ID of element that describes the badge |
| `role` | `'status' \| 'note' \| 'img' \| 'generic' \| 'alert'` | `'note'` | ARIA role (auto-assigned based on variant) |
| `ariaLive` | `'off' \| 'polite' \| 'assertive'` | `'off'` | Live region announcement behavior |
| `asLink` | `boolean` | `false` | Render badge as a clickable link |
| `href` | `string` | `undefined` | URL when used as link (requires asLink=true) |

## 🚀 Accessibility

**WCAG 2.1 AA Compliant** - The Badge component follows accessibility best practices:

### ♿ **Screen Reader Support**

- **Smart ARIA roles**: Automatic role assignment based on variant and usage
  - `destructive` → `role="alert"` for urgent notifications
  - `default/secondary` → `role="status"` when dynamic, `role="note"` when static
  - `outline` → `role="note"` for informational content
- **Live regions**: Optional `ariaLive` for dynamic content announcements
- **Descriptive labels**: `ariaLabel` and `ariaDescribedby` support
- **Contextual meaning**: Role adapts to content and variant semantics

### ⌨️ **Keyboard Navigation**

- **Link support**: Optional `asLink` mode with full keyboard accessibility
- **Focus management**: Proper focus indicators and outline for interactive badges
- **Tab order**: Links are included in natural tab sequence
- **Non-interactive fallback**: Static badges don't interfere with navigation

### 👁️ **Visual Accessibility**

- **High contrast**: All variants meet WCAG AA contrast requirements
- **Color independence**: Information is not conveyed through color alone
- **Consistent sizing**: Readable text at all sizes
- **Focus indicators**: N/A - badges are non-interactive

### 🔧 **Implementation Notes**

- **Automatic role assignment**: Component intelligently assigns ARIA roles based on variant
- **Live regions**: Use `ariaLive="polite"` for non-urgent updates, `"assertive"` for critical alerts
- **Link mode**: Set `[asLink]="true"` and provide `href` for clickable badges
- **Contextual descriptions**: Use `ariaDescribedby` to reference detailed explanations
- **Content guidelines**: Keep badge text concise (1-3 words recommended)

## Examples

### Status Indicators

```typescript
@Component({
  template: `
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <span>Build Status</span>
        <Badge variant="default">Passing</Badge>
      </div>
      
      <div class="flex items-center gap-2">
        <span>Deploy Status</span>
        <Badge variant="destructive">Failed</Badge>
      </div>
      
      <div class="flex items-center gap-2">
        <span>Feature Flag</span>
        <Badge variant="outline">Beta</Badge>
      </div>
    </div>
  `
})
```

### Notification Counts

```typescript
@Component({
  template: `
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <span>Messages</span>
        <Badge variant="default" [ariaLabel]="'12 unread messages'">12</Badge>
      </div>
      
      <div class="flex items-center gap-2">
        <span>Notifications</span>
        <Badge variant="destructive" [ariaLabel]="'99 or more notifications'">99+</Badge>
      </div>
    </div>
  `
})
```

### Feature Labels

```typescript
@Component({
  template: `
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <h3>Advanced Analytics</h3>
        <Badge variant="secondary">Pro</Badge>
      </div>
      
      <div class="flex items-center gap-2">
        <h3>AI Assistant</h3>
        <Badge variant="outline">Coming Soon</Badge>
      </div>
    </div>
  `
})
```

### Interactive Badges (Links)

```typescript
@Component({
  template: `
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <span>Documentation</span>
        <Badge 
          variant="outline" 
          [asLink]="true" 
          href="/docs"
          [ariaLabel]="'View documentation'"
        >
          View Docs
        </Badge>
      </div>
      
      <div class="flex items-center gap-2">
        <span>Support</span>
        <Badge 
          variant="secondary" 
          [asLink]="true" 
          href="/support"
          [ariaLabel]="'Get help and support'"
        >
          Help
        </Badge>
      </div>
    </div>
  `
})
```

### Dynamic Content with Live Regions

```typescript
@Component({
  template: `
    <div class="flex items-center gap-2">
      <span>Build Status</span>
      <Badge 
        variant="destructive"
        ariaLive="assertive"
        [ariaLabel]="'Build failed - requires immediate attention'"
      >
        Failed
      </Badge>
    </div>
    
    <div class="flex items-center gap-2">
      <span>Online Users</span>
      <Badge 
        variant="default"
        ariaLive="polite"
        [ariaLabel]="'Currently ' + userCount + ' users online'"
      >
        {{userCount}}
      </Badge>
    </div>
  `
})
export class StatusComponent {
  userCount = 42;
}
```

### Advanced ARIA Usage

```typescript
@Component({
  template: `
    <div class="space-y-3">
      <!-- Badge with description reference -->
      <div class="flex items-center gap-2">
        <span>Security Score</span>
        <Badge 
          variant="default"
          ariaDescribedby="security-help"
          [ariaLabel]="'Security score: 95 out of 100'"
        >
          95/100
        </Badge>
      </div>
      <p id="security-help" class="text-sm text-muted-foreground">
        Security score based on encryption, authentication, and monitoring practices.
      </p>
      
      <!-- Alert badge for errors -->
      <div class="flex items-center gap-2">
        <span>System Status</span>
        <Badge 
          variant="destructive"
          role="alert"
          [ariaLabel]="'Critical system error detected'"
        >
          Error
        </Badge>
      </div>
    </div>
  `
})
```

## Styling

The Badge component uses Tailwind CSS classes and can be customized using the `className` prop:

```typescript
// Custom colors
<Badge className="bg-purple-100 text-purple-800 border-purple-200">Purple</Badge>

// Larger size
<Badge className="px-3 py-1 text-sm">Large</Badge>

// With icon
<Badge className="flex items-center gap-1">
  <Icon name="star" class="w-3 h-3" />
  Featured
</Badge>
```

## Best Practices

1. **Keep content concise** - Badges should contain brief, scannable text
2. **Use semantic variants** - Choose variants that match the content meaning
3. **Provide context** - Use `ariaLabel` for numbers or abbreviated content
4. **Don't overuse** - Too many badges can create visual clutter
5. **Consider interactive alternatives** - For clickable badges, use buttons or links instead
