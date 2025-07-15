# Changelog

All notable changes to Angular SuperUI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2025-07-15

### 🎨 Added - Color System & Avatar Enhancement

#### Major Features
- **15+ Color Variants**: Extended palette (success, warning, info, purple, pink, orange, teal, indigo, cyan, rose, emerald, amber, lime, violet, sky)
- **30+ Button Variants**: Solid and outline variants for every color
- **30+ Badge Variants**: Solid and outline variants for every color
- **Enhanced Avatar Component**: Image source support with automatic fallbacks
- **ThemeSelector Component**: Dynamic theme switching with 11 beautiful themes
- **Complete Color System**: CSS custom properties with dark mode support

#### Avatar Component Enhancements
- `src` property for image URLs
- `alt` property for accessibility and initials generation
- `fallback` property for custom fallback text
- Automatic error handling for failed image loads
- Modern Angular 18+ control flow syntax (`@if/@else`)
- Multiple size variants: sm (32px), default (40px), lg (48px), xl (64px)

#### Color System Features
- CSS custom properties for all colors
- WCAG AA compliant color combinations
- Automatic dark mode adaptation
- Tailwind CSS integration
- Theme switching capabilities

#### Theme System
- 11 predefined themes with visual previews
- Global theme application support
- ThemeSelector component with color dot previews
- Event-driven theme change handling

### 📚 Updated
- Comprehensive README.md with color system documentation
- Enhanced showcase application with all new features
- New COLOR_SYSTEM.md documentation guide
- Package version bumped to 0.2.1

### 🔧 Technical Improvements
- Extended Tailwind configuration with all color variants
- Enhanced TypeScript definitions
- Optimized bundle size despite feature additions
- Tree-shakable component architecture

### 🔄 Migration
- 100% backward compatible with existing code
- All new features are opt-in enhancements
- No breaking changes in this release

## [0.2.0] - 2025-01-03

### Added
- **Major Component Expansion** - Added 10+ new components for comprehensive UI coverage
- **Dialog System** - Modal dialogs with header, content, footer components
- **Tabs Navigation** - Tabbed interface with trigger and content components
- **Advanced Form Controls**:
  - Select component with dropdown functionality
  - Radio Group for single selection
  - Toggle buttons with pressed states
  - Slider for range input with min/max values
- **Layout Components**:
  - Accordion with collapsible items
  - Table suite with header, body, footer, row, cell components
- **Overlay Components**:
  - Tooltip for contextual information
  - Toast notification system with service integration
- **Enhanced Form Integration** - All form components now implement ControlValueAccessor
- **Toast Service** - Centralized notification service with success, error, warning, info methods
- **Comprehensive Documentation** - Updated README with 25+ component examples
- **Advanced Showcase** - Complete demo application with all components

### Changed
- **Version Bump** - Updated from 0.0.2 to 0.2.0 for major release
- **Public API** - Reorganized exports by component categories (Form, Layout, Overlay, Feedback, Display)
- **Component Architecture** - Enhanced with composite component patterns (Dialog suite, Tabs suite, Table suite)
- **TypeScript Support** - Added comprehensive interfaces and type definitions for all new components
- **Accessibility** - Improved ARIA compliance across all components

### Enhanced
- **Class Variance Authority** - Extended CVA variants for all new components
- **Tailwind Integration** - Added new utility classes and component-specific styles
- **Form Validation** - Enhanced form control integration with Angular Forms
- **Responsive Design** - Mobile-first approach for all new components
- **Theme System** - Extended CSS custom properties for new component styling

### Component Library Status
- **Total Components**: 25+ components across 5 categories
- **Form Components**: Button, Input, Textarea, Label, Checkbox, Switch, Select, Radio Group, Toggle, Slider
- **Layout Components**: Card suite, Separator, Tabs suite, Accordion suite, Table suite
- **Overlay Components**: Dialog suite, Tooltip, Toast suite
- **Feedback Components**: Alert, Badge, Progress, Skeleton
- **Display Components**: Avatar suite

## [Unreleased]

### Added
- Comprehensive documentation site
- Theming guide with custom theme examples
- Advanced examples and integration patterns

### Changed
- Improved component API documentation
- Enhanced accessibility guidelines

## [0.0.2] - 2024-12-19

### Added
- Initial public release
- Alert component with multiple variants and SVG icon support
- Button component with 6 distinct variants
- Input component with form integration
- Angular Schematics for automated setup (`ng add angular-superui`)
- Comprehensive CSS custom properties theming system
- Tailwind CSS integration with custom utilities
- TypeScript support with full type definitions

### Features
- **Alert Component**
  - Variants: default, destructive, success, warning
  - Optional close button with custom close handler
  - SVG icon support with proper positioning
  - Accessible design with ARIA attributes
  - CSS custom properties for theming

