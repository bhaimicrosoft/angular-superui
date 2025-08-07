# Footer Block 🦶

Professional footer component with comprehensive layouts, navigation links, social media integration, and newsletter subscription functionality. Perfect for completing your website with essential links and company information.

## Features

- 🎨 **4 Variants** - Default, Dark, Gradient, Minimal
- 📏 **3 Sizes** - Small, Default, Large
- 🔗 **Link Management** - Organized navigation sections with external link indicators
- 📱 **Social Integration** - Social media links with custom icons
- 📧 **Newsletter Signup** - Built-in newsletter subscription functionality
- 🏢 **Company Info** - Logo, description, and contact information display
- 📍 **Address Support** - Structured address and contact details
- 📱 **Fully Responsive** - Mobile-first design with adaptive layouts
- ♿ **Accessibility** - ARIA compliant with semantic HTML structure
- 🔧 **TypeScript** - Full type safety with comprehensive interfaces

## Installation

Initialize Angular SuperUI in your project:

```bash
npx ngsui init
```

Add the Footer Block component:

```bash
npx ngsui add block footer
```

## Usage

Import the Footer Block component in your Angular component:

```typescript
import { Component, signal } from '@angular/core';
import { FooterBlockComponent, FooterSection, SocialLink, CompanyInfo } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [FooterBlockComponent],
  template: `
    <footer-block
      [companyInfo]="company()"
      [sections]="footerSections()"
      [socialLinks]="socialMedia()"
      [showNewsletter]="true"
      variant="default"
      size="default"
      (onNewsletterSubmit)="handleNewsletterSignup($event)"
      (onLinkClick)="handleLinkClick($event)"
    />
  `
})
export class ExampleComponent {
  company = signal<CompanyInfo>({
    name: 'Angular SuperUI',
    description: 'Building the future of Angular components with modern design and accessibility.',
    logo: '/assets/logo.svg',
    address: {
      street: '123 Tech Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'USA'
    },
    contact: {
      email: 'hello@angular-superui.com',
      phone: '+1 (555) 123-4567'
    }
  });

  footerSections = signal<FooterSection[]>([
    {
      title: 'Product',
      links: [
        { text: 'Components', href: '/components' },
        { text: 'Templates', href: '/templates' },
        { text: 'Pricing', href: '/pricing' },
        { text: 'Changelog', href: '/changelog' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { text: 'Documentation', href: '/docs' },
        { text: 'API Reference', href: '/api' },
        { text: 'Examples', href: '/examples' },
        { text: 'Community', href: '/community', external: true }
      ]
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '/about' },
        { text: 'Blog', href: '/blog' },
        { text: 'Careers', href: '/careers' },
        { text: 'Contact', href: '/contact' }
      ]
    }
  ]);

  socialMedia = signal<SocialLink[]>([
    {
      platform: 'GitHub',
      href: 'https://github.com/angular-superui',
      icon: 'github'
    },
    {
      platform: 'Twitter',
      href: 'https://twitter.com/angular-superui',
      icon: 'twitter'
    },
    {
      platform: 'Discord',
      href: 'https://discord.gg/angular-superui',
      icon: 'discord'
    }
  ]);

  handleNewsletterSignup(email: string) {
    console.log('Newsletter signup:', email);
    // Handle newsletter subscription
  }

  handleLinkClick(link: FooterLink) {
    console.log('Link clicked:', link);
    // Handle link analytics or custom behavior
  }
}
```

## Examples

### Complete Corporate Footer

Comprehensive footer with all features - perfect for business and corporate websites.

