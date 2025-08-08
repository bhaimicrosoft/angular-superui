# Chip Component 🏷️

Versatile chip and tag component for displaying removable labels, filters, selections, and user mentions. Built with Angular signals for optimal performance and accessibility.

## Features

- 🎨 **4 Variants** - Filled, Outlined, Ghost, and Gradient styles
- 🌈 **7 Colors** - Default, Primary, Secondary, Success, Warning, Danger, Info
- 📏 **4 Sizes** - Small, Medium, Large, Extra Large
- 🖼️ **Avatar Support** - Image and safe text avatars with XSS protection
- ❌ **Removable** - Built-in remove functionality with safe icon handling
- ⏳ **Loading States** - Integrated loading spinners and disabled states
- ♿ **Accessibility** - ARIA compliant with keyboard navigation
- 🛡️ **Security** - XSS protection with automatic HTML sanitization
- 🎯 **Interactive** - Click handlers and hover states
- 📱 **Responsive** - Mobile-friendly design with touch targets
- 🔧 **TypeScript** - Full type safety with signal-based architecture
- 📦 **Overflow Management** - Smart overflow with interactive tooltips showing hidden chips
- 🎪 **ChipSet Container** - Organized chip grouping with flexible layout options

## Security

This component prioritizes security by:

- **XSS Protection**: Automatically sanitizes avatar and removeIcon inputs
- **HTML Stripping**: Removes HTML tags from text content to prevent code injection
- **Safe Rendering**: Uses text interpolation instead of innerHTML for user content
- **Input Validation**: Validates and limits text content length

⚠️ **Important**: The `avatar` and `removeIcon` inputs accept string values but will strip any HTML content for security. Use image URLs for visual avatars or plain text for initials.

## Installation

Initialize Angular SuperUI in your project:

```bash
npx ngsui-cli init
```

Add the Chip component:

```bash
npx ngsui-cli add chip
```

**Note**: The ChipSet component uses the Tooltip component for overflow indicators. If you haven't added tooltips yet, run:

```bash
npx ngsui-cli add tooltip
```

## Usage

Import the Chip component in your Angular component:

```typescript
import { Component } from '@angular/core';
import { ChipComponent, ChipSetComponent } from '@components/chip';  // add path to tsconfig.json file, if not there

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ChipComponent, ChipSetComponent],
  template: `
    <Chip>Basic Chip</Chip>
  `
})
export class ExampleComponent {}
```

## Examples

### Basic Usage

```typescript
@Component({
  template: `
    <Chip>Default Chip</Chip>
  `
})
```

### Variants

#### Filled (Default)

```typescript
@Component({
  template: `
    <Chip variant="filled" color="primary">Primary Filled</Chip>
    <Chip variant="filled" color="success">Success Filled</Chip>
    <Chip variant="filled" color="warning">Warning Filled</Chip>
    <Chip variant="filled" color="danger">Danger Filled</Chip>
  `
})
```

#### Outlined

```typescript
@Component({
  template: `
    <Chip variant="outlined" color="primary">Primary Outlined</Chip>
    <Chip variant="outlined" color="success">Success Outlined</Chip>
    <Chip variant="outlined" color="warning">Warning Outlined</Chip>
    <Chip variant="outlined" color="danger">Danger Outlined</Chip>
  `
})
```

#### Ghost

```typescript
@Component({
  template: `
    <Chip variant="ghost" color="primary">Primary Ghost</Chip>
    <Chip variant="ghost" color="success">Success Ghost</Chip>
    <Chip variant="ghost" color="warning">Warning Ghost</Chip>
    <Chip variant="ghost" color="danger">Danger Ghost</Chip>
  `
})
```

#### Gradient

```typescript
@Component({
  template: `
    <Chip variant="gradient" color="primary">Primary Gradient</Chip>
    <Chip variant="gradient" color="success">Success Gradient</Chip>
    <Chip variant="gradient" color="warning">Warning Gradient</Chip>
    <Chip variant="gradient" color="danger">Danger Gradient</Chip>
  `
})
```

