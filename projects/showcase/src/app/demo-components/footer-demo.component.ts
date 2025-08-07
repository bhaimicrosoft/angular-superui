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
    <!-- Demo Header -->
    <div
      class="relative bg-white dark:bg-gray-950 border-b border-gray-200/50 dark:border-gray-800/50"
    >
      <!-- Background Pattern -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20"></div>
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      </div>

      <!-- Navigation Breadcrumb -->
      <div class="relative z-10 pt-6 pb-4">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="flex items-center space-x-2 text-sm">
            <span class="text-gray-500 dark:text-gray-400">Components</span>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
            <span class="text-gray-500 dark:text-gray-400">Navigation</span>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
            <span class="font-medium text-gray-900 dark:text-white">Footer Block</span>
          </nav>
        </div>
      </div>

      <!-- Main Hero Content -->
      <div class="relative z-10 pt-8 pb-20">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto text-center">
            
            <!-- Category Badge -->
            <div class="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/50 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 text-xs font-medium mb-6">
              <div class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
              Navigation Component
            </div>

            <!-- Main Title -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Footer Block
            </h1>

            <!-- Description -->
            <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Professional footer component with comprehensive layouts, navigation links, social media integration, and newsletter subscription functionality.
            </p>

            <!-- Features Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              <div class="flex items-center justify-center space-x-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-800/50">
                <div class="w-8 h-8 bg-green-100 dark:bg-green-950/50 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Fully Accessible</span>
              </div>
              
              <div class="flex items-center justify-center space-x-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-800/50">
                <div class="w-8 h-8 bg-blue-100 dark:bg-blue-950/50 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Responsive Design</span>
              </div>
              
              <div class="flex items-center justify-center space-x-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-800/50">
                <div class="w-8 h-8 bg-purple-100 dark:bg-purple-950/50 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Multiple Variants</span>
              </div>
            </div>

          
            <!-- Stats -->
            <div class="mt-16 pt-8 border-t border-gray-200/50 dark:border-gray-800/50">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="text-center">
                  <div class="text-2xl font-bold text-gray-900 dark:text-white">4</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Layout Variants</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-gray-900 dark:text-white">100%</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Accessible</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-gray-900 dark:text-white">TypeScript</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Built with</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-gray-900 dark:text-white">MIT</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Open Source</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

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
