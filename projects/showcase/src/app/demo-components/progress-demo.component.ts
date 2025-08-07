import { Component, signal, computed, OnInit, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent, createProgressAccessibility, formatProgressText } from '@lib/components/progress';
import { Button } from '@lib/components/button';
import { Badge } from '@lib/components/badge';

@Component({
  selector: 'app-progress-demo',
  standalone: true,
  imports: [CommonModule, ProgressComponent, Button, Badge],
  template: `
    <!-- SEO Meta Information -->
    <div class="sr-only">
      <h1>Angular Progress Component - Advanced Progress Bars</h1>
      <p>Discover our highly customizable Angular progress bar component with animations, accessibility features, and multiple variants. Perfect for modern web applications.</p>
    </div>

    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20 border-b">
      <div class="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" aria-hidden="true"></div>
      <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div class="text-center">
          <div class="mx-auto max-w-4xl">
            <h1 class="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Progress Component
              <span class="block text-primary">Built for Perfection</span>
            </h1>
            <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              A highly customizable, accessible, and beautifully animated progress bar component.
              Built with modern Angular signals, Tailwind CSS, and designed for enterprise applications.
            </p>

            <!-- Hero Progress Demo -->
            <div class="mx-auto mt-10 max-w-2xl">
              <div class="space-y-6">
                <div class="space-y-3">
                  <ProgressComponent
                    [value]="heroProgress()"
                    [max]="100"
                    variant="gradient"
                    size="lg"
                    [showText]="true"
                    [glow]="true"
                    animated="shimmer"
                    className="shadow-lg"
                  ></ProgressComponent>
                  <p class="text-sm text-muted-foreground">
                    Interactive demo • {{ heroProgress() }}% complete
                  </p>
                </div>

                <div class="flex flex-wrap justify-center gap-3">
                  <Button (click)="setHeroProgress(25)" variant="outline" size="sm">25%</Button>
                  <Button (click)="setHeroProgress(50)" variant="outline" size="sm">50%</Button>
                  <Button (click)="setHeroProgress(75)" variant="outline" size="sm">75%</Button>
                  <Button (click)="setHeroProgress(100)" size="sm">100%</Button>
                </div>
              </div>
            </div>

         <!-- Features Grid -->
            <div class="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div class="flex flex-col items-center space-y-2 text-center">
                <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 class="text-sm font-medium text-foreground">Lightning Fast</h3>
                <p class="text-xs text-muted-foreground">Optimized performance</p>
              </div>
              <div class="flex flex-col items-center space-y-2 text-center">
                <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-sm font-medium text-foreground">Accessible</h3>
                <p class="text-xs text-muted-foreground">WCAG compliant</p>
              </div>
              <div class="flex flex-col items-center space-y-2 text-center">
                <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <svg class="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 class="text-sm font-medium text-foreground">Customizable</h3>
                <p class="text-xs text-muted-foreground">Endless variants</p>
              </div>
              <div class="flex flex-col items-center space-y-2 text-center">
                <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <svg class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 class="text-sm font-medium text-foreground">Responsive</h3>
                <p class="text-xs text-muted-foreground">All devices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

      <!-- Basic Examples Section -->
      <section class="mb-20">
        <div class="mb-12 text-center">
          <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Getting Started
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Simple and elegant progress bars that work out of the box
          </p>
        </div>

        <div class="grid gap-8 lg:grid-cols-2">
          <div class="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
            <div class="space-y-3">
              <h3 class="text-lg font-semibold text-card-foreground">Basic Progress</h3>
              <p class="text-sm text-muted-foreground">Simple progress indicator with text</p>
              <ProgressComponent
                [value]="basicProgress()"
                [max]="100"
                [showText]="true"
                size="default"
              ></ProgressComponent>
            </div>
          </div>

          <div class="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
            <div class="space-y-3">
              <h3 class="text-lg font-semibold text-card-foreground">Custom Text</h3>
              <p class="text-sm text-muted-foreground">Progress with custom formatting</p>
              <ProgressComponent
                [value]="basicProgress()"
                [max]="100"
                [showText]="true"
                [customText]="'Processing: ' + basicProgress() + ' files'"
              ></ProgressComponent>
            </div>
          </div>
        </div>
      </section>

      <!-- Color Variants Section -->
      <section class="mb-20">
        <div class="mb-12 text-center">
          <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Color Variants
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Multiple color schemes to match your application's design system
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div class="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
            <Badge variant="outline">Default</Badge>
            <div class="mt-3">
              <ProgressComponent [value]="75" variant="default" [showText]="true"></ProgressComponent>
            </div>
          </div>

          <div class="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
            <Badge variant="default">Primary</Badge>
            <div class="mt-3">
              <ProgressComponent [value]="65" variant="primary" [showText]="true"></ProgressComponent>
            </div>
          </div>

          <div class="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
            <Badge variant="secondary">Success</Badge>
            <div class="mt-3">
              <ProgressComponent [value]="85" variant="success" [showText]="true"></ProgressComponent>
            </div>
          </div>

          <div class="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
            <Badge variant="outline">Warning</Badge>
            <div class="mt-3">
              <ProgressComponent [value]="45" variant="warning" [showText]="true"></ProgressComponent>
            </div>
          </div>

          <div class="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
            <Badge variant="destructive">Destructive</Badge>
            <div class="mt-3">
              <ProgressComponent [value]="25" variant="destructive" [showText]="true"></ProgressComponent>
            </div>
          </div>

          <div class="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
            <Badge>Info</Badge>
            <div class="mt-3">
              <ProgressComponent [value]="60" variant="info" [showText]="true"></ProgressComponent>
            </div>
          </div>
        </div>
      </section>

      <!-- Gradient Variants Section -->
      <section class="mb-20">
        <div class="mb-12 text-center">
          <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Gradient Magic
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Beautiful gradient progress bars that catch the eye
          </p>
        </div>

        <div class="grid gap-8 sm:grid-cols-2">
          <div class="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-card-foreground">Primary Gradient</h3>
                <Badge variant="outline">Glow Effect</Badge>
              </div>
              <ProgressComponent
                [value]="70"
                variant="gradient"
                [showText]="true"
                [glow]="true"
                size="lg"
              ></ProgressComponent>
            </div>
          </div>

          <div class="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-card-foreground">Success Gradient</h3>
                <Badge>Animated</Badge>
              </div>
              <ProgressComponent
                [value]="85"
                variant="gradient-success"
                [showText]="true"
                animated="shimmer"
                size="lg"
              ></ProgressComponent>
            </div>
          </div>

          <div class="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-card-foreground">Warning Gradient</h3>
                <Badge variant="outline">Striped</Badge>
              </div>
              <ProgressComponent
                [value]="55"
                variant="gradient-warning"
                [showText]="true"
                [striped]="true"
                size="lg"
              ></ProgressComponent>
            </div>
          </div>

          <div class="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-card-foreground">Danger Gradient</h3>
                <Badge variant="destructive">Pulse</Badge>
              </div>
              <ProgressComponent
                [value]="30"
                variant="gradient-danger"
                [showText]="true"
                animated="pulse"
                size="lg"
              ></ProgressComponent>
            </div>
          </div>
        </div>
      </section>

      <!-- Size Variations Section -->
      <section class="mb-20">
        <div class="mb-12 text-center">
          <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Size Flexibility
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            From subtle indicators to prominent progress displays
          </p>
        </div>

        <div class="space-y-8 rounded-xl border bg-card p-6 shadow-sm lg:p-8">
          <div class="grid gap-6">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-card-foreground">Extra Small (xs)</h3>
                <span class="text-xs text-muted-foreground">Subtle indicator</span>
              </div>
              <ProgressComponent [value]="60" size="xs" variant="primary"></ProgressComponent>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-card-foreground">Small (sm)</h3>
                <span class="text-xs text-muted-foreground">Compact design</span>
              </div>
              <ProgressComponent [value]="70" size="sm" variant="primary"></ProgressComponent>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-card-foreground">Default</h3>
                <span class="text-xs text-muted-foreground">Standard size</span>
              </div>
              <ProgressComponent [value]="80" size="default" variant="primary" [showText]="true"></ProgressComponent>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-card-foreground">Large (lg)</h3>
                <span class="text-xs text-muted-foreground">Prominent display</span>
              </div>
              <ProgressComponent [value]="90" size="lg" variant="primary" [showText]="true"></ProgressComponent>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-card-foreground">Extra Large (xl)</h3>
                <span class="text-xs text-muted-foreground">Inside text support</span>
              </div>
              <ProgressComponent
                [value]="95"
                size="xl"
                variant="gradient"
                [showText]="true"
                textPosition="inside"
              ></ProgressComponent>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-card-foreground">2X Large (2xl)</h3>
                <span class="text-xs text-muted-foreground">Maximum impact</span>
              </div>
              <ProgressComponent
                [value]="100"
                size="2xl"
                variant="gradient-success"
                [showText]="true"
                textPosition="inside"
                [glow]="true"
              ></ProgressComponent>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Demo Section -->
      <section class="mb-20">
        <div class="mb-12 text-center">
          <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Interactive Playground
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Try different configurations and see the progress component in action
          </p>
        </div>

        <div class="rounded-xl border bg-card p-6 shadow-sm lg:p-8">
          <div class="space-y-8">
            <!-- Controls -->
            <div class="flex flex-wrap gap-4 justify-center">
              <Button
                (click)="decreaseProgress()"
                [disabled]="interactiveProgress() <= 0"
                variant="outline"
                size="sm"
              >
                <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
                Decrease
              </Button>
              <Button
                (click)="increaseProgress()"
                [disabled]="interactiveProgress() >= 100"
                size="sm"
              >
                <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Increase
              </Button>
              <Button (click)="resetProgress()" variant="outline" size="sm">
                <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </Button>
              <Button
                (click)="toggleAnimation()"
                [variant]="isAnimating() ? 'default' : 'outline'"
                size="sm"
              >
                <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ isAnimating() ? 'Stop' : 'Animate' }}
              </Button>
            </div>

            <!-- Interactive Progress -->
            <div class="space-y-4">
              <ProgressComponent
                [value]="interactiveProgress()"
                [max]="100"
                variant="gradient"
                [showText]="true"
                [showAdditionalInfo]="true"
                [additionalInfoLeft]="progressStatus()"
                [additionalInfoRight]="estimatedTime()"
                size="xl"
                [glow]="true"
                [animated]="isAnimating() ? 'shimmer' : false"
                textPosition="overlay"
              ></ProgressComponent>

              <div class="text-center">
                <Badge [variant]="progressBadgeVariant()">
                  {{ progressState() }}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Real-world Examples Section -->
      <section class="mb-20">
        <div class="mb-12 text-center">
          <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Real-world Applications
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            See how the progress component works in practical scenarios
          </p>
        </div>

        <div class="grid gap-8 lg:grid-cols-2">
          <!-- File Upload Simulation -->
          <div class="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
            <div class="space-y-3">
              <h3 class="text-xl font-semibold text-card-foreground">File Upload</h3>
              <p class="text-sm text-muted-foreground">Simulated file upload with dynamic progress</p>

              <div class="flex gap-3">
                <Button
                  (click)="startUpload()"
                  [disabled]="isUploading() || uploadProgress() > 0"
                  size="sm"
                >
                  Start Upload
                </Button>
                <Button
                  (click)="pauseUpload()"
                  [disabled]="!isUploading() || uploadPaused() || uploadProgress() >= 100"
                  variant="outline"
                  size="sm"
                >
                  Pause
                </Button>
                <Button
                  (click)="cancelUpload()"
                  [disabled]="!isUploading() && uploadProgress() === 0"
                  variant="destructive"
                  size="sm"
                >
                  Cancel
                </Button>
              </div>

              <ProgressComponent
                [value]="uploadProgress()"
                [max]="100"
                [variant]="uploadVariant()"
                [showText]="true"
                [textFormat]="uploadTextFormatter"
                [showAdditionalInfo]="true"
                [additionalInfoLeft]="uploadSpeed()"
                [additionalInfoRight]="uploadTimeRemaining()"
                size="lg"
                [animated]="isUploading() && !uploadPaused() ? 'shimmer' : false"
              ></ProgressComponent>

              @if (uploadStatus()) {
                <div class="text-center">
                  <Badge [variant]="uploadBadgeVariant()">
                    {{ uploadStatus() }}
                  </Badge>
                </div>
              }
            </div>
          </div>

          <!-- System Loading -->
          <div class="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
            <div class="space-y-3">
              <h3 class="text-xl font-semibold text-card-foreground">System Initialization</h3>
              <p class="text-sm text-muted-foreground">Multi-step loading process</p>

              <Button
                (click)="startSystemInit()"
                [disabled]="isInitializing() || overallProgress() > 0"
                size="sm"
              >
                Initialize System
              </Button>

              <div class="space-y-3">
                @for (step of initSteps(); track step.id) {
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                      <span [class]="step.completed ? 'text-green-600' : step.active ? 'text-primary' : 'text-muted-foreground'">
                        {{ step.name }}
                      </span>
                      @if (step.completed) {
                        <svg class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      }
                    </div>
                    <ProgressComponent
                      [value]="step.progress"
                      [max]="100"
                      [variant]="step.completed ? 'success' : step.active ? 'primary' : 'default'"
                      size="sm"
                      [animated]="step.active ? 'shimmer' : false"
                    ></ProgressComponent>
                  </div>
                }
              </div>

              <ProgressComponent
                [value]="overallProgress()"
                [max]="100"
                variant="gradient-success"
                [showText]="true"
                size="lg"
                [customText]="'Overall Progress: ' + Math.round(overallProgress()) + '%'"
              ></ProgressComponent>
            </div>
          </div>
        </div>
      </section>

      <!-- Special Features Section -->
      <section class="mb-20">
        <div class="mb-12 text-center">
          <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Advanced Features
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Explore the advanced capabilities that set our component apart
          </p>
        </div>

        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div class="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
            <Badge>Indeterminate</Badge>
            <h3 class="text-lg font-semibold text-card-foreground">Loading State</h3>
            <p class="text-sm text-muted-foreground">Angular animations for smooth motion</p>
            <div class="mt-3">
              <ProgressComponent
                [indeterminate]="true"
                variant="primary"
                [showText]="true"
                size="lg"
              ></ProgressComponent>
            </div>
          </div>

          <div class="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
            <Badge variant="outline">Reversed</Badge>
            <h3 class="text-lg font-semibold text-card-foreground">Right-to-Left</h3>
            <p class="text-sm text-muted-foreground">Reversed progress direction</p>
            <div class="mt-3">
              <ProgressComponent
                [value]="60"
                variant="warning"
                [reversed]="true"
                [showText]="true"
                size="lg"
              ></ProgressComponent>
            </div>
          </div>

          <div class="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
            <Badge variant="secondary">Custom Range</Badge>
            <h3 class="text-lg font-semibold text-card-foreground">Min/Max Values</h3>
            <p class="text-sm text-muted-foreground">Custom value ranges (20-80)</p>
            <div class="mt-3">
              <ProgressComponent
                [value]="50"
                [min]="20"
                [max]="80"
                variant="info"
                [showText]="true"
                size="lg"
              ></ProgressComponent>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Documentation Section -->
    <section class="border-t bg-muted/50">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-foreground">
            Ready to Get Started?
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Explore our comprehensive documentation and start building amazing progress experiences.
          </p>
          <div class="mt-8 flex justify-center">
            <a
              href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/progress.md"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              <svg class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              View Documentation
              <svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Accessibility: Live region for announcements -->
    <div class="sr-only" aria-live="polite" aria-atomic="true"></div>
  `
})
export class ProgressDemoComponent implements OnInit, OnDestroy {
  // Math reference for template
  readonly Math = Math;

