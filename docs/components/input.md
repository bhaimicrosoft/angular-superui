# Input Component ⚡ - Advanced Edition

The most comprehensive and powerful input component for Angular applications with **next-generation features** including intelligent masking, real-time validation, input sanitization, and seamless form integration.

## 🌟 **NEW ENHANCED FEATURES**

> **🚀 BREAKTHROUGH UPDATE**: Our Input component now includes enterprise-grade features that make it the most advanced input solution available!

### ✨ **Advanced Capabilities**

- 🎭 **Smart Input Masking** - Phone, Credit Card, SSN, Currency, Date, Time, and Custom patterns
- 🛡️ **Input Sanitization** - XSS protection with configurable sanitization rules
- ✅ **Real-time Validation** - Custom validators with instant feedback and form synchronization
- 📱 **Mobile Excellence** - Optimized virtual keyboards and touch-friendly interactions
- ⚡ **Performance Optimized** - Smart caching, debouncing, and memory-efficient operations
- 🎯 **4 Beautiful Variants** - Default, Filled, Flushed, and State-aware designs
- 📏 **Multiple Sizes** - Small, Medium, Large with perfect scaling
- 🎨 **Visual States** - Success, Error, Warning, and Disabled with stunning feedback
- ♿ **Accessibility Excellence** - WCAG 2.1 AA+ compliant with comprehensive ARIA support
- 🔧 **TypeScript Perfect** - Full type safety with advanced interfaces

### 🎯 **Core Features**

- ✅ **Reactive Forms Integration** - Seamless Angular Forms support with NgControl
- 🎨 **Beautiful Design System** - Consistent styling with Tailwind CSS integration
- 🔍 **Advanced Validation** - Built-in and custom validators with real-time feedback
- 📊 **Form Synchronization** - Perfect sync between visual validation and form state

## Installation

Initialize Angular SuperUI in your project:

```bash
ngsui init
```

Add the Input component:

```bash
ngsui add input
```

## Usage

Import the Input component in your Angular component:

```typescript
import { Component } from '@angular/core';
import { InputComponent } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [InputComponent],
  template: `
    <InputComponent placeholder="Enter your name" />
  `
})
export class ExampleComponent {}
```

## Installation

Initialize Angular SuperUI in your project:

```bash
ngsui init
```

Add the Input component:

```bash
ngsui add input
```

## Quick Start

Import the Input component in your Angular component:

```typescript
import { Component } from '@angular/core';
import { InputComponent } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [InputComponent],
  template: `
    <InputComponent placeholder="Experience the magic ✨" />
  `
})
export class ExampleComponent {}
```

## 🎭 **NEW: Smart Input Masking**

> **Revolutionary masking system** with intelligent formatting and validation

### 📞 Phone Number Masking

```typescript
import { Component, signal } from '@angular/core';
import { MaskConfig } from 'angular-superui';

@Component({
  template: `
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
          <strong>Formatted:</strong> {{ phoneValue() }}
        </p>
      </div>
    }
  `
})
export class PhoneMaskingExample {
  phoneValue = signal('');

  phoneMask: MaskConfig = {
    type: 'phone',
    stripMask: true
  };

  phoneValidator = (value: string): string | null => {
    if (!value) return 'Phone number is required';
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length !== 10) return 'Phone number must be 10 digits';
    return null;
  };
}
```

### 💳 Credit Card Masking with Luhn Validation

```typescript
@Component({
  template: `
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
          <strong>Secured:</strong> {{ creditCardValue() }}
        </p>
      </div>
    }
  `
})
export class CreditCardExample {
  creditCardValue = signal('');

  creditCardMask: MaskConfig = {
    type: 'creditCard',
    stripMask: true
  };

  creditCardValidator = (value: string): string | null => {
    if (!value) return 'Credit card number is required';
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length < 13 || cleaned.length > 19) return 'Invalid card number length';

    // Luhn algorithm validation
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
}
```

### 💰 Currency Masking

