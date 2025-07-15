import { Component, Input, AfterContentInit } from '@angular/core';
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
  template: `
    <div [class]="avatarClass">
      @if (src && !imageError) {
        <img 
          [class]="imageClass" 
          [src]="src" 
          [alt]="alt || 'Avatar'" 
          (error)="onImageError()"
        />
      } @else {
        <div [class]="fallbackClass">
          <ng-content>
            @if (!hasContent) {
              <span>{{ initials }}</span>
            }
          </ng-content>
        </div>
      }
    </div>
  `
})
export class Avatar {
  @Input() class = '';
  @Input() size: VariantProps<typeof avatarVariants>['size'] = 'default';
  @Input() src = '';
  @Input() alt = '';
  @Input() fallback = '';

  imageError = false;
  hasContent = false;

  onImageError() {
    this.imageError = true;
  }

  public get avatarClass(): string {
    return cn(avatarVariants({ size: this.size }), this.class);
  }

  public get imageClass(): string {
    return cn('aspect-square h-full w-full object-cover');
  }

  public get fallbackClass(): string {
    return cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground font-semibold text-sm'
    );
  }

  public get initials(): string {
    if (this.fallback) return this.fallback;
    if (this.alt) {
      return this.alt
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return 'U';
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
