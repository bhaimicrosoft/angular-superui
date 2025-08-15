# Product Card Block 🛍️

Professional e-commerce product cards with advanced features including image galleries, variant selection, pricing displays, and interactive actions. Create stunning product showcases that drive conversions and enhance user experience.

## Features

- 🖼️ **Image Galleries** - Multi-image support with hover zoom and lightbox view
- 🎨 **5 Layout Variants** - Grid, List, Featured, Compact, and Detailed layouts
- 💰 **Pricing Display** - Regular prices, sale prices, and discount calculations
- ⭐ **Rating System** - Star ratings with review counts
- 🏷️ **Status Badges** - Sale, New, Bestseller, Limited, and Featured badges
- 🎯 **Product Variants** - Color, size, material, and style selections
- 🛒 **Action Buttons** - Add to cart, wishlist, quick view, and compare
- 📱 **Responsive Design** - Optimized for all screen sizes
- 🌙 **Dark Mode** - Full dark mode compatibility
- ♿ **Accessible** - ARIA compliant with keyboard navigation
- ⚡ **Performance** - Optimized rendering with Angular 20 signals

## Installation

Add the Product Card Block component:

```bash
npx ngsui-cli add block product-card
```

## Basic Usage

Import and use the Product Card component:

```typescript
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard, ProductCardConfig, ProductCardEvent } from '@lib/blocks/product-card';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, ProductCard],
  template: `
    <div class="grid md:grid-cols-3 gap-6">
      <ProductCard
        [variant]="'grid'"
        [size]="'md'"
        [config]="productConfig"
        (productAction)="onProductAction($event)"
      />
    </div>
  `
})
export class ExampleComponent {
  productConfig: ProductCardConfig = {
    id: 'wireless-headphones',
    name: 'Premium Wireless Headphones',
    brand: 'AudioTech',
    category: 'Electronics',
    shortDescription: 'High-quality wireless headphones with noise cancellation and long battery life.',
    images: [
      {
        url: '/images/headphones-main.jpg',
        alt: 'Wireless headphones main view',
        isMain: true
      },
      {
        url: '/images/headphones-side.jpg',
        alt: 'Side view of headphones'
      }
    ],
    price: {
      regular: 199.99,
      sale: 149.99,
      currency: 'USD',
      currencySymbol: '$'
    },
    status: 'in-stock',
    stockCount: 15,
    badges: ['sale', 'bestseller'],
    rating: {
      average: 4.5,
      count: 128,
      maxRating: 5
    },
    showQuickView: true,
    showCompare: true,
    showWishlist: true
  };

  onProductAction(event: ProductCardEvent) {
    console.log('Product action:', event);
    // Handle product actions (add to cart, wishlist, etc.)
  }
}
```

## Layout Variants

### Grid Layout (Default)
Perfect for product grids and catalog displays:

```typescript
<ProductCard
  [variant]="'grid'"
  [size]="'md'"
  [config]="productConfig"
/>
```

### List Layout
Ideal for search results and category pages:

```typescript
<ProductCard
  [variant]="'list'"
  [size]="'md'"
  [config]="productConfig"
/>
```

### Featured Layout
Showcase highlighted or featured products:

```typescript
<ProductCard
  [variant]="'featured'"
  [size]="'lg'"
  [config]="featuredProductConfig"
/>
```

### Compact Layout
Space-efficient for mobile or sidebar displays:

```typescript
<ProductCard
  [variant]="'compact'"
  [size]="'sm'"
  [config]="productConfig"
/>
```

### Detailed Layout
Rich product information with extended details:

```typescript
<ProductCard
  [variant]="'detailed'"
  [size]="'lg'"
  [config]="detailedProductConfig"
/>
```

## Advanced Examples

### E-commerce Product with Variants

