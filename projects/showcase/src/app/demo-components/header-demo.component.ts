import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header, HeaderNavItem, HeaderUser } from '../../../../../projects/lib/src/public-api';

@Component({
  selector: 'app-header-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, Header],
  template: `
    <!-- Professional Hero Section -->
    <section class="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Breadcrumb Navigation -->
          <nav class="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <a href="/blocks" class="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">UI Blocks</a>
            <span>→</span>
            <span class="text-gray-900 dark:text-white font-medium">Header</span>
          </nav>

          <!-- Category Badge -->
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Navigation Block
          </div>

          <!-- Main Heading -->
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Header Block
          </h1>

          <!-- Description -->
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed mx-auto max-w-3xl">
            Complete header layouts with navigation, search, user menus, and responsive mobile design.
            Perfect for any application requiring professional navigation.
          </p>

          <!-- Feature Grid -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 justify-center max-w-4xl mx-auto">
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-sm font-medium text-center">Responsive Design</span>
            </div>
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <span class="text-sm font-medium text-center">Search Integration</span>
            </div>
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span class="text-sm font-medium text-center">User Menus</span>
            </div>
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
              <span class="text-sm font-medium text-center">Mobile Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Examples -->
    <div id="examples" class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Header Variants</h2>
            <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore different header styles and configurations for your application needs.
            </p>
          </div>

          <div class="space-y-12">
            <!-- Default Header -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Default Header</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Standard header with navigation and search</p>
              </div>
              <div class="bg-white dark:bg-gray-800">
                <app-header
                  [logo]="defaultLogo"
                  [navigation]="navigationItems()"
                  [user]="currentUser()"
                  [showSearch]="true"
                  variant="default"
                  size="default"
                  (searchChange)="onSearchChange($event)"
                  (searchSubmit)="onSearchSubmit($event)"
                  (userMenuAction)="onUserMenuAction($event)">

                  <ng-container slot="actions">
                    <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
                      Sign In
                    </button>
                  </ng-container>
                </app-header>
              </div>
            </div>

            <!-- Ghost Header -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Ghost Header</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Transparent header for colored backgrounds</p>
              </div>
              <div class="bg-gradient-to-r from-blue-500 to-purple-600">
                <app-header
                  [logo]="ghostLogo"
                  [navigation]="navigationItems()"
                  [user]="currentUser()"
                  [showSearch]="true"
                  variant="ghost"
                  size="default"
                  (searchChange)="onSearchChange($event)"
                  (userMenuAction)="onUserMenuAction($event)">

                  <ng-container slot="actions">
                    <button class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-md text-sm font-medium transition-colors backdrop-blur-sm">
                      Get Started
                    </button>
                  </ng-container>
                </app-header>
              </div>
            </div>

            <!-- Floating Header -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Floating Header</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Elevated header with rounded corners</p>
              </div>
              <div class="bg-gray-100 dark:bg-gray-800 p-8">
                <app-header
                  [logo]="defaultLogo"
                  [navigation]="simpleNavigation()"
                  [user]="currentUser()"
                  [showSearch]="false"
                  variant="floating"
                  size="lg"
                  (userMenuAction)="onUserMenuAction($event)">

                  <ng-container slot="actions">
                    <button class="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg text-sm font-medium transition-all">
                      Upgrade Pro
                    </button>
                  </ng-container>
                </app-header>

                <!-- Demo content -->
                <div class="mt-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                  <h4 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Page Content</h4>
                  <p class="text-gray-600 dark:text-gray-400">
                    The floating header variant creates a beautiful elevated header with rounded corners and shadow.
                  </p>
                </div>
              </div>
            </div>

            <!-- Compact Header -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Compact Header</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Space-efficient header for content-heavy pages</p>
              </div>
              <div class="bg-white dark:bg-gray-800">
                <app-header
                  [logo]="compactLogo"
                  [navigation]="compactNavigation()"
                  [user]="null"
                  [showSearch]="true"
                  variant="solid"
                  size="sm"
                  searchPlaceholder="Quick search..."
                  (searchChange)="onSearchChange($event)">

                  <ng-container slot="actions">
                    <button class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm font-medium transition-colors">
                      Login
                    </button>
                    <button class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors">
                      Sign Up
                    </button>
                  </ng-container>
                </app-header>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Usage Code Examples -->
    <div class="bg-white dark:bg-gray-900 py-16 border-t border-gray-200 dark:border-gray-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h3 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">Implementation Guide</h3>

          <div class="prose prose-lg dark:prose-invert max-w-none">
            <p class="text-gray-600 dark:text-gray-400 text-center mb-8">
              Ready to implement? Check out our comprehensive documentation for detailed usage examples and customization options.
            </p>

            <div class="text-center">
              <a
                href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/blocks/header.md"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                View Documentation
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderDemoComponent {
  // Demo state
  private userEnabled = signal(true);
  private searchEnabled = signal(true);
  private fullNavigation = signal(true);

  // Event logs
  searchLogs = signal<string[]>([]);
  userActionLogs = signal<string[]>([]);

  // Logo configurations
  defaultLogo = {
    text: 'SuperUI',
    icon: '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    href: '/'
  };

  ghostLogo = {
    text: 'SuperUI',
    icon: '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    href: '/'
  };

  compactLogo = {
    text: 'UI',
    icon: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>',
    href: '/'
  };

  // Navigation items
  navigationItems = signal<HeaderNavItem[]>([
    {
      label: 'Components',
      children: [
        { label: 'Button', routerLink: '/components/button', icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2z"/></svg>' },
        { label: 'Input', routerLink: '/components/input', icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>' },
        { label: 'Card', routerLink: '/components/card', icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>' },
        { divider: true, label: '', routerLink: '', icon: '' },
        { label: 'View All', routerLink: '/', icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>' }
      ]
    },
    { label: 'Documentation', routerLink: '/docs' },
    { label: 'GitHub', href: 'https://github.com/bhaimicrosoft/angular-superui', external: true, target: '_blank' }
  ]);

  simpleNavigation = signal<HeaderNavItem[]>([
    { label: 'Home', routerLink: '/' },
    { label: 'About', routerLink: '/about' },
    { label: 'Contact', routerLink: '/contact' }
  ]);

  compactNavigation = signal<HeaderNavItem[]>([
    { label: 'Docs', routerLink: '/docs' },
    { label: 'API', routerLink: '/api' }
  ]);

  // User configuration
  currentUser = signal<HeaderUser | null>({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facepad&facepad=2&w=256&h=256&q=80'
  });

  // Demo controls
  showSearchDemo = signal(true);
  showNavigationDemo = signal(true);

  // Event handlers
  onSearchChange(value: string) {
    this.searchLogs.update(logs => [...logs.slice(-4), `Search changed: "${value}"`]);
  }

  onSearchSubmit(value: string) {
    this.searchLogs.update(logs => [...logs.slice(-4), `Search submitted: "${value}"`]);
  }

  onUserMenuAction(event: { action: string; user: HeaderUser }) {
    this.userActionLogs.update(logs => [...logs.slice(-4), `User action: ${event.action} by ${event.user.name}`]);
  }

  // Demo controls
  toggleUser() {
    this.currentUser.update(user => user ? null : {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facepad&facepad=2&w=256&h=256&q=80'
    });
  }

  toggleSearch() {
    this.showSearchDemo.update(show => !show);
  }

  toggleNavigation() {
    this.showNavigationDemo.update(show => !show);
  }
}
