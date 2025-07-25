# 🎯 Component Selectors Quick Reference (v1.0.7)

<div align="center">

**✨ Complete selector guide for all 26 Angular SuperUI components ✨**

[![🚀 Live Demo](https://img.shields.io/badge/🚀-Live%20Demo-FF6B6B?style=for-the-badge&logo=vercel&logoColor=white)](https://angular-superui.vercel.app/)
[![📱 Mobile Friendly](https://img.shields.io/badge/📱-Mobile%20Friendly-45B7D1?style=for-the-badge&logo=mobile&logoColor=white)](https://angular-superui.vercel.app/)

</div>

This document provides a comprehensive reference for all Angular SuperUI component selectors and their correct usage in **v1.0.7**.

## 📊 Overview

Angular SuperUI v1.0.7 includes **26 production-ready components** with consistent PascalCase selectors and full TypeScript support.

### 🎨 Component Categories

| Category | Count | Components |
|----------|-------|------------|
| **🎯 Core Components** | 8 | Button, InputComponent, Checkbox, RadioGroup/RadioGroupItem, Badge, Alert, Card, AspectRatio |
| **🧭 Navigation** | 5 | Breadcrumb (7 selectors), DropdownMenu, Pagination, Drawer |
| **🖼️ Display** | 4 | Avatar, Carousel, DataTable, ProgressComponent |
| **💫 Overlay** | 4 | AlertDialog, ContextMenu, Dialog, Popover |
| **🔧 Form** | 4 | Calendar, Collapsible, Combobox, InputOTP |
| **⚙️ Utility** | 2 | Accordion, ThemeSwitcher |

---

## 🎯 Core Components

### 🔘 Button Component

```typescript
import { Button } from 'angular-superui';

// Usage
<Button variant="default" size="md">Click me</Button>
```

**Selector:** `<Button>`  
**Class:** `Button`  
**Props:** `variant`, `size`, `disabled`, `loading`

### 📝 Input Component

```typescript
import { InputComponent } from 'angular-superui';

// Usage
<InputComponent placeholder="Enter text..." [(ngModel)]="value" />
```

**Selector:** `<InputComponent>`  
**Class:** `InputComponent`  
**Props:** `placeholder`, `disabled`, `type`, `value`

### ☑️ Checkbox Component

```typescript
import { Checkbox } from 'angular-superui';

// Usage
<Checkbox [(checked)]="isChecked">Accept terms</Checkbox>
```

**Selector:** `<Checkbox>`  
**Class:** `Checkbox`  
**Props:** `checked`, `disabled`, `indeterminate`

### 🔘 RadioGroup Components

```typescript
import { 
  RadioGroup,
  RadioGroupItem 
} from 'angular-superui';

// Usage
<RadioGroup [(value)]="selectedValue">
  <RadioGroupItem value="option1">Option 1</RadioGroupItem>
  <RadioGroupItem value="option2">Option 2</RadioGroupItem>
</RadioGroup>
```

**Selectors:** `<RadioGroup>`, `<RadioGroupItem>`  
**Classes:** `RadioGroup`, `RadioGroupItem`

### 🏷️ Badge Component

```typescript
import { Badge } from 'angular-superui';

// Usage
<Badge variant="default">New</Badge>
```

**Selector:** `<Badge>`  
**Class:** `Badge`  
**Props:** `variant`, `size`

### 🚨 Alert Components

```typescript
import { 
  Alert, 
  AlertTitle, 
  AlertDescription, 
  AlertIcon 
} from 'angular-superui';

// Usage
<Alert variant="success">
  <AlertIcon>✅</AlertIcon>
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Operation completed successfully.</AlertDescription>
</Alert>
```

**Selectors:** `<Alert>`, `<AlertTitle>`, `<AlertDescription>`, `<AlertIcon>`  
**Classes:** `Alert`, `AlertTitle`, `AlertDescription`, `AlertIcon`

### 🃏 Card Components

```typescript
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from 'angular-superui';

// Usage
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Selectors:** `<Card>`, `<CardHeader>`, `<CardTitle>`, `<CardDescription>`, `<CardContent>`, `<CardFooter>`  
**Classes:** `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

### 📐 AspectRatio Component

```typescript
import { AspectRatio } from 'angular-superui';

// Usage
<AspectRatio ratio="16/9">
  <img src="image.jpg" alt="Image" class="object-cover w-full h-full" />
</AspectRatio>
```

**Selector:** `<AspectRatio>`  
**Class:** `AspectRatio`  
**Props:** `ratio`

---

## 🧭 Navigation Components

### 🍞 Breadcrumb Components

```typescript
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbRouterLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
} from 'angular-superui';

// Usage
<nav Breadcrumb>
  <ol BreadcrumbList>
    <li BreadcrumbItem>
      <a BreadcrumbLink href="/">Home</a>
    </li>
    <li BreadcrumbSeparator>/</li>
    <li BreadcrumbItem>
      <span BreadcrumbPage>Current Page</span>
    </li>
  </ol>
</nav>
```

**Selectors:** 
- `nav[Breadcrumb]`
- `ol[BreadcrumbList]`
- `li[BreadcrumbItem]`
- `a[BreadcrumbLink]`
- `a[BreadcrumbRouterLink]`
- `span[BreadcrumbPage]`
- `li[BreadcrumbSeparator]`
- `span[BreadcrumbEllipsis]`

### 📥 DropdownMenu Component

```typescript
import { DropdownMenu } from 'angular-superui';

// Usage
<DropdownMenu>
  <!-- Menu content -->
</DropdownMenu>
```

**Selector:** `<DropdownMenu>`  
**Class:** `DropdownMenu`

### 📄 Pagination Component

```typescript
import { Pagination } from 'angular-superui';

// Usage
<Pagination 
  [totalItems]="100" 
  [itemsPerPage]="10"
  [(currentPage)]="currentPage">
</Pagination>
```

**Selector:** `<Pagination>`  
**Class:** `Pagination`

### 📱 Drawer Components

```typescript
import { 
  Drawer,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription
} from 'angular-superui';

// Usage
<Drawer>
  <DrawerHeader>
    <DrawerTitle>Drawer Title</DrawerTitle>
    <DrawerDescription>Drawer description</DrawerDescription>
  </DrawerHeader>
  <DrawerFooter>
    <!-- Footer content -->
  </DrawerFooter>
</Drawer>
```

**Selectors:** `<Drawer>`, `<DrawerHeader>`, `<DrawerFooter>`, `<DrawerTitle>`, `<DrawerDescription>`  
**Classes:** `Drawer`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription`

---

## 🖼️ Display Components

### 👤 Avatar Components

```typescript
import { 
  Avatar,
  AvatarImage,
  AvatarFallback
} from 'angular-superui';

// Usage
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

**Selectors:** `<Avatar>`, `<AvatarImage>`, `<AvatarFallback>`  
**Classes:** `Avatar`, `AvatarImage`, `AvatarFallback`

### 🎠 Carousel Component

```typescript
import { Carousel } from 'angular-superui';

// Usage
<Carousel>
  <!-- Carousel content -->
</Carousel>
```

**Selector:** `<Carousel>`  
**Class:** `Carousel`

### 📊 DataTable Component

```typescript
import { DataTable } from 'angular-superui';

// Usage
<DataTable [data]="tableData" [columns]="columns">
</DataTable>
```

**Selector:** `<DataTable>`  
**Class:** `DataTable`

### 📈 Progress Component

```typescript
import { ProgressComponent } from 'angular-superui';

// Usage
<ProgressComponent [value]="75" [max]="100">
</ProgressComponent>
```

**Selector:** `<ProgressComponent>`  
**Class:** `ProgressComponent`

---

## 💫 Overlay Components

### 🚨 AlertDialog Components

```typescript
import { 
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
} from 'angular-superui';

// Usage
<AlertDialog>
  <AlertDialogHeader>
    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
  </AlertDialogHeader>
  <AlertDialogFooter>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
    <AlertDialogAction>Continue</AlertDialogAction>
  </AlertDialogFooter>
</AlertDialog>
```

**Selectors:** `<AlertDialog>`, `<AlertDialogHeader>`, `<AlertDialogFooter>`, `<AlertDialogTitle>`, `<AlertDialogDescription>`, `<AlertDialogAction>`, `<AlertDialogCancel>`

### 🖱️ ContextMenu Component

```typescript
import { ContextMenu } from 'angular-superui';

// Usage
<ContextMenu>
  <!-- Context menu content -->
</ContextMenu>
```

**Selector:** `<ContextMenu>`  
**Class:** `ContextMenu`

### 💬 Dialog Components

```typescript
import { 
  DialogRoot,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose
} from 'angular-superui';

// Usage
<DialogRoot>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogOverlay>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>Dialog description</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose>Close</DialogClose>
      </DialogFooter>
    </DialogContent>
  </DialogOverlay>
</DialogRoot>
```

**Selectors:** `<DialogRoot>`, `<DialogTrigger>`, `<DialogOverlay>`, `<DialogContent>`, `<DialogHeader>`, `<DialogFooter>`, `<DialogTitle>`, `<DialogDescription>`, `<DialogClose>`

### 📋 Popover Component

```typescript
import { Popover } from 'angular-superui';

// Usage
<Popover>
  <!-- Popover content -->
</Popover>
```

**Selector:** `<Popover>`  
**Class:** `Popover`

---

## 🔧 Form Components

### 📅 Calendar Components

```typescript
import { 
  Calendar,
  CalendarTimePicker,
  CalendarHeader,
  CalendarGrid
} from 'angular-superui';

// Usage
<Calendar [(selectedDate)]="selectedDate">
  <CalendarHeader></CalendarHeader>
  <CalendarGrid></CalendarGrid>
</Calendar>
```

**Selectors:** `<Calendar>`, `<CalendarTimePicker>`, `<CalendarHeader>`, `<CalendarGrid>`  
**Classes:** `Calendar`, `CalendarTimePicker`, `CalendarHeader`, `CalendarGrid`

### 📂 Collapsible Components

```typescript
import { 
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from 'angular-superui';

// Usage
<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>
    <p>Collapsible content</p>
  </CollapsibleContent>
</Collapsible>
```

**Selectors:** `<Collapsible>`, `<CollapsibleTrigger>`, `<CollapsibleContent>`  
**Classes:** `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`

### � Combobox Components

```typescript
import { 
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxEmpty
} from 'angular-superui';

// Usage
<Combobox>
  <ComboboxTrigger>Select option</ComboboxTrigger>
  <ComboboxContent>
    <!-- Options -->
    <ComboboxEmpty>No options found</ComboboxEmpty>
  </ComboboxContent>
</Combobox>
```

**Selectors:** `<Combobox>`, `<ComboboxTrigger>`, `<ComboboxContent>`, `<ComboboxEmpty>`  
**Classes:** `Combobox`, `ComboboxTrigger`, `ComboboxContent`, `ComboboxEmpty`

### 🔐 InputOTP Components

```typescript
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from 'angular-superui';

// Usage
<InputOTP>
  <InputOTPGroup>
    <InputOTPSlot [index]="0"></InputOTPSlot>
    <InputOTPSlot [index]="1"></InputOTPSlot>
    <InputOTPSlot [index]="2"></InputOTPSlot>
  </InputOTPGroup>
  <InputOTPSeparator></InputOTPSeparator>
  <InputOTPGroup>
    <InputOTPSlot [index]="3"></InputOTPSlot>
    <InputOTPSlot [index]="4"></InputOTPSlot>
    <InputOTPSlot [index]="5"></InputOTPSlot>
  </InputOTPGroup>
</InputOTP>
```

**Selectors:** `<InputOTP>`, `<InputOTPGroup>`, `<InputOTPSlot>`, `<InputOTPSeparator>`  
**Classes:** `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator`

---

## ⚙️ Utility Components

### 🪗 Accordion Components

```typescript
import { 
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from 'angular-superui';

// Usage
<Accordion>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

**Selectors:** `<Accordion>`, `<AccordionItem>`, `<AccordionTrigger>`, `<AccordionContent>`  
**Classes:** `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`

### 🌙 ThemeSwitcher Component

```typescript
import { ThemeSwitcher } from 'angular-superui';

// Usage
<ThemeSwitcher></ThemeSwitcher>
```

**Selector:** `<ThemeSwitcher>`  
**Class:** `ThemeSwitcher`

---

---

## Usage Examples

### Basic Component Usage

```typescript
import { Component } from '@angular/core';
import { 
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardContentComponent
} from '@lib/card';
import { ButtonComponent } from '@lib/button';
import { Badge } from '@lib/badge';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    ButtonComponent,
    Badge
  ],
  template: `
    <CardComponent>
      <CardHeaderComponent>
        <CardTitleComponent>
          Hello World
          <Badge variant="secondary" class="ml-2">New</Badge>
        </CardTitleComponent>
      </CardHeaderComponent>
      <CardContentComponent>
        <p>This is a simple example using Angular SuperUI components.</p>
        <ButtonComponent variant="default" class="mt-4">
          Get Started
        </ButtonComponent>
      </CardContentComponent>
    </CardComponent>
  `
})
export class ExampleComponent {}
```

### Complex Component Usage

```typescript
import { Component } from '@angular/core';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@lib/accordion';
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon
} from '@lib/alert';
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from '@lib/avatar';

