# Avatar Component

A modern, accessible avatar component built with **Angular Signals** for optimal performance and reactive state management.

## Features

- 🎯 **Signal-based Architecture** - Modern Angular reactive primitives
- 🏃 **Performance Optimized** - No subscriptions, pure signal reactivity  
- 🖼️ **Smart Image Loading** - Automatic fallback with timeout handling
- ♿ **Accessibility First** - ARIA compliant with semantic roles
- 📱 **Responsive Design** - 5 size variants from sm to 2xl
- 🔄 **Graceful Fallbacks** - Seamless image error handling

## Installation

```bash
ngsui-cli add avatar
```

## Import

```typescript
import { Avatar, AvatarImage, AvatarFallback } from '@components/avatar';
```

## Usage

### Basic Avatar

```typescript
@Component({
  template: `
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  `
})
```

### Different Sizes

```typescript
@Component({
  template: `
    <div class="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarImage src="https://github.com/shadcn.png" alt="Small" />
        <AvatarFallback size="sm">SM</AvatarFallback>
      </Avatar>
      
      <Avatar size="default">
        <AvatarImage src="https://github.com/shadcn.png" alt="Default" />
        <AvatarFallback size="default">DF</AvatarFallback>
      </Avatar>
      
      <Avatar size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="Large" />
        <AvatarFallback size="lg">LG</AvatarFallback>
      </Avatar>
      
      <Avatar size="xl">
        <AvatarImage src="https://github.com/shadcn.png" alt="Extra Large" />
        <AvatarFallback size="xl">XL</AvatarFallback>
      </Avatar>
      
      <Avatar size="2xl">
        <AvatarImage src="https://github.com/shadcn.png" alt="2X Large" />
        <AvatarFallback size="2xl">2XL</AvatarFallback>
      </Avatar>
    </div>
  `
})
```

### Fallback Only

```typescript
@Component({
  template: `
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  `
})
```

### Custom Styling

```typescript
@Component({
  template: `
    <Avatar className="ring-2 ring-primary ring-offset-2">
      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
      <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
    </Avatar>
  `
})
```

## API Reference

### Avatar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Size of the avatar |
| `className` | `string` | `undefined` | Additional CSS classes |
| `ariaLabel` | `string` | `'User avatar'` | Accessible label for the avatar |

### AvatarImage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `undefined` | Image source URL |
| `alt` | `string` | `undefined` | Alternative text for the image |
| `className` | `string` | `undefined` | Additional CSS classes |

### AvatarFallback

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Size of the fallback text |
| `className` | `string` | `undefined` | Additional CSS classes |
| `ariaLabel` | `string` | `'Avatar initials'` | Accessible label for the fallback |

## 🚀 Accessibility

**WCAG 2.1 AA Compliant** - The Avatar component follows accessibility best practices:

### ♿ **Screen Reader Support**

- **Semantic roles**: `role="img"` on Avatar container for proper identification
- **Descriptive labels**: Customizable `aria-label` on Avatar and AvatarFallback components
- **Hidden decorative elements**: `aria-hidden="true"` on AvatarImage and AvatarFallback to prevent redundant announcements
- **Meaningful alt text**: Required alt text on images for context

### ⌨️ **Keyboard Navigation**

- **Non-interactive**: Avatar components are display-only and don't interfere with keyboard navigation
- **No tab stops**: Decorative avatar elements don't receive focus
- **Proper semantics**: Uses appropriate ARIA roles and properties

### 👁️ **Visual Accessibility**

- **High contrast**: Clear visual distinction between avatar and background
- **Responsive text**: Fallback text scales appropriately with avatar size
- **Loading states**: Graceful handling of image loading failures
- **Color independence**: Information is not conveyed through color alone

### 🔧 **Implementation Notes**

- Avatar container receives the main `aria-label` - this is what screen readers announce
- AvatarImage and AvatarFallback are marked as `aria-hidden="true"` to prevent duplicate announcements
- Always provide meaningful `alt` text for AvatarImage components
- Use descriptive `ariaLabel` props for better context

## Examples

### User Profile

```typescript
@Component({
  template: `
    <div class="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="/users/john-doe.jpg" alt="John Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <p class="font-medium">John Doe</p>
        <p class="text-sm text-muted-foreground">john@example.com</p>
      </div>
    </div>
  `
})
```

### Status Indicators

```typescript
@Component({
  template: `
    <div class="relative">
      <Avatar>
        <AvatarImage src="/users/jane-smith.jpg" alt="Jane Smith" />
        <AvatarFallback>JS</AvatarFallback>
      </Avatar>
      <span class="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-white"></span>
    </div>
  `
})
```

### Team List

```typescript
@Component({
  template: `
    <div class="flex -space-x-2">
      <Avatar className="ring-2 ring-white">
        <AvatarImage src="/team/member1.jpg" alt="Member 1" />
        <AvatarFallback>M1</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-white">
        <AvatarImage src="/team/member2.jpg" alt="Member 2" />
        <AvatarFallback>M2</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-white">
        <AvatarFallback>+5</AvatarFallback>
      </Avatar>
    </div>
  `
})
```