- **Button Component**
  - Variants: default, destructive, outline, secondary, ghost, link
  - Size variants: default, sm, lg, icon
  - Disabled state support
  - Loading state support
  - Full keyboard navigation

- **Input Component**
  - Reactive forms integration
  - Built-in validation styling
  - Placeholder and label support
  - Disabled state handling
  - Focus management

### Technical
- Built with Angular 20+ standalone components
- Class Variance Authority (CVA) for variant management
- clsx and tailwind-merge for optimal class handling
- Partial compilation mode for optimal bundle size
- Tree-shakeable exports
- Full TypeScript support

### Developer Experience
- One-command setup with `ng add angular-superui`
- Automatic Tailwind CSS configuration
- Automatic import additions
- Component scaffolding
- Comprehensive documentation

### Dependencies
- Angular 20+
- class-variance-authority ^0.7.1
- clsx ^2.1.1
- tailwind-merge ^2.5.4

## [0.0.1] - 2024-12-19

### Added
- Initial library scaffold
- Basic project structure
- Build configuration with ng-packagr

---

## Release Notes

### Version 0.2.0

This is a major release of Angular SuperUI, significantly expanding the component library from 13 to 25+ components with comprehensive UI patterns.

#### What's New
- **Complete Shadcn UI Coverage** - All major Shadcn UI components now available
- **Advanced Form Controls** - Select, Radio Group, Toggle, Slider with full form integration
- **Interactive Components** - Dialog, Tabs, Accordion with proper state management
- **Notification System** - Toast service with multiple variants and auto-dismiss
- **Data Display** - Comprehensive table component with proper structure
- **Enhanced Accessibility** - ARIA compliance across all components
- **TypeScript Excellence** - Full type safety with ControlValueAccessor implementations

#### Migration Guide
All existing components remain backward compatible. New components are additive.

1. Update to latest version: `npm update angular-superui`
2. Import new components as needed
3. Update imports to use organized categories if desired

#### Performance Improvements
- Optimized bundle size with tree-shaking
- Reduced CSS overhead with better utility organization
- Improved component loading with standalone architecture

### Version 0.0.2

This is the first public release of Angular SuperUI, providing a solid foundation for building modern Angular applications with a consistent design system.

#### What's New
- **Complete component library** with Alert, Button, and Input components
- **Automatic setup** via Angular Schematics - just run `ng add angular-superui`
- **Modern theming system** using CSS custom properties
- **TypeScript-first** approach with comprehensive type definitions
- **Accessibility-focused** components following WCAG guidelines

#### Getting Started
1. Install the library: `ng add angular-superui`
2. Start using components in your templates
3. Customize the theme to match your brand

#### Breaking Changes
None - this is the initial release.

#### Known Issues
- None reported

#### Next Release Preview
- Additional components (Card, Modal, Dropdown)
- Enhanced theming options
- Performance optimizations
- More comprehensive examples

---

## Upgrade Guide

### From 0.0.2 to 0.2.0

This release adds many new components but maintains backward compatibility:

1. Update the package:
   ```bash
   npm update angular-superui
   ```

2. Import new components as needed:
   ```typescript
   import { Dialog, Tabs, Select, ToastService } from 'angular-superui';
   ```

3. For Toast notifications, add ToastContainer to your app:
   ```typescript
   import { ToastContainer } from 'angular-superui';
   
   @Component({
     imports: [ToastContainer],
     template: `
       <!-- Your app content -->
       <lib-toast-container></lib-toast-container>
     `
   })
   ```

### From 0.0.1 to 0.0.2

This is the first functional release. If you installed version 0.0.1, we recommend:

1. Uninstall the previous version:
   ```bash
   npm uninstall angular-superui
   ```

2. Install the new version:
   ```bash
   ng add angular-superui
   ```

3. Follow the automatic setup prompts

### Future Upgrade Notes

We follow semantic versioning:
- **Patch releases** (0.0.x): Bug fixes, no breaking changes
- **Minor releases** (0.x.0): New features, backward compatible
- **Major releases** (x.0.0): Breaking changes, migration guide provided

---

## Contributing

We welcome contributions! See our [Contributing Guide](CONTRIBUTING.md) for details.

### Reporting Issues

Found a bug or have a feature request? Please check our existing issues and create a new one if needed:

- [Bug Reports](https://github.com/bhaimicrosoft/angular-superui/issues/new?template=bug_report.md)
- [Feature Requests](https://github.com/bhaimicrosoft/angular-superui/issues/new?template=feature_request.md)

### Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development: `npm start`
4. Run tests: `npm test`

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
