import { Sequelize } from "sequelize";
import 'dotenv/config.js';

import { createUserModel } from './User.js';
import { createCatModel } from './Cat.js';
import { createCommentModel } from './Comment.js';

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
  dialect: process.env.DB_DIALECT
});

createUserModel();
createCatModel();
createCommentModel();

export const {User, Cat, Comment} = database.models;

User.hasMany(Cat);
Cat.belongsTo(User);

Cat.hasMany(Comment);
Comment.belongsTo(Cat);

User.hasMany(Comment);
Comment.belongsTo(User);


database.sync()
  .then(() => {
    console.log("DATABASE -> Tabelle sincronizzate con successo.");
  })
  .catch(err => {
    console.error("DATABASE -> Errore nella sincronizzazione:", err);
  });

