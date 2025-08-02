import { Cat, Comment } from "../models/Database.js";

import { createHttpError } from "../utils/errorFormatter.js";
const BASE_IMAGE_URL = 'http://localhost:3000/cat-images/';

export class CatController {
    
    static async getAllCats(){
        const cats = await Cat.findAll();
        return cats.map(cat => ({
            ...cat.toJSON(),
            imgUrl: BASE_IMAGE_URL + cat.img
        }));
    }

    static async saveCat(req){
        if (!req.file) {
            throw createHttpError(400, "Nessun file fornito per l'immagine.");
        }
        return Cat.create({
            img: req.file.filename,
            title: req.body.title,
            desc: req.body.desc,
            lat: req.body.lat,
            lon: req.body.lon,
            UserEmail: req.userEmail
        });
    }

    static async getCat(req){
        const cat = await Cat.findByPk(req.params.id, {
            include:  [{
                model: Comment,
                attributes: ['id', 'UserEmail', 'comment', 'createdAt'],
                order: [ ['createdAt', 'ASC'] ]
            }]
        });

        if (!cat) {  throw createHttpError(404, "Stai cercando un gatto che non esiste!");   }
        
        const catData = cat.toJSON();
        catData.img = BASE_IMAGE_URL + catData.img;
        return catData;
    }

    static async deleteAllCats() {
        if(process.env.SC_IS_DEVELOPMENT !== "true"){
            throw createHttpError(401, "Ops! Non sei autorizzato a effettuare quest'operazione!");
        }
        
        return Cat.destroy({ where: {}, individualHooks: true });
    }
}