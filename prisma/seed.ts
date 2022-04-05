import { prisma } from '../src/utils/prisma';
import {
    fakeUser,
    fakeLocation,
    genRandomNumberInRange,
} from '../src/utils/fakerjs';

const USERS_TO_CREATE = 20;
const LOCATIONS_PER_USER = 20;

const seedDatabase = async () => {
    try {
        for (let i = 0; i < USERS_TO_CREATE; i++) {
            const newUser: any = fakeUser();

            const { password, email, username, profileImage } = newUser;

            const createdUser = await prisma.user.create({
                data: {
                    password: password,
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

            console.log('createdUser', createdUser);

            for (let i = 0; i < LOCATIONS_PER_USER; i++) {
                const newLocation = fakeLocation();

                const { name, lng, lat, rating } = newLocation;

                const { id }: any = createdUser;

                const createdLocation = await prisma.location.create({
                    data: {
                        name: name,
                        lng: lng,
                        lat: lat,
                        userId: Number(id),
                        rating: {
                            create: {
                                ratings: rating,
                                userId: Number(id),
                            },
                        },
                    },
                });

                console.log('createdLocation', createdLocation);
            }
        }
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

seedDatabase();
