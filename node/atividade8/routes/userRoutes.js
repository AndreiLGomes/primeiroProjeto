import express from 'express';
import {
    listarUsuarios,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario,
    filtrarUsuariosPorNome
} from '../controllers/userController.js';


const router = express.Router();

router.get('/', listarUsuarios);
router.post('/', criarUsuario);
router.put('/:id', atualizarUsuario);
router.delete('/:id', deletarUsuario);
router.get('/search', filtrarUsuariosPorNome);


export default router;
