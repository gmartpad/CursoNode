const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
    res.json(req.query);

    // GET: req.query
    // POST: req.body
    // PARAMETROS DA URL: req.params

    // SEND
    // JSON

});

router.get('/posts/:slug', (req, res)=>{
    let slug = req.params.slug;

    // Titulo: seja bem vindo
    // Slug: seja-bem-vindo

    res.send('Slug do post: '+slug);
});


router.get('/sobre', (req, res)=>{
    res.send('Página SOBRE');
});

module.exports = router;