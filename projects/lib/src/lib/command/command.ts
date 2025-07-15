import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

// Command Container
const commandVariants = cva(
  'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
  {
    variants: {
      variant: {
        default: 'border',
        dialog: 'border shadow-md',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Component({
  selector: 'lib-command',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cn(commandVariants({ variant }), className)">
      <ng-content></ng-content>
    </div>
  `,
})
export class Command {
  @Input() variant: VariantProps<typeof commandVariants>['variant'] = 'default';
  @Input() className?: string;

  cn = cn;
  commandVariants = commandVariants;
}

// Command Input
@Component({
  selector: 'lib-command-input',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommandInput),
      multi: true
    }
  ],
  template: `
    <div class="flex items-center border-b px-3" cmdk-input-wrapper="">
      <svg
        class="mr-2 h-4 w-4 shrink-0 opacity-50"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        #inputRef
        [value]="value"
        (input)="onInput($event)"
        (focus)="onFocus()"
        (blur)="onBlur()"
        [placeholder]="placeholder"
        [disabled]="disabled"
        class="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        cmdk-input=""
      />
    </div>
  `,
})
export class CommandInput implements ControlValueAccessor, AfterViewInit {
  @Input() placeholder = 'Type a command or search...';
  @Input() disabled = false;
  @Input() className?: string;
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  value = '';
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  ngAfterViewInit() {
    // Auto-focus the input when component loads
    setTimeout(() => {
      this.inputRef?.nativeElement?.focus();
    }, 0);
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onFocus() {
    this.onTouched();
  }

  onBlur() {
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

// Command List
@Component({
  selector: 'lib-command-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-h-[300px] overflow-y-auto overflow-x-hidden" [class]="className">
      <ng-content></ng-content>
    </div>
  `,
})
export class CommandList {
  @Input() className?: string;
}

// Command Empty
@Component({
  selector: 'lib-command-empty',
  standalone: true,
  template: `
    <div class="py-6 text-center text-sm text-muted-foreground" [class]="className">
      <ng-content></ng-content>
    </div>
  `,
})
export class CommandEmpty {
  @Input() className?: string;
}

// Command Group
@Component({
  selector: 'lib-command-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="className">
      <div 
        *ngIf="heading" 
        class="px-2 py-1.5 text-xs font-medium text-muted-foreground"
      >
        {{ heading }}
      </div>
      <ng-content></ng-content>
    </div>
  `,
})
export class CommandGroup {
  @Input() heading?: string;
  @Input() className?: string;
}

// Command Item
@Component({
  selector: 'lib-command-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      (click)="onClick()"
      [class]="cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )"
      [attr.data-disabled]="disabled"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class CommandItem {
  @Input() disabled = false;
  @Input() className?: string;
  @Output() select = new EventEmitter<void>();

  cn = cn;

  onClick() {
    if (!this.disabled) {
      this.select.emit();
    }
  }
}

// Command Separator
@Component({
  selector: 'lib-command-separator',
  standalone: true,
  template: `
    <div class="-mx-1 h-px bg-border" [class]="className"></div>
  `,
})
export class CommandSeparator {
  @Input() className?: string;
}

// Command Shortcut
@Component({
  selector: 'lib-command-shortcut',
  standalone: true,
  template: `
    <span class="ml-auto text-xs tracking-widest text-muted-foreground" [class]="className">
      <ng-content></ng-content>
    </span>
  `,
})
export class CommandShortcut {
  @Input() className?: string;
}

// Command Dialog (combines Command with Dialog)
@Component({
  selector: 'lib-command-dialog',
  standalone: true,
  imports: [CommonModule, Command, CommandInput, CommandList],
  template: `
    <div 
      *ngIf="open"
      class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      (click)="onBackdropClick()"
    >
      <div class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
        <lib-command variant="dialog" class="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          <lib-command-input [placeholder]="placeholder"></lib-command-input>
          <lib-command-list>
            <ng-content></ng-content>
          </lib-command-list>
        </lib-command>
      </div>
    </div>
  `,
})
export class CommandDialog {
  @Input() open = false;
  @Input() placeholder = 'Type a command or search...';
  @Output() openChange = new EventEmitter<boolean>();

  onBackdropClick() {
    this.open = false;
    this.openChange.emit(this.open);
  }
}
