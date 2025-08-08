import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <section
      class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center max-w-5xl mx-auto">
          <!-- Badge -->
          <div
            class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Angular 17+ Ready | Tailwind CSS 4
          </div>

          <!-- Main Heading -->
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Build Stunning
            <br>
            <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Angular Apps
            </span>
          </h1>

          <!-- Subtitle -->
          <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            A comprehensive collection of modern, accessible, and customizable UI components
            built with Angular 17+ and Tailwind CSS.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a
              (click)="scrollToComponents()"
              class="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer text-lg"
            >
              <span class="relative z-10">Explore Components</span>
              <div
                class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>

            <a
              href="https://github.com/bhaimicrosoft/angular-superui"
              target="_blank"
              rel="noopener noreferrer"
              class="group relative inline-flex items-center px-10 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-300 cursor-pointer text-lg backdrop-blur-sm bg-white/80 dark:bg-gray-800/80"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </div>

          <!-- Buy Me a Coffee -->
          <div class="mb-16">
            <a
              href="https://buymeacoffee.com/bhaikaju"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium rounded-xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer animate-heartbeat"
            >
              ☕ Buy me a coffee
            </a>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div
              class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{{ stats.components }}+</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Components</div>
            </div>
            <div
              class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
              <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{{ stats.examples }}+</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Examples</div>
            </div>
            <div
              class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
              <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">100%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Accessible</div>
            </div>
            <div
              class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
              <div class="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">MIT</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Licensed</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"></div>
      <div class="absolute top-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>
      <div class="absolute bottom-20 left-20 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl"></div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Angular SuperUI?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Built with modern Angular patterns and best practices in mind.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let feature of features"
               class="text-center p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                 [ngClass]="feature.iconBg">
              <svg class="w-8 h-8" [ngClass]="feature.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="feature.icon"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Premium Components Showcase -->
    <section id="components" class="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/10 overflow-hidden">
      <!-- Premium Background Effects -->
      <div class="absolute inset-0 opacity-30" style="background-image: radial-gradient(circle at 1px 1px, rgba(156,146,172,0.05) 1px, transparent 0); background-size: 60px 60px;"></div>
      <div class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-cyan-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Premium Header -->
        <div class="text-center mb-20">
          <!-- FREE Badge -->
          <div class="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold text-lg mb-6 shadow-lg transform hover:scale-105 transition-all duration-300">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            100% FREE FOREVER
          </div>

          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Explore Our
            <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Premium Components
            </span>
          </h2>

          <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Enterprise-grade components with <span class="font-bold text-blue-600 dark:text-blue-400">premium features</span>
            — all completely <span class="font-bold text-emerald-600 dark:text-emerald-400">FREE</span> and open source!
          </p>

          <!-- Premium Features Highlight -->
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <div class="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
              <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Advanced Variants</span>
            </div>
            <div class="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
              <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">WCAG 2.1 AA Compliant</span>
            </div>
            <div class="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
              <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">TypeScript Support</span>
            </div>
            <div class="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
              <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Optimized</span>
            </div>
          </div>
        </div>

        <!-- Premium Component Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <a
            *ngFor="let component of components"
            [routerLink]="component.route"
            class="group relative block p-8 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02]"
            [ngClass]="component.isEnterprise ?
              'bg-gradient-to-br from-rose-50/95 via-pink-50/95 to-orange-50/95 dark:from-rose-950/95 dark:via-pink-950/95 dark:to-orange-950/95 border-rose-300/70 dark:border-rose-600/70 hover:border-rose-400/80 dark:hover:border-rose-500/80 ring-2 ring-rose-200/50 dark:ring-rose-800/50' :
              'bg-white/90 dark:bg-gray-900/90 border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-500/50'"
          >
            <!-- Enterprise Badge Overlay for DataTable -->
            <div *ngIf="component.isEnterprise" class="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 animate-pulse">
              <div class="text-white font-bold text-xs text-center leading-tight">
                <div>🏢</div>
                <div>FREE</div>
              </div>
            </div>

            <!-- Premium Badge Overlay for Regular Components -->
            <div *ngIf="!component.isEnterprise" class="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>

            <!-- Component Header -->
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300" [ngClass]="component.bgColor">
                <svg class="w-8 h-8" [ngClass]="component.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" [attr.d]="component.icon"></path>
                </svg>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="text-xl font-bold transition-colors"
                      [ngClass]="component.isEnterprise ?
                        'text-rose-900 dark:text-rose-100 group-hover:text-rose-800 dark:group-hover:text-rose-200' :
                        'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'">
                    {{ component.name }}
                  </h3>
                  <span class="px-2 py-1 text-xs font-semibold rounded-full"
                        [ngClass]="component.isEnterprise ?
                          'bg-gradient-to-r from-rose-200 to-orange-200 dark:from-rose-800/50 dark:to-orange-800/50 text-rose-800 dark:text-rose-200' :
                          'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300'">
                    {{ component.category }}
                  </span>
                </div>
                <div class="flex items-center text-xs font-semibold"
                     [ngClass]="component.isEnterprise ?
                       'text-rose-700 dark:text-rose-300' :
                       'text-emerald-600 dark:text-emerald-400'">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span *ngIf="component.isEnterprise">🏢 ENTERPRISE GRADE FREE</span>
                  <span *ngIf="!component.isEnterprise">FREE PREMIUM</span>
                </div>
              </div>
            </div>

            <!-- Component Description -->
            <p class="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-6">{{ component.description }}</p>

            <!-- Premium Features List -->
            <div class="grid grid-cols-2 gap-2 mb-6" *ngIf="!component.isEnterprise">
              <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <svg class="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Multiple Variants
              </div>
              <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <svg class="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Fully Accessible
              </div>
              <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <svg class="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                TypeScript Ready
              </div>
              <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <svg class="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Mobile Optimized
              </div>
            </div>

            <!-- Enterprise Features List for DataTable -->
            <div class="grid grid-cols-2 gap-2 mb-6" *ngIf="component.isEnterprise">
              <div class="flex items-center text-xs text-rose-600 dark:text-rose-400 font-medium">
                <svg class="w-3 h-3 mr-1 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Advanced Sorting
              </div>
              <div class="flex items-center text-xs text-rose-600 dark:text-rose-400 font-medium">
                <svg class="w-3 h-3 mr-1 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Smart Filtering
              </div>
              <div class="flex items-center text-xs text-rose-600 dark:text-rose-400 font-medium">
                <svg class="w-3 h-3 mr-1 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Row Selection
              </div>
              <div class="flex items-center text-xs text-rose-600 dark:text-rose-400 font-medium">
                <svg class="w-3 h-3 mr-1 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Export Data
              </div>
            </div>

            <!-- Enterprise CTA for DataTable -->
            <div *ngIf="component.isEnterprise" class="flex items-center justify-between p-4 bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-950/40 dark:to-orange-950/40 rounded-xl border border-rose-300/50 dark:border-rose-700/50">
              <div class="flex items-center text-rose-700 dark:text-rose-300 font-bold group-hover:text-rose-800 dark:group-hover:text-rose-200">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
                🏢 Enterprise Demo
              </div>
              <svg class="w-5 h-5 text-rose-600 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </div>

            <!-- Premium CTA for Regular Components -->
            <div *ngIf="!component.isEnterprise" class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
              <div class="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                View Examples
              </div>
              <svg class="w-5 h-5 text-blue-500 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </div>

            <!-- Hover Glow Effect -->
            <div class="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none"
                 [ngClass]="component.isEnterprise ?
                   'bg-gradient-to-r from-rose-400/0 via-pink-400/0 to-orange-400/0 group-hover:from-rose-400/10 group-hover:via-pink-400/10 group-hover:to-orange-400/10' :
                   'bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-indigo-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/10 group-hover:to-indigo-400/10'"></div>
          </a>
        </div>

        <!-- Bottom CTA -->
        <div class="text-center mt-16">
          <div class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
            All Premium Features • Always Free • No Hidden Costs
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Join thousands of developers building amazing applications with our enterprise-grade components.
            <span class="font-semibold">MIT License</span> ensures you can use them in any project, commercial or personal.
          </p>
        </div>
      </div>
    </section>

    <!-- Getting Started Section -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Get Started in Minutes
          </h2>

          <div class="bg-gray-900 dark:bg-gray-800 rounded-xl p-6 text-left mb-8">
            <div class="flex items-center mb-4">
              <div class="flex space-x-2">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span class="ml-4 text-gray-400 text-sm">Terminal</span>
            </div>
            <pre class="text-green-400 font-mono text-2xl overflow-x-auto">
