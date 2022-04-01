import { Request, Response } from 'express';

import { prisma } from '../utils/prisma';

export const createLocation = async (req: Request, res: Response) => {
    const { name, longitude, latitude } = req.body;

    const createdLocation = await prisma.location.create({
        data: {
            name: name,
            longitude: longitude,
            latitude: latitude,
        },
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
            ratings: true,
        },
    });

    res.status(200).json({ data: selectedLocations });
};

