export interface CatInfo {
    id: number;
    title: string;
    createdAt: string;
}

export interface User{
    name: string;
    email: string;
    createdAt: string;
    Cats: CatInfo[];
    commentsLeft: number;
    commentsReceived: number;
}

export interface UsersMeResponse{
    user: User;
}