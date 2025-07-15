# Angular SuperUI v0.4.3 Release Notes

## � New Features

### CLI Enhancements
- **Multiple Component Installation**: Add multiple components in a single command
  - `angular-superui add button alert card dialog`
  - `angular-superui add checkbox switch textarea`
- **Install All Components**: New `--all` flag to install all available components at once
  - `angular-superui add --all`
  - `angular-superui add --all --force` (with force overwrite)
- **Enhanced CLI Output**: Better progress reporting and component installation feedback

## �🐛 Bug Fixes

### CLI Improvements
- **Fixed index.ts export formatting**: Resolved issue where CLI-generated `index.ts` files had malformed export statements
  - Previously: `\nexport * from './alert/alert'export * from './button/button'`
  - Now: Properly formatted with newlines between each export statement
  - Affects: `angular-superui add` command when adding multiple components

## 📦 Package Updates

- **angular-superui**: v0.4.2 → v0.4.3
- **angular-superui-cli**: v0.4.2 → v0.4.3

## 🔧 Technical Details

### What Changed
- Updated `addCommand` function to support array of component names and `--all` flag
- Updated CLI command definition to accept multiple component arguments
- Added proper newline handling for export statements in generated index files
- Enhanced error handling and user feedback for multiple component installations

### CLI Usage Examples
```bash
# Install single component
angular-superui add button

# Install multiple components
angular-superui add button alert card dialog

# Install all components
angular-superui add --all

# Force overwrite with multiple components
angular-superui add button alert --force

# Force overwrite all components
angular-superui add --all --force
```

### Impact
- Significantly improves developer experience for setting up projects
- Reduces time needed to add multiple components
- Maintains backward compatibility with existing single-component commands
- Fixes syntax errors in generated component index files
- No breaking changes - purely enhancement and bugfix release

## 📈 Installation

```bash
# Update global CLI
npm install -g angular-superui-cli@0.4.3

# Update library (if using manual installation)
npm install angular-superui@0.4.3
```

## 🙏 Contributors

This release includes contributions focusing on developer experience improvements, CLI functionality enhancements, and reliability improvements.

---

*Released on July 15, 2025*
