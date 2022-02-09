var baseURLStr = ''

switch (process.env.NODE_ENV) {
    case 'production':
        baseURLStr = '';
        break
    case 'test':
        baseURLStr = '';
        break
    default:
        baseURLStr = 'https://meeting.jvt.cc:6001/prod-api';
}

export const baseUrl = baseURLStr

