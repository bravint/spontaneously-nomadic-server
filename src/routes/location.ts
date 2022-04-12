import { Router } from 'express';

import { createLocation, getLocations, getLocationsByUser, editLocation, deleteLocation } from '../controllers/location';
import { callPassportJwt } from '../utils/middleware/jwt';

import '../utils/passport/strategy/jwt';

const router = Router();

router.post('/', callPassportJwt, createLocation);

router.get('/', callPassportJwt, getLocations);

router.get('/:id', callPassportJwt, getLocationsByUser);

router.post('/:id', callPassportJwt, editLocation);

router.delete('/:id', callPassportJwt, deleteLocation);

export default router;
