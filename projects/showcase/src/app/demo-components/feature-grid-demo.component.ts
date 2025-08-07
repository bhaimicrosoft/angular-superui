import { Component, signal, computed, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SEOService } from '../services/seo.service';
import { FeatureGridBlockComponent } from '@lib/feature-grid';

@Component({
  selector: 'app-feature-grid-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, FeatureGridBlockComponent],
  template: `
    <!-- Demo Header -->
    <div class="bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Content Block
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Feature Grid Block
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Showcase your product features with icons, descriptions, and compelling layouts.
            Perfect for highlighting key benefits and capabilities.
          </p>
        </div>
      </div>
    </div>

    <!-- Live Examples -->
    <div class="py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          
          <!-- Example 1: 3-Column Feature Grid -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">3-Column Feature Grid</h2>
              <p class="text-gray-600 dark:text-gray-300">Classic layout with icons and descriptions</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <feature-grid-block
                [title]="'Why Choose Our Platform'"
                [subtitle]="'Everything you need to build amazing applications'"
                [features]="threeColumnFeatures()"
                [columns]="3"
                [variant]="'default'"
                (onFeatureClick)="onFeatureClick($event)"
              />
            </div>
          </div>

          <!-- Example 2: 4-Column Grid -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">4-Column Grid</h2>
              <p class="text-gray-600 dark:text-gray-300">Compact layout for multiple features</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <feature-grid-block
                [title]="'Core Features'"
                [features]="fourColumnFeatures()"
                [columns]="4"
                [variant]="'minimal'"
                (onFeatureClick)="onFeatureClick($event)"
              />
            </div>
          </div>

          <!-- Example 3: Card Style Features -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Card Style Features</h2>
              <p class="text-gray-600 dark:text-gray-300">Card-based layout with shadows and borders</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <feature-grid-block
                [title]="'Advanced Capabilities'"
                [subtitle]="'Powerful features that make a difference'"
                [features]="cardStyleFeatures()"
                [columns]="2"
                [cardVariant]="'gradient'"
                (onFeatureClick)="onFeatureClick($event)"
              />
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Usage Code Examples -->
    <div class="bg-gray-50 dark:bg-gray-900 py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Usage Examples</h2>
          
          <div class="space-y-8">
            <!-- Basic Usage -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Feature Grid</h3>
              <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code [textContent]="basicUsageCode()"></code></pre>
            </div>

            <!-- Advanced Usage -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Card Style with Custom Columns</h3>
              <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code [textContent]="advancedUsageCode()"></code></pre>
            </div>

            <!-- TypeScript Interface -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">TypeScript Interfaces</h3>
              <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code [textContent]="interfaceCode()"></code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureGridDemoComponent implements OnInit {
  private seoService = inject(SEOService);

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'Feature Grid Block Demo - Angular SuperUI',
      description: 'Interactive examples of feature grid blocks with different layouts, icons, and card styles.',
      keywords: 'Angular feature grid, features showcase, feature cards, product features, Angular UI blocks'
    });
  }

  // Three-column features
  threeColumnFeatures = signal([
    {
      id: 'typescript',
      title: 'TypeScript First',
      description: 'Built with TypeScript for better development experience and type safety.',
      icon: {
        type: 'emoji' as const,
        value: '⚡',
        color: 'blue'
      },
      cta: {
        text: 'Learn More',
        href: '/docs/typescript'
      }
    },
    {
      id: 'responsive',
      title: 'Fully Responsive',
      description: 'All components work perfectly on desktop, tablet, and mobile devices.',
      icon: {
        type: 'emoji' as const,
        value: '📱',
        color: 'green'
      },
      cta: {
        text: 'View Examples',
        href: '/docs/responsive'
      }
    },
    {
      id: 'accessible',
      title: 'Accessibility First',
      description: 'WCAG 2.1 compliant components with full keyboard navigation support.',
      icon: {
        type: 'emoji' as const,
        value: '♿',
        color: 'purple'
      },
      cta: {
        text: 'Accessibility Guide',
        href: '/docs/accessibility'
      }
    }
  ]);

  // Four-column features
  fourColumnFeatures = signal([
    {
      id: 'fast',
      title: 'Lightning Fast',
      description: 'Optimized for performance with minimal bundle size.',
      icon: {
        type: 'emoji' as const,
        value: '⚡',
        color: 'yellow'
      }
    },
    {
      id: 'customizable',
      title: 'Highly Customizable',
      description: 'Extensive theming options and CSS variables.',
      icon: {
        type: 'emoji' as const,
        value: '🎨',
        color: 'pink'
      }
    },
    {
      id: 'testing',
      title: 'Testing Ready',
      description: 'Built-in testing utilities and best practices.',
      icon: {
        type: 'emoji' as const,
        value: '🧪',
        color: 'green'
      }
    },
    {
      id: 'docs',
      title: 'Great Documentation',
      description: 'Comprehensive guides and API references.',
      icon: {
        type: 'emoji' as const,
        value: '📚',
        color: 'blue'
      }
    }
  ]);

  // Card-style features
  cardStyleFeatures = signal([
    {
      id: 'enterprise',
      title: 'Enterprise Ready',
      description: 'Production-tested components used by leading companies worldwide. Built to handle scale and complexity.',
      icon: {
        type: 'emoji' as const,
        value: '🏢',
        color: 'purple'
      },
      badge: 'Popular',
      cta: {
        text: 'Enterprise Plans',
        href: '/enterprise'
      }
    },
    {
      id: 'support',
      title: 'Premium Support',
      description: 'Get help from our expert team with priority support, custom implementations, and dedicated assistance.',
      icon: {
        type: 'emoji' as const,
        value: '🛟',
        color: 'blue'
      },
      badge: 'Pro',
      cta: {
        text: 'Get Support',
        href: '/support'
      }
    }
  ]);

  onFeatureClick(feature: any) {
    console.log('Feature clicked:', feature);
    if (feature.link) {
      // Navigate to feature link
      console.log('Navigating to:', feature.link);
    }
  }

  // Code examples
  basicUsageCode = computed(() => `<feature-grid
  title="Our Features"
  subtitle="Everything you need in one place"
  [features]="features"
  [columns]="3"
  variant="default"
  [showIcons]="true"
/>`);

  advancedUsageCode = computed(() => `<feature-grid
  title="Advanced Features"
  subtitle="Take your project to the next level"
  [features]="features"
  [columns]="2"
  variant="cards"
  [showIcons]="true"
  (onFeatureClick)="handleFeatureClick($event)"
/>`);

  interfaceCode = computed(() => `export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  link?: string;
  badge?: string;
  action?: () => void;
}

// Component Props
@Input() title?: string;
@Input() subtitle?: string;
@Input() features: Feature[] = [];
@Input() columns: 1 | 2 | 3 | 4 = 3;
@Input() variant: 'default' | 'minimal' | 'cards' = 'default';
@Input() showIcons: boolean = true;

@Output() onFeatureClick = new EventEmitter<Feature>();`);
}
