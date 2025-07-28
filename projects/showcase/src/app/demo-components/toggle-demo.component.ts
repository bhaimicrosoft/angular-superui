import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toggle, ToggleChangeEvent } from '../../../../lib/src/lib/toggle';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-toggle-demo',
  standalone: true,
  imports: [Toggle, ReactiveFormsModule, JsonPipe],
  template: `
    <div class="max-w-4xl mx-auto p-6 space-y-8">
      <!-- Header -->
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold text-foreground">Toggle Component</h1>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          Advanced toggle/switch component with multiple variants, animations, and form integration.
        </p>
      </div>

      <!-- Basic Examples -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-foreground border-b pb-2">Basic Examples</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Default Toggle -->
          <div class="space-y-3 p-4 border rounded-lg">
            <h3 class="font-medium text-foreground">Default</h3>
            <Toggle
              [(checked)]="basicToggle"
              label="Enable notifications"
              (change)="onToggleChange('Basic', $event)"
            />
            <p class="text-sm text-muted-foreground">
              Status: {{ basicToggle() ? 'Enabled' : 'Disabled' }}
            </p>
          </div>

          <!-- Toggle with Description -->
          <div class="space-y-3 p-4 border rounded-lg">
            <h3 class="font-medium text-foreground">With Description</h3>
            <Toggle
              [(checked)]="notificationToggle"
              label="Email notifications"
              description="Receive email updates about your account"
              helperText="You can change this later in settings"
              (change)="onToggleChange('Notification', $event)"
            />
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-foreground border-b pb-2">Variants</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="space-y-3 p-4 border rounded-lg">
            <h3 class="font-medium">Default</h3>
            <Toggle
              [(checked)]="variantDefaultDefault"
              variant="default"
              label="Default variant"
            />
          </div>

          <div class="space-y-3 p-4 border rounded-lg">
            <h3 class="font-medium">Outline</h3>
            <Toggle
              [(checked)]="variantDefaultOutline"
              variant="outline"
              label="Outline variant"
            />
          </div>

          <div class="space-y-3 p-4 border rounded-lg">
            <h3 class="font-medium">Ghost</h3>
            <Toggle
              [(checked)]="variantDefaultGhost"
              variant="ghost"
              label="Ghost variant"
            />
          </div>

          <div class="space-y-3 p-4 border rounded-lg">
            <h3 class="font-medium">Destructive</h3>
            <Toggle
              [(checked)]="variantDefaultDestructive"
              variant="destructive"
              label="Delete account"
            />
          </div>

          <div class="space-y-3 p-4 border rounded-lg">
            <h3 class="font-medium">Success</h3>
            <Toggle
              [(checked)]="variantDefaultSuccess"
              variant="success"
              label="Auto-save enabled"
            />
          </div>

          <div class="space-y-3 p-4 border rounded-lg">
            <h3 class="font-medium">Warning</h3>
            <Toggle
              [(checked)]="variantDefaultWarning"
              variant="warning"
              label="Maintenance mode"
            />
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-foreground border-b pb-2">Sizes</h2>

        <div class="space-y-4">
          <div class="flex items-center space-x-8">
            <div class="space-y-2">
              <h3 class="font-medium">Small</h3>
              <Toggle
                [(checked)]="sizeDefaultSm"
                size="sm"
                label="Small toggle"
              />
            </div>

            <div class="space-y-2">
              <h3 class="font-medium">Default</h3>
              <Toggle
                [(checked)]="sizeDefaultDefault"
                size="default"
                label="Default toggle"
              />
            </div>

            <div class="space-y-2">
              <h3 class="font-medium">Large</h3>
              <Toggle
                [(checked)]="sizeDefaultLg"
                size="lg"
                label="Large toggle"
              />
            </div>

            <div class="space-y-2">
              <h3 class="font-medium">Extra Large</h3>
              <Toggle
                [(checked)]="sizeDefaultXl"
                size="xl"
                label="Extra large toggle"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- With Icons -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-foreground border-b pb-2">With Icons</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3 p-4 border rounded-lg">
            <h3 class="font-medium">Default Icons</h3>
            <Toggle
              [(checked)]="iconToggle"
              label="Show icons"
              [showIcons]="true"
              size="lg"
            />
          </div>

          <div class="space-y-3 p-4 border rounded-lg">
            <h3 class="font-medium">Custom Icons</h3>
            <Toggle
              [(checked)]="customIconToggle"
              label="Dark mode"
              [showIcons]="true"
              checkedIcon="<svg class='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'><path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'/></svg>"
              uncheckedIcon="<svg class='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'><path fill-rule='evenodd' d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z' clip-rule='evenodd'/></svg>"
              size="lg"
            />
          </div>
        </div>
      </section>

      <!-- States -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-foreground border-b pb-2">States</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3 p-4 border rounded-lg">
            <h3 class="font-medium">Disabled</h3>
            <Toggle
              [checked]="true"
              [disabled]="true"
              label="Disabled toggle (checked)"
            />
            <Toggle
              [checked]="false"
              [disabled]="true"
              label="Disabled toggle (unchecked)"
            />
          </div>

          <div class="space-y-3 p-4 border rounded-lg">
            <h3 class="font-medium">With Error</h3>
            <Toggle
              [(checked)]="errorToggle"
              label="Accept terms"
              error="You must accept the terms and conditions"
              [required]="true"
            />
          </div>
        </div>
      </section>

      <!-- Label Positions -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-foreground border-b pb-2">Label Positions</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3 p-4 border rounded-lg">
            <h3 class="font-medium">Label on Left</h3>
            <Toggle
              [(checked)]="leftLabelToggle"
              label="Enable feature"
              labelPosition="left"
            />
          </div>

          <div class="space-y-3 p-4 border rounded-lg">
            <h3 class="font-medium">Label on Right</h3>
            <Toggle
              [(checked)]="rightLabelToggle"
              label="Enable feature"
              labelPosition="right"
            />
          </div>
        </div>
      </section>

      <!-- Form Integration -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-foreground border-b pb-2">Form Integration</h2>

        <form [formGroup]="settingsForm" (ngSubmit)="onSubmit()" class="space-y-4 p-4 border rounded-lg max-w-md">
          <h3 class="font-medium">Settings Form</h3>

          <Toggle
            formControlName="notifications"
            label="Email notifications"
            description="Receive email updates"
          />

          <Toggle
            formControlName="marketing"
            label="Marketing emails"
            description="Receive promotional content"
          />

          <Toggle
            formControlName="newsletter"
            label="Newsletter"
            description="Weekly newsletter updates"
            [required]="true"
          />

          <div class="flex space-x-3 pt-4">
            <button
              type="submit"
              class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              [disabled]="settingsForm.invalid"
            >
              Save Settings
            </button>
            <button
              type="button"
              class="px-4 py-2 border border-input bg-background hover:bg-accent rounded-md transition-colors"
              (click)="resetForm()"
            >
              Reset
            </button>
          </div>

          <div class="mt-4 p-3 bg-muted rounded-md">
            <h4 class="font-medium text-sm mb-2">Form Values:</h4>
            <pre class="text-xs">{{ settingsForm.value | json }}</pre>
            <p class="text-xs mt-2 text-muted-foreground">
              Form Status: {{ settingsForm.status }}
            </p>
          </div>
        </form>
      </section>

      <!-- Events Demo -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-foreground border-b pb-2">Events</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3 p-4 border rounded-lg">
            <h3 class="font-medium">Event Logging</h3>
            <Toggle
              [(checked)]="eventToggle"
              label="Test events"
              (change)="onToggleChange('Event Demo', $event)"
              (focusEvent)="onToggleFocus($event)"
              (blurEvent)="onToggleBlur($event)"
            />
          </div>

          <div class="p-4 border rounded-lg">
            <h3 class="font-medium mb-2">Event Log</h3>
            <div class="space-y-1 max-h-32 overflow-y-auto">
              @for (event of eventLog(); track $index) {
                <div class="text-xs p-2 bg-muted rounded text-muted-foreground">
                  {{ event }}
                </div>
              }
            </div>
            <button
              class="mt-2 text-xs text-primary hover:underline"
              (click)="clearEventLog()"
            >
              Clear Log
            </button>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class ToggleDemoComponent {
  // Basic toggles
  readonly basicToggle = signal(false);
  readonly notificationToggle = signal(true);
  readonly iconToggle = signal(false);
  readonly customIconToggle = signal(false);
  readonly errorToggle = signal(false);
  readonly leftLabelToggle = signal(true);
  readonly rightLabelToggle = signal(false);
  readonly eventToggle = signal(false);

  // Variant defaults - individual signals for two-way binding
  readonly variantDefaultDefault = signal(false);
  readonly variantDefaultOutline = signal(true);
  readonly variantDefaultGhost = signal(false);
  readonly variantDefaultDestructive = signal(false);
  readonly variantDefaultSuccess = signal(true);
  readonly variantDefaultWarning = signal(false);

  // Size defaults - individual signals for two-way binding
  readonly sizeDefaultSm = signal(false);
  readonly sizeDefaultDefault = signal(true);
  readonly sizeDefaultLg = signal(false);
  readonly sizeDefaultXl = signal(true);

  // Event log
  readonly eventLog = signal<string[]>([]);

  // Form
  readonly settingsForm = new FormGroup({
    notifications: new FormControl(true),
    marketing: new FormControl(false),
    newsletter: new FormControl(false, [Validators.requiredTrue]),
  });

  onToggleChange(source: string, event: ToggleChangeEvent): void {
    const timestamp = new Date().toLocaleTimeString();
    const message = `[${timestamp}] ${source}: ${event.checked ? 'ON' : 'OFF'}`;
    this.eventLog.update(logs => [message, ...logs].slice(0, 10));

    console.log(`Toggle ${source} changed:`, event);
  }

  onToggleFocus(event: FocusEvent): void {
    const timestamp = new Date().toLocaleTimeString();
    const message = `[${timestamp}] Focus event triggered`;
    this.eventLog.update(logs => [message, ...logs].slice(0, 10));
  }

  onToggleBlur(event: FocusEvent): void {
    const timestamp = new Date().toLocaleTimeString();
    const message = `[${timestamp}] Blur event triggered`;
    this.eventLog.update(logs => [message, ...logs].slice(0, 10));
  }

  clearEventLog(): void {
    this.eventLog.set([]);
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      console.log('Form submitted:', this.settingsForm.value);
      alert('Settings saved successfully!');
    } else {
      console.log('Form is invalid');
      alert('Please fill all required fields');
    }
  }

  resetForm(): void {
    this.settingsForm.reset({
      notifications: true,
      marketing: false,
      newsletter: false,
    });
  }
}
