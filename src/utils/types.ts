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
    profile: any
}

export interface ISanitisedUser {
    id: number,
    email: string | null;  
    role: string;
    username: string | null;
    profileImage: string | null;
}
