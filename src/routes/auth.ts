import passport from 'passport';
import { Router } from 'express';

import { completeOAuth } from '../controllers/auth';

import { CLIENT_URL } from '../utils/config';

import '../utils/passport/strategy/google';


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

export default router;