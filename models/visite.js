import sequelize from "sequelize"
import database from "../database/database.js"

const {DataTypes} = sequelize

const Visite = database.define('visite', { 
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
    dateVisite: {
        type: DataTypes.DATE,
        allowNull: false
    }
})


export default Visite