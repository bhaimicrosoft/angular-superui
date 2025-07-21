import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./demo-components/home.component').then(c => c.HomeComponent),
    data: {
      seo: {
        title: 'Angular SuperUI - Modern Angular Component Library | UI Framework',
        description: 'Build stunning Angular applications with our comprehensive component library. 50+ components, TypeScript support, Tailwind CSS integration, and full accessibility compliance.',
        keywords: 'Angular UI, Angular components, Angular library, Angular framework, UI components, TypeScript components, Tailwind CSS, modern UI, component library'
      }
    }
  },
  // UI Components
  {
    path: 'components/accordion',
    loadComponent: () => import('./demo-components/accordion-demo.component').then(c => c.AccordionDemoComponent),
    data: { componentName: 'accordion' }
  },
  {
    path: 'components/alert',
    loadComponent: () => import('./demo-components/alert-demo.component').then(c => c.AlertDemoComponent),
    data: { componentName: 'alert' }
  },
  {
    path: 'components/avatar',
    loadComponent: () => import('./demo-components/avatar-demo.component').then(c => c.AvatarDemoComponent),
    data: { componentName: 'avatar' }
  },
  {
    path: 'components/badge',
    loadComponent: () => import('./demo-components/badge-demo.component').then(c => c.BadgeDemoComponent),
    data: { componentName: 'badge' }
  },
  {
    path: 'components/breadcrumb',
    loadComponent: () => import('./demo-components/breadcrumb-demo.component').then(c => c.BreadcrumbDemoComponent),
    data: { componentName: 'breadcrumb' }
  },
  {
    path: 'components/button',
    loadComponent: () => import('./demo-components/button-demo.component').then(c => c.ButtonDemoComponent),
    data: { componentName: 'button' }
  },
  {
    path: 'components/calendar',
    loadComponent: () => import('./demo-components/calendar-demo.component').then(c => c.CalendarDemoComponent),
    data: { componentName: 'calendar' }
  },
  {
    path: 'components/card',
    loadComponent: () => import('./demo-components/card-demo.component').then(c => c.CardDemoComponent),
    data: { componentName: 'card' }
  },
  {
    path: 'components/carousel',
    loadComponent: () => import('./demo-components/carousel-demo.component').then(c => c.CarouselDemoComponent),
    data: { componentName: 'carousel' }
  },
  {
    path: 'components/checkbox',
    loadComponent: () => import('./demo-components/checkbox-demo.component').then(c => c.CheckboxDemoComponent),
    data: { componentName: 'checkbox' }
  },
  {
    path: 'components/dialog',
    loadComponent: () => import('./demo-components/dialog-demo.component').then(c => c.DialogDemoComponent),
    data: { componentName: 'dialog' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
