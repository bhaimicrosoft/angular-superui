# Dialog Component

A set of layered sections of content—known as tab panels—that are displayed one at a time. Built with accessibility in mind and includes keyboard navigation support.

## Features

- ✅ **Accessible** - Full ARIA support with keyboard navigation
- ✅ **Flexible** - Multiple sizes and customization options
- ✅ **Animated** - Smooth enter/exit animations
- ✅ **Composable** - Modular components that work together
- ✅ **Theme-aware** - Supports light and dark modes
- ✅ **TypeScript** - Full type safety and IntelliSense support

## Installation

The Dialog component is part of the Angular SuperUI library. Make sure you have the library installed:

```bash
npm install @angular-superui/components
```

## Basic Usage

```typescript
import {
  DialogRoot,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@lib/dialog';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    DialogRoot,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose
  ],
  template: `
    <DialogRoot dialogId="example-dialog">
      <DialogTrigger 
        dialogId="example-dialog"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Open Dialog
      </DialogTrigger>

      <DialogContent dialogId="example-dialog" size="md">
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a basic dialog example with a title and description.
          </DialogDescription>
        </DialogHeader>

        <div class="pb-8">
          <p>Your dialog content goes here.</p>
        </div>

        <DialogFooter>
          <DialogClose 
            dialogId="example-dialog"
            className="static w-auto h-auto p-0 opacity-100">
            <span class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
              Close
            </span>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  `
})
export class ExampleComponent {}
```

## Components

### DialogRoot

The root container that manages the dialog state and provides context to child components.

**Props:**
- `dialogId: string` - Unique identifier for the dialog (required)

### DialogTrigger

The button or element that opens the dialog when clicked.

**Props:**
- `dialogId: string` - Must match the DialogRoot's dialogId (required)
- `className?: string` - Additional CSS classes
- `disabled?: boolean` - Whether the trigger is disabled

### DialogContent

The main dialog container that holds the content and manages the modal overlay.

**Props:**
- `dialogId: string` - Must match the DialogRoot's dialogId (required)
- `className?: string` - Additional CSS classes
- `size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'` - Dialog size (default: 'md')
- `showCloseButton?: boolean` - Show the default close button (default: true)
- `closeButtonClass?: string` - CSS classes for the close button
- `closeOnEscape?: boolean` - Close dialog on Escape key (default: true)
- `closeOnOverlayClick?: boolean` - Close dialog when clicking overlay (default: true)
- `ariaLabelledby?: string` - ARIA labelledby attribute
- `ariaDescribedby?: string` - ARIA describedby attribute

### DialogHeader

Container for the dialog title and description.

**Props:**
- `className?: string` - Additional CSS classes

### DialogTitle

The dialog title component.

**Props:**
- `className?: string` - Additional CSS classes

### DialogDescription

The dialog description component.

**Props:**
- `className?: string` - Additional CSS classes

### DialogFooter

Container for dialog action buttons.

**Props:**
- `className?: string` - Additional CSS classes

### DialogClose

A button component that closes the dialog when clicked.

**Props:**
- `dialogId: string` - Must match the DialogRoot's dialogId (required)
- `className?: string` - Additional CSS classes
- `disabled?: boolean` - Whether the button is disabled
- `ariaLabel?: string` - ARIA label for accessibility (default: 'Close dialog')

## Dialog Sizes

The dialog component supports multiple predefined sizes:

- `sm` - Small dialog (max-width: 24rem)
- `md` - Medium dialog (max-width: 32rem) - Default
- `lg` - Large dialog (max-width: 48rem)
- `xl` - Extra large dialog (max-width: 56rem)
- `2xl` - 2X large dialog (max-width: 64rem)

```html
<DialogContent dialogId="small-dialog" size="sm">
  <!-- Small dialog content -->
</DialogContent>

<DialogContent dialogId="large-dialog" size="2xl">
  <!-- Large dialog content -->
</DialogContent>
```

## Examples

### Basic Information Dialog

```html
<DialogRoot dialogId="info-dialog">
  <DialogTrigger 
    dialogId="info-dialog"
    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
    Show Information
  </DialogTrigger>

  <DialogContent dialogId="info-dialog" size="md">
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold">System Information</DialogTitle>
      <DialogDescription>
        Current system status and important notifications.
      </DialogDescription>
    </DialogHeader>

    <div class="pb-8">
      <div class="space-y-4">
        <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <p class="font-semibold text-green-900">System Status</p>
              <p class="text-sm text-green-700">All systems operational</p>
            </div>
          </div>
          <span class="text-green-600 font-bold">100%</span>
        </div>
      </div>
    </div>

    <DialogFooter>
      <DialogClose 
        dialogId="info-dialog"
        className="static w-auto h-auto p-0 opacity-100">
        <span class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
          Got it!
        </span>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</DialogRoot>
```

