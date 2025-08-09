import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCounter, type StatItem } from '@lib/blocks/stats-counter';

@Component({
  selector: 'app-stats-counter-demo',
  standalone: true,
  imports: [CommonModule, StatsCounter],
  template: `
    <!-- Hero Section -->
    <div class="relative min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-slate-900 dark:via-purple-900 dark:to-blue-900 overflow-hidden">
      <!-- Background Decoration -->
      <div class="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
      <div class="absolute inset-0 opacity-5 dark:opacity-[0.02]" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 20px 20px;"></div>
      
      <!-- Floating Elements -->
      <div class="absolute top-20 left-10 w-32 h-32 bg-white/10 dark:bg-white/5 rounded-full blur-xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-40 h-40 bg-purple-300/20 dark:bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-300"></div>
      <div class="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-300/15 dark:bg-pink-400/8 rounded-full blur-lg animate-pulse delay-700"></div>
      
      <!-- Hero Content -->
      <div class="relative z-10 flex items-center justify-center min-h-screen">
        <div class="max-w-6xl mx-auto px-6 text-center text-white dark:text-gray-100">
          <!-- Badge -->
          <div class="inline-flex items-center px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <span class="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Live Analytics Dashboard
          </div>
          
          <!-- Main Title -->
          <h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 dark:from-gray-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight animate-fade-in-up">
            Stats Counter
            <br>
            <span class="text-3xl md:text-5xl font-light">Component</span>
          </h1>
          
          <!-- Subtitle -->
          <p class="text-xl md:text-2xl text-blue-100 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Showcase your metrics with stunning animated counters, multiple variants, and customizable styling options
          </p>
          
          <!-- Hero Stats -->
          <div class="mb-12 animate-fade-in-up delay-400">
            <StatsCounter
              [stats]="heroStats"
              [columns]="4"
              variant="glass"
              statVariant="glass"
              [enableAnimation]="true"
              [animationDuration]="3000"
              [triggerOnScroll]="true"
              [showTrends]="true"
            />
          </div>
          
          
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 dark:text-gray-300/70 animate-bounce">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </div>

    <!-- Main Content -->
    <div class="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <!-- Section 1: Default Stats Counter -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
            Basic Implementation
          </div>
          <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Default Stats Counter
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            The foundation of all stats counters with clean styling and essential features
          </p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          <StatsCounter
            [stats]="defaultStats"
            title="Company Performance"
            description="Key metrics showing our growth and success over the past year"
            badge="2024 Highlights"
            [columns]="4"
            variant="default"
            [enableAnimation]="true"
            [triggerOnScroll]="true"
          />
        </div>
      </section>

      <!-- Section 2: Minimal Variant -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
            Minimal Design
          </div>
          <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Minimal Variant
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Clean and focused design that highlights your key metrics without distractions
          </p>
        </div>
        
        <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-xl border border-purple-200 dark:border-purple-700 p-8">
          <StatsCounter
            [stats]="minimalStats"
            title="Website Analytics"
            description="Essential metrics at a glance"
            [columns]="3"
            variant="minimal"
            statVariant="minimal"
            [showDescriptions]="false"
            [showTrends]="false"
            [enableAnimation]="true"
            [triggerOnScroll]="true"
          />
        </div>
      </section>

      <!-- Section 3: Card Variant with Icons -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-4">
            Enhanced Cards
          </div>
          <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Card Variant with Custom Icons
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Rich card design with custom icons, colors, and comprehensive metrics display
          </p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          <StatsCounter
            [stats]="cardStats"
            title="Product Metrics"
            description="Comprehensive view of product performance and user engagement"
            [columns]="4"
            variant="card"
            statVariant="card"
            [showIcons]="true"
            [showTrends]="true"
            [enableAnimation]="true"
            [triggerOnScroll]="true"
          />
        </div>
      </section>

      <!-- Section 4: Gradient Hero Variant -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium mb-4">
            Premium Display
          </div>
          <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Hero Gradient Variant
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Premium gradient design perfect for showcasing your most important achievements
          </p>
        </div>
        
        <div class="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-orange-900/20 dark:via-red-900/20 dark:to-pink-900/20 rounded-2xl shadow-xl border border-orange-200 dark:border-orange-700 p-8">
          <StatsCounter
            [stats]="heroStats"
            title="Global Impact"
            description="Making a difference worldwide through innovation and dedication"
            badge="Global Reach"
            [columns]="4"
            variant="hero"
            statVariant="glass"
            [showSummary]="true"
            summaryText="These metrics represent our commitment to excellence and innovation"
            [enableAnimation]="true"
            [triggerOnScroll]="true"
          />
        </div>
      </section>

      <!-- Section 5: Interactive Features -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
            Interactive Experience
          </div>
          <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Interactive Stats
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Click on any stat to explore detailed information and interactive features
          </p>
        </div>
        
        <div class="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl shadow-xl border border-indigo-200 dark:border-indigo-700 p-8">
          <StatsCounter
            [stats]="interactiveStats"
            title="Click to Explore"
            description="Interactive statistics with click handlers and hover effects"
            [columns]="3"
            variant="card"
            statVariant="card"
            [clickable]="true"
            [hoverEffect]="true"
            [enableAnimation]="true"
            [triggerOnScroll]="true"
            (statClick)="onStatClick($event)"
            (statHover)="onStatHover($event)"
          />
          
          @if (selectedStat) {
            <div class="mt-8 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-indigo-200 dark:border-indigo-600">
              <h3 class="text-lg font-semibold mb-4 text-indigo-900 dark:text-indigo-100">Selected Stat Details</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div class="flex items-center space-x-2">
                  <span class="font-medium text-gray-700 dark:text-gray-300">Label:</span>
                  <span class="text-gray-900 dark:text-white">{{ selectedStat.label }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="font-medium text-gray-700 dark:text-gray-300">Value:</span>
                  <span class="text-gray-900 dark:text-white">{{ selectedStat.value }}</span>
                </div>
                @if (selectedStat.description) {
                  <div class="md:col-span-2 flex items-start space-x-2">
                    <span class="font-medium text-gray-700 dark:text-gray-300">Description:</span>
                    <span class="text-gray-900 dark:text-white">{{ selectedStat.description }}</span>
                  </div>
                }
                @if (selectedStat.trend) {
                  <div class="md:col-span-2 flex items-center space-x-2">
                    <span class="font-medium text-gray-700 dark:text-gray-300">Trend:</span>
                    <span class="text-gray-900 dark:text-white">{{ selectedStat.trend.direction }} {{ selectedStat.trend.value }}% {{ selectedStat.trend.period }}</span>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Section 6: Animation Showcase -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-medium mb-4">
            Animation Demo
          </div>
          <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Animation Showcase
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Watch the numbers count up with smooth animations and customizable timing
          </p>
        </div>
        
        <div class="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl shadow-xl border border-yellow-200 dark:border-yellow-700 p-8">
          <StatsCounter
            [stats]="animationStats"
            title="Animated Counters"
            description="Watch the numbers count up with smooth animations"
            [columns]="5"
            variant="default"
            statVariant="card"
            [enableAnimation]="true"
            [animationDuration]="3000"
            [animationDelay]="200"
            [triggerOnScroll]="true"
            (animationComplete)="onAnimationComplete($event)"
          />
        </div>
      </section>

      <!-- Section 7: Advanced Features -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium mb-4">
            Advanced Features
          </div>
          <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Custom Fields & Formatting
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Advanced metrics with custom properties, formatting, and detailed metadata
          </p>
        </div>
        
        <div class="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl shadow-xl border border-teal-200 dark:border-teal-700 p-8">
          <StatsCounter
            [stats]="customFieldStats"
            title="Detailed Analytics"
            description="Advanced metrics with custom properties and formatting"
            [columns]="3"
            variant="filled"
            statVariant="gradient"
            [showCustomFields]="true"
            [showTrends]="true"
            [enableAnimation]="true"
            [triggerOnScroll]="true"
          />
        </div>
      </section>

      <!-- Section 8: Content Projection -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded-full text-sm font-medium mb-4">
            Content Projection
          </div>
          <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Custom Header & Footer
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Extend your stats with custom headers, footers, and projected content
          </p>
        </div>
        
        <div class="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl shadow-xl border border-rose-200 dark:border-rose-700 p-8">
          <StatsCounter
            [stats]="projectionStats"
            [columns]="4"
            variant="glass"
            statVariant="icon"
            [showHeader]="true"
            [showFooter]="true"
            [enableAnimation]="true"
            [triggerOnScroll]="true"
          >
            <!-- Custom Header -->
            <div slot="header" class="text-center space-y-4 mb-8">
              <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-lg">
                🚀 Live Dashboard
              </div>
              <h3 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Real-time Performance
              </h3>
              <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Monitor your key performance indicators with live updates and interactive charts
              </p>
            </div>

            <!-- Custom Footer -->
            <div slot="footer" class="text-center space-y-6 mt-8">
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  View Detailed Report
                </button>
                <button class="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
                  Export Data
                </button>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {{ lastUpdated }}
              </p>
            </div>
          </StatsCounter>
        </div>
      </section>

      <!-- Documentation Link -->
      <section class="max-w-4xl mx-auto px-6 py-20">
        <div class="text-center p-8 rounded-2xl bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 border border-violet-200 dark:border-violet-800">
          <div class="space-y-6">
            <div class="inline-flex items-center px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-sm font-medium">
              📚 Documentation
            </div>
            <h3 class="text-3xl font-bold text-violet-900 dark:text-violet-100">Complete Documentation</h3>
            <p class="text-lg text-violet-700 dark:text-violet-300 max-w-2xl mx-auto">
              Explore the full API reference, installation guide, advanced examples, and implementation details in our comprehensive documentation.
            </p>
            <a
              href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/blocks/stats-counter.md"
              target="_blank"
              class="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd" />
              </svg>
              View Stats Counter Documentation
            </a>
          </div>
        </div>
      </section>
    </div>

    <!-- Custom Styles -->
    <style>
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes fade-in-up {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .animate-fade-in {
        animation: fade-in 1s ease-out;
      }
      
      .animate-fade-in-up {
        animation: fade-in-up 1s ease-out;
      }
      
      .animate-fade-in-up.delay-200 {
        animation-delay: 0.2s;
        animation-fill-mode: both;
      }
      
      .animate-fade-in-up.delay-400 {
        animation-delay: 0.4s;
        animation-fill-mode: both;
      }
      
      .animate-fade-in-up.delay-600 {
        animation-delay: 0.6s;
        animation-fill-mode: both;
      }
    </style>
  `
})
export class StatsCounterDemoComponent {
  lastUpdated = new Date().toLocaleString();
  selectedStat: StatItem | null = null;

