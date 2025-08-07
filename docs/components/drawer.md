# Drawer

A flexible drawer component that slides in from any side of the screen. Perfect for navigation menus, shopping carts, forms, and other overlay content.

## Features

- **Multi-directional**: Slides from top, right, bottom, or left
- **Backdrop Click to Close**: Automatic closing when clicking outside the drawer
- **Keyboard Navigation**: ESC key support for accessibility
- **Signal-based Architecture**: Modern Angular patterns with signal inputs and outputs
- **Customizable Overlay**: Control backdrop appearance and behavior
- **Smooth Animations**: CSS transitions for professional UX
- **Accessibility Compliant**: ARIA attributes and keyboard navigation

## Installation

Install using the Angular SuperUI CLI:

```bash
npx ngsui add drawer
```

This will:
- Add the drawer component to your project
- Install any required dependencies
- Update your module imports

## Usage

### Basic Drawer

```typescript
@Component({
  template: `
    <Button (buttonClick)="drawerOpen.set(true)">Open Drawer</Button>
    
    <Drawer 
      [open]="drawerOpen()" 
      direction="right"
      (openChange)="drawerOpen.set($event)"
    >
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-4">Drawer Content</h2>
        <p>This is the drawer content.</p>
        <Button (buttonClick)="drawerOpen.set(false)">Close</Button>
      </div>
    </Drawer>
  `
})
export class BasicDrawerExample {
  drawerOpen = signal(false);
}
```

### Shopping Cart Drawer

```typescript
@Component({
  template: `
    <Button (buttonClick)="cartOpen.set(true)" class="relative">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5a1 1 0 001 1.1h9.2a1 1 0 001-1.1L15 13M7 13v5a2 2 0 002 2h6a2 2 0 002-2v-5">
        </path>
      </svg>
      <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {{ cartItems().length }}
      </span>
    </Button>

    <Drawer 
      [open]="cartOpen()" 
      direction="right"
      (openChange)="cartOpen.set($event)"
    >
      <div class="p-6 h-full flex flex-col">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold">Shopping Cart</h2>
          <Button variant="ghost" size="icon" (buttonClick)="cartOpen.set(false)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </Button>
        </div>

        <div class="flex-1 overflow-y-auto">
          @for (item of cartItems(); track item.id) {
            <div class="flex items-center gap-4 p-4 border-b border-gray-200">
              <img [src]="item.image" [alt]="item.name" class="w-16 h-16 object-cover rounded">
              <div class="flex-1">
                <h3 class="font-medium">{{ item.name }}</h3>
                <p class="text-gray-600">${{ item.price }}</p>
                <div class="flex items-center gap-2 mt-2">
                  <Button variant="outline" size="sm" (buttonClick)="updateQuantity(item.id, item.quantity - 1)">-</Button>
                  <span class="px-3 py-1 bg-gray-100 rounded">{{ item.quantity }}</span>
                  <Button variant="outline" size="sm" (buttonClick)="updateQuantity(item.id, item.quantity + 1)">+</Button>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                (buttonClick)="removeItem(item.id)"
                class="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                Remove
              </Button>
            </div>
          } @empty {
            <div class="text-center py-8 text-gray-500">
              <p>Your cart is empty</p>
            </div>
          }
        </div>

        @if (cartItems().length > 0) {
          <div class="border-t pt-4 mt-4">
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg font-semibold">Total: ${{ total() }}</span>
            </div>
            <div class="space-y-2">
              <Button class="w-full" (buttonClick)="checkout()">
                Proceed to Checkout
              </Button>
              <Button variant="outline" class="w-full" (buttonClick)="cartOpen.set(false)">
                Continue Shopping
              </Button>
            </div>
          </div>
        }
      </div>
    </Drawer>
  `
})
export class ShoppingCartExample {
  cartOpen = signal(false);
  cartItems = signal([
    { id: 1, name: 'Wireless Headphones', price: 99.99, quantity: 1, image: '/headphones.jpg' },
    { id: 2, name: 'Smart Watch', price: 249.99, quantity: 2, image: '/watch.jpg' }
  ]);

  total = computed(() => 
    this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  updateQuantity(id: number, newQuantity: number) {
    if (newQuantity <= 0) {
      this.removeItem(id);
      return;
    }
    
    this.cartItems.update(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  removeItem(id: number) {
    this.cartItems.update(items => items.filter(item => item.id !== id));
  }

  checkout() {
    console.log('Proceeding to checkout with items:', this.cartItems());
    this.cartOpen.set(false);
  }
}
```

### Navigation Drawer

