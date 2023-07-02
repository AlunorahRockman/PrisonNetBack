import sequelize from "sequelize";
import database from "../database/database.js";

const {DataTypes} = sequelize

const Personnel = database.define('personnels', { 
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        idUser: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        departement: {
            type: DataTypes.STRING,
            allowNull: false
        },
        poste: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salaire: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        dateEmbauche: {
            type: DataTypes.DATE,
            allowNull: false
        },
        statut: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }

    })

export default Personnel