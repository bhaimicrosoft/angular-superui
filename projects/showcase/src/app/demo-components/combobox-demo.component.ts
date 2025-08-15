import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Combobox, ComboboxOption } from '@lib/components/combobox';
import { SEOService } from '../services/seo.service';
import {
  LucideAngularModule,
  ChevronDownIcon,
  SearchIcon,
  UsersIcon,
  CodeIcon,
  DatabaseIcon,
  CloudIcon,
  SparklesIcon,
  CheckIcon,
  XIcon,
  RefreshCwIcon,
  AlertTriangleIcon,
  GlobeIcon,
  LayersIcon,
  SettingsIcon,
  BrainIcon,
  HeartIcon
} from 'lucide-angular';

@Component({
  selector: 'app-combobox-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, Combobox, LucideAngularModule],
  template: `
    <!-- Elegant Combobox Gallery -->
    <div class="min-h-screen w-full bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-950 relative overflow-hidden">

      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-20 h-20 opacity-10">
          <div class="w-full h-full border-4 border-indigo-400 rounded-full animate-ping"></div>
        </div>
        <div class="absolute top-40 right-20 w-16 h-16 opacity-10">
          <div class="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 transform rotate-45 animate-pulse"></div>
        </div>
        <div class="absolute bottom-32 left-1/4 w-12 h-12 opacity-10">
          <div class="w-full h-full border-3 border-pink-400 transform rotate-12 animate-bounce"></div>
        </div>
        <div class="absolute top-1/2 right-1/4 w-14 h-14 opacity-5">
          <div class="w-full h-full bg-gradient-to-tr from-blue-400 to-cyan-400 rounded-lg transform rotate-45 animate-spin" style="animation-duration: 20s;"></div>
        </div>
      </div>

      <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">

        <!-- Header Section -->
        <div class="text-center mb-20">
          <div class="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-100/80 to-purple-100/80 dark:from-indigo-900/40 dark:to-purple-900/40 border-2 border-indigo-200/60 dark:border-indigo-700/60 text-indigo-800 dark:text-indigo-200 text-sm font-medium mb-8 backdrop-blur-sm shadow-lg">
            <lucide-angular [img]="SparklesIcon" class="w-5 h-5 mr-3"></lucide-angular>
            ✨ Smart Selection Interface ✨
          </div>

          <h1 class="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            <span class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
              Combobox
            </span>
            <br>
            <span class="text-4xl sm:text-5xl lg:text-6xl text-slate-700 dark:text-slate-300 font-serif italic">
              Showcase
            </span>
          </h1>

          <p class="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed mb-16 font-light">
            "The best interface is the one that gets out of the user's way" — Jef Raskin
            <br>
            <span class="text-lg text-indigo-700 dark:text-indigo-300 font-medium">
              Discover intelligent dropdown components with search, multi-select, and smart filtering
            </span>
          </p>

          <!-- Feature Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            <div class="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-indigo-200/60 dark:border-indigo-700/60 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:text-white mb-2">🔍</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Smart Search</div>
              <div class="w-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
            </div>

            <div class="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200/60 dark:border-purple-700/60 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:text-white mb-2">🎯</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Multi-Select</div>
              <div class="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
            </div>

            <div class="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200/60 dark:border-pink-700/60 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div class="text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent dark:text-white mb-2">⚡</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Fast Loading</div>
              <div class="w-8 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
            </div>

            <div class="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-200/60 dark:border-blue-700/60 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:text-white mb-2">🏗️</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Grouped Data</div>
              <div class="w-8 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
            </div>
          </div>
        </div>

        <!-- Demo Sections -->
        <div class="space-y-16">

          <!-- Basic Examples Section -->
          <section>
            <div class="text-center mb-12">
              <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
                🎯 Content Categories
              </h2>
              <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
                Discover your interests and explore content that matters to you
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <!-- Basic Framework Selection -->
              <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <lucide-angular [img]="CodeIcon" class="w-6 h-6 text-white"></lucide-angular>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">Interest Categories</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Choose your content preferences</p>
                  </div>
                </div>

                <div class="space-y-4">
                  <Combobox
                    [options]="frameworkOptions"
                    [(ngModel)]="selectedFramework"
                    placeholder="Select your interests..."
                    (valueChange)="onFrameworkChange($event)"
                    [searchable]="false"
                    class="w-full bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-indigo-200 dark:border-indigo-600/50 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/40 dark:hover:to-purple-900/40 transition-all duration-300"
                  ></Combobox>

                  <div *ngIf="selectedFramework" class="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200/50 dark:border-indigo-600/30">
                    <div class="flex items-center space-x-3">
                      <lucide-angular [img]="CheckIcon" class="w-5 h-5 text-indigo-600 dark:text-indigo-400"></lucide-angular>
                      <span class="text-gray-700 dark:text-gray-300 font-medium">
                        Selected: <span class="text-indigo-600 dark:text-indigo-400 font-semibold">{{ getSelectedFrameworkLabel() }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Searchable Languages -->
              <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <lucide-angular [img]="SearchIcon" class="w-6 h-6 text-white"></lucide-angular>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">Coffee Selection</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Search and filter coffee types and brewing methods</p>
                  </div>
                </div>

                <div class="space-y-4">
                  <Combobox
                    [options]="languageOptions"
                    [(ngModel)]="selectedLanguage"
                    placeholder="Search coffee types..."
                    (valueChange)="onLanguageChange($event)"
                    [searchable]="true"
                    searchPlaceholder="Type to search coffee..."
                    class="w-full bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-200 dark:border-purple-600/50 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/40 dark:hover:to-pink-900/40 transition-all duration-300"
                  ></Combobox>

                  <div *ngIf="selectedLanguage" class="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50 dark:border-purple-600/30">
                    <div class="flex items-center space-x-3">
                      <lucide-angular [img]="CheckIcon" class="w-5 h-5 text-purple-600 dark:text-purple-400"></lucide-angular>
                      <span class="text-gray-700 dark:text-gray-300 font-medium">
                        Selected: <span class="text-purple-600 dark:text-purple-400 font-semibold">{{ getSelectedLanguageLabel() }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Multi-Select Section -->
          <section>
            <div class="text-center mb-12">
              <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
                🎯 Multi-Select Magic
              </h2>
              <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
                Select multiple options with beautiful chip displays
              </p>
            </div>

            <div class="max-w-4xl mx-auto">
              <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
                <div class="flex items-center mb-6">
                  <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <lucide-angular [img]="UsersIcon" class="w-8 h-8 text-white"></lucide-angular>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Creative Skills</h3>
                    <p class="text-gray-600 dark:text-gray-400">Choose multiple creative and personal skills</p>
                  </div>
                </div>

                <div class="space-y-6">
                  <Combobox
                    [options]="skillOptions"
                    [multiple]="true"
                    [(ngModel)]="selectedSkills"
                    placeholder="Select your creative skills..."
                    (valueChange)="onSkillsChange($event)"
                    searchPlaceholder="Search creative skills..."
                    class="w-full bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border-emerald-200 dark:border-emerald-600/50 hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900/40 dark:hover:to-teal-900/40 transition-all duration-300 min-h-12"
                  ></Combobox>

                  <div *ngIf="selectedSkills.length > 0" class="mt-6 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-600/30">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <lucide-angular [img]="CheckIcon" class="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2"></lucide-angular>
                      Selected Creative Skills ({{ selectedSkills.length }})
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      <span
                        *ngFor="let skill of getSelectedSkillLabels()"
                        class="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 rounded-full text-sm font-medium border border-emerald-200 dark:border-emerald-700/50"
                      >
                        {{ skill }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Grouped Options Section -->
          <section>
            <div class="text-center mb-12">
              <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
                � Dream Destinations
              </h2>
              <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
                Explore amazing cities and plan your next adventure by continent
              </p>
            </div>

            <div class="max-w-4xl mx-auto">
              <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
                <div class="flex items-center mb-6">
                  <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <lucide-angular [img]="LayersIcon" class="w-8 h-8 text-white"></lucide-angular>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Travel Destinations</h3>
                    <p class="text-gray-600 dark:text-gray-400">Explore destinations organized by continent</p>
                  </div>
                </div>

                <div class="space-y-6">
                  <Combobox
                    [options]="groupedTechOptions"
                    [(ngModel)]="selectedTech"
                    placeholder="Select destination..."
                    (valueChange)="onTechChange($event)"
                    [showGroupLabels]="true"
                    searchPlaceholder="Search destinations..."
                    class="w-full bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-200 dark:border-blue-600/50 hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/40 dark:hover:to-cyan-900/40 transition-all duration-300"
                  ></Combobox>

                  <div *ngIf="selectedTech" class="mt-6 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200/50 dark:border-blue-600/30">
                    <div class="flex items-start space-x-4">
                      <lucide-angular [img]="CheckIcon" class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0"></lucide-angular>
                      <div>
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
                          {{ getSelectedTechLabel() }}
                        </h4>
                        <p class="text-gray-600 dark:text-gray-400 mt-1">
                          {{ getSelectedTechDescription() }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
                Loading states, error handling, and real-world scenarios
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <!-- Loading State -->
              <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <lucide-angular [img]="RefreshCwIcon" class="w-6 h-6 text-white" [class.animate-spin]="isLoading()"></lucide-angular>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">Loading State</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Async data loading simulation</p>
                  </div>
                </div>

                <div class="space-y-4">
                  <div class="flex space-x-3">
                    <Combobox
                      [options]="asyncOptions"
                      [loadingState]="isLoading()"
                      [(ngModel)]="selectedAsync"
                      placeholder="Select async option..."
                      (valueChange)="onAsyncChange($event)"
                      loadingMessage="Loading data..."
                      searchPlaceholder="Search options..."
                      class="flex-1 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border-amber-200 dark:border-amber-600/50 hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-900/40 dark:hover:to-orange-900/40 transition-all duration-300"
                    ></Combobox>

                    <button
                      (click)="simulateLoading()"
                      [disabled]="isLoading()"
                      class="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      <lucide-angular [img]="RefreshCwIcon" class="w-4 h-4" [class.animate-spin]="isLoading()"></lucide-angular>
                    </button>
                  </div>

                  <div *ngIf="selectedAsync" class="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200/50 dark:border-amber-600/30">
                    <div class="flex items-center space-x-3">
                      <lucide-angular [img]="CheckIcon" class="w-5 h-5 text-amber-600 dark:text-amber-400"></lucide-angular>
                      <span class="text-gray-700 dark:text-gray-300 font-medium">
                        Loaded: <span class="text-amber-600 dark:text-amber-400 font-semibold">{{ getSelectedAsyncLabel() }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Error State -->
              <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <lucide-angular [img]="AlertTriangleIcon" class="w-6 h-6 text-white"></lucide-angular>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">Error Handling</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Error state and recovery</p>
                  </div>
                </div>

                <div class="space-y-4">
                  <div class="flex space-x-3">
                    <Combobox
                      [options]="errorOptions"
                      [error]="errorMessage()"
                      [(ngModel)]="selectedError"
                      placeholder="Select option..."
                      (valueChange)="onErrorChange($event)"
                      searchPlaceholder="Search options..."
                      class="flex-1 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 border-red-200 dark:border-red-600/50 hover:from-red-100 hover:to-rose-100 dark:hover:from-red-900/40 dark:hover:to-rose-900/40 transition-all duration-300"
                    ></Combobox>

                    <button
                      (click)="simulateError()"
                      class="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <lucide-angular [img]="AlertTriangleIcon" class="w-4 h-4"></lucide-angular>
                    </button>
                  </div>

                  <div *ngIf="selectedError" class="mt-4 p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-xl border border-red-200/50 dark:border-red-600/30">
                    <div class="flex items-center space-x-3">
                      <lucide-angular [img]="CheckIcon" class="w-5 h-5 text-red-600 dark:text-red-400"></lucide-angular>
                      <span class="text-gray-700 dark:text-gray-300 font-medium">
                        Selected: <span class="text-red-600 dark:text-red-400 font-semibold">{{ getSelectedErrorLabel() }}</span>
                      </span>
                    </div>
                  </div>
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
                  Simple, powerful combobox components for every scenario
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
                    <div class="text-slate-400 mb-2">// Simple combobox selection</div>
                    <div class="text-blue-300">&lt;Combobox [options]="options" [(ngModel)]="value"&gt;</div>
                    <div class="text-green-300 ml-4">&lt;ComboboxTrigger&gt;&lt;/ComboboxTrigger&gt;</div>
                    <div class="text-purple-300 ml-4">&lt;ComboboxContent&gt;&lt;/ComboboxContent&gt;</div>
                    <div class="text-blue-300">&lt;/Combobox&gt;</div>
                  </div>
                </div>

                <!-- Multi-Select Usage -->
                <div class="bg-slate-800/50 rounded-2xl p-6 border border-slate-600/50">
                  <h3 class="text-xl font-bold text-white mb-4 flex items-center">
                    <span class="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                    Multi-Select
                  </h3>
                  <div class="bg-slate-900/80 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                    <div class="text-slate-400 mb-2">// Multiple selections with chips</div>
                    <div class="text-blue-300">&lt;Combobox [multiple]="true" [(ngModel)]="values"&gt;</div>
                    <div class="text-green-300 ml-4">&lt;ComboboxTrigger [multiple]="true"&gt;</div>
                    <div class="text-green-300 ml-4">&lt;/ComboboxTrigger&gt;</div>
                    <div class="text-purple-300 ml-4">&lt;ComboboxContent [multiple]="true"&gt;</div>
                    <div class="text-purple-300 ml-4">&lt;/ComboboxContent&gt;</div>
                    <div class="text-blue-300">&lt;/Combobox&gt;</div>
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
                    <div class="text-green-300 mb-2">🔍 Smart Search</div>
                    <div class="text-slate-300">Intelligent filtering</div>
                    <div class="text-slate-300">Type-ahead support</div>
                  </div>
                  <div class="bg-slate-900/80 rounded-xl p-4">
                    <div class="text-blue-300 mb-2">🎯 Multi-Select</div>
                    <div class="text-slate-300">Multiple selections</div>
                    <div class="text-slate-300">Chip-based display</div>
                  </div>
                  <div class="bg-slate-900/80 rounded-xl p-4">
                    <div class="text-purple-300 mb-2">🏗️ Grouped</div>
                    <div class="text-slate-300">Category organization</div>
                    <div class="text-slate-300">Group labels</div>
                  </div>
                  <div class="bg-slate-900/80 rounded-xl p-4">
                    <div class="text-yellow-300 mb-2">⚡ Async</div>
                    <div class="text-slate-300">Loading states</div>
                    <div class="text-slate-300">Error handling</div>
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
                    Ready to Integrate Combobox?
                  </h2>

                  <p class="text-lg text-white/80 dark:text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
                    Experience the most comprehensive combobox component for Angular with
                    smart search, multi-select, grouping, and async loading features.
                  </p>

                  <!-- Documentation Link Button -->
                  <a
                    href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/combobox.md"
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
export class ComboboxDemo {
  private seoService = inject(SEOService);

  // State for selections
  selectedFramework: string | null = null;
  selectedLanguage: string | null = null;
  selectedSkills: string[] = [];
  selectedTech: string | null = null;
  selectedAsync: string | null = null;
  selectedError: string | null = null;

  // Loading and error states
  isLoading = signal(false);
  errorMessage = signal('');

  // Options arrays
  frameworkOptions: ComboboxOption[] = [
    { value: 'foodie', label: 'Food & Dining', description: 'Restaurants, recipes, and culinary experiences' },
    { value: 'travel', label: 'Travel & Adventure', description: 'Destinations, tips, and travel guides' },
    { value: 'fitness', label: 'Health & Fitness', description: 'Workouts, nutrition, and wellness tips' },
    { value: 'books', label: 'Books & Literature', description: 'Reading recommendations and reviews' },
    { value: 'music', label: 'Music & Arts', description: 'Concerts, albums, and creative content' },
    { value: 'gaming', label: 'Gaming', description: 'Video games, reviews, and gaming culture' },
    { value: 'photography', label: 'Photography', description: 'Tips, gear, and stunning visuals' },
    { value: 'diy', label: 'DIY & Crafts', description: 'Home projects and creative tutorials' },
    { value: 'pets', label: 'Pets & Animals', description: 'Pet care, wildlife, and animal stories' },
    { value: 'sustainability', label: 'Sustainability', description: 'Eco-friendly living and green initiatives', disabled: true }
  ];

  languageOptions: ComboboxOption[] = [
    { value: 'espresso', label: 'Espresso', description: 'Rich, concentrated coffee shot' },
    { value: 'cappuccino', label: 'Cappuccino', description: 'Espresso with steamed milk and foam' },
    { value: 'latte', label: 'Caffè Latte', description: 'Espresso with steamed milk' },
    { value: 'americano', label: 'Americano', description: 'Espresso diluted with hot water' },
    { value: 'macchiato', label: 'Macchiato', description: 'Espresso "marked" with milk foam' },
    { value: 'mocha', label: 'Caffè Mocha', description: 'Espresso with chocolate and steamed milk' },
    { value: 'frappuccino', label: 'Frappuccino', description: 'Blended coffee with ice and milk' },
    { value: 'coldBrew', label: 'Cold Brew', description: 'Coffee brewed with cold water over time' },
    { value: 'turkish', label: 'Turkish Coffee', description: 'Finely ground coffee brewed in a cezve' },
    { value: 'pourOver', label: 'Pour Over', description: 'Manual brewing method with filtered water' },
    { value: 'frenchPress', label: 'French Press', description: 'Full immersion brewing with metal filter' },
    { value: 'aeropress', label: 'AeroPress', description: 'Pressure brewing system' },
    { value: 'chemex', label: 'Chemex', description: 'Pour-over brewing with thick paper filter' },
    { value: 'v60', label: 'Hario V60', description: 'Cone-shaped dripper for pour-over coffee' },
    { value: 'nitro', label: 'Nitro Coffee', description: 'Cold brew infused with nitrogen gas', disabled: true }
  ];

  skillOptions: ComboboxOption[] = [
    { value: 'painting', label: 'Painting & Drawing', description: 'Watercolor, acrylic, oil, digital art, sketching' },
    { value: 'music', label: 'Musical Instruments', description: 'Piano, guitar, violin, drums, singing' },
    { value: 'cooking', label: 'Culinary Arts', description: 'Baking, international cuisine, food presentation' },
    { value: 'languages', label: 'Foreign Languages', description: 'Spanish, French, Mandarin, Japanese, Italian' },
    { value: 'sports', label: 'Athletic Skills', description: 'Swimming, cycling, yoga, martial arts, dancing' },
    { value: 'crafts', label: 'Hand Crafts', description: 'Knitting, woodworking, pottery, jewelry making' },
    { value: 'gardening', label: 'Gardening & Plants', description: 'Indoor plants, vegetable growing, landscaping' },
    { value: 'photography', label: 'Photography', description: 'Portrait, landscape, macro, street photography' },
    { value: 'writing', label: 'Creative Writing', description: 'Poetry, fiction, blogging, screenwriting' },
    { value: 'meditation', label: 'Mindfulness & Meditation', description: 'Stress relief, breathing techniques, wellness' }
  ];

  groupedTechOptions: ComboboxOption[] = [
    // European Destinations
    { value: 'paris', label: 'Paris, France', group: 'Europe', description: 'City of Light with iconic landmarks and cuisine' },
    { value: 'rome', label: 'Rome, Italy', group: 'Europe', description: 'Eternal City with ancient history and architecture' },
    { value: 'barcelona', label: 'Barcelona, Spain', group: 'Europe', description: 'Vibrant city with unique Gaudí architecture' },
    { value: 'amsterdam', label: 'Amsterdam, Netherlands', group: 'Europe', description: 'Charming canals and rich cultural heritage' },

    // Asian Destinations
    { value: 'tokyo', label: 'Tokyo, Japan', group: 'Asia', description: 'Modern metropolis blending tradition and innovation' },
    { value: 'bangkok', label: 'Bangkok, Thailand', group: 'Asia', description: 'Bustling city with temples and street food culture' },
    { value: 'singapore', label: 'Singapore', group: 'Asia', description: 'Garden city with diverse food and modern attractions' },
    { value: 'seoul', label: 'Seoul, South Korea', group: 'Asia', description: 'Dynamic city with K-culture and technology' },

    // American Destinations
    { value: 'newyork', label: 'New York City, USA', group: 'Americas', description: 'The city that never sleeps with iconic skyline' },
    { value: 'rio', label: 'Rio de Janeiro, Brazil', group: 'Americas', description: 'Carnival city with beautiful beaches and mountains' },
    { value: 'vancouver', label: 'Vancouver, Canada', group: 'Americas', description: 'Coastal city surrounded by mountains and forests' },
    { value: 'buenosaires', label: 'Buenos Aires, Argentina', group: 'Americas', description: 'Tango capital with European charm and culture' },

    // African & Oceanic Destinations
    { value: 'capetown', label: 'Cape Town, South Africa', group: 'Africa & Oceania', description: 'Stunning coastal city with Table Mountain views' },
    { value: 'sydney', label: 'Sydney, Australia', group: 'Africa & Oceania', description: 'Harbor city with iconic Opera House and beaches' },
    { value: 'marrakech', label: 'Marrakech, Morocco', group: 'Africa & Oceania', description: 'Imperial city with vibrant souks and palaces' },
    { value: 'auckland', label: 'Auckland, New Zealand', group: 'Africa & Oceania', description: 'Adventure capital with stunning natural landscapes' }
  ];

  asyncOptions: ComboboxOption[] = [];
  errorOptions: ComboboxOption[] = [];

  // Lucide icons
  readonly ChevronDownIcon = ChevronDownIcon;
  readonly SearchIcon = SearchIcon;
  readonly UsersIcon = UsersIcon;
  readonly CodeIcon = CodeIcon;
  readonly DatabaseIcon = DatabaseIcon;
  readonly CloudIcon = CloudIcon;
  readonly SparklesIcon = SparklesIcon;
  readonly CheckIcon = CheckIcon;
  readonly XIcon = XIcon;
  readonly RefreshCwIcon = RefreshCwIcon;
  readonly AlertTriangleIcon = AlertTriangleIcon;
  readonly GlobeIcon = GlobeIcon;
  readonly LayersIcon = LayersIcon;
  readonly SettingsIcon = SettingsIcon;
  readonly BrainIcon = BrainIcon;
  readonly HeartIcon = HeartIcon;

  constructor() {
    this.seoService.updateSEO({
      title: 'Combobox Component - Smart Selection Interface | Angular SuperUI',
      description: 'Discover intelligent dropdown components with smart search, multi-select, grouping, and async loading. Perfect for complex selection scenarios in Angular applications.',
      keywords: 'angular, combobox, dropdown, select, search, multi-select, autocomplete, typeahead, component library, ui components, smart selection'
    });
  }

  // Event handlers
  onFrameworkChange(value: string | string[] | null) {
    this.selectedFramework = Array.isArray(value) ? value[0] || null : value;
  }

  onLanguageChange(value: string | string[] | null) {
    this.selectedLanguage = Array.isArray(value) ? value[0] || null : value;
  }

  onSkillsChange(value: string | string[] | null) {
    this.selectedSkills = Array.isArray(value) ? value : (value ? [value] : []);
  }

  onTechChange(value: string | string[] | null) {
    this.selectedTech = Array.isArray(value) ? value[0] || null : value;
  }

  onAsyncChange(value: string | string[] | null) {
    this.selectedAsync = Array.isArray(value) ? value[0] || null : value;
  }

  onErrorChange(value: string | string[] | null) {
    this.selectedError = Array.isArray(value) ? value[0] || null : value;
  }

  // Helper methods
  getSelectedFrameworkLabel(): string {
    return this.frameworkOptions.find(opt => opt.value === this.selectedFramework)?.label || '';
  }

  getSelectedLanguageLabel(): string {
    return this.languageOptions.find(opt => opt.value === this.selectedLanguage)?.label || '';
  }

  getSelectedSkillLabels(): string[] {
    return this.selectedSkills.map(skill =>
      this.skillOptions.find(opt => opt.value === skill)?.label || skill
    );
  }

  getSelectedTechLabel(): string {
    return this.groupedTechOptions.find(opt => opt.value === this.selectedTech)?.label || '';
  }

  getSelectedTechDescription(): string {
    return this.groupedTechOptions.find(opt => opt.value === this.selectedTech)?.description || '';
  }

  getSelectedAsyncLabel(): string {
    return this.asyncOptions.find(opt => opt.value === this.selectedAsync)?.label || '';
  }

  getSelectedErrorLabel(): string {
    return this.errorOptions.find(opt => opt.value === this.selectedError)?.label || '';
  }

  // Simulation methods
  simulateLoading() {
    this.isLoading.set(true);
    this.asyncOptions = [];
    this.selectedAsync = null;

    // Simulate async data loading
    setTimeout(() => {
      this.asyncOptions = [
        { value: 'hotel1', label: 'Grand Palace Hotel', description: 'Luxury 5-star hotel in city center' },
        { value: 'hotel2', label: 'Beachfront Resort', description: 'Oceanview resort with spa facilities' },
        { value: 'hotel3', label: 'Mountain Lodge', description: 'Cozy retreat in the mountains' },
        { value: 'hotel4', label: 'Boutique Inn', description: 'Charming historical hotel' },
        { value: 'hotel5', label: 'Business Hotel', description: 'Modern hotel with conference facilities' }
      ];
      this.isLoading.set(false);
    }, 2000);
  }

  simulateError() {
    this.errorMessage.set('Failed to load hotel options. Please check your connection.');
    this.errorOptions = [];
    this.selectedError = null;

    // Clear error after 3 seconds and load options
    setTimeout(() => {
      this.errorMessage.set('');
      this.errorOptions = [
        { value: 'restaurant1', label: 'Local Bistro', description: 'Successfully found nearby restaurants' },
        { value: 'restaurant2', label: 'Fine Dining', description: 'Premium restaurant with city views' },
        { value: 'restaurant3', label: 'Street Food Market', description: 'Authentic local cuisine experience' }
      ];
    }, 3000);
  }
}
