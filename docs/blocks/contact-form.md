# Contact Form Block 📧

Professional contact forms with comprehensive validation, multiple design variants, and file upload capabilities. Create beautiful, accessible contact experiences that convert visitors into leads and provide seamless communication channels.

## Features

- 📝 **Multiple Form Types** - Basic contact, business inquiry, support requests, and newsletter signup
- 🎨 **5 Design Variants** - Default, card, bordered, minimal, and gradient styles  
- 🔧 **6 Field Variants** - Default, floating, outlined, filled, and underlined field styles
- ✅ **Smart Validation** - Real-time validation with custom error messages
- 📎 **File Upload Support** - Multiple file selection with type restrictions
- 🔒 **Privacy & Security** - Privacy consent checkboxes and CAPTCHA integration
- ♿ **Accessibility First** - Full ARIA support and keyboard navigation
- 📱 **Mobile Responsive** - Perfect experience on all devices
- 🌙 **Dark Mode Ready** - Complete dark mode support
- ⚡ **Dual Form Support** - Both reactive and template-driven forms
- 🎯 **Signal-Based** - Uses Angular 20 signals for optimal performance
- 🎭 **Smooth Animations** - Beautiful transitions and loading states

## Installation

Add the Contact Form Block component to your project:

```bash
npx ngsui-cli add block contact-form
```

## Basic Usage

### Simple Contact Form

```typescript
import { Component, signal } from '@angular/core';
import { ContactForm, ContactFormConfig, ContactFormSubmitEvent } from '@lib/blocks/contact-form';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ContactForm],
  template: `
    <div class="max-w-2xl mx-auto p-6">
      <ContactForm
        [variant]="'card'"
        [fieldVariant]="'default'"
        [config]="contactConfig()"
        (formSubmit)="onSubmit($event)"
      />
    </div>
  `
})
export class ContactPageComponent {
  contactConfig = signal<ContactFormConfig>({
    title: 'Get in Touch',
    subtitle: 'We\'d love to hear from you',
    description: 'Send us a message and we\'ll respond as soon as possible.',
    mode: 'reactive',
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

  onSubmit(event: ContactFormSubmitEvent) {
    if (event.isValid) {
      console.log('Form submitted:', event.data);
      // Process form submission
      this.submitToServer(event.data);
    }
  }

  private async submitToServer(data: any) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      // Handle response
    } catch (error) {
      console.error('Submission error:', error);
    }
  }
}
```

## Design Variants

### Card Style (Recommended)
```typescript
<ContactForm variant="card" [config]="config" />
```
Creates a beautiful card with shadow and border - perfect for landing pages.

### Bordered Style
```typescript
<ContactForm variant="bordered" [config]="config" />
```
Prominent border styling that stands out on any background.

### Minimal Style
```typescript
<ContactForm variant="minimal" [config]="config" />
```
Clean, minimal design without background or borders.

### Gradient Style
```typescript
<ContactForm variant="gradient" [config]="config" />
```
Eye-catching gradient background for modern designs.

### Default Style
```typescript
<ContactForm variant="default" [config]="config" />
```
Standard form styling that works everywhere.

## Field Variants

### Floating Labels
```typescript
<ContactForm fieldVariant="floating" [config]="config" />
```
Labels that elegantly float above inputs when focused.

### Outlined Fields
```typescript
<ContactForm fieldVariant="outlined" [config]="config" />
```
Material Design inspired outlined fields.

### Filled Fields
```typescript
<ContactForm fieldVariant="filled" [config]="config" />
```
Fields with filled background for better visual hierarchy.

### Underlined Fields
```typescript
<ContactForm fieldVariant="underlined" [config]="config" />
```
Minimalist underlined style for clean designs.

## Advanced Examples

### Business Inquiry Form

```typescript
export class BusinessContactComponent {
  businessConfig = signal<ContactFormConfig>({
    title: 'Business Inquiry',
    subtitle: 'Let\'s discuss your project',
    mode: 'reactive',
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
    showPrivacyConsent: true,
    submitText: 'Submit Inquiry',
    successMessage: 'Your business inquiry has been submitted. We\'ll contact you within 24 hours.',
  });
}
```

