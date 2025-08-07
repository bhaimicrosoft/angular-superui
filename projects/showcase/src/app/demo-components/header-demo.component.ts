import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header, HeaderNavItem, HeaderUser } from '../../../../../projects/lib/src/public-api';

@Component({
  selector: 'app-header-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, Header],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Demo Headers -->
      <div class="space-y-8">
        <!-- Default Header -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
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

        <!-- Ghost Header -->
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
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

        <!-- Floating Header -->
        <div class="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
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
          
          <!-- Demo content to show floating effect -->
          <div class="mt-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
            <h2 class="text-xl font-semibold mb-4">Page Content</h2>
            <p class="text-gray-600 dark:text-gray-400">
              The floating header variant creates a beautiful elevated header with rounded corners and shadow.
              This is perfect for modern applications that want a premium feel.
            </p>
          </div>
        </div>

        <!-- Compact Header -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
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

      <!-- Demo Content -->
      <div class="container mx-auto px-4 py-16">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Header Block Component
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
              A comprehensive header component with navigation, search, user menu, and mobile support.
              Features multiple variants and customization options for different use cases.
            </p>
          </div>

          <!-- Features Grid -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mobile First</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Responsive design with hamburger menu, mobile search, and touch-friendly navigation.
              </p>
            </div>

            <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div class="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Search</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Built-in search functionality with keyboard shortcuts and customizable placeholder text.
              </p>
            </div>

            <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">User Menu</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Complete user management with avatar, dropdown menu, and customizable actions.
              </p>
            </div>

            <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div class="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Performance</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Optimized with Angular signals for reactive updates and smooth animations.
              </p>
            </div>

            <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div class="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Accessible</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Full keyboard navigation, screen reader support, and ARIA compliance built-in.
              </p>
            </div>

            <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div class="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Customizable</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Multiple variants, sizes, and slot-based customization for any design system.
              </p>
            </div>
          </div>

          <!-- Live Demo Section -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Interactive Demo</h2>
            
            <div class="space-y-6">
              <div class="flex flex-wrap gap-4">
                <button 
                  (click)="toggleUser()"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
                  {{ currentUser() ? 'Hide User' : 'Show User' }}
                </button>
                
                <button 
                  (click)="toggleSearch()"
                  class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors">
                  {{ showSearchDemo() ? 'Hide Search' : 'Show Search' }}
                </button>
                
                <button 
                  (click)="toggleNavigation()"
                  class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors">
                  {{ showNavigationDemo() ? 'Simple Nav' : 'Full Nav' }}
                </button>
              </div>

              <!-- Demo logs -->
              @if (searchLogs().length > 0 || userActionLogs().length > 0) {
                <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Event Log:</h3>
                  <div class="space-y-1 text-xs text-gray-600 dark:text-gray-400 max-h-32 overflow-y-auto">
                    @for (log of searchLogs(); track $index) {
                      <div>🔍 {{ log }}</div>
                    }
                    @for (log of userActionLogs(); track $index) {
                      <div>👤 {{ log }}</div>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
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
    {
      label: 'Documentation',
      routerLink: '/docs'
    },
    {
      label: 'Examples',
      children: [
        { label: 'Dashboard', href: '#', icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>' },
        { label: 'E-commerce', href: '#', icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>' },
        { label: 'Blog', href: '#', icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>' }
      ]
    },
    {
      label: 'GitHub',
      href: 'https://github.com/bhaimicrosoft/angular-superui',
      external: true,
      target: '_blank',
      icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>'
    }
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
    this.userEnabled.update(enabled => !enabled);
    this.currentUser.set(this.userEnabled() ? {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facepad&facepad=2&w=256&h=256&q=80'
    } : null);
  }

  toggleSearch() {
    this.searchEnabled.update(enabled => !enabled);
    this.showSearchDemo.set(this.searchEnabled());
  }

  toggleNavigation() {
    this.fullNavigation.update(full => !full);
    this.showNavigationDemo.set(this.fullNavigation());
  }
}
