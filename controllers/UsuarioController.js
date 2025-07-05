import Usuario from '../models/Usuario.js'
import passport from 'passport'
import bcrypt from 'bcryptjs'
import { cpf } from 'cpf-cnpj-validator'

class UsuarioController {
    cadastrar = (req, res) => {
        res.render('usuario/cadastro')
    }

    salvar = async (req, res) => {
        let nome = req.body.nome
        let email = req.body.email
        let senha = req.body.senha
        let cpfInput = req.body.cpf

        let user = await Usuario.findOne({ where: { email } })
        if (user) {
            req.flash('error_msg', 'Email já cadastrado!')
            return res.redirect('/usuario/cadastro')
        }

        if (!cpf.isValid(cpfInput)) {
            req.flash('error_msg', 'CPF inválido!')
            return res.redirect('/usuario/cadastro')
        }

        const cpfExistente = await Usuario.findOne({ where: { cpf: cpfInput } })
        if (cpfExistente) {
            req.flash('error_msg', 'CPF já cadastrado!')
            return res.redirect('/usuario/cadastro')
        }

        try {
            const senhaCriptografada = await bcrypt.hash(senha, 10)

            await Usuario.create({
                nome,
                email,
                senha: senhaCriptografada,
                cpf: cpfInput,
                status: 1
            })

            req.flash('success_msg', 'Cadastro realizado com sucesso! Faça login.')
            return res.redirect('/usuario/login')
        } catch (err) {
            console.error('Erro ao cadastrar usuário:', err)
            req.flash('error_msg', 'Erro interno ao cadastrar usuário.')
            return res.redirect('/usuario/cadastro')
        }
    }

    login = (req, res) => {
        res.render('usuario/login')
    }

    logar = (req, res, next) => {
        passport.authenticate('usuario-local', {
            successRedirect: '/usuario/principal',
            failureRedirect: '/usuario/login',
            failureFlash: true
        })(req, res, next);
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