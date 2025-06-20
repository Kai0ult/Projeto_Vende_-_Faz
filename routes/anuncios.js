import express from 'express';
import AnuncioController from '../controllers/AnuncioController.js';

const router = express.Router();

router.get('/listar', AnuncioController.listar);
router.get('/cadastro', AnuncioController.cadastrar);
router.post('/salvar', AnuncioController.salvar);
router.get('/editar/:id', AnuncioController.editar);
router.post('/atualizar/:id', AnuncioController.atualizar);
router.post('/excluir/:id', AnuncioController.excluir);

export default router;
