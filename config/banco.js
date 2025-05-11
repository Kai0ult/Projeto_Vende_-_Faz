import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config();

const DB_NAME = process.env.DB_NAME
const USER_NAME = process.env.DB_USER_NAME
const PASSWORD = process.env.DB_PASSWORD
const HOST = process.env.DB_HOST

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: HOST,
    dialect: 'mysql',
    timezone: '-03:00',
})

sequelize.authenticate().then(function () {
    console.log('Conectado ao banco com sucesso!.');
}).catch(function (error) {
    console.log('Falha na conexão: ' + error);
})

export default { Sequelize, sequelize }