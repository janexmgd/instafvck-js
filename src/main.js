import chalk from 'chalk';
import inquirer from 'inquirer';
import { getUserPostLink } from './core/getUserPostLink.js';
import { checkIsExist } from './tools/fileUtils.js';
import bulkDownloaderPost from './core/bulkDownloadPost.js';
import getUserReelFeed from './core/getUserReelFeed.js';
import bulkDownloaderReel from './core/bulkDownloadReel.js';
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
    username = parts[3];
  } else {
    username = usernameInput;
  }
  return username;
};
export const main = async (taskNum) => {
  if (taskNum == 1) {
    const username = await firstInput();
    await getUserPostLink(username);
  }
  if (taskNum == 2) {
    const username = await firstInput();
    const checkJsonList = checkIsExist(`${username}_post.json`, username);
    if (checkJsonList) {
      await bulkDownloaderPost(username);
    } else {
      return console.log(
        `${chalk.red.italic('u must have json list run task 1 to obtain this')}`
      );
    }
  }
  if (taskNum == 3) {
    const username = await firstInput();
    await getUserReelFeed(username);
  }
  if (taskNum == 4) {
    const username = await firstInput();
    const checkJsonList = checkIsExist(`${username}_reels.json`, username);
    if (checkJsonList) {
      await bulkDownloaderReel(username);
    } else {
      return console.log(
        `${chalk.red.italic('u must have json list run task 3 to obtain this')}`
      );
    }
  }
};
