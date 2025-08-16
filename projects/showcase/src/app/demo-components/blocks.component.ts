import { Component, signal, computed, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SEOService } from '../services/seo.service';
import { Icon } from '@lib/components/icon';

@Component({
  selector: 'app-blocks',
  standalone: true,
  imports: [CommonModule, RouterModule, Icon],
  template: `
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center max-w-5xl mx-auto">
          <!-- Badge -->
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium mb-8 backdrop-blur-sm">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            UI Blocks | Complete Layout Solutions
          </div>

          <!-- Main Heading -->
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Pre-built
            <br>
            <span class="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              UI Blocks
            </span>
          </h1>

          <!-- Subtitle -->
          <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Complete layout solutions that combine multiple components into ready-to-use blocks.
            Build faster with pre-designed headers, footers, hero sections, and more.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a
              (click)="scrollToBlocks()"
              class="group relative px-10 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer text-lg"
            >
              <span class="relative z-10">Explore Blocks</span>
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>

            <a
              href="https://github.com/bhaimicrosoft/angular-superui"
              target="_blank"
              class="group px-10 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:border-violet-500 dark:hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-300 text-lg backdrop-blur-sm"
            >
              <span class="mr-2">⭐</span>
              View on GitHub
            </a>
          </div>

          <!-- Stats -->
          <div class="flex flex-wrap justify-center gap-8 text-center mb-16">
            <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <div class="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-2">{{ blocks().length }}</div>
              <div class="text-gray-600 dark:text-gray-400 font-medium">UI Blocks</div>
            </div>
            <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <div class="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-2">4</div>
              <div class="text-gray-600 dark:text-gray-400 font-medium">Categories</div>
            </div>
            <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <div class="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-2">100%</div>
              <div class="text-gray-600 dark:text-gray-400 font-medium">Responsive</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blocks Grid Section -->
    <section id="blocks" class="py-20 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Block
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Each block is a complete, responsive layout solution that you can drop into your application.
            Built with accessibility and performance in mind.
          </p>
        </div>

        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button
            *ngFor="let category of categories()"
            (click)="setActiveCategory(category)"
            [class]="getCategoryButtonClass(category)"
            class="px-6 py-3 rounded-full font-medium transition-all duration-300"
          >
            {{ category }}
          </button>
        </div>

        <!-- Blocks Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (block of filteredBlocks(); track block.name) {
            <div class="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              <!-- Block Preview -->
              <div class="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 relative overflow-hidden">
                <div [class]="block.bgColor" class="absolute inset-0 opacity-20"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <div [class]="block.iconColor" class="mx-auto mb-4">
                      <Icon [icon]="block.icon" size="3xl" [ariaLabel]="block.name + ' icon'" />
                    </div>
                    <div class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ block.category }}</div>
                  </div>
                </div>
                
                <!-- Hover Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <a
                    [routerLink]="block.route"
                    class="px-6 py-2 bg-white/90 text-gray-900 rounded-full font-medium hover:bg-white transition-all duration-200 transform translate-y-4 group-hover:translate-y-0"
                  >
                    View Block
                  </a>
                </div>
              </div>

              <!-- Block Info -->
              <div class="p-6">
                <div class="flex items-start justify-between mb-3">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200">
                    {{ block.name }}
                  </h3>
                  <span [class]="getCategoryBadgeClass(block.category)" class="px-3 py-1 text-xs font-medium rounded-full">
                    {{ block.category }}
                  </span>
                </div>
                
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {{ block.description }}
                </p>

                <!-- Block Features -->
                <div class="flex flex-wrap gap-2 mb-4">
                  @for (feature of block.features; track feature) {
                    <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md">
                      {{ feature }}
                    </span>
                  }
                </div>

                <!-- Action Button -->
                <a
                  [routerLink]="block.route"
                  class="inline-flex items-center text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium text-sm transition-colors duration-200 group"
                >
                  Explore Block
                  <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          }
        </div>

        <!-- Empty State -->
        @if (filteredBlocks().length === 0) {
          <div class="text-center py-16">
            <div class="text-gray-400 dark:text-gray-600 mb-4">
              <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.21 0-4.21-.896-5.657-2.343C3.79 10.105 3 7.714 3 5s.79-5.105 3.343-7.657C8.895-4.21 11.286-5 14-5s5.105.79 7.657 3.343C23.21-0.105 24 2.286 24 5s-.79 5.105-3.343 7.657C18.105 14.21 15.714 15 13 15z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No blocks found</h3>
            <p class="text-gray-600 dark:text-gray-400">Try selecting a different category or check back later for new blocks.</p>
          </div>
        }
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose UI Blocks?
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Pre-built solutions that save you weeks of development time
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (feature of blockFeatures; track feature.title) {
            <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <div [class]="feature.iconColor" class="mb-4">
                <Icon [icon]="feature.icon" size="2xl" [ariaLabel]="feature.title + ' icon'" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">{{ feature.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ feature.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlocksComponent implements OnInit {
  private seoService = inject(SEOService);
  
  activeCategory = signal<string>('All');

  blocks = signal([
    {
      name: 'Header Block',
      route: '/blocks/header',
      description: 'Complete header layouts with navigation, search, user menus, and responsive mobile design.',
      category: 'Navigation',
      icon: 'fas fa-bars',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      features: ['Navigation', 'Search Bar', 'User Menu', 'Mobile Responsive']
    },
    {
      name: 'Hero Section',
      route: '/blocks/hero-section',
      description: 'Eye-catching landing page heroes with multiple layouts, CTAs, and background options.',
      category: 'Content',
      icon: 'fas fa-star',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      features: ['Multiple Layouts', 'CTA Buttons', 'Background Images', 'Responsive']
    },
    {
      name: 'Pricing Cards',
      route: '/blocks/pricing-cards',
      description: 'Professional pricing tables with feature comparison, billing toggles, and popular highlights.',
      category: 'Content',
      icon: 'fas fa-dollar-sign',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400',
      features: ['Feature Comparison', 'Billing Toggle', 'Popular Badge', 'CTA Integration']
    },
    {
      name: 'Footer Block',
      route: '/blocks/footer',
      description: 'Comprehensive footer layouts with links, social icons, newsletter signup, and company info.',
      category: 'Navigation',
      icon: 'fas fa-layer-group',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
      features: ['Multi-column', 'Social Links', 'Newsletter', 'Legal Links']
    },
    {
      name: 'Feature Grid',
      route: '/blocks/feature-grid',
      description: 'Showcase your product features with icons, descriptions, and compelling layouts.',
      category: 'Content',
      icon: 'fas fa-th',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      features: ['Icon Grid', 'Feature Cards', 'Testimonials', 'Stats Display']
    },
    {
      name: 'Feature Card',
      route: '/blocks/feature-card',
      description: 'Individual feature cards with content projection for unlimited customization and flexible layouts.',
      category: 'Content',
      icon: 'fas fa-id-card',
      bgColor: 'bg-teal-100 dark:bg-teal-900/30',
      iconColor: 'text-teal-600 dark:text-teal-400',
      features: ['Content Projection', 'Multiple Variants', 'Responsive Design', 'Event Handling']
    },
    {
      name: 'Testimonial Block',
      route: '/blocks/testimonial',
      description: 'Customer testimonials and reviews with beautiful layouts. Build trust and credibility with social proof.',
      category: 'Content',
      icon: 'fas fa-quote-left',
      bgColor: 'bg-pink-100 dark:bg-pink-900/30',
      iconColor: 'text-pink-600 dark:text-pink-400',
      features: ['Multiple Layouts', 'Rating Support', 'Author Info', 'Responsive Design']
    },
    {
      name: 'Team Grid',
      route: '/blocks/team-grid',
      description: 'Showcase team members with beautiful, responsive grid layouts. Perfect for about pages and company profiles.',
      category: 'Content',
      icon: 'fas fa-users',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
      features: ['Member Cards', 'Social Links', 'Skills Display', 'Join CTA']
    },
    {
      name: 'Stats Counter',
      route: '/blocks/stats-counter',
      description: 'Animated statistics counters with icons, progress bars, and trend indicators. Perfect for dashboards and landing pages.',
      category: 'Content',
      icon: 'fas fa-chart-line',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      features: ['Count Animation', 'Progress Bars', 'Trend Indicators', 'Custom Icons']
    },
    {
      name: 'Auth Forms',
      route: '/blocks/auth-forms',
      description: 'Complete authentication forms with validation, social login, and beautiful designs. Includes login, register, and password recovery.',
      category: 'Forms',
      icon: 'fas fa-user-lock',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      features: ['Login Forms', 'Registration', 'Password Recovery', 'Social Auth']
    },
    {
      name: 'Contact Form',
      route: '/blocks/contact-form',
      description: 'Professional contact forms with multiple variants, validation, file uploads, and accessibility. Perfect for business inquiries and support requests.',
      category: 'Forms',
      icon: 'fas fa-envelope',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      features: ['Multiple Variants', 'File Upload', 'Validation', 'Accessibility']
    },
    {
      name: 'Newsletter Signup',
      route: '/blocks/newsletter-signup',
      description: 'Email collection forms with social proof, subscriber counts, privacy compliance, and multiple styling options. GDPR-compliant and conversion-optimized.',
      category: 'Marketing',
      icon: 'fas fa-paper-plane',
      bgColor: 'bg-pink-100 dark:bg-pink-900/30',
      iconColor: 'text-pink-600 dark:text-pink-400',
      features: ['Social Proof', 'GDPR Compliant', 'Multiple Variants', 'Analytics Ready']
    },
    {
      name: 'Profile Card',
      route: '/blocks/profile-card',
      description: 'User profile cards with multiple layouts, social integration, skills display, and contact information. Perfect for team pages and user directories.',
      category: 'User Interface',
      icon: 'fas fa-user-circle',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      features: ['Multiple Variants', 'Social Links', 'Skills Display', 'Interactive Actions']
    },
    {
      name: 'Product Card',
      route: '/blocks/product-card',
      description: 'E-commerce product cards with image galleries, variant selection, pricing, and shopping features. Complete product display solution for online stores.',
      category: 'E-commerce',
      icon: 'fas fa-shopping-bag',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      features: ['Image Gallery', 'Variant Selection', 'Pricing Display', 'Shopping Actions']
    },
    {
      name: 'Blog Card',
      route: '/blocks/blog-card',
      description: 'Professional blog content cards with multiple layouts, author information, categories, tags, and engagement metrics. Perfect for content websites and blogs.',
      category: 'Content',
      icon: 'fas fa-newspaper',
      bgColor: 'bg-teal-100 dark:bg-teal-900/30',
      iconColor: 'text-teal-600 dark:text-teal-400',
      features: ['5 Layout Variants', 'Author Profiles', 'Category Tags', 'Reading Time']
    }
  ]);

  categories = signal(['All', 'Navigation', 'Content', 'Layout', 'Forms', 'Marketing', 'User Interface', 'E-commerce', 'Media']);

  blockFeatures = [
    {
      title: 'Production Ready',
      description: 'Each block is thoroughly tested and ready for production use with comprehensive documentation.',
      icon: 'fas fa-check-circle',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Fully Responsive',
      description: 'All blocks are mobile-first and work perfectly on desktop, tablet, and mobile devices.',
      icon: 'fas fa-mobile-alt',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Accessible by Default',
      description: 'Built with accessibility in mind, following WCAG guidelines and best practices.',
      icon: 'fas fa-universal-access',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Customizable',
      description: 'Easy to customize with Tailwind CSS classes and component props to match your brand.',
      icon: 'fas fa-palette',
      iconColor: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      title: 'TypeScript First',
      description: 'Built with TypeScript for better developer experience and type safety.',
      icon: 'fas fa-code',
      iconColor: 'text-orange-600 dark:text-orange-400'
    },
    {
      title: 'Performance Optimized',
      description: 'Optimized for performance with lazy loading, tree shaking, and minimal bundle size.',
      icon: 'fas fa-rocket',
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    }
  ];

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'UI Blocks - Angular SuperUI | Complete Layout Solutions',
      description: 'Pre-built UI blocks and layout solutions for Angular applications. Headers, footers, hero sections, pricing cards, and more. Save weeks of development time with production-ready blocks.',
      keywords: 'Angular UI blocks, layout blocks, header block, footer block, hero section, pricing cards, Angular components, UI layouts, responsive blocks'
    });
  }

  filteredBlocks = computed(() => {
    const category = this.activeCategory();
    if (category === 'All') {
      return this.blocks();
    }
    return this.blocks().filter(block => block.category === category);
  });

  setActiveCategory(category: string) {
    this.activeCategory.set(category);
  }

  getCategoryButtonClass(category: string) {
    const isActive = this.activeCategory() === category;
    return isActive
      ? 'bg-violet-600 text-white shadow-lg'
      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700';
  }

  getCategoryBadgeClass(category: string) {
    const colorMap: Record<string, string> = {
      'Navigation': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      'Content': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      'Layout': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      'Forms': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
    };
    return colorMap[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
  }

  scrollToBlocks() {
    document.getElementById('blocks')?.scrollIntoView({ behavior: 'smooth' });
  }
}
