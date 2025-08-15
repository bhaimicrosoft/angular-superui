# Newsletter Signup Block

Professional email collection forms with social proof, privacy compliance, and multiple styling options. Build conversion-optimized newsletter signup forms with subscriber counts, testimonials, and GDPR compliance.

## Installation

### CLI (Recommended)

```bash
npx @angular-superui/cli add newsletter-signup
```

### Manual Installation

```bash
# Install the package
npm install @angular-superui/lib

# Add to your Angular component
import { NewsletterSignup } from '@angular-superui/lib';
```

## Basic Usage

### Simple Newsletter Signup

```typescript
import { Component } from '@angular/core';
import { NewsletterSignup, NewsletterConfig } from '@angular-superui/lib';

@Component({
  template: `
    <NewsletterSignup
      [config]="newsletterConfig"
      (newsletterSubmit)="onSubmit($event)"
    />
  `,
  imports: [NewsletterSignup]
})
export class NewsletterExample {
  newsletterConfig: NewsletterConfig = {
    title: 'Stay Updated',
    subtitle: 'Get the latest news delivered to your inbox',
    fields: [
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter your email address',
        required: true,
      },
    ],
    submitText: 'Subscribe',
    successMessage: 'Welcome! Please check your email to confirm your subscription.',
  };

  onSubmit(event: NewsletterSubmitEvent) {
    console.log('Newsletter signup:', event.data);
    // Handle submission (e.g., send to API)
  }
}
```

### Newsletter with Social Proof

```typescript
export class SocialProofExample {
  socialProofConfig: NewsletterConfig = {
    title: 'Join Our Community',
    subtitle: 'Get exclusive content and updates',
    socialProof: {
      subscriberCount: '25,000+',
      testimonial: 'Best newsletter I\'ve ever subscribed to!',
      avatars: ['1', '2', '3', '4'], // Avatar image paths
    },
    fields: [
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter your email address',
        required: true,
      },
    ],
    showPrivacyConsent: true,
    submitText: 'Join the Community',
    successMessage: 'Welcome to the community!',
  };
}
```

### Newsletter with Preferences

```typescript
export class PreferencesExample {
  preferencesConfig: NewsletterConfig = {
    title: 'Customize Your Experience',
    subtitle: 'Choose what you want to hear about',
    fields: [
      {
        name: 'name',
        label: 'First Name',
        type: 'text',
        placeholder: 'Enter your first name',
        required: true,
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter your email address',
        required: true,
      },
      {
        name: 'interests',
        label: 'What interests you most?',
        type: 'select',
        placeholder: 'Select your interests',
        required: true,
        options: [
          { label: 'Technology News', value: 'tech' },
          { label: 'Product Updates', value: 'products' },
          { label: 'Industry Insights', value: 'industry' },
          { label: 'Company News', value: 'company' },
        ],
      },
      {
        name: 'frequency',
        label: 'How often would you like to hear from us?',
        type: 'select',
        placeholder: 'Select frequency',
        required: true,
        options: [
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' },
        ],
      },
    ],
    features: [
      'Personalized content based on your interests',
      'Weekly industry insights and trends',
      'Early access to new features',
    ],
    showPrivacyConsent: true,
    submitText: 'Customize & Subscribe',
    successMessage: 'Perfect! Your preferences have been saved.',
  };
}
```

## API Reference

### NewsletterSignup

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'card' \| 'inline' \| 'floating' \| 'minimal'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the form |
| `config` | `NewsletterConfig` | - | Newsletter configuration object |
| `disabled` | `boolean` | `false` | Whether the form is disabled |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `newsletterSubmit` | `NewsletterSubmitEvent` | Emitted when form is submitted |

### NewsletterConfig

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | `string` | ✅ | Newsletter title |
| `subtitle` | `string` | ❌ | Newsletter subtitle |
| `description` | `string` | ❌ | Newsletter description |
| `mode` | `'reactive' \| 'template'` | ❌ | Form implementation mode |
| `fields` | `NewsletterField[]` | ✅ | Form fields configuration |
| `socialProof` | `SocialProof` | ❌ | Social proof elements |
| `features` | `string[]` | ❌ | Feature highlights |
| `showPrivacyConsent` | `boolean` | ❌ | Show privacy consent checkbox |
| `privacyText` | `string` | ❌ | Custom privacy consent text |
| `submitText` | `string` | ❌ | Submit button text |
| `successMessage` | `string` | ❌ | Success feedback message |

