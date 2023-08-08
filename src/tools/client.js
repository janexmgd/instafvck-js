import axios from 'axios';
import cookieString from '../utils/cookie.js';

const client = axios.create({
  headers: {
    Connection: 'keep-alive',
    'Keep-Alive': '300',
    'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
    'Accept-Language': 'en-us,en;q=0.5',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0 Instagram 290.0.0.1',
    Cookie: cookieString,
  },
});

export default client;
