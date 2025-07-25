import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import axios from 'axios';

// Utility function for padding text in banners
function padding(text: string, totalWidth: number): string {
  const textLength = text.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '').length;
  const paddingNeeded = Math.max(0, totalWidth - textLength);
  const leftPad = Math.floor(paddingNeeded / 2);
  const rightPad = paddingNeeded - leftPad;
  return ' '.repeat(leftPad) + text + ' '.repeat(rightPad);
}

// Define available components based on actual library structure (currently implemented)
export const COMPONENTS = {
  // 🎯 Core Components
  'accordion': {
    name: 'Accordion',
    description: 'A vertically stacked set of interactive headings that reveal content.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'alert': {
    name: 'Alert',
    description: 'Displays an important message with different severity levels.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'alert-dialog': {
    name: 'Alert Dialog',
    description: 'A modal dialog that interrupts the user with important content.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'aspect-ratio': {
    name: 'Aspect Ratio',
    description: 'Displays content within a desired ratio.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'avatar': {
    name: 'Avatar',
    description: 'An image element with a fallback for representing users.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'badge': {
    name: 'Badge',
    description: 'Displays a badge or status indicator.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'breadcrumb': {
    name: 'Breadcrumb',
    description: 'Displays the path to the current resource using a hierarchy of links.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'button': {
    name: 'Button',
    description: 'A clickable button component with multiple variants.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'calendar': {
    name: 'Calendar',
    description: '🌟 Enhanced calendar with range selection, drag support, and time picker.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'card': {
    name: 'Card',
    description: 'A flexible card component for displaying content in contained sections.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'carousel': {
    name: 'Carousel',
    description: 'An accessible image carousel with auto-play, navigation, and pagination.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'checkbox': {
    name: 'Checkbox',
    description: 'A control that allows the user to toggle between checked and not checked.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'collapsible': {
    name: 'Collapsible',
    description: 'Expandable content sections with smooth animations and keyboard support.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'combobox': {
    name: 'ComboBox',
    description: 'Advanced dropdown selection with search, multi-select, and loading states.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'context-menu': {
    name: 'Context Menu',
    description: 'Right-click context menus with keyboard shortcuts and accessibility.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'data-table': {
    name: 'Data Table',
    description: 'Enterprise-grade data table with sorting, filtering, pagination, and inline editing.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'dialog': {
    name: 'Dialog',
    description: 'A modal dialog window with accessibility features and focus management.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'drawer': {
    name: 'Drawer',
    description: 'A flexible drawer component that slides in from any side of the screen.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'dropdown-menu': {
    name: 'Dropdown Menu',
    description: 'Beautiful, accessible dropdown menu with multiple variants and advanced animations.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'input': {
    name: 'Input',
    description: 'Flexible input component with multiple variants, validation states, and accessibility.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'input-otp': {
    name: 'Input OTP',
    description: 'One-time password input component with multiple slots and validation.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'pagination': {
    name: 'Pagination',
    description: 'Pagination component with customizable page size and navigation controls.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'popover': {
    name: 'Popover',
    description: 'A floating overlay that displays content relative to a trigger element.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'progress': {
    name: 'Progress',
    description: 'Progress indicator component with customizable appearance and animation.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'radio-group': {
    name: 'Radio Group',
    description: 'Radio button group component with accessible selection and validation.',
    dependencies: ['cn'],
    files: ['index.ts']
  },
  'theme-switcher': {
    name: 'Theme Switcher',
    description: 'A component that allows users to switch between light, dark, and system themes.',
    dependencies: ['cn', 'button'],
    files: ['index.ts']
  },
  
  // 📅 Featured Component
};

