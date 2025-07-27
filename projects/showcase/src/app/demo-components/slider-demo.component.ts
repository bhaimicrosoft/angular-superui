import { ChangeDetectionStrategy, Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
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
    <section
      class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-12 sm:py-20 lg:py-32">
      <div
        class="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1
            class="mx-auto max-w-4xl text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            <span class="block">Advanced</span>
            <span class="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
              Slider Component
            </span>
            <span class="block">with CVA Pattern</span>
          </h1>
          <p
            class="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg lg:text-xl lg:leading-8">
            Enterprise-grade slider component with Class Variance Authority (CVA) integration, complete accessibility
            compliance,
            and comprehensive customization options. Perfect for modern Angular applications requiring range inputs,
            form controls, and interactive data visualization.
          </p>
          <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
              </svg>
              <span>WCAG 2.1 AA Compliant</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg class="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
              </svg>
              <span>TypeScript Support</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg class="h-5 w-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
              </svg>
              <span>CVA Integration</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-24">
      <div class="flex flex-col gap-16 sm:gap-20 lg:gap-24">

        <!-- Basic Usage -->
        <section id="basic-usage" class="flex flex-col gap-6 sm:gap-8">
          <div class="text-center flex flex-col gap-3 sm:gap-4">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">
              Basic Usage
            </h2>
            <p class="mx-auto max-w-3xl text-base text-gray-600 dark:text-gray-300 sm:text-lg">
              Simple slider controls for single values and ranges with smooth interaction and real-time feedback.
            </p>
          </div>

          <div class="grid gap-6 sm:gap-8 lg:grid-cols-2">
            <!-- Single Value Slider -->
            <div
              class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <h3 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white sm:mb-4">Single Value</h3>
              <div class="flex flex-col gap-3 sm:gap-4">
                <Slider
                  [value]="basicValues.single()"
                  (valueChange)="updateBasicSingle($event)"
                  [min]="0"
                  [max]="100"
                  [step]="1"
                  class="w-full"
                />
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Value: <span class="font-mono font-semibold">{{ basicValues.single() }}</span>
                </p>
              </div>
            </div>

            <!-- Range Slider -->
            <div
              class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <h3 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white sm:mb-4">Range Values</h3>
              <div class="flex flex-col gap-3 sm:gap-4">
                <Slider
                  [value]="basicValues.range()"
                  (valueChange)="updateBasicRange($event)"
                  [range]="true"
                  [min]="0"
                  [max]="100"
                  [step]="1"
                  class="w-full"
                />
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Range: <span class="font-mono font-semibold">{{ basicValues.range()[0] }}
                  - {{ basicValues.range()[1] }}</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- CVA Size Variants -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Size Variants (CVA)
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Multiple size variants with distinct thumb and track sizes using Class Variance Authority pattern.
            </p>
          </div>

          <div class="grid gap-8 sm:grid-cols-3">
            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Small (16px thumb)</h3>
              <Slider
                [value]="sizeValues.sm()"
                (valueChange)="updateSizeValue('sm', $event)"
                size="sm"
                variant="primary"
                [showTicks]="true"
                [ticks]="[0, 25, 50, 75, 100]"
                [showLabels]="true"
                class="w-full"
              />
              <p class="mt-6 text-sm text-gray-600 dark:text-gray-400">Value: {{ sizeValues.sm() }}</p>
            </div>

            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Default (20px thumb)</h3>
              <Slider
                [value]="sizeValues.default()"
                (valueChange)="updateSizeValue('default', $event)"
                size="default"
                variant="primary"
                [showTicks]="true"
                [ticks]="[0, 25, 50, 75, 100]"
                [showLabels]="true"
                class="w-full"
              />
              <p class="mt-6 text-sm text-gray-600 dark:text-gray-400">Value: {{ sizeValues.default() }}</p>
            </div>

            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Large (24px thumb)</h3>
              <Slider
                [value]="sizeValues.lg()"
                (valueChange)="updateSizeValue('lg', $event)"
                size="lg"
                variant="primary"
                [showTicks]="true"
                [ticks]="[0, 25, 50, 75, 100]"
                [showLabels]="true"
                class="w-full"
              />
              <p class="mt-6 text-sm text-gray-600 dark:text-gray-400">Value: {{ sizeValues.lg() }}</p>
            </div>
          </div>
        </section>

        <!-- CVA Color Variants -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Color Variants (CVA)
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Semantic color variants with consistent theming using CVA.
            </p>
          </div>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Default</h3>
              <Slider
                [value]="colorValues.default()"
                (valueChange)="updateColorValue('default', $event)"
                variant="default"
                class="w-full"
              />
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Value: {{ colorValues.default() }}</p>
            </div>

            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-blue-600 dark:text-blue-400">Primary</h3>
              <Slider
                [value]="colorValues.primary()"
                (valueChange)="updateColorValue('primary', $event)"
                variant="primary"
                class="w-full"
              />
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Value: {{ colorValues.primary() }}</p>
            </div>

            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-400">Secondary</h3>
              <Slider
                [value]="colorValues.secondary()"
                (valueChange)="updateColorValue('secondary', $event)"
                variant="secondary"
                class="w-full"
              />
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Value: {{ colorValues.secondary() }}</p>
            </div>

            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-green-600 dark:text-green-400">Success</h3>
              <Slider
                [value]="colorValues.success()"
                (valueChange)="updateColorValue('success', $event)"
                variant="success"
                class="w-full"
              />
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Value: {{ colorValues.success() }}</p>
            </div>

            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-orange-600 dark:text-orange-400">Warning</h3>
              <Slider
                [value]="colorValues.warning()"
                (valueChange)="updateColorValue('warning', $event)"
                variant="warning"
                class="w-full"
              />
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Value: {{ colorValues.warning() }}</p>
            </div>

            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-red-600 dark:text-red-400">Destructive</h3>
              <Slider
                [value]="colorValues.destructive()"
                (valueChange)="updateColorValue('destructive', $event)"
                variant="destructive"
                class="w-full"
              />
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Value: {{ colorValues.destructive() }}</p>
            </div>
          </div>
        </section>

        <!-- Advanced Features -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Advanced Features
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Ticks, labels, custom steps, and advanced customization options.
            </p>
          </div>

          <div class="grid gap-8 lg:grid-cols-2">
            <!-- Slider with Ticks and Labels -->
            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">With Ticks & Labels</h3>
              <Slider
                [value]="advancedValues.ticks()"
                (valueChange)="updateAdvancedValue('ticks', $event)"
                [min]="0"
                [max]="10"
                [step]="1"
                [showTicks]="true"
                [showLabels]="true"
                variant="success"
                size="lg"
                class="w-full"
              />
              <p class="mt-6 text-sm text-gray-600 dark:text-gray-400">
                Value: {{ advancedValues.ticks() }}
              </p>
            </div>

            <!-- Custom Tick Marks -->
            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Custom Tick Marks</h3>
              <Slider
                [value]="advancedValues.customTicks()"
                (valueChange)="updateAdvancedValue('customTicks', $event)"
                [min]="0"
                [max]="100"
                [step]="5"
                [showTicks]="true"
                [showLabels]="true"
                [ticks]="[0, 20, 40, 60, 80, 100]"
                variant="warning"
                size="default"
                class="w-full"
              />
              <p class="mt-6 text-sm text-gray-600 dark:text-gray-400">
                Value: {{ advancedValues.customTicks() }}
              </p>
            </div>

            <!-- Range with Ticks -->
            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Range with Ticks</h3>
              <Slider
                [value]="advancedValues.rangeTicks()"
                (valueChange)="updateAdvancedRangeValue('rangeTicks', $event)"
                [range]="true"
                [min]="0"
                [max]="100"
                [step]="10"
                [showTicks]="true"
                [showLabels]="true"
                variant="destructive"
                size="default"
                class="w-full"
              />
              <p class="mt-6 text-sm text-gray-600 dark:text-gray-400">
                Range: {{ advancedValues.rangeTicks()[0] }} - {{ advancedValues.rangeTicks()[1] }}
              </p>
            </div>

            <!-- Fine Step Control -->
            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Fine Step Control</h3>
              <Slider
                [value]="advancedValues.fineStep()"
                (valueChange)="updateAdvancedValue('fineStep', $event)"
                [min]="0"
                [max]="1"
                [step]="0.01"
                [showLabels]="true"
                variant="primary"
                size="lg"
                class="w-full"
              />
              <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Value: {{ advancedValues.fineStep().toFixed(2) }}
              </p>
            </div>
          </div>
        </section>

        <!-- Custom Styling -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Custom Styling & CVA
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Advanced customization with CVA variants and custom classes.
            </p>
          </div>

          <div class="grid gap-8 lg:grid-cols-2">
            <!-- Custom Track and Range -->
            <div
              class="rounded-2xl border border-purple-200 bg-purple-50 p-6 shadow-sm dark:border-purple-700 dark:bg-purple-900/20">
              <h3 class="mb-4 text-lg font-semibold text-purple-900 dark:text-purple-300">Custom Track & Range</h3>
              <Slider
                [value]="customValues.styled()"
                (valueChange)="updateCustomValue('styled', $event)"
                variant="primary"
                size="lg"
                trackClass="bg-purple-200 dark:bg-purple-800"
                rangeClass="bg-gradient-to-r from-purple-500 to-pink-500"
                class="w-full"
              />
              <p class="mt-2 text-sm text-purple-700 dark:text-purple-300">
                Value: {{ customValues.styled() }}
              </p>
            </div>

            <!-- Custom Thumb -->
            <div
              class="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm dark:border-emerald-700 dark:bg-emerald-900/20">
              <h3 class="mb-4 text-lg font-semibold text-emerald-900 dark:text-emerald-300">Custom Thumb</h3>
              <Slider
                [value]="customValues.thumb()"
                (valueChange)="updateCustomValue('thumb', $event)"
                variant="success"
                size="lg"
                inputClass="[&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:border-emerald-600 [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:bg-emerald-500 [&::-moz-range-thumb]:border-emerald-600"
                class="w-full"
              />
              <p class="mt-2 text-sm text-emerald-700 dark:text-emerald-300">
                Value: {{ customValues.thumb() }}
              </p>
            </div>
          </div>
        </section>

        <!-- Form Integration -->
        <section class="flex flex-col gap-6 sm:gap-8">
          <div class="text-center flex flex-col gap-3 sm:gap-4">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">
              Form Integration
            </h2>
            <p class="mx-auto max-w-3xl text-base text-gray-600 dark:text-gray-300 sm:text-lg">
              Seamless integration with Angular reactive forms, template-driven forms, and comprehensive validation
              support.
            </p>
          </div>

          <div class="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <!-- Audio Settings Form -->
            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:p-8">
              <form [formGroup]="settingsForm">
                <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Audio Settings</h3>

                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Master Volume
                      <span
                        class="font-mono text-blue-600 dark:text-blue-400 ml-2">({{ settingsForm.get('volume')?.value }}
                        %)</span>
                    </label>
                    <Slider
                      [formControl]="$any(settingsForm.get('volume'))"
                      [min]="0"
                      [max]="100"
                      [step]="1"
                      [showTicks]="true"
                      [ticks]="[0, 25, 50, 75, 100]"
                      [showLabels]="true"
                      variant="primary"
                      size="default"
                      class="w-full"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Bass Level
                      <span
                        class="font-mono text-green-600 dark:text-green-400 ml-2">({{ settingsForm.get('bass')?.value }}
                        /10)</span>
                    </label>
                    <Slider
                      [formControl]="$any(settingsForm.get('bass'))"
                      [min]="0"
                      [max]="10"
                      [step]="1"
                      [showTicks]="true"
                      [showLabels]="true"
                      variant="success"
                      size="default"
                      class="w-full"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Frequency Range
                      <span class="font-mono text-yellow-600 dark:text-yellow-400 ml-2">
                        ({{ settingsForm.get('frequency')?.value?.[0] }}
                        Hz - {{ settingsForm.get('frequency')?.value?.[1] }}Hz)
                      </span>
                    </label>
                    <Slider
                      [formControl]="$any(settingsForm.get('frequency'))"
                      [range]="true"
                      [min]="20"
                      [max]="20000"
                      [step]="100"
                      [showTicks]="true"
                      [ticks]="[20, 1000, 5000, 10000, 20000]"
                      [showLabels]="true"
                      variant="warning"
                      size="lg"
                      class="w-full"
                    />
                  </div>
                </div>

                <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Current Values:</h4>
                  <div class="grid grid-cols-1 gap-2 text-xs">
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Volume:</span>
                      <span class="font-mono text-gray-900 dark:text-gray-100">{{ settingsForm.get('volume')?.value }}
                        %</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Bass:</span>
                      <span class="font-mono text-gray-900 dark:text-gray-100">{{ settingsForm.get('bass')?.value }}
                        /10</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Frequency:</span>
                      <span
                        class="font-mono text-gray-900 dark:text-gray-100">{{ settingsForm.get('frequency')?.value?.[0] }}
                        -{{ settingsForm.get('frequency')?.value?.[1] }}Hz</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <!-- Display Settings Form -->
            <div
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:p-8">
              <form [formGroup]="displayForm">
                <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Display Settings</h3>

                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Brightness
                      <span
                        class="font-mono text-blue-600 dark:text-blue-400 ml-2">({{ displayForm.get('brightness')?.value }}
                        %)</span>
                    </label>
                    <Slider
                      [formControl]="$any(displayForm.get('brightness'))"
                      [min]="0"
                      [max]="100"
                      [step]="5"
                      [showTicks]="true"
                      [ticks]="[0, 20, 40, 60, 80, 100]"
                      [showLabels]="true"
                      variant="primary"
                      size="default"
                      class="w-full"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Contrast
                      <span
                        class="font-mono text-purple-600 dark:text-purple-400 ml-2">({{ displayForm.get('contrast')?.value }}
                        %)</span>
                    </label>
                    <Slider
                      [formControl]="$any(displayForm.get('contrast'))"
                      [min]="0"
                      [max]="200"
                      [step]="5"
                      [showTicks]="true"
                      [showLabels]="true"
                      variant="secondary"
                      size="default"
                      class="w-full"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Color Temperature
                      <span
                        class="font-mono text-orange-600 dark:text-orange-400 ml-2">({{ displayForm.get('colorTemp')?.value }}
                        K)</span>
                    </label>
                    <Slider
                      [formControl]="$any(displayForm.get('colorTemp'))"
                      [min]="2000"
                      [max]="10000"
                      [step]="100"
                      [showTicks]="true"
                      [ticks]="[2000, 3000, 5000, 6500, 9300, 10000]"
                      [showLabels]="true"
                      variant="warning"
                      size="lg"
                      class="w-full"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      RGB Color Range
                      <span class="font-mono text-red-600 dark:text-red-400 ml-2">
                        (R:{{ displayForm.get('rgbRange')?.value?.[0] }}
                        , G:{{ displayForm.get('rgbRange')?.value?.[1] }})
                      </span>
                    </label>
                    <Slider
                      [formControl]="$any(displayForm.get('rgbRange'))"
                      [range]="true"
                      [min]="0"
                      [max]="255"
                      [step]="1"
                      [showTicks]="true"
                      [ticks]="[0, 64, 128, 192, 255]"
                      [showLabels]="true"
                      variant="destructive"
                      size="default"
                      class="w-full"
                    />
                  </div>
                </div>

                <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Current Values:</h4>
                  <div class="grid grid-cols-1 gap-2 text-xs">
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Brightness:</span>
                      <span
                        class="font-mono text-gray-900 dark:text-gray-100">{{ displayForm.get('brightness')?.value }}
                        %</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Contrast:</span>
                      <span class="font-mono text-gray-900 dark:text-gray-100">{{ displayForm.get('contrast')?.value }}
                        %</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Color Temp:</span>
                      <span class="font-mono text-gray-900 dark:text-gray-100">{{ displayForm.get('colorTemp')?.value }}
                        K</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">RGB Range:</span>
                      <span
                        class="font-mono text-gray-900 dark:text-gray-100">{{ displayForm.get('rgbRange')?.value?.[0] }}
                        -{{ displayForm.get('rgbRange')?.value?.[1] }}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Combined Form Data -->
          <div
            class="rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm dark:border-blue-700 dark:bg-blue-900/20">
            <h3 class="mb-4 text-lg font-semibold text-blue-900 dark:text-blue-300">📊 Combined Form Data (JSON)</h3>
            <div class="grid gap-4 lg:grid-cols-2">
              <div>
                <h4 class="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Audio Settings:</h4>
                <pre
                  class="text-xs text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 p-3 rounded border overflow-x-auto">{{ settingsForm.value | json }}</pre>
              </div>
              <div>
                <h4 class="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Display Settings:</h4>
                <pre
                  class="text-xs text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 p-3 rounded border overflow-x-auto">{{ displayForm.value | json }}</pre>
              </div>
            </div>
          </div>
        </section>

        <!-- API Summary -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Component Features
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Complete overview of our advanced slider component capabilities.
            </p>
          </div>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              class="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm dark:border-green-700 dark:bg-green-900/20">
              <h3 class="mb-4 text-lg font-semibold text-green-900 dark:text-green-300">✅ Core Features</h3>
              <ul class="space-y-2 text-sm text-green-800 dark:text-green-200">
                <li>• Single value & range modes</li>
                <li>• Horizontal & vertical orientation</li>
                <li>• Custom min/max/step values</li>
                <li>• Tick marks & labels</li>
                <li>• Disabled state support</li>
                <li>• Accessibility compliant</li>
              </ul>
            </div>

            <div
              class="rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm dark:border-blue-700 dark:bg-blue-900/20">
              <h3 class="mb-4 text-lg font-semibold text-blue-900 dark:text-blue-300">🎨 CVA Variants</h3>
              <ul class="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li>• Size: sm, default, lg</li>
                <li>• Variants: 6 color themes</li>
                <li>• Responsive design</li>
                <li>• Dark mode support</li>
                <li>• TypeScript types</li>
                <li>• cn() utility integration</li>
              </ul>
            </div>

            <div
              class="rounded-2xl border border-purple-200 bg-purple-50 p-6 shadow-sm dark:border-purple-700 dark:bg-purple-900/20">
              <h3 class="mb-4 text-lg font-semibold text-purple-900 dark:text-purple-300">⚙️ Customization</h3>
              <ul class="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                <li>• Custom track styling</li>
                <li>• Custom thumb styling</li>
                <li>• Custom range fill</li>
                <li>• Custom tick marks</li>
                <li>• Custom labels</li>
                <li>• Tailwind CSS classes</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Call to Action & Performance -->
        <section
          class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 lg:p-16">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-indigo-600/90 to-purple-600/90"></div>
          <div class="relative text-center text-white">
            <h2 class="text-2xl font-bold sm:text-3xl lg:text-4xl mb-4">
              Ready to Build Amazing Sliders? 🚀
            </h2>
            <p class="mx-auto max-w-3xl text-base sm:text-lg lg:text-xl opacity-90 mb-8">
              Join thousands of developers using Angular SuperUI to create accessible,
              performant, and beautiful slider components with enterprise-grade features.
            </p>

            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold mb-1">100%</div>
                <div class="text-sm opacity-80">WCAG 2.1 AA</div>
              </div>
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold mb-1">&lt;2KB</div>
                <div class="text-sm opacity-80">Gzipped Size</div>
              </div>
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold mb-1">0</div>
                <div class="text-sm opacity-80">Dependencies</div>
              </div>
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold mb-1">6</div>
                <div class="text-sm opacity-80">CVA Variants</div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/slider.md"
                 class="inline-flex items-center px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                View Examples
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Angular SuperUI Slider Component
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Built with modern Angular patterns, TypeScript, CVA integration, and accessibility-first design.
            Perfect for professional applications requiring advanced range input controls.
          </p>
          <div class="flex flex-wrap justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Angular 17+</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>CVA Integration</span>
            <span>•</span>
            <span>WCAG 2.1 AA</span>
            <span>•</span>
            <span>MIT License</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderDemoComponent implements OnInit {
  private meta = inject(Meta);
  private title = inject(Title);

  ngOnInit(): void {
    // SEO Optimization
    this.title.setTitle('Angular Slider Component with CVA - Range Input Controls | Angular SuperUI');

    this.meta.updateTag({
      name: 'description',
      content: 'Advanced Angular slider component with Class Variance Authority (CVA), range inputs, vertical orientation, form integration, accessibility compliance, and TypeScript support. Perfect for modern Angular applications.'
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'Angular slider, range input, Angular CVA, slider component, Angular forms, accessibility, TypeScript, Tailwind CSS, vertical slider, range control, Angular UI components'
    });

    this.meta.updateTag({ property: 'og:title', content: 'Angular Slider Component with CVA - Professional Range Controls' });
    this.meta.updateTag({ property: 'og:description', content: 'Enterprise-grade Angular slider component with CVA integration, accessibility compliance, and comprehensive customization options.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Angular Slider Component with CVA - Range Input Controls' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Advanced Angular slider with CVA patterns, accessibility, and form integration.' });

    // Schema.org structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Angular SuperUI Slider Component',
      'description': 'Professional Angular slider component with CVA integration and accessibility compliance',
      'applicationCategory': 'DeveloperApplication',
      'operatingSystem': 'Web',
      'programmingLanguage': ['TypeScript', 'Angular'],
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
  // Basic values
  basicValues = {
    single: signal(50),
    range: signal([25, 75])
  };

  // Size variant values
  sizeValues = {
    sm: signal(25),
    default: signal(50),
    lg: signal(75)
  };

  // Color variant values
  colorValues = {
    default: signal(30),
    primary: signal(40),
    secondary: signal(50),
    success: signal(60),
    warning: signal(70),
    destructive: signal(80)
  };

  // Advanced feature values
  advancedValues = {
    ticks: signal(5),
    customTicks: signal(60),
    rangeTicks: signal([20, 80]),
    fineStep: signal(0.5)
  };

  // Custom styling values
  customValues = {
    styled: signal(45),
    thumb: signal(75)
  };

  // Reactive forms
  settingsForm = new FormGroup({
    volume: new FormControl(75),
    bass: new FormControl(5),
    frequency: new FormControl([200, 15000])
  });

  displayForm = new FormGroup({
    brightness: new FormControl(80),
    contrast: new FormControl(100),
    colorTemp: new FormControl(6500),
    rgbRange: new FormControl([50, 200])
  });

  // Event handlers
  updateBasicSingle(value: number | number[]): void {
    if (typeof value === 'number') {
      this.basicValues.single.set(value);
    }
  }

  updateBasicRange(value: number | number[]): void {
    if (Array.isArray(value)) {
      this.basicValues.range.set(value);
    }
  }

  updateSizeValue(size: 'sm' | 'default' | 'lg', value: number | number[]): void {
    if (typeof value === 'number') {
      this.sizeValues[size].set(value);
    }
  }

  updateColorValue(color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive', value: number | number[]): void {
    if (typeof value === 'number') {
      this.colorValues[color].set(value);
    }
  }

  updateAdvancedValue(type: 'ticks' | 'customTicks' | 'fineStep', value: number | number[]): void {
    if (typeof value === 'number') {
      this.advancedValues[type].set(value);
    }
  }

  updateAdvancedRangeValue(type: 'rangeTicks', value: number | number[]): void {
    if (Array.isArray(value)) {
      this.advancedValues[type].set(value);
    }
  }

  updateCustomValue(type: 'styled' | 'thumb', value: number | number[]): void {
    if (typeof value === 'number') {
      this.customValues[type].set(value);
    }
  }
}
