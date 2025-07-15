import { Component, Input } from '@angular/core';
import { cn } from '../utils/cn';

@Component({
  selector: 'lib-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() class = '';
  @Input() type = 'text';
  @Input() placeholder = '';

  public get inputClass(): string {
    return cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      this.class
    );
  }
}
