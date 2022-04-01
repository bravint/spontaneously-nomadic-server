import { Request, Response } from 'express';

import { createToken } from '../utils/jsonwebtoken';

import { CLIENT_URL } from '../utils/config';

export const completeOAuth = (req: Request, res: Response) => {
    const { user }: any = req;

    const token: string = createToken({ id: user.id });
    
    console.log('completeOAuth', token);

    res.cookie('token', token, { httpOnly: true });

    res.redirect(CLIENT_URL.ROOT);
};