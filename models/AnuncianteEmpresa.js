import banco from "../config/banco.js"

const AnuncianteEmpresa = banco.sequelize.define("anunciante_empresa", {
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
    cpf_cnpj: {
        type: banco.Sequelize.STRING(20),
        allowNull: false,
        unique: true,
    },
    telefone: {
        type: banco.Sequelize.STRING(20),
        allowNull: false,
        unique: true,
    },
    status: {
        type: banco.Sequelize.INTEGER,
        defaultValue: 1,
    }
})


//AnuncianteEmpresa.sync()

export default AnuncianteEmpresa