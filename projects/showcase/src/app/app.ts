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

  constructor(private toastService: ToastService) {}

  onThemeChange(theme: string) {
    this.currentTheme = theme;
    // Apply theme to document body for global effect
    const body = document.body;
    // Remove all existing theme classes
    body.classList.remove(
      'theme-blue',
      'theme-green',
      'theme-purple',
      'theme-pink',
      'theme-orange',
      'theme-teal',
      'theme-red',
      'theme-yellow',
      'theme-indigo',
      'theme-cyan'
    );
    // Add new theme class if not default
    if (theme !== 'default') {
      body.classList.add(theme);
    }
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
