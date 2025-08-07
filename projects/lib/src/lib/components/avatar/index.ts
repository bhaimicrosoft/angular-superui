import { Component, Input, OnInit, OnDestroy, Injectable, signal, computed, effect, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Avatar container variants
const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden',
  {
    variants: {
      size: {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
        '2xl': 'h-20 w-20',
        '3xl': 'h-24 w-24',
        '4xl': 'h-32 w-32',
        '5xl': 'h-40 w-40',
        '6xl': 'h-48 w-48',
        '7xl': 'h-56 w-56',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-lg',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
    },
  }
);

// Avatar fallback text variants
const avatarFallbackVariants = cva(
  'absolute inset-0 flex items-center justify-center font-medium select-none bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
        '2xl': 'text-xl',
        '3xl': 'text-2xl',
        '4xl': 'text-3xl',
        '5xl': 'text-4xl',
        '6xl': 'text-5xl',
        '7xl': 'text-6xl',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-lg',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
    },
  }
);

// Avatar image variants
const avatarImageVariants = cva(
  'absolute inset-0 object-cover w-full h-full',
  {
    variants: {
      shape: {
        circle: 'rounded-full',
        square: 'rounded-lg',
      },
    },
    defaultVariants: {
      shape: 'circle',
    },
  }
);

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  className?: string;
}

export interface AvatarImageProps {
  src: string;
  alt: string;
  className?: string;
}

export interface AvatarFallbackProps extends VariantProps<typeof avatarFallbackVariants> {
  className?: string;
  ariaLabel?: string;
}

@Injectable()
export class AvatarStateService {
  // Signal to track if image is loaded
  private readonly _imageLoaded = signal<boolean>(false);
  private readonly _imageError = signal<boolean>(false);
  private readonly _imageAttempted = signal<boolean>(false);
  private readonly _avatarSize = signal<string>('md');
  private readonly _avatarShape = signal<string>('circle');

  // Public readonly signals
  readonly imageLoaded = this._imageLoaded.asReadonly();
  readonly imageError = this._imageError.asReadonly();
  readonly imageAttempted = this._imageAttempted.asReadonly();
  readonly avatarSize = this._avatarSize.asReadonly();
  readonly avatarShape = this._avatarShape.asReadonly();

  setImageAttempted(attempted: boolean) {
    this._imageAttempted.set(attempted);
  }

  setImageLoaded(loaded: boolean) {
    this._imageLoaded.set(loaded);
    if (loaded) {
      this._imageError.set(false);
    }
  }

  setImageError(error: boolean) {
    this._imageError.set(error);
    if (error) {
      this._imageLoaded.set(false);
    }
  }

  setAvatarSize(size: string) {
    this._avatarSize.set(size);
  }

  setAvatarShape(shape: string) {
    this._avatarShape.set(shape);
  }

  reset() {
    this._imageLoaded.set(false);
    this._imageError.set(false);
    this._imageAttempted.set(false);
  }
}

@Component({
  selector: 'Avatar',
  standalone: true,
  imports: [CommonModule],
  providers: [AvatarStateService],
  template: `
    <div [class]="avatarClasses">
      <ng-content></ng-content>
    </div>
  `,
})
export class Avatar implements AvatarProps, OnInit {
  @Input() size: VariantProps<typeof avatarVariants>['size'] = 'md';
  @Input() shape: VariantProps<typeof avatarVariants>['shape'] = 'circle';
  @Input() className?: string;

  protected readonly cn = cn;
  protected readonly avatarVariants = avatarVariants;

  get avatarClasses(): string {
    return this.cn(
      this.avatarVariants({ size: this.size, shape: this.shape }),
      this.className
    );
  }

  constructor(private avatarState: AvatarStateService) {}

  ngOnInit() {
    // Reset the image state when Avatar initializes
    this.avatarState.reset();

    // Update the state service with current size and shape
    this.avatarState.setAvatarSize(this.size || 'md');
    this.avatarState.setAvatarShape(this.shape || 'circle');
  }
}

