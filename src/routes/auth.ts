import passport from 'passport';
import { Router } from 'express';

import { returnUserToClient, completeOAuth, userRegister } from '../controllers/auth';
import { validateLoginRequest, callPassportLocal } from '../utils/middleware/local';
import { callPassportJwt } from '../utils/middleware/jwt';

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

router.post('/login', validateLoginRequest, callPassportLocal, returnUserToClient);

router.post('/register', userRegister);

router.get('/user', callPassportJwt, returnUserToClient);

export default router;
