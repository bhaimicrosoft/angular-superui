import { Injectable, inject } from '@angular/core';
import { AnalyticsService } from './analytics.service';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private analytics = inject(AnalyticsService);

  constructor() {
    // Initialize performance monitoring
    this.initializePerformanceMonitoring();
  }

  private initializePerformanceMonitoring() {
    // Monitor Core Web Vitals for SEO
    this.observeCoreWebVitals();
    
    // Monitor page load performance
    this.observePageLoad();
    
    // Monitor component loading times
    this.observeComponentPerformance();
  }

  private observeCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const lcp = entry as PerformanceEventTiming;
        this.analytics.trackPerformance('LCP', Math.round(lcp.startTime));
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    // First Input Delay (FID) - approximated with First Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fcp = entry as PerformanceEventTiming;
        this.analytics.trackPerformance('FCP', Math.round(fcp.startTime));
      }
    }).observe({ type: 'first-contentful-paint', buffered: true });

    // Cumulative Layout Shift (CLS)
    new PerformanceObserver((list) => {
      let clsValue = 0;
      for (const entry of list.getEntries()) {
        const layoutShift = entry as any;
        if (!layoutShift.hadRecentInput) {
          clsValue += layoutShift.value;
        }
      }
      if (clsValue > 0) {
        this.analytics.trackPerformance('CLS', Math.round(clsValue * 1000) / 1000);
      }
    }).observe({ type: 'layout-shift', buffered: true });
  }

  private observePageLoad() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      // Track various load metrics
      const metrics = {
        'DNS_Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
        'TCP_Connection': navigation.connectEnd - navigation.connectStart,
        'Server_Response': navigation.responseEnd - navigation.requestStart,
        'DOM_Processing': navigation.domContentLoadedEventEnd - navigation.responseEnd,
        'Total_Load_Time': navigation.loadEventEnd - navigation.fetchStart
      };

      Object.entries(metrics).forEach(([metric, value]) => {
        this.analytics.trackPerformance(metric, Math.round(value));
      });
    });
  }

  private observeComponentPerformance() {
    // Track component rendering performance using ResizeObserver
    const componentObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        const componentName = element.getAttribute('data-component');
        
        if (componentName) {
          // Estimate render time based on when resize observer fires
          const renderTime = performance.now();
          this.analytics.trackPerformance('Component_Render', Math.round(renderTime), componentName);
        }
      });
    });

    // Observe components that have data-component attribute
    document.addEventListener('DOMContentLoaded', () => {
      const components = document.querySelectorAll('[data-component]');
      components.forEach(component => {
        componentObserver.observe(component);
      });
    });
  }

  /**
   * Manually track component interaction performance
   */
  trackComponentInteraction(componentName: string, action: string, startTime: number) {
    const duration = performance.now() - startTime;
    this.analytics.trackPerformance(`${componentName}_${action}`, Math.round(duration), componentName);
  }

  /**
   * Track bundle size and loading performance
   */
  trackBundlePerformance() {
    const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    let totalJSSize = 0;
    let totalCSSSize = 0;
    let totalImageSize = 0;

    resourceEntries.forEach(entry => {
      const size = entry.transferSize || 0;
      
      if (entry.name.includes('.js')) {
        totalJSSize += size;
      } else if (entry.name.includes('.css')) {
        totalCSSSize += size;
      } else if (entry.name.match(/\.(jpg|jpeg|png|gif|webp|svg)/)) {
        totalImageSize += size;
      }
    });

    this.analytics.trackPerformance('JS_Bundle_Size', Math.round(totalJSSize / 1024)); // KB
    this.analytics.trackPerformance('CSS_Bundle_Size', Math.round(totalCSSSize / 1024)); // KB
    this.analytics.trackPerformance('Image_Size', Math.round(totalImageSize / 1024)); // KB
  }

  /**
   * Get performance recommendations for SEO
   */
  getPerformanceInsights(): Promise<{
    lcp: number;
    fcp: number;
    cls: number;
    recommendations: string[];
  }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const recommendations: string[] = [];

        const lcp = navigation.loadEventEnd - navigation.fetchStart;
        const fcp = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        const cls = 0; // Simplified for demo

        // Generate recommendations based on metrics
        if (lcp > 2500) {
          recommendations.push('Optimize Largest Contentful Paint - consider image optimization and code splitting');
        }
        
        if (fcp > 1800) {
          recommendations.push('Improve First Contentful Paint - minimize render-blocking resources');
        }

        if (navigation.domContentLoadedEventEnd - navigation.fetchStart > 3000) {
          recommendations.push('Optimize DOM processing time - consider reducing DOM complexity');
        }

        resolve({
          lcp: Math.round(lcp),
          fcp: Math.round(fcp),
          cls,
          recommendations
        });
      }, 1000);
    });
  }
}
