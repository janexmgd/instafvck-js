import { epochConverter } from '../tools/time.js';
import { getAccountInfo, getAccountInfoGraphql } from './fetcher.js';
import { ACCOUNT_INFO_BY_GRAPHQL } from '../utils/url.js';
import ora from 'ora';
import chalk from 'chalk';
export const getUserPostLink = async (username) => {
  try {
    const spinner = ora({
      text: `Getting account info......${chalk.italic.green(username)}`,
      spinner: 'dots4',
    }).start();
    let ui;
    ui = await getAccountInfo(username);
    const dataUser = {
      fullname: ui.fullname,
      id: ui.id,
      username: ui.username,
      follower: ui.follower,
      postCount: ui.EdgeOwnerToTimelineMedia.count,
      fetchedAt: ui.fetchedAt,
    };
    console.log(
      chalk.italic.green(`
  fullname     ${dataUser.fullname}
  id           ${dataUser.id}
  username     ${dataUser.username}
  follower     ${dataUser.follower}
  postCount    ${dataUser.postCount}
  fetchedAt    ${dataUser.fetchedAt}
`)
    );
    let userPostlink = [];
    let media;
    media = ui.EdgeOwnerToTimelineMedia.edges;
    media.map((item, index) => {
      if (media[index].node.edge_sidecar_to_children) {
        userPostlink.push({
          num: userPostlink.length + 1,
          id: media[index].node.id,
          shortCode: media[index].node.shortcode,
          timestamp: epochConverter(media[index].node.taken_at_timestamp),
          url: `https://www.instagram.com/p/${media[index].node.shortcode}/?__a=1&__d=dis`,
          type: `${media[index].node.__typename}`,
          isCarousel: true,
          carouselLength:
            media[index].node.edge_sidecar_to_children.edges.length,
          is_video: media[index].node.is_video,
        });
      } else {
        userPostlink.push({
          num: userPostlink.length + 1,
          id: media[index].node.id,
          shortCode: media[index].node.shortcode,
          timestamp: epochConverter(media[index].node.taken_at_timestamp),
          url: `https://www.instagram.com/p/${media[index].node.shortcode}/?__a=1&__d=dis`,
          type: `${media[index].node.__typename}`,
          isCarousel: false,
          is_video: media[index].node.is_video,
        });
      }
    });
    let hasNextPage;
    hasNextPage = ui.EdgeOwnerToTimelineMedia.pageInfo.hasNextPage;
    spinner.succeed(`success get data from ${username} instagram`);

    return new Promise((resolve, reject) => {
      // console.log(ui);
      const fetching = ora({
        text: `Fetching ${dataUser.postCount} post from ${chalk.italic.green(
          username
        )} please wait.....`,
        spinner: 'dots4',
      }).start();
      if (hasNextPage == true) {
        const doLoop = () => {
          setTimeout(async () => {
            let vartmpl;
            let variables;
            vartmpl = `{"id":"<ID>","first":50,"after":"<ENDCURSOR>"}`;
            vartmpl = vartmpl.replace('<ID>', dataUser.id);
            variables = vartmpl.replace(
              '<ENDCURSOR>',
              ui.EdgeOwnerToTimelineMedia.pageInfo.endCursor
            );
            const urlGraphql = ACCOUNT_INFO_BY_GRAPHQL();
            const url = urlGraphql + variables;
            const data = await getAccountInfoGraphql(username, url);
            hasNextPage = data.EdgeOwnerToTimelineMedia.pageInfo.hasNextPage;
            ui = data;
            media = ui.EdgeOwnerToTimelineMedia.edges;
            media.map((item, index) => {
              if (media[index].node.__typename == 'GraphSidecar') {
                userPostlink.push({
                  num: userPostlink.length + 1,
                  id: media[index].node.id,
                  shortCode: media[index].node.shortcode,
                  timestamp: epochConverter(
                    media[index].node.taken_at_timestamp
                  ),
                  url: `https://www.instagram.com/p/${media[index].node.shortcode}/?__a=1&__d=dis`,
                  type: `${media[index].node.__typename}`,
                  isCarousel: true,
                  is_video: media[index].node.is_video,
                });
              } else {
                userPostlink.push({
                  num: userPostlink.length + 1,
                  id: media[index].node.id,
                  shortCode: media[index].node.shortcode,
                  timestamp: epochConverter(
                    media[index].node.taken_at_timestamp
                  ),
                  url: `https://www.instagram.com/p/${media[index].node.shortcode}/?__a=1&__d=dis`,
                  type: `${media[index].node.__typename}`,
                  isCarousel: false,
                  is_video: media[index].node.is_video,
                });
              }
            });
            if (hasNextPage == true) {
              doLoop();
            } else {
              const user = {
                ...dataUser,
                post: userPostlink,
              };
              fetching.succeed(
                `Success fetching ${user.postCount} post link from ${username} instagram`
              );
              resolve(user);
            }
          }, 1000);
        };
        doLoop();
      } else {
        const user = {
          ...dataUser,
          post: userPostlink,
        };
        fetching.succeed(
          `Success fetching ${user.postCount} post link from ${username} instagram`
        );
        resolve(user);
        return;
      }
    });
  } catch (error) {
    return console.error(error);
  }
};
