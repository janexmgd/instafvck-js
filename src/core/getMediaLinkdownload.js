import { getMediaJsonInfo, getMediaJsonInfoWProxy } from './fetcher.js';
import { getUserPostLink } from './getUserPostLink.js';
import { createJson } from '../tools/fileUtils.js';
import chalk from 'chalk';
import ora from 'ora';
export const getMediaLink = async (username) => {
  try {
    const user = await getUserPostLink(username);
    const post = user.post;
    let count = 0;
    function printCount() {
      console.log(`Getting All media link ${chalk.italic.green(username)}....${count} / ${post.length}`);
    }
    // const spinner = ora({
    //   text: `Getting All media link ${chalk.italic.green(username)}.......`,
    //   spinner: 'dots4',
    // }).start();
    const processPost = async () => {
      for (let index = 0; index < post.length; index++) {
        const item = post[index];
        const data = await getMediaJsonInfo(item.url);

        let userMediaLink = [];
        if (data.items[0].carousel_media) {
          data.items[0].carousel_media.forEach((value) => {
            if (value.video_versions) {
              userMediaLink.push({
                id: data.items[0].id,
                media_link: value.video_versions[0].url,
                file_type: 'video',
              });
            } else {
              userMediaLink.push({
                id: data.items[0].id,
                media_link: value.image_versions2.candidates[0].url,
                file_type: 'image',
              });
            }
          });
        } else {
          if (data.items[0].video_versions) {
            userMediaLink.push({
              id: data.items[0].id,
              media_link: data.items[0].video_versions[0].url,
              file_type: 'video',
            });
          } else {
            userMediaLink.push({
              id: data.items[0].id,
              media_link: data.items[0].image_versions2.candidates[0].url,
              file_type: 'image',
            });
          }
        }
        // adding to element post
        post[index].media = userMediaLink;
        if (userMediaLink.length > 0) {
          count++;
          printCount();
        }
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Menunda perulangan selama 1 detik
      }
    };
    await processPost();
    // spinner.succeed(`${chalk.green(
    //   'success'
    // )} get all link media post from ${username}
    
    // `);
    const jsonContent = JSON.stringify(user, null, 2);
    await createJson(username, jsonContent);
    return;
  } catch (error) {
    console.log(error);
  }
};
