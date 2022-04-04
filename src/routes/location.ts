import { Router } from 'express';

import { createLocation, getLocationsByUser } from '../controllers/location';
import { callPassportJwt } from '../utils/passport/middleware/jwt';

import '../utils/passport/strategy/jwt';

const router = Router();

router.post('/', callPassportJwt, createLocation);

router.get('/', callPassportJwt, getLocationsByUser);

export default router;