```typescript
import { Component, signal } from '@angular/core';
import { ProductCard, ProductCardConfig } from '@lib/blocks/product-card';

@Component({
  selector: 'app-product-showcase',
  standalone: true,
  imports: [ProductCard],
  template: `
    <div class="max-w-sm mx-auto">
      <ProductCard
        [variant]="'grid'"
        [size]="'md'"
        [config]="fashionProduct"
        (productAction)="handleProductAction($event)"
      />
    </div>
  `
})
export class ProductShowcaseComponent {
  fashionProduct: ProductCardConfig = {
    id: 'designer-jacket',
    name: 'Designer Winter Jacket',
    brand: 'FashionForward',
    category: 'Clothing',
    shortDescription: 'Stylish winter jacket with premium materials and modern design.',
    images: [
      {
        url: '/images/jacket-black.jpg',
        alt: 'Black winter jacket',
        isMain: true
      },
      {
        url: '/images/jacket-navy.jpg',
        alt: 'Navy winter jacket'
      },
      {
        url: '/images/jacket-detail.jpg',
        alt: 'Jacket detail view'
      }
    ],
    price: {
      regular: 299.99,
      sale: 199.99,
      currency: 'USD',
      currencySymbol: '$'
    },
    status: 'in-stock',
    stockCount: 5,
    badges: ['sale', 'limited'],
    rating: {
      average: 4.8,
      count: 42,
      maxRating: 5
    },
    variants: [
      {
        id: 'color-black',
        name: 'Black',
        type: 'color',
        value: '#000000',
        available: true
      },
      {
        id: 'color-navy',
        name: 'Navy',
        type: 'color',
        value: '#1e40af',
        available: true
      },
      {
        id: 'size-m',
        name: 'Medium',
        type: 'size',
        value: 'M',
        available: true
      },
      {
        id: 'size-l',
        name: 'Large',
        type: 'size',
        value: 'L',
        available: true
      }
    ],
    selectedVariants: {
      color: 'color-black',
      size: 'size-m'
    },
    showQuickView: true,
    showCompare: true,
    showWishlist: true,
    showVariants: true,
    features: [
      'Water-resistant material',
      'Insulated lining',
      'Multiple pockets',
      'Adjustable hood'
    ]
  };

  handleProductAction(event: ProductCardEvent) {
    switch (event.action) {
      case 'add-to-cart':
        this.addToCart(event.productId, event.data);
        break;
      case 'add-to-wishlist':
        this.addToWishlist(event.productId);
        break;
      case 'quick-view':
        this.openQuickView(event.productId);
        break;
      case 'variant-selected':
        this.handleVariantChange(event.data);
        break;
    }
  }

  private addToCart(productId: string, data: any) {
    console.log('Adding to cart:', productId, data);
    // Implement add to cart logic
  }

  private addToWishlist(productId: string) {
    console.log('Adding to wishlist:', productId);
    // Implement wishlist logic
  }

  private openQuickView(productId: string) {
    console.log('Opening quick view for:', productId);
    // Implement quick view modal
  }

  private handleVariantChange(data: any) {
    console.log('Variant selected:', data);
    // Update product configuration based on selected variant
  }
}
```

### Product Grid with Multiple Categories

```typescript
@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ProductCard],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-center mb-8">Our Products</h1>
      
      <!-- Category Filter -->
      <div class="flex justify-center mb-8">
        <div class="flex gap-4">
          <button
            *ngFor="let category of categories"
            (click)="setActiveCategory(category)"
            class="px-4 py-2 rounded-lg font-medium transition-colors"
            [class]="activeCategory() === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard
          *ngFor="let product of filteredProducts()"
          [variant]="'grid'"
          [size]="'md'"
          [config]="product"
          (productAction)="onProductAction($event)"
        />
      </div>
    </div>
  `
})
export class ProductGridComponent {
  categories = ['All', 'Electronics', 'Clothing', 'Home', 'Books'];
  activeCategory = signal('All');

  // Sample products array
  products: ProductCardConfig[] = [
    // Electronics
    {
      id: 'smartphone-pro',
      name: 'Smartphone Pro Max',
      brand: 'TechCorp',
      category: 'Electronics',
      images: [{ url: '/images/smartphone.jpg', alt: 'Smartphone', isMain: true }],
      price: { regular: 999.99, currency: 'USD', currencySymbol: '$' },
      status: 'in-stock',
      rating: { average: 4.6, count: 203 },
      badges: ['new'],
      showQuickView: true,
      showWishlist: true
    },
    // Add more products...
  ];

  filteredProducts = computed(() => {
    if (this.activeCategory() === 'All') {
      return this.products;
    }
    return this.products.filter(p => p.category === this.activeCategory());
  });

  setActiveCategory(category: string) {
    this.activeCategory.set(category);
  }

  onProductAction(event: ProductCardEvent) {
    // Handle product actions
    console.log('Product action:', event);
  }
}
```

## API Reference

### Component Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `ProductCardVariant` | `'grid'` | Layout variant: 'grid', 'list', 'featured', 'compact', 'detailed' |
| `size` | `ProductCardSize` | `'md'` | Size variant: 'sm', 'md', 'lg' |
| `config` | `ProductCardConfig` | Required | Product configuration object |

### Component Outputs

| Event | Type | Description |
|-------|------|-------------|
| `(productAction)` | `ProductCardEvent` | Emitted when user performs any product action |

### ProductCardConfig Interface

```typescript
interface ProductCardConfig {
  // Basic Info
  id: string;                          // Unique product identifier
  name: string;                        // Product name
  description?: string;                // Full product description
  shortDescription?: string;           // Brief product description
  brand?: string;                      // Brand name
  category?: string;                   // Product category
  
