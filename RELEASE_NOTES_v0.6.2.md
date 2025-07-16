# Angular SuperUI v0.6.2 Release Notes

**Release Date**: July 16, 2025

## 🎯 **Major Improvements**

### 🛠️ **CLI Naming Consistency**
- **Fixed CLI package naming**: Updated from `@ngsui/cli` to `ngsui-cli` throughout entire project
- **Consistent installation commands**: All documentation now uses `ngsui-cli` syntax
- **Updated CLI program name**: Fixed internal program name registration
- **Enhanced CLI usage examples**: All help text and examples now show correct command syntax

### 📚 **Documentation Enhancements**
- **Added Quick Navigation**: Comprehensive component navigation tables in demo.md
- **Separated Dialog and Sheet sections**: Distinct documentation sections for better clarity
- **Enhanced component organization**: Better categorization of components by type
- **Improved user experience**: More intuitive navigation and component discovery

### 🔧 **Technical Updates**
- **CLI source code updates**: Fixed program name and usage examples in TypeScript source
- **Build system improvements**: Updated compiled JavaScript files with correct naming
- **Version consistency**: Updated all version references across project files
- **Package management**: Refreshed package-lock.json with new version

## 📦 **Files Updated**

### CLI Package
- `packages/cli/package.json` - Version bump and package info
- `packages/cli/src/cli.ts` - Program name fix
- `packages/cli/src/commands/list.ts` - Usage example corrections
- `packages/cli/README.md` - Version updates and feature highlights

### Documentation
- `docs/demo.md` - Quick Navigation, Dialog/Sheet separation, CLI command fixes
- `docs/installation.md` - Updated installation commands
- `README.md` - Version updates and feature highlights
- `projects/lib/README.md` - Synchronized version and features

### Project Configuration
- `package.json` - Main project version bump
- `packages/cli/package-lock.json` - Regenerated with new version

## 🚀 **Migration Guide**

### For Existing Users
If you have the old CLI installed, update to the latest version:

```bash
# Uninstall old version (if installed)
npm uninstall -g @ngsui/cli

# Install new version
npm install -g ngsui-cli@0.6.2
```

### Command Changes
All CLI commands now use the `ngsui-cli` prefix:

```bash
# Old (deprecated)
@ngsui/cli add button

# New (current)
ngsui-cli add button
```

## 🐛 **Bug Fixes**
- Fixed inconsistent CLI naming throughout documentation
- Corrected installation command examples in all files
- Fixed CLI program registration and help text
- Resolved duplicate component installation lines

## 💡 **What's Next?**
- Enhanced component examples and use cases
- Additional component variants and customization options
- Improved CLI features and developer experience
- More comprehensive documentation and tutorials

---

**Full Changelog**: [v0.6.1...v0.6.2](https://github.com/bhaimicrosoft/angular-superui/compare/v0.6.1...v0.6.2)

**Download**: `npm install -g ngsui-cli@0.6.2`
