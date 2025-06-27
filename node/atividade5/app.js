const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'exemplo'
});

// Configurações do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Rota principal (Página Inicial)
app.get('/', (req, res) => {
    db.query('SELECT nome FROM usuarios', (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            return res.status(500).render('erro', {
                mensagemErro: 'Erro ao carregar menu dinâmico.'
            });
        }

        res.render('index', {
            tituloPagina: 'Página Inicial',
            menuUsuarios: results
        });
    });
});

// Rota GET para exibir usuários cadastrados
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, usuarios) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            return res.status(500).render('erro', {
                mensagemErro: 'Erro ao buscar usuários no banco de dados.'
            });
        }

        db.query('SELECT nome FROM usuarios', (err, menuUsuarios) => {
            res.render('usuarios', {
                tituloPagina: 'Lista de Usuários',
                usuarios,
                menuUsuarios
            });
        });
    });
});

// Rota GET para exibir o formulário de cadastro
app.get('/cadastrar', (req, res) => {
    db.query('SELECT nome FROM usuarios', (err, results) => {
        if (err) {
            return res.status(500).render('erro', {
                mensagemErro: 'Erro ao carregar usuários para o menu.'
            });
        }

        res.render('formulario', {
            tituloPagina: 'Cadastrar Novo Usuário',
            menuUsuarios: results
        });
    });
});

// Rota POST para processar o formulário
app.post('/cadastrar', (req, res) => {
    const { nome, email } = req.body;

    // Verificações simples
    const erros = [];
    if (!nome || nome.trim().length < 3) {
        erros.push('O nome deve ter pelo menos 3 caracteres.');
    }
    if (!email || !email.includes('@')) {
        erros.push('E-mail inválido.');
    }

    if (erros.length > 0) {
        // Recarrega o formulário com os erros e campos preenchidos
        db.query('SELECT nome FROM usuarios', (err, menuUsuarios) => {
            res.status(400).render('formulario', {
                tituloPagina: 'Cadastrar Novo Usuário',
                menuUsuarios,
                erros,
                nomeAntigo: nome,
                emailAntigo: email
            });
        });
        return;
    }

    const sql = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
    db.query(sql, [nome, email], (err) => {
        if (err) {
            return res.status(500).render('erro', {
                mensagemErro: 'Erro ao cadastrar usuário no banco de dados.'
            });
        }
        res.redirect('/usuarios');
    });
});


// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
