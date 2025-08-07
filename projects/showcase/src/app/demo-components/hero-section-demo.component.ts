import { Component, signal, computed, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SEOService } from '../services/seo.service';
import { HeroSectionBlockComponent, HeroButton, HeroBackground } from '@lib/blocks/hero-section';

@Component({
  selector: 'app-hero-section-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSectionBlockComponent],
  template: `
    <!-- Professional Hero Section -->
    <section class="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Breadcrumb Navigation -->
          <nav class="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <a href="/blocks" class="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">UI Blocks</a>
            <span>→</span>
            <span class="text-gray-900 dark:text-white font-medium">Hero Section</span>
          </nav>

          <!-- Category Badge -->
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Content Block
          </div>

          <!-- Main Heading -->
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Hero Section Block
          </h1>

          <!-- Description -->
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed mx-auto max-w-3xl">
            Eye-catching landing page heroes with multiple layouts, CTAs, and background options.
            Perfect for capturing attention and driving conversions.
          </p>

          <!-- Feature Grid -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 justify-center max-w-4xl mx-auto">
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span class="text-sm font-medium text-center">Multiple Layouts</span>
            </div>
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2z"></path>
              </svg>
              <span class="text-sm font-medium text-center">CTA Buttons</span>
            </div>
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h3a1 1 0 011 1v1a1 1 0 01-1 1h-1v9a2 2 0 01-2 2H7a2 2 0 01-2-2V7H4a1 1 0 01-1-1V5a1 1 0 011-1h3z"></path>
              </svg>
              <span class="text-sm font-medium text-center">Background Images</span>
            </div>
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
              <span class="text-sm font-medium text-center">Responsive</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Examples -->
    <div id="examples" class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">

          <!-- Example 1: Default Gradient Hero -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Default Gradient Hero</h2>
              <p class="text-gray-600 dark:text-gray-300">Clean gradient background with animated decorations</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <hero-section-block
                [title]="'Build Amazing Angular Apps'"
                [subtitle]="'Create stunning user interfaces with our modern component library'"
                [description]="'Pre-built components, TypeScript support, and seamless integration with your existing Angular projects.'"
                [badge]="'✨ Now Available'"
                [buttons]="defaultButtons()"
                [stats]="defaultStats()"
                [variant]="'gradient'"
                [size]="'default'"
                [alignment]="'center'"
                [showDecorations]="true"
                (onButtonClick)="onButtonClick($event)"
              />
            </div>
          </div>

          <!-- Example 2: Minimal Hero -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Minimal Hero</h2>
              <p class="text-gray-600 dark:text-gray-300">Clean and simple design focused on content</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <hero-section-block
                [title]="'Simple. Powerful. Effective.'"
                [subtitle]="'Everything you need to build modern Angular applications'"
                [buttons]="minimalButtons()"
                [variant]="'minimal'"
                [size]="'lg'"
                [alignment]="'center'"
                [showDecorations]="false"
                (onButtonClick)="onButtonClick($event)"
              />
            </div>
          </div>

          <!-- Example 3: Dark Hero with Background Image -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Dark Hero with Background</h2>
              <p class="text-gray-600 dark:text-gray-300">Dark theme with background image and overlay</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <hero-section-block
                [title]="'Next-Gen Development'"
                [subtitle]="'Push the boundaries of what is possible with Angular'"
                [description]="'Advanced components and patterns for enterprise-grade applications.'"
                [buttons]="darkButtons()"
                [background]="backgroundImage()"
                [variant]="'dark'"
                [size]="'xl'"
                [alignment]="'center'"
                [showDecorations]="true"
                (onButtonClick)="onButtonClick($event)"
              />
            </div>
          </div>

          <!-- Example 4: Left-Aligned Hero -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Left-Aligned Hero</h2>
              <p class="text-gray-600 dark:text-gray-300">Content aligned to the left with smaller size</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <hero-section-block
                [title]="'Start Building Today'"
                [subtitle]="'Get up and running in minutes with our quick start guide'"
                [buttons]="leftAlignedButtons()"
                [variant]="'default'"
                [size]="'sm'"
                [alignment]="'left'"
                [maxWidth]="'md'"
                [showDecorations]="false"
                (onButtonClick)="onButtonClick($event)"
              />
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Documentation Link -->
    <div class="bg-white dark:bg-gray-900 py-16 border-t border-gray-200 dark:border-gray-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <div class="text-center">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Implementation Guide</h3>

            <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Ready to implement? Check out our comprehensive documentation for detailed usage examples and customization options.
            </p>

            <a
              href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/blocks/hero-section.md"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              View Documentation
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionDemoComponent implements OnInit {
  private seoService = inject(SEOService);

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'Hero Section Block Demo - Angular SuperUI',
      description: 'Interactive examples of hero section blocks with different layouts, backgrounds, and call-to-action buttons.',
      keywords: 'Angular hero section, landing page hero, CTA blocks, hero block component, Angular UI blocks'
    });
  }

  // Button configurations
  defaultButtons = signal<HeroButton[]>([
    {
      text: 'Get Started Free',
      variant: 'primary',
      size: 'lg',
      action: () => console.log('Get Started clicked')
    },
    {
      text: 'View Documentation',
      variant: 'outline',
      size: 'lg',
      href: '/docs'
    }
  ]);

  minimalButtons = signal<HeroButton[]>([
    {
      text: 'Start Now',
      variant: 'primary',
      action: () => console.log('Start Now clicked')
    }
  ]);

  darkButtons = signal<HeroButton[]>([
    {
      text: 'Explore Features',
      variant: 'primary',
      size: 'lg',
      action: () => console.log('Explore Features clicked')
    },
    {
      text: 'Contact Sales',
      variant: 'secondary',
      size: 'lg',
      action: () => console.log('Contact Sales clicked')
    }
  ]);

  leftAlignedButtons = signal<HeroButton[]>([
    {
      text: 'Quick Start',
      variant: 'primary',
      action: () => console.log('Quick Start clicked')
    }
  ]);

  // Stats
  defaultStats = signal([
    { label: 'Components', value: '50+' },
    { label: 'Downloads', value: '10K+' },
    { label: 'GitHub Stars', value: '2.5K+' },
    { label: 'Happy Users', value: '500+' }
  ]);

  // Background configuration
  backgroundImage = signal<HeroBackground>({
    type: 'pattern',
    overlay: true,
    opacity: 0.1
  });

  onButtonClick(button: HeroButton) {
    console.log('Button clicked:', button);
  }

  // Code examples
  basicUsageCode = computed(() => `<hero-section-block
  title="Welcome to Our Platform"
  subtitle="Build amazing applications with ease"
  [buttons]="buttons"
  variant="default"
  size="default"
  alignment="center"
/>`);

  advancedUsageCode = computed(() => `<hero-section-block
  title="Advanced Hero Section"
  subtitle="With background and stats"
  description="Additional description text"
  badge="✨ New Feature"
  [buttons]="buttons"
  [stats]="stats"
  [background]="backgroundConfig"
  variant="gradient"
  size="lg"
  alignment="center"
  [showDecorations]="true"
  (onButtonClick)="handleButtonClick($event)"
/>`);

  interfaceCode = computed(() => `export interface HeroButton {
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
}`);
}
