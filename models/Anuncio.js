import banco from "../config/banco.js"
import AnuncianteEmpresa from "./AnuncianteEmpresa.js"

const Anuncio = banco.sequelize.define("anuncios", {
    id: {
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: banco.Sequelize.STRING(100),
        allowNull: false,
    },
    descricao: {
        type: banco.Sequelize.STRING(250),
        allowNull: false
    },
    preco_servico: {
        type: banco.Sequelize.FLOAT,
        allowNull: false
    },  
    categoria: {
        type: banco.Sequelize.STRING(50)
    },
    status: {
        type: banco.Sequelize.INTEGER,
        defaultValue: 1,
    },
    anunciante_empresa_id: {
        type: banco.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'anunciante_empresas', 
            key: 'id'
        }
    }

})
Anuncio.belongsTo(AnuncianteEmpresa, {
    foreignKey: 'anunciante_empresa_id',
    constraint: true,
    as: 'anunciante_empresa'
})

//Anuncio.sync()

export default Anuncio