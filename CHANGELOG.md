# Changelog

All notable changes to Angular SuperUI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

- [Bug Reports](https://github.com/yourusername/angular-superui/issues/new?template=bug_report.md)
- [Feature Requests](https://github.com/yourusername/angular-superui/issues/new?template=feature_request.md)

### Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development: `npm start`
4. Run tests: `npm test`

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