### Sizes

```typescript
@Component({
  template: `
    <Chip size="sm" variant="filled" color="primary">Small</Chip>
    <Chip size="md" variant="filled" color="primary">Medium</Chip>
    <Chip size="lg" variant="filled" color="primary">Large</Chip>
    <Chip size="xl" variant="filled" color="primary">Extra Large</Chip>
  `
})
```

### Removable Chips

```typescript
@Component({
  template: `
    <Chip 
      variant="filled" 
      color="primary" 
      [removable]="true"
      (onRemove)="handleRemove($event)"
    >
      Removable Chip
    </Chip>
  `
})
export class RemovableChipExample {
  handleRemove(event: ChipRemoveEvent) {
    console.log('Chip removed:', event);
  }
}
```

### With Avatars

```typescript
@Component({
  template: `
    <!-- Image Avatar (Recommended) -->
    <Chip 
      variant="filled" 
      color="primary"
      avatar="https://avatars.githubusercontent.com/u/124599?v=4"
      avatarAlt="John Doe"
    >
      John Doe
    </Chip>

    <!-- Text Avatar (Safe - HTML is automatically stripped) -->
    <Chip 
      variant="outlined" 
      color="success"
      avatar="JD"
    >
      John Doe
    </Chip>

    <!-- Initials Avatar -->
    <Chip 
      variant="ghost" 
      color="info"
      avatar="AB"
    >
      Alice Brown
    </Chip>
  `
})
```

### Custom Remove Icons

```typescript
@Component({
  template: `
    <!-- Text-based remove icon (Safe - HTML is stripped) -->
    <Chip 
      variant="filled" 
      color="danger"
      [removable]="true"
      removeIcon="✕"
      (onRemove)="handleRemove($event)"
    >
      Custom Remove Icon
    </Chip>

    <!-- Default SVG icon (Recommended) -->
    <Chip 
      variant="outlined" 
      color="primary"
      [removable]="true"
      (onRemove)="handleRemove($event)"
    >
      Default Remove Icon
    </Chip>
  `
})
```

### Loading States

```typescript
@Component({
  template: `
    <Chip 
      variant="filled" 
      color="primary" 
      [loading]="isProcessing"
    >
      {{ isProcessing ? 'Processing...' : 'Process Data' }}
    </Chip>
  `
})
export class LoadingChipExample {
  isProcessing = false;

  processData() {
    this.isProcessing = true;
    setTimeout(() => {
      this.isProcessing = false;
    }, 2000);
  }
}
```

### Disabled State

```typescript
@Component({
  template: `
    <Chip variant="filled" color="default" [disabled]="true">
      Disabled Chip
    </Chip>
    <Chip variant="outlined" color="primary" [disabled]="true" [removable]="true">
      Disabled Removable
    </Chip>
  `
})
```

### Event Handling

```typescript
@Component({
  template: `
    <Chip 
      variant="filled" 
      color="primary"
      [removable]="true"
      (onClick)="handleClick($event)"
      (onRemove)="handleRemove($event)"
      (onFocusChange)="handleFocus($event)"
      (onHoverChange)="handleHover($event)"
    >
      Interactive Chip
    </Chip>
  `
})
export class InteractiveChipExample {
  handleClick(event: ChipClickEvent) {
    console.log('Chip clicked:', event);
  }

  handleRemove(event: ChipRemoveEvent) {
    console.log('Chip removed:', event);
  }

  handleFocus(focused: boolean) {
    console.log('Chip focus changed:', focused);
  }

  handleHover(hovered: boolean) {
    console.log('Chip hover changed:', hovered);
  }
}
```

### Chip Set Container

```typescript
@Component({
  template: `
    <ChipSet [wrap]="true" [spacing]="'sm'">
      <Chip variant="filled" color="primary">Angular</Chip>
      <Chip variant="filled" color="success">TypeScript</Chip>
      <Chip variant="filled" color="info">Tailwind CSS</Chip>
      <Chip variant="filled" color="warning">Signals</Chip>
    </ChipSet>
  `
})
```

