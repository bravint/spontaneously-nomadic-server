import { Request, Response } from 'express';

import { prisma } from '../utils/prisma';

export const createRating = async (req: Request, res: Response) => {
    const { rating, locationId, userId } = req.body;

    const createdRating = await prisma.rating.create({
        data: {
            ratings: rating,
            userId: Number(userId),
            locationId: Number(locationId),
        },
    });

    res.status(200).json({ data: createdRating });
};

export const getRatingsByLocation = async (req: Request, res: Response) => {
    const { id } = req.body;

    const fetchedRatings = await prisma.rating.findMany({
        where: {
            locationId: Number(id),
        },
    });

    res.status(200).json({ data: fetchedRatings });
};

export const editRating = async (req: Request, res: Response) => {
    const { rating, id } = req.body;

    const updatedRating = await prisma.rating.update({
        where: {
            id: Number(id),
        },
        data: {
            ratings: rating,
        },
    });
};
