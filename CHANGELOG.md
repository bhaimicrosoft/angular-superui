# 📋 Changelog

All n-- 🚀 **All Blocks Installation**: `ngsui add --all-blocks` for complete block library🔧 **New Block Commands**: `ngsui add block <block-name>` for installing complete UI sectionstable changes to **Angular SuperUI** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2025-08-07

### 🎉 **Major Release: UI Blocks System & Complete Architecture Overhaul**

#### 🏗️ **Revolutionary UI Blocks System**
- 🌟 **5 Premium UI Blocks Added**: Complete page sections ready for production use
  - **Header Block**: Professional navigation with branding, menu, and user actions
  - **Footer Block**: Comprehensive footer with navigation, social links, and newsletter signup
  - **Hero Section Block**: Compelling hero sections with backgrounds, CTAs, and statistics
  - **Pricing Cards Block**: Professional pricing displays with billing toggles and feature comparison
  - **Feature Grid Block**: Responsive feature showcases with multiple layouts and variants

#### 📦 **Enhanced CLI with Block Support**
- 🔧 **New Block Commands**: `ngsui block <block-name>` for installing complete UI sections
- 🚀 **All Blocks Installation**: `ngsui block --all` for complete block library
- 📁 **Automatic Directory Structure**: CLI now creates `src/lib/blocks/` directory during initialization
- 🔌 **Pipes Integration**: Automatic installation of utility pipes (icon.pipe.ts, safe-html.pipe.ts) during init
- 📚 **Complete Documentation**: Detailed markdown documentation for all blocks with examples

#### 🗂️ **Major Architecture Reorganization**
- 📂 **Improved Folder Structure**: 
  - Components moved to `lib/src/lib/components/`
  - Blocks organized in `lib/src/lib/blocks/`
  - Utilities consolidated in `lib/src/lib/utils/`
  - Pipes structured in `lib/src/lib/pipes/`

#### 📊 **Complete Component & Count Updates**
- 🎯 **39 Production-Ready Components**: All existing components reorganized and counted accurately
- 📈 **Dynamic Counting**: Navigation automatically reflects correct component and block counts
- 📝 **Documentation Overhaul**: All README files, installation guides, and documentation updated to v2.0.0
- 🏷️ **Version Standardization**: Consistent version numbering across all package.json files

#### ⚡ **Enhanced Development Experience**
- 🔗 **Dependency Management**: CLI automatically installs @angular/cdk and @angular/animations
- ⚙️ **Configuration Automation**: provideAnimationsAsync() automatically added to app.config.ts
- 🛠️ **Better Error Handling**: Improved CLI error messages and recovery options
- 📦 **Zero-Config Setup**: Complete project setup with single `ngsui init` command

#### 🎨 **UI/UX Improvements**
- 🌈 **Enhanced CLI Banners**: Beautiful colored output with component/block installation progress
- 📱 **Responsive Block Design**: All blocks are mobile-first and fully responsive
- ♿ **Accessibility Focus**: WCAG AA compliance across all blocks and components
- 🎭 **Multiple Variants**: Each block includes multiple design variants (minimal, dark, gradient, etc.)

#### 📚 **Comprehensive Documentation**
- 📖 **Block Documentation**: Detailed guides for all 5 UI blocks with working examples
- 🌐 **Live Examples**: Interactive showcases for blocks in the demo application
- 💡 **Usage Patterns**: Real-world examples for corporate, startup, SaaS, and agency use cases
- 🔧 **API References**: Complete TypeScript interfaces and configuration options

---

## [1.0.8] - 2025-01-28

### 🚀 **Complete Component Library Expansion - 31 Components & Infrastructure Improvements**

#### 🆕 New Components Added
- 🎛️ **Select Component**: Flexible select dropdown component with search and multi-select capabilities
- 📋 **Sidebar Component**: Responsive navigation sidebar with animations, keyboard navigation, and flexible content projection
- 💀 **Skeleton Component**: Loading placeholder components with customizable shapes and smooth animations
- 🎚️ **Slider Component**: Interactive slider component for single values and ranges with full accessibility support
- 🚶 **Stepper Component**: Multi-step navigation component with progress tracking, validation support, and content projection

