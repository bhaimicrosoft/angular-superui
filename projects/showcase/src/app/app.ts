import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation.component';
import {Avatar, AvatarFallback, AvatarImage} from '@lib/avatar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, Avatar, AvatarImage, AvatarFallback],
  template: `
    <div class="min-h-screen bg-background text-foreground scroll-smooth">
      <app-navigation></app-navigation>
      <main class="relative bg-background">
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

      <!-- Stunning Footer -->
      <footer
        class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 dark:from-slate-950 dark:via-gray-950 dark:to-black"
      >
        <!-- Background Effects -->
        <div class="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
        ></div>

        <div class="relative z-10 container mx-auto px-6 py-16">
          <!-- Main Footer Content -->
          <div class="grid lg:grid-cols-3 gap-12 mb-12">
            <!-- Brand Section -->
            <div class="lg:col-span-1">
              <div class="flex items-center space-x-3 mb-6">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <span class="text-white font-bold text-xl">⚡</span>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-white">Angular SuperUI</h3>
                  <p class="text-gray-400 text-sm">Modern Component Library</p>
                </div>
              </div>
              <p class="text-gray-300 leading-relaxed mb-6">
                A comprehensive, accessible, and beautifully designed component
                library for Angular applications. Built with TypeScript, Tailwind
                CSS, and modern best practices.
              </p>

              <!-- Social Links -->
              <div class="flex items-center space-x-4">
                <a
                  href="https://github.com/bhaimicrosoft/angular-superui"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
                  aria-label="GitHub Repository"
                >
                  <svg
                    class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.npmjs.com/package/angular-superui"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-400/30 transition-all duration-200 group"
                  aria-label="NPM Package"
                >
                  <svg
                    class="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113L5.13 5.323z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="lg:col-span-1">
              <h4 class="text-lg font-semibold text-white mb-6">Components</h4>
              <div class="space-y-3">
                <a
                  href="#accordion"
                  class="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <span class="text-blue-400 group-hover:text-blue-300">📂</span>
                  <span>Accordion</span>
                </a>
                <a
                  href="#alert"
                  class="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <span class="text-amber-400 group-hover:text-amber-300">🚨</span>
                  <span>Alert</span>
                </a>
                <a
                  href="#alert-dialog"
                  class="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
              <span class="text-yellow-400 group-hover:text-yellow-300"
              >⚠️</span
              >
                  <span>Alert Dialog</span>
                </a>
                <a
                  href="#card"
                  class="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <span class="text-green-400 group-hover:text-green-300">🃏</span>
                  <span>Card</span>
                </a>
                <a
                  href="#button"
                  class="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <span class="text-blue-400 group-hover:text-blue-300">🔘</span>
                  <span>Button</span>
                </a>
                <a
                  href="#badge-breadcrumb"
                  class="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
              <span class="text-purple-400 group-hover:text-purple-300"
              >🏷️</span
              >
                  <span>Badge & Breadcrumb</span>
                </a>
                <a
                  href="#calendar"
                  class="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
              <span class="text-indigo-400 group-hover:text-indigo-300"
              >📅</span
              >
                  <span>Calendar</span>
                </a>
              </div>

              <h4 class="text-lg font-semibold text-white mb-4 mt-8">Resources</h4>
              <div class="space-y-3">
                <a
                  href="https://github.com/imukherjee/angular-superui"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
              <span class="text-purple-400 group-hover:text-purple-300"
              >📚</span
              >
                  <span>Documentation</span>
                </a>
                <a
                  href="https://github.com/imukherjee/angular-superui/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <span class="text-red-400 group-hover:text-red-300">🐛</span>
                  <span>Report Issues</span>
                </a>
                <a
                  href="https://github.com/bhaimicrosoft/angular-superui/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <span class="text-teal-400 group-hover:text-teal-300">🤝</span>
                  <span>Contributing</span>
                </a>
              </div>
            </div>

            <!-- Developer Info -->
            <div class="lg:col-span-1">
              <h4 class="text-lg font-semibold text-white mb-6">Developer</h4>
              <div
                class="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div class="flex items-center space-x-4 mb-4">
                  <Avatar size="2xl">
                    <AvatarImage src="/me.jpg" alt="BK"/>
                    <AvatarFallback>BK</AvatarFallback>
                  </Avatar>

                  <div>
                    <h5 class="text-white font-semibold">Bhai Kaju</h5>
                    <p class="text-gray-400 text-sm">Full Stack Developer</p>
                  </div>
                </div>
                <p class="text-gray-300 text-sm mb-4">
                  Passionate about creating beautiful, accessible, and performant
                  user interfaces with modern web technologies.
                </p>
                <a
                  href="https://bhaikaju.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                >
                  <span>Visit Portfolio</span>
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Bottom Bar -->
          <div class="border-t border-white/10 pt-8">
            <div
              class="flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div
                class="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400"
              >
                <span>© 2025 Angular SuperUI. All rights reserved.</span>
                <div class="flex items-center gap-1">
                  <span>Made with</span>
                  <span class="text-red-400 animate-pulse">❤️</span>
                  <span>using Angular & Tailwind CSS</span>
                </div>
              </div>

              <!-- Version Badge -->
              <div class="flex items-center gap-3">
                <span class="text-xs text-gray-500">v1.0.4</span>
                <div
                  class="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-green-400 text-xs font-medium"
                >
                  ✨ Latest
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Decorative Elements -->
        <div
          class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        ></div>
      </footer>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular SuperUI';
  showGoToTop = false;

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
