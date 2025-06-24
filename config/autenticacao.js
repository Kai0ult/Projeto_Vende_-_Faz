import passportLocal from 'passport-local'
const LocalStrategy = passportLocal.Strategy

import Usuario from '../models/Usuario.js'
import AnuncianteEmpresa from '../models/AnuncianteEmpresa.js'
import bcrypt from 'bcryptjs'

export default (passport) => {

    passport.use('usuario-local', new LocalStrategy(
        { usernameField: 'email', passwordField: 'senha' },
        async (email, password, done) => {
            try {
                const usuario = await Usuario.findOne({ where: { email } });
                if (!usuario) {
                    return done(null, false, { message: 'Usuário não encontrado' });
                }

                const iguais = await bcrypt.compare(password, usuario.senha);
                if (iguais) {
                    return done(null, { id: usuario.id, tipo: 'usuario' });
                } else {
                    return done(null, false, { message: 'Senha incorreta' });
                }
            } catch (err) {
                return done(err);
            }
        }
    ));

    passport.use('anunciante-local', new LocalStrategy(
        { usernameField: 'email', passwordField: 'senha' },
        async (email, password, done) => {
            try {
                const anunciante = await AnuncianteEmpresa.findOne({ where: { email } });
                if (!anunciante) {
                    return done(null, false, { message: 'Anunciante não encontrado' });
                }

                const iguais = await bcrypt.compare(password, anunciante.senha);
                if (iguais) {
                    return done(null, { id: anunciante.id, tipo: 'anunciante' });
                } else {
                    return done(null, false, { message: 'Senha incorreta' });
                }
            } catch (err) {
                return done(err);
            }
        }
    ));

    passport.serializeUser((usuario, done) => {
        done(null, { id: usuario.id, tipo: usuario.tipo });
    });

    passport.deserializeUser(async (obj, done) => {
        try {
            if (obj.tipo === 'usuario') {
                const user = await Usuario.findByPk(obj.id);
                done(null, { ...user.dataValues, tipo: 'usuario' });
            } else if (obj.tipo === 'anunciante') {
                const anunciante = await AnuncianteEmpresa.findByPk(obj.id);
                done(null, { ...anunciante.dataValues, tipo: 'anunciante' });
            } else {
                done(new Error('Tipo de usuário inválido'), null);
            }
        } catch (err) {
            done(err, null);
        }
    });
}