import sequelize from "sequelize"
import database from "../database/database.js"
import User from "./user.js";

const {DataTypes} = sequelize

const Visiteur = database.define('visiteurs', { 
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        }
    }
})

// ! ***********************************

User.hasOne(Visiteur, {
    foreignKey: 'userId', 
    allowNull: false, 
    onDelete: 'CASCADE',
});

Visiteur.belongsTo(User);

// ! ***********************************

export default Visiteur