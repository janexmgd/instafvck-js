import { client } from '../tools/client.js';
// src https://github.com/mikf/gallery-dl/blob/master/gallery_dl/extractor/instagram.py#L608
export const getPost = async (userId, maxId, count = 50) => {
  try {
    let url = `https://www.instagram.com/api/v1/feed/user/${userId}/?count=${count}`;
    if (maxId) {
      url += `&max_id=${maxId}`;
    }
    console.log(`current url ${url}`);

    const { data } = await client.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getInfo = async (username) => {
  try {
    const { data } = await client.get(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
