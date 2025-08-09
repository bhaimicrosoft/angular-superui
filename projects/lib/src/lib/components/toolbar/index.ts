import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Variants
const toolbarVariants = cva(
  [
    'w-full inline-flex items-center gap-2 rounded-md border border-border bg-background/80 text-foreground shadow-sm',
    'backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'transition-colors duration-200',
  ],
  {
    variants: {
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-2 text-sm',
        lg: 'px-4 py-3 text-base',
      },
      variant: {
        default: '',
        subtle: 'bg-muted/40',
        outline: 'border-2',
        ghost: 'bg-transparent border-transparent shadow-none',
        elevated: 'shadow-md',
      },
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
      sticky: {
        true: 'sticky top-0 z-30',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      orientation: 'horizontal',
      sticky: false,
    },
  }
);

const groupVariants = cva('inline-flex items-center gap-2', {
  variants: {
    separated: {
      true: 'pl-2 ml-1 border-l border-border',
      false: '',
    },
  },
  defaultVariants: { separated: false },
});

export type ToolbarVariant = VariantProps<typeof toolbarVariants>;

@Component({
  selector: 'Toolbar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      role="toolbar"
      [attr.aria-label]="ariaLabel() || null"
      [class]="classes()"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class Toolbar {
  size = input<ToolbarVariant['size']>('md');
  variant = input<ToolbarVariant['variant']>('default');
  orientation = input<ToolbarVariant['orientation']>('horizontal');
  sticky = input<ToolbarVariant['sticky']>(false);
  ariaLabel = input<string>();

  classes = computed(() => cn(toolbarVariants({
    size: this.size(),
    variant: this.variant(),
    orientation: this.orientation(),
    sticky: this.sticky(),
  })));
}

@Component({
  selector: 'ToolbarGroup',
  standalone: true,
  template: `
    <div [class]="classes()">
      <ng-content></ng-content>
    </div>
  `,
})
export class ToolbarGroup {
  separated = input<boolean>(false);
  classes = computed(() => cn(groupVariants({ separated: this.separated() })));
}

@Component({
  selector: 'ToolbarTitle',
  standalone: true,
  template: `
    <div class="text-sm font-medium text-muted-foreground">
      <ng-content></ng-content>
    </div>
  `,
})
export class ToolbarTitle {}

@Component({
  selector: 'ToolbarSpacer',
  standalone: true,
  template: `<div class="grow" aria-hidden="true"></div>`
})
export class ToolbarSpacer {}
