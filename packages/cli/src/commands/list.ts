import chalk from 'chalk';
import { COMPONENTS } from './add';

export async function listCommand() {
  console.log(chalk.cyan('\\n📦 Available Angular SuperUI Components:\\n'));

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
    console.log(chalk.yellow(`${category}:`));
    
    componentList.forEach(componentKey => {
      const component = COMPONENTS[componentKey as keyof typeof COMPONENTS];
      if (component) {
        console.log(chalk.green(`  ✓ ${componentKey}`) + chalk.gray(` - ${component.description}`));
      }
    });
    
    console.log(''); // Empty line between categories
  }

  console.log(chalk.cyan('📖 Usage Examples:'));
  console.log(chalk.white('  angular-superui add button'));
  console.log(chalk.white('  angular-superui add calendar'));
  console.log(chalk.white('  angular-superui add dialog'));
  
  console.log(chalk.cyan('\\n🎨 Color Variants Available:'));
  console.log(chalk.gray('Most components support these color variants:'));
  console.log(chalk.green('  • success, warning, info, destructive'));
  console.log(chalk.magenta('  • purple, pink, violet, indigo'));
  console.log(chalk.yellow('  • orange, amber, lime, yellow'));
  console.log(chalk.blue('  • blue, cyan, sky, teal'));
  console.log(chalk.red('  • rose, red, emerald, green'));
  
  console.log(chalk.cyan('\\n🌈 Total Components: ') + chalk.bold('30+'));
}
