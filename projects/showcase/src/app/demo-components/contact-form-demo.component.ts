import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactForm, ContactFormConfig, ContactFormSubmitEvent } from '@lib/blocks/contact-form';

@Component({
  selector: 'app-contact-form-demo',
  standalone: true,
  imports: [CommonModule, ContactForm],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Form Block
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive contact form component with multiple variants, field types, validation, and customizable styling.
          </p>
        </div>

        <!-- Form Mode Toggle -->
        <div class="flex justify-center mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700">
            <button
              (click)="toggleFormMode()"
              class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
              [class]="formMode() === 'reactive' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
            >
              Reactive Forms
            </button>
            <button
              (click)="toggleFormMode()"
              class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
              [class]="formMode() === 'template' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
            >
              Template-driven
            </button>
          </div>
        </div>

        <!-- Variant Selector -->
        <div class="flex flex-wrap justify-center gap-2 mb-8">
          <button
            *ngFor="let variant of variants"
            (click)="setVariant(variant)"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            [class]="selectedVariant() === variant 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'"
          >
            {{ variant | titlecase }}
          </button>
        </div>

        <!-- Field Variant Selector -->
        <div class="flex flex-wrap justify-center gap-2 mb-12">
          <button
            *ngFor="let fieldVariant of fieldVariants"
            (click)="setFieldVariant(fieldVariant)"
            class="px-3 py-1 rounded-md text-xs font-medium transition-all duration-200"
            [class]="selectedFieldVariant() === fieldVariant 
              ? 'bg-green-600 text-white shadow-sm' 
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'"
          >
            {{ fieldVariant | titlecase }} Fields
          </button>
        </div>

        <!-- Demo Forms Grid -->
        <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          <!-- Basic Contact Form -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Basic Contact Form
            </h3>
            <ContactForm
              [variant]="selectedVariant()"
              [fieldVariant]="selectedFieldVariant()"
              [config]="basicContactConfig()"
              (formSubmit)="onFormSubmit($event, 'Basic Contact')"
            />
          </div>

          <!-- Business Contact Form -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Business Contact Form
            </h3>
            <ContactForm
              [variant]="selectedVariant()"
              [fieldVariant]="selectedFieldVariant()"
              [config]="businessContactConfig()"
              (formSubmit)="onFormSubmit($event, 'Business Contact')"
            />
          </div>

          <!-- Support Request Form -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Support Request Form
            </h3>
            <ContactForm
              [variant]="selectedVariant()"
              [fieldVariant]="selectedFieldVariant()"
              [config]="supportRequestConfig()"
              (formSubmit)="onFormSubmit($event, 'Support Request')"
            />
          </div>
        </div>

        <!-- Feature Showcase -->
        <div class="grid md:grid-cols-2 gap-8 mb-16">
          <!-- With File Upload -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              With File Upload & Privacy
            </h3>
            <ContactForm
              [variant]="selectedVariant()"
              [fieldVariant]="selectedFieldVariant()"
              [config]="fileUploadContactConfig()"
              (formSubmit)="onFormSubmit($event, 'File Upload Contact')"
            />
          </div>

          <!-- Custom Styled -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Newsletter Subscribe
            </h3>
            <ContactForm
              [variant]="selectedVariant()"
              [fieldVariant]="selectedFieldVariant()"
              [config]="newsletterConfig()"
              (formSubmit)="onFormSubmit($event, 'Newsletter')"
            />
          </div>
        </div>

        <!-- Submission Log -->
        <div *ngIf="submissions().length > 0" class="mt-16">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Form Submissions
          </h3>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div class="space-y-4">
              <div
                *ngFor="let submission of submissions(); let i = index"
                class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium text-gray-900 dark:text-white">
                    {{ submission.formType }}
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    {{ submission.timestamp | date:'medium' }}
                  </span>
                </div>
                <pre class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{{ submission.data | json }}</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- Features List -->
        <div class="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Contact Form Features
          </h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Form Types</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Basic contact forms</li>
                <li>• Business inquiries</li>
                <li>• Support requests</li>
                <li>• Newsletter signups</li>
                <li>• Custom configurations</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Field Types</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Text input fields</li>
                <li>• Email validation</li>
                <li>• Textarea for messages</li>
                <li>• Select dropdowns</li>
                <li>• File uploads</li>
                <li>• Checkboxes</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Validation</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Required fields</li>
                <li>• Email format validation</li>
                <li>• Min/max length</li>
                <li>• Pattern matching</li>
                <li>• Real-time feedback</li>
                <li>• Accessibility compliance</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Styling</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Multiple form variants</li>
                <li>• Field style options</li>
                <li>• Dark mode support</li>
                <li>• Responsive design</li>
                <li>• Smooth animations</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Features</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Privacy consent</li>
                <li>• Captcha support</li>
                <li>• Loading states</li>
                <li>• Success messages</li>
                <li>• Error handling</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Technology</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Angular 20 signals</li>
                <li>• Reactive forms</li>
                <li>• Template-driven forms</li>
                <li>• TailwindCSS styling</li>
                <li>• Accessibility features</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ContactFormDemoComponent {
  // Form mode
  formMode = signal<'reactive' | 'template'>('reactive');

  // Variant options
  variants = ['default', 'card', 'bordered', 'minimal', 'gradient'];
  fieldVariants = ['default', 'floating', 'outlined', 'filled', 'underlined'];
  
  // Selected variants
  selectedVariant = signal<'default' | 'card' | 'bordered' | 'minimal' | 'gradient'>('card');
  selectedFieldVariant = signal<'default' | 'floating' | 'outlined' | 'filled' | 'underlined'>('default');

  // Submissions log
  submissions = signal<Array<{ formType: string; data: any; timestamp: Date }>>([]);

  // Form configurations
  basicContactConfig = signal<ContactFormConfig>({
    title: 'Get in Touch',
    subtitle: 'We\'d love to hear from you',
    description: 'Send us a message and we\'ll respond as soon as possible.',
    mode: this.formMode(),
    fields: [
      {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'Enter your full name',
        required: true,
        minLength: 2,
        maxLength: 50,
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter your email',
        required: true,
        helpText: 'We\'ll never share your email with anyone else.',
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Tell us what you\'re thinking about...',
        required: true,
        minLength: 10,
        maxLength: 500,
        rows: 4,
        helpText: 'Minimum 10 characters required.',
      },
    ],
    submitText: 'Send Message',
    successMessage: 'Thank you for your message! We\'ll get back to you soon.',
  });

  businessContactConfig = signal<ContactFormConfig>({
    title: 'Business Inquiry',
    subtitle: 'Let\'s discuss your project',
    mode: this.formMode(),
    fields: [
      {
        name: 'companyName',
        label: 'Company Name',
        type: 'text',
        placeholder: 'Your company name',
        required: true,
      },
      {
        name: 'contactPerson',
        label: 'Contact Person',
        type: 'text',
        placeholder: 'Your full name',
        required: true,
      },
      {
        name: 'email',
        label: 'Business Email',
        type: 'email',
        placeholder: 'your.email@company.com',
        required: true,
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: '+1 (555) 123-4567',
        required: false,
      },
      {
        name: 'projectType',
        label: 'Project Type',
        type: 'select',
        required: true,
        options: [
          { label: 'Web Development', value: 'web' },
          { label: 'Mobile App', value: 'mobile' },
          { label: 'Consulting', value: 'consulting' },
          { label: 'Other', value: 'other' },
        ],
      },
      {
        name: 'budget',
        label: 'Budget Range',
        type: 'select',
        required: false,
        options: [
          { label: 'Under $10,000', value: 'under-10k' },
          { label: '$10,000 - $50,000', value: '10k-50k' },
          { label: '$50,000 - $100,000', value: '50k-100k' },
          { label: 'Over $100,000', value: 'over-100k' },
        ],
      },
      {
        name: 'details',
        label: 'Project Details',
        type: 'textarea',
        placeholder: 'Please describe your project requirements...',
        required: true,
        rows: 5,
      },
    ],
    submitText: 'Submit Inquiry',
    successMessage: 'Your business inquiry has been submitted. We\'ll contact you within 24 hours.',
  });

  supportRequestConfig = signal<ContactFormConfig>({
    title: 'Support Request',
    subtitle: 'We\'re here to help',
    mode: this.formMode(),
    fields: [
      {
        name: 'name',
        label: 'Your Name',
        type: 'text',
        placeholder: 'Enter your name',
        required: true,
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'your.email@example.com',
        required: true,
      },
      {
        name: 'priority',
        label: 'Priority Level',
        type: 'select',
        required: true,
        options: [
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
          { label: 'Critical', value: 'critical' },
        ],
      },
      {
        name: 'category',
        label: 'Issue Category',
        type: 'select',
        required: true,
        options: [
          { label: 'Technical Issue', value: 'technical' },
          { label: 'Billing Question', value: 'billing' },
          { label: 'Feature Request', value: 'feature' },
          { label: 'Bug Report', value: 'bug' },
          { label: 'Other', value: 'other' },
        ],
      },
      {
        name: 'subject',
        label: 'Subject',
        type: 'text',
        placeholder: 'Brief description of the issue',
        required: true,
        maxLength: 100,
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Please provide a detailed description of your issue...',
        required: true,
        minLength: 20,
        rows: 6,
        helpText: 'Please include steps to reproduce the issue if applicable.',
      },
    ],
    submitText: 'Submit Request',
    successMessage: 'Your support request has been submitted. You\'ll receive a confirmation email shortly.',
  });

  fileUploadContactConfig = signal<ContactFormConfig>({
    title: 'Contact with Attachments',
    subtitle: 'Send files along with your message',
    mode: this.formMode(),
    fields: [
      {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'Enter your name',
        required: true,
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'your.email@example.com',
        required: true,
      },
      {
        name: 'subject',
        label: 'Subject',
        type: 'text',
        placeholder: 'Message subject',
        required: true,
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Your message...',
        required: true,
        rows: 4,
      },
      {
        name: 'attachment',
        label: 'Attachments',
        type: 'file',
        placeholder: 'Choose files to upload',
        required: false,
        accept: '.pdf,.doc,.docx,.txt,.jpg,.png',
        multiple: true,
        helpText: 'Accepted formats: PDF, DOC, DOCX, TXT, JPG, PNG. Max 5MB per file.',
      },
    ],
    showPrivacyConsent: true,
    privacyText: 'I agree to the privacy policy and consent to my data being processed.',
    submitText: 'Send with Attachments',
    successMessage: 'Your message and attachments have been received successfully.',
  });

  newsletterConfig = signal<ContactFormConfig>({
    title: 'Stay Updated',
    subtitle: 'Subscribe to our newsletter',
    description: 'Get the latest updates and exclusive content delivered to your inbox.',
    mode: this.formMode(),
    fields: [
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter your email address',
        required: true,
      },
      {
        name: 'interests',
        label: 'Interests',
        type: 'select',
        placeholder: 'Select your interests',
        required: false,
        options: [
          { label: 'Technology News', value: 'tech' },
          { label: 'Product Updates', value: 'products' },
          { label: 'Industry Insights', value: 'industry' },
          { label: 'All of the above', value: 'all' },
        ],
      },
      {
        name: 'marketing',
        label: 'I agree to receive marketing communications',
        type: 'checkbox',
        required: true,
      },
    ],
    submitText: 'Subscribe',
    successMessage: 'Welcome aboard! Check your email to confirm your subscription.',
  });

  toggleFormMode() {
    const newMode = this.formMode() === 'reactive' ? 'template' : 'reactive';
    this.formMode.set(newMode);
    
    // Update all configs with new mode
    this.basicContactConfig.update(config => ({ ...config, mode: newMode }));
    this.businessContactConfig.update(config => ({ ...config, mode: newMode }));
    this.supportRequestConfig.update(config => ({ ...config, mode: newMode }));
    this.fileUploadContactConfig.update(config => ({ ...config, mode: newMode }));
    this.newsletterConfig.update(config => ({ ...config, mode: newMode }));
  }

  setVariant(variant: any) {
    this.selectedVariant.set(variant);
  }

  setFieldVariant(fieldVariant: any) {
    this.selectedFieldVariant.set(fieldVariant);
  }

  onFormSubmit(event: ContactFormSubmitEvent, formType: string) {
    console.log(`${formType} form submitted:`, event);
    
    // Add to submissions log
    this.submissions.update(submissions => [
      {
        formType,
        data: event.data,
        timestamp: new Date(),
      },
      ...submissions
    ]);
  }
}