  // Images
  images: ProductImage[];              // Array of product images
  
  // Pricing
  price: ProductPrice;                 // Pricing information
  
  // Product Status
  status: ProductStatus;               // Stock status
  stockCount?: number;                 // Available stock quantity
  badges?: ProductBadge[];             // Status badges array
  
  // Rating & Reviews
  rating?: ProductRating;              // Rating information
  
  // Variants
  variants?: ProductVariant[];         // Available variants
  selectedVariants?: Record<string, string>; // Selected variant IDs
  
  // Actions
  actions?: ProductAction[];           // Custom action buttons
  
  // Display Options
  showQuickView?: boolean;             // Show quick view button
  showCompare?: boolean;               // Show compare button
  showWishlist?: boolean;              // Show wishlist button
  showShare?: boolean;                 // Show share button
  showRating?: boolean;                // Show rating display
  showBadges?: boolean;                // Show status badges
  showVariants?: boolean;              // Show variant selector
  
  // Custom Fields
  features?: string[];                 // Product features list
  tags?: string[];                     // Product tags
  metadata?: Record<string, any>;      // Custom metadata
}
```

### ProductImage Interface

```typescript
interface ProductImage {
  url: string;        // Image URL
  alt: string;        // Alt text for accessibility
  isMain?: boolean;   // Mark as main/primary image
}
```

### ProductPrice Interface

```typescript
interface ProductPrice {
  regular: number;         // Regular price
  sale?: number;           // Sale price (optional)
  currency: string;        // Currency code (e.g., 'USD')
  currencySymbol?: string; // Currency symbol (e.g., '$')
}
```

### ProductRating Interface

```typescript
interface ProductRating {
  average: number;      // Average rating (e.g., 4.5)
  count: number;        // Total number of ratings
  maxRating?: number;   // Maximum rating (default: 5)
}
```

### ProductVariant Interface

```typescript
interface ProductVariant {
  id: string;                                    // Unique variant ID
  name: string;                                  // Display name
  type: 'color' | 'size' | 'material' | 'style'; // Variant type
  value: string;                                 // Variant value
  available: boolean;                            // Availability status
  price?: number;                                // Price modifier
  image?: string;                                // Variant-specific image
}
```

### ProductCardEvent Interface

```typescript
interface ProductCardEvent {
  action: string;                               // Action type
  productId: string;                            // Product ID
  data?: ProductActionEventData | ProductVariantEventData | ProductCardConfig;
}
```

## Styling & Customization

### CSS Custom Properties

The Product Card uses Tailwind CSS classes and can be customized using CSS custom properties:

```css
.product-card {
  --card-bg: theme('colors.white');
  --card-border: theme('colors.gray.200');
  --card-shadow: theme('boxShadow.sm');
  --card-radius: theme('borderRadius.xl');
  
  --text-primary: theme('colors.gray.900');
  --text-secondary: theme('colors.gray.600');
  --text-muted: theme('colors.gray.500');
  
  --price-color: theme('colors.emerald.600');
  --sale-color: theme('colors.red.600');
  --rating-color: theme('colors.yellow.400');
}

