import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../utils/cn';

@Component({
  selector: 'lib-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center space-x-2">
      <button
        type="button"
        role="checkbox"
        [attr.aria-checked]="checked"
        [class]="checkboxClass"
        (click)="toggle()"
        [disabled]="disabled">
        <svg
          *ngIf="checked"
          class="h-4 w-4 text-current"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
      </button>
      <ng-content></ng-content>
    </div>
  `
})
export class Checkbox {
  @Input() class = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  public get checkboxClass(): string {
    return cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      this.checked
        ? 'bg-primary text-primary-foreground'
        : 'bg-background hover:bg-accent hover:text-accent-foreground',
      this.class
    );
  }

  toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
}
