import { basicClient, client } from '../tools/client.js';
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
export const getReelFeed = async (id, cursor) => {
  try {
    const { data } = await basicClient.post(
      'https://www.instagram.com/graphql/query',
      new URLSearchParams({
        av: '17841406559649064',
        __d: 'www',
        __user: '0',
        __a: '1',
        __req: '8',
        __hs: '20164.HYP:instagram_web_pkg.2.1...1',
        dpr: '1',
        __ccg: 'GOOD',
        __rev: '1020950815',
        __s: '92b3qy:1l9arw:rgdcgd',
        __hsi: '7482592393805204806',
        __dyn:
          '7xeUjG1mxu1syUbFp41twpUnwgU7SbzEdF8aUco2qwJxS0DU2wx609vCwjE1EE2Cw8G11wBz81s8hwGxu786a3a1YwBgao6C0Mo2swtUd8-U2zxe2GewGw9a361qw8Xxm16wUwtE1wEbUGdG1QwTU9UaQ0Lo6-3u2WE5B08-269wr86C1mwPwUQp1yUb8jK5V8aUuwm8jxK2K0P8KmUhw',
        __csr:
          'gP3cejlsqyOPZjnkyqQl4SGCN7FFHQFVppWGGGZbCl4gxby8OWBKl9pt5t5GtAjhqyesGiOuyuuWiLGBykF9F9fDy8OmUGmnQq9Axy9AA-i9zk5eq8CVpkbCxK44jm9le5EGcVUO5RKaykdAxymVZ2qzpSFQUqmi5EsByHBz8-48_x2uqew04FZAu095g0Ge2a3qcG1dwwogix2220JE0Oi0oq0eew3Y9U4u3OhP98y8Q4-0FQcDg660I4mp02y82rg2rCgCl0Yg-2e4Vk4fwJyQm2e0fkCgCO0jQ2Gpr6wBwhK01AZw92057o',
        __hsdp: '',
        __hblp: '',
        __comet_req: '7',
        fb_dtsg:
          'NAcMBh7CuIiz7n08Q-2C8Vlpm2qDYxIdJKb5FD6tY0wS_ZBfsLlg4sQ:17843683126168011:1742095347',
        jazoest: '26094',
        lsd: 'aRW0_F75nTrjDk4TIeCzXV',
        __spin_r: '1020950815',
        __spin_b: 'trunk',
        __spin_t: '1742176803',
        fb_api_caller_class: 'RelayModern',
        fb_api_req_friendly_name: 'PolarisProfileReelsTabContentQuery',
        variables: JSON.stringify({
          after: cursor,
          data: {
            include_feed_video: true,
            page_size: 25,
            target_user_id: id,
          },
        }),
        server_timestamps: 'true',
        doc_id: '8471403382962070',
      })
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
