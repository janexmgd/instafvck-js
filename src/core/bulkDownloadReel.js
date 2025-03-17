import chalk from 'chalk';
import path from 'path';
import { readJsonFile, retryDownload } from '../tools/downloadProcess.js';
import { checkFolderExists } from '../tools/fileUtils.js';
import axios from 'axios';
const bulkDownloaderReel = async (username) => {
  try {
    // process.stdout.write('\x1Bc');
    const reels = await readJsonFile(username, `${username}_reels.json`);
    let count = 1;
    console.log(`Downloading Reels ${chalk.italic(`@${username}`)}`);
    const totalLength = reels.length;
    const folderPath = path.join(process.cwd(), 'tmp', username, 'reels');
    await checkFolderExists(folderPath);
    for (const reel of reels) {
      const url = `https://www.instagram.com/p/${reel.code}`;
      const { data } = await axios.post(
        'https://saio-api.vercel.app/service',
        {
          url: url,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const downloadUrl = data.data.content;
      await retryDownload(downloadUrl, 1, 1, 3, folderPath, count, totalLength);
      count++;
    }
  } catch (error) {
    console.log(error);
  }
};
export default bulkDownloaderReel;
