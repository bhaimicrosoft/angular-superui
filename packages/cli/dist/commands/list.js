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
    // Get total component count from actually implemented components
    const totalComponents = Object.keys(add_1.COMPONENTS).length;
    console.log('');
    console.log(chalk_1.default.hex('#8B5CF6')('╔═══════════════════════════════════════════════════════════════════════╗'));
    console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#EC4899').bold('              📦 Angular SuperUI Component Library v' + CLI_VERSION + '              ') + chalk_1.default.hex('#8B5CF6')('║'));
    console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#10B981')('                                                                       ') + chalk_1.default.hex('#8B5CF6')('║'));
    console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#F59E0B')('                  🎯 ' + totalComponents + ' Production-Ready Components Available 🎯                   ') + chalk_1.default.hex('#8B5CF6')('║'));
    console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#06B6D4')('              ⚡ TailwindCSS • 🎨 Customizable • 🔥 TypeScript ⚡               ') + chalk_1.default.hex('#8B5CF6')('║'));
    console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#10B981')('                                                                       ') + chalk_1.default.hex('#8B5CF6')('║'));
    console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#EC4899')('                    ✨ Enterprise-Grade • Zero Dependencies ✨                     ') + chalk_1.default.hex('#8B5CF6')('║'));
    console.log(chalk_1.default.hex('#8B5CF6')('╚═══════════════════════════════════════════════════════════════════════╝'));
    console.log('');
    // Group components by category with actually implemented components only
    const categories = {
        '🎯 Core Components': ['button', 'badge', 'alert', 'avatar', 'accordion', 'card', 'combobox', 'checkbox'],
        '🧭 Navigation': ['breadcrumb'],
        '💫 Overlays & Dialogs': ['alert-dialog', 'context-menu', 'dialog'],
        '🎨 Media & Display': ['carousel', 'aspect-ratio'],
        '📊 Data & Tables': ['data-table'],
        '⚙️ User Interface': ['theme-switcher', 'collapsible'],
        '📅 Featured Component': ['calendar']
    };
    for (const [category, componentList] of Object.entries(categories)) {
        console.log(chalk_1.default.bold.yellow(category));
        componentList.forEach(componentKey => {
            const component = add_1.COMPONENTS[componentKey];
            if (component) {
                const icon = componentKey === 'calendar' ? '🌟' : '✨';
                console.log(chalk_1.default.green(`  ${icon} ${componentKey}`) + chalk_1.default.gray(` - ${component.description}`));
            }
        });
        console.log(''); // Empty line between categories
    }
    console.log(chalk_1.default.bgBlue.white(' 📖 QUICK START GUIDE '));
    console.log('');
    console.log(chalk_1.default.cyan('Add single component:    ') + chalk_1.default.yellow('ngsui-cli add button'));
    console.log(chalk_1.default.cyan('Add multiple components: ') + chalk_1.default.yellow('ngsui-cli add button alert badge'));
    console.log(chalk_1.default.cyan('Add featured calendar:   ') + chalk_1.default.yellow('ngsui-cli add calendar'));
    console.log(chalk_1.default.cyan('Add all components:      ') + chalk_1.default.yellow('ngsui-cli add --all'));
    console.log('');
    console.log(chalk_1.default.bgMagenta.white(' 🌟 FEATURED SPOTLIGHT '));
    console.log('');
    console.log(chalk_1.default.bold.green('📅 Enhanced Calendar Component:'));
    console.log(chalk_1.default.cyan('  🎯 Advanced range selection with intuitive drag support'));
    console.log(chalk_1.default.cyan('  ⏰ Integrated time picker for complete date-time handling'));
    console.log(chalk_1.default.cyan('  ♿ Full accessibility compliance (WCAG 2.1)'));
    console.log(chalk_1.default.cyan('  🎨 Beautiful TailwindCSS styling with custom themes'));
    console.log(chalk_1.default.cyan('  📱 Fully responsive design for all screen sizes'));
    console.log(chalk_1.default.cyan('  🔧 Easy customization with PascalCase selectors'));
    console.log('');
    console.log(chalk_1.default.bgCyan.black(' 🎨 MODERN STYLING SYSTEM '));
    console.log('');
    console.log(chalk_1.default.gray('Built with cutting-edge design principles:'));
    console.log(chalk_1.default.green('  🎨 TailwindCSS v4: ') + chalk_1.default.white('Latest utility-first CSS framework'));
    console.log(chalk_1.default.blue('  🔧 CVA Variants: ') + chalk_1.default.white('Type-safe component styling variants'));
    console.log(chalk_1.default.magenta('  🎭 Smart Class Merging: ') + chalk_1.default.white('Intelligent class combination system'));
    console.log(chalk_1.default.yellow('  📱 Mobile-First: ') + chalk_1.default.white('Responsive design from the ground up'));
    console.log(chalk_1.default.red('  ⚡ Zero Runtime: ') + chalk_1.default.white('Pure CSS with no JavaScript overhead'));
    console.log('');
    console.log(chalk_1.default.bgGreen.black(' 🚀 READY FOR PRODUCTION '));
    console.log('');
    console.log(chalk_1.default.gray('These components are battle-tested and production-ready:'));
    console.log(chalk_1.default.green('  ✅ Zero external dependencies'));
    console.log(chalk_1.default.blue('  📦 Tree-shakable for optimal bundle size'));
    console.log(chalk_1.default.yellow('  🔧 Angular 18+ compatible'));
    console.log(chalk_1.default.magenta('  🎯 TypeScript first with full type safety'));
    console.log(chalk_1.default.cyan('  🧪 Comprehensive test coverage'));
    console.log('');
    console.log(chalk_1.default.cyan('╔═══════════════════════════════════════════════════════════════╗'));
    console.log(chalk_1.default.cyan('║') + chalk_1.default.bold.green(`               🎉 Total: ${totalComponents} Components Available                `) + chalk_1.default.cyan('║'));
    console.log(chalk_1.default.cyan('║') + chalk_1.default.gray('          Zero Dependencies • Tree-Shakable • Angular 18+         ') + chalk_1.default.cyan('║'));
    console.log(chalk_1.default.cyan('║') + chalk_1.default.magenta('               💜 Built with ❤️ for Angular Developers          ') + chalk_1.default.cyan('║'));
    console.log(chalk_1.default.cyan('╚═══════════════════════════════════════════════════════════════╝'));
    console.log('');
}
exports.default = listCommand;
//# sourceMappingURL=list.js.map