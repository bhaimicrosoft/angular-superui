import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenu, IContextMenuItem } from '@lib/context-menu';
import { SEOService } from '../services/seo.service';
import {
  LucideAngularModule,
  CopyIcon,
  ScissorsIcon,
  ClipboardIcon,
  FileIcon,
  FolderIcon,
  RefreshCwIcon,
  SettingsIcon,
  SearchIcon,
  TrashIcon,
  EditIcon,
  ShareIcon,
  DownloadIcon,
  StarIcon,
  MoreHorizontalIcon,
  ZapIcon,
  ShieldIcon,
  HeartIcon,
  CodeIcon,
  SparklesIcon,
  MousePointerClickIcon,
  MenuIcon
} from 'lucide-angular';

@Component({
  selector: 'app-context-menu-demo',
  standalone: true,
  imports: [CommonModule, ContextMenu, LucideAngularModule],
  template: `
    <!-- Elegant Context Menu Gallery -->
    <div class="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 relative overflow-hidden">

      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-20 h-20 opacity-10">
          <div class="w-full h-full border-4 border-blue-400 rounded-full animate-ping"></div>
        </div>
        <div class="absolute top-40 right-20 w-16 h-16 opacity-10">
          <div class="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-400 transform rotate-45 animate-pulse"></div>
        </div>
        <div class="absolute bottom-32 left-1/4 w-12 h-12 opacity-10">
          <div class="w-full h-full border-3 border-purple-400 transform rotate-12 animate-bounce"></div>
        </div>
      </div>

      <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">

        <!-- Header Section -->
        <div class="text-center mb-20">
          <div class="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100/80 to-indigo-100/80 dark:from-blue-900/40 dark:to-indigo-900/40 border-2 border-blue-200/60 dark:border-blue-700/60 text-blue-800 dark:text-blue-200 text-sm font-medium mb-8 backdrop-blur-sm shadow-lg">
            <lucide-angular [img]="MousePointerClickIcon" class="w-5 h-5 mr-3"></lucide-angular>
            ✨ Right-Click Interactive Menus ✨
          </div>

          <h1 class="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            <span class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
              Context Menu
            </span>
            <br>
            <span class="text-4xl sm:text-5xl lg:text-6xl text-slate-700 dark:text-slate-300 font-serif italic">
              Showcase
            </span>
          </h1>

          <p class="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed mb-16 font-light">
            "The best interface is the one that disappears when you need it to act, and appears exactly when you need it" — Anonymous
            <br>
            <span class="text-lg text-blue-700 dark:text-blue-300 font-medium">
              Discover intuitive right-click menus with smart positioning and smooth interactions
            </span>
          </p>

          <!-- Feature Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            <div class="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-200/60 dark:border-blue-700/60 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:text-white mb-2">∞</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Unlimited Actions</div>
              <div class="w-8 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
            </div>

            <div class="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-indigo-200/60 dark:border-indigo-700/60 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:text-white mb-2">⚡</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Smart Positioning</div>
              <div class="w-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
            </div>

            <div class="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200/60 dark:border-purple-700/60 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:text-white mb-2">♿</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Accessible</div>
              <div class="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
            </div>

            <div class="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200/60 dark:border-pink-700/60 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div class="text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent dark:text-white mb-2">🎯</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Context Aware</div>
              <div class="w-8 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
            </div>
          </div>

          <!-- Quick Instructions -->
          <div class="bg-gradient-to-r from-amber-50/80 to-orange-50/80 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-600/50 max-w-3xl mx-auto">
            <div class="flex items-center justify-center mb-3">
              <lucide-angular [img]="ZapIcon" class="w-6 h-6 text-amber-600 dark:text-amber-400 mr-2"></lucide-angular>
              <h3 class="text-lg font-bold text-amber-800 dark:text-amber-200">Quick Start</h3>
            </div>
            <p class="text-amber-700 dark:text-amber-300 text-center">
              Right-click anywhere in the demo areas below to explore different context menus.
              Each area demonstrates unique features and use cases.
            </p>
          </div>
        </div>

        <!-- Demo Sections -->
        <div class="space-y-16">

          <!-- Basic Examples Section -->
          <section>
            <div class="text-center mb-12">
              <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
                🚀 Getting Started
              </h2>
              <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
                Simple context menus for common actions
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <!-- Basic Text Actions -->
              <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <lucide-angular [img]="EditIcon" class="w-6 h-6 text-white"></lucide-angular>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">Text Editing</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Standard text operations</p>
                  </div>
                </div>

                <ContextMenu [items]="textMenuItems">
                  <div class="group p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-2 border-dashed border-blue-300/50 dark:border-blue-600/50 cursor-context-menu hover:border-blue-400/70 dark:hover:border-blue-500/70 transition-all duration-300 hover:shadow-lg">
                    <div class="text-center">
                      <lucide-angular [img]="MousePointerClickIcon" class="w-12 h-12 text-blue-500 dark:text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"></lucide-angular>
                      <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Right-click this text area</h4>
                      <p class="text-gray-600 dark:text-gray-400 mb-4">
                        Experience common text editing operations like cut, copy, paste with keyboard shortcuts.
                      </p>
                      <div class="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        📝 Contains: Cut, Copy, Paste, Select All, Find
                      </div>
                    </div>
                  </div>
                </ContextMenu>
              </div>

              <!-- File Operations -->
              <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <lucide-angular [img]="FolderIcon" class="w-6 h-6 text-white"></lucide-angular>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">File Manager</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">File system operations</p>
                  </div>
                </div>

                <ContextMenu [items]="fileMenuItems">
                  <div class="group p-8 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl border-2 border-dashed border-emerald-300/50 dark:border-emerald-600/50 cursor-context-menu hover:border-emerald-400/70 dark:hover:border-emerald-500/70 transition-all duration-300 hover:shadow-lg">
                    <div class="text-center">
                      <lucide-angular [img]="FolderIcon" class="w-12 h-12 text-emerald-500 dark:text-emerald-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"></lucide-angular>
                      <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">File Browser Context</h4>
                      <p class="text-gray-600 dark:text-gray-400 mb-4">
                        Simulate file browser operations with creation, refresh, and properties options.
                      </p>
                      <div class="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                        📁 Contains: New File, New Folder, Refresh, Properties
                      </div>
                    </div>
                  </div>
                </ContextMenu>
              </div>
            </div>
          </section>

          <!-- Advanced Features Section -->
          <section>
            <div class="text-center mb-12">
              <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
                ⚡ Advanced Features
              </h2>
              <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
                Sophisticated context menus with disabled states and complex actions
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <!-- Document Actions with Disabled Items -->
              <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <lucide-angular [img]="FileIcon" class="w-6 h-6 text-white"></lucide-angular>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">Document Actions</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">With disabled states</p>
                  </div>
                </div>

                <ContextMenu [items]="documentMenuItems">
                  <div class="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-dashed border-purple-300/50 dark:border-purple-600/50 cursor-context-menu hover:border-purple-400/70 dark:hover:border-purple-500/70 transition-all duration-300 hover:shadow-lg">
                    <div class="text-center">
                      <lucide-angular [img]="FileIcon" class="w-12 h-12 text-purple-500 dark:text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"></lucide-angular>
                      <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Document Context</h4>
                      <p class="text-gray-600 dark:text-gray-400 mb-4">
                        Shows context menu with some disabled options to demonstrate conditional availability.
                      </p>
                      <div class="text-sm text-purple-600 dark:text-purple-400 font-medium">
                        📄 Contains: Available & Disabled actions
                      </div>
                    </div>
                  </div>
                </ContextMenu>
              </div>

              <!-- Media Player Controls -->
              <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <lucide-angular [img]="SparklesIcon" class="w-6 h-6 text-white"></lucide-angular>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">Media Player</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Rich media controls</p>
                  </div>
                </div>

                <ContextMenu [items]="mediaMenuItems">
                  <div class="group p-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border-2 border-dashed border-orange-300/50 dark:border-orange-600/50 cursor-context-menu hover:border-orange-400/70 dark:hover:border-orange-500/70 transition-all duration-300 hover:shadow-lg">
                    <div class="text-center">
                      <lucide-angular [img]="SparklesIcon" class="w-12 h-12 text-orange-500 dark:text-orange-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"></lucide-angular>
                      <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Media Player Controls</h4>
                      <p class="text-gray-600 dark:text-gray-400 mb-4">
                        Rich context menu for media operations including sharing, downloads, and favorites.
                      </p>
                      <div class="text-sm text-orange-600 dark:text-orange-400 font-medium">
                        🎵 Contains: Share, Download, Favorite, Settings
                      </div>
                    </div>
                  </div>
                </ContextMenu>
              </div>
            </div>
          </section>

          <!-- Real-world Examples Section -->
          <section>
            <div class="text-center mb-12">
              <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
                🎨 Real-world Examples
              </h2>
              <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
                Practical implementations for modern applications
              </p>
            </div>

            <!-- Card Grid with Different Context Menus -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

              <!-- User Profile Card -->
              <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
                <ContextMenu [items]="userMenuItems">
                  <div class="p-6 cursor-context-menu">
                    <div class="flex items-center space-x-4 mb-4">
                      <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        SJ
                      </div>
                      <div>
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white">Sarah Johnson</h3>
                        <p class="text-gray-600 dark:text-gray-400">Senior Developer</p>
                      </div>
                    </div>
                    <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p>📧 sarah&#64;example.com</p>
                      <p>📱 +1 (555) 123-4567</p>
                      <p>🌍 San Francisco, CA</p>
                    </div>
                    <div class="mt-4 text-xs text-blue-600 dark:text-blue-400 font-medium">
                      Right-click for user actions →
                    </div>
                  </div>
                </ContextMenu>
              </div>

              <!-- Project Card -->
              <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
                <ContextMenu [items]="projectMenuItems">
                  <div class="p-6 cursor-context-menu">
                    <div class="flex items-center space-x-3 mb-4">
                      <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <lucide-angular [img]="CodeIcon" class="w-6 h-6 text-white"></lucide-angular>
                      </div>
                      <div>
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white">Angular SuperUI</h3>
                        <p class="text-gray-600 dark:text-gray-400">Component Library</p>
                      </div>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Modern Angular component library with 50+ components and full TypeScript support.
                    </p>
                    <div class="flex flex-wrap gap-2 mb-4">
                      <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-lg text-xs">Angular</span>
                      <span class="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 rounded-lg text-xs">TypeScript</span>
                      <span class="px-2 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 rounded-lg text-xs">UI</span>
                    </div>
                    <div class="text-xs text-green-600 dark:text-green-400 font-medium">
                      Right-click for project actions →
                    </div>
                  </div>
                </ContextMenu>
              </div>

              <!-- Settings Panel -->
              <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
                <ContextMenu [items]="settingsMenuItems">
                  <div class="p-6 cursor-context-menu">
                    <div class="flex items-center space-x-3 mb-4">
                      <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                        <lucide-angular [img]="SettingsIcon" class="w-6 h-6 text-white"></lucide-angular>
                      </div>
                      <div>
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white">System Settings</h3>
                        <p class="text-gray-600 dark:text-gray-400">Configuration Panel</p>
                      </div>
                    </div>
                    <div class="space-y-3">
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700 dark:text-gray-300">Notifications</span>
                        <div class="w-10 h-6 bg-green-500 rounded-full relative">
                          <div class="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
                        <div class="w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative">
                          <div class="w-4 h-4 bg-white rounded-full absolute top-1 left-1 dark:left-5 transition-all duration-300"></div>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700 dark:text-gray-300">Auto-save</span>
                        <div class="w-10 h-6 bg-green-500 rounded-full relative">
                          <div class="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-4 text-xs text-purple-600 dark:text-purple-400 font-medium">
                      Right-click for settings menu →
                    </div>
                  </div>
                </ContextMenu>
              </div>
            </div>
          </section>

          <!-- Multiple Context Menus Demo -->
          <section>
            <div class="text-center mb-12">
              <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
                🔄 Smart Context Switching
              </h2>
              <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
                Seamless switching between different context menus
              </p>
            </div>

            <div class="max-w-6xl mx-auto">
              <div class="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 lg:p-12 border border-slate-700/50 shadow-2xl">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                  <!-- Area 1: Editor Context -->
                  <ContextMenu [items]="editorMenuItems">
                    <div class="group p-6 bg-slate-800/50 rounded-2xl border border-slate-600/50 cursor-context-menu hover:border-slate-500/70 transition-all duration-300">
                      <div class="text-center">
                        <lucide-angular [img]="CodeIcon" class="w-10 h-10 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"></lucide-angular>
                        <h3 class="text-lg font-bold text-white mb-2">Code Editor</h3>
                        <p class="text-slate-300 text-sm mb-3">
                          IDE-style context menu with code-specific actions.
                        </p>
                        <div class="text-xs text-blue-400 font-medium">
                          Right-click for editor menu
                        </div>
                      </div>
                    </div>
                  </ContextMenu>

                  <!-- Area 2: Browser Context -->
                  <ContextMenu [items]="browserMenuItems">
                    <div class="group p-6 bg-slate-800/50 rounded-2xl border border-slate-600/50 cursor-context-menu hover:border-slate-500/70 transition-all duration-300">
                      <div class="text-center">
                        <lucide-angular [img]="SearchIcon" class="w-10 h-10 text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"></lucide-angular>
                        <h3 class="text-lg font-bold text-white mb-2">Web Browser</h3>
                        <p class="text-slate-300 text-sm mb-3">
                          Browser-style context menu with web navigation actions.
                        </p>
                        <div class="text-xs text-green-400 font-medium">
                          Right-click for browser menu
                        </div>
                      </div>
                    </div>
                  </ContextMenu>

                  <!-- Area 3: Game Context -->
                  <ContextMenu [items]="gameMenuItems">
                    <div class="group p-6 bg-slate-800/50 rounded-2xl border border-slate-600/50 cursor-context-menu hover:border-slate-500/70 transition-all duration-300">
                      <div class="text-center">
                        <lucide-angular [img]="ZapIcon" class="w-10 h-10 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"></lucide-angular>
                        <h3 class="text-lg font-bold text-white mb-2">Game Menu</h3>
                        <p class="text-slate-300 text-sm mb-3">
                          Gaming context menu with player actions and game controls.
                        </p>
                        <div class="text-xs text-purple-400 font-medium">
                          Right-click for game menu
                        </div>
                      </div>
                    </div>
                  </ContextMenu>

                </div>

                <div class="mt-8 text-center">
                  <p class="text-slate-300 text-lg">
                    Try right-clicking different areas above to see how context menus automatically switch
                  </p>
                  <p class="text-slate-500 text-sm mt-2">
                    Only one menu can be open at a time - perfect for complex applications
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Implementation Showcase -->
          <section class="mb-20">
            <div class="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 lg:p-12 border border-slate-700/50 shadow-2xl max-w-6xl mx-auto">
              <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-white mb-6 flex items-center justify-center">
                  <lucide-angular [img]="CodeIcon" class="w-10 h-10 mr-4"></lucide-angular>
                  Clean Implementation
                </h2>
                <p class="text-xl text-slate-300 max-w-3xl mx-auto">
                  Simple, elegant code that creates powerful context menus
                </p>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Basic Usage -->
                <div class="bg-slate-800/50 rounded-2xl p-6 border border-slate-600/50">
                  <h3 class="text-xl font-bold text-white mb-4 flex items-center">
                    <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    Basic Usage
                  </h3>
                  <div class="bg-slate-900/80 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                    <div class="text-slate-400 mb-2">// Simple context menu</div>
                    <div class="text-blue-300">&lt;ContextMenu [items]="menuItems"&gt;</div>
                    <div class="text-slate-300 ml-4">&lt;div class="contextual-area"&gt;</div>
                    <div class="text-slate-300 ml-8">Right-click me!</div>
                    <div class="text-slate-300 ml-4">&lt;/div&gt;</div>
                    <div class="text-blue-300">&lt;/ContextMenu&gt;</div>
                  </div>
                </div>

              </div>

              <!-- Features Grid -->
              <div class="mt-8 bg-slate-800/50 rounded-2xl p-6 border border-slate-600/50">
                <h3 class="text-xl font-bold text-white mb-4 flex items-center">
                  <span class="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                  Key Features
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div class="bg-slate-900/80 rounded-xl p-4">
                    <div class="text-green-300 mb-2">🎯 Smart Positioning</div>
                    <div class="text-slate-300">CDK Overlay system</div>
                    <div class="text-slate-300">Viewport awareness</div>
                  </div>
                  <div class="bg-slate-900/80 rounded-xl p-4">
                    <div class="text-blue-300 mb-2">⚡ Signal-based</div>
                    <div class="text-slate-300">Angular signals</div>
                    <div class="text-slate-300">Reactive state</div>
                  </div>
                  <div class="bg-slate-900/80 rounded-xl p-4">
                    <div class="text-purple-300 mb-2">♿ Accessible</div>
                    <div class="text-slate-300">ARIA attributes</div>
                    <div class="text-slate-300">Keyboard support</div>
                  </div>
                  <div class="bg-slate-900/80 rounded-xl p-4">
                    <div class="text-orange-300 mb-2">🔧 Flexible</div>
                    <div class="text-slate-300">Custom actions</div>
                    <div class="text-slate-300">Separators & icons</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Documentation Link -->
          <section class="mb-20">
            <div class="max-w-4xl mx-auto px-4">
              <div class="bg-gradient-to-r from-slate-800/90 via-slate-700/90 to-slate-800/90 dark:from-slate-800/50 dark:via-slate-700/50 dark:to-slate-800/50 relative overflow-hidden py-12 rounded-2xl border border-slate-600/30 dark:border-slate-600/20">
                <!-- Subtle Background Pattern -->
                <div class="absolute inset-0 opacity-5">
                  <div class="absolute top-4 left-10 w-16 h-16 border border-white/20 rounded-full"></div>
                  <div class="absolute bottom-4 right-10 w-12 h-12 bg-white/10 rounded-lg transform rotate-45"></div>
                  <div class="absolute top-1/2 left-1/4 w-8 h-8 border border-white/15 rounded-full"></div>
                </div>

                <div class="relative z-10 text-center px-6">
                  <h2 class="text-3xl sm:text-4xl font-bold text-white/95 dark:text-white/90 mb-4 leading-tight">
                    Ready to Integrate Context Menus?
                  </h2>

                  <p class="text-lg text-white/80 dark:text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
                    Experience the most comprehensive context menu component for Angular with
                    smart positioning, accessibility, and seamless interactions.
                  </p>

                  <!-- Documentation Link Button -->
                  <a
                    href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/context-menu.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group inline-flex items-center px-6 py-3 bg-white/95 dark:bg-white/90 text-slate-700 dark:text-slate-800 hover:text-slate-800 dark:hover:text-slate-900 font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-white dark:hover:bg-white"
                  >
                    <lucide-angular [img]="CodeIcon" class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300"></lucide-angular>
                    View Documentation
                    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>

    <!-- Custom Animations -->
    <style>
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      .animation-delay-1000 {
        animation-delay: 1s;
      }
      .animation-delay-2000 {
        animation-delay: 2s;
      }
    </style>
  `,
})
export class ContextMenuDemo {
  private seoService = inject(SEOService);

