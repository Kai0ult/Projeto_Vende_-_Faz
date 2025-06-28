import express from 'express'
const app = express()

import handlebars from "express-handlebars"
import Handlebars from "handlebars"
import bodyParser from "body-parser"
import path from "path"
import { fileURLToPath } from 'url'
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access"
import auth from './config/autenticacao.js'
import session from 'express-session'
import flash from 'connect-flash'
import passport from 'passport'
auth(passport)

app.use(session({
    secret: '1n5t1tut0F3d3r4l',
    resave: true,
    saveUninitialized: false
}))
app.use(flash())

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error') || null
    next()
})

app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'index',
    handlebars: allowInsecurePrototypeAccess(Handlebars),

}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname, 'public')))

import { logadoUsuario } from './config/regras.js'
import usuario from './routes/usuario.js'
import anunciante_empresa from './routes/anunciante_empresa.js'
app.get('/', (req, res) => {
    res.render("usuario/principal")
})

app.get('/cadastro', (req, res) => {
    res.render('usuario/cadastro')
})

app.use('/usuario', usuario)
app.use('/anunciante_empresa', anunciante_empresa)

app.use((err, req, res, next) => {
    console.error(err.stack)
    req.flash('error_msg', 'Erro interno!')
    res.redirect('/')
})


app.get('/usuario/principal', logadoUsuario, (req, res) => {
    const nome = req.user.nome
    res.render("usuario/principal", { nome })
})

app.get('/anunciante_empresa/principal', (req, res) => {
    res.render("anunciante_empresa/principal")
})

import anuncios from './routes/anuncios.js'
app.use('/anuncio', anuncios)

app.listen(3000, () => console.log('Servidor Rodando em http://localhost:3000'))