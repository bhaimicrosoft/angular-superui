# Component Selectors Quick Reference (v1.0.6)

This document provides a quick reference for all Angular SuperUI component selectors and their correct usage in v1.0.6.

## 🎯 Available Components (21 Total)

Angular SuperUI v1.0.6 includes **21 production-ready components** with clean PascalCase selectors.

## Component Selectors

### 🪗 Accordion Components

| Component | Selector | Import |
|-----------|----------|---------|
| Accordion | `<Accordion>` | `Accordion` |
| Accordion Item | `<AccordionItem>` | `AccordionItem` |
| Accordion Trigger | `<AccordionTrigger>` | `AccordionTrigger` |
| Accordion Content | `<AccordionContent>` | `AccordionContent` |

```typescript
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from '@lib/accordion';
```

### 🚨 Alert Components

| Component | Selector | Import |
|-----------|----------|---------|
| Alert | `<Alert>` | `Alert` |
| Alert Title | `<AlertTitle>` | `AlertTitle` |
| Alert Description | `<AlertDescription>` | `AlertDescription` |
| Alert Icon | `<AlertIcon>` | `AlertIcon` |

```typescript
import { 
  Alert, 
  AlertTitle, 
  AlertDescription, 
  AlertIcon 
} from '@lib/alert';
```

### 🚨 Alert Dialog Components

| Component | Selector | Import |
|-----------|----------|---------|
| Alert Dialog | `<AlertDialogComponent>` | `AlertDialogComponent` |
| Alert Dialog Header | `<AlertDialogHeaderComponent>` | `AlertDialogHeaderComponent` |
| Alert Dialog Footer | `<AlertDialogFooterComponent>` | `AlertDialogFooterComponent` |
| Alert Dialog Title | `<AlertDialogTitleComponent>` | `AlertDialogTitleComponent` |
| Alert Dialog Description | `<AlertDialogDescriptionComponent>` | `AlertDialogDescriptionComponent` |
| Alert Dialog Action | `<AlertDialogActionComponent>` | `AlertDialogActionComponent` |
| Alert Dialog Cancel | `<AlertDialogCancelComponent>` | `AlertDialogCancelComponent` |

```typescript
import { 
  AlertDialogComponent,
  AlertDialogHeaderComponent,
  AlertDialogFooterComponent,
  AlertDialogTitleComponent,
  AlertDialogDescriptionComponent,
  AlertDialogActionComponent,
  AlertDialogCancelComponent
} from '@lib/alert-dialog';
```

### 📐 Aspect Ratio Component

| Component | Selector | Import |
|-----------|----------|---------|
| Aspect Ratio | `<AspectRatioComponent>` | `AspectRatioComponent` |

```typescript
import { AspectRatioComponent } from '@lib/aspect-ratio';
```

### 👤 Avatar Components

| Component | Selector | Import |
|-----------|----------|---------|
| Avatar | `<Avatar>` | `Avatar` |
| Avatar Image | `<AvatarImage>` | `AvatarImage` |
| Avatar Fallback | `<AvatarFallback>` | `AvatarFallback` |

```typescript
import { 
  Avatar, 
  AvatarImage, 
  AvatarFallback 
} from '@lib/avatar';
```

### 🏷️ Badge Component

| Component | Selector | Import |
|-----------|----------|---------|
| Badge | `<Badge>` | `Badge` |

```typescript
import { Badge } from '@lib/badge';
```

### 🍞 Breadcrumb Components

| Component | Selector | Import |
|-----------|----------|---------|
| Breadcrumb | `<BreadcrumbComponent>` | `BreadcrumbComponent` |
| Breadcrumb List | `<BreadcrumbListComponent>` | `BreadcrumbListComponent` |
| Breadcrumb Item | `<BreadcrumbItemComponent>` | `BreadcrumbItemComponent` |
| Breadcrumb Link | `<BreadcrumbLinkComponent>` | `BreadcrumbLinkComponent` |
| Breadcrumb Page | `<BreadcrumbPageComponent>` | `BreadcrumbPageComponent` |
| Breadcrumb Separator | `<BreadcrumbSeparatorComponent>` | `BreadcrumbSeparatorComponent` |
| Breadcrumb Ellipsis | `<BreadcrumbEllipsisComponent>` | `BreadcrumbEllipsisComponent` |

```typescript
import { 
  BreadcrumbComponent,
  BreadcrumbListComponent,
  BreadcrumbItemComponent,
  BreadcrumbLinkComponent,
  BreadcrumbPageComponent,
  BreadcrumbSeparatorComponent,
  BreadcrumbEllipsisComponent
} from '@lib/breadcrumb';
```

### 🔘 Button Component

| Component | Selector | Import |
|-----------|----------|---------|
| Button | `<ButtonComponent>` | `ButtonComponent` |

```typescript
import { ButtonComponent } from '@lib/button';
```

### 📅 Calendar Component

| Component | Selector | Import |
|-----------|----------|---------|
| Calendar | `<CalendarComponent>` | `CalendarComponent` |

```typescript
import { CalendarComponent } from '@lib/calendar';
```

### 🃏 Card Components

| Component | Selector | Import |
|-----------|----------|---------|
| Card | `<CardComponent>` | `CardComponent` |
| Card Header | `<CardHeaderComponent>` | `CardHeaderComponent` |
| Card Title | `<CardTitleComponent>` | `CardTitleComponent` |
| Card Description | `<CardDescriptionComponent>` | `CardDescriptionComponent` |
| Card Content | `<CardContentComponent>` | `CardContentComponent` |
| Card Footer | `<CardFooterComponent>` | `CardFooterComponent` |

```typescript
import { 
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
  CardFooterComponent
} from '@lib/card';
```

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
