const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());

// GET /produtos
app.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM produtos';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err);
            return res.status(500).json({ erro: 'Erro ao buscar produtos.' });
        }

        res.json(results);
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
