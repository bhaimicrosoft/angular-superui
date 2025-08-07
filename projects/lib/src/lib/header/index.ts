import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  effect,
  inject,
  PLATFORM_ID,
  afterNextRender,
  OnDestroy
} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {A11yModule} from '@angular/cdk/a11y';
import {OverlayModule, Overlay, OverlayRef, OverlayPositionBuilder, OverlayConfig} from '@angular/cdk/overlay';
import {ComponentPortal, TemplatePortal} from '@angular/cdk/portal';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '../utils/cn';

/**
 * Navigation item interface for header menu items
 */
export interface HeaderNavItem {
  label: string;
  href?: string;
  routerLink?: string | string[];
  icon?: string;
  children?: HeaderNavItem[];
  disabled?: boolean;
  external?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top';
  divider?: boolean;
}

/**
 * User profile information interface
 */
export interface HeaderUser {
  name: string;
  email?: string;
  avatar?: string;
  initials?: string;
}

/**
 * Header component variants using class-variance-authority
 */
const headerVariants = cva(
  [
    // Base styles
    'w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'sticky top-0 z-50 transition-all duration-200'
  ],
  {
    variants: {
      variant: {
        default: 'border-border',
        ghost: 'border-transparent bg-transparent backdrop-blur-none',
        solid: 'bg-background border-border shadow-sm',
        floating: 'mx-2 sm:mx-4 mt-2 sm:mt-4 rounded-lg border shadow-lg'
      },
      size: {
        sm: 'h-12 sm:h-14',
        default: 'h-14 sm:h-16',
        lg: 'h-16 sm:h-20'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const headerContentVariants = cva(
  [
    'container mx-auto flex items-center justify-between h-full',
    'px-3 sm:px-4 md:px-6 lg:px-8',
    'gap-2 sm:gap-4 md:gap-6',
    'max-w-full min-w-0' // Prevent overflow
  ]
);

const logoVariants = cva(
  [
    'flex items-center space-x-1 sm:space-x-2 font-semibold transition-colors',
    'hover:text-foreground/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'min-w-0 flex-shrink-0' // Prevent logo from being compressed
  ],
  {
    variants: {
      size: {
        sm: 'text-base sm:text-lg',
        default: 'text-lg sm:text-xl',
        lg: 'text-xl sm:text-2xl'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

const navVariants = cva(
  [
    'hidden lg:flex items-center space-x-2 lg:space-x-6',
    'flex-1 justify-center max-w-none' // Take available space and center
  ]
);

const navItemVariants = cva(
  [
    'relative flex items-center space-x-1 px-2 lg:px-3 py-2 rounded-md',
    'text-sm font-medium transition-all duration-200',
    'hover:bg-accent hover:text-accent-foreground',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'whitespace-nowrap' // Prevent text wrapping
  ],
  {
    variants: {
      active: {
        true: 'bg-accent text-accent-foreground',
        false: 'text-muted-foreground hover:text-foreground'
      }
    },
    defaultVariants: {
      active: false
    }
  }
);

const searchVariants = cva(
  [
    'relative hidden sm:flex items-center',
    'w-full max-w-xs lg:max-w-sm',
    'mx-2 lg:mx-4',
    'flex-shrink min-w-0' // Allow shrinking when space is tight
  ]
);

const searchInputVariants = cva(
  [
    'flex h-8 sm:h-9 w-full rounded-md border border-input bg-background',
    'px-3 py-1 text-sm',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'pl-8 sm:pl-9 pr-3 sm:pr-4',
    'min-w-0' // Allow input to shrink
  ]
);

const actionsVariants = cva(
  [
    'flex items-center space-x-1 sm:space-x-2',
    'flex-shrink-0 min-w-0' // Don't shrink actions area
  ]
);

const mobileMenuVariants = cva(
  [
    'lg:hidden fixed inset-x-0 z-40 bg-background border-b shadow-lg',
    'transform transition-all duration-300 ease-in-out',
    'max-h-[calc(100vh-4rem)] overflow-y-auto' // Limit height and allow scrolling
  ],
  {
    variants: {
      open: {
        true: 'translate-y-0 opacity-100',
        false: '-translate-y-full opacity-0 pointer-events-none'
      },
      size: {
        sm: 'top-12',
        default: 'top-14 sm:top-16', 
        lg: 'top-16 sm:top-20'
      }
    },
    defaultVariants: {
      open: false,
      size: 'default'
    }
  }
);

const mobileNavItemVariants = cva(
  [
    'flex items-center space-x-3 px-4 py-3 text-sm font-medium border-b border-border/50',
    'hover:bg-accent hover:text-accent-foreground transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset',
    'min-h-[44px]' // Ensure proper touch target size
  ],
  {
    variants: {
      active: {
        true: 'bg-accent text-accent-foreground',
        false: 'text-muted-foreground'
      }
    },
    defaultVariants: {
      active: false
    }
  }
);

const userMenuVariants = cva(
  [
    'relative'
  ]
);

const headerAvatarVariants = cva(
  [
    'flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium',
    'hover:bg-primary/90 transition-colors cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'flex-shrink-0' // Prevent avatar from shrinking
  ],
  {
    variants: {
      size: {
        sm: 'w-7 h-7 text-xs sm:w-8 sm:h-8 sm:text-sm',
        default: 'w-8 h-8 text-sm sm:w-9 sm:h-9',
        lg: 'w-9 h-9 text-sm sm:w-10 sm:h-10 sm:text-base'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

const dropdownVariants = cva(
  [
    'w-48 bg-background border border-border rounded-md shadow-lg',
    'py-1 transform transition-all duration-200'
  ],
  {
    variants: {
      open: {
        true: 'scale-100 opacity-100',
        false: 'scale-95 opacity-0 pointer-events-none'
      }
    },
    defaultVariants: {
      open: false
    }
  }
);

const userDropdownVariants = cva(
  [
    'w-48 bg-background border border-border rounded-md shadow-lg',
    'py-1 transform transition-all duration-200'
  ],
  {
    variants: {
      open: {
        true: 'scale-100 opacity-100',
        false: 'scale-95 opacity-0 pointer-events-none'
      }
    },
    defaultVariants: {
      open: false
    }
  }
);

const dropdownItemVariants = cva(
  [
    'flex items-center space-x-3 px-4 py-2 text-sm text-muted-foreground',
    'hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer',
    'focus:outline-none focus:bg-accent focus:text-accent-foreground'
  ]
);

/**
 * Header Block Component
 * 
 * A comprehensive header component with navigation, search, user menu, and mobile support.
 * Provides multiple variants and customization options for different use cases.
 * 
 * @example
 * ```html
 * <app-header
 *   [logo]="{ text: 'MyApp', href: '/' }"
 *   [navigation]="navItems"
 *   [user]="currentUser"
 *   [showSearch]="true"
 *   variant="default"
 *   size="default"
 *   (searchChange)="onSearch($event)"
 *   (userMenuAction)="onUserAction($event)">
 *   
 *   <ng-container slot="actions">
 *     <button class="btn btn-primary">Sign In</button>
 *   </ng-container>
 * </app-header>
 * ```
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    A11yModule,
    OverlayModule
  ],
  animations: [
    trigger('slideDown', [
      state('closed', style({
        height: '0',
        opacity: '0',
        overflow: 'hidden'
      })),
      state('open', style({
        height: '*',
        opacity: '1'
      })),
      transition('closed <=> open', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ]),
    trigger('fadeInOut', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate('200ms ease-in')
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({opacity: 0}))
      ])
    ])
  ],
  template: `
    <header [class]="headerClasses()">
      <div [class]="headerContentClasses()">
        <!-- Logo -->
        <div class="flex items-center">
          @if (logo()) {
            <a 
              [href]="logo()!.href || '#'"
              [routerLink]="logo()!.routerLink"
              [class]="logoClasses()"
              [attr.aria-label]="logo()!.text + ' - Go to homepage'">
              @if (logo()!.icon) {
                <span [innerHTML]="logo()!.icon" class="w-6 h-6"></span>
              }
              @if (logo()!.image) {
                <img 
                  [src]="logo()!.image" 
                  [alt]="logo()!.text"
                  class="h-8 w-auto">
              }
              @if (logo()!.text) {
                <span>{{ logo()!.text }}</span>
              }
            </a>
          }
        </div>

        <!-- Desktop Navigation -->
        @if (navigation().length > 0) {
          <nav [class]="navClasses()" role="navigation" aria-label="Main navigation">
            @for (item of navigation(); track item.label) {
              @if (item.children && item.children.length > 0) {
                <!-- Dropdown Navigation Item -->
                <div class="relative">
                  <button
                    #navDropdownTrigger
                    [class]="navItemClasses()"
                    [attr.aria-expanded]="activeDropdown() === item.label"
                    [attr.aria-haspopup]="true"
                    (click)="toggleNavDropdown(item, navDropdownTrigger)"
                    (keydown.enter)="toggleNavDropdown(item, navDropdownTrigger)"
                    (keydown.space)="toggleNavDropdown(item, navDropdownTrigger); $event.preventDefault()">
                    @if (item.icon) {
                      <span [innerHTML]="item.icon" class="w-4 h-4"></span>
                    }
                    <span>{{ item.label }}</span>
                    <svg class="w-4 h-4 transition-transform duration-200" 
                         [class.rotate-180]="activeDropdown() === item.label"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                </div>
              } @else {
                <!-- Regular Navigation Item -->
                <a
                  [href]="item.href || '#'"
                  [routerLink]="item.routerLink"
                  [target]="item.target || '_self'"
                  [class]="navItemClasses()"
                  routerLinkActive="bg-accent text-accent-foreground"
                  [routerLinkActiveOptions]="{ exact: false }"
                  [attr.aria-disabled]="item.disabled">
                  @if (item.icon) {
                    <span [innerHTML]="item.icon" class="w-4 h-4"></span>
                  }
                  <span>{{ item.label }}</span>
                  @if (item.external) {
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  }
                </a>
              }
            }
          </nav>
        }

        <!-- Search Bar -->
        @if (showSearch()) {
          <div [class]="searchClasses()">
            <div class="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2">
              <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              #searchInput
              type="search"
              [class]="searchInputClasses()"
              [placeholder]="searchPlaceholder()"
              [value]="searchValue()"
              (input)="onSearchInput($event)"
              (keydown.enter)="onSearchSubmit()"
              (keydown.escape)="clearSearch()"
              aria-label="Search">
          </div>
        }

        <!-- Actions & User Menu -->
        <div [class]="actionsClasses()">
          <!-- Custom Actions Slot -->
          <ng-content select="[slot=actions]"></ng-content>

          <!-- User Menu - Hidden on mobile and tablet, visible from lg screens -->
          @if (user()) {
            <div [class]="userMenuClasses()" class="hidden lg:flex">
              <button
                #userDropdownTrigger
                [class]="avatarClasses()"
                [attr.aria-expanded]="userMenuOpen()"
                [attr.aria-haspopup]="true"
                aria-label="User menu"
                (click)="toggleUserDropdown(userDropdownTrigger)"
                (keydown.enter)="toggleUserDropdown(userDropdownTrigger)"
                (keydown.space)="toggleUserDropdown(userDropdownTrigger); $event.preventDefault()">
                @if (user()!.avatar) {
                  <img 
                    [src]="user()!.avatar" 
                    [alt]="user()!.name"
                    class="w-full h-full rounded-full object-cover">
                } @else {
                  <span class="text-xs font-medium">{{ getUserInitials() }}</span>
                }
              </button>
            </div>
          }

          <!-- Mobile Menu Toggle -->
          <button
            class="lg:hidden p-1.5 sm:p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            [attr.aria-expanded]="mobileMenuOpen()"
            aria-label="Toggle mobile menu"
            (click)="toggleMobileMenu()">
            @if (!mobileMenuOpen()) {
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            } @else {
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            }
          </button>
        </div>
      </div>

      <!-- Mobile Menu moved to CDK Overlay Template -->
    </header>

    <!-- Mobile Menu Template -->
    <ng-template #mobileMenuTemplate>
      <div class="fixed inset-0 z-50 lg:hidden">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-background/80 backdrop-blur-sm" 
             (click)="closeMobileMenu()"></div>
        
        <!-- Mobile Menu Panel -->
        <div [class]="getMobileMenuClasses(true)"
             [@slideDown]="mobileMenuOpen() ? 'open' : 'closed'"
             role="navigation"
             aria-label="Mobile navigation"
             class="relative">
          <!-- Mobile Search -->
          @if (showSearch()) {
            <div class="px-4 py-3 border-b border-border/50">
              <div class="relative">
                <div class="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2">
                  <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="search"
                  [class]="searchInputClasses()"
                  [placeholder]="searchPlaceholder()"
                  [value]="searchValue()"
                  (input)="onSearchInput($event)"
                  (keydown.enter)="onSearchSubmit()"
                  aria-label="Mobile search">
              </div>
            </div>
          }

          <!-- Mobile Navigation Items -->
          @for (item of navigation(); track item.label) {
            @if (item.children && item.children.length > 0) {
              <!-- Mobile Dropdown Item -->
              <div>
                <button
                  [class]="mobileNavItemClasses()"
                  [attr.aria-expanded]="activeMobileDropdown() === item.label"
                  (click)="toggleMobileDropdown(item.label)">
                  @if (item.icon) {
                    <span [innerHTML]="item.icon" class="w-4 h-4"></span>
                  }
                  <span class="flex-1 text-left">{{ item.label }}</span>
                  <svg class="w-4 h-4 transition-transform duration-200" 
                       [class.rotate-180]="activeMobileDropdown() === item.label"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                @if (activeMobileDropdown() === item.label) {
                  <div class="bg-accent/50">
                    @for (child of item.children; track child.label) {
                      @if (child.divider) {
                        <div class="border-t border-border/50 my-1 mx-4"></div>
                      } @else {
                        <a
                          [href]="child.href || '#'"
                          [routerLink]="child.routerLink"
                          [target]="child.target || '_self'"
                          class="flex items-center space-x-3 px-8 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                          (click)="closeMobileMenu()"
                          [attr.aria-disabled]="child.disabled">
                          @if (child.icon) {
                            <span [innerHTML]="child.icon" class="w-4 h-4"></span>
                          }
                          <span>{{ child.label }}</span>
                        </a>
                      }
                    }
                  </div>
                }
              </div>
            } @else {
              <!-- Regular Mobile Nav Item -->
              <a
                [href]="item.href || '#'"
                [routerLink]="item.routerLink"
                [target]="item.target || '_self'"
                [class]="mobileNavItemClasses()"
                routerLinkActive="bg-accent text-accent-foreground"
                (click)="closeMobileMenu()"
                [attr.aria-disabled]="item.disabled">
                @if (item.icon) {
                  <span [innerHTML]="item.icon" class="w-4 h-4"></span>
                }
                <span>{{ item.label }}</span>
                @if (item.external) {
                  <svg class="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                }
              </a>
            }
          }

          <!-- Mobile User Actions -->
          @if (user() && userMenuActions().length > 0) {
            <div class="border-t border-border/50 mt-2">
              @for (action of userMenuActions(); track action.label) {
                @if (action.divider) {
                  <div class="border-t border-border/50 my-1"></div>
                } @else {
                  <button
                    [class]="mobileNavItemClasses()"
                    (click)="onUserMenuAction(action); closeMobileMenu()"
                    [attr.aria-disabled]="action.disabled">
                    @if (action.icon) {
                      <span [innerHTML]="action.icon" class="w-4 h-4"></span>
                    }
                    <span>{{ action.label }}</span>
                  </button>
                }
              }
            </div>
          }
        </div>
      </div>
    </ng-template>

    <!-- Navigation Dropdown Template -->
    <ng-template #navDropdownTemplate>
      <div [class]="getDropdownClasses(true)" role="menu">
        @for (child of currentDropdownItems(); track child.label) {
          @if (child.divider) {
            <div class="border-t border-border/50 my-1"></div>
          } @else {
            <a
              [href]="child.href || '#'"
              [routerLink]="child.routerLink"
              [target]="child.target || '_self'"
              [class]="dropdownItemClasses()"
              role="menuitem"
              (click)="closeNavDropdown()"
              [attr.aria-disabled]="child.disabled">
              @if (child.icon) {
                <span [innerHTML]="child.icon" class="w-4 h-4"></span>
              }
              <span>{{ child.label }}</span>
              @if (child.external) {
                <svg class="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              }
            </a>
          }
        }
      </div>
    </ng-template>

    <!-- User Dropdown Template -->
    <ng-template #userDropdownTemplate>
      <div [class]="getUserDropdownClasses(true)" role="menu" aria-label="User menu">
        <div class="px-4 py-2 border-b border-border/50">
          <p class="text-sm font-medium text-foreground">{{ user()!.name }}</p>
          @if (user()!.email) {
            <p class="text-xs text-muted-foreground">{{ user()!.email }}</p>
          }
        </div>
        
        @for (action of userMenuActions(); track action.label) {
          @if (action.divider) {
            <div class="border-t border-border/50 my-1"></div>
          } @else {
            <button
              [class]="dropdownItemClasses()"
              role="menuitem"
              (click)="onUserMenuAction(action); closeUserDropdown()"
              [attr.aria-disabled]="action.disabled">
              @if (action.icon) {
                <span [innerHTML]="action.icon" class="w-4 h-4"></span>
              }
              <span>{{ action.label }}</span>
            </button>
          }
        }
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private elementRef = inject(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);
  private overlay = inject(Overlay);
  private overlayPositionBuilder = inject(OverlayPositionBuilder);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('navDropdownTemplate') navDropdownTemplate!: any;
  @ViewChild('userDropdownTemplate') userDropdownTemplate!: any;
  @ViewChild('mobileMenuTemplate') mobileMenuTemplate!: any;

  // Overlay refs for dropdowns
  private navDropdownOverlayRef: OverlayRef | null = null;
  private userDropdownOverlayRef: OverlayRef | null = null;
  private mobileMenuOverlayRef: OverlayRef | null = null;

  // Inputs
  logo = input<{
    text?: string;
    image?: string;
    icon?: string;
    href?: string;
    routerLink?: string | string[];
  }>();

  navigation = input<HeaderNavItem[]>([]);
  user = input<HeaderUser | null>(null);
  
  variant = input<'default' | 'ghost' | 'solid' | 'floating'>('default');
  size = input<'sm' | 'default' | 'lg'>('default');
  
  showSearch = input<boolean>(false);
  searchPlaceholder = input<string>('Search...');
  searchValue = input<string>('');
  
  userMenuActions = input<Array<{
    label: string;
    icon?: string;
    action: string;
    disabled?: boolean;
    divider?: boolean;
  }>>([
    { label: 'Profile', icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>', action: 'profile' },
    { label: 'Settings', icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>', action: 'settings' },
    { divider: true, label: '', action: '' },
    { label: 'Sign Out', icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>', action: 'signout' }
  ]);

  // Outputs
  searchChange = output<string>();
  searchSubmit = output<string>();
  userMenuAction = output<{ action: string; user: HeaderUser }>();
  navigationClick = output<{ item: HeaderNavItem; event: Event }>();

  // Internal state
  private currentSearch = signal<string>('');
  private mobileMenuOpenState = signal<boolean>(false);
  private userMenuOpenState = signal<boolean>(false);
  private activeDropdownState = signal<string | null>(null);
  private activeMobileDropdownState = signal<string | null>(null);
  private currentDropdownItemsState = signal<HeaderNavItem[]>([]);

  // Computed properties
  headerClasses = computed(() => cn(headerVariants({
    variant: this.variant(),
    size: this.size()
  })));

  headerContentClasses = computed(() => cn(headerContentVariants()));
  logoClasses = computed(() => cn(logoVariants({ size: this.size() })));
  navClasses = computed(() => cn(navVariants()));
  navItemClasses = computed(() => cn(navItemVariants()));
  searchClasses = computed(() => cn(searchVariants()));
  searchInputClasses = computed(() => cn(searchInputVariants()));
  actionsClasses = computed(() => cn(actionsVariants()));
  userMenuClasses = computed(() => cn(userMenuVariants()));
  avatarClasses = computed(() => cn(headerAvatarVariants({ size: this.size() })));
  dropdownClasses = computed(() => cn(dropdownVariants({ open: false })));
  dropdownItemClasses = computed(() => cn(dropdownItemVariants()));
  mobileMenuClasses = computed(() => cn(mobileMenuVariants({ open: false })));
  currentDropdownItems = computed(() => this.currentDropdownItemsState());

  // Helper methods for dynamic classes
  getDropdownClasses(open: boolean) {
    return cn(dropdownVariants({ open }));
  }

  getUserDropdownClasses(open: boolean) {
    return cn(userDropdownVariants({ open }));
  }

  getMobileMenuClasses(open: boolean) {
    return cn(mobileMenuVariants({ open, size: this.size() }));
  }
  mobileNavItemClasses = computed(() => cn(mobileNavItemVariants()));

  // State getters
  mobileMenuOpen = computed(() => this.mobileMenuOpenState());
  userMenuOpen = computed(() => this.userMenuOpenState());
  activeDropdown = computed(() => this.activeDropdownState());
  activeMobileDropdown = computed(() => this.activeMobileDropdownState());

  constructor() {
    // Update internal search state when input changes
    effect(() => {
      this.currentSearch.set(this.searchValue());
    });

    // Close menus when clicking outside
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        document.addEventListener('click', this.handleOutsideClick.bind(this));
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
      }
    });
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('click', this.handleOutsideClick.bind(this));
      document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    }
    // Clean up overlays
    this.closeNavDropdown();
    this.closeUserDropdown();
    this.closeMobileMenu();
  }

  // Search methods
  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.currentSearch.set(value);
    this.searchChange.emit(value);
  }

  onSearchSubmit() {
    const value = this.currentSearch();
    this.searchSubmit.emit(value);
  }

  clearSearch() {
    this.currentSearch.set('');
    this.searchChange.emit('');
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
    }
  }

  // Mobile menu methods
  toggleMobileMenu() {
    if (this.mobileMenuOverlayRef) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  private openMobileMenu() {
    if (this.mobileMenuOverlayRef) return;

    // Create overlay config for mobile menu (full screen)
    const positionStrategy = this.overlay.position()
      .global()
      .top('0px')
      .left('0px');

    const overlayConfig = new OverlayConfig({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      width: '100%',
      height: '100%'
    });

    this.mobileMenuOverlayRef = this.overlay.create(overlayConfig);

    // Handle backdrop clicks to close menu
    this.mobileMenuOverlayRef.backdropClick().subscribe(() => {
      this.closeMobileMenu();
    });

    // Create and attach portal
    const portal = new TemplatePortal(this.mobileMenuTemplate, this.viewContainerRef);
    this.mobileMenuOverlayRef.attach(portal);

    this.mobileMenuOpenState.set(true);
  }

  closeMobileMenu() {
    if (this.mobileMenuOverlayRef) {
      this.mobileMenuOverlayRef.dispose();
      this.mobileMenuOverlayRef = null;
    }
    this.mobileMenuOpenState.set(false);
    this.activeMobileDropdownState.set(null);
  }

  // User menu methods
  toggleUserMenu() {
    this.userMenuOpenState.update(open => !open);
  }

  closeUserMenu() {
    this.userMenuOpenState.set(false);
  }

  onUserMenuAction(action: { action: string; disabled?: boolean }) {
    if (action.disabled) return;
    
    const user = this.user();
    if (user) {
      this.userMenuAction.emit({ action: action.action, user });
    }
    this.closeUserMenu();
  }

  getUserInitials(): string {
    const user = this.user();
    if (!user) return '';
    
    if (user.initials) return user.initials;
    
    return user.name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }

  // Dropdown methods
  toggleDropdown(label: string) {
    this.activeDropdownState.update(current => 
      current === label ? null : label
    );
  }

  closeDropdown() {
    this.activeDropdownState.set(null);
  }

  // CDK Overlay dropdown methods
  toggleNavDropdown(item: HeaderNavItem, trigger: HTMLElement) {
    if (this.navDropdownOverlayRef) {
      this.closeNavDropdown();
    } else {
      this.openNavDropdown(item, trigger);
    }
  }

  private openNavDropdown(item: HeaderNavItem, trigger: HTMLElement) {
    this.currentDropdownItemsState.set(item.children || []);
    this.activeDropdownState.set(item.label);

    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(trigger)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 8
        },
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -8
        }
      ]);

    this.navDropdownOverlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    const portal = new TemplatePortal(this.navDropdownTemplate, this.viewContainerRef);
    this.navDropdownOverlayRef.attach(portal);

    this.navDropdownOverlayRef.backdropClick().subscribe(() => {
      this.closeNavDropdown();
    });
  }

  closeNavDropdown() {
    if (this.navDropdownOverlayRef) {
      this.navDropdownOverlayRef.dispose();
      this.navDropdownOverlayRef = null;
      this.activeDropdownState.set(null);
      this.currentDropdownItemsState.set([]);
    }
  }

  toggleUserDropdown(trigger: HTMLElement) {
    if (this.userDropdownOverlayRef) {
      this.closeUserDropdown();
    } else {
      this.openUserDropdown(trigger);
    }
  }

  private openUserDropdown(trigger: HTMLElement) {
    this.userMenuOpenState.set(true);

    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(trigger)
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 8
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetY: -8
        }
      ]);

    this.userDropdownOverlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    const portal = new TemplatePortal(this.userDropdownTemplate, this.viewContainerRef);
    this.userDropdownOverlayRef.attach(portal);

    this.userDropdownOverlayRef.backdropClick().subscribe(() => {
      this.closeUserDropdown();
    });
  }

  closeUserDropdown() {
    if (this.userDropdownOverlayRef) {
      this.userDropdownOverlayRef.dispose();
      this.userDropdownOverlayRef = null;
      this.userMenuOpenState.set(false);
    }
  }

  toggleMobileDropdown(label: string) {
    this.activeMobileDropdownState.update(current => 
      current === label ? null : label
    );
  }

  // Event handlers
  private handleOutsideClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.closeUserMenu();
      this.closeDropdown();
      this.closeMobileMenu();
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeUserDropdown();
      this.closeNavDropdown();
      this.closeDropdown();
      this.closeMobileMenu();
    }
  }
}

// Export types and variants for external use
export type HeaderVariant = VariantProps<typeof headerVariants>;
export { headerVariants, logoVariants, navItemVariants, headerAvatarVariants };
