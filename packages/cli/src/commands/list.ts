import chalk from 'chalk';
import { COMPONENTS, BLOCKS } from './add';

// Get version from package.json
const packageJson = require('../../package.json');
const CLI_VERSION = packageJson.version;

export async function listCommand() {
  // Get total component and block counts
  const totalComponents = Object.keys(COMPONENTS).length;
  const totalBlocks = Object.keys(BLOCKS).length;
  
  console.log('');
  console.log(chalk.hex('#8B5CF6')('╔═══════════════════════════════════════════════════════════════════════╗'));
  console.log(chalk.hex('#8B5CF6')('║') + chalk.hex('#EC4899').bold('              📦 Angular SuperUI Component Library v' + CLI_VERSION + '              ') + chalk.hex('#8B5CF6')('║'));
  console.log(chalk.hex('#8B5CF6')('║') + chalk.hex('#10B981')('                                                                       ') + chalk.hex('#8B5CF6')('║'));
  console.log(chalk.hex('#8B5CF6')('║') + chalk.hex('#F59E0B')('              🎯 ' + totalComponents + ' Components + ' + totalBlocks + ' UI Blocks Available 🎯               ') + chalk.hex('#8B5CF6')('║'));
  console.log(chalk.hex('#8B5CF6')('║') + chalk.hex('#06B6D4')('              ⚡ TailwindCSS • 🎨 Customizable • 🔥 TypeScript ⚡               ') + chalk.hex('#8B5CF6')('║'));
  console.log(chalk.hex('#8B5CF6')('║') + chalk.hex('#10B981')('                                                                       ') + chalk.hex('#8B5CF6')('║'));
  console.log(chalk.hex('#8B5CF6')('║') + chalk.hex('#EC4899')('                    ✨ Enterprise-Grade • Zero Dependencies ✨                     ') + chalk.hex('#8B5CF6')('║'));
  console.log(chalk.hex('#8B5CF6')('╚═══════════════════════════════════════════════════════════════════════╝'));
  console.log('');

  // Group components by category with actually implemented components only
  const categories = {
    '🎯 Core Components': ['button', 'badge', 'alert', 'avatar', 'accordion', 'card', 'combobox', 'checkbox', 'input', 'input-otp', 'progress', 'radio-group', 'select', 'rating'],
    '🧭 Navigation': ['breadcrumb', 'pagination', 'sidebar', 'stepper', 'tabs'],
    '💫 Overlays & Dialogs': ['alert-dialog', 'context-menu', 'dialog', 'drawer', 'dropdown-menu', 'popover', 'toast', 'tooltip'],
    '🎨 Media & Display': ['carousel', 'aspect-ratio', 'skeleton', 'spinner'],
    '📊 Data & Tables': ['data-table'],
    '🎛️ Controls & Inputs': ['slider', 'toggle', 'textarea'],
    '📁 File Management': ['file-upload'],
    '⚙️ User Interface': ['theme-switcher', 'collapsible'],
    '📅 Featured Component': ['calendar']
  };

  for (const [category, componentList] of Object.entries(categories)) {
    console.log(chalk.bold.yellow(category));
    
    componentList.forEach(componentKey => {
      const component = COMPONENTS[componentKey as keyof typeof COMPONENTS];
      if (component) {
        const icon = componentKey === 'calendar' ? '🌟' : '✨';
        console.log(chalk.green(`  ${icon} ${componentKey}`) + chalk.gray(` - ${component.description}`));
      }
    });
    
    console.log(''); // Empty line between categories
  }

  // List UI Blocks
  console.log(chalk.bold.hex('#8B5CF6')('🏗️ UI Blocks (Complete Page Sections)'));
  
  for (const [blockKey, block] of Object.entries(BLOCKS)) {
    console.log(chalk.green(`  🏗️ ${blockKey}`) + chalk.gray(` - ${block.description}`));
  }
  
  console.log(''); // Empty line before quick start

  console.log(chalk.bgBlue.white(' 📖 QUICK START GUIDE '));
  console.log('');
  console.log(chalk.bold.cyan('📦 Components:'));
  console.log(chalk.cyan('  Add single component:    ') + chalk.yellow('ngsui add button'));
  console.log(chalk.cyan('  Add multiple components: ') + chalk.yellow('ngsui add button alert badge'));
  console.log(chalk.cyan('  Add all components:      ') + chalk.yellow('ngsui add --all'));
  console.log('');
  console.log(chalk.bold.cyan('🏗️ UI Blocks:'));
  console.log(chalk.cyan('  Add single block:        ') + chalk.yellow('ngsui add block hero-section'));
  console.log(chalk.cyan('  Add multiple blocks:     ') + chalk.yellow('ngsui add block header footer'));
  console.log(chalk.cyan('  Add all blocks:          ') + chalk.yellow('ngsui add --all-blocks'));
  console.log('');
  
  console.log(chalk.bgMagenta.white(' 🌟 FEATURED SPOTLIGHT '));
  console.log('');
  console.log(chalk.bold.green('📅 Enhanced Calendar Component:'));
  console.log(chalk.cyan('  🎯 Advanced range selection with intuitive drag support'));
  console.log(chalk.cyan('  ⏰ Integrated time picker for complete date-time handling'));
  console.log(chalk.cyan('  ♿ Full accessibility compliance (WCAG 2.1)'));
  console.log(chalk.cyan('  🎨 Beautiful TailwindCSS styling with custom themes'));
  console.log(chalk.cyan('  📱 Fully responsive design for all screen sizes'));
  console.log(chalk.cyan('  🔧 Easy customization with PascalCase selectors'));
  console.log('');
  
  console.log(chalk.bgCyan.black(' 🎨 MODERN STYLING SYSTEM '));
  console.log('');
  console.log(chalk.gray('Built with cutting-edge design principles:'));
  console.log(chalk.green('  🎨 TailwindCSS v4: ') + chalk.white('Latest utility-first CSS framework'));
  console.log(chalk.blue('  🔧 CVA Variants: ') + chalk.white('Type-safe component styling variants'));
  console.log(chalk.magenta('  🎭 Smart Class Merging: ') + chalk.white('Intelligent class combination system'));
  console.log(chalk.yellow('  📱 Mobile-First: ') + chalk.white('Responsive design from the ground up'));
  console.log(chalk.red('  ⚡ Zero Runtime: ') + chalk.white('Pure CSS with no JavaScript overhead'));
  console.log('');
  
  console.log(chalk.bgGreen.black(' 🚀 READY FOR PRODUCTION '));
  console.log('');
  console.log(chalk.gray('These components are battle-tested and production-ready:'));
  console.log(chalk.green('  ✅ Zero external dependencies'));
  console.log(chalk.blue('  📦 Tree-shakable for optimal bundle size'));
  console.log(chalk.yellow('  🔧 Angular 18+ compatible'));
  console.log(chalk.magenta('  🎯 TypeScript first with full type safety'));
  console.log(chalk.cyan('  🧪 Comprehensive test coverage'));
  console.log('');
  
  console.log(chalk.cyan('╔═══════════════════════════════════════════════════════════════╗'));
  console.log(chalk.cyan('║') + chalk.bold.green(`         🎉 Total: ${totalComponents} Components + ${totalBlocks} Blocks Available         `) + chalk.cyan('║'));
  console.log(chalk.cyan('║') + chalk.gray('          Zero Dependencies • Tree-Shakable • Angular 18+         ') + chalk.cyan('║'));
  console.log(chalk.cyan('║') + chalk.magenta('               💜 Built with ❤️ for Angular Developers          ') + chalk.cyan('║'));
  console.log(chalk.cyan('╚═══════════════════════════════════════════════════════════════╝'));
  console.log('');
}

export default listCommand;
