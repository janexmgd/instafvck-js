import { getPost, getInfo } from '../func/instagram.js';
import { createJson } from '../tools/fileUtils.js';

export const getUserPostLink = async (username) => {
  try {
    const instaUserInfo = await getInfo(username);
    const { full_name, id } = instaUserInfo.user;
    console.log(
      `Success get info user @${username}, fullname ${full_name}, id ${id}`
    );
    const posts = [];
    let nextMaxId = null;
    let hasMore = true;
    while (hasMore) {
      const post = await getPost(id, nextMaxId, 12);
      if (!post || !post.items) {
        break;
      }
      posts.push(...post.items);
      hasMore = post.more_available;
      nextMaxId = post.next_max_id;
    }
    console.log(`Total posts fetched: ${posts.length}`);

    await createJson(username, JSON.stringify(posts, null, 2));
  } catch (error) {
    console.log(error);
  }
};
