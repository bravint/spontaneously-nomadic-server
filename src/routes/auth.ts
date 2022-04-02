import passport from 'passport';
import { Router } from 'express';

import { returnUserToClient, completeOAuth, userRegister } from '../controllers/auth';
import { callPassportLocal } from '../utils/passport/middleware/local';
import { callPassportJwt } from '../utils/passport/middleware/jwt';

import { CLIENT_URL } from '../utils/config';

import '../utils/passport/strategy/google';
import '../utils/passport/strategy/local';
import '../utils/passport/strategy/jwt';

const router = Router();

router.get('/google', passport.authenticate('google'));

router.get(
    '/google/redirect',
    passport.authenticate('google', {
        failureRedirect: CLIENT_URL.LOGIN,
        session: false,
    }),
    completeOAuth
);

router.post('/login', callPassportLocal, returnUserToClient);

router.post('/register', userRegister);

router.get('/user', callPassportJwt, returnUserToClient);

export default router;
