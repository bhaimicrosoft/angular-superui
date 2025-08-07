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
    <!-- Professional Hero Section -->
    <section class="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Breadcrumb Navigation -->
          <nav class="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <a href="/blocks" class="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">UI Blocks</a>
            <span>→</span>
            <span class="text-gray-900 dark:text-white font-medium">Feature Grid</span>
          </nav>

          <!-- Category Badge -->
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            Content Block
          </div>

          <!-- Main Heading -->
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Feature Grid Block
          </h1>

          <!-- Description -->
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed mx-auto max-w-3xl">
            Showcase your product features with icons, descriptions, and compelling layouts. 
            Perfect for highlighting key benefits and capabilities.
          </p>

          <!-- Feature Grid -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 justify-center max-w-4xl mx-auto">
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <span class="text-sm font-medium text-center">Icon Grid</span>
            </div>
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <span class="text-sm font-medium text-center">Feature Cards</span>
            </div>
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              <span class="text-sm font-medium text-center">Testimonials</span>
            </div>
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <span class="text-sm font-medium text-center">Stats Display</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Examples -->
    <div id="examples" class="py-16 bg-gray-50 dark:bg-gray-900">
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
                alignment="center"
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
                alignment="center"
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
                alignment="center"
                (onFeatureClick)="onFeatureClick($event)"
              />
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Documentation Link -->
    <div class="bg-white dark:bg-gray-900 py-16 border-t border-gray-200 dark:border-gray-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <div class="text-center">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Implementation Guide</h3>
            
            <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Ready to implement? Check out our comprehensive documentation for detailed usage examples and customization options.
            </p>
            
            <a 
              href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/feature-grid.md" 
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              View Documentation
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
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
