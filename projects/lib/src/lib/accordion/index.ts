import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const accordionVariants = cva(
  'w-full',
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

const accordionItemVariants = cva(
  'border-b',
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

const accordionTriggerVariants = cva(
  'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
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

const accordionContentVariants = cva(
  'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
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
  selector: 'Accordion',
  standalone: true,
  imports: [CommonModule],
  template: `<div [class]="accordionClass"><ng-content></ng-content></div>`
})
export class Accordion {
  @Input() type: 'single' | 'multiple' = 'single';
  @Input() collapsible = false;
  @Input() class = '';
  @Input() variant: VariantProps<typeof accordionVariants>['variant'] = 'default';
  @Input() value: string | string[] = '';
  @Output() valueChange = new EventEmitter<string | string[]>();

  public get accordionClass(): string {
    return cn(accordionVariants({ variant: this.variant }), this.class);
  }

  onItemToggle(itemValue: string) {
    if (this.type === 'single') {
      const newValue = this.value === itemValue ? (this.collapsible ? '' : itemValue) : itemValue;
      this.value = newValue;
      this.valueChange.emit(newValue);
    } else {
      const currentArray = Array.isArray(this.value) ? this.value : [];
      const newArray = currentArray.includes(itemValue)
        ? currentArray.filter(v => v !== itemValue)
        : [...currentArray, itemValue];
      this.value = newArray;
      this.valueChange.emit(newArray);
    }
  }

  isItemOpen(itemValue: string): boolean {
    if (this.type === 'single') {
      return this.value === itemValue;
    } else {
      return Array.isArray(this.value) && this.value.includes(itemValue);
    }
  }
}

@Component({
  selector: 'AccordionItem',
  standalone: true,
  imports: [CommonModule],
  template: `<div [class]="accordionItemClass"><ng-content></ng-content></div>`
})
export class AccordionItem {
  @Input() value = '';
  @Input() class = '';
  @Input() variant: VariantProps<typeof accordionItemVariants>['variant'] = 'default';

  public get accordionItemClass(): string {
    return cn(accordionItemVariants({ variant: this.variant }), this.class);
  }
}

@Component({
  selector: 'AccordionTrigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [class]="accordionTriggerClass"
      [attr.data-state]="isOpen ? 'open' : 'closed'"
      (click)="onTriggerClick()">
      <ng-content></ng-content>
      <svg
        class="h-4 w-4 shrink-0 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
  `
})
export class AccordionTrigger {
  @Input() class = '';
  @Input() variant: VariantProps<typeof accordionTriggerVariants>['variant'] = 'default';
  @Input() isOpen = false;
  @Output() triggerClick = new EventEmitter<void>();

  public get accordionTriggerClass(): string {
    return cn(accordionTriggerVariants({ variant: this.variant }), this.class);
  }

  onTriggerClick() {
    this.triggerClick.emit();
  }
}

@Component({
  selector: 'AccordionContent',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="accordionContentClass"
      [attr.data-state]="isOpen ? 'open' : 'closed'">
      <div class="pb-4 pt-0">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class AccordionContent {
  @Input() class = '';
  @Input() variant: VariantProps<typeof accordionContentVariants>['variant'] = 'default';
  @Input() isOpen = false;

  public get accordionContentClass(): string {
    return cn(accordionContentVariants({ variant: this.variant }), this.class);
  }
}