  // Hero progress
  readonly heroProgress = signal(67);

  // Basic progress
  readonly basicProgress = signal(73);

  // Interactive progress
  readonly interactiveProgress = signal(45);
  readonly isAnimating = signal(false);

  // Upload simulation
  readonly uploadProgress = signal(0);
  readonly isUploading = signal(false);
  readonly uploadPaused = signal(false);
  readonly uploadSpeed = signal('');
  readonly uploadTimeRemaining = signal('');
  readonly uploadStatus = signal('');

  // System initialization
  readonly initSteps = signal([
    { id: 1, name: 'Loading configuration', progress: 0, active: false, completed: false },
    { id: 2, name: 'Connecting to database', progress: 0, active: false, completed: false },
    { id: 3, name: 'Initializing services', progress: 0, active: false, completed: false },
    { id: 4, name: 'Loading user preferences', progress: 0, active: false, completed: false },
    { id: 5, name: 'Finalizing setup', progress: 0, active: false, completed: false },
  ]);
  readonly isInitializing = signal(false);

  // Animation intervals
  private animationInterval?: number;
  private uploadInterval?: number;
  private initInterval?: number;

  constructor() {
    // No initialization needed - everything is handled by signals
  }

  // Computed properties
  readonly progressStatus = computed(() => {
    const progress = this.interactiveProgress();
    if (progress === 0) return 'Not started';
    if (progress === 100) return 'Completed';
    if (progress < 25) return 'Just started';
    if (progress < 75) return 'In progress';
    return 'Almost done';
  });

