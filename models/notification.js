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

Notification.belongsTo(User, {
    foreignKey: 'senderId',
    as: 'senderNotif',
});


Notification.belongsTo(User, {
    foreignKey: 'receverId',
    as: 'receiverNotif',
});

export default Notification;
