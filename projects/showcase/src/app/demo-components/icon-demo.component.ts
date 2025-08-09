import { Component, TemplateRef, ViewChild, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '@lib/components/icon';
import { SEOService } from '../services/seo.service';

// Example Angular component icon (inline) for demonstration
@Component({
  selector: 'demo-inline-check-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  `,
})
export class DemoInlineCheckIcon {}

// Additional inline icon component for richer examples
@Component({
  selector: 'demo-inline-heart-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  `,
})
export class DemoInlineHeartIcon {}

@Component({
  selector: 'app-icon-demo',
  standalone: true,
  imports: [CommonModule, Icon],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50 dark:border-indigo-800/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3h12a1 1 0 011 1v12l-4-2-4 2-4-2-4 2V4a1 1 0 011-1z"/></svg>
            Universal Icons
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            <span class="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Icon</span>
            Component
          </h1>
          <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Render icons from HTML/SVG, CSS classes, Angular components, templates, and Lucide data – with accessibility and security baked in.
          </p>
        </div>

        <div class="space-y-20">
          <!-- Variants & Sizes -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Sizes & Variants</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">Consistent sizing and color variants using CVA utilities.</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 justify-items-center">
              <div class="flex flex-col items-center gap-2" *ngFor="let s of sizes">
                <Icon [icon]="svgCheck" [size]="s" ariaLabel="Check icon" />
                <span class="text-xs text-gray-600 dark:text-gray-400">{{ s }}</span>
              </div>
            </div>

            <div class="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 justify-items-center">
              <div class="flex flex-col items-center gap-2" *ngFor="let v of variants">
                <Icon [icon]="'fas fa-star'" [variant]="v" size="lg" ariaLabel="Star icon" />
                <span class="text-xs text-gray-600 dark:text-gray-400">{{ v }}</span>
              </div>
            </div>
          </section>

          <!-- HTML/SVG string -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Inline HTML/SVG</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">Pass raw, sanitized SVG or HTML safely rendered with DomSanitizer.</p>
            <div class="flex flex-wrap items-center justify-center gap-8 p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50">
              <Icon [icon]="svgCheck" size="xl" ariaLabel="Check" />
              <Icon [icon]="svgHeart" variant="destructive" size="xl" ariaLabel="Heart" />
              <Icon [icon]="svgCircle" variant="info" size="xl" ariaLabel="Circle" />
            </div>
          </section>

          <!-- CSS class icons -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">CSS Class Icons</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">Use font icon libraries like Font Awesome or Material Icons.</p>
            <div class="flex flex-wrap items-center justify-center gap-8 p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50">
              <Icon icon="fa-solid fa-house" size="xl" ariaLabel="Home" />
              <Icon icon="fa-solid fa-bell" variant="warning" size="xl" ariaLabel="Bell" />
              <Icon icon="fa-regular fa-star" variant="info" size="xl" ariaLabel="Star" />
              <Icon icon="fa-brands fa-github" variant="muted" size="xl" ariaLabel="GitHub" />
            </div>
          </section>

          <!-- Angular component icon -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Angular Component</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">Render any standalone Angular component as an icon.</p>
            <div class="flex flex-wrap items-center justify-center gap-8 p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50">
              <Icon [icon]="inlineCheckComponent" size="xl" variant="success" ariaLabel="Inline Check" />
              <Icon [icon]="inlineHeartComponent" size="xl" variant="destructive" ariaLabel="Inline Heart" />
              <Icon [icon]="inlineCheckComponent" size="lg" variant="primary" ariaLabel="Inline Check Small" />
            </div>
          </section>

          <!-- TemplateRef icon -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">TemplateRef</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">Provide custom templates with arbitrary markup.</p>
            <div class="flex flex-wrap items-center justify-center gap-8 p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50">
              <ng-template #starTpl>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </ng-template>
              <ng-template #circleTpl>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>
              </ng-template>
              <ng-template #boltTpl>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </ng-template>

              <Icon [icon]="starTemplate" size="xl" variant="warning" ariaLabel="Star" />
              <Icon [icon]="circleTemplate" size="xl" variant="info" ariaLabel="Circle" />
              <Icon [icon]="boltTemplate" size="xl" variant="success" ariaLabel="Bolt" />
            </div>
          </section>

          <!-- Lucide icon data -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Lucide Data</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">Pass LucideIconData arrays directly.</p>
            <div class="flex flex-wrap items-center justify-center gap-8 p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50">
              <Icon [icon]="lucideCheck" size="xl" variant="success" ariaLabel="Lucide check" />
              <Icon [icon]="lucideHeart" size="xl" variant="destructive" ariaLabel="Lucide heart" />
              <Icon [icon]="lucideBolt" size="xl" variant="warning" ariaLabel="Lucide bolt" />
            </div>
          </section>

       

          <!-- Interactive icons -->
          <section class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Interactive</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">Keyboard accessible icons with hover/focus styles.</p>
            <div class="flex flex-wrap items-center justify-center gap-8 p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border">
              <Icon [icon]="svgHeart" size="xl" variant="primary" [interactive]="true" ariaLabel="Like" />
              <Icon [icon]="inlineCheckComponent" size="xl" variant="secondary" [interactive]="true" ariaLabel="Confirm" />
            </div>
          </section>


             <!-- Docs link -->
          <section class="text-center">
            <div class="mt-16">
              <a
                class="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/icon.md"
                target="_blank" rel="noopener noreferrer"
              >
                View Icon Documentation
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
})
export class IconDemoComponent {
  private readonly seo = inject(SEOService);

  // Example SVG strings
  svgCheck = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
  svgHeart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.61C12.09 5.01 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
  svgCircle = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>`;

  // Angular component icon references
  inlineCheckComponent = DemoInlineCheckIcon;
  inlineHeartComponent = DemoInlineHeartIcon;

  // TemplateRef example
  @ViewChild('starTpl', { static: true }) starTemplate!: TemplateRef<any>;
  @ViewChild('circleTpl', { static: true }) circleTemplate!: TemplateRef<any>;
  @ViewChild('boltTpl', { static: true }) boltTemplate!: TemplateRef<any>;

  // LucideIconData examples (minimal arrays: [tag, attrs])
  lucideCheck: import('lucide-angular').LucideIconData = [
    ['polyline', { points: '20 6 9 17 4 12' }],
  ];
  lucideHeart: import('lucide-angular').LucideIconData = [
    ['path', { d: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z' }],
  ];
  lucideBolt: import('lucide-angular').LucideIconData = [
    ['path', { d: 'M13 10V3L4 14h7v7l9-11h-7z' }],
  ];

  sizes: Array<'xs'|'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'> = ['xs','sm','md','lg','xl','2xl','3xl'];
  variants: Array<'default'|'primary'|'secondary'|'muted'|'destructive'|'success'|'warning'|'info'> = ['default','primary','secondary','muted','destructive','success','warning','info'];

  constructor() {
    this.seo.updateSEO({
      title: 'Icon Component - Angular SuperUI | Universal Icon Rendering',
      description: 'Showcase of the Icon component rendering SVG, class icons, Angular components, templates, and Lucide data with accessibility and security.',
      keywords: 'Angular icon component, SVG icons, Font Awesome, Lucide Angular, TemplateRef icon, accessible icons, sanitized SVG',
      url: 'https://angular-superui.vercel.app/components/icon',
      type: 'article'
    });
    this.seo.addComponentStructuredData('icon');
  }
}
