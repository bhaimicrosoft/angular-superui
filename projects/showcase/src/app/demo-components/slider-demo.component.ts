import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Slider } from '@lib/slider';

@Component({
  selector: 'app-slider-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Slider
  ],
  template: `
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-20 sm:py-32">
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            <span class="block">Smooth</span>
            <span class="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
              Slider
            </span>
            <span class="block">Controls</span>
          </h1>
          <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl">
            Create intuitive range controls with our comprehensive slider component.
            Single values, ranges, custom styling, and full accessibility support.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-24">

        <!-- Basic Usage -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Basic Usage
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Simple slider controls for single values and ranges with smooth interaction.
            </p>
          </div>

          <div class="grid gap-8 lg:grid-cols-2">
            <!-- Single Value Slider -->
            <div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Single Value Slider
              </h3>
              <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Volume: {{singleValue()}}%
                  </label>
                  <Slider
                    [min]="0"
                    [max]="100"
                    [step]="1"
                    [(ngModel)]="singleValue"
                    class="w-full"
                    variant="primary"
                  />
                </div>
                <div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Perfect for volume controls, brightness settings, and progress indicators
                  </p>
                </div>
              </div>
            </div>

            <!-- Range Slider -->
            <div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Range Slider
              </h3>
              <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Price Range: {{formatPriceRange()}}
                  </label>
                  <Slider
                    [min]="0"
                    [max]="1000"
                    [step]="10"
                    [range]="true"
                    [(ngModel)]="rangeValue"
                    class="w-full"
                    variant="success"
                  />
                </div>
                <div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ideal for price filters, date ranges, and dual-value selections
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Variants & Styles -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Variants & Styles
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Multiple color variants, sizes, and orientations to match your design.
            </p>
          </div>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Color Variants -->
            <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Color Variants</h3>
              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Default</span>
                  <Slider
                    [min]="0"
                    [max]="100"
                    [value]="50"
                    variant="default"
                    class="w-full"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Primary</span>
                  <Slider
                    [min]="0"
                    [max]="100"
                    [value]="60"
                    variant="primary"
                    class="w-full"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Success</span>
                  <Slider
                    [min]="0"
                    [max]="100"
                    [value]="70"
                    variant="success"
                    class="w-full"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Warning</span>
                  <Slider
                    [min]="0"
                    [max]="100"
                    [value]="80"
                    variant="warning"
                    class="w-full"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Destructive</span>
                  <Slider
                    [min]="0"
                    [max]="100"
                    [value]="40"
                    variant="destructive"
                    class="w-full"
                  />
                </div>
              </div>
            </div>

            <!-- Size Variants -->
            <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Size Variants</h3>
              <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-2">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Small</span>
                  <Slider
                    [min]="0"
                    [max]="100"
                    [value]="30"
                    size="sm"
                    variant="primary"
                    class="w-full"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Default</span>
                  <Slider
                    [min]="0"
                    [max]="100"
                    [value]="50"
                    size="default"
                    variant="primary"
                    class="w-full"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Large</span>
                  <Slider
                    [min]="0"
                    [max]="100"
                    [value]="70"
                    size="lg"
                    variant="primary"
                    class="w-full"
                  />
                </div>
              </div>
            </div>

            <!-- Vertical Orientation -->
            <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Vertical Sliders</h3>
              <div class="flex justify-around items-center h-48">
                <div class="flex flex-col items-center gap-2">
                  <Slider
                    [min]="0"
                    [max]="100"
                    [value]="30"
                    orientation="vertical"
                    size="sm"
                    variant="primary"
                    class="h-32"
                  />
                  <span class="text-xs text-gray-500 dark:text-gray-400">Small</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <Slider
                    [min]="0"
                    [max]="100"
                    [value]="60"
                    orientation="vertical"
                    size="default"
                    variant="success"
                    class="h-32"
                  />
                  <span class="text-xs text-gray-500 dark:text-gray-400">Default</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <Slider
                    [min]="0"
                    [max]="100"
                    [value]="80"
                    orientation="vertical"
                    size="lg"
                    variant="warning"
                    class="h-32"
                  />
                  <span class="text-xs text-gray-500 dark:text-gray-400">Large</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Form Integration -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Form Integration
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Seamless integration with Angular forms, validation, and reactive patterns.
            </p>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
              Reactive Forms
            </h3>
            <form [formGroup]="reactiveForm" class="flex flex-col gap-6">
              <div class="flex flex-col gap-3">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Budget: {{getBudgetValue()}}
                </label>
                <Slider
                  [min]="0"
                  [max]="10000"
                  [step]="100"
                  formControlName="budget"
                  variant="success"
                  class="w-full"
                />
              </div>

              <div class="flex flex-col gap-3">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Priority Level: {{getPriorityValue()}}
                </label>
                <Slider
                  [min]="1"
                  [max]="10"
                  [step]="1"
                  formControlName="priority"
                  variant="primary"
                  class="w-full"
                />
              </div>

              <div class="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                <p class="text-sm text-green-700 dark:text-green-300">
                  <strong>Form Values:</strong><br>
                  Budget: {{getBudgetValue()}}<br>
                  Priority: {{getPriorityValue()}}/10<br>
                  Valid: {{reactiveForm.valid ? 'Yes' : 'No'}}
                </p>
              </div>
            </form>
          </div>
        </section>

        <!-- Accessibility & Keyboard Navigation -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Accessibility & Keyboard Navigation
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Full keyboard support and screen reader accessibility for inclusive user experiences.
            </p>
          </div>

          <div class="grid gap-8 lg:grid-cols-2">
            <!-- Keyboard Navigation Demo -->
            <div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Keyboard Navigation
              </h3>
              <div class="flex flex-col gap-6">
                <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                  <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                    Keyboard Controls:
                  </h4>
                  <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• <kbd class="px-1 py-0.5 bg-blue-100 dark:bg-blue-800 rounded text-xs">Tab/Shift+Tab</kbd> Set focus on slider</li>
                    <li>• <kbd class="px-1 py-0.5 bg-blue-100 dark:bg-blue-800 rounded text-xs">←→</kbd> Arrow keys (horizontal)</li>
                    <li>• <kbd class="px-1 py-0.5 bg-blue-100 dark:bg-blue-800 rounded text-xs">↑↓</kbd> Arrow keys (vertical)</li>
                    <li>• <kbd class="px-1 py-0.5 bg-blue-100 dark:bg-blue-800 rounded text-xs">Page Up/Down</kbd> Large increments</li>
                    <li>• <kbd class="px-1 py-0.5 bg-blue-100 dark:bg-blue-800 rounded text-xs">Home/End</kbd> Min/Max values</li>
                    <li>• <kbd class="px-1 py-0.5 bg-blue-100 dark:bg-blue-800 rounded text-xs">Escape</kbd> Release focus</li>
                  </ul>
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Focus this slider and hold arrow keys: {{accessibilityValue()}}
                  </label>
                  <Slider
                    [min]="0"
                    [max]="100"
                    [step]="1"
                    [(ngModel)]="accessibilityValue"
                    class="w-full"
                    variant="primary"
                    ariaLabel="Accessibility demonstration slider"
                  />
                </div>
                <div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tab to focus the slider, then hold arrow keys for continuous movement. Focus is preserved during navigation.
                  </p>
                </div>
              </div>
            </div>

            <!-- Screen Reader Support -->
            <div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Screen Reader Support
              </h3>
              <div class="flex flex-col gap-6">
                <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                  <h4 class="font-semibold text-green-900 dark:text-green-300 mb-2">
                    ARIA Features:
                  </h4>
                  <ul class="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li>• Role="slider" with proper ARIA attributes</li>
                    <li>• Live regions for value announcements</li>
                    <li>• Descriptive labels and instructions</li>
                    <li>• High contrast mode support</li>
                  </ul>
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Range with screen reader support: {{formatScreenReaderRange()}}
                  </label>
                  <Slider
                    [min]="0"
                    [max]="200"
                    [step]="2"
                    [range]="true"
                    [(ngModel)]="screenReaderValue"
                    class="w-full"
                    variant="success"
                    ariaLabel="Temperature range selector"
                  />
                </div>
                <div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Screen readers announce value changes and provide navigation instructions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Documentation Link -->
        <section class="text-center py-16 border-t border-gray-200 dark:border-gray-700">
          <div class="max-w-2xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Documentation
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              Learn more about all the features, props, accessibility options, and advanced usage patterns.
            </p>
            <a 
              href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/slider.md"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25A8.966 8.966 0 0118 3.75c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6-2.292m0-14.25v14.25" />
              </svg>
              View Full Documentation
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </section>

      </div>
    </main>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderDemoComponent {
  // Component state signals
  singleValue = signal(50);
  rangeValue = signal([200, 800]);
  accessibilityValue = signal(25);
  screenReaderValue = signal([40, 160]);

  // Reactive form for demonstration
  reactiveForm = new FormGroup({
    budget: new FormControl(5000),
    priority: new FormControl(5)
  });

  // Helper methods for formatting
  formatPriceRange(): string {
    const values = this.rangeValue();
    return `$${values[0]} - $${values[1]}`;
  }

  formatScreenReaderRange(): string {
    const values = this.screenReaderValue();
    return `${values[0]}°F - ${values[1]}°F`;
  }

  getBudgetValue(): string {
    const value = this.reactiveForm.get('budget')?.value;
    return `$${value}`;
  }

  getPriorityValue(): number {
    return this.reactiveForm.get('priority')?.value || 0;
  }
}
