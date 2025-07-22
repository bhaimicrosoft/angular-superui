<div align="center">

# 🎨 Angular SuperUI Documentation

### 🌟 **[🚀 LIVE INTERACTIVE DEMO!](https://angular-superui.vercel.app/)** 🌟

**✨ Experience All 21 Components Live • Dark Mode • Mobile Responsive ✨**

[![🚀 Live Demo](https://img.shields.io/badge/🚀-LIVE%20DEMO-FF6B6B?style=for-the-badge&logo=vercel&logoColor=white&labelColor=000000)](https://angular-superui.vercel.app/)
[![🎮 Interactive Components](https://img.shields.io/badge/🎮-Interactive%20Components-4ECDC4?style=for-the-badge&logo=angular&logoColor=white&labelColor=000000)](https://angular-superui.vercel.app/)
[![📱 Mobile Demo](https://img.shields.io/badge/📱-Mobile%20Demo-45B7D1?style=for-the-badge&logo=mobile&logoColor=white&labelColor=000000)](https://angular-superui.vercel.app/)

---

  <h1>
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/Angular-SuperUI-DD0031?style=for-the-badge&logo=angular&logoColor=white">
      <img alt="Angular SuperUI" src="https://img.shields.io/badge/Angular-SuperUI-DD0031?style=for-the-badge&logo=angular&logoColor=white">
    </picture>
  </h1>
  
  <p><strong>🚀 The most beautiful Angular component library you'll ever use</strong></p>
  
  [![npm version](https://img.shields.io/npm/v/@lib/angular-superui.svg?style=flat-square)](https://www.npmjs.com/package/@lib/angular-superui)
  [![downloads](https://img.shields.io/npm/dm/@lib/angular-superui.svg?style=flat-square)](https://www.npmjs.com/package/@lib/angular-superui)
  [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
  [![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support%20This%20Project-orange?style=flat-square&logo=buy-me-a-coffee)](https://buymeacoffee.com/bhaikaju)
  
  <br>
  
  <a href="#🚀-quick-start">Quick Start</a> • 
  <a href="#🎨-components">Components</a> • 
  <a href="#📚-examples">Examples</a> • 
  <a href="#🛠️-installation">Installation</a> • 
  <a href="#🤝-contributing">Contributing</a>
  
</div>

---

## ✨ What Makes Angular SuperUI Special?

<table>
<tr>
<td width="50%">

### 🎨 **Beautiful by Default**
Every component is meticulously crafted with attention to detail, following modern design principles and the latest UI trends.

### ⚡ **Blazing Fast Setup**
Get started in seconds with our intelligent CLI that automatically configures everything for you.

### 🌙 **Dark Mode Ready**
Built-in support for light and dark themes with seamless switching and system preference detection.

</td>
<td width="50%">

### ♿ **Accessibility First**
WCAG 2.1 AA compliant components with full keyboard navigation, screen reader support, and focus management.

### 🎯 **TypeScript Native**
Full type safety, IntelliSense support, and exceptional developer experience out of the box.

### 📱 **Mobile Optimized**
Responsive components that look perfect on any device, from mobile to desktop.

</td>
</tr>
</table>

---

## 🚀 Quick Start

### One-Command Installation
```bash
# 🎯 Automatic setup (Recommended)
ngsui-cli init

# 📦 Or install manually
npm install angular-superui
```

### Your First Component
```typescript
import { Component } from '@angular/core';
import { Button } from '@lib/button';
import { Card, CardHeader, CardTitle, CardContent } from '@lib/card';

@Component({
  standalone: true,
  imports: [Button, Card, CardHeader, CardTitle, CardContent],
  template: `
    <Card class="w-96">
      <CardHeader>
        <CardTitle>Welcome to Angular SuperUI! 🎉</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-muted-foreground mb-4">
          Build beautiful applications with our premium component library.
        </p>
        <Button>Get Started</Button>
      </CardContent>
    </Card>
  `
})
export class WelcomeComponent {}
```

---

## 🎨 Components Library

<div align="center">
  <h3>🌟 21 Production-Ready Components • Growing Every Week</h3>
</div>

### 🎯 **Core Components**
<table>
<tr>
<th width="20%">Component</th>
<th width="50%">Description</th>
<th width="15%">Status</th>
<th width="15%">Docs</th>
</tr>

<tr>
<td>
  <strong>🔘 Button</strong>
</td>
<td>
  Versatile button component with multiple variants, sizes, and states. Supports loading states, icons, and custom styling.
</td>
<td>
  <img src="https://img.shields.io/badge/✅-Ready-green?style=flat-square" alt="Ready">
</td>
<td>
  <a href="./components/button.md">📖 Docs</a>
</td>
</tr>

<tr>
<td>
  <strong>🎴 Card</strong>
</td>
<td>
  Flexible container component for organizing content. Perfect for dashboards, profiles, and content layouts.
</td>
<td>
  <img src="https://img.shields.io/badge/✅-Ready-green?style=flat-square" alt="Ready">
</td>
<td>
  <a href="./components/card.md">📖 Docs</a>
</td>
</tr>

<tr>
<td>
  <strong>🚨 Alert</strong>
</td>
<td>
  Contextual feedback messages with multiple variants (success, warning, error, info). Dismissible and customizable.
</td>
<td>
  <img src="https://img.shields.io/badge/✅-Ready-green?style=flat-square" alt="Ready">
</td>
<td>
  <a href="./components/alert.md">📖 Docs</a>
</td>
</tr>

<tr>
<td>
  <strong>👤 Avatar</strong>
</td>
<td>
  User profile images with automatic fallbacks, status indicators, and group layouts. Perfect for user interfaces.
</td>
<td>
  <img src="https://img.shields.io/badge/✅-Ready-green?style=flat-square" alt="Ready">
</td>
<td>
  <a href="./components/avatar.md">📖 Docs</a>
</td>
</tr>

<tr>
<td>
  <strong>🏷️ Badge</strong>
</td>
<td>
  Small status indicators and labels. Perfect for notifications, counts, and status displays.
</td>
<td>
  <img src="https://img.shields.io/badge/✅-Ready-green?style=flat-square" alt="Ready">
</td>
<td>
  <a href="./components/badge.md">📖 Docs</a>
</td>
</tr>

<tr>
<td>
  <strong>🗂️ Accordion</strong>
</td>
<td>
  Collapsible content panels with smooth animations. Single or multiple expansion modes supported.
</td>
<td>
  <img src="https://img.shields.io/badge/✅-Ready-green?style=flat-square" alt="Ready">
</td>
<td>
  <a href="./components/accordion.md">📖 Docs</a>
</td>
</tr>

</table>

### 🧭 **Navigation Components**
<table>
<tr>
<th width="20%">Component</th>
<th width="50%">Description</th>
<th width="15%">Status</th>
<th width="15%">Docs</th>
</tr>

<tr>
<td>
  <strong>🍞 Breadcrumb</strong>
</td>
<td>
  Navigation component showing the current page's location within a hierarchy. Supports custom separators and icons.
</td>
<td>
  <img src="https://img.shields.io/badge/✅-Ready-green?style=flat-square" alt="Ready">
</td>
<td>
  <a href="./components/breadcrumb.md">📖 Docs</a>
</td>
</tr>

</table>

### 💫 **Overlay & Dialog Components**
<table>
<tr>
<th width="20%">Component</th>
<th width="50%">Description</th>
<th width="15%">Status</th>
<th width="15%">Docs</th>
</tr>

<tr>
<td>
  <strong>⚠️ Alert Dialog</strong>
</td>
<td>
  Modal dialogs for important messages and confirmations. Accessible with focus management and keyboard navigation.
</td>
<td>
  <img src="https://img.shields.io/badge/✅-Ready-green?style=flat-square" alt="Ready">
</td>
<td>
  <a href="./components/alert-dialog.md">📖 Docs</a>
</td>
</tr>

<tr>
<td>
  <strong>🖱️ Context Menu</strong>
</td>
<td>
  Right-click context menus with keyboard shortcuts and accessibility. Signal-based state management with CDK Overlay.
</td>
<td>
  <img src="https://img.shields.io/badge/✅-Ready-green?style=flat-square" alt="Ready">
</td>
<td>
  <a href="./components/context-menu.md">📖 Docs</a>
</td>
</tr>

</table>

### 🎨 **Media & Display Components**
<table>
<tr>
<th width="20%">Component</th>
<th width="50%">Description</th>
<th width="15%">Status</th>
<th width="15%">Docs</th>
</tr>

<tr>
<td>
  <strong>🎠 Carousel</strong>
</td>
<td>
  Responsive image carousel with auto-play, navigation controls, and touch support. Perfect for image galleries and showcases.
</td>
<td>
  <img src="https://img.shields.io/badge/✅-Ready-green?style=flat-square" alt="Ready">
</td>
<td>
  <a href="./components/carousel.md">📖 Docs</a>
</td>
</tr>

</table>

### 📅 **Featured Components**
<table>
<tr>
<th width="20%">Component</th>
<th width="50%">Description</th>
<th width="15%">Status</th>
<th width="15%">Docs</th>
</tr>

<tr>
<td>
  <strong>📅 Calendar</strong>
</td>
<td>
  <strong>🌟 Premium:</strong> Advanced calendar with date range selection, time picker, drag & drop, and localization support.
</td>
<td>
  <img src="https://img.shields.io/badge/✨-Premium-gold?style=flat-square" alt="Premium">
</td>
<td>
  <a href="./components/calendar.md">📖 Docs</a>
</td>
</tr>

<tr>
<td>
  <strong>🗃️ Collapsible</strong>
</td>
<td>
  Expandable content sections with smooth animations and keyboard support. Perfect for FAQs, settings panels, and progressive disclosure.
</td>
<td>
  <img src="https://img.shields.io/badge/✅-Ready-green?style=flat-square" alt="Ready">
</td>
<td>
  <a href="./components/collapsible.md">📖 Docs</a>
</td>
</tr>

<tr>
<td>
  <strong>🔽 ComboBox</strong>
</td>
<td>
  Advanced dropdown selection with search functionality, multi-select support, loading states, and grouped options. Perfect for forms and data filtering.
</td>
<td>
  <img src="https://img.shields.io/badge/✅-Ready-green?style=flat-square" alt="Ready">
</td>
<td>
  <a href="./components/combobox.md">📖 Docs</a>
</td>
</tr>

<tr>
<td>
  <strong>📊 DataTable</strong>
</td>
<td>
  Enterprise-grade data table with sorting, filtering, pagination, inline editing, row selection, export capabilities, and mobile responsiveness. Perfect for admin dashboards and data management.
</td>
<td>
  <img src="https://img.shields.io/badge/✅-Ready-green?style=flat-square" alt="Ready">
</td>
<td>
  <a href="./components/data-table.md">📖 Docs</a>
</td>
</tr>

</table>

---

## 📚 Examples & Showcases

### 🎯 **Real-World Examples**

<details>
<summary><strong>🏪 E-Commerce Product Card</strong></summary>

```typescript
import { Component } from '@angular/core';
import { Card, CardHeader, CardContent, CardFooter } from '@lib/card';
import { Button } from '@lib/button';
import { Badge } from '@lib/badge';
import { Avatar } from '@lib/avatar';

@Component({
  standalone: true,
  imports: [Card, CardHeader, CardContent, CardFooter, Button, Badge, Avatar],
  template: `
    <Card class="w-80 overflow-hidden">
      <div class="relative">
        <img src="product-image.jpg" alt="Product" class="w-full h-48 object-cover">
        <Badge class="absolute top-2 right-2" variant="destructive">-20%</Badge>
      </div>
      
      <CardHeader class="pb-3">
        <div class="flex justify-between items-start">
          <h3 class="font-semibold text-lg">Premium Headphones</h3>
          <div class="text-right">
            <p class="text-2xl font-bold">$79</p>
            <p class="text-sm text-muted-foreground line-through">$99</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent class="pt-0">
        <p class="text-muted-foreground text-sm mb-3">
          High-quality wireless headphones with noise cancellation
        </p>
        <div class="flex items-center gap-2">
          <div class="flex">
            <span class="text-yellow-400">★★★★★</span>
          </div>
          <span class="text-sm text-muted-foreground">(128 reviews)</span>
        </div>
      </CardContent>
      
      <CardFooter class="gap-2">
        <Button variant="outline" class="flex-1">Add to Cart</Button>
        <Button class="flex-1">Buy Now</Button>
      </CardFooter>
    </Card>
  `
})
export class ProductCardComponent {}
```

</details>

<details>
<summary><strong>👨‍💼 User Profile Dashboard</strong></summary>

```typescript
import { Component } from '@angular/core';
import { Card, CardHeader, CardContent } from '@lib/card';
import { Avatar } from '@lib/avatar';
import { Badge } from '@lib/badge';
import { Button } from '@lib/button';
import { Alert } from '@lib/alert';

@Component({
  standalone: true,
  imports: [Card, CardHeader, CardContent, Avatar, Badge, Button, Alert],
  template: `
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Profile Header -->
      <Card>
        <CardContent class="pt-6">
          <div class="flex items-center space-x-4">
            <Avatar class="h-20 w-20">
              <img src="avatar.jpg" alt="User Avatar">
            </Avatar>
            <div class="space-y-1">
              <h1 class="text-2xl font-bold">John Doe</h1>
              <p class="text-muted-foreground">Senior Frontend Developer</p>
              <div class="flex gap-2">
                <Badge variant="secondary">Angular Expert</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge>Open to Work</Badge>
              </div>
            </div>
            <div class="ml-auto">
              <Button>Edit Profile</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent class="pt-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-600">24</div>
              <p class="text-muted-foreground">Projects Completed</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent class="pt-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600">98%</div>
              <p class="text-muted-foreground">Client Satisfaction</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent class="pt-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-600">5+</div>
              <p class="text-muted-foreground">Years Experience</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Notifications -->
      <Alert variant="success">
        <strong>Profile Updated!</strong> Your profile has been successfully updated.
      </Alert>
    </div>
  `
})
export class ProfileDashboardComponent {}
```

</details>

<details>
<summary><strong>🎠 Image Gallery with Carousel</strong></summary>

```typescript
import { Component } from '@angular/core';
import { Carousel } from '@lib/carousel';
import { Card, CardContent } from '@lib/card';
import { Button } from '@lib/button';

@Component({
  standalone: true,
  imports: [Carousel, Card, CardContent, Button],
  template: `
    <Card class="max-w-4xl mx-auto">
      <CardContent class="p-6">
        <h2 class="text-2xl font-bold mb-6">Our Latest Projects</h2>
        
        <Carousel
          [images]="projectImages"
          [width]="800"
          [height]="400"
          [interval]="5000"
          class="rounded-lg overflow-hidden"
        />
        
        <div class="mt-6 text-center">
          <Button variant="outline">View All Projects</Button>
        </div>
      </CardContent>
    </Card>
  `
})
export class GalleryComponent {
  projectImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop'
  ];
}
```

</details>

---

## 🛠️ Installation Guide

### 🚀 **Automatic Setup (Recommended)**

```bash
ngsui-cli init
```

This command will:
- ✅ Install the package and dependencies
- ✅ Configure Tailwind CSS automatically
- ✅ Add required CSS variables
- ✅ Set up the utility function
- ✅ Create example components

### 📦 **Manual Installation**

<details>
<summary>Click to expand manual installation steps</summary>

1. **Install the package:**
   ```bash
   npm install angular-superui class-variance-authority clsx tailwind-merge --legacy-peer-deps
   ```
2. **Add CSS Variables:**
   ```css
   /* src/styles.css */
   @import "tailwindcss";
    refer to installation.md for full list of classes
   
   ```
</details>

---
[Installation Details 👈🏻](./installation.md)
## 🎨 CLI Commands

Our powerful CLI makes component management effortless:

```bash
# 📋 List all available components
ngsui-cli list

# ⬇️ Add a single component
ngsui-cli add button

# ⬇️ Add multiple components
ngsui-cli add button card alert

# 🎠 Add the new carousel component
ngsui-cli add carousel

# ⬇️ Add all components at once
ngsui-cli add --all

# 📅 Add the premium calendar
ngsui-cli add calendar
```

---

## 🌟 What's Coming Next?

<div align="center">

### 🚧 **Roadmap 2025**

| Component | Status | Expected |
|-----------|--------|----------|
| 📝 Form Components | In Development | Q1 2025 |
| 🎭 Animation Library | Planning | Q1 2025 |
| 📊 Data Tables | Planning | Q2 2025 |
| 🎨 Theme Builder | Planning | Q2 2025 |
| 📱 Mobile Components | Planning | Q3 2025 |

</div>

---

## 🤝 Contributing

We love contributions! Here's how you can help make Angular SuperUI even better:

### 🎯 **Ways to Contribute**
- 🐛 **Report Bugs** - Found an issue? Let us know!
- 💡 **Suggest Features** - Have ideas for new components?
- 📝 **Improve Docs** - Help make our documentation better
- 🔧 **Submit PRs** - Fix bugs or add features
- ⭐ **Star the Repo** - Show your support!

### 🚀 **Quick Start for Contributors**

```bash
# 1. Fork and clone the repository
git clone https://github.com/bhaimicrosoft/angular-superui.git

# 2. Install dependencies
npm install

# 3. Start the development server
npm run start

# 4. Make your changes and test
npm run build
npm run test

# 5. Submit a pull request
```

**Read our [Contributing Guide](../CONTRIBUTING.md) for detailed instructions.**

---

## 💬 Community & Support

<div align="center">

### 🤝 **Join Our Community**

[![Discord](https://img.shields.io/badge/Discord-Join%20Community-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/your-discord)
[![Twitter](https://img.shields.io/badge/Twitter-Follow%20Us-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/bhaimicrosoft)
[![GitHub](https://img.shields.io/badge/GitHub-Star%20Us-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/bhaimicrosoft/angular-superui)

### 📚 **Resources**

| Resource | Description | Link |
|----------|-------------|------|
| 📖 **Documentation** | Complete component documentation | [Browse Docs](./README.md) |
| 🐛 **Bug Reports** | Report issues and bugs | [GitHub Issues](https://github.com/bhaimicrosoft/angular-superui/issues) |
| 💬 **Discussions** | Community discussions and help | [GitHub Discussions](https://github.com/bhaimicrosoft/angular-superui/discussions) |
| 📝 **Changelog** | See what's new in each version | [Changelog](../CHANGELOG.md) |

</div>

---

## 📄 License

**Angular SuperUI** is open source software licensed under the [MIT License](../LICENSE).

```
MIT License

Copyright (c) 2024 Indranil Mukherjee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

<div align="center">

### 💝 **Support the Project**

If Angular SuperUI has helped you build amazing applications, consider supporting the project:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support%20This%20Project-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/bhaikaju)

**Your support helps us:**
- 🚀 Add new components faster
- 🐛 Fix bugs and improve quality  
- 📚 Create better documentation
- 🌟 Maintain the project long-term

---

### 👨‍💻 **Created with ❤️ by**

**[Indranil Mukherjee](https://bhaikaju.com)**  
*Full Stack Developer & UI/UX Enthusiast*

[![GitHub](https://img.shields.io/badge/GitHub-bhaimicrosoft-181717?style=flat-square&logo=github)](https://github.com/bhaimicrosoft)


---

<p><em>Made with ❤️ for the Angular community</em></p>
<p><strong>Happy coding! 🚀</strong></p>
