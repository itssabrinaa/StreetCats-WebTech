import express from "express";
import { CatController } from "../controllers/CatController.js";
import { enforceAuthentication } from "../middleware/authMW.js";
import { upload } from "../middleware/uploadImageMW.js";

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
 *      responses:
 *        200:
 *          description: Nuovo avvistamento di gatto salvato
 *        401:
 *          description: Utente non autorizzato. Inserire un token valido
 */
catRouter.post("/cats", enforceAuthentication, upload.single('img'), (req, res, next) => {
  CatController.saveCat(req).then( result => {
    res.json(result);
  }).catch(err => {
    next(err);
  });
});

/**
 * @swagger
 *  /cats:
 *    get:
 *      description: Recupero di tutti gli avvistamenti di gatti
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Avvistamenti di gatti recuperati correttamente
 */
catRouter.get("/cats", (req, res, next) => {
  CatController.getAllCats(req).then( result => {
    res.json(result);
  }).catch(err => {
    next(err);
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
 *      responses:
 *        200:
 *          description: Contenuto dell'avvistamento del gatto con id richiesto e relativi commenti
 *        404:
 *          description: Il gatto con id richiesto non esiste
 */
catRouter.get("/cats/:id", (req, res, next) => {
  CatController.getCat(req).then( result => {
    res.json(result);
  }).catch(err => {
    next(err);
  });
});


// //ATTENZIONE!!! USARE QUESTA SOLO IN FASE DI SVILUPPO PER TEST
// /**
//  * @swagger
//  *  /cats:
//  *    delete:
//  *      description: Elimina tutti gli avvistamenti di gatti
//  *      responses:
//  *        200:
//  *          description: Tutti gli avvistamenti eliminati
//  */
// catRouter.delete("/cats", (req, res, next) => {
//   CatController.deleteAllCats().then(count => {
//       res.json({ message: `${count} gatti eliminati.` });
//     })
//     .catch(err => {
//       next(err);
//     });
// }); 
