import {Component, signal} from '@angular/core';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@lib/accordion';
import {Alert, AlertDescription, AlertIcon, AlertTitle} from '@lib/alert';
import {
  AlertDialogActionComponent,
  AlertDialogCancelComponent,
  AlertDialogComponent,
  AlertDialogDescriptionComponent,
  AlertDialogFooterComponent,
  AlertDialogHeaderComponent,
  AlertDialogTitleComponent
} from '@lib/alert-dialog';
import {AspectRatioComponent} from '@lib/aspect-ratio';
import {Avatar, AvatarFallback, AvatarImage} from '@lib/avatar';
import {Badge} from '@lib/badge';
import {
  BreadcrumbComponent,
  BreadcrumbEllipsisComponent,
  BreadcrumbItemComponent,
  BreadcrumbLinkComponent,
  BreadcrumbListComponent,
  BreadcrumbPageComponent,
  BreadcrumbSeparatorComponent
} from '@lib/breadcrumb';
import {ButtonComponent} from '@lib/button';
import {CalendarComponent, type DateRange, type TimeSelection} from '@lib/calendar';
import {
  CardComponent,
  CardContentComponent,
  CardDescriptionComponent,
  CardFooterComponent,
  CardHeaderComponent,
  CardTitleComponent
} from '@lib/card';
import {Carousel} from '@lib/carousel';

@Component({
  selector: 'app-root',
  imports: [
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    Alert,
    AlertTitle,
    AlertDescription,
    AlertIcon,
    AlertDialogComponent,
    AlertDialogHeaderComponent,
    AlertDialogFooterComponent,
    AlertDialogTitleComponent,
    AlertDialogDescriptionComponent,
    AlertDialogActionComponent,
    AlertDialogCancelComponent,
    AspectRatioComponent,
    Avatar,
    AvatarImage,
    AvatarFallback,
    Badge,
    BreadcrumbComponent,
    BreadcrumbListComponent,
    BreadcrumbItemComponent,
    BreadcrumbLinkComponent,
    BreadcrumbPageComponent,
    BreadcrumbSeparatorComponent,
    BreadcrumbEllipsisComponent,
    ButtonComponent,
    CalendarComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    CardFooterComponent,
    Carousel,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Math for template usage
  Math = Math;

  // AlertDialog state
  isDeleteDialogOpen = signal(false);
  isLogoutDialogOpen = signal(false);
  isConfirmDialogOpen = signal(false);

  // Calendar states - separate for each calendar
  selectedDate = signal<Date | undefined>(new Date());
  calendarMonth = signal(new Date());

  // Range picker state
  selectedRange = signal<DateRange>({start: null, end: null});
  rangeCalendarMonth = signal(new Date());

  // Time picker state
  timePickerDate = signal<Date | undefined>(new Date());
  timePickerMonth = signal(new Date());
  selectedTime = signal<TimeSelection>({hours: 14, minutes: 30});

  // 12-hour time picker state
  time12hDate = signal<Date | undefined>(new Date());
  time12hMonth = signal(new Date());
  selectedTime12h = signal<TimeSelection>({hours: 9, minutes: 0});

  // Constrained calendar state
  constrainedDate = signal<Date | undefined>(undefined);
  constrainedMonth = signal(new Date());

  // Compact calendar state
  compactDate = signal<Date | undefined>(new Date());
  compactMonth = signal(new Date());

  // Demo methods
  openDeleteDialog() {
    this.isDeleteDialogOpen.set(true);
  }

  openLogoutDialog() {
    this.isLogoutDialogOpen.set(true);
  }

  openConfirmDialog() {
    this.isConfirmDialogOpen.set(true);
  }

  handleDelete() {
    console.log('Item deleted!');
    this.isDeleteDialogOpen.set(false);
  }

  handleLogout() {
    console.log('User logged out!');
    this.isLogoutDialogOpen.set(false);
  }

  handleConfirm() {
    console.log('Action confirmed!');
    this.isConfirmDialogOpen.set(false);
  }

  cancelDialog(type: string) {
    console.log(`${type} dialog cancelled`);
    this.isDeleteDialogOpen.set(false);
    this.isLogoutDialogOpen.set(false);
    this.isConfirmDialogOpen.set(false);
  }

  // Breadcrumb demo methods
  onBreadcrumbClick(section: string) {
    console.log(`Navigating to: ${section}`);
  }

  // Calendar demo methods
  onDateSelect(date: Date) {
    this.selectedDate.set(date);
    console.log('Selected date:', date);
  }

  onRangeSelect(range: DateRange) {
    this.selectedRange.set(range);
    console.log('Selected range:', range);
  }

  clearRange() {
    this.selectedRange.set({start: null, end: null});
    console.log('Range cleared');
  }

  onTimeChange(time: TimeSelection) {
    this.selectedTime.set(time);
    console.log('Selected time:', time);
  }

  onTime12hChange(time: TimeSelection) {
    this.selectedTime12h.set(time);
    console.log('Selected 12h time:', time);
  }

  onMonthChange(month: Date) {
    this.calendarMonth.set(month);
    console.log('Month changed:', month);
  }

  onRangeMonthChange(month: Date) {
    this.rangeCalendarMonth.set(month);
    console.log('Range calendar month changed:', month);
  }

  onTimePickerDateSelect(date: Date) {
    this.timePickerDate.set(date);
    console.log('Time picker date selected:', date);
  }

  onTimePickerMonthChange(month: Date) {
    this.timePickerMonth.set(month);
    console.log('Time picker month changed:', month);
  }

  onTime12hDateSelect(date: Date) {
    this.time12hDate.set(date);
    console.log('12h time picker date selected:', date);
  }

  onTime12hMonthChange(month: Date) {
    this.time12hMonth.set(month);
    console.log('12h time picker month changed:', month);
  }

  onConstrainedDateSelect(date: Date) {
    this.constrainedDate.set(date);
    console.log('Constrained date selected:', date);
  }

  onConstrainedMonthChange(month: Date) {
    this.constrainedMonth.set(month);
    console.log('Constrained month changed:', month);
  }

  onCompactDateSelect(date: Date) {
    this.compactDate.set(date);
    console.log('Compact date selected:', date);
  }

  onCompactMonthChange(month: Date) {
    this.compactMonth.set(month);
    console.log('Compact month changed:', month);
  }

  goToToday() {
    const today = new Date();
    this.selectedDate.set(today);
    this.calendarMonth.set(today);
  }

  selectToday() {
    const today = new Date();
    this.selectedDate.set(today);
    this.calendarMonth.set(today);
  }

  clearSelection() {
    this.selectedDate.set(undefined);
    this.selectedRange.set({start: null, end: null});
  }

  getMinDate(): Date {
    return new Date(); // Today as minimum date
  }

  getMaxDate(): Date {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30); // 30 days from today
    return maxDate;
  }
}
