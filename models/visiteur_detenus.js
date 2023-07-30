import sequelize from "sequelize";
import database from "../database/database.js";
import Detenus from "./detenus.js";
import Visiteur from "./visiteur.js";

const { DataTypes } = sequelize;

const VisiteurDetenus = database.define('visiteur_detenus', { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    visiteurId: {
        type: DataTypes.INTEGER, 
        references: {
            model: 'visiteurs',
            key: 'id',
        }
    }
});

// ! ***********************************

Detenus.hasOne(VisiteurDetenus, {
    foreignKey: 'detenuId',
    allowNull: false
});

VisiteurDetenus.belongsTo(Detenus);


// ! ***********************************

Visiteur.hasMany(VisiteurDetenus, {
    foreignKey: 'visiteurId',
    allowNull: false
});

VisiteurDetenus.belongsTo(Visiteur);

// ! ***********************************

export default VisiteurDetenus;