  // Default stats
  defaultStats: StatItem[] = [
    {
      id: 1,
      value: 150000,
      label: 'Happy Customers',
      description: 'Satisfied clients worldwide',
      prefix: '',
      suffix: '+',
      trend: { direction: 'up', value: 12, period: 'this month' }
    },
    {
      id: 2,
      value: 2500,
      label: 'Projects Completed',
      description: 'Successfully delivered',
      suffix: '+',
      trend: { direction: 'up', value: 8, period: 'this quarter' }
    },
    {
      id: 3,
      value: 98.5,
      label: 'Success Rate',
      description: 'Project completion rate',
      suffix: '%',
      trend: { direction: 'up', value: 2.5, period: 'this year' }
    },
    {
      id: 4,
      value: 50,
      label: 'Team Members',
      description: 'Expert professionals',
      suffix: '+',
      trend: { direction: 'up', value: 25, period: 'this year' }
    }
  ];

  // Minimal stats
  minimalStats: StatItem[] = [
    {
      value: 1250000,
      label: 'Total Revenue',
      prefix: '$'
    },
    {
      value: 45,
      label: 'Growth Rate',
      suffix: '%'
    },
    {
      value: 892,
      label: 'Active Users',
      suffix: 'K'
    }
  ];

  // Card stats with icons
  cardStats: StatItem[] = [
    {
      id: 'downloads',
      value: 2500000,
      label: 'Downloads',
      description: 'Total app downloads across all platforms',
      icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
      </svg>`,
      color: '#3B82F6',
      trend: { direction: 'up', value: 15, period: 'this month' }
    },
    {
      id: 'users',
      value: 450000,
      label: 'Active Users',
      description: 'Monthly active user base',
      icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
      </svg>`,
      color: '#10B981',
      trend: { direction: 'up', value: 8, period: 'this month' }
    },
    {
      id: 'rating',
      value: 4.9,
      label: 'App Rating',
      description: 'Average user rating',
      icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>`,
      color: '#F59E0B',
      trend: { direction: 'up', value: 0.2, period: 'this month' }
    },
    {
      id: 'support',
      value: 24,
      label: 'Support Response',
      description: 'Average response time in hours',
      icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"/>
      </svg>`,
      color: '#8B5CF6',
      trend: { direction: 'down', value: 15, period: 'this month' }
    }
  ];

