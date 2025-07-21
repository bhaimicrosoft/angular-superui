import {Component, Input, signal, computed, effect, input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'Carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="relative w-full overflow-hidden rounded-lg sm:rounded-xl"
      [class]="containerClasses()"
    >
      <!-- Slides -->
      <div
        class="flex transition-transform duration-500 ease-in-out touch-pan-y"
        [style.transform]="'translateX(-' + current() * 100 + '%)'"
        (touchstart)="onTouchStart($event)"
        (touchmove)="onTouchMove($event)"
        (touchend)="onTouchEnd($event)"
      >
        @for (img of images(); track $index) {
          <img
            [src]="img"
            [alt]="'Slide ' + ($index + 1)"
            class="w-full flex-shrink-0 object-cover select-none"
            [class]="imageClasses()"
            loading="lazy"
          />
        }
      </div>

      <!-- Prev Button -->
      <button
        class="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        [class]="buttonClasses()"
        (click)="prev()"
        [disabled]="images().length <= 1"
        aria-label="Previous Slide"
      >
        <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <!-- Next Button -->
      <button
        class="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        [class]="buttonClasses()"
        (click)="next()"
        [disabled]="images().length <= 1"
        aria-label="Next Slide"
      >
        <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <!-- Pagination Dots -->
      <div class="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 px-2">
        @for (img of images(); track img; let i = $index) {
          <button
            class="rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            [class]="dotClasses(i)"
            (click)="goTo(i)"
            [attr.aria-label]="'Go to slide ' + (i + 1)"
          ></button>
        }
      </div>

      <!-- Loading indicator for first image -->
      @if (isLoading()) {
        <div class="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>      }
    </div>
  `,
})
export class Carousel {
  images = input.required<string[]>();

  @Input() width = 800;
  @Input() height = 300;
  @Input() interval = 4000;
  @Input() aspectRatio: 'auto' | '16:9' | '4:3' | '1:1' | '3:2' = 'auto';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  current = signal(0);
  count = computed(() => this.images().length);
  isLoading = signal(true);

  // Touch handling
  private touchStartX = 0;
  private touchEndX = 0;
  private minSwipeDistance = 50;

  next = () => this.current.set((this.current() + 1) % this.count());
  prev = () => this.current.set((this.current() - 1 + this.count()) % this.count());
  goTo = (i: number) => this.current.set(i);

  // Responsive CSS classes
  containerClasses = computed(() => {
    const base = this.aspectRatio === 'auto'
      ? `h-48 sm:h-64 md:h-80 lg:h-96`
      : this.getAspectRatioClass();

    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-2xl',
      lg: 'max-w-4xl'
    };

    return `${base} ${sizeClasses[this.size]}`;
  });

  imageClasses = computed(() => {
    const aspectClass = this.aspectRatio === 'auto'
      ? 'h-48 sm:h-64 md:h-80 lg:h-96'
      : this.getAspectRatioClass();
    return aspectClass;
  });

  buttonClasses = computed(() => {
    const sizeClasses = {
      sm: 'w-6 h-6 sm:w-8 sm:h-8',
      md: 'w-8 h-8 sm:w-10 sm:h-10',
      lg: 'w-10 h-10 sm:w-12 sm:h-12'
    };
    return sizeClasses[this.size];
  });

  dotClasses = (index: number) => {
    const isActive = this.current() === index;
    const sizeClasses = {
      sm: isActive ? 'w-2 h-2 sm:w-2.5 sm:h-2.5' : 'w-1.5 h-1.5 sm:w-2 sm:h-2',
      md: isActive ? 'w-2.5 h-2.5 sm:w-3 sm:h-3' : 'w-2 h-2 sm:w-2.5 sm:h-2.5',
      lg: isActive ? 'w-3 h-3 sm:w-4 sm:h-4' : 'w-2.5 h-2.5 sm:w-3 sm:h-3'
    };

    const colorClass = isActive ? 'bg-white shadow-lg' : 'bg-white/40 hover:bg-white/60';
    return `${sizeClasses[this.size]} ${colorClass}`;
  };

  private getAspectRatioClass(): string {
    const ratioMap = {
      '16:9': 'aspect-video',
      '4:3': 'aspect-[4/3]',
      '1:1': 'aspect-square',
      '3:2': 'aspect-[3/2]',
      'auto': 'h-48 sm:h-64 md:h-80 lg:h-96'
    };
    return ratioMap[this.aspectRatio];
  }

  // Touch event handlers for mobile swipe
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchMove(event: TouchEvent) {
    // Prevent default scrolling behavior during horizontal swipes
    if (Math.abs(event.changedTouches[0].screenX - this.touchStartX) > 10) {
      event.preventDefault();
    }
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const swipeDistance = this.touchStartX - this.touchEndX;

    if (Math.abs(swipeDistance) > this.minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped left - go to next
        this.next();
      } else {
        // Swiped right - go to previous
        this.prev();
      }
    }
  }

  constructor() {
    effect((onCleanup) => {
      const autoplay = setInterval(() => {
        if (this.count() > 1) this.next();
      }, this.interval);
      onCleanup(() => clearInterval(autoplay));
    });

    // Handle image loading
    effect(() => {
      if (this.images().length > 0) {
        this.isLoading.set(false);
      }
    });
  }
}
