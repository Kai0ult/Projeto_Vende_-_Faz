import banco from "../config/banco.js"
import AnuncianteEmpresa from "./AnuncianteEmpresa.js"

const Produtos = banco.sequelize.define("produtos", {
    id: {
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: banco.Sequelize.STRING(100),
        allowNull: false,
    },
    descricao: {
        type: banco.Sequelize.STRING(250),
        allowNull: false
    },
    preco_produto: {
        type: banco.Sequelize.FLOAT,
        allowNull: false
    },
    estoque: {
        type: banco.Sequelize.INTEGER,
        allowNull: false
    },
    foto: {
        type: banco.Sequelize.STRING(250)
    },
    categoria: {
        type: banco.Sequelize.STRING(50)
    },
    status: {
        type: banco.Sequelize.INTEGER,
        defaultValue: 1,
    },

})
Produtos.belongsTo(AnuncianteEmpresa, {
    foreignKey: 'anunciante_empresa_id',
    constraint: true,
    as: 'anunciante_empresa'
})

Produtos.sync()

export default Produtos