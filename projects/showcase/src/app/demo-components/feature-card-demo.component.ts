import { Component, signal, computed, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SEOService } from '../services/seo.service';
import { FeatureCardBlock } from '@lib/blocks/feature-card';

@Component({
  selector: 'app-feature-card-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, FeatureCardBlock],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Professional Hero Section -->
    <section class="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Breadcrumb Navigation -->
          <nav class="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <a href="/blocks" class="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">UI Blocks</a>
            <span>→</span>
            <span class="text-gray-900 dark:text-white font-medium">Feature Card</span>
          </nav>

          <!-- Category Badge -->
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Content Block
          </div>

          <!-- Main Heading -->
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Feature Card Block
          </h1>

          <!-- Description -->
          <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Showcase features, products, or services with beautiful card layouts. 
            Fully configurable with content projection for unlimited customization.
          </p>

          <!-- Features -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-300">
            <div class="flex items-center justify-center">
              <span class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                <span class="text-white text-xs">✓</span>
              </span>
              Multiple Variants
            </div>
            <div class="flex items-center justify-center">
              <span class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                <span class="text-white text-xs">✓</span>
              </span>
              Content Projection
            </div>
            <div class="flex items-center justify-center">
              <span class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                <span class="text-white text-xs">✓</span>
              </span>
              Responsive Design
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Examples -->
    <div id="examples" class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">

          <!-- Example 1: Default Feature Cards -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Default Style</h2>
              <p class="text-gray-600 dark:text-gray-300">Clean cards with shadow and hover effects</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCardBlock variant="default" size="default" spacing="default">
                <div slot="icon" class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 slot="title" class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
                <p slot="description" class="text-gray-600 dark:text-gray-300">Optimized performance with modern Angular features and lazy loading.</p>
                <button slot="cta" class="mt-4 text-blue-600 hover:text-blue-700 font-medium">Learn More →</button>
              </FeatureCardBlock>

              <FeatureCardBlock variant="default" size="default" spacing="default">
                <div slot="icon" class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 slot="title" class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Type Safe</h3>
                <p slot="description" class="text-gray-600 dark:text-gray-300">Built with TypeScript for better developer experience and fewer runtime errors.</p>
                <button slot="cta" class="mt-4 text-green-600 hover:text-green-700 font-medium">Explore →</button>
              </FeatureCardBlock>

              <FeatureCardBlock variant="default" size="default" spacing="default">
                <div slot="icon" class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                  </svg>
                </div>
                <h3 slot="title" class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Customizable</h3>
                <p slot="description" class="text-gray-600 dark:text-gray-300">Unlimited customization with content projection and Tailwind CSS classes.</p>
                <button slot="cta" class="mt-4 text-purple-600 hover:text-purple-700 font-medium">Customize →</button>
              </FeatureCardBlock>
            </div>
          </div>

          <!-- Example 2: Gradient Style -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Gradient Style</h2>
              <p class="text-gray-600 dark:text-gray-300">Eye-catching cards with gradient backgrounds</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FeatureCardBlock variant="gradient" size="lg" spacing="relaxed">
                <div slot="badge" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mb-4">
                  Popular
                </div>
                <div slot="icon" class="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <h3 slot="title" class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Premium Features</h3>
                <p slot="description" class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Access advanced components, premium themes, and priority support for your projects.
                </p>
                <div slot="stats" class="flex items-center gap-6 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
                    <div class="text-sm text-gray-500">Components</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-gray-900 dark:text-white">10+</div>
                    <div class="text-sm text-gray-500">Themes</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                    <div class="text-sm text-gray-500">Support</div>
                  </div>
                </div>
              </FeatureCardBlock>

              <FeatureCardBlock variant="gradient" size="lg" spacing="relaxed">
                <div slot="icon" class="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <h3 slot="title" class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Smart Analytics</h3>
                <p slot="description" class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Get insights into your application performance with built-in analytics and monitoring.
                </p>
                <div slot="actions" class="flex gap-3 mt-6">
                  <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Get Started
                  </button>
                  <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Learn More
                  </button>
                </div>
              </FeatureCardBlock>
            </div>
          </div>

          <!-- Example 3: Glass Style -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Glass Style</h2>
              <p class="text-gray-600 dark:text-gray-300">Modern glassmorphism effect with backdrop blur</p>
            </div>
            <div class="relative p-8 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCardBlock variant="glass" size="default" spacing="default">
                  <div slot="icon" class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <h3 slot="title" class="text-lg font-semibold text-white mb-2">Secure</h3>
                  <p slot="description" class="text-white/80">Enterprise-grade security with encryption and authentication.</p>
                </FeatureCardBlock>

                <FeatureCardBlock variant="glass" size="default" spacing="default">
                  <div slot="icon" class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h3 slot="title" class="text-lg font-semibold text-white mb-2">Fast</h3>
                  <p slot="description" class="text-white/80">Optimized for performance with lazy loading and caching.</p>
                </FeatureCardBlock>

                <FeatureCardBlock variant="glass" size="default" spacing="default">
                  <div slot="icon" class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <h3 slot="title" class="text-lg font-semibold text-white mb-2">Loved</h3>
                  <p slot="description" class="text-white/80">Trusted by thousands of developers worldwide.</p>
                </FeatureCardBlock>
              </div>
            </div>
          </div>

          <!-- Example 4: Minimal Style -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Minimal Style</h2>
              <p class="text-gray-600 dark:text-gray-300">Clean and simple design without borders or shadows</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              @for (feature of minimalFeatures(); track feature.title) {
                <FeatureCardBlock variant="minimal" size="default" spacing="compact">
                  <div slot="icon" [class]="'w-8 h-8 ' + feature.iconColor + ' rounded-lg flex items-center justify-center mb-3'">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" [innerHTML]="feature.icon">
                    </svg>
                  </div>
                  <h3 slot="title" class="text-lg font-semibold text-gray-900 dark:text-white mb-1">{{ feature.title }}</h3>
                  <p slot="description" class="text-gray-600 dark:text-gray-300 text-sm">{{ feature.description }}</p>
                </FeatureCardBlock>
              }
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Implementation Guide -->
    <section class="py-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Implementation Guide</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Usage</h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;FeatureCardBlock variant="default"&gt;
  &lt;div slot="icon" class="w-12 h-12 bg-blue-500"&gt;
    &lt;!-- Icon content --&gt;
  &lt;/div&gt;
  &lt;h3 slot="title"&gt;Feature Title&lt;/h3&gt;
  &lt;p slot="description"&gt;Feature description&lt;/p&gt;
&lt;/FeatureCardBlock&gt;</code></pre>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Available Slots</h3>
              <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="icon"</code> - Icon or media</li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="badge"</code> - Badge or label</li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="title"</code> - Main heading</li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="description"</code> - Description text</li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="stats"</code> - Statistics</li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="actions"</code> - Action buttons</li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="footer"</code> - Footer content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class FeatureCardDemoComponent implements OnInit {
  private readonly seoService = inject(SEOService);

  // Minimal features data
  minimalFeatures = signal([
    {
      title: 'Performance',
      description: 'Optimized for speed',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>',
      iconColor: 'bg-red-500'
    },
    {
      title: 'Security',
      description: 'Enterprise-grade protection',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>',
      iconColor: 'bg-blue-500'
    },
    {
      title: 'Scalability',
      description: 'Grows with your needs',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>',
      iconColor: 'bg-green-500'
    },
    {
      title: 'Support',
      description: '24/7 expert assistance',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>',
      iconColor: 'bg-purple-500'
    }
  ]);

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'Feature Card Block - Angular SuperUI',
      description: 'Showcase features, products, or services with beautiful card layouts. Fully configurable with content projection for unlimited customization.',
      keywords: 'feature card, angular components, ui blocks, content projection, customizable cards'
    });
  }
}
