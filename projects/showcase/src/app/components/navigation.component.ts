import { Component, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeSwitcher } from '../../../../lib/src/lib/theme-switcher';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeSwitcher],
  templateUrl: './navigation.component.html',
  styles: []
})
export class NavigationComponent {
  private navigationService = inject(NavigationService);
  
  isMobileMenuOpen = signal(false);
  isMegaMenuOpen = signal(false);
  
  // Track which mobile menu categories are expanded (start with all collapsed for better UX)
  expandedCategories = signal<Set<string>>(new Set());
  
  // Expose Object to template
  Object = Object;

  // Get components from the navigation service (automatically generated from routes)
  get components() {
    return this.navigationService.components();
  }

  // Group components by category, always put Input first in Form
  get groupedComponents() {
    return this.navigationService.groupedComponents();
  }

  // Get all categories in preferred order
  get categories() {
    return this.navigationService.categories();
  }

  // For mobile menu: always put Input first
  get sortedComponents() {
    return this.navigationService.sortedComponents();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(open => !open);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  toggleCategory(category: string) {
    this.expandedCategories.update(expanded => {
      const newExpanded = new Set(expanded);
      if (newExpanded.has(category)) {
        newExpanded.delete(category);
      } else {
        newExpanded.add(category);
      }
      return newExpanded;
    });
  }

  isCategoryExpanded(category: string): boolean {
    return this.expandedCategories().has(category);
  }

  expandAllCategories() {
    this.expandedCategories.set(new Set(this.categories));
  }

  collapseAllCategories() {
    this.expandedCategories.set(new Set());
  }

  get hasAnyExpanded(): boolean {
    return this.expandedCategories().size > 0;
  }

  get allExpanded(): boolean {
    return this.expandedCategories().size === this.categories.length;
  }

  toggleMegaMenu() {
    this.isMegaMenuOpen.update(open => !open);
  }

  closeMegaMenu() {
    this.isMegaMenuOpen.set(false);
  }

  openGitHub() {
    window.open('https://github.com/bhaimicrosoft/angular-superui', '_blank');
  }

  // Helper methods for mobile menu
  trackByCategory(index: number, category: string): string {
    return category;
  }

  trackByComponent(index: number, component: any): string {
    return component.componentName;
  }

  getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      'Form': '📝',
      'Display': '👁️',
      'Layout': '📐',
      'Navigation': '🧭',
      'Interaction': '👆',
      'Feedback': '💬',
      'Overlay': '🔳'
    };
    return icons[category] || '⭐';
  }

  getCategoryIconClasses(category: string): string {
    const classes: Record<string, string> = {
      'Form': 'bg-gradient-to-br from-blue-500 to-blue-600',
      'Display': 'bg-gradient-to-br from-green-500 to-emerald-600',
      'Layout': 'bg-gradient-to-br from-purple-500 to-purple-600',
      'Navigation': 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      'Interaction': 'bg-gradient-to-br from-orange-500 to-orange-600',
      'Feedback': 'bg-gradient-to-br from-pink-500 to-pink-600',
      'Overlay': 'bg-gradient-to-br from-gray-500 to-gray-600'
    };
    return classes[category] || 'bg-gradient-to-br from-slate-500 to-slate-600';
  }
}
