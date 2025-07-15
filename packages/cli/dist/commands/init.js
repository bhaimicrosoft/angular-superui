"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCommand = initCommand;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const inquirer_1 = __importDefault(require("inquirer"));
async function initCommand() {
    const spinner = (0, ora_1.default)('Initializing Angular SuperUI...').start();
    try {
        // Check if this is an Angular project
        const angularJsonExists = await fs_extra_1.default.pathExists('./angular.json');
        const packageJsonExists = await fs_extra_1.default.pathExists('./package.json');
        if (!angularJsonExists || !packageJsonExists) {
            spinner.fail('This does not appear to be an Angular project.');
            console.log(chalk_1.default.yellow('Please run this command in the root of an Angular project.'));
            return;
        }
        // Check if Angular SuperUI is already installed
        const packageJson = await fs_extra_1.default.readJson('./package.json');
        const hasAngularSuperUI = packageJson.dependencies?.['angular-superui'] ||
            packageJson.devDependencies?.['angular-superui'];
        let shouldInstallPackage = true;
        if (hasAngularSuperUI) {
            const { reinstall } = await inquirer_1.default.prompt([
                {
                    type: 'confirm',
                    name: 'reinstall',
                    message: 'Angular SuperUI is already installed. Do you want to reinstall?',
                    default: false
                }
            ]);
            shouldInstallPackage = reinstall;
        }
        if (shouldInstallPackage) {
            spinner.text = 'Installing Angular SuperUI package...';
            // Here you would run npm install angular-superui
            // For now, we'll simulate it
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        // Create utils directory if it doesn't exist
        const utilsDir = './src/lib/utils';
        await fs_extra_1.default.ensureDir(utilsDir);
        // Create cn utility function
        const cnUtilContent = `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;
        await fs_extra_1.default.writeFile(path_1.default.join(utilsDir, 'cn.ts'), cnUtilContent);
        // Create components directory
        const componentsDir = './src/lib/components';
        await fs_extra_1.default.ensureDir(componentsDir);
        // Update package.json with required dependencies
        const updatedPackageJson = {
            ...packageJson,
            dependencies: {
                ...packageJson.dependencies,
                'angular-superui': '^0.3.0',
                'class-variance-authority': '^0.7.0',
                'clsx': '^2.0.0',
                'tailwind-merge': '^1.14.0'
            }
        };
        await fs_extra_1.default.writeJson('./package.json', updatedPackageJson, { spaces: 2 });
        spinner.succeed('Angular SuperUI initialized successfully!');
        console.log(chalk_1.default.green('\\n✅ Setup complete!'));
        console.log(chalk_1.default.cyan('\\nNext steps:'));
        console.log(chalk_1.default.white('1. Run: npm install'));
        console.log(chalk_1.default.white('2. Add components: angular-superui add button'));
        console.log(chalk_1.default.white('3. List available components: angular-superui list'));
    }
    catch (error) {
        spinner.fail('Failed to initialize Angular SuperUI');
        console.error(chalk_1.default.red(error));
    }
}
//# sourceMappingURL=init.js.map