### Tag Management System

```typescript
@Component({
  template: `
    <div class="space-y-4">
      <h3>Selected Tags</h3>
      <ChipSet [spacing]="'sm'">
        @for (tag of selectedTags(); track tag.id) {
          <Chip
            [variant]="'filled'"
            [color]="tag.color"
            [removable]="true"
            (onRemove)="removeTag(tag.id)"
          >
            {{ tag.label }}
          </Chip>
        }
      </ChipSet>

      <Button (click)="addRandomTag()">Add Random Tag</Button>
    </div>
  `
})
export class TagManagementExample {
  selectedTags = signal([
    { id: '1', label: 'Frontend', color: 'primary' as const },
    { id: '2', label: 'Backend', color: 'success' as const },
    { id: '3', label: 'UI/UX', color: 'info' as const }
  ]);

  removeTag(tagId: string) {
    this.selectedTags.update(tags => 
      tags.filter(tag => tag.id !== tagId)
    );
  }

  addRandomTag() {
    const colors = ['primary', 'success', 'warning', 'danger', 'info'] as const;
    const labels = ['React', 'Vue', 'Svelte', 'Node.js', 'Python', 'Go'];
    
    const newTag = {
      id: Date.now().toString(),
      label: labels[Math.floor(Math.random() * labels.length)],
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    this.selectedTags.update(tags => [...tags, newTag]);
  }
}
```

### Team Member Chips

```typescript
@Component({
  template: `
    <div class="space-y-4">
      <h3>Team Members</h3>
      <ChipSet [spacing]="'sm'">
        @for (member of teamMembers(); track member.id) {
          <Chip
            variant="filled"
            [color]="member.online ? 'success' : 'secondary'"
            [avatar]="member.avatar"
            [avatarAlt]="member.name"
            [removable]="true"
            (onRemove)="removeMember(member.id)"
            (onClick)="selectMember(member)"
          >
            {{ member.name }}
          </Chip>
        }
      </ChipSet>
    </div>
  `
})
export class TeamMemberChipsExample {
  teamMembers = signal([
    {
      id: '1',
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b39c1c5e?w=32&h=32&fit=crop&crop=face',
      online: true
    },
    {
      id: '2', 
      name: 'Bob Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      online: false
    }
  ]);

  removeMember(memberId: string) {
    this.teamMembers.update(members => 
      members.filter(member => member.id !== memberId)
    );
  }

  selectMember(member: any) {
    console.log('Selected member:', member);
  }
}
```

### Filter Chips

```typescript
@Component({
  template: `
    <div class="space-y-4">
      <h3>Active Filters</h3>
      <ChipSet [spacing]="'sm'">
        @for (filter of activeFilters(); track filter.id) {
          <Chip
            variant="outlined"
            [color]="filter.color"
            [removable]="true"
            (onRemove)="removeFilter(filter.id)"
          >
            {{ filter.label }}
          </Chip>
        }
      </ChipSet>

      <div class="flex gap-2">
        <Button variant="outline" size="sm" (click)="addRandomFilter()">
          Add Filter
        </Button>
        <Button variant="ghost" size="sm" (click)="clearAllFilters()">
          Clear All
        </Button>
      </div>
    </div>
  `
})
export class FilterChipsExample {
  activeFilters = signal([
    { id: '1', label: 'Category: Tech', color: 'primary' as const },
    { id: '2', label: 'Status: Active', color: 'success' as const }
  ]);

  availableFilters = [
    { id: '3', label: 'Priority: High', color: 'danger' as const },
    { id: '4', label: 'Type: Bug', color: 'warning' as const },
    { id: '5', label: 'Assignee: Me', color: 'info' as const }
  ];

  removeFilter(filterId: string) {
    this.activeFilters.update(filters => 
      filters.filter(filter => filter.id !== filterId)
    );
  }

  addRandomFilter() {
    const available = this.availableFilters.filter(f => 
      !this.activeFilters().some(af => af.id === f.id)
    );
    
    if (available.length > 0) {
      const randomFilter = available[Math.floor(Math.random() * available.length)];
      this.activeFilters.update(filters => [...filters, randomFilter]);
    }
  }

  clearAllFilters() {
    this.activeFilters.set([]);
  }
}
```

