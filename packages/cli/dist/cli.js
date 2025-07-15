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
const program = new commander_1.Command();
program
    .name('angular-superui')
    .description('CLI tool for Angular SuperUI components')
    .version('0.4.4');
// ASCII Art Banner
console.log(chalk_1.default.cyan(`
╔═══════════════════════════════════════╗
║       Angular SuperUI CLI v0.4.4     ║
║    Selective Component Installation   ║
╚═══════════════════════════════════════╝
`));
// Commands
program
    .command('init')
    .description('Initialize Angular SuperUI in your project')
    .action(init_1.initCommand);
program
    .command('add [components...]')
    .description('Add one or more components to your project')
    .option('-f, --force', 'Overwrite existing files without prompting')
    .option('--all', 'Install all available components')
    .action((components, options) => {
    if (options.all) {
        (0, add_1.addCommand)([], { ...options, all: true });
    }
    else if (components && components.length > 0) {
        (0, add_1.addCommand)(components, options);
    }
    else {
        console.log(chalk_1.default.red('❌ Please specify component name(s) or use --all flag'));
        console.log(chalk_1.default.cyan('Examples:'));
        console.log(chalk_1.default.white('  angular-superui add button'));
        console.log(chalk_1.default.white('  angular-superui add button alert card'));
        console.log(chalk_1.default.white('  angular-superui add --all'));
        console.log(chalk_1.default.gray('\nUse "angular-superui list" to see available components'));
    }
});
program
    .command('list')
    .description('List all available components')
    .action(list_1.listCommand);
program.parse();
//# sourceMappingURL=cli.js.map