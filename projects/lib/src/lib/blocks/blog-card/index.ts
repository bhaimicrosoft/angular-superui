import { Component, Input, Output, EventEmitter, signal, computed, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { trigger, state, style, transition, animate } from '@angular/animations';

// Blog card types and interfaces
export type BlogCardVariant = 'card' | 'horizontal' | 'featured' | 'minimal' | 'magazine';
export type BlogCardSize = 'sm' | 'md' | 'lg';
export type BlogPostStatus = 'published' | 'draft' | 'featured' | 'trending';

export interface BlogAuthor {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  color?: string;
  description?: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogMetrics {
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  bookmarks?: number;
}

export interface BlogCardConfig {
  // Basic Info
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  slug: string;
  
  // Media
  featuredImage?: string;
  featuredImageAlt?: string;
  gallery?: string[];
  
  // Author & Publication
  author: BlogAuthor;
  publishDate: Date;
  updatedDate?: Date;
  
  // Categorization
  category: BlogCategory;
  tags?: BlogTag[];
  
  // Reading Info
  readingTime?: number; // in minutes
  wordCount?: number;
  
  // Status & Metrics
  status: BlogPostStatus;
  metrics?: BlogMetrics;
  
  // Display Options
  showAuthor?: boolean;
  showDate?: boolean;
  showCategory?: boolean;
  showTags?: boolean;
  showMetrics?: boolean;
  showReadingTime?: boolean;
  showExcerpt?: boolean;
  
  // Custom Fields
  customFields?: Record<string, any>;
}

export interface BlogCardEvent {
  action: string;
  blogId: string;
  data?: any;
}

// Blog card variants
const blogCardVariants = cva(
  'blog-card bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 group hover:shadow-md',
  {
    variants: {
      variant: {
        card: 'flex flex-col',
        horizontal: 'flex flex-row',
        featured: 'flex flex-col relative',
        minimal: 'flex flex-col border-0 shadow-none bg-transparent dark:bg-transparent hover:bg-gray-50/50 dark:hover:bg-gray-800/50 rounded-lg',
        magazine: 'flex flex-col relative'
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
      }
    },
    compoundVariants: [
      {
        variant: 'horizontal',
        size: 'sm',
        class: 'max-h-48'
      },
      {
        variant: 'horizontal',
        size: 'md',
        class: 'max-h-64'
      },
      {
        variant: 'horizontal',
        size: 'lg',
        class: 'max-h-80'
      },
      {
        variant: 'featured',
        class: 'min-h-96'
      },
      {
        variant: 'magazine',
        class: 'min-h-96'
      }
    ],
    defaultVariants: {
      variant: 'card',
      size: 'md'
    }
  }
);

// Image container variants
const imageContainerVariants = cva(
  'relative overflow-hidden',
  {
    variants: {
      variant: {
        card: 'w-full h-48',
        horizontal: 'w-1/3 flex-shrink-0',
        featured: 'w-full h-64',
        minimal: 'w-full h-40',
        magazine: 'w-full h-56'
      },
      size: {
        sm: '',
        md: '',
        lg: ''
      }
    },
    compoundVariants: [
      {
        variant: 'card',
        size: 'sm',
        class: 'h-32'
      },
      {
        variant: 'card',
        size: 'lg',
        class: 'h-64'
      },
      {
        variant: 'horizontal',
        size: 'sm',
        class: 'w-1/4'
      },
      {
        variant: 'horizontal',
        size: 'lg',
        class: 'w-2/5'
      },
      {
        variant: 'featured',
        size: 'lg',
        class: 'h-80'
      }
    ]
  }
);

// Content container variants
const contentVariants = cva(
  'p-6',
  {
    variants: {
      variant: {
        card: '',
        horizontal: 'flex-1',
        featured: 'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white',
        minimal: 'px-0 py-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0',
        magazine: 'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white p-6'
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
      }
    },
    compoundVariants: [
      {
        variant: 'minimal',
        size: 'sm',
        class: 'px-0 py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0'
      },
      {
        variant: 'minimal',
        size: 'lg',
        class: 'px-0 py-8 border-b border-gray-200 dark:border-gray-700 last:border-b-0'
      }
    ]
  }
);

@Component({
  selector: 'BlogCard',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('slideInUp', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('300ms ease-out')
      ])
    ]),
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('200ms ease-in')
      ])
    ]),
    trigger('scaleIn', [
      state('in', style({ transform: 'scale(1)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'scale(0.95)', opacity: 0 }),
        animate('200ms ease-out')
      ])
    ])
  ],
  template: `
    <article 
      [class]="getBlogCardVariants()({ 
        variant: _variant(), 
        size: _size() 
      })"
      [@slideInUp]="'in'"
      (click)="onCardClick()"
      [attr.aria-labelledby]="'blog-title-' + _config().id"
      [attr.aria-describedby]="'blog-excerpt-' + _config().id"
      role="article"
    >
      <!-- Featured Image -->
      <div 
        *ngIf="_config().featuredImage"
        [class]="getImageContainerVariants()({ 
          variant: _variant(), 
          size: _size() 
        })"
      >
        <img 
          [src]="_config().featuredImage" 
          [alt]="_config().featuredImageAlt || _config().title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          [attr.aria-hidden]="true"
          (error)="onFeaturedImageError($event)"
        />
        
        <!-- Status Badge (on image) -->
        <div *ngIf="shouldShowStatusBadge()" 
             class="absolute top-3 left-3 z-10">
          <span class="px-3 py-1 text-xs font-semibold rounded-full"
                [class]="getStatusBadgeClass()">
            {{ getStatusText() }}
          </span>
        </div>

        <!-- Category Badge (on image) -->
        <div *ngIf="_variant() === 'featured' || _variant() === 'magazine'" 
             class="absolute top-3 right-3 z-10">
          <span class="px-3 py-1 text-xs font-medium rounded-full bg-white/90 text-gray-900">
            {{ _config().category.name }}
          </span>
        </div>
      </div>

      <!-- Content -->
      <div [class]="getContentVariants()({ 
        variant: _variant(), 
        size: _size() 
      })">
        
        <!-- Category (non-overlay variants) -->
        <div *ngIf="shouldShowCategory() && !isOverlayVariant()" 
             class="mb-3">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                [style.background-color]="_config().category.color || '#3B82F6'"
                [style.color]="getContrastColor(_config().category.color || '#3B82F6')">
            {{ _config().category.name }}
          </span>
        </div>

        <!-- Title -->
        <h2 [id]="'blog-title-' + _config().id"
            class="font-bold leading-tight mb-3 line-clamp-2 cursor-pointer"
            [class]="getTitleClass()"
            (click)="onTitleClick($event)">
          {{ _config().title }}
        </h2>

        <!-- Excerpt -->
        <p *ngIf="shouldShowExcerpt()" 
           [id]="'blog-excerpt-' + _config().id"
           class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3"
           [class]="isOverlayVariant() ? 'text-white/90' : ''"
           [class.text-sm]="_size() === 'sm'"
           [class.text-base]="_size() === 'md'"
           [class.text-lg]="_size() === 'lg'">
          {{ _config().excerpt }}
        </p>

        <!-- Tags -->
        <div *ngIf="shouldShowTags() && _config().tags?.length" 
             class="mb-4">
          <div class="flex flex-wrap gap-2">
            <span *ngFor="let tag of getDisplayTags(); trackBy: trackByTagId"
                  class="px-2 py-1 text-xs font-medium rounded-md cursor-pointer transition-colors duration-200"
                  [class]="getTagClass()"
                  (click)="onTagClick(tag, $event)">
              #{{ tag.name }}
            </span>
          </div>
        </div>

        <!-- Reading Time & Word Count -->
        <div *ngIf="shouldShowReadingTime() && _config().readingTime" 
             class="flex items-center gap-2 mb-4 text-sm"
             [class]="isOverlayVariant() ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>{{ _config().readingTime }} min read</span>
          <span *ngIf="_config().wordCount" class="text-gray-400 dark:text-gray-500">
            • {{ formatWordCount(_config().wordCount!) }}
          </span>
        </div>

        <!-- Author & Date -->
        <div class="flex items-center justify-between">
          <div *ngIf="shouldShowAuthor()" 
               class="flex items-center gap-3">
            <img *ngIf="_config().author.avatar" 
                 [src]="_config().author.avatar"
                 [alt]="_config().author.name"
                 class="w-8 h-8 rounded-full object-cover cursor-pointer"
                 (click)="onAuthorClick($event)"
                 (error)="onAvatarError($event)"
                 loading="lazy">
            <div *ngIf="!_config().author.avatar" 
                 class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center cursor-pointer"
                 (click)="onAuthorClick($event)">
              <span class="text-white text-xs font-semibold">
                {{ getAuthorInitials() }}
              </span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-medium cursor-pointer"
                    [class]="isOverlayVariant() ? 'text-white' : 'text-gray-900 dark:text-white'"
                    (click)="onAuthorClick($event)">
                {{ _config().author.name }}
              </span>
              <span *ngIf="shouldShowDate()" 
                    class="text-xs"
                    [class]="isOverlayVariant() ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'">
                {{ formatDate(_config().publishDate) }}
              </span>
            </div>
          </div>

          <!-- Metrics -->
          <div *ngIf="shouldShowMetrics() && _config().metrics" 
               class="flex items-center gap-4 text-sm"
               [class]="isOverlayVariant() ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'">
            <div *ngIf="_config().metrics!.views" 
                 class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <span>{{ formatNumber(_config().metrics!.views!) }}</span>
            </div>
            <div *ngIf="_config().metrics!.likes" 
                 class="flex items-center gap-1 cursor-pointer"
                 (click)="onLikeClick($event)">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span>{{ formatNumber(_config().metrics!.likes!) }}</span>
            </div>
            <div *ngIf="_config().metrics!.comments" 
                 class="flex items-center gap-1 cursor-pointer"
                 (click)="onCommentsClick($event)">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              <span>{{ formatNumber(_config().metrics!.comments!) }}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  `,
})
export class BlogCard implements OnInit, OnChanges {
  @Input() variant: BlogCardVariant = 'card';
  @Input() size: BlogCardSize = 'md';
  @Input() config!: BlogCardConfig;