### Overflow Management with Tooltips

The ChipSet component provides intelligent overflow management with interactive tooltips that show hidden chips:

```typescript
@Component({
  template: `
    <div class="space-y-6">
      <!-- Count-based overflow -->
      <div>
        <h4>Count-Based Overflow (Max 5 Visible)</h4>
        <ChipSet [wrap]="false" [maxVisible]="5" [showOverflow]="true" [spacing]="'sm'">
          @for (tag of manyTags(); track tag.id) {
            <Chip
              [variant]="'filled'"
              [color]="tag.color"
              [removable]="true"
              (onRemove)="removeTag(tag.id)"
            >
              {{ tag.label }}
            </Chip>
          }
        </ChipSet>
        <p class="text-sm text-gray-500 mt-2">
          Hover the "+N more" indicator to see hidden chips in a tooltip
        </p>
      </div>

      <!-- Responsive overflow -->
      <div>
        <h4>Mobile-Optimized Overflow</h4>
        <!-- Mobile: Max 2 visible -->
        <div class="block sm:hidden">
          <ChipSet [wrap]="false" [showOverflow]="true" [spacing]="'sm'" [maxVisible]="2">
            @for (tag of manyTags(); track tag.id) {
              <Chip [variant]="'filled'" [color]="tag.color" [size]="'sm'">
                {{ tag.label }}
              </Chip>
            }
          </ChipSet>
        </div>
        <!-- Tablet: Max 3 visible -->
        <div class="hidden sm:block lg:hidden">
          <ChipSet [wrap]="false" [showOverflow]="true" [spacing]="'sm'" [maxVisible]="3">
            @for (tag of manyTags(); track tag.id) {
              <Chip [variant]="'filled'" [color]="tag.color">
                {{ tag.label }}
              </Chip>
            }
          </ChipSet>
        </div>
        <!-- Desktop: Max 4 visible -->
        <div class="hidden lg:block">
          <ChipSet [wrap]="false" [showOverflow]="true" [spacing]="'sm'" [maxVisible]="4">
            @for (tag of manyTags(); track tag.id) {
              <Chip [variant]="'filled'" [color]="tag.color">
                {{ tag.label }}
              </Chip>
            }
          </ChipSet>
        </div>
      </div>
    </div>
  `
})
export class OverflowManagementExample {
  manyTags = signal([
    { id: '1', label: 'Angular', color: 'primary' as const },
    { id: '2', label: 'TypeScript', color: 'info' as const },
    { id: '3', label: 'Tailwind CSS', color: 'success' as const },
    { id: '4', label: 'Signals', color: 'warning' as const },
    { id: '5', label: 'Material Design', color: 'secondary' as const },
    { id: '6', label: 'Accessibility', color: 'primary' as const },
    { id: '7', label: 'Performance', color: 'success' as const },
    { id: '8', label: 'Security', color: 'danger' as const },
    { id: '9', label: 'Testing', color: 'info' as const },
    { id: '10', label: 'Documentation', color: 'warning' as const }
  ]);

  removeTag(tagId: string) {
    this.manyTags.update(tags => 
      tags.filter(tag => tag.id !== tagId)
    );
  }
}
```

**Overflow Features:**

- **Smart Tooltips**: Hover over "+N more" indicators to see hidden chips in a tooltip
- **Responsive Design**: Different maxVisible counts for mobile, tablet, and desktop
- **Performance Optimized**: Uses signals for efficient updates
- **Accessibility**: Screen reader friendly with proper ARIA labels
- **Interactive**: Tooltips show chip content including avatars and labels

## API Reference

### ChipComponent

#### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'filled' \| 'outlined' \| 'ghost' \| 'gradient'` | `'filled'` | Visual variant of the chip |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | Color theme of the chip |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the chip |
| `disabled` | `boolean` | `false` | Whether the chip is disabled |
| `loading` | `boolean` | `false` | Whether to show loading spinner |
| `removable` | `boolean` | `false` | Whether the chip can be removed |
| `clickable` | `boolean` | `true` | Whether the chip is clickable |
| `truncate` | `boolean` | `true` | Whether to truncate long text |
| `showTooltip` | `boolean` | `true` | Whether to show tooltip on hover |
| `avatar` | `string` | `''` | Avatar image URL or text content (HTML is stripped for security) |
| `avatarAlt` | `string` | `''` | Alt text for avatar image |
| `removeIcon` | `string` | `''` | Custom remove icon text (HTML is stripped for security) |
| `customClass` | `string` | `''` | Additional CSS classes |
| `ariaLabel` | `string` | `''` | ARIA label for accessibility |
| `ariaDescribedBy` | `string` | `''` | ARIA described-by attribute |
| `role` | `string` | `'button'` | ARIA role attribute |
| `removeAriaLabel` | `string` | `'Remove'` | ARIA label for remove button |

#### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | `EventEmitter<ChipClickEvent>` | Emitted when chip is clicked |
| `onRemove` | `EventEmitter<ChipRemoveEvent>` | Emitted when chip is removed |
| `onFocusChange` | `EventEmitter<boolean>` | Emitted when focus state changes |
| `onHoverChange` | `EventEmitter<boolean>` | Emitted when hover state changes |

### ChipSetComponent Properties

#### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `wrap` | `boolean` | `true` | Whether chips should wrap to new lines |
| `spacing` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | Spacing between chips |
| `maxVisible` | `number` | `0` | Maximum number of visible chips (0 = no limit) |
| `showOverflow` | `boolean` | `true` | Whether to show overflow indicator |
| `role` | `string` | `'group'` | ARIA role attribute |
| `ariaLabel` | `string` | `''` | ARIA label for the chip set |
| `customClass` | `string` | `''` | Additional CSS classes |

### Interfaces

#### ChipClickEvent

```typescript
interface ChipClickEvent {
  chip: ChipComponent;
  event: MouseEvent;
}
```

#### ChipRemoveEvent

```typescript
interface ChipRemoveEvent {
  chip: ChipComponent;
  event: MouseEvent;
}
```

### Public Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `focus` | `void` | Focus the chip element |
| `blur` | `void` | Remove focus from the chip element |

## Security Implementation

The Chip component implements several security measures to prevent XSS attacks:

### Input Sanitization

- **HTML Stripping**: All `avatar` and `removeIcon` inputs are automatically sanitized
- **Text Extraction**: HTML tags are removed, only text content is displayed
- **Length Limiting**: Text content is limited to prevent UI overflow attacks
- **Safe Rendering**: Uses Angular's text interpolation instead of `innerHTML`

### Security Best Practices

```typescript
// ✅ SAFE: Image URL
<Chip avatar="https://example.com/avatar.jpg">User</Chip>

// ✅ SAFE: Plain text (HTML will be stripped)
<Chip avatar="JD">John Doe</Chip>

// ✅ SAFE: Text remove icon
<Chip removeIcon="×" [removable]="true">Tag</Chip>

// ❌ UNSAFE: Don't try to inject HTML (it will be stripped anyway)
<Chip avatar="<script>alert('xss')</script>">User</Chip>
```

### Migration from Unsafe Versions

If you were previously using HTML content in avatar or removeIcon:

```typescript
// OLD (unsafe)
<Chip avatar="<svg><circle r='10'/></svg>">User</Chip>

// NEW (safe alternatives)
<Chip avatar="https://example.com/icon.svg">User</Chip>  // Use image URL
<Chip avatar="U">User</Chip>                             // Use initials
```

## Styling

The Chip component uses Tailwind CSS classes and follows the design system. You can customize the appearance by:

### Custom Classes

```typescript
@Component({
  template: `
    <Chip customClass="shadow-lg hover:shadow-xl transition-shadow">
      Custom Styled Chip
    </Chip>
  `
})
```

