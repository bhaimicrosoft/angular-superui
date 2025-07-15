import { Component, Input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground border-border',
        
        // Extended Color Variants
        success: 'border-transparent bg-success text-success-foreground hover:bg-success/80',
        warning: 'border-transparent bg-warning text-warning-foreground hover:bg-warning/80',
        info: 'border-transparent bg-info text-info-foreground hover:bg-info/80',
        purple: 'border-transparent bg-purple text-purple-foreground hover:bg-purple/80',
        pink: 'border-transparent bg-pink text-pink-foreground hover:bg-pink/80',
        orange: 'border-transparent bg-orange text-orange-foreground hover:bg-orange/80',
        teal: 'border-transparent bg-teal text-teal-foreground hover:bg-teal/80',
        indigo: 'border-transparent bg-indigo text-indigo-foreground hover:bg-indigo/80',
        cyan: 'border-transparent bg-cyan text-cyan-foreground hover:bg-cyan/80',
        rose: 'border-transparent bg-rose text-rose-foreground hover:bg-rose/80',
        emerald: 'border-transparent bg-emerald text-emerald-foreground hover:bg-emerald/80',
        amber: 'border-transparent bg-amber text-amber-foreground hover:bg-amber/80',
        lime: 'border-transparent bg-lime text-lime-foreground hover:bg-lime/80',
        violet: 'border-transparent bg-violet text-violet-foreground hover:bg-violet/80',
        sky: 'border-transparent bg-sky text-sky-foreground hover:bg-sky/80',
        
        // Outline variants for all colors
        'outline-success': 'border-success text-success bg-background hover:bg-success/10',
        'outline-warning': 'border-warning text-warning bg-background hover:bg-warning/10',
        'outline-info': 'border-info text-info bg-background hover:bg-info/10',
        'outline-purple': 'border-purple text-purple bg-background hover:bg-purple/10',
        'outline-pink': 'border-pink text-pink bg-background hover:bg-pink/10',
        'outline-orange': 'border-orange text-orange bg-background hover:bg-orange/10',
        'outline-teal': 'border-teal text-teal bg-background hover:bg-teal/10',
        'outline-indigo': 'border-indigo text-indigo bg-background hover:bg-indigo/10',
        'outline-cyan': 'border-cyan text-cyan bg-background hover:bg-cyan/10',
        'outline-rose': 'border-rose text-rose bg-background hover:bg-rose/10',
        'outline-emerald': 'border-emerald text-emerald bg-background hover:bg-emerald/10',
        'outline-amber': 'border-amber text-amber bg-background hover:bg-amber/10',
        'outline-lime': 'border-lime text-lime bg-background hover:bg-lime/10',
        'outline-violet': 'border-violet text-violet bg-background hover:bg-violet/10',
        'outline-sky': 'border-sky text-sky bg-background hover:bg-sky/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Component({
  selector: 'lib-badge',
  standalone: true,
  imports: [],
  template: `<div [class]="badgeClass"><ng-content></ng-content></div>`
})
export class Badge {
  @Input() class = '';
  @Input() variant: VariantProps<typeof badgeVariants>['variant'] = 'default';

  public get badgeClass(): string {
    return cn(badgeVariants({ variant: this.variant }), this.class);
  }
}
