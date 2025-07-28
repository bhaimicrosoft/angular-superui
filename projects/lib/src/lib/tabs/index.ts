import {
  Component,
  input,
  output,
  signal,
  computed,
  effect,
  model,
  ViewChildren,
  ElementRef,
  QueryList,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  inject,
  PLATFORM_ID,
  AfterContentInit,
  TemplateRef
} from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes, query, stagger, group } from '@angular/animations';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/**
 * Tabs component variants using Class Variance Authority (CVA)
 * Provides consistent styling patterns with Tailwind CSS
 *
 * Variants:
 * - default: Standard tabs with border bottom
 * - pills: Rounded pill-style tabs
 * - underline: Minimal underline-only tabs
 * - buttons: Button-style tabs
 * - segmented: Segmented control style
 */
const tabsVariants = cva(
  [
    'flex flex-wrap items-center justify-start',
    'transition-all duration-200 ease-in-out'
  ],
  {
    variants: {
      variant: {
        default: [
          'border-b border-border',
          'bg-transparent'
        ],
        pills: [
          'bg-muted rounded-xl p-1',
          'gap-1'
        ],
        underline: [
          'bg-transparent',
          'border-b border-transparent'
        ],
        buttons: [
          'bg-transparent gap-2'
        ],
        segmented: [
          'bg-muted rounded-lg p-1',
          'border border-border'
        ],
      },
      size: {
        sm: 'text-sm',
        default: 'text-base',
        lg: 'text-lg',
      },
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col items-stretch',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      orientation: 'horizontal',
    },
  }
);

