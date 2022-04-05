import { Router } from 'express';

import { createLocation, getLocationsByUser, editLocation, deleteLocation } from '../controllers/location';
import { callPassportJwt } from '../utils/passport/middleware/jwt';

import '../utils/passport/strategy/jwt';

const router = Router();

router.post('/', callPassportJwt, createLocation);

router.get('/', callPassportJwt, getLocationsByUser);

router.post('/:id', callPassportJwt, editLocation);

router.delete('/:id', callPassportJwt, deleteLocation);

export default router;
