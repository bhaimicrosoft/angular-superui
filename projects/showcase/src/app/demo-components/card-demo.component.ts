import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@lib/card';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-card-demo',
  standalone: true,
  imports: [CommonModule, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter],
  template: `
    <!-- Hero Section -->
    <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-950/20 dark:to-teal-950/20">
      <!-- Background Effects -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <!-- Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200/50 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-6">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 3a1 1 0 000 2h10a1 1 0 100-2H5z"/>
            </svg>
            Flexible Content Container
          </div>
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            <span class="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Card
            </span>
            <br>
            Component
          </h1>
          
          <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Versatile content containers with multiple variants, sizes, and layouts for any use case
          </p>
        </div>

        <!-- Feature Highlights -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto">
          <div class="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div class="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Multiple Variants</span>
          </div>
          
          <div class="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div class="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Modular Structure</span>
          </div>
          
          <div class="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div class="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Responsive</span>
          </div>
          
          <div class="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div class="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Accessible</span>
          </div>
        </div>

        <!-- Main Demo Sections -->
        <div class="space-y-20">
          
          <!-- Card Variants Section -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Card Variants</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Different visual styles for various use cases and design requirements
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <!-- Default Card -->
              <Card variant="default" class="transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-3">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v1H8V5z"/>
                    </svg>
                  </div>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>Standard card with subtle border and shadow</CardDescription>
                </CardHeader>
                <CardContent>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Perfect for general content display with clean, minimal styling.
                  </p>
                </CardContent>
                <CardFooter>
                  <span class="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full">Default</span>
                </CardFooter>
              </Card>

              <!-- Outline Card -->
              <Card variant="outline" class="transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mb-3">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <CardTitle>Outline Card</CardTitle>
                  <CardDescription>Emphasized border for important content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Great for highlighting key information or call-to-action sections.
                  </p>
                </CardContent>
                <CardFooter>
                  <span class="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full">Outline</span>
                </CardFooter>
              </Card>

              <!-- Elevated Card -->
              <Card variant="elevated" class="transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-3">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  </div>
                  <CardTitle>Elevated Card</CardTitle>
                  <CardDescription>Enhanced shadow for premium content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Ideal for featured content, testimonials, or premium offerings.
                  </p>
                </CardContent>
                <CardFooter>
                  <span class="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full">Elevated</span>
                </CardFooter>
              </Card>
            </div>
          </section>

          <!-- Product Cards Section -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Product Showcase</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Perfect for e-commerce layouts, product catalogs, and feature highlighting
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <!-- Product Card 1 -->
              <Card variant="default" class="overflow-hidden transition-all duration-300 hover:shadow-xl group">
                <div class="aspect-video bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center relative overflow-hidden">
                  <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div class="text-center text-white relative z-10">
                    <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <p class="text-sm font-medium">Premium Laptop</p>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle class="text-lg">MacBook Pro 16"</CardTitle>
                  <CardDescription>High-performance laptop for professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="space-y-3">
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500 dark:text-gray-400">Processor:</span>
                      <span class="font-medium">M3 Pro Chip</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500 dark:text-gray-400">Memory:</span>
                      <span class="font-medium">32GB RAM</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500 dark:text-gray-400">Storage:</span>
                      <span class="font-medium">1TB SSD</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter class="flex flex-col sm:flex-row justify-end items-center gap-3 pt-4">
                  <span class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 sm:mr-auto">$2,499</span>
                  <button class="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg active:scale-95">
                    Add to Cart
                  </button>
                </CardFooter>
              </Card>

              <!-- Product Card 2 -->
              <Card variant="outline" class="overflow-hidden transition-all duration-300 hover:shadow-xl group">
                <div class="aspect-video bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center relative overflow-hidden">
                  <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div class="text-center text-white relative z-10">
                    <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <p class="text-sm font-medium">Smart Phone</p>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle class="text-lg">iPhone 15 Pro</CardTitle>
                  <CardDescription>Latest smartphone with titanium design</CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="space-y-3">
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500 dark:text-gray-400">Display:</span>
                      <span class="font-medium">6.1" ProMotion</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500 dark:text-gray-400">Camera:</span>
                      <span class="font-medium">48MP Pro System</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500 dark:text-gray-400">Chip:</span>
                      <span class="font-medium">A17 Pro</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter class="flex flex-col sm:flex-row justify-end items-center gap-3 pt-4">
                  <span class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 sm:mr-auto">$999</span>
                  <button class="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg active:scale-95">
                    Add to Cart
                  </button>
                </CardFooter>
              </Card>

              <!-- Product Card 3 -->
              <Card variant="elevated" class="overflow-hidden transition-all duration-300 hover:shadow-2xl group">
                <div class="aspect-video bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center relative overflow-hidden">
                  <div class="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold z-20 animate-pulse">
                    🔥 Hot Deal
                  </div>
                  <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div class="text-center text-white relative z-10">
                    <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                      </svg>
                    </div>
                    <p class="text-sm font-medium">Wireless Headphones</p>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle class="text-lg">AirPods Max</CardTitle>
                  <CardDescription>Premium over-ear headphones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="space-y-3">
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500 dark:text-gray-400">Battery:</span>
                      <span class="font-medium">20h Playback</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500 dark:text-gray-400">Audio:</span>
                      <span class="font-medium">Spatial Audio</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500 dark:text-gray-400">Features:</span>
                      <span class="font-medium">ANC + Transparency</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter class="flex flex-col sm:flex-row justify-end items-center gap-3 pt-4">
                  <div class="flex flex-col sm:flex-row items-center gap-2 sm:mr-auto">
                    <span class="text-lg text-gray-400 dark:text-gray-500 line-through">$549</span>
                    <span class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">$449</span>
                  </div>
                  <button class="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg active:scale-95">
                    Add to Cart
                  </button>
                </CardFooter>
              </Card>
            </div>
          </section>

          <!-- Profile Cards Section -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Team Profiles</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Showcase team members, user profiles, and testimonials with style
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <!-- Profile Card 1 -->
              <Card variant="default" class="text-center transition-all duration-300 hover:shadow-lg group">
                <CardHeader class="pb-2">
                  <div class="relative mb-4">
                    <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <div class="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <CardTitle class="text-xl">Sarah Chen</CardTitle>
                  <CardDescription>Senior Frontend Developer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Passionate about creating beautiful and functional user interfaces with modern technologies.
                  </p>
                  <div class="flex justify-center flex-wrap gap-2">
                    <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs">React</span>
                    <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs">Angular</span>
                    <span class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-xs">TypeScript</span>
                  </div>
                </CardContent>
                <CardFooter class="justify-center">
                  <div class="flex space-x-2">
                    <button class="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center text-sm transition-colors duration-200">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                    <button class="w-8 h-8 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center text-sm transition-colors duration-200">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </button>
                  </div>
                </CardFooter>
              </Card>

              <!-- Profile Card 2 -->
              <Card variant="outline" class="text-center transition-all duration-300 hover:shadow-lg group">
                <CardHeader class="pb-2">
                  <div class="relative mb-4">
                    <div class="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <div class="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <CardTitle class="text-xl">Marcus Rodriguez</CardTitle>
                  <CardDescription>Backend Engineer & DevOps</CardDescription>
                </CardHeader>
                <CardContent>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Specialized in scalable backend systems and cloud infrastructure automation.
                  </p>
                  <div class="flex justify-center flex-wrap gap-2">
                    <span class="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-xs">Node.js</span>
                    <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs">Docker</span>
                    <span class="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-xs">AWS</span>
                  </div>
                </CardContent>
                <CardFooter class="justify-center">
                  <div class="flex space-x-2">
                    <button class="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center text-sm transition-colors duration-200">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                    <button class="w-8 h-8 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center text-sm transition-colors duration-200">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </button>
                  </div>
                </CardFooter>
              </Card>

              <!-- Profile Card 3 -->
              <Card variant="elevated" class="text-center transition-all duration-300 hover:shadow-xl group">
                <CardHeader class="pb-2">
                  <div class="relative mb-4">
                    <div class="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <div class="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <CardTitle class="text-xl">Emma Thompson</CardTitle>
                  <CardDescription>UX/UI Designer & Creative Director</CardDescription>
                </CardHeader>
                <CardContent>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Crafting intuitive user experiences and beautiful design systems that users love.
                  </p>
                  <div class="flex justify-center flex-wrap gap-2">
                    <span class="px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 rounded-full text-xs">Figma</span>
                    <span class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-xs">Design Systems</span>
                    <span class="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-xs">UX Research</span>
                  </div>
                </CardContent>
                <CardFooter class="justify-center">
                  <div class="flex space-x-2">
                    <button class="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center text-sm transition-colors duration-200">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                    <button class="w-8 h-8 bg-pink-600 hover:bg-pink-700 text-white rounded-full flex items-center justify-center text-sm transition-colors duration-200">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.5 0C2.9 0 0 2.9 0 6.5S2.9 13 6.5 13 13 10.1 13 6.5 10.1 0 6.5 0zm0 2C9 2 11 4 11 6.5S9 11 6.5 11 2 9 2 6.5 4 2 6.5 2z"/>
                        <path d="M17.5 11C13.9 11 11 13.9 11 17.5S13.9 24 17.5 24 24 21.1 24 17.5 21.1 11 17.5 11zm0 2c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5-4.5-2-4.5-4.5 2-4.5 4.5-4.5z"/>
                      </svg>
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </section>

          <!-- Card Sizes Section -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Size Variants</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Different sizes to fit your layout requirements perfectly
            </p>
            
            <div class="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
              <!-- Small Card -->
              <Card variant="default" size="sm" class="w-full md:w-auto transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle class="text-sm">Small Card</CardTitle>
                  <CardDescription class="text-xs">Compact size for tight spaces</CardDescription>
                </CardHeader>
                <CardContent>
                  <p class="text-xs text-gray-600 dark:text-gray-400">Perfect for sidebars and secondary content.</p>
                </CardContent>
                <CardFooter>
                  <span class="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">Small</span>
                </CardFooter>
              </Card>

              <!-- Default Card -->
              <Card variant="default" size="default" class="w-full md:w-auto transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>Standard size for most use cases</CardDescription>
                </CardHeader>
                <CardContent>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Ideal for main content areas and general layouts.</p>
                </CardContent>
                <CardFooter>
                  <span class="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">Default</span>
                </CardFooter>
              </Card>

              <!-- Large Card -->
              <Card variant="default" size="lg" class="w-full md:w-auto transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle class="text-xl">Large Card</CardTitle>
                  <CardDescription class="text-base">Spacious size for featured content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p class="text-base text-gray-600 dark:text-gray-400">Great for hero sections and prominent displays.</p>
                </CardContent>
                <CardFooter>
                  <span class="text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded">Large</span>
                </CardFooter>
              </Card>
            </div>
          </section>

          <!-- Interactive Demo Section -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Interactive Example</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Try different combinations of variants and see real-time changes
            </p>
            
            <div class="max-w-2xl mx-auto mb-8">
              <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 mb-8">
                <!-- Controls -->
                <div class="flex flex-wrap justify-center gap-4 mb-8">
                  <div class="flex flex-wrap gap-2">
                    <button
                      *ngFor="let variant of cardVariants()"
                      (click)="setSelectedVariant(variant)"
                      [class]="'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ' + 
                               (selectedVariant() === variant 
                                 ? 'bg-emerald-600 text-white shadow-lg' 
                                 : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600')"
                    >
                      {{ variant }}
                    </button>
                  </div>
                </div>

                <!-- Live Preview -->
                <Card [variant]="selectedVariant()" class="transition-all duration-300 max-w-sm mx-auto">
                  <CardHeader>
                    <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mb-3 mx-auto">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    </div>
                    <CardTitle class="text-center">{{ selectedVariant() | titlecase }} Card</CardTitle>
                    <CardDescription class="text-center">This is a {{ selectedVariant() }} variant demonstration</CardDescription>
                  </CardHeader>
                  <CardContent class="text-center">
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Experience the {{ selectedVariant() }} styling in real-time. Each variant provides a unique visual treatment.
                    </p>
                  </CardContent>
                  <CardFooter class="justify-center">
                    <span class="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full">
                      {{ selectedVariant() }}
                    </span>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>

          <!-- Code Example Section -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Usage Example</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Simple and clean code structure with TypeScript support
            </p>
            
            <div class="max-w-4xl mx-auto">
              <div class="bg-gray-900 dark:bg-gray-800 rounded-xl p-6 text-left">
                <div class="flex items-center mb-4">
                  <div class="flex space-x-2">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span class="ml-4 text-gray-400 text-sm">card-example.component.html</span>
                </div>
                <pre class="text-green-400 font-mono text-sm overflow-x-auto"><code>&lt;Card variant="elevated" size="lg"&gt;
  &lt;CardHeader&gt;
    &lt;CardTitle&gt;Premium Features&lt;/CardTitle&gt;
    &lt;CardDescription&gt;Unlock advanced functionality&lt;/CardDescription&gt;
  &lt;/CardHeader&gt;
  &lt;CardContent&gt;
    &lt;p&gt;Get access to exclusive features and priority support.&lt;/p&gt;
    &lt;ul class="mt-4 space-y-2"&gt;
      &lt;li&gt;✓ Advanced Analytics&lt;/li&gt;
      &lt;li&gt;✓ Priority Support&lt;/li&gt;
      &lt;li&gt;✓ Custom Integrations&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/CardContent&gt;
  &lt;CardFooter&gt;
    &lt;button class="btn-primary"&gt;Upgrade Now&lt;/button&gt;
  &lt;/CardFooter&gt;
&lt;/Card&gt;</code></pre>
              </div>
            </div>
          </section>

          <!-- Documentation Section -->
          <section class="text-center">
            <div class="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-3xl p-12 text-white border border-emerald-400/30 dark:border-slate-600/50 shadow-2xl">
              <h2 class="text-3xl font-bold mb-6 text-white">Ready to Build Amazing Cards?</h2>
              <p class="text-xl mb-8 text-emerald-100 dark:text-slate-200 max-w-2xl mx-auto">
                Create flexible, accessible content containers for your Angular applications
              </p>
              
              <div class="bg-gray-900/90 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 text-left max-w-2xl mx-auto mb-8 border border-gray-700/50 dark:border-slate-600/30 shadow-lg">
                <div class="flex items-center mb-4">
                  <div class="flex space-x-2">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span class="ml-4 text-gray-300 dark:text-slate-300 text-sm">Terminal</span>
                </div>
                <pre class="text-green-400 font-mono text-lg"><code>npx ngsui-cli add card</code></pre>
              </div>
              
              <a
                href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/card.md"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-100 text-emerald-700 dark:text-slate-800 font-bold text-lg rounded-2xl hover:bg-emerald-50 dark:hover:bg-white transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
              >
                <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                View Full Documentation
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  `
})
export class CardDemoComponent {
  
  // Available card variants for interactive demo
  cardVariants = signal<('default' | 'outline' | 'ghost' | 'elevated' | 'filled')[]>(['default', 'outline', 'ghost', 'elevated', 'filled']);
  
  // Selected variant for interactive demo
  selectedVariant = signal<'default' | 'outline' | 'ghost' | 'elevated' | 'filled'>('default');

  constructor(private seoService: SEOService) {
    this.seoService.updateSEO({
      title: 'Card Component - Angular SuperUI | Flexible Content Containers',
      description: 'Versatile card component with multiple variants, sizes, and layouts. Perfect for displaying content, products, profiles, and more with stunning visual appeal.',
      keywords: 'Angular card, content container, card component, product card, profile card, UI card, Angular SuperUI, responsive cards'
    });
  }

  setSelectedVariant(variant: 'default' | 'outline' | 'ghost' | 'elevated' | 'filled'): void {
    this.selectedVariant.set(variant);
  }
}
