# Angular SuperUI v0.4.4 Release Notes

## 🐛 Bug Fixes

### CLI Critical Fixes
- **Fixed import paths**: Components now use correct relative paths `import { cn } from '../../utils/cn';`
- **Fixed prompt issues**: Interactive prompts now properly display and wait for user input
  - Fixed init command reinstall prompt that was stuck
  - Fixed add command overwrite prompt that never appeared
  - Prompts now properly stop/start spinner to ensure visibility

### TypeScript Path Aliases
- **Added automatic tsconfig.json updates**: CLI now configures path aliases during initialization
  - `baseUrl`: `"./src"`
  - `paths`: `{ "@utils/*": ["lib/utils/*"], "@components/*": ["lib/components/*"] }`
- **Improved project structure**: Better organization with path alias support

## 🔧 Technical Details

### What Changed
- **Import Path Resolution**: Fixed relative import paths in generated components
- **Inquirer Prompt Handling**: Added proper spinner stop/start around prompts
- **TSConfig Integration**: Automatic path alias configuration during project initialization
- **Better Error Handling**: Improved warning messages and graceful fallbacks

### Files Modified
- `packages/cli/src/commands/init.ts`: Added tsconfig path alias updates
- `packages/cli/src/commands/add.ts`: Fixed import paths and prompt handling
- Component generation now uses correct relative paths

### Impact
- ✅ Fixes import resolution errors in generated components
- ✅ Resolves stuck prompts that prevented proper user interaction
- ✅ Enables cleaner imports with TypeScript path aliases
- ✅ Improves overall CLI reliability and user experience
- ✅ No breaking changes - purely bug fixes and improvements

## 📦 Package Updates

- **angular-superui**: v0.4.3 → v0.4.4
- **@ngsui/cli**: v0.4.3 → v0.4.4

## 📈 Installation

```bash
# Update global CLI
npm install -g @ngsui/cli@0.4.4

# Update library (if using manual installation)
npm install angular-superui@0.4.4
```

## 🔄 Recommended Actions

If you experienced issues with v0.4.3:
1. Update to CLI v0.4.4
2. Re-run `angular-superui init` to apply tsconfig fixes
3. Re-add any components that had import issues

## 🙏 Contributors

This release focuses on critical bug fixes reported by the community, improving CLI reliability and developer experience.

---

*Released on July 15, 2025*
