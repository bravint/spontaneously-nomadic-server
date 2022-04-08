export interface IUserFromDatabase {
    createdAt: Date;
    email: string;
    id: number;
    oAuthId: string | null;
    password: string | null;
    provider: string | null;
    role: string;
    updatedAt: Date;
    profile: any
}

export interface ISanitisedUser {
    id: number,
    username: string | null;
    profileImage: string | null;
}
