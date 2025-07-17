# 🎨 Angular SuperUI v1.0.0

<div align="center">

[![npm version](https://badge.fury.io/js/angular-superui.svg)](https://www.npmjs.com/package/angular-superui)
[![CLI version](https://badge.fury.io/js/ngsui-cli.svg)](https://www.npmjs.com/package/ngsui-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-17%2B-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/)

### ☕ Support This Project
[![Buy Me A Coffee](https://img.shields.io/badge/☕-Buy%20Me%20A%20Coffee-orange?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://coff.ee/bhaikaju)

</div>

<div align="center">
  <h3>🚀 The Modern Angular UI Component Library</h3>
  <p><strong>Beautiful • Accessible • Local-First • Zero Dependencies</strong></p>
  
  ![Angular SuperUI Demo](https://img.shields.io/badge/40%2B%20Components-Ready%20to%20Use-brightgreen?style=flat-square)
  ![Build Size](https://img.shields.io/badge/Bundle%20Size-60%25%20Smaller-blue?style=flat-square)
  ![TypeScript](https://img.shields.io/badge/100%25-TypeScript-blue?style=flat-square)
</div>

---

## ✨ What is Angular SuperUI?

Angular SuperUI is a **modern, beautiful, and accessible** Angular UI component library that revolutionizes how you build Angular applications. Built with **Tailwind CSS** and **TypeScript**, it provides a comprehensive set of **40+ reusable components** with **local-first architecture**.

### 🎯 **Why Choose Angular SuperUI?**

🔥 **Local-First Architecture** - No NPM dependencies, components live in your project  
⚡ **60% Smaller Bundles** - Only install what you need  
🎨 **40+ Beautiful Components** - Modern design system with dark mode  
🛠️ **CLI-Powered** - Effortless installation and management  
📱 **Fully Responsive** - Works perfectly on all devices  
♿ **Accessibility First** - ARIA compliant and keyboard friendly  
🎭 **Themeable** - Customize colors, spacing, and appearance  
🚀 **Angular 17+** - Built for modern Angular with signals support  

---

## 🚀 Quick Start

### 1️⃣ Install the CLI

```bash
npm install -g ngsui-cli@1.0.0
```

### 2️⃣ Initialize Your Project

```bash
ngsui-cli init
```

### 3️⃣ Add Components

```bash
# Add specific components
ngsui-cli add button card alert

# Or add all components
ngsui-cli add --all
```

### 4️⃣ Start Building

```typescript
import { Component } from '@angular/core';
import { Button } from '@components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/card';

@Component({
  standalone: true,
  imports: [Button, Card, CardContent, CardHeader, CardTitle],
  template: `
    <Card class="w-96">
      <CardHeader>
        <CardTitle>Welcome to Angular SuperUI! 🎉</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default" size="lg">Get Started</Button>
      </CardContent>
    </Card>
  `
})
export class AppComponent {}
```

---

## 📚 Component Library

<div align="center">

### 🧩 **Quick Navigation**

</div>

| Category | Components |
|----------|-----------|
| **🔘 Form Controls** | [Button](./docs/components/button.md) • [Input](./docs/components/input.md) • [Textarea](./docs/components/textarea.md) • [Select](./docs/components/select.md) • [Checkbox](./docs/components/checkbox.md) • [Radio Group](./docs/components/radio-group.md) • [Switch](./docs/components/switch.md) • [Slider](./docs/components/slider.md) • [Toggle](./docs/components/toggle.md) |
| **📋 Data Display** | [Table](./docs/components/table.md) • [Badge](./docs/components/badge.md) • [Avatar](./docs/components/avatar.md) • [Progress](./docs/components/progress.md) • [Skeleton](./docs/components/skeleton.md) • [Separator](./docs/components/separator.md) |
| **📦 Layout** | [Card](./docs/components/card.md) • [Accordion](./docs/components/accordion.md) • [Tabs](./docs/components/tabs.md) • [Collapsible](./docs/components/collapsible.md) • [Aspect Ratio](./docs/components/aspect-ratio.md) • [Scroll Area](./docs/components/scroll-area.md) |
| **🚨 Feedback** | [Alert](./docs/components/alert.md) • [Toast](./docs/components/toast.md) • [Alert Dialog](./docs/components/alert-dialog.md) • [Dialog](./docs/components/dialog.md) |
| **🧭 Navigation** | [Breadcrumb](./docs/components/breadcrumb.md) • [Pagination](./docs/components/pagination.md) • [Navigation Menu](./docs/components/navigation-menu.md) • [Menubar](./docs/components/menubar.md) |
| **🎯 Overlays** | [Popover](./docs/components/popover.md) • [Tooltip](./docs/components/tooltip.md) • [Hover Card](./docs/components/hover-card.md) • [Context Menu](./docs/components/context-menu.md) • [Dropdown Menu](./docs/components/dropdown-menu.md) |
| **🎠 Media** | [Carousel](./docs/components/carousel.md) • [Calendar](./docs/components/calendar.md) |
| **⚡ Utils** | [Label](./docs/components/label.md) • [Command](./docs/components/command.md) • [Resizable](./docs/components/resizable.md) |

---

## 🎯 CLI Commands

### 📋 List All Components
```bash
ngsui-cli list
```

### ➕ Add Components
```bash
# Add specific components
ngsui-cli add button card

# Add all components
ngsui-cli add --all

# Add with custom path
ngsui-cli add button --path ./src/components
```

### ⚙️ Initialize Project
```bash
# Initialize with default settings
ngsui-cli init

# Initialize with custom configuration
ngsui-cli init --components-path ./src/ui
```

---

## 💫 Features

### 🎨 **Modern Design System**
- **Beautiful Components**: Professionally designed with attention to detail
- **Dark Mode Support**: Automatic theme switching with system preference
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Tailwind CSS**: Utility-first styling with full customization

### 🏗️ **Local-First Architecture**
- **Zero Dependencies**: No angular-superui package required in production
- **Direct Installation**: Components installed in `./src/lib/components/`
- **Full Control**: Modify components freely without constraints
- **TypeScript Aliases**: Automatic `@components/*` and `@utils/*` setup

### ⚡ **Performance Optimized**
- **Tree Shakeable**: Only bundle what you use
- **60% Smaller Builds**: Compared to traditional component libraries
- **Lazy Loading Ready**: Components work with Angular's lazy loading
- **Signal Support**: Built for Angular's latest reactive primitives

### ♿ **Accessibility First**
- **ARIA Compliant**: Full screen reader support
- **Keyboard Navigation**: Complete keyboard accessibility
- **Focus Management**: Proper focus handling throughout
- **WCAG Guidelines**: Follows web accessibility standards

---

## 🛠️ What Makes Us Different?

| Feature | Angular SuperUI | Traditional Libraries |
|---------|-----------------|----------------------|
| **Installation** | Local components via CLI | NPM package dependency |
| **Bundle Size** | 60% smaller (only what you use) | Full library in bundle |
| **Customization** | Direct file editing | CSS overrides/themes |
| **Dependencies** | Zero runtime dependencies | Package + peer dependencies |
| **Updates** | Manual (full control) | Automatic (breaking changes) |
| **TypeScript** | Perfect integration | Import/export complexity |

---

## 📖 Documentation

- 📋 **[Installation Guide](./docs/installation.md)** - Complete setup instructions
- 📚 **[Component Examples](./docs/examples.md)** - Real-world usage examples
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

- 🌐 **[Official Website](https://github.com/bhaimicrosoft/angular-superui)**
- 📦 **[NPM Package](https://www.npmjs.com/package/angular-superui)**
- 🛠️ **[CLI Package](https://www.npmjs.com/package/ngsui-cli)**
- 🐛 **[Issue Tracker](https://github.com/bhaimicrosoft/angular-superui/issues)**
- 💬 **[Discussions](https://github.com/bhaimicrosoft/angular-superui/discussions)**

---

<div align="center">

### ☕ Enjoying Angular SuperUI?

**[Buy me a coffee](https://coff.ee/bhaikaju)** to support continued development!

---

**Made with ❤️ by [Indranil Mukherjee](https://github.com/bhaimicrosoft)**

</div>
