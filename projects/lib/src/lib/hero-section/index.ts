import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '../utils/cn';

const heroVariants = cva(
  'relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800',
        gradient: 'bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-500',
        minimal: 'bg-background',
        dark: 'bg-slate-900 text-white'
      },
      size: {
        sm: 'py-16 md:py-20',
        default: 'py-20 md:py-32',
        lg: 'py-32 md:py-40',
        xl: 'py-40 md:py-48'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const contentVariants = cva(
  'container mx-auto px-4 sm:px-6 lg:px-8 relative z-10',
  {
    variants: {
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
      },
      maxWidth: {
        sm: 'max-w-2xl mx-auto',
        md: 'max-w-4xl mx-auto',
        lg: 'max-w-6xl mx-auto',
        full: 'max-w-full'
      }
    },
    defaultVariants: {
      alignment: 'center',
      maxWidth: 'lg'
    }
  }
);

export interface HeroButton {
  text: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  disabled?: boolean;
  external?: boolean;
  action?: () => void;
}

export interface HeroBackground {
  type: 'gradient' | 'image' | 'video' | 'pattern';
  value?: string;
  overlay?: boolean;
  opacity?: number;
}

@Component({
  selector: 'hero-section-block',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [class]="heroClasses()">
      <!-- Background Elements -->
      @if (background()?.type === 'image' && background()?.value) {
        <div 
          class="absolute inset-0 bg-cover bg-center bg-no-repeat"
          [style.background-image]="'url(' + background()?.value + ')'"
          [style.opacity]="background()?.opacity || 1"
        ></div>
      }
      
      @if (background()?.type === 'video' && background()?.value) {
        <video 
          class="absolute inset-0 w-full h-full object-cover"
          [src]="background()?.value"
          [style.opacity]="background()?.opacity || 1"
          autoplay 
          muted 
          loop
        ></video>
      }
      
      @if (background()?.type === 'pattern') {
        <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      }
      
      @if (background()?.overlay) {
        <div class="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
      }
      
      <!-- Decorative Elements -->
      @if (showDecorations()) {
        <div class="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
      }

      <!-- Content -->
      <div [class]="contentClasses()">
        <!-- Badge/Announcement -->
        @if (badge()) {
          <div class="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium">
            {{ badge() }}
          </div>
        }

        <!-- Main Heading -->
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span [class]="titleClasses()">
            {{ title() }}
          </span>
        </h1>

        <!-- Subtitle -->
        @if (subtitle()) {
          <p class="text-lg sm:text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl">
            {{ subtitle() }}
          </p>
        }

        <!-- Description -->
        @if (description()) {
          <p class="text-base sm:text-lg mb-8 text-muted-foreground/80 max-w-2xl">
            {{ description() }}
          </p>
        }

        <!-- Call-to-Action Buttons -->
        @if (buttons() && buttons()!.length > 0) {
          <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            @for (button of buttons(); track button.text) {
              @if (button.href) {
                <a
                  [href]="button.href"
                  [target]="button.external ? '_blank' : undefined"
                  [rel]="button.external ? 'noopener noreferrer' : undefined"
                  [class]="getButtonClasses(button)"
                  (click)="button.action && button.action()"
                >
                  {{ button.text }}
                </a>
              } @else {
                <button
                  [class]="getButtonClasses(button)"
                  [disabled]="button.disabled"
                  (click)="button.action && button.action(); onButtonClick.emit(button)"
                >
                  {{ button.text }}
                </button>
              }
            }
          </div>
        }

        <!-- Stats or Features -->
        @if (stats() && stats()!.length > 0) {
          <div class="mt-12 pt-8 border-t border-border/20">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
              @for (stat of stats(); track stat.label) {
                <div class="text-center">
                  <div class="text-2xl md:text-3xl font-bold text-foreground">{{ stat.value }}</div>
                  <div class="text-sm text-muted-foreground">{{ stat.label }}</div>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .bg-grid-pattern {
      background-image: 
        linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
      background-size: 20px 20px;
    }
  `]
})
export class HeroSectionBlockComponent {
  // Inputs
  variant = input<'default' | 'gradient' | 'minimal' | 'dark'>('default');
  size = input<'sm' | 'default' | 'lg' | 'xl'>('default');
  alignment = input<'left' | 'center' | 'right'>('center');
  maxWidth = input<'sm' | 'md' | 'lg' | 'full'>('lg');
  
  title = input.required<string>();
  subtitle = input<string>();
  description = input<string>();
  badge = input<string>();
  
  buttons = input<HeroButton[]>();
  stats = input<{label: string; value: string}[]>();
  background = input<HeroBackground>();
  showDecorations = input<boolean>(true);
  
  // Outputs
  onButtonClick = output<HeroButton>();

  // Computed classes
  heroClasses = computed(() => heroVariants({
    variant: this.variant(),
    size: this.size()
  }));

  contentClasses = computed(() => contentVariants({
    alignment: this.alignment(),
    maxWidth: this.maxWidth()
  }));

  titleClasses = computed(() => {
    const variant = this.variant();
    if (variant === 'gradient') {
      return 'bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent';
    }
    if (variant === 'dark') {
      return 'text-white';
    }
    return 'bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent';
  });

  getButtonClasses(button: HeroButton): string {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      default: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };

    const variantClasses = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary',
      outline: 'border-2 border-border bg-transparent hover:bg-accent hover:text-accent-foreground focus:ring-border',
      ghost: 'bg-transparent hover:bg-accent hover:text-accent-foreground focus:ring-accent'
    };

    const variant = button.variant || 'primary';
    const size = button.size || 'default';

    return cn(
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      button.disabled && 'opacity-50 cursor-not-allowed'
    );
  }
}