### NewsletterField

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | ✅ | Field name |
| `label` | `string` | ✅ | Field label |
| `type` | `'text' \| 'email' \| 'select' \| 'checkbox'` | ✅ | Field type |
| `placeholder` | `string` | ❌ | Field placeholder |
| `required` | `boolean` | ❌ | Whether field is required |
| `helpText` | `string` | ❌ | Help text below field |
| `options` | `SelectOption[]` | ❌ | Options for select fields |

### SocialProof

| Property | Type | Description |
|----------|------|-------------|
| `subscriberCount` | `string` | Number of subscribers display |
| `testimonial` | `string` | Customer testimonial |
| `avatars` | `string[]` | Array of avatar image paths |

### NewsletterSubmitEvent

| Property | Type | Description |
|----------|------|-------------|
| `data` | `Record<string, any>` | Form data submitted |
| `valid` | `boolean` | Whether form is valid |

## Styling and Variants

### Variants

```html
<!-- Default card style -->
<NewsletterSignup variant="default" />

<!-- Card with border and shadow -->
<NewsletterSignup variant="card" />

<!-- Inline horizontal layout -->
<NewsletterSignup variant="inline" />

<!-- Floating popup style -->
<NewsletterSignup variant="floating" />

<!-- Minimal design -->
<NewsletterSignup variant="minimal" />
```

### Sizes

```html
<!-- Small form -->
<NewsletterSignup size="sm" />

<!-- Medium form (default) -->
<NewsletterSignup size="md" />

<!-- Large form -->
<NewsletterSignup size="lg" />
```

### Custom Styling

```typescript
// Custom CSS classes can be applied through configuration
export class CustomStyling {
  customConfig: NewsletterConfig = {
    title: 'Custom Newsletter',
    // ... other config
    customClasses: {
      container: 'my-custom-container',
      title: 'text-blue-600',
      form: 'bg-gray-50',
    }
  };
}
```

## Advanced Examples

### Marketing Newsletter with Analytics

```typescript
export class MarketingNewsletter {
  marketingConfig: NewsletterConfig = {
    title: '🚀 Growth Marketing Weekly',
    subtitle: 'Strategies, tactics, and insights for marketers',
    description: 'Join 15,000+ marketers getting actionable growth tips every Tuesday.',
    socialProof: {
      subscriberCount: '15,000+',
      testimonial: 'The only marketing newsletter I actually read every week.',
      avatars: ['1', '2', '3', '4', '5'],
    },
    fields: [
      {
        name: 'email',
        type: 'email',
        placeholder: 'Enter your work email',
        required: true,
        helpText: 'We respect your privacy. No spam, ever.',
      },
      {
        name: 'company_size',
        label: 'Company Size',
        type: 'select',
        placeholder: 'Select company size',
        options: [
          { label: 'Just me', value: 'solo' },
          { label: '2-10 employees', value: 'small' },
          { label: '11-50 employees', value: 'medium' },
          { label: '51-200 employees', value: 'large' },
          { label: '200+ employees', value: 'enterprise' },
        ],
      },
    ],
    features: [
      'Weekly growth marketing strategies',
      'Case studies from successful campaigns',
      'Tool recommendations and reviews',
      'Industry trend analysis'
    ],
    showPrivacyConsent: true,
    privacyText: 'I agree to receive marketing emails. You can unsubscribe at any time.',
    submitText: 'Get Weekly Growth Tips',
    successMessage: 'Awesome! You\'ll receive your first newsletter this Tuesday.',
  };

  onMarketingSubmit(event: NewsletterSubmitEvent) {
    // Track with analytics
    gtag('event', 'newsletter_signup', {
      campaign: 'marketing_weekly',
      company_size: event.data.company_size
    });
    
    // Submit to your API
    this.submitToAPI(event.data);
  }
}
```

### Product Updates with Beta Testing

```typescript
export class ProductUpdates {
  productConfig: NewsletterConfig = {
    title: 'Product Updates',
    subtitle: 'Be the first to know about new features',
    fields: [
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'your@email.com',
        required: true,
      },
      {
        name: 'beta_tester',
        label: 'I\'m interested in beta testing new features',
        type: 'checkbox',
        required: false,
      },
    ],
    features: [
      'New feature announcements',
      'Product roadmap updates',
      'Beta testing opportunities',
      'Developer resources'
    ],
    submitText: 'Stay Updated',
    successMessage: 'Thanks! You\'ll be notified about all product updates.',
  };
}
```

## Form Handling

