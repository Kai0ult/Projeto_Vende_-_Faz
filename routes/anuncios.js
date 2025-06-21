import express from 'express'
import AnuncioController from '../controllers/AnuncioController.js'
import { logadoAnunciante } from '../config/regras.js'

const router = express.Router()

router.get('/listar', logadoAnunciante, AnuncioController.listar)
router.get('/cadastro', logadoAnunciante, AnuncioController.cadastrar)
router.post('/salvar', logadoAnunciante, AnuncioController.salvar)
router.get('/editar/:id', logadoAnunciante, AnuncioController.editar)
router.post('/atualizar/:id', logadoAnunciante, AnuncioController.atualizar)
router.post('/excluir/:id', logadoAnunciante, AnuncioController.excluir)

export default router
