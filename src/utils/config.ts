//google oauth 2.0

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;

export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

//jwt secret

export const SECRET = process.env.SECRET as string;

//prisma seed config

export const USERS_TO_CREATE = 20;

export const LOCATIONS_PER_USER = 20;

export const FOLLOWERS_PER_USER = 10;

//google oauth 2.0 redirect URLs

export const CLIENT_URL = {
    ROOT: 'http://localhost:3000' as string,
    LOGIN: 'http://localhost:3000/login' as string,
    SUCCESS: 'http://localhost:3000/success' as string,
};

//index.ts server status messages

export const SERVER_MESSAGES = {
    HELLO: 'Hello World' as string,
    STARTED: 'server started on port' as string,
};

export const ROUTES = {
    AUTH: '/auth' as string,
    FOLLOW: '/follow' as string,
    LOCATION: '/location' as string,
    RATING: '/rating' as string,
    PROFILE: '/profile' as string,
};

export const AUTH_PROVIDER = {
    GOOGLE: 'GOOGLE' as any,
};

export const COOKIE_NAME = {
    TOKEN: 'token' as string,
};