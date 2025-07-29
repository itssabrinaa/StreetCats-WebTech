import { DataTypes } from "sequelize";
import { database } from "./Database.js";

export function createCommentModel() { 
    database.define('Comment', {
        id:  {
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        UserEmail: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}