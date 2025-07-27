import {ChangeDetectionStrategy, Component, signal, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Stepper, Step, StepContent, StepConfig} from '@lib/stepper';

@Component({
  selector: 'app-stepper-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Stepper,
    StepContent
  ],
  template: `
    <!-- Hero Section -->
    <section
      class="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 py-20 sm:py-32">
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            <span class="block">Multi-Step</span>
            <span class="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
              Stepper
            </span>
            <span class="block">Navigation</span>
          </h1>
          <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl">
            Guide users through complex workflows with our intuitive stepper component.
            Multi-step forms, wizards, and progress tracking made simple.
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
              Simple step navigation with horizontal and vertical orientations.
            </p>
          </div>

          <div class="grid gap-8 lg:grid-cols-2">
            <!-- Horizontal Stepper -->
            <div class="flex flex-col gap-4 p-6 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Horizontal Stepper</h3>
              <Stepper
                [steps]="basicSteps"
                [currentStep]="horizontalCurrentStep()"
                orientation="horizontal"
                (stepChange)="onHorizontalStepChange($event)"
                (completed)="onBasicStepperComplete('Horizontal')">

                <ng-template stepContent stepId="step1">
                  <div class="py-8 text-center">
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Welcome! Let's get started with your journey.
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Step 1 of {{ basicSteps.length }}
                    </p>
                  </div>
                </ng-template>

                <ng-template stepContent stepId="step2">
                  <div class="py-8 text-center">
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Configure your settings and preferences here.
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Step 2 of {{ basicSteps.length }}
                    </p>
                  </div>
                </ng-template>

                <ng-template stepContent stepId="step3">
                  <div class="py-8 text-center">
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Review all your choices before proceeding.
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Step 3 of {{ basicSteps.length }}
                    </p>
                  </div>
                </ng-template>

                <ng-template stepContent stepId="step4">
                  <div class="py-8 text-center">
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Congratulations! Setup is complete.
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Step 4 of {{ basicSteps.length }}
                    </p>
                  </div>
                </ng-template>
              </Stepper>
            </div>

            <!-- Vertical Stepper -->
            <div class="flex flex-col gap-4 p-6 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Vertical Stepper</h3>
              <Stepper
                [steps]="basicSteps"
                [currentStep]="verticalCurrentStep()"
                orientation="vertical"
                (stepChange)="onVerticalStepChange($event)"
                (completed)="onBasicStepperComplete('Vertical')">

                <ng-template stepContent stepId="step1">
                  <div class="py-4">
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Welcome! Let's get started with your journey.
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Step 1 of {{ basicSteps.length }}
                    </p>
                  </div>
                </ng-template>

                <ng-template stepContent stepId="step2">
                  <div class="py-4">
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Configure your settings and preferences here.
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Step 2 of {{ basicSteps.length }}
                    </p>
                  </div>
                </ng-template>

                <ng-template stepContent stepId="step3">
                  <div class="py-4">
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Review all your choices before proceeding.
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Step 3 of {{ basicSteps.length }}
                    </p>
                  </div>
                </ng-template>

                <ng-template stepContent stepId="step4">
                  <div class="py-4">
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Congratulations! Setup is complete.
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Step 4 of {{ basicSteps.length }}
                    </p>
                  </div>
                </ng-template>
              </Stepper>
            </div>
          </div>
        </section>

        <!-- Content Projection -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Content Projection
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Use the StepContent directive to project custom content into each step.
            </p>
          </div>

          <div class="flex flex-col gap-4">
            <div class="p-6 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Form Wizard with Content
                Projection</h3>
              <Stepper
                [steps]="contentSteps"
                [currentStep]="contentCurrentStep()"
                orientation="horizontal"
                [validateOnNext]="true"
                (stepChange)="onContentStepChange($event)"
                (stepError)="onContentStepError($event)">

                <ng-template stepContent stepId="content-step1">
                  <div class="space-y-4 py-6">
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h4>
                    <p class="text-gray-600 dark:text-gray-300">Please provide your basic information to get
                      started.</p>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First
                          Name</label>
                        <input
                          type="text"
                          [(ngModel)]="formData.firstName"
                          placeholder="Enter first name"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500">
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                        <input
                          type="text"
                          [(ngModel)]="formData.lastName"
                          placeholder="Enter last name"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500">
                      </div>
                    </div>
                    <div *ngIf="contentStepError() && contentCurrentStep() === 0"
                         class="text-red-600 dark:text-red-400 text-sm">
                      {{ contentStepError() }}
                    </div>
                  </div>
                </ng-template>

                <ng-template stepContent stepId="content-step2">
                  <div class="space-y-4 py-6">
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white">Contact Details</h4>
                    <p class="text-gray-600 dark:text-gray-300">Add your contact information for communication.</p>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email
                          Address</label>
                        <input
                          type="email"
                          [(ngModel)]="formData.email"
                          placeholder="Enter email address"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500">
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone
                          Number</label>
                        <input
                          type="tel"
                          [(ngModel)]="formData.phone"
                          placeholder="Enter phone number"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500">
                      </div>
                    </div>
                    <div *ngIf="contentStepError() && contentCurrentStep() === 1"
                         class="text-red-600 dark:text-red-400 text-sm">
                      {{ contentStepError() }}
                    </div>
                  </div>
                </ng-template>

                <ng-template stepContent stepId="content-step3">
                  <div class="space-y-4 py-6">
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white">Review & Submit</h4>
                    <p class="text-gray-600 dark:text-gray-300">Please review your information before submitting.</p>
                    <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Name:</p>
                          <p class="text-gray-900 dark:text-white">{{ formData.firstName }} {{ formData.lastName }}</p>
                        </div>
                        <div>
                          <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Email:</p>
                          <p class="text-gray-900 dark:text-white">{{ formData.email }}</p>
                        </div>
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Phone:</p>
                        <p class="text-gray-900 dark:text-white">{{ formData.phone || 'Not provided' }}</p>
                      </div>
                    </div>
                  </div>
                </ng-template>

                <ng-template stepContent stepId="content-step4">
                  <div class="space-y-4 py-6">
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white">Completion</h4>
                    <p class="text-gray-600 dark:text-gray-300">Thank you! Your information has been successfully submitted.</p>
                    <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div class="flex items-center">
                        <svg class="w-6 h-6 text-green-600 dark:text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <h5 class="text-green-800 dark:text-green-300 font-medium">Successfully Completed!</h5>
                          <p class="text-green-700 dark:text-green-400 text-sm">All steps have been completed successfully.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ng-template>
              </Stepper>
            </div>
          </div>
        </section>

        <!-- Variants -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Style Variants
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Different visual styles to match your design system.
            </p>
          </div>

          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <!-- Default Variant -->
            <div class="p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Default</h3>
              <Stepper
                [steps]="variantSteps"
                [currentStep]="1"
                variant="default"
                [showNavigation]="false"
                [allowStepClick]="false">
              </Stepper>
            </div>

            <!-- Minimal Variant -->
            <div class="p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Minimal</h3>
              <Stepper
                [steps]="variantSteps"
                [currentStep]="1"
                variant="minimal"
                [showNavigation]="false"
                [allowStepClick]="false">
              </Stepper>
            </div>

            <!-- Filled Variant -->
            <div class="p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Filled</h3>
              <Stepper
                [steps]="variantSteps"
                [currentStep]="1"
                variant="filled"
                [showNavigation]="false"
                [allowStepClick]="false">
              </Stepper>
            </div>

            <!-- Outlined Variant -->
            <div class="p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Outlined</h3>
              <Stepper
                [steps]="variantSteps"
                [currentStep]="1"
                variant="outlined"
                [showNavigation]="false"
                [allowStepClick]="false">
              </Stepper>
            </div>
          </div>
        </section>

        <!-- Sizes -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Sizes
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Small, default, and large sizes for different contexts.
            </p>
          </div>

          <div class="grid gap-6 lg:grid-cols-3">
            <!-- Small Size -->
            <div class="p-6 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Small</h3>
              <Stepper
                [steps]="sizeSteps"
                [currentStep]="1"
                size="sm"
                [showNavigation]="false"
                [allowStepClick]="false">
              </Stepper>
            </div>

            <!-- Default Size -->
            <div class="p-6 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Default</h3>
              <Stepper
                [steps]="sizeSteps"
                [currentStep]="1"
                size="default"
                [showNavigation]="false"
                [allowStepClick]="false">
              </Stepper>
            </div>

            <!-- Large Size -->
            <div class="p-6 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Large</h3>
              <Stepper
                [steps]="sizeSteps"
                [currentStep]="1"
                size="lg"
                [showNavigation]="false"
                [allowStepClick]="false">
              </Stepper>
            </div>
          </div>
        </section>

        <!-- Form Wizard -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Form Wizard
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Multi-step form with validation and progress tracking.
            </p>
          </div>

          <div class="max-w-4xl mx-auto w-full">
            <form [formGroup]="wizardForm">
              <Stepper
                [steps]="wizardSteps"
                [currentStep]="wizardCurrentStep()"
                orientation="horizontal"
                [linear]="true"
                [validateOnNext]="true"
                (stepChange)="onWizardStepChange($event)"
                (completed)="onWizardComplete()">

                <!-- Step 1: Personal Information -->
                <div class="space-y-6 p-6">
                  <div class="grid gap-4 md:grid-cols-2">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        formControlName="firstName"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter your first name">
                      <div *ngIf="wizardForm.get('firstName')?.invalid && wizardForm.get('firstName')?.touched"
                           class="mt-1 text-sm text-red-600">
                        First name is required
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        formControlName="lastName"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter your last name">
                      <div *ngIf="wizardForm.get('lastName')?.invalid && wizardForm.get('lastName')?.touched"
                           class="mt-1 text-sm text-red-600">
                        Last name is required
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      formControlName="email"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter your email">
                    <div *ngIf="wizardForm.get('email')?.invalid && wizardForm.get('email')?.touched"
                         class="mt-1 text-sm text-red-600">
                      Please enter a valid email address
                    </div>
                  </div>
                </div>

                <!-- Step 2: Account Details -->
                <div class="space-y-6 p-6" *ngIf="wizardCurrentStep() === 1">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Username *
                    </label>
                    <input
                      type="text"
                      formControlName="username"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Choose a username">
                    <div *ngIf="wizardForm.get('username')?.invalid && wizardForm.get('username')?.touched"
                         class="mt-1 text-sm text-red-600">
                      Username must be at least 3 characters long
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      formControlName="password"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Create a password">
                    <div *ngIf="wizardForm.get('password')?.invalid && wizardForm.get('password')?.touched"
                         class="mt-1 text-sm text-red-600">
                      Password must be at least 8 characters long
                    </div>
                  </div>
                </div>

                <!-- Step 3: Preferences -->
                <div class="space-y-6 p-6" *ngIf="wizardCurrentStep() === 2">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Newsletter Subscription
                    </label>
                    <div class="space-y-2">
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          formControlName="newsletter"
                          class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                        <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          I want to receive newsletters and updates
                        </span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Notifications
                    </label>
                    <div class="space-y-2">
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          formControlName="notifications"
                          class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                        <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Enable push notifications
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Step 4: Review -->
                <div class="space-y-6 p-6" *ngIf="wizardCurrentStep() === 3">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Review Your Information</h3>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                    <div class="grid gap-2 md:grid-cols-2">
                      <div>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">First Name:</span>
                        <span
                          class="ml-2 text-sm text-gray-900 dark:text-white">{{ wizardForm.get('firstName')?.value }}</span>
                      </div>
                      <div>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name:</span>
                        <span
                          class="ml-2 text-sm text-gray-900 dark:text-white">{{ wizardForm.get('lastName')?.value }}</span>
                      </div>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Email:</span>
                      <span
                        class="ml-2 text-sm text-gray-900 dark:text-white">{{ wizardForm.get('email')?.value }}</span>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Username:</span>
                      <span
                        class="ml-2 text-sm text-gray-900 dark:text-white">{{ wizardForm.get('username')?.value }}</span>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Newsletter:</span>
                      <span
                        class="ml-2 text-sm text-gray-900 dark:text-white">{{ wizardForm.get('newsletter')?.value ? 'Yes' : 'No' }}</span>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Notifications:</span>
                      <span
                        class="ml-2 text-sm text-gray-900 dark:text-white">{{ wizardForm.get('notifications')?.value ? 'Yes' : 'No' }}</span>
                    </div>
                  </div>
                </div>
              </Stepper>
            </form>
          </div>
        </section>

        <!-- Advanced Features -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Advanced Features
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Custom icons, optional steps, non-linear navigation, and error handling.
            </p>
          </div>

          <div class="grid gap-8 lg:grid-cols-2">
            <!-- Non-linear Navigation -->
            <div class="flex flex-col gap-4 p-6 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Non-linear Navigation</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Click on any step to navigate directly</p>
              <Stepper
                [steps]="advancedSteps"
                [currentStep]="nonLinearCurrentStep()"
                [linear]="false"
                [allowStepClick]="true"
                orientation="horizontal"
                (stepChange)="onNonLinearStepChange($event)">

                <div class="py-8 text-center">
                  <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {{ getAdvancedStepContent(nonLinearCurrentStep()) }}
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300">
                    Step {{ nonLinearCurrentStep() + 1 }} of {{ advancedSteps.length }}
                  </p>
                </div>
              </Stepper>
            </div>

            <!-- Error Handling -->
            <div class="flex flex-col gap-4 p-6 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Error Handling</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Steps with validation errors</p>
              <Stepper
                [steps]="errorSteps"
                [currentStep]="errorCurrentStep()"
                orientation="horizontal"
                [validateOnNext]="true"
                (stepChange)="onErrorStepChange($event)"
                (stepError)="onStepError($event)">

                <div class="py-8 text-center">
                  <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {{ getErrorStepContent(errorCurrentStep()) }}
                  </h4>
                  <div *ngIf="lastError()"
                       class="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    <p class="text-sm text-red-600 dark:text-red-400">{{ lastError() }}</p>
                  </div>
                </div>
              </Stepper>
            </div>
          </div>
        </section>

        <!-- Accessibility -->
        <section class="flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Accessibility Features
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Full keyboard navigation and screen reader support.
            </p>
          </div>

          <div class="max-w-4xl mx-auto w-full">
            <div class="p-6 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Keyboard Navigation</h3>
                <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <ul class="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                    <li><kbd class="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded font-mono text-xs">Tab</kbd> - Focus on stepper</li>
                    <li><kbd class="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded font-mono text-xs">Arrow Keys</kbd> - Navigate between
                      steps
                    </li>
                    <li><kbd class="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded font-mono text-xs">Enter/Space</kbd> - Select step</li>
                    <li><kbd class="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded font-mono text-xs">Home/End</kbd> - Jump to first/last
                      step
                    </li>
                  </ul>
                </div>
              </div>

              <Stepper
                [steps]="accessibilitySteps"
                [currentStep]="accessibilityCurrentStep()"
                orientation="horizontal"
                ariaLabel="Accessibility demonstration stepper"
                (stepChange)="onAccessibilityStepChange($event)">

                <div class="py-8 text-center">
                  <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {{ getAccessibilityStepContent(accessibilityCurrentStep()) }}
                  </h4>
                  <div class="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                      Screen readers announce step changes and provide navigation instructions.
                    </p>
                  </div>
                </div>
              </Stepper>
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
              href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/stepper.md"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25A8.966 8.966 0 0118 3.75c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6-2.292m0-14.25v14.25"/>
              </svg>
              View Full Documentation
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
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
export class StepperDemoComponent {
  // Basic stepper state
  horizontalCurrentStep = signal(0);
  verticalCurrentStep = signal(0);
  contentCurrentStep = signal(0);
  contentStepError = signal<string | null>(null);
  wizardCurrentStep = signal(0);
  nonLinearCurrentStep = signal(0);
  errorCurrentStep = signal(0);
  accessibilityCurrentStep = signal(0);
  lastError = signal<string | null>(null);
  // Form data for content projection demo
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };
  // Step configurations
  basicSteps: StepConfig[] = [
    {id: 'step1', label: 'Getting Started', description: 'Welcome to the process'},
    {id: 'step2', label: 'Configuration', description: 'Set up your preferences'},
    {id: 'step3', label: 'Review', description: 'Check your settings'},
    {id: 'step4', label: 'Complete', description: 'Finish the setup'}
  ];
  variantSteps: StepConfig[] = [
    {id: 'variant1', label: 'Step 1'},
    {id: 'variant2', label: 'Step 2'},
    {id: 'variant3', label: 'Step 3'}
  ];
  sizeSteps: StepConfig[] = [
    {id: 'size1', label: 'First'},
    {id: 'size2', label: 'Second'},
    {id: 'size3', label: 'Third'}
  ];
  contentSteps: StepConfig[] = [
    {
      id: 'content-step1',
      label: 'Personal Info',
      description: 'Enter your name',
      validator: () => this.validateContentStep1()
    },
    {
      id: 'content-step2',
      label: 'Email',
      description: 'Verify your email',
      validator: () => this.validateContentStep2()
    },
    {
      id: 'content-step3',
      label: 'Phone',
      description: 'Add phone number',
      validator: () => this.validateContentStep3()
    },
    {
      id: 'content-step4',
      label: 'Complete',
      description: 'Review information'
    }
  ];
  wizardSteps: StepConfig[] = [
    {
      id: 'personal',
      label: 'Personal Info',
      description: 'Basic information',
      validator: () => this.validatePersonalInfo()
    },
    {
      id: 'account',
      label: 'Account Details',
      description: 'Login credentials',
      validator: () => this.validateAccountInfo()
    },
    {
      id: 'preferences',
      label: 'Preferences',
      description: 'Your preferences',
      optional: true
    },
    {
      id: 'review',
      label: 'Review',
      description: 'Confirm details'
    }
  ];
  advancedSteps: StepConfig[] = [
    {
      id: 'advanced1',
      label: 'Start',
      description: 'Begin the process',
      icon: '🏁'
    },
    {
      id: 'advanced2',
      label: 'Optional Step',
      description: 'This step is optional',
      optional: true,
      skippable: true,
      icon: '⚙️'
    },
    {
      id: 'advanced3',
      label: 'Important',
      description: 'Critical step',
      icon: '⚠️'
    },
    {
      id: 'advanced4',
      label: 'Finish',
      description: 'Complete the process',
      icon: '✅'
    }
  ];
  errorSteps: StepConfig[] = [
    {
      id: 'error1',
      label: 'Valid Step',
      description: 'This step is fine'
    },
    {
      id: 'error2',
      label: 'Error Step',
      description: 'This step has validation',
      validator: () => this.simulateValidationError()
    },
    {
      id: 'error3',
      label: 'Final Step',
      description: 'Last step'
    }
  ];
  accessibilitySteps: StepConfig[] = [
    {id: 'a11y1', label: 'Introduction', description: 'Learn about accessibility'},
    {id: 'a11y2', label: 'Navigation', description: 'Keyboard navigation demo'},
    {id: 'a11y3', label: 'Screen Readers', description: 'Screen reader support'},
    {id: 'a11y4', label: 'Completion', description: 'Accessibility features complete'}
  ];
  private fb = inject(FormBuilder);
  // Form setup
  wizardForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    newsletter: [false],
    notifications: [false]
  });

  // Event handlers
  onHorizontalStepChange(event: any): void {
    this.horizontalCurrentStep.set(event.to);
  }

  onVerticalStepChange(event: any): void {
    this.verticalCurrentStep.set(event.to);
  }

  onContentStepChange(event: any): void {
    this.contentCurrentStep.set(event.to);
    this.contentStepError.set(null); // Clear error when step changes
  }

  onContentStepError(event: any): void {
    this.contentStepError.set(event.error || 'Validation failed');
  }

  onWizardStepChange(event: any): void {
    this.wizardCurrentStep.set(event.to);
  }

  onNonLinearStepChange(event: any): void {
    this.nonLinearCurrentStep.set(event.to);
  }

  onErrorStepChange(event: any): void {
    this.errorCurrentStep.set(event.to);
    this.lastError.set(null); // Clear error when step changes
  }

  onAccessibilityStepChange(event: any): void {
    this.accessibilityCurrentStep.set(event.to);
  }

  onStepError(event: any): void {
    this.lastError.set('Validation failed: Please check your input and try again.');
  }

  onWizardComplete(): void {
    alert('Form wizard completed successfully!');
  }

  onBasicStepperComplete(type: string): void {
    alert(`${type} stepper completed successfully!`);
  }

  // Async validation for content projection demo
  async validateEmail(email: string): Promise<boolean> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (!email.includes('@')) {
      this.contentStepError.set('Email must contain @');
      return false;
    }

    if (email === 'taken@example.com') {
      this.contentStepError.set('Email is already taken');
      return false;
    }

    this.contentStepError.set(null);
    return true;
  }

  async validatePhone(phone: string): Promise<boolean> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      this.contentStepError.set('Phone must be 10 digits');
      return false;
    }

    this.contentStepError.set(null);
    return true;
  }

  // Form handlers for content projection demo
  updateFormData(field: string, value: string) {
    this.formData = {...this.formData, [field]: value};
  }

  // Step validation functions for content projection demo
  async validateContentStep1(): Promise<boolean> {
    const {firstName, lastName} = this.formData;
    if (!firstName.trim() || !lastName.trim()) {
      this.contentStepError.set('First and last name are required');
      return false;
    }
    this.contentStepError.set(null);
    return true;
  }

  async validateContentStep2(): Promise<boolean> {
    return await this.validateEmail(this.formData.email);
  }

  async validateContentStep3(): Promise<boolean> {
    return await this.validatePhone(this.formData.phone);
  }

  // Validation methods
  validatePersonalInfo(): boolean {
    const firstName = this.wizardForm.get('firstName');
    const lastName = this.wizardForm.get('lastName');
    const email = this.wizardForm.get('email');

    firstName?.markAsTouched();
    lastName?.markAsTouched();
    email?.markAsTouched();

    return !!(firstName?.valid && lastName?.valid && email?.valid);
  }

  validateAccountInfo(): boolean {
    const username = this.wizardForm.get('username');
    const password = this.wizardForm.get('password');

    username?.markAsTouched();
    password?.markAsTouched();

    return !!(username?.valid && password?.valid);
  }

  simulateValidationError(): boolean {
    // Simulate a validation that always fails
    return false;
  }

  // Content helpers
  getCurrentStepContent(index: number): string {
    const contents = [
      'Welcome! Let\'s get started with your journey.',
      'Configure your settings and preferences here.',
      'Review all your choices before proceeding.',
      'Congratulations! Setup is complete.'
    ];
    return contents[index] || 'Step content';
  }

  getAdvancedStepContent(index: number): string {
    const contents = [
      'Starting the advanced workflow process.',
      'This is an optional step that can be skipped.',
      'Important information and critical settings.',
      'Process completed successfully!'
    ];
    return contents[index] || 'Advanced step content';
  }

  getErrorStepContent(index: number): string {
    const contents = [
      'This step works perfectly fine.',
      'This step will show an error when you try to proceed.',
      'Final step in the error handling demo.'
    ];
    return contents[index] || 'Error step content';
  }

  getAccessibilityStepContent(index: number): string {
    const contents = [
      'Introduction to accessibility features in the stepper.',
      'Try using keyboard navigation: Tab, Arrow keys, Enter.',
      'Screen readers will announce step changes automatically.',
      'All accessibility features are working correctly!'
    ];
    return contents[index] || 'Accessibility step content';
  }
}
