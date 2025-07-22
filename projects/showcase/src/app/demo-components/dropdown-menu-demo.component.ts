import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@lib/dropdown-menu';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-dropdown-menu-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel
  ],
  template: `
    <!-- Epic Background with Floating Elements -->
    <div class="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0">
        <!-- Floating Orbs -->
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

        <!-- Grid Pattern -->
        <div class="absolute inset-0 opacity-30"
             style="background-image: url('data:image/svg+xml;utf8,<svg width=&quot;60&quot; height=&quot;60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><defs><pattern id=&quot;grid&quot; width=&quot;60&quot; height=&quot;60&quot; patternUnits=&quot;userSpaceOnUse&quot;><path d=&quot;M 60 0 L 0 0 0 60&quot; fill=&quot;none&quot; stroke=&quot;rgba(255,255,255,0.05)&quot; stroke-width=&quot;1&quot;/></pattern></defs><rect width=&quot;100%&quot; height=&quot;100%&quot; fill=&quot;url(%23grid)&quot;/></svg>')"></div>
      </div>

      <!-- Main Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">

        <!-- Hero Section with Glassmorphism -->
        <div class="text-center mb-20">
          <!-- Announcement Badge -->
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8 hover:bg-white/15 transition-all duration-300">
            <span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            NEW: Advanced CDK Overlay Integration
          </div>

          <!-- Main Heading -->
          <h1 class="text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-200 mb-6 leading-tight">
            Dropdown
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
              Menu
            </span>
          </h1>

          <!-- Subtitle -->
          <p class="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
            Professional dropdown menus with <span class="text-cyan-300 font-semibold">CDK Overlay</span>, 
            <span class="text-blue-300 font-semibold">global state management</span>, and 
            <span class="text-purple-300 font-semibold">full accessibility</span> support
          </p>

          <!-- Feature Pills -->
          <div class="flex flex-wrap justify-center gap-3 mb-12">
            <span class="px-4 py-2 bg-blue-500/20 text-blue-200 rounded-full text-sm font-medium border border-blue-400/30">
              🎯 CDK Overlay
            </span>
            <span class="px-4 py-2 bg-purple-500/20 text-purple-200 rounded-full text-sm font-medium border border-purple-400/30">
              🌐 Global Service
            </span>
            <span class="px-4 py-2 bg-green-500/20 text-green-200 rounded-full text-sm font-medium border border-green-400/30">
              ♿ Accessibility
            </span>
            <span class="px-4 py-2 bg-cyan-500/20 text-cyan-200 rounded-full text-sm font-medium border border-cyan-400/30">
              ⌨️ Keyboard Nav
            </span>
            <span class="px-4 py-2 bg-orange-500/20 text-orange-200 rounded-full text-sm font-medium border border-orange-400/30">
              🎨 Custom Positioning
            </span>
          </div>

          <!-- GitHub Link -->
          <div class="flex justify-center">
            <a href="https://github.com/bhaimicrosoft/angular-superui" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 group">
              <svg class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </div>
        </div>

        <!-- Interactive Demo Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">

          <!-- Basic Dropdown Examples Card -->
          <div class="group relative">
            <!-- Glassmorphism Card -->
            <div class="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <!-- Card Header -->
              <div class="flex items-center mb-8">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white mb-1">Basic Examples</h3>
                  <p class="text-white/70">Standard dropdown patterns</p>
                </div>
              </div>

              <!-- Basic Dropdown Examples -->
              <div class="space-y-6">
                <!-- Simple Dropdown -->
                <div class="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <h4 class="text-white font-semibold mb-3">Simple Menu</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <button class="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                        </svg>
                        Options
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        [itemLabel]="'Edit Profile'"
                        [itemIcon]="'👤'"
                        (select)="onSimpleAction('profile')"
                      />
                      <DropdownMenuItem
                        [itemLabel]="'View Settings'"
                        [itemIcon]="'⚙️'"
                        (select)="onSimpleAction('settings')"
                      />
                      <DropdownMenuSeparator/>
                      <DropdownMenuItem
                        [itemLabel]="'Sign Out'"
                        [itemIcon]="'🚪'"
                        [itemDanger]="true"
                        (select)="onSimpleAction('signout')"
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <!-- Dropdown with Keyboard Shortcuts -->
                <div class="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <h4 class="text-white font-semibold mb-3">With Shortcuts</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <button class="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                        File Menu
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        [itemLabel]="'New File'"
                        [itemShortcut]="'Ctrl+N'"
                        [itemIcon]="'✨'"
                        (select)="onFileAction('new')"
                      />
                      <DropdownMenuItem
                        [itemLabel]="'Open File'"
                        [itemShortcut]="'Ctrl+O'"
                        [itemIcon]="'📁'"
                        (select)="onFileAction('open')"
                      />
                      <DropdownMenuItem
                        [itemLabel]="'Save'"
                        [itemShortcut]="'Ctrl+S'"
                        [itemIcon]="'💾'"
                        (select)="onFileAction('save')"
                      />
                      <DropdownMenuSeparator/>
                      <DropdownMenuItem
                        [itemLabel]="'Recent Files'"
                        [itemIcon]="'📄'"
                        (select)="onFileAction('recent')"
                      />
                      <DropdownMenuSeparator/>
                      <DropdownMenuItem
                        [itemLabel]="'Exit'"
                        [itemShortcut]="'Alt+F4'"
                        [itemIcon]="'❌'"
                        [itemDanger]="true"
                        (select)="onFileAction('exit')"
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>

          <!-- Advanced Dropdown Examples Card -->
          <div class="group relative">
            <!-- Glassmorphism Card -->
            <div class="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <!-- Card Header -->
              <div class="flex items-center mb-8">
                <div class="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white mb-1">Advanced Features</h3>
                  <p class="text-white/70">Complex dropdown patterns</p>
                </div>
              </div>

              <!-- Advanced Dropdown Examples -->
              <div class="space-y-6">
                <!-- User Profile Dropdown -->
                <div class="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <h4 class="text-white font-semibold mb-3">User Profile</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <button class="flex items-center space-x-3 p-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-xl transition-all duration-300 transform hover:scale-105">
                        <img src="/me.jpg" alt="User Avatar" class="w-8 h-8 rounded-lg object-cover">
                        <span class="text-white font-medium">John Doe</span>
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuItem
                        [itemLabel]="'Profile'"
                        [itemIcon]="'👤'"
                        (select)="onUserAction('profile')"
                      />
                      <DropdownMenuItem
                        [itemLabel]="'Billing'"
                        [itemIcon]="'💳'"
                        (select)="onUserAction('billing')"
                      />
                      <DropdownMenuItem
                        [itemLabel]="'Team'"
                        [itemIcon]="'👥'"
                        (select)="onUserAction('team')"
                      />
                      <DropdownMenuSeparator/>
                      <DropdownMenuLabel>Support</DropdownMenuLabel>
                      <DropdownMenuItem
                        [itemLabel]="'Documentation'"
                        [itemIcon]="'📚'"
                        [itemHref]="'https://angular-superui.com/docs'"
                        [itemTarget]="'_blank'"
                      />
                      <DropdownMenuItem
                        [itemLabel]="'Contact Support'"
                        [itemIcon]="'🎧'"
                        (select)="onUserAction('support')"
                      />
                      <DropdownMenuSeparator/>
                      <DropdownMenuItem
                        [itemLabel]="'Log out'"
                        [itemIcon]="'🚪'"
                        [itemShortcut]="'⌘Q'"
                        [itemDanger]="true"
                        (select)="onUserAction('logout')"
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <!-- Multi-Direction Dropdown -->
                <div class="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <h4 class="text-white font-semibold mb-3">Direction Control</h4>
                  <div class="grid grid-cols-2 gap-3">
                    <!-- Up Direction -->
                    <DropdownMenu>
                      <DropdownMenuTrigger [direction]="'up'">
                        <button class="w-full px-3 py-2 bg-orange-600 hover:bg-orange-500 text-white text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 15l5-5 5 5"></path>
                          </svg>
                          Up
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem [itemLabel]="'Option 1'" [itemIcon]="'1️⃣'" (select)="onDirectionAction('up', 'option1')" />
                        <DropdownMenuItem [itemLabel]="'Option 2'" [itemIcon]="'2️⃣'" (select)="onDirectionAction('up', 'option2')" />
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <!-- Down Direction -->
                    <DropdownMenu>
                      <DropdownMenuTrigger [direction]="'down'">
                        <button class="w-full px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9l-5 5-5-5"></path>
                          </svg>
                          Down
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem [itemLabel]="'Option A'" [itemIcon]="'🅰️'" (select)="onDirectionAction('down', 'optionA')" />
                        <DropdownMenuItem [itemLabel]="'Option B'" [itemIcon]="'🅱️'" (select)="onDirectionAction('down', 'optionB')" />
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <!-- Left Direction -->
                    <DropdownMenu>
                      <DropdownMenuTrigger [direction]="'left'">
                        <button class="w-full px-3 py-2 bg-green-600 hover:bg-green-500 text-white text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                          </svg>
                          Left
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem [itemLabel]="'Left Option'" [itemIcon]="'⬅️'" (select)="onDirectionAction('left', 'leftOption')" />
                        <DropdownMenuItem [itemLabel]="'Another Left'" [itemIcon]="'↩️'" (select)="onDirectionAction('left', 'anotherLeft')" />
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <!-- Right Direction -->
                    <DropdownMenu>
                      <DropdownMenuTrigger [direction]="'right'">
                        <button class="w-full px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                          Right
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem [itemLabel]="'Right Option'" [itemIcon]="'➡️'" (select)="onDirectionAction('right', 'rightOption')" />
                        <DropdownMenuItem [itemLabel]="'Another Right'" [itemIcon]="'↪️'" (select)="onDirectionAction('right', 'anotherRight')" />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Showcase Section -->
        <div class="mb-20">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 mb-4">
              Powerful Features
            </h2>
            <p class="text-xl text-white/70 max-w-2xl mx-auto">
              Built with modern Angular patterns and best practices
            </p>
          </div>

          <!-- Features Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- CDK Overlay Feature -->
            <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">CDK Overlay</h3>
              <p class="text-white/70">
                Built on Angular CDK Overlay for robust positioning, backdrop management, and portal rendering.
              </p>
            </div>

            <!-- Global Service Feature -->
            <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Global State</h3>
              <p class="text-white/70">
                Centralized service management ensures only one dropdown is open at a time across your entire app.
              </p>
            </div>

            <!-- Accessibility Feature -->
            <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Accessibility</h3>
              <p class="text-white/70">
                Full WCAG compliance with ARIA attributes, keyboard navigation, and focus management.
              </p>
            </div>

            <!-- Positioning Feature -->
            <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Smart Positioning</h3>
              <p class="text-white/70">
                Four-directional positioning (up, down, left, right) with automatic viewport collision detection.
              </p>
            </div>

            <!-- Keyboard Navigation Feature -->
            <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Keyboard Navigation</h3>
              <p class="text-white/70">
                Complete keyboard support with arrow keys, Enter, Space, Escape, Home, and End keys.
              </p>
            </div>

            <!-- TypeScript Feature -->
            <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">TypeScript First</h3>
              <p class="text-white/70">
                Fully typed with Angular signals, providing excellent IntelliSense and compile-time safety.
              </p>
            </div>
          </div>
        </div>

        <!-- Status Section -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-6 py-3 bg-green-500/20 border border-green-400/30 rounded-full text-green-200 font-medium">
            <span class="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></span>
            Status: {{ lastAction() || 'Ready for interaction' }}
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center text-white/60">
          <p class="mb-4">
            Built with ❤️ using Angular {{ angularVersion }} & TailwindCSS
          </p>
          <p class="text-sm">
            Part of the Angular SuperUI component library
          </p>
        </div>

      </div>
    </div>
  `,
  styles: [`
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    
    .animation-delay-1000 {
      animation-delay: 1s;
    }
    
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    
    .floating {
      animation: float 6s ease-in-out infinite;
    }
  `]
})
export class DropdownMenuDemoComponent implements OnInit {
  private readonly seoService = inject(SEOService);
  
  // Component state
  readonly lastAction = signal<string>('');
  readonly angularVersion = '18';

  ngOnInit(): void {
    this.setupSEO();
  }

  private setupSEO(): void {
    this.seoService.updateSEO({
      title: 'Dropdown Menu - Angular SuperUI Components',
      description: 'Professional Angular dropdown menu component with CDK Overlay integration, global state management, accessibility support, and keyboard navigation. Features four-directional positioning and customizable styling.',
      keywords: 'Angular dropdown menu, CDK Overlay dropdown, Angular components, accessible dropdown, TypeScript dropdown, Angular SuperUI, dropdown positioning, keyboard navigation, Angular signals, dropdown service'
    });
  }

  // Event Handlers
  onSimpleAction(action: string): void {
    this.lastAction.set(`Simple action: ${action}`);
    console.log('Simple action:', action);
  }

  onFileAction(action: string): void {
    this.lastAction.set(`File action: ${action}`);
    console.log('File action:', action);
  }

  onUserAction(action: string): void {
    this.lastAction.set(`User action: ${action}`);
    console.log('User action:', action);
  }

  onDirectionAction(direction: string, action: string): void {
    this.lastAction.set(`${direction} direction: ${action}`);
    console.log('Direction action:', { direction, action });
  }
}
