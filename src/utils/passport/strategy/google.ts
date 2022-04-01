import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { prisma } from '../../../utils/prisma';

import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    AUTH_PROVIDER,
} from '../../../utils/config';

const options = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect',
    scope: ['profile', 'email'],
};

const googleLogin = new GoogleStrategy(
    options,
    async (accessToken, refreshToken, profile: any, done) => {
        console.log('googleProfile', profile)
        try {
            const selectedUser = await prisma.user.findUnique({
                where: {
                    oAuthId: profile.id,
                },
            });

            if (selectedUser) {
                return done(null, selectedUser);
            }
        } catch (error) {
            console.log(error);
        }

        try {
            const createdUser = await prisma.user.create({
                data: {
                    oAuthId: profile.id,
                    provider: AUTH_PROVIDER.GOOGLE,
                    username: profile.name.givenName,
                    email: profile.emails?.[0].value,
                },
            });
            return done(null, createdUser);
        } catch (error) {
            console.log(error);
        }
    }
);

passport.use(googleLogin);