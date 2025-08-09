# Pricing Cards Block 💰

Professional pricing sections with responsive grid layouts and modern design patterns. Create compelling pricing tables that convert visitors into customers with beautiful cards and clear value propositions.

## Features

- 💳 **Responsive Cards** - Mobile-first responsive pricing card layouts
- 🎨 **Professional Design** - Modern card styling with hover effects
- �️ **Popular Badges** - Highlight recommended plans with badges
- � **Feature Comparison** - Clear feature lists with checkmarks
- � **Call-to-Action** - Prominent buttons for conversion
- � **Flexible Pricing** - Support for monthly, yearly, and custom pricing
- 🔧 **Easy Customization** - Tailwind CSS classes for styling
- ♿ **Accessible** - ARIA compliant with semantic markup

## Installation

Add the Pricing Cards Block component:

```bash
npx ngsui-cli add block pricing-cards
```

## Usage

Create pricing sections with custom grid layouts:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Pricing Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <!-- Pricing Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <!-- Starter Plan -->
          <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
            <div class="text-center">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <p class="text-gray-600 mb-6">Perfect for individuals</p>
              <div class="mb-8">
                <span class="text-4xl font-bold text-gray-900">$9</span>
                <span class="text-gray-600">/month</span>
              </div>
            </div>
            
            <ul class="space-y-4 mb-8">
              <li class="flex items-center">
                <span class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-green-600 text-sm">✓</span>
                </span>
                Up to 5 projects
              </li>
              <li class="flex items-center">
                <span class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-green-600 text-sm">✓</span>
                </span>
                Basic support
              </li>
              <li class="flex items-center">
                <span class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-green-600 text-sm">✓</span>
                </span>
                1GB storage
              </li>
            </ul>
            
            <button class="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              Get Started
            </button>
          </div>

          <!-- Pro Plan (Popular) -->
          <div class="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-500 hover:shadow-2xl transition-shadow relative">
            <!-- Popular Badge -->
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span class="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            
            <div class="text-center">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
              <p class="text-gray-600 mb-6">Best for growing teams</p>
              <div class="mb-8">
                <span class="text-4xl font-bold text-gray-900">$29</span>
                <span class="text-gray-600">/month</span>
              </div>
            </div>
            
            <ul class="space-y-4 mb-8">
              <li class="flex items-center">
                <span class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-green-600 text-sm">✓</span>
                </span>
                Unlimited projects
              </li>
              <li class="flex items-center">
                <span class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-green-600 text-sm">✓</span>
                </span>
                Priority support
              </li>
              <li class="flex items-center">
                <span class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-green-600 text-sm">✓</span>
                </span>
                50GB storage
              </li>
              <li class="flex items-center">
                <span class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-green-600 text-sm">✓</span>
                </span>
                Advanced analytics
              </li>
            </ul>
            
            <button class="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Start Free Trial
            </button>
          </div>

          <!-- Enterprise Plan -->
          <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
            <div class="text-center">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <p class="text-gray-600 mb-6">For large organizations</p>
              <div class="mb-8">
                <span class="text-4xl font-bold text-gray-900">$99</span>
                <span class="text-gray-600">/month</span>
              </div>
            </div>
            
            <ul class="space-y-4 mb-8">
              <li class="flex items-center">
                <span class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-green-600 text-sm">✓</span>
                </span>
                Everything in Pro
              </li>
              <li class="flex items-center">
                <span class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-green-600 text-sm">✓</span>
                </span>
                24/7 phone support
              </li>
              <li class="flex items-center">
                <span class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-green-600 text-sm">✓</span>
                </span>
                Unlimited storage
              </li>
              <li class="flex items-center">
                <span class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-green-600 text-sm">✓</span>
                </span>
                Custom integrations
              </li>
            </ul>
            
            <button class="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ExampleComponent {}
