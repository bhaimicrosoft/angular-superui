import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';
import { MENU_STACK, MenuStack } from '@angular/cdk/menu';
import { ThemeService, ThemeServiceImpl } from '@lib/theme-switcher';

import { routes } from './app.routes';

// Theme service initializer function
function initializeThemeService(themeService: ThemeServiceImpl) {
  return () => {
    console.log('🚀 Theme service initialized through APP_INITIALIZER');
    // The service initialization happens in its constructor
    return Promise.resolve();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
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
    }
  ]
};
