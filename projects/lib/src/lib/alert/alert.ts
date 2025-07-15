import { Component, Input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 my-2 alert-container',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-foreground',
        destructive:
          'border-destructive bg-red-100 text-destructive dark:border-destructive',
        success: 'border-green-600 bg-green-100 text-green-600 dark:border-green-600',
        warning: 'border-yellow-600 bg-yellow-100 text-yellow-600 dark:border-yellow-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Component({
  selector: 'lib-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.html',
  styles: [`
    ::ng-deep .alert-container > svg {
      position: absolute;
      right: 1rem;
      top: 1rem;
      width: 1.5rem;
      height: 1.5rem;
    }
    .alert-container svg ~ * {
      padding-right: 1.75rem;
    }
    .alert-container svg + div {
      transform: translateY(-3px);
    }
    .alert-container.alert-default svg {
      color: var(--foreground);
    }
    .alert-container.alert-destructive svg {
      color: var(----destructive);
    }
    .alert-container.alert-success svg {
      color: var(--foreground);
    }
    .alert-container.alert-warning svg {
      color: var(--background);
    }
  `]
})
export class Alert {
  @Input() class = '';
  @Input() variant: VariantProps<typeof alertVariants>['variant'] = 'default';

  public get alertClass(): string {
    return cn(
      alertVariants({ variant: this.variant }),
      `alert-${this.variant}`,
      this.class
    );
  }
}
