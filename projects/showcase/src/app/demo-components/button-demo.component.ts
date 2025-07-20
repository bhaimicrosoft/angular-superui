import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '@lib/button';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './button-demo.component.html'
})
export class ButtonDemoComponent {
  // Loading states for interactive demos
  loadingStates = signal({
    primary: false,
    download: false,
    save: false,
    delete: false
  });

  // Animation states
  animationStates = signal({
    bounceButton: false,
    pulseButton: false,
    shakeButton: false
  });

  // Toast notifications
  toastMessage = signal<string | null>(null);
  showToast = signal(false);

  // Counter for interactive demo
  clickCount = signal(0);
  
  // Demo actions
  handlePrimaryAction() {
    this.simulateLoading('primary');
    this.showToastMessage('Primary action completed!');
  }

  handleDownload() {
    this.simulateLoading('download');
    this.showToastMessage('Download started!');
  }

  handleSave() {
    this.simulateLoading('save');
    this.showToastMessage('Data saved successfully!');
  }

  handleDelete() {
    this.simulateLoading('delete');
    this.showToastMessage('Item deleted!');
  }

  handleCount() {
    this.clickCount.update(count => count + 1);
    this.showToastMessage(`Clicked ${this.clickCount()} times!`);
  }

  resetCount() {
    this.clickCount.set(0);
    this.showToastMessage('Counter reset!');
  }

  addTen() {
    this.clickCount.update(count => count + 10);
    this.showToastMessage(`Added 10! Total: ${this.clickCount()}`);
  }

  handleLearnMore() {
    this.showToastMessage('Learn More clicked! Redirecting to documentation...');
    // You can add navigation logic here
  }

  handleDependentAction() {
    this.showToastMessage('Dependent action triggered! This action depends on other button states.');
  }

  handleDocumentation() {
    window.open('https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/button.md', '_blank');
    this.showToastMessage('Opening documentation in new tab...');
  }

  triggerBounce() {
    this.animationStates.update(state => ({ ...state, bounceButton: true }));
    setTimeout(() => {
      this.animationStates.update(state => ({ ...state, bounceButton: false }));
    }, 1000);
  }

  triggerPulse() {
    this.animationStates.update(state => ({ ...state, pulseButton: true }));
    setTimeout(() => {
      this.animationStates.update(state => ({ ...state, pulseButton: false }));
    }, 2000);
  }

  triggerShake() {
    this.animationStates.update(state => ({ ...state, shakeButton: true }));
    setTimeout(() => {
      this.animationStates.update(state => ({ ...state, shakeButton: false }));
    }, 1000);
  }

  private simulateLoading(button: 'primary' | 'download' | 'save' | 'delete') {
    this.loadingStates.update(state => ({ ...state, [button]: true }));
    setTimeout(() => {
      this.loadingStates.update(state => ({ ...state, [button]: false }));
    }, 2000);
  }

  private showToastMessage(message: string) {
    this.toastMessage.set(message);
    this.showToast.set(true);
    setTimeout(() => {
      this.showToast.set(false);
      setTimeout(() => {
        this.toastMessage.set(null);
      }, 300);
    }, 3000);
  }
}
