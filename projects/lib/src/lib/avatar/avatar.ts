import { Component, Input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        sm: 'h-8 w-8',
        default: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

@Component({
  selector: 'lib-avatar',
  standalone: true,
  imports: [],
  template: `<div [class]="avatarClass"><ng-content></ng-content></div>`
})
export class Avatar {
  @Input() class = '';
  @Input() size: VariantProps<typeof avatarVariants>['size'] = 'default';

  public get avatarClass(): string {
    return cn(avatarVariants({ size: this.size }), this.class);
  }
}

@Component({
  selector: 'lib-avatar-image',
  standalone: true,
  imports: [],
  template: `<img [class]="imageClass" [src]="src" [alt]="alt" />`
})
export class AvatarImage {
  @Input() class = '';
  @Input() src = '';
  @Input() alt = '';

  public get imageClass(): string {
    return cn('aspect-square h-full w-full object-cover', this.class);
  }
}

@Component({
  selector: 'lib-avatar-fallback',
  standalone: true,
  imports: [],
  template: `<div [class]="fallbackClass"><ng-content></ng-content></div>`
})
export class AvatarFallback {
  @Input() class = '';

  public get fallbackClass(): string {
    return cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground font-semibold text-sm',
      this.class
    );
  }
}
