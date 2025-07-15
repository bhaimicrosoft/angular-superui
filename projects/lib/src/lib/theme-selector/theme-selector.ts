import { Component, EventEmitter, Input, Output } from '@angular/core';
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

@Component({
  selector: 'lib-theme-selector',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-wrap gap-2">
      <span class="text-sm font-medium mr-2">Theme:</span>
      @for (theme of themes; track theme.value) {
        <button
          [class]="getButtonClass(theme.value)"
          (click)="selectTheme(theme.value)"
          [attr.aria-pressed]="currentTheme === theme.value"
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
  `
})
export class ThemeSelector {
  @Input() currentTheme = 'default';
  @Output() themeChange = new EventEmitter<string>();

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
