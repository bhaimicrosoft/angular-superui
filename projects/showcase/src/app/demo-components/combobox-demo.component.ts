import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Combobox, ComboboxTrigger, ComboboxContent, ComboboxOption } from '@lib/components/combobox';
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
  imports: [CommonModule, FormsModule, Combobox, ComboboxTrigger, ComboboxContent, LucideAngularModule],
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
                🚀 Getting Started
              </h2>
              <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
                Simple, elegant dropdown selection for any use case
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
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">Framework Selection</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Choose your preferred framework</p>
                  </div>
                </div>

                <div class="space-y-4">
                  <Combobox
                    [options]="frameworkOptions"
                    [(ngModel)]="selectedFramework"
                    placeholder="Select a framework..."
                    (valueChange)="onFrameworkChange($event)"
                    class="w-full"
                  >
                    <ComboboxTrigger class="w-full bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-indigo-200 dark:border-indigo-600/50 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/40 dark:hover:to-purple-900/40 transition-all duration-300"></ComboboxTrigger>
                    <ComboboxContent [searchable]="false" class="border-indigo-200 dark:border-indigo-600/50"></ComboboxContent>
                  </Combobox>

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
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">Language Search</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Search and filter programming languages</p>
                  </div>
                </div>

                <div class="space-y-4">
                  <Combobox
                    [options]="languageOptions"
                    [(ngModel)]="selectedLanguage"
                    placeholder="Search languages..."
                    (valueChange)="onLanguageChange($event)"
                    class="w-full"
                  >
                    <ComboboxTrigger class="w-full bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-200 dark:border-purple-600/50 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/40 dark:hover:to-pink-900/40 transition-all duration-300"></ComboboxTrigger>
                    <ComboboxContent [searchable]="true" searchPlaceholder="Type to search languages..." class="border-purple-200 dark:border-purple-600/50"></ComboboxContent>
                  </Combobox>

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
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Skills Selection</h3>
                    <p class="text-gray-600 dark:text-gray-400">Choose multiple skills from various categories</p>
                  </div>
                </div>

                <div class="space-y-6">
                  <Combobox
                    [options]="skillOptions"
                    [multiple]="true"
                    [(ngModel)]="selectedSkills"
                    placeholder="Select your skills..."
                    (valueChange)="onSkillsChange($event)"
                    class="w-full"
                  >
                    <ComboboxTrigger
                      [multiple]="true"
                      class="w-full bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border-emerald-200 dark:border-emerald-600/50 hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900/40 dark:hover:to-teal-900/40 transition-all duration-300 min-h-12"
                    ></ComboboxTrigger>
                    <ComboboxContent
                      [multiple]="true"
                      searchPlaceholder="Search skills..."
                      class="border-emerald-200 dark:border-emerald-600/50"
                    ></ComboboxContent>
                  </Combobox>

                  <div *ngIf="selectedSkills.length > 0" class="mt-6 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-600/30">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <lucide-angular [img]="CheckIcon" class="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2"></lucide-angular>
                      Selected Skills ({{ selectedSkills.length }})
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
                🏗️ Organized Selection
              </h2>
              <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
                Browse options organized by categories and groups
              </p>
            </div>

            <div class="max-w-4xl mx-auto">
              <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
                <div class="flex items-center mb-6">
                  <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <lucide-angular [img]="LayersIcon" class="w-8 h-8 text-white"></lucide-angular>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Technology Stack</h3>
                    <p class="text-gray-600 dark:text-gray-400">Explore technologies organized by category</p>
                  </div>
                </div>

                <div class="space-y-6">
                  <Combobox
                    [options]="groupedTechOptions"
                    [(ngModel)]="selectedTech"
                    placeholder="Select technology..."
                    (valueChange)="onTechChange($event)"
                    class="w-full"
                  >
                    <ComboboxTrigger class="w-full bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-200 dark:border-blue-600/50 hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/40 dark:hover:to-cyan-900/40 transition-all duration-300"></ComboboxTrigger>
                    <ComboboxContent
                      [showGroupLabels]="true"
                      searchPlaceholder="Search technologies..."
                      class="border-blue-200 dark:border-blue-600/50"
                    ></ComboboxContent>
                  </Combobox>

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
                      class="flex-1"
                    >
                      <ComboboxTrigger class="w-full bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border-amber-200 dark:border-amber-600/50 hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-900/40 dark:hover:to-orange-900/40 transition-all duration-300"></ComboboxTrigger>
                      <ComboboxContent
                        [loadingMessage]="'Loading data...'"
                        searchPlaceholder="Search options..."
                        class="border-amber-200 dark:border-amber-600/50"
                      ></ComboboxContent>
                    </Combobox>

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
                      class="flex-1"
                    >
                      <ComboboxTrigger class="w-full bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 border-red-200 dark:border-red-600/50 hover:from-red-100 hover:to-rose-100 dark:hover:from-red-900/40 dark:hover:to-rose-900/40 transition-all duration-300"></ComboboxTrigger>
                      <ComboboxContent
                        searchPlaceholder="Search options..."
                        class="border-red-200 dark:border-red-600/50"
                      ></ComboboxContent>
                    </Combobox>

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
    { value: 'react', label: 'React', description: 'JavaScript library for building user interfaces' },
    { value: 'angular', label: 'Angular', description: 'TypeScript-based web application framework' },
    { value: 'vue', label: 'Vue.js', description: 'Progressive JavaScript framework' },
    { value: 'svelte', label: 'Svelte', description: 'Compile-time framework' },
    { value: 'nextjs', label: 'Next.js', description: 'React framework for production' },
    { value: 'nuxt', label: 'Nuxt.js', description: 'Vue.js framework' },
    { value: 'solid', label: 'SolidJS', description: 'Simple and performant reactivity' },
    { value: 'qwik', label: 'Qwik', description: 'Resumable framework' },
    { value: 'astro', label: 'Astro', description: 'Build faster websites' },
    { value: 'remix', label: 'Remix', description: 'Full stack web framework', disabled: true }
  ];

  languageOptions: ComboboxOption[] = [
    { value: 'javascript', label: 'JavaScript', description: 'Dynamic programming language' },
    { value: 'typescript', label: 'TypeScript', description: 'Typed superset of JavaScript' },
    { value: 'python', label: 'Python', description: 'High-level programming language' },
    { value: 'java', label: 'Java', description: 'Object-oriented programming language' },
    { value: 'csharp', label: 'C#', description: 'Microsoft\'s object-oriented language' },
    { value: 'cpp', label: 'C++', description: 'General-purpose programming language' },
    { value: 'rust', label: 'Rust', description: 'Systems programming language' },
    { value: 'go', label: 'Go', description: 'Open source programming language' },
    { value: 'swift', label: 'Swift', description: 'Apple\'s programming language' },
    { value: 'kotlin', label: 'Kotlin', description: 'Modern programming language' },
    { value: 'php', label: 'PHP', description: 'Server-side scripting language' },
    { value: 'ruby', label: 'Ruby', description: 'Dynamic programming language' },
    { value: 'dart', label: 'Dart', description: 'Client-optimized language' },
    { value: 'scala', label: 'Scala', description: 'JVM-based language' },
    { value: 'haskell', label: 'Haskell', description: 'Functional programming language', disabled: true }
  ];

  skillOptions: ComboboxOption[] = [
    { value: 'frontend', label: 'Frontend Development', description: 'HTML, CSS, JavaScript, React, Angular' },
    { value: 'backend', label: 'Backend Development', description: 'Node.js, Python, Java, C#' },
    { value: 'mobile', label: 'Mobile Development', description: 'iOS, Android, React Native, Flutter' },
    { value: 'devops', label: 'DevOps', description: 'Docker, Kubernetes, AWS, Azure' },
    { value: 'database', label: 'Database Design', description: 'SQL, NoSQL, MongoDB, PostgreSQL' },
    { value: 'testing', label: 'Testing', description: 'Unit testing, Integration testing, E2E testing' },
    { value: 'security', label: 'Security', description: 'Authentication, Authorization, OWASP' },
    { value: 'ui-ux', label: 'UI/UX Design', description: 'Figma, Adobe XD, Sketch, Prototyping' },
    { value: 'cloud', label: 'Cloud Computing', description: 'AWS, Azure, GCP, Serverless' },
    { value: 'ai-ml', label: 'AI/ML', description: 'Machine Learning, Neural Networks, TensorFlow' }
  ];

  groupedTechOptions: ComboboxOption[] = [
    // Frontend
    { value: 'react', label: 'React', group: 'Frontend', description: 'JavaScript library for building user interfaces' },
    { value: 'angular', label: 'Angular', group: 'Frontend', description: 'TypeScript-based web application framework' },
    { value: 'vue', label: 'Vue.js', group: 'Frontend', description: 'Progressive JavaScript framework' },
    { value: 'svelte', label: 'Svelte', group: 'Frontend', description: 'Compile-time framework' },

    // Backend
    { value: 'nodejs', label: 'Node.js', group: 'Backend', description: 'JavaScript runtime built on Chrome\'s V8 engine' },
    { value: 'python', label: 'Python', group: 'Backend', description: 'High-level programming language' },
    { value: 'java', label: 'Java', group: 'Backend', description: 'Object-oriented programming language' },
    { value: 'csharp', label: 'C#', group: 'Backend', description: 'Microsoft\'s object-oriented programming language' },

    // Database
    { value: 'postgres', label: 'PostgreSQL', group: 'Database', description: 'Open source relational database' },
    { value: 'mongodb', label: 'MongoDB', group: 'Database', description: 'NoSQL document database' },
    { value: 'mysql', label: 'MySQL', group: 'Database', description: 'Open source relational database' },
    { value: 'redis', label: 'Redis', group: 'Database', description: 'In-memory data structure store' },

    // Cloud
    { value: 'aws', label: 'AWS', group: 'Cloud', description: 'Amazon Web Services' },
    { value: 'azure', label: 'Azure', group: 'Cloud', description: 'Microsoft Azure' },
    { value: 'gcp', label: 'Google Cloud', group: 'Cloud', description: 'Google Cloud Platform' },
    { value: 'vercel', label: 'Vercel', group: 'Cloud', description: 'Frontend deployment platform' }
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
        { value: 'async1', label: 'Async Option 1', description: 'Loaded from server' },
        { value: 'async2', label: 'Async Option 2', description: 'Loaded from server' },
        { value: 'async3', label: 'Async Option 3', description: 'Loaded from server' },
        { value: 'async4', label: 'Async Option 4', description: 'Loaded from server' },
        { value: 'async5', label: 'Async Option 5', description: 'Loaded from server' }
      ];
      this.isLoading.set(false);
    }, 2000);
  }

  simulateError() {
    this.errorMessage.set('Failed to load options. Please try again.');
    this.errorOptions = [];
    this.selectedError = null;

    // Clear error after 3 seconds and load options
    setTimeout(() => {
      this.errorMessage.set('');
      this.errorOptions = [
        { value: 'error1', label: 'Error Option 1', description: 'Successfully recovered' },
        { value: 'error2', label: 'Error Option 2', description: 'Successfully recovered' },
        { value: 'error3', label: 'Error Option 3', description: 'Successfully recovered' }
      ];
    }, 3000);
  }
}
