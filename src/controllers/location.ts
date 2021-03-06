import { Request, Response } from 'express';

import { prisma } from '../utils/prisma';

import { ILocationFromDatabase, ISanitisedLocation } from '../utils/types';
import { createLocationSchema, editLocationSchema } from '../utils/joi';

const sanitiseLocation = (location: ILocationFromDatabase): ISanitisedLocation => {
    const sanitisedLocation = {
        id: location.id,
        name: location.name,
        lng: location.lng,
        lat: location.lat,
        userId: location.userId,
        rating: location.rating[0].ratings,
        ratingId: location.rating[0].id,
    };

    return sanitisedLocation;
};

export const createLocation = async (req: Request, res: Response) => {
    const { error } = createLocationSchema.validate(req.body);

    if (error) {
        console.log(error);
        return res.status(400).json({ error: error.details[0].message });
    }

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

    const sanitisedLocation = sanitiseLocation(createdLocation);

    res.status(200).json({ data: sanitisedLocation });
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

    const sanitisedLocations = selectedLocations.map((location) => sanitiseLocation(location));

    res.status(200).json({ data: sanitisedLocations });
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

    const sanitisedLocations = selectedLocations.map((location) => sanitiseLocation(location));

    res.status(200).json({ data: sanitisedLocations });
};

export const editLocation = async (req: Request, res: Response) => {
    const { error } = editLocationSchema.validate(req.body);

    if (error) {
        console.log(error);
        return res.status(400).json({ error: error.details[0].message });
    }

    const { user }: any = req;

    const { id }: any = req.params;

    const { name, lng, lat, rating, ratingId } = req.body;

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

    const sanitisedLocation = sanitiseLocation(editedLocation);

    res.status(201).json({ data: sanitisedLocation });
};

export const deleteLocation = async (req: Request, res: Response) => {
    const { id }: any = req.params;

    const deletedLocation = await prisma.location.delete({
        where: {
            id: Number(id),
        },
        include: {
            rating: true,
        },
    });

    const sanitisedLocation = sanitiseLocation(deletedLocation);

    res.status(201).json({ data: sanitisedLocation });
};
