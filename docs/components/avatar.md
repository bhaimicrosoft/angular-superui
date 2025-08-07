# Avatar Component

A modern, accessible avatar component system built with **Angular Signals** for optimal performance and reactive state management. Features smart image loading, graceful fallbacks, and comprehensive shape variants.

## Features

- 🎯 **Signal-based Architecture** - Modern Angular reactive primitives for optimal performance
- 🏃 **Performance Optimized** - No subscriptions, pure signal reactivity  
- 🖼️ **Smart Image Loading** - Automatic fallback with timeout handling (5 seconds)
- ♿ **Accessibility First** - ARIA compliant with semantic roles and proper screen reader support
- 📱 **Responsive Design** - 10 size variants from sm to 7xl (32px to 224px)
- 🔄 **Graceful Fallbacks** - Seamless image error handling with custom fallback content
- 🔵 **Shape Variants** - Circle and square shapes to match your design aesthetic
- 🎨 **Highly Customizable** - Full Tailwind CSS integration with custom styling support

## Installation

```bash
ngsui add avatar
```

## Import

```typescript
import { Avatar, AvatarImage, AvatarFallback } from '@lib/avatar';
```

## Basic Usage

### Simple Avatar with Image and Fallback

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

### Fallback Only Avatar

```typescript
@Component({
  template: `
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  `
})
```

## Size Variants

The Avatar component supports 10 different size variants:

```typescript
@Component({
  template: `
    <div class="flex items-end gap-4">
      <!-- Small - 32px -->
      <Avatar size="sm">
        <AvatarImage src="https://picsum.photos/seed/user1/150/150" alt="Small Avatar" />
        <AvatarFallback size="sm">SM</AvatarFallback>
      </Avatar>
      
      <!-- Medium (Default) - 40px -->
      <Avatar size="md">
        <AvatarImage src="https://picsum.photos/seed/user2/150/150" alt="Medium Avatar" />
        <AvatarFallback size="md">MD</AvatarFallback>
      </Avatar>
      
      <!-- Large - 48px -->
      <Avatar size="lg">
        <AvatarImage src="https://picsum.photos/seed/user3/150/150" alt="Large Avatar" />
        <AvatarFallback size="lg">LG</AvatarFallback>
      </Avatar>
      
      <!-- Extra Large - 64px -->
      <Avatar size="xl">
        <AvatarImage src="https://picsum.photos/seed/user4/150/150" alt="Extra Large Avatar" />
        <AvatarFallback size="xl">XL</AvatarFallback>
      </Avatar>
      
      <!-- 2X Large - 80px -->
      <Avatar size="2xl">
        <AvatarImage src="https://picsum.photos/seed/user5/150/150" alt="2X Large Avatar" />
        <AvatarFallback size="2xl">2XL</AvatarFallback>
      </Avatar>
      
      <!-- 3X Large - 96px -->
      <Avatar size="3xl">
        <AvatarFallback size="3xl">3XL</AvatarFallback>
      </Avatar>
      
      <!-- 4X Large - 128px -->
      <Avatar size="4xl">
        <AvatarFallback size="4xl">4XL</AvatarFallback>
      </Avatar>
      
      <!-- 5X Large - 160px -->
      <Avatar size="5xl">
        <AvatarFallback size="5xl">5XL</AvatarFallback>
      </Avatar>
      
      <!-- 6X Large - 192px -->
      <Avatar size="6xl">
        <AvatarFallback size="6xl">6XL</AvatarFallback>
      </Avatar>
      
      <!-- 7X Large - 224px -->
      <Avatar size="7xl">
        <AvatarFallback size="7xl">7XL</AvatarFallback>
      </Avatar>
    </div>
  `
})
```

## Shape Variants

Choose between classic circular or modern square avatars:

