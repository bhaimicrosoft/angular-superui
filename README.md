<div align="center">

# 🎨 Angular SuperUI v1.0.0

</div>

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
  
  ![Angular SuperUI](https://img.shields.io/badge/3%20Components-Ready%20to%20Use-brightgreen?style=flat-square)
  ![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4-blue?style=flat-square)
  ![TypeScript](https://img.shields.io/badge/100%25-TypeScript-blue?style=flat-square)
</div>

---

## ✨ What is Angular SuperUI?

Angular SuperUI is a **modern, beautiful, and accessible** Angular UI component library that revolutionizes how you build Angular applications. Built with **Tailwind CSS v4** and **TypeScript**, it provides a comprehensive set of reusable components with **local-first architecture**.

### 🎯 **Why Choose Angular SuperUI?**

🔥 **Local-First Architecture** - No NPM dependencies, components live in your project  
⚡ **Smaller Bundles** - Only install what you need  
🎨 **Beautiful Components** - Modern design system with dark mode support  
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
ngsui-cli add accordion alert avatar

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
} from '@components/accordion';
import { 
  Alert, 
  AlertTitle, 
  AlertDescription, 
  AlertIcon 
} from '@components/alert';
import { 
  Avatar, 
  AvatarImage, 
  AvatarFallback 
} from '@components/avatar';

@Component({
  standalone: true,
  imports: [
    Accordion, AccordionItem, AccordionTrigger, AccordionContent,
    Alert, AlertTitle, AlertDescription, AlertIcon,
    Avatar, AvatarImage, AvatarFallback
  ],
  template: `
    <!-- Avatar Example -->
    <div class="flex items-center gap-3 mb-6">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <p class="font-medium">Welcome back!</p>
        <p class="text-sm text-muted-foreground">Ready to build something amazing?</p>
      </div>
    </div>
    <!-- Alert Example -->
    <Alert variant="success">
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

## � Available Components

<div align="center">

### 🧩 **Component Showcase**

</div>

| Component | Description | Status |
|-----------|-------------|--------|
| **🪗 [Accordion](./docs/components/accordion.md)** | Collapsible content sections with single or multiple modes | ✅ Available |
| **🚨 [Alert](./docs/components/alert.md)** | Contextual feedback messages with 5 variants | ✅ Available |
| **👤 [Avatar](./docs/components/avatar.md)** | User profile image with automatic fallback support | ✅ Available |

### 🚀 **Coming Soon**
- Badge  
- Button
- Card
- Input
- Select
- And many more...

---

## 🎯 CLI Commands

### 📋 List Available Components
```bash
ngsui-cli list
```

### ➕ Add Components
```bash
# Add specific components
ngsui-cli add accordion alert
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

**Made with ❤️ by [Indranil Mukherjee](https://bhaikaju.com)**

</div>
