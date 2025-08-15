/**
 * Contact Form Component
 *
 * A comprehensive contact form component that supports:
 * - Multiple form layouts: default, card, bordered, minimal, gradient
 * - Multiple field variants: default, floating, outlined, filled, underlined
 * - Reactive and template-driven forms
 * - Form validation with real-time feedback
 * - File attachment support
 * - Captcha integration
 * - Accessibility features
 * - Dark mode support
 * - Animation and loading states
 * - Customizable fields and styling
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
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { cva } from 'class-variance-authority';

// Contact form types and interfaces
export type ContactFormVariant = 'default' | 'card' | 'bordered' | 'minimal' | 'gradient';
export type ContactFieldVariant = 'default' | 'floating' | 'outlined' | 'filled' | 'underlined';
export type ContactFormMode = 'reactive' | 'template';

export interface ContactFormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'file';
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  rows?: number; // for textarea
  pattern?: string;
  helpText?: string;
  icon?: string;
  options?: { label: string; value: any }[]; // for select
  accept?: string; // for file input
  multiple?: boolean; // for file input
}

export interface ContactFormConfig {
  title?: string;
  subtitle?: string;
  description?: string;
  fields: ContactFormField[];
  submitText?: string;
  showCaptcha?: boolean;
  showPrivacyConsent?: boolean;
  privacyText?: string;
  successMessage?: string;
  mode?: ContactFormMode;
}

export interface ContactFormSubmitEvent {
  data: any;
  isValid: boolean;
  files?: FileList | null;
}

// Form variants
const contactFormVariants = cva(
  'w-full max-w-2xl mx-auto p-6 space-y-6 transition-all duration-300',
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

const contactFieldVariants = cva('', {
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

const inputVariants = cva(
  'w-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none',
  {
    variants: {
      variant: {
        default: 
          'px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md ' +
          'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ' +
          'focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
        floating: 
          'px-3 pt-6 pb-2 border border-gray-300 dark:border-gray-600 rounded-md ' +
          'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ' +
          'focus:ring-2 focus:ring-blue-500 focus:border-blue-500 peer',
        outlined: 
          'px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-md ' +
          'bg-transparent text-gray-900 dark:text-gray-100 ' +
          'focus:ring-0 focus:border-blue-500',
        filled: 
          'px-3 py-2 border-0 rounded-md ' +
          'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 ' +
          'focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800',
        underlined: 
          'px-0 py-2 border-0 border-b-2 border-gray-300 dark:border-gray-600 rounded-none ' +
          'bg-transparent text-gray-900 dark:text-gray-100 ' +
          'focus:ring-0 focus:border-blue-500',
      },
      error: {
        true: 'border-red-500 focus:border-red-500 focus:ring-red-500',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      error: false,
    },
  }
);

const labelVariants = cva(
  'text-sm font-medium transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'block mb-2 text-gray-700 dark:text-gray-300',
        floating: 
          'absolute left-3 top-2 text-gray-500 dark:text-gray-400 ' +
          'peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500 ' +
          'peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs',
        outlined: 'block mb-2 text-gray-700 dark:text-gray-300',
        filled: 'block mb-2 text-gray-700 dark:text-gray-300',
        underlined: 'block mb-2 text-gray-700 dark:text-gray-300',
      },
      error: {
        true: 'text-red-500',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      error: false,
    },
  }
);

@Component({
  selector: 'ContactForm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  animations: [
    trigger('slideInUp', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('300ms ease-out')
      ])
    ]),
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('200ms ease-in')
      ])
    ]),
    trigger('bounce', [
      transition('* => success', [
        animate('600ms ease-in-out', style({ transform: 'scale(1.05)' })),
        animate('300ms ease-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ],
  template: `
    <div 
      [class]="getContactFormVariants()({ variant: variant() })"
      [@slideInUp]="'in'"
      role="form"
      [attr.aria-label]="config().title || 'Contact form'"
    >
      <!-- Header -->
      <div *ngIf="config().title || config().subtitle || config().description" 
           class="text-center space-y-2 mb-8">
        <h2 *ngIf="config().title" 
            class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
            [@fadeIn]="'in'">
          {{ config().title }}
        </h2>
        <p *ngIf="config().subtitle" 
           class="text-lg text-gray-600 dark:text-gray-300"
           [@fadeIn]="'in'">
          {{ config().subtitle }}
        </p>
        <p *ngIf="config().description" 
           class="text-gray-500 dark:text-gray-400 max-w-lg mx-auto"
           [@fadeIn]="'in'">
          {{ config().description }}
        </p>
      </div>

      <!-- Success Message -->
      <div *ngIf="showSuccess()" 
           class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6"
           [@bounce]="'success'">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <p class="text-green-800 dark:text-green-200 font-medium">
            {{ config().successMessage || 'Thank you! Your message has been sent successfully.' }}
          </p>
        </div>
      </div>

      <!-- Reactive Form -->
      <form *ngIf="config().mode !== 'template'" 
            [formGroup]="reactiveForm()"
            (ngSubmit)="onReactiveSubmit()"
            class="space-y-6"
            novalidate>
        
        <div *ngFor="let field of config().fields || []; trackBy: trackByFieldName" 
             [class]="getContactFieldVariants()({ variant: fieldVariant() })">
          
          <!-- Text, Email, Tel Input -->
          <div *ngIf="field.type === 'text' || field.type === 'email' || field.type === 'tel'">
            <label *ngIf="fieldVariant() !== 'floating'"
                   [for]="field.name"
                   [class]="getLabelVariants()({ 
                     variant: fieldVariant(), 
                     error: hasError(field.name) 
                   })">
              {{ field.label }}
              <span *ngIf="field.required" class="text-red-500 ml-1">*</span>
            </label>
            
            <div class="relative">
              <input
                [id]="field.name"
                [formControlName]="field.name"
                [type]="field.type"
                [placeholder]="fieldVariant() === 'floating' ? ' ' : (field.placeholder || '')"
                [class]="getInputVariants()({ 
                  variant: fieldVariant(), 
                  error: hasError(field.name) 
                })"
                [attr.aria-describedby]="field.helpText ? field.name + '-help' : null"
                [attr.aria-invalid]="hasError(field.name)"
              />
              
              <label *ngIf="fieldVariant() === 'floating'"
                     [for]="field.name"
                     [class]="getLabelVariants()({ 
                       variant: fieldVariant(), 
                       error: hasError(field.name) 
                     })">
                {{ field.label }}
                <span *ngIf="field.required" class="text-red-500 ml-1">*</span>
              </label>
              
              <!-- Field Icon -->
              <div *ngIf="field.icon" 
                   class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <span [innerHTML]="field.icon"></span>
              </div>
            </div>
          </div>

          <!-- Textarea -->
          <div *ngIf="field.type === 'textarea'">
            <label [for]="field.name"
                   [class]="getLabelVariants()({ 
                     variant: fieldVariant(), 
                     error: hasError(field.name) 
                   })">
              {{ field.label }}
              <span *ngIf="field.required" class="text-red-500 ml-1">*</span>
            </label>
            
            <textarea
              [id]="field.name"
              [formControlName]="field.name"
              [placeholder]="field.placeholder || ''"
              [rows]="field.rows || 4"
              [class]="getInputVariants()({ 
                variant: fieldVariant(), 
                error: hasError(field.name) 
              })"
              [attr.aria-describedby]="field.helpText ? field.name + '-help' : null"
              [attr.aria-invalid]="hasError(field.name)"
              class="resize-y"
            ></textarea>
          </div>

          <!-- Select -->
          <div *ngIf="field.type === 'select'">
            <label [for]="field.name"
                   [class]="getLabelVariants()({ 
                     variant: fieldVariant(), 
                     error: hasError(field.name) 
                   })">
              {{ field.label }}
              <span *ngIf="field.required" class="text-red-500 ml-1">*</span>
            </label>
            
            <select
              [id]="field.name"
              [formControlName]="field.name"
              [class]="getInputVariants()({ 
                variant: fieldVariant(), 
                error: hasError(field.name) 
              })"
              [attr.aria-describedby]="field.helpText ? field.name + '-help' : null"
              [attr.aria-invalid]="hasError(field.name)"
            >
              <option value="">{{ field.placeholder || 'Select an option' }}</option>
              <option *ngFor="let option of field.options" [value]="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <!-- File Upload -->
          <div *ngIf="field.type === 'file'">
            <label [for]="field.name"
                   [class]="getLabelVariants()({ 
                     variant: fieldVariant(), 
                     error: hasError(field.name) 
                   })">
              {{ field.label }}
              <span *ngIf="field.required" class="text-red-500 ml-1">*</span>
            </label>
            
            <div class="relative">
              <input
                [id]="field.name"
                type="file"
                [accept]="field.accept || '*/*'"
                [multiple]="field.multiple || false"
                (change)="onFileChange($event, field.name)"
                class="hidden"
                #fileInput
              />
              
              <button
                type="button"
                (click)="fileInput.click()"
                [class]="getInputVariants()({ 
                  variant: fieldVariant(), 
                  error: hasError(field.name) 
                })"
                class="flex items-center justify-center space-x-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
                <span>{{ selectedFiles()[field.name] ? selectedFiles()[field.name] : (field.placeholder || 'Choose file') }}</span>
              </button>
            </div>
          </div>

          <!-- Checkbox -->
          <div *ngIf="field.type === 'checkbox'" class="flex items-start space-x-2">
            <input
              [id]="field.name"
              [formControlName]="field.name"
              type="checkbox"
              class="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              [attr.aria-describedby]="field.helpText ? field.name + '-help' : null"
              [attr.aria-invalid]="hasError(field.name)"
            />
            <label [for]="field.name" class="text-sm text-gray-700 dark:text-gray-300">
              {{ field.label }}
              <span *ngIf="field.required" class="text-red-500 ml-1">*</span>
            </label>
          </div>

          <!-- Help Text -->
          <p *ngIf="field.helpText" 
             [id]="field.name + '-help'"
             class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {{ field.helpText }}
          </p>

          <!-- Error Message -->
          <p *ngIf="hasError(field.name)" 
             class="mt-1 text-xs text-red-500"
             role="alert">
            {{ getErrorMessage(field.name, field) }}
          </p>
        </div>

        <!-- Privacy Consent -->
        <div *ngIf="config().showPrivacyConsent" class="flex items-start space-x-2">
          <input
            id="privacy-consent"
            formControlName="privacyConsent"
            type="checkbox"
            class="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            required
          />
          <label for="privacy-consent" class="text-sm text-gray-700 dark:text-gray-300">
            {{ config().privacyText || 'I agree to the privacy policy and terms of service.' }}
            <span class="text-red-500 ml-1">*</span>
          </label>
        </div>

        <!-- Captcha Placeholder -->
        <div *ngIf="config().showCaptcha" 
             class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <p class="text-center text-gray-500 dark:text-gray-400">Captcha verification would go here</p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          [disabled]="isSubmitting() || !reactiveForm().valid"
          class="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                 text-white font-medium rounded-lg transition-all duration-200 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 disabled:cursor-not-allowed"
          [attr.aria-busy]="isSubmitting()"
        >
          <span *ngIf="!isSubmitting()" class="flex items-center justify-center space-x-2">
            <span>{{ config().submitText || 'Send Message' }}</span>
          </span>
          <span *ngIf="isSubmitting()" class="flex items-center justify-center space-x-2">
            <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="m12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6z"></path>
            </svg>
            <span>Sending...</span>
          </span>
        </button>
      </form>

      <!-- Template-driven Form -->
      <form *ngIf="config().mode === 'template'"
            #templateForm="ngForm"
            (ngSubmit)="onTemplateSubmit(templateForm)"
            class="space-y-6"
            novalidate>
        
        <div *ngFor="let field of config().fields || []; trackBy: trackByFieldName">
          
          <!-- Text, Email, Tel Input -->
          <div *ngIf="field.type === 'text' || field.type === 'email' || field.type === 'tel'">
            <label [for]="field.name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ field.label }}
              <span *ngIf="field.required" class="text-red-500 ml-1">*</span>
            </label>
            
            <input
              [id]="field.name"
              [name]="field.name"
              [type]="field.type"
              [placeholder]="field.placeholder || ''"
              [(ngModel)]="templateData()[field.name]"
              [required]="field.required || false"
              [minlength]="field.minLength || null"
              [maxlength]="field.maxLength || null"
              [pattern]="field.pattern || ''"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition-all duration-200"
              #fieldRef="ngModel"
            />
            
            <p *ngIf="fieldRef.invalid && fieldRef.touched" 
               class="mt-1 text-xs text-red-500"
               role="alert">
              {{ getTemplateErrorMessage(fieldRef, field) }}
            </p>
          </div>

          <!-- Textarea -->
          <div *ngIf="field.type === 'textarea'">
            <label [for]="field.name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ field.label }}
              <span *ngIf="field.required" class="text-red-500 ml-1">*</span>
            </label>
            
            <textarea
              [id]="field.name"
              [name]="field.name"
              [placeholder]="field.placeholder || ''"
              [rows]="field.rows || 4"
              [(ngModel)]="templateData()[field.name]"
              [required]="field.required || false"
              [minlength]="field.minLength || null"
              [maxlength]="field.maxLength || null"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition-all duration-200 resize-y"
              #fieldRef="ngModel"
            ></textarea>
            
            <p *ngIf="fieldRef.invalid && fieldRef.touched" 
               class="mt-1 text-xs text-red-500"
               role="alert">
              {{ getTemplateErrorMessage(fieldRef, field) }}
            </p>
          </div>

          <!-- Help Text -->
          <p *ngIf="field.helpText" class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {{ field.helpText }}
          </p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          [disabled]="isSubmitting() || !templateForm.valid"
          class="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                 text-white font-medium rounded-lg transition-all duration-200 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 disabled:cursor-not-allowed"
        >
          <span *ngIf="!isSubmitting()">{{ config().submitText || 'Send Message' }}</span>
          <span *ngIf="isSubmitting()" class="flex items-center justify-center space-x-2">
            <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="m12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6z"></path>
            </svg>
            <span>Sending...</span>
          </span>
        </button>
      </form>
    </div>
  `,
})
export class ContactForm implements OnInit {
  // Input signals
  variant = input<ContactFormVariant>('card');
  fieldVariant = input<ContactFieldVariant>('default');
  config = input.required<ContactFormConfig>();
  
  // Output signals
  formSubmit = output<ContactFormSubmitEvent>();
  
  // State signals
  reactiveForm = signal<FormGroup>(new FormGroup({}));
  templateData = signal<Record<string, any>>({});
  isSubmitting = signal(false);
  showSuccess = signal(false);
  selectedFiles = signal<Record<string, string>>({});
  
  // Computed variant functions
  getContactFormVariants = computed(() => ({ variant }: { variant: ContactFormVariant }) => contactFormVariants({ variant }));
  getContactFieldVariants = computed(() => ({ variant }: { variant: ContactFieldVariant }) => contactFieldVariants({ variant }));
  getInputVariants = computed(() => ({ variant, error }: { variant: ContactFieldVariant; error: boolean }) => inputVariants({ variant, error }));
  getLabelVariants = computed(() => ({ variant, error }: { variant: ContactFieldVariant; error: boolean }) => labelVariants({ variant, error }));

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeReactiveForm();
    this.initializeTemplateData();
  }

  private initializeReactiveForm() {
    const formConfig: any = {};
    
    this.config().fields.forEach(field => {
      const validators = [];
      
      if (field.required) {
        validators.push(Validators.required);
      }
      
      if (field.type === 'email') {
        validators.push(Validators.email);
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
      
      formConfig[field.name] = ['', validators];
    });

    // Add privacy consent if required
    if (this.config().showPrivacyConsent) {
      formConfig['privacyConsent'] = [false, Validators.requiredTrue];
    }
    
    this.reactiveForm.set(this.fb.group(formConfig));
  }

  private initializeTemplateData() {
    const data: Record<string, any> = {};
    this.config().fields.forEach(field => {
      data[field.name] = '';
    });
    this.templateData.set(data);
  }

  hasError(fieldName: string): boolean {
    const control = this.reactiveForm().get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(fieldName: string, field: ContactFormField): string {
    const control = this.reactiveForm().get(fieldName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) {
      return `${field.label} is required.`;
    }
    
    if (control.errors['email']) {
      return 'Please enter a valid email address.';
    }
    
    if (control.errors['minlength']) {
      return `${field.label} must be at least ${field.minLength} characters.`;
    }
    
    if (control.errors['maxlength']) {
      return `${field.label} must not exceed ${field.maxLength} characters.`;
    }
    
    if (control.errors['pattern']) {
      return `${field.label} format is invalid.`;
    }

    return 'This field is invalid.';
  }

  getTemplateErrorMessage(fieldRef: any, field: ContactFormField): string {
    if (fieldRef.errors?.['required']) {
      return `${field.label} is required.`;
    }
    
    if (fieldRef.errors?.['email']) {
      return 'Please enter a valid email address.';
    }
    
    if (fieldRef.errors?.['minlength']) {
      return `${field.label} must be at least ${field.minLength} characters.`;
    }
    
    if (fieldRef.errors?.['maxlength']) {
      return `${field.label} must not exceed ${field.maxLength} characters.`;
    }
    
    if (fieldRef.errors?.['pattern']) {
      return `${field.label} format is invalid.`;
    }

    return 'This field is invalid.';
  }

  onFileChange(event: Event, fieldName: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const fileNames = Array.from(input.files).map(f => f.name).join(', ');
      this.selectedFiles.update(files => ({
        ...files,
        [fieldName]: fileNames
      }));
    }
  }

  async onReactiveSubmit() {
    if (this.reactiveForm().valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      
      try {
        // Simulate async submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const formData = this.reactiveForm().value;
        this.formSubmit.emit({
          data: formData,
          isValid: true,
        });
        
        this.showSuccess.set(true);
        this.reactiveForm().reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccess.set(false);
        }, 5000);
        
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        this.isSubmitting.set(false);
      }
    }
  }

  async onTemplateSubmit(form: NgForm) {
    if (form.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      
      try {
        // Simulate async submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        this.formSubmit.emit({
          data: this.templateData(),
          isValid: true,
        });
        
        this.showSuccess.set(true);
        form.resetForm();
        this.initializeTemplateData();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccess.set(false);
        }, 5000);
        
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        this.isSubmitting.set(false);
      }
    }
  }

  trackByFieldName(index: number, field: ContactFormField): string {
    return field.name;
  }
}
