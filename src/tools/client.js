import axios from 'axios';
import 'dotenv/config.js';
const { COOKIE } = process.env;
// src https://github.com/mikf/gallery-dl/blob/master/gallery_dl/extractor/instagram.py#L608
export const client = axios.create({
  headers: {
    Accept: '*/*',
    'X-CSRFToken': '',
    'X-IG-App-ID': '936619743392459',
    'X-ASBD-ID': '198387',
    'X-IG-WWW-Claim': '0',
    Referer: 'https://www.instagram.com/',
    cookie: COOKIE,
  },
});
export const basicClient = axios.create({
  headers: {
    Accept: '*/*',
    'X-CSRFToken': '',
    'X-IG-App-ID': '936619743392459',
    'X-ASBD-ID': '198387',
    'X-IG-WWW-Claim': '0',
    Referer: 'https://www.instagram.com/',
  },
});

export const downloader = axios.create({
  headers: {
    Connection: 'keep-alive',
    'Keep-Alive': '300',
    'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
    'Accept-Language': 'en-us,en;q=0.5',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36',
  },
});
