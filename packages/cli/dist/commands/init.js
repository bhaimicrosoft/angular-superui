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
            spinner.stop();
            console.log(''); // Add blank line for better formatting
            const { reinstall } = await inquirer_1.default.prompt([
                {
                    type: 'confirm',
                    name: 'reinstall',
                    message: 'Angular SuperUI is already installed. Do you want to reinstall?',
                    default: false
                }
            ]);
            if (reinstall) {
                spinner.start('Reinstalling Angular SuperUI...');
            }
            else {
                spinner.start('Updating configuration...');
            }
            shouldInstallPackage = reinstall;
        }
        if (shouldInstallPackage) {
            spinner.text = 'Installing Angular SuperUI package...';
            try {
                // Install Angular SuperUI
                (0, child_process_1.execSync)('npm install angular-superui --legacy-peer-deps', { stdio: 'inherit' });
                // Install TailwindCSS 3.x with legacy peer deps
                spinner.text = 'Installing TailwindCSS 3.x...';
                (0, child_process_1.execSync)('npm install tailwindcss@3 --legacy-peer-deps', { stdio: 'inherit' });
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
                'angular-superui': '^0.4.2',
                'class-variance-authority': '^0.7.0',
                'clsx': '^2.0.0',
                'tailwind-merge': '^1.14.0'
            },
            devDependencies: {
                ...packageJson.devDependencies,
                'tailwindcss': '^3.4.0'
            }
        };
        await fs_extra_1.default.writeJson('./package.json', updatedPackageJson, { spaces: 2 });
        // Create or update tailwind.config.ts
        const tailwindConfig = `import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{html,ts}",
    "./projects/**/*.{html,ts}",
    "./node_modules/angular-superui/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
`;
        await fs_extra_1.default.writeFile('./tailwind.config.ts', tailwindConfig);
        // Update tsconfig.json with path aliases
        try {
            const tsconfigPath = './tsconfig.json';
            if (await fs_extra_1.default.pathExists(tsconfigPath)) {
                const tsconfig = await fs_extra_1.default.readJson(tsconfigPath);
                // Ensure compilerOptions exists
                if (!tsconfig.compilerOptions) {
                    tsconfig.compilerOptions = {};
                }
                // Add baseUrl and paths
                tsconfig.compilerOptions.baseUrl = "./src";
                tsconfig.compilerOptions.paths = {
                    "@utils/*": ["lib/utils/*"],
                    "@components/*": ["lib/components/*"],
                    ...(tsconfig.compilerOptions.paths || {})
                };
                await fs_extra_1.default.writeJson(tsconfigPath, tsconfig, { spaces: 2 });
                spinner.text = 'Updated tsconfig.json with path aliases...';
            }
        }
        catch (error) {
            console.log('');
            console.log(chalk_1.default.bgYellow.black(' WARNING ') + ' ' + chalk_1.default.yellow('Could not update tsconfig.json'));
            console.log('');
        }
        // Create or update styles.scss/styles.css
        const globalStyles = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
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
        spinner.succeed('Angular SuperUI initialized successfully!');
        console.log(chalk_1.default.green('✅ Setup complete!'));
        console.log(chalk_1.default.cyan('Next steps:'));
        console.log(chalk_1.default.white('1. Run: npm install --legacy-peer-deps'));
        console.log(chalk_1.default.white('2. Add components: angular-superui add button'));
        console.log(chalk_1.default.white('3. List available components: angular-superui list'));
        console.log(chalk_1.default.white('4. Tailwind config and styles have been updated!'));
    }
    catch (error) {
        spinner.fail('Failed to initialize Angular SuperUI');
        console.error(chalk_1.default.red(error));
    }
}
//# sourceMappingURL=init.js.map