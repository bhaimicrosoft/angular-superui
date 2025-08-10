import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AuthForms,
  type AuthFormConfig,
  type AuthFormType,
  type AuthFormSubmitEvent,
  type SocialProvider,
  type AuthFormVariant,
  type AuthFieldVariant
} from '@lib/blocks/auth-forms';

@Component({
  selector: 'app-auth-forms-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AuthForms],
  template: `
    <!-- Hero Section -->
    <div class="relative min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-slate-900 dark:via-purple-900 dark:to-indigo-900 overflow-hidden">
      <!-- Background Decoration -->
      <div class="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
      <div class="absolute inset-0 opacity-5 dark:opacity-[0.02]" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 20px 20px;"></div>

      <!-- Floating Elements -->
      <div class="absolute top-20 left-10 w-32 h-32 bg-white/10 dark:bg-white/5 rounded-full blur-xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-40 h-40 bg-purple-300/20 dark:bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-300"></div>
      <div class="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-300/15 dark:bg-pink-400/8 rounded-full blur-lg animate-pulse delay-700"></div>

      <!-- Hero Content -->
      <div class="relative z-10 flex items-center justify-center min-h-screen">
        <div class="max-w-6xl mx-auto px-6 text-center text-white dark:text-gray-100">
          <!-- Badge -->
          <div class="inline-flex items-center px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <span class="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Authentication Forms
          </div>

          <!-- Main Title -->
          <h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 dark:from-gray-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight animate-fade-in-up">
            Auth Forms
            <br>
            <span class="text-3xl md:text-5xl font-light">Block</span>
          </h1>

          <!-- Subtitle -->
          <p class="text-xl md:text-2xl text-blue-100 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Complete authentication forms with validation, social login, and beautiful designs
          </p>

          <!-- Quick Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 animate-fade-in-up delay-400">
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-white mb-2">4</div>
              <div class="text-blue-200 dark:text-gray-400 text-sm">Form Types</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-white mb-2">7</div>
              <div class="text-blue-200 dark:text-gray-400 text-sm">Variants</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-white mb-2">5</div>
              <div class="text-blue-200 dark:text-gray-400 text-sm">Field Styles</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-white mb-2">∞</div>
              <div class="text-blue-200 dark:text-gray-400 text-sm">Customizable</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 dark:text-gray-300/70 animate-bounce">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </div>

    <!-- Main Content -->
    <div class="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">

      <!-- Section 1: Login Form Demo -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
            Basic Forms
          </div>
          <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Login & Register Forms
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Beautiful authentication forms with validation, social login, and customizable styling
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-12">
          <!-- Login Form -->
          <div class="space-y-6">
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white text-center">Login Form</h3>
            <div class="flex justify-center">
              <AuthForms
                [config]="loginConfig()"
                [variant]="selectedVariant()"
                [fieldVariant]="selectedFieldVariant()"
                [socialProviders]="socialProviders()"
                (formSubmit)="onFormSubmit($event)"
                (formSwitch)="onFormSwitch($event)"
                (forgotPassword)="onForgotPassword()"
              />
            </div>
          </div>

          <!-- Register Form -->
          <div class="space-y-6">
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white text-center">Register Form</h3>
            <div class="flex justify-center">
              <AuthForms
                [config]="registerConfig()"
                [variant]="selectedVariant()"
                [fieldVariant]="selectedFieldVariant()"
                [socialProviders]="socialProviders()"
                (formSubmit)="onFormSubmit($event)"
                (formSwitch)="onFormSwitch($event)"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Form Variants -->
      <section class="max-w-7xl mx-auto px-6 py-20 bg-gray-50 dark:bg-gray-800/50">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
            Form Variants
          </div>
          <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Multiple Styles Available
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Choose from different form variants to match your design system
          </p>
        </div>

        <!-- Variant Selector -->
        <div class="flex justify-center mb-12">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="grid grid-cols-3 md:grid-cols-7 gap-1">
              <button
                *ngFor="let variant of formVariants"
                (click)="selectedVariant.set(variant.value)"
                [class]="variant.value === selectedVariant()
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
                class="px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap"
              >
                {{ variant.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Field Variant Selector -->
        <div class="flex justify-center mb-12">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="grid grid-cols-2 md:grid-cols-5 gap-1">
              <button
                *ngFor="let variant of fieldVariants"
                (click)="selectedFieldVariant.set(variant.value)"
                [class]="variant.value === selectedFieldVariant()
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
                class="px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap"
              >
                {{ variant.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Variant Demo -->
        <div class="flex justify-center">
          <AuthForms
            [config]="variantDemoConfig()"
            [variant]="selectedVariant()"
            [fieldVariant]="selectedFieldVariant()"
            [socialProviders]="socialProviders()"
            (formSubmit)="onFormSubmit($event)"
          />
        </div>
      </section>

      <!-- Section 2.5: Reactive vs Template-Driven Forms -->
      <section class="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/50 dark:to-gray-700/50">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-4">
            Dual Mode Support
          </div>
          <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Reactive & Template-Driven Forms
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Choose your preferred Angular form approach - both reactive and template-driven forms are fully supported
          </p>
        </div>

        <!-- Form Mode Selector -->
        <div class="flex justify-center mb-12">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="grid grid-cols-2 gap-1">
              <button
                (click)="selectedFormMode.set('reactive')"
                [class]="selectedFormMode() === 'reactive'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
                class="px-6 py-3 rounded-md text-sm font-medium transition-all duration-200"
              >
                Reactive Forms
              </button>
              <button
                (click)="selectedFormMode.set('template')"
                [class]="selectedFormMode() === 'template'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
                class="px-6 py-3 rounded-md text-sm font-medium transition-all duration-200"
              >
                Template-Driven
              </button>
            </div>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Form Demo -->
          <div class="flex justify-center">
            <div class="w-full max-w-md">
              <!-- Reactive Form -->
              <div *ngIf="selectedFormMode() === 'reactive'">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Reactive Form Mode</h3>
                <AuthForms
                  [config]="reactiveFormConfig()"
                  [variant]="'card'"
                  [fieldVariant]="'floating'"
                  (formSubmit)="onFormSubmit($event)"
                />
              </div>

              <!-- Template-Driven Form -->
              <div *ngIf="selectedFormMode() === 'template'">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Template-Driven Mode</h3>
                <AuthForms
                  [config]="templateFormConfig()"
                  [variant]="'card'"
                  [fieldVariant]="'floating'"
                  [(value)]="templateFormData"
                  (formSubmit)="onFormSubmit($event)"
                />

                <!-- Show bound data -->
                <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bound Data:</h4>
                  <pre class="text-xs text-gray-600 dark:text-gray-400 overflow-auto">{{ templateFormData | json }}</pre>
                </div>
              </div>
            </div>
          </div>

          <!-- Code Examples -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {{ selectedFormMode() === 'reactive' ? 'Reactive Form' : 'Template-Driven Form' }} Usage
              </h3>

              <!-- Reactive Form Code -->
              <div *ngIf="selectedFormMode() === 'reactive'" class="space-y-4">
                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Component:</h4>
                  <pre class="text-sm text-gray-600 dark:text-gray-400 overflow-auto"><code>config: AuthFormConfig = &#123;
  mode: 'reactive', // or omit (default)
  type: 'login',
  fields: [
    &#123; name: 'email', type: 'email', label: 'Email', required: true &#125;,
    &#123; name: 'password', type: 'password', label: 'Password', required: true &#125;
  ]
&#125;;</code></pre>
                </div>

                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Template:</h4>
                  <pre class="text-sm text-gray-600 dark:text-gray-400 overflow-auto"><code>&lt;AuthForms
  [config]="config"
  [variant]="'card'"
  [fieldVariant]="'floating'"
  (formSubmit)="onSubmit($event)"
/&gt;</code></pre>
                </div>
              </div>

              <!-- Template-Driven Form Code -->
              <div *ngIf="selectedFormMode() === 'template'" class="space-y-4">
                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Component:</h4>
                  <pre class="text-sm text-gray-600 dark:text-gray-400 overflow-auto"><code>formData = &#123;
  email: '',
  password: ''
&#125;;

config: AuthFormConfig = &#123;
  mode: 'template',
  type: 'login',
  fields: [
    &#123; name: 'email', type: 'email', label: 'Email', required: true &#125;,
    &#123; name: 'password', type: 'password', label: 'Password', required: true &#125;
  ]
&#125;;</code></pre>
                </div>

                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Template:</h4>
                  <pre class="text-sm text-gray-600 dark:text-gray-400 overflow-auto"><code>&lt;AuthForms
  [config]="config"
  [(value)]="formData"
  [variant]="'card'"
  [fieldVariant]="'floating'"
  (formSubmit)="onSubmit($event)"
/&gt;</code></pre>
                </div>
              </div>
            </div>

            <!-- Benefits -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {{ selectedFormMode() === 'reactive' ? 'Reactive Forms' : 'Template-Driven Forms' }} Benefits
              </h3>

              <div *ngIf="selectedFormMode() === 'reactive'" class="space-y-2">
                <div class="flex items-center space-x-2">
                  <span class="text-green-500">✓</span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Better type safety</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-green-500">✓</span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Advanced validation</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-green-500">✓</span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Easier testing</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-green-500">✓</span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Dynamic forms</span>
                </div>
              </div>

              <div *ngIf="selectedFormMode() === 'template'" class="space-y-2">
                <div class="flex items-center space-x-2">
                  <span class="text-green-500">✓</span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Simpler syntax</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-green-500">✓</span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Two-way data binding</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-green-500">✓</span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Familiar ngModel</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-green-500">✓</span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Quick prototyping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Forgot Password -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
            Password Recovery
          </div>
          <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Forgot Password Flow
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Complete password reset workflow with email verification
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-12">
          <!-- Forgot Password Form -->
          <div class="space-y-6">
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white text-center">Forgot Password</h3>
            <div class="flex justify-center">
              <AuthForms
                [config]="forgotPasswordConfig()"
                variant="card"
                fieldVariant="outlined"
                (formSubmit)="onFormSubmit($event)"
                (formSwitch)="onFormSwitch($event)"
              />
            </div>
          </div>

          <!-- Reset Password Form -->
          <div class="space-y-6">
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white text-center">Reset Password</h3>
            <div class="flex justify-center">
              <AuthForms
                [config]="resetPasswordConfig()"
                variant="card"
                fieldVariant="outlined"
                (formSubmit)="onFormSubmit($event)"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Section 4: Advanced Features -->
      <section class="max-w-7xl mx-auto px-6 py-20 bg-gray-50 dark:bg-gray-800/50">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-4">
            Advanced Features
          </div>
          <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Enhanced Registration
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Advanced registration with custom fields, validation, and terms acceptance
          </p>
        </div>

        <div class="flex justify-center">
          <AuthForms
            [config]="advancedRegisterConfig()"
            variant="gradient"
            fieldVariant="floating"
            [socialProviders]="socialProviders()"
            (formSubmit)="onFormSubmit($event)"
            (formSwitch)="onFormSwitch($event)"
          />
        </div>
      </section>

      <!-- Section 5: Social Login Focus -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-sm font-medium mb-4">
            Social Authentication
          </div>
          <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Social Login Integration
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Seamless integration with popular social authentication providers
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-12">
          <!-- Social-Only Login -->
          <div class="space-y-6">
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white text-center">Social Login Only</h3>
            <div class="flex justify-center">
              <AuthForms
                [config]="socialOnlyConfig()"
                variant="card"
                [socialProviders]="socialProviders()"
                (formSubmit)="onFormSubmit($event)"
                (formSwitch)="onFormSwitch($event)"
              />
            </div>
          </div>

          <!-- Mixed Authentication -->
          <div class="space-y-6">
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white text-center">Mixed Authentication</h3>
            <div class="flex justify-center">
              <AuthForms
                [config]="mixedAuthConfig()"
                variant="bordered"
                fieldVariant="filled"
                [socialProviders]="socialProviders()"
                (formSubmit)="onFormSubmit($event)"
                (formSwitch)="onFormSwitch($event)"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Section 6: Code Examples -->
      <section class="max-w-7xl mx-auto px-6 py-20 bg-gray-900 text-white">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-4">
            💻 Implementation
          </div>
          <h2 class="text-4xl font-bold mb-4">Easy to Implement</h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Get started with just a few lines of code
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 class="text-lg font-semibold mb-4 text-green-400">Basic Login Form</h3>
            <pre class="text-sm text-gray-300 overflow-x-auto"><code>&lt;AuthForms
  [config]="loginConfig"
  variant="default"
  (formSubmit)="onLogin($event)"
/&gt;</code></pre>
          </div>

          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 class="text-lg font-semibold mb-4 text-blue-400">With Social Login</h3>
            <pre class="text-sm text-gray-300 overflow-x-auto"><code>&lt;AuthForms
  [config]="loginConfig"
  [socialProviders]="providers"
  variant="glass"
  (formSubmit)="onLogin($event)"
/&gt;</code></pre>
          </div>
        </div>

        <div class="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 class="text-lg font-semibold mb-4 text-purple-400">Form Configuration</h3>
          <pre class="text-sm text-gray-300 overflow-x-auto"><code>loginConfig: AuthFormConfig = &#123;
  type: 'login',
  title: 'Welcome back',
  subtitle: 'Sign in to your account',
  showSocialLogin: true,
  showRememberMe: true,
  showForgotPassword: true,
  fields: [
    &#123; name: 'email', type: 'email', label: 'Email', required: true &#125;,
    &#123; name: 'password', type: 'password', label: 'Password', required: true &#125;
  ]
&#125;;</code></pre>
        </div>
      </section>

      <!-- Documentation Link -->
      <section class="max-w-4xl mx-auto px-6 py-20">
        <div class="text-center p-8 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800">
          <div class="space-y-6">
            <div class="inline-flex items-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
              📚 Documentation
            </div>
            <h3 class="text-3xl font-bold text-indigo-900 dark:text-indigo-100">Complete Documentation</h3>
            <p class="text-lg text-indigo-700 dark:text-indigo-300 max-w-2xl mx-auto">
              Explore the full API reference, validation examples, social provider setup, and advanced customization options.
            </p>
            <a
              href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/blocks/auth-forms.md"
              target="_blank"
              class="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd" />
              </svg>
              View Auth Forms Documentation
            </a>
          </div>
        </div>
      </section>
    </div>

    <style>
      .animate-fade-in {
        animation: fadeIn 0.6s ease-out;
      }

      .animate-fade-in-up {
        animation: fadeInUp 0.6s ease-out;
      }

      .delay-200 {
        animation-delay: 0.2s;
        animation-fill-mode: both;
      }

      .delay-400 {
        animation-delay: 0.4s;
        animation-fill-mode: both;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    </style>
  `,
})
export class AuthFormsDemoComponent {
  // Current form state
  selectedVariant = signal<AuthFormVariant>('default');
  selectedFieldVariant = signal<AuthFieldVariant>('default');
  selectedFormMode = signal<'reactive' | 'template'>('reactive');