```typescript
@Component({
  template: `
    <div class="flex gap-8">
      <!-- Circle Avatars -->
      <div class="space-y-4">
        <h3>Circle Shape</h3>
        <div class="flex gap-4">
          <!-- With Image -->
          <Avatar shape="circle" size="lg">
            <AvatarImage src="https://picsum.photos/seed/circle1/150/150" alt="Circle Avatar with Image" />
            <AvatarFallback shape="circle" size="lg">CI</AvatarFallback>
          </Avatar>
          
          <!-- Fallback Only -->
          <Avatar shape="circle" size="lg">
            <AvatarFallback shape="circle" size="lg">CF</AvatarFallback>
          </Avatar>
          
          <!-- Icon Fallback -->
          <Avatar shape="circle" size="lg">
            <AvatarFallback shape="circle" size="lg">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <!-- Square Avatars -->
      <div class="space-y-4">
        <h3>Square Shape</h3>
        <div class="flex gap-4">
          <!-- With Image -->
          <Avatar shape="square" size="lg">
            <AvatarImage src="https://picsum.photos/seed/square1/150/150" alt="Square Avatar with Image" />
            <AvatarFallback shape="square" size="lg">SI</AvatarFallback>
          </Avatar>
          
          <!-- Fallback Only -->
          <Avatar shape="square" size="lg">
            <AvatarFallback shape="square" size="lg">SF</AvatarFallback>
          </Avatar>
          
          <!-- Icon Fallback -->
          <Avatar shape="square" size="lg">
            <AvatarFallback shape="square" size="lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  `
})
```

## Advanced Examples

### User Profile Cards

```typescript
@Component({
  template: `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Profile Card 1 -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center space-x-4">
          <Avatar size="lg" className="ring-2 ring-violet-200 ring-offset-2">
            <AvatarImage src="https://picsum.photos/seed/profile1/150/150" alt="Sarah Johnson" />
            <AvatarFallback size="lg" className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">SJ</AvatarFallback>
          </Avatar>
          <div>
            <h3 class="font-semibold text-lg">Sarah Johnson</h3>
            <p class="text-violet-600 text-sm font-medium">Product Designer</p>
            <p class="text-gray-500 text-sm">sarah@company.com</p>
          </div>
        </div>
        <div class="mt-4 flex gap-2">
          <span class="px-2 py-1 bg-violet-100 text-violet-800 rounded-full text-xs">Design</span>
          <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">UI/UX</span>
        </div>
      </div>

      <!-- Profile Card 2 -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center space-x-4">
          <Avatar size="lg" className="ring-2 ring-blue-200 ring-offset-2">
            <AvatarImage src="https://picsum.photos/seed/profile2/150/150" alt="Michael Chen" />
            <AvatarFallback size="lg" className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">MC</AvatarFallback>
          </Avatar>
          <div>
            <h3 class="font-semibold text-lg">Michael Chen</h3>
            <p class="text-blue-600 text-sm font-medium">Frontend Developer</p>
            <p class="text-gray-500 text-sm">michael@company.com</p>
          </div>
        </div>
        <div class="mt-4 flex gap-2">
          <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Angular</span>
          <span class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">TypeScript</span>
        </div>
      </div>

      <!-- Profile Card 3 -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center space-x-4">
          <Avatar size="lg" className="ring-2 ring-emerald-200 ring-offset-2">
            <AvatarImage src="https://picsum.photos/seed/profile3/150/150" alt="Emma Rodriguez" />
            <AvatarFallback size="lg" className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">ER</AvatarFallback>
          </Avatar>
          <div>
            <h3 class="font-semibold text-lg">Emma Rodriguez</h3>
            <p class="text-emerald-600 text-sm font-medium">Backend Engineer</p>
            <p class="text-gray-500 text-sm">emma@company.com</p>
          </div>
        </div>
        <div class="mt-4 flex gap-2">
          <span class="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs">Node.js</span>
          <span class="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs">PostgreSQL</span>
        </div>
      </div>
    </div>
  `
})
```

### Status Indicators

```typescript
@Component({
  template: `
    <div class="flex gap-8">
      <!-- Online Status -->
      <div class="text-center">
        <div class="relative inline-block">
          <Avatar size="xl">
            <AvatarImage src="https://picsum.photos/seed/status1/150/150" alt="Online User" />
            <AvatarFallback size="xl" className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">ON</AvatarFallback>
          </Avatar>
          <span class="absolute bottom-0 right-0 h-4 w-4 bg-emerald-500 rounded-full ring-2 ring-white"></span>
        </div>
        <p class="mt-2 font-medium">Online</p>
        <p class="text-sm text-emerald-600">Available</p>
      </div>

      <!-- Away Status -->
      <div class="text-center">
        <div class="relative inline-block">
          <Avatar size="xl">
            <AvatarImage src="https://picsum.photos/seed/status2/150/150" alt="Away User" />
            <AvatarFallback size="xl" className="bg-gradient-to-br from-orange-500 to-yellow-600 text-white">AW</AvatarFallback>
          </Avatar>
          <span class="absolute bottom-0 right-0 h-4 w-4 bg-orange-500 rounded-full ring-2 ring-white"></span>
        </div>
        <p class="mt-2 font-medium">Away</p>
        <p class="text-sm text-orange-600">Be right back</p>
      </div>

      <!-- Busy Status -->
      <div class="text-center">
        <div class="relative inline-block">
          <Avatar size="xl">
            <AvatarImage src="https://picsum.photos/seed/status3/150/150" alt="Busy User" />
            <AvatarFallback size="xl" className="bg-gradient-to-br from-red-500 to-pink-600 text-white">BS</AvatarFallback>
          </Avatar>
          <span class="absolute bottom-0 right-0 h-4 w-4 bg-red-500 rounded-full ring-2 ring-white"></span>
        </div>
        <p class="mt-2 font-medium">Busy</p>
        <p class="text-sm text-red-600">Do not disturb</p>
      </div>

      <!-- Offline Status -->
      <div class="text-center">
        <div class="relative inline-block">
          <Avatar size="xl">
            <AvatarImage src="https://picsum.photos/seed/status4/150/150" alt="Offline User" />
            <AvatarFallback size="xl" className="bg-gradient-to-br from-gray-500 to-gray-600 text-white">OF</AvatarFallback>
          </Avatar>
          <span class="absolute bottom-0 right-0 h-4 w-4 bg-gray-400 rounded-full ring-2 ring-white"></span>
        </div>
        <p class="mt-2 font-medium">Offline</p>
        <p class="text-sm text-gray-500">Last seen 2h ago</p>
      </div>
    </div>
  `
})
```

### Team Avatar Stack

```typescript
@Component({
  template: `
    <div class="space-y-8">
      <!-- Design Team -->
      <div class="bg-white p-6 rounded-lg border">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Design Team</h3>
          <span class="text-sm text-gray-500">8 members</span>
        </div>
        <div class="mt-4 flex -space-x-2">
          <Avatar size="md" className="ring-2 ring-white">
            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">T1</AvatarFallback>
          </Avatar>
          <Avatar size="md" className="ring-2 ring-white">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">T2</AvatarFallback>
          </Avatar>
          <Avatar size="md" className="ring-2 ring-white">
            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">T3</AvatarFallback>
          </Avatar>
          <Avatar size="md" className="ring-2 ring-white">
            <AvatarFallback className="bg-gradient-to-br from-pink-500 to-rose-600 text-white">T4</AvatarFallback>
          </Avatar>
          <Avatar size="md" className="ring-2 ring-white">
            <AvatarFallback className="bg-gradient-to-br from-gray-500 to-gray-600 text-white">+4</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <!-- Development Team -->
      <div class="bg-white p-6 rounded-lg border">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Development Team</h3>
          <span class="text-sm text-gray-500">12 members</span>
        </div>
        <div class="mt-4 flex -space-x-2">
          <Avatar size="md" className="ring-2 ring-white">
            <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white">D1</AvatarFallback>
          </Avatar>
          <Avatar size="md" className="ring-2 ring-white">
            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">D2</AvatarFallback>
          </Avatar>
          <Avatar size="md" className="ring-2 ring-white">
            <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-600 text-white">D3</AvatarFallback>
          </Avatar>
          <Avatar size="md" className="ring-2 ring-white">
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">D4</AvatarFallback>
          </Avatar>
          <Avatar size="md" className="ring-2 ring-white">
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">+8</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  `
})
```

### Interactive Demo Component

```typescript
@Component({
  selector: 'avatar-interactive-demo',
  template: `
    <div class="space-y-6">
      <div class="text-center">
        <h3 class="text-lg font-semibold mb-4">Interactive Example</h3>
        
        <!-- Size Controls -->
        <div class="mb-4">
          <p class="text-sm font-medium mb-2">Size</p>
          <div class="flex flex-wrap justify-center gap-2">
            <button
              *ngFor="let size of avatarSizes"
              (click)="setSelectedSize(size)"
              [class]="getButtonClasses(size === selectedSize())"
            >
              {{ size.toUpperCase() }}
            </button>
          </div>
        </div>

        <!-- Shape Controls -->
        <div class="mb-6">
          <p class="text-sm font-medium mb-2">Shape</p>
          <div class="flex justify-center gap-2">
            <button
              *ngFor="let shape of avatarShapes"
              (click)="setSelectedShape(shape)"
              [class]="getButtonClasses(shape === selectedShape())"
            >
              {{ shape | titlecase }}
            </button>
          </div>
        </div>

        <!-- Interactive Avatar -->
        <Avatar [size]="selectedSize()" [shape]="selectedShape()" className="mx-auto ring-2 ring-violet-200 ring-offset-2">
          <AvatarImage src="https://picsum.photos/seed/interactive/150/150" alt="Interactive Avatar" />
          <AvatarFallback [size]="selectedSize()" [shape]="selectedShape()" className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">
            IA
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  `
})
export class AvatarInteractiveDemoComponent {
  avatarSizes = signal(['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']);
  avatarShapes = signal(['circle', 'square']);
  selectedSize = signal('xl');
  selectedShape = signal('circle');

