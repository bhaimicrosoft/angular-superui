import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toggle, ToggleChangeEvent } from '../../../../lib/src/lib/toggle';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-toggle-demo',
  standalone: true,
  imports: [Toggle, ReactiveFormsModule, JsonPipe],
  template: `
    <!-- SEO Meta Tags & Hero -->
    <div class="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      <!-- Animated Hero Section -->
      <section class="relative overflow-hidden py-24 px-6">
        <!-- Animated Background Elements -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute -top-1/2 -left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute -bottom-1/2 -right-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500/20 rounded-full blur-2xl animate-bounce delay-2000"></div>
        </div>

        <!-- Hero Content -->
        <div class="relative max-w-6xl mx-auto text-center space-y-8">
          <!-- Main Title with Animation -->
          <div class="space-y-4">
            <h1 class="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-blue-600 to-green-600 bg-clip-text text-transparent animate-fade-in">
              Toggle Component
            </h1>
            <div class="w-32 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full animate-expand"></div>
          </div>

          <!-- Subtitle -->
          <p class="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slide-up delay-300">
            Beautiful, accessible toggle switches with <span class="text-primary font-semibold">advanced animations</span>,
            <span class="text-blue-600 font-semibold">multiple variants</span>, and
            <span class="text-green-600 font-semibold">seamless form integration</span>
          </p>

          <!-- Hero Demo Toggles -->
          <div class="flex flex-wrap justify-center items-center gap-8 mt-12 animate-slide-up delay-500">
            <div class="text-center space-y-3">
              <Toggle
                [(checked)]="heroDefault"
                size="xl"
                variant="default"
                label="Default"
                class="transform hover:scale-110 transition-transform duration-300"
              />
              <p class="text-sm text-muted-foreground">Standard</p>
            </div>
            <div class="text-center space-y-3">
              <Toggle
                [(checked)]="heroSuccess"
                size="xl"
                variant="success"
                label="Success"
                class="transform hover:scale-110 transition-transform duration-300"
              />
              <p class="text-sm text-muted-foreground">Success State</p>
            </div>
            <div class="text-center space-y-3">
              <Toggle
                [(checked)]="heroWarning"
                size="xl"
                variant="warning"
                label="Warning"
                class="transform hover:scale-110 transition-transform duration-300"
              />
              <p class="text-sm text-muted-foreground">Warning State</p>
            </div>
          </div>

          <!-- Features Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-slide-up delay-700">
            <div class="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <div class="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p class="text-muted-foreground text-sm">Optimized animations with zero lag and smooth transitions</p>
            </div>
            <div class="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">Fully Accessible</h3>
              <p class="text-muted-foreground text-sm">ARIA compliant with keyboard navigation and screen reader support</p>
            </div>
            <div class="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
              <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M15 5l2 2"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">Highly Customizable</h3>
              <p class="text-muted-foreground text-sm">Multiple variants, sizes, and styling options for every use case</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-6 pb-24 space-y-16">

        <!-- Variants Showcase -->
        <section class="space-y-8">
          <div class="text-center space-y-4">
            <h2 class="text-4xl font-bold text-foreground">Variant Showcase</h2>
            <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from multiple carefully crafted variants to match your design needs
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Default Variant -->
            <div class="group bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold">Default</h3>
                  <Toggle
                    [(checked)]="variantDefaultDefault"
                    variant="default"
                    size="default"
                    class="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p class="text-sm text-muted-foreground">
                  Clean and modern design perfect for most use cases
                </p>
                <div class="text-xs text-muted-foreground font-mono bg-muted/50 p-2 rounded">
                  variant="default"
                </div>
              </div>
            </div>

            <!-- Outline Variant -->
            <div class="group bg-card rounded-2xl p-6 border border-border hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold">Outline</h3>
                  <Toggle
                    [(checked)]="variantDefaultOutline"
                    variant="outline"
                    size="default"
                    class="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p class="text-sm text-muted-foreground">
                  Subtle border-focused design for minimal interfaces
                </p>
                <div class="text-xs text-muted-foreground font-mono bg-muted/50 p-2 rounded">
                  variant="outline"
                </div>
              </div>
            </div>

            <!-- Ghost Variant -->
            <div class="group bg-card rounded-2xl p-6 border border-border hover:border-gray-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/10">
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold">Ghost</h3>
                  <Toggle
                    [(checked)]="variantDefaultGhost"
                    variant="ghost"
                    size="default"
                    class="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p class="text-sm text-muted-foreground">
                  Ultra-minimal design that appears on hover and focus
                </p>
                <div class="text-xs text-muted-foreground font-mono bg-muted/50 p-2 rounded">
                  variant="ghost"
                </div>
              </div>
            </div>

            <!-- Destructive Variant -->
            <div class="group bg-card rounded-2xl p-6 border border-border hover:border-destructive/50 transition-all duration-300 hover:shadow-lg hover:shadow-destructive/10">
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold">Destructive</h3>
                  <Toggle
                    [(checked)]="variantDefaultDestructive"
                    variant="destructive"
                    size="default"
                    class="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p class="text-sm text-muted-foreground">
                  Warning and danger states for critical actions
                </p>
                <div class="text-xs text-muted-foreground font-mono bg-muted/50 p-2 rounded">
                  variant="destructive"
                </div>
              </div>
            </div>

            <!-- Success Variant -->
            <div class="group bg-card rounded-2xl p-6 border border-border hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold">Success</h3>
                  <Toggle
                    [(checked)]="variantDefaultSuccess"
                    variant="success"
                    size="default"
                    class="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p class="text-sm text-muted-foreground">
                  Positive feedback and confirmation states
                </p>
                <div class="text-xs text-muted-foreground font-mono bg-muted/50 p-2 rounded">
                  variant="success"
                </div>
              </div>
            </div>

            <!-- Warning Variant -->
            <div class="group bg-card rounded-2xl p-6 border border-border hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold">Warning</h3>
                  <Toggle
                    [(checked)]="variantDefaultWarning"
                    variant="warning"
                    size="default"
                    class="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p class="text-sm text-muted-foreground">
                  Attention-grabbing for important notices
                </p>
                <div class="text-xs text-muted-foreground font-mono bg-muted/50 p-2 rounded">
                  variant="warning"
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Sizes Showcase -->
        <section class="space-y-8">
          <div class="text-center space-y-4">
            <h2 class="text-4xl font-bold text-foreground">Size Options</h2>
            <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
              From compact UI elements to prominent feature toggles
            </p>
          </div>

          <div class="bg-card rounded-3xl p-8 border border-border/50">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div class="text-center space-y-4">
                <h3 class="text-lg font-semibold">Small</h3>
                <Toggle
                  [(checked)]="sizeDefaultSm"
                  size="sm"
                  variant="default"
                  class="mx-auto hover:scale-110 transition-transform duration-300"
                />
                <div class="text-xs text-muted-foreground font-mono bg-muted/50 p-2 rounded">
                  size="sm"
                </div>
              </div>
              <div class="text-center space-y-4">
                <h3 class="text-lg font-semibold">Default</h3>
                <Toggle
                  [(checked)]="sizeDefaultDefault"
                  size="default"
                  variant="default"
                  class="mx-auto hover:scale-110 transition-transform duration-300"
                />
                <div class="text-xs text-muted-foreground font-mono bg-muted/50 p-2 rounded">
                  size="default"
                </div>
              </div>
              <div class="text-center space-y-4">
                <h3 class="text-lg font-semibold">Large</h3>
                <Toggle
                  [(checked)]="sizeDefaultLg"
                  size="lg"
                  variant="default"
                  class="mx-auto hover:scale-110 transition-transform duration-300"
                />
                <div class="text-xs text-muted-foreground font-mono bg-muted/50 p-2 rounded">
                  size="lg"
                </div>
              </div>
              <div class="text-center space-y-4">
                <h3 class="text-lg font-semibold">Extra Large</h3>
                <Toggle
                  [(checked)]="sizeDefaultXl"
                  size="xl"
                  variant="default"
                  class="mx-auto hover:scale-110 transition-transform duration-300"
                />
                <div class="text-xs text-muted-foreground font-mono bg-muted/50 p-2 rounded">
                  size="xl"
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Interactive Examples -->
        <section class="space-y-8">
          <div class="text-center space-y-4">
            <h2 class="text-4xl font-bold text-foreground">Interactive Examples</h2>
            <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-world usage patterns with labels, descriptions, and form integration
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Settings Panel Example -->
            <div class="bg-card rounded-3xl p-8 border border-border/50 space-y-6">
              <h3 class="text-2xl font-semibold mb-6">Settings Panel</h3>

              <div class="space-y-6">
                <div class="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                  <div class="space-y-1">
                    <h4 class="font-medium">Email Notifications</h4>
                    <p class="text-sm text-muted-foreground">Receive updates about your account</p>
                  </div>
                  <Toggle
                    [(checked)]="emailNotifications"
                    variant="default"
                    size="default"
                  />
                </div>

                <div class="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-green-500/50 transition-colors">
                  <div class="space-y-1">
                    <h4 class="font-medium">Auto-save</h4>
                    <p class="text-sm text-muted-foreground">Automatically save your work</p>
                  </div>
                  <Toggle
                    [(checked)]="autoSave"
                    variant="success"
                    size="default"
                  />
                </div>

                <div class="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-yellow-500/50 transition-colors">
                  <div class="space-y-1">
                    <h4 class="font-medium">Maintenance Mode</h4>
                    <p class="text-sm text-muted-foreground">Enable for system updates</p>
                  </div>
                  <Toggle
                    [(checked)]="maintenanceMode"
                    variant="warning"
                    size="default"
                  />
                </div>
              </div>
            </div>

            <!-- Form Integration Example -->
            <div class="bg-card rounded-3xl p-8 border border-border/50 space-y-6">
              <h3 class="text-2xl font-semibold mb-6">Form Integration</h3>

              <form [formGroup]="settingsForm" class="space-y-6">
                <div class="space-y-4">
                  <Toggle
                    formControlName="notifications"
                    label="Push Notifications"
                    description="Get notified about important updates"
                    helperText="You can change this later in settings"
                    labelPosition="right"
                    variant="default"
                    size="default"
                  />

                  <Toggle
                    formControlName="marketing"
                    label="Marketing Emails"
                    description="Receive promotional content and offers"
                    labelPosition="right"
                    variant="outline"
                    size="default"
                  />

                  <Toggle
                    formControlName="newsletter"
                    label="Newsletter Subscription"
                    description="Stay updated with our latest news"
                    [error]="settingsForm.get('newsletter')?.errors?.['required'] ? 'This field is required' : ''"
                    labelPosition="right"
                    variant="default"
                    size="default"
                  />
                </div>

                <div class="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <div class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div class="flex-1 min-w-0">
                      <h4 class="text-sm font-medium text-blue-900 dark:text-blue-100">
                        Reactive Forms Integration
                      </h4>
                      <p class="text-sm text-blue-700 dark:text-blue-200 mt-1">
                        Toggle components automatically sync with FormControl state. Try the buttons below to see how toggles respond to programmatic form changes.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="bg-muted/50 rounded-xl p-4">
                  <h4 class="font-medium mb-2">Form Values:</h4>
                  <pre class="text-xs text-muted-foreground">{{ settingsForm.value | json }}</pre>
                </div>

                <div class="flex gap-3">
                  <button
                    type="button"
                    (click)="toggleFormState()"
                    class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    {{ settingsForm.disabled ? 'Enable' : 'Disable' }} Form
                  </button>
                  <button
                    type="button"
                    (click)="resetForm()"
                    class="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors text-sm font-medium"
                  >
                    Reset Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <!-- Icon Integration -->
        <section class="space-y-8">
          <div class="text-center space-y-4">
            <h2 class="text-4xl font-bold text-foreground">With Icons</h2>
            <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enhanced visual feedback with custom icons for checked and unchecked states
            </p>
          </div>

          <div class="bg-card rounded-3xl p-8 border border-border/50">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="text-center space-y-4">
                <h3 class="text-lg font-semibold">Light Mode</h3>
                <Toggle
                  [(checked)]="lightMode"
                  [showIcons]="true"
                  variant="default"
                  size="lg"
                  class="mx-auto hover:scale-110 transition-transform duration-300"
                />
                <p class="text-sm text-muted-foreground">Toggle with default icons</p>
              </div>

              <div class="text-center space-y-4">
                <h3 class="text-lg font-semibold">Wi-Fi Status</h3>
                <Toggle
                  [(checked)]="wifiEnabled"
                  [showIcons]="true"
                  variant="success"
                  size="lg"
                  class="mx-auto hover:scale-110 transition-transform duration-300"
                />
                <p class="text-sm text-muted-foreground">Connection indicator</p>
              </div>

              <div class="text-center space-y-4">
                <h3 class="text-lg font-semibold">Airplane Mode</h3>
                <Toggle
                  [(checked)]="airplaneMode"
                  [showIcons]="true"
                  variant="warning"
                  size="lg"
                  class="mx-auto hover:scale-110 transition-transform duration-300"
                />
                <p class="text-sm text-muted-foreground">Flight mode toggle</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Event Logging -->
        <section class="space-y-8">
          <div class="text-center space-y-4">
            <h2 class="text-4xl font-bold text-foreground">Event Handling</h2>
            <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
              Monitor toggle interactions with comprehensive event logging
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-card rounded-3xl p-8 border border-border/50">
              <h3 class="text-xl font-semibold mb-6">Test Toggles</h3>
              <div class="grid grid-cols-2 gap-4">
                <Toggle
                  [(checked)]="eventToggle1"
                  label="Toggle 1"
                  variant="default"
                  (change)="onToggleChange('Event Toggle 1', $event)"
                />
                <Toggle
                  [(checked)]="eventToggle2"
                  label="Toggle 2"
                  variant="success"
                  (change)="onToggleChange('Event Toggle 2', $event)"
                />
                <Toggle
                  [(checked)]="eventToggle3"
                  label="Toggle 3"
                  variant="warning"
                  (change)="onToggleChange('Event Toggle 3', $event)"
                />
                <Toggle
                  [(checked)]="eventToggle4"
                  label="Toggle 4"
                  variant="destructive"
                  (change)="onToggleChange('Event Toggle 4', $event)"
                />
              </div>
            </div>

            <div class="bg-card rounded-3xl p-8 border border-border/50">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-semibold">Event Log</h3>
                <button
                  (click)="clearEventLog()"
                  class="text-xs px-3 py-1 bg-muted hover:bg-muted/80 rounded-md transition-colors"
                >
                  Clear
                </button>
              </div>
              <div class="bg-muted/50 rounded-xl p-4 max-h-64 overflow-y-auto">
                @if (eventLog().length === 0) {
                  <p class="text-sm text-muted-foreground italic">No events yet. Try toggling the switches!</p>
                } @else {
                  <div class="space-y-2">
                    @for (event of eventLog().slice().reverse(); track $index) {
                      <div class="text-xs font-mono bg-background/50 p-2 rounded border-l-2 border-primary/50">
                        {{ event }}
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </section>

        <!-- Documentation Link -->
        <section class="text-center space-y-8 py-16">
          <div class="space-y-4">
            <h2 class="text-4xl font-bold text-foreground">Complete Documentation</h2>
            <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the full API reference, advanced examples, and implementation guides
            </p>
          </div>

          <div class="inline-flex items-center space-x-4">
            <a
              href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/toggle.md"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center space-x-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              <span>View Documentation</span>
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>

          <div class="text-sm text-muted-foreground space-y-2">
            <p>📚 Complete API reference and examples</p>
            <p>🚀 Installation and setup guides</p>
            <p>💡 Best practices and advanced patterns</p>
          </div>
        </section>
      </div>
    </div>

    <!-- Custom Styles -->
    <style>
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes slide-up {
        from { opacity: 0; transform: translateY(40px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes expand {
        from { width: 0; }
        to { width: 8rem; }
      }

      .animate-fade-in {
        animation: fade-in 1s ease-out;
      }

      .animate-slide-up {
        animation: slide-up 0.8s ease-out;
      }

      .animate-expand {
        animation: expand 1.5s ease-out;
      }

      .delay-300 { animation-delay: 0.3s; }
      .delay-500 { animation-delay: 0.5s; }
      .delay-700 { animation-delay: 0.7s; }
      .delay-1000 { animation-delay: 1s; }
      .delay-2000 { animation-delay: 2s; }
    </style>
  `,
})
export class ToggleDemoComponent {
  // Hero section toggles
  readonly heroDefault = signal(true);
  readonly heroSuccess = signal(false);
  readonly heroWarning = signal(true);

