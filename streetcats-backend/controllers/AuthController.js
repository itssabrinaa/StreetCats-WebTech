import { User } from "../models/Database.js";
import argon2 from "argon2";
import Jwt from "jsonwebtoken";

import { isPwdValid } from "../utils/passwordValidator.js";


export class AuthController {

    static async saveUser(req, res){
        if (!req.body.name || !req.body.email || !req.body.pwd) {
            throw { status: 400, message: "Tutti i campi sono obbligatori." };
        }
        if(!isPwdValid(req.body.pwd)){
            throw { status: 400, message: "La password non rispetta il formato giusto." };
        }

        let user = new User({
            name: req.body.name, 
            email: req.body.email,
            password: req.body.pwd
        });
        return user.save();
    }

    static async checkCredentials(req, res){

        let user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if(!user){
            return false;
        }

        const isValid = await argon2.verify(user.password, req.body.pwd);

        return isValid;
    }

}