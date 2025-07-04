const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', // altere para sua senha
    database: 'atividade_node'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro na conexão com o banco:', err);
        return;
    }
    console.log('Conectado ao banco MySQL!');
});

module.exports = connection;
