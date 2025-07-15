#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';
import { listCommand } from './commands/list';
import chalk from 'chalk';

const program = new Command();

program
  .name('angular-superui')
  .description('CLI tool for Angular SuperUI components')
  .version('0.4.4');

// ASCII Art Banner
console.log(chalk.cyan(`
╔═══════════════════════════════════════╗
║       Angular SuperUI CLI v0.4.4     ║
║    Selective Component Installation   ║
╚═══════════════════════════════════════╝
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
