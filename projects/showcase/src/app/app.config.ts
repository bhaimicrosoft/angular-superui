import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';
import { MENU_STACK, MenuStack } from '@angular/cdk/menu';
import { ThemeService, ThemeServiceImpl } from '@lib/theme-switcher';
import { RouteSEOService } from './services/route-seo.service';

import { routes } from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

// Theme service initializer function
function initializeThemeService(themeService: ThemeServiceImpl) {
  return () => {
    // The service initialization happens in its constructor
    return Promise.resolve();
  };
}

// Route SEO service initializer function
function initializeRouteSEO(routeSEOService: RouteSEOService) {
  return () => {
    // The service initialization happens in its constructor
    return Promise.resolve();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: MENU_STACK, useClass: MenuStack },
    // Ensure ThemeService is available globally and initialized early
    { provide: ThemeService, useClass: ThemeServiceImpl },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeThemeService,
      deps: [ThemeService],
      multi: true
    },
    // Initialize Route SEO service
    {
      provide: APP_INITIALIZER,
      useFactory: initializeRouteSEO,
      deps: [RouteSEOService],
      multi: true
    }
  ]
};
