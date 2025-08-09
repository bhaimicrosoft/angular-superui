import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SEOService} from '../services/seo.service';
import {FeatureGrid} from '@lib/blocks/feature-grid-configurable';
import {Icon} from '@lib/components/icon';

@Component({
  selector: 'app-feature-grid-new-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, FeatureGrid, Icon],
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
            <span class="text-gray-900 dark:text-white font-medium">Feature Grid</span>
          </nav>

          <!-- Category Badge -->
          <div
            class="inline-flex items-center px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Content Block
          </div>

          <!-- Main Heading -->
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Feature Grid Block
          </h1>

          <!-- Description -->
          <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Showcase features, benefits, or services in organized grid layouts.
            Fully customizable with content projection for unlimited flexibility.
          </p>

          <!-- Features -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-300">
            <div class="flex items-center justify-center">
              <span class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                <span class="text-white text-xs">✓</span>
              </span>
              Flexible Columns
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
              Multiple Variants
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Examples -->
    <div id="examples" class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">

          <!-- Example 1: Three Column Grid -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Three Column Grid</h2>
              <p class="text-gray-600 dark:text-gray-300">Classic feature layout with three columns</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <FeatureGrid variant="default" [columns]="3" spacing="default">
                <h2 slot="title" class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Choose Our Platform
                </h2>
                <p slot="subtitle" class="text-lg text-gray-600 dark:text-gray-300 mb-12">
                  Everything you need to build amazing applications
                </p>

                <!-- Feature 1 -->
                <div slot="features" class="text-center">
                  <div class="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Lightning Fast</h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    Optimized performance with modern Angular features, lazy loading, and efficient change detection.
                  </p>
                </div>

                <!-- Feature 2 -->
                <div slot="features" class="text-center">
                  <div class="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Type Safe</h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    Built with TypeScript for better developer experience, IntelliSense, and fewer runtime errors.
                  </p>
                </div>

                <!-- Feature 3 -->
                <div slot="features" class="text-center">
                  <div class="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Customizable</h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    Unlimited customization with content projection, CVA variants, and Tailwind CSS classes.
                  </p>
                </div>
              </FeatureGrid>
            </div>
          </div>

          <!-- Example 2: Four Column Minimal -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Four Column Minimal</h2>
              <p class="text-gray-600 dark:text-gray-300">Clean layout without borders or shadows</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <FeatureGrid variant="minimal" [columns]="4" spacing="lg">
                <h2 slot="title" class="text-3xl font-bold text-gray-900 dark:text-white mb-12">
                  Core Features
                </h2>

                @for (feature of coreFeatures(); track feature.title) {
                  <div slot="features" class="text-center">
                    <div
                      [class]="'w-12 h-12 ' + feature.iconColor + ' rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md'">
                      <Icon [icon]="feature.icon" size="lg" class="text-white !flex !items-center !justify-center"/>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ feature.title }}</h3>
                    <p class="text-gray-600 dark:text-gray-300 text-sm">{{ feature.description }}</p>
                  </div>
                }
              </FeatureGrid>
            </div>
          </div>

          <!-- Example 3: Two Column Cards -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Two Column Cards</h2>
              <p class="text-gray-600 dark:text-gray-300">Rich card layout with detailed content</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <FeatureGrid variant="default" [columns]="2" spacing="default">
                <h2 slot="title" class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Advanced Capabilities
                </h2>
                <p slot="subtitle" class="text-lg text-gray-600 dark:text-gray-300 mb-12">
                  Powerful features that make a difference
                </p>

                <!-- Advanced Feature 1 -->
                <div slot="features"
                     class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div
                    class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Smart Analytics</h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-6">
                    Get deep insights into your application performance with built-in analytics, monitoring, and
                    reporting tools.
                  </p>
                  <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li class="flex items-center">
                      <span class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                      Real-time monitoring
                    </li>
                    <li class="flex items-center">
                      <span class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                      Custom dashboards
                    </li>
                    <li class="flex items-center">
                      <span class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                      Performance insights
                    </li>
                  </ul>
                </div>

                <!-- Advanced Feature 2 -->
                <div slot="features"
                     class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div
                    class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Enterprise Security</h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-6">
                    Built-in security features including authentication, authorization, data encryption, and compliance
                    tools.
                  </p>
                  <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li class="flex items-center">
                      <span class="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                      OAuth 2.0 / OIDC
                    </li>
                    <li class="flex items-center">
                      <span class="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                      Role-based access
                    </li>
                    <li class="flex items-center">
                      <span class="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                      End-to-end encryption
                    </li>
                  </ul>
                </div>
              </FeatureGrid>
            </div>
          </div>

          <!-- Example 4: Gradient Background -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Gradient Background</h2>
              <p class="text-gray-600 dark:text-gray-300">Eye-catching design with gradient background</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <FeatureGrid variant="gradient" [columns]="3" spacing="default">
                <div slot="background"
                     class="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10"></div>

                <h2 slot="title" class="text-3xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">
                  Developer Experience
                </h2>
                <p slot="subtitle" class="text-lg text-gray-600 dark:text-gray-300 mb-12 relative z-10">
                  Built for modern development workflows
                </p>

                @for (devFeature of devFeatures(); track devFeature.title) {
                  <div slot="features" class="text-center relative z-10">
                    <div
                      [class]="'w-16 h-16 ' + devFeature.bgColor + ' rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg'">
                      <Icon [icon]="devFeature.icon" size="xl" class="text-white !flex !items-center !justify-center"/>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">{{ devFeature.title }}</h3>
                    <p class="text-gray-600 dark:text-gray-300">{{ devFeature.description }}</p>
                  </div>
                }
              </FeatureGrid>
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
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;FeatureGrid columns="three" spacing="default"&gt;
  &lt;h2 slot="title"&gt;Features&lt;/h2&gt;
  &lt;p slot="subtitle"&gt;Description&lt;/p&gt;

  &lt;div slot="features"&gt;
    &lt;!-- Feature content --&gt;
  &lt;/div&gt;
