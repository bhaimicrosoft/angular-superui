import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSpacer } from '@lib/components/toolbar';
import { Button } from '@lib/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lib/components/card';

@Component({
  selector: 'app-toolbar-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSpacer, Button, Card, CardContent, CardDescription, CardHeader, CardTitle],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <!-- Hero Section -->
      <div class="relative overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div class="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 bg-[size:20px_20px] [mask-image:linear-gradient(0deg,transparent,black)]"></div>
        <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center space-y-6">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 rounded-full">
              <div class="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-medium text-violet-700 dark:text-violet-300">Layout Component</span>
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span class="bg-gradient-to-r from-slate-900 via-violet-900 to-slate-900 dark:from-white dark:via-violet-100 dark:to-white bg-clip-text text-transparent">Toolbar</span>
            </h1>
            <p class="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Compose flexible toolbars for apps, editors, and control panels with responsive groups and smart spacing.
            </p>
            
            <!-- Quick Demo -->
            <div class="max-w-4xl mx-auto pt-4">
              <div class="rounded-xl border bg-white/70 dark:bg-slate-800/50 p-4 backdrop-blur-sm shadow-lg overflow-x-auto">
                <Toolbar class="flex-wrap min-w-fit">
                  <ToolbarTitle class="flex-shrink-0">Project Phoenix</ToolbarTitle>
                  <ToolbarSpacer class="hidden sm:block" />
                  <ToolbarGroup class="flex-wrap">
                    <Button size="sm" variant="outline" class="gap-1 min-w-0 flex-shrink-0">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                      </svg>
                      <span class="hidden sm:inline">New</span>
                    </Button>
                    <Button size="sm" class="gap-1 min-w-0 flex-shrink-0">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                      </svg>
                      <span class="hidden sm:inline">Save</span>
                    </Button>
                  </ToolbarGroup>
                  <ToolbarGroup [separated]="true" class="flex-wrap">
                    <Button size="sm" variant="ghost" class="gap-1 min-w-0 flex-shrink-0">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                      </svg>
                      <span class="hidden sm:inline">Share</span>
                    </Button>
                    <Button size="sm" variant="ghost" class="gap-1 min-w-0 flex-shrink-0">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                      <span class="hidden sm:inline">History</span>
                    </Button>
                  </ToolbarGroup>
                </Toolbar>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Cards -->
      <div class="py-16 sm:py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Flexible Layouts
            </h2>
            <p class="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Build sophisticated UIs with grouped actions, smart spacing, and responsive behavior
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Sticky Toolbar -->
            <Card class="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/60 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader class="pb-4">
                <div class="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg class="w-6 h-6 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                </div>
                <CardTitle class="text-slate-900 dark:text-white">Sticky & Elevated</CardTitle>
                <CardDescription class="text-slate-600 dark:text-slate-300">
                  Fixed position toolbars with elevation and backdrop blur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="space-y-4 overflow-x-auto">
                  <Toolbar variant="elevated" [sticky]="true" class="relative flex-wrap min-w-fit">
                    <ToolbarTitle class="flex-shrink-0">Sticky Toolbar</ToolbarTitle>
                    <ToolbarSpacer class="hidden sm:block" />
                    <ToolbarGroup class="flex-wrap">
                      <Button size="sm" variant="secondary" class="min-w-0 flex-shrink-0">
                        <span class="hidden sm:inline">Publish</span>
                        <span class="sm:hidden">Pub</span>
                      </Button>
                      <Button size="sm" variant="outline" class="min-w-0 flex-shrink-0">
                        <span class="hidden sm:inline">Preview</span>
                        <span class="sm:hidden">Prev</span>
                      </Button>
                    </ToolbarGroup>
                  </Toolbar>
                </div>
              </CardContent>
            </Card>

            <!-- Editor Toolbar -->
            <Card class="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/60 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader class="pb-4">
                <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </div>
                <CardTitle class="text-slate-900 dark:text-white">Editor Actions</CardTitle>
                <CardDescription class="text-slate-600 dark:text-slate-300">
                  Grouped editing tools with separators and compact layout
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="space-y-4 overflow-x-auto">
                  <Toolbar size="sm" class="flex-wrap min-w-fit">
                    <ToolbarGroup class="flex-wrap">
                      <Button size="sm" variant="ghost" class="gap-1 min-w-0 flex-shrink-0">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                        </svg>
                        <span class="hidden sm:inline">Bold</span>
                      </Button>
                      <Button size="sm" variant="ghost" class="gap-1 min-w-0 flex-shrink-0">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 4h-9M14 20H5M15 4L9 20"/>
                        </svg>
                        <span class="hidden sm:inline">Italic</span>
                      </Button>
                      <Button size="sm" variant="ghost" class="gap-1 min-w-0 flex-shrink-0">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4v6a6 6 0 0 0 12 0V4"/>
                          <line x1="4" y1="20" x2="20" y2="20"/>
                        </svg>
                        <span class="hidden sm:inline">Underline</span>
                      </Button>
                    </ToolbarGroup>
                    <ToolbarGroup [separated]="true" class="flex-wrap">
                      <Button size="sm" variant="ghost" class="gap-1 min-w-0 flex-shrink-0">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <line x1="17" y1="10" x2="3" y2="10"/>
                          <line x1="21" y1="6" x2="3" y2="6"/>
                          <line x1="21" y1="14" x2="3" y2="14"/>
                          <line x1="17" y1="18" x2="3" y2="18"/>
                        </svg>
                        <span class="hidden sm:inline">Left</span>
                      </Button>
                      <Button size="sm" variant="ghost" class="gap-1 min-w-0 flex-shrink-0">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <line x1="18" y1="10" x2="6" y2="10"/>
                          <line x1="21" y1="6" x2="3" y2="6"/>
                          <line x1="21" y1="14" x2="3" y2="14"/>
                          <line x1="18" y1="18" x2="6" y2="18"/>
                        </svg>
                        <span class="hidden sm:inline">Center</span>
                      </Button>
                      <Button size="sm" variant="ghost" class="gap-1 min-w-0 flex-shrink-0">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <line x1="21" y1="10" x2="7" y2="10"/>
                          <line x1="21" y1="6" x2="3" y2="6"/>
                          <line x1="21" y1="14" x2="3" y2="14"/>
                          <line x1="21" y1="18" x2="7" y2="18"/>
                        </svg>
                        <span class="hidden sm:inline">Right</span>
                      </Button>
                    </ToolbarGroup>
                  </Toolbar>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Orientation Examples -->
          <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card class="border-0 shadow-lg bg-white/60 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader class="pb-4">
                <CardTitle class="text-slate-900 dark:text-white">Horizontal Layout</CardTitle>
                <CardDescription class="text-slate-600 dark:text-slate-300">
                  Actions flow left to right with responsive wrapping
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="overflow-x-auto">
                  <Toolbar size="sm" class="flex-wrap min-w-fit">
                    <Button size="sm" variant="ghost" class="gap-1 min-w-0 flex-shrink-0">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
                      </svg>
                      <span class="hidden sm:inline">Move</span>
                    </Button>
                    <Button size="sm" variant="ghost" class="gap-1 min-w-0 flex-shrink-0">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                      <span class="hidden sm:inline">Copy</span>
                    </Button>
                    <Button size="sm" variant="ghost" class="gap-1 min-w-0 flex-shrink-0">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                      <span class="hidden sm:inline">Delete</span>
                    </Button>
                  </Toolbar>
                </div>
              </CardContent>
            </Card>

            <Card class="border-0 shadow-lg bg-white/60 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader class="pb-4">
                <CardTitle class="text-slate-900 dark:text-white">Vertical Layout</CardTitle>
                <CardDescription class="text-slate-600 dark:text-slate-300">
                  Perfect for sidebars and floating tool panels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="flex justify-start">
                  <Toolbar orientation="vertical" size="sm">
                    <Button size="sm" variant="ghost" class="gap-1 justify-start">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
                      </svg>
                      Move
                    </Button>
                    <Button size="sm" variant="ghost" class="gap-1 justify-start">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                      Copy
                    </Button>
                    <Button size="sm" variant="ghost" class="gap-1 justify-start">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                      Delete
                    </Button>
                  </Toolbar>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Documentation Link -->
          <div class="mt-16 text-center">
            <a
              class="group inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/toolbar.md"
              target="_blank" rel="noreferrer noopener"
            >
              View Toolbar documentation
              <svg class="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h9.19L9.22 5.53a.75.75 0 111.06-1.06l5.5 5.5a.75.75 0 010 1.06l-5.5 5.5a.75.75 0 11-1.06-1.06l3.72-3.72H3.75A.75.75 0 013 10z" clip-rule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ToolbarDemoComponent {}
