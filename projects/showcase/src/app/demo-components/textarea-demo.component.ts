import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { TextareaComponent } from '@lib/textarea';

@Component({
  selector: 'app-textarea-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextareaComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <!-- Hero Section -->
      <div class="relative overflow-hidden">
        <!-- Animated background pattern -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute inset-0 bg-grid-pattern animate-pulse"></div>
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div class="text-center">
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Textarea Component
              </span>
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Multi-line text input with auto-resize, validation, character counting, and full accessibility support.
            </p>

            <!-- Live Demo -->
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8 max-w-2xl mx-auto">
              <div class="space-y-4">
                <TextareaComponent
                  [value]="heroTextareaValue()"
                  (valueChange)="heroTextareaValue.set($event)"
                  placeholder="Start typing your thoughts here..."
                  label="Share your thoughts"
                  [showCharacterCount]="true"
                  [maxLength]="280"
                  [autoResize]="true"
                  [minRows]="3"
                  [maxRows]="8"
                  helpText="Express yourself freely - this textarea auto-resizes as you type"
                  className="transition-all duration-300 hover:border-blue-300 focus:border-blue-500"
                />
              </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-white mb-2">4</div>
                <div class="text-blue-200/70 text-sm">Variants</div>
              </div>
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-white mb-2">Auto</div>
                <div class="text-blue-200/70 text-sm">Resize</div>
              </div>
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-white mb-2">100%</div>
                <div class="text-blue-200/70 text-sm">Accessible</div>
              </div>
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-white mb-2">⚡</div>
                <div class="text-blue-200/70 text-sm">Fast</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Wave -->
        <div class="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" class="w-full h-20 fill-white dark:fill-slate-900">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <!-- Features Overview -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Powerful Features
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Auto Resize -->
            <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
                </div>
                <h4 class="font-semibold text-blue-900 dark:text-blue-100">Auto Resize</h4>
              </div>
              <p class="text-sm text-blue-800 dark:text-blue-200">
                Intelligently adjusts height based on content while respecting min/max rows configuration
              </p>
            </div>

            <!-- Validation -->
            <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h4 class="font-semibold text-green-900 dark:text-green-100">Smart Validation</h4>
              </div>
              <p class="text-sm text-green-800 dark:text-green-200">
                Built-in validation with custom validators, real-time feedback, and form integration
              </p>
            </div>

            <!-- Character Count -->
            <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                  </svg>
                </div>
                <h4 class="font-semibold text-purple-900 dark:text-purple-100">Character Counter</h4>
              </div>
              <p class="text-sm text-purple-800 dark:text-purple-200">
                Optional character counting with visual feedback and length limit enforcement
              </p>
            </div>

            <!-- Accessibility -->
            <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </div>
                <h4 class="font-semibold text-orange-900 dark:text-orange-100">Full Accessibility</h4>
              </div>
              <p class="text-sm text-orange-800 dark:text-orange-200">
                WCAG 2.1 compliant with ARIA support, screen reader compatibility, and keyboard navigation
              </p>
            </div>

            <!-- Customization -->
            <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"/>
                  </svg>
                </div>
                <h4 class="font-semibold text-red-900 dark:text-red-100">Highly Customizable</h4>
              </div>
              <p class="text-sm text-red-800 dark:text-red-200">
                Multiple variants, sizes, states, and full Tailwind CSS integration for endless possibilities
              </p>
            </div>

            <!-- Performance -->
            <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h4 class="font-semibold text-indigo-900 dark:text-indigo-100">Signal-Based</h4>
              </div>
              <p class="text-sm text-indigo-800 dark:text-indigo-200">
                Built with Angular signals for optimal performance and reactive updates
              </p>
            </div>
          </div>
        </div>

        <!-- Basic Usage -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Basic Usage</h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <!-- Default Variant -->
            <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Default Textarea</h3>
              <div class="space-y-4">
                <TextareaComponent
                  [value]="basicDefaultValue()"
                  (valueChange)="basicDefaultValue.set($event)"
                  placeholder="Type your message here..."
                  label="Message"
                  helpText="This is a standard textarea with default styling"
                />
              </div>
            </div>

            <!-- Filled Variant -->
            <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filled Textarea</h3>
              <div class="space-y-4">
                <TextareaComponent
                  [value]="basicFilledValue()"
                  (valueChange)="basicFilledValue.set($event)"
                  placeholder="Type your feedback here..."
                  label="Feedback"
                  variant="filled"
                  helpText="Filled variant with background styling"
                />
              </div>
            </div>

            <!-- Flushed Variant -->
            <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Flushed Textarea</h3>
              <div class="space-y-4">
                <TextareaComponent
                  [value]="basicFlushedValue()"
                  (valueChange)="basicFlushedValue.set($event)"
                  placeholder="Clean minimal design..."
                  label="Notes"
                  variant="flushed"
                  helpText="Minimal design with bottom border only"
                />
              </div>
            </div>

            <!-- Unstyled Variant -->
            <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Unstyled Textarea</h3>
              <div class="space-y-4">
                <TextareaComponent
                  [value]="basicUnstyledValue()"
                  (valueChange)="basicUnstyledValue.set($event)"
                  placeholder="Completely unstyled for custom design..."
                  label="Custom"
                  variant="unstyled"
                  helpText="No default styling - perfect for custom designs"
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-slate-700 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-600"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Sizes -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Size Variants</h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Different Sizes</h3>
              <div class="space-y-6">

                <div class="group">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Small Size
                  </label>
                  <TextareaComponent
                    placeholder="Compact textarea"
                    size="sm"
                    [value]="sizeSmallValue()"
                    (valueChange)="sizeSmallValue.set($event)"
                  />
                </div>

                <div class="group">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Medium Size (Default)
                  </label>
                  <TextareaComponent
                    placeholder="Standard textarea"
                    size="md"
                    [value]="sizeMediumValue()"
                    (valueChange)="sizeMediumValue.set($event)"
                  />
                </div>

                <div class="group">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Large Size
                  </label>
                  <TextareaComponent
                    placeholder="Spacious textarea"
                    size="lg"
                    [value]="sizeLargeValue()"
                    (valueChange)="sizeLargeValue.set($event)"
                  />
                </div>

                <div class="group">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Extra Large Size
                  </label>
                  <TextareaComponent
                    placeholder="Extra large textarea"
                    size="xl"
                    [value]="sizeXLValue()"
                    (valueChange)="sizeXLValue.set($event)"
                  />
                </div>
              </div>
            </div>

            <!-- Auto-resize Demo -->
            <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Auto-Resize Feature</h3>
              <div class="space-y-4">

                <div class="group">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Auto-Resizing Textarea
                  </label>
                  <TextareaComponent
                    [value]="autoResizeValue()"
                    (valueChange)="autoResizeValue.set($event)"
                    placeholder="Start typing... This textarea will grow as you add more content. Try pasting a long text or writing multiple paragraphs to see it in action!"
                    [autoResize]="true"
                    [minRows]="3"
                    [maxRows]="10"
                    helpText="Automatically resizes between 3-10 rows based on content"
                  />
                </div>

                <div class="bg-gray-50 dark:bg-slate-700 rounded p-4">
                  <h4 class="font-medium text-gray-900 dark:text-white mb-2">Current Stats:</h4>
                  <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <div>Character count: {{ autoResizeValue().length }}</div>
                    <div>Word count: {{ getWordCount(autoResizeValue()) }}</div>
                    <div>Line count: {{ getLineCount(autoResizeValue()) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- States -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">State Variants</h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Visual States</h3>
              <div class="space-y-6">

                <div class="group">
                  <div class="flex items-center gap-2 mb-3">
                    <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Default State
                    </label>
                  </div>
                  <TextareaComponent
                    placeholder="Normal textarea"
                    state="default"
                    [value]="stateDefaultValue()"
                    (valueChange)="stateDefaultValue.set($event)"
                  />
                </div>

                <div class="group">
                  <div class="flex items-center gap-2 mb-3">
                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Success State
                    </label>
                  </div>
                  <TextareaComponent
                    placeholder="Success textarea"
                    state="success"
                    [value]="stateSuccessValue()"
                    (valueChange)="stateSuccessValue.set($event)"
                  />
                  <p class="text-xs text-green-600 dark:text-green-400 mt-1">Great! This looks perfect</p>
                </div>

                <div class="group">
                  <div class="flex items-center gap-2 mb-3">
                    <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Error State
                    </label>
                  </div>
                  <TextareaComponent
                    placeholder="Error textarea"
                    state="error"
                    [value]="stateErrorValue()"
                    (valueChange)="stateErrorValue.set($event)"
                    errorMessage="This field is required"
                  />
                </div>

                <div class="group">
                  <div class="flex items-center gap-2 mb-3">
                    <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Warning State
                    </label>
                  </div>
                  <TextareaComponent
                    placeholder="Warning textarea"
                    state="warning"
                    [value]="stateWarningValue()"
                    (valueChange)="stateWarningValue.set($event)"
                  />
                  <p class="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Please review this field</p>
                </div>

                <div class="group">
                  <div class="flex items-center gap-2 mb-3">
                    <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Disabled State
                    </label>
                  </div>
                  <TextareaComponent
                    placeholder="Disabled textarea"
                    [disabled]="true"
                    value="This textarea is disabled"
                  />
                </div>
              </div>
            </div>

            <!-- Character Count -->
            <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Character Counting</h3>
              <div class="space-y-6">

                <div class="group">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Tweet-style (280 characters)
                  </label>
                  <TextareaComponent
                    [value]="tweetValue()"
                    (valueChange)="tweetValue.set($event)"
                    placeholder="What's happening?"
                    [maxLength]="280"
                    [showCharacterCount]="true"
                    helpText="Share your thoughts in 280 characters or less"
                  />
                </div>

                <div class="group">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Short Message (100 characters)
                  </label>
                  <TextareaComponent
                    [value]="shortMessageValue()"
                    (valueChange)="shortMessageValue.set($event)"
                    placeholder="Brief message"
                    [maxLength]="100"
                    [showCharacterCount]="true"
                    size="sm"
                  />
                </div>

                <div class="group">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Long Form (1000 characters)
                  </label>
                  <TextareaComponent
                    [value]="longFormValue()"
                    (valueChange)="longFormValue.set($event)"
                    placeholder="Write your detailed response here..."
                    [maxLength]="1000"
                    [showCharacterCount]="true"
                    [autoResize]="true"
                    [minRows]="4"
                    [maxRows]="12"
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Integration -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Form Integration</h2>

          <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-slate-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Reactive Form Example</h3>

            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <TextareaComponent
                      formControlName="subject"
                      placeholder="Brief subject line"
                      [rows]="2"
                      [maxLength]="100"
                      [showCharacterCount]="true"
                      size="sm"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <TextareaComponent
                      formControlName="message"
                      placeholder="Your detailed message here..."
                      [autoResize]="true"
                      [minRows]="4"
                      [maxRows]="10"
                      [maxLength]="1000"
                      [showCharacterCount]="true"
                      helpText="Please provide as much detail as possible"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Additional Notes
                    </label>
                    <TextareaComponent
                      formControlName="notes"
                      placeholder="Any additional information (optional)"
                      variant="filled"
                      [rows]="3"
                      [maxLength]="500"
                      [showCharacterCount]="true"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      FormControl Disabled Test
                    </label>
                    <TextareaComponent
                      formControlName="disableTest"
                      placeholder="This demonstrates FormControl.disable() integration"
                      helpText="This textarea can be disabled via FormControl.disable()"
                    />
                    <div class="mt-2 space-x-2">
                      <button
                        type="button"
                        (click)="contactForm.get('disableTest')?.disable()"
                        class="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Disable Control
                      </button>
                      <button
                        type="button"
                        (click)="contactForm.get('disableTest')?.enable()"
                        class="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Enable Control
                      </button>
                    </div>
                  </div>
                </div>

                <div class="space-y-4">
                  <div class="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                    <h4 class="font-medium text-gray-900 dark:text-white mb-3">Form State</h4>
                    <div class="space-y-2 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-300">Valid:</span>
                        <span [class]="contactForm.valid ? 'text-green-600' : 'text-red-600'">
                          {{ contactForm.valid ? 'Yes' : 'No' }}
                        </span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-300">Touched:</span>
                        <span>{{ contactForm.touched ? 'Yes' : 'No' }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-300">Dirty:</span>
                        <span>{{ contactForm.dirty ? 'Yes' : 'No' }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                    <h4 class="font-medium text-gray-900 dark:text-white mb-3">Current Values</h4>
                    <div class="text-sm text-gray-600 dark:text-gray-300">
                      <pre class="whitespace-pre-wrap">{{ getFormValues() }}</pre>
                    </div>
                  </div>

                  <button
                    type="submit"
                    [disabled]="!contactForm.valid"
                    class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit Form
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Resize Options -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Resize Options</h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Manual Resize</h3>
              <div class="space-y-6">

                <div class="group">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    No Resize
                  </label>
                  <TextareaComponent
                    placeholder="Fixed size textarea"
                    resize="none"
                    [value]="resizeNoneValue()"
                    (valueChange)="resizeNoneValue.set($event)"
                    helpText="Users cannot resize this textarea"
                  />
                </div>

                <div class="group">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Vertical Resize (Default)
                  </label>
                  <TextareaComponent
                    placeholder="Vertically resizable"
                    resize="vertical"
                    [value]="resizeVerticalValue()"
                    (valueChange)="resizeVerticalValue.set($event)"
                    helpText="Users can resize vertically (grab bottom edge)"
                  />
                </div>

                <div class="group">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Horizontal Resize
                  </label>
                  <TextareaComponent
                    placeholder="Horizontally resizable"
                    resize="horizontal"
                    [value]="resizeHorizontalValue()"
                    (valueChange)="resizeHorizontalValue.set($event)"
                    helpText="Users can resize horizontally (grab right edge)"
                  />
                </div>

                <div class="group">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Both Directions
                  </label>
                  <TextareaComponent
                    placeholder="Fully resizable"
                    resize="both"
                    [value]="resizeBothValue()"
                    (valueChange)="resizeBothValue.set($event)"
                    helpText="Users can resize in both directions (grab corner)"
                  />
                </div>
              </div>
            </div>

            <!-- Advanced Features -->
            <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Advanced Features</h3>
              <div class="space-y-6">

                <div class="group">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Custom Validation
                  </label>
                  <TextareaComponent
                    [value]="customValidationValue()"
                    (valueChange)="customValidationValue.set($event)"
                    placeholder="Type 'hello' to see success state"
                    [customValidator]="customValidator"
                    [validateOnChange]="true"
                    helpText="Custom validation: must contain 'hello'"
                  />
                </div>

                <div class="group">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Read-only Mode
                  </label>
                  <TextareaComponent
                    value="This is a read-only textarea. You cannot edit this content, but you can select and copy it."
                    [readonly]="true"
                    helpText="Content is read-only but selectable"
                  />
                </div>

                <div class="group">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Required Field
                  </label>
                  <TextareaComponent
                    [value]="requiredValue()"
                    (valueChange)="requiredValue.set($event)"
                    placeholder="This field is required"
                    [required]="true"
                    label="Required Textarea"
                    helpText="This field must be filled out"
                  />
                </div>

                <div class="group">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Word Wrap Control
                  </label>
                  <TextareaComponent
                    [value]="wordWrapValue()"
                    (valueChange)="wordWrapValue.set($event)"
                    placeholder="Type a very long line to see how word wrapping behaves..."
                    wrap="hard"
                    [cols]="40"
                    helpText="Hard wrap - line breaks are preserved when submitting"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Documentation Link -->
        <div class="text-center">
          <div class="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            <span class="text-blue-900 dark:text-blue-100 font-medium">
              Need more details? Check out our comprehensive documentation
            </span>
            <a href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/textarea.md"
               target="_blank" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TextareaDemoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  // Basic demo values
  readonly heroTextareaValue = signal('');
  readonly basicDefaultValue = signal('');
  readonly basicFilledValue = signal('');
  readonly basicFlushedValue = signal('');
  readonly basicUnstyledValue = signal('');

  // Size variants
  readonly sizeSmallValue = signal('');
  readonly sizeMediumValue = signal('');
  readonly sizeLargeValue = signal('');
  readonly sizeXLValue = signal('');

  // Auto-resize demo
  readonly autoResizeValue = signal('Try typing multiple lines of text here. Notice how the textarea grows automatically as you add more content. You can also paste a long text to see the auto-resize feature in action!');

  // State variants
  readonly stateDefaultValue = signal('');
  readonly stateSuccessValue = signal('This field looks great!');
  readonly stateErrorValue = signal('');
  readonly stateWarningValue = signal('Please double-check this content');

  // Character count demos
  readonly tweetValue = signal('');
  readonly shortMessageValue = signal('');
  readonly longFormValue = signal('');

  // Resize options
  readonly resizeNoneValue = signal('');
  readonly resizeVerticalValue = signal('');
  readonly resizeHorizontalValue = signal('');
  readonly resizeBothValue = signal('');

  // Advanced features
  readonly customValidationValue = signal('');
  readonly requiredValue = signal('');
  readonly wordWrapValue = signal('');

  // Form
  contactForm = this.fb.group({
    subject: ['', [Validators.required, Validators.maxLength(100)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    notes: ['', [Validators.maxLength(500)]],
    disableTest: ['Test disabled control functionality']
  });

  ngOnInit(): void {
    this.titleService.setTitle('Textarea Component - Angular SuperUI');
    this.metaService.updateTag({
      name: 'description',
      content: 'Powerful textarea component with auto-resize, validation, character counting, and full accessibility support. Built with Angular signals for optimal performance.'
    });
  }

  // Custom validator
  customValidator = (value: string): string | null => {
    if (!value) return null;
    if (!value.toLowerCase().includes('hello')) {
      return 'Value must contain "hello"';
    }
    return null;
  };

  // Helper methods
  getWordCount(text: string): number {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }

  getLineCount(text: string): number {
    return text ? text.split('\n').length : 1;
  }

  getFormValues(): string {
    return JSON.stringify(this.contactForm.value, null, 2);
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      alert('Form submitted successfully! Check console for values.');
    }
  }
}
