# Popover Component Configuration Guide

## Complete Configuration Options

| Configuration Option | Type | Default Value | Difficulty | Description | Example Usage |
|---------------------|------|---------------|------------|-------------|---------------|
| `isOpen` | `boolean` | `false` | ⭐ Very Easy | Controls whether the popover is visible | `[isOpen]="showPopover()"` |
| `triggerElement` | `ElementRef \| HTMLElement` | Required | ⭐ Very Easy | Element that triggers the popover | `[triggerElement]="myButton"` |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | ⭐ Very Easy | Visual style variant | `variant="success"` |
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | ⭐ Very Easy | Popover size | `size="lg"` |
| `class` | `string` | `''` | ⭐ Very Easy | Additional CSS classes | `class="custom-popover"` |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | ⭐⭐ Easy | Preferred side for positioning | `side="top"` |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | ⭐⭐ Easy | Alignment relative to trigger | `align="start"` |
| `offset` | `number` | `8` | ⭐⭐ Easy | Distance from trigger element | `[offset]="12"` |
| `avoidCollisions` | `boolean` | `true` | ⭐⭐ Easy | Enable collision detection | `[avoidCollisions]="false"` |
| `showArrow` | `boolean` | `false` | ⭐ Very Easy | Display arrow pointing to trigger | `[showArrow]="true"` |
| `showCloseButton` | `boolean` | `false` | ⭐ Very Easy | Display close button | `[showCloseButton]="true"` |
| `modal` | `boolean` | `false` | ⭐⭐⭐ Moderate | Prevent interaction with background | `[modal]="true"` |
| `showBackdrop` | `boolean` | `false` | ⭐⭐⭐ Moderate | Show backdrop overlay | `[showBackdrop]="true"` |
| `ariaLabelledby` | `string` | `''` | ⭐⭐⭐⭐ Advanced | ARIA labelledby attribute | `ariaLabelledby="header-id"` |
| `ariaDescribedby` | `string` | `''` | ⭐⭐⭐⭐ Advanced | ARIA describedby attribute | `ariaDescribedby="desc-id"` |
| `(openChange)` | `EventEmitter<boolean>` | - | ⭐⭐ Easy | Fires when popover opens/closes | `(openChange)="onToggle($event)"` |

## Configuration Difficulty Levels

### ⭐ Very Easy (Beginner-Friendly)

- **What it means**: Simple boolean or string properties that work out of the box
- **Skills needed**: Basic Angular template knowledge
- **Examples**: `isOpen`, `variant`, `size`, `showArrow`, `showCloseButton`

### ⭐⭐ Easy (Basic)

- **What it means**: Properties that require understanding of positioning concepts
- **Skills needed**: Basic CSS positioning knowledge
- **Examples**: `side`, `align`, `offset`, `avoidCollisions`, `(openChange)`

### ⭐⭐⭐ Moderate (Intermediate)

- **What it means**: Properties that affect component behavior and user interaction
- **Skills needed**: Understanding of modal patterns and UX principles
- **Examples**: `modal`, `showBackdrop`

### ⭐⭐⭐⭐ Advanced (Expert)

- **What it means**: Accessibility and advanced customization features
- **Skills needed**: ARIA specification knowledge and accessibility best practices
- **Examples**: `ariaLabelledby`, `ariaDescribedby`

## Quick Start Examples

### Basic Popover

```html
<button #trigger (click)="isOpen.set(!isOpen())">Click me</button>
<Popover 
  [isOpen]="isOpen()" 
  [triggerElement]="trigger"
  (openChange)="isOpen.set($event)">
  <p>Basic popover content</p>
</Popover>
```

### Feature-Rich Popover

```html
<button #trigger (click)="isOpen.set(!isOpen())">Advanced Popover</button>
<Popover 
  [isOpen]="isOpen()" 
  [triggerElement]="trigger"
  (openChange)="isOpen.set($event)"
  variant="success"
  size="lg"
  side="top"
  align="start"
  [showArrow]="true"
  [showCloseButton]="true"
  [offset]="12">
  <div>
    <h4>Success!</h4>
    <p>Your action was completed successfully.</p>
  </div>
</Popover>
```

