const app = require('./app');
const mongoose = require('mongoose');

require('dotenv').config({path:'variables.env'});

// Conexão ao Banco de Dados
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error)=>{
    console.error("ERRO: "+error.message);
});

// Carregando todos os models

require('./models/Post');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), ()=>{
    console.log("Servidor rodando na porta: "+server.address().port)
});