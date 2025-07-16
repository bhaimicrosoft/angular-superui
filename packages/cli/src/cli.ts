#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';
import { listCommand } from './commands/list';
import chalk from 'chalk';

// Get version from package.json
const packageJson = require('../package.json');
const CLI_VERSION = packageJson.version;

const program = new Command();

program
  .name('ngsui-cli')
  .description('🎨 Angular SuperUI CLI - Local-First Component Library')
  .version(CLI_VERSION);

// Beautiful ASCII Art Banner
console.log(chalk.cyan(`
┌─────────────────────────────────────────────────────────────┐
│`) + chalk.bold.magenta(`              🎨 Angular SuperUI CLI              `) + chalk.cyan(`│
│`) + chalk.gray(`              Local-First Components              `) + chalk.cyan(`│
│`) + chalk.yellow(`                     v${CLI_VERSION}                      `) + chalk.cyan(`│
└─────────────────────────────────────────────────────────────┘
`));

// Commands
program
  .command('init')
  .description('Initialize Angular SuperUI in your project')
  .action(initCommand);

program
  .command('add [components...]')
  .description('Add one or more components to your project')
  .option('-f, --force', 'Overwrite existing files without prompting')
  .option('--all', 'Install all available components')
  .action((components, options) => {
    if (options.all) {
      addCommand([], { ...options, all: true });
    } else if (components && components.length > 0) {
      addCommand(components, options);
    } else {
      console.log(chalk.red('❌ Please specify component name(s) or use --all flag'));
      console.log(chalk.cyan('Examples:'));
      console.log(chalk.white('  angular-superui add button'));
      console.log(chalk.white('  angular-superui add button alert card'));
      console.log(chalk.white('  angular-superui add --all'));
      console.log(chalk.gray('\nUse "angular-superui list" to see available components'));
    }
  });

program
  .command('list')
  .description('List all available components')
  .action(listCommand);

program.parse();
