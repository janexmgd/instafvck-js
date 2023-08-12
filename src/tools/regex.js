export const isLinkToMediaJsonInfo = (item) => {
  const regexPattern =
    /^https:\/\/www\.instagram\.com\/p\/[A-Za-z0-9_-]+\/\?__a=1&__d=dis$/;
};
export const isValidPostUrl = (url) => {
  const regex = new RegExp(
    '^(?:https?://)?(?:www\\.)?instagram\\.com/(p|tv|reel)/([^/]+)'
  );
  const match = url.match(regex);
  let mediaId;
  let mediaType;
  if (match) {
    mediaType = match[1];
    mediaId = match[2];
    const media = {
      urlMediaJsonInfo: `https://www.instagram.com/p/${mediaId}/?__a=1&__d=dis`,
      mediaType: `${mediaType}`,
    };
    return media;
  } else {
    console.log('invalid instagram url post');
    return;
  }
};
