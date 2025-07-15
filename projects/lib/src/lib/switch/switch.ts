import { Component, Input, Output, EventEmitter } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const switchVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-6 w-11',
        sm: 'h-5 w-9',
        lg: 'h-7 w-12',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const thumbVariants = cva(
  'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform',
  {
    variants: {
      size: {
        default: 'h-5 w-5',
        sm: 'h-4 w-4',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

@Component({
  selector: 'lib-switch',
  standalone: true,
  imports: [],
  template: `
    <button
      type="button"
      role="switch"
      [attr.aria-checked]="checked"
      [class]="switchClass"
      (click)="toggle()"
      [disabled]="disabled">
      <span [class]="thumbClass"></span>
    </button>
  `
})
export class Switch {
  @Input() class = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() size: VariantProps<typeof switchVariants>['size'] = 'default';
  @Output() checkedChange = new EventEmitter<boolean>();

  public get switchClass(): string {
    return cn(
      switchVariants({ size: this.size }),
      this.checked ? 'bg-primary' : 'bg-input',
      this.class
    );
  }

  public get thumbClass(): string {
    const baseClass = thumbVariants({ size: this.size });
    const translateClass = this.getTranslateClass();
    return cn(baseClass, translateClass);
  }

  private getTranslateClass(): string {
    if (!this.checked) return 'translate-x-0';
    
    switch (this.size) {
      case 'sm':
        return 'translate-x-4';
      case 'lg':
        return 'translate-x-5';
      default:
        return 'translate-x-5';
    }
  }

  toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
}
