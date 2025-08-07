import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '@lib/components/button';
import { Badge } from '@lib/components/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbRouterLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis, breadcrumbLinkVariants
} from '@lib/components/breadcrumb';
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

  // Ellipsis expansion state
  isEllipsisExpanded = signal<boolean>(false);

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
    this.isEllipsisExpanded.set(!this.isEllipsisExpanded());
    const action = this.isEllipsisExpanded() ? 'Expanded' : 'Collapsed';
    this.showToast(`${action} breadcrumb path`);
  }

  /**
   * Get the complete ellipsis breadcrumb structure
   */
  getEllipsisBreadcrumbs(): Array<{type: 'item' | 'separator' | 'ellipsis' | 'page', content: any}> {
    const breadcrumbs = [];

    // Home page
    breadcrumbs.push({
      type: 'item' as const,
      content: { name: 'Home Page', routerLink: '/' }
    });
    breadcrumbs.push({ type: 'separator' as const, content: null });

    if (!this.isEllipsisExpanded()) {
      // Show ellipsis in collapsed state
      breadcrumbs.push({
        type: 'ellipsis' as const,
        content: { title: 'Click to expand: Level 2 > Level 3 > Level 4' }
      });
      breadcrumbs.push({ type: 'separator' as const, content: null });
    } else {
      // Show expanded segments
      const segments = this.getCollapsedSegments();
      segments.forEach(segment => {
        breadcrumbs.push({
          type: 'item' as const,
          content: { name: segment.name, routerLink: segment.path }
        });
        breadcrumbs.push({ type: 'separator' as const, content: null });
      });

      // Show collapse ellipsis
      breadcrumbs.push({
        type: 'ellipsis' as const,
        content: { title: 'Click to collapse' }
      });
      breadcrumbs.push({ type: 'separator' as const, content: null });
    }

    // Deep folder
    breadcrumbs.push({
      type: 'item' as const,
      content: { name: 'Deep Folder', routerLink: ['/very', 'deep', 'nested', 'folder'] }
    });
    breadcrumbs.push({ type: 'separator' as const, content: null });

    // Current page
    breadcrumbs.push({
      type: 'page' as const,
      content: { name: 'Current Page' }
    });

    return breadcrumbs;
  }

  /**
   * Get the collapsed breadcrumb segments (for ellipsis demo)
   */
  getCollapsedSegments(): { name: string; path: string }[] {
    return [
      { name: 'Level 2', path: '/level2' },
      { name: 'Level 3', path: '/level2/level3' },
      { name: 'Level 4', path: '/level2/level3/level4' }
    ];
  }

  /**
   * TrackBy function for path segments
   */
  trackByName(index: number, item: PathSegment | { name: string; path: string }): string {
    return item.name;
  }

  /**
   * TrackBy function for categories
   */
  trackById(index: number, item: CategoryInfo): string {
    return item.id;
  }

  /**
   * TrackBy function for breadcrumb types
   */
  trackByType(index: number, item: {type: string, content: any}): string {
    return `${item.type}-${index}`;
  }

  protected readonly cn = cn;
  protected readonly breadcrumbLinkVariants = breadcrumbLinkVariants;
}
