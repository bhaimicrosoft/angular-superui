import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AspectRatio, type AspectRatioPredefined } from '@lib/aspect-ratio';
import { SEOService } from '../services/seo.service';
import { LucideAngularModule, PlayIcon, SquareIcon, CameraIcon, MonitorIcon, SmartphoneIcon, SparklesIcon, CodeIcon, PaletteIcon } from 'lucide-angular';

@Component({
  selector: 'app-aspect-ratio-demo',
  standalone: true,
  imports: [CommonModule, AspectRatio, LucideAngularModule],
  template: `
    <!-- Masterpiece Gallery: AspectRatio Component -->
    <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-amber-950/10 dark:to-red-950/10 relative overflow-hidden">
      
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

      <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        
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
          <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
            
            <!-- Video Masterpiece -->
            <div class="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 border-2 border-indigo-200/60 dark:border-indigo-700/60 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <lucide-angular [img]="PlayIcon" class="w-6 h-6 text-white"></lucide-angular>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Cinematic Vision</h3>
                  <p class="text-indigo-600 dark:text-indigo-400 font-medium">16:9 • Video Format</p>
                </div>
              </div>

              <AspectRatio [ratio]="'video'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl border-4 border-indigo-200/80 dark:border-indigo-700/80 group-hover:border-indigo-300 dark:group-hover:border-indigo-600 transition-all duration-500'">
                <img 
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop&crop=center" 
                  alt="Cinematic landscape in perfect 16:9 ratio" 
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div class="text-white">
                    <p class="font-bold text-lg mb-1">Perfect for Cinema</p>
                    <p class="text-sm opacity-90">Widescreen excellence</p>
                  </div>
                </div>
              </AspectRatio>

              <div class="mt-6 flex items-center justify-between">
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  <span class="font-medium">Ratio:</span> aspect-video
                </div>
                <div class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">
                  Predefined
                </div>
              </div>
            </div>

            <!-- Square Perfection -->
            <div class="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 border-2 border-emerald-200/60 dark:border-emerald-700/60 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <lucide-angular [img]="SquareIcon" class="w-6 h-6 text-white"></lucide-angular>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Perfect Balance</h3>
                  <p class="text-emerald-600 dark:text-emerald-400 font-medium">1:1 • Square Harmony</p>
                </div>
              </div>

              <AspectRatio [ratio]="'square'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl border-4 border-emerald-200/80 dark:border-emerald-700/80 group-hover:border-emerald-300 dark:group-hover:border-emerald-600 transition-all duration-500'">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616c0763c65?w=500&h=500&fit=crop&crop=face" 
                  alt="Perfect square portrait" 
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div class="text-white text-center bg-black/40 backdrop-blur-sm rounded-2xl p-4">
                    <p class="font-bold text-lg mb-1">Instagram Perfect</p>
                    <p class="text-sm opacity-90">1:1 Symmetry</p>
                  </div>
                </div>
              </AspectRatio>

              <div class="mt-6 flex items-center justify-between">
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  <span class="font-medium">Ratio:</span> aspect-square
                </div>
                <div class="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium">
                  Predefined
                </div>
              </div>
            </div>

            <!-- Golden Ratio Masterpiece -->
            <div class="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 border-2 border-amber-200/60 dark:border-amber-700/60 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <span class="text-white font-bold text-xl">φ</span>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Divine Proportion</h3>
                  <p class="text-amber-600 dark:text-amber-400 font-medium">1.618:1 • Golden Ratio</p>
                </div>
              </div>

              <AspectRatio [customRatio]="'1.618'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl border-4 border-amber-200/80 dark:border-amber-700/80 group-hover:border-amber-300 dark:group-hover:border-amber-600 transition-all duration-500'">
                <img 
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&h=433&fit=crop&crop=center" 
                  alt="Nature following the golden ratio" 
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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

              <div class="mt-6 flex items-center justify-between">
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  <span class="font-medium">Ratio:</span> aspect-[1.618]
                </div>
                <div class="px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full text-xs font-medium">
                  Custom
                </div>
              </div>
            </div>

            <!-- Photo Classic -->
            <div class="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 border-2 border-blue-200/60 dark:border-blue-700/60 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <lucide-angular [img]="CameraIcon" class="w-6 h-6 text-white"></lucide-angular>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Classic Photography</h3>
                  <p class="text-blue-600 dark:text-blue-400 font-medium">4:3 • Traditional Format</p>
                </div>
              </div>

              <AspectRatio [ratio]="'photo'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl border-4 border-blue-200/80 dark:border-blue-700/80 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all duration-500'">
                <img 
                  src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=450&fit=crop&crop=center" 
                  alt="Classic 4:3 photography composition" 
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-bl from-blue-500/20 via-transparent to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div class="text-white">
                    <p class="font-bold text-lg mb-1">Timeless Standard</p>
                    <p class="text-sm opacity-90">4:3 Classic</p>
                  </div>
                </div>
              </AspectRatio>

              <div class="mt-6 flex items-center justify-between">
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  <span class="font-medium">Ratio:</span> aspect-[4/3]
                </div>
                <div class="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                  Predefined
                </div>
              </div>
            </div>

            <!-- Ultra-wide Cinema -->
            <div class="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 border-2 border-purple-200/60 dark:border-purple-700/60 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <lucide-angular [img]="MonitorIcon" class="w-6 h-6 text-white"></lucide-angular>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Cinematic Ultra-wide</h3>
                  <p class="text-purple-600 dark:text-purple-400 font-medium">21:9 • Epic Format</p>
                </div>
              </div>

              <AspectRatio [ratio]="'wide'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl border-4 border-purple-200/80 dark:border-purple-700/80 group-hover:border-purple-300 dark:group-hover:border-purple-600 transition-all duration-500'">
                <img 
                  src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=900&h=386&fit=crop&crop=center" 
                  alt="Ultra-wide cinematic landscape" 
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-transparent to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div class="text-white text-center bg-black/40 backdrop-blur-sm rounded-2xl p-6">
                    <p class="font-bold text-xl mb-2">Epic Proportions</p>
                    <p class="text-sm opacity-90">21:9 Ultra-wide Excellence</p>
                  </div>
                </div>
              </AspectRatio>

              <div class="mt-6 flex items-center justify-between">
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  <span class="font-medium">Ratio:</span> aspect-[21/9]
                </div>
                <div class="px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                  Predefined
                </div>
              </div>
            </div>

            <!-- Mobile Stories -->
            <div class="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 border-2 border-rose-200/60 dark:border-rose-700/60 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <lucide-angular [img]="SmartphoneIcon" class="w-6 h-6 text-white"></lucide-angular>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Mobile Stories</h3>
                  <p class="text-rose-600 dark:text-rose-400 font-medium">9:16 • Vertical Stories</p>
                </div>
              </div>

              <div class="max-w-sm mx-auto">
                <AspectRatio [ratio]="'stories'" [customClasses]="'rounded-2xl overflow-hidden shadow-xl border-4 border-rose-200/80 dark:border-rose-700/80 group-hover:border-rose-300 dark:group-hover:border-rose-600 transition-all duration-500'">
                  <img 
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=450&h=800&fit=crop&crop=center" 
                    alt="Vertical mobile story format" 
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-rose-500/40 via-transparent to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div class="text-white text-center bg-black/40 backdrop-blur-sm rounded-2xl p-4">
                      <p class="font-bold text-lg mb-1">Stories Perfect</p>
                      <p class="text-sm opacity-90">9:16 Mobile</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>

              <div class="mt-6 flex items-center justify-between">
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  <span class="font-medium">Ratio:</span> aspect-[9/16]
                </div>
                <div class="px-3 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full text-xs font-medium">
                  Predefined
                </div>
              </div>
            </div>

          </div>
        </section>

        <!-- Implementation Showcase -->
        <section class="mb-20">
          <div class="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 lg:p-12 border border-gray-700/50 shadow-2xl">
            <div class="text-center mb-12">
              <div class="flex items-center justify-center mb-6">
                <lucide-angular [img]="CodeIcon" class="w-8 h-8 text-white mr-3"></lucide-angular>
                <h2 class="text-4xl font-bold text-white">
                  Masterful Implementation
                </h2>
              </div>
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
                <lucide-angular [img]="SparklesIcon" class="w-5 h-5 mr-3"></lucide-angular>
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

        <!-- Signature -->
        <div class="text-center">
          <div class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-100/80 to-orange-100/80 dark:from-amber-900/40 dark:to-orange-900/40 rounded-2xl border-2 border-amber-200/60 dark:border-amber-700/60 backdrop-blur-sm">
            <span class="text-2xl mr-3">🎨</span>
            <div class="text-amber-800 dark:text-amber-200">
              <div class="font-bold text-lg">Created with Passion</div>
              <div class="text-sm font-medium">Inspired by Renaissance Masters</div>
            </div>
          </div>
        </div>

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
  readonly SparklesIcon = SparklesIcon;
  readonly CodeIcon = CodeIcon;
  readonly PaletteIcon = PaletteIcon;

  constructor() {
    this.seoService.updateSEO({
      title: 'AspectRatio Component - Renaissance Gallery | Angular SuperUI',
      description: 'Experience the art of perfect proportions with our AspectRatio component. Create responsive layouts with predefined and custom aspect ratios using Tailwind CSS utilities.',
      keywords: 'angular, aspect ratio, responsive design, tailwind css, component library, ui components, proportions, layout'
    });
  }
}
