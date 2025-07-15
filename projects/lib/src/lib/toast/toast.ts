import { Component, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive: 'destructive group border-destructive bg-destructive text-destructive-foreground',
        success: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-900 dark:text-green-100',
        warning: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastData[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  show(toast: Omit<ToastData, 'id'>): string {
    const id = this.generateId();
    const newToast: ToastData = {
      id,
      duration: 5000,
      variant: 'default',
      ...toast,
    };

    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, newToast]);

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, newToast.duration);
    }

    return id;
  }

  dismiss(id: string): void {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter(toast => toast.id !== id));
  }

  dismissAll(): void {
    this.toastsSubject.next([]);
  }

  success(title: string, description?: string): string {
    return this.show({ title, description, variant: 'success' });
  }

  error(title: string, description?: string): string {
    return this.show({ title, description, variant: 'destructive' });
  }

  warning(title: string, description?: string): string {
    return this.show({ title, description, variant: 'warning' });
  }

  info(title: string, description?: string): string {
    return this.show({ title, description, variant: 'default' });
  }
}

@Component({
  selector: 'lib-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="toastClass" [attr.data-state]="'open'">
      <div class="grid gap-1">
        <div *ngIf="title" class="text-sm font-semibold">{{ title }}</div>
        <div *ngIf="description" class="text-sm opacity-90">{{ description }}</div>
      </div>
      <button
        class="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
        (click)="onDismiss()">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `
})
export class Toast {
  @Input() title = '';
  @Input() description = '';
  @Input() variant: VariantProps<typeof toastVariants>['variant'] = 'default';
  @Input() class = '';
  @Output() dismiss = new EventEmitter<void>();

  public get toastClass(): string {
    return cn(toastVariants({ variant: this.variant }), this.class);
  }

  onDismiss() {
    this.dismiss.emit();
  }
}

@Component({
  selector: 'lib-toast-container',
  standalone: true,
  imports: [CommonModule, Toast],
  template: `
    <div class="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      <lib-toast
        *ngFor="let toast of toasts"
        [title]="toast.title || ''"
        [description]="toast.description || ''"
        [variant]="toast.variant || 'default'"
        (dismiss)="dismissToast(toast.id)">
      </lib-toast>
    </div>
  `
})
export class ToastContainer {
  toasts: ToastData[] = [];

  constructor(private toastService: ToastService) {
    this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  dismissToast(id: string) {
    this.toastService.dismiss(id);
  }
}
