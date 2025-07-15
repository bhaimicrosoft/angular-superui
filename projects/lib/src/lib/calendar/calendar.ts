import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const calendarVariants = cva(
  'p-3',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

@Component({
  selector: 'lib-calendar',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Calendar),
      multi: true
    }
  ],
  template: `
    <div [class]="cn(calendarVariants({ variant }), 'w-full', className)">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <button
          type="button"
          (click)="previousMonth()"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-7 w-7"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        
        <div class="text-sm font-medium">
          {{ getMonthYear() }}
        </div>
        
        <button
          type="button"
          (click)="nextMonth()"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-7 w-7"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      <!-- Days of Week -->
      <div class="grid grid-cols-7 gap-1 mb-2">
        <div 
          *ngFor="let day of daysOfWeek" 
          class="flex h-9 w-9 items-center justify-center text-xs font-medium text-muted-foreground"
        >
          {{ day }}
        </div>
      </div>

      <!-- Calendar Days -->
      <div class="grid grid-cols-7 gap-1">
        <button
          *ngFor="let day of calendarDays"
          type="button"
          (click)="selectDate(day)"
          [disabled]="day.isDisabled"
          [class]="cn(
            'relative flex h-9 w-9 items-center justify-center rounded-md text-sm font-normal transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-50',
            {
              'text-muted-foreground': !day.isCurrentMonth,
              'bg-accent text-accent-foreground': day.isToday && !day.isSelected,
              'bg-primary text-primary-foreground': day.isSelected,
              'font-semibold': day.isToday
            }
          )"
        >
          {{ day.date.getDate() }}
        </button>
      </div>
    </div>
  `,
})
export class Calendar implements ControlValueAccessor {
  @Input() variant: VariantProps<typeof calendarVariants>['variant'] = 'default';
  @Input() className?: string;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() disabledDates?: Date[];
  @Input() selectedDate: Date | null = null;
  @Output() dateSelect = new EventEmitter<Date>();
  currentDate = new Date();
  
  daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  calendarDays: CalendarDay[] = [];

  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  cn = cn;
  calendarVariants = calendarVariants;

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Start from the beginning of the week containing the first day
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());
    
    // End at the end of the week containing the last day
    const endDate = new Date(lastDay);
    endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()));
    
    this.calendarDays = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const currentDateCopy = new Date(date);
      currentDateCopy.setHours(0, 0, 0, 0);
      
      const isCurrentMonth = currentDateCopy.getMonth() === month;
      const isToday = currentDateCopy.getTime() === today.getTime();
      const isSelected = this.selectedDate ? 
        currentDateCopy.getTime() === this.selectedDate.getTime() : false;
      
      let isDisabled = false;
      if (this.minDate && currentDateCopy < this.minDate) {
        isDisabled = true;
      }
      if (this.maxDate && currentDateCopy > this.maxDate) {
        isDisabled = true;
      }
      if (this.disabledDates?.some(d => d.getTime() === currentDateCopy.getTime())) {
        isDisabled = true;
      }
      
      this.calendarDays.push({
        date: new Date(currentDateCopy),
        isCurrentMonth,
        isToday,
        isSelected,
        isDisabled
      });
    }
  }

  getMonthYear(): string {
    return this.currentDate.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  selectDate(day: CalendarDay) {
    if (day.isDisabled) return;
    
    this.selectedDate = day.date;
    this.generateCalendar();
    this.onChange(this.selectedDate);
    this.onTouched();
    this.dateSelect.emit(this.selectedDate);
  }

  // ControlValueAccessor implementation
  writeValue(value: Date | null): void {
    if (value) {
      this.selectedDate = new Date(value);
      this.currentDate = new Date(value);
      this.generateCalendar();
    }
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}

// Date Picker with Popover
@Component({
  selector: 'lib-date-picker',
  standalone: true,
  imports: [CommonModule, Calendar, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePicker),
      multi: true
    }
  ],
  template: `
    <div class="relative">
      <button
        type="button"
        (click)="toggleCalendar()"
        [class]="cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
          'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )"
        [disabled]="disabled"
      >
        <span [class]="selectedDate ? 'text-foreground' : 'text-muted-foreground'">
          {{ selectedDate ? formatDate(selectedDate) : placeholder }}
        </span>
        <svg class="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </button>

      <div 
        *ngIf="isOpen"
        class="absolute top-full left-0 z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
      >
        <lib-calendar
          [minDate]="minDate"
          [maxDate]="maxDate"
          [disabledDates]="disabledDates"
          (dateSelect)="onDateSelect($event)"
          [selectedDate]="selectedDate"
        ></lib-calendar>
      </div>
    </div>

    <!-- Backdrop -->
    <div 
      *ngIf="isOpen"
      class="fixed inset-0 z-40"
      (click)="closeCalendar()"
    ></div>
  `,
})
export class DatePicker implements ControlValueAccessor {
  @Input() placeholder = 'Pick a date';
  @Input() className?: string;
  @Input() disabled = false;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() disabledDates?: Date[];
  @Output() dateChange = new EventEmitter<Date | null>();

  selectedDate: Date | null = null;
  isOpen = false;

  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  cn = cn;

  toggleCalendar() {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.onTouched();
    }
  }

  closeCalendar() {
    this.isOpen = false;
  }

  onDateSelect(date: Date) {
    this.selectedDate = date;
    this.onChange(date);
    this.dateChange.emit(date);
    this.closeCalendar();
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // ControlValueAccessor implementation
  writeValue(value: Date | null): void {
    this.selectedDate = value;
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
