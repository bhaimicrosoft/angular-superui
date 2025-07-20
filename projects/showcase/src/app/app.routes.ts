import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./demo-components/home.component').then(c => c.HomeComponent)
  },
  // UI Components
  {
    path: 'components/accordion',
    loadComponent: () => import('./demo-components/accordion-demo.component').then(c => c.AccordionDemoComponent)
  },
  {
    path: 'components/alert',
    loadComponent: () => import('./demo-components/alert-demo.component').then(c => c.AlertDemoComponent)
  },
  {
    path: 'components/avatar',
    loadComponent: () => import('./demo-components/avatar-demo.component').then(c => c.AvatarDemoComponent)
  },
  {
    path: 'components/badge',
    loadComponent: () => import('./demo-components/badge-demo.component').then(c => c.BadgeDemoComponent)
  },
  {
    path: 'components/breadcrumb',
    loadComponent: () => import('./demo-components/breadcrumb-demo.component').then(c => c.BreadcrumbDemoComponent)
  },
  {
    path: 'components/button',
    loadComponent: () => import('./demo-components/button-demo.component').then(c => c.ButtonDemoComponent)
  },
  {
    path: 'components/calendar',
    loadComponent: () => import('./demo-components/calendar-demo.component').then(c => c.CalendarDemoComponent)
  },
  {
    path: 'components/card',
    loadComponent: () => import('./demo-components/card-demo.component').then(c => c.CardDemoComponent)
  },
  {
    path: 'components/carousel',
    loadComponent: () => import('./demo-components/carousel-demo.component').then(c => c.CarouselDemoComponent)
  },
  {
    path: 'components/checkbox',
    loadComponent: () => import('./demo-components/checkbox-demo.component').then(c => c.CheckboxDemoComponent)
  },
  {
    path: 'components/dialog',
    loadComponent: () => import('./demo-components/dialog-demo.component').then(c => c.DialogDemoComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
