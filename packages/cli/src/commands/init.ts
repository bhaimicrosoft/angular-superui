import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { execSync } from 'child_process';

export async function initCommand() {
  const spinner = ora('Initializing Angular SuperUI...').start();
  
  try {
    // Check if this is an Angular project
    const angularJsonExists = await fs.pathExists('./angular.json');
    const packageJsonExists = await fs.pathExists('./package.json');
    
    if (!angularJsonExists || !packageJsonExists) {
      spinner.fail('This does not appear to be an Angular project.');
      console.log(chalk.yellow('Please run this command in the root of an Angular project.'));
      return;
    }

    // Check if Angular SuperUI is already installed
    const packageJson = await fs.readJson('./package.json');
    const hasAngularSuperUI = packageJson.dependencies?.['angular-superui'] || 
                              packageJson.devDependencies?.['angular-superui'];

    let shouldInstallPackage = true;
    
    if (hasAngularSuperUI) {
      spinner.stop();
      const { reinstall } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'reinstall',
          message: 'Angular SuperUI is already installed. Do you want to reinstall?',
          default: false
        }
      ]);
      spinner.start('Initializing Angular SuperUI...');
      shouldInstallPackage = reinstall;
    }

    if (shouldInstallPackage) {
      spinner.text = 'Installing Angular SuperUI package...';
      
      try {
        // Install Angular SuperUI
        execSync('npm install angular-superui --legacy-peer-deps', { stdio: 'inherit' });
        
        // Install TailwindCSS 3.x with legacy peer deps
        spinner.text = 'Installing TailwindCSS 3.x...';
        execSync('npm install tailwindcss@3 --legacy-peer-deps', { stdio: 'inherit' });
        
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
    const utilsDir = './src/lib/utils';
    await fs.ensureDir(utilsDir);

    // Create cn utility function
    const cnUtilContent = `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

    await fs.writeFile(path.join(utilsDir, 'cn.ts'), cnUtilContent);

    // Create components directory
    const componentsDir = './src/lib/components';
    await fs.ensureDir(componentsDir);

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

    // Update tsconfig.json with path aliases
    try {
      const tsconfigPath = './tsconfig.json';
      if (await fs.pathExists(tsconfigPath)) {
        const tsconfig = await fs.readJson(tsconfigPath);
        
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
        spinner.text = 'Updated tsconfig.json with path aliases...';
      }
    } catch (error) {
      console.warn(chalk.yellow('Warning: Could not update tsconfig.json'));
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

    spinner.succeed('Angular SuperUI initialized successfully!');
    
    console.log(chalk.green('✅ Setup complete!'));
    console.log(chalk.cyan('Next steps:'));
    console.log(chalk.white('1. Run: npm install --legacy-peer-deps'));
    console.log(chalk.white('2. Add components: angular-superui add button'));
    console.log(chalk.white('3. List available components: angular-superui list'));
    console.log(chalk.white('4. Tailwind config and styles have been updated!'));
    
  } catch (error) {
    spinner.fail('Failed to initialize Angular SuperUI');
    console.error(chalk.red(error));
  }
}
