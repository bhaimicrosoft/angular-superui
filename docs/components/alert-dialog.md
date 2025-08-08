# AlertDialog

A modal dialog that interrupts the user with important content and expects a response.

## Installation

The AlertDialog component is available as part of Angular SuperUI. If you haven't initialized Angular SuperUI in your project yet, run:

```bash
ngsui-cli init
```

Then add the AlertDialog component to your project:

```bash
ngsui-cli add alert-dialog
```

## Usage

Import the AlertDialog components in your Angular component:

```typescript
import { Component } from '@angular/core';
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
} from '@components/alert-dialog';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    AlertDialog,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel
  ],
  template: `
    <AlertDialog [isOpen]="showDialog" (openChange)="showDialog = $event">
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel (cancelClick)="showDialog = false">Cancel</AlertDialogCancel>
        <AlertDialogAction variant="destructive" (actionClick)="confirmDelete()">
          Delete Account
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialog>
  `
})
export class ExampleComponent {
  showDialog = false;

  confirmDelete() {
    // Handle delete action
    this.showDialog = false;
  }
}
```

## Examples

### Basic AlertDialog

```typescript
@Component({
  template: `
    <Button variant="destructive" (buttonClick)="openDeleteDialog()">
      Delete Account
    </Button>
    
    <AlertDialog 
      [isOpen]="isDeleteDialogOpen()"
      (openChange)="isDeleteDialogOpen.set($event)"
      [accessibility]="{
        ariaLabel: 'Delete account confirmation',
        ariaLabelledBy: 'delete-title',
        ariaDescribedBy: 'delete-description',
        role: 'alertdialog',
        announceText: 'Delete account confirmation dialog opened'
      }">
      <AlertDialogHeader>
        <AlertDialogTitle id="delete-title">Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription id="delete-description">
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel (cancelClick)="cancelDialog('delete')">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction 
          variant="destructive" 
          (actionClick)="handleDelete()">
          Delete Account
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialog>
  `
})
export class BasicExample {
  isDeleteDialogOpen = signal(false);

  openDeleteDialog() {
    this.isDeleteDialogOpen.set(true);
  }

  handleDelete() {
    console.log('Account deleted!');
    this.isDeleteDialogOpen.set(false);
  }

  cancelDialog(type: string) {
    this.isDeleteDialogOpen.set(false);
  }
}
```

### Secondary Action Dialog

```typescript
@Component({
  template: `
    <Button variant="outline" (buttonClick)="openLogoutDialog()">
      Logout
    </Button>
    
    <AlertDialog 
      [isOpen]="isLogoutDialogOpen()"
      (openChange)="isLogoutDialogOpen.set($event)"
      [accessibility]="{
        ariaLabel: 'Logout confirmation',
        ariaLabelledBy: 'logout-title',
        ariaDescribedBy: 'logout-description',
        role: 'dialog'
      }">
      <AlertDialogHeader>
        <AlertDialogTitle id="logout-title">Sign out of your account?</AlertDialogTitle>
        <AlertDialogDescription id="logout-description">
          You will need to sign in again to access your account.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel (cancelClick)="cancelDialog('logout')">
          Stay signed in
        </AlertDialogCancel>
        <AlertDialogAction 
          variant="secondary" 
          (actionClick)="handleLogout()">
          Sign out
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialog>
  `
})
export class LogoutExample {
  isLogoutDialogOpen = signal(false);

  openLogoutDialog() {
    this.isLogoutDialogOpen.set(true);
  }

  handleLogout() {
    console.log('User logged out!');
    this.isLogoutDialogOpen.set(false);
  }

  cancelDialog(type: string) {
    this.isLogoutDialogOpen.set(false);
  }
}
```

### Prevent Close on Overlay Click

