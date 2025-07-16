# Angular SuperUI v0.6.1 Release Notes

**Release Date:** July 16, 2025  
**Packages:** `angular-superui@0.6.1` & `ngsui-cli@0.6.1`

## 🎉 **Enhanced Button Component**

### 🔧 **Button Type Attribute Support**
- **✅ Type Attribute**: Added essential `type` attribute support for Button component
- **✅ SEO Enhancement**: Proper button typing for better accessibility and SEO
- **✅ Form Compatibility**: Support for `button`, `submit`, and `reset` button types
- **✅ Default Behavior**: Defaults to `type="button"` for optimal user experience

### **Usage Examples**
```typescript
// Default button (type="button")
<Button>Click Me</Button>

// Submit button for forms
<Button type="submit">Submit Form</Button>

// Reset button for forms
<Button type="reset">Reset Form</Button>
```

## 🔧 **CLI Fixes & Improvements**

### **Command Name Correction**
- **Fixed CLI Command**: Corrected bin command from `ngsui` to `ngsui-cli` for consistency
- **Package Alignment**: CLI command now matches package name (`ngsui-cli`)
- **Documentation Updates**: Updated all examples and documentation to use proper `ngsui-cli` command

### **Installation**
```bash
npm install -g ngsui-cli@0.6.1
```

### **Usage**
```bash
# Initialize Angular SuperUI in your project
ngsui-cli init

# Add components
ngsui-cli add button alert card

# Install all components
ngsui-cli add --all

# List available components
ngsui-cli list
```

### **What Changed**
- ✅ **Consistent Command**: `ngsui-cli` command now matches package name
- ✅ **Updated Documentation**: All README files and examples corrected
- ✅ **Proper Installation**: Fixed bin entry in package.json

### **Migration from v0.6.0**
If you have `ngsui-cli@0.6.0` installed, update to get the correct command:

```bash
npm update -g ngsui-cli
```

---

**Previous Version**: v0.6.0  
**Main Library**: angular-superui@0.6.0 (unchanged)  
**CLI Tool**: ngsui-cli@0.6.1  

### **Note**
This is a CLI-only release to fix command naming consistency. The main Angular SuperUI library remains at v0.6.0.
