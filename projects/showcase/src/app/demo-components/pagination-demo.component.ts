import {Component, DOCUMENT, Inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Pagination} from '@lib/components/pagination';
import {Badge} from '@lib/components/badge';
import {LucideAngularModule,} from 'lucide-angular';

interface DataItem {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

@Component({
  selector: 'app-pagination-demo',
  standalone: true,
  imports: [
    CommonModule,
    Pagination,
    Badge,
    LucideAngularModule
  ],
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <!-- SEO and Accessibility Improvements -->
      <header class="sr-only">
        <h1>Angular Pagination Component Demo</h1>
        <p>Interactive demonstration of a responsive, accessible pagination component built with Angular signals,
          featuring customizable icons, sizes, and responsive design.</p>
      </header>

      <div class="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        <div class="max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-12">

          <!-- Header -->
          <section class="text-center space-y-4 lg:space-y-6" role="banner">
            <div
              class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg">
              <div class="h-2 w-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"
                   aria-hidden="true"></div>
              <span class="text-sm font-medium text-slate-600 dark:text-slate-400">UI Component Library</span>
            </div>

            <h1
              class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent pb-8">
              Pagination Component
            </h1>

            <p
              class="text-sm sm:text-base lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed px-4">
              A beautiful, accessible, and highly customizable pagination component built with Angular signals.
              Perfect for data tables, search results, and content navigation across all screen sizes.
            </p>
          </section>

          <!-- Basic Examples -->
          <section class="space-y-4 sm:space-y-6 lg:space-y-8" role="main" aria-labelledby="basic-usage-heading">
            <div class="flex items-center gap-3 px-4 sm:px-0">
              <div class="h-6 sm:h-8 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"
                   aria-hidden="true"></div>
              <h2 id="basic-usage-heading"
                  class="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200">
                Basic Usage
              </h2>
            </div>

            <div
              class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-xl lg:rounded-2xl xl:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/20 dark:border-slate-700/50 mx-4 sm:mx-0">
              <div class="space-y-6 sm:space-y-8 lg:space-y-12">

                <!-- Default Size -->
                <article class="space-y-3 sm:space-y-4 lg:space-y-6">
                  <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-slate-700 dark:text-slate-300">Default
                      Size</h3>
                    <div class="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      <div class="h-2 w-2 bg-green-500 rounded-full" aria-hidden="true"></div>
                      <span>Standard pagination with all features</span>
                    </div>
                  </div>

                  <div class="w-full">
                    <Pagination
                      [totalItems]="1000"
                      [itemsPerPage]="10"
                      [currentPage]="basicCurrentPage()"
                      [showFirstLast]="true"
                      [showInfo]="true"
                      (pageChange)="basicCurrentPage.set($event)"
                    />
                  </div>
                </article>

                <!-- Small Size -->
                <article class="space-y-3 sm:space-y-4 lg:space-y-6">
                  <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-slate-700 dark:text-slate-300">Small
                      Size</h3>
                    <div class="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      <div class="h-2 w-2 bg-blue-500 rounded-full" aria-hidden="true"></div>
                      <span>Compact design for dense layouts</span>
                    </div>
                  </div>

                  <div class="w-full">
                    <Pagination
                      [totalItems]="500"
                      [itemsPerPage]="20"
                      [currentPage]="smallCurrentPage()"
                      [size]="'sm'"
                      [showFirstLast]="true"
                      (pageChange)="smallCurrentPage.set($event)"
                    />
                  </div>
                </article>

                <!-- Large Size -->
                <article class="space-y-3 sm:space-y-4 lg:space-y-6">
                  <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-slate-700 dark:text-slate-300">Large
                      Size</h3>
                    <div class="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      <div class="h-2 w-2 bg-purple-500 rounded-full" aria-hidden="true"></div>
                      <span>Enhanced visibility for important navigation</span>
                    </div>
                  </div>

                  <div class="w-full">
                    <Pagination
                      [totalItems]="2000"
                      [itemsPerPage]="25"
                      [currentPage]="largeCurrentPage()"
                      [size]="'lg'"
                      [showFirstLast]="true"
                      [showInfo]="true"
                      (pageChange)="largeCurrentPage.set($event)"
                    />
                  </div>
                </article>

              </div>
            </div>
          </section>

          <!-- Data Table Example -->
          <section class="space-y-4 sm:space-y-6 lg:space-y-8" aria-labelledby="data-table-heading">
            <div class="flex items-center gap-3 px-4 sm:px-0">
              <div class="h-6 sm:h-8 w-1 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full"
                   aria-hidden="true"></div>
              <h2 id="data-table-heading"
                  class="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200">
                Data Table Integration
              </h2>
            </div>

            <div
              class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-xl lg:rounded-2xl xl:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/20 dark:border-slate-700/50 mx-4 sm:mx-0">
              <div class="space-y-4 sm:space-y-6 lg:space-y-8">

                <!-- Controls -->
                <div
                  class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 p-3 sm:p-4 bg-slate-50/80 dark:bg-slate-900/50 rounded-lg sm:rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                  <div class="flex items-center gap-2 sm:gap-3">
                    <span
                      class="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">Items per page:</span>
                    <select
                      [value]="tableItemsPerPage()"
                      (change)="onItemsPerPageChange($event)"
                      class="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-600 rounded-md sm:rounded-lg bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      aria-label="Select items per page"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                    </select>
                  </div>

                  <div class="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    <div class="h-2 w-2 bg-emerald-500 rounded-full" aria-hidden="true"></div>
                    <span>{{ mockData.length }} total records</span>
                  </div>
                </div>

                <!-- Table Container -->
                <div
                  class="overflow-hidden rounded-lg sm:rounded-xl border border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm">
                  <div class="overflow-x-auto">
                    <table class="w-full min-w-[640px]" role="table" aria-label="User data table">
                      <thead class="bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm">
                      <tr>
                        <th scope="col"
                            class="text-left p-3 sm:p-4 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200/50 dark:border-slate-700/50 text-xs sm:text-sm">
                          ID
                        </th>
                        <th scope="col"
                            class="text-left p-3 sm:p-4 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200/50 dark:border-slate-700/50 text-xs sm:text-sm">
                          Name
                        </th>
                        <th scope="col"
                            class="text-left p-3 sm:p-4 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200/50 dark:border-slate-700/50 text-xs sm:text-sm">
                          Email
                        </th>
                        <th scope="col"
                            class="text-left p-3 sm:p-4 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200/50 dark:border-slate-700/50 text-xs sm:text-sm">
                          Role
                        </th>
                        <th scope="col"
                            class="text-left p-3 sm:p-4 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200/50 dark:border-slate-700/50 text-xs sm:text-sm">
                          Status
                        </th>
                        <th scope="col"
                            class="text-left p-3 sm:p-4 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200/50 dark:border-slate-700/50 text-xs sm:text-sm">
                          Join Date
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                        @for (item of getCurrentPageData(); track item.id) {
                          <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                            <td
                              class="p-3 sm:p-4 text-slate-900 dark:text-slate-100 border-b border-slate-200/30 dark:border-slate-700/30 font-mono text-xs sm:text-sm">
                              #{{ item.id }}
                            </td>
                            <td
                              class="p-3 sm:p-4 text-slate-900 dark:text-slate-100 border-b border-slate-200/30 dark:border-slate-700/30 font-medium text-xs sm:text-sm">
                              {{ item.name }}
                            </td>
                            <td
                              class="p-3 sm:p-4 text-slate-600 dark:text-slate-400 border-b border-slate-200/30 dark:border-slate-700/30 text-xs sm:text-sm">
                              <span class="block truncate max-w-[120px] sm:max-w-none"
                                    [title]="item.email">{{ item.email }}</span>
                            </td>
                            <td
                              class="p-3 sm:p-4 text-slate-600 dark:text-slate-400 border-b border-slate-200/30 dark:border-slate-700/30 text-xs sm:text-sm">
                              {{ item.role }}
                            </td>
                            <td class="p-3 sm:p-4 border-b border-slate-200/30 dark:border-slate-700/30">
                              <Badge
                                [variant]="item.status === 'active' ? 'default' : item.status === 'pending' ? 'secondary' : 'destructive'"
                              >
                                {{ item.status }}
                              </Badge>
                            </td>
                            <td
                              class="p-3 sm:p-4 text-slate-600 dark:text-slate-400 border-b border-slate-200/30 dark:border-slate-700/30 text-xs sm:text-sm">
                              {{ item.joinDate }}
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Pagination -->
                <div class="w-full pt-2 sm:pt-4">
                  <Pagination
                    [totalItems]="mockData.length"
                    [itemsPerPage]="tableItemsPerPage()"
                    [currentPage]="tableCurrentPage()"
                    [maxVisiblePages]="7"
                    [showFirstLast]="true"
                    [showInfo]="true"
                    (pageChange)="tableCurrentPage.set($event)"
                  />
                </div>

              </div>
            </div>
          </section>

          <!-- Configuration Examples -->
          <section class="space-y-4 sm:space-y-6 lg:space-y-8" aria-labelledby="config-heading">
            <div class="flex items-center gap-3 px-4 sm:px-0">
              <div class="h-6 sm:h-8 w-1 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"
                   aria-hidden="true"></div>
              <h2 id="config-heading"
                  class="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200">
                Configuration Options
              </h2>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 md:grid-cols-2 mx-4 sm:mx-0">

              <!-- Few Pages -->
              <article
                class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20 dark:border-slate-700/50">
                <div class="space-y-3 sm:space-y-4 lg:space-y-6">
                  <div class="flex items-center gap-3">
                    <div class="h-3 w-3 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                         aria-hidden="true"></div>
                    <h3 class="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-300">Few Pages</h3>
                  </div>

                  <div class="w-full">
                    <Pagination
                      [totalItems]="50"
                      [itemsPerPage]="10"
                      [currentPage]="fewPagesCurrentPage()"
                      [showFirstLast]="false"
                      (pageChange)="fewPagesCurrentPage.set($event)"
                    />
                  </div>

                  <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center">
                    5 pages total - shows all pages without ellipsis
                  </p>
                </div>
              </article>

              <!-- Many Pages -->
              <article
                class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20 dark:border-slate-700/50">
                <div class="space-y-3 sm:space-y-4 lg:space-y-6">
                  <div class="flex items-center gap-3">
                    <div class="h-3 w-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                         aria-hidden="true"></div>
                    <h3 class="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-300">Many Pages</h3>
                  </div>

                  <div class="w-full">
                    <Pagination
                      [totalItems]="10000"
                      [itemsPerPage]="10"
                      [currentPage]="manyPagesCurrentPage()"
                      [maxVisiblePages]="5"
                      [showFirstLast]="true"
                      (pageChange)="manyPagesCurrentPage.set($event)"
                    />
                  </div>

                  <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center">
                    1000 pages total - smart ellipsis handling
                  </p>
                </div>
              </article>

            </div>
          </section>

          <!-- Feature Examples -->
          <section class="space-y-4 sm:space-y-6 lg:space-y-8" aria-labelledby="features-heading">
            <div class="flex items-center gap-3 px-4 sm:px-0">
              <div class="h-6 sm:h-8 w-1 bg-gradient-to-b from-rose-500 to-rose-600 rounded-full"
                   aria-hidden="true"></div>
              <h2 id="features-heading"
                  class="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200">
                Feature Showcase
              </h2>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 md:grid-cols-2 mx-4 sm:mx-0">

              <!-- With Info Display -->
              <article
                class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20 dark:border-slate-700/50">
                <div class="space-y-3 sm:space-y-4 lg:space-y-6">
                  <div class="flex items-center gap-3">
                    <div class="h-3 w-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                         aria-hidden="true"></div>
                    <h3 class="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-300">With Result
                      Info</h3>
                  </div>

                  <div class="w-full">
                    <Pagination
                      [totalItems]="1234"
                      [itemsPerPage]="10"
                      [currentPage]="infoCurrentPage()"
                      [showInfo]="true"
                      [showFirstLast]="true"
                      (pageChange)="infoCurrentPage.set($event)"
                    />
                  </div>

                  <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center">
                    Displays current result range and total count
                  </p>
                </div>
              </article>

              <!-- Icon Only (No Labels) -->
              <article
                class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20 dark:border-slate-700/50">
                <div class="space-y-3 sm:space-y-4 lg:space-y-6">
                  <div class="flex items-center gap-3">
                    <div class="h-3 w-3 bg-gradient-to-r from-violet-400 to-violet-500 rounded-full"
                         aria-hidden="true"></div>
                    <h3 class="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-300">Compact Mode</h3>
                  </div>

                  <div class="w-full">
                    <Pagination
                      [totalItems]="500"
                      [itemsPerPage]="25"
                      [currentPage]="iconCurrentPage()"
                      [showLabels]="false"
                      [showFirstLast]="true"
                      [size]="'sm'"
                      (pageChange)="iconCurrentPage.set($event)"
                    />
                  </div>

                  <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center">
                    Icons only for minimal space usage
                  </p>
                </div>
              </article>

            </div>
          </section>

          <!-- Documentation Link Section -->
          <section class="space-y-4 sm:space-y-6 lg:space-y-8 mx-4 sm:mx-0">
            <div
              class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 backdrop-blur-xl rounded-xl lg:rounded-2xl xl:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-blue-200/50 dark:border-blue-800/50 text-center">
              <div class="space-y-4 sm:space-y-6">

                <!-- Icon and Header -->
                <div class="flex flex-col items-center gap-4">
                  <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                  </div>

                  <div>
                    <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                      Complete Documentation
                    </h2>
                    <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                      Explore the comprehensive documentation with detailed API reference, advanced usage examples,
                      accessibility guidelines, and best practices for implementing the Pagination component.
                    </p>
                  </div>
                </div>

                <!-- Features List -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
                  <div class="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    <div class="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span>API Reference</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    <div class="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>Code Examples</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    <div class="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <span>Best Practices</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    <div class="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <span>TypeScript Types</span>
                  </div>
                </div>

                <!-- Documentation Button -->
                <div class="pt-2">
                  <a
                    href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/pagination.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                  >
                    <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <span>View Full Documentation</span>
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </a>
                </div>

                <!-- Additional Info -->
                <div class="pt-2 text-xs text-slate-500 dark:text-slate-400">
                  <span class="inline-flex items-center gap-1">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    Free • Open Source • MIT License
                  </span>
                </div>

              </div>
            </div>
          </section>

          <!-- Footer -->
          <div class="text-center py-8">
            <div
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
              <div class="h-2 w-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
              <span class="text-sm text-slate-600 dark:text-slate-400">
              Built with Angular {{ angularVersion }} & Tailwind CSS
            </span>
            </div>
          </div>

        </div>
      </div>
    </div>`,
  styleUrls: []
})
export class PaginationDemoComponent implements OnInit {
  // Signal for page states
  basicCurrentPage = signal(1);
  smallCurrentPage = signal(3);
  largeCurrentPage = signal(1);
  tableCurrentPage = signal(1);
  fewPagesCurrentPage = signal(2);
  manyPagesCurrentPage = signal(451);
  infoCurrentPage = signal(5);
  iconCurrentPage = signal(8);
  defaultIconsCurrentPage = signal(3);

  // Signal for table items per page
  tableItemsPerPage = signal(10);

  // Angular version for the footer
  angularVersion = '18+';

  // Mock data for the table example
  mockData: DataItem[] = this.generateMockData();

  constructor(@Inject(DOCUMENT) private document: Document) {
    // Set some interesting starting pages
    this.basicCurrentPage.set(5);
    this.smallCurrentPage.set(8);
    this.largeCurrentPage.set(15);
    this.manyPagesCurrentPage.set(451);
    this.infoCurrentPage.set(67);
    this.iconCurrentPage.set(8);
  }

  ngOnInit(): void {
    this.addStructuredData();
  }

  getCurrentPageData(): DataItem[] {
    const startIndex = (this.tableCurrentPage() - 1) * this.tableItemsPerPage();
    const endIndex = startIndex + this.tableItemsPerPage();
    return this.mockData.slice(startIndex, endIndex);
  }

  onItemsPerPageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.tableItemsPerPage.set(Number(target.value));
    this.tableCurrentPage.set(1); // Reset to first page when changing items per page
  }

  getStartItem(): number {
    return (this.tableCurrentPage() - 1) * this.tableItemsPerPage() + 1;
  }

  getEndItem(): number {
    const end = this.tableCurrentPage() * this.tableItemsPerPage();
    return Math.min(end, this.mockData.length);
  }

  private addStructuredData(): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Angular Pagination Component",
      "description": "A responsive, accessible pagination component built with Angular signals, featuring customizable icons, sizes, and SEO-friendly design.",
      "applicationCategory": "WebApplication",
      "operatingSystem": "Cross-platform",
      "programmingLanguage": "TypeScript",
      "author": {
        "@type": "Organization",
        "name": "Angular SuperUI"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Responsive design for all screen sizes",
        "Accessible navigation with ARIA support",
        "Customizable icons and styling",
        "Angular signals integration",
        "SEO-friendly structure"
      ]
    };

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    this.document.head.appendChild(script);
  }

  private generateMockData(): DataItem[] {
    const data: DataItem[] = [];
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'James', 'Ashley', 'Robert', 'Jessica',
      'William', 'Amanda', 'Daniel', 'Lisa', 'Christopher', 'Michelle', 'Matthew', 'Jennifer', 'Andrew', 'Nicole',
      'Joshua', 'Angela', 'Brian', 'Stephanie', 'Anthony', 'Karen', 'Kevin', 'Rachel', 'Steven', 'Laura'];

    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
      'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
      'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'];

    const roles = ['Admin', 'User', 'Manager', 'Developer', 'Designer', 'Analyst', 'Support', 'Sales'];
    const statuses: ('active' | 'inactive' | 'pending')[] = ['active', 'inactive', 'pending'];

    for (let i = 1; i <= 156; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`;
      const role = roles[Math.floor(Math.random() * roles.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      // Generate random join dates within the last 2 years
      const joinDate = new Date(Date.now() - Math.random() * 2 * 365 * 24 * 60 * 60 * 1000);

      data.push({
        id: i,
        name: `${firstName} ${lastName}`,
        email,
        role,
        status,
        joinDate: joinDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      });
    }

    return data;
  }
}
