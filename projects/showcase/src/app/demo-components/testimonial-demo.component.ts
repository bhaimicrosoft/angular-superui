import { Component, signal, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SEOService } from '../services/seo.service';
import { TestimonialBlock } from '@lib/blocks/testimonial';
import { Icon } from '@lib/components/icon';

@Component({
  selector: 'app-testimonial-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, TestimonialBlock, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Professional Hero Section -->
    <section class="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Breadcrumb Navigation -->
          <nav class="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <a href="/blocks" class="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">UI Blocks</a>
            <span>→</span>
            <span class="text-gray-900 dark:text-white font-medium">Testimonial Block</span>
          </nav>

          <!-- Category Badge -->
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Content Block
          </div>

          <!-- Main Heading -->
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Testimonial Block
          </h1>

          <!-- Description -->
          <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Showcase customer testimonials and reviews with beautiful layouts. 
            Build trust and credibility with social proof that converts.
          </p>

          <!-- Features -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-300">
            <div class="flex items-center justify-center">
              <span class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                <span class="text-white text-xs">✓</span>
              </span>
              Multiple Layouts
            </div>
            <div class="flex items-center justify-center">
              <span class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                <span class="text-white text-xs">✓</span>
              </span>
              Rating Support
            </div>
            <div class="flex items-center justify-center">
              <span class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                <span class="text-white text-xs">✓</span>
              </span>
              Responsive Design
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Examples -->
    <div id="examples" class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">

          <!-- Example 1: Default Testimonials -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Default Style</h2>
              <p class="text-gray-600 dark:text-gray-300">Clean testimonials with standard card layout</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TestimonialBlock variant="default" size="default" layout="vertical">
                <blockquote slot="quote" class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  "Angular SuperUI has completely transformed how we build user interfaces. The components are incredibly well-designed and easy to customize."
                </blockquote>
                <div slot="rating" class="flex items-center mb-4">
                  @for (star of [1,2,3,4,5]; track star) {
                    <Icon icon="fas fa-star" size="sm" class="text-yellow-400" />
                  }
                </div>
                <img slot="avatar" src="https://picsum.photos/64/64?random=1" alt="John Smith" class="w-12 h-12 rounded-full object-cover">
                <div slot="author" class="font-semibold text-gray-900 dark:text-white">John Smith</div>
                <div slot="title" class="text-sm text-gray-500 dark:text-gray-400">Frontend Developer</div>
                <div slot="company" class="text-sm text-gray-500 dark:text-gray-400">TechCorp Inc.</div>
              </TestimonialBlock>

              <TestimonialBlock variant="default" size="default" layout="vertical">
                <blockquote slot="quote" class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  "The documentation is excellent and the components work flawlessly. Our development speed has increased by 40%."
                </blockquote>
                <div slot="rating" class="flex items-center mb-4">
                  @for (star of [1,2,3,4,5]; track star) {
                    <Icon icon="fas fa-star" size="sm" class="text-yellow-400" />
                  }
                </div>
                <img slot="avatar" src="https://picsum.photos/64/64?random=2" alt="Sarah Johnson" class="w-12 h-12 rounded-full object-cover">
                <div slot="author" class="font-semibold text-gray-900 dark:text-white">Sarah Johnson</div>
                <div slot="title" class="text-sm text-gray-500 dark:text-gray-400">UI/UX Designer</div>
                <div slot="company" class="text-sm text-gray-500 dark:text-gray-400">Design Studio</div>
              </TestimonialBlock>

              <TestimonialBlock variant="default" size="default" layout="vertical">
                <blockquote slot="quote" class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  "Outstanding component library! The accessibility features and TypeScript support are top-notch."
                </blockquote>
                <div slot="rating" class="flex items-center mb-4">
                  @for (star of [1,2,3,4,5]; track star) {
                    <Icon icon="fas fa-star" size="sm" class="text-yellow-400" />
                  }
                </div>
                <img slot="avatar" src="https://picsum.photos/64/64?random=3" alt="Michael Chen" class="w-12 h-12 rounded-full object-cover">
                <div slot="author" class="font-semibold text-gray-900 dark:text-white">Michael Chen</div>
                <div slot="title" class="text-sm text-gray-500 dark:text-gray-400">Senior Engineer</div>
                <div slot="company" class="text-sm text-gray-500 dark:text-gray-400">StartupXYZ</div>
              </TestimonialBlock>
            </div>
          </div>

          <!-- Example 2: Quote Style -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quote Style</h2>
              <p class="text-gray-600 dark:text-gray-300">Emphasis on the testimonial text with quote marks</p>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TestimonialBlock variant="quote" size="lg" layout="vertical" [showQuote]="true">
                <blockquote slot="quote" class="text-xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed mb-6">
                  The level of customization and attention to detail in Angular SuperUI is remarkable. It's saved us countless hours of development time and our users love the polished interface.
                </blockquote>
                <img slot="avatar" src="https://picsum.photos/64/64?random=4" alt="David Park" class="w-14 h-14 rounded-full object-cover">
                <div slot="author" class="font-bold text-gray-900 dark:text-white text-lg">David Park</div>
                <div slot="title" class="text-gray-500 dark:text-gray-400">CTO</div>
                <div slot="company" class="text-primary font-medium">InnovateLab</div>
              </TestimonialBlock>

              <TestimonialBlock variant="quote" size="lg" layout="vertical" [showQuote]="true">
                <blockquote slot="quote" class="text-xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed mb-6">
                  We've been using Angular SuperUI for over a year now, and it continues to exceed our expectations. The component quality and performance are exceptional.
                </blockquote>
                <img slot="avatar" src="https://picsum.photos/64/64?random=5" alt="Lisa Rodriguez" class="w-14 h-14 rounded-full object-cover">
                <div slot="author" class="font-bold text-gray-900 dark:text-white text-lg">Lisa Rodriguez</div>
                <div slot="title" class="text-gray-500 dark:text-gray-400">Product Manager</div>
                <div slot="company" class="text-primary font-medium">GrowthTech</div>
              </TestimonialBlock>
            </div>
          </div>

          <!-- Example 3: Horizontal Layout -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Horizontal Layout</h2>
              <p class="text-gray-600 dark:text-gray-300">Side-by-side layout for featured testimonials</p>
            </div>
            <div class="space-y-8">
              <TestimonialBlock variant="card" size="lg" layout="horizontal">
                <blockquote slot="quote" class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  "Angular SuperUI has revolutionized our development workflow. The components are intuitive, well-documented, and incredibly flexible. Our team productivity has increased significantly since we started using it."
                </blockquote>
                <div slot="rating" class="flex items-center mb-4">
                  @for (star of [1,2,3,4,5]; track star) {
                    <Icon icon="fas fa-star" size="md" class="text-yellow-400 mr-1" />
                  }
                  <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">(5.0)</span>
                </div>
                <img slot="avatar" src="https://picsum.photos/80/80?random=6" alt="Alex Thompson" class="w-16 h-16 rounded-full object-cover">
                <div slot="author" class="font-bold text-gray-900 dark:text-white text-lg">Alex Thompson</div>
                <div slot="title" class="text-gray-500 dark:text-gray-400">Lead Developer</div>
                <div slot="company" class="text-primary font-medium">WebFlow Solutions</div>
              </TestimonialBlock>

              <TestimonialBlock variant="card" size="lg" layout="horizontal">
                <blockquote slot="quote" class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  "The attention to accessibility and performance in Angular SuperUI is outstanding. It's exactly what we needed for our enterprise application. Highly recommended for any serious Angular project."
                </blockquote>
                <div slot="rating" class="flex items-center mb-4">
                  @for (star of [1,2,3,4,5]; track star) {
                    <Icon icon="fas fa-star" size="md" class="text-yellow-400 mr-1" />
                  }
                  <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">(5.0)</span>
                </div>
                <img slot="avatar" src="https://picsum.photos/80/80?random=7" alt="Emma Davis" class="w-16 h-16 rounded-full object-cover">
                <div slot="author" class="font-bold text-gray-900 dark:text-white text-lg">Emma Davis</div>
                <div slot="title" class="text-gray-500 dark:text-gray-400">Engineering Manager</div>
                <div slot="company" class="text-primary font-medium">Enterprise Corp</div>
              </TestimonialBlock>
            </div>
          </div>

          <!-- Example 4: Centered Layout -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Centered Layout</h2>
              <p class="text-gray-600 dark:text-gray-300">Perfect for hero sections and featured testimonials</p>
            </div>
            <div class="max-w-4xl mx-auto">
              <TestimonialBlock variant="minimal" size="xl" layout="centered" [showQuote]="true">
                <blockquote slot="quote" class="text-2xl text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-8 max-w-3xl">
                  Angular SuperUI is hands down the best UI component library I've used for Angular. The developer experience is phenomenal, and the end results are always beautiful and performant.
                </blockquote>
                <div slot="rating" class="flex items-center justify-center mb-6">
                  @for (star of [1,2,3,4,5]; track star) {
                    <Icon icon="fas fa-star" size="lg" class="text-yellow-400 mx-1" />
                  }
                </div>
                <img slot="avatar" src="https://picsum.photos/80/80?random=8" alt="Ryan Mitchell" class="w-20 h-20 rounded-full object-cover">
                <div slot="author" class="font-bold text-gray-900 dark:text-white text-xl">Ryan Mitchell</div>
                <div slot="title" class="text-gray-500 dark:text-gray-400 text-lg">Founder & CEO</div>
                <div slot="company" class="text-primary font-semibold text-lg">TechStartup Inc.</div>
              </TestimonialBlock>
            </div>
          </div>

          <!-- Example 5: Grid with Company Logos -->
          <div class="mb-20">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">With Company Logos</h2>
              <p class="text-gray-600 dark:text-gray-300">Testimonials featuring company branding</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              @for (testimonial of featuredTestimonials(); track testimonial.id) {
                <TestimonialBlock variant="gradient" size="lg" layout="vertical">
                  <img slot="logo" [src]="testimonial.companyLogo" [alt]="testimonial.company + ' logo'" class="h-6 w-auto opacity-70 dark:opacity-60 object-contain">
                  <div slot="badge" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" [class]="testimonial.badgeColor">
                    {{ testimonial.badge }}
                  </div>
                  <blockquote slot="quote" class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {{ testimonial.quote }}
                  </blockquote>
                  <div slot="rating" class="flex items-center mb-4">
                    @for (star of [1,2,3,4,5]; track star) {
                      <Icon icon="fas fa-star" size="sm" class="text-yellow-400" />
                    }
                  </div>
                  <img slot="avatar" [src]="testimonial.avatar" [alt]="testimonial.author" class="w-12 h-12 rounded-full object-cover">
                  <div slot="author" class="font-semibold text-gray-900 dark:text-white">{{ testimonial.author }}</div>
                  <div slot="title" class="text-sm text-gray-500 dark:text-gray-400">{{ testimonial.title }}</div>
                  <div slot="company" class="text-sm font-medium" [class]="testimonial.companyColor">{{ testimonial.company }}</div>
                </TestimonialBlock>
              }
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Implementation Guide -->
    <section class="py-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Implementation Guide</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Usage</h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;TestimonialBlock variant="default"&gt;
  &lt;blockquote slot="quote"&gt;Amazing!&lt;/blockquote&gt;
  &lt;img slot="avatar" src="..." alt="Author"&gt;
  &lt;div slot="author"&gt;John Doe&lt;/div&gt;
  &lt;div slot="title"&gt;CEO&lt;/div&gt;
&lt;/TestimonialBlock&gt;</code></pre>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Available Slots</h3>
              <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="quote"</code> - Testimonial text</li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="rating"</code> - Star rating</li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="avatar"</code> - Author photo</li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="author"</code> - Author name</li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="title"</code> - Job title</li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="company"</code> - Company name</li>
                <li><code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">slot="logo"</code> - Company logo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Documentation Link -->
    <section class="py-8 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Need more details? Check out the complete documentation with API reference and advanced examples.
        </p>
        <a 
          href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/blocks/testimonial.md"
          target="_blank"
          class="inline-flex items-center px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-medium"
        >
          <Icon icon="fas fa-book" size="sm" class="mr-2" />
          View Documentation
          <Icon icon="fas fa-external-link-alt" size="sm" class="ml-2" />
        </a>
      </div>
    </section>
  `,
})
export class TestimonialDemoComponent implements OnInit {
  private readonly seoService = inject(SEOService);

  // Featured testimonials data
  featuredTestimonials = signal([
    {
      id: 1,
      quote: "The component architecture is brilliant. We've reduced our development time by 50% while maintaining high quality standards.",
      author: "Jennifer Wu",
      title: "VP of Engineering",
      company: "CloudScale",
      companyColor: "text-blue-600 dark:text-blue-400",
      companyLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA4MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzNCODJGNiIvPgo8dGV4dCB4PSI0MCIgeT0iMTUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNsb3VkU2NhbGU8L3RleHQ+Cjwvc3ZnPgo=",
      badge: "Enterprise",
      badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      avatar: "https://picsum.photos/64/64?random=10"
    },
    {
      id: 2,
      quote: "Outstanding performance and accessibility features. Angular SuperUI sets the standard for what a component library should be.",
      author: "Marcus Johnson",
      title: "Senior Architect",
      company: "FinTech Pro",
      companyColor: "text-green-600 dark:text-green-400",
      companyLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA4MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzEwQjk4MSIvPgo8dGV4dCB4PSI0MCIgeT0iMTUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZpblRlY2ggUHJvPC90ZXh0Pgo8L3N2Zz4K",
      badge: "Featured",
      badgeColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      avatar: "https://picsum.photos/64/64?random=11"
    }
  ]);

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'Testimonial Block - Angular SuperUI',
      description: 'Showcase customer testimonials and reviews with beautiful layouts. Build trust and credibility with social proof that converts.',
      keywords: 'testimonial block, customer reviews, social proof, angular components, ui blocks'
    });
  }
}
