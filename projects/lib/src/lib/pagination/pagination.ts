import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const paginationVariants = cva(
  'mx-auto flex w-full justify-center',
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

const paginationContentVariants = cva(
  'flex flex-row items-center gap-1',
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

const paginationItemVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2',
  {
    variants: {
      variant: {
        default: '',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      },
      isActive: {
        true: 'bg-primary text-primary-foreground hover:bg-primary/90',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      isActive: false,
    },
  }
);

@Component({
  selector: 'PaginationItem',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [class]="cn(paginationItemVariants({ variant, isActive }), className)"
      [disabled]="disabled"
      (click)="onClick.emit($event)"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class PaginationItem {
  @Input() variant: VariantProps<typeof paginationItemVariants>['variant'] = 'default';
  @Input() isActive: boolean = false;
  @Input() className?: string;
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<MouseEvent>();

  cn = cn;
  paginationItemVariants = paginationItemVariants;
}

@Component({
  selector: 'PaginationContent',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cn(paginationContentVariants({ variant }), className)">
      <ng-content></ng-content>
    </div>
  `
})
export class PaginationContent {
  @Input() variant: VariantProps<typeof paginationContentVariants>['variant'] = 'default';
  @Input() className?: string;

  cn = cn;
  paginationContentVariants = paginationContentVariants;
}

@Component({
  selector: 'Pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav [class]="cn(paginationVariants({ variant }), className)" role="navigation" [attr.aria-label]="ariaLabel">
      <ng-content></ng-content>
    </nav>
  `
})
export class Pagination {
  @Input() variant: VariantProps<typeof paginationVariants>['variant'] = 'default';
  @Input() className?: string;
  @Input() ariaLabel = 'pagination';

  cn = cn;
  paginationVariants = paginationVariants;
}