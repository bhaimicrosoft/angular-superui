/**
 * Authentication Forms Component
 *
 * A comprehensive authentication forms component that supports:
 * - Multiple auth types: login, register, forgot-password, reset-password
 * - Both reactive forms and template-driven forms
 * - Multiple field variants: default, floating, outlined, filled, underlined
 * - Form validation with real-time feedback
 * - Password strength indicators
 * - Social login integration
 * - Accessibility features
 * - Dark mode support
 * - Customizable styling
 */

import {
  Component,
  computed,
  ElementRef,
  input,
  OnInit,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
  ControlValueAccessor,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { cva } from 'class-variance-authority';

// Form validation types and functions
export type AuthFormType = 'login' | 'register' | 'forgot-password' | 'reset-password';
export type AuthFormVariant = 'default' | 'card' | 'bordered' | 'minimal' | 'gradient';
export type AuthFieldVariant = 'default' | 'floating' | 'outlined' | 'filled' | 'underlined';

export interface AuthFormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'checkbox' | 'select';
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  helpText?: string;
  icon?: string;
  options?: { label: string; value: any }[];
}

export interface AuthFormConfig {
  type: AuthFormType;
  title?: string;
  subtitle?: string;
  fields: AuthFormField[];
  submitText?: string;
  showRememberMe?: boolean;
  showForgotPassword?: boolean;
  showSocialLogin?: boolean;
  mode?: 'reactive' | 'template'; // NEW: Form mode selection
}

export interface SocialProvider {
  name: string;
  icon: string;
  color: string;
}

export interface AuthFormSubmitEvent {
  type: AuthFormType;
  data: any;
  isValid: boolean;
}

