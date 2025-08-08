# Stepper Component 🚶‍♂️

A sophisticated multi-step navigation component with advanced keyboard accessibility, intelligent content detection, and comprehensive customization options. Perfect for wizards, forms, onboarding flows, and complex workflows.

## Features

- 🗺️ **Dual Orientations** - Horizontal and vertical layouts
- 🎨 **4 Visual Variants** - Default, Minimal, Filled, Outlined
- 📏 **3 Sizes** - Small, Default, Large  
- ♿ **Advanced Accessibility** - Smart keyboard navigation with content-aware focus management
- 📱 **Fully Responsive** - Optimized for all screen sizes and devices
- 🌙 **Theme Support** - Beautiful in both light and dark modes
- ⚡ **Smart Navigation** - Intelligent Enter/Space behavior with content completion detection
- 🔄 **Progress Tracking** - Visual progress indicators and status management
- ✅ **Validation Support** - Built-in and custom validation with async support
- 🧩 **Content Projection** - Flexible content templates with StepContent directive
- 🎯 **Event System** - Comprehensive event handling for all interactions
- 📝 **Form Integration** - Seamless integration with Angular Reactive Forms
- 🔧 **TypeScript** - Full type safety with comprehensive interfaces

## SEO & Performance

- **SEO Optimized**: Semantic HTML with proper ARIA attributes and structured markup
- **Performance**: Lazy loading content, efficient change detection with OnPush strategy
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **Bundle Size**: Tree-shakeable components with minimal footprint
- **Browser Support**: Compatible with all modern browsers and IE11+

## Installation

Initialize Angular SuperUI in your project:

```bash
ngsui-cli init
```

Add the Stepper component:

```bash
ngsui-cli add stepper
```

## Basic Usage

Import the Stepper components in your Angular component:

```typescript
import { Component } from '@angular/core';
import { Stepper, Step, StepContent, StepConfig } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Stepper, StepContent],
  template: `
    <Stepper [steps]="steps" (completed)="onComplete()">
      <ng-template stepContent stepId="step1">
        <h3>Welcome!</h3>
        <p>Let's get started with your journey.</p>
      </ng-template>
      
      <ng-template stepContent stepId="step2">
        <h3>Configuration</h3>
        <p>Set up your preferences here.</p>
      </ng-template>
      
      <ng-template stepContent stepId="step3">
        <h3>Complete</h3>
        <p>All done! Ready to proceed.</p>
      </ng-template>
    </Stepper>
  `
})
export class ExampleComponent {
  steps: StepConfig[] = [
    { id: 'step1', label: 'Getting Started', description: 'Welcome step' },
    { id: 'step2', label: 'Setup', description: 'Configuration step' },
    { id: 'step3', label: 'Finish', description: 'Completion step' }
  ];

  onComplete() {
    console.log('Stepper completed!');
  }
}
```

## Examples

### Horizontal Stepper

The default horizontal layout is perfect for wide screens and provides a clear visual progression:

```typescript
@Component({
  template: `
    <Stepper
      [steps]="basicSteps"
      [currentStep]="currentStep"
      orientation="horizontal"
      (stepChange)="onStepChange($event)"
      (completed)="onComplete()">

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
  `
})
export class HorizontalStepperExample {
  currentStep = 0;
  
  basicSteps: StepConfig[] = [
    { id: 'step1', label: 'Getting Started', description: 'Welcome step' },
    { id: 'step2', label: 'Configuration', description: 'Setup preferences' },
    { id: 'step3', label: 'Review', description: 'Review choices' },
    { id: 'step4', label: 'Complete', description: 'Finish setup' }
  ];

  onStepChange(event: any) {
    this.currentStep = event.to;
  }

  onComplete() {
    alert('Horizontal stepper completed successfully!');
  }
}
```

### Vertical Stepper

Perfect for mobile devices and narrow layouts:

