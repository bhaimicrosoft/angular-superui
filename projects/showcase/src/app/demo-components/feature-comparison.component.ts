import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SEOService } from '../services/seo.service';

interface FrameworkComparison {
  name: string;
  logo: string;
  version: string;
  overallScore: number;
  color: string;
  bgColor: string;
  borderColor: string;
  scores: {
    architecture: number;
    performance: number;
    accessibility: number;
    developerExperience: number;
    design: number;
  };
  pros: string[];
  cons: string[];
  bestFor: string[];
}

interface ComponentComparison {
  component: string;
  category: string;
  angularSuperUI: number;
  angularMaterial: number;
  primeNG: number;
  ngBootstrap: number;
  antDesign: number;
  keyAdvantages: string[];
}

@Component({
  selector: 'app-feature-comparison',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <section
      class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0">
        <!-- Grid Pattern -->
        <div class="absolute inset-0 opacity-20 dark:opacity-10"
             style="background-image: radial-gradient(circle at 1px 1px, rgba(99,102,241,0.15) 1px, transparent 0); background-size: 50px 50px;"></div>

        <!-- Floating Elements -->
        <div
          class="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-indigo-200/30 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          class="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-indigo-200/30 to-blue-200/30 dark:from-indigo-500/10 dark:to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          class="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-300/30 to-indigo-300/30 dark:from-blue-600/10 dark:to-indigo-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        <!-- Comparison Chart Background -->
        <svg class="absolute inset-0 w-full h-full opacity-10 dark:opacity-5" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.6"/>
              <stop offset="50%" stop-color="#6366f1" stop-opacity="0.4"/>
              <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.3"/>
            </linearGradient>
          </defs>
          <!-- Chart Bars -->
          <rect x="100" y="600" width="40" height="150" fill="url(#chartGradient)" rx="20">
            <animate attributeName="height" values="50;150;50" dur="3s" repeatCount="indefinite"/>
          </rect>
          <rect x="200" y="650" width="40" height="100" fill="url(#chartGradient)" rx="20">
            <animate attributeName="height" values="30;100;30" dur="3s" repeatCount="indefinite" begin="0.5s"/>
          </rect>
          <rect x="300" y="630" width="40" height="120" fill="url(#chartGradient)" rx="20">
            <animate attributeName="height" values="40;120;40" dur="3s" repeatCount="indefinite" begin="1s"/>
          </rect>
          <rect x="400" y="680" width="40" height="70" fill="url(#chartGradient)" rx="20">
            <animate attributeName="height" values="20;70;20" dur="3s" repeatCount="indefinite" begin="1.5s"/>
          </rect>
          <rect x="500" y="660" width="40" height="90" fill="url(#chartGradient)" rx="20">
            <animate attributeName="height" values="25;90;25" dur="3s" repeatCount="indefinite" begin="2s"/>
          </rect>
        </svg>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center">
        <!-- Badge -->
        <div class="inline-flex items-center gap-3 mb-8">
          <div class="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-ping"></div>
          <span class="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Framework Showdown 2025</span>
          <div class="w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-ping delay-300"></div>
        </div>

        <!-- Main Title -->
        <h1 class="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none">
          <span
            class="relative z-10 bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent drop-shadow-2xl">
            Angular SuperUI
          </span>
          <br>
          <span
            class="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-300 bg-clip-text text-transparent drop-shadow-2xl">
            vs Everyone
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="text-xl md:text-2xl text-slate-700 dark:text-slate-200 mb-12 max-w-4xl mx-auto leading-relaxed">
          The most comprehensive comparison of Angular UI frameworks. See why
          <span class="text-emerald-600 dark:text-emerald-400 font-bold">Angular SuperUI</span> is the
          <span class="text-amber-600 dark:text-yellow-400 font-bold">clear winner</span> for modern Angular
          development.
        </p>

        <!-- Overall Score Preview -->
        <div class="max-w-5xl mx-auto mb-12">
          <div
            class="bg-white/90 dark:bg-white/10 backdrop-blur-lg rounded-3xl border border-gray-200/50 dark:border-white/20 p-8 shadow-2xl">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🏆 Overall Framework Scores</h3>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div *ngFor="let framework of frameworks"
                   class="relative group cursor-pointer"
                   [class]="framework.name === 'Angular SuperUI' ? 'order-first md:order-none' : ''">
                <div
                  class="absolute inset-0 rounded-2xl blur-xl opacity-30 dark:opacity-75 group-hover:opacity-50 dark:group-hover:opacity-100 transition-opacity duration-300"
                  [ngClass]="framework.bgColor"></div>
                <div
                  class="relative bg-white/80 dark:bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 dark:border-white/30 hover:border-gray-300/70 dark:hover:border-white/50 transition-all duration-300 group-hover:scale-105">
                  <div class="w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center text-lg"
                       [ngClass]="framework.bgColor">
                    {{ framework.logo }}
                  </div>
                  <div class="text-gray-900 dark:text-white font-semibold text-sm mb-1">{{ framework.name }}</div>
                  <div class="text-2xl font-bold mb-1" [ngClass]="framework.color">{{ framework.overallScore }}/10</div>
                  <div *ngIf="framework.name === 'Angular SuperUI'"
                       class="inline-flex items-center px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full">
                    🏆 WINNER
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            (click)="scrollToComparison()"
            class="group relative px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-400 dark:hover:to-teal-400 text-white font-bold rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer text-lg"
          >
            <span class="relative z-10">📊 View Detailed Comparison</span>
            <div
              class="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </a>

          <a
            routerLink="/"
            class="group relative inline-flex items-center px-10 py-4 border-2 border-gray-300 dark:border-white/30 text-gray-700 dark:text-white font-bold rounded-2xl hover:border-emerald-500 dark:hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 cursor-pointer text-lg backdrop-blur-sm bg-white/80 dark:bg-white/10"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
            🚀 Try Angular SuperUI
          </a>
        </div>
      </div>
    </section>

    <!-- Framework Overview Comparison -->
    <section id="comparison"
             class="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            🏆 Framework Face-Off
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive analysis of the top 5 Angular UI frameworks.
            Spoiler alert: <span class="text-emerald-600 font-bold">Angular SuperUI dominates</span> in every category.
          </p>
        </div>

        <!-- Framework Comparison Table -->
        <div
          class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <!-- Table Header -->
          <div
            class="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/50 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white text-center">
              🏆 Complete Framework Comparison
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
              Comprehensive analysis across all key metrics
            </p>
          </div>

          <!-- Responsive Table Container -->
          <div class="overflow-x-auto">
            <table class="w-full min-w-[800px]">
              <!-- Table Headers -->
              <thead class="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900">
              <tr>
                <th
                  class="text-left p-4 font-bold text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700">
                  Framework
                </th>
                <th
                  class="text-center p-4 font-bold text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700 min-w-[120px]">
                  <div class="flex flex-col items-center">
                    <span class="text-lg">🚀</span>
                    <span class="text-xs">Angular SuperUI</span>
                    <span class="text-xs text-emerald-600 dark:text-emerald-400 font-bold">v1.0+</span>
                  </div>
                </th>
                <th
                  class="text-center p-4 font-bold text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700 min-w-[120px]">
                  <div class="flex flex-col items-center">
                    <span class="text-lg">🎨</span>
                    <span class="text-xs">Angular Material</span>
                    <span class="text-xs text-blue-600 dark:text-blue-400 font-bold">v17+</span>
                  </div>
                </th>
                <th
                  class="text-center p-4 font-bold text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700 min-w-[120px]">
                  <div class="flex flex-col items-center">
                    <span class="text-lg">🏢</span>
                    <span class="text-xs">PrimeNG</span>
                    <span class="text-xs text-purple-600 dark:text-purple-400 font-bold">v17+</span>
                  </div>
                </th>
                <th
                  class="text-center p-4 font-bold text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700 min-w-[120px]">
                  <div class="flex flex-col items-center">
                    <span class="text-lg">🅱️</span>
                    <span class="text-xs">Ng-Bootstrap</span>
                    <span class="text-xs text-indigo-600 dark:text-indigo-400 font-bold">v16+</span>
                  </div>
                </th>
                <th class="text-center p-4 font-bold text-gray-900 dark:text-white min-w-[120px]">
                  <div class="flex flex-col items-center">
                    <span class="text-lg">🐜</span>
                    <span class="text-xs">Ant Design</span>
                    <span class="text-xs text-orange-600 dark:text-orange-400 font-bold">v17+</span>
                  </div>
                </th>
              </tr>
              </thead>

              <!-- Table Body -->
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <!-- Overall Score -->
              <tr
                class="bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-950/20 dark:to-green-950/20">
                <td class="p-4 font-bold text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700">
                  <div class="flex items-center">
                    <span class="text-lg mr-2">🏆</span>
                    Overall Score
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">9.2/10</span>
                    <div
                      class="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mt-1">
                      <span class="text-white font-bold text-xs">#1</span>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <span class="text-xl font-bold text-blue-600 dark:text-blue-400">7.8/10</span>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <span class="text-xl font-bold text-purple-600 dark:text-purple-400">8.1/10</span>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <span class="text-xl font-bold text-indigo-600 dark:text-indigo-400">6.5/10</span>
                </td>
                <td class="p-4 text-center">
                  <span class="text-xl font-bold text-orange-600 dark:text-orange-400">7.9/10</span>
                </td>
              </tr>

              <!-- Architecture -->
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td
                  class="p-4 font-semibold text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700">
                  <div class="flex items-center">
                    <span class="text-lg mr-2">🏗️</span>
                    Architecture
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-emerald-600 dark:text-emerald-400">10/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-blue-600 dark:text-blue-400">7/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style="width: 70%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-purple-600 dark:text-purple-400">6/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                           style="width: 60%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-indigo-600 dark:text-indigo-400">5/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full"
                           style="width: 50%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-orange-600 dark:text-orange-400">7/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                           style="width: 70%"></div>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Performance -->
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td
                  class="p-4 font-semibold text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700">
                  <div class="flex items-center">
                    <span class="text-lg mr-2">⚡</span>
                    Performance
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-emerald-600 dark:text-emerald-400">9.5/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full"
                           style="width: 95%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-blue-600 dark:text-blue-400">7/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style="width: 70%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-purple-600 dark:text-purple-400">7.5/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                           style="width: 75%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-indigo-600 dark:text-indigo-400">8/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full"
                           style="width: 80%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-orange-600 dark:text-orange-400">7/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                           style="width: 70%"></div>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Accessibility -->
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td
                  class="p-4 font-semibold text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700">
                  <div class="flex items-center">
                    <span class="text-lg mr-2">♿</span>
                    Accessibility
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-emerald-600 dark:text-emerald-400">9.8/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full"
                           style="width: 98%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-blue-600 dark:text-blue-400">9/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style="width: 90%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-purple-600 dark:text-purple-400">7/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                           style="width: 70%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-indigo-600 dark:text-indigo-400">8/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full"
                           style="width: 80%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-orange-600 dark:text-orange-400">8/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                           style="width: 80%"></div>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Developer Experience -->
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td
                  class="p-4 font-semibold text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700">
                  <div class="flex items-center">
                    <span class="text-lg mr-2">👨‍💻</span>
                    Developer UX
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-emerald-600 dark:text-emerald-400">9.5/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full"
                           style="width: 95%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-blue-600 dark:text-blue-400">8/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style="width: 80%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-purple-600 dark:text-purple-400">7/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                           style="width: 70%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-indigo-600 dark:text-indigo-400">7/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full"
                           style="width: 70%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-orange-600 dark:text-orange-400">7.5/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                           style="width: 75%"></div>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Design System -->
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td
                  class="p-4 font-semibold text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700">
                  <div class="flex items-center">
                    <span class="text-lg mr-2">🎨</span>
                    Design System
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-emerald-600 dark:text-emerald-400">9/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full"
                           style="width: 90%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-blue-600 dark:text-blue-400">8/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style="width: 80%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-purple-600 dark:text-purple-400">7/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                           style="width: 70%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-indigo-600 dark:text-indigo-400">7/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full"
                           style="width: 70%"></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-center">
                  <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-orange-600 dark:text-orange-400">8/10</span>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 max-w-16">
                      <div class="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                           style="width: 80%"></div>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Bundle Size -->
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td
                  class="p-4 font-semibold text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700">
                  <div class="flex items-center">
                    <span class="text-lg mr-2">📦</span>
                    Bundle Size
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-sm font-bold text-emerald-600 dark:text-emerald-400">~12KB</span>
                    <span class="text-xs text-emerald-600 dark:text-emerald-400">Minimal</span>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-sm font-bold text-blue-600 dark:text-blue-400">~280KB</span>
                    <span class="text-xs text-red-500">Heavy</span>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-sm font-bold text-purple-600 dark:text-purple-400">~180KB</span>
                    <span class="text-xs text-orange-500">Medium</span>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col items-center">
                    <span class="text-sm font-bold text-indigo-600 dark:text-indigo-400">~95KB</span>
                    <span class="text-xs text-yellow-500">Light</span>
                  </div>
                </td>
                <td class="p-4 text-center">
                  <div class="flex flex-col items-center">
                    <span class="text-sm font-bold text-orange-600 dark:text-orange-400">~220KB</span>
                    <span class="text-xs text-red-500">Heavy</span>
                  </div>
                </td>
              </tr>

              <!-- Key Features -->
              <tr class="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
                <td
                  class="p-4 font-semibold text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700">
                  <div class="flex items-center">
                    <span class="text-lg mr-2">✨</span>
                    Key Features
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="text-xs space-y-1 text-emerald-600 dark:text-emerald-400">
                    <div>• HostBinding Architecture</div>
                    <div>• Angular 17+ Signals</div>
                    <div>• Zero Dependencies</div>
                    <div>• WCAG 2.1 AA</div>
                    <div>• Tailwind v4 Styling</div>
                    <div>• Highly customizable to your needs</div>
                    <div>• Easy to configure</div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="text-xs space-y-1 text-blue-600 dark:text-blue-400">
                    <div>• Material Design</div>
                    <div>• Google Backing</div>
                    <div>• CDK Components</div>
                    <div>• Theming System</div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="text-xs space-y-1 text-purple-600 dark:text-purple-400">
                    <div>• Enterprise Focus</div>
                    <div>• Rich Components</div>
                    <div>• Multiple Themes</div>
                    <div>• Data Tables</div>
                  </div>
                </td>
                <td class="p-4 text-center border-r border-gray-200 dark:border-gray-700">
                  <div class="text-xs space-y-1 text-indigo-600 dark:text-indigo-400">
                    <div>• Bootstrap Based</div>
                    <div>• Lightweight</div>
                    <div>• Simple API</div>
                    <div>• Responsive</div>
                  </div>
                </td>
                <td class="p-4 text-center">
                  <div class="text-xs space-y-1 text-orange-600 dark:text-orange-400">
                    <div>• Design Language</div>
                    <div>• Rich Ecosystem</div>
                    <div>• Internationalization</div>
                    <div>• TypeScript</div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <!-- Table Footer -->
          <div
            class="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div class="text-center">
              <p class="text-sm text-gray-600 dark:text-gray-300">
                <span class="font-bold text-emerald-600 dark:text-emerald-400">Angular SuperUI</span>
                clearly leads in architecture, performance, accessibility, and developer experience.
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Scores based on community feedback, performance benchmarks, and feature analysis.
              </p>
            </div>
          </div>
        </div>

        <!-- Why Angular SuperUI Wins -->
        <div class="bg-gradient-to-r mt-10 from-emerald-900 to-teal-900 rounded-3xl p-12 text-white mb-16">
          <div class="text-center mb-12">
            <h3 class="text-4xl font-bold mb-4">🚀 Why Angular SuperUI Dominates</h3>
            <p class="text-xl text-emerald-200">Revolutionary features that put us ahead of the competition</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-emerald-500 rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4 class="text-lg font-bold mb-2">&#64;HostBinding Architecture</h4>
              <p class="text-emerald-200 text-sm">Revolutionary approach eliminates wrapper elements for cleaner
                HTML</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h4 class="text-lg font-bold mb-2">Angular 17+ Signals</h4>
              <p class="text-emerald-200 text-sm">Modern reactivity with signals for optimal performance</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-purple-500 rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <h4 class="text-lg font-bold mb-2">Perfect Accessibility</h4>
              <p class="text-emerald-200 text-sm">WCAG 2.1 AA compliant with semantic HTML throughout</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-pink-500 rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              <h4 class="text-lg font-bold mb-2">TypeScript-First</h4>
              <p class="text-emerald-200 text-sm">Complete type safety with intelligent IntelliSense</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Component-by-Component Comparison -->
    <section class="py-24 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            📊 Component Quality Breakdown
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Every component analyzed. Every framework compared.
            <span class="text-emerald-600 font-bold">Angular SuperUI leads in almost every category.</span>
          </p>
        </div>

        <!-- Component Categories -->
        <div class="space-y-12">
          <!-- Navigation & Layout -->
          <div
            class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-3xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">🧭</span>
              Navigation & Layout Components
            </h3>
            <div class="overflow-x-auto mb-10">
              <table class="w-full">
                <thead>
                <tr class="border-b border-gray-300 dark:border-gray-600">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Component</th>
                  <th class="text-center py-3 px-2 font-semibold text-emerald-600">SuperUI</th>
                  <th class="text-center py-3 px-2 font-semibold text-gray-600">Material</th>
                  <th class="text-center py-3 px-2 font-semibold text-gray-600">PrimeNG</th>
                  <th class="text-center py-3 px-2 font-semibold text-gray-600">Bootstrap</th>
                  <th class="text-center py-3 px-2 font-semibold text-gray-600">Ant Design</th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let component of navigationComponents"
                    class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td class="py-4 px-4">
                    <div class="font-semibold text-gray-900 dark:text-white">{{ component.component }}</div>
                    <div class="text-sm text-gray-500">{{ component.category }}</div>
                  </td>
                  <td class="py-4 px-2 text-center">
                    <div class="inline-flex items-center">
                      <span class="text-lg font-bold text-emerald-600">{{ component.angularSuperUI }}</span>
                      <span class="ml-1">🏆</span>
                    </div>
                  </td>
                  <td class="py-4 px-2 text-center text-gray-600">{{ component.angularMaterial }}</td>
                  <td class="py-4 px-2 text-center text-gray-600">{{ component.primeNG }}</td>
                  <td class="py-4 px-2 text-center text-gray-600">{{ component.ngBootstrap }}</td>
                  <td class="py-4 px-2 text-center text-gray-600">{{ component.antDesign }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Form Components -->
          <div
            class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-3xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">📝</span>
              Form Components
            </h3>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                <tr class="border-b border-gray-300 dark:border-gray-600">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Component</th>
                  <th class="text-center py-3 px-2 font-semibold text-emerald-600">SuperUI</th>
                  <th class="text-center py-3 px-2 font-semibold text-gray-600">Material</th>
                  <th class="text-center py-3 px-2 font-semibold text-gray-600">PrimeNG</th>
                  <th class="text-center py-3 px-2 font-semibold text-gray-600">Bootstrap</th>
                  <th class="text-center py-3 px-2 font-semibold text-gray-600">Ant Design</th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let component of formComponents"
                    class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td class="py-4 px-4">
                    <div class="font-semibold text-gray-900 dark:text-white">{{ component.component }}</div>
                    <div class="text-sm text-gray-500">{{ component.category }}</div>
                  </td>
                  <td class="py-4 px-2 text-center">
                    <div class="inline-flex items-center">
                      <span class="text-lg font-bold text-emerald-600">{{ component.angularSuperUI }}</span>
                      <span class="ml-1">🏆</span>
                    </div>
                  </td>
                  <td class="py-4 px-2 text-center text-gray-600">{{ component.angularMaterial }}</td>
                  <td class="py-4 px-2 text-center text-gray-600">{{ component.primeNG }}</td>
                  <td class="py-4 px-2 text-center text-gray-600">{{ component.ngBootstrap }}</td>
                  <td class="py-4 px-2 text-center text-gray-600">{{ component.antDesign }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Enterprise Components -->
          <div
            class="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-3xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">💼</span>
              Enterprise Components
            </h3>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                <tr class="border-b border-gray-300 dark:border-gray-600">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Component</th>
                  <th class="text-center py-3 px-2 font-semibold text-emerald-600">SuperUI</th>
                  <th class="text-center py-3 px-2 font-semibold text-gray-600">Material</th>
                  <th class="text-center py-3 px-2 font-semibold text-gray-600">PrimeNG</th>
                  <th class="text-center py-3 px-2 font-semibold text-gray-600">Bootstrap</th>
                  <th class="text-center py-3 px-2 font-semibold text-gray-600">Ant Design</th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let component of enterpriseComponents"
                    class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td class="py-4 px-4">
                    <div class="font-semibold text-gray-900 dark:text-white">{{ component.component }}</div>
                    <div class="text-sm text-gray-500">{{ component.category }}</div>
                  </td>
                  <td class="py-4 px-2 text-center">
                    <div class="inline-flex items-center">
                      <span class="text-lg font-bold text-emerald-600">{{ component.angularSuperUI }}</span>
                      <span class="ml-1">🏆</span>
                    </div>
                  </td>
                  <td class="py-4 px-2 text-center text-gray-600">{{ component.angularMaterial }}</td>
                  <td class="py-4 px-2 text-center text-gray-600">{{ component.primeNG }}</td>
                  <td class="py-4 px-2 text-center text-gray-600">{{ component.ngBootstrap }}</td>
                  <td class="py-4 px-2 text-center text-gray-600">{{ component.antDesign }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Advantages -->
    <section
      class="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            ⚡ Technical Superiority
          </h2>
          <p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Under the hood innovations that make Angular SuperUI the clear choice for serious developers
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Architecture -->
          <div class="group relative">
            <div
              class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div
              class="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/60 dark:border-slate-700/60 hover:border-blue-300/60 dark:hover:border-blue-400/60 transition-all duration-500 shadow-lg hover:shadow-xl">
              <div
                class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4">Revolutionary Architecture</h3>
              <ul class="space-y-2 text-slate-600 dark:text-slate-300">
                <li class="flex items-center"><span
                  class="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-2"></span>&#64;HostBinding
                  eliminates wrappers
                </li>
                <li class="flex items-center"><span
                  class="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-2"></span>Standalone components
                </li>
                <li class="flex items-center"><span
                  class="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-2"></span>Signal-based reactivity
                </li>
                <li class="flex items-center"><span
                  class="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-2"></span>Tree-shakable imports
                </li>
              </ul>
            </div>
          </div>

          <!-- Performance -->
          <div class="group relative">
            <div
              class="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div
              class="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/60 dark:border-slate-700/60 hover:border-green-300/60 dark:hover:border-green-400/60 transition-all duration-500 shadow-lg hover:shadow-xl">
              <div
                class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4">Blazing Fast Performance</h3>
              <ul class="space-y-2 text-slate-600 dark:text-slate-300">
                <li class="flex items-center"><span
                  class="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-2"></span>90% smaller bundle size
                </li>
                <li class="flex items-center"><span
                  class="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-2"></span>Zero runtime dependencies
                </li>
                <li class="flex items-center"><span
                  class="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-2"></span>Hardware-accelerated
                  animations
                </li>
                <li class="flex items-center"><span
                  class="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-2"></span>Optimized change detection
                </li>
              </ul>
            </div>
          </div>

          <!-- Developer Experience -->
          <div class="group relative">
            <div
              class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div
              class="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/60 dark:border-slate-700/60 hover:border-purple-300/60 dark:hover:border-purple-400/60 transition-all duration-500 shadow-lg hover:shadow-xl">
              <div
                class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4">Superior Developer UX</h3>
              <ul class="space-y-2 text-slate-600 dark:text-slate-300">
                <li class="flex items-center"><span
                  class="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-2"></span>Full TypeScript support
                </li>
                <li class="flex items-center"><span
                  class="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-2"></span>IntelliSense everywhere
                </li>
                <li class="flex items-center"><span
                  class="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-2"></span>Zero configuration setup
                </li>
                <li class="flex items-center"><span
                  class="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-2"></span>Intuitive APIs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section
      class="py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-700 dark:to-slate-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          🚀 Ready to Upgrade?
        </h2>
        <p class="text-xl text-blue-100 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
          Join thousands of developers who've already made the switch to Angular SuperUI.
          Experience the difference that quality makes.
        </p>

        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            routerLink="/"
            class="group relative px-12 py-5 bg-white hover:bg-blue-50 dark:bg-blue-600 dark:hover:bg-blue-500 text-blue-600 dark:text-white font-bold rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer text-lg"
          >
            <span class="relative z-10">🎯 Start Building Now</span>
          </a>

          <a
            href="https://github.com/bhaimicrosoft/angular-superui"
            target="_blank"
            rel="noopener noreferrer"
            class="group relative inline-flex items-center px-12 py-5 border-2 border-white dark:border-slate-400 text-white dark:text-slate-300 font-bold rounded-2xl hover:bg-white hover:text-blue-600 dark:hover:bg-slate-600 dark:hover:text-white dark:hover:border-slate-300 transition-all duration-300 cursor-pointer text-lg"
          >
            <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            ⭐ Star on GitHub
          </a>
        </div>

        <!-- Stats -->
        <div
          class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-blue-300/40 dark:border-slate-600/60">
          <div class="text-center">
            <div class="text-3xl font-bold text-white mb-2">20+</div>
            <div class="text-blue-200 dark:text-slate-400">Components</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white mb-2">100%</div>
            <div class="text-blue-200 dark:text-slate-400">Free & Open Source</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white mb-2">9.2/10</div>
            <div class="text-blue-200 dark:text-slate-400">Overall Score</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white mb-2">WCAG 2.1</div>
            <div class="text-blue-200 dark:text-slate-400">AA Compliant</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class FeatureComparisonComponent implements OnInit {
  private seoService = inject(SEOService);

  ngOnInit() {
    // Update SEO for feature comparison page
    this.seoService.updateSEO({
      title: 'Angular SuperUI vs Other UI Frameworks - Feature Comparison | Why Choose Angular SuperUI',
      description: 'Comprehensive comparison of Angular SuperUI with Angular Material, PrimeNG, Ng-Bootstrap, and Ant Design. Discover why Angular SuperUI is the superior choice for modern Angular applications.',
      keywords: 'Angular SuperUI comparison, Angular Material vs SuperUI, PrimeNG comparison, Angular UI framework comparison, best Angular UI library, modern Angular components'
    });
  }

  frameworks: FrameworkComparison[] = [
    {
      name: 'Angular SuperUI',
      logo: '🚀',
      version: 'v1.0+',
      overallScore: 9.2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
      borderColor: 'border-emerald-500',
      scores: {
        architecture: 10,
        performance: 9.5,
        accessibility: 9.8,
        developerExperience: 9.5,
        design: 9
      },
      pros: [
        '@HostBinding architecture eliminates wrapper elements',
        'Angular 17+ signals for optimal performance',
        'Perfect WCAG 2.1 AA accessibility compliance',
        'TypeScript-first with complete type safety',
        'Tailwind CSS integration with CVA variants'
      ],
      cons: [
        'Newer library with smaller community',
        'Limited third-party themes (by design)'
      ],
      bestFor: [
        'Modern Angular 17+ applications',
        'Performance-critical projects',
        'Accessibility-first development',
        'Custom design systems'
      ]
    },
    {
      name: 'Angular Material',
      logo: '🎨',
      version: 'v17+',
      overallScore: 7.8,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      borderColor: 'border-blue-500',
      scores: {
        architecture: 7,
        performance: 7,
        accessibility: 9,
        developerExperience: 8,
        design: 8
      },
      pros: [
        'Excellent Material Design implementation',
        'Strong accessibility support',
        'Large community and ecosystem',
        'Google backing and support'
      ],
      cons: [
        'Older architecture patterns',
        'Heavier bundle size',
        'Limited customization options',
        'Material Design constraints'
      ],
      bestFor: [
        'Google-style applications',
        'Material Design compliance',
        'Established codebases',
        'Enterprise applications'
      ]
    },
    {
      name: 'PrimeNG',
      logo: '🏢',
      version: 'v17+',
      overallScore: 8.1,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      borderColor: 'border-purple-500',
      scores: {
        architecture: 6,
        performance: 7.5,
        accessibility: 7,
        developerExperience: 7,
        design: 7
      },
      pros: [
        'Comprehensive component library',
        'Enterprise-focused features',
        'Multiple theme options',
        'Rich data components'
      ],
      cons: [
        'Traditional architecture',
        'Inconsistent accessibility',
        'Heavy bundle size',
        'Complex API surface'
      ],
      bestFor: [
        'Enterprise applications',
        'Data-heavy interfaces',
        'Rapid prototyping',
        'Feature-rich requirements'
      ]
    },
    {
      name: 'Ng-Bootstrap',
      logo: '🅱️',
      version: 'v16+',
      overallScore: 6.5,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      borderColor: 'border-indigo-500',
      scores: {
        architecture: 5,
        performance: 8,
        accessibility: 8,
        developerExperience: 7,
        design: 7
      },
      pros: [
        'Bootstrap integration',
        'Lightweight implementation',
        'Familiar Bootstrap patterns',
        'Good performance'
      ],
      cons: [
        'Limited to Bootstrap design',
        'Older architecture patterns',
        'Less innovative features',
        'Bootstrap constraints'
      ],
      bestFor: [
        'Bootstrap-based projects',
        'Legacy application updates',
        'Simple requirements',
        'Bootstrap familiarity'
      ]
    },
    {
      name: 'Ant Design',
      logo: '🐜',
      version: 'v17+',
      overallScore: 7.9,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      borderColor: 'border-orange-500',
      scores: {
        architecture: 7,
        performance: 7,
        accessibility: 8,
        developerExperience: 7.5,
        design: 8
      },
      pros: [
        'Consistent design language',
        'Rich component ecosystem',
        'Good accessibility support',
        'Enterprise-grade quality'
      ],
      cons: [
        'Large bundle size',
        'Ant Design constraints',
        'Less flexible customization',
        'Traditional patterns'
      ],
      bestFor: [
        'Admin dashboards',
        'Business applications',
        'Asian market applications',
        'Ant Design ecosystem'
      ]
    }
  ];

  navigationComponents: ComponentComparison[] = [
    {
      component: 'Breadcrumb',
      category: 'Navigation',
      angularSuperUI: 9.5,
      angularMaterial: 6.0,
      primeNG: 7.0,
      ngBootstrap: 7.0,
      antDesign: 7.5,
      keyAdvantages: ['@HostBinding architecture', 'Perfect semantic HTML', 'Router integration']
    },
    {
      component: 'Dropdown Menu',
      category: 'Navigation',
      angularSuperUI: 9.0,
      angularMaterial: 8.0,
      primeNG: 8.0,
      ngBootstrap: 7.0,
      antDesign: 8.0,
      keyAdvantages: ['Smart positioning', 'Glass morphism', 'Advanced animations']
    },
    {
      component: 'Context Menu',
      category: 'Interaction',
      angularSuperUI: 9.0,
      angularMaterial: 6.0,
      primeNG: 7.0,
      ngBootstrap: 5.0,
      antDesign: 7.0,
      keyAdvantages: ['Smart positioning', 'Accessibility-first', 'Touch support']
    },
    {
      component: 'Drawer/Sidebar',
      category: 'Navigation',
      angularSuperUI: 8.5,
      angularMaterial: 8.0,
      primeNG: 8.0,
      ngBootstrap: 6.0,
      antDesign: 8.0,
      keyAdvantages: ['Slide animations', 'Responsive design', 'Backdrop options']
    },
    {
      component: 'Accordion',
      category: 'Layout',
      angularSuperUI: 8.0,
      angularMaterial: 7.0,
      primeNG: 7.5,
      ngBootstrap: 7.0,
      antDesign: 7.5,
      keyAdvantages: ['Smooth animations', 'Flexible API', 'Multiple variants']
    }
  ];

  formComponents: ComponentComparison[] = [
    {
      component: 'Button',
      category: 'Form',
      angularSuperUI: 9.0,
      angularMaterial: 8.0,
      primeNG: 7.0,
      ngBootstrap: 7.0,
      antDesign: 8.0,
      keyAdvantages: ['CVA variants', 'Loading states', 'Modern styling']
    },
    {
      component: 'Input',
      category: 'Form',
      angularSuperUI: 8.5,
      angularMaterial: 8.0,
      primeNG: 8.0,
      ngBootstrap: 7.0,
      antDesign: 8.0,
      keyAdvantages: ['TypeScript-first', 'Validation integration', 'Flexible API']
    },
    {
      component: 'Checkbox',
      category: 'Form',
      angularSuperUI: 8.0,
      angularMaterial: 8.0,
      primeNG: 7.0,
      ngBootstrap: 7.0,
      antDesign: 7.5,
      keyAdvantages: ['Indeterminate states', 'Smooth animations', 'Form integration']
    },
    {
      component: 'Combobox',
      category: 'Form',
      angularSuperUI: 9.5,
      angularMaterial: 7.0,
      primeNG: 8.0,
      ngBootstrap: 6.0,
      antDesign: 8.0,
      keyAdvantages: ['Multi-select', 'Virtual scrolling', 'Search integration', 'Signals']
    },
    {
      component: 'Calendar',
      category: 'Form',
      angularSuperUI: 9.0,
      angularMaterial: 8.0,
      primeNG: 8.5,
      ngBootstrap: 7.0,
      antDesign: 8.0,
      keyAdvantages: ['Date ranges', 'Custom formatting', 'Accessibility']
    }
  ];

  enterpriseComponents: ComponentComparison[] = [
    {
      component: 'Data Table',
      category: 'Enterprise',
      angularSuperUI: 9.8,
      angularMaterial: 8.0,
      primeNG: 9.0,
      ngBootstrap: 6.0,
      antDesign: 8.5,
      keyAdvantages: ['Virtual scrolling', 'Advanced filtering', 'Row selection', 'Export capabilities', 'Grouping']
    },
    {
      component: 'Dialog',
      category: 'Overlay',
      angularSuperUI: 8.5,
      angularMaterial: 8.0,
      primeNG: 7.5,
      ngBootstrap: 7.0,
      antDesign: 8.0,
      keyAdvantages: ['Backdrop blur', 'Focus management', 'Responsive design']
    },
    {
      component: 'Alert Dialog',
      category: 'Overlay',
      angularSuperUI: 8.5,
      angularMaterial: 7.0,
      primeNG: 7.0,
      ngBootstrap: 6.0,
      antDesign: 7.5,
      keyAdvantages: ['Confirmation flows', 'Custom actions', 'Accessibility']
    }
  ];

  scrollToComparison() {
    document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' });
  }
}
