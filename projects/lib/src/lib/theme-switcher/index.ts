import { Component, Input, Output, EventEmitter, computed, signal, inject, PLATFORM_ID, afterNextRender, InjectionToken } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { ButtonComponent } from '../button';

/**
 * Theme types
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Theme switcher component variants using Class Variance Authority (CVA)
 */
const themeSwitcherVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
    'transition-colors duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'relative overflow-hidden',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-background border border-input hover:bg-accent hover:text-accent-foreground',
        ],
        outline: [
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ],
        ghost: [
          'hover:bg-accent hover:text-accent-foreground',
        ],
      },
      size: {
        default: 'h-9 w-9',
        sm: 'h-8 w-8',
        lg: 'h-10 w-10',
        xl: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ThemeSwitcherVariant = VariantProps<typeof themeSwitcherVariants>;

/**
 * Theme service token
 */
export const ThemeService = new InjectionToken<ThemeServiceImpl>('ThemeService', {
  providedIn: 'root',
  factory: () => new ThemeServiceImpl(),
});

/**
 * Theme service for managing application theme
 */
class ThemeServiceImpl {
  private platformId = inject(PLATFORM_ID);
  private _currentTheme = signal<Theme>('system');
  private _systemTheme = signal<'light' | 'dark'>('light');
  private _isDarkMode = computed(() => {
    const theme = this._currentTheme();
    if (theme === 'system') {
      return this._systemTheme() === 'dark';
    }
    return theme === 'dark';
  });

  /**
   * Current theme signal
   */
  readonly currentTheme = this._currentTheme;

  /**
   * System theme signal
   */
  readonly systemTheme = this._systemTheme;

  /**
   * Is dark mode active
   */
  readonly isDarkMode = this._isDarkMode;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        this.initializeTheme();
        this.setupMediaQueryListener();
      });
    }
  }

  /**
   * Initialize theme from localStorage or system preference
   */
  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    this._systemTheme.set(systemTheme);
    
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      this._currentTheme.set(savedTheme);
    } else {
      this._currentTheme.set('system');
    }
    
    this.applyTheme();
  }

  /**
   * Setup media query listener for system theme changes
   */
  private setupMediaQueryListener(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      this._systemTheme.set(e.matches ? 'dark' : 'light');
      if (this._currentTheme() === 'system') {
        this.applyTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
  }

  /**
   * Apply theme to document
   */
  private applyTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const root = document.documentElement;
    const isDark = this._isDarkMode();

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    // Add the appropriate theme class
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }

    // Update meta theme-color for mobile browsers
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', isDark ? '#020617' : '#ffffff');
    }

    // Ensure body has proper background and text color
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(isDark ? 'dark' : 'light');
    
    // Apply theme to body for complete coverage
    document.body.style.backgroundColor = isDark ? 'hsl(222.2 84% 4.9%)' : 'hsl(0 0% 100%)';
    document.body.style.color = isDark ? 'hsl(210 40% 98%)' : 'hsl(222.2 84% 4.9%)';
  }

  /**
   * Set theme
   */
  setTheme(theme: Theme): void {
    this._currentTheme.set(theme);
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
      this.applyTheme();
    }
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const current = this._currentTheme();
    if (current === 'system') {
      this.setTheme(this._systemTheme() === 'dark' ? 'light' : 'dark');
    } else {
      this.setTheme(current === 'dark' ? 'light' : 'dark');
    }
  }

  /**
   * Cycle through all themes
   */
  cycleTheme(): void {
    const current = this._currentTheme();
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(current);
    const nextIndex = (currentIndex + 1) % themes.length;
    this.setTheme(themes[nextIndex]);
  }
}

/**
 * Theme Switcher Component
 * 
 * A component that allows users to switch between light, dark, and system themes.
 * Automatically persists the user's preference in localStorage.
 * 
 * @example
 * ```html
 * <!-- Simple toggle button -->
 * <ThemeSwitcher />
 * 
 * <!-- With custom variant and size -->
 * <ThemeSwitcher variant="outline" size="lg" />
 * 
 * <!-- Show current theme -->
 * <ThemeSwitcher [showLabel]="true" />
 * 
 * <!-- Cycle through all themes -->
 * <ThemeSwitcher mode="cycle" />
 * ```
 */
@Component({
  selector: 'ThemeSwitcher',
  standalone: true,
  imports: [ButtonComponent],
  providers: [
    { provide: ThemeService, useClass: ThemeServiceImpl }
  ],
  template: `
    <Button
      type="button"
      [variant]="buttonVariant()"
      [size]="size"
      [class]="themeSwitcherClasses()"
      [accessibility]="{
        ariaLabel: ariaLabel(),
        ariaDescription: 'Toggle between light and dark themes'
      }"
      [attr.aria-pressed]="isDarkMode() ? 'true' : 'false'"
      [attr.data-theme]="currentTheme()"
      (click)="handleClick()"
      (focused)="onFocus()"
      (blurred)="onBlur()">
      
      <!-- Theme Icons -->
      <div class="relative flex items-center justify-center">
        @if (isDarkMode()) {
          <!-- Dark Mode Icon -->
          <svg 
            class="h-4 w-4 transition-all duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        } @else {
          <!-- Light Mode Icon -->
          <svg 
            class="h-4 w-4 transition-all duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        }
        
        <!-- System Theme Indicator -->
        @if (currentTheme() === 'system') {
          <div class="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
        }
      </div>
      
      <!-- Optional Label -->
      @if (showLabel) {
        <span class="ml-2 text-sm font-medium">
          {{ themeLabel() }}
        </span>
      }
    </Button>
  `,
})
export class ThemeSwitcherComponent {
  private themeService = inject(ThemeService);

