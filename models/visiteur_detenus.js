import sequelize from "sequelize"
import database from "../database/database.js"

const {DataTypes} = sequelize

const VisiteurDetenus = database.define('visiteur_detenus', { 
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idVisiteur: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    idDetenus: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
})


export default VisiteurDetenus