### Support Request Form

```typescript
export class SupportFormComponent {
  supportConfig = signal<ContactFormConfig>({
    title: 'Support Request',
    subtitle: 'We\'re here to help',
    mode: 'reactive',
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
      {
        name: 'attachment',
        label: 'Attachments',
        type: 'file',
        placeholder: 'Choose files to upload',
        required: false,
        accept: '.txt,.pdf,.png,.jpg,.jpeg,.doc,.docx',
        multiple: true,
        helpText: 'Screenshots or logs (optional). Max 5MB per file.',
      },
    ],
    submitText: 'Submit Request',
    successMessage: 'Your support request has been submitted. You\'ll receive a confirmation email shortly.',
  });
}
```

### File Upload Form

```typescript
export class FileUploadContactComponent {
  fileUploadConfig = signal<ContactFormConfig>({
    title: 'Contact with Attachments',
    subtitle: 'Send files along with your message',
    mode: 'reactive',
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
}
```

### Newsletter Signup

```typescript
export class NewsletterComponent {
  newsletterConfig = signal<ContactFormConfig>({
    title: 'Stay Updated',
    subtitle: 'Subscribe to our newsletter',
    description: 'Get the latest updates and exclusive content delivered to your inbox.',
    mode: 'reactive',
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
}
```

## Template-Driven Forms

If you prefer template-driven forms over reactive forms:

```typescript
export class TemplateContactComponent {
  templateConfig = signal<ContactFormConfig>({
    title: 'Contact Us',
    mode: 'template', // Use template-driven forms
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        required: true,
        placeholder: 'Your name'
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        placeholder: 'your@email.com'
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        required: true,
        rows: 4,
        placeholder: 'Your message...'
      }
    ],
    submitText: 'Send Message'
  });

  onSubmit(event: ContactFormSubmitEvent) {
    console.log('Template form submitted:', event);
  }
}
```

## API Reference

### ContactForm Component

#### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `ContactFormVariant` | `'default'` | Visual style variant |
| `fieldVariant` | `ContactFieldVariant` | `'default'` | Field styling variant |
| `config` | `ContactFormConfig` | `required` | Form configuration object |

#### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `formSubmit` | `ContactFormSubmitEvent` | Emitted when form is successfully submitted |

### ContactFormConfig Interface

```typescript
interface ContactFormConfig {
  title?: string;              // Form title
  subtitle?: string;           // Form subtitle  
  description?: string;        // Form description
  fields: ContactFormField[];  // Array of form fields
  submitText?: string;         // Submit button text
  showCaptcha?: boolean;       // Show captcha placeholder
  showPrivacyConsent?: boolean; // Show privacy consent checkbox
  privacyText?: string;        // Privacy consent text
  successMessage?: string;     // Success message after submission
  mode?: 'reactive' | 'template'; // Form mode (default: 'reactive')
}
```

### ContactFormField Interface

```typescript
interface ContactFormField {
  name: string;               // Field name (form control name)
  label: string;              // Field label
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'file';
  placeholder?: string;       // Field placeholder
  required?: boolean;         // Whether field is required
  minLength?: number;         // Minimum length validation
  maxLength?: number;         // Maximum length validation
  rows?: number;              // Rows for textarea (default: 4)
  pattern?: string;           // Regex pattern validation
  helpText?: string;          // Help text displayed below field
  icon?: string;              // Icon HTML/SVG
  options?: Array<{           // Options for select dropdown
    label: string; 
    value: any;
  }>;
  accept?: string;            // Accepted file types for file input
  multiple?: boolean;         // Allow multiple file selection
}
```

### ContactFormSubmitEvent Interface

```typescript
interface ContactFormSubmitEvent {
  data: any;          // Form data object
  isValid: boolean;   // Form validation status
  files?: FileList;   // Uploaded files (if any)
}
```