```

## Examples

### Simple 2-Column Pricing

```typescript
@Component({
  template: `
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <!-- Basic Plan -->
          <div class="bg-white rounded-xl shadow-lg p-8 border">
            <h3 class="text-xl font-bold mb-2">Basic</h3>
            <p class="text-gray-600 mb-4">Perfect for getting started</p>
            <div class="text-3xl font-bold mb-6">$19<span class="text-lg text-gray-600">/mo</span></div>
            
            <ul class="space-y-3 mb-8">
              <li class="flex items-center">
                <span class="text-green-600 mr-2">✓</span>
                5 Team members
              </li>
              <li class="flex items-center">
                <span class="text-green-600 mr-2">✓</span>
                10GB Storage
              </li>
              <li class="flex items-center">
                <span class="text-green-600 mr-2">✓</span>
                Email support
              </li>
            </ul>
            
            <button class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Get Started
            </button>
          </div>

          <!-- Premium Plan -->
          <div class="bg-blue-50 rounded-xl shadow-lg p-8 border-2 border-blue-500 relative">
            <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Recommended</span>
            </div>
            
            <h3 class="text-xl font-bold mb-2">Premium</h3>
            <p class="text-gray-600 mb-4">Best for growing teams</p>
            <div class="text-3xl font-bold mb-6">$49<span class="text-lg text-gray-600">/mo</span></div>
            
            <ul class="space-y-3 mb-8">
              <li class="flex items-center">
                <span class="text-green-600 mr-2">✓</span>
                Unlimited members
              </li>
              <li class="flex items-center">
                <span class="text-green-600 mr-2">✓</span>
                100GB Storage
              </li>
              <li class="flex items-center">
                <span class="text-green-600 mr-2">✓</span>
                Priority support
              </li>
              <li class="flex items-center">
                <span class="text-green-600 mr-2">✓</span>
                Advanced features
              </li>
            </ul>
            
            <button class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
```
      </PricingCard>

      <!-- Enterprise Plan -->
      <PricingCard variant="premium" size="default">
        <h3 slot="title" class="text-lg font-semibold text-gray-900 mb-2">Enterprise</h3>
        <div slot="price" class="text-3xl font-bold text-gray-900 mb-4">
          Custom<span class="text-base font-normal text-gray-500">/month</span>
        </div>
        <p slot="description" class="text-gray-600 mb-6">For large organizations with custom needs</p>
        
        <ul slot="features" class="space-y-3 mb-8">
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
            </svg>
            Everything in Pro
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
            </svg>
            Dedicated support
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
            </svg>
            Custom integrations
          </li>
        </ul>
        
        <button slot="action" class="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
          Contact Sales
        </button>
      </PricingCard>
    </PricingCards>
  `
})
export class ExampleComponent {}
```

## Examples

### Basic Three-Tier Pricing

```typescript
@Component({
  template: `
    <PricingCards layout="grid" spacing="default">
      <PricingCard variant="default">
        <h3 slot="title" class="text-xl font-bold mb-2">Basic</h3>
        <div slot="price" class="text-3xl font-bold mb-4">$10<span class="text-sm">/mo</span></div>
        <p slot="description" class="text-gray-600 mb-6">Essential features for getting started</p>
        
        <div slot="features" class="space-y-2 mb-8">
          <div class="flex items-center">
            <span class="text-green-500 mr-2">✓</span>
            <span>5 Projects</span>
          </div>
          <div class="flex items-center">
            <span class="text-green-500 mr-2">✓</span>
            <span>10GB Storage</span>
          </div>
        </div>
        
        <button slot="action" class="w-full btn btn-outline">Choose Plan</button>
      </PricingCard>
    </PricingCards>
  `
})
```

### Comparison Layout with Features

```typescript
@Component({
  template: `
    <PricingCards layout="comparison" spacing="lg">
      <!-- Feature comparison table -->
      <div slot="comparison-header" class="mb-8">
        <h2 class="text-2xl font-bold text-center mb-4">Choose Your Plan</h2>
        <p class="text-center text-gray-600">Compare features across all plans</p>
      </div>
      
      <PricingCard variant="minimal" size="default">
        <h3 slot="title" class="text-lg font-semibold">Starter</h3>
        <div slot="price" class="text-2xl font-bold">Free</div>
        
        <div slot="features" class="space-y-4">
          <div class="border-t pt-4">
            <h4 class="font-medium mb-2">Core Features</h4>
            <ul class="space-y-2 text-sm">
              <li class="flex justify-between">
                <span>Projects</span>
                <span>3</span>
              </li>
              <li class="flex justify-between">
                <span>Storage</span>
                <span>1GB</span>
              </li>
              <li class="flex justify-between">
                <span>Support</span>
                <span>Community</span>
              </li>
            </ul>
          </div>
        </div>
        
        <button slot="action" class="w-full btn btn-outline">Get Started</button>
      </PricingCard>
      
      <PricingCard variant="highlight" size="default">
        <span slot="badge" class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm">
          Recommended
        </span>
        <h3 slot="title" class="text-lg font-semibold">Professional</h3>
        <div slot="price" class="text-2xl font-bold">$19<span class="text-sm">/mo</span></div>
        
        <div slot="features" class="space-y-4">
          <div class="border-t pt-4">
            <h4 class="font-medium mb-2">Everything in Starter, plus:</h4>
            <ul class="space-y-2 text-sm">
              <li class="flex justify-between">
                <span>Projects</span>
                <span>Unlimited</span>
              </li>
              <li class="flex justify-between">
                <span>Storage</span>
                <span>100GB</span>
              </li>
              <li class="flex justify-between">
                <span>Support</span>
                <span>Priority</span>
              </li>
              <li class="flex justify-between">
                <span>Custom Domains</span>
                <span class="text-green-500">✓</span>
              </li>
              <li class="flex justify-between">
                <span>Analytics</span>
                <span class="text-green-500">✓</span>
              </li>
            </ul>
          </div>
        </div>
        
        <button slot="action" class="w-full btn btn-primary">Start Trial</button>
      </PricingCard>
    </PricingCards>
  `
})
```

### Annual vs Monthly Toggle

```typescript
@Component({
  template: `
    <PricingCards layout="grid" spacing="lg">
      <!-- Billing toggle -->
      <div slot="header" class="text-center mb-8">
        <h2 class="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <div class="inline-flex items-center bg-gray-100 rounded-lg p-1">
          <button 
            class="px-4 py-2 rounded-md transition-colors"
            [class]="billingPeriod() === 'monthly' ? 'bg-white shadow' : 'text-gray-600'"
            (click)="setBillingPeriod('monthly')"
          >
            Monthly
          </button>
          <button 
            class="px-4 py-2 rounded-md transition-colors"
            [class]="billingPeriod() === 'annual' ? 'bg-white shadow' : 'text-gray-600'"
            (click)="setBillingPeriod('annual')"
          >
            Annual
            <span class="ml-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Save 20%</span>
          </button>
        </div>
      </div>
      
      <PricingCard variant="default">
        <h3 slot="title" class="text-xl font-semibold">Starter</h3>
        <div slot="price" class="text-3xl font-bold">
          {{ billingPeriod() === 'monthly' ? '$12' : '$10' }}
          <span class="text-base font-normal">/{{ billingPeriod() === 'monthly' ? 'month' : 'month, billed annually' }}</span>
        </div>
        
        <div slot="savings" *ngIf="billingPeriod() === 'annual'" class="text-green-600 text-sm mb-4">
          Save $24/year
        </div>
        
        <button slot="action" class="w-full btn btn-outline">
          Start {{ billingPeriod() === 'monthly' ? 'Monthly' : 'Annual' }} Plan
        </button>
      </PricingCard>
    </PricingCards>
  `
})
export class PricingToggleExample {
  billingPeriod = signal<'monthly' | 'annual'>('monthly');
  
  setBillingPeriod(period: 'monthly' | 'annual') {
    this.billingPeriod.set(period);
  }
}
```

## Content Slots

### PricingCards Slots

| Slot | Purpose | Usage |
|------|---------|-------|
| `slot="header"` | Section header | `<div slot="header">...</div>` |
| `slot="title"` | Section title | `<h2 slot="title">...</h2>` |
| `slot="description"` | Section description | `<p slot="description">...</p>` |
| `slot="toggle"` | Billing toggle | `<div slot="toggle">...</div>` |
| `slot="comparison-header"` | Comparison table header | `<div slot="comparison-header">...</div>` |
| `slot="footer"` | Section footer | `<div slot="footer">...</div>` |
| Default | Pricing cards | `<PricingCard>...</PricingCard>` |

### PricingCard Slots

| Slot | Purpose | Usage |
|------|---------|-------|
| `slot="badge"` | Plan badge/label | `<span slot="badge">...</span>` |
| `slot="icon"` | Plan icon | `<div slot="icon">...</div>` |
| `slot="title"` | Plan title | `<h3 slot="title">...</h3>` |
| `slot="price"` | Price display | `<div slot="price">...</div>` |
| `slot="period"` | Billing period | `<span slot="period">...</span>` |
| `slot="description"` | Plan description | `<p slot="description">...</p>` |
| `slot="savings"` | Savings message | `<div slot="savings">...</div>` |
| `slot="features"` | Feature list | `<ul slot="features">...</ul>` |
| `slot="feature-list"` | Alternative features | `<div slot="feature-list">...</div>` |
| `slot="action"` | Call-to-action button | `<button slot="action">...</button>` |
| `slot="footer"` | Card footer | `<div slot="footer">...</div>` |
| `slot="testimonial"` | Customer testimonial | `<div slot="testimonial">...</div>` |
| `slot="guarantee"` | Money-back guarantee | `<div slot="guarantee">...</div>` |

## API Reference

### PricingCards Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layout` | `'grid' \| 'comparison' \| 'single' \| 'custom'` | `'grid'` | Cards layout type |
| `spacing` | `'none' \| 'sm' \| 'default' \| 'lg' \| 'custom'` | `'default'` | Cards spacing |
| `columns` | `number \| 'auto'` | `'auto'` | Number of columns |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| 'none' \| 'custom'` | `'xl'` | Container max width |
| `alignment` | `'left' \| 'center' \| 'right' \| 'custom'` | `'center'` | Cards alignment |
| `class` | `string` | `''` | Additional CSS classes |

### PricingCard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'highlight' \| 'premium' \| 'minimal' \| 'glass' \| 'gradient' \| 'custom'` | `'default'` | Card style variant |
| `size` | `'sm' \| 'default' \| 'lg' \| 'full' \| 'custom'` | `'default'` | Card size |
| `featured` | `boolean` | `false` | Mark as featured plan |
| `popular` | `boolean` | `false` | Mark as popular plan |
| `disabled` | `boolean` | `false` | Disable card interactions |
| `class` | `string` | `''` | Additional CSS classes |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `cardClick` | `EventEmitter<MouseEvent>` | Emitted when card is clicked |
| `actionClick` | `EventEmitter<MouseEvent>` | Emitted when action button is clicked |

## Styling

### Custom Classes

```typescript
@Component({
  template: `
    <PricingCards 
      class="bg-gray-50 py-16"
      spacing="lg"
      maxWidth="6xl"
    >
      <PricingCard 
        variant="highlight"
        class="transform hover:scale-105 transition-transform"
      >
        <!-- content -->
      </PricingCard>
    </PricingCards>
  `
})
```

### Responsive Design

```typescript
@Component({
  template: `
    <PricingCards layout="grid" class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <PricingCard class="w-full">
        <div slot="price" class="text-2xl md:text-3xl lg:text-4xl font-bold">
          $29<span class="text-sm md:text-base">/month</span>
        </div>
      </PricingCard>
    </PricingCards>
  `
})
```

## Best Practices

### Pricing Strategy

- Keep plan differences clear and easy to understand
- Highlight the most popular or recommended plan
- Use consistent feature naming across plans
- Include clear call-to-action buttons

### User Experience

- Enable plan comparison functionality
- Provide clear billing period options
- Show savings for annual plans
- Include money-back guarantees or trial periods

### Accessibility

- Use semantic markup for pricing information
- Ensure sufficient color contrast for text and buttons
- Provide keyboard navigation support
- Add ARIA labels for screen readers

### Mobile Experience

- Stack cards vertically on mobile devices
- Ensure buttons are touch-friendly
- Optimize text sizes for readability
- Consider swipe gestures for plan comparison
