import { Component, Input, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const tooltipVariants = cva(
  'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'border-destructive/50 text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Component({
  selector: 'Tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block" #triggerElement>
      <div 
        (mouseenter)="showTooltip()" 
        (mouseleave)="hideTooltip()"
        (focus)="showTooltip()"
        (blur)="hideTooltip()">
        <ng-content></ng-content>
      </div>
      
      <div
        *ngIf="visible"
        [class]="tooltipClass"
        [style]="tooltipStyles"
        class="absolute pointer-events-none"
        #tooltipElement>
        {{ content }}
      </div>
    </div>
  `
})
export class Tooltip {
  @ViewChild('triggerElement', { static: true }) triggerElement!: ElementRef;
  @ViewChild('tooltipElement', { static: false }) tooltipElement!: ElementRef;

  @Input() content = '';
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() class = '';
  @Input() variant: VariantProps<typeof tooltipVariants>['variant'] = 'default';
  @Input() delayDuration = 0;

  visible = false;
  private timeoutId?: number;

  public get tooltipClass(): string {
    return cn(tooltipVariants({ variant: this.variant }), this.class);
  }

  public get tooltipStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    
    switch (this.placement) {
      case 'top':
        styles['bottom'] = '100%';
        styles['left'] = '50%';
        styles['transform'] = 'translateX(-50%)';
        styles['margin-bottom'] = '8px';
        break;
      case 'bottom':
        styles['top'] = '100%';
        styles['left'] = '50%';
        styles['transform'] = 'translateX(-50%)';
        styles['margin-top'] = '8px';
        break;
      case 'left':
        styles['right'] = '100%';
        styles['top'] = '50%';
        styles['transform'] = 'translateY(-50%)';
        styles['margin-right'] = '8px';
        break;
      case 'right':
        styles['left'] = '100%';
        styles['top'] = '50%';
        styles['transform'] = 'translateY(-50%)';
        styles['margin-left'] = '8px';
        break;
    }
    
    return styles;
  }

  showTooltip() {
    if (this.delayDuration > 0) {
      this.timeoutId = window.setTimeout(() => {
        this.visible = true;
      }, this.delayDuration);
    } else {
      this.visible = true;
    }
  }

  hideTooltip() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
    this.visible = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.triggerElement.nativeElement.contains(event.target)) {
      this.hideTooltip();
    }
  }
}
