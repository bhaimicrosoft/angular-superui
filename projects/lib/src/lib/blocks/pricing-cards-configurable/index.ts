import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '../../utils/cn';

const pricingCardsVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: 'bg-background',
        gradient: 'bg-gradient-to-br from-primary/5 via-background to-secondary/5',
        minimal: 'bg-transparent',
        dark: 'bg-gray-900 text-white',
        light: 'bg-white text-gray-900',
        custom: ''
      },
      layout: {
        grid: 'grid gap-6',
        flex: 'flex flex-wrap gap-6',
        stack: 'space-y-6',
        custom: ''
      },
      columns: {
        auto: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        one: 'grid-cols-1',
        two: 'grid-cols-1 md:grid-cols-2',
        three: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        four: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        custom: ''
      },
      spacing: {
        tight: 'gap-4',
        default: 'gap-6',
        relaxed: 'gap-8',
        loose: 'gap-12',
        custom: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      layout: 'grid',
      columns: 'auto',
      spacing: 'default'
    }
  }
);

const pricingCardVariants = cva(
  'relative rounded-xl border transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-card border-border shadow-sm hover:shadow-lg',
        popular: 'bg-primary/5 border-primary shadow-lg ring-2 ring-primary/20 hover:shadow-xl scale-105',
        premium: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-300 shadow-lg',
        minimal: 'bg-card border-border hover:border-primary/50',
        outlined: 'bg-transparent border-2 border-border hover:border-primary',
        glass: 'bg-white/10 backdrop-blur-sm border-white/20 shadow-xl',
        custom: ''
      },
      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
        custom: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export type PricingCardsConfigurableVariant = VariantProps<typeof pricingCardsVariants>;
export type PricingCardConfigurableVariant = VariantProps<typeof pricingCardVariants>;

