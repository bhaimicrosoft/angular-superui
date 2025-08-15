import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard, ProductCardConfig, ProductCardEvent } from '@lib/blocks/product-card';

@Component({
  selector: 'app-product-card-demo',
  standalone: true,
  imports: [CommonModule, ProductCard],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Product Card Block
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive e-commerce product cards with image galleries, variant selection, pricing, and interactive features.
          </p>
         
        </div>

        <!-- Variant Selector -->
        <div class="flex flex-wrap justify-center gap-2 mb-8">
          <button
            *ngFor="let variant of variants"
            (click)="setVariant(variant)"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            [class]="selectedVariant() === variant
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'"
          >
            {{ variant | titlecase }}
          </button>
        </div>

        <!-- Size Selector -->
        <div class="flex justify-center gap-2 mb-12">
          <button
            *ngFor="let size of sizes"
            (click)="setSize(size)"
            class="px-3 py-1 rounded-md text-xs font-medium transition-all duration-200"
            [class]="selectedSize() === size
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'"
          >
            {{ size.toUpperCase() }}
          </button>
        </div>

        <!-- Product Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <!-- Electronics Product -->
          <div class="flex flex-col items-center space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Electronics
            </h3>
            <ProductCard
              [variant]="selectedVariant()"
              [size]="selectedSize()"
              [config]="electronicsProduct"
              (productAction)="onProductAction($event, 'Electronics')"
            />
          </div>

          <!-- Fashion Product -->
          <div class="flex flex-col items-center space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Fashion
            </h3>
            <ProductCard
              [variant]="selectedVariant()"
              [size]="selectedSize()"
              [config]="fashionProduct"
              (productAction)="onProductAction($event, 'Fashion')"
            />
          </div>

          <!-- Home & Garden -->
          <div class="flex flex-col items-center space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Home & Garden
            </h3>
            <ProductCard
              [variant]="selectedVariant()"
              [size]="selectedSize()"
              [config]="homeProduct"
              (productAction)="onProductAction($event, 'Home & Garden')"
            />
          </div>
        </div>

        <!-- Extended Product Cards -->
        <div class="grid md:grid-cols-2 gap-8 mb-16">
          <!-- Books Product -->
          <div class="flex flex-col items-center space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Books
            </h3>
            <ProductCard
              [variant]="selectedVariant()"
              [size]="selectedSize()"
              [config]="booksProduct"
              (productAction)="onProductAction($event, 'Books')"
            />
          </div>

          <!-- Sports Product -->
          <div class="flex flex-col items-center space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Sports & Outdoors
            </h3>
            <ProductCard
              [variant]="selectedVariant()"
              [size]="selectedSize()"
              [config]="sportsProduct"
              (productAction)="onProductAction($event, 'Sports')"
            />
          </div>
        </div>

        <!-- Action Log -->
        <div *ngIf="actionLog().length > 0" class="mt-16">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Product Actions Log
          </h3>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div class="space-y-4">
              <div
                *ngFor="let action of actionLog(); let i = index"
                class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium text-gray-900 dark:text-white">
                    {{ action.category }} - {{ action.productName }}
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    {{ action.timestamp | date:'medium' }}
                  </span>
                </div>
                <div class="text-sm text-gray-700 dark:text-gray-300">
                  Action: <span class="font-medium">{{ action.action }}</span>
                  <span *ngIf="action.data" class="ml-2 text-xs">
                    {{ action.data | json }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Features List -->
        <div class="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Product Card Features
          </h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Visual Elements</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Product image galleries</li>
                <li>• Hover zoom effects</li>
                <li>• Status badges (sale, new, etc.)</li>
                <li>• Rating stars display</li>
                <li>• Price with discount indicators</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Interaction</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Add to cart functionality</li>
                <li>• Wishlist integration</li>
                <li>• Quick view modal</li>
                <li>• Product comparison</li>
                <li>• Variant selection</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Layout Options</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Grid view layout</li>
                <li>• List view layout</li>
                <li>• Featured product style</li>
                <li>• Compact display</li>
                <li>• Detailed information view</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">E-commerce Features</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Stock status indicators</li>
                <li>• Price calculations</li>
                <li>• Variant management</li>
                <li>• Brand and category display</li>
                <li>• Multi-currency support</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Technical</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Angular 20 signals</li>
                <li>• TypeScript interfaces</li>
                <li>• Responsive design</li>
                <li>• Accessibility support</li>
                <li>• Dark mode compatibility</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Use Cases</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• E-commerce websites</li>
                <li>• Product catalogs</li>
                <li>• Marketplace platforms</li>
                <li>• Shopping applications</li>
                <li>• Product showcases</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Documentation Link -->
        <div class="mt-16 text-center">
          <div class="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 border border-gray-200 dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              🛍️ Complete Documentation
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Explore comprehensive examples, API reference, customization options, and integration guides for the Product Card block.
            </p>
            <a
              href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/blocks/product-card.md"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              View Documentation
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProductCardDemoComponent {
  // Variant and size options
  variants = ['grid', 'list', 'featured', 'compact', 'detailed'];
  sizes = ['sm', 'md', 'lg'];

  // Selected variants
  selectedVariant = signal<'grid' | 'list' | 'featured' | 'compact' | 'detailed'>('grid');
  selectedSize = signal<'sm' | 'md' | 'lg'>('md');

  // Action log
  actionLog = signal<Array<{ category: string; productName: string; action: string; data?: any; timestamp: Date }>>([]);

  // Product configurations
  electronicsProduct: ProductCardConfig = {
    id: 'gaming-laptop-001',
    name: 'Gaming Laptop Pro',
    brand: 'TechGaming',
    category: 'Electronics',
    shortDescription: 'High-performance gaming laptop with RTX graphics, fast SSD, and RGB keyboard for ultimate gaming experience.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop&crop=center',
        alt: 'Gaming laptop main view',
        isMain: true
      },
      {
        url: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=400&h=400&fit=crop&crop=center',
        alt: 'Laptop side profile view'
      },
      {
        url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center',
        alt: 'Laptop keyboard and screen'
      },
      {
        url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&crop=center',
        alt: 'Laptop open with RGB lighting'
      }
    ],
    price: {
      regular: 1499.99,
      sale: 1299.99,
      currency: 'USD',
      currencySymbol: '$'
    },
    status: 'in-stock',
    stockCount: 8,
    badges: ['sale', 'bestseller'],
    rating: {
      average: 4.7,
      count: 89,
      maxRating: 5
    },
    variants: [
      {
        id: 'ram-16gb',
        name: '16GB RAM',
        type: 'size',
        value: '16GB',
        available: true
      },
      {
        id: 'ram-32gb',
        name: '32GB RAM',
        type: 'size',
        value: '32GB',
        available: true,
        price: 1599.99
      },
      {
        id: 'storage-512gb',
        name: '512GB SSD',
        type: 'style',
        value: '512GB',
        available: true
      },
      {
        id: 'storage-1tb',
        name: '1TB SSD',
        type: 'style',
        value: '1TB',
        available: true,
        price: 1399.99
      }
    ],
    features: [
      'RTX 4070 Graphics Card',
      '16GB DDR5 RAM',
      '512GB NVMe SSD',
      '15.6" 144Hz Display',
      'RGB Backlit Keyboard'
    ],
    actions: [
      {
        id: 'add-to-cart',
        label: 'Add to Cart',
        icon: 'shopping-cart',
        variant: 'primary'
      },
      {
        id: 'buy-now',
        label: 'Buy Now',
        variant: 'secondary'
      }
    ],
    showQuickView: true,
    showCompare: true,
    showWishlist: true,
    showRating: true,
    showBadges: true,
    showVariants: true
  };

  fashionProduct: ProductCardConfig = {
    id: 'summer-dress-002',
    name: 'Elegant Summer Dress',
    brand: 'StyleCo',
    category: 'Fashion',
    shortDescription: 'Lightweight and comfortable summer dress perfect for casual and semi-formal occasions.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&crop=center',
        alt: 'Summer dress main view',
        isMain: true
      }
    ],
    price: {
      regular: 89.99,
      currency: 'USD',
      currencySymbol: '$'
    },
    status: 'in-stock',
    stockCount: 8,
    badges: ['new'],
    rating: {
      average: 4.2,
      count: 43,
      maxRating: 5
    },
    variants: [
      {
        id: 'size-xs',
        name: 'Extra Small',
        type: 'size',
        value: 'XS',
        available: true
      },
      {
        id: 'size-s',
        name: 'Small',
        type: 'size',
        value: 'S',
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
        available: false
      },
      {
        id: 'color-blue',
        name: 'Navy Blue',
        type: 'color',
        value: 'Navy',
        available: true
      },
      {
        id: 'color-red',
        name: 'Coral Red',
        type: 'color',
        value: 'Coral',
        available: true
      }
    ],
    features: [
      '100% Cotton material',
      'Machine washable',
      'Wrinkle resistant',
      'Comfortable fit',
      'Available in multiple colors'
    ],
    actions: [
      {
        id: 'add-to-cart',
        label: 'Add to Cart',
        icon: 'shopping-cart',
        variant: 'primary'
      }
    ],
    showQuickView: true,
    showWishlist: true,
    showRating: true,
    showBadges: true,
    showVariants: true
  };

  homeProduct: ProductCardConfig = {
    id: 'ceramic-planter-003',
    name: 'Modern Ceramic Plant Pot',
    brand: 'HomeDecor',
    category: 'Home & Garden',
    shortDescription: 'Stylish ceramic planter perfect for indoor plants and modern home decoration.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop&crop=center',
        alt: 'Ceramic plant pot',
        isMain: true
      }
    ],
    price: {
      regular: 34.99,
      sale: 24.99,
      currency: 'USD',
      currencySymbol: '$'
    },
    status: 'low-stock',
    stockCount: 3,
    badges: ['sale', 'limited'],
    rating: {
      average: 4.8,
      count: 92,
      maxRating: 5
    },
    variants: [
      {
        id: 'size-small',
        name: 'Small',
        type: 'size',
        value: 'Small',
        available: true
      },
      {
        id: 'size-medium',
        name: 'Medium',
        type: 'size',
        value: 'Medium',
        available: true
      },
      {
        id: 'size-large',
        name: 'Large',
        type: 'size',
        value: 'Large',
        available: false
      }
    ],
    features: [
      'High-quality ceramic',
      'Drainage hole included',
      'Modern minimalist design',
      'Indoor/outdoor use',
      'Easy to clean'
    ],
    actions: [
      {
        id: 'add-to-cart',
        label: 'Add to Cart',
        icon: 'shopping-cart',
        variant: 'primary'
      }
    ],
    showQuickView: true,
    showWishlist: true,
    showRating: true,
    showBadges: true,
    showVariants: true
  };

  booksProduct: ProductCardConfig = {
    id: 'programming-book-004',
    name: 'Advanced TypeScript Programming',
    brand: 'TechBooks',
    category: 'Books',
    shortDescription: 'Comprehensive guide to advanced TypeScript concepts and modern development practices.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&crop=center',
        alt: 'Programming book cover',
        isMain: true
      }
    ],
    price: {
      regular: 49.99,
      currency: 'USD',
      currencySymbol: '$'
    },
    status: 'in-stock',
    stockCount: 25,
    badges: ['bestseller'],
    rating: {
      average: 4.7,
      count: 234,
      maxRating: 5
    },
    variants: [
      {
        id: 'format-paperback',
        name: 'Paperback',
        type: 'style',
        value: 'Paperback',
        available: true
      },
      {
        id: 'format-hardcover',
        name: 'Hardcover',
        type: 'style',
        value: 'Hardcover',
        available: true,
        price: 69.99
      },
      {
        id: 'format-ebook',
        name: 'E-book',
        type: 'style',
        value: 'E-book',
        available: true,
        price: 29.99
      }
    ],
    features: [
      '450+ pages of content',
      'Code examples included',
      'Written by industry experts',
      'Latest TypeScript features',
      'Practical exercises'
    ],
    actions: [
      {
        id: 'add-to-cart',
        label: 'Add to Cart',
        icon: 'shopping-cart',
        variant: 'primary'
      },
      {
        id: 'preview',
        label: 'Preview',
        icon: 'eye',
        variant: 'outline'
      }
    ],
    showQuickView: true,
    showRating: true,
    showBadges: true,
    showVariants: true
  };

  sportsProduct: ProductCardConfig = {
    id: 'yoga-mat-005',
    name: 'Premium Yoga Mat',
    brand: 'FitLife',
    category: 'Sports & Outdoors',
    shortDescription: 'Non-slip yoga mat with superior grip and cushioning for all yoga practices.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=center',
        alt: 'Yoga mat rolled up',
        isMain: true
      }
    ],
    price: {
      regular: 79.99,
      sale: 59.99,
      currency: 'USD',
      currencySymbol: '$'
    },
    status: 'in-stock',
    stockCount: 12,
    badges: ['sale', 'featured'],
    rating: {
      average: 4.6,
      count: 156,
      maxRating: 5
    },
    variants: [
      {
        id: 'color-purple',
        name: 'Purple',
        type: 'color',
        value: 'Purple',
        available: true
      },
      {
        id: 'color-blue',
        name: 'Ocean Blue',
        type: 'color',
        value: 'Blue',
        available: true
      },
      {
        id: 'color-green',
        name: 'Forest Green',
        type: 'color',
        value: 'Green',
        available: true
      },
      {
        id: 'thickness-4mm',
        name: '4mm',
        type: 'size',
        value: '4mm',
        available: true
      },
      {
        id: 'thickness-6mm',
        name: '6mm',
        type: 'size',
        value: '6mm',
        available: true,
        price: 89.99
      }
    ],
    features: [
      'Non-slip surface',
      'Eco-friendly materials',
      'Easy to clean',
      'Portable and lightweight',
      'Carrying strap included'
    ],
    actions: [
      {
        id: 'add-to-cart',
        label: 'Add to Cart',
        icon: 'shopping-cart',
        variant: 'primary'
      }
    ],
    showQuickView: true,
    showWishlist: true,
    showRating: true,
    showBadges: true,
    showVariants: true
  };

  setVariant(variant: any) {
    this.selectedVariant.set(variant);
  }

  setSize(size: any) {
    this.selectedSize.set(size);
  }

  onProductAction(event: ProductCardEvent, category: string) {
    console.log(`${category} product action:`, event);

    // Get product name for logging
    let productName = '';
    switch (category) {
      case 'Electronics':
        productName = this.electronicsProduct.name;
        break;
      case 'Fashion':
        productName = this.fashionProduct.name;
        break;
      case 'Home & Garden':
        productName = this.homeProduct.name;
        break;
      case 'Books':
        productName = this.booksProduct.name;
        break;
      case 'Sports':
        productName = this.sportsProduct.name;
        break;
    }

    // Add to action log
    this.actionLog.update(log => [
      {
        category,
        productName,
        action: event.action,
        data: event.data,
        timestamp: new Date(),
      },
      ...log
    ]);
  }
}
