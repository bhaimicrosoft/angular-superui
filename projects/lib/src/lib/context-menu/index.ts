import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  Signal,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {CommonModule} from '@angular/common';

// ContextMenu Component (Standalone)
@Component({
  selector: 'ContextMenu', // PascalCase selector without prefix or suffix
  standalone: true, // Marking this component as standalone
  imports: [CommonModule],
  template: `
    <div
      *ngIf="isVisible()"
      [ngStyle]="{
        top: position().y + 'px',
        left: position().x + 'px'
      }"
      class="fixed z-50 bg-white border border-gray-300 rounded-lg shadow-lg w-48 py-2 mt-1"
      role="menu"
      aria-labelledby="context-menu-button"
      (keydown)="onKeydown($event)">
      <ul class="space-y-1" role="none">
        <li
          role="menuitem"
          tabindex="0"
          class="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
          *ngFor="let option of options; let i = index"
          (click)="onOptionSelect(option)">
          {{ option }}
        </li>
      </ul>
    </div>
  `,
  styles: [`
    :host {
      position: relative;
    }
    li.focused {
      background-color: #e0e0e0; /* Highlight focused item */
    }
  `]
})
export class ContextMenuComponent implements AfterViewInit{
  isVisible = signal(false);

  // Store the current position for the context menu
  position= signal({ x: 0, y: 0 });

  // Focus management
  focusedIndex = 0;
  options: string[] = [];

  @ViewChild('contextMenu') contextMenuRef!: ElementRef;

  // Input to receive the dynamic options
  @Input() set menuOptions(options: string[]) {
    this.options = options;
  }

  // Show the menu when right-clicking
  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: MouseEvent): void {
    event.preventDefault();

    // Get the position of the click
    let x = event.clientX;
    let y = event.clientY;

    // Get the viewport width and height
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Approximate context menu dimensions
    const menuWidth = 192; // Adjust according to your design
    const menuHeight = 150; // Adjust according to your design

    // Prevent the context menu from going off the screen on the right
    if (x + menuWidth > viewportWidth) {
      x = viewportWidth - menuWidth - 10; // 10px margin from the right edge
    }

    // Prevent the context menu from going off the screen at the bottom
    if (y + menuHeight > viewportHeight) {
      y = viewportHeight - menuHeight - 10; // 10px margin from the bottom edge
    }

    this.position.set({ x, y });
    this.isVisible.set(true); // Show context menu

    // Set focus to the first item in the menu
    this.focusedIndex = 0;
  }

  // Close the context menu when clicking anywhere else
  @HostListener('document:click')
  onDocumentClick(): void {
    this.isVisible.set(false); // Hide context menu
  }

  // Keyboard navigation for menu items
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      this.focusedIndex = (this.focusedIndex + 1) % this.options.length;
    } else if (event.key === 'ArrowUp') {
      this.focusedIndex = (this.focusedIndex - 1 + this.options.length) % this.options.length;
    } else if (event.key === 'Enter') {
      this.onOptionSelect(this.options[this.focusedIndex]);
    } else if (event.key === 'Escape') {
      this.isVisible.set(false); // Close menu
    }
  }

  // Option selection
  onOptionSelect(option: string): void {
    console.log('Selected:', option);
    this.isVisible.set(false); // Close menu after selection
  }

  // Implementing AfterViewInit to focus the first menu item
  ngAfterViewInit() {
    if (this.isVisible()) {
      this.setFocusOnMenuItem(0);
    }
  }

  // Set focus on the currently focused menu item
  setFocusOnMenuItem(index: number): void {
    const menuItems = this.contextMenuRef.nativeElement.querySelectorAll('li');
    if (menuItems[index]) {
      menuItems[index].focus();
    }
  }
}
