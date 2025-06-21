import AnuncianteEmpresa from '../models/AnuncianteEmpresa.js'
import passport from 'passport'
import bcrypt from 'bcryptjs'
import { cpf, cnpj } from 'cpf-cnpj-validator'

class AnuncianteEmpresaController {
    cadastrar = (req, res) => {
        res.render('anunciante_empresa/cadastro')
    }

    salvar = async (req, res) => {
        let nome = req.body.nome;
        let email = req.body.email;
        let senha = req.body.senha;
        let cpfCnpjInput = req.body.cpf_cnpj;
        let telefone = req.body.telefone;

        const isAPI = req.headers.accept?.includes('application/json') || req.headers['content-type'] === 'application/json';


        if (!nome || !email || !senha || !cpfCnpjInput || !telefone) {
            const msg = 'Campos obrigatórios ausentes';
            return isAPI
                ? res.status(400).json({ erro: msg })
                : (req.flash('error_msg', msg), res.redirect('/anunciante_empresa/cadastro'));
        }


        let documentoLimpado = null;
        if (cpf.isValid(cpfCnpjInput)) {
            documentoLimpado = cpf.strip(cpfCnpjInput);
        } else if (cnpj.isValid(cpfCnpjInput)) {
            documentoLimpado = cnpj.strip(cpfCnpjInput);
        } else {
            const msg = 'CPF ou CNPJ inválido!';
            return isAPI
                ? res.status(400).json({ erro: msg })
                : (req.flash('error_msg', msg), res.redirect('/anunciante_empresa/cadastro'));
        }

        const emailExistente = await AnuncianteEmpresa.findOne({ where: { email } });
        if (emailExistente) {
            const msg = 'Email já cadastrado!';
            return isAPI
                ? res.status(409).json({ erro: msg })
                : (req.flash('error_msg', msg), res.redirect('/anunciante_empresa/cadastro'));
        }

        const docExistente = await AnuncianteEmpresa.findOne({ where: { cpf_cnpj: documentoLimpado } });
        if (docExistente) {
            const msg = 'CPF ou CNPJ já cadastrado!';
            return isAPI
                ? res.status(409).json({ erro: msg })
                : (req.flash('error_msg', msg), res.redirect('/anunciante_empresa/cadastro'));
        }

        const telefoneExistente = await AnuncianteEmpresa.findOne({ where: { telefone } });
        if (telefoneExistente) {
            const msg = 'Telefone já cadastrado!';
            return isAPI
                ? res.status(409).json({ erro: msg })
                : (req.flash('error_msg', msg), res.redirect('/anunciante_empresa/cadastro'));
        }


        try {
            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const novo = await AnuncianteEmpresa.create({
                nome,
                email,
                senha: senhaCriptografada,
                cpf_cnpj: documentoLimpado,
                telefone,
                status: 1
            });

            const sucessoMsg = 'Cadastro realizado com sucesso! Faça login.';

            return isAPI
                ? res.status(201).json({ mensagem: sucessoMsg, anunciante: novo })
                : (req.flash('success_msg', sucessoMsg), res.redirect('/anunciante_empresa/login'));

        } catch (err) {
            console.error('Erro ao cadastrar anunciante:', err);
            const erroMsg = 'Erro interno ao cadastrar anunciante.';

            return isAPI
                ? res.status(500).json({ erro: erroMsg })
                : (req.flash('error_msg', erroMsg), res.redirect('/anunciante_empresa/cadastro'));
        }
    }

    login = (req, res) => {
        res.render('anunciante_empresa/login')
    }

    logar = (req, res, next) => {
        passport.authenticate('anunciante-local', {
            successRedirect: '/principal',
            failureRedirect: '/anunciante_empresa/login',
            failureFlash: true
        })(req, res, next);
    }

    logout = (req, res, next) => {
        req.logout((erro) => {
            if (erro) {
                console.error("Erro ao fazer logout:", erro)
                return next(erro)
            }
            res.redirect('/anunciante_empresa/login')
        })
    }
}

export default new AnuncianteEmpresaController()