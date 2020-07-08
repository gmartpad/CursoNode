const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {    
    let obj = {
        nome: req.query.nome,
        idade: req.query.idade,
        mostrar: true,
        ingredientes:[
            //{nome: 'Arroz', qt: '20g'},
            //{nome: 'Feijão', qt: '10g'}
        ],
        interesses: ['node', 'js', 'css'],
        teste:'<strong>Testando negrito</strong>'
    }
    res.render('home', obj);
});

module.exports = router;