import Usuario from '../models/Usuario.js'
import passaport from 'passport'
import bcrypt from 'bcryptjs'
import { cpf, cnpj } from 'cpf-cnpj-validator'


class UsuarioController {
    cadastrar = (req, res) => {
        res.render('usuario/cadastro')
    }

    salvar = async (req, res) => {
        
        let nome = req.body.nome
        let email = req.body.email
        let senha = req.body.senha
        let tipo =  req.body.tipo
        let cpf_cnpj = req.body.cpf_cnpj

        let user = await Usuario.findOne({ where: { email } }) 

        if (user) {
            req.flash('error_msg', 'Usuário já cadastrado!')
            return res.redirect('/usuario/cadastro')
        }

        if (tipo === 1) {
            if (!cpf.isValid(cpf_cnpj)) {
                req.flash('error_msg', 'CPF inválido!')
                return res.redirect('/usuario/cadastro')
            }
        } else if (tipo === 2) {
            if (!cnpj.isValid(cpf_cnpj)) {
                req.flash('error_msg', 'CNPJ inválido!')
                return res.redirect('/usuario/cadastro')
            }
        } else {
            req.flash('error_msg', 'Tipo de usuário inválido!')
            return res.redirect('/usuario/cadastro')
        }

        const saltRounds = 10
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)

        try {
            await Usuario.create({
                nome,
                email,
                senha: senhaCriptografada,
                tipo,
                cpf_cnpj,
                status: 1
            })

            req.flash('success_msg', 'Cadastro realizado com sucesso! Faça login.')
            return res.redirect('/usuario/login')
        } catch (err) {
            console.error('Erro ao cadastrar usuário:', err.errors || err);
            req.flash('error_msg', 'Erro interno ao cadastrar usuário.');
            return res.redirect('/usuario/cadastro');
        }
    }

    login = (req, res) => {
        res.render('usuario/login', { layout: false })
    }

    logar = (req, res, next) => {
        passaport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/usuario/login',
            failureFlash: true
        })(req, res, next)
    }

    logout = (req, res, next) => {
        req.logout((erro) => {
            if (erro) {
                console.error("Erro ao fazer logout:", erro)
                return next(erro)
            }
            res.redirect('/usuario/login')
        })
    }
}

export default new UsuarioController()