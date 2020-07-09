exports.userMiddleware = (req, res, next) => {
    let info = {name:'Gabriel', id:123}
    req.userInfo = info;
    next();
}

exports.index = (req, res) => {    
    let obj = {
        nome: req.query.nome,
        idade: req.query.idade,
        mostrar: true,
        ingredientes:[
            //{nome: 'Arroz', qt: '20g'},
            //{nome: 'Feijão', qt: '10g'}
        ],
        interesses: ['node', 'js', 'css'],
        //teste:'<strong>Testando negrito</strong>',
        //pageTitle:"Titulo de teste",
        userInfo: req.userInfo,     
    }
    res.render('home', obj);
};