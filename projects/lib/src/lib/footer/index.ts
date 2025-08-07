import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {cva} from 'class-variance-authority';
import {cn} from '../utils/cn';
import { IconPipe } from '../pipes/icon.pipe';

const footerVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: 'bg-background border-t border-border',
        dark: 'bg-slate-900 text-white',
        gradient: 'bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white',
        minimal: 'bg-muted/30'
      },
      size: {
        sm: 'py-8',
        default: 'py-12',
        lg: 'py-16'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

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
}

export interface CompanyInfo {
  name: string;
  description?: string;
  logo?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
  };
}

@Component({
  selector: 'footer-block',
  standalone: true,
  imports: [CommonModule, IconPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer [class]="footerClasses()" role="contentinfo">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          <!-- Company Info -->
          @if (companyInfo()) {
            <div class="md:col-span-2 lg:col-span-2">
              <!-- Logo & Name -->
              <div class="flex items-center space-x-3 mb-4">
                @if (companyInfo()?.logo) {
                  <img 
                    [src]="companyInfo()?.logo" 
                    [alt]="companyInfo()?.name + ' logo'"
                    class="w-8 h-8 object-contain"
                  />
                }
                <h3 class="text-xl font-bold">{{ companyInfo()?.name }}</h3>
              </div>

              <!-- Description -->
              @if (companyInfo()?.description) {
                <p class="text-muted-foreground mb-6 leading-relaxed">
                  {{ companyInfo()?.description }}
                </p>
              }

              <!-- Contact Info -->
              @if (companyInfo()?.contact?.email || companyInfo()?.contact?.phone) {
                <div class="space-y-2 mb-6">
                  @if (companyInfo()?.contact?.email) {
                    <div class="flex items-center space-x-3">
                      <div [innerHTML]="'email' | icon" class="w-4 h-4 text-muted-foreground" aria-hidden="true"></div>
                      <a 
                        [href]="'mailto:' + companyInfo()?.contact?.email"
                        class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        [attr.aria-label]="'Send email to ' + companyInfo()?.contact?.email"
                      >
                        {{ companyInfo()?.contact?.email }}
                      </a>
                    </div>
                  }
                  @if (companyInfo()?.contact?.phone) {
                    <div class="flex items-center space-x-3">
                      <div [innerHTML]="'phone' | icon" class="w-4 h-4 text-muted-foreground" aria-hidden="true"></div>
                      <a 
                        [href]="'tel:' + companyInfo()?.contact?.phone"
                        class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        [attr.aria-label]="'Call ' + companyInfo()?.contact?.phone"
                      >
                        {{ companyInfo()?.contact?.phone }}
                      </a>
                    </div>
                  }
                </div>
              }

              <!-- Social Links -->
              @if (socialLinks() && socialLinks()!.length > 0) {
                <div class="flex space-x-4">
                  @for (social of socialLinks(); track social.platform) {
                    <a
                      [href]="social.href"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
                      [attr.aria-label]="'Follow us on ' + social.platform"
                    >
                      <div [innerHTML]="social.icon | icon" class="w-5 h-5"></div>
                    </a>
                  }
                </div>
              }
            </div>
          }

          <!-- Footer Sections - 4 columns on large screens -->
          @if (sections() && sections()!.length > 0) {
            <div class="md:col-span-2 lg:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
              @for (section of sections(); track section.title; let i = $index) {
                <div>
                  <h4 [id]="section.title.toLowerCase() + '-heading'" class="font-semibold mb-4 text-foreground">{{ section.title }}</h4>
                  <nav [attr.aria-labelledby]="section.title.toLowerCase() + '-heading'">
                    <ul class="space-y-3" role="list">
                      @for (link of section.links; track link.href) {
                        <li>
                          <a
                            [href]="link.href"
                            [target]="link.external ? '_blank' : undefined"
                            [rel]="link.external ? 'noopener noreferrer' : undefined"
                            class="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center space-x-2"
                            (click)="onLinkClick.emit(link)"
                          >
                            @if (link.icon) {
                              <div [innerHTML]="link.icon | icon" class="w-4 h-4"></div>
                            }
                            <span>{{ link.text }}</span>
                            @if (link.external) {
                              <div [innerHTML]="'external' | icon" class="w-3 h-3" aria-hidden="true"></div>
                            }
                          </a>
                        </li>
                      }
                    </ul>
                  </nav>
                </div>
              }
            </div>
          }
        </div>

        <!-- Newsletter Section - Separate row below main content -->
        @if (showNewsletter()) {
          <div class="mt-12 pt-8 border-t border-border">
            <div class="max-w-2xl mx-auto text-center">
              <h4 id="newsletter-heading" class="text-lg font-semibold mb-4 text-foreground">{{ newsletterTitle() || 'Stay Updated' }}</h4>
              <p class="text-sm text-muted-foreground mb-6">
                {{ newsletterDescription() || 'Subscribe to our newsletter and be the first to know about updates, new features, and exclusive content.' }}
              </p>
              <form (ngSubmit)="onNewsletterSubmit.emit($event)" class="space-y-4" aria-labelledby="newsletter-heading">
                <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <label for="newsletter-email" class="sr-only">Email address</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="Enter your email address"
                    class="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    aria-describedby="newsletter-description"
                    required
                  />
                  <button
                    type="submit"
                    class="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 whitespace-nowrap"
                    aria-label="Subscribe to newsletter"
                  >
                    Subscribe
                  </button>
                </div>
                <div id="newsletter-description" class="sr-only">
                  {{ newsletterDescription() || 'Subscribe to our newsletter and be the first to know about updates, new features, and exclusive content.' }}
                </div>
                <p class="text-xs text-muted-foreground">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        }

        <!-- Bottom Bar -->
        <div class="mt-12 pt-8 border-t border-border/60">
          <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <!-- Copyright -->
            <div class="text-sm text-muted-foreground">
              {{ getCopyrightText() }}
            </div>

            <!-- Legal Links -->
            @if (legalLinks() && legalLinks()!.length > 0) {
              <div class="flex flex-wrap justify-center md:justify-end space-x-6">
                @for (link of legalLinks(); track link.href) {
                  <a
                    [href]="link.href"
                    [target]="link.external ? '_blank' : undefined"
                    [rel]="link.external ? 'noopener noreferrer' : undefined"
                    class="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    (click)="onLinkClick.emit(link)"
                  >
                    {{ link.text }}
                  </a>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterBlockComponent {
  // Inputs
  variant = input<'default' | 'dark' | 'gradient' | 'minimal'>('default');
  size = input<'sm' | 'default' | 'lg'>('default');
  
  companyInfo = input<CompanyInfo>();
  sections = input<FooterSection[]>();
  socialLinks = input<SocialLink[]>();
  legalLinks = input<FooterLink[]>();
  
  showNewsletter = input<boolean>(false);
  newsletterTitle = input<string>();
  newsletterDescription = input<string>();
  
  copyrightText = input<string>();
  currentYear = input<number>(new Date().getFullYear());

  // Outputs
  onLinkClick = output<FooterLink>();
  onNewsletterSubmit = output<Event>();

  // Helper function
  cn = cn;

  // Computed classes
  footerClasses = computed(() => footerVariants({
    variant: this.variant(),
    size: this.size()
  }));

  getCopyrightText(): string {
    if (this.copyrightText()) {
      return this.copyrightText()!;
    }
    
    const company = this.companyInfo()?.name || 'Company';
    const year = this.currentYear();
    return `© ${year} ${company}. All rights reserved.`;
  }

}