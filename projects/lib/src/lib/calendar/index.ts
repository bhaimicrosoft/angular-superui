import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy,
  computed,
  signal,
  WritableSignal,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

// Calendar variant configurations
const calendarVariants = cva(
  'calendar p-3 bg-background border border-border rounded-md shadow-sm',
  {
    variants: {
      size: {
        sm: 'text-sm',
        default: 'text-base',
        lg: 'text-lg'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

const monthHeaderVariants = cva(
  'calendar-header flex items-center justify-between mb-4',
  {
    variants: {
      size: {
        sm: 'text-sm',
        default: 'text-base',
        lg: 'text-lg'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

const dayVariants = cva(
  'calendar-day inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer h-9 w-9',
  {
    variants: {
      variant: {
        default: 'hover:bg-accent hover:text-accent-foreground',
        selected: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg ring-2 ring-primary/20 font-semibold',
        'selected-today': 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl ring-2 ring-primary/40 font-bold border-2 border-primary-foreground/20',
        today: 'bg-accent text-accent-foreground font-semibold border border-primary/50',
        outside: 'text-muted-foreground opacity-50',
        disabled: 'text-muted-foreground cursor-not-allowed opacity-50',
        'range-start': 'bg-primary text-primary-foreground hover:bg-primary/90 rounded-r-none font-semibold shadow-lg ring-2 ring-primary/30',
        'range-end': 'bg-primary text-primary-foreground hover:bg-primary/90 rounded-l-none font-semibold shadow-lg ring-2 ring-primary/30',
        'in-range': 'bg-primary/15 text-primary hover:bg-primary/25 rounded-none border-y border-primary/20',
        'range-start-end': 'bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-lg ring-2 ring-primary/30'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

// Date utility functions
const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
};

const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const getFirstDayOfMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};

const addDays = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

const formatDate = (date: Date, locale: string = 'en-US'): string => {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getMonthName = (date: Date, locale: string = 'en-US'): string => {
  return date.toLocaleDateString(locale, { month: 'long' });
};

const getWeekdays = (locale: string = 'en-US'): string[] => {
  const date = new Date();
  const weekdays = [];

  // Get first day of week (Sunday = 0)
  date.setDate(date.getDate() - date.getDay());

  for (let i = 0; i < 7; i++) {
    weekdays.push(date.toLocaleDateString(locale, { weekday: 'short' }));
    date.setDate(date.getDate() + 1);
  }

  return weekdays;
};

// Time utility functions
const formatTime = (hours: number, minutes: number, format: '12h' | '24h' = '24h'): string => {
  if (format === '12h') {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const parseTimeString = (timeString: string, format: '12h' | '24h' = '24h'): TimeSelection => {
  if (format === '12h') {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const adjustedHours = period === 'PM' && hours !== 12 ? hours + 12 : period === 'AM' && hours === 12 ? 0 : hours;
    return { hours: adjustedHours, minutes };
  }
  const [hours, minutes] = timeString.split(':').map(Number);
  return { hours, minutes };
};

const isDateInRange = (date: Date, range: DateRange): boolean => {
  if (!range.start || !range.end) return false;
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const startOnly = new Date(range.start.getFullYear(), range.start.getMonth(), range.start.getDate());
  const endOnly = new Date(range.end.getFullYear(), range.end.getMonth(), range.end.getDate());
  return dateOnly >= startOnly && dateOnly <= endOnly;
};

// Interfaces
export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isInRange?: boolean;
}

export interface CalendarEvent {
  type: 'select' | 'navigate' | 'focus' | 'range-start' | 'range-end' | 'range-clear' | 'time-change';
  date: Date;
  originalEvent?: Event;
  time?: { hours: number; minutes: number };
}

export interface CalendarAccessibility {
  label?: string;
  describedBy?: string;
  role?: string;
  live?: 'polite' | 'assertive' | 'off';
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface TimeSelection {
  hours: number;
  minutes: number;
}

export interface CalendarProps extends VariantProps<typeof calendarVariants> {
  selectedDate?: Date | undefined;
  currentMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  disabledDaysOfWeek?: number[];
  locale?: string;
  firstDayOfWeek?: number;
  showWeekNumbers?: boolean;
  showOtherMonths?: boolean;
  accessibility?: CalendarAccessibility;
  className?: string;
  // New range selection props
  selectionMode?: 'single' | 'range';
  selectedRange?: DateRange;
  // New time selection props
  showTimePicker?: boolean;
  selectedTime?: TimeSelection;
  timeFormat?: '12h' | '24h';
  minuteStep?: number;
}

// Time Picker Component
@Component({
  selector: 'CalendarTimePicker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="calendar-time-picker border-t border-border pt-4 mt-4">
      <div class="flex items-center justify-between mb-3">
        <label class="text-sm font-medium">Select Time</label>
        <button
          type="button"
          class="text-xs text-muted-foreground hover:text-foreground transition-colors"
          (click)="toggleFormat()"
          [attr.aria-label]="'Switch to ' + (timeFormat === '12h' ? '24-hour' : '12-hour') + ' format'">
          {{ timeFormat === '12h' ? '24h' : '12h' }}
        </button>
      </div>

      <div class="flex items-center gap-2">
        <!-- Hours -->
        <div class="flex flex-col items-center">
          <button
            type="button"
            class="calendar-time-button h-8 w-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center text-sm"
            (click)="adjustHours(1)"
            [attr.aria-label]="'Increase hours'">
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
            </svg>
          </button>
          <input
            type="text"
            class="calendar-time-input w-12 h-8 text-center text-sm border border-input rounded-md bg-background"
            [value]="displayHours()"
            (blur)="onHoursChange($event)"
            (keydown)="onTimeInputKeydown($event, 'hours')"
            [attr.aria-label]="'Hours'"
            maxlength="2">
          <button
            type="button"
            class="calendar-time-button h-8 w-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center text-sm"
            (click)="adjustHours(-1)"
            [attr.aria-label]="'Decrease hours'">
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>

        <span class="text-sm font-medium">:</span>

        <!-- Minutes -->
        <div class="flex flex-col items-center">
          <button
            type="button"
            class="calendar-time-button h-8 w-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center text-sm"
            (click)="adjustMinutes(minuteStep)"
            [attr.aria-label]="'Increase minutes'">
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
            </svg>
          </button>
          <input
            type="text"
            class="calendar-time-input w-12 h-8 text-center text-sm border border-input rounded-md bg-background"
            [value]="displayMinutes()"
            (blur)="onMinutesChange($event)"
            (keydown)="onTimeInputKeydown($event, 'minutes')"
            [attr.aria-label]="'Minutes'"
            maxlength="2">
          <button
            type="button"
            class="calendar-time-button h-8 w-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center text-sm"
            (click)="adjustMinutes(-minuteStep)"
            [attr.aria-label]="'Decrease minutes'">
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>

        <!-- AM/PM for 12h format -->
        @if (timeFormat === '12h') {
          <div class="flex flex-col">
            <button
              type="button"
              class="calendar-time-period h-8 px-2 text-xs rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
              (click)="togglePeriod()"
              [attr.aria-label]="'Toggle AM/PM'">
              {{ displayPeriod() }}
            </button>
          </div>
        }
      </div>

      <div class="mt-3 text-center">
        <span class="text-sm text-muted-foreground">
          {{ formatCurrentTime() }}
        </span>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTimePicker implements OnInit, OnChanges {
  @Input() selectedTime: TimeSelection = { hours: 12, minutes: 0 };
  @Input() timeFormat: '12h' | '24h' = '24h';
  @Input() minuteStep: number = 15;

  @Output() timeChange = new EventEmitter<TimeSelection>();
  @Output() timeEvent = new EventEmitter<CalendarEvent>();

  private timeSignal: WritableSignal<TimeSelection> = signal({ hours: 12, minutes: 0 });

  ngOnInit(): void {
    this.timeSignal.set(this.selectedTime);
  }

  ngOnChanges(): void {
    this.timeSignal.set(this.selectedTime);
  }

  protected displayHours = computed(() => {
    const time = this.timeSignal();
    if (this.timeFormat === '12h') {
      const displayHours = time.hours === 0 ? 12 : time.hours > 12 ? time.hours - 12 : time.hours;
      return displayHours.toString().padStart(2, '0');
    }
    return time.hours.toString().padStart(2, '0');
  });

  protected displayMinutes = computed(() => {
    const time = this.timeSignal();
    return time.minutes.toString().padStart(2, '0');
  });

  protected displayPeriod = computed(() => {
    const time = this.timeSignal();
    return time.hours >= 12 ? 'PM' : 'AM';
  });

  protected formatCurrentTime = computed(() => {
    const time = this.timeSignal();
    return formatTime(time.hours, time.minutes, this.timeFormat);
  });

  protected adjustHours(delta: number): void {
    const currentTime = this.timeSignal();
    let newHours = currentTime.hours + delta;

    if (newHours < 0) newHours = 23;
    if (newHours > 23) newHours = 0;

    const newTime = { ...currentTime, hours: newHours };
    this.updateTime(newTime);
  }

  protected adjustMinutes(delta: number): void {
    const currentTime = this.timeSignal();
    let newMinutes = currentTime.minutes + delta;
    let newHours = currentTime.hours;

    if (newMinutes < 0) {
      newMinutes = 60 + newMinutes;
      newHours = newHours === 0 ? 23 : newHours - 1;
    }
    if (newMinutes >= 60) {
      newMinutes = newMinutes - 60;
      newHours = newHours === 23 ? 0 : newHours + 1;
    }

    const newTime = { hours: newHours, minutes: newMinutes };
    this.updateTime(newTime);
  }

  protected togglePeriod(): void {
    const currentTime = this.timeSignal();
    const newHours = currentTime.hours >= 12 ? currentTime.hours - 12 : currentTime.hours + 12;
    const newTime = { ...currentTime, hours: newHours };
    this.updateTime(newTime);
  }

  protected toggleFormat(): void {
    this.timeFormat = this.timeFormat === '12h' ? '24h' : '12h';
  }

  protected onHoursChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    let hours = parseInt(input.value) || 0;

    if (this.timeFormat === '12h') {
      if (hours < 1) hours = 1;
      if (hours > 12) hours = 12;
      const currentTime = this.timeSignal();
      const isPM = currentTime.hours >= 12;
      hours = hours === 12 ? (isPM ? 12 : 0) : (isPM ? hours + 12 : hours);
    } else {
      if (hours < 0) hours = 0;
      if (hours > 23) hours = 23;
    }

    const currentTime = this.timeSignal();
    const newTime = { ...currentTime, hours };
    this.updateTime(newTime);
  }

  protected onMinutesChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    let minutes = parseInt(input.value) || 0;

    if (minutes < 0) minutes = 0;
    if (minutes > 59) minutes = 59;

    const currentTime = this.timeSignal();
    const newTime = { ...currentTime, minutes };
    this.updateTime(newTime);
  }

  protected onTimeInputKeydown(event: KeyboardEvent, type: 'hours' | 'minutes'): void {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (type === 'hours') {
        this.adjustHours(1);
      } else {
        this.adjustMinutes(this.minuteStep);
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (type === 'hours') {
        this.adjustHours(-1);
      } else {
        this.adjustMinutes(-this.minuteStep);
      }
    }
  }

  private updateTime(newTime: TimeSelection): void {
    this.timeSignal.set(newTime);
    this.timeChange.emit(newTime);
    this.timeEvent.emit({
      type: 'time-change',
      date: new Date(),
      time: newTime
    });
  }
}

// Calendar Header Component
@Component({
  selector: 'CalendarHeader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="cn(monthHeaderClass())"
      role="banner"
      [attr.aria-label]="headerLabel()">

      <!-- Previous Month Button -->
      <button
        type="button"
        [class]="cn('calendar-nav-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100')"
        [disabled]="isPrevDisabled()"
        [attr.aria-label]="'Previous month, ' + prevMonthLabel()"
        (click)="onPreviousMonth()"
        (keydown)="onNavigationKeydown($event, 'prev')">
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <!-- Month and Year Display with Dropdowns -->
      <div
        class="calendar-month-year flex items-center space-x-1 relative"
        [attr.aria-live]="accessibility.live || 'polite'">

        <!-- Month Dropdown -->
        <div class="relative">
          <button
            type="button"
            class="calendar-month-button text-sm font-medium hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded-md transition-colors"
            (click)="toggleMonthDropdown()"
            [attr.aria-expanded]="showMonthDropdown()"
            [attr.aria-label]="'Select month, current month is ' + currentMonthName()">
            {{ currentMonthName() }}
            <svg class="inline-block ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          @if (showMonthDropdown()) {
            <div class="absolute top-full left-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 min-w-[120px]">
              <div class="p-1 max-h-48 overflow-y-auto">
                @for (month of monthOptions(); track month.value) {
                  <button
                    type="button"
                    class="w-full text-left px-2 py-1 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    [class.bg-primary]="month.value === currentMonthSignal().getMonth()"
                    [class.text-primary-foreground]="month.value === currentMonthSignal().getMonth()"
                    (click)="selectMonth(month.value)"
                    [attr.aria-label]="'Select ' + month.label">
                    {{ month.label }}
                  </button>
                }
              </div>
            </div>
          }
        </div>

        <!-- Year Dropdown -->
        <div class="relative">
          <button
            type="button"
            class="calendar-year-button text-sm font-medium hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded-md transition-colors"
            (click)="toggleYearDropdown()"
            [attr.aria-expanded]="showYearDropdown()"
            [attr.aria-label]="'Select year, current year is ' + currentYear()">
            {{ currentYear() }}
            <svg class="inline-block ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          @if (showYearDropdown()) {
            <div class="absolute top-full left-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 min-w-[80px]">
              <div class="p-1 max-h-48 overflow-y-auto">
                @for (year of yearOptions(); track year) {
                  <button
                    type="button"
                    class="w-full text-left px-2 py-1 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    [class.bg-primary]="year === currentYear()"
                    [class.text-primary-foreground]="year === currentYear()"
                    (click)="selectYear(year)"
                    [attr.aria-label]="'Select year ' + year">
                    {{ year }}
                  </button>
                }
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Next Month Button -->
      <button
        type="button"
        [class]="cn('calendar-nav-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100')"
        [disabled]="isNextDisabled()"
        [attr.aria-label]="'Next month, ' + nextMonthLabel()"
        (click)="onNextMonth()"
        (keydown)="onNavigationKeydown($event, 'next')">
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarHeader implements OnChanges {
  @Input() currentMonth: Date = new Date();
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() locale: string = 'en-US';
  @Input() size: 'sm' | 'default' | 'lg' = 'default';
  @Input() accessibility: CalendarAccessibility = {};
  @Input() className?: string;

  @Output() monthChange = new EventEmitter<Date>();
  @Output() navigationEvent = new EventEmitter<CalendarEvent>();

  protected cn = cn;

  // Reactive signals for inputs
  protected currentMonthSignal = signal(new Date());
  private minDateSignal = signal<Date | undefined>(undefined);
  private maxDateSignal = signal<Date | undefined>(undefined);
  private localeSignal = signal('en-US');
  private sizeSignal = signal<'sm' | 'default' | 'lg'>('default');

  // Dropdown state signals
  private showMonthDropdownSignal = signal(false);
  private showYearDropdownSignal = signal(false);

  ngOnChanges() {
    // Update signals when inputs change
    this.currentMonthSignal.set(this.currentMonth);
    this.minDateSignal.set(this.minDate);
    this.maxDateSignal.set(this.maxDate);
    this.localeSignal.set(this.locale);
    this.sizeSignal.set(this.size);
  }

  // Computed properties using signals
  protected monthHeaderClass = computed(() =>
    monthHeaderVariants({ size: this.sizeSignal() })
  );

  protected currentMonthName = computed(() =>
    getMonthName(this.currentMonthSignal(), this.localeSignal())
  );

  protected currentYear = computed(() =>
    this.currentMonthSignal().getFullYear()
  );

  protected headerLabel = computed(() =>
    `Calendar navigation, current month is ${this.currentMonthName()} ${this.currentYear()}`
  );

  protected monthLabelId = computed(() =>
    `month-${this.currentMonthSignal().getMonth()}-${this.currentYear()}`
  );

  protected prevMonthLabel = computed(() => {
    const prevMonth = addMonths(this.currentMonthSignal(), -1);
    return `${getMonthName(prevMonth, this.localeSignal())} ${prevMonth.getFullYear()}`;
  });

  protected nextMonthLabel = computed(() => {
    const nextMonth = addMonths(this.currentMonthSignal(), 1);
    return `${getMonthName(nextMonth, this.localeSignal())} ${nextMonth.getFullYear()}`;
  });

  protected showMonthDropdown = computed(() => this.showMonthDropdownSignal());
  protected showYearDropdown = computed(() => this.showYearDropdownSignal());

  protected monthOptions = computed(() => {
    const months = [];
    const currentYear = this.currentYear();

    for (let i = 0; i < 12; i++) {
      const date = new Date(currentYear, i, 1);
      months.push({
        value: i,
        label: getMonthName(date, this.localeSignal())
      });
    }

    return months;
  });

  protected yearOptions = computed(() => {
    const currentYear = this.currentYear();
    const years = [];

    // Show 10 years before and 10 years after current year
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
      years.push(year);
    }

    return years;
  });

  protected isPrevDisabled = computed(() => {
    const minDate = this.minDateSignal();
    if (!minDate) return false;
    const prevMonth = addMonths(this.currentMonthSignal(), -1);
    const lastDayOfPrevMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0);
    const minDateOnly = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    return lastDayOfPrevMonth < minDateOnly;
  });

  protected isNextDisabled = computed(() => {
    const maxDate = this.maxDateSignal();
    if (!maxDate) return false;
    const nextMonth = addMonths(this.currentMonthSignal(), 1);
    const firstDayOfNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1);
    const maxDateOnly = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
    return firstDayOfNextMonth > maxDateOnly;
  });

  protected toggleMonthDropdown(): void {
    this.showMonthDropdownSignal.set(!this.showMonthDropdownSignal());
    this.showYearDropdownSignal.set(false); // Close year dropdown
  }

  protected toggleYearDropdown(): void {
    this.showYearDropdownSignal.set(!this.showYearDropdownSignal());
    this.showMonthDropdownSignal.set(false); // Close month dropdown
  }

  protected selectMonth(monthIndex: number): void {
    const newDate = new Date(this.currentYear(), monthIndex, 1);
    this.showMonthDropdownSignal.set(false);
    this.monthChange.emit(newDate);
    this.navigationEvent.emit({
      type: 'navigate',
      date: newDate
    });
  }

  protected selectYear(year: number): void {
    const currentMonth = this.currentMonthSignal().getMonth();
    const newDate = new Date(year, currentMonth, 1);
    this.showYearDropdownSignal.set(false);
    this.monthChange.emit(newDate);
    this.navigationEvent.emit({
      type: 'navigate',
      date: newDate
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const headerElement = target.closest('CalendarHeader');

    if (!headerElement) {
      this.showMonthDropdownSignal.set(false);
      this.showYearDropdownSignal.set(false);
    }
  }

  protected onPreviousMonth(): void {
    if (this.isPrevDisabled()) return;

    const newMonth = addMonths(this.currentMonthSignal(), -1);
    this.monthChange.emit(newMonth);
    this.navigationEvent.emit({
      type: 'navigate',
      date: newMonth
    });
  }

  protected onNextMonth(): void {
    if (this.isNextDisabled()) return;

    const newMonth = addMonths(this.currentMonthSignal(), 1);
    this.monthChange.emit(newMonth);
    this.navigationEvent.emit({
      type: 'navigate',
      date: newMonth
    });
  }

  protected onNavigationKeydown(event: KeyboardEvent, direction: 'prev' | 'next'): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (direction === 'prev') {
        this.onPreviousMonth();
      } else {
        this.onNextMonth();
      }
    }
  }
}

// Calendar Grid Component
@Component({
  selector: 'CalendarGrid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="calendar-grid"
      role="grid"
      [attr.aria-labelledby]="gridLabelId()"
      [attr.aria-describedby]="accessibility.describedBy">

      <!-- Weekday Headers -->
      <div class="calendar-weekdays grid grid-cols-7 mb-1" role="row">
        <div
          *ngFor="let weekday of weekdays(); let i = index"
          class="calendar-weekday-header flex items-center justify-center p-2 text-xs font-medium text-muted-foreground"
          role="columnheader"
          [attr.aria-label]="weekday + ' column'">
          {{ weekday }}
        </div>
      </div>

      <!-- Calendar Days -->
      <div class="calendar-days grid grid-cols-7 gap-1"
           [class.select-none]="isDragging()"
           [class.cursor-crosshair]="selectionMode === 'range' && isDragging()">
        <div
          *ngFor="let day of calendarDays(); let i = index"
          role="gridcell"
          [attr.tabindex]="getDayTabIndex(day, i)"
          [attr.aria-label]="getDayAriaLabel(day)"
          [attr.aria-selected]="day.isSelected || day.isRangeStart || day.isRangeEnd"
          [attr.aria-disabled]="day.isDisabled"
          [attr.data-date]="formatDateISO(day.date)"
          [class]="getDayClasses(day)"
          (click)="onDayClick(day, $event)"
          (mousedown)="onDayMouseDown(day, $event)"
          (mouseenter)="onDayMouseEnter(day, $event)"
          (mouseup)="onDayMouseUp(day, $event)"
          (keydown)="onDayKeydown(day, $event, i)"
          (focus)="onDayFocus(day, $event)"
          (mouseenter)="onDayHover(day)"
          (mouseleave)="onDayHoverEnd()">
          {{ day.date.getDate() }}
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarGrid implements OnInit, OnChanges {
  @Input() currentMonth: Date = new Date();
  @Input() selectedDate?: Date | undefined;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() disabledDates?: Date[];
  @Input() disabledDaysOfWeek?: number[];
  @Input() locale: string = 'en-US';
  @Input() firstDayOfWeek: number = 0;
  @Input() showOtherMonths: boolean = true;
  @Input() accessibility: CalendarAccessibility = {};
  @Input() className?: string;
  // New range selection inputs
  @Input() selectionMode: 'single' | 'range' = 'single';
  @Input() selectedRange?: DateRange;

  @Output() daySelect = new EventEmitter<CalendarEvent>();
  @Output() dayFocus = new EventEmitter<CalendarEvent>();
  @Output() rangeSelect = new EventEmitter<DateRange>();

  protected cn = cn;

  // Signals for reactive state
  private currentMonthSignal = signal(new Date());
  private selectedDateSignal = signal<Date | undefined>(undefined);
  private selectedRangeSignal = signal<DateRange>({ start: null, end: null });
  private minDateSignal = signal<Date | undefined>(undefined);
  private maxDateSignal = signal<Date | undefined>(undefined);
  private localeSignal = signal('en-US');
  private focusedDateSignal = signal<Date | null>(null);
  private hoverDateSignal = signal<Date | null>(null);

  // Drag selection state
  protected isDragging = signal(false);
  protected dragStartDate = signal<Date | null>(null);

  ngOnInit(): void {
    this.updateSignals();
    // Set initial focused date to selected date or today
    const initialFocus = this.selectedDate || (isToday(this.currentMonth) ? new Date() : null);
    this.focusedDateSignal.set(initialFocus);
  }

  ngOnChanges(): void {
    this.updateSignals();
    if (this.selectedDate) {
      this.focusedDateSignal.set(this.selectedDate);
    }
  }

  private updateSignals(): void {
    this.currentMonthSignal.set(this.currentMonth);

    // Only set selectedDate if we're in single mode
    if (this.selectionMode === 'single') {
      this.selectedDateSignal.set(this.selectedDate);
    } else {
      // Clear selected date in range mode to avoid confusion
      this.selectedDateSignal.set(undefined);
    }

    this.selectedRangeSignal.set(this.selectedRange || { start: null, end: null });
    this.minDateSignal.set(this.minDate);
    this.maxDateSignal.set(this.maxDate);
    this.localeSignal.set(this.locale);
  }

  // Computed properties using signals
  protected weekdays = computed(() =>
    getWeekdays(this.localeSignal())
  );

  protected gridLabelId = computed(() => {
    const month = this.currentMonthSignal();
    return `calendar-grid-${month.getMonth()}-${month.getFullYear()}`;
  });

  protected calendarDays = computed(() => {
    const days: CalendarDay[] = [];
    const currentMonth = this.currentMonthSignal();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);

    // Calculate starting point considering first day of week
    const startDay = (firstDay - this.firstDayOfWeek + 7) % 7;

    // Add previous month days (if showing other months)
    if (this.showOtherMonths && startDay > 0) {
      const prevMonth = addMonths(currentMonth, -1);
      const daysInPrevMonth = getDaysInMonth(prevMonth);

      for (let i = startDay - 1; i >= 0; i--) {
        const date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), daysInPrevMonth - i);
        days.push(this.createCalendarDay(date, false));
      }
    }

    // Add current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push(this.createCalendarDay(date, true));
    }

    // Add next month days to fill grid (if showing other months)
    if (this.showOtherMonths) {
      const totalCells = Math.ceil(days.length / 7) * 7;
      const nextMonth = addMonths(currentMonth, 1);

      for (let day = 1; days.length < totalCells; day++) {
        const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day);
        days.push(this.createCalendarDay(date, false));
      }
    }

    return days;
  });

  private createCalendarDay(date: Date, isCurrentMonth: boolean): CalendarDay {
    // Access the reactive signals
    const currentSelected = this.selectedDateSignal();
    const currentRange = this.selectedRangeSignal();
    const hoverDate = this.hoverDateSignal();

    const isSelected = this.selectionMode === 'single'
      ? (currentSelected ? isSameDay(date, currentSelected) : false)
      : false;

    const isTodayDate = isToday(date);
    const isDisabled = this.isDateDisabled(date);

    // Range selection logic
    let isRangeStart = false;
    let isRangeEnd = false;
    let isInRange = false;

    if (this.selectionMode === 'range' && currentRange.start) {
      isRangeStart = isSameDay(date, currentRange.start);

      if (currentRange.end) {
        isRangeEnd = isSameDay(date, currentRange.end);
        isInRange = isDateInRange(date, currentRange) && !isRangeStart && !isRangeEnd;
      } else if (hoverDate && hoverDate > currentRange.start) {
        // Show preview range while hovering
        const previewRange = { start: currentRange.start, end: hoverDate };
        isInRange = isDateInRange(date, previewRange) && !isRangeStart;
      }
    }

    return {
      date,
      isCurrentMonth,
      isToday: isTodayDate,
      isSelected,
      isDisabled,
      isRangeStart,
      isRangeEnd,
      isInRange
    };
  }

  private isDateDisabled(date: Date): boolean {
    const minDate = this.minDateSignal();
    const maxDate = this.maxDateSignal();

    // Check min/max dates (compare date only, not time)
    if (minDate) {
      const minDateOnly = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
      const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      if (dateOnly < minDateOnly) return true;
    }

    if (maxDate) {
      const maxDateOnly = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
      const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      if (dateOnly > maxDateOnly) return true;
    }

    // Check disabled dates
    if (this.disabledDates?.some(disabledDate => isSameDay(date, disabledDate))) {
      return true;
    }

    // Check disabled days of week
    if (this.disabledDaysOfWeek?.includes(date.getDay())) {
      return true;
    }

    return false;
  }

  protected getDayClasses(day: CalendarDay): string {
    let variant: 'default' | 'selected' | 'selected-today' | 'today' | 'outside' | 'disabled' | 'range-start' | 'range-end' | 'in-range' | 'range-start-end' = 'default';

    if (day.isDisabled) {
      variant = 'disabled';
    } else if (this.selectionMode === 'range') {
      if (day.isRangeStart && day.isRangeEnd) {
        variant = 'range-start-end';
      } else if (day.isRangeStart) {
        variant = 'range-start';
      } else if (day.isRangeEnd) {
        variant = 'range-end';
      } else if (day.isInRange) {
        variant = 'in-range';
      } else if (day.isToday) {
        variant = 'today';
      }
    } else if (day.isSelected && day.isToday) {
      variant = 'selected-today';
    } else if (day.isSelected) {
      variant = 'selected';
    } else if (day.isToday) {
      variant = 'today';
    } else if (!day.isCurrentMonth) {
      variant = 'outside';
    }

    return cn(
      dayVariants({ variant }),
      !day.isCurrentMonth && !this.showOtherMonths && 'invisible',
      this.className
    );
  }

  protected getDayTabIndex(day: CalendarDay, index: number): number {
    // Only one day should be focusable at a time
    const focusedDate = this.focusedDateSignal();
    if (focusedDate && isSameDay(day.date, focusedDate)) {
      return 0;
    }

    // If no focused date, focus first non-disabled day
    if (!focusedDate && !day.isDisabled && index === this.calendarDays().findIndex(d => !d.isDisabled)) {
      return 0;
    }

    return -1;
  }

  protected getDayAriaLabel(day: CalendarDay): string {
    const dateString = formatDate(day.date, this.locale);
    const parts = [dateString];

    if (day.isToday) parts.push('today');
    if (day.isSelected) parts.push('selected');
    if (day.isDisabled) parts.push('unavailable');
    if (!day.isCurrentMonth) parts.push('outside current month');

    return parts.join(', ');
  }

  protected formatDateISO(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  protected onDayClick(day: CalendarDay, event: MouseEvent): void {
    if (day.isDisabled) return;

    // Don't handle click if we were dragging
    if (this.isDragging()) return;

    this.focusedDateSignal.set(day.date);

    if (this.selectionMode === 'single') {
      this.selectedDateSignal.set(day.date);
      this.daySelect.emit({
        type: 'select',
        date: day.date,
        originalEvent: event
      });
    } else if (this.selectionMode === 'range') {
      const currentRange = this.selectedRangeSignal();

      if (!currentRange.start || (currentRange.start && currentRange.end)) {
        // Start new range
        const newRange = { start: day.date, end: null };
        this.selectedRangeSignal.set(newRange);
        this.rangeSelect.emit(newRange);
        this.daySelect.emit({
          type: 'range-start',
          date: day.date,
          originalEvent: event
        });
      } else if (currentRange.start && !currentRange.end) {
        // Complete range
        const start = currentRange.start;
        const end = day.date;

        // Check if clicking the same date as start - this should clear the range instead
        if (isSameDay(start, end)) {
          // Clear range if clicking the same start date
          const emptyRange = { start: null, end: null };
          this.selectedRangeSignal.set(emptyRange);
          this.rangeSelect.emit(emptyRange);
          this.daySelect.emit({
            type: 'range-clear',
            date: day.date,
            originalEvent: event
          });
          return;
        }

        // Order the dates properly
        const orderedRange = start.getTime() <= end.getTime()
          ? { start, end }
          : { start: end, end: start };

        this.selectedRangeSignal.set(orderedRange);
        this.rangeSelect.emit(orderedRange);
        this.daySelect.emit({
          type: 'range-end',
          date: day.date,
          originalEvent: event
        });
      }
    }
  }

  protected onDayHover(day: CalendarDay): void {
    if (day.isDisabled || this.selectionMode !== 'range') return;

    // Don't update hover if we're dragging
    if (this.isDragging()) return;

    const currentRange = this.selectedRangeSignal();
    if (currentRange.start && !currentRange.end) {
      this.hoverDateSignal.set(day.date);
    }
  }

  protected onDayHoverEnd(): void {
    if (this.selectionMode === 'range') {
      this.hoverDateSignal.set(null);
    }
  }

  protected onDayMouseDown(day: CalendarDay, event: MouseEvent): void {
    if (day.isDisabled || this.selectionMode !== 'range') return;

    this.isDragging.set(false); // Will be set to true if mouse moves
    this.dragStartDate.set(day.date);
  }

  protected onDayMouseEnter(day: CalendarDay, event: MouseEvent): void {
    if (day.isDisabled || this.selectionMode !== 'range') return;

    const dragStart = this.dragStartDate();

    // Start dragging if mouse down was pressed and we moved to a different day
    if (dragStart && !this.isDragging() && !isSameDay(dragStart, day.date)) {
      this.isDragging.set(true);

      // Prevent text selection when dragging
      event.preventDefault();

      // Start new range
      const newRange = { start: dragStart, end: null };
      this.selectedRangeSignal.set(newRange);
      this.rangeSelect.emit(newRange);
    }

    // Update range during drag
    if (this.isDragging() && dragStart) {
      const orderedRange = dragStart.getTime() <= day.date.getTime()
        ? { start: dragStart, end: day.date }
        : { start: day.date, end: dragStart };

      this.selectedRangeSignal.set(orderedRange);
      this.rangeSelect.emit(orderedRange);
    } else if (!this.isDragging()) {
      // Regular hover behavior
      this.onDayHover(day);
    }
  }

  protected onDayMouseUp(day: CalendarDay, event: MouseEvent): void {
    if (this.selectionMode !== 'range') return;

    const dragStart = this.dragStartDate();

    if (this.isDragging() && dragStart) {
      // Complete drag selection
      const orderedRange = dragStart.getTime() <= day.date.getTime()
        ? { start: dragStart, end: day.date }
        : { start: day.date, end: dragStart };

      this.selectedRangeSignal.set(orderedRange);
      this.rangeSelect.emit(orderedRange);
    }

    // Clean up
    this.isDragging.set(false);
    this.dragStartDate.set(null);
  }

  @HostListener('document:mouseup', ['$event'])
  onDocumentMouseUp(event: MouseEvent): void {
    // Clean up any drag state when mouse is released outside calendar
    this.isDragging.set(false);
    this.dragStartDate.set(null);
  }

  protected onDayFocus(day: CalendarDay, event: FocusEvent): void {
    if (day.isDisabled) return;

    this.focusedDateSignal.set(day.date);
    this.dayFocus.emit({
      type: 'focus',
      date: day.date,
      originalEvent: event
    });
  }

  protected onDayKeydown(day: CalendarDay, event: KeyboardEvent, index: number): void {
    if (day.isDisabled) return;

    const days = this.calendarDays();
    let newFocusIndex = index;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.onDayClick(day, event as any);
        break;

      case 'ArrowRight':
        event.preventDefault();
        newFocusIndex = this.findNextFocusableDay(index, 1);
        break;

      case 'ArrowLeft':
        event.preventDefault();
        newFocusIndex = this.findNextFocusableDay(index, -1);
        break;

      case 'ArrowDown':
        event.preventDefault();
        newFocusIndex = this.findNextFocusableDay(index, 7);
        break;

      case 'ArrowUp':
        event.preventDefault();
        newFocusIndex = this.findNextFocusableDay(index, -7);
        break;

      case 'Home':
        event.preventDefault();
        newFocusIndex = this.findFirstFocusableDay();
        break;

      case 'End':
        event.preventDefault();
        newFocusIndex = this.findLastFocusableDay();
        break;
    }

    if (newFocusIndex !== index && newFocusIndex >= 0 && newFocusIndex < days.length) {
      const newDay = days[newFocusIndex];
      if (!newDay.isDisabled) {
        this.focusedDateSignal.set(newDay.date);
        // Focus the new element
        setTimeout(() => {
          const element = document.querySelector(`[data-date="${this.formatDateISO(newDay.date)}"]`) as HTMLElement;
          element?.focus();
        });
      }
    }
  }

  private findNextFocusableDay(currentIndex: number, step: number): number {
    const days = this.calendarDays();
    let newIndex = currentIndex + step;

    while (newIndex >= 0 && newIndex < days.length) {
      if (!days[newIndex].isDisabled) {
        return newIndex;
      }
      newIndex += step > 0 ? 1 : -1;
    }

    return currentIndex;
  }

  private findFirstFocusableDay(): number {
    const days = this.calendarDays();
    return days.findIndex(day => !day.isDisabled);
  }

  private findLastFocusableDay(): number {
    const days = this.calendarDays();
    for (let i = days.length - 1; i >= 0; i--) {
      if (!days[i].isDisabled) {
        return i;
      }
    }
    return 0;
  }
}

// Main Calendar Component
@Component({
  selector: 'Calendar',
  standalone: true,
  imports: [CommonModule, CalendarHeader, CalendarGrid, CalendarTimePicker],
  template: `
    <div
      [class]="cn(calendarClass())"
      role="application"
      [attr.aria-label]="accessibility.label || 'Calendar'"
      [attr.aria-describedby]="accessibility.describedBy">

      <CalendarHeader
        [currentMonth]="currentMonthSignal()"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [locale]="locale"
        [size]="size"
        [accessibility]="accessibility"
        (monthChange)="onMonthChange($event)"
        (navigationEvent)="onNavigationEvent($event)">
      </CalendarHeader>

      <CalendarGrid
        [currentMonth]="currentMonthSignal()"
        [selectedDate]="selectedDateSignal()"
        [selectedRange]="selectedRangeSignal()"
        [selectionMode]="selectionMode"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [disabledDates]="disabledDates"
        [disabledDaysOfWeek]="disabledDaysOfWeek"
        [locale]="locale"
        [firstDayOfWeek]="firstDayOfWeek"
        [showOtherMonths]="showOtherMonths"
        [accessibility]="accessibility"
        (daySelect)="onDaySelect($event)"
        (dayFocus)="onDayFocus($event)"
        (rangeSelect)="onRangeSelect($event)">
      </CalendarGrid>

      @if (showTimePicker) {
        <CalendarTimePicker
          [selectedTime]="selectedTimeSignal()"
          [timeFormat]="timeFormat"
          [minuteStep]="minuteStep"
          (timeChange)="onTimeChange($event)"
          (timeEvent)="onTimeEvent($event)">
        </CalendarTimePicker>
      }

      <!-- Range selection display -->
      @if (selectionMode === 'range' && rangeDisplayText()) {
        <div class="mt-3 p-3 bg-muted/50 rounded-md border border-border/50">
          <div class="text-sm font-medium text-foreground mb-1">Selected Range:</div>
          <div class="text-sm text-muted-foreground">{{ rangeDisplayText() }}</div>
        </div>
      }

      <!-- Screen reader live region for announcements -->
      <div
        class="sr-only"
        aria-live="polite"
        aria-atomic="true"
        [attr.id]="accessibility.describedBy">
        {{ screenReaderAnnouncement() }}
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Calendar implements CalendarProps, OnInit, OnChanges {
  @Input() selectedDate?: Date | undefined;
  @Input() currentMonth?: Date;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() disabledDates?: Date[] = [];
  @Input() disabledDaysOfWeek?: number[] = [];
  @Input() locale: string = 'en-US';
  @Input() firstDayOfWeek: number = 0;
  @Input() showWeekNumbers: boolean = false;
  @Input() showOtherMonths: boolean = true;
  @Input() size: 'sm' | 'default' | 'lg' = 'default';
  @Input() accessibility: CalendarAccessibility = {};
  @Input() className?: string;
  // New range selection inputs
  @Input() selectionMode: 'single' | 'range' = 'single';
  @Input() selectedRange?: DateRange;
  // New time selection inputs
  @Input() showTimePicker: boolean = false;
  @Input() selectedTime?: TimeSelection;
  @Input() timeFormat: '12h' | '24h' = '24h';
  @Input() minuteStep: number = 15;

  @Output() dateSelect = new EventEmitter<Date>();
  @Output() monthChange = new EventEmitter<Date>();
  @Output() calendarEvent = new EventEmitter<CalendarEvent>();
  @Output() rangeSelect = new EventEmitter<DateRange>();
  @Output() timeChange = new EventEmitter<TimeSelection>();

  protected cn = cn;

  // Reactive state
  protected selectedDateSignal: WritableSignal<Date | undefined> = signal(undefined);
  protected currentMonthSignal: WritableSignal<Date> = signal(new Date());
  protected selectedRangeSignal: WritableSignal<DateRange> = signal({ start: null, end: null });
  protected selectedTimeSignal: WritableSignal<TimeSelection> = signal({ hours: 12, minutes: 0 });
  private announcementSignal: WritableSignal<string> = signal('');

  ngOnInit(): void {
    // Initialize signals
    this.selectedDateSignal.set(this.selectedDate);
    this.currentMonthSignal.set(this.currentMonth || new Date());
    this.selectedRangeSignal.set(this.selectedRange || { start: null, end: null });
    this.selectedTimeSignal.set(this.selectedTime || { hours: 12, minutes: 0 });

    // Set up accessibility defaults
    if (!this.accessibility.describedBy) {
      this.accessibility.describedBy = `calendar-announcements-${Date.now()}`;
    }
  }

  ngOnChanges(): void {
    // Update signals when inputs change
    this.selectedDateSignal.set(this.selectedDate);
    this.selectedRangeSignal.set(this.selectedRange || { start: null, end: null });
    this.selectedTimeSignal.set(this.selectedTime || { hours: 12, minutes: 0 });
    if (this.currentMonth) {
      this.currentMonthSignal.set(this.currentMonth);
    }
  }

  // Computed properties
  protected calendarClass = computed(() =>
    calendarVariants({ size: this.size })
  );

  protected screenReaderAnnouncement = computed(() =>
    this.announcementSignal()
  );

  protected rangeDisplayText = computed(() => {
    const range = this.selectedRangeSignal();
    if (!range.start) {
      return '';
    }

    if (!range.end) {
      return `Start: ${formatDate(range.start, this.locale)} (Select end date)`;
    }

    const startText = formatDate(range.start, this.locale);
    const endText = formatDate(range.end, this.locale);

    // Calculate number of days
    const timeDiff = range.end.getTime() - range.start.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 to include both start and end days

    return `${startText} → ${endText} (${daysDiff} day${daysDiff !== 1 ? 's' : ''})`;
  });

  protected onMonthChange(newMonth: Date): void {
    this.currentMonthSignal.set(newMonth);
    this.monthChange.emit(newMonth);

    const monthName = getMonthName(newMonth, this.locale);
    this.announcementSignal.set(`Navigated to ${monthName} ${newMonth.getFullYear()}`);
  }

  protected onNavigationEvent(event: CalendarEvent): void {
    this.calendarEvent.emit(event);
  }

  protected onDaySelect(event: CalendarEvent): void {
    // Only handle single date selection in single mode
    if (this.selectionMode === 'single') {
      this.selectedDateSignal.set(event.date);
      this.dateSelect.emit(event.date);

      const dateString = formatDate(event.date, this.locale);
      this.announcementSignal.set(`Selected ${dateString}`);
    }

    // Always emit the calendar event for other listeners
    this.calendarEvent.emit(event);
  }

  protected onDayFocus(event: CalendarEvent): void {
    this.calendarEvent.emit(event);
  }

  protected onRangeSelect(range: DateRange): void {
    this.selectedRangeSignal.set(range);
    this.rangeSelect.emit(range);

    if (!range.start) {
      this.announcementSignal.set('Range selection cleared');
    } else if (!range.end) {
      const startString = formatDate(range.start, this.locale);
      this.announcementSignal.set(`Range start selected: ${startString}. Select an end date.`);
    } else {
      const startString = formatDate(range.start, this.locale);
      const endString = formatDate(range.end, this.locale);
      const timeDiff = range.end.getTime() - range.start.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
      this.announcementSignal.set(`Range selected: ${startString} to ${endString} (${daysDiff} day${daysDiff !== 1 ? 's' : ''})`);
    }
  }

  protected onTimeChange(time: TimeSelection): void {
    this.selectedTimeSignal.set(time);
    this.timeChange.emit(time);

    const timeString = formatTime(time.hours, time.minutes, this.timeFormat);
    this.announcementSignal.set(`Time changed to ${timeString}`);
  }

  protected onTimeEvent(event: CalendarEvent): void {
    this.calendarEvent.emit(event);
  }

  // Public API methods
  public selectDate(date: Date): void {
    if (this.isDateDisabled(date)) return;

    this.selectedDateSignal.set(date);
    this.dateSelect.emit(date);

    const dateString = formatDate(date, this.locale);
    this.announcementSignal.set(`Selected ${dateString}`);
  }

  public navigateToMonth(date: Date): void {
    this.currentMonthSignal.set(date);
    this.monthChange.emit(date);

    const monthName = getMonthName(date, this.locale);
    this.announcementSignal.set(`Navigated to ${monthName} ${date.getFullYear()}`);
  }

  public today(): void {
    const today = new Date();
    this.navigateToMonth(today);
    this.selectDate(today);
  }

  private isDateDisabled(date: Date): boolean {
    // Check min/max dates (compare date only, not time)
    if (this.minDate) {
      const minDateOnly = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate());
      const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      if (dateOnly < minDateOnly) return true;
    }

    if (this.maxDate) {
      const maxDateOnly = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate());
      const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      if (dateOnly > maxDateOnly) return true;
    }

    if (this.disabledDates?.some(disabledDate => isSameDay(date, disabledDate))) return true;
    if (this.disabledDaysOfWeek?.includes(date.getDay())) return true;
    return false;
  }
}

// Export all components and utilities
export {
  calendarVariants,
  monthHeaderVariants,
  dayVariants,
  isToday,
  isSameDay,
  getDaysInMonth,
  getFirstDayOfMonth,
  addMonths,
  addDays,
  formatDate,
  getMonthName,
  getWeekdays,
  formatTime,
  parseTimeString,
  isDateInRange
};
