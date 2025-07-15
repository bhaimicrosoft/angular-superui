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
        files: ['alert.ts', 'alert.html']
    },
    'card': {
        name: 'Card',
        description: 'Displays a card with header, content, and footer.',
        dependencies: ['cn'],
        files: ['card.ts', 'card.html']
    },
    'input': {
        name: 'Input',
        description: 'Displays a form input field.',
        dependencies: ['cn'],
        files: ['input.component.ts', 'input.component.html']
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
async function addCommand(componentName, options) {
    const spinner = (0, ora_1.default)(`Adding ${componentName} component...`).start();
    try {
        // Check if component exists
        const component = exports.COMPONENTS[componentName];
        if (!component) {
            spinner.fail(`Component "${componentName}" not found.`);
            console.log(chalk_1.default.yellow('\\nAvailable components:'));
            Object.keys(exports.COMPONENTS).forEach(key => {
                const comp = exports.COMPONENTS[key];
                console.log(chalk_1.default.cyan(`  ${key}`) + chalk_1.default.gray(` - ${comp.description}`));
            });
            return;
        }
        // Create component directory
        const componentDir = `./src/lib/components/${componentName}`;
        await fs_extra_1.default.ensureDir(componentDir);
        // Check if component already exists
        const componentExists = await fs_extra_1.default.pathExists(path_1.default.join(componentDir, component.files[0]));
        if (componentExists && !options.force) {
            const { overwrite } = await inquirer_1.default.prompt([
                {
                    type: 'confirm',
                    name: 'overwrite',
                    message: `Component "${componentName}" already exists. Overwrite?`,
                    default: false
                }
            ]);
            if (!overwrite) {
                spinner.info('Component installation cancelled.');
                return;
            }
        }
        spinner.text = `Downloading ${componentName} files...`;
        // Download component files from GitHub repository
        const baseUrl = 'https://raw.githubusercontent.com/bhaimicrosoft/angular-superui/main/projects/lib/src/lib';
        for (const file of component.files) {
            try {
                const response = await axios_1.default.get(`${baseUrl}/${componentName}/${file}`);
                await fs_extra_1.default.writeFile(path_1.default.join(componentDir, file), response.data);
            }
            catch (error) {
                console.warn(chalk_1.default.yellow(`Warning: Could not download ${file}`));
            }
        }
        // Update component exports if needed
        await updateComponentExports(componentName, component);
        spinner.succeed(`Successfully added ${component.name} component!`);
        console.log(chalk_1.default.green('\\n✅ Component added successfully!'));
        console.log(chalk_1.default.cyan('\\nUsage:'));
        console.log(chalk_1.default.white(`import { ${component.name} } from './lib/components/${componentName}/${component.files[0].replace('.ts', '')}';`));
    }
    catch (error) {
        spinner.fail(`Failed to add ${componentName} component`);
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
        const exportLine = `export * from './${componentName}/${component.files[0].replace('.ts', '')}';`;
        if (!indexContent.includes(exportLine)) {
            indexContent += `\\n${exportLine}`;
            await fs_extra_1.default.writeFile(indexPath, indexContent);
        }
    }
    catch (error) {
        // Ignore errors in updating exports
    }
}
//# sourceMappingURL=add.js.map