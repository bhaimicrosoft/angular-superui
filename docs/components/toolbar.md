# Toolbar Component 🧰

Flexible toolbar component for building app headers, editor interfaces, and control panels with responsive groups and smart spacing.

## Features

- 🎯 **5 Variants** - Default, Subtle, Outline, Ghost, Elevated
- 📏 **3 Sizes** - Small, Medium, Large
- 🔄 **2 Orientations** - Horizontal, Vertical
- 📌 **Sticky Mode** - Fixed positioning with backdrop blur
- 🔗 **Grouped Actions** - Logical grouping with separators
- 📱 **Responsive** - Adaptive layouts for all screen sizes
- ♿ **Accessibility** - ARIA compliant with keyboard navigation
- 🎨 **Customizable** - Easy styling with Tailwind CSS
- 🔧 **TypeScript** - Full type safety with CVA variants

## Installation

Add the Toolbar component to your project:

```bash
npx ngsui-cli add toolbar
```

## Usage

Import the Toolbar components in your Angular component:

```typescript
import { Component } from '@angular/core';
import { Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSpacer } from '@lib/components/toolbar';
import { Button } from '@lib/components/button';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSpacer, Button],
  template: `
    <Toolbar>
      <ToolbarTitle>My App</ToolbarTitle>
      <ToolbarSpacer />
      <ToolbarGroup>
        <Button size="sm">Save</Button>
        <Button size="sm" variant="outline">Cancel</Button>
      </ToolbarGroup>
    </Toolbar>
  `
})
export class ExampleComponent {}
```

## Examples

### Basic Toolbar

```typescript
@Component({
  template: `
    <Toolbar>
      <ToolbarTitle>Project Phoenix</ToolbarTitle>
      <ToolbarSpacer />
      <ToolbarGroup>
        <Button size="sm" variant="outline">New</Button>
        <Button size="sm">Save</Button>
      </ToolbarGroup>
    </Toolbar>
  `
})
```

### Editor Toolbar with Groups

```typescript
@Component({
  template: `
    <Toolbar size="sm">
      <ToolbarGroup>
        <Button size="sm" variant="ghost">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
          </svg>
          Bold
        </Button>
        <Button size="sm" variant="ghost">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 4h-9M14 20H5M15 4L9 20"/>
          </svg>
          Italic
        </Button>
        <Button size="sm" variant="ghost">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4v6a6 6 0 0 0 12 0V4"/>
            <line x1="4" y1="20" x2="20" y2="20"/>
          </svg>
          Underline
        </Button>
      </ToolbarGroup>
      <ToolbarGroup [separated]="true">
        <Button size="sm" variant="ghost">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <line x1="17" y1="10" x2="3" y2="10"/>
            <line x1="21" y1="6" x2="3" y2="6"/>
            <line x1="21" y1="14" x2="3" y2="14"/>
            <line x1="17" y1="18" x2="3" y2="18"/>
          </svg>
          Left
        </Button>
        <Button size="sm" variant="ghost">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <line x1="18" y1="10" x2="6" y2="10"/>
            <line x1="21" y1="6" x2="3" y2="6"/>
            <line x1="21" y1="14" x2="3" y2="14"/>
            <line x1="18" y1="18" x2="6" y2="18"/>
          </svg>
          Center
        </Button>
        <Button size="sm" variant="ghost">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <line x1="21" y1="10" x2="7" y2="10"/>
            <line x1="21" y1="6" x2="3" y2="6"/>
            <line x1="21" y1="14" x2="3" y2="14"/>
            <line x1="21" y1="18" x2="7" y2="18"/>
          </svg>
          Right
        </Button>
      </ToolbarGroup>
    </Toolbar>
  `
})
```

### Sticky Elevated Toolbar

```typescript
@Component({
  template: `
    <Toolbar variant="elevated" [sticky]="true">
      <ToolbarTitle>Sticky Toolbar</ToolbarTitle>
      <ToolbarSpacer />
      <ToolbarGroup>
        <Button size="sm" variant="secondary">Publish</Button>
        <Button size="sm" variant="outline">Preview</Button>
      </ToolbarGroup>
    </Toolbar>
  `
})
```