  @Output() blogAction = new EventEmitter<BlogCardEvent>();

  // Internal signals for reactive behavior
  protected _variant = signal<BlogCardVariant>(this.variant);
  protected _size = signal<BlogCardSize>(this.size);
  protected _config = signal<BlogCardConfig>({} as BlogCardConfig);

  ngOnInit() {
    this._variant.set(this.variant);
    this._size.set(this.size);
    this._config.set(this.config);
  }

  ngOnChanges() {
    this._variant.set(this.variant);
    this._size.set(this.size);
    this._config.set(this.config);
  }

  // Computed variant functions
  getBlogCardVariants = computed(() => blogCardVariants);
  getImageContainerVariants = computed(() => imageContainerVariants);
  getContentVariants = computed(() => contentVariants);

  // Display logic
  shouldShowCategory(): boolean {
    return this._config().showCategory !== false;
  }

  shouldShowAuthor(): boolean {
    return this._config().showAuthor !== false;
  }

  shouldShowDate(): boolean {
    return this._config().showDate !== false;
  }

  shouldShowTags(): boolean {
    return this._config().showTags !== false;
  }

  shouldShowMetrics(): boolean {
    return this._config().showMetrics !== false;
  }

  shouldShowReadingTime(): boolean {
    return this._config().showReadingTime !== false;
  }

