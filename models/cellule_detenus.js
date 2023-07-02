import sequelize from "sequelize"
import database from "../database/database.js"

const {DataTypes} = sequelize

const CelluleDetenus = database.define('cellule_detenus', { 
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
    idCellele: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
})


export default CelluleDetenus