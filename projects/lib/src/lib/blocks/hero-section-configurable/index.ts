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

const heroSectionVariants = cva(
  'relative w-full overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        gradient: 'bg-gradient-to-br from-primary/5 via-background to-secondary/5',
        centered: 'bg-background text-center',
        split: 'grid lg:grid-cols-2 gap-8 lg:gap-12 items-center',
        fullscreen: 'min-h-screen flex items-center justify-center',
        minimal: 'bg-background py-12',
        dark: 'bg-gray-900 text-white',
        light: 'bg-white text-gray-900',
        custom: ''
      },
      size: {
        sm: 'py-12 lg:py-16',
        default: 'py-16 lg:py-20',
        lg: 'py-20 lg:py-24',
        xl: 'py-24 lg:py-32',
        full: 'min-h-screen',
        custom: ''
      },
      container: {
        none: '',
        default: 'container mx-auto px-4 sm:px-6 lg:px-8',
        wide: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
        narrow: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl',
        custom: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      container: 'default'
    }
  }
);

export type HeroSectionConfigurableVariant = VariantProps<typeof heroSectionVariants>;

@Component({
  selector: 'HeroSection',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [class]="sectionClasses()">
      <!-- Background/Media Layer - Configurable -->
      <ng-content select="[slot=background]"></ng-content>
      <ng-content select="[slot=media]"></ng-content>
      <ng-content select="[slot=video]"></ng-content>
      
      <!-- Overlay Layer - Configurable -->
      <ng-content select="[slot=overlay]"></ng-content>
      
      <!-- Container -->
      <div [class]="containerClasses()">
        <!-- Header Section - Configurable -->
        <div [class]="headerClasses()">
          <ng-content select="[slot=announcement]"></ng-content>
          <ng-content select="[slot=badge]"></ng-content>
          
          <!-- Main Heading - Configurable -->
          <ng-content select="[slot=title]"></ng-content>
          <ng-content select="h1"></ng-content>
          
          <!-- Subtitle/Description - Configurable -->
          <ng-content select="[slot=subtitle]"></ng-content>
          <ng-content select="[slot=description]"></ng-content>
          <ng-content select="p"></ng-content>
          
          <!-- CTA/Actions - Configurable -->
          <ng-content select="[slot=actions]"></ng-content>
          <ng-content select="[slot=cta]"></ng-content>
          <ng-content select="button, a"></ng-content>
        </div>
        
        <!-- Visual Content - Configurable -->
        <div [class]="visualClasses()">
          <ng-content select="[slot=visual]"></ng-content>
          <ng-content select="[slot=image]"></ng-content>
          <ng-content select="[slot=illustration]"></ng-content>
          <ng-content select="img"></ng-content>
        </div>
        
        <!-- Features/Stats Section - Configurable -->
        <ng-content select="[slot=features]"></ng-content>
        <ng-content select="[slot=stats]"></ng-content>
        <ng-content select="[slot=metrics]"></ng-content>
        
        <!-- Social Proof - Configurable -->
        <ng-content select="[slot=social-proof]"></ng-content>
        <ng-content select="[slot=testimonials]"></ng-content>
        <ng-content select="[slot=logos]"></ng-content>
        
        <!-- Default Content -->
        <ng-content></ng-content>
      </div>
      
      <!-- Decorative Elements - Configurable -->
      <ng-content select="[slot=decorative]"></ng-content>
      <ng-content select="[slot=pattern]"></ng-content>
      
      <!-- Scroll Indicator - Configurable -->
      <ng-content select="[slot=scroll-indicator]"></ng-content>
    </section>
  `,
})
export class HeroSection {
  // Styling inputs
  variant = input<HeroSectionConfigurableVariant['variant']>('default');
  size = input<HeroSectionConfigurableVariant['size']>('default');
  container = input<HeroSectionConfigurableVariant['container']>('default');
  
  // Layout inputs
  centered = input<boolean>(false);
  split = input<boolean>(false);
  reversed = input<boolean>(false);
  
  // Content visibility
  showHeader = input<boolean>(true);
  showVisual = input<boolean>(true);
  
  // Custom classes for unlimited customization
  class = input<string>('');
  containerClass = input<string>('');
  headerClass = input<string>('');
  visualClass = input<string>('');
  
  // Events
  sectionClick = output<MouseEvent>();
  ctaClick = output<MouseEvent>();
  imageLoad = output<Event>();
  
  // Computed classes
  sectionClasses = computed(() => {
    const baseClasses = heroSectionVariants({
      variant: this.variant(),
      size: this.size(),
      container: 'none' // We handle container separately
    });
    
    const layoutClasses = [
      this.centered() && 'text-center items-center',
      this.split() && !this.centered() && 'grid lg:grid-cols-2 gap-8 lg:gap-12 items-center',
      this.reversed() && this.split() && 'lg:grid-cols-2'
    ].filter(Boolean);
    
    return cn(baseClasses, layoutClasses, this.class());
  });
  
  containerClasses = computed(() => {
    const containerType = this.container();
    if (containerType === 'none') return cn(this.containerClass());
    if (containerType === 'custom') return cn(this.containerClass());
    
    const containerVariants = {
      default: 'container mx-auto px-4 sm:px-6 lg:px-8',
      wide: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
      narrow: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl'
    } as const;
    
    const containerKey = containerType as keyof typeof containerVariants;
    const baseContainer = containerVariants[containerKey] || containerVariants.default;
    
    const layoutClasses = [
      this.split() && 'grid lg:grid-cols-2 gap-8 lg:gap-12 items-center',
      this.reversed() && this.split() && 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1'
    ].filter(Boolean);
    
    return cn(baseContainer, layoutClasses, this.containerClass());
  });
  
  headerClasses = computed(() => {
    const baseClasses = 'space-y-6';
    const alignmentClasses = [
      this.centered() && 'text-center mx-auto max-w-3xl',
      !this.centered() && this.split() && 'lg:pr-8'
    ].filter(Boolean);
    
    return cn(baseClasses, alignmentClasses, this.headerClass());
  });
  
  visualClasses = computed(() => {
    const baseClasses = 'relative';
    const layoutClasses = [
      this.centered() && 'mx-auto mt-8',
      this.split() && 'lg:pl-8'
    ].filter(Boolean);
    
    return cn(baseClasses, layoutClasses, this.visualClass());
  });
  
  // Event handlers
  onSectionClick(event: MouseEvent) {
    this.sectionClick.emit(event);
  }
  
  onCtaClick(event: MouseEvent) {
    this.ctaClick.emit(event);
  }
  
  onImageLoad(event: Event) {
    this.imageLoad.emit(event);
  }
}
