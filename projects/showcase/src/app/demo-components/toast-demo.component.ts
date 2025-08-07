import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastContainer, ToastConfig } from '@lib/components/toast';
import { Button } from '@lib/components/button';

@Component({
  selector: 'app-toast-demo',
  standalone: true,
  imports: [CommonModule, ToastContainer, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Toast Container for all positions -->
    <ToastContainer [showProgress]="true" [maxToasts]="5" />

    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <!-- Header -->
      <div class="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800">
        <div class="absolute inset-0 bg-black opacity-10"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div class="flex items-center justify-center mb-6">
            <svg class="w-16 h-16 text-white mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            <span class="text-white text-3xl font-bold">Toast Component</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Smart
            <span class="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Notifications
            </span>
          </h1>

          <p class="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Elegant toast notifications with signal-based architecture, automatic positioning,
            progress tracking, and smooth animations. Perfect for user feedback and system alerts.
          </p>
        </div>
      </div>

      <!-- Demo Grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <!-- Basic Toasts -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Basic Toast Types</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <!-- Success Toast -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-green-800 dark:text-green-200">Success</h3>
              </div>
              <p class="text-green-700 dark:text-green-300 text-sm mb-4">
                Show positive feedback for completed actions.
              </p>
              <Button
                (click)="showSuccess()"
                customClasses="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                ✅ Show Success
              </Button>
            </div>

            <!-- Error Toast -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-red-800 dark:text-red-200">Error</h3>
              </div>
              <p class="text-red-700 dark:text-red-300 text-sm mb-4">
                Alert users to errors and critical issues.
              </p>
              <Button
                (click)="showError()"
                customClasses="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                ❌ Show Error
              </Button>
            </div>

            <!-- Warning Toast -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-yellow-800 dark:text-yellow-200">Warning</h3>
              </div>
              <p class="text-yellow-700 dark:text-yellow-300 text-sm mb-4">
                Warn users about potential issues.
              </p>
              <Button
                (click)="showWarning()"
                customClasses="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                ⚠️ Show Warning
              </Button>
            </div>

            <!-- Info Toast -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-blue-800 dark:text-blue-200">Information</h3>
              </div>
              <p class="text-blue-700 dark:text-blue-300 text-sm mb-4">
                Share helpful information and tips.
              </p>
              <Button
                (click)="showInfo()"
                customClasses="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                ℹ️ Show Info
              </Button>
            </div>
          </div>
        </div>

        <!-- Position Demo -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Toast Positions</h2>
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">

            <Button
              (click)="showToastAtPosition('top-left')"
              variant="outline"
              customClasses="p-4 text-center"
            >
              📍 Top Left
            </Button>

            <Button
              (click)="showToastAtPosition('top-center')"
              variant="outline"
              customClasses="p-4 text-center"
            >
              📍 Top Center
            </Button>

            <Button
              (click)="showToastAtPosition('top-right')"
              variant="outline"
              customClasses="p-4 text-center"
            >
              📍 Top Right
            </Button>

            <Button
              (click)="showToastAtPosition('bottom-left')"
              variant="outline"
              customClasses="p-4 text-center"
            >
              📍 Bottom Left
            </Button>

            <Button
              (click)="showToastAtPosition('bottom-center')"
              variant="outline"
              customClasses="p-4 text-center"
            >
              📍 Bottom Center
            </Button>

            <Button
              (click)="showToastAtPosition('bottom-right')"
              variant="outline"
              customClasses="p-4 text-center"
            >
              📍 Bottom Right
            </Button>
          </div>
        </div>

        <!-- Advanced Features -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Advanced Features</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <!-- Persistent Toast -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Persistent Toast</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Won't auto-dismiss, requires manual close.
              </p>
              <Button
                (click)="showPersistent()"
                variant="outline"
                customClasses="w-full"
              >
                📌 Show Persistent
              </Button>
            </div>

            <!-- Custom Duration -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Long Duration</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Toast that lasts for 10 seconds.
              </p>
              <Button
                (click)="showLongDuration()"
                variant="outline"
                customClasses="w-full"
              >
                ⏱️ Show Long Toast
              </Button>
            </div>

            <!-- Interactive Toast -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Interactive</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Clickable toast with custom action.
              </p>
              <Button
                (click)="showInteractive()"
                variant="outline"
                customClasses="w-full"
              >
                🖱️ Show Interactive
              </Button>
            </div>

            <!-- No Icon -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Icon</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Clean toast without icon decoration.
              </p>
              <Button
                (click)="showNoIcon()"
                variant="outline"
                customClasses="w-full"
              >
                🚫 No Icon Toast
              </Button>
            </div>

            <!-- No Close Button -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Auto-Close Only</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Toast without manual close button.
              </p>
              <Button
                (click)="showNoClose()"
                variant="outline"
                customClasses="w-full"
              >
                🔒 Auto-Close Only
              </Button>
            </div>

            <!-- Multiple Toasts -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Toasts</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Show several toasts at once.
              </p>
              <Button
                (click)="showMultiple()"
                variant="outline"
                customClasses="w-full"
              >
                📚 Show Multiple
              </Button>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Global Actions</h2>
          <div class="flex flex-wrap justify-center gap-4">
            <Button
              (click)="dismissAll()"
              variant="destructive"
              size="lg"
              customClasses="px-8"
            >
              🗑️ Dismiss All Toasts
            </Button>

            <Button
              (click)="showRandomToast()"
              variant="default"
              size="lg"
              customClasses="px-8"
            >
              🎲 Show Random Toast
            </Button>
          </div>
        </div>

        <!-- Stats -->
        <div class="mt-16 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-3xl p-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Toast Statistics</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{{ toastCounter() }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total Toasts Shown</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-green-600 dark:text-green-400">{{ activeToasts() }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Currently Active</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">{{ dismissedToasts() }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Dismissed</div>
            </div>
          </div>
        </div>

        <!-- Documentation Link -->
        <div class="mt-16 text-center">
          <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">📚 Complete Documentation</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6 text-lg">
              Explore the full Toast component documentation with API reference, advanced examples, and best practices.
            </p>
            <a
              href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/toast.md"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              View Full Documentation
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ToastDemoComponent {
  private toastService = inject(ToastService);

  // Statistics
  readonly toastCounter = signal(0);
  readonly activeToasts = signal(0);
  readonly dismissedToasts = signal(0);

  // Demo data
  private readonly sampleMessages = {
    success: [
      { title: 'Success!', description: 'Your changes have been saved successfully.' },
      { title: 'Upload Complete', description: 'File uploaded and processed successfully.' },
      { title: 'Account Created', description: 'Welcome! Your account has been created.' },
      { title: 'Payment Processed', description: 'Your payment was processed successfully.' },
      { title: 'Data Synchronized', description: 'All your data has been synchronized.' }
    ],
    error: [
      { title: 'Error Occurred', description: 'Something went wrong. Please try again.' },
      { title: 'Upload Failed', description: 'File upload failed. Check your connection.' },
      { title: 'Authentication Error', description: 'Invalid credentials. Please log in again.' },
      { title: 'Network Error', description: 'Unable to connect to the server.' },
      { title: 'Validation Failed', description: 'Please check your input and try again.' }
    ],
    warning: [
      { title: 'Warning', description: 'You have unsaved changes that will be lost.' },
      { title: 'Storage Full', description: 'Your storage is 90% full. Consider upgrading.' },
      { title: 'Session Expiring', description: 'Your session will expire in 5 minutes.' },
      { title: 'Outdated Browser', description: 'Please update your browser for better experience.' },
      { title: 'Maintenance Mode', description: 'System maintenance scheduled for tonight.' }
    ],
    info: [
      { title: 'Did You Know?', description: 'You can use keyboard shortcuts to navigate faster.' },
      { title: 'New Feature', description: 'Dark mode is now available in settings.' },
      { title: 'Tip', description: 'Hold Ctrl+Click to select multiple items.' },
      { title: 'Update Available', description: 'A new version is available for download.' },
      { title: 'Backup Reminder', description: 'Remember to backup your data regularly.' }
    ]
  };

  // Basic toast methods
  showSuccess(): void {
    const message = this.getRandomMessage('success');
    this.toastService.success(message.title, message.description);
    this.incrementCounter();
  }

  showError(): void {
    const message = this.getRandomMessage('error');
    this.toastService.error(message.title, message.description);
    this.incrementCounter();
  }

  showWarning(): void {
    const message = this.getRandomMessage('warning');
    this.toastService.warning(message.title, message.description);
    this.incrementCounter();
  }

  showInfo(): void {
    const message = this.getRandomMessage('info');
    this.toastService.info(message.title, message.description);
    this.incrementCounter();
  }

  // Position demo
  showToastAtPosition(position: ToastConfig['position']): void {
    this.toastService.show({
      title: `Position Test`,
      description: `Toast shown at ${position}`,
      variant: 'info',
      position: position,
      duration: 3000
    });
    this.incrementCounter();
  }

  // Advanced features
  showPersistent(): void {
    this.toastService.show({
      title: 'Persistent Toast',
      description: 'This toast will not auto-dismiss. Click the × to close it.',
      variant: 'warning',
      duration: 0, // Persistent
      showClose: true
    });
    this.incrementCounter();
  }

  showLongDuration(): void {
    this.toastService.show({
      title: 'Long Duration Toast',
      description: 'This toast will stay visible for 10 seconds.',
      variant: 'info',
      duration: 10000
    });
    this.incrementCounter();
  }

  showInteractive(): void {
    this.toastService.show({
      title: 'Interactive Toast',
      description: 'Click anywhere on this toast to see the action!',
      variant: 'success',
      duration: 8000,
      onClick: () => {
        alert('🎉 Toast clicked! This could trigger any action.');
      }
    });
    this.incrementCounter();
  }

  showNoIcon(): void {
    this.toastService.show({
      title: 'Clean Design',
      description: 'This toast has no icon for a minimal look.',
      variant: 'default',
      showIcon: false,
      duration: 4000
    });
    this.incrementCounter();
  }

  showNoClose(): void {
    this.toastService.show({
      title: 'Auto-Close Only',
      description: 'This toast has no close button and will auto-dismiss.',
      variant: 'info',
      showClose: false,
      duration: 5000
    });
    this.incrementCounter();
  }

  showMultiple(): void {
    const variants: Array<'success' | 'error' | 'warning' | 'info'> = ['success', 'error', 'warning', 'info'];

    variants.forEach((variant, index) => {
      setTimeout(() => {
        const message = this.getRandomMessage(variant);
        this.toastService.show({
          title: `Toast ${index + 1}`,
          description: message.description,
          variant: variant,
          duration: 3000 + (index * 1000)
        });
        this.incrementCounter();
      }, index * 500);
    });
  }

  showRandomToast(): void {
    const variants = ['success', 'error', 'warning', 'info'] as const;
    const positions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const;

    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    const randomPosition = positions[Math.floor(Math.random() * positions.length)];
    const message = this.getRandomMessage(randomVariant);

    this.toastService.show({
      title: message.title,
      description: message.description,
      variant: randomVariant,
      position: randomPosition,
      duration: Math.random() * 5000 + 2000 // 2-7 seconds
    });
    this.incrementCounter();
  }

  dismissAll(): void {
    this.toastService.dismissAll();
    this.dismissedToasts.update(count => count + this.activeToasts());
    this.activeToasts.set(0);
  }

  // Helper methods
  private getRandomMessage(variant: keyof typeof this.sampleMessages) {
    const messages = this.sampleMessages[variant];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  private incrementCounter(): void {
    this.toastCounter.update(count => count + 1);
    this.activeToasts.update(count => count + 1);
  }
}
