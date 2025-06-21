import express from 'express';
import ProdutoController from '../controllers/ProdutoController.js';
import { logadoAnunciante } from '../config/regras.js'

const router = express.Router();

router.get('/listar', logadoAnunciante, ProdutoController.listar);
router.get('/cadastro', logadoAnunciante, ProdutoController.cadastrar);
router.post('/salvar', logadoAnunciante, ProdutoController.salvar);
router.get('/editar/:id', logadoAnunciante,  ProdutoController.editar);
router.post('/atualizar/:id', logadoAnunciante, ProdutoController.atualizar);
router.post('/excluir/:id', logadoAnunciante,  ProdutoController.excluir);

export default router;