  // Text editing menu items
  textMenuItems: IContextMenuItem[] = [
    {
      label: 'Cut',
      action: (item) => this.showAction('Cut text'),
      shortcut: 'Ctrl+X'
    },
    {
      label: 'Copy',
      action: (item) => this.showAction('Copy text'),
      shortcut: 'Ctrl+C'
    },
    {
      label: 'Paste',
      action: (item) => this.showAction('Paste text'),
      shortcut: 'Ctrl+V'
    },
    { label: '', separator: true },
    {
      label: 'Select All',
      action: (item) => this.showAction('Select all text'),
      shortcut: 'Ctrl+A'
    },
    {
      label: 'Find',
      action: (item) => this.showAction('Open find dialog'),
      shortcut: 'Ctrl+F'
    }
  ];

  // File operations menu items
  fileMenuItems: IContextMenuItem[] = [
    {
      label: 'New File',
      action: (item) => this.showAction('Create new file')
    },
    {
      label: 'New Folder',
      action: (item) => this.showAction('Create new folder')
    },
    { label: '', separator: true },
    {
      label: 'Refresh',
      action: (item) => this.showAction('Refresh view'),
      shortcut: 'F5'
    },
    { label: '', separator: true },
    {
      label: 'Properties',
      action: (item) => this.showAction('Show properties')
    }
  ];