export async function addCommand(componentNames: string | string[], options: { force?: boolean; all?: boolean }) {
  let componentsToAdd: string[] = [];
  
  // Handle --all flag
  if (options.all) {
    componentsToAdd = Object.keys(COMPONENTS);
    
    // Show banner for all components
    console.log('');
    console.log(chalk.hex('#8B5CF6')('╔═══════════════════════════════════════════════════════════════════════╗'));
    console.log(chalk.hex('#8B5CF6')('║') + chalk.hex('#EC4899').bold('                🚀 Installing All Angular SuperUI Components 🚀                ') + chalk.hex('#8B5CF6')('║'));
    console.log(chalk.hex('#8B5CF6')('║') + chalk.hex('#10B981')('                                                                       ') + chalk.hex('#8B5CF6')('║'));
    console.log(chalk.hex('#8B5CF6')('║') + chalk.hex('#F59E0B')('                      ✨ ' + componentsToAdd.length + ' Premium Components Ready! ✨                       ') + chalk.hex('#8B5CF6')('║'));
    console.log(chalk.hex('#8B5CF6')('║') + chalk.hex('#06B6D4')('              🎯 TailwindCSS • TypeScript • Zero Dependencies 🎯               ') + chalk.hex('#8B5CF6')('║'));
    console.log(chalk.hex('#8B5CF6')('║') + chalk.hex('#10B981')('                                                                       ') + chalk.hex('#8B5CF6')('║'));
    console.log(chalk.hex('#8B5CF6')('╚═══════════════════════════════════════════════════════════════════════╝'));
    console.log('');
    
  } else {
    // Handle single component or multiple components
    componentsToAdd = Array.isArray(componentNames) ? componentNames : [componentNames];
    
    // Show banner for selective installation
    console.log('');
    console.log(chalk.hex('#8B5CF6')('╔═══════════════════════════════════════════════════════════════════════╗'));
    console.log(chalk.hex('#8B5CF6')('║') + chalk.hex('#EC4899').bold('              📦 Adding Angular SuperUI Components 📦                       ') + chalk.hex('#8B5CF6')('║'));
    console.log(chalk.hex('#8B5CF6')('║') + chalk.hex('#10B981')('                                                                       ') + chalk.hex('#8B5CF6')('║'));
    console.log(chalk.hex('#8B5CF6')('║') + chalk.hex('#F59E0B')('                    ⚡ Installing: ' + componentsToAdd.join(', ') + ' ⚡                        ') + chalk.hex('#8B5CF6')('║'));
    console.log(chalk.hex('#8B5CF6')('║') + chalk.hex('#06B6D4')('               🎨 Local-First • Production-Ready • TypeScript 🎨               ') + chalk.hex('#8B5CF6')('║'));
    console.log(chalk.hex('#8B5CF6')('║') + chalk.hex('#10B981')('                                                                       ') + chalk.hex('#8B5CF6')('║'));
    console.log(chalk.hex('#8B5CF6')('╚═══════════════════════════════════════════════════════════════════════╝'));
    console.log('');
  }

  const spinner = ora(`Adding ${componentsToAdd.length} component(s)...`).start();
  
  try {
    const results = [];
    const errors = [];

    for (const componentName of componentsToAdd) {
      try {
        // Check if component exists
        const component = COMPONENTS[componentName as keyof typeof COMPONENTS];
        if (!component) {
          errors.push(`Component "${componentName}" not found.`);
          continue;
        }

        // Create component directory
        const componentDir = `./src/lib/components/${componentName}`;
        await fs.ensureDir(componentDir);

        // Check if component already exists
        const componentExists = await fs.pathExists(path.join(componentDir, component.files[0]));
        if (componentExists && !options.force && !options.all) {
          spinner.stop();
          console.log(''); // Add blank line for better formatting
          
          const { overwrite } = await inquirer.prompt([
            {
              type: 'confirm',
              name: 'overwrite',
              message: `Component "${componentName}" already exists. Overwrite?`,
              default: false
            }
          ]);
          
          if (!overwrite) {
            console.log(chalk.yellow(`⏭️  Skipping ${componentName}...`));
            continue;
          } else {
            spinner.start(`Adding ${componentsToAdd.length} component(s)...`);
          }
        }

        spinner.text = `Downloading ${componentName} files...`;

        // Download component files from GitHub repository
        const baseUrl = 'https://raw.githubusercontent.com/bhaimicrosoft/angular-superui/main/projects/lib/src/lib';
        
        for (const file of component.files) {
          try {
            const response = await axios.get(`${baseUrl}/${componentName}/${file}`);
            let fileContent = response.data as string;
            
            // Fix import paths for cn utility - handle both possible patterns
            fileContent = fileContent.replace(
              /import\s*{\s*cn\s*}\s*from\s*['"]\.\.\/utils\/cn['"];?/g,
              "import { cn } from '../../utils/cn';"
            );
            fileContent = fileContent.replace(
              /import\s*{\s*cn\s*}\s*from\s*['"]\.\.\/lib\/cn['"];?/g,
              "import { cn } from '../../lib/utils/cn';"
            );
            
            await fs.writeFile(path.join(componentDir, file), fileContent);
          } catch (error) {
            console.warn(chalk.yellow(`Warning: Could not download ${file} for ${componentName}`));
          }
        }

        // Update component exports
        await updateComponentExports(componentName, component);
        results.push({ name: componentName, component });
        
      } catch (error) {
        errors.push(`Failed to add ${componentName}: ${error}`);
      }
    }

    if (results.length > 0) {
      spinner.succeed(chalk.green(`🎉 Successfully added ${results.length} component(s)!`));
      
      console.log('');
      console.log(chalk.bgGreen.black(' ✅ COMPONENTS INSTALLED '));
      console.log('');
      results.forEach(({ name, component }) => {
        console.log(chalk.cyan(`  🎨 ${component.name}`) + chalk.gray(` (${name})`));
      });
      
      console.log('');
      console.log(chalk.bgBlue.white(' 📖 USAGE EXAMPLES '));
      console.log('');
      results.slice(0, 3).forEach(({ name, component }) => {
        console.log(chalk.yellow(`import { ${component.name} } from '@components/${name}';`));
      });
      
      if (results.length > 3) {
        console.log(chalk.gray(`  ... and ${results.length - 3} more components`));
      }
      
      console.log('');
      console.log(chalk.green('🎯 Components installed in: ') + chalk.cyan('./src/lib/components/'));
      console.log(chalk.magenta('💜 Happy coding with Angular SuperUI!'));
      console.log('');
    }

    if (errors.length > 0) {
      console.log(chalk.red('❌ Errors encountered:'));
      errors.forEach(error => console.log(chalk.red(`  • ${error}`)));
      
      if (results.length === 0) {
        spinner.fail('No components were added');
        console.log(chalk.yellow('Available components:'));
        Object.keys(COMPONENTS).forEach(key => {
          const comp = COMPONENTS[key as keyof typeof COMPONENTS];
          console.log(chalk.cyan(`  ${key}`) + chalk.gray(` - ${comp.description}`));
        });
      }
    }
    
  } catch (error) {
    spinner.fail(`Failed to add components`);
    console.error(chalk.red(error));
  }
}

async function updateComponentExports(componentName: string, component: any) {
  const indexPath = './src/lib/components/index.ts';
  
  try {
    let indexContent = '';
    if (await fs.pathExists(indexPath)) {
      indexContent = await fs.readFile(indexPath, 'utf8');
    }

    const exportLine = `export * from './${componentName}';`;
    
    if (!indexContent.includes(exportLine)) {
      // Add proper newline formatting
      if (indexContent && !indexContent.endsWith('\n')) {
        indexContent += '\n';
      }
      indexContent += `${exportLine}\n`;
      await fs.writeFile(indexPath, indexContent);
    }
  } catch (error) {
    // Ignore errors in updating exports
  }
}