### Reactive Forms Integration

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ReactiveFormsExample {
  newsletterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      interests: [''],
    });
  }

  onSubmit(event: NewsletterSubmitEvent) {
    if (event.valid) {
      // Handle valid submission
      this.subscribeUser(event.data);
    } else {
      // Handle validation errors
      this.showValidationErrors();
    }
  }

  private subscribeUser(data: any) {
    this.http.post('/api/newsletter/subscribe', data).subscribe({
      next: (response) => console.log('Subscribed successfully', response),
      error: (error) => console.error('Subscription failed', error)
    });
  }
}
```

### Template-driven Forms

```typescript
export class TemplateDrivenExample {
  newsletterData = {
    email: '',
    name: '',
    interests: '',
    privacy_consent: false
  };

  onSubmit(event: NewsletterSubmitEvent) {
    console.log('Form data:', event.data);
    console.log('Form valid:', event.valid);
    
    if (event.valid) {
      this.processSubscription(event.data);
    }
  }
}
```

## Privacy and GDPR Compliance

### GDPR Configuration

```typescript
export class GDPRCompliant {
  gdprConfig: NewsletterConfig = {
    title: 'GDPR Compliant Newsletter',
    fields: [
      {
        name: 'email',
        type: 'email',
        required: true,
      }
    ],
    showPrivacyConsent: true,
    privacyText: 'I consent to receiving marketing emails and understand I can unsubscribe at any time. View our Privacy Policy.',
    showUnsubscribeNotice: true,
    unsubscribeText: 'You can unsubscribe at any time by clicking the link in any email.',
    dataProcessingInfo: 'Your data will be processed according to our Privacy Policy and GDPR regulations.',
  };
}
```

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations
- **Error Announcements**: Screen reader announcements for validation errors
- **Form Labels**: Proper form labeling and descriptions

## Best Practices

### Conversion Optimization

1. **Keep it simple**: Start with email-only, add fields gradually
2. **Use social proof**: Show subscriber counts and testimonials
3. **Clear value proposition**: Explain what subscribers will receive
4. **Privacy assurance**: Address privacy concerns upfront
5. **Mobile optimization**: Ensure forms work well on mobile devices

### Performance

1. **Lazy loading**: Load newsletter forms when needed
2. **Form validation**: Validate on client-side before submission
3. **Error handling**: Provide clear error messages
4. **Loading states**: Show loading indicators during submission

### Data Handling

1. **Validation**: Always validate email addresses
2. **Double opt-in**: Implement email confirmation
3. **Unsubscribe**: Provide easy unsubscribe options
4. **Data retention**: Follow data retention policies

## Troubleshooting

### Common Issues

#### Form not submitting

- Check that all required fields are filled
- Verify email format validation
- Ensure form is not disabled

#### Styling not applied

- Verify TailwindCSS is properly configured
- Check for conflicting CSS classes
- Ensure dark mode classes are included

#### TypeScript errors

- Import all required types
- Check NewsletterConfig interface compliance
- Verify event handler signatures

#### Accessibility warnings

- Ensure all form fields have labels
- Check ARIA attributes are properly set
- Verify color contrast ratios

### Debug Mode

```typescript
// Enable debug mode for detailed logging
export class Debug {
  debugConfig: NewsletterConfig = {
    // ... your config
    debug: true, // Enables console logging
  };
}
```

## Integration Examples

### Email Service Integration

```typescript
// Mailchimp integration
export class MailchimpIntegration {
  async onSubmit(event: NewsletterSubmitEvent) {
    try {
      await this.mailchimpService.addSubscriber({
        email: event.data.email,
        merge_fields: {
          FNAME: event.data.name,
          INTERESTS: event.data.interests
        }
      });
    } catch (error) {
      console.error('Mailchimp subscription failed:', error);
    }
  }
}

// ConvertKit integration
export class ConvertKitIntegration {
  async onSubmit(event: NewsletterSubmitEvent) {
    await this.convertKitService.subscribe({
      email: event.data.email,
      tags: [event.data.interests],
      custom_fields: {
        company_size: event.data.company_size
      }
    });
  }
}
```

## Related Components

- [Contact Form](./contact-form.md) - Full contact forms with file uploads
- [Auth Forms](./auth-forms.md) - Authentication and registration forms
- [Input](../components/input.md) - Basic input component
- [Button](../components/button.md) - Button component
- [Card](../components/card.md) - Card layout component

## Examples Repository

Find more examples and use cases in our [GitHub repository](https://github.com/bhaimicrosoft/angular-superui/tree/main/examples/newsletter-signup).

---

**Need help?** Join our [Discord community](https://discord.gg/angular-superui) or open an issue on [GitHub](https://github.com/bhaimicrosoft/angular-superui/issues).