#### ✨ CLI Major Infrastructure Enhancements
- 🎯 **31 Component Coverage**: Updated CLI to include all 31 components with proper descriptions and categorization
- 📦 **Enhanced Styles.css Management**: Added warning prompt before replacing user's existing styles.css file with backup recommendation
- 🔧 **Angular Dependencies**: CLI now automatically installs @angular/cdk and @angular/animations packages during initialization
- ⚙️ **App.config.ts Integration**: Automatic addition of provideAnimationsAsync() import and provider configuration
- 🌟 **Improved User Experience**: Better confirmation dialogs and status reporting during CLI operations

#### 📚 Documentation & Component Count Updates
- 📊 **Comprehensive Count Updates**: Updated all documentation files, README files, and interface text to reflect 31 components
- 🎯 **Route Management**: Added missing component route for theme-switcher (excluded from showcase as utility component)
- 📝 **CLI Command Cleanup**: Removed version numbers from CLI commands in documentation for better maintenance
- 🔍 **Footer Accuracy**: Fixed component count inconsistencies in application footer and navigation

#### 🛠️ Version Management
- 📈 **Version Bump**: Updated to v1.0.8 across all package.json files and documentation
- 🔄 **Cross-Platform Compatibility**: Improved CLI scripts for better Windows, macOS, and Linux support
- 📋 **Changelog Updates**: Comprehensive documentation of all changes and improvements

#### 🎨 Demo & Showcase Improvements
- ✨ **Alert-Dialog Demo**: Created comprehensive demo component with 6 interactive examples showcasing all dialog variants
- 🎯 **Professional Design**: Implemented stunning responsive design with glass-morphism effects and gradient backgrounds
- ♿ **Accessibility Features**: Enhanced demo with ARIA labels, focus management, and semantic color coding
- 📱 **Mobile Optimization**: Responsive grid layouts with hover animations and semantic styling

#### 🔧 Technical Infrastructure
- 🏗️ **Build System**: Enhanced build processes for library and CLI components
- 📦 **Package Management**: Improved dependency management and installation processes
- 🎯 **Type Safety**: Enhanced TypeScript integration and type definitions
- 🔄 **Hot Reload**: Better development experience with improved change detection

---

## [1.0.7] - 2025-01-25

### 🚀 **Complete Component Library - 26 Components Ready & Documentation Overhaul**

#### 🆕 New Components Added
- 🔐 **InputOTP Component**: One-time password input component with multiple slots, validation, and accessibility features
- 📄 **Pagination Component**: Comprehensive pagination component with customizable page size, navigation controls, and responsive design
- 📋 **Popover Component**: Floating overlay component that displays content relative to a trigger element with positioning and accessibility
- 📈 **Progress Component**: Progress indicator component with customizable appearance, animation, and multiple variants
- 🔘 **RadioGroup Component**: Accessible radio button group with selection states and validation

#### ✨ CLI Major Enhancements
- 🎯 **Complete Component Coverage**: Added all missing components to CLI installation (input-otp, pagination, popover, progress, radio-group)
- 📦 **26 Total Components**: Updated CLI banners and component count to reflect full library
- 🔧 **Enhanced Component Discovery**: Improved component categorization and descriptions in CLI interface
- 🌟 **Production-Ready Installation**: All 26 components now available through ngsui installation

#### 📚 Documentation Complete Overhaul
- 🎯 **SELECTOR_REFERENCE.md Rewrite**: Completely rewritten with accurate component selectors extracted from actual implementations
  - Fixed critical misinformation where documentation incorrectly assumed all components used "Component" suffix
  - Added comprehensive quick reference table with all 26 components and their correct selectors
  - Included real-world usage examples and best practices
  - Added migration notes and common mistakes to avoid
- 📊 **Component Count Updates**: Updated from 25 to 26 components across all documentation files
- 📖 **Version Alignment**: Updated all version references to v1.0.7 across README files, installation guides, and demo app
- 🎨 **Enhanced Examples**: Added comprehensive TypeScript usage examples for all component categories

#### 🛠️ Technical Improvements
- 🔍 **Accurate Selector Verification**: Extracted and verified all 79 component selectors from actual implementations
- 📦 **Component Architecture**: Documented mixed selector patterns (Button → <Button>, InputComponent → <InputComponent>, etc.)
- 🎨 **Breadcrumb Special Handling**: Documented unique attribute selector pattern for Breadcrumb components
- ⚡ **CLI Performance**: Enhanced CLI performance with better component detection and installation