&lt;/FeatureGrid&gt;</code></pre>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Available Slots</h3>
              <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="background"</code> - Background
                  layer
                </li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="title"</code> - Main heading</li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="subtitle"</code> - Subtitle text
                </li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="features"</code> - Feature items
                </li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="actions"</code> - Action buttons
                </li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="footer"</code> - Footer content
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class FeatureGridNewDemoComponent implements OnInit {
  // Core features data
  coreFeatures = signal([
    {
      title: 'Performance',
      description: 'Optimized for speed and efficiency',
      icon: 'fas fa-bolt',
      iconColor: 'bg-red-500'
    },
    {
      title: 'Security',
      description: 'Enterprise-grade protection',
      icon: 'fas fa-shield-alt',
      iconColor: 'bg-blue-500'
    },
    {
      title: 'Scalability',
      description: 'Grows with your needs',
      icon: 'fas fa-chart-line',
      iconColor: 'bg-green-500'
    },
    {
      title: 'Support',
      description: '24/7 expert assistance',
      icon: 'fas fa-headset',
      iconColor: 'bg-purple-500'
    }
  ]);
  // Developer features data
  devFeatures = signal([
    {
      title: 'Hot Reload',
      description: 'Instant feedback during development with fast refresh and hot module replacement.',
      icon: 'fas fa-sync-alt',
      bgColor: 'bg-orange-500'
    },
    {
      title: 'CLI Tools',
      description: 'Powerful command-line tools for scaffolding, building, and testing your applications.',
      icon: 'fas fa-terminal',
      bgColor: 'bg-indigo-500'
    },
    {
      title: 'Testing',
      description: 'Comprehensive testing utilities with unit, integration, and e2e testing support.',
      icon: 'fas fa-check-circle',
      bgColor: 'bg-emerald-500'
    }
  ]);
  private readonly seoService = inject(SEOService);

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'Feature Grid Block - Angular SuperUI',
      description: 'Showcase features, benefits, or services in organized grid layouts. Fully customizable with content projection for unlimited flexibility.',
      keywords: 'feature grid, angular components, ui blocks, content projection, features showcase, grid layout'
    });
  }
}
