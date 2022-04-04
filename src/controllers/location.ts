import { Request, Response } from 'express';

import { prisma } from '../utils/prisma';

export const createLocation = async (req: Request, res: Response) => {
    const { name, lng, lat, rating } = req.body;

    const { user }: any = req;

    const createdLocation = await prisma.location.create({
        data: {
            name: name,
            lng: lng,
            lat: lat,
            userId: user.id,
            rating: {
                create: {
                    ratings: rating,
                    userId: user.id,
                },
            },
        },
        include: {
            rating: true,
        },
    });

    if (!createdLocation) {
        return res.sendStatus(500)
    }

    res.status(200).json({ data: createdLocation });
};

export const getLocationsByUser = async (req: Request, res: Response) => {
    const { user }: any = req;

    const selectedLocations = await prisma.location.findMany({
        where: {
            userId: user.id,
        },
        include: {
            rating: true,
        },
    });

    res.status(200).json({ data: selectedLocations });
};
