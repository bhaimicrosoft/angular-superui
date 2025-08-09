import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'components/input',
    loadComponent: () =>
      import('./demo-components/input-demo.component').then(
        (c) => c.InputDemoComponent
      ),
    data: {
      componentName: 'input',
      category: 'Form',
      description: 'Accessible and customizable input fields',
    },
  },
  {
    path: 'components/menubar',
    loadComponent: () =>
      import('./demo-components/menubar-demo.component').then(
        (c) => c.MenubarDemoComponent
      ),
    data: {
      componentName: 'menubar',
      category: 'Navigation',
      description: 'Application menubar with nested submenus and keyboard navigation',
    },
  },
  {
    path: 'components/toolbar',
    loadComponent: () =>
      import('./demo-components/toolbar-demo.component').then(
        (c) => c.ToolbarDemoComponent
      ),
    data: {
      componentName: 'toolbar',
      category: 'Layout',
      description: 'Group actions and inputs in a compact, responsive bar',
      seo: {
        title: 'Toolbar Component - Angular SuperUI | Action & App Bars',
        description:
          'Flexible toolbar component for grouping actions, inputs, and navigation. Supports orientations, variants, sticky mode, and accessibility.',
        keywords:
          'Angular toolbar, action bar, app bar, sticky toolbar, vertical toolbar, Angular components, Tailwind toolbar',
      },
    },
  },
  {
    path: 'components/icon',
    loadComponent: () =>
      import('./demo-components/icon-demo.component').then(
        (c) => c.IconDemoComponent
      ),
    data: {
      componentName: 'icon',
      category: 'Display',
      description:
        'Universal icon component supporting SVG/HTML strings, CSS classes, Angular components, templates, and Lucide data',
      seo: {
        title:
          'Icon Component - Angular SuperUI | Universal Icon Rendering',
        description:
          'Render icons from HTML/SVG, CSS classes, Angular components, templates, and Lucide data with accessibility and security.',
        keywords:
          'Angular icon component, SVG icons, Font Awesome, Lucide Angular, TemplateRef icon, accessible icons, sanitized SVG',
      },
    },
  },
  {
    path: 'components/input-otp',
    loadComponent: () =>
      import('./demo-components/input-otp-demo.component').then(
        (c) => c.InputOTPDemoComponent
      ),
    data: {
      componentName: 'input-otp',
      category: 'Form',
      description:
        'Secure one-time password input with accessibility and validation',
    },
  },
 
  {
    path: 'feature-comparison',
    loadComponent: () =>
      import('./demo-components/feature-comparison.component').then(
        (c) => c.FeatureComparisonComponent
      ),
    data: {
      seo: {
        title:
          'Angular SuperUI vs Other UI Frameworks - Feature Comparison | Why Choose Angular SuperUI',
        description:
          'Comprehensive comparison of Angular SuperUI with Angular Material, PrimeNG, Ng-Bootstrap, and Ant Design. Discover why Angular SuperUI is the superior choice for modern Angular applications.',
        keywords:
          'Angular SuperUI comparison, Angular Material vs SuperUI, PrimeNG comparison, Angular UI framework comparison, best Angular UI library, modern Angular components',
      },
    },
  },
  // UI Blocks

  {
    path: 'blocks/header',
    loadComponent: () =>
      import('./demo-components/header-new-demo.component').then(
        (c) => c.HeaderNewDemoComponent
      ),
    data: {
      blockName: 'header',
      category: 'Navigation',
      description:
        'Complete header block with navigation, search, user menu, and mobile support',
    },
  },
  {
    path: 'blocks/hero-section',
    loadComponent: () =>
      import('./demo-components/hero-section-new-demo.component').then(
        (c) => c.HeroSectionNewDemoComponent
      ),
    data: {
      blockName: 'hero-section',
      category: 'Content',
      description:
        'Eye-catching landing page heroes with CTAs and background options',
    },
  },
  {
    path: 'blocks/pricing-cards',
    loadComponent: () =>
      import('./demo-components/pricing-cards-demo.component').then(
        (c) => c.PricingCardsDemoComponent
      ),
    data: {
      blockName: 'pricing-cards',
      category: 'Content',
      description:
        'Professional pricing tables with feature comparison and billing toggles',
    },
  },
  {
    path: 'blocks/footer',
    loadComponent: () =>
      import('./demo-components/footer-new-demo.component').then(
        (c) => c.FooterNewDemoComponent
      ),
    data: {
      blockName: 'footer',
      category: 'Navigation',
      description:
        'Comprehensive footer layouts with links, social icons, and company info',
    },
  },
  {
    path: 'blocks/feature-grid',
    loadComponent: () =>
      import('./demo-components/feature-grid-new-demo.component').then(
        (c) => c.FeatureGridNewDemoComponent
      ),
    data: {
      blockName: 'feature-grid',
      category: 'Content',
      description:
        'Showcase product features with icons, descriptions, and compelling layouts',
    },
  },
  {
    path: 'blocks/feature-card',
    loadComponent: () =>
      import('./demo-components/feature-card-demo.component').then(
        (c) => c.FeatureCardDemoComponent
      ),
    data: {
      blockName: 'feature-card',
      category: 'Content',
      description:
        'Individual feature cards with multiple styles and design variants',
    },
  },
  {
    path: 'blocks/testimonial',
    loadComponent: () =>
      import('./demo-components/testimonial-demo.component').then(
        (c) => c.TestimonialDemoComponent
      ),
    data: {
      blockName: 'testimonial',
      category: 'Content',
      description:
        'Customer testimonials and reviews with beautiful layouts and social proof',
    },
  },
  {
    path: 'blocks/team-grid',
    loadComponent: () =>
      import('./demo-components/team-grid-demo.component').then(
        (c) => c.TeamGridDemoComponent
      ),
    data: {
      blockName: 'team-grid',
      category: 'Content',
      description:
        'Showcase team members with beautiful, responsive grid layouts',
    },
  },
  {
    path: 'blocks/stats-counter',
    loadComponent: () =>
      import('./demo-components/stats-counter-demo.component').then(
        (c) => c.StatsCounterDemoComponent
      ),
    data: {
      blockName: 'stats-counter',
      category: 'Content',
      description:
        'Animated statistics counter with customizable layouts and formatting',
    },
  },
  {
    path: 'blocks',
    loadComponent: () =>
      import('./demo-components/blocks.component').then(
        (c) => c.BlocksComponent
      ),
    data: {
      seo: {
        title: 'UI Blocks - Angular SuperUI | Complete Layout Solutions',
        description:
          'Pre-built UI blocks and layout solutions for Angular applications. Headers, footers, hero sections, pricing cards, and more. Save weeks of development time with production-ready blocks.',
        keywords:
          'Angular UI blocks, layout blocks, header block, footer block, hero section, pricing cards, Angular components, UI layouts, responsive blocks',
      },
    },
  },
  // UI Components
  {
    path: 'components/accordion',
    loadComponent: () =>
      import('./demo-components/accordion-demo.component').then(
        (c) => c.AccordionDemoComponent
      ),
    data: {
      componentName: 'accordion',
      category: 'Layout',
      description: 'Collapsible content sections',
    },
  },
  {
    path: 'components/alert',
    loadComponent: () =>
      import('./demo-components/alert-demo.component').then(
        (c) => c.AlertDemoComponent
      ),
    data: {
      componentName: 'alert',
      category: 'Feedback',
      description: 'Display important messages',
    },
  },
  {
    path: 'components/alert-dialog',
    loadComponent: () =>
      import('./demo-components/alert-dialog-demo.component').then(
        (c) => c.AlertDialogDemoComponent
      ),
    data: {
      componentName: 'alert-dialog',
      category: 'Overlay',
      description: 'Modal dialogs and overlays',
    },
  },
  {
    path: 'components/aspect-ratio',
    loadComponent: () =>
      import('./demo-components/aspect-ratio-demo.component').then(
        (c) => c.AspectRatioDemo
      ),
    data: {
      componentName: 'aspect-ratio',
      category: 'Layout',
      description: 'Responsive aspect ratio containers',
    },
  },
  {
    path: 'components/avatar',
    loadComponent: () =>
      import('./demo-components/avatar-demo.component').then(
        (c) => c.AvatarDemoComponent
      ),
    data: {
      componentName: 'avatar',
      category: 'Display',
      description: 'User profile pictures',
    },
  },
  {
    path: 'components/badge',
    loadComponent: () =>
      import('./demo-components/badge-demo.component').then(
        (c) => c.BadgeDemoComponent
      ),
    data: {
      componentName: 'badge',
      category: 'Display',
      description: 'Small status indicators',
    },
  },
  {
    path: 'components/breadcrumb',
    loadComponent: () =>
      import('./demo-components/breadcrumb-demo.component').then(
        (c) => c.BreadcrumbDemoComponent
      ),
    data: {
      componentName: 'breadcrumb',
      category: 'Navigation',
      description: 'Navigation hierarchy',
    },
  },
  {
    path: 'components/button',
    loadComponent: () =>
      import('./demo-components/button-demo.component').then(
        (c) => c.ButtonDemoComponent
      ),
    data: {
      componentName: 'button',
      category: 'Form',
      description: 'Interactive elements',
    },
  },
  {
    path: 'components/calendar',
    loadComponent: () =>
      import('./demo-components/calendar-demo.component').then(
        (c) => c.CalendarDemoComponent
      ),
    data: {
      componentName: 'calendar',
      category: 'Form',
      description: 'Date picker and calendar',
    },
  },
  {
    path: 'components/card',
    loadComponent: () =>
      import('./demo-components/card-demo.component').then(
        (c) => c.CardDemoComponent
      ),
    data: {
      componentName: 'card',
      category: 'Layout',
      description: 'Content containers',
    },
  },
  {
    path: 'components/carousel',
    loadComponent: () =>
      import('./demo-components/carousel-demo.component').then(
        (c) => c.CarouselDemoComponent
      ),
    data: {
      componentName: 'carousel',
      category: 'Display',
      description: 'Image and content sliders',
    },
  },
  {
    path: 'components/checkbox',
    loadComponent: () =>
      import('./demo-components/checkbox-demo.component').then(
        (c) => c.CheckboxDemoComponent
      ),
    data: {
      componentName: 'checkbox',
      category: 'Form',
      description: 'Selection controls',
    },
  },
  {
    path: 'components/chip',
    loadComponent: () =>
      import('./demo-components/chip-demo.component').then(
        (c) => c.ChipDemoComponent
      ),
    data: {
      componentName: 'chip',
      category: 'Display',
      description: 'Removable labels, tags, and filter chips',
    },
  },
  {
    path: 'components/collapsible',
    loadComponent: () =>
      import('./demo-components/collapsible-demo.component').then(
        (c) => c.CollapsibleDemo
      ),
    data: {
      componentName: 'collapsible',
      category: 'Layout',
      description: 'Expandable content with smooth animations',
    },
  },
  {
    path: 'components/combobox',
    loadComponent: () =>
      import('./demo-components/combobox-demo.component').then(
        (c) => c.ComboboxDemo
      ),
    data: {
      componentName: 'combobox',
      category: 'Form',
      description: 'Smart selection interface with search and multi-select',
    },
  },
  {
    path: 'components/context-menu',
    loadComponent: () =>
      import('./demo-components/context-menu-demo.component').then(
        (c) => c.ContextMenuDemo
      ),
    data: {
      componentName: 'context-menu',
      category: 'Interaction',
      description:
        'Right-click context menus with smart positioning and accessibility',
    },
  },
  {
    path: 'components/data-table',
    loadComponent: () =>
      import('./demo-components/data-table-demo.component').then(
        (c) => c.DataTableDemoComponent
      ),
    data: {
      componentName: 'data-table',
      category: 'Display',
      description: 'A feature-rich table for displaying large datasets.',
    },
  },
  {
    path: 'components/dialog',
    loadComponent: () =>
      import('./demo-components/dialog-demo.component').then(
        (c) => c.DialogDemoComponent
      ),
    data: {
      componentName: 'dialog',
      category: 'Overlay',
      description: 'Modal dialogs and overlays',
    },
  },
  {
    path: 'components/drawer',
    loadComponent: () =>
      import('./demo-components/drawer-demo.component').then(
        (c) => c.DrawerDemoComponent
      ),
    data: {
      componentName: 'drawer',
      category: 'Navigation',
      description: 'Slide-out panels from screen edges',
    },
  },
  {
    path: 'components/dropdown-menu',
    loadComponent: () =>
      import('./demo-components/dropdown-menu-demo.component').then(
        (c) => c.DropdownMenuDemoComponent
      ),
    data: {
      componentName: 'dropdown-menu',
      category: 'Navigation',
      description: 'Contextual menu dropdowns',
    },
  },
  {
    path: 'components/file-upload',
    loadComponent: () =>
      import('./demo-components/file-upload-demo.component').then(
        (c) => c.FileUploadDemoComponent
      ),
    data: {
      componentName: 'file-upload',
      category: 'Form',
      description:
        'Advanced file upload with drag-and-drop, progress tracking, and validation',
    },
  },
  {
    path: 'components/textarea',
    loadComponent: () =>
      import('./demo-components/textarea-demo.component').then(
        (c) => c.TextareaDemoComponent
      ),
    data: {
      componentName: 'textarea',
      category: 'Form',
      description:
        'Multi-line text input with auto-resize, validation, and accessibility support',
    },
  },
  {
    path: 'components/toast',
    loadComponent: () =>
      import('./demo-components/toast-demo.component').then(
        (c) => c.ToastDemoComponent
      ),
    data: {
      componentName: 'toast',
      category: 'Feedback',
      description:
        'Smart notifications with progress tracking, positioning, and smooth animations',
    },
  },
  {
    path: 'components/tooltip',
    loadComponent: () =>
      import('./demo-components/tooltip-demo.component').then(
        (c) => c.TooltipDemoComponent
      ),
    data: {
      componentName: 'tooltip',
      category: 'Overlay',
      description:
        'Intelligent tooltip component with smart positioning, multiple triggers, and accessibility',
    },
  },
  {
    path: 'components/toggle',
    loadComponent: () =>
      import('./demo-components/toggle-demo.component').then(
        (c) => c.ToggleDemoComponent
      ),
    data: {
      componentName: 'toggle',
      category: 'Form',
      description:
        'Advanced toggle/switch component with multiple variants and form integration',
    },
  },
  {
    path: 'components/tabs',
    loadComponent: () =>
      import('./demo-components/tabs-demo.component').then(
        (c) => c.TabsDemoComponent
      ),
    data: {
      componentName: 'tabs',
      category: 'Navigation',
      description:
        'Beautiful, accessible, and fully customizable tabs component with multiple variants, smooth animations, and comprehensive form integration',
      seo: {
        title:
          'Tabs Component - Angular SuperUI | Responsive & Accessible Tab Navigation',
        description:
          'Comprehensive Angular tabs component with multiple variants, smooth animations, and full responsive design. Features accessibility support, form integration, and optimized performance for modern web applications.',
        keywords:
          'Angular tabs, tab component, responsive tabs, accessible tabs, Angular UI, tab navigation, TypeScript tabs, Angular signals, WCAG compliant, mobile tabs',
      },
    },
  },
  {
    path: 'components/pagination',
    loadComponent: () =>
      import('./demo-components/pagination-demo.component').then(
        (c) => c.PaginationDemoComponent
      ),
    data: {
      componentName: 'pagination',
      category: 'Navigation',
      description:
        'Navigate through large datasets with intelligent page controls',
    },
  },
  {
    path: 'components/progress',
    loadComponent: () =>
      import('./demo-components/progress-demo.component').then(
        (c) => c.ProgressDemoComponent
      ),
    data: {
      componentName: 'progress',
      category: 'Feedback',
      description:
        'Displays completion progress with accessibility and smooth animations',
    },
  },
  {
    path: 'components/radio-group',
    loadComponent: () =>
      import('./demo-components/radio-group-demo.component').then(
        (c) => c.RadioGroupDemoComponent
      ),
    data: {
      componentName: 'radio-group',
      category: 'Form',
      description:
        'Radio button groups with full accessibility and form integration',
    },
  },
  {
    path: 'components/rating',
    loadComponent: () =>
      import('./demo-components/rating-demo.component').then(
        (c) => c.RatingDemoComponent
      ),
    data: {
      componentName: 'rating',
      category: 'Form',
      description:
        'Interactive star rating component with accessibility, animations, and form integration',
    },
  },
  {
    path: 'components/select',
    loadComponent: () => import('./demo-components/select-demo.component'),
    data: {
      componentName: 'select',
      category: 'Form',
      description:
        'Dropdown selection component with search, grouping, and accessibility features',
    },
  },
  {
    path: 'components/slider',
    loadComponent: () =>
      import('./demo-components/slider-demo.component').then(
        (c) => c.SliderDemoComponent
      ),
    data: {
      componentName: 'slider',
      category: 'Form',
      description:
        'Range slider controls with single and dual values, custom styling, and full accessibility',
    },
  },
  {
    path: 'components/stepper',
    loadComponent: () =>
      import('./demo-components/stepper-demo.component').then(
        (c) => c.StepperDemoComponent
      ),
    data: {
      componentName: 'stepper',
      category: 'Navigation',
      description:
        'Multi-step form wizard with progress tracking, validation, and accessibility',
    },
  },
  {
    path: 'components/sidebar',
    loadComponent: () =>
      import('./demo-components/sidebar-demo.component').then(
        (c) => c.SidebarDemoComponent
      ),
    data: {
      componentName: 'sidebar',
      category: 'Navigation',
      description:
        'Responsive sidebar navigation with multiple modes and full accessibility',
    },
  },
  {
    path: 'components/skeleton',
    loadComponent: () =>
      import('./demo-components/skeleton-demo.component').then(
        (c) => c.SkeletonDemoComponent
      ),
    data: {
      componentName: 'skeleton',
      category: 'Feedback',
      description:
        'Placeholder loading states with smooth animations and accessibility',
    },
  },
  {
    path: 'components/spinner',
    loadComponent: () =>
      import('./demo-components/spinner-demo.component').then(
        (c) => c.SpinnerDemoComponent
      ),
    data: {
      componentName: 'spinner',
      category: 'Feedback',
      description:
        'Beautiful loading indicators with multiple animation types and full accessibility',
    },
  },

  {
    path: 'components/popover',
    loadComponent: () =>
      import('./demo-components/popover-demo.component').then(
        (c) => c.PopoverDemoComponent
      ),
    data: {
      componentName: 'popover',
      category: 'Overlay',
      description:
        'Floating content containers with intelligent positioning and accessibility',
    },
  },
  // Home route - must be near the end but before wildcard
  {
    path: '',
    loadComponent: () =>
      import('./demo-components/home.component').then((c) => c.HomeComponent),
    data: {
      seo: {
        title:
          'Angular SuperUI - Modern Angular Component Library | UI Framework',
        description:
          'Build stunning Angular applications with our comprehensive component library. 50+ components, TypeScript support, Tailwind CSS integration, and full accessibility compliance.',
        keywords:
          'Angular UI, Angular components, Angular library, Angular framework, UI components, TypeScript components, Tailwind CSS, modern UI, component library, Angular UI library',
      },
    },
  },
  // Wildcard route - must be the very last route
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];
