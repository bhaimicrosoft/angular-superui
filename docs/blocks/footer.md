# Footer Block 🦶

Professional footer sections with flexible content projection and responsive grid layouts. Create comprehensive website footers with complete control over layout, content, and styling using named slots.

## Features

- 🧩 **Content Projection** - Named slots for flexible content organization
- 📏 **Responsive Grid** - 1-5 columns with mobile-first responsive design  
- 🎯 **Multiple Variants** - Default, dark, minimal, newsletter, corporate layouts
- 📱 **Mobile Optimized** - Stacks beautifully on small screens
- 🔧 **Newsletter Support** - Built-in newsletter signup section
- 🎨 **Customizable** - Easy theming with Tailwind CSS classes
- ♿ **Accessible** - ARIA compliant with semantic markup
- 🔗 **Social Links** - Integrated social media icon support

## Installation

Add the Footer Block component:

```bash
npx ngsui-cli add block footer
```

## Usage

Import the FooterBlock component:

```typescript
import { Component } from '@angular/core';
import { FooterBlock } from '@lib/blocks/footer-configurable';
import { Icon } from '@lib/components/icon';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [FooterBlock, Icon],
  template: `
    <FooterBlock columns="four">
      <!-- Company/Brand Info -->
      <div slot="brand" class="space-y-4">
        <div class="flex items-center space-x-2">
          <Icon icon="fas fa-cube" class="text-blue-600" size="lg" />
          <span class="text-xl font-bold">Your Company</span>
        </div>
        <p class="text-gray-600 max-w-xs">
          Building the future with innovative solutions and cutting-edge technology.
        </p>
        <div class="flex space-x-4">
          <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
            <Icon icon="fab fa-twitter" size="lg" />
          </a>
          <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
            <Icon icon="fab fa-github" size="lg" />
          </a>
          <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
            <Icon icon="fab fa-linkedin" size="lg" />
          </a>
        </div>
      </div>

      <!-- Products Column -->
      <div slot="products" class="space-y-4">
        <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Products</h3>
        <ul class="space-y-3">
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Components</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Blocks</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Templates</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">CLI Tools</a></li>
        </ul>
      </div>

      <!-- Support Column -->
      <div slot="support" class="space-y-4">
        <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Support</h3>
        <ul class="space-y-3">
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Documentation</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Community</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Contact</a></li>
        </ul>
      </div>

      <!-- Legal Column -->
      <div slot="legal" class="space-y-4">
        <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Legal</h3>
        <ul class="space-y-3">
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Cookie Policy</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">License</a></li>
        </ul>
      </div>

      <!-- Copyright -->
      <div slot="copyright" class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-600 text-sm">© 2025 Your Company. All rights reserved.</p>
        <div class="flex items-center space-x-6 text-sm mt-4 md:mt-0">
          <a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Status</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Blog</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Newsletter</a>
        </div>
      </div>
    </FooterBlock>
  `
})
export class ExampleComponent {}
```

## Examples

### Complete Footer with All Sections

```typescript
@Component({
  template: `
    <FooterBlock columns="four">
      <div slot="brand" class="space-y-4">
        <div class="flex items-center space-x-2">
          <Icon icon="fas fa-cube" class="text-blue-600" size="lg" />
          <span class="text-xl font-bold">Angular SuperUI</span>
        </div>
        <p class="text-gray-600 max-w-xs">
          Building the future of Angular development with modern, accessible UI components.
        </p>
        <div class="flex space-x-4">
          <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
            <Icon icon="fab fa-twitter" size="lg" />
          </a>
          <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
            <Icon icon="fab fa-github" size="lg" />
          </a>
          <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
            <Icon icon="fab fa-linkedin" size="lg" />
          </a>
        </div>
      </div>

      <div slot="products" class="space-y-4">
        <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Products</h3>
        <ul class="space-y-3">
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Components</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Blocks</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Templates</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">CLI Tools</a></li>
        </ul>
      </div>

      <div slot="support" class="space-y-4">
        <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Support</h3>
        <ul class="space-y-3">
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Documentation</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Community</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Contact</a></li>
        </ul>
      </div>

      <div slot="legal" class="space-y-4">
        <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Legal</h3>
        <ul class="space-y-3">
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Cookie Policy</a></li>
        </ul>
      </div>

      <div slot="copyright" class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-600 text-sm">© 2025 Angular SuperUI. All rights reserved.</p>
        <div class="flex items-center space-x-6 text-sm mt-4 md:mt-0">
          <a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Status</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">Blog</a>
        </div>
      </div>
    </FooterBlock>
  `
})
```

