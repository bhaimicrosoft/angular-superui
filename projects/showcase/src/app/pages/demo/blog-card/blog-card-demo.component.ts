import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCard, BlogCardConfig, BlogCardEvent, BlogAuthor, BlogCategory, BlogCardVariant, BlogCardSize } from '@lib/blocks/blog-card';

@Component({
  selector: 'app-blog-card-demo',
  standalone: true,
  imports: [CommonModule, BlogCard],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Blog Card Block
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional blog cards with author information, reading time, categories, and modern design variants for content-driven websites.
          </p>
        </div>

        <!-- Variant Selector -->
        <div class="flex flex-wrap justify-center gap-2 mb-8">
          <button
            *ngFor="let variant of variants"
            (click)="setVariant(variant)"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            [class]="selectedVariant() === variant
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'"
          >
            {{ variant | titlecase }}
          </button>
        </div>

        <!-- Size Selector -->
        <div class="flex justify-center gap-2 mb-12">
          <button
            *ngFor="let size of sizes"
            (click)="setSize(size)"
            class="px-3 py-1 rounded-md text-xs font-medium transition-all duration-200"
            [class]="selectedSize() === size
              ? 'bg-slate-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'"
          >
            {{ size.toUpperCase() }}
          </button>
        </div>

        <!-- Blog Cards Grid -->
        <div class="space-y-16">
          
          <!-- Card Variant Demo -->
          <section *ngIf="selectedVariant() === 'card'" class="space-y-8">
            <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white">
              Card Layout
            </h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BlogCard
                [variant]="selectedVariant()"
                [size]="selectedSize()"
                [config]="techBlogPost"
                (blogAction)="onBlogAction($event, 'Tech Blog')"
              />
              <BlogCard
                [variant]="selectedVariant()"
                [size]="selectedSize()"
                [config]="designBlogPost"
                (blogAction)="onBlogAction($event, 'Design Blog')"
              />
              <BlogCard
                [variant]="selectedVariant()"
                [size]="selectedSize()"
                [config]="businessBlogPost"
                (blogAction)="onBlogAction($event, 'Business Blog')"
              />
            </div>
          </section>

          <!-- Horizontal Variant Demo -->
          <section *ngIf="selectedVariant() === 'horizontal'" class="space-y-8">
            <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white">
              Horizontal Layout
            </h2>
            <div class="flex flex-col gap-4 max-w-4xl mx-auto">
              <BlogCard
                [variant]="selectedVariant()"
                [size]="selectedSize()"
                [config]="techBlogPost"
                (blogAction)="onBlogAction($event, 'Tech Blog')"
              />
              <BlogCard
                [variant]="selectedVariant()"
                [size]="selectedSize()"
                [config]="designBlogPost"
                (blogAction)="onBlogAction($event, 'Design Blog')"
              />
              <BlogCard
                [variant]="selectedVariant()"
                [size]="selectedSize()"
                [config]="businessBlogPost"
                (blogAction)="onBlogAction($event, 'Business Blog')"
              />
            </div>
          </section>

          <!-- Featured Variant Demo -->
          <section *ngIf="selectedVariant() === 'featured'" class="space-y-8">
            <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white">
              Featured Layout
            </h2>
            <div class="grid lg:grid-cols-2 gap-8">
              <BlogCard
                [variant]="selectedVariant()"
                [size]="selectedSize()"
                [config]="featuredPost"
                (blogAction)="onBlogAction($event, 'Featured Blog')"
              />
              <BlogCard
                [variant]="selectedVariant()"
                [size]="selectedSize()"
                [config]="trendingPost"
                (blogAction)="onBlogAction($event, 'Trending Blog')"
              />
            </div>
          </section>

          <!-- Minimal Variant Demo -->
          <section *ngIf="selectedVariant() === 'minimal'" class="space-y-8">
            <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white">
              Minimal Layout
            </h2>
            <div class="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <BlogCard
                [variant]="selectedVariant()"
                [size]="selectedSize()"
                [config]="minimalPost1"
                (blogAction)="onBlogAction($event, 'Minimal Blog')"
              />
              <BlogCard
                [variant]="selectedVariant()"
                [size]="selectedSize()"
                [config]="minimalPost2"
                (blogAction)="onBlogAction($event, 'Minimal Blog')"
              />
            </div>
          </section>

          <!-- Magazine Variant Demo -->
          <section *ngIf="selectedVariant() === 'magazine'" class="space-y-8">
            <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white">
              Magazine Layout
            </h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BlogCard
                [variant]="selectedVariant()"
                [size]="selectedSize()"
                [config]="magazinePost1"
                (blogAction)="onBlogAction($event, 'Magazine Style')"
              />
              <BlogCard
                [variant]="selectedVariant()"
                [size]="selectedSize()"
                [config]="magazinePost2"
                (blogAction)="onBlogAction($event, 'Magazine Style')"
              />
              <BlogCard
                [variant]="selectedVariant()"
                [size]="selectedSize()"
                [config]="magazinePost3"
                (blogAction)="onBlogAction($event, 'Magazine Style')"
              />
            </div>
          </section>
        </div>

        <!-- Action Log -->
        <div *ngIf="actionLog().length > 0" class="mt-16">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Blog Actions Log
          </h3>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div class="space-y-4 max-h-64 overflow-y-auto">
              <div
                *ngFor="let action of actionLog(); let i = index"
                class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium text-gray-900 dark:text-white">
                    {{ action.category }} - {{ action.blogTitle }}
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    {{ action.timestamp | date:'medium' }}
                  </span>
                </div>
                <div class="text-sm text-gray-700 dark:text-gray-300">
                  Action: <span class="font-medium">{{ action.action }}</span>
                  <span *ngIf="action.data" class="ml-2 text-xs">
                    {{ action.data | json }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Features List -->
        <div class="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Blog Card Features
          </h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Content Display</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Article titles and excerpts</li>
                <li>• Featured images with lazy loading</li>
                <li>• Author information and avatars</li>
                <li>• Publication and update dates</li>
                <li>• Reading time calculation</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Categorization</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Category badges with colors</li>
                <li>• Tag system with click handlers</li>
                <li>• Status badges (featured, trending)</li>
                <li>• Custom metadata support</li>
                <li>• Flexible taxonomy</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Layout Variants</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Card layout for grids</li>
                <li>• Horizontal for lists</li>
                <li>• Featured for hero content</li>
                <li>• Minimal for clean design</li>
                <li>• Magazine for editorial style</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Engagement</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• View counts and metrics</li>
                <li>• Like and comment counters</li>
                <li>• Social sharing options</li>
                <li>• Click event handling</li>
                <li>• Interactive elements</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Technical</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Angular 20 signals</li>
                <li>• TypeScript interfaces</li>
                <li>• Responsive design</li>
                <li>• Dark mode support</li>
                <li>• Accessibility compliance</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Use Cases</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Blog websites</li>
                <li>• News platforms</li>
                <li>• Content management systems</li>
                <li>• Editorial websites</li>
                <li>• Knowledge bases</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Documentation Link -->
        <div class="mt-16 text-center">
          <div class="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 border border-gray-200 dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              📝 Complete Documentation
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Explore comprehensive examples, API reference, customization options, and integration guides for the Blog Card block.
            </p>
            <a
              href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/blocks/blog-card.md"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-slate-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-slate-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              View Documentation
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class BlogCardDemoComponent {
  // Variant and size options
  variants: BlogCardVariant[] = ['card', 'horizontal', 'featured', 'minimal', 'magazine'];
  sizes: BlogCardSize[] = ['sm', 'md', 'lg'];

  // Selected variants
  selectedVariant = signal<BlogCardVariant>('card');
  selectedSize = signal<BlogCardSize>('md');

  // Action log
  actionLog = signal<Array<{ category: string; blogTitle: string; action: string; data?: any; timestamp: Date }>>([]);

  // Authors
  techAuthor: BlogAuthor = {
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

  designAuthor: BlogAuthor = {
    id: 'jane-smith',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b19c?w=400&h=400&fit=crop&crop=face',
    bio: 'UX/UI Designer and design systems expert',
    socialLinks: {
      twitter: 'janesmith',
      linkedin: 'janesmith'
    }
  };

  businessAuthor: BlogAuthor = {
    id: 'alex-johnson',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Business strategist and startup advisor'
  };

  // Categories
  techCategory: BlogCategory = {
    id: 'technology',
    name: 'Technology',
    slug: 'technology',
    color: '#3B82F6',
    description: 'Latest trends in technology and software development'
  };

  designCategory: BlogCategory = {
    id: 'design',
    name: 'Design',
    slug: 'design',
    color: '#8B5CF6',
    description: 'UI/UX design principles and creative inspiration'
  };

  businessCategory: BlogCategory = {
    id: 'business',
    name: 'Business',
    slug: 'business',
    color: '#059669',
    description: 'Business strategies and entrepreneurship insights'
  };

  // Blog post configurations
  techBlogPost: BlogCardConfig = {
    id: 'angular-signals-guide',
    title: 'Mastering Angular Signals: A Complete Guide to Reactive Programming',
    excerpt: 'Learn how to leverage Angular Signals for better state management and reactive programming. This comprehensive guide covers everything from basic concepts to advanced patterns.',
    slug: 'angular-signals-guide',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&crop=center',
    featuredImageAlt: 'Angular development workspace with code on multiple screens',
    author: this.techAuthor,
    publishDate: new Date('2024-12-10'),
    category: this.techCategory,
    tags: [
      { id: 'angular', name: 'Angular', slug: 'angular' },
      { id: 'signals', name: 'Signals', slug: 'signals' },
      { id: 'reactive', name: 'Reactive Programming', slug: 'reactive' }
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

  designBlogPost: BlogCardConfig = {
    id: 'design-systems-2024',
    title: 'Building Scalable Design Systems in 2024',
    excerpt: 'Explore modern approaches to creating and maintaining design systems that scale across multiple products and teams.',
    slug: 'design-systems-2024',
    featuredImage: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&h=600&fit=crop&crop=center',
    featuredImageAlt: 'Design system components and style guide layouts',
    author: this.designAuthor,
    publishDate: new Date('2024-12-08'),
    category: this.designCategory,
    tags: [
      { id: 'design-systems', name: 'Design Systems', slug: 'design-systems' },
      { id: 'ui-components', name: 'UI Components', slug: 'ui-components' },
      { id: 'figma', name: 'Figma', slug: 'figma' }
    ],
    readingTime: 12,
    wordCount: 2400,
    status: 'featured',
    metrics: {
      views: 3892,
      likes: 267,
      comments: 45,
      shares: 78
    },
    showAuthor: true,
    showDate: true,
    showCategory: true,
    showTags: true,
    showMetrics: true,
    showReadingTime: true,
    showExcerpt: true
  };

  businessBlogPost: BlogCardConfig = {
    id: 'startup-growth-strategies',
    title: 'Proven Startup Growth Strategies That Actually Work',
    excerpt: 'Discover battle-tested growth strategies that have helped hundreds of startups scale from idea to unicorn status.',
    slug: 'startup-growth-strategies',
    featuredImage: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=600&fit=crop',
    featuredImageAlt: 'Team collaborating on growth strategy with charts and graphs',
    author: this.businessAuthor,
    publishDate: new Date('2024-12-05'),
    category: this.businessCategory,
    tags: [
      { id: 'startup', name: 'Startup', slug: 'startup' },
      { id: 'growth', name: 'Growth', slug: 'growth' },
      { id: 'strategy', name: 'Strategy', slug: 'strategy' }
    ],
    readingTime: 15,
    wordCount: 3000,
    status: 'trending',
    metrics: {
      views: 5234,
      likes: 389,
      comments: 67,
      shares: 123
    },
    showAuthor: true,
    showDate: true,
    showCategory: true,
    showTags: true,
    showMetrics: true,
    showReadingTime: true,
    showExcerpt: true
  };

  featuredPost: BlogCardConfig = {
    id: 'ai-future-development',
    title: 'The Future of AI in Web Development: What Developers Need to Know',
    excerpt: 'Artificial Intelligence is revolutionizing web development. From code generation to automated testing, discover how AI tools are changing the development landscape and what it means for your career.',
    slug: 'ai-future-development',
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    featuredImageAlt: 'AI and machine learning concept with futuristic interface',
    author: this.techAuthor,
    publishDate: new Date('2024-12-12'),
    category: this.techCategory,
    tags: [
      { id: 'ai', name: 'AI', slug: 'ai' },
      { id: 'machine-learning', name: 'Machine Learning', slug: 'machine-learning' },
      { id: 'web-development', name: 'Web Development', slug: 'web-development' }
    ],
    readingTime: 18,
    wordCount: 3600,
    status: 'featured',
    metrics: {
      views: 8945,
      likes: 542,
      comments: 89,
      shares: 234
    },
    showAuthor: true,
    showDate: true,
    showCategory: true,
    showTags: true,
    showMetrics: true,
    showReadingTime: true,
    showExcerpt: true
  };

  trendingPost: BlogCardConfig = {
    id: 'no-code-revolution',
    title: 'The No-Code Revolution: Building Apps Without Programming',
    excerpt: 'No-code platforms are empowering non-developers to build sophisticated applications. Explore the tools, possibilities, and limitations of the no-code movement.',
    slug: 'no-code-revolution',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center',
    featuredImageAlt: 'Visual programming interface with drag and drop components',
    author: this.businessAuthor,
    publishDate: new Date('2024-12-11'),
    category: this.businessCategory,
    tags: [
      { id: 'no-code', name: 'No-Code', slug: 'no-code' },
      { id: 'automation', name: 'Automation', slug: 'automation' },
      { id: 'tools', name: 'Tools', slug: 'tools' }
    ],
    readingTime: 10,
    wordCount: 2000,
    status: 'trending',
    metrics: {
      views: 6789,
      likes: 401,
      comments: 56,
      shares: 167
    },
    showAuthor: true,
    showDate: true,
    showCategory: true,
    showTags: true,
    showMetrics: true,
    showReadingTime: true,
    showExcerpt: true
  };

  minimalPost1: BlogCardConfig = {
    id: 'clean-code-principles',
    title: 'Essential Clean Code Principles Every Developer Should Know',
    excerpt: 'Write maintainable, readable, and efficient code by following these fundamental clean code principles.',
    slug: 'clean-code-principles',
    author: this.techAuthor,
    publishDate: new Date('2024-12-09'),
    category: this.techCategory,
    readingTime: 6,
    status: 'published',
    showAuthor: true,
    showDate: true,
    showCategory: false,
    showTags: false,
    showMetrics: false,
    showReadingTime: true,
    showExcerpt: true
  };

  minimalPost2: BlogCardConfig = {
    id: 'css-grid-mastery',
    title: 'CSS Grid Layout: From Beginner to Advanced',
    excerpt: 'Master CSS Grid with practical examples and real-world use cases for modern web layouts.',
    slug: 'css-grid-mastery',
    author: this.designAuthor,
    publishDate: new Date('2024-12-07'),
    category: this.designCategory,
    readingTime: 9,
    status: 'published',
    showAuthor: true,
    showDate: true,
    showCategory: false,
    showTags: false,
    showMetrics: false,
    showReadingTime: true,
    showExcerpt: true
  };

  magazinePost1: BlogCardConfig = {
    id: 'tech-trends-2025',
    title: 'Top 10 Technology Trends That Will Define 2025',
    excerpt: 'From quantum computing to sustainable tech, discover the innovations that will shape the next year in technology.',
    slug: 'tech-trends-2025',
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&crop=center',
    featuredImageAlt: 'Futuristic technology concepts and digital innovation',
    author: this.techAuthor,
    publishDate: new Date('2024-12-13'),
    category: this.techCategory,
    tags: [
      { id: 'trends', name: 'Trends', slug: 'trends' },
      { id: 'innovation', name: 'Innovation', slug: 'innovation' }
    ],
    readingTime: 7,
    status: 'featured',
    showAuthor: true,
    showDate: true,
    showCategory: true,
    showTags: true,
    showMetrics: false,
    showReadingTime: true,
    showExcerpt: true
  };

  magazinePost2: BlogCardConfig = {
    id: 'remote-work-culture',
    title: 'Building Strong Remote Work Culture in Tech Teams',
    excerpt: 'Practical strategies for fostering collaboration, communication, and company culture in distributed teams.',
    slug: 'remote-work-culture',
    featuredImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
    featuredImageAlt: 'Remote team video call and collaboration setup',
    author: this.businessAuthor,
    publishDate: new Date('2024-12-06'),
    category: this.businessCategory,
    readingTime: 11,
    status: 'published',
    showAuthor: true,
    showDate: true,
    showCategory: true,
    showTags: false,
    showMetrics: false,
    showReadingTime: true,
    showExcerpt: true
  };

  magazinePost3: BlogCardConfig = {
    id: 'ux-accessibility',
    title: 'Designing Inclusive UX: Accessibility Best Practices',
    excerpt: 'Create user experiences that work for everyone by implementing proper accessibility standards and inclusive design principles.',
    slug: 'ux-accessibility',
    featuredImage: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop',
    featuredImageAlt: 'Inclusive design and accessibility symbols',
    author: this.designAuthor,
    publishDate: new Date('2024-12-04'),
    category: this.designCategory,
    readingTime: 13,
    status: 'published',
    showAuthor: true,
    showDate: true,
    showCategory: true,
    showTags: false,
    showMetrics: false,
    showReadingTime: true,
    showExcerpt: true
  };

  setVariant(variant: BlogCardVariant) {
    this.selectedVariant.set(variant);
  }

  setSize(size: BlogCardSize) {
    this.selectedSize.set(size);
  }

  onBlogAction(event: BlogCardEvent, category: string) {
    const blogTitle = this.getBlogTitle(event.blogId);
    
    this.actionLog.update(log => [{
      category,
      blogTitle,
      action: event.action,
      data: event.data,
      timestamp: new Date()
    }, ...log.slice(0, 9)]); // Keep only last 10 actions
  }

  private getBlogTitle(blogId: string): string {
    const blogPosts = [
      this.techBlogPost,
      this.designBlogPost,
      this.businessBlogPost,
      this.featuredPost,
      this.trendingPost,
      this.minimalPost1,
      this.minimalPost2,
      this.magazinePost1,
      this.magazinePost2,
      this.magazinePost3
    ];
    
    const blog = blogPosts.find(post => post.id === blogId);
    return blog?.title || 'Unknown Blog';
  }
}
