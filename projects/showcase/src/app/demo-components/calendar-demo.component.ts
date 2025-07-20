import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-demo.component.html',
  styles: []
})
export class CalendarDemoComponent {
  selectedDate = signal<Date | null>(null);
  selectedRange = signal<{start: Date | null, end: Date | null}>({ start: null, end: null });
  constrainedDate = signal<Date | null>(null);
  compactDate = signal<Date | null>(null);
  
  minDate = new Date();
  maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

  // Generate calendar days for the current month
  get calendarDays(): (number | null)[] {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days: (number | null)[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    // Fill remaining cells to complete the grid (42 cells = 6 rows × 7 days)
    while (days.length < 42) {
      days.push(null);
    }
    
    return days;
  }

  onDateSelect(date: Date): void {
    this.selectedDate.set(date);
  }

  onRangeSelect(range: {start: Date | null, end: Date | null}): void {
    this.selectedRange.set(range);
  }

  onConstrainedDateSelect(date: Date): void {
    this.constrainedDate.set(date);
  }

  onCompactDateSelect(date: Date): void {
    this.compactDate.set(date);
  }

  selectCompactDate(day: number): void {
    const currentDate = this.compactDate() || new Date();
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    this.compactDate.set(newDate);
  }

  selectToday(): void {
    this.compactDate.set(new Date());
  }
}
