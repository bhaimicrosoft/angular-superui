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

const featureGridVariants = cva(
  'py-20',
  {
    variants: {
      variant: {
        default: 'bg-background',
        gradient: 'bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800',
        dark: 'bg-slate-900 text-white',
        minimal: 'bg-transparent',
        glass: 'bg-white/10 backdrop-blur-sm',
        custom: '' // For completely custom styling
      },
      spacing: {
        none: '',
        sm: 'px-4',
        default: 'px-4 sm:px-6 lg:px-8',
        lg: 'px-6 sm:px-8 lg:px-12',
        custom: ''
      },
      size: {
        xs: 'py-8',
        sm: 'py-12',
        default: 'py-20',
        lg: 'py-24',
        xl: 'py-32',
        auto: 'py-0'
      }
    },
    defaultVariants: {
      variant: 'default',
      spacing: 'default',
      size: 'default'
    }
  }
);

const containerVariants = cva(
  'mx-auto',
  {
    variants: {
      maxWidth: {
        sm: 'max-w-4xl',
        md: 'max-w-5xl',
        lg: 'max-w-6xl',
        xl: 'max-w-7xl',
        full: 'max-w-full',
        none: '',
        custom: ''
      },
      container: {
        true: 'container',
        false: '',
        custom: ''
      }
    },
    defaultVariants: {
      maxWidth: 'xl',
      container: true
    }
  }
);

const gridVariants = cva(
  'grid gap-6',
  {
    variants: {
      columns: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
        6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
        auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        custom: ''
      },
      gap: {
        none: 'gap-0',
        sm: 'gap-4',
        default: 'gap-6',
        lg: 'gap-8',
        xl: 'gap-12',
        custom: ''
      }
    },
    defaultVariants: {
      columns: 3,
      gap: 'default'
    }
  }
);

export type FeatureGridVariant = VariantProps<typeof featureGridVariants>;
export type FeatureGridContainerVariant = VariantProps<typeof containerVariants>;
export type FeatureGridGridVariant = VariantProps<typeof gridVariants>;

@Component({
  selector: 'FeatureGrid',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [class]="sectionClasses()" (click)="onSectionClick($event)">
      <!-- Background Layer - Fully Configurable -->
      <ng-content select="[slot=background]"></ng-content>
      
      <div [class]="containerClasses()">
        <!-- Header Section - Configurable -->
        <ng-content select="[slot=header]"></ng-content>
        
        <!-- Auto Header (when using headerConfig input) -->
        @if (showAutoHeader()) {
          <div [class]="getHeaderAlignment()">
            <ng-content select="[slot=badge]"></ng-content>
            <ng-content select="[slot=title]"></ng-content>
            <ng-content select="h1, h2, h3"></ng-content>
            <ng-content select="[slot=subtitle]"></ng-content>
            <ng-content select="[slot=description]"></ng-content>
            <ng-content select="p"></ng-content>
          </div>
        }
        
        <!-- Features Grid Container -->
        <div [class]="gridClasses()">
          <!-- Feature Items - Fully Configurable -->
          <ng-content select="[slot=feature]"></ng-content>
          <ng-content select="[slot=item]"></ng-content>
          <ng-content select="feature-card"></ng-content>
          
          <!-- Default Content -->
          <ng-content></ng-content>
        </div>
        
        <!-- Footer Section - Configurable -->
        <ng-content select="[slot=footer]"></ng-content>
        <ng-content select="[slot=cta]"></ng-content>
        <ng-content select="[slot=actions]"></ng-content>
      </div>
      
      <!-- Decorative Elements - Configurable -->
      <ng-content select="[slot=decorative]"></ng-content>
      <ng-content select="[slot=overlay]"></ng-content>
    </section>
  `,
})
export class FeatureGrid {
  // Styling inputs
  variant = input<FeatureGridVariant['variant']>('default');
  spacing = input<FeatureGridVariant['spacing']>('default');
  size = input<FeatureGridVariant['size']>('default');
  
  // Container inputs
  maxWidth = input<FeatureGridContainerVariant['maxWidth']>('xl');
  container = input<FeatureGridContainerVariant['container']>(true);
  
  // Grid inputs
  columns = input<FeatureGridGridVariant['columns']>(3);
  gap = input<FeatureGridGridVariant['gap']>('default');
  
  // Header configuration
  headerAlignment = input<'left' | 'center' | 'right' | 'custom'>('center');
  showHeader = input<boolean>(true);
  
  // Custom classes for unlimited customization
  class = input<string>('');
  containerClass = input<string>('');
  gridClass = input<string>('');
  headerClass = input<string>('');
  
  // Events
  sectionClick = output<MouseEvent>();
  featureClick = output<{index: number; event: MouseEvent}>();
  
  // Computed classes
  sectionClasses = computed(() => cn(
    featureGridVariants({
      variant: this.variant(),
      spacing: this.spacing(),
      size: this.size()
    }),
    this.class()
  ));
  
  containerClasses = computed(() => cn(
    containerVariants({
      maxWidth: this.maxWidth(),
      container: this.container()
    }),
    this.containerClass()
  ));
  
  gridClasses = computed(() => cn(
    gridVariants({
      columns: this.columns(),
      gap: this.gap()
    }),
    this.gridClass()
  ));
  
  // Helper methods
  showAutoHeader() {
    return this.showHeader();
  }
  
  getHeaderAlignment() {
    const alignment = this.headerAlignment();
    const baseClasses = 'mb-16 space-y-4';
    
    if (alignment === 'custom') return cn(baseClasses, this.headerClass());
    
    const alignmentClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right'
    };
    
    return cn(baseClasses, alignmentClasses[alignment], this.headerClass());
  }
  
  // Event handlers
  onSectionClick(event: MouseEvent) {
    this.sectionClick.emit(event);
  }
}
