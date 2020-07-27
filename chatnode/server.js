const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);

//determinar porta
server.listen(3000);

//ler a pasta public
app.use(express.static(path.join(__dirname, 'public')));