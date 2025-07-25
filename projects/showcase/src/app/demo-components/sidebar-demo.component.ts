import {Component, computed, signal, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  Sidebar,
  SidebarContainer,
  SidebarContent,
  SidebarHeader,
  SidebarNavGroup,
  SidebarNavItem
} from '@lib/sidebar';

@Component({
  selector: 'app-sidebar-demo',
  standalone: true,
  imports: [
    CommonModule,
    Sidebar,
    SidebarContainer,
    SidebarContent,
    SidebarHeader,
    SidebarNavGroup,
    SidebarNavItem,
  ],
  template: `
    <div class="min-h-screen bg-background">
      <!-- Header with Controls -->
      <header class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold">Sidebar Demo</h1>
          <div class="flex gap-4">
            <!-- Left Sidebar Trigger -->
            <button
              type="button"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              (click)="toggleLeft()"
            >
              Toggle Left Sidebar
            </button>

            <!-- Right Sidebar Trigger -->
            <button
              type="button"
              class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              (click)="toggleRight()"
            >
              Toggle Right Sidebar
            </button>
          </div>
        </div>
      </header>

      <!-- Main Container with Flex Layout -->
      <SidebarContainer>
        <!-- Left Sidebar -->
        <Sidebar
          #leftSidebar
          [side]="'left'"
          [mode]="leftMode()"
          [size]="leftSize()"
          [isExpanded]="leftSidebarExpanded()"
          [ariaLabel]="'Left navigation sidebar'"
          [customClass]="'bg-blue-50 dark:bg-blue-950/20 border-r-2 border-blue-200 dark:border-blue-800'"
          [headerCustomClass]="'bg-blue-100 dark:bg-blue-900/50 border-b border-blue-200 dark:border-blue-800'"
          (onExpandedChange)="onLeftExpandedChange($event)"
        >
          <SidebarHeader slot="sidebar-header">
            <div class="flex items-center gap-2">
              <div class="flex h-6 w-6 items-center justify-center rounded bg-blue-600 ring-2 ring-blue-600/30">
                <span class="text-xs font-bold text-white">L</span>
              </div>
              @if (!isLeftIconOnly()) {
                <span class="font-semibold text-blue-900 dark:text-blue-100">Left Nav</span>
              }
            </div>
          </SidebarHeader>

          <SidebarContent slot="sidebar-content">
            <SidebarNavGroup [title]="'Navigation'" [isIconOnly]="isLeftIconOnly()">
              <SidebarNavItem
                [routerLink]="'/dashboard'"
                [label]="'Dashboard'"
                [icon]="dashboardIcon"
                [isActive]="currentPage() === 'dashboard'"
                [isIconOnly]="isLeftIconOnly()"
                (onClick)="setCurrentPage('dashboard')"
              />
              <SidebarNavItem
                [routerLink]="'/analytics'"
                [label]="'Analytics'"
                [icon]="analyticsIcon"
                [isActive]="currentPage() === 'analytics'"
                [isIconOnly]="isLeftIconOnly()"
                [hasChildren]="true"
                (onClick)="setCurrentPage('analytics')"
              >
                <!-- Nested Analytics Items -->
                <SidebarNavItem
                  [routerLink]="'/analytics/reports'"
                  [label]="'Reports'"
                  [icon]="reportsIcon"
                  [isActive]="currentPage() === 'reports'"
                  [isIconOnly]="isLeftIconOnly()"
                  [customClass]="'ml-4'"
                  (onClick)="setCurrentPage('reports')"
                />
                <SidebarNavItem
                  [routerLink]="'/analytics/metrics'"
                  [label]="'Metrics'"
                  [icon]="metricsIcon"
                  [isActive]="currentPage() === 'metrics'"
                  [isIconOnly]="isLeftIconOnly()"
                  [customClass]="'ml-4'"
                  [hasChildren]="true"
                  (onClick)="setCurrentPage('metrics')"
                >
                  <!-- Deeply Nested Metrics Items -->
                  <SidebarNavItem
                    [routerLink]="'/analytics/metrics/performance'"
                    [label]="'Performance'"
                    [icon]="performanceIcon"
                    [isActive]="currentPage() === 'performance'"
                    [isIconOnly]="isLeftIconOnly()"
                    [customClass]="'ml-8'"
                    (onClick)="setCurrentPage('performance')"
                  />
                  <SidebarNavItem
                    [routerLink]="'/analytics/metrics/usage'"
                    [label]="'Usage Stats'"
                    [icon]="usageIcon"
                    [isActive]="currentPage() === 'usage'"
                    [isIconOnly]="isLeftIconOnly()"
                    [customClass]="'ml-8'"
                    (onClick)="setCurrentPage('usage')"
                  />
                </SidebarNavItem>
                <SidebarNavItem
                  [routerLink]="'/analytics/insights'"
                  [label]="'Insights'"
                  [icon]="insightsIcon"
                  [isActive]="currentPage() === 'insights'"
                  [isIconOnly]="isLeftIconOnly()"
                  [customClass]="'ml-4'"
                  (onClick)="setCurrentPage('insights')"
                />
              </SidebarNavItem>
              <SidebarNavItem
                [routerLink]="'/users'"
                [label]="'Users'"
                [icon]="usersIcon"
                [isActive]="currentPage() === 'users'"
                [isIconOnly]="isLeftIconOnly()"
                [hasChildren]="true"
                (onClick)="setCurrentPage('users')"
              >
                <!-- Nested User Management Items -->
                <SidebarNavItem
                  [routerLink]="'/users/list'"
                  [label]="'User List'"
                  [icon]="userListIcon"
                  [isActive]="currentPage() === 'userlist'"
                  [isIconOnly]="isLeftIconOnly()"
                  [customClass]="'ml-4'"
                  (onClick)="setCurrentPage('userlist')"
                />
                <SidebarNavItem
                  [routerLink]="'/users/roles'"
                  [label]="'Roles & Permissions'"
                  [icon]="rolesIcon"
                  [isActive]="currentPage() === 'roles'"
                  [isIconOnly]="isLeftIconOnly()"
                  [customClass]="'ml-4'"
                  (onClick)="setCurrentPage('roles')"
                />
                <SidebarNavItem
                  [routerLink]="'/users/groups'"
                  [label]="'User Groups'"
                  [icon]="groupsIcon"
                  [isActive]="currentPage() === 'groups'"
                  [isIconOnly]="isLeftIconOnly()"
                  [customClass]="'ml-4'"
                  (onClick)="setCurrentPage('groups')"
                />
              </SidebarNavItem>
            </SidebarNavGroup>

            <SidebarNavGroup [title]="'Projects'" [isIconOnly]="isLeftIconOnly()">
              <SidebarNavItem
                [routerLink]="'/projects'"
                [label]="'All Projects'"
                [icon]="projectsIcon"
                [isActive]="currentPage() === 'projects'"
                [isIconOnly]="isLeftIconOnly()"
                [hasChildren]="true"
                (onClick)="setCurrentPage('projects')"
              >
                <!-- Nested Project Items -->
                <SidebarNavItem
                  [routerLink]="'/projects/active'"
                  [label]="'Active Projects'"
                  [icon]="activeIcon"
                  [isActive]="currentPage() === 'active'"
                  [isIconOnly]="isLeftIconOnly()"
                  [customClass]="'ml-4'"
                  [badge]="'5'"
                  (onClick)="setCurrentPage('active')"
                />
                <SidebarNavItem
                  [routerLink]="'/projects/archived'"
                  [label]="'Archived'"
                  [icon]="archiveIcon"
                  [isActive]="currentPage() === 'archived'"
                  [isIconOnly]="isLeftIconOnly()"
                  [customClass]="'ml-4'"
                  [badge]="'12'"
                  (onClick)="setCurrentPage('archived')"
                />
              </SidebarNavItem>
            </SidebarNavGroup>
          </SidebarContent>
        </Sidebar>

        <!-- Main Content Area -->
        <div class="flex-1 min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-6">
          <div class="max-w-4xl mx-auto space-y-6">
            <div class="bg-card rounded-lg border p-6 shadow-sm">
              <h2 class="text-xl font-semibold mb-4">{{ getPageTitle() }}</h2>
              <p class="text-muted-foreground mb-6">
                This is the main content area that automatically adjusts its width based on the sidebar states.
                It uses <code class="bg-muted px-1 py-0.5 rounded text-xs">flex-1</code> to occupy the remaining space.
              </p>

              <!-- Sidebar Controls -->
              <div class="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-4 mb-6">
                <h3 class="text-lg font-medium mb-4">Sidebar Controls</h3>

                <!-- Left Sidebar Controls -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div class="space-y-4">
                    <h4 class="font-medium text-blue-600 dark:text-blue-400">Left Sidebar</h4>
                    <div class="space-y-2">
                      <div class="flex gap-2">
                        <button
                          type="button"
                          class="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                          (click)="toggleLeft()"
                        >
                          Toggle Expand
                        </button>
                        <button
                          type="button"
                          class="px-3 py-1.5 text-sm bg-blue-400 text-white rounded hover:bg-blue-500 transition-colors"
                          (click)="toggleLeftIconMode()"
                        >
                          {{ isLeftIconOnly() ? 'Exit Icon Mode' : 'Icon Mode' }}
                        </button>
                      </div>
                      <div class="flex gap-2">
                        <button
                          type="button"
                          [class]="'px-3 py-1.5 text-sm rounded transition-colors ' + (leftMode() === 'push' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')"
                          (click)="setLeftMode('push')"
                        >
                          Push Mode
                        </button>
                        <button
                          type="button"
                          [class]="'px-3 py-1.5 text-sm rounded transition-colors ' + (leftMode() === 'overlay' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')"
                          (click)="setLeftMode('overlay')"
                        >
                          Overlay Mode
                        </button>
                      </div>
                      <div class="flex gap-2">
                        <button
                          type="button"
                          [class]="'px-2 py-1 text-xs rounded transition-colors ' + (leftSize() === 'sm' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')"
                          (click)="setLeftSize('sm')"
                        >
                          SM
                        </button>
                        <button
                          type="button"
                          [class]="'px-2 py-1 text-xs rounded transition-colors ' + (leftSize() === 'md' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')"
                          (click)="setLeftSize('md')"
                        >
                          MD
                        </button>
                        <button
                          type="button"
                          [class]="'px-2 py-1 text-xs rounded transition-colors ' + (leftSize() === 'lg' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')"
                          (click)="setLeftSize('lg')"
                        >
                          LG
                        </button>
                        <button
                          type="button"
                          [class]="'px-2 py-1 text-xs rounded transition-colors ' + (leftSize() === 'xl' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')"
                          (click)="setLeftSize('xl')"
                        >
                          XL
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Right Sidebar Controls -->
                  <div class="space-y-4">
                    <h4 class="font-medium text-green-600 dark:text-green-400">Right Sidebar</h4>
                    <div class="space-y-2">
                      <div class="flex gap-2">
                        <button
                          type="button"
                          class="px-3 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                          (click)="toggleRight()"
                        >
                          Toggle Expand
                        </button>
                        <button
                          type="button"
                          class="px-3 py-1.5 text-sm bg-green-400 text-white rounded hover:bg-green-500 transition-colors"
                          (click)="toggleRightIconMode()"
                        >
                          {{ isRightIconOnly() ? 'Exit Icon Mode' : 'Icon Mode' }}
                        </button>
                      </div>
                      <div class="flex gap-2">
                        <button
                          type="button"
                          [class]="'px-3 py-1.5 text-sm rounded transition-colors ' + (rightMode() === 'push' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')"
                          (click)="setRightMode('push')"
                        >
                          Push Mode
                        </button>
                        <button
                          type="button"
                          [class]="'px-3 py-1.5 text-sm rounded transition-colors ' + (rightMode() === 'overlay' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')"
                          (click)="setRightMode('overlay')"
                        >
                          Overlay Mode
                        </button>
                      </div>
                      <div class="flex gap-2">
                        <button
                          type="button"
                          [class]="'px-2 py-1 text-xs rounded transition-colors ' + (rightSize() === 'sm' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')"
                          (click)="setRightSize('sm')"
                        >
                          SM
                        </button>
                        <button
                          type="button"
                          [class]="'px-2 py-1 text-xs rounded transition-colors ' + (rightSize() === 'md' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')"
                          (click)="setRightSize('md')"
                        >
                          MD
                        </button>
                        <button
                          type="button"
                          [class]="'px-2 py-1 text-xs rounded transition-colors ' + (rightSize() === 'lg' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')"
                          (click)="setRightSize('lg')"
                        >
                          LG
                        </button>
                        <button
                          type="button"
                          [class]="'px-2 py-1 text-xs rounded transition-colors ' + (rightSize() === 'xl' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')"
                          (click)="setRightSize('xl')"
                        >
                          XL
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Status Cards -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 class="font-medium text-blue-900 dark:text-blue-100">Left Sidebar</h3>
                  <p class="text-sm text-blue-700 dark:text-blue-300">
                    Status: {{ leftSidebarExpanded() ? 'Expanded' : 'Collapsed' }}
                  </p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-950/20 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                  <h3 class="font-medium text-gray-900 dark:text-gray-100">Main Content</h3>
                  <p class="text-sm text-gray-700 dark:text-gray-300">
                    Always visible with flex-1
                  </p>
                </div>
                <div class="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 class="font-medium text-green-900 dark:text-green-100">Right Sidebar</h3>
                  <p class="text-sm text-green-700 dark:text-green-300">
                    Status: {{ rightSidebarExpanded() ? 'Expanded' : 'Collapsed' }}
                  </p>
                </div>
              </div>

              <!-- Sample Content -->
              <div class="grid gap-4">
                @for (item of sampleContent; track item.id) {
                  <div class="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <h3 class="font-medium">{{ item.title }}</h3>
                        <p class="text-sm text-muted-foreground mt-1">{{ item.description }}</p>
                        <span class="inline-block px-2 py-1 text-xs bg-secondary rounded-full mt-2">
                          {{ item.category }}
                        </span>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <!-- Right Sidebar -->
        <Sidebar
          #rightSidebar
          [side]="'left'"
          [mode]="rightMode()"
          [size]="rightSize()"
          [isExpanded]="rightSidebarExpanded()"
          [ariaLabel]="'Right tools sidebar'"
          [customClass]="'bg-green-50 dark:bg-green-950/20 border-l-2 border-green-200 dark:border-green-800'"
          [headerCustomClass]="'bg-green-100 dark:bg-green-900/50 border-b border-green-200 dark:border-green-800'"
          (onExpandedChange)="onRightExpandedChange($event)"
        >
          <SidebarHeader slot="sidebar-header">
            <div class="flex items-center gap-2">
              <div class="flex h-6 w-6 items-center justify-center rounded bg-green-600 ring-2 ring-green-600/30">
                <span class="text-xs font-bold text-white">R</span>
              </div>
              @if (!isRightIconOnly()) {
                <span class="font-semibold text-green-900 dark:text-green-100">Right Tools</span>
              }
            </div>
          </SidebarHeader>

          <SidebarContent slot="sidebar-content">
            <SidebarNavGroup [title]="'Tools'" [isIconOnly]="isRightIconOnly()">
              <SidebarNavItem
                [routerLink]="'/notifications'"
                [label]="'Notifications'"
                [icon]="notificationsIcon"
                [badge]="'3'"
                [isActive]="currentPage() === 'notifications'"
                [isIconOnly]="isRightIconOnly()"
                [customClass]="'hover:bg-green-100 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300'"
                (onClick)="setCurrentPage('notifications')"
              />
              <SidebarNavItem
                [routerLink]="'/messages'"
                [label]="'Messages'"
                [icon]="messagesIcon"
                [badge]="'12'"
                [isActive]="currentPage() === 'messages'"
                [isIconOnly]="isRightIconOnly()"
                [customClass]="'hover:bg-green-100 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300'"
                (onClick)="setCurrentPage('messages')"
              />
              <SidebarNavItem
                [routerLink]="'/help'"
                [label]="'Help'"
                [icon]="helpIcon"
                [isActive]="currentPage() === 'help'"
                [isIconOnly]="isRightIconOnly()"
                [customClass]="'hover:bg-green-100 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300'"
                (onClick)="setCurrentPage('help')"
              />
            </SidebarNavGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarContainer>
    </div>
  `
})
export class SidebarDemoComponent {
  // ViewChild references
  @ViewChild('leftSidebar', { static: false }) leftSidebar!: Sidebar;
  @ViewChild('rightSidebar', { static: false }) rightSidebar!: Sidebar;

