import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InputComponent } from '@lib/input';

@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, InputComponent],
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
                        [value]="errorValue()"
                        (inputChange)="errorValue.set($event)"
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
                        [value]="warningValue()"
                        (inputChange)="warningValue.set($event)"
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

        <!-- Enhanced Features Showcase -->
        <section class="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Enhanced Features
              </h2>
              <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Discover advanced accessibility, validation, and mobile optimization features built into every input.
              </p>
            </div>

            <!-- Accessibility & Validation Demo -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Form Validation Example -->
              <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Form Validation</h3>
                </div>
                <div class="space-y-6">
                  <div>
                    <InputComponent
                      placeholder="Enter your email"
                      type="email"
                      variant="default"
                      size="md"
                      [required]="true"
                      [value]="validationEmailValue()"
                      (inputChange)="validationEmailValue.set($event)"
                      ariaLabel="Email address"
                      helpText="We'll never share your email with anyone else"
                    />
                  </div>
                  
                  <div>
                    <InputComponent
                      placeholder="Create a password"
                      type="password"
                      variant="default"
                      size="md"
                      [required]="true"
                      [minLength]="8"
                      [value]="validationPasswordValue()"
                      (inputChange)="validationPasswordValue.set($event)"
                      ariaLabel="Password"
                      helpText="Must be at least 8 characters long"
                      [debounceTime]="300"
                    />
                  </div>
                </div>
              </div>

              <!-- Mobile Optimization Example -->
              <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Mobile Optimized</h3>
                </div>
                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <InputComponent
                      placeholder="+1 (555) 123-4567"
                      type="tel"
                      variant="default"
                      size="md"
                      inputMode="tel"
                      [value]="mobilePhoneValue()"
                      (inputChange)="mobilePhoneValue.set($event)"
                      ariaLabel="Phone number"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Credit Card
                    </label>
                    <InputComponent
                      placeholder="1234 5678 9012 3456"
                      type="text"
                      variant="default"
                      size="md"
                      inputMode="numeric"
                      [maxLength]="19"
                      [value]="mobileCardValue()"
                      (inputChange)="mobileCardValue.set($event)"
                      ariaLabel="Credit card number"
                    />
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
                [value]="textValue()"
                (inputChange)="textValue.set($event)"
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
export class InputDemoComponent {
  // Hero input
  heroInputValue = signal('');

  // Default variant values
  defaultValue = signal('');
  defaultLargeValue = signal('');
  defaultSmallValue = signal('');

  // Filled variant values
  filledValue = signal('');
  filledLargeValue = signal('');
  filledSmallValue = signal('');

  // Flushed variant values
  flushedValue = signal('');
  flushedLargeValue = signal('');
  flushedSmallValue = signal('');

  // State values
  successValue = signal('Valid input');
  errorValue = signal('Invalid input');
  warningValue = signal('Warning input');

  // Input type values
  textValue = signal('');
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
}