  readonly estimatedTime = computed(() => {
    const remaining = 100 - this.interactiveProgress();
    const minutes = Math.ceil(remaining / 10);
    return remaining === 0 ? 'Complete' : `${minutes} min remaining`;
  });

  readonly progressState = computed(() => {
    const progress = this.interactiveProgress();
    if (progress === 100) return 'Complete';
    if (progress >= 75) return 'Almost there';
    if (progress >= 50) return 'Half way';
    if (progress >= 25) return 'Getting started';
    return progress === 0 ? 'Ready to begin' : 'In progress';
  });

  readonly progressBadgeVariant = computed(() => {
    const progress = this.interactiveProgress();
    if (progress === 100) return 'default';
    if (progress >= 75) return 'secondary';
    if (progress >= 50) return 'outline';
    return 'outline';
  });

  readonly uploadVariant = computed(() => {
    const progress = this.uploadProgress();
    if (progress === 100) return 'success';
    if (this.uploadPaused()) return 'warning';
    if (!this.isUploading()) return 'default';
    return 'primary';
  });

  readonly uploadBadgeVariant = computed(() => {
    const variant = this.uploadVariant();
    switch (variant) {
      case 'success': return 'default';
      case 'warning': return 'outline';
      case 'primary': return 'secondary';
      default: return 'outline';
    }
  });

