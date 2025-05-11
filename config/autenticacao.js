import passportLocal from 'passport-local'
const localEstrategy = passportLocal.Strategy
import Usuario from '../models/Usuario.js'
import bcrypt from 'bcryptjs'

export default (passport) => {
    passport.use(new localEstrategy(
        {usernameField: 'email', passwordField: 'password'},
        (email, password, done) => {
            Usuario.findOne({
                where:{
                    email: email
                }
            }).then((usuario) => {
                if(!usuario){
                    return done(null, false, {message: 'Usuário não encontrado'})
                }
                bcrypt.compare(password, usuario.senha, (erro, iguais) =>{
                    if(iguais){
                        return done(null, usuario)
                    }else{
                        return done(null, false, {message: 'Senha incorreta!'})
                    }
                })
            })
        }
    ))

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) => {
        Usuario.findByPk(id).then((usuario) => {
            done(null, usuario)
        })
    })
}