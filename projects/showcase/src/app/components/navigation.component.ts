import { Component, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeSwitcher } from '../../../../lib/src/lib/theme-switcher';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeSwitcher],
  templateUrl: './navigation.component.html',
  styles: []
})
export class NavigationComponent {
  isMobileMenuOpen = signal(false);
  isMegaMenuOpen = signal(false);
  
  // Expose Object to template
  Object = Object;

  components = [
    { 
      name: 'Accordion', 
      route: '/components/accordion', 
      description: 'Collapsible content sections',
      category: 'Layout'
    },
    { 
      name: 'Alert', 
      route: '/components/alert', 
      description: 'Display important messages',
      category: 'Feedback'
    },
    { 
      name: 'Avatar', 
      route: '/components/avatar', 
      description: 'User profile pictures',
      category: 'Display'
    },
    { 
      name: 'Badge', 
      route: '/components/badge', 
      description: 'Small status indicators',
      category: 'Display'
    },
    { 
      name: 'Breadcrumb', 
      route: '/components/breadcrumb', 
      description: 'Navigation hierarchy',
      category: 'Navigation'
    },
    { 
      name: 'Button', 
      route: '/components/button', 
      description: 'Interactive elements',
      category: 'Form'
    },
    { 
      name: 'Calendar', 
      route: '/components/calendar', 
      description: 'Date picker and calendar',
      category: 'Form'
    },
    { 
      name: 'Card', 
      route: '/components/card', 
      description: 'Content containers',
      category: 'Layout'
    },
    { 
      name: 'Carousel', 
      route: '/components/carousel', 
      description: 'Image and content sliders',
      category: 'Display'
    },
    { 
      name: 'Checkbox', 
      route: '/components/checkbox', 
      description: 'Selection controls',
      category: 'Form'
    },
    { 
      name: 'DataTable', 
      route: '/components/dataTable', 
      description: 'Feature-rich data tables',
      category: 'Display'
    },
    { 
      name: 'Dialog', 
      route: '/components/dialog', 
      description: 'Modal dialogs and overlays',
      category: 'Overlay'
    },
    { 
      name: 'Dropdown Menu', 
      route: '/components/dropdown-menu', 
      description: 'Contextual menu dropdowns',
      category: 'Navigation'
    },
    { 
      name: 'Drawer', 
      route: '/components/slide-panel', 
      description: 'Slide-out panels from screen edges',
      category: 'Navigation'
    }
  ];

  // Group components by category
  get groupedComponents() {
    const grouped = this.components.reduce((acc, component) => {
      if (!acc[component.category]) {
        acc[component.category] = [];
      }
      acc[component.category].push(component);
      return acc;
    }, {} as Record<string, typeof this.components>);
    
    return grouped;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(open => !open);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
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
}
