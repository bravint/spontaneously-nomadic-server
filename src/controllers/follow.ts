import { Request, Response } from 'express';

import { prisma } from '../utils/prisma';
import { IUserFromDatabase, ISanitisedUser } from '../utils/types';

export const createFollow = async (req: Request, res: Response) => {
    const { user }: any = req;

    const { followingId } = req.body;

    const createdFollow = await prisma.user.update({
        where: {
            id: followingId,
        },
        data: {
            followedBy: {
                connect: {
                    id: user.id,
                },
            },
        },
    });

    const createdFollower = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            following: {
                connect: {
                    id: followingId,
                },
            },
        },
    });

    res.status(200).json({ data: createdFollower });
};

export const getFollowingByUser = async (req: Request, res: Response) => {
    const { user }: any = req;

    const selectedFollowers = await prisma.user.findMany({
        where: {
            id: user.id,
        },
        include: {
            following: {
                include: {
                    profile: true,
                },
            },
        },
    });

    const { following } = selectedFollowers[0];

    const sanitiseUser = (user: IUserFromDatabase) => {
        const sanitisedUser: ISanitisedUser = {
            id: user.id,
            username: user.profile[0].username,
            profileImage: user.profile[0].profileImage,
        };

        return sanitisedUser;
    };

    const sanitisedFollowers = following.map((follow) => sanitiseUser(follow));

    res.status(200).json({ data: sanitisedFollowers });
};

export const deleteFollow = (req: Request, res: Response) => {};
