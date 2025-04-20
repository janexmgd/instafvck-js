import { main } from './main.js';
import chalk from 'chalk';
import inquirer from 'inquirer';
import boxen from 'boxen';
import 'dotenv/config';
export const runner = async () => {
  process.stdout.write('\x1Bc');
  if (!process.env.COOKIE) {
    console.log(chalk.red.italic('Please set the COOKIE environment variable'));
    return;
  }
  console.log(boxen(chalk.italic('ＩｎｓｔａＦｖｃｋ'), { padding: 1 }));
  const choices = [
    { name: 'Get post and saved it to json (need cookie)', value: 1 },
    { name: 'Download all posts by Username ', value: 2 },
    { name: 'Get reel feed and saved it to json ', value: 3 },
    { name: 'Download all reels by username ', value: 4 },
  ];
  const { input } = await inquirer.prompt({
    type: 'list',
    message: 'select service',
    name: 'input',
    choices,
  });
  main(input);
};
