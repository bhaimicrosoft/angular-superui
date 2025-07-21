import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DialogRoot,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogService
} from '@lib/dialog';
import { SEOService } from '../services/seo.service';

interface FormData {
  name: string;
  email: string;
  role: string;
  message: string;
}

@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogRoot,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose
  ],
  templateUrl: './dialog-demo.component.html'
})
export class DialogDemoComponent implements OnInit {
  private dialogService = inject(DialogService);
  private seoService = inject(SEOService);

  ngOnInit() {
    // Update SEO for dialog component page
    this.seoService.updateSEO(this.seoService.getComponentSEO('dialog'));
  }

  formData: FormData = {
    name: '',
    email: '',
    role: '',
    message: ''
  };

  notifications = [
    { id: 1, type: 'success', title: 'Success!', message: 'Your account has been created successfully.', time: '2 min ago' },
    { id: 2, type: 'warning', title: 'Warning', message: 'Your storage is almost full. Please upgrade.', time: '5 min ago' },
    { id: 3, type: 'info', title: 'New Feature', message: 'Dark mode is now available in settings.', time: '1 hour ago' },
    { id: 4, type: 'error', title: 'Error', message: 'Failed to sync data. Please try again.', time: '2 hours ago' }
  ];

  handleFormSubmit(dialogId: string) {
    if (this.formData.name && this.formData.email) {
      console.log('Form submitted:', this.formData);
      this.dialogService.close(dialogId);
      this.resetForm();
    } else {
      alert('Please fill in all required fields');
    }
  }

  handleConfirmDelete(dialogId: string) {
    console.log('Item deleted');
    this.dialogService.close(dialogId);
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      role: '',
      message: ''
    };
  }

  openDialog(dialogId: string) {
    this.dialogService.open(dialogId);
  }

  closeDialog(dialogId: string) {
    this.dialogService.close(dialogId);
  }
}
