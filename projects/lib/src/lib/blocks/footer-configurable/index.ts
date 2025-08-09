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

const footerVariants = cva(
  'relative w-full border-t border-border',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        dark: 'bg-gray-900 text-white border-gray-800',
        light: 'bg-white text-gray-900 border-gray-200',
        gradient: 'bg-gradient-to-t from-gray-50 to-background dark:from-gray-900 dark:to-background',
        minimal: 'bg-background border-t-0',
        rich: 'bg-card border-border shadow-lg',
        custom: ''
      },
      layout: {
        simple: 'py-8',
        standard: 'py-12',
        rich: 'py-16',
        minimal: 'py-6',
        custom: ''
      },
      columns: {
        auto: '',
        one: 'grid-cols-1',
        two: 'grid-cols-1 md:grid-cols-2',
        three: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        four: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        five: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
        custom: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      layout: 'standard',
      columns: 'auto'
    }
  }
);

export type FooterConfigurableVariant = VariantProps<typeof footerVariants>;

@Component({
  selector: 'FooterBlock',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer [class]="footerClasses()">
      <!-- Background/Decorative Layer - Configurable -->
      <ng-content select="[slot=background]"></ng-content>
      <ng-content select="[slot=decorative]"></ng-content>
      
      <!-- Main Footer Content -->
      <div [class]="containerClasses()">
        <!-- Newsletter/CTA Section - Configurable -->
        <div [class]="newsletterSectionClasses()">
          <ng-content select="[slot=newsletter]"></ng-content>
          <ng-content select="[slot=cta]"></ng-content>
          <ng-content select="[slot=subscribe]"></ng-content>
        </div>
        
        <!-- Main Content Grid -->
        <div [class]="mainContentClasses()">
          <!-- Brand/Company Section - Configurable -->
          <div [class]="brandSectionClasses()">
            <ng-content select="[slot=brand]"></ng-content>
            <ng-content select="[slot=logo]"></ng-content>
            <ng-content select="[slot=company-info]"></ng-content>
            <ng-content select="[slot=description]"></ng-content>
          </div>
          
          <!-- Products Column - Configurable -->
          <div [class]="columnSectionClasses()">
            <ng-content select="[slot=products]"></ng-content>
          </div>
          
          <!-- Support Column - Configurable -->
          <div [class]="columnSectionClasses()">
            <ng-content select="[slot=support]"></ng-content>
            <ng-content select="[slot=help]"></ng-content>
          </div>
          
          <!-- Legal Column - Configurable -->
          <div [class]="columnSectionClasses()">
            <ng-content select="[slot=legal]"></ng-content>
          </div>
          
          <!-- Navigation/Links Column - Configurable -->
          <div [class]="columnSectionClasses()">
            <ng-content select="[slot=navigation]"></ng-content>
            <ng-content select="[slot=links]"></ng-content>
            <ng-content select="[slot=columns]"></ng-content>
          </div>
          
          <!-- Social Links Column - Configurable -->
          <div [class]="columnSectionClasses()">
            <ng-content select="[slot=social]"></ng-content>
            <ng-content select="[slot=social-links]"></ng-content>
          </div>
          
          <!-- Company Column - Configurable -->
          <div [class]="columnSectionClasses()">
            <ng-content select="[slot=company]"></ng-content>
          </div>
          
          <!-- Contact Information - Configurable -->
          <div [class]="columnSectionClasses()">
            <ng-content select="[slot=contact]"></ng-content>
            <ng-content select="[slot=address]"></ng-content>
            <ng-content select="[slot=phone]"></ng-content>
            <ng-content select="[slot=email]"></ng-content>
          </div>
          
          <!-- Default Content -->
          <ng-content></ng-content>
        </div>
        
        <!-- Bottom Section -->
        <div [class]="bottomSectionClasses()">
          <!-- Copyright - Configurable -->
          <ng-content select="[slot=copyright]"></ng-content>
          
          <!-- Legal Links - Configurable -->
          <ng-content select="[slot=legal-links]"></ng-content>
          <ng-content select="[slot=privacy]"></ng-content>
          <ng-content select="[slot=terms]"></ng-content>
          
          <!-- Language/Region Selector - Configurable -->
          <ng-content select="[slot=language]"></ng-content>
          <ng-content select="[slot=region]"></ng-content>
          
          <!-- Additional Info - Configurable -->
          <ng-content select="[slot=additional]"></ng-content>
        </div>
      </div>
      
      <!-- Back to Top Button - Configurable -->
      <ng-content select="[slot=back-to-top]"></ng-content>
    </footer>
  `,
})
export class FooterBlock {
  // Styling inputs
  variant = input<FooterConfigurableVariant['variant']>('default');
  layout = input<FooterConfigurableVariant['layout']>('standard');
  columns = input<FooterConfigurableVariant['columns']>('auto');
  
  // Container inputs
  containerType = input<'none' | 'default' | 'wide' | 'full' | 'custom'>('default');
  
  // Layout options
  showNewsletter = input<boolean>(false);
  showSocial = input<boolean>(true);
  stackOnMobile = input<boolean>(true);
  
  // Custom classes for unlimited customization
  class = input<string>('');
  containerClass = input<string>('');
  newsletterClass = input<string>('');
  mainContentClass = input<string>('');
  brandClass = input<string>('');
  bottomClass = input<string>('');
  
  // Events
  newsletterSubmit = output<string>();
  socialClick = output<{ platform: string; url: string }>();
  linkClick = output<{ section: string; link: string }>();
  backToTop = output<void>();
  
  // Computed classes
  footerClasses = computed(() => {
    const baseClasses = footerVariants({
      variant: this.variant(),
      layout: this.layout(),
      columns: 'auto' // Don't apply columns to footer root
    });
    
    return cn(baseClasses, this.class());
  });
  
  containerClasses = computed(() => {
    const containerType = this.containerType();
    if (containerType === 'none') return cn('space-y-8', this.containerClass());
    if (containerType === 'custom') return cn(this.containerClass());
    
    const containerVariants = {
      default: 'container mx-auto px-4 sm:px-6 lg:px-8',
      wide: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
      full: 'w-full px-4 sm:px-6 lg:px-8'
    } as const;
    
    const containerKey = containerType as keyof typeof containerVariants;
    const baseContainer = containerVariants[containerKey] || containerVariants.default;
    
    return cn(baseContainer, 'space-y-8', this.containerClass());
  });
  
  newsletterSectionClasses = computed(() => {
    if (!this.showNewsletter()) return 'hidden';
    return cn('py-8 border-b border-border', this.newsletterClass());
  });
  
  mainContentClasses = computed(() => {
    const columns = this.columns();
    let gridClasses = 'grid gap-8';
    
    if (columns === 'one') {
      gridClasses = 'grid grid-cols-1 gap-8';
    } else if (columns === 'two') {
      gridClasses = 'grid grid-cols-1 md:grid-cols-2 gap-8';
    } else if (columns === 'three') {
      gridClasses = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
    } else if (columns === 'four') {
      gridClasses = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8';
    } else if (columns === 'five') {
      gridClasses = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8';
    } else if (columns === 'auto') {
      gridClasses = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8';
    } else if (columns === 'custom') {
      gridClasses = 'grid gap-8';
    }
    
    return cn(gridClasses, '[&>*:empty]:hidden', this.mainContentClass());
  });
  
  brandSectionClasses = computed(() => {
    const baseClasses = 'space-y-4';
    const columnSpan = this.columns() === 'auto' || this.columns() === 'four' ? 'lg:col-span-1' : '';
    
    return cn(baseClasses, columnSpan, this.brandClass());
  });
  
  columnSectionClasses = computed(() => {
    const baseClasses = 'space-y-4';
    return cn(baseClasses);
  });
  
  bottomSectionClasses = computed(() => {
    const baseClasses = 'pt-8 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4';
    
    return cn(baseClasses, this.bottomClass());
  });
  
  // Event handlers
  onNewsletterSubmit(email: string) {
    this.newsletterSubmit.emit(email);
  }
  
  onSocialClick(platform: string, url: string) {
    this.socialClick.emit({ platform, url });
  }
  
  onLinkClick(section: string, link: string) {
    this.linkClick.emit({ section, link });
  }
  
  onBackToTop() {
    this.backToTop.emit();
  }
}

// Footer Column Component
@Component({
  selector: 'FooterColumn',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="columnClasses()">
      <!-- Column Title - Configurable -->
      <ng-content select="[slot=title]"></ng-content>
      <ng-content select="h3, h4, h5, h6"></ng-content>
      
      <!-- Column Links - Configurable -->
      <ng-content select="[slot=links]"></ng-content>
      <ng-content select="ul, ol"></ng-content>
      <ng-content select="nav"></ng-content>
      
      <!-- Column Content - Configurable -->
      <ng-content select="[slot=content]"></ng-content>
      
      <!-- Default Content -->
      <ng-content></ng-content>
    </div>
  `
})
export class FooterColumn {
  // Styling inputs
  spacing = input<'tight' | 'default' | 'relaxed' | 'custom'>('default');
  alignment = input<'left' | 'center' | 'right' | 'custom'>('left');
  
