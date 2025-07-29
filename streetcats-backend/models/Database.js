import { Sequelize } from "sequelize";
import 'dotenv/config.js';

import { createUserModel } from './User.js';
import { createCatModel } from './Cat.js';
import { createCommentModel } from './Comment.js';

export const database = new Sequelize(process.env.SC_DB_CONNECTION_URI, {
  dialect: process.env.SC_DB_DIALECT
});

createUserModel();
createCatModel();
createCommentModel();

export const {User, Cat, Comment} = database.models;

Cat.belongsTo(User, {
  foreignKey: 'UserEmail',
  targetKey: 'email'
});
User.hasMany(Cat, {
  foreignKey: 'UserEmail',
  sourceKey: 'email'
});

Comment.belongsTo(Cat);
Cat.hasMany(Comment);

Comment.belongsTo(User, {
  foreignKey: 'UserEmail',
  targetKey: 'email'
});
User.hasMany(Comment, {
  foreignKey: 'UserEmail',
  sourceKey: 'email'
});


database.sync()
  .then(() => {
    console.log("DATABASE -> Tabelle sincronizzate con successo.");
  })
  .catch(err => {
    console.error("DATABASE -> Errore nella sincronizzazione:", err.message);
  });

