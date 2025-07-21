import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

// Badge variants
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        success: 'border-transparent bg-success text-success-foreground hover:bg-success/80',
        warning: 'border-transparent bg-warning text-warning-foreground hover:bg-warning/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string;
  ariaLabel?: string;
  ariaDescribedby?: string;
  role?: 'status' | 'note' | 'img' | 'generic' | 'alert';
  ariaLive?: 'off' | 'polite' | 'assertive';
  asLink?: boolean;
  href?: string;
}

@Component({
  selector: 'Badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      *ngIf="asLink && href"
      [href]="href"
      [class]="cn(badgeVariants({ variant }), 'cursor-pointer hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', className)"
      [attr.aria-label]="ariaLabel"
      [attr.aria-describedby]="ariaDescribedby"
      [attr.role]="getAriaRole()"
      [attr.aria-live]="ariaLive"
    >
      <ng-content></ng-content>
    </a>

    <span
      *ngIf="!asLink || !href"
      [class]="cn(badgeVariants({ variant }), className)"
      [attr.aria-label]="ariaLabel"
      [attr.aria-describedby]="ariaDescribedby"
      [attr.role]="getAriaRole()"
      [attr.aria-live]="ariaLive"
    >
      <ng-content></ng-content>
    </span>
  `,
})
export class Badge implements BadgeProps {
  @Input() variant: VariantProps<typeof badgeVariants>['variant'] = 'default';
  @Input() className?: string;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedby?: string;
  @Input() role?: 'status' | 'note' | 'img' | 'generic' | 'alert' = 'note';
  @Input() ariaLive?: 'off' | 'polite' | 'assertive' = 'off';
  @Input() asLink?: boolean = false;
  @Input() href?: string;

  protected readonly cn = cn;
  protected readonly badgeVariants = badgeVariants;

  protected getAriaRole(): string {
    // Dynamic role based on variant and usage
    if (this.role && this.role !== 'generic') {
      return this.role;
    }

    // Smart role assignment based on variant
    switch (this.variant) {
      case 'destructive':
        return 'alert';
      case 'default':
      case 'secondary':
        return this.ariaLive && this.ariaLive !== 'off' ? 'status' : 'note';
      case 'outline':
        return 'note';
      default:
        return 'note';
    }
  }
}

// Export variants for external use
export { badgeVariants };
