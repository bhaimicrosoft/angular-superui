import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Menubar, type MenubarItemData } from '@lib/components/menubar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lib/components/card';

@Component({
  selector: 'app-menubar-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, Menubar, Card, CardContent, CardDescription, CardHeader, CardTitle],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <!-- Hero -->
      <div class="relative overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div class="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 bg-[size:20px_20px] [mask-image:linear-gradient(0deg,transparent,black)]"></div>
        <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center space-y-6">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-medium text-blue-700 dark:text-blue-300">Navigation Component</span>
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span class="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">Menubar</span>
            </h1>
            <p class="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              A polished, accessible menubar with nested submenus, keyboard support, and overlay-based positioning.
            </p>

            <!-- Quick Demo -->
            <div class="max-w-2xl mx-auto pt-4">
              <Menubar [items]="menu()" (itemSelect)="onSelect($event)" />
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Cards -->
      <div class="py-14">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">Examples</h2>
            <p class="text-lg text-slate-600 dark:text-slate-300">Horizontal and vertical layouts ready to drop in</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card class="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/60 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader class="pb-4">
                <CardTitle class="text-slate-900 dark:text-white">Horizontal</CardTitle>
                <CardDescription class="text-slate-600 dark:text-slate-300">Classic app layout</CardDescription>
              </CardHeader>
              <CardContent>
                <Menubar [items]="menu()" orientation="horizontal" />
              </CardContent>
            </Card>

            <Card class="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/60 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader class="pb-4">
                <CardTitle class="text-slate-900 dark:text-white">Vertical</CardTitle>
                <CardDescription class="text-slate-600 dark:text-slate-300">Sidebar-style navigation</CardDescription>
              </CardHeader>
              <CardContent>
                <Menubar [items]="menu()" orientation="vertical" />
              </CardContent>
            </Card>
          </div>

          @if (lastAction()) {
            <div class="mt-10 mx-auto max-w-3xl rounded-xl border-0 shadow-lg bg-white/60 dark:bg-slate-800/50 backdrop-blur-sm p-4 sm:p-5 text-sm">
              <span class="mr-2 inline-flex h-2 w-2 rounded-full bg-emerald-500 self-center"></span>
              Last action: <span class="font-medium">{{ lastAction() }}</span>
            </div>
          }

          <!-- Docs CTA -->
          <div class="mt-12 text-center">
            <a
              class="group inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/menubar.md"
              target="_blank" rel="noreferrer noopener"
            >
              View Menubar documentation
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
export class MenubarDemoComponent {
  lastAction = signal<string | null>(null);

  menu = signal<MenubarItemData[]>([
    {
      label: 'File',
      submenu: [
        { label: 'New File', shortcut: 'Ctrl+N', action: () => this.setAction('New File') },
        { label: 'Open...', shortcut: 'Ctrl+O', action: () => this.setAction('Open') },
        { label: 'Save', shortcut: 'Ctrl+S', action: () => this.setAction('Save') },
        { label: 'Export', submenu: [
          { label: 'PDF', action: () => this.setAction('Export PDF') },
          { label: 'PNG', action: () => this.setAction('Export PNG') },
          { label: 'SVG', action: () => this.setAction('Export SVG') },
        ]},
        { label: 'Exit', action: () => this.setAction('Exit') },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', shortcut: 'Ctrl+Z', action: () => this.setAction('Undo') },
        { label: 'Redo', shortcut: 'Ctrl+Y', action: () => this.setAction('Redo') },
        { label: 'Preferences', submenu: [
          { label: 'Appearance', action: () => this.setAction('Appearance') },
          { label: 'Shortcuts', action: () => this.setAction('Shortcuts') },
        ]},
      ],
    },
    {
      label: 'View',
      submenu: [
        { label: 'Zoom In', shortcut: 'Ctrl+=', action: () => this.setAction('Zoom In') },
        { label: 'Zoom Out', shortcut: 'Ctrl+-', action: () => this.setAction('Zoom Out') },
        { label: 'Toggle Sidebar', action: () => this.setAction('Toggle Sidebar') },
      ],
    },
    {
      label: 'Help',
      submenu: [
        { label: 'Documentation', href: 'https://angular-superui.vercel.app' },
        { label: 'Report Issue', href: 'https://github.com/bhaimicrosoft/angular-superui/issues' },
        { label: 'About', action: () => this.setAction('About') },
      ],
    },
  ]);

  onSelect(item: MenubarItemData) {
    this.setAction(item.label);
  }

  private setAction(action: string) {
    this.lastAction.set(action);
  }
}