<span class="text-gray-500"># Initialize Angular SuperUI in your project</span>
ngsui-cli init

<span class="text-gray-500"># Add specific components</span>
ngsui-cli add button card dialog

<span class="text-gray-500"># Or add all available components</span>
ngsui-cli add --all

<span class="text-gray-500"># Import components in your app and start building!</span>
ng serve
            </pre>
          </div>

          <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Ready to transform your Angular applications? Explore our components in the mega menu above
            or check out the mobile menu on smaller screens.
          </p>

          <a
            href="https://github.com/bhaimicrosoft/angular-superui"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Star on GitHub
          </a>
        </div>

      </div>
    </section>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  router = inject(Router);
  private seoService = inject(SEOService);

  ngOnInit() {
    // Update SEO for homepage
    this.seoService.updateSEO(this.seoService.getHomepageSEO());
  }

  stats = {
    components: 39,
    examples: 55
  };

  features = [
    {
      title: 'Modern Angular',
      description: 'Built with Angular 17+ standalone components and signals',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Fully Accessible',
      description: 'WCAG compliant with proper ARIA attributes and keyboard navigation',
      icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Tailwind Powered',
      description: 'Styled with Tailwind CSS for easy customization and theming',
      icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'TypeScript Native',
      description: 'Full TypeScript support with strict typing and IntelliSense',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      title: 'Dark Mode Ready',
      description: 'Built-in dark mode support with smooth transitions',
      icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
      iconBg: 'bg-gray-100 dark:bg-gray-700',
      iconColor: 'text-gray-600 dark:text-gray-400'
    },
    {
      title: 'Developer Friendly',
      description: 'Easy to use with comprehensive documentation and examples',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400'
    }
  ];

  components = [
    {
      name: 'Dropdown Menu',
      route: '/components/dropdown-menu',
      description: 'Stunning, accessible dropdown menus with variants, animations, and mobile-first design.',
      category: 'Navigation',
      icon: 'M19 9l-7 7-7-7',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      name: 'Button',
      route: '/components/button',
      description: 'Interactive buttons with various styles and states',
      category: 'Form',
      icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      name: 'Badge',
      route: '/components/badge',
      description: 'Small status indicators and notification badges',
      category: 'Display',
      icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      name: 'Alert',
      route: '/components/alert',
      description: 'Display important messages and notifications',
      category: 'Feedback',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      name: 'Alert Dialog',
      route: '/components/alert-dialog',
      description: 'Modal confirmation dialogs with actions',
      category: 'Overlay',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      iconColor: 'text-red-600 dark:text-red-400'
    },
    {
      name: 'Aspect Ratio',
      route: '/components/aspect-ratio',
      description: 'Maintain consistent proportions for media and content containers across all screen sizes',
      category: 'Layout',
      icon: 'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      name: 'Avatar',
      route: '/components/avatar',
      description: 'User profile pictures with fallbacks',
      category: 'Display',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      name: 'Card',
      route: '/components/card',
      description: 'Flexible content containers',
      category: 'Layout',
      icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      name: 'Dialog',
      route: '/components/dialog',
      description: 'Modal dialogs and overlays',
      category: 'Overlay',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      bgColor: 'bg-pink-100 dark:bg-pink-900/30',
      iconColor: 'text-pink-600 dark:text-pink-400'
    },
    {
      name: 'Drawer',
      route: '/components/slide-panel',
      description: 'Slide-out panels from screen edges',
      category: 'Navigation',
      icon: 'M4 6h16M4 12h16M4 18h16',
      bgColor: 'bg-slate-100 dark:bg-slate-900/30',
      iconColor: 'text-slate-600 dark:text-slate-400'
    },
    {
      name: 'Accordion',
      route: '/components/accordion',
      description: 'Collapsible content sections',
      category: 'Layout',
      icon: 'M19 14l-7 7m0 0l-7-7m7 7V3',
      bgColor: 'bg-teal-100 dark:bg-teal-900/30',
      iconColor: 'text-teal-600 dark:text-teal-400'
    },
    {
      name: 'Calendar',
      route: '/components/calendar',
      description: 'Date picker and calendar views',
      category: 'Form',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      iconColor: 'text-red-600 dark:text-red-400'
    },
    {
      name: 'Carousel',
      route: '/components/carousel',
      description: 'Image and content sliders',
      category: 'Display',
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
      iconColor: 'text-cyan-600 dark:text-cyan-400'
    },
    {
      name: 'Checkbox',
      route: '/components/checkbox',
      description: 'Selection controls for forms',
      category: 'Form',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      name: 'Collapsible',
      route: '/components/collapsible',
      description: 'Expandable content with smooth animations',
      category: 'Layout',
      icon: 'M19 14l-7 7m0 0l-7-7m7 7V3',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400'
    },
    {
      name: 'Combobox',
      route: '/components/combobox',
      description: 'Smart selection interface with search and multi-select',
      category: 'Form',
      icon: 'M8 9l4-4 4 4m0 6l-4 4-4-4',
      bgColor: 'bg-lime-100 dark:bg-lime-900/30',
      iconColor: 'text-lime-600 dark:text-lime-400'
    },
    {
      name: 'Context Menu',
      route: '/components/context-menu',
      description: 'Right-click context menus with smart positioning and accessibility',
      category: 'Interaction',
      icon: 'M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z',
      bgColor: 'bg-violet-100 dark:bg-violet-900/30',
      iconColor: 'text-violet-600 dark:text-violet-400'
    },
    {
      name: 'Data Table',
      route: '/components/dataTable',
      description: '🚀 Enterprise-grade data table with sorting, filtering, pagination, row selection, and export capabilities - All FREE!',
      category: 'Enterprise',
      icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z',
      bgColor: 'bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/40 dark:to-pink-900/40',
      iconColor: 'text-rose-600 dark:text-rose-400',
      isEnterprise: true
    },
    {
      name: 'Input',
      route: '/components/input',
      description: 'Text input fields with validation',
      category: 'Form',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      name: 'Breadcrumb',
      route: '/components/breadcrumb',
      description: 'Navigation hierarchy indicators',
      category: 'Navigation',
      icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400'
    },
    {
      name: 'Pagination',
      route: '/components/pagination',
      description: 'Responsive, accessible navigation for large datasets with mobile-first design and enterprise features',
      category: 'Navigation',
      icon: 'M7 16l-4-4m0 0l4-4m-4 4h18M17 8l4 4m0 0l-4 4m4-4H3',
      bgColor: 'bg-sky-100 dark:bg-sky-900/30',
      iconColor: 'text-sky-600 dark:text-sky-400'
    },
    {
      name: 'Popover',
      route: '/components/popover',
      description: 'Floating content containers with intelligent positioning, accessibility features, and beautiful animations',
      category: 'Overlay',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      name: 'Progress',
      route: '/components/progress',
      description: 'Beautiful, accessible progress indicators with Material Design animations and comprehensive customization options',
      category: 'Feedback',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      bgColor: 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      name: 'Sidebar',
      route: '/components/sidebar',
      description: 'Flexible navigation sidebars with responsive behavior, icon mode, nested navigation, and accessibility features',
      category: 'Navigation',
      icon: 'M4 6h16M4 12h8m-8 6h16',
      bgColor: 'bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-900/40 dark:to-gray-900/40',
      iconColor: 'text-slate-600 dark:text-slate-400'
    },
    {
      name: 'Input OTP',
      route: '/components/input-otp',
      description: 'One-time password input fields with automatic focus management and validation',
      category: 'Form',
      icon: 'M9 12l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z',
      bgColor: 'bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40',
      iconColor: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      name: 'Radio Group',
      route: '/components/radio-group',
      description: 'Accessible radio button groups with keyboard navigation and form integration',
      category: 'Form',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      name: 'Rating',
      route: '/components/rating',
      description: 'Interactive star rating components with half-star support, animations, keyboard navigation, and full accessibility',
      category: 'Form',
      icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
      bgColor: 'bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40',
      iconColor: 'text-amber-600 dark:text-amber-400'
    },
    {
      name: 'Select',
      route: '/components/select',
      description: 'Customizable dropdown select components with search and multi-selection options',
      category: 'Form',
      icon: 'M8 9l4-4 4 4m0 6l-4 4-4-4',
      bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      name: 'Skeleton',
      route: '/components/skeleton',
      description: 'Loading placeholders with smooth animations for improved perceived performance',
      category: 'Feedback',
      icon: 'M4 4h16v16H4V4z',
      bgColor: 'bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-900/40 dark:to-slate-900/40',
      iconColor: 'text-gray-600 dark:text-gray-400'
    },
    {
      name: 'Spinner',
      route: '/components/spinner',
      description: 'Beautiful loading indicators with multiple animation types and accessibility features',
      category: 'Feedback',
      icon: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z',
      bgColor: 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      name: 'Slider',
      route: '/components/slider',
      description: 'Range input controls with precise value selection and accessibility features',
      category: 'Form',
      icon: 'M5 12h14m-7 7V5',
      bgColor: 'bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/40 dark:to-red-900/40',
      iconColor: 'text-orange-600 dark:text-orange-400'
    },
    {
      name: 'Stepper',
      route: '/components/stepper',
      description: 'Multi-step form navigation with progress indicators and validation states',
      category: 'Navigation',
      icon: 'M9 5l7 7-7 7',
      bgColor: 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      name: 'File Upload',
      route: '/components/file-upload',
      description: 'Drag-and-drop file upload with progress tracking and validation',
      category: 'Form',
      icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
      bgColor: 'bg-gradient-to-br from-teal-100 to-green-100 dark:from-teal-900/40 dark:to-green-900/40',
      iconColor: 'text-teal-600 dark:text-teal-400'
    },
    {
      name: 'Tabs',
      route: '/components/tabs',
      description: 'Tabbed content with keyboard navigation and smooth animations',
      category: 'Navigation',
      icon: 'M8 4v16M16 4v16M4 8h16m-16 8h16',
      bgColor: 'bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40',
      iconColor: 'text-violet-600 dark:text-violet-400'
    },
    {
      name: 'Textarea',
      route: '/components/textarea',
      description: 'Multi-line text input with auto-resize and character counting',
      category: 'Form',
      icon: 'M4 6h16M4 10h16M4 14h16M4 18h16',
      bgColor: 'bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      name: 'Theme Switcher',
      route: '/components/theme-switcher',
      description: 'Dark/light theme toggle with system preference detection',
      category: 'Utility',
      icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
      bgColor: 'bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-900/40 dark:to-slate-900/40',
      iconColor: 'text-gray-600 dark:text-gray-400'
    },
    {
      name: 'Toast',
      route: '/components/toast',
      description: 'Notification messages with positioning and auto-dismiss',
      category: 'Feedback',
      icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z',
      bgColor: 'bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40',
      iconColor: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      name: 'Toggle',
      route: '/components/toggle',
      description: 'Switch controls with smooth animations and accessibility',
      category: 'Form',
      icon: 'M17 8l4 4-4 4m-6-4h9',
      bgColor: 'bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/40',
      iconColor: 'text-cyan-600 dark:text-cyan-400'
    },
    {
      name: 'Tooltip',
      route: '/components/tooltip',
      description: 'Contextual help text with smart positioning and accessibility',
      category: 'Overlay',
      icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      bgColor: 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/40 dark:to-orange-900/40',
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    },
  ];

  scrollToComponents() {
    document.getElementById('components')?.scrollIntoView({behavior: 'smooth'});
  }
}
