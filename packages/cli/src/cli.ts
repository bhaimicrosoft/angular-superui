#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init';
import { addCommand, addBlockCommand } from './commands/add';
import { listCommand } from './commands/list';
import chalk from 'chalk';

// Get version from package.json
const packageJson = require('../package.json');
const CLI_VERSION = packageJson.version;

const program = new Command();

program
  .name('ngsui')
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
  .command('add [items...]')
  .description('Add components or blocks to your project')
  .option('-f, --force', 'Overwrite existing files without prompting')
  .option('--all', 'Install all available components')
  .option('--all-blocks', 'Install all available blocks')
  .action((items, options) => {
    if (options.all) {
      addCommand([], { ...options, all: true });
    } else if (options.allBlocks) {
      addBlockCommand([], { ...options, all: true });
    } else if (items && items.length > 0) {
      // Check if first item is 'block'
      if (items[0] === 'block') {
        const blockNames = items.slice(1);
        if (blockNames.length > 0) {
          addBlockCommand(blockNames, options);
        } else {
          console.log(chalk.red('❌ Please specify block name(s)'));
          console.log(chalk.cyan('Examples:'));
          console.log(chalk.white('  ngsui add block hero-section'));
          console.log(chalk.white('  ngsui add block header footer pricing-cards'));
          console.log(chalk.white('  ngsui add --all-blocks'));
          console.log(chalk.gray('\nAvailable blocks: header, footer, hero-section, pricing-cards, feature-grid'));
        }
      } else {
        // Regular component installation
        addCommand(items, options);
      }
    } else {
      console.log(chalk.red('❌ Please specify component/block name(s) or use --all flag'));
      console.log(chalk.cyan('Examples:'));
      console.log(chalk.white('  ngsui add button'));
      console.log(chalk.white('  ngsui add button alert card'));
      console.log(chalk.white('  ngsui add --all'));
      console.log(chalk.white('  ngsui add block hero-section'));
      console.log(chalk.white('  ngsui add block header footer'));
      console.log(chalk.white('  ngsui add --all-blocks'));
      console.log(chalk.gray('\nUse "ngsui list" to see available components and blocks'));
    }
  });

program
  .command('list')
  .description('List all available components and blocks')
  .action(listCommand);

program.parse();
