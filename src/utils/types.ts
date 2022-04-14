export interface IUserFromDatabase {
    email: string;
    id: number;
    oAuthId: string | null;
    password: string | null;
    provider: string | null;
    role: string;
    profile: Array<IProfileFromDatabase>;
    createdAt: Date;
    updatedAt: Date;
}
interface IProfileFromDatabase {
    id: number;
    userId: number;
    username: string | null;
    profileImage: string | null;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface ISanitisedUser {
    id: number;
    username: string | null;
    profileImage: string | null;
    bio: string | null;
}

export interface ILocationFromDatabase {
    id: number;
    name: string;
    lng: number;
    lat: number;
    userId: number | null;
    rating: Array<IRatingFromDatabase>;
    createdAt: Date;
    updatedAt: Date;
}

interface IRatingFromDatabase {
    id: number;
    ratings: number;
    userId: number;
    locationId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ISanitisedLocation {
    id: number;
    name: string;
    lng: number;
    lat: number;
    userId: number | null;
    rating: number;
    ratingId: number;
}

