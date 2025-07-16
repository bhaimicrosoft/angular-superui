import { Component, Input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const skeletonVariants = cva(
  'animate-pulse rounded-md bg-muted',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        text: 'bg-muted h-4',
        avatar: 'bg-muted rounded-full',
        button: 'bg-muted h-10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Component({
  selector: 'Skeleton',
  standalone: true,
  imports: [],
  template: `<div [class]="skeletonClass"></div>`
})
export class Skeleton {
  @Input() class = '';
  @Input() variant: VariantProps<typeof skeletonVariants>['variant'] = 'default';

  public get skeletonClass(): string {
    return cn(skeletonVariants({ variant: this.variant }), this.class);
  }
}
