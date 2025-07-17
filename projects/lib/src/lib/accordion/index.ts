import { Component, Input, ContentChildren, QueryList, AfterContentInit, ChangeDetectorRef, ContentChild } from '@angular/core';
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
  'overflow-hidden text-sm transition-all duration-200 ease-in-out',
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
  selector: 'AccordionTrigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>
      <button 
        [class]="cn(accordionTriggerVariants({ variant }), className)"
        [attr.data-state]="isOpen ? 'open' : 'closed'"
        [attr.aria-expanded]="isOpen"
        [attr.aria-controls]="contentId"
        [attr.id]="triggerId"
        type="button"
        (click)="toggle()"
        (keydown)="onKeyDown($event)">
        <ng-content></ng-content>
        <svg
          class="h-4 w-4 shrink-0 transition-transform duration-200"
          [class.rotate-180]="isOpen"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    </h3>
  `
})
export class AccordionTrigger {
  @Input() variant: VariantProps<typeof accordionTriggerVariants>['variant'] = 'default';
  @Input() className?: string;

  item?: AccordionItem;
  cn = cn;
  accordionTriggerVariants = accordionTriggerVariants;

  get isOpen(): boolean {
    return this.item?.isOpen || false;
  }

  get triggerId(): string {
    return `accordion-trigger-${this.item?.value || 'default'}`;
  }

  get contentId(): string {
    return `accordion-content-${this.item?.value || 'default'}`;
  }

  toggle() {
    this.item?.toggle();
  }

  onKeyDown(event: KeyboardEvent) {
    if (!this.item?.accordion) return;

    const accordion = this.item.accordion;
    const items = accordion.items.toArray();
    const currentIndex = items.indexOf(this.item);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % items.length;
        items[nextIndex].trigger?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        items[prevIndex].trigger?.focus();
        break;
      case 'Home':
        event.preventDefault();
        items[0].trigger?.focus();
        break;
      case 'End':
        event.preventDefault();
        items[items.length - 1].trigger?.focus();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggle();
        break;
    }
  }

  focus() {
    // This will be called programmatically for keyboard navigation
    const button = document.getElementById(this.triggerId);
    button?.focus();
  }
}

@Component({
  selector: 'AccordionContent',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="cn(accordionContentVariants({ variant }), className)"
      [attr.data-state]="isOpen ? 'open' : 'closed'"
      [attr.id]="contentId"
      [attr.aria-labelledby]="triggerId"
      role="region"
      [style.max-height]="isOpen ? '200px' : '0'"
      [style.opacity]="isOpen ? '1' : '0'"
      [style.padding-bottom]="isOpen ? '1rem' : '0'">
      <div class="pt-0" [style.visibility]="isOpen ? 'visible' : 'hidden'">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class AccordionContent {
  @Input() variant: VariantProps<typeof accordionContentVariants>['variant'] = 'default';
  @Input() className?: string;

  item?: AccordionItem;
  cn = cn;
  accordionContentVariants = accordionContentVariants;

  get isOpen(): boolean {
    return this.item?.isOpen || false;
  }

  get contentId(): string {
    return `accordion-content-${this.item?.value || 'default'}`;
  }

  get triggerId(): string {
    return `accordion-trigger-${this.item?.value || 'default'}`;
  }
}

@Component({
  selector: 'AccordionItem',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cn(accordionItemVariants({ variant }), className)">
      <ng-content></ng-content>
    </div>
  `
})
export class AccordionItem implements AfterContentInit {
  @Input() value = '';
  @Input() variant: VariantProps<typeof accordionItemVariants>['variant'] = 'default';
  @Input() className?: string;

  @ContentChild(AccordionTrigger) trigger!: AccordionTrigger;
  @ContentChild(AccordionContent) content!: AccordionContent;

  accordion?: Accordion;
  cn = cn;
  accordionItemVariants = accordionItemVariants;

  ngAfterContentInit() {
    if (this.trigger) {
      this.trigger.item = this;
    }
    if (this.content) {
      this.content.item = this;
    }
  }

  get isOpen(): boolean {
    return this.accordion?.isItemOpen(this.value) || false;
  }

  toggle() {
    if (this.accordion) {
      this.accordion.onItemToggle(this.value);
    }
  }
}

@Component({
  selector: 'Accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cn(accordionVariants({ variant }), className)">
      <ng-content></ng-content>
    </div>
  `
})
export class Accordion implements AfterContentInit {
  @Input() type: 'single' | 'multiple' = 'single';
  @Input() collapsible = false;
  @Input() variant: VariantProps<typeof accordionVariants>['variant'] = 'default';
  @Input() className?: string;
  @Input() value: string | string[] = '';

  @ContentChildren(AccordionItem) items!: QueryList<AccordionItem>;

  cn = cn;
  accordionVariants = accordionVariants;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.items.forEach(item => {
      item.accordion = this;
    });
    this.cdr.detectChanges();
  }

  onItemToggle(itemValue: string) {
    if (this.type === 'single') {
      if (this.value === itemValue && this.collapsible) {
        this.value = '';
      } else {
        this.value = itemValue;
      }
    } else {
      // Multiple mode
      let currentValues = Array.isArray(this.value) ? [...this.value] : [];
      if (currentValues.includes(itemValue)) {
        this.value = currentValues.filter(v => v !== itemValue);
      } else {
        this.value = [...currentValues, itemValue];
      }
    }
    this.cdr.detectChanges();
  }

  isItemOpen(itemValue: string): boolean {
    if (this.type === 'single') {
      return this.value === itemValue;
    } else {
      const currentValues = Array.isArray(this.value) ? this.value : [];
      return currentValues.includes(itemValue);
    }
  }
}
