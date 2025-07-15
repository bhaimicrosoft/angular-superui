import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Alert,
  Separator,
  Button,
  InputComponent,
  Textarea,
  Badge,
  Label,
  Progress,
  Avatar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  Switch,
  Checkbox,
  Skeleton,
  // New components
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Select,
  RadioGroup,
  Toggle,
  Slider,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Tooltip,
  ToastContainer,
  ToastService,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  ThemeSelector,
  // Latest new components
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
  Calendar,
  DatePicker,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
  SheetClose,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverSimple,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbComplete,
} from "../../../lib/src/public-api";
  email = '';
  password = '';
  message = '';
  acceptTerms = false;
  notifications = true;
  progressValue = 67;
  openDialog = false;
  currentTheme = 'default';

  // Select options
  selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  // Radio options
  radioOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  constructor(private toastService: ToastService) {}

  onThemeChange(theme: string) {
    this.currentTheme = theme;
    // Apply theme to document body for global effect
    const body = document.body;
    // Remove all existing theme classes
    body.classList.remove('theme-blue', 'theme-green', 'theme-purple', 'theme-pink', 'theme-orange', 'theme-teal', 'theme-red', 'theme-yellow', 'theme-indigo', 'theme-cyan');
    // Add new theme class if not default
    if (theme !== 'default') {
      body.classList.add(theme);
    }
  }

  showToast(type: 'success' | 'error' | 'warning') {
    switch (type) {
      case 'success':
        this.toastService.success('Success!', 'Operation completed successfully.');
        break;
      case 'error':
        this.toastService.error('Error!', 'Something went wrong.');
        break;
      case 'warning':
        this.toastService.warning('Warning!', 'Please be careful.');
        break;
    }
  }
}
