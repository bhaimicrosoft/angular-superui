import { Component, Input } from '@angular/core';
import { cn } from '../utils/cn';

@Component({
  selector: 'Input',
  standalone: true,
  imports: [],
  template: `<input [type]="type" [placeholder]="placeholder" [className]="inputClass" />`,
})
export class InputComponent {
  @Input() class = '';
  @Input() type = 'text';
  @Input() placeholder = '';

  public get inputClass(): string {
    return cn(
      'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      this.class
    );
  }
}
