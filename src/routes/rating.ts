import { Router } from 'express';

import { createRating, getRatingsByLocation } from '../controllers/rating';
import { callPassportJwt } from '../utils/passport/middleware/jwt';

import '../utils/passport/strategy/jwt';

const router = Router();

router.post('/',callPassportJwt, createRating);

router.get('/',callPassportJwt, getRatingsByLocation);

export default router;