  // Document menu items with disabled states
  documentMenuItems: IContextMenuItem[] = [
    {
      label: 'Open Document',
      action: (item) => this.showAction('Open document')
    },
    {
      label: 'Save Document',
      action: (item) => this.showAction('Save document'),
      shortcut: 'Ctrl+S'
    },
    {
      label: 'Export as PDF',
      action: (item) => this.showAction('Export to PDF')
    },
    { label: '', separator: true },
    {
      label: 'Print Document',
      action: (item) => this.showAction('This action is disabled'),
      disabled: true,
      shortcut: 'Ctrl+P'
    },
    {
      label: 'Email Document',
      disabled: true
    },
    { label: '', separator: true },
    {
      label: 'Document Info',
      action: (item) => this.showAction('Show document information')
    }
  ];

  // Media player menu items
  mediaMenuItems: IContextMenuItem[] = [
    {
      label: 'Share Media',
      action: (item) => this.showAction('Share media file')
    },
    {
      label: 'Download',
      action: (item) => this.showAction('Download media'),
      shortcut: 'Ctrl+D'
    },
    {
      label: 'Add to Favorites',
      action: (item) => this.showAction('Add to favorites')
    },
    { label: '', separator: true },
    {
      label: 'Playback Speed',
      action: (item) => this.showAction('Adjust playback speed')
    },
    {
      label: 'Audio Settings',
      action: (item) => this.showAction('Configure audio')
    },
    { label: '', separator: true },
    {
      label: 'Report Issue',
      action: (item) => this.showAction('Report media issue')
    }
  ];

