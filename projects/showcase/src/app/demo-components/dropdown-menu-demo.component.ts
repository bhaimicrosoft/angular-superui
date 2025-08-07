import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownMenu, type DropdownMenuItemData, type DropdownMenuGroupData } from '@lib/components/dropdown-menu';

@Component({
  selector: 'app-dropdown-menu-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, DropdownMenu],
  styles: [`
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }

    @keyframes fade-in-up {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-blob {
      animation: blob 7s infinite;
    }

    .animation-delay-2000 {
      animation-delay: 2s;
    }

    .animation-delay-4000 {
      animation-delay: 4s;
    }

    .animate-fade-in-up {
      animation: fade-in-up 1s ease-out forwards;
    }

    .animation-delay-300 {
      animation-delay: 0.3s;
      opacity: 0;
    }

    .animation-delay-600 {
      animation-delay: 0.6s;
      opacity: 0;
    }

    .animation-delay-900 {
      animation-delay: 0.9s;
      opacity: 0;
    }
  `],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <!-- Stunning Hero Section -->
      <div class="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <!-- Animated Background Elements -->
        <div class="absolute inset-0">
          <div class="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div class="absolute top-0 right-0 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div class="absolute bottom-0 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-purple-800/50 via-violet-900/50 to-purple-800/50"></div>

        <!-- Content -->
        <div class="relative z-10">
          <!-- Mobile-Optimized Header -->
          <div class="border-b border-white/10 backdrop-blur-sm">
            <div class="container mx-auto px-4 py-4 sm:py-6">
              <div class="flex items-center justify-between">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                    <span class="text-white/90 font-medium text-sm sm:text-base hidden sm:block">Angular SuperUI</span>
                  </div>
                </div>
                <a
                  routerLink="/"
                  class="inline-flex items-center px-3 py-2 text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-colors flex-shrink-0 ml-4 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm"
                >
                  <span class="hidden sm:inline">← Back to Components</span>
                  <span class="sm:hidden">← Back</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Hero Content -->
          <div class="container mx-auto px-4 py-12 sm:py-20 lg:py-32">
            <div class="text-center max-w-4xl mx-auto">
              <!-- Badge -->
              <div class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-200 text-sm font-medium mb-6 sm:mb-8 animate-pulse">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Interactive Component
              </div>

              <!-- Main Heading -->
              <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-6 sm:mb-8 animate-fade-in-up">
                Dropdown Menu
              </h1>

              <!-- Subheading -->
              <p class="text-lg sm:text-xl lg:text-2xl text-purple-100/80 mb-8 sm:mb-12 leading-relaxed animate-fade-in-up animation-delay-300">
                Beautiful, accessible dropdown menus with stunning animations.<br/>
                <span class="text-purple-200 font-medium">Built with Angular signals and Tailwind CSS.</span>
              </p>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-600">
                <button class="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 transform-gpu">
                  <span class="relative z-10 flex items-center">
                    <svg class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                    Try Interactive Demo
                  </span>
                  <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>

                <a
                  href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/dropdown-menu.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm inline-flex items-center"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  View Documentation
                </a>
              </div>

              <!-- Feature Stats -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-20 animate-fade-in-up animation-delay-900">
                <div class="text-center">
                  <div class="text-2xl sm:text-3xl font-bold text-white mb-2">7+</div>
                  <div class="text-purple-200/70 text-sm">Variants</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl sm:text-3xl font-bold text-white mb-2">100%</div>
                  <div class="text-purple-200/70 text-sm">Accessible</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl sm:text-3xl font-bold text-white mb-2">📱</div>
                  <div class="text-purple-200/70 text-sm">Mobile First</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl sm:text-3xl font-bold text-white mb-2">⚡</div>
                  <div class="text-purple-200/70 text-sm">Fast</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Wave -->
          <div class="absolute bottom-0 left-0 right-0">
            <svg class="w-full h-20 sm:h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="rgb(248 250 252)" fill-opacity="1"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-6 sm:py-8 space-y-8 sm:space-y-12">
        <!-- Mobile-Optimized Live Preview Section -->
        <section class="space-y-4 sm:space-y-6">
          <div class="text-center space-y-2 sm:space-y-4">
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Interactive Demo</h2>
            <p class="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-sm sm:text-base px-2">
              Experience the dropdown menu component with different variants, sizes, and configurations.
            </p>
          </div>

          <!-- Mobile-Responsive Demo Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <!-- Premium Glass Menu -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-gray-900 dark:text-white">Premium Glass</h3>
              <div class="flex justify-center">
                <DropdownMenu
                  [items]="premiumMenuItems()"
                  [triggerText]="'Premium Menu'"
                  triggerVariant="gradient"
                  triggerSize="lg"
                  variant="glass"
                  size="lg"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
              </div>
            </div>

            <!-- Developer Tools -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-gray-900 dark:text-white">Developer Tools</h3>
              <div class="flex justify-center">
                <DropdownMenu
                  [items]="developerMenuItems()"
                  [triggerText]="'Dev Tools'"
                  triggerVariant="neon"
                  triggerSize="default"
                  variant="blur"
                  size="default"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
              </div>
            </div>

            <!-- Enhanced User Profile -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-gray-900 dark:text-white">User Profile</h3>
              <div class="flex justify-center">
                <DropdownMenu
                  [menuGroups]="userProfileGroups()"
                  [triggerText]="'John Doe'"
                  triggerVariant="glass"
                  triggerSize="lg"
                  variant="floating"
                  size="lg"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
              </div>
            </div>

            <!-- Creative Suite -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-gray-900 dark:text-white">Creative Suite</h3>
              <div class="flex justify-center">
                <DropdownMenu
                  [items]="creativeMenuItems()"
                  [triggerText]="'Create +'"
                  triggerVariant="rainbow"
                  triggerSize="lg"
                  variant="neon"
                  size="lg"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
              </div>
            </div>

            <!-- Enhanced Action Menu -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-gray-900 dark:text-white">Action Menu</h3>
              <div class="flex justify-center">
                <DropdownMenu
                  [items]="actionItems()"
                  [triggerText]="'Actions'"
                  triggerVariant="secondary"
                  variant="elevated"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
              </div>
            </div>

            <!-- Minimal Clean Design -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-medium mb-4 text-gray-900 dark:text-white">Minimal Clean</h3>
              <div class="flex justify-center">
                <DropdownMenu
                  [items]="minimalMenuItems()"
                  [triggerText]="'Options'"
                  triggerVariant="outline"
                  triggerSize="sm"
                  variant="minimal"
                  size="sm"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
              </div>
            </div>
          </div>
        </section>

        <!-- Enhanced Feedback Section -->
        @if (lastAction()) {
          <section class="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-green-900/20 rounded-xl p-6 border border-green-200/50 dark:border-green-800/50 shadow-lg">
            <div class="flex items-start space-x-4">
              <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">Action Triggered Successfully</h3>
                <div class="bg-white/60 dark:bg-gray-900/60 rounded-lg p-4 backdrop-blur-sm">
                  @if (lastSelectedItem()) {
                    <div class="space-y-2">
                      <p class="text-sm font-medium text-green-700 dark:text-green-300">
                        {{ lastAction() }}
                      </p>
                      <div class="flex flex-wrap gap-2 text-xs text-green-600 dark:text-green-400">
                        @if (lastSelectedItem()?.shortcut) {
                          <span class="bg-green-100 dark:bg-green-800/50 px-2 py-1 rounded-md font-mono">
                            {{ lastSelectedItem()?.shortcut }}
                          </span>
                        }
                        @if (lastSelectedItem()?.badge) {
                          <span class="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800/50 dark:to-emerald-800/50 px-2 py-1 rounded-md font-medium">
                            {{ lastSelectedItem()?.badge }}
                          </span>
                        }
                        <span class="bg-green-100 dark:bg-green-800/50 px-2 py-1 rounded-md">
                          {{ lastActionTime() }}
                        </span>
                      </div>
                    </div>
                  } @else {
                    <p class="text-sm text-green-700 dark:text-green-300">{{ lastAction() }}</p>
                  }
                </div>
              </div>
            </div>
          </section>
        }

        <!-- Mobile-Responsive Variants Showcase -->
        <section class="space-y-4 sm:space-y-6">
          <div class="text-center space-y-2 sm:space-y-4">
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Trigger Variants</h2>
            <p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base px-2">Different styling options for the dropdown trigger button.</p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div class="text-center space-y-2 sm:space-y-3">
                <DropdownMenu
                  [items]="basicItems()"
                  [triggerText]="'Default'"
                  triggerVariant="default"
                  className="w-full"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
                <p class="text-xs text-gray-500 dark:text-gray-400">Default</p>
              </div>

              <div class="text-center space-y-2 sm:space-y-3">
                <DropdownMenu
                  [items]="basicItems()"
                  [triggerText]="'Gradient'"
                  triggerVariant="gradient"
                  className="w-full"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
                <p class="text-xs text-gray-500 dark:text-gray-400">Gradient</p>
              </div>

              <div class="text-center space-y-2 sm:space-y-3">
                <DropdownMenu
                  [items]="basicItems()"
                  [triggerText]="'Glass'"
                  triggerVariant="glass"
                  className="w-full"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
                <p class="text-xs text-gray-500 dark:text-gray-400">Glass</p>
              </div>

              <div class="text-center space-y-2 sm:space-y-3">
                <DropdownMenu
                  [items]="basicItems()"
                  [triggerText]="'Neon'"
                  triggerVariant="neon"
                  className="w-full"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
                <p class="text-xs text-gray-500 dark:text-gray-400">Neon</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
              <div class="text-center space-y-2 sm:space-y-3">
                <DropdownMenu
                  [items]="basicItems()"
                  [triggerText]="'Outline'"
                  triggerVariant="outline"
                  className="w-full"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
                <p class="text-xs text-gray-500 dark:text-gray-400">Outline</p>
              </div>

              <div class="text-center space-y-2 sm:space-y-3">
                <DropdownMenu
                  [items]="basicItems()"
                  [triggerText]="'Secondary'"
                  triggerVariant="secondary"
                  className="w-full"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
                <p class="text-xs text-gray-500 dark:text-gray-400">Secondary</p>
              </div>

              <div class="text-center space-y-2 sm:space-y-3">
                <DropdownMenu
                  [items]="basicItems()"
                  [triggerText]="'Ghost'"
                  triggerVariant="ghost"
                  className="w-full"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
                <p class="text-xs text-gray-500 dark:text-gray-400">Ghost</p>
              </div>

              <div class="text-center space-y-2 sm:space-y-3">
                <DropdownMenu
                  [items]="actionItems()"
                  [triggerText]="'Destructive'"
                  triggerVariant="destructive"
                  className="w-full"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
                <p class="text-xs text-gray-500 dark:text-gray-400">Destructive</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Mobile-Responsive Size Variants -->
        <section class="space-y-4 sm:space-y-6">
          <div class="text-center space-y-2 sm:space-y-4">
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Size Variants</h2>
            <p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base px-2">Different sizes to fit your design needs.</p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <div class="text-center space-y-2 sm:space-y-3 w-full sm:w-auto">
                <DropdownMenu
                  [items]="basicItems()"
                  [triggerText]="'Small'"
                  triggerVariant="outline"
                  triggerSize="sm"
                  size="sm"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
                <p class="text-xs text-gray-500 dark:text-gray-400">Small</p>
              </div>

              <div class="text-center space-y-2 sm:space-y-3 w-full sm:w-auto">
                <DropdownMenu
                  [items]="basicItems()"
                  [triggerText]="'Default'"
                  triggerVariant="outline"
                  triggerSize="default"
                  size="default"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
                <p class="text-xs text-gray-500 dark:text-gray-400">Default</p>
              </div>

              <div class="text-center space-y-2 sm:space-y-3 w-full sm:w-auto">
                <DropdownMenu
                  [items]="basicItems()"
                  [triggerText]="'Large'"
                  triggerVariant="outline"
                  triggerSize="lg"
                  size="lg"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
                <p class="text-xs text-gray-500 dark:text-gray-400">Large</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Mobile-Specific Examples -->
        <section class="space-y-4 sm:space-y-6">
          <div class="text-center space-y-2 sm:space-y-4">
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">📱 Mobile Examples</h2>
            <p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base px-2">
              Optimized for mobile devices with touch-friendly interactions.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <!-- Mobile App Header -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Mobile App Header</h3>
              <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg">
                <div class="flex items-center justify-between text-white">
                  <h4 class="font-semibold text-sm">MyApp</h4>
                  <DropdownMenu
                    [items]="basicItems()"
                    [triggerText]="''"
                    [hideChevron]="true"
                    triggerVariant="ghost"
                    triggerSize="sm"
                    variant="glass"
                    (itemSelect)="onItemSelect($event)"
                  >
                    <div slot="trigger" class="p-1.5 hover:bg-white/20 rounded-md transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                      </svg>
                    </div>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            <!-- Mobile Navigation -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Mobile Navigation</h3>
              <div class="flex gap-2">
                <DropdownMenu
                  [items]="basicItems()"
                  [triggerText]="'Menu'"
                  triggerVariant="outline"
                  triggerSize="sm"
                  variant="minimal"
                  className="flex-1"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
                <DropdownMenu
                  [items]="actionItems()"
                  [triggerText]="'Account'"
                  triggerVariant="ghost"
                  triggerSize="sm"
                  variant="glass"
                  className="flex-1"
                  (itemSelect)="onItemSelect($event)"
                >
                </DropdownMenu>
              </div>
            </div>
          </div>
        </section>

        <!-- Mobile-Responsive Advanced Examples -->
        <section class="space-y-4 sm:space-y-6">
          <div class="text-center space-y-2 sm:space-y-4">
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Advanced Examples</h2>
            <p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base px-2">Real-world usage patterns and advanced features.</p>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
            <!-- File Operations -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-gray-900 dark:text-white">File Operations</h3>
              <div class="space-y-3 sm:space-y-4">
                <div class="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                      <div class="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg class="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">document.pdf</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">2.4 MB</p>
                      </div>
                    </div>
                    <DropdownMenu
                      [items]="fileOperations()"
                      [triggerText]="''"
                      [hideChevron]="true"
                      triggerVariant="ghost"
                      triggerSize="sm"
                      className="flex-shrink-0"
                      (itemSelect)="onItemSelect($event)"
                    >
                      <div slot="trigger" class="p-1.5 sm:p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">
                        <svg class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                        </svg>
                      </div>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>

            <!-- User Profile -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-gray-900 dark:text-white">User Profile</h3>
              <div class="space-y-3 sm:space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span class="text-white font-medium text-xs sm:text-sm">JD</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">John Doe</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 truncate">john.doe&#64;example.com</p>
                    </div>
                  </div>
                  <DropdownMenu
                    [menuGroups]="userProfileGroups()"
                    [triggerText]="'Profile'"
                    triggerVariant="outline"
                    triggerSize="sm"
                    className="flex-shrink-0"
                    (itemSelect)="onItemSelect($event)"
                  >
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Mobile-Responsive Features -->
        <section class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 sm:p-6 lg:p-8">
          <h2 class="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8 text-gray-900 dark:text-white">Key Features</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div class="text-center space-y-2 sm:space-y-3">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center mx-auto">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Accessible</h3>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 px-2">Full keyboard navigation and screen reader support</p>
            </div>

            <div class="text-center space-y-2 sm:space-y-3">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center mx-auto">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 class="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Customizable</h3>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 px-2">Multiple variants, sizes, and styling options</p>
            </div>

            <div class="text-center space-y-2 sm:space-y-3 sm:col-span-2 lg:col-span-1">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center mx-auto">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Performance</h3>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 px-2">Built with Angular signals for optimal performance</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  `
})
export class DropdownMenuDemoComponent {
  lastAction = signal<string>('');

  basicItems = signal<DropdownMenuItemData[]>([
    { label: 'New File', value: 'new', shortcut: '⌘N' },
    { label: 'Open', value: 'open', shortcut: '⌘O' },
    { label: 'Save', value: 'save', shortcut: '⌘S' },
    { separator: true },
    { label: 'Exit', value: 'exit', shortcut: '⌘Q' }
  ]);

  actionItems = signal<DropdownMenuItemData[]>([
    { label: 'Edit', value: 'edit' },
    { label: 'Duplicate', value: 'duplicate' },
    { separator: true },
    { label: 'Archive', value: 'archive' },
    { label: 'Delete', value: 'delete', variant: 'destructive' }
  ]);

  iconItems = signal<DropdownMenuItemData[]>([
    {
      label: 'Settings',
      value: 'settings',
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>'
    },
    {
      label: 'Help',
      value: 'help',
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
    },
    {
      label: 'Documentation',
      value: 'docs',
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>'
    }
  ]);

  groupedItems = signal<DropdownMenuGroupData[]>([
    {
      label: 'Profile',
      items: [
        { label: 'View Profile', value: 'profile' },
        { label: 'Edit Profile', value: 'edit-profile' },
        { label: 'Preferences', value: 'preferences' }
      ]
    },
    {
      label: 'Account',
      items: [
        { label: 'Billing', value: 'billing' },
        { label: 'Subscription', value: 'subscription' },
        { separator: true },
        { label: 'Sign Out', value: 'signout', variant: 'destructive' }
      ]
    }
  ]);

  fileOperations = signal<DropdownMenuItemData[]>([
    { label: 'Download', value: 'download' },
    { label: 'Share', value: 'share' },
    { label: 'Rename', value: 'rename' },
    { separator: true },
    { label: 'Move to Trash', value: 'delete', variant: 'destructive' }
  ]);

  userProfileGroups = signal<DropdownMenuGroupData[]>([
    {
      label: 'Account',
      items: [
        {
          label: 'Profile',
          value: 'profile',
          icon: '👤',
          description: 'View and edit your profile',
          shortcut: '⌘⇧P'
        },
        {
          label: 'Preferences',
          value: 'preferences',
          icon: '⚙️',
          description: 'Customize your experience'
        },
        {
          label: 'Security',
          value: 'security',
          icon: '🔒',
          description: 'Manage security settings',
          badge: 'Important'
        }
      ]
    },
    {
      label: 'Workspace',
      items: [
        {
          label: 'Switch Team',
          value: 'switch-team',
          icon: '🔄',
          description: 'Change active workspace'
        },
        {
          label: 'Invite Members',
          value: 'invite',
          icon: '➕',
          description: 'Add team members',
          badge: 'Pro'
        }
      ]
    },
    {
      items: [
        {
          label: 'Sign Out',
          value: 'signout',
          icon: '🚪',
          variant: 'destructive',
          description: 'Sign out of your account'
        }
      ]
    }
  ]);

  // Enhanced premium menu items with descriptions and badges
  premiumMenuItems = signal<DropdownMenuItemData[]>([
    {
      label: 'Dashboard',
      value: 'dashboard',
      icon: '📊',
      description: 'View analytics and metrics',
      shortcut: '⌘D'
    },
    {
      label: 'Projects',
      value: 'projects',
      icon: '📁',
      description: 'Manage your projects',
      shortcut: '⌘P',
      badge: 'Pro'
    },
    {
      label: 'Team',
      value: 'team',
      icon: '👥',
      description: 'Collaborate with team members',
      shortcut: '⌘T'
    },
    { separator: true },
    {
      label: 'Settings',
      value: 'settings',
      icon: '⚙️',
      description: 'Configure your workspace',
      shortcut: '⌘,'
    },
    {
      label: 'Billing',
      value: 'billing',
      icon: '💳',
      description: 'Manage subscription and payments',
      badge: 'New'
    }
  ]);

  // Developer tools with advanced features
  developerMenuItems = signal<DropdownMenuItemData[]>([
    {
      label: 'Console',
      value: 'console',
      icon: '🖥️',
      description: 'Open developer console',
      shortcut: 'F12'
    },
    {
      label: 'Inspect Element',
      value: 'inspect',
      icon: '🔍',
      description: 'Inspect page elements',
      shortcut: '⌘⇧I'
    },
    {
      label: 'Network Monitor',
      value: 'network',
      icon: '📡',
      description: 'Monitor network requests',
      badge: 'Beta'
    },
    { separator: true },
    {
      label: 'Performance',
      value: 'performance',
      icon: '⚡',
      description: 'Analyze performance metrics'
    },
    {
      label: 'Lighthouse',
      value: 'lighthouse',
      icon: '🏮',
      description: 'Run accessibility audit',
      badge: 'New'
    }
  ]);

  // Creative menu items
  creativeMenuItems = signal<DropdownMenuItemData[]>([
    {
      label: 'New Document',
      value: 'new-doc',
      icon: '📄',
      description: 'Create a new document',
      shortcut: '⌘N'
    },
    {
      label: 'New Design',
      value: 'new-design',
      icon: '🎨',
      description: 'Start a new design project',
      shortcut: '⌘⇧N'
    },
    {
      label: 'Import',
      value: 'import',
      icon: '📥',
      description: 'Import existing files',
      shortcut: '⌘I'
    },
    { separator: true },
    {
      label: 'Templates',
      value: 'templates',
      icon: '📋',
      description: 'Browse design templates',
      badge: 'Hot'
    }
  ]);

  // Minimal menu items
  minimalMenuItems = signal<DropdownMenuItemData[]>([
    { label: 'View', value: 'view', icon: '👁️' },
    { label: 'Edit', value: 'edit', icon: '✏️' },
    { label: 'Share', value: 'share', icon: '📤' },
    { separator: true },
    { label: 'Delete', value: 'delete', icon: '🗑️', variant: 'destructive' }
  ]);

  // Admin settings groups
  adminSettingsGroups = signal<DropdownMenuGroupData[]>([
    {
      label: 'System',
      items: [
        {
          label: 'Users',
          value: 'users',
          icon: '👥',
          description: 'Manage user accounts',
          badge: '42'
        },
        {
          label: 'Permissions',
          value: 'permissions',
          icon: '🔐',
          description: 'Configure access control'
        },
        {
          label: 'Audit Logs',
          value: 'audit',
          icon: '📊',
          description: 'View system activity'
        }
      ]
    },
    {
      label: 'Dangerous',
      items: [
        {
          label: 'Reset Database',
          value: 'reset-db',
          icon: '💣',
          variant: 'destructive',
          description: 'Reset all data - cannot be undone'
        },
        {
          label: 'Shutdown System',
          value: 'shutdown',
          icon: '🛑',
          variant: 'destructive',
          description: 'Gracefully shutdown the system'
        }
      ]
    }
  ]);

  // Enhanced feedback system
  lastSelectedItem = signal<DropdownMenuItemData | null>(null);
  lastActionTime = signal<string>('');
  totalInteractions = signal<number>(0);

  onItemSelect(item: DropdownMenuItemData) {
    this.lastSelectedItem.set(item);
    this.lastActionTime.set(new Date().toLocaleTimeString());
    this.totalInteractions.set(this.totalInteractions() + 1);
    this.lastAction.set(`Selected: ${item.label} (${item.value || 'no value'})`);

    // Clear the message after 5 seconds
    setTimeout(() => {
      this.lastAction.set('');
    }, 5000);
  }
}
