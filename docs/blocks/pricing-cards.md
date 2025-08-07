# Pricing Cards Block 💳

Professional pricing tables with feature comparison, billing toggles, and popular badges. Perfect for SaaS applications, subscription services, and product pricing pages.

## Features

- 🎨 **4 Card Variants** - Default, Popular, Premium, Minimal
- 📏 **3 Sizes** - Small, Default, Large
- 🔄 **Billing Toggle** - Monthly/Annual switching with discount display
- ⭐ **Popular Badges** - Highlight recommended plans
- ✅ **Feature Comparison** - Rich feature lists with inclusion indicators
- 💰 **Flexible Pricing** - Support for various currencies and billing periods
- 🎯 **CTA Integration** - Customizable call-to-action buttons
- 📱 **Fully Responsive** - Mobile-first design with adaptive layouts
- ♿ **Accessibility** - ARIA compliant with keyboard navigation support
- 🔧 **TypeScript** - Full type safety with comprehensive interfaces

## Installation

Initialize Angular SuperUI in your project:

```bash
npx ngsui init
```

Add the Pricing Cards Block component:

```bash
npx ngsui add block pricing-cards
```

## Usage

Import the Pricing Cards Block component in your Angular component:

```typescript
import { Component, signal } from '@angular/core';
import { PricingCardsBlockComponent, PricingPlan } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [PricingCardsBlockComponent],
  template: `
    <pricing-cards-block
      title="Choose Your Plan"
      subtitle="Select the perfect plan for your needs and scale as you grow"
      [plans]="pricingPlans()"
      [showBillingToggle]="true"
      [annualDiscount]="20"
      additionalInfo="All plans include 14-day free trial. No credit card required."
      (onPlanSelect)="handlePlanSelect($event)"
    />
  `
})
export class ExampleComponent {
  pricingPlans = signal<PricingPlan[]>([
    {
      id: 'starter',
      name: 'Starter',
      price: {
        amount: 9,
        currency: '$',
        period: 'month'
      },
      description: 'Perfect for individuals and small projects',
      features: [
        { text: 'Up to 5 projects', included: true },
        { text: '10GB storage', included: true },
        { text: 'Basic support', included: true },
        { text: 'Advanced analytics', included: false },
        { text: 'Priority support', included: false }
      ],
      ctaText: 'Start Free Trial',
      ctaVariant: 'outline'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: {
        amount: 29,
        currency: '$',
        period: 'month'
      },
      description: 'Great for growing teams and businesses',
      features: [
        { text: 'Unlimited projects', included: true },
        { text: '100GB storage', included: true },
        { text: 'Priority support', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'API access', included: true }
      ],
      ctaText: 'Get Started',
      ctaVariant: 'primary',
      badge: 'Most Popular',
      variant: 'popular'
    }
  ]);

  handlePlanSelect(plan: PricingPlan) {
    console.log('Plan selected:', plan);
    // Handle plan selection
  }
}
```

## Examples

### Three-Tier Pricing

Classic pricing layout with popular plan highlighted - perfect for most SaaS applications.

