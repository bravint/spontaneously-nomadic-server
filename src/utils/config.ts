export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;

export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

export const SECRET = process.env.SECRET as string;

export const SESSION_NAME = 'session' as string;

export const CLIENT_URL = {
    ROOT: 'http://localhost:3000' as string,
    LOGIN: 'http://localhost:3000/login' as string,
};

export const SERVER_MESSAGES = {
    HELLO: 'Hello World' as string,
    STARTED: 'server started on port' as string,
};

export const ROUTES = {
    AUTH: '/auth' as string,
    LOCATION: '/location' as string,
    RATING: '/rating' as string,
    PROFILE: '/profile' as string,
};

export const AUTH_PROVIDER = {
    GOOGLE: 'GOOGLE' as any,
};
