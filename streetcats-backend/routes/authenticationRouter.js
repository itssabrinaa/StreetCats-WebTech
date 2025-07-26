import express from "express";
import { AuthController } from "../controllers/AuthController";

export const authenticationRouter = express.Router();

/**
 * @swagger
 *  /signup:
 *    post:
 *      description: Sign up per un nuovo utente
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: credenziali del nuovo utente
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: Sabri
 *                email:
 *                  type: string
 *                  example: email@provider.it
 *                pwd:
 *                  type: string
 *                  example: MyP4ssword!
 *      responses:
 *        200:
 *          description: Nuovo utente registrato
 *        400:
 *          description: Credenziali non valide
 */
authenticationRouter.post("/signup", (req, res, next) => {
  AuthController.saveUser(req, res).then((user) => {
    res.json(user);
  }).catch((err) => {
    if(err.status === 400){
      next(err)
    }else{
      next({status: 500, message: "Impossibile effettuare la registrazione. Riprovare."});
    }
  })
});

/**
 * @swagger
 *  /login:
 *    post:
 *      description: Log in per un utente esistente
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: credenziali dell'utente esistente
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  example: email@provider.it
 *                pwd:
 *                  type: string
 *                  example: MyP4ssword!
 *      responses:
 *        200:
 *          description: L'utente ha effettuato il log in
 *        401:
 *          description: Credenziali errate
 */
authenticationRouter.post("/login", async (req, res, next) => {
  let isAuthenticated = await AuthController.checkCredentials(req, res);

    if(isAuthenticated){
      res.json(AuthController.issueToken(req.body.email));
    } else {
      return next({status: 401, message: "Credenziali errate. Riprovare."});
    }
});