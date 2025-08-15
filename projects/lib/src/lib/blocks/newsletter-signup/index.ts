/**
 * Newsletter Signup Component
 *
 * A comprehensive newsletter signup component that supports:
 * - Multiple layout styles: default, card, inline, floating, minimal
 * - Various field configurations: email-only, with name, with preferences
 * - Privacy consent and GDPR compliance
 * - Success states and error handling
 * - Social proof elements
 * - Accessibility features
 * - Dark mode support
 * - Animation and loading states
 * - Customizable styling and content
 */

import {
  Component,
  computed,
  input,
  OnInit,
  output,
  signal,
  forwardRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { cva } from 'class-variance-authority';

// Newsletter signup types and interfaces
export type NewsletterVariant = 'default' | 'card' | 'inline' | 'floating' | 'minimal';
export type NewsletterSize = 'sm' | 'md' | 'lg';
export type NewsletterFormMode = 'reactive' | 'template';

export interface NewsletterField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: any }[];
  helpText?: string;
}

export interface NewsletterConfig {
  title?: string;
  subtitle?: string;
  description?: string;
  fields: NewsletterField[];
  submitText?: string;
  showPrivacyConsent?: boolean;
  privacyText?: string;
  successMessage?: string;
  socialProof?: {
    subscriberCount?: string;
    testimonial?: string;
    avatars?: string[];
  };
  features?: string[];
  mode?: NewsletterFormMode;
}

export interface NewsletterSubmitEvent {
  data: any;
  isValid: boolean;
}

// Newsletter variants
const newsletterVariants = cva(
  'w-full transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700',
        card: 'bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8',
        inline: 'bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700',
        floating: 'bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8',
        minimal: 'bg-transparent p-4',
      },
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
      },
    },
    defaultVariants: {
      variant: 'card',
      size: 'md',
    },
  }
);

