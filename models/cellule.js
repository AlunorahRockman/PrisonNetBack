import sequelize from "sequelize"
import database from "../database/database.js"

const {DataTypes} = sequelize

const Cellule = database.define('cellule', { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    numero: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false 
    },
    capaciteMax: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    superficie: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    statut: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Cellule