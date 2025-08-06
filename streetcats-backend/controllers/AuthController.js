import { User } from "../models/Database.js";
import argon2 from "argon2";
import Jwt from "jsonwebtoken";

import 'dotenv/config.js';

import { isPwdValid } from "../utils/passwordValidator.js";
import { createHttpError } from "../utils/errorFormatter.js";


export class AuthController {

    static issueToken(email, name){
        return Jwt.sign({email: email, name: name}, process.env.SC_JWT_TOKEN_SECRET, {expiresIn: `${24*60*60}s`});
    }

    static isTokenValid(token, callback){
        Jwt.verify(token, process.env.SC_JWT_TOKEN_SECRET, callback);
    }

    static async saveUser(req, res){
        let user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if(user){   throw createHttpError(409, "Utente già registrato con quell'email.");   }

        if (!req.body.name || !req.body.email || !req.body.pwd) {
            throw createHttpError(400, "Tutti i campi sono obbligatori.");
        }
        if(!isPwdValid(req.body.pwd)){  throw createHttpError(400, "La password non rispetta il formato giusto.");  }

        return User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.pwd
        });
    }

    static async checkCredentials(req, res){
        let user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if(!user){  return false;   }

        const isValid = await argon2.verify(user.password, req.body.pwd);
        if(isValid){
            return user;
        }
        return null;
    }

    static async getUserName(email){
        let user = await User.findOne({
            where: {
                email: email
            }
        });

        if(!user){  return null;   }
        return user.name;
    }

    
}