import { DataTypes } from "sequelize";
import argon2 from "argon2";
import { database } from "./Database.js";

export function createUserModel() { 
  database.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await argon2.hash(user.password);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await argon2.hash(user.password);
        }
      }
    }
  });
}