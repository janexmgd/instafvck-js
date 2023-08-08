import chalk from 'chalk';
import { getUserPostLink } from './core/getUserPostLink.js';
import inquirer from 'inquirer';
export const main = async (taskNum) => {
  if (taskNum == 1) {
    const input = await inquirer.prompt([
      {
        type: 'input',
        name: 'username',
        message: 'insert instagram username without @',
      },
    ]);
    await getUserPostLink(input.username);
  } else {
    console.log(chalk.red('invalid action'));
  }
};