### Vertical Toolbar

```typescript
@Component({
  template: `
    <div class="flex">
      <Toolbar orientation="vertical" size="sm">
        <Button size="sm" variant="ghost" class="justify-start">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
          </svg>
          Move
        </Button>
        <Button size="sm" variant="ghost" class="justify-start">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          Copy
        </Button>
        <Button size="sm" variant="ghost" class="justify-start">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="3,6 5,6 21,6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          Delete
        </Button>
      </Toolbar>
      
      <!-- Main content area -->
      <div class="flex-1 p-4">
        <!-- Your content here -->
      </div>
    </div>
  `
})
```

### Responsive Toolbar

```typescript
@Component({
  template: `
    <Toolbar class="flex-wrap min-w-fit">
      <ToolbarTitle class="flex-shrink-0">Project</ToolbarTitle>
      <ToolbarSpacer class="hidden sm:block" />
      <ToolbarGroup class="flex-wrap">
        <Button size="sm" variant="outline" class="gap-1 min-w-0 flex-shrink-0">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          <span class="hidden sm:inline">New</span>
        </Button>
        <Button size="sm" class="gap-1 min-w-0 flex-shrink-0">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
          </svg>
          <span class="hidden sm:inline">Save</span>
        </Button>
      </ToolbarGroup>
    </Toolbar>
  `
})
```

### Variants

#### Default
```typescript
@Component({
  template: `<Toolbar>Default Toolbar</Toolbar>`
})
```

#### Subtle
```typescript
@Component({
  template: `<Toolbar variant="subtle">Subtle Toolbar</Toolbar>`
})
```

#### Outline
```typescript
@Component({
  template: `<Toolbar variant="outline">Outline Toolbar</Toolbar>`
})
```

#### Ghost
```typescript
@Component({
  template: `<Toolbar variant="ghost">Ghost Toolbar</Toolbar>`
})
```

#### Elevated
```typescript
@Component({
  template: `<Toolbar variant="elevated">Elevated Toolbar</Toolbar>`
})
```

### Sizes

#### Small
```typescript
@Component({
  template: `
    <Toolbar size="sm">
      <ToolbarTitle>Small Toolbar</ToolbarTitle>
      <ToolbarSpacer />
      <Button size="sm">Action</Button>
    </Toolbar>
  `
})
```

#### Medium (Default)
```typescript
@Component({
  template: `
    <Toolbar size="md">
      <ToolbarTitle>Medium Toolbar</ToolbarTitle>
      <ToolbarSpacer />
      <Button>Action</Button>
    </Toolbar>
  `
})
```

#### Large
```typescript
@Component({
  template: `
    <Toolbar size="lg">
      <ToolbarTitle>Large Toolbar</ToolbarTitle>
      <ToolbarSpacer />
      <Button size="lg">Action</Button>
    </Toolbar>
  `
})
```

## Advanced Examples

### Complex Application Toolbar

```typescript
@Component({
  selector: 'app-application-toolbar',
  template: `
    <Toolbar variant="elevated" [sticky]="true" class="z-50">
      <!-- Brand/Logo Section -->
      <ToolbarTitle class="flex items-center gap-2">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
        SuperUI Studio
      </ToolbarTitle>
      
      <ToolbarSpacer />
      
      <!-- File Operations -->
      <ToolbarGroup>
        <Button size="sm" variant="outline">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          New
        </Button>
        <Button size="sm" variant="outline">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0"/>
          </svg>
          Open
        </Button>
        <Button size="sm">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
          </svg>
          Save
        </Button>
      </ToolbarGroup>
      
      <!-- View Controls -->
      <ToolbarGroup [separated]="true">
        <Button size="sm" variant="ghost">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </Button>
        <Button size="sm" variant="ghost">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/>
          </svg>
        </Button>
        <Button size="sm" variant="ghost">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </Button>
      </ToolbarGroup>
    </Toolbar>
  `
})
export class ApplicationToolbarComponent {}
```

### Dynamic Toolbar with State

