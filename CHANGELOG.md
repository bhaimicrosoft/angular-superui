# 📋 Changelog

All notable changes to **Angular SuperUI** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- 🔄 **CLI Component Support**: Added all new components to ngsui-cli installation system
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
- 📦 **Package Publishing**: Successfully published both angular-superui and ngsui-cli packages
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
- ⚡ **CLI-Powered Installation**: Selective component installation with `ngsui-cli`
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
