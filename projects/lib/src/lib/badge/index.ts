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
        
        // Extended Color Variants with proper Tailwind classes
        success: 'border-transparent bg-green-500 text-white hover:bg-green-600',
        warning: 'border-transparent bg-yellow-500 text-white hover:bg-yellow-600',
        info: 'border-transparent bg-blue-500 text-white hover:bg-blue-600',
        purple: 'border-transparent bg-purple-500 text-white hover:bg-purple-600',
        pink: 'border-transparent bg-pink-500 text-white hover:bg-pink-600',
        orange: 'border-transparent bg-orange-500 text-white hover:bg-orange-600',
        teal: 'border-transparent bg-teal-500 text-white hover:bg-teal-600',
        indigo: 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600',
        cyan: 'border-transparent bg-cyan-500 text-white hover:bg-cyan-600',
        rose: 'border-transparent bg-rose-500 text-white hover:bg-rose-600',
        emerald: 'border-transparent bg-emerald-500 text-white hover:bg-emerald-600',
        amber: 'border-transparent bg-amber-500 text-white hover:bg-amber-600',
        lime: 'border-transparent bg-lime-500 text-white hover:bg-lime-600',
        violet: 'border-transparent bg-violet-500 text-white hover:bg-violet-600',
        sky: 'border-transparent bg-sky-500 text-white hover:bg-sky-600',
        
        // Outline variants with proper Tailwind classes
        'outline-success': 'border-green-500 text-green-500 bg-transparent hover:bg-green-50',
        'outline-warning': 'border-yellow-500 text-yellow-500 bg-transparent hover:bg-yellow-50',
        'outline-info': 'border-blue-500 text-blue-500 bg-transparent hover:bg-blue-50',
        'outline-purple': 'border-purple-500 text-purple-500 bg-transparent hover:bg-purple-50',
        'outline-pink': 'border-pink-500 text-pink-500 bg-transparent hover:bg-pink-50',
        'outline-orange': 'border-orange-500 text-orange-500 bg-transparent hover:bg-orange-50',
        'outline-teal': 'border-teal-500 text-teal-500 bg-transparent hover:bg-teal-50',
        'outline-indigo': 'border-indigo-500 text-indigo-500 bg-transparent hover:bg-indigo-50',
        'outline-cyan': 'border-cyan-500 text-cyan-500 bg-transparent hover:bg-cyan-50',
        'outline-rose': 'border-rose-500 text-rose-500 bg-transparent hover:bg-rose-50',
        'outline-emerald': 'border-emerald-500 text-emerald-500 bg-transparent hover:bg-emerald-50',
        'outline-amber': 'border-amber-500 text-amber-500 bg-transparent hover:bg-amber-50',
        'outline-lime': 'border-lime-500 text-lime-500 bg-transparent hover:bg-lime-50',
        'outline-violet': 'border-violet-500 text-violet-500 bg-transparent hover:bg-violet-50',
        'outline-sky': 'border-sky-500 text-sky-500 bg-transparent hover:bg-sky-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Component({
  selector: 'Badge',
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
