import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Calendar, type DateRange, type TimeSelection } from '@lib/components/calendar';
import { Button } from '@lib/components/button';

@Component({
  selector: 'app-calendar-demo',
  standalone: true,
  imports: [CommonModule, Calendar, Button],
  templateUrl: './calendar-demo.component.html',
  styles: [`
    .calendar-hero {
      transform: scale(0.9);
    }

    :host ::ng-deep .calendar {
      transition: all 0.3s ease;
    }

    :host ::ng-deep .calendar:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    :host ::ng-deep .calendar-day[data-selected="true"] {
      animation: pulse 0.3s ease-in-out;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `]
})
export class CalendarDemoComponent {
  // Preview calendar state
  previewDate = signal<Date | undefined>(new Date());

  // Basic calendar states
  basicSelectedDate = signal<Date | undefined>(undefined);
  smallSelectedDate = signal<Date | undefined>(undefined);

  // Range selection state
  selectedRange = signal<DateRange>({ start: null, end: null });

  // DateTime picker states
  dateTimeSelectedDate = signal<Date | undefined>(new Date());
  selectedTime24h = signal<TimeSelection>({ hours: 14, minutes: 30 });
  selectedTime12h = signal<TimeSelection>({ hours: 14, minutes: 30 });

  // Constrained calendar state
  constrainedSelectedDate = signal<Date | undefined>(undefined);

  // Advanced calendar states
  largeSelectedDate = signal<Date | undefined>(undefined);
  localizedSelectedDate = signal<Date | undefined>(undefined);

  // Date constraints
  minDate = signal<Date>(new Date());
  maxDate = signal<Date>(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)); // 30 days from now
  disabledDates = signal<Date[]>([
    new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),   // 5 days from now
    new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),  // 12 days from now
    new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),  // 18 days from now
  ]);

  // Preview calendar methods
  onPreviewDateSelect(date: Date): void {
    this.previewDate.set(date);
    this.showToast(`Preview date selected: ${this.formatDate(date)}`);
  }

  // Basic calendar methods
  onBasicDateSelect(date: Date): void {
    this.basicSelectedDate.set(date);
    this.showToast(`Basic calendar: ${this.formatDate(date)}`);
  }

  onSmallDateSelect(date: Date): void {
    this.smallSelectedDate.set(date);
    this.showToast(`Small calendar: ${this.formatDate(date)}`);
  }

  // Range selection methods
  onRangeSelect(range: DateRange): void {
    this.selectedRange.set(range);
    if (range.start && range.end) {
      this.showToast(`Range selected: ${this.formatDate(range.start)} to ${this.formatDate(range.end)}`);
    } else if (range.start) {
      this.showToast(`Range start: ${this.formatDate(range.start)}`);
    }
  }

  clearRange(): void {
    this.selectedRange.set({ start: null, end: null });
    this.showToast('Range cleared');
  }

  getDurationDays(): number {
    const range = this.selectedRange();
    if (!range.start || !range.end) return 0;
    const timeDiff = range.end.getTime() - range.start.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
  }

  // Quick range presets
  setTodayRange(): void {
    const today = new Date();
    this.selectedRange.set({ start: today, end: today });
    this.showToast('Today range selected');
  }

  setWeekRange(): void {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    this.selectedRange.set({ start: startOfWeek, end: endOfWeek });
    this.showToast('This week range selected');
  }

  setMonthRange(): void {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.selectedRange.set({ start: startOfMonth, end: endOfMonth });
    this.showToast('This month range selected');
  }

  setNextWeekRange(): void {
    const today = new Date();
    const startOfNextWeek = new Date(today);
    startOfNextWeek.setDate(today.getDate() + (7 - today.getDay()));
    const endOfNextWeek = new Date(startOfNextWeek);
    endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);
    this.selectedRange.set({ start: startOfNextWeek, end: endOfNextWeek });
    this.showToast('Next week range selected');
  }

  // DateTime picker methods
  onDateTimeSelect(date: Date): void {
    this.dateTimeSelectedDate.set(date);
    this.showToast(`DateTime date: ${this.formatDate(date)}`);
  }

  onTimeChange24h(time: TimeSelection): void {
    this.selectedTime24h.set(time);
    this.showToast(`24h time: ${this.formatTime(time.hours, time.minutes)}`);
  }

  onTimeChange12h(time: TimeSelection): void {
    this.selectedTime12h.set(time);
    this.showToast(`12h time: ${this.formatTime(time.hours, time.minutes, '12h')}`);
  }

  getFormattedDateTime24h(): string {
    const date = this.dateTimeSelectedDate();
    const time = this.selectedTime24h();
    if (!date) return 'No date selected';

    const timeString = this.formatTime(time.hours, time.minutes);
    return `${this.formatDate(date)} at ${timeString}`;
  }

  getFormattedDateTime12h(): string {
    const date = this.dateTimeSelectedDate();
    const time = this.selectedTime12h();
    if (!date) return 'No date selected';

    const timeString = this.formatTime(time.hours, time.minutes, '12h');
    return `${this.formatDate(date)} at ${timeString}`;
  }

  // Constrained calendar methods
  onConstrainedDateSelect(date: Date): void {
    this.constrainedSelectedDate.set(date);
    this.showToast(`Constrained calendar: ${this.formatDate(date)}`);
  }

  // Advanced calendar methods
  onLargeDateSelect(date: Date): void {
    this.largeSelectedDate.set(date);
    this.showToast(`Large calendar: ${this.formatDate(date)}`);
  }

  onLocalizedDateSelect(date: Date): void {
    this.localizedSelectedDate.set(date);
    this.showToast(`Localized calendar: ${this.formatDate(date, 'de-DE')}`);
  }

  // Utility methods
  formatDate(date: Date, locale: string = 'en-US'): string {
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime(hours: number, minutes: number, format: '12h' | '24h' = '24h'): string {
    if (format === '12h') {
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  private showToast(message: string): void {
    // In a real app, you would use a proper toast service
    console.log(`🗓️ ${message}`);

    // Optional: Show browser notification for demo purposes
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Calendar Demo', {
        body: message,
        icon: '/favicon.ico'
      });
    }
  }

  // Demo analytics
  getCalendarStats() {
    return {
      totalSelections: 234,
      rangeSelections: 67,
      timeSelections: 89,
      userSatisfaction: 97
    };
  }

  // Keyboard shortcut demo
  onKeyboardDemo(): void {
    this.showToast('Try using arrow keys, Enter, Space, Page Up/Down for navigation!');
  }
}
