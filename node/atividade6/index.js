import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import { db } from './db.js';
import { authorizeRoles } from './authMiddleware.js';

dotenv.config();
const app = express();

// CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }
}));


// CSRF Middleware Condicional
const csrfMiddleware = csrf({
    cookie: {
        httpOnly: false,
        sameSite: 'lax'
    }
});

app.use((req, res, next) => {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
        return next();
    }
    return csrfMiddleware(req, res, next);
});

// Usuário de Teste
const user = {
    id: 1,
    username: 'admin',
    password: '1234'
};

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.execute(
            'SELECT * FROM usuarios WHERE nome = ?',
            [username]
        );

        const user = rows[0];

        if (!user || password !== '1234') {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        req.session.user = {
            id: user.id,
            username: user.nome,
            email: user.email,
            role: user.role,
            loginAt: new Date()
        };

        res.json({ message: 'Login bem-sucedido', session: req.session.user });

    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
});


app.get('/perfil', (req, res) => {
    if (req.session.user) {
        res.json({ message: 'Sessão ativa', dados: req.session.user });
    } else {
        res.status(403).json({ message: 'Usuário não autenticado' });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Sessão encerrada' });
});

//  CSRF Token
app.get('/csrf-token', csrfMiddleware, (req, res) => {
    const token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }).json({ csrfToken: token });

});

//  Rota protegida
app.post('/dados-sensiveis', (req, res) => {
    res.json({ message: 'Ação permitida. Token CSRF válido.' });
});

//  SQL Injection Protegido
app.post('/buscar-usuario', async (req, res) => {
    const { nome } = req.body;

    try {
        const [rows] = await db.execute(
            'SELECT id, nome, email FROM usuarios WHERE nome = ?',
            [nome]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json({ usuario: rows[0] });
    } catch (err) {
        console.error('Erro ao buscar usuário:', err);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

app.post('/dados-sensiveis', authorizeRoles('admin'), (req, res) => {
    res.json({ message: 'Ação permitida. Token CSRF válido e role autorizada.' });
});



app.listen(3000, () => console.log(' Servidor rodando na porta 3000'));