  readonly overallProgress = computed(() => {
    const steps = this.initSteps();
    const totalSteps = steps.length;
    const completedSteps = steps.filter(step => step.completed).length;
    const activeStep = steps.find(step => step.active);

    if (activeStep) {
      return ((completedSteps * 100) + activeStep.progress) / totalSteps;
    }

    return (completedSteps / totalSteps) * 100;
  });

  // Text formatters
  readonly uploadTextFormatter = (value: number, max: number): string => {
    const percentage = Math.round((value / max) * 100);
    if (percentage === 100) return 'Upload Complete!';
    if (this.uploadPaused()) return `Paused at ${percentage}%`;
    const mbUploaded = Math.round((value / max) * 150); // Simulate 150MB file
    return `${mbUploaded} MB / 150 MB (${percentage}%)`;
  };

  ngOnInit(): void {
    // Auto-animate hero progress
    this.startHeroAnimation();
  }

  ngOnDestroy(): void {
    this.clearAllIntervals();
  }

  // Hero methods
  setHeroProgress(value: number): void {
    this.heroProgress.set(value);
  }

  private startHeroAnimation(): void {
    let direction = 1;
    setInterval(() => {
      this.heroProgress.update(val => {
        const newVal = val + (direction * 2);
        if (newVal >= 100) {
          direction = -1;
          return 100;
        }
        if (newVal <= 20) {
          direction = 1;
          return 20;
        }
        return newVal;
      });
    }, 150);
  }

