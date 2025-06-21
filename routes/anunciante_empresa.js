import express from "express"
import AnuncianteEmpresaController from "../controllers/AnuncianteEmpresaController.js"
import { logadoAnunciante } from '../config/regras.js'

const router = express.Router()

router.get('/cadastro', AnuncianteEmpresaController.cadastrar)
router.post('/salvar', AnuncianteEmpresaController.salvar)
router.get('/login', AnuncianteEmpresaController.login)
router.post('/logar', AnuncianteEmpresaController.logar)
router.get('/logout', logadoAnunciante, AnuncianteEmpresaController.logout)

export default router