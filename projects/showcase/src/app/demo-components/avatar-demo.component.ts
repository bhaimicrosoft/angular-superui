import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Avatar, AvatarImage, AvatarFallback } from '@lib/components/avatar';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [CommonModule, Avatar, AvatarImage, AvatarFallback],
  template: `
    <!-- Hero Section -->
    <div class="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-900 dark:via-violet-950/20 dark:to-purple-950/20">
      <!-- Background Effects -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-400/10 to-purple-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-fuchsia-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-fuchsia-400/5 to-violet-400/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <!-- Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-200/50 dark:border-violet-800/50 text-violet-700 dark:text-violet-300 text-sm font-medium mb-6">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"/>
            </svg>
            User Profile Display
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            <span class="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Avatar
            </span>
            <br>
            Component
          </h1>

          <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Modern, accessible avatar component with smart image loading and graceful fallbacks
          </p>
        </div>

        <!-- Feature Highlights -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto">
          <div class="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div class="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Signal-Based</span>
          </div>

          <div class="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Smart Loading</span>
          </div>

          <div class="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div class="w-10 h-10 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Responsive</span>
          </div>

          <div class="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div class="w-10 h-10 bg-gradient-to-r from-violet-500 to-violet-600 rounded-lg flex items-center justify-center mx-auto mb-2">
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

          <!-- Size Variants Section -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Size Variants</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Multiple size options from small to extra large for every use case
            </p>

            <div class="flex flex-wrap items-end justify-center gap-8 p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50">
              <!-- Small Avatar -->
              <div class="text-center">
                <Avatar size="sm" className="mb-3 mx-auto ring-2 ring-violet-200 dark:ring-violet-800 ring-offset-2 dark:ring-offset-gray-900 transition-all duration-300 hover:ring-violet-400 dark:hover:ring-violet-600">
                  <AvatarImage src="https://picsum.photos/seed/user1/150/150" alt="Small Avatar" />
                  <AvatarFallback size="sm">SM</AvatarFallback>
                </Avatar>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Small</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">32px</p>
              </div>

              <!-- Medium Avatar -->
              <div class="text-center">
                <Avatar size="md" className="mb-3 mx-auto ring-2 ring-purple-200 dark:ring-purple-800 ring-offset-2 dark:ring-offset-gray-900 transition-all duration-300 hover:ring-purple-400 dark:hover:ring-purple-600">
                  <AvatarImage src="https://picsum.photos/seed/user2/150/150" alt="Medium Avatar" />
                  <AvatarFallback size="md">MD</AvatarFallback>
                </Avatar>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Medium</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">40px</p>
              </div>

              <!-- Large Avatar -->
              <div class="text-center">
                <Avatar size="lg" className="mb-3 mx-auto ring-2 ring-fuchsia-200 dark:ring-fuchsia-800 ring-offset-2 dark:ring-offset-gray-900 transition-all duration-300 hover:ring-fuchsia-400 dark:hover:ring-fuchsia-600">
                  <AvatarImage src="https://picsum.photos/seed/user3/150/150" alt="Large Avatar" />
                  <AvatarFallback size="lg">LG</AvatarFallback>
                </Avatar>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Large</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">48px</p>
              </div>

              <!-- Extra Large Avatar -->
              <div class="text-center">
                <Avatar size="xl" className="mb-3 mx-auto ring-2 ring-pink-200 dark:ring-pink-800 ring-offset-2 dark:ring-offset-gray-900 transition-all duration-300 hover:ring-pink-400 dark:hover:ring-pink-600">
                  <AvatarImage src="https://picsum.photos/seed/user4/150/150" alt="Extra Large Avatar" />
                  <AvatarFallback size="xl">XL</AvatarFallback>
                </Avatar>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Extra Large</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">64px</p>
              </div>

              <!-- 2X Large Avatar -->
              <div class="text-center">
                <Avatar size="2xl" className="mb-3 mx-auto ring-2 ring-rose-200 dark:ring-rose-800 ring-offset-2 dark:ring-offset-gray-900 transition-all duration-300 hover:ring-rose-400 dark:hover:ring-rose-600">
                  <AvatarImage src="https://picsum.photos/seed/user5/150/150" alt="2X Large Avatar" />
                  <AvatarFallback size="2xl">2XL</AvatarFallback>
                </Avatar>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">2X Large</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">80px</p>
              </div>
            </div>
          </section>

          <!-- Shape Variants Section -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Shape Variants</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Choose between classic circular or modern square avatars to match your design aesthetic
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <!-- Circle Avatars -->
              <div class="p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Circle Shape</h3>
                <div class="flex flex-wrap items-center justify-center gap-6">
                  <div class="text-center">
                    <Avatar shape="circle" size="lg" className="mb-3 mx-auto ring-2 ring-violet-200 dark:ring-violet-800 ring-offset-2 dark:ring-offset-gray-900 transition-all duration-300 hover:ring-violet-400 dark:hover:ring-violet-600">
                      <AvatarImage src="https://avatars.githubusercontent.com/u/1?v=4" alt="Circle Avatar with Image" />
                      <AvatarFallback shape="circle" size="lg" className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">CI</AvatarFallback>
                    </Avatar>
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300">With Image</p>
                  </div>

                  <div class="text-center">
                    <Avatar shape="circle" size="lg" className="mb-3 mx-auto ring-2 ring-blue-200 dark:ring-blue-800 ring-offset-2 dark:ring-offset-gray-900 transition-all duration-300 hover:ring-blue-400 dark:hover:ring-blue-600">
                      <AvatarFallback shape="circle" size="lg" className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">CF</AvatarFallback>
                    </Avatar>
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Fallback Only</p>
                  </div>

                  <div class="text-center">
                    <Avatar shape="circle" size="lg" className="mb-3 mx-auto ring-2 ring-emerald-200 dark:ring-emerald-800 ring-offset-2 dark:ring-offset-gray-900 transition-all duration-300 hover:ring-emerald-400 dark:hover:ring-emerald-600">
                      <AvatarFallback shape="circle" size="lg" className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                        </svg>
                      </AvatarFallback>
                    </Avatar>
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Icon Fallback</p>
                  </div>
                </div>
              </div>

              <!-- Square Avatars -->
              <div class="p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Square Shape</h3>
                <div class="flex flex-wrap items-center justify-center gap-6">
                  <div class="text-center">
                    <Avatar shape="square" size="lg" className="mb-3 mx-auto ring-2 ring-pink-200 dark:ring-pink-800 ring-offset-2 dark:ring-offset-gray-900 transition-all duration-300 hover:ring-pink-400 dark:hover:ring-pink-600">
                      <AvatarImage src="https://picsum.photos/seed/square1/150/150" alt="Square Avatar with Image" />
                      <AvatarFallback shape="square" size="lg" className="bg-gradient-to-br from-pink-500 to-rose-600 text-white">SI</AvatarFallback>
                    </Avatar>
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300">With Image</p>
                  </div>

                  <div class="text-center">
                    <Avatar shape="square" size="lg" className="mb-3 mx-auto ring-2 ring-orange-200 dark:ring-orange-800 ring-offset-2 dark:ring-offset-gray-900 transition-all duration-300 hover:ring-orange-400 dark:hover:ring-orange-600">
                      <AvatarFallback shape="square" size="lg" className="bg-gradient-to-br from-orange-500 to-red-600 text-white">SF</AvatarFallback>
                    </Avatar>
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Fallback Only</p>
                  </div>

                  <div class="text-center">
                    <Avatar shape="square" size="lg" className="mb-3 mx-auto ring-2 ring-purple-200 dark:ring-purple-800 ring-offset-2 dark:ring-offset-gray-900 transition-all duration-300 hover:ring-purple-400 dark:hover:ring-purple-600">
                      <AvatarFallback shape="square" size="lg" className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                      </AvatarFallback>
                    </Avatar>
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Icon Fallback</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- User Profiles Section -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">User Profiles</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Perfect for user profiles, contact lists, and member directories
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <!-- Profile Card 1 -->
              <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-xl hover:scale-105 group">
                <div class="flex items-center space-x-4">
                  <Avatar size="lg" className="group-hover:scale-110 transition-transform duration-300">
                    <AvatarImage src="https://picsum.photos/seed/profile1/150/150" alt="Sarah Johnson" />
                    <AvatarFallback size="lg" className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">SJ</AvatarFallback>
                  </Avatar>
                  <div class="flex-1 text-left">
                    <h3 class="font-semibold text-lg text-gray-900 dark:text-white">Sarah Johnson</h3>
                    <p class="text-violet-600 dark:text-violet-400 text-sm font-medium">Product Designer</p>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">sarah&#64;company.com</p>
                  </div>
                </div>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span class="px-2 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 rounded-full text-xs">Design</span>
                  <span class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-xs">UI/UX</span>
                  <span class="px-2 py-1 bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-800 dark:text-fuchsia-300 rounded-full text-xs">Prototyping</span>
                </div>
              </div>

              <!-- Profile Card 2 -->
              <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-xl hover:scale-105 group">
                <div class="flex items-center space-x-4">
                  <Avatar size="lg" className="group-hover:scale-110 transition-transform duration-300">
                    <AvatarImage src="https://picsum.photos/seed/profile2/150/150" alt="Michael Chen" />
                    <AvatarFallback size="lg" className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">MC</AvatarFallback>
                  </Avatar>
                  <div class="flex-1 text-left">
                    <h3 class="font-semibold text-lg text-gray-900 dark:text-white">Michael Chen</h3>
                    <p class="text-blue-600 dark:text-blue-400 text-sm font-medium">Frontend Developer</p>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">michael&#64;company.com</p>
                  </div>
                </div>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs">Angular</span>
                  <span class="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-xs">TypeScript</span>
                  <span class="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 rounded-full text-xs">RxJS</span>
                </div>
              </div>

              <!-- Profile Card 3 -->
              <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-xl hover:scale-105 group">
                <div class="flex items-center space-x-4">
                  <Avatar size="lg" className="group-hover:scale-110 transition-transform duration-300">
                    <AvatarImage src="https://picsum.photos/seed/profile3/150/150" alt="Emma Rodriguez" />
                    <AvatarFallback size="lg" className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">ER</AvatarFallback>
                  </Avatar>
                  <div class="flex-1 text-left">
                    <h3 class="font-semibold text-lg text-gray-900 dark:text-white">Emma Rodriguez</h3>
                    <p class="text-emerald-600 dark:text-emerald-400 text-sm font-medium">Backend Engineer</p>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">emma&#64;company.com</p>
                  </div>
                </div>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span class="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-xs">Node.js</span>
                  <span class="px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full text-xs">PostgreSQL</span>
                  <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs">Docker</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Status Indicators Section -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Status Indicators</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Show user availability and status with elegant indicators
            </p>

            <div class="flex flex-wrap justify-center gap-8 p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50">
              <!-- Online Status -->
              <div class="text-center">
                <div class="relative mb-3">
                  <Avatar size="xl" className="mx-auto transition-all duration-300 hover:scale-110">
                    <AvatarImage src="https://picsum.photos/seed/status1/150/150" alt="Online User" />
                    <AvatarFallback size="xl" className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">ON</AvatarFallback>
                  </Avatar>
                  <div class="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800 animate-pulse"></div>
                </div>
                <p class="font-medium text-gray-900 dark:text-white">Online</p>
                <p class="text-sm text-green-600 dark:text-green-400">Available</p>
              </div>

              <!-- Away Status -->
              <div class="text-center">
                <div class="relative mb-3">
                  <Avatar size="xl" className="mx-auto transition-all duration-300 hover:scale-110">
                    <AvatarImage src="https://picsum.photos/seed/status2/150/150" alt="Away User" />
                    <AvatarFallback size="xl" className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white">AW</AvatarFallback>
                  </Avatar>
                  <div class="absolute bottom-1 right-1 w-4 h-4 bg-yellow-500 rounded-full ring-2 ring-white dark:ring-gray-800"></div>
                </div>
                <p class="font-medium text-gray-900 dark:text-white">Away</p>
                <p class="text-sm text-yellow-600 dark:text-yellow-400">Be right back</p>
              </div>

              <!-- Busy Status -->
              <div class="text-center">
                <div class="relative mb-3">
                  <Avatar size="xl" className="mx-auto transition-all duration-300 hover:scale-110">
                    <AvatarImage src="https://picsum.photos/seed/status3/150/150" alt="Busy User" />
                    <AvatarFallback size="xl" className="bg-gradient-to-br from-red-500 to-rose-600 text-white">BS</AvatarFallback>
                  </Avatar>
                  <div class="absolute bottom-1 right-1 w-4 h-4 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-800"></div>
                </div>
                <p class="font-medium text-gray-900 dark:text-white">Busy</p>
                <p class="text-sm text-red-600 dark:text-red-400">Do not disturb</p>
              </div>

              <!-- Offline Status -->
              <div class="text-center">
                <div class="relative mb-3">
                  <Avatar size="xl" className="mx-auto transition-all duration-300 hover:scale-110 opacity-75">
                    <AvatarImage src="https://picsum.photos/seed/status4/150/150" alt="Offline User" />
                    <AvatarFallback size="xl" className="bg-gradient-to-br from-gray-400 to-gray-600 text-white">OF</AvatarFallback>
                  </Avatar>
                  <div class="absolute bottom-1 right-1 w-4 h-4 bg-gray-400 dark:bg-gray-600 rounded-full ring-2 ring-white dark:ring-gray-800"></div>
                </div>
                <p class="font-medium text-gray-900 dark:text-white">Offline</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Last seen 2h ago</p>
              </div>
            </div>
          </section>

          <!-- Team Groups Section -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Team Groups</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Display multiple users with overlapping avatars and member counts
            </p>

            <div class="space-y-8 max-w-4xl mx-auto">
              <!-- Design Team -->
              <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-3xl border border-gray-200/50 dark:border-gray-700/50">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="font-semibold text-lg text-gray-900 dark:text-white">Design Team</h3>
                  <span class="text-sm text-gray-500 dark:text-gray-400">8 members</span>
                </div>
                <div class="flex items-center justify-center">
                  <div class="flex -space-x-3">
                    <Avatar size="lg" className="ring-2 ring-white dark:ring-gray-800 transition-all duration-300 hover:scale-110 hover:z-10 relative">
                      <AvatarImage src="https://picsum.photos/seed/team1/150/150" alt="Team Member 1" />
                      <AvatarFallback size="lg" className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">T1</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg" className="ring-2 ring-white dark:ring-gray-800 transition-all duration-300 hover:scale-110 hover:z-10 relative">
                      <AvatarImage src="https://picsum.photos/seed/team2/150/150" alt="Team Member 2" />
                      <AvatarFallback size="lg" className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">T2</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg" className="ring-2 ring-white dark:ring-gray-800 transition-all duration-300 hover:scale-110 hover:z-10 relative">
                      <AvatarImage src="https://picsum.photos/seed/team3/150/150" alt="Team Member 3" />
                      <AvatarFallback size="lg" className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">T3</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg" className="ring-2 ring-white dark:ring-gray-800 transition-all duration-300 hover:scale-110 hover:z-10 relative">
                      <AvatarImage src="https://picsum.photos/seed/team4/150/150" alt="Team Member 4" />
                      <AvatarFallback size="lg" className="bg-gradient-to-br from-pink-500 to-rose-600 text-white">T4</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg" className="ring-2 ring-white dark:ring-gray-800 transition-all duration-300 hover:scale-110 hover:z-10 relative">
                      <AvatarFallback size="lg" className="bg-gradient-to-br from-gray-500 to-gray-700 text-white font-bold">+4</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>

              <!-- Development Team -->
              <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-3xl border border-gray-200/50 dark:border-gray-700/50">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="font-semibold text-lg text-gray-900 dark:text-white">Development Team</h3>
                  <span class="text-sm text-gray-500 dark:text-gray-400">12 members</span>
                </div>
                <div class="flex items-center justify-center">
                  <div class="flex -space-x-3">
                    <Avatar size="lg" className="ring-2 ring-white dark:ring-gray-800 transition-all duration-300 hover:scale-110 hover:z-10 relative">
                      <AvatarImage src="https://picsum.photos/seed/dev1/150/150" alt="Dev Member 1" />
                      <AvatarFallback size="lg" className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white">D1</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg" className="ring-2 ring-white dark:ring-gray-800 transition-all duration-300 hover:scale-110 hover:z-10 relative">
                      <AvatarImage src="https://picsum.photos/seed/dev2/150/150" alt="Dev Member 2" />
                      <AvatarFallback size="lg" className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">D2</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg" className="ring-2 ring-white dark:ring-gray-800 transition-all duration-300 hover:scale-110 hover:z-10 relative">
                      <AvatarImage src="https://picsum.photos/seed/dev3/150/150" alt="Dev Member 3" />
                      <AvatarFallback size="lg" className="bg-gradient-to-br from-orange-500 to-red-600 text-white">D3</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg" className="ring-2 ring-white dark:ring-gray-800 transition-all duration-300 hover:scale-110 hover:z-10 relative">
                      <AvatarImage src="https://picsum.photos/seed/dev4/150/150" alt="Dev Member 4" />
                      <AvatarFallback size="lg" className="bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white">D4</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg" className="ring-2 ring-white dark:ring-gray-800 transition-all duration-300 hover:scale-110 hover:z-10 relative">
                      <AvatarFallback size="lg" className="bg-gradient-to-br from-indigo-500 to-purple-700 text-white font-bold">+8</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Fallback Examples Section -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Fallback Examples</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Beautiful fallbacks when images fail to load or are not provided
            </p>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <!-- Initials Fallback - Circle -->
              <div class="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:scale-105">
                <Avatar shape="circle" size="xl" className="mx-auto mb-4">
                  <AvatarImage src="https://broken-url-example.com/not-found.jpg" alt="Alex Brown" />
                  <AvatarFallback shape="circle" size="xl" className="bg-gradient-to-br from-violet-500 to-purple-600 text-white font-bold">AB</AvatarFallback>
                </Avatar>
                <p class="font-medium text-gray-900 dark:text-white">Alex Brown</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Circle Initials</p>
              </div>

              <!-- Initials Fallback - Square -->
              <div class="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:scale-105">
                <Avatar shape="square" size="xl" className="mx-auto mb-4">
                  <AvatarImage src="https://broken-url-example.com/not-found.jpg" alt="Kevin Smith" />
                  <AvatarFallback shape="square" size="xl" className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold">KS</AvatarFallback>
                </Avatar>
                <p class="font-medium text-gray-900 dark:text-white">Kevin Smith</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Square Initials</p>
              </div>

              <!-- Icon Fallback - Circle -->
              <div class="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:scale-105">
                <Avatar shape="circle" size="xl" className="mx-auto mb-4">
                  <AvatarImage src="https://broken-url-example.com/not-found.jpg" alt="Guest User" />
                  <AvatarFallback shape="circle" size="xl" className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                    </svg>
                  </AvatarFallback>
                </Avatar>
                <p class="font-medium text-gray-900 dark:text-white">Guest User</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Circle Icon</p>
              </div>

              <!-- Icon Fallback - Square -->
              <div class="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:scale-105">
                <Avatar shape="square" size="xl" className="mx-auto mb-4">
                  <AvatarImage src="https://broken-url-example.com/not-found.jpg" alt="Admin User" />
                  <AvatarFallback shape="square" size="xl" className="bg-gradient-to-br from-pink-500 to-rose-600 text-white">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </AvatarFallback>
                </Avatar>
                <p class="font-medium text-gray-900 dark:text-white">Admin User</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Square Icon</p>
              </div>
            </div>

            <!-- Shape Comparison -->
            <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div class="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Circle vs Square</h4>
                <div class="flex items-center justify-center gap-4">
                  <div class="text-center">
                    <Avatar shape="circle" size="2xl" className="mb-2">
                      <AvatarFallback shape="circle" size="2xl" className="bg-gradient-to-br from-violet-500 to-purple-600 text-white font-bold text-xl">JD</AvatarFallback>
                    </Avatar>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Circle</p>
                  </div>
                  <div class="text-center">
                    <Avatar shape="square" size="2xl" className="mb-2">
                      <AvatarFallback shape="square" size="2xl" className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-xl">JD</AvatarFallback>
                    </Avatar>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Square</p>
                  </div>
                </div>
              </div>

              <div class="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Fallback Coverage</h4>
                <div class="flex items-center justify-center gap-4">
                  <div class="text-center">
                    <Avatar shape="circle" size="2xl" className="mb-2">
                      <AvatarImage src="https://broken-url-example.com/not-found.jpg" alt="Full Coverage Test" />
                      <AvatarFallback shape="circle" size="2xl" className="bg-gradient-to-br from-red-500 to-pink-600 text-white font-bold">FC</AvatarFallback>
                    </Avatar>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Full Coverage</p>
                  </div>
                  <div class="text-center">
                    <Avatar shape="square" size="2xl" className="mb-2">
                      <AvatarImage src="https://broken-url-example.com/not-found.jpg" alt="Full Coverage Test" />
                      <AvatarFallback shape="square" size="2xl" className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold">FC</AvatarFallback>
                    </Avatar>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Full Coverage</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Pure Fallback Examples (No Images) -->
          <section class="text-center mt-16">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pure Fallback Examples</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              These avatars only use fallbacks - no images provided to ensure consistent fallback display
            </p>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              <!-- Circle Initials -->
              <div class="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <Avatar shape="circle" size="xl" className="mb-3 mx-auto">
                  <AvatarFallback shape="circle" size="xl" className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">AB</AvatarFallback>
                </Avatar>
                <p class="text-sm font-medium text-gray-900 dark:text-white">Circle Initials</p>
              </div>

              <!-- Square Initials -->
              <div class="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <Avatar shape="square" size="xl" className="mb-3 mx-auto">
                  <AvatarFallback shape="square" size="xl" className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold">SQ</AvatarFallback>
                </Avatar>
                <p class="text-sm font-medium text-gray-900 dark:text-white">Square Initials</p>
              </div>

              <!-- Circle Icon -->
              <div class="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <Avatar shape="circle" size="xl" className="mb-3 mx-auto">
                  <AvatarFallback shape="circle" size="xl" className="bg-gradient-to-br from-pink-500 to-rose-600 text-white">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                    </svg>
                  </AvatarFallback>
                </Avatar>
                <p class="text-sm font-medium text-gray-900 dark:text-white">Circle Icon</p>
              </div>

              <!-- Square Icon -->
              <div class="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <Avatar shape="square" size="xl" className="mb-3 mx-auto">
                  <AvatarFallback shape="square" size="xl" className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </AvatarFallback>
                </Avatar>
                <p class="text-sm font-medium text-gray-900 dark:text-white">Square Icon</p>
              </div>
            </div>
          </section>

          <!-- Interactive Demo Section -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Interactive Example</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Try different sizes and shapes to see the avatar component in action
            </p>

            <div class="max-w-4xl mx-auto">
              <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 dark:border-gray-700/50">
                <!-- Controls -->
                <div class="space-y-6 mb-8">
                  <!-- Size Controls -->
                  <div class="text-center">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Size</h4>
                    <div class="flex flex-wrap justify-center gap-3">
                      <button
                        *ngFor="let size of avatarSizes()"
                        (click)="setSelectedSize(size)"
                        [class]="'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ' +
                                 (selectedSize() === size
                                   ? 'bg-violet-600 text-white shadow-lg'
                                   : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600')"
                      >
                        {{ size.toUpperCase() }}
                      </button>
                    </div>
                  </div>

                  <!-- Shape Controls -->
                  <div class="text-center">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Shape</h4>
                    <div class="flex justify-center gap-3">
                      <button
                        *ngFor="let shape of avatarShapes()"
                        (click)="setSelectedShape(shape)"
                        [class]="'px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ' +
                                 (selectedShape() === shape
                                   ? 'bg-fuchsia-600 text-white shadow-lg'
                                   : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600')"
                      >
                        {{ shape }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Live Preview -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                  <!-- With Image -->
                  <div class="text-center">
                    <Avatar [size]="selectedSize()" [shape]="selectedShape()" className="mx-auto mb-3 transition-all duration-300">
                      <AvatarImage src="https://picsum.photos/seed/interactive/150/150" alt="Interactive Avatar" />
                      <AvatarFallback [size]="selectedSize()" [shape]="selectedShape()" className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">IA</AvatarFallback>
                    </Avatar>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">With Image</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Image loads successfully</p>
                  </div>

                  <!-- Fallback Only -->
                  <div class="text-center">
                    <Avatar [size]="selectedSize()" [shape]="selectedShape()" className="mx-auto mb-3 transition-all duration-300">
                      <AvatarFallback [size]="selectedSize()" [shape]="selectedShape()" className="bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white">FB</AvatarFallback>
                    </Avatar>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">Fallback Only</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">No image provided</p>
                  </div>

                  <!-- Broken Image -->
                  <div class="text-center">
                    <Avatar [size]="selectedSize()" [shape]="selectedShape()" className="mx-auto mb-3 transition-all duration-300">
                      <AvatarImage src="https://broken-url-example.com/not-found.jpg" alt="Broken Image Test" />
                      <AvatarFallback [size]="selectedSize()" [shape]="selectedShape()" className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">BI</AvatarFallback>
                    </Avatar>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">Broken Image</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Image fails to load</p>
                  </div>
                </div>

                <div class="text-center text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <p>Current settings: <span class="font-medium text-violet-600 dark:text-violet-400">{{ selectedSize() }}</span> size, <span class="font-medium text-fuchsia-600 dark:text-fuchsia-400">{{ selectedShape() }}</span> shape</p>
                  <p class="text-xs">Notice how the fallback perfectly covers the avatar area regardless of shape</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Code Example Section -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Usage Example</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Clean and simple API with TypeScript support and accessibility features
            </p>

            <div class="max-w-4xl mx-auto">
              <div class="bg-gray-900 dark:bg-gray-800 rounded-xl p-6 text-left">
                <div class="flex items-center mb-4">
                  <div class="flex space-x-2">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span class="ml-4 text-gray-400 text-sm">avatar-example.component.html</span>
                </div>
                <pre class="text-green-400 font-mono text-sm overflow-x-auto"><code>&lt;!-- Basic Avatar --&gt;
&lt;Avatar size="lg"&gt;
  &lt;AvatarImage src="/user-photo.jpg" alt="John Doe" /&gt;
  &lt;AvatarFallback size="lg"&gt;JD&lt;/AvatarFallback&gt;
&lt;/Avatar&gt;

&lt;!-- With Status Indicator --&gt;
&lt;div class="relative"&gt;
  &lt;Avatar size="xl"&gt;
    &lt;AvatarImage src="/user-photo.jpg" alt="Jane Smith" /&gt;
    &lt;AvatarFallback size="xl"&gt;JS&lt;/AvatarFallback&gt;
  &lt;/Avatar&gt;
  &lt;span class="absolute bottom-0 right-0 h-4 w-4 bg-green-500
               rounded-full ring-2 ring-white"&gt;&lt;/span&gt;
&lt;/div&gt;

&lt;!-- Team Group --&gt;
&lt;div class="flex -space-x-2"&gt;
  &lt;Avatar size="md" className="ring-2 ring-white"&gt;
    &lt;AvatarImage src="/member1.jpg" alt="Member 1" /&gt;
    &lt;AvatarFallback size="md"&gt;M1&lt;/AvatarFallback&gt;
  &lt;/Avatar&gt;
  &lt;Avatar size="md" className="ring-2 ring-white"&gt;
    &lt;AvatarImage src="/member2.jpg" alt="Member 2" /&gt;
    &lt;AvatarFallback size="md"&gt;M2&lt;/AvatarFallback&gt;
  &lt;/Avatar&gt;
  &lt;Avatar size="md" className="ring-2 ring-white"&gt;
    &lt;AvatarFallback size="md"&gt;+3&lt;/AvatarFallback&gt;
  &lt;/Avatar&gt;
&lt;/div&gt;</code></pre>
              </div>
            </div>
          </section>

          <!-- Documentation Section -->
          <section class="text-center">
            <div class="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-3xl p-12 text-white border border-violet-400/30 dark:border-slate-600/50 shadow-2xl">
              <h2 class="text-3xl font-bold mb-6 text-white">Ready to Build Beautiful Avatars?</h2>
              <p class="text-xl mb-8 text-violet-100 dark:text-slate-200 max-w-2xl mx-auto">
                Modern, signal-based avatar component with smart loading and graceful fallbacks
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
                <pre class="text-green-400 font-mono text-lg"><code>npx ngsui add avatar</code></pre>
              </div>

              <a
                href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/avatar.md"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-100 text-violet-700 dark:text-slate-800 font-bold text-lg rounded-2xl hover:bg-violet-50 dark:hover:bg-white transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
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
export class AvatarDemoComponent {

  // Available avatar sizes for interactive demo
  avatarSizes = signal<('sm' | 'md' | 'lg' | 'xl' | '2xl')[]>(['sm', 'md', 'lg', 'xl', '2xl']);

  // Available avatar shapes for interactive demo
  avatarShapes = signal<('circle' | 'square')[]>(['circle', 'square']);

  // Selected size for interactive demo
  selectedSize = signal<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('lg');

  // Selected shape for interactive demo
  selectedShape = signal<'circle' | 'square'>('circle');

  constructor(private seoService: SEOService) {
    this.seoService.updateSEO({
      title: 'Avatar Component - Angular SuperUI | Modern User Profile Display',
      description: 'Signal-based avatar component with smart image loading, graceful fallbacks, circle/square shapes, and multiple sizes. Perfect for user profiles, team displays, and status indicators.',
      keywords: 'Angular avatar, user profile, profile picture, avatar component, image fallback, status indicator, team display, Angular SuperUI, signal-based component, circle avatar, square avatar'
    });
  }

  setSelectedSize(size: 'sm' | 'md' | 'lg' | 'xl' | '2xl'): void {
    this.selectedSize.set(size);
  }

  setSelectedShape(shape: 'circle' | 'square'): void {
    this.selectedShape.set(shape);
  }
}
