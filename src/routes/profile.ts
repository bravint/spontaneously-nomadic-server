import { Router } from 'express';

import { createProfile, getProfile } from '../controllers/profile';

const router = Router();

router.post('/', createProfile);

router.get('/', getProfile);

export default router;
