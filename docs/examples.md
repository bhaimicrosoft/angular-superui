# Examples

Explore practical examples of Angular SuperUI components in different scenarios.

## Basic Examples

### Simple Alert

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-alert',
  template: `
    <lib-alert>
      Your message has been sent successfully!
    </lib-alert>
  `
})
export class BasicAlertComponent {}
```

### Alert with Custom Content

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  template: `
    <lib-alert variant="success">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
      <div>
        <h4 class="font-medium">Success!</h4>
        <p class="text-sm">Your operation completed successfully.</p>
      </div>
    </lib-alert>
  `
})
export class CustomAlertComponent {}
```

### Button Variants

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-button-showcase',
  template: `
    <div class="flex flex-wrap gap-4">
      <lib-button>Default</lib-button>
      <lib-button variant="destructive">Delete</lib-button>
      <lib-button variant="outline">Cancel</lib-button>
      <lib-button variant="secondary">Secondary</lib-button>
      <lib-button variant="ghost">Ghost</lib-button>
      <lib-button variant="link">Link</lib-button>
    </div>
  `
})
export class ButtonShowcaseComponent {}
```

### Input with Simple Binding

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-input-example',
  template: `
    <div class="space-y-2">
      <label for="email" class="text-sm font-medium">Email</label>
      <lib-input
        id="email"
        type="email"
        placeholder="Enter your email"
        (input)="handleInput($event)">
      </lib-input>
      <div *ngIf="showError" class="text-sm text-red-600">
        Please enter a valid email address
      </div>
    </div>
  `
})
export class InputExampleComponent {
  showError = false;

  handleInput(event: any) {
    const value = event.target.value;
    this.showError = value && !value.includes('@');
  }
}
```

## Advanced Examples

### Simple Alert System

```typescript
import { Component } from '@angular/core';

export interface AlertData {
  id: string;
  message: string;
  variant: 'default' | 'destructive' | 'success' | 'warning';
}

@Component({
  selector: 'app-alert-system',
  template: `
    <div class="space-y-4">
      <!-- Control buttons -->
      <div class="space-x-2">
        <lib-button (click)="showSuccess()">Success</lib-button>
        <lib-button (click)="showError()" variant="destructive">Error</lib-button>
        <lib-button (click)="showWarning()">Warning</lib-button>
        <lib-button (click)="clearAlerts()" variant="outline">Clear All</lib-button>
      </div>

      <!-- Alert display -->
      <div class="space-y-2">
        <lib-alert
          *ngFor="let alert of alerts"
          [variant]="alert.variant">
          {{ alert.message }}
        </lib-alert>
      </div>
    </div>
  `
})
export class AlertSystemComponent {
  alerts: AlertData[] = [];

  showSuccess() {
    this.addAlert({
      message: 'Operation completed successfully!',
      variant: 'success'
    });
  }

  showError() {
    this.addAlert({
      message: 'An error occurred. Please try again.',
      variant: 'destructive'
    });
  }

  showWarning() {
    this.addAlert({
      message: 'Please review your input before proceeding.',
      variant: 'warning'
    });
  }

  private addAlert(alert: Omit<AlertData, 'id'>) {
    const newAlert: AlertData = {
      ...alert,
      id: Math.random().toString(36).substr(2, 9)
    };
    this.alerts.push(newAlert);
  }

  clearAlerts() {
    this.alerts = [];
  }
}
```

