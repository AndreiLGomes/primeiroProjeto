// socket-server.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*", // permitir todas as origens (em produção, restrinja!)
    }
});

io.on('connection', (socket) => {
    console.log(' Novo cliente conectado:', socket.id);

    socket.on('mensagem', (dados) => {
        console.log(' Mensagem recebida do cliente:', dados);
    });

    socket.on('disconnect', () => {
        console.log(' Cliente desconectado:', socket.id);
    });
});

httpServer.listen(3001, () => {
    console.log(' Servidor Socket.IO rodando na porta 3001');
});
