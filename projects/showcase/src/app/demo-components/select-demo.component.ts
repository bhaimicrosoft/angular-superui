import { Component, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent, SelectOption } from '@lib/select';
import { Button } from '@lib/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lib/card';
import { Badge } from '@lib/badge';

@Component({
  selector: 'app-select-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SelectComponent,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Badge
  ],
  template: `
    <!-- Hero Section -->
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      
      <!-- Header -->
      <div class="relative overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div class="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 bg-[size:20px_20px] [mask-image:linear-gradient(0deg,transparent,black)]"></div>
        <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center space-y-6">
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-medium text-blue-700 dark:text-blue-300">Form Component</span>
            </div>
            
            <!-- Title -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span class="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
                Select Component
              </span>
            </h1>
            
            <!-- Description -->
            <p class="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              A powerful, accessible, and highly customizable select component with search, grouping, keyboard navigation, and multiple variants for modern Angular applications.
            </p>
            
            <!-- Quick Demo -->
            <div class="max-w-md mx-auto pt-4">
              <SelectComponent
                [options]="basicOptions()"
                placeholder="Try selecting a fruit..."
                size="lg"
                variant="default"
                (valueChange)="basicValue.set($event)"
                class="shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="py-16 sm:py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p class="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Everything you need for a modern select component experience
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Basic Select -->
            <Card class="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader class="pb-4">
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
                  </svg>
                </div>
                <CardTitle class="text-slate-900 dark:text-white">Basic Selection</CardTitle>
                <CardDescription class="text-slate-600 dark:text-slate-300">
                  Simple dropdown with clean design and smooth animations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="space-y-4">
                  <SelectComponent
                    [options]="basicOptions()"
                    placeholder="Choose a fruit"
                    variant="default"
                    [ngModel]="basicValue()"
                    (valueChange)="onBasicChange($event)"
                  />
                  @if (basicValue()) {
                    <Badge variant="secondary" class="mt-2">
                      Selected: {{ selectedBasicLabel() }}
                    </Badge>
                  }
                </div>
              </CardContent>
            </Card>

            <!-- Searchable Select -->
            <Card class="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader class="pb-4">
                <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <CardTitle class="text-slate-900 dark:text-white">Searchable</CardTitle>
                <CardDescription class="text-slate-600 dark:text-slate-300">
                  Filter options with real-time search functionality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="space-y-4">
                  <SelectComponent
                    [options]="countryOptions()"
                    placeholder="Search countries..."
                    [searchable]="true"
                    variant="default"
                    [ngModel]="searchableValue()"
                    (valueChange)="onSearchableChange($event)"
                  />
                  @if (searchableValue()) {
                    <Badge variant="secondary" class="mt-2">
                      Selected: {{ selectedSearchableLabel() }}
                    </Badge>
                  }
                </div>
              </CardContent>
            </Card>

            <!-- Grouped Select -->
            <Card class="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader class="pb-4">
                <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7v7m0 0v7m0-7l-5-5m5 5l-5 5"/>
                  </svg>
                </div>
                <CardTitle class="text-slate-900 dark:text-white">Grouped Options</CardTitle>
                <CardDescription class="text-slate-600 dark:text-slate-300">
                  Organize options into logical groups for better UX
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="space-y-4">
                  <SelectComponent
                    [options]="groupedOptions()"
                    placeholder="Choose technology..."
                    [searchable]="true"
                    variant="default"
                    [ngModel]="groupedValue()"
                    (valueChange)="onGroupedChange($event)"
                  />
                  @if (groupedValue()) {
                    <Badge variant="secondary" class="mt-2">
                      Selected: {{ selectedGroupedLabel() }}
                    </Badge>
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <!-- Detailed Examples Section -->
      <div class="py-16 sm:py-20 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Advanced Examples
            </h2>
            <p class="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Explore advanced use cases and customization options
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Plan Selection -->
            <div class="space-y-6">
              <div>
                <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Pricing Plan Selector
                </h3>
                <p class="text-slate-600 dark:text-slate-300">
                  Rich options with descriptions and custom styling
                </p>
              </div>
              
              <Card class="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent class="p-6">
                  <SelectComponent
                    [options]="planOptions()"
                    placeholder="Choose your plan..."
                    variant="default"
                    size="lg"
                    [ngModel]="planValue()"
                    (valueChange)="onPlanChange($event)"
                    class="mb-6"
                  />
                  
                  @if (selectedPlan()) {
                    <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        {{ selectedPlan()?.label }}
                      </h4>
                      <p class="text-blue-700 dark:text-blue-300 text-sm">
                        {{ selectedPlan()?.description }}
                      </p>
                    </div>
                  }
                </CardContent>
              </Card>
            </div>

            <!-- Variants Showcase -->
            <div class="space-y-6">
              <div>
                <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Variants & Sizes
                </h3>
                <p class="text-slate-600 dark:text-slate-300">
                  Different visual styles for various contexts
                </p>
              </div>
              
              <Card class="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent class="p-6 space-y-6">
                  <!-- Default Variant -->
                  <div>
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Default Variant
                    </label>
                    <SelectComponent
                      [options]="basicOptions()"
                      placeholder="Default style..."
                      variant="default"
                    />
                  </div>
                  
                  <!-- Success Variant -->
                  <div>
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Success Variant
                    </label>
                    <SelectComponent
                      [options]="basicOptions()"
                      placeholder="Success style..."
                      variant="success"
                    />
                  </div>
                  
                  <!-- Destructive Variant -->
                  <div>
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Destructive Variant
                    </label>
                    <SelectComponent
                      [options]="basicOptions()"
                      placeholder="Destructive style..."
                      variant="destructive"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Playground -->
      <div class="py-16 sm:py-20">
        <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Interactive Playground
            </h2>
            <p class="text-lg text-slate-600 dark:text-slate-300">
              Experiment with different configurations in real-time
            </p>
          </div>

          <Card class="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent class="p-8">
              <!-- Configuration Controls -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Variant
                  </label>
                  <SelectComponent
                    [options]="variantOptions()"
                    [ngModel]="playgroundVariant()"
                    (valueChange)="onPlaygroundVariantChange($event)"
                    size="sm"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Size
                  </label>
                  <SelectComponent
                    [options]="sizeOptions()"
                    [ngModel]="playgroundSize()"
                    (valueChange)="onPlaygroundSizeChange($event)"
                    size="sm"
                  />
                </div>
                
                <div class="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="searchable"
                    class="rounded border-gray-300"
                    [checked]="playgroundSearchable()"
                    (change)="playgroundSearchable.set($event.target.checked)"
                  />
                  <label for="searchable" class="text-sm text-slate-700 dark:text-slate-300">
                    Searchable
                  </label>
                </div>
                
                <div class="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="disabled"
                    class="rounded border-gray-300"
                    [checked]="playgroundDisabled()"
                    (change)="playgroundDisabled.set($event.target.checked)"
                  />
                  <label for="disabled" class="text-sm text-slate-700 dark:text-slate-300">
                    Disabled
                  </label>
                </div>
              </div>

              <!-- Preview -->
              <div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-8 mb-6">
                <h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Preview
                </h4>
                <div class="max-w-md">
                  <SelectComponent
                    [options]="basicOptions()"
                    placeholder="Customizable select..."
                    [variant]="playgroundVariant()"
                    [size]="playgroundSize()"
                    [searchable]="playgroundSearchable()"
                    [disabled]="playgroundDisabled()"
                    [ngModel]="playgroundValue()"
                    (valueChange)="onPlaygroundChange($event)"
                  />
                </div>
              </div>

              <!-- Reset Button -->
              <div class="flex justify-center">
                <Button
                  variant="outline"
                  (click)="resetPlayground()"
                  class="inline-flex items-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Reset Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Key Features -->
      <div class="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/50">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose Our Select Component?
            </h2>
            <p class="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Built with modern standards and best practices in mind
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Accessibility -->
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Fully Accessible
              </h3>
              <p class="text-slate-600 dark:text-slate-300">
                WCAG 2.1 compliant with complete keyboard navigation, screen reader support, and ARIA attributes.
              </p>
            </div>

            <!-- Performance -->
            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                High Performance
              </h3>
              <p class="text-slate-600 dark:text-slate-300">
                Optimized with Angular signals, OnPush change detection, and virtual scrolling for large datasets.
              </p>
            </div>

            <!-- Customizable -->
            <div class="text-center">
              <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h4"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Highly Customizable
              </h3>
              <p class="text-slate-600 dark:text-slate-300">
                Multiple variants, sizes, custom styling, and extensive configuration options to fit any design system.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Documentation Link -->
      <div class="py-16 sm:py-20">
        <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Card class="border-0 shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent class="p-8">
              <div class="space-y-6">
                <div class="space-y-4">
                  <h2 class="text-3xl font-bold">Ready to Get Started?</h2>
                  <p class="text-xl text-blue-100 max-w-2xl mx-auto">
                    Explore our comprehensive documentation with examples, API reference, and best practices.
                  </p>
                </div>
                
                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/select.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-3 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    View Documentation
                  </a>
                  
                  <a
                    href="https://github.com/bhaimicrosoft/angular-superui"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-3 px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View Source
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  `
})
export default class SelectDemoComponent {
  // Basic Select
  readonly basicValue = signal<string | null>(null);
  readonly basicOptions = signal<SelectOption[]>([
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' },
    { value: 'strawberry', label: 'Strawberry' }
  ]);

