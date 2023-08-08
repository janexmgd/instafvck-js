import inquirer from 'inquirer';
import chalk from 'chalk';
import clear from 'clear';
import { main } from './src/main.js';

(async () => {
  clear();
  console.log(chalk.underline(`ＩｎｓｔａＦｖｃｋ`));
  console.log(`
  1.Save url Post to Json By UserName
`);
  const input = await inquirer.prompt([
    {
      type: 'input',
      name: 'taskNum',
      message: 'What do you want',
    },
  ]);
  main(input.taskNum);
})();
