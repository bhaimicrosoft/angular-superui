import { Component, signal, computed, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SEOService } from '../services/seo.service';
import { HeroSectionBlockComponent, HeroButton, HeroBackground } from '@lib/hero-section';

@Component({
  selector: 'app-hero-section-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSectionBlockComponent],
  template: `
    <!-- Demo Header -->
    <div class="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Content Block
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Hero Section Block
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Eye-catching landing page heroes with multiple layouts, CTAs, and background options.
            Perfect for capturing attention and driving conversions.
          </p>
        </div>
      </div>
    </div>

    <!-- Live Examples -->
    <div class="py-16">
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

    <!-- Usage Code Examples -->
    <div class="bg-gray-50 dark:bg-gray-900 py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Usage Examples</h2>
          
          <div class="space-y-8">
            <!-- Basic Usage -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Hero Section</h3>
              <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code [textContent]="basicUsageCode()"></code></pre>
            </div>

            <!-- Advanced Usage -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Advanced Hero with Background</h3>
              <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code [textContent]="advancedUsageCode()"></code></pre>
            </div>

            <!-- TypeScript Interface -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">TypeScript Interfaces</h3>
              <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code [textContent]="interfaceCode()"></code></pre>
            </div>
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