```typescript
@Component({
  selector: 'app-dynamic-toolbar',
  template: `
    <Toolbar>
      <ToolbarTitle>{{ documentTitle() }}</ToolbarTitle>
      <ToolbarSpacer />
      
      <ToolbarGroup>
        <Button 
          size="sm" 
          [variant]="hasUnsavedChanges() ? 'default' : 'outline'"
          [disabled]="!hasUnsavedChanges()"
          (click)="save()"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
          </svg>
          {{ hasUnsavedChanges() ? 'Save*' : 'Saved' }}
        </Button>
      </ToolbarGroup>
      
      <ToolbarGroup [separated]="true">
        <Button 
          size="sm" 
          variant="ghost"
          [class]="previewMode() ? 'bg-blue-100 text-blue-800' : ''"
          (click)="togglePreview()"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
          {{ previewMode() ? 'Edit' : 'Preview' }}
        </Button>
      </ToolbarGroup>
    </Toolbar>
  `
})
export class DynamicToolbarComponent {
  documentTitle = signal('Untitled Document');
  hasUnsavedChanges = signal(false);
  previewMode = signal(false);
  
  save() {
    // Save logic here
    this.hasUnsavedChanges.set(false);
  }
  
  togglePreview() {
    this.previewMode.set(!this.previewMode());
  }
}
```

## API Reference

### Toolbar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the toolbar |
| `variant` | `'default' \| 'subtle' \| 'outline' \| 'ghost' \| 'elevated'` | `'default'` | Visual style variant |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout orientation |
| `sticky` | `boolean` | `false` | Enable sticky positioning |
| `ariaLabel` | `string` | `undefined` | Accessibility label for the toolbar |
| `class` | `string` | `''` | Additional CSS classes |

### ToolbarGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `separated` | `boolean` | `false` | Add visual separator before this group |
| `class` | `string` | `''` | Additional CSS classes |

### ToolbarTitle Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | `''` | Additional CSS classes |

### ToolbarSpacer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | `''` | Additional CSS classes |

## Styling

The Toolbar component uses Tailwind CSS for styling. You can customize the appearance by:

### Custom Classes

```typescript
@Component({
  template: `
    <Toolbar class="border-2 border-blue-500 bg-blue-50">
      <ToolbarTitle class="text-blue-900 font-bold">Custom Toolbar</ToolbarTitle>
    </Toolbar>
  `
})
```

### CSS Variables

```css
:root {
  --toolbar-background: rgb(255 255 255 / 0.8);
  --toolbar-border: rgb(229 231 235);
  --toolbar-text: rgb(71 85 105);
}

.dark {
  --toolbar-background: rgb(30 41 59 / 0.8);
  --toolbar-border: rgb(51 65 85);
  --toolbar-text: rgb(148 163 184);
}
```

### Responsive Utilities

```typescript
@Component({
  template: `
    <!-- Responsive toolbar that adapts to screen size -->
    <div class="overflow-x-auto">
      <Toolbar class="flex-wrap min-w-fit">
        <ToolbarTitle class="flex-shrink-0">App</ToolbarTitle>
        <ToolbarSpacer class="hidden sm:block" />
        <ToolbarGroup class="flex-wrap">
          <Button class="min-w-0 flex-shrink-0">
            <span class="hidden md:inline">Full Text</span>
            <span class="md:hidden">Short</span>
          </Button>
        </ToolbarGroup>
      </Toolbar>
    </div>
  `
})
```

## Accessibility

The Toolbar component follows WAI-ARIA guidelines:

- Uses `role="toolbar"` for proper screen reader support
- Supports keyboard navigation
- Provides customizable ARIA labels
- Maintains focus management

### Best Practices

1. **Always provide meaningful labels**:
   ```typescript
   <Toolbar ariaLabel="Document editing toolbar">
   ```

2. **Group related actions**:
   ```typescript
   <ToolbarGroup>
     <!-- Related formatting actions -->
   </ToolbarGroup>
   <ToolbarGroup [separated]="true">
     <!-- Related alignment actions -->
   </ToolbarGroup>
   ```

3. **Use appropriate button variants**:
   ```typescript
   <Button variant="ghost" size="sm">Non-primary action</Button>
   <Button size="sm">Primary action</Button>
   ```

