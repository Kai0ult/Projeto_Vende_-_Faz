import express from "express";
import AnuncianteEmpresaController from "../controllers/AnuncianteEmpresaController.js";
import logado from '../config/regras.js';

const router = express.Router();

router.get('/cadastro', AnuncianteEmpresaController.cadastrar);
router.post('/salvar', AnuncianteEmpresaController.salvar);
router.get('/login', AnuncianteEmpresaController.login);
router.post('/logar', AnuncianteEmpresaController.logar);
router.get('/logout', logado, AnuncianteEmpresaController.logout);

export default router;