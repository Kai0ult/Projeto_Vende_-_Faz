import banco from "../config/banco.js"

const Usuario = banco.sequelize.define("usuarios", {
    id: {
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: banco.Sequelize.STRING(100),
        allowNull: false,
    },
    email: {
        type: banco.Sequelize.STRING(100),
        unique: true,
        allowNull: false,
    },
    senha: {
        type: banco.Sequelize.STRING(250),
        allowNull: false,
    },
    cpf: {
        type: banco.Sequelize.STRING(20),
        allowNull: false,
        unique: true,
    },
    status: {
        type: banco.Sequelize.INTEGER,
        defaultValue: 1,
    },
})


//Usuario.sync()

export default Usuario