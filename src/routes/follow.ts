import { Router } from 'express';

import { createFollow, deleteFollower, getFollowingByUser } from '../controllers/follow';
import { callPassportJwt } from '../utils/middleware/jwt';

import '../utils/passport/strategy/jwt';

const router = Router();

router.get('/',callPassportJwt, getFollowingByUser);

router.post('/',callPassportJwt, createFollow);

router.delete('/:id',callPassportJwt, deleteFollower);

export default router;
