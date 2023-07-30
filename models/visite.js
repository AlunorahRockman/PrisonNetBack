import sequelize from "sequelize"
import database from "../database/database.js"
import Detenus from "./detenus.js"
import Visiteur from "./visiteur.js"

const {DataTypes} = sequelize

const Visite = database.define('visite', { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dateVisite: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    heure: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    statut: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    visiteurId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'visiteurs',
            key: 'id',
        },
    } 
})

// ! ***********************************

Visiteur.hasMany(Visite, {
    foreignKey: 'visiteurId',
    allowNull: false,
    onDelete: 'CASCADE'
})

Visite.belongsTo(Visiteur);

// ! ***********************************

Detenus.hasOne(Visite, {
    foreignKey: 'detenuId', 
    allowNull: false
}) 

Visite.belongsTo(Detenus);

// ! ***********************************


export default Visite