// controllers/userController.js
import {
    encontrarPorNome,
    listarTodos,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
} from '../models/userModel.js';

// 🔍 Buscar usuário por nome (GET /usuarios-bd?nome=...)
export const buscarUsuarioPorNome = async (req, res) => {
    const { nome } = req.query;

    if (!nome) {
        return res.status(400).json({ erro: 'Parâmetro "nome" é obrigatório.' });
    }

    try {
        const rows = await encontrarPorNome(nome);

        if (rows.length === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar usuário por nome:', error.message);
        res.status(500).json({ erro: 'Erro interno ao consultar o banco de dados.' });
    }
};

// 📄 Listar todos os usuários (GET /usuarios-bd/todos)
export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await listarTodos();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao listar usuários:', error.message);
        res.status(500).json({ erro: 'Erro interno ao consultar o banco de dados.' });
    }
};

// ➕ Criar usuário (POST /usuarios-bd)
export const criarNovoUsuario = async (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios.' });
    }

    try {
        const novoId = await criarUsuario({ nome, email });
        res.status(201).json({ mensagem: 'Usuário criado com sucesso!', id: novoId });
    } catch (error) {
        console.error('Erro ao criar usuário:', error.message);
        res.status(500).json({ erro: 'Erro ao criar usuário.' });
    }
};

// ✏️ Atualizar usuário (PUT /usuarios-bd/:id)
export const atualizarDadosUsuario = async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios.' });
    }

    try {
        const alterados = await atualizarUsuario(id, { nome, email });

        if (alterados === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        res.status(200).json({ mensagem: 'Usuário atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error.message);
        res.status(500).json({ erro: 'Erro ao atualizar usuário.' });
    }
};

// ❌ Deletar usuário (DELETE /usuarios-bd/:id)
export const removerUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const removidos = await deletarUsuario(id);

        if (removidos === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        res.status(200).json({ mensagem: 'Usuário removido com sucesso.' });
    } catch (error) {
        console.error('Erro ao remover usuário:', error.message);
        res.status(500).json({ erro: 'Erro ao remover usuário.' });
    }
};
