# 🎯 Component Selectors Quick Reference (v1.0.8)

<div align="center">

**✨ Complete selector guide for all 31 Angular SuperUI components ✨**

[![🚀 Live Demo](https://img.shields.io/badge/🚀-Live%20Demo-FF6B6B?style=for-the-badge&logo=vercel&logoColor=white)](https://angular-superui.vercel.app/)
[![📱 Mobile Friendly](https://img.shields.io/badge/📱-Mobile%20Friendly-45B7D1?style=for-the-badge&logo=mobile&logoColor=white)](https://angular-superui.vercel.app/)

</div>

This document provides a comprehensive reference for all Angular SuperUI component selectors and their correct usage in **v1.0.8**.

## 📊 Overview

Angular SuperUI v1.0.8 includes **31 production-ready components** with consistent PascalCase selectors and full TypeScript support.

### 🎨 Component Categories

| Category | Count | Components |
|----------|-------|------------|
| **🎯 Core Components** | 9 | Button, InputComponent, Checkbox, RadioGroup/RadioGroupItem, Select, Badge, Alert, Card, AspectRatio |
| **🧭 Navigation** | 5 | Breadcrumb (7 selectors), DropdownMenu, Pagination, Drawer |
| **🖼️ Display** | 5 | Avatar, Carousel, DataTable, ProgressComponent, Skeleton |
| **💫 Overlay** | 4 | AlertDialog, ContextMenu, Dialog, Popover |
| **🔧 Form** | 5 | Calendar, Collapsible, Combobox, InputOTP, Slider |
| **⚙️ Utility** | 3 | Accordion, Stepper, ThemeSwitcher |

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

### 🎚️ Radio Group Component

```typescript
import { RadioGroup } from 'angular-superui';

// Usage
<RadioGroup>
  <!-- Radio options content -->
</RadioGroup>
```

**Selector:** `<RadioGroup>`  
**Class:** `RadioGroup`

### 📋 Select Component

```typescript
import { Select } from 'angular-superui';

// Usage
<Select>
  <!-- Select options content -->
</Select>
```

**Selector:** `<Select>`  
**Class:** `Select`

### 💀 Skeleton Component

```typescript
import { Skeleton } from 'angular-superui';

// Usage
<Skeleton class="w-full h-4 rounded">
</Skeleton>
```

**Selector:** `<Skeleton>`  

**Class:** `Skeleton`

### 🎯 Slider Component

```typescript
import { Slider } from 'angular-superui';

// Usage
<Slider [value]="50" [min]="0" [max]="100">
</Slider>
```

**Selector:** `<Slider>`  
**Class:** `Slider`

### 📈 Stepper Component

```typescript
import { Stepper } from 'angular-superui';

// Usage
<Stepper>
  <!-- Stepper steps content -->
</Stepper>
```

**Selector:** `<Stepper>`  
**Class:** `Stepper`

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

### 🔍 Combobox Components

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

## 📚 Quick Reference Table

| Component | Selector | Import |
|-----------|----------|---------|
| **Core Components** | | |
| Button | `<Button>` | `Button` |
| Input | `<InputComponent>` | `InputComponent` |
| Checkbox | `<Checkbox>` | `Checkbox` |
| RadioGroup | `<RadioGroup>` | `RadioGroup` |
| RadioGroupItem | `<RadioGroupItem>` | `RadioGroupItem` |
| Select | `<Select>` | `Select` |
| Badge | `<Badge>` | `Badge` |
| Alert | `<Alert>` | `Alert` |
| AlertTitle | `<AlertTitle>` | `AlertTitle` |
| AlertDescription | `<AlertDescription>` | `AlertDescription` |
| AlertIcon | `<AlertIcon>` | `AlertIcon` |
| Card | `<Card>` | `Card` |
| CardHeader | `<CardHeader>` | `CardHeader` |
| CardTitle | `<CardTitle>` | `CardTitle` |
| CardDescription | `<CardDescription>` | `CardDescription` |
| CardContent | `<CardContent>` | `CardContent` |
| CardFooter | `<CardFooter>` | `CardFooter` |
| AspectRatio | `<AspectRatio>` | `AspectRatio` |
| **Navigation Components** | | |
| Breadcrumb | `nav[Breadcrumb]` | `Breadcrumb` |
| BreadcrumbList | `ol[BreadcrumbList]` | `BreadcrumbList` |
| BreadcrumbItem | `li[BreadcrumbItem]` | `BreadcrumbItem` |
| BreadcrumbLink | `a[BreadcrumbLink]` | `BreadcrumbLink` |
| BreadcrumbRouterLink | `a[BreadcrumbRouterLink]` | `BreadcrumbRouterLink` |
| BreadcrumbPage | `span[BreadcrumbPage]` | `BreadcrumbPage` |
| BreadcrumbSeparator | `li[BreadcrumbSeparator]` | `BreadcrumbSeparator` |
| BreadcrumbEllipsis | `span[BreadcrumbEllipsis]` | `BreadcrumbEllipsis` |
| DropdownMenu | `<DropdownMenu>` | `DropdownMenu` |
| Pagination | `<Pagination>` | `Pagination` |
| Drawer | `<Drawer>` | `Drawer` |
| DrawerHeader | `<DrawerHeader>` | `DrawerHeader` |
| DrawerFooter | `<DrawerFooter>` | `DrawerFooter` |
| DrawerTitle | `<DrawerTitle>` | `DrawerTitle` |
| DrawerDescription | `<DrawerDescription>` | `DrawerDescription` |
| **Display Components** | | |
| Avatar | `<Avatar>` | `Avatar` |
| AvatarImage | `<AvatarImage>` | `AvatarImage` |
| AvatarFallback | `<AvatarFallback>` | `AvatarFallback` |
| Carousel | `<Carousel>` | `Carousel` |
| DataTable | `<DataTable>` | `DataTable` |
| Progress | `<ProgressComponent>` | `ProgressComponent` |
| Skeleton | `<Skeleton>` | `Skeleton` |
| **Overlay Components** | | |
| AlertDialog | `<AlertDialog>` | `AlertDialog` |
| AlertDialogHeader | `<AlertDialogHeader>` | `AlertDialogHeader` |
| AlertDialogFooter | `<AlertDialogFooter>` | `AlertDialogFooter` |
| AlertDialogTitle | `<AlertDialogTitle>` | `AlertDialogTitle` |
| AlertDialogDescription | `<AlertDialogDescription>` | `AlertDialogDescription` |
| AlertDialogAction | `<AlertDialogAction>` | `AlertDialogAction` |
| AlertDialogCancel | `<AlertDialogCancel>` | `AlertDialogCancel` |
| ContextMenu | `<ContextMenu>` | `ContextMenu` |
| DialogRoot | `<DialogRoot>` | `DialogRoot` |
| DialogTrigger | `<DialogTrigger>` | `DialogTrigger` |
| DialogOverlay | `<DialogOverlay>` | `DialogOverlay` |
| DialogContent | `<DialogContent>` | `DialogContent` |
| DialogHeader | `<DialogHeader>` | `DialogHeader` |
| DialogFooter | `<DialogFooter>` | `DialogFooter` |
| DialogTitle | `<DialogTitle>` | `DialogTitle` |
| DialogDescription | `<DialogDescription>` | `DialogDescription` |
| DialogClose | `<DialogClose>` | `DialogClose` |
| Popover | `<Popover>` | `Popover` |
| **Form Components** | | |
| Calendar | `<Calendar>` | `Calendar` |
| CalendarTimePicker | `<CalendarTimePicker>` | `CalendarTimePicker` |
| CalendarHeader | `<CalendarHeader>` | `CalendarHeader` |
| CalendarGrid | `<CalendarGrid>` | `CalendarGrid` |
| Collapsible | `<Collapsible>` | `Collapsible` |
| CollapsibleTrigger | `<CollapsibleTrigger>` | `CollapsibleTrigger` |
| CollapsibleContent | `<CollapsibleContent>` | `CollapsibleContent` |
| Combobox | `<Combobox>` | `Combobox` |
| ComboboxTrigger | `<ComboboxTrigger>` | `ComboboxTrigger` |
| ComboboxContent | `<ComboboxContent>` | `ComboboxContent` |
| ComboboxEmpty | `<ComboboxEmpty>` | `ComboboxEmpty` |
| InputOTP | `<InputOTP>` | `InputOTP` |
| InputOTPGroup | `<InputOTPGroup>` | `InputOTPGroup` |
| InputOTPSlot | `<InputOTPSlot>` | `InputOTPSlot` |
| InputOTPSeparator | `<InputOTPSeparator>` | `InputOTPSeparator` |
| Slider | `<Slider>` | `Slider` |
| **Utility Components** | | |
| Accordion | `<Accordion>` | `Accordion` |
| AccordionItem | `<AccordionItem>` | `AccordionItem` |
| AccordionTrigger | `<AccordionTrigger>` | `AccordionTrigger` |
| AccordionContent | `<AccordionContent>` | `AccordionContent` |
| Stepper | `<Stepper>` | `Stepper` |
| ThemeSwitcher | `<ThemeSwitcher>` | `ThemeSwitcher` |

## 💡 Usage Examples

### Basic Component Usage

```typescript
import { Component } from '@angular/core';
import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from 'angular-superui';
import { Button } from 'angular-superui';
import { Badge } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Button,
    Badge
  ],
  template: `
    <Card>
      <CardHeader>
        <CardTitle>
          Hello World
          <Badge variant="secondary" class="ml-2">New</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a simple example using Angular SuperUI components.</p>
        <Button variant="default" class="mt-4">
          Get Started
        </Button>
      </CardContent>
    </Card>
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
} from 'angular-superui';
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon
} from 'angular-superui';
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from 'angular-superui';

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

## 🎯 Import Patterns

### Standard Import (Recommended)

```typescript
// Import individual components
import { Button } from 'angular-superui';
import { Card, CardHeader, CardTitle } from 'angular-superui';
import { Alert, AlertTitle } from 'angular-superui';
```

### CLI Installation Import (Alternative)

```typescript
// Using @lib/* path aliases (if using CLI installation)
import { Button } from '@lib/button';
import { Card, CardHeader, CardTitle } from '@lib/card';
import { Alert, AlertTitle } from '@lib/alert';
```

## ✅ Best Practices

### 1. Use Standalone Components

```typescript
@Component({
  selector: 'app-example',
  standalone: true, // ✅ Use standalone components
  imports: [Card, Button], // ✅ Import what you need
  template: `...`
})
```

### 2. Group Related Imports

```typescript
// ✅ Good - Group related imports
import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from 'angular-superui';

// ❌ Avoid - Multiple separate imports
import { Card } from 'angular-superui';
import { CardHeader } from 'angular-superui';
```

### 3. Use Correct Selectors

```typescript
// ✅ Correct selectors
<Button>Click me</Button>
<InputComponent placeholder="Enter text" />
<ProgressComponent [value]="75" />

// ❌ Incorrect selectors
<ButtonComponent>Click me</ButtonComponent>
<Input placeholder="Enter text" />
<Progress [value]="75" />
```

## 🔄 Migration Notes

### Key Selector Changes in v1.0.7

- **Button**: `<Button>` (not `<ButtonComponent>`)
- **Input**: `<InputComponent>` (has "Component" suffix)
- **Progress**: `<ProgressComponent>` (has "Component" suffix)
- **Breadcrumb**: Uses attribute selectors `nav[Breadcrumb]`
- **Most other components**: Use simple PascalCase names

### Common Mistakes to Avoid

```typescript
// ❌ Common mistakes
<ButtonComponent>  // Wrong - use <Button>
<Progress>         // Wrong - use <ProgressComponent>
<CardComponent>    // Wrong - use <Card>

// ✅ Correct usage
<Button>           // Correct
<ProgressComponent> // Correct
<Card>             // Correct
```

## 📖 Additional Resources

- [🚀 Live Demo](https://angular-superui.vercel.app/) - Interactive component showcase
- [📚 Installation Guide](./installation.md) - Setup instructions
- [🎨 Component Documentation](./components/) - Detailed component guides
- [🔧 GitHub Repository](https://github.com/bhaimicrosoft/angular-superui) - Source code and issues

---

**Last Updated:** v1.0.8 - All selectors verified against actual component implementations ✅