@Component({
  selector: 'app-complex',
  standalone: true,
  imports: [
    Accordion, AccordionItem, AccordionTrigger, AccordionContent,
    Alert, AlertTitle, AlertDescription, AlertIcon,
    Avatar, AvatarImage, AvatarFallback
  ],
  template: `
    <div class="space-y-6">
      <!-- Alert Example -->
      <Alert variant="success">
        <AlertIcon>✅</AlertIcon>
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your profile has been updated successfully.
        </AlertDescription>
      </Alert>

      <!-- Avatar Example -->
      <div class="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <p class="font-medium">John Doe</p>
          <p class="text-sm text-muted-foreground">john@example.com</p>
        </div>
      </div>

      <!-- Accordion Example -->
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other components' aesthetic.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  `
})
export class ComplexExampleComponent {}
```

## Import Patterns

### CLI Installation Imports

```typescript
// Using @lib/* path aliases (CLI installation)
import { Alert } from '@lib/alert';
import { ButtonComponent } from '@lib/button';
import { CardComponent } from '@lib/card';
```

### NPM Package Imports

```typescript
// Using NPM package (alternative installation)
import { Alert } from 'angular-superui';
import { ButtonComponent } from 'angular-superui';
import { CardComponent } from 'angular-superui';
```

## Best Practices

### 1. Use Standalone Components

```typescript
@Component({
  selector: 'app-example',
  standalone: true, // ✅ Use standalone components
  imports: [CardComponent, ButtonComponent], // ✅ Import what you need
  template: `...`
})
```

### 2. Group Related Imports

```typescript
// ✅ Good - Group related imports
import { 
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardContentComponent
} from '@lib/card';

