import {afterNextRender, Component, HostListener, inject, OnInit, signal, computed, effect,} from '@angular/core';
import {ThemeService, ThemeSwitcher} from '@lib/theme-switcher';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from '@lib/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@lib/alert-dialog';
import {Alert, AlertDescription, AlertIcon, AlertTitle} from '@lib/alert';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from '@lib/card';
import {Button} from '@lib/button';
import {Badge} from '@lib/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@lib/breadcrumb';
import {Calendar} from '@lib/calendar';
import {Carousel} from '@lib/carousel';
import {Checkbox} from '@lib/checkbox';
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from '@lib/collapsible';
import {Combobox, ComboboxContent, ComboboxOption, ComboboxTrigger,} from '@lib/combobox';
import {ContextMenu, IContextMenuItem} from '@lib/context-menu';
import {Avatar, AvatarImage} from '@lib/avatar';
import {DataTable, type DataTableColumn, type DataTableSort, type DataTableFilter, type DataTableColumnReorderEvent} from '@lib/data-table';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: Date;
  department: string;
  salary: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    Carousel,
    Checkbox,
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
    Combobox,
    ComboboxTrigger,
    ComboboxContent,
    ContextMenu,
    Avatar,
    DataTable
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  title = 'Angular SuperUI Showcase';

  // Sample data for the DataTable - 45 comprehensive examples
  users = signal<User[]>([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'active', lastLogin: new Date('2025-01-15'), department: 'IT', salary: 95000 },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Manager', status: 'active', lastLogin: new Date('2025-01-14'), department: 'HR', salary: 85000 },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Developer', status: 'inactive', lastLogin: new Date('2024-12-10'), department: 'IT', salary: 75000 },
    { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com', role: 'Designer', status: 'active', lastLogin: new Date('2025-01-16'), department: 'Marketing', salary: 68000 },
    { id: 5, name: 'Charlie Wilson', email: 'charlie.wilson@example.com', role: 'Developer', status: 'active', lastLogin: new Date('2025-01-13'), department: 'IT', salary: 78000 },
    { id: 6, name: 'Diana Martinez', email: 'diana.martinez@example.com', role: 'Product Manager', status: 'active', lastLogin: new Date('2025-01-17'), department: 'Product', salary: 92000 },
    { id: 7, name: 'Edward Lee', email: 'edward.lee@example.com', role: 'Senior Developer', status: 'active', lastLogin: new Date('2025-01-18'), department: 'IT', salary: 88000 },
    { id: 8, name: 'Fiona Garcia', email: 'fiona.garcia@example.com', role: 'QA Engineer', status: 'active', lastLogin: new Date('2025-01-12'), department: 'QA', salary: 65000 },
    { id: 9, name: 'George Taylor', email: 'george.taylor@example.com', role: 'Sales Rep', status: 'inactive', lastLogin: new Date('2024-11-20'), department: 'Sales', salary: 58000 },
    { id: 10, name: 'Hannah Davis', email: 'hannah.davis@example.com', role: 'Marketing Specialist', status: 'active', lastLogin: new Date('2025-01-11'), department: 'Marketing', salary: 62000 },
    { id: 11, name: 'Ian Rodriguez', email: 'ian.rodriguez@example.com', role: 'DevOps Engineer', status: 'active', lastLogin: new Date('2025-01-19'), department: 'IT', salary: 82000 },
    { id: 12, name: 'Julia Kim', email: 'julia.kim@example.com', role: 'UX Designer', status: 'active', lastLogin: new Date('2025-01-10'), department: 'Design', salary: 72000 },
    { id: 13, name: 'Kevin O\'Brien', email: 'kevin.obrien@example.com', role: 'Data Analyst', status: 'active', lastLogin: new Date('2025-01-09'), department: 'Analytics', salary: 69000 },
    { id: 14, name: 'Laura Thompson', email: 'laura.thompson@example.com', role: 'HR Specialist', status: 'active', lastLogin: new Date('2025-01-08'), department: 'HR', salary: 58000 },
    { id: 15, name: 'Michael White', email: 'michael.white@example.com', role: 'Technical Lead', status: 'active', lastLogin: new Date('2025-01-20'), department: 'IT', salary: 98000 },
    { id: 16, name: 'Nancy Clark', email: 'nancy.clark@example.com', role: 'Business Analyst', status: 'inactive', lastLogin: new Date('2024-10-15'), department: 'Business', salary: 71000 },
    { id: 17, name: 'Oscar Lewis', email: 'oscar.lewis@example.com', role: 'Security Engineer', status: 'active', lastLogin: new Date('2025-01-07'), department: 'Security', salary: 89000 },
    { id: 18, name: 'Patricia Hall', email: 'patricia.hall@example.com', role: 'Content Writer', status: 'active', lastLogin: new Date('2025-01-06'), department: 'Marketing', salary: 55000 },
    { id: 19, name: 'Quincy Young', email: 'quincy.young@example.com', role: 'Mobile Developer', status: 'active', lastLogin: new Date('2025-01-05'), department: 'IT', salary: 79000 },
    { id: 20, name: 'Rachel Green', email: 'rachel.green@example.com', role: 'Project Manager', status: 'active', lastLogin: new Date('2025-01-04'), department: 'Project Management', salary: 87000 },
    { id: 21, name: 'Samuel King', email: 'samuel.king@example.com', role: 'Database Admin', status: 'active', lastLogin: new Date('2025-01-03'), department: 'IT', salary: 84000 },
    { id: 22, name: 'Tiffany Scott', email: 'tiffany.scott@example.com', role: 'Graphic Designer', status: 'inactive', lastLogin: new Date('2024-09-12'), department: 'Design', salary: 59000 },
    { id: 23, name: 'Ulysses Adams', email: 'ulysses.adams@example.com', role: 'Frontend Developer', status: 'active', lastLogin: new Date('2025-01-02'), department: 'IT', salary: 73000 },
    { id: 24, name: 'Victoria Baker', email: 'victoria.baker@example.com', role: 'Scrum Master', status: 'active', lastLogin: new Date('2025-01-01'), department: 'Agile', salary: 81000 },
    { id: 25, name: 'William Nelson', email: 'william.nelson@example.com', role: 'Backend Developer', status: 'active', lastLogin: new Date('2024-12-31'), department: 'IT', salary: 76000 },
    { id: 26, name: 'Ximena Carter', email: 'ximena.carter@example.com', role: 'Social Media Manager', status: 'active', lastLogin: new Date('2024-12-30'), department: 'Marketing', salary: 54000 },
    { id: 27, name: 'Yusuf Mitchell', email: 'yusuf.mitchell@example.com', role: 'Cloud Architect', status: 'active', lastLogin: new Date('2024-12-29'), department: 'IT', salary: 105000 },
    { id: 28, name: 'Zoe Perez', email: 'zoe.perez@example.com', role: 'API Developer', status: 'active', lastLogin: new Date('2024-12-28'), department: 'IT', salary: 77000 },
    { id: 29, name: 'Aaron Roberts', email: 'aaron.roberts@example.com', role: 'Finance Analyst', status: 'inactive', lastLogin: new Date('2024-08-15'), department: 'Finance', salary: 67000 },
    { id: 30, name: 'Bethany Turner', email: 'bethany.turner@example.com', role: 'Legal Counsel', status: 'active', lastLogin: new Date('2024-12-27'), department: 'Legal', salary: 110000 },
    { id: 31, name: 'Christopher Phillips', email: 'christopher.phillips@example.com', role: 'Operations Manager', status: 'active', lastLogin: new Date('2024-12-26'), department: 'Operations', salary: 83000 },
    { id: 32, name: 'Deborah Campbell', email: 'deborah.campbell@example.com', role: 'Training Specialist', status: 'active', lastLogin: new Date('2024-12-25'), department: 'HR', salary: 61000 },
    { id: 33, name: 'Ethan Parker', email: 'ethan.parker@example.com', role: 'Machine Learning Engineer', status: 'active', lastLogin: new Date('2024-12-24'), department: 'AI', salary: 95000 },
    { id: 34, name: 'Faith Evans', email: 'faith.evans@example.com', role: 'Customer Success Manager', status: 'active', lastLogin: new Date('2024-12-23'), department: 'Customer Success', salary: 70000 },
    { id: 35, name: 'Gabriel Edwards', email: 'gabriel.edwards@example.com', role: 'Site Reliability Engineer', status: 'active', lastLogin: new Date('2024-12-22'), department: 'IT', salary: 91000 },
    { id: 36, name: 'Helen Collins', email: 'helen.collins@example.com', role: 'Talent Acquisition', status: 'inactive', lastLogin: new Date('2024-07-10'), department: 'HR', salary: 64000 },
    { id: 37, name: 'Ivan Stewart', email: 'ivan.stewart@example.com', role: 'Full Stack Developer', status: 'active', lastLogin: new Date('2024-12-21'), department: 'IT', salary: 80000 },
    { id: 38, name: 'Jasmine Sanchez', email: 'jasmine.sanchez@example.com', role: 'Product Designer', status: 'active', lastLogin: new Date('2024-12-20'), department: 'Design', salary: 74000 },
    { id: 39, name: 'Kyle Morris', email: 'kyle.morris@example.com', role: 'Sales Manager', status: 'active', lastLogin: new Date('2024-12-19'), department: 'Sales', salary: 86000 },
    { id: 40, name: 'Linda Rogers', email: 'linda.rogers@example.com', role: 'Compliance Officer', status: 'active', lastLogin: new Date('2024-12-18'), department: 'Compliance', salary: 78000 },
    { id: 41, name: 'Marcus Reed', email: 'marcus.reed@example.com', role: 'Research Scientist', status: 'active', lastLogin: new Date('2024-12-17'), department: 'R&D', salary: 93000 },
    { id: 42, name: 'Nina Cook', email: 'nina.cook@example.com', role: 'Event Coordinator', status: 'inactive', lastLogin: new Date('2024-06-20'), department: 'Events', salary: 52000 },
    { id: 43, name: 'Owen Bailey', email: 'owen.bailey@example.com', role: 'Infrastructure Engineer', status: 'active', lastLogin: new Date('2024-12-16'), department: 'IT', salary: 85000 },
    { id: 44, name: 'Penelope Rivera', email: 'penelope.rivera@example.com', role: 'Brand Manager', status: 'active', lastLogin: new Date('2024-12-15'), department: 'Marketing', salary: 75000 },
    { id: 45, name: 'Quentin Cooper', email: 'quentin.cooper@example.com', role: 'Quality Assurance Lead', status: 'active', lastLogin: new Date('2024-12-14'), department: 'QA', salary: 79000 }
  ]);

  // Column configuration for the DataTable
  // This configuration demonstrates ALL THREE TIERS of features:
  // 🏗️ CORE: sortable, filterable, searchable, editable, width, type
  // 🚀 ADVANCED: reorderable, resizable, groupable, multiSelectFilter
  // 💎 PREMIUM: pinned, cellRenderer, custom templates
  columns = signal<DataTableColumn<User>[]>([
    {
      key: 'id',
      label: 'ID',
      sortable: true,        // 🏗️ Core: Basic sorting
      filterable: true,      // 🏗️ Core: Basic filtering  
      width: '80px',         // 🏗️ Core: Column width
      type: 'number',        // 🏗️ Core: Data type
      reorderable: true,     // 🚀 Advanced: Drag & drop reordering
      resizable: true,       // 🚀 Advanced: Column resizing
      pinned: 'left'         // 💎 Premium: Column pinning
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,        // 🏗️ Core: Basic sorting
      filterable: true,      // 🏗️ Core: Basic filtering
      searchable: true,      // 🏗️ Core: Global search inclusion
      editable: true,        // 🏗️ Core: Inline editing
      minWidth: '150px',     // 🏗️ Core: Min width constraint
      reorderable: true,     // 🚀 Advanced: Drag & drop reordering
      resizable: true,       // 🚀 Advanced: Column resizing
      groupable: true        // 💎 Premium: Row grouping capability
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,        // 🏗️ Core: Basic sorting
      filterable: true,      // 🏗️ Core: Basic filtering
      searchable: true,      // 🏗️ Core: Global search inclusion
      editable: true,        // 🏗️ Core: Inline editing
      type: 'email',         // 🏗️ Core: Email data type
      minWidth: '200px',     // 🏗️ Core: Min width constraint
      reorderable: true,     // 🚀 Advanced: Drag & drop reordering
      resizable: true        // 🚀 Advanced: Column resizing
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,        // 🏗️ Core: Basic sorting
      filterable: true,      // 🏗️ Core: Basic filtering
      editable: true,        // 🏗️ Core: Inline editing
      width: '120px',        // 🏗️ Core: Fixed width
      reorderable: true,     // 🚀 Advanced: Drag & drop reordering
      resizable: true,       // 🚀 Advanced: Column resizing
      groupable: true,       // 💎 Premium: Row grouping capability
      multiSelectFilter: true, // 🚀 Advanced: Multi-select dropdown filter
      filterOptions: ['Admin', 'Manager', 'Developer', 'Designer', 'Product Manager', 'Senior Developer', 'QA Engineer', 'Sales Rep', 'Marketing Specialist'] // 🚀 Advanced: Predefined filter options
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,        // 🏗️ Core: Basic sorting
      filterable: true,      // 🏗️ Core: Basic filtering
      editable: true,        // 🏗️ Core: Inline editing
      width: '100px',        // 🏗️ Core: Fixed width
      reorderable: true,     // 🚀 Advanced: Drag & drop reordering
      resizable: true,       // 🚀 Advanced: Column resizing
      type: 'boolean',       // 🏗️ Core: Boolean data type
      groupable: true,       // 💎 Premium: Row grouping capability
      multiSelectFilter: true, // 🚀 Advanced: Multi-select dropdown filter
      cellRenderer: (value: any) => value === 'active' ? '🟢 Active' : '🔴 Inactive' // 💎 Premium: Custom cell rendering
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      sortable: true,        // 🏗️ Core: Basic sorting
      filterable: true,      // 🏗️ Core: Basic filtering
      type: 'date',          // 🏗️ Core: Date data type
      width: '140px',        // 🏗️ Core: Fixed width
      reorderable: true,     // 🚀 Advanced: Drag & drop reordering
      resizable: true,       // 🚀 Advanced: Column resizing
      formatter: (value: Date) => new Date(value).toLocaleDateString() // 🏗️ Core: Data formatting
    },
    {
      key: 'department',
      label: 'Department',
      sortable: true,        // 🏗️ Core: Basic sorting
      filterable: true,      // 🏗️ Core: Basic filtering
      width: '120px',        // 🏗️ Core: Fixed width
      reorderable: true,     // 🚀 Advanced: Drag & drop reordering
      resizable: true,       // 🚀 Advanced: Column resizing
      groupable: true,       // 💎 Premium: Row grouping capability
      multiSelectFilter: true // 🚀 Advanced: Multi-select dropdown filter
    },
    {
      key: 'salary',
      label: 'Salary',
      sortable: true,        // 🏗️ Core: Basic sorting
      filterable: true,      // 🏗️ Core: Basic filtering
      type: 'number',        // 🏗️ Core: Number data type
      width: '120px',        // 🏗️ Core: Fixed width
      reorderable: true,     // 🚀 Advanced: Drag & drop reordering
      resizable: true,       // 🚀 Advanced: Column resizing
      pinned: 'right',       // 💎 Premium: Column pinning (right side)
      cellRenderer: (value: number) => `$${value.toLocaleString()}` // 💎 Premium: Custom cell rendering
    }
  ]);

  // Internal base page size signal for manual updates
  private _basePageSize = signal<number>(3);
  
  // Pagination configuration signals
  customPageSizeOptions = signal<number[]>([3, 7, 15, 25, 50]);
  showFirstLastButtons = signal<boolean>(true);
  showPageInfoText = signal<boolean>(true);
  showPageSizePicker = signal<boolean>(true);
  
  // Reactive page size that automatically updates when options change
  customPageSize = computed(() => {
    const options = this.customPageSizeOptions();
    const currentSize = this._basePageSize();
    
    // Always ensure we have a valid page size from the available options
    if (options.length > 0) {
      // If current size is valid in new options, keep it
      if (options.includes(currentSize)) {
        return currentSize;
      }
      // Otherwise, use the first option and update the base
      const firstOption = options[0];
      // Use setTimeout to avoid circular updates
      setTimeout(() => this._basePageSize.set(firstOption), 0);
      return firstOption;
    }
    
    return 5; // fallback
  });

  // AlertDialog states
  isDeleteDialogOpen = signal(false);
  isLogoutDialogOpen = signal(false);
  isConfirmDialogOpen = signal(false);
  // Calendar properties (without signals, using plain properties to match docs)
  selectedDate?: Date;
  selectedRange: { start: Date | null; end: Date | null } = {
    start: null,
    end: null,
  };
  constrainedDate?: Date;
  menuItems: IContextMenuItem[] = [
    {
      label: 'Edit',
      action: (item) => console.log('Edit clicked', item.label),
      shortcut: '⌘E',
    },
    {
      label: 'Duplicate',
      action: (item) => console.log('Duplicate clicked', item.label),
    },
    {
      label: 'Archive',
      action: (item) => console.log('Archive clicked', item.label),
      disabled: true,
    },
    {
      label: 'Delete',
      action: (item) => console.log('Delete clicked', item.label),
      shortcut: '⌫',
    },
  ];
  menuItems2: IContextMenuItem[] = [
    {
      label: 'New',
      action: (item) => console.log('Edit clicked', item.label),
      shortcut: '⌘E',
    },
    {
      label: 'Open',
      action: (item) => console.log('Duplicate clicked', item.label),
    },
    {
      label: "",
      separator: true
    },
    {
      label: 'Delete',
      action: (item) => console.log('Archive clicked', item.label),
      disabled: true,
    },
    {
      label: 'Delete',
      action: (item) => console.log('Delete clicked', item.label),
      shortcut: '⌫',
    },
  ];
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
      if (day === 0 || day === 6) {
        // Sunday = 0, Saturday = 6
        dates.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  })();

  // Carousel properties
  carouselImages = [
    'https://via.assets.so/game.png?id=1&q=95&w=800&h=300&fit=fill',
    'https://via.assets.so/game.png?id=2&q=95&w=800&h=300&fit=fill',
    'https://via.assets.so/game.png?id=3&q=95&w=800&h=300&fit=fill',
    'https://via.assets.so/game.png?id=4&q=95&w=800&h=300&fit=fill',
  ];

  compactCarouselImages = [
    'https://via.assets.so/img.png?id=5&q=95&w=600&h=200&fit=fill',
    'https://via.assets.so/img.png?id=6&q=95&w=600&h=200&fit=fill',
    'https://via.assets.so/img.png?id=7&q=95&w=600&h=200&fit=fill',
  ];

  // Checkbox properties
  basicCheckbox = false;
  termsCheckbox = false;
  newsletterCheckbox = false;
  // Size examples
  smallCheckbox = false;
  defaultCheckbox = true;
  largeCheckbox = false;
  extraLargeCheckbox = false;
  // Variant examples
  defaultVariant = true;
  destructiveVariant = false;
  successVariant = true;
  warningVariant = false;
  // State examples
  uncheckedState = false;
  checkedState = true;
  disabledUnchecked = false;
  disabledChecked = true;

  // Collapsible properties
  // Using separate variables for different collapsible instances
  // (The Collapsible component manages its own state internally)

  // Combobox properties
  frameworkOptions: ComboboxOption[] = [
    {value: 'react', label: 'React'},
    {value: 'angular', label: 'Angular'},
    {value: 'vue', label: 'Vue.js'},
    {value: 'svelte', label: 'Svelte'},
    {value: 'nextjs', label: 'Next.js'},
    {value: 'nuxt', label: 'Nuxt.js'},
    {value: 'solid', label: 'SolidJS'},
    {value: 'remix', label: 'Remix', disabled: true},
  ];

  languageOptions: ComboboxOption[] = [
    {value: 'javascript', label: 'JavaScript'},
    {value: 'typescript', label: 'TypeScript'},
    {value: 'python', label: 'Python'},
    {value: 'java', label: 'Java'},
    {value: 'csharp', label: 'C#'},
    {value: 'go', label: 'Go'},
    {value: 'rust', label: 'Rust'},
    {value: 'kotlin', label: 'Kotlin'},
  ];

  selectedFramework: string | null = null;
  selectedLanguage: string | null = null;

  // Context Menu properties
  basicMenuOptions = ['Copy', 'Paste', 'Cut', 'Delete'];
  advancedMenuOptions = [
    'New File',
    'New Folder',
    'Open',
    'Rename',
    'Delete',
    'Properties',
  ];

  // Go to top button state
  showGoToTop = signal(false);
  // Inject theme service to ensure it's initialized
  private themeService = inject(ThemeService);


  constructor() {
    // Force theme service initialization after render
    afterNextRender(() => {
      // Theme service initialized after render
    });

    // Reactive effect to automatically update page size when options change
    effect(() => {
      const options = this.customPageSizeOptions();
      const currentSize = this._basePageSize();
      
      // If current page size is not in the new options, automatically select the first option
      if (options.length > 0 && !options.includes(currentSize)) {
        // Use a slight delay to prevent circular updates
        queueMicrotask(() => {
          this._basePageSize.set(options[0]);
        });
      }
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
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    // Show button only after scrolling past the hero section (typically full viewport height)
    const heroHeight = window.innerHeight;
    this.showGoToTop.set(scrollTop > heroHeight - 100); // Show when 100px before end of hero
  }

  // Scroll to top method
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
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

  onRangeSelect(range: { start: Date | null; end: Date | null }) {
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

  // Combobox methods
  onFrameworkChange(value: string | string[] | null) {
    const frameworkValue = Array.isArray(value) ? value[0] || null : value;
    this.selectedFramework = frameworkValue;
  }

  onLanguageChange(value: string | string[] | null) {
    const languageValue = Array.isArray(value) ? value[0] || null : value;
    this.selectedLanguage = languageValue;
  }

  // Context Menu methods
  onMenuAction(action: string) {
    console.log('Context menu action:', action);
    // You can implement specific actions here
    switch (action) {
      case 'copy':
        console.log('Copy action');
        break;
      case 'paste':
        console.log('Paste action');
        break;
      case 'delete':
        console.log('Delete action');
        break;
      case 'back':
        console.log('Navigate back');
        break;
      case 'forward':
        console.log('Navigate forward');
        break;
      case 'reload':
        console.log('Reload page');
        break;
      case 'bookmark':
        console.log('Add to bookmarks');
        break;
      case 'bookmarks':
        console.log('Show all bookmarks');
        break;
      case 'inspect':
        console.log('Inspect element');
        break;
      default:
        console.log('Unknown action:', action);
    }
  }

  // DataTable event handlers
  onColumnReorder(event: DataTableColumnReorderEvent) {
    console.log('Column reordered:', event);
    // Update the columns order
    const newColumns = [...this.columns()];
    const [reorderedItem] = newColumns.splice(event.fromIndex, 1);
    newColumns.splice(event.toIndex, 0, reorderedItem);
    this.columns.set(newColumns);
  }

  onDataTableSort(event: any) {
    console.log('DataTable sort changed:', event);
  }

  onDataTableFilter(event: any) {
    console.log('DataTable filters changed:', event);
  }

  onDataTableSearch(event: string) {
    console.log('DataTable search:', event);
  }

  onDataTablePageChange(event: number) {
    console.log('DataTable page changed:', event);
  }

  onDataTableSelectionChange(event: any) {
    console.log('DataTable selection changed:', event);
  }

  onDataTableRowClick(event: any) {
    console.log('DataTable row clicked:', event);
  }

  onDataTableCellEdit(event: any) {
    console.log('DataTable cell edited:', event);
  }

  onDataTableRowDelete(event: any) {
    console.log('DataTable row deleted:', event);
  }

  onDataTableRefresh() {
    console.log('DataTable refresh requested');
    // Here you would typically reload the data
  }

  onDataTableExport(event: any) {
    console.log('DataTable export requested:', event);
    // Here you would implement the actual export functionality
  }

  // Additional DataTable event handlers
  onCellEdit(event: { row: User; column: string; oldValue: any; newValue: any }) {
    console.log('Cell edited:', event);
    // Update the data
    const updatedUsers = this.users().map(user => 
      user.id === event.row.id 
        ? { ...user, [event.column]: event.newValue }
        : user
    );
    this.users.set(updatedUsers);
  }

  onRowEdit(event: { row: User; index: number }) {
    console.log('Row edited:', event);
  }

  onSelectionChange(event: User[]) {
    console.log('Selection changed:', event);
  }

  onSortChange(event: DataTableSort) {
    console.log('Sort changed:', event);
  }

  onFilterChange(event: DataTableFilter[]) {
    console.log('Filter changed:', event);
  }

  onPageChange(event: number) {
    console.log('Page changed:', event);
  }

  onExport(event: string) {
    console.log('Export requested:', event);
  }

  onRowDelete(event: { row: User; index: number }) {
    console.log('Row deleted:', event);
    // Remove the row from data
    const updatedUsers = this.users().filter(user => user.id !== event.row.id);
    this.users.set(updatedUsers);
  }

  // New event handlers for enhanced features
  onMultiSortChange(event: any) {
    console.log('Multi-sort changed:', event);
  }

  onColumnResize(event: { column: any; width: string }) {
    console.log('Column resized:', event);
    // Update column width
    const updatedColumns = this.columns().map(col => 
      col.key === event.column.key 
        ? { ...col, width: event.width }
        : col
    );
    this.columns.set(updatedColumns);
  }

  onGroupChange(event: any) {
    console.log('Grouping changed:', event);
  }

  // Pagination configuration method
  updatePageSizeOptions(value: string) {
    const options = value.split(',').map(v => Number(v.trim()));
    this.customPageSizeOptions.set(options);
    // The effect will automatically handle updating the page size if needed
  }

  // Method to handle manual page size selection
  updatePageSize(value: number) {
    this._basePageSize.set(value);
  }
}
