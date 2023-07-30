import sequelize from "sequelize";
import database from "../database/database.js";
import User from "./user.js";

const { DataTypes } = sequelize;

const Notification = database.define('notification', {
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
        },
    },
    link: {
        type: DataTypes.STRING, 
        allowNull: true, 
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
});

User.hasMany(Notification, {
    foreignKey: 'userId',
    allowNull: false,
})

Notification.belongsTo(User);

export default Notification;
