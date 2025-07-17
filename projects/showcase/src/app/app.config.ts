import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';
import { MENU_STACK, MenuStack } from '@angular/cdk/menu';

import { routes } from './app.routes';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: MENU_STACK, useClass: MenuStack }
  ]
};
