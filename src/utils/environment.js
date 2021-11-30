var baseURLStr = ''

switch (process.env.NODE_ENV) {
    case 'production':
        baseURLStr = 'http://www.baidu.com/boss-api-b';
        break
    case 'test':
        baseURLStr = 'http://test.baidu.com/boss-api-b';
        break
    default:
        baseURLStr = 'http://192.168.0.144:12139/boss-api-b';
}

export const baseUrl = baseURLStr

