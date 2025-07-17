import { Component, Input, Output, EventEmitter, computed, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/**
 * Button component variants using Class Variance Authority (CVA)
 * Provides consistent styling patterns with Tailwind CSS
 */
const buttonVariants = cva(
  // Base styles - consistent across all variants
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
    'transition-colors duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none touch-manipulation',
    'relative overflow-hidden',
    'before:absolute before:inset-0 before:rounded-md before:transition-opacity before:duration-200',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
          'before:bg-white/10 before:opacity-0 hover:before:opacity-100',
        ],
        destructive: [
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
          'before:bg-white/10 before:opacity-0 hover:before:opacity-100',
        ],
        outline: [
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
          'before:bg-accent/20 before:opacity-0 hover:before:opacity-100',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
          'before:bg-foreground/5 before:opacity-0 hover:before:opacity-100',
        ],
        ghost: [
          'hover:bg-accent hover:text-accent-foreground',
          'before:bg-accent/20 before:opacity-0 hover:before:opacity-100',
        ],
        link: [
          'text-primary underline-offset-4 hover:underline',
          'before:hidden',
        ],
        success: [
          'bg-success text-success-foreground shadow hover:bg-success/90',
          'before:bg-white/10 before:opacity-0 hover:before:opacity-100',
        ],
        warning: [
          'bg-warning text-warning-foreground shadow hover:bg-warning/90',
          'before:bg-white/10 before:opacity-0 hover:before:opacity-100',
        ],
        info: [
          'bg-info text-info-foreground shadow hover:bg-info/90',
          'before:bg-white/10 before:opacity-0 hover:before:opacity-100',
        ],
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        xl: 'h-12 rounded-lg px-10 text-base',
        icon: 'h-9 w-9',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-10 w-10',
        'icon-xl': 'h-12 w-12',
      },
      loading: {
        true: 'cursor-wait',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      loading: false,
    },
  }
);

export type ButtonVariant = VariantProps<typeof buttonVariants>;

/**
 * Accessibility interface for button component
 * Comprehensive ARIA support for enhanced accessibility
 */
export interface ButtonAccessibility {
  /** ARIA label for screen readers when button text is not descriptive */
  ariaLabel?: string;
  /** ARIA description for additional context */
  ariaDescription?: string;
  /** Element ID that labels this button */
  ariaLabelledBy?: string;
  /** Element ID that describes this button */
  ariaDescribedBy?: string;
  /** Indicates if the button controls a popup/menu */
  ariaHasPopup?: 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  /** Indicates if the controlled element is expanded */
  ariaExpanded?: 'true' | 'false';
  /** Indicates if the button is pressed (for toggle buttons) */
  ariaPressed?: 'true' | 'false' | 'mixed';
  /** Live region announcements for dynamic content */
  ariaLive?: 'off' | 'polite' | 'assertive';
  /** Tab index for keyboard navigation control */
  tabIndex?: number;
}

/**
 * Loading state interface for better UX
 */
export interface ButtonLoadingState {
  /** Show loading spinner */
  loading?: boolean;
  /** Custom loading text */
  loadingText?: string | null;
  /** Disable button during loading */
  disableOnLoading?: boolean;
}

