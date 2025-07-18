import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: 'border-border',
        outline: 'border-2 border-border',
        ghost: 'border-transparent shadow-none',
        elevated: 'border-border shadow-lg',
        filled: 'bg-muted border-muted'
      },
      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const cardHeaderVariants = cva(
  'flex flex-col space-y-1.5 p-6',
  {
    variants: {
      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

const cardContentVariants = cva(
  'p-6 pt-0',
  {
    variants: {
      size: {
        sm: 'p-4 pt-0',
        default: 'p-6 pt-0',
        lg: 'p-8 pt-0'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

const cardFooterVariants = cva(
  'flex items-center p-6 pt-0',
  {
    variants: {
      size: {
        sm: 'p-4 pt-0',
        default: 'p-6 pt-0',
        lg: 'p-8 pt-0'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

export interface CardProps extends VariantProps<typeof cardVariants> {
  class?: string;
}

export interface CardHeaderProps extends VariantProps<typeof cardHeaderVariants> {
  class?: string;
}

export interface CardContentProps extends VariantProps<typeof cardContentVariants> {
  class?: string;
}

export interface CardFooterProps extends VariantProps<typeof cardFooterVariants> {
  class?: string;
}

@Component({
  selector: 'Card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`
})
export class CardComponent implements CardProps {
  @Input() variant: CardProps['variant'] = 'default';
  @Input() size: CardProps['size'] = 'default';
  @Input() class?: string;

  @HostBinding('class')
  get computedClass() {
    return cn(cardVariants({ variant: this.variant, size: this.size }), this.class);
  }
}

@Component({
  selector: 'CardHeader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`
})
export class CardHeaderComponent implements CardHeaderProps {
  @Input() size: CardHeaderProps['size'] = 'default';
  @Input() class?: string;

  @HostBinding('class')
  get computedClass() {
    return cn(cardHeaderVariants({ size: this.size }), this.class);
  }
}

@Component({
  selector: 'CardTitle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`,
  host: {
    class: 'text-2xl font-semibold leading-none tracking-tight'
  }
})
export class CardTitleComponent {
  @Input() class?: string;

  @HostBinding('class')
  get computedClass() {
    return cn('text-2xl font-semibold leading-none tracking-tight', this.class);
  }
}

@Component({
  selector: 'CardDescription',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`,
  host: {
    class: 'text-sm text-muted-foreground'
  }
})
export class CardDescriptionComponent {
  @Input() class?: string;

  @HostBinding('class')
  get computedClass() {
    return cn('text-sm text-muted-foreground', this.class);
  }
}

@Component({
  selector: 'CardContent',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`
})
export class CardContentComponent implements CardContentProps {
  @Input() size: CardContentProps['size'] = 'default';
  @Input() class?: string;

  @HostBinding('class')
  get computedClass() {
    return cn(cardContentVariants({ size: this.size }), this.class);
  }
}

@Component({
  selector: 'CardFooter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`
})
export class CardFooterComponent implements CardFooterProps {
  @Input() size: CardFooterProps['size'] = 'default';
  @Input() class?: string;

  @HostBinding('class')
  get computedClass() {
    return cn(cardFooterVariants({ size: this.size }), this.class);
  }
}

export { cardVariants, cardHeaderVariants, cardContentVariants, cardFooterVariants };
