# Component Selectors Quick Reference

This document provides a quick reference for all Angular SuperUI component selectors and their correct usage.

## Updated Component Documentation

The following component documentation files have been updated with correct selectors, step-by-step guides, and comprehensive examples:

- ✅ **Tooltip** - Updated with correct selectors and implementation guide
- ✅ **ScrollArea** - New comprehensive documentation created
- ✅ **Navigation Menu** - New comprehensive documentation created
- ✅ **Button** - Updated import paths and usage examples
- ✅ **Card** - Updated import paths and structure guide
- ✅ **Hover Card** - Updated selectors and step-by-step guide

## Component Selectors

### Form Components

| Component | Selector | Import |
|-----------|----------|---------|
| Button | `<Button>` | `Button` |
| Input | `<InputComponent>` | `InputComponent` |
| Switch | `<Switch>` | `Switch` |
| Select | `<SelectComponent>` | `SelectComponent` |
| Select Trigger | `[SelectTrigger]` | `SelectTrigger` |
| Select Value | `<SelectValue>` | `SelectValue` |
| Select Content | `<SelectContent>` | `SelectContent` |
| Select Label | `<SelectLabel>` | `SelectLabel` |
| Select Item | `<SelectItem>` | `SelectItem` |
| Select Separator | `<SelectSeparator>` | `SelectSeparator` |

### Layout Components

| Component | Selector | Import |
|-----------|----------|---------|
| Card | `<Card>` | `Card` |
| Card Header | `<CardHeader>` | `CardHeader` |
| Card Title | `<CardTitle>` | `CardTitle` |
| Card Description | `<CardDescription>` | `CardDescription` |
| Card Content | `<CardContent>` | `CardContent` |
| Card Footer | `<CardFooter>` | `CardFooter` |
| Card Action | `<CardAction>` | `CardAction` |
| Separator | `<Separator>` | `Separator` |

### Overlay Components

| Component | Selector | Import |
|-----------|----------|---------|
| Tooltip Provider | `<TooltipProvider>` | `TooltipProvider` |
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