```typescript
@Component({
  template: `
    <InputComponent
      placeholder="Enter amount"
      [(ngModel)]="currencyValue"
      [mask]="currencyMask"
      [customValidator]="currencyValidator"
      [validateOnChange]="true"
      inputMode="decimal"
      class="w-full"
    />
  `
})
export class CurrencyExample {
  currencyValue = signal('');

  currencyMask: MaskConfig = {
    type: 'currency',
    stripMask: false
  };

  currencyValidator = (value: string): string | null => {
    if (!value) return 'Amount is required';
    const cleaned = value.replace(/[^\d.]/g, '');
    const amount = parseFloat(cleaned);
    if (isNaN(amount) || amount <= 0) return 'Please enter a valid amount';
    if (amount > 10000) return 'Amount cannot exceed $10,000';
    return null;
  };
}
```

### 🎭 Custom Pattern Masking

```typescript
@Component({
  template: `
    <InputComponent
      placeholder="123-ABC-xyz"
      [(ngModel)]="customMaskValue"
      [mask]="customMask"
      class="w-full"
    />
  `
})
export class CustomMaskExample {
  customMaskValue = signal('');

  customMask: MaskConfig = {
    type: 'custom',
    pattern: '000-AAA-***',
    placeholder: '123-ABC-xyz',
    stripMask: false
  };
}
```

## 🛡️ **NEW: Advanced Input Sanitization**

> **Enterprise-grade security** with configurable XSS protection

### Basic Sanitization

```typescript
import { SanitizationConfig } from 'angular-superui';

@Component({
  template: `
    <InputComponent
      placeholder="Try typing HTML: <script>alert('test')</script>"
      [(ngModel)]="sanitizedValue"
      [sanitization]="basicSanitization"
      helpText="HTML tags and scripts will be automatically removed"
      class="w-full"
    />
  `
})
export class SanitizationExample {
  sanitizedValue = signal('');

  basicSanitization: SanitizationConfig = {
    allowHTML: false,
    allowScripts: false,
    maxLength: 100
  };
}
```

### Strict Sanitization with Custom Rules

```typescript
@Component({
  template: `
    <InputComponent
      placeholder="Only safe characters allowed"
      [(ngModel)]="strictValue"
      [sanitization]="strictSanitization"
      [customValidator]="emailValidator"
      [validateOnChange]="true"
      helpText="Special characters will be filtered out"
      type="email"
      class="w-full"
    />
  `
})
export class StrictSanitizationExample {
  strictValue = signal('');

  strictSanitization: SanitizationConfig = {
    allowHTML: false,
    allowScripts: false,
    allowedCharacters: /[a-zA-Z0-9\s@.-]/,
    maxLength: 50,
    customSanitizer: (value: string) => {
      return value
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .replace(/<script/gi, '&lt;script');
    }
  };

  emailValidator = (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return null;
  };
}
```

## ✅ **NEW: Advanced Form Integration with Real-time Validation**

> **Perfect synchronization** between visual validation and reactive forms

```typescript
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-advanced-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  template: `
    <form [formGroup]="enhancedForm" (ngSubmit)="onFormSubmit()" class="space-y-6">
      <!-- Email with real-time validation -->
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

      <!-- Password with strength validation -->
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

      <!-- Credit Card with Luhn validation -->
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

      <!-- Amount with currency validation -->
      <div>
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

      <!-- Form Status Display -->
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
  `
})
export class AdvancedFormExample {
  enhancedForm: FormGroup;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.enhancedForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      creditCard: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    });
  }

  // Mask configurations
  phoneMask: MaskConfig = { type: 'phone', stripMask: true };
  creditCardMask: MaskConfig = { type: 'creditCard', stripMask: true };
  currencyMask: MaskConfig = { type: 'currency', stripMask: false };

  strictSanitization: SanitizationConfig = {
    allowHTML: false,
    allowScripts: false,
    allowedCharacters: /[a-zA-Z0-9\s@.-]/,
    maxLength: 50
  };

  // Input change handlers that sync validation with form
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

  // Validators
  emailValidator = (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return null;
  };

  passwordValidator = (value: string): string | null => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])/.test(value)) return 'Password must contain lowercase letter';
    if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain uppercase letter';
    if (!/(?=.*\d)/.test(value)) return 'Password must contain a number';
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
    if (cleaned.length < 13 || cleaned.length > 19) return 'Invalid card number length';

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

  clearAllInputs(): void {
    this.enhancedForm.reset();
  }

  onFormSubmit(): void {
    if (this.enhancedForm.valid) {
      console.log('Form submitted successfully:', this.enhancedForm.value);
      // Handle form submission
    }
  }
}
```

