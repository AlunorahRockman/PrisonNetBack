import sequelize from "sequelize"
import database from "../database/database.js"

const {DataTypes} = sequelize

const Admin = database.define('admin', { 
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idUser: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
})


export default Admin