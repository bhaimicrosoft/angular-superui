<div align="center">

# 🎨 Angular SuperUI v1.0.6

**The Modern Angular UI Component Library That Developers Love**

### 🌟 **[🚀 LIVE DEMO - See All Components in Action!](https://angular-superui.vercel.app/)** 🌟

**✨ Interactive Showcase • 21 Components • Dark Mode • Mobile Responsive • TypeScript • Accessibility ✨**


[![NPM Version](https://img.shields.io/npm/v/@angular-superui/components?style=for-the-badge&logo=npm&color=CB3837)](https://www.npmjs.com/package/angular-superui)
[![GitHub Stars](https://img.shields.io/github/stars/bhaimicrosoft/angular-superui?style=for-the-badge&logo=github&color=181717)](https://www.npmjs.com/package/ngsui-cli)
[![License](https://img.shields.io/github/license/bhaimicrosoft/angular-superui?style=for-the-badge&color=green)](https://github.com/bhaimicrosoft/angular-superui/blob/main/LICENSE)

</div>

<div align="center">

### ☕ Support This Project
[![Buy Me A Coffee](https://img.shields.io/badge/☕-Buy%20Me%20A%20Coffee-orange?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://coff.ee/bhaikaju)

</div>

<div align="center">
  <h2>🚀 The Modern Angular UI Component Library</h2>
  <p><strong>Beautiful • Accessible • Type-Safe • Zero External Dependencies</strong></p>
  
  ![Angular SuperUI](https://img.shields.io/badge/50%2B%20Components-Ready%20to%20Use-brightgreen?style=flat-square)
  ![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4-blue?style=flat-square)
  ![TypeScript](https://img.shields.io/badge/100%25-TypeScript-blue?style=flat-square)
  ![Angular 17+](https://img.shields.io/badge/Angular-17%2B-red?style=flat-square)
</div>

---

## ✨ What is Angular SuperUI?

Angular SuperUI is a **comprehensive, modern, and accessible** Angular UI component library that transforms how you build Angular applications. Built with **Tailwind CSS v4**, **TypeScript**, and **Angular 17+ Signals**, it provides 50+ production-ready components with **local-first architecture**.

### 🎯 **Why Angular SuperUI is the Best Choice for Your Project?**

🔥 **Local-First Architecture** - No external NPM dependencies, components live directly in your project  
⚡ **Smaller Bundles** - Tree-shakable components, only install what you use  
🎨 **Stunning Design System** - Modern, beautiful components with built-in dark mode  
🛠️ **CLI-Powered Development** - Effortless installation, updates, and component management  
📱 **Mobile-First Responsive** - Perfect on phones, tablets, desktops, and ultra-wide screens  
♿ **Accessibility Champion** - WCAG AA compliant, full ARIA support, keyboard navigation  
🎭 **Fully Customizable** - Easy theming, custom colors, spacing, and component variants  
🚀 **Modern Angular** - Built for Angular 17+ with signals, standalone components, and modern APIs  
🔒 **Type-Safe Everything** - Full TypeScript support with comprehensive IntelliSense  
⚙️ **Zero Config Setup** - Works out of the box with sensible defaults  
🎪 **Interactive Playground** - Live demo with 50+ component examples  
📚 **Comprehensive Docs** - Detailed API reference, examples, and best practices

### 🏆 **Perfect for:**
- ✅ **Enterprise Applications** - Scalable, maintainable component architecture
- ✅ **Rapid Prototyping** - Quick setup with beautiful defaults
- ✅ **Design Systems** - Consistent, reusable component patterns
- ✅ **SaaS Products** - Professional UI that users love
- ✅ **Admin Dashboards** - Rich data displays and form components
- ✅ **E-commerce Sites** - Product displays, forms, and user interfaces
- ✅ **Portfolio Sites** - Showcase your work with stunning components  

---

## 🚀 Quick Start

### 🌟 **First, Check Out Our Live Demo!** 🌟

<div align="center">

**🎮 [Experience Angular SuperUI Live](https://angular-superui.vercel.app/) 🎮**

[![Live Demo](https://img.shields.io/badge/🚀-LIVE%20DEMO-FF6B6B?style=for-the-badge&labelColor=000000&logo=vercel&logoColor=white)](https://angular-superui.vercel.app/)

*See all 21 components in action with dark mode, mobile responsiveness, and interactive examples!*

</div>

---

### 1️⃣ Install the CLI

```bash
npm install -g ngsui-cli@1.0.5
```

### 2️⃣ Initialize Your Project

```bash
ngsui-cli init
```

### 3️⃣ Add Components

```bash
# Add specific components
ngsui-cli add accordion alert avatar badge button card carousel checkbox collapsible theme-switcher

# Add all components
ngsui-cli add --all

# List available components
ngsui-cli list
```

### 4️⃣ Start Building

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
  AlertDialogComponent, 
  AlertDialogHeaderComponent, 
  AlertDialogFooterComponent, 
  AlertDialogTitleComponent, 
  AlertDialogDescriptionComponent, 
  AlertDialogActionComponent, 
  AlertDialogCancelComponent 
} from '@lib/alert-dialog';
import { AspectRatioComponent } from '@lib/aspect-ratio';
import { 
  Avatar, 
  AvatarImage, 
  AvatarFallback 
} from '@lib/avatar';
import { Badge } from '@lib/badge';
import { 
  BreadcrumbComponent,
  BreadcrumbListComponent,
  BreadcrumbItemComponent,
  BreadcrumbLinkComponent,
  BreadcrumbPageComponent,
  BreadcrumbSeparatorComponent,
  BreadcrumbEllipsisComponent
} from '@lib/breadcrumb';
import { ButtonComponent } from '@lib/button';
import { CalendarComponent } from '@lib/calendar';
import { 
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
  CardFooterComponent
} from '@lib/card';
import { Carousel } from '@lib/carousel';
import { CheckboxComponent } from '@lib/checkbox';
import { ThemeSwitcher } from '@lib/theme-switcher';

@Component({
  standalone: true,
  imports: [
    Accordion, AccordionItem, AccordionTrigger, AccordionContent,
    Alert, AlertTitle, AlertDescription, AlertIcon,
    AlertDialogComponent, AlertDialogHeaderComponent, AlertDialogFooterComponent, 
    AlertDialogTitleComponent, AlertDialogDescriptionComponent, AlertDialogActionComponent, AlertDialogCancelComponent,
    AspectRatioComponent,
    Avatar, AvatarImage, AvatarFallback,
    Badge,
    BreadcrumbComponent, BreadcrumbListComponent, BreadcrumbItemComponent, 
    BreadcrumbLinkComponent, BreadcrumbPageComponent, BreadcrumbSeparatorComponent, BreadcrumbEllipsisComponent,
    ButtonComponent,
    CalendarComponent,
    CardComponent, CardHeaderComponent, CardTitleComponent, 
    CardDescriptionComponent, CardContentComponent, CardFooterComponent,
    Carousel,
    CheckboxComponent,
    ThemeSwitcher
  ],
  template: `
    <!-- Card Example -->
    <CardComponent class="max-w-md mx-auto">
      <CardHeaderComponent>
        <div class="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <CardTitleComponent>Welcome back!</CardTitleComponent>
            <CardDescriptionComponent>Ready to build something amazing?</CardDescriptionComponent>
          </div>
        </div>
      </CardHeaderComponent>
      
      <CardContentComponent>
        <!-- Button Examples -->
        <div class="flex gap-2 mb-6">
          <ButtonComponent>Get Started</ButtonComponent>
          <ButtonComponent variant="outline">Learn More</ButtonComponent>
          <ButtonComponent variant="ghost" size="sm">
            <Badge variant="secondary" class="mr-2">New</Badge>
            Features
          </ButtonComponent>
        </div>

        <!-- Alert Example -->
        <Alert variant="success" class="mb-6">
          <AlertIcon>
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </AlertIcon>
      <div class="flex-1">
        <AlertTitle>Welcome to Angular SuperUI! 🎉</AlertTitle>
        <AlertDescription>
          You're ready to build amazing user interfaces.
        </AlertDescription>
      </div>
    </Alert>

    <!-- Accordion Example -->
    <Accordion type="single" [collapsible]="true" class="w-full mt-6">
      <AccordionItem value="item-1">
        <AccordionTrigger>Getting Started</AccordionTrigger>
        <AccordionContent>
          Install components locally and start building immediately.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  `
})
export class AppComponent {}
```

---

## 🧩 Available Components

<div align="center">

### 🧩 **Component Showcase**

</div>

| Component | Description | Status |
|-----------|-------------|--------|
| **🪗 [Accordion](./docs/components/accordion.md)** | Collapsible content sections with single or multiple modes | ✅ Available |
| **🚨 [Alert](./docs/components/alert.md)** | Contextual feedback messages with 5 variants | ✅ Available |
| **🚨 [AlertDialog](./docs/components/alert-dialog.md)** | Modal dialogs with full accessibility and focus management | ✅ Available |
| **� [AspectRatio](./docs/components/aspect-ratio.md)** | Maintains consistent proportions for responsive content containers | ✅ Available |
| **�👤 [Avatar](./docs/components/avatar.md)** | User profile image with automatic fallback support | ✅ Available |
| **🏷️ [Badge](./docs/components/badge.md)** | Status indicators and labels with 4 variants | ✅ Available |
| **🍞 [Breadcrumb](./docs/components/breadcrumb.md)** | Navigation breadcrumbs with accessibility and custom separators | ✅ Available |
| **🔘 [Button](./docs/components/button.md)** | Interactive buttons with 9 variants and loading states | ✅ Available |
| **📅 [Calendar](./docs/components/calendar.md)** | Date picker and calendar widget with month/year navigation | ✅ Available |
| **� [Card](./docs/components/card.md)** | Flexible content container with header, content, and footer | ✅ Available |
| **🎠 [Carousel](./docs/components/carousel.md)** | Accessible image carousel with auto-play, navigation, and pagination | ✅ Available |
| **☑️ [Checkbox](./docs/components/checkbox.md)** | A control that allows the user to toggle between checked and not checked | ✅ Available |
| **🗃️ [Collapsible](./docs/components/collapsible.md)** | Expandable content sections with smooth animations and keyboard support | ✅ Available |
| **🔽 [ComboBox](./docs/components/combobox.md)** | Dropdown selection with search, multi-select, and loading states | ✅ Available |
| **🖱️ [ContextMenu](./docs/components/context-menu.md)** | Right-click context menus with keyboard shortcuts and accessibility | ✅ Available |
| **📊 [DataTable](./docs/components/data-table.md)** | Enterprise-grade data table with sorting, filtering, pagination, and inline editing | ✅ Available |
| **🪟 [Dialog](./docs/components/dialog.md)** | Modal dialog windows with accessibility features and focus management | ✅ Available |
| **📄 [Drawer](./docs/components/drawer.md)** | Flexible drawer component that slides in from any side of the screen | ✅ Available |
| **⬇️ [DropdownMenu](./docs/components/dropdown-menu.md)** | Beautiful, accessible dropdown menu with multiple variants and advanced animations | ✅ Available |
| **📝 [Input](./docs/components/input.md)** | Flexible input component with multiple variants, validation states, and accessibility | ✅ Available |
| **🌓 [ThemeSwitcher](./docs/components/theme-switcher.md)** | Toggle between light, dark, and system themes with localStorage persistence | ✅ Available |

---

## 🎯 CLI Commands

### 📋 List Available Components
```bash
ngsui-cli list
```

### ➕ Add Components
```bash
# Add specific components
ngsui-cli add accordion alert card aspect-ratio
```

### ⚙️ Initialize Project
```bash
# Initialize with default settings
ngsui-cli init
```

---

## 💫 Component Features

### 🪗 **Accordion Component**
- **Multiple Modes**: Single or multiple items open
- **Accessibility**: Full WAI-ARIA compliance
- **Keyboard Navigation**: Arrow keys, Home/End, Enter/Space
- **Smooth Animations**: Tailwind CSS powered transitions
- **Screen Reader Support**: Proper announcements and labeling

### 🚨 **Alert Component**
- **5 Variants**: Default, Destructive, Warning, Success, Info
- **Flexible Layout**: Icon + Title + Description structure
- **ARIA Live Regions**: Automatic screen reader announcements
- **Tailwind CSS v4**: Modern utility-first styling
- **Semantic Colors**: Built-in color schemes for each variant

### 👤 **Avatar Component**
- **5 Sizes**: From sm (32px) to 2xl (80px) with responsive scaling
- **Smart Fallbacks**: Automatic fallback when images fail to load
- **Loading Timeout**: 5-second timeout with graceful degradation
- **Accessibility**: Proper ARIA labels and semantic roles
- **Performance**: Lazy loading and optimized image handling

### 🏷️ **Badge Component**
- **4 Variants**: Default, Secondary, Destructive, Outline
- **Smart ARIA Roles**: Automatic role assignment based on variant (alert/status/note)
- **Interactive Links**: Optional link mode with keyboard accessibility
- **Live Regions**: Dynamic content announcements for screen readers
- **WCAG 2.1 AA**: Full accessibility compliance with semantic roles
- **TypeScript**: Complete type safety with CVA variants

### 🔘 **Button Component**
- **9 Variants**: Default, Secondary, Destructive, Outline, Ghost, Link, Success, Warning, Info
- **8 Size Options**: Including icon-specific sizes (sm to xl)
- **Loading States**: Built-in spinner with custom loading text support
- **Full Accessibility**: ARIA attributes, keyboard navigation, screen reader support
- **Event Handling**: Click, keydown, focus, and blur events with TypeScript
- **Smart Interactions**: Space/Enter key support and disabled state management

### 🍞 **Breadcrumb Component**

- **7 Sub-Components**: Breadcrumb, List, Item, Link, Page, Separator, Ellipsis
- **Navigation Landmarks**: Semantic navigation with ARIA support
- **Router Integration**: Full Angular RouterLink support with active states
- **Custom Separators**: Flexible separator options (icon, text, custom)
- **Collapsed Navigation**: Ellipsis support for long breadcrumb chains
- **Accessibility**: WCAG 2.1 AA compliance with proper ARIA attributes
- **Event Handling**: Click events with navigation data and TypeScript safety

### 🚨 **AlertDialog Component**

- **Modal Dialog System**: Full modal dialog with overlay and focus trapping
- **7 Sub-Components**: AlertDialog, Header, Footer, Title, Description, Action, Cancel
- **Full Accessibility**: WCAG 2.1 AA compliance with ARIA support
- **Focus Management**: Automatic focus trapping and restoration
- **Keyboard Navigation**: Escape to close, Tab navigation, Enter/Space actions
- **Screen Reader Support**: Live region announcements and proper labeling
- **Flexible Actions**: Multiple action buttons with variants (destructive, secondary, default)
- **Prevent Close Options**: Configurable overlay click and escape key behavior

---

## 🛠️ What Makes Us Different?

| Feature | Angular SuperUI | Traditional Libraries |
|---------|-----------------|----------------------|
| **Installation** | Local components via CLI | NPM package dependency |
| **Bundle Size** | Only what you use | Full library in bundle |
| **Customization** | Direct file editing | CSS overrides/themes |
| **Dependencies** | Zero runtime dependencies | Package + peer dependencies |
| **Updates** | Manual (full control) | Automatic (breaking changes) |
| **TypeScript** | Perfect integration | Import/export complexity |

---

## 📖 Documentation

- 📋 **[Installation Guide](./docs/installation.md)** - Complete setup instructions
- 🪗 **[Accordion Examples](./docs/components/accordion.md)** - Interactive accordion usage
- 🚨 **[Alert Examples](./docs/components/alert.md)** - Alert variants and styling
- 👤 **[Avatar Examples](./docs/components/avatar.md)** - Avatar sizes and fallbacks
- 🏷️ **[Badge Examples](./docs/components/badge.md)** - Badge variants and accessibility
- 🍞 **[Breadcrumb Examples](./docs/components/breadcrumb.md)** - Navigation breadcrumbs and custom separators
- 🔘 **[Button Examples](./docs/components/button.md)** - Button variants, loading states, and events
- 🔧 **[CLI Reference](./packages/cli/README.md)** - All CLI commands and options

---

## 🤝 Contributing

We love contributions! Here's how you can help:

1. 🍴 **Fork** the repository
2. 🌿 **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. 💍 **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. 📤 **Push** to the branch (`git push origin feature/amazing-feature`)
5. 🎯 **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### 💝 Special Thanks

**🎨 [Shadcn/UI](https://ui.shadcn.com/)** - For the incredible design system and component architecture that inspired Angular SuperUI. This project wouldn't exist without the amazing foundation laid by shadcn's work in the React ecosystem.

**🌟 The Angular Team** - For building an amazing framework that makes component development a joy.

**🎯 Tailwind CSS** - For the utility-first CSS framework that powers our design system.

**💎 The Open Source Community** - For all the feedback, contributions, and support.

---

## 🔗 Resources

- � **[🚀 LIVE DEMO](https://angular-superui.vercel.app/)** - **Interactive showcase of all 16 components**
- �🌐 **[Official Website](https://github.com/bhaimicrosoft/angular-superui)**
- 📦 **[NPM Package](https://www.npmjs.com/package/angular-superui)**
- 🛠️ **[CLI Package](https://www.npmjs.com/package/ngsui-cli)**
- 🐛 **[Issue Tracker](https://github.com/bhaimicrosoft/angular-superui/issues)**
- 💬 **[Discussions](https://github.com/bhaimicrosoft/angular-superui/discussions)**

---

<div align="center">

### ☕ Enjoying Angular SuperUI?

**[Buy me a coffee](https://coff.ee/bhaikaju)** to support continued development!

---

**Made with ❤️ by [Indranil Mukherjee](https://bhaikaju.com)**

</div>