```typescript
@Component({
  template: `
    <Button (buttonClick)="navOpen.set(true)">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </Button>

    <Drawer 
      [open]="navOpen()" 
      direction="left"
      (openChange)="navOpen.set($event)"
    >
      <nav class="p-6">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-xl font-semibold">Navigation</h2>
          <Button variant="ghost" size="icon" (buttonClick)="navOpen.set(false)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </Button>
        </div>

        <ul class="space-y-2">
          @for (item of navigationItems; track item.label) {
            <li>
              <a 
                [href]="item.href" 
                class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                (click)="navOpen.set(false)"
              >
                <span [innerHTML]="item.icon"></span>
                {{ item.label }}
              </a>
            </li>
          }
        </ul>
      </nav>
    </Drawer>
  `
})
export class NavigationDrawerExample {
  navOpen = signal(false);
  
  navigationItems = [
    { 
      label: 'Dashboard', 
      href: '/dashboard',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z"></path></svg>'
    },
    { 
      label: 'Products', 
      href: '/products',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>'
    },
    { 
      label: 'Orders', 
      href: '/orders',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>'
    },
    { 
      label: 'Settings', 
      href: '/settings',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>'
    }
  ];
}
```

### Directions

```typescript
@Component({
  template: `
    <div class="space-x-4">
      <Button (buttonClick)="openDrawer('top')">Top</Button>
      <Button (buttonClick)="openDrawer('right')">Right</Button>
      <Button (buttonClick)="openDrawer('bottom')">Bottom</Button>
      <Button (buttonClick)="openDrawer('left')">Left</Button>
    </div>

    <Drawer 
      [open]="drawerOpen()" 
      [direction]="drawerDirection()"
      (openChange)="drawerOpen.set($event)"
    >
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-4">{{ drawerDirection() | titlecase }} Drawer</h2>
        <p>This drawer slides in from the {{ drawerDirection() }}.</p>
        <Button (buttonClick)="drawerOpen.set(false)" class="mt-4">Close</Button>
      </div>
    </Drawer>
  `
})
export class DirectionalDrawerExample {
  drawerOpen = signal(false);
  drawerDirection = signal<'top' | 'right' | 'bottom' | 'left'>('right');

  openDrawer(direction: 'top' | 'right' | 'bottom' | 'left') {
    this.drawerDirection.set(direction);
    this.drawerOpen.set(true);
  }
}
```

### Custom Overlay

```typescript
@Component({
  template: `
    <Button (buttonClick)="customDrawerOpen.set(true)">Open Custom Drawer</Button>

    <Drawer 
      [open]="customDrawerOpen()" 
      direction="right"
      [showOverlay]="false"
      (openChange)="customDrawerOpen.set($event)"
    >
      <div class="p-6 bg-gradient-to-b from-blue-50 to-white h-full">
        <h2 class="text-xl font-semibold mb-4">Custom Styled Drawer</h2>
        <p>This drawer has no overlay backdrop.</p>
        <Button (buttonClick)="customDrawerOpen.set(false)" class="mt-4">Close</Button>
      </div>
    </Drawer>
  `
})
export class CustomOverlayExample {
  customDrawerOpen = signal(false);
}
```

### Form Drawer

```typescript
@Component({
  template: `
    <Button (buttonClick)="formDrawerOpen.set(true)">Add New Item</Button>

    <Drawer 
      [open]="formDrawerOpen()" 
      direction="right"
      (openChange)="handleDrawerChange($event)"
    >
      <form (ngSubmit)="onSubmit()" class="p-6 h-full flex flex-col">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold">Add New Item</h2>
          <Button variant="ghost" size="icon" (buttonClick)="closeForm()">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </Button>
        </div>

        <div class="flex-1 space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              id="name" 
              [(ngModel)]="formData.name" 
              name="name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter item name"
              required
            >
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              id="description" 
              [(ngModel)]="formData.description" 
              name="description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
            ></textarea>
          </div>

          <div>
            <label for="price" class="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input 
              id="price" 
              type="number" 
              [(ngModel)]="formData.price" 
              name="price"
              step="0.01"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              required
            >
          </div>
        </div>

        <div class="flex gap-2 pt-4 border-t">
          <Button type="submit" class="flex-1">Save Item</Button>
          <Button type="button" variant="outline" (buttonClick)="closeForm()">Cancel</Button>
        </div>
      </form>
    </Drawer>
  `
})
export class FormDrawerExample {
  formDrawerOpen = signal(false);
  formData = {
    name: '',
    description: '',
    price: 0
  };

  handleDrawerChange(open: boolean) {
    if (!open) {
      this.resetForm();
    }
    this.formDrawerOpen.set(open);
  }

  onSubmit() {
    console.log('Form submitted:', this.formData);
    this.formDrawerOpen.set(false);
    this.resetForm();
  }

  closeForm() {
    this.formDrawerOpen.set(false);
    this.resetForm();
  }

  resetForm() {
    this.formData = { name: '', description: '', price: 0 };
  }
}
```

## API Reference

### Drawer Component

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls the open/closed state of the drawer |
| `direction` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | Direction from which the drawer slides in |
| `showOverlay` | `boolean` | `true` | Whether to show the backdrop overlay |
| `closeOnOverlayClick` | `boolean` | `true` | Whether clicking the overlay closes the drawer |
| `closeOnEscape` | `boolean` | `true` | Whether pressing ESC closes the drawer |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `openChange` | `EventEmitter<boolean>` | Emitted when the drawer open state changes |

### CSS Classes

