import { Router } from 'express';

import { createFollow, deleteFollow, getFollowingByUser } from '../controllers/follow';
import { callPassportJwt } from '../utils/passport/middleware/jwt';

import '../utils/passport/strategy/jwt';

const router = Router();

router.get('/',callPassportJwt, getFollowingByUser);

router.post('/',callPassportJwt, createFollow);

router.delete('/:id',callPassportJwt, deleteFollow);

export default router;