#### 🎨 UI/UX Enhancements
- 📱 **Showcase App Updates**: Updated demo application component count from 18 to 26 components
- 🌙 **ThemeSwitcher Integration**: Properly documented and included ThemeSwitcher as part of the 26 component count
- 🎯 **Consistent Branding**: Aligned all documentation to show accurate component counts and version numbers

#### 🔧 Quality Assurance
- ✅ **Documentation Accuracy**: Eliminated all misinformation from selector documentation
- 🎯 **Component Completeness**: Ensured all library components are documented and available through CLI
- 📊 **Count Verification**: Verified actual component count matches documentation across all files
- 🚀 **Production Testing**: All 26 components tested and validated for production readiness

---

## [1.0.6] - 2025-01-22

### 🚀 **Component Library Expansion - 21 Components Ready**

#### 🆕 New Components Added
- 📄 **Drawer Component**: Flexible drawer component that slides in from any side of the screen
- ⬇️ **DropdownMenu Component**: Beautiful, accessible dropdown menu with multiple variants and advanced animations
- 📝 **Input Component**: Flexible input component with multiple variants, validation states, and accessibility features

#### ✨ CLI Enhancements
- Added missing components to CLI add command (drawer, dropdown-menu, input)
- Updated CLI banners with new component count (21 components)
- Enhanced list command to include all available components
- Improved component categorization in CLI interface

#### 📚 Documentation Updates
- Complete documentation for all 21 components
- Updated version references across all markdown files
- Enhanced component descriptions and examples
- Updated installation guide with new component count

#### 🛠️ Technical Improvements
- Enhanced feature comparison page with responsive design
- Improved navigation highlighting for comparison links
- Optimized color schemes for better dark mode readability
- Fixed RouterLink implementation in breadcrumb component

#### 🎨 UI/UX Enhancements
- Added comprehensive framework comparison page
- Enhanced home page component showcase
- Improved responsive table format for feature comparisons
- Better color contrast and accessibility improvements

---

## [1.0.5] - 2025-01-11

### 🚀 **Major Enhancement Release - TailwindCSS v4, Enhanced Components & Comprehensive Updates**

#### 🆕 New Components Added
- 📊 **DataTable Component**: Enterprise-grade data table with sorting, filtering, and pagination
- 🪟 **Dialog Component**: Modal dialog windows with accessibility features and focus management
- ☑️ **Checkbox Component**: Boolean input control with multiple states and form integration
- 🗃️ **Collapsible Component**: Expandable content sections with smooth animations
- 🔽 **ComboBox Component**: Advanced dropdown with search, multi-select, and loading states
- 🎠 **Carousel Component**: Content slider with auto-play, navigation, and pagination
- 🌓 **ThemeSwitcher Component**: Toggle between light, dark, and system themes

#### ⬆️ **Framework & Dependencies Updates**
- 🎨 **TailwindCSS v4.1.11**: Updated to latest TailwindCSS with modern @import syntax
- 🔧 **tailwind-merge v3.3.1**: Enhanced utility class merging capabilities
- 🛠️ **Enhanced tsconfig.json Parsing**: Robust comment removal for Angular JSON files
- 📦 **Dependency Management**: Streamlined installation process with improved version management

#### 🎯 **Component Library Expansion**
- 📈 **18 Total Components**: Expanded from 16 to 18 production-ready components
- 🔄 **CLI Component Support**: Added all new components to ngsui installation system
- 🎨 **Improved Component Categories**: Enhanced organization with new categories:
  - 🎯 Core Components (8): Button, Badge, Alert, Avatar, Accordion, Card, Checkbox, ComboBox
  - 🧭 Navigation & Layout (2): Breadcrumb, AspectRatio
  - 💫 Overlay & Dialog Components (3): AlertDialog, ContextMenu, Dialog
  - 🎨 Media & Display (2): Carousel, Collapsible
  - 📊 Data & Tables (1): DataTable
  - 📅 Featured Components (1): Calendar
  - ⚙️ Utility Components (1): ThemeSwitcher