### Simple Contact Form

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  template: `
    <form (ngSubmit)="onSubmit()" class="space-y-6 max-w-md">
      <div class="space-y-2">
        <label for="name" class="text-sm font-medium">Name</label>
        <lib-input
          id="name"
          placeholder="Your full name"
          [(ngModel)]="formData.name"
          name="name">
        </lib-input>
        <div *ngIf="errors.name" class="text-sm text-red-600">
          {{ errors.name }}
        </div>
      </div>

      <div class="space-y-2">
        <label for="email" class="text-sm font-medium">Email</label>
        <lib-input
          id="email"
          type="email"
          placeholder="your@email.com"
          [(ngModel)]="formData.email"
          name="email">
        </lib-input>
        <div *ngIf="errors.email" class="text-sm text-red-600">
          {{ errors.email }}
        </div>
      </div>

      <div class="space-y-2">
        <label for="message" class="text-sm font-medium">Message</label>
        <textarea
          id="message"
          class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Your message..."
          [(ngModel)]="formData.message"
          name="message">
        </textarea>
        <div *ngIf="errors.message" class="text-sm text-red-600">
          {{ errors.message }}
        </div>
      </div>

      <div class="flex space-x-4">
        <lib-button type="submit">
          Send Message
        </lib-button>
        <lib-button type="button" variant="outline" (click)="resetForm()">
          Reset
        </lib-button>
      </div>

      <lib-alert 
        *ngIf="submitStatus === 'success'"
        variant="success">
        Message sent successfully!
      </lib-alert>

      <lib-alert 
        *ngIf="submitStatus === 'error'"
        variant="destructive">
        Failed to send message. Please try again.
      </lib-alert>
    </form>
  `
})
export class ContactFormComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };
  
  errors: any = {};
  submitStatus: 'success' | 'error' | null = null;

  onSubmit() {
    this.errors = {};
    
    // Simple validation
    if (!this.formData.name) this.errors.name = 'Name is required';
    if (!this.formData.email) this.errors.email = 'Email is required';
    if (!this.formData.message) this.errors.message = 'Message is required';
    
    if (Object.keys(this.errors).length === 0) {
      // Simulate API call
      setTimeout(() => {
        this.submitStatus = Math.random() > 0.5 ? 'success' : 'error';
        if (this.submitStatus === 'success') {
          this.resetForm();
        }
      }, 1000);
    }
  }

  resetForm() {
    this.formData = { name: '', email: '', message: '' };
    this.errors = {};
    this.submitStatus = null;
  }
}
```

### Button States Example

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-button-states',
  template: `
    <div class="space-y-4">
      <lib-button (click)="toggleLoading()">
        {{ isLoading ? 'Loading...' : 'Start Process' }}
      </lib-button>

      <lib-input 
        placeholder="Enter data..."
        [disabled]="isLoading">
      </lib-input>

      <lib-alert 
        *ngIf="isLoading"
        variant="default">
        Processing your request, please wait...
      </lib-alert>
      
      <lib-alert 
        *ngIf="completed"
        variant="success">
        Process completed successfully!
      </lib-alert>
    </div>
  `
})
export class ButtonStatesComponent {
  isLoading = false;
  completed = false;

  toggleLoading() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.completed = false;
    
    setTimeout(() => {
      this.isLoading = false;
      this.completed = true;
      
      // Clear completed status after 3 seconds
      setTimeout(() => {
        this.completed = false;
      }, 3000);
    }, 3000);
  }
}
```

### Error Handling Example

```typescript
import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-error-handling',
  template: `
    <div class="space-y-4">
      <lib-button (click)="fetchData()">Fetch Data</lib-button>

      <lib-alert 
        *ngIf="error"
        variant="destructive">
        <strong>Error:</strong> {{ error }}
      </lib-alert>

      <div *ngIf="data" class="p-4 border rounded-md">
        <pre>{{ data | json }}</pre>
      </div>
    </div>
  `
})
export class ErrorHandlingComponent {
  data: any = null;
  error: string | null = null;
  loading = false;

  constructor(private http: HttpClient) {}

  fetchData() {
    this.loading = true;
    this.error = null;
    
    this.http.get('https://jsonplaceholder.typicode.com/posts/1')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An unexpected error occurred';
          
          if (error.status === 404) {
            errorMessage = 'Resource not found';
          } else if (error.status === 500) {
            errorMessage = 'Server error occurred';
          } else if (error.status === 0) {
            errorMessage = 'Network error - please check your connection';
          }
          
          this.error = errorMessage;
          return throwError(() => error);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.data = response;
        }
      });
  }
}
```

