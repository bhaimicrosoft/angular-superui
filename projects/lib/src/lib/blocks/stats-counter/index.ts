import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  effect,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@lib/utils/cn';

// Stats Counter Container Variants
const statsCounterVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: 'space-y-8',
        minimal: 'space-y-4',
        card: 'space-y-8 p-8 bg-card border border-border rounded-xl shadow-sm',
        outlined: 'space-y-8 p-8 border-2 border-border rounded-xl',
        filled: 'space-y-8 p-8 bg-muted/50 rounded-xl',
        gradient: 'space-y-8 p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl',
        glass: 'space-y-8 p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl',
        hero: 'space-y-12 p-12 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-2xl',
        custom: ''
      },
      size: {
        sm: 'max-w-4xl',
        default: 'max-w-6xl',
        lg: 'max-w-7xl',
        xl: 'max-w-full',
        full: 'w-full',
        custom: ''
      },
      spacing: {
        none: 'space-y-0',
        sm: 'space-y-4',
        default: 'space-y-8',
        lg: 'space-y-12',
        xl: 'space-y-16',
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

// Individual Stat Item Variants
const statItemVariants = cva(
  'group relative text-center transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'p-6 bg-card border border-border rounded-lg shadow-sm hover:shadow-md',
        minimal: 'p-4 bg-transparent',
        card: 'p-8 bg-card border border-border rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1',
        outlined: 'p-6 border-2 border-border rounded-lg hover:border-primary/50',
        filled: 'p-6 bg-primary/5 border border-primary/20 rounded-lg',
        glass: 'p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl',
        gradient: 'p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-border rounded-lg shadow-lg',
        icon: 'p-8 text-center relative',
        custom: ''
      },
      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
        custom: ''
      },
      layout: {
        vertical: 'space-y-3',
        horizontal: 'flex items-center space-x-4 text-left',
        overlay: 'relative',
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

// Header Section Variants
const statsHeaderVariants = cva(
  'text-center mb-12',
  {
    variants: {
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
      },
      spacing: {
        none: 'mb-0',
        sm: 'mb-6',
        default: 'mb-12',
        lg: 'mb-16',
        xl: 'mb-20'
      }
    },
    defaultVariants: {
      alignment: 'center',
      spacing: 'default'
    }
  }
);

export type StatsCounterVariant = VariantProps<typeof statsCounterVariants>;
export type StatItemVariant = VariantProps<typeof statItemVariants>;
export type StatsHeaderVariant = VariantProps<typeof statsHeaderVariants>;

export interface StatItem {
  id?: string | number;
  value: number;
  label: string;
  description?: string;
  icon?: string;
  prefix?: string;
  suffix?: string;
  color?: string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: number;
    period?: string;
  };
  formatter?: (value: number) => string;
  animationDelay?: number;
  customFields?: {
    [key: string]: any;
  };
}