```typescript
@Component({
  template: `
    <pricing-cards-block
      title="Choose Your Plan"
      subtitle="Select the perfect plan for your needs and scale as you grow"
      [plans]="threeTierPlans()"
      [showBillingToggle]="true"
      [annualDiscount]="20"
      additionalInfo="All plans include 14-day free trial. No credit card required."
      (onPlanSelect)="onPlanSelect($event)"
    />
  `
})
export class ThreeTierExample {
  threeTierPlans = signal<PricingPlan[]>([
    {
      id: 'basic',
      name: 'Basic',
      price: {
        amount: 15,
        currency: '$',
        period: 'month'
      },
      description: 'Perfect for individuals and small teams',
      features: [
        { text: 'Up to 5 team members', included: true },
        { text: '50GB storage', included: true },
        { text: 'Basic integrations', included: true },
        { text: 'Email support', included: true },
        { text: 'Advanced analytics', included: false },
        { text: 'Priority support', included: false },
        { text: 'Custom branding', included: false }
      ],
      ctaText: 'Start Free Trial',
      ctaVariant: 'outline'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: {
        amount: 49,
        currency: '$',
        period: 'month'
      },
      description: 'Great for growing businesses',
      features: [
        { text: 'Up to 25 team members', included: true },
        { text: '500GB storage', included: true },
        { text: 'Advanced integrations', included: true },
        { text: 'Priority email & chat support', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'API access', included: true },
        { text: 'Custom branding', included: false }
      ],
      ctaText: 'Get Started',
      ctaVariant: 'primary',
      badge: 'Most Popular',
      variant: 'popular'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: {
        amount: 149,
        currency: '$',
        period: 'month'
      },
      description: 'For large organizations with advanced needs',
      features: [
        { text: 'Unlimited team members', included: true },
        { text: 'Unlimited storage', included: true },
        { text: 'All integrations', included: true },
        { text: '24/7 phone & chat support', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Full API access', included: true },
        { text: 'Custom branding', included: true }
      ],
      ctaText: 'Contact Sales',
      ctaVariant: 'outline'
    }
  ]);

  onPlanSelect(plan: PricingPlan) {
    console.log('Plan selected:', plan);
    if (plan.id === 'enterprise') {
      // Handle enterprise contact
      this.contactSales();
    } else {
      // Handle subscription signup
      this.startSubscription(plan);
    }
  }

  contactSales() {
    // Open contact form or redirect
  }

  startSubscription(plan: PricingPlan) {
    // Handle subscription flow
  }
}
```

### Two-Tier Simplified

Simple pricing with two options - perfect for clear, straightforward offerings.

```typescript
@Component({
  template: `
    <pricing-cards-block
      title="Simple, Transparent Pricing"
      subtitle="Choose the plan that fits your needs"
      [plans]="twoTierPlans()"
      [showBillingToggle]="false"
      (onPlanSelect)="onPlanSelect($event)"
    />
  `
})
export class TwoTierExample {
  twoTierPlans = signal<PricingPlan[]>([
    {
      id: 'personal',
      name: 'Personal',
      price: {
        amount: 19,
        currency: '$',
        period: 'month'
      },
      description: 'For individual creators and freelancers',
      features: [
        { text: '10 projects', included: true },
        { text: '100GB storage', included: true },
        { text: 'Basic templates', included: true },
        { text: 'Email support', included: true },
        { text: 'Advanced features', included: false },
        { text: 'Priority support', included: false }
      ],
      ctaText: 'Get Started',
      ctaVariant: 'outline'
    },
    {
      id: 'business',
      name: 'Business',
      price: {
        amount: 59,
        currency: '$',
        period: 'month'
      },
      description: 'For teams and growing businesses',
      features: [
        { text: 'Unlimited projects', included: true },
        { text: '1TB storage', included: true },
        { text: 'Premium templates', included: true },
        { text: 'Priority support', included: true },
        { text: 'Advanced features', included: true },
        { text: 'Team collaboration', included: true }
      ],
      ctaText: 'Start Free Trial',
      ctaVariant: 'primary',
      badge: 'Recommended',
      variant: 'popular'
    }
  ]);

  onPlanSelect(plan: PricingPlan) {
    console.log('Plan selected:', plan);
  }
}
```

### Premium Enterprise Plans

High-value plans with custom pricing and premium features.