  shouldShowExcerpt(): boolean {
    return this._config().showExcerpt !== false;
  }

  shouldShowStatusBadge(): boolean {
    return this._config().status === 'featured' || this._config().status === 'trending';
  }

  isOverlayVariant(): boolean {
    return this._variant() === 'featured' || this._variant() === 'magazine';
  }

  // Style helpers
  getTitleClass(): string {
    const baseClass = this.isOverlayVariant() ? 'text-white' : 'text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400';
    const sizeClass = {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl'
    }[this._size()];
    
    return `${baseClass} ${sizeClass}`;
  }

  getTagClass(): string {
    const baseClass = this.isOverlayVariant() 
      ? 'bg-white/20 text-white hover:bg-white/30' 
      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600';
    
    return baseClass;
  }

  getStatusBadgeClass(): string {
    const statusClasses = {
      featured: 'bg-yellow-500 text-white',
      trending: 'bg-red-500 text-white',
      published: 'bg-green-500 text-white',
      draft: 'bg-gray-500 text-white'
    };
    
    return statusClasses[this._config().status] || statusClasses.published;
  }

  getStatusText(): string {
    const statusTexts = {
      featured: 'Featured',
      trending: 'Trending',
      published: 'New',
      draft: 'Draft'
    };
    
    return statusTexts[this._config().status] || '';
  }

