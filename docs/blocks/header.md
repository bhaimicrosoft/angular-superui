# Header Block 🧭

Professional navigation headers with responsive design and mobile-friendly hamburger menus. Create beautiful navigation experiences that work perfectly across all devices and screen sizes.

## Features

- � **Navigation Ready** - Complete navigation structure with mobile menu
- 📱 **Mobile Optimized** - Responsive design with hamburger menu toggle
- � **Flexible Styling** - Easy customization with Tailwind CSS
- � **Logo Support** - Dedicated space for brand logo and text
- � **Call-to-Action** - Prominent action buttons in navigation
- � **Easy Integration** - Works with Angular Router and external links
- ♿ **Accessible** - ARIA compliant with keyboard navigation
- ⚡ **Performance** - Lightweight and optimized rendering

## Installation

Add the Header Block component:

```bash
npx ngsui-cli add block header
```

## Usage

Create navigation headers with custom layouts:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Header Navigation -->
    <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <img src="/logo.svg" alt="Company Logo" class="h-8 w-auto">
              <span class="ml-2 text-xl font-bold text-gray-900">SuperUI</span>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex space-x-8">
            <a href="/home" class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </a>
            <a href="/features" class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Features
            </a>
            <a href="/pricing" class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Pricing
            </a>
            <a href="/docs" class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Documentation
            </a>
            <a href="/blog" class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Blog
            </a>
          </nav>

          <!-- Desktop Actions -->
          <div class="hidden md:flex items-center space-x-4">
            <button class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Sign In
            </button>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors">
              Get Started
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <div class="md:hidden">
            <button 
              class="p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              (click)="mobileMenuOpen = !mobileMenuOpen"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div class="md:hidden" [class.hidden]="!mobileMenuOpen">
          <div class="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            <a href="/home" class="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md text-base font-medium">
              Home
            </a>
            <a href="/features" class="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md text-base font-medium">
              Features
            </a>
            <a href="/pricing" class="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md text-base font-medium">
              Pricing
            </a>
            <a href="/docs" class="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md text-base font-medium">
              Documentation
            </a>
            <a href="/blog" class="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md text-base font-medium">
              Blog
            </a>
            <div class="pt-4 border-t border-gray-200">
              <a href="/signin" class="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md text-base font-medium">
                Sign In
              </a>
              <a href="/signup" class="block px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-base font-medium mt-2">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class ExampleComponent {
  mobileMenuOpen = false;
}
```

## Examples

### Simple Header with Logo and Navigation

```typescript
@Component({
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-white shadow">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <span class="text-xl font-bold text-gray-900">Brand</span>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex space-x-8">
            <a routerLink="/home" class="text-gray-700 hover:text-gray-900">Home</a>
            <a routerLink="/about" class="text-gray-700 hover:text-gray-900">About</a>
            <a routerLink="/contact" class="text-gray-700 hover:text-gray-900">Contact</a>
          </nav>

          <!-- Mobile Toggle -->
          <button class="md:hidden p-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  `
})
```

### Header with Dropdown Menu

```typescript
@Component({
  imports: [CommonModule],
  template: `
    <header class="bg-white shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <img src="/logo.svg" alt="Logo" class="h-8 w-auto">
            <span class="ml-2 text-xl font-bold">Company</span>
          </div>

          <nav class="hidden lg:flex space-x-8">
            <a href="/" class="text-gray-700 hover:text-blue-600">Home</a>
            
            <!-- Dropdown -->
            <div class="relative group">
              <button class="text-gray-700 hover:text-blue-600 flex items-center">
                Products
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <div class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a href="/product1" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Product 1</a>
                <a href="/product2" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Product 2</a>
                <a href="/product3" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Product 3</a>
              </div>
            </div>
            
            <a href="/pricing" class="text-gray-700 hover:text-blue-600">Pricing</a>
            <a href="/contact" class="text-gray-700 hover:text-blue-600">Contact</a>
          </nav>

          <div class="flex items-center space-x-4">
            <button class="text-gray-700 hover:text-blue-600">Login</button>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  `
})
```
      
      <HeaderNav slot="navigation" class="flex space-x-6">
        <a href="/about" class="text-gray-600 hover:text-gray-900">About</a>
        <a href="/services" class="text-gray-600 hover:text-gray-900">Services</a>
        <a href="/contact" class="text-gray-600 hover:text-gray-900">Contact</a>
      </HeaderNav>
      
      <button slot="actions" class="bg-primary text-primary-foreground px-4 py-2 rounded-lg">
        Get Quote
      </button>
    </HeaderBlock>
  `
})
```

### Transparent Header with Glass Effect

```typescript
@Component({
  template: `
    <HeaderBlock variant="glass" size="lg" class="absolute top-0 left-0 right-0 z-50">
      <div slot="logo" class="flex items-center">
        <img src="/logo-white.svg" alt="Logo" class="h-10 w-auto">
      </div>
      
      <HeaderNav slot="navigation" class="hidden lg:flex space-x-8">
        <a href="/home" class="text-white/90 hover:text-white font-medium transition-colors">Home</a>
        <a href="/about" class="text-white/90 hover:text-white font-medium transition-colors">About</a>
        <a href="/portfolio" class="text-white/90 hover:text-white font-medium transition-colors">Portfolio</a>
        <a href="/services" class="text-white/90 hover:text-white font-medium transition-colors">Services</a>
        <a href="/contact" class="text-white/90 hover:text-white font-medium transition-colors">Contact</a>
      </HeaderNav>
      
      <div slot="actions" class="flex items-center space-x-4">
        <button class="text-white/90 hover:text-white font-medium">Login</button>
        <button class="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-2 rounded-full hover:bg-white/20 transition-colors">
          Get Started
        </button>
      </div>
      
      <!-- Mobile menu overlay -->
      <div slot="mobile-menu" class="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm">
        <div class="bg-white/10 backdrop-blur-lg h-full w-80 p-6">
          <nav class="flex flex-col space-y-6 mt-16">
            <a href="/home" class="text-white text-lg font-medium">Home</a>
            <a href="/about" class="text-white text-lg font-medium">About</a>
            <a href="/portfolio" class="text-white text-lg font-medium">Portfolio</a>
            <a href="/services" class="text-white text-lg font-medium">Services</a>
            <a href="/contact" class="text-white text-lg font-medium">Contact</a>
          </nav>
        </div>
      </div>
    </HeaderBlock>
  `
})
```

### E-commerce Header with Search

```typescript
@Component({
  template: `
    <HeaderBlock variant="default" size="lg" class="border-b">
      <!-- Top bar -->
      <div slot="top-bar" class="border-b bg-gray-50 px-6 py-2">
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-600">Free shipping on orders over $50</span>
          <div class="flex space-x-4">
            <a href="/support" class="text-gray-600 hover:text-gray-900">Support</a>
            <a href="/track" class="text-gray-600 hover:text-gray-900">Track Order</a>
          </div>
        </div>
      </div>
      
      <!-- Main header -->
      <div class="flex items-center justify-between px-6 py-4">
        <div slot="logo" class="flex items-center">
          <img src="/store-logo.svg" alt="Store" class="h-10 w-auto">
        </div>
        
        <!-- Search -->
        <div slot="search" class="flex-1 max-w-lg mx-8">
          <div class="relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              class="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
            <button class="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- User actions -->
        <div slot="actions" class="flex items-center space-x-4">
          <button class="p-2 text-gray-600 hover:text-gray-900">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>
          <button class="p-2 text-gray-600 hover:text-gray-900">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </button>
          <button class="relative p-2 text-gray-600 hover:text-gray-900">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-5M7 13l-2.5 5M17 17a2 2 0 11-4 0 2 2 0 014 0zM9 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
          </button>
        </div>
      </div>
      
      <!-- Navigation bar -->
      <HeaderNav slot="navigation" class="border-t bg-white px-6 py-3">
        <div class="flex space-x-8">
          <a href="/categories/electronics" class="text-gray-700 hover:text-blue-600 font-medium">Electronics</a>
          <a href="/categories/clothing" class="text-gray-700 hover:text-blue-600 font-medium">Clothing</a>
          <a href="/categories/home" class="text-gray-700 hover:text-blue-600 font-medium">Home & Garden</a>
          <a href="/categories/sports" class="text-gray-700 hover:text-blue-600 font-medium">Sports</a>
          <a href="/categories/books" class="text-gray-700 hover:text-blue-600 font-medium">Books</a>
          <a href="/sale" class="text-red-600 hover:text-red-700 font-semibold">Sale 🔥</a>
        </div>
      </HeaderNav>
    </HeaderBlock>
  `
})
```

## Content Slots

### HeaderBlock Slots

| Slot | Purpose | Usage |
|------|---------|-------|
| `slot="top-bar"` | Top announcement bar | `<div slot="top-bar">...</div>` |
| `slot="logo"` | Brand logo/name | `<div slot="logo">...</div>` |
| `slot="brand"` | Alternative brand area | `<div slot="brand">...</div>` |
| `slot="navigation"` | Main navigation | `<HeaderNav slot="navigation">...</HeaderNav>` |
| `slot="search"` | Search functionality | `<div slot="search">...</div>` |
| `slot="actions"` | Action buttons/user menu | `<div slot="actions">...</div>` |
| `slot="cta"` | Call-to-action button | `<button slot="cta">...</button>` |
| `slot="user-menu"` | User dropdown menu | `<div slot="user-menu">...</div>` |
| `slot="mobile-toggle"` | Mobile menu toggle | `<button slot="mobile-toggle">...</button>` |
| `slot="mobile-menu"` | Mobile navigation menu | `<div slot="mobile-menu">...</div>` |
| `slot="bottom-bar"` | Bottom navigation bar | `<div slot="bottom-bar">...</div>` |
| `slot="breadcrumb"` | Breadcrumb navigation | `<nav slot="breadcrumb">...</nav>` |

### HeaderNav Slots

| Slot | Purpose | Usage |
|------|---------|-------|
| `slot="primary"` | Primary navigation links | `<div slot="primary">...</div>` |
| `slot="secondary"` | Secondary navigation | `<div slot="secondary">...</div>` |
| `slot="dropdown"` | Dropdown menus | `<div slot="dropdown">...</div>` |
| `slot="mega-menu"` | Mega menu content | `<div slot="mega-menu">...</div>` |
| Default | Navigation items | `<a href="...">...</a>` |

## API Reference

### HeaderBlock Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'transparent' \| 'sticky' \| 'glass' \| 'minimal' \| 'custom'` | `'default'` | Header style variant |
| `size` | `'sm' \| 'default' \| 'lg' \| 'full' \| 'custom'` | `'default'` | Header size/height |
| `sticky` | `boolean \| 'smart'` | `false` | Enable sticky positioning |
| `transparent` | `boolean` | `false` | Enable transparent background |
| `shadow` | `boolean \| 'on-scroll'` | `true` | Show shadow |
| `border` | `boolean` | `false` | Show bottom border |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| 'none' \| 'custom'` | `'full'` | Container max width |
| `container` | `boolean \| 'custom'` | `true` | Use container classes |
| `class` | `string` | `''` | Additional CSS classes |

### HeaderNav Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical' \| 'custom'` | `'horizontal'` | Navigation orientation |
| `spacing` | `'none' \| 'sm' \| 'default' \| 'lg' \| 'custom'` | `'default'` | Item spacing |
| `alignment` | `'left' \| 'center' \| 'right' \| 'custom'` | `'left'` | Navigation alignment |
| `class` | `string` | `''` | Additional CSS classes |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `mobileToggle` | `EventEmitter<boolean>` | Emitted when mobile menu is toggled |
| `navigationClick` | `EventEmitter<MouseEvent>` | Emitted when navigation item is clicked |
| `logoClick` | `EventEmitter<MouseEvent>` | Emitted when logo is clicked |
| `actionClick` | `EventEmitter<MouseEvent>` | Emitted when action button is clicked |

