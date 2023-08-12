import axios from 'axios';
import crypto from 'crypto';

(async () => {
  const prefix = '#PWD_INSTAGRAM_BROWSER:0:';
  const currentTime = Math.floor(Date.now() / 1000); // Mendapatkan waktu saat ini dalam detik (UNIX timestamp)
  const password = 'yupi#123'; // Ganti dengan kata sandi yang sesuai
  const dataToHash = `${prefix}${currentTime}:${password}`;

  const passwordHashed = crypto
    .createHash('sha256')
    .update(dataToHash)
    .digest('hex');
  const BASE_URL = 'https://www.instagram.com';
  const LOGIN_URL = 'https://www.instagram.com/accounts/login/ajax/';
  const formData = new URLSearchParams();
  formData.append('username', 'i4ukazuha');
  formData.append('password', passwordHashed);
  const client = axios.create({
    headers: {
      Connection: 'keep-alive',
      'Keep-Alive': '300',
      'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
      'Accept-Language': 'en-us,en;q=0.5',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36',
    },
  });
  client
    .post('https://www.instagram.com/accounts/login/ajax/', formData)
    .then((response) => {
      // Tanggapan dari permintaan POST akan tersedia di sini
      console.log(response);
    })
    .catch((error) => {
      console.error('Gagal mengirim permintaan:', error);
    });
})();