### Form Dialog

```typescript
interface FormData {
  name: string;
  email: string;
  role: string;
  message: string;
}

@Component({
  template: `
    <DialogRoot dialogId="form-dialog">
      <DialogTrigger 
        dialogId="form-dialog"
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
        Create Account
      </DialogTrigger>

      <DialogContent dialogId="form-dialog" size="lg">
        <DialogHeader>
          <DialogTitle>Create New Account</DialogTitle>
          <DialogDescription>
            Fill out the form below to create your new account.
          </DialogDescription>
        </DialogHeader>

        <div class="pb-8">
          <form class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  [(ngModel)]="formData.name"
                  name="name"
                  placeholder="Enter your full name"
                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500">
              </div>
              <div>
                <label class="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  [(ngModel)]="formData.email"
                  name="email"
                  placeholder="your@email.com"
                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500">
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-semibold mb-2">Role</label>
              <select
                [(ngModel)]="formData.role"
                name="role"
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500">
                <option value="">Select a role</option>
                <option value="admin">Administrator</option>
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
          </form>
        </div>

        <DialogFooter>
          <DialogClose 
            dialogId="form-dialog"
            className="static w-auto h-auto p-0 opacity-100">
            <span class="px-6 py-3 border text-gray-700 font-semibold rounded-lg hover:bg-gray-50">
              Cancel
            </span>
          </DialogClose>
          <button
            (click)="handleFormSubmit('form-dialog')"
            class="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
            Create Account
          </button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  `
})
export class FormDialogComponent {
  formData: FormData = {
    name: '',
    email: '',
    role: '',
    message: ''
  };

  handleFormSubmit(dialogId: string) {
    if (this.formData.name && this.formData.email) {
      console.log('Form submitted:', this.formData);
      this.dialogService.close(dialogId);
      this.resetForm();
    } else {
      alert('Please fill in all required fields');
    }
  }

  resetForm() {
    this.formData = { name: '', email: '', role: '', message: '' };
  }
}
```

### Confirmation Dialog

```html
<DialogRoot dialogId="confirm-dialog">
  <DialogTrigger 
    dialogId="confirm-dialog"
    className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">
    Delete Account
  </DialogTrigger>

  <DialogContent dialogId="confirm-dialog" size="md">
    <DialogHeader>
      <DialogTitle className="flex items-center gap-3">
        <div class="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
        </div>
        Confirm Deletion
      </DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account.
      </DialogDescription>
    </DialogHeader>

    <div class="pb-8">
      <div class="p-6 bg-red-50 rounded-lg border border-red-200">
        <div class="flex">
          <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-red-900 mb-2">⚠️ Warning</h4>
            <p class="text-sm text-red-700 mb-4">By proceeding, you will lose access to:</p>
            <ul class="text-sm text-red-700 space-y-1 list-disc list-inside">
              <li>All your saved projects and files</li>
              <li>Account settings and preferences</li>
              <li>Subscription benefits and features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <DialogFooter>
      <DialogClose 
        dialogId="confirm-dialog"
        className="static w-auto h-auto p-0 opacity-100">
        <span class="px-6 py-3 border text-gray-700 font-semibold rounded-lg hover:bg-gray-50">
          Cancel
        </span>
      </DialogClose>
      <button
        (click)="handleConfirmDelete('confirm-dialog')"
        class="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">
        Yes, Delete Everything
      </button>
    </DialogFooter>
  </DialogContent>
</DialogRoot>
```

### Notifications Dialog

