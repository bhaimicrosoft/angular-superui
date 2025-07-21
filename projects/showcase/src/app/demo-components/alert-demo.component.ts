import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Button} from '@lib/button';

interface AlertExample {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'default';
  title: string;
  message: string;
  icon: string;
  visible: boolean;
  bgColor: string;
  borderColor: string;
  textColor: string;
  iconColor: string;
}

@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './alert-demo.component.html',
  styles: []
})
export class AlertDemoComponent {
  // Dynamic alerts array
  dynamicAlerts = signal<AlertExample[]>([]);

  // Static example alerts
  exampleAlerts: AlertExample[] = [
    {
      id: 'success-1',
      type: 'success',
      title: 'Payment Successful!',
      message: 'Your payment of $99.99 has been processed successfully. Receipt sent to your email.',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      visible: true,
      bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      textColor: 'text-green-800 dark:text-green-200',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      id: 'error-1',
      type: 'error',
      title: 'Connection Failed',
      message: 'Unable to connect to the server. Please check your internet connection and try again.',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      visible: true,
      bgColor: 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      textColor: 'text-red-800 dark:text-red-200',
      iconColor: 'text-red-600 dark:text-red-400'
    },
    {
      id: 'warning-1',
      type: 'warning',
      title: 'Storage Almost Full',
      message: 'You are using 89% of your storage quota. Consider upgrading your plan or deleting old files.',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      visible: true,
      bgColor: 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      textColor: 'text-yellow-800 dark:text-yellow-200',
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      id: 'info-1',
      type: 'info',
      title: 'New Feature Available',
      message: 'We have just released dark mode support! Toggle between light and dark themes in settings.',
      icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      visible: true,
      bgColor: 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-800 dark:text-blue-200',
      iconColor: 'text-blue-600 dark:text-blue-400'
    }
  ];

  // Alert templates for dynamic generation
  alertTemplates = [
    {
      type: 'success' as const,
      titles: ['Success!', 'Well Done!', 'Completed!', 'Perfect!'],
      messages: [
        'Your action was completed successfully.',
        'Everything went according to plan.',
        'Task finished without any issues.',
        'Operation completed successfully.'
      ]
    },
    {
      type: 'error' as const,
      titles: ['Error Occurred', 'Something Went Wrong', 'Failed', 'Oops!'],
      messages: [
        'An unexpected error occurred.',
        'Please try again later.',
        'Unable to complete the operation.',
        'Something went wrong. Please contact support.'
      ]
    },
    {
      type: 'warning' as const,
      titles: ['Warning', 'Attention Required', 'Be Careful', 'Notice'],
      messages: [
        'Please review your input before proceeding.',
        'This action cannot be undone.',
        'Make sure you have saved your work.',
        'Double-check your settings.'
      ]
    },
    {
      type: 'info' as const,
      titles: ['Information', 'Did You Know?', 'Tip', 'Update'],
      messages: [
        'Here is some useful information.',
        'This feature can help improve your workflow.',
        'Check out our latest updates.',
        'New features are available.'
      ]
    }
  ];

  showAlert(type: 'success' | 'error' | 'warning' | 'info') {
    const template = this.alertTemplates.find(t => t.type === type);
    if (!template) return;

    const randomTitle = template.titles[Math.floor(Math.random() * template.titles.length)];
    const randomMessage = template.messages[Math.floor(Math.random() * template.messages.length)];

    const alertConfig = this.getAlertConfig(type);

    const newAlert: AlertExample = {
      id: `${type}-${Date.now()}`,
      type,
      title: randomTitle,
      message: randomMessage,
      icon: alertConfig.icon,
      visible: true,
      bgColor: alertConfig.bgColor,
      borderColor: alertConfig.borderColor,
      textColor: alertConfig.textColor,
      iconColor: alertConfig.iconColor
    };

    const currentAlerts = this.dynamicAlerts();
    this.dynamicAlerts.set([...currentAlerts, newAlert]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      this.dismissAlert(newAlert.id);
    }, 5000);
  }

  dismissAlert(id: string) {
    const currentAlerts = this.dynamicAlerts();
    this.dynamicAlerts.set(currentAlerts.filter(alert => alert.id !== id));
  }

  dismissExampleAlert(id: string) {
    const alert = this.exampleAlerts.find(a => a.id === id);
    if (alert) {
      alert.visible = false;
    }
  }

  restoreExampleAlerts() {
    this.exampleAlerts.forEach(alert => alert.visible = true);
  }

  clearAllDynamicAlerts() {
    this.dynamicAlerts.set([]);
  }

  trackByFn(index: number, item: AlertExample): string {
    return item.id;
  }

  trackByExampleFn(index: number, item: AlertExample): string {
    return item.id;
  }

  private getAlertConfig(type: string) {
    const configs = {
      success: {
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
        borderColor: 'border-green-200 dark:border-green-800',
        textColor: 'text-green-800 dark:text-green-200',
        iconColor: 'text-green-600 dark:text-green-400'
      },
      error: {
        icon: 'M6 18L18 6M6 6l12 12',
        bgColor: 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
        borderColor: 'border-red-200 dark:border-red-800',
        textColor: 'text-red-800 dark:text-red-200',
        iconColor: 'text-red-600 dark:text-red-400'
      },
      warning: {
        icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
        bgColor: 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
        borderColor: 'border-yellow-200 dark:border-yellow-800',
        textColor: 'text-yellow-800 dark:text-yellow-200',
        iconColor: 'text-yellow-600 dark:text-yellow-400'
      },
      info: {
        icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        bgColor: 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
        borderColor: 'border-blue-200 dark:border-blue-800',
        textColor: 'text-blue-800 dark:text-blue-200',
        iconColor: 'text-blue-600 dark:text-blue-400'
      }
    };
    return configs[type as keyof typeof configs];
  }
}
