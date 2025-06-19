import Sequelize from 'sequelize'

const DB_NAME = 'bd_vende_faz'
const USER_NAME = 'root'
const PASSWORD = 'pc0038bd'
const HOST = 'localhost'

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: HOST,
    dialect: 'mysql',
    timezone: '-03:00',
})

await sequelize.authenticate().then(function () {
    console.log('Conectado ao banco com sucesso!.');
}).catch(function (error) {
    console.log('Falha na conexão: ' + error);
})

export default { Sequelize, sequelize }