## 🎨 **Beautiful Variants & States**

### Input Variants

```typescript
@Component({
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Default Variant -->
      <div class="space-y-4">
        <h3 class="font-semibold">Default</h3>
        <InputComponent
          placeholder="Default input"
          variant="default"
          size="md"
          [(ngModel)]="defaultValue"
        />
        <InputComponent
          placeholder="Large default input"
          variant="default"
          size="lg"
          [(ngModel)]="defaultLargeValue"
        />
        <InputComponent
          placeholder="Small default input"
          variant="default"
          size="sm"
          [(ngModel)]="defaultSmallValue"
        />
      </div>

      <!-- Filled Variant -->
      <div class="space-y-4">
        <h3 class="font-semibold">Filled - Soft Background</h3>
        <InputComponent
          placeholder="Filled input with background"
          variant="filled"
          size="md"
          [(ngModel)]="filledValue"
        />
        <InputComponent
          placeholder="Large filled input for emphasis"
          variant="filled"
          size="lg"
          [(ngModel)]="filledLargeValue"
        />
        <InputComponent
          placeholder="Compact filled input"
          variant="filled"
          size="sm"
          [(ngModel)]="filledSmallValue"
        />
      </div>

      <!-- Flushed Variant -->
      <div class="space-y-4">
        <h3 class="font-semibold">Flushed - Minimal Clean</h3>
        <InputComponent
          placeholder="Clean flushed input"
          variant="flushed"
          size="md"
          [(ngModel)]="flushedValue"
        />
        <InputComponent
          placeholder="Large minimal input"
          variant="flushed"
          size="lg"
          [(ngModel)]="flushedLargeValue"
        />
        <InputComponent
          placeholder="Compact clean input"
          variant="flushed"
          size="sm"
          [(ngModel)]="flushedSmallValue"
        />
      </div>
    </div>
  `
})
export class VariantsExample {
  defaultValue = signal('');
  defaultLargeValue = signal('');
  defaultSmallValue = signal('');
  filledValue = signal('');
  filledLargeValue = signal('');
  filledSmallValue = signal('');
  flushedValue = signal('');
  flushedLargeValue = signal('');
  flushedSmallValue = signal('');
}
```

### Visual States with Feedback

```typescript
@Component({
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-6">
        <!-- Success State -->
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
            [(ngModel)]="successValue"
          />
          <p class="text-xs text-green-600 dark:text-green-400 mt-1">Input is valid and accepted</p>
        </div>

        <!-- Error State -->
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
            [(ngModel)]="errorStateValue"
          />
          <p class="text-xs text-red-600 dark:text-red-400 mt-1">Please check your input</p>
        </div>
      </div>

      <div class="space-y-6">
        <!-- Warning State -->
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
            [(ngModel)]="warningStateValue"
          />
          <p class="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Please review this field</p>
        </div>

        <!-- Disabled State -->
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
  `
})
export class StatesExample {
  successValue = signal('');
  errorStateValue = signal('');
  warningStateValue = signal('');
}
```

## 📱 **Mobile Excellence**

> **Perfect mobile experience** with optimized virtual keyboards and touch interactions

```typescript
@Component({
  template: `
    <div class="space-y-6">
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

      <!-- Mobile Features Info -->
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
  `
})
export class MobileOptimizationExample {
  mobilePhoneValue = signal('');
  mobileCardValue = signal('');

  phoneMask: MaskConfig = { type: 'phone', stripMask: true };
  creditCardMask: MaskConfig = { type: 'creditCard', stripMask: true };
}
```

## ⚡ **Performance Features**

> **Blazing fast** with intelligent optimizations

```typescript
@Component({
  template: `
    <div class="space-y-6">
      <!-- Debounced Search -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Search with Debouncing
        </label>
        <InputComponent
          placeholder="Search products... (300ms debounce)"
          [debounceTime]="300"
          (valueChange)="onSearch($event)"
          class="w-full"
        />
      </div>

      <!-- Performance Info -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            ⚡
          </div>
          <h4 class="font-bold text-gray-900 dark:text-white mb-2">Debounced Input</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">Configurable debouncing prevents excessive API calls</p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            🧠
          </div>
          <h4 class="font-bold text-gray-900 dark:text-white mb-2">Smart Caching</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">Intelligent caching of validation results and masks</p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            💝
          </div>
          <h4 class="font-bold text-gray-900 dark:text-white mb-2">Memory Efficient</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">Optimized memory usage with signal-based reactivity</p>
        </div>
      </div>
    </div>
  `
})
export class PerformanceExample {
  onSearch(query: string): void {
    if (query.length >= 2) {
      console.log('Searching for:', query);
      // Debounced search implementation
    }
  }
}
```

## 📚 **Complete API Reference**

### Core Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'filled' \| 'flushed'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the input |
| `state` | `'success' \| 'error' \| 'warning'` | `undefined` | Visual validation state |
| `type` | `string` | `'text'` | HTML input type |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `value` | `string` | `''` | Input value (two-way binding) |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `readonly` | `boolean` | `false` | Whether the input is read-only |
| `required` | `boolean` | `false` | Whether the field is required |

### **NEW: Enhanced Features**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mask` | `MaskConfig` | `undefined` | **NEW:** Smart masking configuration |
| `sanitization` | `SanitizationConfig` | `undefined` | **NEW:** Input sanitization settings |
| `customValidator` | `(value: string) => string \| null` | `undefined` | **NEW:** Real-time validation function |
| `validateOnChange` | `boolean` | `false` | **NEW:** Validate input on every change |
| `validateOnBlur` | `boolean` | `false` | **NEW:** Validate input when focus is lost |
| `helpText` | `string` | `undefined` | **NEW:** Helper text below input |
| `inputMode` | `string` | `undefined` | **NEW:** Mobile keyboard optimization |
| `autoComplete` | `string` | `undefined` | **NEW:** Browser autocomplete hint |
| `className` | `string` | `undefined` | **NEW:** Additional CSS classes |

### **NEW: Events**

| Event | Type | Description |
|-------|------|-------------|
| `inputChange` | `EventEmitter<string>` | **NEW:** Emitted when input value changes with debouncing |
| `validationChange` | `EventEmitter<string \| null>` | **NEW:** Emitted when validation state changes |
| `maskChange` | `EventEmitter<string>` | **NEW:** Emitted when masked value changes |

### **NEW: Mask Configuration Interface**

```typescript
interface MaskConfig {
  type: 'phone' | 'creditCard' | 'ssn' | 'currency' | 'postalCode' | 'date' | 'time' | 'custom';
  stripMask?: boolean;           // Remove mask characters from output
  pattern?: string;              // Custom pattern (for type: 'custom')
  placeholder?: string;          // Custom placeholder
  allowIncomplete?: boolean;     // Allow incomplete masked values
}
```

### **NEW: Sanitization Configuration Interface**

```typescript
interface SanitizationConfig {
  allowHTML?: boolean;                    // Allow HTML tags
  allowScripts?: boolean;                 // Allow script tags
  allowedCharacters?: RegExp;             // Allowed character pattern
  maxLength?: number;                     // Maximum input length
  customSanitizer?: (value: string) => string; // Custom sanitization function
}
```

### **NEW: Validation Function Type**

```typescript
type ValidatorFunction = (value: string) => string | null;
// Returns null for valid input, error message string for invalid input
```

## 🎯 **Production Examples**

### Enterprise Login Form

```typescript
@Component({
  selector: 'app-enterprise-login',
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6 max-w-md mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
        <p class="text-gray-600 dark:text-gray-400">Sign in to your account</p>
      </div>

      <div>
        <InputComponent 
          formControlName="email"
          type="email"
          placeholder="Enter your email"
          [sanitization]="emailSanitization"
          [customValidator]="emailValidator"
          [validateOnChange]="true"
          (inputChange)="onEmailChange($event)"
          inputMode="email"
          autoComplete="email"
          size="lg"
          variant="filled"
          class="w-full"
        />
      </div>
      
      <div>
        <InputComponent 
          formControlName="password"
          type="password"
          placeholder="Enter your password"
          [customValidator]="passwordValidator"
          [validateOnBlur]="true"
          (inputChange)="onPasswordChange($event)"
          autoComplete="current-password"
          size="lg"
          variant="filled"
          class="w-full"
        />
      </div>
      
      <button 
        type="submit" 
        [disabled]="loginForm.invalid || isLoading"
        class="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {{ isLoading ? 'Signing in...' : 'Sign In' }}
      </button>

      <div class="text-center">
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Form Status: 
          <span [class]="loginForm.valid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
            {{ loginForm.valid ? 'Ready ✓' : 'Please complete all fields' }}
          </span>
        </div>
      </div>
    </form>
  `
})
export class EnterpriseLoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  emailSanitization: SanitizationConfig = {
    allowHTML: false,
    allowScripts: false,
    allowedCharacters: /[a-zA-Z0-9@._-]/,
    maxLength: 100
  };

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  emailValidator = (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return null;
  };

  passwordValidator = (value: string): string | null => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    return null;
  };

  onEmailChange(value: string): void {
    const control = this.loginForm.get('email');
    const error = this.emailValidator(value);
    control?.setErrors(error ? { customValidation: error } : null);
    this.cdr.detectChanges();
  }

  onPasswordChange(value: string): void {
    const control = this.loginForm.get('password');
    const error = this.passwordValidator(value);
    control?.setErrors(error ? { customValidation: error } : null);
    this.cdr.detectChanges();
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.isLoading = true;
      try {
        // Simulate login
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Login successful:', this.loginForm.value);
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
```

### Payment Form with Advanced Masking

```typescript
@Component({
  selector: 'app-payment-form',
  template: `
    <form [formGroup]="paymentForm" (ngSubmit)="onSubmit()" class="space-y-6 max-w-lg mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Payment Information</h2>
        <p class="text-gray-600 dark:text-gray-400">Enter your payment details securely</p>
      </div>

      <!-- Credit Card Number -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Card Number *
        </label>
        <InputComponent
          formControlName="cardNumber"
          placeholder="1234 5678 9012 3456"
          [mask]="creditCardMask"
          [customValidator]="creditCardValidator"
          [validateOnBlur]="true"
          (inputChange)="onCardNumberChange($event)"
          inputMode="numeric"
          autoComplete="cc-number"
          size="lg"
          variant="default"
          class="w-full"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <!-- Expiry Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Expiry Date *
          </label>
          <InputComponent
            formControlName="expiryDate"
            placeholder="MM/YY"
            [mask]="expiryMask"
            [customValidator]="expiryValidator"
            [validateOnBlur]="true"
            (inputChange)="onExpiryChange($event)"
            inputMode="numeric"
            autoComplete="cc-exp"
            size="lg"
            class="w-full"
          />
        </div>

        <!-- CVV -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            CVV *
          </label>
          <InputComponent
            formControlName="cvv"
            placeholder="123"
            type="password"
            [customValidator]="cvvValidator"
            [validateOnBlur]="true"
            (inputChange)="onCvvChange($event)"
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength="4"
            size="lg"
            class="w-full"
          />
        </div>
      </div>

      <!-- Amount -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Amount *
        </label>
        <InputComponent
          formControlName="amount"
          placeholder="$0.00"
          [mask]="currencyMask"
          [customValidator]="amountValidator"
          [validateOnChange]="true"
          (inputChange)="onAmountChange($event)"
          inputMode="decimal"
          size="lg"
          variant="filled"
          helpText="Minimum amount: $1.00"
          class="w-full"
        />
      </div>

      <!-- Security Notice -->
      <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <div class="flex items-center gap-2">
          <div class="w-5 h-5 text-green-600 dark:text-green-400">🔒</div>
          <p class="text-sm text-green-800 dark:text-green-200">
            Your payment information is encrypted and secure
          </p>
        </div>
      </div>

      <!-- Submit Button -->
      <button 
        type="submit" 
        [disabled]="paymentForm.invalid || isProcessing"
        class="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {{ isProcessing ? 'Processing Payment...' : 'Process Payment' }}
      </button>

      <!-- Form Status -->
      <div class="text-center">
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Form Status: 
          <span [class]="paymentForm.valid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
            {{ paymentForm.valid ? 'Ready to Process ✓' : 'Please complete all fields' }}
          </span>
        </div>
      </div>
    </form>
  `
})
export class PaymentFormComponent {
  paymentForm: FormGroup;
  isProcessing = false;

  // Mask configurations
  creditCardMask: MaskConfig = { type: 'creditCard', stripMask: true };
  expiryMask: MaskConfig = { type: 'custom', pattern: '00/00', stripMask: false };
  currencyMask: MaskConfig = { type: 'currency', stripMask: false };

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    });
  }

  // Validators
  creditCardValidator = (value: string): string | null => {
    if (!value) return 'Card number is required';
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length < 13 || cleaned.length > 19) return 'Invalid card number length';

    // Luhn algorithm
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

    if (sum % 10 !== 0) return 'Invalid card number';
    return null;
  };

  expiryValidator = (value: string): string | null => {
    if (!value) return 'Expiry date is required';
    const [month, year] = value.split('/');
    if (!month || !year) return 'Invalid expiry format';
    
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);

    if (expMonth < 1 || expMonth > 12) return 'Invalid month';
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return 'Card has expired';
    }
    return null;
  };

  cvvValidator = (value: string): string | null => {
    if (!value) return 'CVV is required';
    if (!/^\d{3,4}$/.test(value)) return 'CVV must be 3-4 digits';
    return null;
  };

  amountValidator = (value: string): string | null => {
    if (!value) return 'Amount is required';
    const cleaned = value.replace(/[^\d.]/g, '');
    const amount = parseFloat(cleaned);
    if (isNaN(amount) || amount < 1) return 'Minimum amount is $1.00';
    if (amount > 10000) return 'Maximum amount is $10,000';
    return null;
  };

  // Change handlers
  onCardNumberChange(value: string): void {
    const control = this.paymentForm.get('cardNumber');
    const error = this.creditCardValidator(value);
    control?.setErrors(error ? { customValidation: error } : null);
    this.cdr.detectChanges();
  }

  onExpiryChange(value: string): void {
    const control = this.paymentForm.get('expiryDate');
    const error = this.expiryValidator(value);
    control?.setErrors(error ? { customValidation: error } : null);
    this.cdr.detectChanges();
  }

  onCvvChange(value: string): void {
    const control = this.paymentForm.get('cvv');
    const error = this.cvvValidator(value);
    control?.setErrors(error ? { customValidation: error } : null);
    this.cdr.detectChanges();
  }

  onAmountChange(value: string): void {
    const control = this.paymentForm.get('amount');
    const error = this.amountValidator(value);
    control?.setErrors(error ? { customValidation: error } : null);
    this.cdr.detectChanges();
  }

  async onSubmit(): Promise<void> {
    if (this.paymentForm.valid) {
      this.isProcessing = true;
      try {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log('Payment processed successfully:', this.paymentForm.value);
        alert('Payment processed successfully!');
      } catch (error) {
        console.error('Payment failed:', error);
        alert('Payment failed. Please try again.');
      } finally {
        this.isProcessing = false;
      }
    }
  }
}
```

## 🎨 **Advanced Styling & Customization**

### CSS Custom Properties

The input respects CSS custom properties for comprehensive theming:

```css
:root {
  /* Base input styling */
  --input-bg: theme(colors.white);
  --input-border: theme(colors.gray.300);
  --input-border-focus: theme(colors.blue.500);
  --input-text: theme(colors.gray.900);
  --input-placeholder: theme(colors.gray.500);
  --input-radius: theme(borderRadius.md);
  
  /* State colors */
  --input-success: theme(colors.green.500);
  --input-error: theme(colors.red.500);
  --input-warning: theme(colors.yellow.500);
  
  /* Variant specific */
  --input-filled-bg: theme(colors.gray.50);
  --input-flushed-border: theme(colors.gray.300);
}