```typescript
@Component({
  template: `
    <footer-block
      [companyInfo]="corporateInfo()"
      [sections]="corporateSections()"
      [socialLinks]="corporateSocial()"
      [legalLinks]="legalInfo()"
      [showNewsletter]="true"
      variant="default"
      size="lg"
      (onNewsletterSubmit)="onNewsletterSubmit($event)"
      (onLinkClick)="onLinkClick($event)"
    />
  `
})
export class CorporateFooterExample {
  corporateInfo = signal<CompanyInfo>({
    name: 'TechCorp Solutions',
    description: 'Empowering businesses with cutting-edge technology solutions since 2010. Trusted by over 10,000 companies worldwide.',
    logo: '/assets/techcorp-logo.svg',
    address: {
      street: '456 Innovation Drive, Suite 200',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      country: 'United States'
    },
    contact: {
      email: 'contact@techcorp.com',
      phone: '+1 (512) 555-0123'
    }
  });

  corporateSections = signal<FooterSection[]>([
    {
      title: 'Solutions',
      links: [
        { text: 'Enterprise Software', href: '/solutions/enterprise' },
        { text: 'Cloud Services', href: '/solutions/cloud' },
        { text: 'Data Analytics', href: '/solutions/analytics' },
        { text: 'Cybersecurity', href: '/solutions/security' },
        { text: 'Consulting', href: '/solutions/consulting' }
      ]
    },
    {
      title: 'Industries',
      links: [
        { text: 'Healthcare', href: '/industries/healthcare' },
        { text: 'Finance', href: '/industries/finance' },
        { text: 'Manufacturing', href: '/industries/manufacturing' },
        { text: 'Retail', href: '/industries/retail' },
        { text: 'Education', href: '/industries/education' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { text: 'Documentation', href: '/docs' },
        { text: 'Case Studies', href: '/case-studies' },
        { text: 'White Papers', href: '/whitepapers' },
        { text: 'Webinars', href: '/webinars' },
        { text: 'API Documentation', href: '/api-docs', external: true }
      ]
    },
    {
      title: 'Support',
      links: [
        { text: 'Help Center', href: '/support' },
        { text: 'Contact Support', href: '/support/contact' },
        { text: 'System Status', href: '/status', external: true },
        { text: 'Community Forum', href: '/community', external: true },
        { text: 'Training', href: '/training' }
      ]
    }
  ]);

  corporateSocial = signal<SocialLink[]>([
    { platform: 'LinkedIn', href: 'https://linkedin.com/company/techcorp', icon: 'linkedin' },
    { platform: 'Twitter', href: 'https://twitter.com/techcorp', icon: 'twitter' },
    { platform: 'YouTube', href: 'https://youtube.com/techcorp', icon: 'youtube' },
    { platform: 'GitHub', href: 'https://github.com/techcorp', icon: 'github' }
  ]);

  legalInfo = signal<FooterLink[]>([
    { text: 'Privacy Policy', href: '/privacy' },
    { text: 'Terms of Service', href: '/terms' },
    { text: 'Cookie Policy', href: '/cookies' },
    { text: 'GDPR', href: '/gdpr' }
  ]);

  onNewsletterSubmit(email: string) {
    console.log('Newsletter signup:', email);
    // Handle enterprise newsletter subscription
  }

  onLinkClick(link: FooterLink) {
    console.log('Link clicked:', link);
    // Track corporate footer analytics
  }
}
```

### Minimal App Footer

Clean, minimal footer for applications and SaaS platforms.

```typescript
@Component({
  template: `
    <footer-block
      [companyInfo]="appInfo()"
      [sections]="appSections()"
      [socialLinks]="appSocial()"
      [showNewsletter]="false"
      variant="minimal"
      size="sm"
      (onLinkClick)="onLinkClick($event)"
    />
  `
})
export class MinimalFooterExample {
  appInfo = signal<CompanyInfo>({
    name: 'CloudApp',
    description: 'Simple, powerful cloud storage for everyone.',
    logo: '/assets/cloudapp-icon.svg'
  });

  appSections = signal<FooterSection[]>([
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '/features' },
        { text: 'Pricing', href: '/pricing' },
        { text: 'Security', href: '/security' },
        { text: 'API', href: '/api' }
      ]
    },
    {
      title: 'Support',
      links: [
        { text: 'Help Center', href: '/help' },
        { text: 'Contact', href: '/contact' },
        { text: 'Status', href: '/status', external: true }
      ]
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy', href: '/privacy' },
        { text: 'Terms', href: '/terms' }
      ]
    }
  ]);

  appSocial = signal<SocialLink[]>([
    { platform: 'Twitter', href: 'https://twitter.com/cloudapp', icon: 'twitter' },
    { platform: 'GitHub', href: 'https://github.com/cloudapp', icon: 'github' }
  ]);

  onLinkClick(link: FooterLink) {
    console.log('Link clicked:', link);
  }
}
```

### Dark Theme Footer

Dark-themed footer perfect for modern, tech-focused websites.

