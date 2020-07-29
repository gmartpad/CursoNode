const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);

//criando o socket relacionado ao servidor
const io = socketIO(server);

//determinar porta
server.listen(3000);

//ler a pasta public
app.use(express.static(path.join(__dirname, 'public')));

//variavel que irá armazenar lista de usuários que estarão conectados
let connectedUsers = [];

//listener do server (tbm tem que ter no client)
io.on('connection', (socket) => {
    console.log("Conexão detectada...");

    //listener do join-request, requisição de entrada (.on é sempre listener)
    socket.on('join-request', (username) => {

        //reconhecer a aba sendo usada pelo username inserido
        socket.username = username;

        //adicionar username na lista 
        connectedUsers.push(username);
        console.log(connectedUsers);

        //emitter user-ok
        socket.emit('user-ok', connectedUsers);
        //emitter pra todo mundo, menos pro usuário que vai receber o emit acima
        socket.broadcast.emit('list-update', {
            joined: username,
            list: connectedUsers
        });
    });

    //listener de desconexão de usuário
    socket.on('disconnect', () => {
        //filtrar para atualizar a lista com todo mundo menos o usuário que saiu
        connectedUsers = connectedUsers.filter(u => u !== socket.username);
        console.log(connectedUsers);
        socket.broadcast.emit('list-update', {
            left: socket.username,
            list: connectedUsers
        });
    })

    //listener de desconexão de usuário
    socket.on('send-msg', (txt) => {
        let obj = {
            username: socket.username,
            message: txt
        };

        socket.broadcast.emit('show-msg', obj);
    });

})