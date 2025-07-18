import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
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
import {CheckboxComponent} from '@lib/checkbox';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@lib/collapsible';
import {Combobox, ComboboxContent, type ComboboxOption, ComboboxTrigger} from '@lib/combobox';
import {ThemeSwitcher} from '@lib/theme-switcher';
import {ContextMenuComponent} from '@lib/context-menu';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
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
    CheckboxComponent,
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
    Combobox,
    ComboboxTrigger,
    ComboboxContent,
    ThemeSwitcher,
    ContextMenuComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Math for template usage
  Math = Math;

  menuOptions = ['Option 1', 'Option 2', 'Option 3'];

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

  // Checkbox states
  basicCheckbox = signal(false);
  disabledCheckbox = signal(false);

  // Checkbox sizes
  smallCheckbox = signal(false);
  defaultCheckbox = signal(false);
  largeCheckbox = signal(false);
  extraLargeCheckbox = signal(false);

  // Checkbox variants
  defaultVariant = signal(false);
  destructiveVariant = signal(false);
  successVariant = signal(false);
  warningVariant = signal(false);

  // Checkbox states
  uncheckedState = signal(false);
  checkedState = signal(true);
  indeterminateState = signal(true);
  disabledUnchecked = signal(false);
  disabledChecked = signal(true);
  disabledUncheckedSignal = signal(true);
  disabledCheckedSignal = signal(true);

  // Accessibility checkbox
  accessibleCheckbox = signal(false);
  indeterminateCheckbox = signal(false);
  termsAccepted = signal(false);
  notificationsEnabled = signal(true);
  featureA = signal(false);
  featureB = signal(true);
  featureC = signal(false);

  // Combobox states
  selectedOption = signal<string | null>(null);
  selectedLanguage = signal<string | null>(null);

  // Combobox ngModel properties
  selectedOptionValue: string | null = null;
  selectedLanguageValue: string | null = null;

  // ContextMenu states
  showBookmarks = signal(true);
  showUrls = signal(false);
  showPerson = signal(false);
  selectedView = signal('grid');
  contextMenuNotifications = signal(true);
  emailEnabled = signal(false);
  smsEnabled = signal(true);

  // Combobox options
  comboboxOptions: ComboboxOption[] = [
    {value: 'react', label: 'React'},
    {value: 'angular', label: 'Angular'},
    {value: 'vue', label: 'Vue.js'},
    {value: 'svelte', label: 'Svelte'},
    {value: 'nextjs', label: 'Next.js'},
    {value: 'nuxt', label: 'Nuxt.js'},
    {value: 'solid', label: 'SolidJS'},
    {value: 'qwik', label: 'Qwik'},
    {value: 'astro', label: 'Astro'},
    {value: 'remix', label: 'Remix', disabled: true}
  ];

  languageOptions: ComboboxOption[] = [
    {value: 'javascript', label: 'JavaScript'},
    {value: 'typescript', label: 'TypeScript'},
    {value: 'python', label: 'Python'},
    {value: 'java', label: 'Java'},
    {value: 'csharp', label: 'C#'},
    {value: 'cpp', label: 'C++'},
    {value: 'rust', label: 'Rust'},
    {value: 'go', label: 'Go'},
    {value: 'swift', label: 'Swift'},
    {value: 'kotlin', label: 'Kotlin'},
    {value: 'php', label: 'PHP'},
    {value: 'ruby', label: 'Ruby'},
    {value: 'dart', label: 'Dart'},
    {value: 'scala', label: 'Scala'},
    {value: 'haskell', label: 'Haskell', disabled: true}
  ];
  // Enhanced combobox data
  skillOptions: ComboboxOption[] = [
    {value: 'frontend', label: 'Frontend Development', description: 'HTML, CSS, JavaScript, React, Angular'},
    {value: 'backend', label: 'Backend Development', description: 'Node.js, Python, Java, C#'},
    {value: 'mobile', label: 'Mobile Development', description: 'iOS, Android, React Native, Flutter'},
    {value: 'devops', label: 'DevOps', description: 'Docker, Kubernetes, AWS, Azure'},
    {value: 'database', label: 'Database Design', description: 'SQL, NoSQL, MongoDB, PostgreSQL'},
    {value: 'testing', label: 'Testing', description: 'Unit testing, Integration testing, E2E testing'},
    {value: 'security', label: 'Security', description: 'Authentication, Authorization, OWASP'},
    {value: 'ui-ux', label: 'UI/UX Design', description: 'Figma, Adobe XD, Sketch, Prototyping'}
  ];
  groupedTechOptions: ComboboxOption[] = [
    // Frontend
    {value: 'react', label: 'React', group: 'Frontend', description: 'JavaScript library for building user interfaces'},
    {value: 'angular', label: 'Angular', group: 'Frontend', description: 'TypeScript-based web application framework'},
    {value: 'vue', label: 'Vue.js', group: 'Frontend', description: 'Progressive JavaScript framework'},
    {value: 'svelte', label: 'Svelte', group: 'Frontend', description: 'Compile-time framework'},

    // Backend
    {
      value: 'nodejs',
      label: 'Node.js',
      group: 'Backend',
      description: 'JavaScript runtime built on Chrome\'s V8 engine'
    },
    {value: 'python', label: 'Python', group: 'Backend', description: 'High-level programming language'},
    {value: 'java', label: 'Java', group: 'Backend', description: 'Object-oriented programming language'},
    {value: 'csharp', label: 'C#', group: 'Backend', description: 'Microsoft\'s object-oriented programming language'},

    // Database
    {value: 'postgres', label: 'PostgreSQL', group: 'Database', description: 'Open source relational database'},
    {value: 'mongodb', label: 'MongoDB', group: 'Database', description: 'NoSQL document database'},
    {value: 'mysql', label: 'MySQL', group: 'Database', description: 'Open source relational database'},
    {value: 'redis', label: 'Redis', group: 'Database', description: 'In-memory data structure store'},

    // Cloud
    {value: 'aws', label: 'AWS', group: 'Cloud', description: 'Amazon Web Services'},
    {value: 'azure', label: 'Azure', group: 'Cloud', description: 'Microsoft Azure'},
    {value: 'gcp', label: 'Google Cloud', group: 'Cloud', description: 'Google Cloud Platform'}
  ];
  planOptions: ComboboxOption[] = [
    {value: 'free', label: 'Free', description: 'Perfect for personal projects and learning'},
    {value: 'pro', label: 'Pro', description: 'Best for professionals and small teams'},
    {value: 'team', label: 'Team', description: 'Collaboration features for growing teams'},
    {value: 'enterprise', label: 'Enterprise', description: 'Advanced features and priority support'}
  ];
  asyncOptions: ComboboxOption[] = [];
  errorOptions: ComboboxOption[] = [];
  // Enhanced combobox signals
  selectedSkills = signal<string[]>([]);
  selectedTech = signal<string | null>(null);
  selectedAsync = signal<string | null>(null);
  selectedPlan = signal<string | null>(null);
  // Enhanced combobox values for ngModel
  selectedSkillsValue: string[] = [];
  selectedTechValue: string | null = null;
  selectedAsyncValue: string | null = null;
  selectedPlanValue: string | null = null;
  selectedErrorValue: string | null = null;
  // Loading and error states
  isLoading = signal(false);
  errorMessage = signal('');

  // Combobox event handlers
  onFrameworkChange(value: string | string[] | null) {
    const frameworkValue = Array.isArray(value) ? value[0] || null : value;
    this.selectedOption.set(frameworkValue);
    this.selectedOptionValue = frameworkValue;
  }

  onLanguageChange(value: string | string[] | null) {
    const languageValue = Array.isArray(value) ? value[0] || null : value;
    this.selectedLanguage.set(languageValue);
    this.selectedLanguageValue = languageValue;
  }

  // Enhanced combobox event handlers
  onSkillsChange(value: string | string[] | null) {
    const skillsArray = Array.isArray(value) ? value : (value ? [value] : []);
    this.selectedSkills.set(skillsArray);
    this.selectedSkillsValue = skillsArray;
  }

  onTechChange(value: string | string[] | null) {
    const techValue = Array.isArray(value) ? value[0] || null : value;
    this.selectedTech.set(techValue);
    this.selectedTechValue = techValue;
  }

  onAsyncChange(value: string | string[] | null) {
    const asyncValue = Array.isArray(value) ? value[0] || null : value;
    this.selectedAsync.set(asyncValue);
    this.selectedAsyncValue = asyncValue;
  }

  onPlanChange(value: string | string[] | null) {
    const planValue = Array.isArray(value) ? value[0] || null : value;
    this.selectedPlan.set(planValue);
    this.selectedPlanValue = planValue;
  }

  onErrorChange(value: string | string[] | null) {
    const errorValue = Array.isArray(value) ? value[0] || null : value;
    this.selectedErrorValue = errorValue;
    console.log('Error combobox changed:', errorValue);
  }

  // Simulation methods
  simulateLoading() {
    this.isLoading.set(true);
    this.asyncOptions = [];

    // Simulate async data loading
    setTimeout(() => {
      this.asyncOptions = [
        {value: 'async1', label: 'Async Option 1', description: 'Loaded from server'},
        {value: 'async2', label: 'Async Option 2', description: 'Loaded from server'},
        {value: 'async3', label: 'Async Option 3', description: 'Loaded from server'}
      ];
      this.isLoading.set(false);
    }, 2000);
  }

  simulateError() {
    this.errorMessage.set('Failed to load options. Please try again.');
    this.errorOptions = [];

    // Clear error after 3 seconds
    setTimeout(() => {
      this.errorMessage.set('');
      this.errorOptions = [
        {value: 'error1', label: 'Error Option 1'},
        {value: 'error2', label: 'Error Option 2'}
      ];
    }, 3000);
  }

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

  // ContextMenu methods
  onContextMenuAction(action: string) {
    console.log('Context menu action:', action);

    switch (action) {
      case 'copy':
        console.log('Copying...');
        break;
      case 'paste':
        console.log('Pasting...');
        break;
      case 'delete':
        console.log('Deleting...');
        break;
      case 'properties':
        console.log('Opening properties...');
        break;
      case 'refresh':
        console.log('Refreshing...');
        break;
      case 'new-folder':
        console.log('Creating new folder...');
        break;
      case 'new-file':
        console.log('Creating new file...');
        break;
      case 'open':
        console.log('Opening...');
        break;
      case 'rename':
        console.log('Renaming...');
        break;
      case 'duplicate':
        console.log('Duplicating...');
        break;
      case 'share':
        console.log('Sharing...');
        break;
      case 'download':
        console.log('Downloading...');
        break;
      case 'print':
        console.log('Printing...');
        break;
      case 'view-source':
        console.log('View source...');
        break;
      case 'developer-tools':
        console.log('Opening developer tools...');
        break;
      case 'back':
        console.log('Going back...');
        break;
      case 'forward':
        console.log('Going forward...');
        break;
      case 'reload':
        console.log('Reloading...');
        break;
      case 'save':
        console.log('Saving...');
        break;
      case 'zoom-in':
        console.log('Zooming in...');
        break;
      case 'zoom-out':
        console.log('Zooming out...');
        break;
      case 'reset-zoom':
        console.log('Reset zoom...');
        break;
      case 'fullscreen':
        console.log('Toggle fullscreen...');
        break;
      default:
        console.log('Unknown action:', action);
    }
  }

  onViewChange(view: string) {
    this.selectedView.set(view);
    console.log('View changed to:', view);
  }

  onToggleBookmarks() {
    this.showBookmarks.update(value => !value);
    console.log('Bookmarks toggled:', this.showBookmarks());
  }

  onToggleUrls() {
    this.showUrls.update(value => !value);
    console.log('URLs toggled:', this.showUrls());
  }

  onTogglePerson() {
    this.showPerson.update(value => !value);
    console.log('Person toggled:', this.showPerson());
  }

  onToggleNotifications() {
    this.contextMenuNotifications.update(value => !value);
    console.log('Notifications toggled:', this.contextMenuNotifications());
  }

  onToggleEmail() {
    this.emailEnabled.update(value => !value);
    console.log('Email toggled:', this.emailEnabled());
  }

  onToggleSms() {
    this.smsEnabled.update(value => !value);
    console.log('SMS toggled:', this.smsEnabled());
  }
}