.dark .product-card {
  --card-bg: theme('colors.gray.800');
  --card-border: theme('colors.gray.700');
  --text-primary: theme('colors.white');
  --text-secondary: theme('colors.gray.300');
  --text-muted: theme('colors.gray.400');
}
```

### Custom Styling

```typescript
// Custom styles in your component
@Component({
  selector: 'app-custom-product-card',
  styles: [`
    .product-card {
      @apply shadow-lg hover:shadow-2xl;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .product-card:hover {
      transform: translateY(-4px);
    }
    
    .product-image {
      @apply transition-transform duration-500;
    }
    
    .product-card:hover .product-image {
      @apply scale-105;
    }
  `],
  template: `
    <ProductCard
      [variant]="'grid'"
      [size]="'md'"
      [config]="productConfig"
    />
  `
})
export class CustomProductCardComponent {
  // Component implementation
}
```

## Event Handling

### Action Types

The product card emits various action types:

- `'add-to-cart'` - User clicks add to cart button
- `'add-to-wishlist'` - User clicks wishlist button
- `'remove-from-wishlist'` - User removes from wishlist
- `'quick-view'` - User clicks quick view button
- `'compare'` - User clicks compare button
- `'share'` - User clicks share button
- `'variant-selected'` - User selects a product variant
- `'image-changed'` - User changes the main image
- `'custom-action'` - Custom action button clicked

### Event Handler Example

```typescript
onProductAction(event: ProductCardEvent) {
  const { action, productId, data } = event;

  switch (action) {
    case 'add-to-cart':
      this.cartService.addItem(productId, data);
      this.showSuccessMessage('Added to cart');
      break;

    case 'add-to-wishlist':
      this.wishlistService.addItem(productId);
      this.showSuccessMessage('Added to wishlist');
      break;

    case 'quick-view':
      this.modalService.openProductQuickView(productId);
      break;

    case 'variant-selected':
      this.updateProductVariant(productId, data);
      break;

    default:
      console.log('Unhandled action:', action, data);
  }
}
```

## Accessibility Features

The Product Card component is built with accessibility in mind:

- **ARIA Labels**: All interactive elements have proper ARIA labels
- **Keyboard Navigation**: Full keyboard support for all actions
- **Screen Reader Support**: Structured markup for screen readers
- **Focus Management**: Visible focus indicators and logical tab order
- **Image Alt Text**: Proper alt text for all product images
- **Color Contrast**: Meets WCAG AA color contrast requirements

### Accessibility Best Practices

```typescript
// Ensure proper alt text for images
productConfig: ProductCardConfig = {
  images: [
    {
      url: '/product-image.jpg',
      alt: 'Blue wireless headphones with noise cancellation feature',
      isMain: true
    }
  ],
  // ... other config
};

// Use semantic HTML structure in your templates
template: `
  <main role="main">
    <section aria-labelledby="products-heading">
      <h2 id="products-heading">Featured Products</h2>
      <div class="grid" role="grid">
        <ProductCard
          *ngFor="let product of products"
          [config]="product"
          role="gridcell"
        />
      </div>
    </section>
  </main>
`
```

## Performance Optimization

### Lazy Loading Images

```typescript
// Enable lazy loading for better performance
productConfig: ProductCardConfig = {
  images: [
    {
      url: '/high-res-product-image.jpg',
      alt: 'Product description',
      isMain: true
    }
  ],
  // Images are automatically lazy-loaded by the component
};
```

### Virtual Scrolling for Large Lists

```typescript
// Use Angular CDK Virtual Scrolling for large product lists
@Component({
  selector: 'app-virtual-product-list',
  template: `
    <cdk-virtual-scroll-viewport itemSize="320" class="viewport">
      <ProductCard
        *cdkVirtualFor="let product of products"
        [variant]="'list'"
        [config]="product"
      />
    </cdk-virtual-scroll-viewport>
  `,
  styles: [`
    .viewport {
      height: 600px;
    }
  `]
})
export class VirtualProductListComponent {
  products: ProductCardConfig[] = [
    // Large array of products
  ];
}
```

## Integration Examples

### With Angular Router

```typescript
// Navigate to product detail page
onProductAction(event: ProductCardEvent) {
  if (event.action === 'quick-view') {
    this.router.navigate(['/products', event.productId]);
  }
}
```

### With State Management (NgRx)

```typescript
// Dispatch actions to NgRx store
onProductAction(event: ProductCardEvent) {
  switch (event.action) {
    case 'add-to-cart':
      this.store.dispatch(CartActions.addItem({ 
        productId: event.productId, 
        quantity: 1 
      }));
      break;
      
    case 'add-to-wishlist':
      this.store.dispatch(WishlistActions.addItem({ 
        productId: event.productId 
      }));
      break;
  }
}
```

### With HTTP Client

```typescript
// Load product data from API
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductCardConfig[]> {
    return this.http.get<ProductCardConfig[]>('/api/products');
  }

  addToCart(productId: string, quantity: number): Observable<void> {
    return this.http.post<void>('/api/cart', { productId, quantity });
  }
}
```

## Troubleshooting

### Common Issues

1. **Images not loading**: Ensure image URLs are accessible and CORS is configured
2. **Styling issues**: Check Tailwind CSS is properly configured and included
3. **Event handling**: Verify event handlers are properly bound and typed
4. **Performance**: Use virtual scrolling for large product lists

### Debug Mode

Enable debug logging for development:

```typescript
// Add to your component for debugging
ngOnInit() {
  if (!environment.production) {
    console.log('Product Card Debug Mode Enabled');
  }
}

onProductAction(event: ProductCardEvent) {
  if (!environment.production) {
    console.log('Product Action Debug:', event);
  }
  // Handle event
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

Found a bug or have a feature request? Please open an issue on our [GitHub repository](https://github.com/bhaimicrosoft/angular-superui).

## License

MIT License - see [LICENSE](../../LICENSE) for details.
