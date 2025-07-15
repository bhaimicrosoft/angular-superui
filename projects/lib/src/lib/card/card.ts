import { Component, Input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const cardVariants = cva(
  'rounded-lg border bg-white text-gray-900 shadow-sm',
  {
    variants: {
      variant: {
        default: 'bg-white border-gray-200',
        outlined: 'border-2 border-gray-200 bg-white',
        elevated: 'bg-white border-gray-200 shadow-lg',
        filled: 'bg-gray-100 border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Component({
  selector: 'lib-card',
  standalone: true,
  imports: [],
  template: `<div [class]="cardClass"><ng-content></ng-content></div>`
})
export class Card {
  @Input() class = '';
  @Input() variant: VariantProps<typeof cardVariants>['variant'] = 'default';

  public get cardClass(): string {
    return cn(cardVariants({ variant: this.variant }), this.class);
  }
}

@Component({
  selector: 'lib-card-header',
  standalone: true,
  imports: [],
  template: `<div [class]="headerClass"><ng-content></ng-content></div>`
})
export class CardHeader {
  @Input() class = '';

  public get headerClass(): string {
    return cn('flex flex-col space-y-1.5 p-6', this.class);
  }
}

@Component({
  selector: 'lib-card-title',
  standalone: true,
  imports: [],
  template: `<h3 [class]="titleClass"><ng-content></ng-content></h3>`
})
export class CardTitle {
  @Input() class = '';

  public get titleClass(): string {
    return cn('text-2xl font-semibold leading-none tracking-tight', this.class);
  }
}

@Component({
  selector: 'lib-card-description',
  standalone: true,
  imports: [],
  template: `<p [class]="descriptionClass"><ng-content></ng-content></p>`
})
export class CardDescription {
  @Input() class = '';

  public get descriptionClass(): string {
    return cn('text-sm text-gray-600', this.class);
  }
}

@Component({
  selector: 'lib-card-content',
  standalone: true,
  imports: [],
  template: `<div [class]="contentClass"><ng-content></ng-content></div>`
})
export class CardContent {
  @Input() class = '';

  public get contentClass(): string {
    return cn('p-6 pt-0', this.class);
  }
}

@Component({
  selector: 'lib-card-footer',
  standalone: true,
  imports: [],
  template: `<div [class]="footerClass"><ng-content></ng-content></div>`
})
export class CardFooter {
  @Input() class = '';

  public get footerClass(): string {
    return cn('flex items-center p-6 pt-0', this.class);
  }
}