4. **Consider responsive behavior**:
   ```typescript
   <Toolbar class="flex-wrap">
     <!-- Content that can wrap on small screens -->
   </Toolbar>
   ```

## Common Patterns

### Application Header
- Use `sticky` toolbar with `elevated` variant
- Include branding, navigation, and user actions
- Consider responsive behavior for mobile

### Editor Interface
- Use `sm` size for compact editing tools
- Group related actions with separators
- Provide clear visual states for active tools

### Control Panel
- Use appropriate spacing with groups
- Consider vertical orientation for sidebars
- Maintain consistent action hierarchy

## Troubleshooting

### Toolbar content overflows on small screens
```typescript
// Add responsive wrapper and flexible classes
<div class="overflow-x-auto">
  <Toolbar class="flex-wrap min-w-fit">
    <!-- content -->
  </Toolbar>
</div>
```

### Sticky toolbar covers content
```typescript
// Add appropriate padding to content area
<Toolbar [sticky]="true" class="z-50">
  <!-- toolbar content -->
</Toolbar>
<main class="pt-16"> <!-- Adjust based on toolbar height -->
  <!-- main content -->
</main>
```

### Vertical toolbar not sizing correctly
```typescript
// Ensure proper container layout
<div class="flex h-screen">
  <Toolbar orientation="vertical" class="h-full">
    <!-- toolbar content -->
  </Toolbar>
  <main class="flex-1">
    <!-- main content -->
  </main>
</div>
```
<Toolbar>
  <ToolbarTitle>Title</ToolbarTitle>
  <ToolbarSpacer />
  <ToolbarGroup>
    <button class="btn">Primary</button>
    <button class="btn btn-outline">Secondary</button>
  </ToolbarGroup>
</Toolbar>
```

### Elevated and Sticky

```html
<Toolbar variant="elevated" [sticky]="true">
  <ToolbarTitle>Sticky Toolbar</ToolbarTitle>
  <ToolbarSpacer />
  <ToolbarGroup>
    <button class="btn btn-secondary">Publish</button>
    <button class="btn btn-outline">Preview</button>
  </ToolbarGroup>
</Toolbar>
```

### Vertical

```html
<Toolbar orientation="vertical" size="sm">
  <button class="btn btn-ghost">Move</button>
  <button class="btn btn-ghost">Copy</button>
  <button class="btn btn-ghost">Delete</button>
</Toolbar>
```

### Group Separator

```html
<Toolbar>
  <ToolbarGroup>
    <button class="btn btn-ghost">Cut</button>
    <button class="btn btn-ghost">Copy</button>
  </ToolbarGroup>
  <ToolbarGroup [separated]="true">
    <button class="btn btn-ghost">Share</button>
    <button class="btn btn-ghost">History</button>
  </ToolbarGroup>
</Toolbar>
```

## 📚 API Reference

### Toolbar

- selector: 'Toolbar'
- standalone: true

Inputs

- size: 'sm' | 'md' | 'lg' = 'md'
- variant: 'default' | 'subtle' | 'outline' | 'ghost' | 'elevated' = 'default'
- orientation: 'horizontal' | 'vertical' = 'horizontal'
- sticky: boolean = false
- ariaLabelInput?: string

### ToolbarGroup

- selector: 'ToolbarGroup'
- separated: boolean = false

### ToolbarTitle

- selector: 'ToolbarTitle'

### ToolbarSpacer

- selector: 'ToolbarSpacer'

## ♿ Accessibility

- Uses role="toolbar" on the root container.
- Group related controls with logical reading order.
- Provide aria-label via `ariaLabelInput` for context when the title is not descriptive.

## 🎨 Theming

- Styled with Tailwind v4 utilities via CVA.
- Variants control background/border/shadow.
- Adjust sizes and spacing with your design tokens.

## ✅ Tips

- Combine with Button, Icon, Select, and Input components for rich app bars.
- Use `orientation="vertical"` for side toolbars.
- Enable `[sticky]="true"` for persistent top bars with `variant="elevated"`.

---

Built with Angular SuperUI.
