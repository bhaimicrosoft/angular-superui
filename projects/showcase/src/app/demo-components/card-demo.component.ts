import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '../../../../lib/src/lib/card';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-card-demo',
  standalone: true,
  imports: [CommonModule, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter],
  templateUrl: './card-demo.component.html'
})
export class CardDemoComponent implements OnInit {
  private seoService = inject(SEOService);

  ngOnInit() {
    // Update SEO for card component page
    this.seoService.updateSEO(this.seoService.getComponentSEO('card'));
    this.seoService.addComponentStructuredData('card');
  }
  // Sample data for card examples
  products = [
    {
      id: 1,
      title: 'Premium Headphones',
      price: '$299',
      originalPrice: '$399',
      image: '/me.jpg',
      rating: 4.5,
      reviews: 128,
      inStock: true
    },
    {
      id: 2,
      title: 'Smart Watch',
      price: '$199',
      originalPrice: '$249',
      image: '/me.jpg',
      rating: 4.2,
      reviews: 89,
      inStock: false
    }
  ];

  blogPosts = [
    {
      id: 1,
      title: 'Getting Started with Angular 17',
      excerpt: 'Learn about the latest features and improvements in Angular 17, including new control flow syntax and improved performance.',
      author: 'John Doe',
      date: 'March 15, 2024',
      readTime: '5 min read',
      image: '/me.jpg',
      category: 'Tutorial'
    },
    {
      id: 2,
      title: 'Building Responsive UIs',
      excerpt: 'Discover best practices for creating responsive user interfaces that work seamlessly across all devices.',
      author: 'Jane Smith',
      date: 'March 12, 2024',
      readTime: '8 min read',
      image: '/me.jpg',
      category: 'Design'
    }
  ];

  features = [
    {
      icon: '🚀',
      title: 'Fast Performance',
      description: 'Optimized for speed and efficiency'
    },
    {
      icon: '🔒',
      title: 'Secure',
      description: 'Built with security best practices'
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'Works on all devices and screen sizes'
    }
  ];
}
