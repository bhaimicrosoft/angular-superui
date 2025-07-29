# Toast Component

An elegant and flexible toast notification system for Angular applications with signal-based architecture, automatic positioning, progress tracking, and smooth animations.

## Overview

The Toast component provides a complete notification system that's perfect for displaying temporary messages, alerts, and user feedback. Built with modern Angular signals, it offers excellent performance and developer experience.

## ✨ Key Features

- **🚀 Signal-Based Architecture**: Built with Angular signals for optimal performance
- **📍 Smart Positioning**: Six position options with automatic layout management  
- **⏱️ Progress Tracking**: Visual progress bars showing remaining time
- **🎨 Type Variants**: Success, error, warning, info, and default styles
- **🖱️ Interactive**: Optional click handlers and pause-on-hover functionality
- **♿ Accessible**: Full keyboard navigation and screen reader support
- **📱 Responsive**: Mobile-friendly design with proper touch interactions
- **🎭 Smooth Animations**: Elegant slide-in/out animations with proper timing
- **🎛️ Highly Configurable**: Extensive customization options
- **🔧 Developer Friendly**: Simple service-based API

## 📦 Installation

The Toast component is part of the Angular SuperUI library. If you haven't installed the library yet:

```bash
npx ngsui-cli add toast
```

## 🚀 Basic Usage

### 1. Import the Toast Module

```typescript
import { ToastService, ToastContainer } from '@lib/components/toast';

@Component({
  standalone: true,
  imports: [ToastContainer], // Add ToastContainer to your app component
  // ... other config
})
export class AppComponent {
  private toastService = inject(ToastService);
}
```

### 2. Add Toast Container to Your Template

```html
<!-- Add this to your app component template -->
<ToastContainer />

<!-- Your app content -->
<div class="app-content">
  <!-- ... -->
</div>
```

### 3. Show Toasts

```typescript
export class MyComponent {
  private toastService = inject(ToastService);

  showSuccess() {
    this.toastService.success(
      'Success!', 
      'Your changes have been saved successfully.'
    );
  }

  showError() {
    this.toastService.error(
      'Error!', 
      'Something went wrong. Please try again.'
    );
  }

  showWarning() {
    this.toastService.warning(
      'Warning!', 
      'You have unsaved changes.'
    );
  }

  showInfo() {
    this.toastService.info(
      'Info', 
      'New feature available in settings.'
    );
  }
}
```

## 🎛️ Advanced Configuration

### Custom Toast Configuration

```typescript
// Advanced toast with custom configuration
this.toastService.show({
  title: 'Custom Toast',
  description: 'This is a highly customized toast notification.',
  variant: 'success',
  position: 'top-right',
  duration: 5000,
  showIcon: true,
  showClose: true,
  showProgress: true,
  onClick: () => {
    console.log('Toast clicked!');
  }
});
```

### Position Options

```typescript
// Available positions
type ToastPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right'
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right';

// Example usage
this.toastService.success('Title', 'Message', {
  position: 'bottom-right'
});
```

### Persistent Toasts

```typescript
// Toast that won't auto-dismiss
this.toastService.show({
  title: 'Important Notice',
  description: 'This requires your attention.',
  variant: 'warning',
  duration: 0, // 0 = persistent
  showClose: true
});
```

### Interactive Toasts

```typescript
// Toast with click handler
this.toastService.show({
  title: 'Update Available',
  description: 'Click to download the latest version.',
  variant: 'info',
  onClick: () => {
    // Handle click action
    window.open('/download', '_blank');
  }
});
```

## 🎨 Component API

### ToastService Methods

```typescript
interface ToastService {
  // Convenience methods
  success(title: string, description?: string, config?: Partial<ToastConfig>): string;
  error(title: string, description?: string, config?: Partial<ToastConfig>): string;
  warning(title: string, description?: string, config?: Partial<ToastConfig>): string;
  info(title: string, description?: string, config?: Partial<ToastConfig>): string;
  
  // Full configuration method
  show(config: ToastConfig): string;
  
  // Management methods
  dismiss(id: string): void;
  dismissAll(): void;
  
  // Signals
  toasts: Signal<ToastItem[]>;
}
```

### ToastConfig Interface

```typescript
interface ToastConfig {
  // Content
  title: string;
  description?: string;
  
  // Appearance
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  showIcon?: boolean;
  showClose?: boolean;
  showProgress?: boolean;
  
  // Behavior
  duration?: number; // milliseconds, 0 = persistent
  position?: ToastPosition;
  
  // Interaction
  onClick?: () => void;
}
```

### ToastContainer Props

```typescript
interface ToastContainerProps {
  // Display options
  showProgress?: boolean; // Default: true
  maxToasts?: number;     // Default: 5
  
  // Custom classes
  containerClass?: string;
  toastClass?: string;
}
```

## 🎭 Styling and Theming

### CSS Custom Properties

```css
.toast-container {
  --toast-bg: theme('colors.white');
  --toast-border: theme('colors.gray.200');
  --toast-shadow: theme('boxShadow.lg');
  --toast-border-radius: theme('borderRadius.xl');
  --toast-padding: theme('spacing.4');
  
  /* Dark mode */
  --toast-bg-dark: theme('colors.gray.800');
  --toast-border-dark: theme('colors.gray.700');
}
```

