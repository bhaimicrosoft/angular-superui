#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const init_1 = require("./commands/init");
const add_1 = require("./commands/add");
const list_1 = require("./commands/list");
const chalk_1 = __importDefault(require("chalk"));
// Get version from package.json
const packageJson = require('../package.json');
const CLI_VERSION = packageJson.version;
const program = new commander_1.Command();
program
    .name('ngsui')
    .description('🎨 Angular SuperUI CLI - Local-First Component Library')
    .version(CLI_VERSION);
// Beautiful ASCII Art Banner
console.log(chalk_1.default.cyan(`
┌─────────────────────────────────────────────────────────────┐
│`) + chalk_1.default.bold.magenta(`              🎨 Angular SuperUI CLI              `) + chalk_1.default.cyan(`│
│`) + chalk_1.default.gray(`              Local-First Components              `) + chalk_1.default.cyan(`│
│`) + chalk_1.default.yellow(`                     v${CLI_VERSION}                      `) + chalk_1.default.cyan(`│
└─────────────────────────────────────────────────────────────┘
`));
// Commands
program
    .command('init')
    .description('Initialize Angular SuperUI in your project')
    .action(init_1.initCommand);
program
    .command('add [items...]')
    .description('Add components or blocks to your project')
    .option('-f, --force', 'Overwrite existing files without prompting')
    .option('--all', 'Install all available components')
    .option('--all-blocks', 'Install all available blocks')
    .action((items, options) => {
    if (options.all) {
        (0, add_1.addCommand)([], { ...options, all: true });
    }
    else if (options.allBlocks) {
        (0, add_1.addBlockCommand)([], { ...options, all: true });
    }
    else if (items && items.length > 0) {
        // Check if first item is 'block'
        if (items[0] === 'block') {
            const blockNames = items.slice(1);
            if (blockNames.length > 0) {
                (0, add_1.addBlockCommand)(blockNames, options);
            }
            else {
                console.log(chalk_1.default.red('❌ Please specify block name(s)'));
                console.log(chalk_1.default.cyan('Examples:'));
                console.log(chalk_1.default.white('  ngsui add block hero-section'));
                console.log(chalk_1.default.white('  ngsui add block header footer pricing-cards'));
                console.log(chalk_1.default.white('  ngsui add --all-blocks'));
                console.log(chalk_1.default.gray('\nAvailable blocks: header, footer, hero-section, pricing-cards, feature-grid'));
            }
        }
        else {
            // Regular component installation
            (0, add_1.addCommand)(items, options);
        }
    }
    else {
        console.log(chalk_1.default.red('❌ Please specify component/block name(s) or use --all flag'));
        console.log(chalk_1.default.cyan('Examples:'));
        console.log(chalk_1.default.white('  ngsui add button'));
        console.log(chalk_1.default.white('  ngsui add button alert card'));
        console.log(chalk_1.default.white('  ngsui add --all'));
        console.log(chalk_1.default.white('  ngsui add block hero-section'));
        console.log(chalk_1.default.white('  ngsui add block header footer'));
        console.log(chalk_1.default.white('  ngsui add --all-blocks'));
        console.log(chalk_1.default.gray('\nUse "ngsui list" to see available components and blocks'));
    }
});
program
    .command('list')
    .description('List all available components and blocks')
    .action(list_1.listCommand);
program.parse();
//# sourceMappingURL=cli.js.map