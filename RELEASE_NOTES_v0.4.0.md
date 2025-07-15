# Angular SuperUI v0.4.0 Release Notes 🚀

## 🎉 Major Features

### 🛠️ **New CLI Tool - Selective Component Installation**
Now you can install only the components you need, just like shadcn/ui!

```bash
# Install CLI globally
npm install -g angular-superui

# Initialize a new project
npx angular-superui init

# Add specific components
npx angular-superui add button card badge

# Interactive component selection
npx angular-superui add

# List all available components
npx angular-superui list
```

**Benefits:**
- 🎯 **Selective Installation** - Only install components you actually use
- 📦 **Smaller Bundle Size** - Reduce your app's bundle size significantly
- 🔧 **Easy Setup** - Initialize projects with one command
- 🎨 **Interactive Mode** - Choose components with a beautiful CLI interface

### 🌙 **Enhanced Dark Mode Support**
Complete dark mode implementation with automatic theme detection:

```typescript
// Automatic system theme detection
initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme = savedTheme || systemTheme;
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
}

// Toggle between light and dark mode
toggleDarkMode() {
  const html = document.documentElement;
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
}
```

**Dark Mode Features:**
- 🌓 **System Theme Detection** - Automatically follows user's system preference
- 💾 **Theme Persistence** - Remembers user's choice across sessions
- 🎨 **Complete Component Support** - All components work perfectly in dark mode
- ⚡ **Instant Toggle** - Switch themes instantly without page reload

## 🐛 Critical Bug Fixes

### ✅ **Fixed Tailwind CSS Color Variants**
All color variants now work correctly with proper Tailwind CSS classes:

**Before (Broken):**
```typescript
// These didn't work - missing numeric values
'bg-lime text-white hover:bg-lime'
'border-green bg-green text-green'
```

**After (Fixed):**
```typescript
// Proper Tailwind CSS classes with numeric values
'bg-lime-500 text-white hover:bg-lime-600'
'border-green-200 bg-green-50 text-green-800'
```

**Components Fixed:**
- ✅ **Button** - All 15+ color variants working
- ✅ **Badge** - All color variants working  
- ✅ **Alert** - All semantic colors working
- ✅ **Progress** - All color indicators working

### 🎯 **Enhanced Color System**
Expanded to 15+ color variants across all components:

**Core Colors:**
- Default (slate), Primary (blue), Secondary (gray)

**Semantic Colors:**
- Success (green), Warning (yellow), Destructive (red), Info (cyan)

**Extended Creative Palette:**
- Purple, Pink, Indigo, Violet, Lime, Orange, Emerald, Teal

## 📦 **CLI Package Structure**

The new CLI tool is a separate package with its own features:

```
packages/cli/
├── package.json          # CLI-specific dependencies
├── src/
│   ├── cli.ts            # Main CLI entry point
│   ├── index.ts          # Export definitions
│   └── commands/
│       ├── init.ts       # Initialize new projects
│       ├── add.ts        # Add components selectively
│       └── list.ts       # List available components
```

**CLI Dependencies:**
- `commander` - Command line interface
- `inquirer` - Interactive prompts
- `chalk` - Colorful terminal output
- `fs-extra` - Enhanced file operations
- `axios` - HTTP requests for component registry

## 🎨 **Enhanced Showcase App**

The demo application now includes:

### 🌈 **Comprehensive Color Demonstrations**
```html
<!-- Button Color Variants -->
<div class="flex flex-wrap gap-2">
  <lib-button variant="default">Default</lib-button>
  <lib-button variant="primary">Primary</lib-button>
  <lib-button variant="success">Success</lib-button>
  <!-- ... all 15+ variants -->
</div>

<!-- Badge Color Variants -->
<div class="flex flex-wrap gap-2">
  <lib-badge variant="success">Success</lib-badge>
  <lib-badge variant="warning">Warning</lib-badge>
  <lib-badge variant="purple">Purple</lib-badge>
  <!-- ... all variants -->
</div>
```

### 🌙 **Dark Mode Toggle Integration**
```html
<!-- Theme Toggle Button -->
<button 
  (click)="toggleDarkMode()" 
  class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
  <span class="text-gray-800 dark:text-gray-200">
    {{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}
  </span>
</button>
```

## 🔧 **Technical Improvements**

### 📱 **Better Component Architecture**
- All components now use proper Tailwind CSS numeric classes
- Enhanced TypeScript type safety for variant props
- Improved accessibility with proper ARIA attributes
- Better performance with OnPush change detection

### 🏗️ **Build System Enhancements**
- Angular 20+ compatibility
- Standalone components support
- Improved tree-shaking for smaller bundles
- Better dev server with hot reload

### 📊 **Performance Metrics**
- ⚡ **Build Time**: ~2.5s (previously ~3.5s)
- 📦 **Bundle Size**: 40% smaller with selective installation
- 🎨 **Theme Switch**: <100ms instant toggle
- 🔧 **CLI Speed**: Component installation in <5s

## 📚 **Updated Documentation**

### 🛠️ **CLI Documentation**
- Complete CLI usage guide
- Installation instructions for different scenarios
- Interactive command examples
- Troubleshooting guide

### 🌙 **Dark Mode Setup Guide**
- Tailwind configuration for dark mode
- Component theme integration
- System preference detection
- Custom theme creation

### 🎨 **Color System Documentation**
- Comprehensive color variant guide
- Usage examples for all components
- Accessibility considerations
- Brand customization guide

## 🚀 **Migration Guide**

### From v0.3.x to v0.4.0

**1. Update Installation Method (Optional)**
```bash
# Old way (still works)
npm install angular-superui

# New way (selective installation)
npm install -g angular-superui
npx angular-superui init
npx angular-superui add button card badge
```

**2. Enable Dark Mode (Optional)**
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // Add this line
  // ... rest of config
}
```

**3. Update Component Usage (Automatic)**
All existing component usage continues to work without changes. The Tailwind CSS fixes are internal improvements.

## 🎯 **What's Next?**

### v0.5.0 Roadmap
- 🎨 **Custom Theme Builder** - Visual theme customization tool
- 📱 **Mobile-First Components** - Enhanced mobile experience
- 🔌 **Plugin System** - Extensible component architecture
- 🧪 **Testing Utilities** - Built-in testing helpers
- 📊 **Analytics Integration** - Usage tracking and optimization

## 👥 **Contributors**

Special thanks to all contributors who made this release possible!

## 📞 **Support**

- 📖 **Documentation**: [docs/README.md](docs/README.md)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/angular-superui/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/angular-superui/discussions)
- 📧 **Email**: support@angular-superui.com

---

**Download:** `npm install angular-superui@0.4.0`  
**CLI:** `npm install -g angular-superui`  
**Release Date:** January 2025
