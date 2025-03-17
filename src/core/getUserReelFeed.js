import { getInfo, getReelFeed } from '../func/instagram.js';
import { createJson } from '../tools/fileUtils.js';
const getUserReelFeed = async (username) => {
  try {
    const instaUserInfo = await getInfo(username);
    const { full_name, id } = instaUserInfo.user;
    console.log(
      `Success get info user @${username}, fullname ${full_name}, id ${id}`
    );
    const reels = [];
    let cursor = '';
    while (true) {
      const reelFeed = await getReelFeed(id, cursor);
      for (const item of reelFeed.xdt_api__v1__clips__user__connection_v2
        .edges) {
        reels.push({ ...item.node.media });
      }
      cursor =
        reelFeed.xdt_api__v1__clips__user__connection_v2.page_info.end_cursor;
      if (
        reelFeed.xdt_api__v1__clips__user__connection_v2.page_info
          .has_next_page == false
      ) {
        console.log('no more reel at account, total ', reels.length);
        break;
      }
      console.log(cursor);
    }
    await createJson(
      username,
      JSON.stringify(reels, '', 2),
      `${username}_reels.json`
    );
  } catch (error) {
    console.log(error);
  }
};
export default getUserReelFeed;
