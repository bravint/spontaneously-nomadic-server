export interface googleProfile {}

export interface IUserFromDatabase {
    createdAt: Date;
    email: string;
    id: number;
    oAuthId: string | null;
    password: string | null;
    provider: string | null;
    role: string;
    updatedAt: Date;
    username: string | null;
}

export interface ISanitisedUser {
    email: string | null;
    id: number;
    role: string;
    username: string | null;
}
