import { Request, Response } from 'express';

import { createToken } from '../utils/jsonwebtoken';
import { prisma } from '../utils/prisma';
import { hashPassword } from '../utils/bcrypt';

import { CLIENT_URL, COOKIE_NAME } from '../utils/config';
import { IUserFromDatabase, ISanitisedUser } from '../utils/types';

const sanitiseUser = (user: IUserFromDatabase) => {
    const sanitisedUser: ISanitisedUser = {
        id: user.id,
        email: user.email,
        role: user.role,
        username: user.profile[0].username,
        profileImage: user.profile[0].profileImage,
    };

    return sanitisedUser;
};

export const completeOAuth = (req: Request, res: Response) => {
    const { user }: any = req;

    const token: string = createToken({ id: user.id });

    res.cookie(COOKIE_NAME.TOKEN, token, { httpOnly: true, maxAge: 1000 * 60 });

    res.redirect(CLIENT_URL.SUCCESS);
};

export const returnUserToClient = async (req: Request, res: Response) => {
    const { user }: any = req;

    const sanitisedUser = sanitiseUser(user);

    const token: string = createToken({ id: sanitisedUser.id });

    res.status(200).json({ data: sanitisedUser, token: token });
};

export const userRegister = async (req: Request, res: Response) => {
    const { password, email, username, profileImage } = req.body;

    const hashedPassword = await hashPassword(password);

    let createdUser: any = await prisma.user.create({
        data: {
            password: hashedPassword,
            email: email,
            profile: {
                create: {
                    username: username,
                    profileImage: profileImage,
                },
            },
        },
        include: {
            profile: true,
        },
    });

    const sanitisedUser = sanitiseUser(createdUser);

    const token: string = createToken({ id: sanitisedUser.id });

    res.status(200).json({ data: sanitisedUser, token: token });
};
