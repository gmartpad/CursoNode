const express = require('express');
const router = require('./routes/index');

// Configurações
const app = express();
app.use('/', router);

module.exports = app;