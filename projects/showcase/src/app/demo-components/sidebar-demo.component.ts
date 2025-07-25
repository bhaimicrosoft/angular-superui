import {Component, computed, effect, signal, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {
  MainContent,
  SidebarContainer,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarNavGroup,
  SidebarNavItem,
  type SidebarState,
  SidebarTrigger
} from '@lib/sidebar';

@Component({
  selector: 'app-sidebar-demo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarContainer,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    MainContent,
    SidebarNavItem,
    SidebarNavGroup,
    SidebarTrigger,
  ],
  template: `
    <div class="min-h-screen bg-background">
      <!-- Top Header with Trigger -->
      <header
        class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="container flex justify-center h-14 items-center px-4">


          <!-- Header Title -->
          <div class="flex flex-1 items-center space-x-2">
            <h1 class="text-lg font-semibold">🚀 Ultimate Sidebar Demo</h1>
            <div class="text-sm text-muted-foreground">
              Mode: <span class="font-medium">{{ currentMode() }}</span> •
              State: <span class="font-medium">{{ getStateLabel() }}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Single Sidebar Layout -->
      @if (!showDualDemo()) {
        <!-- Main Sidebar Layout -->
        <SidebarContainer
          #singleSidebar
          [side]="currentSide()"
          [mode]="currentMode()"
          [size]="currentSize()"
          [isExpanded]="isExpanded()"
          [allowCollapse]="true"
          [allowIconOnly]="true"
          [showBackdropInOverlay]="true"
          [closeOnBackdropClick]="true"
          [closeOnEscape]="true"
          [preventBodyScroll]="true"
          [mobileBreakpoint]="768"
          [ariaLabel]="'Navigation sidebar'"
          [customClass]="'border-l-4 border-l-primary'"
          [headerCustomClass]="'bg-gradient-to-r from-primary/5 to-secondary/5'"
          [contentCustomClass]="'bg-gradient-to-b from-background to-muted/20'"
          [footerCustomClass]="'bg-gradient-to-r from-secondary/5 to-primary/5'"
          (onExpandedChange)="onExpandedChange($event)"
          (onStateChange)="onStateChange($event)"
        >
        <!-- Sidebar Header -->
        <SidebarHeader
          slot="sidebar-header"
          [customClass]="'hover:bg-primary/10 transition-colors duration-300'"
        >
          <div class="flex items-center gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary ring-2 ring-primary/20">
              <svg class="h-4 w-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            @if (!isIconOnlyState()) {
              <div class="flex flex-col">
                <span class="text-sm font-semibold text-foreground">SuperUI Sidebar</span>
                <span class="text-xs text-muted-foreground">v2.0.0 Enhanced</span>
              </div>
            }
          </div>
        </SidebarHeader>

        <!-- Sidebar Content -->
        <SidebarContent
          slot="sidebar-content"
          [customClass]="'hover:bg-accent/20 transition-all duration-200'"
        >
          <!-- Main Navigation Group -->
          <SidebarNavGroup
            [title]="'Main Navigation'"
            [isIconOnly]="isIconOnlyState()"
            [customClass]="'mb-4'"
            [titleCustomClass]="'text-primary font-bold'"
          >
            <SidebarNavItem
              [href]="'/dashboard'"
              [label]="'Dashboard'"
              [icon]="dashboardIcon"
              [isActive]="currentPage() === 'dashboard'"
              [isIconOnly]="isIconOnlyState()"
              [customClass]="'hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400'"
              (onClick)="setCurrentPage('dashboard')"
            />
            <SidebarNavItem
              [href]="'/analytics'"
              [label]="'Analytics'"
              [icon]="analyticsIcon"
              [badge]="'New'"
              [isActive]="currentPage() === 'analytics'"
              [isIconOnly]="isIconOnlyState()"
              [customClass]="'hover:bg-green-50 dark:hover:bg-green-950/50 hover:text-green-600 dark:hover:text-green-400'"
              [badgeCustomClass]="'bg-green-500 text-white animate-pulse'"
              (onClick)="setCurrentPage('analytics')"
            />
            <SidebarNavItem
              [href]="'/users'"
              [label]="'Users'"
              [icon]="usersIcon"
              [badge]="'12'"
              [isActive]="currentPage() === 'users'"
              [isIconOnly]="isIconOnlyState()"
              (onClick)="setCurrentPage('users')"
            />
            <SidebarNavItem
              [href]="'#'"
              [label]="'Projects'"
              [icon]="projectsIcon"
              [hasChildren]="true"
              [isIconOnly]="isIconOnlyState()"
            >
              <SidebarNavItem
                [href]="'/projects/web'"
                [label]="'Web Apps'"
                [isIconOnly]="isIconOnlyState()"
                [isActive]="currentPage() === 'web-apps'"
                (onClick)="setCurrentPage('web-apps')"
              />
              <SidebarNavItem
                [href]="'/projects/mobile'"
                [label]="'Mobile Apps'"
                [badge]="'3'"
                [isIconOnly]="isIconOnlyState()"
                [isActive]="currentPage() === 'mobile-apps'"
                (onClick)="setCurrentPage('mobile-apps')"
              />
            </SidebarNavItem>
          </SidebarNavGroup>

          <!-- Tools Group -->
          <SidebarNavGroup
            [title]="'Tools & Settings'"
            [isIconOnly]="isIconOnlyState()"
            [customClass]="'mt-6'"
            [titleCustomClass]="'text-secondary-foreground font-semibold'"
          >
            <SidebarNavItem
              [href]="'/settings'"
              [label]="'Settings'"
              [icon]="settingsIcon"
              [isActive]="currentPage() === 'settings'"
              [isIconOnly]="isIconOnlyState()"
              (onClick)="setCurrentPage('settings')"
            />
            <SidebarNavItem
              [href]="'/help'"
              [label]="'Help & Support'"
              [icon]="helpIcon"
              [isActive]="currentPage() === 'help'"
              [isIconOnly]="isIconOnlyState()"
              (onClick)="setCurrentPage('help')"
            />
          </SidebarNavGroup>
        </SidebarContent>

        <!-- Sidebar Footer -->
        <SidebarFooter
          slot="sidebar-footer"
          [customClass]="'hover:bg-secondary/10 border-t-2 border-t-primary/20 transition-all duration-300'"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 ring-2 ring-blue-500/20">
              <span class="text-xs font-medium text-white">JD</span>
            </div>
            @if (!isIconOnlyState()) {
              <div class="flex flex-1 flex-col overflow-hidden">
                <span class="truncate text-sm font-medium text-foreground">John Doe</span>
                <span class="truncate text-xs text-muted-foreground">john&#64;superui.dev</span>
              </div>
            }
          </div>
        </SidebarFooter>

        <!-- Main Content Area -->
        <MainContent
          slot="main-content"
          [customClass]="'bg-gradient-to-br from-background via-muted/10 to-background'"
        >
          <div class="p-6">
            <!-- Main Content Header -->
            <div class="mb-8">
              <div class="flex items-end gap-1 mb-2">
                <SidebarTrigger
                  [label]="getTriggerLabel()"
                  [showIcon]="true"
                  [isExpanded]="isExpanded()"
                  [variant]="'default'"
                  [customClass]="'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl ring-2 ring-amber-500/20 hover:ring-amber-500/30 transition-all duration-300'"
                  [size]="'md'"
                  (onTrigger)="onTriggerClick()"
                  class="mr-4"
                />
                <h2 class="text-3xl font-bold tracking-tight">{{ getPageTitle() }}</h2>
              </div>
              <p class="text-muted-foreground mt-2">
                Experience the ultimate sidebar component with push mode, overlay mode, and icon-only states.
              </p>
            </div>

            <!-- Feature Showcase Cards -->
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <!-- Current State Card -->
              <div class="rounded-lg border bg-card p-6">
                <h3 class="font-semibold mb-3 flex items-center gap-2">
                  <span class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  Current State
                </h3>
                <div class="space-y-2 text-sm">
                  <div>Expanded: <span class="font-mono">{{ isExpanded() }}</span></div>
                  <div>Icon Only: <span class="font-mono">{{ isIconOnlyState() }}</span></div>
                  <div>Mobile: <span class="font-mono">{{ isMobile() }}</span></div>
                  <div>Mode: <span class="font-mono">{{ currentMode() }}</span></div>
                  <div>Side: <span class="font-mono">{{ currentSide() }}</span></div>
                  <div>Size: <span class="font-mono">{{ currentSize() }}</span></div>
                  <div class="text-xs text-blue-600 dark:text-blue-400 mt-2">
                    State: <span class="font-mono">{{ getSidebarState() }}</span>
                  </div>
                </div>
              </div>

              <!-- Features Card -->
              <div class="rounded-lg border bg-card p-6">
                <h3 class="font-semibold mb-3">✨ Features</h3>
                <ul class="space-y-2 text-sm">
                  <li class="flex items-center gap-2">
                    <span class="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                    Push & Overlay modes
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    Icon-only state
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                    Responsive design
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                    Keyboard navigation
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                    Content projection
                  </li>
                </ul>
              </div>

              <!-- Behavior Card -->
              <div class="rounded-lg border bg-card p-6">
                <h3 class="font-semibold mb-3">🎯 Behavior</h3>
                <div class="space-y-2 text-sm text-muted-foreground">
                  @if (currentMode() === 'push') {
                    <p>In <strong>push mode</strong>, the main content is pushed aside when the sidebar expands.</p>
                  } @else {
                    <p>In <strong>overlay mode</strong>, the sidebar overlays the content with a backdrop.</p>
                  }
                  @if (isIconOnlyState()) {
                    <p class="text-blue-600 dark:text-blue-400">Currently in <strong>icon-only</strong> state showing
                      just icons.</p>
                  }
                </div>
              </div>
            </div>

            <!-- Configuration Panel -->
            <div class="rounded-lg border bg-card p-6 mb-8">
              <h3 class="text-lg font-semibold mb-6">🔧 Configuration Panel</h3>

              <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <!-- Side Configuration -->
                <div class="space-y-3">
                  <label class="text-sm font-medium">Side Position</label>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      [class]="getSideButtonClass('left')"
                      (click)="setSide('left')"
                    >
                      Left
                    </button>
                    <button
                      [class]="getSideButtonClass('right')"
                      (click)="setSide('right')"
                    >
                      Right
                    </button>
                  </div>
                </div>

                <!-- Mode Configuration -->
                <div class="space-y-3">
                  <label class="text-sm font-medium">Display Mode</label>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      [class]="getModeButtonClass('push')"
                      (click)="setMode('push')"
                    >
                      Push
                    </button>
                    <button
                      [class]="getModeButtonClass('overlay')"
                      (click)="setMode('overlay')"
                    >
                      Overlay
                    </button>
                  </div>
                </div>

                <!-- Size Configuration -->
                <div class="space-y-3">
                  <label class="text-sm font-medium">Sidebar Size</label>
                  <div class="grid grid-cols-2 gap-1">
                    <button
                      [class]="getSizeButtonClass('sm')"
                      (click)="setSize('sm')"
                    >
                      SM
                    </button>
                    <button
                      [class]="getSizeButtonClass('md')"
                      (click)="setSize('md')"
                    >
                      MD
                    </button>
                    <button
                      [class]="getSizeButtonClass('lg')"
                      (click)="setSize('lg')"
                    >
                      LG
                    </button>
                    <button
                      [class]="getSizeButtonClass('xl')"
                      (click)="setSize('xl')"
                    >
                      XL
                    </button>
                  </div>
                </div>

                <!-- Actions -->
                <div class="space-y-3">
                  <label class="text-sm font-medium">Quick Actions</label>
                  <div class="space-y-2">
                    <button
                      class="w-full rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                      (click)="toggleIconOnly()"
                    >
                      Toggle Icon Only
                    </button>
                    <button
                      class="w-full rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 transition-colors"
                      (click)="toggleExpanded()"
                    >
                      {{ isExpanded() ? 'Collapse' : 'Expand' }}
                    </button>
                    <button
                      class="w-full rounded-md bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700 transition-colors"
                      (click)="toggleDualDemo()"
                    >
                      {{ showDualDemo() ? 'Single Sidebar' : 'Dual Sidebar' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Custom Styling Showcase -->
            <div class="rounded-lg border bg-card p-6 mb-8">
              <h3 class="text-lg font-semibold mb-6">🎨 Custom Styling & Accessibility</h3>

              <div class="grid gap-6 md:grid-cols-2">
                <!-- Custom Classes -->
                <div class="space-y-4">
                  <h4 class="text-md font-medium">✨ CustomClass Support</h4>
                  <div class="text-sm text-muted-foreground space-y-2">
                    <p>Every sidebar component supports <code class="bg-muted px-1 py-0.5 rounded text-xs">customClass</code> inputs:</p>
                    <ul class="list-disc list-inside space-y-1">
                      <li><strong>SidebarContainer:</strong> customClass, headerCustomClass, contentCustomClass, footerCustomClass</li>
                      <li><strong>SidebarNavItem:</strong> customClass, badgeCustomClass</li>
                      <li><strong>SidebarNavGroup:</strong> customClass, titleCustomClass</li>
                      <li><strong>SidebarTrigger:</strong> customClass</li>
                    </ul>
                  </div>
                </div>

                <!-- Accessibility Features -->
                <div class="space-y-4">
                  <h4 class="text-md font-medium">♿ Accessibility Features</h4>
                  <div class="text-sm text-muted-foreground space-y-2">
                    <ul class="list-disc list-inside space-y-1">
                      <li>Full keyboard navigation support</li>
                      <li>Screen reader optimized with proper ARIA labels</li>
                      <li>Focus management and focus trapping</li>
                      <li>High contrast and dark mode support</li>
                      <li>Semantic HTML structure (nav, main, aside)</li>
                      <li>Role attributes for proper navigation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Example Code -->
              <div class="mt-6 p-4 bg-muted rounded-lg">
                <h5 class="text-sm font-medium mb-3">Example Usage:</h5>
                <pre class="text-xs text-muted-foreground overflow-x-auto"><code>&lt;SidebarContainer
  [customClass]="'border-l-4 border-l-primary'"
  [headerCustomClass]="'bg-gradient-to-r from-primary/5 to-secondary/5'"
  [contentCustomClass]="'bg-gradient-to-b from-background to-muted/20'"
&gt;
  &lt;SidebarNavItem
    [customClass]="'hover:bg-blue-50 dark:hover:bg-blue-950/50'"
    [badgeCustomClass]="'bg-green-500 animate-pulse'"
  /&gt;
&lt;/SidebarContainer&gt;</code></pre>
              </div>
            </div>

            <!-- Sample Content -->
            <div class="space-y-4">
              <h3 class="text-xl font-semibold">📄 Sample Content</h3>

              <div class="grid gap-4 md:grid-cols-2">
                @for (item of sampleContent; track item.id) {
                  <div class="rounded-lg border bg-card p-4">
                    <h4 class="font-medium mb-2">{{ item.title }}</h4>
                    <p class="text-sm text-muted-foreground">{{ item.description }}</p>
                    <div class="mt-3 flex gap-2">
                      <span
                        class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                        {{ item.category }}
                      </span>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </MainContent>
      </SidebarContainer>
      }

      <!-- Dual Sidebar Layout -->
      @if (showDualDemo()) {
        <div class="flex h-screen bg-background">
          <!-- Left Sidebar (SidebarContainer) -->
          <SidebarContainer
            #leftSidebar
            [side]="'left'"
            [mode]="'push'"
            [size]="'md'"
            [isExpanded]="leftSidebarExpanded()"
            [ariaLabel]="'Left navigation sidebar'"
            [customClass]="'bg-gradient-to-b from-blue-50/50 to-background dark:from-blue-950/20 dark:to-background border-r-2 border-blue-200 dark:border-blue-800'"
            [headerCustomClass]="'bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 border-b-2 border-blue-200 dark:border-blue-800'"
            (onExpandedChange)="onLeftSidebarChange($event)"
          >
            <!-- Left Sidebar Header -->
            <SidebarHeader [customClass]="'p-4'">
              <div class="flex items-center gap-2">
                <div class="flex h-6 w-6 items-center justify-center rounded bg-blue-600 ring-2 ring-blue-600/30">
                  <span class="text-xs font-bold text-white">L</span>
                </div>
                <span class="text-sm font-semibold text-blue-700 dark:text-blue-300">Left Sidebar</span>
              </div>
            </SidebarHeader>

            <!-- Left Sidebar Content -->
            <SidebarContent [customClass]="'p-4 space-y-2'">
              <SidebarNavGroup
                [title]="'Navigation'"
                [isIconOnly]="false"
                [titleCustomClass]="'text-blue-600 dark:text-blue-400 font-semibold'"
              >
                <SidebarNavItem
                  [href]="'/nav1'"
                  [label]="'Navigation 1'"
                  [icon]="dashboardIcon"
                  [isActive]="currentPage() === 'nav1'"
                  [customClass]="'hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300'"
                  (onClick)="setCurrentPage('nav1')"
                />
                <SidebarNavItem
                  [href]="'/nav2'"
                  [label]="'Navigation 2'"
                  [icon]="usersIcon"
                  [isActive]="currentPage() === 'nav2'"
                  [customClass]="'hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300'"
                  (onClick)="setCurrentPage('nav2')"
                />
              </SidebarNavGroup>
            </SidebarContent>
          </SidebarContainer>

          <!-- Main Content Area -->
          <MainContent [customClass]="'flex-1 min-h-screen order-1'">
            <div class="flex h-full">
              <!-- Center Content -->
              <div class="flex-1 p-6 bg-background">
                <div class="flex gap-2 items-center">
                  <button
                    class="w-full rounded-md bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700 transition-colors"
                    (click)="toggleDualDemo()"
                  >
                    {{ showDualDemo() ? 'Single Sidebar' : 'Dual Sidebar' }}
                  </button>
                  <h2 class="text-2xl font-bold mb-4">🎉 Dual Sidebar Demo</h2>
                </div>
                <p class="text-muted-foreground mb-6">
                  This demonstrates how you can use two sidebars simultaneously - one on the left and one on the right!
                </p>

                <div class="grid gap-4 md:grid-cols-2 mb-6">
                  <div class="rounded-lg border bg-card p-4">
                    <h3 class="font-semibold mb-2">Left Sidebar</h3>
                    <p class="text-sm text-muted-foreground mb-3">
                      Contains navigation items and main menu options.
                    </p>
                    <p class="text-sm font-medium">
                      State: {{ leftSidebarExpanded() ? 'Expanded' : 'Collapsed' }}
                    </p>
                    <button
                      (click)="toggleLeftSidebar()"
                      class="mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-3 bg-green-700"
                    >
                      Toggle Left
                    </button>
                  </div>
                  <div class="rounded-lg border bg-card p-4">
                    <h3 class="font-semibold mb-2">Right Sidebar</h3>
                    <p class="text-sm text-muted-foreground mb-3">
                      Contains tools, settings, and quick actions.
                    </p>
                    <p class="text-sm font-medium">
                      State: {{ rightSidebarExpanded() ? 'Expanded' : 'Collapsed' }}
                    </p>
                    <button
                      (click)="toggleRightSidebar()"
                      class="mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-yellow-700 hover:bg-accent hover:text-accent-foreground h-9 px-3"
                    >
                      Toggle Right
                    </button>
                  </div>
                </div>

                <div class="space-y-4">
                  <h3 class="text-lg font-semibold">Implementation Notes</h3>
                  <ul class="space-y-2 text-sm text-muted-foreground">
                    <li>• Each sidebar can have different sizes and configurations</li>
                    <li>• Independent expand/collapse states</li>
                    <li>• Responsive design considerations</li>
                    <li>• Perfect for dashboard layouts with multiple content areas</li>
                  </ul>
                </div>
              </div>
            </div>
          </MainContent>

          <!-- Right Sidebar (SidebarContainer) -->
          <SidebarContainer
            #rightSidebar
            [side]="'right'"
            [mode]="'push'"
            [size]="'md'"
            [isExpanded]="rightSidebarExpanded()"
            [ariaLabel]="'Right tools sidebar'"
            [customClass]="'bg-gradient-to-b from-green-50/50 to-background dark:from-green-950/20 dark:to-background border-l-2 border-green-200 dark:border-green-800'"
            [headerCustomClass]="'bg-green-50 dark:bg-green-950/50 hover:bg-green-100 dark:hover:bg-green-900/50 border-b-2 border-green-200 dark:border-green-800'"
            (onExpandedChange)="onRightSidebarChange($event)"
          >
            <!-- Right Sidebar Header -->
            <SidebarHeader [customClass]="'p-4'">
              <div class="flex items-center gap-2">
                <div class="flex h-6 w-6 items-center justify-center rounded bg-green-600 ring-2 ring-green-600/30">
                  <span class="text-xs font-bold text-white">R</span>
                </div>
                <span class="text-sm font-semibold text-green-700 dark:text-green-300">Right Sidebar</span>
              </div>
            </SidebarHeader>

            <!-- Right Sidebar Content -->
            <SidebarContent [customClass]="'p-4 space-y-2'">
              <SidebarNavGroup
                [title]="'Tools'"
                [isIconOnly]="false"
                [titleCustomClass]="'text-green-600 dark:text-green-400 font-semibold'"
              >
                <SidebarNavItem
                  [href]="'/tool1'"
                  [label]="'Settings'"
                  [icon]="settingsIcon"
                  [isActive]="currentPage() === 'tool1'"
                  [customClass]="'hover:bg-green-100 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300'"
                  (onClick)="setCurrentPage('tool1')"
                />
                <SidebarNavItem
                  [href]="'/tool2'"
                  [label]="'Help'"
                  [icon]="helpIcon"
                  [isActive]="currentPage() === 'tool2'"
                  [customClass]="'hover:bg-green-100 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300'"
                  (onClick)="setCurrentPage('tool2')"
                />
              </SidebarNavGroup>
            </SidebarContent>
          </SidebarContainer>
        </div>
      }
    </div>
  `
})
export class SidebarDemoComponent {
  // ViewChild references for different scenarios
  @ViewChild('singleSidebar', { static: false }) singleSidebar!: SidebarContainer;
  @ViewChild('leftSidebar', { static: false }) leftSidebar!: SidebarContainer;
  @ViewChild('rightSidebar', { static: false }) rightSidebar!: SidebarContainer;

