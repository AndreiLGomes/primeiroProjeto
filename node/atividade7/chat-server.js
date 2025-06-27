// chat-server.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log(` Usuário conectado: ${socket.id}`);

    socket.on('mensagemChat', (mensagem) => {
        console.log(` ${socket.id}: ${mensagem}`);
        // Envia a mensagem para todos os outros clientes conectados
        io.emit('mensagemChat', mensagem);
    });

    socket.on('disconnect', () => {
        console.log(` Usuário desconectado: ${socket.id}`);
    });
});

httpServer.listen(3002, () => {
    console.log(' Servidor de chat rodando em http://localhost:3002');
});
