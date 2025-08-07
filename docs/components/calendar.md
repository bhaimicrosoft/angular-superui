# Calendar Component

A fully accessible and customizable calendar component for date selection with navigation, keyboard support, and comprehensive ARIA compliance.

## Features

- ✅ **Full Accessibility** - WCAG 2.1 AA compliant with complete ARIA support
- ⌨️ **Keyboard Navigation** - Arrow keys, Home/End, Enter/Space support
- 🎨 **Customizable** - Multiple sizes, variants, and styling options
- 🚫 **Date Constraints** - Min/max dates, disabled dates, and day-of-week restrictions
- 🌍 **Internationalization** - Locale support for date formatting and weekdays
- 🎯 **Event Handling** - Comprehensive event system with TypeScript safety
- 📱 **Responsive** - Works perfectly on all screen sizes
- 🎪 **Multiple Components** - Header, Grid, and main Calendar components

## Installation

```bash
ngsui add calendar
```

## Basic Usage

### Simple Calendar

```typescript
import { CalendarComponent } from '@components/calendar';

@Component({
  selector: 'app-example',
  imports: [CalendarComponent],
  template: `
    <Calendar
      [selectedDate]="selectedDate"
      (dateSelect)="onDateSelect($event)">
    </Calendar>
  `
})
export class ExampleComponent {
  selectedDate?: Date;

  onDateSelect(date: Date) {
    this.selectedDate = date;
    console.log('Selected:', date);
  }
}
```

### Calendar with Constraints

```typescript
@Component({
  selector: 'app-constrained',
  imports: [CalendarComponent],
  template: `
    <Calendar
      [selectedDate]="selectedDate"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [disabledDaysOfWeek]="[0, 6]"
      (dateSelect)="onDateSelect($event)">
    </Calendar>
  `
})
export class ConstrainedComponent {
  selectedDate?: Date;
  minDate = new Date(); // Today
  maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

  onDateSelect(date: Date) {
    this.selectedDate = date;
  }
}
```

### Small Calendar

```typescript
@Component({
  template: `
    <Calendar
      size="sm"
      [selectedDate]="selectedDate"
      (dateSelect)="onDateSelect($event)">
    </Calendar>
  `
})
export class SmallCalendarComponent {
  selectedDate?: Date;

  onDateSelect(date: Date) {
    this.selectedDate = date;
  }
}
```

### Calendar with Range Selection

The Calendar component supports range selection mode for selecting date ranges using drag functionality.

#### **Drag Selection Method**

