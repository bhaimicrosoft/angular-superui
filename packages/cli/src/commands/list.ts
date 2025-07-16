import chalk from 'chalk';
import { COMPONENTS } from './add';

// Get version from package.json
const packageJson = require('../../package.json');
const CLI_VERSION = packageJson.version;

export async function listCommand() {
  console.log('');
  console.log(chalk.cyan('┌─────────────────────────────────────────────────────────────┐'));
  console.log(chalk.cyan('│') + chalk.bold.magenta('           📦 Angular SuperUI Components           ') + chalk.cyan('│'));
  console.log(chalk.cyan('│') + chalk.yellow(`                     v${CLI_VERSION}                      `) + chalk.cyan('│'));
  console.log(chalk.cyan('└─────────────────────────────────────────────────────────────┘'));
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
    console.log(chalk.bold.yellow(category));
    
    componentList.forEach(componentKey => {
      const component = COMPONENTS[componentKey as keyof typeof COMPONENTS];
      if (component) {
        console.log(chalk.green(`  ✓ ${componentKey}`) + chalk.gray(` - ${component.description}`));
      }
    });
    
    console.log(''); // Empty line between categories
  }

  console.log(chalk.bgBlue.white(' 📖 USAGE EXAMPLES '));
  console.log('');
  console.log(chalk.cyan('Single component:    ') + chalk.yellow('ngsui-cli add button'));
  console.log(chalk.cyan('Multiple components: ') + chalk.yellow('ngsui-cli add button card alert'));
  console.log(chalk.cyan('All components:      ') + chalk.yellow('ngsui-cli add --all'));
  console.log('');
  
  console.log(chalk.bgMagenta.white(' 🎨 COLOR VARIANTS '));
  console.log('');
  console.log(chalk.gray('Most components support these beautiful color variants:'));
  console.log(chalk.green('  🟢 Semantic: ') + chalk.white('success, warning, info, destructive'));
  console.log(chalk.magenta('  🟣 Purple Family: ') + chalk.white('purple, pink, violet, indigo'));
  console.log(chalk.yellow('  🟡 Warm Colors: ') + chalk.white('orange, amber, lime, yellow'));
  console.log(chalk.blue('  🔵 Cool Colors: ') + chalk.white('blue, cyan, sky, teal'));
  console.log(chalk.red('  🔴 Nature Colors: ') + chalk.white('rose, red, emerald, green'));
  console.log('');
  
  console.log(chalk.cyan('┌─────────────────────────────────────────────────────────────┐'));
  console.log(chalk.cyan('│') + chalk.bold.green('               🌈 Total: 30+ Components                ') + chalk.cyan('│'));
  console.log(chalk.cyan('│') + chalk.gray('            Local-First • Zero Dependencies             ') + chalk.cyan('│'));
  console.log(chalk.cyan('└─────────────────────────────────────────────────────────────┘'));
  console.log('');
}