```typescript
@Component({
  template: `
    <pricing-cards-block
      title="Enterprise Solutions"
      subtitle="Powerful plans for enterprise-scale organizations"
      [plans]="enterprisePlans()"
      [showBillingToggle]="true"
      [annualDiscount]="25"
      additionalInfo="All enterprise plans include dedicated account management and custom onboarding."
      (onPlanSelect)="onPlanSelect($event)"
    />
  `
})
export class EnterpriseExample {
  enterprisePlans = signal<PricingPlan[]>([
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: {
        amount: 299,
        currency: '$',
        period: 'month'
      },
      description: 'Complete solution for large organizations',
      features: [
        { text: 'Unlimited everything', included: true },
        { text: 'Advanced security & compliance', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: '24/7 premium support', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'White-label options', included: true }
      ],
      ctaText: 'Contact Sales',
      ctaVariant: 'primary',
      badge: 'Most Popular',
      variant: 'premium'
    },
    {
      id: 'custom',
      name: 'Custom',
      price: {
        amount: 'Custom',
        period: ''
      },
      description: 'Tailored solution for unique requirements',
      features: [
        { text: 'Everything in Enterprise', included: true },
        { text: 'Custom development', included: true },
        { text: 'On-premise deployment', included: true },
        { text: 'SLA guarantees', included: true },
        { text: 'Training & onboarding', included: true },
        { text: 'Dedicated infrastructure', included: true }
      ],
      ctaText: 'Get Quote',
      ctaVariant: 'outline'
    }
  ]);

  onPlanSelect(plan: PricingPlan) {
    console.log('Plan selected:', plan);
    if (plan.price.amount === 'Custom') {
      this.requestQuote(plan);
    } else {
      this.contactEnterpriseSales(plan);
    }
  }

  requestQuote(plan: PricingPlan) {
    // Handle custom quote request
  }

  contactEnterpriseSales(plan: PricingPlan) {
    // Handle enterprise sales contact
  }
}
```

### Feature-Rich Comparison

Detailed feature comparison with tooltips and comprehensive information.

```typescript
@Component({
  template: `
    <pricing-cards-block
      title="Complete Feature Comparison"
      subtitle="See exactly what's included in each plan"
      [plans]="featureRichPlans()"
      [showBillingToggle]="true"
      [annualDiscount]="30"
      size="lg"
      (onPlanSelect)="onPlanSelect($event)"
    />
  `
})
export class FeatureComparisonExample {
  featureRichPlans = signal<PricingPlan[]>([
    {
      id: 'starter',
      name: 'Starter',
      price: {
        amount: 12,
        currency: '$',
        period: 'month'
      },
      description: 'Essential features for getting started',
      features: [
        { text: '5 active projects', included: true, tooltip: 'Create and manage up to 5 projects simultaneously' },
        { text: '10GB cloud storage', included: true, tooltip: 'Secure cloud storage for all your files' },
        { text: 'Basic analytics', included: true, tooltip: 'View basic metrics and usage statistics' },
        { text: 'Email support', included: true, tooltip: 'Get help via email within 24 hours' },
        { text: 'API access', included: false, tooltip: 'Programmatic access to platform features' },
        { text: 'Advanced integrations', included: false, tooltip: 'Connect with third-party tools and services' },
        { text: 'Custom branding', included: false, tooltip: 'Add your logo and brand colors' },
        { text: 'Priority support', included: false, tooltip: 'Get help via chat and phone' }
      ],
      ctaText: 'Start Free Trial',
      ctaVariant: 'outline'
    },
    {
      id: 'growth',
      name: 'Growth',
      price: {
        amount: 39,
        currency: '$',
        period: 'month'
      },
      description: 'Advanced features for scaling businesses',
      features: [
        { text: '50 active projects', included: true, tooltip: 'Create and manage up to 50 projects simultaneously' },
        { text: '500GB cloud storage', included: true, tooltip: 'Ample storage for large teams and files' },
        { text: 'Advanced analytics', included: true, tooltip: 'Detailed insights and custom reports' },
        { text: 'Priority email & chat support', included: true, tooltip: 'Get help via email and chat within 4 hours' },
        { text: 'Full API access', included: true, tooltip: 'Complete programmatic access to all features' },
        { text: 'Advanced integrations', included: true, tooltip: 'Connect with 100+ third-party tools' },
        { text: 'Custom branding', included: false, tooltip: 'Add your logo and brand colors' },
        { text: '24/7 phone support', included: false, tooltip: 'Round-the-clock phone assistance' }
      ],
      ctaText: 'Get Started',
      ctaVariant: 'primary',
      badge: 'Best Value',
      variant: 'popular'
    }
  ]);

  onPlanSelect(plan: PricingPlan) {
    console.log('Plan selected:', plan);
  }
}
```

## Variants

### Card Variants

#### Default

```html
<pricing-cards-block variant="default">
```

