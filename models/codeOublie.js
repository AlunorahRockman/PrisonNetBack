import sequelize from "sequelize"
import database from "../database/database.js"

const {DataTypes} = sequelize

const CodeOublie = database.define('codeOublies', { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idUser: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    code: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
})

export default CodeOublie