## Styling

### Custom Classes

```typescript
@Component({
  template: `
    <HeaderBlock 
      variant="glass"
      class="backdrop-blur-lg bg-white/80"
      sticky="smart"
    >
      <HeaderNav 
        slot="navigation"
        class="space-x-8"
        spacing="lg"
      >
        <!-- navigation items -->
      </HeaderNav>
    </HeaderBlock>
  `
})
```

### Responsive Design

```typescript
@Component({
  template: `
    <HeaderBlock size="default" class="lg:px-8">
      <div slot="logo" class="text-lg md:text-xl font-bold">Brand</div>
      
      <HeaderNav slot="navigation" class="hidden md:flex space-x-4 lg:space-x-8">
        <a href="/home" class="text-sm lg:text-base">Home</a>
        <a href="/about" class="text-sm lg:text-base">About</a>
      </HeaderNav>
    </HeaderBlock>
  `
})
```

## Best Practices

### Navigation Structure

- Keep main navigation items to 5-7 for optimal usability
- Use clear, descriptive labels for navigation items
- Implement breadcrumbs for deep navigation hierarchies
- Consider mega menus for complex site structures

### Mobile Experience

- Always provide a mobile-friendly navigation solution
- Use hamburger menu for primary navigation on mobile
- Ensure touch targets are at least 44px for mobile
- Test navigation on various mobile devices and screen sizes

### Performance

- Implement lazy loading for complex mega menus
- Optimize logo and icon images for web
- Use CSS transforms for smooth animations
- Consider using sticky headers carefully for performance

### Accessibility

- Provide proper ARIA labels for navigation elements
- Ensure keyboard navigation works correctly
- Use semantic HTML elements (nav, ul, li)
- Test with screen readers and keyboard-only navigation

### SEO

- Use semantic HTML structure for navigation
- Implement proper heading hierarchy
- Ensure navigation links are crawlable
- Consider schema markup for navigation
