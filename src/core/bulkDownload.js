import chalk from 'chalk';
import { downloader } from '../tools/client.js';
import urlModule from 'url';
import fs from 'fs';
import fsPromise from 'fs/promises';
import path from 'path';

const readJsonFile = async (username) => {
  try {
    const currentDir = process.cwd();
    const filePath = path.join(currentDir, 'tmp', username);
    const data = await fsPromise.readFile(
      `${filePath}/${username}.json`,
      'utf8'
    );
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error('Terjadi kesalahan:', err);
  }
};

const checkIsDownloaded = (filename, username) => {
  try {
    const currentDir = process.cwd();
    const filePath = path.join(currentDir, 'tmp', username, filename);
    const checkFile = fs.existsSync(filePath);
    return checkFile;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const retryDownload = async (
  url,
  username,
  lengthOfMedia,
  current,
  retries = 3
) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const parsedUrl = urlModule.parse(url);
      const pathnameSegments = parsedUrl.pathname.split('/');
      const filenameQuery = pathnameSegments[pathnameSegments.length - 1];
      const filename = filenameQuery.split('?')[0];

      const isAlready = checkIsDownloaded(filename, username);
      const currentDir = process.cwd();
      const folderPath = path.join(currentDir, 'tmp', username);

      if (isAlready) {
        console.log(
          `${chalk.italic(filename)} already ${chalk.green(
            `exist`
          )} ${current}/${lengthOfMedia}`
        );
        return;
      } else {
        const response = await downloader({
          url: url,
          method: 'GET',
          responseType: 'stream',
        });

        const writer = fs.createWriteStream(`${folderPath}/${filename}`);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });

        console.log(
          `${chalk.italic(filename)} ${chalk.green(
            `success`
          )}${current}/${lengthOfMedia}`
        );
        return;
      }
    } catch (error) {
      console.log(
        `${chalk.italic(url)} ${chalk.red(
          `failed`
        )} download attempt ${attempt}/${retries}: ${error.message}`
      );
      if (attempt === retries) {
        throw new Error(
          `Failed to download after ${retries} attempts: ${error.message}`
        );
      }
    }
  }
};

function getBestQuality(media) {
  if (media.media_type === 1) {
    const candidates = media.image_versions2.candidates;
    const best = candidates.reduce((prev, curr) =>
      prev.width * prev.height > curr.width * curr.height ? prev : curr
    );
    return {
      url: best.url,
      width: best.width,
      height: best.height,
    };
  } else if (media.media_type === 2) {
    const versions = media.video_versions;
    const best = versions.reduce((prev, curr) =>
      curr.bandwidth > prev.bandwidth ? curr : prev
    );
    return {
      url: best.url,
      width: best.width,
      height: best.height,
      bandwidth: best.bandwidth,
    };
  }
  return null;
}

const bulkDownloader = async (username) => {
  try {
    const posts = await readJsonFile(username);
    let count = 0;

    function printCount() {
      console.log(
        `Download post ${chalk.italic.blue(`@${username}`)}  (${chalk.blue(
          count
        )}/${chalk.italic.blue(posts.length)}) post`
      );
    }

    for (const postData of posts) {
      if (postData.carousel_media) {
        const { carousel_media } = postData;
        for (let i = 0; i < carousel_media.length; i++) {
          const media = carousel_media[i];
          const bestQuality = getBestQuality(media);
          await retryDownload(
            bestQuality.url,
            username,
            carousel_media.length,
            i + 1
          );
        }
      } else {
        const bestQuality = getBestQuality(postData);
        await retryDownload(bestQuality.url, username, 1, 1);
      }

      count++;
      printCount();
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

export default bulkDownloader;
