import { 
  Component, 
  computed, 
  input, 
  signal, 
  OnInit, 
  AfterViewInit, 
  OnDestroy, 
  ViewContainerRef, 
  ViewChild, 
  inject, 
  TemplateRef, 
  Type, 
  ComponentRef, 
  createComponent, 
  EnvironmentInjector, 
  runInInjectionContext, 
  Injector, 
  effect,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, lucideToSvg } from '../../utils/cn';
import { LucideIconData } from 'lucide-angular';

/**
 * Icon component variants using Class Variance Authority (CVA)
 * Provides consistent sizing and styling patterns
 *
 * Sizes:
 * - xs: 12px (0.75rem) - For very small UI elements
 * - sm: 16px (1rem) - For small buttons and inline text
 * - md: 20px (1.25rem) - Default size for most use cases
 * - lg: 24px (1.5rem) - For larger buttons and prominent UI elements
 * - xl: 32px (2rem) - For large interactive elements
 * - 2xl: 40px (2.5rem) - For prominent display icons
 * - 3xl: 48px (3rem) - For hero sections and large displays
 */
const iconVariants = cva(
  [
    'inline-flex items-center justify-center flex-shrink-0',
    'transition-colors duration-200 ease-in-out',
    'select-none',
  ],
  {
    variants: {
      size: {
        xs: 'w-3 h-3 min-w-3 min-h-3',
        sm: 'w-4 h-4 min-w-4 min-h-4',
        md: 'w-5 h-5 min-w-5 min-h-5',
        lg: 'w-6 h-6 min-w-6 min-h-6',
        xl: 'w-8 h-8 min-w-8 min-h-8',
        '2xl': 'w-10 h-10 min-w-10 min-h-10',
        '3xl': 'w-12 h-12 min-w-12 min-h-12',
      },
      variant: {
        default: 'text-current',
        primary: 'text-primary',
        secondary: 'text-secondary-foreground',
        muted: 'text-muted-foreground',
        destructive: 'text-destructive',
        success: 'text-success',
        warning: 'text-warning',
        info: 'text-info',
      },
      interactive: {
        true: [
          'cursor-pointer',
          'hover:opacity-80 active:opacity-60',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'transition-all duration-200',
        ],
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      interactive: false,
    },
  }
);

type IconVariant = VariantProps<typeof iconVariants>;
type IconSize = NonNullable<IconVariant['size']>;
type IconVariantType = NonNullable<IconVariant['variant']>;

/**
 * Universal Icon Component
 * 
 * Supports multiple icon types:
 * - HTML/SVG strings: Raw SVG markup or HTML content
 * - CSS classes: Icon fonts (Font Awesome, Material Icons, etc.)
 * - Angular components: Direct component references
 * - Template references: Angular template references
 * - Lucide icon data: Direct Lucide icon data arrays
 * 
 * Features:
 * - Automatic type detection and rendering
 * - Security sanitization for HTML content
 * - Accessibility compliance with ARIA attributes
 * - Responsive sizing with consistent aspect ratios
 * - Interactive states with keyboard support
 * - Performance optimized with signals
 * 
 * @example
 * <!-- SVG String -->
 * <Icon icon="<svg>...</svg>" size="lg" />
 * 
 * <!-- CSS Class -->
 * <Icon icon="fas fa-home" variant="primary" />
 * 
 * <!-- Angular Component -->
 * <Icon [icon]="MyIconComponent" size="xl" />
 * 
 * <!-- Template Reference -->
 * <Icon [icon]="myTemplate" variant="success" />
 * 
 * <!-- Lucide Icon Data -->
 * <Icon [icon]="lucideHomeIcon" interactive />
 */
@Component({
  selector: 'Icon',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="iconClasses()"
      [attr.aria-hidden]="!ariaLabel()"
      [attr.aria-label]="ariaLabel()"
      [attr.role]="ariaLabel() ? 'img' : null"
      [attr.tabindex]="interactive() ? '0' : null"
      (click)="handleClick($event)"
      (keydown.enter)="handleKeydown($event)"
      (keydown.space)="handleKeydown($event)"
    >
      <!-- Dynamic Icon Container -->
      <div #iconContainer class="w-full h-full flex items-center justify-center">
        <!-- Fallback content for static rendering -->
        @if (iconType() === 'html' && sanitizedIcon()) {
          <span 
            [innerHTML]="sanitizedIcon()" 
            aria-hidden="true" 
            class="w-full h-full flex items-center justify-center"
          ></span>
        }
        @if (iconType() === 'class') {
          <i 
            [class]="iconValue() + ' flex items-center justify-center'" 
            aria-hidden="true"
            [style.font-size]="iconFontSize()"
            [style.line-height]="'1'"
          ></i>
        }
      </div>

      <!-- Loading state -->
      @if (loading()) {
        <div class="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded">
          <div class="animate-spin w-1/2 h-1/2 border-2 border-current border-t-transparent rounded-full"></div>
        </div>
      }
    </div>
  `,
})
export class Icon implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('iconContainer', { read: ViewContainerRef }) iconContainer!: ViewContainerRef;

  // Input signals - Universal icon support
  readonly icon = input<string | Type<any> | TemplateRef<any> | LucideIconData>('');
  readonly size = input<IconSize>('md');
  readonly variant = input<IconVariantType>('default');
  readonly interactive = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly ariaLabel = input<string>('');
  readonly customClass = input<string>('');

  // Injected dependencies
  private sanitizer = inject(DomSanitizer);
  private viewContainerRef = inject(ViewContainerRef);
  private environmentInjector = inject(EnvironmentInjector);
  private injector = inject(Injector);

  // Dynamic component reference
  private componentRef: ComponentRef<any> | null = null;

  // Icon type detection and processing
  readonly iconType = computed(() => {
    const iconValue = this.icon();
    if (!iconValue) return 'none';

    if (typeof iconValue === 'string') {
      // Check if it's HTML/SVG content (safe trim)
      const trimmed = (iconValue as any).trim ? (iconValue as any).trim() : iconValue;
      if (trimmed.startsWith('<')) {
        return 'html';
      }
      // Otherwise treat as CSS class
      return 'class';
    }

    if (typeof iconValue === 'function') {
      return 'component';
    }

    if (iconValue instanceof TemplateRef) {
      return 'template';
    }

    // Check if it's LucideIconData (array structure)
  if (Array.isArray(iconValue)) {
      return 'lucide';
    }

    return 'unknown';
  });

  readonly iconValue = computed(() => {
    const iconVal = this.icon();
    return typeof iconVal === 'string' ? iconVal : '';
  });

  // Sanitized HTML for HTML/SVG icons
  readonly sanitizedIcon = computed(() => {
    const iconVal = this.iconValue();
    const iconType = this.iconType();

    if (iconType === 'html' && iconVal) {
      return this.sanitizer.bypassSecurityTrustHtml(iconVal);
    }

    if (iconType === 'lucide') {
      // Convert LucideIconData to SVG string
      const lucideData = this.icon() as LucideIconData;
      try {
        const svgString = lucideToSvg(lucideData);
        return this.sanitizer.bypassSecurityTrustHtml(svgString);
      } catch (error) {
        console.warn('Failed to convert Lucide icon data to SVG:', error);
        return null;
      }
    }

    return null;
  });

  // CSS classes
  readonly iconClasses = computed(() =>
    cn(
      iconVariants({
        size: this.size(),
        variant: this.variant(),
        interactive: this.interactive(),
      }),
      'relative', // For loading overlay positioning
      this.customClass()
    )
  );

  readonly iconFontSize = computed(() => {
    const sizeMap = {
      xs: '12px',
      sm: '16px',
      md: '20px',
      lg: '24px',
      xl: '32px',
      '2xl': '40px',
      '3xl': '48px',
    };
    const key = (this.size() || 'md') as keyof typeof sizeMap;
    return sizeMap[key];
  });

  constructor() {
    // Component setup - icon rendering happens in ngAfterViewInit
  }

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    // Set up icon rendering after view is initialized
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.renderDynamicIcon();
      });
    });

    // Initial render
    this.renderDynamicIcon();
  }

  ngOnDestroy() {
    this.destroyDynamicIcon();
  }

  // Event handlers
  handleClick(event: Event) {
    if (!this.interactive()) return;
    
    // Emit click event for interactive icons
    event.preventDefault();
    event.stopPropagation();
  }

  handleKeydown(event: Event) {
    if (!this.interactive()) return;
    
    const e = event as any;
    if (e.key === 'Enter' || e.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      // Simulate click for keyboard interaction
      this.handleClick(event);
    }
  }

  // Icon rendering methods
  private renderDynamicIcon() {
    // Clear any existing dynamic content
    this.destroyDynamicIcon();

    const iconValue = this.icon();
    const iconType = this.iconType();

    if (!iconValue || !this.iconContainer || this.loading()) return;

    try {
      switch (iconType) {
        case 'component':
          this.renderComponent(iconValue as Type<any>);
          break;
        case 'template':
          this.renderTemplate(iconValue as TemplateRef<any>);
          break;
        case 'lucide':
          this.renderLucideIcon(iconValue as LucideIconData);
          break;
        case 'class':
          this.renderClassIcon(iconValue as string);
          break;
        case 'html':
          this.renderHtmlIcon(iconValue as string);
          break;
        default:
          console.warn('Unknown icon type:', iconType);
      }
    } catch (error) {
      console.warn('Failed to render dynamic icon:', error);
    }
  }

  private renderComponent(component: Type<any>) {
    if (!this.iconContainer) return;

    try {
      // Clear the container first
      this.iconContainer.element.nativeElement.innerHTML = '';

      this.componentRef = createComponent(component, {
        environmentInjector: this.environmentInjector,
        hostElement: this.iconContainer.element.nativeElement
      });

      // Set common properties for icon components
      const instance = this.componentRef.instance;
      if (instance) {
        const sizeValue = this.getSizeValue();
        
        // Try to set size properties (for Lucide icons and other icon components)
        if ('size' in instance) {
          instance.size = sizeValue;
        }
        if ('width' in instance) {
          instance.width = sizeValue;
        }
        if ('height' in instance) {
          instance.height = sizeValue;
        }
        
        // Set color to current color for proper theming
        if ('color' in instance) {
          instance.color = 'currentColor';
        }
        if ('strokeWidth' in instance) {
          instance.strokeWidth = 2;
        }
        
        // Set class for proper styling
        if ('class' in instance) {
          instance.class = 'w-full h-full';
        }
      }

      // Trigger change detection
      this.componentRef.changeDetectorRef.detectChanges();
    } catch (error) {
      console.warn('Failed to create component:', error);
      this.tryComponentFallback(component);
    }
  }

  private renderTemplate(template: TemplateRef<any>) {
    if (!this.iconContainer) return;

    try {
      this.iconContainer.createEmbeddedView(template);
    } catch (error) {
      console.warn('Failed to render template:', error);
    }
  }

  private renderLucideIcon(lucideData: LucideIconData) {
    if (!this.iconContainer) return;

    try {
      const svgString = lucideToSvg(lucideData);

      // Create a wrapper element to hold the SVG
      const wrapperElement = document.createElement('span');
      wrapperElement.innerHTML = svgString;
      wrapperElement.className = 'w-full h-full flex items-center justify-center';
      wrapperElement.setAttribute('aria-hidden', 'true');

      // Apply size to the SVG element directly
      const svgElement = wrapperElement.querySelector('svg');
      if (svgElement) {
        const sizeValue = this.getSizeValue();
        svgElement.setAttribute('width', sizeValue.toString());
        svgElement.setAttribute('height', sizeValue.toString());
      }

      // Clear container and append the wrapper
      this.iconContainer.element.nativeElement.innerHTML = '';
      this.iconContainer.element.nativeElement.appendChild(wrapperElement);
    } catch (error) {
      console.warn('Failed to render Lucide icon:', error);
    }
  }

  private renderClassIcon(cssClass: string) {
    if (!this.iconContainer) return;

    try {
      // Create an i element with the CSS class
      const iconElement = document.createElement('i');
      iconElement.className = `${cssClass} w-full h-full flex items-center justify-center`;
      iconElement.setAttribute('aria-hidden', 'true');
      iconElement.style.fontSize = this.iconFontSize();
      iconElement.style.lineHeight = '1';

      // Clear container and append the icon
      this.iconContainer.element.nativeElement.innerHTML = '';
      this.iconContainer.element.nativeElement.appendChild(iconElement);
    } catch (error) {
      console.warn('Failed to render CSS class icon:', error);
    }
  }

  private renderHtmlIcon(htmlString: string) {
    if (!this.iconContainer) return;

    try {
      // Create a wrapper element to hold the HTML
      const wrapperElement = document.createElement('span');
      wrapperElement.innerHTML = htmlString;
      wrapperElement.className = 'w-full h-full flex items-center justify-center';
      wrapperElement.setAttribute('aria-hidden', 'true');

      // Apply size to any SVG elements
      const svgElements = wrapperElement.querySelectorAll('svg');
      if (svgElements.length > 0) {
        const sizeValue = this.getSizeValue();
        svgElements.forEach(svg => {
          svg.setAttribute('width', sizeValue.toString());
          svg.setAttribute('height', sizeValue.toString());
        });
      }

      // Clear container and append the wrapper
      this.iconContainer.element.nativeElement.innerHTML = '';
      this.iconContainer.element.nativeElement.appendChild(wrapperElement);
    } catch (error) {
      console.warn('Failed to render HTML icon:', error);
    }
  }

  private tryComponentFallback(component: Type<any>) {
    try {
      // For Lucide Angular components, try to access their icon data
      if (component && 'iconData' in component) {
        this.renderLucideIcon((component as any).iconData);
        return;
      }

      // Create a simple fallback icon
      const fallbackSvg = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
        </svg>
      `;

      const wrapperElement = document.createElement('span');
      wrapperElement.innerHTML = fallbackSvg;
      wrapperElement.className = 'w-full h-full flex items-center justify-center opacity-50';
      wrapperElement.setAttribute('aria-hidden', 'true');

      this.iconContainer.element.nativeElement.innerHTML = '';
      this.iconContainer.element.nativeElement.appendChild(wrapperElement);
    } catch (error) {
      console.warn('Component fallback failed:', error);
    }
  }

  private destroyDynamicIcon() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    if (this.iconContainer) {
      this.iconContainer.clear();
    }
  }

  private getSizeValue(): number {
    const sizeMap = {
      xs: 12,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
      '2xl': 40,
      '3xl': 48,
    };
    const key = (this.size() || 'md') as keyof typeof sizeMap;
    return sizeMap[key];
  }
}
