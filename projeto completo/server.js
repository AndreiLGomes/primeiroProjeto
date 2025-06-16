const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('login')); // Servir index.html e index.js
app.use('/admin', express.static('admin'));
app.use('/funcionario', express.static('funcionario'));




app.post('/api/login', (req, res) => {

    const { matricula, senha } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE matricula = ? AND senha = ?';
    connection.query(sql, [matricula, senha], (err, results) => {
        if (err) {
            console.error('Erro no login:', err);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Matrícula ou senha inválida.' });
        }


        const usuario = results[0];
        // ✅ Aqui está o retorno correto para o front-end
        res.json({ perfil: usuario.perfil, nome: usuario.nome });

    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


app.post('/api/funcionarios', (req, res) => {
    const { matricula, nome, senha, perfil } = req.body;

    const sql = 'INSERT INTO usuarios (matricula, nome, senha, perfil) VALUES (?, ?, ?, ?)';
    connection.query(sql, [matricula, nome, senha, perfil], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Matrícula já cadastrada.' });
            }
            console.error('Erro ao cadastrar funcionário:', err);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }

        res.status(201).json({ mensagem: 'Funcionário cadastrado com sucesso!' });
    });
});


const PDFDocument = require('pdfkit');
const fs = require('fs');

app.get('/api/relatorio', (req, res) => {
    const hoje = new Date().toISOString().slice(0, 10); // AAAA-MM-DD

    const sql = `
    SELECT u.matricula, u.nome, r.data,
           IFNULL(r.entrada_manha, 'PENDENTE') AS entrada_manha,
           IFNULL(r.saida_manha, 'PENDENTE') AS saida_manha,
           IFNULL(r.entrada_tarde, 'PENDENTE') AS entrada_tarde,
           IFNULL(r.saida_tarde, 'PENDENTE') AS saida_tarde
    FROM usuarios u
    LEFT JOIN registros_ponto r ON u.id = r.usuario_id AND r.data = ?
    ORDER BY u.matricula;
  `;

    connection.query(sql, [hoje], (err, results) => {
        if (err) {
            console.error('Erro ao gerar relatório:', err);
            return res.status(500).send('Erro ao gerar relatório.');
        }

        const doc = new PDFDocument({ margin: 30, size: 'A4' });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="relatorio.pdf"');
        doc.pipe(res);

        doc.fontSize(16).text('Relatório de Ponto - ' + hoje, { align: 'center' });
        doc.moveDown();

        // Cabeçalho da tabela
        doc.fontSize(10).text(
            'Matrícula | Nome            | Entrada Manhã | Saída Manhã | Entrada Tarde | Saída Tarde',
            { continued: false }
        );
        doc.moveDown(0.5);

        results.forEach(row => {
            doc.text(
                `${row.matricula.padEnd(9)} | ${row.nome.padEnd(15)} | ${row.entrada_manha} | ${row.saida_manha} | ${row.entrada_tarde} | ${row.saida_tarde}`
            );
        });

        doc.end();
    });
});


app.post('/api/registrar-ponto', (req, res) => {
    const { matricula, tipo } = req.body;

    // Mapas de horários permitidos por tipo
    const janelas = {
        entrada_manha: ['07:45', '08:15'],
        saida_manha: ['11:45', '12:15'],
        entrada_tarde: ['13:45', '14:15'],
        saida_tarde: ['17:45', '18:15'],
    };

    if (!janelas[tipo]) {
        return res.status(400).json({ error: 'Tipo de ponto inválido.' });
    }

    const agora = new Date();
    const horaAtual = agora.toTimeString().slice(0, 5); // hh:mm
    const dataHoje = agora.toISOString().slice(0, 10); // yyyy-mm-dd

    const [inicio, fim] = janelas[tipo];

    if (horaAtual < inicio || horaAtual > fim) {
        return res.status(403).json({ error: `Horário fora da janela permitida: ${inicio} até ${fim}` });
    }

    // Consulta usuário
    const buscarUsuario = 'SELECT id FROM usuarios WHERE matricula = ?';
    connection.query(buscarUsuario, [matricula], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const usuarioId = results[0].id;

        // Verificar se já tem ponto nesse tipo hoje
        const verificaDuplicado = `SELECT ${tipo} FROM registros_ponto WHERE usuario_id = ? AND data = ?`;
        connection.query(verificaDuplicado, [usuarioId, dataHoje], (err, results) => {
            if (err) return res.status(500).json({ error: 'Erro ao verificar ponto.' });

            if (results.length > 0 && results[0][tipo] !== null) {
                return res.status(409).json({ error: `Ponto já registrado para ${tipo.replace('_', ' ')}` });
            }

            // Inserir ou atualizar registro de ponto
            const horaAgora = agora.toTimeString().slice(0, 8); // hh:mm:ss

            const insereOuAtualiza = `
        INSERT INTO registros_ponto (usuario_id, data, ${tipo})
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE ${tipo} = VALUES(${tipo})
      `;

            connection.query(insereOuAtualiza, [usuarioId, dataHoje, horaAgora], (err) => {
                if (err) {
                    console.error('Erro ao registrar ponto:', err);
                    return res.status(500).json({ error: 'Erro ao registrar ponto.' });
                }

                res.status(200).json({ mensagem: `Ponto de ${tipo.replace('_', ' ')} registrado com sucesso às ${horaAgora}` });
            });
        });
    });
});


