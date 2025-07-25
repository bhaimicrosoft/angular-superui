import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  RadioGroup,
  RadioOption,
  createRadioGroupAccessibility,
  type RadioVariant,
  type RadioGroupVariant
} from '@lib/radio-group';

@Component({
  selector: 'app-radio-group-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RadioGroup
  ],
  template: `
    <!-- SEO Meta Information -->
    <div class="sr-only">
      <h1>Angular RadioGroup Component - Advanced Radio Button Groups</h1>
      <p>Discover our highly customizable Angular radio group component with accessibility features, form integration,
        and multiple variants. Perfect for modern web applications.</p>
      <meta name="description"
            content="Comprehensive Angular RadioGroup component with full accessibility support, form integration, multiple variants, and responsive design for modern web applications.">
      <meta name="keywords"
            content="Angular RadioGroup, radio buttons, form controls, accessibility, Angular UI components, radio group variants">
    </div>

    <!-- Hero Section -->
    <section
      class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-20 sm:py-32">


      <div
        class="absolute inset-0 opacity-30 dark:opacity-20"
        style="background-image: radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0); background-size: 20px 20px;"></div>
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <!-- Hero Badge -->
          <div
            class="mx-auto mb-6 w-fit rounded-full border border-blue-200 bg-blue-50 px-4 py-2 dark:border-blue-800 dark:bg-blue-900/50">
            <p class="text-sm font-medium text-blue-700 dark:text-blue-300">
              ✨ Form Controls Collection
            </p>
          </div>

          <!-- Hero Title -->
          <h1
            class="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
            <span class="block">Advanced</span>
            <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              RadioGroup
            </span>
            <span class="block">Component</span>
          </h1>

          <!-- Hero Description -->
          <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl">
            Build sophisticated radio button groups with full accessibility support,
            form integration, multiple variants, and seamless user experience.
          </p>

          <!-- Hero Features -->
          <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="rounded-lg bg-white/60 p-4 backdrop-blur-sm dark:bg-gray-800/60">
              <div class="text-sm font-semibold text-gray-900 dark:text-white">🎯 Accessible</div>
              <div class="text-xs text-gray-600 dark:text-gray-300">WCAG 2.1 AA compliant</div>
            </div>
            <div class="rounded-lg bg-white/60 p-4 backdrop-blur-sm dark:bg-gray-800/60">
              <div class="text-sm font-semibold text-gray-900 dark:text-white">🎨 Customizable</div>
              <div class="text-xs text-gray-600 dark:text-gray-300">Multiple variants & sizes</div>
            </div>
            <div class="rounded-lg bg-white/60 p-4 backdrop-blur-sm dark:bg-gray-800/60">
              <div class="text-sm font-semibold text-gray-900 dark:text-white">📱 Responsive</div>
              <div class="text-xs text-gray-600 dark:text-gray-300">Mobile-first design</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="space-y-24">

        <!-- Basic Usage -->
        <section class="space-y-8">
          <div class="text-center space-y-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Basic Usage
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Get started with simple radio groups that work perfectly out of the box.
            </p>
          </div>

          <div class="grid gap-8 lg:grid-cols-2">
            <div
              class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Vertical Layout (Default)
              </h3>
              <div class="space-y-4">
                <RadioGroup
                  [options]="basicOptions()"
                  [(value)]="basicValue"
                  [accessibility]="createAccessibility('Choose your preferred framework')"
                  className="space-y-3"
                />
                <div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Selected: <span class="text-blue-600 dark:text-blue-400">{{ basicValue || 'None' }}</span>
                  </p>
                </div>
              </div>
            </div>

            <div
              class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Horizontal Layout
              </h3>
              <div class="space-y-4">
                <RadioGroup
                  [options]="basicOptions()"
                  [(value)]="horizontalValue"
                  orientation="horizontal"
                  [accessibility]="createAccessibility('Choose your preferred framework')"
                  className="flex flex-wrap gap-6"
                />
                <div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Selected: <span class="text-blue-600 dark:text-blue-400">{{ horizontalValue || 'None' }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Variants -->
        <section class="space-y-8">
          <div class="text-center space-y-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Color Variants
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Express different meanings and states with our carefully crafted color variants.
            </p>
          </div>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Default</h3>
              <RadioGroup
                [options]="variantOptions()"
                [(value)]="defaultVariantValue"
                variant="default"
                className="space-y-3"
              />
            </div>

            <div
              class="rounded-2xl border border-red-200 bg-red-50/50 p-6 shadow-sm dark:border-red-800 dark:bg-red-900/20">
              <h3 class="mb-4 text-lg font-semibold text-red-900 dark:text-red-100">Destructive</h3>
              <RadioGroup
                [options]="variantOptions()"
                [(value)]="destructiveVariantValue"
                variant="destructive"
                className="space-y-3"
              />
            </div>

            <div
              class="rounded-2xl border border-green-200 bg-green-50/50 p-6 shadow-sm dark:border-green-800 dark:bg-green-900/20">
              <h3 class="mb-4 text-lg font-semibold text-green-900 dark:text-green-100">Success</h3>
              <RadioGroup
                [options]="variantOptions()"
                [(value)]="successVariantValue"
                variant="success"
                className="space-y-3"
              />
            </div>

            <div
              class="rounded-2xl border border-yellow-200 bg-yellow-50/50 p-6 shadow-sm dark:border-yellow-800 dark:bg-yellow-900/20">
              <h3 class="mb-4 text-lg font-semibold text-yellow-900 dark:text-yellow-100">Warning</h3>
              <RadioGroup
                [options]="variantOptions()"
                [(value)]="warningVariantValue"
                variant="warning"
                className="space-y-3"
              />
            </div>

            <div
              class="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-700/50">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Secondary</h3>
              <RadioGroup
                [options]="variantOptions()"
                [(value)]="secondaryVariantValue"
                variant="secondary"
                className="space-y-3"
              />
            </div>
          </div>
        </section>

        <!-- Sizes -->
        <section class="space-y-8">
          <div class="text-center space-y-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Size Variants
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Choose the perfect size for your design context and user interface needs.
            </p>
          </div>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Small</h3>
              <RadioGroup
                [options]="sizeOptions()"
                [(value)]="smallSizeValue"
                size="sm"
                className="space-y-3"
              />
            </div>

            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Default</h3>
              <RadioGroup
                [options]="sizeOptions()"
                [(value)]="defaultSizeValue"
                size="default"
                className="space-y-3"
              />
            </div>

            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Large</h3>
              <RadioGroup
                [options]="sizeOptions()"
                [(value)]="largeSizeValue"
                size="lg"
                className="space-y-3"
              />
            </div>

            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Extra Large</h3>
              <RadioGroup
                [options]="sizeOptions()"
                [(value)]="xlSizeValue"
                size="xl"
                className="space-y-3"
              />
            </div>
          </div>
        </section>

        <!-- With Descriptions -->
        <section class="space-y-4">
          <h2 class="text-2xl font-semibold">With Descriptions</h2>
          <div class="max-w-md">
            <RadioGroup
              [options]="descriptionOptions()"
              [(value)]="descriptionValue"
              [accessibility]="createAccessibility('Choose your subscription plan')"
            />
            <p class="text-sm text-muted-foreground mt-3">
              Selected: {{ descriptionValue || 'None' }}
            </p>
          </div>
        </section>

        <!-- Disabled States -->
        <section class="space-y-4">
          <h2 class="text-2xl font-semibold">Disabled States</h2>
          <div class="grid gap-6 lg:grid-cols-2">
            <div class="space-y-3">
              <h3 class="text-lg font-medium">Individual Items Disabled</h3>
              <RadioGroup
                [options]="disabledItemsOptions()"
                [(value)]="disabledItemsValue"
              />
            </div>

            <div class="space-y-3">
              <h3 class="text-lg font-medium">Entire Group Disabled</h3>
              <RadioGroup
                [options]="basicOptions()"
                [(value)]="disabledGroupValue"
                [disabled]="true"
              />
            </div>
          </div>
        </section>

        <!-- Form Integration -->
        <section class="space-y-8">
          <div class="text-center space-y-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Form Integration
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Seamlessly integrate with Angular reactive forms with full validation support.
            </p>
          </div>

          <div class="mx-auto max-w-2xl">
            <div
              class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <form [formGroup]="demoForm" (ngSubmit)="onSubmit()" class="space-y-6">
                <div class="space-y-4">
                  <label class="block text-sm font-semibold text-gray-900 dark:text-white">
                    Programming Language <span class="text-red-500">*</span>
                  </label>
                  <RadioGroup
                    formControlName="language"
                    [options]="languageOptions()"
                    [required]="true"
                    [accessibility]="createAccessibility('Choose your primary programming language', true)"
                    className="space-y-3"
                  />
                  <div *ngIf="demoForm.get('language')?.invalid && demoForm.get('language')?.touched"
                       class="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    Please select a programming language
                  </div>
                </div>

                <div class="space-y-4">
                  <label class="block text-sm font-semibold text-gray-900 dark:text-white">Experience Level</label>
                  <RadioGroup
                    formControlName="experience"
                    [options]="experienceOptions()"
                    orientation="horizontal"
                    className="flex flex-wrap gap-6"
                  />
                </div>

                <div class="flex gap-3 pt-4">
                  <button
                    type="submit"
                    class="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    [disabled]="demoForm.invalid"
                  >
                    Submit Form
                  </button>
                  <button
                    type="button"
                    (click)="resetForm()"
                    class="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Reset
                  </button>
                </div>
              </form>

              <div *ngIf="formSubmitted()" class="mt-6 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">Form Submitted Successfully!</h4>
                <pre class="text-sm text-green-700 dark:text-green-300 overflow-auto">{{ demoForm.value | json }}</pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="text-center space-y-8">
          <!-- Footer Header -->
          <div class="space-y-4">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Ready to Get Started?
            </h2>
            <p class="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
              Explore our comprehensive documentation and learn how to integrate RadioGroup into your Angular
              applications.
            </p>
          </div>

          <!-- Documentation Link -->
          <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/radio-group.md"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="View RadioGroup documentation on GitHub"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clip-rule="evenodd"/>
              </svg>
              View Documentation
              <svg class="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor"
                   viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>

          <!-- Footer Info -->
          <div class="border-t border-gray-200 pt-8 dark:border-gray-700">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Part of Angular SuperUI - A comprehensive component library for modern Angular applications.
            </p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .bg-grid-slate-100 {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='m0 .5h32v32h-32z'/%3e%3c/svg%3e");
    }

    .dark .bg-grid-slate-700\/25 {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(51 65 85 / 0.25)'%3e%3cpath d='m0 .5h32v32h-32z'/%3e%3c/svg%3e");
    }

    @media (max-width: 640px) {
      .hero-title {
        font-size: 2.5rem;
        line-height: 1.1;
      }

      .hero-grid {
        grid-template-columns: 1fr;
        gap: 0.75rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `]
})
export class RadioGroupDemoComponent {
  // Basic usage values
  basicValue: string | null = null;
  horizontalValue: string | null = 'react';

