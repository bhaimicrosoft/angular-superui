import {
  Component,
  signal,
  computed,
  ChangeDetectionStrategy,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SEOService } from '../services/seo.service';
import { FooterBlockComponent } from '@lib/footer';

export interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
    isInternal?: boolean;
  }>;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

export interface CompanyInfo {
  name: string;
  description?: string;
  logo?: string;
  address?: string;
  phone?: string;
  email?: string;
}

@Component({
  selector: 'app-footer-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterBlockComponent],
  template: `
    <!-- Professional Hero Section -->
    <section class="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Breadcrumb Navigation -->
          <nav class="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <a href="/blocks" class="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">UI Blocks</a>
            <span>→</span>
            <span class="text-gray-900 dark:text-white font-medium">Footer</span>
          </nav>

          <!-- Category Badge -->
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300 text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
            Navigation Block
          </div>

          <!-- Main Heading -->
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Footer Block
          </h1>

          <!-- Description -->
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed mx-auto max-w-3xl">
            Professional footer component with comprehensive layouts, navigation links, social media integration, 
            and newsletter subscription functionality.
          </p>

          <!-- Feature Grid -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 justify-center max-w-4xl mx-auto">
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
              <span class="text-sm font-medium text-center">Link Management</span>
            </div>
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 011 1v3H2V5a1 1 0 011-1h4zM2 9v9a2 2 0 002 2h12a2 2 0 002-2V9H2z"></path>
              </svg>
              <span class="text-sm font-medium text-center">Social Integration</span>
            </div>
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span class="text-sm font-medium text-center">Newsletter</span>
            </div>
            <div class="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-sm font-medium text-center">Accessibility</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Examples -->
    <div id="examples" class="py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto space-y-20">
          <!-- Example 1: Complete Footer -->
          <div>
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Complete Footer
              </h2>
              <p class="text-gray-600 dark:text-gray-300">
                Full-featured footer with all sections
              </p>
            </div>
            <div
              class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
            >
              <div class="min-h-[400px] bg-white dark:bg-gray-900">
                <footer-block
                  [companyInfo]="companyInfo()"
                  [sections]="footerLinks()"
                  [socialLinks]="socialLinks()"
                  [showNewsletter]="true"
                  [newsletterTitle]="'Stay Updated'"
                  [newsletterDescription]="
                    'Subscribe to get the latest updates and news delivered to your inbox.'
                  "
                  [variant]="'default'"
                />
              </div>
            </div>
          </div>

          <!-- Example 2: Minimal Footer -->
          <div>
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Minimal Footer
              </h2>
              <p class="text-gray-600 dark:text-gray-300">
                Clean and simple footer design
              </p>
            </div>
            <div
              class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
            >
              <div class="min-h-[200px] bg-white dark:bg-gray-900">
                <footer-block
                  [companyInfo]="minimalCompanyInfo()"
                  [sections]="minimalLinks()"
                  [socialLinks]="socialLinks()"
                  [variant]="'minimal'"
                />
              </div>
            </div>
          </div>

          <!-- Example 3: Dark Footer -->
          <div>
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Dark Footer
              </h2>
              <p class="text-gray-600 dark:text-gray-300">
                Dark themed footer with gradient background
              </p>
            </div>
            <div
              class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
            >
              <div class="min-h-[400px]">
                <footer-block
                  [companyInfo]="companyInfo()"
                  [sections]="footerLinks()"
                  [socialLinks]="socialLinks()"
                  [variant]="'dark'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Documentation Link -->
    <div class="bg-muted/30 py-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <div
            class="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            Documentation
          </div>
          <h3 class="text-2xl font-bold text-foreground mb-4">
            Need More Details?
          </h3>
          <p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Check out the complete documentation for the Footer component,
            including all available props, customization options, and advanced
            usage examples.
          </p>
          <a
            href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/footer.md"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            View Documentation
            <svg
              class="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterDemoComponent implements OnInit {
  private seoService = inject(SEOService);

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'Footer Block Demo - Angular SuperUI',
      description:
        'Interactive examples of footer blocks with different layouts, social links, and newsletter integration.',
      keywords:
        'Angular footer, footer component, footer block, navigation footer, website footer',
    });
  }

  // Company information
  companyInfo = signal({
    name: 'Angular SuperUI',
    description:
      'Modern Angular component library for building stunning user interfaces.',
    logo: '/lightning-bolt.svg',
    address: {
      street: '123 Innovation Drive',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'USA',
    },
    contact: {
      email: 'hello@angularsuperui.com',
      phone: '+1 (555) 123-4567',
    },
  });

  minimalCompanyInfo = signal({
    name: 'Angular SuperUI',
    description: 'Modern Angular component library.',
    logo: '/lightning-bolt.svg',
  });

  // Footer links
  footerLinks = signal([
    {
      title: 'Product',
      links: [
        { text: 'Components', href: '/components' },
        { text: 'Blocks', href: '/blocks' },
        { text: 'Templates', href: '/templates' },
        { text: 'Pricing', href: '/pricing' },
        { text: 'Changelog', href: '/changelog' },
      ],
    },
    {
      title: 'Developers',
      links: [
        { text: 'Documentation', href: '/docs' },
        { text: 'API Reference', href: '/api' },
        { text: 'Examples', href: '/examples' },
        {
          text: 'GitHub',
          href: 'https://github.com/angularsuperui',
          external: true,
        },
        { text: 'Community', href: '/community' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About Us', href: '/about' },
        { text: 'Blog', href: '/blog' },
        { text: 'Careers', href: '/careers' },
        { text: 'Contact', href: '/contact' },
        { text: 'Press Kit', href: '/press' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Help Center', href: '/help' },
        { text: 'Contact Support', href: '/support' },
        { text: 'Status Page', href: '/status' },
        { text: 'Bug Reports', href: '/bugs' },
        { text: 'Feature Requests', href: '/features' },
      ],
    },
  ]);

  minimalLinks = signal([
    {
      title: 'Product',
      links: [
        { text: 'Components', href: '/components' },
        { text: 'Documentation', href: '/docs' },
        { text: 'Support', href: '/support' },
      ],
    },
  ]);

  // Social links
  socialLinks = signal([
    {
      platform: 'github',
      href: 'https://github.com/angularsuperui',
      icon: 'fab fa-github',
    },
    {
      platform: 'twitter',
      href: 'https://twitter.com/angularsuperui',
      icon: 'fab fa-twitter',
    },
    {
      platform: 'linkedin',
      href: 'https://linkedin.com/company/angularsuperui',
      icon: 'fab fa-linkedin',
    },
    {
      platform: 'discord',
      href: 'https://discord.gg/angularsuperui',
      icon: 'fab fa-discord',
    },
    {
      platform: 'youtube',
      href: 'https://youtube.com/angularsuperui',
      icon: 'fab fa-youtube',
    },
  ]);

  // Code examples
  basicUsageCode = computed(
    () => `<footer-block
  [companyInfo]="companyInfo"
  [sections]="footerSections"
  [socialLinks]="socialLinks"
  variant="default"
/>`
  );

  advancedUsageCode = computed(
    () => `<footer-block
  [companyInfo]="companyInfo"
  [sections]="footerSections"
  [socialLinks]="socialLinks"
  [showNewsletter]="true"
  [newsletterTitle]="'Stay Updated'"
  [newsletterDescription]="'Subscribe to get the latest updates and news delivered to your inbox.'"
  variant="dark"
/>`
  );

  interfaceCode = computed(
    () => `export interface CompanyInfo {
  name: string;
  description?: string;
  logo?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  contact?: {
    email: string;
    phone: string;
  };
}

export interface FooterLink {
  text: string;
  href: string;
  external?: boolean;
  icon?: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}`
  );
}
