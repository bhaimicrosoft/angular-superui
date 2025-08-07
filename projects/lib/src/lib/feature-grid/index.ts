import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {cva} from 'class-variance-authority';
import {cn} from '../utils/cn';

const featureGridVariants = cva(
  'py-20 px-4 sm:px-6 lg:px-8',
  {
    variants: {
      variant: {
        default: 'bg-background',
        gradient: 'bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800',
        dark: 'bg-slate-900 text-white',
        minimal: 'bg-transparent'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

const featureCardVariants = cva(
  'relative group transition-all duration-300 hover:-translate-y-1 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg',
        minimal: 'p-6',
        glass: 'bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl',
        gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-border rounded-xl p-6 shadow-lg hover:shadow-xl'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: {
    type: 'svg' | 'emoji' | 'image';
    value: string;
    color?: string;
  };
  badge?: string;
  stats?: {
    value: string;
    label: string;
  };
  cta?: {
    text: string;
    href?: string;
    action?: () => void;
  };
  highlighted?: boolean;
}

@Component({
  selector: 'feature-grid-block',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [class]="sectionClasses()">
      <div class="container mx-auto max-w-7xl">
        <!-- Section Header -->
        @if (title() || subtitle()) {
          <div [class]="getHeaderAlignment()">
            @if (badge()) {
              <div class="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {{ badge() }}
              </div>
            }
            
            @if (title()) {
              <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {{ title() }}
              </h2>
            }
            
            @if (subtitle()) {
              <p class="text-lg text-muted-foreground max-w-3xl">
                {{ subtitle() }}
              </p>
            }
          </div>
        }

        <!-- Features Grid -->
        <div [class]="getGridClasses()" class="mt-16">
          @for (feature of features(); track feature.id) {
            <div 
              [class]="getFeatureCardClasses(feature)"
              (click)="onFeatureClick.emit(feature)"
            >
              <!-- Highlight Border -->
              @if (feature.highlighted) {
                <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              }

              <!-- Badge -->
              @if (feature.badge) {
                <div class="absolute top-4 right-4">
                  <span class="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                    {{ feature.badge }}
                  </span>
                </div>
              }

              <!-- Icon -->
              @if (feature.icon) {
                <div class="mb-6 relative z-10">
                  @switch (feature.icon.type) {
                    @case ('emoji') {
                      <div class="text-4xl mb-2">{{ feature.icon.value }}</div>
                    }
                    @case ('image') {
                      <img 
                        [src]="feature.icon.value" 
                        [alt]="feature.title + ' icon'"
                        class="w-12 h-12 object-contain"
                      />
                    }
                    @case ('svg') {
                      <div 
                        class="w-12 h-12 p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                        [innerHTML]="feature.icon.value"
                      ></div>
                    }
                  }
                </div>
              }

              <!-- Content -->
              <div class="relative z-10">
                <h3 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {{ feature.title }}
                </h3>
                
                <p class="text-muted-foreground leading-relaxed mb-4">
                  {{ feature.description }}
                </p>

                <!-- Stats -->
                @if (feature.stats) {
                  <div class="flex items-center space-x-4 mb-4 pt-4 border-t border-border/50">
                    <div class="text-center">
                      <div class="text-2xl font-bold text-primary">{{ feature.stats.value }}</div>
                      <div class="text-xs text-muted-foreground">{{ feature.stats.label }}</div>
                    </div>
                  </div>
                }

                <!-- CTA -->
                @if (feature.cta) {
                  <div class="mt-6">
                    @if (feature.cta.href) {
                      <a
                        [href]="feature.cta.href"
                        class="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
                      >
                        {{ feature.cta.text }}
                        <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    } @else {
                      <button
                        (click)="feature.cta.action && feature.cta.action(); $event.stopPropagation()"
                        class="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
                      >
                        {{ feature.cta.text }}
                        <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </button>
                    }
                  </div>
                }
              </div>

              <!-- Hover Effect -->
              <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
            </div>
          }
        </div>

        <!-- Bottom CTA -->
        @if (bottomCta()) {
          <div class="text-center mt-16">
            @if (bottomCta()?.href) {
              <a
                [href]="bottomCta()?.href"
                class="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                {{ bottomCta()?.text }}
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </a>
            } @else {
              <button
                (click)="bottomCta()?.action && bottomCta()?.action(); onBottomCtaClick.emit()"
                class="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                {{ bottomCta()?.text }}
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </button>
            }
          </div>
        }
      </div>
    </section>
  `
})
export class FeatureGridBlockComponent {
  // Inputs
  variant = input<'default' | 'gradient' | 'dark' | 'minimal'>('default');
  cardVariant = input<'default' | 'minimal' | 'glass' | 'gradient'>('default');
  columns = input<2 | 3 | 4 | 6>(3);
  alignment = input<'left' | 'center' | 'right'>('center');
  
  title = input<string>();
  subtitle = input<string>();
  badge = input<string>();
  
  features = input.required<Feature[]>();
  bottomCta = input<{text: string; href?: string; action?: () => void}>();

  // Outputs
  onFeatureClick = output<Feature>();
  onBottomCtaClick = output<void>();

  // Helper function
  cn = cn;

  // Computed classes
  sectionClasses = computed(() => featureGridVariants({
    variant: this.variant()
  }));

  getHeaderAlignment(): string {
    const alignment = this.alignment();
    const alignClasses = {
      left: 'text-left mb-16',
      center: 'text-center mb-16',
      right: 'text-right mb-16'
    };
    return alignClasses[alignment];
  }

  getGridClasses(): string {
    const cols = this.columns();
    const gridClasses = {
      2: 'grid grid-cols-1 md:grid-cols-2 gap-8',
      3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
      4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
      6: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'
    };
    return gridClasses[cols];
  }

  getFeatureCardClasses(feature: Feature): string {
    return featureCardVariants({
      variant: this.cardVariant()
    });
  }
}
