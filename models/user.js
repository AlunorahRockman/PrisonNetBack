import sequelize from 'sequelize';
import database from '../database/database.js';
import bcrypt from 'bcrypt';

const { DataTypes } = sequelize;

const User = database.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        motdepasse: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        adresse: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateNaissance: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sexe: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        typeCompte: {  
            type: DataTypes.STRING,
            allowNull: false,
        },
        estValide: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        estBloque: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    });

    User.beforeCreate(async (user) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.motdepasse, saltRounds);
        user.motdepasse = hashedPassword;
    });

    

export default User;