  // Utility methods
  getDisplayTags(): BlogTag[] {
    const maxTags = this._size() === 'sm' ? 2 : this._size() === 'md' ? 3 : 4;
    return this._config().tags?.slice(0, maxTags) || [];
  }

  getContrastColor(backgroundColor: string): string {
    // Simple contrast calculation - in a real app, use a proper color contrast library
    const color = backgroundColor.replace('#', '');
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatNumber(num: number): string {
    if (num < 1000) return num.toString();
    if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
    return `${(num / 1000000).toFixed(1)}M`;
  }

  formatWordCount(count: number): string {
    return `${count.toLocaleString()} words`;
  }

  // Event handlers
  onCardClick(): void {
    this.blogAction.emit({
      action: 'card-click',
      blogId: this._config().id,
      data: { blog: this._config() }
    });
  }

  onTitleClick(event: Event): void {
    event.stopPropagation();
    this.blogAction.emit({
      action: 'title-click',
      blogId: this._config().id,
      data: { blog: this._config() }
    });
  }

  onAuthorClick(event: Event): void {
    event.stopPropagation();
    this.blogAction.emit({
      action: 'author-click',
      blogId: this._config().id,
      data: { author: this._config().author }
    });
  }

  onTagClick(tag: BlogTag, event: Event): void {
    event.stopPropagation();
    this.blogAction.emit({
      action: 'tag-click',
      blogId: this._config().id,
      data: { tag }
    });
  }

  onLikeClick(event: Event): void {
    event.stopPropagation();
    this.blogAction.emit({
      action: 'like-click',
      blogId: this._config().id,
      data: { currentLikes: this._config().metrics?.likes }
    });
  }

  onCommentsClick(event: Event): void {
    event.stopPropagation();
    this.blogAction.emit({
      action: 'comments-click',
      blogId: this._config().id,
      data: { blog: this._config() }
    });
  }

  onAvatarError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
  }

  onFeaturedImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    // Set a placeholder image or hide the image container
    imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MDAgMzAwTDM2MCAyNjBIMzAwVjM0MEgzNjBMNDAwIDMwMFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHN2Zz4K';
    imgElement.alt = 'Image not available';
  }

  getAuthorInitials(): string {
    const name = this._config().author.name;
    const names = name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  // Track by functions for performance
  trackByTagId(index: number, tag: BlogTag): string {
    return tag.id;
  }
}

// Helper function to calculate reading time
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Helper function to extract excerpt from content
export function extractExcerpt(content: string, maxLength: number = 160): string {
  const plainText = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  if (plainText.length <= maxLength) return plainText;
  
  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  return lastSpaceIndex > 0 
    ? truncated.substring(0, lastSpaceIndex) + '...'
    : truncated + '...';
}
