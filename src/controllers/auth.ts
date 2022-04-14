import { Request, Response } from 'express';

import { createToken } from '../utils/jsonwebtoken';
import { prisma } from '../utils/prisma';
import { hashPassword } from '../utils/bcrypt';
import { registerSchema } from '../utils/joi';

import { CLIENT_URL, COOKIE_NAME } from '../utils/config';
import { IUserFromDatabase, ISanitisedUser } from '../utils/types';

const sanitiseUser = (user: IUserFromDatabase) : ISanitisedUser =>  {
    const sanitisedUser: ISanitisedUser = {
        id: user.id,
        username: user.profile[0].username,
        profileImage: user.profile[0].profileImage,
        bio: user.profile[0].bio,
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
    const { error } = registerSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0] });
    }

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
