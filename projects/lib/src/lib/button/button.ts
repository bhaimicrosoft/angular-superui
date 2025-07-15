import { Component, Input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        
        // Extended Color Variants
        success: 'bg-success text-success-foreground hover:bg-success/90',
        warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
        info: 'bg-info text-info-foreground hover:bg-info/90',
        purple: 'bg-purple text-purple-foreground hover:bg-purple/90',
        pink: 'bg-pink text-pink-foreground hover:bg-pink/90',
        orange: 'bg-orange text-orange-foreground hover:bg-orange/90',
        teal: 'bg-teal text-teal-foreground hover:bg-teal/90',
        indigo: 'bg-indigo text-indigo-foreground hover:bg-indigo/90',
        cyan: 'bg-cyan text-cyan-foreground hover:bg-cyan/90',
        rose: 'bg-rose text-rose-foreground hover:bg-rose/90',
        emerald: 'bg-emerald text-emerald-foreground hover:bg-emerald/90',
        amber: 'bg-amber text-amber-foreground hover:bg-amber/90',
        lime: 'bg-lime text-lime-foreground hover:bg-lime/90',
        violet: 'bg-violet text-violet-foreground hover:bg-violet/90',
        sky: 'bg-sky text-sky-foreground hover:bg-sky/90',
        
        // Outline variants for all colors
        'outline-success': 'border border-success text-success bg-background hover:bg-success hover:text-success-foreground',
        'outline-warning': 'border border-warning text-warning bg-background hover:bg-warning hover:text-warning-foreground',
        'outline-info': 'border border-info text-info bg-background hover:bg-info hover:text-info-foreground',
        'outline-purple': 'border border-purple text-purple bg-background hover:bg-purple hover:text-purple-foreground',
        'outline-pink': 'border border-pink text-pink bg-background hover:bg-pink hover:text-pink-foreground',
        'outline-orange': 'border border-orange text-orange bg-background hover:bg-orange hover:text-orange-foreground',
        'outline-teal': 'border border-teal text-teal bg-background hover:bg-teal hover:text-teal-foreground',
        'outline-indigo': 'border border-indigo text-indigo bg-background hover:bg-indigo hover:text-indigo-foreground',
        'outline-cyan': 'border border-cyan text-cyan bg-background hover:bg-cyan hover:text-cyan-foreground',
        'outline-rose': 'border border-rose text-rose bg-background hover:bg-rose hover:text-rose-foreground',
        'outline-emerald': 'border border-emerald text-emerald bg-background hover:bg-emerald hover:text-emerald-foreground',
        'outline-amber': 'border border-amber text-amber bg-background hover:bg-amber hover:text-amber-foreground',
        'outline-lime': 'border border-lime text-lime bg-background hover:bg-lime hover:text-lime-foreground',
        'outline-violet': 'border border-violet text-violet bg-background hover:bg-violet hover:text-violet-foreground',
        'outline-sky': 'border border-sky text-sky bg-background hover:bg-sky hover:text-sky-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
})
export class Button {
  @Input() class = '';
  @Input() variant: VariantProps<typeof buttonVariants>['variant'] = 'default';
  @Input() size: VariantProps<typeof buttonVariants>['size'] = 'default';

  public get buttonClass(): string {
    return cn(
      buttonVariants({ variant: this.variant, size: this.size }),
      this.class
    );
  }
}
