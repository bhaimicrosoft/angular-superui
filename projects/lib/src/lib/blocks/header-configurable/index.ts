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

const headerVariants = cva(
  'relative w-full z-50 transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border',
        transparent: 'bg-transparent',
        solid: 'bg-background border-b border-border',
        floating: 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border rounded-lg mx-4 mt-4 shadow-lg',
        gradient: 'bg-gradient-to-r from-primary/10 via-background to-secondary/10 border-b border-border',
        glass: 'bg-white/10 backdrop-blur-md border-b border-white/20',
        custom: ''
      },
      size: {
        sm: 'h-14',
        default: 'h-16',
        lg: 'h-20',
        xl: 'h-24',
        auto: 'min-h-16',
        custom: ''
      },
      position: {
        static: 'relative',
        sticky: 'sticky top-0',
        fixed: 'fixed top-0 left-0 right-0',
        custom: ''
      },
      shadow: {
        none: '',
        sm: 'shadow-sm',
        default: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
        custom: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      position: 'sticky',
      shadow: 'sm'
    }
  }
);

export type HeaderConfigurableVariant = VariantProps<typeof headerVariants>;

@Component({
  selector: 'HeaderBlock',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header [class]="headerClasses()">
      <!-- Background/Decorative Layer - Configurable -->
      <ng-content select="[slot=background]"></ng-content>
      <ng-content select="[slot=decorative]"></ng-content>
      
      <!-- Container -->
      <div [class]="containerClasses()">
        <!-- Left Section -->
        <div [class]="leftSectionClasses()">
          <!-- Logo/Brand - Configurable -->
          <ng-content select="[slot=logo]"></ng-content>
          <ng-content select="[slot=brand]"></ng-content>
          
          <!-- Mobile Menu Button - Configurable -->
          <ng-content select="[slot=mobile-menu-button]"></ng-content>
        </div>
        
        <!-- Center Section - Configurable -->
        <div [class]="centerSectionClasses()">
          <!-- Navigation - Configurable -->
          <ng-content select="[slot=navigation]"></ng-content>
          <ng-content select="[slot=nav]"></ng-content>
          <ng-content select="nav"></ng-content>
          
          <!-- Search - Configurable -->
          <ng-content select="[slot=search]"></ng-content>
        </div>
        
        <!-- Right Section -->
        <div [class]="rightSectionClasses()">
          <!-- Theme Toggle - Configurable -->
          <ng-content select="[slot=theme-toggle]"></ng-content>
          
          <!-- Language Selector - Configurable -->
          <ng-content select="[slot=language]"></ng-content>
          
          <!-- User Menu/Auth - Configurable -->
          <ng-content select="[slot=user-menu]"></ng-content>
          <ng-content select="[slot=auth]"></ng-content>
          <ng-content select="[slot=profile]"></ng-content>
          
          <!-- CTA/Actions - Configurable -->
          <ng-content select="[slot=actions]"></ng-content>
          <ng-content select="[slot=cta]"></ng-content>
          <ng-content select="button, a"></ng-content>
        </div>
        
        <!-- Default Content -->
        <ng-content></ng-content>
      </div>
      
      <!-- Mobile Menu - Configurable -->
      <ng-content select="[slot=mobile-menu]"></ng-content>
      
      <!-- Progress Bar - Configurable -->
      <ng-content select="[slot=progress]"></ng-content>
      
      <!-- Announcement Bar - Configurable -->
      <ng-content select="[slot=announcement]"></ng-content>
    </header>
  `,
})
export class HeaderBlock {
  // Styling inputs
  variant = input<HeaderConfigurableVariant['variant']>('default');
  size = input<HeaderConfigurableVariant['size']>('default');
  position = input<HeaderConfigurableVariant['position']>('sticky');
  shadow = input<HeaderConfigurableVariant['shadow']>('sm');
  
  // Container inputs
  containerType = input<'none' | 'default' | 'wide' | 'full' | 'custom'>('default');
  
  // Layout options
  centered = input<boolean>(false);
  logoOnly = input<boolean>(false);
  mobileMenuOpen = input<boolean>(false);
  
  // Behavior
  hideOnScroll = input<boolean>(false);
  blurOnScroll = input<boolean>(true);
  
  // Custom classes for unlimited customization
  class = input<string>('');
  containerClass = input<string>('');
  leftClass = input<string>('');
  centerClass = input<string>('');
  rightClass = input<string>('');
  
  // Events
  logoClick = output<MouseEvent>();
  menuToggle = output<boolean>();
  searchSubmit = output<string>();
  userMenuClick = output<MouseEvent>();
  
  // Computed classes
  headerClasses = computed(() => {
    const baseClasses = headerVariants({
      variant: this.variant(),
      size: this.size(),
      position: this.position(),
      shadow: this.shadow()
    });
    
    const stateClasses = [
      this.mobileMenuOpen() && 'mobile-menu-open',
      this.hideOnScroll() && 'header-hide-on-scroll',
      this.blurOnScroll() && 'header-blur-on-scroll'
    ].filter(Boolean);
    
    return cn(baseClasses, stateClasses, this.class());
  });
  
  containerClasses = computed(() => {
    const containerType = this.containerType();
    if (containerType === 'none') return cn('flex items-center justify-between h-full', this.containerClass());
    if (containerType === 'custom') return cn(this.containerClass());
    
    const containerVariants = {
      default: 'container mx-auto px-4 sm:px-6 lg:px-8',
      wide: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
      full: 'w-full px-4 sm:px-6 lg:px-8'
    } as const;
    
    const containerKey = containerType as keyof typeof containerVariants;
    const baseContainer = containerVariants[containerKey] || containerVariants.default;
    
    return cn(baseContainer, 'flex items-center justify-between h-full', this.containerClass());
  });
  
  leftSectionClasses = computed(() => {
    const baseClasses = 'flex items-center gap-4';
    const layoutClasses = [
      this.logoOnly() && 'flex-1',
      this.centered() && 'lg:flex-1'
    ].filter(Boolean);
    
    return cn(baseClasses, layoutClasses, this.leftClass());
  });
  
  centerSectionClasses = computed(() => {
    const baseClasses = 'hidden lg:flex items-center gap-6';
    const layoutClasses = [
      this.centered() && 'flex-1 justify-center',
      !this.centered() && 'flex-1 justify-start ml-8'
    ].filter(Boolean);
    
    return cn(baseClasses, layoutClasses, this.centerClass());
  });
  
  rightSectionClasses = computed(() => {
    const baseClasses = 'flex items-center gap-4';
    const layoutClasses = [
      this.centered() && 'lg:flex-1 lg:justify-end'
    ].filter(Boolean);
    
    return cn(baseClasses, layoutClasses, this.rightClass());
  });
  
  // Event handlers
  onLogoClick(event: MouseEvent) {
    this.logoClick.emit(event);
  }
  
  onMenuToggle() {
    const newState = !this.mobileMenuOpen();
    this.menuToggle.emit(newState);
  }
  
  onSearchSubmit(query: string) {
    this.searchSubmit.emit(query);
  }
  
  onUserMenuClick(event: MouseEvent) {
    this.userMenuClick.emit(event);
  }
}

// Header Navigation Component
@Component({
  selector: 'HeaderNav',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav [class]="navClasses()">
      <!-- Primary Navigation - Configurable -->
      <ng-content select="[slot=primary]"></ng-content>
      
      <!-- Secondary Navigation - Configurable -->
      <ng-content select="[slot=secondary]"></ng-content>
      
      <!-- Dropdown Menus - Configurable -->
      <ng-content select="[slot=dropdown]"></ng-content>
      <ng-content select="[slot=mega-menu]"></ng-content>
      
      <!-- Default Content -->
      <ng-content></ng-content>
    </nav>
  `
})
export class HeaderNav {
  // Styling inputs
  variant = input<'horizontal' | 'vertical' | 'dropdown' | 'custom'>('horizontal');
  spacing = input<'tight' | 'default' | 'relaxed' | 'custom'>('default');
  
  // Layout options
  centered = input<boolean>(false);
  
  // Custom classes
  class = input<string>('');
  
  // Computed classes
  navClasses = computed(() => {
    const variant = this.variant();
    const spacing = this.spacing();
    
    const variantClasses = {
      horizontal: 'flex items-center',
      vertical: 'flex flex-col',
      dropdown: 'relative',
      custom: ''
    } as const;
    
    const spacingClasses = {
      tight: 'gap-2',
      default: 'gap-4',
      relaxed: 'gap-6',
      custom: ''
    } as const;
    
    const variantKey = variant as keyof typeof variantClasses;
    const spacingKey = (spacing || 'default') as keyof typeof spacingClasses;
    
    const baseClasses = variantClasses[variantKey] || variantClasses.horizontal;
    const gapClasses = spacingClasses[spacingKey] || spacingClasses.default;
    
    const layoutClasses = [
      this.centered() && 'justify-center'
    ].filter(Boolean);
    
    return cn(baseClasses, gapClasses, layoutClasses, this.class());
  });
}
