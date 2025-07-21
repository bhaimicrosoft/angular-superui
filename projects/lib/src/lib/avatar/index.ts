import { Component, Input, OnInit, OnDestroy, Injectable, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

// Avatar container variants
const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
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
        '7xl': 'h-50 w-50',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// Avatar fallback text variants
const avatarFallbackVariants = cva(
  'flex h-full w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 font-medium select-none text-slate-900 dark:text-slate-50',
  {
    variants: {
      size: {
        sm: 'text-xs leading-none',
        md: 'text-sm leading-none',
        lg: 'text-base leading-none',
        xl: 'text-lg leading-none',
        '2xl': 'text-xl leading-none',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  className?: string;
  ariaLabel?: string;
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
  private _imageLoaded = signal<boolean>(false);

  // Read-only computed signal for external consumption
  readonly imageLoaded = this._imageLoaded.asReadonly();

  setImageLoaded(loaded: boolean) {
    this._imageLoaded.set(loaded);
  }

  reset() {
    this._imageLoaded.set(false);
  }
}

@Component({
  selector: 'Avatar',
  standalone: true,
  imports: [CommonModule],
  providers: [AvatarStateService],
  template: `
    <div
      [attr.role]="'img'"
      [attr.aria-label]="ariaLabel || 'User avatar'"
      [class]="cn(avatarVariants({ size }), className)"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class Avatar implements AvatarProps, OnInit {
  @Input() size: VariantProps<typeof avatarVariants>['size'] = 'md';
  @Input() className?: string;
  @Input() ariaLabel?: string;

  protected readonly cn = cn;
  protected readonly avatarVariants = avatarVariants;

  constructor(private avatarState: AvatarStateService) {}

  ngOnInit() {
    // Reset the image state when Avatar initializes
    this.avatarState.reset();
  }
}

@Component({
  selector: 'AvatarImage',
  standalone: true,
  imports: [CommonModule],
  template: `
    <img
      [src]="src"
      [alt]="alt"
      [class]="cn('aspect-square h-full w-full object-cover', className)"
      (load)="onImageLoad()"
      (error)="onImageError()"
      loading="lazy"
      [attr.aria-hidden]="true"
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

  // Computed signal for debugging (optional)
  protected readonly isLoading = computed(() => !this._imageLoaded() && !this._imageError());

  constructor(private avatarState: AvatarStateService) {}

  ngOnInit() {
    // Set a timeout for image loading (5 seconds)
    this.loadTimeout = window.setTimeout(() => {
      if (!this._imageLoaded()) {
        this._imageError.set(true);
        this.avatarState.setImageLoaded(false);
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
    this.avatarState.setImageLoaded(false);
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
    <span
      *ngIf="!imageLoaded()"
      [class]="cn(avatarFallbackVariants({ size }), className)"
      [attr.aria-label]="ariaLabel || 'Avatar initials'"
      [attr.aria-hidden]="true"
    >
      <ng-content></ng-content>
    </span>
  `,
})
export class AvatarFallback implements AvatarFallbackProps {
  @Input() size: VariantProps<typeof avatarFallbackVariants>['size'] = 'md';
  @Input() className?: string;
  @Input() ariaLabel?: string;

  protected readonly cn = cn;
  protected readonly avatarFallbackVariants = avatarFallbackVariants;

  // Signal to track image loaded state
  protected readonly imageLoaded;

  constructor(private avatarState: AvatarStateService) {
    // Directly reference the signal from the service
    this.imageLoaded = this.avatarState.imageLoaded;
  }
}

// Export all components
export { avatarVariants, avatarFallbackVariants };
