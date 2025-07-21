import { Component, Input, Output, EventEmitter, signal, computed, OnDestroy, ElementRef, ViewChild, AfterViewInit, effect, Injectable, inject, TemplateRef, ContentChild } from '@angular/core';
import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/**
 * Dialog Service for managing dialog state globally
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private openDialogs = signal<Set<string>>(new Set());
  
  open(id: string) {
    this.openDialogs.update(dialogs => new Set([...dialogs, id]));
    document.body.style.overflow = 'hidden';
  }
  
  close(id: string) {
    this.openDialogs.update(dialogs => {
      const newDialogs = new Set(dialogs);
      newDialogs.delete(id);
      return newDialogs;
    });
    
    if (this.openDialogs().size === 0) {
      document.body.style.overflow = '';
    }
  }
  
  isOpen(id: string) {
    return this.openDialogs().has(id);
  }
  
  closeAll() {
    this.openDialogs.set(new Set());
    document.body.style.overflow = '';
  }
}

/**
 * Dialog Overlay Variants
 */
const dialogOverlayVariants = cva(
  [
    'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
  ]
);

/**
 * Dialog Content Variants
 */
const dialogContentVariants = cva(
  [
    'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]',
    'gap-4 border bg-background p-6 shadow-lg duration-200',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
    'sm:rounded-lg'
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-xl',
        xl: 'max-w-2xl',
        '2xl': 'max-w-4xl',
        full: 'max-w-[95vw] max-h-[95vh]'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

/**
 * Dialog Header Variants
 */
const dialogHeaderVariants = cva(
  'flex flex-col space-y-1.5 text-center sm:text-left'
);

/**
 * Dialog Footer Variants
 */
const dialogFooterVariants = cva(
  'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2'
);

/**
 * Dialog Title Variants
 */
const dialogTitleVariants = cva(
  'text-lg font-semibold leading-none tracking-tight'
);

/**
 * Dialog Description Variants
 */
const dialogDescriptionVariants = cva(
  'text-sm text-muted-foreground'
);

/**
 * Dialog Close Button Variants
 */
const dialogCloseVariants = cva(
  [
    'absolute right-4 top-4 rounded-sm opacity-70',
    'ring-offset-background transition-opacity',
    'hover:opacity-100 focus:outline-none focus:ring-2',
    'focus:ring-ring focus:ring-offset-2',
    'disabled:pointer-events-none'
  ]
);

/**
 * Dialog Close Component
 */
@Component({
  selector: 'DialogClose',
  standalone: true,
  imports: [NgClass, NgIf],
  template: `
    <button
      type="button"
      [class]="cn(dialogCloseVariants(), className)"
      (click)="closeDialog()"
      [attr.aria-label]="ariaLabel"
      [disabled]="disabled"
    >
      <ng-content>
        <svg
          *ngIf="!hasContent"
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </ng-content>
    </button>
  `
})
export class DialogClose {
  @Input() className: string = '';
  @Input() disabled: boolean = false;
  @Input() dialogId: string = '';
  @Input() ariaLabel: string = 'Close dialog';
  
  hasContent = false;
  
  private dialogService = inject(DialogService);
  
  ngAfterContentInit() {
    // Check if there's any content projected
    this.hasContent = this.elementRef.nativeElement.children.length > 0;
  }
  
  constructor(private elementRef: ElementRef) {}
  
  closeDialog() {
    if (!this.disabled && this.dialogId) {
      this.dialogService.close(this.dialogId);
    }
  }
  
  protected readonly cn = cn;
  protected readonly dialogCloseVariants = dialogCloseVariants;
}

/**
 * Dialog Trigger Component
 */
@Component({
  selector: 'DialogTrigger',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      type="button"
      [class]="cn('inline-flex items-center justify-center', className)"
      (click)="openDialog()"
      [attr.aria-haspopup]="'dialog'"
      [attr.aria-expanded]="isOpen()"
      [disabled]="disabled"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class DialogTrigger {
  @Input() className: string = '';
  @Input() disabled: boolean = false;
  @Input() dialogId: string = '';
  
  private dialogService = inject(DialogService);
  
  openDialog() {
    if (!this.disabled && this.dialogId) {
      this.dialogService.open(this.dialogId);
    }
  }
  
  isOpen() {
    return this.dialogService.isOpen(this.dialogId);
  }
  
  protected readonly cn = cn;
}

/**
 * Dialog Header Component
 */
@Component({
  selector: 'DialogHeader',
  standalone: true,
  imports: [NgClass],
  template: `
    <div [class]="cn(dialogHeaderVariants(), className)">
      <ng-content></ng-content>
    </div>
  `
})
export class DialogHeader {
  @Input() className: string = '';
  
  protected readonly cn = cn;
  protected readonly dialogHeaderVariants = dialogHeaderVariants;
}

/**
 * Dialog Footer Component
 */
@Component({
  selector: 'DialogFooter',
  standalone: true,
  imports: [NgClass],
  template: `
    <div [class]="cn(dialogFooterVariants(), className)">
      <ng-content></ng-content>
    </div>
  `
})
export class DialogFooter {
  @Input() className: string = '';
  
  protected readonly cn = cn;
  protected readonly dialogFooterVariants = dialogFooterVariants;
}

/**
 * Dialog Title Component
 */
@Component({
  selector: 'DialogTitle',
  standalone: true,
  imports: [NgClass],
  template: `
    <h2 
      [class]="cn(dialogTitleVariants(), className)"
      [id]="titleId"
    >
      <ng-content></ng-content>
    </h2>
  `
})
export class DialogTitle {
  @Input() className: string = '';
  @Input() titleId: string = '';
  
  protected readonly cn = cn;
  protected readonly dialogTitleVariants = dialogTitleVariants;
}

/**
 * Dialog Description Component
 */
@Component({
  selector: 'DialogDescription',
  standalone: true,
  imports: [NgClass],
  template: `
    <p 
      [class]="cn(dialogDescriptionVariants(), className)"
      [id]="descriptionId"
    >
      <ng-content></ng-content>
    </p>
  `
})
export class DialogDescription {
  @Input() className: string = '';
  @Input() descriptionId: string = '';
  
  protected readonly cn = cn;
  protected readonly dialogDescriptionVariants = dialogDescriptionVariants;
}

/**
 * Dialog Content Component
 */
@Component({
  selector: 'DialogContent',
  standalone: true,
  imports: [NgClass, NgIf, DialogClose],
  template: `
    <div
      *ngIf="isOpen()"
      [class]="cn(dialogContentVariants({ size }), className)"
      [attr.data-state]="isOpen() ? 'open' : 'closed'"
      [attr.role]="'dialog'"
      [attr.aria-modal]="'true'"
      [attr.aria-labelledby]="ariaLabelledby"
      [attr.aria-describedby]="ariaDescribedby"
      (keydown.escape)="onEscapeKey($event)"
      [tabindex]="-1"
      #contentElement
    >
      <ng-content></ng-content>
      
      <!-- Default close button if showCloseButton is true -->
      <DialogClose 
        *ngIf="showCloseButton"
        [dialogId]="dialogId"
        [className]="closeButtonClass"
      />
    </div>
  `
})
export class DialogContent implements AfterViewInit, OnDestroy {
  @Input() className: string = '';
  @Input() dialogId: string = '';
  @Input() size: VariantProps<typeof dialogContentVariants>['size'] = 'md';
  @Input() showCloseButton: boolean = true;
  @Input() closeButtonClass: string = '';
  @Input() ariaLabelledby: string = '';
  @Input() ariaDescribedby: string = '';
  @Input() closeOnEscape: boolean = true;
  @Input() closeOnOverlayClick: boolean = true;
  
  @ViewChild('contentElement') contentElement!: ElementRef;
  
  private dialogService = inject(DialogService);
  private previousActiveElement: HTMLElement | null = null;
  private wasOpenPreviously = false;
  
  constructor() {
    // Watch for dialog state changes in constructor (injection context)
    effect(() => {
      const isCurrentlyOpen = this.isOpen();
      
      if (isCurrentlyOpen && !this.wasOpenPreviously) {
        // Dialog just opened
        setTimeout(() => this.handleDialogOpen());
      } else if (!isCurrentlyOpen && this.wasOpenPreviously) {
        // Dialog just closed
        this.handleDialogClose();
      }
      
      this.wasOpenPreviously = isCurrentlyOpen;
    });
  }
  
  ngAfterViewInit() {
    // Initial check if dialog is already open
    if (this.isOpen()) {
      this.handleDialogOpen();
    }
  }
  
  ngOnDestroy() {
    if (this.isOpen()) {
      this.dialogService.close(this.dialogId);
    }
    this.restoreFocus();
  }
  
  isOpen() {
    return this.dialogService.isOpen(this.dialogId);
  }
  
  onEscapeKey(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (this.closeOnEscape && keyboardEvent.key === 'Escape') {
      keyboardEvent.preventDefault();
      this.dialogService.close(this.dialogId);
    }
  }
  
  private handleDialogOpen() {
    // Store the currently focused element
    this.previousActiveElement = document.activeElement as HTMLElement;
    
    // Focus the dialog content
    setTimeout(() => {
      if (this.contentElement?.nativeElement) {
        this.contentElement.nativeElement.focus();
      }
    });
    
    // Trap focus within the dialog
    this.trapFocus();
  }
  
  private handleDialogClose() {
    this.restoreFocus();
  }
  
  private trapFocus() {
    if (!this.contentElement?.nativeElement) return;
    
    const focusableElements = this.contentElement.nativeElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };
    
    this.contentElement.nativeElement.addEventListener('keydown', handleTabKey);
    
    // Clean up event listener when dialog closes
    const cleanup = () => {
      this.contentElement.nativeElement?.removeEventListener('keydown', handleTabKey);
    };
    
    // Store cleanup function for later use
    (this.contentElement.nativeElement as any).__focusTrapCleanup = cleanup;
  }
  
  private restoreFocus() {
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
    }
    
    // Clean up focus trap
    if (this.contentElement?.nativeElement) {
      const cleanup = (this.contentElement.nativeElement as any).__focusTrapCleanup;
      if (cleanup) {
        cleanup();
        delete (this.contentElement.nativeElement as any).__focusTrapCleanup;
      }
    }
  }
  
  protected readonly cn = cn;
  protected readonly dialogContentVariants = dialogContentVariants;
}

/**
 * Dialog Overlay Component
 */
@Component({
  selector: 'DialogOverlay',
  standalone: true,
  imports: [NgClass, NgIf],
  template: `
    <div
      *ngIf="isOpen()"
      [class]="cn(dialogOverlayVariants(), className)"
      [attr.data-state]="isOpen() ? 'open' : 'closed'"
      (click)="onOverlayClick()"
    ></div>
  `
})
export class DialogOverlay {
  @Input() className: string = '';
  @Input() dialogId: string = '';
  @Input() closeOnClick: boolean = true;
  
  private dialogService = inject(DialogService);
  
  isOpen() {
    return this.dialogService.isOpen(this.dialogId);
  }
  
  onOverlayClick() {
    if (this.closeOnClick) {
      this.dialogService.close(this.dialogId);
    }
  }
  
  protected readonly cn = cn;
  protected readonly dialogOverlayVariants = dialogOverlayVariants;
}

/**
 * Main Dialog Component
 */
@Component({
  selector: 'Dialog',
  standalone: true,
  imports: [NgClass, NgIf, DialogOverlay, DialogContent],
  template: `
    <div>
      <!-- Dialog Trigger -->
      <ng-content select="DialogTrigger"></ng-content>
      
      <!-- Dialog Portal -->
      <div *ngIf="isOpen()">
        <!-- Overlay -->
        <DialogOverlay
          [dialogId]="dialogId"
          [className]="overlayClassName"
          [closeOnClick]="closeOnOverlayClick"
        />
        
        <!-- Content -->
        <ng-content select="DialogContent"></ng-content>
      </div>
    </div>
  `
})
export class Dialog implements OnDestroy {
  @Input() dialogId: string = '';
  @Input() overlayClassName: string = '';
  @Input() closeOnOverlayClick: boolean = true;
  @Input() defaultOpen: boolean = false;
  
  @Output() openChange = new EventEmitter<boolean>();
  
  private dialogService = inject(DialogService);
  private dialogIdGenerated = `dialog-${Math.random().toString(36).substr(2, 9)}`;
  
  constructor() {
    // Watch for dialog state changes in constructor (injection context)
    effect(() => {
      const isOpen = this.isOpen();
      this.openChange.emit(isOpen);
    });
  }
  
  ngAfterViewInit() {
    // Generate ID if not provided
    if (!this.dialogId) {
      this.dialogId = this.dialogIdGenerated;
    }
    
    // Open dialog if defaultOpen is true
    if (this.defaultOpen) {
      this.dialogService.open(this.dialogId);
    }
  }
  
  ngOnDestroy() {
    if (this.isOpen()) {
      this.dialogService.close(this.dialogId);
    }
  }
  
  isOpen() {
    return this.dialogService.isOpen(this.dialogId);
  }
  
  open() {
    this.dialogService.open(this.dialogId);
  }
  
  close() {
    this.dialogService.close(this.dialogId);
  }
  
  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }
}

export type DialogContentVariants = VariantProps<typeof dialogContentVariants>;
