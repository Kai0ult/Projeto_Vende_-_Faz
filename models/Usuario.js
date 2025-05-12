import banco from "../config/banco.js";

export const TIPOS_USUARIO = {
    CLIENTE: 1,
    ANUNCIANTE: 2,
};

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
    tipo: {
        type: banco.Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isIn: [[TIPOS_USUARIO.CLIENTE, TIPOS_USUARIO.ANUNCIANTE]],
        },
    },
    cpf_cnpj: {
        type: banco.Sequelize.STRING(20),
        allowNull: false,
        unique: true,
    },
    status: {
        type: banco.Sequelize.INTEGER,
        defaultValue: 1,
    },
});


//Usuario.sync({ alter: true });

export default Usuario;