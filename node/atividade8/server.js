import express from 'express';
import userRoutes from './routes/userRoutes.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
const PORT = 3000;

// Carrega o arquivo Swagger
const swaggerDocument = YAML.load('./docs/swagger.yaml');

// Middlewares
app.use(express.json());
app.use('/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando: http://localhost:${PORT}`);
    console.log(`Documentação Swagger: http://localhost:${PORT}/api-docs`);
});

// Middleware global de logging
app.use((req, res, next) => {
    const dataHora = new Date().toISOString();
    console.log(`[${dataHora}] ${req.method} ${req.originalUrl}`);
    next();
});