### Type Definitions

```typescript
type ContactFormVariant = 'default' | 'card' | 'bordered' | 'minimal' | 'gradient';
type ContactFieldVariant = 'default' | 'floating' | 'outlined' | 'filled' | 'underlined';
type ContactFormMode = 'reactive' | 'template';
```

## Field Types Reference

### Text Input
```typescript
{
  name: 'firstName',
  label: 'First Name', 
  type: 'text',
  required: true,
  minLength: 2,
  maxLength: 50,
  placeholder: 'Enter your first name',
  pattern: '[a-zA-Z\\s]+' // Letters and spaces only
}
```

### Email Input
```typescript
{
  name: 'email',
  label: 'Email Address',
  type: 'email',
  required: true,
  placeholder: 'your.email@example.com',
  helpText: 'We\'ll never share your email'
}
```

### Phone Input
```typescript
{
  name: 'phone',
  label: 'Phone Number',
  type: 'tel',
  placeholder: '+1 (555) 123-4567',
  pattern: '[+]?[0-9\\s\\-\\(\\)]+',
  helpText: 'Include country code if international'
}
```

### Textarea
```typescript
{
  name: 'message',
  label: 'Message',
  type: 'textarea',
  required: true,
  rows: 5,
  minLength: 10,
  maxLength: 1000,
  placeholder: 'Tell us about your project...',
  helpText: 'Minimum 10 characters required'
}
```

### Select Dropdown
```typescript
{
  name: 'subject',
  label: 'Subject',
  type: 'select',
  required: true,
  placeholder: 'Choose a subject',
  options: [
    { label: 'General Inquiry', value: 'general' },
    { label: 'Support Request', value: 'support' },
    { label: 'Business Partnership', value: 'business' },
    { label: 'Media Inquiry', value: 'media' }
  ]
}
```

### Checkbox
```typescript
{
  name: 'newsletter',
  label: 'Subscribe to our newsletter for updates',
  type: 'checkbox',
  required: false,
  helpText: 'You can unsubscribe at any time'
}
```

### File Upload
```typescript
{
  name: 'attachment',
  label: 'Attachments',
  type: 'file',
  placeholder: 'Choose files',
  accept: '.pdf,.doc,.docx,.txt,.jpg,.png',
  multiple: true,
  helpText: 'PDF, DOC, DOCX, TXT, JPG, PNG files only. Max 5MB each.'
}
```

## Validation

### Built-in Validators

- **Required**: `required: true`
- **Email**: Automatic with `type: 'email'`
- **Min Length**: `minLength: number`
- **Max Length**: `maxLength: number`
- **Pattern**: `pattern: string` (regex)

### Custom Error Messages

The component automatically generates contextual error messages:

```typescript
// Automatic error messages based on validation
'Name is required.'
'Please enter a valid email address.'
'Message must be at least 10 characters.'
'Message must not exceed 500 characters.'
'Please enter a valid phone number.'
```

### Real-time Validation

Validation occurs in real-time as users interact with fields:

- **On Focus**: Field gains focus indicator
- **On Blur**: Validation runs when field loses focus
- **On Change**: Validation updates as user types
- **On Submit**: Full form validation before submission

## Styling & Customization

### Custom CSS Classes

```typescript
@Component({
  template: `
    <ContactForm 
      variant="card"
      fieldVariant="floating"
      [config]="config"
      class="max-w-lg mx-auto shadow-2xl"
    />
  `
})
```

### Responsive Design