app.post('/api/registrar-ponto', (req, res) => {
    const { matricula, tipo } = req.body;

    // Mapas de horários permitidos por tipo
    const janelas = {
        entrada_manha: ['07:45', '08:15'],
        saida_manha: ['11:45', '12:15'],
        entrada_tarde: ['13:45', '14:15'],
        saida_tarde: ['17:45', '18:15'],
    };

    if (!janelas[tipo]) {
        return res.status(400).json({ error: 'Tipo de ponto inválido.' });
    }

    const agora = new Date();
    const horaAtual = agora.toTimeString().slice(0, 5); // hh:mm
    const dataHoje = agora.toISOString().slice(0, 10); // yyyy-mm-dd

    const [inicio, fim] = janelas[tipo];

    if (horaAtual < inicio || horaAtual > fim) {
        return res.status(403).json({ error: `Horário fora da janela permitida: ${inicio} até ${fim}` });
    }

    // Consulta usuário
    const buscarUsuario = 'SELECT id FROM usuarios WHERE matricula = ?';
    connection.query(buscarUsuario, [matricula], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const usuarioId = results[0].id;

        // Verificar se já tem ponto nesse tipo hoje
        const verificaDuplicado = `SELECT ${tipo} FROM registros_ponto WHERE usuario_id = ? AND data = ?`;
        connection.query(verificaDuplicado, [usuarioId, dataHoje], (err, results) => {
            if (err) return res.status(500).json({ error: 'Erro ao verificar ponto.' });

            if (results.length > 0 && results[0][tipo] !== null) {
                return res.status(409).json({ error: `Ponto já registrado para ${tipo.replace('_', ' ')}` });
            }

            // Inserir ou atualizar registro de ponto
            const horaAgora = agora.toTimeString().slice(0, 8); // hh:mm:ss

            const insereOuAtualiza = `
        INSERT INTO registros_ponto (usuario_id, data, ${tipo})
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE ${tipo} = VALUES(${tipo})
      `;

            connection.query(insereOuAtualiza, [usuarioId, dataHoje, horaAgora], (err) => {
                if (err) {
                    console.error('Erro ao registrar ponto:', err);
                    return res.status(500).json({ error: 'Erro ao registrar ponto.' });
                }

                res.status(200).json({ mensagem: `Ponto de ${tipo.replace('_', ' ')} registrado com sucesso às ${horaAgora}` });
            });
        });
    });
});