  // Get the appropriate sidebar container based on current mode
  get sidebarContainer(): SidebarContainer | null {
    if (this.showDualDemo()) {
      return null; // Dual mode doesn't use a single container
    }
    return this.singleSidebar || null;
  }

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
  readonly projectsIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`;
  readonly settingsIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`;
  readonly helpIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

  // Configuration signals
  private readonly _currentSide = signal<'left' | 'right'>('left');
  readonly currentSide = computed(() => this._currentSide());
  private readonly _currentMode = signal<'push' | 'overlay'>('push');
  readonly currentMode = computed(() => this._currentMode());
  private readonly _currentCollapseMode = signal<'none' | 'icon'>('none');
  readonly currentCollapseMode = computed(() => this._currentCollapseMode());
  private readonly _currentSize = signal<'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly currentSize = computed(() => this._currentSize());
  private readonly _currentPage = signal<string>('dashboard');
  readonly currentPage = computed(() => this._currentPage());

  // Dual sidebar demo
  private readonly _showDualDemo = signal<boolean>(false);
  readonly showDualDemo = computed(() => this._showDualDemo());

  // Dual sidebar state management
  private readonly _leftSidebarExpanded = signal<boolean>(true);
  readonly leftSidebarExpanded = computed(() => this._leftSidebarExpanded());

