import { Component, Input, ContentChildren, QueryList, AfterContentInit, ContentChild, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/**
 * Accordion component variants using Class Variance Authority (CVA)
 */
const accordionVariants = cva(
  // Base styles
  [
    'w-full',
    'focus-visible:outline-none'
  ],
  {
    variants: {
      variant: {
        default: 'space-y-1',
        compact: 'space-y-0',
        separated: 'space-y-2'
      },
      size: {
        sm: '',
        default: '',
        lg: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const accordionItemVariants = cva(
  // Base styles
  [
    'rounded-lg transition-all duration-200',
    'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
    'focus-within:outline-none',
    'overflow-hidden',
    'my-2'
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-card shadow-sm',
          'hover:shadow-md'
        ],
        ghost: [
          'bg-transparent',
          'hover:bg-accent/50'
        ],
        filled: [
          'bg-muted/50',
          'hover:bg-muted/80'
        ]
      },
      state: {
        closed: '',
        open: 'shadow-md my-3'
      }
    },
    defaultVariants: {
      variant: 'default',
      state: 'closed'
    }
  }
);

const accordionTriggerVariants = cva(
  // Base styles
  [
    'flex flex-1 items-center justify-between w-full',
    'font-medium text-left transition-all duration-200',
    'focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'group'
  ],
  {
    variants: {
      variant: {
        default: [
          'py-4 px-6 text-foreground',
          'hover:bg-accent/50 hover:text-accent-foreground'
        ],
        ghost: [
          'py-3 px-4 text-foreground',
          'hover:bg-accent/30'
        ],
        filled: [
          'py-4 px-6 text-foreground',
          'hover:bg-background/50'
        ]
      },
      size: {
        sm: 'text-sm py-3 px-4',
        default: 'text-base py-4 px-6',
        lg: 'text-lg py-5 px-8'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const accordionContentVariants = cva(
  // Base styles
  [
    'transition-all duration-300 ease-out',
    'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
  ],
  {
    variants: {
      variant: {
        default: '',
        ghost: '',
        filled: ''
      },
      size: {
        sm: 'text-sm',
        default: 'text-base',
        lg: 'text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export type AccordionVariant = VariantProps<typeof accordionVariants>;

/**
 * Accordion Trigger Component
 *
 * Interactive trigger for expanding/collapsing accordion content.
 */
@Component({
  selector: 'AccordionTrigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>
      <button
        type="button"
        [class]="triggerClasses()"
        [attr.data-state]="isOpen() ? 'open' : 'closed'"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-controls]="contentId()"
        [attr.id]="triggerId()"
        [attr.aria-label]="ariaLabel"
        [attr.aria-describedby]="ariaDescribedBy"
        (click)="toggle()"
        (keydown)="onKeyDown($event)">

        <span class="flex-1 text-left">
          <ng-content></ng-content>
        </span>

        <svg
          class="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:text-accent-foreground"
          [class.rotate-180]="isOpen()"
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
  /**
   * Visual variant of the trigger
   */
  @Input()
  set variant(value: VariantProps<typeof accordionTriggerVariants>['variant']) {
    this._variant.set(value);
  }
  get variant() {
    return this._variant();
  }
  private _variant = signal<VariantProps<typeof accordionTriggerVariants>['variant']>('default');

  /**
   * Size variant of the trigger
   */
  @Input()
  set size(value: VariantProps<typeof accordionTriggerVariants>['size']) {
    this._size.set(value);
  }
  get size() {
    return this._size();
  }
  private _size = signal<VariantProps<typeof accordionTriggerVariants>['size']>('default');

  /**
   * Additional CSS classes
   */
  @Input()
  set class(value: string) {
    this._class.set(value);
  }
  get class() {
    return this._class();
  }
  private _class = signal('');

  /**
   * ARIA label for accessibility
   */
  @Input()
  set ariaLabel(value: string) {
    this._ariaLabel.set(value);
  }
  get ariaLabel() {
    return this._ariaLabel();
  }
  private _ariaLabel = signal('');

  /**
   * ARIA described by for accessibility
   */
  @Input()
  set ariaDescribedBy(value: string) {
    this._ariaDescribedBy.set(value);
  }
  get ariaDescribedBy() {
    return this._ariaDescribedBy();
  }
  private _ariaDescribedBy = signal('');

  // Internal references
  item?: AccordionItem;

  /**
   * Computed CSS classes
   */
  triggerClasses = computed(() => {
    return cn(
      accordionTriggerVariants({
        variant: this._variant(),
        size: this._size(),
      }),
      this._class()
    );
  });

  /**
   * Check if accordion item is open
   */
  isOpen = computed(() => {
    return this.item?.isOpen() || false;
  });

  /**
   * Generate unique trigger ID
   */
  triggerId = computed(() => {
    return `accordion-trigger-${this.item?.value || 'default'}`;
  });

  /**
   * Generate unique content ID
   */
  contentId = computed(() => {
    return `accordion-content-${this.item?.value || 'default'}`;
  });

  /**
   * Toggle accordion item
   */
  toggle(): void {
    this.item?.toggle();
  }

  /**
   * Handle keyboard navigation
   */
  onKeyDown(event: KeyboardEvent): void {
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

  /**
   * Focus the trigger programmatically
   */
  focus(): void {
    const button = document.getElementById(this.triggerId());
    button?.focus();
  }
}

/**
 * Accordion Content Component
 *
 * Collapsible content container for accordion items.
 */
@Component({
  selector: 'AccordionContent',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="contentClasses()"
      [attr.data-state]="isOpen() ? 'open' : 'closed'"
      [attr.id]="contentId()"
      [attr.aria-labelledby]="triggerId()"
      [attr.role]="'region'"
      [style.height]="isOpen() ? 'auto' : '0'"
      [style.overflow]="'hidden'">

      <div [class]="contentInnerClasses()">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class AccordionContent {
  /**
   * Visual variant of the content
   */
  @Input()
  set variant(value: VariantProps<typeof accordionContentVariants>['variant']) {
    this._variant.set(value);
  }
  get variant() {
    return this._variant();
  }
  private _variant = signal<VariantProps<typeof accordionContentVariants>['variant']>('default');

  /**
   * Size variant of the content
   */
  @Input()
  set size(value: VariantProps<typeof accordionContentVariants>['size']) {
    this._size.set(value);
  }
  get size() {
    return this._size();
  }
  private _size = signal<VariantProps<typeof accordionContentVariants>['size']>('default');

  /**
   * Additional CSS classes
   */
  @Input()
  set class(value: string) {
    this._class.set(value);
  }
  get class() {
    return this._class();
  }
  private _class = signal('');

  /**
   * Maximum height when expanded
   */
  @Input()
  set maxHeight(value: string) {
    this._maxHeight.set(value);
  }
  get maxHeight() {
    return this._maxHeight();
  }
  private _maxHeight = signal('500px');

  // Internal references
  item?: AccordionItem;

  /**
   * Computed CSS classes for content wrapper
   */
  contentClasses = computed(() => {
    return cn(
      accordionContentVariants({
        variant: this._variant(),
        size: this._size(),
      }),
      this._class()
    );
  });

  /**
   * Computed CSS classes for inner content
   */
  contentInnerClasses = computed(() => {
    const sizeClasses = {
      sm: 'px-4 py-3',
      default: 'px-6 py-4',
      lg: 'px-8 py-5'
    };

    return cn(
      'text-muted-foreground leading-relaxed',
      sizeClasses[this._size() || 'default']
    );
  });

  /**
   * Check if accordion item is open
   */
  isOpen = computed(() => {
    return this.item?.isOpen() || false;
  });

  /**
   * Generate unique content ID
   */
  contentId = computed(() => {
    return `accordion-content-${this.item?.value || 'default'}`;
  });

  /**
   * Generate unique trigger ID
   */
  triggerId = computed(() => {
    return `accordion-trigger-${this.item?.value || 'default'}`;
  });
}

/**
 * Accordion Item Component
 *
 * Container for trigger and content pair.
 */
@Component({
  selector: 'AccordionItem',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="itemClasses()" [attr.data-state]="isOpen() ? 'open' : 'closed'">
      <ng-content></ng-content>
    </div>
  `
})
export class AccordionItem implements AfterContentInit {
  /**
   * Unique value for this accordion item
   */
  @Input()
  set value(val: string) {
    this._value.set(val);
  }
  get value() {
    return this._value();
  }
  private _value = signal('');

  /**
   * Visual variant of the item
   */
  @Input()
  set variant(value: VariantProps<typeof accordionItemVariants>['variant']) {
    this._variant.set(value);
  }
  get variant() {
    return this._variant();
  }
  private _variant = signal<VariantProps<typeof accordionItemVariants>['variant']>('default');

  /**
   * Additional CSS classes
   */
  @Input()
  set class(value: string) {
    this._class.set(value);
  }
  get class() {
    return this._class();
  }
  private _class = signal('');

  @ContentChild(AccordionTrigger) trigger!: AccordionTrigger;
  @ContentChild(AccordionContent) content!: AccordionContent;

  // Internal references
  accordion?: Accordion;

  /**
   * Computed CSS classes
   */
  itemClasses = computed(() => {
    return cn(
      accordionItemVariants({
        variant: this._variant(),
        state: this.isOpen() ? 'open' : 'closed'
      }),
      this._class()
    );
  });

  /**
   * Check if this item is open
   */
  isOpen = computed(() => {
    return this.accordion?.isItemOpen(this.value) || false;
  });

  ngAfterContentInit(): void {
    if (this.trigger) {
      this.trigger.item = this;
    }
    if (this.content) {
      this.content.item = this;
    }
  }

  /**
   * Toggle this accordion item
   */
  toggle(): void {
    if (this.accordion) {
      this.accordion.onItemToggle(this.value);
    }
  }
}

/**
 * Accordion Component
 *
 * Main container that manages accordion behavior and state.
 *
 * @example
 * ```html
 * <!-- Single mode accordion -->
 * <Accordion type="single" [collapsible]="true">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Is it accessible?</AccordionTrigger>
 *     <AccordionContent>
 *       Yes. It adheres to the WAI-ARIA design pattern.
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 *
 * <!-- Multiple mode accordion -->
 * <Accordion type="multiple" variant="separated">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Question 1</AccordionTrigger>
 *     <AccordionContent>Answer 1</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
@Component({
  selector: 'Accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="accordionClasses()"
      [attr.role]="'region'"
      [attr.aria-label]="ariaLabel"
      [attr.aria-describedby]="ariaDescribedBy">
      <ng-content></ng-content>
    </div>
  `
})
export class Accordion implements AfterContentInit {
  /**
   * Accordion behavior type
   */
  @Input()
  set type(value: 'single' | 'multiple') {
    this._type.set(value);
  }
  get type() {
    return this._type();
  }
  private _type = signal<'single' | 'multiple'>('single');

  /**
   * Whether single mode accordion can collapse all items
   */
  @Input()
  set collapsible(value: boolean) {
    this._collapsible.set(value);
  }
  get collapsible() {
    return this._collapsible();
  }
  private _collapsible = signal(false);

  /**
   * Visual variant of the accordion
   */
  @Input()
  set variant(value: AccordionVariant['variant']) {
    this._variant.set(value);
  }
  get variant() {
    return this._variant();
  }
  private _variant = signal<AccordionVariant['variant']>('default');

  /**
   * Size variant of the accordion
   */
  @Input()
  set size(value: AccordionVariant['size']) {
    this._size.set(value);
  }
  get size() {
    return this._size();
  }
  private _size = signal<AccordionVariant['size']>('default');

  /**
   * Additional CSS classes
   */
  @Input()
  set class(value: string) {
    this._class.set(value);
  }
  get class() {
    return this._class();
  }
  private _class = signal('');

  /**
   * Current value(s) of open items
   */
  @Input()
  set value(val: string | string[]) {
    this._value.set(val);
  }
  get value() {
    return this._value();
  }
  private _value = signal<string | string[]>('');

  /**
   * ARIA label for accessibility
   */
  @Input()
  set ariaLabel(value: string) {
    this._ariaLabel.set(value);
  }
  get ariaLabel() {
    return this._ariaLabel();
  }
  private _ariaLabel = signal('');

  /**
   * ARIA described by for accessibility
   */
  @Input()
  set ariaDescribedBy(value: string) {
    this._ariaDescribedBy.set(value);
  }
  get ariaDescribedBy() {
    return this._ariaDescribedBy();
  }
  private _ariaDescribedBy = signal('');

  @ContentChildren(AccordionItem) items!: QueryList<AccordionItem>;

  /**
   * Computed CSS classes
   */
  accordionClasses = computed(() => {
    return cn(
      accordionVariants({
        variant: this._variant(),
        size: this._size(),
      }),
      this._class()
    );
  });

  ngAfterContentInit(): void {
    this.items.forEach(item => {
      item.accordion = this;
    });
  }

  /**
   * Handle item toggle
   */
  onItemToggle(itemValue: string): void {
    if (this._type() === 'single') {
      if (this._value() === itemValue && this._collapsible()) {
        this._value.set('');
      } else {
        this._value.set(itemValue);
      }
    } else {
      // Multiple mode
      let currentValues = Array.isArray(this._value()) ? [...(this._value() as string[])] : [];
      if (currentValues.includes(itemValue)) {
        this._value.set(currentValues.filter(v => v !== itemValue));
      } else {
        this._value.set([...currentValues, itemValue]);
      }
    }
  }

  /**
   * Check if specific item is open
   */
  isItemOpen(itemValue: string): boolean {
    if (this._type() === 'single') {
      return this._value() === itemValue;
    } else {
      const currentValues = Array.isArray(this._value()) ? this._value() as string[] : [];
      return currentValues.includes(itemValue);
    }
  }
}

/**
 * Export components and variants for easier importing
 */