  // Searchable Select
  readonly searchableValue = signal<string | null>(null);
  readonly countryOptions = signal<SelectOption[]>([
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'au', label: 'Australia' },
    { value: 'br', label: 'Brazil' },
    { value: 'in', label: 'India' },
    { value: 'cn', label: 'China' }
  ]);

  // Grouped Select
  readonly groupedValue = signal<string | null>(null);
  readonly groupedOptions = signal<SelectOption[]>([
    { value: 'js', label: 'JavaScript', group: 'Frontend' },
    { value: 'ts', label: 'TypeScript', group: 'Frontend' },
    { value: 'react', label: 'React', group: 'Frontend' },
    { value: 'angular', label: 'Angular', group: 'Frontend' },
    { value: 'vue', label: 'Vue.js', group: 'Frontend' },
    { value: 'node', label: 'Node.js', group: 'Backend' },
    { value: 'python', label: 'Python', group: 'Backend' },
    { value: 'java', label: 'Java', group: 'Backend' },
    { value: 'csharp', label: 'C#', group: 'Backend' },
    { value: 'go', label: 'Go', group: 'Backend' },
    { value: 'mysql', label: 'MySQL', group: 'Database' },
    { value: 'postgres', label: 'PostgreSQL', group: 'Database' },
    { value: 'mongodb', label: 'MongoDB', group: 'Database' }
  ]);

  // Plan Select with descriptions
  readonly planValue = signal<string | null>(null);
  readonly planOptions = signal<SelectOption[]>([
    {
      value: 'free',
      label: 'Free Plan',
      description: 'Perfect for getting started with basic features'
    },
    {
      value: 'pro',
      label: 'Pro Plan',
      description: 'Enhanced features for growing teams and businesses'
    },
    {
      value: 'enterprise',
      label: 'Enterprise Plan',
      description: 'Advanced features with dedicated support and SLA'
    },
    {
      value: 'custom',
      label: 'Custom Plan',
      description: 'Tailored solution for specific requirements',
      disabled: true
    }
  ]);

  // Playground Configuration
  readonly playgroundVariant = signal<'default' | 'destructive' | 'success'>('default');
  readonly playgroundSize = signal<'default' | 'sm' | 'lg'>('default');
  readonly playgroundSearchable = signal<boolean>(false);
  readonly playgroundDisabled = signal<boolean>(false);
  readonly playgroundValue = signal<string | null>(null);

  readonly variantOptions = signal<SelectOption[]>([
    { value: 'default', label: 'Default' },
    { value: 'success', label: 'Success' },
    { value: 'destructive', label: 'Destructive' }
  ]);

  readonly sizeOptions = signal<SelectOption[]>([
    { value: 'sm', label: 'Small' },
    { value: 'default', label: 'Default' },
    { value: 'lg', label: 'Large' }
  ]);

  // Computed selected plan for display
  readonly selectedPlan = signal<SelectOption | null>(null);
  
  // Computed display values for badges
  readonly selectedBasicLabel = computed(() => {
    const value = this.basicValue();
    return value ? this.basicOptions().find(o => o.value === value)?.label : null;
  });
  
  readonly selectedSearchableLabel = computed(() => {
    const value = this.searchableValue();
    return value ? this.countryOptions().find(o => o.value === value)?.label : null;
  });
  
  readonly selectedGroupedLabel = computed(() => {
    const value = this.groupedValue();
    return value ? this.groupedOptions().find(o => o.value === value)?.label : null;
  });

  constructor() {
    // Update selected plan when plan value changes
    effect(() => {
      const value = this.planValue();
      const plan = this.planOptions().find(p => p.value === value);
      this.selectedPlan.set(plan || null);
    });
  }

  onBasicChange(value: string | null) {
    console.log('Basic select changed:', value);
    this.basicValue.set(value);
  }

  onSearchableChange(value: string | null) {
    console.log('Searchable select changed:', value);
    this.searchableValue.set(value);
  }

  onGroupedChange(value: string | null) {
    console.log('Grouped select changed:', value);
    this.groupedValue.set(value);
  }

  onPlanChange(value: string | null) {
    console.log('Plan select changed:', value);
    this.planValue.set(value);
    const plan = this.planOptions().find(p => p.value === value);
    this.selectedPlan.set(plan || null);
  }

  onPlaygroundChange(value: string | null) {
    console.log('Playground select changed:', value);
    this.playgroundValue.set(value);
  }
  
  onPlaygroundVariantChange(value: string | null) {
    this.playgroundVariant.set(value as 'default' | 'destructive' | 'success');
  }
  
  onPlaygroundSizeChange(value: string | null) {
    this.playgroundSize.set(value as 'default' | 'sm' | 'lg');
  }

  resetPlayground() {
    this.playgroundVariant.set('default');
    this.playgroundSize.set('default');
    this.playgroundSearchable.set(false);
    this.playgroundDisabled.set(false);
    this.playgroundValue.set(null);
  }
}
