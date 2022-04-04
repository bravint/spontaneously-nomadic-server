import { Request, Response } from 'express';

import { prisma } from '../utils/prisma';

export const createLocation = async (req: Request, res: Response) => {
    const { name, lng, lat, rating } = req.body;

    const { user }: any = req;

    console.log(req.user);

    const createdLocation = await prisma.location.create({
        data: {
            name: name,
            lng: lng,
            lat: lat,
            rating: {
                create: {
                    ratings: rating,
                    userId: user.id,
                },
            },
        },
        include: {
            rating: true
        }
    });

    res.status(200).json({ data: createdLocation });
};

export const getLocationsByUser = async (req: Request, res: Response) => {
    const { id } = req.body;

    const selectedLocations = await prisma.location.findMany({
        where: {
            users: {
                some: {
                    user: {
                        id: Number(id),
                    },
                },
            },
        },
        include: {
            rating: true,
        },
    });

    res.status(200).json({ data: selectedLocations });
};
