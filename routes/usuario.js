import express from "express"
import UsuarioController from "../controllers/UsuarioController.js"
import { logadoUsuario } from '../config/regras.js'

const router = express.Router()

router.get('/cadastro', UsuarioController.cadastrar)

router.post('/salvar', UsuarioController.salvar)

router.get('/login', UsuarioController.login)

router.post('/logar', UsuarioController.logar)

router.get('/logout', logadoUsuario, UsuarioController.logout)

export default router