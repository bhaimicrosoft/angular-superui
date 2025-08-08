import {Component, computed, HostListener, inject, OnInit, signal, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Meta, Title} from '@angular/platform-browser';
import {
  Sidebar,
  SidebarContainer,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarNavGroup,
  SidebarNavItem,
  SidebarTrigger
} from '@lib/components/sidebar';
import {Alert, AlertDescription, AlertIcon, AlertTitle} from '@lib/components/alert';
import {LucideAngularModule, PanelLeftCloseIcon} from 'lucide-angular';

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
    SidebarTrigger,
    LucideAngularModule,
    SidebarFooter,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  ],
  template: `
    <!-- Hero Section -->
    <div
      class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <!-- Background Pattern -->
      <div
        class="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>

      <!-- Hero Content -->
      <div class="relative px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-4xl pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32">
          <div class="text-center">
            <!-- Hero Badge -->
            <div
              class="inline-flex items-center rounded-full px-3 py-1.5 sm:px-4 text-xs sm:text-sm font-medium bg-white/80 backdrop-blur-sm text-gray-600 ring-1 ring-inset ring-gray-200 hover:bg-white/90 transition-all duration-300 dark:bg-gray-800/80 dark:text-gray-300 dark:ring-gray-700">
              <svg class="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" fill="none"
                   stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              Powered by Angular Signals
            </div>


            <!-- Main Heading -->
            <h1
              class="mt-4 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              <span class="block">Advanced Sidebar</span>
              <span class="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Component Demo
              </span>
            </h1>

            <!-- Description -->
            <p
              class="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-gray-300 max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
              Experience the most powerful and flexible sidebar component for Angular. Built with signals,
              animations, responsive design, and full keyboard navigation support.
            </p>

            <!-- CTA Button -->
            <div class="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
              <SidebarTrigger
                [target]="'main-sidebar'"
                [showLabel]="true"
                [label]="'Open Sidebar'"
                [variant]="'default'"
                [size]="'lg'"
                [customClass]="'w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200'"
              />

              <a href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/sidebar.md"
                 target="_blank"
                 rel="noopener noreferrer"
                 class="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                Documentation <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Trigger -->
      <div class="absolute top-4 right-4 sm:top-6 sm:right-6">
        <SidebarTrigger
          [target]="'main-sidebar'"
          [showLabel]="false"
          [variant]="'outline'"
          [customClass]="'bg-white/90 backdrop-blur-sm hover:bg-white border-gray-200 shadow-lg dark:bg-gray-800/90 dark:border-gray-700 dark:hover:bg-gray-800'"
        />
      </div>
    </div>    <!-- Main Container -->
    <div class="min-h-screen bg-background">
      <SidebarContainer>
        <!-- Main Sidebar -->
        <Sidebar
          [id]="'main-sidebar'"
          #mainSidebar
          [side]="sidebarSide()"
          [mode]="sidebarMode()"
          [size]="sidebarSize()"
          [defaultExpanded]="sidebarDefaultExpanded()"
          [ariaLabel]="'Main navigation sidebar'"
          customClass=" {{sidebarCustomClass()}}"
          [headerCustomClass]="'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 border-b border-blue-200 dark:border-blue-800'"
          (onExpandedChange)="onSidebarExpandedChange($event)"
        >
          <SidebarHeader slot="sidebar-header">
            <div class="flex items-center gap-3">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 ring-2 ring-blue-600/30">
                <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              @if (!isSidebarIconOnly()) {
                <div>
                  <h2 class="font-semibold text-gray-900 dark:text-white">SuperUI</h2>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Navigation</p>
                </div>
              }
            </div>
          </SidebarHeader>

          <SidebarContent slot="sidebar-content" [isIconOnly]="isSidebarIconOnly()">
            <SidebarNavGroup [title]="'Main Navigation'" [isIconOnly]="isSidebarIconOnly()">
              <SidebarNavItem
                [routerLink]="'/dashboard'"
                [label]="'Dashboard'"
                [icon]="dashboardIcon"
                [isActive]="currentPage() === 'dashboard'"
                [isIconOnly]="isSidebarIconOnly()"
                (onClick)="setCurrentPage('dashboard')"
              />
              <SidebarNavItem
                [routerLink]="null"
                [label]="'Analytics'"
                [icon]="analyticsIcon"
                [isActive]="currentPage() === 'analytics'"
                [isIconOnly]="isSidebarIconOnly()"
                [hasChildren]="true"
                (onClick)="setCurrentPage('analytics')"
              >
                <!-- Nested Analytics Items -->
                <SidebarNavItem
                  [routerLink]="'/analytics/reports'"
                  [label]="'Reports'"
                  [icon]="reportsIcon"
                  [isActive]="currentPage() === 'reports'"
                  [isIconOnly]="isSidebarIconOnly()"
                  [isSubmenuItem]="true"
                  [customClass]="isSidebarIconOnly() ? '' : 'ml-4'"
                  (onClick)="setCurrentPage('reports')"
                />
                <SidebarNavItem
                  [routerLink]="null"
                  [label]="'Metrics'"
                  [icon]="metricsIcon"
                  [isActive]="currentPage() === 'metrics'"
                  [isIconOnly]="isSidebarIconOnly()"
                  [isSubmenuItem]="true"
                  [customClass]="isSidebarIconOnly() ? '' : 'ml-4'"
                  [hasChildren]="true"
                  (onClick)="setCurrentPage('metrics')"
                >
                  <!-- Deeply Nested Metrics Items -->
                  <SidebarNavItem
                    [routerLink]="'/analytics/metrics/performance'"
                    [label]="'Performance'"
                    [icon]="performanceIcon"
                    [isActive]="currentPage() === 'performance'"
                    [isIconOnly]="isSidebarIconOnly()"
                    [isSubmenuItem]="true"
                    [customClass]="isSidebarIconOnly() ? '' : 'ml-8'"
                    (onClick)="setCurrentPage('performance')"
                  />
                  <SidebarNavItem
                    [routerLink]="'/analytics/metrics/usage'"
                    [label]="'Usage Stats'"
                    [icon]="usageIcon"
                    [isActive]="currentPage() === 'usage'"
                    [isIconOnly]="isSidebarIconOnly()"
                    [isSubmenuItem]="true"
                    [customClass]="isSidebarIconOnly() ? '' : 'ml-8'"
                    (onClick)="setCurrentPage('usage')"
                  />
                </SidebarNavItem>
                <SidebarNavItem
                  [routerLink]="'/analytics/insights'"
                  [label]="'Insights'"
                  [icon]="insightsIcon"
                  [isActive]="currentPage() === 'insights'"
                  [isIconOnly]="isSidebarIconOnly()"
                  [isSubmenuItem]="true"
                  [customClass]="isSidebarIconOnly() ? '' : 'ml-4'"
                  (onClick)="setCurrentPage('insights')"
                />
              </SidebarNavItem>
              <SidebarNavItem
                [routerLink]="null"
                [label]="'Users'"

                [icon]="usersIcon"
                [isActive]="currentPage() === 'users'"
                [isIconOnly]="isSidebarIconOnly()"
                [hasChildren]="true"
                [badge]="'12'"
                (onClick)="setCurrentPage('users')"
              >
                <!-- Nested User Management Items -->
                <SidebarNavItem
                  [routerLink]="'/users/list'"
                  [label]="'User List'"
                  [icon]="userListIcon"
                  [isActive]="currentPage() === 'userlist'"
                  [isIconOnly]="isSidebarIconOnly()"
                  [isSubmenuItem]="true"
                  [customClass]="isSidebarIconOnly() ? '' : 'ml-4'"
                  (onClick)="setCurrentPage('userlist')"
                />
                <SidebarNavItem
                  [routerLink]="'/users/roles'"
                  [label]="'Roles & Permissions'"
                  [icon]="rolesIcon"
                  [isActive]="currentPage() === 'roles'"
                  [isIconOnly]="isSidebarIconOnly()"
                  [isSubmenuItem]="true"
                  [customClass]="isSidebarIconOnly() ? '' : 'ml-4'"
                  (onClick)="setCurrentPage('roles')"
                />
                <SidebarNavItem
                  [routerLink]="'/users/groups'"
                  [label]="'User Groups'"
                  [icon]="groupsIcon"
                  [isActive]="currentPage() === 'groups'"
                  [isIconOnly]="isSidebarIconOnly()"
                  [isSubmenuItem]="true"
                  [customClass]="isSidebarIconOnly() ? '' : 'ml-4'"
                  (onClick)="setCurrentPage('groups')"
                />
              </SidebarNavItem>
            </SidebarNavGroup>

            <SidebarNavGroup [title]="'Projects'" [isIconOnly]="isSidebarIconOnly()">
              <SidebarNavItem
                [routerLink]="null"
                [label]="'All Projects'"
                [icon]="projectsIcon"
                [isActive]="currentPage() === 'projects'"
                [isIconOnly]="isSidebarIconOnly()"
                [hasChildren]="true"
                (onClick)="setCurrentPage('projects')"
              >
                <!-- Nested Project Items -->
                <SidebarNavItem
                  [routerLink]="'/projects/active'"
                  [label]="'Active Projects'"
                  [icon]="activeIcon"
                  [isActive]="currentPage() === 'active'"
                  [isIconOnly]="isSidebarIconOnly()"
                  [isSubmenuItem]="true"
                  [customClass]="isSidebarIconOnly() ? '' : 'ml-4'"
                  [badge]="'5'"
                  (onClick)="setCurrentPage('active')"
                />
                <SidebarNavItem
                  [routerLink]="'/projects/archived'"
                  [label]="'Archived'"
                  [icon]="archiveIcon"
                  [isActive]="currentPage() === 'archived'"
                  [isIconOnly]="isSidebarIconOnly()"
                  [isSubmenuItem]="true"
                  [customClass]="isSidebarIconOnly() ? '' : 'ml-4'"
                  [badge]="'12'"
                  (onClick)="setCurrentPage('archived')"
                />
              </SidebarNavItem>
            </SidebarNavGroup>

            <SidebarNavGroup [title]="'Tools & Settings'" [isIconOnly]="isSidebarIconOnly()">
              <SidebarNavItem
                [routerLink]="'/notifications'"
                [label]="'Notifications'"
                [icon]="notificationsIcon"
                [badge]="'3'"
                [isActive]="currentPage() === 'notifications'"
                [isIconOnly]="isSidebarIconOnly()"
                (onClick)="setCurrentPage('notifications')"
              />
              <SidebarNavItem
                [routerLink]="'/messages'"
                [label]="'Messages'"
                [icon]="messagesIcon"
                [badge]="'12'"
                [isActive]="currentPage() === 'messages'"
                [isIconOnly]="isSidebarIconOnly()"
                (onClick)="setCurrentPage('messages')"
              />
              <SidebarNavItem
                [routerLink]="'/help'"
                [label]="'Help & Support'"
                [icon]="helpIcon"
                [isActive]="currentPage() === 'help'"
                [isIconOnly]="isSidebarIconOnly()"
                (onClick)="setCurrentPage('help')"
              />
            </SidebarNavGroup>
          </SidebarContent>

          <SidebarFooter slot="sidebar-footer">
            <div class="flex items-center gap-3 text-xs text-muted-foreground">
              <div class="flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>v2.0.1</span>
              </div>
              @if (!isSidebarIconOnly()) {
                <span class="text-muted-foreground/50">•</span>
                <span>© 2025 SuperUI</span>
              }
            </div>
            <!-- Icon for icon-only mode -->
            <div data-icon-only
                 class="flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </SidebarFooter>
        </Sidebar>

        <!-- Main Content Area -->
        <div class="flex-1 w-full overflow-auto">
          <div
            class="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20 p-4 sm:p-6 lg:p-8">
            <div class="max-w-7xl mx-auto space-y-6 sm:space-y-8">

              <!-- Welcome Card -->
              <div
                class="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 shadow-xl">
                <div class="text-center mb-6 sm:mb-8">
                  <div
                    class="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-3 sm:mb-4">
                    <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                  </div>
                  <h2
                    class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2 sm:mb-3">
                    {{ getPageTitle() }}
                  </h2>
                  <p
                    class="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
                    Interactive sidebar demo with comprehensive configuration options. Test all features including
                    keyboard navigation,
                    responsive behavior, icon mode, and nested navigation.
                  </p>
                </div>
              </div>

              <!-- Configuration Panel -->
              <div
                class="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 shadow-lg">
                <div class="flex items-center gap-3 mb-6 sm:mb-8">
                  <div
                    class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Sidebar
                      Configuration</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Status: {{ sidebarStatus() }} |
                      Mode: {{ sidebarMode() | titlecase }} | Size: {{ sidebarSize() | uppercase }}</p>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                  <!-- Basic Controls -->
                  <div class="space-y-4 sm:space-y-6">
                    <h4 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
                      </svg>
                      Basic Controls
                    </h4>

                    <!-- Toggle Buttons -->
                    <div class="flex flex-col gap-4">
                      <SidebarTrigger
                        [target]="'main-sidebar'"
                        [showLabel]="true"
                        [label]="'Toggle Sidebar'"
                        [variant]="'default'"
                        [size]="'md'"
                        [customClass]="'w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-sm'"
                      />
                      <button
                        type="button"
                        class="w-full px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-sm transform hover:scale-105 hidden lg:block"
                        (click)="toggleIconMode()"
                      >
                        {{ isSidebarIconOnly() ? '📱 Exit Icon Mode' : '🎯 Enable Icon Mode' }}
                      </button>
                    </div>
                  </div>

                  <!-- Mode & Position -->
                  <div class="space-y-6">
                    <h4 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                      </svg>
                      Mode & Position
                    </h4>

                    <!-- Mode Selection -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Display
                        Mode</label>
                      <div class="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <button
                          type="button"
                          [disabled]="isMobileOrTablet()"
                          [class]="'flex-1 px-4 py-2 text-sm font-medium transition-all duration-200 ' +
                        (isMobileOrTablet() ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500' :
                         sidebarMode() === 'push' ? 'bg-blue-600 text-white shadow-sm' :
                         'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700')"
                          [attr.title]="isMobileOrTablet() ? 'Push mode is not available on mobile/tablet screens' : ''"
                          (click)="!isMobileOrTablet() && setSidebarMode('push')"
                        >
                          Push
                          @if (isMobileOrTablet()) {
                            <svg class="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"/>
                            </svg>
                          }
                        </button>
                        <button
                          type="button"
                          [class]="'flex-1 px-4 py-2 text-sm font-medium transition-all duration-200 border-l border-gray-200 dark:border-gray-700 ' + (sidebarMode() === 'overlay' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700')"
                          (click)="setSidebarMode('overlay')"
                        >
                          Overlay
                        </button>
                      </div>
                    </div>

                    <!-- Mobile/Tablet Mode Restriction Alert -->
                    @if (isMobileOrTablet()) {
                      <Alert [variant]="'info'"
                             [className]="'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-700 dark:bg-blue-950/30 dark:text-blue-100'">
                        <AlertIcon>
                          <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                               viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </AlertIcon>
                        <div>
                          <AlertTitle>Mobile/Tablet Mode Restriction</AlertTitle>
                          <AlertDescription>
                            You're viewing this on a mobile or tablet screen. Only <strong>Overlay mode</strong> is
                            supported on smaller screens.
                            The Push mode button won't work but you can still test other features. Try viewing on
                            desktop for full Push mode functionality.
                          </AlertDescription>
                        </div>
                      </Alert>
                    }

                    <!-- Side Selection -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position</label>
                      <div class="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <button
                          type="button"
                          [class]="'flex-1 px-4 py-2 text-sm font-medium transition-all duration-200 ' + (sidebarSide() === 'left' ? 'bg-purple-600 text-white shadow-sm' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700')"
                          (click)="setSidebarSide('left')"
                        >
                          Left
                        </button>
                        <button
                          type="button"
                          [class]="'flex-1 px-4 py-2 text-sm font-medium transition-all duration-200 border-l border-gray-200 dark:border-gray-700 ' + (sidebarSide() === 'right' ? 'bg-purple-600 text-white shadow-sm' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700')"
                          (click)="setSidebarSide('right')"
                        >
                          Right
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Size & Appearance -->
                  <div class="space-y-6">
                    <h4 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                      </svg>
                      Size & Appearance
                    </h4>

                    <!-- Size Selection -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Width Size</label>
                      <div class="grid grid-cols-4 gap-1 rounded-lg border border-gray-200 dark:border-gray-700 p-1">
                        <button
                          type="button"
                          [class]="'px-3 py-1.5 text-xs font-medium rounded transition-all duration-200 ' + (sidebarSize() === 'sm' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700')"
                          (click)="setSidebarSize('sm')"
                        >
                          SM
                        </button>
                        <button
                          type="button"
                          [class]="'px-3 py-1.5 text-xs font-medium rounded transition-all duration-200 ' + (sidebarSize() === 'md' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700')"
                          (click)="setSidebarSize('md')"
                        >
                          MD
                        </button>
                        <button
                          type="button"
                          [class]="'px-3 py-1.5 text-xs font-medium rounded transition-all duration-200 ' + (sidebarSize() === 'lg' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700')"
                          (click)="setSidebarSize('lg')"
                        >
                          LG
                        </button>
                        <button
                          type="button"
                          [class]="'px-3 py-1.5 text-xs font-medium rounded transition-all duration-200 ' + (sidebarSize() === 'xl' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700')"
                          (click)="setSidebarSize('xl')"
                        >
                          XL
                        </button>
                      </div>
                    </div>

                    <!-- Default Expanded -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default
                        State</label>
                      <div class="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <button
                          type="button"
                          [class]="'flex-1 px-4 py-2 text-sm font-medium transition-all duration-200 ' + (sidebarDefaultExpanded() ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700')"
                          (click)="setSidebarDefaultExpanded(true)"
                        >
                          Expanded
                        </button>
                        <button
                          type="button"
                          [class]="'flex-1 px-4 py-2 text-sm font-medium transition-all duration-200 border-l border-gray-200 dark:border-gray-700 ' + (!sidebarDefaultExpanded() ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700')"
                          (click)="setSidebarDefaultExpanded(false)"
                        >
                          Collapsed
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarContainer>
    </div>

    <!-- Component Features Section (Outside Sidebar Container) -->
    <section class="bg-gray-50 dark:bg-gray-900 py-12 sm:py-16 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Feature Showcase -->
        <div
          class="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 shadow-lg mb-8 sm:mb-12">
          <h3
            class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center flex items-center justify-center gap-2">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            Component Features
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div
              class="p-4 sm:p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg class="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1 0 21 9z"/>
                  </svg>
                </div>
                <h4 class="font-semibold text-blue-900 dark:text-blue-100 text-sm sm:text-base">Keyboard Navigation</h4>
              </div>
              <p class="text-xs sm:text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                Full keyboard support: <kbd class="px-1 py-0.5 text-xs bg-blue-200 dark:bg-blue-800 rounded">↑↓</kbd> to
                navigate,
                <kbd class="px-1 py-0.5 text-xs bg-blue-200 dark:bg-blue-800 rounded">Enter</kbd>/<kbd
                class="px-1 py-0.5 text-xs bg-blue-200 dark:bg-blue-800 rounded">Space</kbd> to activate,
                <kbd class="px-1 py-0.5 text-xs bg-blue-200 dark:bg-blue-800 rounded">Tab</kbd> to navigate groups
              </p>
            </div>

            <div
              class="p-6 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h4 class="font-semibold text-purple-900 dark:text-purple-100">Responsive Design</h4>
              </div>
              <p class="text-sm text-purple-800 dark:text-purple-200">
                Automatically adapts to different screen sizes with overlay mode on mobile and customizable breakpoints
              </p>
            </div>

            <div
              class="p-6 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h4 class="font-semibold text-green-900 dark:text-green-100">Signal-Based</h4>
              </div>
              <p class="text-sm text-green-800 dark:text-green-200">
                Built with Angular signals for optimal performance and reactivity. No unnecessary re-renders
              </p>
            </div>

            <div
              class="p-6 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 border border-orange-200 dark:border-orange-800">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                  </svg>
                </div>
                <h4 class="font-semibold text-orange-900 dark:text-orange-100">Icon Mode</h4>
              </div>
              <p class="text-sm text-orange-800 dark:text-orange-200">
                Compact icon-only mode with tooltips and dropdown submenus for maximum space efficiency
              </p>
            </div>

            <div
              class="p-6 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/30 border border-indigo-200 dark:border-indigo-800">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                  </svg>
                </div>
                <h4 class="font-semibold text-indigo-900 dark:text-indigo-100">Nested Navigation</h4>
              </div>
              <p class="text-sm text-indigo-800 dark:text-indigo-200">
                Multi-level navigation with expandable groups and automatic submenu indicators with badges
              </p>
            </div>

            <div
              class="p-6 rounded-lg bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/30 dark:to-pink-900/30 border border-pink-200 dark:border-pink-800">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <h4 class="font-semibold text-pink-900 dark:text-pink-100">Smooth Animations</h4>
              </div>
              <p class="text-sm text-pink-800 dark:text-pink-200">
                GPU-accelerated animations with optimized timing for buttery smooth transitions and interactions
              </p>
            </div>
          </div>
        </div>

        <!-- Sample Content -->
        <div
          class="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 shadow-lg mb-8 sm:mb-12">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Sample Content</h3>
          <div class="grid gap-4">
            @for (item of sampleContent; track item.id) {
              <div
                class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-900 dark:text-white">{{ item.title }}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ item.description }}</p>
                    <span
                      class="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full mt-2">
                      {{ item.category }}
                    </span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Documentation Link -->
        <div
          class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center shadow-lg">
          <div class="max-w-2xl mx-auto">
            <div
              class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>

            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Need Complete Documentation?
            </h3>

            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Explore comprehensive guides, API reference, examples, and best practices for implementing
              the sidebar component in your Angular projects.
            </p>

            <a
              href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/sidebar.md"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              View Full Documentation
            </a>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SidebarDemoComponent implements OnInit {
  // ViewChild reference
  @ViewChild('mainSidebar', {static: false}) mainSidebar!: Sidebar;
  readonly panelLeftClose = PanelLeftCloseIcon;
  // Computed sidebar custom class based on side
  readonly sidebarCustomClass = computed(() => {
    const side = this.sidebarSide();
    if (side === 'left') {
      return 'bg-blue-50 dark:bg-blue-950/20 border-r-2 border-blue-200 dark:border-blue-800';
    } else {
      return 'bg-green-50 dark:bg-green-950/20 border-l-2 border-green-200 dark:border-green-800';
    }
  });
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
  readonly sidebarStatus = computed(() => {
    return this.sidebarExpanded() ? 'Expanded' : 'Collapsed';
  });
  // Inject services for SEO
  private titleService = inject(Title);
  private metaService = inject(Meta);
  // State signals for sidebar configuration
  private readonly _sidebarExpanded = signal<boolean>(true);
  readonly sidebarExpanded = computed(() => this._sidebarExpanded());
  private readonly _sidebarIconOnly = signal<boolean>(false);
  readonly isSidebarIconOnly = computed(() => this._sidebarIconOnly());
  private readonly _currentPage = signal<string>('dashboard');
  readonly currentPage = computed(() => this._currentPage());
  // Sidebar configuration signals
  private readonly _sidebarMode = signal<'push' | 'overlay'>('push');
  readonly sidebarMode = computed(() => this._sidebarMode());
  private readonly _sidebarSide = signal<'left' | 'right'>('left');
  readonly sidebarSide = computed(() => this._sidebarSide());
  private readonly _sidebarSize = signal<'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly sidebarSize = computed(() => this._sidebarSize());
  private readonly _sidebarDefaultExpanded = signal<boolean>(true);
  readonly sidebarDefaultExpanded = computed(() => this._sidebarDefaultExpanded());
  // Mobile/tablet detection for push mode restrictions
  private readonly _screenWidth = signal<number>(typeof window !== 'undefined' ? window.innerWidth : 1920);
  readonly isMobileOrTablet = computed(() => {
    return this._screenWidth() <= 1024; // Matches the sidebar's medium breakpoint
  });

  ngOnInit() {
    this.updateSEOForCurrentPage();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    if (typeof window !== 'undefined') {
      this._screenWidth.set(window.innerWidth);
    }
  }

  // Methods
  toggleSidebar() {
    if (this.mainSidebar) {
      this.mainSidebar.toggleExpanded();
    }
  }

  onSidebarExpandedChange(expanded: boolean) {
    this._sidebarExpanded.set(expanded);
    console.log('Sidebar expanded state changed:', expanded);
  }

  setCurrentPage(page: string) {
    this._currentPage.set(page);
    this.updateSEOForCurrentPage();
  }

  // Sidebar control methods
  toggleIconMode() {
    if (this.mainSidebar) {
      this.mainSidebar.toggleIconOnly();
      // Update our local state to match the sidebar's state
      setTimeout(() => {
        this._sidebarIconOnly.set(this.mainSidebar.isIconOnly());
      }, 0);
    }
  }

  setSidebarMode(mode: 'push' | 'overlay') {
    this._sidebarMode.set(mode);
  }

  setSidebarSide(side: 'left' | 'right') {
    this._sidebarSide.set(side);
  }

  setSidebarSize(size: 'sm' | 'md' | 'lg' | 'xl') {
    this._sidebarSize.set(size);
  }

  setSidebarDefaultExpanded(expanded: boolean) {
    this._sidebarDefaultExpanded.set(expanded);
  }

  // SEO and Meta tag management
  updateSEOForCurrentPage() {
    const currentPage = this.currentPage();
    const pageInfo = this.getPageInfo(currentPage);

    // Update page title
    this.titleService.setTitle(`${pageInfo.title} - Angular SuperUI Sidebar Demo`);

    // Update meta description
    this.metaService.updateTag({
      name: 'description',
      content: `${pageInfo.description} Interactive Angular sidebar demo with keyboard navigation, responsive design, and signal-based architecture.`
    });

    // Update Open Graph tags
    this.metaService.updateTag({
      property: 'og:title',
      content: `${pageInfo.title} - Angular SuperUI Sidebar Demo`
    });

    this.metaService.updateTag({
      property: 'og:description',
      content: pageInfo.description
    });
  }

  getPageInfo(page: string): { title: string; description: string } {
    const pageMap: Record<string, { title: string; description: string }> = {
      dashboard: {
        title: '📊 Dashboard',
        description: 'Monitor your application metrics and key performance indicators in real-time with comprehensive analytics dashboard.'
      },
      analytics: {
        title: '📈 Analytics',
        description: 'Deep dive into analytics data with reports, metrics, and performance insights for data-driven decisions.'
      },
      reports: {
        title: '📋 Reports',
        description: 'Generate comprehensive reports with detailed analytics and performance metrics for business intelligence.'
      },
      metrics: {
        title: '📊 Metrics',
        description: 'Track key performance metrics and KPIs with real-time monitoring and historical data analysis.'
      },
      performance: {
        title: '⚡ Performance',
        description: 'Monitor application performance metrics including speed, efficiency, and resource utilization analytics.'
      },
      usage: {
        title: '📈 Usage Stats',
        description: 'Detailed usage statistics and user behavior analytics to optimize application experience and engagement.'
      },
      insights: {
        title: '💡 Insights',
        description: 'Get actionable insights from your data with advanced analytics and machine learning-powered recommendations.'
      },
      users: {
        title: '👥 Users',
        description: 'Comprehensive user management system with role-based access control and user group administration.'
      },
      userlist: {
        title: '📝 User List',
        description: 'Browse and manage all user accounts with filtering, sorting, and bulk operations for efficient administration.'
      },
      roles: {
        title: '🔐 Roles & Permissions',
        description: 'Configure role-based access control with granular permissions and security policy management.'
      },
      groups: {
        title: '👥 User Groups',
        description: 'Organize users into groups for efficient permission management and collaborative workspace administration.'
      },
      projects: {
        title: '📂 All Projects',
        description: 'Manage all your projects with comprehensive project lifecycle management and collaboration tools.'
      },
      active: {
        title: '🟢 Active Projects',
        description: 'View and manage currently active projects with real-time status updates and progress tracking.'
      },
      archived: {
        title: '📦 Archived Projects',
        description: 'Access archived projects with historical data and project restoration capabilities for reference.'
      },
      notifications: {
        title: '🔔 Notifications',
        description: 'Stay updated with real-time notifications for important events, alerts, and system updates.'
      },
      messages: {
        title: '💬 Messages',
        description: 'Communicate with team members through integrated messaging system with real-time chat capabilities.'
      },
      help: {
        title: '❓ Help & Support',
        description: 'Get help and support with comprehensive documentation, tutorials, and technical assistance resources.'
      }
    };
    return pageMap[page] || {
      title: '📄 Current Page',
      description: 'Navigate through the Angular SuperUI sidebar demo with comprehensive features and interactive examples.'
    };
  }

  getPageTitle(): string {
    return this.getPageInfo(this.currentPage()).title;
  }  // Computed status string for template display
}
