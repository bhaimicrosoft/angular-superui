
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  TooltipDirective,
  TooltipService,
  type TooltipPosition,
  type TooltipTrigger,
  type TooltipVariant,
  type TooltipSize
} from '@lib/components/tooltip';
import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';

interface TooltipStats {
  totalShown: number;
  totalHidden: number;
  currentlyActive: number;
  averageDisplayTime: number;
}

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TooltipDirective
  ],
  styles: [`
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }

    @keyframes pulse-glow {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
      }
    }

    @keyframes gentle-glow {
      0%, 100% {
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
      }
      50% {
        box-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
      }
    }

    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .tooltip-float {
      animation: float 6s ease-in-out infinite;
    }

    .tooltip-pulse {
      animation: pulse-glow 4s ease-in-out infinite;
    }

    .tooltip-glow {
      animation: gentle-glow 3s ease-in-out infinite;
    }

    /* Glass morphism effect */
    .backdrop-blur-lg {
      backdrop-filter: blur(16px);
    }

    /* Enhanced focus styles for accessibility */
    button:focus-visible,
    [tabindex]:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
      border-radius: 8px;
    }

    /* Dark mode adjustments */
    @media (prefers-color-scheme: dark) {
      .tooltip-glow {
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
      }
    }

    /* Mobile optimizations */
    @media (max-width: 768px) {
      .tooltip-float {
        animation-duration: 4s;
      }

      .tooltip-pulse {
        animation-duration: 3s;
      }
    }

    /* Reduced motion for accessibility */
    @media (prefers-reduced-motion: reduce) {
      .tooltip-float,
      .tooltip-pulse,
      .tooltip-glow,
      .animate-bounce,
      .animate-ping {
        animation: none;
      }
    }
  `],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">

      <!-- Hero Section -->
      <div class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-900">
        <!-- Animated Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px); background-size: 50px 50px;"></div>
        </div>

        <!-- Floating Elements -->
        <div class="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full tooltip-float"></div>
        <div class="absolute top-32 right-20 w-12 h-12 bg-white/20 rounded-lg tooltip-pulse"></div>
        <div class="absolute bottom-20 left-1/4 w-16 h-16 bg-white/15 rounded-full tooltip-glow"></div>

        <div class="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div class="text-center">
            <!-- Badge -->
            <div class="inline-flex items-center gap-3 mb-8">
              <div class="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-ping"></div>
              <span class="text-sm font-bold text-blue-200 uppercase tracking-widest">Angular SuperUI Tooltip</span>
              <div class="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
            </div>

            <!-- Main Title -->
            <h1 class="text-6xl md:text-8xl font-black mb-8 relative">
              <span class="relative z-10 bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent drop-shadow-2xl">
                Intelligent
              </span>
              <br>
              <span class="relative z-10 bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl">
                Tooltips
              </span>
            </h1>

            <p class="text-xl md:text-2xl text-blue-100/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience tooltips with <span class="text-blue-300 font-semibold">CDK-powered positioning</span>,
              <span class="text-indigo-300 font-semibold">smart collision detection</span>, and
              <span class="text-purple-300 font-semibold">perfect accessibility</span>.
            </p>

            <!-- Interactive Preview Buttons -->
            <div class="max-w-4xl mx-auto">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <button
                  tooltip="Beautiful default tooltip with perfect positioning!"
                  tooltipPosition="top"
                  tooltipVariant="default"
                  class="group relative px-6 py-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300 tooltip-glow"
                >
                  <div class="text-2xl mb-2">🎯</div>
                  <div class="text-sm font-medium">Hover Top</div>
                </button>

                <button
                  tooltip="Click me to toggle this interactive tooltip!"
                  tooltipPosition="bottom"
                  tooltipTrigger="click"
                  tooltipVariant="light"
                  class="group relative px-6 py-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300 tooltip-pulse"
                >
                  <div class="text-2xl mb-2">👆</div>
                  <div class="text-sm font-medium">Click Bottom</div>
                </button>

                <button
                  tooltip="Success tooltip with custom styling and longer content to demonstrate wrapping behavior"
                  tooltipPosition="left"
                  tooltipVariant="success"
                  tooltipSize="lg"
                  class="group relative px-6 py-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                >
                  <div class="text-2xl mb-2">✅</div>
                  <div class="text-sm font-medium">Left Success</div>
                </button>

                <button
                  tooltip="Focus-triggered tooltip for accessibility"
                  tooltipPosition="right"
                  tooltipTrigger="focus"
                  tooltipVariant="info"
                  class="group relative px-6 py-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300 tooltip-float"
                >
                  <div class="text-2xl mb-2">🎨</div>
                  <div class="text-sm font-medium">Focus Right</div>
                </button>
              </div>
            </div>

            <!-- Stats Display -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div class="text-center">
                <div class="text-3xl md:text-4xl font-bold text-white mb-2">12</div>
                <div class="text-blue-200/70 text-sm">Positions</div>
              </div>
              <div class="text-center">
                <div class="text-3xl md:text-4xl font-bold text-white mb-2">{{ stats().totalShown }}</div>
                <div class="text-blue-200/70 text-sm">Total Shown</div>
              </div>
              <div class="text-center">
                <div class="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
                <div class="text-blue-200/70 text-sm">Accessible</div>
              </div>
              <div class="text-center">
                <div class="text-3xl md:text-4xl font-bold text-white mb-2">{{ stats().currentlyActive }}</div>
                <div class="text-blue-200/70 text-sm">Active Now</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
          <div class="animate-bounce">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">

        <!-- Features Grid -->
        <section class="mb-20">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built with Angular CDK for professional-grade applications
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Feature 1: Smart Positioning -->
            <div class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div class="text-center">
                <div
                  tooltip="CDK Overlay automatically handles viewport collisions and repositioning!"
                  tooltipPosition="top"
                  tooltipVariant="info"
                  class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 mx-auto cursor-help"
                >
                  🧠
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Smart Positioning</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Angular CDK Overlay automatically handles viewport collisions and repositioning with intelligent fallbacks.
                </p>
              </div>
            </div>

            <!-- Feature 2: Multiple Triggers -->
            <div class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div class="text-center">
                <div
                  tooltip="Supports hover, click, focus, and manual triggers"
                  tooltipPosition="top"
                  tooltipVariant="success"
                  tooltipTrigger="click"
                  class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 mx-auto cursor-pointer"
                >
                  ⚡
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Multiple Triggers</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Supports hover, click, focus, and manual triggers for maximum flexibility and accessibility.
                </p>
              </div>
            </div>

            <!-- Feature 3: Beautiful Variants -->
            <div class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div class="text-center">
                <div
                  tooltip="7 beautiful variants with dark mode support!"
                  tooltipPosition="top"
                  tooltipVariant="warning"
                  class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 mx-auto cursor-help"
                >
                  🎨
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Beautiful Variants</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Seven stunning variants with full dark mode support and customizable styling options.
                </p>
              </div>
            </div>

            <!-- Feature 4: Accessibility First -->
            <div class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div class="text-center">
                <div
                  tooltip="WCAG compliant with keyboard navigation and screen reader support"
                  tooltipPosition="bottom"
                  tooltipVariant="info"
                  tooltipTrigger="focus"
                  class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 mx-auto cursor-help"
                  tabindex="0"
                >
                  ♿
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Accessibility First</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  WCAG compliant with full keyboard navigation and screen reader support built-in.
                </p>
              </div>
            </div>

            <!-- Feature 5: Performance -->
            <div class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div class="text-center">
                <div
                  tooltip="Lightweight and performant with Angular signals"
                  tooltipPosition="bottom"
                  tooltipVariant="success"
                  class="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 mx-auto cursor-help"
                >
                  🚀
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">High Performance</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Built with Angular signals for optimal performance and minimal bundle size impact.
                </p>
              </div>
            </div>

            <!-- Feature 6: Developer Experience -->
            <div class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div class="text-center">
                <div
                  tooltip="Simple directive API with TypeScript support"
                  tooltipPosition="bottom"
                  tooltipVariant="error"
                  class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 mx-auto cursor-help"
                >
                  💻
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Developer Friendly</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Simple directive API with full TypeScript support and comprehensive documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Variants Showcase -->
        <section class="mb-20">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Beautiful Variants
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose from seven carefully crafted variants for every use case
            </p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            @for (variant of variants; track variant.name) {
              <div class="text-center">
                <button
                  [tooltip]="variant.description"
                  [tooltipVariant]="variant.name"
                  tooltipPosition="top"
                  class="w-full aspect-square bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-105 group"
                >
                  <div class="text-3xl mb-3">{{ variant.emoji }}</div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {{ variant.name }}
                  </div>
                </button>
              </div>
            }
          </div>
        </section>

        <!-- Position Showcase -->
        <section class="mb-[10rem]">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              12 Smart Positions
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Intelligent positioning with automatic collision detection
            </p>
          </div>

          <div class="relative max-w-4xl mx-auto">
            <!-- Central Element -->
            <div class="flex justify-center mb-12">
              <div class="relative">
                <!-- Top positions -->
                <div class="absolute -top-16 left-1/2 transform -translate-x-1/2 flex gap-4">
                  <button
                    tooltip="Top Start Position"
                    tooltipPosition="top-start"
                    tooltipVariant="info"
                    class="w-12 h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    ↖️
                  </button>
                  <button
                    tooltip="Top Center Position"
                    tooltipPosition="top"
                    tooltipVariant="default"
                    class="w-12 h-12 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    ⬆️
                  </button>
                  <button
                    tooltip="Top End Position"
                    tooltipPosition="top-end"
                    tooltipVariant="success"
                    class="w-12 h-12 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                  >
                    ↗️
                  </button>
                </div>

                <!-- Side positions -->
                <div class="absolute top-1/2 -left-16 transform -translate-y-1/2 flex flex-col gap-4">
                  <button
                    tooltip="Left Start Position"
                    tooltipPosition="left-start"
                    tooltipVariant="warning"
                    class="w-12 h-12 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
                  >
                    ↖️
                  </button>
                  <button
                    tooltip="Left Center Position"
                    tooltipPosition="left"
                    tooltipVariant="error"
                    class="w-12 h-12 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                  >
                    ⬅️
                  </button>
                  <button
                    tooltip="Left End Position"
                    tooltipPosition="left-end"
                    tooltipVariant="info"
                    class="w-12 h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    ↙️
                  </button>
                </div>

                <div class="absolute top-1/2 -right-16 transform -translate-y-1/2 flex flex-col gap-4">
                  <button
                    tooltip="Right Start Position"
                    tooltipPosition="right-start"
                    tooltipVariant="success"
                    class="w-12 h-12 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                  >
                    ↗️
                  </button>
                  <button
                    tooltip="Right Center Position"
                    tooltipPosition="right"
                    tooltipVariant="default"
                    class="w-12 h-12 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    ➡️
                  </button>
                  <button
                    tooltip="Right End Position"
                    tooltipPosition="right-end"
                    tooltipVariant="warning"
                    class="w-12 h-12 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
                  >
                    ↘️
                  </button>
                </div>

                <!-- Bottom positions -->
                <div class="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-4">
                  <button
                    tooltip="Bottom Start Position"
                    tooltipPosition="bottom-start"
                    tooltipVariant="error"
                    class="w-12 h-12 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                  >
                    ↙️
                  </button>
                  <button
                    tooltip="Bottom Center Position"
                    tooltipPosition="bottom"
                    tooltipVariant="info"
                    class="w-12 h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    ⬇️
                  </button>
                  <button
                    tooltip="Bottom End Position"
                    tooltipPosition="bottom-end"
                    tooltipVariant="default"
                    class="w-12 h-12 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    ↘️
                  </button>
                </div>

                <!-- Center element -->
                <div class="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl">
                  🎯
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Call to Action -->
        <section class="text-center">
          <div class="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-12 text-white">
            <h2 class="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your UI?
            </h2>
            <p class="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of developers using Angular SuperUI to build stunning applications
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/tooltip.md"
                tooltip="View Documentation!"
                target="_blank"
                tooltipPosition="top"
                tooltipVariant="light"
                class="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                View Documentation
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  `
})
export class TooltipDemoComponent implements OnInit {
  private tooltipService = inject(TooltipService);

  // Statistics tracking
  stats = signal<TooltipStats>({
    totalShown: 0,
    totalHidden: 0,
    currentlyActive: 0,
    averageDisplayTime: 0
  });

  // Tooltip variants for showcase
  variants = [
    {
      name: 'default' as TooltipVariant,
      emoji: '🎯',
      icon: 'text-gray-600',
      description: 'Classic dark tooltip',
      tooltipText: 'Default tooltip with classic dark styling',
      buttonClass: 'bg-gray-500 hover:bg-gray-600 text-white'
    },
    {
      name: 'light' as TooltipVariant,
      emoji: '☀️',
      icon: 'text-yellow-500',
      description: 'Clean light theme',
      tooltipText: 'Light tooltip with bright background',
      buttonClass: 'bg-yellow-500 hover:bg-yellow-600 text-white'
    },
    {
      name: 'success' as TooltipVariant,
      emoji: '✅',
      icon: 'text-green-500',
      description: 'Success notifications',
      tooltipText: 'Success tooltip for positive feedback',
      buttonClass: 'bg-green-500 hover:bg-green-600 text-white'
    },
    {
      name: 'warning' as TooltipVariant,
      emoji: '⚠️',
      icon: 'text-yellow-600',
      description: 'Warning messages',
      tooltipText: 'Warning tooltip for important notices',
      buttonClass: 'bg-yellow-600 hover:bg-yellow-700 text-white'
    },
    {
      name: 'error' as TooltipVariant,
      emoji: '❌',
      icon: 'text-red-500',
      description: 'Error states',
      tooltipText: 'Error tooltip for critical messages',
      buttonClass: 'bg-red-500 hover:bg-red-600 text-white'
    },
    {
      name: 'info' as TooltipVariant,
      emoji: 'ℹ️',
      icon: 'text-blue-500',
      description: 'Information hints',
      tooltipText: 'Info tooltip for helpful information',
      buttonClass: 'bg-blue-500 hover:bg-blue-600 text-white'
    },
    {
      name: 'dark' as TooltipVariant,
      emoji: '🌙',
      icon: 'text-slate-600',
      description: 'Deep dark theme',
      tooltipText: 'Dark tooltip with enhanced contrast',
      buttonClass: 'bg-slate-600 hover:bg-slate-700 text-white'
    }
  ];

  // Manual tooltip control
  private manualTooltipId?: string;

  ngOnInit(): void {
    // Track tooltip events for statistics
    this.setupStatisticsTracking();
  }

  toggleManualTooltip(element: HTMLElement): void {
    if (this.manualTooltipId && this.tooltipService.isVisible(this.manualTooltipId)) {
      this.tooltipService.hide(this.manualTooltipId);
      this.manualTooltipId = undefined;
    } else {
      this.manualTooltipId = this.tooltipService.show(element, {
        content: 'This tooltip is controlled programmatically via the TooltipService! 🎮',
        position: 'top',
        variant: 'info',
        trigger: 'manual'
      });
    }
  }

  private setupStatisticsTracking(): void {
    // Update stats periodically
    setInterval(() => {
      const activeTooltips = this.tooltipService.getActiveTooltips();
      const currentStats = this.stats();

      this.stats.set({
        ...currentStats,
        currentlyActive: activeTooltips.size
      });
    }, 100);

    // Mock some statistics for demo purposes
    setInterval(() => {
      const currentStats = this.stats();
      this.stats.set({
        totalShown: currentStats.totalShown + Math.floor(Math.random() * 3),
        totalHidden: currentStats.totalHidden + Math.floor(Math.random() * 2),
        currentlyActive: currentStats.currentlyActive,
        averageDisplayTime: Math.floor(2000 + Math.random() * 3000)
      });
    }, 5000);
  }
}
