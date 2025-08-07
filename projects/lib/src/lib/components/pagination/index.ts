import {
  Component,
  computed,
  input,
  output,
  signal,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * Pagination styling variants using Class Variance Authority
 */
const paginationVariants = cva(
  'flex items-center justify-start sm:justify-center gap-1 sm:gap-2 select-none w-full px-2',
  {
    variants: {
      size: {
        sm: 'gap-0.5 sm:gap-1 px-1 sm:px-2',
        default: 'gap-1 sm:gap-2 px-2',
        lg: 'gap-1 sm:gap-3 px-2 sm:px-3'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

const paginationButtonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'rounded-lg border transition-all duration-200',
    'font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
    'cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50',
    'shadow-sm hover:shadow-md active:scale-95',
    'backdrop-blur-sm flex-shrink-0'
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700',
          'text-slate-700 dark:text-slate-300',
          'hover:bg-slate-50 dark:hover:bg-slate-700',
          'focus:ring-blue-500/20 dark:focus:ring-blue-400/20'
        ],
        active: [
          'bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700',
          'border-blue-500 dark:border-blue-600',
          'text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-600/25',
          'hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800',
          'focus:ring-blue-500/50 dark:focus:ring-blue-400/50'
        ],
        ghost: [
          'bg-transparent border-transparent',
          'text-slate-600 dark:text-slate-400',
          'hover:bg-slate-100/80 dark:hover:bg-slate-800/80',
          'focus:ring-slate-500/20 dark:focus:ring-slate-400/20'
        ]
      },
      size: {
        sm: 'h-7 w-7 text-xs min-w-[1.75rem]',
        default: 'h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-xs sm:text-sm min-w-[2rem] sm:min-w-[2.25rem] md:min-w-[2.5rem]',
        lg: 'h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 text-sm md:text-base min-w-[2.25rem] sm:min-w-[2.5rem] md:min-w-[3rem]'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const paginationNavButtonVariants = cva(
  [
    'inline-flex items-center justify-center gap-1 sm:gap-2',
    'rounded-lg border transition-all duration-200',
    'font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
    'cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50',
    'shadow-sm hover:shadow-md active:scale-95',
    'backdrop-blur-sm flex-shrink-0',
    'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700',
    'text-slate-700 dark:text-slate-300',
    'hover:bg-slate-50 dark:hover:bg-slate-700',
    'focus:ring-blue-500/20 dark:focus:ring-blue-400/20'
  ],
  {
    variants: {
      size: {
        sm: 'h-7 px-1.5 sm:px-2 text-xs min-w-[2.5rem] sm:min-w-[3rem]',
        default: 'h-8 px-1.5 sm:px-2 md:px-4 text-xs sm:text-sm min-w-[3rem] sm:min-w-[3.5rem] md:min-w-[4rem]',
        lg: 'h-10 px-2 sm:px-3 md:px-6 text-sm sm:text-base min-w-[3.5rem] sm:min-w-[4rem] md:min-w-[5rem]'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

type PaginationProps = VariantProps<typeof paginationVariants>;
type PaginationButtonProps = VariantProps<typeof paginationButtonVariants>;

interface PageItem {
  type: 'page' | 'ellipsis';
  page?: number;
  id: string;
}

/**
 * Simple Pagination Component
 * A clean, signal-based pagination component for Angular applications
 *
 * @example Basic Usage
 * ```html
 * <Pagination
 *   [totalItems]="1000"
 *   [itemsPerPage]="10"
 *   [currentPage]="currentPage()"
 *   [showFirstLast]="true"
 *   [showInfo]="true"
 *   (pageChange)="currentPage.set($event)"
 * />
 * ```
 */
@Component({
  selector: 'Pagination',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .pagination-scroll-container {
      /* Show scrollbars by default on mobile/tablet */
      scrollbar-width: thin;
      scrollbar-color: #cbd5e1 transparent;
    }

    .pagination-scroll-container::-webkit-scrollbar {
      height: 6px;
    }

    .pagination-scroll-container::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 3px;
    }

    .pagination-scroll-container::-webkit-scrollbar-thumb {
      background-color: #cbd5e1;
      border-radius: 3px;
      transition: background-color 0.2s ease;
    }

    .pagination-scroll-container::-webkit-scrollbar-thumb:hover {
      background-color: #94a3b8;
    }

    /* Hide scrollbars on larger screens (lg and above) */
    @media (min-width: 1024px) {
      .pagination-scroll-container {
        scrollbar-width: none;
      }

      .pagination-scroll-container::-webkit-scrollbar {
        height: 0px;
      }

      .pagination-scroll-container:hover {
        scrollbar-width: thin;
      }

      .pagination-scroll-container:hover::-webkit-scrollbar {
        height: 6px;
      }
    }

    /* Dark mode scrollbar */
    .dark .pagination-scroll-container {
      scrollbar-color: #475569 transparent;
    }

    .dark .pagination-scroll-container::-webkit-scrollbar-thumb {
      background-color: #475569;
    }

    .dark .pagination-scroll-container::-webkit-scrollbar-thumb:hover {
      background-color: #64748b;
    }
  `],
  template: `
    <nav [attr.aria-label]="ariaLabel()" role="navigation" class="w-full" [ngStyle]="themeStyles()">
      <div class="pagination-scroll-container w-full overflow-x-auto overflow-y-hidden">
        <div [class]="containerClasses()" class="min-w-fit">

        <!-- First Button -->
        @if (showFirstLast()) {
          <button
            type="button"
            [class]="navButtonClasses()"
            [disabled]="isFirstDisabled()"
            (click)="goToFirst()"
            aria-label="Go to first page"
            class="inline-flex"
          >
            <svg [attr.width]="iconSize()" [attr.height]="iconSize()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m11 17-5-5 5-5"/>
              <path d="m18 17-5-5 5-5"/>
            </svg>
            @if (showLabels()) {
              <span class="hidden sm:inline">First</span>
            }
          </button>
        }

        <!-- Previous Button -->
        <button
          type="button"
          [class]="navButtonClasses()"
          [disabled]="isPreviousDisabled()"
          (click)="goToPrevious()"
          aria-label="Go to previous page"
        >
          <svg [attr.width]="iconSize()" [attr.height]="iconSize()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          @if (showLabels()) {
            <span class="hidden sm:inline">Previous</span>
          }
        </button>

        <!-- Page Numbers Container -->
        <div class="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
          @for (item of visiblePages(); track item.id) {
            @if (item.type === 'page' && item.page) {
              <button
                type="button"
                [class]="getPageButtonClasses(item.page)"
                [attr.aria-label]="'Go to page ' + item.page"
                [attr.aria-current]="item.page === currentPage() ? 'page' : null"
                (click)="goToPage(item.page)"
              >
                {{ item.page }}
              </button>
            } @else {
              <span
                [class]="ellipsisClasses()"
                aria-hidden="true"
              >
                <svg [attr.width]="iconSize()" [attr.height]="iconSize()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="19" cy="12" r="1"/>
                  <circle cx="5" cy="12" r="1"/>
                </svg>
              </span>
            }
          }
        </div>

        <!-- Next Button -->
        <button
          type="button"
          [class]="navButtonClasses()"
          [disabled]="isNextDisabled()"
          (click)="goToNext()"
          aria-label="Go to next page"
        >
          @if (showLabels()) {
            <span class="hidden sm:inline">Next</span>
          }
          <svg [attr.width]="iconSize()" [attr.height]="iconSize()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>

        <!-- Last Button -->
        @if (showFirstLast()) {
          <button
            type="button"
            [class]="navButtonClasses()"
            [disabled]="isLastDisabled()"
            (click)="goToLast()"
            aria-label="Go to last page"
            class="inline-flex"
          >
            @if (showLabels()) {
              <span class="hidden sm:inline">Last</span>
            }
            <svg [attr.width]="iconSize()" [attr.height]="iconSize()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m6 17 5-5-5-5"/>
              <path d="m13 17 5-5-5-5"/>
            </svg>
          </button>
        }

        </div>
      </div>
    </nav>

    <!-- Page Info (Optional) -->
    @if (showInfo()) {
      <div class="mt-3 sm:mt-4 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
          <div class="flex items-center gap-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <span class="font-medium text-slate-900 dark:text-slate-100">{{ getStartItem() }}</span>
            <span>–</span>
            <span class="font-medium text-slate-900 dark:text-slate-100">{{ getEndItem() }}</span>
            <span class="hidden xs:inline">of</span>
            <span class="font-medium text-slate-900 dark:text-slate-100">{{ totalItems() }}</span>
            <span class="hidden xs:inline">{{ totalItems() === 1 ? 'result' : 'results' }}</span>
          </div>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Pagination {
  // Required inputs
  readonly totalItems = input.required<number>();
  readonly currentPage = input.required<number>();

  // Optional configuration inputs
  readonly itemsPerPage = input<number>(10);
  readonly size = input<PaginationProps['size']>('default');
  readonly maxVisiblePages = input<number>(7);
  readonly showLabels = input<boolean>(true);
  readonly showInfo = input<boolean>(false);
  readonly showFirstLast = input<boolean>(false);
  readonly ariaLabel = input<string>('Pagination Navigation');
  readonly customClass = input<string>('');

  // Output events
  readonly pageChange = output<number>();

  // Internal processing state to prevent rapid clicks
  private readonly _isProcessing = signal(false);

  // Computed properties
  readonly totalPages = computed(() => {
    const total = this.totalItems();
    const perPage = this.itemsPerPage();
    if (total <= 0 || perPage <= 0) return 1;
    return Math.ceil(total / perPage);
  });

  readonly isPreviousDisabled = computed(() => {
    return this.currentPage() <= 1 || this._isProcessing();
  });

  readonly isNextDisabled = computed(() => {
    return this.currentPage() >= this.totalPages() || this._isProcessing();
  });

  readonly isFirstDisabled = computed(() => {
    return this.currentPage() <= 1 || this._isProcessing();
  });

  readonly isLastDisabled = computed(() => {
    return this.currentPage() >= this.totalPages() || this._isProcessing();
  });

  readonly visiblePages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    let maxVisible = this.maxVisiblePages();

    // Responsive maxVisiblePages: reduce on smaller screens
    // On mobile (< 640px), show maximum 3 pages to ensure navigation buttons are visible
    // This is handled by CSS breakpoints - we'll use a conservative approach
    // Assume mobile-first: default to 3, increase on larger screens
    if (maxVisible > 5) {
      maxVisible = 3; // Very conservative for mobile
    } else if (maxVisible > 3) {
      maxVisible = Math.min(maxVisible, 5); // Moderate for tablet
    }

    // If total pages is less than max visible, show all
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => ({
        type: 'page' as const,
        page: i + 1,
        id: `page-${i + 1}`
      }));
    }

    const pages: PageItem[] = [];

    // For very small maxVisible (3 or less), use simplified logic
    if (maxVisible <= 3) {
      if (current === 1) {
        // Show: [1] [2] ... [last]
        pages.push({ type: 'page', page: 1, id: 'page-1' });
        if (total > 1) {
          pages.push({ type: 'page', page: 2, id: 'page-2' });
        }
        if (total > 2) {
          pages.push({ type: 'ellipsis', id: 'ellipsis-end' });
        }
      } else if (current === total) {
        // Show: [1] ... [prev] [current]
        pages.push({ type: 'page', page: 1, id: 'page-1' });
        if (total > 2) {
          pages.push({ type: 'ellipsis', id: 'ellipsis-start' });
        }
        if (total > 1) {
          pages.push({ type: 'page', page: total - 1, id: `page-${total - 1}` });
        }
        pages.push({ type: 'page', page: total, id: `page-${total}` });
      } else {
        // Show: [1] ... [current] ... [last] or [1] [current] [last]
        pages.push({ type: 'page', page: 1, id: 'page-1' });
        if (current > 2) {
          pages.push({ type: 'ellipsis', id: 'ellipsis-start' });
        }
        pages.push({ type: 'page', page: current, id: `page-${current}` });
        if (current < total - 1) {
          pages.push({ type: 'ellipsis', id: 'ellipsis-end' });
        }
        if (total > 1 && current < total) {
          pages.push({ type: 'page', page: total, id: `page-${total}` });
        }
      }
      return pages;
    }

    // Original logic for larger screens (maxVisible > 3)
    const sidePages = Math.floor((maxVisible - 3) / 2); // Reserve space for first, last, and ellipsis

    // Always show first page
    pages.push({ type: 'page', page: 1, id: 'page-1' });

    let startPage: number;
    let endPage: number;

    if (current <= sidePages + 2) {
      // Near the beginning
      startPage = 2;
      endPage = Math.min(maxVisible - 1, total - 1);
    } else if (current >= total - sidePages - 1) {
      // Near the end
      startPage = Math.max(total - maxVisible + 2, 2);
      endPage = total - 1;
    } else {
      // In the middle
      startPage = current - sidePages;
      endPage = current + sidePages;
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push({ type: 'ellipsis', id: 'ellipsis-start' });
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push({ type: 'page', page: i, id: `page-${i}` });
    }

    // Add ellipsis before last page if needed
    if (endPage < total - 1) {
      pages.push({ type: 'ellipsis', id: 'ellipsis-end' });
    }

    // Always show last page (if it's not the first page)
    if (total > 1) {
      pages.push({ type: 'page', page: total, id: `page-${total}` });
    }

    return pages;
  });

  // Computed CSS classes
  readonly containerClasses = computed(() => {
    return cn(
      paginationVariants({
        size: this.size()
      }),
      this.customClass()
    );
  });

  readonly navButtonClasses = computed(() => {
    return paginationNavButtonVariants({
      size: this.size()
    });
  });

  readonly ellipsisClasses = computed(() => {
    return cn(
      'inline-flex items-center justify-center text-slate-500 dark:text-slate-400 flex-shrink-0',
      this.size() === 'sm' ? 'h-7 w-7 min-w-[1.75rem]' :
      this.size() === 'lg' ? 'h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 min-w-[2.25rem] sm:min-w-[2.5rem] md:min-w-[3rem]' :
      'h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 min-w-[2rem] sm:min-w-[2.25rem] md:min-w-[2.5rem]'
    );
  });

  readonly iconSize = computed(() => {
    return this.size() === 'sm' ? 12 : this.size() === 'lg' ? 16 : 14;
  });

  // Theme CSS variables computed property
  readonly themeStyles = computed(() => {
    const styles: Record<string, string> = {};
    return styles;
  });

  // Helper methods
  getPageButtonClasses(page: number): string {
    return paginationButtonVariants({
      variant: page === this.currentPage() ? 'active' : 'default',
      size: this.size()
    });
  }

  getStartItem(): number {
    const current = this.currentPage();
    const perPage = this.itemsPerPage();
    return Math.min((current - 1) * perPage + 1, this.totalItems());
  }

  getEndItem(): number {
    const current = this.currentPage();
    const perPage = this.itemsPerPage();
    const total = this.totalItems();
    return Math.min(current * perPage, total);
  }

  // Navigation methods
  goToPage(page: number): void {
    if (this._isProcessing() || page === this.currentPage() || page < 1 || page > this.totalPages()) {
      return;
    }

    this._emitPageChange(page);
  }

  goToPrevious(): void {
    if (this.isPreviousDisabled()) {
      return;
    }

    const prevPage = this.currentPage() - 1;
    this._emitPageChange(prevPage);
  }

  goToNext(): void {
    if (this.isNextDisabled()) {
      return;
    }

    const nextPage = this.currentPage() + 1;
    this._emitPageChange(nextPage);
  }

  goToFirst(): void {
    if (this.currentPage() === 1 || this._isProcessing()) {
      return;
    }
    this._emitPageChange(1);
  }

  goToLast(): void {
    const lastPage = this.totalPages();
    if (this.currentPage() === lastPage || this._isProcessing()) {
      return;
    }
    this._emitPageChange(lastPage);
  }

  // Private helper method
  private _emitPageChange(page: number): void {
    if (this._isProcessing()) {
      return;
    }

    this._isProcessing.set(true);

    // Use setTimeout to prevent rapid clicking and ensure UI updates
    setTimeout(() => {
      try {
        this.pageChange.emit(page);
      } finally {
        this._isProcessing.set(false);
      }
    }, 0);
  }
}

// Export type for external use
export type { PaginationProps, PaginationButtonProps };
