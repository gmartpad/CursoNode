const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {    
    let obj = {
        'nome': 'Gabriel',
        'idade': 19
    }
    res.render('home', obj);
});

module.exports = router;