@Component({
  selector: 'Button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      [ngClass]="computedClasses()"
      [type]="type"
      [disabled]="computedDisabled()"
      [attr.aria-label]="accessibility.ariaLabel"
      [attr.aria-description]="accessibility.ariaDescription"
      [attr.aria-labelledby]="accessibility.ariaLabelledBy"
      [attr.aria-describedby]="accessibility.ariaDescribedBy"
      [attr.aria-haspopup]="accessibility.ariaHasPopup"
      [attr.aria-expanded]="accessibility.ariaExpanded"
      [attr.aria-pressed]="accessibility.ariaPressed"
      [attr.aria-live]="accessibility.ariaLive"
      [attr.tabindex]="accessibility.tabIndex"
      [attr.data-loading]="loading().loading"
      [attr.data-variant]="variant"
      [attr.data-size]="size"
      (click)="handleClick($event)"
      (keydown)="handleKeydown($event)"
    >
      <!-- Loading spinner -->
      @if (loading().loading) {
        <svg
          class="animate-spin h-4 w-4 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      }
      
      <!-- Button content -->
      <span 
        [class.sr-only]="loading().loading && loading().loadingText"
        class="relative z-10"
      >
        @if (loading().loading && loading().loadingText) {
          {{ loading().loadingText }}
        } @else {
          <ng-content></ng-content>
        }
      </span>
      
      <!-- Screen reader loading announcement -->
      @if (loading().loading && accessibility.ariaLive) {
        <span class="sr-only" [attr.aria-live]="accessibility.ariaLive">
          {{ loading().loadingText || 'Loading...' }}
        </span>
      }
    </button>
  `,
})
export class ButtonComponent {
  /** Button variant styling */
  @Input() variant: ButtonVariant['variant'] = 'default';
  
  /** Button size */
  @Input() size: ButtonVariant['size'] = 'default';
  
  /** Button type attribute */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  
  /** Disable the button */
  @Input() disabled = false;
  
  /** Custom CSS classes */
  @Input() class = '';
  
  /** Accessibility configuration */
  @Input() accessibility: ButtonAccessibility = {};
  
  /** Loading state configuration */
  @Input() set loadingState(value: boolean | ButtonLoadingState) {
    if (typeof value === 'boolean') {
      this.loading.set({
        loading: value,
        loadingText: null,
        disableOnLoading: true,
      });
    } else {
      this.loading.set({
        loading: value.loading || false,
        loadingText: value.loadingText ?? null,
        disableOnLoading: value.disableOnLoading ?? true,
      });
    }
  }
  
  /** Click event emitter */
  @Output() buttonClick = new EventEmitter<MouseEvent>();
  
  /** Keydown event emitter for custom keyboard handling */
  @Output() buttonKeydown = new EventEmitter<KeyboardEvent>();
  
  /** Focus event emitter */
  @Output() buttonFocus = new EventEmitter<FocusEvent>();
  
  /** Blur event emitter */
  @Output() buttonBlur = new EventEmitter<FocusEvent>();

  /** Loading state signal */
  protected loading = signal<Required<ButtonLoadingState>>({
    loading: false,
    loadingText: null,
    disableOnLoading: true,
  });

  /** Computed classes for the button */
  protected computedClasses = computed(() => {
    return cn(
      buttonVariants({
        variant: this.variant,
        size: this.size,
        loading: this.loading().loading,
      }),
      this.class
    );
  });

  /** Computed disabled state */
  protected computedDisabled = computed(() => {
    return this.disabled || (this.loading().loading && this.loading().disableOnLoading);
  });

  /**
   * Handle button click events
   * @param event - Mouse event
   */
  protected handleClick(event: MouseEvent): void {
    if (this.computedDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    
    this.buttonClick.emit(event);
  }

  /**
   * Handle keyboard events for accessibility
   * @param event - Keyboard event
   */
  protected handleKeydown(event: KeyboardEvent): void {
    // Emit custom keydown event
    this.buttonKeydown.emit(event);
    
    // Handle space and enter keys for accessibility
    if (event.code === 'Space' || event.code === 'Enter') {
      if (!this.computedDisabled()) {
        // Prevent default to avoid double-firing
        if (event.code === 'Space') {
          event.preventDefault();
        }
        
        // Create a synthetic click event
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        
        this.handleClick(clickEvent);
      }
    }
  }

  /**
   * Handle focus events
   * @param event - Focus event
   */
  protected handleFocus(event: FocusEvent): void {
    this.buttonFocus.emit(event);
  }

  /**
   * Handle blur events
   * @param event - Focus event
   */
  protected handleBlur(event: FocusEvent): void {
    this.buttonBlur.emit(event);
  }

  /**
   * Public method to set loading state
   * @param loading - Loading configuration
   */
  public setLoading(loading: boolean | ButtonLoadingState): void {
    this.loadingState = loading;
  }

  /**
   * Public method to focus the button
   */
  public focus(): void {
    // This would need to be implemented with ViewChild in a real scenario
    // For now, it's a placeholder for the API
  }

  /**
   * Public method to blur the button
   */
  public blur(): void {
    // This would need to be implemented with ViewChild in a real scenario
    // For now, it's a placeholder for the API
  }
}

// Export types for external use
export { buttonVariants };
