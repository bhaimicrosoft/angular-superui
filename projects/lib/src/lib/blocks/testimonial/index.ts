import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '@lib/utils/cn';

const testimonialVariants = cva(
  'relative group transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg',
        minimal: 'p-6',
        glass: 'bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl',
        gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-border rounded-xl p-6 shadow-lg',
        outlined: 'border-2 border-border rounded-xl p-6 hover:border-primary/50',
        filled: 'bg-primary/5 border border-primary/20 rounded-xl p-6',
        quote: 'relative bg-card border-l-4 border-primary p-6 shadow-sm',
        card: 'bg-card border border-border rounded-2xl p-8 shadow-md hover:shadow-xl transform hover:-translate-y-1',
        custom: ''
      },
      size: {
        sm: 'p-4 text-sm',
        default: 'p-6',
        lg: 'p-8 text-lg',
        xl: 'p-10 text-xl',
        custom: ''
      },
      layout: {
        vertical: 'flex flex-col',
        horizontal: 'flex flex-col md:flex-row md:items-center',
        centered: 'flex flex-col items-center text-center',
        custom: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      layout: 'vertical'
    }
  }
);

export type TestimonialVariant = VariantProps<typeof testimonialVariants>;

@Component({
  selector: 'TestimonialBlock',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="testimonialClasses()" (click)="onTestimonialClick($event)">
      <!-- Header Section with Logo and Badge -->
      <div class="flex justify-between items-start mb-4">
        <!-- Company Logo (Top Left) -->
        <div class="flex-shrink-0">
          <ng-content select="[slot=logo]"></ng-content>
        </div>
        
        <!-- Badge (Top Right) -->
        <div class="flex-shrink-0">
          <ng-content select="[slot=badge]"></ng-content>
        </div>
      </div>

      <!-- Quote Mark - Decorative -->
      @if (showQuote()) {
        <ng-content select="[slot=quote-mark]">
          <div class="text-primary/20 text-6xl font-serif leading-none mb-4">
            "
          </div>
        </ng-content>
      }

      <!-- Content Container -->
      <div [class]="getLayoutClasses()">
        <!-- Main Content Area -->
        <div [class]="getContentClasses()">
          <!-- Quote/Testimonial Text -->
          <ng-content select="[slot=quote]"></ng-content>
          <ng-content select="blockquote"></ng-content>
          
          <!-- Rating Stars (if provided) -->
          <ng-content select="[slot=rating]"></ng-content>
          
          <!-- Testimonial Content -->
          <ng-content select="[slot=content]"></ng-content>
          <ng-content select="p"></ng-content>
          
          <!-- Default content -->
          <ng-content></ng-content>
        </div>

        <!-- Author Section -->
        <div [class]="getAuthorSectionClasses()">
          <!-- Author Avatar -->
          <ng-content select="[slot=avatar]"></ng-content>
          <ng-content select="[slot=image]"></ng-content>
          
          <!-- Author Info Container -->
          <div [class]="getAuthorInfoClasses()">
            <!-- Author Name -->
            <ng-content select="[slot=author]"></ng-content>
            <ng-content select="[slot=name]"></ng-content>
            
            <!-- Author Title/Position -->
            <ng-content select="[slot=title]"></ng-content>
            <ng-content select="[slot=position]"></ng-content>
            
            <!-- Company/Organization -->
            <ng-content select="[slot=company]"></ng-content>
            <ng-content select="[slot=organization]"></ng-content>
          </div>
        </div>
      </div>

      <!-- Additional Elements -->
      <ng-content select="[slot=footer]"></ng-content>
      <ng-content select="[slot=decorative]"></ng-content>
    </div>
  `,
})
export class TestimonialBlock {
  // Styling inputs
  variant = input<TestimonialVariant['variant']>('default');
  size = input<TestimonialVariant['size']>('default');
  layout = input<TestimonialVariant['layout']>('vertical');

  // Display options
  showQuote = input<boolean>(false);
  highlighted = input<boolean>(false);
  interactive = input<boolean>(false);
  
  // Custom classes for unlimited customization
  class = input<string>('');
  contentClass = input<string>('');
  authorClass = input<string>('');

  // Events
  testimonialClick = output<MouseEvent>();
  authorClick = output<MouseEvent>();

  // Computed classes
  testimonialClasses = computed(() => {
    const baseClasses = testimonialVariants({
      variant: this.variant(),
      size: this.size(),
      layout: this.layout()
    });

    const stateClasses = [
      this.highlighted() && 'ring-2 ring-primary ring-offset-2',
      this.interactive() && 'cursor-pointer hover:-translate-y-1'
    ].filter(Boolean);

    return cn(baseClasses, stateClasses, this.class());
  });

  // Layout helper methods
  getLayoutClasses() {
    const layout = this.layout();
    const layoutClasses = {
      vertical: 'space-y-4',
      horizontal: 'space-y-4 md:space-y-0 md:space-x-6',
      centered: 'space-y-4 items-center'
    } as const;

    const layoutKey = (layout || 'vertical') as keyof typeof layoutClasses;
    return layoutClasses[layoutKey] || layoutClasses.vertical;
  }

  getContentClasses() {
    const layout = this.layout();
    if (layout === 'horizontal') {
      return 'flex-1';
    }
    return '';
  }

  getAuthorSectionClasses() {
    const layout = this.layout();
    const baseClasses = 'flex items-center';
    
    if (layout === 'centered') {
      return cn(baseClasses, 'justify-center');
    }
    if (layout === 'horizontal') {
      return cn(baseClasses, 'flex-shrink-0');
    }
    return baseClasses;
  }

  getAuthorInfoClasses() {
    const layout = this.layout();
    if (layout === 'centered') {
      return 'ml-3 text-center';
    }
    return 'ml-3';
  }

  // Event handlers
  onTestimonialClick(event: MouseEvent) {
    if (this.interactive()) {
      this.testimonialClick.emit(event);
    }
  }

  onAuthorClick(event: MouseEvent) {
    this.authorClick.emit(event);
    event.stopPropagation();
  }
}
