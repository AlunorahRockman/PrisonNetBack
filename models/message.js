import sequelize from "sequelize"
import database from "../database/database.js"

const {DataTypes} = sequelize

const Message = database.define('message', { 
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idSender: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    idRecever: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estVue: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})


export default Message