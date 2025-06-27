import { getAllUsers, createUser, updateUserById, deleteUserById, getUsersByName } from '../models/userModel.js';

import { userSchema } from '../validations/userValidation.js';

export const listarUsuarios = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    getAllUsers(page, limit, (err, usuarios) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao buscar usuários.' });
        }
        res.json({
            pagina: page,
            limite: limit,
            resultados: usuarios
        });
    });
};


export const criarUsuario = (req, res) => {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ erro: error.details[0].message });
    }

    createUser(value, (err, novoUsuario) => {
        if (err) return res.status(500).json({ erro: 'Erro ao inserir usuário.' });
        res.status(201).json(novoUsuario);
    });
};




export const atualizarUsuario = (req, res) => {
    const id = req.params.id;
    const { error, value } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ erro: error.details[0].message });
    }

    updateUserById(id, value, (err, usuarioAtualizado) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao atualizar usuário.' });
        }
        res.json(usuarioAtualizado);
    });
};


export const deletarUsuario = (req, res) => {
    const id = req.params.id;

    deleteUserById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao deletar usuário.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        res.json({ mensagem: `Usuário com ID ${id} deletado com sucesso.` });
    });
};


export const filtrarUsuariosPorNome = (req, res) => {
    const { nome } = req.query;

    if (!nome) {
        return res.status(400).json({ erro: 'Parâmetro "nome" é obrigatório para o filtro.' });
    }

    getUsersByName(nome, (err, usuarios) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao buscar usuários pelo nome.' });
        }
        res.json(usuarios);
    });
};