  setSelectedSize(size: string) {
    this.selectedSize.set(size);
  }

  setSelectedShape(shape: string) {
    this.selectedShape.set(shape);
  }

  getButtonClasses(isSelected: boolean): string {
    return isSelected
      ? 'px-3 py-1 text-xs font-medium rounded-md bg-violet-500 text-white'
      : 'px-3 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200';
  }
}
```

## API Reference

### Avatar

The main container component that provides context and styling.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| '5xl' \| '6xl' \| '7xl'` | `'md'` | Size of the avatar (32px to 224px) |
| `shape` | `'circle' \| 'square'` | `'circle'` | Shape variant of the avatar |
| `className` | `string` | `undefined` | Additional CSS classes for custom styling |

### AvatarImage

The image component with smart loading and error handling.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `undefined` | Image source URL |
| `alt` | `string` | `undefined` | Alternative text for the image (required for accessibility) |
| `className` | `string` | `undefined` | Additional CSS classes |

**Image Loading Behavior:**
- Images load with `loading="eager"` for immediate visibility
- 5-second timeout for loading - shows fallback if image doesn't load
- Automatic error handling - hides image element on failure to prevent alt text display
- Inherits shape from parent Avatar component

### AvatarFallback

The fallback component shown when image is unavailable or loading.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| '5xl' \| '6xl' \| '7xl'` | `'md'` | Size of the fallback text/content |
| `shape` | `'circle' \| 'square'` | `'circle'` | Shape variant of the fallback |
| `className` | `string` | `undefined` | Additional CSS classes |
| `ariaLabel` | `string` | `'Avatar fallback'` | Accessible label for the fallback |

**Fallback Display Logic:**
- Always shows when no AvatarImage is present (pure fallback)
- Shows while image is loading
- Shows when image fails to load or times out
- Hides when image loads successfully
- Supports text, initials, icons, or custom content

## Size Reference

| Size | Dimensions | Text Size | Use Case |
|------|------------|-----------|----------|
| `sm` | 32px × 32px | 12px | Small lists, compact layouts |
| `md` | 40px × 40px | 14px | Default size, most common use |
| `lg` | 48px × 48px | 16px | Profile sections, cards |
| `xl` | 64px × 64px | 18px | User profiles, headers |
| `2xl` | 80px × 80px | 20px | Profile pages, avatars with status |
| `3xl` | 96px × 96px | 24px | Large profile displays |
| `4xl` | 128px × 128px | 30px | Hero sections, main profiles |
| `5xl` | 160px × 160px | 36px | Very large displays |
| `6xl` | 192px × 192px | 48px | Extra large hero sections |
| `7xl` | 224px × 224px | 60px | Maximum size for special cases |

## 🚀 Accessibility

**WCAG 2.1 AA Compliant** - The Avatar component follows accessibility best practices:

### ♿ **Screen Reader Support**

- **Semantic roles**: `role="img"` on AvatarFallback for proper identification
- **Descriptive labels**: Customizable `aria-label` on AvatarFallback component
- **Meaningful alt text**: Required alt text on AvatarImage for context
- **Hidden decorative states**: Images are hidden when failed to prevent broken alt text display

### ⌨️ **Keyboard Navigation**

- **Non-interactive**: Avatar components are display-only and don't interfere with keyboard navigation
- **No tab stops**: Decorative avatar elements don't receive focus
- **Proper semantics**: Uses appropriate ARIA roles and properties

### 👁️ **Visual Accessibility**

- **High contrast**: Clear visual distinction between avatar and background
- **Responsive text**: Fallback text scales appropriately with avatar size (12px to 60px)
- **Loading states**: Graceful handling of image loading failures with timeout (5 seconds)
- **Shape clarity**: Clear visual distinction between circle and square variants
- **Color independence**: Information is not conveyed through color alone

### 🔧 **Implementation Notes**

- Always provide meaningful `alt` text for AvatarImage components
- Use descriptive `ariaLabel` props on AvatarFallback for better context
- AvatarFallback receives the main accessibility focus as the primary content
- Images are completely hidden on error to prevent browser alt text from showing over fallbacks

## 🎯 Performance

### Signal-Based Architecture

- **Zero subscriptions**: Uses Angular signals for reactive state management
- **Optimized change detection**: Computed signals update only when dependencies change
- **Memory efficient**: No memory leaks from forgotten subscriptions
- **Fast updates**: Direct signal updates without observable chains

### Smart Loading Strategy

- **Immediate rendering**: Fallbacks show instantly while images load
- **Timeout handling**: 5-second timeout prevents indefinite loading states
- **Error recovery**: Automatic fallback to content when images fail
- **Minimal DOM**: Failed images are removed from DOM to prevent layout issues

### CSS Optimization

- **CVA variants**: Type-safe CSS variants with optimal bundle size
- **Tailwind integration**: Uses utility classes for minimal CSS footprint
- **GPU acceleration**: Hover effects use transform properties for smooth animation
- **Responsive by default**: All sizes scale appropriately across devices

## 🔧 Technical Implementation

### State Management

The Avatar component uses a local service instance (`AvatarStateService`) for each avatar, preventing state interference between multiple avatars on the same page.

```typescript
// Each Avatar component gets its own state service
@Component({
  selector: 'Avatar',
  providers: [AvatarStateService], // Local service instance
  // ...
})
```

### Signal Architecture

```typescript
// Internal state signals
private readonly _imageLoaded = signal<boolean>(false);
private readonly _imageError = signal<boolean>(false);
private readonly _imageAttempted = signal<boolean>(false);

