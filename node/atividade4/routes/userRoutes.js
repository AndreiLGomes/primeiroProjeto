// routes/userRoutes.js
import express from 'express';
import {
    buscarUsuarioPorNome,
    listarUsuarios,
    criarNovoUsuario,
    atualizarDadosUsuario,
    removerUsuario
} from '../controllers/userController.js';

const router = express.Router();

// 🔍 Buscar usuário por nome: /usuarios-bd?nome=Fulano
router.get('/', buscarUsuarioPorNome);

// 📄 Listar todos os usuários: /usuarios-bd/todos
router.get('/todos', listarUsuarios);

// ➕ Criar novo usuário: /usuarios-bd
router.post('/', criarNovoUsuario);

// ✏️ Atualizar usuário por ID: /usuarios-bd/:id
router.put('/:id', atualizarDadosUsuario);

// ❌ Deletar usuário por ID: /usuarios-bd/:id
router.delete('/:id', removerUsuario);

export default router;
