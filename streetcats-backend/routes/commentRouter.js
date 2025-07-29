import express from "express";
import { CommentController } from "../controllers/CommentController.js";
import { enforceAuthentication } from "../middleware/authMW.js";

export const commentRouter = express.Router();


/**
 * @swagger
 *  /comment:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      description: Creazione avvistamento nuovo gatto
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: dati del nuovo commento e id dell'avvistamento da commentare
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                comment:
 *                  type: string
 *                  example: cat.jpg
 *                catId:
 *                  type: number
 *                  example: 1
 *      responses:
 *        200:
 *          description: Nuovo commento salvato
 *        401:
 *          description: Utente non autorizzato. Inserire un token valido
 */
commentRouter.post("/comment", enforceAuthentication, (req, res, next) => {
  CommentController.saveComment(req).then( result => {
    res.json(result);
  }).catch(err => {
    next(err);
  });
});
