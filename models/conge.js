import sequelize from "sequelize"
import database from "../database/database.js"
import Personnel from "./personnel.js"

const {DataTypes} = sequelize

const Conge = database.define('conges', { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    },
    personnelId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'personnels',
            key: 'id',
        },
    }
})

// ! ***********************************

Personnel.hasMany(Conge, {
    foreignKey: 'personnelId',
    allowNull: false,
    onDelete: 'CASCADE'
})

Conge.belongsTo(Personnel);

// ! ***********************************

export default Conge