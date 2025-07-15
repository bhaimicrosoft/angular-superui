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
    .version('0.3.0');
// ASCII Art Banner
console.log(chalk_1.default.cyan(`
╔═══════════════════════════════════════╗
║       Angular SuperUI CLI v0.3.0     ║
║    Selective Component Installation   ║
╚═══════════════════════════════════════╝
`));
// Commands
program
    .command('init')
    .description('Initialize Angular SuperUI in your project')
    .action(init_1.initCommand);
program
    .command('add <component>')
    .description('Add a specific component to your project')
    .option('-f, --force', 'Overwrite existing files')
    .action(add_1.addCommand);
program
    .command('list')
    .description('List all available components')
    .action(list_1.listCommand);
program.parse();
//# sourceMappingURL=cli.js.map