1. Press and hold the mouse button on the start date
2. Drag to the end date (you'll see the range highlight as you drag)
3. Release the mouse button to complete the selection

> **Important**: Range selection only works with drag functionality. Simply clicking individual dates will not create a range selection. You must drag from the start date to the end date for the range to appear in the calendar.

```typescript
import { CalendarComponent, type DateRange } from '@components/calendar';

@Component({
  selector: 'app-range-picker',
  imports: [CalendarComponent],
  template: `
    <Calendar
      selectionMode="range"
      [selectedRange]="selectedRange"
      (rangeSelect)="onRangeSelect($event)">
    </Calendar>

    <!-- Range Selection Status -->
    <div class="mt-4 p-3 bg-muted/50 rounded-md border">
      <div class="text-sm font-medium mb-2">Range Selection Status:</div>
      @if (!selectedRange.start && !selectedRange.end) {
        <div class="text-sm text-muted-foreground">
          Drag from start date to end date to select a range
        </div>
      } @else if (selectedRange.start && !selectedRange.end) {
        <div class="text-sm space-y-1">
          <p><span class="font-medium">Start:</span> 
             <span class="text-primary">{{ selectedRange.start?.toLocaleDateString() }}</span>
          </p>
          <p class="text-muted-foreground text-xs">Continue dragging to complete the range</p>
        </div>
      } @else if (selectedRange.start && selectedRange.end) {
        <div class="text-sm space-y-2">
          <div class="flex items-center gap-2">
            <span class="font-medium">Selected Range:</span>
            <span class="text-primary font-medium">
              {{ selectedRange.start?.toLocaleDateString() }} → {{ selectedRange.end?.toLocaleDateString() }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-muted-foreground">Duration:</span>
            <span class="text-primary font-medium">{{ getDurationDays() }} days</span>
          </div>
          <button 
            (click)="clearRange()" 
            class="text-xs px-2 py-1 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-sm">
            Clear Range
          </button>
        </div>
      }
    </div>
  `
})
export class RangePickerComponent {
  selectedRange: DateRange = { start: null, end: null };

  onRangeSelect(range: DateRange) {
    this.selectedRange = range;
    console.log('Selected range:', range);
  }

  clearRange() {
    this.selectedRange = { start: null, end: null };
  }

  getDurationDays(): number {
    if (!this.selectedRange.start || !this.selectedRange.end) return 0;
    const timeDiff = this.selectedRange.end.getTime() - this.selectedRange.start.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
  }
}
```

### Calendar with Time Picker

```typescript
import { CalendarComponent, type TimeSelection } from '@components/calendar';

@Component({
  selector: 'app-time-picker',
  imports: [CalendarComponent],
  template: `
    <Calendar
      [selectedDate]="selectedDate"
      [selectedTime]="selectedTime"
      [showTimePicker]="true"
      [timeFormat]="'24h'"
      (dateSelect)="onDateSelect($event)"
      (timeChange)="onTimeChange($event)">
    </Calendar>

    <div class="mt-4">
      <p><strong>Selected:</strong> {{ getFormattedDateTime() }}</p>
    </div>
  `
})
export class TimePickerComponent {
  selectedDate?: Date;
  selectedTime: TimeSelection = { hours: 14, minutes: 30 };

  onDateSelect(date: Date) {
    this.selectedDate = date;
  }

  onTimeChange(time: TimeSelection) {
    this.selectedTime = time;
  }

  getFormattedDateTime(): string {
    if (!this.selectedDate) return 'No date selected';
    
    const timeString = `${this.selectedTime.hours.toString().padStart(2, '0')}:${this.selectedTime.minutes.toString().padStart(2, '0')}`;
    return `${this.selectedDate.toLocaleDateString()} at ${timeString}`;
  }
}
```

### Compact Calendar

```typescript
@Component({
  template: `
    <Calendar
      variant="compact"
      size="sm"
      [selectedDate]="selectedDate"
      [showOtherMonths]="false"
      (dateSelect)="onDateSelect($event)">
    </Calendar>
  `
})
export class CompactCalendarComponent {
  selectedDate?: Date;

  onDateSelect(date: Date) {
    this.selectedDate = date;
  }
}
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `selectedDate` | `Date \| undefined` | `undefined` | Currently selected date (single mode) |
| `selectedRange` | `DateRange \| undefined` | `undefined` | Currently selected range (range mode) |
| `selectedTime` | `TimeSelection \| undefined` | `undefined` | Selected time when time picker is enabled |
| `selectionMode` | `'single' \| 'range'` | `'single'` | Date selection mode |
| `showTimePicker` | `boolean` | `false` | Whether to show time picker |
| `timeFormat` | `'12h' \| '24h'` | `'24h'` | Time format for time picker |
| `currentMonth` | `Date \| undefined` | `new Date()` | Month currently being displayed |
| `minDate` | `Date \| undefined` | `undefined` | Minimum selectable date |
| `maxDate` | `Date \| undefined` | `undefined` | Maximum selectable date |
| `disabledDates` | `Date[]` | `[]` | Array of specific disabled dates |
| `disabledDaysOfWeek` | `number[]` | `[]` | Array of disabled days (0=Sunday, 6=Saturday) |
| `locale` | `string` | `'en-US'` | Locale for date formatting |
| `firstDayOfWeek` | `number` | `0` | First day of week (0=Sunday, 1=Monday) |
| `showOtherMonths` | `boolean` | `true` | Whether to show days from other months |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Calendar size variant |
| `variant` | `'default' \| 'compact'` | `'default'` | Calendar layout variant |
| `accessibility` | `CalendarAccessibility` | `{}` | Accessibility configuration |

#### Events

| Event | Type | Description |
|-------|------|-------------|
| `dateSelect` | `EventEmitter<Date>` | Emitted when a date is selected (single mode) |
| `rangeSelect` | `EventEmitter<DateRange>` | Emitted when a range is selected or updated (range mode) |
| `timeChange` | `EventEmitter<TimeSelection>` | Emitted when time is changed (time picker mode) |
| `monthChange` | `EventEmitter<Date>` | Emitted when the month changes |
| `calendarEvent` | `EventEmitter<CalendarEvent>` | Emitted for all calendar events |

#### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `selectDate(date: Date)` | `date: Date` | Programmatically select a date |
| `navigateToMonth(date: Date)` | `date: Date` | Navigate to a specific month |
| `today()` | - | Navigate to today and select it |

### CalendarAccessibility Interface

```typescript
interface CalendarAccessibility {
  label?: string;           // Main calendar label
  describedBy?: string;     // ID of description element
  role?: string;           // ARIA role override
  live?: 'polite' | 'assertive' | 'off'; // Live region behavior
}
```

### DateRange Interface

```typescript
interface DateRange {
  start: Date | null;       // Start date of the range
  end: Date | null;         // End date of the range
}
```

### TimeSelection Interface

```typescript
interface TimeSelection {
  hours: number;            // Hours (0-23 for 24h, 1-12 for 12h format)
  minutes: number;          // Minutes (0-59)
}
```

### CalendarEvent Interface

```typescript
interface CalendarEvent {
  type: 'select' | 'navigate' | 'focus' | 'range-start' | 'range-end' | 'range-clear' | 'time-change';
  date: Date;
  originalEvent?: Event;
  time?: TimeSelection;     // Present for time-change events
}
```

## Advanced Examples

### Calendar with Date and Time Selection

```typescript
@Component({
  selector: 'app-datetime-picker',
  imports: [CalendarComponent],
  template: `
    <Calendar
      [selectedDate]="selectedDate"
      [selectedTime]="selectedTime"
      [showTimePicker]="true"
      [timeFormat]="timeFormat"
      (dateSelect)="onDateSelect($event)"
      (timeChange)="onTimeChange($event)">
    </Calendar>

    <div class="mt-4 space-y-2">
      <p><strong>Selected DateTime:</strong> {{ getFormattedDateTime() }}</p>
      <button (click)="toggleTimeFormat()" 
              class="px-3 py-1 bg-primary text-primary-foreground rounded">
        Toggle to {{ timeFormat === '24h' ? '12h' : '24h' }} format
      </button>
    </div>
  `
})
export class DateTimePickerComponent {
  selectedDate?: Date = new Date();
  selectedTime: TimeSelection = { hours: 14, minutes: 30 };
  timeFormat: '12h' | '24h' = '24h';

  onDateSelect(date: Date) {
    this.selectedDate = date;
  }

  onTimeChange(time: TimeSelection) {
    this.selectedTime = time;
  }

  toggleTimeFormat() {
    this.timeFormat = this.timeFormat === '24h' ? '12h' : '24h';
  }

  getFormattedDateTime(): string {
    if (!this.selectedDate) return 'No date selected';
    
    const date = this.selectedDate.toLocaleDateString();
    if (this.timeFormat === '12h') {
      const period = this.selectedTime.hours >= 12 ? 'PM' : 'AM';
      const hours = this.selectedTime.hours % 12 || 12;
      return `${date} at ${hours}:${this.selectedTime.minutes.toString().padStart(2, '0')} ${period}`;
    } else {
      return `${date} at ${this.selectedTime.hours.toString().padStart(2, '0')}:${this.selectedTime.minutes.toString().padStart(2, '0')}`;
    }
  }
}
```

### Calendar with Business Days Only

```typescript
@Component({
  selector: 'app-business-calendar',
  template: `
    <Calendar
      [selectedDate]="selectedDate"
      [minDate]="minDate"
      [disabledDaysOfWeek]="[0, 6]"
      [disabledDates]="holidays"
      [accessibility]="{
        label: 'Business day picker - weekends and holidays disabled'
      }"
      (dateSelect)="onDateSelect($event)">
    </Calendar>

    <div class="mt-4 text-sm text-muted-foreground">
      <p>Only business days are selectable (weekends and holidays are disabled)</p>
    </div>
  `
})
export class BusinessCalendarComponent {
  selectedDate?: Date;
  minDate = new Date(); // No past dates
  
  // Example holidays
  holidays = [
    new Date(2025, 0, 1),   // New Year's Day
    new Date(2025, 6, 4),   // Independence Day
    new Date(2025, 11, 25), // Christmas Day
  ];

  onDateSelect(date: Date) {
    this.selectedDate = date;
  }
}
```

### Calendar with Custom Accessibility

```typescript
@Component({
  template: `
    <Calendar
      [selectedDate]="selectedDate"
      [accessibility]="{
        label: 'Event date picker',
        describedBy: 'calendar-instructions',
        live: 'polite'
      }"
      (dateSelect)="onDateSelect($event)">
    </Calendar>
    <div id="calendar-instructions" class="sr-only">
      Use arrow keys to navigate between dates. 
      Press Enter or Space to select a date.
    </div>
  `
})
export class AccessibleCalendarComponent {
  selectedDate?: Date;

  onDateSelect(date: Date) {
    this.selectedDate = date;
    // Announce selection to screen readers
    console.log(`Selected ${date.toLocaleDateString()}`);
  }
}
```

### Calendar with Disabled Holidays

```typescript
@Component({
  template: `
    <Calendar
      [selectedDate]="selectedDate"
      [disabledDates]="holidays"
      [minDate]="minDate"
      (dateSelect)="onDateSelect($event)">
    </Calendar>
  `
})
export class HolidayCalendarComponent {
  selectedDate?: Date;
  minDate = new Date();
  
  // Example holidays for 2024
  holidays = [
    new Date(2024, 0, 1),   // New Year's Day
    new Date(2024, 6, 4),   // Independence Day
    new Date(2024, 11, 25), // Christmas Day
  ];

  onDateSelect(date: Date) {
    this.selectedDate = date;
  }
}
```

### Calendar with Month Navigation Events

```typescript
@Component({
  template: `
    <div>
      <p>Current Month: {{ currentMonthName }}</p>
      <Calendar
        [selectedDate]="selectedDate"
        [currentMonth]="currentMonth"
        (dateSelect)="onDateSelect($event)"
        (monthChange)="onMonthChange($event)"
        (calendarEvent)="onCalendarEvent($event)">
      </Calendar>
    </div>
  `
})
export class NavigationCalendarComponent {
  selectedDate?: Date;
  currentMonth = new Date();
  currentMonthName = '';

  ngOnInit() {
    this.updateMonthName();
  }

  onDateSelect(date: Date) {
    this.selectedDate = date;
  }

  onMonthChange(month: Date) {
    this.currentMonth = month;
    this.updateMonthName();
  }

  onCalendarEvent(event: CalendarEvent) {
    console.log('Calendar event:', event.type, event.date);
  }

  private updateMonthName() {
    this.currentMonthName = this.currentMonth.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  }
}
```

## Keyboard Navigation

The Calendar component supports full keyboard navigation:

### Single Selection Mode

| Key | Action |
|-----|--------|
| `Arrow Keys` | Navigate between dates |
| `Home` | Go to first day of month |
| `End` | Go to last day of month |
| `Enter` or `Space` | Select the focused date |
| `Tab` | Move focus to next/previous element |

### Range Selection Mode

| Key | Action |
|-----|--------|
| `Arrow Keys` | Navigate between dates |
| `Home` | Go to first day of month |
| `End` | Go to last day of month |
| `Enter` or `Space` | Start range or complete range selection |
| `Escape` | Clear current range selection |
| `Tab` | Move focus to next/previous element |

### Time Picker Mode

| Key | Action |
|-----|--------|
| `Arrow Up/Down` | Increment/decrement hours or minutes |
| `Page Up/Down` | Jump by larger increments |
| `Tab` | Move between hours and minutes fields |

## Accessibility Features

- **ARIA Labels**: Comprehensive labeling for all interactive elements
- **Live Regions**: Screen reader announcements for date selection and navigation
- **Keyboard Navigation**: Full keyboard support following ARIA practices
- **Focus Management**: Proper focus handling and visual indicators
- **Screen Reader Support**: Descriptive announcements and instructions
- **High Contrast**: Works with high contrast mode and themes

## Styling

The Calendar component uses Tailwind CSS classes and can be customized:

```css
/* Custom calendar styles */
.calendar {
  @apply bg-background border border-border rounded-md shadow-sm;
}

.calendar-day {
  @apply h-9 w-9 rounded-md transition-colors;
}

.calendar-day[aria-selected="true"] {
  @apply bg-primary text-primary-foreground;
}

.calendar-day:hover {
  @apply bg-accent text-accent-foreground;
}
```

## Best Practices

1. **Always provide accessibility labels** for screen reader users
2. **Use date constraints** to prevent invalid selections
3. **Handle all events** to provide user feedback
4. **Test keyboard navigation** thoroughly
5. **Consider time zones** when working with dates
6. **Provide clear instructions** for keyboard users
7. **Test with screen readers** to ensure accessibility

## Browser Support

- Modern browsers supporting ES2020+
- Angular 17+
- Full keyboard and screen reader support
- Mobile touch support

## Related Components

- [Button](./button.md) - For calendar actions
- [Input](./input.md) - For date input fields
- [Popover](./popover.md) - For date picker dropdowns
