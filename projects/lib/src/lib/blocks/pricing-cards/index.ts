import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {cva} from 'class-variance-authority';
import {cn} from '../../utils/cn';

const pricingCardVariants = cva(
  'relative rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground border-border shadow-lg',
        popular: 'bg-gradient-to-br from-purple-600 to-blue-600 text-white border-purple-500 shadow-2xl scale-105',
        premium: 'bg-gradient-to-br from-yellow-500 to-orange-600 text-white border-yellow-500 shadow-2xl',
        minimal: 'bg-background border-border hover:border-primary/50'
      },
      size: {
        sm: 'p-6',
        default: 'p-8',
        lg: 'p-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface PricingFeature {
  text: string;
  included: boolean;
  tooltip?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: {
    amount: number | string;
    currency?: string;
    period?: string;
    originalAmount?: number;
  };
  description?: string;
  features: PricingFeature[];
  ctaText: string;
  ctaVariant?: 'primary' | 'secondary' | 'outline';
  badge?: string;
  variant?: 'default' | 'popular' | 'premium' | 'minimal';
  href?: string;
  disabled?: boolean;
}

@Component({
  selector: 'pricing-cards-block',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="container mx-auto max-w-7xl">
        <!-- Section Header -->
        @if (title() || subtitle()) {
          <div class="text-center mb-16">
            @if (title()) {
              <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {{ title() }}
              </h2>
            }
            @if (subtitle()) {
              <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
                {{ subtitle() }}
              </p>
            }
          </div>
        }

        <!-- Billing Toggle -->
        @if (showBillingToggle()) {
          <div class="flex justify-center mb-12">
            <div class="flex items-center space-x-4 bg-muted p-2 rounded-lg">
              <button
                (click)="isAnnual.set(false)"
                [class]="cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                  !isAnnual()
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )"
              >
                Monthly
              </button>
              <button
                (click)="isAnnual.set(true)"
                [class]="cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                  isAnnual()
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )"
              >
                Annual
                @if (annualDiscount()) {
                  <span class="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    {{ annualDiscount() }}% off
                  </span>
                }
              </button>
            </div>
          </div>
        }

        <!-- Pricing Cards Grid -->
        <div [class]="getGridClasses()">
          @for (plan of plans(); track plan.id) {
            <div [class]="getCardClasses(plan)">
              <!-- Popular Badge -->
              @if (plan.badge) {
                <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span class="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {{ plan.badge }}
                  </span>
                </div>
              }

              <!-- Plan Header -->
              <div class="text-center mb-8">
                <h3 class="text-xl font-bold mb-2">{{ plan.name }}</h3>
                @if (plan.description) {
                  <p [class]="getDescriptionClasses(plan)">{{ plan.description }}</p>
                }
              </div>

              <!-- Pricing -->
              <div class="text-center mb-8">
                <div class="flex items-baseline justify-center">
                  @if (plan.price.currency) {
                    <span class="text-lg font-medium mr-1">{{ plan.price.currency }}</span>
                  }
                  <span class="text-4xl lg:text-5xl font-bold">
                    {{ getDisplayPrice(plan) }}
                  </span>
                  @if (plan.price.period) {
                    <span [class]="getPeriodClasses(plan)">/{{ plan.price.period }}</span>
                  }
                </div>
                @if (plan.price.originalAmount && isAnnual()) {
                  <div class="mt-2">
                    <span [class]="getOriginalPriceClasses(plan)">
                      Originally {{ plan.price.currency }}{{ plan.price.originalAmount }}/month
                    </span>
                  </div>
                }
              </div>

              <!-- Features List -->
              <ul class="space-y-4 mb-8">
                @for (feature of plan.features; track feature.text) {
                  <li class="flex items-start">
                    @if (feature.included) {
                      <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                    } @else {
                      <svg class="w-5 h-5 text-muted-foreground mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                      </svg>
                    }
                    <span [class]="getFeatureTextClasses(feature, plan)">
                      {{ feature.text }}
                    </span>
                  </li>
                }
              </ul>

              <!-- CTA Button -->
              <button
                [class]="getCtaButtonClasses(plan)"
                [disabled]="plan.disabled"
                (click)="onPlanSelect.emit(plan)"
              >
                {{ plan.ctaText }}
              </button>
            </div>
          }
        </div>

        <!-- Additional Info -->
        @if (additionalInfo()) {
          <div class="text-center mt-12">
            <p class="text-sm text-muted-foreground">
              {{ additionalInfo() }}
            </p>
          </div>
        }
      </div>
    </section>
  `
})
export class PricingCardsBlockComponent {
  // Inputs
  title = input<string>();
  subtitle = input<string>();
  plans = input.required<PricingPlan[]>();
  columns = input<2 | 3 | 4>(3);
  showBillingToggle = input<boolean>(true);
  annualDiscount = input<number>(20);
  additionalInfo = input<string>();

  // Outputs
  onPlanSelect = output<PricingPlan>();

  // State
  isAnnual = signal(false);

  // Helper function
  cn = cn;

  getGridClasses(): string {
    const cols = this.columns();
    const gridClasses = {
      2: 'grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto',
      3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
      4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
    };
    return gridClasses[cols];
  }

  getCardClasses(plan: PricingPlan): string {
    return pricingCardVariants({
      variant: plan.variant || 'default',
      size: 'default'
    });
  }

  getDescriptionClasses(plan: PricingPlan): string {
    const isSpecial = plan.variant === 'popular' || plan.variant === 'premium';
    return isSpecial
      ? 'text-white/80'
      : 'text-muted-foreground';
  }

  getPeriodClasses(plan: PricingPlan): string {
    const isSpecial = plan.variant === 'popular' || plan.variant === 'premium';
    return cn(
      'text-lg font-medium ml-1',
      isSpecial ? 'text-white/80' : 'text-muted-foreground'
    );
  }

  getOriginalPriceClasses(plan: PricingPlan): string {
    const isSpecial = plan.variant === 'popular' || plan.variant === 'premium';
    return cn(
      'text-sm line-through',
      isSpecial ? 'text-white/60' : 'text-muted-foreground/60'
    );
  }

  getFeatureTextClasses(feature: PricingFeature, plan: PricingPlan): string {
    const isSpecial = plan.variant === 'popular' || plan.variant === 'premium';
    const baseClasses = feature.included ? '' : 'opacity-60';

    if (isSpecial) {
      return cn(baseClasses, feature.included ? 'text-white' : 'text-white/60');
    }

    return cn(baseClasses, feature.included ? 'text-foreground' : 'text-muted-foreground');
  }

  getCtaButtonClasses(plan: PricingPlan): string {
    const baseClasses = 'w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const isSpecial = plan.variant === 'popular' || plan.variant === 'premium';
    const ctaVariant = plan.ctaVariant || (isSpecial ? 'secondary' : 'primary');

    if (isSpecial) {
      // For popular/premium cards, use contrasting buttons
      if (ctaVariant === 'secondary') {
        return cn(baseClasses, 'bg-white text-gray-900 hover:bg-gray-100 focus:ring-white');
      }
      return cn(baseClasses, 'bg-white/20 text-white border border-white/30 hover:bg-white/30 focus:ring-white');
    }

    // For regular cards
    const variantClasses = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary',
      outline: 'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground focus:ring-border'
    };

    return cn(
      baseClasses,
      variantClasses[ctaVariant],
      plan.disabled && 'opacity-50 cursor-not-allowed'
    );
  }

  getDisplayPrice(plan: PricingPlan): string {
    const price = plan.price.amount;
    if (typeof price === 'string') return price;

    if (this.isAnnual() && typeof price === 'number') {
      const annualPrice = Math.round(price * (100 - this.annualDiscount()) / 100);
      return annualPrice.toString();
    }

    return price.toString();
  }
}
