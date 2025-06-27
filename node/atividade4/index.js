// index.js
import express from 'express';
import axios from 'axios';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = 3000;

// ✅ Middleware para logar método e URL
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// ✅ Middleware para interpretar JSON
app.use(express.json());

// ✅ Rota principal
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// ✅ Rota que consome a API pública da PokeAPI
app.get('/pokemons', async (req, res) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
        res.json(response.data.results);
    } catch (error) {
        console.error('Erro ao buscar pokémons:', error.message);
        res.status(500).json({ erro: 'Não foi possível buscar os dados da PokeAPI' });
    }
});

// ✅ Rotas simuladas com JSONPlaceholder
app.post('/usuarios', async (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios.' });
    }

    try {
        const resposta = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            nome,
            email
        });

        res.status(201).json({
            mensagem: 'Usuário enviado para a API externa (simulado).',
            dadosRecebidos: resposta.data
        });
    } catch (err) {
        console.error('Erro ao enviar para a API externa:', err.message);
        res.status(500).json({ erro: 'Erro ao criar o usuário na API externa.' });
    }
});

app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ erro: 'O campo "nome" é obrigatório.' });
    }

    try {
        const resposta = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            nome
        });

        res.status(200).json({
            mensagem: `Usuário ${id} atualizado (simulado).`,
            dadosRecebidos: resposta.data
        });
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err.message);
        res.status(500).json({ erro: 'Erro ao atualizar o usuário na API externa.' });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        res.json({ mensagem: `Usuário ${id} excluído com sucesso (simulado).` });
    } catch (err) {
        console.error('Erro ao excluir usuário:', err.message);
        res.status(500).json({ erro: 'Erro ao excluir o usuário na API externa.' });
    }
});

// ✅ Rotas reais com banco de dados
app.use('/usuarios-bd', userRoutes);

// ✅ Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
