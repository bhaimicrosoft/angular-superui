import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        warning:
          'border-warning/50 text-warning dark:border-warning [&>svg]:text-warning',
        success:
          'border-success/50 text-success dark:border-success [&>svg]:text-success',
        info:
          'border-info/50 text-info dark:border-info [&>svg]:text-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const alertTitleVariants = cva(
  'mb-1 font-medium leading-none tracking-tight',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const alertDescriptionVariants = cva(
  'text-sm [&_p]:leading-relaxed',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Component({
  selector: 'Alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="cn(alertVariants({ variant }), className)"
      role="alert"
      [attr.aria-live]="variant === 'destructive' ? 'assertive' : 'polite'"
      [attr.aria-atomic]="true">
      <ng-content></ng-content>
    </div>
  `
})
export class Alert {
  @Input() variant: VariantProps<typeof alertVariants>['variant'] = 'default';
  @Input() className?: string;

  cn = cn;
  alertVariants = alertVariants;
}

@Component({
  selector: 'AlertTitle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h5 [class]="cn(alertTitleVariants({ variant }), className)">
      <ng-content></ng-content>
    </h5>
  `
})
export class AlertTitle {
  @Input() variant: VariantProps<typeof alertTitleVariants>['variant'] = 'default';
  @Input() className?: string;

  cn = cn;
  alertTitleVariants = alertTitleVariants;
}

@Component({
  selector: 'AlertDescription',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cn(alertDescriptionVariants({ variant }), className)">
      <ng-content></ng-content>
    </div>
  `
})
export class AlertDescription {
  @Input() variant: VariantProps<typeof alertDescriptionVariants>['variant'] = 'default';
  @Input() className?: string;

  cn = cn;
  alertDescriptionVariants = alertDescriptionVariants;
}

@Component({
  selector: 'AlertIcon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `
})
export class AlertIcon {
  @Input() className?: string;
}