[data-theme="dark"] {
  --input-bg: theme(colors.gray.900);
  --input-border: theme(colors.gray.600);
  --input-border-focus: theme(colors.blue.400);
  --input-text: theme(colors.gray.100);
  --input-placeholder: theme(colors.gray.400);
  --input-filled-bg: theme(colors.gray.800);
  --input-flushed-border: theme(colors.gray.600);
}
```

### Custom Component Classes

```typescript
@Component({
  template: `
    <!-- Custom styled inputs -->
    <InputComponent 
      class="w-full max-w-md mx-auto shadow-xl border-2 border-purple-300 focus-within:border-purple-500"
      placeholder="Custom purple theme"
      variant="filled"
    />
    
    <!-- Gradient border input -->
    <InputComponent 
      class="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-transparent bg-clip-padding focus-within:from-blue-100 focus-within:to-purple-100"
      placeholder="Gradient background"
    />
    
    <!-- Glass morphism effect -->
    <InputComponent 
      class="backdrop-blur-lg bg-white/30 border border-white/20 shadow-xl"
      placeholder="Glass morphism effect"
      variant="default"
    />
  `
})
```

## 🏆 **Best Practices & Guidelines**

### 🔐 **Security Best Practices**

```typescript
// 1. Always sanitize user input
const securitySanitization: SanitizationConfig = {
  allowHTML: false,
  allowScripts: false,
  allowedCharacters: /[a-zA-Z0-9\s@._-]/,
  maxLength: 255,
  customSanitizer: (value: string) => {
    return value
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .replace(/<script/gi, '&lt;script')
      .trim();
  }
};