#### 🛠️ **CLI Tool Major Enhancements**
- 🌟 **Stunning Visual Banners**: Added beautiful hex-colored banners for INIT, ADD, and LIST commands
  - **INIT**: Modern teal banner with setup instructions
  - **ADD**: Professional blue banner with installation feedback
  - **LIST**: Elegant purple banner with component categorization
- 🔧 **Enhanced tsconfig.json Handling**: Multi-stage comment removal with string-aware parsing
- 📦 **New Component Integration**: Added data-table and dialog to installation options
- 🎨 **Component Count Display**: Real-time component count showing in installation banners
- ⚡ **Error Handling**: Improved fallback mechanisms for JSON parsing failures

#### 📖 **Documentation Complete Overhaul**
- 🎨 **installation.md Rewrite**: Completely rewritten with:
  - Modern visual layout with badges and banners
  - Comprehensive 18-component showcase
  - TailwindCSS v4 setup instructions
  - Advanced usage examples and dashboard demos
  - Troubleshooting guide and framework compatibility matrix
- 📚 **README Updates**: All README files updated with:
  - Version bumped to v1.0.5 across all markdown files
  - Component count corrected to 18 in all locations
  - CLI command examples updated to use v1.0.5
  - Enhanced feature descriptions and benefits
- 🔧 **Technical Documentation**: Updated CLI installation guides and dependency versions

#### 🎨 **User Experience Improvements**
- ✨ **Enhanced CLI Banners**: Beautiful visual feedback during component installation
- 🎯 **Component Discovery**: Improved component categorization and descriptions
- 📊 **Installation Feedback**: Real-time progress and status during CLI operations
- 🔍 **Better Organization**: Clearer component grouping by functionality and use case

#### 🔧 **Technical Architecture Enhancements**
- 🏗️ **Robust JSON Parsing**: Enhanced tsconfig.json parsing with comment handling
- 📦 **Version Management**: Systematic version updates across all package.json files
- 🔄 **Dependency Optimization**: Updated to latest stable versions of all dependencies
- ⚡ **Performance**: Improved CLI performance with better error handling

#### 📱 **Compatibility & Support**
- 🌍 **Angular 18+**: Full support for latest Angular features
- 🎨 **TailwindCSS v4**: Complete migration to modern Tailwind architecture
- 📦 **Node.js 18+**: Updated minimum requirements for optimal performance
- 🔧 **TypeScript 5.0+**: Enhanced type safety and modern TypeScript features

---

## [1.0.4] - 2025-07-20

### 🎉 **Feature Release - Context Menu Component & Enhanced Architecture**

#### 🆕 New Components
- 🖱️ **Context Menu Component**: Professional right-click context menus with advanced functionality
  - Signal-based reactive state management for optimal performance
  - CDK Overlay integration for robust positioning and backdrop management
  - Global service architecture for centralized menu management
  - Keyboard accessibility (Escape to close, Enter for selection)
  - Disabled items support with proper ARIA attributes
  - Keyboard shortcuts display with optional shortcut text
  - Separator support for visual grouping
  - Browser context menu prevention with selective global listener
  - Multiple context menu support with seamless switching

#### 🛠️ CLI Tool Enhancements
- 📦 **Component Count Update**: Now supports 16 total components (up from 15)
- 🖱️ **Context Menu Installation**: Added context-menu component to CLI installation options
- 🔧 **Enhanced Component Categorization**: Added context-menu to "Overlays & Dialogs" category
- 📋 **Updated Component Descriptions**: Improved descriptions with accessibility features highlighted

#### 📖 Documentation Updates
- 📝 **Comprehensive Context Menu Docs**: Complete documentation with installation guide and advanced examples
  - Basic usage example with menu items and actions
  - Advanced example with text selection and file operations
  - Disabled items example showing proper state handling
  - Full API reference with IContextMenuItem interface
  - Architecture explanation with signals and service patterns
- 🚀 **Version Alignment**: Updated all version references to v1.0.4 across all README files
- 🎯 **CLI Installation Guide**: Updated CLI installation commands to use v1.0.4
- 📊 **Component Count**: Updated badges and feature lists to reflect 16 components
- 🖱️ **Main README**: Added ContextMenu to the components table with proper description

