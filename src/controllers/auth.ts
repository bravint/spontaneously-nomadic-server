import { Request, Response } from 'express';

import { createToken } from '../utils/jsonwebtoken';

import { CLIENT_URL } from '../utils/config';
import { IUserFromDatabase, ISanitisedUser } from '../utils/types';

const sanitiseUser = (user: IUserFromDatabase) => {
    const sanitisedUser: ISanitisedUser = {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
    };

    return sanitisedUser;
};

export const completeOAuth = (req: Request, res: Response) => {
    const { user }: any = req;

    const token: string = createToken({ id: user.id });

    res.cookie('token', token, { httpOnly: true });

    res.redirect(CLIENT_URL.ROOT);
};

export const returnUserToClient = async (req: Request, res: Response) => {
    const { user }: any = req;

    const sanitisedUser: ISanitisedUser = sanitiseUser(user);

    const token: string = createToken({ id: sanitisedUser.id });

    res.status(200).json({ data: sanitisedUser, token: token });
};