```typescript
interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  time: string;
}

@Component({
  template: `
    <DialogRoot dialogId="notifications-dialog">
      <DialogTrigger 
        dialogId="notifications-dialog"
        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">
        View Notifications ({{ notifications.length }})
      </DialogTrigger>

      <DialogContent dialogId="notifications-dialog" size="lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div class="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
            </div>
            Notifications
            <span class="ml-auto text-sm font-normal bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              {{ notifications.length }} new
            </span>
          </DialogTitle>
          <DialogDescription>
            Manage your notifications and stay updated with the latest activities.
          </DialogDescription>
        </DialogHeader>

        <div class="pb-8">
          <div class="space-y-4 max-h-96 overflow-y-auto">
            <div *ngFor="let notification of notifications" 
                 class="flex items-start p-4 rounded-lg border transition-colors hover:bg-gray-50"
                 [ngClass]="{
                   'border-green-200 bg-green-50': notification.type === 'success',
                   'border-yellow-200 bg-yellow-50': notification.type === 'warning',
                   'border-blue-200 bg-blue-50': notification.type === 'info',
                   'border-red-200 bg-red-50': notification.type === 'error'
                 }">
              <div class="flex-shrink-0 mr-4">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center"
                     [ngClass]="{
                       'bg-green-600': notification.type === 'success',
                       'bg-yellow-600': notification.type === 'warning',
                       'bg-blue-600': notification.type === 'info',
                       'bg-red-600': notification.type === 'error'
                     }">
                  <!-- Icons for different notification types -->
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-semibold">{{ notification.title }}</h4>
                  <span class="text-xs text-gray-500">{{ notification.time }}</span>
                </div>
                <p class="text-sm text-gray-600 mb-3">{{ notification.message }}</p>
                <div class="flex gap-2">
                  <button class="text-xs px-3 py-1 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700">
                    View Details
                  </button>
                  <button class="text-xs px-3 py-1 border rounded-md font-medium text-gray-600 hover:bg-gray-50">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <button class="px-6 py-3 border text-gray-700 font-semibold rounded-lg hover:bg-gray-50">
            Mark All as Read
          </button>
          <DialogClose 
            dialogId="notifications-dialog"
            className="static w-auto h-auto p-0 opacity-100">
            <span class="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">
              Close
            </span>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  `
})
export class NotificationsDialogComponent {
  notifications: Notification[] = [
    { id: 1, type: 'success', title: 'Success!', message: 'Account created successfully.', time: '2 min ago' },
    { id: 2, type: 'warning', title: 'Warning', message: 'Storage almost full.', time: '5 min ago' },
    { id: 3, type: 'info', title: 'New Feature', message: 'Dark mode is now available.', time: '1 hour ago' },
    { id: 4, type: 'error', title: 'Error', message: 'Failed to sync data.', time: '2 hours ago' }
  ];
}
```

## Dialog Service

The `DialogService` provides programmatic control over dialogs:

```typescript
import { DialogService } from '@lib/dialog';

@Component({...})
export class MyComponent {
  private dialogService = inject(DialogService);

  openDialog(dialogId: string) {
    this.dialogService.open(dialogId);
  }

  closeDialog(dialogId: string) {
    this.dialogService.close(dialogId);
  }

  closeAllDialogs() {
    this.dialogService.closeAll();
  }

  isDialogOpen(dialogId: string): boolean {
    return this.dialogService.isOpen(dialogId);
  }
}
```

### DialogService Methods

- `open(id: string)` - Opens a dialog by ID
- `close(id: string)` - Closes a dialog by ID
- `closeAll()` - Closes all open dialogs
- `isOpen(id: string)` - Returns whether a dialog is currently open

## Styling with Tailwind CSS

The Dialog component is designed to work seamlessly with Tailwind CSS. Here are some styling tips:

### Custom Button Styling for DialogClose

When using `DialogClose` in footers, override the default close button styles:

```html
<DialogClose 
  dialogId="my-dialog"
  className="static w-auto h-auto p-0 opacity-100 ring-offset-0 focus:ring-0 focus:ring-offset-0">
  <span class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 cursor-pointer">
    Close Dialog
  </span>
</DialogClose>
```

### Dialog Content Spacing

Use `pb-8` class to add proper spacing between header and footer:

```html
<div class="pb-8">
  <!-- Your dialog content -->
</div>
```

### Responsive Sizing

Make dialogs responsive with Tailwind's responsive utilities:

```html
<DialogContent 
  dialogId="responsive-dialog" 
  className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-2xl">
  <!-- Content -->
</DialogContent>
```

## Accessibility

The Dialog component follows WAI-ARIA guidelines:

- **Focus Management** - Focus is trapped within the dialog when open
- **Keyboard Navigation** - Supports Tab, Shift+Tab, and Escape keys
- **Screen Reader Support** - Proper ARIA attributes and roles
- **Focus Restoration** - Returns focus to the trigger element when closed

### Keyboard Shortcuts

- `Escape` - Closes the dialog (if `closeOnEscape` is true)
- `Tab` / `Shift+Tab` - Navigate between focusable elements
- `Enter` / `Space` - Activate buttons and triggers

## Best Practices

1. **Unique Dialog IDs** - Always use unique `dialogId` values
2. **Meaningful Titles** - Provide clear, descriptive dialog titles
3. **Focus Management** - Ensure proper tab order within dialogs
4. **Mobile Responsiveness** - Test dialogs on mobile devices
5. **Loading States** - Show loading indicators for async operations
6. **Error Handling** - Display clear error messages when needed
7. **Content Length** - Keep dialog content concise and scannable

## Common Patterns

### Loading Dialog

