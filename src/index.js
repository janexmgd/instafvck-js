import { main } from './main.js';
import chalk from 'chalk';
import inquirer from 'inquirer';
import boxen from 'boxen';
export const runner = async () => {
  process.stdout.write('\x1Bc');
  console.log(boxen(chalk.italic('ＩｎｓｔａＦｖｃｋ'), { padding: 1 }));
  const choices = [
    { name: 'Get post and saved it to json', value: 1 },
    { name: 'Download all posts by Username (requires Task 1)', value: 2 },
  ];
  const { input } = await inquirer.prompt({
    type: 'list',
    message: 'select service',
    name: 'input',
    choices,
  });
  main(input);
};
