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
    idSender: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    idRecever: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
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


User.hasMany(Message, {
    foreignKey: 'idSender',
    allowNull: false,
})

User.hasMany(Message, {
    foreignKey: 'idRecever',
    allowNull: false,
})

// Message.belongsTo(User);


export default Message