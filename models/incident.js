import sequelize from "sequelize"
import database from "../database/database.js"
import Detenus from "./detenus.js"
import Personnel from "./personnel.js"
import User from "./user.js"

const {DataTypes} = sequelize

const Incident = database.define('incidents', { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
    }
}) 



// ! ***********************************

User.hasMany(Incident, {
    foreignKey: 'userId',
    allowNull: false,
    onDelete: 'CASCADE'
});

Incident.belongsTo(User);

// ! ***********************************

Detenus.hasOne(Incident, {
    foreignKey: 'detenuId',
    allowNull: false
});

Incident.belongsTo(Detenus);

// ! ***********************************

export default Incident