@Component({
  selector: 'StatsCounter',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [class]="containerClasses()" #statsContainer>
      <!-- Header Section -->
      @if (showHeader()) {
        <div [class]="headerClasses()">
          <!-- Badge -->
          @if (badge()) {
            <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4" 
                 [class]="badgeClasses()">
              {{ badge() }}
            </div>
          }
          
          <!-- Title -->
          @if (title()) {
            <h2 [class]="titleClasses()">{{ title() }}</h2>
          }
          
          <!-- Description -->
          @if (description()) {
            <p [class]="descriptionClasses()">{{ description() }}</p>
          }
          
          <!-- Custom Header Content -->
          <ng-content select="[slot=header]"></ng-content>
        </div>
      }

      <!-- Stats Grid -->
      <div [class]="gridClasses()">
        @for (stat of stats(); track stat.id || $index) {
          <div [class]="statItemClasses()" 
               (click)="onStatClick(stat, $index)"
               [attr.data-stat-id]="stat.id">
            
            <!-- Icon Section -->
            @if (stat.icon && showIcons()) {
              <div class="flex justify-center mb-4">
                <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <div [innerHTML]="stat.icon" class="w-6 h-6 text-primary"></div>
                </div>
              </div>
            }

            <!-- Value Section -->
            <div class="space-y-2">
              <div class="flex items-center justify-center space-x-1">
                @if (stat.prefix) {
                  <span [class]="prefixClasses()">{{ stat.prefix }}</span>
                }
                
                <span [class]="valueClasses()" 
                      [style.color]="stat.color || null">
                  {{ getFormattedValue(stat, $index) }}
                </span>
                
                @if (stat.suffix) {
                  <span [class]="suffixClasses()">{{ stat.suffix }}</span>
                }
              </div>

              <!-- Trend Indicator -->
              @if (stat.trend && showTrends()) {
                <div class="flex items-center justify-center space-x-1 text-sm">
                  @switch (stat.trend.direction) {
                    @case ('up') {
                      <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 4.414 4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                      </svg>
                      <span class="text-green-600 dark:text-green-400">
                        +{{ stat.trend.value }}%
                      </span>
                    }
                    @case ('down') {
                      <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L10 15.586l5.293-5.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                      <span class="text-red-600 dark:text-red-400">
                        -{{ stat.trend.value }}%
                      </span>
                    }
                    @case ('neutral') {
                      <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                      </svg>
                      <span class="text-gray-600 dark:text-gray-400">
                        {{ stat.trend.value }}%
                      </span>
                    }
                  }
                  @if (stat.trend.period) {
                    <span class="text-muted-foreground">{{ stat.trend.period }}</span>
                  }
                </div>
              }
            </div>

            <!-- Label Section -->
            <div class="space-y-1">
              <h3 [class]="labelClasses()">{{ stat.label }}</h3>
              
              @if (stat.description && showDescriptions()) {
                <p [class]="statDescriptionClasses()">{{ stat.description }}</p>
              }
            </div>

            <!-- Custom Fields -->
            @if (stat.customFields && showCustomFields() && hasCustomFields(stat.customFields)) {
              <div class="mt-3 space-y-1 text-xs text-muted-foreground">
                @for (field of getCustomFieldsArray(stat.customFields); track field.key) {
                  <div>
                    <span class="font-medium">{{ field.label }}:</span>
                    <span class="ml-1">{{ field.value }}</span>
                  </div>
                }
              </div>
            }

            <!-- Hover Overlay Effect -->
            @if (hoverEffect()) {
              <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            }
          </div>
        }
      </div>

      <!-- Footer Section -->
      @if (showFooter()) {
        <div [class]="footerClasses()">
          <ng-content select="[slot=footer]"></ng-content>
          
          <!-- Additional Stats Summary -->
          @if (showSummary()) {
            <div class="mt-8 p-6 bg-muted/30 rounded-xl border border-border">
              <div class="text-center">
                <h3 class="text-lg font-semibold mb-2">Summary</h3>
                <p class="text-muted-foreground">
                  {{ summaryText() || 'Performance metrics updated in real-time' }}
                </p>
              </div>
            </div>
          }
        </div>
      }
    </section>
  `
})
export class StatsCounter implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('statsContainer', { static: true }) statsContainer!: ElementRef;

  // Core Content
  stats = input<StatItem[]>([]);
  title = input<string>('');
  description = input<string>('');
  badge = input<string>('');
  summaryText = input<string>('');

  // Grid Configuration
  columns = input<number>(4);
  gap = input<'sm' | 'default' | 'lg'>('default');
  
  // Display Options
  showHeader = input<boolean>(true);
  showFooter = input<boolean>(false);
  showIcons = input<boolean>(true);
  showDescriptions = input<boolean>(true);
  showTrends = input<boolean>(true);
  showCustomFields = input<boolean>(false);
  showSummary = input<boolean>(false);
  
  // Animation Options
  enableAnimation = input<boolean>(true);
  animationDuration = input<number>(2000);
  animationDelay = input<number>(100);
  triggerOnScroll = input<boolean>(true);
  
  // Interaction Options
  hoverEffect = input<boolean>(true);
  clickable = input<boolean>(true);
  
  // Variants
  variant = input<StatsCounterVariant['variant']>('default');
  size = input<StatsCounterVariant['size']>('default');
  spacing = input<StatsCounterVariant['spacing']>('default');
  
  // Stat Item Variants
  statVariant = input<StatItemVariant['variant']>('default');
  statSize = input<StatItemVariant['size']>('default');
  statLayout = input<StatItemVariant['layout']>('vertical');
  
  // Header Variants
  headerAlignment = input<StatsHeaderVariant['alignment']>('center');
  headerSpacing = input<StatsHeaderVariant['spacing']>('default');

  // Custom Classes
  class = input<string>('');
  headerClass = input<string>('');
  titleClass = input<string>('');
  descriptionClass = input<string>('');
  badgeClass = input<string>('');
  gridClass = input<string>('');
  statClass = input<string>('');
  footerClass = input<string>('');

  // Events
  statClick = output<{stat: StatItem, index: number}>();
  statHover = output<{stat: StatItem, index: number}>();
  animationComplete = output<StatItem[]>();

  // Animation State
  private animatedValues = signal<number[]>([]);
  private hasAnimated = signal<boolean>(false);
  private observer?: IntersectionObserver;

  ngOnInit() {
    // Initialize animated values
    this.animatedValues.set(this.stats().map(() => 0));
  }

  ngAfterViewInit() {
    if (this.triggerOnScroll()) {
      this.setupIntersectionObserver();
    } else if (this.enableAnimation()) {
      this.startAnimation();
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated()) {
            this.startAnimation();
            this.hasAnimated.set(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    this.observer.observe(this.statsContainer.nativeElement);
  }

  private startAnimation() {
    if (!this.enableAnimation()) {
      this.animatedValues.set(this.stats().map(stat => stat.value));
      return;
    }

    this.stats().forEach((stat, index) => {
      const delay = (stat.animationDelay || this.animationDelay()) * index;
      const duration = this.animationDuration();
      
      setTimeout(() => {
        this.animateValue(index, 0, stat.value, duration);
      }, delay);
    });
  }

  private animateValue(index: number, start: number, end: number, duration: number) {
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(start + (end - start) * easeOut);
      
      // Update the specific stat value
      this.animatedValues.update(values => {
        const newValues = [...values];
        newValues[index] = currentValue;
        return newValues;
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete for this stat
        const finalValues = this.animatedValues();
        const allAnimated = finalValues.every((value, i) => value === this.stats()[i].value);
        if (allAnimated) {
          this.animationComplete.emit(this.stats());
        }
      }
    };

    requestAnimationFrame(animate);
  }

  // Computed CSS Classes
  containerClasses = computed(() => cn(
    statsCounterVariants({
      variant: this.variant(),
      size: this.size(),
      spacing: this.spacing()
    }),
    this.class()
  ));

  headerClasses = computed(() => cn(
    statsHeaderVariants({
      alignment: this.headerAlignment(),
      spacing: this.headerSpacing()
    }),
    this.headerClass()
  ));

  titleClasses = computed(() => cn(
    'text-3xl md:text-4xl font-bold text-foreground mb-4',
    this.titleClass()
  ));

  descriptionClasses = computed(() => cn(
    'text-lg text-muted-foreground max-w-3xl mx-auto',
    this.descriptionClass()
  ));

  badgeClasses = computed(() => cn(
    'bg-primary/10 text-primary border border-primary/20',
    this.badgeClass()
  ));

  gridClasses = computed(() => {
    const baseClasses = 'grid gap-6';
    const gapClasses = {
      sm: 'gap-4',
      default: 'gap-6',
      lg: 'gap-8'
    };
    const columnClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
      6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
    };
    
    return cn(
      baseClasses,
      gapClasses[this.gap()],
      columnClasses[Math.min(this.columns(), 6) as keyof typeof columnClasses],
      this.gridClass()
    );
  });

  statItemClasses = computed(() => cn(
    statItemVariants({
      variant: this.statVariant(),
      size: this.statSize(),
      layout: this.statLayout()
    }),
    this.clickable() ? 'cursor-pointer' : '',
    this.statClass()
  ));

  valueClasses = computed(() => cn(
    'text-4xl md:text-5xl font-bold transition-colors duration-300',
    this.statLayout() === 'horizontal' ? 'text-3xl' : ''
  ));

  labelClasses = computed(() => cn(
    'text-lg font-semibold text-foreground',
    this.statLayout() === 'horizontal' ? 'text-base' : ''
  ));

  statDescriptionClasses = computed(() => cn(
    'text-sm text-muted-foreground line-clamp-2'
  ));

  prefixClasses = computed(() => cn(
    'text-2xl md:text-3xl font-semibold text-muted-foreground'
  ));

  suffixClasses = computed(() => cn(
    'text-2xl md:text-3xl font-semibold text-muted-foreground'
  ));

  footerClasses = computed(() => cn(
    'mt-12',
    this.footerClass()
  ));

  // Helper Methods
  getFormattedValue(stat: StatItem, index: number): string {
    const animatedValue = this.animatedValues()[index] || 0;
    const value = this.enableAnimation() ? animatedValue : stat.value;
    
    if (stat.formatter) {
      return stat.formatter(value);
    }
    
    // Default formatting for large numbers
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    
    return value.toString();
  }

  getCustomFieldsArray(customFields: StatItem['customFields']): Array<{key: string, label: string, value: any}> {
    if (!customFields) return [];
    
    return Object.entries(customFields)
      .map(([key, value]) => ({
        key,
        label: this.formatLabel(key),
        value: this.formatValue(value)
      }));
  }

  hasCustomFields(customFields: StatItem['customFields']): boolean {
    return customFields ? Object.keys(customFields).length > 0 : false;
  }

  private formatLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  private formatValue(value: any): string {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return String(value);
  }

  // Event Handlers
  onStatClick(stat: StatItem, index: number): void {
    if (this.clickable()) {
      this.statClick.emit({ stat, index });
    }
  }

  onStatHover(stat: StatItem, index: number): void {
    this.statHover.emit({ stat, index });
  }
}
