import jwt from 'jsonwebtoken';

import { SECRET } from './config';

export const createToken = (payload: any) => jwt.sign(payload, SECRET);