@Component({
  selector: 'PricingCards',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [class]="sectionClasses()">
      <!-- Background Layer - Configurable -->
      <ng-content select="[slot=background]"></ng-content>
      
      <!-- Container -->
      <div [class]="containerClasses()">
        <!-- Header Section - Configurable -->
        <div [class]="headerClasses()">
          <ng-content select="[slot=announcement]"></ng-content>
          <ng-content select="[slot=badge]"></ng-content>
          <ng-content select="[slot=title]"></ng-content>
          <ng-content select="h1, h2, h3"></ng-content>
          <ng-content select="[slot=subtitle]"></ng-content>
          <ng-content select="[slot=description]"></ng-content>
          <ng-content select="p"></ng-content>
        </div>
        
        <!-- Pricing Toggle/Options - Configurable -->
        <ng-content select="[slot=toggle]"></ng-content>
        <ng-content select="[slot=options]"></ng-content>
        <ng-content select="[slot=billing-period]"></ng-content>
        
        <!-- Cards Container -->
        <div [class]="cardsContainerClasses()">
          <!-- Pricing Cards - Configurable -->
          <ng-content select="[slot=cards]"></ng-content>
          <ng-content select="pricing-card"></ng-content>
          
          <!-- Default Content -->
          <ng-content></ng-content>
        </div>
        
        <!-- Footer/Additional Info - Configurable -->
        <ng-content select="[slot=footer]"></ng-content>
        <ng-content select="[slot=additional-info]"></ng-content>
        <ng-content select="[slot=faq-link]"></ng-content>
        <ng-content select="[slot=contact]"></ng-content>
      </div>
      
      <!-- Decorative Elements - Configurable -->
      <ng-content select="[slot=decorative]"></ng-content>
    </section>
  `,
})
export class PricingCards {
  // Styling inputs
  variant = input<PricingCardsConfigurableVariant['variant']>('default');
  layout = input<PricingCardsConfigurableVariant['layout']>('grid');
  columns = input<PricingCardsConfigurableVariant['columns']>('auto');
  spacing = input<PricingCardsConfigurableVariant['spacing']>('default');
  
  // Container inputs
  containerType = input<'none' | 'default' | 'wide' | 'narrow' | 'custom'>('default');
  padding = input<'none' | 'sm' | 'default' | 'lg' | 'xl' | 'custom'>('default');
  
  // Layout options
  centered = input<boolean>(true);
  showHeader = input<boolean>(true);
  showToggle = input<boolean>(false);
  
  // Custom classes for unlimited customization
  class = input<string>('');
  containerClass = input<string>('');
  headerClass = input<string>('');
  cardsClass = input<string>('');
  
  // Events
  sectionClick = output<MouseEvent>();
  toggleChange = output<boolean>();
  cardSelect = output<{ index: number; plan: string }>();
  
  // Computed classes
  sectionClasses = computed(() => {
    const baseClasses = pricingCardsVariants({
      variant: this.variant(),
      layout: 'grid', // Override layout for section
      columns: 'auto',
      spacing: 'default'
    });
    
    const paddingClasses = this.getPaddingClasses();
    
    return cn(baseClasses, paddingClasses, this.class());
  });
  
  containerClasses = computed(() => {
    const containerType = this.containerType();
    if (containerType === 'none') return cn(this.containerClass());
    if (containerType === 'custom') return cn(this.containerClass());
    
    const containerVariants = {
      default: 'container mx-auto px-4 sm:px-6 lg:px-8',
      wide: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
      narrow: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl'
    } as const;
    
    const containerKey = containerType as keyof typeof containerVariants;
    const baseContainer = containerVariants[containerKey] || containerVariants.default;
    
    return cn(baseContainer, this.containerClass());
  });
  
  headerClasses = computed(() => {
    const baseClasses = 'space-y-4 mb-12';
    const alignmentClasses = this.centered() ? 'text-center mx-auto max-w-3xl' : '';
    
    return cn(baseClasses, alignmentClasses, this.headerClass());
  });
  
  cardsContainerClasses = computed(() => {
    const baseClasses = pricingCardsVariants({
      variant: 'default', // Don't apply variant to cards container
      layout: this.layout(),
      columns: this.columns(),
      spacing: this.spacing()
    });
    
    const alignmentClasses = [
      this.centered() && this.layout() === 'flex' && 'justify-center',
      this.layout() === 'stack' && 'max-w-md mx-auto'
    ].filter(Boolean);
    
    return cn(baseClasses, alignmentClasses, this.cardsClass());
  });
  
  // Helper methods
  private getPaddingClasses(): string {
    const padding = this.padding();
    if (padding === 'custom' || padding === 'none') return '';
    
    const paddingVariants = {
      sm: 'py-12',
      default: 'py-16 lg:py-20',
      lg: 'py-20 lg:py-24',
      xl: 'py-24 lg:py-32'
    } as const;
    
    const paddingKey = (padding || 'default') as keyof typeof paddingVariants;
    return paddingVariants[paddingKey] || paddingVariants.default;
  }
  
  // Event handlers
  onSectionClick(event: MouseEvent) {
    this.sectionClick.emit(event);
  }
  
  onToggleChange(value: boolean) {
    this.toggleChange.emit(value);
  }
  
  onCardSelect(index: number, plan: string) {
    this.cardSelect.emit({ index, plan });
  }
}

// Individual Pricing Card Component
@Component({
  selector: 'PricingCard',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="cardClasses()" (click)="onCardClick($event)">
      <!-- Badge/Popular Label - Configurable -->
      <ng-content select="[slot=badge]"></ng-content>
      <ng-content select="[slot=popular]"></ng-content>
      
      <!-- Header Section -->
      <div [class]="headerClasses()">
        <!-- Plan Name - Configurable -->
        <ng-content select="[slot=name]"></ng-content>
        <ng-content select="[slot=title]"></ng-content>
        <ng-content select="h3, h4"></ng-content>
        
        <!-- Description - Configurable -->
        <ng-content select="[slot=description]"></ng-content>
        <ng-content select="p"></ng-content>
      </div>
      
      <!-- Pricing Section -->
      <div [class]="pricingClasses()">
        <!-- Price - Configurable -->
        <ng-content select="[slot=price]"></ng-content>
        <ng-content select="[slot=currency]"></ng-content>
        
        <!-- Billing Period - Configurable -->
        <ng-content select="[slot=period]"></ng-content>
        <ng-content select="[slot=billing]"></ng-content>
        
        <!-- Discount/Save - Configurable -->
        <ng-content select="[slot=discount]"></ng-content>
        <ng-content select="[slot=save]"></ng-content>
      </div>
      
      <!-- Features List - Configurable -->
      <div [class]="featuresClasses()">
        <ng-content select="[slot=features]"></ng-content>
        <ng-content select="[slot=benefits]"></ng-content>
        <ng-content select="ul, ol"></ng-content>
      </div>
      
      <!-- CTA Section - Configurable -->
      <div [class]="ctaClasses()">
        <ng-content select="[slot=cta]"></ng-content>
        <ng-content select="[slot=button]"></ng-content>
        <ng-content select="button, a"></ng-content>
        
        <!-- Secondary Action - Configurable -->
        <ng-content select="[slot=secondary]"></ng-content>
        <ng-content select="[slot=link]"></ng-content>
      </div>
      
      <!-- Footer/Additional Info - Configurable -->
      <ng-content select="[slot=footer]"></ng-content>
      <ng-content select="[slot=guarantee]"></ng-content>
      <ng-content select="[slot=trial]"></ng-content>
      
      <!-- Default Content -->
      <ng-content></ng-content>
    </div>
  `
})
export class PricingCard {
  // Styling inputs
  variant = input<PricingCardConfigurableVariant['variant']>('default');
  size = input<PricingCardConfigurableVariant['size']>('default');
  
  // State inputs
  popular = input<boolean>(false);
  recommended = input<boolean>(false);
  disabled = input<boolean>(false);
  
  // Custom classes
  class = input<string>('');
  headerClass = input<string>('');
  pricingClass = input<string>('');
  featuresClass = input<string>('');
  ctaClass = input<string>('');
  
  // Events
  cardClick = output<MouseEvent>();
  ctaClick = output<MouseEvent>();
  
  // Computed classes
  cardClasses = computed(() => {
    const baseClasses = pricingCardVariants({
      variant: this.popular() ? 'popular' : this.variant(),
      size: this.size()
    });
    
    const stateClasses = [
      this.recommended() && 'ring-2 ring-primary/50',
      this.disabled() && 'opacity-60 cursor-not-allowed'
    ].filter(Boolean);
    
    return cn(baseClasses, stateClasses, this.class());
  });
  
  headerClasses = computed(() => {
    return cn('space-y-2 mb-6', this.headerClass());
  });
  
  pricingClasses = computed(() => {
    return cn('space-y-1 mb-6', this.pricingClass());
  });
  
  featuresClasses = computed(() => {
    return cn('space-y-3 mb-8 flex-1', this.featuresClass());
  });
  
  ctaClasses = computed(() => {
    return cn('space-y-3 mt-auto', this.ctaClass());
  });
  
  // Event handlers
  onCardClick(event: MouseEvent) {
    if (this.disabled()) return;
    this.cardClick.emit(event);
  }
  
  onCtaClick(event: MouseEvent) {
    if (this.disabled()) return;
    this.ctaClick.emit(event);
  }
}