### Minimal Footer

```typescript
@Component({
  template: `
    <FooterBlock columns="three">
      <div slot="brand" class="space-y-4">
        <div class="flex items-center space-x-2">
          <Icon icon="fas fa-rocket" class="text-purple-600" size="md" />
          <span class="text-lg font-bold">StartupUI</span>
        </div>
        <p class="text-gray-600 max-w-xs text-sm">
          Empowering startups with beautiful UI components.
        </p>
      </div>

      <div slot="links" class="space-y-4">
        <h3 class="text-sm font-semibold text-gray-900">Quick Links</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors text-sm">About</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors text-sm">Contact</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900 transition-colors text-sm">Privacy</a></li>
        </ul>
      </div>

      <div slot="social" class="space-y-4">
        <h3 class="text-sm font-semibold text-gray-900">Follow Us</h3>
        <div class="flex space-x-3">
          <a href="#" class="text-gray-400 hover:text-purple-600 transition-colors">
            <Icon icon="fab fa-twitter" size="md" />
          </a>
          <a href="#" class="text-gray-400 hover:text-purple-600 transition-colors">
            <Icon icon="fab fa-github" size="md" />
          </a>
        </div>
      </div>

      <div slot="copyright" class="text-center">
        <p class="text-gray-600 text-sm">© 2025 StartupUI. Made with ❤️</p>
      </div>
    </FooterBlock>
  `
})
```

### Newsletter Footer

```typescript
@Component({
  template: `
    <FooterBlock [showNewsletter]="true" columns="two">
      <!-- Newsletter Section -->
      <div slot="newsletter" class="bg-gray-50 rounded-lg p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Stay Updated</h3>
            <p class="text-gray-600 text-sm">
              Subscribe to our newsletter for the latest updates and eco-friendly tips.
            </p>
          </div>
          <form class="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
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

      <div slot="brand" class="space-y-4">
        <div class="flex items-center space-x-2">
          <Icon icon="fas fa-leaf" class="text-green-600" size="lg" />
          <span class="text-xl font-bold">EcoTech</span>
        </div>
        <p class="text-gray-600 max-w-xs">
          Sustainable technology solutions for a better tomorrow.
        </p>
      </div>

      <div slot="legal" class="space-y-4">
        <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contact</h3>
        <ul class="space-y-3">
          <li class="flex items-center space-x-2">
            <Icon icon="fas fa-envelope" size="sm" class="text-gray-400" />
            <span class="text-gray-600 text-sm">hello@ecotech.com</span>
          </li>
          <li class="flex items-center space-x-2">
            <Icon icon="fas fa-phone" size="sm" class="text-gray-400" />
            <span class="text-gray-600 text-sm">+1 (555) 123-4567</span>
          </li>
        </ul>
      </div>

      <div slot="copyright" class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-600 text-sm">© 2025 EcoTech. Committed to sustainability.</p>
        <div class="flex space-x-4 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-green-600 transition-colors">
            <Icon icon="fab fa-twitter" size="md" />
          </a>
          <a href="#" class="text-gray-400 hover:text-green-600 transition-colors">
            <Icon icon="fab fa-github" size="md" />
          </a>
        </div>
      </div>
    </FooterBlock>
  `
})
```
## Component Props

### FooterBlock

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `'one' \| 'two' \| 'three' \| 'four' \| 'five' \| 'auto' \| 'custom'` | `'auto'` | Number of columns in the grid layout |
| `showNewsletter` | `boolean` | `false` | Show newsletter section above main content |
| `containerType` | `'none' \| 'default' \| 'wide' \| 'full' \| 'custom'` | `'default'` | Container width type |
| `stackOnMobile` | `boolean` | `true` | Stack columns on mobile devices |
| `variant` | `string` | `'default'` | Visual variant of the footer |
| `layout` | `string` | `'standard'` | Layout style for the footer |

## Content Slots

The FooterBlock component supports the following named slots for content projection:

| Slot | Description | Example Usage |
|------|-------------|---------------|
| `slot="brand"` | Company logo, name, and description | Brand information and social links |
| `slot="products"` | Product-related links and information | Product navigation menu |
| `slot="support"` | Support and help resources | Customer support links |
| `slot="legal"` | Legal pages and compliance info | Privacy policy, terms of service |
| `slot="contact"` | Contact information and details | Address, phone, email |
| `slot="links"` | General navigation links | Quick links, sitemap |
| `slot="social"` | Social media links and icons | Social media buttons |
| `slot="newsletter"` | Newsletter signup form | Email subscription form |
| `slot="copyright"` | Copyright and bottom section | Copyright notice, additional links |