  // Custom classes
  class = input<string>('');
  
  // Computed classes
  columnClasses = computed(() => {
    const spacing = this.spacing();
    const alignment = this.alignment();
    
    const spacingClasses = {
      tight: 'space-y-2',
      default: 'space-y-4',
      relaxed: 'space-y-6',
      custom: ''
    } as const;
    
    const alignmentClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      custom: ''
    } as const;
    
    const spacingKey = (spacing || 'default') as keyof typeof spacingClasses;
    const alignmentKey = (alignment || 'left') as keyof typeof alignmentClasses;
    
    const baseSpacing = spacingClasses[spacingKey] || spacingClasses.default;
    const baseAlignment = alignmentClasses[alignmentKey] || alignmentClasses.left;
    
    return cn(baseSpacing, baseAlignment, this.class());
  });
}

// Footer Link Component
@Component({
  selector: 'FooterLink',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a [class]="linkClasses()" [href]="href()" (click)="onLinkClick($event)">
      <!-- Icon - Configurable -->
      <ng-content select="[slot=icon]"></ng-content>
      
      <!-- Text Content -->
      <ng-content></ng-content>
      
      <!-- External Icon - Configurable -->
      <ng-content select="[slot=external]"></ng-content>
    </a>
  `
})
export class FooterLink {
  // Link properties
  href = input<string>('#');
  external = input<boolean>(false);
  
  // Styling
  variant = input<'default' | 'subtle' | 'bold' | 'custom'>('default');
  
  // Custom classes
  class = input<string>('');
  
  // Events
  linkClick = output<MouseEvent>();
  
  // Computed classes
  linkClasses = computed(() => {
    const variant = this.variant();
    
    const variantClasses = {
      default: 'text-muted-foreground hover:text-foreground transition-colors',
      subtle: 'text-muted-foreground/80 hover:text-muted-foreground transition-colors',
      bold: 'text-foreground hover:text-primary transition-colors font-medium',
      custom: ''
    } as const;
    
    const variantKey = (variant || 'default') as keyof typeof variantClasses;
    const baseClasses = variantClasses[variantKey] || variantClasses.default;
    
    const stateClasses = [
      this.external() && 'inline-flex items-center gap-1'
    ].filter(Boolean);
    
    return cn(baseClasses, stateClasses, this.class());
  });
  
  // Event handlers
  onLinkClick(event: MouseEvent) {
    this.linkClick.emit(event);
  }
}