  // Hero stats
  heroStats: StatItem[] = [
    {
      value: 195,
      label: 'Countries Served',
      description: 'Global presence across continents',
      suffix: '+',
      trend: { direction: 'up', value: 5, period: 'this year' }
    },
    {
      value: 50000000,
      label: 'Lives Impacted',
      description: 'People reached through our services',
      suffix: '+',
      formatter: (value) => `${(value / 1000000).toFixed(0)}M+`,
      trend: { direction: 'up', value: 20, period: 'this year' }
    },
    {
      value: 1000,
      label: 'Team Members',
      description: 'Dedicated professionals worldwide',
      suffix: '+',
      trend: { direction: 'up', value: 15, period: 'this year' }
    },
    {
      value: 99.9,
      label: 'Uptime',
      description: 'Service reliability guarantee',
      suffix: '%',
      trend: { direction: 'neutral', value: 0, period: 'this month' }
    }
  ];

  // Horizontal layout stats
  horizontalStats: StatItem[] = [
    {
      value: 12500000,
      label: 'Total Revenue',
      description: 'Quarterly revenue performance',
      prefix: '$',
      formatter: (value) => `${(value / 1000000).toFixed(1)}M`,
      trend: { direction: 'up', value: 18, period: 'vs last quarter' }
    },
    {
      value: 850000,
      label: 'Operating Profit',
      description: 'Net operating income',
      prefix: '$',
      formatter: (value) => `${(value / 1000).toFixed(0)}K`,
      trend: { direction: 'up', value: 12, period: 'vs last quarter' }
    }
  ];

