import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AspectRatio, type AspectRatioPredefined } from '@lib/aspect-ratio';
import { SEOService } from '../services/seo.service';
import {
  LucideAngularModule,
  PlayIcon,
  SquareIcon,
  CameraIcon,
  MonitorIcon,
  SmartphoneIcon,
  PaletteIcon,
  CodeIcon,
  SparklesIcon,
  HeartIcon
} from 'lucide-angular';

@Component({
  selector: 'app-aspect-ratio-demo',
  standalone: true,
  imports: [CommonModule, AspectRatio, LucideAngularModule],
  template: `
    <!-- Masterpiece Gallery: AspectRatio Component -->
    <div class="min-h-screen w-full bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-amber-950/10 dark:to-red-950/10 relative overflow-hidden">

      <!-- Renaissance Background Pattern -->
      <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]">
        <div class="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-orange-200/20 dark:from-amber-800/10 dark:to-orange-800/10"></div>
      </div>

      <!-- Floating Art Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-32 h-32 opacity-10">
          <div class="w-full h-full border-8 border-amber-400 rounded-full animate-spin-slow"></div>
        </div>
        <div class="absolute top-40 right-20 w-24 h-24 opacity-10">
          <div class="w-full h-full bg-gradient-to-br from-red-400 to-orange-400 transform rotate-45 animate-pulse"></div>
        </div>
        <div class="absolute bottom-32 left-1/4 w-20 h-20 opacity-10">
          <div class="w-full h-full border-4 border-orange-400 transform rotate-12 animate-bounce-slow"></div>
        </div>
      </div>

      <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">

        <!-- Museum Header -->
        <div class="text-center mb-20">
          <div class="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-100/80 to-orange-100/80 dark:from-amber-900/40 dark:to-orange-900/40 border-2 border-amber-200/60 dark:border-amber-700/60 text-amber-800 dark:text-amber-200 text-sm font-medium mb-8 backdrop-blur-sm shadow-lg">
            <lucide-angular [img]="PaletteIcon" class="w-5 h-5 mr-3"></lucide-angular>
            ✨ Museum of Perfect Proportions ✨
          </div>

          <h1 class="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            <span class="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent drop-shadow-sm">
              AspectRatio
            </span>
            <br>
            <span class="text-4xl sm:text-5xl lg:text-6xl text-amber-800 dark:text-amber-200 font-serif italic">
              Renaissance
            </span>
          </h1>

          <p class="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed mb-16 font-light">
            "Simplicity is the ultimate sophistication" — Leonardo da Vinci
            <br>
            <span class="text-lg text-amber-700 dark:text-amber-300 font-medium">
              Experience perfect proportions with Tailwind's aspect-ratio utilities
            </span>
          </p>

          <!-- Art Stats Gallery -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            <div class="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-amber-200/60 dark:border-amber-700/60 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div class="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">7+</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Masterful Ratios</div>
              <div class="w-8 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
            </div>

            <div class="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-orange-200/60 dark:border-orange-700/60 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div class="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">∞</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Custom Proportions</div>
              <div class="w-8 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
            </div>

            <div class="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-200/60 dark:border-red-700/60 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div class="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">φ</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Golden Ratio</div>
              <div class="w-8 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
            </div>

            <div class="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200/60 dark:border-pink-700/60 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div class="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">0kb</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Runtime CSS</div>
              <div class="w-8 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
            </div>
          </div>
        </div>

        <!-- Renaissance Gallery Grid -->
        <section class="mb-24">
          <div class="text-center mb-16">
            <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
              🎨 The Gallery of Proportions
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
              Each artwork demonstrates the perfect harmony achieved through precise aspect ratios
            </p>
          </div>

          <!-- Master Gallery Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto px-4">

            <div class="flex flex-col gap-4 ">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <lucide-angular [img]="PlayIcon" class="w-6 h-6 text-white"></lucide-angular>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Cinematic Vision</h3>
                  <p class="text-indigo-600 dark:text-indigo-400 font-medium">16:9 • Video Format</p>
                </div>
              </div>

              <AspectRatio [ratio]="'video'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl transition-all duration-500'">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop&crop=center"
                  alt="Cinematic landscape in perfect 16:9 ratio"
                  class="w-full h-full object-cover transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div class="text-white">
                    <p class="font-bold text-lg mb-1">Perfect for Cinema</p>
                    <p class="text-sm opacity-90">Widescreen excellence</p>
                  </div>
                </div>
              </AspectRatio>
            </div>

            <!-- Square Perfection -->
            <div class="flex flex-col gap-4">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <lucide-angular [img]="SquareIcon" class="w-6 h-6 text-white"></lucide-angular>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Perfect Balance</h3>
                  <p class="text-emerald-600 dark:text-emerald-400 font-medium">1:1 • Square Harmony</p>
                </div>
              </div>

              <AspectRatio [ratio]="'square'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl transition-all duration-500'">
                <img
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&h=700&fit=crop&crop=center"
                  alt="Perfect square composition"
                  class="w-full h-full object-cover transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div class="text-white text-center bg-black/40 backdrop-blur-sm rounded-2xl p-4">
                    <p class="font-bold text-lg mb-1">Instagram Perfect</p>
                    <p class="text-sm opacity-90">1:1 Symmetry</p>
                  </div>
                </div>
              </AspectRatio>
            </div>

            <!-- Golden Ratio Masterpiece -->
            <div class="flex flex-col gap-4">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <span class="text-white font-bold text-xl">φ</span>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Divine Proportion</h3>
                  <p class="text-amber-600 dark:text-amber-400 font-medium">1.618:1 • Golden Ratio</p>
                </div>
              </div>

              <AspectRatio [customRatio]="'1.618'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl transition-all duration-500'">
                <img
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&h=433&fit=crop&crop=center"
                  alt="Nature following the golden ratio"
                  class="w-full h-full object-cover transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-tr from-amber-500/30 via-transparent to-yellow-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div class="text-white text-center bg-black/40 backdrop-blur-sm rounded-2xl p-6">
                    <div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <span class="text-white font-bold text-2xl">φ</span>
                    </div>
                    <p class="font-bold text-lg mb-1">Mathematical Beauty</p>
                    <p class="text-sm opacity-90">Nature's Perfect Ratio</p>
                  </div>
                </div>
              </AspectRatio>
            </div>

            <!-- Photo Classic -->
            <div class="flex flex-col gap-4">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <lucide-angular [img]="CameraIcon" class="w-6 h-6 text-white"></lucide-angular>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Classic Photography</h3>
                  <p class="text-blue-600 dark:text-blue-400 font-medium">4:3 • Traditional Format</p>
                </div>
              </div>

              <AspectRatio [ratio]="'photo'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl transition-all duration-500'">
                <img
                  src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=450&fit=crop&crop=center"
                  alt="Classic 4:3 photography composition"
                  class="w-full h-full object-cover transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-bl from-blue-500/20 via-transparent to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div class="text-white">
                    <p class="font-bold text-lg mb-1">Timeless Standard</p>
                    <p class="text-sm opacity-90">4:3 Classic</p>
                  </div>
                </div>
              </AspectRatio>
            </div>

            <!-- Ultra-wide Cinema -->
            <div class="flex flex-col gap-4">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <lucide-angular [img]="MonitorIcon" class="w-6 h-6 text-white"></lucide-angular>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Cinematic Ultra-wide</h3>
                  <p class="text-purple-600 dark:text-purple-400 font-medium">21:9 • Epic Format</p>
                </div>
              </div>

              <AspectRatio [ratio]="'wide'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl transition-all duration-500'">
                <img
                  src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=900&h=386&fit=crop&crop=center"
                  alt="Ultra-wide cinematic landscape"
                  class="w-full h-full object-cover transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-transparent to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div class="text-white text-center bg-black/40 backdrop-blur-sm rounded-2xl p-6">
                    <p class="font-bold text-xl mb-2">Epic Proportions</p>
                    <p class="text-sm opacity-90">21:9 Ultra-wide Excellence</p>
                  </div>
                </div>
              </AspectRatio>
            </div>

            <!-- Mobile Stories -->
            <div class="flex flex-col gap-4">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <lucide-angular [img]="SmartphoneIcon" class="w-6 h-6 text-white"></lucide-angular>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Mobile Stories</h3>
                  <p class="text-rose-600 dark:text-rose-400 font-medium">9:16 • Vertical Stories</p>
                </div>
              </div>

              <div class="w-full max-w-xs mx-auto">
                <AspectRatio [ratio]="'stories'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl transition-all duration-500'">
                  <img
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=450&h=800&fit=crop&crop=center"
                    alt="Vertical mobile story format"
                    class="w-full h-full object-cover transition-transform duration-700"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-rose-500/40 via-transparent to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div class="text-white text-center bg-black/40 backdrop-blur-sm rounded-2xl p-4">
                      <p class="font-bold text-lg mb-1">Stories Perfect</p>
                      <p class="text-sm opacity-90">9:16 Mobile</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>

          </div>
        </section>

        <!-- Implementation Showcase -->
        <section class="mb-20 px-4">
          <div class="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 lg:p-8 border border-gray-700/50 shadow-2xl max-w-7xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-4xl font-bold text-white mb-6 flex items-center justify-center">
                <lucide-angular [img]="CodeIcon" class="w-10 h-10 mr-4"></lucide-angular>
                Masterful Implementation
              </h2>
              <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                Simple, elegant code that creates perfect proportions every time
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Predefined Ratios -->
              <div class="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
                <h3 class="text-xl font-bold text-white mb-4 flex items-center">
                  <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                  Predefined Ratios
                </h3>
                <div class="bg-gray-900/80 rounded-xl p-4 font-mono text-sm">
                  <div class="text-gray-400 mb-2">// Perfect for common use cases</div>
                  <div class="text-blue-300">&lt;AspectRatio</div>
                  <div class="text-green-300 ml-4">[ratio]="'video'"</div>
                  <div class="text-gray-300 ml-4">[customClasses]="'rounded-lg'"</div>
                  <div class="text-blue-300">&gt;</div>
                  <div class="text-gray-300 ml-4">&lt;img src="..." /&gt;</div>
                  <div class="text-blue-300">&lt;/AspectRatio&gt;</div>
                </div>
              </div>

              <!-- Custom Ratios -->
              <div class="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
                <h3 class="text-xl font-bold text-white mb-4 flex items-center">
                  <span class="w-3 h-3 bg-amber-500 rounded-full mr-3"></span>
                  Custom Ratios
                </h3>
                <div class="bg-gray-900/80 rounded-xl p-4 font-mono text-sm">
                  <div class="text-gray-400 mb-2">// Any ratio you need</div>
                  <div class="text-blue-300">&lt;AspectRatio</div>
                  <div class="text-yellow-300 ml-4">[customRatio]="'1.618'"</div>
                  <div class="text-gray-300 ml-4">[customClasses]="'rounded-lg'"</div>
                  <div class="text-blue-300">&gt;</div>
                  <div class="text-gray-300 ml-4">&lt;img src="..." /&gt;</div>
                  <div class="text-blue-300">&lt;/AspectRatio&gt;</div>
                </div>
              </div>
            </div>

            <!-- CSS Output -->
            <div class="mt-8 bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
              <h3 class="text-xl font-bold text-white mb-4 flex items-center">
                <span class="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                Generated CSS Classes
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-mono">
                <div class="bg-gray-900/80 rounded-xl p-4">
                  <div class="text-blue-300 mb-2">Predefined</div>
                  <div class="text-gray-300">aspect-video</div>
                  <div class="text-gray-300">aspect-square</div>
                  <div class="text-gray-300">aspect-[4/3]</div>
                </div>
                <div class="bg-gray-900/80 rounded-xl p-4">
                  <div class="text-yellow-300 mb-2">Custom</div>
                  <div class="text-gray-300">aspect-[1.618]</div>
                  <div class="text-gray-300">aspect-[21/9]</div>
                  <div class="text-gray-300">aspect-[9/16]</div>
                </div>
                <div class="bg-gray-900/80 rounded-xl p-4">
                  <div class="text-green-300 mb-2">Always Applied</div>
                  <div class="text-gray-300">relative</div>
                  <div class="text-gray-300">overflow-hidden</div>
                  <div class="text-gray-300">w-full</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!--Documentation Link-->
        <section class="mb-20 px-4">
          <div class="max-w-4xl mx-auto">
            <div class="bg-gradient-to-br from-white/95 via-amber-50/90 to-orange-50/95 dark:from-gray-800/95 dark:via-amber-950/20 dark:to-orange-950/20 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border-2 border-amber-200/60 dark:border-amber-700/60 shadow-2xl relative overflow-hidden">

              <!-- Decorative Background Elements -->
              <div class="absolute inset-0 opacity-[0.05] dark:opacity-[0.08]">
                <div class="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl transform rotate-12"></div>
                <div class="absolute bottom-6 left-6 w-16 h-16 border-4 border-amber-400 rounded-full"></div>
              </div>

              <div class="relative z-10 text-center">
                <!-- Header -->
                <div class="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-100/80 to-orange-100/80 dark:from-amber-900/40 dark:to-orange-900/40 border-2 border-amber-200/60 dark:border-amber-700/60 text-amber-800 dark:text-amber-200 text-sm font-medium mb-8 backdrop-blur-sm shadow-lg">
                  <lucide-angular [img]="CodeIcon" class="w-5 h-5 mr-3"></lucide-angular>
                  📖 Complete Documentation
                </div>

                <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
                  Master the <span class="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">AspectRatio</span>
                </h2>

                <p class="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                  Dive deeper into the AspectRatio component with comprehensive guides, advanced examples,
                  and implementation details. Everything you need to create perfect proportions.
                </p>

                <!-- Documentation Link Button -->
                <a
                  href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/aspect-ratio.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-amber-400/50 hover:border-amber-300"
                >
                  <lucide-angular [img]="CodeIcon" class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300"></lucide-angular>
                  View Documentation
                  <svg class="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>

                <!-- Feature Highlights -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                  <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/60 dark:border-amber-700/60 hover:scale-105 transition-all duration-300">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <lucide-angular [img]="CodeIcon" class="w-6 h-6 text-white"></lucide-angular>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">API Reference</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Complete props, methods, and configuration options</p>
                  </div>

                  <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/60 dark:border-amber-700/60 hover:scale-105 transition-all duration-300">
                    <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <lucide-angular [img]="SparklesIcon" class="w-6 h-6 text-white"></lucide-angular>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Examples</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Real-world usage patterns and best practices</p>
                  </div>

                  <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/60 dark:border-amber-700/60 hover:scale-105 transition-all duration-300">
                    <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <lucide-angular [img]="HeartIcon" class="w-6 h-6 text-white"></lucide-angular>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Customization</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Styling guides and theming instructions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>

    <!-- Custom Styles for Renaissance Animations -->
    <style>
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes bounce-slow {
        0%, 100% { transform: translateY(0) rotate(12deg); }
        50% { transform: translateY(-10px) rotate(12deg); }
      }
      .animate-spin-slow {
        animation: spin-slow 20s linear infinite;
      }
      .animate-bounce-slow {
        animation: bounce-slow 3s ease-in-out infinite;
      }
      .animation-delay-1000 {
        animation-delay: 1s;
      }
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      .shadow-3xl {
        box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
      }
    </style>
  `,
})
export class AspectRatioDemo {
  private seoService = inject(SEOService);

  // Lucide icons
  readonly PlayIcon = PlayIcon;
  readonly SquareIcon = SquareIcon;
  readonly CameraIcon = CameraIcon;
  readonly MonitorIcon = MonitorIcon;
  readonly SmartphoneIcon = SmartphoneIcon;
  readonly PaletteIcon = PaletteIcon;
  readonly CodeIcon = CodeIcon;
  readonly SparklesIcon = SparklesIcon;
  readonly HeartIcon = HeartIcon;

  constructor() {
    this.seoService.updateSEO({
      title: 'AspectRatio Component - Renaissance Gallery | Angular SuperUI',
      description: 'Experience the art of perfect proportions with our AspectRatio component. Create responsive layouts with predefined and custom aspect ratios using Tailwind CSS utilities.',
      keywords: 'angular, aspect ratio, responsive design, tailwind css, component library, ui components, proportions, layout'
    });
  }
}