  // User profile menu items
  userMenuItems: IContextMenuItem[] = [
    {
      label: 'View Profile',
      action: (item) => this.showAction('View user profile')
    },
    {
      label: 'Send Message',
      action: (item) => this.showAction('Send message to user')
    },
    {
      label: 'Add to Team',
      action: (item) => this.showAction('Add user to team')
    },
    { label: '', separator: true },
    {
      label: 'Block User',
      action: (item) => this.showAction('Block user')
    }
  ];

  // Project menu items
  projectMenuItems: IContextMenuItem[] = [
    {
      label: 'Open Project',
      action: (item) => this.showAction('Open project')
    },
    {
      label: 'Clone Repository',
      action: (item) => this.showAction('Clone repository')
    },
    {
      label: 'View on GitHub',
      action: (item) => this.showAction('View on GitHub')
    },
    { label: '', separator: true },
    {
      label: 'Build Project',
      action: (item) => this.showAction('Build project')
    },
    {
      label: 'Run Tests',
      action: (item) => this.showAction('Run project tests')
    },
    { label: '', separator: true },
    {
      label: 'Project Settings',
      action: (item) => this.showAction('Open project settings')
    }
  ];

  // Settings menu items
  settingsMenuItems: IContextMenuItem[] = [
    {
      label: 'General Settings',
      action: (item) => this.showAction('Open general settings')
    },
    {
      label: 'Privacy Settings',
      action: (item) => this.showAction('Open privacy settings')
    },
    {
      label: 'Notification Settings',
      action: (item) => this.showAction('Configure notifications')
    },
    { label: '', separator: true },
    {
      label: 'Export Settings',
      action: (item) => this.showAction('Export configuration')
    },
    {
      label: 'Import Settings',
      action: (item) => this.showAction('Import configuration')
    },
    { label: '', separator: true },
    {
      label: 'Reset to Default',
      action: (item) => this.showAction('Reset to default settings')
    }
  ];

