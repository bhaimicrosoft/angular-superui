import { Component, signal, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tabs, TabChangeEvent, TabItem } from '@lib/components/tabs';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-tabs-demo',
  standalone: true,
  imports: [Tabs, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <!-- Hero Section -->
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div class="text-center space-y-6">
            <div class="space-y-2">
              <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground tracking-tight">
                Tabs Component
              </h1>
              <div class="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full"></div>
            </div>
            <p class="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Beautiful, accessible, and fully customizable tabs component with multiple variants,
              smooth animations, and comprehensive form integration for modern Angular applications.
            </p>
            <div class="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
              <span class="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">TypeScript</span>
              <span class="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">Angular Signals</span>
              <span class="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">WCAG Compliant</span>
              <span class="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">Responsive</span>
              <span class="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">Animated</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Demo Section -->
      <section class="py-8 sm:py-12 lg:py-16 bg-card/50 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8 sm:mb-12">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Interactive Demo
            </h2>
            <p class="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Experience the smooth animations and responsive design of our tabs component across all device sizes.
            </p>
          </div>

          <div class="bg-background rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6 lg:p-8">
            <Tabs
              [tabs]="quickDemoTabs()"
              [(activeTab)]="quickDemoActive"
              variant="default"
              (change)="onQuickDemoChange($event)"
              class="w-full"
            >
              <!-- Tab content will be rendered here -->
            </Tabs>

            <!-- Dynamic Content Display -->
            <div class="mt-6 p-4 sm:p-6 bg-muted/50 rounded-lg">
              @switch (quickDemoActive()) {
                @case ('overview') {
                  <div class="space-y-4 text-center">
                    <div class="text-4xl sm:text-5xl lg:text-6xl">🎨</div>
                    <h3 class="text-xl sm:text-2xl font-semibold text-foreground">Beautiful Design</h3>
                    <p class="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
                      Crafted with attention to detail, our tabs component features smooth animations
                      and a clean, modern aesthetic that adapts perfectly to any design system.
                    </p>
                  </div>
                }
                @case ('features') {
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div class="text-center space-y-2">
                      <div class="text-2xl sm:text-3xl">⚡</div>
                      <h4 class="font-semibold text-foreground">Fast Performance</h4>
                      <p class="text-xs sm:text-sm text-muted-foreground">Optimized for speed with lazy loading</p>
                    </div>
                    <div class="text-center space-y-2">
                      <div class="text-2xl sm:text-3xl">♿</div>
                      <h4 class="font-semibold text-foreground">Accessible</h4>
                      <p class="text-xs sm:text-sm text-muted-foreground">WCAG 2.1 AA compliant</p>
                    </div>
                    <div class="text-center space-y-2 sm:col-span-2 lg:col-span-1">
                      <div class="text-2xl sm:text-3xl">🎛️</div>
                      <h4 class="font-semibold text-foreground">Customizable</h4>
                      <p class="text-xs sm:text-sm text-muted-foreground">Multiple variants and sizes</p>
                    </div>
                  </div>
                }
                @case ('examples') {
                  <div class="text-center space-y-4">
                    <div class="text-4xl sm:text-5xl lg:text-6xl">🚀</div>
                    <h3 class="text-xl sm:text-2xl font-semibold text-foreground">Ready to Use</h3>
                    <p class="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
                      Explore comprehensive examples below showcasing different variants,
                      responsive layouts, and integration patterns for real-world applications.
                    </p>
                  </div>
                }
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-12 sm:space-y-16 lg:space-y-20">

        <!-- Basic Examples -->
        <section class="space-y-6 sm:space-y-8">
          <div class="text-center lg:text-left">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Basic Examples
            </h2>
            <p class="text-sm sm:text-base text-muted-foreground max-w-3xl lg:mx-0 mx-auto">
              Fundamental tab implementations showcasing core functionality and responsive behavior.
            </p>
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
            <!-- Simple Tabs -->
            <div class="bg-card rounded-lg sm:rounded-xl border shadow-sm p-4 sm:p-6">
              <h3 class="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
                Simple Tabs
              </h3>
              <Tabs
                [tabs]="basicTabs()"
                [(activeTab)]="basicActive"
                variant="default"
                (change)="onBasicChange($event)"
                class="w-full"
              />
              <div class="mt-4 sm:mt-6 p-3 sm:p-4 bg-muted/50 rounded-lg">
                @switch (basicActive()) {
                  @case ('profile') {
                    <div class="space-y-3">
                      <h4 class="font-medium text-foreground">Profile Settings</h4>
                      <p class="text-sm text-muted-foreground">
                        Manage your personal information and account preferences. Update your profile
                        picture, bio, and contact details to keep your account current.
                      </p>
                      <div class="flex flex-wrap gap-2">
                        <span class="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Personal Info</span>
                        <span class="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Security</span>
                        <span class="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Privacy</span>
                      </div>
                    </div>
                  }
                  @case ('account') {
                    <div class="space-y-3">
                      <h4 class="font-medium text-foreground">Account Management</h4>
                      <p class="text-sm text-muted-foreground">
                        Configure your account settings, billing information, and subscription preferences.
                        Manage payment methods and view your usage statistics.
                      </p>
                      <div class="flex flex-wrap gap-2">
                        <span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Billing</span>
                        <span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Subscription</span>
                        <span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Usage</span>
                      </div>
                    </div>
                  }
                  @case ('notifications') {
                    <div class="space-y-3">
                      <h4 class="font-medium text-foreground">Notification Preferences</h4>
                      <p class="text-sm text-muted-foreground">
                        Customize how and when you receive notifications. Set up email alerts,
                        push notifications, and communication preferences to stay informed.
                      </p>
                      <div class="flex flex-wrap gap-2">
                        <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Email</span>
                        <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Push</span>
                        <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">SMS</span>
                      </div>
                    </div>
                  }
                }
              </div>
            </div>

            <!-- Tabs with Icons and Badges -->
            <div class="bg-card rounded-lg sm:rounded-xl border shadow-sm p-4 sm:p-6">
              <h3 class="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
                Enhanced Tabs
              </h3>
              <Tabs
                [tabs]="enhancedTabs()"
                [(activeTab)]="enhancedActive"
                variant="default"
                [closableTabs]="false"
                (change)="onEnhancedChange($event)"
                class="w-full"
              />
              <div class="mt-4 sm:mt-6 p-3 sm:p-4 bg-muted/50 rounded-lg">
                @switch (enhancedActive()) {
                  @case ('dashboard') {
                    <div class="space-y-4">
                      <h4 class="font-medium text-foreground">Dashboard Overview</h4>
                      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                        <div class="text-center p-3 bg-background rounded-lg">
                          <div class="text-lg sm:text-xl font-bold text-primary">124</div>
                          <div class="text-xs text-muted-foreground">Total Users</div>
                        </div>
                        <div class="text-center p-3 bg-background rounded-lg">
                          <div class="text-lg sm:text-xl font-bold text-green-600">89%</div>
                          <div class="text-xs text-muted-foreground">Uptime</div>
                        </div>
                        <div class="text-center p-3 bg-background rounded-lg sm:col-span-1 col-span-2">
                          <div class="text-lg sm:text-xl font-bold text-blue-600">42</div>
                          <div class="text-xs text-muted-foreground">Active Sessions</div>
                        </div>
                      </div>
                    </div>
                  }
                  @case ('analytics') {
                    <div class="space-y-4">
                      <h4 class="font-medium text-foreground">Analytics Insights</h4>
                      <div class="space-y-3">
                        <div class="flex justify-between items-center">
                          <span class="text-sm text-muted-foreground">Page Views</span>
                          <span class="font-medium">1,234 <span class="text-green-600 text-xs">+12%</span></span>
                        </div>
                        <div class="flex justify-between items-center">
                          <span class="text-sm text-muted-foreground">Unique Visitors</span>
                          <span class="font-medium">892 <span class="text-green-600 text-xs">+8%</span></span>
                        </div>
                        <div class="flex justify-between items-center">
                          <span class="text-sm text-muted-foreground">Bounce Rate</span>
                          <span class="font-medium">23% <span class="text-red-600 text-xs">-5%</span></span>
                        </div>
                      </div>
                    </div>
                  }
                  @case ('messages') {
                    <div class="space-y-4">
                      <h4 class="font-medium text-foreground">Recent Messages</h4>
                      <div class="space-y-3">
                        <div class="flex items-start gap-3 p-3 bg-background rounded-lg">
                          <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span class="text-xs font-medium text-primary">JD</span>
                          </div>
                          <div class="flex-1 min-w-0">
                            <div class="text-sm font-medium text-foreground">John Doe</div>
                            <div class="text-xs text-muted-foreground truncate">
                              Hey, can we schedule a meeting for next week?
                            </div>
                          </div>
                          <div class="text-xs text-muted-foreground">2m</div>
                        </div>
                        <div class="flex items-start gap-3 p-3 bg-background rounded-lg">
                          <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span class="text-xs font-medium text-green-700">AS</span>
                          </div>
                          <div class="flex-1 min-w-0">
                            <div class="text-sm font-medium text-foreground">Alice Smith</div>
                            <div class="text-xs text-muted-foreground truncate">
                              The project updates look great! 🎉
                            </div>
                          </div>
                          <div class="text-xs text-muted-foreground">5m</div>
                        </div>
                      </div>
                    </div>
                  }
                }
              </div>
            </div>
          </div>
        </section>

        <!-- Variants Showcase -->
        <section class="space-y-6 sm:space-y-8">
          <div class="text-center lg:text-left">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Variant Showcase
            </h2>
            <p class="text-sm sm:text-base text-muted-foreground max-w-3xl lg:mx-0 mx-auto">
              Explore different visual styles and layouts optimized for various use cases and screen sizes.
            </p>
          </div>

          <!-- Pills Variant -->
          <div class="bg-card rounded-lg sm:rounded-xl border shadow-sm p-4 sm:p-6">
            <h3 class="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
              Pills Variant
            </h3>
            <Tabs
              [tabs]="pillsTabs()"
              [(activeTab)]="pillsActive"
              variant="pills"
              size="default"
              (change)="onPillsChange($event)"
              class="w-full"
            />
            <div class="mt-4 sm:mt-6 p-3 sm:p-4 bg-muted/50 rounded-lg">
              <p class="text-sm text-muted-foreground">
                Active: <span class="font-medium text-foreground">{{ pillsActive() }}</span>
                - Perfect for modern interfaces with rounded, pill-style tabs.
              </p>
            </div>
          </div>

          <!-- Underline Variant -->
          <div class="bg-card rounded-lg sm:rounded-xl border shadow-sm p-4 sm:p-6">
            <h3 class="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
              Underline Variant
            </h3>
            <Tabs
              [tabs]="underlineTabs()"
              [(activeTab)]="underlineActive"
              variant="underline"
              size="default"
              (change)="onUnderlineChange($event)"
              class="w-full"
            />
            <div class="mt-4 sm:mt-6 p-3 sm:p-4 bg-muted/50 rounded-lg">
              <p class="text-sm text-muted-foreground">
                Active: <span class="font-medium text-foreground">{{ underlineActive() }}</span>
                - Minimal design with animated underline indicators.
              </p>
            </div>
          </div>


        </section>

        <!-- Responsive Behavior -->
        <section class="space-y-6 sm:space-y-8">
          <div class="text-center lg:text-left">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Responsive Behavior
            </h2>
            <p class="text-sm sm:text-base text-muted-foreground max-w-3xl lg:mx-0 mx-auto">
              See how tabs adapt gracefully across different screen sizes and orientations.
            </p>
          </div>

          <div class="bg-card rounded-lg sm:rounded-xl border shadow-sm p-4 sm:p-6">
            <h3 class="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
              Dynamic Layout Demo
            </h3>

            <!-- Screen Size Indicator -->
            <div class="mb-6 p-3 bg-muted/50 rounded-lg">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <span class="text-sm font-medium text-foreground">Current Breakpoint:</span>
                <div class="flex gap-2">
                  <span class="block sm:hidden px-2 py-1 bg-red-100 text-red-700 text-xs rounded">Mobile</span>
                  <span class="hidden sm:block md:hidden px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">Small</span>
                  <span class="hidden md:block lg:hidden px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Medium</span>
                  <span class="hidden lg:block xl:hidden px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Large</span>
                  <span class="hidden xl:block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">Extra Large</span>
                </div>
              </div>
            </div>

            <Tabs
              [tabs]="responsiveTabs()"
              [(activeTab)]="responsiveActive"
              variant="default"
              size="default"
              (change)="onResponsiveChange($event)"
              class="w-full"
            />

            <div class="mt-4 sm:mt-6 p-3 sm:p-4 bg-muted/50 rounded-lg">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="text-center space-y-2">
                  <div class="text-2xl">📱</div>
                  <h4 class="font-medium text-foreground text-sm">Mobile First</h4>
                  <p class="text-xs text-muted-foreground">Optimized touch targets</p>
                </div>
                <div class="text-center space-y-2">
                  <div class="text-2xl">💻</div>
                  <h4 class="font-medium text-foreground text-sm">Desktop Ready</h4>
                  <p class="text-xs text-muted-foreground">Enhanced interactions</p>
                </div>
                <div class="text-center space-y-2 sm:col-span-2 lg:col-span-1">
                  <div class="text-2xl">🔄</div>
                  <h4 class="font-medium text-foreground text-sm">Adaptive</h4>
                  <p class="text-xs text-muted-foreground">Fluid transitions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Form Integration -->
        <section class="space-y-6 sm:space-y-8">
          <div class="text-center lg:text-left">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Form Integration
            </h2>
            <p class="text-sm sm:text-base text-muted-foreground max-w-3xl lg:mx-0 mx-auto">
              Seamless integration with Angular reactive forms and validation.
            </p>
          </div>

          <div class="bg-card rounded-lg sm:rounded-xl border shadow-sm p-4 sm:p-6">
            <form [formGroup]="userForm" class="space-y-6">
              <Tabs
                [tabs]="formTabs()"
                [(activeTab)]="formActive"
                variant="pills"
                (change)="onFormTabChange($event)"
                class="w-full"
              />

              <div class="mt-6">
                @switch (formActive()) {
                  @case ('personal') {
                    <div class="space-y-4">
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label class="form-label">First Name</label>
                          <input
                            type="text"
                            formControlName="firstName"
                            class="form-input text-sm"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div>
                          <label class="form-label">Last Name</label>
                          <input
                            type="text"
                            formControlName="lastName"
                            class="form-input text-sm"
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>
                      <div>
                        <label class="form-label">Email</label>
                        <input
                          type="email"
                          formControlName="email"
                          class="form-input text-sm"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>
                  }
                  @case ('preferences') {
                    <div class="space-y-4">
                      <div>
                        <label class="form-label">Theme Preference</label>
                        <select
                          formControlName="theme"
                          class="form-select text-sm"
                        >
                          <option value="light" class="bg-background text-foreground">Light</option>
                          <option value="dark" class="bg-background text-foreground">Dark</option>
                          <option value="auto" class="bg-background text-foreground">Auto</option>
                        </select>
                      </div>
                      <div>
                        <label class="form-label">Language</label>
                        <select
                          formControlName="language"
                          class="form-select text-sm"
                        >
                          <option value="en" class="bg-background text-foreground">English</option>
                          <option value="es" class="bg-background text-foreground">Spanish</option>
                          <option value="fr" class="bg-background text-foreground">French</option>
                          <option value="de" class="bg-background text-foreground">German</option>
                        </select>
                      </div>
                    </div>
                  }
                  @case ('notifications') {
                    <div class="space-y-4">
                      <div class="space-y-3">
                        <label class="form-checkbox-label">
                          <input
                            type="checkbox"
                            formControlName="emailNotifications"
                            class="form-checkbox w-4 h-4 hover:border-muted-foreground"
                          />
                          <span class="form-checkbox-text">Email notifications</span>
                        </label>
                        <label class="form-checkbox-label">
                          <input
                            type="checkbox"
                            formControlName="pushNotifications"
                            class="form-checkbox w-4 h-4 hover:border-muted-foreground"
                          />
                          <span class="form-checkbox-text">Push notifications</span>
                        </label>
                        <label class="form-checkbox-label">
                          <input
                            type="checkbox"
                            formControlName="marketingEmails"
                            class="form-checkbox w-4 h-4 hover:border-muted-foreground"
                          />
                          <span class="form-checkbox-text">Marketing emails</span>
                        </label>
                      </div>
                    </div>
                  }
                }
              </div>

              <div class="pt-4 border-t border-border">
                <div class="flex flex-col sm:flex-row gap-3 sm:justify-between">
                  <button
                    type="button"
                    class="px-4 py-2 text-sm border border-border bg-background text-foreground rounded-lg hover:bg-muted hover:border-muted-foreground transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                    (click)="resetForm()"
                  >
                    Reset Form
                  </button>
                  <button
                    type="submit"
                    class="px-6 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
                    [disabled]="userForm.invalid"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>

            <!-- Form Status -->
            <div class="mt-6 p-3 sm:p-4 bg-muted/50 rounded-lg">
              <h4 class="font-medium text-foreground mb-2">Form Status</h4>
              <div class="text-sm text-muted-foreground">
                <p>Valid: <span class="font-medium" [class.text-green-600]="userForm.valid" [class.text-red-600]="!userForm.valid">{{ userForm.valid ? 'Yes' : 'No' }}</span></p>
                <p>Current Tab: <span class="font-medium text-foreground">{{ formActive() }}</span></p>
              </div>
            </div>
          </div>
        </section>

        <!-- Vertical Tabs Layout -->
        <section class="space-y-6 sm:space-y-8">
          <div class="text-center lg:text-left">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Vertical Tabs Layout
            </h2>
            <p class="text-sm sm:text-base text-muted-foreground max-w-3xl lg:mx-0 mx-auto">
              Perfect for sidebar navigation with content displayed on the right side.
            </p>
          </div>

          <div class="bg-card rounded-lg sm:rounded-xl border shadow-sm p-4 sm:p-6">
            <div class="flex flex-col lg:flex-row gap-6">
              <!-- Vertical Tabs on the left -->
              <div class="lg:w-64 flex-shrink-0">
                <Tabs
                  [tabs]="verticalTabs()"
                  [(activeTab)]="verticalActive"
                  variant="pills"
                  orientation="vertical"
                  size="default"
                  (change)="onVerticalChange($event)"
                  class="w-full"
                />
              </div>

              <!-- Content on the right -->
              <div class="flex-1 min-h-[300px] lg:min-h-[400px]">
                @switch (verticalActive()) {
                  @case ('dashboard') {
                    <div class="space-y-4">
                      <h3 class="text-xl font-semibold text-foreground">Dashboard Overview</h3>
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-4 rounded-lg border">
                          <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">Total Sales</h4>
                          <p class="text-2xl font-bold text-blue-800 dark:text-blue-200">$124,567</p>
                          <p class="text-sm text-blue-600 dark:text-blue-400">+12% from last month</p>
                        </div>
                        <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-4 rounded-lg border">
                          <h4 class="font-medium text-green-900 dark:text-green-100 mb-2">Active Users</h4>
                          <p class="text-2xl font-bold text-green-800 dark:text-green-200">2,847</p>
                          <p class="text-sm text-green-600 dark:text-green-400">+8% from last week</p>
                        </div>
                        <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-4 rounded-lg border">
                          <h4 class="font-medium text-purple-900 dark:text-purple-100 mb-2">Conversion Rate</h4>
                          <p class="text-2xl font-bold text-purple-800 dark:text-purple-200">3.24%</p>
                          <p class="text-sm text-purple-600 dark:text-purple-400">+0.5% improvement</p>
                        </div>
                        <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 p-4 rounded-lg border">
                          <h4 class="font-medium text-orange-900 dark:text-orange-100 mb-2">Revenue</h4>
                          <p class="text-2xl font-bold text-orange-800 dark:text-orange-200">$89,234</p>
                          <p class="text-sm text-orange-600 dark:text-orange-400">+15% growth</p>
                        </div>
                      </div>
                    </div>
                  }
                  @case ('analytics') {
                    <div class="space-y-4">
                      <h3 class="text-xl font-semibold text-foreground">Analytics & Reports</h3>
                      <div class="space-y-4">
                        <div class="bg-muted/30 p-4 rounded-lg border-l-4 border-blue-500">
                          <h4 class="font-medium text-foreground mb-2">📊 Traffic Analytics</h4>
                          <p class="text-sm text-muted-foreground">Monitor website traffic patterns, user behavior, and engagement metrics across all your digital properties.</p>
                        </div>
                        <div class="bg-muted/30 p-4 rounded-lg border-l-4 border-green-500">
                          <h4 class="font-medium text-foreground mb-2">💰 Revenue Tracking</h4>
                          <p class="text-sm text-muted-foreground">Track revenue streams, conversion funnels, and customer lifetime value with detailed breakdowns.</p>
                        </div>
                        <div class="bg-muted/30 p-4 rounded-lg border-l-4 border-purple-500">
                          <h4 class="font-medium text-foreground mb-2">👥 User Insights</h4>
                          <p class="text-sm text-muted-foreground">Understand user demographics, preferences, and behavior patterns to optimize your product experience.</p>
                        </div>
                      </div>
                    </div>
                  }
                  @case ('settings') {
                    <div class="space-y-4">
                      <h3 class="text-xl font-semibold text-foreground">Application Settings</h3>
                      <div class="space-y-6">
                        <div class="space-y-3">
                          <h4 class="font-medium text-foreground">General Preferences</h4>
                          <div class="space-y-3">
                            <label class="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                              <span class="text-sm text-foreground">Enable dark mode</span>
                              <input type="checkbox" class="w-4 h-4 text-primary border-border rounded focus:ring-primary" checked />
                            </label>
                            <label class="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                              <span class="text-sm text-foreground">Show notifications</span>
                              <input type="checkbox" class="w-4 h-4 text-primary border-border rounded focus:ring-primary" checked />
                            </label>
                            <label class="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                              <span class="text-sm text-foreground">Auto-save changes</span>
                              <input type="checkbox" class="w-4 h-4 text-primary border-border rounded focus:ring-primary" />
                            </label>
                          </div>
                        </div>
                        <div class="space-y-3">
                          <h4 class="font-medium text-foreground">Security</h4>
                          <div class="space-y-3">
                            <label class="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                              <span class="text-sm text-foreground">Two-factor authentication</span>
                              <input type="checkbox" class="w-4 h-4 text-primary border-border rounded focus:ring-primary" checked />
                            </label>
                            <label class="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                              <span class="text-sm text-foreground">Session timeout</span>
                              <select class="text-sm border border-border rounded-md px-2 py-1 bg-background text-foreground">
                                <option>30 minutes</option>
                                <option>1 hour</option>
                                <option>4 hours</option>
                                <option>Never</option>
                              </select>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  @case ('profile') {
                    <div class="space-y-4">
                      <h3 class="text-xl font-semibold text-foreground">User Profile</h3>
                      <div class="space-y-6">
                        <div class="flex items-center gap-4">
                          <div class="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                            <span class="text-xl font-bold text-primary-foreground">JD</span>
                          </div>
                          <div>
                            <h4 class="font-semibold text-foreground">John Doe</h4>
                            <p class="text-sm text-muted-foreground">Senior Developer</p>
                            <p class="text-sm text-muted-foreground">john.doe&#64;company.com</p>
                          </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label class="block text-sm font-medium text-foreground mb-2">First Name</label>
                            <input
                              type="text"
                              value="John"
                              class="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-foreground mb-2">Last Name</label>
                            <input
                              type="text"
                              value="Doe"
                              class="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          <div class="sm:col-span-2">
                            <label class="block text-sm font-medium text-foreground mb-2">Email</label>
                            <input
                              type="email"
                              value="john.doe&#64;company.com"
                              class="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          <div class="sm:col-span-2">
                            <label class="block text-sm font-medium text-foreground mb-2">Bio</label>
                            <textarea
                              rows="3"
                              class="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="Tell us about yourself..."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  @case ('support') {
                    <div class="space-y-4">
                      <h3 class="text-xl font-semibold text-foreground">Help & Support</h3>
                      <div class="space-y-6">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div class="p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors">
                            <div class="text-2xl mb-2">📚</div>
                            <h4 class="font-medium text-foreground mb-1">Documentation</h4>
                            <p class="text-sm text-muted-foreground">Browse our comprehensive documentation and guides.</p>
                          </div>
                          <div class="p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors">
                            <div class="text-2xl mb-2">💬</div>
                            <h4 class="font-medium text-foreground mb-1">Live Chat</h4>
                            <p class="text-sm text-muted-foreground">Get instant help from our support team.</p>
                          </div>
                          <div class="p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors">
                            <div class="text-2xl mb-2">📧</div>
                            <h4 class="font-medium text-foreground mb-1">Email Support</h4>
                            <p class="text-sm text-muted-foreground">Send us a detailed message about your issue.</p>
                          </div>
                          <div class="p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors">
                            <div class="text-2xl mb-2">🎥</div>
                            <h4 class="font-medium text-foreground mb-1">Video Tutorials</h4>
                            <p class="text-sm text-muted-foreground">Learn with step-by-step video guides.</p>
                          </div>
                        </div>
                        <div class="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 Quick Tip</h4>
                          <p class="text-sm text-blue-800 dark:text-blue-200">
                            Use keyboard shortcuts to navigate between tabs: Arrow keys, Home, End, and Delete for closable tabs.
                          </p>
                        </div>
                      </div>
                    </div>
                  }
                }
              </div>
            </div>
          </div>
        </section>

        <!-- Performance & Accessibility -->
        <section class="space-y-6 sm:space-y-8">
          <div class="text-center lg:text-left">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Performance & Accessibility
            </h2>
            <p class="text-sm sm:text-base text-muted-foreground max-w-3xl lg:mx-0 mx-auto">
              Built with performance and accessibility as core principles for inclusive web experiences.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <!-- Performance Features -->
            <div class="bg-card rounded-lg sm:rounded-xl border shadow-sm p-4 sm:p-6">
              <h3 class="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
                Performance Features
              </h3>
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium text-foreground text-sm">Lazy Loading</h4>
                    <p class="text-xs text-muted-foreground">Content loaded only when needed</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium text-foreground text-sm">Optimized Animations</h4>
                    <p class="text-xs text-muted-foreground">GPU-accelerated smooth transitions</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium text-foreground text-sm">Memory Efficient</h4>
                    <p class="text-xs text-muted-foreground">Minimal DOM manipulation</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Accessibility Features -->
            <div class="bg-card rounded-lg sm:rounded-xl border shadow-sm p-4 sm:p-6">
              <h3 class="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
                Accessibility Features
              </h3>
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium text-foreground text-sm">Keyboard Navigation</h4>
                    <p class="text-xs text-muted-foreground">Full keyboard support with arrow keys</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium text-foreground text-sm">Screen Reader Support</h4>
                    <p class="text-xs text-muted-foreground">ARIA labels and live regions</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium text-foreground text-sm">High Contrast</h4>
                    <p class="text-xs text-muted-foreground">WCAG 2.1 AA color contrast ratios</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer CTA -->
        <section class="text-center py-8 sm:py-12 lg:py-16">
          <div class="space-y-4 sm:space-y-6">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Ready to Get Started?
            </h2>
            <p class="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Integrate our tabs component into your Angular application and create beautiful,
              accessible user interfaces that work seamlessly across all devices.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a target="_blank" href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/tabs.md"
                 class="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                View Documentation
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
})
export class TabsDemoComponent {
  // Quick demo
  readonly quickDemoActive = signal('overview');
  readonly quickDemoTabs = signal<TabItem[]>([
    { value: 'overview', label: 'Overview' },
    { value: 'features', label: 'Features' },
    { value: 'examples', label: 'Examples' },
  ]);

  // Basic examples
  readonly basicActive = signal('profile');
  readonly basicTabs = signal<TabItem[]>([
    { value: 'profile', label: 'Profile' },
    { value: 'account', label: 'Account' },
    { value: 'notifications', label: 'Notifications' },
  ]);

  readonly enhancedActive = signal('dashboard');
  readonly enhancedTabs = signal<TabItem[]>([
    { value: 'dashboard', label: 'Dashboard', icon: '📊' },
    { value: 'analytics', label: 'Analytics', icon: '📈', },
    { value: 'messages', label: 'Messages', icon: '💬' },
  ]);

  // Variants
  readonly pillsActive = signal('home');
  readonly pillsTabs = signal<TabItem[]>([
    { value: 'home', label: 'Home' },
    { value: 'about', label: 'About' },
    { value: 'services', label: 'Services' },
    { value: 'contact', label: 'Contact' },
  ]);

  readonly underlineActive = signal('design');
  readonly underlineTabs = signal<TabItem[]>([
    { value: 'design', label: 'Design' },
    { value: 'develop', label: 'Develop' },
    { value: 'deploy', label: 'Deploy' },
    { value: 'monitor', label: 'Monitor' },
  ]);



  // Responsive demo
  readonly responsiveActive = signal('mobile');
  readonly responsiveTabs = signal<TabItem[]>([
    { value: 'mobile', label: 'Mobile', icon: '📱' },
    { value: 'tablet', label: 'Tablet', icon: '💻' },
    { value: 'desktop', label: 'Desktop', icon: '🖥️' },
    { value: 'watch', label: 'Watch', icon: '⌚' },
  ]);

  // Form integration
  readonly formActive = signal('personal');
  readonly formTabs = signal<TabItem[]>([
    { value: 'personal', label: 'Personal Info' },
    { value: 'preferences', label: 'Preferences' },
    { value: 'notifications', label: 'Notifications' },
  ]);

  // Vertical tabs demo
  readonly verticalActive = signal('dashboard');
  readonly verticalTabs = signal<TabItem[]>([
    { value: 'dashboard', label: 'Dashboard', icon: '📊' },
    { value: 'analytics', label: 'Analytics', icon: '📈' },
    { value: 'settings', label: 'Settings', icon: '⚙️' },
    { value: 'profile', label: 'Profile', icon: '👤' },
    { value: 'support', label: 'Support', icon: '🆘' },
  ]);

  readonly userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    theme: new FormControl('light'),
    language: new FormControl('en'),
    emailNotifications: new FormControl(true),
    pushNotifications: new FormControl(false),
    marketingEmails: new FormControl(false),
  });

  constructor(private title: Title, private meta: Meta) {
    this.setSEOData();
  }

  private setSEOData(): void {
    // Set page title
    this.title.setTitle('Tabs Component - Angular SuperUI | Responsive & Accessible Tab Navigation');

    // Set meta description
    this.meta.updateTag({
      name: 'description',
      content: 'Comprehensive Angular tabs component with multiple variants, smooth animations, and full responsive design. Features accessibility support, form integration, and optimized performance for modern web applications.'
    });

    // Set Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: 'Tabs Component - Angular SuperUI' });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Beautiful, accessible, and fully customizable tabs component with multiple variants, smooth animations, and comprehensive form integration for Angular applications.'
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Set Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Tabs Component - Angular SuperUI' });
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'Responsive tabs component with smooth animations, accessibility features, and multiple design variants for Angular applications.'
    });

    // Set keywords
    this.meta.updateTag({
      name: 'keywords',
      content: 'Angular tabs, tab component, responsive tabs, accessible tabs, Angular UI, tab navigation, TypeScript tabs, Angular signals, WCAG compliant, mobile tabs'
    });

    // Set canonical URL
    this.meta.updateTag({ rel: 'canonical', href: 'https://angular-superui.com/tabs' });

    // Set viewport
    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });

    // Set language
    this.meta.updateTag({ name: 'language', content: 'en' });

    // Set robots
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }

  onQuickDemoChange(event: TabChangeEvent): void {
    console.log('Quick demo tab changed:', event);
  }

  onBasicChange(event: TabChangeEvent): void {
    console.log('Basic tab changed:', event);
  }

  onEnhancedChange(event: TabChangeEvent): void {
    console.log('Enhanced tab changed:', event);
  }

  onPillsChange(event: TabChangeEvent): void {
    console.log('Pills tab changed:', event);
  }

  onUnderlineChange(event: TabChangeEvent): void {
    console.log('Underline tab changed:', event);
  }



  onResponsiveChange(event: TabChangeEvent): void {
    console.log('Responsive tab changed:', event);
  }

  onFormTabChange(event: TabChangeEvent): void {
    console.log('Form tab changed:', event);
  }

  onVerticalChange(event: TabChangeEvent): void {
    console.log('Vertical tab changed:', event);
  }

  resetForm(): void {
    this.userForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      theme: 'light',
      language: 'en',
      emailNotifications: true,
      pushNotifications: false,
      marketingEmails: false,
    });
    this.formActive.set('personal');
  }
}
