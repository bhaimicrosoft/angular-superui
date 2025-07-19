import { Component, Input, Output, EventEmitter, signal, computed, OnDestroy, ElementRef, ViewChild, AfterViewInit, effect } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/**
 * AlertDialog Overlay Variants
 */
const alertDialogOverlayVariants = cva(
  [
    'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
  ]
);

/**
 * AlertDialog Content Variants
 */
const alertDialogContentVariants = cva(
  [
    'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]',
    'gap-4 border bg-background p-6 shadow-lg duration-200',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
    'sm:rounded-lg'
  ]
);

/**
 * AlertDialog Header Variants
 */
const alertDialogHeaderVariants = cva(
  'flex flex-col space-y-2 text-center sm:text-left'
);

/**
 * AlertDialog Footer Variants
 */
const alertDialogFooterVariants = cva(
  'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2'
);

/**
 * AlertDialog Title Variants
 */
const alertDialogTitleVariants = cva(
  'text-lg font-semibold'
);

/**
 * AlertDialog Description Variants
 */
const alertDialogDescriptionVariants = cva(
  'text-sm text-muted-foreground'
);

/**
 * AlertDialog Action Variants
 */
const alertDialogActionVariants = cva(
  [
    'inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium',
    'ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  ],
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:text-destructive-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-secondary-foreground',
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

/**
 * AlertDialog Cancel Variants
 */
const alertDialogCancelVariants = cva(
  [
    'mt-2 inline-flex h-10 items-center justify-center rounded-md border border-input',
    'bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors',
    'text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    'sm:mt-0'
  ]
);

/**
 * Accessibility interface for AlertDialog
 */
export interface AlertDialogAccessibility {
  /** ARIA label for the dialog */
  ariaLabel?: string;
  /** ARIA labelledby referencing the title element */
  ariaLabelledBy?: string;
  /** ARIA describedby referencing the description element */
  ariaDescribedBy?: string;
  /** Role override for the dialog */
  role?: 'dialog' | 'alertdialog';
  /** Live region politeness level */
  ariaLive?: 'off' | 'polite' | 'assertive';
  /** Custom announcement text for screen readers */
  announceText?: string;
}

/**
 * AlertDialog Root Component
 */
@Component({
  selector: 'AlertDialog',
  standalone: true,
  imports: [NgClass],
  template: `
    @if (isDialogOpen()) {
      <div class="fixed inset-0 z-50" [attr.data-state]="isDialogOpen() ? 'open' : 'closed'">
        <!-- Overlay -->
        <div
          [ngClass]="cn(alertDialogOverlayVariants(), overlayClass)"
          [attr.data-state]="isDialogOpen() ? 'open' : 'closed'"
          (click)="handleOverlayClick($event)"
          [attr.aria-hidden]="true"
        ></div>

        <!-- Content Container -->
        <div
          #contentElement
          [ngClass]="cn(alertDialogContentVariants(), contentClass)"
          [attr.data-state]="isDialogOpen() ? 'open' : 'closed'"
          [attr.role]="accessibility.role || 'alertdialog'"
          [attr.aria-modal]="true"
          [attr.aria-label]="accessibility.ariaLabel"
          [attr.aria-labelledby]="accessibility.ariaLabelledBy"
          [attr.aria-describedby]="accessibility.ariaDescribedBy"
          [attr.tabindex]="-1"
          (keydown)="handleKeyDown($event)"
        >
          <ng-content></ng-content>
        </div>
      </div>
    }
  `
})
export class AlertDialog implements OnDestroy, AfterViewInit {
  @ViewChild('contentElement') contentElement?: ElementRef<HTMLElement>;

  /** Whether the alert dialog is open */
  @Input() set isOpen(value: boolean) {
    this.isDialogOpen.set(value);
  }

  /** Custom class for overlay */
  @Input() overlayClass = '';

  /** Custom class for content */
  @Input() contentClass = '';

  /** Accessibility configuration */
  @Input() accessibility: AlertDialogAccessibility = {};

  /** Prevent closing on overlay click */
  @Input() preventCloseOnOverlayClick = false;

  /** Prevent closing on escape key */
  @Input() preventCloseOnEscape = false;

  /** Event emitted when dialog should be closed */
  @Output() openChange = new EventEmitter<boolean>();

  /** Event emitted when escape key is pressed */
  @Output() escapeKeyDown = new EventEmitter<KeyboardEvent>();

  /** Internal open state */
  protected isDialogOpen = signal(false);

  /** Computed class names */
  protected alertDialogOverlayVariants = alertDialogOverlayVariants;
  protected alertDialogContentVariants = alertDialogContentVariants;
  protected cn = cn;

  private previousActiveElement: Element | null = null;

  constructor() {
    // Watch for dialog open/close changes
    effect(() => {
      if (this.isDialogOpen()) {
        // Dialog opened
        setTimeout(() => {
          this.trapFocus();
          this.announceToScreenReader();
        });
      } else {
        // Dialog closed
        this.restoreFocus();
      }
    });
  }

  ngAfterViewInit() {
    // Initial setup if dialog is already open
    if (this.isDialogOpen()) {
      this.trapFocus();
      this.announceToScreenReader();
    }
  }

  ngOnDestroy() {
    this.restoreFocus();
  }

  /**
   * Handle overlay click
   */
  protected handleOverlayClick(event: MouseEvent): void {
    if (!this.preventCloseOnOverlayClick) {
      this.close();
    }
  }

  /**
   * Handle keyboard events
   */
  protected handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.escapeKeyDown.emit(event);

      if (!this.preventCloseOnEscape && !event.defaultPrevented) {
        this.close();
      }
    }

    // Handle tab key for focus trapping
    if (event.key === 'Tab') {
      this.handleTabKey(event);
    }
  }

  /**
   * Handle tab key for focus trapping
   */
  private handleTabKey(event: KeyboardEvent): void {
    if (!this.contentElement) return;

    const focusableElements = this.contentElement.nativeElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement?.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement?.focus();
        event.preventDefault();
      }
    }
  }

  /**
   * Trap focus within the dialog
   */
  private trapFocus(): void {
    this.previousActiveElement = document.activeElement;

    // Focus the first focusable element
    setTimeout(() => {
      if (this.contentElement) {
        const firstFocusable = this.contentElement.nativeElement.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;

        if (firstFocusable) {
          firstFocusable.focus();
        } else {
          this.contentElement.nativeElement.focus();
        }
      }
    });
  }

  /**
   * Restore focus to previously active element
   */
  private restoreFocus(): void {
    if (this.previousActiveElement instanceof HTMLElement) {
      this.previousActiveElement.focus();
    }
  }

  /**
   * Announce dialog opening to screen readers
   */
  private announceToScreenReader(): void {
    // Create a live region announcement
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', this.accessibility.ariaLive || 'assertive');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = this.accessibility.announceText || 'Alert dialog opened';

    document.body.appendChild(announcement);

    // Remove the announcement after it's been read
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }

  /**
   * Close the dialog
   */
  private close(): void {
    this.isDialogOpen.set(false);
    this.openChange.emit(false);
  }

  /**
   * Open the dialog
   */
  public openDialog(): void {
    this.isDialogOpen.set(true);
    this.openChange.emit(true);
  }
}