```typescript
@Component({
  template: `
    <Button variant="default" (buttonClick)="openConfirmDialog()">
      Confirm Action
    </Button>
    
    <AlertDialog 
      [isOpen]="isConfirmDialogOpen()"
      (openChange)="isConfirmDialogOpen.set($event)"
      [preventCloseOnOverlayClick]="true"
      [accessibility]="{
        ariaLabel: 'Action confirmation',
        ariaLabelledBy: 'confirm-title',
        ariaDescribedBy: 'confirm-description',
        role: 'alertdialog',
        ariaLive: 'assertive'
      }">
      <AlertDialogHeader>
        <AlertDialogTitle id="confirm-title">Confirm your action</AlertDialogTitle>
        <AlertDialogDescription id="confirm-description">
          Please confirm that you want to proceed with this action. This dialog 
          cannot be dismissed by clicking outside.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel (cancelClick)="cancelDialog('confirm')">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction 
          variant="default" 
          (actionClick)="handleConfirm()">
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialog>
  `
})
export class ConfirmExample {
  isConfirmDialogOpen = signal(false);

  openConfirmDialog() {
    this.isConfirmDialogOpen.set(true);
  }

  handleConfirm() {
    console.log('Action confirmed!');
    this.isConfirmDialogOpen.set(false);
  }

  cancelDialog(type: string) {
    this.isConfirmDialogOpen.set(false);
  }
}
```

### Custom Styling

```typescript
@Component({
  template: `
    <AlertDialog 
      [isOpen]="showCustomDialog" 
      (openChange)="showCustomDialog = $event"
      contentClass="max-w-md"
      overlayClass="bg-black/50"
    >
      <AlertDialogHeader>
        <AlertDialogTitle class="text-blue-600">Custom Dialog</AlertDialogTitle>
        <AlertDialogDescription class="text-gray-600">
          This dialog has custom styling applied.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel 
          (cancelClick)="showCustomDialog = false"
          class="bg-gray-100 hover:bg-gray-200"
        >
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction 
          variant="secondary"
          (actionClick)="handleCustomAction()"
          class="bg-blue-600 hover:bg-blue-700"
        >
          Apply
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialog>
  `
})
export class CustomExample {
  showCustomDialog = false;

  handleCustomAction() {
    console.log('Custom action');
    this.showCustomDialog = false;
  }
}
```

### Accessibility Features

```typescript
@Component({
  template: `
    <AlertDialog 
      [isOpen]="showAccessibleDialog" 
      (openChange)="showAccessibleDialog = $event"
      [accessibility]="{
        ariaLabelledBy: 'dialog-title',
        ariaDescribedBy: 'dialog-description',
        role: 'alertdialog'
      }"
      (escapeKeyDown)="onEscapePressed($event)"
    >
      <AlertDialogHeader>
        <AlertDialogTitle id="dialog-title">
          Confirm Action
        </AlertDialogTitle>
        <AlertDialogDescription id="dialog-description">
          This action will affect your account settings.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel (cancelClick)="showAccessibleDialog = false">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction (actionClick)="confirmAction()">
          Confirm
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialog>
  `
})
export class AccessibleExample {
  showAccessibleDialog = false;

  onEscapePressed(event: KeyboardEvent) {
    console.log('Escape pressed');
  }

  confirmAction() {
    console.log('Action confirmed');
    this.showAccessibleDialog = false;
  }
}
```

### Prevent Auto-Close

```typescript
@Component({
  template: `
    <AlertDialog 
      [isOpen]="showPersistentDialog" 
      (openChange)="showPersistentDialog = $event"
      [preventCloseOnOverlayClick]="true"
      [preventCloseOnEscape]="true"
    >
      <AlertDialogHeader>
        <AlertDialogTitle>Important Notice</AlertDialogTitle>
        <AlertDialogDescription>
          This dialog cannot be closed by clicking outside or pressing escape.
          You must make a choice.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction variant="secondary" (actionClick)="showPersistentDialog = false">
          I Understand
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialog>
  `
})
export class PersistentExample {
  showPersistentDialog = false;
}
```

## API Reference

### AlertDialog Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Whether the alert dialog is open |
| `overlayClass` | `string` | `''` | Additional CSS classes for the overlay |
| `contentClass` | `string` | `''` | Additional CSS classes for the content |
| `accessibility` | `AlertDialogAccessibility` | `{}` | Accessibility configuration |
| `preventCloseOnOverlayClick` | `boolean` | `false` | Prevent closing when clicking outside |
| `preventCloseOnEscape` | `boolean` | `false` | Prevent closing when pressing escape |

### AlertDialog Events

| Event | Type | Description |
|-------|------|-------------|
| `openChange` | `EventEmitter<boolean>` | Emitted when dialog open state changes |
| `escapeKeyDown` | `EventEmitter<KeyboardEvent>` | Emitted when escape key is pressed |

### AlertDialogAction Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'secondary'` | `'default'` | Button variant |
| `type` | `'button' \| 'submit'` | `'button'` | Button type |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `class` | `string` | `''` | Additional CSS classes |

### AlertDialogAction Events

