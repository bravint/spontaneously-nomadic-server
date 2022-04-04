import { Router } from 'express';

import { createRating, editRating, getRatingsByLocation } from '../controllers/rating';
import { callPassportJwt } from '../utils/passport/middleware/jwt';

import '../utils/passport/strategy/jwt';

const router = Router();

router.post('/',callPassportJwt, createRating);

router.put('/:id',callPassportJwt, editRating);

router.patch('/:id',callPassportJwt, editRating);

router.get('/',callPassportJwt, getRatingsByLocation);

export default router;