  // State signals
  private readonly _leftSidebarExpanded = signal<boolean>(true);
  readonly leftSidebarExpanded = computed(() => this._leftSidebarExpanded());

  private readonly _rightSidebarExpanded = signal<boolean>(true);
  readonly rightSidebarExpanded = computed(() => this._rightSidebarExpanded());

  private readonly _leftIconOnly = signal<boolean>(false);
  readonly isLeftIconOnly = computed(() => this._leftIconOnly());

  private readonly _rightIconOnly = signal<boolean>(false);
  readonly isRightIconOnly = computed(() => this._rightIconOnly());

  private readonly _currentPage = signal<string>('dashboard');
  readonly currentPage = computed(() => this._currentPage());

  // Left sidebar configuration
  private readonly _leftMode = signal<'push' | 'overlay'>('push');
  readonly leftMode = computed(() => this._leftMode());

  private readonly _leftSize = signal<'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly leftSize = computed(() => this._leftSize());

  // Right sidebar configuration
  private readonly _rightMode = signal<'push' | 'overlay'>('push');
  readonly rightMode = computed(() => this._rightMode());

  private readonly _rightSize = signal<'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly rightSize = computed(() => this._rightSize());

  // Sample content
  readonly sampleContent = [
    {
      id: 1,
      title: 'Dashboard Overview',
      description: 'Monitor your application metrics and key performance indicators in real-time.',
      category: 'Analytics'
    },
    {
      id: 2,
      title: 'User Management',
      description: 'Manage user accounts, permissions, and access controls across your platform.',
      category: 'Users'
    },
    {
      id: 3,
      title: 'Project Templates',
      description: 'Pre-built templates to accelerate your development workflow and deployment.',
      category: 'Development'
    },
    {
      id: 4,
      title: 'System Settings',
      description: 'Configure application-wide settings, integrations, and customization options.',
      category: 'Configuration'
    },
  ];

