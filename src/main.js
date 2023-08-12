import chalk from 'chalk';
import { getUserPostLink } from './core/getUserPostLink.js';
import inquirer from 'inquirer';
import { getMediaLink } from './core/getMediaLinkdownload.js';
import { checkIsExist } from './tools/fileUtils.js';
import bulkDownloader from './tools/downloader.js';
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
  } else if (taskNum == 2) {
    const input = await inquirer.prompt([
      {
        type: 'input',
        name: 'username',
        message: 'insert instagram username without @',
      },
    ]);
    await getMediaLink(input.username);
  } else if(taskNum == 3){
    const input = await inquirer.prompt([
      {
        type: 'input',
        name: 'username',
        message: 'insert instagram username without @',
      },
    ]);
    const checkJsonList = checkIsExist(`${input.username}.json`,input.username)
   if (checkJsonList) {
    await bulkDownloader(input.username)
   } else {
    return console.log(`${chalk.red.italic('u must have json list run task 2 to obtain this')}`)
   }
  }
  else {
    console.log(chalk.red('invalid action'));
  }
};
