import {
  Component,
  Input,
  Output,
  EventEmitter,
  computed,
  signal,
  inject,
  PLATFORM_ID,
  afterNextRender,
  InjectionToken
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Button } from '../button'; // Assuming this is your custom Button component

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

    // Use addEventListener with a cleanup in a real Angular service if it were to be destroyed
    // For a root-provided service, this is generally fine as it lives for the app's lifetime.
    mediaQuery.addEventListener('change', handleChange);
  }

  /**
   * Apply theme to document
   */
  private applyTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const root = document.documentElement;
    const isDark = this._isDarkMode();

    // Remove existing theme classes from html and body
    root.classList.remove('light', 'dark');
    document.body.classList.remove('light', 'dark');

    // Add the appropriate theme class to html and body
    if (isDark) {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.add('light');
      document.body.classList.add('light');
    }

    // Update meta theme-color for mobile browsers
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', isDark ? '#020617' : '#ffffff');
    }

    // Apply theme to body for complete coverage
    // These styles are often better managed in global CSS, but included here for completeness
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
   * Toggle between light and dark themes (if current is system, toggle based on system's current)
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
 * * <ThemeSwitcher />
 *
 * * <ThemeSwitcher variant="outline" size="lg" />
 *
 * * <ThemeSwitcher [showLabel]="true" />
 *
 * * <ThemeSwitcher mode="cycle" />
 * ```
 */
@Component({
  selector: 'ThemeSwitcher',
  standalone: true,
  imports: [Button],
  template: `
    @if (mode === 'slider') {
      <div [class]="getSliderContainerClasses()">
        <button
          type="button"
          [class]="getThemeButtonClasses('light')"
          [attr.aria-label]="'Switch to light theme'"
          [attr.aria-pressed]="isThemeActive('light')"
          (click)="selectTheme('light')">
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
            <path
              d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        </button>

        <button
          type="button"
          [class]="getThemeButtonClasses('dark')"
          [attr.aria-label]="'Switch to dark theme'"
          [attr.aria-pressed]="isThemeActive('dark')"
          (click)="selectTheme('dark')">
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
        </button>

        <button
          type="button"
          [class]="getThemeButtonClasses('system')"
          [attr.aria-label]="'Switch to system theme'"
          [attr.aria-pressed]="isThemeActive('system')"
          (click)="selectTheme('system')">
          <svg
            class="h-4 w-4 transition-all duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        </button>
      </div>
    } @else {
      <Button
        type="button"
        [variant]="buttonVariant()"
        [size]="size"
        [class]="themeSwitcherClasses()"
        [accessibility]="{
          ariaLabel: ariaLabel(),
          ariaDescription: 'Toggle between light and dark themes'
        }"
        [attr.aria-pressed]="themeService.isDarkMode() ? 'true' : 'false'"
        (click)="handleClick()"
      >

        <div class="relative flex items-center justify-center">
          @if (themeService.isDarkMode()) {
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
              <path
                d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          }

          @if (themeService.currentTheme() === 'system') {
            <div class="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
          }
        </div>

        @if (showLabel) {
          <span class="ml-2 text-sm font-medium">
            {{ themeLabel() }}
          </span>
        }
      </Button>
    }
  `,
})
export class ThemeSwitcher {
  // Inject the theme service directly
  protected themeService = inject(ThemeService);

  /**
   * Visual variant of the theme switcher
   */
  @Input() variant: ThemeSwitcherVariant['variant'] = 'default';

  /**
   * Size variant of the theme switcher
   */
  @Input() size: ThemeSwitcherVariant['size'] = 'default';

  /**
   * Whether to show the theme label
   */
  @Input() showLabel = false;

  /**
   * Switching mode: 'toggle' (light/dark), 'cycle' (light/dark/system), or 'slider' (3-button layout)
   */
  @Input() mode: 'toggle' | 'cycle' | 'slider' = 'toggle';

  /**
   * CSS classes to apply to the theme switcher container (if mode is slider) or button (if mode is toggle/cycle)
   */
  @Input() class = '';

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
   * Check if a specific theme is currently active
   */
  isThemeActive(theme: Theme): string {
    return this.themeService.currentTheme() === theme ? 'true' : 'false';
  }

  /**
   * Get CSS classes for theme button based on active state
   */
  getThemeButtonClasses(theme: Theme): string {
    const isActive = this.themeService.currentTheme() === theme;

    const baseClasses = cn(
      'inline-flex items-center justify-center',
      // Apply size here using cva
      themeSwitcherVariants({ size: this.size }),
      'transition-all duration-200',
      'border border-transparent',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'cursor-pointer'
    );

    let activeClasses = '';
    let inactiveClasses = 'text-muted-foreground hover:text-foreground hover:bg-accent/50';

    // Define active styles for each theme
    switch (theme) {
      case 'light':
        activeClasses = 'bg-yellow-100 text-yellow-600 shadow-sm border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700/50';
        break;
      case 'dark':
        activeClasses = 'bg-slate-100 text-slate-700 shadow-sm border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600';
        break;
      case 'system':
        activeClasses = 'bg-blue-100 text-blue-600 shadow-sm border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/50';
        break;
    }

    return cn(baseClasses, isActive ? activeClasses : inactiveClasses);
  }

  /**
   * Computed CSS classes for the main switcher element (used for toggle/cycle mode)
   */
  themeSwitcherClasses = computed(() => {
    return cn(
      themeSwitcherVariants({
        variant: this.variant,
        size: this.size,
      }),
      this.class
    );
  });

  /**
   * Get CSS classes for the slider container.
   * This ensures the outer container also respects the 'class' input.
   */
  getSliderContainerClasses(): string {
    const baseSliderClasses = 'flex items-center bg-background/50 backdrop-blur-sm rounded-lg p-1 border border-input shadow-sm';
    return cn(baseSliderClasses, this.class);
  }

  /**
   * Convert theme switcher variant to button variant
   */
  buttonVariant = computed(() => {
    switch (this.variant) {
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
    const theme = this.themeService.currentTheme();
    const isDark = this.themeService.isDarkMode();

    if (theme === 'system') {
      return `Current theme: System (${isDark ? 'Dark' : 'Light'}). Click to ${this.mode === 'cycle' ? 'cycle themes' : 'toggle theme'}`;
    }

    return `Current theme: ${theme}. Click to ${this.mode === 'cycle' ? 'cycle themes' : `switch to ${isDark ? 'light' : 'dark'} theme`}`;
  });

  /**
   * Computed theme label for display
   */
  themeLabel = computed(() => {
    const theme = this.themeService.currentTheme();
    const isDark = this.themeService.isDarkMode();

    if (theme === 'system') {
      return `System (${isDark ? 'Dark' : 'Light'})`;
    }

    return theme.charAt(0).toUpperCase() + theme.slice(1);
  });

  /**
   * Handle click event for toggle/cycle modes
   */
  handleClick(): void {
    const oldTheme = this.themeService.currentTheme();

    if (this.mode === 'cycle') {
      this.themeService.cycleTheme();
    } else {
      this.themeService.toggleTheme();
    }

    const newTheme = this.themeService.currentTheme();
    if (oldTheme !== newTheme) {
      this.themeChange.emit(newTheme);
    }
  }

  /**
   * Handle theme selection for slider mode
   */
  selectTheme(theme: Theme): void {
    const oldTheme = this.themeService.currentTheme();
    this.themeService.setTheme(theme);

    // Check if the theme actually changed after setting
    const newTheme = this.themeService.currentTheme();
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
    return this.themeService.currentTheme();
  }

  /**
   * Check if dark mode is active
   */
  isDark(): boolean {
    return this.themeService.isDarkMode();
  }
}

/**
 * Export the theme switcher component and service for easier importing
 */
export { ThemeServiceImpl };
