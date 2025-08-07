import { Component, signal, inject, OnInit, ChangeDetectorRef, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputComponent, type MaskConfig, type SanitizationConfig } from '@lib/components/input';

@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, InputComponent, FormsModule, ReactiveFormsModule],
  styles: [`
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
      50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
    }

    .float-animation {
      animation: float 3s ease-in-out infinite;
    }

    .glow-animation {
      animation: glow 2s ease-in-out infinite;
    }
  `],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">

      <!-- Hero Section with Animated Background -->
      <div class="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 dark:from-black dark:via-blue-950 dark:to-indigo-950">
        <!-- Animated Background Elements -->
        <div class="absolute inset-0">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20"></div>

          <!-- Floating Input Icons -->
          <div class="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute top-1/2 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div class="absolute bottom-20 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

          <!-- Animated Input Grid -->
          <div class="absolute inset-0 opacity-10">
            <svg class="w-full h-full" viewBox="0 0 1200 800">
              <defs>
                <pattern id="input-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  <rect width="80" height="80" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>
                  <rect x="10" y="35" width="60" height="10" rx="5" fill="currentColor" opacity="0.2">
                    <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite"/>
                  </rect>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#input-grid)"/>
            </svg>
          </div>
        </div>

        <div class="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
          <div class="text-center">
            <!-- Badge -->
            <div class="inline-flex items-center gap-3 mb-8">
              <div class="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-ping"></div>
              <span class="text-sm font-bold text-blue-200 uppercase tracking-widest">Angular SuperUI Input</span>
              <div class="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-ping delay-300"></div>
            </div>

            <!-- Main Title -->
            <h1 class="text-7xl md:text-9xl font-black mb-8 relative">
              <span class="relative z-10 bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent drop-shadow-2xl">
                Input
              </span>
              <br>
              <span class="relative z-10 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
                Excellence
              </span>
              <!-- Glowing backdrop -->
              <div class="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 blur-3xl scale-110"></div>
            </h1>

            <p class="text-xl md:text-2xl text-blue-100/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience the most advanced input component with <span class="text-blue-300 font-semibold">multiple variants</span>,
              <span class="text-indigo-300 font-semibold">perfect accessibility</span>, and <span class="text-purple-300 font-semibold">form integration</span>.
              <br>Built for modern applications with stunning design.
            </p>

            <!-- Interactive Preview Input -->
            <div class="max-w-md mx-auto float-animation">
              <div class="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 shadow-2xl glow-animation">
                <InputComponent
                  placeholder="Try typing here..."
                  variant="default"
                  size="lg"
                  [value]="heroInputValue()"
                  (inputChange)="heroInputValue.set($event)"
                  className="text-white placeholder:text-white/60 bg-white/10 border-white/30 focus-visible:ring-white/50"
                />
              </div>
            </div>

            <!-- Feature Stats -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-20">
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-white mb-2">4</div>
                <div class="text-blue-200/70 text-sm">Variants</div>
              </div>
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-white mb-2">100%</div>
                <div class="text-blue-200/70 text-sm">Accessible</div>
              </div>
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-white mb-2">📱</div>
                <div class="text-blue-200/70 text-sm">Responsive</div>
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
          <svg class="w-full h-20 sm:h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="rgb(239 246 255)" fill-opacity="1"></path>
          </svg>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">

        <!-- Variants Showcase -->
        <section class="space-y-12">
          <div class="text-center space-y-4">
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white">Input Variants</h2>
            <p class="text-xl text-gray-600 dark:text-gray-300">Explore different styles for every use case</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Default Variant -->
            <div class="space-y-6">
              <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <h3 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Default</h3>
                <div class="flex flex-col gap-4">
                  <InputComponent
                    placeholder="Default input"
                    variant="default"
                    size="md"
                    [value]="defaultValue()"
                    (inputChange)="defaultValue.set($event)"
                  />
                  <InputComponent
                    placeholder="Large default input"
                    variant="default"
                    size="lg"
                    [value]="defaultLargeValue()"
                    (inputChange)="defaultLargeValue.set($event)"
                  />
                  <InputComponent
                    placeholder="Small default input"
                    variant="default"
                    size="sm"
                    [value]="defaultSmallValue()"
                    (inputChange)="defaultSmallValue.set($event)"
                  />
                </div>
              </div>
            </div>

            <!-- Filled Variant -->
            <div class="space-y-6">
              <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Filled</h3>
                  <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full font-medium">
                    Soft Background
                  </span>
                </div>
                <p class="text-gray-600 dark:text-gray-400 mb-8 text-sm">
                  Inputs with subtle background fill for better visual hierarchy and modern appearance.
                </p>
                <div class="space-y-8">
                  <div class="group">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Medium Size
                    </label>
                    <InputComponent
                      placeholder="Filled input with background"
                      variant="filled"
                      size="md"
                      [value]="filledValue()"
                      (inputChange)="filledValue.set($event)"
                    />
                  </div>
                  <div class="group">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Large Size
                    </label>
                    <InputComponent
                      placeholder="Large filled input for emphasis"
                      variant="filled"
                      size="lg"
                      [value]="filledLargeValue()"
                      (inputChange)="filledLargeValue.set($event)"
                    />
                  </div>
                  <div class="group">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Small Size
                    </label>
                    <InputComponent
                      placeholder="Compact filled input"
                      variant="filled"
                      size="sm"
                      [value]="filledSmallValue()"
                      (inputChange)="filledSmallValue.set($event)"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Flushed Variant -->
            <div class="space-y-6">
              <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Flushed</h3>
                  <span class="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm rounded-full font-medium">
                    Minimal Clean
                  </span>
                </div>
                <p class="text-gray-600 dark:text-gray-400 mb-8 text-sm">
                  Clean, minimal inputs with only bottom borders for a sleek, uncluttered design.
                </p>
                <div class="space-y-12">
                  <div class="group">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Medium Size
                    </label>
                    <InputComponent
                      placeholder="Clean flushed input"
                      variant="flushed"
                      size="md"
                      [value]="flushedValue()"
                      (inputChange)="flushedValue.set($event)"
                    />
                  </div>
                  <div class="group">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Large Size
                    </label>
                    <InputComponent
                      placeholder="Large minimal input"
                      variant="flushed"
                      size="lg"
                      [value]="flushedLargeValue()"
                      (inputChange)="flushedLargeValue.set($event)"
                    />
                  </div>
                  <div class="group">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Small Size
                    </label>
                    <InputComponent
                      placeholder="Compact clean input"
                      variant="flushed"
                      size="sm"
                      [value]="flushedSmallValue()"
                      (inputChange)="flushedSmallValue.set($event)"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- States Showcase -->
            <div class="space-y-6">
              <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">States</h3>
                  <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full font-medium">
                    Visual Feedback
                  </span>
                </div>
                <p class="text-gray-600 dark:text-gray-400 mb-8 text-sm">
                  Different states provide immediate visual feedback for user interactions and form validation.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="space-y-6">
                    <div class="group">
                      <div class="flex items-center gap-2 mb-3">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Success State
                        </label>
                      </div>
                      <InputComponent
                        placeholder="Valid input"
                        variant="default"
                        size="md"
                        state="success"
                        [value]="successValue()"
                        (inputChange)="successValue.set($event)"
                      />
                      <p class="text-xs text-green-600 dark:text-green-400 mt-1">Input is valid and accepted</p>
                    </div>

                    <div class="group">
                      <div class="flex items-center gap-2 mb-3">
                        <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Error State
                        </label>
                      </div>
                      <InputComponent
                        placeholder="Invalid input"
                        variant="default"
                        size="md"
                        state="error"
                        [value]="errorStateValue()"
                        (inputChange)="errorStateValue.set($event)"
                      />
                      <p class="text-xs text-red-600 dark:text-red-400 mt-1">Please check your input</p>
                    </div>
                  </div>

                  <div class="space-y-6">
                    <div class="group">
                      <div class="flex items-center gap-2 mb-3">
                        <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Warning State
                        </label>
                      </div>
                      <InputComponent
                        placeholder="Warning input"
                        variant="default"
                        size="md"
                        state="warning"
                        [value]="warningStateValue()"
                        (inputChange)="warningStateValue.set($event)"
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
                      <InputComponent
                        placeholder="Disabled input"
                        variant="default"
                        size="md"
                        [disabled]="true"
                        value="Disabled text"
                      />
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">This field is not editable</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        <!-- Input Types -->
        <section class="space-y-12 mt-20">
          <div class="text-center space-y-4">
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white">Input Types</h2>
            <p class="text-xl text-gray-600 dark:text-gray-300">Support for all HTML input types</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 class="font-semibold mb-4 text-gray-900 dark:text-white">Text</h4>
              <InputComponent
                type="text"
                placeholder="Enter text"
                variant="default"
                [value]="basicValue()"
                (inputChange)="basicValue.set($event)"
              />
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 class="font-semibold mb-4 text-gray-900 dark:text-white">Email</h4>
              <InputComponent
                type="email"
                placeholder="you@example.com"
                variant="default"
                [value]="emailValue()"
                (inputChange)="emailValue.set($event)"
              />
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 class="font-semibold mb-4 text-gray-900 dark:text-white">Password</h4>
              <InputComponent
                type="password"
                placeholder="Enter password"
                variant="default"
                [value]="passwordValue()"
                (inputChange)="passwordValue.set($event)"
              />
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 class="font-semibold mb-4 text-gray-900 dark:text-white">Number</h4>
              <InputComponent
                type="number"
                placeholder="Enter number"
                variant="default"
                [value]="numberValue()"
                (inputChange)="numberValue.set($event)"
              />
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 class="font-semibold mb-4 text-gray-900 dark:text-white">Date</h4>
              <InputComponent
                type="date"
                variant="default"
                [value]="dateValue()"
                (inputChange)="dateValue.set($event)"
              />
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 class="font-semibold mb-4 text-gray-900 dark:text-white">Search</h4>
              <InputComponent
                type="search"
                placeholder="Search..."
                variant="default"
                [value]="searchValue()"
                (inputChange)="searchValue.set($event)"
              />
            </div>
          </div>
        </section>

        <!-- Enhanced Features Section -->
        <section class="mt-20">
          <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Enhanced Features</h2>
          <p class="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
            Discover advanced accessibility, validation, and mobile optimization features built into every input.
          </p>

          <!-- Input Masking -->
          <div class="mb-16">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Input Masking</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              <!-- Phone Number -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">📞 Phone Number</h4>
                <InputComponent
                  placeholder="Enter phone number"
                  [(ngModel)]="phoneValue"
                  [mask]="phoneMask"
                  [customValidator]="phoneValidator"
                  [validateOnChange]="true"
                  inputMode="tel"
                  class="w-full"
                />
                @if (phoneValue()) {
                  <div class="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p class="text-sm text-green-700 dark:text-green-300">
                      <strong>Raw value:</strong> {{ phoneValue() }}
                    </p>
                  </div>
                }
              </div>

              <!-- Credit Card -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">💳 Credit Card</h4>
                <InputComponent
                  placeholder="Enter credit card number"
                  [(ngModel)]="creditCardValue"
                  [mask]="creditCardMask"
                  [customValidator]="creditCardValidator"
                  [validateOnBlur]="true"
                  inputMode="numeric"
                  class="w-full"
                />
                @if (creditCardValue()) {
                  <div class="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p class="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Formatted:</strong> {{ creditCardValue() }}
                    </p>
                  </div>
                }
              </div>

              <!-- SSN -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">🔒 SSN</h4>
                <InputComponent
                  placeholder="Enter SSN"
                  [(ngModel)]="ssnValue"
                  [mask]="ssnMask"
                  type="password"
                  inputMode="numeric"
                  class="w-full"
                />
                @if (ssnValue()) {
                  <div class="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <p class="text-sm text-amber-700 dark:text-amber-300">
                      <strong>Secure value entered</strong> ✓
                    </p>
                  </div>
                }
              </div>

              <!-- Currency -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">💰 Currency</h4>
                <InputComponent
                  placeholder="Enter amount"
                  [(ngModel)]="currencyValue"
                  [mask]="currencyMask"
                  [customValidator]="currencyValidator"
                  [validateOnChange]="true"
                  inputMode="decimal"
                  class="w-full"
                />
                @if (currencyValue()) {
                  <div class="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p class="text-sm text-purple-700 dark:text-purple-300">
                      <strong>Amount:</strong> {{ currencyValue() }}
                    </p>
                  </div>
                }
              </div>

              <!-- Postal Code -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">📮 Postal Code</h4>
                <InputComponent
                  placeholder="Enter postal code"
                  [(ngModel)]="postalCodeValue"
                  [mask]="postalCodeMask"
                  inputMode="numeric"
                  class="w-full"
                />
                @if (postalCodeValue()) {
                  <div class="mt-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <p class="text-sm text-indigo-700 dark:text-indigo-300">
                      <strong>ZIP:</strong> {{ postalCodeValue() }}
                    </p>
                  </div>
                }
              </div>

              <!-- Date Mask -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">📅 Date</h4>
                <InputComponent
                  placeholder="MM/DD/YYYY"
                  [(ngModel)]="maskedDateValue"
                  [mask]="dateMask"
                  inputMode="numeric"
                  class="w-full"
                />
                @if (maskedDateValue()) {
                  <div class="mt-3 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                    <p class="text-sm text-teal-700 dark:text-teal-300">
                      <strong>Date:</strong> {{ maskedDateValue() }}
                    </p>
                  </div>
                }
              </div>

              <!-- Time Mask -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">⏰ Time</h4>
                <InputComponent
                  placeholder="HH:MM"
                  [(ngModel)]="maskedTimeValue"
                  [mask]="timeMask"
                  inputMode="numeric"
                  class="w-full"
                />
                @if (maskedTimeValue()) {
                  <div class="mt-3 p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                    <p class="text-sm text-rose-700 dark:text-rose-300">
                      <strong>Time:</strong> {{ maskedTimeValue() }}
                    </p>
                  </div>
                }
              </div>

              <!-- Custom Mask -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">🎭 Custom Mask</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Pattern: 000-AAA-***</p>
                <InputComponent
                  placeholder="123-ABC-xyz"
                  [(ngModel)]="customMaskValue"
                  [mask]="customMask"
                  class="w-full"
                />
                @if (customMaskValue()) {
                  <div class="mt-3 p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Value:</strong> {{ customMaskValue() }}
                    </p>
                  </div>
                }
              </div>

            </div>
          </div>

          <!-- Input Sanitization -->
          <div class="mb-16">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">🛡️ Input Sanitization</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

              <!-- Basic Sanitization -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Sanitization</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Removes HTML tags and scripts, limits to 100 characters
                </p>
                <InputComponent
                  placeholder="Try typing HTML: <script>alert('test')</script>"
                  [(ngModel)]="sanitizedValue"
                  [sanitization]="basicSanitization"
                  helpText="HTML tags and scripts will be automatically removed"
                  class="w-full"
                />
                @if (sanitizedValue()) {
                  <div class="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p class="text-sm text-green-700 dark:text-green-300">
                      <strong>Sanitized:</strong> {{ sanitizedValue() }}
                    </p>
                  </div>
                }
              </div>

              <!-- Strict Sanitization -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Strict Sanitization</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Only allows alphanumeric, spaces, &#64;, ., and - characters
                </p>
                <InputComponent
                  placeholder="Only safe characters allowed"
                  [(ngModel)]="validationEmailValue"
                  [sanitization]="strictSanitization"
                  [customValidator]="emailValidator"
                  [validateOnChange]="true"
                  helpText="Special characters will be filtered out"
                  type="email"
                  class="w-full"
                />
                @if (validationEmailValue()) {
                  <div class="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p class="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Clean value:</strong> {{ validationEmailValue() }}
                    </p>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Form Validation Demo -->
          <div class="mb-16">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">✅ Advanced Form Validation</h3>
            <form [formGroup]="enhancedForm" (ngSubmit)="onFormSubmit()" class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                <!-- Email with validation -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <InputComponent
                    formControlName="email"
                    type="email"
                    placeholder="john@example.com"
                    [sanitization]="strictSanitization"
                    [customValidator]="emailValidator"
                    [validateOnChange]="true"
                    (inputChange)="onEmailChange($event)"
                    inputMode="email"
                    autoComplete="email"
                    class="w-full"
                  />
                </div>

                <!-- Password with validation -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password *
                  </label>
                  <InputComponent
                    formControlName="password"
                    type="password"
                    placeholder="Enter secure password"
                    [customValidator]="passwordValidator"
                    [validateOnChange]="true"
                    (inputChange)="onPasswordChange($event)"
                    helpText="Must be 8+ chars with uppercase, lowercase, and number"
                    class="w-full"
                  />
                </div>

                <!-- Phone with masking -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <InputComponent
                    formControlName="phone"
                    [mask]="phoneMask"
                    [customValidator]="phoneValidator"
                    [validateOnBlur]="true"
                    (inputChange)="onPhoneChange($event)"
                    inputMode="tel"
                    autoComplete="tel"
                    class="w-full"
                  />
                </div>

                <!-- Credit Card with masking -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Credit Card *
                  </label>
                  <InputComponent
                    formControlName="creditCard"
                    [mask]="creditCardMask"
                    [customValidator]="creditCardValidator"
                    [validateOnBlur]="true"
                    (inputChange)="onCreditCardChange($event)"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    class="w-full"
                  />
                </div>

                <!-- Amount with currency mask -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount *
                  </label>
                  <InputComponent
                    formControlName="amount"
                    [mask]="currencyMask"
                    [customValidator]="currencyValidator"
                    [validateOnChange]="true"
                    (inputChange)="onAmountChange($event)"
                    inputMode="decimal"
                    helpText="Enter amount between $0.01 and $10,000"
                    class="w-full"
                  />
                </div>
              </div>

              <!-- Form Actions -->
              <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  (click)="clearAllInputs()"
                  class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Clear All
                </button>
                <div class="flex gap-4">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Form Status:
                    <span [class]="enhancedForm.valid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                      {{ enhancedForm.valid ? 'Valid ✓' : 'Invalid ✗' }}
                    </span>
                    <span class="ml-2 text-xs">
                      ({{ enhancedForm.status }})
                    </span>
                  </div>
                  <button
                    type="submit"
                    [disabled]="!enhancedForm.valid"
                    class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit Form
                  </button>
                </div>
              </div>
            </form>
          </div>

          <!-- Mobile Optimizations -->
          <div class="mb-16">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">📱 Mobile Optimizations</h3>
            <div class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

                <!-- Mobile Phone Input -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mobile Phone
                  </label>
                  <InputComponent
                    [(ngModel)]="mobilePhoneValue"
                    [mask]="phoneMask"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="Optimized for mobile keyboards"
                    helpText="Notice the numeric keypad on mobile devices"
                    class="w-full"
                  />
                </div>

                <!-- Mobile Card Input -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Card Number
                  </label>
                  <InputComponent
                    [(ngModel)]="mobileCardValue"
                    [mask]="creditCardMask"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="Touch-friendly card input"
                    helpText="Automatic formatting as you type"
                    class="w-full"
                  />
                </div>
              </div>

              <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Mobile Features:</h4>
                <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Appropriate virtual keyboards (numeric, email, tel, etc.)</li>
                  <li>• Touch-friendly input sizing and spacing</li>
                  <li>• Optimized autocomplete attributes</li>
                  <li>• Responsive design for all screen sizes</li>
                  <li>• Accessible focus indicators</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Performance Features -->
          <div class="mb-16">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">⚡ Performance Features</h3>
            <div class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div class="text-center">
                  <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h4 class="font-bold text-gray-900 dark:text-white mb-2">Debounced Input</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Configurable debouncing prevents excessive API calls and improves performance</p>
                </div>

                <div class="text-center">
                  <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <h4 class="font-bold text-gray-900 dark:text-white mb-2">Smart Caching</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Intelligent caching of validation results and mask patterns for better performance</p>
                </div>

                <div class="text-center">
                  <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <h4 class="font-bold text-gray-900 dark:text-white mb-2">Memory Efficient</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Optimized memory usage with proper cleanup and signal-based reactivity</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Documentation Link -->
        <div class="mt-20 text-center">
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-800/50">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to get started?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">Check out our comprehensive documentation for installation, examples, and API reference.</p>
            <a
              href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/input.md"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})

export class InputDemoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  // ViewChild references to access Input components directly
  @ViewChildren(InputComponent) inputComponents!: QueryList<InputComponent>;

  // Basic demo values
  heroInputValue = signal('');
  basicValue = signal('');
  filledValue = signal('');
  flushedValue = signal('');
  unstyledValue = signal('');

  // Additional variant signals for demo purposes
  defaultValue = signal('');
  defaultLargeValue = signal('');
  defaultSmallValue = signal('');
  filledLargeValue = signal('');
  filledSmallValue = signal('');
  flushedLargeValue = signal('');
  flushedSmallValue = signal('');
  successValue = signal('');

  // Size variants
  smallValue = signal('');
  mediumValue = signal('');
  largeValue = signal('');
  xlValue = signal('');

  // State variants
  defaultStateValue = signal('');
  errorStateValue = signal('');
  successStateValue = signal('');
  warningStateValue = signal('');

  // Type variants
  emailValue = signal('');
  passwordValue = signal('');
  numberValue = signal('');
  dateValue = signal('');
  searchValue = signal('');

  // Enhanced features demo values
  validationEmailValue = signal('');
  validationPasswordValue = signal('');
  mobilePhoneValue = signal('');
  mobileCardValue = signal('');

  // New enhanced features
  phoneValue = signal('');
  creditCardValue = signal('');
  ssnValue = signal('');
  currencyValue = signal('');
  postalCodeValue = signal('');
  sanitizedValue = signal('');
  maskedDateValue = signal('');
  maskedTimeValue = signal('');
  customMaskValue = signal('');

  // Form validation demo
  enhancedForm: FormGroup;

  // Mask configurations
  phoneMask: MaskConfig = {
    type: 'phone',
    stripMask: true
  };

  creditCardMask: MaskConfig = {
    type: 'creditCard',
    stripMask: true  // This ensures the validator gets the raw digits
  };

  ssnMask: MaskConfig = {
    type: 'ssn',
    stripMask: true
  };

  currencyMask: MaskConfig = {
    type: 'currency',
    stripMask: false
  };

  postalCodeMask: MaskConfig = {
    type: 'postalCode',
    stripMask: true
  };

  dateMask: MaskConfig = {
    type: 'date',
    stripMask: false
  };

  timeMask: MaskConfig = {
    type: 'time',
    stripMask: false
  };

  customMask: MaskConfig = {
    type: 'custom',
    pattern: '000-AAA-***',
    placeholder: '123-ABC-xyz',
    stripMask: false
  };

  // Sanitization configurations
  basicSanitization: SanitizationConfig = {
    allowHTML: false,
    allowScripts: false,
    maxLength: 100
  };

  strictSanitization: SanitizationConfig = {
    allowHTML: false,
    allowScripts: false,
    allowedCharacters: /[a-zA-Z0-9\s@.-]/,
    maxLength: 50,
    customSanitizer: (value: string) => {
      // Remove common XSS patterns
      return value
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .replace(/<script/gi, '&lt;script');
    }
  };

  constructor() {
    this.enhancedForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      creditCard: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Subscribe to form changes to trigger change detection
    this.enhancedForm.statusChanges.subscribe((status) => {
      console.log('Form status changed:', status, 'Valid:', this.enhancedForm.valid);
      this.cdr.detectChanges();
    });

    this.enhancedForm.valueChanges.subscribe((value) => {
      console.log('Form value changed:', value);
      this.cdr.detectChanges();
    });

    // Initial form state logging
    console.log('Initial form state - Valid:', this.enhancedForm.valid, 'Status:', this.enhancedForm.status);
  }

  // Input change handlers that update form validation
  onEmailChange(value: string): void {
    const control = this.enhancedForm.get('email');
    const error = this.emailValidator(value);
    if (error) {
      control?.setErrors({ customValidation: error });
    } else {
      control?.setErrors(null);
    }
    this.cdr.detectChanges();
  }

  onPasswordChange(value: string): void {
    const control = this.enhancedForm.get('password');
    const error = this.passwordValidator(value);
    if (error) {
      control?.setErrors({ customValidation: error });
    } else {
      control?.setErrors(null);
    }
    this.cdr.detectChanges();
  }

  onPhoneChange(value: string): void {
    const control = this.enhancedForm.get('phone');
    const error = this.phoneValidator(value);
    if (error) {
      control?.setErrors({ customValidation: error });
    } else {
      control?.setErrors(null);
    }
    this.cdr.detectChanges();
  }

  onCreditCardChange(value: string): void {
    const control = this.enhancedForm.get('creditCard');
    const error = this.creditCardValidator(value);
    if (error) {
      control?.setErrors({ customValidation: error });
    } else {
      control?.setErrors(null);
    }
    this.cdr.detectChanges();
  }

  onAmountChange(value: string): void {
    const control = this.enhancedForm.get('amount');
    const error = this.currencyValidator(value);
    if (error) {
      control?.setErrors({ customValidation: error });
    } else {
      control?.setErrors(null);
    }
    this.cdr.detectChanges();
  }

  // Custom validators
  emailValidator = (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return null;
  };

  passwordValidator = (value: string): string | null => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
    return null;
  };

  phoneValidator = (value: string): string | null => {
    if (!value) return 'Phone number is required';
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length !== 10) return 'Phone number must be 10 digits';
    return null;
  };

  creditCardValidator = (value: string): string | null => {
    if (!value) return 'Credit card number is required';
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length < 13 || cleaned.length > 19) return 'Invalid credit card number';

    // Luhn algorithm check
    let sum = 0;
    let alternate = false;
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let n = parseInt(cleaned.charAt(i), 10);
      if (alternate) {
        n *= 2;
        if (n > 9) n = (n % 10) + 1;
      }
      sum += n;
      alternate = !alternate;
    }

    if (sum % 10 !== 0) return 'Invalid credit card number';
    return null;
  };

  currencyValidator = (value: string): string | null => {
    if (!value) return 'Amount is required';
    const cleaned = value.replace(/[^\d.]/g, '');
    const amount = parseFloat(cleaned);
    if (isNaN(amount) || amount <= 0) return 'Please enter a valid amount';
    if (amount > 10000) return 'Amount cannot exceed $10,000';
    return null;
  };

  // Demo methods
  clearAllInputs(): void {
    // Clear all signal values
    this.heroInputValue.set('');
    this.basicValue.set('');
    this.filledValue.set('');
    this.flushedValue.set('');
    this.phoneValue.set('');
    this.creditCardValue.set('');
    this.ssnValue.set('');
    this.currencyValue.set('');
    this.sanitizedValue.set('');

    // Reset the reactive form
    this.enhancedForm.reset();

    // Clear all Input components directly
    if (this.inputComponents) {
      this.inputComponents.forEach(input => {
        if (input && typeof input.clear === 'function') {
          input.clear();
        }
      });
    }

    // Force change detection
    this.cdr.detectChanges();

    console.log('All inputs cleared. Form valid:', this.enhancedForm.valid);
  }

  onFormSubmit(): void {
    console.log('Form submission attempt - Valid:', this.enhancedForm.valid);
    console.log('Form errors:', this.enhancedForm.errors);
    console.log('Form value:', this.enhancedForm.value);

    // Mark all fields as touched to show validation errors
    this.enhancedForm.markAllAsTouched();

    if (this.enhancedForm.valid) {
      console.log('Form submitted:', this.enhancedForm.value);
      alert('Form submitted successfully! Check console for data.');
    } else {
      console.log('Form is invalid. Individual field errors:');
      Object.keys(this.enhancedForm.controls).forEach(key => {
        const control = this.enhancedForm.get(key);
        if (control && control.errors) {
          console.log(`${key}:`, control.errors);
        }
      });
      alert('Form has validation errors. Please check all fields.');
    }
  }
}
