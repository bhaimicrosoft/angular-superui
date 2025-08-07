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
    <div class="w-full">
      <ng-content></ng-content>
    </div>
  `,
})
export class Collapsible {
  service = inject(CollapsibleService);
}

// ✅ Collapsible Trigger: Button that controls the open/close state
@Component({
  standalone: true,
  selector: 'CollapsibleTrigger',
  imports: [CommonModule],
  template: `
    <button
      (click)="service.toggle()"
      class="w-full text-left"
      [attr.aria-expanded]="service.isOpen()"
    >
      <ng-content></ng-content>
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
      class="overflow-hidden"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class CollapsibleContent {
  service = inject(CollapsibleService);
  isOpen = computed(() => this.service.isOpen());
}
