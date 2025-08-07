import { Component, signal, computed, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SEOService } from '../services/seo.service';
import { PricingCardsBlockComponent, PricingPlan } from '@lib/pricing-cards';

@Component({
  selector: 'app-pricing-cards-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, PricingCardsBlockComponent],
  template: `
    <!-- Demo Header -->
    <div class="bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Content Block
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Pricing Cards Block
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional pricing tables with feature comparison, billing toggles, and popular badges.
            Perfect for SaaS applications and subscription services.
          </p>
        </div>
      </div>
    </div>

    <!-- Live Examples -->
    <div class="py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          
          <!-- Example 1: Three-Tier Pricing -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Three-Tier Pricing</h2>
              <p class="text-gray-600 dark:text-gray-300">Classic pricing layout with popular plan highlighted</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <pricing-cards-block
                [title]="'Choose Your Plan'"
                [subtitle]="'Select the perfect plan for your needs and scale as you grow'"
                [plans]="threeTierPlans()"
                [showBillingToggle]="true"
                [annualDiscount]="20"
                [additionalInfo]="'All plans include 14-day free trial. No credit card required.'"
                (onPlanSelect)="onPlanSelect($event)"
              />
            </div>
          </div>

          <!-- Example 2: Simple Two-Tier -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Two-Tier Pricing</h2>
              <p class="text-gray-600 dark:text-gray-300">Simplified pricing with two options</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <pricing-cards-block
                [title]="'Simple Pricing'"
                [subtitle]="'Choose between our Starter and Pro plans'"
                [plans]="twoTierPlans()"
                [showBillingToggle]="false"
                (onPlanSelect)="onPlanSelect($event)"
              />
            </div>
          </div>

          <!-- Example 3: Four-Tier Enterprise -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Enterprise Pricing</h2>
              <p class="text-gray-600 dark:text-gray-300">Complete pricing structure with enterprise options</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <pricing-cards-block
                [title]="'Enterprise Solutions'"
                [subtitle]="'From startups to enterprise - we have the perfect solution for you'"
                [plans]="enterprisePlans()"
                [showBillingToggle]="true"
                [annualDiscount]="25"
                [additionalInfo]="'Custom enterprise solutions available. Contact our sales team for more information.'"
                (onPlanSelect)="onPlanSelect($event)"
              />
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Usage Code Examples -->
    <div class="bg-gray-50 dark:bg-gray-900 py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Usage Examples</h2>
          
          <div class="space-y-8">
            <!-- Basic Usage -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Pricing Cards</h3>
              <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code [textContent]="basicUsageCode()"></code></pre>
            </div>

            <!-- Advanced Usage -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Advanced with Billing Toggle</h3>
              <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code [textContent]="advancedUsageCode()"></code></pre>
            </div>

            <!-- TypeScript Interface -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">TypeScript Interfaces</h3>
              <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code [textContent]="interfaceCode()"></code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingCardsDemoComponent implements OnInit {
  private seoService = inject(SEOService);

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'Pricing Cards Block Demo - Angular SuperUI',
      description: 'Interactive examples of pricing card blocks with different layouts, billing toggles, and feature comparisons.',
      keywords: 'Angular pricing cards, pricing table, subscription pricing, SaaS pricing, pricing block component'
    });
  }

  // Three-tier pricing plans
  threeTierPlans = signal<PricingPlan[]>([
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individuals and small projects',
      price: {
        amount: '$9',
        period: '/month',
        originalAmount: 12
      },
      features: [
        { text: '5 Projects', included: true },
        { text: '10GB Storage', included: true },
        { text: 'Basic Support', included: true },
        { text: 'Advanced Analytics', included: false },
        { text: 'Priority Support', included: false },
        { text: 'Custom Integrations', included: false }
      ],
      ctaText: 'Start Free Trial',
      ctaVariant: 'outline',
      variant: 'default'
    },
    {
      id: 'pro',
      name: 'Professional',
      description: 'Best for growing teams and businesses',
      price: {
        amount: '$29',
        period: '/month',
        originalAmount: 39
      },
      badge: 'Most Popular',
      features: [
        { text: 'Unlimited Projects', included: true },
        { text: '100GB Storage', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Advanced Analytics', included: true },
        { text: 'Team Collaboration', included: true },
        { text: 'Custom Integrations', included: false }
      ],
      ctaText: 'Start Free Trial',
      ctaVariant: 'primary',
      variant: 'popular'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations with advanced needs',
      price: {
        amount: '$99',
        period: '/month',
        originalAmount: 129
      },
      features: [
        { text: 'Unlimited Everything', included: true },
        { text: 'Unlimited Storage', included: true },
        { text: '24/7 Phone Support', included: true },
        { text: 'Advanced Analytics', included: true },
        { text: 'Team Collaboration', included: true },
        { text: 'Custom Integrations', included: true }
      ],
      ctaText: 'Contact Sales',
      ctaVariant: 'outline',
      variant: 'default'
    }
  ]);

  // Two-tier pricing plans
  twoTierPlans = signal<PricingPlan[]>([
    {
      id: 'basic',
      name: 'Basic',
      description: 'Everything you need to get started',
      price: {
        amount: '$19',
        period: '/month'
      },
      features: [
        { text: '10 Projects', included: true },
        { text: '50GB Storage', included: true },
        { text: 'Email Support', included: true },
        { text: 'Basic Analytics', included: true },
        { text: 'Advanced Features', included: false }
      ],
      ctaText: 'Get Started',
      ctaVariant: 'outline'
    },
    {
      id: 'pro-simple',
      name: 'Professional',
      description: 'Advanced features for power users',
      price: {
        amount: '$49',
        period: '/month'
      },
      badge: 'Recommended',
      features: [
        { text: 'Unlimited Projects', included: true },
        { text: '500GB Storage', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Advanced Analytics', included: true },
        { text: 'All Premium Features', included: true }
      ],
      ctaText: 'Get Started',
      ctaVariant: 'primary',
      variant: 'popular'
    }
  ]);

  // Enterprise pricing plans
  enterprisePlans = signal<PricingPlan[]>([
    {
      id: 'free',
      name: 'Free',
      description: 'For personal projects and experimentation',
      price: {
        amount: '$0',
        period: '/forever'
      },
      features: [
        { text: '3 Projects', included: true },
        { text: '1GB Storage', included: true },
        { text: 'Community Support', included: true },
        { text: 'Basic Features', included: true },
        { text: 'Advanced Analytics', included: false },
        { text: 'Priority Support', included: false },
        { text: 'Custom Integrations', included: false }
      ],
      ctaText: 'Start Free',
      ctaVariant: 'outline'
    },
    {
      id: 'startup',
      name: 'Startup',
      description: 'Perfect for early-stage companies',
      price: {
        amount: '$29',
        period: '/month'
      },
      features: [
        { text: '25 Projects', included: true },
        { text: '100GB Storage', included: true },
        { text: 'Email Support', included: true },
        { text: 'Advanced Analytics', included: true },
        { text: 'Team Features', included: true },
        { text: 'Priority Support', included: false },
        { text: 'Custom Integrations', included: false }
      ],
      ctaText: 'Start Trial',
      ctaVariant: 'outline'
    },
    {
      id: 'business',
      name: 'Business',
      description: 'For growing teams and businesses',
      price: {
        amount: '$79',
        period: '/month'
      },
      badge: 'Popular',
      features: [
        { text: 'Unlimited Projects', included: true },
        { text: '1TB Storage', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Advanced Analytics', included: true },
        { text: 'Team Collaboration', included: true },
        { text: 'API Access', included: true },
        { text: 'Custom Integrations', included: false }
      ],
      ctaText: 'Start Trial',
      ctaVariant: 'primary',
      variant: 'popular'
    },
    {
      id: 'enterprise-full',
      name: 'Enterprise',
      description: 'Custom solutions for large organizations',
      price: {
        amount: 'Custom',
        period: '/pricing'
      },
      features: [
        { text: 'Unlimited Everything', included: true },
        { text: 'Unlimited Storage', included: true },
        { text: '24/7 Phone Support', included: true },
        { text: 'Custom Analytics', included: true },
        { text: 'Advanced Collaboration', included: true },
        { text: 'Full API Access', included: true },
        { text: 'Custom Integrations', included: true }
      ],
      ctaText: 'Contact Sales',
      ctaVariant: 'outline',
      variant: 'premium'
    }
  ]);

  onPlanSelect(plan: PricingPlan) {
    console.log('Plan selected:', plan);
  }

  // Code examples
  basicUsageCode = computed(() => `<pricing-cards-block
  title="Choose Your Plan"
  subtitle="Select the perfect plan for your needs"
  [plans]="pricingPlans"
  (onPlanSelect)="handlePlanSelect($event)"
/>`);

  advancedUsageCode = computed(() => `<pricing-cards-block
  title="Subscription Plans"
  subtitle="Flexible pricing that grows with you"
  [plans]="pricingPlans"
  [showBillingToggle]="true"
  [annualDiscount]="20"
  footerNote="All plans include 14-day free trial"
  (onPlanSelect)="handlePlanSelect($event)"
  (onBillingToggle)="handleBillingToggle($event)"
/>`);

  interfaceCode = computed(() => `export interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  price: {
    amount: number | string;
    currency?: string;
    period?: string;
    originalAmount?: number;
  };
  badge?: string;
  features: PricingFeature[];
  button: PricingButton;
  variant?: 'default' | 'popular' | 'premium';
  size?: 'sm' | 'default' | 'lg';
}

export interface PricingFeature {
  text: string;
  included: boolean;
  highlighted?: boolean;
}

export interface PricingButton {
  text: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  action?: () => void;
}`);
}