/**
 * AlertDialog Header Component
 */
@Component({
  selector: 'AlertDialogHeader',
  standalone: true,
  imports: [NgClass],
  template: `
    <div [ngClass]="cn(alertDialogHeaderVariants(), class)">
      <ng-content></ng-content>
    </div>
  `
})
export class AlertDialogHeader {
  @Input() class = '';

  protected alertDialogHeaderVariants = alertDialogHeaderVariants;
  protected cn = cn;
}

/**
 * AlertDialog Footer Component
 */
@Component({
  selector: 'AlertDialogFooter',
  standalone: true,
  imports: [NgClass],
  template: `
    <div [ngClass]="cn(alertDialogFooterVariants(), class)">
      <ng-content></ng-content>
    </div>
  `
})
export class AlertDialogFooter {
  @Input() class = '';

  protected alertDialogFooterVariants = alertDialogFooterVariants;
  protected cn = cn;
}

/**
 * AlertDialog Title Component
 */
@Component({
  selector: 'AlertDialogTitle',
  standalone: true,
  imports: [NgClass],
  template: `
    <h2 [ngClass]="cn(alertDialogTitleVariants(), class)" [id]="id">
      <ng-content></ng-content>
    </h2>
  `
})
export class AlertDialogTitle {
  @Input() class = '';
  @Input() id = 'alert-dialog-title';

  protected alertDialogTitleVariants = alertDialogTitleVariants;
  protected cn = cn;
}

/**
 * AlertDialog Description Component
 */
@Component({
  selector: 'AlertDialogDescription',
  standalone: true,
  imports: [NgClass],
  template: `
    <p [ngClass]="cn(alertDialogDescriptionVariants(), class)" [id]="id">
      <ng-content></ng-content>
    </p>
  `
})
export class AlertDialogDescription {
  @Input() class = '';
  @Input() id = 'alert-dialog-description';

  protected alertDialogDescriptionVariants = alertDialogDescriptionVariants;
  protected cn = cn;
}

/**
 * AlertDialog Action Component
 */
@Component({
  selector: 'AlertDialogAction',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      [ngClass]="computedClasses()"
      [type]="type"
      [disabled]="disabled"
      [attr.aria-label]="accessibility.ariaLabel"
      [attr.aria-describedby]="accessibility.ariaDescribedBy"
      (click)="handleClick($event)"
      (keydown)="handleKeyDown($event)"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class AlertDialogAction {
  @Input() variant: VariantProps<typeof alertDialogActionVariants>['variant'] = 'default';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() class = '';
  @Input() accessibility: { ariaLabel?: string; ariaDescribedBy?: string } = {};

  @Output() actionClick = new EventEmitter<MouseEvent>();
  @Output() actionKeyDown = new EventEmitter<KeyboardEvent>();

  protected computedClasses = computed(() => {
    return cn(
      alertDialogActionVariants({ variant: this.variant }),
      this.class
    );
  });

  protected cn = cn;

  protected handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.actionClick.emit(event);
    }
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    this.actionKeyDown.emit(event);
  }
}

/**
 * AlertDialog Cancel Component
 */
@Component({
  selector: 'AlertDialogCancel',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      [ngClass]="cn(alertDialogCancelVariants(), class)"
      [type]="type"
      [disabled]="disabled"
      (click)="handleClick($event)"
      (keydown)="handleKeyDown($event)"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class AlertDialogCancel {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() class = '';

  @Output() cancelClick = new EventEmitter<MouseEvent>();
  @Output() cancelKeyDown = new EventEmitter<KeyboardEvent>();

  protected alertDialogCancelVariants = alertDialogCancelVariants;
  protected cn = cn;

  protected handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.cancelClick.emit(event);
    }
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    this.cancelKeyDown.emit(event);
  }
}

// Export variants for external use
export {
  alertDialogOverlayVariants,
  alertDialogContentVariants,
  alertDialogHeaderVariants,
  alertDialogFooterVariants,
  alertDialogTitleVariants,
  alertDialogDescriptionVariants,
  alertDialogActionVariants,
  alertDialogCancelVariants
};
