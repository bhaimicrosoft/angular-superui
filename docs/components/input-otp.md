# Input OTP

A specialized input component for One-Time Password (OTP) entry. Provides an intuitive interface for entering verification codes, PINs, and other sequential numeric or alphanumeric codes.

## Features

- **Flexible Length**: Support for 4-8 digit codes
- **Auto-Focus**: Automatic focus management between input fields
- **Paste Support**: Smart paste handling for complete codes
- **Validation**: Built-in validation with customizable patterns
- **Accessibility**: Full keyboard navigation and screen reader support
- **Customizable**: Various styling options and input types
- **Form Integration**: Works seamlessly with Angular reactive forms

## Installation

The Input OTP component is part of the Angular SuperUI library:

```bash
npx ngsui-cli add input-otp
```

## Basic Usage

### Simple OTP Input

```typescript
import { Component } from '@angular/core';
import { InputOTP } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [InputOTP],
  template: `
    <InputOTP
      [length]="6"
      [(value)]="otpCode"
      placeholder="Enter verification code"
      (complete)="onOTPComplete($event)"
    />
  `
})
export class ExampleComponent {
  otpCode: string = '';
  
  onOTPComplete(code: string): void {
    console.log('OTP entered:', code);
    // Handle OTP verification
  }
}
```

## Variants

### Different Lengths

```html
<!-- 4-digit PIN -->
<InputOTP [length]="4" [(value)]="pin" />

<!-- 6-digit verification code -->
<InputOTP [length]="6" [(value)]="verificationCode" />

<!-- 8-digit code -->
<InputOTP [length]="8" [(value)]="longCode" />
```

### Input Types

```html
<!-- Numeric only -->
<InputOTP [length]="6" type="number" [(value)]="numericCode" />

<!-- Alphanumeric -->
<InputOTP [length]="6" type="text" [(value)]="alphanumericCode" />
```

## Form Integration

### Reactive Forms

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="verificationForm" (ngSubmit)="onSubmit()">
      <InputOTP
        formControlName="otpCode"
        [length]="6"
        [required]="true"
      />
      <button type="submit" [disabled]="verificationForm.invalid">
        Verify Code
      </button>
    </form>
  `
})
export class VerificationComponent {
  verificationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.verificationForm = this.fb.group({
      otpCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  onSubmit(): void {
    if (this.verificationForm.valid) {
      const code = this.verificationForm.get('otpCode')?.value;
      console.log('Verification code:', code);
    }
  }
}
```

## API Reference

### InputOTP Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `length` | `number` | `6` | Number of input fields (4-8) |
| `value` | `string` | `''` | Current OTP value |
| `type` | `'text' \| 'number'` | `'number'` | Input type constraint |
| `placeholder` | `string` | `'●'` | Placeholder character for empty fields |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `required` | `boolean` | `false` | Whether the input is required |
| `autoFocus` | `boolean` | `true` | Auto-focus first field on mount |
| `className` | `string` | `undefined` | Additional CSS classes |

### InputOTP Events

| Event | Type | Description |
|-------|------|-------------|
| `valueChange` | `EventEmitter<string>` | Emitted when value changes |
| `complete` | `EventEmitter<string>` | Emitted when all fields are filled |
| `paste` | `EventEmitter<string>` | Emitted when content is pasted |

## Examples

### Two-Factor Authentication

```typescript
@Component({
  template: `
    <div class="max-w-md mx-auto p-6">
      <h2 class="text-2xl font-bold mb-4">Enter Verification Code</h2>
      <p class="text-gray-600 mb-6">
        We've sent a 6-digit code to your phone number ending in ***{{phoneEnding}}
      </p>
      
      <InputOTP
        [length]="6"
        [(value)]="verificationCode"
        [disabled]="isVerifying"
        (complete)="onCodeComplete($event)"
        className="mb-4"
      />
      
      <div *ngIf="error" class="text-red-500 text-sm mb-4">
        {{ error }}
      </div>
      
      <div class="flex space-x-4">
        <button 
          (click)="verifyCode()" 
          [disabled]="!isCodeComplete || isVerifying"
          class="flex-1 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {{ isVerifying ? 'Verifying...' : 'Verify Code' }}
        </button>
        <button 
          (click)="resendCode()" 
          [disabled]="isVerifying"
          class="px-4 py-2 border border-gray-300 rounded"
        >
          Resend
        </button>
      </div>
    </div>
  `
})
export class TwoFactorComponent {
  verificationCode: string = '';
  phoneEnding: string = '1234';
  isVerifying: boolean = false;
  error: string = '';

  get isCodeComplete(): boolean {
    return this.verificationCode.length === 6;
  }

  onCodeComplete(code: string): void {
    this.verifyCode();
  }

  async verifyCode(): Promise<void> {
    if (!this.isCodeComplete) return;
    
    this.isVerifying = true;
    this.error = '';
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Code verified:', this.verificationCode);
      // Handle successful verification
    } catch (error) {
      this.error = 'Invalid verification code. Please try again.';
    } finally {
      this.isVerifying = false;
    }
  }

  async resendCode(): Promise<void> {
    // Handle code resend
    console.log('Resending verification code...');
  }
}
```

This Input OTP component provides a secure and user-friendly way to handle one-time password entry in Angular applications.
