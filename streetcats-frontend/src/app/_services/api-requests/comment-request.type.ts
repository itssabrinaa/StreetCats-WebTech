export interface Comment {
    id: number;
    comment: string,
    UserEmail: string,
    createdAt: string,
    updatedAt: string,
    CatId: number
}

export interface CommentRequest{
    comment: string,
    catId: number
}

export interface CommentResponse {
    new_comment: Comment;
}

