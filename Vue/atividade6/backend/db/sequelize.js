// backend/db/sequelize.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('atividade6', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

export async function conectarBanco() {
    try {
        await sequelize.authenticate();
        console.log(' Conexão com o banco de dados estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error.message);
    }
}

export default sequelize;
