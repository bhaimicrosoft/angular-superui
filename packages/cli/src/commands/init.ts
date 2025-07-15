import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';

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
      const { reinstall } = await inquirer.prompt([
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
        'angular-superui': '^0.3.0',
        'class-variance-authority': '^0.7.0',
        'clsx': '^2.0.0',
        'tailwind-merge': '^1.14.0'
      }
    };

    await fs.writeJson('./package.json', updatedPackageJson, { spaces: 2 });

    spinner.succeed('Angular SuperUI initialized successfully!');
    
    console.log(chalk.green('\\n✅ Setup complete!'));
    console.log(chalk.cyan('\\nNext steps:'));
    console.log(chalk.white('1. Run: npm install'));
    console.log(chalk.white('2. Add components: angular-superui add button'));
    console.log(chalk.white('3. List available components: angular-superui list'));
    
  } catch (error) {
    spinner.fail('Failed to initialize Angular SuperUI');
    console.error(chalk.red(error));
  }
}
