import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { execSync } from 'child_process';

// Get version from package.json
const packageJson = require('../../package.json');
const CLI_VERSION = packageJson.version;

export async function initCommand() {
  // Display attractive banner
  console.log('');
  console.log(chalk.cyan('┌─────────────────────────────────────────────────────────────┐'));
  console.log(chalk.cyan('│') + chalk.bold.magenta('              🎨 Angular SuperUI CLI              ') + chalk.cyan('│'));
  console.log(chalk.cyan('│') + chalk.gray('              Local-First Component Library              ') + chalk.cyan('│'));
  console.log(chalk.cyan('│') + chalk.yellow(`                     v${CLI_VERSION}                      `) + chalk.cyan('│'));
  console.log(chalk.cyan('└─────────────────────────────────────────────────────────────┘'));
  console.log('');

  const spinner = ora(chalk.cyan('🚀 Initializing Angular SuperUI...')).start();
  
  try {
    // Check if this is an Angular project
    const angularJsonExists = await fs.pathExists('./angular.json');
    const packageJsonExists = await fs.pathExists('./package.json');
    
    if (!angularJsonExists || !packageJsonExists) {
      spinner.fail(chalk.red('❌ This does not appear to be an Angular project.'));
      console.log(chalk.yellow('💡 Please run this command in the root of an Angular project.'));
      return;
    }

    // Check if Angular SuperUI is already initialized
    const componentsDirPath = './src/lib/components';
    const utilsDirPath = './src/lib/utils';
    const hasAngularSuperUI = await fs.pathExists(componentsDirPath) && await fs.pathExists(path.join(utilsDirPath, 'cn.ts'));

    let shouldInstallPackage = true;
    
    if (hasAngularSuperUI) {
      spinner.stop();
      console.log(''); // Add blank line for better formatting
      const { reinstall } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'reinstall',
          message: 'Angular SuperUI is already initialized. Do you want to reinitialize?',
          default: false
        }
      ]);
      
      if (reinstall) {
        spinner.start('Reinitializing Angular SuperUI...');
      } else {
        spinner.start('Updating configuration...');
      }
      shouldInstallPackage = reinstall;
    }

    if (shouldInstallPackage) {
      try {
        // Install TailwindCSS 3.x with PostCSS dependencies
        spinner.text = 'Installing TailwindCSS 3.x and PostCSS...';
        execSync('npm install --save-dev tailwindcss@3 postcss autoprefixer --legacy-peer-deps', { stdio: 'inherit' });
        
        // Install required dependencies
        spinner.text = 'Installing required dependencies...';
        execSync('npm install class-variance-authority clsx tailwind-merge --legacy-peer-deps', { stdio: 'inherit' });
      } catch (error) {
        spinner.fail('Failed to install packages');
        console.error(chalk.red(error));
        return;
      }
    }

    // Create utils directory if it doesn't exist
    const utilsDirectory = './src/lib/utils';
    await fs.ensureDir(utilsDirectory);

    // Create cn utility function
    const cnUtilContent = `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

    await fs.writeFile(path.join(utilsDirectory, 'cn.ts'), cnUtilContent);

    // Create components directory
    const componentsDirectory = './src/lib/components';
    await fs.ensureDir(componentsDirectory);

    // Read package.json to update dependencies
    const packageJson = await fs.readJson('./package.json');

    // Update package.json with required dependencies
    const updatedPackageJson = {
      ...packageJson,
      dependencies: {
        ...packageJson.dependencies,
        'class-variance-authority': '^0.7.0',
        'clsx': '^2.0.0',
        'tailwind-merge': '^1.14.0'
      },
      devDependencies: {
        ...packageJson.devDependencies,
        'tailwindcss': '^3.4.0',
        'postcss': '^8.4.0',
        'autoprefixer': '^10.4.0'
      }
    };

    await fs.writeJson('./package.json', updatedPackageJson, { spaces: 2 });

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

    await fs.writeFile('./tailwind.config.ts', tailwindConfig);

    // Create postcss.config.js for TailwindCSS 3.x
    const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;

    await fs.writeFile('./postcss.config.js', postcssConfig);

    // Update tsconfig.json with path aliases
    try {
      const tsconfigPath = './tsconfig.json';
      if (await fs.pathExists(tsconfigPath)) {
        spinner.text = 'Updating tsconfig.json with path aliases...';
        
        // Read as text and strip comments/trailing commas for JSON parsing
        let tsconfigContent = await fs.readFile(tsconfigPath, 'utf8');
        
        // Remove single line comments
        tsconfigContent = tsconfigContent.replace(/\/\/.*$/gm, '');
        
        // Remove multi-line comments
        tsconfigContent = tsconfigContent.replace(/\/\*[\s\S]*?\*\//g, '');
        
        // Remove trailing commas
        tsconfigContent = tsconfigContent.replace(/,(\s*[}\]])/g, '$1');
        
        const tsconfig = JSON.parse(tsconfigContent);
        
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
        
        await fs.writeJson(tsconfigPath, tsconfig, { spaces: 2 });
        spinner.text = 'Successfully updated tsconfig.json with path aliases!';
        
        // Small delay to show success message
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        spinner.text = 'No tsconfig.json found, skipping path aliases...';
      }
    } catch (error) {
      console.log('');
      console.log(chalk.bgYellow.black(' WARNING ') + ' ' + chalk.yellow(`Could not update tsconfig.json: ${error instanceof Error ? error.message : String(error)}`));
      console.log(chalk.gray('You may need to manually add path aliases to your tsconfig.json'));
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
    
    if (await fs.pathExists(stylesScssPath)) {
      await fs.writeFile(stylesScssPath, globalStyles);
    } else {
      await fs.writeFile(stylesCssPath, globalStyles);
    }

    spinner.succeed(chalk.green('🎉 Angular SuperUI initialized successfully!'));
    
    console.log('');
    console.log(chalk.cyan('┌─────────────────────────────────────────────────────────────┐'));
    console.log(chalk.cyan('│') + chalk.bold.green('                    ✅ SETUP COMPLETE!                   ') + chalk.cyan('│'));
    console.log(chalk.cyan('└─────────────────────────────────────────────────────────────┘'));
    console.log('');
    console.log(chalk.bgBlue.white(' 🚀 NEXT STEPS '));
    console.log('');
    console.log(chalk.cyan('1.') + chalk.white(' Add your first component: ') + chalk.yellow('ngsui-cli add button'));
    console.log(chalk.cyan('2.') + chalk.white(' Add another component: ') + chalk.yellow('ngsui-cli add card'));
    console.log(chalk.cyan('3.') + chalk.white(' Browse all components: ') + chalk.yellow('ngsui-cli list'));
    console.log('');
    console.log(chalk.green('🎨 Features configured:'));
    console.log(chalk.white('   • ') + chalk.gray('Local component structure in ./src/lib/components/'));
    console.log(chalk.white('   • ') + chalk.gray('TypeScript path aliases (@components/*, @utils/*)'));
    console.log(chalk.white('   • ') + chalk.gray('Tailwind CSS v3.x with PostCSS configuration'));
    console.log(chalk.white('   • ') + chalk.gray('Complete TailwindCSS + PostCSS + Autoprefixer setup'));
    console.log(chalk.white('   • ') + chalk.gray('Angular SuperUI theme variables and styles'));
    console.log(chalk.white('   • ') + chalk.gray('Zero external NPM dependencies'));
    console.log('');
    console.log(chalk.magenta('💜 Happy coding with Angular SuperUI!'));
    console.log('');
    
  } catch (error) {
    spinner.fail('Failed to initialize Angular SuperUI');
    console.error(chalk.red(error));
  }
}
