import {afterNextRender, Component, HostListener, inject, OnInit, signal} from '@angular/core';
import {ThemeService, ThemeSwitcher} from '@lib/theme-switcher';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@lib/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@lib/alert-dialog';
import {Alert, AlertDescription, AlertIcon, AlertTitle} from '@lib/alert';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@lib/card';
import {Button} from '@lib/button';
import {Badge} from '@lib/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@lib/breadcrumb';
import {Calendar} from '@lib/calendar';
import {Avatar, AvatarImage} from '@lib/avatar';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ThemeSwitcher,
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    AlertDialog,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    Button,
    Badge,
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
    AvatarImage,
    Calendar,
    Avatar,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'Angular SuperUI Showcase';
  // AlertDialog states
  isDeleteDialogOpen = signal(false);
  isLogoutDialogOpen = signal(false);
  isConfirmDialogOpen = signal(false);
  // Calendar properties (without signals, using plain properties to match docs)
  selectedDate?: Date;
  selectedRange: { start: Date | null, end: Date | null } = {start: null, end: null};
  constrainedDate?: Date;
  compactDate?: Date;
  // Constraint properties
  minDate = new Date(); // Today
  maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
  // Generate array of weekend dates for the next 3 months
  weekendDates = (() => {
    const dates: Date[] = [];
    const today = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(today.getMonth() + 3);

    const current = new Date(today);
    while (current <= threeMonthsFromNow) {
      const day = current.getDay();
      if (day === 0 || day === 6) { // Sunday = 0, Saturday = 6
        dates.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  })();
  // Go to top button state
  showGoToTop = signal(false);
  // Inject theme service to ensure it's initialized
  private themeService = inject(ThemeService);

  constructor() {
    // Force theme service initialization after render
    afterNextRender(() => {
      // Theme service initialized after render
    });
  }

  // Expose theme service for template
  get currentTheme() {
    return this.themeService.currentTheme();
  }

  get isDarkMode() {
    return this.themeService.isDarkMode();
  }

  ngOnInit() {
    // Listen for theme changes
    window.addEventListener('theme-changed', (event: any) => {
      // Theme change event received
    });

    // Check for pre-initialization data
    const preloadData = (window as any).__THEME_PRELOAD__;
    if (preloadData) {
      // Theme preload data found
    }
  }

  // Listen for scroll events
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // Show button only after scrolling past the hero section (typically full viewport height)
    const heroHeight = window.innerHeight;
    this.showGoToTop.set(scrollTop > heroHeight - 100); // Show when 100px before end of hero
  }

  // Scroll to top method
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Theme change handler
  onThemeChange(theme: any) {
    // Theme changed in component
  }

  // AlertDialog methods
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
    this.isDeleteDialogOpen.set(false);
  }

  handleLogout() {
    this.isLogoutDialogOpen.set(false);
  }

  handleConfirm() {
    this.isConfirmDialogOpen.set(false);
  }

  cancelDialog(type: 'delete' | 'logout' | 'confirm') {
    switch (type) {
      case 'delete':
        this.isDeleteDialogOpen.set(false);
        break;
      case 'logout':
        this.isLogoutDialogOpen.set(false);
        break;
      case 'confirm':
        this.isConfirmDialogOpen.set(false);
        break;
    }
  }

  // Calendar methods
  onDateSelect(date: Date) {
    this.selectedDate = date;
  }

  onRangeSelect(range: { start: Date | null, end: Date | null }) {
    this.selectedRange = range;
  }

  onConstrainedDateSelect(date: Date) {
    this.constrainedDate = date;
  }

  onCompactDateSelect(date: Date) {
    this.compactDate = date;
  }

  selectToday() {
    const today = new Date();
    this.selectedDate = today;
    this.compactDate = today;
  }
}
