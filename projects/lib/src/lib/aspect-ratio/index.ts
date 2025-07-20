import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const aspectRatioVariants = cva(
  'relative w-full overflow-hidden',
  {
    variants: {
      ratio: {
        square: 'aspect-square',
        video: 'aspect-video',
        '4/3': 'aspect-[4/3]',
        '3/2': 'aspect-[3/2]',
        '16/9': 'aspect-[16/9]',
        '21/9': 'aspect-[21/9]',
        '1/1': 'aspect-[1/1]',
        '3/4': 'aspect-[3/4]',
        '2/3': 'aspect-[2/3]',
        '9/16': 'aspect-[9/16]'
      }
    },
    defaultVariants: {
      ratio: 'video'
    }
  }
);

export interface AspectRatioProps extends VariantProps<typeof aspectRatioVariants> {
  customRatio?: string;
  class?: string;
}

@Component({
  selector: 'AspectRatio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[attr.aria-label]': 'ariaLabel',
    '[attr.role]': '"img"',
    '[style.aspect-ratio]': 'customRatio'
  }
})
export class AspectRatio implements AspectRatioProps {
  @Input() ratio: AspectRatioProps['ratio'] = 'video';
  @Input() customRatio?: string;
  @Input() class?: string;
  @Input() ariaLabel?: string;

  @HostBinding('class')
  get computedClass() {
    return cn(
      aspectRatioVariants({ ratio: this.customRatio ? undefined : this.ratio }),
      this.customRatio && 'relative w-full overflow-hidden',
      this.class
    );
  }
}

export { aspectRatioVariants };
