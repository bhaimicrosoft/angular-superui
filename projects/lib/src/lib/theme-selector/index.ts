import { Component, EventEmitter, Input, Output, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const themeSelectorVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'h-9 px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'sm',
    },
  }
);

export interface ThemeOption {
  name: string;
  value: string;
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
}

export type ThemeMode = 'light' | 'dark' | 'system';

@Component({
  selector: 'ThemeSelector',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-wrap gap-4 items-center">
      <!-- Theme Mode Selector (Light/Dark/System) -->
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium">Mode:</span>
        <div class="flex rounded-lg border p-1">
          @for (mode of themeModes; track mode.value) {
            <button
              [class]="getModeButtonClass(mode.value)"
              (click)="selectMode(mode.value)"
              [title]="mode.name"
            >
              <div [innerHTML]="mode.icon"></div>
            </button>
          }
        </div>
      </div>

      <!-- Theme Color Selector -->
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium">Theme:</span>
        <div class="flex flex-wrap gap-2">
          @for (theme of themes; track theme.value) {
            <button
              [class]="getButtonClass(theme.value)"
              (click)="selectTheme(theme.value)"
              [attr.aria-pressed]="currentTheme === theme.value"
              [title]="theme.name"
            >
              <div class="flex items-center gap-2">
                <div class="flex gap-1">
                  <div 
                    class="w-3 h-3 rounded-full border border-gray-300"
                    [style.background-color]="theme.colors.primary"
                  ></div>
                  <div 
                    class="w-3 h-3 rounded-full border border-gray-300"
                    [style.background-color]="theme.colors.secondary"
                  ></div>
                  @if (theme.colors.accent) {
                    <div 
                      class="w-3 h-3 rounded-full border border-gray-300"
                      [style.background-color]="theme.colors.accent"
                    ></div>
                  }
                </div>
                <span>{{ theme.name }}</span>
              </div>
            </button>
          }
        </div>
      </div>
    </div>
  `
})
export class ThemeSelector implements OnInit {
  @Input() currentTheme = 'default';
  @Input() currentMode: ThemeMode = 'system';
  @Input() enablePersistence = true;
  @Output() themeChange = new EventEmitter<string>();
  @Output() modeChange = new EventEmitter<ThemeMode>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  themeModes = [
    {
      name: 'Light',
      value: 'light' as ThemeMode,
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
    },
    {
      name: 'Dark',
      value: 'dark' as ThemeMode,
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
    },
    {
      name: 'System',
      value: 'system' as ThemeMode,
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="10" y1="16" x2="14" y2="16"/><line x1="12" y1="12" x2="12" y2="16"/></svg>'
    }
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadSavedSettings();
      this.applySystemTheme();
      this.watchSystemTheme();
    }
  }

  private loadSavedSettings() {
    if (!this.enablePersistence) return;
    
    const savedTheme = localStorage.getItem('angular-superui-theme');
    const savedMode = localStorage.getItem('angular-superui-mode') as ThemeMode;
    
    if (savedTheme) {
      this.currentTheme = savedTheme;
    }
    if (savedMode) {
      this.currentMode = savedMode;
    }
  }

  private saveSettings() {
    if (!this.enablePersistence || !isPlatformBrowser(this.platformId)) return;
    
    localStorage.setItem('angular-superui-theme', this.currentTheme);
    localStorage.setItem('angular-superui-mode', this.currentMode);
  }

  private applySystemTheme() {
    if (this.currentMode === 'system' && isPlatformBrowser(this.platformId)) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    } else if (this.currentMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  private watchSystemTheme() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (this.currentMode === 'system') {
        this.applySystemTheme();
      }
    });
  }

  selectMode(mode: ThemeMode) {
    this.currentMode = mode;
    this.applySystemTheme();
    this.saveSettings();
    this.modeChange.emit(mode);
  }

  getModeButtonClass(mode: ThemeMode): string {
    const isSelected = this.currentMode === mode;
    return cn(
      'px-3 py-1 text-sm rounded-md transition-colors',
      isSelected 
        ? 'bg-primary text-primary-foreground' 
        : 'hover:bg-muted'
    );
  }

  themes: ThemeOption[] = [
    {
      name: 'Default',
      value: 'default',
      colors: { primary: 'hsl(222.2, 47.4%, 11.2%)', secondary: 'hsl(210, 40%, 96.1%)' }
    },
    {
      name: 'Blue',
      value: 'theme-blue',
      colors: { primary: 'hsl(217, 91%, 60%)', secondary: 'hsl(210, 40%, 96.1%)', accent: 'hsl(217, 91%, 85%)' }
    },
    {
      name: 'Green',
      value: 'theme-green',
      colors: { primary: 'hsl(142, 76%, 36%)', secondary: 'hsl(210, 40%, 96.1%)', accent: 'hsl(142, 76%, 70%)' }
    },
    {
      name: 'Purple',
      value: 'theme-purple',
      colors: { primary: 'hsl(262, 83%, 58%)', secondary: 'hsl(210, 40%, 96.1%)', accent: 'hsl(262, 83%, 80%)' }
    },
    {
      name: 'Pink',
      value: 'theme-pink',
      colors: { primary: 'hsl(336, 84%, 57%)', secondary: 'hsl(210, 40%, 96.1%)', accent: 'hsl(336, 84%, 80%)' }
    },
    {
      name: 'Orange',
      value: 'theme-orange',
      colors: { primary: 'hsl(25, 95%, 53%)', secondary: 'hsl(210, 40%, 96.1%)', accent: 'hsl(25, 95%, 75%)' }
    },
    {
      name: 'Teal',
      value: 'theme-teal',
      colors: { primary: 'hsl(173, 58%, 39%)', secondary: 'hsl(210, 40%, 96.1%)', accent: 'hsl(173, 58%, 70%)' }
    },
    {
      name: 'Red',
      value: 'theme-red',
      colors: { primary: 'hsl(0, 84%, 60%)', secondary: 'hsl(210, 40%, 96.1%)', accent: 'hsl(0, 84%, 80%)' }
    },
    {
      name: 'Yellow',
      value: 'theme-yellow',
      colors: { primary: 'hsl(43, 96%, 56%)', secondary: 'hsl(210, 40%, 96.1%)', accent: 'hsl(43, 96%, 80%)' }
    },
    {
      name: 'Indigo',
      value: 'theme-indigo',
      colors: { primary: 'hsl(234, 89%, 74%)', secondary: 'hsl(210, 40%, 96.1%)', accent: 'hsl(234, 89%, 85%)' }
    },
    {
      name: 'Cyan',
      value: 'theme-cyan',
      colors: { primary: 'hsl(188, 94%, 43%)', secondary: 'hsl(210, 40%, 96.1%)', accent: 'hsl(188, 94%, 70%)' }
    }
  ];

  selectTheme(theme: string) {
    this.currentTheme = theme;
    this.saveSettings();
    this.themeChange.emit(theme);
  }

  getButtonClass(themeValue: string): string {
    const isSelected = this.currentTheme === themeValue;
    return cn(
      themeSelectorVariants(),
      isSelected && 'bg-primary text-primary-foreground',
      'transition-all duration-200'
    );
  }
}
