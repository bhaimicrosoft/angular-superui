import { Component, computed, HostBinding, Input, signal, OnChanges, SimpleChanges } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/**
 * AspectRatio component variants using Tailwind v4 aspect-ratio classes
 * Simple implementation using direct aspect-ratio utilities
 *
 * Predefined ratios:
 * - square: 1:1 aspect ratio for square content
 * - video: 16:9 aspect ratio for video content
 * - photo: 4:3 aspect ratio for traditional photos
 * - portrait: 3:4 aspect ratio for portrait content
 * - landscape: 3:2 aspect ratio for landscape photos
 * - wide: 21:9 aspect ratio for ultra-wide content
 * - stories: 9:16 aspect ratio for mobile stories
 *
 * Custom ratios can be provided using aspect-[value] syntax
 */
const aspectRatioVariants = cva(
  // Base styles
  [
    'relative overflow-hidden w-full'
  ],
  {
    variants: {
      ratio: {
        square: 'aspect-square', // 1:1
        video: 'aspect-video', // 16:9
        photo: 'aspect-[4/3]', // 4:3
        portrait: 'aspect-[3/4]', // 3:4
        landscape: 'aspect-[3/2]', // 3:2
        wide: 'aspect-[21/9]', // 21:9
        stories: 'aspect-[9/16]', // 9:16
      },
    },
    defaultVariants: {
      ratio: 'video',
    },
  }
);

// Type definitions
export type AspectRatioVariant = VariantProps<typeof aspectRatioVariants>;
export type AspectRatioPredefined = NonNullable<AspectRatioVariant['ratio']>;

export interface AspectRatioAccessibility {
  /** ARIA label for screen readers */
  ariaLabel?: string;
  /** ARIA description for additional context */
  ariaDescription?: string;
  /** ARIA labelledby reference */
  ariaLabelledBy?: string;
  /** ARIA describedby reference */
  ariaDescribedBy?: string;
  /** Role override (default: 'img' for media content) */
  role?: string;
}

export interface AspectRatioProps {
  /** Predefined aspect ratio */
  ratio?: AspectRatioPredefined;
  /** Custom aspect ratio using aspect-[value] syntax (e.g., "16/9", "1.618", "2.35") */
  customRatio?: string;
  /** Additional CSS classes */
  customClasses?: string;
  /** Accessibility configuration */
  accessibility?: AspectRatioAccessibility;
}

@Component({
  selector: 'AspectRatio',
  standalone: true,
  template: `<ng-content></ng-content>`,
})
export class AspectRatio implements OnChanges {
  /** Predefined aspect ratio */
  @Input() ratio: AspectRatioPredefined = 'video';

  /** Custom aspect ratio for specific proportions */
  @Input() customRatio?: string;

  /** Additional CSS classes */
  @Input() customClasses = '';

  /** Accessibility configuration */
  @Input() accessibility: AspectRatioAccessibility = {};

  /** Signal for current ratio state */
  protected ratioSignal = signal<AspectRatioPredefined>('video');

  /** Signal for custom ratio state */
  protected customRatioSignal = signal<string | undefined>(undefined);

  /** Computed classes for the aspect ratio container */
  protected computedClasses = computed(() => {
    const currentCustomRatio = this.customRatioSignal();
    
    // If custom ratio is provided, use aspect-[value] syntax
    if (currentCustomRatio) {
      const customAspectClass = `aspect-[${currentCustomRatio}]`;
      return cn(
        'relative overflow-hidden w-full',
        customAspectClass,
        this.customClasses
      );
    }

    // Use predefined ratio
    const currentRatio = this.ratioSignal();
    return cn(
      aspectRatioVariants({ ratio: currentRatio }),
      this.customClasses
    );
  });

  /** Update signals when inputs change */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ratio']) {
      this.ratioSignal.set(this.ratio);
    }
    if (changes['customRatio']) {
      this.customRatioSignal.set(this.customRatio);
    }
  }

  // Host Bindings - Apply attributes directly to the component element
  @HostBinding('attr.class') get hostClasses() {
    return this.computedClasses();
  }

  @HostBinding('attr.role') get hostRole() {
    return this.accessibility.role || 'img';
  }

  @HostBinding('attr.aria-label') get hostAriaLabel() {
    return this.accessibility.ariaLabel;
  }

  @HostBinding('attr.aria-description') get hostAriaDescription() {
    return this.accessibility.ariaDescription;
  }

  @HostBinding('attr.aria-labelledby') get hostAriaLabelledBy() {
    return this.accessibility.ariaLabelledBy;
  }

  @HostBinding('attr.aria-describedby') get hostAriaDescribedBy() {
    return this.accessibility.ariaDescribedBy;
  }

  @HostBinding('attr.data-ratio') get hostDataRatio() {
    return this.customRatioSignal() || this.ratioSignal();
  }

  @HostBinding('attr.data-component') get hostDataComponent() {
    return 'AspectRatio';
  }

  constructor() {
    // Initialize signals with input values
    this.ratioSignal.set(this.ratio);
    this.customRatioSignal.set(this.customRatio);
  }

  /**
   * Public method to set aspect ratio
   * @param ratio - New aspect ratio
   */
  public setRatio(ratio: AspectRatioPredefined): void {
    this.ratioSignal.set(ratio);
    this.customRatioSignal.set(undefined); // Clear custom ratio when setting predefined
  }

  /**
   * Public method to set custom aspect ratio
   * @param customRatio - New custom aspect ratio (e.g., "16/9", "1.618", "2.35")
   */
  public setCustomRatio(customRatio: string): void {
    this.customRatioSignal.set(customRatio);
  }

  /**
   * Public method to get current ratio
   * @returns Current aspect ratio
   */
  public getCurrentRatio(): string {
    return this.customRatioSignal() || this.ratioSignal();
  }

  /**
   * Public method to reset to default ratio
   */
  public resetToDefault(): void {
    this.ratioSignal.set('video');
    this.customRatioSignal.set(undefined);
  }

  /**
   * Public method to clear custom ratio and use predefined
   */
  public clearCustomRatio(): void {
    this.customRatioSignal.set(undefined);
  }
}

// Export variants for external use
export { aspectRatioVariants };
