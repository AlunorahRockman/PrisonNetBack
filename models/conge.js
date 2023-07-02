import sequelize from "sequelize"
import database from "../database/database.js"

const {DataTypes} = sequelize

const Conge = database.define('conges', { 
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idPersonnel: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dateFin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    motif: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
})


export default Conge