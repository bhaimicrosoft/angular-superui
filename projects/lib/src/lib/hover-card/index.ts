
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  signal
} from '@angular/core';

@Component({
  selector: 'HoverCardContent',
  standalone: true,
  template: ` <ng-content /> `,
  styles: [
    `
      :host {
        display: block;
        z-index: 50;
        overflow: hidden;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        background-color: #ffffff;
        padding: 1rem;
        width: 20rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        animation: fadeIn 0.2s ease-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: scale(0.98);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoverCardContent {}

@Component({
  selector: 'HoverCard',
  standalone: true,
  template: `
    <div class="relative" (mouseenter)="open()" (mouseleave)="close()">
      <ng-content select="[trigger]" />
      @if (isOpen()) {
        <div class="absolute left-1/2 -translate-x-1/2 top-full mt-2" #content>
          <ng-content />
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoverCard {
  private readonly elementRef = inject(ElementRef);
  readonly isOpen = signal(false);
  private openTimeout: any;
  private closeTimeout: any;

  openDelay = input(100);
  closeDelay = input(200);

  open() {
    clearTimeout(this.closeTimeout);
    this.openTimeout = setTimeout(() => {
      this.isOpen.set(true);
    }, this.openDelay());
  }

  close() {
    clearTimeout(this.openTimeout);
    this.closeTimeout = setTimeout(() => {
      this.isOpen.set(false);
    }, this.closeDelay());
  }
}