## Integration Examples

### Using Angular SuperUI with Angular Material

```typescript
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-hybrid-example',
  template: `
    <div class="space-y-4">
      <lib-button (click)="openDialog()">
        Open Material Dialog
      </lib-button>
      
      <!-- Using SuperUI components inside Material layout -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>User Profile</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="space-y-4">
            <lib-input placeholder="Full Name"></lib-input>
            <lib-input type="email" placeholder="Email"></lib-input>
            <lib-alert>
              Please verify your email address
            </lib-alert>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <lib-button>Save</lib-button>
          <lib-button variant="outline">Cancel</lib-button>
        </mat-card-actions>
      </mat-card>
    </div>
  `
})
export class HybridExampleComponent {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogComponent);
  }
}

@Component({
  template: `
    <h2 mat-dialog-title>Confirm Action</h2>
    <mat-dialog-content>
      <lib-alert variant="warning" class="mb-4">
        This action cannot be undone.
      </lib-alert>
      <p>Are you sure you want to proceed?</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <lib-button variant="outline" (click)="close()">Cancel</lib-button>
      <lib-button variant="destructive" (click)="confirm()">Delete</lib-button>
    </mat-dialog-actions>
  `
})
export class DialogComponent {
  constructor(private dialogRef: MatDialog) {}

  close() {
    this.dialogRef.closeAll();
  }

  confirm() {
    // Handle confirmation
    this.dialogRef.closeAll();
  }
}
```

### Using Angular SuperUI with PrimeNG

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-primeng-integration',
  template: `
    <p-panel header="Settings">
      <div class="space-y-4">
        <div class="field">
          <label for="username">Username</label>
          <lib-input id="username" placeholder="Enter username"></lib-input>
        </div>
        
        <div class="field">
          <label for="notifications">Enable Notifications</label>
          <p-inputSwitch [(ngModel)]="notifications"></p-inputSwitch>
        </div>
        
        <lib-alert *ngIf="notifications" variant="success">
          Notifications are enabled
        </lib-alert>
        
        <div class="flex justify-end space-x-2">
          <lib-button variant="outline">Reset</lib-button>
          <lib-button>Save Settings</lib-button>
        </div>
      </div>
    </p-panel>
  `
})
export class PrimeNGIntegrationComponent {
  notifications = false;
}
```

## Performance Examples

### Simple List with Search

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-searchable-list',
  template: `
    <div class="space-y-2">
      <lib-input 
        placeholder="Search..."
        (input)="onSearch($event)">
      </lib-input>
      
      <div class="space-y-2 max-h-96 overflow-y-auto">
        <div 
          *ngFor="let item of filteredItems; trackBy: trackByFn"
          class="p-3 border rounded-md">
          {{ item.name }}
        </div>
      </div>
      
      <lib-button 
        *ngIf="hasMore"
        (click)="loadMore()"
        variant="outline">
        Load More ({{ remainingCount }} remaining)
      </lib-button>
    </div>
  `
})
export class SearchableListComponent {
  allItems = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`
  }));
  
  filteredItems = this.allItems.slice(0, 10);
  searchTerm = '';
  displayCount = 10;
  
  get hasMore(): boolean {
    return this.displayCount < this.getFilteredData().length;
  }
  
  get remainingCount(): number {
    return this.getFilteredData().length - this.displayCount;
  }
  
  private getFilteredData() {
    return this.searchTerm 
      ? this.allItems.filter(item => 
          item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : this.allItems;
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.displayCount = 10;
    this.updateFilteredItems();
  }

  loadMore() {
    this.displayCount += 10;
    this.updateFilteredItems();
  }
  
  private updateFilteredItems() {
    const filtered = this.getFilteredData();
    this.filteredItems = filtered.slice(0, this.displayCount);
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }
}
```

These examples demonstrate real-world usage patterns with Angular SuperUI components, showing how to build practical applications while working within the actual capabilities of the library.
