import express from 'express';
import ProdutoController from '../controllers/ProdutoController.js';

const router = express.Router();

router.get('/listar', ensureAuthenticated, ProdutoController.listar);
router.get('/cadastro', ensureAuthenticated, ProdutoController.cadastrar);
router.post('/salvar', ensureAuthenticated, ProdutoController.salvar);
router.get('/editar/:id', ensureAuthenticated, ProdutoController.editar);
router.post('/atualizar/:id', ensureAuthenticated, ProdutoController.atualizar);
router.post('/excluir/:id', ensureAuthenticated, ProdutoController.excluir);

export default router;
