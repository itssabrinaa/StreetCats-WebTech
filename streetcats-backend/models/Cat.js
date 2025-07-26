import { DataTypes } from "sequelize";
import { database } from "./Database.js";

export function createCatModel() {
    database.define('Cat', {
        id:  {
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        desc: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        lat: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        lon: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });
}
