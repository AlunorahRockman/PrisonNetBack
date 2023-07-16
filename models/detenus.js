import sequelize from "sequelize"
import database from "../database/database.js"

const {DataTypes} = sequelize

const Detenus = database.define('detenus', { 
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateNaissance: {
        type: DataTypes.DATE,
        allowNull: false
    },
    sexe: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nationnalite: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dureePeine: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    dateVenue: {
        type: DataTypes.DATE,
        allowNull: false
    },
    raison: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    statut: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
})


export default Detenus