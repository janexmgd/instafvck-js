import chalk from 'chalk';
import { client } from '../tools/client.js';
import { ACCOUNT_JSON_INFO } from '../utils/url.js';
import { epochNow } from '../tools/time.js';
const proxyList = [
  {
    ip: '209.79.65.132',
    port: 8080,
  },
  {
    ip: '34.154.161.152',
    port: 80,
  },
  {
    ip: '144.49.99.215',
    port: 8080,
  },
  {
    ip: '35.189.184.15',
    port: 3128,
  },
  {
    ip: '45.152.188.241',
    port: 3128,
  },
  {
    ip: '87.247.185.75',
    port: 3128,
  },
  {
    ip: '117.251.103.186',
    port: 8080,
  },
  {
    ip: '203.190.113.146',
    port: 8077,
  },
  {
    ip: '150.230.210.154',
    port: 3128,
  },
  {
    ip: '209.79.65.132',
    port: 8080,
  },
  {
    ip: '45.152.188.241',
    port: 3128,
  },
  {
    ip: '118.69.111.51',
    port: 8080,
  },
  {
    ip: '45.152.188.241',
    port: 3128,
  },
  {
    ip: '123.126.158.50',
    port: 80,
  },
  {
    ip: '20.44.206.138',
    port: 80,
  },
  {
    ip: '117.71.154.185',
    port: 8089,
  },
  {
    ip: '8.219.97.248',
    port: 80,
  },
  {
    ip: '202.134.19.50',
    port: 3128,
  },
  {
    ip: '181.143.143.125',
    port: 999,
  },
  {
    ip: '103.39.133.213',
    port: 3128,
  },
  {
    ip: '209.79.65.132',
    port: 8080,
  },
  {
    ip: '125.99.106.250',
    port: 3128,
  },
  {
    ip: '113.223.212.234',
    port: 8089,
  },
  {
    ip: '203.85.120.69',
    port: 8080,
  },
  {
    ip: '20.120.240.49',
    port: 80,
  },
  {
    ip: '45.169.92.149',
    port: 999,
  },
  {
    ip: '64.225.8.118',
    port: 10000,
  },
  {
    ip: '203.85.120.69',
    port: 8080,
  },
  {
    ip: '87.247.185.75',
    port: 3128,
  },
  {
    ip: '144.49.99.215',
    port: 8080,
  },
  {
    ip: '117.71.154.183',
    port: 8089,
  },
  {
    ip: '181.204.190.234',
    port: 999,
  },
  {
    ip: '136.243.88.20',
    port: 26541,
  },
  {
    ip: '113.20.118.15',
    port: 8081,
  },
  {
    ip: '123.126.158.50',
    port: 80,
  },
  {
    ip: '187.63.157.51',
    port: 999,
  },
  {
    ip: '180.184.91.187',
    port: 443,
  },
  {
    ip: '111.225.152.236',
    port: 8089,
  },
  {
    ip: '45.169.92.151',
    port: 999,
  },
  {
    ip: '183.56.253.129',
    port: 8118,
  },
  {
    ip: '123.182.58.28',
    port: 8089,
  },
  {
    ip: '103.74.121.88',
    port: 3128,
  },
  {
    ip: '201.71.2.115',
    port: 999,
  },
  {
    ip: '76.80.116.106',
    port: 8080,
  },
  {
    ip: '177.93.45.154',
    port: 999,
  },
  {
    ip: '209.94.61.32',
    port: 3128,
  },
  {
    ip: '157.245.27.9',
    port: 3128,
  },
  {
    ip: '188.64.132.59',
    port: 3127,
  },
  {
    ip: '185.230.138.16',
    port: 8000,
  },
  {
    ip: '170.39.30.129',
    port: 8080,
  },
  {
    ip: '103.76.12.42',
    port: 8181,
  },
  {
    ip: '45.169.92.152',
    port: 999,
  },
  {
    ip: '177.93.45.156',
    port: 999,
  },
  {
    ip: '45.250.169.132',
    port: 8080,
  },
  {
    ip: '103.60.173.114',
    port: 8080,
  },
  {
    ip: '34.101.245.121',
    port: 80,
  },
  {
    ip: '110.34.3.229',
    port: 3128,
  },
  {
    ip: '102.132.19.90',
    port: 3128,
  },
  {
    ip: '5.165.6.188',
    port: 1513,
  },
  {
    ip: '58.20.82.115',
    port: 2323,
  },
  {
    ip: '121.139.218.165',
    port: 31409,
  },
  {
    ip: '117.70.48.40',
    port: 8089,
  },
  {
    ip: '103.139.144.105',
    port: 8080,
  },
  {
    ip: '181.212.45.226',
    port: 8080,
  },
  {
    ip: '103.155.54.26',
    port: 83,
  },
  {
    ip: '95.56.254.139',
    port: 3128,
  },
  {
    ip: '20.44.206.138',
    port: 80,
  },
  {
    ip: '157.245.27.9',
    port: 3128,
  },
  {
    ip: '211.106.84.247',
    port: 1022,
  },
  {
    ip: '190.113.40.202',
    port: 999,
  },
  {
    ip: '13.57.64.79',
    port: 8080,
  },
  {
    ip: '45.4.203.115',
    port: 999,
  },
  {
    ip: '123.126.158.50',
    port: 80,
  },
  {
    ip: '168.90.92.169',
    port: 999,
  },
  {
    ip: '186.24.4.249',
    port: 8080,
  },
  {
    ip: '125.99.106.250',
    port: 3128,
  },
  {
    ip: '117.251.103.186',
    port: 8080,
  },
  {
    ip: '103.152.232.75',
    port: 8080,
  },
  {
    ip: '217.11.184.30',
    port: 3128,
  },
  {
    ip: '202.62.67.209',
    port: 53281,
  },
  {
    ip: '190.187.201.26',
    port: 8080,
  },
  {
    ip: '190.97.240.10',
    port: 1994,
  },
  {
    ip: '103.162.91.116',
    port: 3128,
  },
  {
    ip: '49.48.70.174',
    port: 8080,
  },
  {
    ip: '202.154.18.13',
    port: 8080,
  },
  {
    ip: '103.76.14.51',
    port: 8080,
  },
  {
    ip: '196.23.154.117',
    port: 10846,
  },
  {
    ip: '196.23.154.117',
    port: 11111,
  },
  {
    ip: '222.81.218.66',
    port: 443,
  },
  {
    ip: '183.89.147.104',
    port: 8080,
  },
  {
    ip: '168.205.102.26',
    port: 8080,
  },
  {
    ip: '139.255.123.114',
    port: 8080,
  },
  {
    ip: '103.39.133.213',
    port: 3128,
  },
  {
    ip: '200.76.42.202',
    port: 999,
  },
  {
    ip: '150.107.137.25',
    port: 8080,
  },
  {
    ip: '185.23.110.106',
    port: 8080,
  },
  {
    ip: '45.5.119.61',
    port: 999,
  },
  {
    ip: '113.160.150.116',
    port: 8080,
  },
  {
    ip: '181.78.27.38',
    port: 999,
  },
  {
    ip: '178.32.121.183',
    port: 8080,
  },
  {
    ip: '103.112.253.64',
    port: 32650,
  },
  {
    ip: '196.23.154.117',
    port: 10832,
  },
  {
    ip: '168.90.92.65',
    port: 999,
  },
  {
    ip: '190.97.228.18',
    port: 999,
  },
  {
    ip: '103.48.68.37',
    port: 83,
  },
  {
    ip: '46.40.6.198',
    port: 7777,
  },
  {
    ip: '113.20.118.15',
    port: 8081,
  },
  {
    ip: '58.20.82.115',
    port: 2323,
  },
  {
    ip: '103.77.51.100',
    port: 8080,
  },
  {
    ip: '45.169.92.147',
    port: 999,
  },
  {
    ip: '122.3.41.154',
    port: 8090,
  },
  {
    ip: '203.89.29.53',
    port: 6060,
  },
  {
    ip: '46.40.6.201',
    port: 7777,
  },
  {
    ip: '50.231.0.43',
    port: 4481,
  },
  {
    ip: '45.177.98.139',
    port: 999,
  },
  {
    ip: '185.169.183.99',
    port: 8080,
  },
  {
    ip: '177.87.250.22',
    port: 999,
  },
  {
    ip: '89.145.205.175',
    port: 8080,
  },
  {
    ip: '168.90.92.185',
    port: 999,
  },
  {
    ip: '186.125.235.101',
    port: 999,
  },
  {
    ip: '181.78.108.225',
    port: 999,
  },
  {
    ip: '45.224.22.177',
    port: 999,
  },
  {
    ip: '196.23.154.117',
    port: 11136,
  },
  {
    ip: '168.0.239.225',
    port: 8787,
  },
  {
    ip: '45.152.188.241',
    port: 3128,
  },
  {
    ip: '123.126.158.50',
    port: 80,
  },
  {
    ip: '157.245.27.9',
    port: 3128,
  },
  {
    ip: '91.238.211.110',
    port: 8080,
  },
  {
    ip: '103.153.40.38',
    port: 8080,
  },
  {
    ip: '196.23.154.117',
    port: 9480,
  },
  {
    ip: '34.101.245.121',
    port: 80,
  },
  {
    ip: '103.129.92.95',
    port: 9995,
  },
  {
    ip: '116.130.233.22',
    port: 3129,
  },
  {
    ip: '150.230.210.154',
    port: 3128,
  },
  {
    ip: '203.85.120.69',
    port: 8080,
  },
  {
    ip: '154.64.211.145',
    port: 999,
  },
  {
    ip: '148.244.93.26',
    port: 999,
  },
  {
    ip: '115.127.5.146',
    port: 8674,
  },
  {
    ip: '185.141.233.47',
    port: 9443,
  },
  {
    ip: '175.106.15.182',
    port: 8080,
  },
  {
    ip: '179.1.129.93',
    port: 999,
  },
  {
    ip: '144.49.99.215',
    port: 8080,
  },
  {
    ip: '20.44.206.138',
    port: 80,
  },
  {
    ip: '87.247.185.75',
    port: 3128,
  },
  {
    ip: '14.225.3.187',
    port: 8666,
  },
  {
    ip: '213.171.44.134',
    port: 3128,
  },
  {
    ip: '89.237.34.193',
    port: 37647,
  },
  {
    ip: '200.105.215.22',
    port: 33630,
  },
  {
    ip: '51.79.50.46',
    port: 9300,
  },
  {
    ip: '60.167.176.81',
    port: 3128,
  },
  {
    ip: '191.97.14.26',
    port: 999,
  },
  {
    ip: '103.48.68.37',
    port: 83,
  },
  {
    ip: '168.90.92.65',
    port: 999,
  },
  {
    ip: '38.7.1.233',
    port: 999,
  },
  {
    ip: '103.39.133.213',
    port: 3128,
  },
  {
    ip: '185.15.172.212',
    port: 3128,
  },
  {
    ip: '8.219.97.248',
    port: 80,
  },
  {
    ip: '194.44.172.254',
    port: 23500,
  },
  {
    ip: '83.126.54.155',
    port: 8080,
  },
  {
    ip: '45.169.92.151',
    port: 999,
  },
  {
    ip: '38.7.3.6',
    port: 999,
  },
  {
    ip: '103.131.18.172',
    port: 8080,
  },
  {
    ip: '45.173.12.142',
    port: 1994,
  },
  {
    ip: '222.252.156.61',
    port: 62694,
  },
  {
    ip: '136.243.92.30',
    port: 26541,
  },
  {
    ip: '103.153.191.227',
    port: 8080,
  },
  {
    ip: '209.79.65.132',
    port: 8080,
  },
  {
    ip: '38.56.70.97',
    port: 999,
  },
  {
    ip: '103.10.22.235',
    port: 8080,
  },
  {
    ip: '36.138.120.73',
    port: 3128,
  },
  {
    ip: '185.200.37.12',
    port: 8080,
  },
  {
    ip: '158.69.185.37',
    port: 3129,
  },
  {
    ip: '117.251.103.186',
    port: 8080,
  },
  {
    ip: '104.199.219.13',
    port: 3128,
  },
  {
    ip: '147.139.168.187',
    port: 3128,
  },
  {
    ip: '154.223.182.139',
    port: 3128,
  },
  {
    ip: '121.126.200.123',
    port: 11361,
  },
  {
    ip: '50.193.36.173',
    port: 8080,
  },
  {
    ip: '115.144.123.219',
    port: 10297,
  },
  {
    ip: '177.93.45.154',
    port: 999,
  },
  {
    ip: '88.99.131.6',
    port: 8118,
  },
  {
    ip: '103.171.83.10',
    port: 8080,
  },
  {
    ip: '188.132.222.137',
    port: 8080,
  },
  {
    ip: '103.155.54.26',
    port: 83,
  },
  {
    ip: '77.238.79.111',
    port: 8080,
  },
  {
    ip: '124.121.127.188',
    port: 80,
  },
  {
    ip: '180.232.171.210',
    port: 8080,
  },
  {
    ip: '188.132.222.163',
    port: 8080,
  },
  {
    ip: '103.179.182.159',
    port: 8888,
  },
  {
    ip: '103.180.123.11',
    port: 8080,
  },
  {
    ip: '5.165.6.188',
    port: 1513,
  },
  {
    ip: '212.129.15.88',
    port: 8080,
  },
  {
    ip: '164.92.105.75',
    port: 2083,
  },
  {
    ip: '170.79.12.75',
    port: 9090,
  },
  {
    ip: '66.85.156.68',
    port: 2000,
  },
  {
    ip: '31.128.71.241',
    port: 8081,
  },
  {
    ip: '190.211.250.131',
    port: 999,
  },
  {
    ip: '202.12.83.1',
    port: 83,
  },
  {
    ip: '118.70.12.171',
    port: 53281,
  },
  {
    ip: '122.3.41.154',
    port: 8090,
  },
  {
    ip: '130.162.128.90',
    port: 3128,
  },
  {
    ip: '191.179.216.84',
    port: 8080,
  },
  {
    ip: '103.154.53.43',
    port: 8080,
  },
  {
    ip: '103.88.237.24',
    port: 8080,
  },
  {
    ip: '159.192.138.170',
    port: 8080,
  },
  {
    ip: '182.93.82.191',
    port: 8080,
  },
  {
    ip: '91.7.77.254',
    port: 3128,
  },
  {
    ip: '152.230.8.186',
    port: 999,
  },
  {
    ip: '196.219.202.74',
    port: 8080,
  },
  {
    ip: '23.122.184.9',
    port: 8888,
  },
  {
    ip: '181.37.126.112',
    port: 999,
  },
  {
    ip: '115.144.99.220',
    port: 11116,
  },
  {
    ip: '45.170.102.225',
    port: 999,
  },
  {
    ip: '211.253.36.172',
    port: 5005,
  },
  {
    ip: '204.199.129.38',
    port: 999,
  },
  {
    ip: '115.132.167.108',
    port: 8123,
  },
  {
    ip: '105.29.165.83',
    port: 8080,
  },
  {
    ip: '45.169.92.148',
    port: 999,
  },
  {
    ip: '62.204.141.29',
    port: 800,
  },
  {
    ip: '5.189.184.6',
    port: 80,
  },
  {
    ip: '187.94.16.59',
    port: 39665,
  },
  {
    ip: '209.250.237.211',
    port: 22,
  },
  {
    ip: '51.81.32.81',
    port: 8888,
  },
  {
    ip: '45.4.202.73',
    port: 999,
  },
  {
    ip: '177.241.233.10',
    port: 999,
  },
  {
    ip: '198.244.175.232',
    port: 8080,
  },
  {
    ip: '188.132.221.162',
    port: 8080,
  },
  {
    ip: '154.72.90.74',
    port: 8081,
  },
  {
    ip: '195.175.29.38',
    port: 9090,
  },
  {
    ip: '103.199.168.34',
    port: 80,
  },
  {
    ip: '217.66.200.154',
    port: 3128,
  },
  {
    ip: '200.123.29.39',
    port: 3128,
  },
  {
    ip: '45.6.100.10',
    port: 80,
  },
  {
    ip: '36.64.195.242',
    port: 8080,
  },
  {
    ip: '118.69.111.51',
    port: 8080,
  },
  {
    ip: '103.76.148.198',
    port: 8080,
  },
  {
    ip: '20.120.240.49',
    port: 80,
  },
  {
    ip: '212.23.175.80',
    port: 8443,
  },
  {
    ip: '45.94.73.133',
    port: 8080,
  },
  {
    ip: '64.225.8.115',
    port: 9994,
  },
  {
    ip: '118.70.109.148',
    port: 55443,
  },
  {
    ip: '41.77.129.154',
    port: 53281,
  },
  {
    ip: '177.87.250.22',
    port: 999,
  },
  {
    ip: '135.125.39.69',
    port: 12000,
  },
  {
    ip: '113.20.118.15',
    port: 8081,
  },
  {
    ip: '181.189.254.43',
    port: 999,
  },
  {
    ip: '170.187.229.216',
    port: 3128,
  },
  {
    ip: '209.94.61.32',
    port: 3128,
  },
  {
    ip: '103.175.49.94',
    port: 8888,
  },
  {
    ip: '91.223.128.65',
    port: 55055,
  },
  {
    ip: '195.138.90.226',
    port: 3128,
  },
  {
    ip: '89.232.176.21',
    port: 3128,
  },
  {
    ip: '209.94.61.32',
    port: 8081,
  },
  {
    ip: '170.83.242.250',
    port: 999,
  },
  {
    ip: '165.16.28.96',
    port: 8080,
  },
  {
    ip: '43.159.46.237',
    port: 3128,
  },
  {
    ip: '105.235.219.154',
    port: 8080,
  },
  {
    ip: '118.97.47.250',
    port: 55443,
  },
  {
    ip: '14.140.128.210',
    port: 80,
  },
];
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
    // return console.log(user);
    const data = {
      fullname: `${user.full_name}`,
      id: `${user.id}`,
      username: `${user.username}`,
      follower: `${user.edge_followed_by.count}`,
      biography: `${user.biography}`,
      lockedByViewer: `${user.blocked_by_viewer}`,
      CountryBlock: `${user.country_block}`,
      fetchedAt: `${epochNow()}`,
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
export const getMediaJsonInfo = async (url) => {
  const res = await client({
    url: url,
    method: 'GET',
  });
  const data = res.data;
  return data;
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

export const getMediaJsonInfoWProxy = async (url) => {
  try {
    const proxy = proxyList[Math.floor(Math.random() * proxyList.length)]; // Select a random proxy from the list
    const response = await client({
      method: 'GET',
      url: url,
      proxy: {
        host: proxy.ip,
        port: proxy.port,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