```html
<DialogContent dialogId="loading-dialog" size="sm">
  <DialogHeader>
    <DialogTitle>Processing...</DialogTitle>
    <DialogDescription>Please wait while we process your request.</DialogDescription>
  </DialogHeader>
  
  <div class="pb-8 text-center">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
    <p class="mt-4 text-gray-600">This may take a few moments</p>
  </div>
</DialogContent>
```

### Multi-step Dialog

```typescript
@Component({
  template: `
    <DialogContent dialogId="wizard-dialog" size="lg">
      <DialogHeader>
        <DialogTitle>Setup Wizard - Step {{ currentStep }} of {{ totalSteps }}</DialogTitle>
        <DialogDescription>Complete the setup process</DialogDescription>
      </DialogHeader>

      <div class="pb-8">
        <!-- Step indicator -->
        <div class="flex items-center justify-between mb-6">
          <div *ngFor="let step of steps; let i = index" 
               class="flex items-center"
               [ngClass]="{ 'text-blue-600': i <= currentStep - 1, 'text-gray-400': i > currentStep - 1 }">
            <div class="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                 [ngClass]="{ 'border-blue-600 bg-blue-600 text-white': i <= currentStep - 1, 'border-gray-300': i > currentStep - 1 }">
              {{ i + 1 }}
            </div>
            <div *ngIf="i < steps.length - 1" class="w-16 h-0.5 bg-gray-300 mx-2"></div>
          </div>
        </div>

        <!-- Step content -->
        <div [ngSwitch]="currentStep">
          <div *ngSwitchCase="1">Step 1 content</div>
          <div *ngSwitchCase="2">Step 2 content</div>
          <div *ngSwitchCase="3">Step 3 content</div>
        </div>
      </div>

      <DialogFooter>
        <button 
          *ngIf="currentStep > 1"
          (click)="previousStep()"
          class="px-6 py-3 border text-gray-700 rounded-lg hover:bg-gray-50">
          Previous
        </button>
        <button 
          *ngIf="currentStep < totalSteps"
          (click)="nextStep()"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Next
        </button>
        <button 
          *ngIf="currentStep === totalSteps"
          (click)="complete()"
          class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Complete
        </button>
      </DialogFooter>
    </DialogContent>
  `
})
export class WizardDialogComponent {
  currentStep = 1;
  totalSteps = 3;
  steps = ['Basic Info', 'Preferences', 'Review'];

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  complete() {
    // Handle completion
    console.log('Wizard completed');
  }
}
```

## Troubleshooting

### Dialog Not Opening

1. Ensure `dialogId` matches between `DialogRoot`, `DialogTrigger`, and `DialogContent`
2. Check that the dialog service is properly injected
3. Verify that the dialog is not already open

### Styling Issues

1. Make sure Tailwind CSS is properly configured
2. Check for CSS conflicts with existing styles
3. Use browser dev tools to inspect applied styles

### Focus Issues

1. Ensure focusable elements have proper tab order
2. Check that `tabindex` attributes are not conflicting
3. Test with keyboard-only navigation

### Performance Issues

1. Avoid heavy computations in dialog content
2. Use OnPush change detection strategy when possible
3. Implement virtual scrolling for long lists

## API Reference

### DialogRoot

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dialogId` | `string` | - | Unique identifier for the dialog (required) |

### DialogTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dialogId` | `string` | - | Dialog ID to open (required) |
| `className` | `string` | `''` | Additional CSS classes |
| `disabled` | `boolean` | `false` | Whether the trigger is disabled |

### DialogContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dialogId` | `string` | - | Dialog ID (required) |
| `className` | `string` | `''` | Additional CSS classes |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Dialog size |
| `showCloseButton` | `boolean` | `true` | Show default close button |
| `closeButtonClass` | `string` | `'text-gray-400 hover:text-gray-600'` | Close button classes |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `closeOnOverlayClick` | `boolean` | `true` | Close on overlay click |
| `ariaLabelledby` | `string` | `''` | ARIA labelledby attribute |
| `ariaDescribedby` | `string` | `''` | ARIA describedby attribute |

### DialogHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |

### DialogTitle

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |

### DialogDescription

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |

### DialogFooter

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |

### DialogClose

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dialogId` | `string` | - | Dialog ID to close (required) |
| `className` | `string` | `''` | Additional CSS classes |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `ariaLabel` | `string` | `'Close dialog'` | ARIA label for accessibility |

### DialogService

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `open` | `id: string` | `void` | Opens a dialog |
| `close` | `id: string` | `void` | Closes a dialog |
| `closeAll` | - | `void` | Closes all dialogs |
| `isOpen` | `id: string` | `boolean` | Checks if dialog is open |

## Browser Support

The Dialog component supports all modern browsers:

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](../../LICENSE) for details.