  // Custom fields stats
  customFieldStats: StatItem[] = [
    {
      value: 95.8,
      label: 'Performance Score',
      description: 'Overall system performance rating',
      suffix: '%',
      customFields: {
        lastUpdated: '2024-01-15',
        dataSource: 'Real-time Analytics',
        accuracy: '99.2%',
        refreshRate: '5 minutes'
      },
      trend: { direction: 'up', value: 3.2, period: 'this week' }
    },
    {
      value: 2847,
      label: 'API Requests',
      description: 'Requests processed per minute',
      suffix: '/min',
      customFields: {
        peakTime: '14:30 UTC',
        avgResponseTime: '120ms',
        errorRate: '0.01%',
        cacheHitRate: '94.5%'
      },
      trend: { direction: 'up', value: 25, period: 'this hour' }
    },
    {
      value: 1024,
      label: 'Storage Used',
      description: 'Database storage utilization',
      suffix: 'GB',
      customFields: {
        totalCapacity: '5TB',
        compressionRatio: '3.2:1',
        backupStatus: 'Completed',
        lastOptimized: '2024-01-14'
      },
      trend: { direction: 'up', value: 8, period: 'this month' }
    }
  ];

  // Content projection stats
  projectionStats: StatItem[] = [
    {
      value: 99.99,
      label: 'Uptime',
      suffix: '%',
      color: '#10B981'
    },
    {
      value: 2.5,
      label: 'Response Time',
      suffix: 'ms',
      color: '#3B82F6'
    },
    {
      value: 1250,
      label: 'Requests/sec',
      color: '#F59E0B'
    },
    {
      value: 42,
      label: 'Servers Online',
      color: '#8B5CF6'
    }
  ];

  // Animation stats
  animationStats: StatItem[] = [
    {
      value: 1500,
      label: 'Orders',
      animationDelay: 0
    },
    {
      value: 89,
      label: 'Customer Satisfaction',
      suffix: '%',
      animationDelay: 100
    },
    {
      value: 24,
      label: 'Support Hours',
      suffix: '/7',
      animationDelay: 200
    },
    {
      value: 50,
      label: 'Countries',
      suffix: '+',
      animationDelay: 300
    },
    {
      value: 99.5,
      label: 'Uptime',
      suffix: '%',
      animationDelay: 400
    }
  ];

  // Interactive stats
  interactiveStats: StatItem[] = [
    {
      id: 'revenue',
      value: 2500000,
      label: 'Annual Revenue',
      description: 'Total revenue for the current fiscal year',
      prefix: '$',
      formatter: (value) => `${(value / 1000000).toFixed(1)}M`,
      trend: { direction: 'up', value: 22, period: 'vs last year' }
    },
    {
      id: 'customers',
      value: 15847,
      label: 'Active Customers',
      description: 'Current active customer base',
      trend: { direction: 'up', value: 15, period: 'this quarter' }
    },
    {
      id: 'satisfaction',
      value: 4.8,
      label: 'Customer Satisfaction',
      description: 'Average rating from customer feedback',
      suffix: '/5',
      trend: { direction: 'up', value: 0.3, period: 'this month' }
    }
  ];

  onStatClick(event: {stat: StatItem, index: number}): void {
    this.selectedStat = event.stat;
    console.log('Stat clicked:', event);
  }

  onStatHover(event: {stat: StatItem, index: number}): void {
    console.log('Stat hovered:', event);
  }

  onAnimationComplete(stats: StatItem[]): void {
    console.log('Animation completed for stats:', stats);
  }
}
