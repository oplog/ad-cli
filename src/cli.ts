#!/usr/bin/env node
import program from "commander";
import path from "path";
import { Command } from "./command";
import {
    GenerateCommand,
    InitCommand,
    NewCommand,
} from "./commands";

const VERSION = "0.1.0";

const commands: Command[] = [
    new NewCommand(),
    new InitCommand(),
    new GenerateCommand(),
];

program.version(VERSION);

commands.map((command) => {
    program.command(command.name);
    program.description(command.description);
    program.alias(command.alias);
    command.options.map((option) => {
        program.option(option.short, option.long, option.description as any, option.defaultValue);
    });
    program.action(command.action);
});

program.parse(process.argv);