Standard cards with clean borders and subtle shadows.

#### Popular

```html
<pricing-cards-block variant="popular">
```

Highlighted cards with gradient background and enhanced styling.

#### Premium

```html
<pricing-cards-block variant="premium">
```

Premium styling with gold/orange gradients for high-value plans.

#### Minimal

```html
<pricing-cards-block variant="minimal">
```

Clean, minimal styling with subtle borders and hover effects.

## Sizes

### Small

```html
<pricing-cards-block size="sm">
```

Compact cards (p-6) for dense layouts.

### Default

```html
<pricing-cards-block size="default">
```

Standard card size (p-8) for most use cases.

### Large

```html
<pricing-cards-block size="lg">
```

Spacious cards (p-10) for premium presentations.

## API Reference

### Component Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | `undefined` | Main heading text |
| `subtitle` | `string` | `undefined` | Subheading description text |
| `plans` | `PricingPlan[]` | `required` | Array of pricing plans to display |
| `showBillingToggle` | `boolean` | `false` | Show monthly/annual billing toggle |
| `annualDiscount` | `number` | `0` | Percentage discount for annual billing |
| `additionalInfo` | `string` | `undefined` | Additional information text below cards |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Card size variant |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onPlanSelect` | `EventEmitter<PricingPlan>` | Emitted when a pricing plan is selected |

### PricingPlan Interface

```typescript
export interface PricingPlan {
  id: string;                      // Unique identifier
  name: string;                    // Plan name
  price: {                         // Pricing information
    amount: number | string;       // Price amount or "Custom"
    currency?: string;             // Currency symbol (e.g., "$")
    period?: string;               // Billing period (e.g., "month")
    originalAmount?: number;       // Original price for discount display
  };
  description?: string;            // Plan description
  features: PricingFeature[];      // Array of features
  ctaText: string;                 // Call-to-action button text
  ctaVariant?: 'primary' | 'secondary' | 'outline'; // Button style
  badge?: string;                  // Badge text (e.g., "Most Popular")
  variant?: 'default' | 'popular' | 'premium' | 'minimal'; // Card style
  href?: string;                   // Link URL for the CTA
  disabled?: boolean;              // Disable the plan
}
```

### PricingFeature Interface

```typescript
export interface PricingFeature {
  text: string;                    // Feature description
  included: boolean;               // Whether feature is included
  tooltip?: string;                // Optional tooltip text
}
```

## Billing Toggle

The billing toggle allows users to switch between monthly and annual pricing:

```typescript
// Enable billing toggle with discount
<pricing-cards-block
  [showBillingToggle]="true"
  [annualDiscount]="20"    // 20% discount for annual
  [plans]="plans()"
/>

// Plans automatically calculate annual pricing
plans = signal<PricingPlan[]>([
  {
    id: 'pro',
    name: 'Professional',
    price: {
      amount: 29,           // Monthly price
      currency: '$',
      period: 'month'
    },
    // Annual price automatically calculated as: 29 * 12 * (1 - 0.20) = $278.40/year
    // ...
  }
]);
```

## Responsive Behavior

The Pricing Cards Block is fully responsive and adapts to different screen sizes:

- **Mobile (< 768px)**: Single column layout with stacked cards
- **Tablet (768px - 1024px)**: 2 cards per row for 3+ plans
- **Desktop (> 1024px)**: Full row layout based on number of plans

### Responsive Layout

| Number of Plans | Mobile | Tablet | Desktop |
|-----------------|--------|--------|---------|
| 2 | 1 | 2 | 2 |
| 3 | 1 | 2 | 3 |
| 4+ | 1 | 2 | 4 |

## Accessibility

The Pricing Cards Block includes comprehensive accessibility features:

- **Semantic HTML**: Proper structure with headings and lists
- **ARIA Labels**: Descriptive labels for screen readers
- **Keyboard Navigation**: Full keyboard support for interactive elements
- **Focus Management**: Visible focus indicators and logical tab order
- **Screen Reader Support**: Optimized for assistive technologies
- **High Contrast**: Compatible with high contrast mode

### Accessibility Best Practices

```typescript
// Provide clear plan descriptions
{
  name: 'Professional',
  description: 'Great for growing teams and businesses', // Clear description
  ctaText: 'Start Professional Plan',                    // Descriptive CTA
}

