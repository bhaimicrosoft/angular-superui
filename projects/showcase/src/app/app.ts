import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { 
  Alert,
  Badge,
  Button, 
  Progress,
  DatePicker,
  BreadcrumbComplete,
  ThemeSelector,
  ToastService 
} from '../../../../dist/lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule, 
    DatePipe,
    Alert, 
    Badge, 
    Button, 
    Progress, 
    DatePicker, 
    BreadcrumbComplete, 
    ThemeSelector
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  title = 'Angular SuperUI Showcase';
  email = '';
  password = '';
  message = '';
  acceptTerms = false;
  notifications = true;
  progressValue = 67;
  openDialog = false;
  currentTheme = 'default';
  selectedDate = new Date();
  isDarkMode = false;

  // Breadcrumb items for demonstration
  breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Showcase' },
  ];

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

  constructor(private toastService: ToastService) {
    // Initialize theme from localStorage or system preference
    this.initializeTheme();
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
      this.isDarkMode = savedTheme === 'dark';
    } else {
      // Check system preference
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme = this.isDarkMode ? 'dark' : 'light';
    }
    this.applyTheme();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.currentTheme = this.isDarkMode ? 'dark' : 'light';
    this.applyTheme();
    localStorage.setItem('theme', this.currentTheme);
  }

  applyTheme() {
    const html = document.documentElement;
    if (this.isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  onThemeChange(theme: string) {
    this.currentTheme = theme;
    this.isDarkMode = theme === 'dark';
    this.applyTheme();
    localStorage.setItem('theme', theme);
  }

  showToast(type: 'success' | 'error' | 'warning') {
    switch (type) {
      case 'success':
        this.toastService.success(
          'Success!',
          'Operation completed successfully.'
        );
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
