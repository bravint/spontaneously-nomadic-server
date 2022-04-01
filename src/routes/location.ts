import { Router } from 'express';

import { createLocation, getLocationsByUser } from '../controllers/location';

const router = Router();

router.post('/', createLocation);

router.get('/', getLocationsByUser);

export default router;
