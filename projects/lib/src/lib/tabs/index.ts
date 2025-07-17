import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const tabsVariants = cva(
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

const tabsListVariants = cva(
  'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
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

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
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

const tabsContentVariants = cva(
  'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
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
  selector: 'TabsTrigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      role="tab"
      [class]="cn(tabsTriggerVariants({ variant }), className)"
      [attr.data-state]="isActive ? 'active' : 'inactive'"
      [attr.aria-selected]="isActive"
      [disabled]="disabled"
      (click)="onClick()"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class TabsTrigger {
  @Input() value = '';
  @Input() variant: VariantProps<typeof tabsTriggerVariants>['variant'] = 'default';
  @Input() className?: string;
  @Input() disabled = false;
  @Output() triggerClick = new EventEmitter<string>();

  isActive = false;

  cn = cn;
  tabsTriggerVariants = tabsTriggerVariants;

  onClick() {
    if (!this.disabled) {
      this.triggerClick.emit(this.value);
    }
  }
}

@Component({
  selector: 'TabsList',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cn(tabsListVariants({ variant }), className)" role="tablist">
      <ng-content></ng-content>
    </div>
  `
})
export class TabsList {
  @Input() variant: VariantProps<typeof tabsListVariants>['variant'] = 'default';
  @Input() className?: string;

  cn = cn;
  tabsListVariants = tabsListVariants;
}

@Component({
  selector: 'TabsContent',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="isActive"
      [class]="cn(tabsContentVariants({ variant }), className)"
      role="tabpanel"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class TabsContent {
  @Input() value = '';
  @Input() variant: VariantProps<typeof tabsContentVariants>['variant'] = 'default';
  @Input() className?: string;

  isActive = false;

  cn = cn;
  tabsContentVariants = tabsContentVariants;
}

@Component({
  selector: 'Tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cn(tabsVariants({ variant }), className)">
      <ng-content></ng-content>
    </div>
  `
})
export class Tabs implements AfterContentInit {
  @Input() value = '';
  @Input() variant: VariantProps<typeof tabsVariants>['variant'] = 'default';
  @Input() className?: string;
  @Output() valueChange = new EventEmitter<string>();

  @ContentChildren(TabsTrigger) triggers!: QueryList<TabsTrigger>;
  @ContentChildren(TabsContent) contents!: QueryList<TabsContent>;

  cn = cn;
  tabsVariants = tabsVariants;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.triggers.forEach(trigger => {
      trigger.triggerClick.subscribe((value: string) => {
        this.selectTab(value);
      });
    });

    // Set first tab as active if no value is set
    if (!this.value && this.triggers.length > 0) {
      this.value = this.triggers.first.value;
    }

    this.updateActiveStates();
  }

  selectTab(value: string) {
    this.value = value;
    this.valueChange.emit(value);
    this.updateActiveStates();
  }

  private updateActiveStates() {
    this.triggers.forEach(trigger => {
      trigger.isActive = trigger.value === this.value;
    });

    this.contents.forEach(content => {
      content.isActive = content.value === this.value;
    });

    this.cdr.detectChanges();
  }
}