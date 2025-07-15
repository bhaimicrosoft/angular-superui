import { Component, Input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const progressVariants = cva(
  'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      size: {
        default: 'h-4',
        sm: 'h-2',
        lg: 'h-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const progressIndicatorVariants = cva(
  'h-full w-full flex-1 transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        secondary: 'bg-secondary',
        destructive: 'bg-destructive',
        success: 'bg-success',
        warning: 'bg-warning',
        info: 'bg-info',
        purple: 'bg-purple',
        pink: 'bg-pink',
        orange: 'bg-orange',
        teal: 'bg-teal',
        indigo: 'bg-indigo',
        cyan: 'bg-cyan',
        rose: 'bg-rose',
        emerald: 'bg-emerald',
        amber: 'bg-amber',
        lime: 'bg-lime',
        violet: 'bg-violet',
        sky: 'bg-sky',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Component({
  selector: 'lib-progress',
  standalone: true,
  imports: [],
  template: `
    <div [class]="progressClass" role="progressbar" [attr.aria-valuenow]="value" [attr.aria-valuemax]="max">
      <div [class]="indicatorClass" [style.transform]="transform"></div>
    </div>
  `
})
export class Progress {
  @Input() class = '';
  @Input() value = 0;
  @Input() max = 100;
  @Input() size: VariantProps<typeof progressVariants>['size'] = 'default';
  @Input() variant: VariantProps<typeof progressIndicatorVariants>['variant'] = 'default';

  public get progressClass(): string {
    return cn(progressVariants({ size: this.size }), this.class);
  }

  public get indicatorClass(): string {
    return cn(progressIndicatorVariants({ variant: this.variant }));
  }

  public get transform(): string {
    const percentage = Math.min(Math.max((this.value / this.max) * 100, 0), 100);
    return `translateX(-${100 - percentage}%)`;
  }
}
