const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
    res.send('Olá Mundo! 2.0');
});

router.get('/sobre', (req, res)=>{
    res.send('Página SOBRE');
});

module.exports = router;