# 🎨 Angular SuperUI Component Demos & Examples

> **The Ultimate Guide** to Angular SuperUI v0.6.2 Components with **Practical Examples**, **Use Cases**, and **Best Practices**

[![Angular SuperUI](https://img.shields.io/badge/Angular%20SuperUI-v0.6.2-brightgreen)](https://github.com/bhaimicrosoft/angular-superui)
[![Examples](https://img.shields.io/badge/Examples-100+-orange)](#examples)


## 🚀 **Quick Navigation**

| 🎨 **Core Components** | 📝 **Form Components** | 🗂️ **Layout Components** |
|------------------------|-------------------------|---------------------------|
| [Button](#-button) | [Input](#-input) | [Card](#-card) |
| [Badge](#-badge) | [Textarea](#-textarea) | [Tabs](#️-tabs) |
| [Alert](#-alert) | [Label](#️-label) | [Accordion](#-accordion) |
| [Avatar](#-avatar) | [Select](#-select) | [Separator](#-separator) |
| [Progress](#-progress) | [Checkbox](#️-checkbox) | [Table](#-table) |
| [Skeleton](#-skeleton) | [Switch](#-switch) | [Breadcrumb](#-breadcrumb) |
| | [Radio Group](#-radio-group) | |
| | [Toggle](#-toggle) | |
| | [Slider](#️-slider) | |
| | [Calendar](#-calendar) | |

| � **Overlay Components** | 🎯 **Interactive Components** | 📚 **Resources** |
|---------------------------|------------------------------|------------------|
| [Dialog](#️-dialog) | [Command](#-command) | [Installation](#-installation-1) |
| [Sheet](#-sheet) | [Theme Selector](#-theme-selector) | [CLI Reference](#️-cli-reference) |
| [Popover](#-popover) | [Toast](#-toast) | [GitHub](#-github-1) |
| [Tooltip](#️-tooltip) | | |

---

## 🎯 **Core Components**

### �📂 **Accordion**
**Expandable/collapsible sections for content organization**

#### 📦 **Installation**
```bash
ngsui-cli add accordion
```

```typescript
import { Component } from '@angular/core';
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from '@components/accordion/accordion';

@Component({
  selector: 'app-accordion-demo',
  standalone: true,
  imports: [Accordion, AccordionItem, AccordionHeader, AccordionPanel],
  template: `
    <div class="space-y-6 p-6">
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Accordion</h3>
        <Accordion>
          <AccordionItem>
            <AccordionHeader>What is Angular SuperUI?</AccordionHeader>
            <AccordionPanel>
              Angular SuperUI is a comprehensive component library built for Angular applications with modern design and accessibility in mind.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader>How do I install it?</AccordionHeader>
            <AccordionPanel>
              You can install Angular SuperUI using npm: npm install @ngsui/core or use our CLI tool for individual components.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader>Is it free to use?</AccordionHeader>
            <AccordionPanel>
              Yes! Angular SuperUI is open source and completely free to use under the MIT license.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </section>
  `
})
export class AccordionDemoComponent {}
```

---
### � **Avatar**
**User profile images and initials**

#### 📦 **Installation**
```bash
ngsui-cli add avatar
```
#### 🎨 **Avatar Examples**
```typescript
import { Component } from '@angular/core';
import { Avatar, AvatarImage, AvatarFallback } from '@components/avatar/avatar';

@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [Avatar, AvatarImage, AvatarFallback],
  template: `
    <div class="space-y-6 p-6">
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Avatars</h3>
        <div class="flex gap-4">
          <Avatar>
            <AvatarImage src="/assets/user1.jpg" alt="User 1" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="/assets/user2.jpg" alt="User 2" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>
        </div>
      </section>
  `
})
export class AvatarDemoComponent {}
```

---
### 🧭 **Breadcrumb**
**Navigation aid for hierarchical content**

#### 📦 **Installation**
```bash
ngsui-cli add breadcrumb
```
#### 🎨 **Breadcrumb Examples**
```typescript
import { Component } from '@angular/core';
import { Breadcrumb, BreadcrumbItem } from '@components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-breadcrumb-demo',
  standalone: true,
  imports: [Breadcrumb, BreadcrumbItem],
  template: `
    <div class="space-y-6 p-6">
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Breadcrumb</h3>
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="/">Home</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a href="/library">Library</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span>Data</span>
          </BreadcrumbItem>
        </Breadcrumb>
      </section>

      <!-- Real-world Breadcrumb -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Real-world Example</h3>
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="/">Dashboard</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a href="/users">Users</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a href="/users/profile">Profile</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span>Edit Profile</span>
          </BreadcrumbItem>
        </Breadcrumb>
      </section>
    </div>
  `
})
export class BreadcrumbDemoComponent {}
```

---
### ☑️ **Checkbox**

#### 📦 **Installation**
```bash
ngsui-cli add checkbox
```

#### 🎨 **Checkbox Examples**
```typescript
import { Component } from '@angular/core';
import { Checkbox } from '@components/checkbox/checkbox';

@Component({
  selector: 'app-checkbox-demo',
  imports: [Checkbox],
  template: `
    <div class="space-y-6 p-6">
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Checkbox</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <Checkbox id="accept" />
            <label htmlFor="accept">Accept Terms and Conditions</label>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox id="newsletter" checked />
            <label htmlFor="newsletter">Subscribe to Newsletter</label>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox id="disabled" disabled />
            <label htmlFor="disabled">Disabled Checkbox</label>
          </div>
        </div>
      </section>

      <!-- Checkbox List -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Checkbox List</h3>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <Checkbox id="feature1" />
            <label htmlFor="feature1">Email notifications</label>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox id="feature2" checked />
            <label htmlFor="feature2">SMS notifications</label>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox id="feature3" />
            <label htmlFor="feature3">Push notifications</label>
          </div>
        </div>
      </section>
    </div>
  `
})
```

---
### 💻 **Command**
**Command palette for quick actions**

#### 📦 **Installation**
```bash
ngsui-cli add command
```

#### � **Command Examples**
```typescript
import { Command, CommandItem } from '@components/command/command';

@Component({
  selector: 'app-command-demo',
  standalone: true,
  imports: [Command, CommandItem],
  template: `
    <div class="space-y-6 p-6">
      <section>
        <h3 class="text-lg font-semibold mb-3">Command Palette</h3>
        <Command>
          <CommandItem>Open File</CommandItem>
          <CommandItem>Save All</CommandItem>
        </Command>
      </section>
    </div>
  `
})
export class CommandDemoComponent {}
```

---
### 🗨️ **Dialog**
**Modal dialogs for confirmations and forms**

#### � **Installation**
ngsui-cli add dialog
```

#### 🎨 **Dialog API Components**
- **Dialog** - Root container component with backdrop
- **DialogContent** - Main content container  
- **DialogHeader** - Header section with title and description
- **DialogTitle** - Dialog title component
- **DialogDescription** - Dialog description text
- **DialogFooter** - Footer section for action buttons

#### 🔧 **Dialog Props**
**Dialog Component:**
- `open: boolean` - Controls dialog visibility (default: false)
- `class: string` - Additional CSS classes
- `variant: 'default'` - Dialog variant style
- `(openChange): EventEmitter<boolean>` - Emitted when open state changes

#### 🎨 **Complete Dialog Examples**
```typescript
import { Component } from '@angular/core';
import { Dialog, DialogHeader, DialogContent, DialogFooter, DialogTitle, DialogDescription } from '@components/dialog';
import { Button } from '@components/button';

@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [Dialog, DialogHeader, DialogContent, DialogFooter, DialogTitle, DialogDescription, Button],
  template: `
    <div class="space-y-6 p-6">
      <!-- Basic Dialog -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Dialog</h3>
        <div>
          <Button (click)="openBasicDialog()">Open Dialog</Button>
          
          <Dialog 
            [open]="isBasicDialogOpen"
            (openChange)="onBasicDialogChange($event)"
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Basic Dialog</DialogTitle>
                <DialogDescription>
                  This is a basic dialog example with header and footer.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" (click)="closeBasicDialog()">
                  Cancel
                </Button>
                <Button (click)="confirmBasicDialog()">
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <!-- Confirmation Dialog -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Confirmation Dialog</h3>
        <div class="flex gap-4">
          <Button variant="destructive" (click)="openDeleteDialog()">
            Delete Account
          </Button>
          
          <Dialog 
            [open]="isDeleteDialogOpen"
            (openChange)="onDeleteDialogChange($event)"
          >
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" (click)="closeDeleteDialog()">
                  Cancel
                </Button>
                <Button variant="destructive" (click)="deleteAccount()">
                  Yes, delete account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <!-- Form Dialog -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Form Dialog</h3>
        <Button (click)="openFormDialog()">Add New User</Button>
        
        <Dialog 
          [open]="isFormDialogOpen"
          (openChange)="onFormDialogChange($event)"
        >
          <DialogContent class="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account. Fill in the required information below.
              </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div class="grid gap-2">
                <label for="firstName">First Name</label>
                <input 
                  id="firstName" 
                  placeholder="Enter first name"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div class="grid gap-2">
                <label for="lastName">Last Name</label>
                <input 
                  id="lastName" 
                  placeholder="Enter last name"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div class="grid gap-2">
                <label for="email">Email</label>
                <input 
                  id="email" 
                  type="email"
                  placeholder="Enter email address"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" (click)="closeFormDialog()">
                Cancel
              </Button>
              <Button type="submit" (click)="createUser()">
                Create User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  `
})
export class DialogDemoComponent {
  isBasicDialogOpen = false;
  isDeleteDialogOpen = false;
  isFormDialogOpen = false;

  // Basic Dialog Methods
  openBasicDialog() {
    this.isBasicDialogOpen = true;
  }

  closeBasicDialog() {
    this.isBasicDialogOpen = false;
  }

  onBasicDialogChange(open: boolean) {
    this.isBasicDialogOpen = open;
  }

  confirmBasicDialog() {
    console.log('Dialog confirmed');
    this.closeBasicDialog();
  }

  // Delete Dialog Methods
  openDeleteDialog() {
    this.isDeleteDialogOpen = true;
  }

  closeDeleteDialog() {
    this.isDeleteDialogOpen = false;
  }

  onDeleteDialogChange(open: boolean) {
    this.isDeleteDialogOpen = open;
  }

  deleteAccount() {
    console.log('Account deleted');
    this.closeDeleteDialog();
  }

  // Form Dialog Methods
  openFormDialog() {
    this.isFormDialogOpen = true;
  }

  closeFormDialog() {
    this.isFormDialogOpen = false;
  }

  onFormDialogChange(open: boolean) {
    this.isFormDialogOpen = open;
  }

  createUser() {
    console.log('User created');
    this.closeFormDialog();
  }
}
```

---
### 📍 **Popover**
**Floating content for tooltips, menus, and more**

#### 📦 **Installation**
```bash
ngsui-cli add popover
```

#### 🎨 **Popover Examples**
```typescript
import { Component } from '@angular/core';
import { Popover, PopoverTrigger, PopoverContent } from '@components/popover/popover';

@Component({
  selector: 'app-popover-demo',
  standalone: true,
  imports: [Popover, PopoverTrigger, PopoverContent],
  template: `
    <div class="space-y-6 p-6">
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Popover</h3>
        <Popover>
          <PopoverTrigger>
            <button>Show Popover</button>
          </PopoverTrigger>
          <PopoverContent>
            <p>This is popover content.</p>
          </PopoverContent>
        </Popover>
      </section>
    </div>
  `
})
export class PopoverDemoComponent {}
```

---
### 📈 **Progress**
**Progress bars for loading and completion states**

#### 📦 **Installation**
```bash
ngsui-cli add progress
```

#### 🎨 **Progress Examples**
```typescript
import { Component } from '@angular/core';
import { Progress } from '@components/progress/progress';

@Component({
  selector: 'app-progress-demo',
  standalone: true,
  imports: [Progress],
  template: `
    <div class="space-y-6 p-6">
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Progress</h3>
        <Progress value="40" max="100" />
        <Progress value="75" max="100" color="success" />
      </section>
    </div>
  `
})
export class ProgressDemoComponent {}
```

---
### ➖ **Separator**
**Horizontal or vertical dividers for content**

#### 📦 **Installation**
```bash
ngsui-cli add separator
```

#### 🎨 **Separator Examples**
```typescript
import { Component } from '@angular/core';
import { Separator } from '@components/separator/separator';

@Component({
  selector: 'app-separator-demo',
  standalone: true,
  imports: [Separator],
  template: `
    <div class="space-y-6 p-6">
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Separator</h3>
        <div>
          <p>Above the separator</p>
          <Separator />
          <p>Below the separator</p>
        </div>
      </section>
    </div>
  `
})
export class SeparatorDemoComponent {}
```

---
### 🦴 **Skeleton**
**Loading placeholders for content**

#### 📦 **Installation**
```bash
ngsui-cli add skeleton
```

#### 🎨 **Skeleton Examples**
```typescript
import { Component } from '@angular/core';
import { Skeleton } from '@components/skeleton/skeleton';

@Component({
  selector: 'app-skeleton-demo',
  standalone: true,
  imports: [Skeleton],
  template: `
    <div class="space-y-6 p-6">
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Skeleton</h3>
        <Skeleton width="100%" height="32px" />
        <Skeleton width="60%" height="20px" />
      </section>
    </div>
  `
})
export class SkeletonDemoComponent {}
```

---
### 🎚️ **Slider**
**Range selection with draggable thumb**

#### 📦 **Installation**
```bash
ngsui-cli add slider
```

#### 🎨 **Slider Examples**
```typescript
import { Component } from '@angular/core';
import { Slider } from '@components/slider/slider';

@Component({
  selector: 'app-slider-demo',
  standalone: true,
  imports: [Slider],
  template: `
    <div class="space-y-6 p-6">
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Slider</h3>
        <Slider min="0" max="100" value="50" />
      </section>
    </div>
  `
})
export class SliderDemoComponent {}
```

---
### 🔀 **Switch**
**Toggle switches for binary states**

#### 📦 **Installation**
```bash
ngsui-cli add switch
```

#### 🎨 **Switch Examples**
```typescript
import { Component } from '@angular/core';
import { Switch } from '@components/switch/switch';

@Component({
  selector: 'app-switch-demo',
  standalone: true,
  imports: [Switch],
  template: `
    <div class="space-y-6 p-6">
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Switch</h3>
        <Switch checked />
        <Switch />
      </section>
    </div>
  `
})
export class SwitchDemoComponent {}
```

---
### �️ **Tabs**
**Tabbed navigation for content sections**

#### 📦 **Installation**
```bash
ngsui-cli add tabs
```

#### 🎨 **Tabs Examples**
```typescript
import { Component } from '@angular/core';
import { Tabs, Tab, TabPanel } from '@components/tabs/tabs';

@Component({
  selector: 'app-tabs-demo',
  standalone: true,
  imports: [Tabs, Tab, TabPanel],
  template: `
    <div class="space-y-6 p-6">
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Tabs</h3>
        <Tabs>
          <Tab label="Home">
            <TabPanel>
              Home content
            </TabPanel>
          </Tab>
          <Tab label="Profile">
            <TabPanel>
              Profile content
            </TabPanel>
          </Tab>
        </Tabs>
      </section>
    </div>
  `
})
export class TabsDemoComponent {}
```

---
### 🎨 **Theme Selector**
**Switch between light and dark themes**

#### 📦 **Installation**
```bash
ngsui-cli add theme-selector
```

#### 🎨 **Theme Selector Examples**
```typescript
import { Component } from '@angular/core';
import { ThemeSelector } from '@components/theme-selector/theme-selector';

@Component({
  selector: 'app-theme-selector-demo',
  standalone: true,
  imports: [ThemeSelector],
  template: `
    <div class="space-y-6 p-6">
      <section>
        <h3 class="text-lg font-semibold mb-3">Theme Selector</h3>
        <ThemeSelector />
      </section>
    </div>
  `
})
export class ThemeSelectorDemoComponent {}
```

---
### 🍞 **Toast**
**Transient notifications for feedback**

#### 📦 **Installation**
```bash
ngsui-cli add toast
```

#### 🎨 **Toast Examples**
```typescript
import { Component } from '@angular/core';
import { Toast, ToastTrigger, ToastContent } from '@components/toast/toast';

@Component({
  selector: 'app-toast-demo',
  standalone: true,
  imports: [Toast, ToastTrigger, ToastContent],
  template: `
    <div class="space-y-6 p-6">
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Toast</h3>
        <Toast>
          <ToastTrigger>
            <button>Show Toast</button>
          </ToastTrigger>
          <ToastContent>
            <p>This is a toast notification.</p>
          </ToastContent>
        </Toast>
      </section>
    </div>
  `
})
export class ToastDemoComponent {}
```

---
### 🛈 **Tooltip**
**Hover or focus tooltips for extra info**

#### 📦 **Installation**
```bash
ngsui-cli add tooltip
```

#### 🎨 **Tooltip Examples**
```typescript
import { Component } from '@angular/core';
import { Tooltip, TooltipTrigger, TooltipContent } from '@components/tooltip/tooltip';

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [Tooltip, TooltipTrigger, TooltipContent],
  template: `
    <div class="space-y-6 p-6">
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Tooltip</h3>
        <Tooltip>
          <TooltipTrigger>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent>
            <span>This is a tooltip message.</span>
          </TooltipContent>
        </Tooltip>
      </section>
    </div>
  `
})
export class TooltipDemoComponent {}
```
|------------------------|-------------------------|---------------------------|
| [Button](#-button) | [Input](#-input) | [Table](#-table) |
| [Badge](#-badge) | [Textarea](#-textarea) | [Calendar](#-calendar) |
| [Alert](#-alert) | [Label](#-label) | |
| [Card](#-card) | [Select](#-select) | |
| | [Radio Group](#-radio-group) | |
| | [Toggle](#-toggle) | |

| 💫 **Overlay Components** | � **Resources** |
|---------------------------|------------------|
| [Sheet](#-sheet) | [Installation](#-installation-1) |
| | [CLI Reference](#-cli-reference-1) |
| | [GitHub](#-github-1) |

---

## 🎯 **Core Components**

### 🔘 **Button**

**The most versatile component with 15+ variants and colors**

#### 📦 **Installation**
```bash
ngsui-cli add button
```

#### 🎨 **All Variants & Colors**
```typescript
import { Component } from '@angular/core';
import { Button } from '@components/button/button';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [Button],
  template: `
    <div class="space-y-6 p-6">
      <!-- 🎨 Basic Variants -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Variants</h3>
        <div class="flex gap-3 flex-wrap">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <!-- 🌈 Color Variants -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Color Variants</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="info">Info</Button>
          <Button variant="purple">Purple</Button>
          <Button variant="pink">Pink</Button>
          <Button variant="orange">Orange</Button>
          <Button variant="emerald">Emerald</Button>
          <Button variant="sky">Sky</Button>
        </div>
      </section>

      <!-- 📏 Sizes -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Sizes</h3>
        <div class="flex items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <svg class="w-4 h-4" fill="none" stroke="currentColor">
              <path d="M12 4v16m8-8H4"/>
            </svg>
          </Button>
        </div>
      </section>

      <!-- 🎭 States -->
      <section>
        <h3 class="text-lg font-semibold mb-3">States</h3>
        <div class="flex gap-3">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button class="loading">
            <svg class="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </button>
        </div>
      </section>

      <!-- 🎯 Real-world Examples -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Real-world Examples</h3>
        <div class="space-y-4">
          <!-- Action Bar -->
          <div class="flex justify-between items-center p-4 border rounded-lg">
            <h4 class="font-medium">Document Actions</h4>
            <div class="flex gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="ghost" size="sm">Share</Button>
              <button variant="destructive" size="sm">Delete</button>
            </div>
          </div>

          <!-- Form Buttons -->
          <div class="flex justify-end gap-3 p-4 border rounded-lg">
            <button variant="outline">Cancel</button>
            <button variant="default">Save Draft</button>
            <button variant="success">Publish</button>
          </div>

          <!-- Call-to-Action Section -->
          <div class="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h4 class="font-semibold mb-2">Ready to get started?</h4>
            <p class="text-gray-600 mb-4">Join thousands of developers using Angular SuperUI</p>
            <div class="flex justify-center gap-3">
              <button variant="outline">Learn More</button>
              <button size="lg">Get Started</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ButtonDemoComponent {}
```

#### ⚙️ **Properties**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `default \| secondary \| destructive \| outline \| ghost \| link \| success \| warning \| info \| purple \| pink \| orange \| emerald \| sky` | `default` | Button style variant |
| `size` | `default \| sm \| lg \| icon` | `default` | Button size |
| `disabled` | `boolean` | `false` | Disable the button |

---

### 🏷️ **Badge**

**Perfect for status indicators, labels, and notifications**

#### 📦 **Installation**
```bash
ngsui-cli add badge
```

#### 🎨 **Complete Badge Examples**
```typescript
import { Component } from '@angular/core';
import { Badge } from '@components/badge/badge';

@Component({
  selector: 'app-badge-demo',
  standalone: true,
  imports: [Badge],
  template: `
    <div class="space-y-6 p-6">
      <!-- 🎨 All Variants -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Badge Variants</h3>
        <div class="flex gap-3 flex-wrap">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </section>

      <!-- 🌈 Color Variants -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Color Variants</h3>
        <div class="flex gap-3 flex-wrap">
          <Badge variant="purple">Purple</Badge>
          <Badge variant="pink">Pink</Badge>
          <Badge variant="orange">Orange</Badge>
          <Badge variant="emerald">Emerald</Badge>
          <Badge variant="sky">Sky</Badge>
          <Badge variant="rose">Rose</Badge>
        </div>
      </section>

      <!-- 📊 Real-world Usage -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Real-world Examples</h3>
        <div class="space-y-4">
          <!-- Navigation with Badges -->
          <div class="flex gap-6 p-4 border rounded-lg">
            <div class="flex items-center gap-2">
              <span>Inbox</span>
              <Badge variant="destructive">12</Badge>
            </div>
            <div class="flex items-center gap-2">
              <span>Drafts</span>
              <Badge variant="secondary">3</Badge>
            </div>
            <div class="flex items-center gap-2">
              <span>Sent</span>
              <Badge variant="outline">24</Badge>
            </div>
          </div>

          <!-- Status Indicators -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex justify-between items-center p-3 border rounded">
              <span>Production</span>
              <Badge variant="success">Online</Badge>
            </div>
            <div class="flex justify-between items-center p-3 border rounded">
              <span>Staging</span>
              <Badge variant="warning">Deploying</Badge>
            </div>
            <div class="flex justify-between items-center p-3 border rounded">
              <span>Development</span>
              <Badge variant="info">Building</Badge>
            </div>
            <div class="flex justify-between items-center p-3 border rounded">
              <span>Legacy</span>
              <Badge variant="destructive">Offline</Badge>
            </div>
          </div>

          <!-- Feature Tags -->
          <div class="space-y-3">
            <h4 class="font-medium">Angular SuperUI Features</h4>
            <div class="flex gap-2 flex-wrap">
              <Badge variant="purple">TypeScript</Badge>
              <Badge variant="sky">Tailwind CSS</Badge>
              <Badge variant="emerald">Angular 20+</Badge>
              <Badge variant="orange">Tree Shakable</Badge>
              <Badge variant="pink">Accessible</Badge>
              <Badge variant="info">Local-First</Badge>
            </div>
          </div>

          <!-- User Roles -->
          <div class="space-y-2">
            <div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <span>John Doe</span>
              <badge variant="success">Admin</badge>
            </div>
            <div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <span>Jane Smith</span>
              <badge variant="info">Editor</badge>
            </div>
            <div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <span>Bob Johnson</span>
              <badge variant="outline">Viewer</badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class BadgeDemoComponent {}
```

---

### 🚨 **Alert**

**Eye-catching notifications and important messages**

#### 📦 **Installation**
```bash
ngsui-cli add alert
```

#### 🎨 **Complete Alert Examples**
```typescript
import { Component } from '@angular/core';
import { Alert } from '@components/alert/alert';

@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [Alert],
  template: `
    <div class="space-y-6 p-6">
      <!-- 🎨 All Variants -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Alert Variants</h3>
        <div class="space-y-3">
          <Alert variant="default">
            <h4 class="font-medium">Default Alert</h4>
            <p>This is a default alert with some important information.</p>
          </Alert>

          <Alert variant="destructive">
            <h4 class="font-medium">Error Alert</h4>
            <p>Something went wrong. Please check your input and try again.</p>
          </Alert>

          <Alert variant="success">
            <h4 class="font-medium">Success Alert</h4>
            <p>Your changes have been saved successfully!</p>
          </Alert>

          <Alert variant="warning">
            <h4 class="font-medium">Warning Alert</h4>
            <p>This action cannot be undone. Please proceed with caution.</p>
          </Alert>

          <Alert variant="info">
            <h4 class="font-medium">Info Alert</h4>
            <p>New features are now available. Check out the latest updates.</p>
          </Alert>
        </div>
      </section>

      <!-- 🎯 Advanced Examples -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Advanced Alert Examples</h3>
        <div class="space-y-4">
          <!-- Alert with Actions -->
          <alert variant="info" class="flex items-start justify-between">
            <div>
              <h4 class="font-medium">Update Available</h4>
              <p>A new version of Angular SuperUI is available.</p>
            </div>
            <div class="flex gap-2 ml-4">
              <button variant="outline" size="sm">Later</button>
              <button size="sm">Update Now</button>
            </div>
          </alert>

          <!-- Alert with Icon -->
          <alert variant="warning" class="flex items-center gap-3">
            <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <div>
              <h4 class="font-medium">Storage Almost Full</h4>
              <p>You're using 95% of your storage space. Consider upgrading your plan.</p>
            </div>
          </alert>

          <!-- Alert with Dismissible -->
          <alert variant="success" class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <div>
                <h4 class="font-medium">Payment Successful</h4>
                <p>Your subscription has been renewed for another month.</p>
              </div>
            </div>
            <button variant="ghost" size="sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </alert>

          <!-- Progress Alert -->
          <alert variant="info">
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <h4 class="font-medium">Uploading Files</h4>
                <span class="text-sm text-gray-500">3 of 5 complete</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full" style="width: 60%"></div>
              </div>
              <p class="text-sm">Please don't close this page while uploading.</p>
            </div>
          </alert>
        </div>
      </section>
    </div>
  `
})
export class AlertDemoComponent {}
```

---

### 🃏 **Card**

**Flexible container for content with header, body, and footer**

#### 📦 **Installation**
```bash
ngsui-cli add card
```

#### 🎨 **Complete Card Examples**
```typescript
import { Component } from '@angular/core';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@components/card/card';
import { Button } from '@components/button/button';
import { Badge } from '@components/badge/badge';

@Component({
  selector: 'app-card-demo',
  standalone: true,
  imports: [Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Badge],
  template: `
    <div class="space-y-6 p-6">
      <!-- 🎨 Basic Card -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Card</h3>
        <Card class="max-w-md">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the main content of the card.</p>
          </CardContent>
          <CardFooter>
            <Button>Action</Button>
          </CardFooter>
        </Card>
      </section>

      <!-- 🏢 Product Cards -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Product Cards</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <card class="hover:shadow-lg transition-shadow">
            <card-header class="pb-2">
              <div class="aspect-video bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-3"></div>
              <card-title>Pro Plan</card-title>
              <card-description>Perfect for growing teams</card-description>
            </card-header>
            <card-content>
              <div class="text-3xl font-bold mb-4">$29<span class="text-lg font-normal text-gray-500">/month</span></div>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Up to 50 team members
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Advanced analytics
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Priority support
                </li>
              </ul>
            </card-content>
            <card-footer>
              <button class="w-full">Choose Pro</button>
            </card-footer>
          </card>

          <card class="hover:shadow-lg transition-shadow border-purple-200">
            <card-header class="pb-2">
              <div class="flex items-center justify-between mb-3">
                <badge variant="purple">Most Popular</badge>
              </div>
              <div class="aspect-video bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg mb-3"></div>
              <card-title>Business Plan</card-title>
              <card-description>For large organizations</card-description>
            </card-header>
            <card-content>
              <div class="text-3xl font-bold mb-4">$99<span class="text-lg font-normal text-gray-500">/month</span></div>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Unlimited team members
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Custom integrations
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  24/7 phone support
                </li>
              </ul>
            </card-content>
            <card-footer>
              <button variant="purple" class="w-full">Choose Business</button>
            </card-footer>
          </card>

          <card class="hover:shadow-lg transition-shadow">
            <card-header class="pb-2">
              <div class="aspect-video bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg mb-3"></div>
              <card-title>Enterprise Plan</card-title>
              <card-description>Custom solutions</card-description>
            </card-header>
            <card-content>
              <div class="text-3xl font-bold mb-4">Custom</div>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Custom pricing
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Dedicated account manager
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  On-premise deployment
                </li>
              </ul>
            </card-content>
            <card-footer>
              <button variant="outline" class="w-full">Contact Sales</button>
            </card-footer>
          </card>
        </div>
      </section>

      <!-- 📊 Dashboard Cards -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Dashboard Cards</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Stats Card -->
          <card>
            <card-content class="p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Total Users</p>
                  <p class="text-2xl font-bold">12,345</p>
                  <p class="text-xs text-green-600">+12% from last month</p>
                </div>
                <div class="p-3 bg-blue-100 rounded-full">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                  </svg>
                </div>
              </div>
            </card-content>
          </card>

          <!-- Revenue Card -->
          <card>
            <card-content class="p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Revenue</p>
                  <p class="text-2xl font-bold">$89,432</p>
                  <p class="text-xs text-green-600">+8% from last month</p>
                </div>
                <div class="p-3 bg-green-100 rounded-full">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                </div>
              </div>
            </card-content>
          </card>

          <!-- Orders Card -->
          <card>
            <card-content class="p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Orders</p>
                  <p class="text-2xl font-bold">1,234</p>
                  <p class="text-xs text-red-600">-3% from last month</p>
                </div>
                <div class="p-3 bg-purple-100 rounded-full">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                  </svg>
                </div>
              </div>
            </card-content>
          </card>

          <!-- Growth Card -->
          <card>
            <card-content class="p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Growth Rate</p>
                  <p class="text-2xl font-bold">23.5%</p>
                  <p class="text-xs text-green-600">+5% from last month</p>
                </div>
                <div class="p-3 bg-orange-100 rounded-full">
                  <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                </div>
              </div>
            </card-content>
          </card>
        </div>
      </section>
    </div>
  `
})
export class CardDemoComponent {}
```

---

## 📝 Form Components

### 📝 **Input**

**Versatile input fields with validation states and icons**

#### 📦 **Installation**
```bash
ngsui-cli add input
```

#### 🎨 **Complete Input Examples**
```typescript
import { Component } from '@angular/core';
import { Input } from '@components/input/input.component';
import { Label } from '@components/label/label';

@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [Input, Label],
  template: `
    <div class="space-y-6 p-6">
      <!-- Basic Inputs -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Inputs</h3>
        <div class="space-y-4 max-w-md">
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>

          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>

          <div class="space-y-2">
            <Label for="search">Search</Label>
            <Input id="search" type="search" placeholder="Search..." />
          </div>

          <div class="space-y-2">
            <label for="disabled">Disabled Input</label>
            <Input id="disabled" placeholder="Disabled" disabled />
          </div>
        </div>
      </section>

      <!-- Input Sizes -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Input Sizes</h3>
        <div class="space-y-3 max-w-md">
          <input placeholder="Small input" class="h-8 text-sm" />
          <input placeholder="Default input" />
          <input placeholder="Large input" class="h-12 text-lg" />
        </div>
      </section>

      <!-- Validation States -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Validation States</h3>
        <div class="space-y-4 max-w-md">
          <div class="space-y-2">
            <label for="valid">Valid Input</label>
            <input id="valid" placeholder="Valid input" class="border-green-500 focus:ring-green-500" />
            <p class="text-sm text-green-600">Email is valid</p>
          </div>

          <div class="space-y-2">
            <label for="invalid">Invalid Input</label>
            <input id="invalid" placeholder="Invalid input" class="border-red-500 focus:ring-red-500" />
            <p class="text-sm text-red-600">Please enter a valid email address</p>
          </div>

          <div class="space-y-2">
            <label for="warning">Warning Input</label>
            <input id="warning" placeholder="Warning input" class="border-yellow-500 focus:ring-yellow-500" />
            <p class="text-sm text-yellow-600">This email is already registered</p>
          </div>
        </div>
      </section>

      <!-- Input with Icons -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Input with Icons</h3>
        <div class="space-y-4 max-w-md">
          <div class="relative">
            <svg class="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <input class="pl-10" placeholder="Username" />
          </div>

          <div class="relative">
            <svg class="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 9h14l1 12H4L5 9z"/>
            </svg>
            <input class="pl-10" type="email" placeholder="Email address" />
          </div>

          <div class="relative">
            <input class="pr-10" placeholder="Search" />
            <svg class="absolute right-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
      </section>

      <!-- Real-world Form Examples -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Real-world Examples</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Login Form -->
          <div class="p-4 border rounded-lg space-y-4">
            <h4 class="font-medium">Login Form</h4>
            <div class="space-y-2">
              <label for="login-email">Email</label>
              <input id="login-email" type="email" placeholder="john@example.com" />
            </div>
            <div class="space-y-2">
              <label for="login-password">Password</label>
              <input id="login-password" type="password" placeholder="••••••••" />
            </div>
            <button class="w-full">Sign In</button>
          </div>

          <!-- Contact Form -->
          <div class="p-4 border rounded-lg space-y-4">
            <h4 class="font-medium">Contact Form</h4>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-2">
                <label for="first-name">First Name</label>
                <input id="first-name" placeholder="John" />
              </div>
              <div class="space-y-2">
                <label for="last-name">Last Name</label>
                <input id="last-name" placeholder="Doe" />
              </div>
            </div>
            <div class="space-y-2">
              <label for="contact-email">Email</label>
              <input id="contact-email" type="email" placeholder="john@example.com" />
            </div>
            <div class="space-y-2">
              <label for="phone">Phone</label>
              <input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
            </div>
            <button class="w-full">Send Message</button>
          </div>
        </div>
      </section>
    </div>
  `
})
export class InputDemoComponent {}
```

---

### 📄 **Textarea**

**Multi-line text input for longer content**

#### 📦 **Installation**
```bash
ngsui-cli add textarea
```

#### 🎨 **Complete Textarea Examples**
```typescript
import { Component } from '@angular/core';
import { Textarea } from '@components/textarea/textarea';
import { Label } from '@components/label/label';

@Component({
  selector: 'app-textarea-demo',
  standalone: true,
  imports: [Textarea, Label],
  template: `
    <div class="space-y-6 p-6">
      <!-- Basic Textarea -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Textarea</h3>
        <div class="space-y-4 max-w-md">
          <div class="space-y-2">
            <label for="message">Message</label>
            <textarea id="message" placeholder="Enter your message here..."></textarea>
          </div>

          <div class="space-y-2">
            <label for="disabled-textarea">Disabled Textarea</label>
            <textarea id="disabled-textarea" placeholder="This is disabled" disabled></textarea>
          </div>
        </div>
      </section>

      <!-- Textarea Sizes -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Textarea Sizes</h3>
        <div class="space-y-4 max-w-md">
          <textarea placeholder="Small textarea (3 rows)" rows="3"></textarea>
          <textarea placeholder="Medium textarea (5 rows)" rows="5"></textarea>
          <textarea placeholder="Large textarea (8 rows)" rows="8"></textarea>
        </div>
      </section>

      <!-- Validation States -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Validation States</h3>
        <div class="space-y-4 max-w-md">
          <div class="space-y-2">
            <label for="valid-textarea">Valid Textarea</label>
            <textarea id="valid-textarea" class="border-green-500 focus:ring-green-500" placeholder="This content is valid"></textarea>
            <p class="text-sm text-green-600">Message looks good!</p>
          </div>

          <div class="space-y-2">
            <label for="invalid-textarea">Invalid Textarea</label>
            <textarea id="invalid-textarea" class="border-red-500 focus:ring-red-500" placeholder="This content has errors"></textarea>
            <p class="text-sm text-red-600">Message is too short (minimum 10 characters)</p>
          </div>
        </div>
      </section>

      <!-- Real-world Examples -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Real-world Examples</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Comment Form -->
          <div class="p-4 border rounded-lg space-y-4">
            <h4 class="font-medium">Leave a Comment</h4>
            <div class="space-y-2">
              <label for="comment">Your Comment</label>
              <textarea id="comment" rows="4" placeholder="Share your thoughts..."></textarea>
              <div class="flex justify-between items-center text-sm text-gray-500">
                <span>0/500 characters</span>
                <span>Markdown supported</span>
              </div>
            </div>
            <div class="flex justify-end gap-2">
              <button variant="outline">Preview</button>
              <button>Post Comment</button>
            </div>
          </div>

          <!-- Feedback Form -->
          <div class="p-4 border rounded-lg space-y-4">
            <h4 class="font-medium">Send Feedback</h4>
            <div class="space-y-2">
              <label for="feedback">Describe your experience</label>
              <textarea id="feedback" rows="5" placeholder="Tell us what you think..."></textarea>
            </div>
            <div class="space-y-2">
              <label for="suggestions">Suggestions for improvement</label>
              <textarea id="suggestions" rows="3" placeholder="How can we make this better?"></textarea>
            </div>
            <button class="w-full">Submit Feedback</button>
          </div>
        </div>
      </section>
    </div>
  `
})
export class TextareaDemoComponent {}
```

---

### 🏷️ **Label**

**Accessible labels for form controls**

#### 📦 **Installation**
```bash
ngsui-cli add label
```

#### 🎨 **Complete Label Examples**
```typescript
import { Component } from '@angular/core';
import { Label } from '@components/label/label';
import { Input } from '@components/input/input.component';
import { Checkbox } from '@components/checkbox/checkbox';

@Component({
  selector: 'app-label-demo',
  standalone: true,
  imports: [Label, Input, Checkbox],
  template: `
    <div class="space-y-6 p-6">
      <!-- Basic Labels -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Labels</h3>
        <div class="space-y-4 max-w-md">
          <div class="space-y-2">
            <label htmlFor="username">Username</label>
            <input id="username" placeholder="Enter username" />
          </div>

          <div class="space-y-2">
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" placeholder="Enter email" />
          </div>

          <div class="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label htmlFor="terms">I agree to the terms and conditions</label>
          </div>
        </div>
      </section>

      <!-- Required Labels -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Required Fields</h3>
        <div class="space-y-4 max-w-md">
          <div class="space-y-2">
            <label htmlFor="required-name">
              Full Name <span class="text-red-500">*</span>
            </label>
            <input id="required-name" placeholder="Enter your full name" required />
          </div>

          <div class="space-y-2">
            <label htmlFor="required-email">
              Email <span class="text-red-500">*</span>
            </label>
            <input id="required-email" type="email" placeholder="Enter your email" required />
          </div>
        </div>
      </section>

      <!-- Label with Descriptions -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Labels with Descriptions</h3>
        <div class="space-y-4 max-w-md">
          <div class="space-y-2">
            <label htmlFor="bio">
              Bio
              <span class="block text-sm font-normal text-gray-500">
                Tell us a little about yourself
              </span>
            </label>
            <textarea id="bio" rows="3" placeholder="Write your bio..."></textarea>
          </div>

          <div class="space-y-2">
            <label htmlFor="website">
              Website
              <span class="block text-sm font-normal text-gray-500">
                Include http:// or https://
              </span>
            </label>
            <input id="website" type="url" placeholder="https://example.com" />
          </div>
        </div>
      </section>

      <!-- Inline Labels -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Inline Labels</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-4">
            <label htmlFor="inline1" class="w-24">Name:</label>
            <input id="inline1" placeholder="Enter name" />
          </div>

          <div class="flex items-center gap-4">
            <label htmlFor="inline2" class="w-24">Email:</label>
            <input id="inline2" type="email" placeholder="Enter email" />
          </div>

          <div class="flex items-center gap-4">
            <label htmlFor="inline3" class="w-24">Phone:</label>
            <input id="inline3" type="tel" placeholder="Enter phone" />
          </div>
        </div>
      </section>
    </div>
  `
})
export class LabelDemoComponent {}
```

---

### 📋 **Select**

**Dropdown selection component with options**

#### 📦 **Installation**
```bash
ngsui-cli add select
```

#### 🎨 **Complete Select Examples**
```typescript
import { Component } from '@angular/core';
import { Select } from '@components/select/select';
import { Label } from '@components/label/label';

@Component({
  selector: 'app-select-demo',
  standalone: true,
  imports: [Select, Label],
  template: `
    <div class="space-y-6 p-6">
      <!-- Basic Select -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Select</h3>
        <div class="space-y-4 max-w-md">
          <div class="space-y-2">
            <label htmlFor="country">Country</label>
            <select id="country">
              <select-trigger>
                <select-value placeholder="Select a country" />
              </select-trigger>
              <select-content>
                <select-item value="us">United States</select-item>
                <select-item value="ca">Canada</select-item>
                <select-item value="uk">United Kingdom</select-item>
                <select-item value="au">Australia</select-item>
                <select-item value="de">Germany</select-item>
              </select-content>
            </select>
          </div>

          <div class="space-y-2">
            <label htmlFor="language">Language</label>
            <select id="language" disabled>
              <select-trigger>
                <select-value placeholder="Select a language" />
              </select-trigger>
              <select-content>
                <select-item value="en">English</select-item>
                <select-item value="es">Spanish</select-item>
                <select-item value="fr">French</select-item>
              </select-content>
            </select>
          </div>
        </div>
      </section>

      <!-- Select with Groups -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Grouped Options</h3>
        <div class="space-y-4 max-w-md">
          <div class="space-y-2">
            <label htmlFor="timezone">Timezone</label>
            <select id="timezone">
              <select-trigger>
                <select-value placeholder="Select timezone" />
              </select-trigger>
              <select-content>
                <select-group>
                  <select-label>North America</select-label>
                  <select-item value="est">Eastern Standard Time</select-item>
                  <select-item value="cst">Central Standard Time</select-item>
                  <select-item value="mst">Mountain Standard Time</select-item>
                  <select-item value="pst">Pacific Standard Time</select-item>
                </select-group>
                <select-group>
                  <select-label>Europe</select-label>
                  <select-item value="gmt">Greenwich Mean Time</select-item>
                  <select-item value="cet">Central European Time</select-item>
                  <select-item value="eet">Eastern European Time</select-item>
                </select-group>
              </select-content>
            </select>
          </div>
        </div>
      </section>

      <!-- Multiple Select Examples -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Real-world Examples</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- User Profile Form -->
          <div class="p-4 border rounded-lg space-y-4">
            <h4 class="font-medium">Profile Settings</h4>
            <div class="space-y-2">
              <label htmlFor="role">Role</label>
              <select id="role">
                <select-trigger>
                  <select-value placeholder="Select your role" />
                </select-trigger>
                <select-content>
                  <select-item value="developer">Developer</select-item>
                  <select-item value="designer">Designer</select-item>
                  <select-item value="manager">Manager</select-item>
                  <select-item value="analyst">Analyst</select-item>
                </select-content>
              </select>
            </div>

            <div class="space-y-2">
              <label htmlFor="experience">Experience Level</label>
              <select id="experience">
                <select-trigger>
                  <select-value placeholder="Select experience" />
                </select-trigger>
                <select-content>
                  <select-item value="junior">Junior (0-2 years)</select-item>
                  <select-item value="mid">Mid-level (2-5 years)</select-item>
                  <select-item value="senior">Senior (5+ years)</select-item>
                  <select-item value="lead">Lead (8+ years)</select-item>
                </select-content>
              </select>
            </div>
          </div>

          <!-- Settings Form -->
          <div class="p-4 border rounded-lg space-y-4">
            <h4 class="font-medium">App Settings</h4>
            <div class="space-y-2">
              <label htmlFor="theme">Theme</label>
              <select id="theme">
                <select-trigger>
                  <select-value placeholder="Choose theme" />
                </select-trigger>
                <select-content>
                  <select-item value="light">Light</select-item>
                  <select-item value="dark">Dark</select-item>
                  <select-item value="system">System</select-item>
                </select-content>
              </select>
            </div>

            <div class="space-y-2">
              <label htmlFor="notifications">Notification Frequency</label>
              <select id="notifications">
                <select-trigger>
                  <select-value placeholder="Select frequency" />
                </select-trigger>
                <select-content>
                  <select-item value="realtime">Real-time</select-item>
                  <select-item value="hourly">Hourly</select-item>
                  <select-item value="daily">Daily</select-item>
                  <select-item value="weekly">Weekly</select-item>
                  <select-item value="never">Never</select-item>
                </select-content>
              </select>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class SelectDemoComponent {}
```

---

### 🔘 **Radio Group**

**Single selection from multiple options**

#### 📦 **Installation**
```bash
ngsui-cli add radio-group
```

#### 🎨 **Complete Radio Group Examples**
```typescript
import { Component } from '@angular/core';
import { RadioGroup, RadioGroupItem } from '@components/radio-group/radio-group';
import { Label } from '@components/label/label';

@Component({
  selector: 'app-radio-group-demo',
  standalone: true,
  imports: [RadioGroup, Label],
  template: `
    <div class="space-y-6 p-6">
      <!-- Basic Radio Group -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Radio Group</h3>
        <div class="space-y-4 max-w-md">
          <div class="space-y-3">
            <label class="font-medium">Preferred Contact Method</label>
            <RadioGroup defaultValue="email">
              <div class="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <label htmlFor="email">Email</label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="phone" />
                <label htmlFor="phone">Phone</label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem value="sms" id="sms" />
                <label htmlFor="sms">SMS</label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </section>

      <!-- Horizontal Radio Group -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Horizontal Layout</h3>
        <div class="space-y-4 max-w-md">
          <div class="space-y-3">
            <label class="font-medium">Size</label>
            <RadioGroup defaultValue="medium" class="flex gap-6">
              <div class="flex items-center space-x-2">
                <RadioGroupItem value="small" id="small" />
                <label htmlFor="small">Small</label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <label htmlFor="medium">Medium</label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem value="large" id="large" />
                <label htmlFor="large">Large</label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </section>

      <!-- Radio Group with Descriptions -->
      <section>
        <h3 class="text-lg font-semibold mb-3">With Descriptions</h3>
        <div class="space-y-4 max-w-lg">
          <div class="space-y-3">
            <label class="font-medium">Subscription Plan</label>
            <RadioGroup defaultValue="pro">
              <div class="flex items-start space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="free" id="free-plan" className="mt-1" />
                <div class="flex-1">
                  <label htmlFor="free-plan" class="font-medium">Free Plan</label>
                  <p class="text-sm text-gray-500">Perfect for getting started. Includes basic features.</p>
                  <p class="text-sm font-medium">$0/month</p>
                </div>
              </div>
              <div class="flex items-start space-x-3 p-3 border rounded-lg border-blue-200 bg-blue-50">
                <RadioGroupItem value="pro" id="pro-plan" className="mt-1" />
                <div class="flex-1">
                  <label htmlFor="pro-plan" class="font-medium">Pro Plan</label>
                  <p class="text-sm text-gray-500">For growing businesses. Advanced features included.</p>
                  <p class="text-sm font-medium">$29/month</p>
                </div>
              </div>
              <div class="flex items-start space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="enterprise" id="enterprise-plan" className="mt-1" />
                <div class="flex-1">
                  <label htmlFor="enterprise-plan" class="font-medium">Enterprise Plan</label>
                  <p class="text-sm text-gray-500">For large organizations. Custom solutions available.</p>
                  <p class="text-sm font-medium">Contact us</p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
      </section>

      <!-- Real-world Examples -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Real-world Examples</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Survey Form -->
          <div class="p-4 border rounded-lg space-y-4">
            <h4 class="font-medium">Customer Satisfaction Survey</h4>
            <div class="space-y-3">
              <label class="font-medium">How would you rate our service?</label>
              <radio-group>
                <div class="flex items-center space-x-2">
                  <radio-group-item value="excellent" id="excellent" />
                  <label htmlFor="excellent">Excellent</label>
                </div>
                <div class="flex items-center space-x-2">
                  <radio-group-item value="good" id="good" />
                  <label htmlFor="good">Good</label>
                </div>
                <div class="flex items-center space-x-2">
                  <radio-group-item value="average" id="average" />
                  <label htmlFor="average">Average</label>
                </div>
                <div class="flex items-center space-x-2">
                  <radio-group-item value="poor" id="poor" />
                  <label htmlFor="poor">Poor</label>
                </div>
              </radio-group>
            </div>
          </div>

          <!-- Shipping Options -->
          <div class="p-4 border rounded-lg space-y-4">
            <h4 class="font-medium">Shipping Options</h4>
            <radio-group defaultValue="standard">
              <div class="flex items-center justify-between p-2 border rounded">
                <div class="flex items-center space-x-2">
                  <radio-group-item value="standard" id="standard" />
                  <label htmlFor="standard">Standard Shipping</label>
                </div>
                <span class="text-sm">Free</span>
              </div>
              <div class="flex items-center justify-between p-2 border rounded">
                <div class="flex items-center space-x-2">
                  <radio-group-item value="express" id="express" />
                  <label htmlFor="express">Express Shipping</label>
                </div>
                <span class="text-sm">$9.99</span>
              </div>
              <div class="flex items-center justify-between p-2 border rounded">
                <div class="flex items-center space-x-2">
                  <radio-group-item value="overnight" id="overnight" />
                  <label htmlFor="overnight">Overnight Shipping</label>
                </div>
                <span class="text-sm">$24.99</span>
              </div>
            </radio-group>
          </div>
        </div>
      </section>
    </div>
  `
})
export class RadioGroupDemoComponent {}
```

---

### ⚡ **Toggle**

**Binary toggle switches for quick on/off actions**

#### 📦 **Installation**
```bash
ngsui-cli add toggle
```

#### 🎨 **Complete Toggle Examples**
```typescript
import { Component } from '@angular/core';
import { Toggle } from '@components/toggle/toggle';
import { Label } from '@components/label/label';

@Component({
  selector: 'app-toggle-demo',
  standalone: true,
  imports: [Toggle, Label],
  template: `
    <div class="space-y-6 p-6">
      <!-- Basic Toggles -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Toggles</h3>
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <Toggle id="toggle1" />
            <label for="toggle1">Default Toggle</label>
          </div>

          <div class="flex items-center space-x-2">
            <Toggle id="toggle2" defaultPressed />
            <label for="toggle2">Pressed Toggle</label>
          </div>

          <div class="flex items-center space-x-2">
            <Toggle id="toggle3" disabled />
            <label for="toggle3" class="text-gray-400">Disabled Toggle</label>
          </div>
        </div>
      </section>

      <!-- Toggle Variants -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Toggle Variants</h3>
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <Toggle variant="default">
              <svg class="w-4 h-4" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </Toggle>
            <label>Default with Icon</label>
          </div>

          <div class="flex items-center space-x-2">
            <Toggle variant="outline">
              <svg class="w-4 h-4" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </Toggle>
            <label>Outline with Heart</label>
          </div>
        </div>
      </section>

      <!-- Toggle Sizes -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Toggle Sizes</h3>
        <div class="flex items-center space-x-4">
          <Toggle size="sm">S</Toggle>
          <Toggle size="default">M</Toggle>
          <Toggle size="lg">L</Toggle>
        </div>
      </section>

      <!-- Real-world Examples -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Real-world Examples</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Toolbar Example -->
          <div class="p-4 border rounded-lg space-y-4">
            <h4 class="font-medium">Text Editor Toolbar</h4>
            <div class="flex items-center space-x-1 p-2 border rounded">
              <Toggle size="sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h9m-9 4h6"/>
                </svg>
              </Toggle>
              <Toggle size="sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
                </svg>
              </Toggle>
              <Toggle size="sm" defaultPressed>
                <svg class="w-4 h-4" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </Toggle>
            </div>
          </div>

          <!-- Settings Example -->
          <div class="p-4 border rounded-lg space-y-4">
            <h4 class="font-medium">Account Settings</h4>
            <div class="flex items-center space-x-2">
              <Toggle id="notifications-toggle" />
              <label for="notifications-toggle" class="font-medium">Email Notifications</label>
            </div>
            <div class="flex items-center space-x-2">
              <Toggle id="sms-toggle" />
              <label for="sms-toggle" class="font-medium">SMS Notifications</label>
            </div>
            <div class="flex items-center space-x-2">
              <Toggle id="dark-mode-toggle" defaultPressed />
              <label for="dark-mode-toggle" class="font-medium">Dark Mode</label>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ToggleDemoComponent {}
```

---

### 📅 **Calendar**

**Event calendar with month view and date selection**

#### 📦 **Installation**
```bash
ngsui-cli add calendar
```

#### 🎨 **Complete Calendar Examples**
```typescript
import { Component } from '@angular/core';
import { Calendar, DatePicker } from '@components/calendar/calendar';

@Component({
  selector: 'app-calendar-demo',
  standalone: true,
  imports: [Calendar],
  template: `
    <div class="space-y-6 p-6">
      <!-- Basic Calendar -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Calendar</h3>
        <Calendar></Calendar>
      </section>

      <!-- Calendar with Props -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Calendar with Selection</h3>
        <div class="space-y-4">
          <Calendar [selectedDate]="selectedDate" (dateSelect)="onDateSelect($event)"></Calendar>
          <p class="text-sm text-gray-600">Selected: {{ selectedDate ? (selectedDate | date) : 'None' }}</p>
        </div>
      </section>

      <!-- Date Picker -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Date Picker</h3>
        <div class="space-y-4">
          <DatePicker placeholder="Pick a date" (dateChange)="onDateChange($event)"></DatePicker>
        </div>
      </section>
              <div class="text-sm text-center text-gray-400">8</div>
            </calendar-day>
            <calendar-day>
              <div class="text-sm text-center text-gray-400">9</div>
            </calendar-day>
            <calendar-day>
              <div class="text-sm text-center text-gray-400">10</div>
            </calendar-day>
          </calendar-days>
        </calendar>
      </section>

      <!-- Calendar with Events -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Calendar with Events</h3>
        <calendar>
          <calendar-header>
            <button>
              <svg class="w-5 h-5" fill="none" stroke="currentColor">
                <path d="M12 5v14m7-7H5"/>
              </svg>
            </button>
            <div class="flex-1 text-center">
              <h2 class="text-lg font-bold">March 2023</h2>
              <p class="text-sm text-gray-500">1, 2023 - 31, 2023</p>
            </div>
            <button>
              <svg class="w-5 h-5" fill="none" stroke="currentColor">
                <path d="M16 12H8m4-4v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
            </button>
          </calendar-header>
          <calendar-weekdays>
            <calendar-weekday>Sun</calendar-weekday>
            <calendar-weekday>Mon</calendar-weekday>
            <calendar-weekday>Tue</calendar-weekday>
            <calendar-weekday>Wed</calendar-weekday>
            <calendar-weekday>Thu</calendar-weekday>
            <calendar-weekday>Fri</calendar-weekday>
            <calendar-weekday>Sat</calendar-weekday>
          </calendar-weekdays>
          <calendar-days>
            <calendar-day>
              <div class="text-sm text-center text-gray-400">1</div>
            </calendar-day>
            <calendar-day>
              <div class="text-sm text-center text-gray-400">2</div>
            </calendar-day>
            <calendar-day>
              <div class="text-sm text-center text-gray-400">3</div>
            </calendar-day>
            <calendar-day>
              <div class="text-sm text-center text-gray-400">4</div>
            </calendar-day>
            <calendar-day>
              <div class="text-sm text-center text-gray-400">5</div>
            </calendar-day>
            <calendar-day>
              <div class="text-sm text-center text-gray-400">6</div>
            </calendar-day>
            <calendar-day>
              <div class="text-sm text-center text-gray-400">7</div>
            </calendar-day>
            <calendar-day>
              <div class="text-sm text-center text-gray-400">8</div>
            </calendar-day>
            <calendar-day>
              <div class="text-sm text-center text-gray-400">9</div>
            </calendar-day>
            <calendar-day>
              <div class="text-sm text-center text-gray-400">10</div>
            </calendar-day>
          </calendar-days>
        </calendar>
      </section>
    </div>
  `
})
export class CalendarDemoComponent {
  eventDates = [new Date(2023, 4, 12), new Date(2023, 4, 18), new Date(2023, 4, 25)];
  importantDates = [new Date(2023, 4, 5), new Date(2023, 4, 30)];
  
  handleEventDate(date: Date) {
    console.log('Selected event date:', date);
  }
}
```

---

### 📊 **Table**

**Data tables with sorting, filtering, and pagination**

#### 📦 **Installation**
```bash
ngsui-cli add table
```

#### 🎨 **Complete Table Examples**
```typescript
import { Component } from '@angular/core';
import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from '@components/table/table';
import { Button } from '@components/button/button';
import { Badge } from '@components/badge/badge';

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [Table, Button, Badge],
  template: `
    <div class="space-y-6 p-6">
      <!-- Basic Table -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Basic Table</h3>
        <div class="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell><Badge variant="outline">Paid</Badge></TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV002</TableCell>
                <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                <TableCell>PayPal</TableCell>
                <TableCell className="text-right">$150.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  `
})
export class TableDemoComponent {}
```

---

### 📋 **Sheet**
**Slide-out panels for secondary content and forms**

#### 📦 **Installation**
```bash
ngsui-cli add sheet
```

#### 🎨 **Sheet API Components**
- **Sheet** - Root container component
- **SheetContent** - Main content container with slide animations
- **SheetHeader** - Header section with title and description
- **SheetTitle** - Sheet title component
- **SheetDescription** - Sheet description text
- **SheetFooter** - Footer section for action buttons
- **SheetTrigger** - Button component that opens the sheet
- **SheetClose** - Close button with X icon

#### 🔧 **Sheet Props**
**Sheet Component:**
- `open: boolean` - Controls sheet visibility (default: false)
- `(openChange): EventEmitter<boolean>` - Emitted when open state changes

**SheetContent Component:**
- `open: boolean` - Controls content visibility (default: false)
- `side: 'top' | 'bottom' | 'left' | 'right'` - Sheet slide direction (default: 'right')
- `className?: string` - Additional CSS classes
- `(openChange): EventEmitter<boolean>` - Emitted when open state changes

**SheetTrigger Component:**
- `className?: string` - Additional CSS classes
- `(click): EventEmitter<void>` - Emitted when trigger is clicked

**SheetClose Component:**
- `className?: string` - Additional CSS classes
- `(close): EventEmitter<void>` - Emitted when close button is clicked

#### 🎨 **Complete Sheet Examples**
```typescript
import { Component } from '@angular/core';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger, SheetClose } from '@components/sheet';
import { Button } from '@components/button';

@Component({
  selector: 'app-sheet-demo',
  standalone: true,
  imports: [Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger, SheetClose, Button],
  template: `
    <div class="space-y-6 p-6">
      <!-- Basic Right Sheet -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Right Side Sheet</h3>
        <div>
          <Button (click)="openRightSheet()">Open Right Sheet</Button>
          
          <SheetContent 
            [open]="isRightSheetOpen"
            [side]="'right'"
            (openChange)="onRightSheetChange($event)"
          >
            <SheetClose (close)="closeRightSheet()"></SheetClose>
            
            <SheetHeader>
              <SheetTitle>Edit Profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <label for="name" class="text-right">Name</label>
                <input 
                  id="name" 
                  value="Pedro Duarte" 
                  class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <label for="username" class="text-right">Username</label>
                <input 
                  id="username" 
                  value="@peduarte" 
                  class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                />
              </div>
            </div>
            
            <SheetFooter>
              <Button variant="outline" (click)="closeRightSheet()">
                Cancel
              </Button>
              <Button type="submit" (click)="saveProfile()">
                Save changes
              </Button>
            </SheetFooter>
          </SheetContent>
        </div>
      </section>

      <!-- Left Side Sheet -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Left Side Sheet</h3>
        <div>
          <Button variant="outline" (click)="openLeftSheet()">Open Left Sheet</Button>
          
          <SheetContent 
            [open]="isLeftSheetOpen"
            [side]="'left'"
            (openChange)="onLeftSheetChange($event)"
          >
            <SheetClose (close)="closeLeftSheet()"></SheetClose>
            
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>
                Navigate through different sections of the application.
              </SheetDescription>
            </SheetHeader>
            
            <div class="py-4">
              <nav class="space-y-2">
                <a href="#" class="block px-3 py-2 rounded-md hover:bg-accent">Dashboard</a>
                <a href="#" class="block px-3 py-2 rounded-md hover:bg-accent">Profile</a>
                <a href="#" class="block px-3 py-2 rounded-md hover:bg-accent">Settings</a>
                <a href="#" class="block px-3 py-2 rounded-md hover:bg-accent">Help</a>
              </nav>
            </div>
            
            <SheetFooter>
              <Button variant="outline" class="w-full" (click)="closeLeftSheet()">
                Close Menu
              </Button>
            </SheetFooter>
          </SheetContent>
        </div>
      </section>

      <!-- Top Sheet -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Top Sheet</h3>
        <div>
          <Button variant="secondary" (click)="openTopSheet()">Open Top Sheet</Button>
          
          <SheetContent 
            [open]="isTopSheetOpen"
            [side]="'top'"
            (openChange)="onTopSheetChange($event)"
          >
            <SheetClose (close)="closeTopSheet()"></SheetClose>
            
            <SheetHeader>
              <SheetTitle>Notification Banner</SheetTitle>
              <SheetDescription>
                Important system notifications and announcements.
              </SheetDescription>
            </SheetHeader>
            
            <div class="py-4">
              <div class="bg-blue-50 border border-blue-200 rounded-md p-4">
                <p class="text-sm text-blue-800">
                  System maintenance is scheduled for tonight from 2:00 AM to 4:00 AM EST.
                  Please save your work before this time.
                </p>
              </div>
            </div>
            
            <SheetFooter>
              <Button (click)="acknowledgeNotification()">
                Acknowledge
              </Button>
            </SheetFooter>
          </SheetContent>
        </div>
      </section>

      <!-- Bottom Sheet -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Bottom Sheet</h3>
        <div>
          <Button variant="success" (click)="openBottomSheet()">Open Bottom Sheet</Button>
          
          <SheetContent 
            [open]="isBottomSheetOpen"
            [side]="'bottom'"
            (openChange)="onBottomSheetChange($event)"
          >
            <SheetClose (close)="closeBottomSheet()"></SheetClose>
            
            <SheetHeader>
              <SheetTitle>Quick Actions</SheetTitle>
              <SheetDescription>
                Commonly used actions and shortcuts.
              </SheetDescription>
            </SheetHeader>
            
            <div class="py-4">
              <div class="grid grid-cols-2 gap-4">
                <Button variant="outline" class="h-20">
                  <div class="text-center">
                    <div class="text-lg">📁</div>
                    <div class="text-sm">New Folder</div>
                  </div>
                </Button>
                <Button variant="outline" class="h-20">
                  <div class="text-center">
                    <div class="text-lg">📄</div>
                    <div class="text-sm">New File</div>
                  </div>
                </Button>
                <Button variant="outline" class="h-20">
                  <div class="text-center">
                    <div class="text-lg">📷</div>
                    <div class="text-sm">Camera</div>
                  </div>
                </Button>
                <Button variant="outline" class="h-20">
                  <div class="text-center">
                    <div class="text-lg">📂</div>
                    <div class="text-sm">Gallery</div>
                  </div>
                </Button>
              </div>
            </div>
            
            <SheetFooter>
              <Button variant="outline" class="w-full" (click)="closeBottomSheet()">
                Close Actions
              </Button>
            </SheetFooter>
          </SheetContent>
        </div>
      </section>

      <!-- Action Results -->
      <section>
        <h3 class="text-lg font-semibold mb-3">Sheet Results</h3>
        <div class="p-4 bg-gray-50 rounded-lg">
          <h4 class="font-medium mb-2">Last Action:</h4>
          <p class="text-sm text-gray-600">
            {{ lastAction || 'No action performed yet' }}
          </p>
        </div>
      </section>
    </div>
  `
})
export class SheetDemoComponent {
  // Sheet state management
  isRightSheetOpen = false;
  isLeftSheetOpen = false;
  isTopSheetOpen = false;
  isBottomSheetOpen = false;
  lastAction = '';

  // Right Sheet Methods
  openRightSheet() {
    this.isRightSheetOpen = true;
  }

  closeRightSheet() {
    this.isRightSheetOpen = false;
  }

  onRightSheetChange(open: boolean) {
    this.isRightSheetOpen = open;
  }

  // Left Sheet Methods
  openLeftSheet() {
    this.isLeftSheetOpen = true;
  }

  closeLeftSheet() {
    this.isLeftSheetOpen = false;
  }

  onLeftSheetChange(open: boolean) {
    this.isLeftSheetOpen = open;
  }

  // Top Sheet Methods
  openTopSheet() {
    this.isTopSheetOpen = true;
  }

  closeTopSheet() {
    this.isTopSheetOpen = false;
  }

  onTopSheetChange(open: boolean) {
    this.isTopSheetOpen = open;
  }

  // Bottom Sheet Methods
  openBottomSheet() {
    this.isBottomSheetOpen = true;
  }

  closeBottomSheet() {
    this.isBottomSheetOpen = false;
  }

  onBottomSheetChange(open: boolean) {
    this.isBottomSheetOpen = open;
  }

  // Action Methods
  saveProfile() {
    this.lastAction = 'Profile saved successfully';
    this.closeRightSheet();
  }

  acknowledgeNotification() {
    this.lastAction = 'Notification acknowledged';
    this.closeTopSheet();
  }
}
```

---

## 📚 **Resources**

### 📦 **Installation**

Get started with Angular SuperUI in your project:

```bash
# Install the CLI
npm install -g ngsui-cli

# Initialize in your project
ngsui-cli init

# Add components
ngsui-cli add button badge alert
```

### 🛠️ **CLI Reference**

The Angular SuperUI CLI provides commands for easy component management:

- `ngsui-cli init` - Initialize Angular SuperUI in your project
- `ngsui-cli add <component>` - Add a specific component
- `ngsui-cli list` - List all available components
- `ngsui-cli --help` - Show help information

### 🔗 **GitHub**

**Repository**: [https://github.com/bhaimicrosoft/angular-superui](https://github.com/bhaimicrosoft/angular-superui)

- 🌟 **Star the repo** to show your support
- 🐛 **Report issues** or request features
- 🤝 **Contribute** to the project
- 📖 **Read the documentation** for detailed guides

### 📄 **License**

Angular SuperUI is open source software licensed under the [MIT License](https://github.com/bhaimicrosoft/angular-superui/blob/main/LICENSE).

---

**Built with ❤️ by the Angular SuperUI Team**