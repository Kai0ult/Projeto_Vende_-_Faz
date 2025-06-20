import express from 'express';
import ProdutoController from '../controllers/ProdutoController.js';

const router = express.Router();

router.get('/listar', ProdutoController.listar);
router.get('/cadastro', ProdutoController.cadastrar);
router.post('/salvar', ProdutoController.salvar);
router.get('/editar/:id',  ProdutoController.editar);
router.post('/atualizar/:id',ProdutoController.atualizar);
router.post('/excluir/:id', ProdutoController.excluir);

export default router;