### Modal Popover with Accessibility

```html
<button #trigger (click)="isOpen.set(!isOpen())" 
        aria-describedby="popover-desc">Show Modal</button>
<Popover 
  [isOpen]="isOpen()" 
  [triggerElement]="trigger"
  (openChange)="isOpen.set($event)"
  [modal]="true"
  [showBackdrop]="true"
  [showCloseButton]="true"
  ariaLabelledby="modal-title"
  ariaDescribedby="popover-desc">
  <div>
    <h4 id="modal-title">Important Notice</h4>
    <p id="popover-desc">This is a modal popover that requires your attention.</p>
  </div>
</Popover>
```

## Advanced Usage Patterns

### Edge Case Positioning

```html
<!-- Handles viewport edges automatically -->
<Popover 
  [isOpen]="isOpen()" 
  [triggerElement]="edgeTrigger"
  side="top"
  [avoidCollisions]="true"
  [offset]="16">
  <p>Automatically repositions when near viewport edges</p>
</Popover>
```

### Custom Styling

```html
<Popover 
  [isOpen]="isOpen()" 
  [triggerElement]="trigger"
  class="custom-popover shadow-2xl border-purple-500"
  variant="default">
  <div class="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
    <h3>Custom Styled Content</h3>
  </div>
</Popover>
```

### Confirmation Dialog

```html
<Popover 
  [isOpen]="confirmOpen()" 
  [triggerElement]="deleteButton"
  [modal]="true"
  [showBackdrop]="true"
  variant="error"
  size="sm">
  <div class="text-center">
    <h4 class="font-semibold mb-2">Confirm Delete</h4>
    <p class="text-sm mb-4">This action cannot be undone.</p>
    <div class="flex gap-2">
      <button (click)="confirmDelete()" class="btn-danger">Delete</button>
      <button (click)="confirmOpen.set(false)" class="btn-cancel">Cancel</button>
    </div>
  </div>
</Popover>
```

### Tooltip-Style

```html
<Popover 
  [isOpen]="tooltipOpen()" 
  [triggerElement]="helpIcon"
  size="sm"
  [showArrow]="true"
  side="top"
  [offset]="4">
  <p class="text-sm">This field accepts email addresses only</p>
</Popover>
```

### Rich Content Panel

```html
<Popover 
  [isOpen]="panelOpen()" 
  [triggerElement]="menuButton"
  size="xl"
  side="bottom"
  align="end"
  [showCloseButton]="true">
  <div class="p-4">
    <h3 class="text-lg font-semibold mb-3">User Profile</h3>
    <div class="flex items-center gap-3 mb-4">
      <img src="avatar.jpg" class="w-12 h-12 rounded-full" alt="Avatar">
      <div>
        <p class="font-medium">John Doe</p>
        <p class="text-sm text-gray-600">john@example.com</p>
      </div>
    </div>
    <nav class="space-y-2">
      <a href="/profile" class="block px-3 py-2 rounded hover:bg-gray-100">Profile Settings</a>
      <a href="/billing" class="block px-3 py-2 rounded hover:bg-gray-100">Billing</a>
      <a href="/logout" class="block px-3 py-2 rounded hover:bg-gray-100">Sign Out</a>
    </nav>
  </div>
</Popover>
```

## Best Practices

### Performance Tips

1. **Use signals for reactive state**: `isOpen = signal(false)`
2. **Implement proper cleanup**: Always handle `(openChange)` events
3. **Optimize re-renders**: Use `OnPush` change detection strategy

### Accessibility Guidelines

1. **Always provide ARIA labels** for complex content
2. **Use semantic HTML** within popover content
3. **Ensure keyboard navigation** works properly
4. **Test with screen readers** for accessibility compliance

### UX Recommendations

