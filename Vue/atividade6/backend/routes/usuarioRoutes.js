import { Router } from 'express';
import Usuario from '../models/Usuario.js';
import { autenticarToken } from '../middleware/authMiddleware.js';

const router = Router();

// POST /usuarios → criar novo usuário
router.post('/usuarios', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos.' });
    }

    try {
        const novoUsuario = await Usuario.create({ nome, email, senha });
        res.status(201).json(novoUsuario);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao criar usuário.', detalhes: err.message });
    }
});

// GET /usuarios → listar todos os usuários
// GET /usuarios → listar todos (somente autenticado)
router.get('/usuarios', autenticarToken, async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar usuários.', detalhes: err.message });
    }
});


// PUT /usuarios/:id → atualizar dados de um usuário específico
router.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        usuario.nome = nome || usuario.nome;
        usuario.email = email || usuario.email;
        usuario.senha = senha || usuario.senha;

        await usuario.save();
        res.json({ mensagem: 'Usuário atualizado com sucesso.', usuario });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao atualizar usuário.', detalhes: err.message });
    }
});


import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRATION } from '../config/jwt.js';


// POST /login → autenticar e gerar token JWT
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }

    try {
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario || usuario.senha !== senha) {
            return res.status(401).json({ erro: 'Credenciais inválidas.' });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );

        res.json({ mensagem: 'Login bem-sucedido!', token });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao processar login.', detalhes: err.message });
    }
});

export default router;
