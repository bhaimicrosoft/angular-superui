# Breadcrumb Component 🍞

Navigation breadcrumb component that shows the current page's location within a navigational hierarchy with full accessibility support.

## Features

- 🧭 **Navigation Hierarchy** - Clear path indication for complex navigation
- ♿ **Accessibility First** - ARIA compliant with screen reader support
- 🎨 **Customizable Separators** - Choose from various separator styles
- 📱 **Responsive Design** - Works seamlessly on all screen sizes
- 🔗 **Link Integration** - Full Angular Router support
- 🎭 **Ellipsis Support** - Truncation for long breadcrumb trails
- 🔧 **TypeScript** - Complete type safety

## Installation

Initialize Angular SuperUI in your project:

```bash
ngsui-cli init
```

Add the Breadcrumb component:

```bash
ngsui-cli add breadcrumb
```

## Usage

### Import Components

```typescript
import { 
  BreadcrumbComponent,
  BreadcrumbListComponent,
  BreadcrumbItemComponent,
  BreadcrumbLinkComponent,
  BreadcrumbPageComponent,
  BreadcrumbSeparatorComponent,
  BreadcrumbEllipsisComponent
} from '@components/breadcrumb';
```

### Basic Breadcrumb

```typescript
@Component({
  template: `
    <Breadcrumb [accessibility]="{
      ariaLabel: 'Navigation breadcrumb',
      ariaLive: 'polite'
    }">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" [accessibility]="{
            ariaLabel: 'Navigate to home page'
          }">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator></BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs" [accessibility]="{
            ariaLabel: 'Navigate to documentation'
          }">
            Documentation
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator></BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage [accessibility]="{
            ariaLabel: 'Current page: Components'
          }">
            Components
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  `
})
export class BasicExample {}
```

### Custom Separator

```typescript
@Component({
  template: `
    <Breadcrumb [accessibility]="{
      ariaLabel: 'Custom separator breadcrumb'
    }">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator [customSeparator]="true">
          <span class="text-muted-foreground">/</span>
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">
            Products
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator [customSeparator]="true">
          <span class="text-muted-foreground">/</span>
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>
            Laptops
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  `
})
export class CustomSeparatorExample {}
```

### Collapsed Navigation with Ellipsis

```typescript
@Component({
  template: `
    <Breadcrumb [accessibility]="{
      ariaLabel: 'Collapsed navigation breadcrumb'
    }">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator></BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbEllipsis></BreadcrumbEllipsis>
        </BreadcrumbItem>
        <BreadcrumbSeparator></BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">
            Components
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator></BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>
            Breadcrumb
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  `
})
export class CollapsedExample {}
```

### Interactive Breadcrumb

```typescript
@Component({
  template: `
    <Breadcrumb [accessibility]="{
      ariaLabel: 'Interactive breadcrumb navigation'
    }">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink 
            (linkClick)="onBreadcrumbClick('home')"
            [accessibility]="{
              ariaLabel: 'Click to navigate to home'
            }">
            🏠 Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator></BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink 
            (linkClick)="onBreadcrumbClick('settings')"
            [accessibility]="{
              ariaLabel: 'Click to navigate to settings'
            }">
            ⚙️ Settings
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator></BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>
            Profile
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  `
})
export class InteractiveExample {
  onBreadcrumbClick(section: string) {
    console.log(`Navigating to: ${section}`);
  }
}
```

### Router Integration

```typescript
@Component({
  template: `
    <Breadcrumb [accessibility]="{
      ariaLabel: 'Router navigation breadcrumb'
    }">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink routerLink="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator></BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink routerLink="/dashboard">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator></BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>
            Analytics
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  `
})
export class RouterExample {}
```

## API Reference

### Breadcrumb

The root container for the breadcrumb navigation.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `class` | `string` | `''` | Additional CSS classes |
| `accessibility` | `BreadcrumbAccessibility` | `{ ariaLabel: 'breadcrumb', ariaLive: 'polite' }` | Accessibility configuration |

### BreadcrumbList

The ordered list container for breadcrumb items.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `class` | `string` | `''` | Additional CSS classes |

### BreadcrumbItem

Individual breadcrumb items.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `class` | `string` | `''` | Additional CSS classes |

### BreadcrumbLink

Clickable breadcrumb links with multiple navigation options.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `href` | `string` | `undefined` | Regular URL for navigation |
| `routerLink` | `string \| string[]` | `undefined` | Angular router link |
| `target` | `'_blank' \| '_self' \| '_parent' \| '_top'` | `undefined` | Link target |
| `rel` | `string` | `undefined` | Link relationship |
| `asChild` | `boolean` | `false` | Render as child element |
| `class` | `string` | `''` | Additional CSS classes |
| `accessibility` | `{ ariaLabel?: string; ariaDescribedBy?: string }` | `{}` | Accessibility configuration |

#### Events

| Event | Type | Description |
|-------|------|-------------|
| `linkClick` | `EventEmitter<MouseEvent>` | Emitted when link is clicked |
| `linkKeyDown` | `EventEmitter<KeyboardEvent>` | Emitted on keydown events |

### BreadcrumbPage

Represents the current page (non-clickable).

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `current` | `boolean` | `true` | Whether this is the current page |
| `class` | `string` | `''` | Additional CSS classes |
| `accessibility` | `{ ariaLabel?: string }` | `{}` | Accessibility configuration |

### BreadcrumbSeparator

Visual separator between breadcrumb items.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `customSeparator` | `boolean` | `false` | Use custom separator content |
| `class` | `string` | `''` | Additional CSS classes |

### BreadcrumbEllipsis

Ellipsis indicator for collapsed breadcrumbs.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `customEllipsis` | `boolean` | `false` | Use custom ellipsis content |
| `class` | `string` | `''` | Additional CSS classes |

## Accessibility

The Breadcrumb component is fully accessible and follows WAI-ARIA guidelines:

### Features

- **Navigation Landmark**: Uses `<nav>` with `role="navigation"`
- **Structured List**: Implements proper `<ol>` and `<li>` structure
- **Current Page**: Uses `aria-current="page"` for the current page
- **Screen Reader Support**: Provides descriptive ARIA labels
- **Keyboard Navigation**: Full keyboard support with focus management
- **Live Regions**: Optional live region announcements

### ARIA Attributes

- `aria-label`: Describes the breadcrumb navigation
- `aria-current="page"`: Indicates the current page
- `aria-live`: Live region for dynamic updates
- `aria-hidden`: Hides decorative elements from screen readers
- `role="presentation"`: Removes semantic meaning from separators

### Keyboard Support

- **Tab**: Navigate between focusable elements
- **Enter**: Activate links and buttons
- **Space**: Activate buttons (for interactive breadcrumbs)

## Best Practices

1. **Keep it Simple**: Don't include too many levels (typically 3-7 items)
2. **Use Meaningful Labels**: Provide clear, descriptive text for each level
3. **Current Page**: Always indicate the current page clearly
4. **Mobile Responsive**: Consider collapsing on smaller screens
5. **Consistent Styling**: Maintain visual hierarchy and consistency

## Styling

The component uses Tailwind CSS classes and CVA for styling:

```typescript
// Base classes
const breadcrumbVariants = cva(
  'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground'
);

// Link hover states
const breadcrumbLinkVariants = cva([
  'transition-colors hover:text-foreground',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
]);
```

## Examples Repository

Find more examples and use cases in our [GitHub repository](https://github.com/bhaimicrosoft/angular-superui/tree/main/projects/showcase/src/app).
