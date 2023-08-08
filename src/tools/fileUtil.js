import chalk from 'chalk';
import fs from 'fs/promises';
const createFolder = async (username) => {
  try {
    const folderPath = `././tmp/${username}`;
    await fs.mkdir(folderPath, { recursive: true });
    console.log(
      chalk.italic.green(`Success Creating Folder `) +
        chalk.italic(`${username}`)
    );
  } catch (error) {
    console.log(chalk.red.italic('Error when creating folder'));
  }
};
const createFile = async (username, data) => {
  try {
    const filePath = `././tmp/${username}/${username}.json`;
    const jsonContent = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonContent, { recursive: true });
    console.log(
      chalk.italic.green(`Success Creating File `) +
        chalk.italic(`${username}.json`)
    );
  } catch (error) {
    chalk.red.italic(`Error when creating file ${username}.json`);
  }
};
export const createLinkJson = async (username, data) => {
  try {
    createFolder(username);
    createFile(username, data);
  } catch (error) {
    console.error(chalk.red.italic(error));
  }
};
