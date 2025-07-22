import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'components/input',
    loadComponent: () => import('./demo-components/input-demo.component').then(c => c.InputDemoComponent),
    data: { componentName: 'input', category: 'Form', description: 'Accessible and customizable input fields' }
  },
  {
    path: '',
    loadComponent: () => import('./demo-components/home.component').then(c => c.HomeComponent),
    data: {
      seo: {
        title: 'Angular SuperUI - Modern Angular Component Library | UI Framework',
        description: 'Build stunning Angular applications with our comprehensive component library. 50+ components, TypeScript support, Tailwind CSS integration, and full accessibility compliance.',
        keywords: 'Angular UI, Angular components, Angular library, Angular framework, UI components, TypeScript components, Tailwind CSS, modern UI, component library, Angular UI library'
      }
    }
  },
  // UI Components
  {
    path: 'components/accordion',
    loadComponent: () => import('./demo-components/accordion-demo.component').then(c => c.AccordionDemoComponent),
    data: { componentName: 'accordion', category: 'Layout', description: 'Collapsible content sections' }
  },
  {
    path: 'components/alert',
    loadComponent: () => import('./demo-components/alert-demo.component').then(c => c.AlertDemoComponent),
    data: { componentName: 'alert', category: 'Feedback', description: 'Display important messages' }
  },
  {
    path: 'components/avatar',
    loadComponent: () => import('./demo-components/avatar-demo.component').then(c => c.AvatarDemoComponent),
    data: { componentName: 'avatar', category: 'Display', description: 'User profile pictures' }
  },
  {
    path: 'components/badge',
    loadComponent: () => import('./demo-components/badge-demo.component').then(c => c.BadgeDemoComponent),
    data: { componentName: 'badge', category: 'Display', description: 'Small status indicators' }
  },
  {
    path: 'components/breadcrumb',
    loadComponent: () => import('./demo-components/breadcrumb-demo.component').then(c => c.BreadcrumbDemoComponent),
    data: { componentName: 'breadcrumb', category: 'Navigation', description: 'Navigation hierarchy' }
  },
  {
    path: 'components/button',
    loadComponent: () => import('./demo-components/button-demo.component').then(c => c.ButtonDemoComponent),
    data: { componentName: 'button', category: 'Form', description: 'Interactive elements' }
  },
  {
    path: 'components/calendar',
    loadComponent: () => import('./demo-components/calendar-demo.component').then(c => c.CalendarDemoComponent),
    data: { componentName: 'calendar', category: 'Form', description: 'Date picker and calendar' }
  },
  {
    path: 'components/card',
    loadComponent: () => import('./demo-components/card-demo.component').then(c => c.CardDemoComponent),
    data: { componentName: 'card', category: 'Layout', description: 'Content containers' }
  },
  {
    path: 'components/carousel',
    loadComponent: () => import('./demo-components/carousel-demo.component').then(c => c.CarouselDemoComponent),
    data: { componentName: 'carousel', category: 'Display', description: 'Image and content sliders' }
  },
  {
    path: 'components/checkbox',
    loadComponent: () => import('./demo-components/checkbox-demo.component').then(c => c.CheckboxDemoComponent),
    data: { componentName: 'checkbox', category: 'Form', description: 'Selection controls' }
  },
  {
    path: 'components/dataTable',
    loadComponent: () => import('./demo-components/data-table-demo.component').then(c => c.DataTableDemoComponent),
    data: { componentName: 'datatable', category: 'Display', description: 'A feature-rich table for displaying large datasets.' }
  },
  {
    path: 'components/dialog',
    loadComponent: () => import('./demo-components/dialog-demo.component').then(c => c.DialogDemoComponent),
    data: { componentName: 'dialog', category: 'Overlay', description: 'Modal dialogs and overlays' }
  },
  {
    path: 'components/dropdown-menu',
    loadComponent: () => import('./demo-components/dropdown-menu-demo.component').then(c => c.DropdownMenuDemoComponent),
    data: { componentName: 'dropdown-menu', category: 'Navigation', description: 'Contextual menu dropdowns' }
  },
  {
    path: 'components/slide-panel',
    loadComponent: () => import('./demo-components/drawer-demo.component').then(c => c.DrawerDemoComponent),
    data: { componentName: 'drawer', category: 'Navigation', description: 'Slide-out panels from screen edges' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
