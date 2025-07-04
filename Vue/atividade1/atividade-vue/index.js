const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Simulação simples de um banco de dados em memória
let usuarios = [
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' },
    { id: 3, nome: 'Andrei' }
];

// GET /usuarios → Retorna todos os usuários
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// POST /usuarios → Adiciona um novo usuário
app.post('/usuarios', (req, res) => {
    const novoUsuario = {
        id: usuarios.length + 1,
        nome: req.body.nome
    };

    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

// DELETE /usuarios/:id → Remove usuário pelo ID
app.delete('/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id);

    // Verifica se o usuário existe
    const usuarioIndex = usuarios.findIndex(usuario => usuario.id === usuarioId);

    if (usuarioIndex === -1) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    // Remove o usuário encontrado
    const usuarioRemovido = usuarios.splice(usuarioIndex, 1);

    res.status(200).json({
        mensagem: 'Usuário removido com sucesso.',
        usuario: usuarioRemovido[0]
    });
});

// Servidor escutando
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
