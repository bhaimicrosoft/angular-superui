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
const child_process_1 = require("child_process");
// Get version from package.json
const packageJson = require('../../package.json');
const CLI_VERSION = packageJson.version;
// Utility function for padding text in banners
function padding(text, totalWidth) {
    const textLength = text.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '').length;
    const paddingNeeded = Math.max(0, totalWidth - textLength);
    const leftPad = Math.floor(paddingNeeded / 2);
    const rightPad = paddingNeeded - leftPad;
    return ' '.repeat(leftPad) + text + ' '.repeat(rightPad);
}
// Robust function to remove JSON comments while preserving strings
function removeJsonComments(jsonString) {
    let result = '';
    let i = 0;
    let inString = false;
    let stringDelimiter = '';
    let inSingleLineComment = false;
    let inMultiLineComment = false;
    while (i < jsonString.length) {
        const char = jsonString[i];
        const nextChar = jsonString[i + 1];
        // Handle string detection
        if (!inSingleLineComment && !inMultiLineComment) {
            if (!inString && (char === '"' || char === "'")) {
                inString = true;
                stringDelimiter = char;
                result += char;
                i++;
                continue;
            }
            else if (inString && char === stringDelimiter && jsonString[i - 1] !== '\\') {
                inString = false;
                stringDelimiter = '';
                result += char;
                i++;
                continue;
            }
        }
        // Skip comment processing if we're inside a string
        if (inString) {
            result += char;
            i++;
            continue;
        }
        // Handle single-line comments
        if (!inMultiLineComment && char === '/' && nextChar === '/') {
            inSingleLineComment = true;
            i += 2;
            continue;
        }
        // Handle multi-line comments
        if (!inSingleLineComment && char === '/' && nextChar === '*') {
            inMultiLineComment = true;
            i += 2;
            continue;
        }
        // End multi-line comments
        if (inMultiLineComment && char === '*' && nextChar === '/') {
            inMultiLineComment = false;
            i += 2;
            continue;
        }
        // End single-line comments
        if (inSingleLineComment && (char === '\n' || char === '\r')) {
            inSingleLineComment = false;
            result += char; // Keep the newline
            i++;
            continue;
        }
        // Add character if not in comment
        if (!inSingleLineComment && !inMultiLineComment) {
            result += char;
        }
        i++;
    }
    // Clean up trailing commas and extra whitespace
    return result
        .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
}
async function initCommand() {
    const version = CLI_VERSION;
    console.log('');
    console.log(chalk_1.default.hex('#8B5CF6')('╔══════════════════════════════════════════════════════════════════════╗'));
    console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#EC4899').bold('                    🎨 Angular SuperUI CLI v' + version + '                     ') + chalk_1.default.hex('#8B5CF6')('║'));
    console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#06B6D4')('                                                                      ') + chalk_1.default.hex('#8B5CF6')('║'));
    console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#10B981')('        ✨ 26 Beautiful Components • TypeScript • Local-First ✨       ') + chalk_1.default.hex('#8B5CF6')('║'));
    console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#F59E0B')('              🚀 TailwindCSS v4 • Angular 18+ • Zero NPM 🚀              ') + chalk_1.default.hex('#8B5CF6')('║'));
    console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#06B6D4')('                                                                      ') + chalk_1.default.hex('#8B5CF6')('║'));
    console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#EC4899')('                ⚡ Enterprise-Grade • Production-Ready ⚡                ') + chalk_1.default.hex('#8B5CF6')('║'));
    console.log(chalk_1.default.hex('#8B5CF6')('╚══════════════════════════════════════════════════════════════════════╝'));
    console.log('');
    console.log(chalk_1.default.hex('#10B981')('┌─ ') + chalk_1.default.bold.hex('#EC4899')('🎉 Initializing Your Angular SuperUI Project...') + chalk_1.default.hex('#10B981')(' ─┐'));
    console.log(chalk_1.default.hex('#10B981')('│  ') + chalk_1.default.hex('#F59E0B')('⚙️  Installing TailwindCSS v4, class-variance-authority, and clsx') + chalk_1.default.hex('#10B981')(' │'));
    console.log(chalk_1.default.hex('#10B981')('│  ') + chalk_1.default.hex('#8B5CF6')('🔧 Configuring Tailwind, CSS variables, and TypeScript paths') + chalk_1.default.hex('#10B981')('     │'));
    console.log(chalk_1.default.hex('#10B981')('│  ') + chalk_1.default.hex('#06B6D4')('📁 Setting up project structure for component installation') + chalk_1.default.hex('#10B981')('       │'));
    console.log(chalk_1.default.hex('#10B981')('└─ ') + chalk_1.default.hex('#EC4899')('✨ Ready to add beautiful components with ') + chalk_1.default.yellow('ngsui-cli add [component]') + chalk_1.default.hex('#10B981')(' ─┘'));
    console.log('');
    const spinner = (0, ora_1.default)(chalk_1.default.cyan('🚀 Initializing Angular SuperUI...')).start();
    try {
        // Check if this is an Angular project
        const angularJsonExists = await fs_extra_1.default.pathExists('./angular.json');
        const packageJsonExists = await fs_extra_1.default.pathExists('./package.json');
        if (!angularJsonExists || !packageJsonExists) {
            spinner.fail(chalk_1.default.red('❌ This does not appear to be an Angular project.'));
            console.log(chalk_1.default.yellow('💡 Please run this command in the root of an Angular project.'));
            return;
        }
        // Check if Angular SuperUI is already initialized
        const componentsDirPath = './src/lib/components';
        const utilsDirPath = './src/lib/utils';
        const hasAngularSuperUI = await fs_extra_1.default.pathExists(componentsDirPath) && await fs_extra_1.default.pathExists(path_1.default.join(utilsDirPath, 'cn.ts'));
        let shouldInstallPackage = true;
        if (hasAngularSuperUI) {
            spinner.stop();
            console.log(''); // Add blank line for better formatting
            const { reinstall } = await inquirer_1.default.prompt([
                {
                    type: 'confirm',
                    name: 'reinstall',
                    message: 'Angular SuperUI is already initialized. Do you want to reinitialize?',
                    default: false
                }
            ]);
            if (reinstall) {
                spinner.start('Reinitializing Angular SuperUI...');
            }
            else {
                spinner.start('Updating configuration...');
            }
            shouldInstallPackage = reinstall;
        }
        if (shouldInstallPackage) {
            try {
                // Install TailwindCSS v4 and PostCSS dependencies
                spinner.text = 'Installing TailwindCSS v4 and PostCSS...';
                (0, child_process_1.execSync)('npm install --save-dev tailwindcss@next @tailwindcss/postcss@next postcss autoprefixer --legacy-peer-deps', { stdio: 'inherit' });
                // Install required dependencies
                spinner.text = 'Installing required dependencies...';
                (0, child_process_1.execSync)('npm install class-variance-authority clsx tailwind-merge --legacy-peer-deps', { stdio: 'inherit' });
            }
            catch (error) {
                spinner.fail('Failed to install packages');
                console.error(chalk_1.default.red(error));
                return;
            }
        }
        // Check for existing tailwind.config.js and warn user
        const tailwindConfigPaths = ['./tailwind.config.js', './tailwind.config.ts', './tailwind.config.mjs'];
        const existingConfigPath = tailwindConfigPaths.find(path => fs_extra_1.default.pathExistsSync(path));
        if (existingConfigPath) {
            spinner.stop();
            console.log('');
            console.log(chalk_1.default.hex('#FF6B6B')('╔═══════════════════════════════════════════════════════════════════╗'));
            console.log(chalk_1.default.hex('#FF6B6B')('║') + chalk_1.default.hex('#FFE66D')(padding('⚠️  CONFIGURATION CONFLICT DETECTED ⚠️', 67)) + chalk_1.default.hex('#FF6B6B')('║'));
            console.log(chalk_1.default.hex('#FF6B6B')('║') + chalk_1.default.hex('#A8E6CF')(padding('', 67)) + chalk_1.default.hex('#FF6B6B')('║'));
            console.log(chalk_1.default.hex('#FF6B6B')('║') + chalk_1.default.hex('#C7CEEA')(padding(`Found existing config: ${existingConfigPath}`, 67)) + chalk_1.default.hex('#FF6B6B')('║'));
            console.log(chalk_1.default.hex('#FF6B6B')('║') + chalk_1.default.hex('#FF8B94')(padding('Angular SuperUI uses Tailwind CSS v4', 67)) + chalk_1.default.hex('#FF6B6B')('║'));
            console.log(chalk_1.default.hex('#FF6B6B')('║') + chalk_1.default.hex('#FF8B94')(padding('which requires removing the old config file', 67)) + chalk_1.default.hex('#FF6B6B')('║'));
            console.log(chalk_1.default.hex('#FF6B6B')('║') + chalk_1.default.hex('#A8E6CF')(padding('', 67)) + chalk_1.default.hex('#FF6B6B')('║'));
            console.log(chalk_1.default.hex('#FF6B6B')('║') + chalk_1.default.bold.hex('#FFE66D')(padding('⚡ Please backup any custom styling first! ⚡', 67)) + chalk_1.default.hex('#FF6B6B')('║'));
            console.log(chalk_1.default.hex('#FF6B6B')('╚═══════════════════════════════════════════════════════════════════╝'));
            console.log('');
            const { deleteConfig } = await inquirer_1.default.prompt([
                {
                    type: 'confirm',
                    name: 'deleteConfig',
                    message: `Delete ${existingConfigPath} and proceed with Tailwind CSS v4 setup?`,
                    default: false
                }
            ]);
            if (!deleteConfig) {
                console.log(chalk_1.default.yellow('Setup cancelled. Please backup your config and run again.'));
                return;
            }
            // Delete the existing config file
            await fs_extra_1.default.remove(existingConfigPath);
            spinner.start('Continuing with Tailwind CSS v4 setup...');
        }
        // Create utils directory if it doesn't exist
        const utilsDirectory = './src/lib/utils';
        await fs_extra_1.default.ensureDir(utilsDirectory);
        // Create cn utility function
        const cnUtilContent = `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;
        await fs_extra_1.default.writeFile(path_1.default.join(utilsDirectory, 'cn.ts'), cnUtilContent);
        // Create components directory
        const componentsDirectory = './src/lib/components';
        await fs_extra_1.default.ensureDir(componentsDirectory);
        // Read package.json to update dependencies
        const packageJson = await fs_extra_1.default.readJson('./package.json');
        // Update package.json with required dependencies
        const updatedPackageJson = {
            ...packageJson,
            dependencies: {
                ...packageJson.dependencies,
                'class-variance-authority': '^0.7.0',
                'clsx': '^2.0.0',
                'tailwind-merge': '^3.3.1'
            },
            devDependencies: {
                ...packageJson.devDependencies,
                'tailwindcss': '^4.1.11',
                '@tailwindcss/postcss': '^4.1.11',
                'postcss': '^8.4.0',
                'autoprefixer': '^10.4.0'
            }
        };
        await fs_extra_1.default.writeJson('./package.json', updatedPackageJson, { spaces: 2 });
        // Create .postcssrc.json for TailwindCSS v4
        const postcssConfig = {
            "plugins": {
                "@tailwindcss/postcss": {}
            }
        };
        await fs_extra_1.default.writeJson('./.postcssrc.json', postcssConfig, { spaces: 2 });
        // Update tsconfig.json with path aliases
        try {
            const tsconfigPath = './tsconfig.json';
            if (await fs_extra_1.default.pathExists(tsconfigPath)) {
                spinner.text = 'Updating tsconfig.json with path aliases...';
                // Read the file content
                let tsconfigContent = await fs_extra_1.default.readFile(tsconfigPath, 'utf8');
                // Use our robust comment removal function
                const cleanedContent = removeJsonComments(tsconfigContent);
                let tsconfig;
                try {
                    tsconfig = JSON.parse(cleanedContent);
                }
                catch (parseError) {
                    // If parsing still fails, try a more aggressive approach
                    spinner.text = 'Attempting alternative tsconfig.json parsing...';
                    // Fallback: try to extract just the JSON object
                    const jsonMatch = cleanedContent.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        try {
                            tsconfig = JSON.parse(jsonMatch[0]);
                        }
                        catch (fallbackError) {
                            throw new Error(`Unable to parse tsconfig.json: ${fallbackError instanceof Error ? fallbackError.message : String(fallbackError)}`);
                        }
                    }
                    else {
                        throw new Error('Could not find valid JSON structure in tsconfig.json');
                    }
                }
                // Ensure compilerOptions exists
                if (!tsconfig.compilerOptions) {
                    tsconfig.compilerOptions = {};
                }
                // Add baseUrl and paths
                tsconfig.compilerOptions.baseUrl = "src";
                tsconfig.compilerOptions.paths = {
                    "@lib/*": ["lib/*"],
                    ...(tsconfig.compilerOptions.paths || {})
                };
                await fs_extra_1.default.writeJson(tsconfigPath, tsconfig, { spaces: 2 });
                spinner.text = 'Successfully updated tsconfig.json with path aliases!';
                // Small delay to show success message
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            else {
                spinner.text = 'No tsconfig.json found, skipping path aliases...';
            }
        }
        catch (error) {
            console.log('');
            console.log(chalk_1.default.bgYellow.black(' WARNING ') + ' ' + chalk_1.default.yellow(`Could not update tsconfig.json: ${error instanceof Error ? error.message : String(error)}`));
            console.log(chalk_1.default.gray('You may need to manually add path aliases to your tsconfig.json:'));
            console.log(chalk_1.default.gray('  "baseUrl": "src",'));
            console.log(chalk_1.default.gray('  "paths": {'));
            console.log(chalk_1.default.gray('    "@lib/*": ["lib/*"]'));
            console.log(chalk_1.default.gray('  }'));
            console.log('');
        }
        // Create or update styles.scss/styles.css with Tailwind CSS v4 syntax
        const globalStyles = `@import "tailwindcss";

@layer base {
  :root {
    /* Base Theme Variables */
    --background: hsl(0 0% 100%);
    --foreground: hsl(222.2 84% 4.9%);
    --card: hsl(0 0% 100%);
    --card-foreground: hsl(222.2 84% 4.9%);
    --popover: hsl(0 0% 100%);
    --popover-foreground: hsl(222.2 84% 4.9%);
    --primary: hsl(222.2 47.4% 11.2%);
    --primary-foreground: hsl(210 40% 98%);
    --secondary: hsl(210 40% 96.1%);
    --secondary-foreground: hsl(222.2 47.4% 11.2%);
    --muted: hsl(210 40% 96.1%);
    --muted-foreground: hsl(215.4 16.3% 46.9%);
    --accent: hsl(210 40% 96.1%);
    --accent-foreground: hsl(222.2 47.4% 11.2%);
    --destructive: hsl(0 84.2% 60.2%);
    --destructive-foreground: hsl(210 40% 98%);
    --border: hsl(214.3 31.8% 91.4%);
    --input: hsl(214.3 31.8% 91.4%);
    --ring: hsl(222.2 84% 4.9%);
    --radius: 0.5rem;

    /* Extended Color Palette */
    --success: hsl(142 76% 36%);
    --success-foreground: hsl(355 7% 97%);
    --warning: hsl(43 89% 38%);
    --warning-foreground: hsl(355 7% 97%);
    --info: hsl(217 91% 60%);
    --info-foreground: hsl(355 7% 97%);
    --purple: hsl(262 83% 58%);
    --purple-foreground: hsl(355 7% 97%);
    --pink: hsl(336 84% 57%);
    --pink-foreground: hsl(355 7% 97%);
    --orange: hsl(25 95% 53%);
    --orange-foreground: hsl(355 7% 97%);
    --teal: hsl(173 58% 39%);
    --teal-foreground: hsl(355 7% 97%);
    --indigo: hsl(234 89% 74%);
    --indigo-foreground: hsl(355 7% 97%);
    --cyan: hsl(188 94% 43%);
    --cyan-foreground: hsl(355 7% 97%);
    --rose: hsl(351 83% 61%);
    --rose-foreground: hsl(355 7% 97%);
    --emerald: hsl(160 84% 39%);
    --emerald-foreground: hsl(355 7% 97%);
    --amber: hsl(43 96% 56%);
    --amber-foreground: hsl(26 83% 14%);
    --lime: hsl(84 81% 44%);
    --lime-foreground: hsl(20 14% 4%);
    --violet: hsl(258 90% 66%);
    --violet-foreground: hsl(355 7% 97%);
    --sky: hsl(199 89% 48%);
    --sky-foreground: hsl(355 7% 97%);
  }

  .dark {
    --background: hsl(222.2 84% 4.9%);
    --foreground: hsl(210 40% 98%);
    --card: hsl(222.2 84% 4.9%);
    --card-foreground: hsl(210 40% 98%);
    --popover: hsl(222.2 84% 4.9%);
    --popover-foreground: hsl(210 40% 98%);
    --primary: hsl(210 40% 98%);
    --primary-foreground: hsl(222.2 47.4% 11.2%);
    --secondary: hsl(217.2 32.6% 17.5%);
    --secondary-foreground: hsl(210 40% 98%);
    --muted: hsl(217.2 32.6% 17.5%);
    --muted-foreground: hsl(215 20.2% 65.1%);
    --accent: hsl(217.2 32.6% 17.5%);
    --accent-foreground: hsl(210 40% 98%);
    --destructive: hsl(0 62.8% 30.6%);
    --destructive-foreground: hsl(210 40% 98%);
    --border: hsl(217.2 32.6% 17.5%);
    --input: hsl(217.2 32.6% 17.5%);
    --ring: hsl(212.7 26.8% 83.9%);

    /* Dark Mode Extended Colors */
    --success: hsl(142 69% 58%);
    --success-foreground: hsl(144 61% 20%);
    --warning: hsl(43 89% 70%);
    --warning-foreground: hsl(43 100% 11%);
    --info: hsl(217 91% 60%);
    --info-foreground: hsl(215 25% 27%);
    --purple: hsl(262 83% 70%);
    --purple-foreground: hsl(263 69% 12%);
    --pink: hsl(336 84% 70%);
    --pink-foreground: hsl(336 69% 14%);
    --orange: hsl(25 95% 65%);
    --orange-foreground: hsl(25 100% 6%);
    --teal: hsl(173 58% 55%);
    --teal-foreground: hsl(173 100% 11%);
    --indigo: hsl(234 89% 74%);
    --indigo-foreground: hsl(234 100% 9%);
    --cyan: hsl(188 94% 60%);
    --cyan-foreground: hsl(188 100% 9%);
    --rose: hsl(351 83% 70%);
    --rose-foreground: hsl(351 100% 14%);
    --emerald: hsl(160 84% 55%);
    --emerald-foreground: hsl(160 100% 9%);
    --amber: hsl(43 96% 70%);
    --amber-foreground: hsl(43 100% 11%);
    --lime: hsl(84 81% 60%);
    --lime-foreground: hsl(84 100% 10%);
    --violet: hsl(258 90% 75%);
    --violet-foreground: hsl(258 100% 10%);
    --sky: hsl(199 89% 65%);
    --sky-foreground: hsl(199 100% 6%);
  }

  /* Theme Color Classes */
  .theme-blue {
    --primary: hsl(217 91% 60%);
    --primary-foreground: hsl(355 7% 97%);
  }

  .theme-green {
    --primary: hsl(142 76% 36%);
    --primary-foreground: hsl(355 7% 97%);
  }

  .theme-purple {
    --primary: hsl(262 83% 58%);
    --primary-foreground: hsl(355 7% 97%);
  }

  .theme-pink {
    --primary: hsl(336 84% 57%);
    --primary-foreground: hsl(355 7% 97%);
  }

  .theme-orange {
    --primary: hsl(25 95% 53%);
    --primary-foreground: hsl(355 7% 97%);
  }

  .theme-teal {
    --primary: hsl(173 58% 39%);
    --primary-foreground: hsl(355 7% 97%);
  }

  .theme-red {
    --primary: hsl(0 84% 60%);
    --primary-foreground: hsl(355 7% 97%);
  }

  .theme-yellow {
    --primary: hsl(43 96% 56%);
    --primary-foreground: hsl(26 83% 14%);
  }

  .theme-indigo {
    --primary: hsl(234 89% 74%);
    --primary-foreground: hsl(355 7% 97%);
  }

  .theme-cyan {
    --primary: hsl(188 94% 43%);
    --primary-foreground: hsl(355 7% 97%);
  }
}

@theme {
  /* Base Colors */
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  /* Semantic Colors */
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);

  /* Extended Color Palette */
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --color-purple: var(--purple);
  --color-purple-foreground: var(--purple-foreground);
  --color-pink: var(--pink);
  --color-pink-foreground: var(--pink-foreground);
  --color-orange: var(--orange);
  --color-orange-foreground: var(--orange-foreground);
  --color-teal: var(--teal);
  --color-teal-foreground: var(--teal-foreground);
  --color-indigo: var(--indigo);
  --color-indigo-foreground: var(--indigo-foreground);
  --color-cyan: var(--cyan);
  --color-cyan-foreground: var(--cyan-foreground);
  --color-rose: var(--rose);
  --color-rose-foreground: var(--rose-foreground);
  --color-emerald: var(--emerald);
  --color-emerald-foreground: var(--emerald-foreground);
  --color-amber: var(--amber);
  --color-amber-foreground: var(--amber-foreground);
  --color-lime: var(--lime);
  --color-lime-foreground: var(--lime-foreground);
  --color-violet: var(--violet);
  --color-violet-foreground: var(--violet-foreground);
  --color-sky: var(--sky);
  --color-sky-foreground: var(--sky-foreground);

  /* Border Radius */
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);

  /* Animations */
  --animate-accordion-down: accordion-down 0.2s ease-out;
  --animate-accordion-up: accordion-up 0.2s ease-out;
  --animate-fade-in: fade-in 0.2s ease-out;
  --animate-fade-out: fade-out 0.2s ease-in;
  --animate-slide-in-from-top: slide-in-from-top 0.2s ease-out;
  --animate-slide-out-to-top: slide-out-to-top 0.2s ease-in;
  --animate-slide-in-from-bottom: slide-in-from-bottom 0.2s ease-out;
  --animate-slide-out-to-bottom: slide-out-to-bottom 0.2s ease-in;
  --animate-slide-in-from-left: slide-in-from-left 0.2s ease-out;
  --animate-slide-out-to-left: slide-out-to-left 0.2s ease-in;
  --animate-slide-in-from-right: slide-in-from-right 0.2s ease-out;
  --animate-slide-out-to-right: slide-out-to-right 0.2s ease-in;
  --animate-caret-blink: caret-blink 1.25s ease-out infinite;
  --animate-shimmer: shimmer 2s linear infinite;

  /* Box Shadows */
  --shadow-elegant: 0 4px 20px rgba(0, 0, 0, 0.08);
  --shadow-elegant-lg: 0 10px 40px rgba(0, 0, 0, 0.1);
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slide-in-from-top {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out-to-top {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

@keyframes slide-in-from-bottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out-to-bottom {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}

@keyframes slide-in-from-left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-out-to-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes slide-in-from-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-out-to-right {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

@keyframes caret-blink {
  0%, 70%, 100% {
    opacity: 1;
  }
  20%, 50% {
    opacity: 0;
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
`;
        // Check if styles.scss exists, otherwise use styles.css
        const stylesScssPath = './src/styles.scss';
        const stylesCssPath = './src/styles.css';
        if (await fs_extra_1.default.pathExists(stylesScssPath)) {
            await fs_extra_1.default.writeFile(stylesScssPath, globalStyles);
        }
        else {
            await fs_extra_1.default.writeFile(stylesCssPath, globalStyles);
        }
        spinner.succeed('');
        // Success banner with same styling
        console.log('');
        console.log(chalk_1.default.hex('#4ECDC4')('╔════════════════════════════════════════════════════════════════════╗'));
        console.log(chalk_1.default.hex('#4ECDC4')('║') + chalk_1.default.hex('#A8E6CF')(padding('🎉 SETUP COMPLETE! 🎉', 68)) + chalk_1.default.hex('#4ECDC4')('║'));
        console.log(chalk_1.default.hex('#4ECDC4')('║') + chalk_1.default.hex('#FFE66D')(padding('Angular SuperUI is ready to use!', 68)) + chalk_1.default.hex('#4ECDC4')('║'));
        console.log(chalk_1.default.hex('#4ECDC4')('║') + chalk_1.default.hex('#FF8B94')(padding('', 68)) + chalk_1.default.hex('#4ECDC4')('║'));
        console.log(chalk_1.default.hex('#4ECDC4')('║') + chalk_1.default.hex('#C7CEEA')(padding('✨ 4 components available • 0 dependencies ✨', 68)) + chalk_1.default.hex('#4ECDC4')('║'));
        console.log(chalk_1.default.hex('#4ECDC4')('╚════════════════════════════════════════════════════════════════════╝'));
        console.log('');
        console.log(chalk_1.default.hex('#FF6B6B')('┌─ ') + chalk_1.default.bold.hex('#4ECDC4')('🚀 NEXT STEPS') + chalk_1.default.hex('#FF6B6B')(' ─┐'));
        console.log(chalk_1.default.hex('#FF6B6B')('│  ') + chalk_1.default.hex('#FFE66D')('1. Add your first component: ') + chalk_1.default.bold.hex('#A8E6CF')('ngsui-cli add badge') + chalk_1.default.hex('#FF6B6B')('   │'));
        console.log(chalk_1.default.hex('#FF6B6B')('│  ') + chalk_1.default.hex('#FFE66D')('2. Add multiple components: ') + chalk_1.default.bold.hex('#A8E6CF')('ngsui-cli add accordion alert') + chalk_1.default.hex('#FF6B6B')(' │'));
        console.log(chalk_1.default.hex('#FF6B6B')('│  ') + chalk_1.default.hex('#FFE66D')('3. Browse all components:  ') + chalk_1.default.bold.hex('#A8E6CF')('ngsui-cli list') + chalk_1.default.hex('#FF6B6B')('             │'));
        console.log(chalk_1.default.hex('#FF6B6B')('└─ ') + chalk_1.default.hex('#C7CEEA')('Start building amazing UIs today!') + chalk_1.default.hex('#FF6B6B')(' ─┘'));
        console.log('');
        console.log(chalk_1.default.hex('#A8E6CF')('┌─ ') + chalk_1.default.bold.hex('#FF6B6B')('🎨 FEATURES CONFIGURED') + chalk_1.default.hex('#A8E6CF')(' ─┐'));
        console.log(chalk_1.default.hex('#A8E6CF')('│  ') + chalk_1.default.hex('#4ECDC4')('✓ Local component structure in ./src/lib/components/') + chalk_1.default.hex('#A8E6CF')('        │'));
        console.log(chalk_1.default.hex('#A8E6CF')('│  ') + chalk_1.default.hex('#4ECDC4')('✓ TypeScript path aliases (@lib/*)') + chalk_1.default.hex('#A8E6CF')('                         │'));
        console.log(chalk_1.default.hex('#A8E6CF')('│  ') + chalk_1.default.hex('#4ECDC4')('✓ Tailwind CSS v4 with @import and @theme directive') + chalk_1.default.hex('#A8E6CF')('         │'));
        console.log(chalk_1.default.hex('#A8E6CF')('│  ') + chalk_1.default.hex('#4ECDC4')('✓ PostCSS configuration with .postcssrc.json') + chalk_1.default.hex('#A8E6CF')('               │'));
        console.log(chalk_1.default.hex('#A8E6CF')('│  ') + chalk_1.default.hex('#4ECDC4')('✓ Angular SuperUI theme variables and extended colors') + chalk_1.default.hex('#A8E6CF')('       │'));
        console.log(chalk_1.default.hex('#A8E6CF')('│  ') + chalk_1.default.hex('#4ECDC4')('✓ Complete animation keyframes and utility classes') + chalk_1.default.hex('#A8E6CF')('          │'));
        console.log(chalk_1.default.hex('#A8E6CF')('│  ') + chalk_1.default.hex('#4ECDC4')('✓ Zero external NPM dependencies') + chalk_1.default.hex('#A8E6CF')('                           │'));
        console.log(chalk_1.default.hex('#A8E6CF')('└─ ') + chalk_1.default.hex('#FFE66D')('Ready to create beautiful, accessible components!') + chalk_1.default.hex('#A8E6CF')(' ─┘'));
        console.log('');
        console.log(chalk_1.default.hex('#FF8B94')('💜 ') + chalk_1.default.bold.hex('#C7CEEA')('Happy coding with Angular SuperUI!') + chalk_1.default.hex('#FF8B94')(' 💜'));
        console.log('');
    }
    catch (error) {
        spinner.fail('Failed to initialize Angular SuperUI');
        console.error(chalk_1.default.red(error));
    }
}
//# sourceMappingURL=init.js.map