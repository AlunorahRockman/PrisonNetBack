import sequelize from "sequelize";
import database from "../database/database.js";
import User from "./user.js";

const {DataTypes} = sequelize

const Personnel = database.define('personnels', { 
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        departement: {
            type: DataTypes.STRING,
            allowNull: false
        },
        poste: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salaire: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        dateEmbauche: {
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
        },
    })

    // ! ***********************************

    User.hasOne(Personnel, {
        foreignKey: 'userId', 
        allowNull: false, 
        onDelete: 'CASCADE',
    });
    
    Personnel.belongsTo(User);

    // ! ***********************************

export default Personnel