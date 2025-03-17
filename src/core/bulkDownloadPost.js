import chalk from 'chalk';
import path from 'path';
import {
  readJsonFile,
  retryDownload,
  getBestQuality,
} from '../tools/downloadProcess.js';
import { checkFolderExists } from '../tools/fileUtils.js';
const bulkDownloaderPost = async (username) => {
  try {
    // process.stdout.write('\x1Bc');
    const posts = await readJsonFile(username, `${username}_post.json`);
    let count = 1;
    const totalLength = posts.length;
    console.log(`Downloading posts ${chalk.italic(`@${username}`)}`);
    const folderPath = path.join(process.cwd(), 'tmp', username, 'posts');
    await checkFolderExists(folderPath);
    for (const postData of posts) {
      if (postData.carousel_media) {
        const { carousel_media } = postData;
        for (let i = 0; i < carousel_media.length; i++) {
          const media = carousel_media[i];
          const bestQuality = getBestQuality(media);
          await retryDownload(
            bestQuality.url,
            carousel_media.length,
            i + 1,
            3,
            folderPath,
            count,
            totalLength
          );
        }
      } else {
        const bestQuality = getBestQuality(postData);
        await retryDownload(
          bestQuality.url,
          1,
          1,
          3,
          folderPath,
          count,
          totalLength
        );
      }
      count++;
    }

    console.log(
      chalk.italic(
        `Task done, success downloading ${posts.length} posts from @${username}`
      )
    );
  } catch (err) {
    console.error('Terjadi kesalahan saat bulk download:', err);
  }
};

export default bulkDownloaderPost;