// Computed display logic
protected readonly shouldShowFallback = computed(() => {
  if (!this.avatarState.imageAttempted()) {
    return true; // Pure fallback scenario
  }
  return !this.avatarState.imageLoaded() || this.avatarState.imageError();
});
```

### Error Handling

```typescript
// Image error handling with timeout
ngOnInit() {
  this.avatarState.setImageAttempted(true);
  
  this.loadTimeout = window.setTimeout(() => {
    if (!this._imageLoaded()) {
      this._imageError.set(true);
      this.avatarState.setImageError(true);
    }
  }, 5000);
}
```

## 🎨 Styling Guide

### Default Theme

The Avatar component uses a neutral gray theme by default:

- **Background**: `bg-slate-100 dark:bg-slate-800`
- **Text**: `text-slate-900 dark:text-slate-50`
- **Border radius**: `rounded-full` (circle) or `rounded-lg` (square)

### Custom Gradient Examples

```typescript
// Violet gradient
className="bg-gradient-to-br from-violet-500 to-purple-600 text-white"

// Blue gradient  
className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white"

// Emerald gradient
className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white"

// Pink gradient
className="bg-gradient-to-br from-pink-500 to-rose-600 text-white"
```

### Ring Effects

```typescript
// Subtle ring
className="ring-2 ring-violet-200 dark:ring-violet-800 ring-offset-2"

