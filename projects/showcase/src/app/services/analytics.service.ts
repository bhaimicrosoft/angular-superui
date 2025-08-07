import { Injectable, inject } from '@angular/core';
import { track } from '@vercel/analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  /**
   * Track component views for SEO and user behavior analysis
   */
  trackComponentView(componentName: string) {
    track('component_view', {
      component: componentName,
      timestamp: new Date().toISOString(),
      page: `components/${componentName}`
    });
  }

  /**
   * Track component interactions (clicks, usage)
   */
  trackComponentInteraction(componentName: string, action: string, value?: string | number) {
    track('component_interaction', {
      component: componentName,
      action: action,
      ...(value !== undefined && { value: value.toString() }),
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track CLI usage and downloads
   */
  trackCLIUsage(action: 'download' | 'install' | 'add_component', component?: string) {
    track('cli_usage', {
      action: action,
      ...(component && { component }),
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track search queries for SEO optimization
   */
  trackSiteSearch(query: string, results: number) {
    track('site_search', {
      query: query,
      results: results,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track documentation page views
   */
  trackDocumentationView(page: string) {
    track('documentation_view', {
      page: page,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track user engagement for SEO metrics
   */
  trackEngagement(action: 'copy_code' | 'view_example' | 'external_link' | 'github_link', details?: string) {
    track('user_engagement', {
      action: action,
      ...(details && { details }),
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track performance-related events
   */
  trackPerformance(metric: string, value: number, component?: string) {
    track('performance_metric', {
      metric: metric,
      value: value,
      ...(component && { component }),
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track feature usage for product insights
   */
  trackFeatureUsage(feature: string, context?: string) {
    track('feature_usage', {
      feature: feature,
      ...(context && { context }),
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track conversion events (npm installs, GitHub stars, etc.)
   */
  trackConversion(type: 'npm_install' | 'github_star' | 'github_fork' | 'newsletter_signup', value?: number) {
    track('conversion', {
      type: type,
      ...(value !== undefined && { value }),
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track error events for debugging and user experience
   */
  trackError(error: string, component?: string, context?: string) {
    track('error_event', {
      error: error,
      ...(component && { component }),
      ...(context && { context }),
      timestamp: new Date().toISOString()
    });
  }
}
