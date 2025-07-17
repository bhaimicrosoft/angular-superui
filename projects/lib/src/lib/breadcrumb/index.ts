import { Component, Input, Output, EventEmitter, computed } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

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
    'rounded-sm px-1 py-0.5 -mx-1 -my-0.5'
  ],
  {
    variants: {
      asChild: {
        true: '',
        false: 'cursor-pointer'
      }
    },
    defaultVariants: {
      asChild: false
    }
  }
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
  selector: 'Breadcrumb',
  standalone: true,
  imports: [NgClass],
  template: `
    <nav 
      [ngClass]="cn(breadcrumbVariants(), class)"
      [attr.aria-label]="accessibility.ariaLabel || 'breadcrumb'"
      [attr.aria-live]="accessibility.ariaLive"
      role="navigation"
    >
      <ng-content></ng-content>
    </nav>
  `
})
export class BreadcrumbComponent {
  @Input() class = '';
  @Input() accessibility: BreadcrumbAccessibility = {
    ariaLabel: 'breadcrumb',
    ariaLive: 'polite'
  };

  protected breadcrumbVariants = breadcrumbVariants;
  protected cn = cn;
}

/**
 * Breadcrumb List Component
 */
@Component({
  selector: 'BreadcrumbList',
  standalone: true,
  imports: [NgClass],
  template: `
    <ol 
      [ngClass]="cn(breadcrumbListVariants(), class)"
      role="list"
    >
      <ng-content></ng-content>
    </ol>
  `
})
export class BreadcrumbListComponent {
  @Input() class = '';

  protected breadcrumbListVariants = breadcrumbListVariants;
  protected cn = cn;
}

/**
 * Breadcrumb Item Component
 */
@Component({
  selector: 'BreadcrumbItem',
  standalone: true,
  imports: [NgClass],
  template: `
    <li 
      [ngClass]="cn(breadcrumbItemVariants(), class)"
      role="listitem"
    >
      <ng-content></ng-content>
    </li>
  `
})
export class BreadcrumbItemComponent {
  @Input() class = '';

  protected breadcrumbItemVariants = breadcrumbItemVariants;
  protected cn = cn;
}

/**
 * Breadcrumb Link Component
 */
@Component({
  selector: 'BreadcrumbLink',
  standalone: true,
  imports: [NgClass, RouterLink],
  template: `
    @if (href && !routerLink) {
      <a
        [href]="href"
        [ngClass]="computedClasses()"
        [attr.aria-label]="accessibility.ariaLabel"
        [attr.aria-describedby]="accessibility.ariaDescribedBy"
        [attr.target]="target"
        [attr.rel]="rel"
        (click)="handleClick($event)"
        (keydown)="handleKeyDown($event)"
      >
        <ng-content></ng-content>
      </a>
    } @else if (routerLink) {
      <a
        [routerLink]="routerLink"
        [ngClass]="computedClasses()"
        [attr.aria-label]="accessibility.ariaLabel"
        [attr.aria-describedby]="accessibility.ariaDescribedBy"
        (click)="handleClick($event)"
        (keydown)="handleKeyDown($event)"
      >
        <ng-content></ng-content>
      </a>
    } @else {
      <span
        [ngClass]="computedClasses()"
        [attr.aria-label]="accessibility.ariaLabel"
        [attr.aria-describedby]="accessibility.ariaDescribedBy"
        [attr.tabindex]="asChild ? undefined : '0'"
        [attr.role]="asChild ? undefined : 'button'"
        (click)="handleClick($event)"
        (keydown)="handleKeyDown($event)"
      >
        <ng-content></ng-content>
      </span>
    }
  `
})
export class BreadcrumbLinkComponent {
  @Input() href?: string;
  @Input() routerLink?: string | string[];
  @Input() target?: '_blank' | '_self' | '_parent' | '_top';
  @Input() rel?: string;
  @Input() asChild = false;
  @Input() class = '';
  @Input() accessibility: { ariaLabel?: string; ariaDescribedBy?: string } = {};

  @Output() linkClick = new EventEmitter<MouseEvent>();
  @Output() linkKeyDown = new EventEmitter<KeyboardEvent>();

  protected computedClasses = computed(() => {
    return cn(
      breadcrumbLinkVariants({ asChild: this.asChild }),
      this.class
    );
  });

  protected cn = cn;

  protected handleClick(event: MouseEvent): void {
    this.linkClick.emit(event);
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    // Handle space and enter keys for accessibility
    if (!this.href && !this.routerLink && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.handleClick(event as any);
    }
    this.linkKeyDown.emit(event);
  }
}

/**
 * Breadcrumb Page Component (Current Page)
 */
@Component({
  selector: 'BreadcrumbPage',
  standalone: true,
  imports: [NgClass],
  template: `
    <span
      [ngClass]="cn(breadcrumbPageVariants({ current }), class)"
      [attr.aria-current]="current ? 'page' : undefined"
      [attr.aria-label]="accessibility.ariaLabel"
      role="text"
    >
      <ng-content></ng-content>
    </span>
  `
})
export class BreadcrumbPageComponent {
  @Input() current = true;
  @Input() class = '';
  @Input() accessibility: { ariaLabel?: string } = {};

  protected breadcrumbPageVariants = breadcrumbPageVariants;
  protected cn = cn;
}

/**
 * Breadcrumb Separator Component
 */
@Component({
  selector: 'BreadcrumbSeparator',
  standalone: true,
  imports: [NgClass],
  template: `
    <li 
      role="presentation" 
      [attr.aria-hidden]="true"
      [ngClass]="cn(breadcrumbSeparatorVariants(), class)"
    >
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
    </li>
  `
})
export class BreadcrumbSeparatorComponent {
  @Input() customSeparator = false;
  @Input() class = '';

  protected breadcrumbSeparatorVariants = breadcrumbSeparatorVariants;
  protected cn = cn;
}

/**
 * Breadcrumb Ellipsis Component (for collapsed breadcrumbs)
 */
@Component({
  selector: 'BreadcrumbEllipsis',
  standalone: true,
  imports: [NgClass],
  template: `
    <span
      role="presentation"
      [attr.aria-hidden]="true"
      [ngClass]="cn(breadcrumbEllipsisVariants(), class)"
    >
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
    </span>
  `
})
export class BreadcrumbEllipsisComponent {
  @Input() customEllipsis = false;
  @Input() class = '';

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