const tabTriggerVariants = cva(
  [
    'relative inline-flex items-center justify-center whitespace-nowrap',
    'font-medium transition-all duration-300 ease-in-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'cursor-pointer select-none'
  ],
  {
    variants: {
      variant: {
        default: [
          'px-4 py-2 border-b-2 border-transparent',
          'text-muted-foreground hover:text-foreground',
          'data-[state=active]:text-foreground data-[state=active]:border-primary',
          'data-[state=active]:shadow-sm'
        ],
        pills: [
          'px-3 py-1.5 rounded-lg',
          'text-muted-foreground hover:text-foreground hover:bg-background/50',
          'data-[state=active]:bg-background data-[state=active]:text-foreground',
          'data-[state=active]:shadow-sm'
        ],
        underline: [
          'px-4 py-2 border-b-2 border-transparent',
          'text-muted-foreground hover:text-foreground',
          'data-[state=active]:text-primary data-[state=active]:border-primary'
        ],
        buttons: [
          'px-4 py-2 rounded-md border border-transparent',
          'text-muted-foreground hover:text-foreground hover:bg-muted',
          'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground',
          'data-[state=active]:border-primary'
        ],
        segmented: [
          'px-3 py-1.5 rounded-md',
          'text-muted-foreground hover:text-foreground',
          'data-[state=active]:bg-background data-[state=active]:text-foreground',
          'data-[state=active]:shadow-sm'
        ],
      },
      size: {
        sm: 'text-sm px-3 py-1.5 min-h-8',
        default: 'text-sm px-4 py-2 min-h-10',
        lg: 'text-base px-6 py-3 min-h-12',
      },
      orientation: {
        horizontal: '',
        vertical: 'w-full justify-start',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      orientation: 'horizontal',
    },
  }
);

const tabContentVariants = cva(
  [
    'ring-offset-background focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
  ],
  {
    variants: {
      variant: {
        default: 'border-0 p-0 mt-4',
        pills: 'p-4 mt-2',
        underline: 'pt-4 mt-2',
        buttons: 'p-4 mt-2',
        segmented: 'p-4 mt-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TabChangeEvent {
  value: string;
  index: number;
  previousValue?: string;
  previousIndex?: number;
}

export interface TabItem {
  value: string;
  label: string;
  content?: TemplateRef<any>;
  disabled?: boolean;
  icon?: string;
  badge?: string | number;
  closable?: boolean;
}

export type TabsVariantProps = VariantProps<typeof tabsVariants>;

@Component({
  selector: 'Tabs',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // Smooth slide in for tab triggers
    trigger('slideInTabs', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),

    // Ultra-smooth content transitions with optimized timing
    trigger('smoothContentTransition', [
      transition('* => *', [
        group([
          query(':enter', [
            style({
              opacity: 0,
              transform: 'translateX(8px)',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              willChange: 'opacity, transform'
            }),
            animate('250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', style({
              opacity: 1,
              transform: 'translateX(0)'
            })),
          ], { optional: true }),
          query(':leave', [
            style({
              opacity: 1,
              transform: 'translateX(0)',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              willChange: 'opacity, transform'
            }),
            animate('200ms cubic-bezier(0.55, 0.055, 0.675, 0.19)', style({
              opacity: 0,
              transform: 'translateX(-8px)'
            })),
          ], { optional: true }),
        ])
      ]),
    ]),

    // Smooth fade transition for better performance
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, willChange: 'opacity' }),
        animate('200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1, willChange: 'opacity' }),
        animate('150ms cubic-bezier(0.55, 0.055, 0.675, 0.19)', style({ opacity: 0 })),
      ]),
    ]),

    // Fluid tab indicator animation with physics-based easing
    trigger('tabIndicatorSlide', [
      transition('* => *', [
        animate('280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ]),
    ]),

    // Optimized hover effects with better performance
    trigger('tabHover', [
      state('default', style({ transform: 'translateY(0) scale(1)' })),
      state('hover', style({ transform: 'translateY(-1px) scale(1.02)' })),
      transition('default <=> hover', [
        animate('150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ]),
    ]),

    // Stagger animation for multiple tabs
    trigger('staggerTabsIn', [
      transition(':enter', [
        query('.tab-trigger', [
          style({ opacity: 0, transform: 'translateY(-10px) scale(0.95)' }),
          stagger(80, [
            animate('400ms cubic-bezier(0.4, 0, 0.2, 1)',
              style({ opacity: 1, transform: 'translateY(0) scale(1)' })
            ),
          ]),
        ], { optional: true }),
      ]),
    ]),

    // Refined scale animation for active states
    trigger('activeScale', [
      state('inactive', style({ transform: 'scale(1)' })),
      state('active', style({ transform: 'scale(1.01)' })),
      transition('inactive <=> active', [
        animate('200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ]),
    ]),
  ],
  template: `
    <div class="w-full relative" [@staggerTabsIn]>
      <!-- Tab List -->
      <div
        [class]="tabsClasses()"
        role="tablist"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-orientation]="orientation()"
        [attr.aria-describedby]="ariaDescribedBy() || null"
      >
        @for (tab of tabs(); track tab.value; let i = $index) {
          <button
            #tabTrigger
            type="button"
            [class]="tabTriggerClasses()"
            [attr.data-state]="activeTab() === tab.value ? 'active' : 'inactive'"
            [attr.data-value]="tab.value"
            [disabled]="tab.disabled"
            role="tab"
            [attr.aria-selected]="activeTab() === tab.value"
            [attr.aria-controls]="'tab-content-' + tab.value"
            [id]="'tab-' + tab.value"
            [attr.tabindex]="activeTab() === tab.value ? 0 : -1"
            (click)="selectTab(tab.value, i)"
            (keydown)="onKeyDown($event, i)"
            (mouseenter)="onTabHover(i, true)"
            (mouseleave)="onTabHover(i, false)"
            class="tab-trigger transition-all duration-200 ease-out transform will-change-transform"
            [@slideInTabs]
            [@activeScale]="activeTab() === tab.value ? 'active' : 'inactive'"
            [@tabHover]="hoveredTab() === i ? 'hover' : 'default'"
            [style.transform]="getTabTransform(tab.value, i)"
          >
            <!-- Tab Icon with Smooth Transitions -->
            @if (tab.icon) {
              <span
                class="mr-2 flex-shrink-0 transition-all duration-200 ease-out transform will-change-transform"
                [innerHTML]="tab.icon"
                [style.transform]="activeTab() === tab.value ? 'scale(1.05)' : 'scale(1)'"
              ></span>
            }

            <!-- Tab Label with Smooth Transitions -->
            <span class="truncate transition-all duration-200 ease-out" 
                  [style.font-weight]="activeTab() === tab.value ? '600' : '400'">{{ tab.label }}</span>

            <!-- Tab Badge with Enhanced Animations -->
            @if (tab.badge !== undefined && tab.badge !== null) {
              <span class="ml-2 flex-shrink-0 transition-all duration-200 ease-out">
                <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary rounded-full transform transition-all duration-200 ease-out will-change-transform hover:scale-110"
                      [style.transform]="activeTab() === tab.value ? 'scale(1.05)' : 'scale(1)'">
                  {{ tab.badge }}
                </span>
              </span>
            }

            <!-- Enhanced Close Button -->
            @if (tab.closable && closableTabs()) {
              <button
                type="button"
                class="ml-2 flex-shrink-0 p-1 rounded-full hover:bg-muted transition-all duration-200 ease-out transform will-change-transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20"
                (click)="closeTab($event, tab.value, i)"
                [attr.aria-label]="'Close ' + tab.label"
                tabindex="-1"
              >
                <svg class="w-3 h-3 transition-all duration-200 ease-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            }

            <!-- Smooth Active Indicator for some variants -->
            @if ((variant() === 'underline' || variant() === 'default') && activeTab() === tab.value) {
              <span
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transform origin-center transition-all duration-200 ease-out"
                [@tabIndicatorSlide]
                [style.transform]="'scaleX(1)'"
              ></span>
            }
          </button>
        }

        <!-- Add Tab Button -->
        @if (addable()) {
          <button
            type="button"
            [class]="addButtonClasses()"
            (click)="addTab()"
            [attr.aria-label]="addButtonLabel()"
            [@slideInTabs]
            class="transition-all duration-200 hover:scale-105"
          >
            @if (addButtonIcon()) {
              <span [innerHTML]="addButtonIcon()"></span>
            } @else {
              <svg class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
            }
          </button>
        }
      </div>

      <!-- Tab Content Container with Smooth Transitions -->
      <div class="relative overflow-hidden" style="min-height: 200px;">
        @for (tab of tabs(); track tab.value) {
          @if (activeTab() === tab.value || shouldKeepMounted(tab.value)) {
            <div
              [class]="getContentClasses(tab.value)"
              role="tabpanel"
              [id]="'tab-content-' + tab.value"
              [attr.aria-labelledby]="'tab-' + tab.value"
              [attr.aria-hidden]="activeTab() !== tab.value"
              [@fadeInOut]="activeTab() === tab.value"
              [style.position]="activeTab() === tab.value ? 'relative' : 'absolute'"
              [style.top]="activeTab() === tab.value ? 'auto' : '0'"
              [style.left]="activeTab() === tab.value ? 'auto' : '0'"
              [style.right]="activeTab() === tab.value ? 'auto' : '0'"
              [style.width]="activeTab() === tab.value ? 'auto' : '100%'"
              [style.pointer-events]="activeTab() === tab.value ? 'auto' : 'none'"
            >
              <!-- Custom Content Template -->
              @if (tab.content) {
                <ng-container *ngTemplateOutlet="tab.content"></ng-container>
              } @else {
                <!-- Default Content Slot -->
                <div [attr.data-tab]="tab.value">
                  <ng-content></ng-content>
                </div>
              }
            </div>
          }
        }

        <!-- Empty State -->
        @if (tabs().length === 0 && showEmptyState()) {
          <div class="text-center py-12 text-muted-foreground" [@smoothContentTransition]="'empty'">
            <div class="mb-4 transform transition-transform duration-300 hover:scale-105">
              @if (emptyStateIcon()) {
                <span [innerHTML]="emptyStateIcon()"></span>
              } @else {
                <svg class="w-16 h-16 mx-auto text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              }
            </div>
            <h3 class="text-xl font-medium mb-2">{{ emptyStateTitle() || 'No tabs available' }}</h3>
            <p class="text-sm">{{ emptyStateDescription() || 'Add a tab to get started' }}</p>
          </div>
        }
      </div>

      <!-- Helper Text -->
      @if (helperText()) {
        <div id="tabs-helper" class="mt-3 text-xs text-muted-foreground transition-opacity duration-200">
          {{ helperText() }}
        </div>
      }

      <!-- Error Message -->
      @if (error()) {
        <div id="tabs-error" class="mt-3 text-xs text-destructive transition-all duration-200" role="alert">
          {{ error() }}
        </div>
      }
    </div>
  `,
})
export class Tabs implements OnInit, OnDestroy, AfterContentInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  @ViewChildren('tabTrigger') tabTriggers!: QueryList<ElementRef<HTMLButtonElement>>;

  // Input signals
  readonly variant = input<TabsVariantProps['variant']>('default');
  readonly size = input<TabsVariantProps['size']>('default');
  readonly orientation = input<TabsVariantProps['orientation']>('horizontal');
  readonly tabs = input<TabItem[]>([]);
  readonly defaultValue = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly closableTabs = input<boolean>(false);
  readonly addable = input<boolean>(false);
  readonly addButtonLabel = input<string>('Add tab');
  readonly addButtonIcon = input<string>('');
  readonly lazy = input<boolean>(false);
  readonly keepAlive = input<boolean>(false);
  readonly showEmptyState = input<boolean>(true);
  readonly emptyStateTitle = input<string>('');
  readonly emptyStateDescription = input<string>('');
  readonly emptyStateIcon = input<string>('');
  readonly helperText = input<string>('');
  readonly error = input<string>('');
  readonly ariaLabel = input<string>('');

  // Two-way binding for active tab
  readonly activeTab = model<string>('');

  // Output events
  readonly change = output<TabChangeEvent>();
  readonly tabClose = output<{ value: string; index: number }>();
  readonly tabAdd = output<void>();
  readonly tabLoad = output<string>();

  // Internal state
  private readonly loadedTabs = signal<Set<string>>(new Set());
  protected readonly ariaDescribedBy = signal<string>('');
  protected readonly hoveredTab = signal<number>(-1);
  private readonly mountedTabs = signal<Set<string>>(new Set());

  // Computed signals
  readonly tabsClasses = computed(() =>
    cn(tabsVariants({
      variant: this.variant(),
      size: this.size(),
      orientation: this.orientation(),
    }))
  );

  readonly tabTriggerClasses = computed(() =>
    cn(tabTriggerVariants({
      variant: this.variant(),
      size: this.size(),
      orientation: this.orientation(),
    }))
  );

  readonly tabContentClasses = computed(() =>
    cn(tabContentVariants({
      variant: this.variant(),
    }))
  );

  readonly addButtonClasses = computed(() => {
    const baseClasses = cn(tabTriggerVariants({
      variant: this.variant(),
      size: this.size(),
      orientation: this.orientation(),
    }));
    return `${baseClasses} opacity-70 hover:opacity-100`;
  });

  constructor() {
    // Initialize active tab from default value or first tab
    effect(() => {
      const tabs = this.tabs();
      const defaultVal = this.defaultValue();
      const current = this.activeTab();

      if (!current && tabs.length > 0) {
        const firstAvailableTab = tabs.find(tab => !tab.disabled);
        if (firstAvailableTab) {
          this.activeTab.set(defaultVal || firstAvailableTab.value);
        }
      }

      // Load active tab if lazy loading is enabled
      if (this.lazy() && current && !this.loadedTabs().has(current)) {
        this.loadedTabs.update(loaded => new Set([...loaded, current]));
        this.tabLoad.emit(current);
      }

      // Mount tabs for smooth transitions
      if (current) {
        this.mountedTabs.update(mounted => new Set([...mounted, current]));
      }
    });

    // Effect to update aria-describedby
    effect(() => {
      const describedByIds = [];

      if (this.helperText()) {
        describedByIds.push('tabs-helper');
      }

      if (this.error()) {
        describedByIds.push('tabs-error');
      }

      this.ariaDescribedBy.set(describedByIds.join(' '));
    });
  }

  ngOnInit(): void {
    // Initialize any platform-specific features
  }

  ngAfterContentInit(): void {
    // Setup after content initialization
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  selectTab(value: string, index: number): void {
    if (this.disabled()) return;

    const tab = this.tabs()[index];
    if (tab?.disabled) return;

    const previousValue = this.activeTab();
    const previousIndex = this.tabs().findIndex(t => t.value === previousValue);

    // Optimized transition with requestAnimationFrame for smoothness
    if (this.isBrowser) {
      requestAnimationFrame(() => {
        this.activeTab.set(value);
      });
    } else {
      this.activeTab.set(value);
    }

    // Emit change event
    const changeEvent: TabChangeEvent = {
      value,
      index,
      previousValue: previousValue || undefined,
      previousIndex: previousIndex >= 0 ? previousIndex : undefined,
    };

    this.change.emit(changeEvent);

    // Handle lazy loading
    if (this.lazy() && !this.loadedTabs().has(value)) {
      this.loadedTabs.update(loaded => new Set([...loaded, value]));
      this.tabLoad.emit(value);
    }

    // Mount the new tab for smooth transition
    this.mountedTabs.update(mounted => new Set([...mounted, value]));
  }

  closeTab(event: Event, value: string, index: number): void {
    event.stopPropagation();

    if (this.disabled()) return;

    // If closing the active tab, select another tab
    if (this.activeTab() === value) {
      const tabs = this.tabs();
      const nextTab = tabs[index + 1] || tabs[index - 1];
      if (nextTab && !nextTab.disabled) {
        this.activeTab.set(nextTab.value);
      } else {
        this.activeTab.set('');
      }
    }

    this.tabClose.emit({ value, index });
  }

  addTab(): void {
    if (this.disabled()) return;
    this.tabAdd.emit();
  }

  onTabHover(index: number, isHovering: boolean): void {
    this.hoveredTab.set(isHovering ? index : -1);
  }

  onKeyDown(event: KeyboardEvent, currentIndex: number): void {
    const tabs = this.tabs().filter(tab => !tab.disabled);
    const currentTabIndex = tabs.findIndex(tab => tab.value === this.tabs()[currentIndex].value);

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentTabIndex > 0 ? currentTabIndex - 1 : tabs.length - 1;
        const prevTab = tabs[prevIndex];
        if (prevTab) {
          const originalIndex = this.tabs().findIndex(t => t.value === prevTab.value);
          this.selectTab(prevTab.value, originalIndex);
          this.focusTab(originalIndex);
        }
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = currentTabIndex < tabs.length - 1 ? currentTabIndex + 1 : 0;
        const nextTab = tabs[nextIndex];
        if (nextTab) {
          const originalIndex = this.tabs().findIndex(t => t.value === nextTab.value);
          this.selectTab(nextTab.value, originalIndex);
          this.focusTab(originalIndex);
        }
        break;

      case 'Home':
        event.preventDefault();
        const firstTab = tabs[0];
        if (firstTab) {
          const originalIndex = this.tabs().findIndex(t => t.value === firstTab.value);
          this.selectTab(firstTab.value, originalIndex);
          this.focusTab(originalIndex);
        }
        break;

      case 'End':
        event.preventDefault();
        const lastTab = tabs[tabs.length - 1];
        if (lastTab) {
          const originalIndex = this.tabs().findIndex(t => t.value === lastTab.value);
          this.selectTab(lastTab.value, originalIndex);
          this.focusTab(originalIndex);
        }
        break;

      case 'Delete':
        if (this.closableTabs() && this.tabs()[currentIndex].closable) {
          const tab = this.tabs()[currentIndex];
          this.closeTab(event, tab.value, currentIndex);
        }
        break;
    }
  }

  private focusTab(index: number): void {
    if (!this.isBrowser) return;

    // Use ViewChildren for more encapsulated focus management
    const tabTriggers = this.tabTriggers?.toArray();
    if (tabTriggers && tabTriggers[index]) {
      // Use setTimeout to ensure the DOM is updated
      setTimeout(() => {
        tabTriggers[index].nativeElement.focus();
      }, 0);
    }
  }

  // Helper methods
  shouldKeepMounted(value: string): boolean {
    return this.keepAlive() && this.mountedTabs().has(value);
  }

  getContentClasses(value: string): string {
    const baseClasses = this.tabContentClasses();
    const isActive = this.activeTab() === value;

    return cn(
      baseClasses,
      'transition-all duration-200 ease-out',
      isActive ? 'opacity-100' : 'opacity-0'
    );
  }

  getTabTransform(value: string, index: number): string {
    const isActive = this.activeTab() === value;
    const isHovered = this.hoveredTab() === index;
    
    if (isActive) {
      return 'translateY(0) scale(1)';
    } else if (isHovered) {
      return 'translateY(-1px) scale(1.02)';
    } else {
      return 'translateY(0) scale(1)';
    }
  }

  // Public methods
  getActiveTab(): TabItem | undefined {
    return this.tabs().find(tab => tab.value === this.activeTab());
  }

  getTabByValue(value: string): TabItem | undefined {
    return this.tabs().find(tab => tab.value === value);
  }

  getTabIndex(value: string): number {
    return this.tabs().findIndex(tab => tab.value === value);
  }

  isTabLoaded(value: string): boolean {
    return !this.lazy() || this.loadedTabs().has(value);
  }

  focusActiveTab(): void {
    const activeIndex = this.getTabIndex(this.activeTab());
    if (activeIndex >= 0) {
      this.focusTab(activeIndex);
    }
  }

  focusFirstTab(): void {
    const firstEnabledIndex = this.tabs().findIndex(tab => !tab.disabled);
    if (firstEnabledIndex >= 0) {
      this.focusTab(firstEnabledIndex);
    }
  }

  focusLastTab(): void {
    const tabs = this.tabs();
    for (let i = tabs.length - 1; i >= 0; i--) {
      if (!tabs[i].disabled) {
        this.focusTab(i);
        break;
      }
    }
  }
}
