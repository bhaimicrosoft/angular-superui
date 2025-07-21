import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SEOService } from './seo.service';

@Injectable({
  providedIn: 'root'
})
export class RouteSEOService {
  private router = inject(Router);
  private seoService = inject(SEOService);

  constructor() {
    this.initializeRouteSEO();
  }

  private initializeRouteSEO() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateSEOForRoute(event.url);
      });
  }

  private updateSEOForRoute(url: string) {
    const route = this.router.routerState.root;
    let activeRoute = route;

    // Get the active route
    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }

    // Check if route has SEO data
    const routeData = activeRoute.snapshot.data;
    
    if (routeData['seo']) {
      // Use explicit SEO data from route
      this.seoService.updateSEO(routeData['seo']);
    } else if (routeData['componentName']) {
      // Auto-generate SEO for component routes
      const componentName = routeData['componentName'];
      this.seoService.updateSEO(this.seoService.getComponentSEO(componentName));
      this.seoService.addComponentStructuredData(componentName);
    } else {
      // Fallback to default SEO
      this.seoService.updateSEO(this.seoService.getHomepageSEO());
    }
  }
}
