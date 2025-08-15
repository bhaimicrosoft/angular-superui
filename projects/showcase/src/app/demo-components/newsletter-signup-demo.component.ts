import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterSignup, NewsletterConfig, NewsletterSubmitEvent } from '@lib/blocks/newsletter-signup';

@Component({
  selector: 'app-newsletter-signup-demo',
  standalone: true,
  imports: [CommonModule, NewsletterSignup],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Newsletter Signup Block
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Beautiful email collection forms with social proof, privacy compliance, and multiple styling options.
          </p>

        </div>

        <!-- Form Mode Toggle -->
        <div class="flex justify-center mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700">
            <button
              (click)="toggleFormMode()"
              class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
              [class]="formMode() === 'reactive'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
            >
              Reactive Forms
            </button>
            <button
              (click)="toggleFormMode()"
              class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
              [class]="formMode() === 'template'
                ? 'bg-purple-600 text-white shadow-sm'
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
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'"
          >
            {{ variant | titlecase }}
          </button>
        </div>

        <!-- Size Selector -->
        <div class="flex justify-center gap-2 mb-12">
          <button
            *ngFor="let size of sizes"
            (click)="setSize(size)"
            class="px-3 py-1 rounded-md text-xs font-medium transition-all duration-200"
            [class]="selectedSize() === size
              ? 'bg-pink-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'"
          >
            {{ size.toUpperCase() }}
          </button>
        </div>

        <!-- Demo Forms Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          <!-- Simple Newsletter -->
          <div class="flex flex-col items-center space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Simple Newsletter
            </h3>
            <NewsletterSignup
              [variant]="selectedVariant()"
              [size]="selectedSize()"
              [config]="simpleNewsletterConfig()"
              (newsletterSubmit)="onNewsletterSubmit($event, 'Simple Newsletter')"
            />
          </div>

          <!-- Newsletter with Social Proof -->
          <div class="flex flex-col items-center space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              With Social Proof
            </h3>
            <NewsletterSignup
              [variant]="selectedVariant()"
              [size]="selectedSize()"
              [config]="socialProofNewsletterConfig()"
              (newsletterSubmit)="onNewsletterSubmit($event, 'Social Proof Newsletter')"
            />
          </div>

          <!-- Newsletter with Preferences -->
          <div class="flex flex-col items-center space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              With Preferences
            </h3>
            <NewsletterSignup
              [variant]="selectedVariant()"
              [size]="selectedSize()"
              [config]="preferencesNewsletterConfig()"
              (newsletterSubmit)="onNewsletterSubmit($event, 'Preferences Newsletter')"
            />
          </div>
        </div>

        <!-- Feature Showcase -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <!-- Marketing Newsletter -->
          <div class="flex flex-col items-center space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Marketing Newsletter
            </h3>
            <NewsletterSignup
              [variant]="selectedVariant()"
              [size]="selectedSize()"
              [config]="marketingNewsletterConfig()"
              (newsletterSubmit)="onNewsletterSubmit($event, 'Marketing Newsletter')"
            />
          </div>

          <!-- Product Updates -->
          <div class="flex flex-col items-center space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Product Updates
            </h3>
            <NewsletterSignup
              [variant]="selectedVariant()"
              [size]="selectedSize()"
              [config]="productUpdatesConfig()"
              (newsletterSubmit)="onNewsletterSubmit($event, 'Product Updates')"
            />
          </div>
        </div>

        <!-- Submission Log -->
        <div *ngIf="submissions().length > 0" class="mt-16">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Newsletter Subscriptions
          </h3>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div class="space-y-4">
              <div
                *ngFor="let submission of submissions(); let i = index"
                class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium text-gray-900 dark:text-white">
                    {{ submission.newsletterType }}
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
            Newsletter Signup Features
          </h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Variants</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Default card style</li>
                <li>• Inline form layout</li>
                <li>• Floating popup style</li>
                <li>• Minimal design</li>
                <li>• Customizable sizing</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Social Proof</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Subscriber count display</li>
                <li>• Customer testimonials</li>
                <li>• User avatars</li>
                <li>• Trust indicators</li>
                <li>• Feature highlights</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Privacy & Compliance</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• GDPR compliance</li>
                <li>• Privacy consent</li>
                <li>• Unsubscribe notice</li>
                <li>• Transparent policies</li>
                <li>• Data protection</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Form Fields</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Email validation</li>
                <li>• Name collection</li>
                <li>• Preference selection</li>
                <li>• Frequency options</li>
                <li>• Custom fields</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">User Experience</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Success animations</li>
                <li>• Loading states</li>
                <li>• Error handling</li>
                <li>• Responsive design</li>
                <li>• Accessibility support</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Technology</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Angular 20 signals</li>
                <li>• Reactive forms</li>
                <li>• Template-driven forms</li>
                <li>• TailwindCSS styling</li>
                <li>• Dark mode support</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Documentation Link -->
        <div class="mt-16 text-center">
          <div class="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 border border-gray-200 dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              📚 Complete Documentation
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Explore comprehensive examples, API reference, best practices, and integration guides for the Newsletter Signup block.
            </p>
            <a
              href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/blocks/newsletter-signup.md"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-lg hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              View Documentation
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NewsletterSignupDemoComponent {
  // Form mode
  formMode = signal<'reactive' | 'template'>('reactive');

  // Variant options
  variants = ['default', 'card', 'inline', 'floating', 'minimal'];
  sizes = ['sm', 'md', 'lg'];

  // Selected variants
  selectedVariant = signal<'default' | 'card' | 'inline' | 'floating' | 'minimal'>('card');
  selectedSize = signal<'sm' | 'md' | 'lg'>('md');

  // Submissions log
  submissions = signal<Array<{ newsletterType: string; data: any; timestamp: Date }>>([]);

  // Newsletter configurations
  simpleNewsletterConfig = computed<NewsletterConfig>(() => ({
    title: 'Stay Updated',
    subtitle: 'Get the latest news delivered to your inbox',
    mode: this.formMode(),
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
  }));

  socialProofNewsletterConfig = computed<NewsletterConfig>(() => ({
    title: 'Join Our Community',
    subtitle: 'Get exclusive content and updates',
    mode: this.formMode(),
    socialProof: {
      subscriberCount: '25,000+',
      testimonial: 'Best newsletter I\'ve ever subscribed to!',
      avatars: ['1', '2', '3', '4'],
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
    successMessage: 'Welcome to the community! You\'ll receive our next newsletter soon.',
  }));

  preferencesNewsletterConfig = computed<NewsletterConfig>(() => ({
    title: 'Customize Your Experience',
    subtitle: 'Choose what you want to hear about',
    mode: this.formMode(),
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
          { label: 'Everything', value: 'all' },
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
      'Exclusive member-only content'
    ],
    showPrivacyConsent: true,
    submitText: 'Customize & Subscribe',
    successMessage: 'Perfect! Your preferences have been saved and you\'re all set.',
  }));

  marketingNewsletterConfig = computed<NewsletterConfig>(() => ({
    title: '🚀 Growth Marketing Weekly',
    subtitle: 'Strategies, tactics, and insights for marketers',
    description: 'Join 15,000+ marketers getting actionable growth tips every Tuesday.',
    mode: this.formMode(),
    socialProof: {
      subscriberCount: '15,000+',
      testimonial: 'The only marketing newsletter I actually read every week.',
      avatars: ['1', '2', '3', '4', '5'],
    },
    fields: [
      {
        name: 'email',
        label: '',
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
        required: false,
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
  }));

  productUpdatesConfig = computed<NewsletterConfig>(() => ({
    title: 'Product Updates',
    subtitle: 'Be the first to know about new features',
    mode: this.formMode(),
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
  }));

  toggleFormMode() {
    const newMode = this.formMode() === 'reactive' ? 'template' : 'reactive';
    this.formMode.set(newMode);
  }

  setVariant(variant: any) {
    this.selectedVariant.set(variant);
  }

  setSize(size: any) {
    this.selectedSize.set(size);
  }

  onNewsletterSubmit(event: NewsletterSubmitEvent, newsletterType: string) {
    console.log(`${newsletterType} newsletter submitted:`, event);

    // Add to submissions log
    this.submissions.update(submissions => [
      {
        newsletterType,
        data: event.data,
        timestamp: new Date(),
      },
      ...submissions
    ]);
  }
}
