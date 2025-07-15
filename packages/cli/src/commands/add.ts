import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import axios from 'axios';

// Define available components
export const COMPONENTS = {
  // Core Components
  'button': {
    name: 'Button',
    description: 'Displays a button or a component that looks like a button.',
    dependencies: ['cn'],
    files: ['button.ts']
  },
  'badge': {
    name: 'Badge',
    description: 'Displays a badge or a component that looks like a badge.',
    dependencies: ['cn'],
    files: ['badge.ts']
  },
  'alert': {
    name: 'Alert',
    description: 'Displays a callout for user attention.',
    dependencies: ['cn'],
    files: ['alert.ts']
  },
  'card': {
    name: 'Card',
    description: 'Displays a card with header, content, and footer.',
    dependencies: ['cn'],
    files: ['card.ts']
  },
  'input': {
    name: 'Input',
    description: 'Displays a form input field.',
    dependencies: ['cn'],
    files: ['input.component.ts']
  },
  'progress': {
    name: 'Progress',
    description: 'Displays an indicator showing the completion progress.',
    dependencies: ['cn'],
    files: ['progress.ts']
  },
  
  // Form Components
  'checkbox': {
    name: 'Checkbox',
    description: 'A control that allows the user to toggle between checked and not checked.',
    dependencies: ['cn'],
    files: ['checkbox.ts']
  },
  'switch': {
    name: 'Switch',
    description: 'A control that allows the user to toggle between checked and not checked.',
    dependencies: ['cn'],
    files: ['switch.ts']
  },
  'textarea': {
    name: 'Textarea',
    description: 'Displays a form textarea field.',
    dependencies: ['cn'],
    files: ['textarea.ts']
  },
  'select': {
    name: 'Select',
    description: 'Displays a list of options for the user to pick from.',
    dependencies: ['cn'],
    files: ['select.ts']
  },
  'radio-group': {
    name: 'Radio Group',
    description: 'A set of checkable buttons—known as radio buttons.',
    dependencies: ['cn'],
    files: ['radio-group.ts']
  },
  'slider': {
    name: 'Slider',
    description: 'An input where the user selects a value from within a given range.',
    dependencies: ['cn'],
    files: ['slider.ts']
  },

  // Navigation Components
  'breadcrumb': {
    name: 'Breadcrumb',
    description: 'Displays the path to the current resource using a hierarchy of links.',
    dependencies: ['cn'],
    files: ['breadcrumb.ts']
  },
  'tabs': {
    name: 'Tabs',
    description: 'A set of layered sections of content—known as tab panels.',
    dependencies: ['cn'],
    files: ['tabs.ts']
  },

  // Layout Components
  'separator': {
    name: 'Separator',
    description: 'Visually or semantically separates content.',
    dependencies: ['cn'],
    files: ['separator.ts']
  },
  'skeleton': {
    name: 'Skeleton',
    description: 'Use to show a placeholder while content is loading.',
    dependencies: ['cn'],
    files: ['skeleton.ts']
  },

  // Overlay Components
  'dialog': {
    name: 'Dialog',
    description: 'A window overlaid on either the primary window or another dialog window.',
    dependencies: ['cn'],
    files: ['dialog.ts']
  },
  'tooltip': {
    name: 'Tooltip',
    description: 'A popup that displays information related to an element.',
    dependencies: ['cn'],
    files: ['tooltip.ts']
  },
  'popover': {
    name: 'Popover',
    description: 'Displays rich content in a portal, triggered by a button.',
    dependencies: ['cn'],
    files: ['popover.ts']
  },
  'sheet': {
    name: 'Sheet',
    description: 'Extends the Dialog component to display content that complements the main content.',
    dependencies: ['cn'],
    files: ['sheet.ts']
  },

  // New Components
  'calendar': {
    name: 'Calendar',
    description: 'A date field component that allows users to enter and edit date.',
    dependencies: ['cn'],
    files: ['calendar.ts']
  },
  'command': {
    name: 'Command',
    description: 'Fast, composable, unstyled command menu for Angular.',
    dependencies: ['cn'],
    files: ['command.ts']
  },

  // Display Components
  'avatar': {
    name: 'Avatar',
    description: 'An image element with a fallback for representing the user.',
    dependencies: ['cn'],
    files: ['avatar.ts']
  },
  'table': {
    name: 'Table',
    description: 'A responsive table component.',
    dependencies: ['cn'],
    files: ['table.ts']
  },

  // Utility Components
  'theme-selector': {
    name: 'Theme Selector',
    description: 'A component for switching between different themes.',
    dependencies: ['cn'],
    files: ['theme-selector.ts']
  },
  'toast': {
    name: 'Toast',
    description: 'A succinct message that is displayed temporarily.',
    dependencies: ['cn'],
    files: ['toast.ts']
  },
  'toggle': {
    name: 'Toggle',
    description: 'A two-state button that can be either on or off.',
    dependencies: ['cn'],
    files: ['toggle.ts']
  },
  'accordion': {
    name: 'Accordion',
    description: 'A vertically stacked set of interactive headings.',
    dependencies: ['cn'],
    files: ['accordion.ts']
  },
  'label': {
    name: 'Label',
    description: 'Renders an accessible label associated with controls.',
    dependencies: ['cn'],
    files: ['label.ts']
  }
};

export async function addCommand(componentNames: string | string[], options: { force?: boolean; all?: boolean }) {
  let componentsToAdd: string[] = [];
  
  // Handle --all flag
  if (options.all) {
    componentsToAdd = Object.keys(COMPONENTS);
    console.log(chalk.cyan('🚀 Installing all Angular SuperUI components...'));
  } else {
    // Handle single component or multiple components
    componentsToAdd = Array.isArray(componentNames) ? componentNames : [componentNames];
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
            let fileContent = response.data;
            
            // Fix import paths for cn utility
            fileContent = fileContent.replace(
              /import\s*{\s*cn\s*}\s*from\s*['"]\.\.\/utils\/cn['"];?/g,
              "import { cn } from '../../utils/cn';"
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
      spinner.succeed(`Successfully added ${results.length} component(s)!`);
      
      console.log(chalk.green('✅ Components added successfully:'));
      results.forEach(({ name, component }) => {
        console.log(chalk.cyan(`  • ${component.name} (${name})`));
      });
      
      console.log(chalk.cyan('\n📖 Usage examples:'));
      results.slice(0, 3).forEach(({ name, component }) => {
        console.log(chalk.white(`import { ${component.name} } from './lib/components/${name}/${component.files[0].replace('.ts', '')}';`));
      });
      
      if (results.length > 3) {
        console.log(chalk.gray(`  ... and ${results.length - 3} more components`));
      }
    }

    if (errors.length > 0) {
      console.log(chalk.red('\n❌ Errors encountered:'));
      errors.forEach(error => console.log(chalk.red(`  • ${error}`)));
      
      if (results.length === 0) {
        spinner.fail('No components were added');
        console.log(chalk.yellow('\nAvailable components:'));
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

    const exportLine = `export * from './${componentName}/${component.files[0].replace('.ts', '')}';`;
    
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
