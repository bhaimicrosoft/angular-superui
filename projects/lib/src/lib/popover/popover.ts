import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const popoverVariants = cva(
  'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Popover Root
@Component({
  selector: 'lib-popover',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block">
      <ng-content></ng-content>
    </div>
  `,
})
export class Popover {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
}

// Popover Trigger
@Component({
  selector: 'lib-popover-trigger',
  standalone: true,
  template: `
    <button
      #triggerRef
      type="button"
      (click)="toggle()"
      [class]="className"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class PopoverTrigger {
  @Input() className?: string;
  @Output() click = new EventEmitter<void>();
  @ViewChild('triggerRef') triggerRef!: ElementRef;

  toggle() {
    this.click.emit();
  }
}

// Popover Content
@Component({
  selector: 'lib-popover-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="open"
      #contentRef
      [class]="cn(popoverVariants({ variant }), 'absolute z-50', getPositionClass(), className)"
      [attr.data-state]="open ? 'open' : 'closed'"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class PopoverContent {
  @Input() open = false;
  @Input() variant: VariantProps<typeof popoverVariants>['variant'] = 'default';
  @Input() side: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
  @Input() align: 'start' | 'center' | 'end' = 'center';
  @Input() className?: string;
  @ViewChild('contentRef') contentRef!: ElementRef;

  cn = cn;
  popoverVariants = popoverVariants;

  getPositionClass(): string {
    const sideClasses = {
      top: 'bottom-full mb-2',
      right: 'left-full ml-2',
      bottom: 'top-full mt-2',
      left: 'right-full mr-2',
    };

    const alignClasses = {
      start: this.side === 'top' || this.side === 'bottom' ? 'left-0' : 'top-0',
      center: this.side === 'top' || this.side === 'bottom' ? 'left-1/2 -translate-x-1/2' : 'top-1/2 -translate-y-1/2',
      end: this.side === 'top' || this.side === 'bottom' ? 'right-0' : 'bottom-0',
    };

    return `${sideClasses[this.side]} ${alignClasses[this.align]}`;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.open && this.contentRef && !this.contentRef.nativeElement.contains(event.target)) {
      // Close popover when clicking outside
      // This would typically be handled by the parent component
    }
  }
}

// Combined Popover Component for easier usage
@Component({
  selector: 'lib-popover-simple',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block" #containerRef>
      <button
        type="button"
        (click)="toggle()"
        [class]="triggerClassName"
      >
        <ng-content select="[slot=trigger]"></ng-content>
      </button>

      <div
        *ngIf="isOpen"
        [class]="cn(popoverVariants({ variant }), 'absolute z-50', getPositionClass(), contentClassName)"
        [attr.data-state]="isOpen ? 'open' : 'closed'"
      >
        <ng-content select="[slot=content]"></ng-content>
      </div>
    </div>

    <!-- Backdrop for closing -->
    <div
      *ngIf="isOpen"
      class="fixed inset-0 z-40"
      (click)="close()"
    ></div>
  `,
})
export class PopoverSimple {
  @Input() variant: VariantProps<typeof popoverVariants>['variant'] = 'default';
  @Input() side: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
  @Input() align: 'start' | 'center' | 'end' = 'center';
  @Input() triggerClassName?: string;
  @Input() contentClassName?: string;
  @Output() openChange = new EventEmitter<boolean>();

  isOpen = false;

  cn = cn;
  popoverVariants = popoverVariants;

  toggle() {
    this.isOpen = !this.isOpen;
    this.openChange.emit(this.isOpen);
  }

  close() {
    this.isOpen = false;
    this.openChange.emit(this.isOpen);
  }

  getPositionClass(): string {
    const sideClasses = {
      top: 'bottom-full mb-2',
      right: 'left-full ml-2',
      bottom: 'top-full mt-2',
      left: 'right-full mr-2',
    };

    const alignClasses = {
      start: this.side === 'top' || this.side === 'bottom' ? 'left-0' : 'top-0',
      center: this.side === 'top' || this.side === 'bottom' ? 'left-1/2 -translate-x-1/2' : 'top-1/2 -translate-y-1/2',
      end: this.side === 'top' || this.side === 'bottom' ? 'right-0' : 'bottom-0',
    };

    return `${sideClasses[this.side]} ${alignClasses[this.align]}`;
  }
}