  // Interactive progress methods
  increaseProgress(): void {
    this.interactiveProgress.update(val => Math.min(val + 10, 100));
  }

  decreaseProgress(): void {
    this.interactiveProgress.update(val => Math.max(val - 10, 0));
  }

  resetProgress(): void {
    this.interactiveProgress.set(0);
  }

  toggleAnimation(): void {
    if (this.isAnimating()) {
      this.stopAnimation();
    } else {
      this.startAnimation();
    }
  }

  private startAnimation(): void {
    this.isAnimating.set(true);
    this.animationInterval = window.setInterval(() => {
      if (this.interactiveProgress() >= 100) {
        this.interactiveProgress.set(0);
      } else {
        this.interactiveProgress.update(val => val + 2);
      }
    }, 200);
  }

  private stopAnimation(): void {
    this.isAnimating.set(false);
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = undefined;
    }
  }

  // Upload simulation methods
  startUpload(): void {
    this.isUploading.set(true);
    this.uploadPaused.set(false);
    this.uploadProgress.set(0);
    this.uploadStatus.set('Starting upload...');

    this.uploadInterval = window.setInterval(() => {
      if (!this.uploadPaused()) {
        const current = this.uploadProgress();
        if (current >= 100) {
          this.completeUpload();
        } else {
          const increment = Math.random() * 3 + 1;
          const newProgress = Math.min(current + increment, 100);
          this.uploadProgress.set(newProgress);

          const speed = (Math.random() * 5 + 2).toFixed(1);
          this.uploadSpeed.set(`${speed} MB/s`);

          const remaining = Math.ceil((100 - newProgress) / 2);
          this.uploadTimeRemaining.set(`${remaining}s remaining`);

          this.uploadStatus.set(`Uploading... ${Math.round(newProgress)}%`);
        }
      }
    }, 300);
  }

  pauseUpload(): void {
    this.uploadPaused.set(true);
    this.uploadStatus.set('Upload paused');
    this.uploadSpeed.set('');
    this.uploadTimeRemaining.set('Paused');
  }

  cancelUpload(): void {
    this.isUploading.set(false);
    this.uploadPaused.set(false);
    this.uploadProgress.set(0);
    this.uploadStatus.set('Upload cancelled');
    this.uploadSpeed.set('');
    this.uploadTimeRemaining.set('');
    this.clearUploadInterval();
  }

  private completeUpload(): void {
    this.isUploading.set(false);
    this.uploadPaused.set(false);
    this.uploadProgress.set(100);
    this.uploadStatus.set('Upload completed successfully!');
    this.uploadSpeed.set('');
    this.uploadTimeRemaining.set('Complete');
    this.clearUploadInterval();

    // Reset after 3 seconds to allow new upload
    setTimeout(() => {
      this.resetUpload();
    }, 3000);
  }

  private resetUpload(): void {
    this.uploadProgress.set(0);
    this.uploadStatus.set('');
    this.uploadSpeed.set('');
    this.uploadTimeRemaining.set('');
  }

  // System initialization methods
  startSystemInit(): void {
    this.isInitializing.set(true);
    const steps = this.initSteps();

    // Reset all steps
    steps.forEach(step => {
      step.progress = 0;
      step.active = false;
      step.completed = false;
    });
    this.initSteps.set([...steps]);

    this.processNextStep(0);
  }

  private processNextStep(stepIndex: number): void {
    const steps = this.initSteps();
    if (stepIndex >= steps.length) {
      this.isInitializing.set(false);

      // Reset after 3 seconds to allow new initialization
      setTimeout(() => {
        this.resetSystemInit();
      }, 3000);
      return;
    }

    const currentStep = steps[stepIndex];
    currentStep.active = true;
    this.initSteps.set([...steps]);

    this.initInterval = window.setInterval(() => {
      if (currentStep.progress >= 100) {
        currentStep.progress = 100;
        currentStep.active = false;
        currentStep.completed = true;
        this.initSteps.set([...steps]);

        clearInterval(this.initInterval);
        setTimeout(() => this.processNextStep(stepIndex + 1), 500);
      } else {
        currentStep.progress += Math.random() * 15 + 5;
        currentStep.progress = Math.min(currentStep.progress, 100);
        this.initSteps.set([...steps]);
      }
    }, 200);
  }

  private resetSystemInit(): void {
    const steps = this.initSteps();
    steps.forEach(step => {
      step.progress = 0;
      step.active = false;
      step.completed = false;
    });
    this.initSteps.set([...steps]);
  }

  private clearUploadInterval(): void {
    if (this.uploadInterval) {
      clearInterval(this.uploadInterval);
      this.uploadInterval = undefined;
    }
  }

  private clearAllIntervals(): void {
    this.stopAnimation();
    this.clearUploadInterval();
    if (this.initInterval) {
      clearInterval(this.initInterval);
      this.initInterval = undefined;
    }
  }
}