  // Variant values
  defaultVariantValue: string | null = null;
  destructiveVariantValue: string | null = null;
  successVariantValue: string | null = null;
  warningVariantValue: string | null = null;
  secondaryVariantValue: string | null = null;

  // Size values
  smallSizeValue: string | null = null;
  defaultSizeValue: string | null = null;
  largeSizeValue: string | null = null;
  xlSizeValue: string | null = null;

  // Other demo values
  descriptionValue: string | null = null;
  disabledItemsValue: string | null = null;
  disabledGroupValue: string | null = null;
  customStyledValue: string | null = null;
  eventValue: string | null = null;
  accessibilityValue: string | null = null;

  // Event tracking
  lastValueChange: string | null = null;
  lastSelectionChange: string | null = null;

  // Form integration
  demoForm: FormGroup;
  formSubmitted = signal(false);

  constructor(private fb: FormBuilder) {
    this.demoForm = this.fb.group({
      language: ['', Validators.required],
      experience: ['intermediate']
    });
  }

  // Option sets
  basicOptions = signal<RadioOption[]>([
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' }
  ]);

  variantOptions = signal<RadioOption[]>([
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]);

  sizeOptions = signal<RadioOption[]>([
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ]);

  descriptionOptions = signal<RadioOption[]>([
    {
      value: 'free',
      label: 'Free',
      description: 'Perfect for personal projects and learning'
    },
    {
      value: 'pro',
      label: 'Pro',
      description: 'Best for growing teams and businesses'
    },
    {
      value: 'enterprise',
      label: 'Enterprise',
      description: 'Advanced features for large organizations'
    }
  ]);

