import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Drawer,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription
} from '@lib/drawer';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-drawer-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Drawer,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription
  ],
  template: `
    <!-- Epic Background with Floating Elements -->
    <div class="min-h-screen relative overflow-hidden bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0">
        <!-- Floating Orbs -->
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

        <!-- Grid Pattern -->
        <div class="absolute inset-0 opacity-30" style="background-image: url('data:image/svg+xml;utf8,<svg width=&quot;60&quot; height=&quot;60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><defs><pattern id=&quot;grid&quot; width=&quot;60&quot; height=&quot;60&quot; patternUnits=&quot;userSpaceOnUse&quot;><path d=&quot;M 60 0 L 0 0 0 60&quot; fill=&quot;none&quot; stroke=&quot;rgba(255,255,255,0.05)&quot; stroke-width=&quot;1&quot;/></pattern></defs><rect width=&quot;100%&quot; height=&quot;100%&quot; fill=&quot;url(%23grid)&quot;/></svg>')"></div>
      </div>

      <!-- Main Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">

        <!-- Hero Section with Glassmorphism -->
        <div class="text-center mb-20">
          <!-- Announcement Badge -->
          <div class="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white mb-8 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <svg class="w-5 h-5 mr-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <span class="font-medium">Interactive Drawer Components</span>
            <div class="w-2 h-2 bg-emerald-400 rounded-full ml-3 animate-ping"></div>
          </div>

          <!-- Main Title with Gradient Text -->
          <h1 class="text-7xl md:text-8xl font-black mb-8 leading-tight">
            <span class="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
              Drawer
            </span>
            <br>
            <span class="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x animation-delay-500">
              Component
            </span>
          </h1>

          <!-- Subtitle -->
          <p class="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-12">
            Experience the most <span class="text-emerald-400 font-semibold">elegant</span> and
            <span class="text-pink-400 font-semibold">powerful</span> drawer component ever created.
            Slide in from any direction with <span class="text-cyan-400 font-semibold">stunning animations</span>
            and <span class="text-violet-400 font-semibold">perfect accessibility</span>.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/drawer.md"
               target="_blank"
               rel="noopener noreferrer"
               class="group px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105">
              <span class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                View Documentation
                <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </span>
            </a>
          </div>
        </div>

        <!-- Interactive Demo Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">

          <!-- Direction Controls Card -->
          <div class="group relative">
            <!-- Glassmorphism Card -->
            <div class="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <!-- Card Header -->
              <div class="flex items-center mb-8">
                <div class="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white mb-1">Direction Magic</h3>
                  <p class="text-white/70">Slide from any edge</p>
                </div>
              </div>

              <!-- Direction Buttons -->
              <div class="space-y-6">
                <!-- Top Drawer -->
                <div class="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="text-white font-semibold">Top Drawer</h4>
                      <p class="text-white/60 text-sm">Notifications & alerts</p>
                    </div>
                  </div>
                  <button
                    (click)="openTopDrawer()"
                    class="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    Launch
                  </button>
                </div>

                <!-- Bottom Drawer -->
                <div class="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="text-white font-semibold">Bottom Drawer</h4>
                      <p class="text-white/60 text-sm">Mobile-first actions</p>
                    </div>
                  </div>
                  <button
                    (click)="openBottomDrawer()"
                    class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    Launch
                  </button>
                </div>

                <!-- Left Drawer -->
                <div class="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mr-4">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="text-white font-semibold">Left Navigation</h4>
                      <p class="text-white/60 text-sm">Classic sidebar menu</p>
                    </div>
                  </div>
                  <button
                    (click)="openLeftDrawer()"
                    class="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-medium rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    Launch
                  </button>
                </div>

                <!-- Right Drawer -->
                <div class="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="text-white font-semibold">Right Panel</h4>
                      <p class="text-white/60 text-sm">Shopping cart & details</p>
                    </div>
                  </div>
                  <button
                    (click)="openRightDrawer()"
                    class="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-medium rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    Launch
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Features Showcase Card -->
          <div class="group relative">
            <!-- Glassmorphism Card -->
            <div class="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <!-- Card Header -->
              <div class="flex items-center mb-8">
                <div class="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white mb-1">Premium Features</h3>
                  <p class="text-white/70">Built for perfection</p>
                </div>
              </div>

              <!-- Features List -->
              <div class="space-y-6">
                <div class="flex items-start space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div class="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-white font-semibold mb-1">Buttery Smooth Animations</h4>
                    <p class="text-white/60 text-sm">Hardware-accelerated transitions with perfect timing curves and spring physics</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-white font-semibold mb-1">Accessibility Champion</h4>
                    <p class="text-white/60 text-sm">WCAG 2.1 compliant with full keyboard navigation, screen reader support, and focus management</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-white font-semibold mb-1">Infinitely Customizable</h4>
                    <p class="text-white/60 text-sm">TailwindCSS variants, custom sizes, themes, and complete design system integration</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div class="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-white font-semibold mb-1">Developer Experience</h4>
                    <p class="text-white/60 text-sm">TypeScript-first, signal-based reactivity, and intuitive API design</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          <div class="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20">
            <div class="text-4xl font-bold text-emerald-400 mb-2">4</div>
            <div class="text-white/70">Directions</div>
          </div>
          <div class="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20">
            <div class="text-4xl font-bold text-blue-400 mb-2">∞</div>
            <div class="text-white/70">Customizable</div>
          </div>
          <div class="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20">
            <div class="text-4xl font-bold text-purple-400 mb-2">100%</div>
            <div class="text-white/70">Accessible</div>
          </div>
          <div class="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20">
            <div class="text-4xl font-bold text-pink-400 mb-2">0ms</div>
            <div class="text-white/70">Lag Time</div>
          </div>
        </div>
      </div>

      <!-- Drawer Components with stunning content -->

      <!-- Top Drawer -->
      <Drawer [open]="topDrawer()" direction="top" [dismissible]="true" (openChange)="topDrawer.set($event)">
        <DrawerHeader>
          <DrawerTitle>🚀 Notification Center</DrawerTitle>
          <DrawerDescription>
            Stay connected with real-time updates and important announcements
          </DrawerDescription>
        </DrawerHeader>

        <div class="p-6 space-y-4 max-h-96 overflow-y-auto">
          <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <div class="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h4 class="font-semibold text-emerald-900 dark:text-emerald-100">Component Library Updated!</h4>
              <p class="text-sm text-emerald-700 dark:text-emerald-300 mt-1">New drawer component with enhanced animations and accessibility features</p>
              <p class="text-xs text-emerald-600 dark:text-emerald-400 mt-2">2 minutes ago</p>
            </div>
          </div>

          <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h4 class="font-semibold text-blue-900 dark:text-blue-100">New Documentation Available</h4>
              <p class="text-sm text-blue-700 dark:text-blue-300 mt-1">Comprehensive guides and examples for all components</p>
              <p class="text-xs text-blue-600 dark:text-blue-400 mt-2">1 hour ago</p>
            </div>
          </div>

          <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
            <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h4 class="font-semibold text-purple-900 dark:text-purple-100">Performance Boost</h4>
              <p class="text-sm text-purple-700 dark:text-purple-300 mt-1">50% faster rendering with optimized signal-based reactivity</p>
              <p class="text-xs text-purple-600 dark:text-purple-400 mt-2">3 hours ago</p>
            </div>
          </div>
        </div>

        <DrawerFooter>
          <button
            (click)="closeTopDrawer()"
            class="w-full px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-900 dark:text-white font-medium rounded-xl hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300">
            Mark All as Read
          </button>
        </DrawerFooter>
      </Drawer>

      <!-- Bottom Drawer -->
      <Drawer [open]="bottomDrawer()" direction="bottom" [dismissible]="true" (openChange)="bottomDrawer.set($event)">
        <DrawerHeader>
          <DrawerTitle>⚡ Quick Actions Hub</DrawerTitle>
          <DrawerDescription>
            Power user tools and shortcuts at your fingertips
          </DrawerDescription>
        </DrawerHeader>

        <div class="p-6 space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <button class="p-4 bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <div class="font-semibold">Create New</div>
            </button>

            <button class="p-4 bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <div class="font-semibold">Search</div>
            </button>

            <button class="p-4 bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
              </svg>
              <div class="font-semibold">Share</div>
            </button>

            <button class="p-4 bg-gradient-to-br from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <div class="font-semibold">Settings</div>
            </button>
          </div>

          <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800">
            <h4 class="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">💡 Pro Tip</h4>
            <p class="text-sm text-indigo-700 dark:text-indigo-300">Use keyboard shortcuts: Press 'Esc' to close any drawer, or use Tab navigation for accessibility.</p>
          </div>
        </div>

        <DrawerFooter>
          <button
            (click)="closeBottomDrawer()"
            class="w-full px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-900 dark:text-white font-medium rounded-xl hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300">
            Close Quick Actions
          </button>
        </DrawerFooter>
      </Drawer>

      <!-- Left Drawer -->
      <Drawer [open]="leftDrawer()" direction="left" [dismissible]="true" (openChange)="leftDrawer.set($event)">
        <DrawerHeader>
          <DrawerTitle>🧭 Navigation Center</DrawerTitle>
          <DrawerDescription>
            Explore all sections and features with ease
          </DrawerDescription>
        </DrawerHeader>

        <div class="p-6 space-y-2 flex-1">
          <nav class="space-y-2">
            <a href="#" class="flex items-center px-4 py-3 text-sm font-medium text-gray-900 dark:text-white rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border border-violet-200 dark:border-violet-800 hover:from-violet-100 hover:to-purple-100 dark:hover:from-violet-900/30 dark:hover:to-purple-900/30 transition-all duration-300 group">
              <svg class="w-5 h-5 mr-3 text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
              </svg>
              Dashboard
            </a>

            <a href="#" class="flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 hover:text-gray-900 dark:hover:text-white transition-all duration-300 group">
              <svg class="w-5 h-5 mr-3 text-blue-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Team Management
            </a>

            <a href="#" class="flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 dark:hover:from-emerald-900/20 dark:hover:to-green-900/20 hover:text-gray-900 dark:hover:text-white transition-all duration-300 group">
              <svg class="w-5 h-5 mr-3 text-emerald-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Analytics Hub
            </a>

            <a href="#" class="flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-900/20 dark:hover:to-red-900/20 hover:text-gray-900 dark:hover:text-white transition-all duration-300 group">
              <svg class="w-5 h-5 mr-3 text-orange-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              System Settings
            </a>

            <a href="#" class="flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 dark:hover:from-pink-900/20 dark:hover:to-rose-900/20 hover:text-gray-900 dark:hover:text-white transition-all duration-300 group">
              <svg class="w-5 h-5 mr-3 text-pink-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              Help & Support
            </a>
          </nav>
        </div>

        <DrawerFooter>
          <button
            (click)="closeLeftDrawer()"
            class="w-full px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-900 dark:text-white font-medium rounded-xl hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300">
            Close Navigation
          </button>
        </DrawerFooter>
      </Drawer>

      <!-- Right Drawer -->
      <Drawer [open]="rightDrawer()" direction="right" [dismissible]="true" (openChange)="rightDrawer.set($event)">
        <DrawerHeader>
          <DrawerTitle>🛒 Shopping Cart</DrawerTitle>
          <DrawerDescription>
            Review your amazing selections before checkout
          </DrawerDescription>
        </DrawerHeader>

        <div class="p-6 space-y-4 flex-1">
          <div class="space-y-4">
            <div class="flex items-center space-x-4 p-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl border border-violet-200 dark:border-violet-800">
              <div class="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-gray-900 dark:text-white">Angular SuperUI Pro</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Complete component library</p>
                <p class="text-2xl font-bold text-violet-600 dark:text-violet-400 mt-1">$99.99</p>
              </div>
              <button class="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 p-2 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>

            <div class="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-gray-900 dark:text-white">Premium Documentation</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Complete guides & examples</p>
                <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">$29.99</p>
              </div>
              <button class="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 p-2 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>

            <div class="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-gray-900 dark:text-white">Priority Support</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">24/7 expert assistance</p>
                <p class="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">$49.99</p>
              </div>
              <button class="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 p-2 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="border-t border-gray-200 dark:border-gray-600 pt-4">
            <div class="flex justify-between items-center mb-4">
              <span class="text-gray-600 dark:text-gray-400">Subtotal:</span>
              <span class="font-semibold text-gray-900 dark:text-white">$179.97</span>
            </div>
            <div class="flex justify-between items-center mb-4">
              <span class="text-gray-600 dark:text-gray-400">Discount (20%):</span>
              <span class="font-semibold text-emerald-600 dark:text-emerald-400">-$35.99</span>
            </div>
            <div class="flex justify-between items-center text-xl font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-600 pt-4">
              <span>Total:</span>
              <span class="text-violet-600 dark:text-violet-400">$143.98</span>
            </div>
          </div>
        </div>

        <DrawerFooter>
          <div class="space-y-3">
            <button class="w-full px-4 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              🚀 Complete Purchase
            </button>
            <button
              (click)="closeRightDrawer()"
              class="w-full px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-900 dark:text-white font-medium rounded-xl hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300">
              Continue Shopping
            </button>
          </div>
        </DrawerFooter>
      </Drawer>
    </div>

    <!-- Custom CSS for animations -->
    <style>
      @keyframes gradient-x {
        0%, 100% {
          background-size: 200% 200%;
          background-position: left center;
        }
        50% {
          background-size: 200% 200%;
          background-position: right center;
        }
      }

      .animate-gradient-x {
        animation: gradient-x 3s ease infinite;
      }

      .animation-delay-500 {
        animation-delay: 0.5s;
      }

      .animation-delay-1000 {
        animation-delay: 1s;
      }

      .animation-delay-2000 {
        animation-delay: 2s;
      }
    </style>
  `
})
export class DrawerDemoComponent implements OnInit {
  private seoService = inject(SEOService);

  // Drawer state signals
  bottomDrawer = signal(false);
  topDrawer = signal(false);
  leftDrawer = signal(false);
  rightDrawer = signal(false);

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'Drawer Component - Angular SuperUI',
      description: 'Explore the versatile drawer component with smooth animations, accessibility features, and multiple direction options. Perfect for navigation menus, shopping carts, and content panels.',
      keywords: 'angular, drawer, slide-out, panel, navigation, sidebar, modal, component, ui, animation'
    });
  }

  // Bottom drawer controls
  openBottomDrawer() {
    this.bottomDrawer.set(true);
  }

  closeBottomDrawer() {
    this.bottomDrawer.set(false);
  }

  // Top drawer controls
  openTopDrawer() {
    this.topDrawer.set(true);
  }

  closeTopDrawer() {
    this.topDrawer.set(false);
  }

  // Left drawer controls
  openLeftDrawer() {
    this.leftDrawer.set(true);
  }

  closeLeftDrawer() {
    this.leftDrawer.set(false);
  }

  // Right drawer controls
  openRightDrawer() {
    this.rightDrawer.set(true);
  }

  closeRightDrawer() {
    this.rightDrawer.set(false);
  }
}
