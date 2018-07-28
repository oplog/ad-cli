#!/usr/bin/env node

import program from "commander";
import { Command } from "./command";
import {
    GenerateComponentCommand,
    InitCommand,
    NewCommand,
} from "./commands";

const VERSION = "0.1.0";

const commands: Command[] = [
  new NewCommand(),
  new InitCommand(),
  new GenerateComponentCommand("atom"),
  new GenerateComponentCommand("molecule"),
  new GenerateComponentCommand("organism"),
  new GenerateComponentCommand("template"),
  new GenerateComponentCommand("page"),
];

program.version(VERSION);

commands.map((cmd) => {
    let command = program
        .command(cmd.name)
        .alias(cmd.alias);
    cmd.options.map((option) => {
        command = command.option(option.flag, option.description as any, option.defaultValue);
    });
    command.action(cmd.action);
});

program.parse(process.argv);