  // Editor context menu
  editorMenuItems: IContextMenuItem[] = [
    {
      label: 'Go to Definition',
      action: (item) => this.showAction('Go to definition'),
      shortcut: 'F12'
    },
    {
      label: 'Find References',
      action: (item) => this.showAction('Find references'),
      shortcut: 'Shift+F12'
    },
    {
      label: 'Rename Symbol',
      action: (item) => this.showAction('Rename symbol'),
      shortcut: 'F2'
    },
    { label: '', separator: true },
    {
      label: 'Format Document',
      action: (item) => this.showAction('Format document'),
      shortcut: 'Shift+Alt+F'
    },
    {
      label: 'Organize Imports',
      action: (item) => this.showAction('Organize imports')
    },
    { label: '', separator: true },
    {
      label: 'Add Comment',
      action: (item) => this.showAction('Add comment'),
      shortcut: 'Ctrl+/'
    }
  ];

  // Browser context menu
  browserMenuItems: IContextMenuItem[] = [
    {
      label: 'Back',
      action: (item) => this.showAction('Go back'),
      shortcut: 'Alt+←'
    },
    {
      label: 'Forward',
      action: (item) => this.showAction('Go forward'),
      shortcut: 'Alt+→'
    },
    {
      label: 'Reload',
      action: (item) => this.showAction('Reload page'),
      shortcut: 'Ctrl+R'
    },
    { label: '', separator: true },
    {
      label: 'Save Page As',
      action: (item) => this.showAction('Save page'),
      shortcut: 'Ctrl+S'
    },
    {
      label: 'Print Page',
      action: (item) => this.showAction('Print page'),
      shortcut: 'Ctrl+P'
    },
    { label: '', separator: true },
    {
      label: 'View Page Source',
      action: (item) => this.showAction('View source'),
      shortcut: 'Ctrl+U'
    },
    {
      label: 'Inspect Element',
      action: (item) => this.showAction('Inspect element'),
      shortcut: 'F12'
    }
  ];

