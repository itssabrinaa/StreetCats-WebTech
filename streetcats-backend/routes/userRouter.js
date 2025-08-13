import express from "express";
import { enforceAuthentication } from "../middleware/authMW.js";
import { UserController } from "../controllers/UserController.js";
import { createHttpError } from "../utils/errorFormatter.js";

export const userRouter = express.Router();

/**
 * @swagger
 *  /users/me:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      description: Recupero dati dell'utente
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Dati dell'utente
 *        400:
 *          description: Richiesta non valida
 *        401:
 *          description: Utente non autorizzato. Inserire un token valido
 *        404:
 *          description: Utente non trovato
 */
userRouter.get("/users/me", enforceAuthentication, (req, res, next) => {
  UserController.getUserData(req).then( result => {
    res.json({user: result});
  }).catch(err => {
    next(createHttpError(err.status, err.message));
  });
});