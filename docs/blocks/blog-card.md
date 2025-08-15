# Blog Card Block 📰

Professional blog content cards with multiple layout variants, author information, categories, tags, and engagement metrics. Perfect for content websites, blogs, and publishing platforms that need modern and engaging content display.

## Features

- 📰 **5 Layout Variants** - Card, horizontal, featured, minimal, and magazine layouts
- 👤 **Author Profiles** - Complete author information with avatars and social links
- 🏷️ **Category System** - Organized content categorization with color coding
- 🏷️ **Tag Support** - Flexible tagging system for content organization
- ⏱️ **Reading Time** - Automatic reading time calculation and display
- 📊 **Engagement Metrics** - Views, likes, comments, and shares tracking
- 🎨 **Modern Design** - Clean, responsive design with dark mode support
- 📱 **Mobile Optimized** - Fully responsive across all device sizes
- ♿ **Accessible** - ARIA compliant with keyboard navigation
- 🚀 **Performance** - Optimized rendering with Angular Signals
- 🔄 **Interactive** - Click events for all interactive elements
- 🎭 **Customizable** - Easy styling customization with Tailwind CSS

## Installation

Add the Blog Card Block component:

```bash
npx ngsui-cli add block blog-card
```

## Basic Usage

Import and use the Blog Card component:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCard, BlogCardConfig, BlogCardEvent, BlogAuthor, BlogCategory } from '@lib/blocks/blog-card';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, BlogCard],
  template: `
    <BlogCard
      [variant]="'card'"
      [size]="'md'"
      [config]="blogPost"
      (blogAction)="onBlogAction($event)"
    />
  `
})
export class ExampleComponent {
  author: BlogAuthor = {
    id: 'john-doe',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'Senior Software Engineer and tech blogger',
    socialLinks: {
      twitter: 'johndoe',
      linkedin: 'johndoe',
      website: 'johndoe.dev'
    }
  };

  category: BlogCategory = {
    id: 'technology',
    name: 'Technology',
    slug: 'technology',
    color: '#3B82F6',
    description: 'Latest trends in technology'
  };

  blogPost: BlogCardConfig = {
    id: 'angular-signals-guide',
    title: 'Mastering Angular Signals: A Complete Guide',
    excerpt: 'Learn how to leverage Angular Signals for better state management and reactive programming.',
    slug: 'angular-signals-guide',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    featuredImageAlt: 'Angular development workspace',
    author: this.author,
    publishDate: new Date('2024-12-10'),
    category: this.category,
    tags: [
      { id: 'angular', name: 'Angular', slug: 'angular' },
      { id: 'signals', name: 'Signals', slug: 'signals' }
    ],
    readingTime: 8,
    wordCount: 1600,
    status: 'published',
    metrics: {
      views: 2456,
      likes: 134,
      comments: 23,
      shares: 45
    },
    showAuthor: true,
    showDate: true,
    showCategory: true,
    showTags: true,
    showMetrics: true,
    showReadingTime: true,
    showExcerpt: true
  };