### Custom Styling

```typescript
@Component({
  template: `
    <ToastContainer 
      [containerClass]="'custom-toast-container'"
      [toastClass]="'custom-toast'"
    />
  `,
  styles: [`
    .custom-toast-container {
      z-index: 9999;
    }
    
    .custom-toast {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      color: white;
    }
  `]
})
export class CustomToastComponent {}
```

## 🔧 Advanced Examples

### Toast with Loading State

```typescript
showLoadingToast() {
  const toastId = this.toastService.show({
    title: 'Processing...',
    description: 'Please wait while we process your request.',
    variant: 'info',
    duration: 0, // Persistent
    showClose: false
  });

  // Simulate async operation
  setTimeout(() => {
    this.toastService.dismiss(toastId);
    this.toastService.success('Complete!', 'Request processed successfully.');
  }, 3000);
}
```

### Toast Queue Management

```typescript
showSequentialToasts() {
  const messages = [
    { title: 'Step 1', description: 'Initializing...' },
    { title: 'Step 2', description: 'Processing data...' },
    { title: 'Step 3', description: 'Finalizing...' },
    { title: 'Complete!', description: 'All steps finished.' }
  ];

  messages.forEach((message, index) => {
    setTimeout(() => {
      this.toastService.info(message.title, message.description, {
        duration: 2000
      });
    }, index * 1000);
  });
}
```

### Toast with Undo Action

```typescript
deleteWithUndo(itemId: string) {
  let isUndone = false;
  
  const toastId = this.toastService.show({
    title: 'Item Deleted',
    description: 'Click to undo this action.',
    variant: 'warning',
    duration: 5000,
    onClick: () => {
      if (!isUndone) {
        isUndone = true;
        this.restoreItem(itemId);
        this.toastService.dismiss(toastId);
        this.toastService.success('Restored', 'Item has been restored.');
      }
    }
  });
  
  // If not undone after toast expires, permanently delete
  setTimeout(() => {
    if (!isUndone) {
      this.permanentlyDeleteItem(itemId);
    }
  }, 5000);
}
```

## ♿ Accessibility Features

The Toast component is built with accessibility in mind:

- **Screen Reader Support**: Proper ARIA labels and live regions
- **Keyboard Navigation**: Full keyboard control for interactive elements
- **Focus Management**: Proper focus handling for dismissible toasts
- **High Contrast**: Supports high contrast mode
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

### ARIA Attributes

```html
<!-- Generated toast markup -->
<div
  role="alert"
  aria-live="polite"
  aria-describedby="toast-description"
  class="toast"
>
  <h4 id="toast-title">Toast Title</h4>
  <p id="toast-description">Toast description</p>
  <button 
    aria-label="Close notification"
    class="toast-close"
  >
    ×
  </button>
</div>
```

## 🎯 Best Practices

### 1. Toast Timing
```typescript
// Good: Appropriate timing for different types
this.toastService.success('Saved!', 'Document saved.', { duration: 2000 });
this.toastService.error('Error!', 'Check details.', { duration: 4000 });
this.toastService.warning('Warning!', 'Action needed.', { duration: 0 }); // Persistent
```

### 2. Content Guidelines
```typescript
// Good: Clear, concise messaging
this.toastService.success(
  'Payment Successful', 
  'Your order #12345 has been confirmed.'
);

// Avoid: Vague or overly technical messages
this.toastService.error(
  'HTTP 500 Internal Server Error', 
  'SQLException: Connection timeout...'
);
```

### 3. Position Strategy
```typescript
// Good: Consistent positioning
const TOAST_CONFIG = {
  position: 'top-right' as const,
  duration: 3000
};

this.toastService.success('Title', 'Message', TOAST_CONFIG);
```

### 4. Error Handling
```typescript
async performAction() {
  try {
    await this.apiService.updateData();
    this.toastService.success('Updated!', 'Data saved successfully.');
  } catch (error) {
    this.toastService.error(
      'Update Failed', 
      'Please check your connection and try again.'
    );
  }
}
```

## 🔍 Troubleshooting

### Common Issues

1. **Toast not appearing**
   ```typescript
   // Ensure ToastContainer is in your template
   @Component({
     template: `<ToastContainer />` // Must be present
   })
   ```

2. **Toasts not positioning correctly**
   ```css
   /* Ensure proper z-index */
   .toast-container {
     z-index: 9999;
     position: fixed;
   }
   ```

3. **Progress bar not updating**
   ```typescript
   // Ensure showProgress is enabled
   this.toastService.show({
     title: 'Test',
     showProgress: true // Add this
   });
   ```

## 🚀 Performance Tips

1. **Limit active toasts**
   ```html
   <ToastContainer [maxToasts]="3" />
   ```

2. **Use appropriate durations**
   ```typescript
   // Short messages
   this.toastService.success('Saved!', undefined, { duration: 2000 });
   
   // Important messages
   this.toastService.error('Error!', 'Details...', { duration: 5000 });
   ```

3. **Clean up persistent toasts**
   ```typescript
   ngOnDestroy() {
     this.toastService.dismissAll();
   }
   ```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](../CONTRIBUTING.md) for details.

## 📝 License

This component is part of Angular SuperUI and is licensed under the MIT License.
