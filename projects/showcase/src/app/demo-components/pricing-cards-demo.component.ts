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
    <!-- Professional Hero Section -->
    <section class="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Breadcrumb Navigation -->
          <nav class="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <a href="/blocks" class="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">UI Blocks</a>
            <span>→</span>
            <span class="text-gray-900 dark:text-white font-medium">Pricing Cards</span>
          </nav>

          <!-- Category Badge -->
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Content Block
          </div>

          <!-- Main Heading -->
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Pricing Cards Block
          </h1>

          <!-- Description -->
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed mx-auto max-w-3xl">
            Professional pricing tables with feature comparison, billing toggles, and popular badges. 
            Perfect for SaaS applications and subscription services.
          </p>

          <!-- Feature Grid -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 justify-center max-w-4xl mx-auto">
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-sm font-medium text-center">Feature Comparison</span>
            </div>
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-sm font-medium text-center">Billing Toggle</span>
            </div>
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
              <span class="text-sm font-medium text-center">Popular Badge</span>
            </div>
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span class="text-sm font-medium text-center">CTA Integration</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Examples -->
    <div id="examples" class="py-16 bg-gray-50 dark:bg-gray-900">
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


    <!-- Documentation Link -->
    <div class="bg-white dark:bg-gray-900 py-16 border-t border-gray-200 dark:border-gray-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <div class="text-center">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Implementation Guide</h3>
            
            <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Ready to implement? Check out our comprehensive documentation for detailed usage examples and customization options.
            </p>
            
            <a 
              href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/pricing-cards.md" 
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
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
