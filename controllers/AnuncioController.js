import Anuncio from '../models/Anuncio.js'

class AnuncioController {
    listar = async (req, res) => {
        try {
            const anuncios = await Anuncio.findAll({
                where: { id_anunciante_empresa: req.user.id }
            });
            res.render('anuncio/listar', { anuncios });
        } catch (err) {
            console.error('Erro ao listar anúncios:', err);
            req.flash('error_msg', 'Erro ao carregar anúncios.');
            res.redirect('/principal');
        }
    }

    cadastrar = (req, res) => {
        res.render('anuncio/cadastro');
    }

    salvar = async (req, res) => {
        const { titulo, descricao, preco_servico, categoria } = req.body;
        const isAPI = req.headers.accept?.includes('application/json');

        if (!titulo || !descricao || !preco_servico || !categoria) {
            const msg = 'Todos os campos são obrigatórios.';
            return isAPI
                ? res.status(400).json({ erro: msg })
                : (req.flash('error_msg', msg), res.redirect('/anuncio/cadastro'));
        }

        try {
            const novo = await Anuncio.create({
                titulo,
                descricao,
                preco_servico,
                categoria,
                status: 1,
                id_anunciante_empresa: req.user.id
            });

            const msg = 'Anúncio cadastrado com sucesso!';
            return isAPI
                ? res.status(201).json({ mensagem: msg, anuncio: novo })
                : (req.flash('success_msg', msg), res.redirect('/anuncio/listar'));
        } catch (err) {
            console.error('Erro ao salvar anúncio:', err);
            const erroMsg = 'Erro interno ao salvar anúncio.';
            return isAPI
                ? res.status(500).json({ erro: erroMsg })
                : (req.flash('error_msg', erroMsg), res.redirect('/anuncio/cadastro'));
        }
    }

    editar = async (req, res) => {
        try {
            const anuncio = await Anuncio.findByPk(req.params.id);
            if (!anuncio || anuncio.id_anunciante_empresa !== req.user.id) {
                req.flash('error_msg', 'Anúncio não encontrado.');
                return res.redirect('/anuncio/listar');
            }
            res.render('anuncio/editar', { anuncio });
        } catch (err) {
            console.error('Erro ao editar anúncio:', err);
            req.flash('error_msg', 'Erro ao carregar anúncio.');
            res.redirect('/anuncio/listar');
        }
    }

    atualizar = async (req, res) => {
        const { titulo, descricao, preco_servico, categoria } = req.body;
        const id = req.params.id;

        try {
            const anuncio = await Anuncio.findByPk(id);
            if (!anuncio || anuncio.id_anunciante_empresa !== req.user.id) {
                req.flash('error_msg', 'Anúncio não encontrado.');
                return res.redirect('/anuncio/listar');
            }

            await anuncio.update({ titulo, descricao, preco_servico, categoria });
            req.flash('success_msg', 'Anúncio atualizado com sucesso!');
            res.redirect('/anuncio/listar');
        } catch (err) {
            console.error('Erro ao atualizar anúncio:', err);
            req.flash('error_msg', 'Erro ao atualizar anúncio.');
            res.redirect('/anuncio/listar');
        }
    }

    excluir = async (req, res) => {
        try {
            const anuncio = await Anuncio.findByPk(req.params.id);
            if (!anuncio || anuncio.id_anunciante_empresa !== req.user.id) {
                req.flash('error_msg', 'Anúncio não encontrado.');
                return res.redirect('/anuncio/listar');
            }
            await anuncio.destroy();
            req.flash('success_msg', 'Anúncio excluído com sucesso!');
            res.redirect('/anuncio/listar');
        } catch (err) {
            console.error('Erro ao excluir anúncio:', err);
            req.flash('error_msg', 'Erro ao excluir anúncio.');
            res.redirect('/anuncio/listar');
        }
    }
}

export default new AnuncioController();
