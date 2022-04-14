import { faker } from '@faker-js/faker';

import { locations } from './locations';

export const genRandomNumberInRange = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomLocation = () => genRandomNumberInRange(0, 244);

const generateRandomRating = () => genRandomNumberInRange(1, 5);

export const fakeUser = () => {
    const email: string = faker.internet.email();
    const password: string = faker.internet.password();
    const username: string = faker.internet.userName();
    const profileImage: string = faker.image.avatar();

    const fakeUser = {
        email: email,
        password: password,
        username: username,
        profileImage: profileImage,
    };

    return fakeUser;
};

export const testUser = () => {
    const email: string = 'test@mail.com';
    const password: string = 'password';
    const username: string = 'Test';
    const profileImage: string = faker.image.avatar();

    const testUser = {
        email: email,
        password: password,
        username: username,
        profileImage: profileImage,
    };

    return testUser;
};

export const fakeLocation = () => {
    const location = locations[generateRandomLocation()];
    const rating: number = generateRandomRating();

    const fakeLocation = {
        name: location.name,
        lat: Number(location.lat),
        lng: Number(location.lng),
        rating: rating * 20,
    };

    return fakeLocation;
};
