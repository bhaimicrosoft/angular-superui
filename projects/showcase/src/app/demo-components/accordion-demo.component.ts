import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion-demo.component.html'
})
export class AccordionDemoComponent {
  // Track which accordion items are open
  openItems = signal<Set<number>>(new Set([0])); // First item open by default
  
  // Demo data for different accordion examples
  faqData = [
    {
      id: 0,
      question: "🚀 What makes Angular SuperUI special?",
      answer: "Angular SuperUI is built with modern Angular 17+ features including standalone components, signals, and the latest best practices. It's designed to be accessible, customizable, and developer-friendly.",
      icon: "⭐",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 1,
      question: "🎨 How customizable are the components?",
      answer: "Every component is built with Tailwind CSS and follows a design system approach. You can easily customize colors, spacing, animations, and behavior through props and CSS classes.",
      icon: "🎨",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 2,
      question: "♿ Are the components accessible?",
      answer: "Yes! All components follow WCAG guidelines and include proper ARIA attributes, keyboard navigation, screen reader support, and focus management out of the box.",
      icon: "♿",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 3,
      question: "📱 Do they work on mobile devices?",
      answer: "Absolutely! All components are responsive and touch-friendly. They're tested across different devices and screen sizes to ensure a consistent experience.",
      icon: "📱",
      color: "from-orange-500 to-red-600"
    },
    {
      id: 4,
      question: "🌙 Is dark mode supported?",
      answer: "Yes! Dark mode is supported across all components with smooth transitions. You can toggle between light and dark themes seamlessly.",
      icon: "🌙",
      color: "from-indigo-500 to-blue-600"
    }
  ];

  featureData = [
    {
      id: 0,
      title: "🎯 Performance Optimized",
      description: "Built with Angular's OnPush change detection and lazy loading",
      details: "Our components use Angular's most efficient patterns including OnPush change detection strategy, lazy loading, and tree-shaking to ensure minimal bundle size and maximum performance.",
      badge: "Fast",
      color: "from-emerald-400 to-cyan-500"
    },
    {
      id: 1,
      title: "🔧 Developer Experience",
      description: "TypeScript-first with excellent IntelliSense support",
      details: "Every component is built with TypeScript from the ground up, providing excellent type safety, auto-completion, and developer tooling integration.",
      badge: "DX",
      color: "from-blue-400 to-indigo-500"
    },
    {
      id: 2,
      title: "🎭 Modern Design",
      description: "Contemporary UI patterns with smooth animations",
      details: "Based on modern design principles with carefully crafted animations, micro-interactions, and visual feedback that delights users.",
      badge: "Beautiful",
      color: "from-pink-400 to-rose-500"
    }
  ];

  productFeatures = [
    {
      id: 0,
      title: "🏗️ Architecture & Setup",
      content: [
        "Standalone components architecture",
        "Signal-based state management", 
        "Tree-shakeable imports",
        "Zero-config setup with Angular CLI",
        "Comprehensive TypeScript support"
      ],
      icon: "🏗️",
      color: "from-slate-600 to-slate-800"
    },
    {
      id: 1,
      title: "🎨 Theming & Customization",
      content: [
        "Tailwind CSS powered styling",
        "CSS custom properties for theming",
        "Dark/light mode support",
        "Component-level customization",
        "Design token system"
      ],
      icon: "🎨", 
      color: "from-violet-600 to-purple-800"
    },
    {
      id: 2,
      title: "🚀 Performance & Quality",
      content: [
        "Optimized bundle size",
        "OnPush change detection",
        "Lazy loading support",
        "100% test coverage",
        "Production-ready components"
      ],
      icon: "🚀",
      color: "from-green-600 to-emerald-800"
    }
  ];

  toggleItem(itemId: number, accordionType: string = 'default') {
    const currentOpen = this.openItems();
    const newOpen = new Set(currentOpen);
    
    if (newOpen.has(itemId)) {
      newOpen.delete(itemId);
    } else {
      // For single-open accordion behavior, uncomment the next line
      // newOpen.clear();
      newOpen.add(itemId);
    }
    
    this.openItems.set(newOpen);
  }

  isOpen(itemId: number): boolean {
    return this.openItems().has(itemId);
  }

  trackByFn(index: number, item: any): any {
    return item.id;
  }
}
