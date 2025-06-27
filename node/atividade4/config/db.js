// config/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Carrega variáveis do .env
dotenv.config();

// Cria a conexão com o banco de dados
export const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Testa a conexão assim que o módulo for importado
try {
    await db.connect();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
} catch (error) {
    console.error('❌ Erro ao conectar no banco de dados:', error.message);
    process.exit(1); // Encerra o app se falhar
}