### CSS Custom Properties

The component respects the following CSS custom properties:

- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--success` / `--success-foreground`
- `--warning` / `--warning-foreground`
- `--danger` / `--danger-foreground`
- `--info` / `--info-foreground`
- `--background` / `--foreground`
- `--border` / `--input`
- `--ring`

## Accessibility

The Chip component is built with accessibility in mind:

- **Keyboard Navigation**: Supports Space, Enter, Delete, Backspace, and Escape keys
- **ARIA Support**: Full ARIA attribute support for screen readers
- **Focus Management**: Proper focus indication and management
- **Loading States**: Announces loading states to screen readers
- **Disabled States**: Properly handles disabled interactions
- **Tooltips**: Automatic tooltips for truncated content

### Best Practices

1. **Use descriptive labels**: Chip content should clearly describe the tag or filter
2. **Provide ARIA labels**: Use `ariaLabel` when chip text isn't descriptive enough
3. **Handle removal gracefully**: Always provide feedback when chips are removed
4. **Use appropriate colors**: Choose colors that match the semantic meaning
5. **Test with screen readers**: Verify the chip works well with assistive technology
6. **Group related chips**: Use ChipSet for better organization and spacing

## Examples in Real Applications

### E-commerce Product Filters

```typescript
@Component({
  template: `
    <div class="space-y-4">
      <h3>Active Filters</h3>
      <ChipSet [spacing]="'sm'">
        @for (filter of activeFilters(); track filter.id) {
          <Chip
            variant="outlined"
            [color]="getFilterColor(filter.type)"
            [removable]="true"
            (onRemove)="removeFilter(filter.id)"
          >
            {{ filter.label }}
          </Chip>
        }
      </ChipSet>
    </div>
  `
})
export class ProductFiltersExample {
  activeFilters = signal([
    { id: '1', type: 'category', label: 'Category: Electronics' },
    { id: '2', type: 'price', label: 'Price: $100-$500' },
    { id: '3', type: 'brand', label: 'Brand: Apple' }
  ]);

  getFilterColor(type: string) {
    const colors = {
      category: 'primary',
      price: 'success', 
      brand: 'info'
    };
    return colors[type] || 'default';
  }
}
```

### Content Management Tags

```typescript
@Component({
  template: `
    <div class="space-y-4">
      <h3>Article Tags</h3>
      <ChipSet [spacing]="'sm'">
        @for (tag of articleTags(); track tag.id) {
          <Chip
            variant="filled"
            color="primary"
            [removable]="canEditTags"
            (onRemove)="removeTag(tag.id)"
          >
            {{ tag.name }}
          </Chip>
        }
      </ChipSet>

      @if (canEditTags) {
        <Button variant="outline" size="sm" (click)="showTagEditor = true">
          Add Tags
        </Button>
      }
    </div>
  `
})
export class ArticleTagsExample {
  canEditTags = true;
  showTagEditor = false;
  
  articleTags = signal([
    { id: '1', name: 'Angular' },
    { id: '2', name: 'TypeScript' },
    { id: '3', name: 'Web Development' }
  ]);
}
```

### User Mentions

```typescript
@Component({
  template: `
    <div class="space-y-4">
      <h3>Mentioned Users</h3>
      <ChipSet [spacing]="'sm'">
        @for (user of mentionedUsers(); track user.id) {
          <Chip
            variant="filled"
            color="primary"
            [avatar]="user.avatar"
            [avatarAlt]="user.name"
            (onClick)="viewUserProfile(user)"
          >
            @{{ user.username }}
          </Chip>
        }
      </ChipSet>
    </div>
  `
})
export class UserMentionsExample {
  mentionedUsers = signal([
    {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://example.com/avatar1.jpg'
    },
    {
      id: '2',
      name: 'Jane Smith', 
      username: 'janesmith',
      avatar: 'https://example.com/avatar2.jpg'
    }
  ]);

  viewUserProfile(user: any) {
    console.log('Viewing profile for:', user);
  }
}
```
