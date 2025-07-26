import {
  Component,
  computed,
  input,
  signal,
  effect,
  ChangeDetectionStrategy,
  Injectable,
  inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/**
 * Skeleton configuration interface for enhanced customization
 */
export interface SkeletonConfig {
  animation?: 'pulse' | 'none';
  duration?: number;
  delay?: number;
  count?: number;
  spacing?: number;
  customClasses?: {
    container?: string;
    item?: string;
  };
}

/**
 * Skeleton component variants using Class Variance Authority with Tailwind CSS
 */
const skeletonVariants = cva(
  [
    'block bg-gray-200 dark:bg-gray-700 rounded-md',
    'relative overflow-hidden',
    'select-none pointer-events-none',
    'will-change-auto'
  ],
  {
    variants: {
      variant: {
        default: 'rounded-md',
        circular: 'rounded-full',
        text: 'rounded-sm h-4',
        button: 'rounded-md h-10 px-4',
        card: 'rounded-lg aspect-video',
        image: 'rounded-md aspect-video',
        avatar: 'rounded-full aspect-square'
      },
      size: {
        xs: 'h-2',
        sm: 'h-3',
        default: 'h-4',
        lg: 'h-6',
        xl: 'h-8',
        '2xl': 'h-12',
        '3xl': 'h-16',
        '4xl': 'h-24'
      },
      width: {
        xs: 'w-16',
        sm: 'w-24',
        md: 'w-32',
        lg: 'w-48',
        xl: 'w-64',
        '2xl': 'w-80',
        '3xl': 'w-96',
        '4xl': 'w-full max-w-md',
        full: 'w-full',
        auto: 'w-auto',
        '1/4': 'w-1/4',
        '1/3': 'w-1/3',
        '1/2': 'w-1/2',
        '2/3': 'w-2/3',
        '3/4': 'w-3/4',
        '4/5': 'w-4/5',
        '5/6': 'w-5/6'
      },
      animation: {
        pulse: 'animate-pulse',
        none: ''
      },
      intensity: {
        light: 'opacity-60',
        normal: 'opacity-80',
        strong: 'opacity-100'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      width: 'full',
      animation: 'pulse',
      intensity: 'normal'
    }
  }
);

/**
 * Spacing utilities for skeleton groups
 */
const spacingVariants = cva('', {
  variants: {
    spacing: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8'
    },
    layout: {
      vertical: 'flex flex-col',
      horizontal: 'flex flex-row flex-wrap',
      grid: 'grid'
    }
  },
  defaultVariants: {
    spacing: 'md',
    layout: 'vertical'
  }
});

/**
 * Injectable service for managing skeleton loading states globally
 */
@Injectable({
  providedIn: 'root'
})
export class SkeletonService {
  private globalLoading = signal(false);
  private configs = signal<Map<string, SkeletonConfig>>(new Map());

  readonly isGlobalLoading = this.globalLoading.asReadonly();
  readonly allConfigs = this.configs.asReadonly();

  setLoading(loading: boolean) {
    this.globalLoading.set(loading);
  }

  setConfig(key: string, config: SkeletonConfig) {
    this.configs.update(configs => {
      const newConfigs = new Map(configs);
      newConfigs.set(key, config);
      return newConfigs;
    });
  }

  getConfig(key: string): SkeletonConfig | undefined {
    return this.configs().get(key);
  }

  removeConfig(key: string) {
    this.configs.update(configs => {
      const newConfigs = new Map(configs);
      newConfigs.delete(key);
      return newConfigs;
    });
  }

  clearConfigs() {
    this.configs.set(new Map());
  }
}

/**
 * Base Skeleton Item Component
 * Provides the core skeleton functionality with full customization
 */
@Component({
  selector: 'SkeletonItem',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="skeletonClasses()"
      [style.animation-delay]="animationDelay()"
      [attr.aria-hidden]="true"
      [attr.aria-label]="ariaLabel() || 'Loading content'"
      [attr.role]="'status'"
      [attr.aria-live]="'polite'"
      [attr.data-animation]="animation()"
      [attr.data-visible]="isVisible()"
      [attr.data-classes]="skeletonClasses()"
      #skeletonElement>

      <!-- Content slot for when loading is complete -->
      @if (!isVisible()) {
        <ng-content></ng-content>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonItem implements AfterViewInit {
  @ViewChild('skeletonElement') skeletonElement?: ElementRef<HTMLDivElement>;

  // Inject service if available
  readonly skeletonService = inject(SkeletonService, { optional: true });

  // Input signals for configuration
  readonly variant = input<VariantProps<typeof skeletonVariants>['variant']>('default');
  readonly size = input<VariantProps<typeof skeletonVariants>['size']>('default');
  readonly width = input<VariantProps<typeof skeletonVariants>['width']>('full');
  readonly animation = input<VariantProps<typeof skeletonVariants>['animation']>('pulse');
  readonly intensity = input<VariantProps<typeof skeletonVariants>['intensity']>('normal');
  readonly isVisible = input<boolean>(true);
  readonly delay = input<number>(0);
  readonly customClass = input<string>('');
  readonly ariaLabel = input<string>('');

  // Computed classes
  readonly skeletonClasses = computed(() => {
    const baseClasses = skeletonVariants({
      variant: this.variant(),
      size: this.size(),
      width: this.width(),
      animation: this.animation(),
      intensity: this.intensity()
    });

    const finalClasses = cn(baseClasses, this.customClass());
    
    // Debug animation classes
    console.log('🎨 Skeleton Animation Debug:', {
      variant: this.variant(),
      animation: this.animation(),
      isVisible: this.isVisible(),
      baseClasses,
      customClass: this.customClass(),
      finalClasses,
      delay: this.delay()
    });

    return finalClasses;
  });

  // Computed animation delay
  readonly animationDelay = computed(() => {
    const delay = this.delay();
    return delay > 0 ? `${delay}ms` : '0ms';
  });

  constructor() {
    // Debug component creation
    console.log('🚀 SkeletonItem created with initial values:', {
      variant: this.variant(),
      animation: this.animation(),
      isVisible: this.isVisible(),
      delay: this.delay()
    });

    // Sync with global service if available
    effect(() => {
      if (this.skeletonService && this.isVisible()) {
        this.skeletonService.setLoading(true);
      }
    });

    // Debug effect to track animation changes
    effect(() => {
      console.log('🔄 Animation effect triggered:', {
        animation: this.animation(),
        isVisible: this.isVisible(),
        classes: this.skeletonClasses()
      });
    });
  }

  ngAfterViewInit() {
    // Debug computed styles after view init
    if (this.skeletonElement?.nativeElement) {
      const element = this.skeletonElement.nativeElement;
      console.log('🎯 After View Init - Element Debug:', {
        element,
        classList: Array.from(element.classList),
        computedStyles: {
          animation: getComputedStyle(element).animation,
          animationName: getComputedStyle(element).animationName,
          animationDuration: getComputedStyle(element).animationDuration,
          animationTimingFunction: getComputedStyle(element).animationTimingFunction,
          animationIterationCount: getComputedStyle(element).animationIterationCount
        },
        attributes: {
          'data-animation': element.getAttribute('data-animation'),
          'data-visible': element.getAttribute('data-visible'),
          'data-classes': element.getAttribute('data-classes')
        }
      });

      // Check if animate-pulse is working
      setTimeout(() => {
        console.log('⏰ Delayed check - Animation still applied:', {
          classList: Array.from(element.classList),
          hasAnimatePulse: element.classList.contains('animate-pulse'),
          animation: getComputedStyle(element).animation
        });
      }, 1000);
    }
  }
}

/**
 * Skeleton Group Component
 * For rendering multiple skeleton items with consistent spacing and layout
 */
@Component({
  selector: 'SkeletonGroup',
  standalone: true,
  imports: [CommonModule, SkeletonItem],
  template: `
    <div
      [class]="containerClasses()"
      [attr.aria-label]="'Loading ' + (count() > 1 ? count() + ' items' : 'content')"
      role="status"
      aria-live="polite">

      @for (item of skeletonItems(); track $index) {
        <SkeletonItem
          [variant]="variant()"
          [size]="size()"
          [width]="width()"
          [animation]="animation()"
          [intensity]="intensity()"
          [isVisible]="isVisible()"
          [delay]="$index * staggerDelay()"
          [customClass]="getItemClass($index)"
          [ariaLabel]="'Loading item ' + ($index + 1) + ' of ' + count()"
        />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonGroup {
  // Input signals
  readonly count = input<number>(3);
  readonly variant = input<VariantProps<typeof skeletonVariants>['variant']>('default');
  readonly size = input<VariantProps<typeof skeletonVariants>['size']>('default');
  readonly width = input<VariantProps<typeof skeletonVariants>['width']>('full');
  readonly animation = input<VariantProps<typeof skeletonVariants>['animation']>('pulse');
  readonly intensity = input<VariantProps<typeof skeletonVariants>['intensity']>('normal');
  readonly isVisible = input<boolean>(true);
  readonly spacing = input<VariantProps<typeof spacingVariants>['spacing']>('md');
  readonly layout = input<VariantProps<typeof spacingVariants>['layout']>('vertical');
  readonly staggerDelay = input<number>(100);
  readonly customClass = input<string>('');
  readonly itemClasses = input<string[]>([]);

  // Computed properties
  readonly skeletonItems = computed(() => {
    return Array(this.count()).fill(0).map((_, index) => ({ index }));
  });

  readonly containerClasses = computed(() => {
    const baseClasses = spacingVariants({
      spacing: this.spacing(),
      layout: this.layout()
    });

    return cn(baseClasses, this.customClass());
  });

  getItemClass(index: number): string {
    const itemClasses = this.itemClasses();
    return itemClasses[index] || '';
  }
}

/**
 * Skeleton Text Component
 * Specialized for text content with varying line lengths
 */
@Component({
  selector: 'SkeletonText',
  standalone: true,
  imports: [CommonModule, SkeletonItem],
  template: `
    <div
      class="flex flex-col gap-2"
      [attr.aria-label]="'Loading ' + (lines() > 1 ? lines() + ' lines of text' : 'text content')"
      role="status"
      aria-live="polite">

      @for (line of textLines(); track $index) {
        <SkeletonItem
          variant="text"
          [size]="size()"
          [width]="getLineWidth($index)"
          [animation]="animation()"
          [intensity]="intensity()"
          [isVisible]="isVisible()"
          [delay]="$index * 50"
          [ariaLabel]="'Loading line ' + ($index + 1) + ' of ' + lines()"
        />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonText {
  // Input signals
  readonly lines = input<number>(1);
  readonly size = input<VariantProps<typeof skeletonVariants>['size']>('default');
  readonly width = input<VariantProps<typeof skeletonVariants>['width']>('full');
  readonly animation = input<VariantProps<typeof skeletonVariants>['animation']>('pulse');
  readonly intensity = input<VariantProps<typeof skeletonVariants>['intensity']>('normal');
  readonly isVisible = input<boolean>(true);
  readonly lineWidths = input<string[]>([]);

  // Computed properties
  readonly textLines = computed(() => {
    return Array(this.lines()).fill(0).map((_, index) => ({ index }));
  });

  getLineWidth(index: number): VariantProps<typeof skeletonVariants>['width'] {
    const widths = this.lineWidths();
    if (widths[index]) {
      return widths[index] as VariantProps<typeof skeletonVariants>['width'];
    }

    // Default progressive width reduction for natural text flow
    const lines = this.lines();
    if (lines === 1) return this.width();
    if (index === lines - 1) return '3/4'; // Last line shorter
    if (index === lines - 2) return '5/6'; // Second to last line
    return 'full';
  }
}

/**
 * Skeleton Avatar Component
 * Specialized for profile pictures and circular content
 */
@Component({
  selector: 'SkeletonAvatar',
  standalone: true,
  imports: [CommonModule, SkeletonItem],
  template: `
    <SkeletonItem
      variant="avatar"
      [size]="size()"
      [animation]="animation()"
      [intensity]="intensity()"
      [isVisible]="isVisible()"
      [delay]="delay()"
      [customClass]="avatarClasses()"
      [ariaLabel]="ariaLabel() || 'Loading profile picture'">
      <ng-content></ng-content>
    </SkeletonItem>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonAvatar {
  // Input signals
  readonly size = input<VariantProps<typeof skeletonVariants>['size']>('default');
  readonly animation = input<VariantProps<typeof skeletonVariants>['animation']>('pulse');
  readonly intensity = input<VariantProps<typeof skeletonVariants>['intensity']>('normal');
  readonly isVisible = input<boolean>(true);
  readonly delay = input<number>(0);
  readonly customClass = input<string>('');
  readonly ariaLabel = input<string>('');

  // Computed classes for avatar-specific styling
  readonly avatarClasses = computed(() => {
    const size = this.size();
    const sizeClasses = {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      default: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
      '2xl': 'w-20 h-20',
      '3xl': 'w-24 h-24',
      '4xl': 'w-32 h-32'
    };

    return cn(sizeClasses[size || 'default'], this.customClass());
  });
}

/**
 * Main Skeleton Component
 * Provides a unified interface for all skeleton types
 */
@Component({
  selector: 'SkeletonComponent',
  standalone: true,
  imports: [CommonModule, SkeletonItem, SkeletonGroup, SkeletonText, SkeletonAvatar],
  template: `
    @switch (type()) {
      @case ('single') {
        <SkeletonItem
          [variant]="variant()"
          [size]="size()"
          [width]="width()"
          [animation]="animation()"
          [intensity]="intensity()"
          [isVisible]="isLoading()"
          [delay]="delay()"
          [customClass]="customClass()"
          [ariaLabel]="ariaLabel()">
          <ng-content></ng-content>
        </SkeletonItem>
      }
      @case ('group') {
        <SkeletonGroup
          [count]="count()"
          [variant]="variant()"
          [size]="size()"
          [width]="width()"
          [animation]="animation()"
          [intensity]="intensity()"
          [isVisible]="isLoading()"
          [spacing]="spacing()"
          [layout]="layout()"
          [staggerDelay]="staggerDelay()"
          [customClass]="customClass()"
          [itemClasses]="itemClasses()">
        </SkeletonGroup>
      }
      @case ('text') {
        <SkeletonText
          [lines]="lines()"
          [size]="size()"
          [width]="width()"
          [animation]="animation()"
          [intensity]="intensity()"
          [isVisible]="isLoading()"
          [lineWidths]="lineWidths()">
        </SkeletonText>
      }
      @case ('avatar') {
        <SkeletonAvatar
          [size]="size()"
          [animation]="animation()"
          [intensity]="intensity()"
          [isVisible]="isLoading()"
          [delay]="delay()"
          [customClass]="customClass()"
          [ariaLabel]="ariaLabel()">
          <ng-content></ng-content>
        </SkeletonAvatar>
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonComponent implements AfterViewInit, OnDestroy {
  @ViewChild('skeletonElement') skeletonElement?: ElementRef<HTMLDivElement>;

  // Inject service
  readonly skeletonService = inject(SkeletonService);

  // Input signals
  readonly type = input<'single' | 'group' | 'text' | 'avatar'>('single');
  readonly variant = input<VariantProps<typeof skeletonVariants>['variant']>('default');
  readonly size = input<VariantProps<typeof skeletonVariants>['size']>('default');
  readonly width = input<VariantProps<typeof skeletonVariants>['width']>('full');
  readonly animation = input<VariantProps<typeof skeletonVariants>['animation']>('pulse');
  readonly intensity = input<VariantProps<typeof skeletonVariants>['intensity']>('normal');
  readonly isLoading = input<boolean>(true);
  readonly delay = input<number>(0);
  readonly customClass = input<string>('');
  readonly ariaLabel = input<string>('');

  // Group-specific inputs
  readonly count = input<number>(3);
  readonly spacing = input<VariantProps<typeof spacingVariants>['spacing']>('md');
  readonly layout = input<VariantProps<typeof spacingVariants>['layout']>('vertical');
  readonly staggerDelay = input<number>(100);
  readonly itemClasses = input<string[]>([]);

  // Text-specific inputs
  readonly lines = input<number>(1);
  readonly lineWidths = input<string[]>([]);

  private resizeObserver?: ResizeObserver;

  constructor() {
    // Sync with service
    effect(() => {
      if (this.isLoading()) {
        this.skeletonService.setLoading(true);
      }
    });
  }

  ngAfterViewInit() {
    // Setup responsive behavior
    if (this.skeletonElement?.nativeElement) {
      this.setupResponsiveBehavior();
    }
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  private setupResponsiveBehavior() {
    if (!this.skeletonElement?.nativeElement) return;

    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width } = entry.contentRect;

        // Add responsive classes based on container width
        const element = entry.target as HTMLElement;
        element.classList.remove('skeleton-sm', 'skeleton-md', 'skeleton-lg');

        if (width < 400) {
          element.classList.add('skeleton-sm');
        } else if (width < 768) {
          element.classList.add('skeleton-md');
        } else {
          element.classList.add('skeleton-lg');
        }
      }
    });

    this.resizeObserver.observe(this.skeletonElement.nativeElement);
  }
}

// Export all components and types
export {
  type VariantProps
};
