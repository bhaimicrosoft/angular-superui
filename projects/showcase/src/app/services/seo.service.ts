import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AnalyticsService } from './analytics.service';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private meta = inject(Meta);
  private title = inject(Title);
  private analytics = inject(AnalyticsService);

  private readonly defaultSEO: SEOData = {
    title: 'Angular SuperUI - Ultimate Headless UI Component Library for Angular',
    description: 'The ultimate headless UI component library for Angular. 39+ modern, accessible components including dialogs, forms, data tables, navigation, and more. Built with TypeScript, Tailwind CSS, and zero dependencies. Perfect alternative to Shadcn/ui for Angular developers.',
    keywords: 'headless ui, angular ui, angular components, angular library, angular framework, ui components, component library, angular design system, tailwind css components, typescript components, accessible components, modern ui, angular headless ui, shadcn angular, radix angular, chakra ui angular, material ui alternative, antd angular, angular component kit, ui framework, design tokens, angular ui kit, responsive components, form components, dialog components, navigation components, data table, button components, input components, angular widgets, frontend framework, ui building blocks, component collection, enterprise ui, production ready components, Angular SuperUI, angular-superui, ngsui, zero dependencies, tree shakable, cli installation, mobile responsive, dark mode, drag drop, file upload, calendar picker, accessibility wcag',
    image: 'https://angular-superui.vercel.app/assets/angular-superui-social.png',
    url: 'https://angular-superui.vercel.app',
    type: 'website',
    author: 'Angular SuperUI Team'
  };

  updateSEO(seoData: Partial<SEOData>) {
    const data = { ...this.defaultSEO, ...seoData };

    // Track SEO page view for analytics
    this.analytics.trackEngagement('view_example', `SEO: ${data.title}`);

    // Update title
    if (data.title) {
      this.title.setTitle(data.title);
    }

    // Update meta tags
    this.updateMetaTag('description', data.description);
    this.updateMetaTag('keywords', data.keywords);
    this.updateMetaTag('author', data.author);
    
    // Open Graph tags
    this.updateMetaTag('og:title', data.title, 'property');
    this.updateMetaTag('og:description', data.description, 'property');
    this.updateMetaTag('og:image', data.image, 'property');
    this.updateMetaTag('og:url', data.url, 'property');
    this.updateMetaTag('og:type', data.type, 'property');
    
    // Twitter Card tags
    this.updateMetaTag('twitter:title', data.title);
    this.updateMetaTag('twitter:description', data.description);
    this.updateMetaTag('twitter:image', data.image);
    
    // Article specific tags
    if (data.publishedTime) {
      this.updateMetaTag('article:published_time', data.publishedTime, 'property');
    }
    if (data.modifiedTime) {
      this.updateMetaTag('article:modified_time', data.modifiedTime, 'property');
    }

    // Canonical URL
    this.updateCanonicalUrl(data.url);
  }

  private updateMetaTag(name: string, content: string | undefined, attribute: string = 'name') {
    if (content) {
      if (this.meta.getTag(`${attribute}="${name}"`)) {
        this.meta.updateTag({ [attribute]: name, content });
      } else {
        this.meta.addTag({ [attribute]: name, content });
      }
    }
  }

  private updateCanonicalUrl(url: string | undefined) {
    if (url) {
      const existingLink = document.querySelector('link[rel="canonical"]');
      if (existingLink) {
        existingLink.setAttribute('href', url);
      } else {
        const link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', url);
        document.head.appendChild(link);
      }
    }
  }

  // Predefined SEO data for common pages
  getHomepageSEO(): SEOData {
    return {
      title: 'Angular SuperUI - Modern Angular Component Library | UI Framework',
      description: 'Build stunning Angular applications with our comprehensive component library. 50+ components, TypeScript support, Tailwind CSS integration, and full accessibility compliance.',
      keywords: 'Angular UI, Angular components, Angular library, Angular framework, UI components, TypeScript components, Tailwind CSS, modern UI, component library',
      url: 'https://angular-superui.vercel.app'
    };
  }

  getComponentSEO(componentName: string): SEOData {
    const componentTitle = componentName.charAt(0).toUpperCase() + componentName.slice(1);
    
    // Track component page view for analytics
    this.analytics.trackComponentView(componentName);
    
    const componentDescriptions: Record<string, string> = {
      'accordion': 'Collapsible content panels with smooth animations. Perfect for FAQs, navigation menus, and content organization in your Angular applications.',
      'alert': 'Contextual feedback messages with multiple variants. Display success, error, warning, and info messages with beautiful styling and icons.',
      'avatar': 'User profile pictures and placeholders with fallback options. Support for images, initials, and custom icons in various sizes.',
      'badge': 'Small status indicators and labels. Perfect for notifications, counts, status displays, and categorization in your Angular UI.',
      'breadcrumb': 'Navigation hierarchy indicators showing user location. Improve UX with clear path navigation and SEO-friendly structure.',
      'button': 'Interactive button components with multiple variants, sizes, and states. Includes loading states, icons, and accessibility features.',
      'calendar': 'Date picker and calendar components with full customization. Support for date ranges, multiple selections, and event display.',
      'card': 'Container components for grouping related content. Perfect for displaying products, profiles, articles, and dashboard widgets.',
      'carousel': 'Image and content sliders with navigation controls. Responsive, touch-friendly, and highly customizable for any content type.',
      'checkbox': 'Form input controls for multiple selections. Includes indeterminate states, custom styling, and form validation support.',
      'dialog': 'Modal dialogs and overlays for user interactions. Includes forms, confirmations, notifications, and custom content displays.',
      'drawer': 'Slide-out panels from screen edges for navigation and content. Perfect for mobile menus, filters, settings panels, and sidebar navigation.'
    };

    const componentKeywords: Record<string, string> = {
      'accordion': 'Angular accordion, collapsible panels, FAQ component, content organization, expandable sections',
      'alert': 'Angular alerts, notification messages, toast notifications, feedback messages, status indicators',
      'avatar': 'Angular avatar, profile pictures, user images, placeholder images, initials component',
      'badge': 'Angular badge, status indicators, notification badges, labels, count displays',
      'breadcrumb': 'Angular breadcrumb, navigation hierarchy, page navigation, SEO breadcrumbs, path indicators',
      'button': 'Angular button, interactive buttons, loading buttons, icon buttons, form buttons',
      'calendar': 'Angular calendar, date picker, date selection, event calendar, datepicker component',
      'card': 'Angular card, content containers, dashboard cards, product cards, information panels',
      'carousel': 'Angular carousel, image slider, content slider, responsive carousel, touch slider',
      'checkbox': 'Angular checkbox, form controls, multiple selection, checkboxes, form validation',
      'dialog': 'Angular dialog, modal windows, popup dialogs, overlay components, form modals',
      'drawer': 'Angular drawer, slide panels, sidebar navigation, mobile menu, slide-out panels, off-canvas navigation'
    };

    return {
      title: `${componentTitle} Component - Angular SuperUI | Modern Angular UI Library`,
      description: componentDescriptions[componentName] || `Learn how to use the ${componentTitle} component from Angular SuperUI. Complete examples, API reference, and best practices for building modern Angular applications.`,
      keywords: `Angular ${componentName}, ${componentName} component, Angular UI, ${componentKeywords[componentName] || componentName + ' examples'}, Angular SuperUI ${componentName}, TypeScript component`,
      url: `https://angular-superui.vercel.app/components/${componentName}`,
      type: 'article',
      publishedTime: '2025-01-01T00:00:00Z',
      modifiedTime: new Date().toISOString()
    };
  }

  getDocumentationSEO(docName: string): SEOData {
    const docTitle = docName.charAt(0).toUpperCase() + docName.slice(1);
    
    // Track documentation page view for analytics
    this.analytics.trackDocumentationView(docName);
    
    return {
      title: `${docTitle} - Angular SuperUI Documentation | Modern Angular UI Library`,
      description: `Complete ${docTitle} guide for Angular SuperUI. Learn how to install, configure, and use our modern Angular component library effectively.`,
      keywords: `Angular SuperUI ${docName}, Angular UI documentation, ${docName} guide, Angular component library setup`,
      url: `https://angular-superui.vercel.app/${docName}`
    };
  }

  // Add structured data for components
  addComponentStructuredData(componentName: string) {
    const componentTitle = componentName.charAt(0).toUpperCase() + componentName.slice(1);
    
    // Track structured data implementation for analytics
    this.analytics.trackFeatureUsage('structured_data', componentName);
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": `${componentTitle} Component - Angular SuperUI`,
      "description": `Interactive examples and documentation for the ${componentTitle} component from Angular SuperUI. Learn implementation patterns, API usage, and best practices.`,
      "author": {
        "@type": "Organization",
        "name": "Angular SuperUI Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Angular SuperUI",
        "logo": {
          "@type": "ImageObject",
          "url": "https://angular-superui.vercel.app/assets/logo.png"
        }
      },
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://angular-superui.vercel.app/components/${componentName}`
      },
      "keywords": `Angular ${componentName}, ${componentName} component, Angular UI, ${componentName} examples, Angular SuperUI`,
      "articleSection": "Components",
      "inLanguage": "en-US"
    };

    this.addStructuredData(structuredData);
  }

  private addStructuredData(data: any) {
    // Remove existing structured data for this page
    const existingScript = document.querySelector('script[type="application/ld+json"]#component-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'component-data';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }
}
