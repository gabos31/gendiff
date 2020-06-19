#!/usr/bin/env node
import commander from 'commander';
import gendiff from '..';

commander
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format', 'text')
  .action((firstConfig, secondConfig) => console.log(
    gendiff(firstConfig, secondConfig, commander.format),
  ))
  .parse(process.argv);
