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
            userId: Number(user.id),
            rating: {
                create: {
                    ratings: rating,
                    userId: Number(user.id),
                },
            },
        },
        include: {
            rating: true,
        },
    });

    if (!createdLocation) {
        return res.sendStatus(500);
    }

    res.status(200).json({ data: createdLocation });
};

export const getLocations = async (req: Request, res: Response) => {
    const { user }: any = req;

    const selectedLocations = await prisma.location.findMany({
        where: {
            userId: Number(user.id),
        },
        include: {
            rating: true,
        },
    });

    res.status(200).json({ data: selectedLocations });
};

export const getLocationsByUser = async (req: Request, res: Response) => {
    const { id }: any = req.params;

    const selectedLocations = await prisma.location.findMany({
        where: {
            userId: Number(id),
        },
        include: {
            rating: true,
        },
    });

    res.status(200).json({ data: selectedLocations });
};

export const editLocation = async (req: Request, res: Response) => {
    const { user }: any = req;

    const { id }: any = req.params;

    const { name, lng, lat, rating, ratingId } = req.body;

    console.log(name, lng, lat, rating);

    const editedLocation = await prisma.location.update({
        where: {
            id: Number(id),
        },
        data: {
            name: name,
            lng: lng,
            lat: lat,
            userId: Number(user.id),
            rating: {
                update: {
                    where: {
                        id: Number(ratingId),
                    },
                    data: {
                        ratings: rating,
                        userId: Number(user.id),
                    },
                },
            },
        },
        include: {
            rating: true,
        },
    });

    console.log('editedLocation', editedLocation);

    res.status(201).json({ data: editedLocation });
};

export const deleteLocation = async (req: Request, res: Response) => {
    const { id }: any = req.params;

    const deletedLocation = await prisma.location.delete({
        where: {
            id: Number(id),
        },
    });

    res.status(201).json({ data: deletedLocation });
};
