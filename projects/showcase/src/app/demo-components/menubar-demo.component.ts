import {ChangeDetectionStrategy, Component, signal, PLATFORM_ID, inject} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from '@lib/menubar';

@Component({
  selector: 'menubar-demo',
  standalone: true,
  imports: [
    CommonModule,
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent,
    MenubarSeparator,
    MenubarShortcut,
  ],
  template: `
    <!-- SEO Meta Tags -->
    <div class="sr-only">
      <h1>MenuBar Component - Responsive Navigation with Accessibility</h1>
      <p>Complete MenuBar component demo with keyboard navigation, submenus, shortcuts, and full accessibility support. Mobile-first responsive design.</p>
    </div>

    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">

      <!-- Hero Section -->
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 bg-[size:20px_20px] opacity-50"></div>
        <div class="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div class="text-center max-w-4xl mx-auto">
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <span class="animate-pulse mr-2">✨</span>
              Fully Accessible & Responsive
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6">
              <span class="block">MenuBar</span>
              <span class="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Component</span>
            </h1>
            <p class="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              Professional navigation component with keyboard support, submenus, shortcuts, and WCAG 2.1 AA compliance.
              Scales beautifully from mobile to desktop.
            </p>
            <div class="flex flex-wrap justify-center gap-4 text-sm">
              <span class="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                ⌨️ Keyboard Navigation
              </span>
              <span class="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                📱 Mobile First
              </span>
              <span class="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                ♿ WCAG 2.1 AA
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Feedback -->
      @if (lastAction()) {
        <div class="sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-4">
          <div class="max-w-4xl mx-auto">
            <div class="bg-green-500 dark:bg-green-600 text-white p-4 rounded-lg shadow-lg border border-green-400 dark:border-green-500 animate-in slide-in-from-top-2 duration-300">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <span class="text-xl mr-3">✅</span>
                  <span class="font-medium">Action Executed:</span>
                  <span class="ml-2 font-bold">{{ lastAction() }}</span>
                </div>
                <button
                  (click)="lastAction.set('')"
                  class="text-white hover:text-green-100 transition-colors"
                  aria-label="Dismiss notification"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      <div class="px-4 sm:px-6 lg:px-8 pb-20">
        <div class="max-w-7xl mx-auto space-y-12">

          <!-- Quick Start Example -->
          <section class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
            <div class="p-6 sm:p-8">
              <div class="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                <div>
                  <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Quick Start</h2>
                  <p class="text-slate-600 dark:text-slate-300">Basic menubar for immediate use</p>
                </div>
                <div class="mt-4 lg:mt-0">
                  <span class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm">
                    📚 Basic Example
                  </span>
                </div>
              </div>

              <div class="mb-6 flex justify-center">
                <Menubar ariaLabel="Quick start navigation">
                  <MenubarMenu>
                    <MenubarTrigger>📁 File</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem (itemClick)="handleAction('New Document')">
                        📄 New Document
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Open File')">
                        📂 Open...
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem (itemClick)="handleAction('Save Document')">
                        💾 Save
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Export PDF')">
                        📊 Export as PDF
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>

                  <MenubarMenu>
                    <MenubarTrigger>✏️ Edit</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem (itemClick)="handleAction('Undo Action')">
                        ↶ Undo<MenubarShortcut>⌘ Z</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Redo Action')">
                        ↷ Redo<MenubarShortcut>⌘ ⇧ Z</MenubarShortcut>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarSub>
                        <MenubarSubTrigger>
                          🔍 Find & Replace
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem (itemClick)="handleAction('Find')">
                            🔍 Find<MenubarShortcut>⌘ F</MenubarShortcut>
                          </MenubarItem>
                          <MenubarItem (itemClick)="handleAction('Find Next')">
                            ⏭️ Find Next<MenubarShortcut>⌘ G</MenubarShortcut>
                          </MenubarItem>
                          <MenubarItem (itemClick)="handleAction('Find Previous')">
                            ⏮️ Find Previous<MenubarShortcut>⌘ ⇧ G</MenubarShortcut>
                          </MenubarItem>
                          <MenubarSeparator />
                          <MenubarItem (itemClick)="handleAction('Replace')">
                            🔄 Replace<MenubarShortcut>⌘ R</MenubarShortcut>
                          </MenubarItem>
                          <MenubarItem (itemClick)="handleAction('Replace All')">
                            🔄🔄 Replace All<MenubarShortcut>⌘ ⇧ R</MenubarShortcut>
                          </MenubarItem>
                          <MenubarSeparator />
                          <MenubarItem (itemClick)="handleAction('Find in Files')">
                            📂 Find in Files<MenubarShortcut>⌘ ⇧ F</MenubarShortcut>
                          </MenubarItem>
                        </MenubarSubContent>
                      </MenubarSub>
                      <MenubarItem (itemClick)="handleAction('Select All')">
                        📋 Select All<MenubarShortcut>⌘ A</MenubarShortcut>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem (itemClick)="handleAction('Cut Text')">
                        ✂️ Cut<MenubarShortcut>⌘ X</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Copy Text')">
                        📋 Copy<MenubarShortcut>⌘ C</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Paste Text')">
                        📌 Paste<MenubarShortcut>⌘ V</MenubarShortcut>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>

                  <MenubarMenu>
                    <MenubarTrigger>👁️ View</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem (itemClick)="handleAction('Zoom In')">
                        🔍 Zoom In
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Zoom Out')">
                        🔍 Zoom Out
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Reset Zoom')">
                        🎯 Reset Zoom
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem (itemClick)="handleAction('Full Screen Mode')">
                        🖥️ Full Screen
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>

              <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <h3 class="font-semibold text-slate-800 dark:text-white mb-3 flex items-center">
                  <span class="mr-2">🎯</span>
                  Try This:
                </h3>
                <div class="grid sm:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300">
                  <ul class="space-y-2">
                    <li class="flex items-start">
                      <span class="text-blue-500 mr-2">•</span>
                      Click any menu to open dropdown
                    </li>
                    <li class="flex items-start">
                      <span class="text-blue-500 mr-2">•</span>
                      Use arrow keys to navigate
                    </li>
                  </ul>
                  <ul class="space-y-2">
                    <li class="flex items-start">
                      <span class="text-blue-500 mr-2">•</span>
                      Press Escape to close menus
                    </li>
                    <li class="flex items-start">
                      <span class="text-blue-500 mr-2">•</span>
                      Click outside to auto-close
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <!-- Professional Example -->
          <section class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
            <div class="p-6 sm:p-8">
              <div class="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                <div>
                  <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Professional Suite</h2>
                  <p class="text-slate-600 dark:text-slate-300">Advanced features with shortcuts and submenus</p>
                </div>
                <div class="mt-4 lg:mt-0">
                  <span class="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm">
                    🚀 Advanced Features
                  </span>
                </div>
              </div>

              <div class="mb-6 flex justify-center">
                <Menubar ariaLabel="Professional application navigation">
                  <MenubarMenu>
                    <MenubarTrigger>📁 File</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem (itemClick)="handleAction('Create New Tab')">
                        📄 New Tab
                        <MenubarShortcut>⌘T</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Create New Window')">
                        🪟 New Window
                        <MenubarShortcut>⌘N</MenubarShortcut>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarSub>
                        <MenubarSubTrigger>📂 Recent Files</MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem (itemClick)="handleAction('Open Project A')">
                            📊 Project A.xlsx
                          </MenubarItem>
                          <MenubarItem (itemClick)="handleAction('Open Document B')">
                            📝 Document B.docx
                          </MenubarItem>
                          <MenubarItem (itemClick)="handleAction('Open Presentation C')">
                            📽️ Presentation C.pptx
                          </MenubarItem>
                          <MenubarSeparator />
                          <MenubarItem (itemClick)="handleAction('Clear Recent Files')">
                            🗑️ Clear Recent
                          </MenubarItem>
                        </MenubarSubContent>
                      </MenubarSub>
                      <MenubarItem (itemClick)="handleAction('Import Files')">
                        📥 Import...
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Export Files')">
                        📤 Export...
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem (itemClick)="handleAction('Print Document')">
                        🖨️ Print
                        <MenubarShortcut>⌘P</MenubarShortcut>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>

                  <MenubarMenu>
                    <MenubarTrigger>✏️ Edit</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem (itemClick)="handleAction('Undo Last Action')">
                        ↶ Undo
                        <MenubarShortcut>⌘Z</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Redo Last Action')">
                        ↷ Redo
                        <MenubarShortcut>⌘⇧Z</MenubarShortcut>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarSub>
                        <MenubarSubTrigger>🔍 Find & Replace</MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem (itemClick)="handleAction('Find Text')">
                            🔍 Find...
                            <MenubarShortcut>⌘F</MenubarShortcut>
                          </MenubarItem>
                          <MenubarItem (itemClick)="handleAction('Find and Replace')">
                            🔄 Find & Replace
                            <MenubarShortcut>⌘H</MenubarShortcut>
                          </MenubarItem>
                          <MenubarItem (itemClick)="handleAction('Find Next')">
                            ⏭️ Find Next
                            <MenubarShortcut>⌘G</MenubarShortcut>
                          </MenubarItem>
                          <MenubarItem (itemClick)="handleAction('Find Previous')">
                            ⏮️ Find Previous
                            <MenubarShortcut>⌘⇧G</MenubarShortcut>
                          </MenubarItem>
                        </MenubarSubContent>
                      </MenubarSub>
                      <MenubarSeparator />
                      <MenubarItem (itemClick)="handleAction('Select All')">
                        📋 Select All
                        <MenubarShortcut>⌘A</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Cut Selection')">
                        ✂️ Cut
                        <MenubarShortcut>⌘X</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Copy Selection')">
                        📋 Copy
                        <MenubarShortcut>⌘C</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Paste Content')">
                        📌 Paste
                        <MenubarShortcut>⌘V</MenubarShortcut>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>

                  <MenubarMenu>
                    <MenubarTrigger>👁️ View</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem (itemClick)="handleAction('Refresh Page')">
                        🔄 Refresh
                        <MenubarShortcut>⌘R</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem [disabled]="true">
                        ⚡ Force Refresh
                        <MenubarShortcut>⌘⇧R</MenubarShortcut>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarSub>
                        <MenubarSubTrigger>🔍 Zoom</MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem (itemClick)="handleAction('Zoom In View')">
                            ➕ Zoom In
                            <MenubarShortcut>⌘+</MenubarShortcut>
                          </MenubarItem>
                          <MenubarItem (itemClick)="handleAction('Zoom Out View')">
                            ➖ Zoom Out
                            <MenubarShortcut>⌘-</MenubarShortcut>
                          </MenubarItem>
                          <MenubarItem (itemClick)="handleAction('Reset Zoom Level')">
                            🎯 Reset Zoom
                            <MenubarShortcut>⌘0</MenubarShortcut>
                          </MenubarItem>
                        </MenubarSubContent>
                      </MenubarSub>
                      <MenubarItem (itemClick)="handleAction('Toggle Sidebar')">
                        📑 Toggle Sidebar
                        <MenubarShortcut>⌘B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Enter Full Screen')">
                        🖥️ Full Screen
                        <MenubarShortcut>F11</MenubarShortcut>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>

                  <MenubarMenu>
                    <MenubarTrigger>🛠️ Tools</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem (itemClick)="handleAction('Open Developer Tools')">
                        🔧 Developer Tools
                        <MenubarShortcut>F12</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Task Manager')">
                        📊 Task Manager
                        <MenubarShortcut>⇧⎋</MenubarShortcut>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarSub>
                        <MenubarSubTrigger>⚙️ Settings</MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem (itemClick)="handleAction('General Settings')">
                            ⚙️ General
                          </MenubarItem>
                          <MenubarItem (itemClick)="handleAction('Privacy Settings')">
                            🔒 Privacy & Security
                          </MenubarItem>
                          <MenubarItem (itemClick)="handleAction('Appearance Settings')">
                            🎨 Appearance
                          </MenubarItem>
                          <MenubarItem (itemClick)="handleAction('Advanced Settings')">
                            🔬 Advanced
                          </MenubarItem>
                        </MenubarSubContent>
                      </MenubarSub>
                      <MenubarItem (itemClick)="handleAction('Extensions Manager')">
                        🧩 Extensions
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>

                  <MenubarMenu>
                    <MenubarTrigger>❓ Help</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem (itemClick)="handleAction('View Documentation')">
                        📚 Documentation
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Keyboard Shortcuts')">
                        ⌨️ Keyboard Shortcuts
                        <MenubarShortcut>⌘/</MenubarShortcut>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem (itemClick)="handleAction('Report Bug')">
                        🐛 Report a Bug
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Feature Request')">
                        💡 Request Feature
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem (itemClick)="handleAction('About Application')">
                        ℹ️ About
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>

              <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <h3 class="font-semibold text-slate-800 dark:text-white mb-3 flex items-center">
                  <span class="mr-2">🚀</span>
                  Advanced Features:
                </h3>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-600 dark:text-slate-300">
                  <ul class="space-y-2">
                    <li class="flex items-start">
                      <span class="text-purple-500 mr-2">•</span>
                      Keyboard shortcuts displayed
                    </li>
                    <li class="flex items-start">
                      <span class="text-purple-500 mr-2">•</span>
                      Multi-level submenus
                    </li>
                  </ul>
                  <ul class="space-y-2">
                    <li class="flex items-start">
                      <span class="text-purple-500 mr-2">•</span>
                      Disabled state example
                    </li>
                    <li class="flex items-start">
                      <span class="text-purple-500 mr-2">•</span>
                      Professional categorization
                    </li>
                  </ul>
                  <ul class="space-y-2">
                    <li class="flex items-start">
                      <span class="text-purple-500 mr-2">•</span>
                      Contextual grouping
                    </li>
                    <li class="flex items-start">
                      <span class="text-purple-500 mr-2">•</span>
                      Visual separators
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>


          <!-- Accessibility Demo -->
          <section class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
            <div class="p-6 sm:p-8">
              <div class="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                <div>
                  <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Accessibility First</h2>
                  <p class="text-slate-600 dark:text-slate-300">WCAG 2.1 AA compliant with full screen reader support</p>
                </div>
                <div class="mt-4 lg:mt-0 flex flex-wrap gap-2">
                  <span class="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm">
                    ♿ WCAG 2.1 AA
                  </span>
                  <span class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm">
                    🎯 Screen Reader Ready
                  </span>
                </div>
              </div>

              <div class="mb-6 flex justify-center">
                <Menubar ariaLabel="Accessibility demonstration navigation">
                  <MenubarMenu>
                    <MenubarTrigger>♿ Accessible</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem (itemClick)="handleAction('Screen Reader Test')">
                        🔊 Screen Reader Test
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('High Contrast Mode')">
                        🎨 High Contrast
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Large Text Mode')">
                        🔤 Large Text
                      </MenubarItem>
                      <MenubarItem [disabled]="true">
                        ⏸️ Disabled Item Demo
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>

                  <MenubarMenu>
                    <MenubarTrigger>⌨️ Keyboard</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem (itemClick)="handleAction('Tab Navigation')">
                        ⇥ Tab Navigation
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Arrow Keys')">
                        ←→↑↓ Arrow Keys
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Enter/Space')">
                        ⌨️ Enter/Space
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Escape Key')">
                        ⎋ Escape
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>

                  <MenubarMenu>
                    <MenubarTrigger>🎯 Focus</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem (itemClick)="handleAction('Focus Management')">
                        🎯 Focus Management
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Focus Indicators')">
                        🔍 Focus Indicators
                      </MenubarItem>
                      <MenubarItem (itemClick)="handleAction('Focus Trapping')">
                        🔒 Focus Trapping
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>

              <div class="grid lg:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div class="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
                    <h3 class="font-semibold text-orange-800 dark:text-orange-200 mb-3 flex items-center">
                      <span class="mr-2">♿</span>
                      Accessibility Features:
                    </h3>
                    <ul class="space-y-2 text-sm text-orange-700 dark:text-orange-300">
                      <li class="flex items-start">
                        <span class="text-orange-500 mr-2">•</span>
                        ARIA labels and roles
                      </li>
                      <li class="flex items-start">
                        <span class="text-orange-500 mr-2">•</span>
                        Screen reader announcements
                      </li>
                      <li class="flex items-start">
                        <span class="text-orange-500 mr-2">•</span>
                        High contrast support
                      </li>
                      <li class="flex items-start">
                        <span class="text-orange-500 mr-2">•</span>
                        Reduced motion respect
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="space-y-4">
                  <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                    <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center">
                      <span class="mr-2">⌨️</span>
                      Keyboard Navigation:
                    </h3>
                    <ul class="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                      <li class="flex items-start">
                        <span class="text-blue-500 mr-2">•</span>
                        Tab through triggers
                      </li>
                      <li class="flex items-start">
                        <span class="text-blue-500 mr-2">•</span>
                        Arrow keys for menu items
                      </li>
                      <li class="flex items-start">
                        <span class="text-blue-500 mr-2">•</span>
                        Enter/Space to activate
                      </li>
                      <li class="flex items-start">
                        <span class="text-blue-500 mr-2">•</span>
                        Escape to close menus
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Usage Instructions -->
          <section class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl shadow-xl border border-blue-200 dark:border-blue-800">
            <div class="p-6 sm:p-8">
              <h2 class="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-blue-100 mb-6 text-center">
                🎮 Interactive Testing Guide
              </h2>

              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-white/80 dark:bg-slate-800/80 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                  <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center">
                    <span class="mr-2">🖱️</span>
                    Mouse Testing
                  </h3>
                  <ul class="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>• Click triggers to open menus</li>
                    <li>• Hover over submenus</li>
                    <li>• Click items for actions</li>
                    <li>• Click outside to close</li>
                  </ul>
                </div>

                <div class="bg-white/80 dark:bg-slate-800/80 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
                  <h3 class="font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center">
                    <span class="mr-2">⌨️</span>
                    Keyboard Testing
                  </h3>
                  <ul class="space-y-2 text-sm text-purple-700 dark:text-purple-300">
                    <li>• Tab to navigate triggers</li>
                    <li>• Arrow keys in menus</li>
                    <li>• Enter/Space to activate</li>
                    <li>• Escape to close</li>
                  </ul>
                </div>

                <div class="bg-white/80 dark:bg-slate-800/80 rounded-xl p-4 border border-green-200 dark:border-green-700">
                  <h3 class="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                    <span class="mr-2">📱</span>
                    Touch Testing
                  </h3>
                  <ul class="space-y-2 text-sm text-green-700 dark:text-green-300">
                    <li>• Tap triggers to open</li>
                    <li>• Tap items to select</li>
                    <li>• Tap outside to close</li>
                    <li>• Test on various sizes</li>
                  </ul>
                </div>
              </div>

              <div class="mt-8 bg-white/80 dark:bg-slate-800/80 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700">
                <h3 class="text-lg font-semibold text-indigo-800 dark:text-indigo-200 mb-4 text-center">
                  🧪 Advanced Testing Scenarios
                </h3>
                <div class="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 class="font-medium text-indigo-700 dark:text-indigo-300 mb-2">Stress Testing:</h4>
                    <ul class="space-y-1 text-indigo-600 dark:text-indigo-400">
                      <li>• Rapid menu switching</li>
                      <li>• Simultaneous keyboard + mouse</li>
                      <li>• Long submenu chains</li>
                      <li>• Window resizing during use</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-medium text-indigo-700 dark:text-indigo-300 mb-2">Edge Cases:</h4>
                    <ul class="space-y-1 text-indigo-600 dark:text-indigo-400">
                      <li>• Very narrow screens</li>
                      <li>• High zoom levels</li>
                      <li>• Slow network conditions</li>
                      <li>• Screen reader compatibility</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Performance & SEO Info -->
          <section class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-xl border border-green-200 dark:border-green-800">
            <div class="p-6 sm:p-8">
              <h2 class="text-2xl sm:text-3xl font-bold text-green-900 dark:text-green-100 mb-6 text-center">
                🚀 Performance & SEO Optimized
              </h2>

              <div class="grid lg:grid-cols-3 gap-6">
                <div class="bg-white/80 dark:bg-slate-800/80 rounded-xl p-4 border border-green-200 dark:border-green-700">
                  <h3 class="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                    <span class="mr-2">⚡</span>
                    Performance
                  </h3>
                  <ul class="space-y-2 text-sm text-green-700 dark:text-green-300">
                    <li>• Lazy loading animations</li>
                    <li>• Optimized event handling</li>
                    <li>• Minimal DOM manipulation</li>
                    <li>• Signal-based reactivity</li>
                  </ul>
                </div>

                <div class="bg-white/80 dark:bg-slate-800/80 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                  <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center">
                    <span class="mr-2">🔍</span>
                    SEO Ready
                  </h3>
                  <ul class="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>• Semantic HTML structure</li>
                    <li>• Screen reader friendly</li>
                    <li>• Progressive enhancement</li>
                    <li>• Meta tag optimized</li>
                  </ul>
                </div>

                <div class="bg-white/80 dark:bg-slate-800/80 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
                  <h3 class="font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center">
                    <span class="mr-2">📱</span>
                    Responsive
                  </h3>
                  <ul class="space-y-2 text-sm text-purple-700 dark:text-purple-300">
                    <li>• Mobile-first design</li>
                    <li>• Flexible breakpoints</li>
                    <li>• Touch-friendly targets</li>
                    <li>• Adaptive positioning</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarDemoComponent {
  private readonly platformId = inject(PLATFORM_ID);
  lastAction = signal<string>('');

  constructor() {
    // Add structured data for SEO
    if (isPlatformBrowser(this.platformId)) {
      this.addStructuredData();
    }
  }

  handleAction(action: string) {
    this.lastAction.set(action);

    // Announce to screen readers
    if (isPlatformBrowser(this.platformId)) {
      this.announceToScreenReader(`Action executed: ${action}`);
    }

    // Clear the action after 5 seconds
    setTimeout(() => {
      this.lastAction.set('');
    }, 5000);
  }

  private announceToScreenReader(message: string) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  private addStructuredData() {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Angular MenuBar Component",
      "description": "Professional, accessible MenuBar component with keyboard navigation, submenus, and WCAG 2.1 AA compliance. Mobile-first responsive design for Angular applications.",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Cross-platform",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Organization",
        "name": "Angular SuperUI"
      },
      "featureList": [
        "Keyboard Navigation Support",
        "WCAG 2.1 AA Accessibility Compliance",
        "Mobile-First Responsive Design",
        "Screen Reader Compatible",
        "Touch-Friendly Interface",
        "Multi-level Submenus",
        "Keyboard Shortcuts Display",
        "Dark/Light Mode Support"
      ],
      "screenshot": "https://angular-superui.com/menubar-demo-screenshot.png",
      "softwareVersion": "1.0.0",
      "dateModified": new Date().toISOString(),
      "browserRequirements": "Requires JavaScript. Recommended: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
}
