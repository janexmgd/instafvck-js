import chalk from 'chalk';
import fs from 'fs/promises';
import fsNonProm from 'fs';
import path from 'path';

export const checkFolderExists = async (folderPath) => {
  try {
    console.log(
      chalk.italic.green(`Checking Folder`) + chalk.italic(`${folderPath}`)
    );
    await fs.access(folderPath, fs.constants.F_OK);
    console.log(
      chalk.italic.green(`Folder is already exist: `) +
        chalk.italic(`${folderPath}`)
    );
  } catch (error) {
    console.error(chalk.red('Folder is not exist ', error));
    await createFolder(folderPath);
  }
};
export const createFolder = async (folderPath) => {
  try {
    console.log(
      chalk.italic.green(`Creating Folder `) + chalk.italic(`${folderPath}`)
    );
    await fs.mkdir(folderPath, { recursive: true });
    console.log(
      chalk.italic.green(`Success Creating Folder `) +
        chalk.italic(`${folderPath}`)
    );
  } catch (error) {
    console.error(chalk.red('Error when creating folder: ', error));
  }
};
const createFile = async (filePath, data) => {
  try {
    console.log(
      chalk.italic.green(`Creating File `) + chalk.italic(`${filePath}`)
    );
    await fs.writeFile(filePath, data, {
      encoding: 'utf-8',
      flag: 'w',
    });
    console.log(
      chalk.italic.green(`Success Creating File :`) +
        chalk.italic(`${filePath}`)
    );
  } catch (error) {
    console.error(chalk.red('Error when creating File', error));
  }
};
export const checkIsExist = (filename, username) => {
  try {
    const filePath = path.join(process.cwd(), 'tmp', username, filename);
    const dir = path.dirname(filePath);
    if (!fsNonProm.existsSync(dir)) {
      fsNonProm.mkdirSync(dir, { recursive: true });
    }
    if (!fsNonProm.existsSync(filePath)) {
      console.log(`File ${filename} does not exist.`);
      return false;
    }

    console.log(`File ${filename} exists.`);
    return true;
  } catch (error) {
    console.log(error);
  }
};
export const createJson = async (username, data, filename) => {
  const filePath = path.join('tmp', username, filename);
  const dir = path.dirname(filePath);
  if (!fsNonProm.existsSync(dir)) {
    fsNonProm.mkdirSync(dir, { recursive: true });
  }
  await createFile(filePath, data);
};