  // Game context menu
  gameMenuItems: IContextMenuItem[] = [
    {
      label: 'Quick Save',
      action: (item) => this.showAction('Quick save game'),
      shortcut: 'F5'
    },
    {
      label: 'Quick Load',
      action: (item) => this.showAction('Quick load game'),
      shortcut: 'F9'
    },
    { label: '', separator: true },
    {
      label: 'Inventory',
      action: (item) => this.showAction('Open inventory'),
      shortcut: 'I'
    },
    {
      label: 'Character Stats',
      action: (item) => this.showAction('View character stats'),
      shortcut: 'C'
    },
    {
      label: 'Map',
      action: (item) => this.showAction('Open map'),
      shortcut: 'M'
    },
    { label: '', separator: true },
    {
      label: 'Game Settings',
      action: (item) => this.showAction('Open game settings'),
      shortcut: 'Esc'
    },
    {
      label: 'Exit to Menu',
      action: (item) => this.showAction('Exit to main menu')
    }
  ];

  // Lucide icons
  readonly CopyIcon = CopyIcon;
  readonly ScissorsIcon = ScissorsIcon;
  readonly ClipboardIcon = ClipboardIcon;
  readonly FileIcon = FileIcon;
  readonly FolderIcon = FolderIcon;
  readonly RefreshCwIcon = RefreshCwIcon;
  readonly SettingsIcon = SettingsIcon;
  readonly SearchIcon = SearchIcon;
  readonly TrashIcon = TrashIcon;
  readonly EditIcon = EditIcon;
  readonly ShareIcon = ShareIcon;
  readonly DownloadIcon = DownloadIcon;
  readonly StarIcon = StarIcon;
  readonly MoreHorizontalIcon = MoreHorizontalIcon;
  readonly ZapIcon = ZapIcon;
  readonly ShieldIcon = ShieldIcon;
  readonly HeartIcon = HeartIcon;
  readonly CodeIcon = CodeIcon;
  readonly SparklesIcon = SparklesIcon;
  readonly MousePointerClickIcon = MousePointerClickIcon;
  readonly MenuIcon = MenuIcon;

  constructor() {
    this.seoService.updateSEO({
      title: 'Context Menu Component - Interactive Showcase | Angular SuperUI',
      description: 'Discover powerful right-click context menus with smart positioning, accessibility support, and seamless interactions. Built with Angular Signals and CDK Overlay for optimal performance.',
      keywords: 'angular, context menu, right-click, menu, overlay, interaction, component library, ui components, accessibility, keyboard navigation'
    });
  }

  private showAction(action: string): void {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.textContent = `Action: ${action}`;
    notification.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300';
    document.body.appendChild(notification);

    // Remove after 2 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);

    console.log('Context Menu Action:', action);
  }
}
