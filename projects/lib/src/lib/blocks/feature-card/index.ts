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

const featureCardVariants = cva(
  'relative group transition-all duration-300 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1',
        minimal: 'p-6 hover:-translate-y-1',
        glass: 'bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1',
        gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-border rounded-xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1',
        outlined: 'border-2 border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-md hover:-translate-y-1',
        filled: 'bg-primary/5 border border-primary/20 rounded-xl p-6 hover:bg-primary/10 hover:-translate-y-1',
        custom: ''
      },
      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
        custom: ''
      },
      spacing: {
        compact: 'space-y-2',
        default: 'space-y-4',
        relaxed: 'space-y-6',
        custom: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      spacing: 'default'
    }
  }
);

export type FeatureCardVariant = VariantProps<typeof featureCardVariants>;

@Component({
  selector: 'FeatureCardBlock',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="cardClasses()" (click)="onCardClick($event)">
      <!-- Icon/Media Area - Configurable -->
      <ng-content select="[slot=icon]"></ng-content>
      <ng-content select="[slot=media]"></ng-content>
      <ng-content select="[slot=image]"></ng-content>

      <!-- Badge Area - Configurable -->
      <ng-content select="[slot=badge]"></ng-content>

      <!-- Content Area -->
      <div [class]="getContentSpacing()">
        <!-- Title Area - Configurable -->
        <ng-content select="[slot=title]"></ng-content>
        <ng-content select="h1, h2, h3, h4, h5, h6"></ng-content>

        <!-- Description Area - Configurable -->
        <ng-content select="[slot=description]"></ng-content>
        <ng-content select="p"></ng-content>

        <!-- Stats/Metrics - Configurable -->
        <ng-content select="[slot=stats]"></ng-content>
        <ng-content select="[slot=metrics]"></ng-content>

        <!-- Actions/CTA - Configurable -->
        <ng-content select="[slot=actions]"></ng-content>
        <ng-content select="[slot=cta]"></ng-content>
        <ng-content select="button, a"></ng-content>

        <!-- Default Content -->
        <ng-content></ng-content>
      </div>

      <!-- Footer Area - Configurable -->
      <ng-content select="[slot=footer]"></ng-content>

      <!-- Overlay/Decorative - Configurable -->
      <ng-content select="[slot=overlay]"></ng-content>
      <ng-content select="[slot=decorative]"></ng-content>
    </div>
  `,
})
export class FeatureCardBlock {
  // Styling inputs
  variant = input<FeatureCardVariant['variant']>('default');
  size = input<FeatureCardVariant['size']>('default');
  spacing = input<FeatureCardVariant['spacing']>('default');

  // State inputs
  highlighted = input<boolean>(false);
  disabled = input<boolean>(false);
  interactive = input<boolean>(true);

  // Custom classes for unlimited customization
  class = input<string>('');
  contentClass = input<string>('');

  // Events
  cardClick = output<MouseEvent>();
  cardHover = output<MouseEvent>();
  cardFocus = output<FocusEvent>();

  // Computed classes
  cardClasses = computed(() => {
    const baseClasses = featureCardVariants({
      variant: this.variant(),
      size: this.size(),
      spacing: this.spacing()
    });

    const stateClasses = [
      this.highlighted() && 'ring-2 ring-primary ring-offset-2',
      this.disabled() && 'opacity-50 cursor-not-allowed pointer-events-none',
      !this.interactive() && 'cursor-default'
    ].filter(Boolean);

    return cn(baseClasses, stateClasses, this.class());
  });

  // Helper methods
  getContentSpacing() {
    const spacing = this.spacing();
    if (spacing === 'custom') return this.contentClass();

    const spacingClasses = {
      compact: 'space-y-2',
      default: 'space-y-4',
      relaxed: 'space-y-6'
    } as const;

    const spacingKey = (spacing || 'default') as keyof typeof spacingClasses;
    return cn(spacingClasses[spacingKey] || spacingClasses.default, this.contentClass());
  }

  // Event handlers
  onCardClick(event: MouseEvent) {
    if (this.disabled() || !this.interactive()) return;
    this.cardClick.emit(event);
  }

  onCardHover(event: MouseEvent) {
    if (this.disabled()) return;
    this.cardHover.emit(event);
  }

  onCardFocus(event: FocusEvent) {
    if (this.disabled()) return;
    this.cardFocus.emit(event);
  }
}
