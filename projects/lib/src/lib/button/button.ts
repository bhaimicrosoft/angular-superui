import { Component, Input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
        link: 'bg-transparent text-blue-500 underline-offset-4 hover:underline',
        
        // Extended Color Variants with proper Tailwind classes
        success: 'bg-green-500 text-white hover:bg-green-600',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
        info: 'bg-blue-500 text-white hover:bg-blue-600',
        purple: 'bg-purple-500 text-white hover:bg-purple-600',
        pink: 'bg-pink-500 text-white hover:bg-pink-600',
        orange: 'bg-orange-500 text-white hover:bg-orange-600',
        teal: 'bg-teal-500 text-white hover:bg-teal-600',
        indigo: 'bg-indigo-500 text-white hover:bg-indigo-600',
        cyan: 'bg-cyan-500 text-white hover:bg-cyan-600',
        rose: 'bg-rose-500 text-white hover:bg-rose-600',
        emerald: 'bg-emerald-500 text-white hover:bg-emerald-600',
        amber: 'bg-amber-500 text-white hover:bg-amber-600',
        lime: 'bg-lime-500 text-white hover:bg-lime-600',
        violet: 'bg-violet-500 text-white hover:bg-violet-600',
        sky: 'bg-sky-500 text-white hover:bg-sky-600',
        
        // Outline variants with proper Tailwind classes
        'outline-success': 'border border-green-500 text-green-500 bg-transparent hover:bg-green-500 hover:text-white',
        'outline-warning': 'border border-yellow-500 text-yellow-500 bg-transparent hover:bg-yellow-500 hover:text-white',
        'outline-info': 'border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white',
        'outline-purple': 'border border-purple-500 text-purple-500 bg-transparent hover:bg-purple-500 hover:text-white',
        'outline-pink': 'border border-pink-500 text-pink-500 bg-transparent hover:bg-pink-500 hover:text-white',
        'outline-orange': 'border border-orange-500 text-orange-500 bg-transparent hover:bg-orange-500 hover:text-white',
        'outline-teal': 'border border-teal-500 text-teal-500 bg-transparent hover:bg-teal-500 hover:text-white',
        'outline-indigo': 'border border-indigo-500 text-indigo-500 bg-transparent hover:bg-indigo-500 hover:text-white',
        'outline-cyan': 'border border-cyan-500 text-cyan-500 bg-transparent hover:bg-cyan-500 hover:text-white',
        'outline-rose': 'border border-rose-500 text-rose-500 bg-transparent hover:bg-rose-500 hover:text-white',
        'outline-emerald': 'border border-emerald-500 text-emerald-500 bg-transparent hover:bg-emerald-500 hover:text-white',
        'outline-amber': 'border border-amber-500 text-amber-500 bg-transparent hover:bg-amber-500 hover:text-white',
        'outline-lime': 'border border-lime-500 text-lime-500 bg-transparent hover:bg-lime-500 hover:text-white',
        'outline-violet': 'border border-violet-500 text-violet-500 bg-transparent hover:bg-violet-500 hover:text-white',
        'outline-sky': 'border border-sky-500 text-sky-500 bg-transparent hover:bg-sky-500 hover:text-white',
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
  template: `
    <button [className]="buttonClass">
      <ng-content></ng-content>
    </button>
  `,
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