  // Icons (using inline SVG for simplicity)
  readonly dashboardIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v4M16 5v4"/></svg>`;
  readonly analyticsIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`;
  readonly usersIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/></svg>`;
  readonly notificationsIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>`;
  readonly messagesIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>`;
  readonly helpIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

  // Additional icons for nested menu items
  readonly reportsIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`;
  readonly metricsIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`;
  readonly performanceIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`;
  readonly usageIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/></svg>`;
  readonly insightsIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`;
  readonly userListIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>`;
  readonly rolesIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`;
  readonly groupsIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`;
  readonly projectsIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`;
  readonly activeIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>`;
  readonly archiveIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8l6 6m0 0l6-6m-6 6v-13m-9 4h18a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/></svg>`;

  // Methods
  toggleLeft() {
    if (this.leftSidebar) {
      this.leftSidebar.toggleExpanded();
    }
  }

  toggleRight() {
    if (this.rightSidebar) {
      this.rightSidebar.toggleExpanded();
    }
  }

  onLeftExpandedChange(expanded: boolean) {
    this._leftSidebarExpanded.set(expanded);
    console.log('Left sidebar expanded state changed:', expanded);
  }

  onRightExpandedChange(expanded: boolean) {
    this._rightSidebarExpanded.set(expanded);
    console.log('Right sidebar expanded state changed:', expanded);
  }

  setCurrentPage(page: string) {
    this._currentPage.set(page);
  }

  // Left sidebar control methods
  toggleLeftIconMode() {
    if (this.leftSidebar) {
      this.leftSidebar.toggleIconOnly();
      // Update our local state to match the sidebar's state
      setTimeout(() => {
        this._leftIconOnly.set(this.leftSidebar.isIconOnly());
      }, 0);
    }
  }

  setLeftMode(mode: 'push' | 'overlay') {
    this._leftMode.set(mode);
  }

  setLeftSize(size: 'sm' | 'md' | 'lg' | 'xl') {
    this._leftSize.set(size);
  }

  // Right sidebar control methods
  toggleRightIconMode() {
    if (this.rightSidebar) {
      this.rightSidebar.toggleIconOnly();
      // Update our local state to match the sidebar's state
      setTimeout(() => {
        this._rightIconOnly.set(this.rightSidebar.isIconOnly());
      }, 0);
    }
  }

  setRightMode(mode: 'push' | 'overlay') {
    this._rightMode.set(mode);
  }

  setRightSize(size: 'sm' | 'md' | 'lg' | 'xl') {
    this._rightSize.set(size);
  }

  getPageTitle(): string {
    const pageMap: Record<string, string> = {
      dashboard: '📊 Dashboard',
      analytics: '📈 Analytics',
      users: '👥 Users',
      notifications: '🔔 Notifications',
      messages: '💬 Messages',
      help: '❓ Help & Support'
    };
    return pageMap[this.currentPage()] || '📄 Page';
  }
}
