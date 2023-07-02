import sequelize from "sequelize"
import database from "../database/database.js"

const {DataTypes} = sequelize

const Incident = database.define('incidents', { 
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idDetenus: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    idPersonnel: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    statut: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
})


export default Incident