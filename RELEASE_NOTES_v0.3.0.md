# Angular SuperUI v0.3.0 - Major Component Expansion 🚀

## 🎉 What's New

### 🆕 New Components (5 Major Additions)

#### 🎯 Command Palette
- **Command** - VS Code-style command interface with search functionality
- **CommandInput** - Auto-focus search input with keyboard navigation
- **CommandList** - Organized command results display
- **CommandEmpty** - Empty state messaging
- **CommandGroup** - Grouped command organization
- **CommandItem** - Individual command entries with keyboard support
- **CommandSeparator** - Visual command grouping
- **CommandShortcut** - Keyboard shortcut display
- **CommandDialog** - Modal command palette overlay

#### 📅 Calendar & Date Picker
- **Calendar** - Full calendar component with month navigation
- **DatePicker** - Popover-integrated date selection
- Form integration with `ControlValueAccessor`
- Min/max date validation support
- Two-way data binding with `[(ngModel)]`

#### 📋 Sheet/Drawer Components
- **Sheet** - Main sheet container with backdrop management
- **SheetContent** - Slide-out panel content with positioning
- **SheetHeader** - Organized header section
- **SheetTitle** - Consistent title styling
- **SheetDescription** - Descriptive text support
- **SheetFooter** - Action button area
- **SheetTrigger** - Sheet activation control
- **SheetClose** - Sheet dismissal control
- Support for all slide directions: top, bottom, left, right

#### 🎈 Popover Components
- **Popover** - Main popover container
- **PopoverTrigger** - Popover activation control
- **PopoverContent** - Contextual content overlay
- **PopoverSimple** - Simplified single-component popover
- Flexible positioning and alignment
- Click-outside detection and backdrop management

#### 🍞 Breadcrumb Navigation
- **Breadcrumb** - Main breadcrumb container
- **BreadcrumbList** - Structured breadcrumb list
- **BreadcrumbItem** - Individual breadcrumb entries
- **BreadcrumbLink** - Navigation links
- **BreadcrumbPage** - Current page indicator
- **BreadcrumbSeparator** - Visual separators
- **BreadcrumbEllipsis** - Overflow handling
- **BreadcrumbComplete** - All-in-one simplified component
- Automatic ellipsis with `maxItems` support

### ✨ Enhanced Features

#### 🎨 ThemeSelector Improvements
- **System Theme Detection** - Automatic light/dark mode based on OS preferences
- **Persistent Theme Storage** - Remembers user theme choice with localStorage
- **Media Query Watching** - Responds to system theme changes in real-time
- **Light/Dark/System Modes** - Three distinct theme options
- **Platform Detection** - Browser-safe implementation

### 📊 Component Count Growth
- **Total Components**: 30+ (up from 25+)
- **New Components**: 5 major component families added
- **Enhanced Components**: ThemeSelector with advanced features

## 🔧 Technical Improvements

### Form Integration
- All new form components implement `ControlValueAccessor`
- Full Angular Forms compatibility
- Two-way data binding support
- Validation integration ready

### Accessibility
- Keyboard navigation for Command Palette
- ARIA labels and roles
- Focus management improvements
- Screen reader friendly

### Performance
- Optimized component rendering
- Efficient change detection
- Minimal bundle size impact

## 📦 Installation & Usage

### Install the Latest Version

```bash
npm install angular-superui@0.3.0
```

### Import New Components

```typescript
import { 
  Calendar,
  DatePicker,
  Command,
  CommandDialog,
  Sheet,
  SheetContent,
  Popover,
  Breadcrumb
} from 'angular-superui';
```

### Quick Examples

#### Command Palette
```html
<lib-command>
  <lib-command-input placeholder="Search commands..." />
  <lib-command-list>
    <lib-command-group heading="File">
      <lib-command-item>New File</lib-command-item>
      <lib-command-item>Open File</lib-command-item>
    </lib-command-group>
  </lib-command-list>
</lib-command>
```

#### Date Picker
```html
<lib-date-picker 
  [(ngModel)]="selectedDate" 
  placeholder="Select a date">
</lib-date-picker>
```

#### Sheet/Drawer
```html
<lib-sheet>
  <lib-sheet-trigger>
    <lib-button>Open Sheet</lib-button>
  </lib-sheet-trigger>
  <lib-sheet-content side="right">
    <lib-sheet-header>
      <lib-sheet-title>Sheet Title</lib-sheet-title>
      <lib-sheet-description>Sheet description</lib-sheet-description>
    </lib-sheet-header>
    <!-- Content -->
  </lib-sheet-content>
</lib-sheet>
```

#### Breadcrumb
```html
<lib-breadcrumb [items]="breadcrumbItems" maxItems="3" />
```

#### Enhanced Theme Selector
```html
<lib-theme-selector 
  [includeSystemOption]="true"
  [persistTheme]="true">
</lib-theme-selector>
```

## 🐛 Bug Fixes

- Fixed export structure for all new components
- Improved TypeScript type definitions
- Enhanced component compilation stability
- Resolved import path issues

## 📚 Documentation Updates

- Updated README with new component examples
- Enhanced installation guide with new components
- Added comprehensive usage examples
- Updated component count and feature descriptions

## 🚀 Migration Guide

### From v0.2.x to v0.3.0

This is a **backward-compatible** release. All existing components continue to work without changes.

### New Component Usage

1. Import the new components you need
2. Add them to your component's `imports` array
3. Use them in your templates with the `lib-` prefix

### ThemeSelector Enhancement

If you're using `ThemeSelector`, you can now enable system theme detection:

```html
<!-- Before -->
<lib-theme-selector />

<!-- After (with system detection) -->
<lib-theme-selector [includeSystemOption]="true" [persistTheme]="true" />
```

## 🎯 What's Next

- Additional shadcn/ui component parity
- Enhanced component customization options
- Improved documentation with interactive examples
- Performance optimizations

---

**Full Changelog**: [View on GitHub](https://github.com/bhaimicrosoft/angular-superui/compare/v0.2.2...v0.3.0)

**Download**: `npm install angular-superui@0.3.0`
