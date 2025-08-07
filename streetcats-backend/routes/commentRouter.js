import express from "express";
import { CommentController } from "../controllers/CommentController.js";
import { enforceAuthentication } from "../middleware/authMW.js";
import { commentValidation } from "../utils/validatorAndEscaper.js";
import { handleValidationErrors } from "../middleware/validationMW.js";
import { createHttpError } from "../utils/errorFormatter.js";

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
 *                  example: è davvero un bel gatto
 *                catId:
 *                  type: number
 *                  example: 1
 *      responses:
 *        200:
 *          description: Nuovo commento salvato
 *        400:
 *          description: Richiesta non valida
 *        401:
 *          description: Utente non autorizzato. Inserire un token valido
 */
commentRouter.post("/comment", 
            enforceAuthentication, commentValidation, handleValidationErrors,
            (req, res, next) => {
  CommentController.saveComment(req).then( result => {
    res.json({new_comment: result});
  }).catch(err => {
    next(createHttpError(err.status, err.message));
  });
});
