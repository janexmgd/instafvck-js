import chalk from 'chalk';
import { downloader } from './client.js';
import urlModule from 'url';
import fs from 'fs';
import fsPromise from 'fs/promises';
import path from 'path';
const readJsonFile = async (username) => {
  try {
    const currentFilePath = new URL(import.meta.url).pathname;
    const currentDir = path.dirname(currentFilePath);
    const filePath = path.join(currentDir, `../../tmp/${username}`);
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
    const currentFilePath = new URL(import.meta.url).pathname;
    const currentDir = path.dirname(currentFilePath);
    const filePath = path.join(currentDir, `../../tmp/${username}/${filename}`);
    const checkFile = fs.existsSync(filePath);
    if (checkFile) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // return;
    console.log(error);
  }
};
const doDownload = async (url, username, lengthOfMedia, current) => {
  try {
    const parsedUrl = urlModule.parse(url);
    const pathnameSegments = parsedUrl.pathname.split('/');
    const filenameQuery = pathnameSegments[pathnameSegments.length - 1]; // Mengambil bagian terakhir dari path sebagai nama file
    // Menghapus query string dari nama file
    const filename = filenameQuery.split('?')[0];
    // file is already exist
    const isAlready = checkIsDownloaded(filename, username);
    // folder path
    const currentFilePath = new URL(import.meta.url).pathname;
    const currentDir = path.dirname(currentFilePath);
    const folderPath = path.join(currentDir, `../../tmp/${username}`);
    if (isAlready == true) {
      console.log(
        `${chalk.italic(filename)} already ${chalk.green(
          `exist`
        )} ${current}/${lengthOfMedia}`
      );
    } else {
      const response = await downloader({
        url: url,
        method: 'GET',
        responseType: 'stream',
      });
      // const files = `../../tmp/${username}/${filename}`?`../../tmp/${username}/${filename}`:`././tmp/${username}/${filename}`
      await response.data.pipe(
        fs.createWriteStream(`${folderPath}/${filename}`)
      );
      console.log(
        `${chalk.italic(filename)} ${chalk.green(
          `success`
        )} downloaded ${current}/${lengthOfMedia}`
      );
    }
  } catch (error) {
    console.log(error);
  }
};
const bulkDownloader = async (username) => {
  try {
    const userData = await readJsonFile(username);
    const post = userData.post;
    // return console.log(post.length);
    let count = 0; // Variabel untuk melacak jumlah media yang sudah diunduh

    // ... kode sebelumnya ...
    function printCount() {
      console.log(
        `Download post ${chalk.italic.blue(
          `@${username}`
        )}  (${chalk.blue(count)}/${chalk.italic.blue(
          post.length
        )}) post`
      );
    }
    // Loop melalui setiap post dan media untuk memulai unduhan
    for (const postData of post) {
      printCount(); // Memanggil fungsi untuk mencetak progres
      for (const [currentIndex, mediaData] of postData.media.entries()) {
        const lengthOfMedia = postData.media.length;
        const current = currentIndex + 1;
        const url = mediaData.media_link;
        await doDownload(url, username, lengthOfMedia, current); // Menunggu hingga unduhan selesai
      }
      // countMedia = 0;
      count++; // Meningkatkan count setiap kali berhasil mengunduh
    }
    return console.log(
      chalk.italic(
        `task done, success downloading ${post.length} post from @${username}`
      )
    );
  } catch (err) {
    return console.error('Terjadi kesalahan saat bulkdownload:', err);
  }
};
// bulkDownloader('katarinabluu');
export default bulkDownloader
