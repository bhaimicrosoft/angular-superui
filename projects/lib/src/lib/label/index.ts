import { Component, Input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        destructive: 'text-destructive',
        muted: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Component({
  selector: 'Label',
  standalone: true,
  imports: [],
  template: `<label [class]="labelClass" [for]="htmlFor"><ng-content></ng-content></label>`
})
export class Label {
  @Input() class = '';
  @Input() htmlFor = '';
  @Input() variant: VariantProps<typeof labelVariants>['variant'] = 'default';

  public get labelClass(): string {
    return cn(labelVariants({ variant: this.variant }), this.class);
  }
}
