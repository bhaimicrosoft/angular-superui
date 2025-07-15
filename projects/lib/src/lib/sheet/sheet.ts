import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

// Sheet Root Component
@Component({
  selector: 'lib-sheet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
})
export class Sheet {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
}

// Sheet Content
@Component({
  selector: 'lib-sheet-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Backdrop -->
    <div 
      *ngIf="open"
      class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      [attr.data-state]="open ? 'open' : 'closed'"
      (click)="onBackdropClick()"
    ></div>

    <!-- Sheet Content -->
    <div
      *ngIf="open"
      [class]="cn(sheetVariants({ side }), className)"
      [attr.data-state]="open ? 'open' : 'closed'"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class SheetContent {
  @Input() open = false;
  @Input() side: VariantProps<typeof sheetVariants>['side'] = 'right';
  @Input() className?: string;
  @Output() openChange = new EventEmitter<boolean>();

  cn = cn;
  sheetVariants = sheetVariants;

  onBackdropClick() {
    this.open = false;
    this.openChange.emit(this.open);
  }
}

// Sheet Header
@Component({
  selector: 'lib-sheet-header',
  standalone: true,
  template: `
    <div class="flex flex-col space-y-2 text-center sm:text-left" [class]="className">
      <ng-content></ng-content>
    </div>
  `,
})
export class SheetHeader {
  @Input() className?: string;
}

// Sheet Title
@Component({
  selector: 'lib-sheet-title',
  standalone: true,
  template: `
    <h2 class="text-lg font-semibold text-foreground" [class]="className">
      <ng-content></ng-content>
    </h2>
  `,
})
export class SheetTitle {
  @Input() className?: string;
}

// Sheet Description
@Component({
  selector: 'lib-sheet-description',
  standalone: true,
  template: `
    <p class="text-sm text-muted-foreground" [class]="className">
      <ng-content></ng-content>
    </p>
  `,
})
export class SheetDescription {
  @Input() className?: string;
}

// Sheet Footer
@Component({
  selector: 'lib-sheet-footer',
  standalone: true,
  template: `
    <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2" [class]="className">
      <ng-content></ng-content>
    </div>
  `,
})
export class SheetFooter {
  @Input() className?: string;
}

// Sheet Trigger (Button)
@Component({
  selector: 'lib-sheet-trigger',
  standalone: true,
  template: `
    <button
      type="button"
      (click)="onClick()"
      [class]="className"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class SheetTrigger {
  @Input() className?: string;
  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}

// Sheet Close Button
@Component({
  selector: 'lib-sheet-close',
  standalone: true,
  template: `
    <button
      type="button"
      (click)="onClick()"
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
      [class]="className"
    >
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
      <span class="sr-only">Close</span>
    </button>
  `,
})
export class SheetClose {
  @Input() className?: string;
  @Output() close = new EventEmitter<void>();

  onClick() {
    this.close.emit();
  }
}
