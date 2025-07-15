import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const dialogVariants = cva(
  'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg',
  {
    variants: {
      variant: {
        default: 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Component({
  selector: 'lib-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="open" class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" (click)="onBackdropClick()"></div>
    <div *ngIf="open" [class]="dialogClass">
      <ng-content></ng-content>
    </div>
  `
})
export class Dialog {
  @Input() open = false;
  @Input() class = '';
  @Input() variant: VariantProps<typeof dialogVariants>['variant'] = 'default';
  @Output() openChange = new EventEmitter<boolean>();

  public get dialogClass(): string {
    return cn(dialogVariants({ variant: this.variant }), this.class);
  }

  onBackdropClick() {
    this.open = false;
    this.openChange.emit(false);
  }
}

@Component({
  selector: 'lib-dialog-trigger',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`
})
export class DialogTrigger {}

@Component({
  selector: 'lib-dialog-content',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`
})
export class DialogContent {}

@Component({
  selector: 'lib-dialog-header',
  standalone: true,
  imports: [],
  template: `<div class="flex flex-col space-y-1.5 text-center sm:text-left"><ng-content></ng-content></div>`
})
export class DialogHeader {}

@Component({
  selector: 'lib-dialog-title',
  standalone: true,
  imports: [],
  template: `<h3 class="text-lg font-semibold leading-none tracking-tight"><ng-content></ng-content></h3>`
})
export class DialogTitle {}

@Component({
  selector: 'lib-dialog-description',
  standalone: true,
  imports: [],
  template: `<p class="text-sm text-muted-foreground"><ng-content></ng-content></p>`
})
export class DialogDescription {}

@Component({
  selector: 'lib-dialog-footer',
  standalone: true,
  imports: [],
  template: `<div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"><ng-content></ng-content></div>`
})
export class DialogFooter {}
