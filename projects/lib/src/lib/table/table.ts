import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const tableVariants = cva(
  'w-full caption-bottom text-sm',
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

const tableHeaderVariants = cva(
  '[&_tr]:border-b',
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

const tableBodyVariants = cva(
  '[&_tr:last-child]:border-0',
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

const tableRowVariants = cva(
  'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
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

const tableHeadVariants = cva(
  'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
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

const tableCellVariants = cva(
  'p-4 align-middle [&:has([role=checkbox])]:pr-0',
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

const tableCaptionVariants = cva(
  'mt-4 text-sm text-muted-foreground',
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
  selector: 'lib-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full overflow-auto">
      <table [class]="tableClass">
        <ng-content></ng-content>
      </table>
    </div>
  `
})
export class Table {
  @Input() class = '';
  @Input() variant: VariantProps<typeof tableVariants>['variant'] = 'default';

  public get tableClass(): string {
    return cn(tableVariants({ variant: this.variant }), this.class);
  }
}

@Component({
  selector: 'lib-table-header',
  standalone: true,
  imports: [],
  template: `<thead [class]="tableHeaderClass"><ng-content></ng-content></thead>`
})
export class TableHeader {
  @Input() class = '';
  @Input() variant: VariantProps<typeof tableHeaderVariants>['variant'] = 'default';

  public get tableHeaderClass(): string {
    return cn(tableHeaderVariants({ variant: this.variant }), this.class);
  }
}

@Component({
  selector: 'lib-table-body',
  standalone: true,
  imports: [],
  template: `<tbody [class]="tableBodyClass"><ng-content></ng-content></tbody>`
})
export class TableBody {
  @Input() class = '';
  @Input() variant: VariantProps<typeof tableBodyVariants>['variant'] = 'default';

  public get tableBodyClass(): string {
    return cn(tableBodyVariants({ variant: this.variant }), this.class);
  }
}

@Component({
  selector: 'lib-table-footer',
  standalone: true,
  imports: [],
  template: `<tfoot class="border-t bg-muted/50 font-medium [&>tr]:last:border-b-0"><ng-content></ng-content></tfoot>`
})
export class TableFooter {
  @Input() class = '';
}

@Component({
  selector: 'lib-table-row',
  standalone: true,
  imports: [],
  template: `<tr [class]="tableRowClass"><ng-content></ng-content></tr>`
})
export class TableRow {
  @Input() class = '';
  @Input() variant: VariantProps<typeof tableRowVariants>['variant'] = 'default';

  public get tableRowClass(): string {
    return cn(tableRowVariants({ variant: this.variant }), this.class);
  }
}

@Component({
  selector: 'lib-table-head',
  standalone: true,
  imports: [],
  template: `<th [class]="tableHeadClass"><ng-content></ng-content></th>`
})
export class TableHead {
  @Input() class = '';
  @Input() variant: VariantProps<typeof tableHeadVariants>['variant'] = 'default';

  public get tableHeadClass(): string {
    return cn(tableHeadVariants({ variant: this.variant }), this.class);
  }
}

@Component({
  selector: 'lib-table-cell',
  standalone: true,
  imports: [],
  template: `<td [class]="tableCellClass"><ng-content></ng-content></td>`
})
export class TableCell {
  @Input() class = '';
  @Input() variant: VariantProps<typeof tableCellVariants>['variant'] = 'default';

  public get tableCellClass(): string {
    return cn(tableCellVariants({ variant: this.variant }), this.class);
  }
}

@Component({
  selector: 'lib-table-caption',
  standalone: true,
  imports: [],
  template: `<caption [class]="tableCaptionClass"><ng-content></ng-content></caption>`
})
export class TableCaption {
  @Input() class = '';
  @Input() variant: VariantProps<typeof tableCaptionVariants>['variant'] = 'default';

  public get tableCaptionClass(): string {
    return cn(tableCaptionVariants({ variant: this.variant }), this.class);
  }
}