  /**
   * Visual variant of the theme switcher
   */
  @Input() 
  set variant(value: ThemeSwitcherVariant['variant']) {
    this._variant.set(value);
  }
  get variant() {
    return this._variant();
  }
  private _variant = signal<ThemeSwitcherVariant['variant']>('default');

  /**
   * Size variant of the theme switcher
   */
  @Input() 
  set size(value: ThemeSwitcherVariant['size']) {
    this._size.set(value);
  }
  get size() {
    return this._size();
  }
  private _size = signal<ThemeSwitcherVariant['size']>('default');

  /**
   * Whether to show the theme label
   */
  @Input() 
  set showLabel(value: boolean) {
    this._showLabel.set(value);
  }
  get showLabel() {
    return this._showLabel();
  }
  private _showLabel = signal(false);

  /**
   * Switching mode: 'toggle' (light/dark) or 'cycle' (light/dark/system)
   */
  @Input() 
  set mode(value: 'toggle' | 'cycle') {
    this._mode.set(value);
  }
  get mode() {
    return this._mode();
  }
  private _mode = signal<'toggle' | 'cycle'>('toggle');

  /**
   * CSS classes to apply to the theme switcher
   */
  @Input() 
  set class(value: string) {
    this._class.set(value);
  }
  get class() {
    return this._class();
  }
  private _class = signal('');

  /**
   * Event emitted when theme changes
   */
  @Output() themeChange = new EventEmitter<Theme>();

  /**
   * Event emitted when the theme switcher is focused
   */
  @Output() focused = new EventEmitter<void>();

  /**
   * Event emitted when the theme switcher loses focus
   */
  @Output() blurred = new EventEmitter<void>();

  /**
   * Current theme from service
   */
  readonly currentTheme = this.themeService.currentTheme;

  /**
   * Is dark mode active
   */
  readonly isDarkMode = this.themeService.isDarkMode;

  /**
   * Computed CSS classes
   */
  themeSwitcherClasses = computed(() => {
    return cn(
      themeSwitcherVariants({
        variant: this._variant(),
        size: this._size(),
      }),
      this._class()
    );
  });

  /**
   * Convert theme switcher variant to button variant
   */
  buttonVariant = computed(() => {
    const variant = this._variant();
    switch (variant) {
      case 'default':
        return 'outline';
      case 'outline':
        return 'outline';
      case 'ghost':
        return 'ghost';
      default:
        return 'outline';
    }
  });

  /**
   * Computed aria-label for accessibility
   */
  ariaLabel = computed(() => {
    const theme = this.currentTheme();
    const isDark = this.isDarkMode();
    
    if (theme === 'system') {
      return `Current theme: System (${isDark ? 'Dark' : 'Light'}). Click to ${this.mode === 'cycle' ? 'cycle themes' : 'toggle theme'}`;
    }
    
    return `Current theme: ${theme}. Click to ${this.mode === 'cycle' ? 'cycle themes' : `switch to ${isDark ? 'light' : 'dark'} theme`}`;
  });

  /**
   * Computed theme label
   */
  themeLabel = computed(() => {
    const theme = this.currentTheme();
    const isDark = this.isDarkMode();
    
    if (theme === 'system') {
      return `System (${isDark ? 'Dark' : 'Light'})`;
    }
    
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  });

  /**
   * Handle click event
   */
  handleClick(): void {
    const oldTheme = this.currentTheme();
    
    if (this.mode === 'cycle') {
      this.themeService.cycleTheme();
    } else {
      this.themeService.toggleTheme();
    }
    
    const newTheme = this.currentTheme();
    if (oldTheme !== newTheme) {
      this.themeChange.emit(newTheme);
    }
  }

  /**
   * Handle focus events
   */
  onFocus(): void {
    this.focused.emit();
  }

  /**
   * Handle blur events
   */
  onBlur(): void {
    this.blurred.emit();
  }

  /**
   * Programmatically set theme
   */
  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
    this.themeChange.emit(theme);
  }

  /**
   * Get current theme
   */
  getTheme(): Theme {
    return this.currentTheme();
  }

  /**
   * Check if dark mode is active
   */
  isDark(): boolean {
    return this.isDarkMode();
  }
}

/**
 * Export the theme switcher component and service for easier importing
 */
export { ThemeSwitcherComponent as ThemeSwitcher, ThemeServiceImpl };