  // Variant defaults - individual signals for two-way binding
  readonly variantDefaultDefault = signal(false);
  readonly variantDefaultOutline = signal(true);
  readonly variantDefaultGhost = signal(false);
  readonly variantDefaultDestructive = signal(false);
  readonly variantDefaultSuccess = signal(true);
  readonly variantDefaultWarning = signal(false);

  // Size defaults - individual signals for two-way binding
  readonly sizeDefaultSm = signal(false);
  readonly sizeDefaultDefault = signal(true);
  readonly sizeDefaultLg = signal(false);
  readonly sizeDefaultXl = signal(true);

  // Settings panel toggles
  readonly emailNotifications = signal(true);
  readonly autoSave = signal(false);
  readonly maintenanceMode = signal(false);

  // Icon toggles
  readonly lightMode = signal(false);
  readonly wifiEnabled = signal(true);
  readonly airplaneMode = signal(false);

  // Event testing toggles
  readonly eventToggle1 = signal(false);
  readonly eventToggle2 = signal(false);
  readonly eventToggle3 = signal(false);
  readonly eventToggle4 = signal(false);

  // Event log
  readonly eventLog = signal<string[]>([]);

  // Form
  readonly settingsForm = new FormGroup({
    notifications: new FormControl(true),
    marketing: new FormControl(false),
    newsletter: new FormControl(false, [Validators.requiredTrue]),
  });

  onToggleChange(source: string, event: ToggleChangeEvent): void {
    const timestamp = new Date().toLocaleTimeString();
    const message = `[${timestamp}] ${source}: ${event.checked ? 'ON' : 'OFF'}`;
    this.eventLog.update(logs => [message, ...logs].slice(0, 10));

    console.log(`Toggle ${source} changed:`, event);
  }

  clearEventLog(): void {
    this.eventLog.set([]);
  }

  toggleFormState(): void {
    if (this.settingsForm.disabled) {
      this.settingsForm.enable();
    } else {
      this.settingsForm.disable();
    }
  }

  resetForm(): void {
    this.settingsForm.reset({
      notifications: true,
      marketing: false,
      newsletter: false,
    });
  }
}
