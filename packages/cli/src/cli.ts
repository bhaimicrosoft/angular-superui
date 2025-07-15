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
  .version('0.3.0');

// ASCII Art Banner
console.log(chalk.cyan(`
╔═══════════════════════════════════════╗
║       Angular SuperUI CLI v0.3.0     ║
║    Selective Component Installation   ║
╚═══════════════════════════════════════╝
`));

// Commands
program
  .command('init')
  .description('Initialize Angular SuperUI in your project')
  .action(initCommand);

program
  .command('add <component>')
  .description('Add a specific component to your project')
  .option('-f, --force', 'Overwrite existing files')
  .action(addCommand);

program
  .command('list')
  .description('List all available components')
  .action(listCommand);

program.parse();
