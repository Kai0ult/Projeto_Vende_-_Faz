import Produto from '../models/Produtos.js'

class ProdutoController {
    listar = async (req, res) => {
        try {
            const produtos = await Produto.findAll({
                where: { id_anunciante_empresa: req.user.id }
            });
            res.render('produto/listar', { produtos });
        } catch (err) {
            console.error('Erro ao listar produtos:', err);
            req.flash('error_msg', 'Erro ao carregar produtos.');
            res.redirect('/principal');
        }
    }

    cadastrar = (req, res) => {
        res.render('produto/cadastro');
    }

    salvar = async (req, res) => {
        const { nome, descricao, preco_produto, estoque, foto, categoria } = req.body;
        const isAPI = req.headers.accept?.includes('application/json');

        if (!nome || !descricao || !preco_produto || !estoque || !foto || !categoria) {
            const msg = 'Todos os campos são obrigatórios.';
            return isAPI
                ? res.status(400).json({ erro: msg })
                : (req.flash('error_msg', msg), res.redirect('/produto/cadastro'));
        }

        try {
            const novo = await Produto.create({
                nome,
                descricao,
                preco_produto,
                estoque,
                foto,
                categoria,
                status: 1,
                id_anunciante_empresa: req.user.id
            });

            const msg = 'Produto cadastrado com sucesso!';
            return isAPI
                ? res.status(201).json({ mensagem: msg, produto: novo })
                : (req.flash('success_msg', msg), res.redirect('/produto/listar'));
        } catch (err) {
            console.error('Erro ao salvar produto:', err);
            const erroMsg = 'Erro interno ao salvar produto.';
            return isAPI
                ? res.status(500).json({ erro: erroMsg })
                : (req.flash('error_msg', erroMsg), res.redirect('/produto/cadastro'));
        }
    }

    editar = async (req, res) => {
        try {
            const produto = await Produto.findByPk(req.params.id);
            if (!produto || produto.id_anunciante_empresa !== req.user.id) {
                req.flash('error_msg', 'Produto não encontrado.');
                return res.redirect('/produto/listar');
            }
            res.render('produto/editar', { produto });
        } catch (err) {
            console.error('Erro ao editar produto:', err);
            req.flash('error_msg', 'Erro ao carregar produto.');
            res.redirect('/produto/listar');
        }
    }

    atualizar = async (req, res) => {
        const { nome, descricao, preco_produto, estoque, foto, categoria } = req.body;
        const id = req.params.id;

        try {
            const produto = await Produto.findByPk(id);
            if (!produto || produto.id_anunciante_empresa !== req.user.id) {
                req.flash('error_msg', 'Produto não encontrado.');
                return res.redirect('/produto/listar');
            }

            await produto.update({ nome, descricao, preco_produto, estoque, foto, categoria });
            req.flash('success_msg', 'Produto atualizado com sucesso!');
            res.redirect('/produto/listar');
        } catch (err) {
            console.error('Erro ao atualizar produto:', err);
            req.flash('error_msg', 'Erro ao atualizar produto.');
            res.redirect('/produto/listar');
        }
    }

    excluir = async (req, res) => {
        try {
            const produto = await Produto.findByPk(req.params.id);
            if (!produto || produto.id_anunciante_empresa !== req.user.id) {
                req.flash('error_msg', 'Produto não encontrado.');
                return res.redirect('/produto/listar');
            }
            await produto.destroy();
            req.flash('success_msg', 'Produto excluído com sucesso!');
            res.redirect('/produto/listar');
        } catch (err) {
            console.error('Erro ao excluir produto:', err);
            req.flash('error_msg', 'Erro ao excluir produto.');
            res.redirect('/produto/listar');
        }
    }
}

export default new ProdutoController();
