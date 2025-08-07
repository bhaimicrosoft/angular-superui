"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLOCKS = exports.COMPONENTS = void 0;
exports.addCommand = addCommand;
exports.addBlockCommand = addBlockCommand;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const inquirer_1 = __importDefault(require("inquirer"));
const axios_1 = __importDefault(require("axios"));
// Utility function for padding text in banners
function padding(text, totalWidth) {
    const textLength = text.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '').length;
    const paddingNeeded = Math.max(0, totalWidth - textLength);
    const leftPad = Math.floor(paddingNeeded / 2);
    const rightPad = paddingNeeded - leftPad;
    return ' '.repeat(leftPad) + text + ' '.repeat(rightPad);
}
// Define available components based on actual library structure (currently implemented)
exports.COMPONENTS = {
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
    'select': {
        name: 'Select',
        description: 'A flexible select dropdown component with search and multi-select capabilities.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'sidebar': {
        name: 'Sidebar',
        description: 'Responsive navigation sidebar with animations, keyboard navigation, and flexible content.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'skeleton': {
        name: 'Skeleton',
        description: 'Loading placeholder components with customizable shapes and animations.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'slider': {
        name: 'Slider',
        description: 'Interactive slider component for single values and ranges with accessibility support.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'stepper': {
        name: 'Stepper',
        description: 'Multi-step navigation component with progress tracking and validation support.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'theme-switcher': {
        name: 'Theme Switcher',
        description: 'A component that allows users to switch between light, dark, and system themes.',
        dependencies: ['cn', 'button'],
        files: ['index.ts']
    },
    'toggle': {
        name: 'Toggle',
        description: 'Advanced toggle/switch component with multiple variants, animations, and form integration.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'file-upload': {
        name: 'File Upload',
        description: 'Advanced file upload component with drag-and-drop, progress tracking, and HttpClient integration.',
        dependencies: ['cn', 'progress'],
        files: ['index.ts'],
        requiresHttpClient: true
    },
    'rating': {
        name: 'Rating',
        description: 'Interactive star rating component with hover effects and customizable appearance.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'spinner': {
        name: 'Spinner',
        description: 'Loading spinner component with multiple variants and animations.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'tabs': {
        name: 'Tabs',
        description: 'Tabbed interface component with keyboard navigation and accessibility support.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'textarea': {
        name: 'Textarea',
        description: 'Multi-line text input component with auto-resize and validation states.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'toast': {
        name: 'Toast',
        description: 'Toast notification component with multiple variants and auto-dismiss functionality.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'tooltip': {
        name: 'Tooltip',
        description: 'Tooltip component with configurable positioning and hover/focus triggers.',
        dependencies: ['cn'],
        files: ['index.ts']
    }
    // 📅 Featured Component
};
// Define available blocks
exports.BLOCKS = {
    'header': {
        name: 'Header',
        description: 'Professional header block with navigation, branding, and user actions.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'footer': {
        name: 'Footer',
        description: 'Comprehensive footer block with navigation, social links, and newsletter signup.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'hero-section': {
        name: 'Hero Section',
        description: 'Compelling hero section block with multiple backgrounds and CTA buttons.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'pricing-cards': {
        name: 'Pricing Cards',
        description: 'Professional pricing cards block with billing toggles and feature comparison.',
        dependencies: ['cn'],
        files: ['index.ts']
    },
    'feature-grid': {
        name: 'Feature Grid',
        description: 'Feature showcase block with responsive grid layout and multiple variants.',
        dependencies: ['cn'],
        files: ['index.ts']
    }
};
async function addCommand(componentNames, options) {
    let componentsToAdd = [];
    // Check if this is the first component installation
    const componentsDir = './src/lib/components';
    const utilsDir = './src/lib/utils';
    const pipesDir = './src/lib/pipes';
    const isFirstInstall = !(await fs_extra_1.default.pathExists(componentsDir) &&
        await fs_extra_1.default.pathExists(path_1.default.join(utilsDir, 'cn.ts')) &&
        await fs_extra_1.default.pathExists(pipesDir));
    // Handle --all flag
    if (options.all) {
        componentsToAdd = Object.keys(exports.COMPONENTS);
        // Show banner for all components
        console.log('');
        console.log(chalk_1.default.hex('#8B5CF6')('╔═══════════════════════════════════════════════════════════════════════╗'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#EC4899').bold('                🚀 Installing All Angular SuperUI Components 🚀                ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#10B981')('                                                                       ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#F59E0B')('                      ✨ ' + componentsToAdd.length + ' Premium Components Ready! ✨                       ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#06B6D4')('              🎯 TailwindCSS • TypeScript • Zero Dependencies 🎯               ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#10B981')('                                                                       ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('╚═══════════════════════════════════════════════════════════════════════╝'));
        console.log('');
    }
    else {
        // Handle single component or multiple components
        componentsToAdd = Array.isArray(componentNames) ? componentNames : [componentNames];
        // Show banner for selective installation
        console.log('');
        console.log(chalk_1.default.hex('#8B5CF6')('╔═══════════════════════════════════════════════════════════════════════╗'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#EC4899').bold('              📦 Adding Angular SuperUI Components 📦                       ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#10B981')('                                                                       ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#F59E0B')('                    ⚡ Installing: ' + componentsToAdd.join(', ') + ' ⚡                        ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#06B6D4')('               🎨 Local-First • Production-Ready • TypeScript 🎨               ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#10B981')('                                                                       ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('╚═══════════════════════════════════════════════════════════════════════╝'));
        console.log('');
    }
    const spinner = (0, ora_1.default)(`Adding ${componentsToAdd.length} component(s)...`).start();
    try {
        // Install dependencies if this is the first component installation
        if (isFirstInstall) {
            spinner.text = 'Setting up dependencies...';
            await ensureDependencies();
        }
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
                        // Fix import paths for cn utility and pipes - handle all possible patterns
                        fileContent = fileContent.replace(/import\s*{\s*cn\s*}\s*from\s*['"]\.\.\/utils\/cn['"];?/g, "import { cn } from '../../utils/cn';");
                        fileContent = fileContent.replace(/import\s*{\s*cn\s*}\s*from\s*['"]\.\.\/lib\/cn['"];?/g, "import { cn } from '../../utils/cn';");
                        fileContent = fileContent.replace(/import\s*{\s*cn\s*}\s*from\s*['"]\.\.\/\.\.\/utils\/cn['"];?/g, "import { cn } from '../../utils/cn';");
                        // Fix pipe imports
                        fileContent = fileContent.replace(/import\s*{([^}]+)}\s*from\s*['"]\.\.\/pipes\/([^'"]+)['"];?/g, "import { $1 } from '../../pipes/$2';");
                        fileContent = fileContent.replace(/import\s*{([^}]+)}\s*from\s*['"]\.\.\/\.\.\/pipes\/([^'"]+)['"];?/g, "import { $1 } from '../../pipes/$2';");
                        await fs_extra_1.default.writeFile(path_1.default.join(componentDir, file), fileContent);
                    }
                    catch (error) {
                        console.warn(chalk_1.default.yellow(`Warning: Could not download ${file} for ${componentName}`));
                    }
                }
                // Update component exports
                await updateComponentExports(componentName, component);
                // Handle component dependencies
                if (component.dependencies && component.dependencies.length > 0) {
                    for (const dep of component.dependencies) {
                        if (dep !== 'cn' && exports.COMPONENTS[dep]) {
                            await addDependencyComponent(dep, spinner);
                        }
                    }
                }
                // Handle HttpClient requirement
                if (component.requiresHttpClient) {
                    await ensureHttpClientConfiguration(spinner);
                }
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
async function addBlockCommand(blockNames, options) {
    let blocksToAdd = [];
    // Handle --all flag
    if (options.all) {
        blocksToAdd = Object.keys(exports.BLOCKS);
        // Show banner for all blocks
        console.log('');
        console.log(chalk_1.default.hex('#8B5CF6')('╔═══════════════════════════════════════════════════════════════════════╗'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#EC4899').bold('                🏗️ Installing All Angular SuperUI Blocks 🏗️                 ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#10B981')('                                                                       ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#F59E0B')('                      ✨ ' + blocksToAdd.length + ' Premium UI Blocks Ready! ✨                       ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#06B6D4')('              🎯 Complete UI Sections • Ready to Use • TypeScript 🎯             ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#10B981')('                                                                       ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('╚═══════════════════════════════════════════════════════════════════════╝'));
        console.log('');
    }
    else {
        // Handle single block or multiple blocks
        blocksToAdd = Array.isArray(blockNames) ? blockNames : [blockNames];
        // Show banner for selective installation
        console.log('');
        console.log(chalk_1.default.hex('#8B5CF6')('╔═══════════════════════════════════════════════════════════════════════╗'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#EC4899').bold('              📦 Adding Angular SuperUI Blocks 📦                          ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#10B981')('                                                                       ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#F59E0B')('                    ⚡ Installing: ' + blocksToAdd.join(', ') + ' ⚡                        ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#06B6D4')('               🏗️ Complete UI Sections • Production-Ready • TypeScript 🏗️             ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#10B981')('                                                                       ') + chalk_1.default.hex('#8B5CF6')('║'));
        console.log(chalk_1.default.hex('#8B5CF6')('╚═══════════════════════════════════════════════════════════════════════╝'));
        console.log('');
    }
    const spinner = (0, ora_1.default)(`Adding ${blocksToAdd.length} block(s)...`).start();
    try {
        const results = [];
        const errors = [];
        for (const blockName of blocksToAdd) {
            try {
                // Check if block exists
                const block = exports.BLOCKS[blockName];
                if (!block) {
                    errors.push(`Block "${blockName}" not found.`);
                    continue;
                }
                // Create block directory
                const blockDir = `./src/lib/blocks/${blockName}`;
                await fs_extra_1.default.ensureDir(blockDir);
                // Check if block already exists
                const blockExists = await fs_extra_1.default.pathExists(path_1.default.join(blockDir, block.files[0]));
                if (blockExists && !options.force && !options.all) {
                    spinner.stop();
                    console.log(''); // Add blank line for better formatting
                    const { overwrite } = await inquirer_1.default.prompt([
                        {
                            type: 'confirm',
                            name: 'overwrite',
                            message: `Block "${blockName}" already exists. Overwrite?`,
                            default: false
                        }
                    ]);
                    if (!overwrite) {
                        results.push(`${chalk_1.default.yellow('⏭️')} Skipped ${chalk_1.default.cyan(block.name)}`);
                        spinner.start();
                        continue;
                    }
                    spinner.start();
                }
                spinner.text = `Installing ${block.name}...`;
                // Download block files from GitHub repository
                const baseUrl = 'https://raw.githubusercontent.com/bhaimicrosoft/angular-superui/main/projects/lib/src/lib/blocks';
                for (const file of block.files) {
                    try {
                        const response = await axios_1.default.get(`${baseUrl}/${blockName}/${file}`);
                        let fileContent = response.data;
                        // Fix import paths for cn utility and pipes
                        fileContent = fileContent.replace(/import\s*{\s*cn\s*}\s*from\s*['"]\.\.\/utils\/cn['"];?/g, "import { cn } from '../../utils/cn';");
                        fileContent = fileContent.replace(/import\s*{\s*cn\s*}\s*from\s*['"]\.\.\/lib\/cn['"];?/g, "import { cn } from '../../utils/cn';");
                        fileContent = fileContent.replace(/import\s*{\s*cn\s*}\s*from\s*['"]\.\.\/\.\.\/utils\/cn['"];?/g, "import { cn } from '../../utils/cn';");
                        // Fix pipe imports  
                        fileContent = fileContent.replace(/import\s*{([^}]+)}\s*from\s*['"]\.\.\/pipes\/([^'"]+)['"];?/g, "import { $1 } from '../../pipes/$2';");
                        fileContent = fileContent.replace(/import\s*{([^}]+)}\s*from\s*['"]\.\.\/\.\.\/pipes\/([^'"]+)['"];?/g, "import { $1 } from '../../pipes/$2';");
                        await fs_extra_1.default.writeFile(path_1.default.join(blockDir, file), fileContent);
                    }
                    catch (error) {
                        console.warn(chalk_1.default.yellow(`Warning: Could not download ${file} for ${blockName}`));
                    }
                }
                // Update block exports
                await updateBlockExports(blockName, block);
                results.push(`${chalk_1.default.green('✅')} Added ${chalk_1.default.cyan(block.name)}`);
            }
            catch (error) {
                errors.push(`Failed to add block "${blockName}": ${error}`);
            }
        }
        spinner.stop();
        // Display results
        console.log('');
        if (results.length > 0) {
            console.log(chalk_1.default.hex('#10B981').bold('📦 Installation Results:'));
            results.forEach(result => console.log(`  ${result}`));
            console.log('');
        }
        if (errors.length > 0) {
            console.log(chalk_1.default.red.bold('❌ Errors:'));
            errors.forEach(error => console.log(`  ${chalk_1.default.red('•')} ${error}`));
            console.log('');
        }
        if (results.length > 0) {
            console.log(chalk_1.default.hex('#F59E0B').bold('🎉 Success! UI Blocks installed successfully.'));
            console.log(chalk_1.default.hex('#06B6D4')('📚 Check out the documentation for usage examples:'));
            console.log(chalk_1.default.hex('#06B6D4')('   https://angular-superui.vercel.app/'));
            console.log('');
        }
    }
    catch (error) {
        spinner.fail(`Failed to add blocks`);
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
async function updateBlockExports(blockName, block) {
    const indexPath = './src/lib/blocks/index.ts';
    try {
        let indexContent = '';
        if (await fs_extra_1.default.pathExists(indexPath)) {
            indexContent = await fs_extra_1.default.readFile(indexPath, 'utf8');
        }
        const exportLine = `export * from './${blockName}';`;
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
async function addDependencyComponent(depName, spinner) {
    const component = exports.COMPONENTS[depName];
    if (!component)
        return;
    const componentDir = `./src/lib/components/${depName}`;
    // Check if dependency already exists
    const componentExists = await fs_extra_1.default.pathExists(path_1.default.join(componentDir, component.files[0]));
    if (componentExists)
        return;
    spinner.text = `Installing dependency: ${component.name}...`;
    // Create component directory
    await fs_extra_1.default.ensureDir(componentDir);
    // Download component files from GitHub repository
    const baseUrl = 'https://raw.githubusercontent.com/bhaimicrosoft/angular-superui/main/projects/lib/src/lib';
    for (const file of component.files) {
        try {
            const response = await axios_1.default.get(`${baseUrl}/${depName}/${file}`);
            let fileContent = response.data;
            // Fix import paths for cn utility and pipes
            fileContent = fileContent.replace(/import\s*{\s*cn\s*}\s*from\s*['"]\.\.\/utils\/cn['"];?/g, "import { cn } from '../../utils/cn';");
            fileContent = fileContent.replace(/import\s*{\s*cn\s*}\s*from\s*['"]\.\.\/lib\/cn['"];?/g, "import { cn } from '../../utils/cn';");
            fileContent = fileContent.replace(/import\s*{\s*cn\s*}\s*from\s*['"]\.\.\/\.\.\/utils\/cn['"];?/g, "import { cn } from '../../utils/cn';");
            // Fix pipe imports
            fileContent = fileContent.replace(/import\s*{([^}]+)}\s*from\s*['"]\.\.\/pipes\/([^'"]+)['"];?/g, "import { $1 } from '../../pipes/$2';");
            fileContent = fileContent.replace(/import\s*{([^}]+)}\s*from\s*['"]\.\.\/\.\.\/pipes\/([^'"]+)['"];?/g, "import { $1 } from '../../pipes/$2';");
            await fs_extra_1.default.writeFile(path_1.default.join(componentDir, file), fileContent);
        }
        catch (error) {
            console.warn(chalk_1.default.yellow(`Warning: Could not download ${file} for ${depName}`));
        }
    }
    // Update component exports
    await updateComponentExports(depName, component);
}
async function ensureHttpClientConfiguration(spinner) {
    const configPath = './src/app/app.config.ts';
    spinner.text = 'Configuring HttpClient...';
    try {
        if (await fs_extra_1.default.pathExists(configPath)) {
            let configContent = await fs_extra_1.default.readFile(configPath, 'utf8');
            // Check if HttpClient is already configured
            if (configContent.includes('provideHttpClient')) {
                return; // Already configured
            }
            // Add import for provideHttpClient
            if (!configContent.includes("import { provideHttpClient }")) {
                // Find the imports section and add HttpClient import
                const importRegex = /(import\s+{[^}]*}\s+from\s+['"]@angular\/common\/http['"];?)/;
                if (importRegex.test(configContent)) {
                    // HttpClient imports already exist, add provideHttpClient to existing import
                    configContent = configContent.replace(importRegex, (match) => {
                        if (match.includes('provideHttpClient'))
                            return match;
                        return match.replace(/}\s+from/, ', provideHttpClient } from');
                    });
                }
                else {
                    // Add new import line
                    const firstImportMatch = configContent.match(/^import\s+.*$/m);
                    if (firstImportMatch) {
                        const insertPos = configContent.indexOf(firstImportMatch[0]);
                        configContent = configContent.slice(0, insertPos) +
                            "import { provideHttpClient } from '@angular/common/http';\n" +
                            configContent.slice(insertPos);
                    }
                    else {
                        // Add at the beginning if no imports found
                        configContent = "import { provideHttpClient } from '@angular/common/http';\n" + configContent;
                    }
                }
            }
            // Add provideHttpClient to providers array
            const providersRegex = /(providers:\s*\[)([\s\S]*?)(\])/;
            const providersMatch = configContent.match(providersRegex);
            if (providersMatch) {
                const [fullMatch, start, content, end] = providersMatch;
                const providers = content.trim();
                if (!providers.includes('provideHttpClient')) {
                    const newProviders = providers ? `${providers},\n    provideHttpClient()` : 'provideHttpClient()';
                    configContent = configContent.replace(providersRegex, `${start}\n    ${newProviders}\n  ${end}`);
                }
            }
            else {
                // If no providers array found, we'll need to add one or suggest manual configuration
                console.log(chalk_1.default.yellow('⚠️  Could not automatically configure HttpClient. Please add provideHttpClient() to your app.config.ts providers array.'));
                return;
            }
            await fs_extra_1.default.writeFile(configPath, configContent);
            console.log(chalk_1.default.green('✅ HttpClient configured in app.config.ts'));
        }
        else {
            console.log(chalk_1.default.yellow('⚠️  app.config.ts not found. Please manually add provideHttpClient() to your providers.'));
        }
    }
    catch (error) {
        console.log(chalk_1.default.yellow('⚠️  Could not automatically configure HttpClient. Please add provideHttpClient() to your app.config.ts providers array.'));
    }
}
async function ensureDependencies() {
    // Create directories
    await fs_extra_1.default.ensureDir('./src/lib/utils');
    await fs_extra_1.default.ensureDir('./src/lib/pipes');
    await fs_extra_1.default.ensureDir('./src/lib/components');
    await fs_extra_1.default.ensureDir('./src/lib/blocks');
    // Install cn utility if it doesn't exist
    const cnPath = './src/lib/utils/cn.ts';
    if (!(await fs_extra_1.default.pathExists(cnPath))) {
        const cnContent = `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;
        await fs_extra_1.default.writeFile(cnPath, cnContent);
    }
    // Install pipes
    await installPipes('./src/lib/pipes');
}
async function installPipes(pipesDirectory) {
    try {
        const baseUrl = 'https://raw.githubusercontent.com/bhaimicrosoft/angular-superui/main/projects/lib/src/lib/pipes';
        // List of pipes to install
        const pipes = ['truncate.pipe.ts', 'safe-html.pipe.ts', 'currency-format.pipe.ts'];
        for (const pipe of pipes) {
            try {
                const response = await axios_1.default.get(`${baseUrl}/${pipe}`);
                await fs_extra_1.default.writeFile(path_1.default.join(pipesDirectory, pipe), response.data);
            }
            catch (error) {
                // Continue if individual pipe fails
            }
        }
        // Create pipes index file
        const indexContent = `export * from './truncate.pipe';
export * from './safe-html.pipe';
export * from './currency-format.pipe';
`;
        await fs_extra_1.default.writeFile(path_1.default.join(pipesDirectory, 'index.ts'), indexContent);
    }
    catch (error) {
        // Ignore pipe installation errors
    }
}
//# sourceMappingURL=add.js.map