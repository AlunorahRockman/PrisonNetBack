import {Sequelize} from "sequelize"

export default new Sequelize('prison', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
})