## Responsive Behavior

The FooterBlock automatically adapts to different screen sizes:

- **Mobile (< 768px)**: Single column stack
- **Tablet (768px - 1024px)**: 2 columns
- **Desktop (> 1024px)**: Full column count as specified

## Advanced Usage

### Custom Grid Layout

```typescript
@Component({
  template: `
    <FooterBlock columns="custom" class="custom-footer">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
        <!-- Brand takes 2 columns on desktop -->
        <div slot="brand" class="md:col-span-2 space-y-4">
          <!-- Brand content -->
        </div>
        
        <!-- Other columns take 1 column each -->
        <div slot="products" class="space-y-4">
          <!-- Products content -->
        </div>
        
        <div slot="support" class="space-y-4">
          <!-- Support content -->
        </div>
        
        <div slot="legal" class="space-y-4">
          <!-- Legal content -->
        </div>
      </div>
    </FooterBlock>
  `
})
```

### With Icon Component

```typescript
import { Icon } from '@lib/components/icon';

@Component({
  imports: [FooterBlock, Icon],
  template: `
    <FooterBlock>
      <div slot="brand" class="space-y-4">
        <div class="flex items-center space-x-2">
          <Icon icon="fas fa-cube" class="text-blue-600" size="lg" />
          <span class="text-xl font-bold">Your Brand</span>
        </div>
        
        <div class="flex space-x-4">
          <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
            <Icon icon="fab fa-twitter" size="lg" />
          </a>
          <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
            <Icon icon="fab fa-github" size="lg" />
          </a>
        </div>
      </div>
    </FooterBlock>
  `
})
```

### Newsletter Integration

```typescript
@Component({
  template: `
    <FooterBlock [showNewsletter]="true">
      <div slot="newsletter" class="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-8">
        <div class="text-center max-w-2xl mx-auto">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">
            Join 10,000+ Developers
          </h3>
          <p class="text-gray-600 mb-6">
            Get weekly updates on new components, best practices, and Angular tips.
          </p>
          
          <form class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button 
              type="submit"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Subscribe
            </button>
          </form>
          
          <p class="text-xs text-gray-500 mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
      
      <!-- Rest of footer content -->
    </FooterBlock>
  `
})
```

## Styling and Customization

### CSS Custom Properties

You can customize the footer appearance using CSS custom properties:

```css
.custom-footer {
  --footer-bg: rgb(249 250 251);
  --footer-text: rgb(75 85 99);
  --footer-border: rgb(229 231 235);
  --footer-link-hover: rgb(59 130 246);
}
```

### Dark Mode Support

The FooterBlock automatically supports dark mode when using Tailwind's dark mode:

```typescript
@Component({
  template: `
    <FooterBlock class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div slot="brand" class="space-y-4">
        <span class="text-gray-900 dark:text-white text-xl font-bold">Your Brand</span>
        <p class="text-gray-600 dark:text-gray-400">Your description</p>
      </div>
    </FooterBlock>
  `
})
```

## Best Practices

1. **Content Organization**: Use semantic slots to organize content logically
2. **Mobile First**: Always test footer on mobile devices for readability
3. **Performance**: Use Icon component for consistent icon rendering
4. **Accessibility**: Include proper ARIA labels and semantic markup
5. **SEO**: Include important links in footer for search engine discovery
6. **Legal Compliance**: Always include required legal links (Privacy, Terms)
7. **Social Media**: Use consistent social media icon styling across the site

## TypeScript Support

The FooterBlock component provides full TypeScript support with proper type definitions:

```typescript
import { FooterBlock } from '@lib/blocks/footer-configurable';
import type { FooterBlockProps } from '@lib/blocks/footer-configurable';

// Type-safe usage
const footerConfig: Partial<FooterBlockProps> = {
  columns: 'four',
  showNewsletter: true,
  containerType: 'wide'
};
```
            <li><FooterLink href="/tutorials">Tutorials</FooterLink></li>
            <li><FooterLink href="/examples">Examples</FooterLink></li>
          </ul>
        </FooterColumn>
        
        <FooterColumn>
          <h3 slot="title" class="font-semibold mb-4">Support</h3>
          <ul slot="links" class="space-y-2">
            <li><FooterLink href="/help">Help Center</FooterLink></li>
            <li><FooterLink href="/community">Community</FooterLink></li>
            <li><FooterLink href="/status">Status</FooterLink></li>
          </ul>
        </FooterColumn>
        
        <FooterColumn>
          <h3 slot="title" class="font-semibold mb-4">Company</h3>
          <ul slot="links" class="space-y-2">
            <li><FooterLink href="/about">About</FooterLink></li>
            <li><FooterLink href="/blog">Blog</FooterLink></li>
            <li><FooterLink href="/careers">Careers</FooterLink></li>
          </ul>
        </FooterColumn>
        
        <FooterColumn>
          <h3 slot="title" class="font-semibold mb-4">Connect</h3>
          <div slot="social" class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-blue-500">
              <span class="sr-only">Twitter</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <!-- Twitter icon -->
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-blue-600">
              <span class="sr-only">LinkedIn</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <!-- LinkedIn icon -->
              </svg>
            </a>
          </div>
        </FooterColumn>
      </div>
    </FooterBlock>
  `
})
```

### Corporate Footer with Awards

```typescript
@Component({
  template: `
    <FooterBlock variant="corporate" size="lg">
      <!-- Awards & Certifications -->
      <div slot="awards" class="border-b border-gray-200 pb-8 mb-8">
        <h3 class="text-center text-lg font-semibold mb-6">Trusted by Industry Leaders</h3>
        <div class="flex flex-wrap justify-center items-center gap-8 opacity-60">
          <img src="/award1.png" alt="Award 1" class="h-8">
          <img src="/award2.png" alt="Award 2" class="h-8">
          <img src="/certification.png" alt="Certification" class="h-8">
          <img src="/partner-badge.png" alt="Partner" class="h-8">
        </div>
      </div>
      
      <!-- Main Content -->
      <div slot="main" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <!-- Company Info -->
        <FooterColumn class="lg:col-span-2">
          <div slot="header">
            <img src="/corporate-logo.svg" alt="Company" class="h-10 mb-4">
            <p class="text-gray-600 mb-4 text-sm leading-relaxed">
              Enterprise-grade solutions trusted by Fortune 500 companies worldwide. 
              Delivering innovation and excellence since 2010.
            </p>
          </div>
          
          <div slot="contact" class="space-y-2 text-sm">
            <p class="flex items-center">
              <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              123 Business Ave, Suite 100, City, State 12345
            </p>
            <p class="flex items-center">
              <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              +1 (555) 123-4567
            </p>
            <p class="flex items-center">
              <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              contact@company.com
            </p>
          </div>
        </FooterColumn>
        
        <!-- Solutions -->
        <FooterColumn>
          <h3 slot="title" class="font-semibold mb-4">Solutions</h3>
          <ul slot="links" class="space-y-2 text-sm">
            <li><FooterLink href="/enterprise">Enterprise</FooterLink></li>
            <li><FooterLink href="/small-business">Small Business</FooterLink></li>
            <li><FooterLink href="/startups">Startups</FooterLink></li>
            <li><FooterLink href="/agencies">Agencies</FooterLink></li>
          </ul>
        </FooterColumn>
        
        <!-- Resources -->
        <FooterColumn>
          <h3 slot="title" class="font-semibold mb-4">Resources</h3>
          <ul slot="links" class="space-y-2 text-sm">
            <li><FooterLink href="/documentation">Documentation</FooterLink></li>
            <li><FooterLink href="/api-reference">API Reference</FooterLink></li>
            <li><FooterLink href="/case-studies">Case Studies</FooterLink></li>
            <li><FooterLink href="/whitepapers">Whitepapers</FooterLink></li>
            <li><FooterLink href="/webinars">Webinars</FooterLink></li>
          </ul>
        </FooterColumn>
        
        <!-- Support -->
        <FooterColumn>
          <h3 slot="title" class="font-semibold mb-4">Support</h3>
          <ul slot="links" class="space-y-2 text-sm">
            <li><FooterLink href="/support">Help Center</FooterLink></li>
            <li><FooterLink href="/training">Training</FooterLink></li>
            <li><FooterLink href="/consulting">Consulting</FooterLink></li>
            <li><FooterLink href="/status">System Status</FooterLink></li>
            <li><FooterLink href="/security">Security</FooterLink></li>
          </ul>
        </FooterColumn>
      </div>
    </FooterBlock>
  `
})
```

## Content Slots

### FooterBlock Slots

