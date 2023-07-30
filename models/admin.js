import sequelize from "sequelize"
import database from "../database/database.js"
import User from "./user.js";

const {DataTypes} = sequelize

const Admin = database.define('admin', { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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

User.hasOne(Admin, {
    foreignKey: 'userId', 
    allowNull: false, 
    onDelete: 'CASCADE',
});

Admin.belongsTo(User);

// ! ***********************************

export default Admin