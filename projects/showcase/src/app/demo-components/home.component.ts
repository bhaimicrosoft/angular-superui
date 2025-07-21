import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <section
      class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center max-w-5xl mx-auto">
          <!-- Badge -->
          <div
            class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Angular 17+ Ready
          </div>

          <!-- Main Heading -->
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Build Stunning
            <br>
            <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Angular Apps
            </span>
          </h1>

          <!-- Subtitle -->
          <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            A comprehensive collection of modern, accessible, and customizable UI components
            built with Angular 17+ and Tailwind CSS.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a
              (click)="scrollToComponents()"
              class="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer text-lg"
            >
              <span class="relative z-10">Explore Components</span>
              <div
                class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>

            <a
              href="https://github.com/bhaimicrosoft/angular-superui"
              target="_blank"
              rel="noopener noreferrer"
              class="group relative inline-flex items-center px-10 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-300 cursor-pointer text-lg backdrop-blur-sm bg-white/80 dark:bg-gray-800/80"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </div>

          <!-- Buy Me a Coffee -->
          <div class="mb-16">
            <a
              href="https://buymeacoffee.com/bhaikaju"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium rounded-xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            >
              ☕ Buy me a coffee
            </a>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div
              class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{{ stats.components }}+</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Components</div>
            </div>
            <div
              class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
              <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{{ stats.examples }}+</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Examples</div>
            </div>
            <div
              class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
              <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">100%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Accessible</div>
            </div>
            <div
              class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
              <div class="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">MIT</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Licensed</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"></div>
      <div class="absolute top-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>
      <div class="absolute bottom-20 left-20 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl"></div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Angular SuperUI?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Built with modern Angular patterns and best practices in mind.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let feature of features"
               class="text-center p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                 [ngClass]="feature.iconBg">
              <svg class="w-8 h-8" [ngClass]="feature.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="feature.icon"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Components Showcase -->
    <section id="components" class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Our Components
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Click on any component below to see live examples and implementation details.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            *ngFor="let component of components"
            [routerLink]="component.route"
            class="block p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group"
          >
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-4" [ngClass]="component.bgColor">
                <svg class="w-6 h-6" [ngClass]="component.iconColor" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        [attr.d]="component.icon"></path>
                </svg>
              </div>
              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {{ component.name }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ component.category }}</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-sm">{{ component.description }}</p>
            <div
              class="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
              View Examples
              <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor"
                   viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Getting Started Section -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Get Started in Minutes
          </h2>

          <div class="bg-gray-900 dark:bg-gray-800 rounded-xl p-6 text-left mb-8">
            <div class="flex items-center mb-4">
              <div class="flex space-x-2">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span class="ml-4 text-gray-400 text-sm">Terminal</span>
            </div>
            <pre class="text-green-400 font-mono text-2xl overflow-x-auto">
<span class="text-gray-500"># Initialize Angular SuperUI in your project</span>
ngsui-cli init

<span class="text-gray-500"># Add specific components</span>
ngsui-cli add button card dialog

<span class="text-gray-500"># Or add all available components</span>
ngsui-cli add --all

<span class="text-gray-500"># Import components in your app and start building!</span>
ng serve
            </pre>
          </div>

          <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Ready to transform your Angular applications? Explore our components in the mega menu above
            or check out the mobile menu on smaller screens.
          </p>

          <a
            href="https://github.com/bhaimicrosoft/angular-superui"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Star on GitHub
          </a>
        </div>

      </div>
    </section>
  `,
  styles: []
})
export class HomeComponent {
  router = inject(Router);

  stats = {
    components: 16,
    examples: 50
  };

  features = [
    {
      title: 'Modern Angular',
      description: 'Built with Angular 17+ standalone components and signals',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Fully Accessible',
      description: 'WCAG compliant with proper ARIA attributes and keyboard navigation',
      icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Tailwind Powered',
      description: 'Styled with Tailwind CSS for easy customization and theming',
      icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'TypeScript Native',
      description: 'Full TypeScript support with strict typing and IntelliSense',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      title: 'Dark Mode Ready',
      description: 'Built-in dark mode support with smooth transitions',
      icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
      iconBg: 'bg-gray-100 dark:bg-gray-700',
      iconColor: 'text-gray-600 dark:text-gray-400'
    },
    {
      title: 'Developer Friendly',
      description: 'Easy to use with comprehensive documentation and examples',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400'
    }
  ];

  components = [
    {
      name: 'Button',
      route: '/components/button',
      description: 'Interactive buttons with various styles and states',
      category: 'Form',
      icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      name: 'Badge',
      route: '/components/badge',
      description: 'Small status indicators and notification badges',
      category: 'Display',
      icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      name: 'Alert',
      route: '/components/alert',
      description: 'Display important messages and notifications',
      category: 'Feedback',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      name: 'Avatar',
      route: '/components/avatar',
      description: 'User profile pictures with fallbacks',
      category: 'Display',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      name: 'Card',
      route: '/components/card',
      description: 'Flexible content containers',
      category: 'Layout',
      icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      name: 'Dialog',
      route: '/components/dialog',
      description: 'Modal dialogs and overlays',
      category: 'Overlay',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      bgColor: 'bg-pink-100 dark:bg-pink-900/30',
      iconColor: 'text-pink-600 dark:text-pink-400'
    },
    {
      name: 'Accordion',
      route: '/components/accordion',
      description: 'Collapsible content sections',
      category: 'Layout',
      icon: 'M19 14l-7 7m0 0l-7-7m7 7V3',
      bgColor: 'bg-teal-100 dark:bg-teal-900/30',
      iconColor: 'text-teal-600 dark:text-teal-400'
    },
    {
      name: 'Calendar',
      route: '/components/calendar',
      description: 'Date picker and calendar views',
      category: 'Form',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      iconColor: 'text-red-600 dark:text-red-400'
    },
    {
      name: 'Carousel',
      route: '/components/carousel',
      description: 'Image and content sliders',
      category: 'Display',
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
      iconColor: 'text-cyan-600 dark:text-cyan-400'
    },
    {
      name: 'Checkbox',
      route: '/components/checkbox',
      description: 'Selection controls for forms',
      category: 'Form',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      name: 'Breadcrumb',
      route: '/components/breadcrumb',
      description: 'Navigation hierarchy indicators',
      category: 'Navigation',
      icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400'
    }
  ];

  scrollToComponents() {
    document.getElementById('components')?.scrollIntoView({behavior: 'smooth'});
  }
}
