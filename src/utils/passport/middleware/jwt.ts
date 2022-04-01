import passport from 'passport';

export const callPassportJwt = passport.authenticate('jwt', { session: false });