// Use meaningful feature descriptions
features: [
  { 
    text: 'Up to 25 team members',                       // Specific limits
    included: true,
    tooltip: 'Add up to 25 users to your workspace'     // Additional context
  }
]
```

## Customization

### CSS Variables

The Pricing Cards Block uses CSS custom properties for theming:

```css
.pricing-cards-block {
  --pricing-bg: theme(colors.card);
  --pricing-text: theme(colors.card-foreground);
  --pricing-muted: theme(colors.muted.foreground);
  --pricing-border: theme(colors.border);
  --pricing-primary: theme(colors.primary);
  --pricing-popular-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Custom Styling

Add custom styles by targeting the component classes:

```css
/* Custom card styling */
.custom-pricing .pricing-card {
  backdrop-filter: blur(10px);
  border: 2px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(45deg, #667eea, #764ba2) border-box;
}

/* Custom popular card styling */
.custom-pricing .pricing-card[data-popular="true"] {
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
}

/* Custom feature list styling */
.custom-pricing .feature-list {
  display: grid;
  gap: 1rem;
}

.custom-pricing .feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
}
```

### Tailwind CSS Customization

Extend the component with Tailwind classes:

```html
<pricing-cards-block
  class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
  title="Custom Styled Pricing"
  [plans]="plans()"
/>
```

## Performance Considerations

- **Change Detection**: Component uses OnPush strategy for optimal performance
- **Bundle Size**: Tree-shakeable exports reduce bundle size
- **Memory Management**: Proper cleanup of event listeners and subscriptions
- **Image Optimization**: Consider lazy loading for plan icons or images

```typescript
// Optimize plan data structure
plans = computed(() => {
  // Memoized calculation of pricing with discounts
  return this.basePlans().map(plan => ({
    ...plan,
    calculatedPrice: this.calculatePrice(plan, this.isAnnual())
  }));
});

// Use OnPush strategy in parent components
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Common Issues

#### Pricing Not Updating with Billing Toggle

```typescript
// ❌ Wrong: Static pricing data
plans = [
  { name: 'Pro', price: { amount: 29 } }
];

// ✅ Correct: Reactive pricing calculation
plans = computed(() => 
  this.basePlans().map(plan => ({
    ...plan,
    price: {
      ...plan.price,
      amount: this.calculatePrice(plan.price.amount, this.isAnnual())
    }
  }))
);
```

#### Cards Not Responsive

```css
/* Ensure proper grid behavior */
.pricing-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  max-width: 100%;
}
```

#### Feature Lists Too Long

```typescript
// Use feature categories for better organization
features: [
  { text: 'Core Features', included: true, isCategory: true },
  { text: '• Up to 25 team members', included: true },
  { text: '• 500GB storage', included: true },
  { text: 'Advanced Features', included: true, isCategory: true },
  { text: '• API access', included: true },
  { text: '• Priority support', included: false }
]
```

## Related Components

- [Button Component](../components/button.md) - For custom CTA buttons
- [Badge Component](../components/badge.md) - For plan badges and indicators
- [Card Component](../components/card.md) - For alternative card layouts
- [Toggle Component](../components/toggle.md) - For custom billing toggles

## Contributing

Found a bug or want to contribute? Check out our [Contributing Guidelines](../../CONTRIBUTING.md) and submit a pull request on [GitHub](https://github.com/bhaimicrosoft/angular-superui).

## Changelog

### v0.1.0
- Initial release of Pricing Cards Block component
- Support for multiple card variants and sizes
- Billing toggle with automatic discount calculation
- Feature comparison with inclusion indicators
- Responsive design with mobile-first approach
- Full accessibility implementation
- TypeScript interfaces and type safety

---

*For more examples and advanced usage, check out our [Storybook](https://storybook.angular-superui.com) or visit the [live demo](https://angular-superui.com/blocks/pricing-cards).*
