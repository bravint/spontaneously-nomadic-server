import { Request, Response } from 'express';

import { prisma } from '../utils/prisma';

export const createProfile = async (req: Request, res: Response) => {
    const { userId, profileImage, bio } = req.body;

    const createdProfile = await prisma.profile.create({
        data: {
            userId: Number(userId),
            profileImage: profileImage,
            bio: bio
        },
        include: {
            user: true,
        },
    });

    res.status(200).json({ data: createdProfile });
};

export const getProfile = async (req: Request, res: Response) => {
    const { id } = req.params;

    const selectedProfile = await prisma.user.findUnique({
        where: {
            id: Number(id),
        },
    });

    res.status(200).json({ data: selectedProfile });
};
