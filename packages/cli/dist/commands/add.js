"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMPONENTS = void 0;
exports.addCommand = addCommand;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const inquirer_1 = __importDefault(require("inquirer"));
const axios_1 = __importDefault(require("axios"));
// Define available components
exports.COMPONENTS = {
    // Core Components
    'button': {
        name: 'Button',
        description: 'Displays a button or a component that looks like a button.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'badge': {
        name: 'Badge',
        description: 'Displays a badge or a component that looks like a badge.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'alert': {
        name: 'Alert',
        description: 'Displays a callout for user attention.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'card': {
        name: 'Card',
        description: 'Displays a card with header, content, and footer.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'input': {
        name: 'Input',
        description: 'Displays a form input field.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'progress': {
        name: 'Progress',
        description: 'Displays an indicator showing the completion progress.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    // Form Components
    'checkbox': {
        name: 'Checkbox',
        description: 'A control that allows the user to toggle between checked and not checked.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'switch': {
        name: 'Switch',
        description: 'A control that allows the user to toggle between checked and not checked.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'textarea': {
        name: 'Textarea',
        description: 'Displays a form textarea field.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'select': {
        name: 'Select',
        description: 'Displays a list of options for the user to pick from.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'radio-group': {
        name: 'Radio Group',
        description: 'A set of checkable buttons—known as radio buttons.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'slider': {
        name: 'Slider',
        description: 'An input where the user selects a value from within a given range.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    // Navigation Components
    'breadcrumb': {
        name: 'Breadcrumb',
        description: 'Displays the path to the current resource using a hierarchy of links.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'tabs': {
        name: 'Tabs',
        description: 'A set of layered sections of content—known as tab panels.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    // Layout Components
    'separator': {
        name: 'Separator',
        description: 'Visually or semantically separates content.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'skeleton': {
        name: 'Skeleton',
        description: 'Use to show a placeholder while content is loading.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    // Overlay Components
    'dialog': {
        name: 'Dialog',
        description: 'A window overlaid on either the primary window or another dialog window.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'tooltip': {
        name: 'Tooltip',
        description: 'A popup that displays information related to an element.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'popover': {
        name: 'Popover',
        description: 'Displays rich content in a portal, triggered by a button.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'sheet': {
        name: 'Sheet',
        description: 'Extends the Dialog component to display content that complements the main content.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    // New Components
    'calendar': {
        name: 'Calendar',
        description: 'A date field component that allows users to enter and edit date.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'command': {
        name: 'Command',
        description: 'Fast, composable, unstyled command menu for Angular.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    // Display Components
    'avatar': {
        name: 'Avatar',
        description: 'An image element with a fallback for representing the user.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'table': {
        name: 'Table',
        description: 'A responsive table component.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    // Utility Components
    'theme-selector': {
        name: 'Theme Selector',
        description: 'A component for switching between different themes.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'toast': {
        name: 'Toast',
        description: 'A succinct message that is displayed temporarily.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'toggle': {
        name: 'Toggle',
        description: 'A two-state button that can be either on or off.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'accordion': {
        name: 'Accordion',
        description: 'A vertically stacked set of interactive headings.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'label': {
        name: 'Label',
        description: 'Renders an accessible label associated with controls.',
        dependencies: ['cn'],
        files: ['index.ts']
    }
};
async function addCommand(componentNames, options) {
    let componentsToAdd = [];
    // Handle --all flag
    if (options.all) {
        componentsToAdd = Object.keys(exports.COMPONENTS);
        console.log(chalk_1.default.cyan('🚀 Installing all Angular SuperUI components...'));
    }
    else {
        // Handle single component or multiple components
        componentsToAdd = Array.isArray(componentNames) ? componentNames : [componentNames];
    }
    const spinner = (0, ora_1.default)(`Adding ${componentsToAdd.length} component(s)...`).start();
    try {
        const results = [];
        const errors = [];
        for (const componentName of componentsToAdd) {
            try {
                // Check if component exists
                const component = exports.COMPONENTS[componentName];
                if (!component) {
                    errors.push(`Component "${componentName}" not found.`);
                    continue;
                }
                // Create component directory
                const componentDir = `./src/lib/components/${componentName}`;
                await fs_extra_1.default.ensureDir(componentDir);
                // Check if component already exists
                const componentExists = await fs_extra_1.default.pathExists(path_1.default.join(componentDir, component.files[0]));
                if (componentExists && !options.force && !options.all) {
                    spinner.stop();
                    console.log(''); // Add blank line for better formatting
                    const { overwrite } = await inquirer_1.default.prompt([
                        {
                            type: 'confirm',
                            name: 'overwrite',
                            message: `Component "${componentName}" already exists. Overwrite?`,
                            default: false
                        }
                    ]);
                    if (!overwrite) {
                        console.log(chalk_1.default.yellow(`⏭️  Skipping ${componentName}...`));
                        continue;
                    }
                    else {
                        spinner.start(`Adding ${componentsToAdd.length} component(s)...`);
                    }
                }
                spinner.text = `Downloading ${componentName} files...`;
                // Download component files from GitHub repository
                const baseUrl = 'https://raw.githubusercontent.com/bhaimicrosoft/angular-superui/main/projects/lib/src/lib';
                for (const file of component.files) {
                    try {
                        const response = await axios_1.default.get(`${baseUrl}/${componentName}/${file}`);
                        let fileContent = response.data;
                        // Fix import paths for cn utility - handle both possible patterns
                        fileContent = fileContent.replace(/import\s*{\s*cn\s*}\s*from\s*['"]\.\.\/utils\/cn['"];?/g, "import { cn } from '../../utils/cn';");
                        fileContent = fileContent.replace(/import\s*{\s*cn\s*}\s*from\s*['"]\.\.\/lib\/cn['"];?/g, "import { cn } from '../../lib/utils/cn';");
                        await fs_extra_1.default.writeFile(path_1.default.join(componentDir, file), fileContent);
                    }
                    catch (error) {
                        console.warn(chalk_1.default.yellow(`Warning: Could not download ${file} for ${componentName}`));
                    }
                }
                // Update component exports
                await updateComponentExports(componentName, component);
                results.push({ name: componentName, component });
            }
            catch (error) {
                errors.push(`Failed to add ${componentName}: ${error}`);
            }
        }
        if (results.length > 0) {
            spinner.succeed(chalk_1.default.green(`🎉 Successfully added ${results.length} component(s)!`));
            console.log('');
            console.log(chalk_1.default.bgGreen.black(' ✅ COMPONENTS INSTALLED '));
            console.log('');
            results.forEach(({ name, component }) => {
                console.log(chalk_1.default.cyan(`  🎨 ${component.name}`) + chalk_1.default.gray(` (${name})`));
            });
            console.log('');
            console.log(chalk_1.default.bgBlue.white(' 📖 USAGE EXAMPLES '));
            console.log('');
            results.slice(0, 3).forEach(({ name, component }) => {
                console.log(chalk_1.default.yellow(`import { ${component.name} } from '@components/${name}';`));
            });
            if (results.length > 3) {
                console.log(chalk_1.default.gray(`  ... and ${results.length - 3} more components`));
            }
            console.log('');
            console.log(chalk_1.default.green('🎯 Components installed in: ') + chalk_1.default.cyan('./src/lib/components/'));
            console.log(chalk_1.default.magenta('💜 Happy coding with Angular SuperUI!'));
            console.log('');
        }
        if (errors.length > 0) {
            console.log(chalk_1.default.red('❌ Errors encountered:'));
            errors.forEach(error => console.log(chalk_1.default.red(`  • ${error}`)));
            if (results.length === 0) {
                spinner.fail('No components were added');
                console.log(chalk_1.default.yellow('Available components:'));
                Object.keys(exports.COMPONENTS).forEach(key => {
                    const comp = exports.COMPONENTS[key];
                    console.log(chalk_1.default.cyan(`  ${key}`) + chalk_1.default.gray(` - ${comp.description}`));
                });
            }
        }
    }
    catch (error) {
        spinner.fail(`Failed to add components`);
        console.error(chalk_1.default.red(error));
    }
}
async function updateComponentExports(componentName, component) {
    const indexPath = './src/lib/components/index.ts';
    try {
        let indexContent = '';
        if (await fs_extra_1.default.pathExists(indexPath)) {
            indexContent = await fs_extra_1.default.readFile(indexPath, 'utf8');
        }
        const exportLine = `export * from './${componentName}';`;
        if (!indexContent.includes(exportLine)) {
            // Add proper newline formatting
            if (indexContent && !indexContent.endsWith('\n')) {
                indexContent += '\n';
            }
            indexContent += `${exportLine}\n`;
            await fs_extra_1.default.writeFile(indexPath, indexContent);
        }
    }
    catch (error) {
        // Ignore errors in updating exports
    }
}
//# sourceMappingURL=add.js.map