```typescript
@Component({
  template: `
    <Stepper
      [steps]="basicSteps"
      [currentStep]="currentStep"
      orientation="vertical"
      (stepChange)="onStepChange($event)"
      (completed)="onComplete()">

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
  `
})
export class VerticalStepperExample {
  currentStep = 0;
  
  basicSteps: StepConfig[] = [
    { id: 'step1', label: 'Getting Started', description: 'Welcome step' },
    { id: 'step2', label: 'Configuration', description: 'Setup preferences' },
    { id: 'step3', label: 'Review', description: 'Review choices' },
    { id: 'step4', label: 'Complete', description: 'Finish setup' }
  ];

  onStepChange(event: any) {
    this.currentStep = event.to;
  }

  onComplete() {
    alert('Vertical stepper completed successfully!');
  }
}
```

### Form Wizard with Validation

Advanced form wizard with reactive forms integration and validation:

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="wizardForm">
      <Stepper
        [steps]="wizardSteps"
        [currentStep]="currentStep"
        orientation="horizontal"
        [linear]="true"
        [validateOnNext]="true"
        (stepChange)="onStepChange($event)"
        (completed)="onComplete()">

        <!-- Step 1: Personal Information -->
        <ng-template stepContent stepId="personal">
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
        </ng-template>

        <!-- Step 2: Account Details -->
        <ng-template stepContent stepId="account">
          <div class="space-y-6 p-6">
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
                Password must be at least 6 characters long
              </div>
            </div>
          </div>
        </ng-template>

        <!-- Step 3: Review -->
        <ng-template stepContent stepId="review">
          <div class="space-y-6 p-6">
            <h4 class="text-lg font-medium text-gray-900 dark:text-white">Review & Submit</h4>
            <p class="text-gray-600 dark:text-gray-300">Please review your information before submitting.</p>
            <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Name:</p>
                  <p class="text-gray-900 dark:text-white">
                    {{ wizardForm.get('firstName')?.value }} {{ wizardForm.get('lastName')?.value }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Email:</p>
                  <p class="text-gray-900 dark:text-white">{{ wizardForm.get('email')?.value }}</p>
                </div>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Username:</p>
                <p class="text-gray-900 dark:text-white">{{ wizardForm.get('username')?.value }}</p>
              </div>
            </div>
          </div>
        </ng-template>
      </Stepper>
    </form>
  `
})
export class FormWizardExample {
  currentStep = 0;
  wizardForm: FormGroup;

  wizardSteps: StepConfig[] = [
    { 
      id: 'personal', 
      label: 'Personal Info', 
      description: 'Basic information',
      validator: () => this.validatePersonalInfo()
    },
    { 
      id: 'account', 
      label: 'Account', 
      description: 'Account details',
      validator: () => this.validateAccountInfo()
    },
    { 
      id: 'review', 
      label: 'Review', 
      description: 'Review and submit'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.wizardForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onStepChange(event: any) {
    this.currentStep = event.to;
  }

  onComplete() {
    console.log('Form submitted:', this.wizardForm.value);
    alert('Form wizard completed successfully!');
  }

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
}
```

## Visual Variants

### Default Variant

Standard appearance with clean borders and backgrounds:

```html
<Stepper 
  [steps]="steps" 
  variant="default">
</Stepper>
```

### Minimal Variant

Simplified appearance with minimal visual elements:

```html
<Stepper 
  [steps]="steps" 
  variant="minimal">
</Stepper>
```

### Filled Variant

Bold appearance with filled backgrounds:

```html
<Stepper 
  [steps]="steps" 
  variant="filled">
</Stepper>
```

### Outlined Variant

Emphasis on outlines rather than fills:

```html
<Stepper 
  [steps]="steps" 
  variant="outlined">
</Stepper>
```

## Sizes

### Small

Compact size perfect for dense interfaces:

```html
<Stepper 
  [steps]="steps" 
  size="sm">
</Stepper>
```

### Default

Standard size for most use cases:

```html
<Stepper 
  [steps]="steps" 
  size="default">
</Stepper>
```

### Large

Larger size for better visibility and touch targets:

```html
<Stepper 
  [steps]="steps" 
  size="lg">
</Stepper>
```

## Advanced Features

### Async Validation

Steps can have asynchronous validators for complex validation logic:

```typescript
@Component({
  template: `
    <Stepper 
      [steps]="stepsWithAsyncValidation"
      [validateOnNext]="true"
      (stepError)="onStepError($event)">
      <!-- Step content templates -->
    </Stepper>
  `
})
export class AsyncValidationExample {
  stepsWithAsyncValidation: StepConfig[] = [
    {
      id: 'email-step',
      label: 'Email Verification',
      description: 'Verify your email address',
      validator: () => this.validateEmailAsync()
    }
  ];

  async validateEmailAsync(): Promise<boolean> {
    const email = this.getEmailValue();
    
    try {
      // Simulate API call
      const response = await fetch('/api/validate-email', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      const result = await response.json();
      return result.isValid;
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  }

  onStepError(event: any) {
    console.error('Step validation failed:', event);
    // Handle validation error
  }

  private getEmailValue(): string {
    // Get email value from form or component state
    return '';
  }
}
```

### Optional and Skippable Steps

Some steps can be marked as optional or skippable:

```typescript
export class OptionalStepsExample {
  stepsWithOptional: StepConfig[] = [
    { id: 'required-step', label: 'Required Step', description: 'Must complete' },
    { 
      id: 'optional-step', 
      label: 'Optional Step', 
      description: 'Can be skipped',
      optional: true,
      skippable: true
    },
    { id: 'final-step', label: 'Final Step', description: 'Last step' }
  ];
}
```

### Custom Icons

Add custom icons to steps:

```typescript
export class CustomIconsExample {
  stepsWithIcons: StepConfig[] = [
    { 
      id: 'profile-step', 
      label: 'Profile', 
      icon: '<svg>...</svg>',
      description: 'Set up profile'
    },
    { 
      id: 'settings-step', 
      label: 'Settings', 
      icon: '<svg>...</svg>',
      description: 'Configure settings'
    }
  ];
}
```

### Non-Linear Navigation

Allow users to jump between steps freely:

```html
<Stepper 
  [steps]="steps"
  [linear]="false"
  [allowStepClick]="true">
</Stepper>
```

## Keyboard Navigation

The stepper component features advanced keyboard navigation with intelligent content detection:

### Basic Navigation

- **Tab**: Focus next element or enter step content if forms need completion
- **Shift + Tab**: Focus previous element
- **Arrow Keys**: Navigate between steps (Up/Down for vertical, Left/Right for horizontal)
- **Enter/Space**: Activate step or advance if content is complete
- **Home**: Jump to first step
- **End**: Jump to last step

### Smart Content Detection

The stepper intelligently detects when step content needs completion:

- **Required Fields**: Automatically focuses first empty required field
- **Validation Errors**: Directs attention to fields with validation issues  
- **Action Buttons**: Focuses interactive elements that need user input
- **Form Completion**: Advances automatically when all content is complete

### Content Area Navigation

When focused within step content:

- **Escape**: Return focus to step navigation
- **Tab**: Navigate through form fields normally
- **Enter**: Complete forms or trigger actions within content

### Configuration Options

Control keyboard behavior with these properties:

```html
<Stepper
  [autoAdvanceOnComplete]="true"
  [focusContentOnActivate]="true"
  (stepContentFocused)="onContentFocused($event)">
</Stepper>
```

## Events

### Step Change

Fired when the active step changes:

```typescript
onStepChange(event: { from: number; to: number; step: StepConfig }) {
  console.log(`Changed from step ${event.from} to ${event.to}`);
  console.log('Step config:', event.step);
}
```

### Step Complete

Fired when a step is completed:

```typescript
onStepComplete(event: { step: StepConfig; index: number }) {
  console.log(`Step ${event.index} completed:`, event.step);
}
```

### Step Skip

Fired when a step is skipped:

```typescript
onStepSkip(event: { step: StepConfig; index: number }) {
  console.log(`Step ${event.index} skipped:`, event.step);
}
```

### Step Error

Fired when step validation fails:

```typescript
onStepError(event: { step: StepConfig; index: number; error: any }) {
  console.error(`Step ${event.index} validation failed:`, event.error);
}
```

### Step Content Focused

Fired when step content receives focus:

```typescript
onStepContentFocused(event: { step: StepConfig; index: number }) {
  console.log(`Content focused for step ${event.index}`);
}
```

### Completed

Fired when all steps are completed:

```typescript
onCompleted() {
  console.log('All steps completed successfully!');
}
```

## API Reference

### Stepper Component

#### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `steps` | `StepConfig[]` | `[]` | Array of step configurations |
| `currentStep` | `number` | `0` | Current active step index |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout orientation |
| `variant` | `'default' \| 'minimal' \| 'filled' \| 'outlined'` | `'default'` | Visual variant |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Component size |
| `linear` | `boolean` | `true` | Whether steps must be completed in order |
| `showProgress` | `boolean` | `true` | Show progress bar (horizontal only) |
| `showNavigation` | `boolean` | `true` | Show navigation buttons |
| `allowStepClick` | `boolean` | `true` | Allow clicking on step headers |
| `validateOnNext` | `boolean` | `true` | Validate steps before proceeding |
| `autoAdvanceOnComplete` | `boolean` | `true` | Auto advance when step content is complete |
| `focusContentOnActivate` | `boolean` | `true` | Focus content area when step needs completion |
| `class` | `string` | `''` | Additional CSS classes |
| `ariaLabel` | `string` | `'Step navigation'` | Accessibility label |

#### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `stepChange` | `{ from: number; to: number; step: StepConfig }` | Fired when active step changes |
| `stepComplete` | `{ step: StepConfig; index: number }` | Fired when step is completed |
| `stepSkip` | `{ step: StepConfig; index: number }` | Fired when step is skipped |
| `stepError` | `{ step: StepConfig; index: number; error: any }` | Fired when step validation fails |
| `stepContentFocused` | `{ step: StepConfig; index: number }` | Fired when step content receives focus |
| `completed` | `void` | Fired when all steps are completed |

### StepConfig Interface

```typescript
interface StepConfig {
  /** Unique identifier for the step */
  id: string;
  /** Display label for the step */
  label: string;
  /** Optional description for the step */
  description?: string;
  /** Whether this step is optional */
  optional?: boolean;
  /** Whether this step can be skipped */
  skippable?: boolean;
  /** Custom icon for the step */
  icon?: string;
  /** Whether this step is disabled */
  disabled?: boolean;
  /** Validation function for the step */
  validator?: () => boolean | Promise<boolean>;
}
```

### StepContent Directive

Use the `StepContent` directive to project custom content into steps:

```html
<ng-template stepContent stepId="your-step-id">
  <!-- Your custom content here -->
</ng-template>
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `stepId` | `string` | ID of the step this content belongs to |

## Responsive Design

The stepper component is fully responsive and adapts to different screen sizes:

### Mobile (< 640px)

- Automatically switches to vertical orientation for better usability
- Larger touch targets for easier interaction
- Simplified navigation with clear visual hierarchy

### Tablet (640px - 1024px)

- Maintains chosen orientation with optimized spacing
- Appropriate font sizes and indicator dimensions
- Touch-friendly navigation buttons

### Desktop (> 1024px)

- Full feature set with optimal layout
- Hover states and advanced interactions
- Keyboard navigation with visual feedback

### CSS Classes for Responsive Control

```html
<!-- Force vertical on mobile, horizontal on desktop -->
<Stepper 
  [steps]="steps"
  class="stepper-responsive"
  [orientation]="isDesktop ? 'horizontal' : 'vertical'">
</Stepper>
```

```css
/* Custom responsive styles */
.stepper-responsive {
  @media (max-width: 640px) {
    /* Mobile-specific styles */
  }
  
  @media (min-width: 1024px) {
    /* Desktop-specific styles */
  }
}
```

## Theme Support

The stepper component fully supports both light and dark themes with automatic adaptation:

### Light Theme

- Clean, bright appearance with subtle shadows
- High contrast for excellent readability
- Professional look suitable for business applications

### Dark Theme

- Modern dark appearance that reduces eye strain
- Proper contrast ratios for accessibility
- Seamless integration with dark mode applications

### Custom Theme Variables

```css
:root {
  /* Light theme variables */
  --stepper-bg: #ffffff;
  --stepper-border: #e5e7eb;
  --stepper-text: #111827;
  --stepper-primary: #3b82f6;
  --stepper-success: #10b981;
  --stepper-error: #ef4444;
}

.dark {
  /* Dark theme variables */
  --stepper-bg: #1f2937;
  --stepper-border: #374151;
  --stepper-text: #f9fafb;
  --stepper-primary: #60a5fa;
  --stepper-success: #34d399;
  --stepper-error: #f87171;
}
```

## Accessibility

The stepper component follows WCAG 2.1 AA guidelines and includes:

### Screen Reader Support

- Semantic HTML with proper ARIA attributes
- Live regions for dynamic content announcements
- Descriptive labels and roles for all interactive elements

### Keyboard Accessibility

- Full keyboard accessibility with logical tab order
- Arrow key navigation between steps
- Enter/Space activation with smart content detection
- Escape key to exit content areas

### Focus Management

- Clear visual focus indicators
- Proper focus trapping within step content
- Automatic focus management during navigation

### High Contrast Support

- Sufficient color contrast ratios
- Support for high contrast mode
- Clear visual boundaries and states

### Reduced Motion Support

- Respects user's reduced motion preferences
- Provides alternatives to animated transitions
- Maintains functionality without motion

## Browser Support

The stepper component supports all modern browsers:

- **Chrome**: 79+
- **Firefox**: 72+
- **Safari**: 13+
- **Edge**: 79+
- **Opera**: 66+
- **IE**: 11 (with polyfills)

### Polyfills Required for IE11

```typescript
// Add to polyfills.ts
import 'core-js/es/array';
import 'core-js/es/map';
import 'core-js/es/set';
```

## Best Practices

### Performance

- Use `OnPush` change detection strategy
- Implement `TrackBy` functions for step lists
- Lazy load step content when possible

### Accessibility Guidelines

- Always provide meaningful step labels and descriptions
- Test with screen readers
- Ensure proper keyboard navigation
- Use sufficient color contrast

### User Experience

- Keep step counts reasonable (3-7 steps ideal)
- Provide clear progress indicators
- Include validation feedback
- Allow users to review and edit previous steps

### Mobile Optimization

- Use vertical orientation on small screens
- Provide large touch targets
- Test on actual devices
- Consider swipe gestures for navigation

## Troubleshooting

### Common Issues

**Steps not displaying correctly:**

- Ensure step IDs are unique
- Check that StepContent stepId matches step configuration
- Verify template syntax is correct

**Keyboard navigation not working:**

- Check that focus management is not being overridden
- Ensure proper tabindex values
- Test with different keyboard configurations

**Validation not triggering:**

- Verify validator functions return boolean or Promise&lt;boolean&gt;
- Check that validateOnNext is enabled
- Ensure form controls are properly configured

**Content not projecting:**

- Confirm StepContent directive is imported
- Check stepId attribute matches step configuration
- Verify template syntax and ng-template usage

### Debug Mode

Enable debug logging to troubleshoot issues:

```typescript
// Add to component constructor
if (!environment.production) {
  console.log('Stepper debug mode enabled');
}
```

### Performance Monitoring

Monitor stepper performance with these techniques:

```typescript
// Track step change performance
onStepChange(event: any) {
  const startTime = performance.now();
  // Handle step change
  const endTime = performance.now();
  console.log(`Step change took ${endTime - startTime}ms`);
}
```

## Contributing

We welcome contributions! Please see our [contributing guide](../CONTRIBUTING.md) for details on:

- Setting up the development environment
- Running tests and linting
- Submitting pull requests
- Code style guidelines

## License

MIT License - see [LICENSE](../LICENSE) file for details.

---

*For more examples and advanced usage, check out our [demo application](https://angular-superui-demo.vercel.app/stepper) and [GitHub repository](https://github.com/bhaimicrosoft/angular-superui).*
