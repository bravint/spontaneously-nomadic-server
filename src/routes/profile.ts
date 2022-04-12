import { Router } from 'express';

import { createProfile, getProfile } from '../controllers/profile';
import { callPassportJwt } from '../utils/middleware/jwt';

import '../utils/passport/strategy/jwt';

const router = Router();

router.post('/',callPassportJwt, createProfile);

router.get('/',callPassportJwt, getProfile);

export default router;