// ❌ Avoid - Multiple separate imports
import { CardComponent } from '@lib/card';
import { CardHeaderComponent } from '@lib/card';
```

### 3. Use Proper Naming

```typescript
// ✅ Good - Clear, descriptive names
<CardComponent>
  <CardHeaderComponent>
    <CardTitleComponent>User Profile</CardTitleComponent>
  </CardHeaderComponent>
</CardComponent>

// ❌ Avoid - Generic or unclear names
<Card>
  <Header>
    <Title>User Profile</Title>
  </Header>
</Card>
```

## Migration from v0.x

If you're upgrading from previous versions:

```typescript
// Old v0.x selectors (deprecated)
<lib-alert>
<lib-button>
<lib-card>

// New v1.0.1 selectors
<Alert>
<ButtonComponent>
<CardComponent>
```

## Additional Resources

- [Installation Guide](./installation.md)
- [Component Documentation](./components/)
- [Theming Guide](./theming.md)
- [Migration Guide](./migration.md)
| Tooltip | `<Tooltip>` | `Tooltip` |
| Tooltip Trigger | `<TooltipTrigger>` | `TooltipTrigger` |
| Tooltip Content | `<TooltipContent>` | `TooltipContent` |
| Hover Card | `<HoverCard>` | `HoverCard` |
| Hover Card Trigger | `<HoverCardTrigger>` | `HoverCardTrigger` |
| Hover Card Content | `<HoverCardContent>` | `HoverCardContent` |

### Navigation Components

| Component | Selector | Import |
|-----------|----------|---------|
| Navigation Menu | `<NavigationMenu>` | `NavigationMenu` |
| Navigation Menu List | `<NavigationMenuList>` | `NavigationMenuList` |
| Navigation Menu Item | `<NavigationMenuItem>` | `NavigationMenuItem` |
| Navigation Menu Trigger | `<NavigationMenuTrigger>` | `NavigationMenuTrigger` |
| Navigation Menu Content | `<NavigationMenuContent>` | `NavigationMenuContent` |
| Navigation Menu Link | `<NavigationMenuLink>` | `NavigationMenuLink` |
| Navigation Menu Indicator | `<NavigationMenuIndicator>` | `NavigationMenuIndicator` |
| Navigation Menu Viewport | `<NavigationMenuViewport>` | `NavigationMenuViewport` |

### Utility Components

| Component | Selector | Import |
|-----------|----------|---------|
| Scroll Area | `<ScrollArea>` | `ScrollArea` |
| Scroll Bar | `<ScrollBar>` | `ScrollBar` |

### Toast Components

| Component | Selector | Import |
|-----------|----------|---------|
| Toast | `<Toast>` | `Toast` |
| Toast Provider | `<ToastProvider>` | `ToastProvider` |
| Toast Title | `<ToastTitle>` | `ToastTitle` |
| Toast Description | `<ToastDescription>` | `ToastDescription` |
| Toast Action | `<ToastAction>` | `ToastAction` |
| Toast Close | `<ToastClose>` | `ToastClose` |

## Common Import Patterns

### Basic Component Import

```typescript
import { Button, Card, CardContent } from 'angular-superui';