// Form variants
const authFormVariants = cva(
  'w-full max-w-md mx-auto p-6 space-y-6 transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-gray-800 rounded-lg',
        card: 'bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700',
        bordered: 'bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700',
        minimal: 'bg-transparent',
        gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const authFieldVariants = cva('', {
  variants: {
    variant: {
      default: '',
      floating: 'relative',
      outlined: '',
      filled: '',
      underlined: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// Validation functions
export function emailValidator(control: any) {
  const email = control.value;
  if (!email) return null;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) ? null : { email: true };
}

export function passwordStrengthValidator(control: any) {
  const password = control.value;
  if (!password) return null;

  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const score = [hasMinLength, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;

  return score >= 3 ? null : { weakPassword: true };
}

export function confirmPasswordValidator(passwordFieldName: string) {
  return (control: any) => {
    if (!control.parent) return null;

    const password = control.parent.get(passwordFieldName);
    const confirmPassword = control;

    if (!password || !confirmPassword) return null;

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  };
}

@Component({
  selector: 'AuthForms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div [class]="authFormClass()" #authFormRef>
      <!-- Header -->
      <div class="text-center space-y-2 mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ formTitle() }}
        </h2>
        @if (config().subtitle) {
          <p class="text-gray-600 dark:text-gray-400">{{ config().subtitle }}</p>
        }
      </div>

      <!-- Social Login -->
      @if (config().showSocialLogin && socialProviders().length > 0) {
        <div class="space-y-3 mb-6">
          @for (provider of socialProviders(); track trackBySocialProvider($index, provider)) {
            <button
              type="button"
              (click)="socialLogin.emit(provider.name)"
              [style.background-color]="provider.color"
              class="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 transition-all duration-200"
            >
              <span [innerHTML]="provider.icon" class="mr-3 inline-flex items-center"></span>
              Continue with {{ provider.name }}
            </button>
          }

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or continue with email
              </span>
            </div>
          </div>
        </div>
      }

      <!-- Reactive Form Mode -->
      @if (isReactiveMode()) {
        <form
          [formGroup]="authForm()"
          (ngSubmit)="onSubmit()"
          class="space-y-4"
          novalidate
        >
          <!-- Dynamic Fields -->
          @for (field of config().fields; track trackByFieldName($index, field)) {
            <div [class]="fieldClass()">
              <!-- Field Label (Non-floating) -->
              @if (fieldVariant() !== 'floating') {
                <label
                  [for]="field.name"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {{ field.label }}
                  @if (field.required) {
                    <span class="text-red-500 ml-1">*</span>
                  }
                </label>
              }

              <!-- Field Container -->
              <div class="relative">
                <!-- Field Icon -->
                @if (field.icon) {
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20">
                    <span [innerHTML]="field.icon" class="text-gray-400 dark:text-gray-500 inline-flex items-center"></span>
                  </div>
                }

                <!-- Text/Email/Tel Input -->
                @if (field.type === 'text' || field.type === 'email' || field.type === 'tel') {
                  <input
                    [id]="field.name"
                    [formControlName]="field.name"
                    [type]="field.type"
                    [placeholder]="getFieldPlaceholder(field)"
                    [class]="getInputClass(field)"
                    [autocomplete]="getAutocomplete(field)"
                    [attr.aria-describedby]="getAriaDescribedBy(field)"
                    [attr.pattern]="field.pattern ? field.pattern : null"
                    [attr.minlength]="field.minLength"
                    [attr.maxlength]="field.maxLength"
                    (focus)="onFieldFocus(field.name)"
                    (blur)="onFieldBlur(field.name)"
                  />
                }

                <!-- Password Input -->
                @if (field.type === 'password') {
                  <input
                    [id]="field.name"
                    [formControlName]="field.name"
                    [type]="getFieldType(field)"
                    [placeholder]="getFieldPlaceholder(field)"
                    [class]="getInputClass(field)"
                    [autocomplete]="getAutocomplete(field)"
                    [attr.aria-describedby]="getAriaDescribedBy(field)"
                    [attr.minlength]="field.minLength"
                    [attr.maxlength]="field.maxLength"
                    (focus)="onFieldFocus(field.name)"
                    (blur)="onFieldBlur(field.name)"
                  />

                  <!-- Password Toggle -->
                  <button
                    type="button"
                    (click)="togglePasswordVisibility(field.name)"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center z-20 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                    [attr.aria-label]="passwordVisibility()[field.name] ? 'Hide password' : 'Show password'"
                  >
                    <i
                      [class]="passwordVisibility()[field.name] ? 'fas fa-eye-slash' : 'fas fa-eye'"
                      class="w-4 h-4"
                    ></i>
                  </button>
                }

                <!-- Select Input -->
                @if (field.type === 'select' && field.options) {
                  <select
                    [id]="field.name"
                    [formControlName]="field.name"
                    [class]="getInputClass(field)"
                    [attr.aria-describedby]="getAriaDescribedBy(field)"
                    (focus)="onFieldFocus(field.name)"
                    (blur)="onFieldBlur(field.name)"
                  >
                    <option value="" disabled>Select {{ field.label }}</option>
                    @for (option of field.options; track trackByValue($index, option)) {
                      <option [value]="option.value">{{ option.label }}</option>
                    }
                  </select>
                }

                <!-- Checkbox Input -->
                @if (field.type === 'checkbox') {
                  <div class="flex items-center">
                    <input
                      [id]="field.name"
                      [formControlName]="field.name"
                      type="checkbox"
                      [class]="getInputClass(field)"
                      [attr.aria-describedby]="getAriaDescribedBy(field)"
                      (focus)="onFieldFocus(field.name)"
                      (blur)="onFieldBlur(field.name)"
                    />
                    <label [for]="field.name" class="ml-1.5 text-sm text-gray-700 dark:text-gray-300">
                      <span [innerHTML]="field.label"></span>
                      @if (field.required) {
                        <span class="text-red-500 ml-1">*</span>
                      }
                    </label>
                  </div>
                }

                <!-- Floating Label -->
                @if (fieldVariant() === 'floating' && field.type !== 'checkbox') {
                  <label
                    [for]="field.name"
                    [class]="getFloatingLabelClass(field)"
                  >
                    {{ field.label }}
                    @if (field.required) {
                      <span class="text-red-500 ml-1">*</span>
                    }
                  </label>
                }
              </div>

              <!-- Field Error Messages -->
              @if (authForm().get(field.name)?.invalid && authForm().get(field.name)?.touched && showValidation()) {
                <div [id]="field.name + '-error'" class="mt-1 text-sm text-red-600 dark:text-red-400">
                  @if (authForm().get(field.name)?.errors?.['required']) {
                    <span>{{ field.label }} is required</span>
                  }
                  @if (authForm().get(field.name)?.errors?.['email']) {
                    <span>Please enter a valid email address</span>
                  }
                  @if (authForm().get(field.name)?.errors?.['minlength']) {
                    <span>{{ field.label }} must be at least {{ field.minLength }} characters</span>
                  }
                  @if (authForm().get(field.name)?.errors?.['maxlength']) {
                    <span>{{ field.label }} must not exceed {{ field.maxLength }} characters</span>
                  }
                  @if (authForm().get(field.name)?.errors?.['pattern']) {
                    <span>{{ field.label }} format is invalid</span>
                  }
                  @if (authForm().get(field.name)?.errors?.['weakPassword']) {
                    <span>Password is too weak. Please choose a stronger password.</span>
                  }
                  @if (authForm().get(field.name)?.errors?.['passwordMismatch']) {
                    <span>Passwords do not match</span>
                  }
                </div>
              }

              <!-- Field Help Text -->
              @if (field.helpText) {
                <div [id]="field.name + '-help'" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {{ field.helpText }}
                </div>
              }

              <!-- Password Strength Indicator -->
              @if (field.type === 'password' && field.name === 'password' && authForm().get('password')?.value) {
                <div [id]="field.name + '-strength'" class="mt-2 space-y-2">
                  <div class="flex space-x-1">
                    @for (bar of [0,1,2,3,4,5,6,7]; track bar) {
                      <div
                        class="h-1 flex-1 rounded-full transition-colors duration-300"
                        [class]="getPasswordStrengthBarClass(bar)"
                      ></div>
                    }
                  </div>
                  <p [id]="field.name + '-requirements'" [class]="getPasswordStrengthTextClass()" class="text-xs">
                    {{ getPasswordStrengthText() }}
                  </p>
                </div>
              }
            </div>
          }

          <!-- Remember Me (Login only) -->
          @if (config().showRememberMe && config().type === 'login') {
            <div class="flex items-center">
              <input
                id="rememberMe"
                formControlName="rememberMe"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label for="rememberMe" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
          }

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="isSubmitting()"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 dark:focus:ring-offset-gray-800"
          >
            @if (isSubmitting()) {
              <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            }
            {{ getSubmitText() }}
          </button>
        </form>
      }

      <!-- Template-driven Form Mode -->
      @if (isTemplateMode()) {
        <form
          #templateForm="ngForm"
          (ngSubmit)="onTemplateSubmit(templateForm)"
          class="space-y-4"
          novalidate
        >
          <!-- Dynamic Fields -->
          @for (field of config().fields; track trackByFieldName($index, field)) {
            <div [class]="fieldClass()">
              <!-- Field Label (Non-floating) -->
              @if (fieldVariant() !== 'floating') {
                <label
                  [for]="field.name"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {{ field.label }}
                  @if (field.required) {
                    <span class="text-red-500 ml-1">*</span>
                  }
                </label>
              }

              <!-- Field Container -->
              <div class="relative">
                <!-- Field Icon -->
                @if (field.icon) {
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20">
                    <span [innerHTML]="field.icon" class="text-gray-400 dark:text-gray-500 inline-flex items-center"></span>
                  </div>
                }

                <!-- Text/Email/Tel Input -->
                @if (field.type === 'text' || field.type === 'email' || field.type === 'tel') {
                  <input
                    [id]="field.name"
                    [name]="field.name"
                    [(ngModel)]="templateFormData[field.name]"
                    #fieldRef="ngModel"
                    [type]="field.type"
                    [placeholder]="getFieldPlaceholder(field)"
                    [class]="getTemplateInputClass(field)"
                    [autocomplete]="getAutocomplete(field)"
                    [attr.pattern]="field.pattern ? field.pattern : null"
                    [attr.minlength]="field.minLength"
                    [attr.maxlength]="field.maxLength"
                    [required]="field.required || false"
                    (focus)="onFieldFocus(field.name)"
                    (blur)="onFieldBlur(field.name)"
                    (input)="onTemplateInputChange(field.name, $event)"
                  />

                  <!-- Floating Label for Text Fields -->
                  @if (fieldVariant() === 'floating') {
                    <label
                      [for]="field.name"
                      [class]="getTemplateFloatingLabelClass(field, fieldRef)"
                    >
                      {{ field.label }}
                      @if (field.required) {
                        <span class="text-red-500 ml-1">*</span>
                      }
                    </label>
                  }

                  <!-- Field Error Messages for Text Fields -->
                  @if (fieldRef.invalid && fieldRef.touched && showValidation()) {
                    <div [id]="field.name + '-error'" class="mt-1 text-sm text-red-600 dark:text-red-400">
                      @if (fieldRef.errors?.['required']) {
                        <span>{{ field.label }} is required</span>
                      }
                      @if (fieldRef.errors?.['email']) {
                        <span>Please enter a valid email address</span>
                      }
                      @if (fieldRef.errors?.['minlength']) {
                        <span>{{ field.label }} must be at least {{ field.minLength }} characters</span>
                      }
                      @if (fieldRef.errors?.['maxlength']) {
                        <span>{{ field.label }} must not exceed {{ field.maxLength }} characters</span>
                      }
                      @if (fieldRef.errors?.['pattern']) {
                        <span>{{ field.label }} format is invalid</span>
                      }
                    </div>
                  }
                }

                <!-- Password Input -->
                @if (field.type === 'password') {
                  <input
                    [id]="field.name"
                    [name]="field.name"
                    [(ngModel)]="templateFormData[field.name]"
                    #passwordFieldRef="ngModel"
                    [type]="getFieldType(field)"
                    [placeholder]="getFieldPlaceholder(field)"
                    [class]="getTemplateInputClass(field)"
                    [autocomplete]="getAutocomplete(field)"
                    [attr.minlength]="field.minLength"
                    [attr.maxlength]="field.maxLength"
                    [required]="field.required || false"
                    (focus)="onFieldFocus(field.name)"
                    (blur)="onFieldBlur(field.name)"
                    (input)="onTemplateInputChange(field.name, $event)"
                  />

                  <!-- Password Toggle -->
                  <button
                    type="button"
                    (click)="togglePasswordVisibility(field.name)"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center z-20 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                    [attr.aria-label]="passwordVisibility()[field.name] ? 'Hide password' : 'Show password'"
                  >
                    <i
                      [class]="passwordVisibility()[field.name] ? 'fas fa-eye-slash' : 'fas fa-eye'"
                      class="w-4 h-4"
                    ></i>
                  </button>

                  <!-- Floating Label for Password Fields -->
                  @if (fieldVariant() === 'floating') {
                    <label
                      [for]="field.name"
                      [class]="getTemplateFloatingLabelClass(field, passwordFieldRef)"
                    >
                      {{ field.label }}
                      @if (field.required) {
                        <span class="text-red-500 ml-1">*</span>
                      }
                    </label>
                  }

                  <!-- Field Error Messages for Password Fields -->
                  @if (passwordFieldRef.invalid && passwordFieldRef.touched && showValidation()) {
                    <div [id]="field.name + '-error'" class="mt-1 text-sm text-red-600 dark:text-red-400">
                      @if (passwordFieldRef.errors?.['required']) {
                        <span>{{ field.label }} is required</span>
                      }
                      @if (passwordFieldRef.errors?.['minlength']) {
                        <span>{{ field.label }} must be at least {{ field.minLength }} characters</span>
                      }
                      @if (passwordFieldRef.errors?.['maxlength']) {
                        <span>{{ field.label }} must not exceed {{ field.maxLength }} characters</span>
                      }
                    </div>
                  }
                }

                <!-- Select Input -->
                @if (field.type === 'select' && field.options) {
                  <select
                    [id]="field.name"
                    [name]="field.name"
                    [(ngModel)]="templateFormData[field.name]"
                    #selectFieldRef="ngModel"
                    [class]="getTemplateInputClass(field)"
                    [required]="field.required || false"
                    (focus)="onFieldFocus(field.name)"
                    (blur)="onFieldBlur(field.name)"
                    (change)="onTemplateInputChange(field.name, $event)"
                  >
                    <option value="" disabled>Select {{ field.label }}</option>
                    @for (option of field.options; track trackByValue($index, option)) {
                      <option [value]="option.value">{{ option.label }}</option>
                    }
                  </select>

                  <!-- Floating Label for Select Fields -->
                  @if (fieldVariant() === 'floating') {
                    <label
                      [for]="field.name"
                      [class]="getTemplateFloatingLabelClass(field, selectFieldRef)"
                    >
                      {{ field.label }}
                      @if (field.required) {
                        <span class="text-red-500 ml-1">*</span>
                      }
                    </label>
                  }

                  <!-- Field Error Messages for Select Fields -->
                  @if (selectFieldRef.invalid && selectFieldRef.touched && showValidation()) {
                    <div [id]="field.name + '-error'" class="mt-1 text-sm text-red-600 dark:text-red-400">
                      @if (selectFieldRef.errors?.['required']) {
                        <span>{{ field.label }} is required</span>
                      }
                    </div>
                  }
                }

                <!-- Checkbox Input -->
                @if (field.type === 'checkbox') {
                  <div class="flex items-center">
                    <input
                      [id]="field.name"
                      [name]="field.name"
                      [(ngModel)]="templateFormData[field.name]"
                      #checkboxFieldRef="ngModel"
                      type="checkbox"
                      [class]="getTemplateInputClass(field)"
                      [required]="field.required || false"
                      (focus)="onFieldFocus(field.name)"
                      (blur)="onFieldBlur(field.name)"
                      (change)="onTemplateInputChange(field.name, $event)"
                    />
                    <label [for]="field.name" class="ml-1.5 text-sm text-gray-700 dark:text-gray-300">
                      <span [innerHTML]="field.label"></span>
                      @if (field.required) {
                        <span class="text-red-500 ml-1">*</span>
                      }
                    </label>
                  </div>

                  <!-- Field Error Messages for Checkbox Fields -->
                  @if (checkboxFieldRef.invalid && checkboxFieldRef.touched && showValidation()) {
                    <div [id]="field.name + '-error'" class="mt-1 text-sm text-red-600 dark:text-red-400">
                      @if (checkboxFieldRef.errors?.['required']) {
                        <span>{{ field.label }} is required</span>
                      }
                    </div>
                  }
                }
              </div>

              <!-- Field Help Text -->
              @if (field.helpText) {
                <div [id]="field.name + '-help'" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {{ field.helpText }}
                </div>
              }

              <!-- Password Strength Indicator for Template Forms -->
              @if (field.type === 'password' && field.name === 'password' && templateFormData['password']) {
                <div [id]="field.name + '-strength'" class="mt-2 space-y-2">
                  <div class="flex space-x-1">
                    @for (bar of [0,1,2,3,4]; track bar) {
                      <div
                        class="h-1 flex-1 rounded-full transition-colors duration-300"
                        [class]="getTemplatePasswordStrengthBarClass(bar)"
                      ></div>
                    }
                  </div>
                  <p [id]="field.name + '-requirements'" [class]="getTemplatePasswordStrengthTextClass()" class="text-xs">
                    {{ getTemplatePasswordStrengthText() }}
                  </p>
                </div>
              }
            </div>
          }

          <!-- Remember Me (Login only) -->
          @if (config().showRememberMe && config().type === 'login') {
            <div class="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                [(ngModel)]="templateFormData['rememberMe']"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label for="rememberMe" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
          }

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="isSubmitting()"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 dark:focus:ring-offset-gray-800"
          >
            @if (isSubmitting()) {
              <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            }
            {{ getSubmitText() }}
          </button>
        </form>
      }

      <!-- Footer Links -->
      <div class="text-center space-y-2 mt-6">
        @if (config().showForgotPassword && config().type === 'login') {
          <button
            type="button"
            (click)="onForgotPassword()"
            class="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:underline transition-colors duration-200"
          >
            Forgot your password?
          </button>
        }

        @if (config().type === 'login') {
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?
            <button
              type="button"
              (click)="onSwitchForm('register')"
              class="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:underline ml-1 transition-colors duration-200"
            >
              Sign up
            </button>
          </p>
        }

        @if (config().type === 'register') {
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <button
              type="button"
              (click)="onSwitchForm('login')"
              class="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:underline ml-1 transition-colors duration-200"
            >
              Sign in
            </button>
          </p>
        }

        @if (config().type === 'forgot-password') {
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Remember your password?
            <button
              type="button"
              (click)="onSwitchForm('login')"
              class="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:underline ml-1 transition-colors duration-200"
            >
              Sign in
            </button>
          </p>
        }
      </div>
    </div>

    <!-- Enhanced Floating Label Styles -->
    <style>
      .floating-label {
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        padding: 0 4px;
        border-radius: 4px;
        transform-origin: left center;
        color: #6b7280;
        transition: all 0.2s ease-in-out;
        font-size: 16px;
      }

      .floating-label.with-icon {
        left: 44px;
      }

      /* Only transform the label when focused or has value */
      .floating-label.focused,
      .floating-label.has-value {
        top: 0px;
        transform: translateY(-50%) scale(0.85);
        color: #3b82f6;
        background: white;
        font-size: 12px;
      }

      .floating-label.error {
        color: #ef4444 !important;
      }

      /* Input styling for floating labels */
      .floating-input {
        padding-top: 16px;
        padding-bottom: 16px;
      }

      /* When input has value or focused, adjust padding */
      .floating-input.has-value,
      .floating-input:focus {
        padding-top: 20px;
        padding-bottom: 12px;
      }

      /* Hide placeholder initially for floating labels */
      .floating-input::placeholder {
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
      }

      /* Show placeholder only when focused and label is floating */
      .floating-input:focus::placeholder {
        opacity: 0.5;
      }

      /* Dark mode support */
      .dark .floating-label {
        color: #9ca3af;
      }

      .dark .floating-label.focused,
      .dark .floating-label.has-value {
        color: #60a5fa;
        background: #1f2937;
      }

      .form-field:focus-within .floating-label {
        color: #3b82f6;
      }

      .dark .form-field:focus-within .floating-label {
        color: #60a5fa;
      }

      /* Additional responsive behavior */
      .form-field {
        position: relative;
      }

      /* Ensure input field styling is consistent */
      .floating-input {
        background: transparent;
      }

      .floating-input:focus {
        background: transparent;
      }

      /* Select field specific styling */
      select {
        background-color: white;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
        background-position: right 0.5rem center;
        background-repeat: no-repeat;
        background-size: 1.5em 1.5em;
        padding-right: 2.5rem;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      select:focus {
        background-color: white;
        outline: 2px solid transparent;
        outline-offset: 2px;
      }

      select option {
        background-color: white;
        color: #1f2937;
        padding: 0.5rem;
      }

      /* Dark mode select styling */
      .dark select {
        background-color: #374151;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
        color: white;
        border-color: #4b5563;
      }

      .dark select:focus {
        background-color: #374151;
        border-color: #60a5fa;
      }

      .dark select option {
        background-color: #374151;
        color: white;
      }

      /* Improve select option hover in dark mode */
      .dark select option:hover {
        background-color: #4b5563;
      }
    </style>
  `,
})
export class AuthForms implements OnInit, ControlValueAccessor {
  // Inputs
  config = input.required<AuthFormConfig>();
  variant = input<AuthFormVariant>('default');
  fieldVariant = input<AuthFieldVariant>('default');
  socialProviders = input<SocialProvider[]>([]);
  showValidation = input<boolean>(true);
  autoFocus = input<boolean>(false);

  // NEW: Template-driven form support
  value = input<any>({});
  valueChange = output<any>();

  // Outputs
  formSubmit = output<AuthFormSubmitEvent>();
  formSwitch = output<AuthFormType>();
  forgotPassword = output<void>();
  socialLogin = output<string>();

  // Signals
  authForm = signal<FormGroup>(new FormGroup({}));
  isSubmitting = signal<boolean>(false);
  passwordVisibility = signal<{ [key: string]: boolean }>({});
  fieldFocusState = signal<{ [key: string]: boolean }>({});

  // Template-driven form data
  templateFormData: { [key: string]: any } = {};

  // ControlValueAccessor implementation
  private onChange = (value: any) => {};
  private onTouched = () => {};

  // ViewChild
  @ViewChild('authFormRef') authFormRef!: ElementRef;
  @ViewChild('templateForm') templateFormRef!: NgForm;

  // Computed properties
  authFormClass = computed(() => authFormVariants({ variant: this.variant() }));
  fieldClass = computed(() =>
    authFieldVariants({ variant: this.fieldVariant() })
  );

  formTitle = computed(() => {
    if (this.config().title) return this.config().title;

    switch (this.config().type) {
      case 'login':
        return 'Welcome back';
      case 'register':
        return 'Create your account';
      case 'forgot-password':
        return 'Reset your password';
      case 'reset-password':
        return 'Set new password';
      default:
        return 'Authentication';
    }
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.isReactiveMode()) {
      this.buildForm();
    } else {
      this.initializeTemplateForm();
    }

    if (this.autoFocus()) {
      setTimeout(() => {
        const firstInput =
          this.authFormRef?.nativeElement?.querySelector('input');
        if (firstInput) {
          firstInput.focus();
        }
      }, 100);
    }
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (value) {
      this.templateFormData = { ...value };
      this.valueChange.emit(this.templateFormData);
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Mode detection
  isReactiveMode(): boolean {
    return this.config().mode !== 'template';
  }

  isTemplateMode(): boolean {
    return this.config().mode === 'template';
  }

  private initializeTemplateForm() {
    // Initialize template form data with default values
    this.config().fields.forEach((field) => {
      if (!(field.name in this.templateFormData)) {
        this.templateFormData[field.name] =
          field.type === 'checkbox' ? false : '';
      }
    });

    if (this.config().showRememberMe && this.config().type === 'login') {
      this.templateFormData['rememberMe'] = false;
    }
  }

  private buildForm() {
    const formControls: { [key: string]: any } = {};

    // Add dynamic fields
    this.config().fields.forEach((field) => {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.type === 'email') {
        validators.push(emailValidator);
      }

      if (field.type === 'password' && field.name === 'password') {
        validators.push(passwordStrengthValidator);
      }

      if (field.type === 'password' && field.name === 'confirmPassword') {
        validators.push(confirmPasswordValidator('password'));
      }

      if (field.minLength) {
        validators.push(Validators.minLength(field.minLength));
      }

      if (field.maxLength) {
        validators.push(Validators.maxLength(field.maxLength));
      }

      if (field.pattern) {
        validators.push(Validators.pattern(field.pattern));
      }

      formControls[field.name] = ['', validators];
    });

    // Add remember me for login forms
    if (this.config().showRememberMe && this.config().type === 'login') {
      formControls['rememberMe'] = [false];
    }

    this.authForm.set(this.fb.group(formControls));
  }

  getFieldType(field: AuthFormField): string {
    if (field.type === 'password') {
      return this.passwordVisibility()[field.name] ? 'text' : 'password';
    }
    return field.type;
  }

  getFieldPlaceholder(field: AuthFormField): string {
    if (this.fieldVariant() === 'floating') {
      // For floating labels, don't show placeholder unless field is focused
      const isFieldFocused = this.fieldFocusState()[field.name];
      return isFieldFocused ? (field.placeholder || field.label) : '';
    }
    return field.placeholder || field.label;
  }

  // Enhanced floating label class method for reactive forms
  getFloatingLabelClass(field: AuthFormField): string {
    const baseClass =
      'floating-label absolute text-sm transition-all duration-200 pointer-events-none z-10';
    const iconClass = field.icon ? 'with-icon' : '';

    const isFieldFocused = this.fieldFocusState()[field.name];
    const hasValue =
      this.authForm().get(field.name)?.value &&
      this.authForm().get(field.name)?.value.toString().trim() !== '';
    const isInvalid =
      this.authForm().get(field.name)?.invalid &&
      this.authForm().get(field.name)?.touched;

    let stateClass = '';
    // Only add focused/has-value class when field is actually focused OR has a real value
    if (isFieldFocused || hasValue) {
      stateClass = 'focused has-value';
    }
    if (isInvalid && (isFieldFocused || hasValue)) {
      stateClass += ' error';
    }

    return `${baseClass} ${iconClass} ${stateClass}`.trim();
  }

  // Template form floating label class method
  getTemplateFloatingLabelClass(field: AuthFormField, fieldRef: any): string {
    const baseClass =
      'floating-label absolute text-sm transition-all duration-200 pointer-events-none z-10';
    const iconClass = field.icon ? 'with-icon' : '';

    const isFieldFocused = this.fieldFocusState()[field.name];
    const hasValue =
      this.templateFormData[field.name] &&
      this.templateFormData[field.name].toString().trim() !== '';
    const isInvalid = fieldRef.invalid && fieldRef.touched;

    let stateClass = '';
    // Only add focused/has-value class when field is actually focused OR has a real value
    if (isFieldFocused || hasValue) {
      stateClass = 'focused has-value';
    }
    if (isInvalid && (isFieldFocused || hasValue)) {
      stateClass += ' error';
    }

    return `${baseClass} ${iconClass} ${stateClass}`.trim();
  }

  // Field focus/blur handlers
  onFieldFocus(fieldName: string) {
    this.fieldFocusState.update((state) => ({ ...state, [fieldName]: true }));
    this.onTouched();
  }

  onFieldBlur(fieldName: string) {
    this.fieldFocusState.update((state) => ({ ...state, [fieldName]: false }));
  }

  // Template form input change handler
  onTemplateInputChange(fieldName: string, event: any) {
    const value = event.target.value;
    this.templateFormData[fieldName] = value;
    this.onChange(this.templateFormData);
    this.valueChange.emit(this.templateFormData);
  }

  getInputClass(field: AuthFormField): string {
    // Special styling for checkboxes
    if (field.type === 'checkbox') {
      return 'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-600';
    }

    const baseClass =
      'w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200';
    const iconClass = field.icon ? 'pl-10' : '';
    const passwordToggleClass = field.type === 'password' ? 'pr-10' : '';
    const variantClass = this.getInputVariantClass();

    let floatingClass = '';
    if (this.fieldVariant() === 'floating') {
      const hasValue =
        this.authForm().get(field.name)?.value &&
        this.authForm().get(field.name)?.value.toString().trim() !== '';
      floatingClass = `floating-input ${hasValue ? 'has-value' : ''}`;
    }

    const errorClass =
      this.authForm().get(field.name)?.invalid &&
      this.authForm().get(field.name)?.touched
        ? 'border-red-500 dark:border-red-400'
        : 'border-gray-300 dark:border-gray-600';

    return `${baseClass} ${iconClass} ${passwordToggleClass} ${variantClass} ${floatingClass} ${errorClass}`.trim();
  }

  // Template form input class method
  getTemplateInputClass(field: AuthFormField): string {
    // Special styling for checkboxes
    if (field.type === 'checkbox') {
      return 'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-600';
    }

    const baseClass =
      'w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200';
    const iconClass = field.icon ? 'pl-10' : '';
    const passwordToggleClass = field.type === 'password' ? 'pr-10' : '';
    const variantClass = this.getInputVariantClass();

    let floatingClass = '';
    if (this.fieldVariant() === 'floating') {
      const hasValue =
        this.templateFormData[field.name] &&
        this.templateFormData[field.name].toString().trim() !== '';
      floatingClass = `floating-input ${hasValue ? 'has-value' : ''}`;
    }

    // Template form error styling - check if field is invalid and has been touched
    const fieldRef = this.templateFormRef?.form?.controls?.[field.name];
    const errorClass =
      fieldRef?.invalid && fieldRef?.touched
        ? 'border-red-500 dark:border-red-400'
        : 'border-gray-300 dark:border-gray-600';

    return `${baseClass} ${iconClass} ${passwordToggleClass} ${variantClass} ${floatingClass} ${errorClass}`.trim();
  }

  private getInputVariantClass(): string {
    switch (this.fieldVariant()) {
      case 'floating':
        return 'peer placeholder-transparent';
      case 'outlined':
        return 'border-2';
      case 'filled':
        return 'bg-gray-50 dark:bg-gray-600 border-transparent focus:bg-white dark:focus:bg-gray-700';
      case 'underlined':
        return 'border-0 border-b-2 rounded-none bg-transparent focus:ring-0';
      default:
        return '';
    }
  }

  togglePasswordVisibility(fieldName: string) {
    this.passwordVisibility.update((visibility) => ({
      ...visibility,
      [fieldName]: !visibility[fieldName],
    }));
  }

  getPasswordStrengthScore(): number {
    const password = this.authForm().get('password')?.value || '';
    const hasMinLength = password.length >= 8;
    const hasMaxLength = password.length <= 128;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(
      password
    );
    const noCommonPatterns = !/(.)\1{2,}/.test(password);
    const noSequentialChars =
      !/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(
        password
      );

    return [
      hasMinLength,
      hasMaxLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      noCommonPatterns,
      noSequentialChars,
    ].filter(Boolean).length;
  }

  getPasswordStrengthBarClass(index: number): string {
    const score = this.getPasswordStrengthScore();
    if (index < score) {
      if (score <= 3) return 'bg-red-500';
      if (score <= 5) return 'bg-yellow-500';
      if (score <= 6) return 'bg-blue-500';
      return 'bg-green-500';
    }
    return 'bg-gray-200 dark:bg-gray-600';
  }

  getPasswordStrengthTextClass(): string {
    const score = this.getPasswordStrengthScore();
    if (score <= 3) return 'text-red-600 dark:text-red-400';
    if (score <= 5) return 'text-yellow-600 dark:text-yellow-400';
    if (score <= 6) return 'text-blue-600 dark:text-blue-400';
    return 'text-green-600 dark:text-green-400';
  }

  getPasswordStrengthText(): string {
    const score = this.getPasswordStrengthScore();
    switch (score) {
      case 0:
      case 1:
        return 'Very weak password';
      case 2:
      case 3:
        return 'Weak password';
      case 4:
      case 5:
        return 'Fair password';
      case 6:
        return 'Good password';
      case 7:
      case 8:
        return 'Strong password';
      default:
        return '';
    }
  }

  // Accessibility helper methods
  getAriaDescribedBy(field: AuthFormField): string {
    const descriptors = [];

    if (field.helpText) {
      descriptors.push(field.name + '-help');
    }

    if (field.type === 'password' && field.name === 'password') {
      descriptors.push(field.name + '-strength', field.name + '-requirements');
    }

    if (
      this.authForm().get(field.name)?.invalid &&
      this.authForm().get(field.name)?.touched
    ) {
      descriptors.push(field.name + '-error');
    }

    return descriptors.length > 0 ? descriptors.join(' ') : '';
  }

  getAutocomplete(field: AuthFormField): string {
    switch (field.type) {
      case 'email':
        return 'email';
      case 'password':
        if (field.name === 'password') return 'current-password';
        if (field.name === 'newPassword') return 'new-password';
        if (field.name === 'confirmPassword') return 'new-password';
        return 'current-password';
      case 'tel':
        return 'tel';
      case 'text':
        if (field.name === 'firstName') return 'given-name';
        if (field.name === 'lastName') return 'family-name';
        if (field.name === 'username') return 'username';
        return 'off';
      default:
        return 'off';
    }
  }

  trackBySocialProvider(index: number, provider: SocialProvider): string {
    return provider.name;
  }

  trackByValue(index: number, option: any): any {
    return option.value;
  }

  // Template form password strength methods
  getTemplatePasswordStrengthScore(): number {
    const password = this.templateFormData['password'] || '';
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return [
      hasMinLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
    ].filter(Boolean).length;
  }

  getTemplatePasswordStrengthBarClass(index: number): string {
    const score = this.getTemplatePasswordStrengthScore();
    if (index < score) {
      if (score <= 2) return 'bg-red-500';
      if (score <= 3) return 'bg-yellow-500';
      if (score <= 4) return 'bg-blue-500';
      return 'bg-green-500';
    }
    return 'bg-gray-200 dark:bg-gray-600';
  }

  getTemplatePasswordStrengthTextClass(): string {
    const score = this.getTemplatePasswordStrengthScore();
    if (score <= 2) return 'text-red-600 dark:text-red-400';
    if (score <= 3) return 'text-yellow-600 dark:text-yellow-400';
    if (score <= 4) return 'text-blue-600 dark:text-blue-400';
    return 'text-green-600 dark:text-green-400';
  }

  getTemplatePasswordStrengthText(): string {
    const score = this.getTemplatePasswordStrengthScore();
    switch (score) {
      case 0:
      case 1:
        return 'Very weak password';
      case 2:
        return 'Weak password';
      case 3:
        return 'Fair password';
      case 4:
        return 'Good password';
      case 5:
        return 'Strong password';
      default:
        return '';
    }
  }

  getSubmitText(): string {
    if (this.isSubmitting()) {
      switch (this.config().type) {
        case 'login':
          return 'Signing in...';
        case 'register':
          return 'Creating account...';
        case 'forgot-password':
          return 'Sending email...';
        case 'reset-password':
          return 'Updating password...';
        default:
          return 'Processing...';
      }
    }

    return this.config().submitText || this.getDefaultSubmitText();
  }

  private getDefaultSubmitText(): string {
    switch (this.config().type) {
      case 'login':
        return 'Sign in';
      case 'register':
        return 'Create account';
      case 'forgot-password':
        return 'Send reset email';
      case 'reset-password':
        return 'Update password';
      default:
        return 'Submit';
    }
  }

  // Backward compatibility method
  onSubmit(): void {
    this.onUnifiedSubmit();
  }

  onUnifiedSubmit(templateForm?: NgForm): void {
    let isValid = false;
    let formData: any = {};

    if (this.isReactiveMode()) {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched();
      isValid = this.authForm().valid;
      formData = this.authForm().value;
    } else {
      // For template forms
      if (templateForm && 'valid' in templateForm) {
        isValid = templateForm.valid || false;
        formData = this.templateFormData;
      }
    }

    if (!isValid) {
      return;
    }

    this.isSubmitting.set(true);

    const submitData: AuthFormSubmitEvent = {
      type: this.config().type,
      data: formData,
      isValid: isValid,
    };

    // Simulate API call delay
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.formSubmit.emit(submitData);
    }, 1000);
  }

  // Template form submission
  onTemplateSubmit(templateForm: any) {
    if (templateForm.invalid) {
      this.markTemplateFormTouched(templateForm);
      return;
    }

    this.isSubmitting.set(true);

    const submitData: AuthFormSubmitEvent = {
      type: this.config().type,
      data: this.templateFormData,
      isValid: templateForm.valid,
    };

    // Update parent component if using as ControlValueAccessor
    this.onChange(this.templateFormData);
    this.valueChange.emit(this.templateFormData);

    // Simulate API call delay
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.formSubmit.emit(submitData);
    }, 1000);
  }

  private markTemplateFormTouched(templateForm: any) {
    Object.keys(templateForm.controls).forEach((key) => {
      const control = templateForm.controls[key];
      control.markAsTouched();
    });
  }

  onSwitchForm(type: AuthFormType) {
    this.formSwitch.emit(type);
  }

  onForgotPassword() {
    this.forgotPassword.emit();
  }

  trackByFieldName(index: number, field: AuthFormField): string {
    return field.name;
  }

  private markFormGroupTouched() {
    Object.keys(this.authForm().controls).forEach((key) => {
      const control = this.authForm().get(key);
      control?.markAsTouched();
    });
  }
}
