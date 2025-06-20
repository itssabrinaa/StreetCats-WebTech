import { DataTypes } from "sequelize";
import { database } from "./Database.js";

export function createCommentModel() { 
    database.define('Comment', {
        id:  {
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}