  private readonly _rightSidebarExpanded = signal<boolean>(true);
  readonly rightSidebarExpanded = computed(() => this._rightSidebarExpanded());

  // State signals from sidebar
  private readonly _sidebarState = signal<SidebarState | null>(null);
  readonly isExpanded = computed(() =>
    this._sidebarState()?.isExpanded ?? true
  );
  readonly isIconOnlyState = computed(() =>
    this._sidebarState()?.isIconOnly ?? false
  );
  readonly isMobile = computed(() =>
    this._sidebarState()?.isMobile ?? false
  );

  constructor() {
    console.log('🚀 Ultimate Sidebar Demo initialized!');

    effect(() => {
      console.log('📊 Sidebar state updated:', {
        expanded: this.isExpanded(),
        iconOnly: this.isIconOnlyState(),
        mobile: this.isMobile(),
        mode: this.currentMode(),
        side: this.currentSide(),
        size: this.currentSize(),
        page: this.currentPage()
      });
    });
  }

  // Event handlers
  onTriggerClick() {
    // Use the sidebar container's toggleExpanded method
    if (this.sidebarContainer) {
      this.sidebarContainer.toggleExpanded();
    }
  }

  onExpandedChange(expanded: boolean) {
    // State is now managed by the sidebar container
    console.log('Sidebar expanded state changed:', expanded);
  }