const inputVariants = cva(
  'w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500',
        floating: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-purple-500 focus:border-purple-500',
        minimal: 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500',
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

const buttonVariants = cva(
  'w-full px-6 py-3 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 disabled:bg-gray-400',
        floating: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white focus:ring-purple-500 disabled:bg-gray-400',
        minimal: 'bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 focus:ring-gray-500 disabled:bg-gray-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Component({
  selector: 'NewsletterSignup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NewsletterSignup),
      multi: true,
    },
  ],
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
    ]),
    trigger('pulse', [
      transition('* => *', [
        animate('1s ease-in-out', style({ transform: 'scale(1.02)' })),
        animate('1s ease-in-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ],
  template: `
    <div 
      [class]="getNewsletterVariants()({ variant: variant(), size: size() })"
      [@slideInUp]="'in'"
      class="mx-auto"
    >
      <!-- Success State -->
      <div *ngIf="showSuccess()" 
           class="text-center space-y-4"
           [@bounce]="'success'">
        <div class="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          You're all set!
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          {{ config().successMessage || 'Thank you for subscribing! Check your email to confirm your subscription.' }}
        </p>
      </div>

      <!-- Form State -->
      <div *ngIf="!showSuccess()" class="space-y-6">
        <!-- Header -->
        <div *ngIf="config().title || config().subtitle || config().description" 
             class="text-center space-y-3">
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
             class="text-sm text-gray-500 dark:text-gray-400"
             [@fadeIn]="'in'">
            {{ config().description }}
          </p>
        </div>

        <!-- Social Proof -->
        <div *ngIf="config().socialProof" 
             class="text-center space-y-3 py-4 border-b border-gray-200 dark:border-gray-700"
             [@fadeIn]="'in'">
          <!-- Subscriber Count -->
          <div *ngIf="config().socialProof?.subscriberCount" 
               class="flex items-center justify-center space-x-2">
            <div class="flex -space-x-2">
              <div *ngFor="let avatar of config().socialProof?.avatars?.slice(0, 4)" 
                   class="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gradient-to-br from-blue-400 to-purple-500">
              </div>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Join {{ config().socialProof?.subscriberCount }} subscribers
            </span>
          </div>
          
          <!-- Testimonial -->
          <div *ngIf="config().socialProof?.testimonial" 
               class="text-sm italic text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
            "{{ config().socialProof?.testimonial }}"
          </div>
        </div>

        <!-- Features List -->
        <div *ngIf="config().features && config().features!.length > 0" 
             class="space-y-2"
             [@fadeIn]="'in'">
          <div *ngFor="let feature of config().features!" 
               class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>{{ feature }}</span>
          </div>
        </div>

        <!-- Newsletter Form (Reactive) -->
        <form *ngIf="config().mode !== 'template'" 
              [formGroup]="reactiveForm()"
              (ngSubmit)="onReactiveSubmit()"
              class="space-y-4"
              novalidate>
          
          <div *ngFor="let field of config().fields || []; trackBy: trackByFieldName" 
               class="space-y-2">
            
            <!-- Text & Email Input -->
            <div *ngIf="field.type === 'text' || field.type === 'email'">
              <label *ngIf="field.label" 
                     [for]="field.name"
                     class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ field.label }}
                <span *ngIf="field.required" class="text-red-500 ml-1">*</span>
              </label>
              
              <input
                [id]="field.name"
                [formControlName]="field.name"
                [type]="field.type"
                [placeholder]="field.placeholder || ''"
                [class]="getInputVariants()({ 
                  variant: getInputVariant(), 
                  error: hasError(field.name) 
                })"
                [attr.aria-describedby]="field.helpText ? field.name + '-help' : null"
                [attr.aria-invalid]="hasError(field.name)"
              />
            </div>

            <!-- Select -->
            <div *ngIf="field.type === 'select'">
              <label [for]="field.name"
                     class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ field.label }}
                <span *ngIf="field.required" class="text-red-500 ml-1">*</span>
              </label>
              
              <select
                [id]="field.name"
                [formControlName]="field.name"
                [class]="getInputVariants()({ 
                  variant: getInputVariant(), 
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

            <!-- Checkbox -->
            <div *ngIf="field.type === 'checkbox'" class="flex items-start space-x-3">
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
               class="text-xs text-gray-500 dark:text-gray-400">
              {{ field.helpText }}
            </p>

            <!-- Error Message -->
            <p *ngIf="hasError(field.name)" 
               class="text-xs text-red-500"
               role="alert">
              {{ getErrorMessage(field.name, field) }}
            </p>
          </div>

          <!-- Privacy Consent -->
          <div *ngIf="config().showPrivacyConsent" class="flex items-start space-x-3">
            <input
              id="privacy-consent"
              formControlName="privacyConsent"
              type="checkbox"
              class="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              required
            />
            <label for="privacy-consent" class="text-xs text-gray-600 dark:text-gray-400">
              {{ config().privacyText || 'I agree to receive marketing emails and accept the privacy policy.' }}
              <span class="text-red-500 ml-1">*</span>
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="isSubmitting() || !reactiveForm().valid"
            [class]="getButtonVariants()({ variant: getButtonVariant() })"
            [attr.aria-busy]="isSubmitting()"
          >
            <span *ngIf="!isSubmitting()" class="flex items-center justify-center space-x-2">
              <span>{{ config().submitText || 'Subscribe Now' }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
            <span *ngIf="isSubmitting()" class="flex items-center justify-center space-x-2">
              <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="m12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6z"></path>
              </svg>
              <span>Subscribing...</span>
            </span>
          </button>
        </form>

        <!-- Newsletter Form (Template-driven) -->
        <form *ngIf="config().mode === 'template'"
              #templateForm="ngForm"
              (ngSubmit)="onTemplateSubmit(templateForm)"
              class="space-y-4"
              novalidate>
          
          <div *ngFor="let field of config().fields || []; trackBy: trackByFieldName" 
               class="space-y-2">
            
            <!-- Text & Email Input -->
            <div *ngIf="field.type === 'text' || field.type === 'email'">
              <label *ngIf="field.label" 
                     [for]="field.name"
                     class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                [class]="getInputVariants()({ variant: getInputVariant(), error: false })"
                #fieldRef="ngModel"
              />
              
              <p *ngIf="fieldRef.invalid && fieldRef.touched" 
                 class="text-xs text-red-500"
                 role="alert">
                {{ getTemplateErrorMessage(fieldRef, field) }}
              </p>
            </div>

            <!-- Help Text -->
            <p *ngIf="field.helpText" class="text-xs text-gray-500 dark:text-gray-400">
              {{ field.helpText }}
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="isSubmitting() || !templateForm.valid"
            [class]="getButtonVariants()({ variant: getButtonVariant() })"
          >
            <span *ngIf="!isSubmitting()">{{ config().submitText || 'Subscribe Now' }}</span>
            <span *ngIf="isSubmitting()" class="flex items-center justify-center space-x-2">
              <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="m12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6z"></path>
              </svg>
              <span>Subscribing...</span>
            </span>
          </button>
        </form>

        <!-- Footer Text -->
        <div class="text-center">
          <p class="text-xs text-gray-500 dark:text-gray-400">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  `,
})
export class NewsletterSignup implements OnInit, ControlValueAccessor {
  // Input signals
  variant = input<NewsletterVariant>('card');
  size = input<NewsletterSize>('md');
  config = input.required<NewsletterConfig>();
  disabled = input<boolean>(false);
  
  // Output signals
  newsletterSubmit = output<NewsletterSubmitEvent>();
  
  // State signals
  reactiveForm = signal<FormGroup>(new FormGroup({}));
  templateData = signal<Record<string, any>>({});
  isSubmitting = signal(false);
  showSuccess = signal(false);
  
  // ControlValueAccessor properties
  private value: any = {};
  private onChange = (value: any) => {};
  private onTouched = () => {};

  // Computed variant functions
  getNewsletterVariants = computed(() => ({ variant, size }: { variant: NewsletterVariant; size: NewsletterSize }) => newsletterVariants({ variant, size }));
  getInputVariants = computed(() => ({ variant, error }: { variant: string; error: boolean }) => inputVariants({ variant: variant as any, error }));
  getButtonVariants = computed(() => ({ variant }: { variant: string }) => buttonVariants({ variant: variant as any }));

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
      
      formConfig[field.name] = ['', validators];
    });

    // Add privacy consent if required
    if (this.config().showPrivacyConsent) {
      formConfig['privacyConsent'] = [false, Validators.requiredTrue];
    }
    
    this.reactiveForm.set(this.fb.group(formConfig));
    
    // Subscribe to form value changes for ControlValueAccessor
    this.reactiveForm().valueChanges.subscribe(value => {
      if (value && Object.keys(value).length > 0) {
        this.updateValue(value);
      }
    });
  }

  private initializeTemplateData() {
    const data: Record<string, any> = {};
    this.config().fields.forEach(field => {
      data[field.name] = '';
    });
    this.templateData.set(data);
  }

  getInputVariant(): string {
    return this.variant() === 'floating' ? 'floating' : 
           this.variant() === 'minimal' ? 'minimal' : 'default';
  }

  getButtonVariant(): string {
    return this.variant() === 'floating' ? 'floating' : 
           this.variant() === 'minimal' ? 'minimal' : 'default';
  }

  hasError(fieldName: string): boolean {
    const control = this.reactiveForm().get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(fieldName: string, field: NewsletterField): string {
    const control = this.reactiveForm().get(fieldName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) {
      return `${field.label} is required.`;
    }
    
    if (control.errors['email']) {
      return 'Please enter a valid email address.';
    }

    return 'This field is invalid.';
  }

  getTemplateErrorMessage(fieldRef: any, field: NewsletterField): string {
    if (fieldRef.errors?.['required']) {
      return `${field.label} is required.`;
    }
    
    if (fieldRef.errors?.['email']) {
      return 'Please enter a valid email address.';
    }

    return 'This field is invalid.';
  }

  async onReactiveSubmit() {
    if (this.reactiveForm().valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      
      try {
        // Simulate async submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const formData = this.reactiveForm().value;
        this.updateValue(formData);
        
        this.newsletterSubmit.emit({
          data: formData,
          isValid: true,
        });
        
        this.showSuccess.set(true);
        this.reactiveForm().reset();
        
      } catch (error) {
        console.error('Newsletter submission error:', error);
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
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const formData = this.templateData();
        this.updateValue(formData);
        
        this.newsletterSubmit.emit({
          data: formData,
          isValid: true,
        });
        
        this.showSuccess.set(true);
        form.resetForm();
        this.initializeTemplateData();
        
      } catch (error) {
        console.error('Newsletter submission error:', error);
      } finally {
        this.isSubmitting.set(false);
      }
    }
  }

  trackByFieldName(index: number, field: NewsletterField): string {
    return field.name;
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this.value = value || {};
    
    // Update reactive form if it exists
    if (this.reactiveForm() && Object.keys(this.reactiveForm().controls).length > 0) {
      this.reactiveForm().patchValue(this.value, { emitEvent: false });
    }
    
    // Update template data
    this.templateData.set({ ...this.value });
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.reactiveForm() && Object.keys(this.reactiveForm().controls).length > 0) {
      if (isDisabled) {
        this.reactiveForm().disable();
      } else {
        this.reactiveForm().enable();
      }
    }
  }

  private updateValue(newValue: any): void {
    this.value = { ...this.value, ...newValue };
    this.onChange(this.value);
    this.onTouched();
  }
}
