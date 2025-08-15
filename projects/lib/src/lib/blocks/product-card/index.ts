/**
 * Product Card Component
 *
 * A comprehensive product card component for e-commerce applications that supports:
 * - Multiple layout styles: grid, list, featured, compact, detailed
 * - Product image galleries with hover effects
 * - Price display with discount calculations
 * - Variant selection (size, color, options)
 * - Action buttons (add to cart, wishlist, compare)
 * - Status badges (sale, new, bestseller, out of stock)
 * - Rating and review display
 * - Quick view functionality
 * - Responsive design and accessibility
 * - Dark mode support
 * - Animation and hover effects
 */

import {
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { cva } from 'class-variance-authority';

// Product card types and interfaces
export type ProductCardVariant = 'grid' | 'list' | 'featured' | 'compact' | 'detailed';
export type ProductCardSize = 'sm' | 'md' | 'lg';
export type ProductStatus = 'in-stock' | 'low-stock' | 'out-of-stock' | 'pre-order';
export type ProductBadge = 'sale' | 'new' | 'bestseller' | 'limited' | 'featured';

export interface ProductImage {
  url: string;
  alt: string;
  isMain?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'color' | 'size' | 'material' | 'style';
  value: string;
  available: boolean;
  price?: number;
  image?: string;
}

export interface ProductPrice {
  regular: number;
  sale?: number;
  currency: string;
  currencySymbol?: string;
}

export interface ProductRating {
  average: number;
  count: number;
  maxRating?: number;
}

export interface ProductAction {
  id: string;
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
}

export interface ProductCardConfig {
  // Basic Info
  id: string;
  name: string;
  description?: string;
  shortDescription?: string;
  brand?: string;
  category?: string;
  
  // Images
  images: ProductImage[];
  
  // Pricing
  price: ProductPrice;
  
  // Product Status
  status: ProductStatus;
  stockCount?: number;
  badges?: ProductBadge[];
  
  // Rating & Reviews
  rating?: ProductRating;
  
  // Variants
  variants?: ProductVariant[];
  selectedVariants?: Record<string, string>;
  
  // Actions
  actions?: ProductAction[];
  
  // Display Options
  showQuickView?: boolean;
  showCompare?: boolean;
  showWishlist?: boolean;
  showShare?: boolean;
  showRating?: boolean;
  showBadges?: boolean;
  showVariants?: boolean;
  
  // Custom Fields
  features?: string[];
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface ProductCardEvent {
  action: string;
  productId: string;
  data?: ProductActionEventData | ProductVariantEventData | ProductCardConfig;
}

export interface ProductActionEventData {
  action: ProductAction;
  product: ProductCardConfig;
}

export interface ProductVariantEventData {
  variant: ProductVariant;
  selectedVariants: Record<string, string>;
}

// Product card variants
const productCardVariants = cva(
  'product-card bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 group',
  {
    variants: {
      variant: {
        grid: 'flex flex-col',
        list: 'flex flex-row items-center space-x-4 p-4',
        featured: 'flex flex-col relative',
        compact: 'flex flex-col p-3',
        detailed: 'flex flex-col p-6',
      },
      size: {
        sm: 'max-w-xs',
        md: 'max-w-sm',
        lg: 'max-w-md',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-lg hover:-translate-y-1',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'grid',
      size: 'md',
      interactive: true,
    },
  }
);

const imageContainerVariants = cva(
  'relative overflow-hidden bg-gray-100 dark:bg-gray-700',
  {
    variants: {
      variant: {
        grid: 'aspect-square',
        list: 'w-24 h-24 flex-shrink-0 rounded-lg',
        featured: 'aspect-[4/3]',
        compact: 'aspect-square',
        detailed: 'aspect-[4/3]',
      },
    },
    defaultVariants: {
      variant: 'grid',
    },
  }
);

const buttonVariants = cva(
  'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
        secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
        outline: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-gray-500',
        ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-gray-500',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

@Component({
  selector: 'ProductCard',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('slideInUp', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('300ms ease-out')
      ])
    ]),
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('200ms ease-in')
      ])
    ]),
    trigger('scaleIn', [
      state('in', style({ transform: 'scale(1)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'scale(0.95)', opacity: 0 }),
        animate('200ms ease-out')
      ])
    ]),
    trigger('slideCarousel', [
      transition(':increment', [
        style({ transform: 'translateX(100%)' }),
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'translateX(0)' }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)' }),
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'translateX(0)' }))
      ])
    ]),
    trigger('imageTransition', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ],
  template: `
    <div 
      [class]="getProductCardVariants()({ 
        variant: variant(), 
        size: size(), 
        interactive: interactive()
      })"
      [@slideInUp]="'in'"
      (click)="onCardClick()"
    >
      <!-- Product Image Section -->
      <div [class]="getImageContainerVariants()({ variant: variant() })">
        <!-- Badges -->
        <div *ngIf="config().showBadges && config().badges && config().badges!.length > 0" 
             class="absolute top-2 left-2 z-10 flex flex-col gap-1">
          <span *ngFor="let badge of config().badges" 
                [class]="getBadgeClass(badge)"
                class="px-2 py-1 text-xs font-semibold rounded-full">
            {{ getBadgeLabel(badge) }}
          </span>
        </div>

        <!-- Quick Actions -->
        <div class="absolute top-2 right-2 z-10 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button *ngIf="config().showWishlist"
                  (click)="onActionClick(quickActions().wishlist, $event)"
                  class="w-8 h-8 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                  [class]="isWishlistActive() 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'"
                  [attr.aria-label]="quickActions().wishlist.label">
            <svg class="w-4 h-4" stroke="currentColor" viewBox="0 0 24 24"
                 [attr.fill]="isWishlistActive() ? 'currentColor' : 'none'">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
          
          <button *ngIf="config().showCompare"
                  (click)="onActionClick(quickActions().compare, $event)"
                  class="w-8 h-8 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                  [class]="isCompareActive() 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'"
                  [attr.aria-label]="quickActions().compare.label">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </button>
          
          <button *ngIf="config().showQuickView"
                  (click)="onActionClick(quickActions().quickView, $event)"
                  class="w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                  [attr.aria-label]="quickActions().quickView.label">
            <svg class="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </button>
        </div>

        <!-- Main Product Image -->
        <div class="relative w-full h-full overflow-hidden cursor-zoom-in"
             (mouseenter)="onImageHover($event)"
             (mousemove)="onImageMove($event)"
             (mouseleave)="onImageLeave()">
          <!-- Base Image -->
          <img 
            [src]="getMainImage().url" 
            [alt]="getMainImage().alt"
            class="w-full h-full transition-transform duration-300"
            [class]="getImageFitClass()"
            [@imageTransition]="currentImageIndex()"
            [class.group-hover:scale-105]="!imageZoomed()"
            loading="lazy"
            (load)="onImageLoad($event)"
            #mainImage
          />
          
          <!-- Zoomed Image Overlay (circular area) -->
          <div *ngIf="imageZoomed() && variant() !== 'list' && variant() !== 'compact'"
               class="absolute inset-0 pointer-events-none transition-opacity duration-200"
               [style.mask]="getCircularMask()"
               [style.-webkit-mask]="getCircularMask()">
            <img 
              [src]="getMainImage().url" 
              [alt]="getMainImage().alt"
              class="w-full h-full transition-transform duration-75"
              [class]="getImageFitClass()"
              [style.transform-origin]="getTransformOrigin()"
              [style.transform]="'scale(3)'"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Image Gallery Thumbnails (visible on hover for multiple images) -->
        <div *ngIf="shouldShowImageGallery()" 
             class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button *ngFor="let image of config().images; let i = index" 
                  (click)="setMainImage(i)"
                  (mouseenter)="setMainImage(i)"
                  class="w-8 h-8 rounded border-2 overflow-hidden transition-all duration-200 cursor-pointer"
                  [class]="i === currentImageIndex() ? 'border-white shadow-lg' : 'border-white/60 hover:border-white'">
            <img [src]="image.url" [alt]="image.alt" class="w-full h-full object-cover">
          </button>
        </div>

        <!-- Image Gallery Indicators (for multiple images) -->
        <div *ngIf="shouldShowImageIndicators()" 
             class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
          <div *ngFor="let image of config().images; let i = index" 
               class="w-2 h-2 rounded-full transition-colors duration-200 cursor-pointer"
               [class]="i === currentImageIndex() ? 'bg-white' : 'bg-white/60'"
               (click)="setMainImage(i)">
          </div>
        </div>

        <!-- Compact Image Navigation (for smaller variants) -->
        <div *ngIf="shouldShowCompactNavigation()" 
             class="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button *ngIf="currentImageIndex() > 0"
                  (click)="previousImage()"
                  class="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors duration-200 cursor-pointer">
            <svg class="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button *ngIf="currentImageIndex() < config().images.length - 1"
                  (click)="nextImage()"
                  class="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors duration-200 cursor-pointer">
            <svg class="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <!-- Out of Stock Overlay -->
        <div *ngIf="config().status === 'out-of-stock'" 
             class="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
          <span class="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
            Out of Stock
          </span>
        </div>
      </div>

      <!-- Product Content -->
      <div [class]="getContentClass()">
        <!-- Brand -->
        <p *ngIf="config().brand" class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
          {{ config().brand }}
        </p>

        <!-- Product Name -->
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {{ config().name }}
        </h3>

        <!-- Description -->
        <p *ngIf="config().shortDescription" 
           class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {{ config().shortDescription }}
        </p>

        <!-- Rating -->
        <div *ngIf="config().showRating && config().rating" 
             class="flex items-center gap-2 mb-3" [@fadeIn]="'in'">
          <div class="flex items-center">
            <div class="flex">
              <svg *ngFor="let star of getStarArray(); let i = index" 
                   class="w-4 h-4 transition-colors duration-200"
                   [class]="i < config().rating!.average ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'"
                   fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-300 ml-1">
              {{ config().rating!.average.toFixed(1) }} ({{ config().rating!.count }})
            </span>
          </div>
        </div>

        <!-- Price -->
        <div class="flex items-center gap-2 mb-4" [@fadeIn]="'in'">
          <span class="text-xl font-bold text-gray-900 dark:text-white">
            {{ formatPrice(getCurrentPrice()) }}
          </span>
          <span *ngIf="config().price.sale && config().price.regular !== config().price.sale" 
                class="text-sm text-gray-500 dark:text-gray-400 line-through">
            {{ formatPrice(config().price.regular) }}
          </span>
          <span *ngIf="getDiscountPercentage() > 0" 
                class="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded-full text-xs font-semibold">
            -{{ getDiscountPercentage() }}%
          </span>
        </div>

        <!-- Variants -->
        <div *ngIf="config().showVariants && config().variants && config().variants!.length > 0" 
             class="mb-4" [@fadeIn]="'in'">
          <div *ngFor="let variantGroup of getVariantGroups()" class="mb-3">
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ variantGroup.type | titlecase }}:
            </p>
            <div class="flex flex-wrap gap-2">
              <button *ngFor="let variant of variantGroup.variants"
                      (click)="onVariantSelect(variant, $event)"
                      [disabled]="!variant.available"
                      [class]="getVariantButtonClass(variant)"
                      class="px-3 py-1 text-xs border rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                {{ variant.value }}
              </button>
            </div>
          </div>
        </div>

        <!-- Stock Status -->
        <div *ngIf="config().stockCount !== undefined" 
             class="mb-4" [@fadeIn]="'in'">
          <div [class]="getStockStatusClass()" class="text-xs font-medium">
            {{ getStockStatusText() }}
          </div>
        </div>

        <!-- Features (for detailed view) -->
        <div *ngIf="variant() === 'detailed' && config().features && config().features!.length > 0" 
             class="mb-4" [@fadeIn]="'in'">
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Features:</p>
          <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li *ngFor="let feature of config().features" class="flex items-center">
              <svg class="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ feature }}
            </li>
          </ul>
        </div>

        <!-- Actions -->
        <div class="flex gap-2" [@scaleIn]="'in'">
          <button *ngFor="let action of getVisibleActions()"
                  (click)="onActionClick(action, $event)"
                  [disabled]="action.disabled || (config().status === 'out-of-stock' && action.id === 'add-to-cart')"
                  [class]="getButtonVariants()({ variant: action.variant || 'primary', size: getButtonSize() })"
                  class="flex-1">
            <svg *ngIf="action.icon && !action.loading" 
                 class="w-4 h-4 mr-2" 
                 fill="none" 
                 stroke="currentColor" 
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getIconPath(action.icon)"/>
            </svg>
            <svg *ngIf="action.loading" 
                 class="w-4 h-4 mr-2 animate-spin" 
                 fill="none" 
                 viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ action.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div *ngIf="isLightboxOpen()" 
         class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
         (click)="closeLightbox()">
      <div class="relative max-w-4xl max-h-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
           (click)="$event.stopPropagation()">
        <!-- Close Button -->
        <button (click)="closeLightbox()"
                class="absolute top-4 right-4 z-10 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200 cursor-pointer">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        
        <!-- Lightbox Content -->
        <div class="flex flex-col md:flex-row">
          <!-- Image Section -->
          <div class="relative flex-1 bg-gray-100 dark:bg-gray-700 overflow-hidden">
            <div class="relative w-full h-64 md:h-96">
              <img [src]="getMainImage().url" 
                   [alt]="getMainImage().alt || config().name"
                   class="absolute inset-0 w-full h-full object-cover"
                   [@slideCarousel]="currentImageIndex()">
            </div>
            
            
            <!-- Navigation Arrows -->
            <button *ngIf="config().images.length > 1"
                    (click)="previousImage()"
                    class="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200 cursor-pointer">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            
            <button *ngIf="config().images.length > 1"
                    (click)="nextImage()"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200 cursor-pointer">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
            
            <!-- Image Indicators -->
            <div *ngIf="config().images.length > 1" 
                 class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              <button *ngFor="let image of config().images; let i = index"
                      (click)="setMainImageWithDirection(i)"
                      class="w-2 h-2 rounded-full transition-all duration-200 cursor-pointer"
                      [class]="i === currentImageIndex() ? 'bg-white' : 'bg-white/50 hover:bg-white/75'">
              </button>
            </div>
          </div>
          
          <!-- Product Info Section -->
          <div class="flex-1 p-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ config().name }}</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">{{ config().shortDescription }}</p>
            
            <!-- Price -->
            <div class="mb-4">
              <span class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {{ getCurrentPrice() | currency }}
              </span>
              <span *ngIf="hasDiscount()" 
                    class="ml-2 text-lg text-gray-500 dark:text-gray-400 line-through">
                {{ config().price.regular | currency }}
              </span>
            </div>
            
            <!-- Variants -->
            <div *ngIf="getVariantGroups().length > 0" class="mb-6">
              <div *ngFor="let group of getVariantGroups()" class="mb-4">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2 capitalize">
                  {{ group.type }}
                </h4>
                <div class="flex flex-wrap gap-2">
                  <button *ngFor="let variant of group.variants"
                          (click)="onVariantSelect(variant, $event)"
                          class="px-3 py-1 text-sm border rounded-md transition-all duration-200 cursor-pointer"
                          [class]="getVariantButtonClass(variant)">
                    {{ variant.name }}
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Actions -->
            <div class="flex gap-3">
              <button *ngFor="let action of getVisibleActions()"
                      (click)="onActionClick(action, $event)"
                      [disabled]="action.disabled || (config().status === 'out-of-stock' && action.id === 'add-to-cart')"
                      class="flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer"
                      [class]="action.variant === 'primary' 
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-gray-300 disabled:text-gray-500' 
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'">
                {{ action.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProductCard {
  // Input signals
  variant = input<ProductCardVariant>('grid');
  size = input<ProductCardSize>('md');
  config = input.required<ProductCardConfig>();
  interactive = input<boolean>(true);
  
  // Output signals
  productAction = output<ProductCardEvent>();
  productClick = output<ProductCardEvent>();
  
  // Internal state
  currentImageIndex = signal(0);
  selectedVariants = signal<Record<string, string>>({});
  imageZoomed = signal(false);
  isLightboxOpen = signal(false);
  isWishlistActive = signal(false);
  isCompareActive = signal(false);
  slideDirection = signal<'left' | 'right'>('right');
  animationState = signal(0);
  mousePosition = signal({ x: 50, y: 50 }); // Percentage values for transform-origin
  
  // Computed variant functions
  getProductCardVariants = computed(() => productCardVariants);
  getImageContainerVariants = computed(() => imageContainerVariants);
  getButtonVariants = computed(() => buttonVariants);

  // Predefined quick actions
  quickActions = computed(() => ({
    wishlist: {
      id: 'wishlist',
      label: 'Add to wishlist',
      icon: 'heart',
      variant: 'outline' as const
    },
    compare: {
      id: 'compare',
      label: 'Add to compare',
      icon: 'compare',
      variant: 'outline' as const
    },
    quickView: {
      id: 'quick-view',
      label: 'Quick view',
      icon: 'eye',
      variant: 'outline' as const
    }
  }));

  constructor() {
    // Initialize selected variants from config using effect
    effect(() => {
      const config = this.config();
      if (config) {
        this.selectedVariants.set(config.selectedVariants || {});
      }
    });
  }

  getMainImage(): ProductImage {
    const images = this.config().images;
    const currentIndex = this.currentImageIndex();
    
    // Prioritize the current image index for gallery navigation
    if (currentIndex >= 0 && currentIndex < images.length) {
      return images[currentIndex];
    }
    
    // Check if any selected variant has an image as fallback
    const selectedVariants = this.selectedVariants();
    const variants = this.config().variants || [];
    
    for (const variantId of Object.values(selectedVariants)) {
      const variant = variants.find(v => v.id === variantId);
      if (variant?.image) {
        return {
          url: variant.image,
          alt: `${this.config().name} - ${variant.name}`,
          isMain: false
        };
      }
    }
    
    // Final fallback to main image or first image
    return images.find(img => img.isMain) || images[0];
  }

  getCurrentPrice(): number {
    const selectedVariants = this.selectedVariants();
    const variants = this.config().variants || [];
    
    // Check if any selected variant has a different price
    for (const variantId of Object.values(selectedVariants)) {
      const variant = variants.find(v => v.id === variantId);
      if (variant?.price) {
        return variant.price;
      }
    }
    
    return this.config().price.sale || this.config().price.regular;
  }

  getDiscountPercentage(): number {
    const { regular, sale } = this.config().price;
    if (!sale || sale >= regular) return 0;
    return Math.round(((regular - sale) / regular) * 100);
  }

  formatPrice(price: number): string {
    const { currency, currencySymbol } = this.config().price;
    const symbol = currencySymbol || getCurrencySymbol(currency);
    return `${symbol}${price.toFixed(2)}`;
  }

  getStarArray(): number[] {
    const maxRating = this.config().rating?.maxRating || 5;
    return Array.from({ length: maxRating }, (_, i) => i);
  }

  getBadgeClass(badge: ProductBadge): string {
    const badgeClasses = {
      sale: 'bg-red-500 text-white',
      new: 'bg-green-500 text-white',
      bestseller: 'bg-purple-500 text-white',
      limited: 'bg-orange-500 text-white',
      featured: 'bg-blue-500 text-white',
    };
    return badgeClasses[badge];
  }

  getBadgeLabel(badge: ProductBadge): string {
    const badgeLabels = {
      sale: 'Sale',
      new: 'New',
      bestseller: 'Bestseller',
      limited: 'Limited',
      featured: 'Featured',
    };
    return badgeLabels[badge];
  }

  getVariantGroups(): Array<{ type: string; variants: ProductVariant[] }> {
    const variants = this.config().variants || [];
    const groups = variants.reduce((acc, variant) => {
      if (!acc[variant.type]) {
        acc[variant.type] = [];
      }
      acc[variant.type].push(variant);
      return acc;
    }, {} as Record<string, ProductVariant[]>);

    return Object.entries(groups).map(([type, variants]) => ({ type, variants }));
  }

  getVariantButtonClass(variant: ProductVariant): string {
    const selected = this.selectedVariants();
    const isSelected = selected[variant.type] === variant.id;
    
    if (isSelected) {
      return 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
    }
    
    return 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500';
  }

  getStockStatusClass(): string {
    const status = this.config().status;
    const statusClasses = {
      'in-stock': 'text-green-600 dark:text-green-400',
      'low-stock': 'text-orange-600 dark:text-orange-400',
      'out-of-stock': 'text-red-600 dark:text-red-400',
      'pre-order': 'text-blue-600 dark:text-blue-400',
    };
    return statusClasses[status];
  }

  getStockStatusText(): string {
    const { status, stockCount } = this.config();
    
    switch (status) {
      case 'in-stock':
        return stockCount ? `${stockCount} in stock` : 'In stock';
      case 'low-stock':
        return stockCount ? `Only ${stockCount} left` : 'Low stock';
      case 'out-of-stock':
        return 'Out of stock';
      case 'pre-order':
        return 'Pre-order available';
      default:
        return '';
    }
  }

  closeLightbox() {
    this.isLightboxOpen.set(false);
  }

  hasDiscount(): boolean {
    const config = this.config();
    return !!(config.price.sale && config.price.sale < config.price.regular);
  }

  getImageFitClass(): string {
    const variant = this.variant();
    // Use object-contain for detailed and featured modes to show full image, object-cover for others
    return variant === 'detailed' || variant === 'featured' ? 'object-contain' : 'object-cover';
  }

  getContentClass(): string {
    const variant = this.variant();
    const contentClasses = {
      grid: 'p-4',
      list: 'flex-1',
      featured: 'p-6',
      compact: 'p-2',
      detailed: 'flex-1',
    };
    return contentClasses[variant];
  }

  getButtonSize(): 'sm' | 'md' | 'lg' {
    const variant = this.variant();
    if (variant === 'compact') return 'sm';
    if (variant === 'detailed') return 'lg';
    return 'md';
  }

  getVisibleActions(): ProductAction[] {
    const actions = this.config().actions || [];
    const variant = this.variant();
    
    if (variant === 'compact') {
      return actions.slice(0, 1);
    }
    
    return actions;
  }

  onCardClick() {
    if (this.interactive()) {
      this.productClick.emit({
        action: 'card_click',
        productId: this.config().id,
        data: this.config(),
      });
    }
  }

  onActionClick(action: ProductAction, event: Event) {
    event.stopPropagation();
    
    // Handle specific actions
    switch (action.id) {
      case 'wishlist':
        this.isWishlistActive.update(active => !active);
        break;
      case 'compare':
        this.isCompareActive.update(active => !active);
        break;
      case 'quick-view':
        this.isLightboxOpen.set(true);
        break;
    }
    
    this.productAction.emit({
      action: action.id,
      productId: this.config().id,
      data: { 
        action, 
        product: this.config(),
        isActive: this.getActionActiveState(action.id)
      } as ProductActionEventData,
    });
  }

  getActionActiveState(actionId: string): boolean {
    switch (actionId) {
      case 'wishlist':
        return this.isWishlistActive();
      case 'compare':
        return this.isCompareActive();
      case 'quick-view':
        return this.isLightboxOpen();
      default:
        return false;
    }
  }

  onVariantSelect(variant: ProductVariant, event: Event) {
    event.stopPropagation();
    
    this.selectedVariants.update(selected => ({
      ...selected,
      [variant.type]: variant.id,
    }));

    this.productAction.emit({
      action: 'variant_select',
      productId: this.config().id,
      data: { 
        variant, 
        selectedVariants: this.selectedVariants() 
      } as ProductVariantEventData,
    });
  }

  setMainImage(index: number, direction?: 'left' | 'right') {
    if (this.isLightboxOpen() && direction) {
      // Set slide direction for animation
      this.slideDirection.set(direction);
      // Trigger animation state change
      this.animationState.update(state => state + 1);
    }
    this.currentImageIndex.set(index);
  }

  setMainImageWithDirection(index: number) {
    const currentIndex = this.currentImageIndex();
    const direction = index > currentIndex ? 'right' : 'left';
    this.setMainImage(index, direction);
  }

  previousImage() {
    const currentIndex = this.currentImageIndex();
    const maxIndex = this.config().images.length - 1;
    if (currentIndex > 0) {
      this.setMainImage(currentIndex - 1, 'left');
    } else if (this.isLightboxOpen()) {
      // In lightbox mode, wrap around to the last image
      this.setMainImage(maxIndex, 'left');
    }
  }

  nextImage() {
    const currentIndex = this.currentImageIndex();
    const maxIndex = this.config().images.length - 1;
    if (currentIndex < maxIndex) {
      this.setMainImage(currentIndex + 1, 'right');
    } else if (this.isLightboxOpen()) {
      // In lightbox mode, wrap around to the first image
      this.setMainImage(0, 'right');
    }
  }

  shouldShowImageGallery(): boolean {
    const hasMultipleImages = this.config().images.length > 1;
    const variant = this.variant();
    
    // Show thumbnails for larger variants
    return hasMultipleImages && (variant === 'grid' || variant === 'featured' || variant === 'detailed');
  }

  shouldShowImageIndicators(): boolean {
    const hasMultipleImages = this.config().images.length > 1;
    const variant = this.variant();
    
    // Show indicators for medium variants
    return hasMultipleImages && variant === 'list';
  }

  shouldShowCompactNavigation(): boolean {
    const hasMultipleImages = this.config().images.length > 1;
    const variant = this.variant();
    
    // Show navigation arrows for compact variant
    return hasMultipleImages && variant === 'compact';
  }

  onImageLoad(event: Event) {
    // No longer needed for magnifying glass, keeping for future use
  }

  onImageHover(event: MouseEvent) {
    // Enable zoom effect for larger variants
    if (this.variant() !== 'list' && this.variant() !== 'compact') {
      this.imageZoomed.set(true);
      this.updateTransformOrigin(event);
    }
  }

  onImageMove(event: MouseEvent) {
    if (this.imageZoomed()) {
      this.updateTransformOrigin(event);
    }
  }

  onImageLeave() {
    // Disable zoom effect
    this.imageZoomed.set(false);
  }

  updateTransformOrigin(event: MouseEvent) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    this.mousePosition.set({ x, y });
  }

  getTransformOrigin(): string {
    return `${this.mousePosition().x}% ${this.mousePosition().y}%`;
  }

  getCircularMask(): string {
    const x = this.mousePosition().x;
    const y = this.mousePosition().y;
    return `radial-gradient(circle at ${x}% ${y}%, black 80px, transparent 81px)`;
  }

  getIconPath(icon: string): string {
    const icons: Record<string, string> = {
      'shopping-cart': 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01',
      heart: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      eye: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
      compare: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    };
    return icons[icon] || icons['shopping-cart'];
  }
}

// Helper function to get currency symbol
function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CNY: '¥',
    INR: '₹',
  };
  return symbols[currency] || currency;
}
