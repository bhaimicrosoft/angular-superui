import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const breadcrumbVariants = cva(
  '',
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

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
  disabled?: boolean;
}

// Breadcrumb Root
@Component({
  selector: 'Breadcrumb',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav aria-label="breadcrumb" [class]="className">
      <ol class="flex items-center space-x-1 text-sm text-muted-foreground">
        <ng-content></ng-content>
      </ol>
    </nav>
  `,
})
export class Breadcrumb {
  @Input() className?: string;
}

// Breadcrumb List
@Component({
  selector: 'BreadcrumbList',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ol class="flex items-center space-x-1" [class]="className">
      <ng-content></ng-content>
    </ol>
  `,
})
export class BreadcrumbList {
  @Input() className?: string;
}

// Breadcrumb Item
@Component({
  selector: 'BreadcrumbItem',
  standalone: true,
  imports: [CommonModule],
  template: `
    <li class="flex items-center space-x-1" [class]="className">
      <ng-content></ng-content>
    </li>
  `,
})
export class BreadcrumbItem {
  @Input() className?: string;
}

// Breadcrumb Link
@Component({
  selector: 'BreadcrumbLink',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      *ngIf="href && !disabled; else textTemplate"
      [href]="href"
      (click)="onClick($event)"
      [class]="cn(
        'transition-colors hover:text-foreground',
        { 'text-foreground font-medium': active },
        { 'opacity-50 cursor-not-allowed': disabled },
        className
      )"
    >
      <ng-content></ng-content>
    </a>
    
    <ng-template #textTemplate>
      <span
        [class]="cn(
          { 'text-foreground font-medium': active },
          { 'opacity-50': disabled },
          className
        )"
      >
        <ng-content></ng-content>
      </span>
    </ng-template>
  `,
})
export class BreadcrumbLink {
  @Input() href?: string;
  @Input() active = false;
  @Input() disabled = false;
  @Input() className?: string;
  @Output() click = new EventEmitter<Event>();

  cn = cn;

  onClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.click.emit(event);
  }
}

// Breadcrumb Page (Current page)
@Component({
  selector: 'BreadcrumbPage',
  standalone: true,
  template: `
    <span class="font-normal text-foreground" role="link" aria-disabled="true" aria-current="page" [class]="className">
      <ng-content></ng-content>
    </span>
  `,
})
export class BreadcrumbPage {
  @Input() className?: string;
}

// Breadcrumb Separator
@Component({
  selector: 'BreadcrumbSeparator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span role="presentation" aria-hidden="true" class="text-muted-foreground" [class]="className">
      <ng-content>
        <svg *ngIf="!hasContent" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
        </svg>
      </ng-content>
    </span>
  `,
})
export class BreadcrumbSeparator {
  @Input() className?: string;

  get hasContent(): boolean {
    // This is a simple check - in a real implementation you might use ContentChild
    return false;
  }
}

// Breadcrumb Ellipsis (for collapsed items)
@Component({
  selector: 'BreadcrumbEllipsis',
  standalone: true,
  template: `
    <span class="flex h-9 w-9 items-center justify-center" [class]="className">
      <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
        <circle cx="3" cy="3" r="3"/>
        <circle cx="10" cy="3" r="3"/>
        <circle cx="17" cy="3" r="3"/>
      </svg>
      <span class="sr-only">More</span>
    </span>
  `,
})
export class BreadcrumbEllipsis {
  @Input() className?: string;
}

// Complete Breadcrumb Component
@Component({
  selector: 'BreadcrumbComplete',
  standalone: true,
  imports: [CommonModule, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis],
  template: `
    <nav aria-label="breadcrumb" [class]="className">
      <BreadcrumbList>
        <ng-container *ngFor="let item of visibleItems; let last = last; let i = index">
          <BreadcrumbItem>
            <BreadcrumbLink
              *ngIf="!last"
              [href]="item.href"
              [active]="!!item.active"
              [disabled]="!!item.disabled"
              (click)="onItemClick($event, item)"
            >
              {{ item.label }}
            </BreadcrumbLink>
            
            <BreadcrumbPage *ngIf="last">
              {{ item.label }}
            </BreadcrumbPage>
          </BreadcrumbItem>
          
          <BreadcrumbSeparator *ngIf="!last"></BreadcrumbSeparator>
        </ng-container>
        
        <!-- Show ellipsis if items are collapsed -->
        <ng-container *ngIf="hasCollapsedItems">
          <BreadcrumbItem>
            <BreadcrumbEllipsis></BreadcrumbEllipsis>
          </BreadcrumbItem>
          <BreadcrumbSeparator></BreadcrumbSeparator>
        </ng-container>
      </BreadcrumbList>
    </nav>
  `,
})
export class BreadcrumbComplete {
  @Input() items: BreadcrumbItem[] = [];
  @Input() maxItems = 3;
  @Input() className?: string;
  @Output() itemClick = new EventEmitter<{ event: Event; item: BreadcrumbItem }>();

  get visibleItems(): BreadcrumbItem[] {
    if (this.items.length <= this.maxItems) {
      return this.items;
    }
    
    // Show first item, ellipsis, and last few items
    const lastItems = this.items.slice(-(this.maxItems - 1));
    return [this.items[0], ...lastItems];
  }

  get hasCollapsedItems(): boolean {
    return this.items.length > this.maxItems;
  }

  onItemClick(event: Event, item: BreadcrumbItem) {
    this.itemClick.emit({ event, item });
  }
}
