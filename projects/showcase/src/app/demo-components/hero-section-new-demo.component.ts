import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-hero-section-new-demo',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
            <span class="text-gray-900 dark:text-white font-medium">Hero Section</span>
          </nav>

          <!-- Category Badge -->
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Content Block
          </div>

          <!-- Main Heading -->
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Hero Section Block
          </h1>

          <!-- Description -->
          <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Create compelling hero sections with flexible content projection. 
            Perfect for landing pages, product showcases, and call-to-action sections.
          </p>

          <!-- Features -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-300">
            <div class="flex items-center justify-center">
              <span class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                <span class="text-white text-xs">✓</span>
              </span>
              Multiple Layouts
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

          <!-- Example 1: Default Centered Hero -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Default Centered Layout</h2>
              <p class="text-gray-600 dark:text-gray-300">Classic hero section with centered content</p>
            </div>
            
            <!-- Custom Hero Layout -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden shadow-xl">
              <div class="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
                <div class="mx-auto max-w-4xl text-center">
                  <!-- Badge -->
                  <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-medium mb-8">
                    ✨ Now Available
                  </div>
                  
                  <!-- Title -->
                  <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl mb-6">
                    Build Amazing
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      Angular Apps
                    </span>
                  </h1>
                  
                  <!-- Subtitle -->
                  <p class="mx-auto max-w-3xl text-xl leading-8 text-gray-600 dark:text-gray-300 mb-10">
                    Create stunning user interfaces with our modern component library. 
                    Pre-built components, TypeScript support, and seamless integration.
                  </p>
                  
                  <!-- Actions -->
                  <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <button class="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      Get Started Free
                    </button>
                    <button class="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-semibold text-lg">
                      View Components
                    </button>
                  </div>
                  
                  <!-- Stats -->
                  <div class="flex flex-wrap justify-center gap-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div class="text-center">
                      <div class="text-3xl font-bold text-gray-900 dark:text-white">50+</div>
                      <div class="text-gray-600 dark:text-gray-400">Components</div>
                    </div>
                    <div class="text-center">
                      <div class="text-3xl font-bold text-gray-900 dark:text-white">10k+</div>
                      <div class="text-gray-600 dark:text-gray-400">Downloads</div>
                    </div>
                    <div class="text-center">
                      <div class="text-3xl font-bold text-gray-900 dark:text-white">99%</div>
                      <div class="text-gray-600 dark:text-gray-400">Satisfaction</div>
                    </div>
                  </div>
                </div>
                
                <!-- Decorative Elements -->
                <div class="absolute top-10 right-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
                <div class="absolute bottom-10 left-10 w-16 h-16 bg-purple-200/30 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>

          <!-- Example 2: Split Layout -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Split Layout</h2>
              <p class="text-gray-600 dark:text-gray-300">Content on the left, visual on the right</p>
            </div>
            
            <!-- Split Hero Layout -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[600px]">
                <!-- Content Side -->
                <div class="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
                  <!-- Announcement -->
                  <div class="inline-flex items-center px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-8 self-start">
                    🎉 New Release Available
                  </div>
                  
                  <!-- Title -->
                  <h1 class="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl leading-tight mb-6">
                    Simple.
                    <br>
                    <span class="text-blue-600">Powerful.</span>
                    <br>
                    Effective.
                  </h1>
                  
                  <!-- Description -->
                  <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                    Everything you need to build modern Angular applications. 
                    Our comprehensive toolkit includes components, utilities, and design patterns.
                  </p>
                  
                  <!-- Actions -->
                  <div class="flex gap-4 mb-8">
                    <button class="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-semibold">
                      Start Building
                    </button>
                    <button class="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors font-semibold">
                      Read Documentation →
                    </button>
                  </div>
                  
                  <!-- Features -->
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div class="flex items-center">
                      <span class="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                      <span class="text-gray-700 dark:text-gray-300">TypeScript Support</span>
                    </div>
                    <div class="flex items-center">
                      <span class="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                      <span class="text-gray-700 dark:text-gray-300">Tree Shakeable</span>
                    </div>
                    <div class="flex items-center">
                      <span class="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                      <span class="text-gray-700 dark:text-gray-300">SSR Compatible</span>
                    </div>
                    <div class="flex items-center">
                      <span class="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                      <span class="text-gray-700 dark:text-gray-300">Accessible</span>
                    </div>
                  </div>
                </div>
                
                <!-- Visual Side -->
                <div class="flex items-center justify-center p-6 sm:p-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
                  <div class="relative w-full max-w-sm">
                    <div class="bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl p-8 text-white shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                      <div class="space-y-4">
                        <div class="bg-white/20 rounded-lg p-4 backdrop-blur">
                          <div class="h-3 bg-white/40 rounded mb-2"></div>
                          <div class="h-2 bg-white/30 rounded w-3/4"></div>
                        </div>
                        <div class="bg-white/20 rounded-lg p-4 backdrop-blur">
                          <div class="h-3 bg-white/40 rounded mb-2"></div>
                          <div class="h-2 bg-white/30 rounded w-1/2"></div>
                        </div>
                        <div class="bg-white/20 rounded-lg p-4 backdrop-blur">
                          <div class="h-3 bg-white/40 rounded mb-2"></div>
                          <div class="h-2 bg-white/30 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Floating Elements -->
                    <div class="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div class="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Example 3: Minimal Style -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Minimal Style</h2>
              <p class="text-gray-600 dark:text-gray-300">Clean and focused design</p>
            </div>
            
            <!-- Minimal Hero Layout -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
              <div class="px-6 py-16 sm:px-12 sm:py-20 text-center">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:text-4xl">
                  Next-Gen Development
                </h1>
                <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  Push the boundaries of what's possible with Angular
                </p>
                <button class="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                  Explore Features
                </button>
              </div>
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
              <div class="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                <pre>npx ngsui-cli add block hero-section</pre>
              </div>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Advanced Features</h3>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Multiple layout variants
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Content projection slots
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Responsive design
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Dark mode support
                </li>
              </ul>
            </div>
          </div>
          
          <div class="text-center mt-12">
            <a
              href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/blocks/hero-section.md"
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
    </section>
  `,
})
export class HeroSectionNewDemoComponent implements OnInit {
  private seoService = inject(SEOService);

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'Hero Section - UI Blocks | Angular SuperUI',
      description: 'Create compelling hero sections with flexible content projection. Perfect for landing pages, product showcases, and call-to-action sections.',
      keywords: 'angular, hero section, landing page, ui components, content projection',
      url: 'https://angular-superui.vercel.app/blocks/hero-section',
      type: 'website'
    });
  }
}
