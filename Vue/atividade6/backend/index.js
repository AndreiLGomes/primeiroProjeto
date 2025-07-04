import express from 'express';
import cors from 'cors'; // ✅ importa

import { conectarBanco } from './db/sequelize.js';
import Usuario from './models/Usuario.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();
const PORT = 3000;

app.use(cors());              // ✅ habilita CORS
app.use(express.json());
app.use(usuarioRoutes);

app.get('/', (req, res) => {
    res.send('Servidor rodando corretamente!');
});

app.listen(PORT, async () => {
    console.log(`Servidor rodando corretamente em http://localhost:${PORT}`);
    await conectarBanco();
    await Usuario.sync({ alter: true });
});
