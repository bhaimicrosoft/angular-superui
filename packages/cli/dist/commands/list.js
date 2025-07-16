"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCommand = listCommand;
const chalk_1 = __importDefault(require("chalk"));
const add_1 = require("./add");
// Get version from package.json
const packageJson = require('../../package.json');
const CLI_VERSION = packageJson.version;
async function listCommand() {
    console.log('');
    console.log(chalk_1.default.cyan('┌─────────────────────────────────────────────────────────────┐'));
    console.log(chalk_1.default.cyan('│') + chalk_1.default.bold.magenta('           📦 Angular SuperUI Components           ') + chalk_1.default.cyan('│'));
    console.log(chalk_1.default.cyan('│') + chalk_1.default.yellow(`                     v${CLI_VERSION}                      `) + chalk_1.default.cyan('│'));
    console.log(chalk_1.default.cyan('└─────────────────────────────────────────────────────────────┘'));
    console.log('');
    // Group components by category
    const categories = {
        '🎯 Core Components': ['button', 'badge', 'alert', 'card', 'input', 'progress'],
        '📝 Form Components': ['checkbox', 'switch', 'textarea', 'select', 'radio-group', 'slider'],
        '🧭 Navigation Components': ['breadcrumb', 'tabs'],
        '📐 Layout Components': ['separator', 'skeleton'],
        '💫 Overlay Components': ['dialog', 'tooltip', 'popover', 'sheet'],
        '🆕 New Components': ['calendar', 'command'],
        '🖼️ Display Components': ['avatar', 'table'],
        '⚙️ Utility Components': ['theme-selector', 'toast', 'toggle', 'accordion', 'label']
    };
    for (const [category, componentList] of Object.entries(categories)) {
        console.log(chalk_1.default.bold.yellow(category));
        componentList.forEach(componentKey => {
            const component = add_1.COMPONENTS[componentKey];
            if (component) {
                console.log(chalk_1.default.green(`  ✓ ${componentKey}`) + chalk_1.default.gray(` - ${component.description}`));
            }
        });
        console.log(''); // Empty line between categories
    }
    console.log(chalk_1.default.bgBlue.white(' 📖 USAGE EXAMPLES '));
    console.log('');
    console.log(chalk_1.default.cyan('Single component:    ') + chalk_1.default.yellow('@ngsui/cli add button'));
    console.log(chalk_1.default.cyan('Multiple components: ') + chalk_1.default.yellow('@ngsui/cli add button card alert'));
    console.log(chalk_1.default.cyan('All components:      ') + chalk_1.default.yellow('@ngsui/cli add --all'));
    console.log('');
    console.log(chalk_1.default.bgMagenta.white(' 🎨 COLOR VARIANTS '));
    console.log('');
    console.log(chalk_1.default.gray('Most components support these beautiful color variants:'));
    console.log(chalk_1.default.green('  🟢 Semantic: ') + chalk_1.default.white('success, warning, info, destructive'));
    console.log(chalk_1.default.magenta('  🟣 Purple Family: ') + chalk_1.default.white('purple, pink, violet, indigo'));
    console.log(chalk_1.default.yellow('  🟡 Warm Colors: ') + chalk_1.default.white('orange, amber, lime, yellow'));
    console.log(chalk_1.default.blue('  🔵 Cool Colors: ') + chalk_1.default.white('blue, cyan, sky, teal'));
    console.log(chalk_1.default.red('  🔴 Nature Colors: ') + chalk_1.default.white('rose, red, emerald, green'));
    console.log('');
    console.log(chalk_1.default.cyan('┌─────────────────────────────────────────────────────────────┐'));
    console.log(chalk_1.default.cyan('│') + chalk_1.default.bold.green('               🌈 Total: 30+ Components                ') + chalk_1.default.cyan('│'));
    console.log(chalk_1.default.cyan('│') + chalk_1.default.gray('            Local-First • Zero Dependencies             ') + chalk_1.default.cyan('│'));
    console.log(chalk_1.default.cyan('└─────────────────────────────────────────────────────────────┘'));
    console.log('');
}
//# sourceMappingURL=list.js.map