  onStateChange(state: SidebarState) {
    this._sidebarState.set(state);
  }

  // Dual sidebar controls
  toggleLeftSidebar() {
    if (this.leftSidebar) {
      this.leftSidebar.toggleExpanded();
    }
    this._leftSidebarExpanded.set(!this._leftSidebarExpanded());
  }

  toggleRightSidebar() {
    if (this.rightSidebar) {
      this.rightSidebar.toggleExpanded();
    }
    this._rightSidebarExpanded.set(!this._rightSidebarExpanded());
  }

  // Event handlers for dual sidebar
  onLeftSidebarChange(expanded: boolean) {
    this._leftSidebarExpanded.set(expanded);
    console.log('Left sidebar expanded state changed:', expanded);
  }

  onRightSidebarChange(expanded: boolean) {
    this._rightSidebarExpanded.set(expanded);
    console.log('Right sidebar expanded state changed:', expanded);
  }

  toggleDualDemo() {
    this._showDualDemo.set(!this._showDualDemo());
  }

  // Configuration methods
  setSide(side: 'left' | 'right') {
    this._currentSide.set(side);
  }

  setMode(mode: 'push' | 'overlay') {
    this._currentMode.set(mode);
  }

  setSize(size: 'sm' | 'md' | 'lg' | 'xl') {
    this._currentSize.set(size);
  }