  onBlogAction(event: BlogCardEvent) {
    console.log('Blog action:', event);
    // Handle the action based on event.action
    switch (event.action) {
      case 'read':
        // Navigate to blog post
        break;
      case 'like':
        // Handle like action
        break;
      case 'share':
        // Handle share action
        break;
      case 'authorClick':
        // Navigate to author profile
        break;
      case 'categoryClick':
        // Filter by category
        break;
      case 'tagClick':
        // Filter by tag
        break;
    }
  }
}
```

## Layout Variants

### Card Layout
Perfect for blog grids and content showcases:

```typescript
@Component({
  template: `
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <BlogCard
        variant="card"
        size="md"
        [config]="blogPost1"
        (blogAction)="onBlogAction($event)"
      />
      <BlogCard
        variant="card"
        size="md"
        [config]="blogPost2"
        (blogAction)="onBlogAction($event)"
      />
      <BlogCard
        variant="card"
        size="md"
        [config]="blogPost3"
        (blogAction)="onBlogAction($event)"
      />
    </div>
  `
})
export class CardLayoutExample {}
```

### Horizontal Layout
Ideal for blog lists and content feeds:

```typescript
@Component({
  template: `
    <div class="flex flex-col gap-6 max-w-4xl mx-auto">
      <BlogCard
        variant="horizontal"
        size="lg"
        [config]="blogPost1"
        (blogAction)="onBlogAction($event)"
      />
      <BlogCard
        variant="horizontal"
        size="lg"
        [config]="blogPost2"
        (blogAction)="onBlogAction($event)"
      />
    </div>
  `
})
export class HorizontalLayoutExample {}
```

### Featured Layout
Highlight important or trending content:

```typescript
@Component({
  template: `
    <BlogCard
      variant="featured"
      size="lg"
      [config]="featuredPost"
      (blogAction)="onBlogAction($event)"
    />
  `
})
export class FeaturedLayoutExample {}
```

### Minimal Layout
Clean and simple design for content-focused layouts:

```typescript
@Component({
  template: `
    <div class="grid md:grid-cols-2 gap-6">
      <BlogCard
        variant="minimal"
        size="sm"
        [config]="blogPost1"
        (blogAction)="onBlogAction($event)"
      />
      <BlogCard
        variant="minimal"
        size="sm"
        [config]="blogPost2"
        (blogAction)="onBlogAction($event)"
      />
    </div>
  `
})
export class MinimalLayoutExample {}
```

### Magazine Layout
Editorial-style layout for news and publishing sites:

```typescript
@Component({
  template: `
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <BlogCard
        variant="magazine"
        size="lg"
        [config]="magazinePost1"
        (blogAction)="onBlogAction($event)"
      />
      <BlogCard
        variant="magazine"
        size="lg"
        [config]="magazinePost2"
        (blogAction)="onBlogAction($event)"
      />
    </div>
  `
})
export class MagazineLayoutExample {}
```

## Advanced Examples

### Blog with Interactive Actions

```typescript
@Component({
  imports: [CommonModule, BlogCard],
  template: `
    <div class="space-y-8">
      <BlogCard
        *ngFor="let post of blogPosts"
        [variant]="'card'"
        [size]="'md'"
        [config]="post"
        (blogAction)="handleBlogAction($event)"
      />
    </div>

    <!-- Action Feedback -->
    <div *ngIf="lastAction" class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg">
      {{ lastAction }}
    </div>
  `
})
export class InteractiveBlogExample {
  blogPosts: BlogCardConfig[] = [
    // ... your blog posts
  ];
  
  lastAction = '';

  handleBlogAction(event: BlogCardEvent) {
    this.lastAction = `${event.action} on post: ${event.blogId}`;
    
    switch (event.action) {
      case 'read':
        this.navigateToPost(event.blogId);
        break;
      case 'like':
        this.toggleLike(event.blogId);
        break;
      case 'share':
        this.sharePost(event.blogId);
        break;
      case 'authorClick':
        this.navigateToAuthor(event.data.authorId);
        break;
      case 'categoryClick':
        this.filterByCategory(event.data.categoryId);
        break;
      case 'tagClick':
        this.filterByTag(event.data.tagId);
        break;
    }
    
    // Clear message after 3 seconds
    setTimeout(() => this.lastAction = '', 3000);
  }

  private navigateToPost(blogId: string) {
    // Navigate to blog post detail page
    console.log('Navigating to post:', blogId);
  }

  private toggleLike(blogId: string) {
    // Toggle like status for blog post
    const post = this.blogPosts.find(p => p.id === blogId);
    if (post) {
      post.metrics.likes += 1; // Increment likes
    }
  }

  private sharePost(blogId: string) {
    // Open share dialog or copy link
    navigator.share?.({
      title: 'Check out this blog post',
      url: `https://yoursite.com/blog/${blogId}`
    });
  }

  private navigateToAuthor(authorId: string) {
    // Navigate to author profile page
    console.log('Navigating to author:', authorId);
  }

  private filterByCategory(categoryId: string) {
    // Filter blog posts by category
    console.log('Filtering by category:', categoryId);
  }

  private filterByTag(tagId: string) {
    // Filter blog posts by tag
    console.log('Filtering by tag:', tagId);
  }
}
```

### Dynamic Size and Variant Selection

```typescript
@Component({
  template: `
    <!-- Controls -->
    <div class="mb-8 space-y-4">
      <!-- Variant Selector -->
      <div class="flex flex-wrap gap-2">
        <button
          *ngFor="let variant of variants"
          (click)="selectedVariant = variant"
          [class]="selectedVariant === variant 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 text-gray-700'"
          class="px-4 py-2 rounded-lg"
        >
          {{ variant | titlecase }}
        </button>
      </div>

      <!-- Size Selector -->
      <div class="flex gap-2">
        <button
          *ngFor="let size of sizes"
          (click)="selectedSize = size"
          [class]="selectedSize === size 
            ? 'bg-slate-600 text-white' 
            : 'bg-gray-200 text-gray-700'"
          class="px-3 py-1 rounded-md text-sm"
        >
          {{ size.toUpperCase() }}
        </button>
      </div>
    </div>

    <!-- Dynamic Blog Cards -->
    <div [ngClass]="getLayoutClasses()">
      <BlogCard
        *ngFor="let post of blogPosts"
        [variant]="selectedVariant"
        [size]="selectedSize"
        [config]="post"
        (blogAction)="onBlogAction($event)"
      />
    </div>
  `
})
export class DynamicBlogExample {
  variants = ['card', 'horizontal', 'featured', 'minimal', 'magazine'] as const;
  sizes = ['sm', 'md', 'lg'] as const;
  