  // Template-driven form data
  templateFormData = signal<any>({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  // Variant options
  formVariants = [
    { value: 'default' as AuthFormVariant, label: 'Default' },
    { value: 'minimal' as AuthFormVariant, label: 'Minimal' },
    { value: 'card' as AuthFormVariant, label: 'Card' },
    { value: 'bordered' as AuthFormVariant, label: 'Bordered' },
    { value: 'gradient' as AuthFormVariant, label: 'Gradient' }
  ];

  fieldVariants = [
    { value: 'default' as AuthFieldVariant, label: 'Default' },
    { value: 'floating' as AuthFieldVariant, label: 'Floating' },
    { value: 'outlined' as AuthFieldVariant, label: 'Outlined' },
    { value: 'filled' as AuthFieldVariant, label: 'Filled' },
    { value: 'underlined' as AuthFieldVariant, label: 'Underlined' }
  ];

  // Social providers
  socialProviders = signal<SocialProvider[]>([
    {
      name: 'Google',
      icon: `<svg viewBox="0 0 24 24" width="18" height="18">
        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>`,
      color: '#4285f4'
    },
    {
      name: 'GitHub',
      icon: `<svg viewBox="0 0 24 24" width="18" height="18">
        <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>`,
      color: '#24292e'
    },
    {
      name: 'Microsoft',
      icon: `<svg viewBox="0 0 24 24" width="18" height="18">
        <path fill="#f25022" d="M1 1h10v10H1z"/>
        <path fill="#00a4ef" d="M13 1h10v10H13z"/>
        <path fill="#7fba00" d="M1 13h10v10H1z"/>
        <path fill="#ffb900" d="M13 13h10v10H13z"/>
      </svg>`,
      color: '#0078d4'
    }
  ]);

  // Form configurations
  loginConfig = signal<AuthFormConfig>({
    type: 'login',
    title: 'Welcome back',
    subtitle: 'Sign in to your account to continue',
    showSocialLogin: true,
    showRememberMe: true,
    showForgotPassword: true,
    fields: [
      {
        name: 'email',
        type: 'email',
        label: 'Email address',
        placeholder: 'Enter your email',
        required: true,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        required: true,
        minLength: 6,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`
      }
    ]
  });

  registerConfig = signal<AuthFormConfig>({
    type: 'register',
    title: 'Create your account',
    subtitle: 'Get started with your free account',
    showSocialLogin: true,
    fields: [
      {
        name: 'fullName',
        type: 'text',
        label: 'Full name',
        placeholder: 'Enter your full name',
        required: true,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email address',
        placeholder: 'Enter your email',
        required: true,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Create a password',
        required: true,
        minLength: 8,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`,
        helpText: 'Must be at least 8 characters with uppercase, lowercase, numbers, and symbols'
      },
      {
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirm password',
        placeholder: 'Confirm your password',
        required: true,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`
      },
      {
        name: 'termsAccepted',
        type: 'checkbox',
        label: 'I agree to the <a href="#" class="text-blue-600 hover:text-blue-500">Terms of Service</a> and <a href="#" class="text-blue-600 hover:text-blue-500">Privacy Policy</a>',
        required: true
      }
    ]
  });

  variantDemoConfig = signal<AuthFormConfig>({
    type: 'login',
    title: 'Variant Demo',
    subtitle: 'See how different variants look',
    showSocialLogin: true,
    showRememberMe: true,
    fields: [
      {
        name: 'email',
        type: 'email',
        label: 'Email address',
        placeholder: 'Enter your email',
        required: true,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        required: true,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`
      }
    ]
  });

  forgotPasswordConfig = signal<AuthFormConfig>({
    type: 'forgot-password',
    title: 'Reset your password',
    subtitle: 'Enter your email address and we\'ll send you a link to reset your password',
    fields: [
      {
        name: 'email',
        type: 'email',
        label: 'Email address',
        placeholder: 'Enter your email',
        required: true,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`
      }
    ]
  });

  resetPasswordConfig = signal<AuthFormConfig>({
    type: 'reset-password',
    title: 'Set new password',
    subtitle: 'Your new password must be different from previous used passwords',
    fields: [
      {
        name: 'password',
        type: 'password',
        label: 'New password',
        placeholder: 'Enter new password',
        required: true,
        minLength: 8,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`
      },
      {
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirm new password',
        placeholder: 'Confirm new password',
        required: true,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`
      }
    ]
  });

  advancedRegisterConfig = signal<AuthFormConfig>({
    type: 'register',
    title: 'Join our community',
    subtitle: 'Create your account with additional details',
    showSocialLogin: true,
    fields: [
      {
        name: 'firstName',
        type: 'text',
        label: 'First name',
        placeholder: 'Enter your first name',
        required: true,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`
      },
      {
        name: 'lastName',
        type: 'text',
        label: 'Last name',
        placeholder: 'Enter your last name',
        required: true,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email address',
        placeholder: 'Enter your email',
        required: true,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`
      },
      {
        name: 'phoneNumber',
        type: 'tel',
        label: 'Phone number',
        placeholder: 'Enter your phone number',
        required: false,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`
      },
      {
        name: 'role',
        type: 'select',
        label: 'Role',
        placeholder: 'Select your role',
        required: true,
        options: [
          { value: 'developer', label: 'Developer' },
          { value: 'designer', label: 'Designer' },
          { value: 'manager', label: 'Project Manager' },
          { value: 'student', label: 'Student' },
          { value: 'other', label: 'Other' }
        ]
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Create a password',
        required: true,
        minLength: 8,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`
      },
      {
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirm password',
        placeholder: 'Confirm your password',
        required: true,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`
      },
      {
        name: 'marketingEmails',
        type: 'checkbox',
        label: 'I would like to receive marketing emails about new features and updates',
        required: false
      },
      {
        name: 'termsAccepted',
        type: 'checkbox',
        label: 'I agree to the <a href="#" class="text-blue-600 hover:text-blue-500">Terms of Service</a> and <a href="#" class="text-blue-600 hover:text-blue-500">Privacy Policy</a>',
        required: true
      }
    ]
  });

  socialOnlyConfig = signal<AuthFormConfig>({
    type: 'login',
    title: 'Welcome back',
    subtitle: 'Choose your preferred login method',
    showSocialLogin: true,
    fields: []
  });

  mixedAuthConfig = signal<AuthFormConfig>({
    type: 'login',
    title: 'Sign in to continue',
    subtitle: 'Use your social account or email',
    showSocialLogin: true,
    showRememberMe: true,
    showForgotPassword: true,
    fields: [
      {
        name: 'email',
        type: 'email',
        label: 'Email address',
        placeholder: 'Enter your email',
        required: true
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        required: true
      }
    ]
  });

  // NEW: Reactive and Template form configs
  reactiveFormConfig = signal<AuthFormConfig>({
    mode: 'reactive',
    type: 'register',
    title: 'Create Account',
    subtitle: 'Using Reactive Forms',
    fields: [
      {
        name: 'firstName',
        type: 'text',
        label: 'First Name',
        placeholder: 'Your first name',
        required: true
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'your@email.com',
        required: true
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter password',
        required: true,
      }
    ]
  });

  templateFormConfig = signal<AuthFormConfig>({
    mode: 'template',
    type: 'register',
    title: 'Create Account',
    subtitle: 'Using Template-Driven Forms',
    fields: [
      {
        name: 'firstName',
        type: 'text',
        label: 'First Name',
        placeholder: 'Your first name',
        required: true
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'your@email.com',
        required: true
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter password',
        required: true,
      }
    ]
  });

  // Event handlers
  onFormSubmit(event: AuthFormSubmitEvent) {
    console.log('Form submitted:', event);
    // Handle form submission here
    // You would typically send this to your authentication service
  }

  onFormSwitch(type: AuthFormType) {
    console.log('Form switch to:', type);
    // Handle form type switching
  }

  onForgotPassword() {
    console.log('Forgot password clicked');
    // Handle forgot password flow
  }

  onSocialLogin(provider: string) {
    console.log('Social login with:', provider);
    // Handle social authentication
  }
}
