import express from "express";
import { CatController } from "../controllers/CatController.js";
import { enforceAuthentication } from "../middleware/authMW.js";
import { upload } from "../middleware/uploadImageMW.js";
import { catValidation } from "../utils/validatorAndEscaper.js";
import { handleValidationErrors } from "../middleware/validationMW.js";
import { createHttpError } from "../utils/errorFormatter.js";
import { csrfMiddleware } from "../middleware/csrfMW.js";

export const catRouter = express.Router();

/**
 * @swagger
 *  /cats:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      description: Creazione avvistamento nuovo gatto
 *      produces:
 *        - application/json
 *      consumes:
 *        - multipart/form-data
 *      requestBody:
 *        description: dati dell'avvistamento del nuovo gatto
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                img:
 *                  type: file
 *                  description: Immagine del gatto
 *                title:
 *                  type: string
 *                  example: Gatto arancione!
 *                desc:
 *                  type: string
 *                  example: Il gatto **più bello** del mondo.
 *                lat:
 *                  type: number
 *                  example: 40.8522
 *                lon:
 *                  type: number
 *                  example: 14.2681
 *                _csrf:
 *                  type: string
 *                  example: 
 *      responses:
 *        200:
 *          description: Nuovo avvistamento di gatto salvato
 *        400:
 *          description: Richiesta non valida
 *        401:
 *          description: Utente non autorizzato. Inserire un token valido
 */
catRouter.post("/cats", 
          enforceAuthentication, upload.single('img'), catValidation, handleValidationErrors, csrfMiddleware,
        async (req, res, next) => {
  CatController.saveCat(req).then( result => {
    res.json({new_cat: `${result}`});
  }).catch(err => {
    next(createHttpError(err.status, err.message));
  });
});

/**
 * @swagger
 *  /cats:
 *    get:
 *      description: Recupero di tutti gli avvistamenti di gatti
 *      produces:
 *        - application/json
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _csrf:
 *                  type: string
 *                  example:
 *      responses:
 *        200:
 *          description: Avvistamenti di gatti recuperati correttamente
 */
catRouter.get("/cats", csrfMiddleware, async (req, res, next) => {
  CatController.getAllCats(req).then( result => {
    res.json({cats: `${result}`});
  }).catch(err => {
    next(createHttpError(err.status, err.message));
  });
});

/**
 * @swagger
 *  /cats/{id}:
 *    get:
 *      description: Recupero di tutti gli avvistamenti di gatti
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: id
 *         in: path
 *         description: ID del gatto da cercare
 *         required: true
 *         schema:
 *           type: integer
 *         requestBody:
 *           description: credenziali del nuovo utente
 *           required: true
 *           content:
 *              application/json:
 *           schema:
 *              type: object
 *              properties:
 *                _csrf:
 *                  type: string
 *                  example:
 *      responses:
 *        200:
 *          description: Contenuto dell'avvistamento del gatto con id richiesto e relativi commenti
 *        400:
 *          description: Richiesta non valida
 *        404:
 *          description: Il gatto con id richiesto non esiste
 */
catRouter.get("/cats/:id", csrfMiddleware, async (req, res, next) => {
  CatController.getCat(req).then( result => {
    res.json(result);
  }).catch(err => {
    next(createHttpError(err.status, err.message));
  });
});


//ATTENZIONE!!! USARE QUESTA SOLO IN FASE DI SVILUPPO 
/**
 * @swagger
 *  /cats:
 *    delete:
 *      description: Elimina tutti gli avvistamenti di gatti
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
 *                _csrf:
 *                  type: string
 *                  example:
 *      responses:
 *        200:
 *          description: Tutti gli avvistamenti eliminati
 */
catRouter.delete("/cats", csrfMiddleware, async (req, res, next) => {
  CatController.deleteAllCats().then(count => {
    res.json({ message: `${count} gatti eliminati.` });
  })
  .catch(err => {
    next(createHttpError(err.status, err.message));
  });
}); 
