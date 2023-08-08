import chalk from 'chalk';
import client from '../tools/client.js';
import { ACCOUNT_JSON_INFO } from '../utils/url.js';

const getAccountJsonInfo = async (username, urlHash) => {
  let url;
  if (!urlHash) {
    url = ACCOUNT_JSON_INFO(username);
  } else {
    url = urlHash;
  }
  const res = await client({
    url: url,
    method: 'GET',
  });
  const data = res.data;
  return data;
};
export const getAccountInfo = async (username, urlHash) => {
  try {
    let url;
    if (!urlHash) {
      url = ACCOUNT_JSON_INFO(username);
    } else {
      url = urlHash;
    }
    const accountJsonInfo = await getAccountJsonInfo(username, url);

    const user = accountJsonInfo.graphql.user;
    // return console.log(user);
    const edgeOwnerToTimelineMedia = user.edge_owner_to_timeline_media;
    let media = edgeOwnerToTimelineMedia.edges;
    let arrMedia = [];
    if (media.length) {
      media.map((item) => {
        arrMedia.push(item);
      });
    }

    const data = {
      fullname: `${user.full_name}`,
      id: `${user.id}`,
      username: `${user.username}`,
      follower: `${user.edge_followed_by.count}`,
      biography: `${user.biography}`,
      lockedByViewer: `${user.blocked_by_viewer}`,
      CountryBlock: `${user.country_block}`,
      EdgeOwnerToTimelineMedia: {
        count: `${user.edge_owner_to_timeline_media.count}`,
        pageInfo: {
          hasNextPage: edgeOwnerToTimelineMedia.page_info.has_next_page,
          endCursor: `${edgeOwnerToTimelineMedia.page_info.end_cursor}`,
        },
        edges: arrMedia,
      },
    };
    return data;
  } catch (error) {
    console.error(chalk.red(error));
  }
};
export const getAccountInfoGraphql = async (username, urlHash) => {
  try {
    let url;
    if (!urlHash) {
      url = ACCOUNT_JSON_INFO(username);
    } else {
      url = urlHash;
    }
    const accountJsonInfo = await getAccountJsonInfo(username, url);
    const user = accountJsonInfo.data.user;
    const edgeOwnerToTimelineMedia =
      accountJsonInfo.data.user.edge_owner_to_timeline_media;

    let media = edgeOwnerToTimelineMedia.edges;
    let arrMedia = [];
    if (media.length) {
      media.map((item) => {
        arrMedia.push(item);
      });
    }
    const data = {
      EdgeOwnerToTimelineMedia: {
        count: `${user.edge_owner_to_timeline_media.count}`,
        pageInfo: {
          hasNextPage: edgeOwnerToTimelineMedia.page_info.has_next_page,
          endCursor: `${edgeOwnerToTimelineMedia.page_info.end_cursor}`,
        },
        edges: arrMedia,
      },
    };
    return data;
  } catch (error) {
    console.log(error);
  }
};

// getAccountInfo('jkt48.marsha');
