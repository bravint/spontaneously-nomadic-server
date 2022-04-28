import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { prisma } from '../../../utils/prisma';
import { IUserFromDatabase } from '../../types';
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    AUTH_PROVIDER,
} from '../../config';

const options = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: './auth/google/redirect',
    scope: ['profile', 'email'],
};

const googleLogin = new GoogleStrategy(
    options,
    async (_: any, __: any, profile: any, done) => {
        try {
            const selectedUser : IUserFromDatabase | null = await prisma.user.findUnique({
                where: {
                    oAuthId: profile.id,
                },
                include: {
                    profile: true,
                },
            });

            if (selectedUser) {
                return done(null, selectedUser);
            }
        } catch (error) {
            console.log(error);
        }

        try {
            const createdUser : IUserFromDatabase | null = await prisma.user.create({
                data: {
                    oAuthId: profile.id,
                    provider: AUTH_PROVIDER.GOOGLE,
                    email: profile.emails?.[0].value,
                    profile: {
                        create: {
                            username: profile.name.givenName,
                            profileImage: profile.photos?.[0].value,
                        },
                    },
                },
                include: {
                    profile: true,
                },
            });

            return done(null, createdUser);
        } catch (error) {
            console.log(error);
        }
    }
);

passport.use(googleLogin);
