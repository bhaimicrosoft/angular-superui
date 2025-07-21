import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, HostBinding} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn'; // Assuming cn utility is correctly imported

/**
 * Breadcrumb Variants
 */
const breadcrumbVariants = cva(
  'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground'
);

/**
 * Breadcrumb List Variants
 */
const breadcrumbListVariants = cva(
  'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground'
);

/**
 * Breadcrumb Item Variants
 */
const breadcrumbItemVariants = cva(
  'inline-flex items-center gap-1.5'
);

/**
 * Breadcrumb Link Variants
 */
const breadcrumbLinkVariants = cva(
  [
    'transition-colors hover:text-foreground focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'rounded-sm px-1 py-0.5 -mx-1 -my-0.5',
    'cursor-pointer' // Always apply cursor-pointer
  ]
);

/**
 * Breadcrumb Page Variants
 */
const breadcrumbPageVariants = cva(
  'font-normal text-foreground',
  {
    variants: {
      current: {
        true: 'font-medium aria-current-page',
        false: ''
      }
    },
    defaultVariants: {
      current: true
    }
  }
);

/**
 * Breadcrumb Separator Variants
 */
const breadcrumbSeparatorVariants = cva(
  '[&>svg]:size-3.5'
);

/**
 * Breadcrumb Ellipsis Variants
 */
const breadcrumbEllipsisVariants = cva(
  'flex h-9 w-9 items-center justify-center'
);

/**
 * Accessibility interface for Breadcrumb
 */
export interface BreadcrumbAccessibility {
  /** ARIA label for the breadcrumb navigation */
  ariaLabel?: string;
  /** Live region for dynamic announcements */
  ariaLive?: 'off' | 'polite' | 'assertive';
  /** Custom announcement text for screen readers */
  announceText?: string;
}

/**
 * Breadcrumb Root Component
 */
@Component({
  selector: 'nav[Breadcrumb]',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`
})
export class Breadcrumb {
  @Input() class = '';
  @Input() accessibility: BreadcrumbAccessibility = {
    ariaLabel: 'breadcrumb',
    ariaLive: 'polite'
  };

  @HostBinding('class')
  get hostClasses() {
    return cn(breadcrumbVariants(), this.class);
  }

  @HostBinding('attr.aria-label')
  get ariaLabel() {
    return this.accessibility.ariaLabel || 'breadcrumb';
  }

  @HostBinding('attr.aria-live')
  get ariaLive() {
    return this.accessibility.ariaLive;
  }

  @HostBinding('attr.role')
  get role() {
    return 'navigation';
  }

  protected breadcrumbVariants = breadcrumbVariants;
  protected cn = cn;
}

/**
 * Breadcrumb List Component
 */
@Component({
  selector: 'ol[BreadcrumbList]',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`
})
export class BreadcrumbList {
  @Input() class = '';

  @HostBinding('class')
  get hostClasses() {
    return cn(breadcrumbListVariants(), this.class);
  }

  @HostBinding('attr.role')
  get role() {
    return 'list';
  }

  protected breadcrumbListVariants = breadcrumbListVariants;
  protected cn = cn;
}

/**
 * Breadcrumb Item Component
 */
@Component({
  selector: 'li[BreadcrumbItem]',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`
})
export class BreadcrumbItem {
  @Input() class = '';

  @HostBinding('class')
  get hostClasses() {
    return cn(breadcrumbItemVariants(), this.class);
  }

  @HostBinding('attr.role')
  get role() {
    return 'listitem';
  }

  protected breadcrumbItemVariants = breadcrumbItemVariants;
  protected cn = cn;
}

/**
 * Breadcrumb Link Component (for external links)
 */
@Component({
  selector: 'a[BreadcrumbLink]',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>` // Content is projected directly into the host <a>
})
export class BreadcrumbLink implements OnInit, OnChanges {
  @Input() href?: string;
  @Input() target?: '_blank' | '_self' | '_parent' | '_top';
  @Input() rel?: string;
  @Input() customCss = '';
  @Input() accessibility: { ariaLabel?: string; ariaDescribedBy?: string } = {};

  @Output() linkClick = new EventEmitter<MouseEvent>();
  @Output() linkKeyDown = new EventEmitter<KeyboardEvent>();

  @HostBinding('class')
  get hostClasses() {
    return cn(breadcrumbLinkVariants(), this.customCss); // No asChild variant needed
  }

  @HostBinding('attr.href')
  get hrefAttr() {
    return this.href;
  }

  @HostBinding('attr.target')
  get targetAttr() {
    return this.target;
  }

  @HostBinding('attr.rel')
  get relAttr() {
    return this.rel;
  }

  @HostBinding('attr.aria-label')
  get ariaLabel() {
    return this.accessibility.ariaLabel;
  }

  @HostBinding('attr.aria-describedby')
  get ariaDescribedBy() {
    return this.accessibility.ariaDescribedBy;
  }

  ngOnInit() {
    console.log('BreadcrumbLink Init - href:', this.href);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['href']) {
      console.log('BreadcrumbLink ngOnChanges - href:', changes['href'].currentValue);
    }
  }

  @HostBinding('click')
  protected handleClick(event: MouseEvent): void {
    this.linkClick.emit(event);
  }

  @HostBinding('keydown')
  protected handleKeyDown(event: KeyboardEvent): void {
    this.linkKeyDown.emit(event);
  }

  protected cn = cn;
}

