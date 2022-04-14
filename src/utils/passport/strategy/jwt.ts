import passport from 'passport';
import { Request } from 'express';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { prisma } from '../../prisma';
import { SECRET } from '../../config';
import { IUserFromDatabase } from '../../types';

const cookieExtractor = (req: Request) => {
    let jwt: string = '';

    if (req && req.cookies) {
        jwt = req.cookies['token'];
    }

    return jwt;
};

const options = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]),
    secretOrKey: SECRET,
};

const jwt = new JwtStrategy(options, async (payload, callback) => {
    try {
        const selectedUser : IUserFromDatabase | null = await prisma.user.findUnique({
            where: {
                id: Number(payload.id),
            },
            include: {
                profile: true,
            }
        });

        if (!selectedUser) {
            callback('error');
        }

        callback(null, selectedUser);
    } catch (error) {
        callback('error');
    }
});

passport.use(jwt);
