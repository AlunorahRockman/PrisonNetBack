import sequelize from "sequelize"
import database from "../database/database.js"
import Cellule from "./cellule.js"
import Detenus from "./detenus.js"

const {DataTypes} = sequelize

const CelluleDetenus = database.define('cellule_detenus', { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    celluleId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'cellules',
            key: 'id',  
        },
    }
})

// ! ***********************************

Detenus.hasOne(CelluleDetenus, {
    foreignKey: 'detenuId',
    allowNull: false
})

CelluleDetenus.belongsTo(Detenus);

// ! ***********************************

Cellule.hasOne(CelluleDetenus, {
    foreignKey: 'celluleId',
    allowNull: false
})

CelluleDetenus.belongsTo(Cellule);

// ! ***********************************


export default CelluleDetenus