  toggleExpanded() {
    // Use the sidebar container's toggleExpanded method
    if (this.sidebarContainer) {
      this.sidebarContainer.toggleExpanded();
    }
  }

  toggleIconOnly() {
    // Use the sidebar container's toggleIconOnly method
    if (this.sidebarContainer) {
      this.sidebarContainer.toggleIconOnly();
    }
  }

  setCurrentPage(page: string) {
    this._currentPage.set(page);
  }

  // Helper methods
  getTriggerLabel(): string {
    return this.isExpanded() ? 'Close Menu' : 'Open Menu';
  }

  getStateLabel(): string {
    if (!this.isExpanded()) return 'Collapsed';
    if (this.isIconOnlyState()) return 'Icon Only';
    return 'Expanded';
  }

  getSidebarState(): string {
    if (!this.isExpanded() && !this.isIconOnlyState()) return 'collapsed';
    if (this.isIconOnlyState()) return 'iconOnly';
    return 'expanded';
  }

  getPageTitle(): string {
    const pageMap: Record<string, string> = {
      dashboard: '📊 Dashboard',
      analytics: '📈 Analytics',
      users: '👥 Users',
      'web-apps': '🌐 Web Applications',
      'mobile-apps': '📱 Mobile Applications',
      settings: '⚙️ Settings',
      help: '❓ Help & Support'
    };
    return pageMap[this.currentPage()] || '📄 Page';
  }

  // Button styling helpers
  getSideButtonClass(side: 'left' | 'right'): string {
    const isActive = this.currentSide() === side;
    return `px-3 py-1.5 text-sm rounded-md transition-colors ${
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
    }`;
  }

  getModeButtonClass(mode: 'push' | 'overlay'): string {
    const isActive = this.currentMode() === mode;
    return `px-3 py-1.5 text-sm rounded-md transition-colors ${
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
    }`;
  }

  getSizeButtonClass(size: 'sm' | 'md' | 'lg' | 'xl'): string {
    const isActive = this.currentSize() === size;
    return `px-2 py-1 text-xs rounded transition-colors ${
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
    }`;
  }
}
