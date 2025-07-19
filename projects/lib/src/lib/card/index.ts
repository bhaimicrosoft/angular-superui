import { Component, Input, computed, signal } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/**
 * Card component variants using Class Variance Authority (CVA)
 */
const cardVariants = cva(
  // Base styles
  [
    'rounded-lg border text-card-foreground transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-card border-border shadow-sm',
          'hover:shadow-md'
        ],
        outline: [
          'bg-card border-2 border-border',
          'hover:border-border/80'
        ],
        ghost: [
          'bg-transparent border-transparent shadow-none',
          'hover:bg-accent/50'
        ],
        elevated: [
          'bg-card border-border shadow-lg',
          'hover:shadow-xl'
        ],
        filled: [
          'bg-muted/50 border-muted shadow-sm',
          'hover:bg-muted/80'
        ]
      },
      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const cardHeaderVariants = cva(
  'flex flex-col space-y-1.5',
  {
    variants: {
      size: {
        sm: 'pb-3',
        default: 'pb-4',
        lg: 'pb-6'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

const cardContentVariants = cva(
  '',
  {
    variants: {
      size: {
        sm: 'pb-3',
        default: 'pb-4',
        lg: 'pb-6'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

const cardFooterVariants = cva(
  'flex items-center gap-2',
  {
    variants: {
      size: {
        sm: '',
        default: '',
        lg: ''
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

export type CardVariant = VariantProps<typeof cardVariants>;

/**
 * Card Component
 *
 * A flexible content container with multiple variants and sizes.
 * Perfect for displaying information, actions, and complex content structures.
 *
 * @example
 * ```html
 * <!-- Basic card -->
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content goes here</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 *
 * <!-- Elevated card with large padding -->
 * <Card variant="elevated" size="lg">
 *   <CardContent>Premium content</CardContent>
 * </Card>
 * ```
 */
@Component({
  selector: 'Card',
  standalone: true,
  template: `
    <div
      [class]="cardClasses()"
      [attr.role]="role"
      [attr.aria-label]="ariaLabel"
      [attr.aria-describedby]="ariaDescribedBy"
      [attr.tabindex]="tabindex">
      <ng-content></ng-content>
    </div>
  `,
})
export class Card {
  /**
   * Visual variant of the card
   */
  @Input()
  set variant(value: CardVariant['variant']) {
    this._variant.set(value);
  }
  get variant() {
    return this._variant();
  }
  private _variant = signal<CardVariant['variant']>('default');

  /**
   * Size variant of the card
   */
  @Input()
  set size(value: CardVariant['size']) {
    this._size.set(value);
  }
  get size() {
    return this._size();
  }
  private _size = signal<CardVariant['size']>('default');

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
   * ARIA role for accessibility
   */
  @Input()
  set role(value: string) {
    this._role.set(value);
  }
  get role() {
    return this._role();
  }
  private _role = signal('');

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

  /**
   * Tab index for keyboard navigation
   */
  @Input()
  set tabindex(value: number | string) {
    this._tabindex.set(value);
  }
  get tabindex() {
    return this._tabindex();
  }
  private _tabindex = signal<number | string>('');

  /**
   * Computed CSS classes
   */
  cardClasses = computed(() => {
    return cn(
      cardVariants({
        variant: this._variant(),
        size: this._size(),
      }),
      this._class()
    );
  });

  /**
   * CSS utility function for class merging (exposed for template use)
   */
  cn = cn;
}

/**
 * Card Header Component
 *
 * Container for card title and description, typically at the top of a card.
 */
@Component({
  selector: 'CardHeader',
  standalone: true,
  template: `
    <div [class]="headerClasses()">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardHeader {
  /**
   * Size variant (inherited from parent card)
   */
  @Input()
  set size(value: CardVariant['size']) {
    this._size.set(value);
  }
  get size() {
    return this._size();
  }
  private _size = signal<CardVariant['size']>('default');

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
   * Computed CSS classes
   */
  headerClasses = computed(() => {
    return cn(
      cardHeaderVariants({
        size: this._size(),
      }),
      this._class()
    );
  });
}

/**
 * Card Title Component
 *
 * Primary heading for the card content.
 */
@Component({
  selector: 'CardTitle',
  standalone: true,
  template: `
    <h3 [class]="titleClasses()">
      <ng-content></ng-content>
    </h3>
  `,
})
export class CardTitle {
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
   * Computed CSS classes
   */
  titleClasses = computed(() => {
    return cn(
      'text-xl font-semibold leading-none tracking-tight text-foreground',
      this._class()
    );
  });
}

/**
 * Card Description Component
 *
 * Secondary text that provides additional context about the card content.
 */
@Component({
  selector: 'CardDescription',
  standalone: true,
  template: `
    <p [class]="descriptionClasses()">
      <ng-content></ng-content>
    </p>
  `,
})
export class CardDescription {
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
   * Computed CSS classes
   */
  descriptionClasses = computed(() => {
    return cn(
      'text-sm text-muted-foreground leading-relaxed',
      this._class()
    );
  });
}

/**
 * Card Content Component
 *
 * Main content area of the card.
 */
@Component({
  selector: 'CardContent',
  standalone: true,
  template: `
    <div [class]="contentClasses()">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardContent {
  /**
   * Size variant (inherited from parent card)
   */
  @Input()
  set size(value: CardVariant['size']) {
    this._size.set(value);
  }
  get size() {
    return this._size();
  }
  private _size = signal<CardVariant['size']>('default');

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
   * Computed CSS classes
   */
  contentClasses = computed(() => {
    return cn(
      cardContentVariants({
        size: this._size(),
      }),
      this._class()
    );
  });
}

/**
 * Card Footer Component
 *
 * Footer section typically containing actions or supplementary information.
 */
@Component({
  selector: 'CardFooter',
  standalone: true,
  template: `
    <div [class]="footerClasses()">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardFooter {
  /**
   * Size variant (inherited from parent card)
   */
  @Input()
  set size(value: CardVariant['size']) {
    this._size.set(value);
  }
  get size() {
    return this._size();
  }
  private _size = signal<CardVariant['size']>('default');

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
   * Computed CSS classes
   */
  footerClasses = computed(() => {
    return cn(
      cardFooterVariants({
        size: this._size(),
      }),
      this._class()
    );
  });
}
