import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rating, type RatingChangeEvent } from '@lib/rating';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-rating-demo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Rating
  ],
  styles: [`
    @keyframes sparkle {
      0%, 100% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
      }
      50% {
        transform: scale(1.2) rotate(180deg);
        opacity: 0.8;
      }
    }

    @keyframes ratingPulse {
      0%, 100% {
        box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
      }
      50% {
        box-shadow: 0 0 30px rgba(245, 158, 11, 0.6);
      }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }

    .sparkle-animation {
      animation: sparkle 1.5s ease-in-out infinite;
    }

    .rating-pulse {
      animation: ratingPulse 2s ease-in-out infinite;
    }

    .float-animation {
      animation: float 3s ease-in-out infinite;
    }

    .gradient-text {
      background: linear-gradient(135deg, #f59e0b, #d97706, #92400e);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-glow {
      filter: drop-shadow(0 10px 20px rgba(245, 158, 11, 0.3));
    }
  `],
  template: `
    <!-- SEO Meta Information -->
    <div class="sr-only">
      <h1>Angular Rating Component - Interactive Star Rating System</h1>
      <p>Discover our comprehensive Angular rating component with accessibility features, animations, and multiple variants. Perfect for reviews, feedback, and rating systems.</p>
      <meta name="description"
            content="Advanced Angular rating component with star ratings, half-star support, keyboard navigation, and full accessibility compliance. Features smooth animations, multiple variants, and comprehensive form integration.">
      <meta name="keywords"
            content="Angular rating, star rating, Angular review component, interactive rating, accessible rating, Angular stars, rating widget, Angular UI, TypeScript rating, ARIA rating">
    </div>

    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900/20">

      <!-- Hero Section -->
      <div class="relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>

        <!-- Hero Content -->
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div class="text-center">
            <!-- Floating Icons -->
            <div class="absolute top-10 left-10 w-8 h-8 text-amber-400 float-animation opacity-60">
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div class="absolute top-16 right-16 w-6 h-6 text-yellow-500 float-animation opacity-40" style="animation-delay: 0.5s;">
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div class="absolute bottom-10 left-20 w-4 h-4 text-amber-300 sparkle-animation opacity-50">
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>

            <!-- Badge -->
            <div class="inline-flex items-center rounded-full px-3 py-1.5 sm:px-4 text-xs sm:text-sm font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 ring-1 ring-inset ring-amber-200 dark:ring-amber-800 mb-8">
              <svg class="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Interactive Star Rating System
            </div>

            <!-- Main Heading -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span class="block text-gray-900 dark:text-white mb-2">Rating</span>
              <span class="block gradient-text">Component</span>
            </h1>

            <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Create engaging star rating experiences with smooth animations, accessibility features, and comprehensive customization options.
            </p>

            <!-- Hero Demo -->
            <div class="max-w-2xl mx-auto">
              <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 hero-glow rating-pulse">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Rate Your Experience</h3>

                <div class="space-y-6">
                  <!-- Hero Rating -->
                  <div class="flex flex-col items-center space-y-4">
                    <Rating
                      [value]="heroRating()"
                      (valueChange)="heroRating.set($event)"
                      (change)="onHeroRatingChange($event)"
                      size="xl"
                      variant="default"
                      [showValue]="true"
                      [animateOnChange]="true"
                      [showGlow]="true"
                      [allowClear]="true"
                      ariaLabel="Rate your overall experience"
                    />

                    @if (heroMessage()) {
                      <div class="text-center">
                        <p class="text-lg font-medium text-amber-600 dark:text-amber-400">{{ heroMessage() }}</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ heroSubMessage() }}</p>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>

            <!-- Stats -->
            <div class="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">✨</div>
                <div class="text-amber-600 dark:text-amber-400 text-sm font-medium">Interactive</div>
              </div>
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">♿</div>
                <div class="text-amber-600 dark:text-amber-400 text-sm font-medium">Accessible</div>
              </div>
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">🎨</div>
                <div class="text-amber-600 dark:text-amber-400 text-sm font-medium">Customizable</div>
              </div>
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">⚡</div>
                <div class="text-amber-600 dark:text-amber-400 text-sm font-medium">Performant</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Variants Section -->
      <section class="py-20 bg-white dark:bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Rating Variants</h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Multiple color variants and styles to match any design system
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Default Variant -->
            <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Default</h3>
                <span class="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full">Most Popular</span>
              </div>
              <div class="space-y-4">
                <Rating
                  [value]="variantRatings.default()"
                  (valueChange)="variantRatings.default.set($event)"
                  variant="default"
                  [showValue]="true"
                />
                <p class="text-sm text-gray-600 dark:text-gray-400">Classic amber stars perfect for most use cases</p>
              </div>
            </div>

            <!-- Success Variant -->
            <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Success</h3>
              <div class="space-y-4">
                <Rating
                  [value]="variantRatings.success()"
                  (valueChange)="variantRatings.success.set($event)"
                  variant="success"
                  [showValue]="true"
                />
                <p class="text-sm text-gray-600 dark:text-gray-400">Green stars for positive feedback and achievements</p>
              </div>
            </div>

            <!-- Warning Variant -->
            <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Warning</h3>
              <div class="space-y-4">
                <Rating
                  [value]="variantRatings.warning()"
                  (valueChange)="variantRatings.warning.set($event)"
                  variant="warning"
                  [showValue]="true"
                />
                <p class="text-sm text-gray-600 dark:text-gray-400">Yellow stars for cautionary or moderate ratings</p>
              </div>
            </div>

            <!-- Destructive Variant -->
            <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Destructive</h3>
              <div class="space-y-4">
                <Rating
                  [value]="variantRatings.destructive()"
                  (valueChange)="variantRatings.destructive.set($event)"
                  variant="destructive"
                  [showValue]="true"
                />
                <p class="text-sm text-gray-600 dark:text-gray-400">Red stars for negative feedback or critical issues</p>
              </div>
            </div>

            <!-- Info Variant -->
            <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Info</h3>
              <div class="space-y-4">
                <Rating
                  [value]="variantRatings.info()"
                  (valueChange)="variantRatings.info.set($event)"
                  variant="info"
                  [showValue]="true"
                />
                <p class="text-sm text-gray-600 dark:text-gray-400">Blue stars for informational or neutral ratings</p>
              </div>
            </div>

            <!-- Muted Variant -->
            <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Muted</h3>
              <div class="space-y-4">
                <Rating
                  [value]="variantRatings.muted()"
                  (valueChange)="variantRatings.muted.set($event)"
                  variant="muted"
                  [showValue]="true"
                />
                <p class="text-sm text-gray-600 dark:text-gray-400">Subtle gray stars for secondary or disabled states</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Sizes Section -->
      <section class="py-20 bg-gray-50 dark:bg-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Size Options</h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From compact ratings to prominent hero displays
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Small Size -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Small</h3>
              <Rating
                [value]="sizeRatings.sm()"
                (valueChange)="sizeRatings.sm.set($event)"
                size="sm"
                variant="default"
              />
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">Perfect for compact layouts</p>
            </div>

            <!-- Default Size -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Default</h3>
              <Rating
                [value]="sizeRatings.default()"
                (valueChange)="sizeRatings.default.set($event)"
                size="default"
                variant="default"
              />
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">Standard size for most applications</p>
            </div>

            <!-- Large Size -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Large</h3>
              <Rating
                [value]="sizeRatings.lg()"
                (valueChange)="sizeRatings.lg.set($event)"
                size="lg"
                variant="default"
              />
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">Great for emphasis and visibility</p>
            </div>

            <!-- Extra Large Size -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Extra Large</h3>
              <Rating
                [value]="sizeRatings.xl()"
                (valueChange)="sizeRatings.xl.set($event)"
                size="xl"
                variant="default"
              />
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">Hero sections and prominent displays</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 bg-white dark:bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Advanced Features</h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore powerful features that make our rating component stand out
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Half Star Support -->
            <div class="space-y-6">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Half Star Support</h3>
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                Allow users to select half-star ratings for more precise feedback. Perfect for detailed review systems.
              </p>
              <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div class="space-y-4">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Half Star Rating (Current: {{ halfStarRating() }})
                  </label>
                  <Rating
                    [value]="halfStarRating()"
                    (valueChange)="halfStarRating.set($event)"
                    [allowHalf]="true"
                    [precision]="0.5"
                    [showValue]="true"
                    variant="default"
                    description="Try clicking between stars for half ratings"
                  />
                </div>
              </div>
            </div>

            <!-- Readonly and Display -->
            <div class="space-y-6">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Readonly Display</h3>
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                Display ratings without allowing interaction. Perfect for showing existing reviews and ratings.
              </p>
              <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Product Rating</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">4.7 out of 5</span>
                  </div>
                  <Rating
                    [value]="4.7"
                    [readonly]="true"
                    [allowHalf]="true"
                    [showValue]="true"
                    variant="default"
                    description="Average customer rating based on 1,247 reviews"
                  />
                </div>
              </div>
            </div>

            <!-- Custom Max Stars -->
            <div class="space-y-6">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Custom Max Stars</h3>
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                Configure any number of stars from 1 to 10. Adapt to different rating scales and systems.
              </p>
              <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      10-Star Rating System
                    </label>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ customMaxRating() }}/10</span>
                  </div>
                  <Rating
                    [value]="customMaxRating()"
                    (valueChange)="customMaxRating.set($event)"
                    [max]="10"
                    [showValue]="true"
                    variant="success"
                    size="sm"
                    description="Rate from 1 to 10 stars"
                  />
                </div>
              </div>
            </div>

            <!-- Keyboard Navigation -->
            <div class="space-y-6">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Keyboard Navigation</h3>
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                Full keyboard support with arrow keys, Enter, Space, Home, End, and Delete for clearing ratings.
              </p>
              <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div class="space-y-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <div><kbd class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs">←→</kbd> Navigate stars</div>
                    <div><kbd class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs">Enter/Space</kbd> Select rating</div>
                    <div><kbd class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs">Home/End</kbd> First/Last star</div>
                    <div><kbd class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs">Delete</kbd> Clear rating</div>
                  </div>
                  <Rating
                    [value]="keyboardRating()"
                    (valueChange)="keyboardRating.set($event)"
                    [allowClear]="true"
                    [showValue]="true"
                    variant="info"
                    description="Focus and try keyboard navigation"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Form Integration Section -->
      <section class="py-20 bg-gray-50 dark:bg-gray-900">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Form Integration</h2>
            <p class="text-xl text-gray-600 dark:text-gray-300">
              Seamless integration with Angular reactive forms and form validation
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <form [formGroup]="reviewForm" (ngSubmit)="onSubmitReview()" class="space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Overall Rating -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Overall Rating *
                  </label>
                  <Rating
                    formControlName="overall"
                    [showValue]="true"
                    variant="default"
                    size="lg"
                    [allowClear]="false"
                    ariaLabel="Overall rating"
                    description="Rate your overall experience"
                    [error]="getFormError('overall')"
                  />
                </div>

                <!-- Quality Rating -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Quality
                  </label>
                  <Rating
                    formControlName="quality"
                    [showValue]="true"
                    [allowHalf]="true"
                    variant="success"
                    ariaLabel="Quality rating"
                    description="Rate the quality of the product/service"
                  />
                </div>

                <!-- Service Rating -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Customer Service
                  </label>
                  <Rating
                    formControlName="service"
                    [showValue]="true"
                    variant="info"
                    ariaLabel="Service rating"
                    description="Rate the customer service experience"
                  />
                </div>

                <!-- Value Rating -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Value for Money
                  </label>
                  <Rating
                    formControlName="value"
                    [showValue]="true"
                    variant="warning"
                    ariaLabel="Value rating"
                    description="Rate the value for money"
                  />
                </div>
              </div>

              <!-- Form Actions -->
              <div class="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  @if (reviewForm.valid) {
                    <span class="text-green-600 dark:text-green-400">✓ Form is valid</span>
                  } @else {
                    <span class="text-red-600 dark:text-red-400">⚠ Please complete required fields</span>
                  }
                </div>

                <div class="space-x-3">
                  <button
                    type="button"
                    (click)="resetForm()"
                    class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    [disabled]="reviewForm.invalid"
                    class="px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </form>

            <!-- Form Values Display -->
            @if (showFormValues()) {
              <div class="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Form Values:</h4>
                <pre class="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto">{{ reviewForm.value | json }}</pre>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Events and Callbacks Section -->
      <section class="py-20 bg-white dark:bg-gray-800">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Events & Callbacks</h2>
            <p class="text-xl text-gray-600 dark:text-gray-300">
              Rich event system for tracking user interactions and building responsive UIs
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Interactive Rating -->
            <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Interactive Rating</h3>
              <div class="space-y-4">
                <Rating
                  [value]="eventRating()"
                  (valueChange)="eventRating.set($event)"
                  (change)="onRatingChange($event)"
                  (hover)="onRatingHover($event)"
                  (focus)="onRatingFocus($event)"
                  (blur)="onRatingBlur()"
                  (clear)="onRatingClear()"
                  [showValue]="true"
                  [allowClear]="true"
                  variant="default"
                  description="Interact with this rating to see events"
                />
              </div>
            </div>

            <!-- Event Log -->
            <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Event Log</h3>
                <button
                  (click)="clearEventLog()"
                  class="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-900/50"
                >
                  Clear
                </button>
              </div>
              <div class="h-48 overflow-y-auto space-y-2">
                @for (event of eventLog(); track $index) {
                  <div class="text-xs p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between">
                      <span class="font-medium text-gray-900 dark:text-white">{{ event.type }}</span>
                      <span class="text-gray-500 dark:text-gray-400">{{ event.timestamp }}</span>
                    </div>
                    @if (event.data) {
                      <div class="text-gray-600 dark:text-gray-400 mt-1">{{ event.data }}</div>
                    }
                  </div>
                } @empty {
                  <div class="text-center text-gray-500 dark:text-gray-400 text-sm py-8">
                    No events yet. Interact with the rating above.
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Documentation Section -->
      <section class="py-20 bg-gray-50 dark:bg-gray-900">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Ready to Get Started?</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Add beautiful, accessible rating components to your Angular application today.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div class="text-center">
              <div class="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Documentation</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Comprehensive guides and API reference</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Examples</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Copy-paste code examples and demos</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quick Start</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Get up and running in minutes</p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              routerLink="/components"
              class="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-amber-600 border border-transparent rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              View All Components
            </a>
            <a
              href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/rating.md"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Source
            </a>
          </div>
        </div>
      </section>
    </div>
  `
})
export class RatingDemoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private seoService = inject(SEOService);

  ngOnInit() {
    // Update SEO for rating component page
    this.seoService.updateSEO(this.seoService.getComponentSEO('rating'));
    this.seoService.addComponentStructuredData('rating');
  }

  // Hero section
  readonly heroRating = signal(0);
  readonly heroMessage = signal('');
  readonly heroSubMessage = signal('');

  // Variant ratings
  readonly variantRatings = {
    default: signal(4),
    success: signal(5),
    warning: signal(3),
    destructive: signal(2),
    info: signal(4),
    muted: signal(3)
  };

  // Size ratings
  readonly sizeRatings = {
    sm: signal(4),
    default: signal(5),
    lg: signal(3),
    xl: signal(4)
  };

  // Feature demonstrations
  readonly halfStarRating = signal(4.5);
  readonly customMaxRating = signal(7);
  readonly keyboardRating = signal(0);
  readonly eventRating = signal(0);

  // Event logging
  readonly eventLog = signal<Array<{type: string, data?: string, timestamp: string}>>([]);
  readonly showFormValues = signal(false);

  // Form integration
  readonly reviewForm = this.fb.group({
    overall: [3, [Validators.required, Validators.min(1)]],
    quality: [4.5],
    service: [2],
    value: [4]
  });

  onHeroRatingChange(event: RatingChangeEvent): void {
    const rating = event.value;
    const messages = [
      { msg: '', sub: '' },
      { msg: 'Poor Experience', sub: 'We apologize for the inconvenience. Please let us know how we can improve.' },
      { msg: 'Below Average', sub: 'There\'s room for improvement. Your feedback helps us do better.' },
      { msg: 'Average Experience', sub: 'Thank you for your feedback. We strive to exceed expectations.' },
      { msg: 'Good Experience', sub: 'We\'re glad you had a positive experience with us!' },
      { msg: 'Excellent!', sub: 'Thank you for the amazing rating! We truly appreciate your support.' }
    ];

    const message = messages[rating] || messages[0];
    this.heroMessage.set(message.msg);
    this.heroSubMessage.set(message.sub);
  }

  onRatingChange(event: RatingChangeEvent): void {
    this.addEvent('change', `Value changed from ${event.previousValue} to ${event.value}`);
  }

  onRatingHover(value: number): void {
    this.addEvent('hover', `Hovering over ${value} stars`);
  }

  onRatingFocus(value: number): void {
    this.addEvent('focus', `Focused on ${value} stars`);
  }

  onRatingBlur(): void {
    this.addEvent('blur', 'Lost focus');
  }

  onRatingClear(): void {
    this.addEvent('clear', 'Rating cleared');
  }

  private addEvent(type: string, data?: string): void {
    const timestamp = new Date().toLocaleTimeString();
    const currentLog = this.eventLog();
    this.eventLog.set([{type, data, timestamp}, ...currentLog.slice(0, 9)]);
  }

  clearEventLog(): void {
    this.eventLog.set([]);
  }

  onSubmitReview(): void {
    if (this.reviewForm.valid) {
      this.showFormValues.set(true);
      setTimeout(() => this.showFormValues.set(false), 5000);
    }
  }

  resetForm(): void {
    this.reviewForm.reset();
    this.showFormValues.set(false);
  }

  getFormError(controlName: string): string {
    const control = this.reviewForm.get(controlName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['min']) {
        return 'Please select at least 1 star';
      }
    }
    return '';
  }
}
