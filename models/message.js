import sequelize from "sequelize"
import database from "../database/database.js"
import User from "./user.js"

const {DataTypes} = sequelize

const Message = database.define('message', { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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

Message.belongsTo(User, {
    foreignKey: 'idSender',
    as: 'sender',
});


Message.belongsTo(User, {
    foreignKey: 'idRecever',
    as: 'receiver',
});


export default Message