| Slot | Purpose | Usage |
|------|---------|-------|
| `slot="top"` | Top section/announcement | `<div slot="top">...</div>` |
| `slot="newsletter"` | Newsletter signup | `<div slot="newsletter">...</div>` |
| `slot="awards"` | Awards/certifications | `<div slot="awards">...</div>` |
| `slot="main"` | Main footer content | `<div slot="main">...</div>` |
| `slot="columns"` | Footer columns | `<FooterColumn slot="columns">...</FooterColumn>` |
| `slot="bottom"` | Bottom section/copyright | `<div slot="bottom">...</div>` |
| `slot="legal"` | Legal links | `<nav slot="legal">...</nav>` |
| `slot="social"` | Social media links | `<div slot="social">...</div>` |
| Default | All footer content | `<FooterColumn>...</FooterColumn>` |

### FooterColumn Slots

| Slot | Purpose | Usage |
|------|---------|-------|
| `slot="header"` | Column header/logo | `<div slot="header">...</div>` |
| `slot="title"` | Column title | `<h3 slot="title">...</h3>` |
| `slot="description"` | Column description | `<p slot="description">...</p>` |
| `slot="links"` | Link list | `<ul slot="links">...</ul>` |
| `slot="contact"` | Contact information | `<div slot="contact">...</div>` |
| `slot="social"` | Social media links | `<div slot="social">...</div>` |
| `slot="newsletter"` | Newsletter form | `<form slot="newsletter">...</form>` |
| `slot="footer"` | Column footer | `<div slot="footer">...</div>` |
| Default | Column content | `<FooterLink>...</FooterLink>` |

## API Reference

### FooterBlock Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'dark' \| 'minimal' \| 'newsletter' \| 'corporate' \| 'custom'` | `'default'` | Footer style variant |
| `size` | `'sm' \| 'default' \| 'lg' \| 'full' \| 'custom'` | `'default'` | Footer size/padding |
| `layout` | `'multi-column' \| 'simple' \| 'newsletter' \| 'custom'` | `'multi-column'` | Footer layout type |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| 'none' \| 'custom'` | `'xl'` | Container max width |
| `container` | `boolean \| 'custom'` | `true` | Use container classes |
| `class` | `string` | `''` | Additional CSS classes |

### FooterColumn Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `spacing` | `'none' \| 'sm' \| 'default' \| 'lg' \| 'custom'` | `'default'` | Column spacing |
| `alignment` | `'left' \| 'center' \| 'right' \| 'custom'` | `'left'` | Column alignment |
| `class` | `string` | `''` | Additional CSS classes |

### FooterLink Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | `undefined` | Link URL |
| `external` | `boolean` | `false` | Open in new tab |
| `class` | `string` | `''` | Additional CSS classes |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `linkClick` | `EventEmitter<{href: string, external: boolean}>` | Emitted when link is clicked |
| `newsletterSubmit` | `EventEmitter<string>` | Emitted when newsletter form is submitted |
| `socialClick` | `EventEmitter<string>` | Emitted when social link is clicked |

## Styling

### Custom Classes

```typescript
@Component({
  template: `
    <FooterBlock 
      variant="dark"
      class="bg-gray-900 text-white"
      size="lg"
    >
      <FooterColumn class="space-y-4">
        <FooterLink class="hover:text-blue-400 transition-colors">
          Custom Link Style
        </FooterLink>
      </FooterColumn>
    </FooterBlock>
  `
})
```

### Responsive Design

```typescript
@Component({
  template: `
    <FooterBlock size="default" class="py-8 md:py-12 lg:py-16">
      <div slot="main" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <FooterColumn class="col-span-1 sm:col-span-2 lg:col-span-1">
          <!-- Company info -->
        </FooterColumn>
      </div>
    </FooterBlock>
  `
})
```

## Best Practices

### Content Organization

- Group related links into logical columns
- Keep link lists concise (5-8 items max per column)
- Use descriptive section headings
- Include essential legal links (Privacy, Terms, etc.)

### User Experience

- Ensure all links are functional and up-to-date
- Provide clear contact information
- Include social media links where appropriate
- Consider adding a newsletter signup for engagement

### Accessibility

- Use semantic HTML elements (footer, nav, ul, li)
- Provide descriptive link text
- Ensure sufficient color contrast
- Test with screen readers and keyboard navigation

### SEO

- Include important site links for search crawlers
- Use proper heading hierarchy
- Consider adding structured data markup
- Ensure links are crawlable and indexable

### Mobile Experience

- Stack columns vertically on mobile devices
- Ensure touch targets are appropriately sized
- Test newsletter forms on mobile devices
- Consider collapsible sections for complex footers