  selectedVariant: typeof this.variants[number] = 'card';
  selectedSize: typeof this.sizes[number] = 'md';
  
  blogPosts: BlogCardConfig[] = [
    // ... your blog posts
  ];

  getLayoutClasses(): string {
    switch (this.selectedVariant) {
      case 'horizontal':
        return 'flex flex-col gap-6 max-w-4xl mx-auto';
      case 'featured':
        return 'max-w-2xl mx-auto';
      case 'card':
      case 'minimal':
      case 'magazine':
      default:
        return 'grid md:grid-cols-2 lg:grid-cols-3 gap-8';
    }
  }

  onBlogAction(event: BlogCardEvent) {
    console.log('Blog action:', event);
  }
}
```

## API Reference

### BlogCard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'card' \| 'horizontal' \| 'featured' \| 'minimal' \| 'magazine'` | `'card'` | Blog card layout variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Blog card size |
| `config` | `BlogCardConfig` | `undefined` | Blog post configuration object |

### BlogCard Events

| Event | Type | Description |
|-------|------|-------------|
| `blogAction` | `BlogCardEvent` | Emitted when any interactive element is clicked |

## Type Definitions

### BlogCardConfig Interface

```typescript
interface BlogCardConfig {
  id: string;                           // Unique blog post identifier
  title: string;                        // Blog post title
  excerpt?: string;                     // Blog post excerpt/summary
  slug: string;                         // URL-friendly slug
  featuredImage?: string;               // Featured image URL
  featuredImageAlt?: string;            // Featured image alt text
  author: BlogAuthor;                   // Author information
  publishDate: Date;                    // Publication date
  category?: BlogCategory;              // Primary category
  tags?: BlogTag[];                     // Associated tags
  readingTime?: number;                 // Reading time in minutes
  wordCount?: number;                   // Word count
  status?: 'draft' | 'published' | 'featured'; // Post status
  metrics?: BlogMetrics;                // Engagement metrics
  showAuthor?: boolean;                 // Show author information
  showDate?: boolean;                   // Show publish date
  showCategory?: boolean;               // Show category
  showTags?: boolean;                   // Show tags
  showMetrics?: boolean;                // Show engagement metrics
  showReadingTime?: boolean;            // Show reading time
  showExcerpt?: boolean;                // Show excerpt
}
```

### BlogAuthor Interface

```typescript
interface BlogAuthor {
  id: string;                           // Unique author identifier
  name: string;                         // Author display name
  avatar?: string;                      // Author avatar image URL
  bio?: string;                         // Author biography
  socialLinks?: {                       // Social media links
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}
```

### BlogCategory Interface

```typescript
interface BlogCategory {
  id: string;                           // Unique category identifier
  name: string;                         // Category display name
  slug: string;                         // URL-friendly slug
  color?: string;                       // Category color (hex)
  description?: string;                 // Category description
}
```

### BlogTag Interface

```typescript
interface BlogTag {
  id: string;                           // Unique tag identifier
  name: string;                         // Tag display name
  slug: string;                         // URL-friendly slug
  color?: string;                       // Tag color (hex)
}
```

### BlogMetrics Interface

```typescript
interface BlogMetrics {
  views?: number;                       // View count
  likes?: number;                       // Like count
  comments?: number;                    // Comment count
  shares?: number;                      // Share count
}
```

### BlogCardEvent Interface

```typescript
interface BlogCardEvent {
  blogId: string;                       // Blog post ID
  action: 'read' | 'like' | 'share' | 'authorClick' | 'categoryClick' | 'tagClick'; // Action type
  data?: any;                          // Additional event data
}
```

## Customization

### Custom Styling

Override default styles with CSS classes:

```typescript
@Component({
  template: `
    <BlogCard
      variant="card"
      size="md"
      [config]="blogPost"
      class="custom-blog-card"
      (blogAction)="onBlogAction($event)"
    />
  `,
  styles: [`
    .custom-blog-card {
      /* Custom card styling */
      @apply shadow-2xl hover:shadow-3xl transition-shadow duration-300;
    }
    
    .custom-blog-card .blog-title {
      /* Custom title styling */
      @apply text-purple-900 font-black;
    }
    
    .custom-blog-card .blog-excerpt {
      /* Custom excerpt styling */
      @apply text-gray-600 italic;
    }
  `]
})
export class CustomStyledBlogExample {}
```

### Theme Customization

Create custom themes using CSS custom properties:

```css
:root {
  --blog-card-bg: #ffffff;
  --blog-card-border: #e5e7eb;
  --blog-card-text: #374151;
  --blog-card-accent: #3b82f6;
}

[data-theme="dark"] {
  --blog-card-bg: #1f2937;
  --blog-card-border: #374151;
  --blog-card-text: #f9fafb;
  --blog-card-accent: #60a5fa;
}

.blog-card {
  background: var(--blog-card-bg);
  border-color: var(--blog-card-border);
  color: var(--blog-card-text);
}

.blog-card .category-badge {
  background: var(--blog-card-accent);
}
```

## Best Practices

### Performance Optimization

1. **Lazy Loading Images**: Use loading="lazy" for images
2. **Virtual Scrolling**: For large lists of blog cards
3. **Pagination**: Break large datasets into pages
4. **Caching**: Cache blog data using Angular services

```typescript
@Component({
  template: `
    <BlogCard
      *ngFor="let post of blogPosts; trackBy: trackByBlogId"
      [config]="post"
      (blogAction)="onBlogAction($event)"
    />
  `
})
export class OptimizedBlogExample {
  trackByBlogId(index: number, post: BlogCardConfig): string {
    return post.id;
  }
}
```

### Accessibility

1. **Alt Text**: Always provide meaningful alt text for images
2. **ARIA Labels**: Use appropriate ARIA labels for interactive elements
3. **Keyboard Navigation**: Ensure all actions are keyboard accessible
4. **Color Contrast**: Maintain proper color contrast ratios

### SEO Optimization

1. **Structured Data**: Add JSON-LD structured data for better SEO
2. **Meta Tags**: Generate appropriate meta tags for blog posts
3. **Clean URLs**: Use SEO-friendly slugs
4. **Image Optimization**: Optimize images for faster loading

## Integration Examples

### With Angular Router

```typescript
@Component({
  template: `
    <BlogCard
      *ngFor="let post of blogPosts"
      [config]="post"
      (blogAction)="handleNavigation($event)"
    />
  `
})
export class RouterIntegrationExample {
  constructor(private router: Router) {}

  handleNavigation(event: BlogCardEvent) {
    if (event.action === 'read') {
      this.router.navigate(['/blog', event.blogId]);
    } else if (event.action === 'authorClick') {
      this.router.navigate(['/author', event.data.authorId]);
    } else if (event.action === 'categoryClick') {
      this.router.navigate(['/category', event.data.categorySlug]);
    }
  }
}
```

### With State Management (NgRx)

```typescript
@Component({
  template: `
    <BlogCard
      *ngFor="let post of blogPosts$ | async"
      [config]="post"
      (blogAction)="handleAction($event)"
    />
  `
})
export class NgRxIntegrationExample {
  blogPosts$ = this.store.select(selectBlogPosts);

  constructor(private store: Store) {}

  handleAction(event: BlogCardEvent) {
    switch (event.action) {
      case 'like':
        this.store.dispatch(toggleBlogLike({ blogId: event.blogId }));
        break;
      case 'share':
        this.store.dispatch(shareBlog({ blogId: event.blogId }));
        break;
    }
  }
}
```

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Common Issues

**Images not loading:**
- Verify image URLs are accessible
- Check CORS policies for external images
- Implement error handling for failed image loads

**Layout breaking on mobile:**
- Ensure proper responsive classes are applied
- Test on various screen sizes
- Use mobile-first design approach

**Performance issues with large lists:**
- Implement virtual scrolling
- Use proper trackBy functions
- Consider pagination or infinite scrolling

**Events not firing:**
- Check if event handlers are properly bound
- Verify component is imported correctly
- Ensure proper TypeScript types are used

### Debug Mode

Enable debug mode for development:

```typescript
@Component({
  template: `
    <BlogCard
      [config]="blogPost"
      [debug]="true"
      (blogAction)="onBlogAction($event)"
    />
  `
})
export class DebugExample {}
```

---

**Need help?** Check out our [GitHub repository](https://github.com/bhaimicrosoft/angular-superui) or open an issue for support.
