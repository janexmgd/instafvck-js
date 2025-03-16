import chalk from 'chalk';
import inquirer from 'inquirer';
import { getUserPostLink } from './core/getUserPostLink.js';
import { checkIsExist } from './tools/fileUtils.js';
import bulkDownloader from './core/bulkDownload.js';
const firstInput = async () => {
  const { usernameInput } = await inquirer.prompt({
    type: 'input',
    name: 'usernameInput',
    message: 'Insert username without @ or url of instagram profile',
  });
  let username;
  if (usernameInput.startsWith('https://www.instagram.com/')) {
    const url = usernameInput;
    const parts = url.split('/');
    username = parts[parts.length - 2];
  } else {
    username = usernameInput;
  }
  return username;
};
export const main = async (taskNum) => {
  if (taskNum == 1) {
    const username = await firstInput();
    await getUserPostLink(username);
  } else if (taskNum == 2) {
    const username = await firstInput();
    const checkJsonList = checkIsExist(`${username}.json`, username);
    if (checkJsonList) {
      await bulkDownloader(username);
    } else {
      return console.log(
        `${chalk.red.italic('u must have json list run task 1 to obtain this')}`
      );
    }
  } else {
    console.log(chalk.red('invalid action'));
  }
};
