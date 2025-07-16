import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const tabsListVariants = cva(
  'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
  {
    variants: {
      variant: {
        default: '',
        underline: 'bg-transparent border-b border-border p-0 h-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        underline: 'border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Component({
  selector: 'Tabs',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`
})
export class Tabs {
  @Input() value = '';
  @Input() class = '';
  @Output() valueChange = new EventEmitter<string>();

  public get tabsClass(): string {
    return cn('', this.class);
  }

  onValueChange(newValue: string) {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }
}

@Component({
  selector: 'TabsList',
  standalone: true,
  imports: [],
  template: `<div [class]="tabsListClass"><ng-content></ng-content></div>`
})
export class TabsList {
  @Input() class = '';
  @Input() variant: VariantProps<typeof tabsListVariants>['variant'] = 'default';

  public get tabsListClass(): string {
    return cn(tabsListVariants({ variant: this.variant }), this.class);
  }
}

@Component({
  selector: 'TabsTrigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [class]="tabsTriggerClass" 
      [attr.data-state]="isActive ? 'active' : 'inactive'"
      (click)="onTriggerClick()">
      <ng-content></ng-content>
    </button>
  `
})
export class TabsTrigger {
  @Input() value = '';
  @Input() class = '';
  @Input() variant: VariantProps<typeof tabsTriggerVariants>['variant'] = 'default';
  @Input() isActive = false;
  @Output() triggerClick = new EventEmitter<string>();

  public get tabsTriggerClass(): string {
    return cn(tabsTriggerVariants({ variant: this.variant }), this.class);
  }

  onTriggerClick() {
    this.triggerClick.emit(this.value);
  }
}

@Component({
  selector: 'TabsContent',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="isActive" 
      class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <ng-content></ng-content>
    </div>
  `
})
export class TabsContent {
  @Input() value = '';
  @Input() isActive = false;
}