```typescript
@Component({
  template: `
    <footer-block
      [companyInfo]="techInfo()"
      [sections]="techSections()"
      [socialLinks]="techSocial()"
      [showNewsletter]="true"
      [newsletterTitle]="'Stay Updated'"
      [newsletterDescription]="'Get the latest updates on new features and product releases.'"
      variant="dark"
      size="default"
      (onNewsletterSubmit)="onNewsletterSubmit($event)"
      (onLinkClick)="onLinkClick($event)"
    />
  `
})
export class DarkFooterExample {
  techInfo = signal<CompanyInfo>({
    name: 'NeoTech',
    description: 'Building the future of technology with AI-powered solutions and innovative products.',
    logo: '/assets/neotech-logo-white.svg',
    contact: {
      email: 'hello@neotech.io'
    }
  });

  techSections = signal<FooterSection[]>([
    {
      title: 'Products',
      links: [
        { text: 'AI Platform', href: '/ai-platform' },
        { text: 'ML Tools', href: '/ml-tools' },
        { text: 'Data Pipeline', href: '/data-pipeline' },
        { text: 'Analytics Dashboard', href: '/analytics' }
      ]
    },
    {
      title: 'Developers',
      links: [
        { text: 'API Docs', href: '/api-docs', external: true },
        { text: 'SDKs', href: '/sdks' },
        { text: 'Examples', href: '/examples' },
        { text: 'Playground', href: '/playground', external: true }
      ]
    },
    {
      title: 'Community',
      links: [
        { text: 'Discord', href: '/discord', external: true },
        { text: 'Blog', href: '/blog' },
        { text: 'Events', href: '/events' },
        { text: 'Open Source', href: '/open-source' }
      ]
    }
  ]);

  techSocial = signal<SocialLink[]>([
    { platform: 'GitHub', href: 'https://github.com/neotech', icon: 'github' },
    { platform: 'Discord', href: 'https://discord.gg/neotech', icon: 'discord' },
    { platform: 'Twitter', href: 'https://twitter.com/neotech', icon: 'twitter' },
    { platform: 'LinkedIn', href: 'https://linkedin.com/company/neotech', icon: 'linkedin' }
  ]);

  onNewsletterSubmit(email: string) {
    console.log('Newsletter signup:', email);
    // Handle tech newsletter subscription
  }

  onLinkClick(link: FooterLink) {
    console.log('Link clicked:', link);
  }
}
```

### Creative Agency Footer

Stylish gradient footer for creative agencies and design studios.

```typescript
@Component({
  template: `
    <footer-block
      [companyInfo]="agencyInfo()"
      [sections]="agencySections()"
      [socialLinks]="agencySocial()"
      [showNewsletter]="true"
      [newsletterTitle]="'Creative Inspiration'"
      [newsletterDescription]="'Get weekly design tips and creative inspiration delivered to your inbox.'"
      variant="gradient"
      size="lg"
      (onNewsletterSubmit)="onNewsletterSubmit($event)"
      (onLinkClick)="onLinkClick($event)"
    />
  `
})
export class CreativeFooterExample {
  agencyInfo = signal<CompanyInfo>({
    name: 'Pixel Studio',
    description: 'Award-winning creative agency specializing in brand identity, web design, and digital experiences.',
    logo: '/assets/pixel-studio-logo.svg',
    address: {
      street: '789 Design District',
      city: 'New York',
      state: 'NY',
      zip: '10001'
    },
    contact: {
      email: 'hello@pixelstudio.com',
      phone: '+1 (212) 555-PIXEL'
    }
  });

  agencySections = signal<FooterSection[]>([
    {
      title: 'Services',
      links: [
        { text: 'Brand Identity', href: '/services/branding' },
        { text: 'Web Design', href: '/services/web-design' },
        { text: 'Digital Strategy', href: '/services/strategy' },
        { text: 'Content Creation', href: '/services/content' }
      ]
    },
    {
      title: 'Work',
      links: [
        { text: 'Portfolio', href: '/portfolio' },
        { text: 'Case Studies', href: '/case-studies' },
        { text: 'Client Stories', href: '/clients' },
        { text: 'Awards', href: '/awards' }
      ]
    },
    {
      title: 'Studio',
      links: [
        { text: 'About Us', href: '/about' },
        { text: 'Team', href: '/team' },
        { text: 'Careers', href: '/careers' },
        { text: 'Culture', href: '/culture' }
      ]
    }
  ]);

  agencySocial = signal<SocialLink[]>([
    { platform: 'Instagram', href: 'https://instagram.com/pixelstudio', icon: 'instagram' },
    { platform: 'Dribbble', href: 'https://dribbble.com/pixelstudio', icon: 'dribbble' },
    { platform: 'Behance', href: 'https://behance.net/pixelstudio', icon: 'behance' },
    { platform: 'LinkedIn', href: 'https://linkedin.com/company/pixelstudio', icon: 'linkedin' }
  ]);

  onNewsletterSubmit(email: string) {
    console.log('Newsletter signup:', email);
    // Handle creative newsletter subscription
  }

  onLinkClick(link: FooterLink) {
    console.log('Link clicked:', link);
  }
}
```

