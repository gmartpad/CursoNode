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

//listener
io.on('connection', (socket) => {
    console.log("Conexão detectada...");
})