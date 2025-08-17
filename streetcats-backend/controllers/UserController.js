import { Cat, Comment, User } from "../models/Database.js";

import { createHttpError } from "../utils/errorFormatter.js";

export class UserController {

    static async getUserData(req){
        const email = req.userEmail;

        const user = await User.findOne({
            where: { email: email },
            attributes: ['name', 'email', 'createdAt'],
            include: [
                {
                    model: Cat,
                    attributes: ['id', 'title', 'createdAt']
                }
            ],
            order: [[Cat, 'createdAt', 'DESC']]
        });

        if (!user) {
            throw createHttpError(404, "Utente non trovato."); 
        }

        const commentsLeftCount = await Comment.count({
            where: { UserEmail: email }
        });

        const commentsReceivedCount = await Comment.count({
            include: [
                {
                    model: Cat,
                    attributes: [],
                    where: { UserEmail: email }
                }
            ]
        });

        return {
            ...user.toJSON(),
            commentsLeft: commentsLeftCount,
            commentsReceived: commentsReceivedCount
        };
    }

}