```typescript
@Component({
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="grid md:grid-cols-2 gap-8">
        <div class="space-y-4">
          <h2 class="text-2xl font-bold">Get in Touch</h2>
          <p class="text-gray-600">We'd love to hear from you.</p>
        </div>
        
        <ContactForm
          variant="bordered"
          fieldVariant="outlined"
          [config]="config"
          class="bg-white rounded-lg p-6"
        />
      </div>
    </div>
  `
})
```

### Dark Mode Support

The contact form automatically adapts to dark mode:

```typescript
// Automatic dark mode classes are applied
'bg-white dark:bg-gray-800'
'text-gray-900 dark:text-gray-100'
'border-gray-300 dark:border-gray-600'
```

### Custom Form Layout

```typescript
@Component({
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div class="container mx-auto px-4 py-16">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Our Team
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            Ready to start your project? Let's talk!
          </p>
        </div>
        
        <ContactForm
          variant="gradient"
          fieldVariant="floating"
          [config]="config"
          class="max-w-2xl mx-auto"
        />
      </div>
    </div>
  `
})
```

## Best Practices

### Form Design

- **Keep it Simple**: Only ask for essential information
- **Clear Labels**: Use descriptive, actionable labels
- **Logical Flow**: Order fields in a logical sequence
- **Visual Hierarchy**: Use spacing and typography effectively
- **Progress Indication**: Show completion progress for long forms

### User Experience

- **Immediate Feedback**: Provide real-time validation
- **Error Prevention**: Use input constraints and helpful text
- **Success Confirmation**: Always confirm successful submissions
- **Loading States**: Show progress during submission
- **Mobile Optimization**: Ensure great mobile experience

### Accessibility

- **Keyboard Navigation**: Ensure all functionality works with keyboard
- **Screen Readers**: Provide proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators and logical tab order
- **Error Announcements**: Announce validation errors to screen readers
- **Color Contrast**: Ensure sufficient contrast for all text

### Performance

- **Lazy Loading**: Load form components only when needed
- **Debounced Validation**: Avoid excessive validation calls
- **Optimized Bundles**: Tree-shake unused form features
- **Memory Management**: Properly clean up subscriptions
- **Image Optimization**: Optimize any icons or images

### Security

- **Input Sanitization**: Always sanitize user input on the server
- **CSRF Protection**: Implement CSRF tokens for form submissions
- **Rate Limiting**: Prevent spam with rate limiting
- **File Validation**: Validate file types and sizes on both client and server
- **Privacy Compliance**: Ensure GDPR/privacy regulation compliance

### Conversion Optimization

- **A/B Testing**: Test different variants and layouts
- **Social Proof**: Include testimonials or trust indicators nearby
- **Reduced Friction**: Minimize required fields
- **Mobile-First**: Optimize for mobile users
- **Clear Value Proposition**: Explain why users should contact you

## Troubleshooting

### Common Issues

**Form not submitting:**
- Check that all required fields are filled
- Verify form validation is passing
- Ensure `onSubmit` handler is properly bound

**Validation not working:**
- Confirm field configuration is correct
- Check that validators are properly set
- Verify reactive form setup

**Styling issues:**
- Ensure TailwindCSS is properly configured
- Check for CSS conflicts
- Verify dark mode classes are working

**File upload not working:**
- Check `accept` attribute configuration
- Verify file size limits
- Ensure proper error handling

### Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Optimization

```typescript
// Lazy load the contact form
const ContactForm = lazy(() => import('@lib/blocks/contact-form'));

// Use OnPush change detection
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
```

## Examples Repository

Find more examples and implementation details in our showcase:
- [Basic Contact Form](https://angular-superui.vercel.app/blocks/contact-form)
- [Business Inquiry Form](https://angular-superui.vercel.app/blocks/contact-form)
- [Support Request Form](https://angular-superui.vercel.app/blocks/contact-form)
- [Newsletter Signup](https://angular-superui.vercel.app/blocks/contact-form)

---

## Resources

- 📚 **[Component Documentation](https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/blocks/contact-form.md)**
- 🚀 **[Live Demo](https://angular-superui.vercel.app/blocks/contact-form)**
- 💻 **[Source Code](https://github.com/bhaimicrosoft/angular-superui)**
- 🎨 **[Design System](https://angular-superui.vercel.app)**
- 📖 **[Getting Started Guide](https://github.com/bhaimicrosoft/angular-superui#getting-started)**

Ready to create amazing contact forms? **[Get started now!](https://angular-superui.vercel.app/blocks/contact-form)**
