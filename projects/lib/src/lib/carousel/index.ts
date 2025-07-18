import {Component, Input, signal, computed, effect, input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'Carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="relative w-full overflow-hidden"
      [style.width.px]="width"
      [style.height.px]="height"
    >
      <!-- Slides -->
      <div
        class="flex transition-transform duration-500 ease-in-out"
        [style.transform]="'translateX(-' + current() * 100 + '%)'"
      >
        @for (img of images(); track $index) {
          <img
            [src]="img"
            [alt]="'Slide ' + ($index + 1)"
            class="w-full flex-shrink-0 object-cover"
            [style.height.px]="height"
          />
        }
      </div>

      <!-- Prev Button -->
      <button
        class="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center"
        (click)="prev()"
        aria-label="Previous Slide"
      >
        ‹
      </button>

      <!-- Next Button -->
      <button
        class="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center"
        (click)="next()"
        aria-label="Next Slide"
      >
        ›
      </button>

      <!-- Pagination Dots -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        @for (img of images(); track img; let i = $index) {
          <Button
            class="w-3 h-3 rounded-full transition-colors duration-300"
            [ngClass]="[current()===i ? 'bg-white' :'bg-white/40']"
            (click)="goTo(i)"
          ></Button>
        }
      </div>
    </div>
  `,
})
export class Carousel {
  images = input.required<string[]>();

  @Input() width = 800;
  @Input() height = 300;
  @Input() interval = 4000;

  current = signal(0);
  count = computed(() => this.images().length);

  next = () => this.current.set((this.current() + 1) % this.count());
  prev = () => this.current.set((this.current() - 1 + this.count()) % this.count());
  goTo = (i: number) => this.current.set(i);

  constructor() {
    effect((onCleanup) => {
      const autoplay = setInterval(() => {
        if (this.count() > 1) this.next();
      }, this.interval);
      onCleanup(() => clearInterval(autoplay));
    });
  }
}
