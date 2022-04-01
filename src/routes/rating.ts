import { Router } from 'express';

import { createRating, getRatingsByLocation } from '../controllers/rating';

const router = Router();

router.post('/', createRating);

router.get('/', getRatingsByLocation);

export default router;
