import {ChangeDetectionStrategy, Component, effect, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SkeletonAvatar, SkeletonComponent, SkeletonService, SkeletonText} from '@lib/components/skeleton';

@Component({
  selector: 'app-skeleton-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SkeletonComponent,
    SkeletonText,
    SkeletonAvatar,
    SkeletonComponent
  ],
  providers: [SkeletonService],
  template: `
    <!-- SEO Meta Information -->
    <div class="sr-only">
      <h1>Angular Skeleton Component - Beautiful Loading Placeholders</h1>
      <p>Discover our highly customizable Angular skeleton component with smooth animations, multiple variants,
        and accessibility features. Perfect for creating engaging loading states in modern web applications.</p>
      <meta name="description"
            content="Comprehensive Angular Skeleton component with smooth animations, multiple variants, accessibility support, and responsive design for creating beautiful loading placeholders.">
      <meta name="keywords"
            content="Angular Skeleton, loading placeholder, skeleton loader, loading animation, Angular UI components, skeleton variants">
    </div>

    <!-- Hero Section -->
    <section
      class="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 py-20 sm:py-32">

      <!-- Background Pattern -->
      <div
        class="absolute inset-0 opacity-30 dark:opacity-20"
        style="background-image: radial-gradient(circle at 1px 1px, rgba(71, 85, 105, 0.15) 1px, transparent 0); background-size: 20px 20px;"></div>

      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <!-- Hero Badge -->
          <div
            class="mx-auto mb-6 w-fit rounded-full border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-900/50">
            <p class="text-sm font-medium text-slate-700 dark:text-slate-300">
              ⚡ Loading & State Collection
            </p>
          </div>

          <!-- Hero Title -->
          <h1
            class="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
            <span class="block">Beautiful</span>
            <span class="bg-gradient-to-r from-slate-600 via-gray-600 to-slate-700 bg-clip-text text-transparent">
              Skeleton
            </span>
            <span class="block">Loaders</span>
          </h1>

          <!-- Hero Description -->
          <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl">
            Create engaging loading experiences with our comprehensive skeleton component system.
            Smooth animations, multiple variants, and accessibility-first design.
          </p>

          <!-- Hero Features -->
          <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="rounded-lg bg-white/60 p-4 backdrop-blur-sm dark:bg-gray-800/60">
              <div class="text-sm font-semibold text-gray-900 dark:text-white">🎭 Smooth Animations</div>
              <div class="text-xs text-gray-600 dark:text-gray-300">Pulse, shimmer & more</div>
            </div>
            <div class="rounded-lg bg-white/60 p-4 backdrop-blur-sm dark:bg-gray-800/60">
              <div class="text-sm font-semibold text-gray-900 dark:text-white">🎨 Flexible Variants</div>
              <div class="text-xs text-gray-600 dark:text-gray-300">Text, avatars & shapes</div>
            </div>
            <div class="rounded-lg bg-white/60 p-4 backdrop-blur-sm dark:bg-gray-800/60">
              <div class="text-sm font-semibold text-gray-900 dark:text-white">♿ Accessible</div>
              <div class="text-xs text-gray-600 dark:text-gray-300">Screen reader friendly</div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-24">

        <!-- Basic Usage -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Basic Usage
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Simple skeleton components that adapt to your content structure automatically.
            </p>
          </div>

          <div class="grid gap-8 lg:grid-cols-2">
            <!-- Text Skeletons -->
            <div
              class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Text Skeletons
              </h3>
              <div class="flex flex-col gap-4">
                <SkeletonText width="full" height="20px"/>
                <SkeletonText width="4/5" height="16px"/>
                <SkeletonText width="1/2" height="16px"/>
                <SkeletonText width="5/6" height="16px"/>

                <div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-700 mt-4">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Perfect for loading article content, descriptions, and paragraphs
                  </p>
                </div>
              </div>
            </div>

            <!-- Avatar Skeletons -->
            <div
              class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Avatar Skeletons
              </h3>
              <div class="flex flex-col gap-4">
                <div class="flex items-center space-x-4">
                  <SkeletonAvatar size="lg"/>
                  <div class="flex-1 flex flex-col gap-2">
                    <SkeletonText width="1/3" height="16px"/>
                    <SkeletonText width="1/2" height="14px"/>
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <SkeletonAvatar size="default"/>
                  <div class="flex-1 flex flex-col gap-2">
                    <SkeletonText width="1/3" height="14px"/>
                    <SkeletonText width="1/2" height="12px"/>
                  </div>
                </div>

                <div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-700 mt-4">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ideal for user profiles, comment sections, and team listings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Size Variants -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Size Variants
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Choose from multiple sizes to match your design requirements perfectly.
            </p>
          </div>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Avatar Sizes -->
            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Avatar Sizes</h3>
              <div class="flex flex-col gap-4">
                <div class="flex items-center space-x-3">
                  <SkeletonAvatar size="xs"/>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Extra Small</span>
                </div>
                <div class="flex items-center space-x-3">
                  <SkeletonAvatar size="sm"/>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Small</span>
                </div>
                <div class="flex items-center space-x-3">
                  <SkeletonAvatar size="default"/>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Default</span>
                </div>
                <div class="flex items-center space-x-3">
                  <SkeletonAvatar size="lg"/>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Large</span>
                </div>
                <div class="flex items-center space-x-3">
                  <SkeletonAvatar size="xl"/>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Extra Large</span>
                </div>
              </div>
            </div>

            <!-- Text Heights -->
            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Text Heights</h3>
              <div class="flex flex-col gap-4">
                <div>
                  <SkeletonText width="5/6" height="12px"/>
                  <span class="text-xs text-gray-500 dark:text-gray-400 mt-1 block">12px - Caption</span>
                </div>
                <div>
                  <SkeletonText width="4/5" height="14px"/>
                  <span class="text-xs text-gray-500 dark:text-gray-400 mt-1 block">14px - Small</span>
                </div>
                <div>
                  <SkeletonText width="4/5" height="16px"/>
                  <span class="text-xs text-gray-500 dark:text-gray-400 mt-1 block">16px - Default</span>
                </div>
                <div>
                  <SkeletonText width="3/4" height="20px"/>
                  <span class="text-xs text-gray-500 dark:text-gray-400 mt-1 block">20px - Large</span>
                </div>
                <div>
                  <SkeletonText width="2/3" height="24px"/>
                  <span class="text-xs text-gray-500 dark:text-gray-400 mt-1 block">24px - Heading</span>
                </div>
              </div>
            </div>

            <!-- Custom Shapes -->
            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Custom Shapes</h3>
              <div class="flex flex-col gap-4">
                <div>
                  <SkeletonComponent width="full" height="120px" rounded="lg"/>
                  <span class="text-xs text-gray-500 dark:text-gray-400 mt-1 block">Image Placeholder</span>
                </div>
                <div>
                  <SkeletonComponent width="md" height="60px" rounded="full"/>
                  <span class="text-xs text-gray-500 dark:text-gray-400 mt-1 block">Circle</span>
                </div>
                <div>
                  <SkeletonComponent width="full" height="40px" rounded="md"/>
                  <span class="text-xs text-gray-500 dark:text-gray-400 mt-1 block">Button</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Animation Types -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Animation Types
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Choose from different animation styles to match your brand and user experience.
            </p>
          </div>

          <!-- Animation Controls -->
          <div class="mx-auto max-w-2xl">
            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div class="flex flex-wrap gap-4 justify-center mb-6">
                <button
                  *ngFor="let animation of animationTypes"
                  (click)="selectedAnimation.set(animation)"
                  [class.bg-slate-600]="selectedAnimation() === animation"
                  [class.text-white]="selectedAnimation() === animation"
                  [class.bg-gray-100]="selectedAnimation() !== animation"
                  [class.text-gray-700]="selectedAnimation() !== animation"
                  [class.dark:bg-gray-700]="selectedAnimation() !== animation"
                  [class.dark:text-gray-300]="selectedAnimation() !== animation"
                  class="px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize"
                >
                  {{ animation === 'none' ? 'Static' : animation }}
                </button>
              </div>

              <div class="flex flex-col gap-4">
                <SkeletonText
                  width="full"
                  height="20px"
                  [animation]="selectedAnimation()"/>
                <SkeletonText
                  width="4/5"
                  height="16px"
                  [animation]="selectedAnimation()"/>
                <SkeletonText
                  width="1/2"
                  height="16px"
                  [animation]="selectedAnimation()"/>
              </div>
            </div>
          </div>
        </section>

        <!-- Real-world Examples -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Real-world Examples
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              See how skeleton loaders work in common UI patterns and layouts.
            </p>
          </div>

          <div class="grid gap-8 lg:grid-cols-2">
            <!-- Card Layout -->
            <div
              class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Article Card
              </h3>
              <div class="flex flex-col gap-4">
                <!-- Image placeholder -->
                <SkeletonComponent width="full" height="200px" rounded="lg"/>

                <!-- Content -->
                <div class="flex flex-col gap-3">
                  <SkeletonText width="5/6" height="24px"/>
                  <SkeletonText width="full" height="16px"/>
                  <SkeletonText width="4/5" height="16px"/>
                  <SkeletonText width="2/3" height="16px"/>
                </div>

                <!-- Author info -->
                <div class="flex items-center space-x-3 pt-4">
                  <SkeletonAvatar size="sm"/>
                  <div class="flex-1 flex flex-col gap-1">
                    <SkeletonText width="1/3" height="14px"/>
                    <SkeletonText width="1/4" height="12px"/>
                  </div>
                </div>
              </div>
            </div>

            <!-- List Layout -->
            <div
              class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                User List
              </h3>
              <div class="flex flex-col gap-6">
                <div *ngFor="let item of Array(4).fill(0); let i = index"
                     class="flex items-center space-x-4">
                  <SkeletonAvatar [size]="i === 0 ? 'lg' : 'default'"/>
                  <div class="flex-1 flex flex-col gap-2">
                    <SkeletonText [width]="getWidthForIndex(i, 60, 5)" height="16px"/>
                    <SkeletonText [width]="getWidthForIndex(i, 40, 3)" height="14px"/>
                    <SkeletonText *ngIf="i === 0" width="1/2" height="12px"/>
                  </div>
                  <SkeletonComponent width="xl" height="32px" rounded="md"/>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Performance Features -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Performance & Accessibility
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Built with performance and accessibility in mind for the best user experience.
            </p>
          </div>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div class="rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
              <div class="flex items-center space-x-3">
                <div class="rounded-full bg-green-100 p-2 dark:bg-green-800">
                  <svg class="h-5 w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                       viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-green-900 dark:text-green-100">Lightweight</h3>
                  <p class="text-sm text-green-700 dark:text-green-300">Minimal bundle impact</p>
                </div>
              </div>
            </div>

            <div class="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
              <div class="flex items-center space-x-3">
                <div class="rounded-full bg-blue-100 p-2 dark:bg-blue-800">
                  <svg class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                       viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-blue-900 dark:text-blue-100">Accessible</h3>
                  <p class="text-sm text-blue-700 dark:text-blue-300">Screen reader support</p>
                </div>
              </div>
            </div>

            <div class="rounded-lg bg-purple-50 p-6 dark:bg-purple-900/20">
              <div class="flex items-center space-x-3">
                <div class="rounded-full bg-purple-100 p-2 dark:bg-purple-800">
                  <svg class="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
                       viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 2v12a2 2 0 002 2h6a2 2 0 002-2V6H7z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-purple-900 dark:text-purple-100">Customizable</h3>
                  <p class="text-sm text-purple-700 dark:text-purple-300">Easy theming</p>
                </div>
              </div>
            </div>

            <div class="rounded-lg bg-orange-50 p-6 dark:bg-orange-900/20">
              <div class="flex items-center space-x-3">
                <div class="rounded-full bg-orange-100 p-2 dark:bg-orange-800">
                  <svg class="h-5 w-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor"
                       viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-orange-900 dark:text-orange-100">Smooth</h3>
                  <p class="text-sm text-orange-700 dark:text-orange-300">Fluid animations</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="text-center flex flex-col gap-8">
          <!-- Footer Header -->
          <div class="flex flex-col gap-4">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Ready to Get Started?
            </h2>
            <p class="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
              Explore our comprehensive documentation and learn how to integrate Skeleton loaders into your Angular
              applications for better user experience.
            </p>
          </div>

          <!-- Documentation Link -->
          <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/skeleton.md"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-2 rounded-lg bg-slate-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow-md focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              aria-label="View Skeleton component documentation on GitHub"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clip-rule="evenodd"/>
              </svg>
              View Documentation
              <svg class="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor"
                   viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>

          <!-- Footer Info -->
          <div class="border-t border-gray-200 pt-8 dark:border-gray-700">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Part of Angular SuperUI - A comprehensive component library for modern Angular applications.
            </p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .bg-grid-slate-100 {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(71 85 105 / 0.04)'%3e%3cpath d='m0 .5h32v32h-32z'/%3e%3c/svg%3e");
    }

    @media (max-width: 640px) {
      .hero-title {
        font-size: 2.5rem;
        line-height: 1.1;
      }

      .hero-features {
        grid-template-columns: 1fr;
        gap: 0.75rem;
      }
    }

    /* Skeleton pulse animation enhancement */
    @keyframes skeleton-pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    .skeleton-pulse {
      animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonDemoComponent {
  readonly skeletonService = inject(SkeletonService);

  // Component state
  isLoading = signal(true);
  selectedAnimation = signal<'pulse' | 'none'>('pulse');
  selectedIntensity = signal<'light' | 'normal' | 'strong'>('normal');

  // Constants for demo
  readonly animationTypes = ['pulse', 'none'] as const;
  readonly sizeVariants = ['xs', 'sm', 'default', 'lg', 'xl', '2xl', '3xl'] as const;

  readonly Array = Array; // For template usage

  constructor() {
    // Sync with service
    effect(() => {
      this.skeletonService.setLoading(this.isLoading());
    });
  }

  simulateLoading() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 3000);
  }

  // Helper function to map dynamic width values to allowed types
  getWidthForIndex(index: number, baseWidth: number, decrement: number): 'full' | '5/6' | '4/5' | '3/4' | '2/3' | '1/2' | '1/3' | '1/4' {
    const calculatedWidth = baseWidth - (index * decrement);

    if (calculatedWidth >= 90) return 'full';
    if (calculatedWidth >= 75) return '5/6';
    if (calculatedWidth >= 65) return '4/5';
    if (calculatedWidth >= 55) return '3/4';
    if (calculatedWidth >= 45) return '2/3';
    if (calculatedWidth >= 35) return '1/2';
    if (calculatedWidth >= 25) return '1/3';
    return '1/4';
  }
}