// Hover ring
className="transition-all duration-300 hover:ring-4 hover:ring-violet-200"

// Status ring
className="ring-2 ring-white" // For stacked avatars
```

## Common Use Cases

1. **User Profiles** - Profile pictures with fallback initials
2. **Team Lists** - Stacked avatars showing team members
3. **Status Indicators** - Avatars with online/offline badges
4. **Comment Systems** - Small avatars next to user comments
5. **Navigation** - User avatar in app headers
6. **Directory Listings** - Employee/member directories
7. **Chat Applications** - Conversation participant avatars
8. **Notification Systems** - User avatars in activity feeds

## Migration from V1

If migrating from an older avatar implementation:

1. **Component Structure**: Now uses three separate components (`Avatar`, `AvatarImage`, `AvatarFallback`)
2. **Size Props**: Extended from 5 sizes to 10 sizes (sm to 7xl)
3. **Shape Support**: Added `shape` prop with `circle` and `square` variants
4. **Signal Architecture**: Replaced observables with Angular signals
5. **Improved Accessibility**: Enhanced ARIA support and screen reader compatibility
6. **Better Error Handling**: Images are hidden on error instead of showing alt text
```

## Custom Styling

### Gradient Backgrounds

```typescript
@Component({
  template: `
    <div class="flex gap-4">
      <Avatar className="ring-2 ring-violet-200 ring-offset-2">
        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">VI</AvatarFallback>
      </Avatar>
      
      <Avatar className="ring-2 ring-blue-200 ring-offset-2">
        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">BL</AvatarFallback>
      </Avatar>
      
      <Avatar className="ring-2 ring-emerald-200 ring-offset-2">
        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">EM</AvatarFallback>
      </Avatar>
    </div>
  `
})
```

### Hover Effects

```typescript
@Component({
  template: `
    <Avatar className="transition-all duration-300 hover:scale-110 hover:ring-4 hover:ring-violet-200">
      <AvatarImage src="https://picsum.photos/seed/hover/150/150" alt="Hover Effect" />
      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">HV</AvatarFallback>
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
