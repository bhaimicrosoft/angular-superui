import { Component, OnInit, OnDestroy, HostListener, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation.component';
import {Avatar, AvatarFallback, AvatarImage} from '@lib/components/avatar';
import { ThemeService } from '@lib/components/theme-switcher';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, Avatar, AvatarImage, AvatarFallback],
  template: `
    <!-- SEO-friendly semantic structure -->
    <div class="min-h-screen bg-background text-foreground scroll-smooth" itemscope itemtype="https://schema.org/WebApplication">
      <!-- Skip to main content for accessibility -->
      <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
        Skip to main content
      </a>

      <!-- Navigation -->
      <app-navigation></app-navigation>

      <!-- Main Content Area -->
      <main id="main-content" class="relative bg-background" role="main">
        <router-outlet></router-outlet>
      </main>

      <!-- Go to Top Button -->
      <button
        *ngIf="showGoToTop"
        (click)="scrollToTop()"
        class="fixed bottom-8 right-8 z-50 group p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
        title="Go to top"
        aria-label="Scroll to top"
      >
        <svg
          class="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>

        <!-- Animated Ring -->
        <div class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-75 animate-ping"></div>
      </button>

      <!-- 🚀 MICROSOFT-INSPIRED PROFESSIONAL FOOTER 🚀 -->
      <footer class="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 border-t border-gray-200/50 dark:border-gray-800/50">
        <!-- Subtle Grid Pattern -->
        <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0); background-size: 20px 20px;"></div>
        </div>

        <!-- Geometric Accent Lines -->
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-pulse"></div>

        <div class="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <!-- Main Content Grid -->
          <div class="grid lg:grid-cols-3 gap-12 lg:gap-16 mb-16">

            <!-- Left Column: Personal Brand -->
            <div class="lg:col-span-1">
              <div class="flex items-center gap-8 mb-6">
                <div class="relative">
                  <Avatar size="2xl" class="border-2 border-gray-200 dark:border-gray-700 shadow-lg">
                    <AvatarImage src="/me.jpg" alt="Indranil Mukherjee" class="object-cover"/>
                    <AvatarFallback class="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">BK</AvatarFallback>
                  </Avatar>
                  <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full">
                    <div class="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">Indranil Mukherjee</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Senior Full Stack Developer</p>
                  <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Available for collaboration</span>
                  </div>
                </div>
              </div>

              <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Crafting exceptional digital experiences with modern web technologies.
                Passionate about building scalable, accessible, and performant applications.
              </p>

              <!-- Quick Actions -->
              <div class="flex gap-3">
                <a
                  href="https://bhaikaju.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  <span>Portfolio</span>
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
                <a
                  href="mailto:bhaikaju@gmail.com"
                  class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  <span>Contact</span>
                </a>
              </div>
            </div>

            <!-- Center Column: Links -->
            <div class="lg:col-span-1">
              <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">Connect</h4>
              <div class="space-y-4">
                <a
                  href="https://github.com/bhaimicrosoft/angular-superui"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  <div class="w-5 h-5 flex-shrink-0">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <span class="text-sm">GitHub</span>
                  <svg class="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>

                <a
                  href="https://www.npmjs.com/package/angular-superui"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  <div class="w-5 h-5 flex-shrink-0">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113L5.13 5.323z"/>
                    </svg>
                  </div>
                  <span class="text-sm">NPM Package</span>
                  <svg class="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>

                <a
                  href="https://www.youtube.com/@ProgrammingIsFun"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  <div class="w-5 h-5 flex-shrink-0">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <span class="text-sm">YouTube</span>
                  <svg class="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/in/bhaikaju/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  <div class="w-5 h-5 flex-shrink-0">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span class="text-sm">LinkedIn</span>
                  <svg class="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Right Column: Project Info -->
            <div class="lg:col-span-1">
              <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">Angular SuperUI</h4>
              <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span class="text-white font-bold text-sm">⚡</span>
                  </div>
                  <div>
                    <h5 class="font-semibold text-gray-900 dark:text-white text-sm">v2.0.1</h5>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Latest Release</p>
                  </div>
                </div>

                <p class="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  Production-ready Angular component library with 39 accessible components, built with TypeScript and TailwindCSS v4.
                </p>

                <div class="grid grid-cols-2 gap-3 text-xs">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span class="text-gray-600 dark:text-gray-400">39 Components</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span class="text-gray-600 dark:text-gray-400">TailwindCSS v4</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span class="text-gray-600 dark:text-gray-400">TypeScript</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span class="text-gray-600 dark:text-gray-400">Zero Dependencies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Bar -->
          <div class="flex flex-col lg:flex-row items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4 lg:mb-0">
              <span>© 2025 Angular SuperUI</span>
              <div class="w-1 h-4 bg-gray-300 dark:bg-gray-600"></div>
              <span>MIT License</span>
              <div class="w-1 h-4 bg-gray-300 dark:bg-gray-600"></div>
              <div class="flex items-center gap-2">
                <span>Built with</span>
                <span class="text-red-500">♥</span>
                <span>by Indranil Mukherjee</span>
              </div>
            </div>

            <div class="flex items-center gap-6">
              <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Active Development</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs text-gray-400 dark:text-gray-500">Powered by</span>
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L3 17L12 22L21 17L22 7L12 2Z" fill="#DD0031"/>
                    <path d="M12 2V22L21 17L22 7L12 2Z" fill="#C3002F"/>
                    <path d="M12 6.5L16.5 16H14.75L13.75 13.5H10.25L9.25 16H7.5L12 6.5ZM12 9.5L10.75 12H13.25L12 9.5Z" fill="white"/>
                  </svg>
                  <span class="text-xs font-medium text-gray-600 dark:text-gray-300">Angular</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Subtle Accent Line -->
        <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50"></div>
      </footer>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular SuperUI';
  showGoToTop = false;
  private themeService = inject(ThemeService);

  @HostBinding('class.dark')
  get isDarkMode() {
    return this.themeService.isDarkMode();
  }

  ngOnInit() {
    // Initialize scroll detection
    this.checkScrollPosition();
  }

  ngOnDestroy() {
    // Cleanup is automatically handled by Angular for HostListener
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScrollPosition();
  }

  private checkScrollPosition() {
    this.showGoToTop = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