@Component({
  standalone: true,
  imports: [Button, Card, CardContent],
  template: `
    <Card>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  `
})
```

### Tooltip Implementation

```typescript
import { 
  TooltipProvider, 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent 
} from 'angular-superui';

@Component({
  standalone: true,
  imports: [TooltipProvider, Tooltip, TooltipTrigger, TooltipContent],
  template: `
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button>Hover me</button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip content</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  `
})
```

### Navigation Menu Implementation

```typescript
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from 'angular-superui';

@Component({
  standalone: true,
  imports: [
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink
  ],
  template: `
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link 1</NavigationMenuLink>
            <NavigationMenuLink>Link 2</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  `
})
```

## Documentation Standards Applied

All updated documentation follows these standards:

1. **Correct Import Paths**: All use `'angular-superui'` instead of incorrect paths
2. **Accurate Selectors**: All selectors match the actual component implementations
3. **Step-by-Step Guides**: Every complex component has implementation steps
4. **Complete Examples**: Working TypeScript examples with proper imports
5. **API Reference**: Comprehensive property documentation
6. **Best Practices**: Common pitfalls and usage recommendations
7. **Accessibility Notes**: ARIA compliance and keyboard navigation info

## Remaining Components to Update

The following component documentation files should be reviewed and updated if they exist:

- [ ] **Input** - Check selector (`InputComponent`)
- [ ] **Select** - Multiple selectors need verification
- [ ] **Toast** - Multiple toast-related selectors
- [ ] **Switch** - Simple component (`Switch`)
- [ ] **Separator** - Simple component (`Separator`)
- [ ] **Accordion** - Multiple selectors if exists
- [ ] **Dialog** - Multiple selectors if exists
- [ ] **Alert Dialog** - Multiple selectors if exists
- [ ] **Context Menu** - Multiple selectors if exists
- [ ] **Popover** - Multiple selectors if exists
- [ ] **Progress** - Simple component if exists
- [ ] **Badge** - Simple component if exists
- [ ] **Alert** - Simple component if exists
- [ ] **Avatar** - Simple component if exists
- [ ] **Calendar** - Component if exists
- [ ] **Checkbox** - Simple component if exists
- [ ] **Label** - Simple component if exists
- [ ] **Textarea** - Component if exists
- [ ] **Slider** - Component if exists
- [ ] **Toggle** - Component if exists
- [ ] **Tabs** - Multiple selectors if exists
- [ ] **Table** - Multiple selectors if exists

## Key Changes Made

1. **Fixed Import Statements**: Changed from incorrect paths to `'angular-superui'`
2. **Corrected Selectors**: Updated all HTML selectors to match actual component implementations
3. **Added Implementation Guides**: Step-by-step instructions for complex components
4. **Enhanced Examples**: More comprehensive and practical examples
5. **Improved Structure**: Better organization and readability
6. **Added Common Pitfalls**: Help developers avoid common mistakes

## Next Steps

1. Continue updating remaining component documentation files
2. Verify all selectors against actual implementations
3. Add more comprehensive examples for complex components
4. Ensure all documentation follows the established patterns
5. Add cross-references between related components
