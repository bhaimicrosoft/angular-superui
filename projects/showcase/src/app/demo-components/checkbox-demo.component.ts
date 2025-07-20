import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkbox-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox-demo.component.html'
})
export class CheckboxDemoComponent {
  isChecked = signal(false);
  isIndeterminate = signal(true);
  isDisabled = signal(false);
  
  hobbies = signal([
    { id: 'reading', label: 'Reading', checked: true },
    { id: 'sports', label: 'Sports', checked: false },
    { id: 'music', label: 'Music', checked: true },
    { id: 'travel', label: 'Travel', checked: false },
    { id: 'cooking', label: 'Cooking', checked: false }
  ]);

  settings = signal([
    { id: 'notifications', label: 'Email Notifications', checked: true, description: 'Receive updates via email' },
    { id: 'newsletter', label: 'Newsletter Subscription', checked: false, description: 'Weekly newsletter with updates' },
    { id: 'marketing', label: 'Marketing Communications', checked: false, description: 'Promotional offers and news' },
    { id: 'analytics', label: 'Analytics & Tracking', checked: true, description: 'Help improve our services' }
  ]);

  permissions = signal([
    { id: 'read', label: 'Read', checked: true },
    { id: 'write', label: 'Write', checked: true },
    { id: 'delete', label: 'Delete', checked: false },
    { id: 'admin', label: 'Admin', checked: false }
  ]);

  toggleHobby(id: string): void {
    this.hobbies.update(hobbies => 
      hobbies.map(hobby => 
        hobby.id === id ? { ...hobby, checked: !hobby.checked } : hobby
      )
    );
  }

  toggleSetting(id: string): void {
    this.settings.update(settings => 
      settings.map(setting => 
        setting.id === id ? { ...setting, checked: !setting.checked } : setting
      )
    );
  }

  togglePermission(id: string): void {
    this.permissions.update(permissions => 
      permissions.map(permission => 
        permission.id === id ? { ...permission, checked: !permission.checked } : permission
      )
    );
  }

  selectAllHobbies(): void {
    this.hobbies.update(hobbies => 
      hobbies.map(hobby => ({ ...hobby, checked: true }))
    );
  }

  selectNoneHobbies(): void {
    this.hobbies.update(hobbies => 
      hobbies.map(hobby => ({ ...hobby, checked: false }))
    );
  }

  get selectedHobbiesCount(): number {
    return this.hobbies().filter(hobby => hobby.checked).length;
  }

  get selectedPermissions(): string[] {
    return this.permissions().filter(p => p.checked).map(p => p.label);
  }
}
