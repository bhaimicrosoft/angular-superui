import { Component, input, Input } from '@angular/core';
import { cn } from '../utils/cn';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-textarea',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <textarea 
      [placeholder]="placeholder"
      [rows]="rows"
      [cols]="cols"
      [class]="textareaClass">
      {{content()}}     
    </textarea>
  `
})
export class Textarea {
  @Input() class = '';
  @Input() placeholder = '';
  @Input() rows = 3;
  @Input() cols?: number;
  content = input.required<string>();

  public get textareaClass(): string {
    return cn(
      'flex min-h-[80px] w-full rounded-md border border-input bg-background px-1 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
      this.class
    );
  }
}
