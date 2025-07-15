"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCommand = listCommand;
const chalk_1 = __importDefault(require("chalk"));
const add_1 = require("./add");
async function listCommand() {
    console.log(chalk_1.default.cyan('\\n📦 Available Angular SuperUI Components:\\n'));
    // Group components by category
    const categories = {
        'Core Components': ['button', 'badge', 'alert', 'card', 'input', 'progress'],
        'Form Components': ['checkbox', 'switch', 'textarea', 'select', 'radio-group', 'slider'],
        'Navigation Components': ['breadcrumb', 'tabs'],
        'Layout Components': ['separator', 'skeleton'],
        'Overlay Components': ['dialog', 'tooltip', 'popover', 'sheet'],
        'New Components (v0.3.0)': ['calendar', 'command'],
        'Display Components': ['avatar', 'table'],
        'Utility Components': ['theme-selector', 'toast', 'toggle', 'accordion', 'label']
    };
    for (const [category, componentList] of Object.entries(categories)) {
        console.log(chalk_1.default.yellow(`${category}:`));
        componentList.forEach(componentKey => {
            const component = add_1.COMPONENTS[componentKey];
            if (component) {
                console.log(chalk_1.default.green(`  ✓ ${componentKey}`) + chalk_1.default.gray(` - ${component.description}`));
            }
        });
        console.log(''); // Empty line between categories
    }
    console.log(chalk_1.default.cyan('📖 Usage Examples:'));
    console.log(chalk_1.default.white('  angular-superui add button'));
    console.log(chalk_1.default.white('  angular-superui add calendar'));
    console.log(chalk_1.default.white('  angular-superui add dialog'));
    console.log(chalk_1.default.cyan('\\n🎨 Color Variants Available:'));
    console.log(chalk_1.default.gray('Most components support these color variants:'));
    console.log(chalk_1.default.green('  • success, warning, info, destructive'));
    console.log(chalk_1.default.magenta('  • purple, pink, violet, indigo'));
    console.log(chalk_1.default.yellow('  • orange, amber, lime, yellow'));
    console.log(chalk_1.default.blue('  • blue, cyan, sky, teal'));
    console.log(chalk_1.default.red('  • rose, red, emerald, green'));
    console.log(chalk_1.default.cyan('\\n🌈 Total Components: ') + chalk_1.default.bold('30+'));
}
//# sourceMappingURL=list.js.map