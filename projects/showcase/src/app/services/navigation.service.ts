import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { signal, computed } from '@angular/core';

export interface NavigationItem {
  name: string;
  route: string;
  description: string;
  category: string;
  componentName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private router = inject(Router);
  private navigationItems = signal<NavigationItem[]>([]);

  // Computed grouped components by category
  readonly groupedComponents = computed(() => {
    const items = this.navigationItems();
    const grouped = items.reduce((acc, component) => {
      if (!acc[component.category]) {
        acc[component.category] = [];
      }
      acc[component.category].push(component);
      return acc;
    }, {} as Record<string, NavigationItem[]>);

    // Sort each category alphabetically, but ensure Input is always first in Form
    Object.keys(grouped).forEach(category => {
      grouped[category].sort((a, b) => {
        if (category === 'Form') {
          if (a.name === 'Input') return -1;
          if (b.name === 'Input') return 1;
        }
        return a.name.localeCompare(b.name);
      });
    });

    return grouped;
  });

  // Computed sorted components for mobile menu (Input first)
  readonly sortedComponents = computed(() => {
    const items = this.navigationItems();
    return [
      ...items.filter(c => c.name === 'Input'),
      ...items.filter(c => c.name !== 'Input').sort((a, b) => a.name.localeCompare(b.name))
    ];
  });

  // All navigation items
  readonly components = computed(() => this.navigationItems());

  // Get all categories in a specific order
  readonly categories = computed(() => {
    const grouped = this.groupedComponents();
    const categoryOrder = ['Showcase', 'Form', 'Display', 'Layout', 'Navigation', 'Interaction', 'Feedback', 'Overlay'];
    
    // Get all categories that have components
    const availableCategories = Object.keys(grouped);
    
    // Sort according to preferred order, then alphabetically for any new categories
    const orderedCategories = categoryOrder.filter(cat => availableCategories.includes(cat));
    const remainingCategories = availableCategories
      .filter(cat => !categoryOrder.includes(cat))
      .sort();
    
    return [...orderedCategories, ...remainingCategories];
  });

  constructor() {
    this.generateNavigationFromRoutes();
    this.addSpecialRoutes();
  }

  /**
   * Add special routes that don't follow the standard components/ pattern
   */
  private addSpecialRoutes() {
    const specialItems: NavigationItem[] = [
      // Add any special routes here if needed in the future
    ];

    this.navigationItems.update(items => [...items, ...specialItems]);
  }

  /**
   * Automatically generates navigation items from the router configuration
   */
  private generateNavigationFromRoutes() {
    const routes = this.router.config;
    const navigationItems: NavigationItem[] = [];

    routes.forEach(route => {
      // Only process component routes (not home or wildcard)
      if (route.path && 
          route.path.startsWith('components/') && 
          route.data && 
          route.data['componentName'] && 
          route.data['category'] && 
          route.data['description']) {
        
        const componentName = route.data['componentName'] as string;
        const category = route.data['category'] as string;
        const description = route.data['description'] as string;

        // Convert component name to display name
        const name = this.formatComponentName(componentName);

        navigationItems.push({
          name,
          route: `/${route.path}`,
          description,
          category,
          componentName
        });
      }
    });

    this.navigationItems.set(navigationItems);
  }

  /**
   * Formats component name for display
   * Examples: 
   * - 'aspect-ratio' -> 'Aspect Ratio'
   * - 'datatable' -> 'DataTable'
   * - 'dropdown-menu' -> 'Dropdown Menu'
   */
  private formatComponentName(componentName: string): string {
    // Special cases for specific component names
    const specialCases: Record<string, string> = {
      'datatable': 'DataTable',
      'dropdown-menu': 'Dropdown Menu',
      'aspect-ratio': 'Aspect Ratio',
      'slide-panel': 'Drawer', // Special case for drawer component
    };

    if (specialCases[componentName]) {
      return specialCases[componentName];
    }

    // Default formatting: split by hyphens, capitalize each word
    return componentName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Manually refresh navigation items (useful for development)
   */
  refreshNavigation() {
    this.generateNavigationFromRoutes();
  }

  /**
   * Get navigation item by component name
   */
  getNavigationItem(componentName: string): NavigationItem | undefined {
    return this.navigationItems().find(item => item.componentName === componentName);
  }

  /**
   * Get navigation items by category
   */
  getNavigationItemsByCategory(category: string): NavigationItem[] {
    return this.navigationItems().filter(item => item.category === category);
  }

  /**
   * Add a new navigation item (for programmatic use)
   */
  addNavigationItem(item: NavigationItem) {
    this.navigationItems.update(items => [...items, item]);
  }

  /**
   * Remove a navigation item by component name
   */
  removeNavigationItem(componentName: string) {
    this.navigationItems.update(items => 
      items.filter(item => item.componentName !== componentName)
    );
  }

  /**
   * Update an existing navigation item
   */
  updateNavigationItem(componentName: string, updates: Partial<NavigationItem>) {
    this.navigationItems.update(items =>
      items.map(item =>
        item.componentName === componentName
          ? { ...item, ...updates }
          : item
      )
    );
  }
}
