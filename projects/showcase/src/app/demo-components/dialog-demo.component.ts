import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay
} from '../../../../lib/src/lib/dialog';

@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [
    CommonModule,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogOverlay
  ],
  templateUrl: './dialog-demo.component.html'
})
export class DialogDemoComponent {
  // Dialog IDs for managing multiple dialogs
  dialogIds = {
    basic: 'basic-dialog',
    form: 'form-dialog',
    confirmation: 'confirmation-dialog',
    customSize: 'custom-size-dialog',
    scrollable: 'scrollable-dialog'
  };

  // Form data signal
  formData = signal({
    name: '',
    email: '',
    message: ''
  });

  // Dialog result signal
  dialogResult = signal('');

  // Update form field method
  updateFormField(field: string, value: string) {
    this.formData.update(current => ({
      ...current,
      [field]: value
    }));
  }

  // Dialog submit handler
  onDialogSubmit() {
    const data = this.formData();
    this.dialogResult.set(`Form submitted: Name: ${data.name}, Email: ${data.email}, Message: ${data.message}`);
  }

  // Dialog confirm handler
  onDialogConfirm() {
    this.dialogResult.set('Action confirmed successfully!');
  }

  // Reset form data
  resetFormData() {
    this.formData.set({
      name: '',
      email: '',
      message: ''
    });
  }
}
