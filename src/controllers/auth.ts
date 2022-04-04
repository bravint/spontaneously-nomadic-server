import { Request, Response } from 'express';

import { createToken } from '../utils/jsonwebtoken';
import { prisma } from '../utils/prisma';
import { hashPassword } from '../utils/bcrypt';

import { CLIENT_URL, COOKIE_NAME } from '../utils/config';
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

    res.cookie(COOKIE_NAME.TOKEN, token, { httpOnly: true, maxAge: 1000*60 });

    res.redirect(CLIENT_URL.SUCCESS);
};

export const returnUserToClient = async (req: Request, res: Response) => {
    const { user }: any = req;

    const sanitisedUser: ISanitisedUser = sanitiseUser(user);

    const token: string = createToken({ id: sanitisedUser.id });

    res.status(200).json({ data: sanitisedUser, token: token });
};

export const userRegister = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    const hashedPassword = await hashPassword(password);

    let createdUser: IUserFromDatabase = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword,
            email: email,
        },
    });

    const sanitisedUser: ISanitisedUser = sanitiseUser(createdUser);

    const token: string = createToken({ id: sanitisedUser.id });

    res.status(200).json({ data: sanitisedUser, token: token });
};
