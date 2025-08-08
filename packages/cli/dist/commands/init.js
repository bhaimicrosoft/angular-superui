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
    console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#10B981')('      ✨ 39 Components + 5 Blocks • TypeScript • Local-First ✨       ') + chalk_1.default.hex('#8B5CF6')('║'));
    console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#F59E0B')('              🚀 TailwindCSS v4 • Angular 18+ • Zero NPM 🚀              ') + chalk_1.default.hex('#8B5CF6')('║'));
    console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#06B6D4')('                                                                      ') + chalk_1.default.hex('#8B5CF6')('║'));
    console.log(chalk_1.default.hex('#8B5CF6')('║') + chalk_1.default.hex('#EC4899')('                ⚡ Enterprise-Grade • Production-Ready ⚡                ') + chalk_1.default.hex('#8B5CF6')('║'));
    console.log(chalk_1.default.hex('#8B5CF6')('╚══════════════════════════════════════════════════════════════════════╝'));
    console.log('');
    console.log(chalk_1.default.hex('#10B981')('┌─ ') + chalk_1.default.bold.hex('#EC4899')('🎉 Initializing Your Angular SuperUI Project...') + chalk_1.default.hex('#10B981')(' ─┐'));
    console.log(chalk_1.default.hex('#10B981')('│  ') + chalk_1.default.hex('#F59E0B')('⚙️  Installing TailwindCSS v4, class-variance-authority, and clsx') + chalk_1.default.hex('#10B981')(' │'));
    console.log(chalk_1.default.hex('#10B981')('│  ') + chalk_1.default.hex('#8B5CF6')('🔧 Configuring Tailwind, CSS variables, and TypeScript paths') + chalk_1.default.hex('#10B981')('     │'));
    console.log(chalk_1.default.hex('#10B981')('│  ') + chalk_1.default.hex('#06B6D4')('📁 Setting up project structure for component installation') + chalk_1.default.hex('#10B981')('       │'));
    console.log(chalk_1.default.hex('#10B981')('└─ ') + chalk_1.default.hex('#EC4899')('✨ Ready to add components with ') + chalk_1.default.yellow('ngsui-cli add [component]') + chalk_1.default.hex('#EC4899')(' and blocks with ') + chalk_1.default.yellow('ngsui-cli add block [block]') + chalk_1.default.hex('#10B981')(' ─┘'));
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
                (0, child_process_1.execSync)('npm install class-variance-authority clsx tailwind-merge @angular/cdk @angular/animations --legacy-peer-deps', { stdio: 'inherit' });
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
        // Create blocks directory
        const blocksDirectory = './src/lib/blocks';
        await fs_extra_1.default.ensureDir(blocksDirectory);
        // Create pipes directory and install pipes
        const pipesDirectory = './src/lib/pipes';
        await fs_extra_1.default.ensureDir(pipesDirectory);
        // Install pipes from the library
        await installPipes(pipesDirectory);
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
        // Update app.config.ts with provideAnimationsAsync
        try {
            const appConfigPaths = ['./src/app/app.config.ts', './src/app.config.ts'];
            const appConfigPath = appConfigPaths.find(path => fs_extra_1.default.pathExistsSync(path));
            if (appConfigPath) {
                spinner.text = 'Updating app.config.ts with animations provider...';
                let appConfigContent = await fs_extra_1.default.readFile(appConfigPath, 'utf8');
                // Check if provideAnimationsAsync is already imported and provided
                const hasAnimationsImport = appConfigContent.includes('provideAnimationsAsync');
                const hasAnimationsProvision = appConfigContent.includes('provideAnimationsAsync()');
                if (!hasAnimationsImport || !hasAnimationsProvision) {
                    // Add import if missing
                    if (!hasAnimationsImport) {
                        const importRegex = /import\s+{([^}]+)}\s+from\s+['"]@angular\/platform-browser\/animations\/async['"];?/;
                        const existingAnimationsImport = appConfigContent.match(importRegex);
                        if (existingAnimationsImport) {
                            // Update existing import
                            const imports = existingAnimationsImport[1].split(',').map(i => i.trim());
                            if (!imports.includes('provideAnimationsAsync')) {
                                imports.push('provideAnimationsAsync');
                                appConfigContent = appConfigContent.replace(importRegex, `import { ${imports.join(', ')} } from '@angular/platform-browser/animations/async';`);
                            }
                        }
                        else {
                            // Add new import
                            const lastImportMatch = appConfigContent.match(/import[^;]+;(?=\s*(?:\/\/.*\s*)*(?:\/\*[\s\S]*?\*\/\s*)*\s*(?:export|interface|class|const|let|var|function|@))/g);
                            if (lastImportMatch) {
                                const lastImport = lastImportMatch[lastImportMatch.length - 1];
                                const insertPosition = appConfigContent.indexOf(lastImport) + lastImport.length;
                                appConfigContent = appConfigContent.slice(0, insertPosition) +
                                    '\nimport { provideAnimationsAsync } from \'@angular/platform-browser/animations/async\';' +
                                    appConfigContent.slice(insertPosition);
                            }
                            else {
                                // Add at the beginning
                                appConfigContent = 'import { provideAnimationsAsync } from \'@angular/platform-browser/animations/async\';\n' + appConfigContent;
                            }
                        }
                    }
                    // Add provider if missing
                    if (!hasAnimationsProvision) {
                        const providersMatch = appConfigContent.match(/providers:\s*\[\s*([^\]]*)\]/s);
                        if (providersMatch) {
                            const providersContent = providersMatch[1].trim();
                            const newProviders = providersContent
                                ? `${providersContent},\n    provideAnimationsAsync()`
                                : 'provideAnimationsAsync()';
                            appConfigContent = appConfigContent.replace(/providers:\s*\[\s*([^\]]*)\]/s, `providers: [\n    ${newProviders}\n  ]`);
                        }
                        else {
                            // Look for bootstrapApplication config
                            const bootstrapMatch = appConfigContent.match(/bootstrapApplication\([^,]+,\s*{([^}]*)}/s);
                            if (bootstrapMatch) {
                                const configContent = bootstrapMatch[1].trim();
                                const newConfig = configContent
                                    ? `${configContent},\n  providers: [provideAnimationsAsync()]`
                                    : 'providers: [provideAnimationsAsync()]';
                                appConfigContent = appConfigContent.replace(/bootstrapApplication\([^,]+,\s*{([^}]*)}/s, `bootstrapApplication($1, {\n  ${newConfig}\n})`);
                            }
                        }
                    }
                    await fs_extra_1.default.writeFile(appConfigPath, appConfigContent);
                    spinner.text = 'Successfully updated app.config.ts with animations provider!';
                    // Small delay to show success message
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
            else {
                spinner.text = 'No app.config.ts found, skipping animations provider...';
            }
        }
        catch (error) {
            console.log('');
            console.log(chalk_1.default.bgYellow.black(' WARNING ') + ' ' + chalk_1.default.yellow(`Could not update app.config.ts: ${error instanceof Error ? error.message : String(error)}`));
            console.log(chalk_1.default.gray('You may need to manually add provideAnimationsAsync to your app.config.ts:'));
            console.log(chalk_1.default.gray('  import { provideAnimationsAsync } from \'@angular/platform-browser/animations/async\';'));
            console.log(chalk_1.default.gray('  providers: [..., provideAnimationsAsync()]'));
            console.log('');
        }
        // Create or update styles.scss/styles.css with Tailwind CSS v4 syntax
        const globalStyles = `@import "tailwindcss";

/*To enable class based dark mode for the application*/
@custom-variant dark (&:where(.dark, .dark *));

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
    color-scheme: dark;
    --background: hsl(222.2 84% 4.9%);
    --foreground: hsl(210 40% 98%);
    --card: hsl(222.2 84% 4.9%);
    --card-foreground: hsl(210 40% 98%);
    --popover: hsl(222.2 84% 4.9%);
    --popover-foreground: hsl(210 40% 98%);
    --primary: hsl(210 40% 98%);
    --primary-radio: hsl(0, 0%, 45%);
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

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    font-feature-settings: "rlig" 1, "calt" 1;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  /* Focus indicators for better accessibility */
  .focus-visible {
    outline: 2px solid theme(colors.blue.500);
    outline-offset: 2px;
  }

  /* Screen reader only content */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Hide scrollbars for mobile menubar */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Ensure mobile menus don't overflow viewport */
  @media (max-width: 640px) {
    [role="menu"] {
      max-width: calc(100vw - 2rem);
      transform: translateX(0);
    }

    /* Adjust submenu positioning on mobile */
    .menubar-submenu-mobile {
      left: auto !important;
      right: 0 !important;
      transform: translateX(0) !important;
    }
  }

  /* Touch targets for mobile */
  @media (max-width: 768px) {
    [role="menuitem"] {
      min-height: 44px;
      padding: 12px 16px;
    }

    button[aria-haspopup="true"] {
      min-height: 44px;
      padding: 12px 16px;
    }
  }

  /* CDK Overlay Styles for Menubar */
  .cdk-overlay-container {
    z-index: 1000;
  }

  /* Data state selectors for proper state management */
  [data-state="closed"] .animate-out {
    animation-fill-mode: both;
  }

  [data-state="open"] .animate-in {
    animation-fill-mode: both;
  }

  /* Modal Popover Styles */
  .cdk-overlay-dark-backdrop {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(2px);
  }

  .modal-popover-panel {
    z-index: 1000;
  }

  /* Mobile-specific optimizations */
  @media (max-width: 640px) {
    /* Ensure DataTable scrolls horizontally on mobile */
    .data-table-container {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    /* Optimize table cells for mobile readability */
    table td, table th {
      min-width: 100px;
      font-size: 0.875rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :host *,
    :host *::before,
    :host *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

@theme {
  /* ... All your @theme content remains unchanged ... */
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

  /* Box Shadows */
  --shadow-elegant: 0 4px 20px rgba(0, 0, 0, 0.08);
  --shadow-elegant-lg: 0 10px 40px rgba(0, 0, 0, 0.1);

  /* Animation Variables - Clean and Organized */

  /* Basic Animations */
  --animate-fade-in: fadeIn 0.3s ease-out;
  --animate-fade-out: fadeOut 0.3s ease-in;
  --animate-slide-up: slideUp 0.3s ease-out;
  --animate-slide-down: slideDown 0.3s ease-out;
  --animate-slide-left: slideLeft 0.3s ease-out;
  --animate-slide-right: slideRight 0.3s ease-out;
  --animate-scale-in: scaleIn 0.3s ease-out;
  --animate-scale-out: scaleOut 0.3s ease-in;

  /* Component Specific */
  --animate-accordion-down: accordionDown 0.2s ease-out;
  --animate-accordion-up: accordionUp 0.2s ease-out;

  /* Attention Seekers */
  --animate-bounce: bounce 1s infinite;
  --animate-pulse: pulse 2s infinite;
  --animate-ping: ping 1s infinite;
  --animate-spin: spin 1s linear infinite;
  --animate-shake: shake 0.5s ease-in-out;
  --animate-wobble: wobble 1s ease-in-out;
  --animate-heartbeat: heartbeat 1.5s ease-in-out infinite;
  --animate-flash: flash 2s infinite;

  /* Advanced Effects */
  --animate-zoom-in: zoomIn 0.6s ease-out;
  --animate-zoom-out: zoomOut 0.6s ease-in;
  --animate-flip: flip 1s ease-in-out;
  --animate-rubber-band: rubberBand 1s ease-in-out;
  --animate-jello: jello 0.9s ease-in-out;
  --animate-tada: tada 1s ease-in-out;
  --animate-swing: swing 1s ease-in-out;

  /* Text Effects */
  --animate-typewriter: typewriter 4s steps(40, end) forwards;
  --animate-typewriter-fast: typewriter 2s steps(30, end) forwards;
  --animate-typewriter-slow: typewriter 6s steps(50, end) forwards;
  --animate-typewriter-cursor: typewriterWithCursor 4s steps(40, end) forwards;
  --animate-typewriter-cursor-fast: typewriterWithCursor 2s steps(30, end) forwards;
  --animate-typewriter-cursor-slow: typewriterWithCursor 6s steps(50, end) forwards;
  --animate-typewriter-cursor-only: typewriterCursorOnly 1s steps(2, end) infinite;
  --animate-text-focus: textFocus 1s ease-in-out;
  --animate-neon-glow: neonGlow 2s ease-in-out infinite alternate;
  --animate-typeletter: typing 2s steps(1, end), blink 0.75s step-end infinite;

  /* Utility Animations */
  --animate-shimmer: shimmer 2s linear infinite;
  --animate-caret-blink: caretBlink 1.25s ease-out infinite;
  --animate-matrix: matrix 2s linear infinite;
  --animate-glitch: glitch 0.3s ease-in-out infinite;

  /* Keyframes - Clean and Working Animations */

  /* Basic Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideLeft {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideRight {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes scaleOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.9);
    }
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes blink {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: currentColor; /* Or a specific color like 'orange' */
    }
  }



  /* Component Specific */
  @keyframes accordionDown {
    from {
      height: 0;
      opacity: 0;
    }
    to {
      height: auto;
      opacity: 1;
    }
  }

  @keyframes accordionUp {
    from {
      height: auto;
      opacity: 1;
    }
    to {
      height: 0;
      opacity: 0;
    }
  }

  /* Attention Seekers */
  @keyframes bounce {
    0%, 100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: none;
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes ping {
    75%, 100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
  }

  @keyframes wobble {
    0% { transform: translateX(0%); }
    15% { transform: translateX(-25px) rotate(-5deg); }
    30% { transform: translateX(20px) rotate(3deg); }
    45% { transform: translateX(-15px) rotate(-3deg); }
    60% { transform: translateX(10px) rotate(2deg); }
    75% { transform: translateX(-5px) rotate(-1deg); }
    100% { transform: translateX(0%); }
  }

  @keyframes heartbeat {
    0% { transform: scale(1); }
    14% { transform: scale(1.3); }
    28% { transform: scale(1); }
    42% { transform: scale(1.3); }
    70% { transform: scale(1); }
  }

  @keyframes flash {
    0%, 50%, 100% { opacity: 1; }
    25%, 75% { opacity: 0; }
  }

  /* Advanced Effects */
  @keyframes zoomIn {
    0% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes zoomOut {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes flip {
    0% { transform: perspective(400px) rotate3d(0, 1, 0, 0deg); }
    50% { transform: perspective(400px) rotate3d(0, 1, 0, 180deg); }
    100% { transform: perspective(400px) rotate3d(0, 1, 0, 360deg); }
  }

  @keyframes rubberBand {
    0% { transform: scale3d(1, 1, 1); }
    30% { transform: scale3d(1.25, 0.75, 1); }
    40% { transform: scale3d(0.75, 1.25, 1); }
    50% { transform: scale3d(1.15, 0.85, 1); }
    65% { transform: scale3d(0.95, 1.05, 1); }
    75% { transform: scale3d(1.05, 0.95, 1); }
    100% { transform: scale3d(1, 1, 1); }
  }

  @keyframes jello {
    0%, 11.1%, 100% { transform: translate3d(0, 0, 0); }
    22.2% { transform: skewX(-12.5deg) skewY(-12.5deg); }
    33.3% { transform: skewX(6.25deg) skewY(6.25deg); }
    44.4% { transform: skewX(-3.125deg) skewY(-3.125deg); }
    55.5% { transform: skewX(1.5625deg) skewY(1.5625deg); }
    66.6% { transform: skewX(-0.78125deg) skewY(-0.78125deg); }
    77.7% { transform: skewX(0.390625deg) skewY(0.390625deg); }
    88.8% { transform: skewX(-0.1953125deg) skewY(-0.1953125deg); }
  }

  @keyframes tada {
    0% { transform: scale3d(1, 1, 1); }
    10%, 20% { transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); }
    30%, 50%, 70%, 90% { transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg); }
    40%, 60%, 80% { transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg); }
    100% { transform: scale3d(1, 1, 1); }
  }

  @keyframes swing {
    20% { transform: rotate3d(0, 0, 1, 15deg); }
    40% { transform: rotate3d(0, 0, 1, -10deg); }
    60% { transform: rotate3d(0, 0, 1, 5deg); }
    80% { transform: rotate3d(0, 0, 1, -5deg); }
    100% { transform: rotate3d(0, 0, 1, 0deg); }
  }

  /* Text Effects */
  @keyframes typewriter {
    0% {
      width: 0;
      border-right: 2px solid transparent;
    }
    1% {
      border-right: 2px solid currentColor;
    }
    99% {
      width: 100%;
      border-right: 2px solid currentColor;
    }
    100% {
      width: 100%;
      border-right: 2px solid transparent;
    }
  }

  @keyframes typewriterWithCursor {
    0% {
      width: 0;
      border-right: 2px solid currentColor;
    }
    98% {
      width: 100%;
      border-right: 2px solid currentColor;
    }
    99% {
      width: 100%;
      border-right: 2px solid currentColor;
    }
    100% {
      width: 100%;
      border-right: 2px solid transparent;
    }
  }

  @keyframes typewriterCursorOnly {
    0% {
      width: 100%;
      border-right: 2px solid transparent;
    }
    1% {
      width: 100%;
      border-right: 2px solid currentColor;
    }
    50% {
      width: 100%;
      border-right: 2px solid currentColor;
    }
    51% {
      width: 100%;
      border-right: 2px solid transparent;
    }
    100% {
      width: 100%;
      border-right: 2px solid transparent;
    }
  }

  @keyframes textFocus {
    0% {
      filter: blur(12px);
      opacity: 0;
    }
    100% {
      filter: blur(0px);
      opacity: 1;
    }
  }

  @keyframes neonGlow {
    0% {
      text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6;
    }
    100% {
      text-shadow: 0 0 2px #fff, 0 0 5px #fff, 0 0 8px #0073e6, 0 0 12px #0073e6, 0 0 16px #0073e6;
    }
  }

  /* Utility Animations */
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes caretBlink {
    0%, 70%, 100% { opacity: 1; }
    20%, 50% { opacity: 0; }
  }

  @keyframes matrix {
    0% {
      background-position: 0 0;
      color: #00ff00;
    }
    25% {
      background-position: 100% 0;
      color: #00aa00;
    }
    50% {
      background-position: 100% 100%;
      color: #00ff00;
    }
    75% {
      background-position: 0 100%;
      color: #00aa00;
    }
    100% {
      background-position: 0 0;
      color: #00ff00;
    }
  }

  @keyframes glitch {
    0% {
      transform: translate(0);
      filter: hue-rotate(0deg);
    }
    20% {
      transform: translate(-5px, 5px);
      filter: hue-rotate(90deg);
    }
    40% {
      transform: translate(-5px, -5px);
      filter: hue-rotate(180deg);
    }
    60% {
      transform: translate(5px, 5px);
      filter: hue-rotate(270deg);
    }
    80% {
      transform: translate(5px, -5px);
      filter: hue-rotate(360deg);
    }
    100% {
      transform: translate(0);
      filter: hue-rotate(0deg);
    }
  }
}

@layer utilities {
  /* Line clamp utilities for text truncation */
  .line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
  }

  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .line-clamp-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }

  /* Typewriter effect utilities */
  .typewriter {
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid transparent;
    width: 0;
  }

  .typewriter-cursor {
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid currentColor;
    width: 0;
  }

  .typewriter-mono {
    font-family: 'Courier New', Courier, monospace;
  }

  /* Animated typewriter utilities */
  .animate-typewriter {
    animation: var(--animate-typewriter);
  }

  .animate-typewriter-fast {
    animation: var(--animate-typewriter-fast);
  }

  .animate-typewriter-slow {
    animation: var(--animate-typewriter-slow);
  }

  .animate-typewriter-cursor {
    animation: var(--animate-typewriter-cursor);
  }

  .animate-typewriter-cursor-fast {
    animation: var(--animate-typewriter-cursor-fast);
  }

  .animate-typewriter-cursor-slow {
    animation: var(--animate-typewriter-cursor-slow);
  }

  .animate-typewriter-cursor-only {
    animation: var(--animate-typewriter-cursor-only);
  }
}
`;
        // Check if styles.scss exists, otherwise use styles.css
        const stylesScssPath = './src/styles.scss';
        const stylesCssPath = './src/styles.css';
        const stylesPath = await fs_extra_1.default.pathExists(stylesScssPath) ? stylesScssPath : stylesCssPath;
        const existingStyles = await fs_extra_1.default.pathExists(stylesPath);
        if (existingStyles) {
            const existingContent = await fs_extra_1.default.readFile(stylesPath, 'utf8');
            // Check if it's already Angular SuperUI styles
            const isAngularSuperUIStyles = existingContent.includes('@import "tailwindcss";') &&
                existingContent.includes('--background: hsl(0 0% 100%);');
            if (!isAngularSuperUIStyles && existingContent.trim().length > 0) {
                spinner.stop();
                console.log('');
                console.log(chalk_1.default.hex('#FF6B6B')('╔═══════════════════════════════════════════════════════════════════╗'));
                console.log(chalk_1.default.hex('#FF6B6B')('║') + chalk_1.default.hex('#FFE66D')(padding('⚠️  STYLES.CSS REPLACEMENT WARNING ⚠️', 67)) + chalk_1.default.hex('#FF6B6B')('║'));
                console.log(chalk_1.default.hex('#FF6B6B')('║') + chalk_1.default.hex('#A8E6CF')(padding('', 67)) + chalk_1.default.hex('#FF6B6B')('║'));
                console.log(chalk_1.default.hex('#FF6B6B')('║') + chalk_1.default.hex('#C7CEEA')(padding(`Found existing styles in: ${stylesPath}`, 67)) + chalk_1.default.hex('#FF6B6B')('║'));
                console.log(chalk_1.default.hex('#FF6B6B')('║') + chalk_1.default.hex('#FF8B94')(padding('Angular SuperUI will REPLACE your current styles', 67)) + chalk_1.default.hex('#FF6B6B')('║'));
                console.log(chalk_1.default.hex('#FF6B6B')('║') + chalk_1.default.hex('#FF8B94')(padding('with TailwindCSS v4 and theme variables', 67)) + chalk_1.default.hex('#FF6B6B')('║'));
                console.log(chalk_1.default.hex('#FF6B6B')('║') + chalk_1.default.hex('#A8E6CF')(padding('', 67)) + chalk_1.default.hex('#FF6B6B')('║'));
                console.log(chalk_1.default.hex('#FF6B6B')('║') + chalk_1.default.bold.hex('#FFE66D')(padding('⚡ BACKUP YOUR STYLES FIRST! ⚡', 67)) + chalk_1.default.hex('#FF6B6B')('║'));
                console.log(chalk_1.default.hex('#FF6B6B')('╚═══════════════════════════════════════════════════════════════════╝'));
                console.log('');
                const { replaceStyles } = await inquirer_1.default.prompt([
                    {
                        type: 'confirm',
                        name: 'replaceStyles',
                        message: 'Do you want to replace your current styles.css with Angular SuperUI styles? (Type Y/YES to confirm)',
                        default: false
                    }
                ]);
                if (!replaceStyles) {
                    console.log(chalk_1.default.yellow('⚠️  Initialization cancelled. Your styles.css was not modified.'));
                    console.log(chalk_1.default.gray('💡 To complete setup later, backup your styles and run: ngsui-cli init'));
                    return;
                }
                spinner.start('Replacing styles.css with Angular SuperUI configuration...');
            }
        }
        await fs_extra_1.default.writeFile(stylesPath, globalStyles);
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
        console.log(chalk_1.default.hex('#FF6B6B')('│                                                                    │'));
        console.log(chalk_1.default.hex('#FF6B6B')('│  ') + chalk_1.default.hex('#FFE66D')('📦 Components:') + chalk_1.default.hex('#FF6B6B')('                                               │'));
        console.log(chalk_1.default.hex('#FF6B6B')('│  ') + chalk_1.default.hex('#FFE66D')('1. Add your first component: ') + chalk_1.default.bold.hex('#A8E6CF')('ngsui-cli add badge') + chalk_1.default.hex('#FF6B6B')('        │'));
        console.log(chalk_1.default.hex('#FF6B6B')('│  ') + chalk_1.default.hex('#FFE66D')('2. Add multiple components: ') + chalk_1.default.bold.hex('#A8E6CF')('ngsui-cli add accordion alert') + chalk_1.default.hex('#FF6B6B')('  │'));
        console.log(chalk_1.default.hex('#FF6B6B')('│  ') + chalk_1.default.hex('#FFE66D')('3. Browse all components:  ') + chalk_1.default.bold.hex('#A8E6CF')('ngsui-cli list') + chalk_1.default.hex('#FF6B6B')('                  │'));
        console.log(chalk_1.default.hex('#FF6B6B')('│                                                                    │'));
        console.log(chalk_1.default.hex('#FF6B6B')('│  ') + chalk_1.default.hex('#FFE66D')('🎨 UI Blocks:') + chalk_1.default.hex('#FF6B6B')('                                                  │'));
        console.log(chalk_1.default.hex('#FF6B6B')('│  ') + chalk_1.default.hex('#FFE66D')('1. Add hero section:        ') + chalk_1.default.bold.hex('#A8E6CF')('ngsui-cli add block hero-section') + chalk_1.default.hex('#FF6B6B')(' │'));
        console.log(chalk_1.default.hex('#FF6B6B')('│  ') + chalk_1.default.hex('#FFE66D')('2. Add pricing cards:       ') + chalk_1.default.bold.hex('#A8E6CF')('ngsui-cli add block pricing-cards') + chalk_1.default.hex('#FF6B6B')('│'));
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
async function installPipes(pipesDirectory) {
    try {
        const pipesToInstall = ['icon.pipe.ts', 'safe-html.pipe.ts', 'index.ts'];
        const baseUrl = 'https://raw.githubusercontent.com/bhaimicrosoft/angular-superui/main/projects/lib/src/lib/pipes';
        const axios = require('axios');
        for (const pipe of pipesToInstall) {
            try {
                const response = await axios.get(`${baseUrl}/${pipe}`);
                let fileContent = response.data;
                await fs_extra_1.default.writeFile(path_1.default.join(pipesDirectory, pipe), fileContent);
            }
            catch (error) {
                console.warn(chalk_1.default.yellow(`Warning: Could not download ${pipe}`));
            }
        }
    }
    catch (error) {
        console.warn(chalk_1.default.yellow('Warning: Could not install pipes'));
    }
}
//# sourceMappingURL=init.js.map