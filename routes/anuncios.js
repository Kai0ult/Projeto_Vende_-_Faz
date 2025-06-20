import express from 'express';
import AnuncioController from '../controllers/AnuncioController.js';

const router = express.Router();

router.get('/listar', ensureAuthenticated, AnuncioController.listar);
router.get('/cadastro', ensureAuthenticated, AnuncioController.cadastrar);
router.post('/salvar', ensureAuthenticated, AnuncioController.salvar);
router.get('/editar/:id', ensureAuthenticated, AnuncioController.editar);
router.post('/atualizar/:id', ensureAuthenticated, AnuncioController.atualizar);
router.post('/excluir/:id', ensureAuthenticated, AnuncioController.excluir);

export default router;