#### 🔧 Technical Improvements
- 🏗️ **Modern Architecture**: Implemented Angular Signals for reactive state management
- 📦 **CDK Integration**: Leveraged Angular CDK Overlay for professional positioning
- 🎨 **Global Service Pattern**: Centralized context menu management across application
- 🔗 **Template Portal**: Efficient template rendering in overlay system
- 🌟 **Production Ready**: Full accessibility compliance and keyboard navigation
- ⚡ **Performance Optimized**: Signal-based reactivity for minimal re-renders

---

## [1.0.3] - 2025-07-18

### 🎉 **Feature Release - Collapsible Component & Enhanced CLI**

#### 🆕 New Components
- 🔽 **Collapsible Component**: Interactive expandable content sections with smooth animations
  - Signal-based state management for optimal performance
  - Keyboard support (Enter/Space to toggle, Escape to close)
  - Accessibility compliant with ARIA attributes
  - Dependency injection pattern for clean component communication
  - Three sub-components: Collapsible, CollapsibleTrigger, CollapsibleContent

#### 🛠️ CLI Tool Enhancements
- 📦 **Component Count Update**: Now supports 15 total components (up from 14)
- 🔽 **Collapsible Installation**: Added collapsible component to CLI installation options
- 🔧 **TypeScript Improvements**: Added missing type definitions for better development experience
- 📋 **Enhanced Component Listing**: Updated component descriptions and categories

#### 📖 Documentation Updates
- 📝 **Comprehensive Collapsible Docs**: Complete documentation with installation guide and examples
- 🚀 **Version Alignment**: Updated all version references to v1.0.3 across all README files
- 🎯 **CLI Installation Guide**: Updated CLI installation commands throughout documentation
- 📊 **Component Count**: Updated badges and feature lists to reflect 15 components

#### 🔧 Technical Improvements
- 🏗️ **Build Process**: Enhanced build pipeline with proper TypeScript type checking
- 📦 **Package Publishing**: Successfully published both angular-superui and ngsui packages
- 🎨 **Code Quality**: Improved TypeScript type safety in CLI tool
- 🌟 **Production Ready**: All components tested and validated for production use

---

## [1.0.2] - 2025-07-18

### 🎠 **Major Feature Release - Carousel Component & Enhanced Library**

#### 🆕 New Components
- 🎠 **Carousel Component**: Feature-rich image carousel with advanced functionality
  - Auto-play with configurable intervals and pause on hover
  - Smooth navigation with previous/next controls
  - Pagination dots with clickable navigation
  - Keyboard support (Arrow keys, Enter, Space)
  - Touch/swipe support for mobile devices
  - Responsive design with mobile-first approach
  - Accessibility compliant with ARIA attributes

#### 🛠️ CLI Tool Enhancements
- 📦 **Component Count Update**: Now supports 14 total components (up from 8)
- 🎠 **Carousel Installation**: Added carousel component to CLI installation options
- 🔧 **Enhanced Component Management**: Improved component detection and installation
- 📋 **Better Component Listing**: Updated component descriptions and categories

#### 📖 Documentation Updates
- 📝 **Comprehensive Carousel Docs**: Complete documentation with installation guide and examples
- 🚀 **Version Updates**: Updated all version references to v1.0.2 across documentation
- 🎯 **Enhanced README**: Improved main README with better feature descriptions
- 📊 **Component Count**: Updated badges and feature lists to reflect 14 components

#### 🔧 Technical Improvements
- 🏗️ **Build Optimization**: Enhanced build process for better performance
- 📦 **Package Structure**: Improved package organization and exports
- 🎨 **Code Quality**: Enhanced TypeScript types and component interfaces
- 🌟 **Production Ready**: All components tested and validated for production use

---

## [1.0.1] - 2025-07-18

### ✨ **Minor Updates & Documentation Improvements**

#### 🔧 Package Management
- 📦 **Version Synchronization**: All packages synchronized to v1.0.1
- 🔄 **Package Lock Updates**: Updated all package-lock.json files for consistency
- 📊 **Component Count Accuracy**: Updated badges and documentation to reflect 8 components

