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
  selector: 'Table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full overflow-auto">
      <table [class]="cn(tableVariants({ variant }), className)">
        <ng-content></ng-content>
      </table>
    </div>
  `
})
export class Table {
  @Input() variant: VariantProps<typeof tableVariants>['variant'] = 'default';
  @Input() className?: string;

  cn = cn;
  tableVariants = tableVariants;
}

@Component({
  selector: 'TableHeader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <thead [class]="cn(tableHeaderVariants({ variant }), className)">
      <ng-content></ng-content>
    </thead>
  `
})
export class TableHeader {
  @Input() variant: VariantProps<typeof tableHeaderVariants>['variant'] = 'default';
  @Input() className?: string;

  cn = cn;
  tableHeaderVariants = tableHeaderVariants;
}

@Component({
  selector: 'TableBody',
  standalone: true,
  imports: [CommonModule],
  template: `
    <tbody [class]="cn(tableBodyVariants({ variant }), className)">
      <ng-content></ng-content>
    </tbody>
  `
})
export class TableBody {
  @Input() variant: VariantProps<typeof tableBodyVariants>['variant'] = 'default';
  @Input() className?: string;

  cn = cn;
  tableBodyVariants = tableBodyVariants;
}

@Component({
  selector: 'TableRow',
  standalone: true,
  imports: [CommonModule],
  template: `
    <tr [class]="cn(tableRowVariants({ variant }), className)">
      <ng-content></ng-content>
    </tr>
  `
})
export class TableRow {
  @Input() variant: VariantProps<typeof tableRowVariants>['variant'] = 'default';
  @Input() className?: string;

  cn = cn;
  tableRowVariants = tableRowVariants;
}

@Component({
  selector: 'TableHead',
  standalone: true,
  imports: [CommonModule],
  template: `
    <th [class]="cn(tableHeadVariants({ variant }), className)">
      <ng-content></ng-content>
    </th>
  `
})
export class TableHead {
  @Input() variant: VariantProps<typeof tableHeadVariants>['variant'] = 'default';
  @Input() className?: string;

  cn = cn;
  tableHeadVariants = tableHeadVariants;
}

@Component({
  selector: 'TableCell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <td [class]="cn(tableCellVariants({ variant }), className)">
      <ng-content></ng-content>
    </td>
  `
})
export class TableCell {
  @Input() variant: VariantProps<typeof tableCellVariants>['variant'] = 'default';
  @Input() className?: string;

  cn = cn;
  tableCellVariants = tableCellVariants;
}

@Component({
  selector: 'TableCaption',
  standalone: true,
  imports: [CommonModule],
  template: `
    <caption [class]="cn(tableCaptionVariants({ variant }), className)">
      <ng-content></ng-content>
    </caption>
  `
})
export class TableCaption {
  @Input() variant: VariantProps<typeof tableCaptionVariants>['variant'] = 'default';
  @Input() className?: string;

  cn = cn;
  tableCaptionVariants = tableCaptionVariants;
}