## Variants

### Default

```html
<footer-block variant="default">
```

Clean footer with border-top and background colors matching your theme.

### Dark

```html
<footer-block variant="dark">
```

Dark theme footer with slate background and white text.

### Gradient

```html
<footer-block variant="gradient">
```

Modern gradient background for visual impact and branding.

### Minimal

```html
<footer-block variant="minimal">
```

Subtle background with minimal styling for clean layouts.

## Sizes

### Small

```html
<footer-block size="sm">
```

Compact footer (py-8) for applications and minimal layouts.

### Standard

```html
<footer-block size="default">
```

Standard footer height (py-12) for most websites.

### Large

```html
<footer-block size="lg">
```

Spacious footer (py-16) for corporate and marketing sites.

## API Reference

### Component Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'dark' \| 'gradient' \| 'minimal'` | `'default'` | Footer styling variant |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Footer height and spacing |
| `companyInfo` | `CompanyInfo` | `undefined` | Company information and branding |
| `sections` | `FooterSection[]` | `[]` | Navigation sections and links |
| `socialLinks` | `SocialLink[]` | `[]` | Social media links |
| `legalLinks` | `FooterLink[]` | `[]` | Legal and policy links |
| `showNewsletter` | `boolean` | `false` | Show newsletter subscription form |
| `newsletterTitle` | `string` | `'Stay Updated'` | Newsletter section title |
| `newsletterDescription` | `string` | `undefined` | Newsletter section description |
| `copyrightText` | `string` | `undefined` | Custom copyright text |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLinkClick` | `EventEmitter<FooterLink>` | Emitted when a footer link is clicked |
| `onSocialClick` | `EventEmitter<SocialLink>` | Emitted when a social link is clicked |
| `onNewsletterSubmit` | `EventEmitter<string>` | Emitted when newsletter form is submitted |

### FooterSection Interface

```typescript
export interface FooterSection {
  title: string;                 // Section heading
  links: FooterLink[];           // Array of navigation links
}
```

### FooterLink Interface

```typescript
export interface FooterLink {
  text: string;                  // Link text
  href: string;                  // Link URL
  external?: boolean;            // Open in new tab
  icon?: string;                 // Optional icon name
}
```

### SocialLink Interface

```typescript
export interface SocialLink {
  platform: string;             // Platform name (e.g., 'GitHub')
  href: string;                  // Social media URL
  icon: string;                  // Icon name or SVG
}
```

### CompanyInfo Interface

```typescript
export interface CompanyInfo {
  name: string;                  // Company name
  description?: string;          // Company description
  logo?: string;                 // Logo image URL
  address?: {                    // Company address
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  contact?: {                    // Contact information
    email?: string;
    phone?: string;
  };
}
```

## Newsletter Integration

The footer includes a built-in newsletter subscription form:

```typescript
// Enable newsletter with custom content
<footer-block
  [showNewsletter]="true"
  newsletterTitle="Stay in the Loop"
  newsletterDescription="Get weekly updates on new features and industry insights."
  (onNewsletterSubmit)="handleNewsletterSignup($event)"
/>

// Handle newsletter submission
handleNewsletterSignup(email: string) {
  // Validate email
  if (this.isValidEmail(email)) {
    // Send to your newsletter service
    this.newsletterService.subscribe(email).subscribe({
      next: () => this.showSuccessMessage(),
      error: (err) => this.showErrorMessage(err)
    });
  }
}
```

## Responsive Behavior

The Footer Block is fully responsive and adapts to different screen sizes:

- **Mobile (< 768px)**: Single column layout with stacked sections
- **Tablet (768px - 1024px)**: 2-column layout with adjusted spacing
- **Desktop (> 1024px)**: Multi-column layout based on content

### Responsive Layout

| Screen Size | Layout | Columns |
|-------------|--------|---------|
| Mobile | Stacked | 1 |
| Tablet | Grid | 2 |
| Desktop | Grid | Up to 6 |

## Accessibility

The Footer Block includes comprehensive accessibility features:

- **Semantic HTML**: Proper footer, nav, and section elements
- **ARIA Labels**: Descriptive labels for screen readers
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Focus Management**: Visible focus indicators and logical tab order
- **Screen Reader Support**: Optimized for assistive technologies
- **Link Indicators**: Clear external link indicators

### Accessibility Best Practices

```typescript
// Provide clear link descriptions
links: [
  { 
    text: 'Privacy Policy',
    href: '/privacy',
    // Screen readers will announce "Privacy Policy link"
  },
  {
    text: 'GitHub Repository',
    href: 'https://github.com/company/repo',
    external: true
    // Screen readers will announce "GitHub Repository link, opens in new tab"
  }
]

// Use meaningful social platform names
socialLinks: [
  {
    platform: 'Follow us on Twitter',  // Descriptive platform text
    href: 'https://twitter.com/company',
    icon: 'twitter'
  }
]
```

## Customization

### CSS Variables

The Footer Block uses CSS custom properties for theming:

```css
.footer-block {
  --footer-bg: theme(colors.background);
  --footer-text: theme(colors.foreground);
  --footer-muted: theme(colors.muted.foreground);
  --footer-border: theme(colors.border);
  --footer-link-hover: theme(colors.primary);
}
```

### Custom Styling

Add custom styles by targeting the component classes:

```css
/* Custom footer styling */
.custom-footer footer-block {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Custom link styling */
.custom-footer .footer-link {
  position: relative;
  transition: all 0.3s ease;
}

.custom-footer .footer-link:hover {
  transform: translateY(-2px);
}

.custom-footer .footer-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.3s ease;
}

.custom-footer .footer-link:hover::after {
  width: 100%;
}

/* Custom social icons */
.custom-footer .social-icon {
  transition: all 0.3s ease;
}

.custom-footer .social-icon:hover {
  transform: scale(1.2) rotate(5deg);
}
```

### Tailwind CSS Customization

Extend the component with Tailwind classes:

```html
<footer-block
  class="border-t-4 border-gradient-to-r from-blue-500 to-purple-500"
  variant="default"
  [companyInfo]="company()"
/>
```

## Performance Considerations

- **Change Detection**: Component uses OnPush strategy for optimal performance
- **Bundle Size**: Tree-shakeable exports reduce bundle size
- **Image Optimization**: Consider optimizing logo and social icons
- **Lazy Loading**: Consider lazy loading for non-critical footer content

```typescript
// Optimize logo loading
companyInfo: {
  name: 'Company',
  logo: '/assets/logo.webp',      // Use WebP format
  // Add loading strategy for below-the-fold logos
}

// Use OnPush strategy in parent components
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Common Issues

#### Links Not Working Properly

```typescript
// ❌ Wrong: Missing href or incorrect format
links: [
  { text: 'About', href: '' },           // Empty href
  { text: 'Contact', href: 'contact' }   // Missing leading slash
]

// ✅ Correct: Proper href formatting
links: [
  { text: 'About', href: '/about' },     // Internal link
  { text: 'Contact', href: '/contact' },
  { text: 'GitHub', href: 'https://github.com/company', external: true }
]
```

#### Social Icons Not Displaying

```typescript
// ❌ Wrong: Invalid icon names
socialLinks: [
  { platform: 'Twitter', href: '...', icon: 'twitter-icon' }  // Non-existent icon
]

// ✅ Correct: Valid icon names
socialLinks: [
  { platform: 'Twitter', href: '...', icon: 'twitter' },
  { platform: 'GitHub', href: '...', icon: 'github' }
]
```

#### Newsletter Form Not Submitting

```typescript
// Ensure proper event handling
onNewsletterSubmit(email: string) {
  if (!email || !this.isValidEmail(email)) {
    this.showError('Please enter a valid email address');
    return;
  }
  
  // Handle subscription
  this.subscribeToNewsletter(email);
}
```

## Related Components

- [Button Component](../components/button.md) - For custom CTA buttons
- [Input Component](../components/input.md) - For newsletter email input
- [Header Block](./header.md) - For complementary header navigation
- [Link Component](../components/link.md) - For custom link styling

## Contributing

Found a bug or want to contribute? Check out our [Contributing Guidelines](../../CONTRIBUTING.md) and submit a pull request on [GitHub](https://github.com/bhaimicrosoft/angular-superui).

## Changelog

### v0.1.0

- Initial release of Footer Block component
- Support for multiple variants and sizes
- Comprehensive company information display
- Social media integration with custom icons
- Newsletter subscription functionality
- Responsive design with mobile-first approach
- Full accessibility implementation
- TypeScript interfaces and type safety

---

*For more examples and advanced usage, check out our [Storybook](https://storybook.angular-superui.com) or visit the [live demo](https://angular-superui.com/blocks/footer).*
