import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Spinner, SpinnerType} from '@lib/spinner';
import {Button} from '@lib/button';

@Component({
  selector: 'app-spinner-demo',
  standalone: true,
  imports: [CommonModule, Spinner, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .hero-gradient {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .grid-pattern {
      background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0);
      background-size: 20px 20px;
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .dark .glass-card {
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    .animation-delay-2000 {
      animation-delay: 2s;
    }

    .animation-delay-4000 {
      animation-delay: 4s;
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    @keyframes slide-in-up {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-slide-in-up {
      animation: slide-in-up 0.6s ease-out forwards;
    }

    .animation-delay-200 {
      animation-delay: 200ms;
      opacity: 0;
    }

    .animation-delay-400 {
      animation-delay: 400ms;
      opacity: 0;
    }

    .animation-delay-600 {
      animation-delay: 600ms;
      opacity: 0;
    }
  `],
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">

      <!-- Hero Section -->
      <section class="relative overflow-hidden">
        <!-- Background Elements -->
        <div class="absolute inset-0 hero-gradient opacity-90"></div>
        <div class="absolute inset-0 grid-pattern"></div>

        <!-- Floating Shapes -->
        <div class="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div
          class="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-float animation-delay-2000"></div>
        <div
          class="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float animation-delay-4000"></div>

        <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div class="text-center">
            <div class="mx-auto max-w-4xl">
              <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl animate-slide-in-up">
                Spinner Component
                <span class="block text-blue-200 animate-slide-in-up animation-delay-200">Perfect Loading States</span>
              </h1>
              <p
                class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100 sm:text-xl animate-slide-in-up animation-delay-400">
                Beautiful, accessible, and highly customizable loading indicators.
                Multiple animation types with smooth performance and full accessibility compliance.
              </p>

              <!-- Hero Spinner Demo -->
              <div class="mx-auto mt-10 max-w-4xl animate-slide-in-up animation-delay-600">
                <div class="glass-card rounded-2xl p-8 shadow-2xl">
                  <div class="space-y-8">
                    <!-- Classic Animations -->
                    <div>
                      <h3 class="text-lg font-semibold text-white mb-4">Classic Animations</h3>
                      <div class="grid grid-cols-2 md:grid-cols-6 gap-6">
                        <div class="flex flex-col items-center space-y-2">
                          <Spinner size="lg" variant="primary" type="spinner"
                                   [forceReducedMotion]="respectReducedMotion()"></Spinner>
                          <span class="text-xs text-white/80">Classic</span>
                        </div>
                        <div class="flex flex-col items-center space-y-2">
                          <Spinner size="lg" variant="success" type="dots"
                                   [forceReducedMotion]="respectReducedMotion()"></Spinner>
                          <span class="text-xs text-white/80">Dots</span>
                        </div>
                        <div class="flex flex-col items-center space-y-2">
                          <Spinner size="lg" variant="warning" type="pulse"
                                   [forceReducedMotion]="respectReducedMotion()"></Spinner>
                          <span class="text-xs text-white/80">Pulse</span>
                        </div>
                        <div class="flex flex-col items-center space-y-2">
                          <Spinner size="lg" variant="pink" type="bounce"
                                   [forceReducedMotion]="respectReducedMotion()"></Spinner>
                          <span class="text-xs text-white/80">Bounce</span>
                        </div>
                        <div class="flex flex-col items-center space-y-2">
                          <Spinner size="lg" variant="purple" type="bars"
                                   [forceReducedMotion]="respectReducedMotion()"></Spinner>
                          <span class="text-xs text-white/80">Bars</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Features Grid -->
              <div class="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div class="flex flex-col items-center space-y-2 text-center">
                  <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <h3 class="text-sm font-medium text-white">Lightning Fast</h3>
                  <p class="text-xs text-blue-100">Optimized animations</p>
                </div>
                <div class="flex flex-col items-center space-y-2 text-center">
                  <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 class="text-sm font-medium text-white">Accessible</h3>
                  <p class="text-xs text-blue-100">WCAG compliant</p>
                </div>
                <div class="flex flex-col items-center space-y-2 text-center">
                  <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"/>
                    </svg>
                  </div>
                  <h3 class="text-sm font-medium text-white">Customizable</h3>
                  <p class="text-xs text-blue-100">Multiple variants</p>
                </div>
                <div class="flex flex-col items-center space-y-2 text-center">
                  <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <h3 class="text-sm font-medium text-white">Responsive</h3>
                  <p class="text-xs text-blue-100">All devices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <main class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <!-- Interactive Demo Section -->
        <section class="mb-20">
          <div class="mb-12 text-center">
            <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Interactive Playground
            </h2>
            <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Experiment with different configurations and see the spinner in action
            </p>
          </div>

          <div class="rounded-xl border bg-card p-6 shadow-sm lg:p-8">
            <div class="space-y-8">
              <!-- Controls -->
              <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-card-foreground">Size</label>
                  <div class="grid grid-cols-2 gap-2">
                    @for (size of sizeOptions; track size) {
                      <Button
                        (click)="selectedSize.set(size)"
                        [variant]="getSizeButtonVariant()(size)"
                        size="sm"
                        class="text-xs"
                      >
                        {{ size }}
                      </Button>
                    }
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-card-foreground">Variant</label>
                  <div class="grid grid-cols-2 gap-2">
                    @for (variant of variantOptions; track variant) {
                      <Button
                        (click)="selectedVariant.set(variant)"
                        [variant]="getVariantButtonVariant()(variant)"
                        size="sm"
                        class="text-xs"
                      >
                        {{ variant }}
                      </Button>
                    }
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-card-foreground">Animation Type</label>
                  <div class="grid grid-cols-1 gap-1 max-h-48 overflow-y-auto">
                    @for (type of typeOptions; track type) {
                      <Button
                        (click)="selectedType.set(type)"
                        [variant]="getTypeButtonVariant()(type)"
                        size="sm"
                        class="text-xs"
                      >
                        {{ type }}
                      </Button>
                    }
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-card-foreground">Options</label>
                  <div class="space-y-2">
                    <Button
                      (click)="toggleText()"
                      [variant]="showInteractiveText() ? 'default' : 'outline'"
                      size="sm"
                      class="w-full text-xs"
                    >
                      {{ showInteractiveText() ? 'Hide' : 'Show' }} Text
                    </Button>
                    <Button
                      (click)="toggleAnimation()"
                      [variant]="showInteractiveAnimation() ? 'default' : 'outline'"
                      size="sm"
                      class="w-full text-xs"
                    >
                      {{ showInteractiveAnimation() ? 'Hide' : 'Show' }} Animation
                    </Button>
                    <Button
                      (click)="toggleReducedMotion()"
                      [variant]="respectReducedMotion() ? 'default' : 'outline'"
                      size="sm"
                      class="w-full text-xs"
                    >
                      {{ respectReducedMotion() ? 'Disable' : 'Enable' }} Reduced Motion
                    </Button>
                  </div>
                </div>
              </div>

              <!-- Live Preview -->
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-card-foreground">Live Preview</h3>
                <div
                  class="flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 py-12">
                  <Spinner
                    [size]="selectedSize()"
                    [variant]="selectedVariant()"
                    [type]="selectedType()"
                    [showAnimation]="showInteractiveAnimation()"
                    [showText]="showInteractiveText()"
                    [loadingText]="interactiveText()"
                    [forceReducedMotion]="respectReducedMotion()"
                  ></Spinner>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- Call to Action -->
        <section
          class="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-16 text-center text-white lg:px-8">
          <div class="mx-auto max-w-2xl">
            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to enhance your loading states?
            </h2>
            <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Install our Spinner component today and create beautiful loading experiences for your users.
            </p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/spinner.md"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              >
                <svg class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                View Documentation
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  `
})
export class SpinnerDemoComponent {
  // Interactive controls
  readonly selectedSize = signal<'xs' | 'sm' | 'default' | 'lg' | 'xl' | '2xl' | '3xl'>('default');
  readonly selectedVariant = signal<'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'purple' | 'pink' | 'orange' | 'teal' | 'gradient'>('primary');
  readonly selectedType = signal<SpinnerType>('spinner');
  readonly showInteractiveText = signal(false);
  readonly showInteractiveAnimation = signal(true);
  readonly respectReducedMotion = signal(false);

  // Loading states for buttons
  readonly loadingStates = signal({
    save: false,
    upload: false,
    delete: false,
    process: false
  });

  // Full page loading demo
  readonly isFullPageLoading = signal(false);

  // Options for controls
  readonly sizeOptions = ['xs', 'sm', 'default', 'lg', 'xl', '2xl', '3xl'] as const;
  readonly variantOptions = ['default', 'primary', 'secondary', 'success', 'warning', 'destructive', 'info', 'purple', 'pink', 'orange', 'teal', 'gradient'] as const;
  readonly typeOptions: SpinnerType[] = [
    'spinner',
    'dots',
    'pulse',
    'bounce',
    'bars'
  ] as const;

  // Computed properties
  readonly interactiveText = computed(() => {
    const typeTexts: Record<SpinnerType, string> = {
      spinner: 'Loading...',
      dots: 'Processing...',
      pulse: 'Initializing...',
      bounce: 'Working...',
      bars: 'Computing...'
    } as const;
    return typeTexts[this.selectedType()] || 'Loading...';
  });

  readonly profileAccessibility = computed(() => ({
    'aria-label': 'Loading user profile',
    'aria-describedby': 'profile-loading-desc',
    'aria-live': 'polite' as const,
    'role': 'status'
  }));

  readonly dataAccessibility = computed(() => ({
    'aria-label': 'Loading data',
    'aria-describedby': 'data-loading-desc',
    'aria-live': 'polite' as const,
    'role': 'status'
  }));
  // Button variant helper computed signals to fix reactivity issues
  readonly getSizeButtonVariant = computed(() => (size: string) => {
    return this.selectedSize() === size ? 'default' : 'outline';
  });
  readonly getVariantButtonVariant = computed(() => (variant: string) => {
    return this.selectedVariant() === variant ? 'default' : 'outline';
  });
  readonly getTypeButtonVariant = computed(() => (type: SpinnerType) => {
    return this.selectedType() === type ? 'default' : 'outline';
  });

  // Methods
  toggleText(): void {
    this.showInteractiveText.set(!this.showInteractiveText());
  }

  toggleAnimation(): void {
    this.showInteractiveAnimation.set(!this.showInteractiveAnimation());
  }

  toggleReducedMotion(): void {
    this.respectReducedMotion.set(!this.respectReducedMotion());
  }

  handleButtonClick(buttonType: 'save' | 'upload' | 'delete' | 'process'): void {
    this.loadingStates.update(states => ({
      ...states,
      [buttonType]: true
    }));

    setTimeout(() => {
      this.loadingStates.update(states => ({
        ...states,
        [buttonType]: false
      }));
    }, 2000);
  }

  showFullPageLoading(): void {
    this.isFullPageLoading.set(true);

    setTimeout(() => {
      this.isFullPageLoading.set(false);
    }, 3000);
  }

  getMotionPreference(): string {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return prefersReducedMotion ? 'Reduce motion' : 'No preference';
  }
}
