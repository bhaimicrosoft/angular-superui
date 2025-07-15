import { Component, Input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const separatorVariants = cva(
  'shrink-0 bg-border',
  {
    variants: {
      orientation: {
        horizontal: 'h-[1px] w-full',
        vertical: 'h-full w-[1px]',
      },
      variant: {
        default: 'bg-border',
        destructive: 'bg-destructive',
        muted: 'bg-muted',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'default',
    },
  }
);

@Component({
  selector: 'lib-separator',
  standalone: true,
  imports: [],
  template: `<div [class]="separatorClass" role="separator" [attr.aria-orientation]="orientation"></div>`
})
export class Separator {
  @Input() class = '';
  @Input() orientation: VariantProps<typeof separatorVariants>['orientation'] = 'horizontal';
  @Input() variant: VariantProps<typeof separatorVariants>['variant'] = 'default';

  public get separatorClass(): string {
    return cn(separatorVariants({ orientation: this.orientation, variant: this.variant }), this.class);
  }
}