@Component({
  selector: 'AvatarImage',
  standalone: true,
  imports: [CommonModule],
  template: `
    <img
      *ngIf="!hasError()"
      [src]="src"
      [alt]="alt"
      [class]="imageClasses"
      (load)="onImageLoad()"
      (error)="onImageError()"
      loading="eager"
      [attr.aria-hidden]="false"
    />
  `,
})
export class AvatarImage implements AvatarImageProps, OnInit, OnDestroy {
  @Input() src!: string;
  @Input() alt!: string;
  @Input() className?: string;

  // Use signals for internal state
  private readonly _imageLoaded = signal<boolean>(false);
  private readonly _imageError = signal<boolean>(false);
  private loadTimeout?: number;

  protected readonly cn = cn;
  protected readonly avatarImageVariants = avatarImageVariants;

  // Computed signal for debugging (optional)
  protected readonly isLoading = computed(() => !this._imageLoaded() && !this._imageError());

  // Computed signal to track if there's an error
  protected readonly hasError = computed(() => this._imageError());

  // Computed signal to determine if image should be visible
  protected readonly shouldShowImage = computed(() => {
    // Always try to show the image unless there's an error
    return !this._imageError();
  });

  get imageClasses(): string {
    const shape = this.avatarState.avatarShape();
    return this.cn(
      this.avatarImageVariants({ shape: shape as 'circle' | 'square' }),
      this.className
    );
  }

  constructor(private avatarState: AvatarStateService) {}

  ngOnInit() {
    // Mark that an image is being attempted
    this.avatarState.setImageAttempted(true);

    // Set a timeout for image loading (5 seconds)
    this.loadTimeout = window.setTimeout(() => {
      if (!this._imageLoaded()) {
        this._imageError.set(true);
        this.avatarState.setImageError(true);
      }
    }, 5000);
  }

  ngOnDestroy() {
    if (this.loadTimeout) {
      clearTimeout(this.loadTimeout);
    }
  }

  protected onImageLoad() {
    this._imageLoaded.set(true);
    this._imageError.set(false);
    this.avatarState.setImageLoaded(true);
    if (this.loadTimeout) {
      clearTimeout(this.loadTimeout);
    }
  }

  protected onImageError() {
    this._imageLoaded.set(false);
    this._imageError.set(true);
    this.avatarState.setImageError(true);
    if (this.loadTimeout) {
      clearTimeout(this.loadTimeout);
    }
  }
}

@Component({
  selector: 'AvatarFallback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="fallbackClasses"
      [attr.aria-label]="ariaLabel || 'Avatar fallback'"
      role="img"
      [attr.aria-hidden]="false"
      [style.display]="shouldShowFallback() ? 'flex' : 'none'"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class AvatarFallback implements AvatarFallbackProps, OnInit, OnDestroy {
  @Input() size: VariantProps<typeof avatarFallbackVariants>['size'] = 'md';
  @Input() shape: VariantProps<typeof avatarFallbackVariants>['shape'] = 'circle';
  @Input() className?: string;
  @Input() ariaLabel?: string;

  protected readonly cn = cn;
  protected readonly avatarFallbackVariants = avatarFallbackVariants;

  // Public computed signal for template with better logic
  protected readonly shouldShowFallback = computed(() => {
    // If no image is being attempted, always show fallback (pure fallback scenario)
    if (!this.avatarState.imageAttempted()) {
      return true;
    }

    // If an image is being attempted, show fallback when image hasn't loaded or has errored
    return !this.avatarState.imageLoaded() || this.avatarState.imageError();
  });

  get fallbackClasses(): string {
    // Use the shape from the state service if not explicitly provided
    const currentShape = this.shape || this.avatarState.avatarShape() as 'circle' | 'square';
    const currentSize = this.size || this.avatarState.avatarSize() as VariantProps<typeof avatarFallbackVariants>['size'];

    return this.cn(
      this.avatarFallbackVariants({
        size: currentSize,
        shape: currentShape
      }),
      this.className
    );
  }

  constructor(private avatarState: AvatarStateService) {}

  ngOnInit() {
    // Initialize the fallback state - always start with fallback visible
  }

  ngOnDestroy() {
    // Cleanup if needed
  }
}

// Export all components and types
export { avatarVariants, avatarFallbackVariants, avatarImageVariants };
