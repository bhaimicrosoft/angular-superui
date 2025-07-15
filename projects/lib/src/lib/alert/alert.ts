import { Component, Input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 my-2 alert-container',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        destructive: 'border-destructive/50 bg-destructive/10 text-destructive dark:border-destructive',
        success: 'border-success/50 bg-success/10 text-success dark:border-success',
        warning: 'border-warning/50 bg-warning/10 text-warning dark:border-warning',
        info: 'border-info/50 bg-info/10 text-info dark:border-info',
        purple: 'border-purple/50 bg-purple/10 text-purple dark:border-purple',
        pink: 'border-pink/50 bg-pink/10 text-pink dark:border-pink',
        orange: 'border-orange/50 bg-orange/10 text-orange dark:border-orange',
        teal: 'border-teal/50 bg-teal/10 text-teal dark:border-teal',
        indigo: 'border-indigo/50 bg-indigo/10 text-indigo dark:border-indigo',
        cyan: 'border-cyan/50 bg-cyan/10 text-cyan dark:border-cyan',
        rose: 'border-rose/50 bg-rose/10 text-rose dark:border-rose',
        emerald: 'border-emerald/50 bg-emerald/10 text-emerald dark:border-emerald',
        amber: 'border-amber/50 bg-amber/10 text-amber dark:border-amber',
        lime: 'border-lime/50 bg-lime/10 text-lime dark:border-lime',
        violet: 'border-violet/50 bg-violet/10 text-violet dark:border-violet',
        sky: 'border-sky/50 bg-sky/10 text-sky dark:border-sky',
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