1. **Use modal sparingly**: Only for critical actions that require user attention
2. **Provide clear close mechanisms**: Either close button or click-outside behavior
3. **Consider mobile viewports**: Test positioning on smaller screens
4. **Use appropriate delays**: For hover-triggered popovers, add debouncing

### Common Pitfalls to Avoid

1. **Don't nest modal popovers**: Can create confusing user experiences
2. **Avoid too many simultaneous popovers**: Limit to one visible at a time
3. **Don't rely solely on hover**: Provide alternative triggers for mobile
4. **Test edge positioning**: Ensure content remains accessible near viewport edges

## Framework Integration

### With Forms

```typescript
// Component
confirmPassword = signal(false);

// Template
<input #passwordInput type="password" (blur)="validatePassword()">
<Popover 
  [isOpen]="showPasswordHelp()" 
  [triggerElement]="passwordInput"
  variant="info"
  size="sm">
  <ul class="text-sm space-y-1">
    <li>✓ At least 8 characters</li>
    <li>✓ Include uppercase and lowercase</li>
    <li>✓ Include numbers and symbols</li>
  </ul>
</Popover>
```

### With State Management

```typescript
// Service integration
@Injectable()
export class PopoverService {
  private activePopovers = signal<string[]>([]);
  
  openPopover(id: string) {
    this.activePopovers.update(current => [...current, id]);
  }
  
  closePopover(id: string) {
    this.activePopovers.update(current => 
      current.filter(popoverId => popoverId !== id)
    );
  }
}
```

## Migration Guide

### From Basic Tooltip Libraries

```typescript
// Before (basic tooltip)
<div tooltip="Simple text">Hover me</div>

// After (rich popover)
<button #trigger>Hover me</button>
<Popover [isOpen]="hoverState()" [triggerElement]="trigger">
  <div class="rich-content">
    <h4>Enhanced Tooltip</h4>
    <p>Rich content with actions</p>
  </div>
</Popover>
```

### From Modal Dialogs

```typescript
// Before (full modal)
<div class="modal-overlay" [class.visible]="showModal()">
  <div class="modal-content">Content</div>
</div>

// After (contextual popover)
<Popover 
  [isOpen]="showModal()" 
  [triggerElement]="triggerRef"
  [modal]="true"
  [showBackdrop]="true">
  Content
</Popover>
```

---

*This configuration guide covers all available options for the Popover component. For additional support or feature requests, please refer to the project documentation or open an issue.*

## Advanced Configuration Patterns

### Edge Case Positioning
The component automatically handles edge cases with 30+ fallback positions when `avoidCollisions="true"` (default):

```html
<Popover 
  side="top" 
  align="center"
  [avoidCollisions]="true"
  [offset]="8">
  <!-- Will automatically reposition if top doesn't fit -->
</Popover>
```

### Custom Styling
```html
<Popover 
  variant="default"
  class="custom-shadow border-2"
  size="xl">
  <!-- Combines built-in variant with custom classes -->
</Popover>
```

## Best Practices

1. **Always provide `triggerElement`** - Required for proper positioning
2. **Use `(openChange)` event** - Essential for proper state management
3. **Consider accessibility** - Add ARIA attributes for screen readers
4. **Test edge cases** - Ensure popover works near viewport boundaries
5. **Choose appropriate variants** - Match visual style to content purpose
6. **Use collision detection** - Keep `avoidCollisions="true"` unless specific needs

## Common Patterns

### Confirmation Dialog
```html
<Popover 
  variant="warning"
  [modal]="true"
  [showBackdrop]="true"
  [showCloseButton]="false">
  <!-- Confirmation content with action buttons -->
</Popover>
```

### Tooltip-Style
```html
<Popover 
  [showArrow]="true"
  size="sm"
  side="top"
  [offset]="4">
  <!-- Brief tooltip content -->
</Popover>
```

### Rich Content Panel
```html
<Popover 
  size="xl"
  variant="default"
  [showCloseButton]="true"
  side="right">
  <!-- Complex content with forms, images, etc. -->
</Popover>
```
