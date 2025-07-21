import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '@lib/button';
import { Badge } from '@lib/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbRouterLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis, breadcrumbLinkVariants
} from '@lib/breadcrumb';
import {cn} from '@lib/utils/cn';

interface PathSegment {
  name: string;
  path: string;
  isLast: boolean;
}

interface CategoryInfo {
  id: string;
  name: string;
  icon: string;
  separator: string;
  count?: number;
  isLast: boolean;
}

@Component({
  selector: 'app-breadcrumb-demo',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbRouterLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis
  ],
  templateUrl: './breadcrumb-demo.component.html'
})
export class BreadcrumbDemoComponent {

  // File Explorer State
  currentPath = signal<{ segments: PathSegment[] }>({ segments: [] });

  // E-commerce State
  currentCategory = signal<{ path: CategoryInfo[] }>({ path: [] });

  // File System Structure
  private fileSystem = {
    '/': { name: 'Root', children: ['documents', 'downloads', 'pictures'] },
    '/documents': { name: 'Documents', children: ['projects', 'notes', 'templates'] },
    '/documents/projects': { name: 'Projects', children: ['angular-app', 'vue-project', 'react-dashboard'] },
    '/documents/projects/angular-app': { name: 'Angular App', children: ['src', 'public', 'dist'] },
    '/documents/projects/angular-app/src': { name: 'Source', children: ['components', 'services', 'assets'] },
    '/documents/projects/angular-app/src/components': { name: 'Components', children: ['breadcrumb', 'button', 'card'] },
  };

  // E-commerce Categories
  private categories = {
    'home': { name: 'Store', icon: '🏪', separator: '→', count: 15000 },
    'electronics': { name: 'Electronics', icon: '📱', separator: '→', count: 2500 },
    'electronics-phones': { name: 'Smartphones', icon: '📞', separator: '→', count: 500 },
    'electronics-phones-iphone': { name: 'iPhone', icon: '🍎', separator: '→', count: 85 },
    'electronics-phones-iphone-15': { name: 'iPhone 15', icon: '📱', separator: '→', count: 12 },
    'electronics-phones-samsung': { name: 'Samsung', icon: '📱', separator: '→', count: 120 },
    'electronics-phones-google': { name: 'Google Pixel', icon: '📱', separator: '→', count: 45 },
    'clothing': { name: 'Clothing', icon: '👕', separator: '→', count: 3200 },
    'clothing-mens': { name: "Men's", icon: '👔', separator: '→', count: 1500 },
    'clothing-womens': { name: "Women's", icon: '👗', separator: '→', count: 1700 },
    'home-garden': { name: 'Home & Garden', icon: '🏡', separator: '→', count: 1800 }
  };

  // Category hierarchy mapping
  private categoryHierarchy: { [key: string]: string[] } = {
    'home': ['home'],
    'electronics': ['home', 'electronics'],
    'electronics-phones': ['home', 'electronics', 'electronics-phones'],
    'electronics-phones-iphone': ['home', 'electronics', 'electronics-phones', 'electronics-phones-iphone'],
    'electronics-phones-iphone-15': ['home', 'electronics', 'electronics-phones', 'electronics-phones-iphone', 'electronics-phones-iphone-15'],
    'electronics-phones-samsung': ['home', 'electronics', 'electronics-phones', 'electronics-phones-samsung'],
    'electronics-phones-google': ['home', 'electronics', 'electronics-phones', 'electronics-phones-google'],
    'clothing': ['home', 'clothing'],
    'clothing-mens': ['home', 'clothing', 'clothing-mens'],
    'clothing-womens': ['home', 'clothing', 'clothing-womens'],
    'home-garden': ['home', 'home-garden']
  };

  constructor() {
    // Initialize with default paths
    this.navigateToPath('/documents/projects');
    this.navigateToCategory('electronics-phones-iphone');
  }

  /**
   * Navigate to a specific file path
   */
  navigateToPath(path: string): void {
    const segments: PathSegment[] = [];

    if (path === '/') {
      this.currentPath.set({ segments: [] });
      return;
    }

    // Split path and build segments
    const pathParts = path.split('/').filter(part => part);
    let currentPath = '';

    pathParts.forEach((part, index) => {
      currentPath += '/' + part;
      const isLast = index === pathParts.length - 1;

      // Get the display name from file system or use the path part
      const displayName = this.fileSystem[currentPath as keyof typeof this.fileSystem]?.name || part;

      segments.push({
        name: displayName,
        path: currentPath,
        isLast
      });
    });

    this.currentPath.set({ segments });
    this.showToast(`Navigated to: ${path}`);
  }

  /**
   * Navigate to a specific category
   */
  navigateToCategory(categoryId: string): void {
    const hierarchy = this.categoryHierarchy[categoryId];
    if (!hierarchy) return;

    const path: CategoryInfo[] = hierarchy.map((catId, index) => {
      const category = this.categories[catId as keyof typeof this.categories];
      const isLast = index === hierarchy.length - 1;

      return {
        id: catId,
        name: category.name,
        icon: category.icon,
        separator: category.separator,
        count: isLast ? category.count : undefined,
        isLast
      };
    });

    this.currentCategory.set({ path });
    this.showToast(`Browsing: ${path[path.length - 1].name}`);
  }

  /**
   * Show a toast notification (simple implementation)
   */
  private showToast(message: string): void {
    // In a real app, you would use a proper toast service
    console.log(`🍞 ${message}`);

    // Optional: Show browser notification for demo purposes
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Breadcrumb Navigation', {
        body: message,
        icon: '/favicon.ico'
      });
    }
  }

  /**
   * Get breadcrumb analytics for demo purposes
   */
  getBreadcrumbStats() {
    return {
      totalClicks: 127,
      mostUsedPath: '/documents/projects',
      averageDepth: 3.2,
      userSatisfaction: 98
    };
  }

  /**
   * Simulate breadcrumb interaction tracking
   */
  trackBreadcrumbClick(segment: string, position: number): void {
    console.log(`📊 Analytics: Clicked "${segment}" at position ${position}`);
  }

  /**
   * Generate random path for demonstration
   */
  generateRandomPath(): string {
    const paths = [
      '/documents/projects/angular-app/src',
      '/documents/notes/meeting-notes',
      '/documents/templates/email-templates',
      '/downloads/software/development-tools',
      '/pictures/vacation/summer-2024'
    ];
    return paths[Math.floor(Math.random() * paths.length)];
  }

  /**
   * Handle ellipsis expansion
   */
  expandEllipsis(): void {
    this.showToast('Expanding breadcrumb path...');
    // In a real implementation, this would show the full path
  }

  /**
   * TrackBy function for path segments
   */
  trackByName(index: number, item: PathSegment): string {
    return item.name;
  }

  /**
   * TrackBy function for categories
   */
  trackById(index: number, item: CategoryInfo): string {
    return item.id;
  }

  protected readonly cn = cn;
  protected readonly breadcrumbLinkVariants = breadcrumbLinkVariants;
}
