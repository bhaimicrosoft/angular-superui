import { Component, Injectable, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

// ✅ Collapsible Service: Shared state for managing the open/close state
@Injectable()
export class CollapsibleService {
  isOpen = signal(false);

  toggle() {
    this.isOpen.set(!this.isOpen());
  }

  open() {
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }
}

// ✅ Collapsible Root Component: Contains the trigger and content
@Component({
  standalone: true,
  selector: 'Collapsible',
  imports: [CommonModule],
  providers: [CollapsibleService],
  template: `
    <div class="w-full max-w-md mx-auto mt-10">
      <ng-content></ng-content>
    </div>
  `,
})
export class Collapsible {}

// ✅ Collapsible Trigger: Button that controls the open/close state
@Component({
  standalone: true,
  selector: 'CollapsibleTrigger',
  imports: [CommonModule],
  template: `
    <button
      (click)="service.toggle()"
      class="flex items-center justify-between w-full px-4 py-2 text-left text-sm font-medium text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      [attr.aria-expanded]="service.isOpen()"
    >
      <span><ng-content></ng-content></span>
      <svg
        class="w-4 h-4 transform transition-transform duration-300"
        [class.rotate-180]="service.isOpen()"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
  `,
})
export class CollapsibleTrigger {
  service = inject(CollapsibleService);
}

// ✅ Collapsible Content: The hidden or revealed content area
@Component({
  standalone: true,
  selector: 'CollapsibleContent',
  imports: [CommonModule],
  template: `
    <div
      *ngIf="isOpen()"
      class="overflow-hidden mt-2 px-4 py-2 ease-in-out rounded-md border border-gray-200 bg-white {{isOpen() ? 'animate-accordion-up ease-in-out ' : 'animate-accordion-down ease-in-out'}}"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class CollapsibleContent {
  service = inject(CollapsibleService);
  isOpen = computed(() => this.service.isOpen());
}