// 2. Use appropriate input types for mobile optimization
<InputComponent 
  type="email" 
  inputMode="email" 
  autoComplete="email" 
/>

// 3. Implement proper validation
const strongPasswordValidator = (value: string): string | null => {
  if (!value) return 'Password is required';
  if (value.length < 12) return 'Password must be at least 12 characters';
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value)) {
    return 'Password must contain uppercase, lowercase, number, and special character';
  }
  return null;
};
```

### ♿ **Accessibility Excellence**

```typescript
@Component({
  template: `
    <!-- Perfect accessibility setup -->
    <div class="space-y-4">
      <InputComponent 
        id="user-email"
        type="email"
        placeholder="Enter your email address"
        ariaLabel="Email address for account registration"
        ariaDescription="We'll use this email to send account verification"
        [required]="true"
        autoComplete="email"
        class="w-full"
      />
      
      <!-- Screen reader announcements -->
      <InputComponent 
        placeholder="Search products"
        ariaLabel="Search for products in our catalog"
        role="searchbox"
        ariaLive="polite"
        [debounceTime]="300"
        (valueChange)="announceSearchResults($event)"
      />
    </div>
  `
})
export class AccessibilityExample {
  announceSearchResults(query: string): void {
    if (query.length >= 2) {
      // Announce results to screen readers
      const announcement = `Searching for ${query}. Results will appear below.`;
      // Use ARIA live region for announcements
    }
  }
}
```

### 🚀 **Performance Optimization**

```typescript
@Component({
  template: `
    <!-- Optimized for performance -->
    <InputComponent 
      placeholder="Debounced search"
      [debounceTime]="500"
      (valueChange)="performSearch($event)"
      class="w-full"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceOptimizedComponent {
  private searchCache = new Map<string, any>();

  performSearch(query: string): void {
    // Check cache first
    if (this.searchCache.has(query)) {
      this.handleSearchResults(this.searchCache.get(query));
      return;
    }

    // Perform actual search with caching
    this.searchService.search(query).subscribe(results => {
      this.searchCache.set(query, results);
      this.handleSearchResults(results);
    });
  }

  private handleSearchResults(results: any): void {
    // Handle results
  }
}
```

### 📱 **Mobile UX Guidelines**

```typescript
@Component({
  template: `
    <!-- Mobile-optimized form -->
    <form class="space-y-6">
      <!-- Phone number with tel keyboard -->
      <InputComponent 
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="(555) 123-4567"
        [mask]="phoneMask"
        class="w-full text-lg" <!-- Larger text for mobile -->
      />
      
      <!-- Email with email keyboard -->
      <InputComponent 
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@example.com"
        class="w-full text-lg"
      />
      
      <!-- Numeric input with numeric keyboard -->
      <InputComponent 
        type="number"
        inputMode="numeric"
        placeholder="Enter amount"
        class="w-full text-lg"
      />
      
      <!-- Large touch targets for mobile -->
      <button class="w-full py-4 text-lg bg-blue-600 text-white rounded-xl">
        Submit
      </button>
    </form>
  `
})
```

## 🌟 **What Makes Our Input Special**

### 🚀 **Revolutionary Features**

> **Why choose Angular SuperUI Input over other components?**

1. **🎭 Smart Masking**: Industry-leading input masking with 8+ predefined patterns
2. **🛡️ XSS Protection**: Built-in sanitization prevents security vulnerabilities
3. **⚡ Real-time Validation**: Instant feedback with perfect form synchronization
4. **📱 Mobile Excellence**: Optimized virtual keyboards and touch interactions
5. **♿ A11y Perfect**: WCAG 2.1 AA+ compliant with comprehensive ARIA support
6. **🎨 Beautiful Design**: 3 stunning variants with perfect visual states
7. **⚡ Performance**: Smart caching, debouncing, and memory efficiency
8. **🔧 TypeScript**: Full type safety with advanced interfaces

### 💎 **Enterprise Ready**

```typescript
// Enterprise-grade features out of the box
const enterpriseInput = {
  security: 'XSS protection + input sanitization',
  validation: 'Real-time validation with form sync',
  accessibility: 'WCAG 2.1 AA+ compliant',
  mobile: 'Optimized virtual keyboards',
  performance: 'Smart caching and debouncing',
  design: 'Professional design system',
  maintenance: 'TypeScript + comprehensive docs'
};
```

## 🌐 **Browser Support**

- ✅ **Chrome 90+** - Full feature support
- ✅ **Firefox 88+** - Full feature support  
- ✅ **Safari 14+** - Full feature support
- ✅ **Edge 90+** - Full feature support
- ✅ **Mobile browsers** - Optimized experience (iOS Safari, Chrome Mobile)
- ✅ **Progressive Enhancement** - Graceful degradation for older browsers

## 🔗 **Related Components**

Enhance your forms with our complete component ecosystem:

- [**Button**](./button.md) - For form submission and actions
- [**Checkbox**](./checkbox.md) - For boolean selection
- [**Form**](./form.md) - For form layout and validation
- [**Dialog**](./dialog.md) - For modal forms and confirmations

---

<div align="center">

**🎉 Ready to revolutionize your forms?**

Built with ❤️ by the Angular SuperUI team

[**📚 Explore More Components**](../README.md) | [**🐛 Report Issues**](https://github.com/angular-superui/angular-superui/issues) | [**💬 Join Discord**](https://discord.gg/angular-superui)

</div>