/**
 * Breadcrumb Router Link Component (for internal routing)
 */
@Component({
  selector: 'a[BreadcrumbRouterLink]',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `<ng-content></ng-content>` // Content is projected directly into the host <a>
})
export class BreadcrumbRouterLink implements OnInit, OnChanges {
  @Input() routerLink?: string | string[];
  @Input() class = '';
  @Input() accessibility: { ariaLabel?: string; ariaDescribedBy?: string } = {};

  @Output() linkClick = new EventEmitter<MouseEvent>();
  @Output() linkKeyDown = new EventEmitter<KeyboardEvent>();

  @HostBinding('class')
  get hostClasses() {
    return cn(breadcrumbLinkVariants(), this.class); // No asChild variant needed
  }

  @HostBinding('routerLink')
  get routerLinkAttr() {
    return this.routerLink;
  }

  @HostBinding('attr.aria-label')
  get ariaLabel() {
    return this.accessibility.ariaLabel;
  }

  @HostBinding('attr.aria-describedby')
  get ariaDescribedBy() {
    return this.accessibility.ariaDescribedBy;
  }

  ngOnInit() {
    console.log('BreadcrumbRouterLink Init - routerLink:', this.routerLink);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['routerLink']) {
      console.log('BreadcrumbRouterLink ngOnChanges - routerLink:', changes['routerLink'].currentValue);
    }
  }

  @HostBinding('click')
  protected handleClick(event: MouseEvent): void {
    this.linkClick.emit(event);
  }

  @HostBinding('keydown')
  protected handleKeyDown(event: KeyboardEvent): void {
    this.linkKeyDown.emit(event);
  }

  protected cn = cn;
}

/**
 * Breadcrumb Page Component (for current page/non-interactive items)
 */
@Component({
  selector: 'span[BreadcrumbPage]',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>` // Content is projected directly into the host <span>
})
export class BreadcrumbPage {
  @Input() class = '';
  @Input() accessibility: { ariaLabel?: string; ariaDescribedBy?: string } = {};

  @Output() linkClick = new EventEmitter<MouseEvent>();
  @Output() linkKeyDown = new EventEmitter<KeyboardEvent>();

  @HostBinding('class')
  get hostClasses() {
    return cn(breadcrumbPageVariants(), this.class);
  }

  @HostBinding('attr.aria-label')
  get ariaLabel() {
    return this.accessibility.ariaLabel;
  }

  @HostBinding('attr.aria-describedby')
  get ariaDescribedBy() {
    return this.accessibility.ariaDescribedBy;
  }

  @HostBinding('attr.tabindex')
  get tabIndex() {
    // Current page is often non-interactive but focusable for accessibility if needed
    // Setting to '0' allows it to be focusable. Adjust if it should never be focusable.
    return '0';
  }

  @HostBinding('attr.role')
  get role() {
    // Current page can have a role of 'link' if it's conceptually a link to itself
    // or 'text'/'presentation' if purely display. 'button' provides interactivity.
    // 'link' is often appropriate for a current breadcrumb page.
    return 'link';
  }

  @HostBinding('attr.aria-current')
  get ariaCurrent() {
    return 'page';
  }

  @HostBinding('click')
  protected handleClick(event: MouseEvent): void {
    this.linkClick.emit(event);
  }

  @HostBinding('keydown')
  protected handleKeyDown(event: KeyboardEvent): void {
    this.linkKeyDown.emit(event);
  }

  protected cn = cn;
}

/**
 * Breadcrumb Separator Component
 */
@Component({
  selector: 'li[BreadcrumbSeparator]',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (customSeparator) {
      <ng-content></ng-content>
    } @else {
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        role="img"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m9 18 6-6-6-6"
        ></path>
      </svg>
    }
  `
})
export class BreadcrumbSeparator {
  @Input() customSeparator = false;
  @Input() class = '';

  @HostBinding('class')
  get hostClasses() {
    return cn(breadcrumbSeparatorVariants(), this.class);
  }

  @HostBinding('attr.role')
  get role() {
    return 'presentation';
  }

  @HostBinding('attr.aria-hidden')
  get ariaHidden() {
    return 'true';
  }

  protected breadcrumbSeparatorVariants = breadcrumbSeparatorVariants;
  protected cn = cn;
}

/**
 * Breadcrumb Ellipsis Component (for collapsed breadcrumbs)
 */
@Component({
  selector: 'span[BreadcrumbEllipsis]',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (customEllipsis) {
      <ng-content></ng-content>
    } @else {
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        role="img"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 5v.01M12 12v.01M12 19v.01"
        ></path>
      </svg>
    }
  `
})
export class BreadcrumbEllipsis {
  @Input() customEllipsis = false;
  @Input() class = '';

  @HostBinding('class')
  get hostClasses() {
    return cn(breadcrumbEllipsisVariants(), this.class);
  }

  @HostBinding('attr.role')
  get role() {
    return 'presentation';
  }

  @HostBinding('attr.aria-hidden')
  get ariaHidden() {
    return 'true';
  }

  protected breadcrumbEllipsisVariants = breadcrumbEllipsisVariants;
  protected cn = cn;
}

// Export variants for external use
export {
  breadcrumbVariants,
  breadcrumbListVariants,
  breadcrumbItemVariants,
  breadcrumbLinkVariants,
  breadcrumbPageVariants,
  breadcrumbSeparatorVariants,
  breadcrumbEllipsisVariants
};
