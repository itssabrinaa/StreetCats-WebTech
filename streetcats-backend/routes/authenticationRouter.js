import express from "express";
import { AuthController } from "../controllers/AuthController.js";
import { loginValidation, signupValidation } from "../utils/validatorAndEscaper.js";
import { handleValidationErrors } from "../middleware/validationMW.js";
import { createHttpError } from "../utils/errorFormatter.js";

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
 *        409:
 *          description: Utente già registrato con quell'email
 */
authenticationRouter.post("/signup", signupValidation, handleValidationErrors, (req, res, next) => {
  AuthController.saveUser(req, res).then((user) => {
    res.json({ name: `${user.name}`});
  }).catch((err) => {
    if(err.status === 400 || err.status === 409){
      next(createHttpError(err.status, err.message));
    }else{
      next(createHttpError(500, "Impossibile effettuare la registrazione. Riprovare."));
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
 *        400:
 *          description: Richiesta non valida
 *        401:
 *          description: Credenziali errate
 */
authenticationRouter.post("/login", loginValidation, handleValidationErrors, async (req, res, next) => {
  let isAuthenticated = await AuthController.checkCredentials(req, res);

  if(isAuthenticated){
    res.json({jwt: `${AuthController.issueToken(isAuthenticated.email, isAuthenticated.name)}`});
  } else {
    next(createHttpError(401, "Credenziali errate. Riprovare."));
  }
});