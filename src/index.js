import { main } from './main.js';
import clear from 'clear';
import chalk from 'chalk';
import inquirer from 'inquirer';
export const runner = async () => {
  clear();
  //   console.log(chalk.underline(`ＩｎｓｔａＦｖｃｋ`));
  console.log(
    chalk.red(`
██ ███    ██ ███████ ████████  █████  ███████ ██    ██  ██████ ██   ██            ██ ███████ 
██ ████   ██ ██         ██    ██   ██ ██      ██    ██ ██      ██  ██             ██ ██      
██ ██ ██  ██ ███████    ██    ███████ █████   ██    ██ ██      █████   █████      ██ ███████ 
██ ██  ██ ██      ██    ██    ██   ██ ██       ██  ██  ██      ██  ██        ██   ██      ██ 
██ ██   ████ ███████    ██    ██   ██ ██        ████    ██████ ██   ██        █████  ███████ 
    `)
  );
  console.log(`
  1. Save url Post to Json By UserName
  2  Getting All post and obtain media link by username
  3. Download all post by username (u must run task 2 first)
`);
  const input = await inquirer.prompt([
    {
      type: 'input',
      name: 'taskNum',
      message: 'What do you want',
    },
  ]);
  main(input.taskNum);
};
