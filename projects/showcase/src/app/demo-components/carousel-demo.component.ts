import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Carousel } from '@lib/components/carousel';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-carousel-demo',
  standalone: true,
  imports: [CommonModule, Carousel],
  template: `
    <!-- Hero Section -->
    <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-950/20 dark:to-indigo-950/20">
      <!-- Background Effects -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <!-- Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50 dark:border-purple-800/50 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
            </svg>
            Interactive Image Carousel
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            <span class="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Carousel
            </span>
            <br>
            Component
          </h1>

          <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stunning image carousels with auto-play, touch gestures, responsive design, and full accessibility support
          </p>
        </div>

        <!-- Feature Highlights -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto">
          <div class="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Auto-Play</span>
          </div>

          <div class="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Touch Gestures</span>
          </div>

          <div class="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div class="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Responsive</span>
          </div>

          <div class="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Accessible</span>
          </div>
        </div>

        <!-- Main Demo Section -->
        <div class="space-y-20">

          <!-- Basic Carousel Demo -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Basic Image Carousel</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              A simple carousel with auto-play, navigation controls, and smooth transitions
            </p>

            <div class="max-w-4xl mx-auto mb-8">
              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <Carousel
                  [images]="basicImages()"
                  [width]="800"
                  [height]="400"
                  [interval]="4000"
                  size="lg"
                  aspectRatio="16:9"
                />
              </div>
            </div>

            <div class="bg-gray-900 dark:bg-gray-800 rounded-xl p-6 text-left max-w-3xl mx-auto">
              <div class="flex items-center mb-4">
                <div class="flex space-x-2">
                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span class="ml-4 text-gray-400 text-sm">carousel-basic.component.html</span>
              </div>
              <pre class="text-green-400 font-mono text-sm overflow-x-auto"><code>&lt;Carousel
  [images]="[
    'https://picsum.photos/800/400?random=1',
    'https://picsum.photos/800/400?random=2',
    'https://picsum.photos/800/400?random=3'
  ]"
  [width]="800"
  [height]="400"
  [interval]="4000"
  size="lg"
  aspectRatio="16:9"
/&gt;</code></pre>
            </div>
          </section>

          <!-- Responsive Carousel Demo -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Responsive Design</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Adapts perfectly to different screen sizes with configurable aspect ratios
            </p>

            <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">
              <!-- Mobile Size -->
              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mobile View (Small)</h3>
                <Carousel
                  [images]="landscapeImages()"
                  [interval]="3000"
                  size="sm"
                  aspectRatio="4:3"
                />
              </div>

              <!-- Desktop Size -->
              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Desktop View (Large)</h3>
                <Carousel
                  [images]="portraitImages()"
                  [interval]="5000"
                  size="lg"
                  aspectRatio="3:2"
                />
              </div>
            </div>
          </section>

          <!-- Interactive Demo -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Interactive Controls</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Add or remove images dynamically and see the carousel adapt in real-time
            </p>

            <div class="max-w-4xl mx-auto">
              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 mb-8">
                <!-- Control Buttons -->
                <div class="flex flex-wrap justify-center gap-4 mb-6">
                  <button
                    (click)="addRandomImage()"
                    class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    Add Image
                  </button>

                  <button
                    (click)="removeLastImage()"
                    [disabled]="dynamicImages().length <= 1"
                    class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                    </svg>
                    Remove Image
                  </button>

                  <button
                    (click)="resetImages()"
                    class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    Reset
                  </button>
                </div>

                <!-- Image Count Display -->
                <div class="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-4 mb-6">
                  <p class="text-lg font-semibold text-purple-800 dark:text-purple-200">
                    Total Images: <span class="text-2xl">{{ dynamicImages().length }}</span>
                  </p>
                </div>

                <!-- Dynamic Carousel -->
                <Carousel
                  [images]="dynamicImages()"
                  [interval]="6000"
                  size="lg"
                  aspectRatio="16:9"
                />
              </div>
            </div>
          </section>

          <!-- Aspect Ratio Variants -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Aspect Ratio Variants</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Choose from different aspect ratios to fit your design needs perfectly
            </p>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <!-- 16:9 Video -->
              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">16:9 (Video)</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Perfect for video content</p>
                <Carousel
                  [images]="basicImages()"
                  [interval]="3500"
                  size="md"
                  aspectRatio="16:9"
                />
              </div>

              <!-- 4:3 Traditional -->
              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">4:3 (Traditional)</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Classic photo format</p>
                <Carousel
                  [images]="landscapeImages()"
                  [interval]="4000"
                  size="md"
                  aspectRatio="4:3"
                />
              </div>

              <!-- 1:1 Square -->
              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">1:1 (Square)</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Instagram style</p>
                <Carousel
                  [images]="squareImages()"
                  [interval]="4500"
                  size="md"
                  aspectRatio="1:1"
                />
              </div>
            </div>
          </section>

          <!-- Performance Features -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Performance & Accessibility</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Built with performance and accessibility in mind, ensuring a great experience for everyone
            </p>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 text-center">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lazy Loading</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Images load only when needed for better performance</p>
              </div>

              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 text-center">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Touch Support</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Swipe gestures work seamlessly on mobile devices</p>
              </div>

              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 text-center">
                <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">WCAG Compliant</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Full keyboard navigation and screen reader support</p>
              </div>

              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 text-center">
                <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Responsive</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Adapts beautifully to any screen size or device</p>
              </div>
            </div>
          </section>

          <!-- Installation & Documentation -->
          <section class="text-center">
            <div class="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-3xl p-12 text-white border border-blue-400/30 dark:border-slate-600/50 shadow-2xl">
              <h2 class="text-3xl font-bold mb-6 text-white">Ready to Get Started?</h2>
              <p class="text-xl mb-8 text-blue-100 dark:text-slate-200 max-w-2xl mx-auto">
                Add beautiful, accessible carousels to your Angular application in minutes
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
                <pre class="text-green-400 font-mono text-lg"><code>npx ngsui-cli add carousel</code></pre>
              </div>

              <a
                href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/carousel.md"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-100 text-blue-700 dark:text-slate-800 font-bold text-lg rounded-2xl hover:bg-blue-50 dark:hover:bg-white transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
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
export class CarouselDemoComponent {

  // Basic carousel images
  basicImages = signal([
    'https://picsum.photos/800/400?random=1',
    'https://picsum.photos/800/400?random=2',
    'https://picsum.photos/800/400?random=3',
    'https://picsum.photos/800/400?random=4'
  ]);

  // Landscape images
  landscapeImages = signal([
    'https://picsum.photos/600/400?random=5',
    'https://picsum.photos/600/400?random=6',
    'https://picsum.photos/600/400?random=7'
  ]);

  // Portrait images
  portraitImages = signal([
    'https://picsum.photos/400/600?random=8',
    'https://picsum.photos/400/600?random=9',
    'https://picsum.photos/400/600?random=10'
  ]);

  // Square images
  squareImages = signal([
    'https://picsum.photos/400/400?random=11',
    'https://picsum.photos/400/400?random=12',
    'https://picsum.photos/400/400?random=13'
  ]);

  // Dynamic images for interactive demo
  dynamicImages = signal([
    'https://picsum.photos/800/400?random=14',
    'https://picsum.photos/800/400?random=15',
    'https://picsum.photos/800/400?random=16'
  ]);

  constructor(private seoService: SEOService) {
    this.seoService.updateSEO({
      title: 'Carousel Component - Angular SuperUI | Interactive Image Carousels',
      description: 'Stunning, accessible carousel component with auto-play, touch gestures, responsive design, and full keyboard navigation. Perfect for image galleries and content sliders.',
      keywords: 'Angular carousel, image slider, image gallery, auto-play carousel, responsive carousel, touch carousel, accessible carousel, Angular components'
    });
  }

  addRandomImage(): void {
    const randomId = Math.floor(Math.random() * 1000) + 100;
    const newImage = `https://picsum.photos/800/400?random=${randomId}`;
    this.dynamicImages.update(images => [...images, newImage]);
  }

  removeLastImage(): void {
    this.dynamicImages.update(images =>
      images.length > 1 ? images.slice(0, -1) : images
    );
  }

  resetImages(): void {
    this.dynamicImages.set([
      'https://picsum.photos/800/400?random=14',
      'https://picsum.photos/800/400?random=15',
      'https://picsum.photos/800/400?random=16'
    ]);
  }
}
