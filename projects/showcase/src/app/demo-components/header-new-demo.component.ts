import { Component, signal, computed, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SEOService } from '../services/seo.service';
import { HeaderBlock } from '@lib/blocks/header-configurable';

@Component({
  selector: 'app-header-new-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderBlock],
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
            <span class="text-gray-900 dark:text-white font-medium">Header Block</span>
          </nav>

          <!-- Category Badge -->
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            Navigation Block
          </div>

          <!-- Main Heading -->
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Header Block
          </h1>

          <!-- Description -->
          <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Create flexible navigation headers with logo, menu items, and actions. 
            Perfect for websites, dashboards, and applications.
          </p>

          <!-- Features -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-300">
            <div class="flex items-center justify-center">
              <span class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                <span class="text-white text-xs">✓</span>
              </span>
              Sticky & Fixed Positioning
            </div>
            <div class="flex items-center justify-center">
              <span class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                <span class="text-white text-xs">✓</span>
              </span>
              Mobile Responsive
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

          <!-- Example 1: Default Header -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Default Header</h2>
              <p class="text-gray-600 dark:text-gray-300">Standard navigation with backdrop blur</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <HeaderBlock variant="default" size="default" position="static">
                <!-- Logo -->
                <div slot="logo" class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span class="text-white font-bold text-sm">S</span>
                  </div>
                  <span class="text-xl font-semibold text-gray-900 dark:text-white">SuperUI</span>
                </div>

                <!-- Navigation -->
                <nav slot="nav" class="hidden md:flex items-center space-x-8">
                  <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Components</a>
                  <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Blocks</a>
                  <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Documentation</a>
                  <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Pricing</a>
                </nav>

                <!-- Actions -->
                <div slot="actions" class="flex items-center space-x-4">
                  <button class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                    Sign In
                  </button>
                  <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Get Started
                  </button>
                </div>

                <!-- Mobile Menu Toggle -->
                <button slot="mobile-toggle" class="md:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </HeaderBlock>
            </div>
          </div>

          <!-- Example 2: Transparent Header -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Transparent Header</h2>
              <p class="text-gray-600 dark:text-gray-300">Overlay style with transparent background</p>
            </div>
            <div class="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl overflow-hidden">
              <HeaderBlock variant="transparent" size="lg" position="static">
                <!-- Logo -->
                <div slot="logo" class="flex items-center space-x-2">
                  <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <span class="text-white font-bold">UI</span>
                  </div>
                  <span class="text-2xl font-bold text-white">Brand</span>
                </div>

                <!-- Navigation -->
                <nav slot="nav" class="hidden md:flex items-center space-x-8">
                  <a href="#" class="text-white/80 hover:text-white transition-colors">Home</a>
                  <a href="#" class="text-white/80 hover:text-white transition-colors">About</a>
                  <a href="#" class="text-white/80 hover:text-white transition-colors">Services</a>
                  <a href="#" class="text-white/80 hover:text-white transition-colors">Contact</a>
                </nav>

                <!-- Actions -->
                <div slot="actions" class="flex items-center space-x-4">
                  <button class="px-6 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors">
                    Learn More
                  </button>
                </div>

                <!-- Mobile Menu Toggle -->
                <button slot="mobile-toggle" class="md:hidden p-2 text-white">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </HeaderBlock>
              
              <!-- Hero Content Below -->
              <div class="px-6 pb-20 pt-8 text-center">
                <h1 class="text-4xl font-bold text-white mb-4">Welcome to Our Platform</h1>
                <p class="text-white/90 text-lg">Experience the power of modern web development</p>
              </div>
            </div>
          </div>

          <!-- Example 3: Floating Header -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Floating Header</h2>
              <p class="text-gray-600 dark:text-gray-300">Rounded header with shadow and margin</p>
            </div>
            <div class="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
              <HeaderBlock variant="floating" size="default" position="static" shadow="lg">
                <!-- Logo -->
                <div slot="logo" class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <span class="text-white font-bold text-sm">F</span>
                  </div>
                  <span class="text-xl font-semibold text-gray-900 dark:text-white">Float UI</span>
                </div>

                <!-- Navigation -->
                <nav slot="nav" class="hidden md:flex items-center space-x-6">
                  <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors font-medium">Dashboard</a>
                  <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors font-medium">Projects</a>
                  <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors font-medium">Team</a>
                </nav>

                <!-- Actions -->
                <div slot="actions" class="flex items-center space-x-3">
                  <button class="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h11a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                  <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
              </HeaderBlock>

              <!-- Content area simulation -->
              <div class="mt-8 p-8 bg-white dark:bg-gray-900 rounded-xl">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Page Content</h3>
                <p class="text-gray-600 dark:text-gray-300">The floating header creates a nice separation from the content below.</p>
              </div>
            </div>
          </div>

          <!-- Example 4: Glass Effect Header -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Glass Effect</h2>
              <p class="text-gray-600 dark:text-gray-300">Modern glassmorphism design</p>
            </div>
            <div class="relative bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl overflow-hidden">
              <HeaderBlock variant="glass" size="default" position="static">
                <!-- Logo -->
                <div slot="logo" class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur">
                    <span class="text-white font-bold text-sm">G</span>
                  </div>
                  <span class="text-xl font-semibold text-white">Glass UI</span>
                </div>

                <!-- Navigation -->
                <nav slot="nav" class="hidden md:flex items-center space-x-8">
                  <a href="#" class="text-white/90 hover:text-white transition-colors">Features</a>
                  <a href="#" class="text-white/90 hover:text-white transition-colors">Gallery</a>
                  <a href="#" class="text-white/90 hover:text-white transition-colors">Blog</a>
                </nav>

                <!-- Actions -->
                <div slot="actions" class="flex items-center space-x-4">
                  <button class="text-white/90 hover:text-white transition-colors">Login</button>
                  <button class="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-lg hover:bg-white/30 transition-colors">
                    Sign Up
                  </button>
                </div>
              </HeaderBlock>

              <!-- Glass content simulation -->
              <div class="p-8 text-center text-white">
                <h1 class="text-3xl font-bold mb-4">Glass Morphism Design</h1>
                <p class="text-white/90">Beautiful transparency effects with backdrop blur</p>
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
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;HeaderBlock variant="default" position="sticky"&gt;
  &lt;div slot="logo"&gt;Your Logo&lt;/div&gt;
  &lt;nav slot="nav"&gt;Navigation Items&lt;/nav&gt;
  &lt;div slot="actions"&gt;Action Buttons&lt;/div&gt;
&lt;/HeaderBlock&gt;</code></pre>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Available Slots</h3>
              <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="logo"</code> - Brand/logo area</li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="nav"</code> - Navigation menu</li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="actions"</code> - Action buttons</li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="mobile-toggle"</code> - Mobile menu</li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="search"</code> - Search bar</li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="user"</code> - User menu</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeaderNewDemoComponent implements OnInit {
  private readonly seoService = inject(SEOService);

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'Header Block - Angular SuperUI',
      description: 'Create flexible navigation headers with logo, menu items, and actions. Perfect for websites, dashboards, and applications.',
      keywords: 'header, navigation, angular components, ui blocks, navbar, menu, responsive header'
    });
  }
}