The drawer component uses the following CSS classes that can be customized:

```css
/* Main drawer container */
.ngsui-drawer-container {
  /* Custom styles */
}

/* Drawer content panel */
.ngsui-drawer-panel {
  /* Custom styles */
}

/* Backdrop overlay */
.ngsui-drawer-overlay {
  /* Custom styles */
}

/* Direction-specific classes */
.ngsui-drawer-top { /* Top direction styles */ }
.ngsui-drawer-right { /* Right direction styles */ }
.ngsui-drawer-bottom { /* Bottom direction styles */ }
.ngsui-drawer-left { /* Left direction styles */ }
```

### Accessibility

The Drawer component includes built-in accessibility features:

- **ARIA Attributes**: Proper `role`, `aria-hidden`, and `aria-modal` attributes
- **Keyboard Navigation**: ESC key closes the drawer
- **Focus Management**: Focus is managed when opening and closing
- **Screen Reader Support**: Proper announcements for state changes

```typescript
@Component({
  template: `
    <Drawer 
      [open]="drawerOpen()" 
      direction="right"
      (openChange)="drawerOpen.set($event)"
      [attr.aria-label]="'Navigation menu'"
      [attr.aria-labelledby]="'drawer-title'"
    >
      <div class="p-6">
        <h2 id="drawer-title" class="text-xl font-semibold mb-4">Accessible Drawer</h2>
        <p>This drawer follows accessibility best practices.</p>
      </div>
    </Drawer>
  `
})
```

## Styling

The Drawer component uses Tailwind CSS classes and can be customized using:

### Custom Classes

```typescript
@Component({
  template: `
    <Drawer 
      [open]="drawerOpen()" 
      direction="right"
      class="custom-drawer"
    >
      <div class="p-6 bg-gradient-to-b from-purple-50 to-white">
        Custom styled content
      </div>
    </Drawer>
  `
})
```

### CSS Custom Properties

```css
:root {
  --drawer-width: 320px;
  --drawer-height: 250px;
  --drawer-transition-duration: 300ms;
  --drawer-overlay-bg: rgba(0, 0, 0, 0.5);
  --drawer-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}
```

## Advanced Usage

### Programmatic Control

```typescript
@Component({
  template: `
    <Button (buttonClick)="toggleDrawer()">Toggle</Button>
    <Button (buttonClick)="openTemporary()">Open for 3s</Button>
    
    <Drawer 
      [open]="drawerOpen()" 
      direction="right"
      (openChange)="onDrawerChange($event)"
    >
      <div class="p-6">
        <p>Drawer is {{ drawerOpen() ? 'open' : 'closed' }}</p>
      </div>
    </Drawer>
  `
})
export class ProgrammaticExample {
  drawerOpen = signal(false);

  toggleDrawer() {
    this.drawerOpen.update(open => !open);
  }

  openTemporary() {
    this.drawerOpen.set(true);
    setTimeout(() => this.drawerOpen.set(false), 3000);
  }

  onDrawerChange(open: boolean) {
    console.log('Drawer state changed:', open);
    this.drawerOpen.set(open);
  }
}
```

### Multiple Drawers

```typescript
@Component({
  template: `
    <Button (buttonClick)="leftDrawer.set(true)">Left Menu</Button>
    <Button (buttonClick)="rightDrawer.set(true)">Right Cart</Button>

    <!-- Left Navigation Drawer -->
    <Drawer 
      [open]="leftDrawer()" 
      direction="left"
      (openChange)="leftDrawer.set($event)"
    >
      <nav class="p-6">Navigation Content</nav>
    </Drawer>

    <!-- Right Cart Drawer -->
    <Drawer 
      [open]="rightDrawer()" 
      direction="right"
      (openChange)="rightDrawer.set($event)"
    >
      <div class="p-6">Cart Content</div>
    </Drawer>
  `
})
export class MultipleDrawersExample {
  leftDrawer = signal(false);
  rightDrawer = signal(false);
}
```

## Best Practices

1. **Content Organization**: Structure drawer content with clear hierarchy and logical flow
2. **Performance**: Use `OnPush` change detection for better performance with large content
3. **Mobile Considerations**: Test drawer behavior on mobile devices, especially for different directions
4. **Accessibility**: Always provide proper ARIA labels and keyboard navigation
5. **State Management**: Use signals for reactive state management and clean updates
6. **Error Handling**: Implement proper error boundaries for drawer content
7. **Testing**: Test drawer functionality across different screen sizes and input methods

## Troubleshooting

### Common Issues

**Drawer not opening:**
- Ensure the `open` signal is properly set to `true`
- Check that the drawer component is properly imported
- Verify no CSS conflicts are preventing the drawer from displaying

**Backdrop click not working:**
- Confirm `closeOnOverlayClick` is set to `true` (default)
- Ensure the `openChange` event handler updates the `open` signal

**Animation issues:**
- Check for CSS conflicts that might override transition properties
- Ensure proper z-index stacking context

**Content overflow:**
- Use `overflow-y-auto` on scrollable content areas
- Test content behavior at different screen sizes
