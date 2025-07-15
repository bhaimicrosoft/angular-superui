import { Component, Input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground border-border',
        success:
          'border-transparent bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300',
        warning:
          'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Component({
  selector: 'lib-badge',
  standalone: true,
  imports: [],
  template: `<div [class]="badgeClass"><ng-content></ng-content></div>`
})
export class Badge {
  @Input() class = '';
  @Input() variant: VariantProps<typeof badgeVariants>['variant'] = 'default';

  public get badgeClass(): string {
    return cn(badgeVariants({ variant: this.variant }), this.class);
  }
}