| Event | Type | Description |
|-------|------|-------------|
| `actionClick` | `EventEmitter<MouseEvent>` | Emitted when action button is clicked |
| `actionKeyDown` | `EventEmitter<KeyboardEvent>` | Emitted when key is pressed on action button |

### AlertDialogCancel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'button' \| 'submit'` | `'button'` | Button type |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `class` | `string` | `''` | Additional CSS classes |

### AlertDialogCancel Events

| Event | Type | Description |
|-------|------|-------------|
| `cancelClick` | `EventEmitter<MouseEvent>` | Emitted when cancel button is clicked |
| `cancelKeyDown` | `EventEmitter<KeyboardEvent>` | Emitted when key is pressed on cancel button |

### AlertDialogTitle Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | `'alert-dialog-title'` | Element ID for ARIA references |
| `class` | `string` | `''` | Additional CSS classes |

### AlertDialogDescription Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | `'alert-dialog-description'` | Element ID for ARIA references |
| `class` | `string` | `''` | Additional CSS classes |

### AlertDialogAccessibility Interface

```typescript
interface AlertDialogAccessibility {
  /** ARIA label for the dialog */
  ariaLabel?: string;
  /** ARIA labelledby referencing the title element */
  ariaLabelledBy?: string;
  /** ARIA describedby referencing the description element */
  ariaDescribedBy?: string;
  /** Role override for the dialog */
  role?: 'dialog' | 'alertdialog';
}
```

## Styling

The AlertDialog component uses Tailwind CSS classes and supports custom styling:

### Custom Classes

```typescript
@Component({
  template: `
    <AlertDialog 
      contentClass="max-w-2xl bg-blue-50 border-blue-200"
      overlayClass="bg-blue-900/20"
    >
      <!-- Content -->
    </AlertDialog>
  `
})
```

### Component Variants

- **Overlay**: Backdrop with blur effect
- **Content**: Centered modal container with animations
- **Action Variants**: Default, Destructive, Secondary
- **Cancel**: Outlined style button

## Accessibility

The AlertDialog component is built with accessibility in mind:

- **Focus Management**: Automatic focus trapping and restoration
- **Keyboard Navigation**: Tab navigation within dialog, Escape to close
- **ARIA Support**: Full ARIA labeling and role support
- **Screen Reader**: Proper announcements and descriptions
- **Focus Trap**: Prevents focus from leaving the dialog
- **Auto Focus**: Focuses first interactive element on open

### Best Practices

1. **Use descriptive titles**: Clearly describe the action or question
2. **Provide clear descriptions**: Explain the consequences of actions
3. **Use appropriate variants**: Destructive for dangerous actions
4. **Handle keyboard events**: Always provide keyboard alternatives
5. **Test with screen readers**: Verify the dialog works with assistive technology
6. **Provide clear actions**: Make it obvious what each button does

## Examples in Real Applications

### Confirmation Dialog

```typescript
@Component({
  template: `
    <AlertDialog [isOpen]="showConfirmation" (openChange)="showConfirmation = $event">
      <AlertDialogHeader>
        <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to submit this form? You won't be able to edit it afterwards.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel (cancelClick)="showConfirmation = false">
          Review Again
        </AlertDialogCancel>
        <AlertDialogAction (actionClick)="submitForm()">
          Submit Form
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialog>
  `
})
```

### Error Dialog

```typescript
@Component({
  template: `
    <AlertDialog [isOpen]="showError" (openChange)="showError = $event">
      <AlertDialogHeader>
        <AlertDialogTitle class="text-red-600">Error Occurred</AlertDialogTitle>
        <AlertDialogDescription>
          {{ errorMessage }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction (actionClick)="showError = false">
          OK
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialog>
  `
})
export class ErrorDialogExample {
  showError = false;
  errorMessage = '';

  showErrorDialog(message: string) {
    this.errorMessage = message;
    this.showError = true;
  }
}
```

### Save Changes Dialog

```typescript
@Component({
  template: `
    <AlertDialog [isOpen]="showSaveDialog" (openChange)="showSaveDialog = $event">
      <AlertDialogHeader>
        <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
        <AlertDialogDescription>
          You have unsaved changes. Would you like to save them before leaving?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel (cancelClick)="discardChanges()">
          Discard
        </AlertDialogCancel>
        <AlertDialogAction variant="secondary" (actionClick)="saveChanges()">
          Save Changes
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialog>
  `
})
```
