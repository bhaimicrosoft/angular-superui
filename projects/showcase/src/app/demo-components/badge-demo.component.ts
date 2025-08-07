import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Badge } from '@lib/components/badge';
import { Button } from '@lib/components/button';

@Component({
  selector: 'app-badge-demo',
  standalone: true,
  imports: [CommonModule, Badge, Button],
  templateUrl: './badge-demo.component.html'
})
export class BadgeDemoComponent {
  // Dynamic counters for interactive demos
  notificationCount = signal(3);
  messageCount = signal(12);
  cartItems = signal(7);
  onlineUsers = signal(1337);
  issueCount = signal(2);

  // Status states
  serverStatus = signal<'online' | 'maintenance' | 'offline'>('online');
  buildStatus = signal<'success' | 'pending' | 'failed'>('success');

  // Toast notifications
  toastMessage = signal<string | null>(null);
  showToast = signal(false);

  // Interactive actions
  incrementNotifications() {
    this.notificationCount.update(count => count + 1);
    this.showToastMessage(`New notification! Total: ${this.notificationCount()}`);
  }

  clearNotifications() {
    this.notificationCount.set(0);
    this.showToastMessage('All notifications cleared!');
  }

  addMessage() {
    this.messageCount.update(count => count + 1);
    this.showToastMessage(`New message received! Total: ${this.messageCount()}`);
  }

  addToCart() {
    this.cartItems.update(count => count + 1);
    this.showToastMessage(`Item added to cart! Total: ${this.cartItems()}`);
  }

  removeFromCart() {
    if (this.cartItems() > 0) {
      this.cartItems.update(count => count - 1);
      this.showToastMessage(`Item removed from cart! Total: ${this.cartItems()}`);
    }
  }

  toggleServerStatus() {
    const statuses: Array<'online' | 'maintenance' | 'offline'> = ['online', 'maintenance', 'offline'];
    const currentIndex = statuses.indexOf(this.serverStatus());
    const nextIndex = (currentIndex + 1) % statuses.length;
    this.serverStatus.set(statuses[nextIndex]);
    this.showToastMessage(`Server status changed to: ${statuses[nextIndex]}`);
  }

  cycleBuildStatus() {
    const statuses: Array<'success' | 'pending' | 'failed'> = ['success', 'pending', 'failed'];
    const currentIndex = statuses.indexOf(this.buildStatus());
    const nextIndex = (currentIndex + 1) % statuses.length;
    this.buildStatus.set(statuses[nextIndex]);
    this.showToastMessage(`Build status: ${statuses[nextIndex]}`);
  }

  simulateUserActivity() {
    const change = Math.floor(Math.random() * 20) - 10; // Random change between -10 and +10
    this.onlineUsers.update(count => Math.max(0, count + change));
    this.showToastMessage(`User activity changed! Online: ${this.onlineUsers()}`);
  }

  createIssue() {
    this.issueCount.update(count => count + 1);
    this.showToastMessage(`New issue created! Total issues: ${this.issueCount()}`);
  }

  resolveIssue() {
    if (this.issueCount() > 0) {
      this.issueCount.update(count => count - 1);
      this.showToastMessage(`Issue resolved! Remaining: ${this.issueCount()}`);
    }
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
