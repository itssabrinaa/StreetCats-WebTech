export interface Comment {
    id: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    CatId: number;
    UserEmail: string;
    User?: {
        name: string;
    };
}

export interface CommentRequest{
    comment: string;
    catId: number;
}

export interface CommentResponse {
    new_comment: Comment;
}