#### 📖 Documentation Enhancements
- 🧩 **Fixed Stray Characters**: Replaced all garbled characters (�) with proper emojis in README files
- 👤 **Avatar Documentation**: Fixed avatar examples emoji (� → 👤)
- 🌙 **Dark Mode Documentation**: Fixed dark mode emoji (� → 🌙)
- 🔧 **CLI Reference**: Cleaned up CLI documentation formatting
- 📈 **Badge Updates**: Updated component count from 7 to 8 in shields

#### 🎨 CLI Tool Improvements
- 📋 **Accurate Component Listing**: Updated CLI to show only implemented components (8 total)
- 🌟 **Enhanced Display**: Improved list command with better categorization and modern banners
- ✨ **Visual Polish**: Added proper emojis and enhanced styling information
- 🚀 **Production Ready**: Updated messaging to reflect production-ready status

#### 🛠️ Technical Updates
- 🎯 **Component Data Accuracy**: Removed references to non-existent components
- 📝 **Enhanced CLI Output**: Improved component descriptions and feature highlights
- 🔍 **Better Organization**: Reorganized components by actual implementation status

---

## [1.0.0] - 2025-07-18

### 🎉 **Production Release - Angular SuperUI Goes Live!**

#### 🚀 Major Features
- 📦 **8 Production-Ready Components**: Complete component library with beautiful design
- 🏠 **Local-First Architecture**: Zero NPM dependencies, components live in your project
- ⚡ **CLI-Powered Installation**: Selective component installation with `ngsui`
- 🎨 **TailwindCSS v4**: Modern utility-first styling with full customization
- 🌙 **Enhanced Dark Mode**: System detection with theme persistence
- ♿ **Accessibility First**: WCAG 2.1 compliant with full keyboard navigation

#### 🧩 Core Component Library
- 🪗 **Accordion**: Vertically stacked interactive headings with content reveal
- 🚨 **Alert**: Important messages with different severity levels and styling
- 💬 **Alert Dialog**: Modal dialogs for critical user interactions
- 👤 **Avatar**: User representation with image fallback system
- 🏷️ **Badge**: Status indicators and labels with variant support
- 🍞 **Breadcrumb**: Navigation hierarchy with customizable separators
- 🔘 **Button**: Multiple variants with loading states and accessibility
- 📅 **Calendar**: ⭐ **Featured** - Enhanced calendar with range selection, drag support, and time picker

#### 🛠️ Developer Experience
- 🎯 **TypeScript First**: Full type safety with intelligent IntelliSense
- 🔧 **CVA Variants**: Type-safe component styling variants
- 🎭 **Smart Class Merging**: Intelligent TailwindCSS class combination
- 📱 **Mobile-First**: Responsive design approach from the ground up
- 🧪 **Production Tested**: Comprehensive test coverage and validation

#### 📋 CLI Tool Features
- 📦 **Selective Installation**: Install only components you need
- 🎨 **Smart Import Handling**: Automatic path resolution and dependency management
- 🔄 **Component Management**: Add, list, and manage components effortlessly
- 💡 **Interactive Mode**: User-friendly prompts and confirmations
- 🎯 **Zero Dependencies**: No external UI library dependencies

#### 🎨 Design System
- 🌈 **15+ Color Variants**: Extended color palette for all components
- 🎭 **Theme Customization**: Easy CSS variable-based theming
- 🎨 **Modern Aesthetics**: Beautiful, clean design following latest UI trends
- 📐 **Consistent Spacing**: Unified spacing system across all components
- 🔤 **Typography Scale**: Harmonious text sizing and hierarchy

#### 📚 Documentation & Resources
- 📖 **Comprehensive Docs**: Complete setup and usage documentation
- 🎯 **Quick Start Guide**: Get running in under 5 minutes
- 💡 **Component Examples**: Real-world usage patterns and best practices
- 🔧 **CLI Reference**: Complete command reference and options

#### 🔧 Technical Specifications
- 🚀 **Angular 18+**: Built for modern Angular with signals support
- 📦 **Tree Shakable**: Import only what you need for optimal bundles
- 🎯 **Zero Runtime**: Pure CSS with no JavaScript overhead
- 📱 **Responsive**: Mobile-first design approach
- ♿ **ARIA Compliant**: Full accessibility support

---

> 🎉 **Welcome to Angular SuperUI 1.0!** 
> 
> This marks the official production release of our modern, beautiful, and accessible Angular component library. Built with love for the Angular community! 💜
