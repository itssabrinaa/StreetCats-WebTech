import { Comment } from "../models/Database.js";

export class CommentController {

    static async saveComment(req){
        return Comment.create({
            comment: req.body.comment,
            CatId: req.body.catId,
            UserEmail: req.userEmail
        });
    }

}