  disabledItemsOptions = signal<RadioOption[]>([
    { value: 'enabled1', label: 'Enabled Option 1' },
    { value: 'disabled1', label: 'Disabled Option 1', disabled: true },
    { value: 'enabled2', label: 'Enabled Option 2' },
    { value: 'disabled2', label: 'Disabled Option 2', disabled: true }
  ]);

  languageOptions = signal<RadioOption[]>([
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'rust', label: 'Rust' },
    { value: 'go', label: 'Go' }
  ]);

  experienceOptions = signal<RadioOption[]>([
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ]);

  customStyledOptions = signal<RadioOption[]>([
    {
      value: 'custom1',
      label: 'Custom Styled Option 1',
      className: 'text-blue-600 dark:text-blue-400'
    },
    {
      value: 'custom2',
      label: 'Custom Styled Option 2',
      className: 'text-green-600 dark:text-green-400'
    },
    {
      value: 'custom3',
      label: 'Custom Styled Option 3',
      className: 'text-purple-600 dark:text-purple-400'
    }
  ]);

  eventOptions = signal<RadioOption[]>([
    { value: 'event1', label: 'Event Option 1' },
    { value: 'event2', label: 'Event Option 2' },
    { value: 'event3', label: 'Event Option 3' }
  ]);

  accessibilityOptions = signal<RadioOption[]>([
    {
      value: 'high-contrast',
      label: 'High Contrast',
      description: 'Enhanced visual contrast for better readability'
    },
    {
      value: 'large-text',
      label: 'Large Text',
      description: 'Increased font sizes for easier reading'
    },
    {
      value: 'reduced-motion',
      label: 'Reduced Motion',
      description: 'Minimized animations and transitions'
    },
    {
      value: 'screen-reader',
      label: 'Screen Reader Optimized',
      description: 'Enhanced compatibility with assistive technologies'
    }
  ]);

  // Helper method to create accessibility configuration
  createAccessibility(
    label?: string,
    required: boolean = false,
    live: 'off' | 'polite' | 'assertive' = 'polite'
  ) {
    return createRadioGroupAccessibility({
      ariaLabel: label,
      ariaRequired: required,
      ariaLive: live
    });
  }

  // Event handlers
  onValueChange(value: string | null): void {
    this.lastValueChange = value;
  }

  onSelectionChange(option: RadioOption | null): void {
    this.lastSelectionChange = option ? `${option.label} (${option.value})` : null;
  }

  onSubmit(): void {
    if (this.demoForm.valid) {
      this.formSubmitted.set(true);
      console.log('Form submitted:', this.demoForm.value);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.demoForm.controls).forEach(key => {
        this.demoForm.get(key)?.markAsTouched();
      });
    }
  }

  resetForm(): void {
    this.demoForm.reset({
      experience: 'intermediate'
    });
    this.formSubmitted.set(false);
  }
}
