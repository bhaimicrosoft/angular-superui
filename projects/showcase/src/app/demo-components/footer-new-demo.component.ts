import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SEOService } from '../services/seo.service';
import { FooterBlock } from '@lib/blocks/footer';
import { Icon } from '@lib/components/icon';

@Component({
  selector: 'app-footer-new-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterBlock, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Professional Hero Section -->
    <section
      class="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Breadcrumb Navigation -->
          <nav
            class="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8"
          >
            <a
              href="/blocks"
              class="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >UI Blocks</a
            >
            <span>→</span>
            <span class="text-gray-900 dark:text-white font-medium"
              >Footer Block</span
            >
          </nav>

          <!-- Category Badge -->
          <div
            class="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6"
          >
            <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            Layout Block
          </div>

          <!-- Main Heading -->
          <h1
            class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Footer Block
          </h1>

          <!-- Description -->
          <p
            class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8"
          >
            Professional footer sections with flexible content projection.
            Perfect for site navigation, contact information, and branding.
          </p>

          <!-- Features -->
          <div
            class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-300"
          >
            <div class="flex items-center justify-center">
              <span
                class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2"
              >
                <span class="text-white text-xs">✓</span>
              </span>
              Multiple Columns
            </div>
            <div class="flex items-center justify-center">
              <span
                class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2"
              >
                <span class="text-white text-xs">✓</span>
              </span>
              Social Links
            </div>
            <div class="flex items-center justify-center">
              <span
                class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2"
              >
                <span class="text-white text-xs">✓</span>
              </span>
              Responsive Design
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Examples -->
    <div id="examples" class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <!-- Example 1: Complete Footer -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Complete Footer
              </h2>
              <p class="text-gray-600 dark:text-gray-300">
                Full-featured footer with all columns and social links
              </p>
            </div>

            <div
              class="rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <FooterBlock>
                <!-- Company/Brand Info - Top Left -->
                <div slot="brand" class="space-y-4">
                  <div class="flex items-center space-x-2">
                    <div
                      class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
                    >
                      <Icon icon="fas fa-cube" class="text-white" size="sm" />
                    </div>
                    <span
                      class="text-xl font-bold text-gray-900 dark:text-white"
                      >Angular SuperUI</span
                    >
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 max-w-xs">
                    Building the future of Angular development with modern,
                    accessible, and beautiful UI components.
                  </p>
                  <div class="flex space-x-4">
                    <a
                      href="#"
                      class="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Icon icon="fab fa-twitter" size="lg" />
                    </a>
                    <a
                      href="#"
                      class="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Icon icon="fab fa-github" size="lg" />
                    </a>
                    <a
                      href="#"
                      class="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Icon icon="fab fa-linkedin" size="lg" />
                    </a>
                    <a
                      href="#"
                      class="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Icon icon="fab fa-discord" size="lg" />
                    </a>
                  </div>
                </div>

                <!-- Products Column -->
                <div slot="products" class="space-y-4">
                  <h3
                    class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider"
                  >
                    Products
                  </h3>
                  <ul class="space-y-3">
                    <li>
                      <a
                        href="#"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >Components</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >Blocks</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >Templates</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >CLI Tools</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >Examples</a
                      >
                    </li>
                  </ul>
                </div>

                <!-- Support Column -->
                <div slot="support" class="space-y-4">
                  <h3
                    class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider"
                  >
                    Support
                  </h3>
                  <ul class="space-y-3">
                    <li>
                      <a
                        href="#"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >Documentation</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >Help Center</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >Community</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >Contact Us</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >Bug Reports</a
                      >
                    </li>
                  </ul>
                </div>

                <!-- Legal Column -->
                <div slot="legal" class="space-y-4">
                  <h3
                    class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider"
                  >
                    Legal
                  </h3>
                  <ul class="space-y-3">
                    <li>
                      <a
                        href="#"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >Privacy Policy</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >Terms of Service</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >Cookie Policy</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >License</a
                      >
                    </li>
                  </ul>
                </div>

                <!-- Copyright - Bottom Section -->
                <div
                  slot="copyright"
                  class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
                >
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    © 2025 Angular SuperUI. All rights reserved.
                  </p>
                  <div class="flex items-center space-x-6 text-sm">
                    <a
                      href="#"
                      class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >Status</a
                    >
                    <a
                      href="#"
                      class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >Blog</a
                    >
                    <a
                      href="#"
                      class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >Newsletter</a
                    >
                  </div>
                </div>
              </FooterBlock>
            </div>
          </div>

          <!-- Example 2: Minimal Footer -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Minimal Footer
              </h2>
              <p class="text-gray-600 dark:text-gray-300">
                Clean and simple footer design
              </p>
            </div>

            <div
              class="rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <FooterBlock columns="three">
                <!-- Company Info - Left -->
                <div slot="brand" class="space-y-4">
                  <div class="flex items-center space-x-2">
                    <div
                      class="w-6 h-6 bg-purple-600 rounded flex items-center justify-center"
                    >
                      <Icon icon="fas fa-rocket" class="text-white" size="xs" />
                    </div>
                    <span
                      class="text-lg font-bold text-gray-900 dark:text-white"
                      >StartupUI</span
                    >
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 max-w-xs text-sm">
                    Empowering startups with beautiful UI components.
                  </p>
                </div>

                <!-- Quick Links - Center -->
                <div slot="links" class="space-y-4">
                  <h3
                    class="text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Quick Links
                  </h3>
                  <ul class="space-y-2">
                    <li>
                      <a
                        href="#"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                        >About</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                        >Contact</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                        >Privacy</a
                      >
                    </li>
                  </ul>
                </div>

                <!-- Social - Right -->
                <div slot="social" class="space-y-4">
                  <h3
                    class="text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Follow Us
                  </h3>
                  <div class="flex space-x-3">
                    <a
                      href="#"
                      class="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <Icon icon="fab fa-twitter" size="md" />
                    </a>
                    <a
                      href="#"
                      class="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <Icon icon="fab fa-github" size="md" />
                    </a>
                  </div>
                </div>

                <!-- Copyright - Bottom -->
                <div slot="copyright" class="text-center">
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    © 2025 StartupUI. Made with ❤️
                  </p>
                </div>
              </FooterBlock>
            </div>
          </div>

          <!-- Example 3: Newsletter Footer -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Newsletter Footer
              </h2>
              <p class="text-gray-600 dark:text-gray-300">
                Footer with newsletter signup
              </p>
            </div>

            <div
              class="rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <FooterBlock [showNewsletter]="true" columns="two">
                <!-- Newsletter Section - Full Width Above Main Content -->
                <div
                  slot="newsletter"
                  class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
                >
                  <div
                    class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                  >
                    <div>
                      <h3
                        class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                      >
                        Stay Updated
                      </h3>
                      <p class="text-gray-600 dark:text-gray-400 text-sm">
                        Subscribe to our newsletter for the latest updates and
                        eco-friendly tips.
                      </p>
                    </div>
                    <form class="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
                      >
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>

                <!-- Company Info -->
                <div slot="brand" class="space-y-4">
                  <div class="flex items-center space-x-2">
                    <div
                      class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center"
                    >
                      <Icon icon="fas fa-leaf" class="text-white" size="sm" />
                    </div>
                    <span
                      class="text-xl font-bold text-gray-900 dark:text-white"
                      >EcoTech</span
                    >
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 max-w-xs">
                    Sustainable technology solutions for a better tomorrow.
                  </p>
                </div>

                <!-- Contact -->
                <div slot="contact" class="space-y-4">
                  <h3
                    class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider"
                  >
                    Contact
                  </h3>
                  <ul class="space-y-3">
                    <li class="flex items-center space-x-2">
                      <Icon
                        icon="fas fa-envelope"
                        size="sm"
                        class="text-gray-400"
                      />
                      <span class="text-gray-600 dark:text-gray-400 text-sm"
                        >hello@ecotech.com</span
                      >
                    </li>
                    <li class="flex items-center space-x-2">
                      <Icon
                        icon="fas fa-phone"
                        size="sm"
                        class="text-gray-400"
                      />
                      <span class="text-gray-600 dark:text-gray-400 text-sm"
                        >+1 (555) 123-4567</span
                      >
                    </li>
                    <li class="flex items-center space-x-2">
                      <Icon
                        icon="fas fa-map-marker-alt"
                        size="sm"
                        class="text-gray-400"
                      />
                      <span class="text-gray-600 dark:text-gray-400 text-sm"
                        >San Francisco, CA</span
                      >
                    </li>
                  </ul>
                </div>

                <!-- Copyright and Social -->
                <div
                  slot="copyright"
                  class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
                >
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    © 2025 EcoTech. Committed to sustainability.
                  </p>
                  <div class="flex items-center space-x-4 mt-4 ml-4 md:mt-0">
                    <a
                      href="#"
                      class="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      <Icon icon="fab fa-facebook" size="md" />
                    </a>
                    <a
                      href="#"
                      class="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      <Icon icon="fab fa-instagram" size="md" />
                    </a>
                    <a
                      href="#"
                      class="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      <Icon icon="fab fa-youtube" size="md" />
                    </a>
                  </div>
                </div>
              </FooterBlock>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Implementation Guide -->
    <section
      class="py-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h2
            class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
          >
            Implementation Guide
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                Basic Usage
              </h3>
              <div
                class="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto"
              >
                <pre>npx ngsui-cli add block footer</pre>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                Content Slots
              </h3>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <code class="text-sm">slot="brand"</code> - Company info &
                  branding
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <code class="text-sm">slot="products"</code> - Product
                  navigation
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <code class="text-sm">slot="support"</code> - Support links
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <code class="text-sm">slot="legal"</code> - Legal links
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <code class="text-sm">slot="newsletter"</code> - Newsletter
                  signup
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <code class="text-sm">slot="contact"</code> - Contact
                  information
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <code class="text-sm">slot="social"</code> - Social media
                  links
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <code class="text-sm">slot="copyright"</code> - Copyright &
                  legal
                </li>
              </ul>
            </div>
          </div>

          <div class="text-center mt-12">
            <a
              href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/blocks/footer.md"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
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
    </section>
  `,
})
export class FooterNewDemoComponent implements OnInit {
  private seoService = inject(SEOService);

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'Footer Block - UI Blocks | Angular SuperUI',
      description:
        'Professional footer sections with flexible content projection. Perfect for site navigation, contact information, and branding.',
      keywords:
        'angular, footer, navigation, ui components, content projection',
      url: 'https://angular-superui.vercel.app/blocks/footer',
      type: 'website',
    });
  }
}
