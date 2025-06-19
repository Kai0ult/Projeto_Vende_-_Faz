import AnuncianteEmpresa from '../models/AnuncianteEmpresa.js';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import { cpf, cnpj } from 'cpf-cnpj-validator';

class AnuncianteEmpresaController {
    cadastrar = (req, res) => {
        res.render('anunciante_empresa/cadastro');
    }

    salvar = async (req, res) => {
    const { nome, email, senha, cpf_cnpj, telefone } = req.body;

    // Detecta se a requisição é API (ex: Insomnia) ou navegador (ex: form)
    const isAPI = req.headers.accept?.includes('application/json') || req.headers['content-type'] === 'application/json';

    try {
        if (!nome || !email || !senha || !cpf_cnpj || !telefone) {
            const msg = 'Campos obrigatórios ausentes';
            return isAPI
                ? res.status(400).json({ erro: msg })
                : (req.flash('error_msg', msg), res.redirect('/anunciante/cadastro'));
        }

        if (!cpf.isValid(cpf_cnpj) && !cnpj.isValid(cpf_cnpj)) {
            const msg = 'CPF ou CNPJ inválido!';
            return isAPI
                ? res.status(400).json({ erro: msg })
                : (req.flash('error_msg', msg), res.redirect('/anunciante/cadastro'));
        }

        const emailExistente = await AnuncianteEmpresa.findOne({ where: { email } });
        const docExistente = await AnuncianteEmpresa.findOne({ where: { cpf_cnpj } });
        const telefoneExistente = await AnuncianteEmpresa.findOne({ where: { telefone } });

        if (emailExistente || docExistente || telefoneExistente) {
            const msg = 'Já existe um cadastro com os dados informados';
            return isAPI
                ? res.status(409).json({ erro: msg })
                : (req.flash('error_msg', msg), res.redirect('/anunciante/cadastro'));
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novo = await AnuncianteEmpresa.create({
            nome,
            email,
            senha: senhaCriptografada,
            cpf_cnpj,
            telefone,
            status: 1
        });

        const sucessoMsg = 'Cadastro realizado com sucesso! Faça login.';

        return isAPI
            ? res.status(201).json({ mensagem: sucessoMsg, anunciante: novo })
            : (req.flash('success_msg', sucessoMsg), res.redirect('/anunciante/login'));

    } catch (err) {
        console.error('Erro ao cadastrar anunciante:', err);
        const erroMsg = 'Erro interno ao cadastrar anunciante.';

        return isAPI
            ? res.status(500).json({ erro: erroMsg })
            : (req.flash('error_msg', erroMsg), res.redirect('/anunciante/cadastro'));
    }
}

    login = (req, res) => {
        res.render('anunciante_empresa/login');
    }

    logar = (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/principal',
            failureRedirect: '/anunciante_empresa/login',
            failureFlash: true
        })(req, res, next);
    }

    logout = (req, res, next) => {
        req.logout((erro) => {
            if (erro) {
                console.error("Erro ao fazer logout:", erro);
                return next(erro);
            }
            res.redirect('/anunciante_empresa/login');
        });
    }
}

export default new AnuncianteEmpresaController()